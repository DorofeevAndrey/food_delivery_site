from sqlalchemy import Column, Integer, String, DateTime, func
from app.core.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    phone = Column(String, unique=True, nullable=False, index=True)  # Уникальный номер телефона
    password_hash = Column(String, nullable=True)  # Хэш пароля, nullable для входа через Telegram
    telegram_id = Column(String, unique=True, nullable=True, index=True)  # Telegram ID, если вход через Telegram
    created_at = Column(DateTime, nullable=False, default=func.now())  # Время создания
    updated_at = Column(DateTime, nullable=False, default=func.now(), onupdate=func.now())  # Время обновления