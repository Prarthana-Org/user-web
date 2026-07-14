import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Video, Compass, MapPin, Music, BookOpen, Hash, Play, ChevronRight, Clock, Users, Flame } from 'lucide-react';

const banners = [
    { title: 'Shri Mata Vaisno Darshan', subtitle: 'Live from Katra, J&K', image: 'https://images.unsplash.com/photo-1606298855672-3efb63017be8?q=80&w=400&h=200&fit=crop', viewers: '12.4K watching' },
    { title: 'Ganga Aarti Darshan', subtitle: 'Varanasi Ghats', image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=400&h=200&fit=crop', viewers: '8.2K watching' },
    { title: 'Hanuman Ji Aarti', subtitle: 'Connaught Place, Delhi', image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=400&h=200&fit=crop', viewers: '5.7K watching' },
];

const chants = [
    { title: 'Morning Chant', artist: 'Temple Priest', duration: '4:32', image: 'https://images.unsplash.com/photo-1604608672516-f1b9b1d37076?w=100&h=100&fit=crop' },
    { title: 'Evening Prayer', artist: 'Spiritual Guru', duration: '6:15', image: 'https://images.unsplash.com/photo-1625072290979-cac544181be8?w=100&h=100&fit=crop' },
    { title: 'Om Namah Shivaya', artist: 'Divine Voices', duration: '3:48', image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=100&h=100&fit=crop' },
    { title: 'Hanuman Chalisa', artist: 'Bhajan Mandali', duration: '8:20', image: 'https://images.unsplash.com/photo-1604608672516-f1b9b1d37076?w=100&h=100&fit=crop' },
];

const tabs = [
    {
        id: 'home', label: 'Home', icon: <Home size={16} />,
        gradient: 'linear-gradient(135deg, #FF6B35, #E55A2B)',
        title: 'Namaskaram',
    },
    {
        id: 'shorts', label: 'Shorts', icon: <Video size={16} />,
        gradient: 'linear-gradient(135deg, #0D9488, #14B8A6)',
        title: 'Prarthana Shorts',
    },
    {
        id: 'explore', label: 'Explore', icon: <Compass size={16} />,
        gradient: 'linear-gradient(135deg, #DB2777, #EC4899)',
        title: 'Bhajans & Aartis',
    },
    {
        id: 'location', label: 'Temples', icon: <MapPin size={16} />,
        gradient: 'linear-gradient(135deg, #059669, #10B981)',
        title: 'Find Temples',
    },
    {
        id: 'audio', label: 'Audio', icon: <Music size={16} />,
        gradient: 'linear-gradient(135deg, #7C3AED, #8B5CF6)',
        title: 'Devotional Audio',
    },
    {
        id: 'courses', label: 'Courses', icon: <BookOpen size={16} />,
        gradient: 'linear-gradient(135deg, #2563EB, #3B82F6)',
        title: 'Learn & Grow',
    },
    {
        id: 'chant', label: 'Counter', icon: <Hash size={16} />,
        gradient: 'linear-gradient(135deg, #D97706, #F59E0B)',
        title: 'Mantra Counter',
    },
];

// Tab content components for cleaner rendering
const HomeContent = () => (
    <>
        {/* Live Banner */}
        <div style={{ borderRadius: 12, overflow: 'hidden', position: 'relative', aspectRatio: '16/9' }}>
            <img src={banners[0].image} alt={banners[0].title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent 60%)' }} />
            <div style={{ position: 'absolute', bottom: 8, left: 10, right: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                    <span style={{ background: '#EF4444', fontSize: 7, fontWeight: 700, padding: '2px 6px', borderRadius: 4, color: 'white', letterSpacing: '0.05em' }}>● LIVE</span>
                    <span style={{ fontSize: 7, color: 'rgba(255,255,255,0.7)' }}>{banners[0].viewers}</span>
                </div>
                <p style={{ color: 'white', fontSize: 10, fontWeight: 700, lineHeight: 1.2 }}>{banners[0].title}</p>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 8 }}>{banners[0].subtitle}</p>
            </div>
        </div>

        {/* Quick Features */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
            {[
                { label: 'Chant', icon: '🕉️', bg: 'linear-gradient(135deg, #FFF7ED, #FFEDD5)' },
                { label: 'Streaming', icon: '📺', bg: 'linear-gradient(135deg, #FEF2F2, #FECACA)' },
                { label: 'Courses', icon: '📚', bg: 'linear-gradient(135deg, #EFF6FF, #DBEAFE)' },
                { label: 'Temples', icon: '🛕', bg: 'linear-gradient(135deg, #ECFDF5, #D1FAE5)' },
            ].map((t, i) => (
                <div key={i} style={{
                    padding: '8px 6px', borderRadius: 10, background: t.bg,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4,
                }}>
                    <span style={{ fontSize: 12 }}>{t.icon}</span>
                    <span style={{ fontSize: 9, fontWeight: 600, color: '#374151' }}>{t.label}</span>
                </div>
            ))}
        </div>

        {/* Recent Chants */}
        <div>
            <p style={{ fontSize: 9, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Recent Chants</p>
            {chants.slice(0, 2).map((c, i) => (
                <div key={i} style={{
                    display: 'flex', gap: 8, padding: 8, marginBottom: 4,
                    background: 'var(--card-background)', borderRadius: 10,
                    border: '1px solid rgba(0,0,0,0.04)', alignItems: 'center',
                }}>
                    <img src={c.image} alt="" style={{ width: 38, height: 38, borderRadius: 8, objectFit: 'cover', flexShrink: 0 }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.title}</p>
                        <p style={{ fontSize: 8, color: 'var(--text-secondary)' }}>{c.artist} • {c.duration}</p>
                    </div>
                    <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg, #FF6B35, #E55A2B)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Play size={11} color="white" fill="white" />
                    </div>
                </div>
            ))}
        </div>
    </>
);

const ShortsContent = () => (
    <>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
            {banners.slice(0, 2).map((b, i) => (
                <div key={i} style={{ borderRadius: 12, overflow: 'hidden', position: 'relative', aspectRatio: '9/14' }}>
                    <img src={b.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent 50%)' }} />
                    <div style={{ position: 'absolute', bottom: 6, left: 6, right: 6 }}>
                        <p style={{ color: 'white', fontSize: 8, fontWeight: 600 }}>{b.title}</p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
                            <Users size={8} color="rgba(255,255,255,0.6)" />
                            <span style={{ fontSize: 7, color: 'rgba(255,255,255,0.6)' }}>{b.viewers}</span>
                        </div>
                    </div>
                    <div style={{ position: 'absolute', top: 6, right: 6 }}>
                        <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Play size={8} color="white" fill="white" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
        <p style={{ fontSize: 9, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Trending</p>
        {chants.slice(0, 2).map((c, i) => (
            <div key={i} style={{
                display: 'flex', gap: 8, padding: 6,
                background: 'var(--card-background)', borderRadius: 10,
                border: '1px solid rgba(0,0,0,0.04)', alignItems: 'center',
            }}>
                <img src={c.image} alt="" style={{ width: 36, height: 36, borderRadius: 8, objectFit: 'cover', flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 9, fontWeight: 600, color: 'var(--text-primary)' }}>{c.title}</p>
                    <p style={{ fontSize: 7, color: 'var(--text-secondary)' }}>{c.artist}</p>
                </div>
                <Flame size={12} color="#EF4444" />
            </div>
        ))}
    </>
);

const AudioExploreContent = ({ title }) => (
    <>
        <p style={{ fontSize: 9, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{title}</p>
        {chants.map((c, i) => (
            <div key={i} style={{
                display: 'flex', gap: 8, padding: 8,
                background: 'var(--card-background)', borderRadius: 10,
                border: '1px solid rgba(0,0,0,0.04)', alignItems: 'center',
            }}>
                <img src={c.image} alt="" style={{ width: 40, height: 40, borderRadius: 10, objectFit: 'cover', flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.title}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <p style={{ fontSize: 8, color: 'var(--text-secondary)' }}>{c.artist}</p>
                        <span style={{ fontSize: 7, color: 'var(--text-hint)' }}>•</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Clock size={8} color="var(--text-hint)" />
                            <span style={{ fontSize: 7, color: 'var(--text-hint)' }}>{c.duration}</span>
                        </div>
                    </div>
                </div>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg, #FF6B35, #E55A2B)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Play size={11} color="white" fill="white" />
                </div>
            </div>
        ))}
    </>
);

const TempleContent = () => (
    <>
        <p style={{ fontSize: 9, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Nearby Temples</p>
        {[
            { name: 'Shri Mata Vaishno Devi', loc: 'Katra, Jammu', dist: '2.5 km', img: banners[0].image },
            { name: 'Kashi Vishwanath', loc: 'Varanasi, UP', dist: '5.1 km', img: banners[1].image },
            { name: 'Tirupati Balaji', loc: 'Tirumala, AP', dist: '12 km', img: banners[2].image },
        ].map((t, i) => (
            <div key={i} style={{
                display: 'flex', gap: 8, padding: 8,
                background: 'var(--card-background)', borderRadius: 10,
                border: '1px solid rgba(0,0,0,0.04)', alignItems: 'center',
            }}>
                <img src={t.img} alt="" style={{ width: 44, height: 44, borderRadius: 10, objectFit: 'cover', flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.name}</p>
                    <p style={{ fontSize: 8, color: 'var(--text-secondary)' }}>{t.loc}</p>
                </div>
                <div style={{
                    padding: '4px 8px', borderRadius: 8,
                    background: 'rgba(16, 185, 129, 0.1)', fontSize: 8, fontWeight: 600, color: '#059669',
                }}>
                    {t.dist}
                </div>
            </div>
        ))}
        {/* Mini map placeholder */}
        <div style={{
            borderRadius: 12, padding: 12, textAlign: 'center',
            background: 'linear-gradient(135deg, #ECFDF5, #D1FAE5)',
            border: '1px dashed rgba(16, 185, 129, 0.3)',
        }}>
            <MapPin size={16} color="#059669" style={{ margin: '0 auto 4px' }} />
            <p style={{ fontSize: 9, fontWeight: 600, color: '#059669' }}>View on Map</p>
            <p style={{ fontSize: 7, color: '#6B7280' }}>Discover temples around you</p>
        </div>
    </>
);

const CourseContent = () => (
    <>
        <p style={{ fontSize: 9, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Popular Courses</p>
        {[
            { title: 'Bhagavad Gita', lessons: '24 lessons', img: banners[2].image, progress: 65 },
            { title: 'Meditation Basics', lessons: '12 lessons', img: banners[0].image, progress: 30 },
        ].map((c, i) => (
            <div key={i} style={{
                borderRadius: 12, overflow: 'hidden',
                background: 'var(--card-background)',
                border: '1px solid rgba(0,0,0,0.04)',
            }}>
                <div style={{ position: 'relative' }}>
                    <img src={c.img} alt="" style={{ width: '100%', height: 56, objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)' }} />
                </div>
                <div style={{ padding: '8px 10px' }}>
                    <p style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-primary)' }}>{c.title}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
                        <span style={{ fontSize: 8, color: 'var(--text-secondary)' }}>{c.lessons}</span>
                        <span style={{ fontSize: 8, fontWeight: 600, color: '#2563EB' }}>{c.progress}%</span>
                    </div>
                    <div style={{ height: 3, borderRadius: 2, background: 'rgba(37, 99, 235, 0.1)', marginTop: 4 }}>
                        <div style={{ height: '100%', borderRadius: 2, width: `${c.progress}%`, background: 'linear-gradient(90deg, #2563EB, #3B82F6)' }} />
                    </div>
                </div>
            </div>
        ))}
    </>
);

const ChantCounterContent = () => (
    <>
        <div style={{
            borderRadius: 16, padding: 16, textAlign: 'center',
            background: 'linear-gradient(135deg, #FFF7ED, #FFEDD5)',
            border: '1px solid rgba(217, 119, 6, 0.15)',
        }}>
            <p style={{ fontSize: 28, fontWeight: 800, color: '#92400E', lineHeight: 1 }}>108</p>
            <p style={{ fontSize: 14, color: '#B45309', marginTop: 4, fontWeight: 600 }}>ॐ नमः शिवाय</p>
            <p style={{ fontSize: 9, color: '#D97706', marginTop: 2 }}>Om Namah Shivaya</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 10 }}>
                <button style={{
                    padding: '4px 12px', borderRadius: 8, fontSize: 8, fontWeight: 600,
                    background: '#F59E0B', color: 'white', border: 'none',
                }}>Reset</button>
                <button style={{
                    padding: '4px 12px', borderRadius: 8, fontSize: 8, fontWeight: 600,
                    background: 'white', color: '#92400E', border: '1px solid rgba(217, 119, 6, 0.3)',
                }}>History</button>
            </div>
        </div>
        <p style={{ fontSize: 9, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Choose Mantra</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {['Om', 'Gayatri Mantra', 'Hare Krishna', 'Ram Mantra'].map((m, i) => (
                <div key={i} style={{
                    padding: '8px 10px', borderRadius: 10,
                    background: i === 0 ? 'linear-gradient(135deg, #FFF7ED, #FFEDD5)' : 'var(--card-background)',
                    border: i === 0 ? '1px solid rgba(217, 119, 6, 0.2)' : '1px solid rgba(0,0,0,0.04)',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}>
                    <span style={{ fontSize: 10, fontWeight: i === 0 ? 700 : 500, color: i === 0 ? '#92400E' : 'var(--text-primary)' }}>{m}</span>
                    <ChevronRight size={12} color={i === 0 ? '#D97706' : 'var(--text-hint)'} />
                </div>
            ))}
        </div>
    </>
);

const getTabContent = (tabId) => {
    switch (tabId) {
        case 'home': return <HomeContent />;
        case 'shorts': return <ShortsContent />;
        case 'explore': return <AudioExploreContent title="Bhajans & Aartis" />;
        case 'audio': return <AudioExploreContent title="Devotional Audio" />;
        case 'location': return <TempleContent />;
        case 'courses': return <CourseContent />;
        case 'chant': return <ChantCounterContent />;
        default: return <HomeContent />;
    }
};

const AppShowcase = () => {
    const [activeTab, setActiveTab] = useState(tabs[0]);

    return (
        <section id="showcase" className="overflow-hidden relative">
            {/* Background decoration */}
            <div style={{
                position: 'absolute', top: '20%', left: '-10%',
                width: 500, height: 500, borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(255, 107, 53, 0.08), transparent 70%)',
                filter: 'blur(60px)', zIndex: 0, pointerEvents: 'none',
            }} />
            <div style={{
                position: 'absolute', bottom: '10%', right: '-5%',
                width: 400, height: 400, borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(236, 72, 153, 0.06), transparent 70%)',
                filter: 'blur(60px)', zIndex: 0, pointerEvents: 'none',
            }} />

            <div className="container mx-auto px-8 md:px-12 lg:px-16" style={{ position: 'relative', zIndex: 1 }}>
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-24 items-center max-w-6xl mx-auto">

                    {/* Left: Title + Tabs */}
                    <div className="space-y-8 text-center lg:text-left order-2 lg:order-1">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <p style={{
                                fontSize: 13, fontWeight: 600, textTransform: 'uppercase',
                                letterSpacing: '0.12em', color: '#FF6B35', marginBottom: 12,
                            }}>
                                App Preview
                            </p>
                            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--text-primary)] leading-tight tracking-tight">
                                Experience the <span className="gradient-text">Divine Interface</span>
                            </h2>
                            <p className="text-lg sm:text-xl text-[var(--text-secondary)] max-w-lg mx-auto lg:mx-0 leading-relaxed mt-5">
                                Navigate seamlessly between darshans, chants, and wisdom. Designed for peace and easy access.
                            </p>
                        </motion.div>

                        {/* Horizontal scrollable tab pills */}
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                        >
                            <div
                                style={{
                                    display: 'flex', flexWrap: 'wrap',
                                    gap: 10, justifyContent: 'center',
                                }}
                                className="lg:!justify-start"
                            >
                                {tabs.map((tab) => {
                                    const isActive = activeTab.id === tab.id;
                                    return (
                                        <motion.button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab)}
                                            whileHover={{ scale: 1.04 }}
                                            whileTap={{ scale: 0.96 }}
                                            style={{
                                                display: 'flex', alignItems: 'center', gap: 7,
                                                padding: isActive ? '10px 18px' : '10px 16px',
                                                borderRadius: 50,
                                                border: 'none',
                                                cursor: 'pointer',
                                                fontSize: 13, fontWeight: 600,
                                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                                background: isActive ? tab.gradient : 'var(--card-background)',
                                                color: isActive ? 'white' : 'var(--text-secondary)',
                                                boxShadow: isActive
                                                    ? '0 4px 15px -3px rgba(0,0,0,0.2)'
                                                    : '0 1px 3px rgba(0,0,0,0.06)',
                                            }}
                                        >
                                            {tab.icon}
                                            <span>{tab.label}</span>
                                        </motion.button>
                                    );
                                })}
                            </div>
                        </motion.div>
                    </div>

                    {/* Right: Phone Mockup */}
                    <div className="flex justify-center order-1 lg:order-2">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.15, duration: 0.6 }}
                            style={{ position: 'relative' }}
                        >
                            {/* Phone glow */}
                            <div style={{
                                position: 'absolute', inset: -30, borderRadius: 50,
                                background: `radial-gradient(ellipse at center, rgba(255, 107, 53, 0.12), transparent 70%)`,
                                filter: 'blur(30px)', zIndex: 0, pointerEvents: 'none',
                            }} />

                            {/* Phone frame */}
                            <div style={{
                                position: 'relative', zIndex: 1,
                                padding: '12px 10px',
                                background: 'linear-gradient(160deg, #1a1a1a, #0a0a0a)',
                                borderRadius: 40,
                                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255,255,255,0.05)',
                            }}>
                                {/* Screen */}
                                <div style={{
                                    width: 280,
                                    borderRadius: 30,
                                    overflow: 'hidden',
                                    background: 'var(--background-color)',
                                }}>
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={activeTab.id}
                                            initial={{ opacity: 0, x: 15 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -15 }}
                                            transition={{ duration: 0.25 }}
                                            style={{ minHeight: 540, display: 'flex', flexDirection: 'column' }}
                                        >
                                            {/* Notch */}
                                            <div style={{
                                                height: 36, display: 'flex', justifyContent: 'center',
                                                alignItems: 'flex-end', paddingBottom: 4,
                                                background: 'linear-gradient(to bottom, rgba(0,0,0,0.03), transparent)',
                                                flexShrink: 0,
                                            }}>
                                                <div style={{ width: 70, height: 22, background: '#000', borderRadius: 12 }} />
                                            </div>

                                            {/* Header */}
                                            <div style={{ padding: '4px 14px 8px', flexShrink: 0 }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <div>
                                                        <p style={{ fontSize: 8, fontWeight: 700, color: '#FF6B35', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Prarthana</p>
                                                        <p style={{ fontSize: 14, fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.2 }}>{activeTab.title}</p>
                                                    </div>
                                                    <div style={{
                                                        width: 28, height: 28, borderRadius: 10,
                                                        background: 'var(--card-background)',
                                                        boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                    }}>
                                                        <span style={{ fontSize: 12 }}>🔔</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div style={{
                                                flex: 1, overflow: 'hidden', padding: '0 12px 8px',
                                                display: 'flex', flexDirection: 'column', gap: 8,
                                            }}>
                                                {getTabContent(activeTab.id)}
                                            </div>

                                            {/* Bottom nav */}
                                            <div style={{
                                                height: 44, flexShrink: 0,
                                                display: 'flex', alignItems: 'center', justifyContent: 'space-around',
                                                background: 'var(--card-background)',
                                                borderTop: '1px solid rgba(0,0,0,0.05)',
                                                paddingBottom: 4,
                                            }}>
                                                {[Home, Compass, Music].map((Icon, i) => (
                                                    <div key={i} style={{
                                                        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
                                                    }}>
                                                        <Icon size={16} color={i === 0 ? '#FF6B35' : 'var(--text-hint)'} />
                                                        <div style={{
                                                            width: i === 0 ? 4 : 0, height: 4, borderRadius: '50%',
                                                            background: '#FF6B35', transition: 'width 0.2s',
                                                        }} />
                                                    </div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    </AnimatePresence>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AppShowcase;
