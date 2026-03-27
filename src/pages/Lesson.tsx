import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { lessons } from '../data/lessons';
import { LessonContent } from '../components/Workspace/LessonContent';
import { InteractiveLab } from '../components/Workspace/InteractiveLab';
import { QuizPanel } from '../components/Workspace/QuizPanel';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  Terminal, 
  HelpCircle, 
  ChevronLeft, 
  Search,
  Layout,
  Menu,
  X,
  CheckCircle2,
  Circle,
  Bookmark
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useApp } from '../context/AppContext';

export const Lesson: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { state, saveScore, isCompleted, setLastLesson, toggleComplete } = useApp();
  
  const [activeTab, setActiveTab] = useState<'content' | 'lab' | 'quiz'>('content');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const lessonIdx = lessons.findIndex(l => l.id === id);
  const lesson = lessons[lessonIdx];

  useEffect(() => {
    if (id) setLastLesson(id);
    setActiveTab('content');
    window.scrollTo(0, 0);
  }, [id]);

  if (!lesson) return null;

  const nextLesson = lessons[lessonIdx + 1];
  const prevLesson = lessons[lessonIdx - 1];

  const filteredLessons = lessons.filter(l => 
    l.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categories = Array.from(new Set(lessons.map(l => l.category)));

  return (
    <div className="flex h-screen bg-slate-950 overflow-hidden">
      {/* Mobile Sidebar Toggle */}
      <button 
        onClick={() => setIsSidebarOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center lg:hidden"
      >
        <Menu size={24} />
      </button>

      {/* Sidebar Navigation */}
      <AnimatePresence>
        {(isSidebarOpen || window.innerWidth >= 1024) && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className={cn(
              "fixed inset-y-0 left-0 z-50 w-80 bg-slate-900 border-r border-slate-800 flex flex-col lg:relative lg:translate-x-0",
              !isSidebarOpen && "hidden lg:flex"
            )}
          >
            <div className="p-6 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Layout size={18} className="text-white" />
                </div>
                <span className="text-lg font-black text-white tracking-tight">JS<span className="text-primary">MASTER</span></span>
              </div>
              <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-slate-400">
                <X size={20} />
              </button>
            </div>

            <div className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                <input
                  type="text"
                  placeholder="Search topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-300 focus:outline-none focus:border-primary transition-all"
                />
              </div>
            </div>

            <nav className="flex-1 overflow-y-auto p-4 space-y-8 custom-scrollbar">
              {categories.map(cat => (
                <div key={cat}>
                  <h3 className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-3 px-2">{cat}</h3>
                  <div className="space-y-1">
                    {filteredLessons.filter(l => l.category === cat).map(l => (
                      <button
                        key={l.id}
                        onClick={() => {
                          navigate(`/lesson/${l.id}`);
                          setIsSidebarOpen(false);
                        }}
                        className={cn(
                          "w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-all group",
                          l.id === id 
                            ? "bg-primary/10 text-primary font-bold border border-primary/20" 
                            : "text-slate-500 hover:text-slate-300 hover:bg-slate-800/50"
                        )}
                      >
                        {isCompleted(l.id) ? (
                          <CheckCircle2 size={16} className="text-green-500 shrink-0" />
                        ) : (
                          <Circle size={16} className="text-slate-700 shrink-0 group-hover:text-slate-500" />
                        )}
                        <span className="truncate">{l.title}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </nav>

            <div className="p-6 border-t border-slate-800 bg-slate-900/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-500">Overall Progress</span>
                <span className="text-xs font-bold text-primary">
                  {Math.round((state.completedLessons.length / lessons.length) * 100)}%
                </span>
              </div>
              <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${(state.completedLessons.length / lessons.length) * 100}%` }}
                  className="h-full bg-primary"
                />
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Workspace */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Workspace Header */}
        <header className="h-16 bg-slate-900/50 backdrop-blur-md border-b border-slate-800 flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/topics')}
              className="p-2 hover:bg-slate-800 text-slate-400 rounded-lg transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="h-4 w-px bg-slate-800" />
            <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setActiveTab('content')}
                className={cn(
                  "flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold transition-all",
                  activeTab === 'content' ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-slate-500 hover:text-slate-300"
                )}
              >
                <BookOpen size={14} /> Lesson
              </button>
              <button
                onClick={() => setActiveTab('lab')}
                className={cn(
                  "flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold transition-all",
                  activeTab === 'lab' ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-slate-500 hover:text-slate-300"
                )}
              >
                <Terminal size={14} /> Lab
              </button>
              <button
                onClick={() => setActiveTab('quiz')}
                className={cn(
                  "flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold transition-all",
                  activeTab === 'quiz' ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-slate-500 hover:text-slate-300"
                )}
              >
                <HelpCircle size={14} /> Quiz
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Live Session</span>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <AnimatePresence mode="wait">
            {activeTab === 'content' && (
              <motion.div
                key="content"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-6 md:p-12"
              >
                <LessonContent 
                  lesson={lesson} 
                  onNext={nextLesson ? () => navigate(`/lesson/${nextLesson.id}`) : undefined}
                  onPrev={prevLesson ? () => navigate(`/lesson/${prevLesson.id}`) : undefined}
                />
              </motion.div>
            )}

            {activeTab === 'lab' && (
              <motion.div
                key="lab"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="h-full p-6"
              >
                <div className="h-full flex flex-col gap-6">
                  <div className="shrink-0">
                    <h2 className="text-2xl font-bold text-white mb-2">Interactive Lab</h2>
                    <p className="text-slate-400 text-sm">Practice what you've learned in this live coding environment.</p>
                  </div>
                  <div className="flex-1 min-h-0">
                    <InteractiveLab 
                      initialCode={lesson.interactiveCode || lesson.codeExample} 
                      successCondition={lesson.successCondition}
                      onSuccess={() => toggleComplete(lesson.id)}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'quiz' && (
              <motion.div
                key="quiz"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="max-w-2xl mx-auto p-6 md:p-12"
              >
                <QuizPanel 
                  questions={lesson.quizQuestions} 
                  lessonId={lesson.id}
                  onComplete={(score) => saveScore(lesson.id, score)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
