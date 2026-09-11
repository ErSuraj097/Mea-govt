'use client';

import React from 'react';
import { BookOpen, Plus, FileText, Upload } from 'lucide-react';
import { MOCK_LIBRARY } from '@/lib/mockData';

export default function CreatorLibraryPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto text-left animate-in fade-in duration-200">
      <div className="p-6 bg-[#0C2340] border-l-4 border-[#F26522] text-white shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4 rounded-none">
        <div>
          <span className="px-2.5 py-0.5 bg-cyan-400/20 text-cyan-300 text-[10px] font-black uppercase tracking-wider border border-cyan-400/30">
            Author Resource Studio
          </span>
          <h1 className="text-2xl font-black text-white mt-1">Supplementary E-Books & Audio Reference Vault</h1>
          <p className="text-xs text-slate-300">Upload Devanagari graded readers, grammar cheat sheets, and authentic diplomatic transcripts.</p>
        </div>
        <button className="px-4 py-2 bg-[#F26522] hover:bg-[#d85517] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 rounded-none transition">
          <Upload className="w-4 h-4" /> Upload Document
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {MOCK_LIBRARY.map((item) => (
          <div key={item.id} className="p-5 bg-white border border-slate-200 border-t-2 border-t-[#0C2340] space-y-3 shadow-xs rounded-none">
            <div className="flex justify-between items-center">
              <span className="px-2 py-0.5 bg-cyan-50 text-cyan-800 text-[9px] font-black uppercase">
                {item.fileFormat}
              </span>
              <span className="text-[10px] text-slate-500 font-bold">{item.category}</span>
            </div>

            <h3 className="text-sm font-black text-slate-900 leading-snug">{item.titleEng}</h3>
            <p className="text-xs text-[#F26522] font-semibold">{item.titleHindi}</p>
            <p className="text-xs text-slate-500">{item.author} • {item.pagesOrDuration}</p>

            <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-xs">
              <span className="text-slate-500 font-mono text-[11px]">Difficulty: {item.difficulty}</span>
              <button className="px-2.5 py-1 bg-slate-100 text-slate-800 text-[10px] font-bold uppercase hover:bg-slate-200">
                Edit Meta
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
