export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'creator' | 'tester' | 'institute' | 'accounting' | 'admin';
  avatar: string;
  country: string;
  state: string;
  city: string;
  instituteId?: string;
  hindiLevel: string;
  xp: number;
  coins: number;
  streak: number;
  badges: Badge[];
  enrolledCourses: string[];
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
}

export interface LearningLevel {
  id: number;
  titleHindi: string;
  titleEng: string;
  cefr: string;
  description: string;
  totalLessons: number;
  requiredXp: number;
  coursesCount: number;
  unlocked: boolean;
  progress: number; // 0 - 100
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  levelId: number;
  titleHindi: string;
  titleEng: string;
  durationMins: number;
  xpReward: number;
  completed: boolean;
  type: 'vocab' | 'grammar' | 'speaking' | 'listening' | 'writing' | 'quiz';
  content: {
    introduction: string;
    rules?: string[];
    vocabulary?: { hindi: string; transliteration: string; english: string; audioText: string }[];
    sampleSentences?: { hindi: string; english: string }[];
    quizQuestions?: {
      id: string;
      question: string;
      options: string[];
      correctAnswer: number;
      explanation: string;
    }[];
  };
}

export interface VirtualTeacher {
  id: string;
  nameHindi: string;
  nameEng: string;
  roleTitle: string;
  avatarUrl: string;
  gender: 'male' | 'female';
  personality: string;
  assignedCourse: string;
  audioSampleText: string;
}

export interface Institute {
  id: string;
  nameHindi: string;
  nameEng: string;
  logo: string;
  city: string;
  state: string;
  accreditation: string;
  rating: number;
  coursesCount: number;
  contactEmail: string;
  phone: string;
  description: string;
  availableCenters: { city: string; area: string; seatsLeft: number }[];
}

export interface Competition {
  id: string;
  title: string;
  type: 'Country' | 'Global' | 'Institute' | 'Regional' | '1v1';
  startDate: string;
  endDate: string;
  participantsCount: number;
  prizePool: string;
  rules: string[];
  bannerUrl: string;
  status: 'active' | 'upcoming' | 'completed';
}

export interface LeaderboardUser {
  rank: number;
  id: string;
  name: string;
  country: string;
  institute: string;
  xp: number;
  streak: number;
  avatar: string;
  speakingScore: number;
  writingScore: number;
}

export interface LibraryItem {
  id: string;
  titleHindi: string;
  titleEng: string;
  category: 'Hindi Books' | 'Grammar Guides' | 'Stories' | 'Audiobooks' | 'Newspapers' | 'Academic Papers';
  author: string;
  coverImage: string;
  fileFormat: 'PDF' | 'AUDIO' | 'EPUB' | 'VIDEO';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  pagesOrDuration: string;
  downloadable: boolean;
  rating: number;
}

export interface LiveClass {
  id: string;
  title: string;
  teacherName: string;
  teacherAvatar: string;
  date: string;
  time: string;
  duration: string;
  meetingLink: string;
  registeredStudents: number;
  maxSeats: number;
  status: 'scheduled' | 'live' | 'completed';
}

export interface CertificateData {
  certificateId: string;
  studentName: string;
  courseTitle: string;
  instituteName: string;
  issueDate: string;
  score: number;
  grade: string;
  qrCodeUrl: string;
  verified: boolean;
}

export interface TransactionRecord {
  id: string;
  studentName: string;
  itemTitle: string;
  amount: number;
  gateway: 'Razorpay' | 'Stripe' | 'Apple IAP' | 'Google Play Billing';
  status: 'Success' | 'Pending' | 'Failed' | 'Refunded';
  date: string;
  invoiceUrl: string;
}

// MOCK DATA INITIAL STATE
export const MOCK_CURRENT_USER: User = {
  id: 'usr_101',
  name: 'Aarav Sharma (आरव)',
  email: 'aarav.sharma@example.com',
  role: 'student',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  country: 'India',
  state: 'Delhi',
  city: 'New Delhi',
  instituteId: 'inst_1',
  hindiLevel: 'Level 4 — Intermediate',
  xp: 2840,
  coins: 450,
  streak: 12,
  badges: [
    { id: 'b1', title: 'वर्णमाला विशेषज्ञ', description: 'Completed Hindi Alphabet Level 1', icon: '🔤', unlockedAt: '2026-08-10' },
    { id: 'b2', title: '7-Day Streak', description: 'Learned continuously for 7 days', icon: '🔥', unlockedAt: '2026-08-18' },
    { id: 'b3', title: 'AI Conversation Master', description: 'Completed 10 AI Chat sessions', icon: '🤖', unlockedAt: '2026-08-25' },
  ],
  enrolledCourses: ['crs_1', 'crs_2', 'crs_4'],
};

export const MOCK_USERS_BY_ROLE: Record<User['role'], User> = {
  student: MOCK_CURRENT_USER,
  teacher: {
    id: 'usr_tch_201',
    name: 'आचार्य आरव शास्त्री (Teacher)',
    email: 'teacher@hindi-lms.org',
    role: 'teacher',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    country: 'India',
    state: 'Delhi',
    city: 'New Delhi',
    instituteId: 'inst_1',
    hindiLevel: 'Level 7 — Professional Master',
    xp: 25400,
    coins: 3800,
    streak: 120,
    badges: [{ id: 'b_t1', title: 'Master Instructor', description: 'Taught over 500 students', icon: '🎓' }],
    enrolledCourses: [],
  },
  creator: {
    id: 'usr_cr_301',
    name: 'कबीर वर्मा (Course Creator)',
    email: 'creator@hindi-lms.org',
    role: 'creator',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    country: 'India',
    state: 'Uttar Pradesh',
    city: 'Varanasi',
    hindiLevel: 'Level 7 — Literature Specialist',
    xp: 18900,
    coins: 2400,
    streak: 85,
    badges: [{ id: 'b_c1', title: 'Curriculum Architect', description: 'Authored 15 Hindi modules', icon: '✍️' }],
    enrolledCourses: [],
  },
  tester: {
    id: 'usr_tst_401',
    name: 'डॉ. देवेन्द्र शर्मा (Quality Tester)',
    email: 'tester@hindi-lms.org',
    role: 'tester',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    country: 'India',
    state: 'Delhi',
    city: 'New Delhi',
    hindiLevel: 'Level 7 — Senior Auditor',
    xp: 21000,
    coins: 3100,
    streak: 95,
    badges: [{ id: 'b_qa1', title: 'Quality Guardian', description: 'Audited 100+ lessons', icon: '🛡️' }],
    enrolledCourses: [],
  },
  institute: {
    id: 'usr_inst_501',
    name: 'केंद्रीय हिंदी संस्थान एडमिन',
    email: 'institute@khs.edu.in',
    role: 'institute',
    avatar: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=300&q=80',
    country: 'India',
    state: 'Delhi',
    city: 'New Delhi',
    instituteId: 'inst_1',
    hindiLevel: 'Accredited Institution Admin',
    xp: 50000,
    coins: 10000,
    streak: 365,
    badges: [{ id: 'b_i1', title: 'Accredited Center', description: 'Govt. of India Institution', icon: '🏫' }],
    enrolledCourses: [],
  },
  accounting: {
    id: 'usr_acc_601',
    name: 'रजत गुप्ता (Chief Accountant)',
    email: 'finance@hindi-lms.org',
    role: 'accounting',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80',
    country: 'India',
    state: 'Delhi',
    city: 'New Delhi',
    hindiLevel: 'Financial Controller',
    xp: 15000,
    coins: 5000,
    streak: 50,
    badges: [{ id: 'b_f1', title: 'Auditor General', description: 'Managed ₹1M+ transactions', icon: '💰' }],
    enrolledCourses: [],
  },
  admin: {
    id: 'usr_adm_701',
    name: 'Super Admin (सिस्टम प्रशासक)',
    email: 'admin@hindi-lms.org',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80',
    country: 'India',
    state: 'Delhi',
    city: 'New Delhi',
    hindiLevel: 'Super Administrator',
    xp: 99999,
    coins: 50000,
    streak: 500,
    badges: [{ id: 'b_adm', title: 'Platform Commander', description: 'Full System RBAC Access', icon: '👑' }],
    enrolledCourses: [],
  },
};


export const MOCK_LEVELS: LearningLevel[] = [
  {
    id: 1,
    titleHindi: 'स्तर १ — प्रारम्भिक (Beginner)',
    titleEng: 'Level 1 — Fundamentals & Devanagari Script',
    cefr: 'A1.1',
    description: 'Learn Hindi vowels (स्वर), consonants (व्यंजन), and simple word formations.',
    totalLessons: 8,
    requiredXp: 0,
    coursesCount: 3,
    unlocked: true,
    progress: 100,
    lessons: [
      {
        id: 'les_1_1',
        levelId: 1,
        titleHindi: 'स्वर और व्यंजन (Vowels & Consonants)',
        titleEng: 'Hindi Vowels & Consonants',
        durationMins: 15,
        xpReward: 30,
        completed: true,
        type: 'vocab',
        content: {
          introduction: 'Welcome to Hindi Devanagari script! Devanagari is written from left to right.',
          vocabulary: [
            { hindi: 'अ', transliteration: 'a', english: 'as in Apple', audioText: 'अ से अनार' },
            { hindi: 'आ', transliteration: 'aa', english: 'as in Father', audioText: 'आ से आम' },
            { hindi: 'इ', transliteration: 'i', english: 'as in Ink', audioText: 'इ से इमली' },
            { hindi: 'ई', transliteration: 'ee', english: 'as in Eel', audioText: 'ई से ईख' },
            { hindi: 'क', transliteration: 'ka', english: 'as in Kite', audioText: 'क से कमल' },
            { hindi: 'ख', transliteration: 'kha', english: 'aspirated ka', audioText: 'ख से खरगोश' },
          ],
          sampleSentences: [
            { hindi: 'नमस्ते! मेरा नाम आरव है।', english: 'Hello! My name is Aarav.' },
            { hindi: 'आप कैसे हैं?', english: 'How are you?' },
          ],
          quizQuestions: [
            {
              id: 'q1',
              question: 'Which Hindi letter corresponds to the vowel "आ" (aa)?',
              options: ['अ', 'आ', 'इ', 'ई'],
              correctAnswer: 1,
              explanation: '"आ" sounds like "aa" as in Father.',
            },
          ],
        },
      },
      {
        id: 'les_1_2',
        levelId: 1,
        titleHindi: 'साधारण अभिवादन (Basic Greetings)',
        titleEng: 'Basic Greetings & Introductions',
        durationMins: 20,
        xpReward: 40,
        completed: true,
        type: 'speaking',
        content: {
          introduction: 'Master essential greetings in polite Hindi conversational tone.',
          vocabulary: [
            { hindi: 'नमस्ते', transliteration: 'Namaste', english: 'Hello / Greetings', audioText: 'नमस्ते' },
            { hindi: 'धन्यवाद', transliteration: 'Dhanyavaad', english: 'Thank you', audioText: 'धन्यवाद' },
            { hindi: 'शुभ प्रभात', transliteration: 'Shubh Prabhat', english: 'Good Morning', audioText: 'शुभ प्रभात' },
            { hindi: 'फिर मिलेंगे', transliteration: 'Phir Milenge', english: 'See you again', audioText: 'फिर मिलेंगे' },
          ],
          sampleSentences: [
            { hindi: 'आपका स्वागत है।', english: 'You are welcome.' },
            { hindi: 'सुप्रभात, गुरुजी!', english: 'Good morning, Teacher!' },
          ],
        },
      },
    ],
  },
  {
    id: 2,
    titleHindi: 'स्तर २ — मूलभूत (Basic)',
    titleEng: 'Level 2 — Basic Sentence Structure & Numbers',
    cefr: 'A1.2',
    description: 'Master Hindi numbers (१-५०), nouns, pronouns, and basic present tense verbs.',
    totalLessons: 10,
    requiredXp: 500,
    coursesCount: 4,
    unlocked: true,
    progress: 80,
    lessons: [
      {
        id: 'les_2_1',
        levelId: 2,
        titleHindi: 'सर्वनाम और क्रिया (Pronouns & Verbs)',
        titleEng: 'Personal Pronouns (मैं, तुम, आप)',
        durationMins: 20,
        xpReward: 50,
        completed: true,
        type: 'grammar',
        content: {
          introduction: 'Hindi has 3 levels of formal pronouns: मैं (I), तुम (Informal You), आप (Respectful You).',
          rules: [
            'मैं = I (accompanied by हूँ at sentence end)',
            'तुम = You informal (accompanied by हो)',
            'आप = You formal/respectful (accompanied by हैं)',
          ],
          vocabulary: [
            { hindi: 'मैं', transliteration: 'Main', english: 'I', audioText: 'मैं' },
            { hindi: 'तुम', transliteration: 'Tum', english: 'You (Informal)', audioText: 'तुम' },
            { hindi: 'आप', transliteration: 'Aap', english: 'You (Formal)', audioText: 'आप' },
            { hindi: 'वह', transliteration: 'Vah', english: 'He / She / That', audioText: 'वह' },
          ],
          sampleSentences: [
            { hindi: 'मैं छात्र हूँ।', english: 'I am a student.' },
            { hindi: 'आप शिक्षक हैं।', english: 'You are a teacher.' },
          ],
        },
      },
    ],
  },
  {
    id: 3,
    titleHindi: 'स्तर ३ — प्राथमिक (Elementary)',
    titleEng: 'Level 3 — Elementary Tenses & Daily Routines',
    cefr: 'A2.1',
    description: 'Learn Present Continuous, Past Simple, and future intention constructions.',
    totalLessons: 12,
    requiredXp: 1200,
    coursesCount: 5,
    unlocked: true,
    progress: 50,
    lessons: [
      {
        id: 'les_3_1',
        levelId: 3,
        titleHindi: 'वर्तमान काल और दैनिक दिनचर्या (Present Tense & Daily Routine)',
        titleEng: 'Present Continuous Tense & Daily Schedules',
        durationMins: 25,
        xpReward: 60,
        completed: false,
        type: 'grammar',
        content: {
          introduction: 'Learn how to describe activities happening right now using रहा है / रही है / रहे हैं.',
          rules: [
            'Masculine singular: रहा है (e.g. वह पढ़ रहा है)',
            'Feminine singular: रही है (e.g. वह लिख रही है)',
            'Plural / Formal: रहे हैं (e.g. वे जा रहे हैं)',
          ],
          vocabulary: [
            { hindi: 'पढ़ना', transliteration: 'Padhna', english: 'To Read / Study', audioText: 'पढ़ना' },
            { hindi: 'लिखना', transliteration: 'Likhna', english: 'To Write', audioText: 'लिखना' },
            { hindi: 'खाना', transliteration: 'Khaana', english: 'To Eat / Food', audioText: 'खाना' },
            { hindi: 'पीना', transliteration: 'Peena', english: 'To Drink', audioText: 'पीना' },
          ],
          sampleSentences: [
            { hindi: 'मैं हिंदी सीख रहा हूँ।', english: 'I am learning Hindi.' },
            { hindi: 'बच्चे मैदान में खेल रहे हैं।', english: 'Children are playing in the ground.' },
          ],
          quizQuestions: [
            {
              id: 'q3_1',
              question: 'Complete the sentence: "वह किताब _______ है।" (She is reading a book)',
              options: ['पढ़ रहा', 'पढ़ रही', 'पढ़ रहे', 'पढ़ते'],
              correctAnswer: 1,
              explanation: 'Since "वह" refers to female singular ("she"), use "पढ़ रही".',
            },
          ],
        },
      },
    ],
  },
  {
    id: 4,
    titleHindi: 'स्तर ४ — मध्यम (Intermediate)',
    titleEng: 'Level 4 — Fluency & Expressive Conversation',
    cefr: 'B1',
    description: 'Complex sentence connectors, storytelling, idioms, and public discourse.',
    totalLessons: 15,
    requiredXp: 2500,
    coursesCount: 6,
    unlocked: true,
    progress: 30,
    lessons: [
      {
        id: 'les_4_1',
        levelId: 4,
        titleHindi: 'मुहावरे और लोकोक्तियाँ (Idioms & Proverbs)',
        titleEng: 'Popular Hindi Idioms & Expressions',
        durationMins: 30,
        xpReward: 80,
        completed: false,
        type: 'vocab',
        content: {
          introduction: 'Idioms add rich expression and cultural nuance to conversational Hindi.',
          vocabulary: [
            { hindi: 'नौ दो ग्यारह होना', transliteration: 'Nau do gyarah hona', english: 'To run away / flee', audioText: 'नौ दो ग्यारह होना' },
            { hindi: 'अंगूठा दिखाना', transliteration: 'Angutha dikhana', english: 'To refuse at last minute', audioText: 'अंगूठा दिखाना' },
            { hindi: 'ईंट का जवाब पत्थर से देना', transliteration: 'Eent ka jawab patthar se dena', english: 'To give a fitting reply', audioText: 'ईंट का जवाब पत्थर से देना' },
          ],
          sampleSentences: [
            { hindi: 'पुलिस को देखते ही चोर नौ दो ग्यारह हो गया।', english: 'As soon as the thief saw the police, he fled.' },
          ],
          quizQuestions: [
            {
              id: 'q4_1',
              question: 'What is the figurative meaning of "नौ दो ग्यारह होना"?',
              options: ['To add numbers', 'To run away quickly', 'To celebrate', 'To fall asleep'],
              correctAnswer: 1,
              explanation: '"नौ दो ग्यारह होना" literally means 9+2=11, but idiomatically means to flee rapidly.',
            },
          ],
        },
      },
    ],
  },
  {
    id: 5,
    titleHindi: 'स्तर ५ — उच्च मध्यम (Upper Intermediate)',
    titleEng: 'Level 5 — Literature & Culture',
    cefr: 'B2',
    description: 'Hindi poetry (कविता), essays (निबंध), formal correspondence, and debate.',
    totalLessons: 15,
    requiredXp: 4500,
    coursesCount: 4,
    unlocked: true,
    progress: 0,
    lessons: [
      {
        id: 'les_5_1',
        levelId: 5,
        titleHindi: 'प्रेमचंद का साहित्य (Literature of Premchand)',
        titleEng: 'Premchand Short Stories & Analysis',
        durationMins: 35,
        xpReward: 100,
        completed: false,
        type: 'vocab',
        content: {
          introduction: 'Explore the realism and narrative depth of Munshi Premchand’s literary classics like Godaan and Eidgah.',
          vocabulary: [
            { hindi: 'साहित्य', transliteration: 'Sahitya', english: 'Literature', audioText: 'साहित्य' },
            { hindi: 'उपन्यास', transliteration: 'Upanyas', english: 'Novel', audioText: 'उपन्यास' },
            { hindi: 'यथार्थवाद', transliteration: 'Yatharthvaad', english: 'Realism', audioText: 'यथार्थवाद' },
          ],
          sampleSentences: [
            { hindi: 'प्रेमचंद को हिंदी उपन्यास का सम्राट माना जाता है।', english: 'Premchand is considered the emperor of Hindi novels.' },
          ],
          quizQuestions: [
            {
              id: 'q5_1',
              question: 'Who authored the famous Hindi novel "Godaan"?',
              options: ['Harivansh Rai Bachchan', 'Munshi Premchand', 'Jaishankar Prasad', 'Mahadevi Varma'],
              correctAnswer: 1,
              explanation: 'Godaan was written by Munshi Premchand in 1936.',
            },
          ],
        },
      },
    ],
  },
  {
    id: 6,
    titleHindi: 'स्तर ६ — उन्नत (Advanced)',
    titleEng: 'Level 6 — Professional & Technical Hindi',
    cefr: 'C1',
    description: 'Business Hindi, administrative vocabulary (राजभाषा), media & journalism.',
    totalLessons: 18,
    requiredXp: 7000,
    coursesCount: 3,
    unlocked: false,
    progress: 0,
    lessons: [
      {
        id: 'les_6_1',
        levelId: 6,
        titleHindi: 'राजभाषा एवं प्रशासनिक शब्दावली (Official Rajbhasha Terminology)',
        titleEng: 'Official Government Hindi & Administration',
        durationMins: 40,
        xpReward: 120,
        completed: false,
        type: 'grammar',
        content: {
          introduction: 'Master constitutional provisions, official circular drafting, and administrative terminology used in Indian government offices.',
          vocabulary: [
            { hindi: 'अधिसूचना', transliteration: 'Adhisuchna', english: 'Notification', audioText: 'अधिसूचना' },
            { hindi: 'अनुमोदन', transliteration: 'Anumodan', english: 'Approval / Endorsement', audioText: 'अनुमोदन' },
            { hindi: 'कार्यालय ज्ञापन', transliteration: 'Karyalaya Gyapan', english: 'Office Memorandum', audioText: 'कार्यालय ज्ञापन' },
          ],
          sampleSentences: [
            { hindi: 'यह प्रस्ताव सक्षम अधिकारी के अनुमोदन हेतु प्रस्तुत है।', english: 'This proposal is submitted for the approval of the competent authority.' },
          ],
          quizQuestions: [
            {
              id: 'q6_1',
              question: 'What is the English official equivalent of the Hindi term "अधिसूचना"?',
              options: ['Circular', 'Notification', 'Resolution', 'Memorandum'],
              correctAnswer: 1,
              explanation: '"अधिसूचना" translates to "Notification" in Rajbhasha government terminology.',
            },
          ],
        },
      },
    ],
  },
  {
    id: 7,
    titleHindi: 'स्तर ७ — विशेषज्ञ (Professional Master)',
    titleEng: 'Level 7 — Translation & Linguistics',
    cefr: 'C2',
    description: 'Simultaneous translation, classical Hindi texts, academic research, and certification.',
    totalLessons: 20,
    requiredXp: 10000,
    coursesCount: 2,
    unlocked: false,
    progress: 0,
    lessons: [
      {
        id: 'les_7_1',
        levelId: 7,
        titleHindi: 'द्रुत अनुवाद एवं भाषाविज्ञान (Simultaneous Translation & Linguistics)',
        titleEng: 'Simultaneous Translation Drills & Phonetics',
        durationMins: 45,
        xpReward: 150,
        completed: false,
        type: 'speaking',
        content: {
          introduction: 'Real-time English-to-Hindi and Hindi-to-English translation strategies for diplomatic and legal conferences.',
          vocabulary: [
            { hindi: 'द्विभाषिया', transliteration: 'Dwibhashiya', english: 'Interpreter / Bilingualist', audioText: 'द्विभाषिया' },
            { hindi: 'ध्वनिविज्ञान', transliteration: 'Dhwanivigyan', english: 'Phonetics', audioText: 'ध्वनिविज्ञान' },
          ],
          sampleSentences: [
            { hindi: 'अंतर्राष्ट्रीय मंच पर सटीक अनुवाद आवश्यक है।', english: 'Accurate translation is essential on international forums.' },
          ],
          quizQuestions: [
            {
              id: 'q7_1',
              question: 'What is the term for a person who provides simultaneous oral translation between languages?',
              options: ['लेखक', 'द्विभाषिया / अनुवादक', 'संपादक', 'प्रकाशक'],
              correctAnswer: 1,
              explanation: 'Dwibhashiya (द्विभाषिया) or Anuvadak (अनुवादक) refers to an interpreter/translator.',
            },
          ],
        },
      },
    ],
  },
];

export function findLessonById(lessonId: string) {
  let foundLesson: Lesson | null = null;
  let foundLevel: LearningLevel | null = null;
  let prevLesson: Lesson | null = null;
  let nextLesson: Lesson | null = null;

  const allLessons: { lesson: Lesson; level: LearningLevel }[] = [];

  for (const level of MOCK_LEVELS) {
    for (const les of level.lessons) {
      allLessons.push({ lesson: les, level });
    }
  }

  const index = allLessons.findIndex((item) => item.lesson.id === lessonId);

  if (index !== -1) {
    foundLesson = allLessons[index].lesson;
    foundLevel = allLessons[index].level;
    prevLesson = index > 0 ? allLessons[index - 1].lesson : null;
    nextLesson = index < allLessons.length - 1 ? allLessons[index + 1].lesson : null;
  } else {
    foundLesson = MOCK_LEVELS[0].lessons[0];
    foundLevel = MOCK_LEVELS[0];
    nextLesson = MOCK_LEVELS[0].lessons[1] || null;
  }

  return { lesson: foundLesson, level: foundLevel, prevLesson, nextLesson };
}

export const MOCK_TEACHERS: VirtualTeacher[] = [
  {
    id: 'tch_1',
    nameHindi: 'आचार्य आरव शास्त्री',
    nameEng: 'Acharya Aarav Shastri',
    roleTitle: 'Senior Hindi Grammar & Classical Literature Master',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    gender: 'male',
    personality: 'Formal, scholarly, encouraging, highly precise pronunciation.',
    assignedCourse: 'Advanced Hindi Grammar & Rajbhasha',
    audioSampleText: 'नमस्कार! मैं आचार्य आरव हूँ। आज हम हिंदी व्याकरण के गूढ़ नियमों को सरलता से समझेंगे।',
  },
  {
    id: 'tch_2',
    nameHindi: 'डॉ. अनन्या शर्मा',
    nameEng: 'Dr. Ananya Sharma',
    roleTitle: 'Conversational Hindi & Phonetics Specialist',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    gender: 'female',
    personality: 'Warm, engaging, natural daily speech style.',
    assignedCourse: 'Spoken Hindi for Global Professionals',
    audioSampleText: 'नमस्ते दोस्तों! मैं अनन्या हूँ। चलिए आज हिंदी में बातचीत का अभ्यास करते हैं।',
  },
  {
    id: 'tch_3',
    nameHindi: 'दीया मैम (बाल हिंदी गुरु)',
    nameEng: 'Diya Maam',
    roleTitle: 'Interactive & Gamified Learning Teacher for Beginners',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
    gender: 'female',
    personality: 'Energetic, fun-loving, uses songs, stories and rhymes.',
    assignedCourse: 'Hindi Alphabet & Storytelling for Beginners',
    audioSampleText: 'नमस्ते प्यारे बच्चों और नए साथियों! आओ मिलकर हिंदी सीखें!',
  },
  {
    id: 'tch_4',
    nameHindi: 'कबीर वर्मा',
    nameEng: 'Kabir Verma',
    roleTitle: 'Hindi Media, Translation & Public Speaking Coach',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    gender: 'male',
    personality: 'Dynamic, persuasive, modern terminology focus.',
    assignedCourse: 'Hindi Media & Creative Writing Masterclass',
    audioSampleText: 'स्वागत है! मैं कबीर हूँ। भाषा अभिव्यक्ति का सशक्त माध्यम है।',
  },
];

export const MOCK_INSTITUTES: Institute[] = [
  {
    id: 'inst_1',
    nameHindi: 'केंद्रीय हिंदी संस्थान, आगरा एवं दिल्ली',
    nameEng: 'Kendriya Hindi Sansthan (Central Institute of Hindi)',
    logo: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=200&q=80',
    city: 'New Delhi & Agra',
    state: 'Delhi / Uttar Pradesh',
    accreditation: 'Ministry of Education, Govt. of India Accredited',
    rating: 4.9,
    coursesCount: 14,
    contactEmail: 'admissions@khs.edu.in',
    phone: '+91 11 2685 4321',
    description: 'Premier autonomous institute under Ministry of Education offering government-certified Hindi diplomas for Indian and international students.',
    availableCenters: [
      { city: 'New Delhi', area: 'Qutub Institutional Area', seatsLeft: 12 },
      { city: 'Agra', area: 'Khandari Campus', seatsLeft: 25 },
      { city: 'Varanasi', area: 'BHU Campus', seatsLeft: 8 },
    ],
  },
  {
    id: 'inst_2',
    nameHindi: 'काशी हिंदू विश्वविद्यालय — हिंदी विभाग',
    nameEng: 'Banaras Hindu University — Dept of Hindi',
    logo: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=200&q=80',
    city: 'Varanasi',
    state: 'Uttar Pradesh',
    accreditation: 'UGC & NAAC A++ Accredited University',
    rating: 4.8,
    coursesCount: 10,
    contactEmail: 'hindi@bhu.ac.in',
    phone: '+91 542 236 8571',
    description: 'Historic center for Hindi linguistic excellence, classical literature, and certified language research programs.',
    availableCenters: [
      { city: 'Varanasi', area: 'Main BHU Campus', seatsLeft: 15 },
    ],
  },
  {
    id: 'inst_3',
    nameHindi: 'दिल्ली हिंदी अकादमी',
    nameEng: 'Delhi Hindi Academy',
    logo: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=200&q=80',
    city: 'New Delhi',
    state: 'Delhi',
    accreditation: 'Govt. of NCT of Delhi Approved',
    rating: 4.7,
    coursesCount: 8,
    contactEmail: 'info@delhihindiacademy.org',
    phone: '+91 11 2386 1122',
    description: 'Focuses on modern communicative Hindi, civil service exam preparation, and regional spoken Hindi mastery.',
    availableCenters: [
      { city: 'New Delhi', area: 'Connaught Place Center', seatsLeft: 30 },
      { city: 'Noida', area: 'Sector 62 Center', seatsLeft: 18 },
    ],
  },
];

export const MOCK_COMPETITIONS: Competition[] = [
  {
    id: 'comp_1',
    title: 'अंतर्राष्ट्रीय हिंदी ओलंपियाड २०२६ (Global Hindi Olympiad)',
    type: 'Global',
    startDate: '2026-09-01',
    endDate: '2026-09-14',
    participantsCount: 4520,
    prizePool: '₹5,00,000 + Gold Medal Certification',
    rules: [
      'Open to all learners across Level 1 to 7.',
      'Includes Quiz, AI Speaking fluency score, and Essay Writing submission.',
      'Top 10 candidates win trip to World Hindi Conference.',
    ],
    bannerUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
    status: 'active',
  },
  {
    id: 'comp_2',
    title: 'देश बनाम देश हिंदी वाक् युद्ध (India vs USA vs UK vs Japan)',
    type: 'Country',
    startDate: '2026-08-20',
    endDate: '2026-08-31',
    participantsCount: 1890,
    prizePool: 'Country Champion Trophy + 50,000 XP Pool',
    rules: [
      'Country ranks calculated based on average daily XP per active student.',
      'Special bonus points for completing daily speaking challenges.',
    ],
    bannerUrl: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=800&q=80',
    status: 'active',
  },
  {
    id: 'comp_3',
    title: 'संस्थान कप २०२६ (Inter-Institute Championship)',
    type: 'Institute',
    startDate: '2026-09-15',
    endDate: '2026-10-01',
    participantsCount: 850,
    prizePool: 'National Institute Excellence Shield',
    rules: ['Compete on behalf of your enrolled Institute.'],
    bannerUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80',
    status: 'upcoming',
  },
];

export const MOCK_LEADERBOARD: LeaderboardUser[] = [
  { rank: 1, id: 'l1', name: 'Priya Sharma', country: 'India 🇮🇳', institute: 'Kendriya Hindi Sansthan', xp: 14850, streak: 45, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80', speakingScore: 98, writingScore: 96 },
  { rank: 2, id: 'l2', name: 'David Smith', country: 'USA 🇺🇸', institute: 'Global Hindi Online', xp: 12400, streak: 38, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80', speakingScore: 92, writingScore: 94 },
  { rank: 3, id: 'l3', name: 'Kenji Takahashi', country: 'Japan 🇯🇵', institute: 'Tokyo India Cultural Center', xp: 11200, streak: 30, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80', speakingScore: 90, writingScore: 95 },
  { rank: 4, id: 'l4', name: 'Aarav Sharma (You)', country: 'India 🇮🇳', institute: 'Kendriya Hindi Sansthan', xp: 2840, streak: 12, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80', speakingScore: 88, writingScore: 85 },
  { rank: 5, id: 'l5', name: 'Sophia Mueller', country: 'Germany 🇩🇪', institute: 'Heidelberg Hindi Institute', xp: 2600, streak: 9, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80', speakingScore: 84, writingScore: 89 },
];

export const MOCK_LIBRARY: LibraryItem[] = [
  {
    id: 'lib_1',
    titleHindi: 'गोदान — मुंशी प्रेमचंद (Godaan by Premchand)',
    titleEng: 'Godaan — The Classic Novel by Munshi Premchand',
    category: 'Hindi Books',
    author: 'Munshi Premchand',
    coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80',
    fileFormat: 'PDF',
    difficulty: 'Intermediate',
    pagesOrDuration: '340 Pages',
    downloadable: true,
    rating: 4.9,
  },
  {
    id: 'lib_2',
    titleHindi: 'व्याकरण भारती — सम्पूर्ण हिंदी व्याकरण गाइड',
    titleEng: 'Vyakarana Bharti — Complete Hindi Grammar Master Reference',
    category: 'Grammar Guides',
    author: 'Dr. Devendra Sharma',
    coverImage: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=400&q=80',
    fileFormat: 'PDF',
    difficulty: 'Beginner',
    pagesOrDuration: '180 Pages',
    downloadable: true,
    rating: 4.8,
  },
  {
    id: 'lib_3',
    titleHindi: 'पंचतंत्र की प्रेरक कहानियाँ (Panchatantra Audio)',
    titleEng: 'Panchatantra Audio Stories for Pronunciation & Vocabulary',
    category: 'Audiobooks',
    author: 'Vishnu Sharma / Hindi LMS Audio',
    coverImage: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=400&q=80',
    fileFormat: 'AUDIO',
    difficulty: 'Beginner',
    pagesOrDuration: '2 Hours 15 Mins',
    downloadable: true,
    rating: 4.9,
  },
  {
    id: 'lib_4',
    titleHindi: 'दैनिक जागरण — विशेष राजभाषा एवं हिंदी समाचार बुलेटिन',
    titleEng: 'Dainik Jagran Special Hindi News & Editorial Digest',
    category: 'Newspapers',
    author: 'Editorial Board',
    coverImage: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=400&q=80',
    fileFormat: 'PDF',
    difficulty: 'Advanced',
    pagesOrDuration: '16 Pages Daily',
    downloadable: true,
    rating: 4.6,
  },
];

export const MOCK_LIVE_CLASSES: LiveClass[] = [
  {
    id: 'cls_1',
    title: 'उच्च स्तरीय हिंदी व्याकरण एवं शुद्ध उच्चारण सत्र',
    teacherName: 'आचार्य आरव शास्त्री',
    teacherAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    date: 'Today',
    time: '05:00 PM IST',
    duration: '60 Mins',
    meetingLink: 'https://meet.google.com/mock-hindi-lms-class',
    registeredStudents: 42,
    maxSeats: 50,
    status: 'scheduled',
  },
  {
    id: 'cls_2',
    title: 'दैनिक हिंदी वार्तालाप एवं समूह चर्चा (Group Discussion)',
    teacherName: 'डॉ. अनन्या शर्मा',
    teacherAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
    date: 'Tomorrow',
    time: '11:00 AM IST',
    duration: '45 Mins',
    meetingLink: 'https://zoom.us/j/mock-hindi-class-2',
    registeredStudents: 28,
    maxSeats: 30,
    status: 'scheduled',
  },
];

export const MOCK_CERTIFICATE: CertificateData = {
  certificateId: 'HLMS-2026-884920',
  studentName: 'Aarav Sharma (आरव शर्मा)',
  courseTitle: 'Diploma in Intermediate Hindi Proficiency (स्तर ४ — मध्यम)',
  instituteName: 'Kendriya Hindi Sansthan (Central Institute of Hindi, New Delhi)',
  issueDate: '28 August 2026',
  score: 94.5,
  grade: 'A+ (Distinction)',
  qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://hindi-lms.org/certificates/verify/HLMS-2026-884920',
  verified: true,
};

export const MOCK_CERTIFICATES = [MOCK_CERTIFICATE];


export const MOCK_TRANSACTIONS: TransactionRecord[] = [
  { id: 'tx_901', studentName: 'Aarav Sharma', itemTitle: 'Annual Pro Learning Subscription', amount: 3999, gateway: 'Razorpay', status: 'Success', date: '2026-08-01', invoiceUrl: '#invoice-901' },
  { id: 'tx_902', studentName: 'David Smith', itemTitle: 'BHU Certified Master Class', amount: 6500, gateway: 'Stripe', status: 'Success', date: '2026-08-12', invoiceUrl: '#invoice-902' },
  { id: 'tx_903', studentName: 'Sophia Mueller', itemTitle: 'Level 5 Literature Package', amount: 2499, gateway: 'Apple IAP', status: 'Success', date: '2026-08-20', invoiceUrl: '#invoice-903' },
  { id: 'tx_904', studentName: 'Kenji Takahashi', itemTitle: 'Kendriya Hindi Sansthan Exam Fee', amount: 1500, gateway: 'Google Play Billing', status: 'Success', date: '2026-08-25', invoiceUrl: '#invoice-904' },
];
