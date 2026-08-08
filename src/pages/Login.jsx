import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login, isAuthenticated, error } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isAuthenticated) navigate("/products/men", { replace: true });
  }, [isAuthenticated, navigate]);

  function submit(event) {
    event.preventDefault();
    if (login(userId.trim(), password)) {
      navigate(location.state?.from?.pathname || "/products/men", { replace: true });
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <span className="eyebrow">WELCOME TO SHOPSPHERE</span>
        <h1>Sign in to shop</h1>
        <p className="muted">Products are available after successful authentication.</p>

        <form onSubmit={submit} className="login-form">
          <label>
            User ID
            <input value={userId} onChange={(e) => setUserId(e.target.value)} placeholder="demo" required />
          </label>
          <label>
            Password
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="shop123" required />
          </label>

          {error && <p className="error-message">{error}</p>}
          <button className="primary-button full-width" type="submit">Login</button>
        </form>

        <div className="demo-credentials">
          <strong>Demo credentials</strong>
          <span>User ID: demo</span>
          <span>Password: shop123</span>
        </div>
      </div>
    </div>
  );
}