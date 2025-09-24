import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import heroImg from "../assets/hero.jpg";
import sofaImg from "../assets/products/sofa.jpg";
import chairImg from "../assets/products/office-chair.jpg";
import tableImg from "../assets/products/dining-table.jpg";

const sampleProducts = [
  { id: 1, name: "Modern Sofa", price: 499, image: sofaImg, isNew: true },
  { id: 2, name: "Office Chair", price: 199, image: chairImg, isNew: true},
  { id: 3, name: "Dining Table", price: 699, image: tableImg, isNew: true },
];

const categories = [
  { id: 1, name: "Living Room", image: sofaImg, link: "/category/living" },
  { id: 2, name: "Office", image: chairImg, link: "/category/office" },
  { id: 3, name: "Dining", image: tableImg, link: "/category/dining" },
];

export default function Landing() {
  const [products, setProducts] = useState([]);

  useEffect(() => setProducts(sampleProducts), []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-amber-50">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between py-20 max-w-7xl mx-auto px-6">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h1 className="text-5xl font-extrabold text-gray-800 mb-6 tracking-wide font-serif">
            Haven Store
          </h1>
          <p className="text-gray-600 text-lg md:text-xl mb-6 font-medium">
            Luxury furniture & decor curated for your dream home
          </p>
          <Link
            to="/shop"
            className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-6 rounded-lg transition shadow-md"
          >
            Shop Now
          </Link>
        </div>
        <div className="md:w-1/2 relative">
          <img
            src={heroImg}
            alt="Luxury Home Decor"
            className="rounded-3xl shadow-2xl w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40 rounded-3xl"></div>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="my-16 max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-8 text-gray-800 font-serif">Shop by Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={cat.link}
              className="relative group overflow-hidden rounded-2xl shadow-lg cursor-pointer transform hover:scale-105 transition duration-500"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-56 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-25 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                <h3 className="text-white text-2xl font-semibold">{cat.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="my-16 max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-8 text-gray-800 font-serif">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={(p) => console.log("Add:", p)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
