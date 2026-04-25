// frontend/src/pages/Advisory.tsx

import { useState } from 'react';

const advisoryData: Record<string, { watering: string; fertilizer: string; harvest: string }> = {
  wheat: {
    watering:
      'Water every 10-12 days. Critical stages are crown root initiation and grain filling.',
    fertilizer: 'Apply 120kg/ha Nitrogen, 60kg/ha Phosphorus, and 40kg/ha Potassium.',
    harvest: 'Ready to harvest in 110-120 days when grains are hard and golden yellow.',
  },
  rice: {
    watering:
      'Maintain 2-5cm standing water during vegetative stage. Drain fields 2 weeks before harvest.',
    fertilizer: 'Apply 100kg/ha Nitrogen in split doses. Add Zinc if soil is deficient.',
    harvest: 'Harvest when 80-85% of grains turn golden yellow, around 110-130 days.',
  },
  maize: {
    watering: 'Water every 8-10 days. Most critical at tasseling and grain filling stages.',
    fertilizer: 'Apply 150kg/ha Nitrogen, 75kg/ha Phosphorus, and 50kg/ha Potassium.',
    harvest: 'Ready in 90-100 days when husks are dry and kernels are hard.',
  },
};

function Advisory() {
  const [selectedCrop, setSelectedCrop] = useState('');

  const advice = advisoryData[selectedCrop];

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
          <option value="wheat">Wheat</option>
          <option value="rice">Rice</option>
          <option value="maize">Maize</option>
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
