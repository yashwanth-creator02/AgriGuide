// frontend/src/pages/Home.tsx

import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-green-700 text-white py-20 px-6 text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to AgriGuide</h1>
        <p className="text-lg mb-8 text-green-100">Smart crop advisory system for modern farmers</p>
        <Link
          to="/soil-input"
          className="bg-white text-green-700 font-semibold px-6 py-3 rounded-lg hover:bg-green-100 transition"
        >
          Get Started
        </Link>
      </section>

      {/* Feature Cards */}
      <section className="py-16 px-6 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold text-green-700 mb-2">Crop Advisory</h2>
          <p className="text-gray-600 text-sm">
            Get personalized crop recommendations based on your soil and weather conditions.
          </p>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold text-green-700 mb-2">Market Prices</h2>
          <p className="text-gray-600 text-sm">
            Stay updated with the latest market prices for crops in your region.
          </p>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold text-green-700 mb-2">Pest Alerts</h2>
          <p className="text-gray-600 text-sm">
            Receive timely alerts about pest outbreaks and how to manage them.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Home;
