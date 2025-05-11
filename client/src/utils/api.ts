import { useAuth } from '../contexts/AuthContext';

export const apiFetch = async (
  url: string,
  options: RequestInit = {},
  token?: string | null
) => {
  const headers: HeadersInit = {
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
  const res = await fetch(url, { ...options, headers });
  if (!res.ok) {
    throw new Error(await res.text());
  }
  return res.json();
};
