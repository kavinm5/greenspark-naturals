import { useParams } from "react-router-dom";
import products from "../data/products";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./ProductDetails.css";

export default function ProductDetails() {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return <h2 style={{ textAlign: "center" }}>Product not found</h2>;
  }

  return (
    <>
      <Navbar />

      <section className="product-details">
        <div className="details-grid">
          <img src={product.image} alt={product.name} />

          <div className="details-info">
            <h2>{product.name}</h2>
            <p className="price">₹ {product.price}</p>
            <p className="desc">{product.description}</p>

            <button>Add to Cart</button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
