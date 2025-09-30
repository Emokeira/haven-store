import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { ShoppingCart, User, Search } from "lucide-react";
import logo from "../assets/logo.png";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useCart(); // 🔥 cart context
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Fetch categories from backend
  useEffect(() => {
    const fetchCats = async () => {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();
        if (data.success) setCategories(data.data);
      } catch (err) {
        console.error("Navbar categories fetch error:", err);
      }
    };
    fetchCats();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  // 🔥 total items in cart
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

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

        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex items-center bg-white rounded-full shadow-md px-4 py-1 w-1/2"
        >
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for products..."
            className="flex-1 outline-none px-2 text-gray-700"
          />
          <button type="submit" className="text-gray-500 hover:text-amber-500">
            <Search size={18} />
          </button>
        </form>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8 text-gray-200 font-medium">
          <div className="relative group">
            <span className="hover:text-amber-400 cursor-pointer">Categories</span>
            <div className="absolute hidden group-hover:block bg-white text-gray-800 mt-2 rounded-md shadow-lg min-w-[150px] z-20">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  to={`/category/${cat.id}`}
                  className="block px-4 py-2 hover:bg-amber-100"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>

          <Link to="/orders" className="hover:text-amber-400 transition">
            Orders
          </Link>

          {/* Cart with badge */}
          <Link
            to="/cart"
            className="hover:text-amber-400 transition flex items-center gap-1 relative"
          >
            <ShoppingCart size={18} /> Cart
            {cartCount > 0 && (
              <span className="ml-1 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
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
          <form
            onSubmit={handleSearch}
            className="flex items-center bg-white rounded-md px-3 py-2"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="flex-1 outline-none text-gray-700"
            />
            <button type="submit" className="text-gray-500 hover:text-amber-500">
              <Search size={18} />
            </button>
          </form>

          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/category/${cat.id}`}
              className="block hover:text-amber-400 transition"
              onClick={() => setIsOpen(false)}
            >
              {cat.name}
            </Link>
          ))}

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
            {cartCount > 0 && (
              <span className="ml-1 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
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
