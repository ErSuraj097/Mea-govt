'use client';

import React from 'react';
import { BookOpen, FileText, Download, Search, Plus, Filter } from 'lucide-react';
import { MOCK_LIBRARY } from '@/lib/mockData';

export default function TeacherLibraryPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto text-left animate-in fade-in duration-200">
      <div className="p-6 bg-[#0C2340] border-l-4 border-[#F26522] text-white shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4 rounded-none">
        <div>
          <span className="px-2.5 py-0.5 bg-cyan-400/20 text-cyan-300 text-[10px] font-black uppercase tracking-wider border border-cyan-400/30">
            Faculty Teaching Library
          </span>
          <h1 className="text-2xl font-black text-white mt-1">Pedagogical Repositories & Reader Notes</h1>
          <p className="text-xs text-slate-300">Access grammar manuals, bilingual diplomatic glossaries, and lesson slide decks.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {MOCK_LIBRARY.map((item) => (
          <div key={item.id} className="p-5 bg-white border border-slate-200 border-t-2 border-t-[#0C2340] space-y-3 shadow-xs rounded-none">
            <div className="flex justify-between items-center">
              <span className="px-2 py-0.5 bg-slate-100 text-slate-700 text-[9px] font-black uppercase">
                {item.fileFormat}
              </span>
              <span className="text-[10px] text-slate-400 font-bold">{item.category}</span>
            </div>

            <div>
              <h3 className="text-sm font-black text-slate-900 leading-snug">{item.titleEng}</h3>
              <p className="text-xs text-[#F26522] font-semibold">{item.titleHindi}</p>
              <p className="text-xs text-slate-500 mt-1">Author: {item.author} • {item.difficulty}</p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-between items-center text-xs">
              <span className="text-slate-500 font-mono text-[11px]">{item.pagesOrDuration}</span>
              <button className="px-3 py-1 bg-[#0C2340] text-white text-[11px] font-bold uppercase hover:bg-[#1A365D] transition flex items-center gap-1">
                <Download className="w-3 h-3" /> Get Document
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
