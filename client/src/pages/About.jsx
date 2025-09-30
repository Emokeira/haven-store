// src/pages/About.jsx
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 space-y-12">
      {/* Hero Section */}
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">About Haven Store</h1>
        <p className="text-lg text-gray-600">
          Your one-stop destination for stylish, affordable, and high-quality
          home essentials.
        </p>
      </section>

      {/* Our Story */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">Our Story</h2>
        <p className="text-gray-700 leading-relaxed">
          Haven Store was born from a simple idea: creating a marketplace where
          comfort meets style without compromising on quality. What started as a
          small vision has now grown into a platform that brings together a
          curated selection of furniture, decor, and lifestyle essentials —
          carefully chosen to turn every house into a true home.
        </p>
        <p className="text-gray-700 leading-relaxed">
          We believe that shopping for your home should be seamless, inspiring,
          and enjoyable. That’s why we’ve built Haven Store with both elegance
          and functionality in mind — from browsing to checkout, we want every
          step to feel effortless.
        </p>
      </section>

      {/* Our Values */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">Our Values</h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>
            <strong>Quality First:</strong> We handpick every product with
            durability and design in mind.
          </li>
          <li>
            <strong>Customer-Centric:</strong> Your satisfaction drives every
            decision we make.
          </li>
          <li>
            <strong>Affordability:</strong> Beautiful homes shouldn’t break the
            bank — we keep our prices fair and transparent.
          </li>
          <li>
            <strong>Sustainability:</strong> We value eco-conscious choices and
            support responsible sourcing.
          </li>
        </ul>
      </section>

      {/* Why Choose Us */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">Why Choose Us?</h2>
        <p className="text-gray-700 leading-relaxed">
          At Haven Store, you’re not just shopping — you’re joining a community
          that values comfort, creativity, and connection. From our dedicated
          customer support to our easy return policies, everything we do is
          designed to give you confidence and peace of mind.
        </p>
      </section>

      {/* Call to Action */}
      <section className="text-center">
        <Link
          to="/"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition"
        >
          Start Shopping
        </Link>
      </section>
    </div>
  );
}
