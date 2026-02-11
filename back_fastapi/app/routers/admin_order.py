from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.dependencies import get_db, get_admin_user
from app.models.order import Order, OrderStatusEnum
from app.models.user import User
from app.schemas.order import OrderOut, OrderStatusUpdate

router = APIRouter(prefix="/admin/orders", tags=["AdminOrders"])


@router.get("", response_model=list[OrderOut])
def list_all_orders(
    status_filter: OrderStatusEnum | None = None,
    db: Session = Depends(get_db),
    admin: User = Depends(get_admin_user),
):
    query = db.query(Order).order_by(Order.id.desc())
    if status_filter is not None:
        query = query.filter(Order.status == status_filter)
    return query.all()


@router.get("/{order_id}", response_model=OrderOut)
def get_order_admin(
    order_id: int,
    db: Session = Depends(get_db),
    admin: User = Depends(get_admin_user),
):
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order


@router.patch("/{order_id}/status", response_model=OrderOut)
def update_order_status(
    order_id: int,
    data: OrderStatusUpdate,
    db: Session = Depends(get_db),
    admin: User = Depends(get_admin_user),
):
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    order.status = data.status
    db.add(order)
    db.commit()
    db.refresh(order)
    return order