from fastapi import APIRouter, Body, Depends, HTTPException, Path, status
from fastapi.security import OAuth2PasswordBearer
import jwt
from sqlalchemy.orm import Session

from app.schemas.profile import UserResponseSchema, UserUpdateSchema
from app.dependencies import get_db
from app.core.config import settings
from app.models.user import User

router = APIRouter(prefix="/profile", tags=["Profile"])

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)) -> User:
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token expired")
    except jwt.PyJWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")

    user = db.query(User).filter(User.id == int(user_id)).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    return user

@router.get("", response_model=UserResponseSchema)
def get_user(current_user: User = Depends(get_current_user)):
    return UserResponseSchema(**current_user.__dict__)

@router.patch("/{user_id}", response_model=UserResponseSchema)
def patch_user(user_id: int = Path(...), data: UserUpdateSchema = Body(...), db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    
    if current_user.id != user_id:
        raise HTTPException(status_code=403, detail="Not authorized")

    user = db.query(User).filter(User.id == user_id).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    if data.first_name is not None:
        user.first_name = data.first_name
    if data.date_of_birth is not None:
        user.date_of_birth = data.date_of_birth
    if data.email is not None:
        existing_user = db.query(User).filter(User.email == data.email, User.id != user_id).first()
        if existing_user:
            raise HTTPException(status_code=400, detail="Email уже используется")
        user.email = data.email
    if data.gender is not None:
        user.gender = data.gender

    db.add(user)
    db.commit()
    db.refresh(user)

    return UserResponseSchema(**user.__dict__)

@router.delete("/delete/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_user(user_id: int = Path(...), db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if current_user.id != user_id:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    user = db.query(User).filter(User.id == user_id).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    db.delete(user)
    db.commit()

    return {"detail": "User deleted successfully"}