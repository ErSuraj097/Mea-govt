'use client';

import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  Download,
  FileText,
  Bookmark,
  CheckCircle2,
  Sparkles,
  Eye,
  X,
  Printer,
  Globe,
  Volume2,
  Sliders,
  Award,
  Layers,
  ArrowRight
} from 'lucide-react';

interface LibraryBook {
  id: string;
  title: string;
  subtitle: string;
  author: string;
  track: 'trackA' | 'trackB'; // Track A = Foreigners learning Indian, Track B = Indians learning Foreign
  language: string;
  category: 'Grammar Reference' | 'Classical Literature' | 'Audiobooks' | 'Dictionaries' | 'Folk Stories' | 'Diplomatic Manuals';
  pages: number;
  fileSize: string;
  downloadCount: number;
  previewExcerpt: string;
}

const EXTENDED_LIBRARY: LibraryBook[] = [
  // TRACK A: Indian Languages (22 Scheduled Bhashas)
  {
    id: 'b1',
    title: 'Standard Modern Hindi Grammar & Composition Handbook',
    subtitle: 'Comprehensive guide to SOV word order, Devanagari ligatures & verb roots',
    author: 'Kendriya Hindi Sansthan Publishing Wing',
    track: 'trackA',
    language: 'Hindi',
    category: 'Grammar Reference',
    pages: 340,
    fileSize: '14.2 MB PDF',
    downloadCount: 18400,
    previewExcerpt: 'Chapter 1: SOV word order syntax, Devanagari ligatures, compound consonants (Sanyukt Akshar), and transitive verb conjugations.'
  },
  {
    id: 'b2',
    title: 'Munshi Premchand Classic Stories Anthology',
    subtitle: 'Godan, Gaban, Idgah & Panch Parmeshwar with English parallel text',
    author: 'Munshi Premchand / MEA Cultural Board',
    track: 'trackA',
    language: 'Hindi',
    category: 'Classical Literature',
    pages: 420,
    fileSize: '18.5 MB PDF',
    downloadCount: 24100,
    previewExcerpt: 'Complete anthology featuring line-by-line Devanagari prose and Roman transliteration for international literature scholars.'
  },
  {
    id: 'b3',
    title: '22 Scheduled Indian Languages Dictionary & Cognate Lexicon',
    subtitle: 'Comparative lexicon mapping 5,000 root words across Indian scripts',
    author: 'Central Institute of Indian Languages (CIIL Mysuru)',
    track: 'trackA',
    language: 'Multi-Bhasha',
    category: 'Dictionaries',
    pages: 650,
    fileSize: '32.1 MB PDF',
    downloadCount: 15200,
    previewExcerpt: 'Comprehensive comparative dictionary connecting Devanagari, Tamil, Telugu, Bengali, Gujarati, Odia, and Sanskrit vocabulary.'
  },
  {
    id: 'b4',
    title: 'Panchatantra Wisdom Tales in Sanskrit & Parallel English',
    subtitle: 'Authentic fables with side-by-side Sanskrit slokas & Roman phonetics',
    author: 'Vishnu Sharma / MEA Cultural Desk',
    track: 'trackA',
    language: 'Sanskrit',
    category: 'Folk Stories',
    pages: 210,
    fileSize: '9.8 MB PDF',
    downloadCount: 19800,
    previewExcerpt: 'Authentic Panchatantra wisdom tales featuring side-by-side Sanskrit slokas, English prose, and audio pronunciation guides.'
  },
  {
    id: 'b5',
    title: 'Tamil Cognates & Dravidian Grammar Foundation',
    subtitle: 'Bridge manual connecting Tamil prefixes, suffixes, and SOV structure',
    author: 'CIIL Dravidian Linguistics Department',
    track: 'trackA',
    language: 'Tamil',
    category: 'Grammar Reference',
    pages: 280,
    fileSize: '12.4 MB PDF',
    downloadCount: 11400,
    previewExcerpt: 'Comprehensive introduction to Tamil script, Tirukkural ethics, and shared Dravidian-Indo-Aryan grammatical patterns.'
  },

  // TRACK B: Foreign Languages (15 International Languages)
  {
    id: 'b6',
    title: 'French Diplomatic & Commercial Masterclass Handbook',
    subtitle: 'CEFR B1-C1 French grammar, formal correspondence & conversation',
    author: 'Alliance Française & MEA Foreign Service Training',
    track: 'trackB',
    language: 'French',
    category: 'Diplomatic Manuals',
    pages: 310,
    fileSize: '16.8 MB PDF',
    downloadCount: 21300,
    previewExcerpt: 'Chapter 1: Subject-Verb-Object structures, formal salutations (Cher Monsieur), subjunctive moods, and treaty translation exercises.'
  },
  {
    id: 'b7',
    title: 'Goethe-Zertifikat German Grammar & Technical Lexicon',
    subtitle: 'Essential German word order (V2 rule), noun genders & case systems',
    author: 'Goethe-Institut Academic Desk',
    track: 'trackB',
    language: 'German',
    category: 'Grammar Reference',
    pages: 380,
    fileSize: '19.2 MB PDF',
    downloadCount: 17800,
    previewExcerpt: 'Master German nominative, accusative, dative, and genitive case declensions alongside technical vocabulary for engineers and scholars.'
  },
  {
    id: 'b8',
    title: 'DELE Spanish Conversation & Trade Dictionary',
    subtitle: 'Castilian & Latin American Spanish idioms, business verbs & phrases',
    author: 'Instituto Cervantes Academic Division',
    track: 'trackB',
    language: 'Spanish',
    category: 'Dictionaries',
    pages: 290,
    fileSize: '13.5 MB PDF',
    downloadCount: 16500,
    previewExcerpt: 'Essential guide covering Spanish verb conjugations, regional accents in Latin America, and international trade terminology.'
  },
  {
    id: 'b9',
    title: 'JLPT N5-N3 Japanese Kanji & Script Reader',
    subtitle: 'Hiragana, Katakana, Kanji strokes & polite keigo conversation',
    author: 'Japan Foundation & MEA East Asia Desk',
    track: 'trackB',
    language: 'Japanese',
    category: 'Grammar Reference',
    pages: 360,
    fileSize: '22.1 MB PDF',
    downloadCount: 14900,
    previewExcerpt: 'Step-by-step stroke orders for 500 essential Kanji, Hiragana syllabary chart, and formal business greetings (Keigo).'
  }
];

export default function DashboardLibraryPage() {
  const [activeTrack, setActiveTrack] = useState<'all' | 'trackA' | 'trackB'>('all');
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [readingBook, setReadingBook] = useState<LibraryBook | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const languagesList = ['All', 'Hindi', 'Sanskrit', 'Tamil', 'Multi-Bhasha', 'French', 'German', 'Spanish', 'Japanese'];

  const filteredBooks = EXTENDED_LIBRARY.filter((book) => {
    const matchesTrack = activeTrack === 'all' || book.track === activeTrack;
    const matchesLang = selectedLanguage === 'All' || book.language === selectedLanguage;
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.language.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTrack && matchesLang && matchesSearch;
  });

  const handleSpeakText = (text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(true);
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'en-US';
      u.onend = () => setIsSpeaking(false);
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
              <BookOpen className="w-3.5 h-3.5" /> CENTRAL BHASHA DIGITAL LIBRARY
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
              Central Digital Library
            </h1>
            <p className="text-xs text-blue-100 font-medium max-w-2xl">
              Access high-resolution PDF textbooks, grammar reference manuals, classical literature archives, and dictionaries published by the Ministry of External Affairs & CIIL.
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search title, author or language..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-semibold placeholder:text-blue-200 focus:outline-none focus:ring-2 focus:ring-[#FF9933]"
            />
          </div>
        </div>

        {/* Track Selector & Language Pills Toolbar */}
        <div className="space-y-3 relative z-10 pt-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-extrabold text-blue-200 uppercase tracking-wider mr-2">Learning Track:</span>
            <button
              onClick={() => setActiveTrack('all')}
              className={`px-4 py-2 rounded-xl font-extrabold text-xs transition ${
                activeTrack === 'all' ? 'bg-[#FF9933] text-[#212121] shadow-md' : 'bg-white/10 text-white hover:bg-white/20 border border-white/15'
              }`}
            >
              🌟 All Tracks (9 Archives)
            </button>
            <button
              onClick={() => setActiveTrack('trackA')}
              className={`px-4 py-2 rounded-xl font-extrabold text-xs transition ${
                activeTrack === 'trackA' ? 'bg-[#FF9933] text-[#212121] shadow-md' : 'bg-white/10 text-white hover:bg-white/20 border border-white/15'
              }`}
            >
              🇮🇳 Track A: Foreigners ➔ 22 Indian Languages
            </button>
            <button
              onClick={() => setActiveTrack('trackB')}
              className={`px-4 py-2 rounded-xl font-extrabold text-xs transition ${
                activeTrack === 'trackB' ? 'bg-[#FF9933] text-[#212121] shadow-md' : 'bg-white/10 text-white hover:bg-white/20 border border-white/15'
              }`}
            >
              🌐 Track B: Indians ➔ 15 Foreign Languages
            </button>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <Globe className="w-4 h-4 text-[#FF9933] shrink-0" />
            <span className="text-xs font-bold text-blue-100 shrink-0">Filter Language:</span>
            {languagesList.map((lang) => (
              <button
                key={lang}
                onClick={() => setSelectedLanguage(lang)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition shrink-0 ${
                  selectedLanguage === lang
                    ? 'bg-white text-[#0B3D91] shadow-sm font-extrabold'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* BOOKS CATALOG GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredBooks.map((book) => (
          <div
            key={book.id}
            className="bg-white rounded-3xl border border-[#DCE2E6] p-6 space-y-5 shadow-2xs hover:shadow-xl transition duration-300 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-[#EEF3F8] text-[#0B3D91] text-[10px] font-black uppercase">
                  {book.category} • {book.language}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-extrabold">
                  {book.track === 'trackA' ? '🇮🇳 Track A' : '🌐 Track B'}
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="text-lg font-black text-[#1B2A4A] leading-snug">{book.title}</h3>
                <p className="text-xs font-bold text-[#0B3D91]">{book.subtitle}</p>
                <p className="text-[11px] font-medium text-slate-400">Author: {book.author} • {book.pages} Pages</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#F8FAFC] border border-[#DCE2E6] space-y-1 text-xs">
                <span className="text-[10px] font-black uppercase text-[#0B3D91]">CHAPTER EXCERPT PREVIEW:</span>
                <p className="text-slate-700 font-medium leading-snug">{book.previewExcerpt}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3 mt-auto">
              <span className="text-[11px] font-bold text-slate-500">{book.downloadCount.toLocaleString()} Downloads</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setReadingBook(book)}
                  className="px-4 py-2 rounded-xl bg-[#EEF3F8] hover:bg-[#0B3D91] text-[#0B3D91] hover:text-white font-bold text-xs transition flex items-center gap-1"
                >
                  <Eye className="w-4 h-4" /> Read Online
                </button>
                <button
                  onClick={() => alert(`📥 DOWNLOADING HIGH-RES PDF:\n\nTitle: ${book.title}\nLanguage: ${book.language}\nFile Size: ${book.fileSize}`)}
                  className="px-4 py-2 rounded-xl bg-[#0B3D91] hover:bg-[#082C6C] text-white font-extrabold text-xs shadow-md transition flex items-center gap-1"
                >
                  <Download className="w-4 h-4 text-[#FF9933]" /> PDF ({book.fileSize})
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* INTERACTIVE ONLINE READER MODAL */}
      {readingBook && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-3xl bg-white border border-[#DCE2E6] rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200 text-left my-6">
            <div className="flex items-center justify-between border-b border-[#DCE2E6] pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#EEF3F8] text-[#0B3D91] flex items-center justify-center font-bold">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase text-[#0B3D91]">
                    ONLINE E-BOOK READER • {readingBook.language}
                  </span>
                  <h3 className="font-black text-lg text-[#1B2A4A]">{readingBook.title}</h3>
                </div>
              </div>
              <button onClick={() => setReadingBook(null)} className="p-2 rounded-xl hover:bg-slate-100 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-[#DCE2E6] space-y-4 max-h-96 overflow-y-auto font-serif text-sm leading-relaxed text-slate-800">
              <div className="text-center space-y-1 pb-4 border-b border-slate-200 font-sans">
                <span className="text-[10px] font-black uppercase text-[#0B3D91]">MINISTRY PUBLIC LIBRARY ARCHIVE</span>
                <h4 className="text-xl font-bold text-[#1B2A4A]">{readingBook.title}</h4>
                <p className="text-xs text-slate-500">Author: {readingBook.author} • {readingBook.pages} Pages • {readingBook.fileSize}</p>
              </div>

              <p>
                <strong>Chapter 1: Linguistic Overview & Sentence Structure</strong><br />
                {readingBook.previewExcerpt}
              </p>

              <p>
                <strong>Core Pedagogical Rule:</strong><br />
                Consistent practice with audio pronunciation, sentence syntax, and daily vocabulary drills ensures rapid CEFR milestone achievement.
              </p>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => handleSpeakText(readingBook.previewExcerpt)}
                className="px-4 py-2 rounded-xl bg-[#EEF3F8] hover:bg-[#0B3D91] text-[#0B3D91] hover:text-white font-bold text-xs flex items-center gap-1.5 transition"
              >
                <Volume2 className="w-4 h-4 text-[#FF9933]" /> {isSpeaking ? 'Reading Audio...' : 'Listen to Audio Excerpt'}
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => alert('🖨️ Printing textbook chapter...')}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5"
                >
                  <Printer className="w-4 h-4" /> Print Chapter
                </button>
                <button
                  onClick={() => {
                    alert(`📥 Download started for ${readingBook.title}`);
                    setReadingBook(null);
                  }}
                  className="px-6 py-2 rounded-xl bg-[#0B3D91] hover:bg-[#082C6C] text-white font-extrabold text-xs shadow-md flex items-center gap-1.5"
                >
                  <Download className="w-4 h-4 text-[#FF9933]" /> Download Full PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
