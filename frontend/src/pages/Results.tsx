// frontend/src/pages/Results.tsx

import { useLocation, useNavigate } from 'react-router-dom';
import ResultCard from '@/components/ResultCard';
import WeatherWidget from '@/components/WeatherWidget';
import { useWeather } from '@/hooks/useWeather';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Sparkles } from 'lucide-react';
import type { Recommendation } from '../types';

function Results() {
  const location = useLocation();
  const navigate = useNavigate();

  const results: Recommendation[] = location.state?.results ?? [];
  const userLocation = location.state?.location || '';

  const { weather, loading: weatherLoading } = useWeather(userLocation);

  if (results.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6 text-center">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">No recommendations found</h2>
        <p className="text-sm text-gray-500 mb-6 max-w-sm">
          Try adjusting your soil inputs to get better crop suggestions.
        </p>

        <Button
          onClick={() => navigate('/soil-input')}
          className="bg-emerald-700 hover:bg-emerald-800 rounded-xl"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Soil Input
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-5 w-5 text-emerald-600" />
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">Recommended Crops</h1>
          </div>

          <p className="text-gray-500 text-sm">
            {results.length} result{results.length > 1 ? 's' : ''}{' '}
            {userLocation && (
              <>
                for <span className="font-medium text-gray-700">{userLocation}</span>
              </>
            )}
          </p>
        </div>

        {/* Results List */}
        <div className="space-y-4">
          {results.map((recommendation, index) => (
            <ResultCard key={index} recommendation={recommendation} />
          ))}
        </div>

        {/* Weather Section */}
        {!weatherLoading && weather && (
          <div className="mt-10">
            <WeatherWidget weather={weather} />
          </div>
        )}

        {/* Back Button */}
        <div className="mt-10">
          <Button
            variant="outline"
            onClick={() => navigate('/soil-input')}
            className="rounded-xl border-emerald-200 text-emerald-700 hover:bg-emerald-50"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Soil Input
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Results;
