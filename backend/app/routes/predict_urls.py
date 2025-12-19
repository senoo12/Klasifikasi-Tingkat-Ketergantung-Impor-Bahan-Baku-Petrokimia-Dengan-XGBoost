import io
import pandas as pd
import numpy as np
from fastapi import APIRouter, UploadFile, File, Query
from fastapi.responses import StreamingResponse
from app.schema.predict_schemas import PredictRequest, PredictResponse
from app.services.predict import predict
from app.services.batch_predict import batch_predict

router = APIRouter()

@router.post("/predict", response_model=PredictResponse)
def predict_endpoint(request: PredictRequest):
    pred_index, pred_label = predict(request.features)
    return {
        "prediction_index": pred_index,
        "prediction_label": pred_label
    }

@router.post("/predict/upload")
async def upload_and_predict(
    file: UploadFile = File(...),
    output: str = Query("table", enum=["table", "download"])
):
    # Read file
    contents = await file.read()

    if file.filename.endswith(".csv"):
        df = pd.read_csv(io.BytesIO(contents))
    else:
        df = pd.read_excel(io.BytesIO(contents))

    # setelah batch_predict
    result_df = batch_predict(df)

    # 🔥 FIX JSON ERROR
    result_df = result_df.replace([np.inf, -np.inf], None)
    result_df = result_df.where(pd.notnull(result_df), None)

    if output == "table":
        return {
            "columns": result_df.columns.tolist(),
            "data": result_df.to_dict(orient="records")
        }

    # output file
    output_stream = io.BytesIO()
    result_df.to_csv(output_stream, index=False)
    output_stream.seek(0)

    return StreamingResponse(
        output_stream,
        media_type="text/csv",
        headers={
            "Content-Disposition": "attachment; filename=prediction_result.csv"
        },
    )