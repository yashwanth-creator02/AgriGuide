// frontend/src/pages/Home.tsx

import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Sprout,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const features = [
  {
    title: 'Crop Advisory',
    description: 'Personalized crop recommendations based on soil and weather.',
    icon: Sprout,
    color: 'text-green-600',
    bgColor: 'bg-green-100/50',
    path: '/soil-input',
  },
  {
    title: 'Market Prices',
    description: 'Stay updated with the latest market prices in your region.',
    icon: TrendingUp,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100/50',
    path: '/market-prices',
  },
  {
    title: 'Pest Alerts',
    description: 'Timely alerts about pest outbreaks and management.',
    icon: AlertTriangle,
    color: 'text-amber-600',
    bgColor: 'bg-amber-100/50',
    path: '/pest-alerts',
  },
];

function Home() {
  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-green-50 via-slate-50 to-white relative overflow-hidden">
      {/* 1. Background Grid - Lower Opacity for subtlety */}
      <div className="absolute inset-0 z-0 opacity-[0.02] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* 2. Compact Hero Section */}
      <section className="relative pt-12 pb-12 lg:pt-24 lg:pb-20 px-6">
        <div className="container mx-auto relative z-10 text-center lg:text-left">
          <div className="max-w-4xl mx-auto lg:mx-0">
            <Badge className="mb-4 py-1 px-3 bg-green-100 text-green-700 border-green-200 backdrop-blur-sm">
              <Sparkles className="h-3 w-3 mr-2 inline" />
              Intelligence for Agriculture
            </Badge>

            <h1 className="text-5xl lg:text-7xl font-black tracking-tighter text-slate-900 mb-6 leading-[0.95]">
              Smart farming <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">
                starts here.
              </span>
            </h1>

            <p className="text-lg text-slate-500 mb-8 leading-relaxed max-w-xl font-medium">
              AgriGuide blends real-time data analytics with precision soil science to help you
              maximize yields and minimize environmental risk.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                className="h-14 px-8 text-base font-bold bg-green-700 hover:bg-green-800 shadow-xl shadow-green-200 transition-all hover:scale-105 active:scale-95 rounded-xl"
                asChild
              >
                <Link to="/soil-input" className="flex items-center gap-2">
                  Analyze Soil <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="h-14 px-8 text-base font-bold border-slate-200 bg-white/50 backdrop-blur-sm hover:bg-white rounded-xl"
                asChild
              >
                <Link to="/crop-info">Explore Crops</Link>
              </Button>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-slate-400 font-bold uppercase tracking-widest text-[10px]">
              <div className="flex items-center gap-2">
                <Zap className="h-3.5 w-3.5 text-amber-500" /> AI Insights
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-3.5 w-3.5 text-blue-500" /> Precision Data
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-green-500" /> Real-time
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Tightened Feature Grid */}
      <section className="py-12 container mx-auto px-6 relative z-10">
        <div className="flex items-end justify-between mb-10 gap-6">
          <div className="max-w-md">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">
              Precision Toolset
            </h2>
            <p className="text-slate-500 text-sm font-medium">
              Everything you need to manage your fields more efficiently.
            </p>
          </div>
          <div className="h-px flex-1 bg-slate-200/60 hidden md:block" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="bg-white/50 backdrop-blur-md border-white/60 border shadow-sm hover:shadow-xl transition-all duration-300 group rounded-[2rem] overflow-hidden"
            >
              <CardHeader className="p-6">
                <div
                  className={`${feature.bgColor} ${feature.color} w-12 h-12 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl font-bold text-slate-800 tracking-tight">
                  {feature.title}
                </CardTitle>
                <CardDescription className="text-slate-500 text-sm leading-relaxed font-medium pt-2">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              <CardFooter className="px-6 pb-6 pt-0">
                <Button
                  variant="ghost"
                  className="p-0 h-auto text-green-700 font-bold hover:text-green-800 hover:bg-transparent group/btn text-sm"
                  asChild
                >
                  <Link to={feature.path} className="flex items-center gap-1">
                    Get Started
                    <ChevronRight className="h-3 w-3 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* 4. Compact Stats Section */}
      <section className="mx-6 mb-12">
        <div className="container mx-auto bg-slate-900 rounded-[2.5rem] p-8 lg:p-12 relative overflow-hidden shadow-xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center relative z-10">
            {[
              { val: '95%', lab: 'Accuracy' },
              { val: '12k+', lab: 'Farmers' },
              { val: '24/7', lab: 'Monitoring' },
              { val: '50+', lab: 'Crops' },
            ].map((stat) => (
              <div key={stat.lab} className="space-y-1">
                <div className="text-3xl lg:text-4xl font-black text-white tracking-tighter">
                  {stat.val}
                </div>
                <div className="text-green-400 font-bold uppercase tracking-[0.2em] text-[9px]">
                  {stat.lab}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
