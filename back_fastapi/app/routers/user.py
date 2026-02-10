from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from app.dependencies import get_db
from app.models.user import User
from app.schemas.user import UserScheme

router = APIRouter(prefix="/user", tags=["Users"])

@router.get("/", response_model=List[UserScheme])
def read_users(db: Session = Depends(get_db)):
    users = db.query(User).all()
    return {"users": users}


