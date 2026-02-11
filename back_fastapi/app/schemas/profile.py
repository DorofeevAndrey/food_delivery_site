from datetime import date
from typing import Optional
from pydantic import BaseModel

class UserResponseSchema(BaseModel):
    id: int
    phone: str
    telegram_id: str | None = None
    first_name: str | None = None
    date_of_birth: date | None = None
    email: str | None = None
    gender: str | None = None
    is_admin: bool

    class Config:
        orm_mode = True

class TokenRequestSchema(BaseModel):
    token: str

class UserUpdateSchema(BaseModel):
    first_name: str | None = None
    date_of_birth: date | None = None
    email: str | None = None
    gender: str | None = None