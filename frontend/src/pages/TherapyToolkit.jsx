import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Wind,
  Play,
  Pause,
  Clock,
  Sparkles,
  Eye,
  Hand,
  Ear,
  Coffee,
  CheckCircle2,
  Circle,
  RotateCcw,
  ChevronDown,
  Activity,
  ExternalLink,
} from 'lucide-react';

// ─── Box Breathing ──────────────────────────────────────────────────────────
const BreathingBox = () => {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase]       = useState('Breathe In');
  const [timeLeft, setTimeLeft] = useState(4);

  const startBreathing = () => { setIsActive(true); setPhase('Breathe In'); setTimeLeft(4); };
  const stopBreathing  = () => { setIsActive(false); setPhase('Breathe In'); setTimeLeft(4); };

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft(t => t - 1), 1000);
    } else if (isActive && timeLeft === 0) {
      if      (phase === 'Breathe In')  { setPhase('Hold');        setTimeLeft(4); }
      else if (phase === 'Hold')        { setPhase('Breathe Out'); setTimeLeft(4); }
      else if (phase === 'Breathe Out') { setPhase('Hold ');       setTimeLeft(4); }
      else                              { setPhase('Breathe In');  setTimeLeft(4); }
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, phase]);

  const phaseColor = { 'Breathe In': 'text-sky-500', 'Hold': 'text-violet-500', 'Breathe Out': 'text-emerald-500', 'Hold ': 'text-amber-500' }[phase] || 'text-primary-500';

  return (
    <div className="card glass flex flex-col items-center justify-center p-10 min-h-105 space-y-8 relative overflow-hidden">
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-1">Box Breathing</h3>
        <p className="text-slate-500 dark:text-slate-400 text-sm">Reduce stress and anxiety in minutes.</p>
      </div>

      <div className="relative flex items-center justify-center w-56 h-56">
        <AnimatePresence>
          {isActive && (
            <motion.div
              key={phase}
              initial={{ scale: 0.8, opacity: 0.2 }}
              animate={{ scale: (phase === 'Breathe In' || phase === 'Hold') ? 1.3 : 0.85, opacity: 0.25 }}
              transition={{ duration: 4, ease: 'linear' }}
              className="absolute inset-0 bg-primary-400 rounded-full blur-3xl"
            />
          )}
        </AnimatePresence>

        <motion.div
          className={`w-48 h-48 border-4 flex flex-col items-center justify-center text-center p-4 transition-colors duration-500 ${
            isActive ? 'border-primary-400 bg-primary-50/40 dark:bg-primary-900/20' : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900'
          }`}
          animate={isActive ? { borderRadius: phase.includes('Hold') ? '20%' : '50%', scale: (phase === 'Breathe In' || phase === 'Hold') ? 1.1 : 0.9 } : { borderRadius: '24px', scale: 1 }}
          transition={{ duration: 4, ease: 'easeInOut' }}
        >
          {isActive ? (
            <>
              <motion.span key={phase} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className={`text-lg font-bold ${phaseColor}`}>
                {phase.trim()}
              </motion.span>
              <span className="text-5xl font-bold mt-1 text-slate-800 dark:text-slate-100">{timeLeft}</span>
            </>
          ) : (
            <Wind size={48} className="text-primary-200" />
          )}
        </motion.div>
      </div>

      <div className="flex flex-col items-center gap-4">
        <button
          onClick={isActive ? stopBreathing : startBreathing}
          className={`btn px-10 flex items-center justify-center gap-2 ${isActive ? 'btn-outline border-red-200 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20' : 'btn-primary'}`}
        >
          {isActive ? <Pause size={18} className="shrink-0" /> : <Play size={18} className="shrink-0" />}
          <span>{isActive ? 'Stop' : 'Start Exercise'}</span>
        </button>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Clock size={12} /><span>4-4-4-4 Technique</span>
        </div>
      </div>
    </div>
  );
};

// ─── Therapist Support Card ──────────────────────────────────────────────────
const TherapistSupport = () => (
  <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-primary-600 to-violet-600 p-6 text-white shadow-xl shadow-primary-500/20">
    <div className="relative z-10 space-y-3">
      <span className="text-[10px] font-bold uppercase tracking-widest text-primary-200">Professional Support</span>
      <h4 className="font-bold text-base leading-snug">Need Therapist Support?</h4>
      <p className="text-xs text-primary-100 leading-relaxed">
        Connect with a licensed therapist for personalized guidance. OpenCounseling lists free and low-cost options near you.
      </p>
      <a
        href="https://www.opencounseling.com"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-1 inline-flex items-center gap-2 text-xs font-bold bg-white/20 hover:bg-white/30 transition-colors px-4 py-2 rounded-xl"
      >
        Find a Free Therapist <ExternalLink size={12} />
      </a>
    </div>
    <Wind className="absolute -bottom-6 -right-6 w-28 h-28 text-white/10 rotate-45" />
  </div>
);

// ─── 5-4-3-2-1 Grounding ────────────────────────────────────────────────────
const groundingSteps = [
  { count: 5, sense: 'See',   prompt: 'Name 5 things you can see right now',       icon: <Eye size={18} />,        bg: 'bg-sky-50 dark:bg-sky-900/20',     iconBg: 'bg-sky-100 dark:bg-sky-800/40',     iconColor: 'text-sky-600 dark:text-sky-400',     badge: 'bg-sky-500'     },
  { count: 4, sense: 'Touch', prompt: 'Feel 4 things you can physically touch',    icon: <Hand size={18} />,       bg: 'bg-emerald-50 dark:bg-emerald-900/20', iconBg: 'bg-emerald-100 dark:bg-emerald-800/40', iconColor: 'text-emerald-600 dark:text-emerald-400', badge: 'bg-emerald-500' },
  { count: 3, sense: 'Hear',  prompt: 'Listen for 3 sounds around you',           icon: <Ear size={18} />,        bg: 'bg-violet-50 dark:bg-violet-900/20', iconBg: 'bg-violet-100 dark:bg-violet-800/40',  iconColor: 'text-violet-600 dark:text-violet-400',  badge: 'bg-violet-500'  },
  { count: 2, sense: 'Smell', prompt: 'Notice 2 things you can smell nearby',     icon: <Wind size={18} />,       bg: 'bg-amber-50 dark:bg-amber-900/20',  iconBg: 'bg-amber-100 dark:bg-amber-800/40',   iconColor: 'text-amber-600 dark:text-amber-400',   badge: 'bg-amber-500'   },
  { count: 1, sense: 'Taste', prompt: 'Identify 1 thing you can taste',           icon: <Coffee size={18} />,     bg: 'bg-rose-50 dark:bg-rose-900/20',    iconBg: 'bg-rose-100 dark:bg-rose-800/40',     iconColor: 'text-rose-600 dark:text-rose-400',     badge: 'bg-rose-500'    },
];

const GroundingExercise = () => {
  const [checked, setChecked] = useState(new Set());
  const toggle  = (idx) => setChecked(prev => { const n = new Set(prev); n.has(idx) ? n.delete(idx) : n.add(idx); return n; });
  const reset   = () => setChecked(new Set());
  const allDone = checked.size === groundingSteps.length;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm">
      <div className="flex items-center gap-3 p-5 border-b border-slate-100 dark:border-slate-800">
        <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0"><Eye size={18} /></div>
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-sm">5-4-3-2-1 Grounding</h4>
          <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Anxiety Relief Technique</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-400">{checked.size}/{groundingSteps.length}</span>
          {checked.size > 0 && <button onClick={reset} className="text-slate-300 hover:text-slate-500 transition-colors"><RotateCcw size={14} /></button>}
        </div>
      </div>
      <div className="h-1 bg-slate-100 dark:bg-slate-800">
        <motion.div className="h-full bg-emerald-500 rounded-full" animate={{ width: `${(checked.size / groundingSteps.length) * 100}%` }} transition={{ duration: 0.3 }} />
      </div>
      <div className="divide-y divide-slate-50 dark:divide-slate-800">
        {groundingSteps.map((step, idx) => {
          const done = checked.has(idx);
          return (
            <motion.button key={idx} onClick={() => toggle(idx)} whileTap={{ scale: 0.98 }} className={`w-full flex items-center gap-3 px-5 py-3.5 text-left transition-all duration-200 ${done ? step.bg : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'}`}>
              <span className={`w-6 h-6 rounded-full ${step.badge} text-white text-[11px] font-bold flex items-center justify-center shrink-0 ${done ? 'opacity-100' : 'opacity-40'}`}>{step.count}</span>
              <div className={`w-8 h-8 rounded-lg ${step.iconBg} ${step.iconColor} flex items-center justify-center shrink-0`}>{step.icon}</div>
              <div className="flex-1 min-w-0">
                <p className={`text-xs font-semibold ${done ? 'line-through text-slate-400' : 'text-slate-700 dark:text-slate-200'}`}>{step.prompt}</p>
                <p className="text-[10px] text-slate-400 font-medium mt-0.5">{step.sense}</p>
              </div>
              <div className={`shrink-0 transition-colors ${done ? 'text-emerald-500' : 'text-slate-200 dark:text-slate-700'}`}>
                {done ? <CheckCircle2 size={18} /> : <Circle size={18} />}
              </div>
            </motion.button>
          );
        })}
      </div>
      <AnimatePresence>
        {allDone && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="bg-emerald-50 dark:bg-emerald-900/20 border-t border-emerald-100 dark:border-emerald-800/50 px-5 py-3">
            <p className="text-xs font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-2"><CheckCircle2 size={14} />Great work! You've completed the grounding exercise.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── Progressive Relaxation ──────────────────────────────────────────────────
const muscleGroups = [
  { part: 'Feet & Toes',  desc: 'Curl toes tightly, hold 5s, then release completely'       },
  { part: 'Calves',       desc: 'Flex your calf muscles upward, hold 5s, then release'      },
  { part: 'Thighs',       desc: 'Squeeze thigh muscles together, hold 5s, then release'     },
  { part: 'Abdomen',      desc: 'Pull stomach in tightly, hold 5s, then release'            },
  { part: 'Hands & Arms', desc: 'Clench both fists hard, hold 5s, then release'             },
  { part: 'Shoulders',    desc: 'Shrug shoulders up to ears, hold 5s, then release'         },
  { part: 'Face',         desc: 'Scrunch face tightly, hold 5s, then release all tension'   },
];

const ProgressiveRelaxation = () => {
  const [activeStep, setActiveStep] = useState(null);
  const [completed, setCompleted]   = useState(new Set());

  const toggle  = (idx) => setActiveStep(prev => prev === idx ? null : idx);
  const markDone = (e, idx) => {
    e.stopPropagation();
    setCompleted(prev => { const n = new Set(prev); n.has(idx) ? n.delete(idx) : n.add(idx); return n; });
    setActiveStep(prev => prev === idx ? null : prev);
  };
  const reset   = () => { setCompleted(new Set()); setActiveStep(null); };
  const allDone = completed.size === muscleGroups.length;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm">
      <div className="flex items-center gap-3 p-5 border-b border-slate-100 dark:border-slate-800">
        <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0"><Activity size={18} /></div>
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-sm">Progressive Relaxation</h4>
          <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Muscle Tension Release</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-400">{completed.size}/{muscleGroups.length}</span>
          {completed.size > 0 && <button onClick={reset} className="text-slate-300 hover:text-slate-500 transition-colors"><RotateCcw size={14} /></button>}
        </div>
      </div>
      <div className="h-1 bg-slate-100 dark:bg-slate-800">
        <motion.div className="h-full bg-amber-500 rounded-full" animate={{ width: `${(completed.size / muscleGroups.length) * 100}%` }} transition={{ duration: 0.3 }} />
      </div>
      <div className="divide-y divide-slate-50 dark:divide-slate-800">
        {muscleGroups.map((group, idx) => {
          const done = completed.has(idx);
          const open = activeStep === idx;
          return (
            <div key={idx}>
              <button onClick={() => toggle(idx)} className={`w-full flex items-center gap-3 px-5 py-3.5 text-left transition-all duration-150 ${done ? 'bg-amber-50 dark:bg-amber-900/20' : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'}`}>
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 transition-colors ${done ? 'bg-amber-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>{idx + 1}</span>
                <span className={`flex-1 text-xs font-semibold ${done ? 'line-through text-slate-400' : 'text-slate-700 dark:text-slate-200'}`}>{group.part}</span>
                <div className="flex items-center gap-2">
                  {done && <CheckCircle2 size={15} className="text-amber-500" />}
                  <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}><ChevronDown size={15} className="text-slate-300" /></motion.div>
                </div>
              </button>
              <AnimatePresence>
                {open && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                    <div className="px-5 pb-4 pt-1 flex items-start justify-between gap-3 bg-slate-50/60 dark:bg-slate-800/30">
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed flex-1">{group.desc}</p>
                      <button onClick={(e) => markDone(e, idx)} className={`text-xs font-bold px-3 py-1.5 rounded-lg shrink-0 transition-colors ${done ? 'bg-slate-100 dark:bg-slate-800 text-slate-500' : 'bg-amber-500 text-white hover:bg-amber-600'}`}>
                        {done ? 'Undo' : 'Done'}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
      <AnimatePresence>
        {allDone && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="bg-amber-50 dark:bg-amber-900/20 border-t border-amber-100 dark:border-amber-800/50 px-5 py-3">
            <p className="text-xs font-bold text-amber-700 dark:text-amber-400 flex items-center gap-2"><CheckCircle2 size={14} />Excellent! Full-body relaxation complete. Notice how you feel now.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── Main Component ──────────────────────────────────────────────────────────
const TherapyToolkit = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in duration-700">

      {/* Page Header */}
      <div className="text-center space-y-2">
        <h2 className="text-4xl font-bold">Therapy Toolkit</h2>
        <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto text-sm">
          Science-backed techniques to help you find calm and stay grounded.
        </p>
      </div>

      {/* Techniques Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

        {/* Left: Box Breathing + Therapist Support */}
        <div className="lg:col-span-2 space-y-5">
          <BreathingBox />
          <TherapistSupport />
        </div>

        {/* Right: Grounding + Progressive Relaxation */}
        <div className="space-y-5">
          <div className="flex items-center gap-2">
            <Sparkles size={17} className="text-primary-500" />
            <h3 className="text-base font-bold">Quick Techniques</h3>
          </div>
          <GroundingExercise />
          <ProgressiveRelaxation />
        </div>

      </div>

    </div>
  );
};

export default TherapyToolkit;
