import "./WhyChooseUs.css";

export default function WhyChooseUs() {
  return (
    <section className="why">
      <h2>Why Choose GS Store?</h2>

      <div className="why-grid">
        <div className="why-card">
          <h3>🌿 100% Natural</h3>
          <p>
            All our products are sourced naturally with no added chemicals
            or preservatives.
          </p>
        </div>

        <div className="why-card">
          <h3>✅ Quality Assured</h3>
          <p>
            We follow strict quality checks to ensure freshness and purity
            in every product.
          </p>
        </div>

        <div className="why-card">
          <h3>🚚 Fresh & Safe Delivery</h3>
          <p>
            Carefully packed and delivered fresh to your doorstep.
          </p>
        </div>
      </div>
    </section>
  );
}
