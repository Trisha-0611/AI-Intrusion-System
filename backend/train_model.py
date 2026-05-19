import pandas as pd
import numpy as np
import joblib

from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report

# Load dataset
df = pd.read_csv(
    "../MachineLearningCVE/Friday-WorkingHours-Afternoon-DDos.pcap_ISCX.csv"
)

# Clean dataset
df.drop_duplicates(inplace=True)

df.replace([np.inf, -np.inf], np.nan, inplace=True)

df.dropna(inplace=True)

df.columns = df.columns.str.strip()

# Encode labels
label_encoder = LabelEncoder()

df['Label'] = label_encoder.fit_transform(df['Label'])

# Features and target
X = df.drop("Label", axis=1)

y = df["Label"]

# Split dataset
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Train model
model = RandomForestClassifier(n_estimators=100)

model.fit(X_train, y_train)

# Predictions
y_pred = model.predict(X_test)

# Accuracy
accuracy = accuracy_score(y_test, y_pred)

print("Accuracy:", accuracy)

# Full report
print(classification_report(y_test, y_pred))

# Save model
joblib.dump(model, "model.pkl")

print("Model saved as model.pkl")