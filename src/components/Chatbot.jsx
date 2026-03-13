import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Sparkles, Download, AlertCircle } from 'lucide-react';

const WELLBEING_RESPONSES = {
    peace: "Close your eyes and focus on your breath. Peace is not in the absence of noise, but in the stillness within. Try a 5-minute guided meditation on the Prarthana app.",
    stress: "Stress is like a cloud, but you are the sky. Clouds come and go, but the sky remains vast. Chanting 'Om' or listening to soothing bhajans can help calm your mind.",
    anxiety: "Take a deep breath. Focus on the present moment. Reciting the 'Gayatri Mantra' 11 times can help ground your energy and provide clarity.",
    focus: "Concentration is a muscle. Practice Trataka (candle gazing) or listen to rhythmic Vedic chants to improve your mental sharpness.",
    sleep: "Rest is sacred. Prior to sleeping, listen to the 'Nidra Yoga' session or peaceful flute music available in our library.",
    default: "I am here to guide you on your spiritual journey. Try asking about peace, meditation, or daily darshans."
};

const INAPPROPRIATE_KEYWORDS = ['violence', 'hate', 'badword1', 'badword2']; // Example placeholders

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: "Namaste! I am your Prarthana Guide. How can I help your wellbeing today?", sender: 'bot' }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [queryCount, setQueryCount] = useState(0);
    const [isBlocked, setIsBlocked] = useState(false);

    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = () => {
        if (!inputValue.trim() || isBlocked) return;

        const userMessage = { id: Date.now(), text: inputValue, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        setInputValue('');

        // 1. Content Filtering
        const isInappropriate = INAPPROPRIATE_KEYWORDS.some(word => inputValue.toLowerCase().includes(word));
        if (isInappropriate) {
            setTimeout(() => {
                setMessages(prev => [...prev, {
                    id: Date.now() + 1,
                    text: "I am here to support your spiritual growth. Please keep our conversation focused on wellbeing and peace.",
                    sender: 'bot',
                    type: 'error'
                }]);
            }, 600);
            return;
        }

        // 2. Query Limiting & Response Logic
        setTimeout(() => {
            const currentCount = queryCount + 1;
            setQueryCount(currentCount);

            if (currentCount >= 3) {
                setMessages(prev => [...prev, {
                    id: Date.now() + 2,
                    text: "To access personalized guidance, live darshans, and our full library of Vedic wisdom, download the Prarthana app today!",
                    sender: 'bot',
                    type: 'cta'
                }]);
                setIsBlocked(true);
            } else {
                let botResponse = WELLBEING_RESPONSES.default;
                for (let key in WELLBEING_RESPONSES) {
                    if (inputValue.toLowerCase().includes(key)) {
                        botResponse = WELLBEING_RESPONSES[key];
                        break;
                    }
                }
                setMessages(prev => [...prev, { id: Date.now() + 2, text: botResponse, sender: 'bot' }]);
            }
        }, 800);
    };

    return (
        <div className="fixed bottom-6 right-6 z-[100]">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        className="mb-4 w-[350px] sm:w-[400px] h-[500px] bg-white rounded-3xl shadow-2xl border border-orange-100 flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4 text-white flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                                    <Sparkles size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold">Prarthana Guide</h3>
                                    <div className="text-[10px] opacity-80 uppercase tracking-widest font-bold">Online Now</div>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-2 rounded-full transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-orange-50/30">
                            {messages.map((msg) => (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, x: msg.sender === 'user' ? 20 : -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`max-w-[80%] p-4 rounded-2xl text-sm ${msg.sender === 'user'
                                            ? 'bg-orange-500 text-white rounded-tr-none'
                                            : msg.type === 'error'
                                                ? 'bg-red-50 text-red-600 border border-red-100 rounded-tl-none flex items-start gap-2'
                                                : msg.type === 'cta'
                                                    ? 'bg-gray-900 text-white rounded-tl-none shadow-xl border border-orange-500/30'
                                                    : 'bg-white text-gray-700 shadow-sm border border-orange-100 rounded-tl-none'
                                        }`}>
                                        {msg.type === 'error' && <AlertCircle size={16} className="shrink-0 mt-0.5" />}
                                        <div>
                                            {msg.text}
                                            {msg.type === 'cta' && (
                                                <div className="mt-4 flex gap-2">
                                                    <button className="flex-1 bg-orange-500 text-white py-2 rounded-lg text-xs font-bold hover:bg-orange-600 transition-colors flex items-center justify-center gap-1">
                                                        <Download size={12} /> App Store
                                                    </button>
                                                    <button className="flex-1 bg-white text-gray-900 py-2 rounded-lg text-xs font-bold hover:bg-gray-100 transition-colors flex items-center justify-center gap-1">
                                                        <Download size={12} /> Google Play
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-white border-t border-orange-100">
                            <div className="flex gap-2 bg-orange-50 rounded-2xl p-2 border border-orange-100">
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder={isBlocked ? "App required for more queries..." : "Type your query..."}
                                    disabled={isBlocked}
                                    className="flex-1 bg-transparent border-none outline-none px-3 text-sm text-gray-700 placeholder:text-gray-400 disabled:cursor-not-allowed"
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={isBlocked || !inputValue.trim()}
                                    className="bg-orange-500 text-white p-2 rounded-xl hover:bg-orange-600 transition-colors disabled:opacity-50"
                                >
                                    <Send size={18} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* FAB */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-full shadow-2xl flex items-center justify-center border-4 border-white group relative"
            >
                {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
                {!isOpen && (
                    <motion.div
                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 bg-orange-400 rounded-full -z-10"
                    />
                )}
            </motion.button>
        </div>
    );
};

export default Chatbot;
