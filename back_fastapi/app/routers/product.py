from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import SessionLocal
from app.dependencies import get_db  # у тебя уже есть
from app.models.product import Product
from app.schemas.product import (
    ProductCreateScheme,
    ProductUpdateScheme,
    ProductOutScheme,
)

router = APIRouter(prefix="/products", tags=["Products"])

@router.get("", response_model=List[ProductOutScheme])
def list_products(db: Session = Depends(get_db)):
    items = (
        db.query(Product)
        .filter(Product.is_active == True)  # только активные
        .order_by(Product.id.asc())
        .all()
    )
    return items

@router.get("/{product_id}", response_model=ProductOutScheme)
def get_product(product_id: int, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Product not found"
        )
    return product

# CRUD для админки (пока без проверки ролей — добавишь, когда появится админ):

@router.post("", response_model=ProductOutScheme, status_code=status.HTTP_201_CREATED)
def create_product(data: ProductCreateScheme, db: Session = Depends(get_db)):
    product = Product(**data.dict())
    db.add(product)
    db.commit()
    db.refresh(product)
    return product

@router.patch("/{product_id}", response_model=ProductOutScheme)
def update_product(
    product_id: int,
    data: ProductUpdateScheme,
    db: Session = Depends(get_db),
):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Product not found"
        )

    update_data = data.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(product, key, value)

    db.add(product)
    db.commit()
    db.refresh(product)
    return product

@router.delete("/{product_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_product(product_id: int, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Product not found"
        )

    db.delete(product)
    db.commit()
    return {"detail": "Product deleted"}