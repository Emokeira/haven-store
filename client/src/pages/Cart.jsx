import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { cart, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    // Here you can later connect to backend (createOrder API)
    alert("Checkout successful! Order placed.");
    clearCart();
    navigate("/orders");
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold text-primary mb-4">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-secondary">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-gray-50 p-3 rounded"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={item.image || "https://via.placeholder.com/50"}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div>
                    <p className="text-primary font-medium">{item.name}</p>
                    <p className="text-secondary">
                      Qty: {item.quantity} × ${item.price}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:underline"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-between items-center">
            <h2 className="text-xl font-semibold">Total: ${total.toFixed(2)}</h2>
            <button
              onClick={handleCheckout}
              className="bg-primary text-white px-6 py-2 rounded hover:bg-accent transition-colors"
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
