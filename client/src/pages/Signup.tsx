import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
import { Mail, Lock, User } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    if (password !== confirmPassword) {
      toast({
        title: 'Passwords do not match',
        variant: 'destructive',
      });
      setIsLoading(false);
      return;
    }
    const success = await register(username, email, password, confirmPassword);
    setIsLoading(false);
    if (success) {
      toast({
        title: 'Account created',
        description: 'Welcome to CosmicInsights!',
      });
      navigate('/');
    } else {
      toast({
        title: 'Signup failed',
        description: 'Please check your details and try again.',
        variant: 'destructive',
      });
    }
  };

  // Background star elements
  const stars = useMemo(
    () =>
      Array.from({ length: 50 }, (_, i) => {
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
      }),
    []
  );

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated stars background */}
      <div className="fixed inset-0 z-0">{stars}</div>

      <div className="container mx-auto px-4 pt-20 pb-12 relative z-10">
        <div className="max-w-md mx-auto">
          <Card className="glass-card backdrop-blur-lg bg-cosmic-void-black/30 border-cosmic-stellar-cyan/20">
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-3xl font-serif bg-nebula-gradient bg-clip-text text-transparent">
                Begin Your Journey
              </CardTitle>
              <p className="text-white/70">
                Create an account to explore the cosmos with us
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white">
                    Username
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-cosmic-stellar-cyan/70 h-4 w-4" />
                    <Input
                      id="name"
                      placeholder="JaneDoe"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="pl-10 bg-cosmic-space-blue/30 border-cosmic-stellar-cyan/30 focus:border-cosmic-stellar-cyan text-white placeholder:text-white/50"
                      required
                    />
                  </div>
                </div>
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
                  <Label htmlFor="password" className="text-white">
                    Password
                  </Label>
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
                  <p className="text-xs text-white/60 mt-1">
                    Password must be at least 8 characters
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-white">
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-cosmic-stellar-cyan/70 h-4 w-4" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="pl-10 bg-cosmic-space-blue/30 border-cosmic-stellar-cyan/30 focus:border-cosmic-stellar-cyan text-white placeholder:text-white/50"
                      required
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    className="border-cosmic-stellar-cyan/70 data-[state=checked]:bg-cosmic-stellar-cyan data-[state=checked]:border-cosmic-stellar-cyan"
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none text-white/80"
                  >
                    I agree to the{' '}
                    <Link
                      to="#"
                      className="text-cosmic-stellar-cyan hover:text-cosmic-stellar-cyan/80 transition"
                    >
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link
                      to="#"
                      className="text-cosmic-stellar-cyan hover:text-cosmic-stellar-cyan/80 transition"
                    >
                      Privacy Policy
                    </Link>
                  </label>
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
                      Creating account
                    </span>
                  ) : (
                    <span>Create Account</span>
                  )}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex justify-center">
              <p className="text-white/70 text-sm">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="text-cosmic-stellar-cyan hover:text-cosmic-stellar-cyan/80 transition font-medium"
                >
                  Log in
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Signup;
