import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { useTaskStore } from '../store/useTaskStore';
import { motion } from 'framer-motion';
import { Flame, Star, Trophy } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuthStore();
  const { tasks, fetchTasks } = useTaskStore();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const xpProgress = user ? (user.xp / 100) * 100 : 0; // Assuming 100XP per level
  const pendingTasks = tasks.filter(t => t.status === 'pending');
  const completedTasks = tasks.filter(t => t.status === 'completed');

  return (
    <div className="space-y-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome back, MVP.</h1>
        <p className="text-muted-foreground">Ready to conquer your day?</p>
      </header>

      {/* Gamification Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-card border border-secondary p-6 rounded-2xl flex items-center gap-4 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-bl-full -z-0" />
          <div className="w-12 h-12 bg-primary/20 text-primary rounded-xl flex items-center justify-center z-10">
            <Trophy size={24} />
          </div>
          <div className="z-10">
            <p className="text-sm text-muted-foreground">Current Level</p>
            <p className="text-2xl font-bold">{user?.level || 1}</p>
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-card border border-secondary p-6 rounded-2xl flex flex-col justify-center relative overflow-hidden"
        >
          <div className="flex items-center gap-4 mb-2 z-10">
            <div className="w-12 h-12 bg-yellow-500/20 text-yellow-500 rounded-xl flex items-center justify-center">
              <Star size={24} fill="currentColor" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">XP Progress</p>
              <p className="text-lg font-bold">{user?.xp || 0} / 100</p>
            </div>
          </div>
          <div className="w-full bg-secondary h-2.5 rounded-full overflow-hidden z-10 mt-2">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${xpProgress}%` }}
              className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-full rounded-full"
            />
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-card border border-secondary p-6 rounded-2xl flex items-center gap-4 relative overflow-hidden"
        >
           <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/10 rounded-bl-full -z-0" />
          <div className="w-12 h-12 bg-orange-500/20 text-orange-500 rounded-xl flex items-center justify-center z-10">
            <Flame size={24} fill="currentColor" />
          </div>
          <div className="z-10">
            <p className="text-sm text-muted-foreground">Active Streak</p>
            <p className="text-2xl font-bold">{user?.streak || 0} Days</p>
          </div>
        </motion.div>
      </div>

      {/* Task Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="bg-card border border-secondary rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-4">Pending Quests</h2>
          {pendingTasks.length === 0 ? (
            <p className="text-muted-foreground text-sm italic">All caught up! Time to chill?</p>
          ) : (
            <ul className="space-y-3">
              {pendingTasks.slice(0, 5).map(task => (
                <li key={task._id} className="flex justify-between items-center p-3 rounded-lg border border-secondary hover:border-primary/50 transition-colors">
                  <div>
                    <p className="font-medium">{task.title}</p>
                    <p className="text-xs text-muted-foreground">{task.category} • Priority: {task.priority}</p>
                  </div>
                  <div className="text-yellow-500 font-bold text-sm">
                    +{task.priority * 10} XP
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="bg-card border border-secondary rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-4">Recent Victories</h2>
          {completedTasks.length === 0 ? (
             <p className="text-muted-foreground text-sm italic">Complete a task to see it here.</p>
          ) : (
            <ul className="space-y-3">
              {completedTasks.slice(0, 5).map(task => (
                <li key={task._id} className="flex justify-between items-center p-3 rounded-lg border border-green-500/20 bg-green-500/5">
                  <div>
                    <p className="font-medium line-through text-muted-foreground">{task.title}</p>
                  </div>
                  <div className="text-green-500 flex items-center gap-1 font-bold text-sm">
                    ✓ Done
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
