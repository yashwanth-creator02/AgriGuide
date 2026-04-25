// frontend/src/pages/Results.tsx

import { useLocation, useNavigate } from 'react-router-dom';
import ResultCard from '@/components/ResultCard';
import WeatherWidget from '@/components/WeatherWidget';
import { useWeather } from '@/hooks/useWeather';
import type { Recommendation } from '../types';

function Results() {
  const location = useLocation();
  const navigate = useNavigate();

  const results: Recommendation[] = location.state?.results ?? [];
  const userLocation = location.state?.location || '';

  const { weather, loading: weatherLoading } = useWeather(userLocation);

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

        <div className="space-y-4 mb-8">
          {results.map((recommendation, index) => (
            <ResultCard key={index} recommendation={recommendation} />
          ))}
        </div>

        {!weatherLoading && weather && <WeatherWidget weather={weather} />}

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
