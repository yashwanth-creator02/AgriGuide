// frontend/src/pages/MarketPrices.tsx

import { useState, useEffect } from 'react';
import { fetchMarketPrices } from '../services/marketService';

function MarketPrices() {
  const [marketData, setMarketData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMarketPrices()
      .then(setMarketData)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">Loading...</div>
    );
  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-green-700 mb-2">Market Prices</h1>
        <p className="text-gray-500 text-sm mb-8">Latest crop prices from markets across India</p>

        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-green-700 text-white">
              <tr>
                <th className="text-left px-6 py-3">Crop</th>
                <th className="text-left px-6 py-3">Price (₹/quintal)</th>
                <th className="text-left px-6 py-3">Market</th>
                <th className="text-left px-6 py-3">Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {marketData.map((item, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-6 py-4 font-medium text-gray-800">{item.crop}</td>
                  <td className="px-6 py-4 text-green-600 font-semibold">₹{item.price}</td>
                  <td className="px-6 py-4 text-gray-600">{item.market}</td>
                  <td className="px-6 py-4 text-gray-400">{item.updated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default MarketPrices;
