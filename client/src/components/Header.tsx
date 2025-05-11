import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useShowHF } from '@/hooks/use-showHF';

const BlogHeader: React.FC = () => {
  const showHeader = useShowHF();
  if (!showHeader) return null;

  return (
    <header className="bg-cosmic-void-black/70 backdrop-blur-md sticky top-0 z-50 py-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="h-8 w-8 rounded-full bg-nebula-gradient flex items-center justify-center">
            <span className="text-xl font-bold"></span>
          </span>
          <h1 className="text-2xl font-serif font-bold text-white">
            <span className="text-cosmic-stellar-cyan">Orbital View</span>
          </h1>
        </div>

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
            to="/articles"
            className="text-white/80 hover:text-white transition-colors"
          >
            Articles
          </Link>
          <Link
            to="#"
            className="text-white/80 hover:text-white transition-colors"
          >
            About
          </Link>
          <Link
            to="#"
            className="text-white/80 hover:text-white transition-colors"
          >
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-4">
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
        </div>
      </div>
    </header>
  );
};

export default BlogHeader;
