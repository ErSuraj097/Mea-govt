'use client';

import React, { useState } from 'react';
import {
  Video,
  Calendar,
  Clock,
  UserCheck,
  Users,
  Mic,
  MicOff,
  VideoOff,
  Hand,
  MessageSquare,
  Send,
  X,
  Play,
  CheckCircle2,
  Sparkles,
  Share2,
  Bookmark,
  Bell,
  Radio,
  FileText,
  Building2,
  GraduationCap,
  Globe,
  Filter,
  Search,
  BookOpen
} from 'lucide-react';

interface LiveClassItem {
  id: string;
  title: string;
  subtitle: string;
  track: 'Track A (Indian Bhashas)' | 'Track B (Foreign Languages)' | 'Global Multilingual';
  language: string;
  facultyName: string;
  facultyTitle: string;
  universityName: string;
  timeLabel: string;
  status: '🔴 LIVE NOW' | 'UPCOMING TODAY' | 'SCHEDULED' | 'RECORDED REPLAY';
  attendeesCount: number;
  bannerGradient: string;
  avatarUrl: string;
  agenda: string[];
}

const MOCK_LIVE_CLASSES: LiveClassItem[] = [
  {
    id: 'class_1',
    title: 'Advanced Devanagari SOV Sentence Structure & Verb Conjugations',
    subtitle: 'Mastering Subject-Object-Verb syntactic alignment in Hindi & Sanskrit',
    track: 'Track A (Indian Bhashas)',
    language: 'Hindi & Sanskrit',
    facultyName: 'Dr. Devendra Sharma',
    facultyTitle: 'Senior Professor of Hindi Linguistics',
    universityName: 'Kendriya Hindi Sansthan, Agra',
    timeLabel: 'LIVE NOW • Started 15m ago',
    status: '🔴 LIVE NOW',
    attendeesCount: 248,
    bannerGradient: 'from-[#0B3D91] via-[#082C6C] to-[#051C45]',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    agenda: ['SOV Word Order Rules', 'Transitive vs Intransitive Verbs', 'Live Audio Pronunciation Practice']
  },
  {
    id: 'class_2',
    title: 'Dravidian Phonetic Bridge & Lexical Harmony Masterclass',
    subtitle: 'Comparative analysis of Tamil, Telugu, Kannada & Malayalam prefix systems',
    track: 'Track A (Indian Bhashas)',
    language: 'Tamil, Telugu & Kannada',
    facultyName: 'Prof. Ananya Sen',
    facultyTitle: 'Head of Language Harmony & Phonetics',
    universityName: 'Central Institute of Indian Languages (CIIL), Mysuru',
    timeLabel: 'Today, 18:00 PM IST',
    status: 'UPCOMING TODAY',
    attendeesCount: 185,
    bannerGradient: 'from-[#0B3D91] to-[#FF9933]/90',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    agenda: ['Tamil-Hindi Cognates', 'Telugu Compound Nouns', 'Interactive Live Dictation']
  },
  {
    id: 'class_3',
    title: 'Diplomatic French & Communique Drafting Workshop',
    subtitle: 'Official multilateral protocol, note verbale, and formal diplomatic phrasing',
    track: 'Track B (Foreign Languages)',
    language: 'French',
    facultyName: 'Dr. Marc Laurent',
    facultyTitle: 'Director of Diplomatic Language Studies',
    universityName: 'EFLU Hyderabad & Alliance Française',
    timeLabel: 'Today, 20:00 PM IST',
    status: 'UPCOMING TODAY',
    attendeesCount: 310,
    bannerGradient: 'from-indigo-900 to-[#0B3D91]',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    agenda: ['Subjunctive Mood in Formal Notes', 'Embassy Protocol Phrases', 'Live Document Critique']
  },
  {
    id: 'class_4',
    title: 'German CEFR B2 Business & Geopolitical Grammar Sprint',
    subtitle: 'Complex sentence embedding, passive voice in policy documents, and pitch training',
    track: 'Track B (Foreign Languages)',
    language: 'German',
    facultyName: 'Prof. Hans Weber',
    facultyTitle: 'Senior Fellow in Germanic Philology',
    universityName: 'Goethe-Institut & JNU New Delhi',
    timeLabel: 'Tomorrow, 11:00 AM IST',
    status: 'SCHEDULED',
    attendeesCount: 195,
    bannerGradient: 'from-[#082C6C] to-slate-900',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    agenda: ['Modal Partikeln Mastery', 'Passiv Ersatzformen', 'Geopolitical Vocabulary']
  },
  {
    id: 'class_5',
    title: 'East Asian Kanji & Hanzi Calligraphic Aesthetics Replay',
    subtitle: 'Stroke order precision, radical recognition, and traditional character art',
    track: 'Track B (Foreign Languages)',
    language: 'Japanese & Mandarin',
    facultyName: 'Dr. Hiroshi Tanaka',
    facultyTitle: 'Chair of East Asian Languages',
    universityName: 'JNU School of Language Studies',
    timeLabel: 'Recorded Lecture • Available 24/7',
    status: 'RECORDED REPLAY',
    attendeesCount: 1420,
    bannerGradient: 'from-[#051C45] to-[#0B3D91]',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    agenda: ['Essential 214 Radicals Breakdown', 'Stroke Velocity & Balance', 'HD Video Replay']
  }
];

interface ChatMessage {
  id: string;
  sender: string;
  text: string;
  time: string;
  isSelf?: boolean;
}

export default function DashboardLiveClassesPage() {
  const [selectedTrack, setSelectedTrack] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [activeClassroom, setActiveClassroom] = useState<LiveClassItem | null>(null);

  // Classroom Player Controls State
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [handRaised, setHandRaised] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { id: 'c1', sender: 'Aarav Sharma', text: 'Namaste Professor! Excited for today\'s interactive studio session.', time: '18:02', isSelf: true },
    { id: 'c2', sender: 'Dr. Devendra Sharma', text: 'Welcome Aarav! Today we cover verb conjugations and live dictation.', time: '18:03' },
    { id: 'c3', sender: 'Priya Sundaram', text: 'Can we download the lecture slides during the live review?', time: '18:04' },
    { id: 'c4', sender: 'Dr. Devendra Sharma', text: 'Yes Priya, click the Download Slides button anytime in the toolbar!', time: '18:05' }
  ]);
  const [inputMsg, setInputMsg] = useState('');

  const handleSendMessage = () => {
    if (!inputMsg.trim()) return;
    const newMsg: ChatMessage = {
      id: 'c_' + Date.now(),
      sender: 'Aarav Sharma',
      text: inputMsg.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isSelf: true
    };
    setChatMessages((prev) => [...prev, newMsg]);
    setInputMsg('');
  };

  const filteredClasses = MOCK_LIVE_CLASSES.filter((c) => {
    const matchesTrack =
      selectedTrack === 'ALL' ||
      (selectedTrack === 'INDIAN' && c.track.includes('Indian')) ||
      (selectedTrack === 'FOREIGN' && c.track.includes('Foreign'));

    const matchesStatus = selectedStatus === 'ALL' || c.status === selectedStatus;

    const matchesSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.facultyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.language.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTrack && matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-8 max-w-8xl mx-auto pb-16">
      {/* Official MEA Government Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0B3D91] via-[#082C6C] to-[#051C45] text-white border border-[#0B3D91] shadow-xl relative overflow-hidden space-y-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10 border-b border-white/10 pb-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#FF9933] text-[#051C45] text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
                <Radio className="w-3.5 h-3.5 animate-pulse" /> LIVE ONLINE CLASSROOMS & TRAINING STUDIO
              </span>
              <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-200 text-[10px] font-bold uppercase border border-blue-400/30 flex items-center gap-1">
                <Globe className="w-3 h-3 text-cyan-300" /> 22 Indian Bhashas + 15 Foreign Languages
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Live Interactive Classes & Training
            </h1>
            <p className="text-xs sm:text-sm text-blue-100 font-medium leading-relaxed">
              Attend real-time video lectures led by accredited university professors from Kendriya Hindi Sansthan, CIIL Mysore, EFLU Hyderabad, JNU, and DU. Participate in live Q&A, raise hands, and download slides.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15 min-w-[240px]">
            <Users className="w-8 h-8 text-amber-300 shrink-0" />
            <div>
              <span className="text-[10px] font-bold text-blue-200 block uppercase tracking-wider">LIVE STUDENTS ONLINE</span>
              <span className="text-base font-black text-white">480+ Learners Active</span>
              <span className="text-[10px] text-emerald-300 font-extrabold block">● 2 Studio Sessions Live</span>
            </div>
          </div>
        </div>

        {/* Live Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-2 bg-black/20 p-1.5 rounded-2xl border border-white/10 w-full sm:w-auto overflow-x-auto">
            <button
              onClick={() => setSelectedTrack('ALL')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                selectedTrack === 'ALL'
                  ? 'bg-[#FF9933] text-[#051C45] shadow-md'
                  : 'text-blue-100 hover:text-white hover:bg-white/10'
              }`}
            >
              🌐 All Languages ({MOCK_LIVE_CLASSES.length})
            </button>
            <button
              onClick={() => setSelectedTrack('INDIAN')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                selectedTrack === 'INDIAN'
                  ? 'bg-[#FF9933] text-[#051C45] shadow-md'
                  : 'text-blue-100 hover:text-white hover:bg-white/10'
              }`}
            >
              🇮🇳 Track A: Indian Bhashas
            </button>
            <button
              onClick={() => setSelectedTrack('FOREIGN')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                selectedTrack === 'FOREIGN'
                  ? 'bg-[#FF9933] text-[#051C45] shadow-md'
                  : 'text-blue-100 hover:text-white hover:bg-white/10'
              }`}
            >
              🌍 Track B: Foreign Languages
            </button>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-300 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search topic, faculty, or language..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white placeholder-blue-200 text-xs font-medium focus:outline-none focus:bg-white/20"
            />
          </div>
        </div>
      </div>

      {/* Filter Pills Status */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1 shrink-0 mr-2">
          <Filter className="w-3.5 h-3.5 text-[#0B3D91]" /> Status:
        </span>
        {['ALL', '🔴 LIVE NOW', 'UPCOMING TODAY', 'SCHEDULED', 'RECORDED REPLAY'].map((st) => (
          <button
            key={st}
            onClick={() => setSelectedStatus(st)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold whitespace-nowrap transition border ${
              selectedStatus === st
                ? 'bg-[#0B3D91] text-white border-[#0B3D91] shadow-xs'
                : 'bg-white text-slate-700 border-[#DCE2E6] hover:border-[#0B3D91]/50 hover:bg-slate-50'
            }`}
          >
            {st === 'ALL' ? 'All Sessions' : st}
          </button>
        ))}
      </div>

      {/* LIVE CLASSES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredClasses.map((c) => (
          <div
            key={c.id}
            className="bg-white rounded-3xl border border-[#DCE2E6] overflow-hidden shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              <div className={`p-6 bg-gradient-to-r ${c.bannerGradient} text-white space-y-3 relative overflow-hidden`}>
                <div className="flex items-center justify-between text-xs">
                  <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-xs text-white font-black text-xs flex items-center gap-1.5 border border-white/10">
                    {c.status === '🔴 LIVE NOW' && <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />}
                    {c.status}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/20 text-white font-bold text-[11px] flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-amber-300" /> {c.attendeesCount} Attending
                  </span>
                </div>

                <div className="space-y-1 pt-2">
                  <span className="px-2 py-0.5 rounded bg-white/20 text-amber-200 text-[10px] font-black uppercase">
                    {c.track} • {c.language}
                  </span>
                  <h3 className="text-xl font-black text-white">{c.title}</h3>
                  <p className="text-xs text-blue-100 font-medium">{c.subtitle}</p>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <img
                    src={c.avatarUrl}
                    alt={c.facultyName}
                    className="w-12 h-12 rounded-2xl object-cover ring-2 ring-[#0B3D91] shadow-md shrink-0"
                  />
                  <div>
                    <h4 className="font-extrabold text-sm text-[#1B2A4A]">{c.facultyName}</h4>
                    <p className="text-xs text-[#0B3D91] font-bold">{c.facultyTitle}</p>
                    <p className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
                      <Building2 className="w-3 h-3 text-amber-600" /> {c.universityName}
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#F8FAFC] border border-[#DCE2E6] space-y-1.5 text-xs">
                  <span className="text-[10px] font-black uppercase text-[#0B3D91] tracking-wider block">
                    SESSION AGENDA:
                  </span>
                  <ul className="space-y-1 text-slate-800 font-semibold">
                    {c.agenda.map((ag, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{ag}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-6 pt-0 border-t border-slate-100 mt-auto flex items-center justify-between gap-3 pt-4">
              <span className="text-xs font-black text-[#0B3D91]">{c.timeLabel}</span>

              {c.status === '🔴 LIVE NOW' ? (
                <button
                  onClick={() => setActiveClassroom(c)}
                  className="px-6 py-2.5 rounded-xl bg-[#0B3D91] hover:bg-[#082C6C] text-white font-black text-xs uppercase tracking-wider shadow-lg flex items-center gap-2 transition"
                >
                  <Video className="w-4 h-4 text-[#FF9933]" /> Join Studio →
                </button>
              ) : c.status === 'RECORDED REPLAY' ? (
                <button
                  onClick={() => setActiveClassroom(c)}
                  className="px-6 py-2.5 rounded-xl bg-[#0B3D91] hover:bg-[#082C6C] text-white font-extrabold text-xs shadow-md transition flex items-center gap-1.5"
                >
                  <Play className="w-4 h-4 text-[#FF9933] fill-[#FF9933]" /> Watch Replay
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const token = 'ONLINE-STUDIO-2026-' + Math.floor(100000 + Math.random() * 900000);
                      alert(`✅ ONLINE CLASS BATCH REGISTERED!\n\nClassroom Token: ${token}\nFaculty: ${c.facultyName}\nTime: ${c.timeLabel}\n\nA calendar invite & Webinar Studio link have been dispatched to your email!`);
                    }}
                    className="px-5 py-2.5 rounded-xl bg-[#0B3D91] hover:bg-[#082C6C] text-white font-extrabold text-xs shadow-md transition flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#FF9933]" /> Register Batch
                  </button>
                  <button
                    onClick={() => alert(`🔔 Live Class Reminder set for ${c.title}!`)}
                    className="p-2.5 rounded-xl bg-[#EEF3F8] hover:bg-slate-200 text-slate-700 transition"
                    title="Set Reminder"
                  >
                    <Bell className="w-4 h-4 text-[#FF9933]" />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* FULL-SCREEN LIVE CLASSROOM INTERACTIVE STUDIO MODAL */}
      {activeClassroom && (
        <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-6xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200 my-4 text-left">
            {/* Studio Header */}
            <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-red-600 text-white font-black text-xs uppercase flex items-center gap-1.5 animate-pulse">
                  <span className="w-2 h-2 rounded-full bg-white animate-ping" /> LIVE STUDIO
                </span>
                <div>
                  <h3 className="font-black text-sm text-white">{activeClassroom.title}</h3>
                  <p className="text-xs text-slate-400 font-medium">{activeClassroom.facultyName} • {activeClassroom.universityName}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-bold flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-[#FF9933]" /> {activeClassroom.attendeesCount} Students
                </span>
                <button
                  onClick={() => setActiveClassroom(null)}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Studio Main Body */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              {/* Left Video Stream */}
              <div className="lg:col-span-8 p-4 bg-slate-950 flex flex-col justify-between space-y-4 border-r border-slate-800 min-h-[420px]">
                <div className="relative aspect-video rounded-2xl bg-gradient-to-br from-[#0B3D91] via-[#082C6C] to-[#051C45] border border-slate-800 overflow-hidden flex items-center justify-center shadow-inner group">
                  {isVideoOn ? (
                    <div className="text-center space-y-4">
                      <div className="relative inline-block">
                        <img
                          src={activeClassroom.avatarUrl}
                          alt=""
                          className="w-28 h-28 rounded-full object-cover ring-4 ring-[#FF9933] shadow-2xl mx-auto"
                        />
                        <span className="absolute bottom-1 right-1 w-5 h-5 bg-emerald-500 border-2 border-slate-900 rounded-full" />
                      </div>
                      <div>
                        <h4 className="font-extrabold text-base text-white">{activeClassroom.facultyName}</h4>
                        <span className="text-xs text-amber-300 font-bold">Presenting Slide 4: Grammar & Syntax Structure</span>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center space-y-2 text-slate-500">
                      <VideoOff className="w-12 h-12 mx-auto text-slate-600" />
                      <p className="text-xs font-bold">Camera Turned Off</p>
                    </div>
                  )}

                  {handRaised && (
                    <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-[#FF9933] text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-lg animate-bounce">
                      <Hand className="w-4 h-4 fill-slate-950" /> Hand Raised! Professor Notified.
                    </div>
                  )}
                </div>

                {/* Studio Bottom Toolbar */}
                <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsMicOn(!isMicOn)}
                      className={`p-3 rounded-xl font-bold text-xs flex items-center gap-1.5 transition ${
                        isMicOn ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-rose-600 text-white'
                      }`}
                    >
                      {isMicOn ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                      <span className="hidden sm:inline">{isMicOn ? 'Mic On' : 'Muted'}</span>
                    </button>

                    <button
                      onClick={() => setIsVideoOn(!isVideoOn)}
                      className={`p-3 rounded-xl font-bold text-xs flex items-center gap-1.5 transition ${
                        isVideoOn ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-rose-600 text-white'
                      }`}
                    >
                      {isVideoOn ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
                      <span className="hidden sm:inline">{isVideoOn ? 'Cam On' : 'Cam Off'}</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setHandRaised(!handRaised)}
                      className={`px-4 py-2.5 rounded-xl font-black text-xs flex items-center gap-1.5 transition ${
                        handRaised ? 'bg-[#FF9933] text-slate-950 shadow-md' : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                      }`}
                    >
                      <Hand className="w-4 h-4" /> Raise Hand
                    </button>

                    <button
                      onClick={() => alert('📄 Lecture Slides & PDF Notes downloaded!')}
                      className="px-4 py-2.5 rounded-xl bg-[#0B3D91] hover:bg-[#082C6C] text-white font-black text-xs flex items-center gap-1.5 transition shadow-sm"
                    >
                      <FileText className="w-4 h-4 text-[#FF9933]" /> Download Slides
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column: Q&A Chat */}
              <div className="lg:col-span-4 p-4 bg-slate-900 flex flex-col justify-between space-y-4 min-h-[420px]">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <div className="flex items-center gap-2 text-white font-extrabold text-xs">
                    <MessageSquare className="w-4 h-4 text-amber-400" /> Live Classroom Q&A
                  </div>
                  <span className="text-[10px] font-bold text-slate-400">Public Chat</span>
                </div>

                <div className="flex-1 overflow-y-auto max-h-72 space-y-3 pr-1 text-xs">
                  {chatMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`p-3 rounded-2xl space-y-1 ${
                        msg.isSelf
                          ? 'bg-[#0B3D91]/60 border border-blue-500/40 text-blue-100 ml-4'
                          : 'bg-slate-800/80 border border-slate-700 text-slate-200 mr-4'
                      }`}
                    >
                      <div className="flex justify-between items-center text-[10px] font-bold text-slate-400">
                        <span className={msg.isSelf ? 'text-amber-300' : 'text-amber-400'}>{msg.sender}</span>
                        <span>{msg.time}</span>
                      </div>
                      <p className="text-xs leading-snug">{msg.text}</p>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
                  <input
                    type="text"
                    placeholder="Ask a question or type your response..."
                    value={inputMsg}
                    onChange={(e) => setInputMsg(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1 p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#0B3D91]"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="p-2.5 rounded-xl bg-[#0B3D91] hover:bg-[#082C6C] text-white transition shrink-0"
                  >
                    <Send className="w-4 h-4 text-[#FF9933]" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
