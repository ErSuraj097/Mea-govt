'use client';

import React from 'react';
import { Trophy, Award, Calendar, Users, CheckCircle2, Star } from 'lucide-react';

export default function TeacherCompetitionsPage() {
  const contests = [
    {
      id: 'c1',
      title: 'अखिल भारतीय राजनयिक निबंध प्रतियोगिता (All India Diplomatic Essay Contest)',
      deadline: '30 Sep 2026',
      participants: 48,
      status: 'grading',
      evaluationsPending: 12
    },
    {
      id: 'c2',
      title: 'Devanagari Akshara Calligraphy Showcase',
      deadline: '15 Oct 2026',
      participants: 64,
      status: 'open',
      evaluationsPending: 0
    }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto text-left animate-in fade-in duration-200">
      <div className="p-6 bg-[#0C2340] border-l-4 border-[#F26522] text-white shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4 rounded-none">
        <div>
          <span className="px-2.5 py-0.5 bg-amber-400/20 text-amber-300 text-[10px] font-black uppercase tracking-wider border border-amber-400/30">
            Faculty Evaluation Jury
          </span>
          <h1 className="text-2xl font-black text-white mt-1">Student Competitions & Literary Contests</h1>
          <p className="text-xs text-slate-300">Grade essays, review oral recordings, and submit jury rankings for ICCR awards.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {contests.map((c) => (
          <div key={c.id} className="p-6 bg-white border border-slate-200 border-t-2 border-t-[#0C2340] space-y-3 shadow-xs rounded-none">
            <div className="flex justify-between items-center">
              <span className="px-2.5 py-0.5 bg-orange-50 text-[#F26522] text-[10px] font-black uppercase">
                Status: {c.status}
              </span>
              <span className="text-xs font-bold text-slate-500">Due: {c.deadline}</span>
            </div>

            <h3 className="text-base font-black text-slate-900">{c.title}</h3>

            <div className="pt-3 border-t border-slate-100 flex justify-between items-center text-xs">
              <span className="text-slate-600 font-bold">{c.participants} Entries • {c.evaluationsPending} Pending Review</span>
              <button className="px-3.5 py-1.5 bg-[#F26522] hover:bg-[#d85517] text-white font-bold uppercase text-[11px] transition">
                Grade Submissions →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
