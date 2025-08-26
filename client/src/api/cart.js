import api from "./axios";

// Add a product to cart
export const addToCart = async (userId, productId, quantity = 1) => {
  try {
    const res = await api.post("/cart", { userId, productId, quantity });
    return res.data;
  } catch (err) {
    console.error("Error adding to cart:", err);
    throw err;
  }
};

// Fetch user's cart
export const getCart = async (userId) => {
  try {
    const res = await api.get(`/cart/${userId}`);
    return res.data;
  } catch (err) {
    console.error("Error fetching cart:", err);
    throw err;
  }
};

// Update quantity for a cart item
export const updateCartItem = async (cartItemId, quantity) => {
  try {
    const res = await api.put(`/cart/${cartItemId}`, { quantity });
    return res.data;
  } catch (err) {
    console.error("Error updating cart item:", err);
    throw err;
  }
};

// Remove item from cart
export const removeCartItem = async (cartItemId) => {
  try {
    const res = await api.delete(`/cart/${cartItemId}`);
    return res.data;
  } catch (err) {
    console.error("Error removing cart item:", err);
    throw err;
  }
};
