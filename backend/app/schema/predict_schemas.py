from pydantic import BaseModel
from typing import List

class PredictRequest(BaseModel):
    features: List[float]

class PredictResponse(BaseModel):
    prediction_index: int
    prediction_label: str
