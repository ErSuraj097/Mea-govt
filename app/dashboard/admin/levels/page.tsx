'use client';

import React from 'react';
import { Layers, Lock, Unlock, ShieldCheck } from 'lucide-react';
import { MOCK_LEVELS } from '@/lib/mockData';

export default function AdminLevelsPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto text-left animate-in fade-in duration-200">
      <div className="p-6 bg-[#0C2340] border-l-4 border-[#F26522] text-white shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4 rounded-none">
        <div>
          <span className="px-2.5 py-0.5 bg-orange-400/20 text-[#F26522] text-[10px] font-black uppercase tracking-wider border border-orange-400/30">
            Super Admin Curriculum Governance
          </span>
          <h1 className="text-2xl font-black text-white mt-1">Global Level Lock & Diploma Gates</h1>
          <p className="text-xs text-slate-300">Set passing criteria percentage, unlock CEFR diploma issuance conditions, and audit progression thresholds.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {MOCK_LEVELS.map((lvl) => (
          <div key={lvl.id} className="p-6 bg-white border border-slate-200 border-t-2 border-t-[#0C2340] space-y-3 shadow-xs rounded-none">
            <div className="flex justify-between items-center">
              <span className="px-2.5 py-0.5 bg-blue-50 text-[#0C2340] text-[10px] font-black uppercase">
                Tier {lvl.id} • CEFR {lvl.cefr}
              </span>
              <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                <ShieldCheck className="w-4 h-4" /> Global MEA Standard
              </span>
            </div>

            <div>
              <h3 className="text-base font-black text-slate-900">{lvl.titleEng} ({lvl.titleHindi})</h3>
              <p className="text-xs text-slate-600 mt-1">{lvl.description}</p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-between items-center text-xs">
              <span className="text-slate-500 font-bold">Required Passing Score: 75% CEFR</span>
              <button className="px-3 py-1 bg-slate-100 text-slate-800 text-[11px] font-bold uppercase hover:bg-slate-200 transition">
                Configure Gates
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
