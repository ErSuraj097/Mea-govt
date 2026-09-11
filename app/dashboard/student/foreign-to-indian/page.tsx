'use client';

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Globe,
  BookOpen,
  Sparkles,
  CheckCircle2,
  Play,
  ArrowRight,
  Search,
  Volume2,
  Award,
  Zap,
  Check,
  Star,
  RefreshCw,
  Lightbulb,
  FileText,
  Bookmark,
  Download,
  Mic,
  RotateCcw,
  Printer,
  ShieldCheck,
  Tag,
  Lock,
  Pause,
  Sliders,
  MessageSquare,
  Compass,
  Layers,
  GraduationCap,
  Languages,
  Radio,
  Headphones,
  CheckCircle,
  X
} from 'lucide-react';
import { getStoredUser, enrollInCourse, saveStoredUser, addXpToUser } from '@/lib/lmsStore';
import { User } from '@/lib/mockData';

// ==========================================
// UNIVERSAL DUBBING LANGUAGES (19+ LANGUAGES)
// ==========================================
interface DubbingLanguage {
  key: string;
  nameEng: string;
  nameNative: string;
  flag: string;
  ttsCode: string;
}

const ALL_DUBBING_LANGUAGES: DubbingLanguage[] = [
  { key: 'en', nameEng: 'English', nameNative: 'English', flag: '🇬🇧', ttsCode: 'en-US' },
  { key: 'hi', nameEng: 'Hindi', nameNative: 'हिंदी', flag: '🇮🇳', ttsCode: 'hi-IN' },
  { key: 'fa', nameEng: 'Persian (Farsi)', nameNative: 'فارسی', flag: '🇮🇷', ttsCode: 'fa-IR' },
  { key: 'es', nameEng: 'Spanish', nameNative: 'Español', flag: '🇪🇸', ttsCode: 'es-ES' },
  { key: 'fr', nameEng: 'French', nameNative: 'Français', flag: '🇫🇷', ttsCode: 'fr-FR' },
  { key: 'de', nameEng: 'German', nameNative: 'Deutsch', flag: '🇩🇪', ttsCode: 'de-DE' },
  { key: 'ja', nameEng: 'Japanese', nameNative: '日本語', flag: '🇯🇵', ttsCode: 'ja-JP' },
  { key: 'ru', nameEng: 'Russian', nameNative: 'Русский', flag: '🇷🇺', ttsCode: 'ru-RU' },
  { key: 'ar', nameEng: 'Arabic', nameNative: 'العربية', flag: '🇸🇦', ttsCode: 'ar-SA' },
  { key: 'ko', nameEng: 'Korean', nameNative: '한국어', flag: '🇰🇷', ttsCode: 'ko-KR' },
  { key: 'zh', nameEng: 'Chinese', nameNative: '中文', flag: '🇨🇳', ttsCode: 'zh-CN' },
  { key: 'ta', nameEng: 'Tamil', nameNative: 'தமிழ்', flag: '🇮🇳', ttsCode: 'ta-IN' },
  { key: 'te', nameEng: 'Telugu', nameNative: 'తెలుగు', flag: '🇮🇳', ttsCode: 'te-IN' },
  { key: 'bn', nameEng: 'Bengali', nameNative: 'বাংলা', flag: '🇮🇳', ttsCode: 'bn-IN' },
  { key: 'mr', nameEng: 'Marathi', nameNative: 'मराठी', flag: '🇮🇳', ttsCode: 'mr-IN' },
  { key: 'gu', nameEng: 'Gujarati', nameNative: 'ગુજરાતી', flag: '🇮🇳', ttsCode: 'gu-IN' },
  { key: 'pa', nameEng: 'Punjabi', nameNative: 'ਪੰਜਾਬੀ', flag: '🇮🇳', ttsCode: 'pa-IN' },
  { key: 'ml', nameEng: 'Malayalam', nameNative: 'മലയാളം', flag: '🇮🇳', ttsCode: 'ml-IN' },
  { key: 'sa', nameEng: 'Sanskrit', nameNative: 'संस्कृतम्', flag: '🇮🇳', ttsCode: 'hi-IN' }
];

function getDubbedSpeechData(langKey: string, courseTitle: string, chapterTitle: string) {
  const map: Record<string, { speech: string; translit: string; meaning: string }> = {
    hi: {
      speech: `नमस्ते! इस विशेष वीडियो पाठ में आपका स्वागत है। आज हम ${chapterTitle || 'भारतीय भाषा एवं लिपि'} का गहन अभ्यास करेंगे।`,
      translit: 'Namaste! Is vishesh video paath mein aapka swaagat hai.',
      meaning: 'Welcome! In this lesson we master phonetic articulation and grammar rules.'
    },
    en: {
      speech: `Hello and welcome to this masterclass video lecture. Today we explore ${chapterTitle || 'Indian linguistics'} with step-by-step clarity and pronunciation mastery.`,
      translit: 'Hello and welcome to this masterclass video lecture.',
      meaning: 'Step-by-step masterclass exploring grammar, phonetics, and conversation.'
    },
    fa: {
      speech: `سلام و درود! به این درس ویدیویی تخصصی خوش آمدید. امروز مبحث ${chapterTitle || 'زبان‌های هندی'} و تلفظ اصیل را با هم تمرین می‌کنیم.`,
      translit: 'Salam o dorood! Be in dars-e videoee takhassosi khosh amadid.',
      meaning: 'Warm greetings! Welcome to this dedicated video lesson with native phonetics.'
    },
    es: {
      speech: `¡Hola y bienvenido a esta clase magistral! Hoy profundizamos en ${chapterTitle || 'las lenguas de la India'} y el dominio de la pronunciación.`,
      translit: '¡Hola y bienvenido a esta clase magistral!',
      meaning: 'Hello and welcome! Today we master phonetic drills and core grammar.'
    },
    fr: {
      speech: `Bonjour et bienvenue dans cette leçon vidéo complète. Aujourd'hui nous étudions ${chapterTitle || 'la linguistique indienne'} et l'élocution parfaite.`,
      translit: 'Bonjour et bienvenue dans cette leçon vidéo complète.',
      meaning: 'Welcome to this master video class with structured audio elocution.'
    },
    de: {
      speech: `Hallo und herzlich willkommen zu dieser Meisterklasse! Heute vertiefen wir ${chapterTitle || 'die indische Sprachwissenschaft'} und die korrekte Aussprache.`,
      translit: 'Hallo und herzlich willkommen zu dieser Meisterklasse!',
      meaning: 'Welcome! Today we delve deep into accurate pronunciation and syntax.'
    },
    ja: {
      speech: `こんにちは！このマスタークラス動画講座へようこそ。本日は ${chapterTitle || 'インド諸言語の基礎'} と正しい発音を学びます。`,
      translit: 'Konnichiwa! Kono masutā kurasu dōga kōza e yōkoso.',
      meaning: 'Welcome! Today we study grammatical nuances and natural pronunciation.'
    },
    ru: {
      speech: `Здравствуйте и добро пожаловать на этот видеоурок! Сегодня мы разбираем ${chapterTitle || 'индийские языки'} и правильную артикуляцию.`,
      translit: 'Zdravstvuyte i dobro pozhalovat na etot videourok!',
      meaning: 'Welcome! Today we analyze pronunciation mechanics and sentence syntax.'
    },
    ar: {
      speech: `مرحباً بكم في هذا الدرس المرئي المتميز. اليوم نتدرب على ${chapterTitle || 'اللغات الهندية العريقة'} ومخارج الحروف بدقة عالية.`,
      translit: 'Marhaban bikum fi hadha al-dars al-mari al-mutamayyiz.',
      meaning: 'Welcome! Today we train on native phonetics and grammatical precision.'
    },
    ko: {
      speech: `안녕하세요! 이 마스터클래스 비디오 강의에 오신 것을 환영합니다. 오늘은 ${chapterTitle || '인도 언어와 발음'}을 연습합니다.`,
      translit: 'Annyeonghaseyo! I maseuteokeullaeseu bidio gang-uie osin geos-eul hwanyeonghamnida.',
      meaning: 'Welcome to this video lecture focusing on core phonetics and rhythm.'
    },
    zh: {
      speech: `你好！欢迎来到本次大师级视频课程。今天我们将深入探讨 ${chapterTitle || '印度语言结构'} 与标准发音规则。`,
      translit: 'Nǐ hǎo! Huānyíng lái dào běn cì dàshī jí shìpín kèchéng.',
      meaning: 'Welcome! In this lesson we master essential grammar and tone rules.'
    },
    ta: {
      speech: `வணக்கம்! இந்த சிறப்புக் காணொளி பாடத்திற்கு உங்களை வரவேற்கிறோம். இன்று நாம் ${chapterTitle || 'மொழிப் பாடம்'} மற்றும் சரியான உச்சரிப்பை கற்போம்.`,
      translit: 'Vanakkam! Intha sirappu kaanoli paadathirku ungalai varaverkirom.',
      meaning: 'Welcome to this video lesson covering phonetic drills and grammar.'
    },
    te: {
      speech: `నమస్కారం! ఈ ప్రత్యేక వీడియో పాఠానికి స్వాగతం. ఈ రోజు మనం ${chapterTitle || 'భాషా వ్యాకరణం'} మరియు స్పష్టమైన ఉచ్చారణను అభ్యసిద్దాం.`,
      translit: 'Namaskaram! Ee pratyeka video paathaniki swagatam.',
      meaning: 'Welcome! Today we practice fluent sentence structure and pronunciation.'
    },
    bn: {
      speech: `নমস্কার! এই বিশেষ ভিডিও পাঠে আপনাকে স্বাগত। আজ আমরা ${chapterTitle || 'ভাষাতত্ত্ব'} এবং শুদ্ধ উচ্চারণ গভীর ভাবে অনুশীলন করব।`,
      translit: 'Nomoshkar! Ei bishesh video pathe apnake shagoto.',
      meaning: 'Warm welcome! Today we analyze syntax and authentic phonetics.'
    },
    mr: {
      speech: `नमस्कार! या विशेष व्हिडिओ पाठामध्ये आपले स्वागत आहे. आज आपण ${chapterTitle || 'व्याकरण व संभाषण'} आणि अचूक उच्चाराचा सराव करूया.`,
      translit: 'Namaskar! Ya vishesh video pathamadhe aple swagat ahe.',
      meaning: 'Welcome! Today we practice precise articulation and linguistic nuances.'
    },
    gu: {
      speech: `નમસ્તે! આ વિશેષ વિડિયો લેક્ચરમાં આપનું સ્વાગત છે. આજે આપણે ${chapterTitle || 'ભાષા જ્ઞાન'} અને શુદ્ધ ઉચ્ચારણ શીખીશું.`,
      translit: 'Namaste! Aa vishesh video lecture ma aapnu swagat chhe.',
      meaning: 'Welcome to this comprehensive video lecture.'
    },
    pa: {
      speech: `ਸਤਿ ਸ਼੍ਰੀ ਅਕਾਲ! ਇਸ ਵਿਸ਼ੇਸ਼ ਵੀਡੀਓ ਲੈਕਚਰ ਵਿੱਚ ਤੁਹਾਡਾ ਸੁਆਗਤ hai। ਅੱਜ ਅਸੀਂ ${chapterTitle || 'ਵਿਆਕਰਣ'} ਅਤੇ ਸ਼ੁੱਧ ਉਚਾਰਨ ਸਿੱਖਾਂਗੇ।`,
      translit: 'Sat Sri Akal! Is vishesh video lecture vich tuhada swagat hai.',
      meaning: 'Welcome! Today we explore dialectical accuracy and phonetic ease.'
    },
    ml: {
      speech: `നമസ്കാരം! ഈ പ്രത്യേക വീഡിയോ പാഠത്തിലേക്ക് സ്വാഗതം. ഇന്ന് നാം ${chapterTitle || 'ഭാഷാ പാഠം'} ശുദ്ധമായ ഉച്ചാരണത്തോടെ പഠിക്കുന്നു.`,
      translit: 'Namaskaram! Ee pratyeka video paadathilekku swagatham.',
      meaning: 'Welcome to this video class with native speech accents.'
    },
    sa: {
      speech: `नमो नमः! अस्मिन् विशिष्टे दृश्य-पाठ्यक्रमे भवतां स्वागतम्। अद्य वयं ${chapterTitle || 'संस्कृत-व्याकरणम्'} तथा शुद्धोच्चारणम् अभ्यासं कुर्मः।`,
      translit: 'Namo Namah! Asmin vishishte drishya-pathyakrame bhavatam swagatam.',
      meaning: 'Greetings! Today we master traditional Sanskrit chanting and phonetics.'
    }
  };
  return map[langKey] || map['en'] || map['hi'];
}

// ---------------------------------------------------------------------------
// 1. DATA DEFINITIONS: 22 SCHEDULED INDIAN LANGUAGES
// ---------------------------------------------------------------------------
interface ScheduledIndianLanguage {
  code: string;
  nameEng: string;
  nameNative: string;
  scriptName: string;
  region: string;
  category: 'North & Hindi Belt' | 'South Dravidian' | 'East & North-East' | 'West & Central' | 'Classical & Ancient';
  sampleGreeting: string;
  sampleAudioText: string;
  ttsCode: string;
  pronunciationGuide: string;
  grammarFeature: string;
  samplePassage: string;
  totalModules: number;
  totalLessons: number;
  enrolledLearners: number;
  bannerGradient: string;
  flagIcon: string;
  cognateFromEnglish: {
    foreign: string;
    indian: string;
    meaning: string;
  };
}

const SCHEDULED_INDIAN_LANGUAGES_22: ScheduledIndianLanguage[] = [
  {
    code: 'hi',
    nameEng: 'Hindi',
    nameNative: 'हिंदी',
    scriptName: 'Devanagari (देवनागरी)',
    region: 'North & Central India (Pan-India Official)',
    category: 'North & Hindi Belt',
    sampleGreeting: 'नमस्ते (Namaste) — Welcome to India!',
    sampleAudioText: 'नमस्ते! भारतीय भाषाओं के अंतरराष्ट्रीय अध्ययन पोर्टल में आपका स्वागत है।',
    ttsCode: 'hi-IN',
    pronunciationGuide: 'Nuh-muhs-tay',
    grammarFeature: 'SOV (Subject-Object-Verb) • Postpositions • Gendered Nouns',
    samplePassage: 'भारत एक विशाल और विविध सांस्कृतिक देश है। यहाँ की भाषाएँ समृद्ध ज्ञान और साहित्य से परिपूर्ण हैं।',
    totalModules: 14,
    totalLessons: 56,
    enrolledLearners: 58200,
    bannerGradient: 'from-amber-600 via-orange-600 to-red-600',
    flagIcon: '🇮🇳',
    cognateFromEnglish: { foreign: 'Mother / Brother', indian: 'माता (Mātā) / भ्राता (Bhrātā)', meaning: 'Kinship Cognates (Indo-European Roots)' }
  },
  {
    code: 'sa',
    nameEng: 'Sanskrit',
    nameNative: 'संस्कृतम्',
    scriptName: 'Devanagari (देवनागरी)',
    region: 'Pan-India (Classical Mother of Indo-Aryan Languages)',
    category: 'Classical & Ancient',
    sampleGreeting: 'नमो नमः (Namo Namah) — Greetings of Reverence!',
    sampleAudioText: 'नमो नमः। संस्कृतभाषा विश्वस्य प्राचीना समृद्धतमा च भाषा अस्ति।',
    ttsCode: 'hi-IN',
    pronunciationGuide: 'Nuh-mo Nuh-muh-huh',
    grammarFeature: '8 Grammatical Cases (Vibhakti) • Dual Number (Dvivachana) • Highly Inflected',
    samplePassage: 'वसुधैव कुटुम्बकम् — सम्पूर्णा पृथ्वी एका एव परिवारः अस्ति। विद्या ददाति विनयम्।',
    totalModules: 16,
    totalLessons: 64,
    enrolledLearners: 41200,
    bannerGradient: 'from-amber-700 via-yellow-600 to-orange-700',
    flagIcon: '🕉️',
    cognateFromEnglish: { foreign: 'Divine / Deity', indian: 'देव (Deva)', meaning: 'Root *deywós (Light/Shining)' }
  },
  {
    code: 'ta',
    nameEng: 'Tamil',
    nameNative: 'தமிழ்',
    scriptName: 'Tamil Script (தமிழ் அரிச்சுவடி)',
    region: 'Tamil Nadu, Puducherry, Sri Lanka, Singapore',
    category: 'South Dravidian',
    sampleGreeting: 'வணக்கம் (Vanakkam) — Auspicious Greetings!',
    sampleAudioText: 'வணக்கம்! தமிழ் மொழி இரண்டாயிரத்திற்கும் மேற்பட்ட ஆண்டுகள் பழமையான செம்மொழியாகும்.',
    ttsCode: 'ta-IN',
    pronunciationGuide: 'Vuh-nuhk-kuhm',
    grammarFeature: 'Agglutinative Morphology • Retroflex Consonants • Classical Sangam Literature',
    samplePassage: 'யாதும் ஊரே யாவரும் கேளிர். தீதும் நன்றும் பிறர்தர வாரா. தமிழ் வாழ்க!',
    totalModules: 14,
    totalLessons: 52,
    enrolledLearners: 39400,
    bannerGradient: 'from-red-600 via-rose-700 to-amber-700',
    flagIcon: '🏛️',
    cognateFromEnglish: { foreign: 'Curry / Mango / Teak', indian: 'கறி (Kari) / மாங்காய் (Māngāy)', meaning: 'Tamil Global Loanwords' }
  },
  {
    code: 'te',
    nameEng: 'Telugu',
    nameNative: 'తెలుగు',
    scriptName: 'Telugu Script (తెలుగు లిపి)',
    region: 'Andhra Pradesh & Telangana',
    category: 'South Dravidian',
    sampleGreeting: 'నమస్కారం (Namaskāram) — Warm Greetings!',
    sampleAudioText: 'నమస్కారం! తెలుగు భాష తన మధురమైన ధ్వనుల వల్ల ఇటాలియన్ ఆఫ్ ది ఈస్ట్ అని పిలువబడుతుంది.',
    ttsCode: 'te-IN',
    pronunciationGuide: 'Nuh-muhs-kah-ruhm',
    grammarFeature: 'Vowel-Ending Words (Italian of the East) • Dravidian Root System',
    samplePassage: 'దేశభాషలందు తెలుగు లెస్స. అందరికీ నమస్కారం, మా అభ్యాసంలో భాగస్వామ్యం అవ్వండి.',
    totalModules: 12,
    totalLessons: 48,
    enrolledLearners: 32100,
    bannerGradient: 'from-blue-700 via-indigo-700 to-purple-800',
    flagIcon: '🌊',
    cognateFromEnglish: { foreign: 'Bandicoot / Coir', indian: 'పందికొక్కు (Pandikokku)', meaning: 'Global Dravidian Botanical Term' }
  },
  {
    code: 'bn',
    nameEng: 'Bengali',
    nameNative: 'বাংলা',
    scriptName: 'Bengali Script (বাংলা লিপি)',
    region: 'West Bengal, Tripura, Assam, Bangladesh',
    category: 'East & North-East',
    sampleGreeting: 'নমস্কার / শুভদিন (Nomoshkar / Shubhodin)!',
    sampleAudioText: 'নমস্কার! রবীন্দ্রনাথ ঠাকুরের অমর সাহিত্যের ভাষা বাংলায় আপনাকে স্বাগত জানাই।',
    ttsCode: 'bn-IN',
    pronunciationGuide: 'No-mosh-kar',
    grammarFeature: 'Non-Gendered Verbs • Rich Vowel Harmony (O-coloring) • Tagore Literature',
    samplePassage: 'চিত্ত যেথা ভয়শূন্য, উচ্চ যেথা শির, জ্ঞান যেথা মুক্ত, সেথায় তুমি বিশ্বকে জাগ্রত করো।',
    totalModules: 12,
    totalLessons: 50,
    enrolledLearners: 37800,
    bannerGradient: 'from-emerald-700 via-teal-700 to-cyan-800',
    flagIcon: '🎭',
    cognateFromEnglish: { foreign: 'Jute / Bungalow', indian: 'বাংলো (Bangla/Bungalow)', meaning: 'Architectural Loanwords' }
  },
  {
    code: 'mr',
    nameEng: 'Marathi',
    nameNative: 'मराठी',
    scriptName: 'Balbodh Devanagari (बाळबोध)',
    region: 'Maharashtra & Goa',
    category: 'West & Central',
    sampleGreeting: 'नमस्कार (Namaskār) — Welcome to Maharashtra!',
    sampleAudioText: 'नमस्कार! छत्रपती शिवाजी महाराजांच्या आणि संतांच्या मराठी भाषेत आपले सहर्ष स्वागत आहे.',
    ttsCode: 'mr-IN',
    pronunciationGuide: 'Nuh-muhs-kar',
    grammarFeature: 'Three Grammatical Genders (Masculine, Feminine, Neuter) • Inclusive/Exclusive Pronouns',
    samplePassage: 'माझा मराठाचि बोलु कौतुकें, परि अमृतातेहि पैजासी जिंके। ऐसी अक्षरे रसिके मेळवीन।',
    totalModules: 12,
    totalLessons: 46,
    enrolledLearners: 29500,
    bannerGradient: 'from-orange-600 via-amber-600 to-red-700',
    flagIcon: '🚩',
    cognateFromEnglish: { foreign: 'Mango / Teak', indian: 'आंबा (Āmbā) / साग (Sāg)', meaning: 'Indo-Aryan Agricultural Terms' }
  },
  {
    code: 'gu',
    nameEng: 'Gujarati',
    nameNative: 'ગુજરાતી',
    scriptName: 'Gujarati Script (શરાફી લિપિ — No Headline)',
    region: 'Gujarat, Daman & Diu, Dadra & Nagar Haveli',
    category: 'West & Central',
    sampleGreeting: 'નમસ્તે / કેમ છો? (Namaste / Kem Chho?)',
    sampleAudioText: 'નમસ્તે! મહાત્મા ગાંધી અને સરદાર પટેલની પાવન ભૂમિ ગુજરાતની ભાષામાં આપનું સ્વાગત છે.',
    ttsCode: 'gu-IN',
    pronunciationGuide: 'Kaym-chho',
    grammarFeature: 'Script without Shirorekha (Headline) • Postpositional Enclitics • Business Lexicon',
    samplePassage: 'જ્યાં જ્યાં વસે એક ગુજરાતી, ત્યાં ત્યાં સદાકાળ ગુજરાત! વૈષ્ણવ જન તો તેને રે કહીયે.',
    totalModules: 10,
    totalLessons: 42,
    enrolledLearners: 26300,
    bannerGradient: 'from-yellow-600 via-amber-600 to-orange-700',
    flagIcon: '🪔',
    cognateFromEnglish: { foreign: 'Cash / Rupee', indian: 'રોકડા (Rokda) / રૂપિયો (Rupiyo)', meaning: 'Mercantile Trade Terms' }
  },
  {
    code: 'kn',
    nameEng: 'Kannada',
    nameNative: 'ಕನ್ನಡ',
    scriptName: 'Kannada Script (ಕನ್ನಡ ಲಿಪಿ)',
    region: 'Karnataka',
    category: 'South Dravidian',
    sampleGreeting: 'ನಮಸ್ಕಾರ (Namaskāra) — Welcome to Karnataka!',
    sampleAudioText: 'ನಮಸ್ಕಾರ! ಸಾವಿರಾರು ವರ್ಷಗಳ ಇತಿಹಾಸವಿರುವ ಶ್ರೀಮಂತ ಕನ್ನಡ ಭಾಷೆಗೆ ಸುಸ್ವಾಗತ.',
    ttsCode: 'kn-IN',
    pronunciationGuide: 'Nuh-muhs-kah-ruh',
    grammarFeature: 'Classical Vachana Literature • Euphonic Sandhi • Dravidian Structural Harmony',
    samplePassage: 'ಸಿರಿಗನ್ನಡಂ ಗೆಲ್ಗೆ, ಸಿರಿಗನ್ನಡಂ ಬಾಳ್ಗೆ! ಎಲ್ಲಾದರೂ ಇರು, ಎಂತಾದರೂ ಇರು, ಎಂದೆಂದಿಗೂ ನೀ ಕನ್ನಡವಾಗಿರು.',
    totalModules: 12,
    totalLessons: 48,
    enrolledLearners: 28400,
    bannerGradient: 'from-amber-600 via-red-600 to-yellow-600',
    flagIcon: '👑',
    cognateFromEnglish: { foreign: 'Cardamom / Sandalwood', indian: 'ಏಲಕ್ಕಿ (Elakki) / ಗಂಧ (Gandha)', meaning: 'Spice Trade Roots' }
  },
  {
    code: 'ml',
    nameEng: 'Malayalam',
    nameNative: 'മലയാളം',
    scriptName: 'Malayalam Script (മലയാളലിപി)',
    region: 'Kerala, Lakshadweep, Mahe',
    category: 'South Dravidian',
    sampleGreeting: 'നമസ്കാരം (Namaskāram) — Greetings from God’s Own Country!',
    sampleAudioText: 'നമസ്കാരം! ഭാരതത്തിലെ ഏറ്റവും സാക്ഷരതയുള്ള സുന്ദരമായ കേരളത്തിന്റെ ഭാഷയിലേക്ക് സ്വാഗതം.',
    ttsCode: 'ml-IN',
    pronunciationGuide: 'Nuh-muhs-kah-ruhm',
    grammarFeature: 'Palindrome Language Name (MALAYALAM) • Pure Verb Endings • Chilandaksharam',
    samplePassage: 'വിദ്യ കൊണ്ട് പ്രബുദ്ധരാവുക, സംഘടന കൊണ്ട് ശക്തരാവുക. കേരളം സാംസ്കാരിക സമ്പന്നമാണ്.',
    totalModules: 12,
    totalLessons: 46,
    enrolledLearners: 24700,
    bannerGradient: 'from-emerald-600 via-teal-700 to-green-800',
    flagIcon: '🌴',
    cognateFromEnglish: { foreign: 'Betel / Calico / Ginger', indian: 'വെറ്റില (Vettila) / ഇഞ്ചി (Inchi)', meaning: 'Malabar Coast Trade Heritage' }
  },
  {
    code: 'pa',
    nameEng: 'Punjabi',
    nameNative: 'ਪੰਜਾਬੀ',
    scriptName: 'Gurmukhi Script (ਗੁਰਮੁਖੀ)',
    region: 'Punjab, Haryana, Delhi, Chandigarh',
    category: 'North & Hindi Belt',
    sampleGreeting: 'ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ (Sat Sri Akal) — Eternal Truth!',
    sampleAudioText: 'ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ ਜੀ! ਪੰਜ ਦਰਿਆਵਾਂ ਦੀ ਪਵਿੱਤਰ ਧਰਤੀ ਪੰਜਾਬ ਦੀ ਮਿੱਠੀ ਬੋਲੀ ਵਿੱਚ ਤੁਹਾਡਾ ਸਵਾਗਤ ਹੈ।',
    ttsCode: 'pa-IN',
    pronunciationGuide: 'Suht Sree Uh-kahl',
    grammarFeature: 'Tonal Language (High, Mid, Low Tones) • Geminate Consonants (Adhak)',
    samplePassage: 'ਜਿਥੈ ਬਾਬਾ ਪੈਰੁ ਧਰੈ ਪੂਜਾ ਆਸਣੁ ਥਾਪਣਿ ਸੋਆ॥ ਪੰਜਾਬੀ ਬੋਲੀ ਸਭ ਦੀ ਸਾਂਝੀ ਮਿੱਠੀ ਮਾਂ ਬੋਲੀ ਹੈ।',
    totalModules: 10,
    totalLessons: 40,
    enrolledLearners: 31200,
    bannerGradient: 'from-amber-500 via-yellow-600 to-orange-600',
    flagIcon: '🌾',
    cognateFromEnglish: { foreign: 'Garam Masala / Tandoor', indian: 'ਗਰਮ (Garam) / ਤੰਦੂਰ (Tandoor)', meaning: 'Culinary Global Lexicon' }
  },
  {
    code: 'or',
    nameEng: 'Odia',
    nameNative: 'ଓଡ଼ିଆ',
    scriptName: 'Odia Script (କଳିଙ୍ଗ ଲିପି — Curved Headlines)',
    region: 'Odisha',
    category: 'East & North-East',
    sampleGreeting: 'ନମସ୍କାର (Namaskāra) — Warm Greetings from Kalinga!',
    sampleAudioText: 'ନମସ୍କାର! ଜଗନ୍ନାଥ ଧାମ ଓଡ଼ିଶାର ଶାସ୍ତ୍ରୀୟ ଓଡ଼ିଆ ଭାଷା ଶିକ୍ଷା କାର୍ଯ୍ୟକ୍ରମକୁ ଆପଣଙ୍କୁ ସ୍ୱାଗତ।',
    ttsCode: 'hi-IN',
    pronunciationGuide: 'Nuh-muhs-kah-ruh',
    grammarFeature: 'Classical Language Status • Rounded Palm-Leaf Script Aesthetics',
    samplePassage: 'ଜୟ ଜଗନ୍ନାଥ! ଓଡ଼ିଆ ଭାଷା ଏକ ସମୃଦ୍ଧ ପ୍ରାଚୀନ ଶାସ୍ତ୍ରୀୟ ଭାଷା ଅଟେ।',
    totalModules: 10,
    totalLessons: 38,
    enrolledLearners: 18900,
    bannerGradient: 'from-cyan-700 via-blue-700 to-indigo-800',
    flagIcon: '🛕',
    cognateFromEnglish: { foreign: 'Juggernaut', indian: 'ଜଗନ୍ନାଥ (Jagannātha)', meaning: 'Lord of Universe (From Puri Rath Yatra)' }
  },
  {
    code: 'as',
    nameEng: 'Assamese',
    nameNative: 'অসমীয়া',
    scriptName: 'Eastern Nagari / Asamiya Script (অসমীয়া লিপি)',
    region: 'Assam & Brahmaputra Valley',
    category: 'East & North-East',
    sampleGreeting: 'নমস্কাৰ (Nomoshkar) — Welcome to Assam!',
    sampleAudioText: 'নমস্কাৰ! ব্ৰহ্মপুত্ৰৰ পৱিত্ৰ ভূমি অসমৰ চহকী অসমীয়া ভাষালৈ আপোনাক স্বাগতম জনাইছোঁ।',
    ttsCode: 'bn-IN',
    pronunciationGuide: 'No-mosh-kar',
    grammarFeature: 'Velar Fricative Pronunciation (X-sound for S/Sh) • Buranji Historical Prose',
    samplePassage: 'অ’ মোৰ আপোনাৰ দেশ, অ’ মোৰ চিকুণী দেশ! অসমীয়া ভাষা সংস্কৃতিৰে পৰিপূৰ্ণ।',
    totalModules: 10,
    totalLessons: 38,
    enrolledLearners: 17400,
    bannerGradient: 'from-emerald-600 via-green-700 to-teal-800',
    flagIcon: '🦏',
    cognateFromEnglish: { foreign: 'Brahmaputra / Tea', indian: 'চাহ (Sah) / ব্ৰহ্মপুত্ৰ (Brohmoputro)', meaning: 'River & Valley Geography' }
  },
  {
    code: 'ur',
    nameEng: 'Urdu',
    nameNative: 'اردو',
    scriptName: 'Nastaliq Perso-Arabic (نستعلیق)',
    region: 'Jammu & Kashmir, Telangana, Delhi, Uttar Pradesh, Bihar',
    category: 'North & Hindi Belt',
    sampleGreeting: 'آداب / السلام علیکم (Adaab / Assalamu Alaikum)!',
    sampleAudioText: 'آداب عرض ہے! اردو زبان کی شیریں اور خوبصورت شاعری کی دنیا میں خوش آمدید۔',
    ttsCode: 'ur-IN',
    pronunciationGuide: 'Ah-daab',
    grammarFeature: 'Nastaliq Right-to-Left Calligraphy • Shared Khariboli Grammar with Hindi',
    samplePassage: 'سارے جہاں سے اچھا ہندوستاں ہمارا، ہم بلبلیں ہیں اس کی یہ گلستاں ہمارا۔',
    totalModules: 12,
    totalLessons: 48,
    enrolledLearners: 34100,
    bannerGradient: 'from-emerald-800 via-teal-800 to-slate-900',
    flagIcon: '📜',
    cognateFromEnglish: { foreign: 'Gazelle / Saffron / Dewan', indian: 'غزل (Ghazal) / دیوان (Dewan)', meaning: 'Poetic & Administrative Roots' }
  },
  {
    code: 'mai',
    nameEng: 'Maithili',
    nameNative: 'मैथिली',
    scriptName: 'Tirhuta / Devanagari (तिरहुता / मिथिलाक्षर)',
    region: 'Bihar & Mithila Region',
    category: 'North & Hindi Belt',
    sampleGreeting: 'प्रणाम / गोड़ लागै छी (Pranam / Gor Lagai Chhi)!',
    sampleAudioText: 'प्रणाम! महाकवि विद्यापतिक पावन मातृभाषा मैथिलीमे अपनेक हार्दिक स्वागत अछि।',
    ttsCode: 'hi-IN',
    pronunciationGuide: 'Pruh-nahm',
    grammarFeature: 'Complex Verbal Agreement with Subject, Object & Bystander (Polite Registers)',
    samplePassage: 'मिथिलाक संस्कृति आर मैथिली भाषा विश्वविख्यात अछि। विद्यापतिक पदावली अत्यंत मधुर अछि।',
    totalModules: 10,
    totalLessons: 36,
    enrolledLearners: 15800,
    bannerGradient: 'from-amber-600 via-orange-600 to-red-600',
    flagIcon: '🎨',
    cognateFromEnglish: { foreign: 'Mithila / Madhubani Art', indian: 'मिथिलाक्षर (Mithilakshar)', meaning: 'Classical Arts Tradition' }
  },
  {
    code: 'sat',
    nameEng: 'Santali',
    nameNative: 'ᱥᱟᱱᱛᱟᱲᱤ',
    scriptName: 'Ol Chiki Script (ᱚᱞ ᱪᱤᱠᱤ — Created by Pandit Raghunath Murmu)',
    region: 'Jharkhand, Odisha, West Bengal, Assam',
    category: 'East & North-East',
    sampleGreeting: 'ᱡᱚᱦᱟᱨ (Johar) — Auspicious Santali Salutation!',
    sampleAudioText: 'ᱡᱚᱦᱟᱨ! ᱚᱞ ᱪᱤᱠᱤ ᱞᱤᱯᱤ ᱛᱮ ᱥᱟᱱᱛᱟᱲᱤ ᱯᱟᱹᱨᱥᱤ ᱪᱮᱫᱚᱜ ᱞᱟᱹᱜᱤᱫ ᱥᱟᱹᱜᱩᱱ ᱫᱟᱨᱟᱢ᱾',
    ttsCode: 'hi-IN',
    pronunciationGuide: 'Jo-har',
    grammarFeature: 'Austroasiatic (Munda) Language Family • Inanimate/Animate Noun Distinction',
    samplePassage: 'ᱥᱟᱱᱛᱟᱲᱤ ᱯᱟᱹᱨᱥᱤ ᱟᱹᱰᱤ ᱢᱟᱨᱮ ᱟᱨ ᱥᱚᱨᱮᱥ ᱯᱟᱹᱨᱥᱤ ᱠᱟᱱᱟ᱾ ᱚᱞ ᱪᱤᱠᱤ ᱟᱵᱚᱣᱟᱜ ᱜᱚᱨᱚᱵᱽ ᱠᱟᱱᱟ᱾',
    totalModules: 10,
    totalLessons: 36,
    enrolledLearners: 14200,
    bannerGradient: 'from-green-700 via-emerald-700 to-teal-800',
    flagIcon: '🏹',
    cognateFromEnglish: { foreign: 'Forest / Nature Eco-roots', indian: 'ᱵᱤᱨ (Bir / Forest)', meaning: 'Indigenous Ecological Knowledge' }
  },
  {
    code: 'ks',
    nameEng: 'Kashmiri',
    nameNative: 'کٲشُر / कश्मीरी',
    scriptName: 'Perso-Arabic Nastaliq & Sharada (شاردا / کشمیری)',
    region: 'Jammu & Kashmir (Kashmir Valley)',
    category: 'North & Hindi Belt',
    sampleGreeting: 'سلام / نمسکار (Salam / Namaskar)!',
    sampleAudioText: 'سلام! جنتِ بے نظیر وادیٔ کشمیر چہِ میژِ زبانہِ منٛز توہہِ چھُو واریاہ خیر مقدم۔',
    ttsCode: 'ur-IN',
    pronunciationGuide: 'Nuh-muhs-kar',
    grammarFeature: 'V2 (Verb-Second) Word Order (Similar to German!) • Central Vowels (ɨ, ə)',
    samplePassage: 'کشمیر چھُ اکھ جنت نظیر جایے۔ کٲشُر زبانہِ منٛز لل دید ہٕنٛز وکھ بیٚیہِ حبہ خاتون ہٕنٛز شاعری۔',
    totalModules: 10,
    totalLessons: 36,
    enrolledLearners: 16100,
    bannerGradient: 'from-cyan-700 via-blue-800 to-indigo-900',
    flagIcon: '🏔️',
    cognateFromEnglish: { foreign: 'Cashmere / Pashmina', indian: 'پشمینہ (Pashmina)', meaning: 'Fine Himalayan Wool Heritage' }
  },
  {
    code: 'ne',
    nameEng: 'Nepali',
    nameNative: 'नेपाली',
    scriptName: 'Devanagari (देवनागरी)',
    region: 'Sikkim, West Bengal (Darjeeling), Himalayan Belt, Nepal',
    category: 'North & Hindi Belt',
    sampleGreeting: 'नमस्ते / नमस्कार (Namaste / Namaskar)!',
    sampleAudioText: 'नमस्ते! हिमालयको काखमा बोलिने सुन्दर र मिठासपूर्ण नेपाली भाषामा स्वागत छ।',
    ttsCode: 'ne-NP',
    pronunciationGuide: 'Nuh-muhs-tay',
    grammarFeature: 'Ergative Case Alignment • High Mountain Register • Bhanubhakta Literature',
    samplePassage: 'सुन्दर, शान्त र विशाल हाम्रो नेपाल र भारतको हिमाली क्षेत्रमा नेपाली भाषा बोलिन्छ।',
    totalModules: 10,
    totalLessons: 36,
    enrolledLearners: 19800,
    bannerGradient: 'from-red-600 via-rose-700 to-orange-700',
    flagIcon: '🏔️',
    cognateFromEnglish: { foreign: 'Sherpa / Khukuri / Gorkha', indian: 'खुकुरी (Khukuri)', meaning: 'Himalayan Valor & Culture' }
  },
  {
    code: 'sd',
    nameEng: 'Sindhi',
    nameNative: 'سنڌي / सिन्धी',
    scriptName: 'Perso-Arabic & Devanagari (عربی-سندھی)',
    region: 'Gujarat, Maharashtra, Rajasthan, Sindh Region',
    category: 'West & Central',
    sampleGreeting: 'جئے جھولے لال / سلام (Jai Jhulelal / Salam)!',
    sampleAudioText: 'سلام! سنڌي ٻوليءَ جي صوفياڻي تاريخ ۽ علمي دنيا ۾ اوهان جو آڌਰ ڀاءُ آهي۔',
    ttsCode: 'ur-IN',
    pronunciationGuide: 'Jye Jhoo-lay-lahl',
    grammarFeature: 'Implosive Consonants (ɓ, ɗ, ʄ, ɠ) • Shah Abdul Latif Sufi Poetry Heritage',
    samplePassage: 'سنڌي ٻولي هڪ قديم ۽ تاريخي زبان آهي جنهن جي جڙ موهن جي دڙي جي تهذيب سان جڙيل آهي۔',
    totalModules: 10,
    totalLessons: 34,
    enrolledLearners: 13900,
    bannerGradient: 'from-amber-600 via-yellow-700 to-orange-800',
    flagIcon: '🌊',
    cognateFromEnglish: { foreign: 'Indus / India / Sindh', indian: 'سنڌو (Sindhu)', meaning: 'Etymological Origin of the Word "India"' }
  },
  {
    code: 'kok',
    nameEng: 'Konkani',
    nameNative: 'कोंकणी / ಕೊಂಕಣಿ',
    scriptName: 'Devanagari, Roman & Kannada Scripts',
    region: 'Goa, Coastal Karnataka, Maharashtra, Kerala',
    category: 'West & Central',
    sampleGreeting: 'देव बरें करूं (Dev Borem Korum) — God Bless You!',
    sampleAudioText: 'देव बरें करूं! सुंदर गोयांत आणि पश्चिम किनारपट्टीवर उलोवपी कोंकणी भाशेंत येवकार।',
    ttsCode: 'hi-IN',
    pronunciationGuide: 'Dev Boh-rem Koh-room',
    grammarFeature: 'Multi-Script Usage (Devanagari & Romi) • Coastal Phonetic Softening',
    samplePassage: 'कोंकणी आमची मायभास. सुंदर दर्यादेगेर वसलेल्या गोयांत आणि कारवारांत कोंकणी बोलतात.',
    totalModules: 10,
    totalLessons: 34,
    enrolledLearners: 15400,
    bannerGradient: 'from-teal-600 via-cyan-700 to-blue-800',
    flagIcon: '🏖️',
    cognateFromEnglish: { foreign: 'Cashew / Feni / Vindaloo', indian: 'काजू (Kaju) / फेणी (Feni)', meaning: 'Portuguese-Indian Trade Bridges' }
  },
  {
    code: 'dgo',
    nameEng: 'Dogri',
    nameNative: 'डोगरी',
    scriptName: 'Devanagari (historically Dogra Akkhar)',
    region: 'Jammu & Kashmir (Jammu Division), Himachal Pradesh',
    category: 'North & Hindi Belt',
    sampleGreeting: 'नमस्ते / जय देवा (Namaste / Jai Deva)!',
    sampleAudioText: 'नमस्ते! डुग्गर प्रदेश जम्मू दी मिठी ते सुरीली डोगरी बोली च तुंदा हार्दिक स्वागत ऐ।',
    ttsCode: 'hi-IN',
    pronunciationGuide: 'Nuh-muhs-tay',
    grammarFeature: 'Pahari-Tonal Inflections • Symmetrical Rhythmic Folk Cadence',
    samplePassage: 'डोगरें दा देश डुग्गर बड़ा सोहणा ऐ। डोगरी भाशा च लोकगीत ते लोककथाएं दा खजाना ऐ।',
    totalModules: 10,
    totalLessons: 34,
    enrolledLearners: 12800,
    bannerGradient: 'from-indigo-600 via-purple-700 to-slate-800',
    flagIcon: '🏰',
    cognateFromEnglish: { foreign: 'Dogra Forts / Pahari Art', indian: 'डुग्गर (Duggar)', meaning: 'Warrior & Royal Heritage' }
  },
  {
    code: 'mni',
    nameEng: 'Manipuri',
    nameNative: 'মৈতৈলোন্ / ꯃꯤꯇꯩꯂꯣꯟ',
    scriptName: 'Meitei Mayek (ꯃꯤꯇꯩ ꯃꯌꯦꯛ) & Bengali Script',
    region: 'Manipur & North-East India',
    category: 'East & North-East',
    sampleGreeting: 'ꯈꯨꯔꯨꯝꯖꯔꯤ (Khurumjari) — Reverential Greeting!',
    sampleAudioText: 'ꯈꯨꯔꯨꯝꯖꯔꯤ! ꯃꯅꯤꯄꯨꯔꯒꯤ ꯃꯤꯇꯩꯂꯣꯟ ꯇꯝꯕꯒꯤ ꯄꯣꯔꯇꯦꯜꯗ ꯇꯔꯥꯝꯅ ꯑꯣꯛꯆꯔꯤ।',
    ttsCode: 'bn-IN',
    pronunciationGuide: 'Khoo-room-juh-ree',
    grammarFeature: 'Tibeto-Burman Tonal Structure • Classical Meitei Mayek Script Revival',
    samplePassage: 'ꯃꯅꯤꯄꯨꯔ ꯑꯁꯤ ꯁꯅꯥꯂꯩꯕꯥꯛꯅꯤ. ꯃꯤꯇꯩꯂꯣꯟ ꯑꯁꯤ ꯅꯨꯡꯁꯤꯔꯕ ꯏꯃꯥꯂꯣꯟꯅꯤ.',
    totalModules: 10,
    totalLessons: 34,
    enrolledLearners: 13500,
    bannerGradient: 'from-rose-600 via-pink-700 to-purple-800',
    flagIcon: '🌸',
    cognateFromEnglish: { foreign: 'Polo (Sagol Kangjei Origin)', indian: 'ꯁꯒꯣꯜ ꯀꯥꯡꯖꯩ (Sagol Kangjei)', meaning: 'Birthplace of Modern Polo' }
  },
  {
    code: 'brx',
    nameEng: 'Bodo',
    nameNative: 'बरʼ',
    scriptName: 'Devanagari Script (बरʼ)',
    region: 'Bodoland (Assam) & North-East',
    category: 'East & North-East',
    sampleGreeting: 'खुलुमबाय (Khulumbai) — Auspicious Salutations!',
    sampleAudioText: 'खुलुमबाय! बरʼ राव सोलोंनायनि थाखाय गासैखौबो बरायबाय।',
    ttsCode: 'hi-IN',
    pronunciationGuide: 'Khoo-loom-bai',
    grammarFeature: 'Tibeto-Burman Agro-Pastoral Lexicon • Highly Productive Nominal Prefixes',
    samplePassage: 'बरʼ हारिया गावनि राव, थुनलाइ आरो हारिमुजों दावगालांगासिनो दं। खुलुमबाय!',
    totalModules: 10,
    totalLessons: 32,
    enrolledLearners: 11900,
    bannerGradient: 'from-amber-600 via-emerald-700 to-green-800',
    flagIcon: '🌿',
    cognateFromEnglish: { foreign: 'Ecology / Silk (Eri Silk)', indian: 'एरा (Era / Eri Silk)', meaning: 'Indigenous Peace Silk Tradition' }
  }
];

// Global Source Languages for International Learners
interface GlobalSourceLanguage {
  code: string;
  nameEng: string;
  nameNative: string;
  flag: string;
}

const GLOBAL_SOURCE_LANGUAGES: GlobalSourceLanguage[] = [
  { code: 'en', nameEng: 'English', nameNative: 'English', flag: '🇬🇧' },
  { code: 'es', nameEng: 'Spanish', nameNative: 'Español', flag: '🇪🇸' },
  { code: 'fr', nameEng: 'French', nameNative: 'Français', flag: '🇫🇷' },
  { code: 'de', nameEng: 'German', nameNative: 'Deutsch', flag: '🇩🇪' },
  { code: 'ja', nameEng: 'Japanese', nameNative: '日本語', flag: '🇯🇵' },
  { code: 'ru', nameEng: 'Russian', nameNative: 'Русский', flag: '🇷🇺' },
  { code: 'ar', nameEng: 'Arabic', nameNative: 'العربية', flag: '🇸🇦' },
  { code: 'zh', nameEng: 'Mandarin Chinese', nameNative: '中文', flag: '🇨🇳' },
  { code: 'it', nameEng: 'Italian', nameNative: 'Italiano', flag: '🇮🇹' },
  { code: 'ko', nameEng: 'Korean', nameNative: '한국어', flag: '🇰🇷' },
  { code: 'pt', nameEng: 'Portuguese', nameNative: 'Português', flag: '🇵🇹' },
  { code: 'nl', nameEng: 'Dutch', nameNative: 'Nederlands', flag: '🇳🇱' }
];

interface CourseProgressState {
  video1Done: boolean;
  video2Done: boolean;
  video3Done: boolean;
  readingCompleted: boolean;
  writingCompleted: boolean;
  writingAnswer: string;
  speakingCompleted: boolean;
  speakingScore: number;
  listeningCompleted: boolean;
  listeningAnswer: number | null;
  examCompleted: boolean;
  examScore: number;
}

const STORAGE_KEY_PROGRESS_F2I = 'jethat_f2i_course_progress_v2';

export default function StudentForeignToIndianPage() {
  const [user, setUser] = useState<User | null>(null);

  // Source Global Language (Default: English)
  const [sourceGlobalLang, setSourceGlobalLang] = useState<GlobalSourceLanguage>(GLOBAL_SOURCE_LANGUAGES[0]);

  // Tab & Filters
  const [activeTab, setActiveTab] = useState<'all' | 'my-diplomas' | 'matrix'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Active In-Page Course Workspace
  const [selectedLanguageModal, setSelectedLanguageModal] = useState<ScheduledIndianLanguage | null>(null);
  const [activeCourse, setActiveCourse] = useState<ScheduledIndianLanguage | null>(null);

  // 8 Workspace Steps
  const [courseStepTab, setCourseStepTab] = useState<
    'videos' | 'reading' | 'writing' | 'guided-learning' | 'speaking' | 'listening' | 'exam' | 'certificate'
  >('videos');

  // Video Syllabus & Cinema Player State
  const [activeDayLesson, setActiveDayLesson] = useState<number>(1);
  const [activeVideoIndex, setActiveVideoIndex] = useState<1 | 2 | 3>(1);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(false);
  const [showSubtitles, setShowSubtitles] = useState<boolean>(true);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);

  // Video Pop-up Modal State
  const [activeVideoModal, setActiveVideoModal] = useState<{
    videoIndex: 1 | 2 | 3;
    day: number;
    title: string;
    description: string;
  } | null>(null);
  const [videoModalTab, setVideoModalTab] = useState<'notes' | 'transcript' | 'quiz'>('notes');
  const [videoModalPlaying, setVideoModalPlaying] = useState<boolean>(false);
  const [videoModalTime, setVideoModalTime] = useState<number>(0);
  const [videoQuizAnswer, setVideoQuizAnswer] = useState<number | null>(null);

  // Multi-Language AI Dubbing State
  const [selectedDubLang, setSelectedDubLang] = useState<string>('en');
  const [showDubbingModal, setShowDubbingModal] = useState<boolean>(false);
  const [dubbingSearchQuery, setDubbingSearchQuery] = useState<string>('');

  // Speaking state
  const [isRecordingSpeaking, setIsRecordingSpeaking] = useState(false);
  const [speakingFeedback, setSpeakingFeedback] = useState<string | null>(null);

  // Checkout modal
  const [checkoutLanguage, setCheckoutLanguage] = useState<ScheduledIndianLanguage | null>(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentSuccessInvoice, setPaymentSuccessInvoice] = useState<string | null>(null);
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);

  // Persistent Progress
  const [progressMap, setProgressMap] = useState<Record<string, CourseProgressState>>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY_PROGRESS_F2I);
        if (saved) return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to load f2i progress', e);
      }
    }
    return {
      'hi': {
        video1Done: true,
        video2Done: true,
        video3Done: true,
        readingCompleted: true,
        writingCompleted: true,
        writingAnswer: 'नमस्ते! I am an international scholar learning Hindi.',
        speakingCompleted: true,
        speakingScore: 96,
        listeningCompleted: true,
        listeningAnswer: 1,
        examCompleted: true,
        examScore: 98
      }
    };
  });

  useEffect(() => {
    setUser(getStoredUser());
  }, []);

  const saveProgressMap = (newMap: Record<string, CourseProgressState>) => {
    setProgressMap(newMap);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY_PROGRESS_F2I, JSON.stringify(newMap));
      } catch (e) {
        console.error('Failed to save progress', e);
      }
    }
  };

  const getStepProgress = (langCode: string) => {
    const p = progressMap[langCode] || {
      video1Done: false,
      video2Done: false,
      video3Done: false,
      readingCompleted: false,
      writingCompleted: false,
      writingAnswer: '',
      speakingCompleted: false,
      speakingScore: 0,
      listeningCompleted: false,
      listeningAnswer: null,
      examCompleted: false,
      examScore: 0
    };

    const videosCompleted = p.video1Done && p.video2Done && p.video3Done;
    const unlockReading = videosCompleted;
    const unlockWriting = unlockReading && p.readingCompleted;
    const unlockSpeaking = unlockWriting && p.writingCompleted;
    const unlockListening = unlockSpeaking && p.speakingCompleted;
    const unlockExam = unlockListening && p.listeningCompleted;
    const unlockDiploma = unlockExam && p.examCompleted;

    const completedCount =
      (videosCompleted ? 1 : 0) +
      (p.readingCompleted ? 1 : 0) +
      (p.writingCompleted ? 1 : 0) +
      (p.speakingCompleted ? 1 : 0) +
      (p.listeningCompleted ? 1 : 0) +
      (p.examCompleted ? 1 : 0);

    const percent = Math.round((completedCount / 6) * 100);

    return {
      ...p,
      videosCompleted,
      unlockReading,
      unlockWriting,
      unlockSpeaking,
      unlockListening,
      unlockExam,
      unlockDiploma,
      completedCount,
      percent,
      allFinished: completedCount === 6
    };
  };

  const updateProgress = (langCode: string, patch: Partial<CourseProgressState>) => {
    const current = progressMap[langCode] || {
      video1Done: false,
      video2Done: false,
      video3Done: false,
      readingCompleted: false,
      writingCompleted: false,
      writingAnswer: '',
      speakingCompleted: false,
      speakingScore: 0,
      listeningCompleted: false,
      listeningAnswer: null,
      examCompleted: false,
      examScore: 0
    };
    const updated = { ...current, ...patch };
    const nextMap = { ...progressMap, [langCode]: updated };
    saveProgressMap(nextMap);
  };

  const resetProgress = (langCode: string) => {
    if (confirm('Are you sure you want to reset your progress for this Indian language diploma?')) {
      const nextMap = { ...progressMap };
      delete nextMap[langCode];
      saveProgressMap(nextMap);
    }
  };

  const playAudio = (text: string, langCode: string = 'hi-IN') => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = langCode;
      utterance.rate = playbackSpeed;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Real-time Multi-Language Dubbing Voice Player
  const playDubbedSpeech = (langKey?: string, customText?: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const lKey = langKey || selectedDubLang;
    const langObj = ALL_DUBBING_LANGUAGES.find((l) => l.key === lKey) || ALL_DUBBING_LANGUAGES[0];
    const dubbedInfo = getDubbedSpeechData(
      lKey,
      activeCourse?.nameEng || '',
      activeVideoModal?.title || 'Indian Language Phonetics & Grammar'
    );
    const speechContent = customText || dubbedInfo.speech;

    const utterance = new SpeechSynthesisUtterance(speechContent);
    utterance.lang = langObj.ttsCode;
    utterance.rate = playbackSpeed || 1.0;
    window.speechSynthesis.speak(utterance);
  };

  const isEnrolledInLanguage = (langCode: string) => {
    if (!user) return true;
    return (user.enrolledCourses || []).some((id) => id === `f2i_${langCode}`) || langCode === 'hi' || langCode === 'sa' || langCode === 'ta';
  };

  const handleStartEnrollment = (lang: ScheduledIndianLanguage) => {
    setCheckoutLanguage(lang);
    setPaymentSuccessInvoice(null);
    setCouponCode('GLOBALBHASHA2026');
    setCouponApplied(true);
  };

  const handleProcessPayment = () => {
    if (!checkoutLanguage) return;
    setIsProcessingPayment(true);
    setTimeout(() => {
      setIsProcessingPayment(false);
      enrollInCourse(`f2i_${checkoutLanguage.code}`);
      const updatedUser = getStoredUser();
      setUser(updatedUser);
      addXpToUser(50);
      try {
        confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
      } catch (e) {
        console.log(e);
      }
      setPaymentSuccessInvoice(`INV-F2I-2026-${Math.floor(100000 + Math.random() * 900000)}`);
    }, 1200);
  };

  const handleFinishCheckout = () => {
    if (checkoutLanguage) {
      setActiveCourse(checkoutLanguage);
      setCourseStepTab('videos');
      setCheckoutLanguage(null);
    }
  };

  const filteredLanguages = SCHEDULED_INDIAN_LANGUAGES_22.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.nameEng.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.nameNative.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.scriptName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const enrolledLanguagesList = SCHEDULED_INDIAN_LANGUAGES_22.filter((lang) => isEnrolledInLanguage(lang.code));

  return (
    <div className="space-y-8 animate-in fade-in duration-300 pb-16 max-w-7xl mx-auto">
      {/* ========================================================= */}
      {/* 1. HERO BANNER: 🌐 ➔ 🇮🇳 FOREIGN TO INDIAN LANGUAGES       */}
      {/* ========================================================= */}
      <div className="relative overflow-hidden rounded-sm bg-gradient-to-r from-slate-950 via-[#051C45] to-[#0B3D91] p-8 sm:p-10 text-white shadow-xl border-l-8 border-[#FF9933]">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-black tracking-wide border border-amber-400/30">
              <Globe className="w-3.5 h-3.5" />
              <span>INTERNATIONAL SCHOLAR & DIPLOMAT TRACK • 🌐 ➔ 🇮🇳 ALL 22 INDIAN LANGUAGES</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white leading-tight">
              Master India&apos;s 22 Scheduled Languages from Global Languages
            </h1>

            <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-medium">
              Curated for foreign scholars, diplomats, exchange students, and global polyglots. Learn Hindi, Sanskrit, Tamil, Bengali, Telugu, and 17 more Scheduled Indian languages with comparative grammar bridges from your native global language.
            </p>

            {/* Source Global Language Switcher */}
            <div className="pt-2 flex flex-wrap items-center gap-2">
              <span className="text-xs font-extrabold text-amber-300">Learning From (Native Language):</span>
              <div className="flex flex-wrap items-center gap-1.5 bg-black/40 p-1.5 rounded-sm border border-white/10">
                {GLOBAL_SOURCE_LANGUAGES.map((gl) => (
                  <button
                    key={gl.code}
                    onClick={() => setSourceGlobalLang(gl)}
                    className={`px-3 py-1 rounded-sm text-xs font-bold transition flex items-center gap-1.5 ${
                      sourceGlobalLang.code === gl.code
                        ? 'bg-[#0B3D91] text-white shadow-sm ring-1 ring-amber-400'
                        : 'text-slate-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <span>{gl.flag}</span>
                    <span>{gl.nameEng}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
            <div className="p-4 rounded-sm bg-black/40 border border-white/10 backdrop-blur-xs space-y-1 text-center">
              <span className="text-2xl font-black text-amber-400">22</span>
              <span className="text-xs font-bold text-slate-300 block">Scheduled Official Languages</span>
            </div>
            <div className="p-4 rounded-sm bg-black/40 border border-white/10 backdrop-blur-xs space-y-1 text-center">
              <span className="text-2xl font-black text-emerald-400">100%</span>
              <span className="text-xs font-bold text-slate-300 block">ICCR Scholarship Covered</span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. IN-PAGE COURSE WORKSPACE (WHEN AN INDIAN LANGUAGE IS OPEN) */}
      {/* ========================================================= */}
      {activeCourse ? (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Top Bar with Back Button */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-6 rounded-sm bg-white border border-[#DCE2E6] shadow-xs">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setActiveCourse(null)}
                className="px-4 py-2.5 rounded-sm bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-xs flex items-center gap-2 transition"
              >
                ← Back to Indian Language List
              </button>
              <div>
                <span className="text-[10px] font-black uppercase text-[#0B3D91] tracking-wider block">
                  INTERNATIONAL ENVOY TRACK • {sourceGlobalLang.flag} {sourceGlobalLang.nameEng} ➔ {activeCourse.flagIcon} {activeCourse.nameEng} ({activeCourse.nameNative})
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  Master {activeCourse.nameEng} from {sourceGlobalLang.nameEng}
                </h2>
              </div>
            </div>

            {/* Overall Progress & Reset Button */}
            {(() => {
              const prog = getStepProgress(activeCourse.code);
              return (
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => resetProgress(activeCourse.code)}
                    className="p-2.5 rounded-sm bg-slate-100 hover:bg-red-50 text-slate-500 hover:text-red-600 transition"
                    title="Reset Progress"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>

                  <div className="p-3.5 rounded-sm bg-[#EEF3F8] border border-[#DCE2E6] text-right space-y-1 shrink-0 min-w-[220px]">
                    <div className="flex justify-between text-xs font-black">
                      <span className="text-slate-700">Course Progress</span>
                      <span className="text-[#0B3D91]">{prog.percent}% ({prog.completedCount}/6 Done)</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2.5">
                      <div
                        className="bg-[#0B3D91] h-2.5 rounded-full transition-all duration-500"
                        style={{ width: `${prog.percent}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-slate-500 font-semibold block">
                      {prog.allFinished ? '🎉 All 6 Modules Finished! Diploma Ready.' : 'Complete steps in sequence to unlock next.'}
                    </span>
                  </div>
                </div>
              );
            })()}
          </div>

          {/* ========================================================================= */}
          {/* TWO-COLUMN WORKSPACE: LEFT 7-STEP MODULE RAIL & RIGHT MAIN WORKSPACE      */}
          {/* ========================================================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* ========================================================= */}
            {/* LEFT SIDEBAR: 7-STEP MODULE PROGRESSION RAIL              */}
            {/* ========================================================= */}
            <div className="lg:col-span-4 xl:col-span-3 space-y-4 lg:sticky lg:top-4">
              {/* Course Progress Card */}
              {(() => {
                const prog = getStepProgress(activeCourse.code);
                return (
                  <div className="p-4 rounded-sm bg-white border border-[#DCE2E6] shadow-2xs space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-black uppercase text-slate-500 tracking-wider">
                        Course Progress
                      </span>
                      <span className="text-xs font-black text-[#0B3D91]">
                        {prog.percent}% ({prog.completedCount}/6)
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2.5">
                      <div
                        className="bg-[#0B3D91] h-2.5 rounded-full transition-all duration-500"
                        style={{ width: `${prog.percent}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-500 font-medium">
                        {prog.allFinished ? '🎉 Diploma Ready!' : 'Sequential modules'}
                      </span>
                      <button
                        onClick={() => resetProgress(activeCourse.code)}
                        className="text-slate-400 hover:text-red-600 font-bold flex items-center gap-1 transition text-[10px]"
                        title="Reset Progress"
                      >
                        <RotateCcw className="w-3 h-3" /> Reset
                      </button>
                    </div>
                  </div>
                );
              })()}

              {/* Vertical 7-Module Navigation Stack */}
              {(() => {
                const prog = getStepProgress(activeCourse.code);
                const modules = [
                  {
                    id: 'videos' as const,
                    num: 1,
                    name: 'Video Lectures',
                    badge: prog.videosCompleted ? '✓ 3/3 Done' : '3 Lectures',
                    isCompleted: prog.videosCompleted,
                    isUnlocked: true,
                    icon: Play,
                    description: 'Day & Chapter masterclasses'
                  },
                  {
                    id: 'reading' as const,
                    num: 2,
                    name: 'Reading & Grammar',
                    badge: prog.readingCompleted ? '✓ Completed' : !prog.unlockReading ? '🔒 Locked' : 'Reading & Rules',
                    isCompleted: prog.readingCompleted,
                    isUnlocked: prog.unlockReading,
                    icon: BookOpen,
                    description: 'Comparative grammar notes'
                  },
                  {
                    id: 'writing' as const,
                    num: 3,
                    name: 'Written Practice',
                    badge: prog.writingCompleted ? '✓ Submitted' : !prog.unlockWriting ? '🔒 Locked' : 'Written Drills',
                    isCompleted: prog.writingCompleted,
                    isUnlocked: prog.unlockWriting,
                    icon: FileText,
                    description: 'Script pad & essay check'
                  },
                  {
                    id: 'guided-learning' as const,
                    num: '📖',
                    name: 'Guided Study Modules (PDFs)',
                    badge: 'Study Guides',
                    isCompleted: false,
                    isUnlocked: true,
                    icon: Bookmark,
                    description: 'Downloadable PDF references'
                  },
                  {
                    id: 'speaking' as const,
                    num: 4,
                    name: 'Speaking AI Coach',
                    badge: prog.speakingCompleted ? `✓ Score ${prog.speakingScore}%` : !prog.unlockSpeaking ? '🔒 Locked' : 'AI Voice Coach',
                    isCompleted: prog.speakingCompleted,
                    isUnlocked: prog.unlockSpeaking,
                    icon: Mic,
                    description: 'Intonation & pronunciation'
                  },
                  {
                    id: 'listening' as const,
                    num: 5,
                    name: 'Listening Test',
                    badge: prog.listeningCompleted ? '✓ Completed' : !prog.unlockListening ? '🔒 Locked' : 'Audio Quiz',
                    isCompleted: prog.listeningCompleted,
                    isUnlocked: prog.unlockListening,
                    icon: Volume2,
                    description: 'Comprehension audio tracks'
                  },
                  {
                    id: 'exam' as const,
                    num: 6,
                    name: 'Final Exam',
                    badge: prog.examCompleted ? `✓ Score ${prog.examScore}%` : !prog.unlockExam ? '🔒 Locked' : 'Final Test',
                    isCompleted: prog.examCompleted,
                    isUnlocked: prog.unlockExam,
                    icon: Award,
                    description: 'Multi-section certification'
                  },
                  {
                    id: 'certificate' as const,
                    num: 7,
                    name: 'International Diploma',
                    badge: prog.unlockDiploma ? '🏆 Ready to Claim' : '🔒 Finish 1-6',
                    isCompleted: prog.allFinished,
                    isUnlocked: prog.unlockDiploma,
                    icon: Award,
                    description: 'Official diploma & QR credential'
                  }
                ];

                return (
                  <div className="space-y-2 bg-white p-3 rounded-sm border border-[#DCE2E6] shadow-2xs">
                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider px-2 block">
                      Course Curriculum (Steps 1–7)
                    </span>

                    <div className="space-y-1.5">
                      {modules.map((m) => {
                        const IconComp = m.icon;
                        const isActive = courseStepTab === m.id;

                        return (
                          <button
                            key={m.id}
                            disabled={!m.isUnlocked}
                            onClick={() => setCourseStepTab(m.id)}
                            className={`w-full text-left p-3 rounded-sm transition flex items-center justify-between gap-2 border ${
                              !m.isUnlocked
                                ? 'bg-slate-50 text-slate-400 border-[#E8EEF3] opacity-60 cursor-not-allowed'
                                : isActive
                                ? 'bg-[#0B3D91] text-white border-[#082C6C] shadow-md ring-1 ring-[#0B3D91]'
                                : m.id === 'certificate' && m.isUnlocked
                                ? 'bg-amber-50 text-amber-900 border-amber-300 hover:bg-amber-100 font-extrabold'
                                : m.isCompleted
                                ? 'bg-emerald-50/70 text-emerald-900 border-emerald-200 hover:bg-emerald-100/60'
                                : 'bg-white text-slate-700 border-[#DCE2E6] hover:bg-slate-50'
                            }`}
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <span
                                className={`w-7 h-7 rounded-sm font-black text-xs flex items-center justify-center shrink-0 ${
                                  isActive
                                    ? 'bg-white/20 text-white'
                                    : m.isCompleted
                                    ? 'bg-emerald-100 text-emerald-700'
                                    : !m.isUnlocked
                                    ? 'bg-slate-200 text-slate-400'
                                    : 'bg-[#EEF3F8] text-[#0B3D91]'
                                }`}
                              >
                                <IconComp className="w-3.5 h-3.5" />
                              </span>
                              <div className="min-w-0">
                                <div className="flex items-center gap-1.5">
                                  <span className="font-extrabold text-xs truncate">
                                    {typeof m.num === 'number' ? `${m.num}. ` : ''}{m.name}
                                  </span>
                                </div>
                                <span
                                  className={`text-[10px] block truncate ${
                                    isActive
                                      ? 'text-blue-100'
                                      : m.isCompleted
                                      ? 'text-emerald-600 font-semibold'
                                      : 'text-slate-400'
                                  }`}
                                >
                                  {m.description}
                                </span>
                              </div>
                            </div>

                            <span
                              className={`text-[10px] font-black px-2 py-0.5 rounded shrink-0 whitespace-nowrap ${
                                isActive
                                  ? 'bg-white/20 text-white'
                                  : m.isCompleted
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : !m.isUnlocked
                                  ? 'bg-slate-200 text-slate-500'
                                  : 'bg-blue-50 text-[#0B3D91]'
                              }`}
                            >
                              {m.badge}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* ========================================================= */}
            {/* RIGHT MAIN WORKSPACE: ACTIVE MODULE CONTENT               */}
            {/* ========================================================= */}
            <div className="lg:col-span-8 xl:col-span-9 space-y-6">
              {/* ========================================================= */}
              {/* STEP 1: VIDEO LECTURES                                    */}
              {/* ========================================================= */}
              {courseStepTab === 'videos' && (
                <div className="p-6 sm:p-8 rounded-sm bg-white border border-[#DCE2E6] space-y-6 shadow-xs">
                  {/* <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#DCE2E6] pb-4 gap-2">
                    <div>
                      <span className="text-[10px] font-black uppercase text-[#0B3D91] tracking-wider block">
                        MODULE 1 OF 6 • MULTIPLE VIDEO LECTURES (MUST COMPLETE 3/3)
                      </span>
                      <h3 className="text-xl font-black text-slate-900">
                        Video Lecture Series • {activeCourse.nameEng} ({activeCourse.nameNative}) for {sourceGlobalLang.nameEng} Speakers
                      </h3>
                      <p className="text-xs text-slate-500">
                        Watch all 3 curated high-definition video masterclasses in order. Each video unlocks the next sequentially. Click any video or day chapter below to pop up the interactive cinema video player!
                      </p>
                    </div>
                  </div> */}

                  {/* Featured Main Cinema Video Player Canvas */}
                  

                  {/* 3 Sequential Core Video Lesson Modules */}
                 

                  {/* ========================================================= */}
                  {/* 1. DAY-BY-DAY PACED CURRICULUM ROADMAP (SHOW DAYS FIRST)  */}
                  {/* ========================================================= */}
                  <div className="space-y-4 pt-4 border-t border-[#DCE2E6]">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-black uppercase text-[#0B3D91] tracking-wider block">
                          DAY-BY-DAY PACED CURRICULUM ROADMAP (SELECT A DAY)
                        </span>
                        <h4 className="text-base font-black text-slate-900">
                          7-Day Fast Track: {activeCourse.nameEng} via {sourceGlobalLang.nameEng}
                        </h4>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-[#EEF3F8] text-[#082C6C] text-xs font-black self-start sm:self-center">
                        ⚡ ~25 Mins / Day • Certified CEFR Standard
                      </span>
                    </div>

                    {/* 7 Interactive Day Selection Cards */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
                      {[
                        { day: 1, title: 'Alphabet & Script', levelTag: 'L1 Starter', icon: '🔤', chaptersCount: 3 },
                        { day: 2, title: 'Greetings & Cognates', levelTag: 'L1 Starter', icon: '💬', chaptersCount: 3 },
                        { day: 3, title: 'Grammar & Cases', levelTag: 'L2 Basic', icon: '🧩', chaptersCount: 3 },
                        { day: 4, title: 'Written Drills', levelTag: 'L2 Basic', icon: '✍️', chaptersCount: 2 },
                        { day: 5, title: 'Spoken AI Voice', levelTag: 'L3 Fluent', icon: '🗣️', chaptersCount: 3 },
                        { day: 6, title: 'Listening Test', levelTag: 'L3 Fluent', icon: '🎧', chaptersCount: 2 },
                        { day: 7, title: 'Master Diploma', levelTag: 'L4 Master', icon: '📜', chaptersCount: 2 }
                      ].map((d) => {
                        const isSelected = activeDayLesson === d.day;
                        return (
                          <button
                            key={d.day}
                            onClick={() => {
                              setActiveDayLesson(d.day);
                              if (d.day === 1 || d.day === 2) setActiveVideoIndex(1);
                              else if (d.day === 3 || d.day === 4) setActiveVideoIndex(2);
                              else setActiveVideoIndex(3);
                            }}
                            className={`p-3 rounded-sm border text-left transition flex flex-col justify-between gap-2 cursor-pointer ${
                              isSelected
                                ? 'bg-[#0B3D91] text-white border-[#082C6C] shadow-md ring-2 ring-[#FF9933]'
                                : 'bg-white text-slate-800 border-[#DCE2E6] hover:bg-slate-50'
                            }`}
                          >
                            <div className="flex items-center justify-between w-full">
                              <span className="text-base">{d.icon}</span>
                              <span
                                className={`text-[9px] font-black uppercase px-1.5 py-0.2 rounded ${
                                  isSelected ? 'bg-amber-400 text-slate-950 font-black' : 'bg-[#EEF3F8] text-[#0B3D91]'
                                }`}
                              >
                                Day {d.day}
                              </span>
                            </div>

                            <div>
                              <span
                                className={`text-[10px] font-black block truncate ${
                                  isSelected ? 'text-amber-200' : 'text-slate-400'
                                }`}
                              >
                                {d.levelTag}
                              </span>
                              <h5 className="font-extrabold text-xs line-clamp-1">{d.title}</h5>
                            </div>

                            <span
                              className={`text-[9px] font-bold block pt-1 border-t ${
                                isSelected ? 'border-white/20 text-white/90' : 'border-slate-100 text-slate-400'
                              }`}
                            >
                              {d.chaptersCount} Chapter Videos
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {/* ========================================================= */}
                    {/* 2. DEDICATED CHAPTER-WISE VIDEO LIST FOR SELECTED DAY     */}
                    {/* ========================================================= */}
                    {(() => {
                      const allDays = [
                        {
                          day: 1,
                          dayName: `Day 1: ${activeCourse.nameEng} Alphabet, Script & Phonetics Guide`,
                          levelTag: 'L1: Starter',
                          icon: '🔤',
                          chapters: [
                            {
                              chapterNum: 'Chapter 1.1',
                              title: `${activeCourse.nameEng} Vowels (स्वर), Script Signs (मात्रा) & Diacritics`,
                              duration: '10 Mins • HD 1080p',
                              desc: `Phonetic articulation of pure vowels, vowel diacritics, and pronunciation transliteration for ${sourceGlobalLang.nameEng} speakers.`,
                              vIndex: 1 as const
                            },
                            {
                              chapterNum: 'Chapter 1.2',
                              title: `${activeCourse.nameEng} Consonants (व्यंजन), Retroflex Sounds & Aspirations`,
                              duration: '12 Mins • HD 1080p',
                              desc: `Distinguishing aspirated vs unaspirated consonants (k/kh, p/ph) and dental vs retroflex stops with native audio examples.`,
                              vIndex: 1 as const
                            },
                            {
                              chapterNum: 'Chapter 1.3',
                              title: `${activeCourse.nameEng} Stroke Order, Conjuncts & Romanized Transliteration Guide`,
                              duration: '14 Mins • HD 1080p',
                              desc: `Interactive letter formation demo, top bar (shirorekha) rules, conjunct half-forms, and Devanagari/Indic script chart.`,
                              vIndex: 1 as const
                            }
                          ]
                        },
                        {
                          day: 2,
                          dayName: `Day 2: ${activeCourse.nameEng} Essential Greetings, Etiquette & Cognates`,
                          levelTag: 'L1: Starter',
                          icon: '💬',
                          chapters: [
                            {
                              chapterNum: 'Chapter 2.1',
                              title: `Formal & Informal Greetings, Namaste/Pranam Etiquette & Polite Registers`,
                              duration: '10 Mins • HD 1080p',
                              desc: `Everyday welcoming greetings, respect honorifics (जी / Ji), morning-to-night pleasantries, and polite response formulas.`,
                              vIndex: 1 as const
                            },
                            {
                              chapterNum: 'Chapter 2.2',
                              title: `Personal Pronouns (आप / तुम / मैं / हम) & Self-Introduction`,
                              duration: '12 Mins • HD 1080p',
                              desc: `Honorific levels (formal Aap vs informal Tum), gender agreement basics, and structured self-introduction templates.`,
                              vIndex: 1 as const
                            },
                            {
                              chapterNum: 'Chapter 2.3',
                              title: `Indo-European & Global Cognates, Shared Roots & Numbers 1–100`,
                              duration: '12 Mins • HD 1080p',
                              desc: `Connecting ${sourceGlobalLang.nameEng} vocabulary with ${activeCourse.nameEng} roots, Sanskrit cognates, and counting numerals.`,
                              vIndex: 1 as const
                            }
                          ]
                        },
                        {
                          day: 3,
                          dayName: `Day 3: Comparative Grammar, SOV Word Order & Cases`,
                          levelTag: 'L2: Basic',
                          icon: '🧩',
                          chapters: [
                            {
                              chapterNum: 'Chapter 3.1',
                              title: `Comparative Sentence Structure: SVO (${sourceGlobalLang.nameEng}) ⟷ SOV (${activeCourse.nameEng})`,
                              duration: '12 Mins • HD 1080p',
                              desc: `Mastering Subject-Object-Verb word order, predicate placing, and syntax inversion from western/global languages.`,
                              vIndex: 2 as const
                            },
                            {
                              chapterNum: 'Chapter 3.2',
                              title: `Verb Conjugations, Gender Agreement (ता/ती/ते) & Auxiliary Verbs (है/हैं)`,
                              duration: '14 Mins • HD 1080p',
                              desc: `Present habitual, continuous (रहा है), and past tenses with masculine/feminine subject concordance rules.`,
                              vIndex: 2 as const
                            },
                            {
                              chapterNum: 'Chapter 3.3',
                              title: `Postpositional Case Markers (ने, को, से, में, पर, का/की/के) & Negation (नहीं/मत)`,
                              duration: '14 Mins • HD 1080p',
                              desc: `Essential postpositions, oblique noun case transformations, and polite vs prohibitive negation rules.`,
                              vIndex: 2 as const
                            }
                          ]
                        },
                        {
                          day: 4,
                          dayName: `Day 4: Interactive Written Drills & Sentence Composition`,
                          levelTag: 'L2: Basic',
                          icon: '✍️',
                          chapters: [
                            {
                              chapterNum: 'Chapter 4.1',
                              title: `Morphological Suffixes, Postposition Bindings & Compound Word Derivation`,
                              duration: '11 Mins • HD 1080p',
                              desc: `Forming adjectives from nouns (वाला / dar / i), abstract noun derivations, and sandhi basics.`,
                              vIndex: 2 as const
                            },
                            {
                              chapterNum: 'Chapter 4.2',
                              title: `Structured Sentence Synthesis & Paragraph Composition`,
                              duration: '15 Mins • HD 1080p',
                              desc: `Writing complex sentences using conjunctions (क्योंकि, लेकिन, इसलिए) and descriptive narrative composition.`,
                              vIndex: 2 as const
                            }
                          ]
                        },
                        {
                          day: 5,
                          dayName: `Day 5: Spoken AI Voice Coach, Dialogues & Fluency`,
                          levelTag: 'L3: Fluent',
                          icon: '🗣️',
                          chapters: [
                            {
                              chapterNum: 'Chapter 5.1',
                              title: `Conversational Turn-Taking, Intonation Rhythm & Accent Modulation`,
                              duration: '12 Mins • HD 1080p',
                              desc: `Cadence of natural ${activeCourse.nameEng} speech, polite inquiry pitch, particle emphasis, and native inflection.`,
                              vIndex: 3 as const
                            },
                            {
                              chapterNum: 'Chapter 5.2',
                              title: `Real-Life Communicative Dialogues: Travel, Bazaar, Hospitality & Work`,
                              duration: '14 Mins • HD 1080p',
                              desc: `Authentic roleplays for ordering food, bargaining, navigating Indian cities, asking directions, and professional meetings.`,
                              vIndex: 3 as const
                            },
                            {
                              chapterNum: 'Chapter 5.3',
                              title: `Live AI Voice Simulation: Conversational Roleplay Masterclass`,
                              duration: '16 Mins • HD 1080p',
                              desc: `Interactive spoken dialogue simulation with real-time speech synthesis and acoustic pronunciation scoring.`,
                              vIndex: 3 as const
                            }
                          ]
                        },
                        {
                          day: 6,
                          dayName: `Day 6: Listening Comprehension Test & Native Accent Mastery`,
                          levelTag: 'L3: Fluent',
                          icon: '🎧',
                          chapters: [
                            {
                              chapterNum: 'Chapter 6.1',
                              title: `Fast-Speech Auditory Adaptation & Ambient Noise Filtering`,
                              duration: '12 Mins • HD 1080p',
                              desc: `Listening strategies for connected speech, colloquial contractions, regional Indian accents, and rapid dialogues.`,
                              vIndex: 3 as const
                            },
                            {
                              chapterNum: 'Chapter 6.2',
                              title: `Multi-Speaker Audio Comprehension Drills & Quick Recall Questions`,
                              duration: '14 Mins • HD 1080p',
                              desc: `Analyzing cultural stories, radio announcements, and multi-speaker dialogues with instant quiz validation.`,
                              vIndex: 3 as const
                            }
                          ]
                        },
                        {
                          day: 7,
                          dayName: `Day 7: Final International Exam & Diploma Capstone`,
                          levelTag: 'L4: Master',
                          icon: '📜',
                          chapters: [
                            {
                              chapterNum: 'Chapter 7.1',
                              title: `Comprehensive Capstone Review (Alphabet + Grammar + High-Frequency Vocabulary)`,
                              duration: '15 Mins • HD 1080p',
                              desc: `Full roadmap synthesis covering key grammar checkpoints, exam techniques, and speaking assessment preparation.`,
                              vIndex: 3 as const
                            },
                            {
                              chapterNum: 'Chapter 7.2',
                              title: `International Diploma Certification Defense & Issuance Guide`,
                              duration: '18 Mins • HD 1080p',
                              desc: `Step-by-step instructions to unlock and claim your official MEA/ICCR verified Bilingual International Diploma.`,
                              vIndex: 3 as const
                            }
                          ]
                        }
                      ];

                      const currentDayData = allDays.find((d) => d.day === activeDayLesson) || allDays[0];

                      return (
                        <div className="space-y-3 pt-2">
                          <div className="p-3 bg-[#EEF3F8] border border-[#D0DCE7] rounded-sm flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-xl">{currentDayData.icon}</span>
                              <div>
                                <h5 className="text-xs sm:text-sm font-black text-slate-900">
                                  {currentDayData.dayName} ({currentDayData.levelTag})
                                </h5>
                                <span className="text-[11px] text-slate-500 font-semibold">
                                  {currentDayData.chapters.length} Video Chapters available • Click any chapter to pop up video player
                                </span>
                              </div>
                            </div>
                            <span className="px-2.5 py-1 rounded bg-[#0B3D91] text-white font-black text-xs">
                              Day {currentDayData.day} Active
                            </span>
                          </div>

                          {/* Chapter Video Cards for Selected Day */}
                          <div className="grid grid-cols-1 gap-3">
                            {currentDayData.chapters.map((ch, idx) => (
                              <div
                                key={idx}
                                onClick={() => {
                                  setActiveVideoIndex(ch.vIndex);
                                  setActiveVideoModal({
                                    videoIndex: ch.vIndex,
                                    day: currentDayData.day,
                                    title: `${ch.chapterNum}: ${ch.title}`,
                                    description: ch.desc
                                  });
                                  setVideoModalPlaying(true);
                                  playDubbedSpeech(selectedDubLang);
                                }}
                                className="p-4 rounded-sm border border-[#DCE2E6] bg-white hover:border-[#0B3D91] hover:shadow-md transition flex flex-col md:flex-row items-start md:items-center justify-between gap-4 cursor-pointer group"
                              >
                                <div className="flex items-start gap-3.5 flex-1">
                                  <div className="w-10 h-10 rounded-sm bg-[#EEF3F8] group-hover:bg-[#0B3D91] text-[#0B3D91] group-hover:text-white font-black text-xs flex items-center justify-center shrink-0 transition">
                                    <Play className="w-4 h-4 fill-current ml-0.5" />
                                  </div>
                                  <div className="space-y-1.5 flex-1">
                                    <div className="flex flex-wrap items-center gap-2">
                                      <span className="font-black text-xs text-[#0B3D91] bg-blue-50 px-2 py-0.5 rounded">
                                        {ch.chapterNum}
                                      </span>
                                      <span className="text-[11px] text-slate-500 font-bold">
                                        • {ch.duration}
                                      </span>
                                      <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                                        HD 1080p
                                      </span>
                                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-200 flex items-center gap-1">
                                        <Mic className="w-3 h-3 text-amber-600" /> Dubbed in 19+ Langs
                                      </span>
                                    </div>
                                    <h5 className="font-extrabold text-sm text-slate-900 group-hover:text-[#0B3D91] transition">
                                      {ch.title}
                                    </h5>
                                    <p className="text-xs text-slate-500 line-clamp-1">{ch.desc}</p>

                                    {/* Quick Dubbing Language Chips on Card */}
                                    <div className="flex flex-wrap items-center gap-1.5 pt-1" onClick={(e) => e.stopPropagation()}>
                                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                                        🎙️ Dub:
                                      </span>
                                      {[
                                        { key: 'en', flag: '🇬🇧', name: 'English' },
                                        { key: 'hi', flag: '🇮🇳', name: 'Hindi' },
                                        { key: 'fa', flag: '🇮🇷', name: 'Farsi' },
                                        { key: 'es', flag: '🇪🇸', name: 'Spanish' },
                                        { key: 'ta', flag: '🇮🇳', name: 'Tamil' }
                                      ].map((dl) => (
                                        <button
                                          key={dl.key}
                                          onClick={() => {
                                            setSelectedDubLang(dl.key);
                                            setActiveVideoIndex(ch.vIndex);
                                            setActiveVideoModal({
                                              videoIndex: ch.vIndex,
                                              day: currentDayData.day,
                                              title: `${ch.chapterNum}: ${ch.title}`,
                                              description: ch.desc
                                            });
                                            setVideoModalPlaying(true);
                                            playDubbedSpeech(dl.key);
                                          }}
                                          className={`px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1 transition ${
                                            selectedDubLang === dl.key
                                              ? 'bg-[#0B3D91] text-white'
                                              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                                          }`}
                                        >
                                          <span>{dl.flag}</span>
                                          <span>{dl.name}</span>
                                        </button>
                                      ))}
                                      <button
                                        onClick={() => setShowDubbingModal(true)}
                                        className="px-2 py-0.5 rounded text-[10px] font-black bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300"
                                      >
                                        + 19 Dubs
                                      </button>
                                    </div>
                                  </div>
                                </div>

                                <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setActiveVideoIndex(ch.vIndex);
                                      setActiveVideoModal({
                                        videoIndex: ch.vIndex,
                                        day: currentDayData.day,
                                        title: `${ch.chapterNum}: ${ch.title}`,
                                        description: ch.desc
                                      });
                                      setVideoModalPlaying(true);
                                      playDubbedSpeech(selectedDubLang);
                                    }}
                                    className="px-4 py-2.5 rounded-sm bg-[#0B3D91] hover:bg-[#082C6C] text-white font-extrabold text-xs flex items-center gap-1.5 shadow-sm transition group-hover:scale-102"
                                  >
                                    <Play className="w-3.5 h-3.5 fill-current" /> Pop Video ↗
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="p-3 bg-amber-50 border border-amber-200 rounded-sm text-xs text-amber-900 font-medium flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                            <span>💡 Tip: Click any day or chapter above to immediately pop up the interactive high-definition cinema video masterclass!</span>
                          </div>
                        </div>
                      );
                    })()}
                  </div>

                  {/* Proceed to Step 2 */}
                  {(() => {
                    const prog = getStepProgress(activeCourse.code);
                    const allVideosDone = prog.videosCompleted;

                    return (
                      <div className="pt-4 border-t border-[#DCE2E6] flex flex-col sm:flex-row items-center justify-between gap-3">
                        <span className="text-xs text-slate-500 font-medium">
                          {!allVideosDone ? '⚠️ Watch & mark all 3 videos finished to unlock Step 2.' : '✅ 3/3 Videos Finished! Step 2 is now unlocked.'}
                        </span>
                        <button
                          disabled={!allVideosDone}
                          onClick={() => setCourseStepTab('reading')}
                          className={`px-6 py-3 rounded-sm font-bold text-xs flex items-center gap-2 transition ${
                            !allVideosDone
                              ? 'bg-slate-200 text-slate-400 border border-[#D0DCE7] cursor-not-allowed'
                              : 'bg-[#0B3D91] hover:bg-[#082C6C] text-white shadow-md hover:scale-101'
                          }`}
                        >
                          {!allVideosDone ? '🔒 Complete All 3 Videos First' : 'Proceed to Step 2: Reading & Grammar →'}
                        </button>
                      </div>
                    );
                  })()}
                </div>
              )}

              {/* ========================================================= */}
              {/* STEP 2: READING & GRAMMAR COMPREHENSION                   */}
              {/* ========================================================= */}
              {courseStepTab === 'reading' && (
                <div className="p-6 sm:p-8 rounded-sm bg-white border border-[#DCE2E6] space-y-6 shadow-xs">
                  <div className="flex items-center justify-between border-b border-[#DCE2E6] pb-4">
                    <div>
                      <span className="text-[10px] font-black uppercase text-[#0B3D91] tracking-wider block">
                        MODULE 2 OF 6 • READING & GRAMMAR COMPREHENSION
                      </span>
                      <h3 className="text-xl font-black text-slate-900">
                        {activeCourse.nameEng} ({activeCourse.nameNative}) Reading Passage & Grammar Breakdown
                      </h3>
                      <p className="text-xs text-slate-500">
                        Read the dual-language passage, examine grammar structures, and review vocabulary notes.
                      </p>
                    </div>
                  </div>

                  {/* Dual Language Reading Card */}
                  <div className="p-6 rounded-sm bg-[#EEF3F8]/50 border border-[#DCE2E6] space-y-5">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full bg-blue-100 text-[#0B3D91] font-black text-xs">
                        📖 Dual-Language Reading Passage
                      </span>
                      <button
                        onClick={() => playAudio(activeCourse.samplePassage, activeCourse.ttsCode)}
                        className="px-3 py-1.5 rounded-sm bg-[#0B3D91] hover:bg-[#082C6C] text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition"
                      >
                        <Volume2 className="w-4 h-4" /> Listen Native Audio
                      </button>
                    </div>

                    <div className="space-y-3 bg-white p-5 rounded-sm border border-[#DCE2E6]">
                      <h4 className="text-base font-black text-slate-900 leading-relaxed font-serif">
                        {activeCourse.samplePassage}
                      </h4>
                      <div className="p-3 bg-slate-50 border-l-4 border-[#0B3D91] text-xs sm:text-sm text-slate-700 font-medium">
                        <span className="font-bold text-slate-900 block mb-1">Translation in {sourceGlobalLang.nameEng}:</span>
                        &quot;India is a vast and culturally diverse nation. Its languages are replete with profound knowledge, literature, and philosophy.&quot;
                      </div>
                    </div>

                    {/* Key Grammar Insights Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                      <div className="p-4 bg-white rounded-sm border border-[#DCE2E6] space-y-1">
                        <span className="text-slate-400 block text-[10px] font-black uppercase">Sample Greeting</span>
                        <span className="font-black text-slate-900 text-sm">{activeCourse.sampleGreeting}</span>
                        <span className="text-[#0B3D91] block text-[11px] font-semibold">{activeCourse.pronunciationGuide}</span>
                      </div>

                      <div className="p-4 bg-white rounded-sm border border-[#DCE2E6] space-y-1">
                        <span className="text-slate-400 block text-[10px] font-black uppercase">Sentence Structure</span>
                        <span className="font-bold text-slate-900">{activeCourse.grammarFeature}</span>
                        <span className="text-emerald-600 block font-bold text-[11px]">Bilingual Bridge Active</span>
                      </div>

                      <div className="p-4 bg-white rounded-sm border border-[#DCE2E6] space-y-1">
                        <span className="text-slate-400 block text-[10px] font-black uppercase">Shared Cognate Bridge</span>
                        <span className="font-bold text-slate-900">{activeCourse.cognateFromEnglish.indian}</span>
                        <span className="text-amber-700 block font-bold text-[11px]">
                          {activeCourse.cognateFromEnglish.foreign} ({activeCourse.cognateFromEnglish.meaning})
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Mark Completed & Next */}
                  {(() => {
                    const prog = getStepProgress(activeCourse.code);
                    return (
                      <div className="pt-4 border-t border-[#DCE2E6] flex flex-col sm:flex-row items-center justify-between gap-3">
                        <span className="text-xs text-slate-500 font-medium">
                          {prog.readingCompleted ? '✅ Reading & Grammar verified.' : 'Complete this reading unit to unlock Written Practice.'}
                        </span>
                        <button
                          onClick={() => {
                            updateProgress(activeCourse.code, { readingCompleted: true });
                            setCourseStepTab('writing');
                          }}
                          className="px-6 py-3 rounded-sm bg-[#0B3D91] hover:bg-[#082C6C] text-white font-bold text-xs flex items-center gap-2 shadow-md transition"
                        >
                          Mark Done & Proceed to Step 3: Written Practice →
                        </button>
                      </div>
                    );
                  })()}
                </div>
              )}

              {/* ========================================================= */}
              {/* STEP 3: WRITTEN PRACTICE STUDIO                           */}
              {/* ========================================================= */}
              {courseStepTab === 'writing' && (
                <div className="p-6 sm:p-8 rounded-sm bg-white border border-[#DCE2E6] space-y-6 shadow-xs">
                  <div className="flex items-center justify-between border-b border-[#DCE2E6] pb-4">
                    <div>
                      <span className="text-[10px] font-black uppercase text-[#0B3D91] tracking-wider block">
                        MODULE 3 OF 6 • SCRIPT & WRITTEN PRACTICE STUDIO
                      </span>
                      <h3 className="text-xl font-black text-slate-900">
                        {activeCourse.nameEng} ({activeCourse.scriptName}) Script Composition Pad
                      </h3>
                      <p className="text-xs text-slate-500">
                        Write a short introductory paragraph in {activeCourse.nameEng} or Romanized script to test your written syntax.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-amber-50 border border-amber-200 rounded-sm text-xs text-amber-900 space-y-1">
                      <span className="font-bold block">Writing Prompt:</span>
                      <p>
                        Introduce yourself in {activeCourse.nameEng}. Mention your name, country of origin, and why you are learning {activeCourse.nameEng}.
                      </p>
                    </div>

                    <textarea
                      rows={5}
                      value={progressMap[activeCourse.code]?.writingAnswer || ''}
                      onChange={(e) => updateProgress(activeCourse.code, { writingAnswer: e.target.value })}
                      placeholder={`Type your composition in ${activeCourse.nameEng} or transliteration (e.g., Namaste! Mera naam John hai aur main ${activeCourse.nameEng} seekh raha hoon...)`}
                      className="w-full p-4 rounded-sm border border-[#DCE2E6] text-xs sm:text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#0B3D91]"
                    />

                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                      <span className="text-xs text-slate-500">
                        Words: {(progressMap[activeCourse.code]?.writingAnswer || '').trim().split(/\s+/).filter(Boolean).length}
                      </span>
                      <button
                        onClick={() => {
                          updateProgress(activeCourse.code, { writingCompleted: true });
                          alert('✅ Written composition evaluated and recorded successfully! Step 4 is unlocked.');
                          setCourseStepTab('speaking');
                        }}
                        className="px-6 py-3 rounded-sm bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 shadow-md transition"
                      >
                        Submit Writing & Unlock Speaking Coach →
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* ========================================================= */}
              {/* GUIDED STUDY MODULES (PDFS)                               */}
              {/* ========================================================= */}
              {courseStepTab === 'guided-learning' && (
                <div className="p-6 sm:p-8 rounded-sm bg-white border border-[#DCE2E6] space-y-6 shadow-xs">
                  <div className="flex items-center justify-between border-b border-[#DCE2E6] pb-4">
                    <div>
                      <span className="text-[10px] font-black uppercase text-emerald-700 tracking-wider block">
                        AUTHENTIC REFERENCE MATERIALS • GUIDED STUDY MODULES
                      </span>
                      <h3 className="text-xl font-black text-slate-900">
                        Downloadable PDF Study Guides & Grammar Handbooks
                      </h3>
                      <p className="text-xs text-slate-500">
                        High-resolution bilingual PDF reference textbooks curated by Central Institute of Indian Languages (CIIL) & ICCR.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { title: `${activeCourse.nameEng} Script & Stroke Order Handbook`, size: '4.2 MB', pages: '48 Pages', tag: 'Script Guide' },
                      { title: `Comparative Grammar: ${sourceGlobalLang.nameEng} to ${activeCourse.nameEng}`, size: '8.1 MB', pages: '112 Pages', tag: 'Grammar Reference' },
                      { title: `1000 High-Frequency ${activeCourse.nameEng} Vocabulary & Cognates`, size: '3.6 MB', pages: '64 Pages', tag: 'Vocabulary' },
                      { title: `Official International Diplomat Phrasebook (${activeCourse.nameEng})`, size: '5.4 MB', pages: '82 Pages', tag: 'Diplomacy' }
                    ].map((pdf, idx) => (
                      <div key={idx} className="p-5 rounded-sm bg-slate-50 border border-[#DCE2E6] flex items-center justify-between gap-4">
                        <div className="space-y-1">
                          <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase">
                            {pdf.tag}
                          </span>
                          <h4 className="font-extrabold text-xs text-slate-900">{pdf.title}</h4>
                          <span className="text-[11px] text-slate-500">{pdf.pages} • {pdf.size} • PDF Format</span>
                        </div>
                        <button
                          onClick={() => alert(`📥 Downloading "${pdf.title}"...`)}
                          className="p-3 rounded-sm bg-[#0B3D91] hover:bg-[#082C6C] text-white shadow-sm transition"
                          title="Download PDF"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ========================================================= */}
              {/* STEP 4: SPEAKING AI COACH                                 */}
              {/* ========================================================= */}
              {courseStepTab === 'speaking' && (
                <div className="p-6 sm:p-8 rounded-sm bg-white border border-[#DCE2E6] space-y-6 shadow-xs">
                  <div className="flex items-center justify-between border-b border-[#DCE2E6] pb-4">
                    <div>
                      <span className="text-[10px] font-black uppercase text-[#0B3D91] tracking-wider block">
                        MODULE 4 OF 6 • REAL-TIME AI SPEAKING & INTONATION COACH
                      </span>
                      <h3 className="text-xl font-black text-slate-900">
                        {activeCourse.nameEng} Pronunciation Evaluator
                      </h3>
                      <p className="text-xs text-slate-500">
                        Listen to the native reference audio, then record your speech to evaluate phonetics and intonation.
                      </p>
                    </div>
                  </div>

                  <div className="p-6 rounded-sm bg-slate-900 text-white space-y-6 text-center">
                    <div className="space-y-2">
                      <span className="text-amber-400 text-xs font-bold uppercase tracking-wider">Pronunciation Target Phrase:</span>
                      <h4 className="text-2xl sm:text-3xl font-black text-white">{activeCourse.sampleGreeting}</h4>
                      <p className="text-sm text-slate-300 font-mono">({activeCourse.pronunciationGuide})</p>
                    </div>

                    <div className="flex items-center justify-center gap-4">
                      <button
                        onClick={() => playAudio(activeCourse.sampleGreeting, activeCourse.ttsCode)}
                        className="px-5 py-2.5 rounded-sm bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-2 border border-white/20 transition"
                      >
                        <Volume2 className="w-4 h-4" /> Listen Target Audio
                      </button>

                      <button
                        onClick={() => {
                          setIsRecordingSpeaking(true);
                          setSpeakingFeedback(null);
                          setTimeout(() => {
                            setIsRecordingSpeaking(false);
                            setSpeakingFeedback('🎉 Outstanding Pronunciation! Score: 96% — Clear vowel length and retroflex consonants.');
                            updateProgress(activeCourse.code, { speakingCompleted: true, speakingScore: 96 });
                          }, 2500);
                        }}
                        className={`px-6 py-2.5 rounded-sm font-extrabold text-xs flex items-center gap-2 transition ${
                          isRecordingSpeaking
                            ? 'bg-red-600 text-white animate-pulse'
                            : 'bg-[#FF9933] text-slate-950 hover:bg-amber-400'
                        }`}
                      >
                        <Mic className="w-4 h-4" /> {isRecordingSpeaking ? 'Recording & Evaluating...' : 'Start Voice Recording'}
                      </button>
                    </div>

                    {speakingFeedback && (
                      <div className="p-4 bg-emerald-500/20 border border-emerald-400/30 rounded-sm text-emerald-300 text-xs font-bold animate-in fade-in">
                        {speakingFeedback}
                      </div>
                    )}
                  </div>

                  {(() => {
                    const prog = getStepProgress(activeCourse.code);
                    return (
                      <div className="pt-4 border-t border-[#DCE2E6] flex flex-col sm:flex-row items-center justify-between gap-3">
                        <span className="text-xs text-slate-500 font-medium">
                          {prog.speakingCompleted ? '✅ Speaking module verified.' : 'Record your speech to unlock Listening Test.'}
                        </span>
                        <button
                          disabled={!prog.speakingCompleted}
                          onClick={() => setCourseStepTab('listening')}
                          className={`px-6 py-3 rounded-sm font-bold text-xs flex items-center gap-2 transition ${
                            !prog.speakingCompleted
                              ? 'bg-slate-200 text-slate-400 border border-[#D0DCE7] cursor-not-allowed'
                              : 'bg-[#0B3D91] hover:bg-[#082C6C] text-white shadow-md'
                          }`}
                        >
                          Proceed to Step 5: Listening Test →
                        </button>
                      </div>
                    );
                  })()}
                </div>
              )}

              {/* ========================================================= */}
              {/* STEP 5: LISTENING TEST                                    */}
              {/* ========================================================= */}
              {courseStepTab === 'listening' && (
                <div className="p-6 sm:p-8 rounded-sm bg-white border border-[#DCE2E6] space-y-6 shadow-xs">
                  <div className="flex items-center justify-between border-b border-[#DCE2E6] pb-4">
                    <div>
                      <span className="text-[10px] font-black uppercase text-[#0B3D91] tracking-wider block">
                        MODULE 5 OF 6 • NATIVE ACCENT LISTENING COMPREHENSION
                      </span>
                      <h3 className="text-xl font-black text-slate-900">
                        {activeCourse.nameEng} Auditory Comprehension Drill
                      </h3>
                      <p className="text-xs text-slate-500">
                        Listen to the spoken audio clip and select the correct contextual meaning.
                      </p>
                    </div>
                  </div>

                  <div className="p-6 bg-slate-50 rounded-sm border border-[#DCE2E6] space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-700">Audio Clip 1 (Native Speed):</span>
                      <button
                        onClick={() => playAudio(activeCourse.sampleGreeting, activeCourse.ttsCode)}
                        className="px-4 py-2 rounded-sm bg-[#0B3D91] text-white text-xs font-bold flex items-center gap-2 shadow-sm"
                      >
                        <Volume2 className="w-4 h-4" /> Play Audio Clip
                      </button>
                    </div>

                    <div className="space-y-2 pt-2">
                      <span className="font-bold text-xs text-slate-900 block">Question: What is being conveyed in this audio clip?</span>
                      <div className="space-y-2 text-xs">
                        {[
                          { id: 1, text: `1. A formal respectful greeting welcoming you in ${activeCourse.nameEng}` },
                          { id: 2, text: '2. An urgent request for directions to the railway station' },
                          { id: 3, text: '3. A business negotiation discussing commercial trade terms' }
                        ].map((opt) => (
                          <div
                            key={opt.id}
                            onClick={() => {
                              updateProgress(activeCourse.code, { listeningCompleted: true, listeningAnswer: opt.id });
                            }}
                            className={`p-3 rounded-sm border cursor-pointer font-medium transition flex items-center justify-between ${
                              progressMap[activeCourse.code]?.listeningAnswer === opt.id
                                ? 'bg-emerald-50 border-emerald-400 text-emerald-900 font-bold'
                                : 'bg-white border-[#DCE2E6] hover:bg-slate-100 text-slate-700'
                            }`}
                          >
                            <span>{opt.text}</span>
                            {progressMap[activeCourse.code]?.listeningAnswer === opt.id && (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {(() => {
                    const prog = getStepProgress(activeCourse.code);
                    return (
                      <div className="pt-4 border-t border-[#DCE2E6] flex flex-col sm:flex-row items-center justify-between gap-3">
                        <span className="text-xs text-slate-500 font-medium">
                          {prog.listeningCompleted ? '✅ Listening test answered.' : 'Select an answer to unlock Final Exam.'}
                        </span>
                        <button
                          disabled={!prog.listeningCompleted}
                          onClick={() => setCourseStepTab('exam')}
                          className={`px-6 py-3 rounded-sm font-bold text-xs flex items-center gap-2 transition ${
                            !prog.listeningCompleted
                              ? 'bg-slate-200 text-slate-400 border border-[#D0DCE7] cursor-not-allowed'
                              : 'bg-[#0B3D91] hover:bg-[#082C6C] text-white shadow-md'
                          }`}
                        >
                          Proceed to Step 6: Final Exam →
                        </button>
                      </div>
                    );
                  })()}
                </div>
              )}

              {/* ========================================================= */}
              {/* STEP 6: FINAL EXAM ASSESSMENT                             */}
              {/* ========================================================= */}
              {courseStepTab === 'exam' && (
                <div className="p-6 sm:p-8 rounded-sm bg-white border border-[#DCE2E6] space-y-6 shadow-xs">
                  <div className="flex items-center justify-between border-b border-[#DCE2E6] pb-4">
                    <div>
                      <span className="text-[10px] font-black uppercase text-[#0B3D91] tracking-wider block">
                        MODULE 6 OF 6 • INTERNATIONAL DIPLOMA CERTIFICATION EXAM
                      </span>
                      <h3 className="text-xl font-black text-slate-900">
                        अंतिम मूल्यांकन परीक्षा • Final Assessment Exam
                      </h3>
                      <p className="text-xs text-slate-500">
                        Pass the final assessment to unlock your official ICCR & MEA Accredited International Diploma in {activeCourse.nameEng}.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-5 rounded-sm bg-slate-50 border border-[#DCE2E6] space-y-3 text-xs">
                      <span className="font-black text-slate-900 text-sm block">
                        Q1: What is the primary sentence word order in {activeCourse.nameEng}?
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 font-bold">
                        <span className="p-3 bg-emerald-50 border border-emerald-400 text-emerald-900 rounded-sm flex items-center justify-between">
                          <span>1. SOV (Subject - Object - Verb)</span>
                          <Check className="w-4 h-4 text-emerald-600" />
                        </span>
                        <span className="p-3 bg-white border border-[#DCE2E6] text-slate-600 rounded-sm">
                          2. SVO (Subject - Verb - Object)
                        </span>
                      </div>
                    </div>

                    <div className="p-5 rounded-sm bg-slate-50 border border-[#DCE2E6] space-y-3 text-xs">
                      <span className="font-black text-slate-900 text-sm block">
                        Q2: Which script is officially used to write {activeCourse.nameEng}?
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 font-bold">
                        <span className="p-3 bg-emerald-50 border border-emerald-400 text-emerald-900 rounded-sm flex items-center justify-between">
                          <span>1. {activeCourse.scriptName}</span>
                          <Check className="w-4 h-4 text-emerald-600" />
                        </span>
                        <span className="p-3 bg-white border border-[#DCE2E6] text-slate-600 rounded-sm">
                          2. Cyrillic Alphabet
                        </span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-[#DCE2E6] flex flex-col sm:flex-row items-center justify-between gap-3">
                      <span className="text-xs text-emerald-600 font-bold flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" /> Passing Score: 98% (Grade A+ International Distinction)
                      </span>
                      <button
                        onClick={() => {
                          updateProgress(activeCourse.code, {
                            video1Done: true,
                            video2Done: true,
                            video3Done: true,
                            readingCompleted: true,
                            writingCompleted: true,
                            speakingCompleted: true,
                            speakingScore: 96,
                            listeningCompleted: true,
                            examCompleted: true,
                            examScore: 98
                          });
                          addXpToUser(100);
                          try {
                            confetti({ particleCount: 180, spread: 90, origin: { y: 0.5 } });
                          } catch (e) {
                            console.log(e);
                          }
                          setCourseStepTab('certificate');
                        }}
                        className="px-8 py-3.5 rounded-sm bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-emerald-600/20 transition hover:scale-105"
                      >
                        Submit Exam & Generate International Diploma →
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* ========================================================= */}
              {/* STEP 7: INTERNATIONAL DIPLOMA CERTIFICATE                 */}
              {/* ========================================================= */}
              {courseStepTab === 'certificate' && (
                <div className="space-y-6">
                  <div className="p-8 sm:p-12 rounded-sm bg-white border-8 border-double border-[#0B3D91] shadow-2xl text-center space-y-6 relative overflow-hidden max-w-4xl mx-auto">
                    <div className="flex items-center justify-between border-b-2 border-[#DCE2E6] pb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">🏛️</span>
                        <div className="text-left">
                          <span className="font-extrabold text-xs text-[#082C6C] uppercase tracking-widest block">
                            GOVERNMENT OF INDIA • ICCR & MEA
                          </span>
                          <span className="text-[10px] text-slate-500 font-semibold block">
                            Central Institute of Indian Languages (CIIL)
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="px-3 py-1 bg-amber-100 text-amber-900 border border-amber-300 rounded-full font-black text-[11px]">
                          OFFICIAL VERIFIABLE CREDENTIAL
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3 py-2 text-slate-700 text-xs sm:text-sm leading-relaxed">
                      <p className="italic">This International Diploma of Academic Excellence is proudly conferred upon</p>
                      <h3 className="text-2xl sm:text-3xl font-black text-[#082C6C] border-b-2 border-[#DCE2E6] pb-1 inline-block font-serif">
                        {user?.name || 'Alexander Wright (एलेक्जेंडर राइट)'}
                      </h3>
                      <p>
                        having successfully completed all 6 modules of Video Masterclasses, Reading & Grammar, Script Studio, Speaking AI Coach, Listening Comprehension, and Final Certification Examination for:
                      </p>
                      <div className="p-4 rounded-sm bg-[#EEF3F8]/80 border border-[#D0DCE7] font-extrabold text-base text-[#082C6C]">
                        {activeCourse.flagIcon} &quot;International Diploma in {activeCourse.nameEng} ({activeCourse.nameNative})&quot;
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#DCE2E6] text-xs text-center max-w-2xl mx-auto">
                      <div className="p-3 bg-slate-50 rounded-sm border border-[#DCE2E6]">
                        <span className="text-slate-400 block text-[10px]">FINAL ASSESSMENT SCORE</span>
                        <span className="font-black text-emerald-600 text-base">98.0%</span>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-sm border border-[#DCE2E6]">
                        <span className="text-slate-400 block text-[10px]">GLOBAL DISTINCTION</span>
                        <span className="font-black text-[#0B3D91] text-base">Summa Cum Laude</span>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-sm border border-[#DCE2E6]">
                        <span className="text-slate-400 block text-[10px]">DIPLOMA ID</span>
                        <span className="font-mono font-bold text-slate-800 text-xs">INT-F2I-2026-{Math.floor(100000 + Math.random() * 900000)}</span>
                      </div>
                    </div>

                    <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-6 max-w-2xl mx-auto text-left border-t border-[#DCE2E6] text-xs">
                      <div className="space-y-1">
                        <span className="font-serif italic font-bold text-slate-900 block">डॉ. देवेन्द्र शर्मा</span>
                        <span className="text-[10px] text-slate-400 font-bold uppercase">Director of International Studies (ICCR)</span>
                      </div>

                      <div className="text-center">
                        <img
                          src="https://api.qrserver.com/v1/create-qr-code/?size=90x90&data=https://hindi-lms.org/certificates/verify/INT-F2I-2026-981240"
                          alt="Verified QR Code"
                          className="w-16 h-16 mx-auto rounded-lg border border-[#D0DCE7] p-1 bg-white"
                        />
                        <span className="text-[9px] text-slate-400 block mt-1">Scan for Global Verification</span>
                      </div>

                      <div className="space-y-1 text-right">
                        <span className="font-serif italic font-bold text-slate-900 block">Prof. Elena Rostova</span>
                        <span className="text-[10px] text-slate-400 font-bold uppercase">Dean of Global Languages</span>
                      </div>
                    </div>
                  </div>

                  {/* Diploma Actions */}
                  <div className="flex items-center justify-center gap-3">
                    <button
                      onClick={() => window.print()}
                      className="px-6 py-3 rounded-sm bg-[#0B3D91] hover:bg-[#082C6C] text-white font-bold text-xs flex items-center gap-2 shadow-md transition"
                    >
                      <Printer className="w-4 h-4" /> Print Official Diploma
                    </button>

                    <button
                      onClick={() => alert('📥 Downloading official high-resolution PDF International Diploma...')}
                      className="px-6 py-3 rounded-sm bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-2 shadow-md transition"
                    >
                      <Download className="w-4 h-4" /> Download PDF Diploma
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* ========================================================= */
        /* 3. NORMAL CATALOGUE / MY DIPLOMAS / MATRIX VIEW           */
        /* ========================================================= */
        <>
          {/* Navigation Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-2.5 rounded-sm border border-[#DCE2E6] shadow-xs">
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2.5 rounded-sm font-bold text-xs transition flex items-center gap-2 ${
                  activeTab === 'all'
                    ? 'bg-[#0B3D91] text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Globe className="w-4 h-4" /> All 22 Indian Languages
              </button>

              <button
                onClick={() => setActiveTab('my-diplomas')}
                className={`px-4 py-2.5 rounded-sm font-bold text-xs transition flex items-center gap-2 relative ${
                  activeTab === 'my-diplomas'
                    ? 'bg-[#0B3D91] text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <GraduationCap className="w-4 h-4" /> My Enrolled Diplomas ({enrolledLanguagesList.length})
              </button>

              <button
                onClick={() => setActiveTab('matrix')}
                className={`px-4 py-2.5 rounded-sm font-bold text-xs transition flex items-center gap-2 ${
                  activeTab === 'matrix'
                    ? 'bg-[#0B3D91] text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Compass className="w-4 h-4" /> 22-Language Comparative Matrix
              </button>
            </div>

            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by language, script, region..."
                className="pl-9 pr-4 py-2 rounded-sm bg-slate-50 border border-[#DCE2E6] text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#0B3D91] w-full sm:w-64"
              />
            </div>
          </div>

          {/* Category Filter Pills */}
          {activeTab === 'all' && (
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              <span className="text-xs font-bold text-slate-400 flex items-center gap-1 shrink-0">
                <Sliders className="w-3.5 h-3.5" /> Zone:
              </span>
              {[
                'All',
                'North & Hindi Belt',
                'South Dravidian',
                'East & North-East',
                'West & Central',
                'Classical & Ancient'
              ].map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3.5 py-1.5 rounded-sm text-xs font-bold transition whitespace-nowrap ${
                    selectedCategory === category
                      ? 'bg-[#0B3D91] text-white shadow-sm'
                      : 'bg-white text-slate-600 border border-[#DCE2E6] hover:bg-slate-50'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          )}

          {/* MAIN 22 LANGUAGES CARD GRID */}
          {activeTab === 'all' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredLanguages.map((lang) => {
                const prog = getStepProgress(lang.code);
                const enrolled = isEnrolledInLanguage(lang.code);

                return (
                  <div
                    key={lang.code}
                    className="group bg-white rounded-sm border border-[#DCE2E6] overflow-hidden shadow-2xs hover:shadow-xl hover:border-[#0B3D91] transition-all flex flex-col justify-between"
                  >
                    <div>
                      {/* Top Banner */}
                      <div className={`p-5 bg-gradient-to-r ${lang.bannerGradient} text-white space-y-2 relative overflow-hidden`}>
                        <div className="flex items-center justify-between">
                          <span className="px-2.5 py-0.5 rounded-full bg-black/20 text-white font-extrabold uppercase text-[10px] tracking-wider border border-white/20">
                            {lang.category}
                          </span>
                          <span className="text-2xl">{lang.flagIcon}</span>
                        </div>

                        <div>
                          <span className="text-[11px] font-bold text-white/80 block uppercase tracking-wider">
                            {lang.scriptName}
                          </span>
                          <h3 className="text-xl font-black text-white flex items-center gap-2">
                            <span>{lang.nameEng}</span>
                            <span className="text-base font-normal opacity-90">({lang.nameNative})</span>
                          </h3>
                        </div>
                      </div>

                      {/* Content details */}
                      <div className="p-5 space-y-4 text-xs">
                        <div className="p-3 bg-[#EEF3F8] rounded-sm border border-[#D0DCE7] space-y-1">
                          <span className="text-[10px] font-black uppercase text-[#0B3D91] block">
                            Native Greeting ({sourceGlobalLang.nameEng} Audio):
                          </span>
                          <div className="flex items-center justify-between font-bold text-slate-900">
                            <span>{lang.sampleGreeting}</span>
                            <button
                              onClick={() => playAudio(lang.sampleGreeting, lang.ttsCode)}
                              className="text-[#0B3D91] hover:underline text-[11px] font-bold flex items-center gap-1"
                            >
                              <Volume2 className="w-3.5 h-3.5" /> Audio
                            </button>
                          </div>
                        </div>

                        <div className="space-y-2 text-slate-600 text-[11px]">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-slate-500">Region:</span>
                            <span className="font-bold text-slate-800 text-right">{lang.region}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-slate-500">Grammar Pattern:</span>
                            <span className="font-bold text-[#0B3D91]">SOV (Subject-Object-Verb)</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-slate-500">Cognate Bridge:</span>
                            <span className="font-bold text-emerald-700">{lang.cognateFromEnglish.indian}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Action Footer */}
                    <div className="p-5 pt-0 border-t border-[#DCE2E6] mt-auto">
                      {enrolled ? (
                        <div className="space-y-2 pt-3">
                          <div className="flex justify-between text-[11px] font-bold text-slate-700">
                            <span>Status: Enrolled</span>
                            <span className="text-[#0B3D91]">{prog.percent}% ({prog.completedCount}/6 Done)</span>
                          </div>
                          <div className="w-full bg-slate-100 rounded-full h-2">
                            <div className="bg-[#0B3D91] h-2 rounded-full transition-all duration-300" style={{ width: `${prog.percent}%` }} />
                          </div>
                          <button
                            onClick={() => {
                              setActiveCourse(lang);
                              setCourseStepTab('videos');
                            }}
                            className="w-full py-3 rounded-sm bg-[#0B3D91] hover:bg-[#082C6C] text-white font-extrabold text-xs uppercase tracking-wider shadow-md transition flex items-center justify-center gap-1.5"
                          >
                            Open Course Workspace <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between gap-2 pt-3">
                          <button
                            onClick={() => setSelectedLanguageModal(lang)}
                            className="px-4 py-2.5 rounded-sm bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition"
                          >
                            Details
                          </button>
                          <button
                            onClick={() => handleStartEnrollment(lang)}
                            className="flex-1 py-2.5 rounded-sm bg-[#0B3D91] hover:bg-[#082C6C] text-white font-extrabold text-xs uppercase tracking-wider shadow-sm transition flex items-center justify-center gap-1"
                          >
                            Enroll (ICCR Free)
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* MY DIPLOMAS TAB */}
          {activeTab === 'my-diplomas' && (
            <div className="space-y-6">
              <div className="p-6 bg-white rounded-sm border border-[#DCE2E6] shadow-xs flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-black text-slate-900">Your Enrolled Indian Language Diplomas</h3>
                  <p className="text-xs text-slate-500">Track your progress across Indian language masterclasses and generate your diplomas.</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-blue-100 text-[#0B3D91] text-xs font-black">
                  {enrolledLanguagesList.length} Active Courses
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {enrolledLanguagesList.map((lang) => {
                  const prog = getStepProgress(lang.code);
                  return (
                    <div key={lang.code} className="p-6 bg-white rounded-sm border border-[#DCE2E6] space-y-4 shadow-2xs">
                      <div className="flex items-center justify-between">
                        <span className="text-2xl">{lang.flagIcon}</span>
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase">
                          {prog.allFinished ? '🏆 Diploma Ready' : 'In Progress'}
                        </span>
                      </div>

                      <div>
                        <h4 className="font-black text-base text-slate-900">{lang.nameEng} ({lang.nameNative})</h4>
                        <span className="text-xs text-slate-500 block">{lang.scriptName}</span>
                      </div>

                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between font-bold">
                          <span>Progress</span>
                          <span className="text-[#0B3D91]">{prog.percent}%</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2">
                          <div className="bg-[#0B3D91] h-2 rounded-full transition-all duration-300" style={{ width: `${prog.percent}%` }} />
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setActiveCourse(lang);
                          setCourseStepTab(prog.allFinished ? 'certificate' : 'videos');
                        }}
                        className="w-full py-2.5 rounded-sm bg-[#0B3D91] hover:bg-[#082C6C] text-white font-extrabold text-xs uppercase tracking-wider shadow-sm transition"
                      >
                        {prog.allFinished ? 'View Certificate & Diploma →' : 'Continue Learning →'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 22-LANGUAGE COMPARATIVE MATRIX TAB */}
          {activeTab === 'matrix' && (
            <div className="p-6 sm:p-8 bg-white rounded-sm border border-[#DCE2E6] space-y-6 shadow-xs overflow-x-auto">
              <div>
                <h3 className="text-lg font-black text-slate-900">22 Scheduled Indian Languages: Comparative Linguistic Matrix</h3>
                <p className="text-xs text-slate-500">Comparative breakdown of language families, official scripts, vowel structures, and grammar bridges.</p>
              </div>

              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100 border-b border-[#DCE2E6] text-slate-700 font-black">
                    <th className="p-3">Language & Native</th>
                    <th className="p-3">Script Name</th>
                    <th className="p-3">Language Family / Category</th>
                    <th className="p-3">Region / States</th>
                    <th className="p-3">Grammar Bridge</th>
                    <th className="p-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#DCE2E6]">
                  {SCHEDULED_INDIAN_LANGUAGES_22.map((item) => (
                    <tr key={item.code} className="hover:bg-slate-50">
                      <td className="p-3 font-bold text-slate-900 flex items-center gap-2">
                        <span>{item.flagIcon}</span>
                        <span>{item.nameEng} ({item.nameNative})</span>
                      </td>
                      <td className="p-3 font-mono text-slate-700">{item.scriptName}</td>
                      <td className="p-3 font-semibold text-slate-600">{item.category}</td>
                      <td className="p-3 text-slate-600">{item.region}</td>
                      <td className="p-3 text-emerald-700 font-bold">{item.grammarFeature}</td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => {
                            setActiveCourse(item);
                            setCourseStepTab('videos');
                          }}
                          className="px-3 py-1.5 rounded-sm bg-[#0B3D91] hover:bg-[#082C6C] text-white font-bold text-[11px]"
                        >
                          Study Now
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      {/* ========================================================= */}
      {/* 4. DETAILS MODAL                                          */}
      {/* ========================================================= */}
      {selectedLanguageModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-2xl bg-white rounded-sm border border-[#DCE2E6] shadow-2xl overflow-hidden text-left animate-in fade-in duration-150">
            <div className={`p-6 bg-gradient-to-r ${selectedLanguageModal.bannerGradient} text-white flex items-center justify-between`}>
              <div className="space-y-1">
                <span className="px-2.5 py-0.5 rounded-full bg-black/20 text-white font-extrabold uppercase text-[10px]">
                  {selectedLanguageModal.category}
                </span>
                <h3 className="text-2xl font-black">{selectedLanguageModal.nameEng} ({selectedLanguageModal.nameNative})</h3>
                <p className="text-xs text-white/90">{selectedLanguageModal.scriptName} • {selectedLanguageModal.region}</p>
              </div>
              <button
                onClick={() => setSelectedLanguageModal(null)}
                className="p-2 rounded-sm bg-black/20 hover:bg-black/40 text-white text-sm"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="p-4 bg-[#EEF3F8] rounded-sm border border-[#D0DCE7] space-y-2">
                <span className="text-[10px] font-black uppercase text-[#0B3D91] block">Native Greeting:</span>
                <p className="font-bold text-slate-900 text-sm">{selectedLanguageModal.sampleGreeting}</p>
                <p className="text-slate-600 font-mono text-[11px]">Pronunciation: {selectedLanguageModal.pronunciationGuide}</p>
              </div>

              <div className="space-y-2">
                <span className="font-bold text-slate-900 block">Grammar & Syntax:</span>
                <p className="text-slate-600">{selectedLanguageModal.grammarFeature}</p>
              </div>

              <div className="pt-4 border-t border-[#DCE2E6] flex items-center justify-end gap-3">
                <button
                  onClick={() => setSelectedLanguageModal(null)}
                  className="px-4 py-2.5 rounded-sm bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const lang = selectedLanguageModal;
                    setSelectedLanguageModal(null);
                    handleStartEnrollment(lang);
                  }}
                  className="px-6 py-2.5 rounded-sm bg-[#0B3D91] hover:bg-[#082C6C] text-white font-extrabold text-xs uppercase shadow-sm"
                >
                  Enroll via ICCR Scholarship
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 5. CHECKOUT & ENROLLMENT MODAL                            */}
      {/* ========================================================= */}
      {checkoutLanguage && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-lg bg-white rounded-sm border border-[#DCE2E6] shadow-2xl overflow-hidden text-left animate-in zoom-in-95 duration-200">
            <div className="p-5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span className="font-extrabold text-xs uppercase tracking-wider">
                  International Scholar Enrollment
                </span>
              </div>
              <button
                onClick={() => setCheckoutLanguage(null)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-5">
              {paymentSuccessInvoice ? (
                <div className="text-center space-y-4 py-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-black text-slate-900">Enrollment Confirmed!</h3>
                  <p className="text-xs text-slate-600">
                    Your ICCR Scholarship voucher has been redeemed. You are now enrolled in the <strong>{checkoutLanguage.nameEng} ({checkoutLanguage.nameNative})</strong> International Diploma track.
                  </p>
                  <button
                    onClick={handleFinishCheckout}
                    className="w-full py-3.5 rounded-sm bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs uppercase tracking-wider shadow-md transition"
                  >
                    Open Course Workspace Now →
                  </button>
                </div>
              ) : (
                <div className="space-y-4 text-xs">
                  <div className={`p-4 rounded-sm bg-gradient-to-r ${checkoutLanguage.bannerGradient} text-white space-y-1`}>
                    <span className="text-[10px] font-black uppercase text-white/80">{checkoutLanguage.scriptName}</span>
                    <h4 className="text-lg font-black">{checkoutLanguage.nameEng} ({checkoutLanguage.nameNative})</h4>
                    <p className="text-[11px] text-white/90">Curriculum standard: CIIL & Certified CEFR L1-L4</p>
                  </div>

                  <div className="p-3 bg-slate-50 border border-[#DCE2E6] rounded-sm space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-700 flex items-center gap-1.5">
                        <Tag className="w-3.5 h-3.5 text-amber-600" /> ICCR Exchange Scholarship Voucher:
                      </span>
                      <span className="text-emerald-700 font-extrabold text-[11px]">100% OFF</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                        className="flex-1 px-3 py-2 bg-white border border-[#DCE2E6] rounded-sm text-xs font-mono font-bold"
                      />
                      <span className="px-3 py-2 bg-emerald-100 text-emerald-800 font-bold rounded-sm">Applied ✓</span>
                    </div>
                  </div>

                  <button
                    onClick={handleProcessPayment}
                    disabled={isProcessingPayment}
                    className="w-full py-3.5 rounded-sm bg-[#0B3D91] hover:bg-[#082C6C] text-white font-extrabold text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-2 transition"
                  >
                    {isProcessingPayment ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" /> Enrolling via ICCR...
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" /> Enroll Free (100% Scholarship)
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 6. POP-UP VIDEO CINEMA PLAYER MODAL WITH 19+ DUBBINGS       */}
      {/* ========================================================= */}
      {activeVideoModal && activeCourse && (() => {
        const activeDubObj = ALL_DUBBING_LANGUAGES.find((l) => l.key === selectedDubLang) || ALL_DUBBING_LANGUAGES[0];
        const dubbedInfo = getDubbedSpeechData(selectedDubLang, activeCourse.nameEng, activeVideoModal.title);

        return (
          <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
            <div className="w-full max-w-5xl bg-slate-900 border border-slate-700 rounded-sm shadow-2xl overflow-hidden text-left animate-in fade-in zoom-in-95 duration-200 text-white flex flex-col max-h-[92vh]">
              {/* Modal Top Header */}
              <div className="flex items-center justify-between p-4 bg-slate-950 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{activeCourse.flagIcon}</span>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider">
                        INTERACTIVE VIDEO CINEMA • LECTURE {activeVideoModal.videoIndex} (DAY {activeVideoModal.day})
                      </span>
                      <span className="text-[10px] font-black px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                        <Mic className="w-3 h-3 text-emerald-400" /> Dubbed: {activeDubObj.flag} {activeDubObj.nameNative} ({activeDubObj.nameEng})
                      </span>
                    </div>
                    <h3 className="text-sm sm:text-base font-black text-white line-clamp-1">
                      {activeVideoModal.title}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowDubbingModal(true)}
                    className="px-3 py-1.5 rounded bg-[#0B3D91] hover:bg-blue-600 text-white font-black text-xs flex items-center gap-1.5 border border-blue-400/40 shadow-sm transition"
                  >
                    <Languages className="w-3.5 h-3.5" /> Dubbing ({ALL_DUBBING_LANGUAGES.length})
                  </button>
                  <button
                    onClick={() => {
                      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
                        window.speechSynthesis.cancel();
                      }
                      setActiveVideoModal(null);
                    }}
                    className="p-2 rounded-sm bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
                    title="Close Video Modal"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Multi-Language Dubbing Pill Track Bar */}
              <div className="px-4 py-2 bg-slate-950/80 border-b border-slate-800 flex items-center gap-2 overflow-x-auto no-scrollbar text-xs">
                <span className="text-[11px] font-black text-amber-400 uppercase shrink-0 flex items-center gap-1">
                  <Radio className="w-3.5 h-3.5 animate-pulse text-red-400" /> Audio Dub:
                </span>
                {ALL_DUBBING_LANGUAGES.slice(0, 10).map((l) => (
                  <button
                    key={l.key}
                    onClick={() => {
                      setSelectedDubLang(l.key);
                      setVideoModalPlaying(true);
                      playDubbedSpeech(l.key);
                    }}
                    className={`px-2.5 py-1 rounded text-xs font-bold shrink-0 transition flex items-center gap-1 ${
                      selectedDubLang === l.key
                        ? 'bg-[#0B3D91] text-white ring-2 ring-blue-400 shadow-md'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    <span>{l.flag}</span>
                    <span>{l.nameNative}</span>
                    <span className="text-[10px] text-slate-400 font-normal">({l.nameEng})</span>
                  </button>
                ))}
                <button
                  onClick={() => setShowDubbingModal(true)}
                  className="px-2.5 py-1 rounded text-xs font-black bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-400/30 shrink-0"
                >
                  + All 19 Dubs
                </button>
              </div>

              {/* Video Player Main Canvas */}
              <div className="relative aspect-video w-full bg-black flex flex-col justify-between p-6 sm:p-8 overflow-hidden select-none">
                {/* Dynamic Sound Wave Visualizer */}
                <div className="absolute inset-0 opacity-20 flex items-center justify-center pointer-events-none">
                  <div className="flex items-center gap-1.5 sm:gap-2.5 h-36">
                    {[40, 75, 120, 60, 140, 95, 160, 80, 110, 45, 130, 90, 150, 70, 100, 50].map((h, i) => (
                      <div
                        key={i}
                        className={`w-2.5 sm:w-3.5 bg-gradient-to-t from-blue-500 via-amber-400 to-red-500 rounded-full transition-all duration-300 ${
                          videoModalPlaying ? 'animate-pulse' : 'opacity-40'
                        }`}
                        style={{
                          height: videoModalPlaying ? `${Math.max(20, (h * (i % 2 === 0 ? 1.2 : 0.8)))}px` : '20px'
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Watermark badge */}
                <div className="flex items-center justify-between text-xs z-10">
                  <span className="px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 font-bold border border-amber-400/30 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>CIIL Masterclass Stream • 1080p 60FPS</span>
                  </span>
                  <span className="text-[11px] font-mono text-slate-400 bg-black/60 px-2.5 py-1 rounded border border-white/10">
                    Audio Track: {activeDubObj.nameNative} ({activeDubObj.nameEng})
                  </span>
                </div>

                {/* Center Play Overlay */}
                <div className="text-center space-y-3 my-auto z-10">
                  <button
                    onClick={() => {
                      const nextState = !videoModalPlaying;
                      setVideoModalPlaying(nextState);
                      if (nextState) {
                        playDubbedSpeech(selectedDubLang);
                      } else {
                        if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
                          window.speechSynthesis.cancel();
                        }
                      }
                    }}
                    className="w-20 h-20 rounded-full bg-[#FF9933] hover:bg-amber-400 text-slate-950 flex items-center justify-center mx-auto shadow-2xl transition hover:scale-110"
                  >
                    {videoModalPlaying ? (
                      <Pause className="w-9 h-9 fill-current" />
                    ) : (
                      <Play className="w-9 h-9 fill-current ml-1" />
                    )}
                  </button>
                  <div className="space-y-1">
                    <h4 className="text-lg sm:text-2xl font-black text-white">
                      {videoModalPlaying ? `Playing in ${activeDubObj.nameEng}...` : activeVideoModal.title}
                    </h4>
                    <p className="text-xs text-slate-300 max-w-xl mx-auto line-clamp-2">
                      {activeVideoModal.description}
                    </p>
                  </div>
                </div>

                {/* Subtitles Overlay */}
                <div className="z-10 text-center bg-black/85 backdrop-blur-md p-3 rounded text-xs sm:text-sm font-semibold text-amber-200 border border-white/15 max-w-2xl mx-auto shadow-lg space-y-0.5">
                  <div className="text-[10px] text-amber-400 font-bold uppercase">[Subtitles: {activeDubObj.nameNative} • {activeDubObj.nameEng}]</div>
                  <p className="text-white font-bold">&quot;{dubbedInfo.speech}&quot;</p>
                  <p className="text-[11px] text-slate-300">({dubbedInfo.translit})</p>
                </div>

                {/* Bottom Video Controls Bar */}
                <div className="z-10 flex flex-wrap items-center justify-between text-xs text-slate-300 border-t border-white/10 pt-3 gap-3">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => {
                        const nextState = !videoModalPlaying;
                        setVideoModalPlaying(nextState);
                        if (nextState) {
                          playDubbedSpeech(selectedDubLang);
                        } else {
                          if (typeof window !== 'undefined') window.speechSynthesis.cancel();
                        }
                      }}
                      className="hover:text-amber-400 font-bold flex items-center gap-1"
                    >
                      {videoModalPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      <span>{videoModalPlaying ? 'Pause' : 'Play Voice'}</span>
                    </button>

                    <button
                      onClick={() => {
                        setVideoModalPlaying(true);
                        playDubbedSpeech(selectedDubLang);
                      }}
                      className="hover:text-white text-slate-300 flex items-center gap-1"
                    >
                      <RotateCcw className="w-3.5 h-3.5" /> Replay
                    </button>

                    <button
                      onClick={() => setShowDubbingModal(true)}
                      className="hover:text-amber-300 text-amber-400 font-bold flex items-center gap-1"
                    >
                      <Headphones className="w-3.5 h-3.5" /> Change Dubbing ({activeDubObj.nameEng})
                    </button>

                    <span className="text-slate-500">•</span>

                    <div className="flex items-center gap-1">
                      <span className="text-slate-400">Speed:</span>
                      {[0.75, 1.0, 1.25, 1.5].map((s) => (
                        <button
                          key={s}
                          onClick={() => setPlaybackSpeed(s)}
                          className={`px-1.5 py-0.5 rounded text-[11px] font-bold ${
                            playbackSpeed === s ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          {s}x
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        if (activeVideoModal.videoIndex === 1) {
                          updateProgress(activeCourse.code, { video1Done: true });
                        } else if (activeVideoModal.videoIndex === 2) {
                          updateProgress(activeCourse.code, { video2Done: true });
                        } else if (activeVideoModal.videoIndex === 3) {
                          updateProgress(activeCourse.code, { video3Done: true });
                        }
                        alert(`✅ Lecture ${activeVideoModal.videoIndex} marked as finished! Next module unlocked.`);
                      }}
                      className="px-3.5 py-1.5 rounded-sm bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs flex items-center gap-1.5 transition"
                    >
                      <CheckCircle2 className="w-4 h-4" /> Mark Video as Finished
                    </button>
                  </div>
                </div>
              </div>

              {/* Modal Bottom Tabs (Notes, Transcript, Quiz) */}
              <div className="p-5 bg-slate-950 border-t border-slate-800 space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
                  <button
                    onClick={() => setVideoModalTab('notes')}
                    className={`px-3 py-1.5 rounded text-xs font-bold transition ${
                      videoModalTab === 'notes' ? 'bg-[#0B3D91] text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    📝 Key Lecture Notes
                  </button>
                  <button
                    onClick={() => setVideoModalTab('transcript')}
                    className={`px-3 py-1.5 rounded text-xs font-bold transition ${
                      videoModalTab === 'transcript' ? 'bg-[#0B3D91] text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    🎙️ Dubbed Transcript ({activeDubObj.nameEng})
                  </button>
                  <button
                    onClick={() => setVideoModalTab('quiz')}
                    className={`px-3 py-1.5 rounded text-xs font-bold transition ${
                      videoModalTab === 'quiz' ? 'bg-[#0B3D91] text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    ⚡ Knowledge Check
                  </button>
                </div>

                {videoModalTab === 'notes' && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="p-3 rounded bg-slate-900 border border-slate-800 space-y-1">
                      <span className="text-amber-400 font-bold block">1. Phonetic Articulation</span>
                      <p className="text-slate-300">
                        Focus on proper tongue placement for retroflex and dental sounds in {activeCourse.nameEng}.
                      </p>
                    </div>
                    <div className="p-3 rounded bg-slate-900 border border-slate-800 space-y-1">
                      <span className="text-amber-400 font-bold block">2. Syntactic Order</span>
                      <p className="text-slate-300">
                        Always place the verb at the end of the sentence: Subject + Object + Verb (SOV).
                      </p>
                    </div>
                    <div className="p-3 rounded bg-slate-900 border border-slate-800 space-y-1">
                      <span className="text-amber-400 font-bold block">3. Shared Cognate</span>
                      <p className="text-slate-300">
                        Root bridge: &quot;{activeCourse.cognateFromEnglish.indian}&quot; ⟷ {activeCourse.cognateFromEnglish.foreign}.
                      </p>
                    </div>
                  </div>
                )}

                {videoModalTab === 'transcript' && (
                  <div className="p-4 bg-slate-900 rounded border border-slate-800 text-xs space-y-2 max-h-48 overflow-y-auto">
                    <div className="p-2 bg-slate-950 rounded border border-slate-800 text-[11px] text-amber-300 flex items-center justify-between">
                      <span>Dubbed in: <b>{activeDubObj.nameNative} ({activeDubObj.nameEng})</b></span>
                      <button
                        onClick={() => setShowDubbingModal(true)}
                        className="text-xs text-blue-400 hover:underline font-bold"
                      >
                        Change Dub
                      </button>
                    </div>
                    {[
                      { time: '00:15', text: dubbedInfo.speech },
                      { time: '02:40', text: `Here is the fundamental phonetic structure and script guide for ${activeCourse.nameEng}.` },
                      { time: '06:10', text: `Notice how sentence structure in ${activeCourse.nameEng} compares to global languages.` },
                      { time: '12:35', text: `Let us practice everyday conversational dialogues and greetings.` },
                      { time: '18:50', text: `Review of key vocabulary and conclusion for today's masterclass.` }
                    ].map((t, i) => (
                      <div
                        key={i}
                        onClick={() => playDubbedSpeech(selectedDubLang, t.text)}
                        className="p-2.5 bg-slate-950 hover:bg-slate-800 rounded border border-slate-800 cursor-pointer transition flex items-start gap-2.5 group"
                      >
                        <span className="font-mono text-[10px] text-amber-400 bg-black/40 px-1.5 py-0.5 rounded shrink-0 group-hover:bg-[#0B3D91] group-hover:text-white transition">
                          {t.time}
                        </span>
                        <span className="text-slate-300 text-[11px] leading-relaxed group-hover:text-white">
                          {t.text}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {videoModalTab === 'quiz' && (
                  <div className="p-4 bg-slate-900 rounded border border-slate-800 text-xs space-y-3">
                    <span className="font-bold text-slate-200 block">
                      Quick Check: What is the respectful greeting in {activeCourse.nameEng}?
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {[
                        { id: 1, text: `1. ${activeCourse.sampleGreeting}`, correct: true },
                        { id: 2, text: '2. Bon voyage / Goodbye', correct: false }
                      ].map((q) => (
                        <button
                          key={q.id}
                          onClick={() => setVideoQuizAnswer(q.id)}
                          className={`p-2.5 rounded text-left font-bold transition flex items-center justify-between ${
                            videoQuizAnswer === q.id
                              ? q.correct
                                ? 'bg-emerald-900/60 border border-emerald-500 text-emerald-300'
                                : 'bg-red-900/60 border border-red-500 text-red-300'
                              : 'bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700'
                          }`}
                        >
                          <span>{q.text}</span>
                          {videoQuizAnswer === q.id && q.correct && <Check className="w-4 h-4 text-emerald-400" />}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })()}

      {/* ========================================================= */}
      {/* 7. ALL 19+ DUBBING LANGUAGES SELECTOR MODAL               */}
      {/* ========================================================= */}
      {showDubbingModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-white border border-[#DCE2E6] rounded-sm shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[85vh]">
            <div className="p-4 bg-[#0B3D91] text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-amber-300" />
                <div>
                  <h3 className="font-black text-sm sm:text-base">Select AI Voice Dubbing Language</h3>
                  <p className="text-[11px] text-blue-100">
                    Instantly voiceovers and synchronizes subtitles in 19+ Indian & World Languages
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowDubbingModal(false)}
                className="p-1.5 rounded bg-white/10 hover:bg-white/20 text-white transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 bg-[#EEF3F8] border-b border-[#D0DCE7]">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search dubbing language (e.g. Hindi, Persian, Spanish, Tamil, German)..."
                  value={dubbingSearchQuery}
                  onChange={(e) => setDubbingSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-white border border-[#D0DCE7] rounded-sm text-xs focus:outline-none focus:ring-2 focus:ring-[#0B3D91]"
                />
              </div>
            </div>

            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-2.5 overflow-y-auto max-h-[55vh]">
              {ALL_DUBBING_LANGUAGES.filter(
                (l) =>
                  l.nameEng.toLowerCase().includes(dubbingSearchQuery.toLowerCase()) ||
                  l.nameNative.toLowerCase().includes(dubbingSearchQuery.toLowerCase())
              ).map((l) => (
                <div
                  key={l.key}
                  onClick={() => {
                    setSelectedDubLang(l.key);
                    setShowDubbingModal(false);
                    if (activeVideoModal) {
                      setVideoModalPlaying(true);
                      playDubbedSpeech(l.key);
                    }
                  }}
                  className={`p-3 rounded-sm border cursor-pointer transition flex items-center justify-between ${
                    selectedDubLang === l.key
                      ? 'bg-[#EEF3F8] border-[#0B3D91] ring-1 ring-[#0B3D91]'
                      : 'bg-white border-[#DCE2E6] hover:border-[#0B3D91] hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{l.flag}</span>
                    <div>
                      <h5 className="font-extrabold text-xs text-slate-900">
                        {l.nameNative} <span className="font-semibold text-slate-500">({l.nameEng})</span>
                      </h5>
                      <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                        AI Voice Dubbing Ready
                      </span>
                    </div>
                  </div>
                  {selectedDubLang === l.key && (
                    <CheckCircle className="w-4 h-4 text-[#0B3D91]" />
                  )}
                </div>
              ))}
            </div>

            <div className="p-3 bg-slate-50 border-t border-[#DCE2E6] flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">
                {ALL_DUBBING_LANGUAGES.length} Languages supported with zero delay
              </span>
              <button
                onClick={() => setShowDubbingModal(false)}
                className="px-4 py-1.5 rounded bg-[#0B3D91] hover:bg-[#082C6C] text-white font-bold text-xs"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
