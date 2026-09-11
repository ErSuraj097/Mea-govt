'use client';

import React from 'react';
import { FileEdit, CheckCircle2 } from 'lucide-react';

export default function TesterSpellingPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs">
        <span className="px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-600 text-xs font-bold uppercase">
          Linguistic Audit
        </span>
        <h1 className="text-2xl font-black text-slate-900 mt-1">Devanagari Font & Spelling Inspector</h1>
        <p className="text-xs text-slate-500 font-medium">Verify matra accuracy, anusvara (अनुस्वार), and conjunct consonants (संयुक्ताक्षर).</p>
      </div>

      <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-xs">
        <h3 className="text-base font-bold text-slate-900">Devanagari Orthography Verification</h3>
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
          <p className="font-bold text-slate-900">Sample Devanagari Passage:</p>
          <p className="text-slate-700">&quot;हिंदी भारत की संघ भाषा है। इसका मानक रूप देवनागरी लिपि में लिखा जाता है...&quot;</p>
          <span className="text-emerald-600 font-bold flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4" /> Spellings Verified 100% Accurate
          </span>
        </div>
      </div>
    </div>
  );
}
