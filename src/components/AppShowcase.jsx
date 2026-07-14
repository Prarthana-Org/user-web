import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Video, Compass, MapPin, Music, BookOpen, Hash, Play, ChevronRight, Clock, Users, Flame } from 'lucide-react';

const banners = [
    { title: 'The Sound of Koshas', subtitle: 'Live Sonic Meditation', image: 'https://images.unsplash.com/photo-1606298855672-3efb63017be8?q=80&w=400&h=200&fit=crop', viewers: '12.4K' },
    { title: 'Morning Brainwaves', subtitle: 'Gamma Frequency Session', image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=400&h=200&fit=crop', viewers: '8.2K' },
    { title: 'Deep Rest Protocol', subtitle: 'Yoga Nidra Series', image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=400&h=200&fit=crop', viewers: '5.7K' },
];

const chants = [
    { title: '432Hz Alignment', artist: 'Binaural Basics', duration: '4:32', image: 'https://images.unsplash.com/photo-1604608672516-f1b9b1d37076?w=100&h=100&fit=crop' },
    { title: 'Breath Cadence', artist: 'Resonance', duration: '6:15', image: 'https://images.unsplash.com/photo-1625072290979-cac544181be8?w=100&h=100&fit=crop' },
    { title: 'Delta Wave Sleep', artist: 'NeuroTones', duration: '3:48', image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=100&h=100&fit=crop' },
];

const tabs = [
    {
        id: 'home', label: 'Home', icon: <Home size={16} />,
        gradient: 'var(--panel-2)',
        border: 'var(--thread)',
        title: 'Dashboard',
    },
    {
        id: 'shorts', label: 'Shorts', icon: <Video size={16} />,
        gradient: 'var(--panel-2)',
        border: 'var(--thread)',
        title: 'Micro-Learning',
    },
    {
        id: 'explore', label: 'Explore', icon: <Compass size={16} />,
        gradient: 'var(--panel-2)',
        border: 'var(--thread)',
        title: 'Discover',
    },
    {
        id: 'location', label: 'Heritage', icon: <MapPin size={16} />,
        gradient: 'var(--panel-2)',
        border: 'var(--thread)',
        title: 'Sacred Geography',
    },
    {
        id: 'audio', label: 'Audio', icon: <Music size={16} />,
        gradient: 'var(--panel-2)',
        border: 'var(--thread)',
        title: 'Sonic Therapy',
    },
    {
        id: 'courses', label: 'Courses', icon: <BookOpen size={16} />,
        gradient: 'var(--panel-2)',
        border: 'var(--thread)',
        title: 'Curriculums',
    },
    {
        id: 'chant', label: 'Counter', icon: <Hash size={16} />,
        gradient: 'var(--panel-2)',
        border: 'var(--thread)',
        title: 'Metrics',
    },
];

const HomeContent = () => (
    <>
        <div style={{ borderRadius: 12, overflow: 'hidden', position: 'relative', aspectRatio: '16/9', border: '1px solid var(--line)' }}>
            <img src={banners[0].image} alt={banners[0].title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(11,14,26,0.9), transparent 60%)' }} />
            <div style={{ position: 'absolute', bottom: 8, left: 10, right: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                    <span style={{ background: 'var(--sindoor)', fontSize: 7, fontWeight: 700, padding: '2px 6px', borderRadius: 4, color: 'var(--ink)', letterSpacing: '0.05em' }}>● LIVE</span>
                    <span style={{ fontSize: 7, color: 'var(--faint)' }}>{banners[0].viewers} online</span>
                </div>
                <p style={{ color: 'var(--ink)', fontSize: 11, fontFamily: 'var(--font-disp)', fontWeight: 600, lineHeight: 1.2 }}>{banners[0].title}</p>
                <p style={{ color: 'var(--body)', fontSize: 8 }}>{banners[0].subtitle}</p>
            </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
            {[
                { label: 'Breathe', icon: '🌬️' },
                { label: 'Listen', icon: '🎧' },
                { label: 'Learn', icon: '🧠' },
                { label: 'Explore', icon: '🧭' },
            ].map((t, i) => (
                <div key={i} style={{
                    padding: '8px 6px', borderRadius: 10, background: 'var(--panel)', border: '1px solid var(--line)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4,
                }}>
                    <span style={{ fontSize: 12 }}>{t.icon}</span>
                    <span style={{ fontSize: 9, fontWeight: 500, color: 'var(--ink)' }}>{t.label}</span>
                </div>
            ))}
        </div>

        <div>
            <p className="eyebrow">Recent Sessions</p>
            {chants.slice(0, 2).map((c, i) => (
                <div key={i} style={{
                    display: 'flex', gap: 8, padding: 8, marginBottom: 4,
                    background: 'var(--panel)', borderRadius: 10,
                    border: '1px solid var(--line)', alignItems: 'center',
                }}>
                    <img src={c.image} alt="" style={{ width: 38, height: 38, borderRadius: 8, objectFit: 'cover', flexShrink: 0 }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontSize: 10, fontWeight: 600, color: 'var(--ink)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.title}</p>
                        <p style={{ fontSize: 8, color: 'var(--body)' }}>{c.artist} • {c.duration}</p>
                    </div>
                    <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--panel-2)', border: '1px solid var(--thread-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Play size={11} color="var(--thread)" fill="var(--thread)" />
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
                <div key={i} style={{ borderRadius: 12, overflow: 'hidden', position: 'relative', aspectRatio: '9/14', border: '1px solid var(--line)' }}>
                    <img src={b.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(11,14,26,0.9), transparent 50%)' }} />
                    <div style={{ position: 'absolute', bottom: 6, left: 6, right: 6 }}>
                        <p style={{ color: 'var(--ink)', fontSize: 9, fontFamily: 'var(--font-disp)' }}>{b.title}</p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
                            <Users size={8} color="var(--body)" />
                            <span style={{ fontSize: 7, color: 'var(--body)' }}>{b.viewers}</span>
                        </div>
                    </div>
                    <div style={{ position: 'absolute', top: 6, right: 6 }}>
                        <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'rgba(11,14,26,0.4)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--line)' }}>
                            <Play size={8} color="var(--ink)" fill="var(--ink)" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </>
);

const AudioExploreContent = ({ title }) => (
    <>
        <p className="eyebrow">{title}</p>
        {chants.map((c, i) => (
            <div key={i} style={{
                display: 'flex', gap: 8, padding: 8,
                background: 'var(--panel)', borderRadius: 10,
                border: '1px solid var(--line)', alignItems: 'center',
            }}>
                <img src={c.image} alt="" style={{ width: 40, height: 40, borderRadius: 10, objectFit: 'cover', flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 10, fontWeight: 600, color: 'var(--ink)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.title}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <p style={{ fontSize: 8, color: 'var(--body)' }}>{c.artist}</p>
                        <span style={{ fontSize: 7, color: 'var(--faint)' }}>•</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Clock size={8} color="var(--faint)" />
                            <span style={{ fontSize: 7, color: 'var(--faint)' }}>{c.duration}</span>
                        </div>
                    </div>
                </div>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--panel-2)', border: '1px solid var(--thread-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Play size={11} color="var(--thread)" fill="var(--thread)" />
                </div>
            </div>
        ))}
    </>
);

const TempleContent = () => (
    <>
        <p className="eyebrow">Heritage Sites</p>
        {[
            { name: 'Ellora Caves', loc: 'Maharashtra, IN', dist: 'UNESCO', img: banners[0].image },
            { name: 'Brihadisvara', loc: 'Thanjavur, TN', dist: '11th C', img: banners[1].image },
        ].map((t, i) => (
            <div key={i} style={{
                display: 'flex', gap: 8, padding: 8,
                background: 'var(--panel)', borderRadius: 10,
                border: '1px solid var(--line)', alignItems: 'center',
            }}>
                <img src={t.img} alt="" style={{ width: 44, height: 44, borderRadius: 10, objectFit: 'cover', flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 10, fontWeight: 600, color: 'var(--ink)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.name}</p>
                    <p style={{ fontSize: 8, color: 'var(--body)' }}>{t.loc}</p>
                </div>
                <div style={{
                    padding: '4px 8px', borderRadius: 4,
                    background: 'rgba(45, 212, 191, 0.1)', fontSize: 8, fontWeight: 600, color: 'var(--secondary)',
                    fontFamily: 'var(--font-mono)'
                }}>
                    {t.dist}
                </div>
            </div>
        ))}
        {/* Mini map placeholder */}
        <div style={{
            borderRadius: 12, padding: 12, textAlign: 'center',
            background: 'var(--panel-2)',
            border: '1px dashed var(--line)',
        }}>
            <MapPin size={16} color="var(--thread)" style={{ margin: '0 auto 4px' }} />
            <p style={{ fontSize: 9, fontWeight: 600, color: 'var(--ink)' }}>Explore Archive Map</p>
        </div>
    </>
);

const CourseContent = () => (
    <>
        <p className="eyebrow">Curriculums</p>
        {[
            { title: 'Neurology of Meditation', lessons: '24 modules', img: banners[2].image, progress: 65 },
            { title: 'Acoustics & Chants', lessons: '12 modules', img: banners[0].image, progress: 30 },
        ].map((c, i) => (
            <div key={i} style={{
                borderRadius: 12, overflow: 'hidden',
                background: 'var(--panel)',
                border: '1px solid var(--line)',
            }}>
                <div style={{ position: 'relative' }}>
                    <img src={c.img} alt="" style={{ width: '100%', height: 56, objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(11,14,26,0.8), transparent)' }} />
                </div>
                <div style={{ padding: '8px 10px' }}>
                    <p style={{ fontSize: 10, fontFamily: 'var(--font-disp)', color: 'var(--ink)' }}>{c.title}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
                        <span style={{ fontSize: 8, color: 'var(--body)' }}>{c.lessons}</span>
                        <span style={{ fontSize: 8, fontFamily: 'var(--font-mono)', color: 'var(--thread)' }}>{c.progress}%</span>
                    </div>
                    <div style={{ height: 3, borderRadius: 2, background: 'var(--line)', marginTop: 4 }}>
                        <div style={{ height: '100%', borderRadius: 2, width: `${c.progress}%`, background: 'var(--thread)' }} />
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
            background: 'var(--panel-2)',
            border: '1px solid var(--line)',
        }}>
            <p style={{ fontSize: 28, fontFamily: 'var(--font-mono)', color: 'var(--thread)', lineHeight: 1 }}>108</p>
            <p style={{ fontSize: 12, color: 'var(--ink)', marginTop: 4, fontFamily: 'var(--font-disp)' }}>Focus Rhythm</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 10 }}>
                <button style={{
                    padding: '4px 12px', borderRadius: 4, fontSize: 8, fontFamily: 'var(--font-mono)',
                    background: 'var(--thread)', color: 'var(--midnight)', border: 'none',
                }}>RESET</button>
                <button style={{
                    padding: '4px 12px', borderRadius: 4, fontSize: 8, fontFamily: 'var(--font-mono)',
                    background: 'transparent', color: 'var(--thread)', border: '1px solid var(--line)',
                }}>LOG</button>
            </div>
        </div>
        <p className="eyebrow mt-4">Select Target</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {['108 Reps', '216 Reps', '500 Reps'].map((m, i) => (
                <div key={i} style={{
                    padding: '8px 10px', borderRadius: 10,
                    background: i === 0 ? 'var(--panel-2)' : 'var(--panel)',
                    border: i === 0 ? '1px solid var(--thread-dim)' : '1px solid var(--line)',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}>
                    <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: i === 0 ? 'var(--thread)' : 'var(--body)' }}>{m}</span>
                    <ChevronRight size={12} color={i === 0 ? 'var(--thread)' : 'var(--faint)'} />
                </div>
            ))}
        </div>
    </>
);

const getTabContent = (tabId) => {
    switch (tabId) {
        case 'home': return <HomeContent />;
        case 'shorts': return <ShortsContent />;
        case 'explore': return <AudioExploreContent title="Soundscapes" />;
        case 'audio': return <AudioExploreContent title="Frequencies" />;
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
            <div className="container mx-auto px-8 md:px-12 lg:px-16">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-24 items-center max-w-6xl mx-auto">

                    {/* Left: Title + Tabs */}
                    <div className="space-y-8 text-center lg:text-left order-2 lg:order-1">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <p className="eyebrow mb-3">Simulation Layer</p>
                            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-disp text-[var(--ink)] leading-tight">
                                A Living Interface for <span className="gradient-text">Inner Science</span>
                            </h2>
                            <p className="text-lg sm:text-xl text-[var(--body)] max-w-lg mx-auto lg:mx-0 leading-relaxed mt-5">
                                Navigate seamlessly between ancient methodologies and modern tracking. Designed for cognitive clarity.
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
                                                border: isActive ? `1px solid ${tab.border}` : '1px solid var(--line)',
                                                cursor: 'pointer',
                                                fontSize: 12, fontFamily: 'var(--font-mono)',
                                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                                background: isActive ? tab.gradient : 'var(--panel)',
                                                color: isActive ? 'var(--thread)' : 'var(--body)',
                                                boxShadow: isActive ? 'var(--shadow-glow)' : 'none',
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
                            {/* Phone frame */}
                            <div style={{
                                position: 'relative', zIndex: 1,
                                padding: '12px 10px',
                                background: 'linear-gradient(160deg, #171D33, #0B0E1A)',
                                borderRadius: 40,
                                border: '1px solid var(--line)',
                                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(232,180,74,0.1)',
                            }}>
                                {/* Screen */}
                                <div style={{
                                    width: 280,
                                    borderRadius: 30,
                                    overflow: 'hidden',
                                    background: 'var(--midnight)',
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
                                                background: 'linear-gradient(to bottom, rgba(0,0,0,0.5), transparent)',
                                                flexShrink: 0,
                                            }}>
                                                <div style={{ width: 70, height: 22, background: '#000', borderRadius: 12, border: '1px solid rgba(255,255,255,0.05)' }} />
                                            </div>

                                            {/* Header */}
                                            <div style={{ padding: '4px 14px 8px', flexShrink: 0 }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <div>
                                                        <p style={{ fontSize: 7, fontFamily: 'var(--font-mono)', color: 'var(--sindoor)', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Node Active</p>
                                                        <p style={{ fontSize: 16, fontFamily: 'var(--font-disp)', color: 'var(--ink)', lineHeight: 1.2 }}>{activeTab.title}</p>
                                                    </div>
                                                    <div style={{
                                                        width: 28, height: 28, borderRadius: 10,
                                                        background: 'var(--panel)',
                                                        border: '1px solid var(--line)',
                                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                    }}>
                                                        <span style={{ fontSize: 12, color: 'var(--thread)' }}>○</span>
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
                                                background: 'var(--panel)',
                                                borderTop: '1px solid var(--line)',
                                                paddingBottom: 4,
                                            }}>
                                                {[Home, Compass, Music].map((Icon, i) => (
                                                    <div key={i} style={{
                                                        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
                                                    }}>
                                                        <Icon size={16} color={i === 0 ? 'var(--thread)' : 'var(--faint)'} />
                                                        <div style={{
                                                            width: i === 0 ? 4 : 0, height: 4, borderRadius: '50%',
                                                            background: 'var(--thread)', transition: 'width 0.2s',
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
