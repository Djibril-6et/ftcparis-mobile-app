import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { Appearance, ColorSchemeName } from 'react-native';

const lightColors = {
  primary: '#007bff',
  background: '#ffffff',
  backgroundReverse: '#000000',
  surface: '#f5f5f5',
  text: '#000000',
  textSecondary: '#666666',
  border: '#555',
  error: '#ff6b6b',
  buttonBackground: '#1a1a1a',
  buttonText: '#ffffff',
};

const darkColors = {
  primary: '#007bff',
  background: '#121212',
  backgroundReverse: '#ffffff',
  surface: '#1a1a1a',
  text: '#ffffff',
  textSecondary: '#aaaaaa',
  border: '#ccc',
  error: '#ff6b6b',
  buttonBackground: '#f5f5f5',
  buttonText: '#000000',
};

export type Colors = typeof lightColors;

type ThemeContextType = {
  theme: ColorSchemeName;
  isDark: boolean;
  colors: Colors;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  isDark: false,
  colors: lightColors,
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<ColorSchemeName>(Appearance.getColorScheme());
  
  useEffect(() => {
    const listener = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(colorScheme);
    });
    return () => listener.remove();
  }, []);
  
  const isDark = theme === 'dark';
  const colors = isDark ? darkColors : lightColors;
  
  return (
    <ThemeContext.Provider value={{ theme, isDark, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
