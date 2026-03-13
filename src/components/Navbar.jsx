import React, { useState, useEffect } from 'react';
import { Download, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '#home' },
        { name: 'Showcase', href: '#showcase' },
        { name: 'Features', href: '#features' },
        { name: 'Contact', href: '#footer' },
    ];

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-4' : 'py-6'
                    }`}
            >
                <div className={`container mx-auto px-6 ${scrolled ? '' : 'max-w-6xl'
                    }`}>
                    <div className={`glass-panel rounded-full px-6 py-3 flex items-center justify-between transition-all duration-300 ${scrolled ? 'bg-white/90 shadow-lg' : 'bg-white/60 shadow-sm border-white/40'
                        }`}>
                        {/* Logo */}
                        <a href="#" className="flex items-center gap-3 group">
                            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform duration-300">
                                P
                            </div>
                            <span className="text-xl font-bold text-gray-800 tracking-tight group-hover:text-orange-600 transition-colors">
                                Prarthana
                            </span>
                        </a>

                        {/* Desktop Nav */}
                        <div className="hidden md:flex items-center gap-8">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="relative text-gray-600 font-medium hover:text-orange-600 transition-colors px-2 py-1 group"
                                >
                                    {link.name}
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full opacity-80" />
                                </a>
                            ))}
                        </div>

                        {/* CTA */}
                        <div className="hidden md:block">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="btn-primary flex items-center gap-2 text-sm !py-2.5 !px-5"
                            >
                                <Download size={16} strokeWidth={2.5} />
                                <span>Get App</span>
                            </motion.button>
                        </div>

                        {/* Mobile Toggle */}
                        <button
                            className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                            onClick={() => setMobileMenuOpen(true)}
                        >
                            <Menu size={24} />
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] bg-black/20 backdrop-blur-sm"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="absolute right-0 top-0 bottom-0 w-3/4 max-w-sm bg-white shadow-2xl p-6"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between mb-8">
                                <span className="text-xl font-bold text-gray-800">Menu</span>
                                <button
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="p-2 hover:bg-gray-100 rounded-full"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="flex flex-col gap-4">
                                {navLinks.map((link) => (
                                    <a
                                        key={link.name}
                                        href={link.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="text-lg font-medium text-gray-700 p-3 hover:bg-orange-50 hover:text-orange-600 rounded-xl transition-colors"
                                    >
                                        {link.name}
                                    </a>
                                ))}
                                <div className="h-px bg-gray-100 my-2" />
                                <button className="btn-primary w-full justify-center">
                                    Download App
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
