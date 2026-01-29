import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import "./Cart.css";

export default function Cart() {
  const {
    cartItems,
    increaseQty,
    decreaseQty,
    removeItem
  } = useContext(CartContext);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <>
      <Navbar />

      <section className="cart">
        <h2>Your Cart</h2>

        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <>
            <div className="cart-list">
              {cartItems.map((item) => (
                <div className="cart-item" key={item.id}>
                  <div>
                    <h4>{item.name}</h4>
                    <p>₹ {item.price}</p>
                  </div>

                  <div className="qty-controls">
                    <button onClick={() => decreaseQty(item.id)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increaseQty(item.id)}>+</button>
                  </div>

                  <p>₹ {item.price * item.quantity}</p>

                  <button
                    className="remove-btn"
                    onClick={() => removeItem(item.id)}
                  >
                    ✖
                  </button>
                </div>
              ))}
            </div>

            <h3>Total: ₹ {total}</h3>

            <Link to="/checkout">
              <button className="checkout-btn">
                Proceed to Checkout
              </button>
            </Link>
          </>
        )}
      </section>

      <Footer />
    </>
  );
}
