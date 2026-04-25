// frontend/src/components/ResultCard.tsx

import type { Recommendation } from '../types';

interface ResultCardProps {
  recommendation: Recommendation;
}

function ResultCard({ recommendation }: ResultCardProps) {
  return (
    <div className="bg-white rounded-xl shadow p-6 flex items-center justify-between">
      <div>
        <h2 className="text-lg font-semibold text-gray-800">{recommendation.crop_name}</h2>
        <p className="text-sm text-gray-500 mt-1">{recommendation.reason}</p>
      </div>
      <div className="text-right">
        <span className="text-2xl font-bold text-green-600">
          {recommendation.suitability_score}%
        </span>
        <p className="text-xs text-gray-400">Suitability</p>
      </div>
    </div>
  );
}

export default ResultCard;
