import datetime
from uuid import uuid4

from fastapi import HTTPException
from jose import jwt
from sqlalchemy import func
from sqlalchemy.orm import Session
from app.modules.profile.model import PendingUser, User
from app.core.config import settings


class AuthService:
    @staticmethod
    def start_auth(db: Session, phone: str):
        session_id = str(uuid4())
        existing = db.query(PendingUser).filter_by(phone=phone).first()
        if existing:
            existing.session_id = session_id
            existing.is_verified = False
            existing.created_at = func.now()
        else:
            db.add(PendingUser(phone=phone, session_id=session_id))
        db.commit()
        return session_id

    @staticmethod
    def verify_auth(db: Session, phone: str, session_id: str):
        pending = db.query(PendingUser).filter_by(session_id=session_id).first()
        if not pending:
            raise HTTPException(404, "Session not found")
        if phone != pending.phone:
            raise HTTPException(400, "Phone mismatch")
        pending.is_verified = True
        db.commit()
        return True

    @staticmethod
    def finish_auth(db: Session, session_id: str) -> str:
        pending = db.query(PendingUser).filter_by(session_id=session_id).first()
        if not pending:
            raise HTTPException(404, "Session not found")
        if not pending.is_verified:
            raise HTTPException(400, "Not verified yet")
        user = db.query(User).filter_by(phone=pending.phone).first()
        if not user:
            user = User(phone=pending.phone)
            db.add(user)
            db.commit()
            db.refresh(user)
        payload = {
            "sub": str(user.id),
            "phone": user.phone,
            "exp": datetime.datetime.utcnow() + datetime.timedelta(days=int(settings.JWT_DAYS)),
        }
        token = jwt.encode(payload, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
        return token
        