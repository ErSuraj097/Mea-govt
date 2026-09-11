'use client';

import React from 'react';
import Link from 'next/link';
import { Radio, ChevronRight, BellRing } from 'lucide-react';

const MARQUEE_NEWS = [
  {
    tag: 'LATEST ADVISORY',
    text: 'Bilateral Language Fellowships (ICCR) Approved for Foreign Envoys & Diaspora Scholars. 100% Subsidized CEFR Certification.'
  },
  {
    tag: 'SAMBHASINI AI ENGINE',
    text: 'MeitY Sambhasini Neural Speech Acoustic Lab Activated Across 190+ Indian Missions for 24/7 Phonetic & Accent Coaching.'
  },
  {
    tag: 'ADMISSION OPEN',
    text: 'Phase 1 Hindi & 22 Eighth Schedule Indian Language Cohorts for International Diplomatic Envoys and Researchers.'
  },
  {
    tag: 'CEFR CERTIFICATION',
    text: 'Kendriya Hindi Sansthan Standardized A1–B2 Digital Diplomas with Tamper-Evident Cryptographic QR Verification.'
  },
  {
    tag: 'SVCC MASTERCLASSES',
    text: '38 Swami Vivekananda Cultural Centres Globally Launch Real-Time Hybrid Speaking & Pronunciation Workshops.'
  }
];

export default function LiveNewsMarquee() {
  return (
    <section
      aria-label="Official MEA Live News Tracker"
      className="w-full bg-[#082C6C] text-white border-b border-[#051C45] text-xs m-0 overflow-hidden select-none"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex items-center justify-between gap-3">
        
        {/* Left Sticky Badge */}
        <div className="flex items-center shrink-0 z-10 bg-[#082C6C] pr-2">
          <span className="px-2 py-0.5 bg-[#FF9933] text-[#212121] font-bold text-[10px] uppercase tracking-wider shrink-0 flex items-center gap-1 rounded-md shadow-2xs">
            <Radio className="w-3 h-3 text-[#212121] animate-pulse" aria-hidden="true" />
            LIVE TRACKER
          </span>
        </div>

        {/* Continuous Smooth Horizontal Marquee Container */}
        <div className="flex-1 overflow-hidden relative group">
          <div className="animate-marquee-continuous flex items-center gap-10 whitespace-nowrap py-0.5">
            {/* First sequence */}
            {MARQUEE_NEWS.map((item, idx) => (
              <div key={`item-1-${idx}`} className="flex items-center gap-2 text-[11px] sm:text-xs text-slate-100 font-medium">
                <span className="text-amber-300 font-bold">[{item.tag}]</span>
                <span>{item.text}</span>
                <span className="text-[#FF9933] font-bold ml-4" aria-hidden="true">•</span>
              </div>
            ))}

            {/* Duplicate sequence for continuous infinite loop */}
            {MARQUEE_NEWS.map((item, idx) => (
              <div key={`item-2-${idx}`} className="flex items-center gap-2 text-[11px] sm:text-xs text-slate-100 font-medium">
                <span className="text-amber-300 font-bold">[{item.tag}]</span>
                <span>{item.text}</span>
                <span className="text-[#FF9933] font-bold ml-4" aria-hidden="true">•</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Sticky Advisories Link */}
        <div className="hidden md:flex items-center shrink-0 z-10 bg-[#082C6C] pl-2 border-l border-white/10">
          <Link
            href="/about"
            className="text-amber-300 hover:text-white font-semibold text-[11px] shrink-0 flex items-center gap-1 underline transition"
          >
            All Advisories <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
          </Link>
        </div>

      </div>
    </section>
  );
}
