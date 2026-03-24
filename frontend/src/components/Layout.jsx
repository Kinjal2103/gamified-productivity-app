import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, CheckSquare, Timer, BookHeart, Coffee, LogOut } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { motion } from 'framer-motion';

const Layout = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
    { name: 'Tasks', path: '/tasks', icon: <CheckSquare size={20} /> },
    { name: 'Focus', path: '/focus', icon: <Timer size={20} /> },
    { name: 'Journal', path: '/journal', icon: <BookHeart size={20} /> },
    { name: 'Chill Zone', path: '/chill', icon: <Coffee size={20} /> },
  ];

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      {/* Sidebar */}
      <nav className="w-64 bg-card border-r border-secondary flex flex-col justify-between hidden md:flex">
        <div>
          <div className="p-6">
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">
              FlowState
            </h1>
          </div>
          <div className="px-4 space-y-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                    isActive 
                      ? 'bg-primary/10 text-primary font-medium' 
                      : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground'
                  }`}
                >
                  {item.icon}
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>
        
        <div className="p-4 border-t border-secondary">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center font-bold text-white shadow-lg shadow-primary/20">
              {user?.email?.[0].toUpperCase() || 'U'}
            </div>
            <div>
              <p className="font-medium text-sm">Lvl {user?.level || 1}</p>
              <p className="text-xs text-muted-foreground">{user?.xp || 0} XP</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2 w-full text-left rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto relative">
        <div className="p-6 md:p-10 max-w-6xl mx-auto min-h-full">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="pb-24 md:pb-0"
          >
            <Outlet />
          </motion.div>
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-secondary flex justify-around p-3 z-50">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`p-2 rounded-xl flex flex-col items-center gap-1 ${
              location.pathname === item.path ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            {item.icon}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Layout;
