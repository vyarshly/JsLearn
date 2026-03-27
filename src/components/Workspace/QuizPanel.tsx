import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, XCircle, RotateCcw, Trophy, ArrowRight, HelpCircle } from 'lucide-react';
import { QuizQuestion } from '../../data/lessons';
import { cn } from '../../lib/utils';
import confetti from 'canvas-confetti';

interface QuizPanelProps {
  questions: QuizQuestion[];
  onComplete: (score: number) => void;
  lessonId: string;
}

export const QuizPanel: React.FC<QuizPanelProps> = ({ questions, onComplete, lessonId }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const handleSelect = (idx: number) => {
    if (isAnswered) return;
    setSelectedIdx(idx);
    setIsAnswered(true);
    
    if (idx === questions[currentIdx].correctAnswer) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(c => c + 1);
      setSelectedIdx(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
      if (score + (selectedIdx === questions[currentIdx].correctAnswer ? 1 : 0) === questions.length) {
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#6366f1', '#a855f7', '#ec4899']
        });
      }
      onComplete(score);
    }
  };

  if (isFinished) {
    const percentage = (score / questions.length) * 100;
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 text-center"
      >
        <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <Trophy className="text-primary" size={40} />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Quiz Results</h3>
        <p className="text-slate-400 mb-8">
          You scored <span className="text-white font-bold">{score}</span> out of {questions.length}
        </p>
        
        <div className="relative h-4 bg-slate-800 rounded-full overflow-hidden mb-8">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-purple-500"
          />
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => {
              setCurrentIdx(0);
              setSelectedIdx(null);
              setIsAnswered(false);
              setScore(0);
              setIsFinished(false);
            }}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl transition-all"
          >
            <RotateCcw size={18} /> Retry
          </button>
          <button
            onClick={() => window.history.back()}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary-hover text-white rounded-xl transition-all shadow-lg shadow-primary/20"
          >
            Continue <ArrowRight size={18} />
          </button>
        </div>
      </motion.div>
    );
  }

  const q = questions[currentIdx];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
            <HelpCircle className="text-primary" size={20} />
          </div>
          <div>
            <h4 className="text-white font-bold">Knowledge Check</h4>
            <p className="text-xs text-slate-500">Question {currentIdx + 1} of {questions.length}</p>
          </div>
        </div>
        <div className="flex gap-1">
          {questions.map((_, i) => (
            <div
              key={i}
              className={cn(
                "h-1.5 rounded-full transition-all duration-500",
                i === currentIdx ? "w-8 bg-primary" : i < currentIdx ? "w-4 bg-green-500" : "w-4 bg-slate-800"
              )}
            />
          ))}
        </div>
      </div>

      <h3 className="text-xl font-semibold text-white leading-snug mb-8">{q.question}</h3>

      <div className="space-y-3">
        {q.options.map((option, idx) => {
          const isCorrect = idx === q.correctAnswer;
          const isSelected = idx === selectedIdx;
          
          let btnClass = "bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300";
          if (isAnswered) {
            if (isCorrect) btnClass = "bg-green-500/10 border-green-500/50 text-green-400";
            else if (isSelected) btnClass = "bg-red-500/10 border-red-500/50 text-red-400";
            else btnClass = "bg-slate-900/50 border-slate-800/50 text-slate-600 opacity-50";
          }

          return (
            <motion.button
              key={idx}
              whileHover={!isAnswered ? { x: 4 } : {}}
              whileTap={!isAnswered ? { scale: 0.98 } : {}}
              onClick={() => handleSelect(idx)}
              disabled={isAnswered}
              className={cn(
                "w-full text-left p-5 rounded-2xl border transition-all flex items-center justify-between group",
                btnClass
              )}
            >
              <span className="font-medium">{option}</span>
              {isAnswered && isCorrect && <CheckCircle2 size={20} className="text-green-500" />}
              {isAnswered && isSelected && !isCorrect && <XCircle size={20} className="text-red-500" />}
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {isAnswered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 p-6 bg-slate-900/80 border border-slate-800 rounded-2xl"
          >
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              <span className="text-primary font-bold block mb-1">Explanation:</span>
              {q.explanation}
            </p>
            <button
              onClick={handleNext}
              className="w-full py-4 bg-primary hover:bg-primary-hover text-white rounded-xl font-bold transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
            >
              {currentIdx < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
              <ArrowRight size={18} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
