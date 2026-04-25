// frontend/src/pages/Results.tsx

const dummyResults = [
  {
    id: 1,
    name: 'Wheat',
    score: 92,
    reason: 'Ideal for loamy soil with moderate pH and current rabi season.',
  },
  {
    id: 2,
    name: 'Rice',
    score: 78,
    reason: 'Suitable for clay soil with high nitrogen content.',
  },
  {
    id: 3,
    name: 'Maize',
    score: 65,
    reason: 'Good option for well-drained soil with balanced NPK levels.',
  },
];

function Results() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-green-700 mb-2">Recommended Crops</h1>
        <p className="text-gray-500 text-sm mb-8">Based on your soil and location data</p>

        <div className="space-y-4">
          {dummyResults.map((crop) => (
            <div
              key={crop.id}
              className="bg-white rounded-xl shadow p-6 flex items-center justify-between"
            >
              <div>
                <h2 className="text-lg font-semibold text-gray-800">{crop.name}</h2>
                <p className="text-sm text-gray-500 mt-1">{crop.reason}</p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-green-600">{crop.score}%</span>
                <p className="text-xs text-gray-400">Suitability</p>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => window.history.back()}
          className="mt-8 text-sm text-green-700 hover:underline"
        >
          ← Back to Soil Input
        </button>
      </div>
    </div>
  );
}

export default Results;
