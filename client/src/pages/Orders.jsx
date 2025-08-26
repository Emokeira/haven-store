import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const { cart } = useCart();

  useEffect(() => {
    // Later connect to backend API
    // For now, just mock orders after checkout
    setOrders([
      {
        id: 1,
        items: cart,
        createdAt: new Date().toLocaleString(),
      },
    ]);
  }, []);

  return (
    <div className="min-h-screen bg-background px-6 py-10">
      <h1 className="text-3xl font-bold text-primary mb-6 text-center">
        Your Orders
      </h1>

      {orders.length === 0 ? (
        <p className="text-center text-secondary">You have no orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white p-4 rounded shadow">
              <h2 className="font-semibold text-primary mb-2">
                Order #{order.id} — {order.createdAt}
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
