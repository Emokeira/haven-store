// src/components/Footer.jsx
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#1C1C1C] to-[#2E2A28] text-gray-300 py-10 mt-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-serif font-bold text-white mb-3">
            Haven Store
          </h2>
          <p className="text-sm leading-relaxed">
            Bringing comfort to your home with stylish, affordable furniture
            delivered straight to your door.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-amber-400">Home</Link></li>
            <li><Link to="/shop" className="hover:text-amber-400">Shop</Link></li>
            <li><Link to="/categories" className="hover:text-amber-400">Categories</Link></li>
            <li><Link to="/cart" className="hover:text-amber-400">Cart</Link></li>
            <li><Link to="/orders" className="hover:text-amber-400">Orders</Link></li>
            <li><Link to="/about" className="hover:text-amber-400">About Us</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Contact</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <Phone size={16} className="text-amber-400" />
              <a href="tel:+254707864228" className="hover:text-amber-400">
                +254 707 864 228
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} className="text-amber-400" />
              <a
                href="mailto:edithmokeira7@gmail.com"
                className="hover:text-amber-400"
              >
                edithmokeira7@gmail.com
              </a>
            </li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Follow Us</h3>
          <div className="flex gap-4">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <Facebook className="hover:text-amber-400" size={20} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <Instagram className="hover:text-amber-400" size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <Twitter className="hover:text-amber-400" size={20} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">
              <Linkedin className="hover:text-amber-400" size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom note */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Haven Store. All rights reserved.
      </div>
    </footer>
  );
}
