// frontend/src/pages/SoilInput.tsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  Microscope,
  ThermometerSun,
  Leaf,
  Info,
  Sparkles,
  MapPin,
} from 'lucide-react';
import { useCropRecommend } from '@/hooks/useCropRecommend';
import MapPicker from '@/components/MapPicker';
import { toast } from 'sonner';
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
import { saveSoilData } from '@/services/soilService';
import { getFarmerId } from '@/services/authService';

type FormData = {
  farmer_id: number | null;
  soil_id: number | null;
  soilType: string;
  ph: string;
  nitrogen: string;
  phosphorus: string;
  potassium: string;
  location: string;
  season: string;
};

function SoilInput() {
  const navigate = useNavigate();
  const { getRecommendations, loading } = useCropRecommend();
  const [showMap, setShowMap] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    farmer_id: getFarmerId(),
    soil_id: null,
    soilType: '',
    ph: '6.5',
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    location: '',
    season: '',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errors: Record<string, string> = {};

    if (!formData.soilType) errors.soilType = 'Soil type is required';
    if (!formData.location) errors.location = 'Location is required';
    if (!formData.season) errors.season = 'Season is required';

    const ph = Number(formData.ph);
    if (!formData.ph) errors.ph = 'pH is required';
    else if (ph < 0 || ph > 14) errors.ph = 'pH must be between 0 and 14';

    const nitrogen = Number(formData.nitrogen);
    if (!formData.nitrogen) errors.nitrogen = 'Required';
    else if (nitrogen < 0) errors.nitrogen = 'Must be positive';

    const phosphorus = Number(formData.phosphorus);
    if (!formData.phosphorus) errors.phosphorus = 'Required';
    else if (phosphorus < 0) errors.phosphorus = 'Must be positive';

    const potassium = Number(formData.potassium);
    if (!formData.potassium) errors.potassium = 'Required';
    else if (potassium < 0) errors.potassium = 'Must be positive';

    return errors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => {
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  const handleSelectChange = (name: keyof Pick<FormData, 'soilType' | 'season'>, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => {
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  const handleLocationSelect = (location: string) => {
    setFormData((prev) => ({ ...prev, location }));
    setFormErrors((prev) => {
      const next = { ...prev };
      delete next.location;
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      toast.error('Please fix the errors before submitting');
      return;
    }

    setFormErrors({});

    try {
      const soilData = {
        farmer_id: formData.farmer_id,
        soil_type: formData.soilType,
        ph: Number(formData.ph),
        nitrogen: Number(formData.nitrogen),
        phosphorus: Number(formData.phosphorus),
        potassium: Number(formData.potassium),
        location: formData.location,
        season: formData.season,
      };

      const savedSoil = await saveSoilData(soilData);
      const results = await getRecommendations({
        ...soilData,
        soil_id: savedSoil.id,
      });

      if (!results || results.length === 0) {
        toast.warning('No suitable crops found for your soil data. Try adjusting the values.');
        return;
      }

      toast.success('Recommendations generated successfully!');
      navigate('/results', { state: { results, location: formData.location } });
    } catch (err: any) {
      toast.error(err.message || 'Something went wrong. Please try again.');
    }
  };

  const selectTriggerClass =
    'h-12 bg-white/70 backdrop-blur-sm border-slate-200 shadow-sm focus:ring-2 focus:ring-green-500 hover:bg-white transition-all rounded-xl';

  const nutrientFields = [
    { label: 'pH Level', name: 'ph', step: '0.1', placeholder: '6.5' },
    { label: 'Nitrogen (N)', name: 'nitrogen', step: '1', placeholder: 'kg/ha' },
    { label: 'Phosphorus (P)', name: 'phosphorus', step: '1', placeholder: 'kg/ha' },
    { label: 'Potassium (K)', name: 'potassium', step: '1', placeholder: 'kg/ha' },
  ] as const;

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-green-50 via-slate-50 to-white px-4 py-10">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex items-center justify-between gap-4">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="rounded-xl text-slate-600 transition-colors hover:bg-green-50/60 hover:text-green-700"
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              Back to Dashboard
            </Button>

            <Badge
              variant="secondary"
              className="border-green-200 bg-green-100/80 px-3 py-1 text-green-700 backdrop-blur-sm"
            >
              Data Entry
            </Badge>
          </div>

          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px]">
            <Card className="overflow-hidden rounded-[2rem] border-white/60 bg-white/75 shadow-2xl shadow-slate-200/50 backdrop-blur-md">
              <CardHeader className="bg-slate-900 p-8 text-white">
                <div className="flex items-center gap-4">
                  <div className="rounded-2xl bg-green-500 p-3 shadow-lg shadow-green-500/20">
                    <Microscope className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-bold tracking-tight">
                      Soil Analysis
                    </CardTitle>
                    <CardDescription className="text-slate-400">
                      Input your soil details to generate crop recommendations.
                    </CardDescription>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-300">
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                    Step 1
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                    Soil Data
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                    Crop Strategy
                  </span>
                </div>
              </CardHeader>

              <CardContent className="p-6 md:p-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                  <section className="space-y-5">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                      <MapPin className="h-3.5 w-3.5" />
                      Environment
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label className="ml-1 font-medium text-slate-700">
                          Soil Classification
                        </Label>
                        <Select
                          value={formData.soilType}
                          onValueChange={(v: string) => handleSelectChange('soilType', v)}
                        >
                          <SelectTrigger className={selectTriggerClass}>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl border-slate-200 bg-white/95 shadow-xl backdrop-blur-xl">
                            <SelectItem value="clay">Clay</SelectItem>
                            <SelectItem value="sandy loam">Sandy Loam</SelectItem>
                            <SelectItem value="loamy">Loamy</SelectItem>
                            <SelectItem value="clay loam">Clay Loam</SelectItem>
                            <SelectItem value="black soil">Black Soil</SelectItem>
                          </SelectContent>
                        </Select>
                        {formErrors.soilType && (
                          <p className="ml-1 mt-1 text-xs text-red-500">{formErrors.soilType}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label className="ml-1 font-medium text-slate-700">Farm Location</Label>
                        <div className="flex gap-2">
                          <Input
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            placeholder="e.g. Pune, Maharashtra"
                            className="h-12 rounded-xl border-slate-200 bg-white/70 shadow-sm transition-all focus:bg-white focus:ring-2 focus:ring-green-500"
                          />
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                type="button"
                                onClick={() => setShowMap(true)}
                                className="h-12 shrink-0 rounded-xl bg-green-600 px-4 shadow-md shadow-green-200 transition-all hover:scale-105 hover:bg-green-700 active:scale-95"
                              >
                                <MapPin className="h-4 w-4" />
                                <span className="hidden sm:ml-2 sm:inline">Pick</span>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Pick location from map</TooltipContent>
                          </Tooltip>
                        </div>
                        {formErrors.location && (
                          <p className="ml-1 mt-1 text-xs text-red-500">{formErrors.location}</p>
                        )}
                        {formData.location && !formErrors.location && (
                          <p className="ml-1 flex items-center gap-1 text-xs text-green-600">
                            <MapPin className="h-3 w-3" />
                            {formData.location}
                          </p>
                        )}
                      </div>
                    </div>
                  </section>

                  <div className="border-t border-slate-100 pt-8" />

                  <section className="space-y-5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                        <Leaf className="h-3.5 w-3.5" />
                        Nutrient Profile
                      </div>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 cursor-help text-slate-300 transition-colors hover:text-slate-400" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-[220px] text-center">
                          Refer to your latest soil test report for these values.
                        </TooltipContent>
                      </Tooltip>
                    </div>

                    <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
                      {nutrientFields.map((field) => (
                        <div key={field.name} className="space-y-2">
                          <Label className="ml-1 text-[10px] font-bold uppercase text-slate-500">
                            {field.label}
                          </Label>
                          <Input
                            type="number"
                            step={field.step}
                            name={field.name}
                            value={formData[field.name]}
                            onChange={handleChange}
                            placeholder={field.placeholder}
                            className="h-12 rounded-xl border-slate-200 bg-white/70 shadow-sm transition-all focus:bg-white focus:ring-2 focus:ring-green-500"
                          />
                          {formErrors[field.name] ? (
                            <p className="ml-1 mt-1 text-xs text-red-500">
                              {formErrors[field.name]}
                            </p>
                          ) : formData[field.name] ? (
                            <p className="ml-1 mt-1 text-xs text-green-600">Looks good</p>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  </section>

                  <div className="border-t border-slate-100 pt-8" />

                  <section className="space-y-5">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                      <ThermometerSun className="h-3.5 w-3.5" />
                      Growing Cycle
                    </div>

                    <Select
                      value={formData.season}
                      onValueChange={(v: string) => handleSelectChange('season', v)}
                    >
                      <SelectTrigger className={selectTriggerClass}>
                        <SelectValue placeholder="Current Season" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl border-slate-200 bg-white/95 shadow-xl backdrop-blur-xl">
                        <SelectItem value="kharif">Kharif (Monsoon)</SelectItem>
                        <SelectItem value="rabi">Rabi (Winter)</SelectItem>
                        <SelectItem value="zaid">Zaid (Summer)</SelectItem>
                      </SelectContent>
                    </Select>

                    {formErrors.season && (
                      <p className="ml-1 mt-1 text-xs text-red-500">{formErrors.season}</p>
                    )}
                  </section>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-2xl bg-gradient-to-r from-green-600 to-emerald-500 py-7 text-lg font-bold shadow-2xl shadow-green-200 transition-all hover:scale-[1.02] hover:from-green-700 hover:to-emerald-600 active:scale-[0.98]"
                  >
                    {loading ? (
                      <div className="flex items-center gap-3">
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        Analyzing...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5" />
                        Generate Crop Strategy
                      </div>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="h-fit space-y-6 lg:sticky lg:top-24">
              <div className="rounded-[2rem] border border-white bg-white/60 p-6 shadow-sm backdrop-blur-xl">
                <h3 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-800">
                  <Info className="h-4 w-4 text-blue-500" />
                  Quick Tips
                </h3>

                <ul className="space-y-5 text-sm text-slate-600">
                  <li className="flex gap-3 leading-relaxed">
                    <div className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-green-500" />
                    Most crops thrive in a pH range of 6.0 - 7.5.
                  </li>
                  <li className="flex gap-3 leading-relaxed">
                    <div className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-green-500" />
                    Enter NPK values in kg/ha for maximum accuracy.
                  </li>
                  <li className="flex gap-3 leading-relaxed">
                    <div className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-green-500" />
                    Season helps the model adjust for temperature variation.
                  </li>
                  <li className="flex gap-3 leading-relaxed">
                    <div className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-green-500" />
                    Use the map pin to auto-detect your farm location.
                  </li>
                </ul>
              </div>

              <div className="rounded-[2rem] border border-emerald-100 bg-emerald-50/80 p-6 shadow-sm">
                <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-800">
                  What happens next?
                </h3>
                <p className="mt-3 text-sm leading-6 text-emerald-900/80">
                  Your soil data is saved first, then recommendations are generated with weather
                  context so the result page can show both crop suggestions and local conditions.
                </p>
              </div>
            </div>
          </div>
        </div>

        {showMap && (
          <MapPicker onLocationSelect={handleLocationSelect} onClose={() => setShowMap(false)} />
        )}

        {loading && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
            <div className="flex items-center gap-3 rounded-2xl bg-white px-6 py-4 shadow-xl">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-green-500 border-t-transparent" />
              <span className="text-sm font-medium text-gray-700">Analyzing soil...</span>
            </div>
          </div>
        )}
      </div>
    </TooltipProvider>
  );
}

export default SoilInput;
