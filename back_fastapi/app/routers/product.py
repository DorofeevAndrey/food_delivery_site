from typing import List
from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File
from uuid import uuid4
from sqlalchemy.orm import Session

from app.core.s3 import s3_client
from app.dependencies import get_db  # у тебя уже есть
from app.models.product import Product
from app.schemas.product import (
    ProductCreateScheme,
    ProductUpdateScheme,
    ProductOutScheme,
)
from app.core.config import settings

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

@router.post("/{product_id}/image", response_model=ProductOutScheme)
def upload_product_image(
    product_id: int,
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    # 1. Проверяем, что продукт существует
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found",
        )

    # 2. Генерируем ключ объекта в бакете
    original_filename = file.filename or "image"
    ext = original_filename.rsplit(".", 1)[-1] if "." in original_filename else "jpg"
    object_key = f"products/{product_id}/{uuid4()}.{ext}"

    # 3. Загружаем файл в MinIO/S3
    try:
        s3_client.upload_fileobj(
            file.file,
            settings.S3_BUCKET_NAME,  # добавь это поле в Settings
            object_key,
            ExtraArgs={
                "ContentType": file.content_type or "application/octet-stream",
            },
        )
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to upload image",
        )

    # 4. Формируем публичный URL
    # Для MinIO в dev можно так: http://localhost:9000/bucket/key
    base_url = settings.S3_ENDPOINT_URL  # например, "http://localhost:9000"
    image_url = f"{base_url}/{settings.S3_BUCKET_NAME}/{object_key}"

    # 5. Сохраняем ссылку в продукт
    product.image_url = image_url
    db.add(product)
    db.commit()
    db.refresh(product)

    return product