import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import md5 from 'blueimp-md5';

const getGravatarUrl = (email: string, size = 80) => {
  const hash = email ? md5(email.trim().toLowerCase()) : '';
  return `https://www.gravatar.com/avatar/${hash}?s=${size}&d=404`;
};

const getInitials = (name: string | undefined) => {
  if (!name) return '?';
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
};

const Profile: React.FC = () => {
  const { user, logout } = useAuth();
  const [avatarError, setAvatarError] = useState(false);
  const [username, setUsername] = useState(user?.username || '');
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !email.trim()) {
      toast({
        title: 'Username and email are required',
        variant: 'destructive',
      });
      return;
    }
    if (password && password !== confirmPassword) {
      toast({ title: 'Passwords do not match', variant: 'destructive' });
      return;
    }
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: 'Profile updated',
        description: 'Your changes have been saved.',
      });
    }, 1200);
  };

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  const avatarUrl = email ? getGravatarUrl(email) : '';
  const initials = getInitials(username);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-cosmic-void-black/90 px-2">
      <form
        onSubmit={handleSave}
        className="bg-cosmic-space-blue/40 rounded-lg shadow-lg p-8 w-full max-w-md mt-12"
        aria-label="Profile form"
      >
        <div className="flex flex-col items-center mb-6">
          <span className="relative w-20 h-20 flex items-center justify-center mb-2">
            {!avatarError && avatarUrl ? (
              <img
                src={avatarUrl}
                alt="User avatar"
                className="rounded-full w-20 h-20 border-4 border-cosmic-stellar-cyan object-cover bg-cosmic-space-blue"
                onError={() => setAvatarError(true)}
                aria-label="User avatar"
              />
            ) : (
              <span
                className="rounded-full w-20 h-20 flex items-center justify-center bg-cosmic-stellar-cyan text-cosmic-void-black font-bold text-3xl border-4 border-cosmic-stellar-cyan"
                aria-label="User initials"
              >
                {initials}
              </span>
            )}
          </span>
          <h2 className="text-3xl font-bold text-cosmic-stellar-cyan text-center">
            Profile
          </h2>
        </div>
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-white/80 font-semibold mb-1"
          >
            Username
          </label>
          <Input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="bg-cosmic-space-blue/30 border-cosmic-stellar-cyan/30 focus:border-cosmic-stellar-cyan text-white"
            required
            aria-label="Username"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-white/80 font-semibold mb-1"
          >
            Email
          </label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-cosmic-space-blue/30 border-cosmic-stellar-cyan/30 focus:border-cosmic-stellar-cyan text-white"
            required
            aria-label="Email"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-white/80 font-semibold mb-1"
          >
            New Password
          </label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-cosmic-space-blue/30 border-cosmic-stellar-cyan/30 focus:border-cosmic-stellar-cyan text-white"
            aria-label="New password"
            minLength={8}
            placeholder="Leave blank to keep current password"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="confirmPassword"
            className="block text-white/80 font-semibold mb-1"
          >
            Confirm New Password
          </label>
          <Input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="bg-cosmic-space-blue/30 border-cosmic-stellar-cyan/30 focus:border-cosmic-stellar-cyan text-white"
            aria-label="Confirm new password"
            minLength={8}
            placeholder="Repeat new password"
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-nebula-gradient hover:opacity-90 transition-opacity mb-3"
          disabled={isLoading}
          aria-label="Save profile changes"
        >
          {isLoading ? 'Saving...' : 'Save Changes'}
        </Button>
        <Button
          type="button"
          onClick={handleLogout}
          className="w-full bg-cosmic-nebula-purple/80 text-white"
          aria-label="Logout"
        >
          Logout
        </Button>
      </form>
    </div>
  );
};

export default Profile;
