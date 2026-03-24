import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register, isLoading, error } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(email, password);
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="max-w-md w-full bg-card border border-secondary p-8 rounded-2xl shadow-xl shadow-black/50"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500 mb-2">
            Create Account
          </h1>
          <p className="text-muted-foreground text-sm">Join FlowState to gamify your productivity.</p>
        </div>

        {error && <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-lg mb-4 text-center border border-destructive/20">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-background border border-secondary rounded-lg px-4 py-2 bg-transparent text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
              placeholder="you@example.com"
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-background border border-secondary rounded-lg px-4 py-2 bg-transparent text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
              placeholder="••••••••"
              required 
            />
          </div>
          
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-2.5 rounded-lg transition-all hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            {isLoading ? 'Creating...' : 'Sign Up'}
          </button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Already have an account? <Link to="/login" className="text-primary hover:underline">Login here</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
