import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Sparkles, AlertCircle, Bot, ArrowRight } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

const systemInstruction = `You are the AI cognitive assistant for Prarthana Sciences. Prarthana provides the following tools for mental evolution and autonomic regulation:
- Curriculums (structured models of consciousness, e.g., neural pathways of meditation).
- Frequencies & Soundscapes (binaural beats, acoustic chants).
- Repetition Trackers (quantifiable metrics for breath and mantra cycles).
- Archive (searchable database of ancient cognitive texts).

Your instructions:
1. Always answer as if you are exclusively trained for the Prarthana matrix.
2. Be precise, analytical, and objective in your tone. Replace religious terms with psychological, neurological, or acoustic terminology (e.g., 'chant' -> 'acoustic repetition', 'blessing' -> 'positive cognitive state').
3. Do not provide information outside of neuroscience, meditation, and Prarthana-related contexts. 
4. Keep responses concise — 2–3 sentences max unless the user asks for detail.`;

const quickSuggestions = [
    "What is the Prarthana Matrix?",
    "Suggest a 432Hz frequency",
    "Track my breath cycle",
    "Explain neuroplasticity",
];

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: "System initialized. I am your cognitive assistant. How can we optimize your neural state today?", sender: 'bot' }
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
                text: "Neural link severed. Please check your API key or try again later.",
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
                        className="mb-4 flex flex-col overflow-hidden glass-panel"
                        style={{
                            width: 'min(400px, calc(100vw - 48px))',
                            height: 'min(560px, calc(100vh - 120px))',
                            borderRadius: '24px',
                        }}
                    >
                        {/* Header */}
                        <div
                            style={{
                                background: 'var(--panel-2)',
                                padding: '20px 20px 16px',
                                borderBottom: '1px solid var(--line)'
                            }}
                        >
                            <div className="flex justify-between items-start">
                                <div className="flex items-center gap-3">
                                    <div
                                        className="flex items-center justify-center"
                                        style={{
                                            width: 44, height: 44,
                                            borderRadius: 14,
                                            background: 'var(--midnight)',
                                            border: '1px solid var(--thread-dim)'
                                        }}
                                    >
                                        <Bot size={22} color="var(--thread)" />
                                    </div>
                                    <div>
                                        <h3 className="font-disp font-bold text-[var(--ink)] text-lg leading-tight">
                                            Cognitive Matrix
                                        </h3>
                                        <div className="flex items-center gap-1.5 mt-0.5">
                                            <span
                                                style={{
                                                    width: 7, height: 7,
                                                    borderRadius: '50%',
                                                    background: 'var(--t1)',
                                                    display: 'inline-block',
                                                    boxShadow: '0 0 6px var(--t1)',
                                                }}
                                            />
                                            <span className="text-[11px] font-mono text-[var(--faint)] tracking-widest uppercase">
                                                System Online
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-1.5 rounded-full transition-colors hover:bg-[var(--line)]"
                                >
                                    <X size={18} color="var(--thread)" />
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
                            {!isConfigured && (
                                <div
                                    style={{
                                        padding: '12px 14px',
                                        borderRadius: 16,
                                        background: 'rgba(228, 87, 46, 0.1)',
                                        border: '1px solid rgba(228, 87, 46, 0.2)',
                                        display: 'flex',
                                        alignItems: 'flex-start',
                                        gap: 10,
                                    }}
                                >
                                    <AlertCircle size={18} color="var(--sindoor)" style={{ marginTop: 2, flexShrink: 0 }} />
                                    <p style={{ fontSize: 13, color: 'var(--sindoor)', lineHeight: 1.5 }}>
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
                                                background: 'var(--panel-2)',
                                                border: '1px solid var(--thread-dim)',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            }}
                                        >
                                            <Sparkles size={14} color="var(--thread)" />
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
                                                    background: 'var(--panel-2)',
                                                    border: '1px solid var(--thread)',
                                                    color: 'var(--thread)',
                                                }
                                                : msg.type === 'error'
                                                    ? {
                                                        background: 'rgba(228, 87, 46, 0.1)',
                                                        color: 'var(--sindoor)',
                                                        border: '1px solid rgba(228, 87, 46, 0.2)',
                                                    }
                                                    : {
                                                        background: 'var(--panel)',
                                                        color: 'var(--ink)',
                                                        border: '1px solid var(--line)',
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
                                                fontSize: 11,
                                                fontFamily: 'var(--font-mono)',
                                                cursor: 'pointer',
                                                border: '1px solid var(--line)',
                                                background: 'var(--panel)',
                                                color: 'var(--thread)',
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
                                            background: 'var(--panel-2)',
                                            border: '1px solid var(--thread-dim)',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        }}
                                    >
                                        <Sparkles size={14} color="var(--thread)" />
                                    </div>
                                    <div
                                        style={{
                                            padding: '12px 18px',
                                            borderRadius: '18px 18px 18px 4px',
                                            background: 'var(--panel)',
                                            border: '1px solid var(--line)',
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
                                                    background: 'var(--thread)',
                                                }}
                                            />
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </div>

                        {/* Input Area */}
                        <div style={{ padding: '12px 16px 16px', background: 'var(--panel-2)', borderTop: '1px solid var(--line)' }}>
                            <div
                                style={{
                                    display: 'flex', alignItems: 'center', gap: 8,
                                    padding: '6px 6px 6px 16px',
                                    borderRadius: 50,
                                    background: 'var(--midnight)',
                                    border: '1px solid var(--line)',
                                }}
                            >
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Input query..."
                                    disabled={isLoading}
                                    style={{
                                        flex: 1,
                                        background: 'transparent',
                                        border: 'none',
                                        outline: 'none',
                                        fontSize: 14,
                                        fontFamily: 'var(--font-mono)',
                                        color: 'var(--ink)',
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
                                        border: '1px solid var(--thread)',
                                        cursor: isLoading || !inputValue.trim() ? 'not-allowed' : 'pointer',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        background: isLoading || !inputValue.trim()
                                            ? 'var(--panel)'
                                            : 'var(--thread)',
                                        transition: 'all 0.2s',
                                    }}
                                >
                                    <Send
                                        size={17}
                                        color={isLoading || !inputValue.trim()
                                            ? 'var(--faint)'
                                            : 'var(--midnight)'
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
                    border: '1px solid var(--thread)',
                    cursor: 'pointer',
                    background: 'var(--panel-2)',
                    color: 'var(--thread)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: 'var(--shadow-glow)',
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
                            border: '2px solid var(--thread)',
                        }}
                    />
                )}
            </motion.button>
        </div>
    );
};

export default Chatbot;
