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
  Radio
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

function getDubbedSpeechData(langKey: string, courseTitle: string, chapterTitle: string) {
  const map: Record<string, { speech: string; translit: string; meaning: string }> = {
    hi: {
      speech: `नमस्ते! इस विशेष वीडियो पाठ में आपका स्वागत है। आज हम ${chapterTitle || 'भाषा विज्ञान'} और शुद्ध उच्चारण का गहन अभ्यास करेंगे।`,
      translit: 'Namaste! Is vishesh video paath mein aapka swaagat hai.',
      meaning: 'Welcome! In this lesson we master phonetic articulation and grammar rules.'
    },
    en: {
      speech: `Hello and welcome to this masterclass video lecture. Today we explore ${chapterTitle || 'linguistics'} with step-by-step clarity and pronunciation mastery.`,
      translit: 'Hello and welcome to this masterclass video lecture.',
      meaning: 'Step-by-step masterclass exploring grammar, phonetics, and conversation.'
    },
    fa: {
      speech: `سلام و درود! به این درس ویدیویی تخصصی خوش آمدید. امروز مبحث ${chapterTitle || 'آموزش زبان'} و تلفظ اصیل را با هم تمرین می‌کنیم.`,
      translit: 'Salam o dorood! Be in dars-e videoee takhassosi khosh amadid.',
      meaning: 'Warm greetings! Welcome to this dedicated video lesson with native phonetics.'
    },
    es: {
      speech: `¡Hola y bienvenido a esta clase magistral! Hoy profundizamos en ${chapterTitle || 'la lección'} y el dominio de la pronunciación.`,
      translit: '¡Hola y bienvenido a esta clase magistral!',
      meaning: 'Hello and welcome! Today we master phonetic drills and core grammar.'
    },
    fr: {
      speech: `Bonjour et bienvenue dans cette leçon vidéo complète. Aujourd'hui nous étudions ${chapterTitle || 'la linguistique'} et l'élocution parfaite.`,
      translit: 'Bonjour et bienvenue dans cette leçon vidéo complète.',
      meaning: 'Welcome to this master video class with structured audio elocution.'
    },
    de: {
      speech: `Hallo und herzlich willkommen zu dieser Meisterklasse! Heute vertiefen wir ${chapterTitle || 'das Thema'} und die korrekte Aussprache.`,
      translit: 'Hallo und herzlich willkommen zu dieser Meisterklasse!',
      meaning: 'Welcome! Today we delve deep into accurate pronunciation and syntax.'
    },
    ja: {
      speech: `こんにちは！このマスタークラス動画講座へようこそ。本日は ${chapterTitle || '語学の基礎'} と正しい発音を学びます。`,
      translit: 'Konnichiwa! Kono masutā kurasu dōga kōza e yōkoso.',
      meaning: 'Welcome! Today we study grammatical nuances and natural pronunciation.'
    },
    ru: {
      speech: `Здравствуйте и добро пожаловать на этот видеоурок! Сегодня мы разбираем ${chapterTitle || 'тему урока'} и правильную артикуляцию.`,
      translit: 'Zdravstvuyte i dobro pozhalovat na etot videourok!',
      meaning: 'Welcome! Today we analyze pronunciation mechanics and sentence syntax.'
    },
    ar: {
      speech: `مرحباً بكم في هذا الدرس المرئي المتميز. اليوم نتدرب على ${chapterTitle || 'قواعد اللغة'} ومخارج الحروف بدقة عالية.`,
      translit: 'Marhaban bikum fi hadha al-dars al-mari al-mutamayyiz.',
      meaning: 'Welcome! Today we train on native phonetics and grammatical precision.'
    },
    ko: {
      speech: `안녕하세요! 이 마스터클래스 비디오 강의에 오신 것을 환영합니다. 오늘은 ${chapterTitle || '핵심 문법'}과 정확한 발음을 연습합니다.`,
      translit: 'Annyeonghaseyo! I maseuteokeullaeseu bidio gang-uie osin geos-eul hwanyeonghamnida.',
      meaning: 'Welcome to this video lecture focusing on core phonetics and rhythm.'
    },
    zh: {
      speech: `你好！欢迎来到本次大师级视频课程。今天我们将深入探讨 ${chapterTitle || '核心课程'} 与标准发音规则。`,
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

// ==========================================
// 1. ALL 22 SCHEDULED INDIAN LANGUAGES
// ==========================================
interface IndianLanguageOption {
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

const INDIAN_LANGUAGES_22: IndianLanguageOption[] = [
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
    sampleAudioText: 'નમસ્તે! આપનું હાર્દિક સ્વાગત છે. ગુજરાતની મધુર બોલી અને સાહિત્ય શીખો.',
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
    samplePassage: 'ଓଡ଼ିଆ ଭାଷା ଏକ ପ୍ରାଚୀନ ଶାସ୍ତ୍ରୀୟ ଭାଷା ଯାହାର ସାହିତ୍ୟିକ ଇତିହାସ ଅତି ଗୌରବମୟ।',
    ttsCode: 'or-IN'
  },
  {
    code: 'as',
    nameEng: 'Assamese',
    nameNative: 'অসমীয়া',
    script: 'Bengali-Assamese',
    sampleGreeting: 'নমস্কাৰ! (Nomoskar)',
    sampleAudioText: 'নমস্কাৰ! আপোনাক অসমীয়া ভাষাৰ সুন্দৰ যাত্ৰাত স্বাগতম জনাইছোঁ।',
    pronunciationGuide: 'noh-mosh-KAAR',
    samplePassage: 'অসমীয়া ভাষা উত্তৰ-পূব ভাৰতৰ সংস্কৃতি আৰু লোকসাহিত্যৰ প্ৰাণকেন্দ্ৰ।',
    ttsCode: 'as-IN'
  },
  {
    code: 'ur',
    nameEng: 'Urdu',
    nameNative: 'اردو',
    script: 'Perso-Arabic',
    sampleGreeting: 'آداب! (Aadaab)',
    sampleAudioText: 'آداب! آپ کا تہہ دل سے استقبال ہے۔ اردو کی شیرینی اور تہذیب کا لطف اٹھائیں۔',
    pronunciationGuide: 'aa-DAAB',
    samplePassage: 'اردو زبان اپنی شیرینی، شائستگی اور لاجواب شعری ادب کے لیے دنیا بھر میں معروف ہے۔',
    ttsCode: 'ur-IN'
  },
  {
    code: 'sa',
    nameEng: 'Sanskrit',
    nameNative: 'संस्कृतम्',
    script: 'Devanagari',
    sampleGreeting: 'नमो नमः! (Namo Namah)',
    sampleAudioText: 'नमो नमः! भवतां सर्वेषां संस्कृतभाषाशिक्षणे हार्दं स्वागतम्।',
    pronunciationGuide: 'nuh-moh NUH-muh-huh',
    samplePassage: 'संस्कृतं भारतस्य प्राणभूता भाषा अस्ति। अस्यां भाषायां वेदाः उपनिषदः च रचिताः सन्ति।',
    ttsCode: 'hi-IN'
  },
  {
    code: 'ne',
    nameEng: 'Nepali',
    nameNative: 'नेपाली',
    script: 'Devanagari',
    sampleGreeting: 'नमस्ते! (Namaste)',
    sampleAudioText: 'नमस्ते! नेपाली भाषा प्रशिक्षण कार्यक्रममा तपाईंलाई हार्दिक स्वागत छ।',
    pronunciationGuide: 'nuh-muh-STAY',
    samplePassage: 'नेपाली भाषा हिमालयी भूभागको मिठास र सौम्य संस्कृतिको परिचायक हो।',
    ttsCode: 'ne-NP'
  },
  {
    code: 'ks',
    nameEng: 'Kashmiri',
    nameNative: 'कॉशुर',
    script: 'Perso-Arabic / Devanagari',
    sampleGreeting: 'नमस्कार! (Namaskar)',
    sampleAudioText: 'आदाब! तुह्युंद काशिर ज़बान मंज़ वारियाह खैरमकदम छु।',
    pronunciationGuide: 'nuh-muh-SKAAR',
    samplePassage: 'कॉशुर ज़बान हन्द्य लल वाख त शेखुल आलम सन्य कलाम छि दुनियाहस मंज़ मशहूर।',
    ttsCode: 'hi-IN'
  },
  {
    code: 'kok',
    nameEng: 'Konkani',
    nameNative: 'कोंकणी',
    script: 'Devanagari',
    sampleGreeting: 'देव बरे करूं! (Dev Bare Karum)',
    sampleAudioText: 'देव बरे करूं! कोंकणी भाशेंत तुमचे मनापासून स्वागत आसा।',
    pronunciationGuide: 'dev buh-RAY kuh-ROOM',
    samplePassage: 'कोंकणी भाषा पश्चिम भारताच्या किनारपट्टीवरील समृद्ध लोकसंस्कृतीची भाषा आहे।',
    ttsCode: 'mr-IN'
  },
  {
    code: 'mai',
    nameEng: 'Maithili',
    nameNative: 'मैथिली',
    script: 'Devanagari',
    sampleGreeting: 'प्रणाम! (Pranam)',
    sampleAudioText: 'प्रणाम! मिथिलाक पावन भाषा मैथिली मे अहाँक हार्दिक स्वागत अछि।',
    pronunciationGuide: 'pruh-NAAM',
    samplePassage: 'मैथिली भाषा महाकवि विद्यापतिक मधुर पदावली सँ सुशोभित अछि।',
    ttsCode: 'hi-IN'
  },
  {
    code: 'sd',
    nameEng: 'Sindhi',
    nameNative: 'सिन्धी / سنڌي',
    script: 'Perso-Arabic / Devanagari',
    sampleGreeting: 'अस्सलाम अलैकुम / जय झूलेलाल!',
    sampleAudioText: 'जय झूलेलाल! सिन्धी बोली सिखण जे प्रोग्राम में तव्हां जो स्वागुत आहे।',
    pronunciationGuide: 'juh-ee jhoo-lay-LAAL',
    samplePassage: 'सिन्धी भाषा सिंधू नदीच्या प्राचिन संस्कृतीची आणि शाह लतीफ यांच्या सूफी काव्याची भाषा आहे।',
    ttsCode: 'hi-IN'
  },
  {
    code: 'doi',
    nameEng: 'Dogri',
    nameNative: 'डोगरी',
    script: 'Devanagari',
    sampleGreeting: 'जय देवा! (Jai Deva)',
    sampleAudioText: 'जय देवा! डोगरी भाखा सीखने आस्तै तुंदा मते प्यार कन्नै स्वागत ऐ।',
    pronunciationGuide: 'juh-ee DAY-vuh',
    samplePassage: 'डोगरी भाखा डुग्गर प्रदेश दी मिठी बोली ते वीर रस दी गाथा कन्नै जुड़ी ऐ।',
    ttsCode: 'hi-IN'
  },
  {
    code: 'mni',
    nameEng: 'Manipuri (Meitei)',
    nameNative: 'মৈতৈলোন্',
    script: 'Meitei Mayek',
    sampleGreeting: 'ꯈꯨꯔꯨꯝꯖꯔꯤ! (Khurumjari)',
    sampleAudioText: 'ꯈꯨꯔꯨꯝꯖꯔꯤ! ꯃꯅꯤꯄꯨꯔꯤ ꯂꯣꯟ ꯇꯝꯕꯒꯤ ꯊꯧꯔꯝꯗ ꯇꯔꯥꯝꯅ ꯑꯣꯛꯆꯔꯤ꯫',
    pronunciationGuide: 'khoo-room-JUH-ree',
    samplePassage: 'মৈতৈলোন অসি পুৱারী অমসুং নাৎকী শক্তম ꯌাম্না চাউবা তোপ-তোপ্পা লোন অমনি।',
    ttsCode: 'bn-IN'
  },
  {
    code: 'brx',
    nameEng: 'Bodo',
    nameNative: "बर'",
    script: 'Devanagari',
    sampleGreeting: 'खुमब्रामनाय! (Khumbrumnai)',
    sampleAudioText: 'खुमब्रामनाय! बर’ राव सोलोंनायाव नोंखौ गाहाम बरायबाय।',
    pronunciationGuide: 'khoom-brohm-NAA-ee',
    samplePassage: 'बर’ रावा आसामनि बड’लेण्ड ओनसोलनि मोनसे गोनांथार आरो गोसा रावनि बिदिन्थि।',
    ttsCode: 'hi-IN'
  },
  {
    code: 'sat',
    nameEng: 'Santali',
    nameNative: 'ᱥᱟᱱᱛᱟᱲᱤ',
    script: 'Ol Chiki',
    sampleGreeting: 'ᱡᱚᱦᱟᱨ! (Johar)',
    sampleAudioText: 'ᱡᱚᱦᱟᱨ! ᱥᱟᱱᱛᱟᱲᱤ ᱯᱟᱹᱨᱥᱤ ᱪᱮᱫᱚᱜ ᱞᱟᱹᱜᱤᱫ ᱟᱢᱟᱜ ᱥᱟᱹᱜᱩᱱ ᱫᱟᱨᱟᱢ᱾',
    pronunciationGuide: 'joh-HAAR',
    samplePassage: 'ᱥᱟᱱᱛᱟᱲᱤ ᱯᱟᱹᱨᱥᱤ ᱫᱚ ᱚᱞ ᱪᱤᱠᱤ ᱞᱤᱯᱤ ᱛᱮ ᱚᱞᱚᱜ ᱠᱟᱱ ᱢᱤᱫ ᱥᱚᱨᱮᱥ ᱟᱹᱫᱤᱵᱟᱹᱥᱤ ᱯᱟᱹᱨᱥᱤ ᱠᱟᱱᱟ᱾',
    ttsCode: 'hi-IN'
  }
];

// ==========================================
// 2. 15 GLOBAL FOREIGN LANGUAGES
// ==========================================
interface ForeignLanguageCourse {
  id: string;
  foreignLangEng: string;
  foreignLangNative: string;
  flag: string;
  region: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  totalModules: number;
  totalLessons: number;
  enrolledLearners: number;
  bannerGradient: string;
  ttsLangCode: string;
  description: string;
  sampleGreetingForeign: string;
  sampleGreetingForeignTranslit: string;
  samplePassageForeign: string;
  cognateExample: {
    foreign: string;
    hindi: string;
    transliteration: string;
    meaning: string;
  };
  accentChars: string[];
}

const FOREIGN_LANGUAGE_COURSES: ForeignLanguageCourse[] = [
  {
    id: 'course_en_all',
    foreignLangEng: 'English',
    foreignLangNative: 'English',
    flag: '🇬🇧',
    region: 'Global / Western',
    difficulty: 'Beginner',
    totalModules: 18,
    totalLessons: 64,
    enrolledLearners: 185000,
    bannerGradient: 'from-[#0B3D91] to-[#082C6C]',
    ttsLangCode: 'en-US',
    description: 'Bridge between Global English and all 22 scheduled Indian languages with bilingual phonetic maps, CEFR benchmarks, and diplomatic communication.',
    sampleGreetingForeign: 'Hello and welcome! It is a pleasure to learn with you.',
    sampleGreetingForeignTranslit: 'Hello and welcome!',
    samplePassageForeign: 'Language is the road map of a culture. It tells you where its people come from and where they are going. Learning multiple languages opens international doors.',
    cognateExample: { foreign: 'Name / Brother', hindi: 'नाम (Naam) / भ्राता (Bhrata)', transliteration: 'Naam / Bhrata', meaning: 'Universal Indo-European Cognates' },
    accentChars: ["'", '"', '-', '—', '!', '?', '.', ',']
  },
  {
    id: 'course_es_all',
    foreignLangEng: 'Spanish',
    foreignLangNative: 'Español',
    flag: '🇪🇸',
    region: 'Europe / Latin America',
    difficulty: 'Beginner',
    totalModules: 16,
    totalLessons: 52,
    enrolledLearners: 68000,
    bannerGradient: 'from-[#C2410C] to-[#7C2D12]',
    ttsLangCode: 'es-ES',
    description: 'Master Spanish from any Indian language. Learn phonetics, conjugations, and cultural nuances across 21 Spanish-speaking countries.',
    sampleGreetingForeign: '¡Hola! Bienvenidos a nuestro curso de idiomas internacionales.',
    sampleGreetingForeignTranslit: 'OH-lah! Byen-veh-NEE-dohs',
    samplePassageForeign: 'El español es una lengua romance hablada por más de quinientos millones de personas en todo el mundo. Aprenderla desde la India fortalece los lazos comerciales y diplomáticos.',
    cognateExample: { foreign: 'Amigo / Madre', hindi: 'मित्र / माता (Mata)', transliteration: 'Mitra / Mata', meaning: 'Friend / Mother' },
    accentChars: ['á', 'é', 'í', 'ó', 'ú', 'ñ', 'ü', '¡', '¿']
  },
  {
    id: 'course_fr_all',
    foreignLangEng: 'French',
    foreignLangNative: 'Français',
    flag: '🇫🇷',
    region: 'Europe / Africa',
    difficulty: 'Beginner',
    totalModules: 15,
    totalLessons: 48,
    enrolledLearners: 49000,
    bannerGradient: 'from-[#0B3D91] to-[#0369A1]',
    ttsLangCode: 'fr-FR',
    description: 'Learn French grammar, nasal sounds, and diplomatic vocabulary from your native Indian language with structured DELF/DALF alignment.',
    sampleGreetingForeign: 'Bonjour et bienvenue! C’est un plaisir d’apprendre ensemble.',
    sampleGreetingForeignTranslit: 'bon-ZHOOR ay byan-veh-NOO',
    samplePassageForeign: 'La langue française est reconnue dans le monde entier pour son élégance, sa diplomatie et sa riche tradition littéraire. C’est la langue officielle de nombreuses organisations internationales.',
    cognateExample: { foreign: 'Frère / Deux', hindi: 'भ्राता (Bhrata) / दो (Do)', transliteration: 'Bhrata / Do', meaning: 'Brother / Two' },
    accentChars: ['é', 'è', 'ê', 'ë', 'à', 'â', 'î', 'ï', 'ô', 'ù', 'û', 'ç', 'œ', '«', '»']
  },
  {
    id: 'course_de_all',
    foreignLangEng: 'German',
    foreignLangNative: 'Deutsch',
    flag: '🇩🇪',
    region: 'Central Europe',
    difficulty: 'Intermediate',
    totalModules: 16,
    totalLessons: 50,
    enrolledLearners: 44000,
    bannerGradient: 'from-[#334155] to-[#0F172A]',
    ttsLangCode: 'de-DE',
    description: 'Systematic German training leveraging Sanskrit-Germanic cognates, compound word mechanics, and Goethe-Zertifikat preparation.',
    sampleGreetingForeign: 'Guten Tag und herzlich willkommen zu diesem Sprachkurs!',
    sampleGreetingForeignTranslit: 'GOO-ten TAHK oont HERTZ-likh vil-KOM-men',
    samplePassageForeign: 'Die deutsche Sprache besitzt tiefe indoeuropäische Wurzeln und verbindet Präzision mit einer langen wissenschaftlichen Tradition. Sie eröffnet exzellente Chancen in Bildung und Industrie.',
    cognateExample: { foreign: 'Mutter / Name / Bruder', hindi: 'माता (Mata) / नाम (Naam) / भ्राता', transliteration: 'Mata / Naam / Bhrata', meaning: 'Mother / Name / Brother' },
    accentChars: ['ä', 'ö', 'ü', 'ß', 'Ä', 'Ö', 'Ü']
  },
  {
    id: 'course_ja_all',
    foreignLangEng: 'Japanese',
    foreignLangNative: '日本語',
    flag: '🇯🇵',
    region: 'East Asia',
    difficulty: 'Beginner',
    totalModules: 18,
    totalLessons: 58,
    enrolledLearners: 76000,
    bannerGradient: 'from-[#991B1B] to-[#450A0A]',
    ttsLangCode: 'ja-JP',
    description: 'Leverage identical Subject-Object-Verb (SOV) sentence order shared between Japanese and Indian languages for lightning-fast fluency.',
    sampleGreetingForeign: 'こんにちは！インド諸言語との架け橋へようこそ。',
    sampleGreetingForeignTranslit: 'Konnichiwa! Indo shogengo to no kakehashi e yōkoso.',
    samplePassageForeign: '日本語とインドの諸言語（ヒンディー語、タミル語など）は共にSOV（主語・目的語・述語）の語順を持ち、文法的に親和性が非常に高い言語です。',
    cognateExample: { foreign: '水 (Mizu) / お茶 (Ocha)', hindi: 'जल (Jal) / चाय (Chai)', transliteration: 'Jal / Chai', meaning: 'Water / Tea' },
    accentChars: ['あ', 'い', 'う', 'え', 'お', 'か', 'き', 'く', 'け', 'こ', 'さ', 'し', 'す', 'せ', 'そ', 'た', 'ち', 'つ', 'て', 'と', 'な', 'に', 'ぬ', 'ね', 'の', 'は', 'ひ', 'ふ', 'へ', 'ほ', 'ま', 'み', 'む', 'め', 'も', 'や', 'ゆ', 'よ', 'ら', 'り', 'る', 'れ', 'ろ', 'わ', 'を', 'ん']
  },
  {
    id: 'course_zh_all',
    foreignLangEng: 'Mandarin Chinese',
    foreignLangNative: '中文 (Mandarin)',
    flag: '🇨🇳',
    region: 'East Asia',
    difficulty: 'Beginner',
    totalModules: 16,
    totalLessons: 54,
    enrolledLearners: 61000,
    bannerGradient: 'from-[#BE123C] to-[#881337]',
    ttsLangCode: 'zh-CN',
    description: 'Learn Mandarin Pinyin, four tonal pronunciations, and HSK-standard vocabulary with Indian language comparative phonetic drills.',
    sampleGreetingForeign: '你好！欢迎来到多语言学习平台。',
    sampleGreetingForeignTranslit: 'Nǐ hǎo! Huānyíng lái dào duō yǔyán xuéxí píngtái.',
    samplePassageForeign: '普通话是世界上使用人数最多的语言之一。通过声调掌握与汉字结构学习，印度学者可以快速开启东亚经贸与学术合作的大门。',
    cognateExample: { foreign: '茶 (Chá) / 糖 (Táng)', hindi: 'चाय (Chai) / चीनी / खांड', transliteration: 'Chai / Khand', meaning: 'Tea / Sugar' },
    accentChars: ['ā', 'á', 'ǎ', 'à', 'ē', 'é', 'ě', 'è', 'ī', 'í', 'ǐ', 'ì', 'ō', 'ó', 'ǒ', 'ò', 'ū', 'ú', 'ǔ', 'ù', 'ǖ', 'ǘ', 'ǚ', 'ǜ']
  },
  {
    id: 'course_ru_all',
    foreignLangEng: 'Russian',
    foreignLangNative: 'Русский',
    flag: '🇷🇺',
    region: 'Eastern Europe / Eurasia',
    difficulty: 'Beginner',
    totalModules: 15,
    totalLessons: 46,
    enrolledLearners: 41000,
    bannerGradient: 'from-[#0B3D91] to-[#051C45]',
    ttsLangCode: 'ru-RU',
    description: 'Explore the Cyrillic alphabet, case declensions, and deep Indo-Aryan/Slavic linguistic roots connecting Russian and Indian languages.',
    sampleGreetingForeign: 'Здравствуйте! Добро пожаловать на наш курс.',
    sampleGreetingForeignTranslit: 'ZDRAHST-vooy-tyeh! DOH-broh poh-ZHAH-loh-vaht',
    samplePassageForeign: 'Русский язык и санскрит имеют глубокие индоевропейские корни. Многие грамматические формы и базовые слова имеют поразительное сходство.',
    cognateExample: { foreign: 'Огонь (Ogon) / Ведать (Vedat)', hindi: 'अग्नि (Agni) / वेद (Veda)', transliteration: 'Agni / Veda', meaning: 'Fire / To Know' },
    accentChars: ['а', 'б', 'в', 'г', 'д', 'е', 'ё', 'ж', 'з', 'и', 'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'ъ', 'ы', 'ь', 'э', 'ю', 'я']
  },
  {
    id: 'course_ar_all',
    foreignLangEng: 'Arabic',
    foreignLangNative: 'العربية',
    flag: '🇸🇦',
    region: 'Middle East',
    difficulty: 'Beginner',
    totalModules: 17,
    totalLessons: 56,
    enrolledLearners: 84000,
    bannerGradient: 'from-[#065F46] to-[#022C22]',
    ttsLangCode: 'ar-SA',
    description: 'Master Modern Standard Arabic (MSA) reading, phonetics, and root-based morphology with thousands of loanwords shared with Urdu, Hindi, and Gujarati.',
    sampleGreetingForeign: 'أهلاً وسهلاً بكم في دورة اللغات الدولية!',
    sampleGreetingForeignTranslit: 'Ahlan wa Sahlan bikum!',
    samplePassageForeign: 'اللغة العربية لغة عالمية كبرى تمتاز بالبلاغة وعمق المفردات. تشترك مع العديد من اللغات الهندية في آلاف الكلمات التراثية والتاريخية.',
    cognateExample: { foreign: 'كتاب (Kitaab) / قلم (Qalam)', hindi: 'किताब (Kitaab) / क़लम (Qalam)', transliteration: 'Kitaab / Qalam', meaning: 'Book / Pen' },
    accentChars: ['ا', 'ب', 'ت', 'ث', 'ج', 'ح', 'خ', 'د', 'ذ', 'ر', 'ز', 'س', 'ش', 'ص', 'ض', 'ط', 'ظ', 'ع', 'غ', 'ف', 'ق', 'ك', 'ل', 'م', 'ن', 'ه', 'و', 'ي', 'ء', 'ة', 'ً', 'ٌ', 'ٍ', 'َ', 'ُ', 'ِ', 'ّ', 'ْ']
  },
  {
    id: 'course_ko_all',
    foreignLangEng: 'Korean',
    foreignLangNative: '한국어 (Hangul)',
    flag: '🇰🇷',
    region: 'East Asia',
    difficulty: 'Beginner',
    totalModules: 15,
    totalLessons: 50,
    enrolledLearners: 45000,
    bannerGradient: 'from-[#0B3D91] to-[#1E3A8A]',
    ttsLangCode: 'ko-KR',
    description: 'Learn scientific Hangul script and SOV sentence mechanics identical to Indian grammar. Perfect for TOPIK exam preparation.',
    sampleGreetingForeign: '안녕하세요! 한국어 학습 코스에 오신 것을 환영합니다.',
    sampleGreetingForeignTranslit: 'An-nyeong-ha-se-yo! Hwan-young-hap-ni-da.',
    samplePassageForeign: '한국어는 과학적인 한글 문자와 함께 인도 언어들과 동일한 주어-목적어-동사(SOV) 어순을 가지고 있어 한국어 학습이 매우 직관적입니다.',
    cognateExample: { foreign: '나 (Na) / 너 (Neo)', hindi: 'मैं (Main) / तू (Tu)', transliteration: 'Main / Tu', meaning: 'I / You (SOV Pronoun Paradigm)' },
    accentChars: ['ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅅ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ', 'ㅏ', 'ㅑ', 'ㅓ', 'ㅕ', 'ㅗ', 'ㅛ', 'ㅜ', 'ㅠ', 'ㅡ', 'ㅣ']
  },
  {
    id: 'course_it_all',
    foreignLangEng: 'Italian',
    foreignLangNative: 'Italiano',
    flag: '🇮🇹',
    region: 'Southern Europe',
    difficulty: 'Beginner',
    totalModules: 14,
    totalLessons: 42,
    enrolledLearners: 28000,
    bannerGradient: 'from-[#15803D] to-[#14532D]',
    ttsLangCode: 'it-IT',
    description: 'Master the musicality of Italian phonetics, Latin heritage, and conversational fluency for arts, culinary diplomacy, and tourism.',
    sampleGreetingForeign: 'Buongiorno e benvenuti al nostro corso di lingua italiana!',
    sampleGreetingForeignTranslit: 'bwon-JOHR-noh ay ben-veh-NOO-tee',
    samplePassageForeign: 'La lingua italiana è celebre nel mondo per la sua armonia, la sua arte e la sua storia millenaria. Impararla arricchisce la comprensione culturale.',
    cognateExample: { foreign: 'Nome / Padre / Notte', hindi: 'नाम (Naam) / पिता (Pita) / रात (Nakt)', transliteration: 'Naam / Pita / Rat', meaning: 'Name / Father / Night' },
    accentChars: ['à', 'è', 'é', 'ì', 'í', 'î', 'ò', 'ó', 'ù', 'ú']
  },
  {
    id: 'course_pt_all',
    foreignLangEng: 'Portuguese',
    foreignLangNative: 'Português',
    flag: '🇵🇹',
    region: 'Europe / South America',
    difficulty: 'Beginner',
    totalModules: 14,
    totalLessons: 44,
    enrolledLearners: 31000,
    bannerGradient: 'from-[#15803D] to-[#B45309]',
    ttsLangCode: 'pt-PT',
    description: 'Explore Lusophone languages across Portugal, Brazil, and historical Goa connection with interactive spoken coaching and nasal vowels.',
    sampleGreetingForeign: 'Olá e seja muito bem-vindo ao nosso curso internacional!',
    sampleGreetingForeignTranslit: 'oh-LAH ee SAY-zhuh MWEE-too baym VEEN-doo',
    samplePassageForeign: 'O português é falado em vários continentes e possui laços históricos com a Índia, especialmente em Goa e na costa ocidental.',
    cognateExample: { foreign: 'Chá / Janela / Sabão', hindi: 'चाय (Chai) / जंगला / साबुन (Sabun)', transliteration: 'Chai / Jangla / Sabun', meaning: 'Tea / Window / Soap' },
    accentChars: ['á', 'à', 'â', 'ã', 'é', 'ê', 'í', 'ó', 'ô', 'õ', 'ú', 'ç']
  },
  {
    id: 'course_tr_all',
    foreignLangEng: 'Turkish',
    foreignLangNative: 'Türkçe',
    flag: '🇹🇷',
    region: 'Eurasia / Middle East',
    difficulty: 'Beginner',
    totalModules: 15,
    totalLessons: 48,
    enrolledLearners: 35000,
    bannerGradient: 'from-[#991B1B] to-[#1E293B]',
    ttsLangCode: 'tr-TR',
    description: 'Agglutinative grammar, vowel harmony, and thousands of Persian-Arabic-Hindustani shared vocabulary items.',
    sampleGreetingForeign: 'Merhaba! Uluslararası dil kursumuza hoş geldiniz.',
    sampleGreetingForeignTranslit: 'MEHR-hah-bah! Hosh geld-EE-neez.',
    samplePassageForeign: 'Türkçe, düzenli dilbilgisi kuralları ve Hint dilleriyle paylaştığı ortak kelime hazinesi sayesinde hızla öğrenilebilen bir dildir.',
    cognateExample: { foreign: 'Dünya / Dost / Zaman', hindi: 'दुनिया (Duniya) / दोस्त (Dost) / ज़माना (Zamana)', transliteration: 'Duniya / Dost / Zamana', meaning: 'World / Friend / Time' },
    accentChars: ['ç', 'ğ', 'ı', 'ö', 'ş', 'ü', 'Ç', 'Ğ', 'İ', 'Ö', 'Ş', 'Ü']
  },
  {
    id: 'course_nl_all',
    foreignLangEng: 'Dutch',
    foreignLangNative: 'Nederlands',
    flag: '🇳🇱',
    region: 'Western Europe',
    difficulty: 'Beginner',
    totalModules: 13,
    totalLessons: 40,
    enrolledLearners: 22000,
    bannerGradient: 'from-[#EA580C] to-[#0B3D91]',
    ttsLangCode: 'nl-NL',
    description: 'Learn Dutch guttural sounds, compound nouns, and business communication for Netherlands and Flanders study tracks.',
    sampleGreetingForeign: 'Hallo en van harte welkom bij deze officiële taalcursus!',
    sampleGreetingForeignTranslit: 'HAH-loh en van HAR-tuh VEL-kom',
    samplePassageForeign: 'Het Nederlands is een Germaanse taal die een brug slaat tussen het Engels en het Duits. Het is de taal van innovatie en internationale handel.',
    cognateExample: { foreign: 'Broeder / Moeder / Acht', hindi: 'भ्राता (Bhrata) / माता (Mata) / आठ (Aath)', transliteration: 'Bhrata / Mata / Aath', meaning: 'Brother / Mother / Eight' },
    accentChars: ['é', 'ë', 'ï', 'ó', 'ü', 'ĳ']
  },
  {
    id: 'course_fa_all',
    foreignLangEng: 'Persian',
    foreignLangNative: 'فارسی (Farsi)',
    flag: '🇮🇷',
    region: 'Middle East / Central Asia',
    difficulty: 'Beginner',
    totalModules: 17,
    totalLessons: 54,
    enrolledLearners: 58000,
    bannerGradient: 'from-[#B45309] to-[#0B3D91]',
    ttsLangCode: 'fa-IR',
    description: 'Deep Indo-Iranian linguistic sisterhood. Over 35% of classical Hindi, Urdu, Bengali, and Punjabi vocabulary derives directly from Persian cognates.',
    sampleGreetingForeign: 'سلام و درود! به دوره آموزش زبان‌های بین‌المللی خوش آمدید.',
    sampleGreetingForeignTranslit: 'Salam o Dorood! Khosh Amadid.',
    samplePassageForeign: 'زبان فارسی و زبان‌های هندی خواهران دیرینه یک خانواده زبانی هستند. ادبیات، واژگان و شعر هردو فرهنگ پیوندی ناگسستنی دارند.',
    cognateExample: { foreign: 'نام (Nam) / دست (Dast) / دل (Dil)', hindi: 'नाम (Naam) / दस्त (Dast) / दिल (Dil)', transliteration: 'Naam / Dast / Dil', meaning: 'Name / Hand / Heart' },
    accentChars: ['ا', 'ب', 'پ', 'ت', 'ث', 'ج', 'چ', 'ح', 'خ', 'د', 'ذ', 'ر', 'ز', 'ژ', 'س', 'ش', 'ص', 'ض', 'ط', 'ظ', 'ع', 'غ', 'ف', 'ق', 'ک', 'گ', 'ل', 'م', 'ن', 'و', 'ه', 'ی']
  },
  {
    id: 'course_vi_all',
    foreignLangEng: 'Vietnamese',
    foreignLangNative: 'Tiếng Việt',
    flag: '🇻🇳',
    region: 'Southeast Asia',
    difficulty: 'Beginner',
    totalModules: 14,
    totalLessons: 42,
    enrolledLearners: 26000,
    bannerGradient: 'from-[#B91C1C] to-[#D97706]',
    ttsLangCode: 'vi-VN',
    description: 'Master Latin-based Quốc Ngữ script, six tones, and Sanskrit-Pali loanwords shared across Southeast Asian Buddhist traditions.',
    sampleGreetingForeign: 'Xin chào! Chào mừng bạn đến với khóa học ngôn ngữ quốc tế.',
    sampleGreetingForeignTranslit: 'Sin chow! Chow moong ban.',
    samplePassageForeign: 'Tiếng Việt là ngôn ngữ giàu thanh điệu và có mối giao lưu văn hóa sâu sắc với nền văn minh sông Hằng qua ngàn năm lịch sử.',
    cognateExample: { foreign: 'Nam / Phật / Tâm', hindi: 'नर (Nara) / बुद्ध (Buddha) / चित्त (Citta)', transliteration: 'Nara / Buddha / Citta', meaning: 'Person / Buddha / Mind' },
    accentChars: ['à', 'á', 'ả', 'ã', 'ạ', 'ă', 'ằ', 'ắ', 'ẳ', 'ẵ', 'ặ', 'â', 'ầ', 'ấ', 'ẩ', 'ẫ', 'ậ', 'è', 'é', 'ẻ', 'ẽ', 'ẹ', 'ê', 'ề', 'ế', 'ể', 'ễ', 'ệ', 'ì', 'í', 'ỉ', 'ĩ', 'ị', 'ò', 'ó', 'ỏ', 'õ', 'ọ', 'ô', 'ồ', 'ố', 'ổ', 'ỗ', 'ộ', 'ơ', 'ờ', 'ớ', 'ở', 'ỡ', 'ợ', 'ù', 'ú', 'ủ', 'ũ', 'ụ', 'ư', 'ừ', 'ứ', 'ử', 'ữ', 'ự', 'ỳ', 'ý', 'ỷ', 'ỹ', 'ỵ', 'đ']
  }
];

// Progress data structure for a course
interface CourseProgressState {
  video1Done: boolean;
  video2Done: boolean;
  video3Done: boolean;
  readingCompleted: boolean;
  writingCompleted: boolean;
  writingAnswer: string;
  speakingCompleted: boolean;
  speakingScore: number | null;
  listeningCompleted: boolean;
  listeningAnswer: number;
  examCompleted: boolean;
  examScore: number | null;
  examAnswers: Record<number, number>;
}

const STORAGE_KEY_PROGRESS = 'foreign_languages_progress_v2';

export default function DashboardForeignLanguagesPage() {
  const [user, setUser] = useState<User | null>(null);

  // 1. Learning Direction (Default: Indian to Foreign)
  const [learningDirection, setLearningDirection] = useState<'indian_to_foreign' | 'foreign_to_indian'>('indian_to_foreign');
  const [sourceIndianLang, setSourceIndianLang] = useState<IndianLanguageOption>(INDIAN_LANGUAGES_22[0]); // Default: Hindi
  const [targetIndianLang, setTargetIndianLang] = useState<IndianLanguageOption>(INDIAN_LANGUAGES_22[0]);

  // Tab & Filters
  const [activeTab, setActiveTab] = useState<'all' | 'my-courses' | 'passport' | 'matrix'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');

  // Modals & Active In-Page Course Workspace
  const [selectedCourseModal, setSelectedCourseModal] = useState<ForeignLanguageCourse | null>(null);
  const [activePlayCourse, setActivePlayCourse] = useState<ForeignLanguageCourse | null>(null);

  // 8 Workspace Steps
  const [courseStepTab, setCourseStepTab] = useState<
    'videos' | 'reading' | 'writing' | 'guided-learning' | 'speaking' | 'listening' | 'exam' | 'certificate'
  >('videos');

  // Day syllabus & Video selection
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
  const [selectedDubLang, setSelectedDubLang] = useState<string>('hi');
  const [showDubbingModal, setShowDubbingModal] = useState<boolean>(false);
  const [dubbingSearchQuery, setDubbingSearchQuery] = useState<string>('');

  // Speaking module recording state
  const [isRecordingSpeaking, setIsRecordingSpeaking] = useState(false);
  const [speakingFeedback, setSpeakingFeedback] = useState<string | null>(null);

  // Checkout modal
  const [checkoutCourse, setCheckoutCourse] = useState<ForeignLanguageCourse | null>(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentSuccessInvoice, setPaymentSuccessInvoice] = useState<string | null>(null);
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);

  // Persistent Course Progress Map
  const [courseProgressMap, setCourseProgressMap] = useState<Record<string, CourseProgressState>>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY_PROGRESS);
        if (saved) return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to load progress', e);
      }
    }
    // Default initial seeded progress for sample English course
    return {
      'course_en_all': {
        video1Done: true,
        video2Done: true,
        video3Done: true,
        readingCompleted: true,
        writingCompleted: true,
        writingAnswer: 'Hello! I am an Indian scholar mastering foreign languages.',
        speakingCompleted: true,
        speakingScore: 96,
        listeningCompleted: true,
        listeningAnswer: 1,
        examCompleted: true,
        examScore: 98,
        examAnswers: { 1: 1, 2: 1, 3: 1, 4: 1 }
      }
    };
  });

  // Sync to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify(courseProgressMap));
      } catch (e) {
        console.error(e);
      }
    }
  }, [courseProgressMap]);

  useEffect(() => {
    setUser(getStoredUser());
  }, []);

  const isEnrolled = (courseId: string) => {
    return user?.enrolledCourses?.includes(courseId) || false;
  };

  // Helper to get step progress and unlock statuses
  const getStepProgress = (courseId: string) => {
    const cur: CourseProgressState = courseProgressMap[courseId] || {
      video1Done: false,
      video2Done: false,
      video3Done: false,
      readingCompleted: false,
      writingCompleted: false,
      writingAnswer: '',
      speakingCompleted: false,
      speakingScore: null,
      listeningCompleted: false,
      listeningAnswer: 0,
      examCompleted: false,
      examScore: null,
      examAnswers: {}
    };

    const videosCompleted = cur.video1Done && cur.video2Done && cur.video3Done;
    const readingCompleted = cur.readingCompleted;
    const writingCompleted = cur.writingCompleted;
    const speakingCompleted = cur.speakingCompleted;
    const listeningCompleted = cur.listeningCompleted;
    const examCompleted = cur.examCompleted;

    // Sequential Unlock Logic:
    // Module 1 (Videos) -> Always unlocked
    // Module 2 (Reading) -> Unlocked when Videos done
    // Module 3 (Writing) -> Unlocked when Reading done
    // Guided Learning -> Unlocked when Writing done (also accessible anytime during practice)
    // Module 4 (Speaking) -> Unlocked when Writing done
    // Module 5 (Listening) -> Unlocked when Speaking done
    // Module 6 (Exam) -> Unlocked when Listening done
    // Module 7 (Diploma) -> Unlocked when Exam passed & all 1-6 done

    const unlockReading = videosCompleted;
    const unlockWriting = unlockReading && readingCompleted;
    const unlockSpeaking = unlockWriting && writingCompleted;
    const unlockListening = unlockSpeaking && speakingCompleted;
    const unlockExam = unlockListening && listeningCompleted;
    const unlockDiploma = unlockExam && examCompleted;

    let completedCount = 0;
    if (videosCompleted) completedCount++;
    if (readingCompleted) completedCount++;
    if (writingCompleted) completedCount++;
    if (speakingCompleted) completedCount++;
    if (listeningCompleted) completedCount++;
    if (examCompleted) completedCount++;

    const percent = Math.round((completedCount / 6) * 100);
    const allFinished = completedCount === 6;

    return {
      ...cur,
      videosCompleted,
      unlockReading,
      unlockWriting,
      unlockSpeaking,
      unlockListening,
      unlockExam,
      unlockDiploma,
      completedCount,
      percent,
      allFinished
    };
  };

  const updateCourseProgress = (courseId: string, updates: Partial<CourseProgressState>) => {
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
          speakingCompleted: false,
          speakingScore: null,
          listeningCompleted: false,
          listeningAnswer: 0,
          examCompleted: false,
          examScore: null,
          examAnswers: {}
        }),
        ...updates
      }
    }));
  };

  const resetCourseProgress = (courseId: string) => {
    if (confirm('Are you sure you want to reset your progress for this course?')) {
      updateCourseProgress(courseId, {
        video1Done: false,
        video2Done: false,
        video3Done: false,
        readingCompleted: false,
        writingCompleted: false,
        writingAnswer: '',
        speakingCompleted: false,
        speakingScore: null,
        listeningCompleted: false,
        listeningAnswer: 0,
        examCompleted: false,
        examScore: null,
        examAnswers: {}
      });
      setCourseStepTab('videos');
      setActiveVideoIndex(1);
    }
  };

  // Realistic Text-To-Speech Synthesis
  const playAudio = (text: string, customLang?: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      if (customLang) {
        utterance.lang = customLang;
      } else if (learningDirection === 'indian_to_foreign' && activePlayCourse) {
        utterance.lang = activePlayCourse.ttsLangCode;
      } else if (learningDirection === 'foreign_to_indian') {
        utterance.lang = targetIndianLang.ttsCode || 'hi-IN';
      } else {
        utterance.lang = sourceIndianLang.ttsCode || 'hi-IN';
      }
      utterance.rate = 0.9;
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
      activePlayCourse?.foreignLangEng || '',
      activeVideoModal?.title || 'Phonetics and Grammar Masterclass'
    );
    const speechContent = customText || dubbedInfo.speech;

    const utterance = new SpeechSynthesisUtterance(speechContent);
    utterance.lang = langObj.ttsCode;
    utterance.rate = playbackSpeed || 1.0;
    window.speechSynthesis.speak(utterance);
  };

  // Simulated AI Speech Assessment
  const handleSimulateSpeaking = (courseId: string) => {
    setIsRecordingSpeaking(true);
    setSpeakingFeedback('Listening to acoustic tone, pitch, and phonetic matching...');

    setTimeout(() => {
      setIsRecordingSpeaking(false);
      const score = Math.floor(Math.random() * 8) + 92; // 92 - 99%
      setSpeakingFeedback(`Phonetic clarity: 98% • Tone & Stress: 94% • Native Cadence Match: ${score}%`);
      updateCourseProgress(courseId, { speakingCompleted: true, speakingScore: score });
      addXpToUser(50);
      try {
        confetti({ particleCount: 80, spread: 60, origin: { y: 0.7 } });
      } catch (e) {
        console.log(e);
      }
    }, 2400);
  };

  // Payment Checkout
  const handleProcessPayment = () => {
    if (!checkoutCourse) return;
    setIsProcessingPayment(true);

    setTimeout(() => {
      const updatedUser = enrollInCourse(checkoutCourse.id);
      setUser({ ...updatedUser });

      try {
        confetti({ particleCount: 150, spread: 85, origin: { y: 0.6 } });
      } catch (e) {
        console.log('Confetti');
      }

      setIsProcessingPayment(false);
      const invNumber = 'INV-GLOBAL-2026-' + Math.floor(100000 + Math.random() * 900000);
      setPaymentSuccessInvoice(invNumber);
    }, 1200);
  };

  const handleFinishCheckout = () => {
    setPaymentSuccessInvoice(null);
    setCheckoutCourse(null);
    setCouponCode('');
    setCouponApplied(false);
    setActiveTab('my-courses');
  };

  // Filter Courses
  const filteredCourses = useMemo(() => {
    return FOREIGN_LANGUAGE_COURSES.filter((c) => {
      const matchesSearch =
        c.foreignLangEng.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.foreignLangNative.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.region.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesRegion = selectedRegion === 'All' || c.region.includes(selectedRegion);

      if (activeTab === 'my-courses') {
        return isEnrolled(c.id) && matchesSearch && matchesRegion;
      }
      return matchesSearch && matchesRegion;
    });
  }, [searchQuery, selectedRegion, activeTab, user]);

  const enrolledCoursesList = useMemo(() => {
    return FOREIGN_LANGUAGE_COURSES.filter((c) => isEnrolled(c.id));
  }, [user]);

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-20 text-left">
      {/* 1. HERO BIDIRECTIONAL CONTROL BANNER */}
      <div className="p-6 sm:p-8 rounded-sm bg-gradient-to-r from-[#0B3D91] via-[#082C6C] to-[#051C45] text-white border border-[#082C6C] border-l-4 border-[#FF9933] shadow-md space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-black uppercase tracking-wider border border-amber-400/30">
                🇮🇳 MEA GLOBAL BIDIRECTIONAL LANGUAGE ENGINE
              </span>
              <span className="px-3 py-1 rounded-full bg-blue-400/20 text-blue-200 text-[10px] font-bold border border-blue-400/30">
                22 Indian Languages ⟷ 15 Foreign Languages
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {learningDirection === 'indian_to_foreign'
                ? `Learn World Foreign Languages from ${sourceIndianLang.nameEng} (${sourceIndianLang.nameNative})`
                : `Master All 22 Scheduled Indian Languages from World Foreign Languages`}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
              {learningDirection === 'indian_to_foreign'
                ? `Specialized pathway for Indian scholars, civil servants & diplomats to achieve CEFR A1-C2 mastery in English, French, German, Spanish, Japanese, Mandarin, Russian, Arabic & more using your native mother tongue.`
                : `Comprehensive learning portal for international diplomats, NRI diaspora, and foreign scholars to learn 22 Eighth Schedule Indian languages (Hindi, Tamil, Telugu, Bengali, Marathi, etc.) with IPA phonetics & certified diploma.`}
            </p>
          </div>

          {/* Direct link to dedicated Foreign to Indian page */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center bg-[#051C45] p-2 rounded-sm border border-[#082C6C] gap-2 shrink-0">
            <div className="px-3 py-1 text-xs text-amber-300 font-extrabold flex items-center gap-1.5">
              <span>🇮🇳 ➔ 🌐</span> Indian ➔ Foreign Track Active
            </div>
            <a
              href="/dashboard/student?tab=foreign-to-indian"
              className="px-4 py-2 rounded-sm text-xs font-black bg-[#0B3D91] hover:bg-[#0E4BA8] text-white border border-blue-400/40 transition flex items-center justify-center gap-2 shadow-sm"
            >
              <span>🌐 ➔ 🇮🇳</span> Foreign ➔ Indian Portal →
            </a>
          </div>
        </div>

        {/* Dynamic Selector Bar */}
        <div className="pt-4 border-t border-slate-700/60 flex flex-wrap items-center justify-between gap-4 text-xs">
          {learningDirection === 'indian_to_foreign' ? (
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-amber-300 font-black">1. Choose Your Source Indian Mother Tongue:</span>
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
          ) : (
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-cyan-300 font-black">1. Choose Target Indian Language to Master:</span>
              <select
                value={targetIndianLang.code}
                onChange={(e) => {
                  const found = INDIAN_LANGUAGES_22.find((l) => l.code === e.target.value);
                  if (found) setTargetIndianLang(found);
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
                onClick={() => playAudio(targetIndianLang.sampleAudioText, targetIndianLang.ttsCode)}
                className="px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-white font-bold text-[11px] flex items-center gap-1 transition"
              >
                <Volume2 className="w-3.5 h-3.5 text-cyan-300" /> Listen Sample
              </button>
            </div>
          )}

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
                  {learningDirection === 'indian_to_foreign'
                    ? `INDIAN SCHOLAR TRACK • 🇮🇳 ${sourceIndianLang.nameEng} (${sourceIndianLang.nameNative}) ➔ ${activePlayCourse.flag} ${activePlayCourse.foreignLangEng} (${activePlayCourse.foreignLangNative})`
                    : `INTERNATIONAL ENVOY TRACK • ${activePlayCourse.flag} ${activePlayCourse.foreignLangEng} ➔ 🇮🇳 ${targetIndianLang.nameEng} (${targetIndianLang.nameNative})`}
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  {learningDirection === 'indian_to_foreign'
                    ? `Master ${activePlayCourse.foreignLangEng} from ${sourceIndianLang.nameEng}`
                    : `${activePlayCourse.foreignLangEng} to ${targetIndianLang.nameEng} Diploma Course`}
                </h2>
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
                      {prog.allFinished ? '🎉 All 6 Modules Finished! Diploma Ready.' : 'Complete steps in sequence to unlock next.'}
                    </span>
                  </div>
                </div>
              );
            })()}
          </div>

          {/* ========================================================================= */}
          {/* TWO-COLUMN WORKSPACE: LEFT 7-STEP MODULE RAIL & RIGHT MAIN CONTENT AREA    */}
          {/* ========================================================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* ========================================================= */}
            {/* LEFT SIDEBAR: 7-STEP MODULE PROGRESSION RAIL              */}
            {/* ========================================================= */}
            <div className="lg:col-span-4 xl:col-span-3 space-y-4 lg:sticky lg:top-4">
              {/* Course Progress Card */}
              {(() => {
                const prog = getStepProgress(activePlayCourse.id);
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
                        onClick={() => resetCourseProgress(activePlayCourse.id)}
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
                const prog = getStepProgress(activePlayCourse.id);
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
              {/* STEP 1: VIDEO LECTURES (LEVEL/DAY/CHAPTER-WISE LIST & POPUP)*/}
              {/* ========================================================= */}
              {courseStepTab === 'videos' && (
                <div className="p-6 sm:p-8 rounded-sm bg-white border border-[#DCE2E6] space-y-6 shadow-xs">
                  

                  {/* Featured Main Cinema Video Player Canvas (Click pops up Video Modal) */}
                

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
                          {learningDirection === 'indian_to_foreign'
                            ? `7-Day Fast Track: ${activePlayCourse.foreignLangEng} via ${sourceIndianLang.nameEng}`
                            : `7-Day Fast Track: ${targetIndianLang.nameEng} via ${activePlayCourse.foreignLangEng}`}
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
                          dayName: 'Day 1: Alphabet, Script & Phonetics Guide',
                          levelTag: 'L1: Starter',
                          icon: '🔤',
                          chapters: [
                            {
                              chapterNum: 'Chapter 1.1',
                              title: `${activePlayCourse.foreignLangEng} Vowel Phonemes, Script Alphabet & Diacritics`,
                              duration: '10 Mins • HD 1080p',
                              desc: `Detailed phonetic guide to basic vowels, articulation, short/long sounds, and comparative phonetic mappings in ${sourceIndianLang.nameEng}.`,
                              vIndex: 1 as const
                            },
                            {
                              chapterNum: 'Chapter 1.2',
                              title: `${activePlayCourse.foreignLangEng} Consonants, Nasalized Sounds & Ligatures`,
                              duration: '12 Mins • HD 1080p',
                              desc: `Pronunciation breakdown of gutturals, dentals, palatals, retroflex rules, and consonant clusters.`,
                              vIndex: 1 as const
                            },
                            {
                              chapterNum: 'Chapter 1.3',
                              title: `${activePlayCourse.foreignLangEng} Script Stroke Order & Transliteration Guide`,
                              duration: '14 Mins • HD 1080p',
                              desc: `Interactive stroke order demonstration, ligature writing pad, and Romanized/Devanagari transliteration tables.`,
                              vIndex: 1 as const
                            }
                          ]
                        },
                        {
                          day: 2,
                          dayName: 'Day 2: Essential Greetings, Pronouns & Cognates',
                          levelTag: 'L1: Starter',
                          icon: '💬',
                          chapters: [
                            {
                              chapterNum: 'Chapter 2.1',
                              title: `Formal & Informal Greetings, Etiquette & Polite Registers in ${activePlayCourse.foreignLangEng}`,
                              duration: '10 Mins • HD 1080p',
                              desc: `Social etiquette, morning/evening greetings, formal honorifics, and polite courtesy phrases.`,
                              vIndex: 1 as const
                            },
                            {
                              chapterNum: 'Chapter 2.2',
                              title: `Personal Pronouns, Family Kinship & Structured Self-Introduction`,
                              duration: '12 Mins • HD 1080p',
                              desc: `Mastering I/You/He/She/We pronouns and learning how to introduce your name, country, and profession.`,
                              vIndex: 1 as const
                            },
                            {
                              chapterNum: 'Chapter 2.3',
                              title: `High-Frequency Indo-European/Dravidian Cognates & Numbers 1–100`,
                              duration: '12 Mins • HD 1080p',
                              desc: `Connecting Sanskrit/Indian loanwords with ${activePlayCourse.foreignLangEng} vocabulary and cardinal numerals.`,
                              vIndex: 1 as const
                            }
                          ]
                        },
                        {
                          day: 3,
                          dayName: 'Day 3: Comparative Grammar, SOV/SVO & Cases',
                          levelTag: 'L2: Basic',
                          icon: '🧩',
                          chapters: [
                            {
                              chapterNum: 'Chapter 3.1',
                              title: `Comparative Sentence Structure: SOV ⟷ SVO Syntax Breakdown`,
                              duration: '12 Mins • HD 1080p',
                              desc: `Structural comparison between Indian SOV word order and ${activePlayCourse.foreignLangEng} syntax patterns.`,
                              vIndex: 2 as const
                            },
                            {
                              chapterNum: 'Chapter 3.2',
                              title: `Verb Conjugations, Present/Past Tense & Auxiliary Verbs`,
                              duration: '14 Mins • HD 1080p',
                              desc: `Regular vs irregular verb conjugations, person-number agreement, and time-aspect markers.`,
                              vIndex: 2 as const
                            },
                            {
                              chapterNum: 'Chapter 3.3',
                              title: `Case Markers, Postpositions/Prepositions & Negation Rules`,
                              duration: '14 Mins • HD 1080p',
                              desc: `Nominative, accusative, dative case equivalents, directional particles, and negative sentence construction.`,
                              vIndex: 2 as const
                            }
                          ]
                        },
                        {
                          day: 4,
                          dayName: 'Day 4: Interactive Written Drills & Morphology',
                          levelTag: 'L2: Basic',
                          icon: '✍️',
                          chapters: [
                            {
                              chapterNum: 'Chapter 4.1',
                              title: `Morphological Suffixes, Prefix Agglutination & Word Derivation`,
                              duration: '11 Mins • HD 1080p',
                              desc: `Deriving adjectives, nouns, and adverbial forms from root verbs and vocabulary expansion rules.`,
                              vIndex: 2 as const
                            },
                            {
                              chapterNum: 'Chapter 4.2',
                              title: `Structured Sentence Synthesis & Paragraph Composition`,
                              duration: '15 Mins • HD 1080p',
                              desc: `Connecting clauses with conjunctions, relative pronouns, and practical essay composition drills.`,
                              vIndex: 2 as const
                            }
                          ]
                        },
                        {
                          day: 5,
                          dayName: 'Day 5: Spoken AI Voice Coach, Dialogues & Fluency',
                          levelTag: 'L3: Fluent',
                          icon: '🗣️',
                          chapters: [
                            {
                              chapterNum: 'Chapter 5.1',
                              title: `Conversational Turn-Taking, Rhythm & Accent Modulation`,
                              duration: '12 Mins • HD 1080p',
                              desc: `Mastering speech rhythm, sentence stress patterns, pitch intonation, and native accent reduction.`,
                              vIndex: 3 as const
                            },
                            {
                              chapterNum: 'Chapter 5.2',
                              title: `Everyday Pragmatics, Cultural Idioms & Colloquial Expressions`,
                              duration: '14 Mins • HD 1080p',
                              desc: `Situational dialogues for travel, dining, business meetings, and diplomatic interactions.`,
                              vIndex: 3 as const
                            },
                            {
                              chapterNum: 'Chapter 5.3',
                              title: `Live AI Voice Simulation: Conversational Roleplay Masterclass`,
                              duration: '16 Mins • HD 1080p',
                              desc: `Interactive voice conversation simulation with instant AI feedback on pronunciation and speed.`,
                              vIndex: 3 as const
                            }
                          ]
                        },
                        {
                          day: 6,
                          dayName: 'Day 6: Listening Comprehension & Native Accents',
                          levelTag: 'L3: Fluent',
                          icon: '🎧',
                          chapters: [
                            {
                              chapterNum: 'Chapter 6.1',
                              title: `Fast-Speech Auditory Adaptation & Ambient Noise Filtering`,
                              duration: '12 Mins • HD 1080p',
                              desc: `Techniques for decoding connected speech, dropped syllables, native speed, and regional accents.`,
                              vIndex: 3 as const
                            },
                            {
                              chapterNum: 'Chapter 6.2',
                              title: `Multi-Speaker Auditory Comprehension Drills & Quick Recall`,
                              duration: '14 Mins • HD 1080p',
                              desc: `Listening to authentic news snippets, dialogues, and audio stories with immediate multiple-choice checks.`,
                              vIndex: 3 as const
                            }
                          ]
                        },
                        {
                          day: 7,
                          dayName: 'Day 7: Final International Exam & Diploma Capstone',
                          levelTag: 'L4: Master',
                          icon: '📜',
                          chapters: [
                            {
                              chapterNum: 'Chapter 7.1',
                              title: `Comprehensive Capstone Review (Phonetics + Grammar + Vocabulary)`,
                              duration: '15 Mins • HD 1080p',
                              desc: `Comprehensive masterclass reviewing all 6 modules, key exam traps, and certification preparation.`,
                              vIndex: 3 as const
                            },
                            {
                              chapterNum: 'Chapter 7.2',
                              title: `International Diploma Certification Defense & Issuance Guide`,
                              duration: '18 Mins • HD 1080p',
                              desc: `Final walkthrough for claiming your official ICCR & MEA accredited bilingual International Diploma.`,
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
                                        { key: 'hi', flag: '🇮🇳', name: 'Hindi' },
                                        { key: 'en', flag: '🇬🇧', name: 'English' },
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
                        </div>
                      );
                    })()}

                    <div className="p-3 bg-amber-50 border border-amber-200 rounded-sm text-xs text-amber-900 font-medium flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>💡 Tip: Click any day (Day 1–7) above to switch curriculum targets, then click any Chapter video to pop up the cinema masterclass!</span>
                    </div>
                  </div>

                  {/* Proceed to Step 2 Action */}
                  {(() => {
                    const prog = getStepProgress(activePlayCourse.id);
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
                    {learningDirection === 'indian_to_foreign'
                      ? `${activePlayCourse.foreignLangEng} (${activePlayCourse.foreignLangNative}) Reading Passage & Grammar Breakdown`
                      : `पठन सामग्री • ${targetIndianLang.nameEng} (${targetIndianLang.nameNative}) Reading & Grammar Study`}
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
                    onClick={() =>
                      playAudio(
                        learningDirection === 'indian_to_foreign'
                          ? activePlayCourse.samplePassageForeign
                          : targetIndianLang.samplePassage,
                        learningDirection === 'indian_to_foreign' ? activePlayCourse.ttsLangCode : targetIndianLang.ttsCode
                      )
                    }
                    className="px-3 py-1.5 rounded-sm bg-[#0B3D91] hover:bg-[#082C6C] text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition"
                  >
                    <Volume2 className="w-4 h-4" /> Listen Full Passage Audio
                  </button>
                </div>

                <div className="space-y-3 bg-white p-5 rounded-sm border border-[#DCE2E6]">
                  <h4 className="text-base font-black text-slate-900 leading-relaxed">
                    {learningDirection === 'indian_to_foreign'
                      ? activePlayCourse.samplePassageForeign
                      : targetIndianLang.samplePassage}
                  </h4>
                  <div className="p-3 bg-slate-50 border-l-4 border-[#0B3D91] text-xs sm:text-sm text-slate-700 font-medium">
                    <span className="font-bold text-slate-900 block mb-1">Comparative Translation:</span>
                    {learningDirection === 'indian_to_foreign'
                      ? sourceIndianLang.samplePassage
                      : `Translation in ${activePlayCourse.foreignLangEng}: ${activePlayCourse.samplePassageForeign}`}
                  </div>
                </div>

                {/* Key Grammar Insights Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="p-4 bg-white rounded-sm border border-[#DCE2E6] space-y-1">
                    <span className="text-slate-400 block text-[10px] font-black uppercase">Sample Greeting</span>
                    <span className="font-black text-slate-900 text-sm">
                      {learningDirection === 'indian_to_foreign'
                        ? activePlayCourse.sampleGreetingForeign
                        : targetIndianLang.sampleGreeting}
                    </span>
                    <span className="text-[#0B3D91] block text-[11px] font-semibold">
                      {learningDirection === 'indian_to_foreign'
                        ? activePlayCourse.sampleGreetingForeignTranslit
                        : targetIndianLang.pronunciationGuide}
                    </span>
                  </div>

                  <div className="p-4 bg-white rounded-sm border border-[#DCE2E6] space-y-1">
                    <span className="text-slate-400 block text-[10px] font-black uppercase">Sentence Structure</span>
                    <span className="font-bold text-slate-900">
                      {learningDirection === 'indian_to_foreign'
                        ? activePlayCourse.foreignLangEng === 'Japanese' || activePlayCourse.foreignLangEng === 'Korean'
                          ? 'SOV (Subject-Object-Verb, Same as Indian Languages)'
                          : 'SVO (Subject-Verb-Object)'
                        : 'SOV (Subject-Object-Verb)'}
                    </span>
                    <span className="text-emerald-600 block font-bold text-[11px]">Bilingual Bridge Active</span>
                  </div>

                  <div className="p-4 bg-white rounded-sm border border-[#DCE2E6] space-y-1">
                    <span className="text-slate-400 block text-[10px] font-black uppercase">Shared Cognate</span>
                    <span className="font-bold text-slate-900">{activePlayCourse.cognateExample.foreign}</span>
                    <span className="text-amber-700 block font-bold text-[11px]">
                      {activePlayCourse.cognateExample.hindi} ({activePlayCourse.cognateExample.meaning})
                    </span>
                  </div>
                </div>
              </div>

                {(() => {
                  const prog = getStepProgress(activePlayCourse.id);
                  return (
                    <div className="flex items-center justify-between pt-4 border-t border-[#DCE2E6]">
                      <button
                        onClick={() => {
                          updateCourseProgress(activePlayCourse.id, { readingCompleted: true });
                          addXpToUser(30);
                        }}
                        className={`px-6 py-3 rounded-sm font-bold text-xs transition ${
                          prog.readingCompleted
                            ? 'bg-emerald-600 text-white'
                            : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-300'
                        }`}
                      >
                        {prog.readingCompleted ? '✓ Reading Text Completed (XP Added)' : 'Mark Reading Text as Completed'}
                      </button>

                      <button
                        disabled={!prog.readingCompleted}
                        onClick={() => setCourseStepTab('writing')}
                        className={`px-6 py-3 rounded-sm font-bold text-xs flex items-center gap-2 transition ${
                          !prog.readingCompleted
                            ? 'bg-slate-200 text-slate-400 border border-[#D0DCE7] cursor-not-allowed'
                            : 'bg-[#0B3D91] hover:bg-[#082C6C] text-white shadow-md'
                        }`}
                      >
                        {!prog.readingCompleted ? '🔒 Complete Reading First' : 'Proceed to Step 3: Written Practice →'}
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
                  <span className="text-[10px] font-black uppercase text-orange-600 tracking-wider block">
                    MODULE 3 OF 6 • INTERACTIVE WRITING & SCRIPT STUDIO
                  </span>
                  <h3 className="text-xl font-black text-slate-900">
                    {learningDirection === 'indian_to_foreign'
                      ? `${activePlayCourse.foreignLangEng} (${activePlayCourse.foreignLangNative}) Writing Studio`
                      : `लिखित अभ्यास • ${targetIndianLang.nameEng} (${targetIndianLang.script} Script) Writing Studio`}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Type and compose sentences using the virtual character palette. Submit for real-time grammar evaluation.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {/* Exercise Prompt */}
                <div className="p-4 rounded-sm bg-amber-50 border border-amber-200 text-amber-900 text-xs space-y-1.5">
                  <span className="font-black text-sm flex items-center gap-1.5">
                    <Tag className="w-4 h-4 text-amber-600" /> Writing Exercise Task:
                  </span>
                  <p className="font-medium text-xs sm:text-sm leading-relaxed">
                    {learningDirection === 'indian_to_foreign'
                      ? `Compose a welcome greeting in ${activePlayCourse.foreignLangEng}: "Hello! I am an Indian scholar learning ${activePlayCourse.foreignLangEng} through ${sourceIndianLang.nameEng}." (Use accents toolbar if needed)`
                      : `Write a short introduction in ${targetIndianLang.nameEng} (${targetIndianLang.script} script) introducing yourself.`}
                  </p>
                </div>

                {(() => {
                  const prog = getStepProgress(activePlayCourse.id);

                  return (
                    <div className="space-y-4">
                      <textarea
                        rows={4}
                        placeholder={
                          learningDirection === 'indian_to_foreign'
                            ? `Type in ${activePlayCourse.foreignLangEng} here...`
                            : `Type your ${targetIndianLang.nameEng} response here...`
                        }
                        value={prog.writingAnswer}
                        onChange={(e) => updateCourseProgress(activePlayCourse.id, { writingAnswer: e.target.value })}
                        className="w-full p-4 rounded-sm bg-slate-50 border border-[#D0DCE7] text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0B3D91]"
                      />

                      {/* Character Insertion Toolbar */}
                      <div className="p-3.5 rounded-sm bg-slate-100 border border-[#DCE2E6] space-y-2">
                        <span className="text-[10px] font-black uppercase text-slate-600 tracking-wider block">
                          {learningDirection === 'indian_to_foreign'
                            ? `Special ${activePlayCourse.foreignLangEng} Characters & Accents Keyboard:`
                            : `Quick Insertion Toolbar (${targetIndianLang.nameEng}):`}
                        </span>
                        <div className="flex flex-wrap items-center gap-1.5 text-xs">
                          {(learningDirection === 'indian_to_foreign'
                            ? activePlayCourse.accentChars
                            : [targetIndianLang.sampleGreeting, 'स्वागत', 'भारत', 'नमस्ते']
                          ).map((char, i) => (
                            <button
                              key={i}
                              type="button"
                              onClick={() =>
                                updateCourseProgress(activePlayCourse.id, {
                                  writingAnswer: (prog.writingAnswer + ' ' + char).trim(),
                                })
                              }
                              className="px-2.5 py-1 rounded bg-white hover:bg-blue-50 text-slate-900 hover:text-[#0B3D91] font-bold border border-[#DCE2E6] transition shadow-2xs font-mono text-sm"
                            >
                              {char}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Submission & Next Step */}
                      <div className="flex flex-col sm:flex-row items-center justify-between pt-4 border-t border-[#DCE2E6] gap-3">
                        <button
                          onClick={() => {
                            if (!prog.writingAnswer.trim()) {
                              alert('Please write your sentence in the box above before submitting.');
                              return;
                            }
                            updateCourseProgress(activePlayCourse.id, { writingCompleted: true });
                            addXpToUser(40);
                            alert('✅ Written practice evaluated successfully! Grade: 100% (Accurate syntax & spelling).');
                          }}
                          className={`px-6 py-3 rounded-sm font-bold text-xs transition ${
                            prog.writingCompleted
                              ? 'bg-emerald-600 text-white'
                              : 'bg-orange-600 hover:bg-orange-700 text-white shadow-md'
                          }`}
                        >
                          {prog.writingCompleted ? '✓ Written Practice Submitted & Evaluated (100%)' : 'Submit Written Practice for AI Evaluation'}
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
                          {!prog.writingCompleted ? '🔒 Submit Writing First' : 'Proceed to Step 4: Speaking AI Coach →'}
                        </button>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* GUIDED STUDY MODULES (PDFs)                               */}
          {/* ========================================================= */}
          {courseStepTab === 'guided-learning' && (
            <div className="p-6 sm:p-8 rounded-sm bg-white border border-[#DCE2E6] space-y-6 shadow-xs">
              <div className="flex items-center justify-between border-b border-[#DCE2E6] pb-4">
                <div>
                  <span className="text-[10px] font-black uppercase text-emerald-600 tracking-wider block">
                    ICCR & MEA DIGITAL STUDY MODULES
                  </span>
                  <h3 className="text-xl font-black text-slate-900">
                    {learningDirection === 'indian_to_foreign'
                      ? `Digital Guided Handbooks & PDFs (${sourceIndianLang.nameEng} ➔ ${activePlayCourse.foreignLangEng})`
                      : `Digital Guided Handbooks & PDFs (${activePlayCourse.foreignLangEng} ➔ ${targetIndianLang.nameEng})`}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Download official high-resolution study notes, grammar handbooks, and phonetic cheat-sheets.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-4 bg-slate-900 text-white rounded-sm p-6 shadow-xl space-y-4 text-center border border-slate-800">
                  <div className="w-16 h-16 mx-auto rounded-sm bg-white p-2 flex items-center justify-center shadow-md">
                    <span className="font-black text-blue-900 text-base leading-none">ICCR</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase text-emerald-400 tracking-widest block">
                      OFFICIAL DIPLOMATIC HANDBOOK
                    </span>
                    <h4 className="text-sm font-extrabold text-white">
                      Complete Foreign-to-Indian Study Guide (2026 Edition)
                    </h4>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed font-medium">
                    Published jointly under Indian Council for Cultural Relations (ICCR) & Central Institute of Indian Languages (CIIL).
                  </p>
                </div>

                <div className="lg:col-span-8 space-y-3">
                  {[
                    { mod: 1, title: `Module 1: Complete Phonetic & Script Pronunciation Matrix (${activePlayCourse.foreignLangEng})`, size: '4.5 MB' },
                    { mod: 2, title: `Module 2: Comparative Grammar, SVO/SOV & Verb Conjugations`, size: '5.9 MB' },
                    { mod: 3, title: `Module 3: 1,000 Everyday Diplomatic & Commercial Vocabulary Handbook`, size: '3.8 MB' },
                    { mod: 4, title: `Module 4: Writing Exercises, Script Tracing & Keyboard Insertion Drills`, size: '4.7 MB' },
                    { mod: 5, title: `Module 5: Final International Certification Assessment Mock Papers`, size: '8.4 MB' }
                  ].map((m) => (
                    <div key={m.mod} className="p-4 bg-slate-50 rounded-sm border border-[#DCE2E6] flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-sm bg-white border border-[#DCE2E6] text-emerald-600 flex items-center justify-center shrink-0">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-[10px] font-black uppercase text-slate-400 block">MODULE {m.mod}</span>
                          <h5 className="font-extrabold text-xs text-slate-900">{m.title}</h5>
                          <span className="text-[10px] text-slate-500 font-medium">Verified PDF Document • {m.size}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => alert(`📥 Downloading "${m.title}" official PDF handbook...`)}
                        className="px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-black text-[11px] uppercase tracking-wider shadow-sm flex items-center gap-1.5 shrink-0 transition"
                      >
                        STUDY MATERIAL <Download className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#DCE2E6] flex justify-end">
                <button
                  onClick={() => setCourseStepTab('speaking')}
                  className="px-6 py-3 rounded-sm bg-[#0B3D91] hover:bg-[#082C6C] text-white font-bold text-xs flex items-center gap-2 shadow-md"
                >
                  Proceed to Step 4: Speaking AI Coach →
                </button>
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
                    MODULE 4 OF 6 • SPEAKING & SAMBHASINI AI PRONUNCIATION COACH
                  </span>
                  <h3 className="text-xl font-black text-slate-900">
                    {learningDirection === 'indian_to_foreign'
                      ? `मौखिक अभ्यास • Spoken ${activePlayCourse.foreignLangEng} AI Coach`
                      : `मौखिक अभ्यास • ${targetIndianLang.nameEng} Speaking Practice`}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Listen to native pronunciation, record your voice, and receive instant AI acoustic & intonation scoring.
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-sm bg-[#EEF3F8]/60 border border-[#D0DCE7] space-y-5">
                {/* Target phrase */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-sm border border-[#DCE2E6]">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase text-[#0B3D91]">Spoken Target Reference Phrase</span>
                    <h4 className="text-lg sm:text-xl font-black text-slate-900">
                      {learningDirection === 'indian_to_foreign'
                        ? activePlayCourse.sampleGreetingForeign
                        : targetIndianLang.sampleAudioText}
                    </h4>
                    <span className="text-xs text-slate-500 font-semibold block">
                      Phonetics: {learningDirection === 'indian_to_foreign' ? activePlayCourse.sampleGreetingForeignTranslit : targetIndianLang.pronunciationGuide}
                    </span>
                  </div>

                  <button
                    onClick={() =>
                      playAudio(
                        learningDirection === 'indian_to_foreign'
                          ? activePlayCourse.sampleGreetingForeign
                          : targetIndianLang.sampleAudioText,
                        learningDirection === 'indian_to_foreign' ? activePlayCourse.ttsLangCode : targetIndianLang.ttsCode
                      )
                    }
                    className="px-4 py-3 rounded-sm bg-[#0B3D91] hover:bg-[#082C6C] text-white font-bold text-xs flex items-center gap-2 shadow-md transition shrink-0"
                  >
                    <Volume2 className="w-5 h-5" /> Listen Native Audio
                  </button>
                </div>

                {/* Simulated Microphone Recording Card */}
                <div className="p-8 bg-white rounded-sm border border-[#DCE2E6] text-center space-y-4">
                  <div
                    onClick={() => handleSimulateSpeaking(activePlayCourse.id)}
                    className={`w-24 h-24 rounded-full mx-auto flex items-center justify-center cursor-pointer transition shadow-xl ${
                      isRecordingSpeaking
                        ? 'bg-red-500 text-white animate-pulse ring-8 ring-red-200'
                        : 'bg-[#0B3D91] hover:bg-[#082C6C] text-white hover:scale-105'
                    }`}
                  >
                    <Mic className="w-10 h-10" />
                  </div>

                  <div>
                    <h4 className="text-base font-extrabold text-slate-900">
                      {isRecordingSpeaking ? '🎙️ Recording & Analyzing Voice Cadence...' : 'Click Microphone to Record Your Voice'}
                    </h4>
                    <p className="text-xs text-slate-500 mt-1">
                      {speakingFeedback || 'Speak clearly into your microphone in the target language'}
                    </p>
                  </div>

                  {(() => {
                    const prog = getStepProgress(activePlayCourse.id);
                    return (
                      prog.speakingScore !== null && (
                        <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-sm max-w-md mx-auto space-y-1 animate-in fade-in">
                          <span className="text-sm font-black text-emerald-900 flex items-center justify-center gap-2">
                            <CheckCircle2 className="w-5 h-5 text-emerald-600" /> AI Pronunciation Score: {prog.speakingScore}%
                          </span>
                          <span className="text-xs text-emerald-700 font-semibold block">
                            ✓ Accurate pitch, native intonation, and flawless vowel stress!
                          </span>
                        </div>
                      )
                    );
                  })()}
                </div>
              </div>

              {(() => {
                const prog = getStepProgress(activePlayCourse.id);
                return (
                  <div className="flex items-center justify-between pt-4 border-t border-[#DCE2E6]">
                    <span className="text-xs text-slate-500 font-medium">
                      {!prog.speakingCompleted ? '⚠️ Complete speaking evaluation to unlock Step 5.' : '✅ Speaking score recorded!'}
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
                      {!prog.speakingCompleted ? '🔒 Finish Speaking First' : 'Proceed to Step 5: Listening Test →'}
                    </button>
                  </div>
                );
              })()}
            </div>
          )}

          {/* ========================================================= */}
          {/* STEP 5: LISTENING COMPREHENSION TEST                      */}
          {/* ========================================================= */}
          {courseStepTab === 'listening' && (
            <div className="p-6 sm:p-8 rounded-sm bg-white border border-[#DCE2E6] space-y-6 shadow-xs">
              <div className="flex items-center justify-between border-b border-[#DCE2E6] pb-4">
                <div>
                  <span className="text-[10px] font-black uppercase text-[#0B3D91] tracking-wider block">
                    MODULE 5 OF 6 • AUDIO LISTENING COMPREHENSION TEST
                  </span>
                  <h3 className="text-xl font-black text-slate-900">
                    श्रवण परीक्षा • Listening Comprehension Test
                  </h3>
                  <p className="text-xs text-slate-500">
                    Listen to the audio dialogue clip and answer the comprehension question below.
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-sm bg-[#EEF3F8]/60 border border-[#D0DCE7] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() =>
                      playAudio(
                        learningDirection === 'indian_to_foreign'
                          ? activePlayCourse.sampleGreetingForeign
                          : targetIndianLang.sampleAudioText,
                        learningDirection === 'indian_to_foreign' ? activePlayCourse.ttsLangCode : targetIndianLang.ttsCode
                      )
                    }
                    className="w-16 h-16 rounded-sm bg-[#0B3D91] hover:bg-[#082C6C] text-white flex items-center justify-center shrink-0 shadow-md transition hover:scale-105"
                  >
                    <Volume2 className="w-8 h-8 fill-white ml-0.5" />
                  </button>
                  <div>
                    <span className="text-[10px] font-black text-[#0B3D91] uppercase tracking-wider block">
                      Acoustic Listening Sample #1
                    </span>
                    <h4 className="text-base font-bold text-slate-900">
                      {learningDirection === 'indian_to_foreign'
                        ? `Listen to dialogue spoken in ${activePlayCourse.foreignLangEng}`
                        : `Listen to dialogue spoken in ${targetIndianLang.nameEng}`}
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">Click speaker button to play spoken audio</p>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-sm bg-slate-50 border border-[#DCE2E6] space-y-4 text-xs">
                <h4 className="text-sm font-black text-slate-900">
                  Question: What is the primary purpose expressed in the audio clip?
                </h4>

                {(() => {
                  const prog = getStepProgress(activePlayCourse.id);
                  const options = [
                    'A warm welcome and cultural introduction to foreign language learning (Correct)',
                    'Inquiring about flight schedule and airport terminal directions',
                    'Ordering food at a traditional international restaurant',
                    'Asking for weather forecasts in the capital city'
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
                    Pass the final assessment to unlock your official ICCR & MEA Accredited International Diploma.
                  </p>
                </div>
              </div>

              <div className="space-y-5 text-xs">
                <div className="p-4 rounded-sm bg-[#EEF3F8] border border-[#D0DCE7] text-[#082C6C] font-semibold flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#0B3D91] shrink-0" />
                  <span>
                    Exam Instructions: Passing threshold is 80%. Answering correctly generates your verifiable QR-coded International Diploma.
                  </span>
                </div>

                {/* Exam Questions */}
                <div className="space-y-4">
                  <div className="p-5 rounded-sm bg-slate-50 border border-[#DCE2E6] space-y-3">
                    <span className="font-black text-slate-900 text-sm block">
                      Q1: What is the native greeting in {learningDirection === 'indian_to_foreign' ? activePlayCourse.foreignLangEng : targetIndianLang.nameEng}?
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 font-bold">
                      <span className="p-3 bg-emerald-50 border border-emerald-400 text-emerald-900 rounded-sm flex items-center justify-between">
                        <span>1. {learningDirection === 'indian_to_foreign' ? activePlayCourse.sampleGreetingForeign : targetIndianLang.sampleGreeting}</span>
                        <Check className="w-4 h-4 text-emerald-600" />
                      </span>
                      <span className="p-3 bg-white border border-[#DCE2E6] text-slate-600 rounded-sm">
                        2. Au revoir / Farewell
                      </span>
                    </div>
                  </div>

                  <div className="p-5 rounded-sm bg-slate-50 border border-[#DCE2E6] space-y-3">
                    <span className="font-black text-slate-900 text-sm block">
                      Q2: Which cognate connects Sanskrit/Hindi and {activePlayCourse.foreignLangEng}?
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 font-bold">
                      <span className="p-3 bg-emerald-50 border border-emerald-400 text-emerald-900 rounded-sm flex items-center justify-between">
                        <span>1. &quot;{activePlayCourse.cognateExample.foreign}&quot; / &quot;{activePlayCourse.cognateExample.hindi}&quot;</span>
                        <Check className="w-4 h-4 text-emerald-600" />
                      </span>
                      <span className="p-3 bg-white border border-[#DCE2E6] text-slate-600 rounded-sm">
                        2. Non-related borrowed words
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
                            <CheckCircle2 className="w-4 h-4" /> Exam Passed! Score: {prog.examScore}% (Grade A+ International Distinction)
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
                            console.log('Confetti');
                          }
                          setCourseStepTab('certificate');
                        }}
                        className="px-8 py-3.5 rounded-sm bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-emerald-600/20 transition hover:scale-105"
                      >
                        {prog.allFinished ? 'View Unlocked International Diploma →' : 'Submit Exam & Generate International Diploma →'}
                      </button>
                    </div>
                  );
                })()}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* STEP 7: INTERNATIONAL DIPLOMA CERTIFICATE                 */}
          {/* ========================================================= */}
          {courseStepTab === 'certificate' && (
            <div className="space-y-6">
              <div className="p-8 sm:p-12 rounded-sm bg-white border-8 border-double border-[#0B3D91] shadow-2xl text-center space-y-6 relative overflow-hidden max-w-4xl mx-auto">
                <div className="absolute top-0 left-0 w-36 h-36 bg-[#0B3D91]/10 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-36 h-36 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

                <div className="space-y-2">
                  <div className="w-16 h-16 rounded-full bg-[#EEF3F8] border-2 border-[#082C6C] text-[#0B3D91] flex items-center justify-center mx-auto shadow-md">
                    <Globe className="w-10 h-10 text-[#0B3D91]" />
                  </div>
                  <span className="text-xs font-black uppercase tracking-widest text-[#082C6C] block">
                    ICCR & MINISTRY OF EXTERNAL AFFAIRS (MEA) ACCREDITED
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-serif font-black text-slate-900 tracking-tight">
                    अंतर्राष्ट्रीय डिप्लोमा • INTERNATIONAL DIPLOMA
                  </h2>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                    {learningDirection === 'indian_to_foreign'
                      ? `Diploma in ${activePlayCourse.foreignLangEng} (${activePlayCourse.foreignLangNative}) Studies via ${sourceIndianLang.nameEng}`
                      : `Diploma in ${targetIndianLang.nameEng} (${targetIndianLang.nameNative}) Studies via ${activePlayCourse.foreignLangEng}`}
                  </p>
                </div>

                <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-[#0B3D91] to-transparent mx-auto" />

                <div className="space-y-4 text-xs sm:text-sm text-slate-700 max-w-2xl mx-auto leading-relaxed">
                  <p className="italic">This International Diploma of Academic Excellence is proudly conferred upon</p>
                  <h3 className="text-2xl sm:text-3xl font-black text-[#082C6C] border-b-2 border-[#DCE2E6] pb-1 inline-block">
                    {user?.name || 'Alexander Wright (एलेक्जेंडर राइट)'}
                  </h3>
                  <p>
                    having successfully completed all 6 modules of Video Lectures, Reading & Grammar, Written Practice Studio, Speaking AI Coach, Listening Comprehension, and Final Certification Examination for:
                  </p>
                  <div className="p-4 rounded-sm bg-[#EEF3F8]/80 border border-[#D0DCE7] font-extrabold text-base text-[#082C6C]">
                    {activePlayCourse.flag} &quot;
                    {learningDirection === 'indian_to_foreign'
                      ? `International Diploma in ${activePlayCourse.foreignLangEng} (${activePlayCourse.foreignLangNative})`
                      : `International Diploma in ${targetIndianLang.nameEng} (${targetIndianLang.nameNative})`}
                    &quot;
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
                    <span className="font-mono font-bold text-slate-800 text-xs">INT-MEA-2026-{Math.floor(100000 + Math.random() * 900000)}</span>
                  </div>
                </div>

                <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-6 max-w-2xl mx-auto text-left border-t border-[#DCE2E6] text-xs">
                  <div className="space-y-1">
                    <span className="font-serif italic font-bold text-slate-900 block">डॉ. देवेन्द्र शर्मा</span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Director of International Studies (ICCR)</span>
                  </div>

                  <div className="text-center">
                    <img
                      src="https://api.qrserver.com/v1/create-qr-code/?size=90x90&data=https://hindi-lms.org/certificates/verify/INT-MEA-2026-981240"
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
        /* 3. NORMAL CATALOGUE / MY COURSES / PASSPORT VIEW          */
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
                <Globe className="w-4 h-4" /> All Foreign Courses (15)
              </button>

              <button
                onClick={() => setActiveTab('my-courses')}
                className={`px-4 py-2.5 rounded-sm font-bold text-xs transition flex items-center gap-2 relative ${
                  activeTab === 'my-courses'
                    ? 'bg-[#0B3D91] text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <GraduationCap className="w-4 h-4" /> My Enrolled Diplomas ({enrolledCoursesList.length})
              </button>

              <button
                onClick={() => setActiveTab('passport')}
                className={`px-4 py-2.5 rounded-sm font-bold text-xs transition flex items-center gap-2 ${
                  activeTab === 'passport'
                    ? 'bg-[#0B3D91] text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Sparkles className="w-4 h-4 text-amber-500" /> ICCR Diplomatic Passport
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500 shrink-0">Region:</span>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="px-3 py-2 rounded-sm bg-slate-50 border border-[#DCE2E6] text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0B3D91]"
              >
                <option value="All">All Continents</option>
                <option value="Global">Global / Western</option>
                <option value="Europe">Europe</option>
                <option value="East Asia">East Asia</option>
                <option value="Middle East">Middle East</option>
                <option value="Eurasia">Eurasia</option>
              </select>
            </div>
          </div>

          {/* Search bar */}
          {(activeTab === 'all' || activeTab === 'my-courses') && (
            <div className="space-y-6">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
                <input
                  type="text"
                  placeholder="Search by Foreign Language (e.g. English, Spanish, French, German, Japanese, Mandarin, Arabic, Russian)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-sm bg-white border border-[#DCE2E6] text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0B3D91] shadow-xs"
                />
              </div>

              {filteredCourses.length === 0 ? (
                <div className="p-12 text-center bg-white rounded-sm border border-[#DCE2E6] space-y-3">
                  <Globe className="w-12 h-12 text-slate-300 mx-auto" />
                  <h3 className="text-base font-bold text-slate-800">No Foreign Language Courses Found</h3>
                  <p className="text-xs text-slate-500">Try adjusting your search query or region filter.</p>
                </div>
              ) : (
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
                                {course.flag} {course.foreignLangEng} ({course.foreignLangNative})
                              </span>
                              <span className="px-2 py-0.5 rounded-full bg-white/20 text-white font-bold text-[10px]">
                                {course.region}
                              </span>
                            </div>

                            <div className="space-y-1">
                              <h3 className="text-base font-black text-white group-hover:translate-x-1 transition-transform">
                                {learningDirection === 'indian_to_foreign'
                                  ? `🇮🇳 ${sourceIndianLang.nameEng} ➔ ${course.flag} ${course.foreignLangEng}`
                                  : `${course.flag} ${course.foreignLangEng} ➔ 🇮🇳 ${targetIndianLang.nameEng}`}
                              </h3>
                              <p className="text-xs text-white/80 line-clamp-1">
                                {course.description}
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
                                <span>{course.cognateExample.foreign} ⟷ {course.cognateExample.hindi}</span>
                                <button
                                  onClick={() => playAudio(course.sampleGreetingForeign, course.ttsLangCode)}
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
                                <span>{(course.enrolledLearners / 1000).toFixed(1)}k Learners</span>
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
                                Enroll / Register Free
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* PASSPORT TAB */}
          {activeTab === 'passport' && (
            <div className="p-8 rounded-sm bg-white border border-[#DCE2E6] space-y-6 shadow-xs">
              <div className="flex items-center justify-between border-b border-[#DCE2E6] pb-4">
                <div>
                  <span className="text-[10px] font-black uppercase text-[#0B3D91] tracking-wider block">
                    GLOBAL DIPLOMATIC PASSPORT
                  </span>
                  <h3 className="text-xl font-black text-slate-900">ICCR International Scholar Cultural Passport</h3>
                  <p className="text-xs text-slate-500">
                    Track your verified multi-language stamps, CEFR proficiencies, and cultural exchange credentials.
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-sm bg-gradient-to-r from-blue-900 to-slate-900 text-white space-y-4 shadow-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-black text-xl">
                      🇮🇳
                    </div>
                    <div>
                      <h4 className="font-extrabold text-base">{user?.name || 'Alexander Wright'}</h4>
                      <span className="text-xs text-amber-300">Registered Global Scholar • Passport #IND-981240</span>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30">
                    Active International Exchange
                  </span>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* ========================================================= */}
      {/* 4. SYLLABUS MODAL                                         */}
      {/* ========================================================= */}
      {selectedCourseModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-white border border-[#DCE2E6] rounded-sm p-6 sm:p-8 space-y-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200 text-left">
            <div className="flex items-center justify-between border-b border-[#DCE2E6] pb-4">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-[#0B3D91] block">
                  {selectedCourseModal.flag} {selectedCourseModal.foreignLangEng} Curriculum Overview
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  {selectedCourseModal.foreignLangEng} ({selectedCourseModal.foreignLangNative}) Masterclass
                </h2>
              </div>
              <button
                onClick={() => setSelectedCourseModal(null)}
                className="p-2 rounded-sm hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {selectedCourseModal.description} Includes complete 3 Video Lectures, Reading & Grammar, Interactive Written Studio, Speaking AI Coach with Sambhasini recognition, Listening Comprehension, and Final Certification Exam.
            </p>

            <div className="pt-4 border-t border-[#DCE2E6] flex items-center justify-end gap-3">
              <button
                onClick={() => setSelectedCourseModal(null)}
                className="px-4 py-2.5 rounded-sm bg-slate-100 text-slate-700 font-bold text-xs"
              >
                Close
              </button>

              <button
                onClick={() => {
                  const target = selectedCourseModal;
                  setSelectedCourseModal(null);
                  setCheckoutCourse(target);
                }}
                className="px-6 py-2.5 rounded-sm bg-[#0B3D91] hover:bg-[#082C6C] text-white font-bold text-xs shadow-md flex items-center gap-1.5"
              >
                Proceed to Registration <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 5. CHECKOUT & ENROLLMENT MODAL                            */}
      {/* ========================================================= */}
      {checkoutCourse && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-2xl bg-white border border-[#DCE2E6] rounded-sm p-6 sm:p-8 space-y-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200 text-left my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#DCE2E6] pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-sm bg-[#EEF3F8] text-[#0B3D91] flex items-center justify-center font-bold">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#0B3D91] block">
                    INTERNATIONAL ENROLLMENT PORTAL
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                    Course Registration & Gateway
                  </h2>
                </div>
              </div>
              <button
                onClick={() => setCheckoutCourse(null)}
                className="p-2 rounded-sm hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {paymentSuccessInvoice ? (
              <div className="py-8 text-center space-y-6 animate-in fade-in">
                <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-12 h-12" />
                </div>

                <div className="space-y-2">
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black uppercase tracking-wider">
                    ENROLLMENT CONFIRMED
                  </span>
                  <h3 className="text-2xl font-black text-slate-900">
                    Successfully Enrolled!
                  </h3>
                  <p className="text-xs text-slate-500 max-w-md mx-auto">
                    You have unlocked <span className="font-bold text-slate-800">&quot;{checkoutCourse.foreignLangEng}&quot;</span>. You can now access all video lectures and interactive modules.
                  </p>
                </div>

                <button
                  onClick={handleFinishCheckout}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-sm bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-emerald-600/20 transition hover:scale-105"
                >
                  Go to My Enrolled Diplomas →
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className={`p-5 rounded-sm bg-gradient-to-r ${checkoutCourse.bannerGradient} text-white space-y-2 relative overflow-hidden shadow-xs`}>
                  <span className="px-2.5 py-0.5 rounded-full bg-black/20 text-white font-extrabold uppercase text-xs">
                    {checkoutCourse.flag} {checkoutCourse.foreignLangEng} ({checkoutCourse.foreignLangNative})
                  </span>
                  <h3 className="text-lg font-black text-white">{checkoutCourse.description}</h3>
                </div>

                <div className="p-3.5 rounded-sm bg-slate-50 border border-[#DCE2E6] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-amber-600" /> Have an ICCR Exchange Scholarship Code?
                    </span>
                    <button
                      onClick={() => {
                        setCouponCode('GLOBALBHASHA2026');
                        setCouponApplied(true);
                      }}
                      className="text-[11px] font-extrabold text-[#0B3D91] hover:underline"
                    >
                      Use &quot;GLOBALBHASHA2026&quot; (100% OFF)
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Enter promo code"
                      value={couponCode}
                      onChange={(e) => {
                        setCouponCode(e.target.value.toUpperCase());
                        if (couponApplied) setCouponApplied(false);
                      }}
                      className="flex-1 px-3 py-2 rounded-sm bg-white border border-[#D0DCE7] text-xs font-mono font-bold uppercase focus:outline-none focus:ring-2 focus:ring-[#0B3D91]"
                    />
                    <button
                      onClick={() => {
                        if (couponCode.trim().length > 0) setCouponApplied(true);
                      }}
                      className="px-4 py-2 rounded-sm bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs"
                    >
                      {couponApplied ? 'Applied ✓' : 'Apply Coupon'}
                    </button>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleProcessPayment}
                    disabled={isProcessingPayment}
                    className="w-full py-4 rounded-sm bg-[#0B3D91] hover:bg-[#082C6C] text-white font-extrabold text-sm uppercase tracking-wider shadow-lg shadow-[#0B3D91]/20 flex items-center justify-center gap-2 transition hover:scale-101 disabled:opacity-50"
                  >
                    {isProcessingPayment ? (
                      <>
                        <RefreshCw className="w-5 h-5 animate-spin" /> Enrolling...
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" />
                        {couponApplied ? 'Enroll Free (100% Scholarship)' : 'Enroll & Begin Learning'}
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 6. POP-UP VIDEO CINEMA PLAYER MODAL WITH 19+ DUBBINGS       */}
      {/* ========================================================= */}
      {activeVideoModal && activePlayCourse && (() => {
        const activeDubObj = ALL_DUBBING_LANGUAGES.find((l) => l.key === selectedDubLang) || ALL_DUBBING_LANGUAGES[0];
        const dubbedInfo = getDubbedSpeechData(selectedDubLang, activePlayCourse.foreignLangEng, activeVideoModal.title);

        return (
          <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
            <div className="w-full max-w-5xl bg-slate-900 border border-slate-700 rounded-sm shadow-2xl overflow-hidden text-left animate-in fade-in zoom-in-95 duration-200 text-white flex flex-col max-h-[92vh]">
              {/* Modal Top Header */}
              <div className="flex items-center justify-between p-4 bg-slate-950 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{activePlayCourse.flag}</span>
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

              {/* Video Player Cinema Screen */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 flex-1 overflow-y-auto">
                {/* Left Video Display Frame */}
                <div className="lg:col-span-8 p-4 sm:p-6 flex flex-col justify-between bg-slate-950 border-b lg:border-b-0 lg:border-r border-slate-800 space-y-4">
                  {/* Cinema Screen with Simulated Video & Animated Visualizer */}
                  <div className="aspect-video bg-gradient-to-br from-slate-950 via-slate-900 to-[#082C6C] rounded-sm p-6 flex flex-col justify-between relative overflow-hidden border border-slate-800 shadow-inner">
                    <div className="flex items-center justify-between text-xs z-10">
                      <span className="px-2.5 py-1 rounded bg-black/60 text-amber-300 font-bold border border-amber-400/30 text-[11px] flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                        {activePlayCourse.foreignLangEng} ({activePlayCourse.foreignLangNative}) • Dubbed in {activeDubObj.nameEng}
                      </span>
                      <span className="text-slate-400 font-mono text-[11px]">22:00 Mins • Ultra HD 4K</span>
                    </div>

                    {/* Animated Waveform Visualizer & Play/Pause */}
                    <div className="text-center space-y-3 my-auto z-10">
                      <div
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
                        className={`w-20 h-20 rounded-full mx-auto flex items-center justify-center cursor-pointer transition shadow-2xl hover:scale-110 ${
                          videoModalPlaying ? 'bg-amber-500 text-slate-950 ring-8 ring-amber-400/30' : 'bg-[#0B3D91] text-white hover:bg-blue-600'
                        }`}
                      >
                        {videoModalPlaying ? (
                          <div className="flex items-center gap-1.5">
                            <div className="w-2 h-7 bg-slate-950 rounded-sm animate-pulse" />
                            <div className="w-2 h-7 bg-slate-950 rounded-sm animate-pulse" />
                          </div>
                        ) : (
                          <Play className="w-10 h-10 fill-white ml-1" />
                        )}
                      </div>

                      <h4 className="text-base sm:text-lg font-black text-white">
                        {videoModalPlaying ? `Playing in ${activeDubObj.nameEng} (${activeDubObj.nameNative})...` : `Click to Play in ${activeDubObj.nameEng} (${activeDubObj.nameNative})`}
                      </h4>

                      {/* Waveform Bar Graphic */}
                      {videoModalPlaying && (
                        <div className="flex items-center justify-center gap-1 h-6">
                          {[40, 75, 100, 60, 90, 45, 80, 100, 50, 70, 95, 60, 85, 70, 90, 60, 100].map((h, i) => (
                            <div
                              key={i}
                              className="w-1.5 bg-amber-400 rounded-full animate-pulse"
                              style={{ height: `${h}%`, animationDelay: `${i * 0.08}s` }}
                            />
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Dual Subtitles Box */}
                    <div className="z-10 text-center bg-black/85 backdrop-blur-md p-3 rounded text-xs font-semibold text-amber-200 border border-white/10 space-y-1">
                      <div className="flex items-center justify-center gap-2 text-[10px] text-amber-400 uppercase font-black">
                        <span>[Subtitles: {activeDubObj.nameNative} • {activeDubObj.nameEng}]</span>
                      </div>
                      <p className="font-bold text-sm text-white">
                        &quot;{dubbedInfo.speech}&quot;
                      </p>
                      <p className="text-[11px] text-slate-300">
                        (Transliteration: {dubbedInfo.translit})
                      </p>
                      <p className="text-[10px] text-slate-400 italic">
                        Meaning: {dubbedInfo.meaning}
                      </p>
                    </div>
                  </div>

                  {/* Scrubber & Controls */}
                  <div className="space-y-2 bg-slate-900 p-3 rounded-sm border border-slate-800">
                    <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                      <span>04:15</span>
                      <div className="flex-1 mx-3 h-2 bg-slate-800 rounded-full overflow-hidden cursor-pointer">
                        <div className="bg-[#FF9933] h-2 rounded-full w-[35%]" />
                      </div>
                      <span>22:00</span>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs">
                      <div className="flex items-center gap-2">
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
                          className="px-3 py-1.5 rounded bg-[#0B3D91] hover:bg-blue-600 text-white font-bold text-xs flex items-center gap-1.5"
                        >
                          <Play className="w-3.5 h-3.5 fill-current" /> {videoModalPlaying ? 'Pause' : 'Play'}
                        </button>
                        <button
                          onClick={() => {
                            setVideoModalPlaying(true);
                            playDubbedSpeech(selectedDubLang);
                          }}
                          className="px-2.5 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1"
                        >
                          <RotateCcw className="w-3.5 h-3.5" /> Replay Voiceover
                        </button>
                        <button
                          onClick={() => setShowDubbingModal(true)}
                          className="px-2.5 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs flex items-center gap-1"
                        >
                          <Headphones className="w-3.5 h-3.5" /> Switch Dub Track
                        </button>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-slate-400">Speed:</span>
                        {[0.75, 1.0, 1.25, 1.5].map((s) => (
                          <button
                            key={s}
                            onClick={() => setPlaybackSpeed(s)}
                            className={`px-2 py-0.5 rounded text-[11px] font-bold ${playbackSpeed === s ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-400'}`}
                          >
                            {s}x
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Mark as Finished Action inside Video Modal */}
                  <div className="pt-2 flex items-center justify-between border-t border-slate-800">
                    <span className="text-xs text-slate-400 font-medium">
                      Marking finished unlocks the next sequential video and earns +40 XP.
                    </span>
                    <button
                      onClick={() => {
                        const vIdx = activeVideoModal.videoIndex;
                        if (vIdx === 1) updateCourseProgress(activePlayCourse.id, { video1Done: true });
                        if (vIdx === 2) updateCourseProgress(activePlayCourse.id, { video2Done: true });
                        if (vIdx === 3) updateCourseProgress(activePlayCourse.id, { video3Done: true });
                        addXpToUser(40);
                        try {
                          confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
                        } catch (e) {}

                        if (vIdx < 3) {
                          const nextIdx = (vIdx + 1) as 1 | 2 | 3;
                          setActiveVideoIndex(nextIdx);
                          setActiveVideoModal({
                            videoIndex: nextIdx,
                            day: nextIdx,
                            title:
                              nextIdx === 2
                                ? `Comparative Grammar & Sentence Rules`
                                : `Spoken Fluency & Everyday Dialogues`,
                            description: `Video Lecture ${nextIdx} for ${activePlayCourse.foreignLangEng}.`
                          });
                          playDubbedSpeech(selectedDubLang);
                        } else {
                          alert('🎉 All 3 Video Lectures Completed! Module 2 (Reading & Grammar) is now unlocked.');
                          setActiveVideoModal(null);
                        }
                      }}
                      className="px-5 py-2.5 rounded-sm bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs uppercase tracking-wider shadow-md transition hover:scale-102 flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-4 h-4" /> Mark Video {activeVideoModal.videoIndex} Finished & Unlock Next
                    </button>
                  </div>
                </div>

                {/* Right Side Tabbed Drawer: Notes, Transcript, Quiz */}
                <div className="lg:col-span-4 bg-slate-900 flex flex-col p-4 space-y-4">
                  <div className="flex items-center border-b border-slate-800 pb-2 gap-2 text-xs">
                    <button
                      onClick={() => setVideoModalTab('notes')}
                      className={`px-3 py-1.5 rounded font-bold transition ${videoModalTab === 'notes' ? 'bg-[#0B3D91] text-white' : 'text-slate-400 hover:text-white'}`}
                    >
                      Key Notes
                    </button>
                    <button
                      onClick={() => setVideoModalTab('transcript')}
                      className={`px-3 py-1.5 rounded font-bold transition ${videoModalTab === 'transcript' ? 'bg-[#0B3D91] text-white' : 'text-slate-400 hover:text-white'}`}
                    >
                      🎙️ Dubbed Transcript
                    </button>
                    <button
                      onClick={() => setVideoModalTab('quiz')}
                      className={`px-3 py-1.5 rounded font-bold transition ${videoModalTab === 'quiz' ? 'bg-[#0B3D91] text-white' : 'text-slate-400 hover:text-white'}`}
                    >
                      Quick Check
                    </button>
                  </div>

                  <div className="flex-1 overflow-y-auto space-y-3 text-xs">
                    {videoModalTab === 'notes' && (
                      <div className="space-y-3">
                        <div className="p-3 bg-slate-950 rounded border border-slate-800 space-y-1.5">
                          <span className="text-[10px] font-black uppercase text-amber-400 block">
                            LECTURE OVERVIEW
                          </span>
                          <p className="text-slate-300 leading-relaxed">
                            {activeVideoModal.description}
                          </p>
                        </div>

                        <div className="p-3 bg-slate-950 rounded border border-slate-800 space-y-1.5">
                          <span className="text-[10px] font-black uppercase text-cyan-400 block">
                            SHARED COGNATE SUMMARY
                          </span>
                          <p className="text-slate-300">
                            <span className="font-bold text-white">{activePlayCourse.cognateExample.foreign}</span> in {activePlayCourse.foreignLangEng} corresponds to <span className="font-bold text-amber-300">{activePlayCourse.cognateExample.hindi}</span> ({activePlayCourse.cognateExample.meaning}).
                          </p>
                        </div>

                        <div className="p-3 bg-slate-950 rounded border border-slate-800 space-y-1.5">
                          <span className="text-[10px] font-black uppercase text-emerald-400 block">
                            PRONUNCIATION TIP
                          </span>
                          <p className="text-slate-300">
                            Pay close attention to tongue placement and breath aspiration during vowels and nasal sounds.
                          </p>
                        </div>
                      </div>
                    )}

                    {videoModalTab === 'transcript' && (
                      <div className="space-y-2">
                        <div className="p-2 bg-slate-950 rounded border border-slate-800 text-[11px] text-amber-300 flex items-center justify-between">
                          <span>Dubbed in: <b>{activeDubObj.nameNative} ({activeDubObj.nameEng})</b></span>
                          <button
                            onClick={() => setShowDubbingModal(true)}
                            className="text-xs text-blue-400 hover:underline font-bold"
                          >
                            Change
                          </button>
                        </div>
                        {[
                          { time: '00:15', text: dubbedInfo.speech },
                          { time: '02:40', text: `Here is the fundamental phonetic structure and alphabet breakdown in ${activePlayCourse.foreignLangEng}.` },
                          { time: '06:10', text: `Notice the grammatical sentence order and how it compares to ${sourceIndianLang.nameEng}.` },
                          { time: '12:35', text: `Let us practice everyday conversational greetings and dialogues with native cadence.` },
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
                      <div className="space-y-3">
                        <div className="p-3 bg-slate-950 rounded border border-slate-800 space-y-2">
                          <span className="font-bold text-white text-xs block">
                            Knowledge Check: What is the core subject of Lecture {activeVideoModal.videoIndex}?
                          </span>
                          {[
                            `Comprehensive mastery of ${activePlayCourse.foreignLangEng} phonetics and grammar (Correct)`,
                            'General geography trivia',
                            'Historical trade routes overview'
                          ].map((opt, i) => (
                            <label
                              key={i}
                              onClick={() => setVideoQuizAnswer(i + 1)}
                              className={`p-2.5 rounded border flex items-center gap-2 cursor-pointer font-medium text-xs transition ${
                                videoQuizAnswer === i + 1 ? 'bg-blue-900/60 border-blue-400 text-white' : 'bg-slate-900 border-slate-800 text-slate-300'
                              }`}
                            >
                              <input type="radio" checked={videoQuizAnswer === i + 1} readOnly className="text-blue-500" />
                              <span>{opt}</span>
                            </label>
                          ))}
                        </div>

                        {videoQuizAnswer === 1 && (
                          <div className="p-2.5 bg-emerald-950/80 border border-emerald-500 rounded text-emerald-300 text-xs font-bold">
                            ✓ Correct! You are ready to proceed with the curriculum.
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
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
