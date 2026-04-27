// frontend/src/pages/Signup.tsx

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signup } from '@/services/authService';
import { Sprout, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirm: '' });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.confirm) {
      toast.error('Passwords do not match');
      return setError('Passwords do not match');
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return setError('Password must be at least 6 characters');
    }

    setLoading(true);
    try {
      const data = await signup(formData.name, formData.email, formData.password);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      toast.success(`Welcome to AgriGuide, ${data.user.name}!`);
      navigate('/');
    } catch (err: any) {
      setError(err.message);
      toast.error(err.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-green-50 via-white to-slate-50 relative overflow-hidden">
      {/* subtle background glow */}
      <div className="absolute w-[500px] h-[500px] bg-green-200/20 rounded-full blur-[120px] -top-32 -right-32" />
      <div className="absolute w-[400px] h-[400px] bg-slate-200/30 rounded-full blur-[100px] -bottom-32 -left-32" />

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-10">
          <div className="bg-green-600 p-2 rounded-xl shadow-md">
            <Sprout className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-green-900 tracking-tight">AgriGuide</span>
        </div>

        <Card className="rounded-2xl border-white/60 bg-white/70 backdrop-blur-xl shadow-2xl">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl font-bold text-gray-800">Create account</CardTitle>
            <CardDescription className="text-gray-500">
              Join AgriGuide and start farming smarter
            </CardDescription>
          </CardHeader>

          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="h-11 rounded-xl focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="h-11 rounded-xl focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label>Password</Label>
                <Input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="h-11 rounded-xl focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              {/* Confirm */}
              <div className="space-y-2">
                <Label>Confirm Password</Label>
                <Input
                  type="password"
                  name="confirm"
                  value={formData.confirm}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="h-11 rounded-xl focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              {/* Error */}
              {error && (
                <div className="text-sm text-red-500 bg-red-50 border border-red-100 px-4 py-2 rounded-lg">
                  {error}
                </div>
              )}

              {/* Submit */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-11 bg-green-700 hover:bg-green-800 rounded-xl font-semibold shadow-md transition-all hover:scale-[1.02] active:scale-95"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Creating account...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <UserPlus className="h-4 w-4" /> Create Account
                  </div>
                )}
              </Button>

              {/* Footer */}
              <p className="text-center text-sm text-gray-500">
                Already have an account?{' '}
                <Link to="/login" className="text-green-700 font-semibold hover:underline">
                  Sign in
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Signup;
