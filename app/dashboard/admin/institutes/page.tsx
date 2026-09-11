'use client';

import React from 'react';
import { Building2, Globe, CheckCircle2, Shield, Plus } from 'lucide-react';
import { MOCK_INSTITUTES } from '@/lib/mockData';

export default function AdminInstitutesPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto text-left animate-in fade-in duration-200">
      <div className="p-6 bg-[#0C2340] border-l-4 border-[#F26522] text-white shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4 rounded-none">
        <div>
          <span className="px-2.5 py-0.5 bg-orange-400/20 text-[#F26522] text-[10px] font-black uppercase tracking-wider border border-orange-400/30">
            Super Admin Mission Governance
          </span>
          <h1 className="text-2xl font-black text-white mt-1">Accredited Diplomatic Missions & SVCC Hubs</h1>
          <p className="text-xs text-slate-300">Authorize embassy ICCR seat quotas, verify university MoU agreements, and monitor regional nodes.</p>
        </div>
        <button className="px-4 py-2 bg-[#F26522] hover:bg-[#d85517] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 rounded-none transition">
          <Plus className="w-4 h-4" /> Accredit New Mission
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {MOCK_INSTITUTES.map((inst) => (
          <div key={inst.id} className="p-5 bg-white border border-slate-200 border-t-2 border-t-[#0C2340] space-y-3 shadow-xs rounded-none">
            <div className="flex justify-between items-center">
              <span className="px-2 py-0.5 bg-slate-100 text-slate-700 text-[9px] font-black uppercase">
                {inst.accreditation || 'ICCR ACCREDITED'}
              </span>
              <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Active Hub
              </span>
            </div>

            <div>
              <h3 className="text-sm font-black text-slate-900 leading-snug">{inst.nameEng}</h3>
              <p className="text-xs text-slate-500 mt-1">{inst.city}, {inst.state}</p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-between items-center text-xs">
              <span className="text-slate-600 font-medium">{inst.coursesCount} Active Courses</span>
              <span className="font-bold text-[#0C2340]">Rating: {inst.rating} ★</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
