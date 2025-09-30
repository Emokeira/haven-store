import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Trash2, Minus, Plus } from "lucide-react";

export default function Cart() {
  const { cart, addToCart, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    navigate("/checkout"); // 👈 navigate to checkout page
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <ShoppingCart size={22} className="text-amber-600" /> Your Cart
      </h1>

      {cart.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <ShoppingCart size={40} className="mx-auto mb-3 opacity-60" />
          <p className="text-lg">Your cart is empty.</p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 px-6 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition"
          >
            Browse Products
          </button>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm"
              >
                {/* Product Info */}
                <div className="flex items-center gap-4">
                  <img
                    src={item.image || "https://via.placeholder.com/60"}
                    alt={item.name}
                    className="w-14 h-14 object-cover rounded-md"
                  />
                  <div>
                    <p className="font-medium text-gray-800">{item.name}</p>
                    <p className="text-gray-500 text-sm">${item.price} each</p>
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-1.5 rounded bg-gray-200 hover:bg-gray-300"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="min-w-[20px] text-center font-medium">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => addToCart(item)}
                    className="p-1.5 rounded bg-gray-200 hover:bg-gray-300"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                {/* Remove */}
                <button
                  onClick={() =>
                    [...Array(item.quantity)].forEach(() =>
                      removeFromCart(item.id)
                    )
                  }
                  className="text-red-500 hover:text-red-600"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>

          {/* Cart Total + Checkout */}
          <div className="mt-8 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">
              Total: ${total.toFixed(2)}
            </h2>
            <button
              onClick={handleCheckout}
              disabled={cart.length === 0}
              className={`px-6 py-3 rounded-lg font-medium text-white transition
                ${
                  cart.length === 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-amber-500 hover:bg-amber-600 active:scale-95"
                }`}
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
