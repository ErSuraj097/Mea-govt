'use client';

import React, { useState } from 'react';
import {
  FileText,
  Download,
  BookOpen,
  CheckCircle2,
  Sparkles,
  Search,
  Bookmark,
  Shield,
  Layers,
  ArrowRight,
  ShieldCheck,
  Award,
  BookMarked
} from 'lucide-react';

interface StudyModuleItem {
  id: string;
  moduleNumber: number;
  titleHindi: string;
  titleEng: string;
  pages: number;
  fileSize: string;
  author: string;
  badge: string;
}

const GUIDED_STUDY_MODULES: StudyModuleItem[] = [
  {
    id: 'mod_1',
    moduleNumber: 1,
    titleHindi: 'वर्णमाला एवं देवनागरी लिपि परिचय (Devanagari Alphabets & Script)',
    titleEng: 'Introduction to Devanagari Script, Vowels & Phonetic Rules',
    pages: 42,
    fileSize: '4.2 MB',
    author: 'National Faculty • LMS & Kendriya Hindi Sansthan',
    badge: 'Core Foundation'
  },
  {
    id: 'mod_2',
    moduleNumber: 2,
    titleHindi: 'हिंदी व्याकरण एवं पद परिचय (Hindi Grammar & SOV Structure)',
    titleEng: 'SOV Sentence Order, Nouns, Pronouns, Verbs & Tenses',
    pages: 58,
    fileSize: '5.8 MB',
    author: 'Samskrit & Hindi Promotion Foundation',
    badge: 'Essential Grammar'
  },
  {
    id: 'mod_3',
    moduleNumber: 3,
    titleHindi: 'दैनिक व्यावहारिक शब्दावली (Everyday Vocabulary & Dialogues)',
    titleEng: 'High-Frequency Vocabulary, Expressions & Polite Dialogues',
    pages: 36,
    fileSize: '3.6 MB',
    author: 'Central Institute of Indian Languages (CIIL)',
    badge: 'Conversational'
  },
  {
    id: 'mod_4',
    moduleNumber: 4,
    titleHindi: 'लेखन अभ्यास एवं वर्तनी शुद्धि (Writing Practice & Spelling Rules)',
    titleEng: 'Devanagari Handwriting Drills & Common Spelling Corrections',
    pages: 48,
    fileSize: '4.9 MB',
    author: 'National Curriculum Expert Committee',
    badge: 'Handwriting'
  },
  {
    id: 'mod_5',
    moduleNumber: 5,
    titleHindi: 'श्रवण व मौखिक परीक्षा मार्गदर्शिका (Listening & Speaking Exam Guide)',
    titleEng: 'Audio Comprehension Drills & Oral Speaking Evaluation Guide',
    pages: 32,
    fileSize: '3.1 MB',
    author: 'AI & Educational Technology Board',
    badge: 'Exam Prep'
  },
  {
    id: 'mod_6',
    moduleNumber: 6,
    titleHindi: 'क्षेत्रीय भाषाओं से तुलनात्मक पुल (Cognate Vocabulary Bridge Guide)',
    titleEng: 'Dravidian & Indo-Aryan Vocabulary Comparison Tables',
    pages: 64,
    fileSize: '6.5 MB',
    author: 'Bhasha Sangam & Rastriya Bhasha Samiti',
    badge: 'Cognate Bridge'
  },
  {
    id: 'mod_7',
    moduleNumber: 7,
    titleHindi: 'माध्यमिक एवं उच्चतर माध्यमिक मॉडल (Class 10/12 Model Exam Papers)',
    titleEng: 'LMS Class 10 & 12 Previous Year Solved Model Question Papers',
    pages: 80,
    fileSize: '8.2 MB',
    author: 'Board of Secondary & Higher Secondary Education',
    badge: 'Board Papers'
  },
  {
    id: 'mod_8',
    moduleNumber: 8,
    titleHindi: 'साहित्यिक निबंध व पत्र लेखन (Official Essays & Correspondence)',
    titleEng: 'Formal Letter Formats, Essay Outlines & Administrative Hindi',
    pages: 50,
    fileSize: '5.1 MB',
    author: 'Department of Official Language (Rajbhasha)',
    badge: 'Rajbhasha Hindi'
  }
];

export default function DashboardGuidedLearningPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const handleDownloadMaterial = (module: StudyModuleItem) => {
    setDownloadingId(module.id);
    setTimeout(() => {
      setDownloadingId(null);
      alert(`📥 Study Material Module ${module.moduleNumber} ("${module.titleEng}") downloaded successfully!`);
    }, 1200);
  };

  const filteredModules = GUIDED_STUDY_MODULES.filter((m) => {
    return (
      m.titleHindi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.titleEng.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.author.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-20 text-left">
      {/* HERO BIDIRECTIONAL CONTROL BANNER */}
      <div className="p-6 sm:p-8 rounded-sm bg-gradient-to-r from-[#0B3D91] via-[#082C6C] to-[#051C45] text-white border border-[#082C6C] border-l-4 border-[#FF9933] shadow-md space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-black uppercase tracking-wider border border-amber-400/30">
                📖 GUIDED STUDY MATERIALS & OFFICIAL NIOS INFOGRAPHICS
              </span>
              <span className="px-3 py-1 rounded-full bg-blue-400/20 text-blue-200 text-[10px] font-bold border border-blue-400/30">
                100% Free Government Accredited PDFs
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              गाइडेड लर्निंग एवं आधिकारिक अध्ययन सामग्री पुस्तकालय
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
              Comprehensive self-learning course notes, NIOS textbooks, grammar presentations, cognate dictionaries, and model board exam question papers curated by national faculty.
            </p>
          </div>

          <div className="relative w-full sm:w-72 shrink-0">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search study materials, authors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-sm bg-[#051C45] border border-slate-600 text-white text-xs font-semibold focus:outline-none focus:border-[#FF9933]"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-700/60 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2 text-amber-300 font-extrabold">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Curated by Kendriya Hindi Sansthan, CIIL & Department of Official Language</span>
          </div>
          <span className="text-slate-300 text-[11px] font-semibold">
            High-Resolution Print-Ready PDF Downloads
          </span>
        </div>
      </div>

      {/* Main Layout: Left Sidebar Feature Poster Card & Right Modules List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side Feature Card */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-gradient-to-br from-[#0B3D91] via-[#082C6C] to-slate-950 text-white rounded-sm p-6 sm:p-8 shadow-xl space-y-6 text-center border border-[#082C6C] relative overflow-hidden">
            {/* Logo Badge */}
            <div className="w-20 h-20 mx-auto rounded-sm bg-white p-2 flex items-center justify-center shadow-md">
              <div className="text-center">
                <span className="font-black text-[#0B3D91] text-xl block leading-none">LMS</span>
                <span className="text-[8px] font-bold text-slate-600 block uppercase mt-0.5">National Institute</span>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase text-amber-300 tracking-widest block">
                DIGITAL LEARNING MODULE
              </span>
              <h2 className="text-xl font-extrabold text-white tracking-tight leading-snug">
                HINDI & INDIAN LANGUAGES <br /> DIGITAL STUDY LIBRARY
              </h2>
              <span className="text-[10px] text-slate-300 uppercase font-bold block pt-1">
                PREPARED BY: SAMSKRIT & HINDI PROMOTION FOUNDATION
              </span>
            </div>

            <div className="pt-4 border-t border-slate-800 space-y-2 text-left">
              <h3 className="text-base font-black text-white text-center">Study Material Library</h3>
              <p className="text-[11px] text-slate-300 leading-relaxed text-center font-medium">
                ACCESS COMPREHENSIVE COURSE NOTES, PRESENTATIONS, AND RESEARCH PAPERS CURATED BY NATIONAL FACULTY.
              </p>
            </div>
          </div>

          {/* Reading Guide Bottom Box */}
          <div className="bg-white text-slate-900 rounded-sm p-6 shadow-xs border border-[#DCE2E6] flex items-center gap-3">
            <div className="w-10 h-10 rounded-sm bg-[#EEF3F8] text-[#0B3D91] flex items-center justify-center shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-900">READING GUIDE & SYLLABUS</h4>
              <p className="text-[11px] text-slate-500 font-medium">Click any module to download high-resolution PDF</p>
            </div>
          </div>
        </div>

        {/* Right Side Modules Cards */}
        <div className="lg:col-span-8 space-y-4">
          {filteredModules.map((item) => (
            <div
              key={item.id}
              className="p-5 sm:p-6 bg-white rounded-sm border border-[#DCE2E6] shadow-xs hover:shadow-md transition-all duration-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-sm bg-slate-100 border border-slate-200 text-slate-500 flex items-center justify-center shrink-0 group-hover:bg-[#EEF3F8] group-hover:text-[#0B3D91] transition">
                  <FileText className="w-6 h-6" />
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                      MODULE {item.moduleNumber}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-blue-50 text-[#0B3D91] font-extrabold text-[9px] uppercase border border-blue-200">
                      {item.badge}
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-base font-extrabold text-slate-900 group-hover:text-[#0B3D91] transition">
                    {item.titleHindi}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">{item.titleEng}</p>
                  <span className="text-[10px] text-slate-400 block pt-0.5">{item.author} • {item.pages} Pages ({item.fileSize})</span>
                </div>
              </div>

              {/* Download Pill Button */}
              <button
                onClick={() => handleDownloadMaterial(item)}
                disabled={downloadingId === item.id}
                className="px-6 py-3 rounded-sm bg-[#0B3D91] hover:bg-[#082C6C] text-white font-extrabold text-xs uppercase tracking-wider shadow-md flex items-center gap-2 transition hover:scale-105 shrink-0 self-end sm:self-center disabled:opacity-50"
              >
                {downloadingId === item.id ? (
                  'Downloading...'
                ) : (
                  <>
                    STUDY MATERIAL <Download className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
