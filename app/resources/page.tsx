'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Video,
  Headphones,
  FileText,
  Download,
  BookOpen,
  Play,
  Pause,
  CheckCircle2,
  Sparkles,
  Award,
  Search,
  Volume2,
  FolderDown,
  WifiOff,
  Filter
} from 'lucide-react';

export default function ResourcesPage() {
  const [playingAudioIdx, setPlayingAudioIdx] = useState<number | null>(null);
  const [resourceFilter, setResourceFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const sampleAudioClips = [
    {
      title: 'Devanagari Vowels (स्वर उच्चारण)',
      lang: 'Hindi Native',
      duration: '01:45',
      phonetic: 'a, aa, i, ee, u, oo...',
      desc: 'Standard native voice pronunciation of all 13 Hindi vowels.'
    },
    {
      title: 'Tamil to Hindi Phonetic Bridge (தமிழ் -> हिंदी)',
      lang: 'Dravidian Bridge',
      duration: '02:10',
      phonetic: 'Vanakkam -> Namaste / Nanri -> Dhanyavaad',
      desc: 'Phonetic equivalency audio drill curated by CIIL Mysuru.'
    },
    {
      title: 'SOV Sentence Structure Pitch (वाक्य विन्यास)',
      lang: 'Grammar Drill',
      duration: '01:30',
      phonetic: 'Subject + Object + Verb Order',
      desc: 'Auditory stress patterns for Hindi Subject-Object-Verb speech.'
    }
  ];

  const downloadableKits = [
    {
      title: 'Beginner Devanagari Master Kit',
      subtitle: 'Complete Handwriting & Reading Starter Pack',
      size: '14.2 MB',
      format: 'ZIP (PDF + MP3)',
      icon: BookOpen,
      color: 'border-orange-500 bg-orange-50/50',
      badge: 'POPULAR'
    },
    {
      title: 'Official Rajbhasha Officer Exam Kit 2026',
      subtitle: 'Mock Tests, Constitutional Clauses & Vocab',
      size: '48.5 MB',
      format: 'PDF Bundle',
      icon: Award,
      color: 'border-cyan-500 bg-cyan-50/50',
      badge: 'GOVT EXAM'
    },
    {
      title: 'CIIL Dravidian-Hindi Audio Drills Pack',
      subtitle: 'Tamil, Telugu, Malayalam & Kannada Bridge',
      size: '32.8 MB',
      format: 'ZIP (Audio Podcasts)',
      icon: Headphones,
      color: 'border-emerald-500 bg-emerald-50/50',
      badge: 'AUDIO PACK'
    }
  ];

  const resourceTableData = [
    {
      title: 'NIOS Secondary Hindi Textbook PDF (Module 1-4)',
      type: 'PDF',
      category: 'ebook',
      size: '18.4 MB',
      level: 'Secondary (Class 10)',
      downloadUrl: '/dashboard/student?tab=guided-learning'
    },
    {
      title: 'Devanagari Stroke Order Tracing Worksheet',
      type: 'Worksheet',
      category: 'worksheet',
      size: '4.2 MB',
      level: 'Absolute Beginner',
      downloadUrl: '/dashboard/student?tab=guided-learning'
    },
    {
      title: '4K HD Video: SOV Hindi Grammar Masterclass',
      type: 'Video',
      category: 'video',
      size: '220 MB',
      level: 'Intermediate',
      downloadUrl: '/dashboard/student?tab=free-videos'
    },
    {
      title: 'Munshi Premchand Stories Native Audiobook (Ch 1-5)',
      type: 'Audio MP3',
      category: 'audio',
      size: '64.0 MB',
      level: 'Advanced Literature',
      downloadUrl: '/dashboard/student?tab=free-audio'
    },
    {
      title: 'Kendriya Hindi Sansthan Course Prospectus 2026',
      type: 'PDF',
      category: 'ebook',
      size: '8.1 MB',
      level: 'All Scholars',
      downloadUrl: '/dashboard/student?tab=guided-learning'
    }
  ];

  const filteredResources = resourceTableData.filter(item => {
    const matchesFilter = resourceFilter === 'all' || item.category === resourceFilter;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.level.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const toggleAudio = (idx: number) => {
    if (playingAudioIdx === idx) {
      setPlayingAudioIdx(null);
    } else {
      setPlayingAudioIdx(idx);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20 space-y-16">
      {/* Page Hero Header */}
      <section className="bg-slate-950 text-white py-16 px-4 sm:px-6 lg:px-8 border-b-4 border-cyan-500 relative overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-4 text-center relative z-10">
          <span className="px-4 py-1.5 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-black uppercase tracking-widest border border-cyan-400/40 inline-flex items-center gap-1.5">
            <Video className="w-3.5 h-3.5 text-cyan-400" /> FREE RESOURCE FACILITIES HUB
          </span>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight max-w-4xl mx-auto">
            निःशुल्क वीडियो, ऑडियो व अध्ययन सामग्री लाइब्रेरी
          </h1>

          <p className="text-slate-300 text-sm sm:text-base font-medium max-w-2xl mx-auto leading-relaxed">
            Access HD video lectures, native pronunciation audio podcasts, downloadable NIOS study PDFs, and university course prospectuses 100% free of cost.
          </p>
        </div>
      </section>

      {/* Main Resources Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Resource Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Category 1: Free Videos */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-5 text-left flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-orange-600 text-white flex items-center justify-center font-bold shadow-md">
                <Video className="w-7 h-7" />
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-black text-orange-600 uppercase tracking-widest block">4K & HD TUTORIALS</span>
                <h3 className="text-xl font-black text-slate-900">🎥 Free Video Masterclasses</h3>
              </div>

              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                4K & HD video tutorials covering Devanagari stroke order, SOV sentence structure rules, conversational Hindi dialogue, and NIOS video lessons.
              </p>

              <div className="space-y-2 text-xs font-bold text-slate-800">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Devanagari Alphabet Handwriting Stroke Order (22 Lessons)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Subject-Object-Verb (SOV) Hindi Grammar Rules</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Daily Conversational Dialogue Masterclass</span>
                </div>
              </div>
            </div>

            <Link
              href="/dashboard/student?tab=free-videos"
              className="w-full py-3.5 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-xs uppercase tracking-wider text-center block shadow-md transition"
            >
              Watch Video Masterclasses →
            </Link>
          </div>

          {/* Category 2: Free Audio Podcasts */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-5 text-left flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-cyan-600 text-white flex items-center justify-center font-bold shadow-md">
                <Headphones className="w-7 h-7" />
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-black text-cyan-600 uppercase tracking-widest block">NATIVE AUDIO DRILLS</span>
                <h3 className="text-xl font-black text-slate-900">🎧 Free Audio Podcasts</h3>
              </div>

              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Native voice recordings, Dravidian-Hindi phonetic bridge audio drills, and audiobook chapters designed for offline listening and accent perfection.
              </p>

              <div className="space-y-2 text-xs font-bold text-slate-800">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>CIIL Mysuru Dravidian-Hindi Phonetic Drills (Tamil/Telugu)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Munshi Premchand Stories Native Voice Audiobook</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Daily Listening Comprehension Audio Podcast</span>
                </div>
              </div>
            </div>

            <Link
              href="/dashboard/student?tab=free-audio"
              className="w-full py-3.5 rounded-2xl bg-cyan-600 hover:bg-cyan-700 text-white font-extrabold text-xs uppercase tracking-wider text-center block shadow-md transition"
            >
              Listen Audio Podcasts →
            </Link>
          </div>

          {/* Category 3: Study PDFs */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-5 text-left flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold shadow-md">
                <FileText className="w-7 h-7" />
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest block">DOWNLOADABLE WORKSHEETS</span>
                <h3 className="text-xl font-black text-slate-900">📖 Download Study PDFs</h3>
              </div>

              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Downloadable NIOS textbook PDF worksheets, grammar reference books, Devanagari alphabet practice charts, and university admission prospectuses.
              </p>

              <div className="space-y-2 text-xs font-bold text-slate-800">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>NIOS Secondary Hindi Coursebook PDF Modules</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Devanagari Script Tracing & Handwriting Practice Sheet</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Kendriya Hindi Sansthan Admission Prospectus 2026</span>
                </div>
              </div>
            </div>

            <Link
              href="/dashboard/student?tab=guided-learning"
              className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs uppercase tracking-wider text-center block shadow-md transition"
            >
              Download Free PDFs →
            </Link>
          </div>
        </div>

        {/* EXTRA SECTION 1: Interactive Audio Pronunciation Preview Player */}
        <div className="bg-slate-900 rounded-3xl p-8 text-white space-y-6 shadow-xl border border-slate-800">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="space-y-1 text-left">
              <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-black uppercase tracking-widest border border-cyan-500/30">
                INTERACTIVE DEMO PLAYER
              </span>
              <h2 className="text-2xl font-black text-white">Live Audio Pronunciation Preview Player</h2>
              <p className="text-xs text-slate-400 font-medium">Click any sample track below to listen to native pronunciation and Dravidian phonetic drills.</p>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono bg-slate-950 px-4 py-2 rounded-xl border border-slate-800 text-cyan-400 shrink-0">
              <Volume2 className="w-4 h-4 animate-pulse" /> 24-bit 48kHz HD Audio Engine
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {sampleAudioClips.map((clip, idx) => {
              const isPlaying = playingAudioIdx === idx;

              return (
                <div
                  key={idx}
                  className={`p-5 rounded-2xl border transition-all text-left space-y-3 ${
                    isPlaying
                      ? 'bg-slate-800 border-cyan-500 shadow-lg shadow-cyan-500/10'
                      : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded bg-cyan-950 text-cyan-300 text-[10px] font-bold uppercase border border-cyan-800">
                      {clip.lang}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">{clip.duration}</span>
                  </div>

                  <div>
                    <h4 className="font-extrabold text-sm text-white">{clip.title}</h4>
                    <p className="text-xs text-slate-400 font-medium mt-1">{clip.desc}</p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] font-mono text-amber-300 font-semibold truncate">
                    🗣️ {clip.phonetic}
                  </div>

                  <button
                    onClick={() => toggleAudio(idx)}
                    className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition ${
                      isPlaying
                        ? 'bg-amber-500 text-slate-950 hover:bg-amber-400'
                        : 'bg-cyan-600 text-white hover:bg-cyan-500'
                    }`}
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="w-4 h-4" /> Pause Audio Track
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4" /> Play Audio Sample
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* EXTRA SECTION 2: Downloadable Featured Study Kits */}
        <div className="space-y-6 text-center">
          <div className="space-y-1">
            <span className="px-3.5 py-1 rounded-full bg-orange-50 text-orange-700 text-xs font-black uppercase tracking-wider border border-orange-200">
              BUNDLED STUDY KITS
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Featured Study Kits & Exam Preparation Bundles</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {downloadableKits.map((kit, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-3xl bg-white border-2 ${kit.color} space-y-4 shadow-sm hover:shadow-md transition flex flex-col justify-between`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold">
                      <kit.icon className="w-5 h-5" />
                    </div>
                    <span className="px-2.5 py-1 rounded-md bg-slate-900 text-white text-[10px] font-black uppercase tracking-wider">
                      {kit.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-black text-slate-900">{kit.title}</h3>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">{kit.subtitle}</p>
                  </div>

                  <div className="flex items-center gap-3 text-[11px] font-bold text-slate-600 bg-slate-100/80 p-2.5 rounded-xl">
                    <span>📦 Size: {kit.size}</span>
                    <span>•</span>
                    <span>Format: {kit.format}</span>
                  </div>
                </div>

                <Link
                  href="/dashboard/student?tab=guided-learning"
                  className="w-full py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs uppercase tracking-wider text-center block transition shadow-md flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" /> Download Complete Kit
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* EXTRA SECTION 3: Filterable Resource Library Table */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-6 text-left">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div className="space-y-1">
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-black uppercase tracking-wider border border-emerald-200">
                SEARCHABLE REPOSITORY
              </span>
              <h2 className="text-2xl font-black text-slate-900">Filterable Resource & PDF Directory</h2>
            </div>

            {/* Filter Buttons & Search Input */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search resources..."
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 font-medium"
                />
              </div>

              <select
                value={resourceFilter}
                onChange={(e) => setResourceFilter(e.target.value)}
                className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 focus:outline-none focus:border-emerald-500"
              >
                <option value="all">All Categories</option>
                <option value="ebook">E-Books & PDFs</option>
                <option value="worksheet">Worksheets</option>
                <option value="video">4K Videos</option>
                <option value="audio">Audio Podcasts</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-black uppercase text-[10px] tracking-wider">
                  <th className="p-3.5">Resource Title</th>
                  <th className="p-3.5">Type</th>
                  <th className="p-3.5">Level</th>
                  <th className="p-3.5">File Size</th>
                  <th className="p-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                {filteredResources.map((res, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition">
                    <td className="p-3.5 font-bold text-slate-900 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-emerald-600 shrink-0" />
                      {res.title}
                    </td>
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-bold uppercase">
                        {res.type}
                      </span>
                    </td>
                    <td className="p-3.5 text-slate-600">{res.level}</td>
                    <td className="p-3.5 font-mono text-slate-500">{res.size}</td>
                    <td className="p-3.5 text-right">
                      <Link
                        href={res.downloadUrl}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] inline-flex items-center gap-1 shadow-2xs transition"
                      >
                        <Download className="w-3.5 h-3.5" /> Access
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* EXTRA SECTION 4: Offline Access & Low-Bandwidth Mode */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-slate-900 to-slate-950 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-800">
          <div className="space-y-2 text-left">
            <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-black uppercase tracking-wider border border-amber-500/30 inline-flex items-center gap-1">
              <WifiOff className="w-3.5 h-3.5 text-amber-400" /> OFFLINE ACCESSIBILITY MODE
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white">Low-Bandwidth & Offline Learning Facility</h3>
            <p className="text-xs sm:text-sm text-slate-300 font-medium max-w-xl">
              Learners in rural areas can download all PDF modules, print-ready Devanagari handwriting workbooks, and compressed 240p audio podcasts for offline study without continuous internet access.
            </p>
          </div>
          <Link
            href="/dashboard/student?tab=guided-learning"
            className="px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider shrink-0 transition shadow-md"
          >
            📱 Enable Offline App Mode
          </Link>
        </div>
      </section>
    </div>
  );
}
