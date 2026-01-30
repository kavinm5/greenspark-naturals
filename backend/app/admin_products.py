from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel

from .database import get_db
from .models import Product
from .dependencies import get_current_admin

router = APIRouter(prefix="/api/admin/products", tags=["Admin Products"])

# ---------- SCHEMAS ----------
class ProductCreate(BaseModel):
    name: str
    description: str | None = None
    price: int
    image: str | None = None
    stock: int = 0

class ProductUpdate(BaseModel):
    name: str | None = None
    description: str | None = None
    price: int | None = None
    image: str | None = None
    stock: int | None = None
    is_active: bool | None = None


# ---------- CREATE PRODUCT ----------
@router.post("")
def add_product(
    data: ProductCreate,
    db: Session = Depends(get_db),
    admin=Depends(get_current_admin)
):
    product = Product(**data.dict())
    db.add(product)
    db.commit()
    db.refresh(product)
    return {"message": "Product added successfully", "id": str(product.id)}


# ---------- VIEW ALL PRODUCTS ----------
@router.get("")
def list_products(
    db: Session = Depends(get_db),
    admin=Depends(get_current_admin)
):
    return db.query(Product).all()


# ---------- UPDATE PRODUCT ----------
@router.put("/{product_id}")
def update_product(
    product_id: str,
    data: ProductUpdate,
    db: Session = Depends(get_db),
    admin=Depends(get_current_admin)
):
    product = db.query(Product).filter(Product.id == product_id).first()

    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    for key, value in data.dict(exclude_unset=True).items():
        setattr(product, key, value)

    db.commit()
    return {"message": "Product updated successfully"}


# ---------- DELETE PRODUCT ----------
@router.delete("/{product_id}")
def delete_product(
    product_id: str,
    db: Session = Depends(get_db),
    admin=Depends(get_current_admin)
):
    product = db.query(Product).filter(Product.id == product_id).first()

    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    db.delete(product)
    db.commit()
    return {"message": "Product deleted successfully"}


# ---------- TOGGLE STOCK ----------
@router.patch("/{product_id}/stock")
def toggle_stock(
    product_id: str,
    is_active: bool,
    db: Session = Depends(get_db),
    admin=Depends(get_current_admin)
):
    product = db.query(Product).filter(Product.id == product_id).first()

    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    product.is_active = is_active
    db.commit()

    return {"message": "Product stock status updated"}
