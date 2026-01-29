import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./OrderSuccess.css";

export default function OrderSuccess() {
  return (
    <>
      <Navbar />

      <section className="order-success">
        <div className="success-box">
          <h2>🎉 Order Placed Successfully!</h2>
          <p>
            Thank you for shopping with <strong>GS Store</strong>.
            Your order has been received and will be processed soon.
          </p>

          <a href="/">
            <button>Back to Home</button>
          </a>
        </div>
      </section>

      <Footer />
    </>
  );
}
