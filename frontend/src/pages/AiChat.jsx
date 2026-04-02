import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, User, Bot, ShieldAlert, Phone, Trash2, Sparkles } from 'lucide-react';

// Strip markdown symbols for clean display
const cleanMarkdown = (text) =>
  text
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/#{1,6}\s?/g, '')
    .replace(/`(.*?)`/g, '$1')
    .trim();

const MessageBubble = ({ msg, index }) => {
  const isUser = msg.role === 'user';
  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 12, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.22 }}
      className={`flex items-end gap-2.5 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
    >
      {/* Avatar */}
      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm ${
        isUser
          ? 'bg-primary-600 text-white'
          : 'bg-linear-to-br from-emerald-400 to-teal-500 text-white'
      }`}>
        {isUser ? <User size={15} /> : <Bot size={15} />}
      </div>

      {/* Bubble */}
      <div className={`group max-w-[72%] flex flex-col gap-1 ${isUser ? 'items-end' : 'items-start'}`}>
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-1">
          {isUser ? 'You' : 'Serene'}
        </span>
        <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
          isUser
            ? 'bg-primary-600 text-white rounded-br-sm'
            : 'bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-800 dark:text-slate-200 rounded-bl-sm'
        }`}>
          {msg.content.split('\n').map((line, i) => (
            <React.Fragment key={i}>
              {i > 0 && <br />}
              {cleanMarkdown(line)}
            </React.Fragment>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const TypingIndicator = () => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 8 }}
    className="flex items-end gap-2.5"
  >
    <div className="w-8 h-8 rounded-full bg-linear-to-br from-emerald-400 to-teal-500 text-white flex items-center justify-center shrink-0 shadow-sm">
      <Bot size={15} />
    </div>
    <div className="flex flex-col gap-1 items-start">
      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-1">Serene</span>
      <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-1.5">
        {[0, 1, 2].map(i => (
          <motion.span
            key={i}
            animate={{ y: [0, -4, 0] }}
            transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.15 }}
            className="w-1.5 h-1.5 rounded-full bg-emerald-400 block"
          />
        ))}
      </div>
    </div>
  </motion.div>
);

const AiChat = () => {
  const INITIAL_MESSAGE = { role: 'assistant', content: 'Hello! I\'m Serene, your AI companion. How are you feeling today?' };
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showCrisisModal, setShowCrisisModal] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => { scrollToBottom(); }, [messages, isLoading]);

  const handleClearChat = () => {
    setMessages([INITIAL_MESSAGE]);
    setShowClearConfirm(false);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    inputRef.current?.focus();

    try {
      const { data } = await axios.post('/api/ai/chat', {
        message: userMessage.content,
        history: messages
      });

      setMessages(prev => [...prev, data]);
      if (data.isCrisis) setShowCrisisModal(true);
    } catch (err) {
      const msg = err.response?.data?.message || 'I\'m sorry, I\'m having trouble connecting right now. Please try again in a moment.';
      setMessages(prev => [...prev, { role: 'assistant', content: msg }]);
    }
    setIsLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend(e);
    }
  };

  return (
    <div className="max-w-3xl mx-auto h-[calc(100vh-10rem)] flex flex-col animate-in fade-in duration-500">

      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm mb-3">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-md shadow-emerald-200/60 dark:shadow-emerald-900/40">
              <Bot size={20} className="text-white" />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white dark:border-slate-900" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
              Serene <Sparkles size={12} className="text-emerald-500" />
            </p>
            <p className="text-[11px] text-emerald-500 font-medium">AI Companion · Online</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <AnimatePresence>
            {showClearConfirm && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, x: 10 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95, x: 10 }}
                className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-red-200 dark:border-red-800/50 rounded-xl px-3 py-1.5 shadow-sm"
              >
                <span className="text-xs text-slate-500 dark:text-slate-400">Clear all?</span>
                <button onClick={handleClearChat} className="text-xs font-bold text-red-500 hover:text-red-600 transition-colors">Yes</button>
                <span className="text-slate-300 dark:text-slate-600">|</span>
                <button onClick={() => setShowClearConfirm(false)} className="text-xs font-medium text-slate-400 hover:text-slate-600 transition-colors">No</button>
              </motion.div>
            )}
          </AnimatePresence>
          <button
            onClick={() => setShowClearConfirm(v => !v)}
            disabled={messages.length <= 1}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 disabled:opacity-30 disabled:cursor-not-allowed px-3 py-1.5 rounded-xl transition-all"
          >
            <Trash2 size={13} /> Clear
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-2 py-4 space-y-4 scrollbar-hide">
        {messages.map((msg, i) => (
          <MessageBubble key={i} msg={msg} index={i} />
        ))}
        <AnimatePresence>
          {isLoading && <TypingIndicator />}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested prompts (only shown when just the initial message exists) */}
      {messages.length === 1 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap gap-2 px-1 mb-3"
        >
          {[
            "I'm feeling anxious today",
            "Help me with a breathing exercise",
            "I'm having trouble sleeping",
            "I need some motivation"
          ].map((prompt) => (
            <button
              key={prompt}
              onClick={() => setInput(prompt)}
              className="text-xs px-3 py-1.5 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-primary-400 hover:text-primary-600 dark:hover:text-primary-400 transition-all"
            >
              {prompt}
            </button>
          ))}
        </motion.div>
      )}

      {/* Input */}
      <form onSubmit={handleSend} className="flex items-end gap-2">
        <div className="flex-1 relative">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Message Serene…"
            rows={1}
            className="w-full px-5 py-3.5 pr-14 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm focus:ring-2 focus:ring-primary-400 dark:focus:ring-primary-600 outline-none transition-all dark:text-white resize-none leading-relaxed text-sm scrollbar-hide"
            style={{ minHeight: '52px', maxHeight: '120px', overflowY: 'auto' }}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-2 bottom-2 w-9 h-9 rounded-xl bg-primary-600 hover:bg-primary-700 disabled:opacity-40 disabled:bg-slate-300 dark:disabled:bg-slate-700 text-white flex items-center justify-center transition-all shadow-md shadow-primary-200/50 dark:shadow-primary-900/40 active:scale-95"
          >
            <Send size={16} />
          </button>
        </div>
      </form>
      <p className="text-center text-[10px] text-slate-400 mt-2">Press Enter to send · Shift+Enter for new line</p>

      {/* Crisis Modal */}
      <AnimatePresence>
        {showCrisisModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCrisisModal(false)}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-2xl border border-red-100 dark:border-red-900/30"
            >
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <ShieldAlert size={32} />
              </div>
              <h3 className="text-2xl font-bold text-center mb-2 text-slate-900 dark:text-white">We're here for you</h3>
              <p className="text-slate-500 dark:text-slate-400 text-center mb-8 text-sm leading-relaxed">
                It sounds like you're going through a very difficult time. Please reach out to someone who can help right now.
              </p>
              <div className="space-y-3">
                <a
                  href="tel:988"
                  className="flex items-center justify-between p-4 bg-red-600 text-white rounded-2xl hover:bg-red-700 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <Phone size={20} />
                    <span className="font-bold">National Crisis Line</span>
                  </div>
                  <span className="font-mono text-xl font-bold">988</span>
                </a>
                <button
                  onClick={() => setShowCrisisModal(false)}
                  className="w-full p-4 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 font-medium transition-all text-sm"
                >
                  I understand, thank you
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AiChat;
