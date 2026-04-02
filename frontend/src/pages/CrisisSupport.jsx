import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Phone,
  MessageSquare,
  Globe,
  ShieldAlert,
  Heart,
  AlertTriangle,
  UserCheck,
  ExternalLink,
  Copy,
  Check,
} from 'lucide-react';

const crisisLines = [
  {
    region: 'United States',
    flag: '🇺🇸',
    lines: [
      { name: '988 Suicide & Crisis Lifeline', contact: 'Call or Text 988',    type: 'phone', href: 'tel:988',             copyValue: '988',           note: '24/7 free & confidential' },
      { name: 'Crisis Text Line',              contact: 'Text HOME to 741741', type: 'text',  href: 'sms:741741?body=HOME', copyValue: '741741',        note: 'Text keyword HOME to this number' },
    ],
  },
  {
    region: 'United Kingdom',
    flag: '🇬🇧',
    lines: [
      { name: 'Samaritans',         contact: '116 123',        type: 'phone', href: 'tel:116123',      copyValue: '116123',        note: '24/7, free from any phone' },
      { name: 'PAPYRUS HOPELINEUK', contact: '0800 068 4141',  type: 'phone', href: 'tel:08000684141', copyValue: '08000684141',   note: 'Under-35 crisis support'   },
    ],
  },
  {
    region: 'Australia',
    flag: '🇦🇺',
    lines: [
      { name: 'Lifeline Australia', contact: '13 11 14',     type: 'phone', href: 'tel:131114',     copyValue: '131114',      note: '24/7 crisis support'  },
      { name: 'Beyond Blue',        contact: '1300 22 4636', type: 'phone', href: 'tel:1300224636', copyValue: '1300224636',   note: 'Mental health support' },
    ],
  },
  {
    region: 'India',
    flag: '🇮🇳',
    lines: [
      { name: 'iCall',                 contact: '9152987821',    type: 'phone', href: 'tel:9152987821',  copyValue: '9152987821',  note: 'Mon–Sat, 8am–10pm' },
      { name: 'Vandrevala Foundation', contact: '1860-2662-345', type: 'phone', href: 'tel:18002662345', copyValue: '18002662345', note: '24/7 helpline'      },
    ],
  },
];

const warningSigns = [
  'Talking about wanting to die or kill themselves',
  'Feeling like a burden to others',
  'Withdrawing from friends and family',
  'Giving away prized possessions',
  'Saying goodbye as if it\'s the last time',
  'Extreme mood swings or sudden calmness after a crisis',
  'Researching methods of self-harm',
  'Increased alcohol or drug use',
];

const howToHelp = [
  { step: 'Ask directly',             desc: 'Ask clearly: "Are you thinking about suicide?" — asking does not plant the idea; it opens a door.'     },
  { step: 'Listen without judgement', desc: 'Let them speak. Avoid minimising feelings. Your presence matters more than your words.'                  },
  { step: 'Stay with them',           desc: 'Do not leave them alone. Remove access to means if possible and stay until help arrives.'                },
  { step: 'Call for help',            desc: 'Contact a crisis line together or take them to the nearest emergency room.'                              },
  { step: 'Follow up',                desc: 'Check in after the crisis. Recovery is ongoing — a message or call can save a life.'                    },
];

// Toast shown at bottom of screen
const Toast = ({ message, visible }) => (
  <AnimatePresence>
    {visible && (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-2.5 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-semibold rounded-full shadow-xl"
      >
        <Check size={13} className="text-emerald-400 dark:text-emerald-600" />
        {message}
      </motion.div>
    )}
  </AnimatePresence>
);

const CopyButton = ({ value }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <button
      onClick={handleCopy}
      title={copied ? 'Copied!' : `Copy ${value}`}
      className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all duration-200 border ${
        copied
          ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800'
          : 'bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-slate-300'
      }`}
    >
      {copied ? <Check size={11} /> : <Copy size={11} />}
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
};

const CrisisSupport = () => {
  const [activeRegion, setActiveRegion] = useState(0);
  const [toast, setToast] = useState({ visible: false, message: '' });

  const showToast = (message) => {
    setToast({ visible: true, message });
    setTimeout(() => setToast({ visible: false, message: '' }), 2500);
  };

  // On laptop tel:/sms: links do nothing — so we copy AND attempt the link
  const handleAction = (e, line) => {
    e.preventDefault();
    // Always copy the number to clipboard
    navigator.clipboard.writeText(line.copyValue).then(() => {
      const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
      if (isMobile) {
        // On mobile: open the dialer / SMS app
        window.location.href = line.href;
        showToast(`${line.type === 'text' ? 'Number' : 'Number'} copied & opening ${line.type === 'text' ? 'messages' : 'dialer'}…`);
      } else {
        // On laptop: just confirm the copy since tel: won't dial
        showToast(`${line.copyValue} copied — dial from your phone`);
      }
    });
  };

  return (
    <>
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-700">

      {/* Banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-linear-to-br from-red-600 to-rose-600 p-8 text-white shadow-2xl shadow-red-500/25"
      >
        <div className="relative z-10 flex items-start gap-5">
          <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
            <ShieldAlert size={28} />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-red-200 mb-1">Emergency Resources</p>
            <h2 className="text-3xl font-bold mb-2">Crisis & Suicide Prevention</h2>
            <p className="text-red-100 text-sm leading-relaxed max-w-2xl">
              If you or someone you know is in immediate danger, call emergency services
              <strong className="text-white"> (911 / 999 / 000)</strong> right away.
              The resources below offer free, confidential support around the clock.
            </p>
          </div>
        </div>
        <Heart className="absolute -bottom-6 -right-6 text-white/10 pointer-events-none" size={130} />
        <div className="absolute -top-8 -right-8 w-48 h-48 bg-white/5 rounded-full blur-3xl pointer-events-none" />
      </motion.div>

      {/* Helplines */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden"
      >
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
          <Phone size={15} className="text-red-500" />
          <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100">Crisis Helplines</h3>
          <span className="text-[10px] font-bold text-slate-400 ml-1 uppercase tracking-widest">— Free & Confidential</span>
        </div>

        {/* Region Tabs */}
        <div className="flex border-b border-slate-100 dark:border-slate-800 overflow-x-auto scrollbar-hide">
          {crisisLines.map((region, idx) => (
            <button
              key={idx}
              onClick={() => setActiveRegion(idx)}
              className={`flex items-center gap-2 px-5 py-3 text-xs font-bold whitespace-nowrap transition-all duration-150 border-b-2 ${
                activeRegion === idx
                  ? 'border-red-500 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/10'
                  : 'border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
              }`}
            >
              <span>{region.flag}</span>
              {region.region}
            </button>
          ))}
        </div>

        {/* Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeRegion}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-3"
          >
            {crisisLines[activeRegion].lines.map((line, idx) => (
              <div
                key={idx}
                className="flex flex-col gap-3 p-4 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-red-200 dark:hover:border-red-800/50 hover:bg-red-50/50 dark:hover:bg-red-900/10 transition-all duration-150"
              >
                {/* Top row: icon + name + note */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-900/40 flex items-center justify-center shrink-0 text-red-500">
                    {line.type === 'text' ? <MessageSquare size={18} /> : <Phone size={18} />}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-slate-700 dark:text-slate-200 truncate">{line.name}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{line.note}</p>
                  </div>
                </div>

                {/* Number row: big number + copy + call/text button */}
                <div className="flex items-center justify-between gap-2 pl-1">
                  <span className="text-lg font-bold text-red-500 tracking-wide">{line.contact}</span>
                  <div className="flex items-center gap-2">
                    <CopyButton value={line.copyValue} />
                    <button
                      onClick={(e) => handleAction(e, line)}
                      className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-red-600 hover:bg-red-700 active:scale-95 text-white text-[10px] font-bold transition-all"
                    >
                      {line.type === 'text' ? <MessageSquare size={11} /> : <Phone size={11} />}
                      {line.type === 'text' ? 'Open SMS' : 'Call Now'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Global directory */}
        <div className="px-5 pb-5">
          <a
            href="https://www.findahelpline.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-dashed border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-500 hover:text-slate-700 hover:border-slate-400 dark:hover:text-slate-300 dark:hover:border-slate-500 transition-all"
          >
            <Globe size={13} />
            Find a helpline in any country — findahelpline.com
            <ExternalLink size={11} />
          </a>
        </div>
      </motion.div>

      {/* Warning Signs + How to Help */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Warning Signs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden"
        >
          <div className="flex items-center gap-2 px-6 py-4 border-b border-slate-100 dark:border-slate-800">
            <AlertTriangle size={15} className="text-amber-500" />
            <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100">Warning Signs to Watch For</h3>
          </div>
          <ul className="divide-y divide-slate-50 dark:divide-slate-800">
            {warningSigns.map((sign, idx) => (
              <li key={idx} className="flex items-start gap-3 px-6 py-3">
                <span className="w-5 h-5 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{sign}</p>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* How to Help */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden"
        >
          <div className="flex items-center gap-2 px-6 py-4 border-b border-slate-100 dark:border-slate-800">
            <UserCheck size={15} className="text-emerald-500" />
            <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100">How to Help Someone in Crisis</h3>
          </div>
          <div className="divide-y divide-slate-50 dark:divide-slate-800">
            {howToHelp.map((item, idx) => (
              <div key={idx} className="flex items-start gap-4 px-6 py-4">
                <span className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <div>
                  <p className="text-xs font-bold text-slate-700 dark:text-slate-200 mb-0.5">{item.step}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>

      {/* Disclaimer */}
      <p className="text-center text-[11px] text-slate-400 leading-relaxed max-w-2xl mx-auto pb-4">
        This app is not a substitute for professional mental health care. If you are in immediate danger, please call your local emergency services immediately.
      </p>

    </div>

    {/* Toast notification */}
    <Toast visible={toast.visible} message={toast.message} />
    </>
  );
};

export default CrisisSupport;
