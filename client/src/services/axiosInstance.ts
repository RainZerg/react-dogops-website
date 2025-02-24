import axios from 'axios';
import { useAuthStore } from '@/hooks/authStore.ts';
import { history } from './history.ts'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true
});

// Request interceptor
axiosInstance.interceptors.request.use(config => {
  // Use getState() to access the store without hooks
  const { token } = useAuthStore.getState();
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor
axiosInstance.interceptors.response.use(
  response => {
    const newToken = response.headers['x-new-requestToken'];
    if (newToken) {
      // Access store methods via getState()
      useAuthStore.getState().setToken(newToken);
    }
    return response;
  },
  error => {
    const originalRequest = error.config;
    const { status } = error.response || {};
    
    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      // Access store methods via getState()
      useAuthStore.getState().clearToken();
      if (!originalRequest.skipAuthRedirect) {
        const returnUrl = encodeURIComponent(
          history.location.pathname + history.location.search
        );
        history.navigate(`/login?redirect=${returnUrl}`);    
    
    return Promise.reject(error);
  }
        }
    }
);
export default axiosInstance;
