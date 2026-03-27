import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Code, Layout, ChevronRight, Bookmark } from 'lucide-react';
import { motion } from 'motion/react';
import ThemeSwitcher from './ThemeSwitcher';

export const Navbar: React.FC = () => {
  return (
    <nav className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-primary p-1.5 rounded-lg group-hover:rotate-12 transition-transform">
              <Code className="text-white" size={20} />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">JS<span className="text-primary">Master</span></span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            <Link to="/topics" className="text-slate-300 hover:text-white transition-colors flex items-center gap-1.5">
              <BookOpen size={18} />
              <span>Lessons</span>
            </Link>
            <Link to="/dashboard" className="text-slate-300 hover:text-white transition-colors flex items-center gap-1.5">
              <Layout size={18} />
              <span>Dashboard</span>
            </Link>
            <Link to="/bookmarks" className="text-slate-300 hover:text-white transition-colors flex items-center gap-1.5">
              <Bookmark size={18} />
              <span>Bookmarks</span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <ThemeSwitcher />
            <Link 
              to="/topics" 
              className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2"
            >
              Get Started
              <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
