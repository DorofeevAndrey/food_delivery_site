from pydantic import BaseModel
from datetime import datetime


class NotificationBaseScheme(BaseModel):
    title: str
    text: str
    order_id: int | None = None


class NotificationCreateScheme(NotificationBaseScheme):
    user_id: int


class NotificationUpdateScheme(BaseModel):
    is_read: bool | None = None


class NotificationOutScheme(NotificationBaseScheme):
    id: int
    created_at: datetime
    is_read: bool

    class Config:
        from_attributes = True