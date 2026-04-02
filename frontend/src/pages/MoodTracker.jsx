import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Smile,
  Frown,
  Meh,
  CloudRain,
  Sun,
  Zap,
  Coffee,
  CheckCircle2,
  Calendar,
  StickyNote,
  TrendingUp,
  Clock,
  Trash2
} from 'lucide-react';

const moods = [
  { name: 'Happy',    icon: Sun,        color: 'text-amber-500',  bg: 'bg-amber-50   dark:bg-amber-900/20',  border: 'border-amber-200   dark:border-amber-800',  ring: 'ring-amber-400/30'  },
  { name: 'Calm',     icon: Smile,      color: 'text-emerald-500',bg: 'bg-emerald-50 dark:bg-emerald-900/20',border: 'border-emerald-200 dark:border-emerald-800',ring: 'ring-emerald-400/30'},
  { name: 'Tired',    icon: Coffee,     color: 'text-slate-500',  bg: 'bg-slate-50   dark:bg-slate-800/40',  border: 'border-slate-200   dark:border-slate-700',  ring: 'ring-slate-400/30'  },
  { name: 'Stressed', icon: Zap,        color: 'text-orange-500', bg: 'bg-orange-50  dark:bg-orange-900/20', border: 'border-orange-200  dark:border-orange-800', ring: 'ring-orange-400/30' },
  { name: 'Anxious',  icon: Meh,        color: 'text-indigo-500', bg: 'bg-indigo-50  dark:bg-indigo-900/20', border: 'border-indigo-200  dark:border-indigo-800', ring: 'ring-indigo-400/30' },
  { name: 'Sad',      icon: CloudRain,  color: 'text-blue-500',   bg: 'bg-blue-50    dark:bg-blue-900/20',   border: 'border-blue-200    dark:border-blue-800',   ring: 'ring-blue-400/30'   },
  { name: 'Angry',    icon: Frown,      color: 'text-red-500',    bg: 'bg-red-50     dark:bg-red-900/20',    border: 'border-red-200     dark:border-red-800',    ring: 'ring-red-400/30'    },
];

const getIntensityLabel = (val) => {
  if (val <= 2) return { label: 'Very Low',  color: 'text-emerald-500', badge: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400' };
  if (val <= 4) return { label: 'Low',       color: 'text-sky-500',     badge: 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-400' };
  if (val <= 6) return { label: 'Moderate',  color: 'text-amber-500',   badge: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400' };
  if (val <= 8) return { label: 'High',      color: 'text-orange-500',  badge: 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400' };
  return        { label: 'Very High', color: 'text-red-500',    badge: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400' };
};

const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState('Calm');
  const [intensity, setIntensity]       = useState(5);
  const [note, setNote]                 = useState('');
  const [history, setHistory]           = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess]   = useState(false);
  const [deletingId, setDeletingId]     = useState(null);
  const [deleteError, setDeleteError]   = useState(false);

  useEffect(() => { fetchHistory(); }, []);

  const fetchHistory = async () => {
    try {
      const { data } = await axios.get('/api/mood');
      setHistory(data);
    } catch (err) {
      console.error('Error fetching mood history:', err);
    }
  };

  const handleDelete = async (id) => {
    setDeletingId(id);
    setDeleteError(false);
    try {
      await axios.delete(`/api/mood/${id}`);
      setHistory(prev => prev.filter(log => log._id !== id));
    } catch (err) {
      console.error('Error deleting mood entry:', err);
      setDeleteError(true);
      setTimeout(() => setDeleteError(false), 3000);
    }
    setDeletingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.post('/api/mood', { mood: selectedMood, intensity, note });
      setShowSuccess(true);
      setNote('');
      fetchHistory();
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      console.error('Error logging mood:', err);
    }
    setIsSubmitting(false);
  };

  const intensityInfo  = getIntensityLabel(intensity);
  const selectedMoodObj = moods.find(m => m.name === selectedMood);

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Mood Tracker</h1>
        <p className="text-sm text-slate-400 mt-1">Log how you feel and track your emotional patterns over time.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">

        {/* ── LEFT: Log Form (3 cols) ── */}
        <div className="lg:col-span-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">

          {/* Form Header */}
          <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800">
            <h2 className="font-bold text-base text-slate-800 dark:text-slate-100">How are you feeling right now?</h2>
            <p className="text-xs text-slate-400 mt-0.5">Select a mood, set the intensity, and add a note.</p>
          </div>

          <form onSubmit={handleSubmit} className="divide-y divide-slate-50 dark:divide-slate-800">

            {/* Section 1: Mood Selection */}
            <div className="px-6 py-5 space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Select Mood</label>
              <div className="flex flex-wrap gap-2.5">
                {moods.map((m) => {
                  const active = selectedMood === m.name;
                  const Icon = m.icon;
                  return (
                    <button
                      key={m.name}
                      type="button"
                      onClick={() => setSelectedMood(m.name)}
                      className={`flex flex-col items-center gap-1.5 px-3 py-3 rounded-xl border transition-all duration-150 w-[calc(25%-8px)] sm:w-auto sm:min-w-18 ${
                        active
                          ? `${m.bg} ${m.border} ring-2 ${m.ring} shadow-sm`
                          : 'border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                      }`}
                    >
                      <Icon size={26} className={active ? m.color : 'text-slate-300 dark:text-slate-600'} />
                      <span className={`text-[11px] font-semibold ${active ? 'text-slate-700 dark:text-slate-200' : 'text-slate-400'}`}>
                        {m.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Section 2: Intensity */}
            <div className="px-6 py-5 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Intensity Level</label>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${intensityInfo.badge}`}>
                    {intensityInfo.label}
                  </span>
                  <span className="text-sm font-bold text-slate-600 dark:text-slate-300 tabular-nums">
                    {intensity}<span className="text-slate-400 font-normal">/10</span>
                  </span>
                </div>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={intensity}
                onChange={(e) => setIntensity(parseInt(e.target.value))}
                className="range range-primary range-sm w-full"
              />
              <div className="flex justify-between text-[10px] text-slate-300 dark:text-slate-600 font-medium px-0.5">
                <span>Mild</span>
                <span>Moderate</span>
                <span>Intense</span>
              </div>
            </div>

            {/* Section 3: Notes */}
            <div className="px-6 py-5 space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                <StickyNote size={11} />
                Notes
                <span className="font-normal normal-case tracking-normal text-slate-300">— optional</span>
              </label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={4}
                className="textarea textarea-bordered w-full bg-slate-50 dark:bg-slate-950/50 focus:textarea-primary transition-all text-sm leading-relaxed resize-none placeholder:text-slate-300 dark:placeholder:text-slate-600 px-4 py-3"
                placeholder="What's on your mind today?..."
              />
            </div>

            {/* Submit */}
            <div className="px-6 py-5 space-y-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary w-full font-bold shadow-md shadow-primary/10 rounded-xl h-11 flex items-center justify-center gap-2"
              >
                {isSubmitting
                  ? <span className="loading loading-spinner loading-sm"></span>
                  : <><CheckCircle2 size={17} /><span>Log My Mood</span></>
                }
              </button>

              <AnimatePresence>
                {showSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.97 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center justify-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/50 rounded-xl px-4 py-3 w-full"
                  >
                    <CheckCircle2 size={15} />
                    Mood logged successfully! Keep it up.
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </form>
        </div>

        {/* ── RIGHT: Recent Activity (2 cols) ── */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">

          {/* Panel Header */}
          <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp size={15} className="text-primary-500" />
              <h2 className="font-bold text-sm text-slate-800 dark:text-slate-100">Recent Activity</h2>
            </div>
            <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400">
              <Calendar size={12} />
              <span>{history.slice(0, 7).length} entries</span>
            </div>
          </div>

          {/* Delete error */}
          <AnimatePresence>
            {deleteError && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="px-5 py-2.5 text-xs font-semibold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border-b border-red-100 dark:border-red-800/40 flex items-center gap-2"
              >
                <Trash2 size={12} /> Failed to delete. Please try again.
              </motion.div>
            )}
          </AnimatePresence>

          {/* History List */}
          <div className="divide-y divide-slate-50 dark:divide-slate-800">
            <AnimatePresence initial={false}>
            {history.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 px-5 text-center">
                <div className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center mb-3">
                  <Smile size={24} className="text-slate-300" />
                </div>
                <p className="text-sm font-semibold text-slate-500">No entries yet</p>
                <p className="text-xs text-slate-400 mt-1">Log your first mood using the form.</p>
              </div>
            ) : (
              history.slice(0, 7).map((log, idx) => {
                const moodObj   = moods.find(m => m.name === log.mood);
                const Icon      = moodObj?.icon ?? Smile;
                const bar       = getIntensityLabel(log.intensity);
                const isDeleting = deletingId === log._id;
                return (
                  <motion.div
                    key={log._id}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ delay: idx * 0.06 }}
                    className="flex items-center gap-3 px-5 py-4"
                  >
                    {/* Mood Icon */}
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${moodObj?.bg ?? 'bg-slate-50 dark:bg-slate-800'}`}>
                      <Icon size={20} className={moodObj?.color ?? 'text-slate-400'} />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 truncate">{log.mood}</span>
                        <div className="flex items-center gap-1 text-[10px] text-slate-400 shrink-0 ml-2">
                          <Clock size={10} />
                          {new Date(log.timestamp).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-primary-500 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${log.intensity * 10}%` }}
                            transition={{ delay: idx * 0.06 + 0.2, duration: 0.4 }}
                          />
                        </div>
                        <span className={`text-[10px] font-bold shrink-0 ${bar.color}`}>{log.intensity}/10</span>
                      </div>
                      {log.note && (
                        <p className="text-[11px] text-slate-400 truncate">{log.note}</p>
                      )}
                    </div>

                    {/* Delete button */}
                    <button
                      onClick={() => handleDelete(log._id)}
                      disabled={!!deletingId}
                      className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-slate-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 disabled:opacity-40 transition-all duration-150"
                      title="Delete entry"
                    >
                      {isDeleting
                        ? <span className="loading loading-spinner loading-xs text-red-400" />
                        : <Trash2 size={14} />
                      }
                    </button>
                  </motion.div>
                );
              })
            )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MoodTracker;
