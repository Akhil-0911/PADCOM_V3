import torch
import torch.nn as nn
import torchvision.transforms as transforms
from PIL import Image
import io

# Device configuration
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

# Image preprocessing transforms
transform = transforms.Compose([
    transforms.Grayscale(num_output_channels=1),
    transforms.Resize((256, 256)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485], std=[0.229])
])

class PneumoniaModel(nn.Module):
    def __init__(self):
        super(PneumoniaModel, self).__init__()
        self.conv1 = nn.Conv2d(1, 32, kernel_size=3, padding=1)
        self.bn1 = nn.BatchNorm2d(32)
        self.conv2 = nn.Conv2d(32, 64, kernel_size=3, padding=1)
        self.bn2 = nn.BatchNorm2d(64)
        self.conv3 = nn.Conv2d(64, 128, kernel_size=3, padding=1)
        self.bn3 = nn.BatchNorm2d(128)
        self.pool = nn.MaxPool2d(2, 2)
        self.dropout = nn.Dropout(0.5)
        self.fc1 = nn.Linear(128 * 32 * 32, 512)
        self.fc2 = nn.Linear(512, 1)

    def forward(self, x):
        x = self.pool(torch.relu(self.bn1(self.conv1(x))))
        x = self.pool(torch.relu(self.bn2(self.conv2(x))))
        x = self.pool(torch.relu(self.bn3(self.conv3(x))))
        x = x.view(x.size(0), -1)
        x = torch.relu(self.fc1(x))
        x = self.dropout(x)
        x = self.fc2(x)
        return x

# Initialize model
pneumonia_model = PneumoniaModel()
pneumonia_model.load_state_dict(torch.load('models/chest_xray_model.pth', map_location=device))
pneumonia_model.to(device)
pneumonia_model.eval()

def preprocess_image(image_bytes):
    """Image preprocessing with error handling"""
    try:
        image = Image.open(io.BytesIO(image_bytes)).convert('RGB')
        return transform(image)
    except Exception as e:
        raise ValueError(f"Error processing image: {str(e)}")

def predict_pneumonia(image_bytes):
    """Pneumonia prediction with confidence score"""
    try:
        image_tensor = preprocess_image(image_bytes).unsqueeze(0).to(device)
        with torch.no_grad():
            output = pneumonia_model(image_tensor)
            probability = torch.sigmoid(output).item()
            confidence = max(probability, 1 - probability) * 100
            
            result = {
                'prediction': 'PNEUMONIA' if probability > 0.5 else 'NORMAL',
                'confidence': f"{confidence:.2f}%",
                'probability': f"{probability:.3f}"
            }
            return result
    except Exception as e:
        raise ValueError(f"Error in pneumonia prediction: {str(e)}") 