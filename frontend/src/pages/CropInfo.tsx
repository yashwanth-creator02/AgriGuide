// frontend/src/pages/CropInfo.tsx

import { useState } from 'react';

const cropData: Record<
  string,
  {
    about: string;
    soilType: string;
    climate: string;
    diseases: string;
  }
> = {
  wheat: {
    about:
      'Wheat is one of the most widely grown cereal crops in India, mainly cultivated in the rabi season.',
    soilType: 'Well-drained loamy or clay loamy soil with pH between 6.0 and 7.5.',
    climate:
      'Cool and dry climate. Temperature of 10-15°C during growth and 25-30°C during ripening.',
    diseases: 'Common diseases include rust, smut, and powdery mildew.',
  },
  rice: {
    about: 'Rice is a staple food crop grown mainly in the kharif season across India.',
    soilType: 'Clay or clay loamy soil with good water retention capacity. pH between 5.5 and 6.5.',
    climate: 'Hot and humid climate. Requires 20-35°C temperature and high rainfall.',
    diseases: 'Common diseases include blast, brown spot, and bacterial blight.',
  },
  maize: {
    about: 'Maize is a versatile crop used for food, fodder, and industrial purposes.',
    soilType: 'Well-drained sandy loam to silt loam soil with pH between 5.8 and 7.0.',
    climate: 'Warm climate with temperature between 18-27°C. Sensitive to frost and waterlogging.',
    diseases: 'Common diseases include downy mildew, leaf blight, and stalk rot.',
  },
};

function CropInfo() {
  const [selectedCrop, setSelectedCrop] = useState('');

  const info = cropData[selectedCrop];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-green-700 mb-2">Crop Information</h1>
        <p className="text-gray-500 text-sm mb-6">Select a crop to learn more about it</p>

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

        {/* Info Sections */}
        {info ? (
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-md font-semibold text-green-700 mb-2">📖 About</h2>
              <p className="text-sm text-gray-600">{info.about}</p>
            </div>
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-md font-semibold text-green-700 mb-2">🌍 Best Soil Type</h2>
              <p className="text-sm text-gray-600">{info.soilType}</p>
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
            Select a crop above to see its details
          </div>
        )}
      </div>
    </div>
  );
}

export default CropInfo;
