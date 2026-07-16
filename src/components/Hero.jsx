import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import './Hero.css';

const ChakraModel = () => {
    return (
        <div className="chakra-hero-main" tabIndex="0" aria-label="Prarthana logo — hover to spin">
            <div className="chakra-glow-main"></div>
            <svg className="chakra-svg-main outer" viewBox="0 0 200 200">
                <g className="petals">
                    {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(angle => (
                        <ellipse key={angle} cx="100" cy="26" rx="7" ry="15" fill="var(--amber)" opacity=".85" transform={`rotate(${angle} 100 100)`} />
                    ))}
                </g>
            </svg>
            <svg className="chakra-svg-main spokes" viewBox="0 0 200 200">
                <circle cx="100" cy="100" r="74" fill="none" stroke="var(--chakra-stroke)" strokeWidth="2" opacity=".5" />
                <g className="spoke-lines">
                    <path d="M154.0 100.0L172.0 100.0" stroke="var(--chakra-stroke)" strokeWidth="1.6" opacity=".6" />
                    <path d="M152.2 114.0L169.5 118.6" stroke="var(--chakra-stroke)" strokeWidth="1.6" opacity=".6" />
                    <path d="M146.8 127.0L162.4 136.0" stroke="var(--chakra-stroke)" strokeWidth="1.6" opacity=".6" />
                    <path d="M138.2 138.2L150.9 150.9" stroke="var(--chakra-stroke)" strokeWidth="1.6" opacity=".6" />
                    <path d="M127.0 146.8L136.0 162.4" stroke="var(--chakra-stroke)" strokeWidth="1.6" opacity=".6" />
                    <path d="M114.0 152.2L118.6 169.5" stroke="var(--chakra-stroke)" strokeWidth="1.6" opacity=".6" />
                    <path d="M100.0 154.0L100.0 172.0" stroke="var(--chakra-stroke)" strokeWidth="1.6" opacity=".6" />
                    <path d="M86.0 152.2L81.4 169.5" stroke="var(--chakra-stroke)" strokeWidth="1.6" opacity=".6" />
                    <path d="M73.0 146.8L64.0 162.4" stroke="var(--chakra-stroke)" strokeWidth="1.6" opacity=".6" />
                    <path d="M61.8 138.2L49.1 150.9" stroke="var(--chakra-stroke)" strokeWidth="1.6" opacity=".6" />
                    <path d="M53.2 127.0L37.6 136.0" stroke="var(--chakra-stroke)" strokeWidth="1.6" opacity=".6" />
                    <path d="M47.8 114.0L30.5 118.6" stroke="var(--chakra-stroke)" strokeWidth="1.6" opacity=".6" />
                    <path d="M46.0 100.0L28.0 100.0" stroke="var(--chakra-stroke)" strokeWidth="1.6" opacity=".6" />
                    <path d="M47.8 86.0L30.5 81.4" stroke="var(--chakra-stroke)" strokeWidth="1.6" opacity=".6" />
                    <path d="M53.2 73.0L37.6 64.0" stroke="var(--chakra-stroke)" strokeWidth="1.6" opacity=".6" />
                    <path d="M61.8 61.8L49.1 49.1" stroke="var(--chakra-stroke)" strokeWidth="1.6" opacity=".6" />
                    <path d="M73.0 53.2L64.0 37.6" stroke="var(--chakra-stroke)" strokeWidth="1.6" opacity=".6" />
                    <path d="M86.0 47.8L81.4 30.5" stroke="var(--chakra-stroke)" strokeWidth="1.6" opacity=".6" />
                    <path d="M100.0 46.0L100.0 28.0" stroke="var(--chakra-stroke)" strokeWidth="1.6" opacity=".6" />
                    <path d="M114.0 47.8L118.6 30.5" stroke="var(--chakra-stroke)" strokeWidth="1.6" opacity=".6" />
                    <path d="M127.0 53.2L136.0 37.6" stroke="var(--chakra-stroke)" strokeWidth="1.6" opacity=".6" />
                    <path d="M138.2 61.8L150.9 49.1" stroke="var(--chakra-stroke)" strokeWidth="1.6" opacity=".6" />
                    <path d="M146.8 73.0L162.4 64.0" stroke="var(--chakra-stroke)" strokeWidth="1.6" opacity=".6" />
                    <path d="M152.2 86.0L169.5 81.4" stroke="var(--chakra-stroke)" strokeWidth="1.6" opacity=".6" />
                </g>
                <circle cx="100" cy="100" r="52" fill="none" stroke="var(--chakra-stroke)" strokeWidth="2.5" />
            </svg>
            <div className="chakra-ping-main"></div>
            <div className="chakra-ping-main d2"></div>
            <svg className="meditator-main" viewBox="0 0 100 100">
                <defs>
                    <radialGradient id="medg2" cx="50%" cy="35%" r="70%">
                        <stop offset="0" stopColor="var(--meditator-top)" />
                        <stop offset="1" stopColor="var(--meditator-bottom)" />
                    </radialGradient>
                </defs>
                <circle cx="50" cy="50" r="46" fill="url(#medg2)" />
                <g fill="#fff" opacity=".95">
                    <circle cx="50" cy="34" r="8.5" />
                    <path d="M50 44c-9 0-16 6.4-16 15 0 5.2 3 8.8 5.6 10.8-4 1.8-9.6 3.4-13.8 7.6-.8.8-.3 2 .8 2h46.8c1.1 0 1.6-1.2.8-2-4.2-4.2-9.8-5.8-13.8-7.6 2.6-2 5.6-5.6 5.6-10.8 0-8.6-7-15-16-15z" />
                </g>
                <circle cx="33" cy="64" r="2.4" fill="#fff" />
                <circle cx="67" cy="64" r="2.4" fill="#fff" />
            </svg>
        </div>
    );
};

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

                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="hero-badge"
                    >
                        <span className="hero-badge-dot">
                            <span className="hero-badge-dot-ping" />
                            <span className="hero-badge-dot-solid" />
                        </span>
                        <span className="hero-badge-text">#1 Spiritual App in 2026</span>
                    </motion.div>

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
                <div className="hero-model" style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <ChakraModel />
                </div>
            </div>
        </section>
    );
};

export default Hero;
