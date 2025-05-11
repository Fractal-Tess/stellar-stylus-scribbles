
import React from 'react';
import { Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BlogCardProps {
  title: string;
  excerpt: string;
  author: string;
  date: string;
  image: string;
  category: string;
  featured?: boolean;
}

const BlogCard: React.FC<BlogCardProps> = ({ 
  title, 
  excerpt, 
  author, 
  date, 
  image, 
  category,
  featured = false 
}) => {
  return (
    <div className={cn(
      "group glass-card rounded-lg overflow-hidden transition-transform duration-300 hover:-translate-y-1",
      featured ? "md:col-span-2 md:row-span-2" : ""
    )}>
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-cosmic-nebula-purple/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
            {category}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className={cn(
          "font-serif font-bold text-cosmic-stellar-cyan mb-2",
          featured ? "text-2xl md:text-3xl" : "text-xl"
        )}>
          {title}
        </h3>
        
        <p className="text-white/80 mb-4">
          {excerpt}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-white/60 text-sm">{author}</span>
          <div className="flex items-center text-white/60 text-sm">
            <Calendar className="w-4 h-4 mr-1" />
            {date}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
