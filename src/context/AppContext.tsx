import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemeColor = 'indigo' | 'yellow' | 'red';

interface AppState {
  completedLessons: string[];
  bookmarks: string[];
  quizScores: Record<string, number>;
  lastLessonId: string | null;
  theme: ThemeColor;
}

interface AppContextType {
  state: AppState;
  toggleComplete: (id: string) => void;
  toggleBookmark: (id: string) => void;
  saveScore: (id: string, score: number) => void;
  setLastLesson: (id: string) => void;
  setTheme: (theme: ThemeColor) => void;
  isCompleted: (id: string) => boolean;
  isBookmarked: (id: string) => boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem('js_master_state');
    const defaultState = {
      completedLessons: [],
      bookmarks: [],
      quizScores: {},
      lastLessonId: null,
      theme: 'indigo' as ThemeColor
    };
    
    if (!saved) return defaultState;
    
    const parsed = JSON.parse(saved);
    return {
      ...defaultState,
      ...parsed,
      theme: parsed.theme || 'indigo'
    };
  });

  useEffect(() => {
    localStorage.setItem('js_master_state', JSON.stringify(state));
    // Apply theme to document for global CSS variables if needed
    document.documentElement.setAttribute('data-theme', state.theme);
  }, [state]);

  const toggleComplete = (id: string) => {
    setState(prev => ({
      ...prev,
      completedLessons: prev.completedLessons.includes(id)
        ? prev.completedLessons.filter(i => i !== id)
        : [...prev.completedLessons, id]
    }));
  };

  const toggleBookmark = (id: string) => {
    setState(prev => ({
      ...prev,
      bookmarks: prev.bookmarks.includes(id)
        ? prev.bookmarks.filter(i => i !== id)
        : [...prev.bookmarks, id]
    }));
  };

  const saveScore = (id: string, score: number) => {
    setState(prev => ({
      ...prev,
      quizScores: { ...prev.quizScores, [id]: score }
    }));
  };

  const setLastLesson = (id: string) => {
    setState(prev => ({ ...prev, lastLessonId: id }));
  };

  const setTheme = (theme: ThemeColor) => {
    setState(prev => ({ ...prev, theme }));
  };

  const isCompleted = (id: string) => state.completedLessons.includes(id);
  const isBookmarked = (id: string) => state.bookmarks.includes(id);

  return (
    <AppContext.Provider value={{ 
      state, 
      toggleComplete, 
      toggleBookmark, 
      saveScore, 
      setLastLesson,
      setTheme,
      isCompleted,
      isBookmarked
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
