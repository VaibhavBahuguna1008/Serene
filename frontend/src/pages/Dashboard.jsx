import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  Smile,
  Book,
  Zap,
  Wind,
  Activity,
  Calendar,
  TrendingUp,
  ArrowRight,
  Heart,
  Sparkles,
  ClipboardList,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const [moodData, setMoodData] = useState([]);
  const [stats, setStats] = useState({
    moodCount: 0,
    journalCount: 0,
    averageIntensity: 0,
  });
  const [assessmentResults, setAssessmentResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [moodRes, journalRes] = await Promise.all([
          axios.get('/api/mood'),
          axios.get('/api/journal')
        ]);

        const allMoods = moodRes.data;

        // Filter last 30 days for the trend chart
        const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
        const recentMoods = allMoods
          .filter(log => new Date(log.timestamp).getTime() >= thirtyDaysAgo)
          .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

        const chartData = recentMoods.map(log => ({
          date: new Date(log.timestamp).toLocaleDateString([], { month: 'short', day: 'numeric' }),
          intensity: log.intensity,
          mood: log.mood,
        }));

        setMoodData(chartData);
        setStats({
          moodCount: allMoods.length,
          journalCount: journalRes.data.length,
          averageIntensity: allMoods.length > 0
            ? (allMoods.reduce((acc, curr) => acc + curr.intensity, 0) / allMoods.length).toFixed(1)
            : 0,
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    const storageKey = `serene_assessment_results_${user?._id}`;
    const stored = JSON.parse(localStorage.getItem(storageKey) || '[]');
    setAssessmentResults(stored);
  }, []);

  const quickActions = [
    {
      title: 'Log Mood', icon: <Smile />, path: '/mood',
      bg: 'bg-sky-50 dark:bg-sky-900/20',
      text: 'text-sky-600 dark:text-sky-400',
      border: 'border border-sky-100 dark:border-sky-800/50'
    },
    {
      title: 'New Journal', icon: <Book />, path: '/journal',
      bg: 'bg-emerald-50 dark:bg-emerald-900/20',
      text: 'text-emerald-600 dark:text-emerald-400',
      border: 'border border-emerald-100 dark:border-emerald-800/50'
    },
    {
      title: 'Therapy Toolkit', icon: <Wind />, path: '/toolkit',
      bg: 'bg-violet-50 dark:bg-violet-900/20',
      text: 'text-violet-600 dark:text-violet-400',
      border: 'border border-violet-100 dark:border-violet-800/50'
    },
    {
      title: 'CBT Reframe', icon: <Zap />, path: '/reframe',
      bg: 'bg-amber-50 dark:bg-amber-900/20',
      text: 'text-amber-600 dark:text-amber-400',
      border: 'border border-amber-100 dark:border-amber-800/50'
    },
  ];

  const statCards = [
    {
      label: 'Mood Logs',
      value: stats.moodCount,
      desc: 'Total logged',
      icon: <Activity size={20} />,
      iconBg: 'bg-sky-100 dark:bg-sky-900/40',
      iconColor: 'text-sky-600 dark:text-sky-400',
      accentColor: 'border-l-sky-500',
    },
    {
      label: 'Journal Entries',
      value: stats.journalCount,
      desc: 'Total written',
      icon: <Book size={20} />,
      iconBg: 'bg-emerald-100 dark:bg-emerald-900/40',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
      accentColor: 'border-l-emerald-500',
    },
    {
      label: 'Avg Intensity',
      value: `${stats.averageIntensity}/10`,
      desc: 'All-time average',
      icon: <TrendingUp size={20} />,
      iconBg: 'bg-violet-100 dark:bg-violet-900/40',
      iconColor: 'text-violet-600 dark:text-violet-400',
      accentColor: 'border-l-violet-500',
    },
  ];

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
          <p className="text-sm text-slate-400 animate-pulse">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Greeting Banner */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-3xl bg-linear-to-br from-primary-600 via-primary-500 to-violet-600 p-8 text-white shadow-2xl shadow-primary-500/25"
      >
        <div className="relative z-10">
          <p className="text-primary-200 text-sm font-medium mb-1">
            {new Date().toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}
          </p>
          <h2 className="text-3xl font-bold mb-2">{getGreeting()}</h2>
          <p className="text-primary-100 text-sm max-w-md leading-relaxed">
            How are you doing today? Track your mood, journal your thoughts, or try a calming exercise.
          </p>
        </div>
        <div className="absolute -top-10 -right-10 w-56 h-56 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-14 right-20 w-40 h-40 bg-violet-400/20 rounded-full blur-2xl pointer-events-none" />
        <Heart className="absolute bottom-4 right-6 text-white/10 pointer-events-none" size={96} />
      </motion.div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {statCards.map((card, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08, duration: 0.4 }}
            className={`bg-white dark:bg-slate-900 rounded-2xl border-l-4 ${card.accentColor} border border-slate-100 dark:border-slate-800 p-5 shadow-sm flex items-center gap-4`}
          >
            <div className={`w-12 h-12 rounded-xl ${card.iconBg} ${card.iconColor} flex items-center justify-center shrink-0`}>
              {card.icon}
            </div>
            <div className="min-w-0">
              <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400">{card.label}</p>
              <p className="text-2xl font-bold text-slate-800 dark:text-slate-100 leading-tight">{card.value}</p>
              <p className="text-xs text-slate-400">{card.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

        {/* Mood Trend Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28, duration: 0.4 }}
          className="lg:col-span-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 shadow-sm"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold flex items-center gap-2 text-slate-800 dark:text-slate-100">
                <Calendar size={17} className="text-primary-500" />
                Mood Trends
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Emotional intensity — last 30 days</p>
            </div>
            <span className="text-[10px] font-bold text-slate-300 dark:text-slate-600 uppercase tracking-widest">Analytics</span>
          </div>

          <div className="h-65 w-full">
            {moodData.length > 1 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={moodData} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
                  <defs>
                    <linearGradient id="colorIntensity" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.18} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: '#94a3b8' }}
                  />
                  <YAxis
                    domain={[0, 10]}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: '#94a3b8' }}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: '12px',
                      border: 'none',
                      boxShadow: '0 10px 25px -5px rgba(0,0,0,0.12)',
                      fontSize: '12px'
                    }}
                    labelStyle={{ fontWeight: 'bold', color: '#334155' }}
                    formatter={(value) => [value, 'Intensity']}
                  />
                  <Area
                    type="monotone"
                    dataKey="intensity"
                    stroke="#6366f1"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#colorIntensity)"
                    dot={{ fill: '#6366f1', r: 3, strokeWidth: 0 }}
                    activeDot={{ r: 5, fill: '#6366f1' }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-400 gap-3 border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-2xl">
                <Smile size={40} className="opacity-20" />
                <div className="text-center">
                  <p className="font-semibold text-sm">No trend data yet</p>
                  <p className="text-xs mt-1">Log a few moods to see your trends appear here</p>
                </div>
                <Link to="/mood" className="text-primary-600 text-xs font-bold hover:underline flex items-center gap-1 mt-1">
                  Log your mood now <ArrowRight size={12} />
                </Link>
              </div>
            )}
          </div>
        </motion.div>

        {/* Sidebar: Quick Actions + Daily Tip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.36, duration: 0.4 }}
          className="space-y-5"
        >
          <div>
            <h3 className="text-base font-bold mb-3 text-slate-800 dark:text-slate-100">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              {quickActions.map((action, idx) => (
                <Link
                  key={idx}
                  to={action.path}
                  className={`flex flex-col items-center justify-center p-4 rounded-2xl ${action.bg} ${action.text} ${action.border} transition-all duration-200 hover:scale-105 active:scale-95 text-center shadow-sm`}
                >
                  <div className="mb-1.5">{React.cloneElement(action.icon, { size: 22 })}</div>
                  <span className="text-xs font-bold leading-tight">{action.title}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Daily Tip Card */}
          <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-slate-900 to-slate-800 p-5 text-white shadow-lg">
            <div className="relative z-10 space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-primary-500/20 flex items-center justify-center shrink-0">
                  <Wind size={15} className="text-primary-400" />
                </div>
                <h4 className="font-bold text-sm">Daily Tip</h4>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed italic">
                "Just 5 minutes of deep breathing can significantly lower cortisol and calm your nervous system."
              </p>
              <Link
                to="/toolkit"
                className="text-xs text-primary-400 font-bold flex items-center gap-1 hover:gap-2 transition-all duration-200"
              >
                Try it now <ArrowRight size={12} />
              </Link>
            </div>
            <Sparkles className="absolute -bottom-3 -right-3 text-white/5 pointer-events-none" size={72} />
          </div>
        </motion.div>

      </div>

      {/* Assessment Results */}
      {assessmentResults.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.44, duration: 0.4 }}
          className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 shadow-sm"
        >
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-base font-bold flex items-center gap-2 text-slate-800 dark:text-slate-100">
                <ClipboardList size={17} className="text-primary-500" />
                Assessment Results
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Latest score per screening tool</p>
            </div>
            <Link to="/assessments" className="text-xs text-primary-600 font-bold flex items-center gap-1 hover:underline">
              Take a test <ArrowRight size={12} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {assessmentResults.map((r) => (
              <div
                key={r.id}
                className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex flex-col gap-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{r.name}</span>
                  <span className="text-[10px] text-slate-300 dark:text-slate-600">
                    {new Date(r.date).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                  </span>
                </div>
                <div className="text-3xl font-bold text-slate-800 dark:text-slate-100 leading-none">{r.score}</div>
                <div className={`text-xs font-semibold leading-snug ${r.color}`}>{r.severity}</div>
                <p className="text-[10px] text-slate-400 truncate">{r.fullName}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}

    </div>
  );
};

export default Dashboard;
