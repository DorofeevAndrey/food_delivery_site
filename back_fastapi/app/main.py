from fastapi import FastAPI
from app.routers import user

app = FastAPI(title="Food_Delivery_API")

app.include_router(user.router)
