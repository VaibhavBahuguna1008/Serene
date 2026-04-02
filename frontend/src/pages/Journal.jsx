import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Book,
  Search,
  Calendar,
  Tag,
  Loader2,
  Sparkles,
  X,
  Clock,
  Trash2,
  AlertTriangle,
  PenLine
} from 'lucide-react';

const Journal = () => {
  const [entries, setEntries] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const { data } = await axios.get('/api/journal');
      setEntries(data);
    } catch (error) {
      console.error('Error fetching journal entries:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.post('/api/journal', { title, content });
      setTitle('');
      setContent('');
      setIsAdding(false);
      fetchEntries();
    } catch (error) {
      console.error('Error saving journal:', error);
    }
    setIsSubmitting(false);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await axios.delete(`/api/journal/${selectedEntry._id}`);
      setEntries(prev => prev.filter(e => e._id !== selectedEntry._id));
      setSelectedEntry(null);
      setConfirmDelete(false);
    } catch (error) {
      console.error('Error deleting journal entry:', error);
    }
    setIsDeleting(false);
  };

  const filteredEntries = entries.filter(entry =>
    entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    entry.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold bg-linear-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">Mental Journal</h2>
          <p className="text-slate-500 dark:text-slate-400">Capture your thoughts, track your growth.</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-linear-to-r from-primary-500 to-accent-500 text-white font-semibold shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 transition-shadow"
        >
          <Plus size={18} strokeWidth={2.5} />
          <span>New Entry</span>
        </motion.button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar: Entry List */}
        <div className="lg:col-span-1 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search entries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-primary-500 outline-none transition-all"
            />
          </div>

          <div className="space-y-3 overflow-y-auto max-h-[60vh] pr-2 scrollbar-thin">
            {filteredEntries.map((entry) => (
              <motion.button
                key={entry._id}
                whileHover={{ x: 4 }}
                onClick={() => { setSelectedEntry(entry); setConfirmDelete(false); }}
                className={`w-full text-left p-4 rounded-2xl border transition-all ${
                  selectedEntry?._id === entry._id
                    ? 'bg-primary-50 border-primary-200 dark:bg-primary-900/20 dark:border-primary-800'
                    : 'bg-white border-slate-100 dark:bg-slate-900 dark:border-slate-800 hover:border-primary-200 dark:hover:border-primary-800'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                    <Calendar size={10} />
                    {new Date(entry.timestamp).toLocaleDateString()}
                  </span>
                  {entry.aiEmotion && (
                    <span className="px-2 py-0.5 rounded-full bg-accent-50 text-accent-600 dark:bg-accent-900/20 dark:text-accent-400 text-[10px] font-bold">
                      {entry.aiEmotion}
                    </span>
                  )}
                </div>
                <h4 className="font-bold text-slate-800 dark:text-white truncate">{entry.title}</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-1">{entry.content}</p>
              </motion.button>
            ))}
            {filteredEntries.length === 0 && (
              <div className="text-center py-12 text-slate-400">
                <p>No entries found.</p>
              </div>
            )}
          </div>
        </div>

        {/* Main Content: Entry View/Add */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {isAdding ? (
              <motion.div
                key="add"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="card glass space-y-6"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200">
                    <PenLine size={18} className="text-primary-500" />
                    <h3 className="text-xl font-bold">New Reflection</h3>
                  </div>
                  <button
                    onClick={() => setIsAdding(false)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                  >
                    <X size={18} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Entry Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-4 text-xl font-bold bg-transparent border-b border-slate-200 dark:border-slate-800 focus:border-primary-500 outline-none transition-all dark:text-white"
                    required
                  />
                  <textarea
                    placeholder="Write your heart out..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full p-4 min-h-[300px] bg-transparent outline-none resize-none dark:text-slate-300"
                    required
                  />

                  <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <button
                      type="button"
                      onClick={() => setIsAdding(false)}
                      className="px-4 py-2 rounded-xl text-sm font-medium text-slate-500 hover:text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-300 transition-all"
                    >
                      Cancel
                    </button>
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: isSubmitting ? 1 : 1.03 }}
                      whileTap={{ scale: isSubmitting ? 1 : 0.97 }}
                      className="flex items-center gap-2 px-6 py-2 rounded-xl bg-linear-to-r from-primary-500 to-accent-500 text-white text-sm font-semibold shadow-md shadow-primary-500/20 hover:shadow-primary-500/35 disabled:opacity-70 transition-shadow"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          <span>Analyzing...</span>
                        </>
                      ) : (
                        <>
                          <Book size={16} />
                          <span>Save Entry</span>
                        </>
                      )}
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            ) : selectedEntry ? (
              <motion.div
                key={selectedEntry._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="card glass space-y-6 min-h-[500px]"
              >
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-sm text-slate-500">
                      <Clock size={16} />
                      {new Date(selectedEntry.timestamp).toLocaleString()}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300 text-xs font-bold flex items-center gap-1">
                        <Tag size={12} />
                        {selectedEntry.aiEmotion}
                      </span>
                      <button
                        onClick={() => setConfirmDelete(true)}
                        className="p-2 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
                        title="Delete entry"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  <h3 className="text-3xl font-bold text-slate-800 dark:text-white">{selectedEntry.title}</h3>
                </div>

                {/* Inline delete confirmation */}
                <AnimatePresence>
                  {confirmDelete && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="flex items-center justify-between gap-4 px-4 py-3 rounded-2xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
                    >
                      <div className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400">
                        <AlertTriangle size={15} />
                        <span>Delete this entry? This cannot be undone.</span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => setConfirmDelete(false)}
                          className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleDelete}
                          disabled={isDeleting}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500 hover:bg-red-600 text-white text-xs font-semibold transition-all disabled:opacity-70"
                        >
                          {isDeleting ? <Loader2 size={13} className="animate-spin" /> : <Trash2 size={13} />}
                          <span>Delete</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="p-6 bg-slate-50 dark:bg-slate-950/50 rounded-2xl border border-slate-100 dark:border-slate-800 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-2">
                    <Sparkles size={20} className="text-primary-400 opacity-20 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-primary-600 mb-2 flex items-center gap-1">
                    AI Insight
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 italic">
                    "{selectedEntry.aiSummary}"
                  </p>
                </div>

                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">
                    {selectedEntry.content}
                  </p>
                </div>
              </motion.div>
            ) : (
              <div className="card glass flex flex-col items-center justify-center min-h-[500px] text-center p-12 space-y-4">
                <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-300">
                  <Book size={40} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white">Select a reflection</h3>
                  <p className="text-slate-500">Or start a new one to capture your journey.</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setIsAdding(true)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-linear-to-r from-primary-500 to-accent-500 text-white font-semibold shadow-md shadow-primary-500/20 hover:shadow-primary-500/35 transition-shadow"
                >
                  <PenLine size={16} />
                  <span>Write something new</span>
                </motion.button>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Journal;
