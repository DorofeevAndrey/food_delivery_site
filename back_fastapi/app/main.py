from fastapi import FastAPI
from app.routers import user, auth

app = FastAPI(title="Food_Delivery_API")

app.include_router(user.router)
app.include_router(auth.router)

