import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Checkout.css";

export default function Checkout() {
  const { cartItems, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price,
    0
  );

  const placeOrder = async () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty");
      return;
    }

    const orderData = {
      full_name: document.querySelector('input[placeholder="Full Name"]').value,
      mobile: document.querySelector('input[placeholder="Mobile Number"]').value,
      address: document.querySelector('input[placeholder="Address"]').value,
      city: document.querySelector('input[placeholder="City"]').value,
      pincode: document.querySelector('input[placeholder="Pincode"]').value,
      items: cartItems,
      total
    };

    const response = await fetch("http://127.0.0.1:8000/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(orderData)
    });

    if (response.ok) {
      clearCart();
      navigate("/order-success");
    } else {
      alert("Failed to place order");
    }
  };


  return (
    <>
      <Navbar />

      <section className="checkout">
        <h2>Checkout</h2>

        <div className="checkout-grid">
          {/* SHIPPING FORM */}
          <form className="checkout-form">
            <h3>Shipping Details</h3>

            <input type="text" placeholder="Full Name" required />
            <input type="text" placeholder="Mobile Number" required />
            <input type="text" placeholder="Address" required />
            <input type="text" placeholder="City" required />
            <input type="text" placeholder="Pincode" required />

            <button type="button" onClick={placeOrder}>
              Place Order
            </button>
          </form>

          {/* ORDER SUMMARY */}
          <div className="order-summary">
            <h3>Order Summary</h3>

            {cartItems.length === 0 ? (
              <p>No items in cart</p>
            ) : (
              <>
                <ul>
                  {cartItems.map((item, index) => (
                    <li key={index}>
                      {item.name} – ₹ {item.price}
                    </li>
                  ))}
                </ul>

                <h4>Total: ₹ {total}</h4>
              </>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
