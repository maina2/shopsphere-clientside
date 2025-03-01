// Get cart from localStorage for a specific user
export const getCart = (userId: number): any[] => {
  const cart = localStorage.getItem(`cart_${userId}`);
  return cart ? JSON.parse(cart) : [];
};

// Add item to cart for a specific user
export const addToCart = (userId: number, product: any): any[] => {
  const cart = getCart(userId);
  const existingItem = cart.find((item) => item.id === product.id);

  if (existingItem) {
    // Update quantity if item already exists
    existingItem.quantity += 1;
  } else {
    // Add new item to cart
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem(`cart_${userId}`, JSON.stringify(cart));
  return cart;
};

// Update item quantity in cart for a specific user
export const updateCartItem = (userId: number, productId: number, quantity: number): any[] => {
  const cart = getCart(userId);
  const item = cart.find((item) => item.id === productId);

  if (item) {
    item.quantity = quantity;
    localStorage.setItem(`cart_${userId}`, JSON.stringify(cart));
  }

  return cart;
};

// Remove item from cart for a specific user
export const removeFromCart = (userId: number, productId: number): any[] => {
  const cart = getCart(userId).filter((item) => item.id !== productId);
  localStorage.setItem(`cart_${userId}`, JSON.stringify(cart));
  return cart;
};

// Clear the cart for a specific user
export const clearCart = (userId: number): void => {
  localStorage.removeItem(`cart_${userId}`);
};