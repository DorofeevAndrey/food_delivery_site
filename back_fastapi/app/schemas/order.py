from decimal import Decimal
from typing import List

from pydantic import BaseModel

from app.models.order import OrderModeEnum, OrderStatusEnum


class OrderItemCreate(BaseModel):
  product_id: int
  quantity: int


class OrderCreate(BaseModel):
  mode: OrderModeEnum
  items: List[OrderItemCreate]
  address: str | None = None
  comment: str | None = None


class OrderItemOut(BaseModel):
  id: int
  product_id: int
  product_name: str
  product_price: Decimal
  quantity: int

  class Config:
    from_attributes = True


class OrderOut(BaseModel):
  id: int
  mode: OrderModeEnum
  status: OrderStatusEnum
  total_price: Decimal
  address: str | None
  comment: str | None
  items: List[OrderItemOut]

  class Config:
    from_attributes = True