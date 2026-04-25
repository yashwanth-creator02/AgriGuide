// frontend/src/components/WeatherWidget.tsx

import type { WeatherData } from '../types';

interface WeatherWidgetProps {
  weather: WeatherData;
}

function WeatherWidget({ weather }: WeatherWidgetProps) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-lg font-semibold text-green-700 mb-4">🌤️ Current Weather</h2>
      <p className="text-sm text-gray-500 mb-4">📍 {weather.location}</p>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-50 rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-gray-800">{weather.temperature}°C</p>
          <p className="text-xs text-gray-400">Temperature</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-gray-800">{weather.humidity}%</p>
          <p className="text-xs text-gray-400">Humidity</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-gray-800">{weather.rainfall}mm</p>
          <p className="text-xs text-gray-400">Rainfall</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-gray-800">{weather.wind_speed} km/h</p>
          <p className="text-xs text-gray-400">Wind Speed</p>
        </div>
      </div>
    </div>
  );
}

export default WeatherWidget;
