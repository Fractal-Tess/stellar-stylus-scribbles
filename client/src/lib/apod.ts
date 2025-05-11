const API_KEY = import.meta.env.VITE_NASA_APOD_API_KEY;
console.log(API_KEY);

export async function getApod() {
  const response = await fetch(
    `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error(`NASA API responded with status: ${response.status}`);
  }

  const data = await response.json();

  return data;
}
