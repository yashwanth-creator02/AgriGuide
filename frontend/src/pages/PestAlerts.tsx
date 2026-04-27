// frontend/src/pages/PestAlerts.tsx

import { useEffect, useMemo, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AlertBanner from '@/components/AlertBanner';
import { fetchPestAlerts } from '@/services/pestService';
import { AlertTriangle, Filter, SearchX } from 'lucide-react';
import { Button } from '@/components/ui/button';

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

  const cropOptions = useMemo(() => {
    return ['All', ...new Set(alerts.map((a) => a.affected_crop).filter(Boolean))];
  }, [alerts]);

  const filtered = useMemo(() => {
    return alerts.filter((alert) => {
      const matchSeverity = severityFilter === 'All' || alert.severity === severityFilter;
      const matchCrop = cropFilter === 'All' || alert.affected_crop === cropFilter;
      return matchSeverity && matchCrop;
    });
  }, [alerts, severityFilter, cropFilter]);

  const hasFilters = severityFilter !== 'All' || cropFilter !== 'All';

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-5rem)] bg-gradient-to-b from-emerald-50 via-white to-lime-50 px-4 py-8 md:px-6">
        <div className="mx-auto flex min-h-[calc(100vh-10rem)] max-w-4xl flex-col space-y-6">
          <div className="rounded-3xl border border-emerald-100 bg-white/80 p-6 shadow-sm backdrop-blur md:p-8">
            <Skeleton className="h-8 w-44" />
            <Skeleton className="mt-3 h-4 w-80 max-w-full" />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <Skeleton className="h-12 w-full rounded-2xl" />
              <Skeleton className="h-12 w-full rounded-2xl" />
            </div>
          </div>

          <div className="flex-1 space-y-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-36 w-full rounded-3xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[calc(100vh-5rem)] bg-gradient-to-b from-emerald-50 via-white to-lime-50 px-4 py-8 md:px-6">
        <div className="mx-auto flex min-h-[calc(100vh-10rem)] max-w-4xl items-center justify-center">
          <Card className="w-full rounded-3xl border-red-100 bg-white shadow-lg">
            <CardContent className="p-8 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50">
                <AlertTriangle className="h-7 w-7 text-red-500" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Unable to load pest alerts</h2>
              <p className="mt-2 text-sm text-gray-600">{error}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-gradient-to-b from-emerald-50 via-white to-lime-50 px-4 py-8 md:px-6">
      <div className="mx-auto flex min-h-[calc(100vh-10rem)] max-w-6xl flex-col">
        <div className="mb-8 rounded-3xl border border-emerald-100 bg-white/80 p-6 shadow-sm backdrop-blur md:p-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <Badge className="mb-3 rounded-full bg-amber-100 px-3 py-1 text-amber-700 hover:bg-amber-100">
                <AlertTriangle className="mr-1.5 h-3 w-3" />
                Pest Monitoring
              </Badge>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
                Pest Alerts
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600 md:text-base">
                Active pest outbreak alerts across India, filtered by severity and affected crop.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <div className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
                <span className="font-semibold">{alerts.length}</span> total alerts
              </div>
              <div className="rounded-2xl bg-gray-50 px-4 py-3 text-sm text-gray-700">
                <span className="font-semibold">{filtered.length}</span> visible
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs font-medium text-gray-500">Severity</label>
              <select
                value={severityFilter}
                onChange={(e) => setSeverityFilter(e.target.value)}
                className="h-12 w-full rounded-2xl border border-gray-200 bg-white px-4 text-sm shadow-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
              >
                {SEVERITY_OPTIONS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-xs font-medium text-gray-500">Crop</label>
              <select
                value={cropFilter}
                onChange={(e) => setCropFilter(e.target.value)}
                className="h-12 w-full rounded-2xl border border-gray-200 bg-white px-4 text-sm shadow-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
              >
                {cropOptions.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {hasFilters && (
            <div className="mt-4 flex items-center justify-between gap-3 rounded-2xl bg-gray-50 px-4 py-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Filter className="h-4 w-4 text-emerald-700" />
                Filters active
              </div>

              <Button
                type="button"
                variant="ghost"
                onClick={() => {
                  setSeverityFilter('All');
                  setCropFilter('All');
                }}
                className="h-9 rounded-xl text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800"
              >
                Clear filters
              </Button>
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col">
          {filtered.length === 0 ? (
            <Card className="flex-1 rounded-3xl border-dashed border-gray-200 bg-white/80 shadow-sm">
              <CardContent className="flex min-h-[320px] h-full flex-col items-center justify-center p-8 text-center">
                <div className="mb-4 rounded-full bg-emerald-50 p-4">
                  <SearchX className="h-8 w-8 text-emerald-700" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">No alerts found</h3>
                <p className="mt-2 max-w-md text-sm leading-6 text-gray-600">
                  No pest alerts match the selected filters. Try changing severity or crop.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="flex flex-1 flex-col space-y-4">
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
        </div>

        {alerts.length > 0 && (
          <p className="mt-8 text-center text-xs text-gray-400">
            Showing {filtered.length} of {alerts.length} alerts
          </p>
        )}
      </div>
    </div>
  );
}

export default PestAlerts;
