'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FileText } from 'lucide-react';

export interface CircularItem {
  id: string;
  date: string;
  badge: string;
  title: string;
  desc: string;
  ref: string;
  type: 'releases' | 'advisories' | 'fellowships';
}

const DEFAULT_CIRCULARS: CircularItem[] = [
  {
    id: 'c1',
    date: '28 Aug 2026',
    badge: 'ICCR FELLOWSHIP',
    title: 'Bilateral Language Fellowships (ICCR 2026-27) Approved for Foreign Envoys & Diaspora Scholars',
    desc: 'Ministry of External Affairs approves 100% subsidized CEFR A1-B2 Hindi & Classical Indian Language certification for foreign envoys.',
    ref: 'MEA/ICCR/LANG/2026/08',
    type: 'fellowships'
  },
  {
    id: 'c2',
    date: '25 Aug 2026',
    badge: 'Sambhasini INTEGRATION',
    title: 'MeitY Sambhasini ULCA v2 Speech Assessment Engine Activated Across All 22 Scheduled Languages',
    desc: 'Real-time Devanagari acoustic modeling and retroflex cadence analysis deployed with color-coded phonetic feedback.',
    ref: 'MEITY/Sambhasini/SOV/891',
    type: 'releases'
  },
  {
    id: 'c3',
    date: '20 Aug 2026',
    badge: 'GLOBAL DIASPORA CELL',
    title: 'Monthly Live Language Circles Scheduled for North America, Europe, and Gulf Timezones',
    desc: 'Interactive 60-minute conversational roundtables hosted by senior Indian diplomats and native linguists.',
    ref: 'MEA/DIASPORA/CIRCLES/44',
    type: 'advisories'
  },
  {
    id: 'c4',
    date: '15 Aug 2026',
    badge: 'DIPLOMATIC CERTIFICATION',
    title: 'Standardized CEFR A1-C2 Classical Sanskrit & Tamil Evaluation Framework Notified',
    desc: 'Official notification regarding standardized oral proficiency benchmarks for international university researchers.',
    ref: 'MEA/CULTURE/EVAL/102',
    type: 'fellowships'
  }
];

export default function OfficialCirculars({ circulars = DEFAULT_CIRCULARS }: { circulars?: CircularItem[] }) {
  const [activeTab, setActiveTab] = useState<'releases' | 'advisories' | 'fellowships'>('releases');

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3" aria-label="Official MEA Circulars and Notifications">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b-2 border-[#0B3D91] pb-2">
        <div>
          <span className="text-[10px] font-bold uppercase text-[#0B3D91] tracking-wider block">
            PRESS RELEASES &amp; CIRCULARS
          </span>
          <h2 className="text-base sm:text-lg font-bold text-[#212121]">
            Official Notifications &amp; Circulars (विज्ञप्तियां)
          </h2>
        </div>

        <div className="flex gap-1" role="tablist" aria-label="Circular Types">
          <button
            role="tab"
            aria-selected={activeTab === 'releases'}
            onClick={() => setActiveTab('releases')}
            className={`px-3 py-1 text-xs font-bold uppercase tracking-wider transition rounded-md ${activeTab === 'releases' ? 'bg-[#0B3D91] text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
          >
            Press Releases
          </button>
          <button
            role="tab"
            aria-selected={activeTab === 'advisories'}
            onClick={() => setActiveTab('advisories')}
            className={`px-3 py-1 text-xs font-bold uppercase tracking-wider transition rounded-md ${activeTab === 'advisories' ? 'bg-[#0B3D91] text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
          >
            Advisories
          </button>
          <button
            role="tab"
            aria-selected={activeTab === 'fellowships'}
            onClick={() => setActiveTab('fellowships')}
            className={`px-3 py-1 text-xs font-bold uppercase tracking-wider transition rounded-md ${activeTab === 'fellowships' ? 'bg-[#0B3D91] text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
          >
            ICCR Fellowships
          </button>
        </div>
      </div>

      <div className="bg-white border border-[#DCE2E6] divide-y divide-slate-100 shadow-xs rounded-md overflow-hidden">
        {circulars
          .filter((c) => activeTab === 'releases' || c.type === activeTab)
          .map((item) => (
            <div key={item.id} className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 hover:bg-slate-50 transition">
              <div className="space-y-1 text-left max-w-3xl">
                <div className="flex items-center gap-2">
                  <span className="px-1.5 py-0.2 bg-amber-50 text-[#8A4B00] border border-amber-300 text-[9px] font-bold uppercase rounded-md">
                    {item.badge}
                  </span>
                  <span className="text-[11px] text-[#555555] font-mono font-semibold">{item.date}</span>
                  <span className="text-[10px] text-slate-400">• Ref: {item.ref}</span>
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-[#212121] hover:text-[#0645AD] transition cursor-pointer">
                  {item.title}
                </h3>
                <p className="text-xs text-[#555555] leading-relaxed font-normal">{item.desc}</p>
              </div>

              <Link
                href="/login"
                className="px-3.5 py-1.5 bg-[#F5F5F5] hover:bg-[#0B3D91] text-slate-700 hover:text-white text-xs font-semibold uppercase tracking-wider shrink-0 transition flex items-center gap-1.5 self-start md:self-center border border-slate-200 rounded-md"
              >
                <FileText className="w-3.5 h-3.5" aria-hidden="true" /> View Directive
              </Link>
            </div>
          ))}
      </div>
    </section>
  );
}
