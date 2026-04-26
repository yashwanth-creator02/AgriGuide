// frontend/src/pages/Login.tsx

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '@/services/authService';
import { Sprout, LogIn, Mail, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

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
      toast.success(`Welcome back, ${data.user.name}!`);
      navigate('/');
    } catch (err: any) {
      setError(err.message);
      toast.error(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-lime-50 px-4 py-8">
      {/* subtle background accents */}
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-emerald-200/40 blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-lime-200/40 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-6xl items-center">
        <div className="grid w-full gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left side */}
          <div className="flex flex-col justify-center text-center lg:text-left">
            <div className="mb-6 flex items-center justify-center gap-3 lg:justify-start">
              <div className="rounded-2xl bg-emerald-700 p-3 shadow-lg shadow-emerald-200">
                <Sprout className="h-7 w-7 text-white" />
              </div>
              <div>
                <span className="block text-2xl font-bold tracking-tight text-gray-900">
                  AgriGuide
                </span>
                <span className="text-sm text-gray-500">Smart farming, better decisions</span>
              </div>
            </div>

            <h1 className="text-4xl font-black tracking-tight text-gray-900 sm:text-5xl">
              Welcome back to your
              <span className="block bg-gradient-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent">
                farming dashboard
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-gray-600 lg:mx-0">
              Sign in to access soil insights, crop recommendations, market trends, and pest alerts
              in one place.
            </p>

            <div className="mt-8 grid gap-3 text-sm text-gray-600 sm:grid-cols-3">
              {[
                'Personalized crop advice',
                'Real-time monitoring',
                'Simple farmer-friendly UI',
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/70 bg-white/70 px-4 py-3 shadow-sm backdrop-blur"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center justify-center">
            <Card className="w-full max-w-md rounded-3xl border-white/70 bg-white/85 shadow-2xl shadow-emerald-100 backdrop-blur">
              <CardHeader className="pb-4 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100">
                  <LogIn className="h-6 w-6 text-emerald-700" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900">Sign in</CardTitle>
                <CardDescription className="text-gray-500">
                  Enter your email and password to continue
                </CardDescription>
              </CardHeader>

              <CardContent className="p-6 pt-0 sm:p-8 sm:pt-0">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                      Email
                    </Label>
                    <div className="relative">
                      <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        autoComplete="email"
                        className="h-12 rounded-2xl border-gray-200 bg-white pl-10 shadow-sm outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <Input
                        id="password"
                        type="password"
                        name="password"
                        autoComplete="current-password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="••••••••"
                        className="h-12 rounded-2xl border-gray-200 bg-white pl-10 shadow-sm outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                        required
                      />
                    </div>
                  </div>

                  {error && (
                    <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                      {error}
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={loading}
                    className="h-12 w-full rounded-2xl bg-emerald-700 font-semibold text-white shadow-md transition hover:bg-emerald-800 hover:shadow-lg"
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        Signing in...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <LogIn className="h-4 w-4" />
                        Sign In
                      </div>
                    )}
                  </Button>

                  <p className="pt-2 text-center text-sm text-gray-500">
                    Don&apos;t have an account?{' '}
                    <Link to="/signup" className="font-medium text-emerald-700 hover:underline">
                      Sign up
                    </Link>
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
