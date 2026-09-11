'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Check, Copy } from 'lucide-react';

export default function LeadershipVision() {
  const [pmQuoteLang, setPmQuoteLang] = useState<'en' | 'hi' | 'sa'>('en');
  const [copiedQuote, setCopiedQuote] = useState(false);

  const copyPmQuote = () => {
    const text =
      pmQuoteLang === 'en'
        ? '"Partnerships can succeed only when they are built on trust. Today, the most strategic asset is not minerals, technology, or markets - it is mutual trust." — Prime Minister of India'
        : pmQuoteLang === 'hi'
          ? '"साझेदारियाँ तभी सफल होती हैं जब उनके केंद्र में विश्वास हो। आज सबसे महत्वपूर्ण Strategic Asset कोई mineral, technology या market नहीं, बल्कि आपसी विश्वास है।" — भारत के प्रधानमंत्री'
          : '"विश्वासमूलो हि संबन्धः सर्वसिद्धिकरो भवेत्। न हि वित्तेन विद्यया वा विश्वासेन हि संसिद्धिः॥" — भारतस्य प्रधानमन्त्री';
    navigator.clipboard.writeText(text);
    setCopiedQuote(true);
    setTimeout(() => setCopiedQuote(false), 2000);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3" aria-label="Government Leadership and Vision">
      <div className="border-b-2 border-[#0B3D91] pb-2 flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold uppercase text-[#0B3D91] tracking-wider block">
            GOVERNMENT LEADERSHIP &amp; VISION
          </span>
          <h2 className="text-base sm:text-lg font-bold text-[#212121]">
            Ministry Leadership &amp; Diplomatic Vision
          </h2>
        </div>
        <span className="text-xs text-[#555555] hidden sm:inline">Official Statements</span>
      </div>

      {/* Prime Minister Vision Statement */}
      <div className="bg-white border border-[#DCE2E6] border-l-4 border-l-[#FF9933] p-5 shadow-xs flex flex-col md:flex-row items-center gap-5 text-left rounded-md">
        <div className="w-32 h-36 bg-[#082C6C] text-white border border-slate-300 flex flex-col items-center justify-center p-1 text-center shrink-0 shadow-xs overflow-hidden rounded-md">
          <img
            src="/images/PM-Narendra-Modi.webp"
            alt="Prime Minister of India"
            className="w-full h-24 object-cover object-top rounded-md"
          />
          <div className="py-0.5 bg-[#082C6C] w-full">
            <span className="text-[11px] font-bold text-white block truncate">Prime Minister</span>
            <span className="text-[9px] text-amber-300 font-medium block">Republic of India</span>
          </div>
        </div>

        <div className="space-y-2.5 flex-1">
          <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
            <span className="text-[10px] font-bold uppercase text-[#0B3D91] tracking-wider">
              OFFICIAL LEADERSHIP VISION STATEMENT
            </span>
            <div className="flex items-center gap-1 text-[11px] font-medium">
              <button
                onClick={() => setPmQuoteLang('en')}
                className={`px-2 py-0.5 transition rounded-md ${pmQuoteLang === 'en' ? 'bg-[#0B3D91] text-white font-bold' : 'bg-[#F5F5F5] text-slate-700'}`}
                aria-label="View quote in English"
              >
                English
              </button>
              <button
                onClick={() => setPmQuoteLang('hi')}
                className={`px-2 py-0.5 transition rounded-md ${pmQuoteLang === 'hi' ? 'bg-[#0B3D91] text-white font-bold' : 'bg-[#F5F5F5] text-slate-700'}`}
                aria-label="View quote in Hindi"
              >
                हिन्दी
              </button>
              <button
                onClick={() => setPmQuoteLang('sa')}
                className={`px-2 py-0.5 transition rounded-md ${pmQuoteLang === 'sa' ? 'bg-[#0B3D91] text-white font-bold' : 'bg-[#F5F5F5] text-slate-700'}`}
                aria-label="View quote in Sanskrit"
              >
                संस्कृतम्
              </button>
              <button
                onClick={copyPmQuote}
                title="Copy Vision Statement"
                className="p-1 ml-1 text-slate-500 hover:text-[#0B3D91] transition rounded-md"
                aria-label="Copy quote text"
              >
                {copiedQuote ? <Check className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" /> : <Copy className="w-3.5 h-3.5" aria-hidden="true" />}
              </button>
            </div>
          </div>

          {pmQuoteLang === 'en' && (
            <p className="text-xs sm:text-sm font-normal text-[#212121] leading-relaxed italic">
              &quot;Partnerships can succeed only when they are built on trust. Today, the most strategic asset is not minerals, technology, or markets - it is mutual trust.&quot;
            </p>
          )}
          {pmQuoteLang === 'hi' && (
            <p className="text-xs sm:text-sm font-bold text-[#0B3D91] leading-relaxed">
              &quot;साझेदारियाँ तभी सफल होती हैं जब उनके केंद्र में विश्वास हो। आज सबसे महत्वपूर्ण Strategic Asset कोई mineral, technology या market नहीं, बल्कि आपसी विश्वास है।&quot;
            </p>
          )}
          {pmQuoteLang === 'sa' && (
            <p className="text-xs sm:text-sm font-bold text-[#0B3D91] leading-relaxed">
              &quot;विश्वासमूलो हि संबन्धः सर्वसिद्धिकरो भवेत्। न हि वित्तेन विद्यया वा विश्वासेन हि संसिद्धिः॥&quot;
            </p>
          )}

          <div className="flex items-center gap-3 text-[11px] text-[#555555] pt-1 border-t border-slate-100">
            <span>Diplomatic Forum: <strong className="text-[#212121]">Global Summit</strong></span>
            <span>•</span>
            <span>Accreditation: <strong className="text-[#212121]">Government of India</strong></span>
          </div>
        </div>
      </div>

      {/* Secondary Ministers Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
        {/* External Affairs Minister */}
        <div className="lg:col-span-6 bg-white border border-[#DCE2E6] border-l-4 border-l-[#0B3D91] p-3.5 flex items-center gap-3.5 text-left shadow-xs rounded-md">
          <div className="w-20 h-24 bg-[#082C6C] text-amber-300 flex flex-col items-center justify-center p-1 text-center shrink-0 border border-slate-300 overflow-hidden rounded-md">
            <img
              src="/images/Dr-S-Jaishankar.webp"
              alt="External Affairs Minister"
              className="w-full h-18 object-cover object-top rounded-md"
            />
            <span className="text-[7px] font-bold text-white bg-[#082C6C] w-full py-0.5 block truncate">EAM INDIA</span>
          </div>
          <div className="space-y-0.5">
            <h3 className="text-xs font-bold text-[#0B3D91]">External Affairs Minister</h3>
            <p className="text-[11px] text-[#212121] font-semibold">Ministry of External Affairs</p>
            <p className="text-[11px] text-[#555555] line-clamp-2">Leading India&apos;s cultural diplomacy and bilateral language cooperation globally.</p>
            <div className="pt-0.5">
              <Link href="/about" className="text-[11px] font-semibold text-[#0645AD] hover:underline">
                Official Statements &amp; Mandate →
              </Link>
            </div>
          </div>
        </div>

        {/* Ministers of State */}
        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-white border border-[#DCE2E6] border-l-4 border-l-slate-400 p-3 flex items-center gap-2.5 text-left shadow-xs rounded-md">
            <img
              src="/images/Shri-Kirti-Vardhan-Singh.webp"
              alt="Minister of State for External Affairs"
              className="w-14 h-18 object-cover object-top border border-slate-300 shrink-0 rounded-md"
            />
            <div className="space-y-0.5">
              <h4 className="text-xs font-bold text-[#0B3D91]">Minister of State</h4>
              <p className="text-[10px] text-[#555555]">Ministry of External Affairs</p>
              <Link href="/about" className="text-[10px] font-semibold text-[#0645AD] hover:underline block pt-0.5">
                Official Portfolio →
              </Link>
            </div>
          </div>

          <div className="bg-white border border-[#DCE2E6] border-l-4 border-l-slate-400 p-3 flex items-center gap-2.5 text-left shadow-xs rounded-md">
            <img
              src="/images/Shri-Pabitra-Margherita.webp"
              alt="Minister of State for External Affairs"
              className="w-14 h-18 object-cover object-top border border-slate-300 shrink-0 rounded-md"
            />
            <div className="space-y-0.5">
              <h4 className="text-xs font-bold text-[#0B3D91]">Minister of State</h4>
              <p className="text-[10px] text-[#555555]">Ministry of External Affairs</p>
              <Link href="/about" className="text-[10px] font-semibold text-[#0645AD] hover:underline block pt-0.5">
                Official Portfolio →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
