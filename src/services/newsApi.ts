const API_KEY = process.env.EXPO_PUBLIC_NEWS_API_KEY;
const BASE_URL = "https://newsapi.org/v2";

export const getTopHeadlines = async () => {
  const response = await fetch(
    `${BASE_URL}/top-headlines?country=us&pageSize=15&apiKey=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error("There was an error fetching the news articles.");
  }

  const data = await response.json();
  return data.articles;
};
