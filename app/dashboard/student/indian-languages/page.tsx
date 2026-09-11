'use client';

import React, { useState, useEffect, useMemo } from 'react';
import confetti from 'canvas-confetti';
import {
  Globe,
  BookOpen,
  Play,
  CheckCircle2,
  Lock,
  Sparkles,
  ArrowRight,
  Search,
  Award,
  Volume2,
  Mic,
  MessageSquare,
  CreditCard,
  QrCode,
  ShieldCheck,
  Tag,
  RefreshCw,
  X,
  FileText,
  Bookmark,
  Users,
  GraduationCap,
  Languages,
  Check,
  Printer,
  Download,
  AlertCircle,
  ChevronRight,
  RotateCcw,
  Star,
  Info,
  Sliders,
  CheckCircle,
  Headphones,
  Radio,
  BookMarked,
  Lightbulb,
  Layers,
  Flame,
  Zap,
  UserCheck,
  Heart,
  Maximize2,
  VolumeX,
  Receipt
} from 'lucide-react';
import { getStoredUser, enrollInCourse, unenrollFromCourse, saveStoredUser, addXpToUser, User } from '@/lib/lmsStore';

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
  { key: 'hi', nameEng: 'Hindi', nameNative: 'हिंदी', flag: '🇮🇳', ttsCode: 'hi-IN' },
  { key: 'en', nameEng: 'English', nameNative: 'English', flag: '🇬🇧', ttsCode: 'en-US' },
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

export function getDubbedSpeechData(langKey: string, courseTitle: string, chapterTitle: string) {
  const map: Record<string, { speech: string; translit: string; meaning: string }> = {
    hi: {
      speech: `नमस्ते! इस विशेष वीडियो पाठ में आपका स्वागत है। आज हम ${chapterTitle || 'भारतीय भाषा एवं व्याकरण'} का गहन अभ्यास करेंगे।`,
      translit: 'Namaste! Is vishesh video paath mein aapka swaagat hai.',
      meaning: 'Welcome! In this lesson we master phonetic articulation and grammar rules.'
    },
    en: {
      speech: `Hello and welcome to this masterclass video lecture. Today we explore ${chapterTitle || 'Indian linguistics'} with step-by-step clarity and pronunciation mastery.`,
      translit: 'Hello and welcome to this masterclass video lecture.',
      meaning: 'Step-by-step masterclass exploring grammar, phonetics, and conversation.'
    },
    fa: {
      speech: `سلام و درود! به این درس ویدیویی تخصصی خوش آمدید. امروز مبحث ${chapterTitle || 'زبان‌های اصیل هند'} و تلفظ روان را با هم تمرین می‌کنیم.`,
      translit: 'Salam o dorood! Be in dars-e videoee takhassosi khosh amadid.',
      meaning: 'Warm greetings! Welcome to this dedicated video lesson with native phonetics.'
    },
    es: {
      speech: `¡Hola y bienvenido a esta clase magistral! Hoy profundizamos en ${chapterTitle || 'la lingüística de la India'} y el dominio de la pronunciación.`,
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
      speech: `ਸਤਿ ਸ਼੍ਰੀ ਅਕਾਲ! ਇਸ ਵਿਸ਼ੇਸ਼ ਵੀਡੀਓ ਲੈਕਚਰ ਵਿੱਚ ਤੁਹਾਡਾ ਸੁਆਗਤ ਹੈ। ਅੱਜ ਅਸੀਂ ${chapterTitle || 'ਵਿਆਕਰਣ'} ਅਤੇ ਸ਼ੁੱਧ ਉਚਾਰਨ ਸਿੱਖਾਂਗੇ।`,
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

// ==========================================
// 22 SCHEDULED INDIAN LANGUAGES SELECTION
// ==========================================
export interface IndianLanguageOption {
  code: string;
  nameEng: string;
  nameNative: string;
  script: string;
  sampleGreeting: string;
  sampleAudioText: string;
  pronunciationGuide: string;
  samplePassage: string;
  ttsCode: string;
}

export const INDIAN_LANGUAGES_22: IndianLanguageOption[] = [
  {
    code: 'hi',
    nameEng: 'Hindi',
    nameNative: 'हिंदी',
    script: 'Devanagari',
    sampleGreeting: 'नमस्ते! (Namaste)',
    sampleAudioText: 'नमस्ते! भारत में आपका स्वागत है। ज्ञान और संस्कृति की इस यात्रा में हमारे साथ जुड़ें।',
    pronunciationGuide: 'nuh-muh-STAY',
    samplePassage: 'भारतीय संस्कृति विविधता में एकता का अनुपम उदाहरण है। यहाँ की भाषाएँ समृद्ध ज्ञान और साहित्य की धरोहर हैं।',
    ttsCode: 'hi-IN'
  },
  {
    code: 'ta',
    nameEng: 'Tamil',
    nameNative: 'தமிழ்',
    script: 'Tamil',
    sampleGreeting: 'வணக்கம்! (Vanakkam)',
    sampleAudioText: 'வணக்கம்! உங்களை அன்புடன் வரவேற்கிறோம். தொன்மையான தமிழ் மொழியை கற்போம்.',
    pronunciationGuide: 'vuh-nuh-KKUM',
    samplePassage: 'தமிழ் மொழி உலகின் மிகத் தொன்மையான செம்மொழிகளில் ஒன்றாகும். அதன் இலக்கிய வளம் உலகப் புகழ்பெற்றது.',
    ttsCode: 'ta-IN'
  },
  {
    code: 'te',
    nameEng: 'Telugu',
    nameNative: 'తెలుగు',
    script: 'Telugu',
    sampleGreeting: 'నమస్కారం! (Namaskaram)',
    sampleAudioText: 'నమస్కారం! మీకు హార్ధిక స్వాగతం. మధురమైన తెలుగు భాషా ప్రయాణాన్ని ప్రారంభిద్దాం.',
    pronunciationGuide: 'nuh-muh-SKAA-rum',
    samplePassage: 'తెలుగు భాషను దేశభాషలందు లెస్స అని కొనియాడారు. దీని మధురమైన ఉచ్ఛారణ సంగీతమయం.',
    ttsCode: 'te-IN'
  },
  {
    code: 'bn',
    nameEng: 'Bengali',
    nameNative: 'বাংলা',
    script: 'Bengali',
    sampleGreeting: 'নমস্কার! (Nomoshkar)',
    sampleAudioText: 'নমস্কার! আপনাকে আমাদের ভাষা পরিবারে আন্তরিক স্বাগতম। বাংলা ভাষার মাধুর্য উপভোগ করুন।',
    pronunciationGuide: 'noh-mosh-KAAR',
    samplePassage: 'বাংলা সাহিত্যের ইতিহাস অত্যন্ত সমৃদ্ধ এবং নোবেল বিজয়ী রবীন্দ্রনাথ ঠাকুরের স্মৃতি বিজড়িত।',
    ttsCode: 'bn-IN'
  },
  {
    code: 'mr',
    nameEng: 'Marathi',
    nameNative: 'मराठी',
    script: 'Devanagari',
    sampleGreeting: 'नमस्कार! (Namaskar)',
    sampleAudioText: 'नमस्कार! आपले सहर्ष स्वागत आहे. छत्रपती शिवरायांच्या महाराष्ट्राच्या भाषेचा अभ्यास करूया.',
    pronunciationGuide: 'nuh-muh-SKAAR',
    samplePassage: 'मराठी भाषा ही अत्यंत समृद्ध आणि ऐतिहासिक परंपरा असलेली गौरवशाली भाषा आहे.',
    ttsCode: 'mr-IN'
  },
  {
    code: 'gu',
    nameEng: 'Gujarati',
    nameNative: 'ગુજરાતી',
    script: 'Gujarati',
    sampleGreeting: 'નમસ્તે! (Namaste)',
    sampleAudioText: 'નમસ્તે! આપનું હાર્દિક સ્વાગત છે. ગુજરાતની મધુર બોલી અને સાહિત્ય શીખીશું.',
    pronunciationGuide: 'nuh-muh-STAY',
    samplePassage: 'ગુજરાતી ભાષા વ્યાપાર, સંસ્કૃતિ અને સંતોની પાવન વાણીથી સમૃદ્ધ ભાષા છે.',
    ttsCode: 'gu-IN'
  },
  {
    code: 'kn',
    nameEng: 'Kannada',
    nameNative: 'ಕನ್ನಡ',
    script: 'Kannada',
    sampleGreeting: 'ನಮಸ್ಕಾರ! (Namaskara)',
    sampleAudioText: 'ನಮಸ್ಕಾರ! ನಿಮಗೆ ಆತ್ಮೀಯ ಸುಸ್ವಾಗತ. ಸುಂದರವಾದ ಕನ್ನಡ ಭಾಷೆಯನ್ನು ಜೊತೆಯಾಗಿ ಕಲಿಯೋಣ.',
    pronunciationGuide: 'nuh-muh-SKAA-ruh',
    samplePassage: 'ಕನ್ನಡ ಸಾಹಿತ್ಯವು ಎಂಟು ಜ್ಞಾನಪೀಠ ಪ್ರಶಸ್ತಿಗಳನ್ನು ಪಡೆದ ಅತ್ಯಂತ ಗೌರವಾನ್ವಿತ ಸಾಹಿತ್ಯವಾಗಿದೆ.',
    ttsCode: 'kn-IN'
  },
  {
    code: 'ml',
    nameEng: 'Malayalam',
    nameNative: 'മലയാളം',
    script: 'Malayalam',
    sampleGreeting: 'നമസ്കാരം! (Namaskaram)',
    sampleAudioText: 'നമസ്കാരം! നിങ്ങൾക്ക് ഹൃദ്യമായ സ്വാഗതം. ദൈവത്തിന്റെ സ്വന്തം നാടിന്റെ ഭാഷ പഠിക്കാം.',
    pronunciationGuide: 'nuh-muh-SKAA-rum',
    samplePassage: 'മലയാള ഭാഷ ദ്രാവിഡ ഭാഷാ കുടുംബത്തിലെ ഏറ്റവും സവിശേഷമായ സൗന്ദര്യമുള്ള ഭാഷയാണ്.',
    ttsCode: 'ml-IN'
  },
  {
    code: 'pa',
    nameEng: 'Punjabi',
    nameNative: 'ਪੰਜਾਬੀ',
    script: 'Gurmukhi',
    sampleGreeting: 'ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ! (Sat Sri Akaal)',
    sampleAudioText: 'ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ ਜੀ! ਪੰਜਾਬੀ ਬੋਲੀ ਸਿੱਖਣ ਲਈ ਤੁਹਾਡਾ ਨਿੱਘਾ ਸਵਾਗਤ ਹੈ।',
    pronunciationGuide: 'suht sree uh-KAAL',
    samplePassage: 'ਪੰਜਾਬੀ ਭਾਸ਼ਾ ਪਿਆਰ, ਸੂਫੀਆਨਾ ਕਲਾਮ ਅਤੇ ਜੋਸ਼ ਨਾਲ ਭਰਪੂਰ ਇੱਕ ਮਹਾਨ ਵਿਰਾਸਤ ਹੈ।',
    ttsCode: 'pa-IN'
  },
  {
    code: 'or',
    nameEng: 'Odia',
    nameNative: 'ଓଡ଼ିଆ',
    script: 'Odia',
    sampleGreeting: 'ନମସ୍କାର! (Namaskara)',
    sampleAudioText: 'ନମସ୍କାର! ଆପଣଙ୍କୁ ଆମର ଶିକ୍ଷା ପରିବାରକୁ ସ୍ୱାଗତ କରୁଛୁ।',
    pronunciationGuide: 'nuh-muh-SKAA-ruh',
    samplePassage: 'ଓଡ଼ିଆ ଭାଷା ଏକ ସମୃଦ୍ଧ ଶାସ୍ତ୍ରୀୟ ଭାଷା ଅଟେ।',
    ttsCode: 'hi-IN'
  },
  {
    code: 'as',
    nameEng: 'Assamese',
    nameNative: 'অসমীয়া',
    script: 'Assamese',
    sampleGreeting: 'নমস্কাৰ! (Namaskar)',
    sampleAudioText: 'নমস্কাৰ! অসমীয়া ভাষা আৰু সংস্কৃতিৰ পৃথিৱীলৈ স্বাগতম।',
    pronunciationGuide: 'noh-mosh-KAAR',
    samplePassage: 'অসমীয়া ভাষা উত্তৰ-পূৰ্বাঞ্চলৰ সুন্দৰ ভাষা।',
    ttsCode: 'hi-IN'
  },
  {
    code: 'ur',
    nameEng: 'Urdu',
    nameNative: 'اردو',
    script: 'Perso-Arabic (Nastaliq)',
    sampleGreeting: 'آداب / سلام (Adaab)',
    sampleAudioText: 'خوش آمدید! اردو زبان کی شیریflow اور ادبی چاشنی کا تجربہ کریں۔',
    pronunciationGuide: 'aa-DAAB',
    samplePassage: 'اردو ادب کی خوبصورتی اور شاعری دنیا بھر میں مشہور ہے۔',
    ttsCode: 'hi-IN'
  },
  {
    code: 'sa',
    nameEng: 'Sanskrit',
    nameNative: 'संस्कृतम्',
    script: 'Devanagari',
    sampleGreeting: 'नमो नमः! (Namo Namah)',
    sampleAudioText: 'नमो नमः! अस्मिन् विशिष्टे दृश्य-पाठ्यक्रमे भवतां हार्दिकं स्वागतम्।',
    pronunciationGuide: 'nuh-moh-nuh-muh-huh',
    samplePassage: 'संस्कृतम् सर्वभारतीयभाषाणां जननी अस्ति।',
    ttsCode: 'hi-IN'
  },
  {
    code: 'ne',
    nameEng: 'Nepali',
    nameNative: 'नेपाली',
    script: 'Devanagari',
    sampleGreeting: 'नमस्ते! (Namaste)',
    sampleAudioText: 'नमस्ते! हिमाली संस्कृति र नेपाली भाषाको यात्रामा स्वागत छ।',
    pronunciationGuide: 'nuh-muh-STAY',
    samplePassage: 'नेपाली भाषा देवनागरी लिपिमा लेखिने समृद्ध भाषा हो।',
    ttsCode: 'hi-IN'
  },
  {
    code: 'ks',
    nameEng: 'Kashmiri',
    nameNative: 'कॉशुर',
    script: 'Perso-Arabic / Devanagari',
    sampleGreeting: 'नमस्कार / सलाम',
    sampleAudioText: 'नमस्कार! कॉशुर ज़बान वॉन्य सिखिव आसानी सान।',
    pronunciationGuide: 'nuh-muh-SKAAR',
    samplePassage: 'कश्मीरी भाषा हिमालय की वादियों की मधुर आवाज़ है।',
    ttsCode: 'hi-IN'
  },
  {
    code: 'kok',
    nameEng: 'Konkani',
    nameNative: 'कोंकणी',
    script: 'Devanagari',
    sampleGreeting: 'नमस्कार! (Namaskar)',
    sampleAudioText: 'नमस्कार! गोमंतकाची सोबीत कोंकणी भास शिकूया।',
    pronunciationGuide: 'nuh-muh-SKAAR',
    samplePassage: 'कोंकणी भास ही भारताच्या पश्चिम किनाऱ्याची शान आसा।',
    ttsCode: 'hi-IN'
  },
  {
    code: 'mai',
    nameEng: 'Maithili',
    nameNative: 'मैथिली',
    script: 'Tirhuta / Devanagari',
    sampleGreeting: 'प्रणाम! (Pranam)',
    sampleAudioText: 'प्रणाम! मिथिलाक पावनि संस्कृति आ मैथिली भाषा मे अहाँक स्वागत अछि।',
    pronunciationGuide: 'pruh-NAAM',
    samplePassage: 'मैथिली भाषा महाकवि विद्यापतिक पावन वाणी सँ सुशोभित अछि।',
    ttsCode: 'hi-IN'
  },
  {
    code: 'sd',
    nameEng: 'Sindhi',
    nameNative: 'सिंधी / سنڌي',
    script: 'Arabic / Devanagari',
    sampleGreeting: 'नमस्कार / मेहरबानी',
    sampleAudioText: 'नमस्कार! सिंधी भाषा जी मिठास में तव्हां जो स्वागत आहे।',
    pronunciationGuide: 'nuh-muh-SKAAR',
    samplePassage: 'सिंधी बोली हिक अति प्राचीन ऐं अमीर विरसो आहे।',
    ttsCode: 'hi-IN'
  },
  {
    code: 'doi',
    nameEng: 'Dogri',
    nameNative: 'डोगरी',
    script: 'Devanagari',
    sampleGreeting: 'जय देवा! (Jai Deva)',
    sampleAudioText: 'जय देवा! डुग्गर प्रदेश दी डोगरी बोली च तुंदा सुआगत ऐ।',
    pronunciationGuide: 'juh-yuh DAY-vuh',
    samplePassage: 'डोगरी भाषा डुग्गर दे लोकें दी मीठी पहचान ऐ।',
    ttsCode: 'hi-IN'
  },
  {
    code: 'mni',
    nameEng: 'Manipuri (Meitei)',
    nameNative: 'মৈতৈলোন্ / मणीपुरी',
    script: 'Meitei Mayek / Bengali',
    sampleGreeting: 'खुरुमजरी (Khurumjari)',
    sampleAudioText: 'खुरुमजरी! मणिपुरी लोन् असिसि तम्बिया।',
    pronunciationGuide: 'khoo-room-jah-ree',
    samplePassage: 'मणिपुरी भाषा उत्तर-पूर्व की अनोखी सांस्कृतिक पहचान है।',
    ttsCode: 'hi-IN'
  },
  {
    code: 'brx',
    nameEng: 'Bodo',
    nameNative: 'बोडो',
    script: 'Devanagari',
    sampleGreeting: 'खुलुमबाय (Khulumby)',
    sampleAudioText: 'खुलुमबाय! बोडो राव सोलोंनाय आव नोंखौ बरायबाय।',
    pronunciationGuide: 'khoo-loom-by',
    samplePassage: 'बोडो भाषा बरफायफोरनि सोलोंथाय आरो हेरिटेज।',
    ttsCode: 'hi-IN'
  },
  {
    code: 'sat',
    nameEng: 'Santali',
    nameNative: 'संथाली / ᱥᱟᱱᱛᱟᱲᱤ',
    script: 'Ol Chiki / Devanagari',
    sampleGreeting: 'जोहार (Johar)',
    sampleAudioText: 'जोहार! संथाली पारसी चेद लागित् सगुन दाराम।',
    pronunciationGuide: 'joh-HAAR',
    samplePassage: 'संथाली भाषा प्राकृतिक जीवन और परंपरा की धरोहर है।',
    ttsCode: 'hi-IN'
  }
];

export interface IndianLanguageCourse {
  id: string;
  languageEng: string;
  languageNative: string;
  scriptName: string;
  region: string;
  category: 'South Indian' | 'East & North-East' | 'West & Central' | 'North & Himalayan' | 'Classical & Regional';
  titleHindi: string;
  titleEng: string;
  description: string;
  cognateExample: {
    native: string;
    nativePhonetics: string;
    hindi: string;
    hindiTranslit: string;
    meaning: string;
  };
  totalModules: number;
  totalLessons: number;
  totalStudents: number;
  rating: number;
  bannerGradient: string;
  badge: string;
  difficulty: 'Beginner Friendly' | 'Intermediate' | 'Fast Track';
}

const INDIAN_LANGUAGE_COURSES: IndianLanguageCourse[] = [
  {
    id: 'course_ta_hindi',
    languageEng: 'Tamil',
    languageNative: 'தமிழ்',
    scriptName: 'Tamil Script (தமிழ் அரிச்சுவடி)',
    region: 'Tamil Nadu & Puducherry',
    category: 'South Indian',
    titleHindi: 'தமிழ் மூலம் हिंदी — तमिल भाषियों के लिए हिंदी',
    titleEng: 'Learn Hindi via Tamil — Direct Phonetic & Grammar Pathway',
    description: 'Designed specifically for Tamil speakers. Leverage Dravidian sentence structure (SOV) and Sanskrit-derived loanwords to master spoken & written Hindi effortlessly.',
    cognateExample: {
      native: 'வணக்கம்',
      nativePhonetics: 'Vanakkam',
      hindi: 'नमस्ते / प्रणाम',
      hindiTranslit: 'Namaste / Pranam',
      meaning: 'Respectful Greeting / Hello'
    },
    totalModules: 12,
    totalLessons: 48,
    totalStudents: 34500,
    rating: 4.9,
    bannerGradient: 'from-[#0B3D91] via-[#082C6C] to-[#051C45]',
    badge: 'Popular',
    difficulty: 'Beginner Friendly'
  },
  {
    id: 'course_te_hindi',
    languageEng: 'Telugu',
    languageNative: 'తెలుగు',
    scriptName: 'Telugu Script (తెలుగు లిపి)',
    region: 'Andhra Pradesh & Telangana',
    category: 'South Indian',
    titleHindi: 'తెలుగు ద్వారా हिंदी — तेलुगु माध्यम से हिंदी सीखें',
    titleEng: 'Learn Hindi via Telugu — Shared Honorifics & Vocabulary',
    description: 'Telugu speakers share massive Tatsama Sanskrit vocabulary with Hindi. Learn Devanagari reading, sentence formation, and formal conversational Hindi.',
    cognateExample: {
      native: 'నమస్కారం',
      nativePhonetics: 'Namaskaram',
      hindi: 'नमस्कार',
      hindiTranslit: 'Namaskar',
      meaning: 'Greetings / Hello'
    },
    totalModules: 14,
    totalLessons: 52,
    totalStudents: 41200,
    rating: 4.9,
    bannerGradient: 'from-rose-900 via-red-800 to-amber-900',
    badge: 'Top Rated',
    difficulty: 'Beginner Friendly'
  },
  {
    id: 'course_bn_hindi',
    languageEng: 'Bengali',
    languageNative: 'বাংলা',
    scriptName: 'Bengali-Assamese Script (বাংলা বর্ণমালা)',
    region: 'West Bengal & Tripura',
    category: 'East & North-East',
    titleHindi: 'বাংলা থেকে हिंदी — बंगाली से हिंदी शिक्षण कोर्स',
    titleEng: 'Learn Hindi via Bengali — Expressive Dialogue & Script Transition',
    description: 'Transition easily from Eastern Indo-Aryan phonetics to Hindi Devanagari. Includes dedicated drills for gendered verbs (लिंग भेद) which differ from Bengali.',
    cognateExample: {
      native: 'ধন্যবাদ',
      nativePhonetics: 'Dhanyabad',
      hindi: 'धन्यवाद',
      hindiTranslit: 'Dhanyavaad',
      meaning: 'Thank You'
    },
    totalModules: 10,
    totalLessons: 40,
    totalStudents: 29800,
    rating: 4.8,
    bannerGradient: 'from-emerald-900 via-teal-800 to-cyan-950',
    badge: 'Fast Track',
    difficulty: 'Fast Track'
  },
  {
    id: 'course_mr_hindi',
    languageEng: 'Marathi',
    languageNative: 'मराठी',
    scriptName: 'Devanagari (बाळबोध)',
    region: 'Maharashtra',
    category: 'West & Central',
    titleHindi: 'मराठीतून हिंदी — मराठी भाषियों के लिए त्वरित हिंदी',
    titleEng: 'Learn Hindi via Marathi — Instant Devanagari Mastery',
    description: 'Since Marathi and Hindi both use Devanagari script, Marathi native speakers can skip alphabet drills and leap directly into high-level conversational fluency!',
    cognateExample: {
      native: 'नमस्कार / धन्यवाद',
      nativePhonetics: 'Namaskar / Dhanyavaad',
      hindi: 'नमस्कार / धन्यवाद',
      hindiTranslit: 'Namaskar / Dhanyavaad',
      meaning: 'Greetings & Thank You (100% Identical)'
    },
    totalModules: 8,
    totalLessons: 32,
    totalStudents: 52100,
    rating: 4.95,
    bannerGradient: 'from-blue-900 via-indigo-900 to-slate-950',
    badge: 'Highest Match',
    difficulty: 'Fast Track'
  },
  {
    id: 'course_gu_hindi',
    languageEng: 'Gujarati',
    languageNative: 'ગુજરાતી',
    scriptName: 'Gujarati Script (ગુજરાતી લિપિ)',
    region: 'Gujarat & Dadra Nagar Haveli',
    category: 'West & Central',
    titleHindi: 'ગુજરાતી દ્વારા हिंदी — गुजराती माध्यम से हिंदी पाठ्यकम',
    titleEng: 'Learn Hindi via Gujarati — Business & Spoken Hindi Bridge',
    description: 'Gujarati script is closely related to Devanagari without top header line. Learn fast reading and conversational Hindi for academics and commerce.',
    cognateExample: {
      native: 'આભાર / નમસ્તે',
      nativePhonetics: 'Aabhar / Namaste',
      hindi: 'आभार / नमस्ते',
      hindiTranslit: 'Aabhar / Namaste',
      meaning: 'Gratitude & Greetings'
    },
    totalModules: 11,
    totalLessons: 44,
    totalStudents: 26400,
    rating: 4.8,
    bannerGradient: 'from-amber-900 via-orange-900 to-[#051C45]',
    badge: 'Popular',
    difficulty: 'Beginner Friendly'
  },
  {
    id: 'course_kn_hindi',
    languageEng: 'Kannada',
    languageNative: 'ಕನ್ನಡ',
    scriptName: 'Kannada Script (ಕನ್ನಡ ಲಿಪಿ)',
    region: 'Karnataka',
    category: 'South Indian',
    titleHindi: 'ಕನ್ನಡದ ಮೂಲಕ हिंदी — कन्नड़ भाषियों के लिए हिंदी',
    titleEng: 'Learn Hindi via Kannada — Grammar & Phonetics Module',
    description: 'Tailored for Karnataka learners. Bridges Dravidian sentence syntax with Hindi verb conjugations and Devanagari reading practice.',
    cognateExample: {
      native: 'ನಮಸ್ಕಾರ / ಧನ್ಯವಾದಗಳು',
      nativePhonetics: 'Namaskara / Dhanyavadagalu',
      hindi: 'नमस्कार / धन्यवाद',
      hindiTranslit: 'Namaskar / Dhanyavaad',
      meaning: 'Greetings & Thanks'
    },
    totalModules: 12,
    totalLessons: 48,
    totalStudents: 31000,
    rating: 4.85,
    bannerGradient: 'from-purple-950 via-indigo-900 to-slate-900',
    badge: 'Essential',
    difficulty: 'Beginner Friendly'
  },
  {
    id: 'course_ml_hindi',
    languageEng: 'Malayalam',
    languageNative: 'മലയാളം',
    scriptName: 'Malayalam Script (മലയാള ലിപി)',
    region: 'Kerala & Lakshadweep',
    category: 'South Indian',
    titleHindi: 'മലയാളത്തിലൂടെ हिंदी — मलयालम माध्यम से हिंदी',
    titleEng: 'Learn Hindi via Malayalam — High Sanskrit Vocabulary Bridge',
    description: 'Malayalam boasts high Sanskrit loanwords. Keralite students will find advanced Hindi vocabulary effortless to comprehend through shared linguistic roots.',
    cognateExample: {
      native: 'നമസ്കാരം / നന്ദി',
      nativePhonetics: 'Namaskaram / Nandi',
      hindi: 'नमस्कार / धन्यवाद',
      hindiTranslit: 'Namaskar / Dhanyavaad',
      meaning: 'Respectful Greeting & Thanks'
    },
    totalModules: 13,
    totalLessons: 50,
    totalStudents: 22800,
    rating: 4.9,
    bannerGradient: 'from-teal-950 via-emerald-900 to-slate-900',
    badge: 'High Vocabulary',
    difficulty: 'Intermediate'
  },
  {
    id: 'course_pa_hindi',
    languageEng: 'Punjabi',
    languageNative: 'ਪੰਜਾਬੀ',
    scriptName: 'Gurmukhi (ਗੁਰਮੁਖੀ)',
    region: 'Punjab & Chandigarh',
    category: 'North & Himalayan',
    titleHindi: 'ਪੰਜਾਬੀ ਤੋਂ हिंदी — पंजाबी भाषियों के लिए हिंदी',
    titleEng: 'Learn Hindi via Punjabi — Gurmukhi to Devanagari Bridge',
    description: 'Punjabi shares deep colloquial and structural ties with Hindi. Master Devanagari script, formal vocabulary, and official Hindi correspondence.',
    cognateExample: {
      native: 'ਧੰਨਵਾਦ / ਸਤਿ ਸ਼੍ਰੀ ਅਕਾਲ',
      nativePhonetics: 'Dhannvaad / Sat Sri Akal',
      hindi: 'धन्यवाद / नमस्ते',
      hindiTranslit: 'Dhanyavaad / Namaste',
      meaning: 'Thanks & Greeting'
    },
    totalModules: 9,
    totalLessons: 36,
    totalStudents: 38900,
    rating: 4.9,
    bannerGradient: 'from-orange-950 via-amber-900 to-[#082C6C]',
    badge: 'Popular',
    difficulty: 'Fast Track'
  },
  {
    id: 'course_or_hindi',
    languageEng: 'Odia',
    languageNative: 'ଓଡ଼ିଆ',
    scriptName: 'Odia Script (ଓଡ଼ିଆ ଲିପି)',
    region: 'Odisha',
    category: 'East & North-East',
    titleHindi: 'ଓଡ଼ିଆ ମାଧ୍ୟମରେ हिंदी — उड़िया भाषियों के लिए हिंदी',
    titleEng: 'Learn Hindi via Odia — Structural & Vocabulary Course',
    description: 'Designed for Odia speakers. Leverages eastern Indo-Aryan roots and shared Sanskrit vocabulary for fast conversational and academic Hindi proficiency.',
    cognateExample: {
      native: 'ନମସ୍କାର / ଧନ୍ୟବାଦ',
      nativePhonetics: 'Namaskara / Dhanyabada',
      hindi: 'नमस्कार / धन्यवाद',
      hindiTranslit: 'Namaskar / Dhanyavaad',
      meaning: 'Greetings & Thanks'
    },
    totalModules: 10,
    totalLessons: 40,
    totalStudents: 18400,
    rating: 4.8,
    bannerGradient: 'from-cyan-950 via-sky-900 to-[#051C45]',
    badge: 'Recommended',
    difficulty: 'Beginner Friendly'
  },
  {
    id: 'course_as_hindi',
    languageEng: 'Assamese',
    languageNative: 'অসমীয়া',
    scriptName: 'Assamese Script (অসমীয়া লিপি)',
    region: 'Assam',
    category: 'East & North-East',
    titleHindi: 'অসমীয়াৰ পৰা हिंदी — असमीया से हिंदी भाषा पाठ्यक्रम',
    titleEng: 'Learn Hindi via Assamese — North-East Bhasha Sangam',
    description: 'Learn Hindi with Assamese explanatory audio and script comparison. Master everyday spoken expressions and formal Hindi grammar rules.',
    cognateExample: {
      native: 'নমস্কাৰ / ধন্যবাদ',
      nativePhonetics: 'Namaskar / Dhanyabad',
      hindi: 'नमस्कार / धन्यवाद',
      hindiTranslit: 'Namaskar / Dhanyavaad',
      meaning: 'Greetings & Gratitude'
    },
    totalModules: 10,
    totalLessons: 38,
    totalStudents: 16200,
    rating: 4.85,
    bannerGradient: 'from-emerald-950 via-teal-900 to-slate-950',
    badge: 'Bhasha Sangam',
    difficulty: 'Beginner Friendly'
  },
  {
    id: 'course_ur_hindi',
    languageEng: 'Urdu',
    languageNative: 'اردو',
    scriptName: 'Perso-Arabic (Nastaliq) / Devanagari',
    region: 'Pan-India',
    category: 'Classical & Regional',
    titleHindi: 'اردو سے ہندی — उर्दू माध्यम से देवनागरी हिंदी सीखें',
    titleEng: 'Learn Hindi via Urdu — Spoken Intelligibility to Devanagari Script',
    description: 'Urdu and Hindi share identical spoken grammar. Urdu speakers focus on learning Devanagari reading/writing and literary Tatsama vocabulary.',
    cognateExample: {
      native: 'شکریہ / سلام',
      nativePhonetics: 'Shukriya / Salaam',
      hindi: 'धन्यवाद / नमस्ते',
      hindiTranslit: 'Dhanyavaad / Namaste',
      meaning: 'Thanks & Greetings'
    },
    totalModules: 8,
    totalLessons: 32,
    totalStudents: 45600,
    rating: 4.95,
    bannerGradient: 'from-violet-950 via-purple-900 to-slate-900',
    badge: '100% Spoken Match',
    difficulty: 'Fast Track'
  },
  {
    id: 'course_sa_hindi',
    languageEng: 'Sanskrit',
    languageNative: 'संस्कृतम्',
    scriptName: 'Devanagari (देवनागरी)',
    region: 'Pan-India / Ancient Heritage',
    category: 'Classical & Regional',
    titleHindi: 'संस्कृतेन हिंदी — संस्कृत मूल से आधुनिक हिंदी शिक्षण',
    titleEng: 'Learn Hindi via Sanskrit — Classical Roots to Modern Hindi',
    description: 'Sanskrit is the mother language of Hindi. Learn modern Hindi grammar, tenses, and idioms by linking them directly to classical Sanskrit roots.',
    cognateExample: {
      native: 'नमो नमः / धन्यवादः',
      nativePhonetics: 'Namo Namah / Dhanyavaadah',
      hindi: 'नमस्ते / धन्यवाद',
      hindiTranslit: 'Namaste / Dhanyavaad',
      meaning: 'Salutations & Gratitude'
    },
    totalModules: 7,
    totalLessons: 28,
    totalStudents: 21900,
    rating: 4.95,
    bannerGradient: 'from-amber-950 via-red-900 to-slate-950',
    badge: 'Mother Root',
    difficulty: 'Fast Track'
  },
  {
    id: 'course_ne_hindi',
    languageEng: 'Nepali',
    languageNative: 'नेपाली',
    scriptName: 'Devanagari (देवनागरी)',
    region: 'Sikkim, West Bengal & Gorkhaland',
    category: 'North & Himalayan',
    titleHindi: 'नेपालीबाट हिंदी — नेपाली भाषियों के लिए हिंदी',
    titleEng: 'Learn Hindi via Nepali — Shared Devanagari Heritage',
    description: 'Nepali learners enjoy immediate script familiarity with Devanagari. Focus on nuances in Hindi verb tenses, formal registers, and vocabulary.',
    cognateExample: {
      native: 'नमस्ते / धन्यवाद',
      nativePhonetics: 'Namaste / Dhanyabaad',
      hindi: 'नमस्ते / धन्यवाद',
      hindiTranslit: 'Namaste / Dhanyavaad',
      meaning: 'Greetings & Thanks'
    },
    totalModules: 8,
    totalLessons: 30,
    totalStudents: 19400,
    rating: 4.9,
    bannerGradient: 'from-red-950 via-rose-900 to-[#082C6C]',
    badge: 'Direct Script',
    difficulty: 'Fast Track'
  },
  {
    id: 'course_ks_hindi',
    languageEng: 'Kashmiri',
    languageNative: 'कॉशुर',
    scriptName: 'Perso-Arabic / Devanagari (कश्मीरी)',
    region: 'Jammu & Kashmir',
    category: 'North & Himalayan',
    titleHindi: 'कॉशुर प्याठ हिंदी — कश्मीरी भाषियों के लिए हिंदी',
    titleEng: 'Learn Hindi via Kashmiri — Himalayan Linguistic Bridge',
    description: 'Designed for Kashmir valley and Jammu region learners. Bridges Kashmiri phonetic structures with standard Devanagari Hindi reading and speech.',
    cognateExample: {
      native: 'नमस्कार / शुक्रिया',
      nativePhonetics: 'Namaskar / Shukriya',
      hindi: 'नमस्कार / धन्यवाद',
      hindiTranslit: 'Namaskar / Dhanyavaad',
      meaning: 'Greetings & Thanks'
    },
    totalModules: 10,
    totalLessons: 38,
    totalStudents: 14200,
    rating: 4.85,
    bannerGradient: 'from-sky-950 via-indigo-900 to-[#051C45]',
    badge: 'Himalayan Portal',
    difficulty: 'Beginner Friendly'
  },
  {
    id: 'course_kok_hindi',
    languageEng: 'Konkani',
    languageNative: 'कोंकणी',
    scriptName: 'Devanagari (कोंकणी)',
    region: 'Goa & Coastal Karnataka',
    category: 'West & Central',
    titleHindi: 'कोंकणी सावन हिंदी — कोंकणी से हिंदी भाषा कोर्स',
    titleEng: 'Learn Hindi via Konkani — West Coast Devanagari Gateway',
    description: 'Konkani in Goa uses Devanagari script. Leverage your native coastal vocabulary to master Hindi grammar, poetry, and formal writing.',
    cognateExample: {
      native: 'नमस्कार / देव बरे करू',
      nativePhonetics: 'Namaskar / Dev Bare Karu',
      hindi: 'नमस्कार / धन्यवाद',
      hindiTranslit: 'Namaskar / Dhanyavaad',
      meaning: 'Greetings & Gratitude'
    },
    totalModules: 9,
    totalLessons: 36,
    totalStudents: 12800,
    rating: 4.85,
    bannerGradient: 'from-blue-950 via-cyan-900 to-slate-900',
    badge: 'Coastal Gateway',
    difficulty: 'Fast Track'
  },
  {
    id: 'course_mai_hindi',
    languageEng: 'Maithili',
    languageNative: 'मैथिली',
    scriptName: 'Tirhuta / Devanagari',
    region: 'Mithila / Bihar',
    category: 'East & North-East',
    titleHindi: 'मैथिली सं हिंदी — मैथिली भाषियों के लिए हिंदी',
    titleEng: 'Learn Hindi via Maithili — Mithila Heritage to Standard Hindi',
    description: 'Maithili speakers share deep cultural and grammatical ties with Hindi. Master formal business Hindi and competitive examination Hindi.',
    cognateExample: {
      native: 'प्रणाम / धन्यवाद',
      nativePhonetics: 'Pranam / Dhanyavaad',
      hindi: 'प्रणाम / धन्यवाद',
      hindiTranslit: 'Pranam / Dhanyavaad',
      meaning: 'Respectful Greeting & Thanks'
    },
    totalModules: 8,
    totalLessons: 32,
    totalStudents: 27300,
    rating: 4.9,
    bannerGradient: 'from-amber-950 via-orange-900 to-slate-950',
    badge: 'Mithila Heritage',
    difficulty: 'Fast Track'
  },
  {
    id: 'course_sd_hindi',
    languageEng: 'Sindhi',
    languageNative: 'सिंधी / سنڌي',
    scriptName: 'Arabic / Devanagari',
    region: 'Pan-India Sindhi Diaspora',
    category: 'West & Central',
    titleHindi: 'सिंधी मां हिंदी — सिंधी भाषियों के लिए हिंदी',
    titleEng: 'Learn Hindi via Sindhi — Phonetic & Script Mapping',
    description: 'Connect Sindhi sound system with Devanagari script. Ideal for Sindhi community students across India seeking fluent spoken & written Hindi.',
    cognateExample: {
      native: 'नमस्कार / मेहरबानी',
      nativePhonetics: 'Namaskar / Meherbani',
      hindi: 'नमस्कार / धन्यवाद',
      hindiTranslit: 'Namaskar / Dhanyavaad',
      meaning: 'Greetings & Thanks'
    },
    totalModules: 10,
    totalLessons: 38,
    totalStudents: 11500,
    rating: 4.8,
    bannerGradient: 'from-pink-950 via-rose-900 to-[#051C45]',
    badge: 'Diaspora Bridge',
    difficulty: 'Beginner Friendly'
  },
  {
    id: 'course_doi_hindi',
    languageEng: 'Dogri',
    languageNative: 'डोगरी',
    scriptName: 'Devanagari (डोगरी)',
    region: 'Jammu Region',
    category: 'North & Himalayan',
    titleHindi: 'डोगरी थमां हिंदी — डोगरी भाषियों के लिए हिंदी',
    titleEng: 'Learn Hindi via Dogri — Duggar Culture to Standard Hindi',
    description: 'Explore the natural harmony between Dogri expressions and standard Hindi vocabulary with audio lessons and interactive quizzes.',
    cognateExample: {
      native: 'जय देवा / धन्यवाद',
      nativePhonetics: 'Jai Deva / Dhanyavaad',
      hindi: 'नमस्ते / धन्यवाद',
      hindiTranslit: 'Namaste / Dhanyavaad',
      meaning: 'Greetings & Thanks'
    },
    totalModules: 9,
    totalLessons: 34,
    totalStudents: 10800,
    rating: 4.85,
    bannerGradient: 'from-yellow-950 via-amber-900 to-slate-900',
    badge: 'Duggar Bridge',
    difficulty: 'Beginner Friendly'
  },
  {
    id: 'course_mni_hindi',
    languageEng: 'Manipuri (Meitei)',
    languageNative: 'মৈতৈলোন্ / मणीपुरी',
    scriptName: 'Meitei Mayek / Bengali Script',
    region: 'Manipur',
    category: 'East & North-East',
    titleHindi: 'মৈতৈলোন্দগী হিন্দি — मणिपुरी भाषियों के लिए हिंदी',
    titleEng: 'Learn Hindi via Manipuri — North-East Visual & Audio Gateway',
    description: 'Designed specifically for Manipur students. Uses visual script guides and Meiteilon audio explanations for smooth Hindi learning.',
    cognateExample: {
      native: 'खुरुमजरी / थागत्चरी',
      nativePhonetics: 'Khurumjari / Thagatchari',
      hindi: 'नमस्ते / धन्यवाद',
      hindiTranslit: 'Namaste / Dhanyavaad',
      meaning: 'Greetings & Gratitude'
    },
    totalModules: 12,
    totalLessons: 46,
    totalStudents: 13900,
    rating: 4.9,
    bannerGradient: 'from-emerald-950 via-teal-900 to-[#082C6C]',
    badge: 'Meitei Mayek Bridge',
    difficulty: 'Beginner Friendly'
  },
  {
    id: 'course_brx_hindi',
    languageEng: 'Bodo',
    languageNative: 'बोडो',
    scriptName: 'Devanagari (बोडो)',
    region: 'Bodoland / Assam',
    category: 'East & North-East',
    titleHindi: 'बोडोरावजों हिंदी — बोडो भाषियों के लिए हिंदी पाठ्यकम',
    titleEng: 'Learn Hindi via Bodo — Bodoland Devanagari Portal',
    description: 'Since Bodo uses Devanagari script, Bodo speakers can rapidly learn Hindi words, sentence building, and formal communication.',
    cognateExample: {
      native: 'खुलुमबाय / साबायखर',
      nativePhonetics: 'Khulumby / Sabaykhar',
      hindi: 'नमस्ते / धन्यवाद',
      hindiTranslit: 'Namaste / Dhanyavaad',
      meaning: 'Greetings & Thank You'
    },
    totalModules: 9,
    totalLessons: 36,
    totalStudents: 9800,
    rating: 4.85,
    bannerGradient: 'from-teal-950 via-cyan-900 to-slate-950',
    badge: 'Bodoland Gateway',
    difficulty: 'Fast Track'
  },
  {
    id: 'course_sat_hindi',
    languageEng: 'Santali',
    languageNative: 'संथाली / ᱥᱟᱱᱛᱟᱲᱤ',
    scriptName: 'Ol Chiki / Devanagari',
    region: 'Jharkhand, Odisha, West Bengal',
    category: 'Classical & Regional',
    titleHindi: 'संथाली ते हिंदी — संथाली भाषियों के लिए हिंदी',
    titleEng: 'Learn Hindi via Santali — Tribal Heritage to National Language',
    description: 'Connect Ol Chiki & Santali expressions with Devanagari Hindi. Learn essential conversational phrases, grammar, and reading skills.',
    cognateExample: {
      native: 'जोहार / सरहाओ',
      nativePhonetics: 'Johar / Sarhao',
      hindi: 'नमस्ते / धन्यवाद',
      hindiTranslit: 'Namaste / Dhanyavaad',
      meaning: 'Universal Greeting & Thanks'
    },
    totalModules: 10,
    totalLessons: 40,
    totalStudents: 14100,
    rating: 4.9,
    bannerGradient: 'from-amber-950 via-orange-950 to-slate-900',
    badge: 'Tribal Bhasha Bridge',
    difficulty: 'Beginner Friendly'
  },
  {
    id: 'course_en_in_hindi',
    languageEng: 'English & Multilingual',
    languageNative: 'English (Indian Context)',
    scriptName: 'Latin / Romanized Devanagari (Hinglish)',
    region: 'Pan-India & Global Diaspora',
    category: 'Classical & Regional',
    titleHindi: 'English to Hindi — भारतीय अंग्रेजी माध्यम से हिंदी',
    titleEng: 'Learn Hindi via Indian English — Hinglish & Romanized Bridge',
    description: 'Perfect for urban Indian students, NRI global diaspora, and multi-lingual learners who prefer Romanized transliteration alongside Devanagari.',
    cognateExample: {
      native: 'Hello / Thank You',
      nativePhonetics: 'Hello / Thank You',
      hindi: 'नमस्ते / धन्यवाद',
      hindiTranslit: 'Namaste / Dhanyavaad',
      meaning: 'Universal Greeting & Gratitude'
    },
    totalModules: 15,
    totalLessons: 60,
    totalStudents: 68500,
    rating: 4.95,
    bannerGradient: 'from-blue-900 via-indigo-950 to-[#051C45]',
    badge: 'Global NRI Pick',
    difficulty: 'Beginner Friendly'
  }
];

// Interactive Cognate Database for multi-lingual comparison tool
const COMPARATIVE_COGNATES = [
  {
    wordEng: 'Greeting / Hello',
    hindi: 'नमस्ते (Namaste)',
    sanskrit: 'नमो नमः',
    tamil: 'வணக்கம் (Vanakkam)',
    telugu: 'నమస్కారం (Namaskaram)',
    bengali: 'নমস্কার (Nomoshkar)',
    marathi: 'नमस्कार (Namaskar)',
    gujarati: 'નમસ્તે (Namaste)',
    kannada: 'ನಮಸ್ಕಾರ (Namaskara)',
    malayalam: 'നമസ്കാരം (Namaskaram)',
    punjabi: 'ਸਤਿ ਸ਼੍ਰੀ ਅਕਾਲ (Sat Sri Akal)',
    audioText: 'नमस्ते'
  },
  {
    wordEng: 'Thank You',
    hindi: 'धन्यवाद (Dhanyavaad)',
    sanskrit: 'धन्यवादः',
    tamil: 'நன்றி (Nandri)',
    telugu: 'ధన్యవాదాలు (Dhanyavadalu)',
    bengali: 'ধন্যবাদ (Dhanyabad)',
    marathi: 'धन्यवाद (Dhanyavaad)',
    gujarati: 'આભાર (Aabhar)',
    kannada: 'ಧನ್ಯವಾದಗಳು (Dhanyavadagalu)',
    malayalam: 'നന്ദി (Nandi)',
    punjabi: 'ਧੰਨਵਾਦ (Dhannvaad)',
    audioText: 'धन्यवाद'
  },
  {
    wordEng: 'Water',
    hindi: 'जल / पानी (Jal / Paani)',
    sanskrit: 'जलम् / तोयम्',
    tamil: 'நீர் / தண்ணீர் (Neer / Thanneer)',
    telugu: 'నీరు / జలము (Neeru / Jalamu)',
    bengali: 'জল / পানি (Jol / Pani)',
    marathi: 'पाणी / जल (Paani / Jal)',
    gujarati: 'પાણી / જળ (Paani / Jal)',
    kannada: 'ನೀರು / ಜಲ (Neeru / Jala)',
    malayalam: 'വെള്ളം / ജലം (Vellam / Jalam)',
    punjabi: 'ਪਾਣੀ (Paani)',
    audioText: 'जल ही जीवन है'
  },
  {
    wordEng: 'Book / Knowledge',
    hindi: 'पुस्तक / विद्या (Pustak / Vidya)',
    sanskrit: 'पुस्तकम् / विद्या',
    tamil: 'புத்தகம் / வித்தை (Puthagam)',
    telugu: 'పుస్తకం / విద్య (Pustakam)',
    bengali: 'বই / বিদ্যা (Boi / Bidya)',
    marathi: 'पुस्तक / विद्या (Pustak)',
    gujarati: 'પુસ્તક / વિદ્યા (Pustak)',
    kannada: 'ಪುಸ್ತಕ / ವಿದ್ಯೆ (Pustaka)',
    malayalam: 'പുസ്തകം / വിദ്യ (Pusthakam)',
    punjabi: 'ਪੁਸਤਕ / ਵਿੱਦਿਆ (Pustak)',
    audioText: 'ज्ञान ही परम शक्ति है'
  },
  {
    wordEng: 'Mother / Respect',
    hindi: 'माता / माँ (Mata / Maa)',
    sanskrit: 'माता / जननी',
    tamil: 'அம்மா / தாய் (Amma / Thai)',
    telugu: 'అమ్మ / తల్లి (Amma / Thalli)',
    bengali: 'মা / মাতা (Maa / Mata)',
    marathi: 'आई / माता (Aai / Mata)',
    gujarati: 'માતા / મા (Mata / Maa)',
    kannada: 'ಅಮ್ಮ / ತಾಯಿ (Amma / Thayi)',
    malayalam: 'അമ്മ / മാതാവ് (Amma / Mathavu)',
    punjabi: 'ਮਾਂ / ਮਾਤਾ (Maa / Mata)',
    audioText: 'मातृ देवो भव'
  }
];

// Interactive SOV Sentence Reorder Game Items
const SOV_GAME_QUESTIONS = [
  {
    id: 'sov_1',
    nativeLang: 'Tamil / Dravidian SOV',
    nativeSentence: 'நான் હિંદી கற்கிறேன் (Naan Hindi katrikiren)',
    englishTranslation: 'I am learning Hindi.',
    correctHindiTokens: ['मैं', 'हिंदी', 'सीख रहा हूँ'],
    shuffledTokens: ['सीख रहा हूँ', 'मैं', 'हिंदी'],
    hint: 'Hindi follows Subject (मैं) + Object (हिंदी) + Verb (सीख रहा हूँ).'
  },
  {
    id: 'sov_2',
    nativeLang: 'Bengali / Eastern SOV',
    nativeSentence: 'আমি বই পড়ছি (Ami boi porchi)',
    englishTranslation: 'I am reading a book.',
    correctHindiTokens: ['मैं', 'किताब', 'पढ़ रहा हूँ'],
    shuffledTokens: ['पढ़ रहा हूँ', 'किताब', 'मैं'],
    hint: 'Subject (मैं) + Object (किताब) + Verb (पढ़ रहा हूँ).'
  },
  {
    id: 'sov_3',
    nativeLang: 'Telugu / Southern SOV',
    nativeSentence: 'నేను మంచి స్నేహితుడిని (Nenu manchi snehithudini)',
    englishTranslation: 'I am a good friend.',
    correctHindiTokens: ['मैं', 'एक अच्छा', 'दोस्त हूँ'],
    shuffledTokens: ['दोस्त हूँ', 'एक अच्छा', 'मैं'],
    hint: 'Order: Subject + Modifier + Complement.'
  }
];

// 3D Micro Flashcard Deck Items
const FLASHCARDS = [
  {
    id: 1,
    nativeTitle: 'Greeting in Tamil',
    nativeWord: 'வணக்கம் (Vanakkam)',
    hindiWord: 'नमस्ते (Namaste)',
    transliteration: 'Na-mas-te',
    exampleHindi: 'नमस्ते, आप कैसे हैं?',
    exampleEng: 'Hello, how are you?',
    category: 'Daily Salutation'
  },
  {
    id: 2,
    nativeTitle: 'Thanks in Bengali',
    nativeWord: 'ধন্যবাদ (Dhanyabad)',
    hindiWord: 'धन्यवाद (Dhanyavaad)',
    transliteration: 'Dhan-ya-vaad',
    exampleHindi: 'आपकी सहायता के लिए धन्यवाद।',
    exampleEng: 'Thank you for your help.',
    category: 'Polite Phrase'
  },
  {
    id: 3,
    nativeTitle: 'Friend in Marathi',
    nativeWord: 'मित्र (Mitra)',
    hindiWord: 'मित्र / दोस्त (Mitra / Dost)',
    transliteration: 'Mi-tra / Dost',
    exampleHindi: 'वह मेरा सच्चा मित्र है।',
    exampleEng: 'He is my true friend.',
    category: 'Relationship'
  },
  {
    id: 4,
    nativeTitle: 'Welcome in Telugu',
    nativeWord: 'స్వాగతం (Swagatam)',
    hindiWord: 'स्वागत है (Swagat Hai)',
    transliteration: 'Swa-gat Hai',
    exampleHindi: 'हमारे घर में आपका स्वागत है।',
    exampleEng: 'Welcome to our home.',
    category: 'Hospitality'
  }
];

export default function DashboardIndianLanguagesPage() {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'my-courses' | 'ideas' | 'bridge'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedCourseModal, setSelectedCourseModal] = useState<IndianLanguageCourse | null>(null);
  const [activePlayCourse, setActivePlayCourse] = useState<IndianLanguageCourse | null>(null);

  // Source Language & Bidirectional Selector
  const [sourceIndianLang, setSourceIndianLang] = useState<IndianLanguageOption>(INDIAN_LANGUAGES_22[1]); // Default Tamil

  // Game & Interactive Tool States
  const [selectedCognateLang, setSelectedCognateLang] = useState<string>('tamil');
  const [gameIndex, setGameIndex] = useState(0);
  const [userSentenceTokens, setUserSentenceTokens] = useState<string[]>([]);
  const [gameScore, setGameScore] = useState(0);
  const [gameFinished, setGameFinished] = useState(false);
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [cardFlipped, setCardFlipped] = useState(false);
  const [speakingRecording, setSpeakingRecording] = useState(false);
  const [speakingScore, setSpeakingScore] = useState<number | null>(null);

  // Checkout & Payment Modal States
  const [checkoutCourse, setCheckoutCourse] = useState<IndianLanguageCourse | null>(null);
  const [paymentPlan, setPaymentPlan] = useState<'standard' | 'pro' | 'scholarship'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking' | 'scholarship'>('upi');
  const [upiId, setUpiId] = useState('aarav@okaxis');
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentSuccessInvoice, setPaymentSuccessInvoice] = useState<string | null>(null);

  // Video Modal & Interactive Player States
  const [activeVideoIndex, setActiveVideoIndex] = useState<1 | 2 | 3>(1);
  const [activeVideoModal, setActiveVideoModal] = useState<{
    videoIndex: 1 | 2 | 3;
    day: number;
    title: string;
    description: string;
  } | null>(null);
  const [videoModalPlaying, setVideoModalPlaying] = useState<boolean>(false);
  const [showSubtitles, setShowSubtitles] = useState<boolean>(true);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);

  // Multi-Language AI Dubbing State
  const [selectedDubLang, setSelectedDubLang] = useState<string>('hi');
  const [showDubbingModal, setShowDubbingModal] = useState<boolean>(false);
  const [dubbingSearchQuery, setDubbingSearchQuery] = useState<string>('');

  // Full In-Page Course Workspace & Step Completion Tracking
  const [courseStepTab, setCourseStepTab] = useState<'videos' | 'reading' | 'writing' | 'guided-learning' | 'speaking' | 'listening' | 'exam' | 'certificate'>('videos');
  const [courseProgressMap, setCourseProgressMap] = useState<Record<string, {
    video1Done: boolean;
    video2Done: boolean;
    video3Done: boolean;
    readingCompleted: boolean;
    writingCompleted: boolean;
    writingAnswer: string;
    listeningCompleted: boolean;
    listeningAnswer: number;
    examCompleted: boolean;
    examScore: number;
  }>>({
    'course_ta_hindi': {
      video1Done: true,
      video2Done: true,
      video3Done: true,
      readingCompleted: true,
      writingCompleted: true,
      writingAnswer: 'नमस्ते! मैं अपनी मातृभाषा तमिल से हिंदी सीख रहा हूँ।',
      listeningCompleted: true,
      listeningAnswer: 1,
      examCompleted: true,
      examScore: 96
    }
  });

  const getStepProgress = (courseId: string) => {
    const cur = courseProgressMap[courseId] || {
      video1Done: false,
      video2Done: false,
      video3Done: false,
      readingCompleted: false,
      writingCompleted: false,
      writingAnswer: '',
      listeningCompleted: false,
      listeningAnswer: 0,
      examCompleted: false,
      examScore: 0
    };
    const videosCompleted = cur.video1Done && cur.video2Done && cur.video3Done;
    let completedCount = 0;
    if (videosCompleted) completedCount++;
    if (cur.readingCompleted) completedCount++;
    if (cur.writingCompleted) completedCount++;
    if (speakingScore !== null && speakingScore >= 70) completedCount++;
    if (cur.listeningCompleted) completedCount++;
    if (cur.examCompleted) completedCount++;

    const percent = Math.round((completedCount / 6) * 100);
    const allFinished = completedCount >= 5;
    return { ...cur, videosCompleted, completedCount, percent, allFinished };
  };

  const updateCourseProgress = (courseId: string, updates: Partial<typeof courseProgressMap[string]>) => {
    setCourseProgressMap((prev) => ({
      ...prev,
      [courseId]: {
        ...(prev[courseId] || {
          video1Done: false,
          video2Done: false,
          video3Done: false,
          readingCompleted: false,
          writingCompleted: false,
          writingAnswer: '',
          listeningCompleted: false,
          listeningAnswer: 0,
          examCompleted: false,
          examScore: 0
        }),
        ...updates
      }
    }));
  };

  const resetCourseProgress = (courseId: string) => {
    setCourseProgressMap((prev) => ({
      ...prev,
      [courseId]: {
        video1Done: false,
        video2Done: false,
        video3Done: false,
        readingCompleted: false,
        writingCompleted: false,
        writingAnswer: '',
        listeningCompleted: false,
        listeningAnswer: 0,
        examCompleted: false,
        examScore: 0
      }
    }));
    setSpeakingScore(null);
  };

  useEffect(() => {
    setUser(getStoredUser());
  }, []);

  const handleEnroll = (courseId: string) => {
    const updated = enrollInCourse(courseId);
    setUser({ ...updated });
  };

  const isEnrolled = (courseId: string) => {
    return user?.enrolledCourses?.includes(courseId) || false;
  };

  const handleProcessPayment = () => {
    if (!checkoutCourse) return;
    setIsProcessingPayment(true);

    setTimeout(() => {
      const updatedUser = enrollInCourse(checkoutCourse.id);
      setUser({ ...updatedUser });

      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch (e) {
        console.log('Confetti triggered');
      }

      setIsProcessingPayment(false);
      const invNumber = 'INV-HLMS-2026-' + Math.floor(100000 + Math.random() * 900000);
      setPaymentSuccessInvoice(invNumber);
    }, 1500);
  };

  const handleFinishCheckout = () => {
    setPaymentSuccessInvoice(null);
    setCheckoutCourse(null);
    setCouponCode('');
    setCouponApplied(false);
    setActiveTab('my-courses');
  };

  const filteredCourses = useMemo(() => {
    return INDIAN_LANGUAGE_COURSES.filter((c) => {
      const matchesSearch =
        c.languageEng.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.languageNative.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.titleHindi.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.region.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === 'All' || c.category === selectedCategory;

      if (activeTab === 'my-courses') {
        return isEnrolled(c.id) && matchesSearch;
      }
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory, activeTab, user]);

  const enrolledCoursesList = useMemo(() => {
    return INDIAN_LANGUAGE_COURSES.filter((c) => isEnrolled(c.id));
  }, [user]);

  // Audio synthesis helper
  const playAudio = (text: string, ttsLangCode?: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = ttsLangCode || 'hi-IN';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    } else {
      alert(`Audio playing: "${text}"`);
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
      activePlayCourse?.languageEng || '',
      activeVideoModal?.title || 'Indian Language Phonetics & Grammar'
    );
    const speechContent = customText || dubbedInfo.speech;

    const utterance = new SpeechSynthesisUtterance(speechContent);
    utterance.lang = langObj.ttsCode;
    utterance.rate = playbackSpeed || 1.0;
    window.speechSynthesis.speak(utterance);
  };

  // Sentence Builder Game Handler
  const currentGame = SOV_GAME_QUESTIONS[gameIndex];
  const handleAddToken = (token: string) => {
    if (!userSentenceTokens.includes(token)) {
      setUserSentenceTokens([...userSentenceTokens, token]);
    }
  };

  const handleRemoveToken = (token: string) => {
    setUserSentenceTokens(userSentenceTokens.filter((t) => t !== token));
  };

  const handleCheckSentence = () => {
    const isCorrect =
      userSentenceTokens.join(' ') === currentGame.correctHindiTokens.join(' ');
    if (isCorrect) {
      playAudio(currentGame.correctHindiTokens.join(' '));
      setGameScore((prev) => prev + 100);
      if (gameIndex < SOV_GAME_QUESTIONS.length - 1) {
        setTimeout(() => {
          setGameIndex((prev) => prev + 1);
          setUserSentenceTokens([]);
        }, 1200);
      } else {
        setGameFinished(true);
      }
    } else {
      alert('Keep trying! Check the Subject-Object-Verb word order hint.');
    }
  };

  const handleSimulateSpeaking = () => {
    setSpeakingRecording(true);
    setSpeakingScore(null);
    setTimeout(() => {
      setSpeakingRecording(false);
      const score = Math.floor(Math.random() * 15) + 85;
      setSpeakingScore(score);
    }, 2000);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-20 text-left">
      {/* 1. HERO BIDIRECTIONAL CONTROL BANNER (EXACT GOVT & LANDING STYLE) */}
      <div className="p-6 sm:p-8 rounded-sm bg-gradient-to-r from-[#0B3D91] via-[#082C6C] to-[#051C45] text-white border border-[#082C6C] border-l-4 border-[#FF9933] shadow-md space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-black uppercase tracking-wider border border-amber-400/30">
                🇮🇳 MEA 22 SCHEDULED INDIAN LANGUAGES PORTAL
              </span>
              <span className="px-3 py-1 rounded-full bg-blue-400/20 text-blue-200 text-[10px] font-bold border border-blue-400/30">
                NEP 2020 & Bhasha Sangam Aligned
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Learn All 22 Eighth Schedule Indian Languages from Your Native Mother Tongue
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
              Comprehensive learning portal for Indian scholars, civil servants, students & citizens to master 22 Eighth Schedule Indian languages (Hindi, Tamil, Telugu, Bengali, Marathi, Gujarati, Kannada, Malayalam, Punjabi, Odia, Assamese, Sanskrit & more) with IPA phonetics & certified diploma.
            </p>
          </div>

          {/* Direct link to Foreign Languages page */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center bg-[#051C45] p-2 rounded-sm border border-[#082C6C] gap-2 shrink-0">
            <div className="px-3 py-1 text-xs text-amber-300 font-extrabold flex items-center gap-1.5">
              <span>🇮🇳 ➔ 🇮🇳</span> Indian Languages Track Active
            </div>
            <a
              href="/dashboard/student/foreign-languages"
              className="px-4 py-2 rounded-sm text-xs font-black bg-[#0B3D91] hover:bg-[#0E4BA8] text-white border border-blue-400/40 transition flex items-center justify-center gap-2 shadow-sm"
            >
              <span>🇮🇳 ➔ 🌐</span> World Foreign Languages Portal →
            </a>
          </div>
        </div>

        {/* Dynamic Selector Bar */}
        <div className="pt-4 border-t border-slate-700/60 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-amber-300 font-black">Choose Your Source Native Mother Tongue:</span>
            <select
              value={sourceIndianLang.code}
              onChange={(e) => {
                const found = INDIAN_LANGUAGES_22.find((l) => l.code === e.target.value);
                if (found) setSourceIndianLang(found);
              }}
              className="px-3.5 py-1.5 rounded-sm bg-[#051C45] border border-slate-600 text-white text-xs font-bold focus:outline-none focus:border-[#FF9933] cursor-pointer"
            >
              {INDIAN_LANGUAGES_22.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  🇮🇳 {lang.nameEng} ({lang.nameNative}) — {lang.script} Script
                </option>
              ))}
            </select>

            <button
              onClick={() => playAudio(sourceIndianLang.sampleAudioText, sourceIndianLang.ttsCode)}
              className="px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-white font-bold text-[11px] flex items-center gap-1 transition"
            >
              <Volume2 className="w-3.5 h-3.5 text-amber-300" /> Listen Sample
            </button>
          </div>

          <div className="flex items-center gap-2 text-slate-300 text-[11px] font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Official ICCR & MEA Accredited Curriculum with Verifiable QR Diploma</span>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. IN-PAGE COURSE WORKSPACE (WHEN A COURSE IS ACTIVE)    */}
      {/* ========================================================= */}
      {activePlayCourse ? (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Header Bar with Back Button and Pathway Info */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-6 rounded-sm bg-white border border-[#DCE2E6] shadow-xs">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setActivePlayCourse(null)}
                className="px-4 py-2.5 rounded-sm bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-xs flex items-center gap-2 transition"
              >
                ← Back to Courses
              </button>
              <div>
                <span className="text-[10px] font-black uppercase text-[#0B3D91] tracking-wider block">
                  INDIAN SCHOLAR TRACK • 🇮🇳 {activePlayCourse.languageEng} ({activePlayCourse.languageNative}) ➔ Devanagari Hindi
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  {activePlayCourse.titleHindi}
                </h2>
                <p className="text-xs text-slate-500 font-medium">
                  {activePlayCourse.titleEng} • {activePlayCourse.region} • {activePlayCourse.scriptName}
                </p>
              </div>
            </div>

            {/* Overall Progress & Reset Button */}
            {(() => {
              const prog = getStepProgress(activePlayCourse.id);
              return (
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => resetCourseProgress(activePlayCourse.id)}
                    className="p-2.5 rounded-sm bg-slate-100 hover:bg-red-50 text-slate-500 hover:text-red-600 transition"
                    title="Reset Course Progress"
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
                      {prog.allFinished ? '🎉 All 6 Modules Finished! Certificate Ready.' : 'Complete steps in sequence to unlock next.'}
                    </span>
                  </div>
                </div>
              );
            })()}
          </div>

          {/* TWO-COLUMN WORKSPACE: LEFT 7-STEP MODULE RAIL & RIGHT MAIN CONTENT AREA */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* LEFT SIDEBAR: 7-STEP MODULE PROGRESSION RAIL */}
            <div className="lg:col-span-4 xl:col-span-3 space-y-4 lg:sticky lg:top-4">
              {(() => {
                const prog = getStepProgress(activePlayCourse.id);
                const isVideoDone = prog.videosCompleted;
                const isReadingDone = prog.readingCompleted;
                const isWritingDone = prog.writingCompleted;
                const isSpeakingDone = speakingScore !== null && speakingScore >= 70;
                const isListeningDone = prog.listeningCompleted;
                const isExamDone = prog.examCompleted;

                const navItems = [
                  {
                    id: 'videos' as const,
                    title: '1. Video Lectures',
                    subtitle: isVideoDone ? '✓ 3/3 Done' : '3 HD Videos',
                    icon: Play,
                    unlocked: true,
                    completed: isVideoDone
                  },
                  {
                    id: 'reading' as const,
                    title: '2. Reading & Grammar',
                    subtitle: isReadingDone ? '✓ Completed' : isVideoDone ? 'Reading Text' : '🔒 Finish Videos',
                    icon: BookOpen,
                    unlocked: isVideoDone,
                    completed: isReadingDone
                  },
                  {
                    id: 'writing' as const,
                    title: '3. Written Practice',
                    subtitle: isWritingDone ? '✓ Submitted' : isReadingDone ? 'Written Exercise' : '🔒 Finish Step 2',
                    icon: FileText,
                    unlocked: isReadingDone,
                    completed: isWritingDone
                  },
                  {
                    id: 'guided-learning' as const,
                    title: '📖 Guided Study Modules',
                    subtitle: 'Official NIOS PDFs',
                    icon: Bookmark,
                    unlocked: true,
                    completed: false
                  },
                  {
                    id: 'speaking' as const,
                    title: '4. Speaking AI Coach',
                    subtitle: isSpeakingDone ? `✓ Score ${speakingScore}%` : isWritingDone ? 'AI Voice Coach' : '🔒 Finish Step 3',
                    icon: Mic,
                    unlocked: isWritingDone,
                    completed: isSpeakingDone
                  },
                  {
                    id: 'listening' as const,
                    title: '5. Listening Test',
                    subtitle: isListeningDone ? '✓ Completed' : isSpeakingDone ? 'Audio Comprehension' : '🔒 Finish Step 4',
                    icon: Volume2,
                    unlocked: isSpeakingDone,
                    completed: isListeningDone
                  },
                  {
                    id: 'exam' as const,
                    title: '6. Final Exam',
                    subtitle: isExamDone ? `✓ Score ${prog.examScore}%` : isListeningDone ? 'Final Assessment' : '🔒 Finish Step 5',
                    icon: Award,
                    unlocked: isListeningDone,
                    completed: isExamDone
                  },
                  {
                    id: 'certificate' as const,
                    title: '7. Bhasha Ratna Diploma',
                    subtitle: prog.allFinished ? '🏆 Ratna Award' : '🔒 Finish All 6 Modules',
                    icon: Award,
                    unlocked: prog.allFinished,
                    completed: prog.allFinished
                  }
                ];

                return (
                  <div className="space-y-2 bg-white p-3 rounded-sm border border-[#DCE2E6] shadow-2xs">
                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider px-2 block">
                      Learning Pathway Steps
                    </span>
                    {navItems.map((item) => {
                      const Icon = item.icon;
                      const isCurrent = courseStepTab === item.id;

                      return (
                        <button
                          key={item.id}
                          disabled={!item.unlocked}
                          onClick={() => setCourseStepTab(item.id)}
                          className={`w-full text-left p-3 rounded-sm transition flex items-center justify-between gap-2 border ${
                            isCurrent
                              ? 'bg-[#EEF3F8] border-[#0B3D91] text-[#082C6C] shadow-2xs'
                              : item.unlocked
                              ? 'bg-white border-[#DCE2E6] text-slate-700 hover:bg-slate-50'
                              : 'bg-slate-50 border-slate-200 text-slate-400 cursor-not-allowed opacity-60'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <div
                              className={`w-7 h-7 rounded-sm font-black text-xs flex items-center justify-center shrink-0 ${
                                item.completed
                                  ? 'bg-emerald-100 text-emerald-700'
                                  : isCurrent
                                  ? 'bg-[#0B3D91] text-white'
                                  : 'bg-slate-200 text-slate-600'
                              }`}
                            >
                              {item.completed ? <Check className="w-4 h-4" /> : <Icon className="w-3.5 h-3.5" />}
                            </div>
                            <div>
                              <h4 className="text-xs font-black leading-tight">{item.title}</h4>
                              <p className="text-[10px] text-slate-500 font-semibold">{item.subtitle}</p>
                            </div>
                          </div>
                          {!item.unlocked && <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                );
              })()}
            </div>

            {/* RIGHT MAIN WORKSPACE CONTENT */}
            <div className="lg:col-span-8 xl:col-span-9">
              {/* STEP 1: VIDEO LECTURES */}
              {courseStepTab === 'videos' && (
                <div className="p-6 sm:p-8 rounded-sm bg-white border border-[#DCE2E6] space-y-6 shadow-xs">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#DCE2E6] pb-4">
                    <div>
                      <span className="text-[10px] font-black uppercase text-[#0B3D91] tracking-wider block">
                        MODULE 1 OF 6 • VIDEO LECTURE STUDIO
                      </span>
                      <h3 className="text-xl font-black text-slate-900">
                        {activePlayCourse.languageEng} to Hindi Video Masterclass
                      </h3>
                      <p className="text-xs text-slate-500">
                        Structured video lectures explaining phonetics, Devanagari script, and conversation syntax.
                      </p>
                    </div>

                    <button
                      onClick={() => setShowDubbingModal(true)}
                      className="px-4 py-2 rounded-sm bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-700 font-bold text-xs flex items-center gap-1.5 transition"
                    >
                      <Radio className="w-4 h-4 text-purple-600" />
                      <span>🎙️ Dub Video in 19+ Languages</span>
                    </button>
                  </div>

                  {/* Video Player Container */}
                  <div className="relative rounded-sm bg-slate-950 aspect-video overflow-hidden shadow-xl flex items-center justify-center border border-slate-800 group">
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-80" />

                    {videoModalPlaying ? (
                      <div className="relative z-10 p-6 text-center space-y-4 text-white max-w-lg">
                        <div className="w-16 h-16 rounded-full bg-[#0B3D91] border-2 border-amber-400 flex items-center justify-center mx-auto animate-pulse shadow-lg">
                          <Volume2 className="w-8 h-8 text-white" />
                        </div>
                        <h4 className="text-lg font-black">
                          Playing HD Video Lecture #{activeVideoIndex}
                        </h4>
                        <p className="text-xs text-slate-300 font-mono bg-black/50 p-3 rounded-sm border border-slate-800">
                          {getDubbedSpeechData(selectedDubLang, activePlayCourse.languageEng, `Lecture ${activeVideoIndex}`).speech}
                        </p>
                        <div className="flex items-center justify-center gap-3 pt-2">
                          <button
                            onClick={() => playDubbedSpeech()}
                            className="px-4 py-2 rounded-sm bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs transition shadow-sm flex items-center gap-1.5"
                          >
                            <Volume2 className="w-3.5 h-3.5" /> Replay Audio
                          </button>
                          <button
                            onClick={() => setVideoModalPlaying(false)}
                            className="px-4 py-2 rounded-sm bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition"
                          >
                            Pause Video
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="relative z-10 text-center space-y-3 p-6">
                        <button
                          onClick={() => {
                            setVideoModalPlaying(true);
                            playDubbedSpeech();
                          }}
                          className="w-20 h-20 rounded-full bg-[#0B3D91] hover:bg-[#082C6C] text-white flex items-center justify-center mx-auto shadow-2xl transition hover:scale-105"
                        >
                          <Play className="w-10 h-10 fill-white ml-1" />
                        </button>
                        <span className="text-xs font-black uppercase text-amber-300 tracking-wider block">
                          Click to Start Video Lecture #{activeVideoIndex}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Video Selector Rail & Next Button */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[1, 2, 3].map((vNum) => (
                      <button
                        key={vNum}
                        onClick={() => {
                          setActiveVideoIndex(vNum as 1 | 2 | 3);
                          setVideoModalPlaying(false);
                        }}
                        className={`p-3.5 rounded-sm border text-left transition flex items-center justify-between gap-2 ${
                          activeVideoIndex === vNum
                            ? 'bg-[#EEF3F8] border-[#0B3D91] text-[#082C6C]'
                            : 'bg-white border-[#DCE2E6] text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <div>
                          <span className="text-[10px] font-black uppercase text-slate-400 block">Lecture {vNum}</span>
                          <span className="text-xs font-black">
                            {vNum === 1 ? 'Alphabet & Script' : vNum === 2 ? 'Sentence Syntax' : 'Conversation Drills'}
                          </span>
                        </div>
                        {vNum === activeVideoIndex ? <CheckCircle2 className="w-4 h-4 text-[#0B3D91]" /> : <Play className="w-3.5 h-3.5 text-slate-400" />}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-[#DCE2E6]">
                    <span className="text-xs text-slate-500 font-medium">
                      Watch all 3 video lectures to mark Step 1 complete.
                    </span>
                    <button
                      onClick={() => {
                        updateCourseProgress(activePlayCourse.id, {
                          video1Done: true,
                          video2Done: true,
                          video3Done: true
                        });
                        setCourseStepTab('reading');
                      }}
                      className="px-6 py-3 rounded-sm bg-[#0B3D91] hover:bg-[#082C6C] text-white font-black text-xs uppercase tracking-wider shadow-md transition flex items-center gap-2"
                    >
                      Complete Videos & Unlock Step 2: Reading →
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: READING & GRAMMAR */}
              {courseStepTab === 'reading' && (
                <div className="p-6 sm:p-8 rounded-sm bg-white border border-[#DCE2E6] space-y-6 shadow-xs">
                  <div className="flex items-center justify-between border-b border-[#DCE2E6] pb-4">
                    <div>
                      <span className="text-[10px] font-black uppercase text-[#0B3D91] tracking-wider block">
                        MODULE 2 OF 6 • READING & GRAMMAR STUDIO
                      </span>
                      <h3 className="text-xl font-black text-slate-900">
                        Parallel Reading & Devanagari Transcript
                      </h3>
                      <p className="text-xs text-slate-500">
                        Read synchronized transcripts in {activePlayCourse.languageEng} and Devanagari Hindi with audio support.
                      </p>
                    </div>
                  </div>

                  <div className="p-6 rounded-sm bg-[#EEF3F8]/50 border border-[#DCE2E6] space-y-5">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full bg-blue-100 text-[#0B3D91] font-black text-xs">
                        Lesson Passage #1
                      </span>
                      <button
                        onClick={() => playAudio(activePlayCourse.cognateExample.hindi)}
                        className="px-3 py-1.5 rounded-sm bg-[#0B3D91] hover:bg-[#082C6C] text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition"
                      >
                        <Volume2 className="w-3.5 h-3.5" /> Listen Audio
                      </button>
                    </div>

                    <div className="space-y-3 bg-white p-5 rounded-sm border border-[#DCE2E6]">
                      <div className="space-y-1 border-b border-slate-100 pb-3">
                        <span className="text-[10px] font-black text-slate-400 uppercase">Native {activePlayCourse.languageEng} Expression</span>
                        <p className="text-base font-bold text-slate-900">{activePlayCourse.cognateExample.native} ({activePlayCourse.cognateExample.nativePhonetics})</p>
                      </div>

                      <div className="space-y-1 border-b border-slate-100 pb-3">
                        <span className="text-[10px] font-black text-[#0B3D91] uppercase">Devanagari Hindi Equivalent</span>
                        <p className="text-lg font-black text-[#082C6C]">{activePlayCourse.cognateExample.hindi} ({activePlayCourse.cognateExample.hindiTranslit})</p>
                      </div>

                      <div className="space-y-1">
                        <span className="text-[10px] font-black text-slate-400 uppercase">Linguistic Meaning</span>
                        <p className="text-xs text-slate-600 font-medium">{activePlayCourse.cognateExample.meaning}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-[#DCE2E6]">
                    <span className="text-xs text-slate-500 font-medium">Review the grammar passage to unlock written exercises.</span>
                    <button
                      onClick={() => {
                        updateCourseProgress(activePlayCourse.id, { readingCompleted: true });
                        setCourseStepTab('writing');
                      }}
                      className="px-6 py-3 rounded-sm bg-[#0B3D91] hover:bg-[#082C6C] text-white font-black text-xs uppercase tracking-wider shadow-md transition flex items-center gap-2"
                    >
                      Mark Reading Done & Unlock Step 3: Writing →
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: WRITTEN PRACTICE STUDIO */}
              {courseStepTab === 'writing' && (
                <div className="p-6 sm:p-8 rounded-sm bg-white border border-[#DCE2E6] space-y-6 shadow-xs">
                  <div className="flex items-center justify-between border-b border-[#DCE2E6] pb-4">
                    <div>
                      <span className="text-[10px] font-black uppercase text-[#0B3D91] tracking-wider block">
                        MODULE 3 OF 6 • WRITTEN PRACTICE STUDIO
                      </span>
                      <h3 className="text-xl font-black text-slate-900">
                        SOV Sentence Construction & Writing
                      </h3>
                      <p className="text-xs text-slate-500">
                        Practice constructing fluent Hindi sentences from your native {activePlayCourse.languageEng} word order.
                      </p>
                    </div>
                  </div>

                  {(() => {
                    const prog = getStepProgress(activePlayCourse.id);
                    return (
                      <div className="space-y-4">
                        <div className="p-4 rounded-sm bg-amber-50 border border-amber-200 text-amber-900 text-xs space-y-1.5">
                          <span className="font-black block">Word Order Rule (SOV):</span>
                          <span>In Hindi, the Subject comes first, followed by the Object, and ending with the Verb.</span>
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs font-black text-slate-800 block">
                            Type or compose your answer in Hindi:
                          </label>
                          <textarea
                            rows={3}
                            value={prog.writingAnswer}
                            onChange={(e) => updateCourseProgress(activePlayCourse.id, { writingAnswer: e.target.value })}
                            placeholder="Type sentence here..."
                            className="w-full p-4 rounded-sm bg-slate-50 border border-[#D0DCE7] text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0B3D91]"
                          />
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-[#DCE2E6]">
                          <button
                            onClick={() => {
                              if (!prog.writingAnswer.trim()) {
                                alert('Please enter your written answer first.');
                                return;
                              }
                              updateCourseProgress(activePlayCourse.id, { writingCompleted: true });
                              addXpToUser(30);
                              alert('✅ Written practice exercise submitted successfully!');
                            }}
                            className={`px-6 py-3 rounded-sm font-bold text-xs transition ${
                              prog.writingCompleted
                                ? 'bg-emerald-600 text-white'
                                : 'bg-[#0B3D91] hover:bg-[#082C6C] text-white shadow-md'
                            }`}
                          >
                            {prog.writingCompleted ? '✓ Exercise Submitted' : 'Submit Written Practice'}
                          </button>

                          <button
                            disabled={!prog.writingCompleted}
                            onClick={() => setCourseStepTab('speaking')}
                            className={`px-6 py-3 rounded-sm font-bold text-xs flex items-center gap-2 transition ${
                              !prog.writingCompleted
                                ? 'bg-slate-200 text-slate-400 border border-[#D0DCE7] cursor-not-allowed'
                                : 'bg-[#0B3D91] hover:bg-[#082C6C] text-white shadow-md'
                            }`}
                          >
                            {!prog.writingCompleted ? '🔒 Submit Practice First' : 'Proceed to Step 4: Speaking →'}
                          </button>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}

              {/* STEP: GUIDED STUDY MODULES (NIOS PDFS) */}
              {courseStepTab === 'guided-learning' && (
                <div className="p-6 sm:p-8 rounded-sm bg-white border border-[#DCE2E6] space-y-6 shadow-xs">
                  <div className="flex items-center justify-between border-b border-[#DCE2E6] pb-4">
                    <div>
                      <span className="text-[10px] font-black uppercase text-[#0B3D91] tracking-wider block">
                        GUIDED STUDY • NIOS ACCREDITED MATERIAL
                      </span>
                      <h3 className="text-xl font-black text-slate-900">
                        Official NIOS Self-Learning Study Modules (PDFs)
                      </h3>
                      <p className="text-xs text-slate-500">
                        Download government-curated NIOS Bhasha Sangam self-learning PDF textbooks.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { title: 'Module 1: Basic Devanagari & Phonetics', pages: '42 Pages PDF', code: 'NIOS-HIN-M1' },
                      { title: 'Module 2: Grammar, Tenses & SOV Rules', pages: '56 Pages PDF', code: 'NIOS-HIN-M2' },
                      { title: 'Module 3: Formal Conversational Hindi', pages: '64 Pages PDF', code: 'NIOS-HIN-M3' },
                      { title: 'Module 4: Comparative Cognate Dictionary', pages: '38 Pages PDF', code: 'NIOS-HIN-M4' }
                    ].map((mod, idx) => (
                      <div key={idx} className="p-4 rounded-sm border border-[#DCE2E6] bg-slate-50 flex items-center justify-between gap-4">
                        <div className="space-y-1">
                          <span className="text-[10px] font-black text-blue-600 block">{mod.code}</span>
                          <h4 className="text-xs font-black text-slate-900">{mod.title}</h4>
                          <span className="text-[11px] text-slate-500 block">{mod.pages}</span>
                        </div>
                        <button
                          onClick={() => alert(`Downloading official ${mod.code} PDF textbook...`)}
                          className="p-2.5 rounded-sm bg-white border border-[#DCE2E6] hover:bg-[#0B3D91] hover:text-white text-slate-700 transition shadow-2xs"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 4: SPEAKING AI COACH */}
              {courseStepTab === 'speaking' && (
                <div className="p-6 sm:p-8 rounded-sm bg-white border border-[#DCE2E6] space-y-6 shadow-xs">
                  <div className="flex items-center justify-between border-b border-[#DCE2E6] pb-4">
                    <div>
                      <span className="text-[10px] font-black uppercase text-[#0B3D91] tracking-wider block">
                        MODULE 4 OF 6 • SPEAKING AI COACH
                      </span>
                      <h3 className="text-xl font-black text-slate-900">
                        Speech Articulation & Pronunciation Drill
                      </h3>
                      <p className="text-xs text-slate-500">
                        Record your voice speaking Hindi phrases and receive instant AI phonetic feedback.
                      </p>
                    </div>
                  </div>

                  <div className="p-6 rounded-sm bg-slate-900 text-white space-y-6 text-center">
                    <div className="space-y-2">
                      <span className="text-xs font-black text-amber-300 uppercase tracking-widest block">Phrase to Recite:</span>
                      <p className="text-2xl font-black text-white">
                        &quot;{activePlayCourse.cognateExample.hindi}&quot;
                      </p>
                      <p className="text-xs text-slate-400">({activePlayCourse.cognateExample.hindiTranslit})</p>
                    </div>

                    <div className="flex flex-col items-center justify-center gap-3">
                      <button
                        onClick={handleSimulateSpeaking}
                        disabled={speakingRecording}
                        className={`w-20 h-20 rounded-full flex items-center justify-center transition shadow-2xl ${
                          speakingRecording
                            ? 'bg-red-600 animate-pulse text-white'
                            : 'bg-[#0B3D91] hover:bg-[#082C6C] text-white hover:scale-105'
                        }`}
                      >
                        <Mic className="w-8 h-8" />
                      </button>
                      <span className="text-xs font-bold text-slate-300">
                        {speakingRecording ? '🎙️ Recording & Analyzing Speech...' : 'Click Mic to Start Reciting'}
                      </span>
                    </div>

                    {speakingScore !== null && (
                      <div className="p-4 rounded-sm bg-white/10 border border-white/20 text-center space-y-1">
                        <span className="text-xs text-slate-300 font-semibold block">AI Pronunciation Accuracy Score:</span>
                        <span className="text-3xl font-black text-emerald-400">{speakingScore}%</span>
                        <span className="text-[11px] text-emerald-200 font-bold block">
                          {speakingScore >= 80 ? '🎉 Excellent Articulation! Grade A+' : 'Good attempt! Recite again for perfection.'}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-[#DCE2E6]">
                    <span className="text-xs text-slate-500 font-medium">Achieve score ≥70% to unlock listening test.</span>
                    <button
                      disabled={speakingScore === null || speakingScore < 70}
                      onClick={() => setCourseStepTab('listening')}
                      className={`px-6 py-3 rounded-sm font-bold text-xs flex items-center gap-2 transition ${
                        speakingScore === null || speakingScore < 70
                          ? 'bg-slate-200 text-slate-400 border border-[#D0DCE7] cursor-not-allowed'
                          : 'bg-[#0B3D91] hover:bg-[#082C6C] text-white shadow-md'
                      }`}
                    >
                      {speakingScore === null || speakingScore < 70 ? '🔒 Achieve 70%+ to Proceed' : 'Proceed to Step 5: Listening Test →'}
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 5: LISTENING TEST */}
              {courseStepTab === 'listening' && (
                <div className="p-6 sm:p-8 rounded-sm bg-white border border-[#DCE2E6] space-y-6 shadow-xs">
                  <div className="flex items-center justify-between border-b border-[#DCE2E6] pb-4">
                    <div>
                      <span className="text-[10px] font-black uppercase text-[#0B3D91] tracking-wider block">
                        MODULE 5 OF 6 • LISTENING COMPREHENSION
                      </span>
                      <h3 className="text-xl font-black text-slate-900">
                        Acoustic Listening & Dialogue Comprehension
                      </h3>
                      <p className="text-xs text-slate-500">
                        Listen to authentic audio dialogues and answer comprehension questions.
                      </p>
                    </div>
                  </div>

                  <div className="p-6 rounded-sm bg-[#EEF3F8] border border-[#D0DCE7] space-y-4">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => playAudio(activePlayCourse.cognateExample.hindi)}
                        className="w-16 h-16 rounded-sm bg-[#0B3D91] hover:bg-[#082C6C] text-white flex items-center justify-center shrink-0 shadow-md transition hover:scale-105"
                      >
                        <Volume2 className="w-8 h-8 fill-white ml-0.5" />
                      </button>
                      <div>
                        <span className="text-[10px] font-black text-[#0B3D91] uppercase tracking-wider block">
                          Acoustic Audio Sample #1
                        </span>
                        <h4 className="text-base font-bold text-slate-900">
                          Listen to Hindi dialogue spoken clearly
                        </h4>
                        <p className="text-xs text-slate-500 mt-0.5">Click speaker button to play audio clip</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 rounded-sm bg-slate-50 border border-[#DCE2E6] space-y-4 text-xs">
                    <h4 className="text-sm font-black text-slate-900">
                      Question: What is the primary greeting or meaning expressed in the audio clip?
                    </h4>

                    {(() => {
                      const prog = getStepProgress(activePlayCourse.id);
                      const options = [
                        'A polite respectful greeting and cultural introduction (Correct)',
                        'Asking for directions to the railway station',
                        'Ordering tea at a traditional tea stall',
                        'Inquiring about weather conditions in New Delhi'
                      ];

                      return (
                        <div className="space-y-2.5">
                          {options.map((opt, i) => (
                            <label
                              key={i}
                              onClick={() => updateCourseProgress(activePlayCourse.id, { listeningAnswer: i + 1 })}
                              className={`p-3.5 rounded-sm border flex items-center gap-3 cursor-pointer font-bold transition ${
                                prog.listeningAnswer === i + 1
                                  ? 'bg-[#EEF3F8] border-[#0B3D91] text-[#082C6C]'
                                  : 'bg-white border-[#DCE2E6] text-slate-700 hover:bg-slate-100'
                              }`}
                            >
                              <input type="radio" checked={prog.listeningAnswer === i + 1} readOnly className="text-[#0B3D91]" />
                              <span>{opt}</span>
                            </label>
                          ))}

                          <div className="flex items-center justify-between pt-4 border-t border-[#DCE2E6]">
                            <button
                              onClick={() => {
                                if (prog.listeningAnswer === 0) {
                                  alert('Please select an option first.');
                                  return;
                                }
                                updateCourseProgress(activePlayCourse.id, { listeningCompleted: true });
                                addXpToUser(40);
                                alert('✅ Listening test submitted successfully! Grade: 100% correct.');
                              }}
                              className={`px-6 py-3 rounded-sm font-bold text-xs transition ${
                                prog.listeningCompleted
                                  ? 'bg-emerald-600 text-white'
                                  : 'bg-[#0B3D91] hover:bg-[#082C6C] text-white shadow-md'
                              }`}
                            >
                              {prog.listeningCompleted ? '✓ Listening Test Submitted (100%)' : 'Submit Listening Test'}
                            </button>

                            <button
                              disabled={!prog.listeningCompleted}
                              onClick={() => setCourseStepTab('exam')}
                              className={`px-6 py-3 rounded-sm font-bold text-xs flex items-center gap-2 transition ${
                                !prog.listeningCompleted
                                  ? 'bg-slate-200 text-slate-400 border border-[#D0DCE7] cursor-not-allowed'
                                  : 'bg-[#0B3D91] hover:bg-[#082C6C] text-white shadow-md'
                              }`}
                            >
                              {!prog.listeningCompleted ? '🔒 Submit Listening First' : 'Proceed to Step 6: Final Exam →'}
                            </button>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </div>
              )}

              {/* STEP 6: FINAL EXAM ASSESSMENT */}
              {courseStepTab === 'exam' && (
                <div className="p-6 sm:p-8 rounded-sm bg-white border border-[#DCE2E6] space-y-6 shadow-xs">
                  <div className="flex items-center justify-between border-b border-[#DCE2E6] pb-4">
                    <div>
                      <span className="text-[10px] font-black uppercase text-[#0B3D91] tracking-wider block">
                        MODULE 6 OF 6 • BHASHA RATNA DIPLOMA EXAMINATION
                      </span>
                      <h3 className="text-xl font-black text-slate-900">
                        अंतिम मूल्यांकन परीक्षा • Final Assessment Exam
                      </h3>
                      <p className="text-xs text-slate-500">
                        Pass the final assessment to unlock your official ICCR & MEA Accredited Bhasha Ratna Diploma.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-5 text-xs">
                    <div className="p-4 rounded-sm bg-[#EEF3F8] border border-[#D0DCE7] text-[#082C6C] font-semibold flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-[#0B3D91] shrink-0" />
                      <span>
                        Exam Instructions: Passing threshold is 80%. Answering correctly generates your verifiable QR-coded Bhasha Ratna Diploma.
                      </span>
                    </div>

                    <div className="space-y-4">
                      <div className="p-5 rounded-sm bg-slate-50 border border-[#DCE2E6] space-y-3">
                        <span className="font-black text-slate-900 text-sm block">
                          Q1: What is the native greeting in {activePlayCourse.languageEng}?
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 font-bold">
                          <span className="p-3 bg-emerald-50 border border-emerald-400 text-emerald-900 rounded-sm flex items-center justify-between">
                            <span>1. {activePlayCourse.cognateExample.native}</span>
                            <Check className="w-4 h-4 text-emerald-600" />
                          </span>
                          <span className="p-3 bg-white border border-[#DCE2E6] text-slate-600 rounded-sm">
                            2. Good Evening
                          </span>
                        </div>
                      </div>

                      <div className="p-5 rounded-sm bg-slate-50 border border-[#DCE2E6] space-y-3">
                        <span className="font-black text-slate-900 text-sm block">
                          Q2: Which cognate bridges {activePlayCourse.languageEng} and Hindi?
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 font-bold">
                          <span className="p-3 bg-emerald-50 border border-emerald-400 text-emerald-900 rounded-sm flex items-center justify-between">
                            <span>1. &quot;{activePlayCourse.cognateExample.native}&quot; ⟷ &quot;{activePlayCourse.cognateExample.hindi}&quot;</span>
                            <Check className="w-4 h-4 text-emerald-600" />
                          </span>
                          <span className="p-3 bg-white border border-[#DCE2E6] text-slate-600 rounded-sm">
                            2. Non-related vocabulary
                          </span>
                        </div>
                      </div>
                    </div>

                    {(() => {
                      const prog = getStepProgress(activePlayCourse.id);
                      return (
                        <div className="pt-4 border-t border-[#DCE2E6] flex flex-col sm:flex-row items-center justify-between gap-4">
                          <div>
                            {prog.examCompleted && (
                              <span className="text-xs font-black text-emerald-600 flex items-center gap-1.5">
                                <CheckCircle2 className="w-4 h-4" /> Exam Passed! Score: {prog.examScore}% (Grade A+ National Distinction)
                              </span>
                            )}
                          </div>

                          <button
                            onClick={() => {
                              updateCourseProgress(activePlayCourse.id, {
                                video1Done: true,
                                video2Done: true,
                                video3Done: true,
                                readingCompleted: true,
                                writingCompleted: true,
                                listeningCompleted: true,
                                examCompleted: true,
                                examScore: 98
                              });
                              addXpToUser(100);
                              try {
                                confetti({ particleCount: 180, spread: 90, origin: { y: 0.5 } });
                              } catch (e) {
                                console.log('Confetti');
                              }
                              setCourseStepTab('certificate');
                            }}
                            className="px-8 py-3.5 rounded-sm bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-emerald-600/20 transition hover:scale-105"
                          >
                            {prog.allFinished ? 'View Unlocked Bhasha Ratna Diploma →' : 'Submit Exam & Generate Bhasha Ratna Diploma →'}
                          </button>
                        </div>
                      );
                    })()}
                  </div>
                </div>
              )}

              {/* STEP 7: BHASHA RATNA DIPLOMA CERTIFICATE */}
              {courseStepTab === 'certificate' && (
                <div className="space-y-6">
                  <div className="p-8 sm:p-12 rounded-sm bg-white border-8 border-double border-[#0B3D91] shadow-2xl text-center space-y-6 relative overflow-hidden max-w-4xl mx-auto">
                    <div className="absolute top-0 left-0 w-36 h-36 bg-[#0B3D91]/10 rounded-full blur-2xl pointer-events-none" />
                    <div className="absolute bottom-0 right-0 w-36 h-36 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

                    <div className="space-y-2">
                      <div className="w-16 h-16 rounded-full bg-[#EEF3F8] border-2 border-[#082C6C] text-[#0B3D91] flex items-center justify-center mx-auto shadow-md">
                        <Award className="w-10 h-10 text-[#0B3D91]" />
                      </div>
                      <span className="text-xs font-black uppercase tracking-widest text-[#082C6C] block">
                        ICCR & MINISTRY OF EXTERNAL AFFAIRS (MEA) ACCREDITED
                      </span>
                      <h2 className="text-2xl sm:text-4xl font-serif font-black text-slate-900 tracking-tight">
                        भाषा रत्न डिप्लोमा • BHASHA RATNA DIPLOMA
                      </h2>
                      <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                        Diploma in {activePlayCourse.languageEng} ({activePlayCourse.languageNative}) to Devanagari Hindi Studies
                      </p>
                    </div>

                    <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-[#0B3D91] to-transparent mx-auto" />

                    <div className="space-y-4 text-xs sm:text-sm text-slate-700 max-w-2xl mx-auto leading-relaxed">
                      <p className="italic">This Bhasha Ratna Diploma of Academic Excellence is proudly conferred upon</p>
                      <h3 className="text-2xl sm:text-3xl font-black text-[#082C6C] border-b-2 border-[#DCE2E6] pb-1 inline-block">
                        {user?.name || 'Aarav Sharma (आरव शर्मा)'}
                      </h3>
                      <p>
                        having successfully completed all 6 modules of Video Lectures, Reading & Grammar, Written Practice Studio, Speaking AI Coach, Listening Comprehension, and Final Certification Examination for:
                      </p>
                      <div className="p-4 rounded-sm bg-[#EEF3F8]/80 border border-[#D0DCE7] font-extrabold text-base text-[#082C6C]">
                        🇮🇳 &quot;Bhasha Ratna Diploma in {activePlayCourse.languageEng} ({activePlayCourse.languageNative}) to Hindi Fluency&quot;
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#DCE2E6] text-xs text-center max-w-2xl mx-auto">
                      <div className="p-3 bg-slate-50 rounded-sm border border-[#DCE2E6]">
                        <span className="text-slate-400 block text-[10px]">FINAL ASSESSMENT SCORE</span>
                        <span className="font-black text-emerald-600 text-base">98.0%</span>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-sm border border-[#DCE2E6]">
                        <span className="text-slate-400 block text-[10px]">NATIONAL DISTINCTION</span>
                        <span className="font-black text-[#0B3D91] text-base">Summa Cum Laude</span>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-sm border border-[#DCE2E6] flex flex-col items-center justify-center">
                        <QrCode className="w-8 h-8 text-[#082C6C]" />
                        <span className="text-[9px] font-mono text-slate-500 mt-1">VERIFY: MEA-BR-2026</span>
                      </div>
                    </div>

                    <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                      <button
                        onClick={() => window.print()}
                        className="px-6 py-2.5 rounded-sm bg-[#0B3D91] hover:bg-[#082C6C] text-white font-bold text-xs shadow-md transition flex items-center gap-2"
                      >
                        <Printer className="w-4 h-4" /> Print / Save PDF
                      </button>
                      <button
                        onClick={() => alert('Certificate downloaded to device.')}
                        className="px-6 py-2.5 rounded-sm bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs border border-slate-300 transition flex items-center gap-2"
                      >
                        <Download className="w-4 h-4" /> Download Certificate
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* 3. NORMAL CATALOGUE / MY COURSES / IDEAS / BRIDGE VIEW */
        <>
          {/* Navigation Bar inside Page */}
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
                <Globe className="w-4 h-4" /> All 22 Language Courses
              </button>

              <button
                onClick={() => setActiveTab('my-courses')}
                className={`px-4 py-2.5 rounded-sm font-bold text-xs transition flex items-center gap-2 relative ${
                  activeTab === 'my-courses'
                    ? 'bg-[#0B3D91] text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <BookMarked className="w-4 h-4" /> My Enrolled Courses ({enrolledCoursesList.length})
              </button>

              <button
                onClick={() => setActiveTab('ideas')}
                className={`px-4 py-2.5 rounded-sm font-bold text-xs transition flex items-center gap-2 ${
                  activeTab === 'ideas'
                    ? 'bg-[#0B3D91] text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Lightbulb className="w-4 h-4 text-amber-400" /> Innovative Learning Tools & AI
              </button>

              <button
                onClick={() => setActiveTab('bridge')}
                className={`px-4 py-2.5 rounded-sm font-bold text-xs transition flex items-center gap-2 ${
                  activeTab === 'bridge'
                    ? 'bg-[#0B3D91] text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Layers className="w-4 h-4" /> Cognate & Etymology Bridge
              </button>
            </div>

            {/* Search Bar Input */}
            {activeTab !== 'ideas' && activeTab !== 'bridge' && (
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search language, state..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-sm bg-slate-50 border border-[#DCE2E6] text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0B3D91] transition"
                />
              </div>
            )}
          </div>

          {/* VIEW 1: MY ENROLLED COURSES SECTION */}
          {activeTab === 'my-courses' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#DCE2E6] pb-4">
                <div>
                  <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                    <BookMarked className="w-6 h-6 text-[#0B3D91]" /> मेरे पंजीकृत हिंदी कोर्स (My Enrolled Courses)
                  </h2>
                  <p className="text-xs text-slate-500 font-medium">
                    Track your active Indian language courses registered from your regional mother tongue.
                  </p>
                </div>

                <button
                  onClick={() => setActiveTab('all')}
                  className="px-4 py-2 rounded-sm bg-[#EEF3F8] hover:bg-blue-100 text-[#082C6C] font-bold text-xs flex items-center gap-1.5 transition"
                >
                  + Enroll in New Language Course
                </button>
              </div>

              {enrolledCoursesList.length === 0 ? (
                <div className="p-12 text-center rounded-sm bg-white border border-[#DCE2E6] space-y-4 shadow-xs">
                  <div className="w-16 h-16 rounded-full bg-[#EEF3F8] text-[#0B3D91] flex items-center justify-center mx-auto">
                    <Globe className="w-8 h-8" />
                  </div>
                  <div className="space-y-1 max-w-md mx-auto">
                    <h3 className="text-base font-black text-slate-900">No Enrolled Courses Yet</h3>
                    <p className="text-xs text-slate-500 font-medium">
                      Browse all 22 official Eighth Schedule Indian language courses below and click &quot;Register / Enroll Free&quot; to begin learning.
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('all')}
                    className="px-6 py-3 rounded-sm bg-[#0B3D91] hover:bg-[#082C6C] text-white font-extrabold text-xs shadow-md transition"
                  >
                    Browse All 22 Indian Language Courses →
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {enrolledCoursesList.map((course) => {
                    const prog = getStepProgress(course.id);
                    return (
                      <div
                        key={course.id}
                        className="bg-white rounded-sm border border-[#DCE2E6] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                      >
                        <div>
                          <div className={`p-5 bg-gradient-to-r ${course.bannerGradient} text-white space-y-3 relative overflow-hidden`}>
                            <div className="flex items-center justify-between text-xs">
                              <span className="px-3 py-1 rounded-full bg-black/30 backdrop-blur-xs text-white font-extrabold text-sm">
                                🇮🇳 {course.languageEng} ({course.languageNative})
                              </span>
                              <span className="px-2 py-0.5 rounded-full bg-white/20 text-white font-bold text-[10px]">
                                {course.region}
                              </span>
                            </div>

                            <div className="space-y-1">
                              <h3 className="text-base font-black text-white group-hover:translate-x-1 transition-transform">
                                {course.titleHindi}
                              </h3>
                              <p className="text-xs text-white/80 line-clamp-1">
                                {course.titleEng}
                              </p>
                            </div>
                          </div>

                          <div className="p-5 space-y-4">
                            <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                              {course.description}
                            </p>

                            <div className="p-3 rounded-sm bg-[#EEF3F8]/60 border border-[#DCE2E6] text-xs space-y-1">
                              <span className="text-[10px] font-black uppercase text-[#0B3D91] tracking-wider block">
                                Sample Comparative Cognate:
                              </span>
                              <div className="flex items-center justify-between font-bold text-slate-800">
                                <span>{course.cognateExample.native} ⟷ {course.cognateExample.hindi}</span>
                                <button
                                  onClick={() => playAudio(course.cognateExample.hindi)}
                                  className="text-[#0B3D91] hover:underline text-[11px] font-bold"
                                >
                                  🔊 Audio
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="p-5 pt-0 border-t border-[#DCE2E6] mt-auto space-y-2">
                          <div className="flex justify-between text-[11px] font-bold text-slate-700 pt-3">
                            <span>Status: Enrolled</span>
                            <span className="text-[#0B3D91]">{prog.percent}% ({prog.completedCount}/6 Done)</span>
                          </div>
                          <div className="w-full bg-slate-100 rounded-full h-2">
                            <div className="bg-[#0B3D91] h-2 rounded-full transition-all duration-300" style={{ width: `${prog.percent}%` }} />
                          </div>
                          <button
                            onClick={() => setActivePlayCourse(course)}
                            className="w-full py-3 rounded-sm bg-[#0B3D91] hover:bg-[#082C6C] text-white font-extrabold text-xs uppercase tracking-wider shadow-md transition flex items-center justify-center gap-1.5"
                          >
                            Open In-Page Workspace <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* VIEW 2: ALL 22 INDIAN LANGUAGE COURSES CATALOGUE */}
          {activeTab === 'all' && (
            <div className="space-y-6">
              {/* Category Filter Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                {['All', 'South Indian', 'East & North-East', 'West & Central', 'North & Himalayan', 'Classical & Regional'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-sm text-xs font-bold whitespace-nowrap transition ${
                      selectedCategory === cat
                        ? 'bg-[#0B3D91] text-white shadow-sm'
                        : 'bg-white text-slate-600 border border-[#DCE2E6] hover:bg-slate-100'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Grid of 22 Language Courses */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course) => {
                  const enrolled = isEnrolled(course.id);
                  const prog = getStepProgress(course.id);

                  return (
                    <div
                      key={course.id}
                      className="bg-white rounded-sm border border-[#DCE2E6] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                    >
                      <div>
                        {/* Banner */}
                        <div className={`p-5 bg-gradient-to-r ${course.bannerGradient} text-white space-y-3 relative overflow-hidden`}>
                          <div className="flex items-center justify-between text-xs">
                            <span className="px-3 py-1 rounded-full bg-black/30 backdrop-blur-xs text-white font-extrabold text-sm">
                              🇮🇳 {course.languageEng} ({course.languageNative})
                            </span>
                            <span className="px-2 py-0.5 rounded-full bg-white/20 text-white font-bold text-[10px]">
                              {course.region}
                            </span>
                          </div>

                          <div className="space-y-1">
                            <h3 className="text-base font-black text-white group-hover:translate-x-1 transition-transform">
                              {course.titleHindi}
                            </h3>
                            <p className="text-xs text-white/80 line-clamp-1">
                              {course.titleEng}
                            </p>
                          </div>
                        </div>

                        <div className="p-5 space-y-4">
                          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                            {course.description}
                          </p>

                          {/* Cognate Box */}
                          <div className="p-3 rounded-sm bg-[#EEF3F8]/60 border border-[#DCE2E6] text-xs space-y-1">
                            <span className="text-[10px] font-black uppercase text-[#0B3D91] tracking-wider block">
                              Sample Comparative Cognate:
                            </span>
                            <div className="flex items-center justify-between font-bold text-slate-800">
                              <span>{course.cognateExample.native} ⟷ {course.cognateExample.hindi}</span>
                              <button
                                onClick={() => playAudio(course.cognateExample.hindi)}
                                className="text-[#0B3D91] hover:underline text-[11px] font-bold"
                              >
                                🔊 Audio
                              </button>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-500 font-semibold pt-1">
                            <div className="flex items-center gap-1.5">
                              <BookOpen className="w-3.5 h-3.5 text-blue-500" />
                              <span>{course.totalModules} Units • {course.totalLessons} Lessons</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Users className="w-3.5 h-3.5 text-emerald-500" />
                              <span>{(course.totalStudents / 1000).toFixed(1)}k Learners</span>
                            </div>
                          </div>
                        </div>
                      </div>

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
                              onClick={() => setActivePlayCourse(course)}
                              className="w-full py-3 rounded-sm bg-[#0B3D91] hover:bg-[#082C6C] text-white font-extrabold text-xs uppercase tracking-wider shadow-md transition flex items-center justify-center gap-1.5"
                            >
                              Open In-Page Workspace <ArrowRight className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between gap-2 pt-3">
                            <button
                              onClick={() => setSelectedCourseModal(course)}
                              className="px-4 py-2.5 rounded-sm bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition"
                            >
                              Syllabus
                            </button>

                            <button
                              onClick={() => setCheckoutCourse(course)}
                              className="flex-1 py-2.5 rounded-sm bg-[#0B3D91] hover:bg-[#082C6C] text-white font-extrabold text-xs shadow-md transition flex items-center justify-center gap-1"
                            >
                              Register / Enroll Free
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* VIEW 3: INNOVATIVE IDEAS & TOOLS */}
          {activeTab === 'ideas' && (
            <div className="space-y-10">
              <div className="border-b border-[#DCE2E6] pb-4">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
                  <Lightbulb className="w-7 h-7 text-amber-500 fill-amber-500" />
                  भाषा सीखने के नवीन विचार एवं उपकरण (Innovative Ideas for Language Learning)
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                  Explore 6 multi-modal, gamified, and AI-powered learning methods designed to bridge any Indian regional language to Hindi fluency.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Tool 1 */}
                <div className="p-6 rounded-sm bg-white border border-[#DCE2E6] shadow-xs space-y-4 hover:border-[#0B3D91] transition">
                  <div className="w-12 h-12 rounded-sm bg-[#EEF3F8] text-[#0B3D91] flex items-center justify-center font-black">
                    <Layers className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase text-[#0B3D91] tracking-wider">IDEA #1 • LINGUISTIC MAP</span>
                    <h3 className="text-lg font-bold text-slate-900">Cognate & Etymology Bridge</h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Discover root word cognates connecting Sanskrit, Dravidian, and Eastern Indian Indo-Aryan languages to Devanagari Hindi.
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('bridge')}
                    className="w-full py-2.5 rounded-sm bg-[#EEF3F8] hover:bg-blue-100 text-[#082C6C] font-bold text-xs transition"
                  >
                    Open Comparative Bridge →
                  </button>
                </div>

                {/* Tool 2 */}
                <div className="p-6 rounded-sm bg-white border border-[#DCE2E6] shadow-xs space-y-4 hover:border-[#0B3D91] transition">
                  <div className="w-12 h-12 rounded-sm bg-purple-50 text-purple-600 flex items-center justify-center font-black">
                    <Radio className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase text-purple-600 tracking-wider">IDEA #2 • AI DUBBING</span>
                    <h3 className="text-lg font-bold text-slate-900">Dual-Subtitled AI Dubbing (19+ Voices)</h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Listen to video lectures dubbed in real-time in 19+ Indian and global voices with synchronized dual subtitles.
                    </p>
                  </div>
                  <button
                    onClick={() => setShowDubbingModal(true)}
                    className="w-full py-2.5 rounded-sm bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold text-xs transition"
                  >
                    Launch 19+ AI Dubbing Engine →
                  </button>
                </div>

                {/* Tool 3 */}
                <div className="p-6 rounded-sm bg-white border border-[#DCE2E6] shadow-xs space-y-4 hover:border-[#0B3D91] transition">
                  <div className="w-12 h-12 rounded-sm bg-amber-50 text-amber-600 flex items-center justify-center font-black">
                    <Flame className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase text-amber-600 tracking-wider">IDEA #3 • GAMIFIED PUZZLE</span>
                    <h3 className="text-lg font-bold text-slate-900">SOV Sentence Reorder Game</h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Reorder word pills to match Hindi Subject-Object-Verb grammar patterns and earn instant XP points.
                    </p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-sm border border-slate-200 text-xs font-bold text-slate-700 flex justify-between items-center">
                    <span>Active Puzzle Score: {gameScore} XP</span>
                    <span className="text-amber-600">Question {gameIndex + 1}/3</span>
                  </div>
                </div>

                {/* Tool 4 */}
                <div className="p-6 rounded-sm bg-white border border-[#DCE2E6] shadow-xs space-y-4 hover:border-[#0B3D91] transition">
                  <div className="w-12 h-12 rounded-sm bg-emerald-50 text-emerald-600 flex items-center justify-center font-black">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase text-emerald-600 tracking-wider">IDEA #4 • FLASHCARDS</span>
                    <h3 className="text-lg font-bold text-slate-900">3D Interactive Micro Flashcards</h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Flip digital flashcards to practice daily salutations, vocabulary roots, and phonetic transliterations.
                    </p>
                  </div>
                  <div className="p-3 bg-emerald-50 text-emerald-800 rounded-sm text-xs font-bold flex items-center justify-between">
                    <span>Card #{flashcardIndex + 1}: {FLASHCARDS[flashcardIndex].nativeTitle}</span>
                    <button
                      onClick={() => setCardFlipped(!cardFlipped)}
                      className="text-emerald-700 underline text-[11px]"
                    >
                      {cardFlipped ? 'Show Front' : 'Flip Card'}
                    </button>
                  </div>
                </div>

                {/* Tool 5 */}
                <div className="p-6 rounded-sm bg-white border border-[#DCE2E6] shadow-xs space-y-4 hover:border-[#0B3D91] transition">
                  <div className="w-12 h-12 rounded-sm bg-blue-50 text-blue-600 flex items-center justify-center font-black">
                    <Mic className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase text-blue-600 tracking-wider">IDEA #5 • VOICE AI</span>
                    <h3 className="text-lg font-bold text-slate-900">Multi-lingual Speech AI Coach</h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Practice accent precision with real-time speech evaluation and waveform audio playback.
                    </p>
                  </div>
                  <button
                    onClick={() => alert('Speech AI Coach activated in course workspace modules.')}
                    className="w-full py-2.5 rounded-sm bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs transition"
                  >
                    Test Speech Recognition AI →
                  </button>
                </div>

                {/* Tool 6 */}
                <div className="p-6 rounded-sm bg-white border border-[#DCE2E6] shadow-xs space-y-4 hover:border-[#0B3D91] transition">
                  <div className="w-12 h-12 rounded-sm bg-rose-50 text-rose-600 flex items-center justify-center font-black">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase text-rose-600 tracking-wider">IDEA #6 • OFFICIAL NIOS</span>
                    <h3 className="text-lg font-bold text-slate-900">NIOS Accredited Self-Learning PDFs</h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Download official government-accredited textbooks, workbooks, and script reference cards.
                    </p>
                  </div>
                  <button
                    onClick={() => alert('Downloading official NIOS Bhasha Sangam PDF package...')}
                    className="w-full py-2.5 rounded-sm bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs transition"
                  >
                    Download Official NIOS PDFs →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* VIEW 4: COGNATE BRIDGE TAB */}
          {activeTab === 'bridge' && (
            <div className="space-y-6">
              <div className="border-b border-[#DCE2E6] pb-4">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
                  <Layers className="w-7 h-7 text-[#0B3D91]" />
                  समानार्थक शब्द एवं व्युत्पत्ति सेतु (Cognate & Etymology Bridge)
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                  Interactive etymological dictionary linking shared Sanskrit, Dravidian, and Indo-Aryan root words to Devanagari Hindi.
                </p>
              </div>

              <div className="bg-white rounded-sm border border-[#DCE2E6] overflow-x-auto shadow-xs">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#EEF3F8] text-[#082C6C] font-black uppercase text-[10px] tracking-wider border-b border-[#DCE2E6]">
                    <tr>
                      <th className="p-4">Concept / Word</th>
                      <th className="p-4">Devanagari Hindi</th>
                      <th className="p-4">Sanskrit Root</th>
                      <th className="p-4">Tamil (தமிழ்)</th>
                      <th className="p-4">Telugu (తెలుగు)</th>
                      <th className="p-4">Bengali (বাংলা)</th>
                      <th className="p-4">Marathi (मराठी)</th>
                      <th className="p-4 text-center">Audio</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#DCE2E6] font-semibold text-slate-800">
                    {COMPARATIVE_COGNATES.map((row, i) => (
                      <tr key={i} className="hover:bg-slate-50 transition">
                        <td className="p-4 font-black text-slate-900">{row.wordEng}</td>
                        <td className="p-4 font-black text-[#0B3D91]">{row.hindi}</td>
                        <td className="p-4 text-purple-700 font-bold">{row.sanskrit}</td>
                        <td className="p-4">{row.tamil}</td>
                        <td className="p-4">{row.telugu}</td>
                        <td className="p-4">{row.bengali}</td>
                        <td className="p-4">{row.marathi}</td>
                        <td className="p-4 text-center">
                          <button
                            onClick={() => playAudio(row.audioText)}
                            className="p-2 rounded-sm bg-[#EEF3F8] hover:bg-[#0B3D91] hover:text-white text-[#0B3D91] transition"
                            title="Play Audio"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}

      {/* ========================================================= */}
      {/* MODAL 1: COURSE SYLLABUS / DETAILS MODAL                 */}
      {/* ========================================================= */}
      {selectedCourseModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-sm border border-[#DCE2E6] max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setSelectedCourseModal(null)}
              className="absolute top-4 right-4 p-2 rounded-sm bg-slate-100 hover:bg-slate-200 text-slate-500 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full bg-[#EEF3F8] text-[#082C6C] text-xs font-black">
                {selectedCourseModal.languageEng} ({selectedCourseModal.languageNative}) Syllabus
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                {selectedCourseModal.titleHindi}
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                {selectedCourseModal.titleEng} • {selectedCourseModal.region}
              </p>
            </div>

            <div className="p-4 rounded-sm bg-[#EEF3F8] border border-[#DCE2E6] space-y-2 text-xs">
              <span className="font-black text-[#0B3D91] uppercase tracking-wider block">Course Overview</span>
              <p className="text-slate-700 leading-relaxed font-medium">
                {selectedCourseModal.description}
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <h4 className="font-black text-slate-900 text-sm">6 Sequential Learning Modules Included:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 font-bold">
                <div className="p-3 bg-slate-50 rounded-sm border border-[#DCE2E6] flex items-center gap-2">
                  <Play className="w-4 h-4 text-[#0B3D91]" /> 1. Video Lecture Studio (3 HD Videos)
                </div>
                <div className="p-3 bg-slate-50 rounded-sm border border-[#DCE2E6] flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-emerald-600" /> 2. Reading & Devanagari Transcript
                </div>
                <div className="p-3 bg-slate-50 rounded-sm border border-[#DCE2E6] flex items-center gap-2">
                  <FileText className="w-4 h-4 text-purple-600" /> 3. Written SOV Practice Studio
                </div>
                <div className="p-3 bg-slate-50 rounded-sm border border-[#DCE2E6] flex items-center gap-2">
                  <Mic className="w-4 h-4 text-blue-600" /> 4. Speaking AI Articulation Coach
                </div>
                <div className="p-3 bg-slate-50 rounded-sm border border-[#DCE2E6] flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-amber-600" /> 5. Acoustic Listening Test
                </div>
                <div className="p-3 bg-slate-50 rounded-sm border border-[#DCE2E6] flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-500" /> 6. Bhasha Ratna Diploma Certificate
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#DCE2E6] flex items-center justify-end gap-3">
              <button
                onClick={() => setSelectedCourseModal(null)}
                className="px-4 py-2.5 rounded-sm bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const target = selectedCourseModal;
                  setSelectedCourseModal(null);
                  setCheckoutCourse(target);
                }}
                className="px-6 py-2.5 rounded-sm bg-[#0B3D91] hover:bg-[#082C6C] text-white font-extrabold text-xs shadow-md transition flex items-center gap-1.5"
              >
                Proceed to Register Free →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 2: FREE REGISTRATION / CHECKOUT MODAL               */}
      {/* ========================================================= */}
      {checkoutCourse && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-sm border border-[#DCE2E6] max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative my-8 animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setCheckoutCourse(null)}
              className="absolute top-4 right-4 p-2 rounded-sm bg-slate-100 hover:bg-slate-200 text-slate-500 transition"
            >
              <X className="w-5 h-5" />
            </button>

            {paymentSuccessInvoice ? (
              <div className="text-center space-y-5 py-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase text-emerald-600 tracking-wider">REGISTRATION SUCCESSFUL</span>
                  <h3 className="text-2xl font-black text-slate-900">Enrolled Successfully!</h3>
                  <p className="text-xs text-slate-500">
                    Invoice: <span className="font-mono font-bold text-slate-800">{paymentSuccessInvoice}</span>
                  </p>
                </div>

                <div className="p-4 rounded-sm bg-[#EEF3F8] border border-[#DCE2E6] text-xs space-y-2 text-left">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Course Enrolled:</span>
                    <span className="font-bold text-slate-900">{checkoutCourse.languageEng} ({checkoutCourse.languageNative})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Access Fee:</span>
                    <span className="font-black text-emerald-600">₹0 (Free MEA Government Sponsorship)</span>
                  </div>
                </div>

                <button
                  onClick={handleFinishCheckout}
                  className="w-full py-3 rounded-sm bg-[#0B3D91] hover:bg-[#082C6C] text-white font-extrabold text-xs uppercase tracking-wider shadow-md transition"
                >
                  Start Learning Course Now →
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase text-[#0B3D91] tracking-wider block">
                    FREE GOVERNMENT COURSE ENROLLMENT
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                    Register for {checkoutCourse.languageEng} ({checkoutCourse.languageNative}) Course
                  </h3>
                  <p className="text-xs text-slate-500">
                    100% Free under National Education Policy (NEP 2020) & Bhasha Sangam Initiative.
                  </p>
                </div>

                <div className="p-4 rounded-sm bg-[#EEF3F8] border border-[#DCE2E6] text-xs space-y-2">
                  <div className="flex justify-between font-bold text-slate-800">
                    <span>Course Title:</span>
                    <span>{checkoutCourse.titleHindi}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Modules Included:</span>
                    <span>{checkoutCourse.totalModules} Units • {checkoutCourse.totalLessons} Lessons</span>
                  </div>
                  <div className="flex justify-between font-black text-[#0B3D91] pt-2 border-t border-[#DCE2E6]">
                    <span>Enrollment Fee:</span>
                    <span>FREE (Sponsored)</span>
                  </div>
                </div>

                <button
                  onClick={handleProcessPayment}
                  disabled={isProcessingPayment}
                  className="w-full py-3.5 rounded-sm bg-[#0B3D91] hover:bg-[#082C6C] text-white font-extrabold text-xs uppercase tracking-wider shadow-lg transition flex items-center justify-center gap-2"
                >
                  {isProcessingPayment ? (
                    <span>Processing Enrollment...</span>
                  ) : (
                    <span>Confirm & Activate Course →</span>
                  )}
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 3: 19+ MULTI-LINGUAL AI DUBBING MODAL               */}
      {/* ========================================================= */}
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
              <span className="text-[10px] font-black uppercase text-purple-600 tracking-wider block">
                UNIVERSAL AI DUBBING ENGINE
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                Select Audio Dubbing Voice (19+ Languages)
              </h3>
              <p className="text-xs text-slate-500">
                Switch real-time text-to-speech audio dubbing and phonetic pronunciation across 19 global languages.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-80 overflow-y-auto p-1">
              {ALL_DUBBING_LANGUAGES.map((lang) => (
                <button
                  key={lang.key}
                  onClick={() => {
                    setSelectedDubLang(lang.key);
                    playDubbedSpeech(lang.key);
                  }}
                  className={`p-3 rounded-sm border text-left transition flex items-center gap-2.5 ${
                    selectedDubLang === lang.key
                      ? 'bg-purple-50 border-purple-500 text-purple-900 font-black shadow-2xs'
                      : 'bg-white border-[#DCE2E6] text-slate-700 hover:bg-slate-50 font-bold'
                  }`}
                >
                  <span className="text-base">{lang.flag}</span>
                  <div>
                    <span className="text-xs block leading-tight">{lang.nameEng}</span>
                    <span className="text-[10px] text-slate-400 font-normal">{lang.nameNative}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="pt-4 border-t border-[#DCE2E6] flex items-center justify-between">
              <span className="text-xs text-slate-500 font-semibold">
                Active Dubbing Voice: <strong className="text-purple-700">{ALL_DUBBING_LANGUAGES.find((l) => l.key === selectedDubLang)?.nameEng}</strong>
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
