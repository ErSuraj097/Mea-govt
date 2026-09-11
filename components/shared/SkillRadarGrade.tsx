'use client';

import React from 'react';
import { Headphones, Mic, BookOpen, PenTool, Award, TrendingUp } from 'lucide-react';
import { SkillSplitScore } from '@/lib/bidirectionalData';

export default function SkillRadarGrade({
  skills,
}: {
  skills: SkillSplitScore;
}) {
  const metrics = [
    {
      label: 'Listening (श्रवण)',
      score: skills.listening,
      icon: Headphones,
      color: 'bg-cyan-500',
      textColor: 'text-cyan-600',
      bgColor: 'bg-cyan-50',
      desc: 'Comprehension of native speed spoken dialogues & diplomatic briefings',
    },
    {
      label: 'Speaking (भाषण)',
      score: skills.speaking,
      icon: Mic,
      color: 'bg-orange-500',
      textColor: 'text-orange-600',
      bgColor: 'bg-orange-50',
      desc: 'Retroflex phonetic clarity, tone, and diplomatic conversational fluency',
    },
    {
      label: 'Reading (पठन)',
      score: skills.reading,
      icon: BookOpen,
      color: 'bg-emerald-500',
      textColor: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      desc: 'Devanagari script parsing, official communiques & newspaper syntax',
    },
    {
      label: 'Writing (लेखन)',
      score: skills.writing,
      icon: PenTool,
      color: 'bg-purple-500',
      textColor: 'text-purple-600',
      bgColor: 'bg-purple-50',
      desc: 'Grammatical postposition agreement ("ने" ergative), SOV sentence formation',
    },
  ];

  return (
    <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <span className="text-[10px] font-black uppercase text-orange-600 tracking-widest block">
            SKILL-SPLIT GRADING ENGINE (LSRW)
          </span>
          <h3 className="text-lg font-black text-slate-900">
            Four-Pillar Language Competency Profile
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-800 font-black text-xs flex items-center gap-1.5">
            <Award className="w-4 h-4 text-orange-600" /> CEFR Level: {skills.overallCEFR}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {metrics.map((m) => (
          <div key={m.label} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`p-2 rounded-xl ${m.bgColor} ${m.textColor}`}>
                  <m.icon className="w-4 h-4" />
                </div>
                <span className="text-xs font-black text-slate-900">{m.label}</span>
              </div>
              <span className={`text-sm font-black ${m.textColor}`}>{m.score}%</span>
            </div>

            <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
              <div
                className={`h-full ${m.color} rounded-full transition-all duration-500`}
                style={{ width: `${m.score}%` }}
              />
            </div>

            <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
              {m.desc}
            </p>
          </div>
        ))}
      </div>

      <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 font-medium flex items-center justify-between">
        <span>📅 Last Diagnostic Assessed: <strong>{skills.lastAssessed}</strong></span>
        <span className="font-bold text-orange-700">Separate CEFR Transcripts Available</span>
      </div>
    </div>
  );
}
