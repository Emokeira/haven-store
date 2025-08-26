import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Landing() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(null); // productId currently being added

  const userId = 1; // temporary, John Doe

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/products");
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/categories");
        setCategories(res.data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

  // Add to cart handler
  const handleAddToCart = async (productId) => {
    try {
      setAdding(productId);
      await api.post("/cart", {
        userId,
        productId,
        quantity: 1,
      });
      alert("Added to cart!");
    } catch (err) {
      console.error("Error adding to cart:", err);
      alert("Failed to add to cart.");
    } finally {
      setAdding(null);
    }
  };

  if (loading) {
    return (
      <p className="text-center mt-20 text-primary text-lg">
        Loading products...
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-background px-6 py-10">
      {/* Hero Section */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-primary mb-4">
          Haven Store 🛋️
        </h1>
        <p className="text-secondary text-lg">
          Your home, your style. Discover curated furniture & décor to make every space cozy and elegant.
        </p>
      </div>

      {/* Category Filters */}
      <div className="flex justify-center flex-wrap gap-4 mb-8">
        <button
          className={`px-4 py-2 rounded border ${
            selectedCategory === "all"
              ? "bg-primary text-white border-primary"
              : "bg-white text-primary border-gray-300"
          }`}
          onClick={() => setSelectedCategory("all")}
        >
          All
        </button>

        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`px-4 py-2 rounded border ${
              selectedCategory === cat.name
                ? "bg-primary text-white border-primary"
                : "bg-white text-primary border-gray-300"
            }`}
            onClick={() => setSelectedCategory(cat.name)}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products
          .filter(
            (p) => selectedCategory === "all" || p.category === selectedCategory
          )
          .map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow p-4 flex flex-col"
            >
              <img
                src={product.image || "https://via.placeholder.com/150"}
                alt={product.name}
                className="w-full h-48 object-cover mb-4 rounded"
              />
              <h2 className="text-lg font-semibold text-primary mb-1">
                {product.name}
              </h2>
              <p className="text-secondary mb-2">{product.category}</p>
              <p className="font-bold text-accent mb-3">${product.price}</p>
              <button
                className="mt-auto bg-primary text-white px-4 py-2 rounded hover:bg-accent transition-colors disabled:opacity-50"
                onClick={() => handleAddToCart(product.id)}
                disabled={adding === product.id}
              >
                {adding === product.id ? "Adding..." : "Add to Cart"}
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}
