import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, Minus, Sparkles, Phone, ShieldAlert, ChevronDown } from 'lucide-react';

// Gemini-style 4-pointed star icon
const GeminiIcon = ({ size = 24, color = 'white' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 2C12 2 13.5 8.5 17 12C13.5 15.5 12 22 12 22C12 22 10.5 15.5 7 12C10.5 8.5 12 2 12 2Z"
      fill={color}
    />
    <path
      d="M2 12C2 12 8.5 13.5 12 17C15.5 13.5 22 12 22 12C22 12 15.5 10.5 12 7C8.5 10.5 2 12 2 12Z"
      fill={color}
      fillOpacity="0.85"
    />
  </svg>
);

const PRE_PROMPTS = [
  { label: '😰 What is anxiety?', text: 'What is anxiety and what are its common symptoms?' },
  { label: '😔 Signs of depression', text: 'What are the signs and symptoms of depression?' },
  { label: '🧘 Manage stress', text: 'What are effective techniques to manage stress?' },
  { label: '💭 What is CBT?', text: 'What is cognitive behavioral therapy (CBT) and how does it help?' },
  { label: '😴 Sleep & mental health', text: 'How does sleep affect mental health?' },
  { label: '😤 Panic attacks', text: 'How do I cope with a panic attack?' },
  { label: '🌬️ Breathing exercises', text: 'Can you guide me through a calming breathing exercise?' },
  { label: '🌤️ Improve my mood', text: 'What are quick ways to lift my mood when I feel low?' },
];

const INITIAL_MESSAGE = {
  role: 'assistant',
  content: "Hi! I'm Serene 👋 Ask me anything about mental health, disorders, coping techniques, or simply how you're feeling.",
};

const AiChatBubble = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showCrisisModal, setShowCrisisModal] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isMinimized]);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      setUnreadCount(0);
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen, isMinimized]);

  const sendMessage = async (text) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    const userMessage = { role: 'user', content: trimmed };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const { data } = await axios.post('/api/ai/chat', {
        message: trimmed,
        history: messages,
      });
      setMessages(prev => [...prev, data]);
      if (!isOpen || isMinimized) setUnreadCount(prev => prev + 1);
      if (data.isCrisis) setShowCrisisModal(true);
    } catch {
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: "Sorry, I'm having trouble connecting right now. Please try again." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handlePrePrompt = (text) => {
    sendMessage(text);
  };

  const handleOpen = () => {
    setIsOpen(true);
    setIsMinimized(false);
    setUnreadCount(0);
  };

  const handleClose = () => {
    setIsOpen(false);
    setUnreadCount(0);
  };

  const showPrePrompts = messages.length === 1;

  return (
    <>
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20, originX: 1, originY: 1 }}
            animate={isMinimized
              ? { opacity: 1, scale: 1, y: 0, height: 'auto' }
              : { opacity: 1, scale: 1, y: 0 }
            }
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-96 shadow-2xl shadow-slate-900/20 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 flex flex-col"
            style={{ maxHeight: isMinimized ? 'auto' : '520px' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-linear-to-r from-primary-600 to-primary-500 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center text-white">
                  <GeminiIcon size={18} />
                </div>
                <div>
                  <p className="text-sm font-bold text-white leading-none">Serene</p>
                  <p className="text-[10px] text-primary-100 font-medium mt-0.5 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 inline-block" />
                    AI Mental Health Guide
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsMinimized(v => !v)}
                  className="w-7 h-7 flex items-center justify-center rounded-lg text-white/70 hover:text-white hover:bg-white/20 transition-all"
                  title={isMinimized ? 'Expand' : 'Minimize'}
                >
                  {isMinimized ? <ChevronDown size={14} /> : <Minus size={14} />}
                </button>
                <button
                  onClick={handleClose}
                  className="w-7 h-7 flex items-center justify-center rounded-lg text-white/70 hover:text-white hover:bg-white/20 transition-all"
                  title="Close"
                >
                  <X size={14} />
                </button>
              </div>
            </div>

            {/* Body — hidden when minimized */}
            <AnimatePresence initial={false}>
              {!isMinimized && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  exit={{ height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col bg-white dark:bg-slate-900 overflow-hidden"
                  style={{ maxHeight: '436px' }}
                >
                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3" style={{ minHeight: 0, maxHeight: '310px' }}>
                    {messages.map((msg, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.18 }}
                        className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                      >
                        <div className={`w-6 h-6 rounded-lg shrink-0 flex items-center justify-center text-xs font-bold mt-0.5 ${
                          msg.role === 'user'
                            ? 'bg-primary-100 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400'
                            : 'bg-linear-to-br from-primary-500 to-primary-700'
                        }`}>
                          {msg.role === 'user' ? 'U' : <GeminiIcon size={13} />}
                        </div>
                        <div className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${
                          msg.role === 'user'
                            ? 'bg-primary-600 text-white rounded-tr-sm'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-sm'
                        }`}>
                          {msg.content}
                        </div>
                      </motion.div>
                    ))}

                    {/* Loading dots */}
                    {isLoading && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex gap-2"
                      >
                        <div className="w-6 h-6 rounded-lg bg-linear-to-br from-primary-500 to-primary-700 flex items-center justify-center mt-0.5">
                          <GeminiIcon size={12} />
                        </div>
                        <div className="bg-slate-100 dark:bg-slate-800 px-3 py-2.5 rounded-2xl rounded-tl-sm flex items-center gap-1">
                          {[0, 1, 2].map(i => (
                            <motion.span
                              key={i}
                              className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-500"
                              animate={{ y: [0, -4, 0] }}
                              transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                            />
                          ))}
                        </div>
                      </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Pre-prompt chips */}
                  <AnimatePresence>
                    {showPrePrompts && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="px-3 pb-2 overflow-hidden"
                      >
                        <div className="flex items-center gap-1.5 mb-2">
                          <Sparkles size={11} className="text-primary-400" />
                          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Quick questions</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {PRE_PROMPTS.map((p) => (
                            <button
                              key={p.text}
                              onClick={() => handlePrePrompt(p.text)}
                              disabled={isLoading}
                              className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-primary-50 dark:hover:bg-primary-900/30 hover:text-primary-700 dark:hover:text-primary-300 border border-slate-200 dark:border-slate-700 hover:border-primary-200 dark:hover:border-primary-700 transition-all duration-150 disabled:opacity-50"
                            >
                              {p.label}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Input */}
                  <form
                    onSubmit={handleSubmit}
                    className="flex items-center gap-2 px-3 py-3 border-t border-slate-100 dark:border-slate-800"
                  >
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={e => setInput(e.target.value)}
                      placeholder="Ask about mental health..."
                      className="flex-1 text-sm px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:ring-2 focus:ring-primary-400 dark:focus:ring-primary-600 transition-all"
                    />
                    <button
                      type="submit"
                      disabled={!input.trim() || isLoading}
                      className="w-9 h-9 shrink-0 flex items-center justify-center rounded-xl bg-primary-600 text-white hover:bg-primary-700 disabled:opacity-40 disabled:bg-slate-300 dark:disabled:bg-slate-700 transition-all shadow-sm"
                    >
                      <Send size={15} />
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Bubble Button */}
      <motion.button
        onClick={isOpen ? (isMinimized ? handleOpen : handleClose) : handleOpen}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.93 }}
        className="fixed bottom-6 right-4 sm:right-6 z-50 w-14 h-14 rounded-2xl bg-linear-to-br from-primary-500 to-primary-700 text-white shadow-lg shadow-primary-500/40 flex items-center justify-center transition-all"
        title="Ask Serene"
      >
        <AnimatePresence mode="wait">
          {isOpen && !isMinimized ? (
            <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X size={22} />
            </motion.span>
          ) : (
            <motion.span key="orb" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <GeminiIcon size={26} />
            </motion.span>
          )}
        </AnimatePresence>

        {/* Unread badge */}
        <AnimatePresence>
          {unreadCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center shadow-sm"
            >
              {unreadCount}
            </motion.span>
          )}
        </AnimatePresence>

        {/* Pulse ring when closed */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-2xl ring-2 ring-primary-400/50 animate-ping pointer-events-none" />
        )}
      </motion.button>

      {/* Crisis Modal */}
      <AnimatePresence>
        {showCrisisModal && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCrisisModal(false)}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-sm bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-2xl border border-red-100 dark:border-red-900/30"
            >
              <div className="w-14 h-14 bg-red-100 dark:bg-red-900/30 text-red-500 rounded-full flex items-center justify-center mx-auto mb-5">
                <ShieldAlert size={28} />
              </div>
              <h3 className="text-xl font-bold text-center text-slate-900 dark:text-white mb-2">We're here for you</h3>
              <p className="text-slate-500 dark:text-slate-400 text-center text-sm mb-6">
                You're not alone. Reach out to someone who can help right now.
              </p>
              <a
                href="tel:988"
                className="flex items-center justify-between w-full p-4 bg-red-600 text-white rounded-2xl hover:bg-red-700 transition-all mb-3"
              >
                <div className="flex items-center gap-3">
                  <Phone size={18} />
                  <span className="font-bold text-sm">National Crisis Line</span>
                </div>
                <span className="font-mono font-bold">988</span>
              </a>
              <button
                onClick={() => setShowCrisisModal(false)}
                className="w-full p-3 text-sm text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-medium transition-all"
              >
                I understand, thank you
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AiChatBubble;
