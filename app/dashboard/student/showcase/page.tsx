'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  Heart,
  Share2,
  Bookmark,
  Award,
  Search,
  CheckCircle2,
  Globe
} from 'lucide-react';

interface ShowcaseItem {
  id: string;
  titleEng: string;
  author: string;
  authorTitle: string;
  category: 'Essay & Prose' | 'Poetry & Calligraphy' | 'Audio Recitation' | 'Translation Project';
  likesCount: number;
  featuredBadge?: string;
  summary: string;
}

const SHOWCASE_ITEMS: ShowcaseItem[] = [
  {
    id: 'sc_1',
    titleEng: 'Reflections of a Diplomat on the Banks of Ganga',
    author: 'Amb. Global Scholar',
    authorTitle: 'International Scholar • France',
    category: 'Essay & Prose',
    likesCount: 342,
    featuredBadge: '🥇 Editor Choice',
    summary: 'An essay on the cultural heritage of the Ganges, India\'s message of peace, and universal harmony in international relations.'
  },
  {
    id: 'sc_2',
    titleEng: 'Bridging Continents: Echoes of Indian Languages in Latin America',
    author: 'Elena Rodriguez',
    authorTitle: 'Linguistics Fellow • Buenos Aires',
    category: 'Translation Project',
    likesCount: 289,
    featuredBadge: '⭐ High Impact',
    summary: 'A study exploring Sanskrit and Hindi cognates found in Spanish vocabulary and cross-cultural trade exchanges.'
  },
  {
    id: 'sc_3',
    titleEng: 'Devanagari Calligraphy & Recitation of Kabir Dohes',
    author: 'Aarav Sharma',
    authorTitle: 'Class 10 Scholar • Delhi',
    category: 'Poetry & Calligraphy',
    likesCount: 512,
    featuredBadge: '🏆 Winner',
    summary: 'Artistic Devanagari calligraphy rendering of Kabir\'s classic couplets with line-by-line English philosophical notes.'
  }
];

export default function CreativeShowcasePage() {
  const [likes, setLikes] = useState<Record<string, number>>({});

  const handleLike = (id: string, initialCount: number) => {
    setLikes((prev) => ({
      ...prev,
      [id]: (prev[id] || initialCount) + 1
    }));
  };

  return (
    <div className="space-y-8 max-w-8xl mx-auto pb-16">
      {/* Official MEA Government Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0B3D91] via-[#082C6C] to-[#051C45] text-white border border-[#0B3D91] shadow-md space-y-6 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10 border-b border-white/10 pb-4">
          <div className="space-y-1">
            <span className="px-3 py-1 rounded-full bg-[#FF9933] text-[#212121] text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 w-fit">
              <Sparkles className="w-3.5 h-3.5" /> CREATIVE SCHOLAR SHOWCASE GALLERY
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
              Creative Scholar Showcase Gallery
            </h1>
            <p className="text-xs text-blue-100 font-medium max-w-2xl">
              Exhibition of student essays, Devanagari calligraphy, audio recitations, and cross-lingual translation projects published by scholars worldwide.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/15">
            <Award className="w-6 h-6 text-amber-300" />
            <div>
              <span className="text-[10px] font-bold text-blue-200 block uppercase">EXHIBITED WORKS</span>
              <span className="text-sm font-black text-white">Featured Gallery</span>
            </div>
          </div>
        </div>
      </div>

      {/* SHOWCASE CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {SHOWCASE_ITEMS.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl border border-[#DCE2E6] p-6 space-y-5 shadow-2xs hover:shadow-xl transition duration-300 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-[#EEF3F8] text-[#0B3D91] text-[10px] font-black uppercase">
                  {item.category}
                </span>
                {item.featuredBadge && (
                  <span className="px-2.5 py-0.5 rounded-full bg-[#FF9933]/20 text-[#0B3D91] text-[10px] font-black">
                    {item.featuredBadge}
                  </span>
                )}
              </div>

              <div className="space-y-1">
                <h3 className="text-base font-black text-[#1B2A4A] leading-snug">{item.titleEng}</h3>
                <p className="text-xs text-[#0B3D91] font-bold">By {item.author}</p>
                <p className="text-[11px] text-slate-400">{item.authorTitle}</p>
              </div>

              <p className="text-xs text-slate-600 font-medium leading-relaxed">{item.summary}</p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3 mt-auto">
              <button
                onClick={() => handleLike(item.id, item.likesCount)}
                className="px-3.5 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs flex items-center gap-1.5 transition"
              >
                <Heart className="w-3.5 h-3.5 fill-rose-600 text-rose-600" />
                <span>{likes[item.id] || item.likesCount} Likes</span>
              </button>

              <button
                onClick={() => alert(`📄 Viewing full publication for "${item.titleEng}"`)}
                className="px-4 py-1.5 rounded-xl bg-[#0B3D91] hover:bg-[#082C6C] text-white font-extrabold text-xs shadow-md transition"
              >
                Read Work →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
