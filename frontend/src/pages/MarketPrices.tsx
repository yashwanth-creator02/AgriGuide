// frontend/src/pages/MarketPrices.tsx

import { useEffect, useMemo, useState } from 'react';
import { fetchMarketPrices } from '../services/marketService';
import { Skeleton } from '@/components/ui/skeleton';
import { ChevronLeft, ChevronRight, Search, Sprout, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

function MarketPrices() {
  const [marketData, setMarketData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [commodity, setCommodity] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 20;

  const totalPages = useMemo(() => Math.ceil(total / limit), [total]);

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
    loadPrices(commodity.trim(), 1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    loadPrices(commodity.trim(), newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-lime-50 px-4 py-8 md:px-6">
        <div className="mx-auto max-w-6xl space-y-6">
          <div className="rounded-3xl border border-emerald-100 bg-white/80 p-6 shadow-sm backdrop-blur md:p-8">
            <Skeleton className="h-8 w-56" />
            <Skeleton className="mt-3 h-4 w-96 max-w-full" />
            <Skeleton className="mt-6 h-14 w-full max-w-2xl rounded-2xl" />
          </div>

          <Card className="rounded-3xl border-gray-100 bg-white shadow-sm">
            <CardContent className="p-0">
              <div className="border-b border-gray-100 px-6 py-4">
                <Skeleton className="h-5 w-40" />
              </div>
              <div className="space-y-2 p-4">
                <Skeleton className="h-14 w-full rounded-2xl" />
                <Skeleton className="h-14 w-full rounded-2xl" />
                <Skeleton className="h-14 w-full rounded-2xl" />
                <Skeleton className="h-14 w-full rounded-2xl" />
                <Skeleton className="h-14 w-full rounded-2xl" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-lime-50 px-4 py-8 md:px-6">
        <div className="mx-auto flex min-h-[70vh] max-w-4xl items-center justify-center">
          <Card className="w-full rounded-3xl border-red-100 bg-white shadow-lg">
            <CardContent className="p-8 text-center">
              <div className="mb-3 text-4xl">⚠️</div>
              <h2 className="text-xl font-semibold text-gray-900">Unable to load market prices</h2>
              <p className="mt-2 text-sm text-gray-600">{error}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-lime-50 px-4 py-8 md:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 rounded-3xl border border-emerald-100 bg-white/80 p-6 shadow-sm backdrop-blur md:p-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <Badge className="mb-3 rounded-full bg-emerald-100 px-3 py-1 text-emerald-700 hover:bg-emerald-100">
                <TrendingUp className="mr-1.5 h-3 w-3" />
                Market Intelligence
              </Badge>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
                Market Prices
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600 md:text-base">
                Latest crop prices from markets across India, with quick search and pagination for
                easier browsing.
                {total > 0 && (
                  <span className="ml-2 font-medium text-emerald-700">
                    ({total.toLocaleString()} records)
                  </span>
                )}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
              <div className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
                <span className="font-semibold">{marketData.length}</span> shown
              </div>
              <div className="rounded-2xl bg-gray-50 px-4 py-3 text-sm text-gray-700">
                <span className="font-semibold">{page}</span> / {Math.max(totalPages, 1)}
              </div>
            </div>
          </div>

          <form onSubmit={handleSearch} className="mt-6 flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                value={commodity}
                onChange={(e) => setCommodity(e.target.value)}
                placeholder="Search by crop e.g. Wheat, Rice..."
                className="h-12 rounded-2xl border-gray-200 bg-white pl-11 shadow-sm outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
              />
            </div>

            <Button
              type="submit"
              className="h-12 rounded-2xl bg-emerald-700 px-6 font-semibold text-white hover:bg-emerald-800"
            >
              Search
            </Button>

            {commodity && (
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setCommodity('');
                  setPage(1);
                  loadPrices('', 1);
                }}
                className="h-12 rounded-2xl border-gray-200 bg-white px-6 font-semibold text-gray-700 hover:bg-gray-50"
              >
                Clear
              </Button>
            )}
          </form>
        </div>

        {marketData.length === 0 ? (
          <Card className="rounded-3xl border-dashed border-gray-200 bg-white/80 shadow-sm">
            <CardContent className="flex min-h-[320px] flex-col items-center justify-center p-8 text-center">
              <div className="mb-4 rounded-full bg-emerald-50 p-4">
                <Sprout className="h-8 w-8 text-emerald-700" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">No market data found</h3>
              <p className="mt-2 max-w-md text-sm leading-6 text-gray-600">
                Try a different crop name or clear the search to view all records.
              </p>
              {commodity && (
                <Button
                  onClick={() => {
                    setCommodity('');
                    setPage(1);
                    loadPrices('', 1);
                  }}
                  className="mt-6 h-11 rounded-2xl bg-emerald-700 px-5 font-semibold text-white hover:bg-emerald-800"
                >
                  Clear search
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <>
            <Card className="overflow-hidden rounded-3xl border-gray-100 bg-white shadow-sm">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-emerald-700 text-white">
                      <tr>
                        <th className="px-6 py-4 text-left font-semibold">Crop</th>
                        <th className="px-6 py-4 text-left font-semibold">Min (₹)</th>
                        <th className="px-6 py-4 text-left font-semibold">Modal (₹)</th>
                        <th className="px-6 py-4 text-left font-semibold">Max (₹)</th>
                        <th className="px-6 py-4 text-left font-semibold">Market</th>
                        <th className="px-6 py-4 text-left font-semibold">State</th>
                        <th className="px-6 py-4 text-left font-semibold">Updated</th>
                      </tr>
                    </thead>
                    <tbody>
                      {marketData.map((item, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50/70'}>
                          <td className="px-6 py-4 font-medium text-gray-900">{item.crop}</td>
                          <td className="px-6 py-4 text-gray-600">₹{item.min_price}</td>
                          <td className="px-6 py-4 font-semibold text-emerald-700">
                            ₹{item.price}
                          </td>
                          <td className="px-6 py-4 text-gray-600">₹{item.max_price}</td>
                          <td className="px-6 py-4 text-gray-600">{item.market}</td>
                          <td className="px-6 py-4 text-gray-500">{item.state}</td>
                          <td className="px-6 py-4 text-gray-400">{item.updated}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {totalPages > 1 && (
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-gray-500">
                  Page <span className="font-semibold text-gray-800">{page}</span> of{' '}
                  <span className="font-semibold text-gray-800">{totalPages.toLocaleString()}</span>
                </p>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                    className="h-10 rounded-2xl border-emerald-200 bg-white px-4 text-emerald-700 hover:bg-emerald-50"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === totalPages}
                    className="h-10 rounded-2xl border-emerald-200 bg-white px-4 text-emerald-700 hover:bg-emerald-50"
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
