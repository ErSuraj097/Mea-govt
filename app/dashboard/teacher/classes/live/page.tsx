'use client';

import React from 'react';
import { Video, Calendar, Clock, Users, Plus, Radio, Shield, CheckCircle2 } from 'lucide-react';

export default function TeacherLiveClassesPage() {
  const teacherSessions = [
    {
      id: 't1',
      title: 'उच्च स्तरीय देवनागरी पत्राचार (ICCR Batch A)',
      lang: 'Hindi',
      date: 'Today, 11 Sep 2026',
      time: '4:00 PM - 5:00 PM IST',
      enrolled: 24,
      status: 'upcoming',
      roomUrl: 'https://meet.mea.gov.in/iccr-hindi-batch-a'
    },
    {
      id: 't2',
      title: 'Devanagari Akshara Masterclass for Foreign Envoys',
      lang: 'Hindi & Sanskrit',
      date: 'Tomorrow, 12 Sep 2026',
      time: '11:00 AM - 12:30 PM IST',
      enrolled: 18,
      status: 'scheduled',
      roomUrl: 'https://meet.mea.gov.in/iccr-akshara-session'
    },
    {
      id: 't3',
      title: 'Tamil Classical Literature & Phonetics Seminar',
      lang: 'Tamil',
      date: '14 Sep 2026',
      time: '3:00 PM - 4:30 PM IST',
      enrolled: 15,
      status: 'scheduled',
      roomUrl: 'https://meet.mea.gov.in/tamil-classical-seminar'
    }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto text-left animate-in fade-in duration-200">
      <div className="p-6 bg-[#0C2340] border-l-4 border-[#F26522] text-white shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4 rounded-none">
        <div>
          <span className="px-2.5 py-0.5 bg-amber-400/20 text-amber-300 text-[10px] font-black uppercase tracking-wider border border-amber-400/30">
            Faculty Scheduling Console
          </span>
          <h1 className="text-2xl font-black text-white mt-1">Live Classroom Management</h1>
          <p className="text-xs text-slate-300">Host, schedule, and moderate live diplomat language speaking roundtables.</p>
        </div>
        <button className="px-4 py-2 bg-[#F26522] hover:bg-[#d85517] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 rounded-none transition">
          <Plus className="w-4 h-4" /> Schedule New Class
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {teacherSessions.map((session) => (
          <div key={session.id} className="p-5 bg-white border border-slate-200 border-t-2 border-t-[#0C2340] space-y-3 shadow-xs rounded-none">
            <div className="flex justify-between items-center">
              <span className="px-2 py-0.5 bg-blue-50 text-[#0C2340] text-[9px] font-black uppercase">
                {session.lang}
              </span>
              <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" /> {session.status}
              </span>
            </div>

            <div>
              <h3 className="text-sm font-black text-slate-900 leading-snug">{session.title}</h3>
              <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#F26522]" /> {session.date} • {session.time}
              </p>
            </div>

            <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-xs">
              <span className="text-slate-500 font-medium">{session.enrolled} Scholars Enrolled</span>
              <a
                href={session.roomUrl}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1 bg-[#0C2340] text-white text-[11px] font-bold uppercase hover:bg-[#1A365D] transition"
              >
                Launch Room →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
