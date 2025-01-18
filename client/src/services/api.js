import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const productApi = {
  getProducts: async (category) => {
    const response = await api.get('/api/products', {
      params: { selectedCategory: category },
    });
    return response.data;
  },
};

export default api;
