import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-amber-600 text-white px-6 py-3 shadow-md flex justify-between items-center">
      {/* Logo / Brand */}
      <Link to="/" className="text-2xl font-bold hover:text-amber-200">
        Haven Store
      </Link>

      {/* Links */}
      <div className="space-x-6">
        <Link to="/" className="hover:text-amber-200">
          Home
        </Link>
        <Link to="/orders" className="hover:text-amber-200">
          Orders
        </Link>
        <Link to="/cart" className="hover:text-amber-200">
          Cart
        </Link>
        <Link to="/login" className="hover:text-amber-200">
          Login
        </Link>
        <Link to="/register" className="hover:text-amber-200">
          Register
        </Link>
      </div>
    </nav>
  );
}
