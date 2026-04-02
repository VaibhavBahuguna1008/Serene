import React from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Brain,
  ShieldCheck,
  Zap,
  Target,
  Activity,
  CheckCircle2,
  Info,
  HeartPulse,
  Scale,
  Sparkles,
  Compass,
  Eye,
  Heart,
  Layers,
  ExternalLink,
  Cpu,
  ScanLine,
  Radiation,
  Magnet,
  Pill,
  Microscope,
  FlaskConical,
  Dna,
  AlertTriangle
} from 'lucide-react';

const therapies = [
  {
    id: 'dbt',
    title: 'Dialectical Behavior Therapy (DBT)',
    icon: <ShieldCheck className="text-emerald-500" />,
    description: 'A subtype of CBT that focuses on emotional regulation, distress tolerance, and interpersonal effectiveness.',
    detail: 'DBT is highly effective for severe emotional instability and was originally developed to treat borderline personality disorder.',
    traits: ['Emotional Regulation', 'Distress Tolerance', 'Interpersonal Effectiveness'],
    benefit: 'Helps manage extreme emotional fluctuations and improve relationship stability.',
    learnUrl: 'https://www.dbtselfhelp.com/'
  },
  {
    id: 'rebt',
    title: 'Rational Emotive Behavior Therapy (REBT)',
    icon: <Scale className="text-amber-500" />,
    description: 'A proactive approach focusing on identifying and challenging irrational beliefs that lead to emotional distress.',
    detail: 'REBT helps individuals replace self-defeating thoughts with more realistic and helpful versions.',
    traits: ['Identifying Irrational Beliefs', 'Thought Reframing', 'Proactive Problem Solving'],
    benefit: 'Reduces emotional distress by changing the underlying belief patterns behind feelings.',
    learnUrl: 'https://www.albertellis.org/rebt-in-a-nutshell'
  },
  {
    id: 'mbct',
    title: 'Mindfulness-Based Cognitive Therapy (MBCT)',
    icon: <Sparkles className="text-blue-500" />,
    description: 'Combines CBT techniques with mindfulness strategies and meditation.',
    detail: 'Originally designed to prevent relapse in depression, it helps users become more aware of negative thought cycles.',
    traits: ['Mindfulness Strategies', 'Meditation Practices', 'Cognitive Awareness'],
    benefit: 'Prevents recurrence of depressive episodes by fostering present-moment awareness.',
    learnUrl: 'https://www.mindfulnessstudies.com/mindfulness-based-cognitive-therapy/'
  },
  {
    id: 'act',
    title: 'Acceptance & Commitment Therapy (ACT)',
    icon: <Compass className="text-teal-500" />,
    description: 'Teaches psychological flexibility by accepting difficult thoughts and committing to values-based action.',
    detail: 'ACT uses mindfulness and acceptance strategies alongside behavioral change techniques, helping people live a meaningful life despite pain or anxiety.',
    traits: ['Psychological Flexibility', 'Values Clarification', 'Defusion Techniques', 'Committed Action'],
    benefit: 'Builds resilience by changing your relationship with difficult thoughts rather than fighting them.',
    learnUrl: 'https://contextualscience.org/act'
  },
  {
    id: 'emdr',
    title: 'Eye Movement Desensitization & Reprocessing (EMDR)',
    icon: <Eye className="text-purple-500" />,
    description: 'A trauma-focused therapy that uses bilateral stimulation to help the brain reprocess distressing memories.',
    detail: 'EMDR is a WHO-recommended treatment for PTSD. It uses guided eye movements or taps while recalling traumatic events, enabling adaptive memory processing.',
    traits: ['Trauma Processing', 'Bilateral Stimulation', 'Memory Reprocessing', 'PTSD Relief'],
    benefit: 'Rapidly reduces the emotional charge of traumatic memories, alleviating PTSD and related symptoms.',
    learnUrl: 'https://www.emdr.com/what-is-emdr/'
  },
  {
    id: 'cft',
    title: 'Compassion-Focused Therapy (CFT)',
    icon: <Heart className="text-rose-500" />,
    description: 'Integrates CBT with compassion and mindfulness to help people who struggle with shame and self-criticism.',
    detail: "Developed by Paul Gilbert, CFT activates the brain's self-soothing system by cultivating compassion for oneself and others, particularly effective for high shame and self-criticism.",
    traits: ['Self-Compassion', 'Shame Reduction', 'Inner Critic Work', 'Emotional Warmth'],
    benefit: 'Reduces self-critical thinking and shame by building a compassionate inner voice and secure emotional foundation.',
    learnUrl: 'https://www.compassionatemind.co.uk/about-cft'
  },
  {
    id: 'schema',
    title: 'Schema Therapy',
    icon: <Layers className="text-orange-500" />,
    description: 'Identifies and heals deep-seated emotional patterns (schemas) formed in childhood that drive dysfunction.',
    detail: 'Schema Therapy integrates elements of CBT, attachment theory, and Gestalt therapy. It targets 18 early maladaptive schemas — such as abandonment or defectiveness — through a strong therapeutic relationship.',
    traits: ['Early Schema Identification', 'Mode Work', 'Childhood Pattern Healing', 'Reparenting'],
    benefit: 'Breaks long-standing dysfunctional life patterns by healing their emotional root causes from early experience.',
    learnUrl: 'https://www.schematherapy.com/'
  },
  {
    id: 'erp',
    title: 'Exposure and Response Prevention (ERP)',
    icon: <Target className="text-red-500" />,
    description: 'A specialized behavioral therapy that helps individuals face fears (exposure) and break compulsive patterns.',
    detail: 'The gold standard for treating OCD, it involves gradual exposure to triggers without performing compulsions.',
    traits: ['Gradual Exposure', 'Response Prevention', 'Fear Habituation'],
    benefit: 'Weakens the power of obsessive thoughts and reduces compulsive behaviors over time.',
    learnUrl: 'https://iocdf.org/about-ocd/treatment/erp/'
  },
  {
    id: 'psychodynamic',
    title: 'Psychodynamic Therapy',
    icon: <Brain className="text-indigo-500" />,
    description: 'Explores how unconscious processes and past experiences shape current thoughts, feelings, and behavior.',
    detail: 'Rooted in Freudian theory but evolved significantly, psychodynamic therapy helps clients gain insight into recurring patterns, unresolved conflicts, and the influence of early relationships on present functioning.',
    traits: ['Unconscious Exploration', 'Insight Development', 'Relational Patterns', 'Defense Mechanisms'],
    benefit: 'Creates deep, lasting change by uncovering and resolving the unconscious drivers of distress and behavior.',
    learnUrl: 'https://www.psychologytoday.com/us/therapy-types/psychodynamic-therapy'
  },
  {
    id: 'cat',
    title: 'Cognitive Analytic Therapy (CAT)',
    icon: <Activity className="text-cyan-500" />,
    description: 'Combines cognitive and psychoanalytic approaches, focusing on past experiences and behavior change.',
    detail: 'Takes a time-limited approach to identifying how childhood patterns influence current relational difficulties.',
    traits: ['Past-Present Mapping', 'Relational Patterns', 'Collaborative Goal Setting'],
    benefit: 'Helps identify and alter destructive patterns of behavior by understanding their origins.',
    learnUrl: 'https://www.acat.me.uk/page/what-is-cat'
  },
  {
    id: 'ifs',
    title: 'Internal Family Systems (IFS)',
    icon: <Users className="text-teal-600" />,
    description: 'Focuses on understanding the different "parts" of the self to foster self-awareness and healing.',
    detail: 'IFS views the mind as a system of diverse sub-personalities (parts) led by a core Healthy Self.',
    traits: ['Parts Work', 'Self-Awareness', 'Internal Harmony'],
    benefit: 'Creates internal peace by healing wounded parts and restoring the core Self as the leader.',
    learnUrl: 'https://ifs-institute.com/resources/articles'
  },
  {
    id: 'somatic',
    title: 'Somatic Therapy',
    icon: <Zap className="text-yellow-500" />,
    description: 'A body-centered approach that addresses how trauma and stress are stored in the body, not just the mind.',
    detail: 'Somatic therapies (including Somatic Experiencing and Sensorimotor Psychotherapy) work with bodily sensations, posture, and movement to release trauma stored in the nervous system.',
    traits: ['Body Awareness', 'Trauma Release', 'Nervous System Regulation', 'Grounding'],
    benefit: 'Releases trauma held in the body, resolving symptoms that talk-based therapies alone may not reach.',
    learnUrl: 'https://www.healthline.com/health/somatic-therapy'
  }
];

const advancedTreatments = [
  {
    id: 'ect',
    title: 'Electroconvulsive Therapy (ECT)',
    icon: <Zap className="text-yellow-400" />,
    badge: 'Neurostimulation',
    badgeColor: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20',
    accentColor: 'border-yellow-500/30 bg-yellow-50/50 dark:bg-yellow-900/10',
    description: 'A medically supervised procedure that delivers brief electrical stimulation to the brain under general anesthesia to treat severe psychiatric conditions.',
    howItWorks: 'ECT induces a controlled seizure that resets aberrant neural circuits. Modern ECT is safe, precise, and performed 2–3 times per week. It is one of the fastest-acting treatments for severe, treatment-resistant depression.',
    usedFor: ['Severe Treatment-Resistant Depression', 'Bipolar Disorder (Manic Episodes)', 'Severe Catatonia', 'Acute Suicidality'],
    stats: [
      { label: 'Response Rate', value: '70–90%' },
      { label: 'Sessions', value: '6–12 avg.' },
      { label: 'Onset', value: '1–2 weeks' }
    ],
    learnUrl: 'https://www.mayoclinic.org/tests-procedures/electroconvulsive-therapy/about/pac-20393894'
  },
  {
    id: 'tms',
    title: 'Transcranial Magnetic Stimulation (TMS)',
    icon: <Magnet className="text-blue-500" />,
    badge: 'Non-Invasive Brain Stimulation',
    badgeColor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
    accentColor: 'border-blue-500/30 bg-blue-50/50 dark:bg-blue-900/10',
    description: 'A non-invasive procedure that uses magnetic fields to stimulate specific nerve cells in the brain, primarily targeting the prefrontal cortex.',
    howItWorks: 'An electromagnetic coil is placed against the scalp and delivers magnetic pulses that modulate neuronal activity. FDA-approved for major depression, OCD, and smoking cessation. No anesthesia required.',
    usedFor: ['Major Depressive Disorder', 'OCD', 'PTSD', 'Anxiety Disorders', 'Smoking Cessation'],
    stats: [
      { label: 'Response Rate', value: '50–60%' },
      { label: 'Sessions', value: '20–36 avg.' },
      { label: 'Session Length', value: '20–40 min' }
    ],
    learnUrl: 'https://www.mayoclinic.org/tests-procedures/transcranial-magnetic-stimulation/about/pac-20384625'
  },
  {
    id: 'mri',
    title: 'Functional MRI (fMRI) & Brain Imaging',
    icon: <ScanLine className="text-violet-500" />,
    badge: 'Neuroimaging',
    badgeColor: 'bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20',
    accentColor: 'border-violet-500/30 bg-violet-50/50 dark:bg-violet-900/10',
    description: 'Advanced brain imaging that maps neural activity and structure to diagnose, research, and guide treatment for mental health conditions.',
    howItWorks: 'Structural MRI reveals brain anatomy and detects abnormalities (atrophy, lesions). Functional MRI (fMRI) measures blood-oxygen-level-dependent (BOLD) signals to identify which brain regions are active during tasks or at rest, helping map conditions like depression and schizophrenia.',
    usedFor: ['Diagnostic Evaluation', 'Treatment Planning', 'Research Biomarkers', 'TMS Target Localization', 'Psychosis Assessment'],
    stats: [
      { label: 'Resolution', value: '~1 mm' },
      { label: 'Radiation', value: 'None' },
      { label: 'Scan Time', value: '30–90 min' }
    ],
    learnUrl: 'https://www.nibib.nih.gov/science-education/science-topics/magnetic-resonance-imaging-mri'
  },
  {
    id: 'pet',
    title: 'PET Scan (Positron Emission Tomography)',
    icon: <Radiation className="text-orange-500" />,
    badge: 'Nuclear Neuroimaging',
    badgeColor: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20',
    accentColor: 'border-orange-500/30 bg-orange-50/50 dark:bg-orange-900/10',
    description: 'A nuclear imaging technique that visualizes metabolic activity, neurotransmitter levels, and receptor density in the living brain.',
    howItWorks: 'A radioactive tracer is injected and emits positrons detected by the scanner. PET can map serotonin, dopamine, and glutamate systems — key in depression, schizophrenia, and addiction — providing a biochemical picture unavailable from MRI alone.',
    usedFor: ['Neurotransmitter Mapping', 'Alzheimer\'s & Dementia Diagnosis', 'Treatment Response Monitoring', 'Addiction Research', 'Schizophrenia Profiling'],
    stats: [
      { label: 'Tracer Half-life', value: '2–110 min' },
      { label: 'Scan Time', value: '30–60 min' },
      { label: 'Sensitivity', value: 'Picomolar' }
    ],
    learnUrl: 'https://www.radiologyinfo.org/en/info/pet-scan'
  },
  {
    id: 'dbs',
    title: 'Deep Brain Stimulation (DBS)',
    icon: <Cpu className="text-cyan-500" />,
    badge: 'Surgical Neurostimulation',
    badgeColor: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20',
    accentColor: 'border-cyan-500/30 bg-cyan-50/50 dark:bg-cyan-900/10',
    description: 'A surgical procedure implanting electrodes in specific brain regions to deliver continuous electrical stimulation for treatment-resistant conditions.',
    howItWorks: 'Electrodes are surgically implanted in targets such as the subgenual cingulate cortex (Area 25) or nucleus accumbens. A pulse generator under the skin delivers adjustable stimulation, modulating dysfunctional circuits. Under clinical investigation for severe depression and OCD.',
    usedFor: ["Treatment-Resistant Depression", "OCD (FDA Humanitarian Device)", "Parkinson's Disease", 'Tourette Syndrome', 'Chronic Pain'],
    stats: [
      { label: 'Approach', value: 'Surgical' },
      { label: 'Adjustable', value: 'Yes' },
      { label: 'Reversible', value: 'Partially' }
    ],
    learnUrl: 'https://www.mayoclinic.org/tests-procedures/deep-brain-stimulation/about/pac-20384562'
  },
  {
    id: 'ketamine',
    title: 'Ketamine & Esketamine (Spravato)',
    icon: <FlaskConical className="text-pink-500" />,
    badge: 'Rapid-Acting Pharmacotherapy',
    badgeColor: 'bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20',
    accentColor: 'border-pink-500/30 bg-pink-50/50 dark:bg-pink-900/10',
    description: 'An NMDA receptor antagonist that produces rapid antidepressant effects within hours, revolutionizing treatment-resistant depression care.',
    howItWorks: 'Unlike traditional antidepressants targeting serotonin, ketamine blocks NMDA glutamate receptors, triggering rapid synaptic plasticity and BDNF release. Esketamine (Spravato) is FDA-approved as an intranasal formulation for treatment-resistant depression and suicidal ideation.',
    usedFor: ['Treatment-Resistant Depression', 'Acute Suicidal Ideation', 'Bipolar Depression', 'PTSD (Investigational)', 'Chronic Pain'],
    stats: [
      { label: 'Onset', value: 'Hours' },
      { label: 'FDA Status', value: 'Approved (TRD)' },
      { label: 'Duration', value: 'Days–weeks' }
    ],
    learnUrl: 'https://www.psychiatry.org/patients-families/depression/esketamine'
  },
  {
    id: 'pharmacogenomics',
    title: 'Pharmacogenomic Testing',
    icon: <Dna className="text-emerald-500" />,
    badge: 'Precision Psychiatry',
    badgeColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    accentColor: 'border-emerald-500/30 bg-emerald-50/50 dark:bg-emerald-900/10',
    description: 'Genetic testing that analyzes how an individual\'s DNA affects their response to psychiatric medications to guide personalized prescribing.',
    howItWorks: 'A saliva or blood sample is analyzed for variants in genes like CYP2D6, CYP2C19, and SLC6A4 that affect drug metabolism and receptor sensitivity. Results help psychiatrists predict which antidepressants, antipsychotics, or mood stabilizers will be effective with fewer side effects.',
    usedFor: ['Antidepressant Selection', 'Antipsychotic Dosing', 'Mood Stabilizer Optimization', 'Side Effect Prediction', 'Treatment-Resistant Cases'],
    stats: [
      { label: 'Sample', value: 'Saliva/Blood' },
      { label: 'Turnaround', value: '5–14 days' },
      { label: 'Genes Tested', value: '10–25+' }
    ],
    learnUrl: 'https://www.mayoclinic.org/tests-procedures/pharmacogenomics/about/pac-20393982'
  },
  {
    id: 'neurofeedback',
    title: 'Neurofeedback (EEG Biofeedback)',
    icon: <Microscope className="text-indigo-500" />,
    badge: 'Brain Training',
    badgeColor: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20',
    accentColor: 'border-indigo-500/30 bg-indigo-50/50 dark:bg-indigo-900/10',
    description: 'A real-time EEG-based technique that trains individuals to self-regulate their brainwave patterns to improve mental health outcomes.',
    howItWorks: 'Electrodes measure brainwave activity (alpha, beta, theta waves). Visual or audio feedback is provided when the brain produces desired patterns. Over sessions, the brain learns to self-regulate, reducing symptoms of ADHD, anxiety, PTSD, and sleep disorders through neuroplasticity.',
    usedFor: ['ADHD', 'Anxiety & Panic Disorder', 'PTSD', 'Sleep Disorders', 'Peak Performance'],
    stats: [
      { label: 'Sessions', value: '20–40 avg.' },
      { label: 'Invasive', value: 'No' },
      { label: 'Session Length', value: '30–60 min' }
    ],
    learnUrl: 'https://www.psychologytoday.com/us/therapy-types/neurofeedback'
  },
  {
    id: 'psychedelics',
    title: 'Psychedelic-Assisted Therapy (PAT)',
    icon: <Pill className="text-fuchsia-500" />,
    badge: 'Emerging Clinical Research',
    badgeColor: 'bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-400 border-fuchsia-500/20',
    accentColor: 'border-fuchsia-500/30 bg-fuchsia-50/50 dark:bg-fuchsia-900/10',
    description: 'A psychotherapy model in which controlled doses of psychedelic substances (psilocybin, MDMA) are combined with structured psychotherapy sessions.',
    howItWorks: 'Under clinical supervision, substances like psilocybin (for depression) or MDMA (for PTSD) produce altered states that enhance neuroplasticity and therapeutic processing. Sessions involve preparation, the drug experience, and integration therapy. MDMA-assisted therapy for PTSD is in Phase 3 FDA trials.',
    usedFor: ['Treatment-Resistant Depression', 'PTSD', 'End-of-Life Anxiety', 'Addiction', 'Existential Distress'],
    stats: [
      { label: 'FDA Status', value: 'Breakthrough (MDMA, Psilocybin)' },
      { label: 'Sessions', value: '2–3 (drug)' },
      { label: 'Setting', value: 'Clinical Only' }
    ],
    learnUrl: 'https://www.nimh.nih.gov/health/topics/mental-health-medications/index.shtml'
  }
];

const TherapyTypes = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-16 animate-in fade-in duration-700 pb-20">

      {/* ── Section 1: Psychotherapy ── */}
      <div className="space-y-10">
        <div className="text-center space-y-3">
          <h2 className="text-4xl font-display font-bold text-slate-900 dark:text-white">Professional Therapy Types</h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            Explore evidence-based therapeutic approaches designed to foster resilience, emotional stability, and self-understanding.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {therapies.map((therapy) => (
            <motion.div
              key={therapy.id}
              whileHover={{ y: -6 }}
              className="card glass flex flex-col p-8 hover:border-primary-400 dark:hover:border-primary-600 transition-all group overflow-hidden relative h-full"
            >
              <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity">
                {React.cloneElement(therapy.icon, { size: 120 })}
              </div>

              <div className="w-14 h-14 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm">
                {React.cloneElement(therapy.icon, { size: 30 })}
              </div>

              <div className="space-y-3 mb-6 relative z-10">
                <h3 className="text-2xl font-bold font-display text-slate-900 dark:text-white leading-tight">
                  {therapy.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed italic">
                  {therapy.description}
                </p>
              </div>

              <div className="space-y-6 flex-1 relative z-10">
                <div className="p-4 bg-primary-50/50 dark:bg-primary-900/10 rounded-xl border border-primary-100/50 dark:border-primary-800/30">
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    {therapy.detail}
                  </p>
                </div>

                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-primary-600 mb-3 ml-1">Key Focus Areas</h4>
                  <div className="flex flex-wrap gap-2">
                    {therapy.traits.map((trait, i) => (
                      <span key={i} className="px-2 py-1 rounded-md bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-[10px] font-bold text-slate-500 dark:text-slate-400">
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 space-y-4 relative z-10">
                <div className="flex items-center gap-2 text-primary-600 font-bold text-xs uppercase tracking-widest">
                  <HeartPulse size={14} /> Clinical Benefit: <span className="text-slate-500 dark:text-slate-400 capitalize font-medium normal-case tracking-normal ml-auto">{therapy.benefit}</span>
                </div>
                <a
                  href={therapy.learnUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors group/link"
                >
                  <ExternalLink size={12} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                  Know More
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="bg-slate-900 dark:bg-slate-950 rounded-3xl p-10 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute right-0 bottom-0 opacity-10">
            <Brain size={300} />
          </div>
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
            <div className="w-20 h-20 rounded-full bg-primary-600 flex items-center justify-center shrink-0 animate-pulse">
              <ShieldCheck size={40} />
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-bold font-display">Common Characteristics of These Therapies</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 font-bold text-primary-400 uppercase text-xs tracking-widest">
                    <Target size={14} /> Structured
                  </div>
                  <p className="text-sm text-slate-300">Often involve a set agenda and pre-planned sessions to ensure focused progress.</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 font-bold text-emerald-400 uppercase text-xs tracking-widest">
                    <CheckCircle2 size={14} /> Goal-Oriented
                  </div>
                  <p className="text-sm text-slate-300">Focused on solving specific problems and improving coping skills through homework tasks.</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 font-bold text-amber-400 uppercase text-xs tracking-widest">
                    <Sparkles size={14} /> Evidence-Based
                  </div>
                  <p className="text-sm text-slate-300">Rigorously tested and scientifically proven to be effective for specific mental health conditions.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="flex items-center gap-4">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-700 to-transparent" />
        <span className="text-xs font-bold uppercase tracking-widest text-slate-400 px-2">Advanced & Scientific Treatments</span>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-700 to-transparent" />
      </div>

      {/* ── Section 2: Advanced Scientific Treatments ── */}
      <div className="space-y-10">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-50 dark:bg-violet-900/20 border border-violet-100 dark:border-violet-800 text-violet-600 dark:text-violet-400 text-xs font-bold uppercase tracking-widest mb-2">
            <Cpu size={12} /> Neuroscience & Biomedical
          </div>
          <h2 className="text-4xl font-display font-bold text-slate-900 dark:text-white">Advanced Scientific Treatments</h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            Cutting-edge biomedical and neuroscientific interventions — from brain stimulation and neuroimaging to precision pharmacology — reshaping the frontier of mental health care.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {advancedTreatments.map((t) => (
            <motion.div
              key={t.id}
              whileHover={{ y: -6 }}
              className="card glass flex flex-col p-8 hover:border-violet-400 dark:hover:border-violet-600 transition-all group overflow-hidden relative h-full"
            >
              {/* Background watermark */}
              <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity">
                {React.cloneElement(t.icon, { size: 120 })}
              </div>

              {/* Icon + badge */}
              <div className="flex items-start justify-between mb-6">
                <div className="w-14 h-14 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                  {React.cloneElement(t.icon, { size: 30 })}
                </div>
                <span className={`text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border ${t.badgeColor}`}>
                  {t.badge}
                </span>
              </div>

              {/* Title & description */}
              <div className="space-y-2 mb-6 relative z-10">
                <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white leading-tight">
                  {t.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed italic">
                  {t.description}
                </p>
              </div>

              {/* How it works */}
              <div className="space-y-6 flex-1 relative z-10">
                <div className={`p-4 rounded-xl border ${t.accentColor}`}>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2">How It Works</p>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    {t.howItWorks}
                  </p>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-2">
                  {t.stats.map((s, i) => (
                    <div key={i} className="text-center p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700">
                      <p className="text-[11px] font-bold text-slate-800 dark:text-white leading-tight">{s.value}</p>
                      <p className="text-[9px] text-slate-400 uppercase tracking-wider mt-0.5">{s.label}</p>
                    </div>
                  ))}
                </div>

                {/* Used for */}
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-violet-600 dark:text-violet-400 mb-3 ml-1">Used For</h4>
                  <div className="flex flex-wrap gap-2">
                    {t.usedFor.map((use, i) => (
                      <span key={i} className="px-2 py-1 rounded-md bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-[10px] font-bold text-slate-500 dark:text-slate-400">
                        {use}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Know More */}
              <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 relative z-10">
                <a
                  href={t.learnUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 transition-colors group/link"
                >
                  <ExternalLink size={12} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                  Know More
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Advanced treatments disclaimer */}
        <div className="flex items-start gap-4 p-6 bg-amber-50 dark:bg-amber-900/20 rounded-2xl border border-amber-100 dark:border-amber-800">
          <AlertTriangle className="text-amber-500 shrink-0 mt-0.5" size={22} />
          <p className="text-sm text-amber-700 dark:text-amber-300 leading-relaxed">
            <strong>Important:</strong> Advanced scientific treatments such as ECT, TMS, DBS, and ketamine therapy must only be administered by licensed medical professionals in certified clinical settings. Some treatments listed (e.g., psychedelic-assisted therapy) are still under active clinical investigation and may not yet be broadly available.
          </p>
        </div>
      </div>

      {/* General disclaimer */}
      <div className="flex items-center gap-4 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-800">
        <Info className="text-blue-500 shrink-0" size={24} />
        <p className="text-sm text-blue-700 dark:text-blue-300 leading-relaxed">
          <strong>Note:</strong> While these therapies are effective, they should be performed under the guidance of a licensed clinical professional. Serene provides this information for educational purposes to help you understand potential treatment paths.
        </p>
      </div>
    </div>
  );
};

export default TherapyTypes;
