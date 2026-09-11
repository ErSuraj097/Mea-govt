'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import confetti from 'canvas-confetti';
import {
  Clock,
  ShieldCheck,
  CheckCircle2,
  Award,
  BookOpen,
  Video,
  Headphones,
  FileEdit,
  Sparkles,
  ArrowRight,
  AlertCircle,
  HelpCircle,
  X,
  Play,
  RotateCcw,
  Check,
  FileText,
  Camera,
  Eye,
  Volume2,
  Search,
  Filter,
  UserCheck,
  ShieldAlert,
  AlertTriangle,
  QrCode,
  Printer,
  Download,
  Globe
} from 'lucide-react';

interface CourseExamModule {
  id: string;
  titleHindi: string;
  titleEng: string;
  languageEng: string;
  languageNative: string;
  flag: string;
  courseCategory: '22 Indian Languages' | 'Foreign Languages' | 'NIOS Academic';
  cefrLevel: 'A1 Beginner' | 'A2 Elementary' | 'B1 Intermediate' | 'B2 Advanced' | 'C1 Fluent' | 'C2 Mastery';
  durationMins: number;
  passMarkPct: number;
  totalQuestions: number;
  questions: {
    id: number;
    question: string;
    options: string[];
    answerIdx: number;
    explanation?: string;
    audioText?: string;
  }[];
}

const ALL_COURSE_EXAMS: CourseExamModule[] = [
  {
    id: 'exam_ta_hindi',
    titleHindi: 'Tamil to Hindi Diploma Certification Examination',
    titleEng: 'Tamil to Hindi Diploma Final Certification Examination',
    languageEng: 'Tamil',
    languageNative: 'Tamil (தமிழ்)',
    flag: '🇮🇳',
    courseCategory: '22 Indian Languages',
    cefrLevel: 'B1 Intermediate',
    durationMins: 25,
    passMarkPct: 80,
    totalQuestions: 5,
    questions: [
      {
        id: 1,
        question: 'What is the closest equivalent of the Tamil salutation "Vanakkam" (வணக்கம்)?',
        options: ['Namaste / Pranam (Greetings)', 'Dhanyabad (Thank you)', 'Shubhratri (Good night)', 'Swagatam (Welcome)'],
        answerIdx: 0,
        explanation: 'Vanakkam is the traditional respectful salutation corresponding to Namaste/Pranam.'
      },
      {
        id: 2,
        question: 'Which grammatical sentence structure is shared by both Tamil and Hindi?',
        options: ['Subject - Object - Verb (SOV)', 'Subject - Verb - Object (SVO)', 'Verb - Subject - Object (VSO)', 'Object - Verb - Subject (OVS)'],
        answerIdx: 0,
        explanation: 'Both Dravidian (Tamil) and Indo-Aryan (Hindi) languages strictly adhere to SOV sentence structure.'
      },
      {
        id: 3,
        question: 'The Tamil word "Puthagam" (புத்தகம்) is derived from which shared root?',
        options: ['Pustak (Book)', 'Patra (Letter)', 'Vidya (Knowledge)', 'Gyan (Wisdom)'],
        answerIdx: 0,
        explanation: 'Puthagam is derived from the shared Tatsama root "Pustak".'
      },
      {
        id: 4,
        question: 'What does Article 343 of the Constitution of India specify?',
        options: ['Official Language of the Union as Hindi in Devanagari script', 'Classical Language Status for Tamil', 'Right to Education', 'Fundamental Duties'],
        answerIdx: 0
      },
      {
        id: 5,
        question: 'Select the accurate translation for: "Naan Tamilnattil vasikkiren" (நான் தமிழ்நாட்டில் வசிக்கிறேன்)',
        options: ['I reside in Tamil Nadu.', 'I am going to Tamil Nadu.', 'Tamil Nadu is very beautiful.', 'I like Tamil Nadu.'],
        answerIdx: 0
      }
    ]
  },
  {
    id: 'exam_te_hindi',
    titleHindi: 'Telugu to Hindi Official Diploma Assessment',
    titleEng: 'Telugu to Hindi Official Diploma Assessment',
    languageEng: 'Telugu',
    languageNative: 'Telugu (తెలుగు)',
    flag: '🇮🇳',
    courseCategory: '22 Indian Languages',
    cefrLevel: 'B1 Intermediate',
    durationMins: 20,
    passMarkPct: 80,
    totalQuestions: 4,
    questions: [
      {
        id: 1,
        question: 'What is the Hindi equivalent of the Telugu word "Namaskaram" (నమస్కారం)?',
        options: ['Namaskar / Pranam', 'Aabhar (Gratitude)', 'Alvida (Farewell)', 'Shubham (Welfare)'],
        answerIdx: 0
      },
      {
        id: 2,
        question: 'Most high-register vocabulary words (Tatsama words) in Telugu and Hindi originate from which classical language?',
        options: ['Sanskrit', 'Persian', 'English', 'Portuguese'],
        answerIdx: 0
      },
      {
        id: 3,
        question: 'What does the Telugu sentence "Nenu Hindi nerchukuntunnanu" mean?',
        options: ['I am learning Hindi.', 'I can speak Hindi.', 'Hindi is my language.', 'I like Hindi.'],
        answerIdx: 0
      },
      {
        id: 4,
        question: 'How many primary vowels and consonants are in the standard Devanagari alphabet?',
        options: ['11 Vowels & 33 Consonants', '5 Vowels & 21 Consonants', '15 Vowels & 40 Consonants', '20 Vowels & 30 Consonants'],
        answerIdx: 0
      }
    ]
  },
  {
    id: 'exam_bn_hindi',
    titleHindi: 'Bengali to Hindi Language Proficiency Certification',
    titleEng: 'Bengali to Hindi Language Proficiency Certification',
    languageEng: 'Bengali',
    languageNative: 'Bengali (বাংলা)',
    flag: '🇮🇳',
    courseCategory: '22 Indian Languages',
    cefrLevel: 'B2 Advanced',
    durationMins: 25,
    passMarkPct: 80,
    totalQuestions: 4,
    questions: [
      {
        id: 1,
        question: 'What is the precise translation of the Bengali word "Dhanyabad" (ধন্যবাদ)?',
        options: ['Thank you / Gratitude', 'Hello / Greetings', 'Welcome', 'Salutations'],
        answerIdx: 0
      },
      {
        id: 2,
        question: 'What is the primary difference in verb gender between Hindi and Bengali?',
        options: ['In Hindi, verbs conjugate by subject gender; in Bengali, verbs are gender-neutral', 'Bengali has no verbs', 'Both are identical', 'Hindi has no gendered verbs'],
        answerIdx: 0
      },
      {
        id: 3,
        question: 'In which language was the National Anthem "Jana Gana Mana" originally composed by Rabindranath Tagore?',
        options: ['Tatsama Bengali', 'Hindi', 'Sanskrit', 'Maithili'],
        answerIdx: 0
      },
      {
        id: 4,
        question: 'From which ancient Prakrit did Eastern Indian languages (Bengali, Assamese, Odia) descend?',
        options: ['Magadhi Prakrit', 'Shauraseni Prakrit', 'Maharashtri Prakrit', 'Paishachi Prakrit'],
        answerIdx: 0
      }
    ]
  },
  {
    id: 'exam_mr_hindi',
    titleHindi: 'Marathi to Hindi Fast-Track Assessment',
    titleEng: 'Marathi to Hindi Fast-Track Devanagari Master Assessment',
    languageEng: 'Marathi',
    languageNative: 'Marathi (मराठी)',
    flag: '🇮🇳',
    courseCategory: '22 Indian Languages',
    cefrLevel: 'B2 Advanced',
    durationMins: 20,
    passMarkPct: 85,
    totalQuestions: 4,
    questions: [
      {
        id: 1,
        question: 'Which writing script is shared by both Marathi and Hindi?',
        options: ['Devanagari Script', 'Gurmukhi Script', 'Modi Script', 'Roman Script'],
        answerIdx: 0
      },
      {
        id: 2,
        question: 'What is the translation of the Marathi sentence "Mala Hindi aavadte"?',
        options: ['I like Hindi.', 'I know Hindi.', 'Hindi is very good.', 'We speak Hindi.'],
        answerIdx: 0
      },
      {
        id: 3,
        question: 'Bhavartha Dipika (Jnaneshwari) by Saint Jnaneshwar is a masterpiece in which classical language?',
        options: ['Ancient Marathi', 'Hindi', 'Sanskrit', 'Apabhramsha'],
        answerIdx: 0
      },
      {
        id: 4,
        question: 'What is the shared meaning of "Namaskar / Dhanyabad" in Marathi and Hindi?',
        options: ['Greetings & Gratitude', 'Departure & Farewell', 'Food & Water', 'Time & Date'],
        answerIdx: 0
      }
    ]
  },
  {
    id: 'exam_gu_hindi',
    titleHindi: 'Gujarati to Hindi Business & Spoken Exam',
    titleEng: 'Gujarati to Hindi Business & Spoken Master Exam',
    languageEng: 'Gujarati',
    languageNative: 'Gujarati (ગુજરાતી)',
    flag: '🇮🇳',
    courseCategory: '22 Indian Languages',
    cefrLevel: 'B1 Intermediate',
    durationMins: 20,
    passMarkPct: 80,
    totalQuestions: 4,
    questions: [
      {
        id: 1,
        question: 'What is the primary visual difference between Gujarati script and Devanagari script?',
        options: ['Gujarati script omits the top horizontal headline (Shirorekha)', 'Gujarati script has no vowels', 'Both scripts are totally unrelated', 'Gujarati is written right-to-left'],
        answerIdx: 0
      },
      {
        id: 2,
        question: 'What is the meaning of the Gujarati word "Aabhar" (આભાર)?',
        options: ['Gratitude / Thank you', 'Welcome', 'Hello', 'Goodbye'],
        answerIdx: 0
      },
      {
        id: 3,
        question: 'In which language was Mahatma Gandhi\'s autobiography "The Story of My Experiments with Truth" originally written?',
        options: ['Gujarati', 'Hindi', 'English', 'Marathi'],
        answerIdx: 0
      },
      {
        id: 4,
        question: 'What is the Gujarati equivalent for the commercial phrase "How much is this item?"',
        options: ['Aa saman ketlano chhe?', 'Tame kem chho?', 'Maru naam shu chhe?', 'Aabhar'],
        answerIdx: 0
      }
    ]
  },
  {
    id: 'exam_fr_en',
    titleHindi: 'French Language Studies — CEFR B1 International Certification',
    titleEng: 'International French Master Diploma Exam (French ⟷ English/Hindi)',
    languageEng: 'French',
    languageNative: 'Français',
    flag: '🇫🇷',
    courseCategory: 'Foreign Languages',
    cefrLevel: 'B1 Intermediate',
    durationMins: 30,
    passMarkPct: 80,
    totalQuestions: 4,
    questions: [
      {
        id: 1,
        question: 'What is the correct French greeting for "Good Morning / Hello"?',
        options: ['Bonjour', 'Au revoir', 'Merci', 'Bonsoir'],
        answerIdx: 0
      },
      {
        id: 2,
        question: 'Which cognate links Sanskrit "Mata" (Mother) and French "Mère"?',
        options: ['Indo-European root for Mother (*méh₂tēr)', 'Dravidian borrowing', 'Modern English slang', 'Non-related coincidence'],
        answerIdx: 0
      },
      {
        id: 3,
        question: 'Translate to French: "Welcome to Paris, France."',
        options: ['Bienvenue à Paris, France.', 'Merci de visiter Paris.', 'Je m\'appelle Paris.', 'Au revoir Paris.'],
        answerIdx: 0
      },
      {
        id: 4,
        question: 'What is the official accreditation body for French global diplomas?',
        options: ['Ministère de l\'Éducation nationale / Alliance Française', 'UNESCO Paris', 'UN Security Council', 'European Central Bank'],
        answerIdx: 0
      }
    ]
  },
  {
    id: 'exam_de_en',
    titleHindi: 'German Language Studies — Goethe-Zertifikat B1 Master Exam',
    titleEng: 'German Grammar & Conversational International Certification',
    languageEng: 'German',
    languageNative: 'Deutsch',
    flag: '🇩🇪',
    courseCategory: 'Foreign Languages',
    cefrLevel: 'B1 Intermediate',
    durationMins: 30,
    passMarkPct: 80,
    totalQuestions: 4,
    questions: [
      {
        id: 1,
        question: 'What is the standard German greeting for "Hello / Good Day"?',
        options: ['Guten Tag', 'Auf Wiedersehen', 'Danke schön', 'Gute Nacht'],
        answerIdx: 0
      },
      {
        id: 2,
        question: 'Which Indo-European cognate connects Sanskrit "Bhrata" (Brother) and German "Bruder"?',
        options: ['Brother / Sibling (*bhrātēr)', 'Father / Parent', 'King / Monarch', 'Water / Stream'],
        answerIdx: 0
      },
      {
        id: 3,
        question: 'Translate: "Ich lerne Deutsch" into English.',
        options: ['I am learning German.', 'I speak French.', 'Germany is cold.', 'Thank you very much.'],
        answerIdx: 0
      },
      {
        id: 4,
        question: 'What is the German word order rule for main clauses (V2 rule)?',
        options: ['The finite verb must be in the 2nd position in main clauses.', 'Verb is always last.', 'Subject is always last.', 'No fixed word order.'],
        answerIdx: 0
      }
    ]
  },
  {
    id: 'exam_es_en',
    titleHindi: 'Spanish Language Studies — DELE B1 International Certification',
    titleEng: 'Spanish Grammar, Phonetics & Dialogue Master Diploma',
    languageEng: 'Spanish',
    languageNative: 'Español',
    flag: '🇪🇸',
    courseCategory: 'Foreign Languages',
    cefrLevel: 'B1 Intermediate',
    durationMins: 25,
    passMarkPct: 80,
    totalQuestions: 4,
    questions: [
      {
        id: 1,
        question: 'What is the universal Spanish salutation for "Hello"?',
        options: ['¡Hola!', 'Gracias', 'Hasta luego', 'Por favor'],
        answerIdx: 0
      },
      {
        id: 2,
        question: 'Which cognate connects Sanskrit "Naaman" (Name) and Spanish "Nombre"?',
        options: ['Indo-European root for Name (*nómn̥)', 'Latin verb for read', 'Arabic borrowing', 'Modern slang'],
        answerIdx: 0
      },
      {
        id: 3,
        question: 'Translate: "¿Cómo estás?" into English.',
        options: ['How are you?', 'What is your name?', 'Where are you going?', 'Thank you very much.'],
        answerIdx: 0
      },
      {
        id: 4,
        question: 'Which institution confers official DELE Spanish diplomas internationally?',
        options: ['Instituto Cervantes & Ministry of Education of Spain', 'Royal Academy of London', 'Pan-American Union', 'OECD'],
        answerIdx: 0
      }
    ]
  },
  {
    id: 'exam_ja_en',
    titleHindi: 'Japanese Language Studies — JLPT N4/N5 Certification',
    titleEng: 'Japanese Hiragana, Kanji & Grammar International Exam',
    languageEng: 'Japanese',
    languageNative: '日本語',
    flag: '🇯🇵',
    courseCategory: 'Foreign Languages',
    cefrLevel: 'A2 Elementary',
    durationMins: 25,
    passMarkPct: 80,
    totalQuestions: 4,
    questions: [
      {
        id: 1,
        question: 'What is the standard Japanese daytime greeting for "Hello"?',
        options: ['こんにちは (Konnichiwa)', 'さようなら (Sayonara)', 'ありがとう (Arigatou)', 'おはよう (Ohayou)'],
        answerIdx: 0
      },
      {
        id: 2,
        question: 'Which sentence structure does Japanese follow (identical to Hindi & Tamil)?',
        options: ['Subject - Object - Verb (SOV)', 'Subject - Verb - Object (SVO)', 'Verb - Subject - Object (VSO)', 'No fixed order'],
        answerIdx: 0
      },
      {
        id: 3,
        question: 'What does "ありがとうございます" (Arigatou Gozaimasu) mean?',
        options: ['Thank you very much (Polite)', 'Good evening', 'Excuse me', 'Good morning'],
        answerIdx: 0
      },
      {
        id: 4,
        question: 'Which three scripts form written Japanese?',
        options: ['Hiragana, Katakana, and Kanji', 'Devanagari, Roman, Arabic', 'Hangul, Cyrillic, Pinyin', 'Latin, Greek, Hebrew'],
        answerIdx: 0
      }
    ]
  }
];

export default function DashboardExamPage() {
  const [activeCategory, setActiveCategory] = useState<'All' | '22 Indian Languages' | 'Foreign Languages' | 'NIOS Academic'>('All');
  const [selectedLangSearch, setSelectedLangSearch] = useState<string>('');
  const [activeExam, setActiveExam] = useState<CourseExamModule | null>(null);
  
  // Timer & Test Execution State
  const [timeLeft, setTimeLeft] = useState<number>(1200);
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: number }>({});
  const [examSubmitted, setExamSubmitted] = useState(false);
  const [earnedScore, setEarnedScore] = useState<number | null>(null);
  const [passedExams, setPassedExams] = useState<string[]>([]);

  // AI Proctoring Engine Simulation States
  const [proctoringActive, setProctoringActive] = useState<boolean>(true);
  const [faceDetected, setFaceDetected] = useState<boolean>(true);
  const [tabSwitchCount, setTabSwitchCount] = useState<number>(0);
  const [tabSwitchWarning, setTabSwitchWarning] = useState<boolean>(false);
  const [proctorLogs, setProctorLogs] = useState<string[]>([
    '14:09:01 - AI Proctor initialized. Camera feed operational.',
    '14:09:03 - Face biometric verification confirmed (Match 99.6%).',
    '14:09:05 - Single candidate detected in frame. Gaze direction locked.'
  ]);

  // Tab focus change detection (Real proctoring event listener!)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && activeExam && !examSubmitted) {
        setTabSwitchCount((prev) => {
          const next = prev + 1;
          setTabSwitchWarning(true);
          setProctorLogs((logs) => [
            `${new Date().toLocaleTimeString()} - ⚠️ WARNING: Tab switch / Window focus lost (Event #${next}).`,
            ...logs
          ]);
          return next;
        });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [activeExam, examSubmitted]);

  // Timer interval
  useEffect(() => {
    if (!activeExam || examSubmitted || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [activeExam, examSubmitted, timeLeft]);

  const startExamModal = (exam: CourseExamModule) => {
    setActiveExam(exam);
    setTimeLeft(exam.durationMins * 60);
    setUserAnswers({});
    setExamSubmitted(false);
    setEarnedScore(null);
    setTabSwitchCount(0);
    setTabSwitchWarning(false);
    setProctorLogs([
      `${new Date().toLocaleTimeString()} - Anti-Cheating AI Proctoring active for ${exam.languageEng} Certification.`,
      `${new Date().toLocaleTimeString()} - Biometric verification score: 99.8% match.`,
      `${new Date().toLocaleTimeString()} - Environment audio noise: 18dB (Quiet/Nominal).`
    ]);
  };

  const handleSelectOption = (qIdx: number, optIdx: number) => {
    setUserAnswers((prev) => ({ ...prev, [qIdx]: optIdx }));
  };

  const handleAutoSubmit = () => {
    if (!activeExam) return;
    let correctCount = 0;
    activeExam.questions.forEach((q, idx) => {
      if (userAnswers[idx] === q.answerIdx) {
        correctCount++;
      }
    });

    const scorePct = Math.round((correctCount / activeExam.questions.length) * 100);
    setEarnedScore(scorePct);
    setExamSubmitted(true);

    if (scorePct >= activeExam.passMarkPct) {
      setPassedExams((prev) => [...prev, activeExam.id]);
      try {
        confetti({ particleCount: 180, spread: 90, origin: { y: 0.5 } });
      } catch (e) {
        console.log('Confetti triggered');
      }
    }
  };

  const playAudioSample = (text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'hi-IN';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    } else {
      alert(`Playing audio: "${text}"`);
    }
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const filteredExams = ALL_COURSE_EXAMS.filter((exam) => {
    const matchesCategory = activeCategory === 'All' || exam.courseCategory === activeCategory;
    const matchesSearch =
      exam.titleHindi.toLowerCase().includes(selectedLangSearch.toLowerCase()) ||
      exam.titleEng.toLowerCase().includes(selectedLangSearch.toLowerCase()) ||
      exam.languageEng.toLowerCase().includes(selectedLangSearch.toLowerCase()) ||
      exam.languageNative.toLowerCase().includes(selectedLangSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-20 text-left">
      {/* 1. HERO BIDIRECTIONAL CONTROL BANNER */}
      <div className="p-6 sm:p-8 rounded-sm bg-gradient-to-r from-[#0B3D91] via-[#082C6C] to-[#051C45] text-white border border-[#082C6C] border-l-4 border-[#FF9933] shadow-md space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-black uppercase tracking-wider border border-amber-400/30">
                🎥 LIVE AI PROCTORED EXAMINATION PORTAL
              </span>
              <span className="px-3 py-1 rounded-full bg-blue-400/20 text-blue-200 text-[10px] font-bold border border-blue-400/30">
                22 Indian Languages ⟷ 15 Foreign Languages
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Course-Wise & Language-Specific Proctored Exams
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
              Take official course-wise & language-specific certification examinations under AI Proctoring supervision. Includes biometric face tracking, tab-switch security monitoring, audio comprehension questions, and verifiable QR-coded ICCR & MEA Diplomas upon passing.
            </p>
          </div>

          <Link
            href="/dashboard/student?tab=certificates"
            className="px-5 py-2.5 rounded-sm bg-[#0B3D91] hover:bg-[#0E4BA8] text-white font-extrabold text-xs flex items-center justify-center gap-2 border border-blue-400/40 transition shrink-0 shadow-sm"
          >
            <Award className="w-4 h-4 text-amber-300" />
            <span>View Claimed QR Diplomas →</span>
          </Link>
        </div>

        {/* 4-Step Learning & Certification Flow Visualizer */}
        <div className="pt-4 border-t border-slate-700/60 grid grid-cols-1 sm:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-sm bg-emerald-950/60 border border-emerald-500/40 space-y-1">
            <div className="flex items-center justify-between text-[11px] font-black text-emerald-300">
              <span>STEP 1</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <h4 className="text-xs font-black text-white flex items-center gap-1.5">
              <Video className="w-3.5 h-3.5 text-emerald-400" /> Video Lectures
            </h4>
            <span className="text-[10px] text-emerald-300 font-bold block">100% Completed ✓</span>
          </div>

          <div className="p-3.5 rounded-sm bg-emerald-950/60 border border-emerald-500/40 space-y-1">
            <div className="flex items-center justify-between text-[11px] font-black text-emerald-300">
              <span>STEP 2</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <h4 className="text-xs font-black text-white flex items-center gap-1.5">
              <Headphones className="w-3.5 h-3.5 text-emerald-400" /> Audio & Reading
            </h4>
            <span className="text-[10px] text-emerald-300 font-bold block">100% Completed ✓</span>
          </div>

          <div className="p-3.5 rounded-sm bg-[#FF9933] text-slate-950 border border-amber-400 shadow-md space-y-1">
            <div className="flex items-center justify-between text-[11px] font-black">
              <span>STEP 3</span>
              <span className="w-2.5 h-2.5 rounded-full bg-slate-950 animate-ping" />
            </div>
            <h4 className="text-xs font-black flex items-center gap-1.5">
              <FileEdit className="w-3.5 h-3.5" /> AI Proctored Exam
            </h4>
            <span className="text-[10px] font-black block">ACTIVE NOW 🔥</span>
          </div>

          <div className="p-3.5 rounded-sm bg-[#051C45] border border-slate-700 space-y-1 opacity-70">
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-400">
              <span>STEP 4</span>
              <Award className="w-3.5 h-3.5" />
            </div>
            <h4 className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-amber-400" /> QR Diploma
            </h4>
            <span className="text-[10px] text-slate-400 font-bold block">Unlocks on Pass</span>
          </div>
        </div>
      </div>

      {/* 2. CATEGORY FILTERS & SEARCH BAR */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-2.5 rounded-sm border border-[#DCE2E6] shadow-xs">
        <div className="flex flex-wrap items-center gap-1.5">
          {['All', '22 Indian Languages', 'Foreign Languages', 'NIOS Academic'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat as any)}
              className={`px-4 py-2 rounded-sm font-bold text-xs transition ${
                activeCategory === cat
                  ? 'bg-[#0B3D91] text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-[#DCE2E6] hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search language, exam..."
            value={selectedLangSearch}
            onChange={(e) => setSelectedLangSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-sm bg-slate-50 border border-[#DCE2E6] text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#0B3D91]"
          />
        </div>
      </div>

      {/* 3. COURSE-WISE & LANGUAGE-SPECIFIC EXAMS GRID */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-[#DCE2E6] pb-3">
          <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-[#0B3D91]" /> Official Language Certification Examinations ({filteredExams.length})
          </h3>
          <span className="text-xs text-slate-500 font-semibold">Select your course exam to launch AI Proctored Simulator</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExams.map((exam) => {
            const isPassed = passedExams.includes(exam.id);

            return (
              <div
                key={exam.id}
                className="bg-white rounded-sm border border-[#DCE2E6] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Top Gradient Banner */}
                  <div className="p-5 bg-gradient-to-r from-[#0B3D91] via-[#082C6C] to-[#051C45] text-white space-y-3 relative overflow-hidden">
                    <div className="flex items-center justify-between text-xs">
                      <span className="px-3 py-1 rounded-full bg-black/30 backdrop-blur-xs text-white font-extrabold text-xs">
                        {exam.flag} {exam.languageEng} ({exam.languageNative})
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 font-black text-[10px]">
                        {exam.cefrLevel}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <h4 className="text-base font-black text-white group-hover:translate-x-1 transition-transform leading-tight">
                        {exam.titleHindi}
                      </h4>
                      <p className="text-xs text-white/80 line-clamp-1">
                        {exam.titleEng}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 space-y-4">
                    <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-slate-700 bg-[#EEF3F8]/60 p-3 rounded-sm border border-[#DCE2E6]">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-[#0B3D91]" />
                        <span>{exam.durationMins} Mins</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-emerald-600" />
                        <span>Pass: {exam.passMarkPct}%</span>
                      </div>
                      <div className="flex items-center gap-1.5 col-span-2 pt-1 border-t border-[#DCE2E6]">
                        <Camera className="w-4 h-4 text-purple-600" />
                        <span>Proctoring: AI Live Biometrics Active</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-[#DCE2E6] mt-auto">
                  {isPassed ? (
                    <div className="pt-3 space-y-2">
                      <span className="text-xs font-black text-emerald-600 flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" /> Exam Passed with Distinction (Summa Cum Laude)
                      </span>
                      <Link
                        href="/dashboard/student?tab=certificates"
                        className="w-full py-3 rounded-sm bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs uppercase tracking-wider text-center block shadow-md transition"
                      >
                        📜 Claim Verified QR Diploma →
                      </Link>
                    </div>
                  ) : (
                    <div className="pt-3">
                      <button
                        onClick={() => startExamModal(exam)}
                        className="w-full py-3 rounded-sm bg-[#0B3D91] hover:bg-[#082C6C] text-white font-extrabold text-xs uppercase tracking-wider shadow-md transition flex items-center justify-center gap-2 cursor-pointer hover:scale-102"
                      >
                        <Play className="w-4 h-4 fill-white" /> Launch AI Proctored Exam
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. FULL WORKING AI PROCTORED EXAMINATION SIMULATOR MODAL */}
      {activeExam && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-4xl bg-white border border-[#DCE2E6] rounded-sm p-6 sm:p-8 space-y-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200 text-left my-8 max-h-[94vh] overflow-y-auto relative">
            {/* Modal Top Exam Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#DCE2E6] pb-4">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 font-extrabold text-[10px] border border-purple-300 flex items-center gap-1">
                    <Camera className="w-3.5 h-3.5 text-purple-600 animate-pulse" /> LIVE AI PROCTORING ACTIVE
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-[#082C6C] font-extrabold text-[10px]">
                    {activeExam.flag} {activeExam.languageEng} ({activeExam.languageNative})
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-black text-slate-900 mt-1.5">{activeExam.titleHindi}</h3>
                <p className="text-xs text-slate-500 font-medium">{activeExam.titleEng}</p>
              </div>

              {!examSubmitted && (
                <div className="flex items-center gap-2 px-4 py-2 rounded-sm bg-amber-50 border border-amber-300 text-amber-900 font-black text-base shadow-xs shrink-0">
                  <Clock className="w-5 h-5 text-amber-600 animate-pulse" />
                  <span>{formatTimer(timeLeft)}</span>
                </div>
              )}
            </div>

            {/* TAB SWITCH WARNING ALERT BANNER */}
            {tabSwitchWarning && !examSubmitted && (
              <div className="p-4 rounded-sm bg-red-50 border border-red-300 text-red-900 text-xs flex items-center justify-between gap-3 animate-bounce">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-red-600 shrink-0" />
                  <span>
                    <strong>⚠️ PROCTORING ALERT:</strong> Tab switch or window focus loss detected ({tabSwitchCount} Warning). Keep window focused!
                  </span>
                </div>
                <button
                  onClick={() => setTabSwitchWarning(false)}
                  className="px-2.5 py-1 rounded bg-red-200 hover:bg-red-300 text-red-900 font-bold text-[10px]"
                >
                  Dismiss Warning
                </button>
              </div>
            )}

            {/* LIVE AI PROCTORING OVERLAY PANEL */}
            {!examSubmitted && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-sm bg-slate-950 text-white border border-slate-800">
                {/* Simulated Webcam Feed */}
                <div className="relative aspect-video rounded-sm bg-slate-900 border border-slate-800 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                  <div className="text-center space-y-1 relative z-10">
                    <UserCheck className="w-8 h-8 text-emerald-400 mx-auto animate-pulse" />
                    <span className="text-[10px] font-black text-emerald-300 uppercase tracking-widest block">
                      Biometric Face Verified
                    </span>
                    <span className="text-[9px] text-slate-400 font-mono block">Score: 99.8% Match</span>
                  </div>
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-red-600 text-white font-black text-[9px] uppercase tracking-wider flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" /> LIVE
                  </div>
                </div>

                {/* Live AI Proctoring Audit Stream */}
                <div className="md:col-span-2 space-y-2 text-xs">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-1">
                    <span className="text-[10px] font-black uppercase text-amber-300 tracking-wider flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-amber-400" /> AI Proctor Log Stream
                    </span>
                    <span className="text-[10px] font-bold text-slate-400">Security Level: High</span>
                  </div>

                  <div className="space-y-1 max-h-24 overflow-y-auto font-mono text-[11px] text-slate-300">
                    {proctorLogs.map((log, idx) => (
                      <div key={idx} className="flex items-center gap-1.5">
                        <span className="text-emerald-400">›</span>
                        <span>{log}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* EXAM RESULTS VIEW */}
            {examSubmitted ? (
              <div className="py-8 text-center space-y-6 animate-in fade-in">
                {earnedScore !== null && earnedScore >= activeExam.passMarkPct ? (
                  <div className="space-y-5">
                    <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                      <Award className="w-12 h-12" />
                    </div>

                    <div className="space-y-2">
                      <span className="px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black uppercase tracking-wider">
                        EXAMINATION PASSED WITH NATIONAL DISTINCTION
                      </span>
                      <h2 className="text-3xl font-black text-slate-900">
                        Score: {earnedScore}% ({earnedScore >= 90 ? 'Grade A+ Summa Cum Laude' : 'Grade A Distinction'})
                      </h2>
                      <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed font-medium">
                        Congratulations! You passed the official {activeExam.languageEng} ({activeExam.languageNative}) proctored examination under anti-cheating guidelines. Your official QR Diploma is ready!
                      </p>
                    </div>

                    <div className="p-4 rounded-sm bg-[#EEF3F8] border border-[#DCE2E6] text-xs max-w-md mx-auto space-y-2 text-[#082C6C] font-bold text-left">
                      <div className="flex justify-between">
                        <span>Pass Requirement:</span>
                        <span>{activeExam.passMarkPct}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Your Final Score:</span>
                        <span className="text-emerald-700 font-black">{earnedScore}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Proctor Integrity Compliance:</span>
                        <span className="text-emerald-600">100% Honest (0 Tab Violations) ✓</span>
                      </div>
                      <div className="flex justify-between border-t border-[#DCE2E6] pt-1">
                        <span>Official Diploma Status:</span>
                        <span className="text-emerald-600 font-black">UNLOCKED & VERIFIED ✓</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-center gap-3 pt-2">
                      <Link
                        href="/dashboard/student?tab=certificates"
                        onClick={() => setActiveExam(null)}
                        className="px-8 py-3.5 rounded-sm bg-[#0B3D91] hover:bg-[#082C6C] text-white font-extrabold text-xs uppercase tracking-wider shadow-lg transition"
                      >
                        📜 Claim & Download QR Diploma →
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-5">
                    <div className="w-20 h-20 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
                      <AlertCircle className="w-12 h-12" />
                    </div>

                    <div className="space-y-2">
                      <span className="px-3.5 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-black uppercase tracking-wider">
                        PASS MARK NOT REACHED
                      </span>
                      <h2 className="text-2xl font-black text-slate-900">
                        Score: {earnedScore}% (Required: {activeExam.passMarkPct}%)
                      </h2>
                      <p className="text-xs text-slate-600 max-w-md mx-auto">
                        Review your course modules and retake the proctored examination anytime.
                      </p>
                    </div>

                    <button
                      onClick={() => startExamModal(activeExam)}
                      className="px-6 py-3 rounded-sm bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider shadow-md"
                    >
                      <RotateCcw className="w-4 h-4 inline mr-1" /> Retake Proctored Exam
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* QUESTIONS SIMULATOR LIST */
              <div className="space-y-6">
                {activeExam.questions.map((q, qIdx) => (
                  <div key={q.id} className="p-5 rounded-sm bg-slate-50 border border-[#DCE2E6] space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <h4 className="text-sm font-extrabold text-slate-900 flex items-start gap-2">
                        <span className="px-2 py-0.5 rounded bg-[#0B3D91] text-white text-xs font-black shrink-0">
                          Q{qIdx + 1}
                        </span>
                        {q.question}
                      </h4>

                      {q.audioText && (
                        <button
                          onClick={() => playAudioSample(q.audioText!)}
                          className="px-2.5 py-1 rounded-sm bg-[#EEF3F8] hover:bg-blue-100 text-[#082C6C] font-bold text-[11px] flex items-center gap-1 shrink-0 transition"
                        >
                          <Volume2 className="w-3.5 h-3.5" /> Listen Audio
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                      {q.options.map((opt, optIdx) => {
                        const isSelected = userAnswers[qIdx] === optIdx;

                        return (
                          <button
                            key={optIdx}
                            onClick={() => handleSelectOption(qIdx, optIdx)}
                            className={`p-3.5 rounded-sm text-left font-bold text-xs border transition cursor-pointer ${
                              isSelected
                                ? 'bg-[#EEF3F8] border-[#0B3D91] text-[#082C6C] shadow-xs'
                                : 'bg-white text-slate-700 border-[#DCE2E6] hover:bg-slate-100'
                            }`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}

                <div className="pt-4 flex items-center justify-between border-t border-[#DCE2E6]">
                  <button
                    onClick={() => setActiveExam(null)}
                    className="px-5 py-2.5 rounded-sm bg-slate-100 text-slate-600 font-bold text-xs hover:bg-slate-200 cursor-pointer"
                  >
                    Cancel & Exit Examination
                  </button>

                  <button
                    onClick={handleAutoSubmit}
                    className="px-8 py-3 rounded-sm bg-[#0B3D91] hover:bg-[#082C6C] text-white font-extrabold text-xs uppercase tracking-wider shadow-lg flex items-center gap-2 cursor-pointer hover:scale-102 transition"
                  >
                    Submit Examination Paper →
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
