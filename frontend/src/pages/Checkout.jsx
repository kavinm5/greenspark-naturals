import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Checkout.css";

export default function Checkout() {
  const { cartItems } = useContext(CartContext);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price,
    0
  );

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

            <button type="button">Place Order</button>
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
