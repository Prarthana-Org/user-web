import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Heart } from 'lucide-react';

const Footer = () => {
    return (
        <footer id="footer" className="bg-gray-900 text-white pt-16 pb-8">
            <div className="container mx-auto px-6 max-w-6xl">
                <div className="grid md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-1 md:col-span-2">
                        <div className="text-2xl font-bold text-orange-500 mb-4">Prarthana</div>
                        <p className="text-gray-400 max-w-sm">
                            Your daily companion for spiritual growth, meditation, and devotion. Join our community of devotees today.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><a href="#home" className="hover:text-orange-500 transition-colors">Home</a></li>
                            <li><a href="#showcase" className="hover:text-orange-500 transition-colors">Showcase</a></li>
                            <li><a href="#features" className="hover:text-orange-500 transition-colors">Features</a></li>
                            <li><a href="#footer" className="hover:text-orange-500 transition-colors">Contact</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4">Legal</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><a href="#" className="hover:text-orange-500 transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-orange-500 transition-colors">Terms of Service</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="text-gray-500 text-sm">
                        © 2024 Prarthana App. All rights reserved.
                    </div>
                    <div className="flex items-center gap-6">
                        <Facebook size={20} className="text-gray-400 hover:text-white transition-colors cursor-pointer" />
                        <Twitter size={20} className="text-gray-400 hover:text-white transition-colors cursor-pointer" />
                        <Instagram size={20} className="text-gray-400 hover:text-white transition-colors cursor-pointer" />
                        <Youtube size={20} className="text-gray-400 hover:text-white transition-colors cursor-pointer" />
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
