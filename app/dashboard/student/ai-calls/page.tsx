'use client';

import React, { useState } from 'react';
import {
  PhoneCall,
  Phone,
  PhoneOff,
  Mic,
  MicOff,
  Sparkles,
  CheckCircle2,
  Calendar,
  Clock,
  Volume2,
  Bot,
  Flame,
  MessageSquare
} from 'lucide-react';

export default function StudentAICallsPage() {
  const [inCall, setInCall] = useState(false);
  const [callMuted, setCallMuted] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('Hindi (हिन्दी)');
  const [callDuration, setCallDuration] = useState(0);

  const handleStartCall = () => {
    setInCall(true);
    setCallDuration(0);
  };

  const handleEndCall = () => {
    setInCall(false);
    alert(`📞 AI PRACTICE CALL ENDED!\n\nDuration: 2 mins 14 secs\nLanguage: ${selectedLanguage}\nFluency Feedback: 94% Devanagari Pronunciation Accuracy!\n+50 XP Awarded to your profile.`);
  };

  return (
    <div className="space-y-8 max-w-8xl mx-auto pb-16">
      {/* Official MEA Government Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0B3D91] via-[#082C6C] to-[#051C45] text-white border border-[#0B3D91] shadow-md space-y-6 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10 border-b border-white/10 pb-4">
          <div className="space-y-1">
            <span className="px-3 py-1 rounded-full bg-[#FF9933] text-[#212121] text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 w-fit">
              <Bot className="w-3.5 h-3.5" /> JETHAT AI PRACTICE CALL STUDIO
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
              JETHAT AI Voice Call Studio
            </h1>
            <p className="text-xs text-blue-100 font-medium max-w-2xl">
              Practice real-time spoken conversational dialogue with JETHAT AI, your 24/7 interactive voice language partner with instant phonetics correction.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/15">
            <PhoneCall className="w-6 h-6 text-amber-300 animate-pulse" />
            <div>
              <span className="text-[10px] font-bold text-blue-200 block uppercase">24/7 AI VOICE BOT</span>
              <span className="text-sm font-black text-white">Mira Voice v4.2</span>
            </div>
          </div>
        </div>
      </div>

      {!inCall ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl border border-[#DCE2E6] p-6 sm:p-8 space-y-6 shadow-2xs">
            <div className="border-b border-slate-100 pb-3">
              <span className="px-3 py-1 rounded-full bg-[#EEF3F8] text-[#0B3D91] text-xs font-black uppercase">
                INSTANT VOICE CALL LAUNCHER
              </span>
              <h3 className="text-xl font-black text-[#1B2A4A] mt-2">Start Voice Call Practice</h3>
            </div>

            <div className="space-y-4 text-xs font-semibold">
              <div className="space-y-1.5">
                <label className="text-[#1B2A4A] font-bold block">Select Target Language for Call:</label>
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#F8FAFC] border border-[#DCE2E6] font-bold text-[#1B2A4A]"
                >
                  <option value="Hindi (हिन्दी)">Hindi (हिन्दी)</option>
                  <option value="Sanskrit (संस्कृतम्)">Sanskrit (संस्कृतम्)</option>
                  <option value="Tamil (தமிழ்)">Tamil (தமிழ்)</option>
                  <option value="French (Français)">French (Français)</option>
                  <option value="Spanish (Español)">Spanish (Español)</option>
                </select>
              </div>

              <div className="p-4 rounded-2xl bg-[#EEF3F8] border border-[#D0DCE7] space-y-2 text-[#0B3D91]">
                <span className="font-black block uppercase text-[10px]">PRACTICE SCENARIOS INCLUDED:</span>
                <ul className="space-y-1 font-semibold text-[11px]">
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Self Introduction & Greetings</li>
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Asking Directions & Travel Vocabulary</li>
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Diplomatic Etiquette & Cultural Phrases</li>
                </ul>
              </div>
            </div>

            <button
              onClick={handleStartCall}
              className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm shadow-xl flex items-center justify-center gap-2 transition uppercase tracking-wider"
            >
              <Phone className="w-5 h-5 text-white" /> Start Live Call with JETHAT AI →
            </button>
          </div>

          <div className="bg-white rounded-3xl border border-[#DCE2E6] p-6 sm:p-8 space-y-5 shadow-2xs">
            <div className="border-b border-slate-100 pb-3">
              <span className="px-3 py-1 rounded-full bg-[#EEF3F8] text-[#0B3D91] text-xs font-black uppercase">
                SCHEDULE AUTOMATED CALLS
              </span>
              <h3 className="text-xl font-black text-[#1B2A4A] mt-2">Daily Voice Reminder</h3>
            </div>

            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              Set an automated daily practice reminder. JETHAT AI will initiate a scheduled voice call session directly inside your portal at your preferred time.
            </p>

            <div className="grid grid-cols-2 gap-3 text-xs font-semibold">
              <div className="space-y-1">
                <label className="text-[#1B2A4A] font-bold">Call Time:</label>
                <input type="time" defaultValue="18:30" className="w-full p-3 rounded-xl bg-[#F8FAFC] border border-[#DCE2E6] font-bold" />
              </div>
              <div className="space-y-1">
                <label className="text-[#1B2A4A] font-bold">Duration:</label>
                <select className="w-full p-3 rounded-xl bg-[#F8FAFC] border border-[#DCE2E6] font-bold">
                  <option>5 Minutes Daily</option>
                  <option>10 Minutes Daily</option>
                  <option>15 Minutes Daily</option>
                </select>
              </div>
            </div>

            <button
              onClick={() => alert(`📅 DAILY AI VOICE CALL SCHEDULED!\n\nJETHAT AI will initiate daily practice calls at 18:30 PM.`)}
              className="w-full py-3 rounded-xl bg-[#0B3D91] hover:bg-[#082C6C] text-white font-extrabold text-xs shadow-md transition flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4 text-[#FF9933]" /> Schedule Daily Practice Call
            </button>
          </div>
        </div>
      ) : (
        /* LIVE CALL IN PROGRESS MODAL CANVAS */
        <div className="bg-slate-950 rounded-3xl border border-slate-800 p-8 sm:p-12 text-center space-y-8 shadow-2xl text-white animate-in zoom-in-95 duration-200">
          <div className="space-y-2">
            <span className="px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-mono font-black text-xs uppercase tracking-widest border border-emerald-500/40">
              🔴 LIVE VOICE CALL • {selectedLanguage}
            </span>
            <h2 className="text-3xl font-black text-white">JETHAT AI Spoken Assistant</h2>
            <p className="text-xs text-slate-400">"Hello Aarav! Which topic would you like to practice today?"</p>
          </div>

          {/* Animated Audio Soundwave Visualizer */}
          <div className="flex items-center justify-center gap-2.5 h-20">
            {[40, 70, 95, 60, 85, 100, 75, 45, 90, 65, 80, 50].map((h, i) => (
              <span
                key={i}
                style={{ height: `${h}%` }}
                className="w-2.5 rounded-full bg-gradient-to-t from-[#0B3D91] via-[#FF9933] to-amber-300 animate-pulse"
              />
            ))}
          </div>

          <div className="flex items-center justify-center gap-4 pt-4">
            <button
              onClick={() => setCallMuted(!callMuted)}
              className={`p-4 rounded-2xl font-bold text-xs flex items-center gap-2 transition ${callMuted ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                }`}
            >
              {callMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5 text-amber-300" />}
              {callMuted ? 'Muted' : 'Mute Mic'}
            </button>

            <button
              onClick={handleEndCall}
              className="px-8 py-4 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-black text-sm shadow-xl flex items-center gap-2 uppercase tracking-wider transition"
            >
              <PhoneOff className="w-5 h-5" /> End Call
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
