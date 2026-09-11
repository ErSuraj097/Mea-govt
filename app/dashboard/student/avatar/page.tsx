'use client';

import React, { useState } from 'react';
import {
  Bot,
  Sparkles,
  Volume2,
  CheckCircle2,
  Play,
  RotateCcw,
  Zap
} from 'lucide-react';

interface AvatarChar {
  id: string;
  name: string;
  roleTitle: string;
  nativeSpeech: string;
  imgUrl: string;
}

const AVATAR_STUDIO: AvatarChar[] = [
  {
    id: 'av_sharma',
    name: 'Prof. Devendra Sharma',
    roleTitle: 'Grammar & SOV Phonetics Specialist',
    nativeSpeech: 'Hello! I am Professor Devendra Sharma. Today we will examine sentence structure rules.',
    imgUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 'av_ananya',
    name: 'Ananya AI',
    roleTitle: 'Dravidian-Hindi Bridge Avatar',
    nativeSpeech: 'Vanakkam! I am Ananya. Today we will explore Tamil and Hindi language cognates.',
    imgUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 'av_maya',
    name: 'Maya Diplomat',
    roleTitle: 'Global Trade & Etiquette Avatar',
    nativeSpeech: 'Bonjour et Namaste! I facilitate international diplomatic language exchange.',
    imgUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=80'
  }
];

export default function StudentAvatarPage() {
  const [selectedAvatar, setSelectedAvatar] = useState(AVATAR_STUDIO[0]);
  const [speaking, setSpeaking] = useState(false);

  const handleSpeak = (speech: string) => {
    setSpeaking(true);
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(speech);
      u.lang = 'en-US';
      u.onend = () => setSpeaking(false);
      window.speechSynthesis.speak(u);
    }
  };

  return (
    <div className="space-y-8 max-w-8xl mx-auto pb-16">
      {/* Official MEA Government Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0B3D91] via-[#082C6C] to-[#051C45] text-white border border-[#0B3D91] shadow-md space-y-6 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10 border-b border-white/10 pb-4">
          <div className="space-y-1">
            <span className="px-3 py-1 rounded-full bg-[#FF9933] text-[#212121] text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 w-fit">
              <Bot className="w-3.5 h-3.5" /> DIGITAL AVATAR STUDIO
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
              3D Digital Avatars Studio
            </h1>
            <p className="text-xs text-blue-100 font-medium max-w-2xl">
              Interact with lip-synced AI faculty avatars for interactive Devanagari phonetics and conversational roleplay.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/15">
            <Sparkles className="w-6 h-6 text-amber-300 animate-pulse" />
            <div>
              <span className="text-[10px] font-bold text-blue-200 block uppercase">3D FACULTY BOT</span>
              <span className="text-sm font-black text-white">Lip-Sync v3</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Column: Avatar Cards (4 cols) */}
        <div className="md:col-span-4 space-y-3">
          {AVATAR_STUDIO.map((av) => (
            <button
              key={av.id}
              onClick={() => setSelectedAvatar(av)}
              className={`w-full p-4 rounded-3xl border text-left flex items-center gap-3 transition ${
                selectedAvatar.id === av.id
                  ? 'bg-[#0B3D91] text-white border-[#0B3D91] shadow-md ring-2 ring-[#FF9933]'
                  : 'bg-white text-[#1B2A4A] border-[#DCE2E6] hover:bg-[#F8FAFC]'
              }`}
            >
              <img src={av.imgUrl} alt="" className="w-12 h-12 rounded-2xl object-cover ring-2 ring-white" />
              <div>
                <h4 className="font-extrabold text-sm">{av.name}</h4>
                <p className={`text-xs ${selectedAvatar.id === av.id ? 'text-amber-300' : 'text-[#0B3D91]'}`}>{av.roleTitle}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Right Column: Stage Preview Canvas (8 cols) */}
        <div className="md:col-span-8 bg-white rounded-3xl border border-[#DCE2E6] p-8 text-center space-y-6 shadow-2xs">
          <div className="relative inline-block mx-auto">
            <img
              src={selectedAvatar.imgUrl}
              alt=""
              className={`w-44 h-44 rounded-full object-cover ring-4 ring-[#0B3D91] shadow-xl mx-auto ${
                speaking ? 'animate-pulse ring-[#FF9933]' : ''
              }`}
            />
            {speaking && (
              <span className="absolute bottom-2 right-2 px-3 py-1 rounded-full bg-[#FF9933] text-[#212121] text-[10px] font-black uppercase animate-bounce shadow-md">
                Speaking...
              </span>
            )}
          </div>

          <div className="space-y-2 max-w-lg mx-auto">
            <h3 className="text-xl font-black text-[#1B2A4A]">{selectedAvatar.name}</h3>
            <p className="text-xs font-bold text-[#0B3D91]">{selectedAvatar.roleTitle}</p>
            <p className="text-xs text-slate-700 font-medium italic p-4 rounded-2xl bg-[#EEF3F8] border border-[#D0DCE7]">
              "{selectedAvatar.nativeSpeech}"
            </p>
          </div>

          <button
            onClick={() => handleSpeak(selectedAvatar.nativeSpeech)}
            className="px-8 py-3.5 rounded-2xl bg-[#0B3D91] hover:bg-[#082C6C] text-white font-extrabold text-xs shadow-lg inline-flex items-center gap-2 transition"
          >
            <Volume2 className="w-4 h-4 text-[#FF9933]" /> Trigger Avatar Audio Speech
          </button>
        </div>
      </div>
    </div>
  );
}
