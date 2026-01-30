from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from passlib.context import CryptContext

from .database import get_db
from .models import User
from .security import create_access_token

router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# ---------------- REGISTER ----------------
@router.post("/api/auth/register")
def register_user(
    name: str,
    email: str,
    phone: str,
    password: str,
    db: Session = Depends(get_db)
):
    existing = db.query(User).filter(
        (User.email == email) | (User.phone == phone)
    ).first()

    if existing:
        raise HTTPException(status_code=400, detail="User already exists")

    hashed_password = pwd_context.hash(password)

    user = User(
        name=name,
        email=email,
        phone=phone,
        password_hash=hashed_password
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return {"message": "Registration successful"}


# ---------------- LOGIN ----------------
@router.post("/api/auth/login")
def login_user(
    email: str,
    password: str,
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(User.email == email).first()

    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    if not pwd_context.verify(password, user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token(
        {
            "user_id": str(user.id),
            "role": "customer"
        }
    )

    return {
        "access_token": token,
        "token_type": "bearer"
    }
