// frontend/src/pages/History.tsx

import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchHistory, deleteSoilEntry } from '@/services/soilService';
import { getFarmerId } from '@/services/authService';
import {
  Clock,
  Leaf,
  MapPin,
  FlaskConical,
  ChevronDown,
  ChevronUp,
  Trash2,
  Search,
  Home,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

function History() {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [search, setSearch] = useState('');
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const farmer_id = getFarmerId();
    fetchHistory(farmer_id)
      .then(setHistory)
      .catch((err) => toast.error(err.message))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();

    return history.filter((entry) => {
      if (!q) return true;

      return (
        entry.location?.toLowerCase().includes(q) ||
        entry.season?.toLowerCase().includes(q) ||
        entry.soil_type?.toLowerCase().includes(q) ||
        entry.recommendations?.some((r: any) => r.crop_name?.toLowerCase().includes(q))
      );
    });
  }, [history, search]);

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this entry?')) return;

    setDeletingId(id);
    try {
      await deleteSoilEntry(id);
      setHistory((prev) => prev.filter((h) => h.id !== id));
      if (expanded === id) setExpanded(null);
      toast.success('Entry deleted successfully');
    } catch (err: any) {
      toast.error(err.message || 'Failed to delete entry');
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-lime-50 px-4 py-10 md:px-8">
        <div className="mx-auto max-w-5xl space-y-6">
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-2">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-4 w-80" />
            </div>
            <Skeleton className="h-10 w-24 rounded-xl" />
          </div>

          <Skeleton className="h-12 w-full rounded-2xl" />

          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-28 w-full rounded-3xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-lime-50 px-4 py-8 md:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 rounded-3xl border border-emerald-100 bg-white/80 p-6 shadow-sm backdrop-blur md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <Badge className="mb-3 rounded-full bg-emerald-100 px-3 py-1 text-emerald-700 hover:bg-emerald-100">
                Soil Analysis History
              </Badge>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
                My History
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600 md:text-base">
                View your past soil submissions, crop recommendations, and analysis details in one
                place.
              </p>
            </div>

            <Button
              variant="outline"
              onClick={() => navigate('/')}
              className="h-11 rounded-2xl border-emerald-200 bg-white text-emerald-700 hover:bg-emerald-50"
            >
              <Home className="mr-2 h-4 w-4" />
              Home
            </Button>
          </div>
        </div>

        {history.length > 0 && (
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by location, season, soil type, or crop..."
              className="h-12 rounded-2xl border-gray-200 bg-white pl-11 shadow-sm outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
            />
          </div>
        )}

        {history.length === 0 ? (
          <Card className="rounded-3xl border-dashed border-gray-200 bg-white/80 shadow-sm">
            <CardContent className="flex min-h-[360px] flex-col items-center justify-center p-8 text-center">
              <div className="mb-6 rounded-full bg-emerald-50 p-5">
                <svg
                  viewBox="0 0 200 200"
                  className="h-32 w-32 md:h-40 md:w-40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="100" cy="60" r="20" fill="#FCD34D" />
                  <line
                    x1="100"
                    y1="30"
                    x2="100"
                    y2="20"
                    stroke="#FCD34D"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <line
                    x1="100"
                    y1="90"
                    x2="100"
                    y2="100"
                    stroke="#FCD34D"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <line
                    x1="70"
                    y1="60"
                    x2="60"
                    y2="60"
                    stroke="#FCD34D"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <line
                    x1="130"
                    y1="60"
                    x2="140"
                    y2="60"
                    stroke="#FCD34D"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <line
                    x1="79"
                    y1="39"
                    x2="72"
                    y2="32"
                    stroke="#FCD34D"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <line
                    x1="121"
                    y1="81"
                    x2="128"
                    y2="88"
                    stroke="#FCD34D"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <line
                    x1="121"
                    y1="39"
                    x2="128"
                    y2="32"
                    stroke="#FCD34D"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <line
                    x1="79"
                    y1="81"
                    x2="72"
                    y2="88"
                    stroke="#FCD34D"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <rect
                    x="20"
                    y="150"
                    width="160"
                    height="20"
                    rx="4"
                    fill="#92400E"
                    opacity="0.3"
                  />
                  <line
                    x1="100"
                    y1="150"
                    x2="100"
                    y2="110"
                    stroke="#16A34A"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  <ellipse
                    cx="80"
                    cy="130"
                    rx="20"
                    ry="10"
                    fill="#16A34A"
                    transform="rotate(-30 80 130)"
                  />
                  <ellipse
                    cx="120"
                    cy="125"
                    rx="20"
                    ry="10"
                    fill="#22C55E"
                    transform="rotate(30 120 125)"
                  />
                  <path d="M75 150 L85 180 L115 180 L125 150 Z" fill="#92400E" opacity="0.5" />
                </svg>
              </div>

              <h3 className="text-xl font-semibold text-gray-900">No analyses yet</h3>
              <p className="mt-2 max-w-md text-sm leading-6 text-gray-600">
                Start your first soil analysis to get personalized crop recommendations for your
                farm.
              </p>

              <Button
                onClick={() => navigate('/soil-input')}
                className="mt-6 h-11 rounded-2xl bg-emerald-700 px-6 text-sm font-semibold text-white hover:bg-emerald-800"
              >
                Start Soil Analysis
              </Button>
            </CardContent>
          </Card>
        ) : filtered.length === 0 ? (
          <Card className="rounded-3xl border-gray-100 bg-white/80 shadow-sm">
            <CardContent className="p-10 text-center">
              <p className="text-sm text-gray-500">No results found for “{search}”</p>
              <Button
                variant="ghost"
                onClick={() => setSearch('')}
                className="mt-4 rounded-2xl text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800"
              >
                Clear search
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filtered.map((entry, index) => {
              const recs = entry.recommendations || [];
              const isExpanded = expanded === entry.id;

              return (
                <Card
                  key={entry.id}
                  className="overflow-hidden rounded-3xl border-gray-100 bg-white shadow-sm transition hover:shadow-md"
                >
                  <button
                    onClick={() => setExpanded(isExpanded ? null : entry.id)}
                    className="flex w-full items-center justify-between gap-4 p-5 text-left transition hover:bg-gray-50 md:p-6"
                  >
                    <div className="flex min-w-0 flex-1 items-center gap-4">
                      <div className="rounded-2xl bg-emerald-50 p-3">
                        <FlaskConical className="h-5 w-5 text-emerald-700" />
                      </div>

                      <div className="min-w-0">
                        <h2 className="truncate text-lg font-semibold text-gray-900">
                          Soil Analysis #{history.length - index}
                        </h2>

                        <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-gray-500">
                          <span className="inline-flex items-center gap-1">
                            <MapPin className="h-3.5 w-3.5" />
                            {entry.location || 'No location'}
                          </span>

                          <span className="inline-flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" />
                            {new Date(entry.created_at).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </span>

                          <Badge className="rounded-full bg-emerald-100 px-2.5 py-1 text-emerald-700 hover:bg-emerald-100">
                            {entry.season || 'Unknown season'}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(entry.id);
                        }}
                        disabled={deletingId === entry.id}
                        className="rounded-xl p-2 text-gray-400 transition hover:bg-red-50 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-50"
                        aria-label="Delete entry"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>

                      <div className="rounded-xl p-2 text-gray-400 transition hover:bg-gray-100">
                        {isExpanded ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </div>
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="border-t border-gray-100 px-5 pb-6 pt-5 md:px-6">
                      <h3 className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
                        Soil Data
                      </h3>

                      <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
                        {[
                          { label: 'Soil Type', value: entry.soil_type || 'N/A' },
                          { label: 'pH Level', value: entry.ph ?? 'N/A' },
                          { label: 'Nitrogen', value: `${entry.nitrogen ?? 'N/A'} kg/ha` },
                          { label: 'Phosphorus', value: `${entry.phosphorus ?? 'N/A'} kg/ha` },
                          { label: 'Potassium', value: `${entry.potassium ?? 'N/A'} kg/ha` },
                        ].map((item) => (
                          <div
                            key={item.label}
                            className="rounded-2xl bg-gray-50 p-4 ring-1 ring-gray-100"
                          >
                            <p className="text-xs text-gray-500">{item.label}</p>
                            <p className="mt-1 text-sm font-semibold text-gray-900">{item.value}</p>
                          </div>
                        ))}
                      </div>

                      <h3 className="mb-3 mt-6 text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
                        Recommendations
                      </h3>

                      {recs.length === 0 ? (
                        <p className="text-sm text-gray-500">No recommendations found.</p>
                      ) : (
                        <div className="space-y-3">
                          {recs.map((rec: any) => (
                            <div
                              key={rec.id}
                              className="flex items-center justify-between rounded-2xl bg-gray-50 px-4 py-3 ring-1 ring-gray-100"
                            >
                              <div className="flex min-w-0 items-center gap-3">
                                <div className="rounded-full bg-emerald-100 p-2">
                                  <Leaf className="h-4 w-4 text-emerald-700" />
                                </div>
                                <div className="min-w-0">
                                  <p className="truncate text-sm font-semibold text-gray-900">
                                    {rec.crop_name}
                                  </p>
                                  <p className="truncate text-xs text-gray-500">{rec.reason}</p>
                                </div>
                              </div>

                              <div className="ml-4 rounded-full bg-emerald-100 px-3 py-1 text-sm font-bold text-emerald-700">
                                {rec.suitability_score}%
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        )}

        {history.length > 0 && (
          <p className="mt-8 text-center text-xs text-gray-400">
            Showing {filtered.length} of {history.length} entries
          </p>
        )}
      </div>
    </div>
  );
}

export default History;
