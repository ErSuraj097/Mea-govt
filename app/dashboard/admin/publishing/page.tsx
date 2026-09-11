'use client';

import React, { useState } from 'react';
import { BookOpen, CheckCircle2, Rocket } from 'lucide-react';

export default function AdminPublishingPage() {
  const [published, setPublished] = useState(false);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs">
        <span className="px-2.5 py-0.5 rounded-full bg-orange-50 text-orange-600 text-xs font-bold uppercase">
          Stage 5/6 Publishing Gate
        </span>
        <h1 className="text-2xl font-black text-slate-900 mt-1">Course Publishing Final Approvals</h1>
        <p className="text-xs text-slate-500 font-medium">Final deployment check for courses approved by Quality Testers before publishing to students.</p>
      </div>

      <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-xs">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-base font-bold text-slate-900">Module: व्यावसायिक हिंदी एवं पत्राचार (Business Hindi)</h3>
            <span className="text-xs text-slate-500">QA Auditor: Dr. Devendra Sharma • Approved</span>
          </div>
          <button
            onClick={() => setPublished(true)}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm"
          >
            <Rocket className="w-4 h-4" /> Publish to Global Students
          </button>
        </div>

        {published && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" /> Course Published Live! Now available to all enrolled students.
          </div>
        )}
      </div>
    </div>
  );
}
