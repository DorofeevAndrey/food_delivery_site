import random
import requests
from jose import JWTError, jwt
from fastapi import HTTPException
from fastapi.security import OAuth2PasswordBearer
from app.core.config import settings

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/token")

# Временное хранилище OTP (для продакшена лучше Redis)
otp_store = {}  # phone: otp

def generate_otp():
    return str(random.randint(100000, 999999))

# def send_sms(phone: str, otp: str):
#     # Пример для SMS.ru
#     url = f"https://sms.ru/sms/send?api_id={settings.SMS_API_KEY}&to={phone}&msg=Ваш код: {otp}"
#     response = requests.get(url)
#     if response.status_code != 200:
#         raise HTTPException(status_code=500, detail="Ошибка отправки SMS")

def send_telegram(phone: str, otp: str):
    # Найти Telegram chat_id по номеру телефона — это сложнее, нужен бот и база соответствий
    # Пока заглушка: предположим, у тебя есть chat_id
    chat_id = "YOUR_CHAT_ID"  # Замени на реальный chat_id
    url = f"https://api.telegram.org/bot{settings.TELEGRAM_BOT_TOKEN}/sendMessage"
    params = {"chat_id": chat_id, "text": f"Ваш код: {otp}"}
    response = requests.post(url, json=params)
    if response.status_code != 200:
        raise HTTPException(status_code=500, detail="Ошибка отправки Telegram")

def get_current_user(token: str = oauth2_scheme):
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        phone: str = payload.get("sub")
        if phone is None:
            raise HTTPException(status_code=401, detail="Недействительный токен")
        return phone
    except JWTError:
        raise HTTPException(status_code=401, detail="Ошибка токена")