import { useEffect, useState } from "react";
import { apiRequest } from "../services/api";
import ProductCard from "./ProductCard";
import "./FeaturedProducts.css";

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    apiRequest("/api/products").then((data) => {
      setProducts(data.slice(0, 3));
    });
  }, []);

  return (
    <section className="gs-featured">
      <h2 className="gs-title">Featured Products</h2>

      <div className="gs-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            hideAddButton={false}
          />
        ))}
      </div>
    </section>
  );
}
