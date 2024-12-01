# Car Damage Analysis System

This application uses AWS Rekognition to analyze car images for damage detection. The system consists of a Next.js frontend and a FastAPI backend with AWS services integration.

## 📋 Prerequisites

Before starting, make sure you have:
- Node.js (v14 or higher)
- Python (v3.8 or higher)
- AWS Account with necessary credentials
- Git

## 🚀 Quick Start

### Frontend Setup (Client)

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the client directory:
   ```bash
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will be available at `http://localhost:3000`

### Backend Setup (Server)

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Create a virtual environment (optional):
   ```bash
   python -m venv venv
   source venv/bin/activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Set up AWS credentials and environment variables
```
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=us-east-1
S3_BUCKET=your-bucket-name
COGNITO_USER_POOL_CLIENT_ID=your_client_id
COGNITO_CLIENT_SECRET=your_client_secret
```


5. Create DynamoDB table (Don't do it as I have already created it):
```
python -m app.scripts.create_tables
```


6. Start the server:
```
python -m run.py
```


The backend API will be available at `http://localhost:8000`

## 📱 Using the Application

1. Open your browser and go to `http://localhost:3000`
2. Navigate to the Car Analysis page
3. Upload a car image
4. The system will analyze the image and show:
   - If a vehicle is detected
   - Any damage detected
   - Confidence scores
   - Detailed analysis results

## 🔧 Additional Requirements

Make sure these packages are in your `requirements.txt`: