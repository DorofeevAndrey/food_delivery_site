from fastapi import FastAPI
from app.routers import user

app = FastAPI(title="User API")

app.include_router(user.router)
