from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel

from .database import get_db
from .models import Order
from .dependencies import get_current_admin

router = APIRouter(prefix="/api/admin/orders", tags=["Admin Orders"])

# ---------- VIEW ALL ORDERS ----------
@router.get("")
def list_orders(
    db: Session = Depends(get_db),
    admin=Depends(get_current_admin)
):
    return db.query(Order).all()


# ---------- VIEW SINGLE ORDER ----------
@router.get("/{order_id}")
def get_order(
    order_id: str,
    db: Session = Depends(get_db),
    admin=Depends(get_current_admin)
):
    order = db.query(Order).filter(Order.id == order_id).first()

    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    return order


# ---------- UPDATE ORDER STATUS ----------
class OrderStatusUpdate(BaseModel):
    status: str

@router.patch("/{order_id}/status")
def update_order_status(
    order_id: str,
    data: OrderStatusUpdate,
    db: Session = Depends(get_db),
    admin=Depends(get_current_admin)
):
    order = db.query(Order).filter(Order.id == order_id).first()

    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    order.status = data.status
    db.commit()

    return {"message": "Order status updated"}
