// frontend/src/components/ResultCard.tsx

import type { Recommendation } from '../types';
import { Leaf, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ResultCardProps {
  recommendation: Recommendation;
}

function ResultCard({ recommendation }: ResultCardProps) {
  const score = recommendation.suitability_score;

  const scoreColor =
    score >= 80
      ? 'text-emerald-700 bg-emerald-100'
      : score >= 60
        ? 'text-amber-700 bg-amber-100'
        : 'text-gray-700 bg-gray-100';

  return (
    <Card className="rounded-3xl border-gray-100 bg-white shadow-sm transition hover:shadow-md">
      <CardContent className="p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-4">
            <div className="rounded-2xl bg-emerald-100 p-3">
              <Leaf className="h-5 w-5 text-emerald-700" />
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-lg font-semibold text-gray-900">{recommendation.crop_name}</h2>
                <Badge className="rounded-full bg-emerald-100 px-3 py-1 text-emerald-700 hover:bg-emerald-100">
                  Recommended
                </Badge>
              </div>

              <p className="mt-2 text-sm leading-6 text-gray-600">{recommendation.reason}</p>
            </div>
          </div>

          <div className={`rounded-2xl px-4 py-3 text-center ${scoreColor} sm:min-w-[110px]`}>
            <div className="flex items-center justify-center gap-1 text-xs font-medium uppercase tracking-wider opacity-80">
              <Sparkles className="h-3.5 w-3.5" />
              Score
            </div>
            <div className="mt-1 text-3xl font-black leading-none">{score}%</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default ResultCard;
