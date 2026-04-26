// frontend/src/pages/Profile.tsx

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFarmerId, getUser } from '@/services/authService';
import { fetchProfile, updateProfile } from '@/services/profileService';
import { toast } from 'sonner';
import { User, MapPin, Phone, Mail, Sprout, FlaskConical, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

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
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!formData.name) {
      toast.error('Name is required');
      return;
    }
    setSaving(true);
    try {
      const updated = await updateProfile(farmerId, formData);
      setProfile({ ...profile, ...updated });
      // Update localStorage
      localStorage.setItem('user', JSON.stringify({ ...currentUser, ...updated }));
      toast.success('Profile updated successfully!');
      setEditing(false);
    } catch (err: any) {
      toast.error(err.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-6">
        <div className="max-w-2xl mx-auto space-y-4">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-48 w-full rounded-xl" />
          <Skeleton className="h-32 w-full rounded-xl" />
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-green-700">My Profile</h1>
            <p className="text-gray-500 text-sm">Manage your account details</p>
          </div>
          <Button
            variant="outline"
            onClick={() => navigate('/')}
            className="flex items-center gap-2 border-green-200 text-green-700 hover:bg-green-50 rounded-xl"
          >
            <Home className="h-4 w-4" />
            Home
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <div className="flex justify-center mb-2">
              <div className="bg-green-100 p-3 rounded-xl">
                <FlaskConical className="h-5 w-5 text-green-700" />
              </div>
            </div>
            <p className="text-3xl font-black text-gray-900">{profile.total_analyses}</p>
            <p className="text-sm text-gray-500">Soil Analyses</p>
          </div>
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <div className="flex justify-center mb-2">
              <div className="bg-green-100 p-3 rounded-xl">
                <Sprout className="h-5 w-5 text-green-700" />
              </div>
            </div>
            <p className="text-3xl font-black text-gray-900">{profile.total_recommendations}</p>
            <p className="text-sm text-gray-500">Recommendations</p>
          </div>
        </div>

        {/* Profile Card */}
        <Card className="shadow rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-bold text-gray-800">Account Details</CardTitle>
            {!editing ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setEditing(true)}
                className="border-green-200 text-green-700 hover:bg-green-50 rounded-xl"
              >
                Edit
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setEditing(false)}
                  className="rounded-xl"
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={handleSave}
                  disabled={saving}
                  className="bg-green-700 hover:bg-green-800 rounded-xl"
                >
                  {saving ? 'Saving...' : 'Save'}
                </Button>
              </div>
            )}
          </CardHeader>
          <CardContent className="space-y-5">
            {/* Name */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-gray-600">
                <User className="h-4 w-4" /> Full Name
              </Label>
              {editing ? (
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="rounded-xl"
                />
              ) : (
                <p className="text-gray-800 font-medium pl-1">{profile.name}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-gray-600">
                <Mail className="h-4 w-4" /> Email
              </Label>
              <p className="text-gray-800 font-medium pl-1">{profile.email}</p>
              <p className="text-xs text-gray-400 pl-1">Email cannot be changed</p>
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-gray-600">
                <Phone className="h-4 w-4" /> Phone
              </Label>
              {editing ? (
                <Input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="e.g. 9999999999"
                  className="rounded-xl"
                />
              ) : (
                <p className="text-gray-800 font-medium pl-1">{profile.phone || 'Not provided'}</p>
              )}
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-gray-600">
                <MapPin className="h-4 w-4" /> Location
              </Label>
              {editing ? (
                <Input
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. Pune, Maharashtra"
                  className="rounded-xl"
                />
              ) : (
                <p className="text-gray-800 font-medium pl-1">
                  {profile.location || 'Not provided'}
                </p>
              )}
            </div>

            {/* Member Since */}
            <div className="space-y-2">
              <Label className="text-gray-600">Member Since</Label>
              <p className="text-gray-800 font-medium pl-1">
                {new Date(profile.created_at).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Profile;
