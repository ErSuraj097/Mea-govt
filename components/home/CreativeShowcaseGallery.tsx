'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  Play,
  FileText,
  Video,
  Mic,
  Eye,
  Award,
  ExternalLink,
  X,
  Volume2
} from 'lucide-react';

type ShowcaseCategory = 'all' | 'writing' | 'video' | 'audio';

interface CreativeWorkItem {
  id: string;
  category: 'writing' | 'video' | 'audio';
  title: string;
  hindiTitle: string;
  author: string;
  country: string;
  level: string;
  thumbnail: string;
  excerpt: string;
  mediaDuration?: string;
  tags: string[];
}

const CREATIVE_WORKS: CreativeWorkItem[] = [
  {
    id: 'w1',
    category: 'writing',
    title: 'Essay: Cultural Bridges through Bilateral Diplomacy',
    hindiTitle: 'निबंध: द्विपक्षीय राजनय के माध्यम से सांस्कृतिक सेतु',
    author: 'Matteo Rossi',
    country: 'Italy (Italian Diplomatic Academy)',
    level: 'CEFR B1',
    thumbnail: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=600&q=80',
    excerpt: 'An eloquent Devanagari essay discussing Indo-Mediterranean trade history and linguistic affinities.',
    tags: ['Diplomatic Essay', 'Devanagari', 'Bilateral Relations']
  },
  {
    id: 'w2',
    category: 'video',
    title: 'Recitation: Harivansh Rai Bachchan’s Agneepath',
    hindiTitle: 'काव्य पाठ: हरिवंश राय बच्चन की ‘अग्निपथ’',
    author: 'Sarah Jenkins',
    country: 'Australia (Sydney ICCR Centre)',
    level: 'CEFR A2',
    thumbnail: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=600&q=80',
    excerpt: 'Flawless rhythmic recitation highlighting aspirated consonants and patriotic cadence.',
    mediaDuration: '02:45',
    tags: ['Poetry Recitation', 'Video', 'Phonetics']
  },
  {
    id: 'w3',
    category: 'audio',
    title: 'Podcast Dialogue: Navigating New Delhi by Metro',
    hindiTitle: 'पॉडकास्ट संवाद: दिल्ली मेट्रो में यात्रा',
    author: 'Lars Lindqvist & Yuki Tanaka',
    country: 'Sweden & Japan (Global Cohort)',
    level: 'CEFR A1',
    thumbnail: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=600&q=80',
    excerpt: 'Conversational audio roleplay practicing directional inquiries, ticket purchases, and polite exchanges.',
    mediaDuration: '04:12',
    tags: ['Audio Roleplay', 'Daily Life', 'Sambhasini Audio']
  },
  {
    id: 'w4',
    category: 'writing',
    title: 'Poem: Ganga ki Lahrein (Waves of the Ganges)',
    hindiTitle: 'कविता: गंगा की लहरें',
    author: 'Fatima Al-Mansoor',
    country: 'United Arab Emirates (Abu Dhabi SVCC)',
    level: 'CEFR B2',
    thumbnail: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
    excerpt: 'Lyrical Hindi poem celebrating the cultural ethos and spiritual heritage of Varanasi.',
    tags: ['Original Poetry', 'Classical Style', 'Devanagari']
  },
  {
    id: 'w5',
    category: 'video',
    title: 'Diplomatic Speech: Sustainable Development Goals',
    hindiTitle: 'राजनयिक भाषण: सतत विकास लक्ष्य एवं भारत की भूमिका',
    author: 'Carlos Mendes',
    country: 'Brazil (Ministry of Foreign Affairs, Brasilia)',
    level: 'CEFR B1',
    thumbnail: 'https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?auto=format&fit=crop&w=600&q=80',
    excerpt: 'Formal mock address delivered entirely in standard Hindi at the international envoys colloquium.',
    mediaDuration: '05:30',
    tags: ['Diplomatic Speech', 'UN SDGs', 'Video']
  },
  {
    id: 'w6',
    category: 'audio',
    title: 'Storytelling: Panchatantra Tales in Contemporary Hindi',
    hindiTitle: 'कथा वाचन: समकालीन भाषा में पंचतंत्र की कहानियां',
    author: 'Amara Okafor',
    country: 'Nigeria (High Commission of India, Abuja)',
    level: 'CEFR A2',
    thumbnail: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=600&q=80',
    excerpt: 'Expressive oral storytelling testing voice modulation, humor, and compound verb structures.',
    mediaDuration: '03:50',
    tags: ['Storytelling', 'Audio Lab', 'Culture']
  }
];

export default function CreativeShowcaseGallery() {
  const [selectedCategory, setSelectedCategory] = useState<ShowcaseCategory>('all');
  const [activeItemModal, setActiveItemModal] = useState<CreativeWorkItem | null>(null);

  const filteredWorks =
    selectedCategory === 'all'
      ? CREATIVE_WORKS
      : CREATIVE_WORKS.filter((w) => w.category === selectedCategory);

  const categories = [
    { id: 'all', label: 'All Submissions ', icon: Sparkles },
    { id: 'writing', label: 'Essays & Poetry ', icon: FileText },
    { id: 'video', label: 'Video Recitations ', icon: Video },
    { id: 'audio', label: 'Audio Dialogues ', icon: Mic }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2" aria-label="Learner Creative Showcase Gallery">
      <div className="bg-white border border-[#DCE2E6] shadow-xs rounded-md overflow-hidden">
        {/* Section Header Strip */}
        <div className="bg-[#0B3D91] text-white px-5 py-3 flex flex-wrap items-center justify-between gap-2 border-b-2 border-[#FF9933]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-300" aria-hidden="true" />
            <h2 className="text-xs font-bold uppercase tracking-wider">
              CREATIVE SHOWCASE GALLERY (शिक्षार्थी सृजन दीर्घा)
            </h2>
          </div>
          <span className="text-[11px] text-amber-200 font-semibold hidden sm:inline">
            Filterable Grid with Interactive Hover Reveals
          </span>
        </div>

        <div className="p-5 sm:p-7 space-y-6">
          {/* Top Intro + Category Filter Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <h3 className="text-base font-extrabold text-[#212121]">
                Global Learner Original Works
              </h3>
              <p className="text-xs text-[#555555]">
                Essays, poetry, speech recordings, and cultural dialogues created by international envoys and scholars.
              </p>
            </div>

            {/* Filter Tabs */}
            <div
              role="tablist"
              aria-label="Creative works filter"
              className="flex flex-wrap gap-1.5"
            >
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                const CatIcon = cat.icon;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setSelectedCategory(cat.id as ShowcaseCategory)}
                    className={`px-3 py-1.5 text-xs font-bold flex items-center gap-1.5 transition-all rounded-md focus:outline-none focus:ring-2 focus:ring-[#0B3D91] ${isSelected
                        ? 'bg-[#0B3D91] text-white shadow-xs'
                        : 'bg-[#F5F5F5] hover:bg-slate-200 text-slate-700 border border-slate-300'
                      }`}
                  >
                    {/* <CatIcon className="w-3.5 h-3.5" /> */}
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Filterable Showcase Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredWorks.map((work) => {
              return (
                <div
                  key={work.id}
                  className="group bg-[#F5F5F5] border border-[#DCE2E6] hover:border-[#0B3D91] hover:shadow-md transition-all duration-200 rounded-md overflow-hidden flex flex-col justify-between"
                >
                  {/* Thumbnail with Hover Reveal Overlay */}
                  <div className="relative h-44 w-full overflow-hidden bg-slate-900">
                    <img
                      src={work.thumbnail}
                      alt={work.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Gradient Shade */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Top Badges */}
                    <div className="absolute top-2 left-2 flex items-center gap-1.5">
                      <span className="px-2 py-0.5 bg-[#0B3D91] text-white text-[9px] font-bold uppercase rounded-md shadow-xs">
                        {work.level}
                      </span>
                      {work.mediaDuration && (
                        <span className="px-2 py-0.5 bg-black/70 text-amber-300 text-[9px] font-mono font-bold rounded-md">
                          ▶ {work.mediaDuration}
                        </span>
                      )}
                    </div>

                    {/* Hover Reveal Play / View Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200 bg-black/40 backdrop-blur-2xs">
                      <button
                        type="button"
                        onClick={() => setActiveItemModal(work)}
                        className="px-3.5 py-2 bg-[#FF9933] hover:bg-[#E68A2E] text-[#212121] font-bold text-xs flex items-center gap-1.5 shadow-lg rounded-md transition transform group-hover:scale-105 focus-visible:outline-white"
                        aria-label={`Preview ${work.title}`}
                      >
                        {work.category === 'writing' ? (
                          <>
                            <Eye className="w-4 h-4" /> Read Essay
                          </>
                        ) : work.category === 'video' ? (
                          <>
                            <Play className="w-4 h-4 fill-current" /> Watch Video
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-4 h-4" /> Play Audio
                          </>
                        )}
                      </button>
                    </div>

                    {/* Bottom Author Line over Image */}
                    <div className="absolute bottom-2 left-2 right-2 text-white">
                      <span className="text-[10px] font-bold text-amber-300 block truncate">
                        {work.author} ({work.country})
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-4 space-y-2.5 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-[#0B3D91] uppercase tracking-wider block">
                        {work.hindiTitle}
                      </span>
                      <h4 className="text-xs font-extrabold text-[#212121] line-clamp-2 mt-0.5">
                        {work.title}
                      </h4>
                      <p className="text-[11px] text-[#555555] font-normal leading-snug mt-1 line-clamp-2">
                        {work.excerpt}
                      </p>
                    </div>

                    {/* Tags */}
                    <div className="pt-2 border-t border-slate-200/80 flex flex-wrap gap-1">
                      {work.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-1.5 py-0.5 bg-white border border-slate-200 text-slate-600 text-[9px] font-medium rounded-md"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {activeItemModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeItemModal.title}
          className="fixed inset-0 bg-black/70 backdrop-blur-xs z-50 flex items-center justify-center p-4"
        >
          <div className="w-full max-w-xl bg-white border-2 border-[#0B3D91] p-6 space-y-4 shadow-2xl rounded-md animate-in fade-in zoom-in-95 duration-150 text-left">
            <div className="flex items-center justify-between border-b-2 border-[#0B3D91] pb-3">
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold uppercase text-[#0B3D91] tracking-wider block">
                  {activeItemModal.level} • {activeItemModal.category.toUpperCase()} SHOWCASE
                </span>
                <h3 className="text-base font-extrabold text-[#212121]">
                  {activeItemModal.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveItemModal(null)}
                className="p-1.5 hover:bg-slate-100 text-slate-500 hover:text-slate-900 rounded-md transition"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 bg-amber-50 border border-amber-200 text-xs font-bold text-[#0B3D91] rounded-md">
              {activeItemModal.hindiTitle}
            </div>

            <div className="space-y-2 text-xs text-[#555555]">
              <p className="leading-relaxed">{activeItemModal.excerpt}</p>
              <div className="p-4 bg-slate-900 text-slate-200 rounded-md space-y-2">
                <div className="flex items-center justify-between text-[11px] text-amber-300 font-mono">
                  <span>Author: {activeItemModal.author}</span>
                  <span>{activeItemModal.country}</span>
                </div>
                <div className="h-1 bg-slate-700 rounded-full overflow-hidden">
                  <div className="w-3/4 h-full bg-[#FF9933]" />
                </div>
                <p className="text-[10px] text-slate-400 italic">
                  Recorded and verified via Sambhasini Speech &amp; Devanagari Transcription Engine.
                </p>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setActiveItemModal(null)}
                className="px-4 py-2 bg-[#0B3D91] text-white font-bold text-xs rounded-md hover:bg-[#082C6C] transition"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
