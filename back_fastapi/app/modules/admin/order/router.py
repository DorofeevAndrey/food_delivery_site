import json
from fastapi import APIRouter, Depends, HTTPException, status, BackgroundTasks
from sqlalchemy import func
from sqlalchemy.orm import Session

from app.dependencies import get_db, get_admin_user
from app.modules.notification.model import Notification
from app.modules.notification.schema import NotificationOutScheme
from app.modules.order.model import Order, OrderStatusEnum
from app.modules.order.schema import OrderOut, OrderStatusUpdate
from app.modules.profile.model import User
from app.modules.web_socket import manager

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
    background_tasks: BackgroundTasks = BackgroundTasks(),
):
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    if data.status == OrderStatusEnum.completed and order.completed_at is None:
        order.completed_at = func.now()

    order.status = data.status
    db.add(order)
    db.commit()
    db.refresh(order)

    # Уведомление пользователю о смене статуса
    notif = Notification(
        user_id=order.user_id,
        order_id=order.id,
        title=f"Статус заказа #{order.id} обновлён",
        text=f"Новый статус: {order.status.value}",
    )
    db.add(notif)
    db.commit()
    db.refresh(notif)

    notif_payload = NotificationOutScheme.model_validate(notif).model_dump(mode="json")

    # Отправляем в фоне, чтобы не блокировать ответ
    background_tasks.add_task(
        manager.broadcast,
        json.dumps(
            {
                "type": "order_status_changed",
                "payload": {
                    "order_id": order.id,
                    "status": order.status.value,
                },
            },
            default=str,
        ),
    )

    background_tasks.add_task(
        manager.broadcast,
        json.dumps(
            {
                "type": "notification_created",
                "payload": notif_payload,
            },
            default=str,
        ),
    )

    return order