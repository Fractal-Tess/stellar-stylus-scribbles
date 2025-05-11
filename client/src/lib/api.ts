const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export const getArticles = async () => {
  const response = await fetch(`${SERVER_URL}/api/articles`);
  return response.json();
};

export const extractArticleText = async (url: string) => {
  const response = await fetch(`${SERVER_URL}/api/article/extract?url=${url}`);
  return response.json();
};
