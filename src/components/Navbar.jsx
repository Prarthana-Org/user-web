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
                    <div className={`rounded-full px-6 py-3 flex items-center justify-between transition-all duration-300 ${scrolled ? 'glass-panel' : 'bg-transparent border border-transparent'
                        }`}>
                        {/* Logo */}
                        <a href="#" className="flex items-center gap-3 group">
                            <span className="text-2xl font-bold font-disp gradient-text tracking-tight transition-colors">
                                Prarthana
                            </span>
                        </a>

                        {/* Desktop Nav */}
                        <div className="hidden md:flex items-center gap-8">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="relative text-[var(--text-hint)] font-mono text-[0.66rem] uppercase tracking-widest hover:text-[var(--thread)] transition-colors px-2 py-1 group"
                                >
                                    {link.name}
                                    <span className="absolute bottom-0 left-0 w-0 h-px bg-[var(--thread)] transition-all duration-300 group-hover:w-full opacity-80" />
                                </a>
                            ))}
                        </div>

                        {/* Actions */}
                        <div className="hidden md:flex items-center gap-4">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="btn-primary flex items-center gap-2"
                            >
                                <Download size={14} />
                                <span>Get App</span>
                            </motion.button>
                        </div>

                        {/* Mobile Toggle */}
                        <div className="flex md:hidden items-center gap-2">
                            <button
                                className="p-2 text-[var(--thread)] hover:bg-[var(--line)] rounded-full transition-colors"
                                onClick={() => setMobileMenuOpen(true)}
                            >
                                <Menu size={24} />
                            </button>
                        </div>
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
                        className="fixed inset-0 z-[60] bg-[var(--midnight)]/80 backdrop-blur-md"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="absolute right-0 top-0 bottom-0 w-3/4 max-w-sm bg-[var(--panel)] border-l border-[var(--line)] shadow-2xl p-6"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between mb-8">
                                <span className="text-xl font-bold font-disp gradient-text">Menu</span>
                                <button
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="p-2 hover:bg-[var(--line)] rounded-full text-[var(--thread)]"
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
                                        className="font-mono text-sm tracking-widest uppercase text-[var(--text-hint)] p-3 hover:bg-[var(--line)] hover:text-[var(--thread)] rounded-xl transition-colors"
                                    >
                                        {link.name}
                                    </a>
                                ))}
                                <div className="h-px bg-[var(--line)] my-2" />
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
