import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AppShowcase from './components/AppShowcase';
import Footer from './components/Footer';
import Features from './components/Features';
import Chatbot from './components/Chatbot';

function App() {
  return (
    <div className="min-h-screen bg-[#FFF3E0] selection:bg-orange-200">
      <Navbar />
      <main className="relative">
        <div className="section-spacing" id="home">
          <Hero />
        </div>

        <div className="section-spacing bg-white/30" id="showcase">
          <AppShowcase />
        </div>

        <div className="section-spacing" id="features">
          <Features />
        </div>
      </main>
      <Chatbot />
      <Footer />
    </div>
  );
}

export default App;
