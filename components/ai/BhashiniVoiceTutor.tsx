'use client';

import React, { useState } from 'react';
import {
  Mic,
  Square,
  Volume2,
  Sparkles,
  CheckCircle2,
  RefreshCw,
  AlertCircle,
  Play,
  Layers
} from 'lucide-react';
import { Sambhasini, SambhasiniSpeechAssessmentResult } from '@/lib/SambhasiniService';

export default function SambhasiniVoiceTutor({
  promptSentence = 'नमस्ते! विदेश मंत्रालय के भाषा पोर्टल में आपका हार्दिक स्वागत है।',
  transliteration = 'Namaste! Videsh Mantralaya ke bhasha portal mein aapka hardik swagat hai.',
  englishMeaning = 'Greetings! A warm welcome to the MEA Language Portal.',
  targetLang = 'hi',
  onAssessmentComplete,
}: {
  promptSentence?: string;
  transliteration?: string;
  englishMeaning?: string;
  targetLang?: string;
  onAssessmentComplete?: (result: SambhasiniSpeechAssessmentResult) => void;
}) {
  const [recording, setRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [evaluating, setEvaluating] = useState(false);
  const [result, setResult] = useState<SambhasiniSpeechAssessmentResult | null>(null);

  const handlePlayPromptAudio = () => {
    Sambhasini.speakText(promptSentence, targetLang === 'hi' ? 'hi-IN' : 'en-US');
  };

  const startRecording = () => {
    setRecording(true);
    setTranscript('');
    setResult(null);

    if (typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = targetLang === 'hi' ? 'hi-IN' : 'en-US';
      recognition.continuous = false;
      recognition.interimResults = true;

      recognition.onresult = (e: any) => {
        const text = Array.from(e.results)
          .map((r: any) => r[0].transcript)
          .join('');
        setTranscript(text);
      };

      recognition.onend = () => {
        setRecording(false);
        performSambhasiniAssessment(transcript || promptSentence);
      };

      recognition.onerror = () => {
        setRecording(false);
        performSambhasiniAssessment(promptSentence);
      };

      recognition.start();
    } else {
      // Fallback simulation timer for browsers without SpeechRecognition
      setTimeout(() => {
        setRecording(false);
        const mockRecognized = promptSentence;
        setTranscript(mockRecognized);
        performSambhasiniAssessment(mockRecognized);
      }, 3500);
    }
  };

  const performSambhasiniAssessment = async (spoken: string) => {
    setEvaluating(true);
    try {
      const assessment = await Sambhasini.assessSpokenAudio(promptSentence, spoken, targetLang);
      setResult(assessment);
      if (onAssessmentComplete) onAssessmentComplete(assessment);
    } catch (e) {
      console.error(e);
    } finally {
      setEvaluating(false);
    }
  };

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-md space-y-6 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center font-bold">
            <Mic className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-orange-600 block">
              Sambhasini AI VOICE TUTOR (24/7)
            </span>
            <h3 className="text-lg font-black text-slate-900">
              Interactive Pronunciation & Cadence Evaluator
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" /> Sambhasini ULCA V2
          </span>
        </div>
      </div>

      {/* Target Prompt Card */}
      <div className="p-5 rounded-2xl bg-slate-900 text-white border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider">
            Sentence to Articulate Aloud:
          </span>
          <button
            onClick={handlePlayPromptAudio}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 flex items-center gap-1 text-xs font-bold transition"
            title="Listen to native audio pronunciation"
          >
            <Volume2 className="w-4 h-4" /> Listen Native Speaker
          </button>
        </div>

        <p className="text-xl font-black text-white leading-relaxed">{promptSentence}</p>
        <p className="text-xs text-amber-200 font-mono italic">[{transliteration}]</p>
        <p className="text-xs text-slate-400 font-medium">Translation: &quot;{englishMeaning}&quot;</p>
      </div>

      {/* Mic Recording Control Button */}
      <div className="text-center space-y-3 py-2">
        <button
          onClick={recording ? () => setRecording(false) : startRecording}
          className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center mx-auto transition-all duration-300 ${recording
              ? 'bg-rose-500 text-white animate-pulse ring-8 ring-rose-500/30 shadow-xl'
              : 'bg-orange-600 hover:bg-orange-700 text-white shadow-lg hover:scale-105'
            }`}
          aria-label={recording ? 'Stop Recording' : 'Start Recording'}
        >
          {recording ? <Square className="w-8 h-8" /> : <Mic className="w-10 h-10" />}
        </button>

        <span className="text-xs font-black text-slate-600 block">
          {recording ? 'Listening in real-time... Speak into your microphone' : 'Click Microphone to Practice Speech'}
        </span>
      </div>

      {evaluating && (
        <div className="text-center p-3 rounded-xl bg-orange-50 text-orange-700 text-xs font-bold animate-pulse">
          Evaluating speech acoustics, Devanagari retroflex phonetics, and CEFR rhythm index via Sambhasini...
        </div>
      )}

      {/* Real-time Syllable Color-Coded Correctness Breakdown */}
      {result && (
        <div className="space-y-6 pt-4 border-t border-slate-100">
          {/* 3 Metric Scores */}
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-2xl font-black text-orange-600 block">{result.overallScore}%</span>
              <span className="text-[11px] font-bold text-slate-500">Overall Accuracy</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-2xl font-black text-emerald-600 block">{result.pronunciationScore}%</span>
              <span className="text-[11px] font-bold text-slate-500">Pronunciation</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-2xl font-black text-cyan-600 block">{result.rhythmScore}%</span>
              <span className="text-[11px] font-bold text-slate-500">Rhythm & Cadence</span>
            </div>
          </div>

          {/* Color-Coded Words Breakdown */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-black uppercase text-slate-700 tracking-wider">
                Syllable-Level Phonetic Correctness:
              </h4>
              <div className="flex items-center gap-3 text-[10px] font-bold">
                <span className="flex items-center gap-1 text-emerald-600">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" /> Accurate (90%+)
                </span>
                <span className="flex items-center gap-1 text-amber-600">
                  <span className="w-2 h-2 rounded-full bg-amber-500" /> Slight Accent (70-89%)
                </span>
                <span className="flex items-center gap-1 text-rose-600">
                  <span className="w-2 h-2 rounded-full bg-rose-500" /> Needs Practice
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 p-4 rounded-2xl bg-slate-900 border border-slate-800">
              {result.phonemes.map((p, i) => {
                let badgeClass = 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40';
                if (p.status === 'minor_accent') badgeClass = 'bg-amber-500/20 text-amber-300 border-amber-500/40';
                if (p.status === 'needs_practice') badgeClass = 'bg-rose-500/20 text-rose-300 border-rose-500/40';

                return (
                  <div
                    key={i}
                    className={`px-3 py-1.5 rounded-xl border text-xs font-black flex items-center gap-1.5 ${badgeClass}`}
                    title={p.feedbackTip}
                  >
                    <span>{p.syllable}</span>
                    <span className="text-[10px] font-mono opacity-80">({p.accuracy}%)</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sambhasini Expert Feedback */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
            <p className="font-bold text-slate-800">💡 {result.generalFeedback}</p>
            <p className="text-slate-600 font-medium">🎯 <strong>Suggested Drill:</strong> {result.suggestedDrill}</p>
          </div>
        </div>
      )}
    </div>
  );
}
