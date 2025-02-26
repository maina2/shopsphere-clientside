import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { FaHome, FaUser } from "react-icons/fa"; // Import icons
import '../styles/navbar.css';

const Navbar = () => {
  const { cart } = useCart();

  return (
    <nav className="navbar">

      <h1>ShopSphere</h1>
      <div className="navbar-right">
        <Link to="/home" className="nav-link">
          <FaHome className="nav-icon" />
          <span>Home</span>
        </Link>
        <Link to="/profile" className="nav-link">
          <FaUser className="nav-icon" />
          <span>Profile</span>
        </Link>
      
      
        <Link to="/cart" className="cart-link">
          🛒 Cart
          {cart.length > 0 && (
            <span className="cart-badge">{cart.length}</span>
          )}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;