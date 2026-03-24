import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import api from '../store/useAuthStore';
import { Lock, Sparkles, BrainCircuit, Headphones, Film } from 'lucide-react';
import { motion } from 'framer-motion';

const ChillZone = () => {
  const { user } = useAuthStore();
  const [aiData, setAiData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Requirement for Chill Zone Access = Streak of 3
  const hasAccess = user?.streak >= 3;

  useEffect(() => {
    if (hasAccess) {
      api.get('/ai/insights')
        .then(res => {
          setAiData(res.data);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [hasAccess]);

  if (!hasAccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center max-w-lg mx-auto p-6">
        <div className="w-24 h-24 bg-secondary/50 rounded-full flex items-center justify-center mb-6">
          <Lock size={48} className="text-muted-foreground" />
        </div>
        <h1 className="text-3xl font-bold mb-4">Chill Zone Locked</h1>
        <p className="text-muted-foreground mb-8 text-lg">
          Maintain a streak of 3 days to unlock the Chill Zone. 
          Currently you are at: <span className="font-bold text-primary">{user?.streak || 0} days</span>.
        </p>
        <div className="w-full bg-secondary h-4 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${((user?.streak || 0) / 3) * 100}%` }}
            className="bg-primary h-full rounded-full"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
          Chill Zone <Sparkles className="text-yellow-400" />
        </h1>
        <p className="text-muted-foreground">You earned this. Relax and recharge based on your recent activity.</p>
      </header>

      {/* AI Insights Widget */}
      <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-primary/20 p-6 rounded-2xl flex flex-col md:flex-row gap-6 items-center shadow-lg">
         <div className="w-16 h-16 bg-primary/20 text-primary rounded-full flex shrink-0 items-center justify-center">
            <BrainCircuit size={32} />
         </div>
         <div>
           <h3 className="text-lg font-bold mb-1">AI Flow Analyzer</h3>
           {loading ? (
             <p className="text-sm text-muted-foreground animate-pulse">Analyzing neural patterns...</p>
           ) : (
             <p className="text-sm">
                {aiData?.burnoutWarning ? 
                  <span className="text-destructive font-semibold">Burnout Detected: {aiData.recommendation}</span> : 
                  <span className="text-green-500 font-semibold">{aiData?.recommendation || "You're perfectly balanced."}</span>
                }
             </p>
           )}
         </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-8">
        {/* Media Suggestions Block */}
        <div className="bg-card border border-secondary p-6 rounded-2xl group hover:border-blue-500/50 transition-colors">
          <div className="flex items-center gap-3 mb-4 text-blue-400">
            <Headphones size={24} />
            <h3 className="font-bold text-lg text-foreground">Lo-Fi & Binaural Beats</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
            Based on your focus sessions, we recommend deeply relaxing ambient tracks to cool down your prefrontal cortex.
          </p>
          <button className="w-full py-3 rounded-lg bg-blue-500/10 text-blue-400 font-medium hover:bg-blue-500/20 transition-colors">
            Open Web Player
          </button>
        </div>

        <div className="bg-card border border-secondary p-6 rounded-2xl group hover:border-pink-500/50 transition-colors">
          <div className="flex items-center gap-3 mb-4 text-pink-400">
            <Film size={24} />
            <h3 className="font-bold text-lg text-foreground">Movie Recommendations</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
            {aiData?.burnoutWarning 
              ? "You seem stressed. We recommend lighthearted comedies or nature documentaries." 
              : "High energy! Maybe an action thriller or scifi adventure for tonight?"}
          </p>
          <button className="w-full py-3 rounded-lg bg-pink-500/10 text-pink-400 font-medium hover:bg-pink-500/20 transition-colors">
            View Curated List
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChillZone;
