from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Boolean, func
from app.core.database import Base


class Notification(Base):
    __tablename__ = "notifications"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)

    # опциональная привязка к заказу
    order_id = Column(Integer, ForeignKey("orders.id"), nullable=True, index=True)

    title = Column(String, nullable=False)
    text = Column(String, nullable=False)

    is_read = Column(Boolean, nullable=False, default=False)
    created_at = Column(DateTime, nullable=False, server_default=func.now())
