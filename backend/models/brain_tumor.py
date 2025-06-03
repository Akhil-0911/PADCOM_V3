import torch
import torch.nn as nn
import torchvision.transforms as transforms
from torchvision import models
from PIL import Image
import io

# Device configuration
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

# Image preprocessing transforms
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
])

# Initialize model
brain_model = models.resnet18(weights=None)
brain_model.fc = nn.Linear(brain_model.fc.in_features, 1)
brain_model.load_state_dict(torch.load('models/tumor_classification_resnet18.pth', map_location=device))
brain_model.to(device)
brain_model.eval()

def preprocess_image(image_bytes):
    """Image preprocessing with error handling"""
    try:
        image = Image.open(io.BytesIO(image_bytes)).convert('RGB')
        return transform(image)
    except Exception as e:
        raise ValueError(f"Error processing image: {str(e)}")

def predict_brain_tumor(image_bytes):
    """Brain tumor prediction with confidence score"""
    try:
        image_tensor = preprocess_image(image_bytes).unsqueeze(0).to(device)
        with torch.no_grad():
            output = brain_model(image_tensor)
            probability = torch.sigmoid(output).item()
            confidence = max(probability, 1 - probability) * 100
            
            result = {
                'prediction': 'Tumor Detected' if probability > 0.5 else 'No Tumor Found',
                'confidence': f"{confidence:.2f}%",
                'probability': f"{probability:.3f}"
            }
            return result
    except Exception as e:
        raise ValueError(f"Error in brain tumor prediction: {str(e)}") 