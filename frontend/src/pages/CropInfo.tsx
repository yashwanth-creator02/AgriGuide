// frontend/src/pages/CropInfo.tsx

import { useState, useEffect } from 'react';
import CropCard from '../components/CropCard';
import type { CropInfo as CropType } from '../types';
import { fetchCrops } from '../services/cropService';

function CropInfo() {
  const [crops, setCrops] = useState<CropType[]>([]);
  const [selectedCrop, setSelectedCrop] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCrops()
      .then((data: CropType[]) => setCrops(data))
      .catch((err) => setError(err.message || 'Failed to load crops'))
      .finally(() => setLoading(false));
  }, []);

  const info = crops.find((c) => c.name === selectedCrop);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Loading crops...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-green-700 mb-2">Crop Information</h1>
        <p className="text-gray-500 text-sm mb-6">Select a crop to learn more about it</p>

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

        {/* Crop Cards (overview list) */}
        <div className="grid gap-4 mb-10">
          {crops.map((crop) => (
            <div
              key={crop.name}
              onClick={() => setSelectedCrop(crop.name)}
              className="cursor-pointer hover:scale-[1.01] transition"
            >
              <CropCard crop={crop} />
            </div>
          ))}
        </div>

        {/* Detailed Info Section */}
        {info ? (
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-md font-semibold text-green-700 mb-2">📖 About</h2>
              <p className="text-sm text-gray-600">{info.about}</p>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-md font-semibold text-green-700 mb-2">🌍 Best Soil Type</h2>
              <p className="text-sm text-gray-600">{info.suitable_soil?.join(', ') ?? 'N/A'}</p>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-md font-semibold text-green-700 mb-2">🌤️ Climate Requirements</h2>
              <p className="text-sm text-gray-600">{info.climate}</p>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-md font-semibold text-green-700 mb-2">🦠 Common Diseases</h2>
              <p className="text-sm text-gray-600">{info.diseases}</p>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-400 text-sm mt-12">
            Select a crop above or click a card to view details
          </div>
        )}
      </div>
    </div>
  );
}

export default CropInfo;
