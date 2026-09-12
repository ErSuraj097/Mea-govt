'use client';

import React from 'react';
import Link from 'next/link';
import {
  TrendingUp,
  CheckCircle2,
  Clock,
  Award,
  Sparkles,
  Bot,
  ArrowRight,
  Target,
  Flame,
  Zap,
  BookOpen,
  Radio,
  BarChart3,
  GraduationCap,
  Shield,
  PhoneCall,
  Volume2
} from 'lucide-react';
import { User } from '@/lib/mockData';
import GoalTrackSelector from '@/components/shared/GoalTrackSelector';
import LanguagePairSelector from '@/components/shared/LanguagePairSelector';

interface StudentOverviewProps {
  user: User | null;
}

export default function StudentOverview({ user }: StudentOverviewProps) {
  const newsCirculars = [
    {
      id: 'c1',
      date: '28 Aug 2026',
      badge: 'MEA DIPLOMATIC CIRCULAR',
      badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      title: 'Bilateral Language Fellowships (ICCR 2026-27) Approved for Diplomats & Global Scholars',
      desc: 'Ministry of External Affairs approves 100% subsidized CEFR A1-B2 Hindi & Classical Indian Language certification for foreign envoys.',
      tab: 'diagnostic',
    },
    {
      id: 'c2',
      date: '25 Aug 2026',
      badge: 'AI VOICE TUTOR ENGINE',
      badgeColor: 'bg-amber-50 text-amber-900 border-amber-200',
      title: 'AI Hindi Voice Tutor Activated Across Listening, Speaking, Reading & Writing Drills',
      desc: 'Real-time Devanagari acoustic modeling and retroflex cadence analysis deployed with color-coded phonetic feedback.',
      tab: 'ai-tutor',
    },
    {
      id: 'c3',
      date: '20 Aug 2026',
      badge: 'GLOBAL DIASPORA CELL',
      badgeColor: 'bg-blue-50 text-[#0B3D91] border-blue-200',
      title: 'Monthly Live Language Circles Scheduled for North America, Europe, and Gulf Timezones',
      desc: 'Interactive 60-minute conversational roundtables hosted by senior Indian diplomats and native linguists.',
      tab: 'language-circles',
    },
  ];

  const quickLaunchers = [
    {
      title: 'AI Voice Tutor (Interactive)',
      icon: PhoneCall,
      desc: 'Real-time spoken dialogue with pronunciation feedback & script toggles',
      tab: 'ai-tutor',
      badge: 'LIVE VOICE',
      accent: 'text-[#0B3D91]',
      bgAccent: 'bg-[#EEF3F8]',
    },
    {
      title: 'AI Learning Navigator',
      icon: Sparkles,
      desc: '30-Minute goal-oriented preparation plans (e.g. meeting diplomats, travel)',
      tab: 'ai-navigator',
      badge: 'GOAL AI',
      accent: 'text-[#FF9933]',
      bgAccent: 'bg-amber-50',
    },
    {
      title: 'AI Placement Diagnostic',
      icon: BookOpen,
      desc: 'Discover your level across Listening, Speaking, Reading & Writing',
      tab: 'diagnostic',
      badge: 'HERO FEATURE',
      accent: 'text-[#138808]',
      bgAccent: 'bg-emerald-50',
    },
    {
      title: 'Global Language Circles',
      icon: Target,
      desc: 'Join diplomat-led weekend conversational roundtables',
      tab: 'language-circles',
      badge: 'COMMUNITY',
      accent: 'text-[#0B3D91]',
      bgAccent: 'bg-[#EEF3F8]',
    },
  ];

  const lsrwSkillScores = [
    { skill: 'L — Listening', score: 72, level: 'A1 - Intermediate', accent: 'text-blue-700', bg: 'bg-blue-50', bar: 'bg-blue-600' },
    { skill: 'S — Speaking', score: 48, level: 'Pre-A1 - Beginner', accent: 'text-amber-700', bg: 'bg-amber-50', bar: 'bg-amber-500' },
    { skill: 'R — Reading', score: 81, level: 'A1 - Proficient', accent: 'text-emerald-700', bg: 'bg-emerald-50', bar: 'bg-emerald-600' },
    { skill: 'W — Writing', score: 56, level: 'Pre-A1 - Elementary', accent: 'text-indigo-700', bg: 'bg-indigo-50', bar: 'bg-indigo-600' },
  ];

  const executiveStats = [
    {
      label: 'ACTIVE TRACK',
      value: 'Cultural Exchange & Diplomatic Track',
      sub: 'CEFR A1 Level • Phase 1 Hindi',
      icon: Shield,
      accent: 'text-[#0B3D91]',
      bg: 'bg-[#EEF3F8]',
    },
    {
      label: 'CURRICULUM PROGRESS',
      value: 'Level 1: Beginner',
      sub: '42% of 8 Units Complete',
      icon: GraduationCap,
      accent: 'text-[#FF9933]',
      bg: 'bg-amber-50',
      progress: 42,
    },
    {
      label: 'SPEECH ACCURACY',
      value: '78.4% Cadence Match',
      sub: 'Devanagari Phonetic Alignment',
      icon: Volume2,
      accent: 'text-[#138808]',
      bg: 'bg-emerald-50',
    },
    {
      label: 'SCHOLAR CREDENTIALS',
      value: '1 Certificate Pending',
      sub: '24.5 hrs Practice Logged',
      icon: Award,
      accent: 'text-[#0B3D91]',
      bg: 'bg-[#EEF3F8]',
    },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 animate-in fade-in duration-200 text-left">
      {/* 1. Hero Welcome & Goal Banner - MEA Official Palette */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Main Banner (Left 8 Cols) */}
        <div className="lg:col-span-8 p-6 sm:p-7 rounded-sm bg-gradient-to-r from-[#0B3D91] via-[#082C6C] to-[#051C45] text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative overflow-hidden shadow-sm border-l-4 border-[#FF9933]">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-5 pointer-events-none flex items-center justify-end pr-4">
            <Target className="w-64 h-64 text-white" />
          </div>

          <div className="flex items-start gap-4 sm:gap-5 relative z-10">
            <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-sm bg-[#FF9933] text-[#051C45] flex items-center justify-center shrink-0 shadow-sm border border-[#E68A00]">
              <Target className="w-7 h-7 text-[#051C45]" />
            </div>
            <div className="space-y-1.5 text-left">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-sm bg-amber-400/20 text-amber-300 text-[10px] font-extrabold tracking-wider uppercase border border-amber-400/30">
                  🔥 {user?.streak || 14} DAY STREAK ACTIVE
                </span>
                <span className="text-slate-300 text-xs font-semibold">
                  Hindi Phase 1 Available Now • Goal: Cultural Exchange
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
                Namaste, {user?.name || 'Suraj'} 👋 <br />
                <span className="text-[#FF9933]">
                  Continue your Hindi learning journey.
                </span>
              </h2>
              <p className="text-xs text-slate-200 font-medium">
                Overall Level: <strong className="text-amber-300 font-bold">A1 Beginner</strong> • 21 Other Indian languages available as modular packs.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2 shrink-0 relative z-10 w-full sm:w-auto">
            <Link
              href="/dashboard/student/diagnostic"
              className="px-5 py-2.5 rounded-sm bg-[#FF9933] hover:bg-[#E68A00] text-[#051C45] font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition shadow-sm"
            >
              AI DIAGNOSTIC <ArrowRight className="w-4 h-4 text-[#051C45]" />
            </Link>
            <Link
              href="/dashboard/student/ai-navigator"
              className="px-5 py-2.5 rounded-sm bg-white/10 hover:bg-white/20 text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition border border-white/20"
            >
              AI NAVIGATOR →
            </Link>
          </div>
        </div>

        {/* AI Tutor Online Card (Right 4 Cols) */}
        <div className="lg:col-span-4 p-5 rounded-sm bg-white border border-[#DCE2E6] flex flex-col justify-between space-y-3.5 shadow-2xs text-left">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-sm bg-[#EEF3F8] text-[#0B3D91] flex items-center justify-center font-bold border border-[#D0DCE7]">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-extrabold text-[#1B2A4A]">Hindi AI Voice Tutor</h4>
                <span className="text-[10px] text-[#138808] font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#138808] animate-ping" /> Spoken Speech & Pronunciation
                </span>
              </div>
            </div>
            <Sparkles className="w-4 h-4 text-[#FF9933]" />
          </div>

          <div>
            <p className="text-xs text-[#555555] italic font-medium leading-relaxed bg-[#F8FAFC] p-3 rounded-sm border-l-2 border-[#FF9933]">
              &quot;नमस्ते! आपका स्वागत है। क्या आप आज हिंदी संवाद अभ्यास के लिए तैयार हैं?&quot;
            </p>
          </div>

          <Link
            href="/dashboard/student/ai-tutor"
            className="w-full py-2.5 rounded-sm bg-[#0B3D91] hover:bg-[#082C6C] text-white font-extrabold text-xs uppercase tracking-wider text-center block transition shadow-2xs"
          >
            Start AI Practice →
          </Link>
        </div>
      </div>

      {/* 2. LSRW Skill Profile Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between border-b border-[#DCE2E6] pb-2">
          <h3 className="text-sm font-extrabold text-[#0B3D91] flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-[#FF9933]" /> Your LSRW Skill Profile
          </h3>
          <Link href="/dashboard/student/diagnostic" className="text-xs text-[#0B3D91] font-bold hover:underline">
            Re-Assess Level with AI →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {lsrwSkillScores.map((item, idx) => (
            <div key={idx} className={`p-4 rounded-sm bg-white border border-[#DCE2E6] shadow-2xs space-y-2.5 hover:border-[#0B3D91] transition`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-[#1B2A4A]">{item.skill}</span>
                <span className={`text-xs font-black ${item.accent}`}>{item.score}%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div className={`${item.bar} h-2 rounded-full transition-all duration-500`} style={{ width: `${item.score}%` }} />
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-[#555555] font-medium">{item.level}</span>
                <Link href="/dashboard/student/ai-tutor" className="text-[#0B3D91] font-bold hover:underline">
                  Practice →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Executive Academic Stats Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {executiveStats.map((stat, idx) => (
          <div
            key={idx}
            className="p-4 rounded-sm bg-white border border-[#DCE2E6] shadow-2xs flex flex-col justify-between space-y-2 hover:border-[#0B3D91] transition-colors"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#555555]">
                {stat.label}
              </span>
              <div className={`p-1.5 rounded-sm ${stat.bg} ${stat.accent}`}>
                <stat.icon className="w-4 h-4" />
              </div>
            </div>

            <div>
              <div className="text-sm sm:text-base font-extrabold text-[#1B2A4A] truncate">
                {stat.value}
              </div>
              <div className="text-[11px] font-semibold text-[#555555] truncate">
                {stat.sub}
              </div>
            </div>

            {stat.progress !== undefined && (
              <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-[#FF9933] h-1.5 rounded-full transition-all duration-500"
                  style={{ width: `${stat.progress}%` }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 3. Official Circulars Ticker Banner */}
      <div className="p-5 sm:p-6 rounded-sm bg-white border border-[#DCE2E6] shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-[#DCE2E6] pb-3">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#0B3D91] flex items-center gap-2">
            <Radio className="w-4 h-4 text-[#FF9933] animate-pulse" /> Official Ministry Circulars & Notifications
          </h3>
          <span className="text-xs text-[#555555] font-semibold">Real-time MEA Alerts</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {newsCirculars.map((c) => (
            <Link
              key={c.id}
              href={`/dashboard/student?tab=${c.tab}`}
              className="p-4 rounded-sm bg-[#F8FAFC] hover:bg-[#EEF3F8]/60 border border-[#DCE2E6] hover:border-[#0B3D91] transition-all space-y-2 group block"
            >
              <div className="flex items-center justify-between">
                <span className={`px-2 py-0.5 rounded-sm text-[9px] font-extrabold uppercase border ${c.badgeColor}`}>
                  {c.badge}
                </span>
                <span className="text-[10px] text-slate-400 font-mono font-bold">{c.date}</span>
              </div>
              <h4 className="text-xs font-extrabold text-[#1B2A4A] group-hover:text-[#0B3D91] transition leading-snug">
                {c.title}
              </h4>
              <p className="text-[11px] text-[#555555] font-medium line-clamp-2 leading-relaxed">
                {c.desc}
              </p>
            </Link>
          ))}
        </div>
      </div>

      {/* 4. Quick Launcher Hub */}
      <div className="space-y-3.5 text-left">
        <div className="flex items-center justify-between border-b border-[#DCE2E6] pb-2">
          <h3 className="text-sm font-extrabold text-[#0B3D91] flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#FF9933]" /> Core Learning Engines
          </h3>
          <span className="text-xs text-[#555555] font-semibold">Direct Sovereign Modules</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickLaunchers.map((item) => (
            <Link
              key={item.tab}
              href={`/dashboard/student?tab=${item.tab}`}
              className="p-4 sm:p-5 rounded-sm bg-white border border-[#DCE2E6] hover:border-[#0B3D91] shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between group h-full"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className={`w-9 h-9 rounded-sm ${item.bgAccent} ${item.accent} flex items-center justify-center font-bold border border-[#DCE2E6]`}>
                    <item.icon className="w-4.5 h-4.5" />
                  </div>
                  <span className="px-2 py-0.5 rounded-sm bg-[#F5F5F5] text-[#1B2A4A] text-[9px] font-extrabold uppercase tracking-wider border border-[#DCE2E6]">
                    {item.badge}
                  </span>
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-[#1B2A4A] group-hover:text-[#0B3D91] transition">{item.title}</h4>
                  <p className="text-xs text-[#555555] mt-1 leading-relaxed">{item.desc}</p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-xs font-bold text-[#0B3D91] group-hover:text-[#082C6C]">
                Open Console <ArrowRight className="w-3.5 h-3.5 ml-1 transition group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* 5. Language & Goal Selector Section */}
      <div className="space-y-6">
        <GoalTrackSelector />
        <LanguagePairSelector />
      </div>
    </div>
  );
}
