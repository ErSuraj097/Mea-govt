'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, BookOpen, Shield, HelpCircle, FilePlus, Layers, CheckSquare, GitPullRequest } from 'lucide-react';

export default function CreatorOverview() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto text-left animate-in fade-in duration-200">
      {/* MEA Header */}
      <div className="p-6 rounded-none bg-[#0C2340] border-l-4 border-[#F26522] text-white shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="px-2.5 py-0.5 rounded-none bg-cyan-400/20 text-cyan-300 text-[10px] font-black uppercase tracking-wider border border-cyan-400/30">
            Course Creator & Linguist Studio
          </span>
          <h1 className="text-2xl font-black text-white mt-1">Curriculum & Pedagogical Authoring Hub</h1>
          <p className="text-xs text-slate-300 font-medium">Build Indian language syllabus modules, author vocabulary audio scripts, and submit to QA audit pipeline.</p>
        </div>
        <div className="flex gap-2">
          <Link
            href="/dashboard/creator?tab=builder"
            className="px-4 py-2 bg-[#F26522] hover:bg-[#d85517] text-white text-xs font-bold uppercase tracking-wider rounded-none transition"
          >
            Create New Module
          </Link>
        </div>
      </div>

      {/* KPI Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-none bg-white border border-slate-200 space-y-2 shadow-sm border-t-2 border-t-[#0C2340]">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Authored Modules</span>
          <span className="text-3xl font-black text-[#0C2340] block">14 Modules</span>
          <span className="text-xs text-slate-500 font-bold">Devanagari, Tamil & Bengali Curricula</span>
        </div>
        <div className="p-6 rounded-none bg-white border border-slate-200 space-y-2 shadow-sm border-t-2 border-t-[#F26522]">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Current Pipeline Stage</span>
          <span className="text-xl font-black text-[#F26522] block">Stage 3: QA Review</span>
          <span className="text-xs text-amber-600 font-bold">4 Modules in Linguistic Review</span>
        </div>
        <div className="p-6 rounded-none bg-white border border-slate-200 space-y-2 shadow-sm border-t-2 border-t-[#138808]">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Live & Published</span>
          <span className="text-3xl font-black text-[#138808] block">10 Approved</span>
          <span className="text-xs text-[#138808] font-bold">Serving Global MEA Scholars</span>
        </div>
      </div>

      {/* Studio Workspaces */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Link
          href="/dashboard/creator?tab=builder"
          className="p-5 rounded-none bg-white border border-slate-200 hover:border-[#0C2340] transition space-y-2 shadow-sm group"
        >
          <div className="w-10 h-10 rounded-none bg-blue-50 text-[#0C2340] flex items-center justify-center font-bold">
            <FilePlus className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black text-slate-900 group-hover:text-[#F26522] transition">Lesson Builder</h3>
          <p className="text-xs text-slate-500">Draft rich multimedia units with bilingual glossaries, IPA transcriptions, and interactive audio.</p>
        </Link>

        <Link
          href="/dashboard/creator?tab=quizzes"
          className="p-5 rounded-none bg-white border border-slate-200 hover:border-[#0C2340] transition space-y-2 shadow-sm group"
        >
          <div className="w-10 h-10 rounded-none bg-orange-50 text-[#F26522] flex items-center justify-center font-bold">
            <CheckSquare className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black text-slate-900 group-hover:text-[#F26522] transition">Assessment & Quizzes</h3>
          <p className="text-xs text-slate-500">Design CEFR A1-B2 diagnostic questions, multiple-choice grammar tests, and voice prompt items.</p>
        </Link>

        <Link
          href="/dashboard/creator?tab=workflow"
          className="p-5 rounded-none bg-white border border-slate-200 hover:border-[#0C2340] transition space-y-2 shadow-sm group"
        >
          <div className="w-10 h-10 rounded-none bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
            <GitPullRequest className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black text-slate-900 group-hover:text-[#F26522] transition">Workflow & Approvals</h3>
          <p className="text-xs text-slate-500">Track module lifecycle across Draft, Tester QC, Super Admin Approval, and Live Deployment.</p>
        </Link>

        <Link
          href="/dashboard/creator?tab=lessons"
          className="p-5 rounded-none bg-white border border-slate-200 hover:border-[#0C2340] transition space-y-2 shadow-sm group"
        >
          <div className="w-10 h-10 rounded-none bg-emerald-50 text-[#138808] flex items-center justify-center font-bold">
            <Layers className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black text-slate-900 group-hover:text-[#F26522] transition">Course Catalog Manager</h3>
          <p className="text-xs text-slate-500">Manage Indian Language tracks, dialect variations, and foreign language comparative pairs.</p>
        </Link>
      </div>
    </div>
  );
}
