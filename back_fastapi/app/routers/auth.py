import datetime
from uuid import uuid4
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import func
from sqlalchemy.orm import Session
from jose import jwt

from app.schemas.auth import AuthStartScheme, AuthVerifyScheme, TelegramLoginFinish, TelegramLoginStart
from app.models.user import PendingUser, User
from app.dependencies import get_db
from app.core.config import settings

router = APIRouter(prefix="/auth", tags=["Authorization"])



@router.post("/start", response_model=AuthStartScheme)
async def auth_start(phone: TelegramLoginStart, db: Session = Depends(get_db)):
    session_id = str(uuid4())
    existing = db.query(PendingUser).filter_by(phone=phone.phone).first()
    if existing:
        existing.session_id = session_id
        existing.is_verified = False
        existing.created_at = func.now()
    else:
        db.add(PendingUser(phone=phone.phone, session_id=session_id))
    db.commit()
    bot_link = f"https://t.me/{settings.TELEGRAM_BOT_NAME}?start={session_id}"
    return AuthStartScheme(session_id=session_id, bot_link=bot_link)

@router.post("/verify")
def auth_verify(req: AuthVerifyScheme, db: Session = Depends(get_db)):
    pending = db.query(PendingUser).filter_by(session_id=req.session_id).first()

    if not pending:
        raise HTTPException(404, "Session not found")
    
    print(req.phone, pending.phone)

    if req.phone != pending.phone:
        raise HTTPException(400, "Phone mismatch")
    
    pending.is_verified = True
    db.commit()
    return {"status": "ok"}

@router.post("/finish")
def auth_finish(session_id: TelegramLoginFinish, db: Session = Depends(get_db)):
    pending = db.query(PendingUser).filter_by(session_id=session_id.session_id).first()

    if not pending or not pending.is_verified:
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
        "exp": datetime.datetime.utcnow() + datetime.timedelta(days=int(settings.JWT_DAYS))
    }
    token = jwt.encode(payload, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    return {"token": token}
