
import React from 'react';
import { Button } from "@/components/ui/button";

const BlogHero: React.FC = () => {
  return (
    <section className="relative w-full h-[70vh] overflow-hidden">
      {/* Dynamic stars background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Generate 50 random stars with different sizes and positions */}
        {Array.from({ length: 50 }).map((_, i) => (
          <div 
            key={i}
            className="star"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>
      
      {/* Main background with gradient */}
      <div className="absolute inset-0 bg-cosmic-gradient opacity-90"></div>
      
      {/* Hero content */}
      <div className="relative container mx-auto h-full flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-4 leading-tight animate-fade-in">
          Exploring the <span className="text-cosmic-stellar-cyan">Cosmos</span>
        </h1>
        <p className="text-xl md:text-2xl text-white/80 max-w-3xl mb-8 animate-fade-in" style={{animationDelay: "0.2s"}}>
          Discover the latest breakthroughs and theories in cosmology from leading scientists and researchers around the world.
        </p>
        <Button className="bg-nebula-gradient hover:bg-cosmic-nebula-purple/80 text-white px-8 py-6 text-lg animate-fade-in" style={{animationDelay: "0.4s"}}>
          Explore Articles
        </Button>
      </div>
      
      {/* Bottom gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cosmic-deep-blue to-transparent"></div>
    </section>
  );
};

export default BlogHero;
