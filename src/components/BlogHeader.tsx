
import React from 'react';
import { Button } from "@/components/ui/button";
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const BlogHeader: React.FC = () => {
  return (
    <header className="bg-cosmic-void-black/70 backdrop-blur-md sticky top-0 z-50 py-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="h-8 w-8 rounded-full bg-nebula-gradient flex items-center justify-center">
            <span className="text-xl font-bold">C</span>
          </span>
          <h1 className="text-2xl font-serif font-bold text-white">Cosmic<span className="text-cosmic-stellar-cyan">Insights</span></h1>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-white/80 hover:text-white transition-colors">Home</Link>
          <Link to="/apod" className="text-white/80 hover:text-white transition-colors">APOD</Link>
          <Link to="#" className="text-white/80 hover:text-white transition-colors">Articles</Link>
          <Link to="#" className="text-white/80 hover:text-white transition-colors">About</Link>
          <Link to="#" className="text-white/80 hover:text-white transition-colors">Contact</Link>
        </nav>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="text-white/80 hover:text-white">
            <Search className="h-5 w-5" />
          </Button>
          <Button className="bg-nebula-gradient hover:bg-cosmic-nebula-purple/80 text-white">
            Subscribe
          </Button>
        </div>
      </div>
    </header>
  );
};

export default BlogHeader;
