import React, { useState, useEffect } from 'react';
import { useJournalStore } from '../store/useJournalStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Smile, Meh, Frown, Coffee, Zap, Send } from 'lucide-react';

const MOODS = [
  { id: 'motivated', icon: <Zap size={24} />, color: 'text-yellow-500 bg-yellow-500/10 hover:bg-yellow-500/20 border-yellow-500/30' },
  { id: 'happy', icon: <Smile size={24} />, color: 'text-green-500 bg-green-500/10 hover:bg-green-500/20 border-green-500/30' },
  { id: 'neutral', icon: <Meh size={24} />, color: 'text-blue-500 bg-blue-500/10 hover:bg-blue-500/20 border-blue-500/30' },
  { id: 'tired', icon: <Coffee size={24} />, color: 'text-indigo-400 bg-indigo-500/10 hover:bg-indigo-500/20 border-indigo-500/30' },
  { id: 'stressed', icon: <Frown size={24} />, color: 'text-destructive bg-destructive/10 hover:bg-destructive/20 border-destructive/30' }
];

const JournalPage = () => {
  const { entries, fetchEntries, addEntry, isLoading } = useJournalStore();
  const [selectedMood, setSelectedMood] = useState(null);
  const [content, setContent] = useState('');

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedMood) return alert("Please select a mood!");
    addEntry(selectedMood, content);
    setSelectedMood(null);
    setContent('');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Daily Reflection</h1>
        <p className="text-muted-foreground">Track your mood and journal your thoughts to unlock insights.</p>
      </header>

      <form onSubmit={handleSubmit} className="bg-card border border-secondary p-6 md:p-8 rounded-2xl shadow-xl space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[100px] pointer-events-none" />
        
        <div>
          <label className="block text-sm font-medium mb-4 text-foreground">How are you feeling?</label>
          <div className="grid grid-cols-5 gap-2 md:gap-4 cursor-pointer">
            {MOODS.map(m => (
              <button
                key={m.id}
                type="button"
                onClick={() => setSelectedMood(m.id)}
                className={`py-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                  selectedMood === m.id ? 'ring-2 ring-primary scale-105 ' + m.color : m.color.replace('hover:', '') + ' opacity-70 hover:opacity-100'
                }`}
              >
                {m.icon}
                <span className="text-xs font-semibold capitalize hidden sm:block">{m.id}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
           <label className="block text-sm font-medium mb-2 text-foreground">Journal Entry</label>
           <textarea 
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-32 bg-background border border-secondary rounded-xl p-4 focus:ring-1 focus:ring-primary focus:border-primary outline-none resize-none placeholder:text-muted-foreground/50 transition-colors"
            placeholder="What achieved FlowState today? What blocked it?"
            required
           />
        </div>

        <button 
          disabled={isLoading || !selectedMood}
          type="submit" 
          className="w-full md:w-auto ml-auto px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Saving...' : 'Save Reflection'}
          <Send size={18} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </form>

      <div className="space-y-4">
        <h2 className="text-xl font-bold mt-12 mb-6">Past Entries</h2>
        {isLoading && <p className="animate-pulse">Loading past thoughts...</p>}
        {entries.length === 0 && !isLoading && (
          <p className="text-center text-muted-foreground italic mt-10">No entries yet. Start writing to track patterns!</p>
        )}
        <AnimatePresence>
          {entries.map((entry) => {
            const moodData = MOODS.find(m => m.id === entry.mood);
            return (
              <motion.div
                key={entry._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card border border-secondary p-5 rounded-2xl flex gap-4 items-start"
              >
                <div className={`p-3 rounded-full mt-1 ${moodData?.color.split(' ')[1]} ${moodData?.color.split(' ')[0]}`}>
                  {moodData?.icon || <Smile size={20} />}
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-semibold capitalize">{entry.mood}</span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(entry.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{entry.content}</p>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default JournalPage;
