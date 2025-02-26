import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "../styles/cart.css"; // Import the CSS file
import Navbar from "../components/Navbar";

const Cart = () => {
  const { cart, updateItem, removeItem, clearCartItems } = useCart();
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <Navbar />

      <div className="cart-container">
        <h2 className="cart-title">Shopping Cart</h2>

        {cart.length === 0 ? (
          <p className="empty-cart-message">Your cart is empty.</p>
        ) : (
          <div className="cart-content">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <img
                  src={item.image}
                  alt={item.name}
                  className="cart-item-image"
                />
                <span className="cart-item-name">{item.name}</span>
                <span className="cart-item-price">${item.price}</span>
                <input
                  type="number"
                  value={item.quantity}
                  min="1"
                  onChange={(e) =>
                    updateItem(item.id, parseInt(e.target.value))
                  }
                  className="cart-item-quantity"
                />
                <button
                  onClick={() => removeItem(item.id)}
                  className="remove-item-button"
                >
                  Remove
                </button>
              </div>
            ))}
            <div className="cart-actions">
              <button onClick={clearCartItems} className="clear-cart-button">
                Clear Cart
              </button>
              <button
                onClick={() => navigate("/checkout")}
                className="checkout-button"
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
