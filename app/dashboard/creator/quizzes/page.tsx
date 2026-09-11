'use client';

import React from 'react';
import { HelpCircle, Plus, CheckCircle2 } from 'lucide-react';

export default function CreatorQuizzesPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs">
        <span className="px-2.5 py-0.5 rounded-full bg-cyan-50 text-cyan-600 text-xs font-bold uppercase">
          Quiz Authoring Tool
        </span>
        <h1 className="text-2xl font-black text-slate-900 mt-1">Assessment & MCQ Question Bank</h1>
        <p className="text-xs text-slate-500 font-medium">Author 10 question types: MCQ, Fill in the blanks, Audio listening, and Speech quizzes.</p>
      </div>

      <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-xs">
        <h3 className="text-base font-bold text-slate-900">Add New Question</h3>
        <input type="text" placeholder="Question Text in Hindi..." className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold" />
        <div className="grid grid-cols-2 gap-3">
          <input type="text" placeholder="Option A" className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs" />
          <input type="text" placeholder="Option B" className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs" />
          <input type="text" placeholder="Option C" className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs" />
          <input type="text" placeholder="Option D" className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs" />
        </div>
      </div>
    </div>
  );
}
