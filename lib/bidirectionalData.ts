export type LearningTrackType = 'trackA' | 'trackB';
export type GoalTrackId = 'diplomatic' | 'trade' | 'travel';
export type ScriptDisplayMode = 'roman' | 'native' | 'both';

export interface LanguageMeta {
  code: string;
  nameEng: string;
  nameNative: string;
  script: string;
  flag: string;
  isScheduleVIII: boolean;
  region: string;
}

export interface LanguagePair {
  id: string;
  sourceLang: string; // e.g. 'en', 'fr', 'hi'
  targetLang: string; // e.g. 'hi', 'ta', 'fr', 'es'
  track: LearningTrackType;
  title: string;
  description: string;
  totalLearners: number;
  featured?: boolean;
}

export interface SkillSplitScore {
  listening: number;  // 0 - 100
  speaking: number;   // 0 - 100
  reading: number;    // 0 - 100
  writing: number;    // 0 - 100
  overallCEFR: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  lastAssessed: string;
}

export interface GoalTrackLesson {
  id: string;
  goalTrackId: GoalTrackId;
  languagePairId: string;
  level: 'A1' | 'A2' | 'B1' | 'B2';
  titleEng: string;
  titleNative: string;
  transliteration: string;
  category: string;
  durationMins: number;
  scenario: string;
  vocabulary: {
    native: string;
    transliteration: string;
    english: string;
    contextUsage: string;
    audioPronunciationText: string;
  }[];
  dialogueLines: {
    speaker: string;
    role: string;
    nativeText: string;
    transliteration: string;
    englishText: string;
  }[];
  protocolNotes?: string;
  skillFocus: ('listening' | 'speaking' | 'reading' | 'writing')[];
}

// 22 Eighth Schedule Official Indian Languages
export const SCHEDULE_VIII_LANGUAGES: LanguageMeta[] = [
  { code: 'hi', nameEng: 'Hindi', nameNative: 'हिंदी', script: 'Devanagari', flag: '🇮🇳', isScheduleVIII: true, region: 'North/Central India' },
  { code: 'ta', nameEng: 'Tamil', nameNative: 'தமிழ்', script: 'Tamil', flag: '🇮🇳', isScheduleVIII: true, region: 'Tamil Nadu & Puducherry' },
  { code: 'te', nameEng: 'Telugu', nameNative: 'తెలుగు', script: 'Telugu', flag: '🇮🇳', isScheduleVIII: true, region: 'Andhra Pradesh & Telangana' },
  { code: 'bn', nameEng: 'Bengali', nameNative: 'বাংলা', script: 'Bengali', flag: '🇮🇳', isScheduleVIII: true, region: 'West Bengal & Tripura' },
  { code: 'mr', nameEng: 'Marathi', nameNative: 'मराठी', script: 'Devanagari', flag: '🇮🇳', isScheduleVIII: true, region: 'Maharashtra & Goa' },
  { code: 'gu', nameEng: 'Gujarati', nameNative: 'ગુજરાતી', script: 'Gujarati', flag: '🇮🇳', isScheduleVIII: true, region: 'Gujarat' },
  { code: 'kn', nameEng: 'Kannada', nameNative: 'ಕನ್ನಡ', script: 'Kannada', flag: '🇮🇳', isScheduleVIII: true, region: 'Karnataka' },
  { code: 'ml', nameEng: 'Malayalam', nameNative: 'മലയാളം', script: 'Malayalam', flag: '🇮🇳', isScheduleVIII: true, region: 'Kerala & Lakshadweep' },
  { code: 'pa', nameEng: 'Punjabi', nameNative: 'ਪੰਜਾਬੀ', script: 'Gurmukhi', flag: '🇮🇳', isScheduleVIII: true, region: 'Punjab' },
  { code: 'or', nameEng: 'Odia', nameNative: 'ଓଡ଼ିଆ', script: 'Odia', flag: '🇮🇳', isScheduleVIII: true, region: 'Odisha' },
  { code: 'as', nameEng: 'Assamese', nameNative: 'অসমীয়া', script: 'Bengali-Assamese', flag: '🇮🇳', isScheduleVIII: true, region: 'Assam' },
  { code: 'sa', nameEng: 'Sanskrit', nameNative: 'संस्कृतम्', script: 'Devanagari', flag: '🇮🇳', isScheduleVIII: true, region: 'Pan-Indian Classical' },
  { code: 'ur', nameEng: 'Urdu', nameNative: 'اردو', script: 'Perso-Arabic', flag: '🇮🇳', isScheduleVIII: true, region: 'Pan-Indian' },
  { code: 'mai', nameEng: 'Maithili', nameNative: 'मैथिली', script: 'Devanagari / Mithilakshar', flag: '🇮🇳', isScheduleVIII: true, region: 'Bihar & Jharkhand' },
  { code: 'sant', nameEng: 'Santali', nameNative: 'ᱥᱟᱱᱛᱟᱲᱤ', script: 'Ol Chiki', flag: '🇮🇳', isScheduleVIII: true, region: 'Jharkhand, Odisha, WB' },
  { code: 'ks', nameEng: 'Kashmiri', nameNative: 'کٲشُر / कॉशुर', script: 'Perso-Arabic / Devanagari', flag: '🇮🇳', isScheduleVIII: true, region: 'Jammu & Kashmir' },
  { code: 'ne', nameEng: 'Nepali', nameNative: 'नेपाली', script: 'Devanagari', flag: '🇮🇳', isScheduleVIII: true, region: 'Sikkim & West Bengal' },
  { code: 'sd', nameEng: 'Sindhi', nameNative: 'سنڌي / सिन्धी', script: 'Perso-Arabic / Devanagari', flag: '🇮🇳', isScheduleVIII: true, region: 'Pan-Indian' },
  { code: 'kok', nameEng: 'Konkani', nameNative: 'कोंकणी', script: 'Devanagari / Roman', flag: '🇮🇳', isScheduleVIII: true, region: 'Goa & Coastal Karnataka' },
  { code: 'doi', nameEng: 'Dogri', nameNative: 'डोगरी', script: 'Devanagari', flag: '🇮🇳', isScheduleVIII: true, region: 'Jammu' },
  { code: 'mni', nameEng: 'Manipuri (Meitei)', nameNative: 'ꯃꯤꯇꯩꯂꯣꯟ', script: 'Meitei Mayek', flag: '🇮🇳', isScheduleVIII: true, region: 'Manipur' },
  { code: 'brx', nameEng: 'Bodo', nameNative: 'बड़ो', script: 'Devanagari', flag: '🇮🇳', isScheduleVIII: true, region: 'Assam Bodoland' },
];

// Major Foreign Languages for Track B
export const FOREIGN_LANGUAGES: LanguageMeta[] = [
  { code: 'fr', nameEng: 'French', nameNative: 'Français', script: 'Latin', flag: '🇫🇷', isScheduleVIII: false, region: 'France, Francophone Africa, Canada' },
  { code: 'es', nameEng: 'Spanish', nameNative: 'Español', script: 'Latin', flag: '🇪🇸', isScheduleVIII: false, region: 'Spain, Latin America' },
  { code: 'de', nameEng: 'German', nameNative: 'Deutsch', script: 'Latin', flag: '🇩🇪', isScheduleVIII: false, region: 'Germany, Austria, Switzerland' },
  { code: 'ja', nameEng: 'Japanese', nameNative: '日本語', script: 'Kanji / Kana', flag: '🇯🇵', isScheduleVIII: false, region: 'Japan' },
  { code: 'ar', nameEng: 'Arabic', nameNative: 'العربية', script: 'Arabic', flag: '🇸🇦', isScheduleVIII: false, region: 'Middle East & North Africa' },
  { code: 'ru', nameEng: 'Russian', nameNative: 'Русский', script: 'Cyrillic', flag: '🇷🇺', isScheduleVIII: false, region: 'Russia & CIS' },
  { code: 'zh', nameEng: 'Mandarin Chinese', nameNative: '普通话 (中文)', script: 'Simplified Chinese', flag: '🇨🇳', isScheduleVIII: false, region: 'East Asia' },
  { code: 'pt', nameEng: 'Portuguese', nameNative: 'Português', script: 'Latin', flag: '🇵🇹', isScheduleVIII: false, region: 'Brazil, Portugal, Lusophone Africa' },
];

// Preconfigured Active Configurable Language Pairs
export const CONFIGURED_LANGUAGE_PAIRS: LanguagePair[] = [
  // Track A: Foreigners & Diaspora Learning Indian Languages
  {
    id: 'en-to-hi',
    sourceLang: 'en',
    targetLang: 'hi',
    track: 'trackA',
    title: 'English → Hindi (राष्ट्रभाषा हिन्दी)',
    description: 'Primary MEA track for foreign diplomats, diaspora NRI youth, and global scholars learning Hindi from English.',
    totalLearners: 124500,
    featured: true,
  },
  {
    id: 'fr-to-hi',
    sourceLang: 'fr',
    targetLang: 'hi',
    track: 'trackA',
    title: 'Français → Hindi',
    description: 'Apprendre le hindi pour les diplomates francophones et les étudiants internationaux.',
    totalLearners: 18200,
    featured: true,
  },
  {
    id: 'es-to-hi',
    sourceLang: 'es',
    targetLang: 'hi',
    track: 'trackA',
    title: 'Español → Hindi',
    description: 'Aprender hindi para hispanohablantes en misiones diplomáticas y relaciones comerciales.',
    totalLearners: 15400,
  },
  {
    id: 'ar-to-hi',
    sourceLang: 'ar',
    targetLang: 'hi',
    track: 'trackA',
    title: 'العربية → Hindi',
    description: 'تعلم اللغة الهندية للوفود الدبلوماسية ورجال الأعمال في منطقة الخليج العربي.',
    totalLearners: 21800,
  },
  {
    id: 'en-to-ta',
    sourceLang: 'en',
    targetLang: 'ta',
    track: 'trackA',
    title: 'English → Tamil (தமிழ்)',
    description: 'Classical Dravidian language learning for diaspora communities and researchers.',
    totalLearners: 34100,
  },
  {
    id: 'en-to-te',
    sourceLang: 'en',
    targetLang: 'te',
    track: 'trackA',
    title: 'English → Telugu (తెలుగు)',
    description: 'Learn Telugu for cultural immersion, trade, and diaspora connection.',
    totalLearners: 29400,
  },

  // Track B: Indians Learning Foreign Languages
  {
    id: 'hi-to-fr',
    sourceLang: 'hi',
    targetLang: 'fr',
    track: 'trackB',
    title: 'हिन्दी → French (Français)',
    description: 'भारतीय छात्रों, राजनयिकों और पेशेवरों के लिए फ्रेंच भाषा प्रशिक्षण।',
    totalLearners: 48900,
    featured: true,
  },
  {
    id: 'hi-to-de',
    sourceLang: 'hi',
    targetLang: 'de',
    track: 'trackB',
    title: 'हिन्दी → German (Deutsch)',
    description: 'जर्मनी में उच्च शिक्षा एवं तकनीकी अनुसंधान हेतु जर्मन भाषा पाठ्यक्रम।',
    totalLearners: 52300,
    featured: true,
  },
  {
    id: 'hi-to-ja',
    sourceLang: 'hi',
    targetLang: 'ja',
    track: 'trackB',
    title: 'हिन्दी → Japanese (日本語)',
    description: 'जापान में रोजगार, भारत-जापान साझेदारी व व्यापारिक संवाद हेतु।',
    totalLearners: 39800,
  },
  {
    id: 'hi-to-ar',
    sourceLang: 'hi',
    targetLang: 'ar',
    track: 'trackB',
    title: 'हिन्दी → Arabic (العربية)',
    description: 'खाड़ी देशों में राजनयिक पोस्टिंग एवं वाणिज्यिक सेवाओं हेतु अरबी भाषा शिक्षण।',
    totalLearners: 44100,
  },
  {
    id: 'hi-to-es',
    sourceLang: 'hi',
    targetLang: 'es',
    track: 'trackB',
    title: 'हिन्दी → Spanish (Español)',
    description: 'लैटिन अमेरिका व स्पेन के साथ व्यापार व कूटनीति के लिए स्पेनिश भाषा।',
    totalLearners: 31200,
  },
  {
    id: 'hi-to-ru',
    sourceLang: 'hi',
    targetLang: 'ru',
    track: 'trackB',
    title: 'हिन्दी → Russian (Русский)',
    description: 'भारत-रूस द्विपक्षीय रणनीतिक संवाद एवं उच्च तकनीकी शिक्षा हेतु रूसी भाषा।',
    totalLearners: 23600,
  },
];

// Goal-Based Tracks Metadata
export const GOAL_TRACKS_META: {
  id: GoalTrackId;
  titleEng: string;
  titleHindi: string;
  badge: string;
  descriptionEng: string;
  descriptionHindi: string;
  topics: string[];
  color: string;
  iconName: string;
}[] = [
  {
    id: 'diplomatic',
    titleEng: 'Diplomatic & Bilateral Protocol',
    titleHindi: 'राजनयिक व द्विपक्षीय शिष्टाचार प्रभाग',
    badge: 'MEA OFFICIAL PROTOCOL',
    descriptionEng: 'Formal bilateral courtesy, high-commission dialogues, joint communique vocabulary, and official state dinner etiquette.',
    descriptionHindi: 'दूतावास वार्ता, संधि व समझौता शब्दावली, संयुक्त वक्तव्य और राजकीय शिष्टाचार संवाद।',
    topics: ['Bilateral Welcoming & Honorifics', 'Joint Statement Vocabulary', 'Treaty & Memorandum of Understanding Phrases', 'Diplomatic Dinner Etiquette'],
    color: 'border-orange-500/40 bg-orange-50 text-orange-900',
    iconName: 'Building2',
  },
  {
    id: 'trade',
    titleEng: 'Commercial & Trade Terminology',
    titleHindi: 'वाणिज्यिक व व्यापारिक शब्दावली प्रभाग',
    badge: 'COMMERCE & EXIM',
    descriptionEng: 'Foreign trade agreements, customs & tariffs, bilateral investment treaties, chamber of commerce business negotiation phrases.',
    descriptionHindi: 'विदेशी व्यापार समझौते, सीमा शुल्क, निवेश संधियां और वाणिज्य चैंबर वार्ता शब्दावली।',
    topics: ['Tariffs & Customs Clearance', 'Supply Chain Invoicing', 'B2B Contract Negotiation', 'Joint Ventures & Rupee Trade Settlements'],
    color: 'border-emerald-500/40 bg-emerald-50 text-emerald-900',
    iconName: 'Briefcase',
  },
  {
    id: 'travel',
    titleEng: 'Travel, Culture & Diaspora Heritage',
    titleHindi: 'यात्रा, संस्कृति व प्रवासी संवाद प्रभाग',
    badge: 'HERITAGE & TOURISM',
    descriptionEng: 'Everyday conversational Hindi, heritage temple/monument tours, emergency medical assistance, and connecting with ancestral roots.',
    descriptionHindi: 'दैनिक बोलचाल, ऐतिहासिक पर्यटन स्थल, आपातकालीन सहायता और भारतीय संस्कृति से आत्मीय जुड़ाव।',
    topics: ['Airport, Transit & Hotel Check-in', 'Heritage Monuments & Guided Inquiries', 'Emergency & Medical Phrasing', 'Festivals & Traditional Greetings'],
    color: 'border-cyan-500/40 bg-cyan-50 text-cyan-900',
    iconName: 'Compass',
  },
];

// Sample Curated Lessons with Roman Script Transliteration for Goal Tracks
export const CURATED_GOAL_LESSONS: GoalTrackLesson[] = [
  {
    id: 'lesson_dip_101',
    goalTrackId: 'diplomatic',
    languagePairId: 'en-to-hi',
    level: 'A1',
    titleEng: 'Official Bilateral Courtesy & Welcome Protocol',
    titleNative: 'राजकीय शिष्टाचार एवं औपचारिक स्वागत संवाद',
    transliteration: 'Rajakeeya Shishtachar Evam Aupacharik Swagat Samvaad',
    category: 'Diplomatic Protocol',
    durationMins: 15,
    scenario: 'Welcoming a Foreign Delegation at Hyderabad House, New Delhi for Bilateral Consultations.',
    vocabulary: [
      {
        native: 'महामहिम, भारत में आपका हार्दिक स्वागत है।',
        transliteration: 'Mahamahim, Bharat mein aapka hardik swagat hai.',
        english: 'Your Excellency, a very warm welcome to India.',
        contextUsage: 'Used by diplomats when greeting Heads of Mission or Ministers.',
        audioPronunciationText: 'महामहिम, भारत में आपका हार्दिक स्वागत है।'
      },
      {
        native: 'द्विपक्षीय संबंध',
        transliteration: 'Dvipaksheeya Sambandh',
        english: 'Bilateral Relations',
        contextUsage: 'Referring to state-to-state diplomatic ties.',
        audioPronunciationText: 'द्विपक्षीय संबंध'
      },
      {
        native: 'परस्पर विश्वास एवं सहयोग',
        transliteration: 'Paraspar Vishwas Evam Sahayog',
        english: 'Mutual trust and cooperation',
        contextUsage: 'Standard closing clause in joint diplomatic briefings.',
        audioPronunciationText: 'परस्पर विश्वास एवं सहयोग'
      },
      {
        native: 'सहमति पत्र (एमओयू)',
        transliteration: 'Sehmati Patra (MoU)',
        english: 'Memorandum of Understanding',
        contextUsage: 'Official agreement signing ceremonies.',
        audioPronunciationText: 'सहमति पत्र'
      }
    ],
    dialogueLines: [
      {
        speaker: 'Indian Diplomat',
        role: 'Joint Secretary (MEA)',
        nativeText: 'नमस्ते महामहिम! विदेश मंत्रालय में आपका स्वागत है।',
        transliteration: 'Namaste Mahamahim! Videsh Mantralaya mein aapka swagat hai.',
        englishText: 'Greetings Your Excellency! Welcome to the Ministry of External Affairs.'
      },
      {
        speaker: 'Foreign Envoy',
        role: 'Ambassador',
        nativeText: 'धन्यवाद महोदय। दोनों देशों के द्विपक्षीय संबंधों को सशक्त करना हमारा लक्ष्य है।',
        transliteration: 'Dhanyavaad Mahoday. Donon deshon ke dvipaksheeya sambandhon ko sashakt karna hamara lakshya hai.',
        englishText: 'Thank you Sir. Our objective is to strengthen bilateral relations between both nations.'
      },
      {
        speaker: 'Indian Diplomat',
        role: 'Joint Secretary (MEA)',
        nativeText: 'हम ऊर्जा और डिजिटल तकनीक पर सहयोग बढ़ाने के लिए उत्सुक हैं।',
        transliteration: 'Hum oolja aur digital takneek par sahayog badhane ke liye utsuk hain.',
        englishText: 'We are eager to enhance cooperation in energy and digital technology.'
      }
    ],
    protocolNotes: 'In formal MEA Hindi diplomacy, always address senior dignitaries with "महामहिम" (Excellency) or "श्रीमान/श्रीमती" and use the honorific plural verb "हैं" rather than singular "है".',
    skillFocus: ['listening', 'speaking', 'reading']
  },
  {
    id: 'lesson_trade_101',
    goalTrackId: 'trade',
    languagePairId: 'en-to-hi',
    level: 'A2',
    titleEng: 'Trade Agreements & Port Customs Clearance',
    titleNative: 'व्यापार समझौता एवं पत्तन सीमा शुल्क प्रक्रिया',
    transliteration: 'Vyapar Samjhauta Evam Pattan Seema Shulk Prakriya',
    category: 'Commercial Terminology',
    durationMins: 20,
    scenario: 'Commercial Attache negotiating tariff concessions and supply chain clearance at Mumbai Port Trust.',
    vocabulary: [
      {
        native: 'मुक्त व्यापार समझौता',
        transliteration: 'Mukt Vyapar Samjhauta',
        english: 'Free Trade Agreement (FTA)',
        contextUsage: 'Tariff-free bilateral trade framework.',
        audioPronunciationText: 'मुक्त व्यापार समझौता'
      },
      {
        native: 'सीमा शुल्क छूट',
        transliteration: 'Seema Shulk Chhoot',
        english: 'Customs Duty Exemption',
        contextUsage: 'Exim documentation for essential goods.',
        audioPronunciationText: 'सीमा शुल्क छूट'
      },
      {
        native: 'रुपया व्यापार निपटान तंत्र',
        transliteration: 'Rupaya Vyapar Niptaan Tantra',
        english: 'Rupee Trade Settlement Mechanism',
        contextUsage: 'Bypassing third-party currency conversions.',
        audioPronunciationText: 'रुपया व्यापार निपटान तंत्र'
      }
    ],
    dialogueLines: [
      {
        speaker: 'Trade Commissioner',
        role: 'Commercial Envoy',
        nativeText: 'क्या इस खेप के लिए सीमा शुल्क मंजूरी प्रमाणपत्र उपलब्ध है?',
        transliteration: 'Kya is khep ke liye seema shulk manjoori pramaan-patra uplabdh hai?',
        englishText: 'Is the customs clearance certificate available for this consignment?'
      },
      {
        speaker: 'Port Authority Officer',
        role: 'Customs Director',
        nativeText: 'हाँ, सभी डिजिटल इनवॉयस और मूल प्रमाण पत्र सत्यापित हो चुके हैं।',
        transliteration: 'Haan, sabhi digital invoice aur mool pramaan patra satyapit ho chuke hain.',
        englishText: 'Yes, all digital invoices and certificates of origin have been verified.'
      }
    ],
    protocolNotes: 'Commercial negotiations emphasize precision with numerical quantities, currency codes (₹ INR), and exact delivery schedules.',
    skillFocus: ['reading', 'writing', 'listening']
  },
  {
    id: 'lesson_travel_101',
    goalTrackId: 'travel',
    languagePairId: 'en-to-hi',
    level: 'A1',
    titleEng: 'Airport Arrival, Metro Transit & Heritage Inquiries',
    titleNative: 'हवाई अड्डा आगमन, मेट्रो यात्रा व पर्यटन पूछताछ',
    transliteration: 'Hawai Adda Aagaman, Metro Yatra Va Paryatan Poochhtachh',
    category: 'Travel & Culture',
    durationMins: 12,
    scenario: 'Arriving at Indira Gandhi International Airport Terminal 3 and taking the Airport Express Metro.',
    vocabulary: [
      {
        native: 'नमस्ते, यह मेट्रो ट्रेन नई दिल्ली स्टेशन तक जाती है?',
        transliteration: 'Namaste, yeh metro train Nayi Dilli station tak jaati hai?',
        english: 'Hello, does this metro train go to New Delhi Station?',
        contextUsage: 'Transit station directional inquiry.',
        audioPronunciationText: 'नमस्ते, यह मेट्रो ट्रेन नई दिल्ली स्टेशन तक जाती है?'
      },
      {
        native: 'कृपया मुझे एक टिकट दीजिए।',
        transliteration: 'Kripaya mujhe ek ticket deejiye.',
        english: 'Please give me one ticket.',
        contextUsage: 'Purchasing transport or monument tickets.',
        audioPronunciationText: 'कृपया मुझे एक टिकट दीजिए।'
      },
      {
        native: 'आपातकालीन सहायता केंद्र',
        transliteration: 'Aapatkaleen Sahayata Kendra',
        english: 'Emergency Assistance Center / Tourist Police',
        contextUsage: 'Locating helpdesk personnel.',
        audioPronunciationText: 'आपातकालीन सहायता केंद्र'
      }
    ],
    dialogueLines: [
      {
        speaker: 'Diaspora Learner',
        role: 'Overseas Visitor',
        nativeText: 'नमस्ते भइया, कुतुब मीनार जाने के लिए सबसे अच्छा रास्ता कौन सा है?',
        transliteration: 'Namaste bhaiya, Qutub Minar jaane ke liye sabse achha raasta kaun sa hai?',
        englishText: 'Hello brother, which is the best way to reach Qutub Minar?'
      },
      {
        speaker: 'Information Desk',
        role: 'Tourist Assistant',
        nativeText: 'आप येलो लाइन मेट्रो लीजिए और कुतुब मीनार स्टेशन पर उतर जाइए।',
        transliteration: 'Aap Yellow Line Metro leejiye aur Qutub Minar station par utar jaaiye.',
        englishText: 'Take the Yellow Line Metro and deboard at Qutub Minar station.'
      }
    ],
    protocolNotes: 'Use courteous prefixes like "कृपया" (please) and "धन्यवाद" (thank you) for helpful and friendly local interactions.',
    skillFocus: ['listening', 'speaking']
  }
];
