'use client';

import React from 'react';
import Link from 'next/link';
import { BookOpen, Video, FileEdit, Users, CheckCircle2, Star, Clock, ArrowRight, Shield, Sparkles } from 'lucide-react';

export default function TeacherOverview() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto text-left animate-in fade-in duration-200">
      {/* MEA Top Header */}
      <div className="p-6 rounded-none bg-[#0C2340] border-l-4 border-[#F26522] text-white shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="px-2.5 py-0.5 rounded-none bg-amber-400/20 text-amber-300 text-[10px] font-black uppercase tracking-wider border border-amber-400/30">
            Faculty & Evaluator Console
          </span>
          <h1 className="text-2xl font-black text-white mt-1">Language Faculty Command Hub</h1>
          <p className="text-xs text-slate-300 font-medium">Manage upcoming live sessions, grade student audio submissions, and monitor class phonetic progress.</p>
        </div>
        <div className="flex gap-2">
          <Link
            href="/dashboard/teacher?tab=roster"
            className="px-4 py-2 bg-[#F26522] hover:bg-[#d85517] text-white text-xs font-bold uppercase tracking-wider rounded-none transition"
          >
            View Student Roster
          </Link>
        </div>
      </div>

      {/* KPI Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-none bg-white border border-slate-200 space-y-2 shadow-sm border-t-2 border-t-[#0C2340]">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Enrolled Students</span>
          <span className="text-3xl font-black text-[#0C2340] block">42 Students</span>
          <span className="text-xs text-[#138808] font-bold">Class 10 & 12 Batches • 96% Active</span>
        </div>
        <div className="p-6 rounded-none bg-white border border-slate-200 space-y-2 shadow-sm border-t-2 border-t-[#F26522]">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Pending Submissions</span>
          <span className="text-3xl font-black text-[#F26522] block">5 Assignments</span>
          <span className="text-xs text-amber-600 font-bold">Requires Teacher Grading & Audio QC</span>
        </div>
        <div className="p-6 rounded-none bg-white border border-slate-200 space-y-2 shadow-sm border-t-2 border-t-[#138808]">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Upcoming Live Session</span>
          <span className="text-xl font-black text-[#0C2340] block">Today 4:00 PM IST</span>
          <span className="text-xs text-[#138808] font-bold">उच्च स्तरीय देवनागरी पत्राचार (ICCR Batch A)</span>
        </div>
      </div>

      {/* Quick Role Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          href="/dashboard/teacher?tab=assignments"
          className="p-5 rounded-none bg-white border border-slate-200 hover:border-[#0C2340] transition space-y-2 shadow-sm group"
        >
          <div className="w-10 h-10 rounded-none bg-orange-50 text-[#F26522] flex items-center justify-center font-bold">
            <FileEdit className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black text-slate-900 group-hover:text-[#F26522] transition">Assignment Gradebook</h3>
          <p className="text-xs text-slate-500">Review homework submissions, Devanagari handwriting essays, and award CEFR badges.</p>
        </Link>

        <Link
          href="/dashboard/teacher?tab=ai-review"
          className="p-5 rounded-none bg-white border border-slate-200 hover:border-[#0C2340] transition space-y-2 shadow-sm group"
        >
          <div className="w-10 h-10 rounded-none bg-blue-50 text-[#0C2340] flex items-center justify-center font-bold">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black text-slate-900 group-hover:text-[#F26522] transition">Sambhasini AI Speech Reviews</h3>
          <p className="text-xs text-slate-500">Inspect automated phoneme cadence & retroflex consonant pronunciation flags from ULCA ASR.</p>
        </Link>

        <Link
          href="/dashboard/teacher?tab=roster"
          className="p-5 rounded-none bg-white border border-slate-200 hover:border-[#0C2340] transition space-y-2 shadow-sm group"
        >
          <div className="w-10 h-10 rounded-none bg-emerald-50 text-[#138808] flex items-center justify-center font-bold">
            <Users className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black text-slate-900 group-hover:text-[#F26522] transition">Student Cohort Roster</h3>
          <p className="text-xs text-slate-500">View individual learning paths, test scores, attendance records, and diplomatic mission affiliations.</p>
        </Link>
      </div>
    </div>
  );
}
