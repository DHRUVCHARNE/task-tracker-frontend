import axios from 'axios';

const api = axios.create({
  baseURL: 'https://task-tracker-backend-production-1e86.up.railway.app', // Backend base URL
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    alert(error.response?.data?.message || 'An error occurred');
    return Promise.reject(error);
  }
);

export default api;
