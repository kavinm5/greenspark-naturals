import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Cart.css";

export default function Cart() {
    const { cartItems } = useContext(CartContext);

    const total = cartItems.reduce(
        (sum, item) => sum + item.price,
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
                        <ul className="cart-list">
                            {cartItems.map((item, index) => (
                                <li key={index}>
                                    {item.name} - ₹ {item.price}
                                </li>
                            ))}
                        </ul>

                        <h3>Total: ₹ {total}</h3>
                    </>
                )}
                <a href="/checkout">
                    <button style={{ marginTop: "20px" }}>
                        Proceed to Checkout
                    </button>
                </a>

            </section>

            <Footer />
        </>
    );
}
