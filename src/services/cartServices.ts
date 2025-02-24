import api from "./api";

export const getCartItems = async () => {
  const response = await api.get("/cart/cart/");
  return response.data;
};

export const addToCart = async (productId: string, quantity: number) => {
  const response = await api.post("/cart/cart/", { product: productId, quantity });
  return response.data;
};

export const updateCartItem = async (cartItemId: string, quantity: number) => {
  const response = await api.put(`/cart/cart/${cartItemId}/`, { quantity });
  return response.data;
};

export const removeCartItem = async (cartItemId: string) => {
  const response = await api.delete(`/cart/cart/${cartItemId}/`);
  return response.data;
};

export const clearCart = async () => {
  const response = await api.delete("/cart/cart/clear/");
  return response.data;
};
