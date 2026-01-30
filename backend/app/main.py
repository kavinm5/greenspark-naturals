from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

from .dependencies import get_current_user
from .auth import router as auth_router
from .admin_auth import router as admin_router
from .admin_products import router as admin_product_router
from .admin_orders import router as admin_orders_router

# ---------------- CREATE APP ----------------
app = FastAPI(title="GS Store API")

# ---------------- CORS ----------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------- REGISTER ROUTERS ----------------
app.include_router(auth_router)
app.include_router(admin_router)
app.include_router(admin_product_router)
app.include_router(admin_orders_router)

# ---------------- DUMMY PRODUCTS (TEMP, DB LATER) ----------------
products = [
    {
        "id": 1,
        "name": "Premium Almonds",
        "price": 450,
        "image": "https://images.unsplash.com/photo-1604908177522-4293d6c9b1c6",
        "description": "High-quality premium almonds rich in nutrients."
    },
    {
        "id": 2,
        "name": "Organic Coffee Powder",
        "price": 320,
        "image": "https://images.unsplash.com/photo-1509042239860-f550ce710b93",
        "description": "Freshly ground organic coffee powder."
    },
    {
        "id": 3,
        "name": "Natural Tea Powder",
        "price": 280,
        "image": "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb",
        "description": "Pure tea powder from selected tea leaves."
    }
]

# ---------------- ORDERS STORAGE (TEMP) ----------------
orders = []

# ---------------- PRODUCT APIs ----------------
@app.get("/api/products")
def get_products():
    return products

# ---------------- PROFILE API (PROTECTED) ----------------
@app.get("/api/profile")
def get_profile(current_user=Depends(get_current_user)):
    return {
        "id": str(current_user.id),
        "name": current_user.name,
        "email": current_user.email,
        "phone": current_user.phone
    }

# ---------------- ORDER MODELS ----------------
class OrderItem(BaseModel):
    id: int
    name: str
    price: int
    quantity: int

class Order(BaseModel):
    items: List[OrderItem]
    total: int
    address: str
    city: str
    pincode: str
    mobile: str

# ---------------- ORDER API (PROTECTED) ----------------
@app.post("/api/orders")
def create_order(
    order: Order,
    current_user=Depends(get_current_user)
):
    order_data = order.dict()
    order_data["user_id"] = str(current_user.id)
    order_data["order_id"] = len(orders) + 1
    order_data["status"] = "Pending"

    orders.append(order_data)

    return {
        "message": "Order placed successfully",
        "order_id": order_data["order_id"]
    }
