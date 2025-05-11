import React, { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { getApod } from '@/lib/apod';

interface ApodData {
  date: string;
  explanation: string;
  media_type: string;
  title: string;
  url: string;
  hdurl?: string;
  copyright?: string;
}

const NasaApod: React.FC = () => {
  const [apodData, setApodData] = useState<ApodData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApodData = async () => {
      try {
        setIsLoading(true);
        const data = await getApod();
        setApodData(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching NASA APOD data:', err);
        setError(
          "Failed to fetch today's astronomy picture. Please try again later."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchApodData();
  }, []);

  if (isLoading) {
    return (
      <div className="glass-card rounded-lg overflow-hidden p-8 flex items-center justify-center h-96">
        <div className="text-cosmic-stellar-cyan text-xl">
          Loading today's astronomy picture...
        </div>
      </div>
    );
  }

  if (error || !apodData) {
    return (
      <div className="glass-card rounded-lg overflow-hidden p-8">
        <p className="text-red-400">
          {error || 'Failed to load NASA APOD data'}
        </p>
      </div>
    );
  }

  return (
    <Card className="glass-card rounded-lg overflow-hidden">
      <div className="relative">
        {apodData.media_type === 'image' ? (
          <img
            src={apodData.url}
            alt={apodData.title}
            className="w-full h-[400px] object-cover"
          />
        ) : (
          <div className="w-full h-[400px] flex items-center justify-center bg-cosmic-void-black">
            <iframe
              src={apodData.url}
              title={apodData.title}
              className="w-full h-full"
              allowFullScreen
            />
          </div>
        )}
        <div className="absolute top-4 right-4">
          <div className="flex items-center gap-2 bg-cosmic-nebula-purple/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
            <Calendar className="w-4 h-4" />
            <span>{apodData.date}</span>
          </div>
        </div>
      </div>

      <CardContent className="p-6">
        <h3 className="text-2xl font-serif font-bold text-cosmic-stellar-cyan mb-3">
          {apodData.title}
        </h3>

        <p className="text-white/80 mb-2 max-h-60 overflow-y-auto">
          {apodData.explanation}
        </p>

        {apodData.copyright && (
          <p className="text-white/60 text-sm mt-4">© {apodData.copyright}</p>
        )}
      </CardContent>
    </Card>
  );
};

export default NasaApod;
