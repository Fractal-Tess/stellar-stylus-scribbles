
import React from 'react';
import BlogHeader from '@/components/BlogHeader';
import NasaApod from '@/components/NasaApod';
import BlogFooter from '@/components/BlogFooter';

const ApodPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <BlogHeader />
      
      <main className="container mx-auto px-4 py-16 flex-grow">
        <div className="mb-12">
          <h2 className="text-3xl font-serif font-bold text-white mb-4">NASA <span className="text-cosmic-stellar-cyan">Astronomy Picture of the Day</span></h2>
          <p className="text-white/80 max-w-3xl">
            Each day, NASA features a different image or photograph of our fascinating universe, along with a brief explanation written by a professional astronomer.
          </p>
        </div>
        
        <NasaApod />

        <div className="mt-16">
          <div className="glass-card rounded-lg p-8 relative overflow-hidden">
            <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-cosmic-nebula-purple/30 blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-cosmic-galaxy-pink/20 blur-3xl"></div>
            
            <div className="relative z-10">
              <h2 className="text-2xl font-serif font-bold text-white mb-4">Discover the Wonders of <span className="text-cosmic-stellar-cyan">Space</span></h2>
              <p className="text-white/80 mb-4">
                The NASA Astronomy Picture of the Day (APOD) is one of the most popular websites at NASA. Each day a different image or photograph of our universe is featured, along with a brief explanation written by a professional astronomer.
              </p>
              <p className="text-white/80">
                Return daily to enjoy a new cosmic discovery!
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <BlogFooter />
    </div>
  );
};

export default ApodPage;
