from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.schemas.auth import OTPRequest, OTPVerify, Token
from app.models.user import User
from app.dependencies import get_db
from app.crud.auth import generate_otp, send_sms, send_telegram, otp_store, SECRET_KEY, jwt, ALGORITHM

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/request-otp")
def request_otp(otp_req: OTPRequest, db: Session = Depends(get_db)):
    # Проверяем или создаём пользователя
    user = db.query(User).filter(User.phone == otp_req.phone).first()
    if not user:
        user = User(phone=otp_req.phone)
        db.add(user)
        db.commit()
        db.refresh(user)

    otp = generate_otp()
    otp_store[otp_req.phone] = otp

    if otp_req.method == "sms":
        send_sms(otp_req.phone, otp)
    elif otp_req.method == "telegram":
        send_telegram(otp_req.phone, otp)
    else:
        raise HTTPException(status_code=400, detail="Неподдерживаемый метод")

    return {"msg": "Код отправлен"}

@router.post("/verify-otp", response_model=Token)
def verify_otp(verify: OTPVerify):
    if otp_store.get(verify.phone) != verify.otp:
        raise HTTPException(status_code=400, detail="Неверный код")
    del otp_store[verify.phone]  # Удаляем OTP после проверки
    token = jwt.encode({"sub": verify.phone}, SECRET_KEY, algorithm=ALGORITHM)
    return {"access_token": token, "token_type": "bearer"}

@router.get("/me")
def get_me(phone: str = Depends(get_current_user)):
    return {"phone": phone}