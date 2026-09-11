'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ShieldCheck,
  CheckCircle2,
  Globe,
  Phone,
  Mail,
  Lock,
  FileText,
  MapPin,
  ExternalLink,
  Award,
  ChevronRight
} from 'lucide-react';
import { getStoredUILang } from '@/lib/lmsStore';
import { getUIText, SupportedUILang } from '@/lib/i18nChrome';

export default function Footer() {
  const pathname = usePathname();
  const [subscribed, setSubscribed] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [currentUILang, setCurrentUILang] = useState<SupportedUILang>('en');
  const [lastUpdatedDate, setLastUpdatedDate] = useState('28 August 2026');

  useEffect(() => {
    setCurrentUILang(getStoredUILang());
    const handleLangChange = () => setCurrentUILang(getStoredUILang());
    window.addEventListener('ui_lang_changed', handleLangChange);
    return () => window.removeEventListener('ui_lang_changed', handleLangChange);
  }, []);

  // Hide Footer on dashboard and exam pages
  if (pathname.startsWith('/dashboard') || pathname.startsWith('/exam')) return null;

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
      setEmailInput('');
    }
  };

  return (
    <footer className="bg-[#082C6C] text-slate-200 border-t border-[#051C45] pt-10 pb-8 px-4 sm:px-6 lg:px-8 text-left" aria-label="Official MEA Portal Footer">
      {/* Tricolor Mini Accent Bar */}
      {/* <div className="max-w-7xl mx-auto mb-8 h-[3px] flex" role="presentation" aria-hidden="true">
        <div className="w-1/3 bg-[#FF9933]" />
        <div className="w-1/3 bg-[#FFFFFF]" />
        <div className="w-1/3 bg-[#138808]" />
      </div> */}

      {/* Official MEA Circular Subscription & Notification Banner */}
      {/* <div className="max-w-7xl mx-auto mb-10 p-5 bg-[#051C45] border border-white/15 flex flex-col md:flex-row items-center justify-between gap-6 rounded-md">
        <div className="space-y-1 text-left">
          <span className="px-2 py-0.5 bg-amber-400/20 text-amber-300 text-[10px] font-bold uppercase tracking-wider border border-amber-400/30 rounded-md">
            MEA OFFICIAL CIRCULARS &amp; NOTIFICATIONS
          </span>
          <h3 className="text-sm sm:text-base font-bold text-white">
            Subscribe to MEA Language Diplomas &amp; ICCR Fellowships
          </h3>
          <p className="text-xs text-slate-300 font-normal">
            Receive official announcements on bilateral language scholarships, CEFR examination schedules, and Sambhasini AI updates.
          </p>
        </div>

        {subscribed ? (
          <div className="px-4 py-2 bg-emerald-900/40 border border-emerald-400/50 text-emerald-300 text-xs font-bold flex items-center gap-2 rounded-md">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> You are subscribed to official MEA circulars!
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="flex w-full md:w-auto gap-2">
            <input
              type="email"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              placeholder="Enter official email..."
              className="px-3 py-2 bg-[#082C6C] border border-white/20 text-white text-xs placeholder-slate-400 focus:outline-none focus:border-[#FF9933] font-normal w-full sm:w-64 rounded-md"
              required
              aria-label="Official Email Address for circulars"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-[#FF9933] hover:bg-[#E68A2E] text-[#212121] font-bold text-xs transition shrink-0 rounded-md"
            >
              Subscribe
            </button>
          </form>
        )}
      </div> */}

      {/* Main 5-Column Dense Government Footer Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-10 text-xs">
        {/* Col 1: MEA Ministry Profile & Mandate */}
        <div className="lg:col-span-2 space-y-3.5 pr-0 lg:pr-4">
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="National Emblem of India"
              className="h-20 w-auto object-contain invert shrink-0"
            />
            {/* <div>
              <h4 className="text-xs font-bold uppercase text-amber-300 tracking-wider">विदेश मंत्रालय • भारत सरकार</h4>
              <p className="text-xs font-bold text-white">Ministry of External Affairs, Government of India</p>
            </div> */}
          </div>

          <p className="text-xs text-slate-300 leading-relaxed font-normal">
            Sovereign Indian Language Learning &amp; Global Propagation Portal. Facilitating diplomatic language proficiency, bilateral linguistic exchange across all 22 Eighth Schedule Indian languages, and global tongues under GIGW 3.0 standards.
          </p>

          {/* <div className="flex flex-wrap gap-2 text-[11px] font-medium pt-1">
            <span className="px-2 py-0.5 bg-[#051C45] border border-white/15 text-amber-200 flex items-center gap-1 rounded-md">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-300" aria-hidden="true" /> GIGW 3.0 &amp; WCAG 2.1 AA
            </span>
            <span className="px-2 py-0.5 bg-[#051C45] border border-white/15 text-emerald-300 flex items-center gap-1 rounded-md">
              <Lock className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" /> CERT-In 256-Bit SSL/TLS
            </span>
          </div> */}
        </div>

        {/* Col 2: Related GoI Portals */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300 border-b border-white/15 pb-1">
            Related GoI Portals
          </h4>
          <ul className="space-y-1.5 text-xs text-slate-200">
            <li>
              <a href="https://india.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-amber-300 hover:underline flex items-center gap-1">
                <ExternalLink className="w-3 h-3 text-slate-400" /> National Portal of India
              </a>
            </li>
            <li>
              <a href="https://Sambhasini.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-amber-300 hover:underline flex items-center gap-1">
                <ExternalLink className="w-3 h-3 text-slate-400" /> Sambhasini (MeitY)
              </a>
            </li>
            <li>
              <a href="https://diksha.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-amber-300 hover:underline flex items-center gap-1">
                <ExternalLink className="w-3 h-3 text-slate-400" /> DIKSHA Education Portal
              </a>
            </li>
            <li>
              <a href="https://www.iccr.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-amber-300 hover:underline flex items-center gap-1">
                <ExternalLink className="w-3 h-3 text-slate-400" /> ICCR Official Portal
              </a>
            </li>
            <li>
              <a href="http://khsindia.org" target="_blank" rel="noopener noreferrer" className="hover:text-amber-300 hover:underline flex items-center gap-1">
                <ExternalLink className="w-3 h-3 text-slate-400" /> Kendriya Hindi Sansthan
              </a>
            </li>
          </ul>
        </div>

        {/* Col 3: Academic & Goal Tracks */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300 border-b border-white/15 pb-1">
            Academic Tracks
          </h4>
          <ul className="space-y-1.5 text-xs text-slate-200">
            <li><Link href="/dashboard/student?tab=tracks" className="hover:text-amber-300 hover:underline">Track A: Indian Languages</Link></li>
            <li><Link href="/dashboard/student?tab=tracks" className="hover:text-amber-300 hover:underline">Track B: Global Languages</Link></li>
            <li><Link href="/dashboard/student?tab=speaking-test" className="hover:text-amber-300 hover:underline">Sambhasini Voice AI Tutor</Link></li>
            <li><Link href="/dashboard/student?tab=certificates" className="hover:text-amber-300 hover:underline">CEFR A1–B2 Certification</Link></li>
            <li><Link href="/about" className="hover:text-amber-300 hover:underline">ICCR Bilateral Fellowships</Link></li>
          </ul>
        </div>

        {/* Col 4: Contact & Helpdesk */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300 border-b border-white/15 pb-1">
            MEA Helpdesk
          </h4>
          <div className="space-y-2.5 text-xs text-slate-300">
            <div className="flex items-start gap-2">
              <MapPin className="w-3.5 h-3.5 text-amber-300 shrink-0 mt-0.5" />
              <p className="text-[11px] leading-snug">
                Ministry of External Affairs, South Block, New Delhi — 110011
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-amber-300 shrink-0" />
              <span className="text-[11px] font-mono">+91 11 2301-2300 (24/7)</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-amber-300 shrink-0" />
              <span className="text-[11px] font-mono">support-lms@mea.gov.in</span>
            </div>
            <div className="pt-1">
              <Link
                href="/compliance"
                className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-300 hover:underline"
              >
                Accessibility Statement &amp; RTI →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Persistent Footer Accessibility Toolbar (GIGW 3.0 & WCAG 2.1 AA) */}
      <div className="max-w-7xl mx-auto mb-6 p-3 bg-[#051C45] border border-white/20 flex flex-wrap items-center justify-between gap-4 rounded-md">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider">
            ACCESSIBILITY &amp; DISPLAY CONTROLS (सुलभता नियंत्रण)
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Text Size Controls */}
          <div className="flex items-center bg-[#082C6C] border border-white/20 rounded-md overflow-hidden text-xs">
            <button
              type="button"
              onClick={() => {
                document.documentElement.style.fontSize = '14px';
              }}
              className="px-2.5 py-1 hover:bg-white/10 text-slate-200 font-bold border-r border-white/20 transition"
              title="Decrease Font Size (A-)"
              aria-label="Decrease Font Size in Footer"
            >
              A-
            </button>
            <button
              type="button"
              onClick={() => {
                document.documentElement.style.fontSize = '16px';
              }}
              className="px-2.5 py-1 hover:bg-white/10 text-amber-300 font-bold border-r border-white/20 transition"
              title="Reset Font Size (A)"
              aria-label="Reset Font Size in Footer"
            >
              A
            </button>
            <button
              type="button"
              onClick={() => {
                document.documentElement.style.fontSize = '18px';
              }}
              className="px-2.5 py-1 hover:bg-white/10 text-slate-200 font-bold transition"
              title="Increase Font Size (A+)"
              aria-label="Increase Font Size in Footer"
            >
              A+
            </button>
          </div>

          {/* High-Contrast / Dark Mode Toggle */}
          <button
            type="button"
            onClick={() => {
              document.body.classList.toggle('gigw-high-contrast');
            }}
            className="px-3 py-1 bg-[#082C6C] hover:bg-[#FF9933] hover:text-[#212121] border border-white/20 text-slate-200 text-xs font-bold rounded-md transition"
            aria-label="Toggle High Contrast / Dark Mode in Footer"
          >
            👁️ High Contrast / Dark Mode
          </button>
        </div>
      </div>

      {/* Mandatory GIGW Footer Meta Bar */}
      <div className="max-w-7xl mx-auto border-t border-white/15 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-normal text-slate-300">
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-[11px]">
          <Link href="/compliance" className="hover:text-white hover:underline">Accessibility Statement</Link>
          <span aria-hidden="true">•</span>
          <Link href="/compliance" className="hover:text-white hover:underline">RTI (Right to Information)</Link>
          <span aria-hidden="true">•</span>
          <Link href="/compliance" className="hover:text-white hover:underline">Terms of Use</Link>
          <span aria-hidden="true">•</span>
          <Link href="/compliance" className="hover:text-white hover:underline">Privacy Policy (DPDP 2023)</Link>
          <span aria-hidden="true">•</span>
          <Link href="/compliance" className="hover:text-white hover:underline">Sitemap</Link>
        </div>

        <div className="flex items-center gap-3 text-[11px]">
          <span>
            {getUIText(currentUILang, 'lastUpdated')}: <strong className="text-slate-100 font-semibold">{lastUpdatedDate}</strong>
          </span>
          <span aria-hidden="true">•</span>
          <span className="text-amber-200 font-semibold">© 2026 Ministry of External Affairs</span>
        </div>
      </div>
    </footer>
  );
}
