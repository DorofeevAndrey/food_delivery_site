from pydantic import BaseModel
from pydantic_extra_types.phone_numbers import PhoneNumber

class AuthStartScheme(BaseModel):
    session_id: str
    bot_link: str

class AuthVerifyScheme(BaseModel):
    phone: str
    session_id: str

class TelegramLoginStart(BaseModel):
    phone: str

class TelegramLoginFinish(BaseModel):
    session_id: str

