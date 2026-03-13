from pydantic import BaseModel
from decimal import Decimal

class ProductBaseScheme(BaseModel):
    name: str
    description: str | None = None
    price: Decimal
    weight: Decimal
    image_url: str | None = None
    is_active: bool = True

class ProductCreateScheme(ProductBaseScheme):
    pass

class ProductUpdateScheme(BaseModel):
    name: str | None = None
    description: str | None = None
    price: Decimal | None = None
    weight: Decimal | None = None
    image_url: str | None = None
    is_active: bool | None = None

class ProductOutScheme(ProductBaseScheme):
    id: int

    class Config:
        from_attributes = True