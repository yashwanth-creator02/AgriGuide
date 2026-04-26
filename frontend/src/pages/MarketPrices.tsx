// frontend/src/pages/MarketPrices.tsx

import { Skeleton } from '@/components/ui/skeleton';
import { useState, useEffect } from 'react';
import { fetchMarketPrices } from '../services/marketService';

function MarketPrices() {
  const [marketData, setMarketData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [commodity, setCommodity] = useState('');

  const loadPrices = (commodityFilter?: string) => {
    setLoading(true);
    setError(null);
    fetchMarketPrices(commodityFilter)
      .then(setMarketData)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadPrices();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    loadPrices(commodity);
  };

  if (loading)
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-6">
        <div className="max-w-5xl mx-auto space-y-4">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-72" />
          <Skeleton className="h-12 w-full" />
          <div className="bg-white rounded-xl shadow overflow-hidden">
            <Skeleton className="h-12 w-full" />
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-16 w-full mt-1" />
            ))}
          </div>
        </div>
      </div>
    );
  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-green-700 mb-2">Market Prices</h1>
        <p className="text-gray-500 text-sm mb-6">Latest crop prices from markets across India</p>

        {/* Search Filter */}
        <form onSubmit={handleSearch} className="flex gap-2 mb-6">
          <input
            type="text"
            value={commodity}
            onChange={(e) => setCommodity(e.target.value)}
            placeholder="Search by crop e.g. Wheat, Rice..."
            className="flex-1 border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="submit"
            className="bg-green-700 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-800 transition"
          >
            Search
          </button>
          {commodity && (
            <button
              type="button"
              onClick={() => {
                setCommodity('');
                loadPrices();
              }}
              className="border px-4 py-2 rounded-lg text-sm hover:bg-gray-100 transition"
            >
              Clear
            </button>
          )}
        </form>

        {marketData.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-12 text-center text-gray-400 text-sm">
            No market data found. Try a different crop name.
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-green-700 text-white">
                <tr>
                  <th className="text-left px-6 py-3">Crop</th>
                  <th className="text-left px-6 py-3">Min (₹)</th>
                  <th className="text-left px-6 py-3">Modal (₹)</th>
                  <th className="text-left px-6 py-3">Max (₹)</th>
                  <th className="text-left px-6 py-3">Market</th>
                  <th className="text-left px-6 py-3">State</th>
                  <th className="text-left px-6 py-3">Updated</th>
                </tr>
              </thead>
              <tbody>
                {marketData.map((item, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 font-medium text-gray-800">{item.crop}</td>
                    <td className="px-6 py-4 text-gray-600">₹{item.min_price}</td>
                    <td className="px-6 py-4 text-green-600 font-semibold">₹{item.price}</td>
                    <td className="px-6 py-4 text-gray-600">₹{item.max_price}</td>
                    <td className="px-6 py-4 text-gray-600">{item.market}</td>
                    <td className="px-6 py-4 text-gray-500">{item.state}</td>
                    <td className="px-6 py-4 text-gray-400">{item.updated}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default MarketPrices;
