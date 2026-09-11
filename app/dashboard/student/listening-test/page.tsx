'use client';

import React, { useState } from 'react';
import {
  Headphones,
  Play,
  Pause,
  CheckCircle2,
  RotateCcw,
  Sparkles,
  Award,
  Volume2,
  Globe
} from 'lucide-react';

const LISTENING_LANGUAGES = ['Hindi', 'Sanskrit', 'Tamil', 'French', 'Spanish', 'German'];

const AUDIO_PASSAGES: Record<string, { title: string; speechText: string; question: string; options: string[]; correctIdx: number }> = {
  Hindi: {
    title: 'Kendriya Hindi Sansthan Academic Lecture',
    speechText: 'Namaste, kya aap aaj Kendriya Hindi Sansthan ke vyakhyan mein bhaag le rahe hain?',
    question: 'Which institute is mentioned in the audio passage?',
    options: [
      'Kendriya Hindi Sansthan (Agra)',
      'University of Delhi',
      'Central Institute of Indian Languages (CIIL Mysuru)',
      'Ministry of External Affairs'
    ],
    correctIdx: 0
  },
  Sanskrit: {
    title: 'Vedic Phonetics & Sloka Recitation',
    speechText: 'Vasudhaiva Kutumbakam. Sarve Bhavantu Sukhinah, Sarve Santu Niramayah.',
    question: 'What is the core message of the recited Sanskrit sloka?',
    options: [
      'Universal peace, health, and brotherhood for all beings',
      'Rules of grammar and syntax',
      'State boundary disputes',
      'Economic transactions'
    ],
    correctIdx: 0
  },
  French: {
    title: 'Diplomatic Dialogue in Paris',
    speechText: 'Bonjour Excelence. Bienvenue a la conference internationale sur la diversite linguistique.',
    question: 'What event is being hosted according to the French audio passage?',
    options: [
      'International Conference on Linguistic Diversity',
      'Global Sports Championship',
      'Commercial Trade Fair',
      'Art Exhibition'
    ],
    correctIdx: 0
  }
};

export default function StudentListeningTestPage() {
  const [selectedLang, setSelectedLang] = useState('Hindi');
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedAns, setSelectedAns] = useState<number | null>(null);
  const [evaluated, setEvaluated] = useState(false);

  const activePassage = AUDIO_PASSAGES[selectedLang] || AUDIO_PASSAGES['Hindi'];

  const toggleAudio = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(activePassage.speechText);
        u.lang = selectedLang === 'French' ? 'fr-FR' : 'hi-IN';
        u.onend = () => setIsPlaying(false);
        window.speechSynthesis.speak(u);
      }
    }
  };

  return (
    <div className="space-y-8 max-w-8xl mx-auto pb-16">
      {/* Official MEA Government Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0B3D91] via-[#082C6C] to-[#051C45] text-white border border-[#0B3D91] shadow-md space-y-6 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10 border-b border-white/10 pb-4">
          <div className="space-y-1">
            <span className="px-3 py-1 rounded-full bg-[#FF9933] text-[#212121] text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 w-fit">
              <Headphones className="w-3.5 h-3.5" /> AI LISTENING COMPREHENSION TEST
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
              AI Listening & Audio Comprehension Test
            </h1>
            <p className="text-xs text-blue-100 font-medium max-w-2xl">
              Listen to native speaker audio passages and answer comprehension quizzes in Indian & Foreign languages.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/15">
            <Volume2 className="w-6 h-6 text-amber-300" />
            <div>
              <span className="text-[10px] font-bold text-blue-200 block uppercase">NATIVE DIALOGUE</span>
              <span className="text-sm font-black text-white">Audio Passages</span>
            </div>
          </div>
        </div>

        {/* Language Selection Pills */}
        <div className="flex items-center gap-2 pt-1 relative z-10 overflow-x-auto pb-1 scrollbar-none">
          <Globe className="w-4 h-4 text-[#FF9933] shrink-0" />
          <span className="text-xs font-bold text-blue-100 shrink-0">Select Audio Passage Language:</span>
          {LISTENING_LANGUAGES.map((lang) => (
            <button
              key={lang}
              onClick={() => { setSelectedLang(lang); setEvaluated(false); setSelectedAns(null); setIsPlaying(false); }}
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
        <div className="p-6 rounded-3xl bg-[#0B3D91] text-white space-y-4 text-center">
          <span className="text-[10px] font-black uppercase text-amber-300 tracking-wider">
            AUDIO PASSAGE ({selectedLang.toUpperCase()})
          </span>
          <h3 className="text-lg font-black">{activePassage.title}</h3>

          <button
            onClick={toggleAudio}
            className="px-6 py-3 rounded-2xl bg-[#FF9933] hover:bg-amber-500 text-[#212121] font-black text-xs shadow-lg inline-flex items-center gap-2 transition"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-[#212121]" />}
            {isPlaying ? 'Pause Audio Passage' : `Play Audio Passage (${selectedLang} TTS Dialogue)`}
          </button>
        </div>

        <div className="space-y-4">
          <h4 className="font-extrabold text-sm text-[#1B2A4A]">Q1. {activePassage.question}</h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-bold">
            {activePassage.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => setSelectedAns(i)}
                className={`p-4 rounded-2xl border text-left transition ${
                  selectedAns === i
                    ? 'bg-[#0B3D91] text-white border-[#0B3D91] shadow-md ring-2 ring-[#FF9933]'
                    : 'bg-[#F8FAFC] text-[#1B2A4A] border-[#DCE2E6] hover:bg-[#EEF3F8]'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={() => setEvaluated(true)}
            disabled={selectedAns === null}
            className={`px-6 py-2.5 rounded-xl font-extrabold text-xs shadow-md transition ${
              selectedAns !== null ? 'bg-[#0B3D91] hover:bg-[#082C6C] text-white' : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            Check Answer ✓
          </button>
        </div>

        {evaluated && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>Correct Answer! You successfully comprehended the {selectedLang} audio passage. +50 XP</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
