import { create } from 'zustand';
import api, { useAuthStore } from './useAuthStore';

export const useFocusStore = create((set) => ({
  sessions: [],
  isLoading: false,

  fetchSessions: async () => {
    set({ isLoading: true });
    try {
      const res = await api.get('/focus');
      set({ sessions: res.data, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      console.error(error);
    }
  },

  logSession: async (duration) => {
    try {
      const res = await api.post('/focus/session', { duration });
      const { session, user } = res.data;
      
      set((state) => ({ sessions: [session, ...state.sessions] }));
      
      // Update global user stats
      useAuthStore.getState().updateUserStats({
        xp: user.xp,
        level: user.level,
        streak: user.streak
      });
    } catch (error) {
      console.error(error);
    }
  }
}));
