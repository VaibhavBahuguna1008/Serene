import React from 'react';
import { motion } from 'framer-motion';
import {
  Leaf,
  Wind,
  Sun,
  Flower2,
  Droplets,
  Flame,
  HeartPulse,
  Info,
  CheckCircle2,
  Sparkles,
  ExternalLink
} from 'lucide-react';

const treatments = [
  {
    id: 'yoga',
    title: 'Yoga',
    icon: <Flame className="text-orange-500" />,
    category: 'Mind-Body Practice',
    categoryColor: 'text-orange-500',
    description: 'An ancient mind-body system combining physical postures, breathing, and meditation to promote holistic well-being.',
    detail: 'Regular yoga practice has been shown to reduce cortisol levels, alleviate symptoms of anxiety and depression, and improve overall emotional regulation through controlled breathwork and mindful movement.',
    traits: ['Stress Reduction', 'Flexibility & Strength', 'Breath Awareness', 'Emotional Balance'],
    benefit: 'Reduces anxiety and depressive symptoms by harmonizing the nervous system and fostering present-moment awareness.',
    learnUrl: 'https://www.healthline.com/nutrition/13-benefits-of-yoga'
  },
  {
    id: 'meditation',
    title: 'Meditation',
    icon: <Sparkles className="text-violet-500" />,
    category: 'Mindfulness Practice',
    categoryColor: 'text-violet-500',
    description: 'A practice of focused attention and awareness that trains the mind to achieve mental clarity and emotional calm.',
    detail: 'Meditation techniques — including mindfulness, loving-kindness, and body scan — have robust clinical evidence supporting their role in reducing stress, improving focus, and managing chronic pain.',
    traits: ['Focused Attention', 'Emotional Regulation', 'Reduced Rumination', 'Improved Sleep'],
    benefit: 'Rewires stress-response pathways in the brain, leading to lasting reductions in anxiety, depression, and reactivity.',
    learnUrl: 'https://www.mindful.org/meditation/mindfulness-getting-started/'
  },
  {
    id: 'naturopathy',
    title: 'Naturopathy',
    icon: <Leaf className="text-emerald-500" />,
    category: 'Holistic Medicine',
    categoryColor: 'text-emerald-500',
    description: "A system of medicine that uses natural remedies — including herbs, nutrition, and lifestyle adjustments — to support the body's self-healing ability.",
    detail: 'Naturopathy addresses mental health through nutritional therapy, adaptogenic herbs (like ashwagandha and rhodiola), and gut-brain axis support, complementing conventional care.',
    traits: ['Herbal Medicine', 'Nutritional Therapy', 'Gut-Brain Health', 'Lifestyle Counseling'],
    benefit: 'Supports mental wellness by addressing physiological root causes such as nutrient deficiencies, inflammation, and hormonal imbalances.',
    learnUrl: 'https://www.webmd.com/balance/guide/what-is-naturopathic-medicine'
  },
  {
    id: 'breathwork',
    title: 'Breathwork',
    icon: <Wind className="text-sky-500" />,
    category: 'Somatic Practice',
    categoryColor: 'text-sky-500',
    description: 'Intentional breathing techniques that activate the parasympathetic nervous system to reduce stress and regulate emotions.',
    detail: 'Techniques like box breathing, 4-7-8 breathing, and diaphragmatic breathing are evidence-backed for calming the fight-or-flight response and improving heart rate variability.',
    traits: ['Nervous System Regulation', 'Anxiety Relief', 'Grounding', 'Focus Enhancement'],
    benefit: 'Rapidly lowers acute stress and anxiety by directly modulating the autonomic nervous system through breath.',
    learnUrl: 'https://www.healthline.com/health/breathwork'
  },
  {
    id: 'hydrotherapy',
    title: 'Hydrotherapy',
    icon: <Droplets className="text-blue-500" />,
    category: 'Naturopathic Technique',
    categoryColor: 'text-blue-500',
    description: 'The therapeutic use of water in various forms — hot, cold, steam, or ice — to improve circulation and relieve stress.',
    detail: 'Cold immersion and contrast showers have been studied for their mood-boosting effects, linked to increased norepinephrine and endorphin release, which can ease depressive symptoms.',
    traits: ['Circulation Boost', 'Mood Elevation', 'Muscle Relaxation', 'Detoxification'],
    benefit: 'Naturally elevates mood and energy by stimulating neurotransmitter activity through thermal contrast.',
    learnUrl: 'https://www.healthline.com/health/hydrotherapy'
  },
  {
    id: 'suntherapy',
    title: 'Light & Nature Therapy',
    icon: <Sun className="text-amber-500" />,
    category: 'Environmental Medicine',
    categoryColor: 'text-amber-500',
    description: 'Leveraging exposure to natural sunlight and outdoor environments (forest bathing, ecotherapy) to improve mental health.',
    detail: 'Sunlight exposure regulates circadian rhythms and serotonin production. Nature immersion (Shinrin-yoku) reduces cortisol, blood pressure, and symptoms of anxiety and depression.',
    traits: ['Vitamin D Synthesis', 'Circadian Alignment', 'Serotonin Boost', 'Stress Cortisol Reduction'],
    benefit: 'Restores hormonal balance and mood stability by reconnecting the body with natural light and green environments.',
    learnUrl: 'https://www.mayoclinic.org/tests-procedures/light-therapy/about/pac-20384604'
  },
  {
    id: 'aromatherapy',
    title: 'Aromatherapy',
    icon: <Flower2 className="text-pink-500" />,
    category: 'Sensory Therapy',
    categoryColor: 'text-pink-500',
    description: 'The use of plant-derived essential oils through inhalation or topical application to influence mood and well-being.',
    detail: 'Lavender, chamomile, bergamot, and frankincense oils have clinical evidence supporting their anxiolytic and antidepressant properties via the olfactory-limbic system connection.',
    traits: ['Anxiety Relief', 'Sleep Improvement', 'Mood Uplift', 'Relaxation Response'],
    benefit: 'Triggers calming neurological responses via the olfactory system, reducing anxiety and promoting restful sleep.',
    learnUrl: 'https://www.healthline.com/health/what-is-aromatherapy'
  }
];

const NaturalTreatments = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in duration-700 pb-20">

      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-widest mb-2">
          <Leaf size={12} /> Holistic Wellness
        </div>
        <h2 className="text-4xl font-display font-bold text-slate-900 dark:text-white">Natural Treatments</h2>
        <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
          Explore evidence-informed natural and holistic approaches — from yoga and meditation to naturopathy — that complement mental health care and promote whole-person well-being.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {treatments.map((treatment) => (
          <motion.div
            key={treatment.id}
            whileHover={{ y: -6 }}
            className="card glass flex flex-col p-8 hover:border-emerald-400 dark:hover:border-emerald-600 transition-all group overflow-hidden relative h-full"
          >
            {/* Background icon */}
            <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity">
              {React.cloneElement(treatment.icon, { size: 120 })}
            </div>

            {/* Icon */}
            <div className="w-14 h-14 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm">
              {React.cloneElement(treatment.icon, { size: 30 })}
            </div>

            {/* Title & description */}
            <div className="space-y-2 mb-6 relative z-10">
              <span className={`text-[10px] font-bold uppercase tracking-widest ${treatment.categoryColor}`}>
                {treatment.category}
              </span>
              <h3 className="text-2xl font-bold font-display text-slate-900 dark:text-white leading-tight">
                {treatment.title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed italic">
                {treatment.description}
              </p>
            </div>

            {/* Detail box */}
            <div className="space-y-6 flex-1 relative z-10">
              <div className="p-4 bg-emerald-50/50 dark:bg-emerald-900/10 rounded-xl border border-emerald-100/50 dark:border-emerald-800/30">
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  {treatment.detail}
                </p>
              </div>

              {/* Traits */}
              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 mb-3 ml-1">Key Benefits</h4>
                <div className="flex flex-wrap gap-2">
                  {treatment.traits.map((trait, i) => (
                    <span key={i} className="px-2 py-1 rounded-md bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-[10px] font-bold text-slate-500 dark:text-slate-400">
                      {trait}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 space-y-4 relative z-10">
              <div className="flex items-start gap-2">
                <HeartPulse size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-emerald-600 font-bold text-xs uppercase tracking-widest">Wellness Benefit: </span>
                  <span className="text-slate-500 dark:text-slate-400 text-xs font-medium">{treatment.benefit}</span>
                </div>
              </div>
              <a
                href={treatment.learnUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors group/link"
              >
                <ExternalLink size={12} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                Know More
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Summary banner */}
      <div className="bg-linear-to-br from-emerald-900 to-teal-900 dark:from-emerald-950 dark:to-teal-950 rounded-3xl p-10 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute right-0 bottom-0 opacity-10">
          <Leaf size={300} />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
          <div className="w-20 h-20 rounded-full bg-emerald-600 flex items-center justify-center shrink-0 animate-pulse">
            <Leaf size={40} />
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl font-bold font-display">Why Natural Treatments Work</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 font-bold text-emerald-400 uppercase text-xs tracking-widest">
                  <CheckCircle2 size={14} /> Holistic
                </div>
                <p className="text-sm text-slate-300">Address mental health at physical, emotional, and lifestyle levels rather than symptoms alone.</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 font-bold text-teal-400 uppercase text-xs tracking-widest">
                  <Sparkles size={14} /> Complementary
                </div>
                <p className="text-sm text-slate-300">Work alongside conventional therapies and medication to enhance overall outcomes.</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 font-bold text-amber-400 uppercase text-xs tracking-widest">
                  <Sun size={14} /> Sustainable
                </div>
                <p className="text-sm text-slate-300">Empower long-term self-care habits that build resilience and reduce relapse.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="flex items-center gap-4 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-800">
        <Info className="text-blue-500 shrink-0" size={24} />
        <p className="text-sm text-blue-700 dark:text-blue-300 leading-relaxed">
          <strong>Note:</strong> Natural treatments are intended to complement — not replace — professional mental health care. Always consult a licensed healthcare provider before starting any new therapeutic regimen, especially if you are on medication or managing a diagnosed condition.
        </p>
      </div>
    </div>
  );
};

export default NaturalTreatments;
