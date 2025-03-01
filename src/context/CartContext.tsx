import { createContext, useContext, useState, useEffect } from "react";
import { getCart, addToCart, updateCartItem, removeFromCart, clearCart } from "../services/cartService";
import { useAuth } from "../context/AuthContext"; // Import the AuthContext

// Define the shape of our context
interface CartContextType {
  cart: any[];
  addItem: (product: any) => void;
  updateItem: (productId: number, quantity: number) => void;
  removeItem: (productId: number) => void;
  clearCartItems: () => void;
}

// Create context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Custom hook for using cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

// Cart Provider Component
export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<any[]>([]);
  const { user } = useAuth(); // Get the logged-in user from AuthContext

  // Load cart from localStorage when the component mounts or the user changes
  useEffect(() => {
    if (user) {
      const userCart = getCart(user.id); // Fetch the user's cart
      setCart(userCart);
    } else {
      setCart([]); // Clear the cart if the user is not logged in
    }
  }, [user]);

  // Add an item to the cart
  const addItem = (product: any) => {
    if (!user) return; // Exit if the user is not logged in
    const updatedCart = addToCart(user.id, product); // Add item to the user's cart
    setCart(updatedCart);
  };

  // Update an item in the cart
  const updateItem = (productId: number, quantity: number) => {
    if (!user) return; // Exit if the user is not logged in
    const updatedCart = updateCartItem(user.id, productId, quantity); // Update item in the user's cart
    setCart(updatedCart);
  };

  // Remove an item from the cart
  const removeItem = (productId: number) => {
    if (!user) return; // Exit if the user is not logged in
    const updatedCart = removeFromCart(user.id, productId); // Remove item from the user's cart
    setCart(updatedCart);
  };

  // Clear the cart
  const clearCartItems = () => {
    if (!user) return; // Exit if the user is not logged in
    clearCart(user.id); // Clear the user's cart
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addItem, updateItem, removeItem, clearCartItems }}>
      {children}
    </CartContext.Provider>
  );
};