import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <header className="navbar">
      <Link className="brand" to={isAuthenticated ? "/products/men" : "/login"}>
        ShopSphere
      </Link>

      {isAuthenticated && (
        <nav className="nav-links">
          <NavLink to="/products/men">Men</NavLink>
          <NavLink to="/products/women">Women</NavLink>
          <NavLink to="/products/kids">Kids</NavLink>
          <NavLink to="/cart">Cart ({cartCount})</NavLink>
        </nav>
      )}

      {isAuthenticated && (
        <div className="nav-user">
          <span>Hi, {user.name}</span>
          <button className="link-button" onClick={handleLogout}>Logout</button>
        </div>
      )}
    </header>
  );
}