import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AppShowcase from './components/AppShowcase';
import Footer from './components/Footer';
import Features from './components/Features';
import Chatbot from './components/Chatbot';

export const ThemeContext = React.createContext(); // Kept for compatibility, always dark

const Starfield = () => {
  useEffect(() => {
    const canvas = document.getElementById('stars');
    const ctx = canvas.getContext('2d');
    let width, height;
    const stars = [];
    const numStars = 160;

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random(),
        y: Math.random(),
        r: Math.random() * 1.3 + 0.2,
        p: Math.random() * Math.PI * 2,
        s: 0.5 + Math.random()
      });
    }

    let animationFrameId;
    const draw = (time) => {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < numStars; i++) {
        const star = stars[i];
        const alpha = 0.25 + 0.45 * Math.abs(Math.sin(time / 1600 * star.s + star.p));
        ctx.globalAlpha = alpha;
        ctx.fillStyle = i % 9 === 0 ? '#E8B44A' : '#C9D4E4';
        ctx.beginPath();
        ctx.arc(star.x * width, star.y * height, star.r, 0, 7);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(draw);
    };

    draw(0);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas id="stars" />;
};

function App() {
  return (
    <ThemeContext.Provider value={{ theme: 'dark', toggleTheme: () => {} }}>
      <Starfield />
      <div className="relative min-h-screen bg-[var(--background-color)] text-[var(--text-primary)] transition-colors duration-300 z-10 selection:bg-orange-200 selection:text-orange-900">
        <Navbar />
        <main className="relative flex flex-col gap-16 md:gap-32">
          <div className="min-h-screen flex items-center justify-center pt-24 pb-16" id="home">
            <Hero />
          </div>

          <div className="py-16 md:py-32 bg-[var(--surface-color)]/30 backdrop-blur-sm border-y border-[var(--line)] shadow-sm" id="showcase">
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
