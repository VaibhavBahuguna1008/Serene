import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Zap,
  Sparkles,
  MessageSquare,
  RefreshCcw,
  AlertCircle,
  ChevronDown
} from 'lucide-react';

const cleanMarkdown = (text) =>
  text
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/#{1,6}\s?/g, '')
    .replace(/`(.*?)`/g, '$1')
    .trim();

const ThoughtReframing = () => {
  const [thought, setThought] = useState('');
  const [reframe, setReframe] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleReframe = async (e) => {
    e.preventDefault();
    if (!thought.trim() || isLoading) return;

    setIsLoading(true);
    setError('');
    try {
      const { data } = await axios.post('/api/ai/reframe', { thought });
      setReframe(data.reframe);
    } catch (err) {
      console.error('Reframe error:', err);
      setError(err.response?.data?.message || 'Failed to reframe thought. Please try again.');
    }
    setIsLoading(false);
  };

  const handleReset = () => {
    setThought('');
    setReframe('');
    setError('');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-700">

      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold font-display text-slate-900 dark:text-white">Thought Reframing</h2>
        <p className="text-slate-500 dark:text-slate-400">Change your perspective, change your mood.</p>
      </div>

      {/* Input card */}
      <div className="card glass space-y-5">
        <div className="flex items-center gap-3 text-primary-600">
          <MessageSquare size={22} />
          <h3 className="text-lg font-bold">Your Negative Thought</h3>
        </div>

        <form onSubmit={handleReframe} className="space-y-4">
          <textarea
            value={thought}
            onChange={(e) => setThought(e.target.value)}
            placeholder="E.g., 'I'm not good enough for this job...'"
            className="w-full p-4 min-h-32.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 focus:ring-2 focus:ring-primary-500 outline-none transition-all resize-none text-slate-700 dark:text-slate-300 text-sm leading-relaxed"
            required
          />

          <button
            type="submit"
            disabled={!thought.trim() || isLoading}
            className="btn btn-primary w-full py-3 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <RefreshCcw size={18} className="animate-spin" />
                <span>Reframing…</span>
              </>
            ) : (
              <>
                <Zap size={18} />
                <span>Reframe Thought</span>
              </>
            )}
          </button>
        </form>

        {error && (
          <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl flex items-center gap-2 text-sm">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}
      </div>

      {/* Animated connector arrow — only shown when a result exists */}
      <AnimatePresence>
        {reframe && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
              className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-500"
            >
              <ChevronDown size={18} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Output card */}
      <AnimatePresence mode="wait">
        {reframe ? (
          <motion.div
            key="reframe"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.3 }}
            className="card border-primary-100 dark:border-primary-900/40 bg-primary-50/40 dark:bg-primary-900/10 space-y-5"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-emerald-600">
                <Sparkles size={22} />
                <h3 className="text-lg font-bold">New Perspective</h3>
              </div>
              <button
                onClick={handleReset}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                title="Start over"
              >
                <RefreshCcw size={16} />
              </button>
            </div>

            <div className="space-y-3">
              {cleanMarkdown(reframe)
                .split('\n')
                .filter(line => line.trim())
                .map((line, i) => (
                  <p key={i} className="text-slate-700 dark:text-slate-200 leading-relaxed text-sm">
                    {line}
                  </p>
                ))}
            </div>

            <div className="pt-4 border-t border-primary-100 dark:border-primary-900/30 flex items-center gap-2">
              <Sparkles size={12} className="text-primary-400" />
              <p className="text-xs text-primary-600 dark:text-primary-400 font-medium">
                AI-powered Reframing · CBT Technique
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="placeholder"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="card border-dashed border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center min-h-40 text-center p-8 space-y-3"
          >
            <div className="w-14 h-14 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-slate-300 dark:text-slate-600">
              <Sparkles size={28} />
            </div>
            <div>
              <h4 className="font-semibold text-slate-400 dark:text-slate-500">Waiting for input</h4>
              <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">
                Enter a negative thought above to see it from a new angle.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Educational section */}
      <div className="card bg-slate-50 dark:bg-slate-900/60 border-slate-100 dark:border-slate-800 p-6 space-y-2">
        <h3 className="text-base font-bold text-slate-800 dark:text-white">What is Thought Reframing?</h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          Thought reframing is a core technique in Cognitive Behavioral Therapy (CBT). It involves identifying irrational or negative thought patterns — known as cognitive distortions — and consciously challenging them to view situations in a more balanced, realistic way.
        </p>
      </div>
    </div>
  );
};

export default ThoughtReframing;
