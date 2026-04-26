// frontend/src/pages/Profile.tsx

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFarmerId, getUser } from '@/services/authService';
import { fetchProfile, updateProfile } from '@/services/profileService';
import { toast } from 'sonner';
import {
  User,
  MapPin,
  Phone,
  Mail,
  Sprout,
  FlaskConical,
  Home,
  Edit3,
  Save,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';

function Profile() {
  const navigate = useNavigate();
  const farmerId = getFarmerId();
  const currentUser = getUser();

  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: '',
  });

  useEffect(() => {
    fetchProfile(farmerId)
      .then((data) => {
        setProfile(data);
        setFormData({
          name: data.name || '',
          phone: data.phone || '',
          location: data.location || '',
        });
      })
      .catch((err) => toast.error(err.message))
      .finally(() => setLoading(false));
  }, [farmerId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!formData.name.trim()) {
      toast.error('Name is required');
      return;
    }

    setSaving(true);
    try {
      const updated = await updateProfile(farmerId, formData);
      setProfile((prev: any) => ({ ...prev, ...updated }));
      localStorage.setItem('user', JSON.stringify({ ...currentUser, ...updated }));
      toast.success('Profile updated successfully!');
      setEditing(false);
    } catch (err: any) {
      toast.error(err.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-lime-50 px-4 py-8 md:px-6">
        <div className="mx-auto max-w-4xl space-y-6">
          <div className="rounded-3xl border border-emerald-100 bg-white/80 p-6 shadow-sm backdrop-blur md:p-8">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="mt-3 h-4 w-72" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-32 rounded-3xl" />
            <Skeleton className="h-32 rounded-3xl" />
          </div>

          <Skeleton className="h-[28rem] rounded-3xl" />
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-lime-50 px-4 py-8 md:px-6">
        <div className="mx-auto flex min-h-[70vh] max-w-3xl items-center justify-center">
          <Card className="w-full rounded-3xl border-gray-100 bg-white shadow-sm">
            <CardContent className="p-8 text-center">
              <h2 className="text-xl font-semibold text-gray-900">Profile not found</h2>
              <p className="mt-2 text-sm text-gray-600">
                We could not load your profile details right now.
              </p>
              <Button
                onClick={() => navigate('/')}
                className="mt-6 rounded-2xl bg-emerald-700 px-6 text-white hover:bg-emerald-800"
              >
                <Home className="mr-2 h-4 w-4" />
                Return Home
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-lime-50 px-4 py-8 md:px-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 rounded-3xl border border-emerald-100 bg-white/80 p-6 shadow-sm backdrop-blur md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <Badge className="mb-3 rounded-full bg-emerald-100 px-3 py-1 text-emerald-700 hover:bg-emerald-100">
                Farmer Account
              </Badge>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
                My Profile
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600 md:text-base">
                Manage your personal details and keep your farming account up to date.
              </p>
            </div>

            <Button
              variant="outline"
              onClick={() => navigate('/')}
              className="h-11 rounded-2xl border-emerald-200 bg-white text-emerald-700 hover:bg-emerald-50"
            >
              <Home className="mr-2 h-4 w-4" />
              Home
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="rounded-3xl border-gray-100 bg-white shadow-sm">
            <CardContent className="p-6 text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100">
                <FlaskConical className="h-5 w-5 text-emerald-700" />
              </div>
              <p className="text-3xl font-black text-gray-900">{profile.total_analyses ?? 0}</p>
              <p className="mt-1 text-sm text-gray-500">Soil Analyses</p>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-gray-100 bg-white shadow-sm">
            <CardContent className="p-6 text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100">
                <Sprout className="h-5 w-5 text-emerald-700" />
              </div>
              <p className="text-3xl font-black text-gray-900">
                {profile.total_recommendations ?? 0}
              </p>
              <p className="mt-1 text-sm text-gray-500">Recommendations</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6 overflow-hidden rounded-3xl border-gray-100 bg-white shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between border-b border-gray-100 bg-gray-50/70 px-6 py-5">
            <CardTitle className="text-lg font-semibold text-gray-900">Account Details</CardTitle>

            {!editing ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setEditing(true)}
                className="h-10 rounded-2xl border-emerald-200 bg-white text-emerald-700 hover:bg-emerald-50"
              >
                <Edit3 className="mr-2 h-4 w-4" />
                Edit
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setEditing(false)}
                  className="h-10 rounded-2xl"
                  disabled={saving}
                >
                  <X className="mr-2 h-4 w-4" />
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={handleSave}
                  disabled={saving}
                  className="h-10 rounded-2xl bg-emerald-700 text-white hover:bg-emerald-800"
                >
                  <Save className="mr-2 h-4 w-4" />
                  {saving ? 'Saving...' : 'Save'}
                </Button>
              </div>
            )}
          </CardHeader>

          <CardContent className="space-y-6 p-6 md:p-8">
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-sm font-medium text-gray-600">
                <User className="h-4 w-4" />
                Full Name
              </Label>
              {editing ? (
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="h-12 rounded-2xl border-gray-200 bg-white shadow-sm outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                />
              ) : (
                <p className="pl-1 text-base font-medium text-gray-900">{profile.name || '—'}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-sm font-medium text-gray-600">
                <Mail className="h-4 w-4" />
                Email
              </Label>
              <p className="pl-1 text-base font-medium text-gray-900">{profile.email || '—'}</p>
              <p className="pl-1 text-xs text-gray-400">Email cannot be changed</p>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-sm font-medium text-gray-600">
                <Phone className="h-4 w-4" />
                Phone
              </Label>
              {editing ? (
                <Input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="e.g. 9999999999"
                  className="h-12 rounded-2xl border-gray-200 bg-white shadow-sm outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                />
              ) : (
                <p className="pl-1 text-base font-medium text-gray-900">
                  {profile.phone || 'Not provided'}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-sm font-medium text-gray-600">
                <MapPin className="h-4 w-4" />
                Location
              </Label>
              {editing ? (
                <Input
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. Pune, Maharashtra"
                  className="h-12 rounded-2xl border-gray-200 bg-white shadow-sm outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                />
              ) : (
                <p className="pl-1 text-base font-medium text-gray-900">
                  {profile.location || 'Not provided'}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-600">Member Since</Label>
              <p className="pl-1 text-base font-medium text-gray-900">
                {profile.created_at
                  ? new Date(profile.created_at).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })
                  : '—'}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Profile;
