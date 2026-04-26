// frontend/src/pages/NotFound.tsx

import { useNavigate } from 'react-router-dom';
import { Home, AlertCircle, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-lime-50 px-6">
      {/* soft background glows */}
      <div className="absolute -right-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-emerald-200/30 blur-3xl" />
      <div className="absolute -bottom-32 -left-32 h-[26rem] w-[26rem] rounded-full bg-lime-200/30 blur-3xl" />

      <div className="relative z-10 w-full max-w-xl text-center">
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <Card className="rounded-[2rem] border-white/70 bg-white/80 shadow-xl backdrop-blur">
              <CardContent className="p-7">
                <div className="flex items-center justify-center rounded-3xl bg-emerald-700 p-5 shadow-lg shadow-emerald-200">
                  <AlertCircle className="h-10 w-10 text-white" />
                </div>
              </CardContent>
            </Card>

            <Leaf className="absolute -right-5 -top-4 h-10 w-10 rotate-12 text-emerald-500/30" />
          </div>
        </div>

        <Badge className="mb-4 rounded-full bg-emerald-100 px-3 py-1 text-emerald-700 hover:bg-emerald-100">
          Lost in the field
        </Badge>

        <h1 className="text-7xl font-black tracking-tight text-gray-900 sm:text-8xl md:text-[8.5rem]">
          404
        </h1>

        <h2 className="mt-2 text-2xl font-semibold text-gray-900 sm:text-3xl">Page not found</h2>

        <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-gray-600 sm:text-base">
          This page does not exist or has been moved. Let’s get you back to the dashboard.
        </p>

        <div className="mt-8">
          <Button
            onClick={() => navigate('/')}
            className="h-12 rounded-2xl bg-emerald-700 px-6 font-semibold text-white shadow-md transition hover:bg-emerald-800 hover:shadow-lg"
          >
            <Home className="mr-2 h-4 w-4" />
            Return to Home
          </Button>
        </div>

        <p className="mt-10 text-xs uppercase tracking-[0.25em] text-gray-400">
          AgriGuide • Smart Farming Assistant
        </p>
      </div>
    </div>
  );
}

export default NotFound;
