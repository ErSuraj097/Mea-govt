'use client';

import React, { useState } from 'react';
import { Sparkles, Plus, BookOpen, Save, CheckCircle2 } from 'lucide-react';

export default function CreatorBuilderPage() {
  const [saved, setSaved] = useState(false);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs">
        <span className="px-2.5 py-0.5 rounded-full bg-cyan-50 text-cyan-600 text-xs font-bold uppercase">
          Curriculum Studio
        </span>
        <h1 className="text-2xl font-black text-slate-900 mt-1">Course Module Builder</h1>
        <p className="text-xs text-slate-500 font-medium">Assemble Devanagari chapters, vocabulary audio tracks, and grammar rules.</p>
      </div>

      <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-xs">
        <h3 className="text-base font-bold text-slate-900">Module Structure Editor</h3>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Module Title (e.g., उच्च स्तरीय पत्राचार एवं राजभाषा नियम)"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 font-semibold"
          />
          <textarea
            rows={3}
            placeholder="Module Description & Learning Outcomes..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900"
          />
        </div>

        <button
          onClick={() => setSaved(true)}
          className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm"
        >
          <Save className="w-4 h-4" /> Save Module Draft
        </button>

        {saved && (
          <div className="p-3 rounded-xl bg-emerald-50 text-emerald-700 font-bold text-xs flex items-center gap-2 border border-emerald-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Module structure saved to Draft database!
          </div>
        )}
      </div>
    </div>
  );
}
