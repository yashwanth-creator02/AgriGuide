// frontend/src/components/CropCard.tsx

import type { CropInfo } from '../types';
import { Sprout, Droplet, FlaskConical } from 'lucide-react';

interface CropCardProps {
  crop: CropInfo;
}

function CropCard({ crop }: CropCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 p-6 border border-gray-100">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="bg-green-100 p-2 rounded-xl">
            <Sprout className="h-5 w-5 text-green-700" />
          </div>
          <h2 className="text-lg font-bold text-gray-800 leading-tight">{crop.name}</h2>
        </div>

        <span className="text-xs font-semibold bg-green-100 text-green-700 px-3 py-1 rounded-full capitalize">
          {crop.season}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-3">{crop.about}</p>

      {/* Meta Info */}
      <div className="flex flex-col gap-2 text-xs text-gray-500">
        <div className="flex items-center gap-2">
          <FlaskConical className="h-3.5 w-3.5 text-purple-500" />
          <span>
            pH Range:{' '}
            <span className="font-medium text-gray-700">
              {crop.min_ph} – {crop.max_ph}
            </span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Droplet className="h-3.5 w-3.5 text-blue-500" />
          <span>
            Soil: <span className="font-medium text-gray-700">{crop.suitable_soil.join(', ')}</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default CropCard;
