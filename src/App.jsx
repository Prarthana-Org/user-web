import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AppShowcase from './components/AppShowcase';
import Footer from './components/Footer';
import Features from './components/Features';
import Chatbot from './components/Chatbot';

export const ThemeContext = React.createContext();

function App() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="min-h-screen bg-[var(--background-color)] text-[var(--text-primary)] transition-colors duration-300 selection:bg-orange-200 selection:text-orange-900">
        <Navbar />
        <main className="relative flex flex-col gap-16 md:gap-32">
          <div className="min-h-screen flex items-center justify-center pt-24 pb-16" id="home">
            <Hero />
          </div>

          <div className="py-16 md:py-32 bg-[var(--surface-color)] shadow-sm" id="showcase">
            <AppShowcase />
          </div>

          <div className="py-16 md:py-32">
            <Features />
          </div>
        </main>
        <Chatbot />
        <Footer />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
