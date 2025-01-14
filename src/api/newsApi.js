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
  }
};

export default newsApi;
