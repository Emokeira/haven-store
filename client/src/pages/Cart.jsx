import { useEffect, useState } from "react";
import { getCart, updateCartItem, removeCartItem } from "../api/cart";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = 1; // hardcoded John Doe

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const data = await getCart(userId);
        setCartItems(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  const handleQuantityChange = async (itemId, qty) => {
    try {
      await updateCartItem(itemId, qty);
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === itemId ? { ...item, quantity: qty } : item
        )
      );
    } catch (err) {
      alert("Failed to update quantity");
    }
  };

  const handleRemove = async (itemId) => {
    try {
      await removeCartItem(itemId);
      setCartItems((prev) => prev.filter((item) => item.id !== itemId));
    } catch (err) {
      alert("Failed to remove item");
    }
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  if (loading) return <p className="text-center mt-20 text-primary">Loading cart...</p>;

  if (cartItems.length === 0)
    return <p className="text-center mt-20 text-primary">Your cart is empty.</p>;

  return (
    <div className="min-h-screen bg-background px-6 py-10">
      <h1 className="text-3xl font-bold text-primary mb-6 text-center">Your Cart</h1>

      <div className="max-w-4xl mx-auto space-y-4">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center bg-white p-4 rounded shadow"
          >
            <img
              src={item.product.image || "https://via.placeholder.com/100"}
              alt={item.product.name}
              className="w-24 h-24 object-cover rounded mr-4"
            />
            <div className="flex-1">
              <h2 className="font-semibold text-primary">{item.product.name}</h2>
              <p className="text-secondary">{item.product.category}</p>
              <p className="font-bold text-accent">${item.product.price}</p>
              <div className="mt-2 flex items-center gap-2">
                <label>Qty:</label>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) =>
                    handleQuantityChange(item.id, parseInt(e.target.value))
                  }
                  className="w-16 border rounded px-2 py-1"
                />
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  onClick={() => handleRemove(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}

        <div className="text-right mt-6 text-xl font-bold">
          Total: ${totalPrice.toFixed(2)}
        </div>
      </div>
    </div>
  );
}
