'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  Volume2,
  CheckCircle2,
  XCircle,
  ArrowLeft,
  ArrowRight,
  Zap,
  Award,
  Sparkles,
  HelpCircle,
  Mic,
  RotateCcw,
  BookOpen,
  Check,
  Play,
  Layers,
  LayoutDashboard
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { findLessonById } from '@/lib/mockData';
import { addXpToUser } from '@/lib/lmsStore';

export default function DashboardLessonView({ lessonIdProp }: { lessonIdProp?: string }) {
  const searchParams = useSearchParams();
  const lessonId = lessonIdProp || searchParams.get('id') || 'les_1_1';
  const { lesson, level, prevLesson, nextLesson } = findLessonById(lessonId);

  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [earnedXp, setEarnedXp] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'learn' | 'practice' | 'quiz'>('learn');

  // Mic Speaking Practice Simulator State
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDone, setRecordingDone] = useState(false);
  const [scoreResult, setScoreResult] = useState<{ accuracy: number; fluency: number } | null>(null);

  // Audio Speech Synthesis
  const speakHindi = (text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'hi-IN';
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleQuizSubmit = (optIdx: number) => {
    setSelectedOption(optIdx);
    setIsAnswered(true);

    const isCorrect = optIdx === lesson.content.quizQuestions?.[0]?.correctAnswer;

    if (isCorrect) {
      addXpToUser(lesson.xpReward);
      setEarnedXp(lesson.xpReward);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const handleStartRecording = () => {
    setIsRecording(true);
    setRecordingDone(false);
    setScoreResult(null);

    setTimeout(() => {
      setIsRecording(false);
      setRecordingDone(true);
      const acc = Math.floor(Math.random() * 12) + 88;
      const flu = Math.floor(Math.random() * 10) + 90;
      setScoreResult({ accuracy: acc, fluency: flu });
      addXpToUser(15);
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.7 }
      });
    }, 2800);
  };

  return (
    <div className="max-w-8xl mx-auto space-y-6 animate-in fade-in duration-200">
      {/* Top Navigation Bar within Dashboard */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/student?tab=levels"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-extrabold text-slate-700 transition"
          >
            <ArrowLeft className="w-4 h-4 text-blue-600" /> Back to Pathway Levels
          </Link>
          <span className="text-slate-300">|</span>
          <span className="text-xs font-bold text-slate-700">
            {level?.titleHindi} ({level?.cefr})
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-extrabold border border-blue-200">
            Level {level?.id}
          </span>
          <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-extrabold border border-amber-200 flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 fill-amber-500 text-amber-500" /> +{lesson.xpReward} XP Reward
          </span>
        </div>
      </div>

      {/* Main Dashboard Lesson Container */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 space-y-6 shadow-xs">
        {/* Lesson Header Banner */}
        <div className="border-b border-slate-100 pb-6 space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-blue-100 text-blue-700">
              {lesson.type} MODULE
            </span>
            <span className="text-xs text-slate-500 font-bold">Duration: ~{lesson.durationMins} Mins</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
            {lesson.titleHindi}
          </h1>
          <h2 className="text-xs font-bold text-blue-600">{lesson.titleEng}</h2>

          <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100 text-xs text-slate-700 leading-relaxed mt-3 font-medium">
            <span className="font-extrabold text-blue-900 block mb-1">📘 Lesson Overview:</span>
            {lesson.content.introduction}
          </div>
        </div>

        {/* Interactive Tab Switcher */}
        <div className="flex rounded-2xl bg-slate-100 p-1 border border-slate-200 max-w-md">
          <button
            onClick={() => setActiveTab('learn')}
            className={`flex-1 py-2.5 rounded-xl font-extrabold text-xs flex items-center justify-center gap-2 transition ${
              activeTab === 'learn'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4" /> Vocab & Rules
          </button>
          <button
            onClick={() => setActiveTab('practice')}
            className={`flex-1 py-2.5 rounded-xl font-extrabold text-xs flex items-center justify-center gap-2 transition ${
              activeTab === 'practice'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Mic className="w-4 h-4" /> Voice Trainer
          </button>
          {lesson.content.quizQuestions && (
            <button
              onClick={() => setActiveTab('quiz')}
              className={`flex-1 py-2.5 rounded-xl font-extrabold text-xs flex items-center justify-center gap-2 transition ${
                activeTab === 'quiz'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <HelpCircle className="w-4 h-4" /> Quiz Assessment
            </button>
          )}
        </div>

        {/* TAB 1: LEARN (Vocabulary & Grammar Rules) */}
        {activeTab === 'learn' && (
          <div className="space-y-6">
            {/* Rules Callout */}
            {lesson.content.rules && lesson.content.rules.length > 0 && (
              <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2">
                <h3 className="text-xs font-black uppercase text-amber-900 tracking-wider flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-600" /> Essential Grammar & Syntax Rules
                </h3>
                <ul className="space-y-1.5">
                  {lesson.content.rules.map((rule, idx) => (
                    <li key={idx} className="text-xs text-amber-950 font-bold flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Vocabulary Grid */}
            {lesson.content.vocabulary && lesson.content.vocabulary.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-black uppercase text-slate-900 tracking-wider flex items-center gap-2">
                    <Volume2 className="w-4 h-4 text-blue-600" /> Devanagari Vocabulary (Click Speaker for Audio)
                  </h3>
                  <span className="text-[11px] text-slate-400 font-bold">
                    {lesson.content.vocabulary.length} Words
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {lesson.content.vocabulary.map((v, i) => (
                    <div
                      key={i}
                      onClick={() => speakHindi(v.hindi)}
                      className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-400 transition cursor-pointer text-center space-y-2 group shadow-2xs hover:bg-blue-50/40"
                    >
                      <div className="text-3xl font-black text-blue-600 group-hover:scale-110 transition">
                        {v.hindi}
                      </div>
                      <div className="text-xs font-bold text-slate-900">{v.transliteration}</div>
                      <div className="text-[11px] text-slate-500 font-medium">{v.english}</div>
                      <button className="mt-1 inline-flex items-center gap-1.5 text-[10px] font-bold text-blue-700 bg-blue-100 px-2.5 py-0.5 rounded-full group-hover:bg-blue-600 group-hover:text-white transition">
                        <Volume2 className="w-3 h-3" /> Audio
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Sample Sentences */}
            {lesson.content.sampleSentences && lesson.content.sampleSentences.length > 0 && (
              <div className="space-y-3 pt-3 border-t border-slate-100">
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                  Conversational Dialogue Examples
                </h3>
                <div className="space-y-2">
                  {lesson.content.sampleSentences.map((s, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4"
                    >
                      <div>
                        <p className="text-sm font-bold text-slate-900">{s.hindi}</p>
                        <p className="text-xs text-slate-500 font-medium">{s.english}</p>
                      </div>
                      <button
                        onClick={() => speakHindi(s.hindi)}
                        className="p-2.5 rounded-xl bg-white hover:bg-blue-600 hover:text-white text-blue-600 border border-slate-200 transition shrink-0 shadow-2xs"
                        title="Pronounce Sentence"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: SPEAKING PRACTICE */}
        {activeTab === 'practice' && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-4">
              <div className="inline-flex p-3 rounded-2xl bg-blue-100 text-blue-600 mb-1">
                <Mic className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-black text-slate-900">AI Speech & Pronunciation Trainer</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto font-medium">
                Click the microphone button and read the Hindi phrase aloud to receive instant acoustic evaluation.
              </p>

              {/* Target Phrase */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200 max-w-md mx-auto space-y-2 shadow-2xs">
                <span className="text-[10px] font-bold uppercase text-slate-400">Target Expression:</span>
                <p className="text-2xl font-black text-blue-600">
                  {lesson.content.sampleSentences?.[0]?.hindi || lesson.content.vocabulary?.[0]?.hindi || 'नमस्ते!'}
                </p>
                <button
                  onClick={() => speakHindi(lesson.content.sampleSentences?.[0]?.hindi || lesson.content.vocabulary?.[0]?.hindi || 'नमस्ते!')}
                  className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800"
                >
                  <Volume2 className="w-3.5 h-3.5" /> Listen Audio
                </button>
              </div>

              {/* Mic Controls */}
              <div className="pt-2 flex flex-col items-center gap-3">
                <button
                  onClick={handleStartRecording}
                  disabled={isRecording}
                  className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${
                    isRecording
                      ? 'bg-rose-600 text-white animate-pulse scale-110 shadow-rose-600/30'
                      : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/30 hover:scale-105'
                  }`}
                >
                  <Mic className="w-8 h-8" />
                </button>
                <span className="text-xs font-extrabold text-slate-700">
                  {isRecording ? 'Listening... Speak now!' : recordingDone ? 'Evaluation completed!' : 'Tap Mic to Start Voice Check'}
                </span>
              </div>

              {/* Score Results */}
              {scoreResult && (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 max-w-md mx-auto space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-emerald-800 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Pronunciation Score:
                    </span>
                    <span className="text-amber-800 bg-amber-100 px-2 py-0.5 rounded font-black">
                      +15 XP Earned
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-center">
                    <div className="p-2.5 rounded-xl bg-white border border-emerald-200">
                      <span className="text-[10px] text-slate-400 block font-bold">ACCURACY</span>
                      <span className="text-xl font-black text-emerald-600">{scoreResult.accuracy}%</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white border border-emerald-200">
                      <span className="text-[10px] text-slate-400 block font-bold">FLUENCY</span>
                      <span className="text-xl font-black text-blue-600">{scoreResult.fluency}%</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: QUIZ ASSESSMENT */}
        {activeTab === 'quiz' && lesson.content.quizQuestions && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-5">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <h3 className="text-xs font-black text-slate-900 uppercase flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-amber-600" /> Module Knowledge Assessment
                </h3>
                <span className="text-xs font-extrabold text-blue-600">Reward: +{lesson.xpReward} XP</span>
              </div>

              <p className="text-base font-extrabold text-slate-900">
                {lesson.content.quizQuestions[0].question}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {lesson.content.quizQuestions[0].options.map((opt, i) => {
                  const isCorrect = i === lesson.content.quizQuestions?.[0].correctAnswer;
                  const isSelected = selectedOption === i;

                  return (
                    <button
                      key={i}
                      disabled={isAnswered}
                      onClick={() => handleQuizSubmit(i)}
                      className={`p-4 rounded-2xl text-left font-bold text-xs transition border ${
                        isSelected
                          ? isCorrect
                            ? 'bg-emerald-100 text-emerald-900 border-emerald-400'
                            : 'bg-rose-100 text-rose-900 border-rose-400'
                          : 'bg-white text-slate-800 border-slate-200 hover:border-blue-400 shadow-2xs'
                      }`}
                    >
                      <span className="text-slate-400 mr-2 font-mono">{String.fromCharCode(65 + i)}.</span>
                      {opt}
                    </button>
                  );
                })}
              </div>

              {isAnswered && (
                <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2">
                  <p className="text-xs font-bold text-emerald-700 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> Explanation: {lesson.content.quizQuestions[0].explanation}
                  </p>
                  {earnedXp && (
                    <div className="p-2.5 rounded-xl bg-amber-100 text-amber-900 text-xs font-black flex items-center gap-2 border border-amber-300">
                      <Zap className="w-4 h-4 fill-amber-600 text-amber-600" /> Great Job! +{earnedXp} XP Added to your profile!
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Dashboard Lesson Bottom Navigation Bar */}
        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          {prevLesson ? (
            <Link
              href={`/dashboard/student?tab=lesson&id=${prevLesson.id}`}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-2 transition"
            >
              <ArrowLeft className="w-4 h-4 text-blue-600" /> Previous: {prevLesson.titleHindi}
            </Link>
          ) : (
            <div />
          )}

          {nextLesson ? (
            <Link
              href={`/dashboard/student?tab=lesson&id=${nextLesson.id}`}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs flex items-center justify-center gap-2 transition shadow-sm"
            >
              Next Lesson: {nextLesson.titleHindi} <ArrowRight className="w-4 h-4" />
            </Link>
          ) : (
            <Link
              href="/dashboard/student?tab=levels"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs flex items-center justify-center gap-2 transition shadow-sm"
            >
              <Check className="w-4 h-4" /> Level Completed — Return to Pathway
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
