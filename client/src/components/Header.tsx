import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { useShowHF } from '@/hooks/use-showHF';
import { useAuth } from '@/contexts/AuthContext';
import { getGravatarUrl as fetchGravatarUrl, getGravatarUrl } from '@/lib/api';

const BlogHeader: React.FC = () => {
  const showHeader = useShowHF();
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  if (!showHeader) return null;

  console.log(user?.gravatarUrl);

  return (
    <header className="bg-cosmic-void-black/70 backdrop-blur-md sticky top-0 z-50 py-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link className="flex items-center gap-2" to="/">
          <img
            src="/logo.png"
            alt="Orbital View"
            className="w-10 h-10 invert"
          />
          <h1 className="text-2xl font-serif font-bold text-white">
            <span className="text-cosmic-stellar-cyan">Orbital View</span>
          </h1>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link
            to="/"
            className="text-white/80 hover:text-white transition-colors"
          >
            Home
          </Link>
          <Link
            to="/apod"
            className="text-white/80 hover:text-white transition-colors"
          >
            APOD
          </Link>
          <Link
            to="/gallery"
            className="text-white/80 hover:text-white transition-colors"
          >
            Gallery
          </Link>
          <Link
            to="/spaceflight-news"
            className="text-white/80 hover:text-white transition-colors"
          >
            Spaceflight News
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <span className="text-white/90 font-medium group-hover:underline">
                {user?.username || 'Profile'}
              </span>
              <Link to="/profile" className="flex items-center gap-2 group">
                <span className="relative w-9 h-9 flex items-center justify-center">
                  <img
                    src={user?.gravatarUrl}
                    alt="User avatar"
                    className="rounded-full w-9 h-9 border-2 border-cosmic-stellar-cyan object-cover bg-cosmic-space-blue"
                    aria-label="User avatar"
                  />
                </span>
              </Link>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" className="text-white/80 ">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-nebula-gradient hover:bg-cosmic-nebula-purple/80 text-white">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default BlogHeader;
