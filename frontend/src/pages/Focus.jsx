import React, { useState, useEffect } from 'react';
import { useFocusStore } from '../store/useFocusStore';
import { motion } from 'framer-motion';
import { Play, Square, TimerReset } from 'lucide-react';

const Focus = () => {
  const { logSession } = useFocusStore();
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft(curr => curr - 1), 1000);
    } else if (isActive && timeLeft === 0) {
      // Timer complete!
      setIsActive(false);
      logSession(25); // Hardcoded to 25 for demo
      alert("Session Complete! You earned 25 XP.");
      setTimeLeft(25 * 60);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, logSession]);

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(25 * 60);
  };

  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
      <h1 className="text-3xl font-bold mb-2">Deep Work Zone</h1>
      <p className="text-muted-foreground mb-12">Focus without distractions. Earn XP for every minute.</p>
      
      <div className="relative">
        <motion.div 
          animate={{ scale: isActive ? [1, 1.05, 1] : 1 }}
          transition={{ repeat: isActive ? Infinity : 0, duration: 2, ease: "easeInOut" }}
          className="w-72 h-72 rounded-full border-4 border-primary/20 flex items-center justify-center relative bg-card shadow-[0_0_50px_rgba(99,102,241,0.1)]"
        >
          {isActive && (
            <motion.div 
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
              className="absolute inset-0 border-4 border-transparent border-t-primary rounded-full"
            />
          )}
          <span className="text-6xl font-extrabold tracking-widest text-primary font-mono">
            {mins.toString().padStart(2, '0')}:{secs.toString().padStart(2, '0')}
          </span>
        </motion.div>
      </div>

      <div className="flex gap-4 mt-12">
        <button 
          onClick={toggleTimer}
          className={`px-8 py-4 rounded-full flex items-center gap-2 font-bold transition-all ${
            isActive ? 'bg-destructive/10 text-destructive hover:bg-destructive/20 border border-destructive/30' : 'bg-primary text-white hover:shadow-[0_0_20px_rgba(99,102,241,0.5)]'
          }`}
        >
          {isActive ? <><Square fill="currentColor" size={20} /> Pause</> : <><Play fill="currentColor" size={20} /> Start Session</>}
        </button>
        <button 
          onClick={resetTimer}
          className="px-6 py-4 rounded-full bg-secondary hover:bg-secondary/70 transition-colors flex items-center gap-2 border border-secondary"
        >
          <TimerReset size={20} />
        </button>
      </div>
    </div>
  );
};

export default Focus;
