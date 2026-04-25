// frontend/src/pages/NotFound.tsx

import { useNavigate } from 'react-router-dom';
import { Home, AlertCircle, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-slate-50 relative overflow-hidden px-6">
      {/* Background glow */}
      <div className="absolute w-[600px] h-[600px] bg-green-200/20 rounded-full blur-[120px] -top-40 -right-40" />
      <div className="absolute w-[500px] h-[500px] bg-slate-200/30 rounded-full blur-[100px] -bottom-40 -left-40" />

      <div className="relative z-10 text-center max-w-lg w-full">
        {/* 404 HERO SECTION */}
        <div className="relative flex justify-center mb-10">
          {/* ERROR 404 */}

          {/* icon card */}
          <div className="absolute bottom-2 flex items-center justify-center">
            <div className="bg-white/70 backdrop-blur-xl border border-white shadow-xl rounded-3xl p-6">
              <div className="bg-green-700 p-5 rounded-2xl shadow-lg">
                <AlertCircle className="h-10 w-10 text-white" />
              </div>
            </div>

            {/* leaf accent */}
            <Leaf className="absolute -top-4 -right-6 h-10 w-10 text-green-500/30 rotate-12" />
          </div>
        </div>

        {/* TEXT */}
        <div className="space-y-3 mb-10">
          <h1 className="text-[10rem] sm:text-[4rem] font-black tracking-tighter text-slate-900 leading-none select-none">
            404
          </h1>
          <h2 className="text-3xl font-bold text-slate-900">Page not found</h2>

          <p className="text-slate-500 text-base leading-relaxed">
            This page doesn’t exist or has been moved. Let’s get you back to your farm dashboard.
          </p>
        </div>

        {/* ONLY ONE BUTTON (CLEAN UX) */}
        <Button
          onClick={() => navigate('/')}
          className="h-12 px-8 bg-green-700 hover:bg-green-800 text-white rounded-xl shadow-lg shadow-green-700/20 transition-all hover:scale-[1.03] active:scale-95 flex items-center gap-2 mx-auto"
        >
          <Home className="h-4 w-4" />
          Return to Home
        </Button>

        {/* small footer */}
        <p className="mt-10 text-xs text-slate-400 tracking-wider">
          AgriGuide • Smart Farming Assistant
        </p>
      </div>
    </div>
  );
}

export default NotFound;
