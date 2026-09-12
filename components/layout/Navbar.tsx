'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Search,
  Award,
  Globe,
  Menu,
  X,
  ShieldCheck,
  Home,
  CheckCircle2,
  Building2,
  BookOpen,
  Users2,
  Layers,
  Lock,
  ChevronDown
} from 'lucide-react';
import NotificationCenter from './NotificationCenter';
import SearchModal from './SearchModal';
import LiveSessionBadge from './LiveSessionBadge';
import {
  getStoredUser,
  getActiveTrack,
  setActiveTrack,
  getStoredUILang,
  User
} from '@/lib/lmsStore';
import { getUIText, SupportedUILang } from '@/lib/i18nChrome';
import { LearningTrackType } from '@/lib/bidirectionalData';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [activeTrack, setActiveTrackState] = useState<LearningTrackType>('trackA');
  const [currentUILang, setCurrentUILang] = useState<SupportedUILang>('en');
  const [searchOpen, setSearchOpen] = useState(false);
  const [certModalOpen, setCertModalOpen] = useState(false);
  const [certIdInput, setCertIdInput] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [isScrolled, setIsScrolled] = useState(false);

  const loadState = () => {
    setUser(getStoredUser());
    setActiveTrackState(getActiveTrack());
    setCurrentUILang(getStoredUILang());
  };

  useEffect(() => {
    loadState();
    const handleLangChange = () => setCurrentUILang(getStoredUILang());
    window.addEventListener('ui_lang_changed', handleLangChange);
    return () => window.removeEventListener('ui_lang_changed', handleLangChange);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hide Navbar on dashboard and exam pages
  if (pathname.startsWith('/dashboard') || pathname.startsWith('/exam')) return null;

  const handleVerifyCertificateAction = (e: React.FormEvent) => {
    e.preventDefault();
    const certCode = certIdInput.trim() || 'MEA-HINDI-2026-9941';
    setCertModalOpen(false);
    router.push(`/dashboard/student?tab=certificates&verify=${certCode}`);
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/dashboard/student', label: 'My Journey' },
    { href: '/resources', label: 'Resource Hub' },
    { href: '/community/language-circles', label: 'Language Circles' },
    { href: '/showcase', label: 'Creative Showcase' },
    { href: '/global-impact', label: 'Global Impact' },
    { href: '/dashboard/mission', label: 'Mission Outreach' },
    { href: '/about', label: 'About MEA' },
  ];

  return (
    <>
      <nav
        className={`sticky top-0 z-40 bg-white/98 backdrop-blur-md  transition-shadow duration-300 ${isScrolled ? 'shadow-md' : 'shadow-xs'
          }`}
        aria-label="Main Navigation"
      >
        {/* Main Branding Header Bar */}
        <div
          className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 transition-all duration-200 ${isScrolled ? 'py-2 sm:py-2.5' : 'py-3 sm:py-3.5'
            }`}
        >
          {/* National Emblem + MEA Wordmark */}
          <Link
            href="/"
            className="flex items-center gap-3.5 group shrink-0 py-0.5"
            aria-label="Ministry of External Affairs Government of India Portal Home"
          >
            <img
              src="/logo.png"
              alt="National Emblem of India - Ministry of External Affairs"
              className={`w-auto object-contain shrink-0 transition-all duration-200 ${isScrolled ? 'h-11 sm:h-12' : 'h-12 sm:h-20'
                }`}
            />
            {/* <div className="border-l border-slate-300 pl-3">
              <span className="text-[11px] sm:text-xs font-bold text-[#0B3D91] uppercase tracking-wider block">
                भारत सरकार • विदेश मंत्रालय
              </span>
              <span className="text-[11px] sm:text-xs font-extrabold text-[#212121] uppercase tracking-normal block">
                Government of India • Ministry of External Affairs
              </span>
              <span className="text-[10px] text-slate-600 font-medium hidden sm:block">
                Indian &amp; Global Language Propagation Portal (भारतीय भाषा प्रसार पोर्टल)
              </span>
            </div> */}
          </Link>

          {/* Search Trigger */}
          <div className="hidden md:flex items-center flex-1 max-w-sm mx-4">
            <button
              onClick={() => setSearchOpen(true)}
              className="w-full bg-[#F5F5F5] hover:bg-slate-100 border border-[#DCE2E6] px-3.5 py-2 text-xs text-slate-600 flex items-center justify-between transition focus-visible:outline-[#0B3D91] rounded-md"
              aria-label="Open portal search"
            >
              <span className="truncate font-medium text-slate-500">Search portal or curriculum...</span>
              <Search className="w-4 h-4 text-[#0B3D91] shrink-0 ml-2" aria-hidden="true" />
            </button>
          </div>

          {/* Right Action Tools */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* Real-time Live Session Status Badge */}
            <LiveSessionBadge />

            {/* Verify Digital Certificate */}
            <button
              onClick={() => setCertModalOpen(true)}
              className="px-3 py-2 bg-amber-50 hover:bg-amber-100 text-[#0B3D91] font-bold text-xs flex items-center gap-1.5 transition border border-amber-300 focus-visible:outline-[#0B3D91] rounded-md"
              title="Verify MEA & University Accredited Diplomas"
              aria-label="Verify Certificate"
            >
              <Award className="w-3.5 h-3.5 text-[#FF9933]" aria-hidden="true" />
              <span className="hidden sm:inline">Verify Certificate</span>
            </button>

            {/* Notification Center */}
            <NotificationCenter />

            {/* Global Sign In CTA */}
            <Link
              href="/login"
              className="px-4 py-2 bg-[#0B3D91] hover:bg-[#082C6C] text-white font-bold text-xs flex items-center gap-1.5 border border-[#0B3D91] transition focus-visible:outline-[#0B3D91] rounded-md"
              aria-label="Sign in to portal"
            >
              <Lock className="w-3.5 h-3.5 text-[#FF9933]" aria-hidden="true" />
              <span>{getUIText(currentUILang, 'signIn')}</span>
            </Link>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#0B3D91] hover:bg-slate-100 border border-slate-300 focus-visible:outline-[#0B3D91] rounded-md"
              aria-label="Toggle Mobile Menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Primary Horizontal Navy Nav Bar (MEA Official Convention) */}
        <div className="bg-[#0B3D91] text-white hidden lg:block">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            <div className="flex items-center space-x-1 py-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3.5 py-1.5 text-xs font-bold transition flex items-center gap-1.5 rounded-md ${isActive
                      ? 'text-amber-300 bg-[#082C6C] border border-amber-400/40'
                      : 'hover:text-amber-200 hover:bg-[#082C6C]/60 text-white'
                      }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            <div className="text-[11px] text-slate-200 font-medium flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Sambhasini AI Speech Engine Live (22 Languages)</span>
            </div>
          </div>
        </div>

        {/* Thin Sovereign Tricolor Accent Band directly below the Nav Bar */}
        {/* <div className="h-[4px] w-full flex" role="presentation" aria-hidden="true">
          <div className="w-1/3 bg-[#FF9933]" />
          <div className="w-1/3 bg-[#FFFFFF]" />
          <div className="w-1/3 bg-[#138808]" />
        </div> */}

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b-2 border-[#0B3D91] px-4 pt-3 pb-5 space-y-3 text-xs font-bold text-slate-700 animate-in slide-in-from-top-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 hover:bg-slate-100 hover:text-[#0B3D91] font-bold border-b border-slate-100 rounded-md"
              >
                {link.label}
              </Link>
            ))}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setSearchOpen(true);
              }}
              className="w-full flex items-center gap-2 px-3 py-2 bg-[#F5F5F5] text-slate-700 font-bold text-left border border-slate-200 rounded-md"
            >
              <Search className="w-4 h-4 text-[#0B3D91]" />
              <span>Search Portal Content</span>
            </button>

            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full py-2.5 bg-[#0B3D91] text-white font-bold text-center border-b-2 border-[#FF9933] rounded-md"
            >
              🔐 {getUIText(currentUILang, 'signIn')}
            </Link>
          </div>
        )}
      </nav>

      {/* Public CEFR & Diploma Verification Modal */}
      {certModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Verify Language Diploma"
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4"
        >
          <div className="w-full max-w-lg bg-white border-2 border-[#0B3D91] p-6 sm:p-8 space-y-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150 text-left rounded-md">
            <div className="flex items-center justify-between border-b-2 border-[#0B3D91] pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 bg-[#0B3D91] text-amber-300 flex items-center justify-center font-bold rounded-md">
                  <Award className="w-5 h-5 text-[#FF9933]" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#0B3D91] block">
                    MEA &amp; ICCR VERIFIABLE CREDENTIALS
                  </span>
                  <h2 className="text-base sm:text-lg font-extrabold text-[#212121]">
                    Verify Language Diploma (प्रमाणपत्र सत्यापन)
                  </h2>
                </div>
              </div>
              <button
                onClick={() => setCertModalOpen(false)}
                className="p-1.5 hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition rounded-md"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-[#555555] font-normal leading-relaxed">
              Verify official CEFR A1-B2 certificates issued under Ministry of External Affairs, ICCR, and Kendriya Hindi Sansthan with tamper-evident cryptographic QR verification.
            </p>

            <form onSubmit={handleVerifyCertificateAction} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#212121] block">
                  Credential Identifier / QR Token:
                </label>
                <input
                  type="text"
                  value={certIdInput}
                  onChange={(e) => setCertIdInput(e.target.value)}
                  placeholder="e.g. MEA-HINDI-2026-9941 or KHS-DIP-2026-774910"
                  className="w-full bg-[#F5F5F5] border border-slate-300 px-4 py-2.5 text-xs text-[#212121] placeholder-slate-400 focus:outline-none focus:border-[#0B3D91] font-mono font-bold rounded-md"
                  required
                />
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                  Sample Official Credential IDs:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {['MEA-HINDI-2026-9941', 'ICCR-LANG-2026-4401', 'KHS-DIP-2026-774910'].map((sampleId) => (
                    <button
                      key={sampleId}
                      type="button"
                      onClick={() => setCertIdInput(sampleId)}
                      className="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-[10px] font-mono font-bold border border-slate-300 transition rounded-md"
                    >
                      {sampleId}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setCertModalOpen(false)}
                  className="w-1/3 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs border border-slate-300 transition rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-2.5 bg-[#0B3D91] hover:bg-[#082C6C] text-white font-bold text-xs shadow-xs transition flex items-center justify-center gap-1.5 border-b-2 border-[#FF9933] rounded-md"
                >
                  <ShieldCheck className="w-4 h-4 text-[#FF9933]" /> Verify Credential Now
                </button>
              </div>
            </form>

            <div className="pt-2 border-t border-slate-200 text-[11px] font-bold text-[#138808] flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" /> GIGW 3.0 &amp; Cryptographic Verification Standard
            </div>
          </div>
        </div>
      )}

      {/* Global Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
