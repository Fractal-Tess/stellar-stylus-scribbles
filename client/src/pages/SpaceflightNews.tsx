import React, { useEffect, useState, useRef } from 'react';
import { getSpaceflightNews } from '@/lib/api';
import { SpaceflightNewsArticle } from '@/lib/types';

const PAGE_SIZE = 10;

const SpaceflightNews: React.FC = () => {
  const [news, setNews] = useState<SpaceflightNewsArticle[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // Initial fetch and fetch on page change
  useEffect(() => {
    if (page === 1) {
      setLoading(true);
    } else {
      setLoadingMore(true);
    }
    getSpaceflightNews(page, PAGE_SIZE)
      .then((data) => {
        setNews((prev) =>
          page === 1 ? data.results : [...prev, ...data.results]
        );
        setHasMore(Boolean(data.next));
        setLoading(false);
        setLoadingMore(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
        setLoadingMore(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  // Infinite scroll observer
  useEffect(() => {
    if (!hasMore || loadingMore || loading) return;
    const observer = new window.IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
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
  }, [hasMore, loadingMore, loading]);

  if (loading && page === 1)
    return <div className="text-center text-white/70 mt-8">Loading...</div>;
  if (error)
    return <div className="text-center text-red-400 mt-8">{error}</div>;

  return (
    <div className="min-h-screen bg-cosmic-void-black text-white py-10 px-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-serif font-bold mb-8 text-center">
          Spaceflight <span className="text-cosmic-stellar-cyan">News</span>
        </h1>
        <ul className="space-y-8">
          {news.map((item) => (
            <li
              key={item.id}
              className="bg-cosmic-space-blue/30 rounded-lg shadow-lg p-6 border border-cosmic-stellar-cyan/20"
            >
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-xl font-bold text-cosmic-stellar-cyan hover:underline focus:outline-none focus:ring-2 focus:ring-cosmic-stellar-cyan"
                aria-label={`Read full article: ${item.title}`}
                tabIndex={0}
              >
                {item.title}
              </a>
              <p className="text-white/80 mt-2 mb-2 line-clamp-3">
                {item.summary}
              </p>
              <div className="flex items-center justify-between text-xs text-white/50">
                <span>{new Date(item.published_at).toLocaleDateString()}</span>
                <span>{item.news_site}</span>
              </div>
            </li>
          ))}
        </ul>
        <div
          ref={loadMoreRef}
          className="h-12 flex items-center justify-center"
        >
          {loadingMore && (
            <span className="text-white/70">Loading more...</span>
          )}
          {!hasMore && news.length > 0 && (
            <span className="text-white/50">No more news</span>
          )}
        </div>
        {!loading && news.length === 0 && !error && (
          <p className="text-center text-white/70 mt-8">No news found.</p>
        )}
      </div>
    </div>
  );
};

export default SpaceflightNews;
