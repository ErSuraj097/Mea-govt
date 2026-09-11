'use client';

import React, { useState } from 'react';
import {
  Trophy,
  Award,
  Calendar,
  Sparkles,
  CheckCircle2,
  FileText,
  Upload,
  Send,
  Flame,
  Star,
  Zap,
  Users,
  Globe,
  Search,
  Filter,
  Check,
  Bot,
  BrainCircuit,
  ShieldCheck,
  Layers,
  Mic,
  BookOpen,
  Medal,
  ArrowRight,
  Clock,
  X
} from 'lucide-react';

interface CompetitionItem {
  id: string;
  title: string;
  subtitle: string;
  track: 'Track A (Indian Bhashas)' | 'Track B (Foreign Languages)' | 'Global Multilingual';
  languages: string[];
  category: 'Essay & Prose' | 'Speech & Recitation' | 'Translation Sprint' | 'Calligraphy & Scripts' | 'Diplomatic Debate';
  deadline: string;
  prizePool: string;
  status: 'ACTIVE NOW' | 'SUBMISSION OPEN' | 'EVALUATION IN PROGRESS';
  participantsCount: number;
  xpReward: number;
  description: string;
  guidelines: string[];
}

const INDIAN_LANGUAGES_LIST = [
  'Hindi', 'Sanskrit', 'Tamil', 'Telugu', 'Bengali', 'Marathi', 'Gujarati', 
  'Kannada', 'Malayalam', 'Odia', 'Punjabi', 'Assamese', 'Maithili', 'Urdu',
  'Santali', 'Nepali', 'Konkani', 'Kashmiri', 'Dogri', 'Manipuri', 'Bodo', 'Sindhi'
];

const FOREIGN_LANGUAGES_LIST = [
  'French', 'German', 'Spanish', 'Japanese', 'Mandarin Chinese', 'Russian', 
  'Arabic', 'Korean', 'Italian', 'Portuguese', 'Persian', 'Dutch', 'Turkish', 'Swedish', 'Hebrew'
];

const COMPETITIONS_LIST: CompetitionItem[] = [
  {
    id: 'comp_1',
    title: 'National Devanagari & Classical Bhasha Essay Championship 2026',
    subtitle: 'Role of Indian Classical Languages in Modern Global Soft-Power & Diplomacy',
    track: 'Track A (Indian Bhashas)',
    languages: ['Hindi', 'Sanskrit', 'Marathi', 'Nepali'],
    category: 'Essay & Prose',
    deadline: '25 September 2026',
    prizePool: '₹75,000 + MEA National Gold Medal',
    status: 'ACTIVE NOW',
    participantsCount: 1420,
    xpReward: 600,
    description: 'Submit a comprehensive 1200-word research essay evaluating how ancient Indian linguistic frameworks contribute to contemporary multilateral diplomatic negotiations.',
    guidelines: [
      'Minimum word count: 800 words, Maximum: 1500 words.',
      'Must be written in clean Devanagari script or standardized transliteration.',
      'Includes mandatory AI Grammar & Etymology score check before submission.'
    ]
  },
  {
    id: 'comp_2',
    title: 'Indo-European Diplomatic Translation Sprint',
    subtitle: 'Real-time Diplomatic Protocol & Communiqué Rendering',
    track: 'Track B (Foreign Languages)',
    languages: ['French', 'German', 'Spanish', 'Italian'],
    category: 'Translation Sprint',
    deadline: '30 September 2026',
    prizePool: '₹60,000 + Embassy Internship Voucher',
    status: 'ACTIVE NOW',
    participantsCount: 980,
    xpReward: 500,
    description: 'Translate 15 complex bilateral diplomatic drafts from English into French, German, or Spanish while maintaining high contextual fidelity.',
    guidelines: [
      'Precision benchmarked against UN and MEA official terminology databases.',
      'Automated semantic similarity check via AI Language Models.',
      'Submission can be made as plain text or PDF format.'
    ]
  },
  {
    id: 'comp_3',
    title: 'Dravidian Heritage Audio Recitation & Phonetics Challenge',
    subtitle: 'Classical Poetry Recitation & Acoustic Pronunciation Benchmark',
    track: 'Track A (Indian Bhashas)',
    languages: ['Tamil', 'Telugu', 'Kannada', 'Malayalam'],
    category: 'Speech & Recitation',
    deadline: '05 October 2026',
    prizePool: '₹50,000 + Ministry Audio Badge',
    status: 'SUBMISSION OPEN',
    participantsCount: 850,
    xpReward: 450,
    description: 'Record a high-definition 3-minute audio rendition of classical verses (e.g. Thirukkural, Vemana Padyalu) focusing on pitch, tone, and vowel length precision.',
    guidelines: [
      'Clear MP3/WAV audio upload under 10MB.',
      'AI Speech Processor will verify pitch, stress, and pronunciation score.',
      'Subtitles/Text transcript must accompany the recording.'
    ]
  },
  {
    id: 'comp_4',
    title: 'East Asian Script & Kanji/Hanzi Calligraphy Grand Prix',
    subtitle: 'Visual Language Arts & Master Stroke Technique Competition',
    track: 'Track B (Foreign Languages)',
    languages: ['Japanese', 'Mandarin Chinese', 'Korean'],
    category: 'Calligraphy & Scripts',
    deadline: '12 October 2026',
    prizePool: '₹65,000 + Cultural Exchange Trip Nomination',
    status: 'SUBMISSION OPEN',
    participantsCount: 710,
    xpReward: 550,
    description: 'Demonstrate stroke order mastery and aesthetic execution by rendering selected proverb scripts in traditional brush or digital calligraphy styles.',
    guidelines: [
      'High-resolution image scan or vector PDF upload required.',
      'Include a 200-word commentary explaining the cultural significance of the chosen proverb.'
    ]
  },
  {
    id: 'comp_5',
    title: 'Pan-Indian 22 Bhasha Multilingual Translation Hackathon',
    subtitle: 'Cross-Linguistic Translation Across All Scheduled Languages of India',
    track: 'Track A (Indian Bhashas)',
    languages: ['All 22 Scheduled Indian Languages'],
    category: 'Translation Sprint',
    deadline: '18 October 2026',
    prizePool: '₹1,00,000 + National Digital Bhasha Fellow Title',
    status: 'SUBMISSION OPEN',
    participantsCount: 2150,
    xpReward: 750,
    description: 'Challenge your multilingual agility by translating regional official documents across 5 different Indian language pairs within a 3-hour window.',
    guidelines: [
      'Select any 2 or more Indian languages from the 22 Eighth Schedule languages.',
      'Evaluated by AI Engine and Senior MEA Translation Panel.'
    ]
  },
  {
    id: 'comp_6',
    title: 'Global Hispanophone & Lusophone Diplomatic Oratory Summit',
    subtitle: 'Persuasive Speech & Geopolitical Negotiation Simulation',
    track: 'Track B (Foreign Languages)',
    languages: ['Spanish', 'Portuguese'],
    category: 'Diplomatic Debate',
    deadline: '22 October 2026',
    prizePool: '₹55,000 + MEA Foreign Service Certificate',
    status: 'SUBMISSION OPEN',
    participantsCount: 620,
    xpReward: 480,
    description: 'Deliver a 4-minute recorded video speech arguing for enhanced trade corridors between India and Ibero-America in fluent Spanish or Portuguese.',
    guidelines: [
      'Video resolution 720p or higher with clear audio speech transcript.',
      'Evaluated on geopolitical vocabulary, fluency, and diplomatic posture.'
    ]
  },
  {
    id: 'comp_7',
    title: 'Eurasian & Slavic Linguistic Analysis Challenge',
    subtitle: 'Russian & Eurasian Diplomatic Corpus Parsing & Context Analysis',
    track: 'Track B (Foreign Languages)',
    languages: ['Russian', 'Persian', 'Turkish'],
    category: 'Essay & Prose',
    deadline: '28 October 2026',
    prizePool: '₹50,000 + Research Grant Voucher',
    status: 'SUBMISSION OPEN',
    participantsCount: 540,
    xpReward: 420,
    description: 'Analyze official diplomatic statements in Russian or Persian and draft an analytical intelligence summary in target language.',
    guidelines: [
      'Word limit: 1000 words.',
      'Must utilize specialized Eurasian political & economic vocabulary.'
    ]
  },
  {
    id: 'comp_8',
    title: 'Arabic Classical Phonetics & Arabic Script Championship',
    subtitle: 'Middle Eastern Diplomatic Communications & Script Mastery',
    track: 'Track B (Foreign Languages)',
    languages: ['Arabic'],
    category: 'Speech & Recitation',
    deadline: '02 November 2026',
    prizePool: '₹60,000 + Gulf Cooperation Council Badge',
    status: 'SUBMISSION OPEN',
    participantsCount: 490,
    xpReward: 500,
    description: 'Demonstrate elite mastery in Modern Standard Arabic (Fusha) pronunciation and formal diplomatic address.',
    guidelines: [
      '3-minute audio or video submission.',
      'Checked for Tajweed/Standard Fusha phonetic accuracy.'
    ]
  }
];

const PAST_WINNERS = [
  {
    name: 'Aarav Sharma',
    city: 'New Delhi',
    language: 'Hindi & Sanskrit',
    competition: 'National Devanagari Championship 2025',
    rank: '🥇 1st Rank (Gold Medal)',
    score: '98.5 / 100',
    prize: '₹75,000 + MEA Fellowship'
  },
  {
    name: 'Priya Venkatesh',
    city: 'Chennai',
    language: 'Tamil & French',
    competition: 'Indo-European Translation Sprint',
    rank: '🥈 2nd Rank (Silver Medal)',
    score: '97.2 / 100',
    prize: '₹40,000 + Embassy Citation'
  },
  {
    name: 'Rohan Banerjee',
    city: 'Kolkata',
    language: 'Bengali & Russian',
    competition: 'Eurasian Linguistic Challenge',
    rank: '🥉 3rd Rank (Bronze Medal)',
    score: '96.8 / 100',
    prize: '₹25,000 + Ministry Badge'
  }
];

export default function DashboardCompetitionsPage() {
  const [selectedTrack, setSelectedTrack] = useState<string>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Submission modal state
  const [activeComp, setActiveComp] = useState<CompetitionItem | null>(null);
  const [targetLanguage, setTargetLanguage] = useState<string>('');
  const [submissionFormat, setSubmissionFormat] = useState<'TEXT' | 'FILE'>('TEXT');
  const [submissionText, setSubmissionText] = useState('');
  const [fileName, setFileName] = useState('');
  
  // AI Pre-check simulation state
  const [isEvaluatingAI, setIsEvaluatingAI] = useState(false);
  const [aiReport, setAiReport] = useState<{
    grammarScore: number;
    vocabularyScore: number;
    fluencyScore: number;
    diplomaticScore: number;
    feedbackText: string;
  } | null>(null);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionCode, setSubmissionCode] = useState('');

  // Filter logic
  const filteredCompetitions = COMPETITIONS_LIST.filter(comp => {
    const matchesTrack = 
      selectedTrack === 'ALL' ||
      (selectedTrack === 'INDIAN' && comp.track.includes('Indian')) ||
      (selectedTrack === 'FOREIGN' && comp.track.includes('Foreign'));
    
    const matchesCategory = 
      selectedCategory === 'ALL' || comp.category === selectedCategory;

    const matchesSearch = 
      comp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comp.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comp.languages.some(l => l.toLowerCase().includes(searchQuery.toLowerCase())) ||
      comp.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTrack && matchesCategory && matchesSearch;
  });

  const handleOpenModal = (comp: CompetitionItem) => {
    setActiveComp(comp);
    setTargetLanguage(comp.languages[0] || 'Hindi');
    setSubmissionText('');
    setFileName('');
    setAiReport(null);
    setIsSubmitted(false);
  };

  const handleRunAiCheck = () => {
    if (submissionFormat === 'TEXT' && !submissionText.trim()) {
      alert('Please write or paste your entry text before running the AI Inspector.');
      return;
    }
    if (submissionFormat === 'FILE' && !fileName) {
      alert('Please upload your document file before running the AI Inspector.');
      return;
    }

    setIsEvaluatingAI(true);
    setTimeout(() => {
      setIsEvaluatingAI(false);
      setAiReport({
        grammarScore: Math.floor(92 + Math.random() * 7),
        vocabularyScore: Math.floor(90 + Math.random() * 9),
        fluencyScore: Math.floor(94 + Math.random() * 5),
        diplomaticScore: Math.floor(93 + Math.random() * 6),
        feedbackText: `Excellent submission in target language [${targetLanguage}]. High syntactic accuracy, strong diplomatic terminology usage, and clear thematic structure. Ready for final Ministry submission!`
      });
    }, 1200);
  };

  const handleSubmitEntry = () => {
    if (submissionFormat === 'TEXT' && !submissionText.trim()) {
      alert('Please provide your entry content before submitting!');
      return;
    }
    if (submissionFormat === 'FILE' && !fileName) {
      alert('Please upload your submission document!');
      return;
    }

    const code = `SUB-MEA-COMP-${Math.floor(100000 + Math.random() * 900000)}`;
    setSubmissionCode(code);
    setIsSubmitted(true);
  };

  return (
    <div className="space-y-8 max-w-8xl mx-auto pb-16">
      {/* MEA Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0B3D91] via-[#082C6C] to-[#051C45] text-white border border-[#0B3D91] shadow-xl relative overflow-hidden space-y-6">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF9933]/10 rounded-full blur-3xl -z-0 pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10 border-b border-white/10 pb-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#FF9933] text-[#051C45] text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
                <Trophy className="w-3.5 h-3.5" /> GLOBAL & INDIAN BHASHA CHAMPIONSHIPS 2026
              </span>
              <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-200 text-[10px] font-bold uppercase border border-blue-400/30 flex items-center gap-1">
                <Globe className="w-3 h-3 text-cyan-300" /> 22 Indian Bhashas + 15 Foreign World Languages
              </span>
            </div>
            
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              World & Indian Language Competitions
            </h1>
            <p className="text-xs sm:text-sm text-blue-100 font-medium leading-relaxed">
              Compete in national essay writing, live speech recitation, diplomatic translation sprints, and calligraphy challenges across 22 Scheduled Indian Languages and 15 International World Languages. Win Ministry certificates, trophies, cash prizes, and fellowship vouchers.
            </p>
          </div>

          <div className="flex flex-wrap lg:flex-col items-center lg:items-end gap-3 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15 min-w-[240px]">
            <div className="flex items-center gap-2 text-amber-300">
              <Award className="w-6 h-6" />
              <div>
                <span className="text-[10px] font-bold text-blue-200 block uppercase tracking-wider">TOTAL ANNUAL PRIZE POOL</span>
                <span className="text-base font-black text-white">₹5,50,000 Cash + Medals</span>
              </div>
            </div>
            <div className="flex items-center gap-4 text-xs font-bold text-blue-200 border-t border-white/10 pt-2 w-full justify-between">
              <span>🏆 8 Active Challenges</span>
              <span>⚡ +500 XP / Entry</span>
            </div>
          </div>
        </div>

        {/* Live Filter Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">
          {/* Track Switchers */}
          <div className="flex items-center gap-2 bg-black/20 p-1.5 rounded-2xl border border-white/10 w-full md:w-auto">
            <button
              onClick={() => setSelectedTrack('ALL')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                selectedTrack === 'ALL'
                  ? 'bg-[#FF9933] text-[#051C45] shadow-md'
                  : 'text-blue-100 hover:text-white hover:bg-white/10'
              }`}
            >
              🌐 All Languages ({COMPETITIONS_LIST.length})
            </button>
            <button
              onClick={() => setSelectedTrack('INDIAN')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                selectedTrack === 'INDIAN'
                  ? 'bg-[#FF9933] text-[#051C45] shadow-md'
                  : 'text-blue-100 hover:text-white hover:bg-white/10'
              }`}
            >
              🇮🇳 Track A: 22 Indian Bhashas
            </button>
            <button
              onClick={() => setSelectedTrack('FOREIGN')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                selectedTrack === 'FOREIGN'
                  ? 'bg-[#FF9933] text-[#051C45] shadow-md'
                  : 'text-blue-100 hover:text-white hover:bg-white/10'
              }`}
            >
              🌍 Track B: 15 Foreign Languages
            </button>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-300 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search language, title, or keyword..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white placeholder-blue-200 text-xs font-medium focus:outline-none focus:bg-white/20"
            />
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1 shrink-0 mr-2">
          <Filter className="w-3.5 h-3.5 text-[#0B3D91]" /> Category:
        </span>
        {['ALL', 'Essay & Prose', 'Speech & Recitation', 'Translation Sprint', 'Calligraphy & Scripts', 'Diplomatic Debate'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold whitespace-nowrap transition border ${
              selectedCategory === cat
                ? 'bg-[#0B3D91] text-white border-[#0B3D91] shadow-xs'
                : 'bg-white text-slate-700 border-[#DCE2E6] hover:border-[#0B3D91]/50 hover:bg-slate-50'
            }`}
          >
            {cat === 'ALL' ? 'All Categories' : cat}
          </button>
        ))}
      </div>

      {/* COMPETITIONS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCompetitions.map((comp) => (
          <div
            key={comp.id}
            className="bg-white rounded-3xl border border-[#DCE2E6] p-6 space-y-5 shadow-2xs hover:shadow-xl transition duration-300 flex flex-col justify-between relative group overflow-hidden"
          >
            <div className="space-y-4">
              {/* Header Badges */}
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                  comp.track.includes('Indian')
                    ? 'bg-amber-50 text-amber-900 border-amber-200'
                    : 'bg-indigo-50 text-indigo-900 border-indigo-200'
                }`}>
                  {comp.track}
                </span>

                <span className="px-2.5 py-0.5 rounded-full bg-[#FF9933]/15 text-[#0B3D91] text-[10px] font-black flex items-center gap-1 border border-[#FF9933]/30">
                  <Flame className="w-3 h-3 text-[#FF9933]" /> +{comp.xpReward} XP
                </span>
              </div>

              {/* Title & Subtitle */}
              <div className="space-y-1">
                <h3 className="text-base font-black text-[#1B2A4A] group-hover:text-[#0B3D91] transition line-clamp-2">
                  {comp.title}
                </h3>
                <p className="text-xs font-bold text-[#0B3D91] flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-[#FF9933]" /> {comp.subtitle}
                </p>
              </div>

              {/* Supported Languages Pills */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[10px] font-extrabold text-slate-400 uppercase">Languages:</span>
                {comp.languages.map((lang, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-slate-700 text-[10px] font-bold">
                    {lang}
                  </span>
                ))}
              </div>

              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                {comp.description}
              </p>

              {/* Details Box */}
              <div className="p-3.5 rounded-2xl bg-[#F8FAFC] border border-[#DCE2E6] space-y-1.5 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-bold flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-amber-500" /> Prize Pool:
                  </span>
                  <span className="text-emerald-700 font-black">{comp.prizePool}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-bold flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-blue-500" /> Submission Deadline:
                  </span>
                  <span className="text-[#0B3D91] font-extrabold">{comp.deadline}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-bold flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-indigo-500" /> Enrolled Students:
                  </span>
                  <span className="text-slate-900 font-bold">{comp.participantsCount} Entries</span>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={() => handleOpenModal(comp)}
              className="w-full py-3 rounded-xl bg-[#0B3D91] hover:bg-[#082C6C] text-white font-extrabold text-xs shadow-md transition flex items-center justify-center gap-2 mt-auto"
            >
              <FileText className="w-4 h-4 text-[#FF9933]" /> Submit Entry & Compete →
            </button>
          </div>
        ))}
      </div>

      {filteredCompetitions.length === 0 && (
        <div className="p-12 text-center bg-white rounded-3xl border border-[#DCE2E6] space-y-3">
          <Globe className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-[#1B2A4A]">No competitions match your search query</h3>
          <p className="text-xs text-slate-500">Try adjusting your category filter, language track, or clear search text.</p>
          <button
            onClick={() => { setSelectedTrack('ALL'); setSelectedCategory('ALL'); setSearchQuery(''); }}
            className="px-4 py-2 rounded-xl bg-[#0B3D91] text-white text-xs font-bold shadow-xs"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* PAST WINNERS & WALL OF HONOR */}
      <div className="bg-gradient-to-br from-slate-900 via-[#0B3D91] to-slate-950 rounded-3xl p-6 sm:p-8 text-white border border-[#0B3D91] shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="space-y-1">
            <span className="px-3 py-1 rounded-full bg-[#FF9933] text-[#051C45] text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 w-fit">
              <Medal className="w-3.5 h-3.5" /> WALL OF HONOR & PAST CHAMPIONS
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white">Recent Ministry Award Winners</h2>
            <p className="text-xs text-blue-200">Recognizing top performing language scholars from government institutes and universities.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PAST_WINNERS.map((winner, idx) => (
            <div key={idx} className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-amber-300">{winner.rank}</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-400/30">
                  {winner.score}
                </span>
              </div>

              <div>
                <h4 className="font-extrabold text-sm text-white">{winner.name}</h4>
                <p className="text-[11px] text-blue-200 font-medium">{winner.city} • {winner.language}</p>
              </div>

              <div className="pt-2 border-t border-white/10 text-[11px] text-slate-300 space-y-1">
                <p className="font-semibold text-blue-100">{winner.competition}</p>
                <p className="text-amber-200 font-bold">{winner.prize}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SUBMISSION MODAL */}
      {activeComp && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-2xl bg-white border border-[#DCE2E6] rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200 text-left my-8">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[#DCE2E6] pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#0B3D91] flex items-center justify-center text-white shrink-0">
                  <Trophy className="w-5 h-5 text-[#FF9933]" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase text-[#0B3D91] bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                    {activeComp.track}
                  </span>
                  <h3 className="font-black text-lg text-[#1B2A4A] mt-0.5">{activeComp.title}</h3>
                </div>
              </div>
              <button
                onClick={() => setActiveComp(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 font-bold"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {!isSubmitted ? (
              <div className="space-y-5 text-xs">
                {/* Guidelines */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <h4 className="font-bold text-[#1B2A4A] flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#0B3D91]" /> Official Competition Guidelines & Criteria:
                  </h4>
                  <ul className="space-y-1 text-slate-600 list-disc list-inside font-medium">
                    {activeComp.guidelines.map((g, idx) => (
                      <li key={idx}>{g}</li>
                    ))}
                  </ul>
                </div>

                {/* Target Language Selection */}
                <div className="space-y-2">
                  <label className="text-[#1B2A4A] font-bold block">
                    1. Select Target Language for Submission:
                  </label>
                  <select
                    value={targetLanguage}
                    onChange={(e) => setTargetLanguage(e.target.value)}
                    className="w-full p-3 rounded-xl bg-[#F8FAFC] border border-[#DCE2E6] font-bold text-[#1B2A4A] focus:outline-none focus:border-[#0B3D91]"
                  >
                    {activeComp.track.includes('Indian')
                      ? INDIAN_LANGUAGES_LIST.map(lang => (
                          <option key={lang} value={lang}>{lang} (Scheduled Indian Language)</option>
                        ))
                      : FOREIGN_LANGUAGES_LIST.map(lang => (
                          <option key={lang} value={lang}>{lang} (International World Language)</option>
                        ))
                    }
                  </select>
                </div>

                {/* Submission Format Switcher */}
                <div className="space-y-2">
                  <label className="text-[#1B2A4A] font-bold block">
                    2. Choose Submission Format:
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setSubmissionFormat('TEXT')}
                      className={`p-3 rounded-xl border text-left font-bold transition flex items-center gap-2 ${
                        submissionFormat === 'TEXT'
                          ? 'bg-[#0B3D91]/10 border-[#0B3D91] text-[#0B3D91]'
                          : 'bg-[#F8FAFC] border-[#DCE2E6] text-slate-600'
                      }`}
                    >
                      <FileText className="w-4 h-4 text-[#FF9933]" /> Written Text / Essay
                    </button>
                    <button
                      type="button"
                      onClick={() => setSubmissionFormat('FILE')}
                      className={`p-3 rounded-xl border text-left font-bold transition flex items-center gap-2 ${
                        submissionFormat === 'FILE'
                          ? 'bg-[#0B3D91]/10 border-[#0B3D91] text-[#0B3D91]'
                          : 'bg-[#F8FAFC] border-[#DCE2E6] text-slate-600'
                      }`}
                    >
                      <Upload className="w-4 h-4 text-[#FF9933]" /> File Upload (PDF / Audio / Image)
                    </button>
                  </div>
                </div>

                {/* Entry Input Area */}
                {submissionFormat === 'TEXT' ? (
                  <div className="space-y-1.5 font-semibold">
                    <label className="text-[#1B2A4A] font-bold block">
                      3. Write or Paste Your Entry Text ({targetLanguage}):
                    </label>
                    <textarea
                      rows={6}
                      value={submissionText}
                      onChange={(e) => setSubmissionText(e.target.value)}
                      placeholder={`Type or paste your competition submission in ${targetLanguage}...`}
                      className="w-full p-3.5 rounded-xl bg-[#F8FAFC] border border-[#DCE2E6] font-medium text-[#1B2A4A] focus:outline-none focus:border-[#0B3D91] leading-relaxed"
                    />
                  </div>
                ) : (
                  <div className="space-y-2">
                    <label className="text-[#1B2A4A] font-bold block">
                      3. Upload Submission File (PDF / MP3 Audio / Calligraphy Image):
                    </label>
                    <div className="p-6 rounded-2xl border-2 border-dashed border-[#DCE2E6] bg-[#F8FAFC] text-center space-y-2">
                      <Upload className="w-8 h-8 text-slate-400 mx-auto" />
                      <p className="font-bold text-slate-700">Click to select file or drag & drop</p>
                      <p className="text-[11px] text-slate-400">Supported Formats: PDF, MP3, WAV, PNG, JPG (Max size 25MB)</p>
                      <input
                        type="file"
                        onChange={(e) => setFileName(e.target.files?.[0]?.name || 'submission_file.pdf')}
                        className="mt-2 text-xs font-semibold text-slate-600 mx-auto block"
                      />
                      {fileName && (
                        <p className="text-xs font-extrabold text-emerald-700 flex items-center justify-center gap-1 pt-2">
                          <CheckCircle2 className="w-4 h-4" /> Attached: {fileName}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* AI Instant Inspector Banner */}
                <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Bot className="w-5 h-5 text-indigo-700" />
                      <span className="font-extrabold text-indigo-900 text-xs">MEA AI Quality Pre-Check</span>
                    </div>
                    <button
                      type="button"
                      onClick={handleRunAiCheck}
                      disabled={isEvaluatingAI}
                      className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition"
                    >
                      {isEvaluatingAI ? (
                        <>Evaluating AI Grammar & Tone...</>
                      ) : (
                        <>
                          <BrainCircuit className="w-3.5 h-3.5 text-amber-300" /> Run AI Pre-Check
                        </>
                      )}
                    </button>
                  </div>

                  {aiReport && (
                    <div className="space-y-3 border-t border-indigo-200/70 pt-3 animate-in fade-in duration-200">
                      <div className="grid grid-cols-4 gap-2 text-center">
                        <div className="bg-white p-2 rounded-xl border border-indigo-100">
                          <span className="text-[10px] text-slate-500 font-bold block">Grammar</span>
                          <span className="text-xs font-black text-indigo-700">{aiReport.grammarScore}/100</span>
                        </div>
                        <div className="bg-white p-2 rounded-xl border border-indigo-100">
                          <span className="text-[10px] text-slate-500 font-bold block">Vocabulary</span>
                          <span className="text-xs font-black text-indigo-700">{aiReport.vocabularyScore}/100</span>
                        </div>
                        <div className="bg-white p-2 rounded-xl border border-indigo-100">
                          <span className="text-[10px] text-slate-500 font-bold block">Fluency</span>
                          <span className="text-xs font-black text-indigo-700">{aiReport.fluencyScore}/100</span>
                        </div>
                        <div className="bg-white p-2 rounded-xl border border-indigo-100">
                          <span className="text-[10px] text-slate-500 font-bold block">Diplomatic Tone</span>
                          <span className="text-xs font-black text-indigo-700">{aiReport.diplomaticScore}/100</span>
                        </div>
                      </div>

                      <p className="text-[11px] font-semibold text-indigo-950 bg-white p-2.5 rounded-xl border border-indigo-100">
                        {aiReport.feedbackText}
                      </p>
                    </div>
                  )}
                </div>

                {/* Modal Footer Actions */}
                <div className="pt-3 flex items-center justify-end gap-3 border-t border-[#DCE2E6]">
                  <button
                    type="button"
                    onClick={() => setActiveComp(null)}
                    className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmitEntry}
                    className="px-6 py-2.5 rounded-xl bg-[#0B3D91] hover:bg-[#082C6C] text-white font-extrabold text-xs shadow-md flex items-center gap-2"
                  >
                    <Send className="w-4 h-4 text-[#FF9933]" /> Final Submit Entry (+{activeComp.xpReward} XP)
                  </button>
                </div>
              </div>
            ) : (
              /* Success Screen */
              <div className="text-center py-6 space-y-4 animate-in fade-in zoom-in-95 duration-200">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl font-black text-[#1B2A4A]">Entry Submitted Successfully!</h3>
                  <p className="text-xs text-slate-600 font-medium">
                    Your competition entry has been recorded in the Ministry evaluation pipeline.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 max-w-md mx-auto space-y-2 text-left text-xs">
                  <div className="flex justify-between border-b border-slate-200 pb-2">
                    <span className="text-slate-500 font-bold">Submission Code:</span>
                    <span className="font-mono font-black text-[#0B3D91]">{submissionCode}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-2">
                    <span className="text-slate-500 font-bold">Target Language:</span>
                    <span className="font-bold text-slate-900">{targetLanguage}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-2">
                    <span className="text-slate-500 font-bold">XP Awarded:</span>
                    <span className="font-extrabold text-amber-600">+{activeComp.xpReward} XP</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-bold">Evaluation Status:</span>
                    <span className="font-extrabold text-indigo-700">Under MEA Faculty Review</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveComp(null)}
                  className="px-8 py-3 rounded-xl bg-[#0B3D91] hover:bg-[#082C6C] text-white font-extrabold text-xs shadow-md mx-auto block"
                >
                  Close & Return to Competitions
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
