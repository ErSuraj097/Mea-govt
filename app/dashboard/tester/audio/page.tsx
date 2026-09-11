'use client';

import React from 'react';
import { Headphones, Volume2, Play } from 'lucide-react';

export default function TesterAudioPage() {
  const speakText = (text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'hi-IN';
      window.speechSynthesis.speak(u);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs">
        <span className="px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-600 text-xs font-bold uppercase">
          Acoustic QA Test
        </span>
        <h1 className="text-2xl font-black text-slate-900 mt-1">Audio Synthesis & Pronunciation Testing</h1>
        <p className="text-xs text-slate-500 font-medium">Listen to TTS speech synthesis audio output across lesson vocabulary items.</p>
      </div>

      <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-xs">
        <h3 className="text-base font-bold text-slate-900">Audio Track Tester</h3>
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
          <div>
            <h4 className="text-xs font-bold text-slate-900">Vocabulary: &quot;शुभ प्रभात&quot; (Shubh Prabhat)</h4>
            <span className="text-[11px] text-slate-500">Audio Stream Rate: 0.85x</span>
          </div>
          <button
            onClick={() => speakText('शुभ प्रभात')}
            className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm"
          >
            <Volume2 className="w-4 h-4" /> Test TTS Playback
          </button>
        </div>
      </div>
    </div>
  );
}
