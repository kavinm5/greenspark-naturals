import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "./ProductDetails.css";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  if (!product) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  if (product.error) {
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

            <button onClick={() => addToCart(product)}>
              Add to Cart
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
