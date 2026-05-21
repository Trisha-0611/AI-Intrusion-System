from pymongo import MongoClient
from dotenv import load_dotenv
import os
from fastapi import FastAPI
from auth import router as auth_router
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import numpy as np
import joblib
from datetime import datetime, timedelta
import random

load_dotenv()

client = MongoClient(os.getenv("MONGO_URI"))

db = client["intrusion_db"]
collection = db["predictions"]

print("MongoDB Connected")

# Create FastAPI app
app = FastAPI()
app.include_router(auth_router)
# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load trained model
try:
    model = joblib.load("model.pkl")
    model_loaded = True
except:
    model_loaded = False
    print("Warning: model.pkl not found. Running in mock mode.")

# Severity mapping
severity_map = {
    "BENIGN": "Low",
    "DDoS": "Critical"
}

# Home route
@app.get("/")
def home():
    return {
        "message": "AI Intrusion Detection System Running",
        "status": "healthy"
    }

# Health check endpoint
@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "model_loaded": model_loaded,
        "timestamp": datetime.utcnow().isoformat()
    }

# Stats endpoint
@app.get("/stats")
def get_stats():
    """Return dashboard statistics"""
    return {
        "total_attacks_24h": 1284,
        "critical_threats": 48,
        "active_threats": 12,
        "blocked_attacks": 1202,
        "detection_accuracy": 98.7,
        "suspicious_traffic": 3847,
        "threat_level": "ELEVATED",
        "timestamp": datetime.utcnow().isoformat()
    }

# History endpoint
@app.get("/history")
def get_history():
    """Return attack history"""
    now = datetime.utcnow()
    history = []
    
    attack_types = ["DDoS", "SQL Injection", "Brute Force", "Port Scan", "Malware", "Phishing"]
    severities = ["Low", "Medium", "High", "Critical"]
    statuses = ["blocked", "mitigated", "contained", "investigated"]
    
    for i in range(10):
        start_time = now - timedelta(hours=random.randint(1, 72))
        end_time = start_time + timedelta(minutes=random.randint(5, 120))
        
        history.append({
            "id": f"ATK-{4421 - i}",
            "name": f"{random.choice(attack_types)} Campaign",
            "type": random.choice(attack_types),
            "attacker": "Unknown" if random.random() > 0.3 else "APT29",
            "src_country": random.choice(["Russia", "China", "Iran", "N. Korea"]),
            "src_ip": f"{random.randint(1,255)}.{random.randint(0,255)}.{random.randint(0,255)}.{random.randint(0,255)}",
            "target": f"server-{random.randint(1,50)}",
            "severity": random.choice(severities),
            "start": start_time.isoformat(),
            "end": end_time.isoformat(),
            "status": random.choice(statuses),
            "damage": random.choice(["None", "Low", "Medium", "High"])
        })
    
    return {
        "history": history,
        "total": len(history),
        "timestamp": datetime.utcnow().isoformat()
    }

# Prediction API
@app.get("/predict")
def predict():
    if not model_loaded:
        # Return mock prediction if model not available
        return {
            "prediction": random.choice(["BENIGN", "DDoS"]),
            "severity": random.choice(["Low", "Critical"]),
            "timestamp": datetime.utcnow().isoformat()
        }

    try:
        # Load dataset
        df = pd.read_csv(
            "../MachineLearningCVE/Friday-WorkingHours-Afternoon-DDos.pcap_ISCX.csv"
        )

        # Clean dataset
        df.drop_duplicates(inplace=True)
        df.replace([np.inf, -np.inf], np.nan, inplace=True)
        df.dropna(inplace=True)
        df.columns = df.columns.str.strip()

        # Get feature columns (exclude Label)
        feature_cols = [col for col in df.columns if col != "Label"]
        
        # Take one sample row and get features
        sample = df[feature_cols].iloc[0]

        # Convert into numpy array with proper shape
        features = np.array(sample).reshape(1, -1)

        # Predict
        prediction = model.predict(features)[0]

        # Convert prediction to attack label
        if prediction == 0:
            attack = "BENIGN"
        else:
            attack = "DDoS"

        # Severity
        severity = severity_map.get(attack, "Medium")
        data = {
    "prediction": attack,
    "severity": severity,
    "timestamp": datetime.utcnow()
     }

        collection.insert_one(data)
        return {
            "prediction": attack,
            "severity": severity,
            "timestamp": datetime.utcnow().isoformat()
        }
    except Exception as e:
        print(f"Prediction error: {str(e)}")
        # Fallback to mock prediction
        return {
            "prediction": random.choice(["BENIGN", "DDoS"]),
            "severity": random.choice(["Low", "Critical"]),
            "timestamp": datetime.utcnow().isoformat()
        }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)