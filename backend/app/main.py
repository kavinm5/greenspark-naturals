from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

app = FastAPI(title="GS Store API")

# ---------------- CORS ----------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------- DUMMY DATA (DB later) ----------------
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

orders = []

# ---------------- PRODUCT APIs ----------------
@app.get("/api/products")
def get_products():
    return products


@app.get("/api/products/{product_id}")
def get_product(product_id: int):
    for product in products:
        if product["id"] == product_id:
            return product
    return {"error": "Product not found"}

# ---------------- ORDER MODELS ----------------
class OrderItem(BaseModel):
    id: int
    name: str
    price: int
    quantity: int


class Order(BaseModel):
    full_name: str
    mobile: str
    address: str
    city: str
    pincode: str
    items: List[OrderItem]
    total: int

# ---------------- ORDER API ----------------
@app.post("/api/orders")
def create_order(order: Order):
    order_data = order.dict()
    order_data["order_id"] = len(orders) + 1

    orders.append(order_data)

    return {
        "message": "Order placed successfully",
        "order_id": order_data["order_id"]
    }
