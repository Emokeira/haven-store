import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Landing() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams(); // category id from URL (/category/:id)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = "/api/products"; // ✅ use relative path
        if (id) {
          url += `?categoryId=${id}`;
        }

        const { data } = await axios.get(url);
        if (data.success) {
          setProducts(data.data);
        } else {
          setError("Failed to fetch products");
        }
      } catch (err) {
        setError("Error fetching products: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [id]);

  const addToCart = (product) => {
    console.log("Add to cart clicked:", product);
  };

  if (loading) {
    return <p className="text-center py-10">Loading products...</p>;
  }

  if (error) {
    return <p className="text-center py-10 text-red-500">{error}</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-serif font-bold text-gray-800 mb-8 text-center">
        {id ? `Category Products` : "Featured Products"}
      </h1>
      {products.length === 0 ? (
        <p className="text-center text-gray-500">No products available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
            />
          ))}
        </div>
      )}
    </div>
  );
}
