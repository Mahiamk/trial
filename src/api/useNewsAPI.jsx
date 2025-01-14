import { useState, useEffect } from 'react';

const useNewsAPI = (query = '', category = 'general') => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apikey = import.meta.env.VITE_REACT_APP_API_KEY;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const url = `https://newsapi.org/v2/top-headlines?category=${category}&q=${query}&apiKey=${apikey}`;
        const response = await window.fetch(url); // Use `window.fetch` to prevent conflict
        const data = await response.json();
        const articlesWithFallbackImage = data.articles.map((article) => ({
          ...article,
          urlToImage: article.urlToImage || 'https://via.placeholder.com/300x200?text=No+Image',
        }));
        setArticles(articlesWithFallbackImage);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch news', err);
        setLoading(false);
      }
    };

    fetchNews();
  }, [query, category, apikey]);

  return { articles, loading, error };
};

export default useNewsAPI;
