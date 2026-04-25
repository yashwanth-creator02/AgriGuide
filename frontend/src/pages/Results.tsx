import { useLocation, useNavigate } from 'react-router-dom';

function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const results = location.state?.results || [];
  const userLocation = location.state?.location || '';

  if (results.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <p className="text-gray-500 text-sm mb-4">No recommendations found.</p>
        <button
          onClick={() => navigate('/soil-input')}
          className="text-sm text-green-700 hover:underline"
        >
          ← Go back to Soil Input
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-green-700 mb-2">Recommended Crops</h1>
        <p className="text-gray-500 text-sm mb-8">
          Based on your soil data {userLocation && `for ${userLocation}`}
        </p>

        <div className="space-y-4">
          {results.map((crop: any, index: number) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow p-6 flex items-center justify-between"
            >
              <div>
                <h2 className="text-lg font-semibold text-gray-800">{crop.crop_name}</h2>
                <p className="text-sm text-gray-500 mt-1">{crop.reason}</p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-green-600">{crop.suitability_score}%</span>
                <p className="text-xs text-gray-400">Suitability</p>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => navigate('/soil-input')}
          className="mt-8 text-sm text-green-700 hover:underline"
        >
          ← Back to Soil Input
        </button>
      </div>
    </div>
  );
}

export default Results;
