import React, { useState, useEffect, useRef, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Sparkles, AlertCircle, Bot, ArrowRight } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { ThemeContext } from '../ThemeContext';

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
5. You can provide translations or meanings of common chants and prayers (like Gayatri Mantra, Om Namah Shivaya) if requested.
6. Keep responses concise — 2–3 sentences max unless the user asks for detail.`;

const quickSuggestions = [
    "What is Prarthana?",
    "Tell me a mantra",
    "Find temples nearby",
    "Best morning chant?",
];

const Chatbot = () => {
    const { theme } = useContext(ThemeContext);
    const isDark = theme === 'dark';
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: "🙏 Namaste! I'm your Prarthana guide. Ask me about chants, temples, courses, or anything spiritual!", sender: 'bot' }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [chatSession, setChatSession] = useState(null);
    const [isConfigured, setIsConfigured] = useState(true);
    const [showSuggestions, setShowSuggestions] = useState(true);

    const scrollRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isLoading]);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            setTimeout(() => inputRef.current?.focus(), 300);
        }
    }, [isOpen]);

    useEffect(() => {
        const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
        if (!apiKey || !apiKey.startsWith('AIza')) {
            setIsConfigured(false);
            return;
        }

        try {
            const genAI = new GoogleGenerativeAI(apiKey);
            const model = genAI.getGenerativeModel({
                model: 'gemini-2.0-flash',
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

    const handleSend = async (text) => {
        const userText = (text || inputValue).trim();
        if (!userText || isLoading) return;

        const userMessage = { id: Date.now(), text: userText, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsLoading(true);
        setShowSuggestions(false);

        if (!isConfigured || !chatSession) {
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                text: "The Gemini API key is missing or invalid. Please add a valid key (starting with AIza...) to your .env file as VITE_GEMINI_API_KEY.",
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
                text: "I'm having trouble connecting right now. Please check your API key or try again later. 🙏",
                sender: 'bot',
                type: 'error'
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    // Format bot text: basic markdown-like rendering
    const formatBotText = (text) => {
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/^- /gm, '• ');
    };

    return (
        <div className="fixed bottom-6 right-6 z-[100]">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.85, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.85, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="mb-4 flex flex-col overflow-hidden"
                        style={{
                            width: 'min(400px, calc(100vw - 48px))',
                            height: 'min(560px, calc(100vh - 120px))',
                            borderRadius: '24px',
                            background: isDark
                                ? 'rgba(24, 24, 27, 0.92)'
                                : 'rgba(255, 255, 255, 0.88)',
                            backdropFilter: 'blur(24px) saturate(1.8)',
                            WebkitBackdropFilter: 'blur(24px) saturate(1.8)',
                            border: isDark
                                ? '1px solid rgba(255, 255, 255, 0.08)'
                                : '1px solid rgba(255, 138, 92, 0.15)',
                            boxShadow: isDark
                                ? '0 25px 60px -12px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.05)'
                                : '0 25px 60px -12px rgba(255, 107, 53, 0.2), 0 10px 25px -5px rgba(0, 0, 0, 0.08)',
                        }}
                    >
                        {/* Header */}
                        <div
                            style={{
                                background: 'linear-gradient(135deg, #E55A2B, #FF6B35, #FF8A5C)',
                                padding: '20px 20px 16px',
                            }}
                        >
                            <div className="flex justify-between items-start">
                                <div className="flex items-center gap-3">
                                    <div
                                        className="flex items-center justify-center"
                                        style={{
                                            width: 44, height: 44,
                                            borderRadius: 14,
                                            background: 'rgba(255,255,255,0.2)',
                                            backdropFilter: 'blur(8px)',
                                        }}
                                    >
                                        <Bot size={22} color="white" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white text-base leading-tight">
                                            Prarthana Guide
                                        </h3>
                                        <div className="flex items-center gap-1.5 mt-0.5">
                                            <span
                                                style={{
                                                    width: 7, height: 7,
                                                    borderRadius: '50%',
                                                    background: '#4ade80',
                                                    display: 'inline-block',
                                                    boxShadow: '0 0 6px #4ade80',
                                                }}
                                            />
                                            <span className="text-[11px] text-white/80 font-medium tracking-wide">
                                                Always here for you
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-1.5 rounded-full transition-colors"
                                    style={{ background: 'rgba(255,255,255,0.15)' }}
                                >
                                    <X size={18} color="white" />
                                </button>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div
                            ref={scrollRef}
                            className="flex-1 overflow-y-auto"
                            style={{
                                padding: '16px 16px 8px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 12,
                            }}
                        >
                            {/* Config warning */}
                            {!isConfigured && (
                                <div
                                    style={{
                                        padding: '12px 14px',
                                        borderRadius: 16,
                                        background: isDark ? 'rgba(239, 68, 68, 0.15)' : '#FEF2F2',
                                        border: '1px solid rgba(239, 68, 68, 0.2)',
                                        display: 'flex',
                                        alignItems: 'flex-start',
                                        gap: 10,
                                    }}
                                >
                                    <AlertCircle size={18} color="#EF4444" style={{ marginTop: 2, flexShrink: 0 }} />
                                    <p style={{ fontSize: 13, color: '#EF4444', lineHeight: 1.5 }}>
                                        Set a valid <strong>VITE_GEMINI_API_KEY</strong> (starts with AIza...) in your .env file, then restart the dev server.
                                    </p>
                                </div>
                            )}

                            {messages.map((msg) => (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.25 }}
                                    style={{
                                        display: 'flex',
                                        justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                                        alignItems: 'flex-end',
                                        gap: 8,
                                    }}
                                >
                                    {msg.sender === 'bot' && (
                                        <div
                                            style={{
                                                width: 30, height: 30, borderRadius: 10, flexShrink: 0,
                                                background: 'linear-gradient(135deg, #FF6B35, #FF8A5C)',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            }}
                                        >
                                            <Sparkles size={14} color="white" />
                                        </div>
                                    )}
                                    <div
                                        style={{
                                            maxWidth: '78%',
                                            padding: '10px 14px',
                                            borderRadius: msg.sender === 'user'
                                                ? '18px 18px 4px 18px'
                                                : '18px 18px 18px 4px',
                                            fontSize: 13.5,
                                            lineHeight: 1.55,
                                            ...(msg.sender === 'user'
                                                ? {
                                                    background: 'linear-gradient(135deg, #FF6B35, #E55A2B)',
                                                    color: 'white',
                                                }
                                                : msg.type === 'error'
                                                    ? {
                                                        background: isDark ? 'rgba(239, 68, 68, 0.12)' : '#FEF2F2',
                                                        color: '#EF4444',
                                                        border: '1px solid rgba(239, 68, 68, 0.15)',
                                                    }
                                                    : {
                                                        background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(255, 107, 53, 0.06)',
                                                        color: isDark ? '#E5E7EB' : '#374151',
                                                        border: isDark
                                                            ? '1px solid rgba(255,255,255,0.08)'
                                                            : '1px solid rgba(255, 138, 92, 0.12)',
                                                    }
                                            ),
                                        }}
                                    >
                                        {msg.type === 'error' && (
                                            <AlertCircle size={14} style={{ display: 'inline', marginRight: 6, verticalAlign: 'middle' }} />
                                        )}
                                        <span
                                            dangerouslySetInnerHTML={{ __html: msg.sender === 'bot' ? formatBotText(msg.text) : msg.text }}
                                        />
                                    </div>
                                </motion.div>
                            ))}

                            {/* Quick Suggestions */}
                            {showSuggestions && messages.length <= 1 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    style={{
                                        display: 'flex', flexWrap: 'wrap', gap: 8,
                                        paddingTop: 4, paddingLeft: 38,
                                    }}
                                >
                                    {quickSuggestions.map((suggestion, i) => (
                                        <motion.button
                                            key={i}
                                            whileHover={{ scale: 1.04 }}
                                            whileTap={{ scale: 0.96 }}
                                            onClick={() => handleSend(suggestion)}
                                            style={{
                                                padding: '7px 14px',
                                                borderRadius: 20,
                                                fontSize: 12,
                                                fontWeight: 500,
                                                cursor: 'pointer',
                                                border: isDark
                                                    ? '1px solid rgba(255, 138, 92, 0.25)'
                                                    : '1px solid rgba(255, 107, 53, 0.2)',
                                                background: isDark
                                                    ? 'rgba(255, 107, 53, 0.1)'
                                                    : 'rgba(255, 107, 53, 0.06)',
                                                color: isDark ? '#FF8A5C' : '#E55A2B',
                                                display: 'flex', alignItems: 'center', gap: 4,
                                                transition: 'all 0.2s',
                                            }}
                                        >
                                            {suggestion}
                                            <ArrowRight size={12} />
                                        </motion.button>
                                    ))}
                                </motion.div>
                            )}

                            {/* Typing indicator */}
                            {isLoading && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}
                                >
                                    <div
                                        style={{
                                            width: 30, height: 30, borderRadius: 10, flexShrink: 0,
                                            background: 'linear-gradient(135deg, #FF6B35, #FF8A5C)',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        }}
                                    >
                                        <Sparkles size={14} color="white" />
                                    </div>
                                    <div
                                        style={{
                                            padding: '12px 18px',
                                            borderRadius: '18px 18px 18px 4px',
                                            background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(255, 107, 53, 0.06)',
                                            border: isDark
                                                ? '1px solid rgba(255,255,255,0.08)'
                                                : '1px solid rgba(255, 138, 92, 0.12)',
                                            display: 'flex', gap: 5, alignItems: 'center',
                                        }}
                                    >
                                        {[0, 1, 2].map(i => (
                                            <motion.div
                                                key={i}
                                                animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
                                                transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.15 }}
                                                style={{
                                                    width: 7, height: 7, borderRadius: '50%',
                                                    background: isDark ? '#FF8A5C' : '#FF6B35',
                                                }}
                                            />
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </div>

                        {/* Input Area */}
                        <div style={{ padding: '12px 16px 16px' }}>
                            <div
                                style={{
                                    display: 'flex', alignItems: 'center', gap: 8,
                                    padding: '6px 6px 6px 16px',
                                    borderRadius: 50,
                                    background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(255, 107, 53, 0.05)',
                                    border: isDark
                                        ? '1px solid rgba(255,255,255,0.1)'
                                        : '1px solid rgba(255, 138, 92, 0.15)',
                                    transition: 'border-color 0.2s',
                                }}
                            >
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Ask your spiritual guide..."
                                    disabled={isLoading}
                                    style={{
                                        flex: 1,
                                        background: 'transparent',
                                        border: 'none',
                                        outline: 'none',
                                        fontSize: 14,
                                        color: isDark ? '#E5E7EB' : '#374151',
                                        fontFamily: 'inherit',
                                    }}
                                />
                                <motion.button
                                    whileHover={{ scale: 1.08 }}
                                    whileTap={{ scale: 0.92 }}
                                    onClick={() => handleSend()}
                                    disabled={isLoading || !inputValue.trim()}
                                    style={{
                                        width: 40, height: 40,
                                        borderRadius: '50%',
                                        border: 'none',
                                        cursor: isLoading || !inputValue.trim() ? 'not-allowed' : 'pointer',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        background: isLoading || !inputValue.trim()
                                            ? (isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)')
                                            : 'linear-gradient(135deg, #FF6B35, #E55A2B)',
                                        transition: 'all 0.2s',
                                    }}
                                >
                                    <Send
                                        size={17}
                                        color={isLoading || !inputValue.trim()
                                            ? (isDark ? '#6B7280' : '#9CA3AF')
                                            : 'white'
                                        }
                                    />
                                </motion.button>
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
                style={{
                    width: 60, height: 60,
                    borderRadius: '50%',
                    border: 'none',
                    cursor: 'pointer',
                    background: 'linear-gradient(135deg, #FF6B35, #E55A2B)',
                    color: 'white',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 8px 30px -4px rgba(255, 107, 53, 0.5), 0 0 0 4px rgba(255, 107, 53, 0.1)',
                    position: 'relative',
                }}
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={isOpen ? 'close' : 'open'}
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {isOpen ? <X size={26} /> : <MessageCircle size={26} />}
                    </motion.div>
                </AnimatePresence>

                {/* Pulse ring */}
                {!isOpen && (
                    <motion.div
                        animate={{ scale: [1, 1.5, 1.5], opacity: [0.5, 0, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        style={{
                            position: 'absolute', inset: -4,
                            borderRadius: '50%',
                            border: '2px solid #FF6B35',
                        }}
                    />
                )}
            </motion.button>
        </div>
    );
};

export default Chatbot;
