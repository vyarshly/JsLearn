import React from 'react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import { lessons } from '../data/lessons';
import { 
  Trophy, 
  BookOpen, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  Award,
  ArrowRight,
  Star,
  RotateCcw
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';

export const Dashboard: React.FC = () => {
  const { state, isCompleted } = useApp();
  const navigate = useNavigate();

  const totalLessons = lessons.length;
  const completedCount = state.completedLessons.length;
  const progressPercent = Math.round((completedCount / totalLessons) * 100);

  const categories = Array.from(new Set(lessons.map(l => l.category)));
  const categoryStats = categories.map(cat => {
    const catLessons = lessons.filter(l => l.category === cat);
    const catCompleted = catLessons.filter(l => isCompleted(l.id)).length;
    return {
      name: cat,
      total: catLessons.length,
      completed: catCompleted,
      percent: Math.round((catCompleted / catLessons.length) * 100)
    };
  });

  const lastLesson = lessons.find(l => l.id === state.lastLessonId);

  const completedLessonsData = lessons.filter(l => isCompleted(l.id));
  const randomRevisionLesson = completedLessonsData.length > 0 
    ? completedLessonsData[Math.floor(Math.random() * completedLessonsData.length)]
    : null;

  return (
    <div className="p-6 md:p-12 max-w-6xl mx-auto space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-black text-white tracking-tight mb-2"
          >
            Your <span className="text-primary">Progress</span>
          </motion.h1>
          <p className="text-slate-400">Track your journey to becoming a JavaScript Master.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Current Level</p>
            <p className="text-xl font-bold text-white">
              {progressPercent < 30 ? 'Beginner' : progressPercent < 70 ? 'Intermediate' : 'Advanced'}
            </p>
          </div>
          <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20">
            <Award className="text-white" size={24} />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-slate-900/50 border border-slate-800 p-8 rounded-3xl relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
            <TrendingUp size={80} />
          </div>
          <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Completion</p>
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-5xl font-black text-white">{progressPercent}%</span>
            <span className="text-slate-500 text-sm">overall</span>
          </div>
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              className="h-full bg-primary"
            />
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-slate-900/50 border border-slate-800 p-8 rounded-3xl relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
            <CheckCircle2 size={80} />
          </div>
          <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Lessons</p>
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-5xl font-black text-white">{completedCount}</span>
            <span className="text-slate-500 text-sm">/ {totalLessons}</span>
          </div>
          <p className="text-xs text-slate-400">Keep going! You're doing great.</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-slate-900/50 border border-slate-800 p-8 rounded-3xl relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
            <Star size={80} />
          </div>
          <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Quiz Average</p>
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-5xl font-black text-white">
              {Object.values(state.quizScores).length > 0 
                ? Math.round(Object.values(state.quizScores).reduce((a, b) => a + b, 0) / Object.values(state.quizScores).length * 10) / 10
                : 0}
            </span>
            <span className="text-slate-500 text-sm">pts</span>
          </div>
          <p className="text-xs text-slate-400">Based on {Object.values(state.quizScores).length} quizzes.</p>
        </motion.div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Category Breakdown */}
        <div className="lg:col-span-2 space-y-8">
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <BookOpen size={20} className="text-primary" />
              Category Breakdown
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {categoryStats.map((cat, i) => (
                <motion.div 
                  key={cat.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-slate-900/30 border border-slate-800/50 p-6 rounded-2xl hover:bg-slate-800/30 transition-all"
                >
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm font-bold text-white capitalize">{cat.name}</span>
                    <span className="text-xs font-bold text-slate-500">{cat.completed} / {cat.total}</span>
                  </div>
                  <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${cat.percent}%` }}
                      className={cn(
                        "h-full",
                        cat.percent === 100 ? "bg-green-500" : "bg-primary"
                      )}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Revision Section */}
          {randomRevisionLesson && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <RotateCcw size={20} className="text-primary" />
                Time for Revision?
              </h3>
              <div 
                onClick={() => navigate(`/lesson/${randomRevisionLesson.id}`)}
                className="bg-slate-900 border border-slate-800 p-8 rounded-[40px] cursor-pointer hover:border-primary/50 transition-all group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                  <RotateCcw size={120} />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-[10px] font-black text-primary uppercase tracking-widest">Random Challenge</span>
                    <div className="w-1 h-1 rounded-full bg-slate-700" />
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{randomRevisionLesson.category}</span>
                  </div>
                  <h4 className="text-2xl font-black text-white mb-2">{randomRevisionLesson.title}</h4>
                  <p className="text-slate-400 mb-6 max-w-xl">You completed this lesson before. Why not take the quiz again to refresh your memory?</p>
                  <div className="flex items-center gap-2 text-primary font-bold text-sm">
                    Start Revision <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Info */}
        <div className="space-y-8">
          {/* Last Lesson */}
          {lastLesson && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Clock size={20} className="text-primary" />
                Pick up where you left off
              </h3>
              <div 
                onClick={() => navigate(`/lesson/${lastLesson.id}`)}
                className="bg-primary p-6 rounded-3xl cursor-pointer hover:bg-primary-hover transition-all shadow-xl shadow-primary/20 group"
              >
                <p className="text-primary-muted text-xs font-bold uppercase tracking-widest mb-2">Last Lesson</p>
                <h4 className="text-xl font-bold text-white mb-4">{lastLesson.title}</h4>
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                  Continue Learning <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          )}

          {/* Achievements */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Trophy size={20} className="text-primary" />
              Achievements
            </h3>
            <div className="space-y-3">
              {[
                { title: 'First Step', desc: 'Complete your first lesson', unlocked: completedCount >= 1 },
                { title: 'DOM Explorer', desc: 'Complete all DOM lessons', unlocked: categoryStats.find(c => c.name === 'dom')?.percent === 100 },
                { title: 'Quiz Master', desc: 'Score 100% on 5 quizzes', unlocked: Object.values(state.quizScores).filter(s => s >= 1).length >= 5 },
                { title: 'JS Master', desc: 'Complete all lessons', unlocked: progressPercent === 100 },
              ].map((ach, i) => (
                <div 
                  key={ach.title}
                  className={cn(
                    "flex items-center gap-4 p-4 rounded-2xl border transition-all",
                    ach.unlocked 
                      ? "bg-slate-900 border-primary/30" 
                      : "bg-slate-900/20 border-slate-800 opacity-50 grayscale"
                  )}
                >
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
                    ach.unlocked ? "bg-primary/20 text-primary" : "bg-slate-800 text-slate-600"
                  )}>
                    <Trophy size={20} />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-white">{ach.title}</h5>
                    <p className="text-xs text-slate-500">{ach.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
