'use client';

import React from 'react';
import { Trophy, Award, Globe, TrendingUp } from 'lucide-react';
import { MOCK_LEADERBOARD } from '@/lib/mockData';

export default function AdminLeaderboardPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto text-left animate-in fade-in duration-200">
      <div className="p-6 bg-[#0C2340] border-l-4 border-[#F26522] text-white shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4 rounded-none">
        <div>
          <span className="px-2.5 py-0.5 bg-orange-400/20 text-[#F26522] text-[10px] font-black uppercase tracking-wider border border-orange-400/30">
            Super Admin Global Analytics
          </span>
          <h1 className="text-2xl font-black text-white mt-1">Global Diplomatic Cohort Performance Matrix</h1>
          <p className="text-xs text-slate-300">Worldwide ranking of enrolled envoys, diplomatic mission points, and national completion rates.</p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 overflow-hidden shadow-xs rounded-none">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between text-xs font-bold text-slate-500">
          <span>Rank & Scholar</span>
          <span>Mission & Country</span>
          <span>XP & Accuracy</span>
        </div>

        <div className="divide-y divide-slate-100">
          {MOCK_LEADERBOARD.map((st, i) => (
            <div key={st.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition text-xs">
              <div className="flex items-center gap-3">
                <span className={`w-6 h-6 flex items-center justify-center font-black text-xs ${
                  i === 0 ? 'bg-amber-400 text-slate-950' : i === 1 ? 'bg-slate-300 text-slate-800' : 'bg-slate-100 text-slate-600'
                }`}>
                  #{i + 1}
                </span>
                <img src={st.avatar} alt="" className="w-8 h-8 rounded-none object-cover border border-slate-300" />
                <div>
                  <h4 className="font-black text-slate-900">{st.name}</h4>
                  <span className="text-slate-500 text-[11px]">{st.streak} Day Streak • Oral: {st.speakingScore}%</span>
                </div>
              </div>

              <div className="text-slate-600 font-medium">
                {st.institute} • {st.country}
              </div>

              <div className="text-right">
                <span className="font-black text-[#0C2340] block">{st.xp} XP</span>
                <span className="text-[#138808] font-bold text-[11px]">Active Scholar</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
