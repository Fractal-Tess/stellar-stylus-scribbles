import React, { useRef, useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/sonner';
import { GalleryThumbnailsIcon as GalleryIcon, Images } from 'lucide-react';
import GalleryImage from '@/components/GalleryImage';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { searchImages } from '@/lib/unsplash';

const STATIC_FILTER = 'cosmos';
const PAGE_SIZE = 18;

const Gallery: React.FC = () => {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // Infinite query for 'cosmos' images
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ['unsplash', 'search', STATIC_FILTER],
    queryFn: ({ pageParam = 1 }) => searchImages(STATIC_FILTER, pageParam),
    getNextPageParam: (lastPage, allPages) => {
      // If API returns total_pages, use it; else, just increment
      if (lastPage?.total_pages && allPages.length < lastPage.total_pages) {
        return allPages.length + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });

  // Flatten images from all pages
  const images = data?.pages.flatMap((page) => page.results) || [];

  // Infinite scroll observer
  useEffect(() => {
    if (!hasNextPage || isLoading) return;
    const observer = new window.IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );
    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }
    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [hasNextPage, fetchNextPage, isLoading]);

  useEffect(() => {
    if (isError) {
      toast.error('Failed to fetch images. Please try again later.');
    }
  }, [isError]);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <GalleryIcon className="h-7 w-7 text-cosmic-stellar-cyan" />
          <h1 className="text-3xl font-serif font-bold text-white">
            Image <span className="text-cosmic-stellar-cyan">Gallery</span>
          </h1>
        </div>
        {/* Gallery content */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-pulse flex space-x-4">
              <div className="h-12 w-12 rounded-full bg-white/10"></div>
            </div>
            <p className="mt-4 text-white/70">Loading images...</p>
          </div>
        ) : images.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Images className="h-16 w-16 text-white/30" />
            <p className="mt-4 text-white/70">No images found for cosmos</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {images.map((image) => (
                <GalleryImage key={image.id} image={image} />
              ))}
            </div>
            <div
              ref={loadMoreRef}
              className="h-12 flex items-center justify-center"
            >
              {isFetchingNextPage && (
                <span className="text-white/70">Loading more...</span>
              )}
              {!hasNextPage && images.length > 0 && (
                <span className="text-white/50">No more images</span>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Gallery;
