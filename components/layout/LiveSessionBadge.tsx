'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Video, Clock, Users, ChevronRight } from 'lucide-react';

interface LiveSessionState {
  isLive: boolean;
  title: string;
  speaker: string;
  nextInMinutes: number;
  participantsCount: number;
}

export default function LiveSessionBadge() {
  const [sessionState, setSessionState] = useState<LiveSessionState>({
    isLive: true,
    title: 'Diplomatic Hindi Pronunciation Lab',
    speaker: 'Prof. Ananya Varma (KHS)',
    nextInMinutes: 0,
    participantsCount: 42
  });

  // Simulate schedule countdown/toggle
  useEffect(() => {
    const timer = setInterval(() => {
      setSessionState((prev) => {
        if (prev.isLive) {
          return {
            ...prev,
            participantsCount: 40 + Math.floor(Math.random() * 8)
          };
        }
        return prev;
      });
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Link
      href="/dashboard/student?tab=live-session"
      className={`px-2.5 py-1 text-xs font-bold transition flex items-center gap-1.5 rounded-md border focus-visible:outline-[#0B3D91] ${
        sessionState.isLive
          ? 'bg-red-50 hover:bg-red-100 text-red-700 border-red-300 shadow-2xs animate-pulse'
          : 'bg-amber-50 hover:bg-amber-100 text-[#0B3D91] border-amber-300'
      }`}
      title={
        sessionState.isLive
          ? `Live Native-Speaker Session Active: ${sessionState.title}`
          : `Next Session in ${sessionState.nextInMinutes} minutes`
      }
      aria-label={
        sessionState.isLive
          ? `Live Session Now: ${sessionState.title} with ${sessionState.speaker}`
          : `Next Session in ${sessionState.nextInMinutes} minutes`
      }
    >
      {sessionState.isLive ? (
        <>
          <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
          <Video className="w-3.5 h-3.5 text-red-600 shrink-0" />
          <span className="font-extrabold hidden sm:inline">LIVE SESSION NOW</span>
          <span className="font-extrabold sm:hidden">LIVE</span>
          <span className="text-[10px] bg-red-600 text-white px-1.5 py-0.2 rounded-full font-mono hidden md:inline">
            {sessionState.participantsCount} Envoys
          </span>
        </>
      ) : (
        <>
          <Clock className="w-3.5 h-3.5 text-[#FF9933] shrink-0" />
          <span className="font-bold">Next Session in {sessionState.nextInMinutes}m</span>
        </>
      )}
    </Link>
  );
}
