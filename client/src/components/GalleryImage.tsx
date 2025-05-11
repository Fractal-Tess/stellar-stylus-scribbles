import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { toast } from '@/components/ui/sonner';
import { Download } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { triggerDownload } from '@/lib/unsplash';
import type { UnsplashImage } from '@/lib/unsplash';

interface GalleryImageProps {
  image: UnsplashImage;
}

const GalleryImage: React.FC<GalleryImageProps> = ({ image }) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    try {
      setIsDownloading(true);

      // Get the download URL through the Unsplash API to properly attribute the download
      const downloadUrl = await triggerDownload(image.links.download_location);

      // Create an anchor element and trigger the download
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
    <Card className="overflow-hidden group transition-all duration-300 hover:shadow-xl glass-card">
      <CardContent className="p-2">
        <AspectRatio ratio={4 / 3} className="overflow-hidden rounded-md">
          <img
            src={image.urls.regular}
            alt={image.alt_description || 'Unsplash image'}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
          />
        </AspectRatio>
      </CardContent>
      <CardFooter className="flex justify-between items-center p-3 bg-gradient-to-t from-black/50 to-transparent text-white">
        <div className="text-sm">
          by <span className="font-mono">{image.user.name}</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full bg-white/20 hover:bg-white/40"
          onClick={handleDownload}
          disabled={isDownloading}
        >
          <Download className="h-5 w-5" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default GalleryImage;
