import axios from 'axios';

const BASE_URL = 'https://newsapi.org/v2';
const apikey = import.meta.env.VITE_REACT_APP_API_KEY;

const newsApi = {
  fetchNews: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/top-headlines`, {
        params: {
          country: 'us',
          apiKey: apikey,
        },
      });
      return response.data.articles;
    } catch (error) {
      console.error('Error fetching news:', error);
      throw error;
    }
  },

  getTopHeadlines: async (country = 'us', category = '') => {
    try {
      const response = await axios.get(`${BASE_URL}/top-headlines`, {
        params: {
          country,
          category,
          apiKey: apikey,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching top headlines:', error);
      throw error;
    }
  },

  searchNews: async (query, sortBy = 'relevancy', page = 1) => {
    try {
      const response = await axios.get(`${BASE_URL}/everything`, {
        params: {
          q: query,
          sortBy,
          page,
          apiKey: apikey,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error searching news:', error);
      throw error;
    }
  },
  fetchNewsByCategory: async (category) => {
    try {
      // Ensure the category is a valid string
      if (typeof category !== 'string') {
        throw new Error('Category must be a string. Received: ' + typeof category);
      }
  
      console.log('Fetching news for category:', category);  // Debugging line
  
      const response = await axios.get(`${BASE_URL}/top-headlines`, {
        params: {
          category,
          apiKey: apikey,
        },
      });
      console.log('Fetched news by category:', response.data.articles);  // Debugging line
      return response.data.articles;
    } catch (error) {
      console.error('Error fetching news by category:', error.message);
      throw error;
    }
  },
  
};
export const { fetchNewsByCategory } = newsApi;

export default newsApi;
