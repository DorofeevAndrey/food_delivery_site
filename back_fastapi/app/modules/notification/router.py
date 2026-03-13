from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.dependencies import get_current_user, get_db
from app.modules.notification.model import Notification
from app.modules.profile.model import User
from app.modules.notification.schema import NotificationOutScheme, NotificationUpdateScheme


router = APIRouter(prefix="/notifications", tags=["Notifications"])

@router.get("", response_model=List[NotificationOutScheme])
def get_notifications(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    items = (
        db.query(Notification)
        .filter(Notification.user_id == current_user.id)
        .order_by(Notification.created_at.desc())
        .all()
    )
    return items

@router.patch("/{notification_id}", response_model=NotificationOutScheme)
def update_notification(
    notification_id: int,
    data: NotificationUpdateScheme,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    notif = (
        db.query(Notification)
        .filter(
            Notification.id == notification_id,
            Notification.user_id == current_user.id,
        )
        .first()
    )
    if not notif:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Notification not found")

    if data.is_read is not None:
        notif.is_read = data.is_read

    db.add(notif)
    db.commit()
    db.refresh(notif)
    return notif