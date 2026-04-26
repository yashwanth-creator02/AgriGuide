// frontend/src/pages/History.tsx

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchHistory } from '@/services/soilService';
import { getFarmerId } from '@/services/authService';
import { Clock, Leaf, MapPin, FlaskConical, ChevronDown, ChevronUp } from 'lucide-react';
import { Home } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';

function History() {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const farmer_id = getFarmerId();
    fetchHistory(farmer_id)
      .then(setHistory)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-6">
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="flex items-center justify-between mb-8">
            <div className="space-y-2">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-4 w-72" />
            </div>
            <Skeleton className="h-10 w-24" />
          </div>
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-24 w-full rounded-xl" />
          ))}
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-green-700">My History</h1>
            <p className="text-gray-500 text-sm">
              Your past soil submissions and crop recommendations
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => navigate('/')}
            className="flex items-center gap-2 border-green-200 text-green-700 hover:bg-green-50 rounded-xl"
          >
            <Home className="h-4 w-4" />
            Home
          </Button>
        </div>

        {history.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-12 text-center">
            <div className="flex justify-center mb-6">
              <svg
                viewBox="0 0 200 200"
                className="w-40 h-40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Sun */}
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
                {/* Ground */}
                <rect x="20" y="150" width="160" height="20" rx="4" fill="#92400E" opacity="0.3" />
                {/* Plant stem */}
                <line
                  x1="100"
                  y1="150"
                  x2="100"
                  y2="110"
                  stroke="#16A34A"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                {/* Leaves */}
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
                {/* Pot */}
                <path d="M75 150 L85 180 L115 180 L125 150 Z" fill="#92400E" opacity="0.5" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">No analyses yet</h3>
            <p className="text-gray-400 text-sm mb-6 max-w-xs mx-auto">
              Start your first soil analysis to get personalized crop recommendations for your farm.
            </p>
            <button
              onClick={() => navigate('/soil-input')}
              className="bg-green-700 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-green-800 transition"
            >
              Start Soil Analysis
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {history.map((entry, index) => (
              <div key={entry.id} className="bg-white rounded-xl shadow overflow-hidden">
                {/* Header */}
                <div
                  className="p-6 cursor-pointer flex items-center justify-between hover:bg-gray-50 transition"
                  onClick={() => setExpanded(expanded === entry.id ? null : entry.id)}
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-green-100 p-3 rounded-xl">
                      <FlaskConical className="h-5 w-5 text-green-700" />
                    </div>
                    <div>
                      <h2 className="font-semibold text-gray-800">
                        Soil Analysis #{history.length - index}
                      </h2>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="flex items-center gap-1 text-xs text-gray-500">
                          <MapPin className="h-3 w-3" /> {entry.location || 'No location'}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-gray-500">
                          <Clock className="h-3 w-3" />
                          {new Date(entry.created_at).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </span>
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full capitalize">
                          {entry.season}
                        </span>
                      </div>
                    </div>
                  </div>
                  {expanded === entry.id ? (
                    <ChevronUp className="h-4 w-4 text-gray-400" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  )}
                </div>

                {/* Expanded Content */}
                {expanded === entry.id && (
                  <div className="border-t px-6 pb-6 pt-4">
                    {/* Soil Data */}
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                      Soil Data
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                      {[
                        { label: 'Soil Type', value: entry.soil_type || 'N/A' },
                        { label: 'pH Level', value: entry.ph },
                        { label: 'Nitrogen', value: `${entry.nitrogen} kg/ha` },
                        { label: 'Phosphorus', value: `${entry.phosphorus} kg/ha` },
                        { label: 'Potassium', value: `${entry.potassium} kg/ha` },
                      ].map((item) => (
                        <div key={item.label} className="bg-gray-50 rounded-lg p-3">
                          <p className="text-xs text-gray-400 mb-1">{item.label}</p>
                          <p className="text-sm font-semibold text-gray-700">{item.value}</p>
                        </div>
                      ))}
                    </div>

                    {/* Recommendations */}
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                      Recommendations
                    </h3>
                    {entry.recommendations.length === 0 ? (
                      <p className="text-sm text-gray-400">No recommendations found.</p>
                    ) : (
                      <div className="space-y-2">
                        {entry.recommendations.map((rec: any) => (
                          <div
                            key={rec.id}
                            className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3"
                          >
                            <div className="flex items-center gap-3">
                              <Leaf className="h-4 w-4 text-green-600" />
                              <div>
                                <p className="text-sm font-semibold text-gray-800">
                                  {rec.crop_name}
                                </p>
                                <p className="text-xs text-gray-400">{rec.reason}</p>
                              </div>
                            </div>
                            <span className="text-lg font-bold text-green-600">
                              {rec.suitability_score}%
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default History;
