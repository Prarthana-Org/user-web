import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import './Hero.css';

const Hero = () => {
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
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="hero-badge"
                    >
                        <span className="hero-badge-dot">
                            <span className="hero-badge-dot-ping" />
                            <span className="hero-badge-dot-solid" />
                        </span>
                        <span className="hero-badge-text">#1 Spiritual App in 2026</span>
                    </motion.div>

                    {/* Heading */}
                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        className="hero-title"
                    >
                        Start your <span className="gradient-text">spiritual journey</span> today
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="hero-subtitle"
                    >
                        Your personal temple for daily darshans, soothing chants, and ancient wisdom. Experience devotion like never before.
                    </motion.p>

                    {/* Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 25, scale: 0.92 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ delay: 0.45, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="hero-buttons"
                    >
                        <motion.button
                            type="button"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.55, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            className="hero-button"
                        >
                            <div className="hero-button-inner">
                                <span className="hero-button-label">Download on the</span>
                                <span className="hero-button-store">App Store</span>
                            </div>
                        </motion.button>

                        <motion.button
                            type="button"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.65, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            className="hero-button"
                        >
                            <div className="hero-button-inner">
                                <span className="hero-button-label">GET IT ON</span>
                                <span className="hero-button-store">Google Play</span>
                            </div>
                        </motion.button>
                    </motion.div>

                    {/* Verification Strip */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.55, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="hero-verification"
                    >
                        <div className="hero-verification-rating">
                            <Star size={16} fill="currentColor" className="text-yellow-500" />
                            <span className="hero-verification-rating-text">4.9/5 Rating</span>
                        </div>
                        <div className="hero-verification-divider" />
                        <span className="hero-verification-downloads">10k+ Downloads</span>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
