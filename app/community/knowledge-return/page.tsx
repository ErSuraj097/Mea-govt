'use client';

import React from 'react';
import {
  Globe,
  BookOpen,
  Video,
  Award,
  ArrowRight,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

export default function KnowledgeReturnPage() {
  return (
    <div className="min-h-screen bg-[#F5F5F5] pb-16 text-left">
      {/* Top Header */}
      <div className="bg-[#0B3D91] text-white border-b border-[#082C6C] py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-3">
          <span className="px-2.5 py-0.5 rounded-sm bg-[#FF9933] text-[#051C45] text-[10px] font-black uppercase tracking-wider inline-block">
            KNOWLEDGE RETURN NETWORK • DIASPORA & SCHOLAR CONTRIBUTIONS
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Knowledge Return Network
          </h1>
          <p className="text-xs sm:text-sm text-slate-200 max-w-3xl leading-relaxed">
            Advanced international scholars and overseas experts contributing technical lectures, research summaries, and professional knowledge back to India in Indian languages.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        {/* Knowledge Cycle Diagram */}
        <div className="p-6 bg-white border border-[#DCE2E6] rounded-sm space-y-4 shadow-2xs">
          <h3 className="text-xs font-black text-[#0B3D91] uppercase tracking-wider">
            The Sovereign Knowledge-Return Cycle
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-center">
            {[
              { step: '1', title: 'Global Learner', desc: 'Enrolls in Indian language training' },
              { step: '2', title: 'Learn & Master', desc: 'Achieves CEFR B2/C1 proficiency' },
              { step: '3', title: 'Create Content', desc: 'Translates or authors academic papers' },
              { step: '4', title: 'Contribute Back', desc: 'Delivers lectures in Indian languages' },
              { step: '5', title: 'Enrich India', desc: 'Expands scientific repository in Hindi & Bhashas' },
            ].map((s) => (
              <div key={s.step} className="p-3 bg-[#EEF3F8] border border-[#D0DCE7] rounded-sm space-y-1">
                <span className="w-6 h-6 rounded-full bg-[#0B3D91] text-white font-bold text-xs inline-flex items-center justify-center">
                  {s.step}
                </span>
                <h4 className="text-xs font-black text-[#1B2A4A] mt-1">{s.title}</h4>
                <p className="text-[10px] text-[#555555] font-medium">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Scholar Contributions */}
        <div className="space-y-3">
          <h3 className="text-xs font-black text-[#0B3D91] uppercase tracking-wider">
            Featured International Scholar Contributions
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                title: 'Artificial Intelligence & Ethics Lecture in Hindi',
                scholar: 'Dr. Evelyn Reed (Oxford University)',
                field: 'Computer Science',
                lang: 'Hindi',
                desc: 'A 45-minute technical lecture delivered in formal Hindi discussing machine learning governance.'
              },
              {
                title: 'Quantum Physics Research Digest in Hindi & Devanagari',
                scholar: 'Prof. Kenji Takahashi (University of Tokyo)',
                field: 'Physics',
                lang: 'Hindi',
                desc: 'Simplified research summary on quantum computing translated into Hindi for Indian university students.'
              }
            ].map((c, idx) => (
              <div key={idx} className="p-5 bg-white border border-[#DCE2E6] hover:border-[#0B3D91] rounded-sm space-y-2 shadow-2xs transition">
                <span className="px-2 py-0.5 bg-blue-50 text-[#0B3D91] text-[9px] font-black uppercase rounded-sm border border-blue-200">
                  {c.field} • {c.lang}
                </span>
                <h4 className="text-sm font-black text-[#1B2A4A]">{c.title}</h4>
                <span className="text-xs text-slate-500 font-medium block">By <strong>{c.scholar}</strong></span>
                <p className="text-xs text-[#555555] font-medium leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
