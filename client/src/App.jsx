// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Checkout from "./pages/Checkout";
import About from "./pages/About"; // 👈 new page
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-background flex flex-col">
          {/* Navbar (always visible) */}
          <Navbar />

          {/* Page Content */}
          <div className="flex-1 px-4 py-6">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/about" element={<About />} /> {/* 👈 new route */}
            </Routes>
          </div>

          {/* Footer (always at bottom) */}
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
