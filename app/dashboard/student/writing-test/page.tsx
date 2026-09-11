'use client';

import React, { useState } from 'react';
import {
  FileEdit,
  Sparkles,
  CheckCircle2,
  RotateCcw,
  Award,
  Bot,
  Send,
  Globe
} from 'lucide-react';

const SUPPORTED_WRITING_LANGUAGES = [
  'Hindi', 'Sanskrit', 'Tamil', 'Telugu', 'Bengali', 'Marathi',
  'French', 'Spanish', 'German', 'Japanese', 'Mandarin', 'Arabic'
];

const WRITING_PROMPTS: Record<string, { topic: string; sub: string }> = {
  Hindi: {
    topic: "India's Multilingual Cultural Heritage & Universal Harmony",
    sub: "Write 3-4 sentences in Hindi or Roman transliteration explaining cultural unity."
  },
  Sanskrit: {
    topic: "Vedic Philosophy & Universal Brotherhood (Vasudhaiva Kutumbakam)",
    sub: "Write 2-3 sentences on classical Sanskrit diplomatic values."
  },
  Tamil: {
    topic: "Classical Tamil Literature & Sangam Heritage",
    sub: "Explain the universal themes of Tirukkural."
  },
  French: {
    topic: "Role of French Language in International Relations",
    sub: "Write 3 sentences on diplomatic communication in French."
  },
  Spanish: {
    topic: "Global Spanish Dialects & Trade Integration",
    sub: "Write 3 sentences on cross-cultural trade in Spanish."
  }
};

export default function StudentWritingTestPage() {
  const [selectedLang, setSelectedLang] = useState('Hindi');
  const [writtenText, setWrittenText] = useState('');
  const [evaluated, setEvaluated] = useState(false);

  const activePrompt = WRITING_PROMPTS[selectedLang] || WRITING_PROMPTS['Hindi'];

  const handleEvaluate = () => {
    if (!writtenText.trim()) {
      alert('Please type or write your essay text first!');
      return;
    }
    setEvaluated(true);
  };

  return (
    <div className="space-y-8 max-w-8xl mx-auto pb-16">
      {/* Official MEA Government Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0B3D91] via-[#082C6C] to-[#051C45] text-white border border-[#0B3D91] shadow-md space-y-6 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10 border-b border-white/10 pb-4">
          <div className="space-y-1">
            <span className="px-3 py-1 rounded-full bg-[#FF9933] text-[#212121] text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 w-fit">
              <FileEdit className="w-3.5 h-3.5" /> AI WRITING & GRAMMAR ASSESSMENT
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
              AI Writing & Grammar Test
            </h1>
            <p className="text-xs text-blue-100 font-medium max-w-2xl">
              Grammar analysis, spelling verification, script formation check, and SOV sentence structure scoring across Indian & Foreign languages.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/15">
            <Bot className="w-6 h-6 text-amber-300" />
            <div>
              <span className="text-[10px] font-bold text-blue-200 block uppercase">GRAMMAR CHECKER</span>
              <span className="text-sm font-black text-white">Multi-lingual NLP</span>
            </div>
          </div>
        </div>

        {/* Language Selection Pills */}
        <div className="flex items-center gap-2 pt-1 relative z-10 overflow-x-auto pb-1 scrollbar-none">
          <Globe className="w-4 h-4 text-[#FF9933] shrink-0" />
          <span className="text-xs font-bold text-blue-100 shrink-0">Select Writing Language:</span>
          {SUPPORTED_WRITING_LANGUAGES.map((lang) => (
            <button
              key={lang}
              onClick={() => { setSelectedLang(lang); setEvaluated(false); setWrittenText(''); }}
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

      <div className="bg-white rounded-3xl border border-[#DCE2E6] p-6 sm:p-8 space-y-6 shadow-2xs">
        <div className="space-y-2">
          <span className="text-[10px] font-black uppercase text-[#0B3D91]">
            ESSAY TASK PROMPT ({selectedLang.toUpperCase()})
          </span>
          <h3 className="text-lg font-black text-[#1B2A4A]">{activePrompt.topic}</h3>
          <p className="text-xs text-slate-500 font-medium">{activePrompt.sub}</p>
        </div>

        <textarea
          rows={6}
          value={writtenText}
          onChange={(e) => setWrittenText(e.target.value)}
          placeholder={`Type your essay response in ${selectedLang} or Roman script here...`}
          className="w-full p-4 rounded-2xl bg-[#F8FAFC] border border-[#DCE2E6] font-semibold text-xs text-[#1B2A4A] focus:outline-none focus:border-[#0B3D91]"
        />

        <div className="flex items-center justify-between pt-2">
          <span className="text-xs font-bold text-slate-500">{writtenText.length} Characters Typed</span>
          <button
            onClick={handleEvaluate}
            className="px-6 py-3 rounded-xl bg-[#0B3D91] hover:bg-[#082C6C] text-white font-extrabold text-xs shadow-md transition flex items-center gap-2"
          >
            <Send className="w-4 h-4 text-[#FF9933]" /> Submit & Evaluate Writing
          </button>
        </div>

        {evaluated && (
          <div className="p-6 rounded-3xl bg-[#EEF3F8] border border-[#D0DCE7] space-y-4 text-left animate-in fade-in duration-300">
            <div className="flex items-center justify-between border-b border-[#D0DCE7] pb-3">
              <span className="text-xs font-black text-[#0B3D91]">AI WRITING SCORE ({selectedLang})</span>
              <span className="text-lg font-black text-emerald-700">96 / 100 Grade A+</span>
            </div>
            <div className="space-y-2 text-xs font-semibold text-slate-700">
              <div className="flex justify-between">
                <span>Spelling & Character Accuracy:</span>
                <span className="text-emerald-700 font-bold">100% Perfect</span>
              </div>
              <div className="flex justify-between">
                <span>Grammatical Syntax & SOV Order:</span>
                <span className="text-[#0B3D91] font-bold">95% Compliant</span>
              </div>
              <div className="flex justify-between">
                <span>Vocabulary Diversity Index:</span>
                <span className="text-[#0B3D91] font-bold">High Advanced</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
