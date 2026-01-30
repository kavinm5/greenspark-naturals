import { useEffect, useState } from "react";
import { apiRequest } from "../services/api";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    apiRequest("/api/admin/products", "GET", null, true)
      .then(setProducts);
  }, []);

  return (
    <>
      <h2>Products</h2>

      <ul>
        {products.map((p) => (
          <li key={p.id}>
            {p.name} – ₹{p.price}
          </li>
        ))}
      </ul>
    </>
  );
}
