import { Link } from "react-router-dom";

export default function Navbar() {
  const user = localStorage.getItem("user_token");

  return (
    <nav style={{
      padding: "16px 32px",
      display: "flex",
      justifyContent: "space-between",
      borderBottom: "1px solid #eee"
    }}>
      <h2 style={{ color: "#2e7d32" }}>GreenSpark Naturals</h2>

      <div style={{ display: "flex", gap: 20 }}>
        <Link to="/">Home</Link>
        <Link to="/shop">Shop</Link>

        {user ? (
          <>
            <Link to="/my-orders">My Orders</Link>
            <button
              onClick={() => {
                localStorage.removeItem("user_token");
                window.location.href = "/";
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
