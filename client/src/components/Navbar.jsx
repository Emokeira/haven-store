import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const linkClass = (path) =>
    `px-3 py-2 rounded hover:bg-primary hover:text-white transition-colors ${
      location.pathname === path ? "bg-primary text-white" : "text-primary"
    }`;

  return (
    <nav className="bg-background shadow px-6 py-4 flex justify-center gap-4">
      <Link to="/" className={linkClass("/")}>Home</Link>
      <Link to="/cart" className={linkClass("/cart")}>Cart</Link>
      <Link to="/orders" className={linkClass("/orders")}>Orders</Link>
    </nav>
  );
}
