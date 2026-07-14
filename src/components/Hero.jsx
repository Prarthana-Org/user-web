import React from 'react';
import { motion } from 'framer-motion';
import './Hero.css';

const Hero = () => {
    return (
        <section className="hero-section">
            <div className="hero-content">
                <div className="hero-inner">
                    {/* The "Singularity" burst */}
                    <div className="bang-container">
                        <div className="bang" aria-hidden="true"></div>
                    </div>

                    {/* OM replaced by an abstract node or kept if scientific context allows? The plan says "no religious framing". I will use a scientific icon or just the bang. */}

                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="hero-badge"
                    >
                        <span className="hero-badge-text">BACKED BY SCIENCE · ROOTED IN TRADITION</span>
                    </motion.div>

                    {/* Heading */}
                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        className="hero-title"
                    >
                        Rewire Your Mind.<br />
                        <em>Elevate</em> Your Life.
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="hero-subtitle"
                    >
                        Ancient practices meet modern neuroscience. Meditation, breathwork, and sound therapy — all in one unified interface.
                    </motion.p>

                    <div className="scrolldn">Explore the Interface</div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
