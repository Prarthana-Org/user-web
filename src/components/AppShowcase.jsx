import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Music, BookOpen, MapPin, Search, Bell, Menu, Heart } from 'lucide-react';

const tabs = [
    {
        id: 'home',
        label: 'Home Feed',
        icon: <Menu size={20} />,
        color: 'bg-orange-500',
        content: {
            title: 'Daily Darshan',
            subtitle: 'Start your day with divine blessings',
            items: [
                { type: 'video', title: 'Morning Aarti - Kashi', time: 'LIVE' },
                { type: 'audio', title: 'Suprabhatam', time: '15 min' }
            ]
        }
    },
    {
        id: 'music',
        label: 'Audio Player',
        icon: <Music size={20} />,
        color: 'bg-pink-500',
        content: {
            title: 'Devotional Chants',
            subtitle: 'Peaceful mantras for meditation',
            items: [
                { type: 'audio', title: 'Om Namah Shivaya', time: 'Playing' },
                { type: 'audio', title: 'Gayatri Mantra', time: '10 min' }
            ]
        }
    },
    {
        id: 'courses',
        label: 'Courses',
        icon: <BookOpen size={20} />,
        color: 'bg-blue-500',
        content: {
            title: 'Vedic Wisdom',
            subtitle: 'Learn ancient scriptures',
            items: [
                { type: 'course', title: 'Intro to Upanishads', time: 'Lesson 1' },
                { type: 'course', title: 'Bhagavad Gita', time: 'Chapter 2' }
            ]
        }
    },
];

const AppShowcase = () => {
    const [activeTab, setActiveTab] = useState(tabs[0]);

    return (
        <section id="showcase" className="overflow-hidden relative">
            {/* Background Blobs */}
            <div className="absolute top-1/2 left-0 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-pink-100/40 rounded-full blur-3xl -z-10" />

            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-24 items-center">

                    {/* Left Side: Tabs */}
                    <div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-5xl lg:text-6xl font-bold mb-8 text-gray-900 leading-tight tracking-tight"
                        >
                            Experience the <span className="gradient-text">Divine Interface</span>
                        </motion.h2>
                        <p className="text-xl text-gray-600 mb-12 max-w-lg">
                            Navigate seamlessly between darshans, chants, and wisdom. Designed for peace and easy access.
                        </p>

                        <div className="space-y-4">
                            {tabs.map((tab) => (
                                <motion.button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab)}
                                    className={`w-full text-left p-4 rounded-2xl flex items-center gap-4 transition-all duration-300 border ${activeTab.id === tab.id
                                        ? 'bg-white shadow-orange border-orange-100 scale-102'
                                        : 'bg-transparent border-transparent hover:bg-white/50'
                                        }`}
                                >
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white transition-colors duration-300 ${activeTab.id === tab.id ? tab.color : 'bg-gray-200 text-gray-400'
                                        }`}>
                                        {tab.icon}
                                    </div>
                                    <div>
                                        <h3 className={`font-bold text-lg ${activeTab.id === tab.id ? 'text-gray-900' : 'text-gray-500'}`}>
                                            {tab.label}
                                        </h3>
                                    </div>
                                </motion.button>
                            ))}
                        </div>
                    </div>

                    {/* Right Side: Phone Mockup */}
                    <div className="relative flex justify-center lg:justify-end">
                        {/* Decor circles */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-orange-100 to-pink-100 rounded-full blur-3xl opacity-50 scale-110" />

                        <motion.div
                            layoutId="phone-mockup"
                            className="relative z-10 w-[320px] h-[650px] bg-gray-900 rounded-[3rem] border-8 border-gray-900 shadow-2xl overflow-hidden"
                        >
                            {/* Status Bar */}
                            <div className="absolute top-0 w-full h-[12%] bg-gradient-to-b from-black/20 to-transparent z-20 flex justify-center pt-5">
                                <div className="w-24 h-6 bg-black rounded-full" />
                            </div>

                            {/* Dynamic Screen Content */}
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="w-full h-full bg-[#FFF3E0] pt-14 flex flex-col"
                                >
                                    {/* Mock App Header */}
                                    <div className="px-6 mb-6 flex justify-between items-center">
                                        <div>
                                            <div className="text-xs text-orange-600 font-bold uppercase tracking-wider">Prarthana</div>
                                            <h2 className="text-2xl font-bold text-gray-800">{activeTab.content.title}</h2>
                                        </div>
                                        <div className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center">
                                            <Bell size={18} className="text-gray-400" />
                                        </div>
                                    </div>

                                    {/* Featured Card */}
                                    <div className="px-6 mb-6">
                                        <div className={`w-full aspect-video rounded-2xl shadow-lg ${activeTab.color} p-4 text-white relative overflow-hidden group`}>
                                            <div className="absolute top-0 right-0 p-4 opacity-20">
                                                {activeTab.icon}
                                            </div>
                                            <div className="absolute bottom-4 left-4">
                                                <p className="text-xs opacity-80 mb-1">{activeTab.content.items[0].time} • Now Playing</p>
                                                <h3 className="font-bold text-lg">{activeTab.content.items[0].title}</h3>
                                            </div>
                                            <div className="absolute center bg-white/20 p-3 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 backdrop-blur-sm">
                                                <Play fill="white" size={24} />
                                            </div>
                                        </div>
                                    </div>

                                    {/* List Content */}
                                    <div className="flex-1 bg-white rounded-t-3xl p-6 shadow-md">
                                        <h4 className="font-bold text-gray-400 text-sm mb-4 uppercase">Up Next</h4>
                                        <div className="space-y-4">
                                            {[1, 2, 3].map((i) => (
                                                <div key={i} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl transition-colors">
                                                    <div className="w-12 h-12 rounded-lg bg-gray-100 flex-shrink-0" />
                                                    <div className="flex-1">
                                                        <div className="h-4 w-3/4 bg-gray-100 rounded mb-2" />
                                                        <div className="h-3 w-1/2 bg-gray-50 rounded" />
                                                    </div>
                                                    <Heart size={16} className="text-gray-300" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Bottom Nav */}
                                    <div className="h-20 bg-white border-t flex items-center justify-around text-gray-400">
                                        <div className="p-2 text-orange-500"><Menu size={24} /></div>
                                        <div className="p-2"><Search size={24} /></div>
                                        <div className="p-2"><Heart size={24} /></div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AppShowcase;
