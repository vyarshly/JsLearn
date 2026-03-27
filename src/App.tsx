import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Topics } from './pages/Topics';
import { Lesson } from './pages/Lesson';
import { Dashboard } from './pages/Dashboard';
import { Bookmarks } from './pages/Bookmarks';
import { AppProvider, useApp } from './context/AppContext';
import { lessons } from './data/lessons';
import { motion, AnimatePresence } from 'motion/react';

const AppContent = () => {
  const location = useLocation();
  const { state } = useApp();
  
  const isLessonPage = location.pathname.startsWith('/lesson/');
  const progress = (state.completedLessons.length / lessons.length) * 100;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-primary/30 flex flex-col">
      {!isLessonPage && <Navbar />}
      
      {/* Progress Bar (Global) */}
      {!isLessonPage && (
        <div className="fixed top-16 left-0 w-full h-1 bg-slate-900 z-40">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-primary shadow-[0_0_10px_var(--primary-color)]"
          />
        </div>
      )}

      <main className="flex-1">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/topics" element={<Topics />} />
            <Route path="/lesson/:id" element={<Lesson />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
          </Routes>
        </AnimatePresence>
      </main>

      {!isLessonPage && (
        <footer className="border-t border-slate-900 py-12 mt-20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-slate-500 text-sm">
              © 2026 JS Master Learning Platform. Built for developers.
            </p>
          </div>
        </footer>
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <Router>
        <AppContent />
      </Router>
    </AppProvider>
  );
}
