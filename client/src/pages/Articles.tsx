import React, { useEffect, useState, useRef } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

interface Article {
  title: string;
  description: string;
  url: string;
  urlToImage?: string;
  publishedAt: string;
  source: { name: string };
}

const PAGE_SIZE = 12;
const DEFAULT_QUERY = 'astronomy';

const Articles: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // Debounce search term
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Infinite query for articles
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['news', debouncedSearchTerm],
    queryFn: async ({ pageParam = 1 }) => {
      const apiKey = import.meta.env.VITE_NEWS_API_KEY;
      const query = debouncedSearchTerm.trim() || DEFAULT_QUERY;
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=${encodeURIComponent(
          query
        )}&sortBy=publishedAt&language=en&pageSize=${PAGE_SIZE}&page=${pageParam}&apiKey=${apiKey}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch news');
      }
      return response.json();
    },
    getNextPageParam: (lastPage, allPages) => {
      if (
        lastPage?.totalResults &&
        allPages.length * PAGE_SIZE < lastPage.totalResults
      ) {
        return allPages.length + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
    retry: 1,
  });

  // Flatten articles from all pages
  const articles = data?.pages.flatMap((page) => page.articles) || [];

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

  // Refetch when search changes
  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm]);

  return (
    <div className="min-h-screen bg-cosmic-void-black text-white py-10 px-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-serif font-bold mb-8 text-center">
          Latest{' '}
          <span className="text-cosmic-stellar-cyan">Astronomy News</span>
        </h1>
        <div className="flex justify-center mb-8">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search articles..."
            className="w-full max-w-md px-4 py-2 rounded bg-cosmic-space-blue/30 border border-cosmic-stellar-cyan/30 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-cosmic-stellar-cyan"
            aria-label="Search articles"
          />
        </div>
        {isLoading && <p className="text-center text-white/70">Loading...</p>}
        {isError && (
          <p className="text-center text-red-400">{(error as Error).message}</p>
        )}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-8">
          {articles.map((article, idx) => (
            <article
              key={idx}
              className="bg-cosmic-space-blue/30 rounded-lg shadow-lg overflow-hidden flex flex-col border border-cosmic-stellar-cyan/20"
            >
              <img
                src={
                  article.urlToImage ||
                  'https://via.placeholder.com/400x200?text=No+Image'
                }
                alt={article.title}
                className="h-48 w-full object-cover"
                loading="lazy"
              />
              <div className="flex-1 flex flex-col p-4">
                <h2 className="text-lg font-bold mb-2 line-clamp-2">
                  {article.title}
                </h2>
                <p className="text-white/70 text-sm mb-4 line-clamp-3">
                  {article.description}
                </p>
                <div className="mt-auto flex items-center justify-between">
                  <span className="text-xs text-cosmic-stellar-cyan font-medium">
                    {article.source.name}
                  </span>
                  <Link
                    to={`/article/${encodeURIComponent(article.url)}`}
                    state={article}
                    className="text-xs text-cosmic-stellar-cyan underline hover:text-cosmic-stellar-cyan/80 focus:outline-none focus:ring-2 focus:ring-cosmic-stellar-cyan"
                    aria-label={`Read more: ${article.title}`}
                  >
                    Read More
                  </Link>
                </div>
                <span className="block mt-2 text-xs text-white/40">
                  {new Date(article.publishedAt).toLocaleDateString()}
                </span>
              </div>
            </article>
          ))}
        </div>
        <div
          ref={loadMoreRef}
          className="h-12 flex items-center justify-center"
        >
          {isFetchingNextPage && (
            <span className="text-white/70">Loading more...</span>
          )}
          {!hasNextPage && articles.length > 0 && (
            <span className="text-white/50">No more articles</span>
          )}
        </div>
        {!isLoading && articles.length === 0 && !isError && (
          <p className="text-center text-white/70 mt-8">No articles found.</p>
        )}
      </div>
    </div>
  );
};

export default Articles;
