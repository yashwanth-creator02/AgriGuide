// frontend/src/pages/SoilInput.tsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  Microscope,
  Waves,
  ThermometerSun,
  Leaf,
  Info,
  Sparkles,
  MapPin,
} from 'lucide-react';
import { useCropRecommend } from '@/hooks/useCropRecommend';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

function SoilInput() {
  const navigate = useNavigate();
  const { getRecommendations, loading } = useCropRecommend();

  const [formData, setFormData] = useState({
    farmer_id: 1,
    soil_id: null,
    soilType: '',
    ph: '6.5',
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    location: '',
    season: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const soilData = {
      ...formData,
      ph: Number(formData.ph),
      nitrogen: Number(formData.nitrogen),
      phosphorus: Number(formData.phosphorus),
      potassium: Number(formData.potassium),
      soil_type: formData.soilType,
    };

    const results = await getRecommendations(soilData);
    navigate('/results', { state: { results, location: formData.location } });
  };

  // Modern Dropdown Trigger Style
  const selectTriggerClass =
    'h-12 bg-white/50 backdrop-blur-sm border-slate-200 focus:ring-green-500 hover:bg-white/80 transition-all rounded-xl';

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-green-50 via-slate-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Navigation */}
        <div className="flex justify-between items-center mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="text-slate-600 hover:text-green-700 hover:bg-green-50/50 transition-colors rounded-xl"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Dashboard
          </Button>
          <Badge
            variant="secondary"
            className="bg-green-100/80 text-green-700 border-green-200 backdrop-blur-sm px-3 py-1"
          >
            Data Entry
          </Badge>
        </div>

        <div className="grid lg:grid-cols-[1fr_280px] gap-8">
          {/* Main Form */}
          <Card className="shadow-2xl shadow-slate-200/50 rounded-[2rem] overflow-hidden border-white/60 bg-white/70 backdrop-blur-md">
            <CardHeader className="bg-slate-900 text-white p-8">
              <div className="flex items-center gap-4">
                <div className="bg-green-500 p-3 rounded-2xl shadow-lg shadow-green-500/20">
                  <Microscope className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold tracking-tight">Soil Analysis</CardTitle>
                  <CardDescription className="text-slate-400">
                    Input precision data for optimal results.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-10">
                {/* Environment Group */}
                <section className="space-y-6">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">
                    <MapPin className="h-3.5 w-3.5" /> Environment
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-slate-700 font-medium ml-1">Soil Classification</Label>
                      <Select onValueChange={(v: string) => handleSelectChange('soilType', v)}>
                        <SelectTrigger className={selectTriggerClass}>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent className="bg-white/95 backdrop-blur-xl border-slate-200 rounded-xl shadow-xl">
                          <SelectItem value="clay">Clay</SelectItem>
                          <SelectItem value="sandy loam">Sandy Loam</SelectItem>
                          <SelectItem value="loamy">Loamy</SelectItem>
                          <SelectItem value="black soil">Black Soil</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-slate-700 font-medium ml-1">Farm Location</Label>
                      <Input
                        name="location"
                        className="h-12 bg-white/50 border-slate-200 focus:ring-green-500 rounded-xl"
                        placeholder="e.g. Pune, Maharashtra"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </section>

                {/* Nutrient Profile Group */}
                <section className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">
                      <Leaf className="h-3.5 w-3.5" /> Nutrient Profile
                    </div>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 text-slate-300 cursor-help hover:text-slate-400 transition-colors" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-[200px] text-center">
                          Refer to your latest soil test report for these values.
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { label: 'pH Level', name: 'ph', step: '0.1', placeholder: '6.5' },
                      { label: 'Nitrogen (N)', name: 'nitrogen', step: '1', placeholder: 'N' },
                      { label: 'Phosphorus (P)', name: 'phosphorus', step: '1', placeholder: 'P' },
                      { label: 'Potassium (K)', name: 'potassium', step: '1', placeholder: 'K' },
                    ].map((field) => (
                      <div key={field.name} className="space-y-2">
                        <Label className="text-[10px] font-bold text-slate-500 uppercase ml-1">
                          {field.label}
                        </Label>
                        <Input
                          type="number"
                          step={field.step}
                          name={field.name}
                          placeholder={field.placeholder}
                          className="h-11 bg-white/50 border-slate-200 focus:bg-white transition-all rounded-xl"
                          onChange={handleChange}
                        />
                      </div>
                    ))}
                  </div>
                </section>

                {/* Season Selection */}
                <section className="space-y-6">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">
                    <ThermometerSun className="h-3.5 w-3.5" /> Growing Cycle
                  </div>
                  <Select onValueChange={(v: string) => handleSelectChange('season', v)}>
                    <SelectTrigger className={selectTriggerClass}>
                      <SelectValue placeholder="Current Season" />
                    </SelectTrigger>
                    <SelectContent className="bg-white/95 backdrop-blur-xl border-slate-200 rounded-xl shadow-xl">
                      <SelectItem value="kharif">Kharif (Monsoon)</SelectItem>
                      <SelectItem value="rabi">Rabi (Winter)</SelectItem>
                      <SelectItem value="zaid">Zaid (Summer)</SelectItem>
                    </SelectContent>
                  </Select>
                </section>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full py-7 text-lg font-bold bg-green-600 hover:bg-green-700 shadow-xl shadow-green-200 transition-all hover:scale-[1.01] active:scale-[0.99] rounded-2xl"
                >
                  {loading ? (
                    <div className="flex items-center gap-3">
                      <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Analyzing...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5" /> Generate Crop Strategy
                    </div>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Sidebar Tips */}
          <div className="space-y-6">
            <div className="p-6 bg-white/60 backdrop-blur-xl rounded-[2rem] border border-white shadow-sm">
              <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
                <Info className="h-4 w-4 text-blue-500" />
                Quick Tips
              </h3>
              <ul className="text-sm text-slate-600 space-y-5">
                <li className="flex gap-3 leading-relaxed">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-500 mt-2 shrink-0" />
                  Most crops thrive in a pH range of 6.0 - 7.5.
                </li>
                <li className="flex gap-3 leading-relaxed">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-500 mt-2 shrink-0" />
                  Enter NPK values in kg/ha for maximum accuracy.
                </li>
                <li className="flex gap-3 leading-relaxed">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-500 mt-2 shrink-0" />
                  Season helps our AI adjust for temperature variations.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SoilInput;
