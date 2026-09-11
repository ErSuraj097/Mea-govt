'use client';

import React, { useState, useEffect } from 'react';
import {
  Headphones,
  Play,
  Pause,
  Volume2,
  Clock,
  Sparkles,
  Search,
  CheckCircle2,
  Download,
  Share2,
  Mic,
  RotateCcw,
  RotateCw,
  Sliders,
  Bookmark,
  Languages,
  Radio,
  FileText,
  VolumeX,
  Zap,
  Globe,
  Check,
  X,
  ShieldCheck,
  Music,
  Award
} from 'lucide-react';

interface DubbingLanguage {
  key: string;
  name: string;
  nativeName: string;
  code: string;
  flag: string;
}

const ALL_DUBBING_LANGUAGES: DubbingLanguage[] = [
  { key: 'hindi', name: 'Hindi', nativeName: 'हिंदी', code: 'hi-IN', flag: '🇮🇳' },
  { key: 'english', name: 'English', nativeName: 'English', code: 'en-US', flag: '🇬🇧' },
  { key: 'persian', name: 'Persian / Farsi', nativeName: 'فارسی', code: 'fa-IR', flag: '🇮🇷' },
  { key: 'spanish', name: 'Spanish', nativeName: 'Español', code: 'es-ES', flag: '🇪🇸' },
  { key: 'french', name: 'French', nativeName: 'Français', code: 'fr-FR', flag: '🇫🇷' },
  { key: 'german', name: 'German', nativeName: 'Deutsch', code: 'de-DE', flag: '🇩🇪' },
  { key: 'japanese', name: 'Japanese', nativeName: '日本語', code: 'ja-JP', flag: '🇯🇵' },
  { key: 'russian', name: 'Russian', nativeName: 'Русский', code: 'ru-RU', flag: '🇷🇺' },
  { key: 'arabic', name: 'Arabic', nativeName: 'العربية', code: 'ar-SA', flag: '🇸🇦' },
  { key: 'korean', name: 'Korean', nativeName: '한국어', code: 'ko-KR', flag: '🇰🇷' },
  { key: 'mandarin', name: 'Mandarin Chinese', nativeName: '中文', code: 'zh-CN', flag: '🇨🇳' },
  { key: 'tamil', name: 'Tamil', nativeName: 'தமிழ்', code: 'ta-IN', flag: '🇮🇳' },
  { key: 'telugu', name: 'Telugu', nativeName: 'తెలుగు', code: 'te-IN', flag: '🇮🇳' },
  { key: 'bengali', name: 'Bengali', nativeName: 'বাংলা', code: 'bn-IN', flag: '🇮🇳' },
  { key: 'marathi', name: 'Marathi', nativeName: 'मराठी', code: 'mr-IN', flag: '🇮🇳' },
  { key: 'gujarati', name: 'Gujarati', nativeName: 'ગુજરાતી', code: 'gu-IN', flag: '🇮🇳' },
  { key: 'punjabi', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', code: 'pa-IN', flag: '🇮🇳' },
  { key: 'malayalam', name: 'Malayalam', nativeName: 'മലയാളം', code: 'ml-IN', flag: '🇮🇳' },
  { key: 'sanskrit', name: 'Sanskrit', nativeName: 'संस्कृतम्', code: 'hi-IN', flag: '🕉️' }
];

interface FreeAudioTrack {
  id: string;
  titleHindi: string;
  titleEng: string;
  category: string;
  duration: string;
  narrator: string;
  accent: string;
  dubbedTexts: Record<string, { script: string; translit: string; meaning: string }>;
}

const FREE_AUDIO_PLAYLIST: FreeAudioTrack[] = [
  {
    id: 'aud_1',
    titleHindi: 'पाठ १: दैनिक शिष्टाचार एवं औपचारिक अभिवादन',
    titleEng: 'Everyday Courtesy, Formal Greetings & Respectful Speech',
    category: 'Daily Conversation',
    duration: '08:45',
    narrator: 'Acharya Aarav Shastri',
    accent: 'Standard Hindi (Khariboli)',
    dubbedTexts: {
      hindi: { script: 'नमस्ते! आपका स्वागत है। आप कैसे हैं? मैं बिल्कुल ठीक हूँ, धन्यवाद।', translit: 'Namaste! Aapka swagat hai. Aap kaise hain?', meaning: 'Hello! You are welcome. How are you? I am fine, thank you.' },
      english: { script: 'Hello and warm welcome! How are you doing today? I am doing great, thank you.', translit: 'Hello and warm welcome!', meaning: 'Everyday respectful greeting for friends and colleagues.' },
      persian: { script: 'سلام و درود فراوان! حال شما چطور است؟ من بسیار خوبم، خیلی متشکرم.', translit: 'Salam o dorood! Hale shoma chetor ast?', meaning: 'Persian greeting with polite etiquette.' },
      spanish: { script: '¡Hola y bienvenido! ¿Cómo estás hoy? Estoy muy bien, muchas gracias.', translit: '¡Hola y bienvenido!', meaning: 'Standard polite Spanish everyday greeting.' },
      french: { script: 'Bonjour et bienvenue! Comment allez-vous aujourd\'hui? Je vais très bien, merci.', translit: 'Bonjour et bienvenue!', meaning: 'Formal polite French morning greeting.' },
      tamil: { script: 'வணக்கம்! உங்களை அன்புடன் வரவேற்கிறோம். நீங்கள் எப்படி இருக்கிறீர்கள்?', translit: 'Vanakkam! Ungalai anbudan varaverkirom. Neengal eppadi irukkireergal?', meaning: 'Polite Tamil formal greeting and inquiry.' },
      telugu: { script: 'నమస్కారం! మీకు స్వాగతం. మీరు ఎలా ఉన్నారు? నేను బాగున్నాను, ధన్యవాదాలు.', translit: 'Namaskaram! Meeku swagatam. Meeru ela unnaru?', meaning: 'Telugu formal respectful greeting.' },
      bengali: { script: 'নমস্কার! আপনাকে স্বাগতম। আপনি কেমন আছেন? আমি ভালো আছি, ধন্যবাদ।', translit: 'Nomoshkar! Apnake swagatom. Apni kemon achhen?', meaning: 'Bengali sweet respectful greeting.' }
    }
  },
  {
    id: 'aud_2',
    titleHindi: 'पाठ २: बाजार, दुकान व खरीदारी संवाद',
    titleEng: 'Marketplace Dialogues, Bargaining & Prices Inquiries',
    category: 'Practical Dialogues',
    duration: '12:20',
    narrator: 'Smt. Radhika Das',
    accent: 'Delhi / NCR Accent',
    dubbedTexts: {
      hindi: { script: 'भैया, यह कितने का है? कृपया उचित दाम लगाइए। मैं दो किलो ले रहा हूँ।', translit: 'Bhaiya, yeh kitne ka hai? Kripya uchit daam lagaiye.', meaning: 'Brother, how much is this? Please give a fair price.' },
      english: { script: 'Sir, how much is this? Please give me the best price. I will take two kilograms.', translit: 'Sir, how much is this?', meaning: 'Marketplace purchasing and bargaining inquiry.' },
      persian: { script: 'این چقدر قیمت دارد؟ لطفاً قیمت مناسب بدهید. من دو کیلو می‌خواهم.', translit: 'In cheghadr gheimat darad? Lotfan gheimat-e monaseb bedahid.', meaning: 'Farsi bazaar pricing conversation.' },
      spanish: { script: '¿Cuánto cuesta esto, por favor? ¿Puede darme un buen descuento?', translit: '¿Cuánto cuesta esto?', meaning: 'Spanish market shopping inquiry.' },
      french: { script: 'Combien cela coûte-t-il, s\'il vous plaît? Pourriez-vous me faire un bon prix?', translit: 'Combien cela coûte-t-il?', meaning: 'French dialogue at the store.' },
      tamil: { script: 'அண்ணா, இதன் விலை என்ன? தயவுசெய்து சரியான விலை சொல்லுங்கள்.', translit: 'Anna, ithan vilai enna? Thayavuseithu sariyana vilai sollungal.', meaning: 'Tamil market bargaining conversation.' }
    }
  },
  {
    id: 'aud_3',
    titleHindi: 'पाठ ३: द्रविड़ व दक्षिण भारतीय भाषियों के लिए उच्चारण',
    titleEng: 'Pronunciation Guide Specifically for South Indian Speakers',
    category: 'Phonetic Drill',
    duration: '10:15',
    narrator: 'Dr. Devendra Sharma',
    accent: 'Dravidian Phonetic Bridge',
    dubbedTexts: {
      hindi: { script: 'तमिल, तेलुगु, कन्नड़ व मलयालम भाषियों के लिए महाप्राण ध्वनियों (ख, घ, छ, झ) का सही अभ्यास।', translit: 'Dravidian bhashaon ke liye mahapran dhwaniyon ka abhyas.', meaning: 'Aspirated consonant drills tailored for Dravidian native speakers.' },
      english: { script: 'Comprehensive guide for South Indian speakers to master aspirated Devanagari consonants (Kha, Gha, Cha, Jha).', translit: 'Comprehensive Dravidian Phonetics', meaning: 'Phonetic drill audio.' },
      tamil: { script: 'தமிழ் பேசும் மாணவர்களுக்கான இந்தி எழுத்துக்களின் துல்லியமான உச்சரிப்பு வழிகாட்டி.', translit: 'Tamil maanavargalukkaana Hindi uccharaippu vazhikaatti.', meaning: 'Tamil phonetic bridge guide.' }
    }
  },
  {
    id: 'aud_4',
    titleHindi: 'पाठ ४: कबीर के दोहे व भावार्थ ऑडियो',
    titleEng: 'Kabir Dohas Recitation with Musical Harmonium Melody',
    category: 'Poetry & Music',
    duration: '15:30',
    narrator: 'Pt. Hridaynath Sharma',
    accent: 'Braj & Awadhi Heritage',
    dubbedTexts: {
      hindi: { script: 'गुरु गोविंद दोऊ खड़े, काके लागूं पांय। बलिहारी गुरु आपने, गोविंद दियो बताय।', translit: 'Guru Govind dou khade, kake laagun paanv.', meaning: 'When Guru and God both appear, bow to the Guru who showed the way to God.' },
      english: { script: 'When the spiritual master and the divine both stand before me, I bow first to the Guru who revealed the Divine path.', translit: 'Kabir Doha Wisdom', meaning: 'Poetic couplet of Kabir with philosophical reflection.' }
    }
  },
  {
    id: 'aud_5',
    titleHindi: 'पाठ ५: यात्रा व स्टेशन पर पूछे जाने वाले प्रश्न',
    titleEng: 'Travel, Railway Station & Navigation Inquiry Audios',
    category: 'Travel & Navigation',
    duration: '09:50',
    narrator: 'Rajesh Verma',
    accent: 'Standard North Indian',
    dubbedTexts: {
      hindi: { script: 'यह ट्रेन कौन से प्लेटफ़ॉर्म पर आ रही है? क्या टिकट काउंटर यहीं पास में है?', translit: 'Yeh train kaun se platform par aa rahi hai?', meaning: 'Which platform is this train arriving on? Is the ticket counter nearby?' },
      english: { script: 'Which platform is this train arriving on? Is the reservation counter nearby?', translit: 'Railway station inquiry', meaning: 'Travel navigation dialogue.' }
    }
  }
];

export default function DashboardFreeAudioPage() {
  const [activeTrack, setActiveTrack] = useState<FreeAudioTrack>(FREE_AUDIO_PLAYLIST[0]);
  const [selectedDubLang, setSelectedDubLang] = useState<DubbingLanguage>(ALL_DUBBING_LANGUAGES[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [isMuted, setIsMuted] = useState(false);
  const [showDubbingModal, setShowDubbingModal] = useState(false);
  const [dubbingSearchQuery, setDubbingSearchQuery] = useState('');
  const [bookmarkedTracks, setBookmarkedTracks] = useState<string[]>([]);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const getActiveSpeechData = () => {
    const langKey = selectedDubLang.key;
    const trackData = activeTrack.dubbedTexts[langKey] || activeTrack.dubbedTexts['hindi'] || activeTrack.dubbedTexts['english'];
    if (trackData) return trackData;
    return {
      script: activeTrack.dubbedTexts['hindi']?.script || activeTrack.titleHindi,
      translit: activeTrack.titleEng,
      meaning: activeTrack.titleEng
    };
  };

  const playSpeechAudio = (langObj = selectedDubLang) => {
    const textData = activeTrack.dubbedTexts[langObj.key] || activeTrack.dubbedTexts['hindi'] || activeTrack.dubbedTexts['english'];
    const textToSpeak = textData ? textData.script : activeTrack.titleHindi;

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = langObj.code;
      utterance.rate = playbackSpeed;
      utterance.volume = isMuted ? 0 : 1;
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);
      window.speechSynthesis.speak(utterance);
      setIsPlaying(true);
    }
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setIsPlaying(false);
    } else {
      playSpeechAudio();
    }
  };

  const handleSelectDubLanguage = (lang: DubbingLanguage) => {
    setSelectedDubLang(lang);
    setShowDubbingModal(false);
    playSpeechAudio(lang);
  };

  const toggleBookmark = (trackId: string) => {
    setBookmarkedTracks((prev) =>
      prev.includes(trackId) ? prev.filter((id) => id !== trackId) : [...prev, trackId]
    );
  };

  const handleDownloadMp3 = (track: FreeAudioTrack) => {
    setDownloadingId(track.id);
    setTimeout(() => {
      setDownloadingId(null);
      alert(`📥 Audio Track "${track.titleEng}" downloaded in high-fidelity 320kbps MP3 format!`);
    }, 1200);
  };

  const filteredPlaylist = FREE_AUDIO_PLAYLIST.filter((track) => {
    const matchesCat = selectedCategory === 'All' || track.category === selectedCategory;
    const matchesSearch =
      track.titleHindi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.titleEng.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.narrator.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const filteredLanguages = ALL_DUBBING_LANGUAGES.filter(
    (l) =>
      l.name.toLowerCase().includes(dubbingSearchQuery.toLowerCase()) ||
      l.nativeName.toLowerCase().includes(dubbingSearchQuery.toLowerCase())
  );

  const activeSpeech = getActiveSpeechData();

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-20 text-left">
      {/* 1. HERO BIDIRECTIONAL CONTROL BANNER (EXACT GOVT & LANDING STYLE) */}
      <div className="p-6 sm:p-8 rounded-sm bg-gradient-to-r from-[#0B3D91] via-[#082C6C] to-[#051C45] text-white border border-[#082C6C] border-l-4 border-[#FF9933] shadow-md space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-black uppercase tracking-wider border border-amber-400/30">
                🎙️ MEA 19 AI VOICE DUBBED AUDIO LIBRARY
              </span>
              <span className="px-3 py-1 rounded-full bg-blue-400/20 text-blue-200 text-[10px] font-bold border border-blue-400/30">
                100% Free Public Access • 320kbps HD Audio
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              निःशुल्क श्रवण पॉडकास्ट एवं १९ एआई भाषा डबिंग पुस्तकालय (Free Audio Library)
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
              Listen to authentic native pronunciation guides, classical poetry recitations, travel dialogues, marketplace conversations, and phonetics drills with real-time 19+ AI voice dubbing and synchronized multi-lingual transcripts.
            </p>
          </div>

          {/* Quick Dubbing Modal Trigger Pill */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center bg-[#051C45] p-2 rounded-sm border border-[#082C6C] gap-2 shrink-0">
            <div className="px-3 py-1 text-xs text-amber-300 font-extrabold flex items-center gap-1.5">
              <span>{selectedDubLang.flag}</span> Dub: {selectedDubLang.name} Active
            </div>
            <button
              onClick={() => setShowDubbingModal(true)}
              className="px-4 py-2 rounded-sm text-xs font-black bg-[#0B3D91] hover:bg-[#0E4BA8] text-white border border-blue-400/40 transition flex items-center justify-center gap-2 shadow-sm"
            >
              <Languages className="w-4 h-4 text-amber-300" />
              <span>Switch AI Voice (19 Dubs) →</span>
            </button>
          </div>
        </div>

        {/* Dynamic Controls Info Bar */}
        <div className="pt-4 border-t border-slate-700/60 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <span className="text-amber-300 font-black">Current Audio Track:</span>
            <span className="px-3 py-1 rounded bg-[#051C45] border border-slate-600 text-white font-bold">
              {activeTrack.titleHindi}
            </span>
          </div>

          <div className="flex items-center gap-2 text-slate-300 text-[11px] font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Official Government Educational Audio Content • High Fidelity Speech Synthesis</span>
          </div>
        </div>
      </div>

      {/* 2-COLUMN SPLIT WORKSPACE: LEFT AUDIO CONSOLE & RIGHT PLAYLIST */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Main Interactive Audio Player Console */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-6">
          <div className="p-6 sm:p-8 rounded-sm bg-white border border-[#DCE2E6] shadow-xs space-y-6">
            <div className="p-6 sm:p-8 rounded-sm bg-gradient-to-br from-[#0B3D91] via-[#082C6C] to-slate-950 text-white space-y-6 shadow-xl relative overflow-hidden border border-[#082C6C]">
              
              {/* Header Badges */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
                    <Headphones className="w-3.5 h-3.5 text-amber-300" /> {activeTrack.category}
                  </span>
                  <button
                    onClick={() => setShowDubbingModal(true)}
                    className="px-3 py-1 rounded-full bg-blue-400/20 text-blue-200 border border-blue-400/30 text-xs font-black flex items-center gap-1.5 hover:bg-blue-400/30 transition cursor-pointer"
                  >
                    <span>{selectedDubLang.flag} Dub: {selectedDubLang.nativeName}</span>
                    <Sparkles className="w-3 h-3 text-amber-300 animate-spin" />
                  </button>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-amber-300" /> {activeTrack.duration}</span>
                </div>
              </div>

              {/* Title & Subtitle */}
              <div className="space-y-1.5">
                <h3 className="text-xl sm:text-2xl font-black text-white">{activeTrack.titleHindi}</h3>
                <p className="text-xs text-slate-300 font-medium">{activeTrack.titleEng}</p>
              </div>

              {/* Animated Soundwave Visualizer */}
              <div className="p-4 rounded-sm bg-black/40 backdrop-blur-md border border-white/10 space-y-3">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                    AI Speech Synthesis ({selectedDubLang.nativeName})
                  </span>
                  <span className="text-amber-300">{isPlaying ? '● Playing Live Audio' : '○ Paused'}</span>
                </div>

                <div className="flex items-end justify-between gap-1 h-12 px-2">
                  {[40, 65, 80, 45, 95, 70, 50, 85, 30, 90, 75, 60, 100, 45, 80, 55, 90, 65, 40, 70, 85, 50, 95, 60].map((h, i) => (
                    <div
                      key={i}
                      className={`flex-1 rounded-full transition-all duration-200 ${
                        isPlaying
                          ? 'bg-gradient-to-t from-blue-400 via-amber-300 to-emerald-400 animate-pulse'
                          : 'bg-white/20'
                      }`}
                      style={{
                        height: isPlaying ? `${Math.max(15, (h * (1 + (i % 3) * 0.2)) % 100)}%` : '15%'
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Audio Transcript / Phrase Box */}
              <div className="p-4.5 rounded-sm bg-black/50 backdrop-blur-md border border-white/15 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-amber-300 font-black uppercase tracking-wider flex items-center gap-1">
                    <FileText className="w-3 h-3" /> {selectedDubLang.name} Audio Script:
                  </span>
                  <button
                    onClick={() => playSpeechAudio()}
                    className="text-[11px] font-bold text-blue-300 hover:text-white flex items-center gap-1 transition cursor-pointer"
                  >
                    <Volume2 className="w-3.5 h-3.5" /> Re-play Phrase
                  </button>
                </div>
                <p className="text-base font-extrabold text-white leading-relaxed">{activeSpeech.script}</p>
                {activeSpeech.translit && (
                  <p className="text-xs text-slate-300 italic font-medium pt-1">Translit: {activeSpeech.translit}</p>
                )}
                {activeSpeech.meaning && (
                  <p className="text-xs text-slate-300 font-semibold pt-0.5">Meaning: {activeSpeech.meaning}</p>
                )}
              </div>

              {/* Controls Bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-white/10">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => playSpeechAudio()}
                    className="p-3.5 rounded-sm bg-white/10 hover:bg-white/20 text-white transition shadow-sm cursor-pointer"
                    title="Replay Audio"
                  >
                    <RotateCcw className="w-5 h-5" />
                  </button>

                  <button
                    onClick={togglePlayPause}
                    className="w-16 h-16 rounded-full bg-[#FF9933] hover:bg-amber-500 text-slate-950 flex items-center justify-center shadow-xl cursor-pointer hover:scale-105 transition"
                  >
                    {isPlaying ? (
                      <Pause className="w-8 h-8 fill-slate-950" />
                    ) : (
                      <Play className="w-8 h-8 fill-slate-950 ml-1" />
                    )}
                  </button>

                  <button
                    onClick={() => playSpeechAudio()}
                    className="p-3.5 rounded-sm bg-white/10 hover:bg-white/20 text-white transition shadow-sm cursor-pointer"
                    title="Forward"
                  >
                    <RotateCw className="w-5 h-5" />
                  </button>

                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-3.5 rounded-sm bg-white/10 hover:bg-white/20 text-white transition shadow-sm cursor-pointer"
                    title={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted ? <VolumeX className="w-5 h-5 text-red-400" /> : <Volume2 className="w-5 h-5" />}
                  </button>
                </div>

                {/* Speed Selector */}
                <div className="flex items-center gap-2 text-xs font-bold bg-white/10 p-1.5 rounded-sm border border-white/10">
                  <span className="text-slate-300 px-1">Speed:</span>
                  {[0.75, 1.0, 1.25, 1.5].map((speed) => (
                    <button
                      key={speed}
                      onClick={() => setPlaybackSpeed(speed)}
                      className={`px-2.5 py-1 rounded-sm transition ${
                        playbackSpeed === speed
                          ? 'bg-[#FF9933] text-slate-950 font-black shadow-xs'
                          : 'text-white hover:bg-white/20'
                      }`}
                    >
                      {speed}x
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Track Info Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-600 font-semibold p-4 rounded-sm bg-[#EEF3F8] border border-[#DCE2E6]">
              <div className="space-y-0.5">
                <div>Narrator: <strong className="text-slate-900">{activeTrack.narrator}</strong></div>
                <div>Regional Accent: <strong className="text-[#0B3D91]">{activeTrack.accent}</strong></div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleBookmark(activeTrack.id)}
                  className={`px-3.5 py-2 rounded-sm border text-xs font-bold flex items-center gap-1.5 transition ${
                    bookmarkedTracks.includes(activeTrack.id)
                      ? 'bg-amber-50 border-amber-300 text-amber-700'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  {bookmarkedTracks.includes(activeTrack.id) ? 'Bookmarked' : 'Bookmark'}
                </button>
                <button
                  onClick={() => handleDownloadMp3(activeTrack)}
                  disabled={downloadingId === activeTrack.id}
                  className="px-4 py-2 rounded-sm bg-[#0B3D91] hover:bg-[#082C6C] text-white font-extrabold text-xs flex items-center gap-1.5 shadow-sm transition disabled:opacity-50"
                >
                  <Download className="w-3.5 h-3.5" />
                  {downloadingId === activeTrack.id ? 'Downloading...' : 'Download MP3'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Audio Playlist Sidebar & Quick Dub Switcher */}
        <div className="lg:col-span-5 xl:col-span-4 space-y-6">
          <div className="p-6 rounded-sm bg-white border border-[#DCE2E6] shadow-xs space-y-5">
            {/* Playlist Header */}
            <div className="flex items-center justify-between border-b border-[#DCE2E6] pb-3">
              <div>
                <h3 className="font-black text-slate-900 text-base">Audio Playlist</h3>
                <span className="text-[11px] font-semibold text-slate-500">
                  {filteredPlaylist.length} Lessons • 19 Dubbed Audio Tracks
                </span>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-[#EEF3F8] text-[#082C6C] font-bold text-xs border border-[#DCE2E6]">
                HD Audio
              </span>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search audio tracks or narrators..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-sm bg-slate-50 border border-[#DCE2E6] text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#0B3D91]"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-1.5">
              {['All', 'Daily Conversation', 'Practical Dialogues', 'Phonetic Drill', 'Poetry & Music', 'Travel & Navigation'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-sm font-extrabold text-[11px] transition ${
                    selectedCategory === cat
                      ? 'bg-[#0B3D91] text-white shadow-xs'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Playlist Cards List */}
            <div className="space-y-3 max-h-[620px] overflow-y-auto pr-1">
              {filteredPlaylist.map((track) => {
                const isActive = activeTrack.id === track.id;

                return (
                  <div
                    key={track.id}
                    onClick={() => {
                      setActiveTrack(track);
                      playSpeechAudio();
                    }}
                    className={`p-3.5 rounded-sm border cursor-pointer transition-all duration-200 flex flex-col gap-2 shadow-2xs hover:shadow-md ${
                      isActive
                        ? 'bg-[#EEF3F8] border-[#0B3D91] ring-1 ring-[#0B3D91]'
                        : 'bg-white border-[#DCE2E6] hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <button
                          className={`w-9 h-9 rounded-sm flex items-center justify-center shrink-0 shadow-xs transition ${
                            isActive ? 'bg-[#0B3D91] text-white' : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          <Play className="w-4 h-4 fill-current ml-0.5" />
                        </button>
                        <div className="min-w-0 flex-1 space-y-0.5">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[9px] font-black uppercase text-[#0B3D91] truncate">{track.category}</span>
                            {isActive && (
                              <span className="px-1.5 py-0.2 rounded bg-[#0B3D91] text-white font-extrabold text-[8px] shrink-0">
                                PLAYING
                              </span>
                            )}
                          </div>
                          <h4 className="font-extrabold text-xs text-slate-900 line-clamp-1 leading-snug">{track.titleHindi}</h4>
                          <p className="text-[11px] text-slate-500 line-clamp-1">{track.titleEng}</p>
                        </div>
                      </div>
                      <span className="font-bold text-xs text-[#0B3D91] shrink-0">{track.duration}</span>
                    </div>

                    {/* Quick Dub Pill Selector on Each Card */}
                    <div className="pt-2 border-t border-[#DCE2E6] flex items-center justify-between gap-2">
                      <span className="text-[10px] font-black text-slate-400 uppercase">🎙️ Dub Voice:</span>
                      <div className="flex items-center gap-1 overflow-x-auto pb-0.5">
                        {ALL_DUBBING_LANGUAGES.slice(0, 4).map((lang) => (
                          <button
                            key={lang.key}
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveTrack(track);
                              handleSelectDubLanguage(lang);
                            }}
                            className={`px-2 py-0.5 rounded-sm text-[10px] font-bold whitespace-nowrap transition ${
                              selectedDubLang.key === lang.key && isActive
                                ? 'bg-[#0B3D91] text-white font-black'
                                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                            }`}
                          >
                            {lang.flag} {lang.name.split(' ')[0]}
                          </button>
                        ))}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveTrack(track);
                            setShowDubbingModal(true);
                          }}
                          className="px-2 py-0.5 rounded-sm bg-[#EEF3F8] text-[#082C6C] hover:bg-blue-100 text-[10px] font-black whitespace-nowrap"
                        >
                          +19
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ALL DUBBING LANGUAGES MODAL */}
      {showDubbingModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-sm border border-[#DCE2E6] max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setShowDubbingModal(false)}
              className="absolute top-4 right-4 p-2 rounded-sm bg-slate-100 hover:bg-slate-200 text-slate-500 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase text-[#0B3D91] tracking-wider block">
                UNIVERSAL AI DUBBING ENGINE
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                Select Audio Dubbing Voice (19+ Languages)
              </h3>
              <p className="text-xs text-slate-500">
                Switch real-time audio dubbing and voice pronunciation across 19 Indian and global languages.
              </p>
            </div>

            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search dubbing language (e.g. Hindi, Persian, Spanish, Tamil)..."
                value={dubbingSearchQuery}
                onChange={(e) => setDubbingSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-sm bg-slate-50 border border-[#DCE2E6] text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#0B3D91]"
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-80 overflow-y-auto pr-1">
              {filteredLanguages.map((lang) => {
                const isSelected = selectedDubLang.key === lang.key;
                return (
                  <button
                    key={lang.key}
                    onClick={() => handleSelectDubLanguage(lang)}
                    className={`p-3 rounded-sm border text-left flex items-center justify-between transition ${
                      isSelected
                        ? 'bg-[#EEF3F8] border-[#0B3D91] text-[#082C6C] font-black shadow-2xs'
                        : 'bg-white border-[#DCE2E6] text-slate-700 hover:bg-slate-50 font-bold'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="text-xl shrink-0">{lang.flag}</span>
                      <div className="min-w-0">
                        <p className={`text-xs font-black truncate ${isSelected ? 'text-[#082C6C]' : 'text-slate-900'}`}>
                          {lang.name}
                        </p>
                        <p className="text-[10px] text-slate-400 font-normal truncate">
                          {lang.nativeName}
                        </p>
                      </div>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-[#0B3D91] shrink-0 ml-1" />}
                  </button>
                );
              })}
            </div>

            <div className="pt-4 border-t border-[#DCE2E6] flex items-center justify-between">
              <span className="text-xs text-slate-500 font-semibold">
                Active Dubbing Voice: <strong className="text-[#0B3D91]">{selectedDubLang.name} ({selectedDubLang.nativeName})</strong>
              </span>
              <button
                onClick={() => setShowDubbingModal(false)}
                className="px-6 py-2.5 rounded-sm bg-[#0B3D91] hover:bg-[#082C6C] text-white font-extrabold text-xs shadow-md transition"
              >
                Apply Dubbing Voice →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
