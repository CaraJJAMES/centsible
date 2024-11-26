import React, { createContext, useContext, useState } from 'react';

export type ThemeType = 'default' | 'ocean' | 'sunset' | 'forest';

interface ThemeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'default',
  setTheme: () => {},
});

export const themeGradients = {
  default: 'from-purple-100 to-pink-100',
  ocean: 'from-blue-100 to-cyan-100',
  sunset: 'from-orange-100 to-rose-100',
  forest: 'from-green-100 to-emerald-100',
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeType>('default');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}