
import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const BlogFooter: React.FC = () => {
  return (
    <footer className="bg-cosmic-void-black py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="h-8 w-8 rounded-full bg-nebula-gradient flex items-center justify-center">
                <span className="text-xl font-bold">C</span>
              </span>
              <h2 className="text-2xl font-serif font-bold text-white">Cosmic<span className="text-cosmic-stellar-cyan">Insights</span></h2>
            </div>
            <p className="text-white/70 mb-4">
              Exploring the mysteries of the universe through cutting-edge cosmology research and discoveries.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white/60 hover:text-cosmic-stellar-cyan transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-white/60 hover:text-cosmic-stellar-cyan transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-white/60 hover:text-cosmic-stellar-cyan transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-white/60 hover:text-cosmic-stellar-cyan transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-serif font-bold text-white mb-4">Categories</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/70 hover:text-cosmic-stellar-cyan transition-colors">Black Holes</a></li>
              <li><a href="#" className="text-white/70 hover:text-cosmic-stellar-cyan transition-colors">Dark Matter</a></li>
              <li><a href="#" className="text-white/70 hover:text-cosmic-stellar-cyan transition-colors">Exoplanets</a></li>
              <li><a href="#" className="text-white/70 hover:text-cosmic-stellar-cyan transition-colors">Galaxy Formation</a></li>
              <li><a href="#" className="text-white/70 hover:text-cosmic-stellar-cyan transition-colors">Quantum Cosmology</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-serif font-bold text-white mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/70 hover:text-cosmic-stellar-cyan transition-colors">Research Papers</a></li>
              <li><a href="#" className="text-white/70 hover:text-cosmic-stellar-cyan transition-colors">Astronomy Data</a></li>
              <li><a href="#" className="text-white/70 hover:text-cosmic-stellar-cyan transition-colors">Educational Content</a></li>
              <li><a href="#" className="text-white/70 hover:text-cosmic-stellar-cyan transition-colors">Cosmic Events</a></li>
              <li><a href="#" className="text-white/70 hover:text-cosmic-stellar-cyan transition-colors">Space Missions</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-serif font-bold text-white mb-4">Newsletter</h3>
            <p className="text-white/70 mb-4">Stay updated with the latest cosmic discoveries.</p>
            <form>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="bg-white/10 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cosmic-stellar-cyan w-full" 
                />
                <button 
                  type="submit" 
                  className="bg-nebula-gradient hover:opacity-90 text-white px-4 py-2 rounded-md"
                >
                  Join
                </button>
              </div>
            </form>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-12 pt-6 text-center text-white/60">
          <p>&copy; {new Date().getFullYear()} CosmicInsights. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default BlogFooter;
