'use client';

import React, { useState } from 'react';
import { Search, X, BookOpen, Award, GraduationCap, Building2, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const mockSearchResults = [
    { type: 'course', title: 'वर्णमाला एवं देवनागरी लिपि (Hindi Script Fundamentals)', category: 'Level 1', url: '/dashboard/student?tab=levels' },
    { type: 'course', title: 'व्याकरण भारती (Complete Hindi Grammar)', category: 'Level 3', url: '/dashboard/student?tab=levels' },
    { type: 'teacher', title: 'आचार्य आरव शास्त्री (Senior Grammar Master)', category: 'Teacher', url: '/dashboard/student?tab=avatar' },
    { type: 'institute', title: 'केंद्रीय हिंदी संस्थान, दिल्ली (Kendriya Hindi Sansthan)', category: 'Institute', url: '/dashboard/student?tab=institutes' },
    { type: 'book', title: 'गोदान — मुंशी प्रेमचंद (Godaan Novel)', category: 'Library Book', url: '/dashboard/student?tab=library' },
    { type: 'cert', title: 'Public Certificate Verification Portal', category: 'Verification', url: '/certificates/verify/MEA-HINDI-2026-9941' },
  ].filter((item) => item.title.toLowerCase().includes(query.toLowerCase()) || query === '');

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
      <div className="w-full max-w-2xl bg-white border border-[#0B3D91] rounded-md shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 text-left">
        {/* Search Header Input */}
        <div className="flex items-center px-4 py-3 bg-[#082C6C] border-b border-[#051C45]">
          <Search className="w-5 h-5 text-[#FF9933] shrink-0 mr-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Hindi courses, teachers, institutes, library books, certificates..."
            className="w-full bg-transparent text-white placeholder-slate-300 focus:outline-none text-sm sm:text-base font-medium"
            autoFocus
          />
          <button
            onClick={onClose}
            className="p-1 rounded-md hover:bg-white/10 text-slate-300 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="p-3 max-h-96 overflow-y-auto divide-y divide-slate-100">
          {mockSearchResults.length > 0 ? (
            mockSearchResults.map((res, i) => (
              <Link
                key={i}
                href={res.url}
                onClick={onClose}
                className="py-2.5 px-3 flex items-center justify-between rounded-md hover:bg-slate-50 transition group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-md bg-[#F5F5F5] text-[#0B3D91] group-hover:bg-[#0B3D91] group-hover:text-white transition">
                    {res.type === 'course' && <BookOpen className="w-4 h-4" />}
                    {res.type === 'teacher' && <GraduationCap className="w-4 h-4" />}
                    {res.type === 'institute' && <Building2 className="w-4 h-4" />}
                    {res.type === 'book' && <BookOpen className="w-4 h-4" />}
                    {res.type === 'cert' && <Award className="w-4 h-4" />}
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-[#212121] group-hover:text-[#0B3D91] transition">
                      {res.title}
                    </h4>
                    <span className="text-[11px] text-[#555555]">{res.category}</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#0B3D91] group-hover:translate-x-1 transition" />
              </Link>
            ))
          ) : (
            <div className="py-8 text-center text-slate-500 text-sm">
              No results matching &quot;{query}&quot; found.
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 bg-[#F5F5F5] border-t border-slate-200 flex items-center justify-between text-xs text-[#555555]">
          <span>Global Search Engine • 51 LMS Modules</span>
          <span className="text-[11px] text-[#0B3D91] font-bold">ESC to close</span>
        </div>
      </div>
    </div>
  );
}
