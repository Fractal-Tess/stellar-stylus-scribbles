import React, { useRef, useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { toast } from '@/components/ui/sonner';
import { GalleryThumbnailsIcon as GalleryIcon, Images } from 'lucide-react';
import GalleryImage from '@/components/GalleryImage';
import { searchImages } from '@/lib/api';
import { UnsplashImage, SearchImagesResponse } from '@/lib/types';

const STATIC_FILTER = 'cosmos';
const PAGE_SIZE = 18;

const Gallery: React.FC = () => {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery<SearchImagesResponse>({
    queryKey: ['unsplash', 'search', STATIC_FILTER],
    queryFn: ({ pageParam }) =>
      searchImages(STATIC_FILTER, (pageParam as number) ?? 1, PAGE_SIZE),
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
  const images: UnsplashImage[] =
    data?.pages.flatMap((page) => page.results) || [];

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
        <div className="flex items-center gap-2 mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            className="h-5 w-5"
            aria-label="Unsplash logo"
          >
            <rect width="32" height="32" rx="4" fill="#000" />
            <rect x="7" y="14" width="18" height="7" fill="#fff" />
            <rect x="12" y="7" width="8" height="8" fill="#fff" />
          </svg>
          <span className="text-xs text-white/70">
            Photos powered by{' '}
            <a
              href="https://unsplash.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-cosmic-stellar-cyan focus:outline-none focus:ring-2 focus:ring-cosmic-stellar-cyan"
            >
              Unsplash
            </a>
          </span>
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
            <div className="columns-1 sm:columns-2 md:columns-3 gap-6">
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
