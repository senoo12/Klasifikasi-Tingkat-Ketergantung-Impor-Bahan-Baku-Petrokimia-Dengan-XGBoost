from fastapi import APIRouter
from app.routes.predict_urls import router as predict_router

router = APIRouter(prefix="/api")

router.include_router(predict_router)
