import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface Article {
  title: string;
  description: string;
  content?: string;
  url: string;
  urlToImage?: string;
  publishedAt: string;
  source: { name: string };
}

const ArticleDetail: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const article = location.state as Article | undefined;

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-cosmic-void-black text-white">
        <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
        <p className="mb-6">Sorry, we couldn't find the article details.</p>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 rounded bg-cosmic-stellar-cyan text-white hover:bg-cosmic-stellar-cyan/80 focus:outline-none focus:ring-2 focus:ring-cosmic-stellar-cyan"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cosmic-void-black text-white py-10 px-4">
      <div className="container mx-auto max-w-3xl">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 px-4 py-2 rounded bg-cosmic-stellar-cyan text-white hover:bg-cosmic-stellar-cyan/80 focus:outline-none focus:ring-2 focus:ring-cosmic-stellar-cyan"
        >
          ← Back to Articles
        </button>
        <article className="bg-cosmic-space-blue/30 rounded-lg shadow-lg overflow-hidden border border-cosmic-stellar-cyan/20">
          {article.urlToImage && (
            <img
              src={article.urlToImage}
              alt={article.title}
              className="w-full h-64 object-cover"
              loading="lazy"
            />
          )}
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-2">{article.title}</h1>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-cosmic-stellar-cyan font-medium text-sm">
                {article.source.name}
              </span>
              <span className="text-white/40 text-xs">
                {new Date(article.publishedAt).toLocaleString()}
              </span>
            </div>
            <p className="text-white/80 mb-4 text-lg">{article.description}</p>
            {article.content && (
              <p className="text-white/70 mb-4 whitespace-pre-line">
                {article.content}
              </p>
            )}
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 text-cosmic-stellar-cyan underline hover:text-cosmic-stellar-cyan/80 focus:outline-none focus:ring-2 focus:ring-cosmic-stellar-cyan"
              aria-label={`Read full article: ${article.title}`}
            >
              Read Full Article ↗
            </a>
          </div>
        </article>
      </div>
    </div>
  );
};

export default ArticleDetail;
