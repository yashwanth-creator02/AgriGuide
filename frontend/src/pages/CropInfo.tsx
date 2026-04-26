// frontend/src/pages/CropInfo.tsx

import { useEffect, useMemo, useState } from 'react';
import { fetchCrops } from '@/services/cropService';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

type Crop = {
  name: string;
  about: string;
  suitable_soil: string[];
  min_ph: number;
  max_ph: number;
  climate: string;
  diseases: string;
  watering: string;
  fertilizer: string;
  harvest: string;
};

function CropInfo() {
  const [crops, setCrops] = useState<Crop[]>([]);
  const [selectedCrop, setSelectedCrop] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCrops()
      .then(setCrops)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const crop = useMemo(() => crops.find((c) => c.name === selectedCrop), [crops, selectedCrop]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-lime-50 px-4 py-10 md:px-8">
        <div className="mx-auto max-w-5xl space-y-6">
          <div className="space-y-3">
            <Skeleton className="h-10 w-56" />
            <Skeleton className="h-5 w-96" />
          </div>

          <Skeleton className="h-12 w-full max-w-md rounded-2xl" />
          <Skeleton className="h-12 w-full rounded-2xl" />

          <div className="grid gap-4 md:grid-cols-2">
            <Skeleton className="h-36 rounded-2xl" />
            <Skeleton className="h-36 rounded-2xl" />
            <Skeleton className="h-36 rounded-2xl" />
            <Skeleton className="h-36 rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-lime-50 px-4 py-10 md:px-8">
        <div className="mx-auto flex min-h-[60vh] max-w-2xl items-center justify-center">
          <Card className="w-full rounded-3xl border-rose-100 shadow-lg">
            <CardContent className="p-8 text-center">
              <div className="mb-3 text-4xl">⚠️</div>
              <h2 className="text-xl font-semibold text-gray-900">Unable to load crop data</h2>
              <p className="mt-2 text-sm text-gray-600">{error}</p>
            </CardContent>
          </Card>
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
                Crop Knowledge Base
              </Badge>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
                Crop Guide
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600 md:text-base">
                Select a crop to view essential farming information, growing conditions, and
                practical advisory tips.
              </p>
            </div>

            <div className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
              {crops.length} crops available
            </div>
          </div>

          <div className="mt-6">
            <label htmlFor="crop-select" className="mb-2 block text-sm font-medium text-gray-700">
              Choose a crop
            </label>
            <select
              id="crop-select"
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 md:max-w-md"
            >
              <option value="">Select a crop</option>
              {crops.map((c) => (
                <option key={c.name} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {crop ? (
          <div className="space-y-6">
            <Card className="rounded-3xl border-emerald-100 shadow-lg">
              <CardContent className="p-6 md:p-8">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <Badge className="mb-3 rounded-full bg-emerald-100 px-3 py-1 text-emerald-700 hover:bg-emerald-100">
                      Selected Crop
                    </Badge>
                    <h2 className="text-2xl font-semibold text-gray-900 md:text-3xl">
                      {crop.name}
                    </h2>
                    <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-600 md:text-base">
                      {crop.about}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 md:min-w-[220px]">
                    <div className="rounded-2xl bg-gray-50 p-4 text-center">
                      <div className="text-xs text-gray-500">pH Min</div>
                      <div className="text-lg font-semibold text-gray-900">{crop.min_ph}</div>
                    </div>
                    <div className="rounded-2xl bg-gray-50 p-4 text-center">
                      <div className="text-xs text-gray-500">pH Max</div>
                      <div className="text-lg font-semibold text-gray-900">{crop.max_ph}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="info" className="w-full">
              <TabsList className="grid h-auto w-full grid-cols-2 rounded-2xl bg-white p-1 shadow-sm">
                <TabsTrigger
                  value="info"
                  className="rounded-xl py-3 text-sm font-medium data-[state=active]:bg-emerald-600 data-[state=active]:text-white"
                >
                  📖 Crop Info
                </TabsTrigger>
                <TabsTrigger
                  value="advisory"
                  className="rounded-xl py-3 text-sm font-medium data-[state=active]:bg-emerald-600 data-[state=active]:text-white"
                >
                  🌱 Advisory
                </TabsTrigger>
              </TabsList>

              <TabsContent value="info" className="mt-6 space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <InfoCard title="🌍 Best Soil Type" value={crop.suitable_soil.join(', ')} />
                  <InfoCard title="🌡️ pH Range" value={`${crop.min_ph} - ${crop.max_ph}`} />
                  <InfoCard title="🌤️ Climate Requirements" value={crop.climate} fullWidth />
                  <InfoCard title="🦠 Common Diseases" value={crop.diseases} fullWidth />
                </div>
              </TabsContent>

              <TabsContent value="advisory" className="mt-6 space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <InfoCard title="💧 Watering Schedule" value={crop.watering} />
                  <InfoCard title="🌱 Fertilizer Tips" value={crop.fertilizer} />
                  <InfoCard title="🌾 Harvest Time" value={crop.harvest} />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        ) : (
          <Card className="rounded-3xl border-dashed border-gray-200 bg-white/70 shadow-sm">
            <CardContent className="flex min-h-[240px] flex-col items-center justify-center p-8 text-center">
              <div className="mb-3 text-5xl">🌾</div>
              <h3 className="text-lg font-semibold text-gray-900">No crop selected</h3>
              <p className="mt-2 max-w-md text-sm text-gray-600">
                Choose a crop from the dropdown above to view its farming details and advisory
                guidance.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

function InfoCard({
  title,
  value,
  fullWidth = false,
}: {
  title: string;
  value: string;
  fullWidth?: boolean;
}) {
  return (
    <Card
      className={
        fullWidth
          ? 'rounded-3xl border-gray-100 shadow-sm md:col-span-2'
          : 'rounded-3xl border-gray-100 shadow-sm'
      }
    >
      <CardContent className="p-6">
        <h3 className="text-sm font-semibold text-emerald-700">{title}</h3>
        <p className="mt-3 text-sm leading-6 text-gray-600">{value}</p>
      </CardContent>
    </Card>
  );
}

export default CropInfo;
