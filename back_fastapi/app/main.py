from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import user, auth, profile, notification, product

app = FastAPI(title="Food_Delivery_API")

origins = [
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # с каких доменов разрешены запросы
    allow_credentials=True,
    allow_methods=["*"],     # GET, POST, PUT, DELETE и т.д.
    allow_headers=["*"],     # все заголовки
)

app.include_router(user.router)
app.include_router(auth.router)
app.include_router(profile.router)
app.include_router(notification.router)
app.include_router(product.router)