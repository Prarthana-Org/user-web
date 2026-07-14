import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Brain, BookOpen, MapPin, Target, Zap, Network, Archive, Library } from 'lucide-react';
import './Features.css';

const features = [
    {
        icon: <Activity size={32} color="var(--thread)" />,
        title: "Sound Therapy & Frequencies",
        desc: "Binaural beats, Solfeggio frequencies, and ancient acoustic patterns designed to alter brainwave states.",
    },
    {
        icon: <Zap size={32} color="var(--sindoor)" />,
        title: "Live Immersive Streams",
        desc: "High-fidelity live feeds from sacred spaces. Synchronize your practice with thousands globally.",
    },
    {
        icon: <Brain size={32} color="var(--t1)" />,
        title: "Structured Learning Paths",
        desc: "Cognitive frameworks extracted from Upanishadic texts and translated into actionable mental models.",
    },
    {
        icon: <MapPin size={32} color="var(--thread)" />,
        title: "Heritage & Sacred Sites",
        desc: "Geospatial mapping of high-resonance acoustic sites and historically significant temples.",
    },
    {
        icon: <Target size={32} color="var(--sindoor)" />,
        title: "Repetition Tracker",
        desc: "Quantify your practice. Log cycles, track neuro-plasticity metrics, and build consistency.",
    },
    {
        icon: <Zap size={32} color="var(--t1)" />,
        title: "Bite-Sized Wisdom",
        desc: "Micro-learning modules. High-density information compressed into 60-second video formats.",
    },
    {
        icon: <Network size={32} color="var(--thread)" />,
        title: "1-on-1 Mentorship",
        desc: "Direct neural alignment. Connect with advanced practitioners for personalized cognitive tuning.",
    },
    {
        icon: <Archive size={32} color="var(--sindoor)" />,
        title: "Ancient Texts Archive",
        desc: "Searchable, annotated repository of primary source texts translated for the modern mind.",
    },
    {
        icon: <Library size={32} color="var(--t1)" />,
        title: "Your Saved Collection",
        desc: "Personalized knowledge graph. Bookmark paradigms, soundscapes, and metrics in one place.",
    }
];

const BreatheWidget = () => {
    const [phase, setPhase] = useState(0); // 0: inhale, 1: hold, 2: exhale, 3: hold
    const phases = [
        { text: "INHALE", duration: 4000, scale: 1.5, color: "var(--t1)" },
        { text: "HOLD", duration: 4000, scale: 1.5, color: "var(--thread)" },
        { text: "EXHALE", duration: 4000, scale: 1, color: "var(--sindoor)" },
        { text: "HOLD", duration: 4000, scale: 1, color: "var(--body)" }
    ];

    useEffect(() => {
        const timer = setTimeout(() => {
            setPhase((p) => (p + 1) % 4);
        }, phases[phase].duration);
        return () => clearTimeout(timer);
    }, [phase]);

    return (
        <div className="breathe-widget glass-panel">
            <p className="eyebrow text-center mb-6">Autonomic Regulation</p>
            <div className="breathe-circle-container">
                <motion.div
                    className="breathe-circle"
                    animate={{ 
                        scale: phases[phase].scale,
                        borderColor: phases[phase].color,
                        boxShadow: `0 0 20px ${phases[phase].color}40`
                    }}
                    transition={{ duration: 4, ease: "easeInOut" }}
                />
                <div className="breathe-text">
                    <motion.p
                        key={phase}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="font-mono text-sm tracking-widest"
                        style={{ color: phases[phase].color }}
                    >
                        {phases[phase].text}
                    </motion.p>
                </div>
            </div>
        </div>
    );
};

const WisdomCard = () => {
    const [flipped, setFlipped] = useState(false);

    return (
        <div className="wisdom-card-container" onClick={() => setFlipped(!flipped)}>
            <motion.div 
                className="wisdom-card"
                animate={{ rotateY: flipped ? 180 : 0 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
            >
                <div className="wisdom-face wisdom-front glass-panel">
                    <p className="eyebrow">Quantum Insight</p>
                    <div className="wisdom-icon">✧</div>
                    <p className="font-mono text-xs text-[var(--body)] uppercase tracking-widest mt-4">Tap to decode</p>
                </div>
                <div className="wisdom-face wisdom-back glass-panel">
                    <p className="font-disp text-xl text-[var(--ink)] italic leading-tight">
                        "The observer is not separate from the observed. The universe is a self-experiencing feedback loop."
                    </p>
                    <p className="font-mono text-[10px] text-[var(--thread)] uppercase tracking-widest mt-4 border-t border-[var(--line)] pt-2">
                        Principle of Non-Duality
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

const Features = () => {
    return (
        <section id="features" className="features-section">
            <div className="features-content">
                <header className="features-header">
                    <p className="eyebrow mb-4">The Toolkit</p>
                    <h2 className="features-title font-disp text-5xl">
                        A Complete Framework for <br/><span className="gradient-text italic">Mental Evolution</span>
                    </h2>
                    <p className="features-subtitle mt-4">
                        Everything you need to calibrate your nervous system and expand cognitive capacity.
                    </p>
                </header>

                {/* Interactive Widgets Row */}
                <div className="interactive-widgets-row mb-20 w-full max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
                    <BreatheWidget />
                    <WisdomCard />
                </div>

                <div className="features-grid">
                    {features.map((feature, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: (idx % 3) * 0.1, duration: 0.5 }}
                            whileHover={{ y: -4, borderColor: 'var(--thread-dim)' }}
                            className="feature-card glass-panel"
                        >
                            <div className="feature-card-icon-wrapper">
                                {feature.icon}
                            </div>
                            <h3 className="feature-card-title font-disp text-xl">{feature.title}</h3>
                            <p className="feature-card-desc font-sans text-sm text-[var(--body)]">{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>

                <div className="features-spacer" aria-hidden="true" />

                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="features-pro-banner glass-panel relative overflow-hidden"
                >
                    <div className="absolute -right-20 -top-20 w-64 h-64 bg-[var(--thread)] rounded-full blur-[100px] opacity-10" />

                    <div className="pro-banner-content relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="pro-banner-text text-left">
                            <p className="eyebrow text-[var(--thread)] mb-2">PRO UPGRADE</p>
                            <h3 className="font-disp text-3xl text-[var(--ink)] mb-4">Unlock the Full Matrix</h3>
                            <ul className="space-y-2">
                                {['Advanced Neural Audio', 'Offline Protocol Access', 'Uncapped Mentorship', 'High-Fidelity Streams'].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 font-mono text-xs text-[var(--body)] uppercase tracking-wide">
                                        <div className="w-1 h-1 bg-[var(--thread)] rounded-full" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <button className="btn-primary whitespace-nowrap px-8 py-4">
                            INITIALIZE PRO
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Features;
