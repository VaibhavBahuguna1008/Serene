import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import {
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  AlertTriangle,
  Info,
  ArrowRight,
} from 'lucide-react';

/* ─── Option sets ─────────────────────────────────────────────── */
const frequencyOptions = [
  { label: 'Not at all', value: 0 },
  { label: 'Several days', value: 1 },
  { label: 'More than half the days', value: 2 },
  { label: 'Nearly every day', value: 3 },
];

const yesNoOptions = [
  { label: 'Yes', value: 1 },
  { label: 'No', value: 0 },
];

/* ─── Assessment definitions ──────────────────────────────────── */
const assessments = [
  /* ── Stress & General Wellbeing ── */
  {
    id: 'pss10',
    name: 'PSS-10',
    fullName: 'Perceived Stress Scale',
    category: 'stress',
    questions: [
      'In the last month, how often have you been upset because of something that happened unexpectedly?',
      'In the last month, how often have you felt that you were unable to control the important things in your life?',
      'In the last month, how often have you felt nervous and stressed?',
      'In the last month, how often have you felt confident about your ability to handle your personal problems?',
      'In the last month, how often have you felt that things were going your way?',
      'In the last month, how often have you found that you could not cope with all the things that you had to do?',
      'In the last month, how often have you been able to control irritations in your life?',
      'In the last month, how often have you felt that you were on top of things?',
      'In the last month, how often have you been angered because of things that were outside of your control?',
      'In the last month, how often have you felt difficulties were piling up so high that you could not overcome them?',
    ],
    options: [
      { label: 'Never', value: 0 },
      { label: 'Almost never', value: 1 },
      { label: 'Sometimes', value: 2 },
      { label: 'Fairly often', value: 3 },
      { label: 'Very often', value: 4 },
    ],
    reverseItems: [3, 4, 6, 7],
    reverseMax: 4,
    description: 'Measures how often situations are appraised as stressful. Excellent for assessing burnout or daily overwhelm.',
    score: (t) =>
      t <= 13
        ? { severity: 'Low stress', color: 'text-emerald-500' }
        : t <= 26
        ? { severity: 'Moderate stress', color: 'text-amber-500' }
        : { severity: 'High stress', color: 'text-red-500' },
  },
  {
    id: 'dass21',
    name: 'DASS-21',
    fullName: 'Depression Anxiety Stress Scales',
    category: 'stress',
    questions: [
      'I found it hard to wind down',
      'I was aware of dryness of my mouth',
      'I couldn\'t seem to experience any positive feeling at all',
      'I experienced breathing difficulty',
      'I found it difficult to work up the initiative to do things',
      'I tended to over-react to situations',
      'I experienced trembling',
      'I felt that I was using a lot of nervous energy',
      'I was worried about situations in which I might panic and make a fool of myself',
      'I felt that I had nothing to look forward to',
      'I found myself getting agitated',
      'I found it difficult to relax',
      'I felt down-hearted and blue',
      'I was intolerant of anything that kept me from getting on with what I was doing',
      'I felt I was close to panic',
      'I was unable to become enthusiastic about anything',
      'I felt I wasn\'t worth much as a person',
      'I felt that I was rather touchy',
      'I was aware of the action of my heart in the absence of physical exertion',
      'I felt scared without any good reason',
      'I felt that life was meaningless',
    ],
    options: [
      { label: 'Never', value: 0 },
      { label: 'Sometimes', value: 1 },
      { label: 'Often', value: 2 },
      { label: 'Almost always', value: 3 },
    ],
    description: 'A 21-item tool assessing depression, anxiety, and stress — highly efficient for comprehensive screening.',
    score: (t) =>
      t <= 29
        ? { severity: 'Normal range', color: 'text-emerald-500' }
        : t <= 43
        ? { severity: 'Mild distress', color: 'text-yellow-500' }
        : t <= 59
        ? { severity: 'Moderate distress', color: 'text-orange-500' }
        : { severity: 'Severe distress', color: 'text-red-500' },
  },
  {
    id: 'k10',
    name: 'K10',
    fullName: 'Kessler Psychological Distress Scale',
    category: 'stress',
    questions: [
      'In the past 4 weeks, about how often did you feel tired out for no good reason?',
      'In the past 4 weeks, about how often did you feel nervous?',
      'In the past 4 weeks, about how often did you feel so nervous that nothing could calm you down?',
      'In the past 4 weeks, about how often did you feel hopeless?',
      'In the past 4 weeks, about how often did you feel restless or fidgety?',
      'In the past 4 weeks, about how often did you feel so restless that you could not sit still?',
      'In the past 4 weeks, about how often did you feel depressed?',
      'In the past 4 weeks, about how often did you feel that everything was an effort?',
      'In the past 4 weeks, about how often did you feel so sad that nothing could cheer you up?',
      'In the past 4 weeks, about how often did you feel worthless?',
    ],
    options: [
      { label: 'None of the time', value: 1 },
      { label: 'A little of the time', value: 2 },
      { label: 'Some of the time', value: 3 },
      { label: 'Most of the time', value: 4 },
      { label: 'All of the time', value: 5 },
    ],
    description: 'A 10-item questionnaire measuring distress level, frequently used to determine if professional help is needed.',
    score: (t) =>
      t <= 19
        ? { severity: 'Likely to be well', color: 'text-emerald-500' }
        : t <= 24
        ? { severity: 'Mild mental disorder likely', color: 'text-yellow-500' }
        : t <= 29
        ? { severity: 'Moderate mental disorder likely', color: 'text-orange-500' }
        : { severity: 'Severe mental disorder likely', color: 'text-red-500' },
  },

  /* ── Depression ── */
  {
    id: 'phq9',
    name: 'PHQ-9',
    fullName: 'Patient Health Questionnaire',
    category: 'depression',
    questions: [
      'Little interest or pleasure in doing things',
      'Feeling down, depressed, or hopeless',
      'Trouble falling or staying asleep, or sleeping too much',
      'Feeling tired or having little energy',
      'Poor appetite or overeating',
      'Feeling bad about yourself — or that you are a failure or have let yourself or your family down',
      'Trouble concentrating on things, such as reading or watching television',
      'Moving or speaking so slowly that other people could have noticed, or being so fidgety or restless that you have been moving around a lot more than usual',
      'Thoughts that you would be better off dead or of hurting yourself in some way',
    ],
    options: frequencyOptions,
    description: 'Standard 9-item questionnaire for depression screening and severity measurement.',
    score: (t) =>
      t <= 4
        ? { severity: 'Minimal depression', color: 'text-emerald-500' }
        : t <= 9
        ? { severity: 'Mild depression', color: 'text-yellow-500' }
        : t <= 14
        ? { severity: 'Moderate depression', color: 'text-amber-500' }
        : t <= 19
        ? { severity: 'Moderately severe depression', color: 'text-orange-500' }
        : { severity: 'Severe depression', color: 'text-red-500' },
  },

  /* ── Anxiety ── */
  {
    id: 'gad7',
    name: 'GAD-7',
    fullName: 'Generalized Anxiety Disorder',
    category: 'anxiety',
    questions: [
      'Feeling nervous, anxious or on edge',
      'Not being able to stop or control worrying',
      'Worrying too much about different things',
      'Trouble relaxing',
      'Being so restless that it is hard to sit still',
      'Becoming easily annoyed or irritable',
      'Feeling afraid as if something awful might happen',
    ],
    options: frequencyOptions,
    description: 'Standard 7-item questionnaire for anxiety screening and severity measurement.',
    score: (t) =>
      t <= 4
        ? { severity: 'Minimal anxiety', color: 'text-emerald-500' }
        : t <= 9
        ? { severity: 'Mild anxiety', color: 'text-yellow-500' }
        : t <= 14
        ? { severity: 'Moderate anxiety', color: 'text-amber-500' }
        : { severity: 'Severe anxiety', color: 'text-red-500' },
  },

  /* ── Trauma & PTSD ── */
  {
    id: 'pcl5',
    name: 'PCL-5',
    fullName: 'PTSD Checklist for DSM-5',
    category: 'trauma',
    questions: [
      'Repeated, disturbing, and unwanted memories of the stressful experience',
      'Repeated, disturbing dreams of the stressful experience',
      'Suddenly feeling or acting as if the stressful experience were actually happening again',
      'Feeling very upset when something reminded you of the stressful experience',
      'Having strong physical reactions when something reminded you of the stressful experience',
      'Avoiding internal reminders of the stressful experience (thoughts, feelings, or physical sensations)',
      'Avoiding external reminders of the stressful experience (people, places, conversations, activities, or situations)',
      'Trouble remembering important parts of the stressful experience',
      'Having strong negative beliefs about yourself, other people, or the world',
      'Blaming yourself or someone else for the stressful experience or what happened after it',
      'Having strong negative feelings such as fear, horror, anger, guilt, or shame',
      'Loss of interest in activities that you used to enjoy',
      'Feeling distant or cut off from other people',
      'Trouble experiencing positive feelings',
      'Irritable behavior, angry outbursts, or acting aggressively',
      'Taking too many risks or doing things that could cause you harm',
      'Being "superalert", watchful, or on guard',
      'Feeling jumpy or easily startled',
      'Having difficulty concentrating',
      'Trouble falling or staying asleep',
    ],
    options: [
      { label: 'Not at all', value: 0 },
      { label: 'A little bit', value: 1 },
      { label: 'Moderately', value: 2 },
      { label: 'Quite a bit', value: 3 },
      { label: 'Extremely', value: 4 },
    ],
    description: 'A 20-item checklist aligned with DSM-5 criteria, measuring PTSD symptom severity.',
    score: (t) =>
      t < 31
        ? { severity: 'Below PTSD threshold', color: 'text-emerald-500' }
        : t < 50
        ? { severity: 'Probable PTSD — moderate severity', color: 'text-orange-500' }
        : { severity: 'Probable PTSD — severe', color: 'text-red-500' },
  },
  {
    id: 'pcptsd',
    name: 'PC-PTSD',
    fullName: 'Primary Care PTSD Screen',
    category: 'trauma',
    questions: [
      'Have you had nightmares about a traumatic experience, or thought about it when you did not want to?',
      'Have you tried hard not to think about a traumatic experience, or gone out of your way to avoid situations that remind you of it?',
      'Have you been constantly on guard, watchful, or easily startled?',
      'Have you felt numb or detached from others, activities, or your surroundings?',
    ],
    options: yesNoOptions,
    description: 'A quick 4-item yes/no screen that acts as a first indicator for trauma and PTSD.',
    score: (t) =>
      t < 2
        ? { severity: 'Screen negative for PTSD', color: 'text-emerald-500' }
        : { severity: 'Screen positive — consider further evaluation', color: 'text-red-500' },
  },

  /* ── Mood Disorders ── */
  {
    id: 'mdq',
    name: 'MDQ',
    fullName: 'Mood Disorder Questionnaire',
    category: 'mood',
    questions: [
      'There was a period when you felt so good or so hyper that other people thought you were not your normal self, or you got into trouble',
      'You were so irritable that you shouted at people or started fights or arguments',
      'You felt much more self-confident than usual',
      'You got much less sleep than usual and found you didn\'t really miss it',
      'You were much more talkative or spoke much faster than usual',
      'Thoughts raced through your head or you couldn\'t slow your mind down',
      'You were so easily distracted that you had trouble concentrating or staying on track',
      'You had much more energy than usual',
      'You were much more active or did many more things than usual',
      'You were much more social or outgoing than usual',
      'You were much more interested in sex than usual',
      'You did things that were unusual for you or that other people might have seen as excessive, foolish, or risky',
      'Spending money got you or your family into trouble',
    ],
    options: yesNoOptions,
    description: 'Screens for bipolar spectrum disorder by asking about periods of elevated mood and energy.',
    score: (t) =>
      t < 7
        ? { severity: 'Unlikely bipolar disorder', color: 'text-emerald-500' }
        : { severity: 'Possible bipolar spectrum — further evaluation recommended', color: 'text-amber-500' },
  },
  {
    id: 'zfocs',
    name: 'ZF-OCS',
    fullName: 'Zohar-Fineberg OC Screen',
    category: 'mood',
    questions: [
      'Do you wash your hands more than 5 times a day, or for more than 3 minutes each time?',
      'Do you repeatedly check things that you have already done (e.g., locks, appliances, switches)?',
      'Do thoughts or images enter your mind that you find distressing and that you have difficulty getting rid of?',
      'Do you spend more than an hour a day doing something that you feel you must do even though it is not really necessary?',
      'Do you feel compelled to repeat certain actions or to perform certain routines or rituals?',
    ],
    options: yesNoOptions,
    description: 'A 5-item quick-screening tool for obsessive-compulsive disorder (OCD).',
    score: (t) =>
      t < 2
        ? { severity: 'Screen negative for OCD', color: 'text-emerald-500' }
        : { severity: 'OCD symptoms possible — further evaluation recommended', color: 'text-amber-500' },
  },

  /* ── Sleep & Substance Use ── */
  {
    id: 'isi',
    name: 'ISI',
    fullName: 'Insomnia Severity Index',
    category: 'sleep',
    questions: [
      'Please rate your difficulty falling asleep',
      'Please rate your difficulty staying asleep',
      'Please rate your problem waking up too early',
      'How satisfied/dissatisfied are you with your current sleep pattern?',
      'How noticeable to others do you think your sleep problem is in terms of impairing the quality of your life?',
      'How worried or distressed are you about your current sleep problem?',
      'To what extent do you consider your sleep problem to interfere with your daily functioning?',
    ],
    options: [
      { label: 'None / Not at all', value: 0 },
      { label: 'Mild', value: 1 },
      { label: 'Moderate', value: 2 },
      { label: 'Severe', value: 3 },
      { label: 'Very severe', value: 4 },
    ],
    description: 'A 7-item tool assessing the severity of nighttime insomnia and its impact on daily life.',
    score: (t) =>
      t <= 7
        ? { severity: 'No clinically significant insomnia', color: 'text-emerald-500' }
        : t <= 14
        ? { severity: 'Subthreshold insomnia', color: 'text-yellow-500' }
        : t <= 21
        ? { severity: 'Clinical insomnia — moderate severity', color: 'text-orange-500' }
        : { severity: 'Clinical insomnia — severe', color: 'text-red-500' },
  },
  {
    id: 'cage',
    name: 'CAGE',
    fullName: 'CAGE Questionnaire',
    category: 'sleep',
    questions: [
      'Have you ever felt you should Cut down on your drinking?',
      'Have people Annoyed you by criticizing your drinking?',
      'Have you ever felt bad or Guilty about your drinking?',
      'Have you ever had a drink first thing in the morning to steady your nerves or get rid of a hangover (Eye opener)?',
    ],
    options: yesNoOptions,
    description: 'A 4-item widely used tool for evaluating signs of substance abuse or dependency.',
    score: (t) =>
      t < 2
        ? { severity: 'Low risk of alcohol dependency', color: 'text-emerald-500' }
        : { severity: 'Clinically significant — consider seeking support', color: 'text-red-500' },
  },

  /* ── Specific Populations ── */
  {
    id: 'epds',
    name: 'EPDS',
    fullName: 'Edinburgh Postnatal Depression Scale',
    category: 'demographics',
    questions: [
      'I have been able to laugh and see the funny side of things',
      'I have looked forward with enjoyment to things',
      'I have blamed myself unnecessarily when things went wrong',
      'I have been anxious or worried for no good reason',
      'I have felt scared or panicky for no very good reason',
      'Things have been getting on top of me',
      'I have been so unhappy that I have had difficulty sleeping',
      'I have felt sad or miserable',
      'I have been so unhappy that I have been crying',
      'The thought of harming myself has occurred to me',
    ],
    options: frequencyOptions,
    description: 'A validated 10-item tool designed for identifying depression in mothers during pregnancy or after childbirth.',
    score: (t) =>
      t <= 9
        ? { severity: 'Low likelihood of depression', color: 'text-emerald-500' }
        : t <= 12
        ? { severity: 'Possible depression — monitor closely', color: 'text-amber-500' }
        : { severity: 'Likely depression — professional evaluation recommended', color: 'text-red-500' },
  },
  {
    id: 'gds',
    name: 'GDS-15',
    fullName: 'Geriatric Depression Scale',
    category: 'demographics',
    questions: [
      'Are you basically satisfied with your life?',
      'Have you dropped many of your activities and interests?',
      'Do you feel that your life is empty?',
      'Do you often get bored?',
      'Are you in good spirits most of the time?',
      'Are you afraid that something bad is going to happen to you?',
      'Do you feel happy most of the time?',
      'Do you often feel helpless?',
      'Do you prefer to stay at home rather than going out and doing new things?',
      'Do you feel you have more problems with memory than most people?',
      'Do you think it is wonderful to be alive now?',
      'Do you feel pretty worthless the way you are now?',
      'Do you feel full of energy?',
      'Do you feel that your situation is hopeless?',
      'Do you think that most people are better off than you are?',
    ],
    options: yesNoOptions,
    // For these items (0-indexed), "No" (value=0) scores a point
    reverseItems: [0, 4, 6, 10, 12],
    reverseMax: 1,
    description: 'Validated to screen for depression specifically in older adults using a simple yes/no format.',
    score: (t) =>
      t <= 4
        ? { severity: 'Normal (no depression)', color: 'text-emerald-500' }
        : t <= 8
        ? { severity: 'Mild depression', color: 'text-yellow-500' }
        : t <= 11
        ? { severity: 'Moderate depression', color: 'text-orange-500' }
        : { severity: 'Severe depression', color: 'text-red-500' },
  },
];

/* ─── Category metadata ───────────────────────────────────────── */
const categories = [
  { id: 'stress',      label: 'Stress & General Wellbeing', color: 'sky' },
  { id: 'depression',  label: 'Depression',                 color: 'violet' },
  { id: 'anxiety',     label: 'Anxiety',                    color: 'amber' },
  { id: 'trauma',      label: 'Trauma & PTSD',              color: 'rose' },
  { id: 'mood',        label: 'Mood Disorders',             color: 'orange' },
  { id: 'sleep',       label: 'Sleep & Substance Use',      color: 'indigo' },
  { id: 'demographics',label: 'Specific Populations',       color: 'emerald' },
];

const categoryStyle = {
  sky:     { heading: 'text-sky-600 dark:text-sky-400',     badge: 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300',     card: 'border-sky-100 dark:border-sky-800/40 hover:border-sky-300 dark:hover:border-sky-700',     icon: 'bg-sky-50 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400' },
  violet:  { heading: 'text-violet-600 dark:text-violet-400', badge: 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300', card: 'border-violet-100 dark:border-violet-800/40 hover:border-violet-300 dark:hover:border-violet-700', icon: 'bg-violet-50 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400' },
  amber:   { heading: 'text-amber-600 dark:text-amber-400',  badge: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',   card: 'border-amber-100 dark:border-amber-800/40 hover:border-amber-300 dark:hover:border-amber-700',   icon: 'bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400' },
  rose:    { heading: 'text-rose-600 dark:text-rose-400',    badge: 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300',       card: 'border-rose-100 dark:border-rose-800/40 hover:border-rose-300 dark:hover:border-rose-700',       icon: 'bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400' },
  orange:  { heading: 'text-orange-600 dark:text-orange-400', badge: 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300', card: 'border-orange-100 dark:border-orange-800/40 hover:border-orange-300 dark:hover:border-orange-700', icon: 'bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400' },
  indigo:  { heading: 'text-indigo-600 dark:text-indigo-400', badge: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300', card: 'border-indigo-100 dark:border-indigo-800/40 hover:border-indigo-300 dark:hover:border-indigo-700', icon: 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' },
  emerald: { heading: 'text-emerald-600 dark:text-emerald-400', badge: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300', card: 'border-emerald-100 dark:border-emerald-800/40 hover:border-emerald-300 dark:hover:border-emerald-700', icon: 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400' },
};

/* ─── Component ───────────────────────────────────────────────── */
const Assessments = () => {
  const { user } = useAuth();
  const storageKey = `serene_assessment_results_${user?._id}`;
  const [activeId, setActiveId]       = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [scores, setScores]           = useState([]);
  const [result, setResult]           = useState(null);

  const activeAssessment = assessments.find((a) => a.id === activeId);

  const startTest = (id) => {
    setActiveId(id);
    setCurrentStep(0);
    setScores([]);
    setResult(null);
  };

  const handleAnswer = (value) => {
    const newScores = [...scores];
    newScores[currentStep] = value;
    setScores(newScores);

    if (currentStep < activeAssessment.questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate total with reverse scoring if needed
      const { reverseItems = [], reverseMax = 0 } = activeAssessment;
      const total = newScores.reduce((sum, v, i) => {
        const adjusted = reverseItems.includes(i) ? reverseMax - v : v;
        return sum + adjusted;
      }, 0);
      const newResult = { score: total, ...activeAssessment.score(total) };
      setResult(newResult);

      // Persist to localStorage so Dashboard can display it
      const prev = JSON.parse(localStorage.getItem(storageKey) || '[]');
      const filtered = prev.filter((r) => r.id !== activeAssessment.id);
      filtered.unshift({
        id: activeAssessment.id,
        name: activeAssessment.name,
        fullName: activeAssessment.fullName,
        score: newResult.score,
        severity: newResult.severity,
        color: newResult.color,
        date: new Date().toISOString(),
      });
      localStorage.setItem(storageKey, JSON.stringify(filtered.slice(0, 20)));
    }
  };

  const goBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  /* ── Active test UI ── */
  if (activeId && !result) {
    const { questions, options, name } = activeAssessment;
    const progress = ((currentStep + 1) / questions.length) * 100;

    return (
      <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in duration-700">
        <motion.div
          key="test"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="card glass p-8 md:p-12"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => { setActiveId(null); setResult(null); }}
              className="text-slate-400 hover:text-slate-600 flex items-center gap-1 text-sm"
            >
              <ChevronLeft size={16} /> Cancel
            </button>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400">
                {currentStep + 1} / {questions.length}
              </span>
              <div className="w-32 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-primary-600"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Question */}
          <div className="space-y-8">
            <div className="space-y-3">
              <span className="text-xs font-bold text-primary-600 uppercase tracking-widest">
                {name}
              </span>
              <h3 className="text-2xl md:text-3xl font-bold leading-tight">
                {questions[currentStep]}
              </h3>
            </div>

            <div className={`grid gap-3 ${options.length > 4 ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
              {options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(option.value)}
                  className="p-5 text-left rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-primary-200 dark:hover:border-primary-800 hover:bg-primary-50/50 dark:hover:bg-primary-900/10 transition-all group flex items-center justify-between"
                >
                  <span className="font-medium text-slate-700 dark:text-slate-300 group-hover:text-primary-600">
                    {option.label}
                  </span>
                  <ChevronRight size={18} className="text-slate-300 group-hover:text-primary-400 shrink-0" />
                </button>
              ))}
            </div>

            {currentStep > 0 && (
              <button
                onClick={goBack}
                className="text-sm text-slate-400 hover:text-slate-600 flex items-center gap-1"
              >
                <ChevronLeft size={14} /> Previous question
              </button>
            )}
          </div>
        </motion.div>
      </div>
    );
  }

  /* ── Result UI ── */
  if (result) {
    return (
      <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in duration-700">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card glass p-12 text-center"
        >
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={48} />
          </div>
          <h3 className="text-3xl font-bold mb-1">Your Results</h3>
          <p className="text-slate-500 mb-8 text-sm">{activeAssessment.name} — {activeAssessment.fullName}</p>

          <div className="inline-block p-8 bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 mb-8">
            <div className="text-5xl font-display font-bold mb-2">{result.score}</div>
            <div className={`text-xl font-bold ${result.color}`}>{result.severity}</div>
          </div>

          <div className="max-w-md mx-auto p-4 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 rounded-xl flex items-start gap-3 text-left mb-8">
            <AlertTriangle className="flex-shrink-0 mt-0.5" size={18} />
            <p className="text-xs leading-relaxed">
              <strong>Disclaimer:</strong> This is a screening tool, not a clinical diagnosis. Please share these results with a healthcare professional for a comprehensive evaluation.
            </p>
          </div>

          <button onClick={() => { setActiveId(null); setResult(null); }} className="btn btn-secondary">
            Back to Assessments
          </button>
        </motion.div>
      </div>
    );
  }

  /* ── Assessment grid ── */
  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in duration-700">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold">Mental Health Assessments</h2>
        <p className="text-slate-500 dark:text-slate-400">
          Scientifically validated screening tools to help you understand your symptoms.
        </p>
      </div>

      {categories.map((cat) => {
        const items = assessments.filter((a) => a.category === cat.id);
        if (!items.length) return null;
        const s = categoryStyle[cat.color];

        return (
          <div key={cat.id}>
            <h3 className={`text-xs font-bold uppercase tracking-widest mb-4 ${s.heading}`}>
              {cat.label}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {items.map((a, i) => (
                <motion.div
                  key={a.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  whileHover={{ y: -4 }}
                  onClick={() => startTest(a.id)}
                  className={`card p-6 cursor-pointer border transition-all duration-200 ${s.card}`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`px-2.5 py-1 rounded-lg text-xs font-bold ${s.badge}`}>
                      {a.name}
                    </div>
                    <span className="text-xs text-slate-400">{a.questions.length}Q</span>
                  </div>
                  <h4 className="font-bold text-slate-800 dark:text-slate-100 mb-1">{a.fullName}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                    {a.description}
                  </p>
                  <div className={`flex items-center gap-1 text-xs font-bold ${s.heading}`}>
                    Start <ArrowRight size={13} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );
      })}

      {/* Footer note */}
      <div className="p-5 bg-slate-50 dark:bg-slate-900/50 rounded-2xl flex items-start gap-4">
        <Info className="text-primary-500 mt-0.5 flex-shrink-0" size={20} />
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          These are standardised clinical screening instruments — not diagnostic tools. Results may indicate whether professional consultation is advisable. Always speak with a qualified healthcare provider for a comprehensive evaluation.
        </p>
      </div>
    </div>
  );
};

export default Assessments;
