import api from "./axios";

// Place an order (checkout)
export const createOrder = async (userId) => {
  try {
    const res = await api.post("/orders", { userId });
    return res.data;
  } catch (err) {
    console.error("Error creating order:", err);
    throw err;
  }
};

// Fetch user's orders
export const getOrders = async (userId) => {
  try {
    const res = await api.get(`/orders/${userId}`);
    return res.data;
  } catch (err) {
    console.error("Error fetching orders:", err);
    throw err;
  }
};
