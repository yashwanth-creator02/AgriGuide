// frontend/src/pages/Login.tsx

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '@/services/authService';
import { Sprout, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const data = await login(formData.email, formData.password);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="bg-green-600 p-2 rounded-xl">
            <Sprout className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-green-900">AgriGuide</span>
        </div>

        <Card className="shadow-xl rounded-2xl border-white/60">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl font-bold text-gray-800">Welcome back</CardTitle>
            <CardDescription>Sign in to your AgriGuide account</CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="h-11 rounded-xl"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Password</Label>
                <Input
                  type="password"
                  name="password"
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="h-11 rounded-xl"
                  required
                />
              </div>

              {error && (
                <p className="text-sm text-red-500 bg-red-50 px-4 py-2 rounded-lg">{error}</p>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-11 bg-green-700 hover:bg-green-800 rounded-xl font-semibold"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Signing in...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <LogIn className="h-4 w-4" /> Sign In
                  </div>
                )}
              </Button>

              <p className="text-center text-sm text-gray-500">
                Don't have an account?{' '}
                <Link to="/signup" className="text-green-700 font-medium hover:underline">
                  Sign up
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Login;
