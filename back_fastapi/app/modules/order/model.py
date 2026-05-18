from sqlalchemy import Column, Integer, String, Numeric, DateTime, ForeignKey, Enum, Boolean, func
from sqlalchemy.orm import relationship
from app.core.database import Base
import enum

class OrderModeEnum(str, enum.Enum):
    delivery = "delivery"
    restaurant = "restaurant"

class OrderStatusEnum(str, enum.Enum):
    pending = "pending"
    confirmed = "confirmed"
    completed = "completed"
    cancelled = "cancelled"

class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    mode = Column(Enum(OrderModeEnum), nullable=False)     # delivery / restaurant
    status = Column(Enum(OrderStatusEnum), default=OrderStatusEnum.pending, nullable=False)

    total_price = Column(Numeric(10, 2), nullable=False)
    address = Column(String, nullable=True)               # только для доставки
    comment = Column(String, nullable=True)

    created_at = Column(DateTime, server_default=func.now(), nullable=False)
    completed_at = Column(DateTime, nullable=True)

    user = relationship("User")
    items = relationship("OrderItem", back_populates="order", cascade="all, delete-orphan")


class OrderItem(Base):
    __tablename__ = "order_items"

    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id"), nullable=False)
    product_id = Column(Integer, ForeignKey("products.id"), nullable=False)

    product_name = Column(String, nullable=False)
    product_price = Column(Numeric(10, 2), nullable=False)
    quantity = Column(Integer, nullable=False)

    order = relationship("Order", back_populates="items")
    product = relationship("Product")