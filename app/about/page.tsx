'use client';

import React from 'react';
import Link from 'next/link';
import {
  Building2,
  Globe,
  Award,
  ShieldCheck,
  CheckCircle2,
  BookOpen,
  Bot,
  Trophy,
  ArrowRight,
  User as UserIcon,
  Sparkles,
  Users,
  GraduationCap,
  Star,
  Check,
  Lock,
  Cpu
} from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F5F5F5] pb-16 space-y-8 text-left text-[#212121] font-sans">
      {/* Page Hero Header */}
      <section className="bg-[#082C6C] text-white py-10 px-4 sm:px-6 lg:px-8 border-b border-[#051C45] relative overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-3 relative z-10">
          <span className="px-3 py-1 bg-white/10 text-amber-300 text-[10px] font-bold uppercase tracking-wider border border-white/20 inline-flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-amber-300" /> ABOUT OUR NATIONAL LMS PLATFORM
          </span>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight max-w-4xl">
            भारत का राष्ट्रीय हिंदी एवं २२ अनुसूचित भाषा प्रसार पोर्टल
          </h1>

          <p className="text-slate-200 text-xs sm:text-sm font-normal max-w-2xl leading-relaxed">
            Autonomous Language Learning Management System designed under Ministry of External Affairs (MEA), ICCR, and Official Language guidelines. Empowering foreign diplomats, diaspora scholars, and citizens worldwide with 24/7 Sambhasini AI tutoring and accredited CEFR certification.
          </p>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Mission & Vision Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          <div className="p-6 bg-white border border-[#DCE2E6] border-t-2 border-t-[#0B3D91] shadow-xs space-y-3 text-left">
            <span className="px-2 py-0.5 bg-blue-50 text-[#0B3D91] text-[10px] font-bold uppercase tracking-wider border border-blue-200">
              OUR MISSION &amp; VISION
            </span>
            <h2 className="text-base sm:text-lg font-bold text-[#212121] leading-tight">
              Preserving Indian Linguistic Heritage with Sovereign AI Innovation
            </h2>
            <p className="text-xs text-[#555555] font-normal leading-relaxed">
              Our mission is to make learning Hindi and all 22 Eighth Schedule Indian languages accessible, engaging, and structured for foreign diplomatic missions, scholars, and the 32M+ overseas Indian diaspora.
            </p>
            <div className="space-y-1.5 text-xs font-semibold text-[#212121] pt-1">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#138808] shrink-0" />
                <span>100% Subsidized ICCR Bilateral Language Fellowships</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#138808] shrink-0" />
                <span>24/7 Sovereign MeitY Sambhasini AI Speech &amp; Pronunciation Engine</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#138808] shrink-0" />
                <span>Cryptographically QR-Verified CEFR A1–B2 Diplomas</span>
              </div>
            </div>
          </div>

          <div className="p-6 bg-[#082C6C] text-white shadow-xs space-y-3 text-left border border-[#051C45] border-t-2 border-t-[#FF9933]">
            <span className="px-2 py-0.5 bg-white/10 text-amber-300 text-[10px] font-bold uppercase tracking-wider border border-white/20">
              GOVERNMENT COMPLIANCE &amp; ACCREDITATION
            </span>
            <h3 className="text-base sm:text-lg font-bold text-white leading-tight">
              MEA, ICCR &amp; Kendriya Hindi Sansthan Framework
            </h3>
            <p className="text-slate-300 text-xs font-normal leading-relaxed">
              Diplomas and certificates issued on our portal are accredited in coordination with Kendriya Hindi Sansthan Agra, Central Institute of Indian Languages (CIIL) Mysuru, and leading central universities.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <div className="p-2.5 bg-[#051C45] border border-white/10 text-center flex-1">
                <span className="text-xl font-bold text-amber-300 block">22</span>
                <span className="text-[10px] font-medium text-slate-300 uppercase">Languages</span>
              </div>
              <div className="p-2.5 bg-[#051C45] border border-white/10 text-center flex-1">
                <span className="text-xl font-bold text-emerald-400 block">190+</span>
                <span className="text-[10px] font-medium text-slate-300 uppercase">Missions</span>
              </div>
              <div className="p-2.5 bg-[#051C45] border border-white/10 text-center flex-1">
                <span className="text-xl font-bold text-amber-300 block">100%</span>
                <span className="text-[10px] font-medium text-slate-300 uppercase">Subsidy</span>
              </div>
            </div>
          </div>
        </div>

        {/* Live Platform Scale & Metrics */}
        <div className="p-6 bg-white border border-[#DCE2E6] border-t-2 border-t-[#0B3D91] shadow-xs space-y-4">
          <div className="text-left space-y-1 border-b border-slate-200 pb-2">
            <span className="text-[10px] font-bold uppercase text-[#0B3D91] tracking-wider block">
              NATIONAL LMS SCALE &amp; IMPACT
            </span>
            <h2 className="text-base sm:text-lg font-bold text-[#212121]">Empowering Global Scholars &amp; Diplomats</h2>
            <p className="text-xs text-[#555555]">Real-time statistics across all Indian diplomatic missions and university centres.</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center pt-2">
            <div className="p-4 bg-[#F5F5F5] border border-slate-200 space-y-1">
              <Users className="w-5 h-5 text-[#0B3D91] mx-auto mb-1" />
              <span className="text-2xl font-black text-[#0B3D91] block">520,000+</span>
              <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Active Students</span>
            </div>

            <div className="p-4 bg-[#F5F5F5] border border-slate-200 space-y-1">
              <Globe className="w-5 h-5 text-[#138808] mx-auto mb-1" />
              <span className="text-2xl font-black text-[#138808] block">22</span>
              <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Scheduled Languages</span>
            </div>

            <div className="p-4 bg-[#F5F5F5] border border-slate-200 space-y-1">
              <Bot className="w-5 h-5 text-[#FF9933] mx-auto mb-1" />
              <span className="text-2xl font-black text-[#8A4B00] block">1.4M+</span>
              <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">AI Speech Sessions</span>
            </div>

            <div className="p-4 bg-[#F5F5F5] border border-slate-200 space-y-1">
              <Award className="w-5 h-5 text-[#0B3D91] mx-auto mb-1" />
              <span className="text-2xl font-black text-[#0B3D91] block">380,000+</span>
              <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Diplomas Verified</span>
            </div>
          </div>
        </div>

        {/* 22 Scheduled Indian Languages Grid */}
        <div className="space-y-4 text-left">
          <div className="border-b-2 border-[#0B3D91] pb-2">
            <span className="text-[10px] font-bold uppercase text-[#0B3D91] tracking-wider block">
              CONSTITUTIONAL COVERAGE
            </span>
            <h2 className="text-base sm:text-lg font-bold text-[#212121]">
              22 Eighth Schedule Indian Languages Supported
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5 text-left">
            {[
              { name: 'हिंदी (Hindi)', code: 'HI', tag: 'Official' },
              { name: 'தமிழ் (Tamil)', code: 'TA', tag: 'Dravidian' },
              { name: 'తెలుగు (Telugu)', code: 'TE', tag: 'Dravidian' },
              { name: 'বাংলা (Bengali)', code: 'BN', tag: 'Eastern' },
              { name: 'मराठी (Marathi)', code: 'MR', tag: 'Devanagari' },
              { name: 'ಕನ್ನಡ (Kannada)', code: 'KN', tag: 'Dravidian' },
              { name: 'മലയാളം (Malayalam)', code: 'ML', tag: 'Southern' },
              { name: 'ગુજરાતી (Gujarati)', code: 'GU', tag: 'Western' },
              { name: 'ਪੰਜਾਬੀ (Punjabi)', code: 'PA', tag: 'Gurmukhi' },
              { name: 'ଓଡ଼ିଆ (Odia)', code: 'OR', tag: 'Eastern' },
              { name: 'اردو (Urdu)', code: 'UR', tag: 'Nasta\'liq' },
              { name: 'অসমীয়া (Assamese)', code: 'AS', tag: 'North-East' },
            ].map((lang, idx) => (
              <div
                key={idx}
                className="p-3 bg-white border border-[#DCE2E6] border-t border-t-[#0B3D91] flex items-center justify-between"
              >
                <div>
                  <h4 className="font-bold text-xs text-[#212121]">{lang.name}</h4>
                  <span className="text-[9px] text-[#555555] font-medium uppercase">{lang.tag}</span>
                </div>
                <span className="px-1.5 py-0.2 bg-amber-50 text-[#8A4B00] border border-amber-300 font-bold text-[9px]">
                  {lang.code}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Launch Banner */}
        <div className="bg-[#082C6C] text-white p-6 sm:p-8 text-left border-l-4 border-l-[#FF9933] shadow-xs space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-white">
            Start Learning Today with Subsidized MEA Fellowships
          </h2>
          <p className="text-xs text-slate-300 max-w-xl">
            Foreign diplomatic envoys and diaspora scholars can enroll directly into accredited CEFR A1-B2 programs.
          </p>
          <div className="pt-1">
            <Link
              href="/login"
              className="px-6 py-2.5 bg-[#FF9933] hover:bg-[#E68A2E] text-[#212121] font-bold text-xs uppercase tracking-wider inline-flex items-center gap-2 transition shadow-xs"
            >
              Enter LMS Console Portal →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
