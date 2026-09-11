'use client';

import React from 'react';
import { Shield, Clock, CheckCircle2, ArrowRight } from 'lucide-react';

export default function CreatorWorkflowPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs">
        <span className="px-2.5 py-0.5 rounded-full bg-cyan-50 text-cyan-600 text-xs font-bold uppercase">
          Course Workflow Engine (Sec 24)
        </span>
        <h1 className="text-2xl font-black text-slate-900 mt-1">6-Stage Publishing Workflow Status</h1>
        <p className="text-xs text-slate-500 font-medium">Track your submitted course modules across QA inspection, revisions, and Super Admin approval.</p>
      </div>

      <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-6 shadow-xs">
        <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 text-center text-xs">
          <div className="p-3 rounded-xl bg-slate-100 border border-slate-200 text-slate-500 font-bold">1. Draft</div>
          <div className="p-3 rounded-xl bg-blue-100 border border-blue-300 text-blue-800 font-bold">2. Submitted</div>
          <div className="p-3 rounded-xl bg-purple-100 border border-purple-300 text-purple-800 font-bold">3. QA Audit</div>
          <div className="p-3 rounded-xl bg-slate-100 border border-slate-200 text-slate-400 font-bold">4. Approved</div>
          <div className="p-3 rounded-xl bg-slate-100 border border-slate-200 text-slate-400 font-bold">5. Admin Review</div>
          <div className="p-3 rounded-xl bg-slate-100 border border-slate-200 text-slate-400 font-bold">6. Published</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
          <h4 className="font-bold text-slate-900">Module: व्यावहारिक हिंदी एवं पत्राचार (Business Hindi)</h4>
          <p className="text-slate-600">Current Stage: <span className="font-bold text-purple-700">Stage 3 — Quality Tester Audit Queue</span></p>
          <span className="text-slate-400 text-[11px] block">Audit Log: Submitted by Creator Kabir Verma on 28 Aug 2026</span>
        </div>
      </div>
    </div>
  );
}
