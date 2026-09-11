'use client';

import React from 'react';
import { Layers, Plus, BookOpen } from 'lucide-react';
import { MOCK_LEVELS } from '@/lib/mockData';

export default function CreatorLevelsPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto text-left animate-in fade-in duration-200">
      <div className="p-6 bg-[#0C2340] border-l-4 border-[#F26522] text-white shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4 rounded-none">
        <div>
          <span className="px-2.5 py-0.5 bg-cyan-400/20 text-cyan-300 text-[10px] font-black uppercase tracking-wider border border-cyan-400/30">
            Linguist Curriculum Design
          </span>
          <h1 className="text-2xl font-black text-white mt-1">Course Structure & Lesson Map</h1>
          <p className="text-xs text-slate-300">Organize units, define vocabulary glossaries, and attach bilingual audio prompts.</p>
        </div>
        <button className="px-4 py-2 bg-[#F26522] hover:bg-[#d85517] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 rounded-none transition">
          <Plus className="w-4 h-4" /> Add New Unit
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {MOCK_LEVELS.map((lvl) => (
          <div key={lvl.id} className="p-6 bg-white border border-slate-200 border-t-2 border-t-[#0C2340] space-y-3 shadow-xs rounded-none">
            <div className="flex justify-between items-center">
              <span className="px-2.5 py-0.5 bg-cyan-50 text-cyan-700 text-[10px] font-black uppercase">
                Level {lvl.id} • CEFR {lvl.cefr}
              </span>
              <span className="text-xs font-bold text-slate-500">{lvl.lessons.length} Published Lessons</span>
            </div>

            <h3 className="text-base font-black text-slate-900">{lvl.titleEng} ({lvl.titleHindi})</h3>

            <div className="pt-2 space-y-2">
              {lvl.lessons.map((ls) => (
                <div key={ls.id} className="p-2.5 bg-slate-50 border border-slate-200 flex justify-between items-center text-xs">
                  <div>
                    <h5 className="font-bold text-slate-900">{ls.titleEng}</h5>
                    <span className="text-[11px] text-[#F26522] font-semibold">{ls.titleHindi}</span>
                  </div>
                  <button className="px-2.5 py-1 bg-white border border-slate-300 text-[10px] font-bold uppercase hover:bg-slate-100">
                    Edit Unit
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
