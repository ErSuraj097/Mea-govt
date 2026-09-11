'use client';

import React, { useState } from 'react';
import { Shield, CheckCircle2, XCircle, FileText } from 'lucide-react';

export default function TesterQueuePage() {
  const [status, setStatus] = useState<'pending' | 'approved' | 'rejected'>('pending');

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs">
        <span className="px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-600 text-xs font-bold uppercase">
          Quality Audit Queue
        </span>
        <h1 className="text-2xl font-black text-slate-900 mt-1">Pending QA Submissions Inspection</h1>
        <p className="text-xs text-slate-500 font-medium">Verify lesson questions, Devanagari spellings, audio files, and pass or send for revision.</p>
      </div>

      <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-xs">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-xs font-bold uppercase text-purple-600">Module #882</span>
            <h3 className="text-lg font-bold text-slate-900">व्यावसायिक हिंदी एवं पत्राचार (Business Hindi)</h3>
            <p className="text-xs text-slate-500">Submitted by: Creator Kabir Verma</p>
          </div>
          <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-600 text-xs font-bold">
            Status: {status.toUpperCase()}
          </span>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            onClick={() => setStatus('approved')}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1 shadow-sm"
          >
            <CheckCircle2 className="w-4 h-4" /> Approve Content
          </button>
          <button
            onClick={() => setStatus('rejected')}
            className="px-5 py-2.5 rounded-xl bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100 font-bold text-xs flex items-center gap-1"
          >
            <XCircle className="w-4 h-4" /> Reject / Send Feedback
          </button>
        </div>

        {status === 'approved' && (
          <div className="p-3 rounded-xl bg-emerald-50 text-emerald-700 font-bold text-xs border border-emerald-200">
            ✓ Course Approved! Forwarded to Super Admin for final deployment.
          </div>
        )}
      </div>
    </div>
  );
}
