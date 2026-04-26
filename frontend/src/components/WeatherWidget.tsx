// frontend/src/components/WeatherWidget.tsx

import type { WeatherData } from '../types';
import { CloudSun, Droplets, Wind, CloudRain } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface WeatherWidgetProps {
  weather: WeatherData;
}

function WeatherWidget({ weather }: WeatherWidgetProps) {
  return (
    <Card className="rounded-3xl border-gray-100 bg-white shadow-sm">
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <CloudSun className="h-5 w-5 text-emerald-600" />
              Current Weather
            </h2>
            <p className="text-sm text-gray-500 mt-1">📍 {weather.location}</p>
          </div>

          {/* Main Temp */}
          <div className="text-right">
            <p className="text-4xl font-black text-gray-900 leading-none">{weather.temperature}°</p>
            <p className="text-xs text-gray-400">Celsius</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div className="flex items-center gap-3 rounded-2xl bg-gray-50 p-3">
            <Droplets className="h-4 w-4 text-blue-500" />
            <div>
              <p className="text-sm font-semibold text-gray-800">{weather.humidity}%</p>
              <p className="text-xs text-gray-400">Humidity</p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl bg-gray-50 p-3">
            <CloudRain className="h-4 w-4 text-indigo-500" />
            <div>
              <p className="text-sm font-semibold text-gray-800">{weather.rainfall} mm</p>
              <p className="text-xs text-gray-400">Rainfall</p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl bg-gray-50 p-3">
            <Wind className="h-4 w-4 text-gray-500" />
            <div>
              <p className="text-sm font-semibold text-gray-800">{weather.wind_speed} km/h</p>
              <p className="text-xs text-gray-400">Wind</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default WeatherWidget;
