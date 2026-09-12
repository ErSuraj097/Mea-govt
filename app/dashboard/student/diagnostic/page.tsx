'use client';

import React, { useState } from 'react';
import {
  FileCheck2,
  Brain,
  Sparkles,
  CheckCircle2,
  Play,
  RotateCcw,
  Award,
  BarChart3,
  Bot,
  Zap,
  ArrowRight,
  Globe
} from 'lucide-react';

interface DiagnosticQuestion {
  id: number;
  section: 'Grammar Syntax' | 'Cognate Lexicon' | 'Diplomatic Translation';
  questionText: string;
  questionSub: string;
  options: string[];
  correctIdx: number;
}

const DIAGNOSTIC_QUESTIONS: DiagnosticQuestion[] = [
  {
    id: 1,
    section: 'Grammar Syntax',
    questionText: 'Select the grammatically accurate Subject-Object-Verb (SOV) order:',
    questionSub: 'Which sentence correctly positions the verb at the clause end?',
    options: [
      'Aarav Pustak Padhta Hai (Aarav book reads)',
      'Aarav Padhta Hai Pustak (Aarav reads book)',
      'Padhta Hai Pustak Aarav (Reads book Aarav)',
      'Pustak Aarav Hai Padhta (Book Aarav is reads)'
    ],
    correctIdx: 0
  },
  {
    id: 2,
    section: 'Cognate Lexicon',
    questionText: 'Identify the shared cognate root for "Vision / Eye / Sight":',
    questionSub: 'What is the Indo-Aryan / Dravidian root cognate?',
    options: ['Nayan / Netra (Vision)', 'Hasta (Hand)', 'Pada (Foot)', 'Kantha (Throat)'],
    correctIdx: 0
  },
  {
    id: 3,
    section: 'Diplomatic Translation',
    questionText: 'Select the official diplomatic translation for: "Welcome to India"',
    questionSub: 'Choose the standard formal greeting:',
    options: [
      'Bharat Mein Aapka Swagat Hai (Welcome to India)',
      'Aap Bharat Aao (Come to India)',
      'Swagat Bharat Hai (Welcome is India)',
      'Bharat Achha Hai (India is good)'
    ],
    correctIdx: 0
  }
];

export default function PlacementDiagnosticPage() {
  const [step, setStep] = useState<'onboarding' | 'assessment' | 'results'>('onboarding');
  
  // Onboarding Step state
  const [onboardStep, setOnboardStep] = useState(1);
  const [userRole, setUserRole] = useState('Foreign Student');
  const [targetLang, setTargetLang] = useState('Hindi');
  const [goalTrack, setGoalTrack] = useState('Cultural Exchange');
  const [scriptPref, setScriptPref] = useState<'roman' | 'native' | 'both'>('both');
  const [proficiency, setProficiency] = useState('I don\'t know my level');

  // Question Step state
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<Record<number, number>>({});

  const learnerRoles = [
    'NRI / PIO',
    'Foreign Student',
    'Foreign Language Expert',
    'Researcher',
    'Teacher',
    'Indian Mission / Embassy',
    'Institution',
    'Other'
  ];

  const goals = [
    'Diplomatic Protocol',
    'Travel & Tourism',
    'Business & International Trade',
    'Cultural Exchange',
    'Academic / Research',
    'Personal / Family Connection',
    'Community & Heritage'
  ];

  const handleSelectOption = (qIdx: number, optIdx: number) => {
    setSelectedOptions((prev) => ({ ...prev, [qIdx]: optIdx }));
  };

  const handleNextQuestion = () => {
    if (currentIdx < DIAGNOSTIC_QUESTIONS.length - 1) {
      setCurrentIdx((prev: number) => prev + 1);
    } else {
      setStep('results');
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16 text-left">
      {/* Hero Banner */}
      <div className="p-6 sm:p-8 rounded-sm bg-gradient-to-r from-[#0B3D91] via-[#082C6C] to-[#051C45] text-white border-l-4 border-[#FF9933] shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <span className="px-2.5 py-0.5 rounded-sm bg-[#FF9933] text-[#051C45] text-[10px] font-black uppercase tracking-wider inline-block">
              HERO FEATURE • ADAPTIVE AI ENGINE
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
              Discover Your Language Level
            </h1>
            <p className="text-xs text-blue-100 font-medium max-w-2xl mt-0.5">
              Let AI assess your Hindi skills across Listening, Speaking, Reading & Writing, and generate a learning path designed for you.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white/10 px-4 py-2.5 rounded-sm border border-white/15 shrink-0">
            <Brain className="w-6 h-6 text-amber-300 animate-pulse" />
            <div>
              <span className="text-[10px] font-bold text-blue-200 block uppercase">CEFR BENCHMARK</span>
              <span className="text-sm font-black text-white">LSRW 4-Skill Check</span>
            </div>
          </div>
        </div>
      </div>

      {/* Step 1: Onboarding Flow */}
      {step === 'onboarding' && (
        <div className="bg-white border border-[#DCE2E6] rounded-sm p-6 sm:p-8 space-y-6 shadow-2xs">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#0B3D91] text-white font-bold text-xs flex items-center justify-center">
                {onboardStep}
              </span>
              <h3 className="font-extrabold text-sm text-[#1B2A4A]">
                {onboardStep === 1 && 'Step 1 — Who are you?'}
                {onboardStep === 2 && 'Step 2 — What language do you want to learn?'}
                {onboardStep === 3 && 'Step 3 — Why do you want to learn?'}
                {onboardStep === 4 && 'Step 4 — Select script preference'}
                {onboardStep === 5 && 'Step 5 — Select current proficiency'}
              </h3>
            </div>
            <span className="text-xs text-[#555555] font-semibold">Step {onboardStep} of 5</span>
          </div>

          {onboardStep === 1 && (
            <div className="space-y-4">
              <p className="text-xs text-[#555555]">Select your background or global learner category:</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {learnerRoles.map((role) => (
                  <button
                    key={role}
                    onClick={() => setUserRole(role)}
                    className={`p-3 rounded-sm border text-left text-xs font-bold transition ${
                      userRole === role
                        ? 'bg-[#0B3D91] text-white border-[#082C6C] ring-2 ring-[#FF9933]'
                        : 'bg-[#F8FAFC] text-[#1B2A4A] border-[#DCE2E6] hover:bg-[#EEF3F8]'
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>
          )}

          {onboardStep === 2 && (
            <div className="space-y-4">
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-sm text-xs font-bold text-emerald-950 flex items-center justify-between">
                <span>🇮🇳 Hindi (Phase 1 Available Now)</span>
                <span className="px-2 py-0.5 bg-emerald-700 text-white text-[10px] uppercase rounded-sm">Active Now</span>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-[#555555]">Upcoming 21 Indian Languages (Language Pack Architecture):</span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {['Assamese', 'Bengali', 'Bodo', 'Dogri', 'Gujarati', 'Kannada', 'Kashmiri', 'Konkani', 'Maithili', 'Malayalam', 'Marathi', 'Meitei', 'Nepali', 'Odia', 'Punjabi', 'Sanskrit', 'Santali', 'Sindhi', 'Tamil', 'Telugu', 'Urdu'].map((lang) => (
                    <div key={lang} className="p-2 bg-slate-50 border border-slate-200 rounded-sm text-[11px] font-semibold text-slate-500 flex justify-between items-center">
                      <span>{lang}</span>
                      <span className="text-[9px] text-amber-700 font-bold">Soon</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {onboardStep === 3 && (
            <div className="space-y-4">
              <p className="text-xs text-[#555555]">Select your primary goal track:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {goals.map((g) => (
                  <button
                    key={g}
                    onClick={() => setGoalTrack(g)}
                    className={`p-3.5 rounded-sm border text-left text-xs font-bold transition ${
                      goalTrack === g
                        ? 'bg-[#0B3D91] text-white border-[#082C6C] ring-2 ring-[#FF9933]'
                        : 'bg-[#F8FAFC] text-[#1B2A4A] border-[#DCE2E6] hover:bg-[#EEF3F8]'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>
          )}

          {onboardStep === 4 && (
            <div className="space-y-4">
              <p className="text-xs text-[#555555]">Choose script viewing preference:</p>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'roman', label: 'Romanized Transliteration', desc: 'Namaste, aap kaise hain?' },
                  { id: 'native', label: 'Native Script', desc: 'नमस्ते, आप कैसे हैं?' },
                  { id: 'both', label: 'Dual View (Recommended)', desc: 'नमस्ते (Namaste)' }
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setScriptPref(s.id as any)}
                    className={`p-3.5 rounded-sm border text-left space-y-1 transition ${
                      scriptPref === s.id
                        ? 'bg-[#0B3D91] text-white border-[#082C6C] ring-2 ring-[#FF9933]'
                        : 'bg-[#F8FAFC] text-[#1B2A4A] border-[#DCE2E6] hover:bg-[#EEF3F8]'
                    }`}
                  >
                    <div className="text-xs font-extrabold">{s.label}</div>
                    <div className="text-[11px] opacity-80 font-medium">{s.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {onboardStep === 5 && (
            <div className="space-y-4">
              <p className="text-xs text-[#555555]">Select estimated proficiency level:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {['Complete Beginner', 'Beginner', 'Intermediate', 'Advanced', 'I don\'t know my level'].map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setProficiency(lvl)}
                    className={`p-3.5 rounded-sm border text-left text-xs font-bold transition ${
                      proficiency === lvl
                        ? 'bg-[#0B3D91] text-white border-[#082C6C] ring-2 ring-[#FF9933]'
                        : 'bg-[#F8FAFC] text-[#1B2A4A] border-[#DCE2E6] hover:bg-[#EEF3F8]'
                    }`}
                  >
                    {lvl} {lvl === 'I don\'t know my level' && '✨ (Launches AI Diagnostic)'}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Onboarding Footer Actions */}
          <div className="pt-4 border-t border-slate-200 flex justify-between items-center">
            {onboardStep > 1 ? (
              <button
                onClick={() => setOnboardStep((prev: number) => prev - 1)}
                className="px-4 py-2 bg-slate-100 text-[#1B2A4A] font-bold text-xs rounded-sm hover:bg-slate-200 transition"
              >
                ← Previous Step
              </button>
            ) : <div />}

            {onboardStep < 5 ? (
              <button
                onClick={() => setOnboardStep((prev: number) => prev + 1)}
                className="px-5 py-2 bg-[#0B3D91] text-white font-extrabold text-xs rounded-sm hover:bg-[#082C6C] transition shadow-2xs"
              >
                Next Step →
              </button>
            ) : (
              <button
                onClick={() => setStep('assessment')}
                className="px-6 py-2.5 bg-[#FF9933] text-[#051C45] font-black text-xs uppercase tracking-wider rounded-sm hover:bg-[#E68A00] transition shadow-sm"
              >
                Launch AI Diagnostic Assessment →
              </button>
            )}
          </div>
        </div>
      )}

      {/* Step 2: Assessment Questions */}
      {step === 'assessment' && (
        <div className="bg-white border border-[#DCE2E6] rounded-sm p-6 sm:p-8 space-y-6 shadow-2xs">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <span className="px-3 py-1 bg-[#EEF3F8] text-[#0B3D91] text-xs font-black uppercase rounded-sm">
              Question {currentIdx + 1} of {DIAGNOSTIC_QUESTIONS.length} • Section: {DIAGNOSTIC_QUESTIONS[currentIdx].section}
            </span>
            <span className="text-xs font-bold text-[#138808]">Evaluating Listening, Speaking, Reading & Writing</span>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-black text-[#1B2A4A]">{DIAGNOSTIC_QUESTIONS[currentIdx].questionText}</h3>
            <p className="text-xs font-bold text-[#0B3D91]">{DIAGNOSTIC_QUESTIONS[currentIdx].questionSub}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {DIAGNOSTIC_QUESTIONS[currentIdx].options.map((opt: string, oIdx: number) => (
                <button
                  key={oIdx}
                  onClick={() => handleSelectOption(currentIdx, oIdx)}
                  className={`p-4 rounded-sm border text-left font-bold text-xs transition ${
                    selectedOptions[currentIdx] === oIdx
                      ? 'bg-[#0B3D91] text-white border-[#082C6C] shadow-xs ring-2 ring-[#FF9933]'
                      : 'bg-[#F8FAFC] text-[#1B2A4A] border-[#DCE2E6] hover:bg-[#EEF3F8]'
                  }`}
                >
                  <span className="inline-block w-5 h-5 rounded-full bg-white/20 text-center leading-5 mr-2 font-mono text-[10px]">
                    {String.fromCharCode(65 + oIdx)}
                  </span>
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">Select answer to proceed</span>
            <button
              onClick={handleNextQuestion}
              disabled={selectedOptions[currentIdx] === undefined}
              className={`px-6 py-2.5 rounded-sm font-extrabold text-xs transition ${
                selectedOptions[currentIdx] !== undefined
                  ? 'bg-[#0B3D91] hover:bg-[#082C6C] text-white shadow-xs'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              {currentIdx === DIAGNOSTIC_QUESTIONS.length - 1 ? 'Finish Assessment & View Skill Profile ✓' : 'Next Question →'}
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Results & Personalized Learning Path */}
      {step === 'results' && (
        <div className="bg-white border border-[#DCE2E6] rounded-sm p-6 sm:p-8 space-y-6 shadow-2xs text-left animate-in fade-in duration-300">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div>
              <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-900 text-[10px] font-black uppercase rounded-sm border border-emerald-200">
                DIAGNOSTIC COMPLETED
              </span>
              <h2 className="text-xl font-black text-[#1B2A4A] mt-1">Overall Level: A1 (Beginner)</h2>
              <p className="text-xs text-[#555555] font-medium">
                Goal Track: <strong>{goalTrack}</strong> • Learner Type: <strong>{userRole}</strong>
              </p>
            </div>
            <Award className="w-10 h-10 text-[#FF9933]" />
          </div>

          {/* LSRW Skill Breakdown Table */}
          <div className="space-y-2">
            <h4 className="text-xs font-black text-[#0B3D91] uppercase tracking-wider">LSRW Skill Breakdown</h4>
            <div className="border border-[#DCE2E6] rounded-sm overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-[#EEF3F8] text-[#0B3D91] font-bold border-b border-[#DCE2E6]">
                  <tr>
                    <th className="p-3">Skill Component</th>
                    <th className="p-3">Level Score</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-semibold text-[#1B2A4A]">
                  <tr>
                    <td className="p-3 flex items-center gap-2">🎧 Listening</td>
                    <td className="p-3 text-blue-700 font-bold">A1</td>
                    <td className="p-3 text-emerald-700 font-bold">On Track</td>
                  </tr>
                  <tr>
                    <td className="p-3 flex items-center gap-2">🗣️ Speaking</td>
                    <td className="p-3 text-amber-700 font-bold">Pre-A1</td>
                    <td className="p-3 text-amber-700 font-bold">Needs Practice</td>
                  </tr>
                  <tr>
                    <td className="p-3 flex items-center gap-2">📖 Reading</td>
                    <td className="p-3 text-blue-700 font-bold">A1</td>
                    <td className="p-3 text-emerald-700 font-bold">On Track</td>
                  </tr>
                  <tr>
                    <td className="p-3 flex items-center gap-2">✍️ Writing</td>
                    <td className="p-3 text-amber-700 font-bold">Pre-A1</td>
                    <td className="p-3 text-amber-700 font-bold">Needs Practice</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Personalized AI Roadmap */}
          <div className="p-5 rounded-sm bg-[#EEF3F8] border border-[#D0DCE7] space-y-3">
            <h4 className="text-xs font-black text-[#0B3D91] uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#FF9933]" /> Your Personalized AI Learning Path
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { step: '1', title: 'Greetings & Introductions', mins: '15 Mins' },
                { step: '2', title: 'Everyday Vocabulary', mins: '20 Mins' },
                { step: '3', title: 'Basic Sentence Formation', mins: '25 Mins' },
                { step: '4', title: 'Listening Practice', mins: '15 Mins' },
                { step: '5', title: 'Speaking Practice', mins: '20 Mins' },
                { step: '6', title: 'Cultural Context & Protocol', mins: '15 Mins' },
              ].map((path) => (
                <div key={path.step} className="p-3 bg-white border border-[#DCE2E6] rounded-sm space-y-1">
                  <div className="flex justify-between items-center text-[10px] font-extrabold text-[#0B3D91]">
                    <span>STAGE {path.step}</span>
                    <span className="text-slate-400">{path.mins}</span>
                  </div>
                  <div className="text-xs font-bold text-[#1B2A4A]">{path.title}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={() => {
                setStep('onboarding');
                setOnboardStep(1);
              }}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-[#1B2A4A] font-bold text-xs rounded-sm transition"
            >
              ← Retake Onboarding & Assessment
            </button>

            <a
              href="/dashboard/student"
              className="px-6 py-2.5 bg-[#FF9933] hover:bg-[#E68A00] text-[#051C45] font-black text-xs uppercase tracking-wider rounded-sm shadow-sm inline-flex items-center gap-2 transition"
            >
              Start My Learning Path →
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
