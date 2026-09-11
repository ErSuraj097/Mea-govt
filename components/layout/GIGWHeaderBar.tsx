'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Eye,
  Volume2,
  Lock,
  Globe,
  ChevronDown,
  X
} from 'lucide-react';
import {
  SUPPORTED_UI_LANGUAGES,
  SupportedUILang,
  getUIText
} from '@/lib/i18nChrome';
import {
  getStoredUILang,
  setStoredUILang
} from '@/lib/lmsStore';

export default function GIGWHeaderBar() {
  const [fontSizeLevel, setFontSizeLevel] = useState<number>(0); // -1: small, 0: normal, 1: large
  const [highContrast, setHighContrast] = useState(false);
  const [complianceDropdownOpen, setComplianceDropdownOpen] = useState(false);
  const [screenReaderActive, setScreenReaderActive] = useState(false);
  const [currentUILang, setCurrentUILang] = useState<SupportedUILang>('en');

  useEffect(() => {
    setCurrentUILang(getStoredUILang());
  }, []);

  // Handle Font Size Manipulation
  useEffect(() => {
    const htmlEl = document.documentElement;
    if (fontSizeLevel === 1) {
      htmlEl.style.fontSize = '18px';
    } else if (fontSizeLevel === -1) {
      htmlEl.style.fontSize = '14px';
    } else {
      htmlEl.style.fontSize = '16px';
    }
  }, [fontSizeLevel]);

  // Handle High Contrast Mode Toggle
  useEffect(() => {
    if (highContrast) {
      document.body.classList.add('gigw-high-contrast');
    } else {
      document.body.classList.remove('gigw-high-contrast');
    }
  }, [highContrast]);

  const handleLangChange = (lang: SupportedUILang) => {
    setCurrentUILang(lang);
    setStoredUILang(lang);
    window.dispatchEvent(new Event('ui_lang_changed'));
  };

  const handleScreenReaderAnnounce = () => {
    setScreenReaderActive(true);
    const msg =
      currentUILang === 'hi'
        ? 'स्क्रीन रीडर सक्रिय। विदेश मंत्रालय भारतीय एवं वैश्विक भाषा प्रसार पोर्टल, जीआईजीडब्ल्यू 3.0 एवं डब्ल्यूसीएजी 2.1 एए प्रमाणित।'
        : 'Screen Reader Access Active. Ministry of External Affairs Indian & Global Language Portal. GIGW 3.0 and WCAG 2.1 Level AA Accessibility Enabled.';

    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(msg);
      utterance.lang = currentUILang === 'hi' ? 'hi-IN' : 'en-US';
      window.speechSynthesis.speak(utterance);
    } else {
      alert(msg);
    }
    setTimeout(() => setScreenReaderActive(false), 5000);
  };

  return (
    <header className="bg-[#082C6C] text-slate-100 border-b border-[#051C45] text-[11px] font-medium relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex flex-wrap items-center justify-between gap-2">
        {/* Left Side: MEA Ministry & GIGW Compliance Badge */}
        <div className="flex items-center gap-2.5">
          {/* Skip to Main Content Link (GIGW 3.0 Mandatory Requirement) */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-2 focus:left-2 focus:px-3 focus:py-1.5 focus:bg-[#FF9933] focus:text-[#212121] font-bold focus:outline-2 focus:outline-white shadow-md rounded-md"
            aria-label="Skip to main page content"
          >
            {getUIText(currentUILang, 'skipToMain')}
          </a>

          <div className="flex items-center gap-1.5">
            <span className="px-1.5 py-0.5 rounded-md bg-white/10 border border-white/20 text-[10px] font-bold text-amber-200">
              {getUIText(currentUILang, 'govtIndia')}
            </span>
            <span className="text-slate-200 font-semibold hidden md:inline">
              {getUIText(currentUILang, 'ministryMEA')}
            </span>
          </div>

          <span className="hidden lg:inline text-slate-400" aria-hidden="true">•</span>

          {/* Compliance Rating Trigger Button */}
          <button
            onClick={() => setComplianceDropdownOpen(!complianceDropdownOpen)}
            className="hidden lg:flex items-center gap-1 text-emerald-300 hover:text-white transition font-medium focus-visible:outline-white rounded-md px-1.5 py-0.5"
            aria-expanded={complianceDropdownOpen}
            aria-haspopup="dialog"
            aria-label="View GIGW 3.0 and WCAG 2.1 AA Compliance Details"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
            <span>GIGW 3.0 &amp; WCAG 2.1 AA</span>
            <ChevronDown className="w-3 h-3" aria-hidden="true" />
          </button>
        </div>

        {/* Right Side: Accessibility Toolbar (Font Size, Contrast, Screen Reader, Multilingual Chrome) */}
        <div className="flex items-center gap-2 sm:gap-3 text-slate-200">
          {/* Screen Reader Access */}
          <button
            onClick={handleScreenReaderAnnounce}
            className={`flex items-center gap-1 px-2 py-0.5 border rounded-md transition ${screenReaderActive
              ? 'bg-[#FF9933] text-[#212121] border-[#FF9933] font-bold'
              : 'border-white/20 hover:bg-white/10 text-slate-200'
              }`}
            title="Screen Reader Access"
            aria-label="Screen Reader Access Toggle"
          >
            <Volume2 className="w-3.5 h-3.5 text-amber-300" aria-hidden="true" />
            <span className="hidden sm:inline">{getUIText(currentUILang, 'screenReader')}</span>
          </button>

          {/* Text Size Adjuster (A- / A / A+) */}
          <div
            className="flex items-center bg-[#051C45] border border-white/20 rounded-md overflow-hidden"
            role="group"
            aria-label="Text Size Controls"
          >
            <button
              onClick={() => setFontSizeLevel(-1)}
              className={`px-2 py-0.5 transition font-bold ${fontSizeLevel === -1 ? 'bg-[#FF9933] text-[#212121]' : 'hover:bg-white/10 text-slate-200'
                }`}
              title="Decrease Font Size (A-)"
              aria-label="Decrease Font Size"
              aria-pressed={fontSizeLevel === -1}
            >
              A-
            </button>
            <button
              onClick={() => setFontSizeLevel(0)}
              className={`px-2 py-0.5 border-x border-white/20 transition font-bold ${fontSizeLevel === 0 ? 'bg-[#0B3D91] text-amber-300' : 'hover:bg-white/10 text-slate-200'
                }`}
              title="Reset Standard Font Size (A)"
              aria-label="Reset Standard Font Size"
              aria-pressed={fontSizeLevel === 0}
            >
              A
            </button>
            <button
              onClick={() => setFontSizeLevel(1)}
              className={`px-2 py-0.5 transition font-bold ${fontSizeLevel === 1 ? 'bg-[#FF9933] text-[#212121]' : 'hover:bg-white/10 text-slate-200'
                }`}
              title="Increase Font Size (A+)"
              aria-label="Increase Font Size"
              aria-pressed={fontSizeLevel === 1}
            >
              A+
            </button>
          </div>

          {/* High Contrast Toggle */}
          <button
            onClick={() => setHighContrast(!highContrast)}
            className={`flex items-center gap-1 px-2 py-0.5 border rounded-md transition ${highContrast
              ? 'bg-amber-300 text-[#000000] border-amber-300 font-bold'
              : 'border-white/20 hover:bg-white/10 text-slate-200'
              }`}
            title="Toggle High Contrast Mode"
            aria-label="Toggle High Contrast Accessibility Mode"
            aria-pressed={highContrast}
          >
            <Eye className="w-3.5 h-3.5 text-amber-300" aria-hidden="true" />
            <span className="hidden sm:inline">
              {highContrast ? getUIText(currentUILang, 'highContrastOn') : getUIText(currentUILang, 'contrast')}
            </span>
          </button>

          {/* Dedicated Legal Compliance Page Link */}
          <Link
            href="/compliance"
            className="hidden sm:flex items-center gap-1 text-amber-300 hover:text-white hover:underline font-semibold rounded-md px-1 py-0.5"
            aria-label="View MEA Compliance Statement"
          >
            <Lock className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{getUIText(currentUILang, 'compliance')}</span>
          </Link>

          {/* Multilingual UI Chrome Language Dropdown */}
          <div className="flex items-center gap-1 bg-[#051C45] border border-white/20 px-2 py-0.5 rounded-md">
            <Globe className="w-3.5 h-3.5 text-amber-300 shrink-0" aria-hidden="true" />
            <select
              value={currentUILang}
              onChange={(e) => handleLangChange(e.target.value as SupportedUILang)}
              className="bg-transparent text-slate-100 text-[11px] font-medium focus:outline-none cursor-pointer"
              aria-label="Select Portal Interface Language"
            >
              {SUPPORTED_UI_LANGUAGES.map((l) => (
                <option key={l.code} value={l.code} className="bg-[#082C6C] text-white">
                  {l.nativeName} ({l.code.toUpperCase()})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Compliance Information Modal Dropdown */}
      {complianceDropdownOpen && (
        <div
          role="dialog"
          aria-label="MEA Government and Cyber Security Compliance"
          className="absolute left-4 top-full mt-1 w-96 bg-[#082C6C] border-2 border-white/30 shadow-2xl p-4 space-y-3 z-50 text-left animate-in fade-in duration-150 text-slate-100 rounded-md"
        >
          <div className="flex items-center justify-between border-b border-white/20 pb-2">
            <span className="text-[10px] font-bold uppercase text-amber-300 tracking-wider">
              MEA GOVERNMENT &amp; CYBER SECURITY COMPLIANCE
            </span>
            <button
              onClick={() => setComplianceDropdownOpen(false)}
              className="text-slate-300 hover:text-white p-1 rounded-md"
              aria-label="Close Compliance Details"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2 text-xs font-normal">
            <div className="p-2.5 bg-[#051C45] border border-white/10 rounded-md">
              <h4 className="font-bold text-white text-xs">GIGW 3.0 &amp; WCAG 2.1 Level AA</h4>
              <p className="text-[11px] text-slate-300 leading-snug">
                Guidelines for Indian Government Websites (NIC/MeitY) and W3C web accessibility certified.
              </p>
            </div>
            <div className="p-2.5 bg-[#051C45] border border-white/10 rounded-md">
              <h4 className="font-bold text-white text-xs">CERT-In 256-Bit SSL/TLS &amp; DPDP Act 2023</h4>
              <p className="text-[11px] text-slate-300 leading-snug">
                Encrypted data handling, immutable audit logging, and strict data protection for diplomatic and global learners.
              </p>
            </div>
          </div>

          <div className="pt-2 border-t border-white/20 text-right">
            <Link
              href="/compliance"
              onClick={() => setComplianceDropdownOpen(false)}
              className="text-xs font-bold text-amber-300 hover:text-white hover:underline"
            >
              View Full MEA Compliance Report →
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
