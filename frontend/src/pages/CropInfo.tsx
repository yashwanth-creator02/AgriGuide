// frontend/src/pages/CropInfo.tsx

import { useState, useEffect } from 'react';
import { fetchCrops } from '@/services/cropService';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';

function CropInfo() {
  const [crops, setCrops] = useState<any[]>([]);
  const [selectedCrop, setSelectedCrop] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCrops()
      .then(setCrops)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const crop = crops.find((c) => c.name === selectedCrop);

  if (loading)
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-6">
        <div className="max-w-2xl mx-auto space-y-4">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-72" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-32 w-full rounded-xl" />
          <Skeleton className="h-32 w-full rounded-xl" />
          <Skeleton className="h-32 w-full rounded-xl" />
        </div>
      </div>
    );
  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-green-700 mb-2">Crop Guide</h1>
        <p className="text-gray-500 text-sm mb-6">
          Select a crop to view information and farming advice
        </p>

        {/* Crop Selector */}
        <select
          value={selectedCrop}
          onChange={(e) => setSelectedCrop(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 text-sm mb-8 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="">Select a crop</option>
          {crops.map((c) => (
            <option key={c.name} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>

        {crop ? (
          <Tabs defaultValue="info">
            <TabsList className="w-full mb-6">
              <TabsTrigger value="info" className="flex-1">
                📖 Crop Info
              </TabsTrigger>
              <TabsTrigger value="advisory" className="flex-1">
                🌱 Advisory
              </TabsTrigger>
            </TabsList>

            {/* Crop Info Tab */}
            <TabsContent value="info" className="space-y-4">
              <div className="bg-white rounded-xl shadow p-6">
                <h2 className="text-md font-semibold text-green-700 mb-2">📖 About</h2>
                <p className="text-sm text-gray-600">{crop.about}</p>
              </div>
              <div className="bg-white rounded-xl shadow p-6">
                <h2 className="text-md font-semibold text-green-700 mb-2">🌍 Best Soil Type</h2>
                <p className="text-sm text-gray-600">{crop.suitable_soil.join(', ')}</p>
              </div>
              <div className="bg-white rounded-xl shadow p-6">
                <h2 className="text-md font-semibold text-green-700 mb-2">🌡️ pH Range</h2>
                <p className="text-sm text-gray-600">
                  {crop.min_ph} - {crop.max_ph}
                </p>
              </div>
              <div className="bg-white rounded-xl shadow p-6">
                <h2 className="text-md font-semibold text-green-700 mb-2">
                  🌤️ Climate Requirements
                </h2>
                <p className="text-sm text-gray-600">{crop.climate}</p>
              </div>
              <div className="bg-white rounded-xl shadow p-6">
                <h2 className="text-md font-semibold text-green-700 mb-2">🦠 Common Diseases</h2>
                <p className="text-sm text-gray-600">{crop.diseases}</p>
              </div>
            </TabsContent>

            {/* Advisory Tab */}
            <TabsContent value="advisory" className="space-y-4">
              <div className="bg-white rounded-xl shadow p-6">
                <h2 className="text-md font-semibold text-green-700 mb-2">💧 Watering Schedule</h2>
                <p className="text-sm text-gray-600">{crop.watering}</p>
              </div>
              <div className="bg-white rounded-xl shadow p-6">
                <h2 className="text-md font-semibold text-green-700 mb-2">🌱 Fertilizer Tips</h2>
                <p className="text-sm text-gray-600">{crop.fertilizer}</p>
              </div>
              <div className="bg-white rounded-xl shadow p-6">
                <h2 className="text-md font-semibold text-green-700 mb-2">🌾 Harvest Time</h2>
                <p className="text-sm text-gray-600">{crop.harvest}</p>
              </div>
            </TabsContent>
          </Tabs>
        ) : (
          <div className="text-center text-gray-400 text-sm mt-12">
            Select a crop above to see its details
          </div>
        )}
      </div>
    </div>
  );
}

export default CropInfo;
