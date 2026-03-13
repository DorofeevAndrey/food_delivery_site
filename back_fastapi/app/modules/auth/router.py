from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.modules.auth.schema import AuthStartScheme, AuthVerifyScheme, TelegramLoginFinish, TelegramLoginStart
from app.dependencies import get_db
from app.core.config import settings
from app.modules.auth.service import AuthService

router = APIRouter(prefix="/auth", tags=["Authorization"])

@router.post("/start", response_model=AuthStartScheme)
async def auth_start(phone: TelegramLoginStart, db: Session = Depends(get_db)):
    session_id = AuthService.start_auth(db=db, phone=phone.phone)
    bot_link = f"https://t.me/{settings.TELEGRAM_BOT_NAME}?start={session_id}"
    return AuthStartScheme(session_id=session_id, bot_link=bot_link)

@router.post("/verify")
def auth_verify(req: AuthVerifyScheme, db: Session = Depends(get_db)):
    AuthService.verify_auth(
        db=db,
        phone=req.phone,
        session_id=req.session_id,
    )
    return {"status": "ok"}

@router.post("/finish")
def auth_finish(body: TelegramLoginFinish, db: Session = Depends(get_db)):
    token = AuthService.finish_auth(db=db, session_id=body.session_id)
    return {"token": token}
