const apikey = import.meta.env.VITE_REACT_APP_API_KEY;
export const fetch = async (category = 'general', country = 'us') => {
  const url= `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apikey}`;


  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.articles;
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
};

export const searchNewsByCategory = async (category) => {
  const url = `https://newsapi.org/v2/top-headlines?category=${category}&apiKey=${apikey}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.articles;
  } catch (error) {
    console.error('Error fetching news by category:', error);
    return [];
  }
};
