from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.modules.auth.router import router as auth_router
from app.modules.product.router import router as product_router
from app.modules.order.router import router as order_router
from app.modules.profile.router import router as profile_router
from app.modules.notification.router import router as notification_router
from app.modules.admin.order.router import router as admin_order_router
from app.modules.web_socket.router import router as web_socket_router

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

app.include_router(auth_router)
app.include_router(product_router)
app.include_router(profile_router)
app.include_router(notification_router)
app.include_router(order_router)
app.include_router(admin_order_router)

# WebSocket
app.include_router(web_socket_router)