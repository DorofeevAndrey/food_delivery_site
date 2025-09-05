from pydantic import BaseModel

class AuthStartScheme(BaseModel):
    session_id: str
    bot_link: str

class AuthVerifyScheme(BaseModel):
    phone: str
    session_id: str

