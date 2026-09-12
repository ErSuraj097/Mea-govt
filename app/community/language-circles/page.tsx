'use client';

import React, { useState } from 'react';
import {
  Users2,
  Calendar,
  Clock,
  Globe,
  Video,
  CheckCircle2,
  ArrowRight,
  UserCheck
} from 'lucide-react';
import { MOCK_LANGUAGE_CIRCLES } from '@/lib/mockData';

export default function LanguageCirclesPage() {
  const [joinedCircles, setJoinedCircles] = useState<Record<string, boolean>>({});

  const handleToggleJoin = (id: string) => {
    setJoinedCircles((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] pb-16 text-left">
      {/* Top Header Banner */}
      <div className="bg-[#0B3D91] text-white border-b border-[#082C6C] py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-3">
          <span className="px-2.5 py-0.5 rounded-sm bg-[#FF9933] text-[#051C45] text-[10px] font-black uppercase tracking-wider inline-block">
            MEA GLOBAL COMMUNITY CELL
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Global Hindi Language Circles
          </h1>
          <p className="text-xs sm:text-sm text-slate-200 max-w-3xl leading-relaxed">
            Connect with native Hindi faculty, Indian diplomats, and international scholars in live conversational roundtables formatted for your local timezone.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {MOCK_LANGUAGE_CIRCLES.map((c) => {
            const isJoined = !!joinedCircles[c.id];
            return (
              <div
                key={c.id}
                className="bg-white border border-[#DCE2E6] hover:border-[#0B3D91] rounded-sm p-6 space-y-4 shadow-2xs transition text-left"
              >
                <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3">
                  <div>
                    <span className="text-[10px] font-black text-[#0B3D91] uppercase tracking-wider block">
                      {c.flag} {c.cityCountry}
                    </span>
                    <h3 className="font-extrabold text-base text-[#1B2A4A] mt-0.5">{c.title}</h3>
                  </div>
                  <span className="px-2 py-0.5 bg-amber-100 text-amber-900 text-[10px] font-black uppercase rounded-sm border border-amber-200 shrink-0">
                    {c.level}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-semibold bg-[#F8FAFC] p-3 rounded-sm border border-[#DCE2E6]">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase">Your Local Time:</span>
                    <span className="text-[#0B3D91] font-bold">{c.timeLocal}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase">IST Time:</span>
                    <span className="text-[#1B2A4A] font-bold">{c.timeIST}</span>
                  </div>
                </div>

                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-2 text-[#1B2A4A]">
                    <UserCheck className="w-4 h-4 text-[#0B3D91]" />
                    <span>Hosted by <strong>{c.hostName}</strong> ({c.hostRole})</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-500">
                    <Users2 className="w-4 h-4 text-emerald-700" />
                    <span>{c.participants + (isJoined ? 1 : 0)} / {c.maxParticipants} Seats Filled</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-semibold">{c.date}</span>
                  <button
                    onClick={() => handleToggleJoin(c.id)}
                    className={`px-5 py-2 rounded-sm text-xs font-black uppercase tracking-wider transition ${
                      isJoined
                        ? 'bg-emerald-700 text-white hover:bg-emerald-800 shadow-2xs'
                        : 'bg-[#0B3D91] hover:bg-[#082C6C] text-white shadow-2xs'
                    }`}
                  >
                    {isJoined ? 'Joined Session ✓' : 'Register for Circle →'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
