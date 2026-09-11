'use client';

import React from 'react';
import Link from 'next/link';
import {
  Award,
  Zap,
  Globe,
  Users,
  ShieldCheck,
  Headphones,
  ArrowRight
} from 'lucide-react';

export interface KeyPortalItem {
  title: string;
  hindi: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  tag: string;
  borderColor: string;
}

const DEFAULT_PORTALS: KeyPortalItem[] = [
  {
    title: 'ICCR Bilateral Fellowships',
    hindi: 'भारतीय सांस्कृतिक सम्बंध परिषद फेलोशिप',
    desc: '100% Subsidized CEFR A1–B2 language certification for foreign diplomats, researchers, and overseas youth.',
    icon: Award,
    href: '/login',
    tag: 'ICCR 2026-27',
    borderColor: 'border-t-[#FF9933]'
  },
  {
    title: 'MeitY Sambhasini Voice AI',
    hindi: 'भाषिणी राष्ट्रीय स्वर व भाषा इंजन',
    desc: 'Sovereign ULCA v2 speech recognition (ASR), Devanagari retroflex cadence scoring, and pronunciation analysis.',
    icon: Zap,
    href: '/login',
    tag: 'Digital India',
    borderColor: 'border-t-[#0B3D91]'
  },
  {
    title: 'Bidirectional Language Network',
    hindi: 'द्विपक्षीय भाषा प्रसार तंत्र',
    desc: 'Track A for foreign diplomats learning Indian languages; Track B for Indian citizens mastering world languages.',
    icon: Globe,
    href: '/login',
    tag: 'Track A & B',
    borderColor: 'border-t-[#138808]'
  },
  {
    title: 'Diplomatic Roundtables & Circles',
    hindi: 'मासिक राजनयिक भाषा संवाद गोष्ठी',
    desc: 'Monthly 60-minute conversational circles hosted by senior Indian ambassadors and accredited linguists.',
    icon: Users,
    href: '/login',
    tag: 'Monthly Live',
    borderColor: 'border-t-[#FF9933]'
  },
  {
    title: 'CEFR Verifiable Diplomas',
    hindi: 'सत्यापनीय डिजिटल प्रमाणपत्र',
    desc: 'Cryptographically signed transcripts recognized by MEA, Kendriya Hindi Sansthan, and Central Universities.',
    icon: ShieldCheck,
    href: '/login',
    tag: 'GIGW 3.0',
    borderColor: 'border-t-[#0B3D91]'
  },
  {
    title: 'AI Telephony & Voice Agent',
    hindi: 'स्वचालित टेलीफोनी व संवाद अभ्यास',
    desc: 'Automated outbound phone drills and in-browser voice practice with real-time acoustic feedback.',
    icon: Headphones,
    href: '/login',
    tag: 'Sambhasini AI',
    borderColor: 'border-t-[#138808]'
  }
];

export default function KeyServicesGrid({ portals = DEFAULT_PORTALS }: { portals?: KeyPortalItem[] }) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3" aria-label="Key Sovereign Services and Tools">
      <div className="flex items-center justify-between border-b-2 border-[#0B3D91] pb-2">
        <div>
          <span className="text-[10px] font-bold uppercase text-[#0B3D91] tracking-wider block">
            KEY SOVEREIGN SERVICES
          </span>
          <h2 className="text-base sm:text-lg font-bold text-[#212121]">
            Digital Infrastructure &amp; Academic Modules
          </h2>
        </div>
        <span className="text-xs text-[#555555]">ICCR &amp; MeitY Unified</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {portals.map((portal, idx) => {
          const IconComponent = portal.icon;
          return (
            <Link
              key={idx}
              href={portal.href}
              className={`p-4 bg-white border border-[#DCE2E6] ${portal.borderColor} border-t-2 hover:border-[#0B3D91] transition space-y-2.5 block text-left shadow-xs hover:shadow-sm group rounded-md`}
            >
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 bg-[#F5F5F5] group-hover:bg-[#0B3D91] text-[#0B3D91] group-hover:text-white flex items-center justify-center transition rounded-md">
                  <IconComponent className="w-4 h-4" />
                </div>
                <span className="px-1.5 py-0.2 bg-[#F5F5F5] text-slate-700 text-[9px] font-bold uppercase tracking-wider border border-slate-200 rounded-md">
                  {portal.tag}
                </span>
              </div>

              <div>
                <h3 className="text-xs sm:text-sm font-bold text-[#212121] group-hover:text-[#0B3D91] transition">
                  {portal.title}
                </h3>
                <span className="text-[10px] text-[#0B3D91] font-semibold block mt-0.5">{portal.hindi}</span>
                <p className="text-xs text-[#555555] mt-1.5 leading-relaxed font-normal">{portal.desc}</p>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center text-xs font-semibold text-[#0645AD] group-hover:underline">
                Access Module <ArrowRight className="w-3.5 h-3.5 ml-1 transition group-hover:translate-x-1" aria-hidden="true" />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
