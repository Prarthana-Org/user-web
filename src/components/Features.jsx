import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Music, Video, BookOpen, MapPin, Star, Radio, Hash, VideoIcon, Library } from 'lucide-react';
import './Features.css';

const features = [
    {
        icon: <Music size={32} color="#DB2777" />,
        title: "Devotional Audio",
        desc: "Listen to thousands of bhajans, aartis, and mantras. Create your own playlists for daily meditation.",
        variant: "pink"
    },
    {
        icon: <Video size={32} color="#0891B2" />,
        title: "Live Darshan",
        desc: "Watch live streams from major temples across India. Never miss a moment of divine connection.",
        variant: "cyan"
    },
    {
        icon: <BookOpen size={32} color="#2563EB" />,
        title: "Spiritual Courses",
        desc: "Deepen your knowledge with structured courses on Vedas, Upanishads, and Meditation techniques.",
        variant: "blue"
    },
    {
        icon: <MapPin size={32} color="#059669" />,
        title: "Locate Temples",
        desc: "Find nearby temples, check timings, and get directions instantly with our temple locator.",
        variant: "emerald"
    },
    {
        icon: <Hash size={32} color="#EA580C" />,
        title: "Chant Counter",
        desc: "Count your mantras and track your japa practice. Choose from Om, Gayatri, Shiva Mantra, and more.",
        variant: "orange"
    },
    {
        icon: <VideoIcon size={32} color="#0D9488" />,
        title: "Prarthana Shorts",
        desc: "Short-form spiritual videos for quick inspiration. Swipe through divine wisdom in bite-sized format.",
        variant: "teal"
    },
    {
        icon: <Radio size={32} color="#7C3AED" />,
        title: "Video Call",
        desc: "Connect live with spiritual guides and mentors. Get personalized guidance on your spiritual journey.",
        variant: "violet"
    },
    {
        icon: <BookOpen size={32} color="#2563EB" />,
        title: "Vedas Library",
        desc: "Explore sacred texts, Vedas, Upanishads, and ancient scriptures. Access wisdom at your fingertips.",
        variant: "indigo"
    },
    {
        icon: <Library size={32} color="#BE185D" />,
        title: "Media Library",
        desc: "Your saved bhajans, courses, and favorites. All your spiritual content in one place.",
        variant: "rose"
    }
];

const Features = () => {
    const gridRef = useRef(null);

    useEffect(() => {
        const grid = gridRef.current;
        if (!grid) return;

        let animationFrameId;
        let isHovered = false;

        const scroll = () => {
            if (!isHovered) {
                // Extremely slow and smooth scroll (around 0.4px per frame)
                grid.scrollLeft += 0.4;
                
                // If we reach the end, reset back to 0
                if (grid.scrollLeft >= grid.scrollWidth - grid.clientWidth - 1) {
                    grid.scrollLeft = 0;
                }
            }
            animationFrameId = requestAnimationFrame(scroll);
        };

        const handleMouseEnter = () => {
            isHovered = true;
        };

        const handleMouseLeave = () => {
            isHovered = false;
        };

        // Attach hover listeners to each individual card rather than the grid container
        const cards = grid.querySelectorAll('.feature-card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', handleMouseEnter);
            card.addEventListener('mouseleave', handleMouseLeave);
        });

        animationFrameId = requestAnimationFrame(scroll);

        return () => {
            cancelAnimationFrame(animationFrameId);
            cards.forEach(card => {
                card.removeEventListener('mouseenter', handleMouseEnter);
                card.removeEventListener('mouseleave', handleMouseLeave);
            });
        };
    }, []);

    return (
        <section id="features" className="features-section">
            <div className="features-content">
                <header className="features-header">
                    <h2 className="features-title" style={{ maxWidth: "16ch", margin: "0 auto", marginBottom: "1.5rem" }}>
                        Everything you need for your <span className="gradient-text">Spiritual Path</span>
                    </h2>
                    <p className="features-subtitle">
                        Prarthana brings the temple experience to your fingertips with features designed to enhance your daily devotion.
                    </p>
                </header>

                <div className="features-grid" ref={gridRef}>
                    {features.map((feature, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1, duration: 0.5 }}
                            whileHover={{ y: -8, scale: 1.02 }}
                            className={`feature-card feature-card--${feature.variant}`}
                        >
                            <div className="feature-card-icon-accent">
                                {feature.icon}
                            </div>
                            <div className="feature-card-icon-wrapper">
                                {feature.icon}
                            </div>
                            <h3 className="feature-card-title">{feature.title}</h3>
                            <p className="feature-card-desc">{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>

                <div className="features-spacer" aria-hidden="true" />

                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="features-pro-banner"
                >
                    <div className="pro-banner-glow" aria-hidden="true" />

                    <div className="pro-banner-content">
                        <div className="pro-banner-text">
                            <div className="pro-banner-badge">
                                <div className="pro-banner-badge-icon">
                                    <Star size={16} className="text-white fill-white" />
                                </div>
                                <span className="pro-banner-badge-text">PRARTHANA PRO</span>
                            </div>
                            <h3 className="pro-banner-title">Go deeper with Premium Features</h3>
                            <ul className="pro-banner-list">
                                <li className="pro-banner-list-item"><span className="pro-banner-list-dot" /> Ad-free experience</li>
                                <li className="pro-banner-list-item"><span className="pro-banner-list-dot" /> Unlimited downloads</li>
                                <li className="pro-banner-list-item"><span className="pro-banner-list-dot" /> Exclusive courses</li>
                                <li className="pro-banner-list-item"><span className="pro-banner-list-dot" /> High-quality audio</li>
                            </ul>
                        </div>
                        <button type="button" className="pro-banner-button">
                            Upgrade to Pro
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Features;
