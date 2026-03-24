import { create } from 'zustand';
import api, { useAuthStore } from './useAuthStore';

export const useTaskStore = create((set, get) => ({
  tasks: [],
  isLoading: false,
  error: null,

  fetchTasks: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await api.get('/tasks');
      set({ tasks: res.data, isLoading: false });
    } catch (error) {
      set({ error: error.response?.data?.error || 'Failed to fetch tasks', isLoading: false });
    }
  },

  addTask: async (taskData) => {
    try {
      const res = await api.post('/tasks', taskData);
      set((state) => ({ tasks: [...state.tasks, res.data] }));
    } catch (error) {
      console.error(error);
    }
  },

  completeTask: async (id) => {
    try {
      const res = await api.post(`/tasks/${id}/complete`);
      const updatedTask = res.data.task;
      const updatedUser = res.data.user;

      set((state) => ({
        tasks: state.tasks.map((t) => t._id === id ? updatedTask : t)
      }));

      // Map backend user response directly to useAuthStore's state
      useAuthStore.getState().updateUserStats({
        xp: updatedUser.xp,
        level: updatedUser.level,
        streak: updatedUser.streak
      });
    } catch (error) {
      console.error(error);
    }
  },

  deleteTask: async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      set((state) => ({
        tasks: state.tasks.filter((t) => t._id !== id)
      }));
    } catch (error) {
      console.error(error);
    }
  }
}));
