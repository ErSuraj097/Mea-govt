'use client';

import React from 'react';
import { Award, CheckCircle2 } from 'lucide-react';

export default function TesterApprovalsPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs">
        <span className="px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-600 text-xs font-bold uppercase">
          Approval History
        </span>
        <h1 className="text-2xl font-black text-slate-900 mt-1">Approved & Audited Courses Log</h1>
        <p className="text-xs text-slate-500 font-medium">History of all course modules approved by Quality Testers and passed to Admin deployment.</p>
      </div>

      <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-3 shadow-xs">
        {[
          { title: 'Level 1 स्वर एवं व्यंजन (Vowels)', date: '10 Aug 2026', auditor: 'Dr. Devendra Sharma' },
          { title: 'Level 2 सर्वनाम और क्रिया (Verbs)', date: '18 Aug 2026', auditor: 'Dr. Devendra Sharma' },
          { title: 'Level 4 संवाद एवं पठन (Fluency)', date: '25 Aug 2026', auditor: 'Dr. Devendra Sharma' },
        ].map((item, idx) => (
          <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex justify-between items-center text-xs">
            <div>
              <h4 className="font-bold text-slate-900">{item.title}</h4>
              <span className="text-slate-500">Audited on {item.date} by {item.auditor}</span>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Approved
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
