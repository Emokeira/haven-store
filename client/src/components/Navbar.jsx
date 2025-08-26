import { Link, NavLink } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { cart } = useCart();
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo / Home */}
        <Link to="/" className="text-2xl font-bold text-primary">
          Haven Store 🛋️
        </Link>

        {/* Nav Links */}
        <div className="flex gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `hover:text-accent ${
                isActive ? "text-accent font-semibold" : "text-secondary"
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/orders"
            className={({ isActive }) =>
              `hover:text-accent ${
                isActive ? "text-accent font-semibold" : "text-secondary"
              }`
            }
          >
            Orders
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `relative hover:text-accent ${
                isActive ? "text-accent font-semibold" : "text-secondary"
              }`
            }
          >
            <ShoppingCart className="inline w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-accent text-white text-xs font-bold rounded-full px-2">
                {cartCount}
              </span>
            )}
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
