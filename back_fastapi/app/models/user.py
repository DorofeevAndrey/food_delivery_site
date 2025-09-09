from sqlalchemy import Column, Date, Integer, String, DateTime, Boolean, func

from datetime import datetime
from app.core.database import Base

class PendingUser(Base):
    __tablename__ = "pending_users"

    id = Column(Integer, primary_key=True, index=True)
    session_id = Column(String, unique=True, index=True, nullable=False)
    phone = Column(String, unique=True, index=True, nullable=False)
    is_verified = Column(Boolean, default=False, nullable=False)
    created_at = Column(DateTime, default=func.now(), nullable=False)

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    # Аутентификация
    phone = Column(String, unique=True, index=True, nullable=False)   
    telegram_id = Column(String, unique=True, index=True, nullable=True)  

    # Личные данные
    first_name = Column(String, nullable=True)
    date_of_birth = Column(Date, nullable=True)
    email = Column(String, unique=True, index=True, nullable=True)
    gender = Column(String, nullable=True)