from sqlalchemy import Column, Integer, String, Numeric, Boolean, DateTime, func
from app.core.database import Base

class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)

    # Основные поля
    name = Column(String, nullable=False)
    description = Column(String, nullable=True)

    # Цена (в рублях; Numeric удобнее, чем float)
    price = Column(Numeric(10, 2), nullable=False)
    
    # Вес
    weight = Column(Numeric(10, 2), nullable=False)

    # Картинка
    image_url = Column(String, nullable=True)

    # Активен ли товар (можно "выключать" без удаления)
    is_active = Column(Boolean, default=True, nullable=False)

    created_at = Column(DateTime, server_default=func.now(), nullable=False)
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now(), nullable=False)