import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? `${window.location.origin}/api` : 'http://localhost:3000/api');

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const loginUser = (payload) => api.post('/auth/login', payload);
export const registerUser = (payload) => api.post('/auth/register', payload);
export const logoutUser = () => api.post('/auth/logout');
export const getCurrentUser = () => api.get('/auth/me');

export default api;
