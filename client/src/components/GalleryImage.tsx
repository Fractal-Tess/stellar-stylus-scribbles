import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/sonner';
import { Download } from 'lucide-react';
import { UnsplashImage } from '@/lib/types';

interface GalleryImageProps {
  image: UnsplashImage;
}

const triggerDownload = async (downloadLocation: string): Promise<string> => {
  // Register the download with Unsplash API, then return the download link
  const res = await fetch(downloadLocation);
  if (!res.ok) throw new Error('Failed to register download');
  const data = await res.json();
  return data.url;
};

const GalleryImage: React.FC<GalleryImageProps> = ({ image }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const aspectRatio = image.width / image.height;

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      const downloadUrl = await triggerDownload(image.links.download_location);

      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', `unsplash-${image.id}.jpg`);
      link.setAttribute('target', '_blank');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success('Download started!');
    } catch (error) {
      toast.error('Failed to download image');
      console.error('Download error:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div
      className="break-inside-avoid mb-6 rounded-md overflow-hidden group bg-black/60"
      style={{ aspectRatio: `${image.width} / ${image.height}` }}
    >
      <img
        src={image.urls.regular}
        alt={image.alt_description || 'Unsplash image'}
        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
        style={{ display: 'block', width: '100%', height: 'auto' }}
      />
      <div className="flex justify-between items-center p-3 bg-gradient-to-t from-black/60 to-transparent text-white text-xs">
        <span>
          by <span className="font-mono">{image.user.name}</span>
        </span>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full bg-white/20 hover:bg-white/40"
          onClick={handleDownload}
          disabled={isDownloading}
          aria-label="Download image"
        >
          <Download className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default GalleryImage;
