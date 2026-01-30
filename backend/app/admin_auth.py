from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from passlib.context import CryptContext

from .database import get_db
from .models import Admin
from .security import create_access_token

router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

@router.post("/api/admin/login")
def admin_login(
    email: str,
    password: str,
    db: Session = Depends(get_db)
):
    admin = db.query(Admin).filter(Admin.email == email).first()

    if not admin:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    if not pwd_context.verify(password, admin.password_hash):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token(
        {
            "user_id": str(admin.id),
            "role": "admin"
        }
    )

    return {
        "access_token": token,
        "token_type": "bearer"
    }
