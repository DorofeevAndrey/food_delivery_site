from sqlalchemy.orm import Session

from app.models.user import User as UserModel
from app.schemas.user import UserCreate

def get_users(db: Session):
    return db.query(UserModel).all()

def create_user(db: Session, user: UserCreate):
    db_user = UserModel(name=user.name)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user
