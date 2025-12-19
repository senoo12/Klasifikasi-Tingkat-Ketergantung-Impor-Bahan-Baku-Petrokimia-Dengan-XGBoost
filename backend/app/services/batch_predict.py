import pandas as pd
from app.services.predict import predict

FEATURE_COLUMNS = [
    "monthly_fobvalue",
    "monthly_netWgt",
    "value_per_kg",
    "fobvalue_lag1",
    "fobvalue_lag3",
    "fobvalue_roll3",
    "fobvalue_roll3_std",
    "mom_growth",
]

def batch_predict(df: pd.DataFrame) -> pd.DataFrame:
    predictions_index = []
    predictions_label = []

    for _, row in df.iterrows():
        features = row[FEATURE_COLUMNS].tolist()
        pred_index, pred_label = predict(features)
        predictions_index.append(pred_index)
        predictions_label.append(pred_label)

    df["index"] = predictions_index
    df["label"] = predictions_label
    return df
