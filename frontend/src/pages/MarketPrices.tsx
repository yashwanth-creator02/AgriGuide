// frontend/src/pages/MarketPrices.tsx

import { useState, useEffect } from 'react';
import { fetchMarketPrices } from '../services/marketService';
import { Skeleton } from '@/components/ui/skeleton';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

function MarketPrices() {
  const [marketData, setMarketData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [commodity, setCommodity] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 20;

  const loadPrices = (commodityFilter?: string, currentPage: number = 1) => {
    setLoading(true);
    setError(null);
    fetchMarketPrices(commodityFilter, currentPage)
      .then((data) => {
        setMarketData(data.records);
        setTotal(data.total);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadPrices();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    loadPrices(commodity, 1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    loadPrices(commodity, newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalPages = Math.ceil(total / limit);

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
        <p className="text-gray-500 text-sm mb-6">
          Latest crop prices from markets across India
          {total > 0 && (
            <span className="ml-2 text-green-600 font-medium">
              ({total.toLocaleString()} records)
            </span>
          )}
        </p>

        {/* Search */}
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
                setPage(1);
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
          <>
            <div className="bg-white rounded-xl shadow overflow-hidden mb-6">
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

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">
                  Page {page} of {totalPages.toLocaleString()}
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                    className="rounded-xl border-green-200"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === totalPages}
                    className="rounded-xl border-green-200"
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default MarketPrices;
