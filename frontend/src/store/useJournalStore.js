import { create } from 'zustand';
import api from './useAuthStore';

export const useJournalStore = create((set) => ({
  entries: [],
  isLoading: false,
  error: null,

  fetchEntries: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await api.get('/journal');
      set({ entries: res.data, isLoading: false });
    } catch (error) {
      set({ error: error.response?.data?.error || 'Failed to fetch journal entries', isLoading: false });
    }
  },

  addEntry: async (mood, content) => {
    set({ isLoading: true, error: null });
    try {
      const res = await api.post('/journal', { mood, content });
      set((state) => ({ 
        entries: [res.data, ...state.entries],
        isLoading: false 
      }));
    } catch (error) {
      set({ error: error.response?.data?.error || 'Failed to post entry', isLoading: false });
    }
  }
}));
