import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Heart,
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
  Moon,
  Sun,
  Menu,
  X,
  Globe,
  Database,
  Server,
  Palette,
  Cpu,
  Shield,
  Layers,
} from 'lucide-react';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay },
});

const features = [
  { icon: <Smile size={20} />, title: 'Mood Tracker', color: 'sky', desc: 'Track your emotional state daily with customisable moods and intensity ratings. Visual trend charts reveal patterns across weeks and months, helping you — and your therapist — understand your emotional landscape.' },
  { icon: <BookOpen size={20} />, title: 'Guided Journal', color: 'emerald', desc: 'Write freely or follow structured prompts designed to foster self-reflection. Entries are private, timestamped, and searchable — building a personal record of your mental health journey.' },
  { icon: <MessageSquare size={20} />, title: 'AI Companion', color: 'violet', desc: 'Powered by Claude (Anthropic), the AI companion offers empathetic, non-judgmental conversation. It draws on wellness frameworks to guide supportive dialogue, while always deferring serious concerns to professionals.' },
  { icon: <Zap size={20} />, title: 'Thought Reframing', color: 'amber', desc: 'A CBT-inspired tool that walks you through identifying cognitive distortions, examining evidence, and constructing healthier, more balanced perspectives — guided step-by-step by AI.' },
  { icon: <Wind size={20} />, title: 'Therapy Toolkit', color: 'teal', desc: 'A library of evidence-based exercises: box breathing, 5-4-3-2-1 grounding, progressive muscle relaxation, body scans, and more. Each technique is explained with in-app guided timers.' },
  { icon: <ClipboardList size={20} />, title: 'Assessments', color: 'rose', desc: 'Standardised screening tools including PHQ-9 (depression), GAD-7 (anxiety), and well-being indices. Results are stored over time so you can monitor changes and share data with care providers.' },
  { icon: <HeartPulse size={20} />, title: 'Therapy Types', color: 'pink', desc: 'A curated educational section explaining major therapy modalities — CBT, DBT, ACT, psychodynamic, somatic, and more — so you can make informed decisions about the support you seek.' },
  { icon: <BookMarked size={20} />, title: 'Learning Hub', color: 'indigo', desc: 'Articles, guides, and resources on anxiety, depression, stress, relationships, sleep, and self-care — all vetted and presented in plain, accessible language.' },
  { icon: <ShieldAlert size={20} />, title: 'Crisis Support', color: 'red', desc: 'Immediate access to crisis helplines, safety planning checklists, and emergency resources. Designed to be findable in seconds when it matters most.' },
];

const colorMap = {
  sky:     { bg: 'bg-sky-50 dark:bg-sky-900/20',     icon: 'text-sky-600 dark:text-sky-400',     border: 'border-sky-100 dark:border-sky-800/40',     dot: 'bg-sky-500'     },
  emerald: { bg: 'bg-emerald-50 dark:bg-emerald-900/20', icon: 'text-emerald-600 dark:text-emerald-400', border: 'border-emerald-100 dark:border-emerald-800/40', dot: 'bg-emerald-500' },
  violet:  { bg: 'bg-violet-50 dark:bg-violet-900/20',  icon: 'text-violet-600 dark:text-violet-400',  border: 'border-violet-100 dark:border-violet-800/40',  dot: 'bg-violet-500'  },
  amber:   { bg: 'bg-amber-50 dark:bg-amber-900/20',   icon: 'text-amber-600 dark:text-amber-400',   border: 'border-amber-100 dark:border-amber-800/40',   dot: 'bg-amber-500'   },
  teal:    { bg: 'bg-teal-50 dark:bg-teal-900/20',    icon: 'text-teal-600 dark:text-teal-400',    border: 'border-teal-100 dark:border-teal-800/40',    dot: 'bg-teal-500'    },
  rose:    { bg: 'bg-rose-50 dark:bg-rose-900/20',    icon: 'text-rose-600 dark:text-rose-400',    border: 'border-rose-100 dark:border-rose-800/40',    dot: 'bg-rose-500'    },
  pink:    { bg: 'bg-pink-50 dark:bg-pink-900/20',    icon: 'text-pink-600 dark:text-pink-400',    border: 'border-pink-100 dark:border-pink-800/40',    dot: 'bg-pink-500'    },
  indigo:  { bg: 'bg-indigo-50 dark:bg-indigo-900/20',  icon: 'text-indigo-600 dark:text-indigo-400',  border: 'border-indigo-100 dark:border-indigo-800/40',  dot: 'bg-indigo-500'  },
  red:     { bg: 'bg-red-50 dark:bg-red-900/20',      icon: 'text-red-600 dark:text-red-400',      border: 'border-red-100 dark:border-red-800/40',      dot: 'bg-red-500'     },
};

const techGroups = [
  {
    label: 'Frontend', icon: <Globe size={18} />, color: 'sky',
    items: [
      { name: 'React 19',       note: 'Concurrent rendering, hooks-based architecture' },
      { name: 'React Router 7', note: 'File-system inspired declarative routing' },
      { name: 'Vite 8',         note: 'Sub-second HMR, Rolldown bundler' },
      { name: 'Tailwind CSS 4', note: 'Utility-first with custom design tokens' },
      { name: 'Framer Motion',  note: 'Spring physics animations and transitions' },
      { name: 'Recharts',       note: 'Responsive composable chart library' },
      { name: 'Lucide React',   note: 'Consistent icon system' },
      { name: 'Axios',          note: 'Promise-based HTTP client with interceptors' },
    ],
  },
  {
    label: 'Backend', icon: <Server size={18} />, color: 'emerald',
    items: [
      { name: 'Node.js',              note: 'Non-blocking event-driven runtime' },
      { name: 'Express.js',           note: 'Minimal REST API framework' },
      { name: 'JWT (jsonwebtoken)',    note: 'Stateless authentication tokens' },
      { name: 'bcryptjs',             note: 'Password hashing with salt rounds' },
      { name: 'dotenv',               note: 'Environment-based configuration' },
      { name: 'CORS middleware',       note: 'Cross-origin resource sharing control' },
    ],
  },
  {
    label: 'Database', icon: <Database size={18} />, color: 'violet',
    items: [
      { name: 'MongoDB',  note: 'Flexible document-oriented database' },
      { name: 'Mongoose', note: 'Schema modelling and validation ODM' },
    ],
  },
  {
    label: 'AI Layer', icon: <Cpu size={18} />, color: 'amber',
    items: [
      { name: 'Google Gemini API',    note: 'Conversational AI & thought reframing' },
      { name: 'Custom system prompts', note: 'Role-specific wellness context tuning' },
    ],
  },
  {
    label: 'Security', icon: <Shield size={18} />, color: 'rose',
    items: [
      { name: 'JWT + Bearer tokens', note: 'Stateless auth with expiry' },
      { name: 'Password hashing',    note: 'bcrypt with configurable rounds' },
      { name: 'Protected routes',    note: 'Auth middleware on all private endpoints' },
    ],
  },
  {
    label: 'UI / DX', icon: <Palette size={18} />, color: 'indigo',
    items: [
      { name: 'DaisyUI 5',           note: 'Component class utilities on top of Tailwind' },
      { name: 'ESLint 9',            note: 'Flat config with React hooks plugin' },
      { name: 'Outfit + Inter fonts', note: 'Display and body typefaces from Google Fonts' },
    ],
  },
];

const techColorMap = {
  sky:     { header: 'bg-sky-50 dark:bg-sky-900/20 border-sky-100 dark:border-sky-800/40',         icon: 'text-sky-600 dark:text-sky-400',     dot: 'bg-sky-400',     badge: 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300'         },
  emerald: { header: 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-800/40', icon: 'text-emerald-600 dark:text-emerald-400', dot: 'bg-emerald-400', badge: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300' },
  violet:  { header: 'bg-violet-50 dark:bg-violet-900/20 border-violet-100 dark:border-violet-800/40',   icon: 'text-violet-600 dark:text-violet-400',  dot: 'bg-violet-400',  badge: 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300'   },
  amber:   { header: 'bg-amber-50 dark:bg-amber-900/20 border-amber-100 dark:border-amber-800/40',     icon: 'text-amber-600 dark:text-amber-400',   dot: 'bg-amber-400',   badge: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300'     },
  rose:    { header: 'bg-rose-50 dark:bg-rose-900/20 border-rose-100 dark:border-rose-800/40',       icon: 'text-rose-600 dark:text-rose-400',     dot: 'bg-rose-400',    badge: 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300'       },
  indigo:  { header: 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-100 dark:border-indigo-800/40',   icon: 'text-indigo-600 dark:text-indigo-400',  dot: 'bg-indigo-400',  badge: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300'   },
};

const About = () => {
  const [isDark, setIsDark] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleDark = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`${isDark ? 'dark' : ''} min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300`}>

      {/* ── Navbar ── */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-linear-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-bold text-base shadow-md shadow-primary-200 dark:shadow-primary-900/40">
              S
            </div>
            <span className="font-display font-bold text-xl bg-linear-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent">
              Serene
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {[['Home', '/'], ['Log in', '/login']].map(([label, href]) => (
              <Link key={label} to={href} className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
                {label}
              </Link>
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

        {mobileOpen && (
          <div className="md:hidden border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-3 space-y-1">
            {[['Home', '/'], ['Log in', '/login'], ['Sign up', '/signup']].map(([label, href]) => (
              <Link key={label} to={href} onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
                {label}
              </Link>
            ))}
          </div>
        )}
      </header>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-20 pb-20">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-175 h-100 bg-linear-to-b from-primary-100/50 dark:from-primary-900/20 to-transparent rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-20 h-20 rounded-3xl bg-linear-to-br from-primary-500 to-violet-600 flex items-center justify-center text-white shadow-2xl shadow-primary-300 dark:shadow-primary-900/50 mx-auto mb-8"
          >
            <Heart size={36} />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl font-display font-bold text-slate-900 dark:text-white mb-5 tracking-tight"
          >
            About Serene
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed"
          >
            Serene is a privacy-first mental wellness platform built to make evidence-based
            mental health tools accessible to everyone — for free, without stigma.
          </motion.p>
        </div>
      </section>

      {/* ── Mission ── */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeUp()}>
              <p className="text-xs font-bold uppercase tracking-widest text-primary-600 dark:text-primary-400 mb-3">Our mission</p>
              <h2 className="text-3xl font-display font-bold text-slate-900 dark:text-white mb-5 leading-tight">
                Mental health support that meets you where you are.
              </h2>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                Millions of people struggle with anxiety, depression, and stress — yet access to quality mental health care remains limited by cost, geography, and stigma. Serene bridges that gap with a compassionate digital companion available 24/7.
              </p>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                We combine clinically grounded techniques like Cognitive Behavioural Therapy (CBT), mindfulness, and psychoeducation with modern AI to create personalised, adaptive support — while being clear that Serene complements, not replaces, professional care.
              </p>
            </motion.div>

            <motion.div {...fadeUp(0.1)} className="grid grid-cols-2 gap-4">
              {[
                { val: '9',    label: 'Wellness tools',    color: 'text-primary-600' },
                { val: 'AI',   label: 'Powered by Gemini', color: 'text-violet-600'  },
                { val: 'Free', label: 'No subscriptions',  color: 'text-emerald-600' },
                { val: '24/7', label: 'Always available',  color: 'text-amber-600'   },
              ].map((s) => (
                <div key={s.label} className="bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 text-center">
                  <p className={`text-4xl font-display font-black ${s.color} mb-1`}>{s.val}</p>
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-20 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div {...fadeUp()} className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-primary-600 dark:text-primary-400 mb-3">Feature deep-dive</p>
            <h2 className="text-4xl font-display font-bold text-slate-900 dark:text-white mb-4">What Serene offers</h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
              Every tool is carefully designed around real mental health needs and evidence-based practices.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => {
              const c = colorMap[f.color];
              return (
                <motion.div key={f.title} {...fadeUp(i * 0.04)} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 hover:shadow-md transition-shadow duration-200">
                  <div className={`w-11 h-11 rounded-xl ${c.bg} ${c.icon} border ${c.border} flex items-center justify-center mb-4`}>
                    {f.icon}
                  </div>
                  <h3 className="font-display font-bold text-slate-800 dark:text-slate-100 mb-2">{f.title}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{f.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Tech Stack ── */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div {...fadeUp()} className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-primary-600 dark:text-primary-400 mb-3">Under the hood</p>
            <h2 className="text-4xl font-display font-bold text-slate-900 dark:text-white mb-4">Technology stack</h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
              Serene is built with a modern, production-grade stack chosen for performance, security, and developer experience.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {techGroups.map((group, gi) => {
              const c = techColorMap[group.color];
              return (
                <motion.div key={group.label} {...fadeUp(gi * 0.06)} className="bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-2xl overflow-hidden">
                  <div className={`flex items-center gap-3 px-5 py-4 border-b ${c.header}`}>
                    <div className={c.icon}>{group.icon}</div>
                    <span className={`text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${c.badge}`}>
                      {group.label}
                    </span>
                  </div>
                  <div className="px-5 py-4 space-y-3">
                    {group.items.map((item) => (
                      <div key={item.name} className="flex items-start gap-2.5">
                        <div className={`w-1.5 h-1.5 rounded-full ${c.dot} shrink-0 mt-1.5`} />
                        <div>
                          <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">{item.name}</span>
                          <span className="text-xs text-slate-400 dark:text-slate-500 ml-2">— {item.note}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
          <motion.div {...fadeUp(0.2)} className="mt-8 bg-slate-900 dark:bg-slate-800 rounded-2xl p-6 text-slate-300 text-sm leading-relaxed flex gap-4 items-start">
            <Layers className="text-primary-400 shrink-0 mt-0.5" size={20} />
            <div>
              <p className="font-bold text-white mb-1">Architecture overview</p>
              <p>
                Serene follows a <strong className="text-primary-300">client–server</strong> architecture: a React SPA communicates with an Express REST API via Axios.
                All private routes are guarded by JWT middleware on both the frontend (React Router) and backend (Express).
                The AI layer proxies requests through the backend to keep the Gemini API key server-side only.
                MongoDB stores user data, mood logs, and journal entries — all scoped to authenticated users.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Disclaimer ── */}
      <section className="py-12 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <motion.div {...fadeUp()} className="bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800/50 rounded-2xl p-6 flex gap-4">
            <ShieldAlert className="text-amber-500 shrink-0 mt-0.5" size={22} />
            <div>
              <p className="font-bold text-amber-900 dark:text-amber-300 mb-1">Important disclaimer</p>
              <p className="text-sm text-amber-700 dark:text-amber-400 leading-relaxed">
                Serene is a wellness companion tool and is <strong>not</strong> a medical device or mental health service.
                It does not provide diagnosis, treatment, or clinical advice. If you are experiencing a mental health crisis
                or need professional support, please contact a qualified healthcare provider or an emergency service.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <motion.div {...fadeUp()}>
            <h2 className="text-4xl font-display font-bold text-slate-900 dark:text-white mb-4">Ready to begin?</h2>
            <p className="text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
              Create your free account and start taking care of your mental health today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link to="/signup" className="btn btn-primary flex items-center gap-2 px-7 py-3.5 text-base shadow-lg shadow-primary-200 dark:shadow-primary-900/40 hover:scale-105 transition-transform">
                Get started free <ArrowRight size={18} />
              </Link>
              <Link to="/" className="btn btn-secondary flex items-center gap-2 px-7 py-3.5 text-base hover:scale-105 transition-transform">
                Back to home
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-linear-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-bold text-sm">S</div>
            <span className="font-display font-bold text-slate-700 dark:text-slate-300">Serene</span>
          </div>
          <p className="text-xs text-slate-400">Not a substitute for professional medical advice.</p>
          <div className="flex items-center gap-4 text-xs text-slate-400">
            <Link to="/" className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors">Home</Link>
            <Link to="/login" className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors">Log in</Link>
            <Link to="/signup" className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors">Sign up</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;
