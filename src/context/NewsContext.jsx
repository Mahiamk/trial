import { createContext, useContext, useState } from 'react';

const NewsContext = createContext();

export const useNews = () => useContext(NewsContext);

export const NewsProvider = ({ children }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <NewsContext.Provider value={{ articles, setArticles, loading, setLoading, error, setError }}>
      {children}
    </NewsContext.Provider>
  );
};
