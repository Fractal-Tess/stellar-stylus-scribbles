export const SERVER_URL = import.meta.env.DEV
  ? import.meta.env.VITE_SERVER_URL
  : '';

// NASA APOD API
export type APODResponse = {
  copyright: string;
  date: string;
  explanation: string;
  hdurl: string;
  media_type: string;
  service_version: string;
  title: string;
  url: string;
};

export async function getAPOD(): Promise<APODResponse> {
  const response = await fetch(`${SERVER_URL}/api/apod`);
  const data = await response.json();
  return data;
}

// Unsplash API
export const searchImages = async (
  query: string,
  page: number,
  pageSize: number
) => {
  const response = await fetch(
    `${SERVER_URL}/api/unsplash/search?query=${encodeURIComponent(
      query
    )}&page=${page}&pageSize=${pageSize}`
  );
  if (!response.ok) throw new Error('Failed to fetch images');
  return response.json();
};

// Spaceflight News API
export const getSpaceflightNews = async (
  page: number = 1,
  pageSize: number = 10
) => {
  const response = await fetch(
    `${SERVER_URL}/api/spaceflight-news?page=${page}&pageSize=${pageSize}`
  );
  if (!response.ok) throw new Error('Failed to fetch spaceflight news');
  return response.json();
};

export const getGravatarUrl = async (
  token: string
): Promise<{ url: string }> => {
  console.log(token);
  const response = await fetch(`${SERVER_URL}/api/gravatar`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error('Failed to fetch gravatar url');
  const data = await response.json();
  return data;
};
