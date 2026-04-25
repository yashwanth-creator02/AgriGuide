// frontend/src/components/CropCard.tsx

import type { CropInfo } from '../types';

interface CropCardProps {
  crop: CropInfo;
}

function CropCard({ crop }: CropCardProps) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-gray-800">{crop.name}</h2>
        <span className="text-xs font-medium bg-green-100 text-green-700 px-3 py-1 rounded-full capitalize">
          {crop.season}
        </span>
      </div>
      <p className="text-sm text-gray-500 mb-3">{crop.about}</p>
      <div className="text-xs text-gray-400">
        pH: {crop.min_ph} - {crop.max_ph} &nbsp;|&nbsp; Soil: {crop.suitable_soil.join(', ')}
      </div>
    </div>
  );
}

export default CropCard;
