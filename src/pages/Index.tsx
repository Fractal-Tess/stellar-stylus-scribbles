
import React from 'react';
import { Link } from 'react-router-dom';
import BlogHeader from '@/components/BlogHeader';
import BlogHero from '@/components/BlogHero';
import BlogCard from '@/components/BlogCard';
import BlogFooter from '@/components/BlogFooter';
import NasaApod from '@/components/NasaApod';

const Index = () => {
  // Sample blog data
  const blogPosts = [
    {
      id: 1,
      title: "New Evidence Strengthens Case for Dark Matter Ring in Andromeda Galaxy",
      excerpt: "Astronomers have discovered compelling new evidence supporting the existence of a vast ring of dark matter encircling the Andromeda Galaxy.",
      author: "Dr. Elena Rodriguez",
      date: "May 9, 2025",
      image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=1400&auto=format&fit=crop",
      category: "Dark Matter",
      featured: true
    },
    {
      id: 2,
      title: "James Webb Telescope Reveals Unexpected Structures in Distant Galaxy Formation",
      excerpt: "Revolutionary observations from the James Webb Space Telescope challenge existing models of early galaxy formation.",
      author: "Dr. Michael Chen",
      date: "May 7, 2025",
      image: "https://images.unsplash.com/photo-1484589065579-248aad0d8b13?q=80&w=1400&auto=format&fit=crop",
      category: "Galaxy Formation"
    },
    {
      id: 3,
      title: "Quantum Entanglement May Explain Black Hole Information Paradox",
      excerpt: "Groundbreaking theoretical work suggests quantum entanglement could resolve one of physics' most perplexing conundrums.",
      author: "Prof. Sarah Johnson",
      date: "May 5, 2025",
      image: "https://images.unsplash.com/photo-1543722530-d2c3201371e7?q=80&w=1400&auto=format&fit=crop",
      category: "Black Holes"
    },
    {
      id: 4,
      title: "Europa's Subsurface Ocean Shows Signs of Complex Organic Chemistry",
      excerpt: "Analysis of plume samples from Jupiter's moon Europa reveals organic compounds that could support life.",
      author: "Dr. James Morrison",
      date: "May 3, 2025",
      image: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?q=80&w=1400&auto=format&fit=crop",
      category: "Astrobiology"
    },
    {
      id: 5,
      title: "String Theory Gets Experimental Support from Particle Collider Data",
      excerpt: "Novel analysis of particle collision data provides first empirical evidence potentially supporting string theory predictions.",
      author: "Dr. Akira Tanaka",
      date: "May 1, 2025",
      image: "https://images.unsplash.com/photo-1454789548928-9efd52dc4031?q=80&w=1400&auto=format&fit=crop",
      category: "Theoretical Physics"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <BlogHeader />
      <BlogHero />
      
      <main className="container mx-auto px-4 py-16 flex-grow">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-serif font-bold text-white">Latest <span className="text-cosmic-stellar-cyan">Discoveries</span></h2>
          <div className="flex space-x-2">
            <button className="px-4 py-2 rounded-full bg-cosmic-nebula-purple/20 text-white hover:bg-cosmic-nebula-purple/40 transition-colors">All</button>
            <button className="px-4 py-2 rounded-full hover:bg-cosmic-nebula-purple/20 text-white/70 hover:text-white transition-colors">Black Holes</button>
            <button className="px-4 py-2 rounded-full hover:bg-cosmic-nebula-purple/20 text-white/70 hover:text-white transition-colors">Dark Matter</button>
            <button className="px-4 py-2 rounded-full hover:bg-cosmic-nebula-purple/20 text-white/70 hover:text-white transition-colors">Exoplanets</button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <BlogCard
              key={post.id}
              title={post.title}
              excerpt={post.excerpt}
              author={post.author}
              date={post.date}
              image={post.image}
              category={post.category}
              featured={post.featured}
            />
          ))}
        </div>
        
        <div className="mt-16 mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-serif font-bold text-white">NASA <span className="text-cosmic-stellar-cyan">Picture of the Day</span></h2>
            <Link to="/apod" className="text-cosmic-stellar-cyan hover:underline">View Details →</Link>
          </div>
          <NasaApod />
        </div>
        
        <div className="mt-16">
          <h2 className="text-3xl font-serif font-bold text-white mb-8">Popular <span className="text-cosmic-stellar-cyan">Topics</span></h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Black Holes", count: 24, image: "https://images.unsplash.com/photo-1534841090574-cba2d662b62e?q=80&w=600&auto=format&fit=crop" },
              { name: "Dark Matter", count: 18, image: "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?q=80&w=600&auto=format&fit=crop" },
              { name: "Exoplanets", count: 31, image: "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?q=80&w=600&auto=format&fit=crop" },
              { name: "Quantum Gravity", count: 12, image: "https://images.unsplash.com/photo-1465101162946-4377e57745c3?q=80&w=600&auto=format&fit=crop" }
            ].map((topic, index) => (
              <div key={index} className="relative rounded-lg overflow-hidden group">
                <img 
                  src={topic.image} 
                  alt={topic.name} 
                  className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cosmic-void-black to-transparent flex flex-col items-center justify-end p-4">
                  <h3 className="text-lg font-serif font-medium text-white">{topic.name}</h3>
                  <span className="text-sm text-white/70">{topic.count} articles</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-16">
          <div className="glass-card rounded-lg p-8 relative overflow-hidden">
            <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-cosmic-nebula-purple/30 blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-cosmic-galaxy-pink/20 blur-3xl"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="md:w-2/3">
                <h2 className="text-3xl font-serif font-bold text-white mb-4">Stay Updated with <span className="text-cosmic-stellar-cyan">Cosmic Insights</span></h2>
                <p className="text-white/80 mb-4">Join our newsletter to receive the latest discoveries, theories, and breakthroughs in cosmology delivered directly to your inbox.</p>
              </div>
              
              <div className="md:w-1/3 w-full">
                <form className="flex flex-col gap-3">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="bg-white/10 text-white px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-cosmic-stellar-cyan"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="bg-white/10 text-white px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-cosmic-stellar-cyan"
                  />
                  <button
                    type="submit"
                    className="bg-nebula-gradient hover:opacity-90 text-white px-4 py-3 rounded-md font-medium"
                  >
                    Subscribe Now
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <BlogFooter />
    </div>
  );
};

export default Index;
