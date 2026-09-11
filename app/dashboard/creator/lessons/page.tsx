'use client';

import React from 'react';
import { BookOpen, FileEdit, Volume2, Plus } from 'lucide-react';

export default function CreatorLessonsPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs flex justify-between items-center">
        <div>
          <span className="px-2.5 py-0.5 rounded-full bg-cyan-50 text-cyan-600 text-xs font-bold uppercase">
            Lesson Editor
          </span>
          <h1 className="text-2xl font-black text-slate-900 mt-1">Devanagari Lesson Content Authoring</h1>
          <p className="text-xs text-slate-500 font-medium">Create vocabulary cards, audio pronunciation text, and grammar rules.</p>
        </div>
        <button className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm">
          <Plus className="w-4 h-4" /> Add New Devanagari Lesson
        </button>
      </div>

      <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-xs">
        <h3 className="text-base font-bold text-slate-900">Vocabulary Items Editor</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <input type="text" placeholder="Hindi (e.g. नमस्ते)" className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold" />
          <input type="text" placeholder="Transliteration (Namaste)" className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-semibold" />
          <input type="text" placeholder="English (Hello)" className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs" />
        </div>
      </div>
    </div>
  );
}
