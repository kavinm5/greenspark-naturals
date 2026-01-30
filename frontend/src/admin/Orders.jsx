import { useEffect, useState } from "react";
import { apiRequest } from "../services/api";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    apiRequest("/api/admin/orders", "GET", null, true)
      .then(setOrders);
  }, []);

  return (
    <>
      <h2>Orders</h2>

      <ul>
        {orders.map((o) => (
          <li key={o.id}>
            Order #{o.id} – {o.status}
          </li>
        ))}
      </ul>
    </>
  );
}
