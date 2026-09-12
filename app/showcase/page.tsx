'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  ThumbsUp,
  Eye,
  Globe,
  Plus,
  BookOpen
} from 'lucide-react';
import { MOCK_CREATIVE_SUBMISSIONS, CreativeSubmission } from '@/lib/mockData';

export default function CreativeShowcasePage() {
  const [submissions, setSubmissions] = useState<CreativeSubmission[]>(MOCK_CREATIVE_SUBMISSIONS);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filtered = submissions.filter((s) => selectedCategory === 'All' || s.category === selectedCategory);

  const handleLike = (id: string) => {
    setSubmissions((prev) =>
      prev.map((item) => (item.id === id ? { ...item, likes: item.likes + 1 } : item))
    );
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] pb-16 text-left">
      {/* Top Banner */}
      <div className="bg-[#0B3D91] text-white border-b border-[#082C6C] py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-3">
          <span className="px-2.5 py-0.5 rounded-sm bg-[#FF9933] text-[#051C45] text-[10px] font-black uppercase tracking-wider inline-block">
            GLOBAL PROPAGATION & CULTURAL GALLERY
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Global Indian Language Showcase
          </h1>
          <p className="text-xs sm:text-sm text-slate-200 max-w-3xl leading-relaxed">
            Discover creative works, poetry, essays, and speeches contributed by international scholars and diaspora language learners from across the globe.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        {/* Category Filters & Submit CTA */}
        <div className="bg-white border border-[#DCE2E6] rounded-sm p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-2xs">
          <div className="flex flex-wrap items-center gap-2">
            {['All', 'Poetry', 'Essay', 'Speech', 'Video', 'Story'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-sm text-xs font-extrabold transition ${
                  selectedCategory === cat
                    ? 'bg-[#0B3D91] text-white border-b-2 border-[#FF9933]'
                    : 'bg-[#F8FAFC] text-[#1B2A4A] hover:bg-[#EEF3F8] border border-[#DCE2E6]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <button
            onClick={() => alert('✨ Thank you for your interest! Creative submission form is active for enrolled scholars.')}
            className="px-4 py-2 bg-[#FF9933] hover:bg-[#E68A00] text-[#051C45] font-black text-xs uppercase tracking-wider rounded-sm shadow-2xs flex items-center gap-1.5 shrink-0 transition"
          >
            <Plus className="w-4 h-4" /> Submit Creative Work
          </button>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-[#DCE2E6] hover:border-[#0B3D91] rounded-sm p-6 space-y-4 shadow-2xs transition flex flex-col justify-between group text-left"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded-sm bg-blue-50 text-[#0B3D91] text-[10px] font-black uppercase border border-blue-200">
                    {item.category} • CEFR {item.cefrLevel}
                  </span>
                  <span className="text-xs font-bold text-slate-500">
                    {item.authorFlag} {item.authorCountry}
                  </span>
                </div>

                <div>
                  <h3 className="font-extrabold text-base text-[#1B2A4A] group-hover:text-[#0B3D91] transition leading-snug">
                    {item.title}
                  </h3>
                  <span className="text-xs text-slate-500 font-medium block mt-1">
                    By <strong>{item.authorName}</strong> ({item.authorCountry})
                  </span>
                </div>

                <p className="text-xs text-[#555555] font-medium leading-relaxed italic bg-[#F8FAFC] p-3 rounded-sm border-l-2 border-[#FF9933]">
                  &quot;{item.previewSnippet}&quot;
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3 text-slate-400 font-semibold">
                  <button
                    onClick={() => handleLike(item.id)}
                    className="flex items-center gap-1 text-[#0B3D91] hover:text-[#082C6C] font-bold"
                  >
                    <ThumbsUp className="w-3.5 h-3.5" /> {item.likes}
                  </button>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5" /> {item.views}
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono font-bold">{item.publishedDate}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
