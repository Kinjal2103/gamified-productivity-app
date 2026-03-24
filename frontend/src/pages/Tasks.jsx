import React, { useEffect, useState } from 'react';
import { useTaskStore } from '../store/useTaskStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Check, Trash2, Clock, CheckSquare } from 'lucide-react';

const Tasks = () => {
  const { tasks, fetchTasks, addTask, completeTask, deleteTask, isLoading } = useTaskStore();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ title: '', category: 'General', priority: 1, difficulty: 'easy' });

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(formData);
    setShowModal(false);
    setFormData({ title: '', category: 'General', priority: 1, difficulty: 'easy' });
  };

  const getPriorityColor = (p) => {
    if(p >= 4) return 'text-destructive bg-destructive/10 border-destructive/20';
    if(p >= 2) return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
    return 'text-green-500 bg-green-500/10 border-green-500/20';
  };

  const pendingTasks = tasks.filter(t => t.status === 'pending');

  return (
    <div className="space-y-6 relative h-full">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Quests</h1>
          <p className="text-muted-foreground">Accept your missions and earn XP.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-primary/20"
        >
          <Plus size={20} /> New Quest
        </button>
      </header>

      {isLoading && <p className="text-muted-foreground animate-pulse">Loading quests...</p>}

      <div className="grid gap-4">
        <AnimatePresence>
          {pendingTasks.map((task) => (
            <motion.div
              key={task._id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              className="bg-card border border-secondary p-4 rounded-xl flex justify-between items-center group hover:border-primary/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => completeTask(task._id)}
                  className="w-6 h-6 rounded-md border-2 border-muted-foreground flex items-center justify-center hover:bg-green-500 hover:border-green-500 text-transparent hover:text-white transition-colors group-hover:border-primary"
                >
                  <Check size={16} />
                </button>
                <div>
                  <h3 className="font-medium text-lg">{task.title}</h3>
                  <div className="flex gap-2 items-center mt-1">
                    <span className={`text-xs px-2 py-0.5 rounded-md border ${getPriorityColor(task.priority)}`}>
                      Tier {task.priority}
                    </span>
                    <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded-md border border-secondary">
                      {task.category}
                    </span>
                    <span className="text-xs text-yellow-500 flex items-center gap-1 font-bold">
                      +{task.priority * 10} XP
                    </span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => deleteTask(task._id)}
                className="text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity p-2"
              >
                <Trash2 size={18} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {!isLoading && pendingTasks.length === 0 && (
          <div className="text-center py-20 text-muted-foreground border-2 border-dashed border-secondary rounded-2xl">
            <CheckSquare className="mx-auto mb-4 opacity-50" size={48} />
            <p>Your quest log is empty.</p>
          </div>
        )}
      </div>

      {/* Modal Backdrop */}
      <AnimatePresence>
        {showModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-card border border-secondary p-6 rounded-2xl w-full max-w-md shadow-2xl"
            >
              <h2 className="text-2xl font-bold mb-4">Create New Quest</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm mb-1 text-muted-foreground">Quest Title</label>
                  <input 
                    type="text" 
                    value={formData.title} 
                    onChange={e => setFormData({...formData, title: e.target.value})}
                    required
                    className="w-full bg-background border border-secondary rounded-lg px-3 py-2 focus:ring-1 focus:ring-primary focus:border-primary outline-none"
                    placeholder="E.g., Complete System Design Docs"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-1 text-muted-foreground">Category</label>
                    <input 
                      type="text" 
                      value={formData.category} 
                      onChange={e => setFormData({...formData, category: e.target.value})}
                      className="w-full bg-background border border-secondary rounded-lg px-3 py-2 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1 text-muted-foreground">Priority (1-5)</label>
                    <input 
                      type="number" 
                      min="1" max="5"
                      value={formData.priority} 
                      onChange={e => setFormData({...formData, priority: Number(e.target.value)})}
                      className="w-full bg-background border border-secondary rounded-lg px-3 py-2 outline-none"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-3 mt-6">
                  <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 rounded-lg text-muted-foreground hover:bg-secondary">
                    Cancel
                  </button>
                  <button type="submit" className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90">
                    Accept Quest
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Tasks;
