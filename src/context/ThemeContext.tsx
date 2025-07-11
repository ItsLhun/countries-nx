import React, { createContext, useContext, useEffect, useState } from 'react';

import { Theme, THEMES } from '@/constants/theme';

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(THEMES.LIGHT);

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    const isValid = stored === THEMES.DARK || stored === THEMES.LIGHT;
    const initialTheme: Theme = isValid ? (stored as Theme) : THEMES.LIGHT;

    document.documentElement.setAttribute('data-theme', initialTheme);
    setTheme(initialTheme);
  }, []);

  const toggleTheme = () => {
    const next = theme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK;
    document.documentElement.setAttribute('data-theme', next);
    setTheme(next);
    localStorage.setItem('theme', next);
  };

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};
