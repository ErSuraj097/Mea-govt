'use client';

import React, { useState } from 'react';
import {
  Mic,
  Volume2,
  RotateCcw,
  Sparkles,
  HelpCircle,
  CheckCircle2,
  MessageSquare,
  Bot
} from 'lucide-react';

export default function AIVoiceTutorPage() {
  const [isRecording, setIsRecording] = useState(false);
  const [scriptMode, setScriptMode] = useState<'roman' | 'native' | 'both'>('both');
  const [showFeedback, setShowFeedback] = useState(true);
  const [showExplanation, setShowExplanation] = useState(false);

  const mockDialogue = [
    {
      speaker: 'AI Tutor',
      native: 'नमस्ते! आपका स्वागत है। आप कैसे हैं?',
      roman: 'Namaste! Aapka swagat hai. Aap kaise hain?',
      english: 'Hello! Welcome. How are you?'
    },
    {
      speaker: 'Student (You)',
      native: 'नमस्ते! मैं अच्छा हूँ, धन्यवाद।',
      roman: 'Namaste! Main achha hoon, dhanyavaad.',
      english: 'Hello! I am good, thank you.'
    }
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16 text-left">
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-sm bg-gradient-to-r from-[#0B3D91] via-[#082C6C] to-[#051C45] text-white border-l-4 border-[#FF9933] shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="px-2.5 py-0.5 rounded-sm bg-[#FF9933] text-[#051C45] text-[10px] font-black uppercase tracking-wider inline-block">
            SPOKEN SPEECH & PRONUNCIATION
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
            Hindi AI Voice Tutor
          </h1>
          <p className="text-xs text-blue-100 font-medium max-w-xl mt-0.5">
            Practice conversational Hindi with instant pronunciation analysis, transliteration modes, and grammar feedback.
          </p>
        </div>

        {/* Script Toggle Controls */}
        <div className="flex items-center gap-1.5 bg-white/10 p-1.5 rounded-sm border border-white/20 shrink-0">
          <span className="text-[10px] font-bold text-slate-200 px-1">Script:</span>
          {(['roman', 'native', 'both'] as const).map((m) => (
            <button
              key={m}
              onClick={() => setScriptMode(m)}
              className={`px-2.5 py-1 text-[11px] font-extrabold uppercase rounded-sm transition ${
                scriptMode === m ? 'bg-[#FF9933] text-[#051C45]' : 'text-slate-200 hover:text-white'
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Main Conversation Window */}
      <div className="bg-white border border-[#DCE2E6] rounded-sm p-6 space-y-6 shadow-2xs">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-[#0B3D91]" />
            <h3 className="text-xs font-black text-[#1B2A4A] uppercase tracking-wider">
              Live Hindi Conversation Transcript
            </h3>
          </div>
          <span className="text-[10px] font-bold text-[#138808] flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#138808] animate-ping" /> Microphone Ready
          </span>
        </div>

        {/* Transcript Messages */}
        <div className="space-y-4 max-h-80 overflow-y-auto pr-1">
          {mockDialogue.map((d, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-sm border space-y-1.5 ${
                d.speaker.includes('Student')
                  ? 'bg-amber-50/60 border-amber-200 ml-6 text-left'
                  : 'bg-[#F8FAFC] border-[#DCE2E6] mr-6 text-left'
              }`}
            >
              <div className="flex justify-between items-center text-[10px] font-extrabold text-[#0B3D91]">
                <span>{d.speaker}</span>
                <button
                  onClick={() => {
                    if (typeof window !== 'undefined' && window.speechSynthesis) {
                      window.speechSynthesis.cancel();
                      const utt = new SpeechSynthesisUtterance(d.native);
                      utt.lang = 'hi-IN';
                      window.speechSynthesis.speak(utt);
                    }
                  }}
                  className="text-slate-500 hover:text-[#0B3D91] flex items-center gap-1 font-semibold"
                >
                  <Volume2 className="w-3.5 h-3.5" /> Listen
                </button>
              </div>

              {(scriptMode === 'native' || scriptMode === 'both') && (
                <div className="text-base font-bold text-[#1B2A4A]">{d.native}</div>
              )}
              {(scriptMode === 'roman' || scriptMode === 'both') && (
                <div className="text-xs font-semibold text-[#0B3D91] italic">{d.roman}</div>
              )}
              <div className="text-[11px] text-[#555555] font-medium">{d.english}</div>
            </div>
          ))}
        </div>

        {/* Microphone Interaction Box */}
        <div className="p-6 rounded-sm bg-[#EEF3F8] border border-[#D0DCE7] text-center space-y-3">
          <button
            onClick={() => setIsRecording(!isRecording)}
            className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center transition-transform shadow-md ${
              isRecording
                ? 'bg-rose-600 text-white animate-pulse scale-105'
                : 'bg-[#0B3D91] hover:bg-[#082C6C] text-white'
            }`}
          >
            <Mic className="w-8 h-8" />
          </button>

          <div>
            <div className="text-xs font-bold text-[#1B2A4A]">
              {isRecording ? 'Listening... Speak Hindi into your microphone now.' : 'Tap microphone to speak Hindi response'}
            </div>
            <div className="text-[10px] text-[#555555] mt-0.5">
              Say: &quot;नमस्ते! मैं अच्छा हूँ, धन्यवाद।&quot;
            </div>
          </div>
        </div>

        {/* Pronunciation Feedback Dashboard */}
        {showFeedback && (
          <div className="p-5 rounded-sm bg-[#F8FAFC] border border-[#DCE2E6] space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <h4 className="text-xs font-black text-[#0B3D91] uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#FF9933]" /> AI Pronunciation Analysis
              </h4>
              <span className="text-xs font-extrabold text-emerald-700">78% Overall Match</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-3 bg-white border border-slate-200 rounded-sm">
                <span className="text-[10px] text-slate-500 block uppercase font-bold">Pronunciation</span>
                <span className="text-sm font-black text-emerald-700">78%</span>
              </div>
              <div className="p-3 bg-white border border-slate-200 rounded-sm">
                <span className="text-[10px] text-slate-500 block uppercase font-bold">Fluency</span>
                <span className="text-sm font-black text-amber-700">64%</span>
              </div>
              <div className="p-3 bg-white border border-slate-200 rounded-sm">
                <span className="text-[10px] text-slate-500 block uppercase font-bold">Rhythm</span>
                <span className="text-sm font-black text-emerald-700">72%</span>
              </div>
              <div className="p-3 bg-white border border-slate-200 rounded-sm">
                <span className="text-[10px] text-slate-500 block uppercase font-bold">Vocabulary</span>
                <span className="text-sm font-black text-emerald-700">70%</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs">
              <button
                onClick={() => setIsRecording(true)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-[#1B2A4A] font-bold rounded-sm flex items-center gap-1.5 transition"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Try Again
              </button>

              <button
                onClick={() => setShowExplanation(!showExplanation)}
                className="px-4 py-2 bg-[#EEF3F8] hover:bg-[#D0DCE7] text-[#0B3D91] font-bold rounded-sm flex items-center gap-1.5 transition"
              >
                <HelpCircle className="w-3.5 h-3.5" /> Why this pronunciation score?
              </button>
            </div>

            {showExplanation && (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-sm text-xs text-amber-950 font-medium space-y-1">
                <strong className="block font-bold">Phonetic Tip:</strong>
                <p>
                  Ensure the retroflex consonant &apos;त&apos; in &apos;धन्यवाद&apos; (dhanyavaad) is pronounced softly with the tongue touching the upper teeth ridge.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
