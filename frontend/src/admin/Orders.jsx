import { useEffect, useState } from "react";
import { apiRequest } from "../services/api";

const STATUS_OPTIONS = [
  "Pending",
  "Packed",
  "Shipped",
  "Delivered",
  "Cancelled"
];

export default function Orders() {
  const [orders, setOrders] = useState([]);

  const loadOrders = async () => {
    const data = await apiRequest("/api/admin/orders", "GET", null, true);
    setOrders(data);
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const updateStatus = async (orderId, status) => {
    await apiRequest(
      `/api/admin/orders/${orderId}/status`,
      "PATCH",
      { status },
      true
    );
    loadOrders();
  };

  return (
    <div>
      <h2>Manage Orders</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User ID</th>
            <th>Total</th>
            <th>Status</th>
            <th>Update</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((o) => (
            <tr key={o.id}>
              <td>{o.id}</td>
              <td>{o.user_id}</td>
              <td>₹ {o.total}</td>
              <td>{o.status}</td>
              <td>
                <select
                  value={o.status}
                  onChange={(e) =>
                    updateStatus(o.id, e.target.value)
                  }
                >
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
