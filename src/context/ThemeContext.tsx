import React, { createContext, useContext, useEffect, useState } from 'react';

export type AccentColor = 'green' | 'blue' | 'pink' | 'purple' | 'orange' | 'sakura' | 'black';

interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
  accent: AccentColor;
  setAccent: (accent: AccentColor) => void;
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem('flatpaper_theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [accent, setAccentState] = useState<AccentColor>(() => {
    return (localStorage.getItem('flatpaper_accent') as AccentColor) || 'green';
  });

  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    // FlatPaper 原生 dark-mode 类名与 Tailwind .dark
    if (isDark) {
      root.classList.add('dark', 'dark-mode');
      body.classList.add('dark-mode');
      localStorage.setItem('flatpaper_theme', 'dark');
    } else {
      root.classList.remove('dark', 'dark-mode');
      body.classList.remove('dark-mode');
      localStorage.setItem('flatpaper_theme', 'light');
    }
  }, [isDark]);

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    root.setAttribute('data-accent', accent);
    body.setAttribute('data-accent', accent);
    localStorage.setItem('flatpaper_accent', accent);
  }, [accent]);

  // 全局快捷键 Cmd/Ctrl + K 打开搜索
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleTheme = () => setIsDark(prev => !prev);
  const setAccent = (color: AccentColor) => setAccentState(color);

  return (
    <ThemeContext.Provider
      value={{
        isDark,
        toggleTheme,
        accent,
        setAccent,
        searchOpen,
        setSearchOpen,
        mobileMenuOpen,
        setMobileMenuOpen
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
