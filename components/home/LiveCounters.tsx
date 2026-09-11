'use client';

import React from 'react';

export interface StatItem {
  count: string;
  label: string;
  sublabel: string;
  badge: string;
}

const DEFAULT_STATS: StatItem[] = [
  { count: '22', label: 'Eighth Schedule Languages', sublabel: 'National AI Architecture', badge: 'SOVEREIGN' },
  { count: '15+', label: 'World Languages', sublabel: 'Bidirectional MEA Tracks', badge: 'GLOBAL' },
  { count: '190+', label: 'Missions & Posts Abroad', sublabel: 'Embassies & High Commissions', badge: 'DIPLOMATIC' },
  { count: '32M+', label: 'Global Indian Diaspora', sublabel: 'Pravasi Bharatiya Reach', badge: 'DIASPORA' },
  { count: '1,307', label: 'ICCR Fellowships Awarded', sublabel: 'Subsidized Language Training', badge: 'FELLOWSHIPS' },
  { count: '24/7', label: 'MeitY Sambhasini Voice AI', sublabel: 'Sovereign Speech Engine', badge: 'VOICE AI' },
];

export default function LiveCounters({ stats = DEFAULT_STATS }: { stats?: StatItem[] }) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3" aria-label="Portal Live Counters and Scale">
      <div className="flex items-center justify-between border-b-2 border-[#0B3D91] pb-2">
        <div>
          <span className="text-[10px] font-bold uppercase text-[#0B3D91] tracking-wider block">
            PORTAL SCALE &amp; IMPACT
          </span>
          <h2 className="text-base sm:text-lg font-bold text-[#212121]">
            Live Performance Counters (सक्रिय आंकड़े)
          </h2>
        </div>
        <span className="text-xs text-[#555555]">2026 Academic Deployment</span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="p-3.5 bg-white border border-[#DCE2E6] border-t-2 border-t-[#0B3D91] text-center space-y-1 hover:border-t-[#FF9933] transition shadow-xs group rounded-md overflow-hidden"
          >
            <span className="px-1.5 py-0.2 bg-[#F5F5F5] text-slate-700 text-[8px] font-bold uppercase tracking-wider block mb-1 border border-slate-200 rounded-md">
              {stat.badge}
            </span>
            <div className="text-xl sm:text-2xl font-black text-[#0B3D91] group-hover:text-[#082C6C] transition">
              {stat.count}
            </div>
            <p className="text-xs font-bold text-[#212121] leading-snug">{stat.label}</p>
            <span className="text-[10px] text-[#555555] block">{stat.sublabel}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
