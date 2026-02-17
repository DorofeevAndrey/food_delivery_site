from decimal import Decimal
import json

from fastapi import APIRouter, Depends, HTTPException, status, BackgroundTasks
from sqlalchemy.orm import Session

from app.dependencies import get_db, get_current_user
from app.models.order import Order, OrderItem, OrderModeEnum
from app.models.product import Product
from app.models.user import User
from app.models.notification import Notification
from app.schemas.order import OrderCreate, OrderOut
from app.schemas.notification import NotificationOutScheme
from app.routers.web_socket.web_socket import manager

router = APIRouter(prefix="/orders", tags=["Orders"])


@router.post("", response_model=OrderOut, status_code=status.HTTP_201_CREATED)
def create_order(
  data: OrderCreate,
  db: Session = Depends(get_db),
  current_user: User = Depends(get_current_user),
  background_tasks: BackgroundTasks = BackgroundTasks(),
):
  if not data.items:
    raise HTTPException(status_code=400, detail="Cart is empty")

  # Если доставка — адрес обязателен
  if data.mode == OrderModeEnum.delivery and not data.address:
    raise HTTPException(status_code=400, detail="Address is required for delivery")

  product_ids = [i.product_id for i in data.items]
  products = db.query(Product).filter(Product.id.in_(product_ids)).all()
  products_map = {p.id: p for p in products}

  if len(products_map) != len(product_ids):
    raise HTTPException(status_code=400, detail="Some products not found")

  total = Decimal("0.00")
  order_items: list[OrderItem] = []

  for item in data.items:
    product = products_map[item.product_id]
    line_price = Decimal(product.price) * item.quantity
    total += line_price

    order_items.append(
      OrderItem(
        product_id=product.id,
        product_name=product.name,
        product_price=product.price,
        quantity=item.quantity,
      )
    )

  order = Order(
    user_id=current_user.id,
    mode=data.mode,
    status=None,  # возьмётся default=OrderStatusEnum.pending
    total_price=total,
    address=data.address,
    comment=data.comment,
    items=order_items,
  )

  db.add(order)
  db.commit()
  db.refresh(order)

  # Создаём уведомление для пользователя о создании заказа
  notif = Notification(
    user_id=current_user.id,
    order_id=order.id,
    title=f"Заказ #{order.id} создан",
    text=f"Ваш заказ создан. Сумма: {order.total_price} ₽",
  )
  db.add(notif)
  db.commit()
  db.refresh(notif)

  # Отправляем уведомление по WebSocket
  notif_payload = NotificationOutScheme.model_validate(notif).model_dump(mode="json")
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


@router.get("", response_model=list[OrderOut])
def list_orders(
  db: Session = Depends(get_db),
  current_user: User = Depends(get_current_user),
):
  orders = (
    db.query(Order)
    .filter(Order.user_id == current_user.id)
    .order_by(Order.id.desc())
    .all()
  )
  return orders


@router.get("/{order_id}", response_model=OrderOut)
def get_order(
  order_id: int,
  db: Session = Depends(get_db),
  current_user: User = Depends(get_current_user),
):
  order = (
    db.query(Order)
    .filter(Order.id == order_id, Order.user_id == current_user.id)
    .first()
  )
  if not order:
    raise HTTPException(status_code=404, detail="Order not found")
  return order