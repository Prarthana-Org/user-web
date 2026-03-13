import React from 'react';
import { motion } from 'framer-motion';
import { Music, Video, BookOpen, MapPin, Star, Heart } from 'lucide-react';

const features = [
    {
        icon: <Music size={32} color="#DB2777" />,
        title: "Devotional Audio",
        desc: "Listen to thousands of bhajans, aartis, and mantras. Create your own playlists for daily meditation.",
        color: "bg-pink-50 border-pink-100"
    },
    {
        icon: <Video size={32} color="#0891B2" />,
        title: "Live Darshan",
        desc: "Watch live streams from major temples across India. Never miss a moment of divine connection.",
        color: "bg-cyan-50 border-cyan-100"
    },
    {
        icon: <BookOpen size={32} color="#2563EB" />,
        title: "Spiritual Courses",
        desc: "Deepen your knowledge with structured courses on Vedas, Upanishads, and Meditation techniques.",
        color: "bg-blue-50 border-blue-100"
    },
    {
        icon: <MapPin size={32} color="#059669" />,
        title: "Locate Temples",
        desc: "Find nearby temples, check timings, and get directions instantly with our temple locator.",
        color: "bg-emerald-50 border-emerald-100"
    }
];

const Features = () => {
    return (
        <section id="features" className="bg-white/50 backdrop-blur-sm">
            <div className="container">
                <div className="text-center max-w-3xl mx-auto mb-20 px-6">
                    <h2 className="text-4xl lg:text-6xl font-bold mb-8 text-gray-900 tracking-tight">
                        Everything you need for your <span className="gradient-text">Spiritual Path</span>
                    </h2>
                    <p className="text-xl text-gray-600 leading-relaxed font-light">
                        Prarthana brings the temple experience to your fingertips with features designed to enhance your daily devotion.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 lg:gap-16 px-6">
                    {features.map((feature, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1, duration: 0.5 }}
                            whileHover={{ y: -10 }}
                            className={`p-8 rounded-2xl border ${feature.color} hover:shadow-lg transition-all cursor-default relative overflow-hidden`}
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                {feature.icon}
                            </div>
                            <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-gray-800">{feature.title}</h3>
                            <p className="text-gray-600 leading-relaxed text-sm">
                                {feature.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Pro Banner */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="mt-32 p-12 rounded-[2.5rem] bg-gray-900 text-white relative overflow-hidden shadow-2xl"
                >
                    <div className="absolute top-0 right-0 opacity-10 blur-2xl">
                        <div className="w-96 h-96 bg-orange-500 rounded-full" />
                    </div>

                    <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
                        <div className="max-w-xl">
                            <div className="flex items-center gap-2 mb-6">
                                <div className="bg-orange-500 p-1 rounded-md">
                                    <Star size={16} className="text-white fill-white" />
                                </div>
                                <span className="font-bold tracking-[0.2em] text-sm text-orange-400">PRARTHANA PRO</span>
                            </div>
                            <h3 className="text-4xl lg:text-5xl font-bold mb-8">Go deeper with Premium Features</h3>
                            <ul className="grid sm:grid-cols-2 gap-6 text-gray-400">
                                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-orange-500 rounded-full" /> Ad-free experience</li>
                                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-orange-500 rounded-full" /> Unlimited downloads</li>
                                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-orange-500 rounded-full" /> Exclusive courses</li>
                                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-orange-500 rounded-full" /> High-quality audio</li>
                            </ul>
                        </div>
                        <button className="bg-orange-500 text-white px-10 py-5 rounded-2xl font-bold hover:bg-orange-600 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-orange-500/20 whitespace-nowrap">
                            Upgrade to Pro
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Features;
