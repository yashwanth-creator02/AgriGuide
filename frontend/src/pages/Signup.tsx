// frontend/src/pages/Signup.tsx

import { useState } from 'react';
import { useNavigate, useLocation, Link, Navigate } from 'react-router-dom';
import { signup, isLoggedIn } from '@/services/authService';
import { Sprout } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

function Signup() {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirm: '' });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (isLoggedIn()) {
    return <Navigate to="/" replace />;
  }

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

      const destination = (location.state as any)?.from?.pathname || '/';
      navigate(destination, { replace: true });
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
              {error && (
                <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                  {error}
                </div>
              )}

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
                  placeholder="Min. 6 characters"
                  className="h-11 rounded-xl focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label>Confirm Password</Label>
                <Input
                  type="password"
                  name="confirm"
                  value={formData.confirm}
                  onChange={handleChange}
                  placeholder="Repeat your password"
                  className="h-11 rounded-xl focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-11 bg-green-700 hover:bg-green-800 text-white font-semibold rounded-xl shadow-lg shadow-green-200 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                {loading ? 'Creating account...' : 'Create Account'}
              </Button>

              {/* Login link */}
              <p className="text-center text-sm text-gray-500 pt-2">
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
