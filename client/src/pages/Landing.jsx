import { useCart } from "../context/CartContext";

const sampleProducts = [
  {
    id: 1,
    name: "Modern Sofa",
    price: 499.99,
    image: "https://via.placeholder.com/200x150?text=Sofa",
  },
  {
    id: 2,
    name: "Dining Table",
    price: 299.99,
    image: "https://via.placeholder.com/200x150?text=Table",
  },
  {
    id: 3,
    name: "Office Chair",
    price: 149.99,
    image: "https://via.placeholder.com/200x150?text=Chair",
  },
];

export default function Landing() {
  const { addToCart } = useCart();

  return (
    <div className="min-h-screen bg-background px-6 py-10">
      <h1 className="text-3xl font-bold text-center text-primary mb-8">
        Welcome to Haven Store 🏡
      </h1>

      <p className="text-center text-secondary max-w-xl mx-auto mb-12">
        Discover premium furniture and décor for your home. Add your favorites to the cart and check out with ease!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {sampleProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded shadow hover:shadow-lg transition p-4 flex flex-col items-center"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-40 h-32 object-cover mb-4 rounded"
            />
            <h2 className="text-lg font-semibold text-primary">{product.name}</h2>
            <p className="text-secondary mb-3">${product.price}</p>
            <button
              onClick={() => addToCart(product)}
              className="bg-primary text-white px-4 py-2 rounded hover:bg-accent transition-colors"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
