from pydantic import BaseModel

class OTPRequest(BaseModel):
    phone: str
    method: str  # "sms" или "telegram"

class OTPVerify(BaseModel):
    phone: str
    otp: str

class Token(BaseModel):
    access_token: str
    token_type: str