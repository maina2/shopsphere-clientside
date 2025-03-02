import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { FaHome, FaUser, FaBars, FaTimes } from "react-icons/fa"; // Import icons
import { useState } from "react"; // For handling mobile menu toggle
import '../styles/navbar.css';

const Navbar = () => {
  const { cart } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <h1>ShopSphere</h1>

      {/* Mobile Menu Toggle Button */}
      <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
        {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* Navbar Links */}
      <div className={`navbar-right ${isMobileMenuOpen ? "active" : ""}`}>
        <Link to="/home" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>
          <FaHome className="nav-icon" />
          <span>Home</span>
        </Link>
        <Link to="/profile" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>
          <FaUser className="nav-icon" />
          <span>Profile</span>
        </Link>
        <Link to="/cart" className="cart-link" onClick={() => setIsMobileMenuOpen(false)}>
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