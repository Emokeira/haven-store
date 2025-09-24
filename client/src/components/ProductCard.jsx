import React from "react";

export default function ProductCard({ product, addToCart }) {
  // Ensure the product.image is already imported in Landing.jsx
  const productImage = product.image;

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-2xl transition duration-500">
      {/* Image Section */}
      <div className="relative overflow-hidden">
        <img
          src={productImage}
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Optional badge */}
        {product.isNew && (
          <span className="absolute top-3 left-3 bg-amber-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
            New
          </span>
        )}
      </div>

      {/* Info Section */}
      <div className="p-5 flex flex-col">
        <h3 className="text-lg font-serif font-semibold text-gray-800 truncate mb-2">
          {product.name}
        </h3>
        <p className="text-xl font-bold text-amber-600 mb-4">${product.price}</p>

        <button
          onClick={() => addToCart(product)}
          className="mt-auto bg-amber-500 text-white py-3 rounded-xl shadow-lg hover:bg-amber-600 active:scale-95 transition transform"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
