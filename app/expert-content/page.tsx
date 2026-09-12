'use client';

import React from 'react';
import {
  Users2,
  Video,
  Award,
  BookOpen,
  Building2,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export default function ExpertContentPage() {
  const experts = [
    {
      name: 'Prof. Devendra Sharma',
      role: 'Senior Professor of Hindi Linguistics, KHS Agra',
      topic: 'Devanagari Phonetics & Retroflex Cadence Masterclass',
      institution: 'Kendriya Hindi Sansthan',
      duration: '45 Mins',
      badge: 'FACULTY MASTERCLASS'
    },
    {
      name: 'Amb. Rajesh Malhotra (Retd.)',
      role: 'Former High Commissioner & MEA Diplomatic Fellow',
      topic: 'Diplomatic Hindi Protocol & Formal Note Verbale Syntax',
      institution: 'Sushma Swaraj Institute of Foreign Service',
      duration: '50 Mins',
      badge: 'DIPLOMATIC LECTURE'
    },
    {
      name: 'Dr. Ananya Shastri',
      role: 'Chair of South Asian Studies, Delhi University',
      topic: 'Hindi Literature, Poetry & Bhakti Movement Cultural Context',
      institution: 'Delhi University',
      duration: '35 Mins',
      badge: 'CULTURAL EXPLAINER'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F5] pb-16 text-left">
      {/* Top Header */}
      <div className="bg-[#0B3D91] text-white border-b border-[#082C6C] py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-3">
          <span className="px-2.5 py-0.5 rounded-sm bg-[#FF9933] text-[#051C45] text-[10px] font-black uppercase tracking-wider inline-block">
            ACADEMIC FACULTY & DISTINGUISHED LINGUISTS
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Human Expert Content & Masterclasses
          </h1>
          <p className="text-xs sm:text-sm text-slate-200 max-w-3xl leading-relaxed">
            Learn directly from university professors, senior Indian diplomats, and distinguished Hindi linguists through structured masterclasses and video lectures.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        {/* Notice Teaser */}
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-sm text-xs text-amber-950 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users2 className="w-4 h-4 text-[#0B3D91]" />
            <span>Human Expert Masterclasses work hand-in-hand with your 24/7 AI Voice Tutor.</span>
          </div>
          <span className="px-2 py-0.5 bg-[#0B3D91] text-white text-[10px] uppercase font-bold rounded-sm">Verified Faculty</span>
        </div>

        {/* Expert Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {experts.map((exp, idx) => (
            <div key={idx} className="bg-white border border-[#DCE2E6] hover:border-[#0B3D91] rounded-sm p-6 space-y-3 shadow-2xs transition flex flex-col justify-between">
              <div className="space-y-2">
                <span className="px-2 py-0.5 bg-blue-50 text-[#0B3D91] text-[9px] font-black uppercase rounded-sm border border-blue-200">
                  {exp.badge}
                </span>

                <h3 className="text-base font-black text-[#1B2A4A]">{exp.topic}</h3>
                <span className="text-xs text-slate-600 font-bold block">{exp.name}</span>
                <span className="text-[11px] text-[#555555] font-medium block">{exp.role}</span>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-semibold">{exp.duration} • Video</span>
                <button
                  onClick={() => alert(`Starting Masterclass by ${exp.name}`)}
                  className="px-3 py-1.5 bg-[#0B3D91] hover:bg-[#082C6C] text-white font-bold rounded-sm transition"
                >
                  Watch Lecture →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
