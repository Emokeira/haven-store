import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ShoppingCart, User } from "lucide-react";
import logo from "../assets/logo.png"; // refined logo

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-gradient-to-r from-[#1C1C1C] to-[#2E2A28] shadow-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo + Brand */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src={logo}
            alt="Haven Store"
            className="h-12 w-auto rounded-md shadow-md"
          />
          <span className="text-2xl font-bold text-white hover:text-amber-400 transition font-serif tracking-wide">
            Haven Store
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8 text-gray-200 font-medium">
          <Link to="/" className="hover:text-amber-400 transition">Home</Link>
          <Link to="/orders" className="hover:text-amber-400 transition">Orders</Link>
          <Link
            to="/cart"
            className="hover:text-amber-400 transition flex items-center gap-1"
          >
            <ShoppingCart size={18} /> Cart
            <span className="ml-1 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              0
            </span>
          </Link>

          {!user ? (
            <>
              <Link to="/login" className="hover:text-amber-400 transition">
                Login
              </Link>
              <Link to="/register" className="hover:text-amber-400 transition">
                Register
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1 text-gray-100 font-medium">
                <User size={18} /> Hello, {user.name.split(" ")[0]}
              </span>
              <button
                onClick={handleLogout}
                className="bg-amber-500 text-white px-3 py-1 rounded-lg hover:bg-amber-600 transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-100 text-2xl focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-6 pb-4 space-y-3 bg-[#1C1C1C] text-gray-200 shadow-xl">
          <Link
            to="/"
            className="block hover:text-amber-400 transition"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/orders"
            className="block hover:text-amber-400 transition"
            onClick={() => setIsOpen(false)}
          >
            Orders
          </Link>
          <Link
            to="/cart"
            className="block hover:text-amber-400 transition flex items-center gap-1"
            onClick={() => setIsOpen(false)}
          >
            <ShoppingCart size={18} /> Cart
          </Link>

          {!user ? (
            <>
              <Link
                to="/login"
                className="block hover:text-amber-400 transition"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block hover:text-amber-400 transition"
                onClick={() => setIsOpen(false)}
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <span className="block text-gray-100 font-medium">
                Hello, {user.name.split(" ")[0]}
              </span>
              <button
                onClick={handleLogout}
                className="w-full text-left bg-amber-500 text-white px-3 py-2 rounded-lg hover:bg-amber-600 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
