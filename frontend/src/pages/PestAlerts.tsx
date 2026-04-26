// frontend/src/pages/PestAlerts.tsx

import { useState, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import AlertBanner from '@/components/AlertBanner';
import { fetchPestAlerts } from '@/services/pestService';

const SEVERITY_OPTIONS = ['All', 'High', 'Medium', 'Low'];

function PestAlerts() {
  const [alerts, setAlerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [severityFilter, setSeverityFilter] = useState('All');
  const [cropFilter, setCropFilter] = useState('All');

  useEffect(() => {
    fetchPestAlerts()
      .then(setAlerts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const cropOptions = ['All', ...new Set(alerts.map((a) => a.affected_crop))];

  const filtered = alerts.filter((alert) => {
    const matchSeverity = severityFilter === 'All' || alert.severity === severityFilter;
    const matchCrop = cropFilter === 'All' || alert.affected_crop === cropFilter;
    return matchSeverity && matchCrop;
  });

  if (loading)
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-6">
        <div className="max-w-3xl mx-auto space-y-4">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-72" />
          <div className="flex gap-4 mb-8">
            <Skeleton className="h-12 flex-1" />
            <Skeleton className="h-12 flex-1" />
          </div>
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-36 w-full rounded-xl" />
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
        <h1 className="text-2xl font-bold text-green-700 mb-2">Pest Alerts</h1>
        <p className="text-gray-500 text-sm mb-6">Active pest outbreak alerts across India</p>

        {/* Filters */}
        <div className="flex gap-4 mb-8">
          <div className="flex-1">
            <label className="block text-xs font-medium text-gray-500 mb-1">Severity</label>
            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {SEVERITY_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-xs font-medium text-gray-500 mb-1">Crop</label>
            <select
              value={cropFilter}
              onChange={(e) => setCropFilter(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {cropOptions.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          {(severityFilter !== 'All' || cropFilter !== 'All') && (
            <div className="flex items-end">
              <button
                onClick={() => {
                  setSeverityFilter('All');
                  setCropFilter('All');
                }}
                className="border px-4 py-2 rounded-lg text-sm hover:bg-gray-100 transition"
              >
                Clear
              </button>
            </div>
          )}
        </div>

        {/* Alerts */}
        {filtered.length === 0 ? (
          <div className="text-center text-gray-400 text-sm mt-12">
            No alerts found for the selected filters.
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((alert) => (
              <AlertBanner
                key={alert.id}
                pest_name={alert.pest_name}
                affected_crop={alert.affected_crop}
                region={alert.region}
                severity={alert.severity}
                description={alert.description}
              />
            ))}
          </div>
        )}

        <p className="text-xs text-gray-400 mt-8 text-center">
          Showing {filtered.length} of {alerts.length} alerts
        </p>
      </div>
    </div>
  );
}

export default PestAlerts;
