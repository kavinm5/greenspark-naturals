import { Link, Outlet } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div style={{ display: "flex" }}>
      <aside style={{ width: 200, padding: 20, background: "#f0f0f0" }}>
        <h3>Admin</h3>
        <ul>
          <li><Link to="products">Products</Link></li>
          <li><Link to="orders">Orders</Link></li>
        </ul>
      </aside>

      <main style={{ flex: 1, padding: 20 }}>
        <Outlet />
      </main>
    </div>
  );
}
