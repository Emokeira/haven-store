import { useState } from "react";
import { Heart, ShoppingCart, Eye } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart(); // 🔥 direct from context
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const productImage = product.imageUrl || product.image || "/placeholder.jpg"; // fallback

  return (
    <>
      {/* Product Card */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden group hover:shadow-2xl transition duration-500 relative">
        {/* Image Section */}
        <div className="relative overflow-hidden">
          <img
            src={productImage}
            alt={product.name}
            className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Wishlist Heart */}
          <button
            onClick={() => setIsWishlisted(!isWishlisted)}
            className="absolute top-3 right-3 bg-white/80 backdrop-blur-md p-2 rounded-full shadow-md hover:bg-amber-100 transition"
          >
            <Heart
              size={18}
              className={isWishlisted ? "text-red-500 fill-red-500" : "text-gray-600"}
            />
          </button>

          {/* Quick View */}
          <button
            onClick={() => setShowModal(true)}
            className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md p-2 rounded-full shadow-md hover:bg-amber-100 transition"
          >
            <Eye size={18} className="text-gray-700" />
          </button>

          {/* Badges */}
          {product.isNew && (
            <span className="absolute top-3 left-3 bg-amber-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
              New
            </span>
          )}
          {product.featured && (
            <span className="absolute bottom-3 left-3 bg-rose-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
              Featured
            </span>
          )}
        </div>

        {/* Info Section */}
        <div className="p-5 flex flex-col">
          <h3 className="text-lg font-serif font-semibold text-gray-800 truncate mb-1">
            {product.name}
          </h3>
          <p className="text-sm text-gray-500 line-clamp-2 mb-3">
            {product.description || "Beautiful product to complete your home."}
          </p>

          <div className="flex items-center justify-between mt-auto">
            <p className="text-xl font-bold text-amber-600">${product.price}</p>

            <button
              onClick={() => addToCart(product)}
              className="flex items-center gap-1 bg-amber-500 text-white px-3 py-2 rounded-lg shadow-md hover:bg-amber-600 active:scale-95 transition"
            >
              <ShoppingCart size={16} /> Add
            </button>
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 relative">
            {/* Close button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
            >
              ✕
            </button>

            <img
              src={productImage}
              alt={product.name}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />

            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {product.name}
            </h2>
            <p className="text-gray-600 mb-4">
              {product.description || "This product has no description yet."}
            </p>

            <p className="text-xl font-bold text-amber-600 mb-4">
              ${product.price}
            </p>

            <button
              onClick={() => {
                addToCart(product);
                setShowModal(false);
              }}
              className="w-full bg-amber-500 text-white py-3 rounded-lg hover:bg-amber-600 transition"
            >
              <ShoppingCart size={18} className="inline-block mr-2" />
              Add to Cart
            </button>
          </div>
        </div>
      )}
    </>
  );
}
