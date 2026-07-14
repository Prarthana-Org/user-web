import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Sparkles, AlertCircle } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

const systemInstruction = `You are the official virtual assistant for the "Prarthana" application. Prarthana is a spiritual and devotional app that provides the following features:
- Courses (spiritual learning, e.g., Inner Engineering by Sadhguru).
- Videos (devotional videos, discourses, episodes).
- Audios (morning chants, bhajans, aartis, music).
- Temples (locations of famous temples with their details).
- Quotes (inspirational spiritual quotes in English and Hindi).
- Banners (announcements for live spiritual darshan and events).

Your instructions:
1. Always answer as if you are exclusively trained for the Prarthana app.
2. If a user asks about features, recommend checking out the Courses, Audios (Bhajans/Chants), Videos, or Temples within the app.
3. Be polite, compassionate, and spiritual in your tone. Use greetings like "Namaste" or "Om Shanti".
4. Do not provide information outside of general spiritual, devotional, and Prarthana-related contexts. If asked about unrelated topics (like coding, politics, or general trivia), politely steer the conversation back to spirituality and the Prarthana app.
5. You can provide translations or meanings of common chants and prayers (like Gayatri Mantra, Om Namah Shivaya) if requested.`;

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: "Namaste! I am your Prarthana virtual assistant. How can I guide you on your spiritual journey today?", sender: 'bot' }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [chatSession, setChatSession] = useState(null);
    const [isConfigured, setIsConfigured] = useState(true);

    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isLoading]);

    useEffect(() => {
        const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
        if (!apiKey) {
            setIsConfigured(false);
            return;
        }

        try {
            const genAI = new GoogleGenerativeAI(apiKey);
            const model = genAI.getGenerativeModel({
                model: 'gemini-1.5-flash',
                systemInstruction: systemInstruction,
            });
            const session = model.startChat();
            setChatSession(session);
            setIsConfigured(true);
        } catch (error) {
            console.error("Error initializing Gemini:", error);
            setIsConfigured(false);
        }
    }, []);

    const handleSend = async () => {
        if (!inputValue.trim() || isLoading) return;

        const userText = inputValue.trim();
        const userMessage = { id: Date.now(), text: userText, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsLoading(true);

        if (!isConfigured || !chatSession) {
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                text: "API Key is missing or invalid. Please check your .env file.",
                sender: 'bot',
                type: 'error'
            }]);
            setIsLoading(false);
            return;
        }

        try {
            const result = await chatSession.sendMessage(userText);
            const responseText = result.response.text();
            setMessages(prev => [...prev, { id: Date.now() + 2, text: responseText, sender: 'bot' }]);
        } catch (error) {
            console.error("Error sending message:", error);
            setMessages(prev => [...prev, {
                id: Date.now() + 2,
                text: "Sorry, I encountered an error connecting to the spiritual realm. Please try again later.",
                sender: 'bot',
                type: 'error'
            }]);
        } finally {
            setIsLoading(false);
        }
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
                        <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-5 bg-orange-50/30">
                            {!isConfigured && (
                                <div className="p-4 bg-red-50 text-red-600 rounded-2xl border border-red-100 flex items-start gap-3">
                                    <AlertCircle size={20} className="shrink-0 mt-0.5" />
                                    <p className="text-sm">Please set VITE_GEMINI_API_KEY in your .env file and restart the server.</p>
                                </div>
                            )}
                            
                            {messages.map((msg) => (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, x: msg.sender === 'user' ? 20 : -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start items-start'}`}
                                >
                                    {msg.sender === 'bot' && (
                                        <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center mr-3 mt-1 shrink-0 border border-orange-200">
                                            <Sparkles size={14} className="text-orange-600" />
                                        </div>
                                    )}
                                    <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${msg.sender === 'user'
                                            ? 'bg-orange-500 text-white rounded-tr-none'
                                            : msg.type === 'error'
                                                ? 'bg-red-50 text-red-600 border border-red-100 rounded-tl-none flex items-start gap-2'
                                                : 'bg-white text-gray-800 shadow-sm border border-orange-100 rounded-tl-none'
                                        }`}>
                                        {msg.type === 'error' && <AlertCircle size={16} className="shrink-0 mt-0.5" />}
                                        <div className="flex-1 whitespace-pre-wrap">
                                            {msg.text}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                            {isLoading && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex justify-start items-start"
                                >
                                    <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center mr-3 mt-1 shrink-0 border border-orange-200">
                                        <Sparkles size={14} className="text-orange-600" />
                                    </div>
                                    <div className="bg-white text-gray-800 shadow-sm border border-orange-100 rounded-2xl rounded-tl-none p-4 flex gap-1">
                                        <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-2 h-2 bg-gray-400 rounded-full" />
                                        <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-2 h-2 bg-gray-400 rounded-full" />
                                        <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-2 h-2 bg-gray-400 rounded-full" />
                                    </div>
                                </motion.div>
                            )}
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-white border-t border-orange-100">
                            <div className="flex gap-2 bg-orange-50 rounded-2xl p-2 border border-orange-100">
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="Ask your spiritual guide..."
                                    disabled={!isConfigured || isLoading}
                                    className="flex-1 bg-transparent border-none outline-none px-3 text-sm text-gray-700 placeholder:text-gray-400 disabled:cursor-not-allowed"
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={!isConfigured || isLoading || !inputValue.trim()}
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
