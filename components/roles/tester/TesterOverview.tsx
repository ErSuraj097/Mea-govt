'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Headphones, CheckCircle2, AlertCircle, FileCheck, Mic, SpellCheck, ListFilter } from 'lucide-react';

export default function TesterOverview() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto text-left animate-in fade-in duration-200">
      {/* MEA Header */}
      <div className="p-6 rounded-none bg-[#0C2340] border-l-4 border-[#F26522] text-white shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="px-2.5 py-0.5 rounded-none bg-emerald-400/20 text-emerald-300 text-[10px] font-black uppercase tracking-wider border border-emerald-400/30">
            QA & Speech Validation Cell
          </span>
          <h1 className="text-2xl font-black text-white mt-1">Linguistic Quality Assurance & Testing Hub</h1>
          <p className="text-xs text-slate-300 font-medium">Devanagari orthographic auditing, native audio verification, phoneme scoring, and QA sign-offs.</p>
        </div>
        <div className="flex gap-2">
          <Link
            href="/dashboard/tester?tab=queue"
            className="px-4 py-2 bg-[#F26522] hover:bg-[#d85517] text-white text-xs font-bold uppercase tracking-wider rounded-none transition"
          >
            Audit Queue (8)
          </Link>
        </div>
      </div>

      {/* KPI Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-none bg-white border border-slate-200 space-y-2 shadow-sm border-t-2 border-t-[#0C2340]">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Pending QA Queue</span>
          <span className="text-3xl font-black text-[#0C2340] block">8 Modules</span>
          <span className="text-xs text-amber-600 font-bold">Requires Acoustic & Orthographic QC</span>
        </div>
        <div className="p-6 rounded-none bg-white border border-slate-200 space-y-2 shadow-sm border-t-2 border-t-[#F26522]">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Audio Accuracy Benchmark</span>
          <span className="text-3xl font-black text-[#F26522] block">99.4% WER</span>
          <span className="text-xs text-[#138808] font-bold">Sambhasini Acoustic Standards Met</span>
        </div>
        <div className="p-6 rounded-none bg-white border border-slate-200 space-y-2 shadow-sm border-t-2 border-t-[#138808]">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Certified Ready for Release</span>
          <span className="text-3xl font-black text-[#138808] block">32 Modules</span>
          <span className="text-xs text-[#138808] font-bold">Signed Off for Diplomatic Curricula</span>
        </div>
      </div>

      {/* Tester Workspaces */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Link
          href="/dashboard/tester?tab=queue"
          className="p-5 rounded-none bg-white border border-slate-200 hover:border-[#0C2340] transition space-y-2 shadow-sm group"
        >
          <div className="w-10 h-10 rounded-none bg-blue-50 text-[#0C2340] flex items-center justify-center font-bold">
            <ListFilter className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black text-slate-900 group-hover:text-[#F26522] transition">Verification Queue</h3>
          <p className="text-xs text-slate-500">Pick submitted lesson modules from Creators and run linguistic checklist verification.</p>
        </Link>

        <Link
          href="/dashboard/tester?tab=audio"
          className="p-5 rounded-none bg-white border border-slate-200 hover:border-[#0C2340] transition space-y-2 shadow-sm group"
        >
          <div className="w-10 h-10 rounded-none bg-orange-50 text-[#F26522] flex items-center justify-center font-bold">
            <Headphones className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black text-slate-900 group-hover:text-[#F26522] transition">Audio QC Lab</h3>
          <p className="text-xs text-slate-500">Listen to AI synthesized speech and human voice recordings to check retroflex clarity and noise floor.</p>
        </Link>

        <Link
          href="/dashboard/tester?tab=spelling"
          className="p-5 rounded-none bg-white border border-slate-200 hover:border-[#0C2340] transition space-y-2 shadow-sm group"
        >
          <div className="w-10 h-10 rounded-none bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
            <SpellCheck className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black text-slate-900 group-hover:text-[#F26522] transition">Orthography & Spelling</h3>
          <p className="text-xs text-slate-500">Devanagari matras, conjunct consonants (संयुक्ताक्षर), and nukta diacritic audit.</p>
        </Link>

        <Link
          href="/dashboard/tester?tab=approvals"
          className="p-5 rounded-none bg-white border border-slate-200 hover:border-[#0C2340] transition space-y-2 shadow-sm group"
        >
          <div className="w-10 h-10 rounded-none bg-emerald-50 text-[#138808] flex items-center justify-center font-bold">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black text-slate-900 group-hover:text-[#F26522] transition">Signed Off Modules</h3>
          <p className="text-xs text-slate-500">View passed modules forwarded to Super Admin for final live publication.</p>
        </Link>
      </div>
    </div>
  );
}
