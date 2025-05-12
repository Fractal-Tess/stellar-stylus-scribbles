// Unsplash API types

export interface UnsplashUser {
  id: string;
  username: string;
  name: string;
  first_name: string;
  last_name: string | null;
  profile_image: {
    small: string;
    medium: string;
    large: string;
  };
  links: {
    self: string;
    html: string;
    photos: string;
    likes: string;
    portfolio: string;
    following: string;
    followers: string;
  };
}

export interface UnsplashImage {
  id: string;
  slug: string;
  created_at: string;
  updated_at: string;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  description: string | null;
  alt_description: string | null;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
    small_s3: string;
  };
  links: {
    self: string;
    html: string;
    download: string;
    download_location: string;
  };
  likes: number;
  user: UnsplashUser;
}

export interface SearchImagesResponse {
  total: number;
  total_pages: number;
  results: UnsplashImage[];
}

export interface SpaceflightNewsArticle {
  id: number;
  title: string;
  url: string;
  summary: string;
  published_at: string;
  news_site: string;
}

export interface SpaceflightNewsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: SpaceflightNewsArticle[];
}
