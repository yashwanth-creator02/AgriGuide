// frontend/src/components/AlertBanner.tsx

import { SEVERITY_COLORS } from '../constants';

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
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold text-gray-800">{pest_name}</h2>
        <span
          className={`text-xs font-semibold px-3 py-1 rounded-full ${SEVERITY_COLORS[severity]}`}
        >
          {severity}
        </span>
      </div>
      <p className="text-sm text-gray-500 mb-1">
        🌾 Affected Crop: <span className="font-medium text-gray-700">{affected_crop}</span>
      </p>
      <p className="text-sm text-gray-500 mb-3">
        📍 Region: <span className="font-medium text-gray-700">{region}</span>
      </p>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}

export default AlertBanner;
