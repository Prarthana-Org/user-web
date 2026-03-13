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
        <div className="min-h-screen grid place-items-center pt-24 md:pt-28 pb-24 md:pb-28" id="home">
          <Hero />
        </div>

        <div className="section-spacing bg-white/30" id="showcase">
          <AppShowcase />
        </div>

        <div className="section-spacing">
          <Features />
        </div>
      </main>
      <Chatbot />
      <Footer />
    </div>
  );
}

export default App;
