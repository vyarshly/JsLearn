import React from 'react';
import { motion } from 'motion/react';
import { 
  BookOpen, 
  Lightbulb, 
  AlertCircle, 
  CheckCircle2, 
  Terminal, 
  ChevronRight, 
  ChevronLeft,
  Bookmark,
  Check,
  Star
} from 'lucide-react';
import { Lesson } from '../../data/lessons';
import { CodeBlock } from '../CodeBlock';
import { cn } from '../../lib/utils';
import { useApp } from '../../context/AppContext';

interface LessonContentProps {
  lesson: Lesson;
  onNext?: () => void;
  onPrev?: () => void;
}

export const LessonContent: React.FC<LessonContentProps> = ({ lesson, onNext, onPrev }) => {
  const { toggleComplete, toggleBookmark, isCompleted, isBookmarked } = useApp();

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-20">
      {/* Hero Section */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <span className={cn(
            "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border",
            lesson.difficulty === 'Beginner' ? "bg-green-500/10 text-green-400 border-green-500/20" :
            lesson.difficulty === 'Intermediate' ? "bg-primary/10 text-primary border-primary/20" :
            "bg-red-500/10 text-red-400 border-red-500/20"
          )}>
            {lesson.difficulty}
          </span>
          <span className="text-slate-600">•</span>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{lesson.category}</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight leading-tight">
          {lesson.title}
        </h1>
        
        <p className="text-xl text-slate-400 leading-relaxed font-medium">
          {lesson.summary}
        </p>

        <div className="flex gap-3 mt-8">
          <button 
            onClick={() => toggleComplete(lesson.id)}
            className={cn(
              "flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all border",
              isCompleted(lesson.id) 
                ? "bg-green-600 border-green-500 text-white" 
                : "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700"
            )}
          >
            {isCompleted(lesson.id) ? <Check size={18} /> : <CheckCircle2 size={18} />}
            {isCompleted(lesson.id) ? 'Completed' : 'Mark as Complete'}
          </button>
          <button 
            onClick={() => toggleBookmark(lesson.id)}
            className={cn(
              "flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all border",
              isBookmarked(lesson.id)
                ? "bg-primary border-primary-hover text-white"
                : "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700"
            )}
          >
            <Bookmark size={18} fill={isBookmarked(lesson.id) ? "currentColor" : "none"} />
            {isBookmarked(lesson.id) ? 'Bookmarked' : 'Bookmark'}
          </button>
        </div>
      </section>

      {/* Main Content */}
      <section className="prose prose-invert max-w-none">
        <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 md:p-10">
          <div className="text-slate-300 text-lg leading-relaxed space-y-6 whitespace-pre-line">
            {lesson.explanation}
          </div>

          {/* Key Points */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
            {lesson.keyPoints.map((point, i) => (
              <div key={i} className="flex items-start gap-3 p-4 bg-slate-800/50 rounded-2xl border border-slate-700/50">
                <div className="mt-1 bg-primary/20 p-1 rounded-lg">
                  <Star size={14} className="text-primary" fill="currentColor" />
                </div>
                <span className="text-sm font-medium text-slate-300">{point}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Code Section */}
      <section>
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
            <Terminal size={18} className="text-primary" />
          </div>
          <h3 className="text-xl font-bold text-white">Code Implementation</h3>
        </div>
        <div className="space-y-4">
          <CodeBlock code={lesson.codeExample} />
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Expected Output</h4>
            <pre className="text-sm font-mono text-green-400 bg-slate-950 p-4 rounded-xl border border-slate-800">
              {lesson.output}
            </pre>
          </div>
        </div>
      </section>

      {/* Tips & Mistakes */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-8 bg-red-500/5 border border-red-500/10 rounded-3xl">
          <div className="flex items-center gap-2 mb-4 text-red-400">
            <AlertCircle size={20} />
            <h4 className="font-bold">Common Mistakes</h4>
          </div>
          <ul className="space-y-3">
            {lesson.commonMistakes.map((m, i) => (
              <li key={i} className="text-sm text-slate-400 flex items-start gap-2">
                <span className="text-red-500 mt-1">•</span> {m}
              </li>
            ))}
          </ul>
        </div>
        <div className="p-8 bg-yellow-500/5 border border-yellow-500/10 rounded-3xl">
          <div className="flex items-center gap-2 mb-4 text-yellow-400">
            <Lightbulb size={20} />
            <h4 className="font-bold">Exam Tips</h4>
          </div>
          <ul className="space-y-3">
            {lesson.examTips.map((t, i) => (
              <li key={i} className="text-sm text-slate-400 flex items-start gap-2">
                <span className="text-yellow-500 mt-1">•</span> {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Practice Task */}
      <section className="p-8 bg-primary/5 border border-primary/10 rounded-3xl">
        <div className="flex items-center gap-2 mb-4 text-primary">
          <BookOpen size={20} />
          <h4 className="font-bold">Practice Task</h4>
        </div>
        <p className="text-slate-300 font-medium leading-relaxed">
          {lesson.practiceTask}
        </p>
      </section>

      {/* Navigation */}
      <section className="flex justify-between items-center pt-12 border-t border-slate-800">
        {onPrev ? (
          <button 
            onClick={onPrev}
            className="group flex items-center gap-4 text-slate-500 hover:text-white transition-all"
          >
            <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:border-primary/50 group-hover:bg-primary/10 transition-all">
              <ChevronLeft size={24} />
            </div>
            <div className="flex flex-col items-start">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-600">Previous</span>
              <span className="font-bold">Back</span>
            </div>
          </button>
        ) : <div />}

        {onNext ? (
          <button 
            onClick={onNext}
            className="group flex items-center gap-4 text-slate-500 hover:text-white transition-all text-right"
          >
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-600">Next Lesson</span>
              <span className="font-bold">Continue</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:border-primary/50 group-hover:bg-primary/10 transition-all">
              <ChevronRight size={24} />
            </div>
          </button>
        ) : (
          <button 
            onClick={() => window.history.back()}
            className="px-8 py-3 bg-primary hover:bg-primary-hover text-white rounded-xl font-bold transition-all shadow-lg shadow-primary/20"
          >
            Finish Module
          </button>
        )}
      </section>
    </div>
  );
};
