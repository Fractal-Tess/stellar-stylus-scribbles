interface UnsplashImage {
  id: string;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
  alt_description: string | null;
  description: string | null;
  user: {
    name: string;
    username: string;
  };
  links: {
    download: string;
    download_location: string;
  };
}

interface UnsplashSearchResponse {
  total: number;
  total_pages: number;
  results: UnsplashImage[];
}

const UNSPLASH_ACCESS_KEY = 'tfmxJKBgsdJxsae-tu74QBzUGbeGTFuSe_OOO_DzBQY';

export async function fetchRandomImages(
  count: number = 12
): Promise<UnsplashImage[]> {
  const response = await fetch(
    `https://api.unsplash.com/photos/random?count=${count}`,
    {
      headers: {
        Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch images from Unsplash');
  }

  return response.json();
}

export async function searchImages(
  query: string,
  page: number = 1
): Promise<UnsplashSearchResponse> {
  const response = await fetch(
    `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
      query
    )}&page=${page}&per_page=12`,
    {
      headers: {
        Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to search images from Unsplash');
  }

  return response.json();
}

export async function triggerDownload(
  downloadLocation: string
): Promise<string> {
  // This function is needed to properly track downloads with Unsplash API
  const response = await fetch(downloadLocation, {
    headers: {
      Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to get download link');
  }

  const data = await response.json();
  return data.url;
}

export type { UnsplashImage, UnsplashSearchResponse };
