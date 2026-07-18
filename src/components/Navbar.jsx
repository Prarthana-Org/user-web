import React, { useState, useEffect, useContext } from 'react';
import { Download, Menu, X, Moon, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeContext } from '../ThemeContext';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { theme, toggleTheme } = useContext(ThemeContext);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '#home' },
        { name: 'About Us', href: '#about-us' },
        { name: 'Knowledge Tree', href: '#knowledge-tree' },

        { name: 'Explore Prarthana', href: '#showcase' },
        { name: 'Features', href: '#features' },
        { name: 'Why Prarthana', href: '#why-prarthana' },
        { name: 'Contact', href: '#footer' },
    ];

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                    scrolled ? 'py-4 bg-[var(--surface-color)]/80 shadow-sm backdrop-blur-md' : 'py-6 bg-transparent'
                }`}
            >
                <div className="w-full px-6 md:px-12">
                    <div className={`flex items-center justify-between transition-all duration-300`}>
                        {/* Logo */}
                        <a href="#" className="flex items-center gap-3 group">
                            <img
                                src={`${import.meta.env.BASE_URL}prarthana_logo.png`}
                                alt="Prarthana"
                                className="h-10 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
                            />
                            <span className="text-xl font-bold text-[var(--text-primary)] tracking-tight group-hover:text-orange-600 transition-colors">
                                Prarthana
                            </span>
                        </a>

                        {/* Desktop Nav */}
                        <div className="hidden md:flex items-center gap-8">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    target={link.target || '_self'}
                                    rel={link.target === '_blank' ? 'noopener noreferrer' : undefined}
                                    className="relative text-[var(--text-secondary)] font-medium hover:text-orange-600 transition-colors px-2 py-1 group"
                                    onClick={(e) => {
                                        if (link.href.startsWith('#') && link.target !== '_blank') {
                                            e.preventDefault();
                                            window.location.hash = link.href;
                                            setTimeout(() => {
                                                const el = document.querySelector(link.href);
                                                if (el) el.scrollIntoView({ behavior: 'smooth' });
                                            }, 100);
                                        }
                                    }}
                                >
                                    {link.name}
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full opacity-80" />
                                </a>
                            ))}
                        </div>

                        {/* Actions */}
                        <div className="hidden md:flex items-center gap-4">
                            <button
                                onClick={toggleTheme}
                                className="p-2 text-[var(--text-secondary)] hover:bg-white/10 rounded-full transition-colors"
                                aria-label="Toggle theme"
                            >
                                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                            </button>
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
                        <div className="flex md:hidden items-center gap-2">
                            <button
                                onClick={toggleTheme}
                                className="p-2 text-[var(--text-secondary)] hover:bg-white/10 rounded-full transition-colors"
                            >
                                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                            </button>
                            <button
                                className="p-2 text-[var(--text-secondary)] hover:bg-white/10 rounded-full transition-colors"
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
                        className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="absolute right-0 top-0 bottom-0 w-3/4 max-w-sm bg-[var(--surface-color)] shadow-2xl p-6"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between mb-8">
                                <span className="text-xl font-bold text-[var(--text-primary)]">Menu</span>
                                <button
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="p-2 hover:bg-[var(--text-hint)]/10 rounded-full text-[var(--text-primary)]"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="flex flex-col gap-4">
                                {navLinks.map((link) => (
                                    <a
                                        key={link.name}
                                        href={link.href}
                                        target={link.target || '_self'}
                                        rel={link.target === '_blank' ? 'noopener noreferrer' : undefined}
                                        onClick={(e) => {
                                            if (link.target !== '_blank') {
                                                setMobileMenuOpen(false);
                                                if (link.href.startsWith('#')) {
                                                    e.preventDefault();
                                                    window.location.hash = link.href;
                                                    setTimeout(() => {
                                                        const el = document.querySelector(link.href);
                                                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                                                    }, 100);
                                                }
                                            }
                                        }}
                                        className="text-lg font-medium text-[var(--text-secondary)] p-3 hover:bg-[var(--text-hint)]/10 hover:text-orange-600 rounded-xl transition-colors"
                                    >
                                        {link.name}
                                    </a>
                                ))}
                                <div className="h-px bg-[var(--text-hint)]/20 my-2" />
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
