'use client';

import React, { useState, useEffect } from 'react';
import {
  Bot,
  Send,
  Sparkles,
  Mic,
  MicOff,
  Video,
  VideoOff,
  Volume2,
  PhoneOff,
  RotateCcw,
  CheckCircle2,
  Copy,
  Download,
  Globe,
  MessageSquare,
  Radio,
  Sliders,
  Maximize2
} from 'lucide-react';

interface ChatMsg {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  language: string;
  translation?: string;
  timestamp: string;
}

const SUPPORTED_LANGUAGES = [
  // Indian Languages
  { code: 'hi', name: 'Hindi (हिन्दी)', type: 'Indian' },
  { code: 'ta', name: 'Tamil (தமிழ்)', type: 'Indian' },
  { code: 'te', name: 'Telugu (తెలుగు)', type: 'Indian' },
  { code: 'sa', name: 'Sanskrit (संस्कृतम्)', type: 'Indian' },
  { code: 'bn', name: 'Bengali (বাংলা)', type: 'Indian' },
  { code: 'mr', name: 'Marathi (मराठी)', type: 'Indian' },
  { code: 'gu', name: 'Gujarati (ગુજરાતી)', type: 'Indian' },
  { code: 'kn', name: 'Kannada (ಕನ್ನಡ)', type: 'Indian' },
  { code: 'ml', name: 'Malayalam (മലയാളം)', type: 'Indian' },
  { code: 'pa', name: 'Punjabi (ਪੰਜਾਬੀ)', type: 'Indian' },
  // Foreign Languages
  { code: 'fr', name: 'French (Français)', type: 'Foreign' },
  { code: 'es', name: 'Spanish (Español)', type: 'Foreign' },
  { code: 'de', name: 'German (Deutsch)', type: 'Foreign' },
  { code: 'ja', name: 'Japanese (日本語)', type: 'Foreign' },
  { code: 'zh', name: 'Mandarin (中文)', type: 'Foreign' },
  { code: 'ru', name: 'Russian (Русский)', type: 'Foreign' },
  { code: 'ar', name: 'Arabic (العربية)', type: 'Foreign' },
];

export default function StudentChatbotPage() {
  const [activeMode, setActiveMode] = useState<'chat' | 'video'>('chat');
  const [selectedLang, setSelectedLang] = useState('Hindi (हिन्दी)');
  const [input, setInput] = useState('');
  
  // Video Calling State
  const [isVideoActive, setIsVideoActive] = useState(false);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCamOn, setIsCamOn] = useState(true);
  const [callDuration, setCallDuration] = useState(0);
  const [liveCaption, setLiveCaption] = useState('Welcome to AI Video Call! Ask me any sentence or grammar rule.');

  const [messages, setMessages] = useState<ChatMsg[]>([
    {
      id: 'm1',
      sender: 'ai',
      text: 'Hello! I am your AI Teacher Hub tutor. How can I assist you with grammar, vocabulary, or pronunciation today?',
      language: 'English',
      translation: 'Namaste! Main aapka AI Shikshak hoon.',
      timestamp: '10:00 AM'
    }
  ]);

  useEffect(() => {
    let timer: any;
    if (isVideoActive) {
      timer = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    } else {
      setCallDuration(0);
    }
    return () => clearInterval(timer);
  }, [isVideoActive]);

  const handleSend = () => {
    if (!input.trim()) return;
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    const userMsg: ChatMsg = {
      id: 'u_' + Date.now(),
      sender: 'user',
      text: input,
      language: selectedLang,
      timestamp: time
    };

    const aiMsg: ChatMsg = {
      id: 'ai_' + Date.now(),
      sender: 'ai',
      text: `Regarding your query "${input}": In ${selectedLang}, the standard Subject-Object-Verb (SOV) structure ensures clarity. Always place action verbs at the end of the clause.`,
      language: selectedLang,
      translation: `Practice pronunciation: "${input}"`,
      timestamp: time
    };

    setMessages((prev) => [...prev, userMsg, aiMsg]);
    setInput('');
  };

  const startVideoCall = () => {
    setIsVideoActive(true);
    setActiveMode('video');
    setLiveCaption(`Live AI Video Session started in ${selectedLang}. Speak freely or ask for live translation.`);
  };

  const endVideoCall = () => {
    setIsVideoActive(false);
    setActiveMode('chat');
    alert(`📹 LIVE VIDEO SESSION CONCLUDED!\n\nDuration: ${Math.floor(callDuration / 60)}m ${callDuration % 60}s\nLanguage Studied: ${selectedLang}\nFluency Feedback: 95% Speech Accuracy!\n+100 XP added to your student profile.`);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-8 max-w-8xl mx-auto pb-16">
      {/* Official MEA Government Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0B3D91] via-[#082C6C] to-[#051C45] text-white border border-[#0B3D91] shadow-md space-y-6 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10 border-b border-white/10 pb-4">
          <div className="space-y-1">
            <span className="px-3 py-1 rounded-full bg-[#FF9933] text-[#212121] text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 w-fit">
              <Bot className="w-3.5 h-3.5" /> AI TEACHER HUB & LIVE VIDEO CALL STUDIO
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
              AI Teacher Hub & Live Video Calling
            </h1>
            <p className="text-xs text-blue-100 font-medium max-w-2xl">
              Interactive 24/7 AI language tutor supporting 22 Indian Languages and 15 Foreign Languages with live text chat and real-time AI Video Calling.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/15">
            <button
              onClick={() => { setActiveMode('chat'); setIsVideoActive(false); }}
              className={`px-4 py-2 rounded-xl font-extrabold text-xs transition flex items-center gap-1.5 ${
                activeMode === 'chat' ? 'bg-[#FF9933] text-[#212121] shadow-md' : 'text-white hover:bg-white/10'
              }`}
            >
              <MessageSquare className="w-4 h-4" /> AI Text Tutor
            </button>
            <button
              onClick={startVideoCall}
              className={`px-4 py-2 rounded-xl font-extrabold text-xs transition flex items-center gap-1.5 ${
                activeMode === 'video' ? 'bg-red-600 text-white shadow-md animate-pulse' : 'text-white hover:bg-white/10'
              }`}
            >
              <Video className="w-4 h-4 text-amber-300" /> Live Video Call
            </button>
          </div>
        </div>

        {/* Language Selector Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 relative z-10 pt-1">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-[#FF9933]" />
            <span className="text-xs font-bold text-blue-100">Select Practice Language:</span>
            <select
              value={selectedLang}
              onChange={(e) => setSelectedLang(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-white/15 backdrop-blur-md border border-white/25 text-white font-bold text-xs focus:outline-none focus:ring-2 focus:ring-[#FF9933]"
            >
              <optgroup label="Indian Languages (22 Bhashas)">
                {SUPPORTED_LANGUAGES.filter(l => l.type === 'Indian').map(l => (
                  <option key={l.code} value={l.name} className="text-slate-900">{l.name}</option>
                ))}
              </optgroup>
              <optgroup label="Foreign Languages (15 International)">
                {SUPPORTED_LANGUAGES.filter(l => l.type === 'Foreign').map(l => (
                  <option key={l.code} value={l.name} className="text-slate-900">{l.name}</option>
                ))}
              </optgroup>
            </select>
          </div>

          <span className="text-xs font-bold text-amber-300">
            Active Mode: {selectedLang} Tutor
          </span>
        </div>
      </div>

      {/* MODE 1: TEXT CHAT & TUTOR */}
      {activeMode === 'chat' && (
        <div className="bg-white rounded-3xl border border-[#DCE2E6] p-6 sm:p-8 space-y-6 shadow-2xs min-h-[500px] flex flex-col justify-between animate-in fade-in duration-200">
          <div className="space-y-4 overflow-y-auto max-h-[440px] pr-2">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`p-5 rounded-3xl space-y-2 max-w-2xl text-xs font-semibold ${
                  m.sender === 'user'
                    ? 'bg-[#0B3D91] text-white ml-auto shadow-md'
                    : 'bg-[#F8FAFC] text-[#1B2A4A] border border-[#DCE2E6] mr-auto shadow-2xs'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-extrabold opacity-80 border-b border-slate-200/20 pb-1.5">
                  <span className={m.sender === 'user' ? 'text-amber-300' : 'text-[#0B3D91]'}>
                    {m.sender === 'user' ? 'Aarav (Student)' : `🤖 AI Tutor (${m.language})`}
                  </span>
                  <span>{m.timestamp}</span>
                </div>
                <h4 className="text-sm font-bold leading-relaxed">{m.text}</h4>
                {m.translation && (
                  <p className="text-[11px] opacity-90 italic text-amber-600 bg-amber-50/50 p-2 rounded-xl">
                    💡 {m.translation}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* CHAT INPUT BAR */}
          <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
            <input
              type="text"
              placeholder={`Ask AI Tutor any grammar or vocabulary question in ${selectedLang}...`}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 p-3.5 rounded-2xl bg-[#F8FAFC] border border-[#DCE2E6] font-semibold text-xs text-[#1B2A4A] focus:outline-none focus:border-[#0B3D91]"
            />
            <button
              onClick={handleSend}
              className="px-6 py-3.5 rounded-2xl bg-[#0B3D91] hover:bg-[#082C6C] text-white font-extrabold text-xs shadow-md transition flex items-center gap-1.5"
            >
              <Send className="w-4 h-4 text-[#FF9933]" /> Send Query
            </button>
            <button
              onClick={startVideoCall}
              className="px-5 py-3.5 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs shadow-md transition flex items-center gap-1.5"
              title="Switch to Live AI Video Call"
            >
              <Video className="w-4 h-4" /> Video Call
            </button>
          </div>
        </div>
      )}

      {/* MODE 2: LIVE AI VIDEO CALL STUDIO */}
      {activeMode === 'video' && (
        <div className="bg-slate-950 rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-2xl text-white animate-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-red-600 text-white font-black text-xs uppercase flex items-center gap-1.5 animate-pulse">
                <span className="w-2 h-2 rounded-full bg-white animate-ping" /> LIVE AI VIDEO CALL
              </span>
              <div>
                <h3 className="font-black text-base text-white">AI Faculty Tutor • {selectedLang}</h3>
                <p className="text-xs text-slate-400 font-mono">Session Timer: {formatTime(callDuration)}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-slate-800 text-amber-300 text-xs font-bold border border-slate-700">
                1080p HD Video
              </span>
              <button onClick={endVideoCall} className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs">
                End Call
              </button>
            </div>
          </div>

          {/* Simulated HD Video Stream Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Main Video Screen: AI Faculty Avatar (8 cols) */}
            <div className="lg:col-span-8 relative aspect-video rounded-3xl bg-gradient-to-br from-[#0B3D91] via-[#082C6C] to-[#051C45] border border-slate-800 overflow-hidden flex flex-col justify-between p-6 shadow-inner group">
              <div className="flex items-center justify-between text-xs z-10">
                <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-md text-amber-300 font-bold border border-white/10">
                  🤖 AI Faculty Tutor ({selectedLang})
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
                  Voice Recognition Active
                </span>
              </div>

              {/* AI Avatar Face & Speech Visualizer */}
              <div className="text-center space-y-4 my-auto relative z-10">
                <div className="relative inline-block mx-auto">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80"
                    alt="AI Tutor"
                    className="w-32 h-32 rounded-full object-cover ring-4 ring-[#FF9933] shadow-2xl mx-auto animate-pulse"
                  />
                  <span className="absolute bottom-1 right-1 w-6 h-6 bg-emerald-500 border-2 border-slate-900 rounded-full flex items-center justify-center text-slate-950 font-black text-xs">✓</span>
                </div>

                <div className="space-y-1">
                  <h4 className="text-lg font-black text-white">Ananya AI Language Tutor</h4>
                  <p className="text-xs text-amber-300 font-bold">Speaking & Listening in {selectedLang}</p>
                </div>

                {/* Animated Soundwave */}
                <div className="flex items-center justify-center gap-1.5 h-8">
                  {[30, 60, 90, 50, 80, 100, 70, 40, 85, 60].map((h, idx) => (
                    <span key={idx} style={{ height: `${h}%` }} className="w-1.5 rounded-full bg-[#FF9933] animate-pulse" />
                  ))}
                </div>
              </div>

              {/* Live Subtitle Transcript Banner */}
              <div className="p-3.5 rounded-2xl bg-black/70 backdrop-blur-md border border-white/15 text-xs text-slate-200 font-medium text-center z-10">
                💬 <strong>Live AI Transcript:</strong> "{liveCaption}"
              </div>
            </div>

            {/* Right Column: User Camera Preview & Controls (4 cols) */}
            <div className="lg:col-span-4 space-y-4 flex flex-col justify-between">
              {/* User Self Camera PIP Box */}
              <div className="relative aspect-video rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden flex items-center justify-center p-4">
                {isCamOn ? (
                  <div className="text-center space-y-2">
                    <div className="w-16 h-16 rounded-full bg-[#0B3D91] text-amber-300 font-black flex items-center justify-center text-xl mx-auto shadow-md border border-blue-400">
                      AS
                    </div>
                    <span className="text-xs font-extrabold text-white block">Aarav Sharma (Student)</span>
                    <span className="text-[10px] text-emerald-400 font-bold block">Camera On • Self Preview</span>
                  </div>
                ) : (
                  <div className="text-center space-y-1 text-slate-500">
                    <VideoOff className="w-8 h-8 mx-auto" />
                    <span className="text-xs font-bold">Camera Turned Off</span>
                  </div>
                )}
              </div>

              {/* Toolbar Controls */}
              <div className="p-4 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
                <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider block text-center">CALL CONTROLS</span>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setIsMicOn(!isMicOn)}
                    className={`p-3 rounded-xl font-extrabold text-xs flex items-center justify-center gap-1.5 transition ${
                      isMicOn ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-rose-600 text-white'
                    }`}
                  >
                    {isMicOn ? <Mic className="w-4 h-4 text-amber-300" /> : <MicOff className="w-4 h-4" />}
                    <span>{isMicOn ? 'Mic On' : 'Muted'}</span>
                  </button>

                  <button
                    onClick={() => setIsCamOn(!isCamOn)}
                    className={`p-3 rounded-xl font-extrabold text-xs flex items-center justify-center gap-1.5 transition ${
                      isCamOn ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-rose-600 text-white'
                    }`}
                  >
                    {isCamOn ? <Video className="w-4 h-4 text-amber-300" /> : <VideoOff className="w-4 h-4" />}
                    <span>{isCamOn ? 'Cam On' : 'Cam Off'}</span>
                  </button>
                </div>

                <button
                  onClick={() => setLiveCaption(`AI Tutor: "Excellent pronunciation in ${selectedLang}! Let's review standard verb roots."`)}
                  className="w-full py-2.5 rounded-xl bg-[#0B3D91] hover:bg-[#082C6C] text-white font-extrabold text-xs shadow-md transition flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-4 h-4 text-[#FF9933]" /> Trigger AI Speech Response
                </button>

                <button
                  onClick={endVideoCall}
                  className="w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs shadow-md flex items-center justify-center gap-2 transition uppercase tracking-wider"
                >
                  <PhoneOff className="w-4 h-4" /> Disconnect AI Video Call
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
