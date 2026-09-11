'use client';

import React from 'react';
import { Building2, Globe, Users, MapPin } from 'lucide-react';
import { MOCK_INSTITUTES } from '@/lib/mockData';

export default function InstituteDirectoryPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto text-left animate-in fade-in duration-200">
      <div className="p-6 bg-[#0C2340] border-l-4 border-[#F26522] text-white shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4 rounded-none">
        <div>
          <span className="px-2.5 py-0.5 bg-indigo-400/20 text-indigo-300 text-[10px] font-black uppercase tracking-wider border border-indigo-400/30">
            Diplomatic Mission Network
          </span>
          <h1 className="text-2xl font-black text-white mt-1">Global Cultural Mission Directory</h1>
          <p className="text-xs text-slate-300">Indian Embassies, High Commissions, and Swami Vivekananda Cultural Centres worldwide.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {MOCK_INSTITUTES.map((inst) => (
          <div key={inst.id} className="p-5 bg-white border border-slate-200 border-t-2 border-t-[#0C2340] space-y-3 shadow-xs rounded-none">
            <div className="flex items-center gap-2 text-[#D35400]">
              <MapPin className="w-4 h-4" />
              <span className="text-xs font-black uppercase">{inst.accreditation}</span>
            </div>

            <h3 className="text-sm font-black text-slate-900 leading-snug">{inst.nameEng}</h3>
            <p className="text-xs text-slate-500">{inst.city}, {inst.state}</p>

            <div className="pt-3 border-t border-slate-100 flex justify-between items-center text-xs">
              <span className="text-slate-500">{inst.coursesCount} Active Classes</span>
              <span className="font-bold text-[#0C2340]">Rating: {inst.rating} ★</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
