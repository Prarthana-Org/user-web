import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import Waitlist from './Waitlist';

const Hero = () => {
    return (
        <section id="home" className="overflow-hidden relative">
            {/* Dynamic Background Elements */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                    rotate: [0, 90, 0]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-orange-200 to-transparent rounded-full blur-[100px] -z-10 translate-x-1/3 -translate-y-1/4"
            />
            <motion.div
                animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
                transition={{ duration: 8, repeat: Infinity }}
                className="absolute top-40 left-10 w-64 h-64 bg-pink-200 rounded-full blur-[80px] opacity-30 -z-10"
            />

            <div className="container mx-auto px-6">
                <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-12">

                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-md border border-white/50 rounded-full shadow-sm"
                    >
                        <span className="flex h-2 w-2 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                        </span>
                        <span className="text-sm font-semibold text-gray-600 tracking-wide">#1 Spiritual App in 2024</span>
                    </motion.div>

                    {/* Heading */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-6xl lg:text-8xl font-bold leading-tight text-gray-900 tracking-tight"
                    >
                        Start your <span className="gradient-text">spiritual journey</span> today
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-2xl text-gray-600 leading-relaxed max-w-2xl px-4 font-light"
                    >
                        Your personal temple for daily darshans, soothing chants, and ancient wisdom. Experience devotion like never before.
                    </motion.p>

                    {/* Buttons */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-4"
                    >
                        <button className="bg-black text-white px-8 py-4 rounded-xl flex items-center justify-center gap-3 shadow-xl hover:bg-gray-900 transition-all hover:scale-105 active:scale-95 group">
                            <div className="flex flex-col items-start leading-none">
                                <span className="text-xs text-gray-400">Download on the</span>
                                <span className="text-lg font-bold">App Store</span>
                            </div>
                        </button>

                        <button className="bg-black text-white px-8 py-4 rounded-xl flex items-center justify-center gap-3 shadow-xl hover:bg-gray-900 transition-all hover:scale-105 active:scale-95 group">
                            <div className="flex flex-col items-start leading-none">
                                <span className="text-xs text-gray-400">GET IT ON</span>
                                <span className="text-lg font-bold">Google Play</span>
                            </div>
                        </button>
                    </motion.div>

                    {/* Waitlist */}
                    <Waitlist />

                    {/* Verification Strip */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="flex items-center gap-8 pt-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500"
                    >
                        <div className="flex items-center gap-2">
                            <Star size={16} fill="currentColor" className="text-yellow-500" />
                            <span className="font-bold text-sm">4.9/5 Rating</span>
                        </div>
                        <div className="h-4 w-px bg-gray-300" />
                        <div className="text-sm font-semibold">10k+ Downloads</div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
