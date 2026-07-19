import React from 'react';
import { useContext } from 'react';
import { ThemeContext } from '../ThemeContext';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Star, ChevronDown } from 'lucide-react';
import './Hero.css';

import ChakraModel3D from './ChakraModel3D';

const Hero = () => {
    const { theme } = useContext(ThemeContext);
    return (
        <section className="hero-section">
            {/* Dynamic Background Elements */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                    rotate: [0, 90, 0]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="hero-bg-blob-orange"
            />
            <motion.div
                animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
                transition={{ duration: 8, repeat: Infinity }}
                className="hero-bg-blob-pink"
            />

            <div className="hero-content">
                <div className="hero-inner">

                    {/* Eyebrow */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="hero-eyebrow"
                        style={{ color: '#d4a373', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.5rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '12px' }}
                    >
                        <span style={{ width: '24px', height: '1px', backgroundColor: '#d4a373', display: 'inline-block' }}></span>
                        SCIENCE WITH SPIRITUALITY
                    </motion.div>

                    {/* Heading */}
                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        className="hero-title"
                    >
                        Ancient wisdom of Bhārat, decoded by <span className="gradient-text">science.</span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="hero-subtitle"
                    >
                        Reviving and modernising the timeless culture of Bhārat — traditional practices grounded in scientific fact, and the great literature of the scriptures, presented to the world.
                    </motion.p>

                    {/* Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 25, scale: 0.92 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ delay: 0.45, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="hero-buttons mt-4"
                    >
                        <motion.button
                            type="button"
                            onClick={() => {
                                window.location.hash = '#showcase';
                                setTimeout(() => {
                                    const el = document.querySelector('#showcase');
                                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                                }, 50);
                            }}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ delay: 0.55, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            className="btn-primary shadow-lg shadow-orange-500/30 w-full sm:w-auto text-sm sm:text-base flex-1 whitespace-nowrap"
                            style={{ padding: '12px 16px', cursor: 'pointer' }}
                        >
                            Begin your journey
                        </motion.button>

                        <motion.button
                            type="button"
                            onClick={() => {
                                window.location.hash = '#features';
                                setTimeout(() => {
                                    const el = document.querySelector('#features');
                                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                                }, 50);
                            }}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ delay: 0.65, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            className="btn-glass border-2 border-orange-500/50 hover:border-orange-500 hover:bg-orange-500/10 text-[var(--text-primary)] w-full sm:w-auto text-sm sm:text-base flex-1 whitespace-nowrap"
                            style={{ padding: '12px 16px', cursor: 'pointer', border: '2px solid rgba(255, 107, 53, 0.5)' }}
                        >
                            Explore features
                        </motion.button>
                    </motion.div>
                </div>
                <div className="hero-model w-full md:w-1/2 flex justify-center items-center h-[400px] md:h-[600px]">
                    <ChakraModel3D theme={theme} />
                </div>
            </div>

            {/* Mobile Scroll Indicator */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 md:hidden">
                <button
                    onClick={() => {
                        window.location.hash = '#showcase';
                        setTimeout(() => {
                            const el = document.querySelector('#showcase');
                            if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }, 50);
                    }}
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-orange-500/10 text-orange-500 hover:bg-orange-500/20 transition-colors animate-bounce"
                    aria-label="Scroll to next section"
                >
                    <ChevronDown size={24} strokeWidth={2.5} />
                </button>
            </div>
        </section>
    );
};

export default Hero;
