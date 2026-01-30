import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../services/api";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await apiRequest(
      "/api/admin/login",
      "POST",
      { email, password },
      false
    );

    if (res.access_token) {
      localStorage.setItem("admin_token", res.access_token);
      navigate("/admin");
    } else {
      alert("Invalid admin credentials");
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Admin Login</h2>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br /><br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br /><br />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
