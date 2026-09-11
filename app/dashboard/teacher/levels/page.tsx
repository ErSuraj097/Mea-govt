'use client';

import React from 'react';
import { Layers, BookOpen, CheckCircle2, Award, ArrowRight } from 'lucide-react';
import { MOCK_LEVELS } from '@/lib/mockData';

export default function TeacherLevelsPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto text-left animate-in fade-in duration-200">
      <div className="p-6 bg-[#0C2340] border-l-4 border-[#F26522] text-white shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4 rounded-none">
        <div>
          <span className="px-2.5 py-0.5 bg-blue-400/20 text-blue-300 text-[10px] font-black uppercase tracking-wider border border-blue-400/30">
            Faculty Curriculum Matrix
          </span>
          <h1 className="text-2xl font-black text-white mt-1">CEFR Levels & Syllabus Framework</h1>
          <p className="text-xs text-slate-300">Inspect pedagogical lesson structures, learning objectives, and CEFR A1-B2 benchmarks.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {MOCK_LEVELS.map((lvl) => (
          <div key={lvl.id} className="p-6 bg-white border border-slate-200 border-t-2 border-t-[#0C2340] space-y-3 shadow-xs rounded-none">
            <div className="flex justify-between items-center">
              <span className="px-2.5 py-0.5 bg-orange-50 text-[#F26522] text-[10px] font-black uppercase tracking-wider border border-orange-200">
                Level {lvl.id} • CEFR {lvl.cefr}
              </span>
              <span className="text-xs font-bold text-slate-500">{lvl.lessons.length} Modules</span>
            </div>

            <div>
              <h3 className="text-base font-black text-slate-900">{lvl.titleEng} ({lvl.titleHindi})</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">{lvl.description}</p>
            </div>

            <div className="pt-3 border-t border-slate-100 space-y-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Assigned Lessons:</span>
              <div className="space-y-1.5">
                {lvl.lessons.map((ls) => (
                  <div key={ls.id} className="p-2 bg-slate-50 border border-slate-100 flex justify-between items-center text-xs">
                    <span className="font-bold text-slate-800">{ls.titleEng} ({ls.titleHindi})</span>
                    <span className="text-slate-500 font-mono text-[11px]">{ls.durationMins} mins</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
