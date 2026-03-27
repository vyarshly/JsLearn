import React from 'react';
import { useApp, ThemeColor } from '../context/AppContext';
import { Palette, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const ThemeSwitcher: React.FC = () => {
  const { state, setTheme } = useApp();
  const [isOpen, setIsOpen] = React.useState(false);

  const themes: { id: ThemeColor; name: string; color: string }[] = [
    { id: 'indigo', name: 'Indigo', color: '#6366f1' },
    { id: 'yellow', name: 'Yellow', color: '#eab308' },
    { id: 'red', name: 'Red', color: '#ef4444' },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-primary transition-all flex items-center gap-2"
        title="Change Theme"
      >
        <Palette size={20} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setIsOpen(false)} 
            />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute right-0 mt-2 w-48 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl z-50 overflow-hidden p-2"
            >
              <div className="px-3 py-2 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                Select Theme
              </div>
              <div className="space-y-1">
                {themes.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      setTheme(t.id);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl transition-all ${
                      state.theme === t.id 
                        ? 'bg-primary/10 text-primary font-bold' 
                        : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-4 h-4 rounded-full shadow-sm" 
                        style={{ backgroundColor: t.color }}
                      />
                      <span className="text-sm">{t.name}</span>
                    </div>
                    {state.theme === t.id && <Check size={14} />}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemeSwitcher;
