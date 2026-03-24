import { create } from 'zustand';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Interceptor to add token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),
  isLoading: false,
  error: null,

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const res = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      set({ 
        user: res.data.user, 
        token: res.data.token, 
        isAuthenticated: true, 
        isLoading: false 
      });
    } catch (error) {
      set({ error: error.response?.data?.error || 'Login failed', isLoading: false });
    }
  },

  register: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const res = await api.post('/auth/register', { email, password });
      localStorage.setItem('token', res.data.token);
      set({ 
        user: res.data.user, 
        token: res.data.token, 
        isAuthenticated: true, 
        isLoading: false 
      });
    } catch (error) {
      set({ error: error.response?.data?.error || 'Registration failed', isLoading: false });
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null, isAuthenticated: false });
  },

  updateUserStats: (newStats) => set((state) => ({
    user: { ...state.user, ...newStats }
  }))
}));

export default api;
