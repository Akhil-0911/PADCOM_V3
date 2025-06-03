# PADCOM - Personalized AI-Powered Diagnostic COMpanion

PADCOM is an advanced medical image analysis system that leverages artificial intelligence to assist healthcare professionals in diagnosing brain tumors and pneumonia through medical imaging. The system provides rapid, accurate analysis of MRI scans and chest X-rays, offering a powerful tool for medical diagnosis support.

## Features

- **Brain Tumor Analysis**
  - MRI scan analysis for tumor detection
  - Region highlighting for identified tumors
  - Confidence scoring for diagnoses
  - Support for multiple image formats (PNG, JPG, JPEG)

- **Pneumonia Analysis**
  - Chest X-ray analysis
  - Affected area identification
  - Severity assessment
  - Detailed analysis reports

- **Modern User Interface**
  - Intuitive drag-and-drop interface
  - Real-time analysis feedback
  - Interactive result visualization
  - Responsive design for all devices

## Technology Stack

### Frontend
- React.js with TypeScript
- Tailwind CSS for styling
- React Router for navigation
- Axios for API communication
- React Dropzone for file handling

### Backend
- Flask (Python)
- PyTorch for AI models
- NumPy for numerical computations
- Pillow for image processing
- Flask-CORS for cross-origin support

## Project Structure

```
PADCOM/
├── frontend/                # React frontend application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Main application pages
│   │   └── App.tsx        # Main application component
│   ├── package.json       # Frontend dependencies
│   └── tailwind.config.js # Tailwind CSS configuration
│
└── backend/               # Flask backend application
    ├── app/              # Application logic
    ├── models/           # AI model definitions
    ├── utils/            # Utility functions
    ├── test_images/      # Sample test images
    ├── requirements.txt  # Python dependencies
    └── run.py           # Server startup script
```

## Getting Started

### Prerequisites
- Python 3.8 or higher
- Node.js 14.x or higher
- Conda (recommended for environment management)
- Git

### Clone the Repository
```bash
# Clone the repository
git clone https://github.com/yourusername/PADCOM.git

# Navigate to project directory
cd PADCOM
```

### Backend Setup
1. Create and activate a Conda environment:
   ```bash
   conda create -n PADCOM python=3.8
   conda activate PADCOM
   ```

2. Install backend dependencies:
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

### Frontend Setup
1. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```

## Running the Application

1. Start the backend server:
   ```bash
   conda activate PADCOM
   cd backend
   python run.py
   ```

2. Start the frontend development server:
   ```bash
   cd frontend
   npm start
   ```

3. Access the application at http://localhost:3000

## Development

### Setting Up Development Environment

1. Fork the repository on GitHub
2. Clone your fork:
   ```bash
   git clone https://github.com/yourusername/PADCOM.git
   ```
3. Add the original repository as upstream:
   ```bash
   git remote add upstream https://github.com/originalusername/PADCOM.git
   ```

### Making Changes

1. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. Make your changes
3. Commit your changes:
   ```bash
   git add .
   git commit -m "Description of changes"
   ```
4. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Create a Pull Request on GitHub

### Code Style
- Follow PEP 8 for Python code
- Use ESLint configuration for TypeScript/React code
- Write meaningful commit messages
- Include comments for complex logic

## Deployment

### Backend Deployment
1. Set up a server (e.g., AWS EC2, Heroku)
2. Install required dependencies
3. Configure environment variables
4. Set up WSGI server (e.g., Gunicorn)
5. Configure reverse proxy (e.g., Nginx)

### Frontend Deployment
1. Build the production version:
   ```bash
   cd frontend
   npm run build
   ```
2. Deploy the build folder to a static hosting service (e.g., Netlify, Vercel)
3. Configure environment variables for API endpoints

## Usage

1. Navigate to either the Brain Tumor Analysis or Pneumonia Analysis section
2. Upload a medical image (MRI scan or chest X-ray)
3. Wait for the AI analysis to complete
4. Review the results, including:
   - Diagnosis prediction
   - Confidence score
   - Affected regions (if any)
   - Severity assessment (for pneumonia)

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to your fork
5. Submit a Pull Request

Please make sure to:
- Update tests as needed
- Update documentation
- Follow the existing code style
- Add comments for complex logic

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Medical imaging datasets used for training
- Open-source AI/ML libraries and frameworks
- Healthcare professionals who provided domain expertise

## Contact

For questions and support:
1. Open an issue in the GitHub repository
2. Contact the maintainers through GitHub
3. Join our community discussions

## Security

Please report any security vulnerabilities to the repository maintainers privately. Do not create public issues for security concerns. 