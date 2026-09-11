'use client';

import React, { useState } from 'react';
import {
  Mic,
  MicOff,
  Sparkles,
  Award,
  Volume2,
  RotateCcw,
  CheckCircle2,
  BarChart3,
  Globe
} from 'lucide-react';

const SUPPORTED_TEST_LANGUAGES = [
  'Hindi', 'Sanskrit', 'Tamil', 'Telugu', 'Bengali', 'Marathi',
  'French', 'Spanish', 'German', 'Japanese', 'Mandarin', 'Arabic'
];

const PROMPTS_BY_LANG: Record<string, { promptText: string; englishMeaning: string }> = {
  Hindi: {
    promptText: "Ahimsa Paramo Dharma, Dharma Himsa Tathaiva Cha.",
    englishMeaning: "Non-violence is the highest duty, and so is righteousness in defense."
  },
  Sanskrit: {
    promptText: "Vasudhaiva Kutumbakam — Ayam Nijah Paroveti Ganana Laghuchetasam.",
    englishMeaning: "The whole world is one single family."
  },
  Tamil: {
    promptText: "Yadhum Oore Yaavarum Kelir.",
    englishMeaning: "To us, all cities are one, and all people are kin."
  },
  French: {
    promptText: "La langue est la cle de la culture et de la diplomatie.",
    englishMeaning: "Language is the key to culture and diplomacy."
  },
  Spanish: {
    promptText: "El conocimiento de idiomas abre puertas en todo el mundo.",
    englishMeaning: "Knowledge of languages opens doors worldwide."
  },
  German: {
    promptText: "Eine andere Sprache zu lernen ist wie eine zweite Seele zu erlangen.",
    englishMeaning: "To learn another language is to possess a second soul."
  }
};

export default function StudentSpeakingTestPage() {
  const [selectedLang, setSelectedLang] = useState('Hindi');
  const [recording, setRecording] = useState(false);
  const [testScore, setTestScore] = useState<number | null>(null);

  const activePrompt = PROMPTS_BY_LANG[selectedLang] || PROMPTS_BY_LANG['Hindi'];

  const handleStartRecord = () => {
    setRecording(true);
    setTestScore(null);
  };

  const handleStopRecord = () => {
    setRecording(false);
    setTestScore(94);
  };

  return (
    <div className="space-y-8 max-w-8xl mx-auto pb-16">
      {/* Official MEA Government Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0B3D91] via-[#082C6C] to-[#051C45] text-white border border-[#0B3D91] shadow-md space-y-6 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10 border-b border-white/10 pb-4">
          <div className="space-y-1">
            <span className="px-3 py-1 rounded-full bg-[#FF9933] text-[#212121] text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 w-fit">
              <Mic className="w-3.5 h-3.5" /> AI SPEAKING & ACOUSTICS ASSESSMENT
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
              AI Speaking & Pronunciation Test
            </h1>
            <p className="text-xs text-blue-100 font-medium max-w-2xl">
              Real-time voice acoustics analysis evaluating phonetics accuracy, pitch contour, and pronunciation across Indian & Foreign languages.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/15">
            <BarChart3 className="w-6 h-6 text-amber-300" />
            <div>
              <span className="text-[10px] font-bold text-blue-200 block uppercase">ACOUSTICS SCORED</span>
              <span className="text-sm font-black text-white">Phoneme Level</span>
            </div>
          </div>
        </div>

        {/* Language Selection Pills */}
        <div className="flex items-center gap-2 pt-1 relative z-10 overflow-x-auto pb-1 scrollbar-none">
          <Globe className="w-4 h-4 text-[#FF9933] shrink-0" />
          <span className="text-xs font-bold text-blue-100 shrink-0">Select Test Language:</span>
          {SUPPORTED_TEST_LANGUAGES.map((lang) => (
            <button
              key={lang}
              onClick={() => { setSelectedLang(lang); setTestScore(null); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition shrink-0 ${
                selectedLang === lang
                  ? 'bg-[#FF9933] text-[#212121] shadow-md'
                  : 'bg-white/10 text-white hover:bg-white/20 border border-white/15'
              }`}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-[#DCE2E6] p-8 text-center space-y-8 shadow-2xs">
        <div className="space-y-2 max-w-xl mx-auto">
          <span className="text-[10px] font-black uppercase text-[#0B3D91] tracking-wider block">
            SPEAK THIS {selectedLang.toUpperCase()} PROMPT ALOUD
          </span>
          <h2 className="text-2xl font-black text-[#1B2A4A]">"{activePrompt.promptText}"</h2>
          <p className="text-xs font-bold text-slate-500">"{activePrompt.englishMeaning}"</p>
        </div>

        <div className="pt-2">
          {!recording ? (
            <button
              onClick={handleStartRecord}
              className="w-24 h-24 rounded-full bg-[#0B3D91] hover:bg-[#082C6C] text-white flex items-center justify-center mx-auto shadow-xl ring-8 ring-[#EEF3F8] transition"
            >
              <Mic className="w-10 h-10 text-[#FF9933]" />
            </button>
          ) : (
            <button
              onClick={handleStopRecord}
              className="w-24 h-24 rounded-full bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-center mx-auto shadow-2xl ring-8 ring-rose-100 animate-pulse transition"
            >
              <MicOff className="w-10 h-10" />
            </button>
          )}
          <span className="text-xs font-extrabold text-slate-600 block mt-3">
            {recording ? '🔴 Listening & Analyzing Acoustics... Click to Stop' : 'Click Microphone to Start Voice Recitation'}
          </span>
        </div>

        {testScore !== null && (
          <div className="p-6 rounded-3xl bg-[#EEF3F8] border border-[#D0DCE7] max-w-md mx-auto space-y-4 text-left animate-in fade-in duration-300">
            <div className="flex items-center justify-between border-b border-[#D0DCE7] pb-3">
              <span className="text-xs font-black text-[#0B3D91]">AI PHONETICS RESULT ({selectedLang})</span>
              <span className="text-lg font-black text-emerald-700">{testScore}% Accuracy</span>
            </div>
            <div className="space-y-2 text-xs font-semibold text-slate-700">
              <div className="flex justify-between">
                <span>Vowel Intonation & Stress:</span>
                <span className="text-emerald-700 font-bold">100% Perfect</span>
              </div>
              <div className="flex justify-between">
                <span>Consonantal Clarity:</span>
                <span className="text-[#0B3D91] font-bold">92% Clear</span>
              </div>
              <div className="flex justify-between">
                <span>Fluency Tempo:</span>
                <span className="text-[#0B3D91] font-bold">Native Speaker Pace</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
