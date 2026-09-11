'use client';

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Play,
  Video,
  Sparkles,
  CheckCircle2,
  Clock,
  Eye,
  BookOpen,
  Search,
  Volume2,
  Award,
  Share2,
  Download,
  ThumbsUp,
  Bookmark,
  Globe,
  Filter,
  Layers,
  MessageSquare,
  X,
  VolumeX,
  Maximize2,
  Flame,
  Check,
  RotateCcw,
  Mic,
  Headphones,
  Radio
} from 'lucide-react';

export interface DubbingLanguage {
  key: string;
  nameEng: string;
  nameNative: string;
  flag: string;
  ttsCode: string;
}

export const ALL_DUBBING_LANGUAGES: DubbingLanguage[] = [
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

interface FreeVideoItem {
  id: string;
  titleHindi: string;
  titleEng: string;
  targetLang: string;
  targetLangNative: string;
  flag: string;
  category: 'Devanagari Script' | 'SOV Grammar' | 'Spoken Conversation' | 'Global Language Bridge' | 'Regional Accent' | 'Literature & Heritage';
  languageFamily: 'Indian' | 'Global' | 'Bilingual';
  duration: string;
  views: string;
  instructor: string;
  instructorTitle: string;
  level: 'Beginner' | 'Elementary' | 'Intermediate' | 'Masterclass';
  thumbnailGradient: string;
  description: string;
  dubbingMap: Record<string, { speech: string; translit: string }>;
  transcriptNotes: string[];
  quizQuestion: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

const FREE_VIDEOS_CATALOG: FreeVideoItem[] = [
  {
    id: 'vid_1',
    titleHindi: 'देवनागरी वर्णमाला, स्वर व उच्चारण गाइड (Devanagari Phonetics)',
    titleEng: 'Master All 52 Devanagari Vowels & Consonants for Beginners',
    targetLang: 'Hindi',
    targetLangNative: 'हिंदी',
    flag: '🇮🇳',
    category: 'Devanagari Script',
    languageFamily: 'Indian',
    duration: '22 Mins',
    views: '148k',
    instructor: 'Dr. Devendra Sharma',
    instructorTitle: 'Senior Faculty of Phonetics, CIIL',
    level: 'Beginner',
    thumbnailGradient: 'from-[#0B3D91] to-slate-900',
    description: 'Comprehensive phonetics breakdown of vowels, consonants, nasalized anusvara, and stroke order with comparative sound rules for Dravidian and Indo-Aryan learners.',
    dubbingMap: {
      hi: {
        speech: 'नमस्ते! देवनागरी लिपि और शुद्ध स्वर उच्चारण कक्षा में आपका स्वागत है।',
        translit: 'Namaste! Devanagari lipi aur shuddh swar uccharan kaksha mein aapka swagat hai.'
      },
      en: {
        speech: 'Welcome! In this masterclass, we will learn Devanagari phonetics and correct vowel articulation.',
        translit: 'Welcome! Master Devanagari script and pronunciation with comparative notes.'
      },
      fa: {
        speech: 'سلام و درود! در این دوره آموزشی، ما فونتیک و الفبای دیواناگری را یاد می‌گیریم.',
        translit: 'Salam o Dorood! Dar in doreye amoozeshi, ma phonetike Devanagari ra yad migirim.'
      },
      es: {
        speech: '¡Hola y bienvenidos! En esta clase magistral aprenderemos la fonética y el alfabeto devanagari.',
        translit: 'Hola y bienvenidos! Aprende la fonetica del alfabeto devanagari.'
      },
      fr: {
        speech: 'Bonjour et bienvenue! Dans ce cours, nous allons explorer la phonétique et les voyelles devanagari.',
        translit: 'Bonjour et bienvenue! Decouvrez la phonetique devanagari.'
      },
      de: {
        speech: 'Guten Tag und herzlich willkommen! In diesem Kurs lernen wir die Phonetik der Devanagari-Schrift.',
        translit: 'Guten Tag! Lernen Sie die Aussprache der Devanagari-Vokale.'
      },
      ja: {
        speech: 'こんにちは！このマスタークラスでは、デーヴァナーガリー文字の発音と母音を学びます。',
        translit: 'Konnichiwa! Kono masutakurasu dewa Devanagari moji no hatsuon to boin o manabimasu.'
      },
      ru: {
        speech: 'Здравствуйте и добро пожаловать! В этом уроке мы изучим фонетику и гласные деванагари.',
        translit: 'Zdravstvuyte! V etom uroke my izuchim fonetiku devanagari.'
      },
      ar: {
        speech: 'مرحباً بكم! في هذه الدورة سنتعلم الصوتيات وحروف الديفاناغاري بالتفصيل.',
        translit: 'Marhaban bikum! Sanataallam sawtiyat Devanagari.'
      },
      ko: {
        speech: '안녕하세요! 이번 마스터클래스에서는 데바나가리 문자의 발음과 모음을 배웁니다.',
        translit: 'Annyeonghaseyo! Devanagari munja bal-eum-eul baeubnida.'
      },
      zh: {
        speech: '你好，欢迎来到梵文天城体天城文语音与字母发音精讲课程。',
        translit: 'Ni hao! Huanying laidao Tianchengti yuyin ke.'
      },
      ta: {
        speech: 'வணக்கம்! தேவநாகரி எழுத்துக்களையும் அதன் சரியான ஒலிப்பியல் முறைகளையும் கற்போம்.',
        translit: 'Vanakkam! Devanagari ezhuthukkalaiyum adhan sariyana olippiyal muraigalaiyum karpom.'
      },
      te: {
        speech: 'నమస్కారం! దేవనాగరి అక్షరాలు మరియు వాటి సరైన ఉచ్చారణను ఇక్కడ నేర్చుకుందాం.',
        translit: 'Namaskaram! Devanagari aksharalu mariyu vatiki sariyaina uccharana nerchukundam.'
      },
      bn: {
        speech: 'নমস্কার! দেবনাগরী লিপি এবং সঠিক স্বরবর্ণ উচ্চারণের ক্লাসে আপনাকে স্বাগত জানাই।',
        translit: 'Nomoshkar! Debnagori lipi ebong sothik shworoborno uccharoner klase swagoto.'
      },
      mr: {
        speech: 'नमस्कार! देवनागरी लिपी आणि शुद्ध स्वर उच्चारणाच्या या सत्रात आपले स्वागत आहे.',
        translit: 'Namaskar! Devanagari lipi aani shuddh swar uccharanache swagat aahe.'
      },
      gu: {
        speech: 'નમસ્તે! દેવનાગરી લિપિ અને શુદ્ધ સ્વર ઉચ્ચારણ ક્લાસમાં આપનું હાર્દિક સ્વાગત છે.',
        translit: 'Namaste! Devanagari lipi ane shuddh swar uccharan class ma aapnu swagat chhe.'
      },
      pa: {
        speech: 'ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ! ਦੇਵਨਾਗਰੀ ਲਿਪੀ ਅਤੇ ਸਵਰ ਉਚਾਰਨ ਦੀ ਕਲਾਸ ਵਿੱਚ ਤੁਹਾਡਾ ਸਵਾਗਤ ਹੈ।',
        translit: 'Sat Sri Akal! Devanagari lipi te swar uccharan di class vich swagat hai.'
      },
      ml: {
        speech: 'നമസ്കാരം! ദേവനാഗരി ലിപിയും അതിന്റെ ശുദ്ധമായ ഉച്ചാരണവും ഈ ക്ലാസ്സിൽ പഠിക്കാം.',
        translit: 'Namaskaram! Devanagari lipiyum athinte shuddhamaya uccharanavum padikkam.'
      },
      sa: {
        speech: 'नमो नमः! देवनागरीलिपेः शुद्धस्वरोच्चारणकक्ष्यायां भवतां सर्वेषां स्वागतम्।',
        translit: 'Namo Namah! Devanagarilipeh shuddhasvaroccharanakakshyayam bhavatam swogatam.'
      }
    },
    transcriptNotes: [
      'Pure Vowels: 11 Standard vowels (अ, आ, इ, ई, उ, ऊ, ऋ, ए, ऐ, ओ, औ).',
      'Consonants: 33 Standard consonants grouped by place of articulation (क-वर्ग to प-वर्ग).',
      'Aspirated vs Unaspirated: Key contrast between क (k) and ख (kh).'
    ],
    quizQuestion: {
      question: 'How many standard pure vowels (स्वर) are there in Devanagari Hindi?',
      options: ['11 Vowels (११ स्वर)', '5 Vowels', '26 Vowels'],
      correctIndex: 0,
      explanation: 'Standard Devanagari Hindi has 11 pure vowel phonemes.'
    }
  },
  {
    id: 'vid_2',
    titleHindi: 'फारसी से हिंदी व्याकरण सेतु (Persian ➔ Hindi Comparative Masterclass)',
    titleEng: 'Persian (فارسی) for Hindi Speakers — Phonetics & Shared Indo-Iranian Roots',
    targetLang: 'Persian (Farsi)',
    targetLangNative: 'فارسی',
    flag: '🇮🇷',
    category: 'Global Language Bridge',
    languageFamily: 'Global',
    duration: '25 Mins',
    views: '132k',
    instructor: 'Prof. Javad Tehrani & Dr. Devendra',
    instructorTitle: 'Director of Indo-Iranian Linguistics',
    level: 'Beginner',
    thumbnailGradient: 'from-amber-600 to-slate-950',
    description: 'Explore the historical and syntactic kinship between Persian and Hindi: shared Sanskrit/Avestan cognates, SOV word order, Nastaliq script guide, and courteous conversational registers.',
    dubbingMap: {
      fa: {
        speech: 'سلام و درود! به دوره آموزش زبان‌های بین‌المللی و پیوند زبان‌های هندی و فارسی خوش آمدید.',
        translit: 'Salam o Dorood! Be doreye amoozesh-e zabanhaye baynolmelali khosh amadid.'
      },
      hi: {
        speech: 'नमस्ते! फारसी और हिंदी के साझा इंडो-ईरानी व्याकरण और शब्दकोश सेतु में आपका स्वागत है।',
        translit: 'Namaste! Farsi aur Hindi ke saajha Indo-Iranian vyakaran setu mein aapka swagat hai.'
      },
      en: {
        speech: 'Welcome! In this masterclass, we explore the shared Indo-Iranian syntactic roots between Persian and Hindi.',
        translit: 'Welcome! Explore shared Indo-Iranian syntactic roots and vocabulary.'
      },
      es: {
        speech: '¡Bienvenidos! Descubriremos las raíces lingüísticas compartidas entre el persa y el hindi.',
        translit: 'Bienvenidos! Descubre las raices entre el persa y el hindi.'
      },
      fr: {
        speech: 'Bienvenue! Découvrez les liens étymologiques et syntaxiques profonds entre le persan et le hindi.',
        translit: 'Bienvenue! Decouvrez les liens profonds entre le persan et le hindi.'
      },
      de: {
        speech: 'Herzlich willkommen! Entdecken Sie die gemeinsamen indoiranischen Wurzeln von Persisch und Hindi.',
        translit: 'Willkommen! Entdecken Sie gemeinsame indoiranische Wurzeln.'
      },
      ja: {
        speech: 'ようこそ！ペルシャ語とヒンディー語の共通するインド・イラン語派のルーツを学びます。',
        translit: 'Yokoso! Perushia-go to Hindi-go no kyotsu suru Indo-Iran goha no rutsu o manabimasu.'
      },
      ru: {
        speech: 'Добро пожаловать! Мы исследуем общие индоиранские корни персидского языка и хинди.',
        translit: 'Dobro pozhalovat! My issleduyem obshchiye korni farsi i khindi.'
      },
      ar: {
        speech: 'مرحباً بكم! نستكشف في هذا الدرس الروابط اللغوية والنحوية المشتركة بين الفارسية والهندية.',
        translit: 'Marhaban bikum! Nastakshif ar-rawabit bayna al-Farisiya wal-Hindiya.'
      },
      ta: {
        speech: 'வணக்கம்! பாரசீக மொழி மற்றும் இந்தி மொழியின் பொதுவான இலக்கண அமைப்பைக் கற்போம்.',
        translit: 'Vanakkam! Paraseega mozhi mattrum Hindi mozhiyin ilakkana amaippai karpom.'
      },
      te: {
        speech: 'స్వాగతం! పర్షియన్ మరియు హిందీ భాషల మధ్య ఉన్న వ్యాకరణ సారూప్యతలను తెలుసుకుందాం.',
        translit: 'Swagatam! Persian mariyu Hindi bhashala madhya vyakarana sarupyatalanu telusukundam.'
      },
      bn: {
        speech: 'স্বাগত! ফারসি এবং হিন্দির ঐতিহাসিক ভাষাতাত্ত্বিক মিলনসূত্র নিয়ে এই বিশেষ ক্লাস।',
        translit: 'Swagoto! Farsi ebong Hindir oitihasik bhashatattik milonsutra.'
      },
      mr: {
        speech: 'स्वागत आहे! पर्शियन आणि हिंदी भाषेतील साम्य आणि व्याकरण नियम आपण येथे समजून घेऊ.',
        translit: 'Swagat aahe! Persian aani Hindi bhashatil samya samjun gheu.'
      },
      gu: {
        speech: 'સ્વાગત છે! ફારસી અને હિન્દી વચ્ચેના સમાન વ્યાકરણ અને શબ્દ ભંડોળનો અભ્યાસ કરીએ.',
        translit: 'Swagat chhe! Farsi ane Hindi vachhena saman vyakaran no abhyas kariye.'
      }
    },
    transcriptNotes: [
      'Word Order: Both Hindi and Persian share SOV (Subject-Object-Verb) sentence syntax.',
      'Shared Cognates: Dost (Friend), Nam (Name), Dil (Heart), Darya (River).',
      'Pronunciation: Epenthetic vowel insertion and soft Persian fricatives (Kh, Gh).'
    ],
    quizQuestion: {
      question: 'Which word order do both Persian and Hindi naturally share?',
      options: ['Subject + Object + Verb (SOV)', 'Subject + Verb + Object (SVO)', 'Verb + Subject + Object (VSO)'],
      correctIndex: 0,
      explanation: 'Both Hindi and Persian naturally place the verb at the end of the sentence (SOV).'
    }
  },
  {
    id: 'vid_3',
    titleHindi: 'हिंदी वाक्य रचना व SOV व्याकरण नियम (Sentence Construction & Cases)',
    titleEng: 'Subject-Object-Verb (SOV) Word Order, Tenses & Postpositional Cases',
    targetLang: 'Hindi',
    targetLangNative: 'हिंदी',
    flag: '🇮🇳',
    category: 'SOV Grammar',
    languageFamily: 'Indian',
    duration: '28 Mins',
    views: '112k',
    instructor: 'Prof. Ananya Sen',
    instructorTitle: 'Professor of Comparative Syntax',
    level: 'Elementary',
    thumbnailGradient: 'from-blue-700 to-indigo-950',
    description: 'Detailed analysis of Subject-Object-Verb word order, postpositions (ने, को, से, में, पर, का/की/के), gender-number agreement, and habitual present tense verb markers.',
    dubbingMap: {
      hi: {
        speech: 'हिंदी में कर्ता, कर्म और क्रिया का क्रम वाक्य रचना का मुख्य आधार है।',
        translit: 'Hindi mein karta, karma aur kriya ka kram vakya rachna ka mukhya aadhar hai.'
      },
      en: {
        speech: 'In Hindi, Subject-Object-Verb order forms the foundation of all sentence construction.',
        translit: 'Subject-Object-Verb syntax is the foundation of Hindi grammar.'
      },
      fa: {
        speech: 'در زبان هندی، ترتیب فاعل، مفعول و فعل، ساختار اصلی جمله را تشکیل می‌دهد.',
        translit: 'Dar zabane Hindi, tartibe fael, mafool va fel sakhtare aslie jomle ast.'
      },
      es: {
        speech: 'En hindi, el orden Sujeto-Objeto-Verbo es la base de toda la estructura de la oración.',
        translit: 'En hindi el orden Sujeto Objeto Verbo es fundamental.'
      },
      fr: {
        speech: 'En hindi, l\'ordre Sujet-Objet-Verbe constitue la structure fondamentale de la phrase.',
        translit: 'En hindi l ordre Sujet Objet Verbe est essentiel.'
      },
      de: {
        speech: 'Im Hindi bildet die Reihenfolge Subjekt-Objekt-Verb das Fundament des Satzbaus.',
        translit: 'Im Hindi bildet Subjekt-Objekt-Verb die Satzstruktur.'
      },
      ja: {
        speech: 'ヒンディー語では、主語・目的語・動詞（SOV）の語順が文構造の基本となります。',
        translit: 'Hindi-go dewa shugo, mokutekigo, doshi (SOV) no gojun ga kiso to narimasu.'
      },
      ru: {
        speech: 'В хинди порядок «Подлежащее — Дополнение — Сказуемое» (SOV) является основой грамматики.',
        translit: 'V khindi poryadok SOV yavlyayetsya osnovoy grammatiki.'
      },
      ta: {
        speech: 'இந்தியில் எழுவாய், செயப்படுபொருள், பயனிலை (SOV) என்ற வரிசையே முதன்மையானது.',
        translit: 'Hindiyil ezhuvai, seyappaduporul, payanilai (SOV) varisaiye mudhanmaiyanadhu.'
      },
      te: {
        speech: 'హిందీలో కర్త, కర్మ మరియు క్రియ (SOV) క్రమమే వాక్య నిర్మాణానికి మూలాధారం.',
        translit: 'Hindilo karta, karma mariyu kriya (SOV) kramame vakya nirmananiki muladharam.'
      },
      bn: {
        speech: 'হিন্দিতে কর্তা, কর্ম এবং ক্রিয়া (SOV) হলো বাক্য গঠনের প্রধান নিয়ম।',
        translit: 'Hindite korta, kormo ebong kriya holo bakya gathoner prodhan niom.'
      }
    },
    transcriptNotes: [
      'Subject Concordance: Verbs agree with gender and number of the subject (जाता है vs जाती है).',
      'Postpositions: Hindi uses postpositions after nouns instead of western prepositions.',
      'Negation: Place नहीं immediately before the auxiliary verb.'
    ],
    quizQuestion: {
      question: 'What is the correct position of Hindi postpositions (कारक चिह्न)?',
      options: ['Placed after the noun (Postpositional)', 'Placed before the noun (Prepositional)', 'At the beginning of sentence'],
      correctIndex: 0,
      explanation: 'Hindi uses postpositions (परसर्ग) that bind immediately after the noun.'
    }
  },
  {
    id: 'vid_4',
    titleHindi: 'तमिल व तेलुगु भाषियों के लिए त्वरित हिंदी (Dravidian ➔ Hindi Pathway)',
    titleEng: 'Learn Hindi via Tamil (தமிழ்) & Telugu (తెలుగు) — Shared SOV & Loanwords',
    targetLang: 'Tamil / Telugu',
    targetLangNative: 'தமிழ் / తెలుగు',
    flag: '🇮🇳',
    category: 'Regional Accent',
    languageFamily: 'Indian',
    duration: '26 Mins',
    views: '185k',
    instructor: 'Dr. K. Swaminathan',
    instructorTitle: 'Chair of Dravidian Linguistics, Madurai',
    level: 'Beginner',
    thumbnailGradient: 'from-orange-600 to-amber-950',
    description: 'Leverage identical Dravidian sentence structure (SOV) and thousands of shared Tatsama Sanskrit loanwords to become fluent in Hindi within weeks.',
    dubbingMap: {
      ta: {
        speech: 'வணக்கம்! தமிழ் வாக்கிய அமைப்பைப் பயன்படுத்தி இந்தி மொழியை மிக எளிதாகப் பேசலாம்.',
        translit: 'Vanakkam! Tamil vaakkiya amaippai payanpaduthi Hindi mozhiyai elidhaaga pesalam.'
      },
      te: {
        speech: 'నమస్కారం! తెలుగు వ్యాకరణ సూత్రాల ఆధారంగా హిందీ సులభంగా నేర్చుకోవచ్చు.',
        translit: 'Namaskaram! Telugu vyakarana sutrala aadharanga Hindi sulabhama ga nerchukovachu.'
      },
      hi: {
        speech: 'नमस्ते! द्रविड़ भाषा परिवार और हिंदी के वाक्य विन्यास में १००% गहरा सामंजस्य है।',
        translit: 'Namaste! Dravidian bhasha parivar aur Hindi ke vakya vinyas mein 100% samanjasya hai.'
      },
      en: {
        speech: 'Tamil and Telugu speakers can leverage identical SOV syntax to master spoken Hindi effortlessly.',
        translit: 'Leverage Dravidian SOV syntax to master Hindi effortlessly.'
      },
      fa: {
        speech: 'سخنرانان تامیل و تلوگو می‌توانند به راحتی با استفاده از دستور زبان مشابه፣ هندی را یاد بگیرند.',
        translit: 'Sokhanranane Tamil va Telugu mitavanand Hindi ra asan yad begirand.'
      },
      mr: {
        speech: 'द्रविडियन भाषा आणि हिंदीच्या वाक्यरचनेत १०० टक्के एकवाक्यता आहे.',
        translit: 'Dravidian bhasha aani Hindichya vakyarachnet samya aahe.'
      }
    },
    transcriptNotes: [
      'Syntax Match: Tamil and Telugu share 100% sentence syntax alignment with Hindi.',
      'Honorific Match: Ji (जी) maps directly to Tamil -nga and Telugu -garu.',
      'Shared Words: Namaskaram, Vidyalaya, Dhanyavaad, Mitra.'
    ],
    quizQuestion: {
      question: 'Why is Hindi syntax natural for Tamil and Telugu native speakers?',
      options: ['Both language families use Subject-Object-Verb (SOV) order', 'They use the same alphabet', 'They have no verbs'],
      correctIndex: 0,
      explanation: 'Dravidian languages and Indo-Aryan Hindi share identical SOV syntactic structures.'
    }
  },
  {
    id: 'vid_5',
    titleHindi: 'अंग्रेजी व वैश्विक भाषियों के लिए हिंदी (English ➔ Hindi Masterclass)',
    titleEng: 'Learn Hindi via English — Complete Pronunciation & IPA Guide',
    targetLang: 'English',
    targetLangNative: 'English',
    flag: '🇬🇧',
    category: 'Global Language Bridge',
    languageFamily: 'Global',
    duration: '30 Mins',
    views: '220k',
    instructor: 'Prof. Robert Jenkins & Dr. Sharma',
    instructorTitle: 'International Language Bridge Fellow',
    level: 'Beginner',
    thumbnailGradient: 'from-blue-600 to-slate-950',
    description: 'Engineered specifically for English native and ESL speakers. Understand the SVO to SOV inversion, aspirated sounds, retroflex stops, and polite address registers.',
    dubbingMap: {
      en: {
        speech: 'Hello and welcome! In this lecture we master English to Hindi syntactic inversion and phonetics.',
        translit: 'Hello and welcome! Master English to Hindi grammar and conversation.'
      },
      hi: {
        speech: 'नमस्ते! अंग्रेजी भाषियों के लिए हिंदी का वाक्य व्युत्क्रम व सटीक उच्चारण नियम।',
        translit: 'Namaste! Angrezi bhashiyon ke liye Hindi ka vakya vyutkram va sateek uccharan.'
      },
      fa: {
        speech: 'سلام! در این درس تبدیل گرامر انگلیسی به هندی و تلفظ دقیق را آموزش می‌دهیم.',
        translit: 'Salam! Dar in dars tabdile grammar-e Englisi be Hindi ra amoozesh midahim.'
      },
      es: {
        speech: '¡Hola! Aprenderemos la inversión gramatical y fonética de inglés a hindi.',
        translit: 'Hola! Aprende la inversion gramatical y fonetica a hindi.'
      },
      fr: {
        speech: 'Bonjour! Découvrez comment inverser la syntaxe anglaise vers le hindi.',
        translit: 'Bonjour! Decouvrez l inversion de syntaxe vers le hindi.'
      },
      de: {
        speech: 'Guten Tag! Lernen Sie den Übergang von englischer zu hindi-grammatikalischer Struktur.',
        translit: 'Guten Tag! Lernen Sie den Uebergang zu Hindi.'
      },
      ja: {
        speech: 'こんにちは！英語からヒンディー語への語順反転と発音ルールを詳しく解説します。',
        translit: 'Konnichiwa! Eigo kara Hindi-go e no gojun hanten to hatsuon ruru o kaisetsu shimasu.'
      },
      ru: {
        speech: 'Здравствуйте! Мы изучим правила перехода с английского на структуру предложений хинди.',
        translit: 'Zdravstvuyte! My izuchim pravila perekhoda s angliyskogo na khindi.'
      }
    },
    transcriptNotes: [
      'Inversion Formula: English SVO (I drink tea) ➔ Hindi SOV (I tea drink / मैं चाय पीता हूँ).',
      'Retroflex Stops: Tongue curling for ट, ठ, ड, ढ.',
      'Politeness Tiers: Aap (Formal You) vs Tum (Informal You).'
    ],
    quizQuestion: {
      question: 'How does English "I drink water" invert in Hindi grammar?',
      options: ['"I water drink" (मैं पानी पीता हूँ - SOV)', '"Drink I water"', '"Water I drink"'],
      correctIndex: 0,
      explanation: 'Hindi inverts English SVO into Subject-Object-Verb (SOV).'
    }
  },
  {
    id: 'vid_6',
    titleHindi: 'दैनिक व्यावहारिक वार्तालाप व शिष्टाचार (Everyday Spoken Dialogues)',
    titleEng: 'Real-Life Conversational Dialogues, Courtesy Phrases & AI Simulation',
    targetLang: 'Hindi',
    targetLangNative: 'हिंदी',
    flag: '🇮🇳',
    category: 'Spoken Conversation',
    languageFamily: 'Indian',
    duration: '24 Mins',
    views: '165k',
    instructor: 'Acharya Aarav Shastri',
    instructorTitle: 'Master Evaluator, Central Hindi Institute',
    level: 'Beginner',
    thumbnailGradient: 'from-emerald-600 to-slate-900',
    description: 'High-frequency situational roleplays: marketplace shopping, railway ticketing, hotel check-ins, polite dining inquiries, and professional meeting introductions.',
    dubbingMap: {
      hi: {
        speech: 'नमस्ते! आप कैसे हैं? मुझे आपसे मिलकर बहुत खुशी हुई।',
        translit: 'Namaste! Aap kaise hain? Mujhe aapse milkar bahut khushi hui.'
      },
      en: {
        speech: 'Hello! How are you? It is an absolute pleasure to meet you.',
        translit: 'Hello! How are you? Nice to meet you.'
      },
      fa: {
        speech: 'سلام! حال شما چطور است؟ از آشنایی با شما بسیار خوشحالم.',
        translit: 'Salam! Hale shoma chetor ast? Az ashnaei ba shoma khoshhalam.'
      },
      es: {
        speech: '¡Hola! ¿Cómo estás? Es un gran placer conocerte hoy.',
        translit: 'Hola! Como estas? Mucho gusto en conocerte.'
      },
      fr: {
        speech: 'Bonjour! Comment allez-vous? C\'est un grand plaisir de vous rencontrer.',
        translit: 'Bonjour! Comment allez-vous? Ravi de vous rencontrer.'
      },
      de: {
        speech: 'Guten Tag! Wie geht es Ihnen? Es ist mir eine große Freude, Sie kennenzulernen.',
        translit: 'Guten Tag! Wie geht es Ihnen? Sehr erfreut.'
      },
      ja: {
        speech: 'こんにちは！お元気ですか？お会いできてとても嬉しいです。',
        translit: 'Konnichiwa! Ogenki desu ka? Oai dekite totemo ureshii desu.'
      },
      ru: {
        speech: 'Здравствуйте! Как ваши дела? Очень приятно познакомиться с вами.',
        translit: 'Zdravstvuyte! Kak vashi dela? Ochen priyatno poznakomitsya.'
      },
      ar: {
        speech: 'مرحباً! كيف حالكم؟ يسعدني جداً اللقاء بكم اليوم.',
        translit: 'Marhaban! Kayfa halukum? Yas-uduni jiddan al-liqaa bikum.'
      },
      ta: {
        speech: 'வணக்கம்! நீங்கள் எப்படி இருக்கிறீர்கள்? உங்களைச் சந்தித்ததில் மிகுந்த மகிழ்ச்சி.',
        translit: 'Vanakkam! Neengal eppadi irukkireergal? Ungalai sandhithadhil magizhchi.'
      },
      te: {
        speech: 'నమస్కారం! మీరు ఎలా ఉన్నారు? మిమ్మల్ని కలవడం చాలా సంతోషంగా ఉంది.',
        translit: 'Namaskaram! Meeru ela unnaru? Mimmalni kalavadam chala santosham.'
      },
      bn: {
        speech: 'নমস্কার! আপনি কেমন আছেন? আপনার সাথে দেখা হয়ে খুব ভালো লাগলো।',
        translit: 'Nomoshkar! Apni kemon aachen? Aaponar sathe dekha hoye khub bhalo laglo.'
      }
    },
    transcriptNotes: [
      'Greeting Rules: Namaste with folded hands is universally polite in all social contexts.',
      'Asking Price: "इसका दाम क्या है?" (What is the price of this?).',
      'Expressing Gratitude: "आपका बहुत-बहुत धन्यवाद।" (Thank you very much).'
    ],
    quizQuestion: {
      question: 'Which phrase is the standard polite greeting in Hindi suitable for all times of day?',
      options: ['नमस्ते / नमस्कार (Namaste / Namaskar)', 'अलविदा (Alvida)', 'शायद (Shayad)'],
      correctIndex: 0,
      explanation: 'Namaste / Namaskar is the timeless respectful greeting across India.'
    }
  }
];

export default function DashboardFreeVideosPage() {
  const [activeVideo, setActiveVideo] = useState<FreeVideoItem>(FREE_VIDEOS_CATALOG[0]);
  const [selectedLanguageFamily, setSelectedLanguageFamily] = useState<'All' | 'Indian' | 'Global'>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Real-time AI Voice Dubbing Player States
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [showSubtitles, setShowSubtitles] = useState<boolean>(true);
  const [activeDubbingLangKey, setActiveDubbingLangKey] = useState<string>('hi');
  const [activeTab, setActiveTab] = useState<'dubbing' | 'notes' | 'quiz' | 'discussion' | 'downloads'>('dubbing');
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  
  // Dubbing Language Modal Picker State
  const [dubbingModalOpen, setDubbingModalOpen] = useState(false);
  const [dubbingSearchQuery, setDubbingSearchQuery] = useState('');
  
  // Quiz states
  const [quizSelected, setQuizSelected] = useState<number | null>(null);
  const [quizAnswered, setQuizAnswered] = useState<boolean>(false);
  
  // Cinema Modal State
  const [cinemaModalOpen, setCinemaModalOpen] = useState(false);

  // Helper to get active dubbing text & tts code for currently selected language
  const getActiveDubbingData = (video: FreeVideoItem, langKey: string) => {
    const langObj = ALL_DUBBING_LANGUAGES.find((l) => l.key === langKey) || ALL_DUBBING_LANGUAGES[0];
    const dubbingInfo = video.dubbingMap[langKey] || video.dubbingMap['hi'] || {
      speech: video.titleHindi,
      translit: video.titleEng
    };
    return {
      langObj,
      speech: dubbingInfo.speech,
      translit: dubbingInfo.translit,
      ttsCode: langObj.ttsCode
    };
  };

  // Real-time Audio Speech Synthesis Player
  const playDubbingAudio = (text: string, ttsCode: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = ttsCode;
      utterance.rate = playbackSpeed;
      utterance.onend = () => {
        setIsPlaying(false);
      };
      window.speechSynthesis.speak(utterance);
      setIsPlaying(true);
    } else {
      alert(`Playing Audio [${ttsCode}]: "${text}"`);
    }
  };

  const stopAudioTrack = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
  };

  const handleTogglePlay = () => {
    if (isPlaying) {
      stopAudioTrack();
    } else {
      const data = getActiveDubbingData(activeVideo, activeDubbingLangKey);
      playDubbingAudio(data.speech, data.ttsCode);
    }
  };

  const handleSelectDubbingLang = (langKey: string) => {
    setActiveDubbingLangKey(langKey);
    const data = getActiveDubbingData(activeVideo, langKey);
    playDubbingAudio(data.speech, data.ttsCode);
  };

  useEffect(() => {
    setQuizSelected(null);
    setQuizAnswered(false);
    stopAudioTrack();
  }, [activeVideo]);

  const currentDubbingData = getActiveDubbingData(activeVideo, activeDubbingLangKey);

  const filteredVideos = FREE_VIDEOS_CATALOG.filter((v) => {
    const matchesFamily =
      selectedLanguageFamily === 'All' || v.languageFamily === selectedLanguageFamily;
    const matchesCategory =
      selectedCategory === 'All' || v.category === selectedCategory;
    const matchesSearch =
      v.titleHindi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.titleEng.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.targetLang.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFamily && matchesCategory && matchesSearch;
  });

  const filteredDubbingLangs = ALL_DUBBING_LANGUAGES.filter((l) =>
    l.nameEng.toLowerCase().includes(dubbingSearchQuery.toLowerCase()) ||
    l.nameNative.toLowerCase().includes(dubbingSearchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-8xl mx-auto pb-16">
      {/* 1. Header Banner */}
      <div className="p-6 sm:p-8 rounded-sm bg-white border border-[#DCE2E6] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-sm bg-[#EEF3F8] text-[#0B3D91] text-[10px] font-black uppercase tracking-wider border border-[#D0DCE7] flex items-center gap-1">
              <Globe className="w-3 h-3 text-[#0B3D91]" /> UNIVERSAL MULTI-LANGUAGE DUBBING VIDEO PORTAL
            </span>
            <span className="px-2 py-0.5 rounded-sm bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase border border-emerald-200 flex items-center gap-1">
              <Headphones className="w-3 h-3 text-emerald-600" /> 18+ Instant Voice Dubbing Tracks
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900">
            निःशुल्क बहुभाषी डबिंग वीडियो पुस्तकालय (AI Multi-Language Dubbed Masterclasses)
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-3xl mt-1">
            Watch any video lecture dubbed in your native language with instant SpeechSynthesis voiceover (Hindi, English, Persian, Spanish, German, Tamil, Telugu, Russian, Sanskrit & more), synchronized dual subtitles, and interactive knowledge checks.
          </p>
        </div>

        {/* Quick Language Family Filter Tabs */}
        <div className="flex items-center gap-1.5 bg-[#EEF3F8] p-1.5 rounded-sm border border-[#D0DCE7] self-start md:self-center shrink-0">
          {(['All', 'Indian', 'Global'] as const).map((fam) => (
            <button
              key={fam}
              onClick={() => setSelectedLanguageFamily(fam)}
              className={`px-3 py-1.5 rounded-sm font-black text-xs transition cursor-pointer ${
                selectedLanguageFamily === fam
                  ? 'bg-[#0B3D91] text-white shadow-xs'
                  : 'text-slate-700 hover:bg-[#D0DCE7]'
              }`}
            >
              {fam === 'All' ? '🌐 All Videos' : fam === 'Indian' ? '🇮🇳 Indian Languages' : '🌍 Global Bridges'}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Main 2-Column Cinema Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: Real-Time Cinema Video Player Canvas & Tabs */}
        <div className="lg:col-span-8 space-y-6">
          <div className="p-6 rounded-sm bg-white border border-[#DCE2E6] shadow-xs space-y-6">
            {/* Video Player Canvas */}
            <div className="aspect-video bg-gradient-to-br from-slate-950 via-slate-900 to-[#031533] rounded-sm p-5 sm:p-8 flex flex-col justify-between text-white relative overflow-hidden shadow-2xl border border-slate-800">
              {/* Top Video Overlay Bar */}
              <div className="flex items-center justify-between text-xs z-10">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-1 rounded-sm bg-amber-400/20 text-amber-300 font-bold border border-amber-400/30 flex items-center gap-1.5">
                    <span>{activeVideo.flag}</span>
                    <span>{activeVideo.targetLang} ({activeVideo.targetLangNative})</span>
                  </span>
                  {/* Active AI Dubbing Track Badge */}
                  <span className="px-2.5 py-1 rounded-sm bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-400/30 flex items-center gap-1">
                    <Mic className="w-3 h-3 text-emerald-400" />
                    <span>AI Dubbed: {currentDubbingData.langObj.flag} {currentDubbingData.langObj.nameEng} ({currentDubbingData.langObj.nameNative})</span>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCinemaModalOpen(true)}
                    className="text-amber-300 hover:text-white text-xs font-bold px-2 py-1 bg-black/40 hover:bg-black/60 rounded border border-amber-400/20 flex items-center gap-1 transition cursor-pointer"
                  >
                    <Maximize2 className="w-3.5 h-3.5" /> Pop Cinema Screen ↗
                  </button>
                </div>
              </div>

              {/* Central Playback Animation & Soundwave Visualizer */}
              <div className="my-auto text-center space-y-4 z-10 py-3">
                <div
                  onClick={handleTogglePlay}
                  className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full mx-auto flex items-center justify-center transition shadow-2xl cursor-pointer ${
                    isPlaying
                      ? 'bg-[#0B3D91] ring-4 ring-[#FF9933] scale-105'
                      : 'bg-[#0B3D91] hover:bg-[#FF9933] text-white hover:text-slate-950 hover:scale-110'
                  }`}
                >
                  {isPlaying ? (
                    <Volume2 className="w-10 h-10 animate-pulse text-amber-300" />
                  ) : (
                    <Play className="w-10 h-10 fill-current ml-1" />
                  )}
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-black text-white max-w-2xl mx-auto">
                    {activeVideo.titleHindi}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto mt-1">
                    {activeVideo.titleEng}
                  </p>
                </div>

                {/* Animated Real-Time Sound Wave Visualizer */}
                {isPlaying && (
                  <div className="flex items-center justify-center gap-1.5 h-10">
                    {[35, 75, 45, 95, 60, 100, 80, 40, 85, 65, 90, 70, 50, 95, 60, 80, 45, 70, 30].map((h, i) => (
                      <span
                        key={i}
                        className="w-1.5 bg-gradient-to-t from-amber-400 to-[#FF9933] rounded-full animate-bounce"
                        style={{ height: `${h}%`, animationDelay: `${i * 0.06}s` }}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Real-time Subtitles Overlay in Selected Dubbed Language */}
              {showSubtitles && (
                <div className="z-10 text-center bg-black/75 backdrop-blur-xs p-3 rounded-sm text-xs sm:text-sm font-semibold text-amber-200 border border-white/10 max-w-2xl mx-auto animate-in fade-in">
                  <span className="text-[10px] uppercase text-slate-400 block tracking-wider">
                    [Live Dubbed Subtitles: {currentDubbingData.langObj.nameEng} ({currentDubbingData.langObj.nameNative})]
                  </span>
                  &quot;{currentDubbingData.speech}&quot;
                  <span className="block text-[11px] text-slate-300 mt-0.5">
                    (Translit: {currentDubbingData.translit})
                  </span>
                </div>
              )}

              {/* Bottom Player Timeline & Control Bar */}
              <div className="z-10 border-t border-white/10 pt-3 flex flex-wrap items-center justify-between text-xs text-slate-300 gap-2">
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleTogglePlay}
                    className="p-1.5 rounded bg-white/10 hover:bg-white/20 text-white font-bold transition flex items-center gap-1 cursor-pointer"
                  >
                    {isPlaying ? '⏸ Pause' : '▶ Play Dubbed Video'}
                  </button>
                  <span className="font-mono text-[11px] text-amber-300">
                    {isPlaying ? '04:15' : '00:00'} / {activeVideo.duration}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => setShowSubtitles(!showSubtitles)}
                    className={`px-2 py-1 rounded text-[11px] font-bold border transition cursor-pointer ${
                      showSubtitles
                        ? 'bg-amber-400 text-slate-950 border-amber-300 font-black'
                        : 'bg-white/10 text-slate-300 border-white/20'
                    }`}
                  >
                    CC Subtitles {showSubtitles ? 'ON' : 'OFF'}
                  </button>

                  <div className="flex items-center gap-1 bg-black/40 p-0.5 rounded border border-white/10 text-[11px]">
                    {[0.75, 1, 1.25, 1.5, 2].map((spd) => (
                      <button
                        key={spd}
                        onClick={() => {
                          setPlaybackSpeed(spd);
                          if (isPlaying) {
                            stopAudioTrack();
                            playDubbingAudio(currentDubbingData.speech, currentDubbingData.ttsCode);
                          }
                        }}
                        className={`px-1.5 py-0.5 rounded transition cursor-pointer ${
                          playbackSpeed === spd
                            ? 'bg-[#0B3D91] text-white font-bold'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {spd}x
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ========================================================= */}
            {/* MULTI-LANGUAGE AI DUBBING TRACK SELECTOR BAR              */}
            {/* ========================================================= */}
            <div className="p-4 rounded-sm bg-[#EEF3F8] border border-[#D0DCE7] space-y-2.5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-sm bg-[#0B3D91] text-white flex items-center justify-center font-black text-xs">
                    <Radio className="w-3.5 h-3.5" />
                  </span>
                  <div>
                    <span className="text-[10px] font-black uppercase text-[#0B3D91] tracking-wider block">
                      AI VOICE DUBBING TRACK SELECTOR (INSTANT SPEECH IN 18+ LANGUAGES)
                    </span>
                    <h5 className="font-extrabold text-xs text-slate-900">
                      Switch Dubbed Audio Voice: Currently listening in <strong className="text-[#0B3D91]">{currentDubbingData.langObj.flag} {currentDubbingData.langObj.nameEng} ({currentDubbingData.langObj.nameNative})</strong>
                    </h5>
                  </div>
                </div>

                <button
                  onClick={() => setDubbingModalOpen(true)}
                  className="px-3 py-1.5 rounded-sm bg-[#0B3D91] hover:bg-[#082C6C] text-white font-black text-[11px] flex items-center gap-1 shadow-xs cursor-pointer"
                >
                  <Globe className="w-3.5 h-3.5" /> All 18 Dubbing Languages ↗
                </button>
              </div>

              {/* Quick Multi-Language Dubbing Pills */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {ALL_DUBBING_LANGUAGES.slice(0, 10).map((l) => {
                  const isDubbingActive = activeDubbingLangKey === l.key;

                  return (
                    <button
                      key={l.key}
                      onClick={() => handleSelectDubbingLang(l.key)}
                      className={`px-3 py-1.5 rounded-sm text-xs font-extrabold transition flex items-center gap-1.5 cursor-pointer ${
                        isDubbingActive
                          ? 'bg-[#0B3D91] text-white shadow-xs ring-2 ring-[#FF9933]'
                          : 'bg-white text-slate-700 border border-[#DCE2E6] hover:bg-slate-100'
                      }`}
                    >
                      <span>{l.flag}</span>
                      <span>{l.nameEng}</span>
                      <span className="text-[10px] font-normal opacity-80">({l.nameNative})</span>
                      {isDubbingActive && <span className="ml-0.5 text-amber-300 text-[10px]">● Active</span>}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Video Metadata Actions Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-sm bg-slate-50 border border-[#DCE2E6] text-xs">
              <div className="space-y-0.5">
                <span className="text-[10px] font-black uppercase text-[#0B3D91] tracking-wider block">
                  FACULTY & INSTRUCTOR LECTURE PROFILE
                </span>
                <h5 className="font-extrabold text-sm text-slate-900">
                  {activeVideo.instructor} • <span className="text-slate-500 font-normal">{activeVideo.instructorTitle}</span>
                </h5>
                <p className="text-slate-600 font-medium leading-relaxed pt-1 max-w-2xl">{activeVideo.description}</p>
              </div>

              <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                <button
                  onClick={() => setLiked(!liked)}
                  className={`px-3.5 py-2 rounded-sm font-bold transition flex items-center gap-1.5 cursor-pointer ${
                    liked ? 'bg-rose-600 text-white' : 'bg-white text-slate-700 border border-[#DCE2E6] hover:bg-slate-50'
                  }`}
                >
                  <ThumbsUp className="w-4 h-4" /> {liked ? 'Liked ❤️' : 'Like'}
                </button>
                <button
                  onClick={() => setBookmarked(!bookmarked)}
                  className={`px-3.5 py-2 rounded-sm font-bold transition flex items-center gap-1.5 cursor-pointer ${
                    bookmarked ? 'bg-[#0B3D91] text-white' : 'bg-white text-slate-700 border border-[#DCE2E6] hover:bg-slate-50'
                  }`}
                >
                  <Bookmark className="w-4 h-4" /> {bookmarked ? 'Saved ✓' : 'Save'}
                </button>
                <button
                  onClick={() => alert('Masterclass video link copied to clipboard!')}
                  className="px-3.5 py-2 rounded-sm bg-white text-slate-700 border border-[#DCE2E6] hover:bg-slate-50 font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <Share2 className="w-4 h-4 text-[#0B3D91]" /> Share
                </button>
              </div>
            </div>

            {/* Interactive Tabbed Content Section (Dubbing, Notes, Quiz, Discussion, Downloads) */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-2 border-b border-[#DCE2E6] pb-2 overflow-x-auto text-xs font-bold">
                {[
                  { id: 'dubbing' as const, label: '🎙️ Multi-Language Dubbing Tracks', icon: Mic },
                  { id: 'notes' as const, label: '📝 Lecture Notes & Transcript', icon: BookOpen },
                  { id: 'quiz' as const, label: '⚡ Knowledge Check Quiz (+50 XP)', icon: Award },
                  { id: 'discussion' as const, label: '💬 Q&A Discussion', icon: MessageSquare },
                  { id: 'downloads' as const, label: '📥 Study Material PDF', icon: Download }
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setActiveTab(t.id)}
                    className={`px-3.5 py-2 rounded-sm transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                      activeTab === t.id
                        ? 'bg-[#0B3D91] text-white font-black shadow-xs'
                        : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {/* Tab: Multi-Language Dubbing Tracks Matrix */}
              {activeTab === 'dubbing' && (
                <div className="p-4 rounded-sm bg-slate-50 border border-[#DCE2E6] text-xs space-y-3 animate-in fade-in">
                  <div className="flex items-center justify-between">
                    <h6 className="font-extrabold text-sm text-slate-900">
                      All Available AI Dubbing Voiceover Tracks for &quot;{activeVideo.titleHindi}&quot;
                    </h6>
                    <span className="text-[11px] font-bold text-emerald-600">
                      ● 18 Languages Active & Ready
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 pt-1">
                    {ALL_DUBBING_LANGUAGES.map((l) => {
                      const isSelected = activeDubbingLangKey === l.key;
                      const dInfo = activeVideo.dubbingMap[l.key] || activeVideo.dubbingMap['hi'];

                      return (
                        <div
                          key={l.key}
                          onClick={() => handleSelectDubbingLang(l.key)}
                          className={`p-3 rounded-sm border transition flex flex-col justify-between gap-2 cursor-pointer ${
                            isSelected
                              ? 'bg-[#0B3D91] text-white border-[#082C6C] shadow-sm ring-2 ring-[#FF9933]'
                              : 'bg-white text-slate-800 border-[#DCE2E6] hover:bg-slate-100'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-base">{l.flag}</span>
                            <span className={`text-[10px] font-black uppercase px-1.5 py-0.2 rounded ${
                              isSelected ? 'bg-amber-400 text-slate-950 font-black' : 'bg-[#EEF3F8] text-[#0B3D91]'
                            }`}>
                              {l.ttsCode}
                            </span>
                          </div>

                          <div>
                            <h6 className="font-extrabold text-xs">{l.nameEng} ({l.nameNative})</h6>
                            <p className={`text-[11px] line-clamp-1 mt-0.5 ${isSelected ? 'text-slate-200' : 'text-slate-500'}`}>
                              &quot;{dInfo?.speech || activeVideo.titleHindi}&quot;
                            </p>
                          </div>

                          <div className="flex items-center justify-between pt-1 border-t border-black/10 text-[10px] font-bold">
                            <span>{isSelected ? '🎙️ Playing Voiceover' : 'Click to Play Audio'}</span>
                            <Play className="w-3 h-3 fill-current" />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Tab: Lecture Notes */}
              {activeTab === 'notes' && (
                <div className="p-4 rounded-sm bg-slate-50 border border-[#DCE2E6] text-xs space-y-3 animate-in fade-in">
                  <h6 className="font-extrabold text-sm text-slate-900">
                    Official Lecture Summary & Phonetic Breakdown ({activeVideo.targetLang}):
                  </h6>
                  <ul className="list-disc list-inside space-y-1.5 text-slate-600 leading-relaxed">
                    {activeVideo.transcriptNotes.map((note, idx) => (
                      <li key={idx} className="font-medium">{note}</li>
                    ))}
                  </ul>
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-sm text-amber-900 text-[11px] font-medium flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Comparative note: This lecture includes real-time phonetic transliteration and cross-language mappings.</span>
                  </div>
                </div>
              )}

              {/* Tab: Knowledge Check Quiz */}
              {activeTab === 'quiz' && (
                <div className="p-4 rounded-sm bg-slate-50 border border-[#DCE2E6] space-y-3 animate-in fade-in">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase text-[#0B3D91] tracking-wider">
                      INTERACTIVE KNOWLEDGE CHECK
                    </span>
                    <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 text-[10px] font-bold">
                      Reward: +50 XP
                    </span>
                  </div>

                  <h5 className="font-extrabold text-sm text-slate-900">
                    {activeVideo.quizQuestion.question}
                  </h5>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                    {activeVideo.quizQuestion.options.map((opt, idx) => {
                      const isCorrect = idx === activeVideo.quizQuestion.correctIndex;
                      const isSelected = quizSelected === idx;

                      return (
                        <button
                          key={idx}
                          onClick={() => {
                            setQuizSelected(idx);
                            setQuizAnswered(true);
                            if (isCorrect) {
                              try {
                                confetti({ particleCount: 80, spread: 60, origin: { y: 0.7 } });
                              } catch (e) {
                                console.log('Confetti triggered');
                              }
                              playDubbingAudio('शाबाश! सही उत्तर है।', 'hi-IN');
                            }
                          }}
                          className={`p-3 rounded-sm border text-left font-bold text-xs transition cursor-pointer ${
                            isSelected
                              ? isCorrect
                                ? 'bg-emerald-50 border-emerald-500 text-emerald-900 ring-2 ring-emerald-400'
                                : 'bg-rose-50 border-rose-500 text-rose-900 ring-2 ring-rose-400'
                              : 'bg-white border-[#DCE2E6] text-slate-800 hover:bg-slate-100'
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {quizAnswered && (
                    <div className="p-3 rounded-sm text-xs font-semibold mt-2 animate-in fade-in">
                      {quizSelected === activeVideo.quizQuestion.correctIndex ? (
                        <div className="text-emerald-700 bg-emerald-50 p-2 rounded-sm border border-emerald-200">
                          ✅ <strong>Correct!</strong> {activeVideo.quizQuestion.explanation}
                        </div>
                      ) : (
                        <div className="text-rose-700 bg-rose-50 p-2 rounded-sm border border-rose-200">
                          ❌ <strong>Try Again:</strong> {activeVideo.quizQuestion.explanation}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Tab: Discussion */}
              {activeTab === 'discussion' && (
                <div className="p-4 rounded-sm bg-slate-50 border border-[#DCE2E6] space-y-3 text-xs animate-in fade-in">
                  <h6 className="font-extrabold text-sm text-slate-900">Student Q&A & Peer Discussions</h6>
                  <div className="space-y-2">
                    <div className="p-3 bg-white rounded-sm border border-[#DCE2E6] space-y-1">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-bold text-slate-800">Aarav Sharma (Verified Student)</span>
                        <span className="text-slate-400">2 hours ago</span>
                      </div>
                      <p className="text-slate-600">The multi-language dubbing makes it so easy to compare Persian and Hindi roots simultaneously!</p>
                    </div>
                    <div className="p-3 bg-white rounded-sm border border-[#DCE2E6] space-y-1">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-bold text-slate-800">Dr. Devendra Sharma (Faculty)</span>
                        <span className="text-slate-400">1 hour ago</span>
                      </div>
                      <p className="text-[#0B3D91]">You can switch dubbing audio to Tamil or German to see how other language families bridge to Hindi grammar.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab: Downloads */}
              {activeTab === 'downloads' && (
                <div className="p-4 rounded-sm bg-slate-50 border border-[#DCE2E6] space-y-3 text-xs animate-in fade-in">
                  <h6 className="font-extrabold text-sm text-slate-900">Download Official Lecture PDF Material</h6>
                  <div className="p-4 bg-white rounded-sm border border-[#DCE2E6] flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-sm bg-[#EEF3F8] text-[#0B3D91] font-bold flex items-center justify-center">
                        <Download className="w-5 h-5" />
                      </div>
                      <div>
                        <h6 className="font-extrabold text-slate-900">{activeVideo.titleHindi} — Study Guide</h6>
                        <span className="text-[11px] text-slate-500 font-medium">Official CIIL & NIOS PDF • 4.8 MB</span>
                      </div>
                    </div>
                    <button
                      onClick={() => alert(`📥 Downloading PDF study guide for ${activeVideo.titleHindi}...`)}
                      className="px-4 py-2 rounded-sm bg-[#0B3D91] hover:bg-[#082C6C] text-white font-black text-xs uppercase tracking-wider shadow-xs"
                    >
                      Download PDF
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Interactive Multi-Language Video Playlist & Search */}
        <div className="lg:col-span-4 space-y-5">
          <div className="p-5 rounded-sm bg-white border border-[#DCE2E6] shadow-xs space-y-4">
            {/* Playlist Header */}
            <div className="flex items-center justify-between border-b border-[#DCE2E6] pb-3">
              <div>
                <h3 className="font-black text-slate-900 text-sm">
                  Masterclass Playlist (व्याख्यान सूची)
                </h3>
                <span className="text-[11px] font-semibold text-slate-500">
                  {filteredVideos.length} Curated Dubbed Masterclasses
                </span>
              </div>
              <span className="px-2.5 py-1 rounded-sm bg-[#EEF3F8] text-[#0B3D91] font-black text-xs">
                HD 1080p
              </span>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search languages, topics or faculty..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-sm bg-slate-50 border border-[#DCE2E6] text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#0B3D91]"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-1.5">
              {['All', 'Devanagari Script', 'Global Language Bridge', 'SOV Grammar', 'Spoken Conversation'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2.5 py-1 rounded-sm font-extrabold text-[11px] transition cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#0B3D91] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Video Playlist Cards List */}
            <div className="space-y-2.5 max-h-[680px] overflow-y-auto pr-1">
              {filteredVideos.map((item) => {
                const isActive = activeVideo.id === item.id;
                const dData = getActiveDubbingData(item, activeDubbingLangKey);

                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      setActiveVideo(item);
                      playDubbingAudio(dData.speech, dData.ttsCode);
                    }}
                    className={`p-3 rounded-sm border cursor-pointer transition-all duration-200 flex gap-3 items-center shadow-2xs hover:shadow-md ${
                      isActive
                        ? 'bg-[#EEF3F8] border-[#0B3D91] ring-1 ring-[#0B3D91]'
                        : 'bg-white border-[#DCE2E6] hover:bg-slate-50'
                    }`}
                  >
                    {/* Left Thumbnail */}
                    <div className={`w-20 h-16 shrink-0 rounded-sm bg-gradient-to-r ${item.thumbnailGradient} p-1.5 flex flex-col justify-between text-white relative overflow-hidden shadow-2xs`}>
                      <span className="text-xs">{item.flag}</span>
                      <div className="w-5 h-5 rounded-full bg-white/20 backdrop-blur-xs text-white flex items-center justify-center mx-auto">
                        <Play className="w-2.5 h-2.5 fill-white ml-0.5" />
                      </div>
                      <span className="text-[9px] font-bold text-white/90 text-right">
                        {item.duration}
                      </span>
                    </div>

                    {/* Right Metadata */}
                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[9px] font-black uppercase text-[#0B3D91] truncate">
                          {item.targetLang} • {item.category}
                        </span>
                        {isActive && (
                          <span className="px-1.5 py-0.2 rounded bg-[#0B3D91] text-white font-black text-[9px] shrink-0">
                            DUBBED
                          </span>
                        )}
                      </div>
                      <h5 className="font-extrabold text-xs text-slate-900 line-clamp-1 leading-snug">
                        {item.titleHindi}
                      </h5>
                      <p className="text-[11px] text-slate-500 line-clamp-1">{item.titleEng}</p>
                      <div className="flex items-center justify-between text-[10px] text-slate-400 font-semibold pt-0.5">
                        <span className="truncate">{item.instructor}</span>
                        <span className="shrink-0">{item.views} Views</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 18+ DUBBING LANGUAGE SELECTOR MODAL                       */}
      {/* ========================================================= */}
      {dubbingModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setDubbingModalOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl bg-white rounded-sm shadow-2xl overflow-hidden border border-[#DCE2E6]"
          >
            {/* Modal Header */}
            <div className="p-4 bg-[#0B3D91] text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-amber-300" />
                <div>
                  <h4 className="font-black text-sm">Select AI Voice Dubbing Language</h4>
                  <p className="text-[11px] text-blue-100">Switch real-time spoken audio & subtitles to any language</p>
                </div>
              </div>
              <button
                onClick={() => setDubbingModalOpen(false)}
                className="w-8 h-8 rounded-sm bg-white/10 hover:bg-rose-600 text-white flex items-center justify-center transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body with Search & Language Grid */}
            <div className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Filter languages (e.g. Tamil, Persian, Spanish, German)..."
                  value={dubbingSearchQuery}
                  onChange={(e) => setDubbingSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-sm bg-slate-50 border border-[#DCE2E6] text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#0B3D91]"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {filteredDubbingLangs.map((l) => {
                  const isCurrent = activeDubbingLangKey === l.key;

                  return (
                    <button
                      key={l.key}
                      onClick={() => {
                        handleSelectDubbingLang(l.key);
                        setDubbingModalOpen(false);
                      }}
                      className={`p-3 rounded-sm border text-left transition flex items-center justify-between gap-2 cursor-pointer ${
                        isCurrent
                          ? 'bg-[#0B3D91] text-white border-[#082C6C] shadow-sm ring-2 ring-[#FF9933]'
                          : 'bg-white text-slate-800 border-[#DCE2E6] hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="text-xl">{l.flag}</span>
                        <div className="truncate">
                          <h6 className="font-extrabold text-xs truncate">{l.nameEng}</h6>
                          <span className={`text-[10px] block truncate ${isCurrent ? 'text-amber-200' : 'text-slate-400'}`}>
                            {l.nameNative}
                          </span>
                        </div>
                      </div>
                      {isCurrent && <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* FULL-SCREEN THEATER CINEMA MODAL WITH DUBBING             */}
      {/* ========================================================= */}
      {cinemaModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setCinemaModalOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-5xl bg-slate-950 border border-slate-800 rounded-sm shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-3.5 bg-slate-900 border-b border-slate-800 text-white shrink-0">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="text-xl">{activeVideo.flag}</span>
                <div className="truncate">
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 block">
                    Free HD Masterclass • AI Dubbed: {currentDubbingData.langObj.flag} {currentDubbingData.langObj.nameEng} ({currentDubbingData.langObj.nameNative})
                  </span>
                  <h4 className="font-extrabold text-sm text-white truncate">
                    {activeVideo.titleHindi}
                  </h4>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded bg-black/40 text-emerald-400 border border-emerald-500/30">
                  ● Cinema Theater 1080p
                </span>
                <button
                  onClick={() => setCinemaModalOpen(false)}
                  className="w-8 h-8 rounded-sm bg-slate-800 hover:bg-rose-600 hover:text-white text-slate-400 flex items-center justify-center transition cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Cinema Video Canvas */}
            <div className="relative aspect-video bg-gradient-to-br from-slate-950 via-slate-900 to-[#031533] flex flex-col justify-between p-6 sm:p-10 text-white overflow-hidden shrink-0">
              <div className="flex items-center justify-between text-xs z-10">
                <span className="px-3 py-1 rounded-sm bg-amber-400/20 text-amber-300 font-bold border border-amber-400/30">
                  {activeVideo.category} • Instructor: {activeVideo.instructor}
                </span>
                <span className="text-slate-400 font-mono text-xs">{activeVideo.duration} • HD 1080p</span>
              </div>

              <div className="my-auto text-center space-y-4 z-10 py-4">
                <div
                  onClick={handleTogglePlay}
                  className={`w-24 h-24 rounded-full mx-auto flex items-center justify-center transition shadow-2xl cursor-pointer ${
                    isPlaying
                      ? 'bg-[#0B3D91] ring-4 ring-[#FF9933] scale-105'
                      : 'bg-[#0B3D91] hover:bg-[#FF9933] text-white hover:text-slate-950 hover:scale-110'
                  }`}
                >
                  {isPlaying ? (
                    <Volume2 className="w-10 h-10 animate-pulse text-amber-300" />
                  ) : (
                    <Play className="w-10 h-10 fill-current ml-1" />
                  )}
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-white">{activeVideo.titleHindi}</h3>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto mt-1">{activeVideo.titleEng}</p>
                </div>

                {isPlaying && (
                  <div className="flex items-center justify-center gap-1.5 h-10">
                    {[35, 75, 45, 95, 60, 100, 80, 40, 85, 65, 90, 70, 50, 95, 60, 80, 45].map((h, i) => (
                      <span
                        key={i}
                        className="w-1.5 bg-gradient-to-t from-amber-400 to-[#FF9933] rounded-full animate-bounce"
                        style={{ height: `${h}%`, animationDelay: `${i * 0.07}s` }}
                      />
                    ))}
                  </div>
                )}
              </div>

              {showSubtitles && (
                <div className="z-10 text-center bg-black/75 backdrop-blur-xs p-3 rounded-sm text-xs sm:text-sm font-semibold text-amber-200 border border-white/10 max-w-2xl mx-auto">
                  <span className="text-[10px] uppercase text-slate-400 block tracking-wider">
                    [Live Dubbed Subtitles: {currentDubbingData.langObj.nameEng} ({currentDubbingData.langObj.nameNative})]
                  </span>
                  &quot;{currentDubbingData.speech}&quot;
                  <span className="block text-[11px] text-slate-300 mt-0.5">
                    (Translit: {currentDubbingData.translit})
                  </span>
                </div>
              )}

              {/* Bottom Controls */}
              <div className="z-10 border-t border-white/10 pt-3 flex flex-wrap items-center justify-between text-xs text-slate-300 gap-2">
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleTogglePlay}
                    className="p-1.5 rounded bg-white/10 hover:bg-white/20 text-white font-bold transition flex items-center gap-1 cursor-pointer"
                  >
                    {isPlaying ? '⏸ Pause' : '▶ Play'}
                  </button>
                  <span className="font-mono text-[11px] text-amber-300">
                    {isPlaying ? '04:15' : '00:00'} / {activeVideo.duration}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowSubtitles(!showSubtitles)}
                    className={`px-2 py-1 rounded text-[11px] font-bold border transition cursor-pointer ${
                      showSubtitles ? 'bg-amber-400 text-slate-950 font-black' : 'bg-white/10 text-slate-300'
                    }`}
                  >
                    CC Subtitles {showSubtitles ? 'ON' : 'OFF'}
                  </button>

                  <div className="flex items-center gap-1 bg-black/40 p-0.5 rounded border border-white/10 text-[11px]">
                    {[0.75, 1, 1.25, 1.5, 2].map((spd) => (
                      <button
                        key={spd}
                        onClick={() => {
                          setPlaybackSpeed(spd);
                          if (isPlaying) {
                            stopAudioTrack();
                            playDubbingAudio(currentDubbingData.speech, currentDubbingData.ttsCode);
                          }
                        }}
                        className={`px-1.5 py-0.5 rounded transition cursor-pointer ${
                          playbackSpeed === spd ? 'bg-[#0B3D91] text-white font-bold' : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {spd}x
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
