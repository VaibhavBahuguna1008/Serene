import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Smile,
  BookOpen,
  MessageSquare,
  Zap,
  Wind,
  ClipboardList,
  HeartPulse,
  BookMarked,
  ShieldAlert,
  ArrowRight,
  Heart,
  Sparkles,
  Moon,
  Sun,
  Menu,
  X,
  CheckCircle2,
  Brain,
  TrendingUp,
  Lock,
} from 'lucide-react';

const features = [
  {
    icon: <Smile size={22} />,
    title: 'Mood Tracker',
    desc: 'Log your daily emotions and intensity. Watch patterns emerge over time through beautiful charts.',
    color: 'sky',
  },
  {
    icon: <BookOpen size={22} />,
    title: 'Guided Journal',
    desc: 'Capture your thoughts with structured prompts that help you reflect and grow.',
    color: 'emerald',
  },
  {
    icon: <MessageSquare size={22} />,
    title: 'AI Companion',
    desc: 'Chat with a compassionate AI trained in supportive conversation and mental wellness techniques.',
    color: 'violet',
  },
  {
    icon: <Zap size={22} />,
    title: 'Thought Reframing',
    desc: 'Challenge negative thoughts using evidence-based CBT techniques guided by AI.',
    color: 'amber',
  },
  {
    icon: <Wind size={22} />,
    title: 'Therapy Toolkit',
    desc: 'Access breathing exercises, grounding techniques, and mindfulness practices anytime.',
    color: 'teal',
  },
  {
    icon: <ClipboardList size={22} />,
    title: 'Assessments',
    desc: 'Take standardized mental health screenings (PHQ-9, GAD-7) to better understand your state.',
    color: 'rose',
  },
  {
    icon: <HeartPulse size={22} />,
    title: 'Therapy Types',
    desc: 'Learn about CBT, DBT, ACT, and more — understand what kind of support fits you best.',
    color: 'pink',
  },
  {
    icon: <BookMarked size={22} />,
    title: 'Learning Hub',
    desc: 'Explore curated articles, guides, and resources on mental health and wellness.',
    color: 'indigo',
  },
  {
    icon: <ShieldAlert size={22} />,
    title: 'Crisis Support',
    desc: 'Immediate access to crisis helplines, safety planning, and emergency resources.',
    color: 'red',
  },
];

const colorMap = {
  sky: { bg: 'bg-sky-50 dark:bg-sky-900/20', icon: 'text-sky-600 dark:text-sky-400', border: 'border-sky-100 dark:border-sky-800/40' },
  emerald: { bg: 'bg-emerald-50 dark:bg-emerald-900/20', icon: 'text-emerald-600 dark:text-emerald-400', border: 'border-emerald-100 dark:border-emerald-800/40' },
  violet: { bg: 'bg-violet-50 dark:bg-violet-900/20', icon: 'text-violet-600 dark:text-violet-400', border: 'border-violet-100 dark:border-violet-800/40' },
  amber: { bg: 'bg-amber-50 dark:bg-amber-900/20', icon: 'text-amber-600 dark:text-amber-400', border: 'border-amber-100 dark:border-amber-800/40' },
  teal: { bg: 'bg-teal-50 dark:bg-teal-900/20', icon: 'text-teal-600 dark:text-teal-400', border: 'border-teal-100 dark:border-teal-800/40' },
  rose: { bg: 'bg-rose-50 dark:bg-rose-900/20', icon: 'text-rose-600 dark:text-rose-400', border: 'border-rose-100 dark:border-rose-800/40' },
  pink: { bg: 'bg-pink-50 dark:bg-pink-900/20', icon: 'text-pink-600 dark:text-pink-400', border: 'border-pink-100 dark:border-pink-800/40' },
  indigo: { bg: 'bg-indigo-50 dark:bg-indigo-900/20', icon: 'text-indigo-600 dark:text-indigo-400', border: 'border-indigo-100 dark:border-indigo-800/40' },
  red: { bg: 'bg-red-50 dark:bg-red-900/20', icon: 'text-red-600 dark:text-red-400', border: 'border-red-100 dark:border-red-800/40' },
};

const techStack = [
  { name: 'React 19', badge: 'Frontend', color: 'sky', desc: 'Component-driven UI with hooks and concurrent features.' },
  { name: 'Vite 8', badge: 'Build Tool', color: 'violet', desc: 'Lightning-fast HMR and optimised production bundles.' },
  { name: 'Tailwind CSS 4', badge: 'Styling', color: 'teal', desc: 'Utility-first CSS with a custom design token system.' },
  { name: 'Framer Motion', badge: 'Animations', color: 'pink', desc: 'Smooth, spring-based transitions and micro-interactions.' },
  { name: 'Node.js + Express', badge: 'Backend', color: 'emerald', desc: 'RESTful API with middleware, auth, and validation layers.' },
  { name: 'MongoDB + Mongoose', badge: 'Database', color: 'green', desc: 'Flexible document model for users, moods, and journals.' },
  { name: 'JWT Auth', badge: 'Security', color: 'amber', desc: 'Stateless authentication with secure token management.' },
  { name: 'Claude AI (Anthropic)', badge: 'AI Layer', color: 'indigo', desc: 'Conversational AI and CBT-guided thought reframing.' },
];

const techColorMap = {
  sky: 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300',
  violet: 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300',
  teal: 'bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300',
  pink: 'bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300',
  emerald: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  green: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
  amber: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  indigo: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300',
};

const steps = [
  { num: '01', icon: <Lock size={20} />, title: 'Create your account', desc: 'Sign up in seconds — no credit card, no subscriptions. Your data is private and encrypted.' },
  { num: '02', icon: <Brain size={20} />, title: 'Track & reflect', desc: 'Log moods, write journal entries, and complete guided exercises at your own pace.' },
  { num: '03', icon: <TrendingUp size={20} />, title: 'Grow over time', desc: 'Visualise trends, get AI-powered insights, and celebrate your progress milestones.' },
];

const Landing = () => {
  const [isDark, setIsDark] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleDark = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5, delay },
  });

  return (
    <div className={`${isDark ? 'dark' : ''} min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300`}>

      {/* ── Navbar ── */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-bold text-base shadow-md shadow-primary-200 dark:shadow-primary-900/40">
              S
            </div>
            <span className="font-display font-bold text-xl bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent">
              Serene
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {[['Features', '#features'], ['How it Works', '#how'], ['Tech Stack', '#stack'], ['About', '/about']].map(([label, href]) => (
              href.startsWith('#') ? (
                <a key={label} href={href} className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
                  {label}
                </a>
              ) : (
                <Link key={label} to={href} className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
                  {label}
                </Link>
              )
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button onClick={toggleDark} className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <Link to="/login" className="hidden sm:block btn btn-secondary text-sm px-4 py-2">Log in</Link>
            <Link to="/signup" className="btn btn-primary text-sm px-4 py-2">Get Started</Link>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all">
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-3 space-y-1">
            {[['Features', '#features'], ['How it Works', '#how'], ['Tech Stack', '#stack'], ['About', '/about'], ['Log in', '/login']].map(([label, href]) => (
              href.startsWith('#') ? (
                <a key={label} href={href} onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
                  {label}
                </a>
              ) : (
                <Link key={label} to={href} onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
                  {label}
                </Link>
              )
            ))}
          </div>
        )}
      </header>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-20 pb-28">
        {/* Background blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-primary-100/60 dark:from-primary-900/20 to-transparent rounded-full blur-3xl" />
          <div className="absolute top-20 right-10 w-64 h-64 bg-violet-200/40 dark:bg-violet-800/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-10 w-56 h-56 bg-emerald-200/30 dark:bg-emerald-800/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-primary-50 dark:bg-primary-900/30 border border-primary-100 dark:border-primary-800/60 text-primary-700 dark:text-primary-300 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest mb-6"
          >
            <Sparkles size={12} /> Your mental wellness companion
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold text-slate-900 dark:text-white leading-[1.1] tracking-tight mb-6"
          >
            Feel better,{' '}
            <span className="bg-gradient-to-r from-primary-600 via-primary-500 to-violet-500 bg-clip-text text-transparent">
              one day
            </span>{' '}
            at a time.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10"
          >
            Serene is a privacy-first mental wellness platform with mood tracking, AI-powered journaling,
            CBT tools, guided exercises, and crisis support — all in one calming space.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <Link to="/signup" className="btn btn-primary flex items-center gap-2 px-7 py-3.5 text-base shadow-lg shadow-primary-200 dark:shadow-primary-900/40 hover:scale-105 transition-transform">
              Start for free <ArrowRight size={18} />
            </Link>
            <Link to="/about" className="btn btn-secondary flex items-center gap-2 px-7 py-3.5 text-base hover:scale-105 transition-transform">
              Learn more
            </Link>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-10 flex flex-wrap justify-center gap-5 text-xs text-slate-400 dark:text-slate-500"
          >
            {['No credit card required', 'Private & encrypted', 'Free to use', 'AI-powered'].map((b) => (
              <span key={b} className="flex items-center gap-1.5">
                <CheckCircle2 size={13} className="text-emerald-500" /> {b}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="py-24 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div {...fadeUp()} className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-primary-600 dark:text-primary-400 mb-3">Everything you need</p>
            <h2 className="text-4xl font-display font-bold text-slate-900 dark:text-white mb-4">9 tools for your wellbeing</h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
              Each feature is designed with care — grounded in clinical best practices and built for everyday use.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => {
              const c = colorMap[f.color];
              return (
                <motion.div key={f.title} {...fadeUp(i * 0.05)} className={`p-6 rounded-2xl border ${c.border} ${c.bg} flex gap-4 group hover:scale-[1.02] transition-transform duration-200`}>
                  <div className={`w-11 h-11 rounded-xl ${c.bg} ${c.icon} border ${c.border} flex items-center justify-center shrink-0 shadow-sm`}>
                    {f.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-1">{f.title}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{f.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section id="how" className="py-24 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div {...fadeUp()} className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-primary-600 dark:text-primary-400 mb-3">Simple by design</p>
            <h2 className="text-4xl font-display font-bold text-slate-900 dark:text-white mb-4">How Serene works</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((s, i) => (
              <motion.div key={s.num} {...fadeUp(i * 0.1)} className="flex flex-col items-center text-center gap-3">
                <span className="text-5xl font-display font-black text-primary-200 dark:text-primary-900 select-none leading-none">{s.num}</span>
                <div>
                  <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white mb-1">{s.title}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tech Stack ── */}
      <section id="stack" className="py-24 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div {...fadeUp()} className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-primary-600 dark:text-primary-400 mb-3">Built with care</p>
            <h2 className="text-4xl font-display font-bold text-slate-900 dark:text-white mb-4">Modern tech stack</h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
              Serene is built on a robust, scalable foundation using industry-leading open-source tools.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {techStack.map((t, i) => (
              <motion.div key={t.name} {...fadeUp(i * 0.05)} className="p-5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 hover:border-slate-200 dark:hover:border-slate-700 transition-colors">
                <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${techColorMap[t.color]}`}>
                  {t.badge}
                </span>
                <h3 className="font-bold text-slate-800 dark:text-slate-100 mt-3 mb-1">{t.name}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{t.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <motion.div {...fadeUp()} className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-600 via-primary-500 to-violet-600 p-12 text-white text-center shadow-2xl shadow-primary-500/25">
            <div className="relative z-10">
              <h2 className="text-4xl font-display font-bold mb-4">Start your journey today.</h2>
              <p className="text-primary-100 text-lg mb-8 max-w-md mx-auto leading-relaxed">
                Join Serene and take the first step towards understanding and improving your mental wellbeing.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link to="/signup" className="bg-white text-primary-700 font-bold px-8 py-3.5 rounded-xl hover:bg-primary-50 transition-colors shadow-lg flex items-center gap-2">
                  Create free account <ArrowRight size={18} />
                </Link>
                <Link to="/login" className="border border-white/30 text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-white/10 transition-colors">
                  Log in
                </Link>
              </div>
            </div>
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-10 w-48 h-48 bg-violet-400/20 rounded-full blur-2xl pointer-events-none" />
            <Heart className="absolute bottom-6 right-8 text-white/10 pointer-events-none" size={96} />
          </motion.div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-bold text-sm">S</div>
            <span className="font-display font-bold text-slate-700 dark:text-slate-300">Serene</span>
          </div>
          <p className="text-xs text-slate-400">
            Built with care for mental wellness. Not a substitute for professional medical advice.
          </p>
          <div className="flex items-center gap-4 text-xs text-slate-400">
            <Link to="/about" className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors">About</Link>
            <Link to="/login" className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors">Log in</Link>
            <Link to="/signup" className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors">Sign up</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
