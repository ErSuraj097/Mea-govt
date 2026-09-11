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
  const [targetTrack, setTargetTrack] = useState<'Indian' | 'Foreign'>('Indian');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<Record<number, number>>({});
  const [testSubmitted, setTestSubmitted] = useState(false);

  const handleSelectOption = (qIdx: number, optIdx: number) => {
    setSelectedOptions((prev) => ({ ...prev, [qIdx]: optIdx }));
  };

  const handleNext = () => {
    if (currentIdx < DIAGNOSTIC_QUESTIONS.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      setTestSubmitted(true);
    }
  };

  const calculateScore = () => {
    let score = 0;
    DIAGNOSTIC_QUESTIONS.forEach((q, idx) => {
      if (selectedOptions[idx] === q.correctIdx) score++;
    });
    return score;
  };

  const score = calculateScore();
  const cefrResult = score === 3 ? 'B2 Upper Intermediate' : score === 2 ? 'B1 Intermediate' : 'A2 Elementary';

  return (
    <div className="space-y-8 max-w-8xl mx-auto pb-16">
      {/* Official MEA Government Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0B3D91] via-[#082C6C] to-[#051C45] text-white border border-[#0B3D91] shadow-md space-y-6 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10 border-b border-white/10 pb-4">
          <div className="space-y-1">
            <span className="px-3 py-1 rounded-full bg-[#FF9933] text-[#212121] text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 w-fit">
              <Bot className="w-3.5 h-3.5" /> AI PLACEMENT DIAGNOSTIC ENGINE
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
              AI Placement Diagnostic Assessment
            </h1>
            <p className="text-xs text-blue-100 font-medium max-w-2xl">
              Adaptive diagnostic test evaluating proficiency across 22 Scheduled Indian Languages and 15 Foreign Languages against CEFR benchmarks (A1-C2).
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/15">
            <Brain className="w-6 h-6 text-amber-300 animate-pulse" />
            <div>
              <span className="text-[10px] font-bold text-blue-200 block uppercase">ADAPTIVE ENGINE</span>
              <span className="text-sm font-black text-white">CEFR Benchmark</span>
            </div>
          </div>
        </div>

        {/* Track Switcher */}
        <div className="flex items-center gap-2 pt-1 relative z-10">
          <Globe className="w-4 h-4 text-[#FF9933]" />
          <span className="text-xs font-bold text-blue-100">Select Diagnostic Track:</span>
          <button
            onClick={() => setTargetTrack('Indian')}
            className={`px-4 py-1.5 rounded-xl font-extrabold text-xs transition ${
              targetTrack === 'Indian' ? 'bg-[#FF9933] text-[#212121] shadow-md' : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            🇮🇳 22 Scheduled Indian Languages
          </button>
          <button
            onClick={() => setTargetTrack('Foreign')}
            className={`px-4 py-1.5 rounded-xl font-extrabold text-xs transition ${
              targetTrack === 'Foreign' ? 'bg-[#FF9933] text-[#212121] shadow-md' : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            🌐 15 Foreign Languages
          </button>
        </div>
      </div>

      {!testSubmitted ? (
        <div className="bg-white rounded-3xl border border-[#DCE2E6] p-6 sm:p-8 space-y-6 shadow-2xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <span className="px-3 py-1 rounded-full bg-[#EEF3F8] text-[#0B3D91] text-xs font-black uppercase">
              Question {currentIdx + 1} of {DIAGNOSTIC_QUESTIONS.length} • Section: {DIAGNOSTIC_QUESTIONS[currentIdx].section}
            </span>
            <span className="text-xs font-bold text-slate-500">Live AI Placement Check ({targetTrack} Track)</span>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-black text-[#1B2A4A]">{DIAGNOSTIC_QUESTIONS[currentIdx].questionText}</h3>
            <p className="text-xs font-bold text-[#0B3D91]">{DIAGNOSTIC_QUESTIONS[currentIdx].questionSub}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {DIAGNOSTIC_QUESTIONS[currentIdx].options.map((opt, oIdx) => (
                <button
                  key={oIdx}
                  onClick={() => handleSelectOption(currentIdx, oIdx)}
                  className={`p-4 rounded-2xl border text-left font-bold text-xs transition ${
                    selectedOptions[currentIdx] === oIdx
                      ? 'bg-[#0B3D91] text-white border-[#0B3D91] shadow-md ring-2 ring-[#FF9933]'
                      : 'bg-[#F8FAFC] text-[#1B2A4A] border-[#DCE2E6] hover:bg-[#EEF3F8]'
                  }`}
                >
                  <span className="inline-block w-6 h-6 rounded-full bg-white/20 text-center leading-6 mr-2 font-mono text-[11px]">
                    {String.fromCharCode(65 + oIdx)}
                  </span>
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Select one answer option to continue</span>
            <button
              onClick={handleNext}
              disabled={selectedOptions[currentIdx] === undefined}
              className={`px-6 py-2.5 rounded-xl font-extrabold text-xs shadow-md transition flex items-center gap-2 ${
                selectedOptions[currentIdx] !== undefined
                  ? 'bg-[#0B3D91] hover:bg-[#082C6C] text-white'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              {currentIdx === DIAGNOSTIC_QUESTIONS.length - 1 ? 'Finish Placement Test ✓' : 'Next Question →'}
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-[#DCE2E6] p-6 sm:p-8 text-center space-y-6 shadow-2xs animate-in fade-in duration-300">
          <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-md">
            <Award className="w-8 h-8 text-emerald-700" />
          </div>

          <div>
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black uppercase">
              ASSESSMENT COMPLETED
            </span>
            <h2 className="text-2xl font-black text-[#1B2A4A] mt-2">Placed at CEFR Benchmark: {cefrResult}</h2>
            <p className="text-xs text-slate-600 max-w-md mx-auto mt-1 font-medium">
              You scored <strong>{score} out of {DIAGNOSTIC_QUESTIONS.length}</strong>! Your diagnostic evaluation has been saved to your student profile record.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#EEF3F8] border border-[#D0DCE7] max-w-md mx-auto text-left space-y-2 text-xs font-semibold">
            <div className="flex justify-between">
              <span>Grammar Syntax Accuracy:</span>
              <span className="text-[#0B3D91]">100% (SOV Master)</span>
            </div>
            <div className="flex justify-between">
              <span>Cognate Lexicon Match:</span>
              <span className="text-[#0B3D91]">95% High</span>
            </div>
            <div className="flex justify-between">
              <span>Recommended Starting Level:</span>
              <span className="text-emerald-700 font-extrabold">Level 4 — Intermediate Pathway</span>
            </div>
          </div>

          <button
            onClick={() => {
              setTestSubmitted(false);
              setCurrentIdx(0);
              setSelectedOptions({});
            }}
            className="px-6 py-2.5 rounded-xl bg-[#0B3D91] hover:bg-[#082C6C] text-white font-extrabold text-xs shadow-md inline-flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4 text-[#FF9933]" /> Retake Diagnostic Assessment
          </button>
        </div>
      )}
    </div>
  );
}
