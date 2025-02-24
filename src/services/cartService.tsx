// Get cart from localStorage
export const getCart = (): any[] => {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
};

// Add item to cart
export const addToCart = (product: any): any[] => {
  const cart = getCart();
  const existingItem = cart.find((item) => item.id === product.id);

  if (existingItem) {
    // Update quantity if item already exists
    existingItem.quantity += 1;
  } else {
    // Add new item to cart
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  return cart;
};

// Update item quantity in cart
export const updateCartItem = (productId: number, quantity: number): any[] => {
  const cart = getCart();
  const item = cart.find((item) => item.id === productId);

  if (item) {
    item.quantity = quantity;
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  return cart;
};

// Remove item from cart
export const removeFromCart = (productId: number): any[] => {
  const cart = getCart().filter((item) => item.id !== productId);
  localStorage.setItem("cart", JSON.stringify(cart));
  return cart;
};

// Clear the cart
export const clearCart = (): void => {
  localStorage.removeItem("cart");
};