import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

// Use environment variables for the API base URL, with a fallback for local development
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Axios request interceptor to add the JWT token to headers
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Ensure this code runs only in the browser
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers = config.headers ?? {};
        // Add the Authorization header
        (config.headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

export default api;
