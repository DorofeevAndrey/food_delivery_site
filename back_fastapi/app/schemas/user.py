from pydantic import BaseModel

class UserScheme(BaseModel):
    id: int
    phone: int
    first_name: str 
    telegram_id: int
    email: str

    class Config:
        orm_mode = True
