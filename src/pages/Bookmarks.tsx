import React from 'react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import { lessons } from '../data/lessons';
import { 
  Bookmark, 
  ArrowRight, 
  ChevronRight,
  BookOpen,
  X
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';

export const Bookmarks: React.FC = () => {
  const { state, toggleBookmark } = useApp();
  const navigate = useNavigate();

  const bookmarkedLessons = lessons.filter(l => state.bookmarks.includes(l.id));

  return (
    <div className="p-6 md:p-12 max-w-4xl mx-auto space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-black text-white tracking-tight mb-2"
          >
            Your <span className="text-primary">Bookmarks</span>
          </motion.h1>
          <p className="text-slate-400">Lessons you've saved for later review.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20">
            <Bookmark className="text-white" size={24} />
          </div>
        </div>
      </div>

      {/* Bookmarks List */}
      <div className="space-y-4">
        {bookmarkedLessons.length > 0 ? (
          bookmarkedLessons.map((lesson, i) => (
            <motion.div 
              key={lesson.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="group bg-slate-900/50 border border-slate-800 p-6 rounded-3xl hover:bg-slate-800/50 transition-all flex items-center justify-between gap-6"
            >
              <div className="flex items-center gap-6 min-w-0">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center shrink-0">
                  <BookOpen className="text-primary" size={24} />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-black text-primary uppercase tracking-widest">{lesson.category}</span>
                    <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">•</span>
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{lesson.difficulty}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white truncate">{lesson.title}</h3>
                  <p className="text-sm text-slate-500 truncate">{lesson.summary}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button 
                  onClick={() => toggleBookmark(lesson.id)}
                  className="p-3 bg-slate-800 hover:bg-red-500/10 text-slate-400 hover:text-red-400 rounded-2xl transition-all"
                  title="Remove Bookmark"
                >
                  <X size={20} />
                </button>
                <button 
                  onClick={() => navigate(`/lesson/${lesson.id}`)}
                  className="p-3 bg-primary hover:bg-primary-hover text-white rounded-2xl transition-all shadow-lg shadow-primary/20 group-hover:scale-105"
                >
                  <ArrowRight size={20} />
                </button>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-20 bg-slate-900/20 border border-dashed border-slate-800 rounded-3xl">
            <Bookmark className="text-slate-700 mx-auto mb-4" size={48} />
            <h3 className="text-xl font-bold text-slate-500 mb-2">No bookmarks yet</h3>
            <p className="text-slate-600 mb-8">Save lessons to review them later.</p>
            <button 
              onClick={() => navigate('/topics')}
              className="px-8 py-3 bg-primary hover:bg-primary-hover text-white rounded-2xl font-bold transition-all"
            >
              Explore Topics
            </button>
          </div>
        )}
      </div>

      {/* Recommended for Review */}
      {bookmarkedLessons.length > 0 && (
        <div className="pt-12 border-t border-slate-900">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Star className="text-primary" size={20} />
            Recommended for Review
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {lessons.slice(0, 2).map(l => (
              <div 
                key={l.id}
                onClick={() => navigate(`/lesson/${l.id}`)}
                className="p-6 bg-slate-900/30 border border-slate-800 rounded-2xl cursor-pointer hover:bg-slate-800/30 transition-all flex items-center justify-between group"
              >
                <div>
                  <h4 className="text-white font-bold mb-1">{l.title}</h4>
                  <p className="text-xs text-slate-500">{l.category}</p>
                </div>
                <ChevronRight size={20} className="text-slate-700 group-hover:text-primary transition-colors" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const Star = ({ className, size }: { className?: string, size?: number }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);
