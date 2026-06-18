# AI Intrusion Detection & Threat Analytics System

An AI-powered cybersecurity platform designed to detect, analyze, and monitor network intrusion threats in real time.

## Features

- Real-time intrusion detection
- AI-based threat prediction
- Interactive analytics dashboard
- Attack monitoring system
- Threat visualization
- User authentication system
- Live monitoring panel
- Modern React frontend
- FastAPI backend
- MongoDB database integration

---

## Tech Stack

### Frontend
- React.js
- Vite
- Framer Motion
- Lucide Icons

### Backend
- FastAPI
- Python
- Motor (MongoDB Async Driver)
- JWT Authentication

### Database
- MongoDB

### Machine Learning
- Scikit-learn
- Pandas
- NumPy

---

## Project Structure

```bash
ai-intrusion-system/
│
├── backend/
│   ├── main.py
│   ├── auth.py
│   ├── database.py
│   └── model.pkl
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
└── .gitignore
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/Trisha-0611/AI-Intrusion-System.git
cd AI-Intrusion-System
```

---

## Backend Setup

```bash
cd backend

pip install fastapi uvicorn motor python-jose passlib bcrypt pymongo

uvicorn main:app --reload
```

Backend runs on:

```bash
http://127.0.0.1:8000
```

---

## Frontend Setup

```bash
cd frontend

npm install
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

## Authentication

The system includes:
- User Registration
- Login Authentication
- JWT Token Generation
- Password Hashing using bcrypt

---

## Dashboard Modules

- Home
- Dashboard
- Alerts
- Attack History
- Threat Analytics
- Live Monitor
- Settings
- Login System

---

## Future Improvements

- Deploy to cloud
- Add role-based authentication
- Real-time socket monitoring
- AI model training automation
- Threat severity scoring

---

## Contributors

- Trisha
- Collaborators

---

## License

This project is for educational and research purposes.
