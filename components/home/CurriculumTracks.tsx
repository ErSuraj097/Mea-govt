'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function CurriculumTracks() {
  const [activeTrack, setActiveTrack] = useState<'trackA' | 'trackB'>('trackA');

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3" aria-label="Curriculum Architecture and Bidirectional Tracks">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b-2 border-[#0B3D91] pb-2">
        <div>
          <span className="text-[10px] font-bold uppercase text-[#0B3D91] tracking-wider block">
            CURRICULUM ARCHITECTURE
          </span>
          <h2 className="text-base sm:text-lg font-bold text-[#212121]">
            Bidirectional Learning Tracks (द्विपक्षीय पाठ्यक्रम)
          </h2>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setActiveTrack('trackA')}
            className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition rounded-md ${activeTrack === 'trackA'
                ? 'bg-[#0B3D91] text-white border-b-2 border-[#FF9933]'
                : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
              }`}
            aria-pressed={activeTrack === 'trackA'}
          >
            Track A: Foreign Envoys ➔ Indian Languages
          </button>
          <button
            onClick={() => setActiveTrack('trackB')}
            className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition rounded-md ${activeTrack === 'trackB'
                ? 'bg-[#0B3D91] text-white border-b-2 border-[#FF9933]'
                : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
              }`}
            aria-pressed={activeTrack === 'trackB'}
          >
            Track B: Indian Scholars ➔ World Languages
          </button>
        </div>
      </div>

      {activeTrack === 'trackA' ? (
        <div className="p-5 bg-white border border-[#DCE2E6] border-l-4 border-l-[#0B3D91] space-y-3 text-left shadow-xs rounded-md">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
            <div>
              <span className="px-2 py-0.5 bg-blue-50 text-[#0B3D91] text-[10px] font-bold uppercase tracking-wider border border-blue-200 rounded-md">
                Track A Mandate • ICCR Fellowship Accredited
              </span>
              <h3 className="text-sm font-bold text-[#212121] mt-1">
                Indian Language Learning for International Envoys &amp; Overseas Researchers
              </h3>
              <p className="text-xs text-[#555555] mt-0.5 font-normal">
                Master Devanagari script, Hindi conversational diplomacy, Tamil, Bengali, Sanskrit, and 22 Schedule VIII languages with Sambhasini AI.
              </p>
            </div>
            <Link
              href="/login"
              className="px-4 py-2 bg-[#0B3D91] hover:bg-[#082C6C] text-white font-bold text-xs uppercase tracking-wider shrink-0 transition rounded-md"
            >
              Explore Track A Catalog →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-2.5 pt-1">
            <div className="p-2.5 bg-[#F5F5F5] border border-slate-200 space-y-0.5 rounded-md">
              <span className="text-[10px] font-bold text-[#0B3D91] uppercase">Level 1 (CEFR A1)</span>
              <h4 className="text-xs font-bold text-[#212121]">वर्णमाला व प्राथमिक शिष्टाचार</h4>
              <p className="text-[11px] text-[#555555]">Akshara recognition, conjuncts, basic diplomat greetings.</p>
            </div>
            <div className="p-2.5 bg-[#F5F5F5] border border-slate-200 space-y-0.5 rounded-md">
              <span className="text-[10px] font-bold text-[#0B3D91] uppercase">Level 2 (CEFR A2)</span>
              <h4 className="text-xs font-bold text-[#212121]">दैनिक संवाद व व्यावहारिक भाषा</h4>
              <p className="text-[11px] text-[#555555]">Conversational drills, market transactions, cultural context.</p>
            </div>
            <div className="p-2.5 bg-[#F5F5F5] border border-slate-200 space-y-0.5 rounded-md">
              <span className="text-[10px] font-bold text-[#0B3D91] uppercase">Level 3 (CEFR B1)</span>
              <h4 className="text-xs font-bold text-[#212121]">राजनयिक विमर्श व पत्राचार</h4>
              <p className="text-[11px] text-[#555555]">Official note verbale reading, formal bilateral dialogues.</p>
            </div>
            <div className="p-2.5 bg-[#F5F5F5] border border-slate-200 space-y-0.5 rounded-md">
              <span className="text-[10px] font-bold text-[#0B3D91] uppercase">Level 4 (CEFR B2)</span>
              <h4 className="text-xs font-bold text-[#212121]">सांस्कृतिक एवं बहुभाषिक सम्मेलन</h4>
              <p className="text-[11px] text-[#555555]">Multilateral treaty terminology and impromptu speech.</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-5 bg-white border border-[#DCE2E6] border-l-4 border-l-[#138808] space-y-3 text-left shadow-xs rounded-md">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
            <div>
              <span className="px-2 py-0.5 bg-emerald-50 text-[#138808] text-[10px] font-bold uppercase tracking-wider border border-emerald-200 rounded-md">
                Track B Mandate • Global Career Readiness
              </span>
              <h3 className="text-sm font-bold text-[#212121] mt-1">
                World Language Mastery for Indian Diplomats, Students &amp; Professionals
              </h3>
              <p className="text-xs text-[#555555] mt-0.5 font-normal">
                Learn French, Spanish, German, Japanese, Mandarin, Arabic, and Russian with bidirectional pedagogical translation.
              </p>
            </div>
            <Link
              href="/login"
              className="px-4 py-2 bg-[#138808] hover:bg-[#0E6606] text-white font-bold text-xs uppercase tracking-wider shrink-0 transition rounded-md"
            >
              Explore Track B Catalog →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-2.5 pt-1">
            <div className="p-2.5 bg-[#F5F5F5] border border-slate-200 space-y-0.5 rounded-md">
              <span className="text-[10px] font-bold text-[#138808] uppercase">European Languages</span>
              <h4 className="text-xs font-bold text-[#212121]">French, Spanish, German, Russian</h4>
              <p className="text-[11px] text-[#555555]">Comparative grammar with Hindi case endings (कारक).</p>
            </div>
            <div className="p-2.5 bg-[#F5F5F5] border border-slate-200 space-y-0.5 rounded-md">
              <span className="text-[10px] font-bold text-[#138808] uppercase">East Asian Languages</span>
              <h4 className="text-xs font-bold text-[#212121]">Japanese, Mandarin, Korean</h4>
              <p className="text-[11px] text-[#555555]">Character stroke orders and bilateral trade lexicon.</p>
            </div>
            <div className="p-2.5 bg-[#F5F5F5] border border-slate-200 space-y-0.5 rounded-md">
              <span className="text-[10px] font-bold text-[#138808] uppercase">West Asian Languages</span>
              <h4 className="text-xs font-bold text-[#212121]">Arabic &amp; Persian</h4>
              <p className="text-[11px] text-[#555555]">Gulf diplomatic and commercial business communication.</p>
            </div>
            <div className="p-2.5 bg-[#F5F5F5] border border-slate-200 space-y-0.5 rounded-md">
              <span className="text-[10px] font-bold text-[#138808] uppercase">African Languages</span>
              <h4 className="text-xs font-bold text-[#212121]">Swahili &amp; Hausa</h4>
              <p className="text-[11px] text-[#555555]">Global South cooperation and multilateral engagement.</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
