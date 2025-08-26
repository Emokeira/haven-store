import { useLocation, useNavigate } from "react-router-dom";

export default function OrderConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order;

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center">
        <div>
          <h1 className="text-3xl font-bold text-red-500 mb-4">
            No order found
          </h1>
          <button
            className="bg-primary text-white px-6 py-2 rounded hover:bg-accent"
            onClick={() => navigate("/")}
          >
            Back to Store
          </button>
        </div>
      </div>
    );
  }

  const totalPrice = order.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-background px-6 py-10">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-8">
        <h1 className="text-3xl font-bold text-primary mb-6 text-center">
          🎉 Order Confirmed!
        </h1>
        <p className="text-center text-secondary mb-6">
          Thank you for shopping with us. Your order has been placed successfully.
        </p>

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-primary mb-2">
            Order Summary
          </h2>
          <p className="text-secondary mb-4">Order ID: #{order.id}</p>

          <div className="space-y-4">
            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b pb-2"
              >
                <div>
                  <p className="font-medium">{item.product.name}</p>
                  <p className="text-sm text-secondary">
                    Qty: {item.quantity} × ${item.product.price}
                  </p>
                </div>
                <p className="font-bold text-accent">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center mt-6 text-lg font-bold">
            <span>Total:</span>
            <span className="text-accent">${totalPrice.toFixed(2)}</span>
          </div>
        </div>

        <div className="text-center">
          <button
            className="bg-primary text-white px-6 py-2 rounded hover:bg-accent"
            onClick={() => navigate("/")}
          >
            Back to Store
          </button>
        </div>
      </div>
    </div>
  );
}
