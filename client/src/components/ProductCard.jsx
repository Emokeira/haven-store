import React from "react";

export default function ProductCard({ product, addToCart }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
      {/* Product Image */}
      <img
        src={product.image || "/images/noimage.jpg"} // use your image field
        alt={product.name}
        className="w-full h-48 object-cover"
      />

      {/* Product Info */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
        <p className="text-gray-600 mt-1">${product.price.toFixed(2)}</p>

        {/* Add to Cart Button */}
        <button
          onClick={() => addToCart(product)}
          className="mt-4 bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
