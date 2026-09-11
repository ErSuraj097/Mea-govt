'use client';

import React from 'react';
import { Users, Mail, Award, CheckCircle2 } from 'lucide-react';
import { MOCK_LEADERBOARD } from '@/lib/mockData';

export default function TeacherRosterPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs">
        <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase">
          Faculty Roster
        </span>
        <h1 className="text-2xl font-black text-slate-900 mt-1">Enrolled Students Roster (42 Active)</h1>
        <p className="text-xs text-slate-500 font-medium">Monitor student progress, attendance %, and test achievements across batches.</p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between text-xs font-bold text-slate-500">
          <span>Student Name</span>
          <span>Country & Institute</span>
          <span>XP & Attendance</span>
        </div>

        <div className="divide-y divide-slate-100">
          {MOCK_LEADERBOARD.map((st) => (
            <div key={st.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition text-xs">
              <div className="flex items-center gap-3">
                <img src={st.avatar} alt="" className="w-9 h-9 rounded-full object-cover ring-2 ring-blue-500" />
                <div>
                  <h4 className="font-bold text-slate-900">{st.name}</h4>
                  <span className="text-slate-500 text-[11px]">Hindi Level 4 • Active Learner</span>
                </div>
              </div>

              <div className="text-slate-600 font-medium">
                {st.country} • {st.institute}
              </div>

              <div className="text-right">
                <span className="font-bold text-blue-600 block">{st.xp} XP</span>
                <span className="text-emerald-600 font-bold text-[11px]">96% Attendance</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
