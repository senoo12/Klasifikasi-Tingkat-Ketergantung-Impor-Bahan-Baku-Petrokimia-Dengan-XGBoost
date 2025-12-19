import joblib
import numpy as np

# Load model
model = joblib.load("app/model/xgb_model_Smote_Fixed.pkl")

# Mapping label
LABELS = {
    0: "Low",
    1: "Medium",
    2: "High"
}

def predict(data):
    data = np.array(data).reshape(1, -1)
    pred_index = model.predict(data)[0]
    pred_label = LABELS.get(pred_index, "Unknown")
    return pred_index, pred_label
