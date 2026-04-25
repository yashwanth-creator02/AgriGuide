// frontend/src/pages/Advisory.tsx

import { useState, useEffect } from 'react';
import { fetchCrops } from '../services/cropService';

function Advisory() {
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

  const advice = crops.find((c) => c.name === selectedCrop);

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
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-green-700 mb-2">Crop Advisory</h1>
        <p className="text-gray-500 text-sm mb-6">Select a crop to get detailed farming advice</p>

        {/* Crop Selector */}
        <select
          value={selectedCrop}
          onChange={(e) => setSelectedCrop(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 text-sm mb-8 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="">Select a crop</option>
          {crops.map((crop) => (
            <option key={crop.name} value={crop.name}>
              {crop.name}
            </option>
          ))}
        </select>

        {/* Advisory Sections */}
        {advice ? (
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-md font-semibold text-green-700 mb-2">💧 Watering Schedule</h2>
              <p className="text-sm text-gray-600">{advice.watering}</p>
            </div>
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-md font-semibold text-green-700 mb-2">🌱 Fertilizer Tips</h2>
              <p className="text-sm text-gray-600">{advice.fertilizer}</p>
            </div>
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-md font-semibold text-green-700 mb-2">🌾 Harvest Time</h2>
              <p className="text-sm text-gray-600">{advice.harvest}</p>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-400 text-sm mt-12">
            Select a crop above to see advisory details
          </div>
        )}
      </div>
    </div>
  );
}

export default Advisory;
