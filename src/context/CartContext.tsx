import { createContext, useContext, useState, useEffect } from "react";
import { getCart, addToCart, updateCartItem, removeFromCart, clearCart } from "../services/cartService";

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

  // Load cart from localStorage on mount
  useEffect(() => {
    setCart(getCart());
  }, []);

  // Functions to manage cart
  const addItem = (product: any) => {
    setCart(addToCart(product));
  };

  const updateItem = (productId: number, quantity: number) => {
    setCart(updateCartItem(productId, quantity));
  };

  const removeItem = (productId: number) => {
    setCart(removeFromCart(productId));
  };

  const clearCartItems = () => {
    clearCart();
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addItem, updateItem, removeItem, clearCartItems }}>
      {children}
    </CartContext.Provider>
  );
};
