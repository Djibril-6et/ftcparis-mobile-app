import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import App from './App';

export default function Main() {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
}