import pandas as pd
import numpy as np
from sklearn.preprocessing import LabelEncoder

# Load dataset
df = pd.read_csv(
    "../MachineLearningCVE/Friday-WorkingHours-Afternoon-DDos.pcap_ISCX.csv"
)

# Show original shape
print("Original Shape:", df.shape)

# Remove duplicate rows
df.drop_duplicates(inplace=True)

# Remove null values
df.dropna(inplace=True)

# Remove infinite values
df.replace([np.inf, -np.inf], np.nan, inplace=True)

# Drop rows that became null
df.dropna(inplace=True)

# Remove extra spaces from column names
df.columns = df.columns.str.strip()

# Encode labels
label_encoder = LabelEncoder()

df['Label'] = label_encoder.fit_transform(df['Label'])

# Show cleaned shape
print("Cleaned Shape:", df.shape)

# Show labels
print("Encoded Labels:")
print(df['Label'].value_counts())

# Separate features and target
X = df.drop("Label", axis=1)

y = df["Label"]

print("Features Shape:", X.shape)
print("Target Shape:", y.shape)