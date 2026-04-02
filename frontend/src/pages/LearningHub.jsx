import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  Search,
  Info,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Pill,
  Heart,
  Brain,
  ShieldCheck,
  Zap,
  Coffee,
  CloudRain,
  Frown,
  Meh,
  Lock,
  Eye,
  Users,
  Ghost,
  Dna,
  Scale,
  Activity,
  Thermometer,
  Sparkles,
  ShieldAlert,
  Moon,
} from 'lucide-react';

const conditions = [
  // --- COMMON CONDITIONS (1-10) ---
  {
    id: 'depression',
    title: 'Depression (Major Depressive Disorder)',
    icon: <Brain className="text-blue-500" />,
    category: 'common',
    description: 'Depression is more than just feeling sad. It is a persistent feeling of sadness and loss of interest (anhedonia).',
    symptoms: ['Persistent sadness', 'Loss of interest (anhedonia)', 'Fatigue', 'Sleep disturbances', 'Suicidal thoughts'],
    causes: ['Chemical imbalance (serotonin)', 'Trauma', 'Genetics'],
    treatments: ['Therapy (CBT)', 'Antidepressants (SSRIs)', 'Lifestyle changes'],
    link: 'https://www.mayoclinic.org/diseases-conditions/depression/symptoms-causes/syc-20356007'
  },
  {
    id: 'gad',
    title: 'Generalized Anxiety Disorder (GAD)',
    icon: <Heart className="text-emerald-500" />,
    category: 'common',
    description: 'Characterized by constant worry, restlessness, and physical symptoms like rapid heartbeat.',
    symptoms: ['Constant worry', 'Restlessness', 'Rapid heartbeat', 'Difficulty concentrating'],
    causes: ['Stress', 'Brain chemistry', 'Personality traits'],
    treatments: ['Cognitive Behavioral Therapy (CBT)', 'Relaxation techniques', 'Medication (SSRIs/Benzos)'],
    link: 'https://www.mayoclinic.org/diseases-conditions/generalized-anxiety-disorder/symptoms-causes/syc-20360803'
  },
  {
    id: 'panic',
    title: 'Panic Disorder',
    icon: <ShieldAlert className="text-red-500" />,
    category: 'common',
    description: 'Sudden, intense panic attacks accompanied by chest pain and fear of losing control.',
    symptoms: ['Sudden panic attacks', 'Chest pain', 'Shortness of breath', 'Fear of losing control'],
    treatments: ['Breathing techniques', 'CBT', 'Medication'],
    link: 'https://www.mayoclinic.org/diseases-conditions/panic-attacks/symptoms-causes/syc-20376021'
  },
  {
    id: 'ocd',
    title: 'Obsessive-Compulsive Disorder (OCD)',
    icon: <Lock className="text-purple-600" />,
    category: 'common',
    description: 'A pattern of repetitive, unwanted thoughts (obsessions) and irrational actions (compulsions).',
    symptoms: ['Repetitive thoughts (obsessions)', 'Repetitive actions (compulsions)'],
    examples: ['Excessive hand washing', 'Checking locks repeatedly'],
    treatments: ['CBT (Exposure therapy)', 'Medication'],
    link: 'https://www.mayoclinic.org/diseases-conditions/obsessive-compulsive-disorder/symptoms-causes/syc-20354432'
  },
  {
    id: 'ptsd',
    title: 'Post-Traumatic Stress Disorder (PTSD)',
    icon: <ShieldCheck className="text-indigo-600" />,
    category: 'common',
    description: 'Develops after a traumatic event, leading to flashbacks, nightmares, and hypervigilance.',
    symptoms: ['Flashbacks', 'Nightmares', 'Avoidance', 'Hypervigilance'],
    causes: ['Trauma (accident, abuse, war)'],
    treatments: ['Trauma-focused therapy', 'Medication'],
    link: 'https://www.mayoclinic.org/diseases-conditions/post-traumatic-stress-disorder/symptoms-causes/syc-20355967'
  },
  {
    id: 'bipolar',
    title: 'Bipolar Disorder',
    icon: <Scale className="text-amber-500" />,
    category: 'common',
    description: 'Extreme mood swings from mania (high energy) to depression (extreme sadness).',
    types: ['Bipolar I', 'Bipolar II'],
    symptoms: ['Mood swings (mania ↔ depression)', 'High energy → extreme sadness'],
    treatments: ['Mood stabilizers', 'Therapy'],
    link: 'https://www.mayoclinic.org/diseases-conditions/bipolar-disorder/symptoms-causes/syc-20355955'
  },
  {
    id: 'schizophrenia',
    title: 'Schizophrenia',
    icon: <Eye className="text-slate-600" />,
    category: 'common',
    description: 'A severe mental disorder where people interpret reality abnormally through hallucinations or delusions.',
    symptoms: ['Hallucinations', 'Delusions', 'Disorganized thinking'],
    treatments: ['Antipsychotic medication', 'Therapy'],
    link: 'https://www.mayoclinic.org/diseases-conditions/schizophrenia/symptoms-causes/syc-20354443'
  },
  {
    id: 'eating-disorders',
    title: 'Eating Disorders',
    icon: <Activity className="text-rose-500" />,
    category: 'common',
    description: 'Range of conditions like Anorexia, Bulimia, and Binge Eating involving extreme body image issues.',
    types: ['Anorexia', 'Bulimia', 'Binge Eating'],
    symptoms: ['Extreme dieting', 'Body image issues'],
    treatments: ['Therapy', 'Nutritional support'],
    link: 'https://www.mayoclinic.org/diseases-conditions/eating-disorders/symptoms-causes/syc-20353603'
  },
  {
    id: 'insomnia',
    title: 'Insomnia Disorder',
    icon: <Moon className="text-blue-900" />,
    category: 'common',
    description: 'Difficulty falling or staying asleep, leading to poor sleep quality and daytime fatigue.',
    symptoms: ['Difficulty sleeping', 'Poor sleep quality'],
    treatments: ['Sleep hygiene', 'CBT-I'],
    link: 'https://www.mayoclinic.org/diseases-conditions/insomnia/symptoms-causes/syc-20355167'
  },
  {
    id: 'adhd',
    title: 'ADHD',
    icon: <Zap className="text-yellow-500" />,
    category: 'common',
    description: 'Attention-Deficit/Hyperactivity Disorder involves inattention, hyperactivity, and impulsiveness.',
    symptoms: ['Inattention', 'Hyperactivity', 'Impulsiveness'],
    treatments: ['Behavioral therapy', 'Medication'],
    link: 'https://www.mayoclinic.org/diseases-conditions/adhd/symptoms-causes/syc-20350889'
  },

  // --- REFINED / ADVANCED CONCEPTS (11-18) ---
  {
    id: 'social-anxiety',
    title: 'Social Anxiety Disorder',
    icon: <Users className="text-teal-500" />,
    category: 'refined',
    description: 'An intense, persistent fear of being watched and judged by others in social situations.',
    symptoms: ['Fear of social situations', 'Avoiding public interaction'],
    treatments: ['CBT', 'Gradual exposure'],
    link: 'https://www.mayoclinic.org/diseases-conditions/social-anxiety-disorder/symptoms-causes/syc-20353561'
  },
  {
    id: 'dissociative',
    title: 'Dissociative Disorders',
    icon: <Ghost className="text-indigo-400" />,
    category: 'refined',
    description: 'Mental disorders that involve experiencing a disconnection and lack of continuity between thoughts and reality.',
    symptoms: ['Feeling disconnected from reality', 'Memory gaps'],
    treatments: ['Therapy', 'Medication'],
    link: 'https://www.mayoclinic.org/diseases-conditions/dissociative-disorders/symptoms-causes/syc-20355215'
  },
  {
    id: 'bpd',
    title: 'Borderline Personality Disorder (BPD)',
    icon: <Activity className="text-red-500" />,
    category: 'refined',
    description: 'Impacts the way you think and feel about yourself and others, causing problems functioning in everyday life.',
    symptoms: ['Emotional instability', 'Fear of abandonment', 'Impulsive behavior'],
    treatments: ['Dialectical Behavior Therapy (DBT)'],
    link: 'https://www.mayoclinic.org/diseases-conditions/borderline-personality-disorder/symptoms-causes/syc-20370237'
  },
  {
    id: 'npd',
    title: 'Narcissistic Personality Disorder (NPD)',
    icon: <Scale className="text-blue-600" />,
    category: 'refined',
    description: 'A mental condition in which people have an inflated sense of their own importance and a deep need for excessive attention.',
    symptoms: ['Need for admiration', 'Lack of empathy'],
    treatments: ['Psychotherapy'],
    link: 'https://www.mayoclinic.org/diseases-conditions/narcissistic-personality-disorder/symptoms-causes/syc-20353327'
  },
  {
    id: 'phobias',
    title: 'Phobias',
    icon: <Thermometer className="text-orange-600" />,
    category: 'refined',
    description: 'An extreme or irrational fear of or aversion to something specific (heights, spiders, etc.).',
    symptoms: ['Fear of specific objects/situations', 'Anxiety when exposed'],
    examples: ['Acrophobia (heights)', 'Arachnophobia (spiders)'],
    treatments: ['Exposure therapy', 'CBT'],
    link: 'https://www.mayoclinic.org/diseases-conditions/specific-phobias/symptoms-causes/syc-20355104'
  },
  {
    id: 'somatic',
    title: 'Somatic Symptom Disorder',
    icon: <Activity className="text-emerald-500" />,
    category: 'refined',
    description: 'Occurs when a person feels extreme anxiety about physical symptoms such as pain or fatigue.',
    symptoms: ['Physical symptoms without clear medical cause'],
    treatments: ['CBT', 'Mindfulness'],
    link: 'https://www.mayoclinic.org/diseases-conditions/somatic-symptom-disorder/symptoms-causes/syc-20377776'
  },
  {
    id: 'depersonalization',
    title: 'Depersonalization Disorder',
    icon: <Ghost className="text-slate-400" />,
    category: 'refined',
    description: 'A type of dissociative disorder that consists of persistent or recurrent feelings of being detached (from self).',
    symptoms: ['Feeling detached from self'],
    treatments: ['Talk therapy'],
    link: 'https://www.mayoclinic.org/diseases-conditions/depersonalization-derealization-disorder/symptoms-causes/syc-20352911'
  },
  {
    id: 'cyclothymic',
    title: 'Cyclothymic Disorder',
    icon: <Scale className="text-indigo-500" />,
    category: 'refined',
    description: 'A rare mood disorder which causes emotional ups and downs (mild bipolar-like symptoms).',
    symptoms: ['Mild bipolar-like mood swings'],
    treatments: ['Medication', 'Therapy'],
    link: 'https://www.mayoclinic.org/diseases-conditions/cyclothymia/symptoms-causes/syc-20371272'
  }
];

const medications = [
  {
    id: 'ssris',
    name: 'SSRIs (Selective Serotonin Reuptake Inhibitors)',
    examples: 'Fluoxetine (Prozac), Sertraline (Zoloft), Escitalopram (Lexapro)',
    use: 'The most commonly prescribed antidepressants, used for Depression and several Anxiety disorders.',
    detail: 'SSRIs work by increasing levels of serotonin in the brain, a neurotransmitter that carries signals between brain nerve cells.',
    note: 'Usually takes 2–4 weeks to start working. May cause temporary nausea or sleep changes early on.'
  },
  {
    id: 'benzos',
    name: 'Benzodiazepines',
    examples: 'Alprazolam (Xanax), Lorazepam (Ativan), Diazepam (Valium)',
    use: 'Used for extreme short-term relief of acute anxiety or panic symptoms.',
    detail: 'These medications act on GABA receptors to slow down the central nervous system rapidly.',
    note: 'Short-term use ONLY; highly habit-forming and can lead to dependency if misused.'
  },
  {
    id: 'stabilizers',
    name: 'Mood Stabilizers',
    examples: 'Lithium, Valproate, Lamotrigine (Lamictal)',
    use: 'Primarily used to treat Bipolar disorder by preventing manic and depressive episodes.',
    detail: 'Mood stabilizers help even out the highs (mania) and lows (depression) associated with bipolar disorders.',
    note: 'Often require regular blood tests to ensure levels remain within a safe, therapeutic range.'
  },
  {
    id: 'antipsychotics',
    name: 'Antipsychotics (Second-Generation)',
    examples: 'Quetiapine (Seroquel), Aripiprazole (Abilify), Olanzapine (Zyprexa)',
    use: 'Used for Schizophrenia, Bipolar mania, and as add-on therapy for resistant Depression.',
    detail: 'Modern antipsychotics like Abilify and Zyprexa regulate dopamine and serotonin to stabilize mood and thoughts.',
    note: 'Can help manage severe mood swings, hallucinations, or intrusive thoughts effectively.'
  }
];

const psychiatricDrugs = [
  { name: 'Acamprosate',      brand: 'Campral',     category: 'Substance Use',        url: 'https://www.drugs.com/acamprosate.html' },
  { name: 'Alprazolam',       brand: 'Xanax',        category: 'Anxiety',              url: 'https://www.drugs.com/alprazolam.html' },
  { name: 'Amitriptyline',    brand: 'Elavil',       category: 'Antidepressant (TCA)', url: 'https://www.drugs.com/amitriptyline.html' },
  { name: 'Amphetamine',      brand: 'Adderall',     category: 'ADHD',                 url: 'https://www.drugs.com/amphetamine.html' },
  { name: 'Aripiprazole',     brand: 'Abilify',      category: 'Antipsychotic',        url: 'https://www.drugs.com/aripiprazole.html' },
  { name: 'Asenapine',        brand: 'Saphris',      category: 'Antipsychotic',        url: 'https://www.drugs.com/asenapine.html' },
  { name: 'Atomoxetine',      brand: 'Strattera',    category: 'ADHD',                 url: 'https://www.drugs.com/atomoxetine.html' },
  { name: 'Brexpiprazole',    brand: 'Rexulti',      category: 'Antipsychotic',        url: 'https://www.drugs.com/brexpiprazole.html' },
  { name: 'Buprenorphine',    brand: 'Suboxone',     category: 'Substance Use',        url: 'https://www.drugs.com/buprenorphine.html' },
  { name: 'Bupropion',        brand: 'Wellbutrin',   category: 'Antidepressant',       url: 'https://www.drugs.com/bupropion.html' },
  { name: 'Buspirone',        brand: 'Buspar',       category: 'Anxiety',              url: 'https://www.drugs.com/buspirone.html' },
  { name: 'Carbamazepine',    brand: 'Tegretol',     category: 'Mood Stabilizer',      url: 'https://www.drugs.com/carbamazepine.html' },
  { name: 'Cariprazine',      brand: 'Vraylar',      category: 'Antipsychotic',        url: 'https://www.drugs.com/cariprazine.html' },
  { name: 'Citalopram',       brand: 'Celexa',       category: 'Antidepressant (SSRI)',url: 'https://www.drugs.com/citalopram.html' },
  { name: 'Clomipramine',     brand: 'Anafranil',    category: 'Antidepressant (TCA)', url: 'https://www.drugs.com/clomipramine.html' },
  { name: 'Clonazepam',       brand: 'Klonopin',     category: 'Anxiety',              url: 'https://www.drugs.com/clonazepam.html' },
  { name: 'Clozapine',        brand: 'Clozaril',     category: 'Antipsychotic',        url: 'https://www.drugs.com/clozapine.html' },
  { name: 'Desipramine',      brand: 'Norpramin',    category: 'Antidepressant (TCA)', url: 'https://www.drugs.com/desipramine.html' },
  { name: 'Desvenlafaxine',   brand: 'Pristiq',      category: 'Antidepressant (SNRI)',url: 'https://www.drugs.com/desvenlafaxine.html' },
  { name: 'Diazepam',         brand: 'Valium',       category: 'Anxiety',              url: 'https://www.drugs.com/diazepam.html' },
  { name: 'Disulfiram',       brand: 'Antabuse',     category: 'Substance Use',        url: 'https://www.drugs.com/disulfiram.html' },
  { name: 'Doxepin',          brand: 'Sinequan',     category: 'Antidepressant (TCA)', url: 'https://www.drugs.com/doxepin.html' },
  { name: 'Duloxetine',       brand: 'Cymbalta',     category: 'Antidepressant (SNRI)',url: 'https://www.drugs.com/duloxetine.html' },
  { name: 'Escitalopram',     brand: 'Lexapro',      category: 'Antidepressant (SSRI)',url: 'https://www.drugs.com/escitalopram.html' },
  { name: 'Eszopiclone',      brand: 'Lunesta',      category: 'Sleep',                url: 'https://www.drugs.com/eszopiclone.html' },
  { name: 'Fluoxetine',       brand: 'Prozac',       category: 'Antidepressant (SSRI)',url: 'https://www.drugs.com/fluoxetine.html' },
  { name: 'Fluphenazine',     brand: 'Prolixin',     category: 'Antipsychotic (FGA)',  url: 'https://www.drugs.com/fluphenazine.html' },
  { name: 'Fluvoxamine',      brand: 'Luvox',        category: 'Antidepressant (SSRI)',url: 'https://www.drugs.com/fluvoxamine.html' },
  { name: 'Gabapentin',       brand: 'Neurontin',    category: 'Anxiety / Mood',       url: 'https://www.drugs.com/gabapentin.html' },
  { name: 'Guanfacine',       brand: 'Intuniv',      category: 'ADHD',                 url: 'https://www.drugs.com/guanfacine.html' },
  { name: 'Haloperidol',      brand: 'Haldol',       category: 'Antipsychotic (FGA)',  url: 'https://www.drugs.com/haloperidol.html' },
  { name: 'Hydroxyzine',      brand: 'Vistaril',     category: 'Anxiety',              url: 'https://www.drugs.com/hydroxyzine.html' },
  { name: 'Iloperidone',      brand: 'Fanapt',       category: 'Antipsychotic',        url: 'https://www.drugs.com/iloperidone.html' },
  { name: 'Imipramine',       brand: 'Tofranil',     category: 'Antidepressant (TCA)', url: 'https://www.drugs.com/imipramine.html' },
  { name: 'Lamotrigine',      brand: 'Lamictal',     category: 'Mood Stabilizer',      url: 'https://www.drugs.com/lamotrigine.html' },
  { name: 'Levomilnacipran',  brand: 'Fetzima',      category: 'Antidepressant (SNRI)',url: 'https://www.drugs.com/levomilnacipran.html' },
  { name: 'Lisdexamfetamine', brand: 'Vyvanse',      category: 'ADHD',                 url: 'https://www.drugs.com/lisdexamfetamine.html' },
  { name: 'Lithium',          brand: 'Lithobid',     category: 'Mood Stabilizer',      url: 'https://www.drugs.com/lithium.html' },
  { name: 'Lorazepam',        brand: 'Ativan',       category: 'Anxiety',              url: 'https://www.drugs.com/lorazepam.html' },
  { name: 'Lumateperone',     brand: 'Caplyta',      category: 'Antipsychotic',        url: 'https://www.drugs.com/lumateperone.html' },
  { name: 'Lurasidone',       brand: 'Latuda',       category: 'Antipsychotic',        url: 'https://www.drugs.com/lurasidone.html' },
  { name: 'Methylphenidate',  brand: 'Ritalin',      category: 'ADHD',                 url: 'https://www.drugs.com/methylphenidate.html' },
  { name: 'Mirtazapine',      brand: 'Remeron',      category: 'Antidepressant',       url: 'https://www.drugs.com/mirtazapine.html' },
  { name: 'Naltrexone',       brand: 'Vivitrol',     category: 'Substance Use',        url: 'https://www.drugs.com/naltrexone.html' },
  { name: 'Nortriptyline',    brand: 'Pamelor',      category: 'Antidepressant (TCA)', url: 'https://www.drugs.com/nortriptyline.html' },
  { name: 'Olanzapine',       brand: 'Zyprexa',      category: 'Antipsychotic',        url: 'https://www.drugs.com/olanzapine.html' },
  { name: 'Oxazepam',         brand: 'Serax',        category: 'Anxiety',              url: 'https://www.drugs.com/oxazepam.html' },
  { name: 'Paliperidone',     brand: 'Invega',       category: 'Antipsychotic',        url: 'https://www.drugs.com/paliperidone.html' },
  { name: 'Paroxetine',       brand: 'Paxil',        category: 'Antidepressant (SSRI)',url: 'https://www.drugs.com/paroxetine.html' },
  { name: 'Phenelzine',       brand: 'Nardil',       category: 'Antidepressant (MAOI)',url: 'https://www.drugs.com/phenelzine.html' },
  { name: 'Prazosin',         brand: 'Minipress',    category: 'PTSD / Nightmares',    url: 'https://www.drugs.com/prazosin.html' },
  { name: 'Quetiapine',       brand: 'Seroquel',     category: 'Antipsychotic',        url: 'https://www.drugs.com/quetiapine.html' },
  { name: 'Ramelteon',        brand: 'Rozerem',      category: 'Sleep',                url: 'https://www.drugs.com/ramelteon.html' },
  { name: 'Risperidone',      brand: 'Risperdal',    category: 'Antipsychotic',        url: 'https://www.drugs.com/risperidone.html' },
  { name: 'Selegiline',       brand: 'Emsam',        category: 'Antidepressant (MAOI)',url: 'https://www.drugs.com/selegiline.html' },
  { name: 'Sertraline',       brand: 'Zoloft',       category: 'Antidepressant (SSRI)',url: 'https://www.drugs.com/sertraline.html' },
  { name: 'Suvorexant',       brand: 'Belsomra',     category: 'Sleep',                url: 'https://www.drugs.com/suvorexant.html' },
  { name: 'Tranylcypromine',  brand: 'Parnate',      category: 'Antidepressant (MAOI)',url: 'https://www.drugs.com/tranylcypromine.html' },
  { name: 'Trazodone',        brand: 'Desyrel',      category: 'Antidepressant',       url: 'https://www.drugs.com/trazodone.html' },
  { name: 'Valproate',        brand: 'Depakote',     category: 'Mood Stabilizer',      url: 'https://www.drugs.com/valproic-acid.html' },
  { name: 'Venlafaxine',      brand: 'Effexor',      category: 'Antidepressant (SNRI)',url: 'https://www.drugs.com/venlafaxine.html' },
  { name: 'Vilazodone',       brand: 'Viibryd',      category: 'Antidepressant',       url: 'https://www.drugs.com/vilazodone.html' },
  { name: 'Vortioxetine',     brand: 'Trintellix',   category: 'Antidepressant',       url: 'https://www.drugs.com/vortioxetine.html' },
  { name: 'Zaleplon',         brand: 'Sonata',       category: 'Sleep',                url: 'https://www.drugs.com/zaleplon.html' },
  { name: 'Ziprasidone',      brand: 'Geodon',       category: 'Antipsychotic',        url: 'https://www.drugs.com/ziprasidone.html' },
  { name: 'Zolpidem',         brand: 'Ambien',       category: 'Sleep',                url: 'https://www.drugs.com/zolpidem.html' },
];

const drugCategoryColor = (cat) => {
  if (cat.includes('SSRI') || cat.includes('SNRI') || cat.includes('TCA') || cat.includes('MAOI') || cat === 'Antidepressant')
    return 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300';
  if (cat.includes('Antipsychotic'))
    return 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300';
  if (cat === 'Mood Stabilizer')
    return 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300';
  if (cat === 'Anxiety')
    return 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300';
  if (cat === 'ADHD')
    return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300';
  if (cat === 'Sleep')
    return 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300';
  if (cat.includes('Substance'))
    return 'bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300';
  return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300';
};


const LearningHub = () => {
  const [activeTab, setActiveTab] = useState('conditions');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLetter, setSelectedLetter] = useState('All');

  const availableLetters = ['All', ...new Set(psychiatricDrugs.map(d => d.name[0].toUpperCase()))];

  const filteredDrugs = psychiatricDrugs.filter(d => {
    const matchesLetter = selectedLetter === 'All' || d.name[0].toUpperCase() === selectedLetter;
    const matchesSearch = searchQuery === '' ||
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLetter && matchesSearch;
  });

  const filteredConditions = conditions.filter(c => 
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const commonConditions = filteredConditions.filter(c => c.category === 'common');
  const refinedConditions = filteredConditions.filter(c => c.category === 'refined');

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-700 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-4xl font-display font-bold text-slate-900 dark:text-white">Learning Hub</h2>
          <p className="text-slate-500 dark:text-slate-400">Comprehensive resources for your mental health awareness.</p>
        </div>

        <div className="flex bg-white dark:bg-slate-900 p-1 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <button 
            onClick={() => setActiveTab('conditions')}
            className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${
              activeTab === 'conditions' ? 'bg-primary-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Conditions
          </button>
          <button
            onClick={() => setActiveTab('medications')}
            className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${
              activeTab === 'medications' ? 'bg-primary-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Medications
          </button>
          <button
            onClick={() => setActiveTab('az')}
            className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${
              activeTab === 'az' ? 'bg-primary-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            A-Z Medicines
          </button>
        </div>
      </div>

      <div className="relative max-w-xl">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
          <Search size={22} strokeWidth={2.5} />
        </div>
        <input 
          type="text"
          placeholder="Search conditions, symptoms, or medications..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-6 py-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all shadow-sm text-lg"
        />
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'conditions' ? (
          <motion.div 
            key="conditions"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-12"
          >
            {/* Common Conditions Section */}
            {commonConditions.length > 0 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary-100 dark:bg-primary-900/40 text-primary-600 flex items-center justify-center">
                    <Sparkles size={18} />
                  </div>
                  <h3 className="text-2xl font-bold font-display">Common Conditions</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {commonConditions.map((condition) => (
                    <ConditionCard key={condition.id} condition={condition} />
                  ))}
                </div>
              </div>
            )}

            {/* Refined/Advanced Section */}
            {refinedConditions.length > 0 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/40 text-amber-600 flex items-center justify-center">
                    <Zap size={18} />
                  </div>
                  <h3 className="text-2xl font-bold font-display flex items-center gap-2">
                    Advanced Concepts
                    <span className="text-xs font-bold uppercase tracking-widest px-2 py-1 bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400 rounded-md">Refined</span>
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {refinedConditions.map((condition) => (
                    <ConditionCard key={condition.id} condition={condition} />
                  ))}
                </div>
              </div>
            )}

            {filteredConditions.length === 0 && (
              <div className="text-center py-20 text-slate-400">
                <p>No learning materials match your search.</p>
              </div>
            )}
          </motion.div>
        ) : activeTab === 'medications' ? (
          <motion.div
            key="medications"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-10"
          >
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50 p-6 rounded-3xl flex items-start gap-4 mb-2 shadow-sm">
              <AlertCircle className="text-amber-600 flex-shrink-0 mt-1" size={28} />
              <div className="space-y-2">
                <h4 className="font-bold text-amber-900 dark:text-amber-400 text-lg">Clinical Disclaimer</h4>
                <p className="text-sm text-amber-800 dark:text-amber-300 leading-relaxed">
                  This documentation is for <strong>educational purposes only</strong>. It is not a substitute for professional clinical advice. Never start or modify a pharmaceutical regimen without the explicit guidance of a qualified psychiatrist or healthcare provider.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {medications.map((med) => (
                <div key={med.id} className="card bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 p-8 flex gap-8 items-start hover:border-primary-200 dark:hover:border-primary-800 transition-all group">
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-900/40 text-blue-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Pill size={32} />
                  </div>
                  <div className="space-y-5">
                    <div>
                      <h4 className="text-2xl font-bold mb-1 text-slate-900 dark:text-white font-display">{med.name}</h4>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{med.examples}</p>
                    </div>
                    <p className="text-xs text-slate-700 dark:text-slate-400 leading-relaxed">{med.detail}</p>
                    <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                      <p className="text-[11px] text-slate-500 italic flex items-start gap-3">
                        <Info size={14} className="text-primary-500 flex-shrink-0 mt-0.5" strokeWidth={3} />
                        {med.note}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ) : activeTab === 'az' ? (
          <motion.div
            key="az"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-8"
          >
            {/* Disclaimer */}
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50 p-5 rounded-2xl flex items-start gap-4">
              <AlertCircle className="text-amber-600 shrink-0 mt-0.5" size={22} />
              <p className="text-sm text-amber-800 dark:text-amber-300 leading-relaxed">
                <strong>Educational use only.</strong> This list covers common psychiatric medications. Always consult a qualified healthcare provider before starting, stopping, or changing any medication.
              </p>
            </div>

            {/* Letter filter */}
            <div className="flex flex-wrap gap-2">
              {availableLetters.map((letter) => (
                <button
                  key={letter}
                  onClick={() => setSelectedLetter(letter)}
                  className={`px-3 py-1.5 rounded-xl border text-sm font-bold transition-all duration-150 ${
                    selectedLetter === letter
                      ? 'bg-primary-600 text-white border-primary-600'
                      : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:border-primary-400 hover:text-primary-600'
                  }`}
                >
                  {letter}
                </button>
              ))}
            </div>

            {/* Count */}
            <p className="text-xs text-slate-400">
              Showing <strong className="text-slate-600 dark:text-slate-300">{filteredDrugs.length}</strong> psychiatric {filteredDrugs.length === 1 ? 'medication' : 'medications'}
            </p>

            {/* Drug cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredDrugs.map((drug) => (
                <a
                  key={drug.name}
                  href={drug.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-primary-300 dark:hover:border-primary-700 transition-all duration-200 flex flex-col gap-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-bold text-slate-800 dark:text-slate-100 group-hover:text-primary-600 transition-colors">
                        {drug.name}
                      </p>
                      <p className="text-xs text-slate-400 mt-0.5">{drug.brand}</p>
                    </div>
                    <ExternalLink size={13} className="text-slate-300 dark:text-slate-600 group-hover:text-primary-400 transition-colors shrink-0 mt-1" />
                  </div>
                  <span className={`self-start text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${drugCategoryColor(drug.category)}`}>
                    {drug.category}
                  </span>
                </a>
              ))}
            </div>

            {filteredDrugs.length === 0 && (
              <div className="text-center py-16 text-slate-400">
                <Pill size={36} className="mx-auto mb-3 opacity-20" />
                <p className="text-sm">No medications match your filter.</p>
              </div>
            )}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};

const ConditionCard = ({ condition }) => (
  <motion.div 
    whileHover={{ y: -6 }}
    className="card glass flex flex-col p-8 hover:border-primary-300 dark:hover:border-primary-700 transition-all group cursor-default h-full"
  >
    <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800/50 rounded-2xl flex items-center justify-center mb-6 border border-slate-100 dark:border-slate-700 group-hover:scale-110 transition-transform">
      {React.cloneElement(condition.icon, { size: 32 })}
    </div>
    
    <div className="space-y-3 mb-6">
      <h3 className="text-2xl font-bold text-slate-900 dark:text-white leading-tight font-display">{condition.title}</h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
        {condition.description}
      </p>
    </div>

    <div className="space-y-6 flex-1">
      <div>
        <h4 className="text-[10px] font-bold uppercase tracking-widest text-primary-600 mb-3 flex items-center gap-2">
          <Activity size={12} /> Key Symptoms
        </h4>
        <ul className="space-y-2.5">
          {condition.symptoms.slice(0, 4).map((s, i) => (
            <li key={i} className="text-[11px] flex items-center gap-2 text-slate-600 dark:text-slate-400 font-medium">
              <div className="w-1 h-1 rounded-full bg-emerald-500" />
              {s}
            </li>
          ))}
        </ul>
      </div>
      
      <div>
        <h4 className="text-[10px] font-bold uppercase tracking-widest text-accent-600 mb-3 flex items-center gap-2">
          <ShieldCheck size={12} /> Typical Care
        </h4>
        <ul className="space-y-2.5">
          {condition.treatments.slice(0, 3).map((t, i) => (
            <li key={i} className="text-[11px] flex items-center gap-2 text-slate-600 dark:text-slate-400 font-medium">
              <CheckCircle2 size={12} className="text-accent-400" />
              {t}
            </li>
          ))}
        </ul>
      </div>
    </div>

    <a 
      href={condition.link}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 text-sm font-bold text-primary-600 flex items-center gap-2 hover:translate-x-1 transition-all"
    >
      Full Clinical Documentation <ExternalLink size={14} />
    </a>
  </motion.div>
);

export default LearningHub;
