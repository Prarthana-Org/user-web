import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AppShowcase from './components/AppShowcase';
import Footer from './components/Footer';
import Features from './components/Features';
import Chatbot from './components/Chatbot';
import AboutUs from './components/AboutUs';
import KnowledgeTree from './components/KnowledgeTree';
import WhyPrarthana from './components/WhyPrarthana';
import { ThemeContext } from './ThemeContext';
import GalaxyBackground from './components/GalaxyBackground';
//comment
function App() {
  const [theme, setTheme] = useState('light');
  const [currentHash, setCurrentHash] = useState(window.location.hash);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    }

    const handleHashChange = () => setCurrentHash(window.location.hash);
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const isSeparatePage = currentHash === '#knowledge-tree' || currentHash === '#about-us';

  if (isSeparatePage) {
    return (
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <div className="min-h-screen bg-transparent text-[var(--text-primary)] transition-colors duration-300 selection:bg-orange-200 selection:text-orange-900">
          <GalaxyBackground theme={theme} />
          <Navbar />
          {currentHash === '#knowledge-tree' && <KnowledgeTree />}
          {currentHash === '#about-us' && <AboutUs />}
          <Footer />
        </div>
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="min-h-screen bg-transparent text-[var(--text-primary)] transition-colors duration-300 selection:bg-orange-200 selection:text-orange-900">
        <GalaxyBackground theme={theme} />
        <Navbar />
        <main className="relative flex flex-col gap-16 md:gap-32">
          <div className="min-h-screen flex items-center justify-center pt-24 pb-16" id="home">
            <Hero />
          </div>

          <div className="pt-0 pb-0 -mt-12 md:-mt-24" id="showcase">
            <AppShowcase />
          </div>

          <div className="pt-0 pb-16 md:pb-32 -mt-12 md:-mt-24" id="features">
            <Features />
          </div>

          <div id="why-prarthana">
            <WhyPrarthana />
          </div>
        </main>
        <Chatbot />
        <Footer />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
