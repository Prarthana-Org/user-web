import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Video, Compass, MapPin, Music, BookOpen, Hash, Play } from 'lucide-react';

// Content from user app (new_home.dart, songs.dart)
const banners = [
    { title: 'Shri Mata Vaisno Darshan', image: 'https://images.unsplash.com/photo-1606298855672-3efb63017be8?q=80&w=400&h=200&fit=crop' },
    { title: 'Ganga Aarti Darshan', image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=400&h=200&fit=crop' },
    { title: 'Hanuman Ji Aarti', image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=400&h=200&fit=crop' },
];

const chants = [
    { title: 'Morning Chant', artist: 'Temple Priest', image: 'https://images.unsplash.com/photo-1604608672516-f1b9b1d37076?w=100&h=100&fit=crop' },
    { title: 'Evening Prayer', artist: 'Spiritual Guru', image: 'https://images.unsplash.com/photo-1625072290979-cac544181be8?w=100&h=100&fit=crop' },
    { title: 'Om Namah Shivaya', artist: 'Divine Voices', image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=100&h=100&fit=crop' },
    { title: 'Hanuman Chalisa', artist: 'Bhajan Mandali', image: 'https://images.unsplash.com/photo-1604608672516-f1b9b1d37076?w=100&h=100&fit=crop' },
];

const featureTiles = [
    { label: 'Chant', color: 'bg-orange-400' },
    { label: 'Streaming', color: 'bg-red-400' },
    { label: 'Courses', color: 'bg-blue-400' },
    { label: 'Location', color: 'bg-emerald-400' },
];

const tabs = [
    { id: 'home', label: 'Home', icon: <Home size={20} />, color: 'bg-orange-500', title: 'Namaskaram' },
    { id: 'shorts', label: 'Prarthana Shorts', icon: <Video size={20} />, color: 'bg-teal-500', title: 'Shorts' },
    { id: 'explore', label: 'Explore', icon: <Compass size={20} />, color: 'bg-pink-500', title: 'Bhajans & Aartis' },
    { id: 'location', label: 'Location', icon: <MapPin size={20} />, color: 'bg-emerald-500', title: 'Find Temples' },
    { id: 'audio', label: 'Devotional Audio', icon: <Music size={20} />, color: 'bg-purple-500', title: 'Chants' },
    { id: 'courses', label: 'Courses', icon: <BookOpen size={20} />, color: 'bg-blue-500', title: 'Learn & Grow' },
    { id: 'chant', label: 'Chant Counter', icon: <Hash size={20} />, color: 'bg-amber-500', title: 'Mantra Counter' },
];

const AppShowcase = () => {
    const [activeTab, setActiveTab] = useState(tabs[0]);

    return (
        <section id="showcase" className="overflow-hidden relative">
            {/* Background Blobs */}
            <div className="absolute top-1/2 left-0 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-pink-100/40 rounded-full blur-3xl -z-10" />

            <div className="container mx-auto px-8 md:px-12 lg:px-16">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-24 items-center max-w-6xl mx-auto">
                    {/* Left: Tabs */}
                    <div className="space-y-8 text-center lg:text-left order-2 lg:order-1">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight"
                        >
                            Experience the <span className="gradient-text">Divine Interface</span>
                        </motion.h2>
                        <p className="text-lg sm:text-xl text-gray-600 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                            Navigate seamlessly between darshans, chants, and wisdom. Designed for peace and easy access.
                        </p>

                        <div className="space-y-3 flex flex-col items-center lg:items-stretch max-w-md mx-auto lg:mx-0">
                            {tabs.map((tab) => (
                                <motion.button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab)}
                                    className={`w-full text-left px-6 py-4 rounded-xl flex items-center gap-4 transition-all duration-300 border ${activeTab.id === tab.id
                                        ? 'bg-white shadow-lg border-orange-100'
                                        : 'bg-transparent border-transparent hover:bg-white/50'
                                        }`}
                                >
                                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white shrink-0 ${activeTab.id === tab.id ? tab.color : 'bg-gray-200 text-gray-400'}`}>
                                        {tab.icon}
                                    </div>
                                    <span className={`font-semibold ${activeTab.id === tab.id ? 'text-gray-900' : 'text-gray-500'}`}>
                                        {tab.label}
                                    </span>
                                </motion.button>
                            ))}
                        </div>
                    </div>

                    {/* Right: Phone Mockup */}
                    <div className="flex justify-center order-1 lg:order-2">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="relative"
                        >
                            {/* Phone frame - padding as bezel */}
                            <div className="p-4 bg-gray-900 rounded-[2rem] shadow-2xl">
                                {/* Screen */}
                                <div className="w-[240px] sm:w-[260px] rounded-[1.5rem] overflow-hidden bg-[#FFF3E0] shadow-inner">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={activeTab.id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                            className="min-h-[520px] flex flex-col"
                                        >
                                            {/* Status bar */}
                                            <div className="h-10 flex justify-center items-end pb-1 bg-gradient-to-b from-black/5 to-transparent shrink-0">
                                                <div className="w-16 h-4 bg-black rounded-full" />
                                            </div>

                                            {/* App content - scrollable */}
                                            <div className="flex-1 p-3 flex flex-col min-h-0 overflow-hidden">
                                                {/* Header */}
                                                <div className="flex justify-between items-center mb-2 shrink-0">
                                                    <div>
                                                        <p className="text-[9px] text-orange-600 font-bold uppercase">Prarthana</p>
                                                        <p className="text-xs font-bold text-gray-800">{activeTab.title}</p>
                                                    </div>
                                                    <div className="w-6 h-6 rounded-full bg-white shadow-sm" />
                                                </div>

                                                {/* Content based on tab */}
                                                <div className="flex-1 overflow-y-auto space-y-2 min-h-0">
                                                    {/* Home: Banner + Features + Chants */}
                                                    {(activeTab.id === 'home' || activeTab.id === 'shorts') && (
                                                        <>
                                                            <div className="rounded-lg overflow-hidden aspect-video relative">
                                                                <img
                                                                    src={banners[0].image}
                                                                    alt={banners[0].title}
                                                                    className="w-full h-full object-cover"
                                                                />
                                                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                                                                <div className="absolute bottom-1 left-2 right-2">
                                                                    <span className="bg-red-500 text-[8px] font-bold px-1.5 py-0.5 rounded">LIVE</span>
                                                                    <p className="text-white text-[10px] font-bold mt-1">{banners[0].title}</p>
                                                                    <p className="text-white/80 text-[8px]">Join live spiritual darshan</p>
                                                                </div>
                                                            </div>
                                                            <p className="text-[9px] font-bold text-gray-600">Features</p>
                                                            <div className="grid grid-cols-2 gap-1.5">
                                                                {featureTiles.map((t, i) => (
                                                                    <div key={i} className={`rounded-lg ${t.color} p-2 flex items-center justify-center`}>
                                                                        <span className="text-[9px] font-semibold text-white">{t.label}</span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                            <p className="text-[9px] font-bold text-gray-600">Recent Chants</p>
                                                            {chants.slice(0, 2).map((c, i) => (
                                                                <div key={i} className="flex gap-2 p-1.5 bg-white rounded-lg">
                                                                    <img src={c.image} alt="" className="w-10 h-10 rounded object-cover shrink-0" />
                                                                    <div className="min-w-0 flex-1">
                                                                        <p className="text-[10px] font-semibold text-gray-800 truncate">{c.title}</p>
                                                                        <p className="text-[8px] text-gray-500">{c.artist}</p>
                                                                    </div>
                                                                    <Play size={14} className="text-orange-500 shrink-0 self-center" />
                                                                </div>
                                                            ))}
                                                        </>
                                                    )}

                                                    {/* Explore / Audio: Chant list with images */}
                                                    {(activeTab.id === 'explore' || activeTab.id === 'audio') && (
                                                        <>
                                                            <p className="text-[9px] font-bold text-gray-600">Bhajans & Aartis</p>
                                                            {chants.map((c, i) => (
                                                                <div key={i} className="flex gap-2 p-2 bg-white rounded-lg">
                                                                    <img src={c.image} alt="" className="w-12 h-12 rounded-lg object-cover shrink-0" />
                                                                    <div className="min-w-0 flex-1">
                                                                        <p className="text-[10px] font-semibold text-gray-800 truncate">{c.title}</p>
                                                                        <p className="text-[8px] text-gray-500">{c.artist}</p>
                                                                    </div>
                                                                    <Play size={16} className="text-orange-500 shrink-0 self-center" />
                                                                </div>
                                                            ))}
                                                        </>
                                                    )}

                                                    {/* Location: Temple list */}
                                                    {activeTab.id === 'location' && (
                                                        <>
                                                            <p className="text-[9px] font-bold text-gray-600">Nearby Temples</p>
                                                            {[
                                                                { name: 'Shri Mata Vaishno Devi', img: banners[0].image },
                                                                { name: 'Kashi Vishwanath', img: banners[1].image },
                                                                { name: 'Tirupati Balaji', img: banners[2].image },
                                                            ].map((t, i) => (
                                                                <div key={i} className="flex gap-2 p-2 bg-white rounded-lg">
                                                                    <img src={t.img} alt="" className="w-12 h-12 rounded-lg object-cover shrink-0" />
                                                                    <div className="min-w-0 flex-1">
                                                                        <p className="text-[10px] font-semibold text-gray-800 truncate">{t.name}</p>
                                                                        <p className="text-[8px] text-gray-500">2.5 km away</p>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </>
                                                    )}

                                                    {/* Courses */}
                                                    {activeTab.id === 'courses' && (
                                                        <>
                                                            <p className="text-[9px] font-bold text-gray-600">Prarthana Course</p>
                                                            {[
                                                                { title: 'Bhagavad Gita', img: banners[2].image },
                                                                { title: 'Meditation Basics', img: banners[0].image },
                                                            ].map((c, i) => (
                                                                <div key={i} className="rounded-lg overflow-hidden bg-white">
                                                                    <img src={c.img} alt="" className="w-full h-14 object-cover" />
                                                                    <div className="p-1.5">
                                                                        <p className="text-[10px] font-semibold text-gray-800">{c.title}</p>
                                                                        <p className="text-[8px] text-gray-500">Learn & Grow</p>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </>
                                                    )}

                                                    {/* Chant Counter */}
                                                    {activeTab.id === 'chant' && (
                                                        <>
                                                            <div className="bg-amber-100 rounded-lg p-3 text-center">
                                                                <p className="text-2xl font-bold text-amber-800">108</p>
                                                                <p className="text-[9px] text-amber-700">ॐ नमः शिवाय</p>
                                                                <p className="text-[8px] text-amber-600">Om Namah Shivaya</p>
                                                            </div>
                                                            <p className="text-[9px] font-bold text-gray-600">Mantras</p>
                                                            <div className="space-y-1">
                                                                {['Om', 'Gayatri Mantra', 'Hare Krishna', 'Ram Mantra'].map((m, i) => (
                                                                    <div key={i} className="p-2 bg-white rounded-lg text-[10px] font-medium">{m}</div>
                                                                ))}
                                                            </div>
                                                        </>
                                                    )}
                                                </div>

                                                {/* Bottom nav */}
                                                <div className="h-11 flex items-center justify-around bg-white rounded-b-xl border-t shrink-0 mt-2">
                                                    <div className="w-5 h-5 rounded-full bg-orange-200" />
                                                    <div className="w-5 h-5 rounded-full bg-gray-200" />
                                                    <div className="w-5 h-5 rounded-full bg-gray-200" />
                                                </div>
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
