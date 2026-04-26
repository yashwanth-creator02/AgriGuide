// frontend/src/components/AlertBanner.tsx

import { SEVERITY_COLORS } from '../constants';
import { Bug, MapPin, Sprout } from 'lucide-react';

interface AlertBannerProps {
  pest_name: string;
  affected_crop: string;
  region: string;
  severity: 'Low' | 'Medium' | 'High';
  description: string;
}

function AlertBanner({
  pest_name,
  affected_crop,
  region,
  severity,
  description,
}: AlertBannerProps) {
  const severityBorder = {
    High: 'border-red-500',
    Medium: 'border-amber-500',
    Low: 'border-green-500',
  };

  return (
    <div
      className={`bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 p-6 border-l-4 ${severityBorder[severity]}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="bg-red-100 p-2 rounded-xl">
            <Bug className="h-5 w-5 text-red-600" />
          </div>
          <h2 className="text-lg font-bold text-gray-800 leading-tight">{pest_name}</h2>
        </div>

        <span
          className={`text-xs font-semibold px-3 py-1 rounded-full ${SEVERITY_COLORS[severity]}`}
        >
          {severity}
        </span>
      </div>

      {/* Meta Info */}
      <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
        <div className="flex items-center gap-2">
          <Sprout className="h-4 w-4 text-green-600" />
          <span>
            Crop: <span className="font-medium text-gray-700">{affected_crop}</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-blue-500" />
          <span>
            Region: <span className="font-medium text-gray-700">{region}</span>
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}

export default AlertBanner;
