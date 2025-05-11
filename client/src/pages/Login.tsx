import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Mail, Lock, LogIn } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login (would connect to auth provider in production)
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: 'Login successful',
        description: 'Welcome back to CosmicInsights!',
      });
    }, 1500);
  };

  // Background star elements
  const stars = Array.from({ length: 50 }, (_, i) => {
    const size = Math.random() * 3 + 1;
    const top = Math.random() * 100;
    const left = Math.random() * 100;
    const animationDelay = Math.random() * 5;

    return (
      <div
        key={i}
        className="star"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          top: `${top}%`,
          left: `${left}%`,
          animationDelay: `${animationDelay}s`,
        }}
      />
    );
  });

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated stars background */}
      <div className="fixed inset-0 z-0">{stars}</div>

      <div className="container mx-auto px-4 pt-20 pb-12 relative z-10">
        <div className="max-w-md mx-auto">
          <Card className="glass-card backdrop-blur-lg bg-cosmic-void-black/30 border-cosmic-stellar-cyan/20">
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-3xl font-serif bg-nebula-gradient bg-clip-text text-transparent">
                Welcome Back
              </CardTitle>
              <p className="text-white/70">
                Login to your account to continue your cosmic journey
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-cosmic-stellar-cyan/70 h-4 w-4" />
                    <Input
                      id="email"
                      placeholder="you@example.com"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 bg-cosmic-space-blue/30 border-cosmic-stellar-cyan/30 focus:border-cosmic-stellar-cyan text-white placeholder:text-white/50"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="password" className="text-white">
                      Password
                    </Label>
                    <Link
                      to="#"
                      className="text-sm text-cosmic-stellar-cyan hover:text-cosmic-stellar-cyan/80 transition"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-cosmic-stellar-cyan/70 h-4 w-4" />
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 bg-cosmic-space-blue/30 border-cosmic-stellar-cyan/30 focus:border-cosmic-stellar-cyan text-white placeholder:text-white/50"
                      required
                    />
                  </div>
                </div>
                <Button
                  disabled={isLoading}
                  type="submit"
                  className="w-full bg-nebula-gradient hover:opacity-90 transition-opacity"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Logging in
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <LogIn className="mr-2 h-4 w-4" />
                      Login
                    </span>
                  )}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex justify-center">
              <p className="text-white/70 text-sm">
                Don't have an account?{' '}
                <Link
                  to="/signup"
                  className="text-cosmic-stellar-cyan hover:text-cosmic-stellar-cyan/80 transition font-medium"
                >
                  Sign up
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;
