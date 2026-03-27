import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { lessons, Category } from '../data/lessons';
import { motion } from 'motion/react';
import { Book, Code, Layout, ChevronRight, CheckCircle2, Star, Zap, Layers } from 'lucide-react';
import { cn } from '../lib/utils';
import { useApp } from '../context/AppContext';

export const Topics: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { isCompleted } = useApp();
  
  const activeCategory = searchParams.get('category') || 'all';

  const categories: { id: Category | 'all'; label: string; icon: any }[] = [
    { id: 'all', label: 'All Topics', icon: Layers },
    { id: 'basics', label: 'Basics', icon: Code },
    { id: 'dom', label: 'DOM', icon: Zap },
    { id: 'react', label: 'React', icon: Layout },
    { id: 'functions', label: 'Functions', icon: Star },
  ];

  const filteredLessons = activeCategory === 'all' 
    ? lessons 
    : lessons.filter(l => l.category === activeCategory);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="mb-12">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-black text-white mb-4 tracking-tight"
        >
          Learning <span className="text-primary">Path</span>
        </motion.h1>
        <p className="text-slate-400 text-lg max-w-2xl">
          Master JavaScript from the ground up with our structured curriculum. 
          Choose a category to filter your journey.
        </p>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-3 mb-12">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSearchParams({ category: cat.id })}
            className={cn(
              "px-6 py-3 rounded-2xl font-bold transition-all flex items-center gap-2 border",
              activeCategory === cat.id 
                ? "bg-primary text-white border-primary shadow-xl shadow-primary/20 scale-105" 
                : "bg-slate-900/50 text-slate-400 border-slate-800 hover:border-slate-700 hover:bg-slate-800"
            )}
          >
            <cat.icon size={18} />
            {cat.label}
          </button>
        ))}
      </div>

      {/* Lessons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLessons.map((lesson, i) => {
          const completed = isCompleted(lesson.id);
          
          return (
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
            >
              <Link
                to={`/lesson/${lesson.id}`}
                className="group block h-full p-8 bg-slate-900/50 border border-slate-800 rounded-3xl hover:border-primary/50 hover:bg-slate-800/50 transition-all relative overflow-hidden"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 bg-slate-950 border border-slate-800 rounded-2xl flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all">
                    <Book className="text-primary group-hover:text-white" size={24} />
                  </div>
                  {completed && (
                    <div className="flex items-center gap-1.5 text-green-500 text-[10px] font-black uppercase tracking-widest bg-green-500/10 px-3 py-1.5 rounded-full border border-green-500/20">
                      <CheckCircle2 size={12} />
                      Completed
                    </div>
                  )}
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black text-primary uppercase tracking-widest">{lesson.category}</span>
                    <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest">•</span>
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{lesson.difficulty}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white group-hover:text-primary transition-colors leading-tight">
                    {lesson.title}
                  </h3>
                  <p className="text-slate-400 text-sm line-clamp-2 leading-relaxed">
                    {lesson.summary}
                  </p>
                </div>
                
                <div className="mt-8 pt-6 border-t border-slate-800/50 flex items-center justify-between">
                  <div className="flex items-center text-primary text-sm font-bold">
                    Start Lesson
                    <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map(j => (
                      <div key={j} className="w-6 h-6 rounded-full border-2 border-slate-900 bg-slate-800" />
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {filteredLessons.length === 0 && (
        <div className="text-center py-20 bg-slate-900/20 border border-dashed border-slate-800 rounded-3xl">
          <Book className="text-slate-700 mx-auto mb-4" size={48} />
          <h3 className="text-xl font-bold text-slate-500 mb-2">No lessons found</h3>
          <p className="text-slate-600">Try selecting a different category.</p>
        </div>
      )}
    </div>
  );
};
