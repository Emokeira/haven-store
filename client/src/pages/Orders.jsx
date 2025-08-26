import { useEffect, useState } from "react";
import { getOrders, createOrder } from "../api/orders";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = 1; // John Doe for now

  const fetchOrders = async () => {
    try {
      const data = await getOrders(userId);
      setOrders(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleCheckout = async () => {
    try {
      await createOrder(userId);
      alert("Order placed successfully!");
      fetchOrders(); // refresh orders after checkout
    } catch (err) {
      alert("Failed to place order. Check console.");
    }
  };

  if (loading)
    return (
      <p className="text-center mt-20 text-primary text-lg">
        Loading orders...
      </p>
    );

  return (
    <div className="min-h-screen bg-background px-6 py-10">
      <h1 className="text-3xl font-bold text-primary mb-6 text-center">
        Your Orders
      </h1>

      <div className="max-w-4xl mx-auto mb-6 text-right">
        <button
          onClick={handleCheckout}
          className="bg-primary text-white px-4 py-2 rounded hover:bg-accent transition-colors"
        >
          Checkout Cart
        </button>
      </div>

      {orders.length === 0 ? (
        <p className="text-center text-secondary">
          You have no orders yet.
        </p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white p-4 rounded shadow"
            >
              <h2 className="font-semibold text-primary mb-2">
                Order #{order.id} - Total: $
                {order.items.reduce(
                  (sum, item) => sum + item.price * item.quantity,
                  0
                ).toFixed(2)}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-2 bg-gray-50 p-2 rounded"
                  >
                    <img
                      src={item.image || "https://via.placeholder.com/50"}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div>
                      <p className="text-primary font-medium">{item.name}</p>
                      <p className="text-secondary">
                        Qty: {item.quantity} | ${item.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
