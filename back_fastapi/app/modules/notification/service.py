from sqlalchemy.orm import Session
from fastapi import BackgroundTasks
from app.modules.notification.schema import NotificationOutScheme
import json

from app.modules.notification.model import Notification
from app.modules.web_socket.router import manager

class NotificationService:
    @staticmethod
    def create_for_order(
        db: Session,
        user_id: int,
        order_id: int,
        title: str,
        text: str,
        background_tasks: BackgroundTasks | None = None,
    ) -> Notification:
        notif = Notification(
            user_id=user_id,
            order_id=order_id,
            title=title,
            text=text,
        )
        db.add(notif)
        db.commit()
        db.refresh(notif)

        if background_tasks is not None:
            payload = NotificationOutScheme.model_validate(notif).model_dump(mode="json")
            background_tasks.add_task(
                manager.broadcast,
                json.dumps(
                    {
                        "type": "notification_created",
                        "payload": payload,
                    },
                    default=str,
                ),
            )

        return notif