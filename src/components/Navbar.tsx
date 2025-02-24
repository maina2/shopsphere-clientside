import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import '../styles/navbar.css'

const Navbar = () => {
  const { cart } = useCart();

  return (
    <nav className="navbar">
      <h1>ShopSphere</h1>
      <div>
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