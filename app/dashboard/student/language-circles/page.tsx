'use client';

import React, { useState } from 'react';
import {
  Users2,
  Mic,
  MicOff,
  Radio,
  Volume2,
  UserPlus,
  MessageSquare,
  Sparkles,
  CheckCircle2,
  Hand,
  X
} from 'lucide-react';

interface CircleRoom {
  id: string;
  topicHindi: string;
  topicEng: string;
  hostName: string;
  hostAvatar: string;
  languagePair: string;
  activeSpeakers: number;
  listenersCount: number;
  status: 'LIVE SPEAKEASY' | 'ROOM OPEN';
}

const LIVE_CIRCLES: CircleRoom[] = [
  {
    id: 'circle_1',
    topicHindi: 'Sanskrit & Hindi Comparative Conversation Circle',
    topicEng: 'Sanskrit & Hindi Comparative Conversation Circle',
    hostName: 'Prof. Ramesh Sharma',
    hostAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    languagePair: 'Sanskrit ➔ Hindi',
    activeSpeakers: 4,
    listenersCount: 42,
    status: 'LIVE SPEAKEASY'
  },
  {
    id: 'circle_2',
    topicHindi: 'Tamil-Hindi Peer Dialogue & Accent Practice',
    topicEng: 'Tamil-Hindi Peer Dialogue & Accent Practice',
    hostName: 'Priya Sundaram',
    hostAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    languagePair: 'Tamil ➔ Hindi',
    activeSpeakers: 3,
    listenersCount: 28,
    status: 'LIVE SPEAKEASY'
  },
  {
    id: 'circle_3',
    topicHindi: 'French-Hindi Diplomatic Phrase Exchange',
    topicEng: 'French-Hindi Diplomatic Phrase Exchange',
    hostName: 'Amb. Jean Dupont',
    hostAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    languagePair: 'French ➔ Hindi',
    activeSpeakers: 5,
    listenersCount: 56,
    status: 'ROOM OPEN'
  }
];

export default function LanguageCirclesPage() {
  const [joinedRoom, setJoinedRoom] = useState<CircleRoom | null>(null);
  const [isMicMuted, setIsMicMuted] = useState(true);

  return (
    <div className="space-y-8 max-w-8xl mx-auto pb-16">
      {/* Official MEA Government Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0B3D91] via-[#082C6C] to-[#051C45] text-white border border-[#0B3D91] shadow-md space-y-6 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10 border-b border-white/10 pb-4">
          <div className="space-y-1">
            <span className="px-3 py-1 rounded-full bg-[#FF9933] text-[#212121] text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 w-fit">
              <Radio className="w-3.5 h-3.5 text-[#212121] animate-pulse" /> LIVE PEER AUDIO LANGUAGE CIRCLES
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
              Live Language Circles & Peer Exchange
            </h1>
            <p className="text-xs text-blue-100 font-medium max-w-2xl">
              Join real-time peer voice exchange rooms. Practice speaking Hindi, Sanskrit, Tamil, French, and Spanish with scholars worldwide.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/15">
            <Users2 className="w-6 h-6 text-amber-300" />
            <div>
              <span className="text-[10px] font-bold text-blue-200 block uppercase">ACTIVE CIRCLES</span>
              <span className="text-sm font-black text-white">126 Speakers Live</span>
            </div>
          </div>
        </div>
      </div>

      {/* CIRCLES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {LIVE_CIRCLES.map((room) => (
          <div
            key={room.id}
            className="bg-white rounded-3xl border border-[#DCE2E6] p-6 space-y-5 shadow-2xs hover:shadow-xl transition duration-300 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-red-100 text-red-700 text-[10px] font-black uppercase flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" /> {room.status}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#EEF3F8] text-[#0B3D91] text-[10px] font-bold">
                  {room.languagePair}
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="text-lg font-black text-[#1B2A4A]">{room.topicHindi}</h3>
                <p className="text-xs font-bold text-[#0B3D91]">{room.topicEng}</p>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#F8FAFC] border border-[#DCE2E6]">
                <img src={room.hostAvatar} alt="" className="w-10 h-10 rounded-full object-cover ring-2 ring-[#0B3D91]" />
                <div>
                  <span className="text-[10px] font-bold text-slate-400 block uppercase">ROOM HOST</span>
                  <span className="font-extrabold text-xs text-[#1B2A4A]">{room.hostName}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3 mt-auto">
              <span className="text-xs font-bold text-slate-500">{room.listenersCount} Listening</span>
              <button
                onClick={() => setJoinedRoom(room)}
                className="px-5 py-2.5 rounded-xl bg-[#0B3D91] hover:bg-[#082C6C] text-white font-extrabold text-xs shadow-md transition flex items-center gap-1.5"
              >
                <Mic className="w-4 h-4 text-[#FF9933]" /> Join Voice Table →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* AUDIO ROOM MODAL */}
      {joinedRoom && (
        <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200 text-left text-white">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                <div>
                  <h3 className="font-black text-base text-white">{joinedRoom.topicHindi}</h3>
                  <p className="text-xs text-slate-400 font-medium">{joinedRoom.languagePair} • Host: {joinedRoom.hostName}</p>
                </div>
              </div>
              <button onClick={() => setJoinedRoom(null)} className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Simulated Stage Avatars */}
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 text-center">
              <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider block">STAGE SPEAKERS (4)</span>
              <div className="flex justify-center gap-4">
                <div className="space-y-1">
                  <img src={joinedRoom.hostAvatar} alt="" className="w-14 h-14 rounded-full object-cover ring-4 ring-[#FF9933] mx-auto shadow-md" />
                  <span className="text-[10px] font-bold text-slate-300 block">{joinedRoom.hostName}</span>
                </div>
                <div className="space-y-1">
                  <div className="w-14 h-14 rounded-full bg-[#0B3D91] text-amber-300 font-extrabold flex items-center justify-center text-sm ring-2 ring-blue-500 mx-auto">
                    AS
                  </div>
                  <span className="text-[10px] font-bold text-slate-300 block">Aarav (You)</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <button
                onClick={() => setIsMicMuted(!isMicMuted)}
                className={`px-5 py-2.5 rounded-xl font-extrabold text-xs flex items-center gap-2 transition ${
                  isMicMuted ? 'bg-rose-600 text-white' : 'bg-emerald-600 text-white'
                }`}
              >
                {isMicMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                {isMicMuted ? 'Microphone Muted' : 'Speaking Live'}
              </button>

              <button
                onClick={() => alert('✋ Raised hand to request speaking turn!')}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 font-extrabold text-xs flex items-center gap-1.5"
              >
                <Hand className="w-4 h-4" /> Raise Hand
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
