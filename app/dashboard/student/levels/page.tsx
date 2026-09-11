'use client';

import React from 'react';
import Link from 'next/link';
import {
  BookOpen,
  CheckCircle2,
  Lock,
  Star,
  Play,
  Sparkles,
  ArrowRight,
  Zap,
  Trophy,
  ChevronRight,
  ShieldCheck,
  Award
} from 'lucide-react';
import { MOCK_LEVELS } from '@/lib/mockData';

export default function DashboardLevelsPage() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-20 text-left">
      {/* HERO BIDIRECTIONAL CONTROL BANNER */}
      <div className="p-6 sm:p-8 rounded-sm bg-gradient-to-r from-[#0B3D91] via-[#082C6C] to-[#051C45] text-white border border-[#082C6C] border-l-4 border-[#FF9933] shadow-md space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-black uppercase tracking-wider border border-amber-400/30">
                🏆 OFFICIAL GAMIFIED 7-LEVEL CURRICULUM PATHWAY
              </span>
              <span className="px-3 py-1 rounded-full bg-blue-400/20 text-blue-200 text-[10px] font-bold border border-blue-400/30">
                CEFR A1.1 to C2 Mastery
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Gamified 7-Level Indian Languages & Devanagari Fluency Pathway
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
              Progress step-by-step from foundational Devanagari script (A1.1) to official Rajbhasha administrative fluency (C2). Complete interactive lessons, earn XP points, and unlock national distinction badges.
            </p>
          </div>

          <Link
            href="/learn/levels"
            className="px-5 py-2.5 rounded-sm bg-[#0B3D91] hover:bg-[#0E4BA8] text-white font-extrabold text-xs flex items-center justify-center gap-2 border border-blue-400/40 transition shrink-0 shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Public Interactive Map View →</span>
          </Link>
        </div>

        <div className="pt-4 border-t border-slate-700/60 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2 text-amber-300 font-extrabold">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Accredited CEFR Proficiency Standards (A1, A2, B1, B2, C1, C2)</span>
          </div>
          <span className="text-slate-300 text-[11px] font-semibold">
            7 Sequential Unlockable Skill Levels
          </span>
        </div>
      </div>

      {/* Levels Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_LEVELS.map((lvl) => {
          const firstLessonId = lvl.lessons[0]?.id || 'les_1_1';

          return (
            <div
              key={lvl.id}
              className={`p-6 rounded-sm bg-white border space-y-5 shadow-xs transition duration-200 flex flex-col justify-between ${
                lvl.unlocked ? 'border-[#DCE2E6] hover:shadow-xl' : 'border-slate-200 opacity-75 bg-slate-50'
              }`}
            >
              <div className="space-y-4">
                {/* Level Header Info */}
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-[10px] font-extrabold bg-[#EEF3F8] text-[#082C6C] border border-[#DCE2E6] flex items-center gap-1">
                    CEFR {lvl.cefr} • Level {lvl.id}
                  </span>
                  <span className="text-xs text-slate-500 font-bold flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5 text-blue-500" /> {lvl.totalLessons} Lessons
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-black text-slate-900">{lvl.titleHindi}</h3>
                  <h4 className="text-xs font-bold text-[#0B3D91]">{lvl.titleEng}</h4>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed font-medium">{lvl.description}</p>

                {/* Progress Indicator */}
                {lvl.unlocked && (
                  <div className="space-y-1.5 pt-1">
                    <div className="flex items-center justify-between text-[11px] font-bold">
                      <span className="text-slate-700">Level Progress</span>
                      <span className="text-[#0B3D91]">{lvl.progress}%</span>
                    </div>
                    <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className="h-2.5 rounded-full bg-[#0B3D91] transition-all duration-300"
                        style={{ width: `${lvl.progress}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Individual Lessons List Inside Card */}
                {lvl.lessons.length > 0 && (
                  <div className="space-y-2 pt-2 border-t border-[#DCE2E6]">
                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">
                      Available Interactive Lessons:
                    </span>
                    <div className="space-y-1.5">
                      {lvl.lessons.map((les) => (
                        <Link
                          key={les.id}
                          href={`/dashboard/student?tab=lesson&id=${les.id}`}
                          className="p-2.5 rounded-sm bg-slate-50 hover:bg-[#EEF3F8] border border-slate-200 flex items-center justify-between group transition"
                        >
                          <div className="truncate pr-2">
                            <span className="text-[10px] font-extrabold text-[#0B3D91] uppercase block">{les.type}</span>
                            <span className="text-xs font-bold text-slate-900 group-hover:text-[#0B3D91] truncate block">
                              {les.titleHindi}
                            </span>
                          </div>
                          <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-black text-[10px] shrink-0">
                            +{les.xpReward} XP
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Primary CTA Button */}
              {lvl.unlocked ? (
                <Link
                  href={`/dashboard/student?tab=lesson&id=${firstLessonId}`}
                  className="w-full py-3 rounded-sm bg-[#0B3D91] hover:bg-[#082C6C] text-white font-extrabold text-xs uppercase tracking-wider text-center flex items-center justify-center gap-2 transition shadow-md"
                >
                  <Play className="w-4 h-4 fill-white" /> Start Level {lvl.id} Player <ArrowRight className="w-4 h-4" />
                </Link>
              ) : (
                <button
                  disabled
                  className="w-full py-3 rounded-sm bg-slate-100 text-slate-400 font-bold text-xs text-center flex items-center justify-center gap-2 cursor-not-allowed border border-slate-200"
                >
                  <Lock className="w-4 h-4" /> Locked ({lvl.requiredXp} XP Required)
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
