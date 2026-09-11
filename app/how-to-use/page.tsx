'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  HelpCircle,
  BookOpen,
  Video,
  Bot,
  Award,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  ShieldCheck,
  UserCheck,
  Building2,
  Laptop,
  Check,
  Headphones,
  Send,
  Sparkles
} from 'lucide-react';

export default function HowToUsePage() {
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);
  const [activePersonaTab, setActivePersonaTab] = useState<'student' | 'teacher' | 'institute'>('student');
  const [supportMessage, setSupportMessage] = useState('');
  const [supportSubmitted, setSupportSubmitted] = useState(false);

  const guideSteps = [
    {
      stepNum: '01',
      titleHindi: '१. पाठ्यक्रम का चयन व निःशुल्क छात्रवृत्ति',
      titleEng: '1. Select Language Track & Claim Subsidy',
      desc: 'Choose from 22 Eighth Schedule Indian languages or 15 foreign language tracks. Apply scholarship coupon BHASHA2026 for 100% Govt Subsidy.',
      icon: BookOpen,
      color: 'bg-orange-600 text-white',
      badge: 'STEP 1: ENROLLMENT',
      actionText: '🚀 Explore 22 Languages Track',
      actionHref: '/dashboard/student?tab=indian-languages'
    },
    {
      stepNum: '02',
      titleHindi: '२. वीडियो व्याख्यान व ऑडियो पॉडकास्ट देखें',
      titleEng: '2. Watch HD Lectures & Audio Podcasts',
      desc: 'Access 4K video masterclasses covering Devanagari stroke order, SOV grammar rules, native audio podcasts, and NIOS textbook PDFs.',
      icon: Video,
      color: 'bg-cyan-600 text-white',
      badge: 'STEP 2: LEARNING RESOURCES',
      actionText: '🎥 Try Sample Free Lessons',
      actionHref: '/dashboard/student?tab=free-videos'
    },
    {
      stepNum: '03',
      titleHindi: '३. AI वीडियो शिक्षक से १v१ प्रत्यक्ष संवाद',
      titleEng: '3. 1v1 AI Video Call & WebCam Practice',
      desc: 'Connect live on 1v1 video calls with AI Professors Acharya Devendra & Vidya AI Tutor. Enable your webcam, ask questions out loud, and receive real-time audio lip-sync feedback.',
      icon: Bot,
      color: 'bg-amber-600 text-white',
      badge: 'STEP 3: AI TUTORING STUDIO',
      actionText: '📹 Call AI Video Teacher Now',
      actionHref: '/dashboard/student?tab=chatbot'
    },
    {
      stepNum: '04',
      titleHindi: '४. ऑनलाइन परीक्षा उत्तीर्ण करें व डिप्लोमा प्राप्त करें',
      titleEng: '4. Pass Assessment & Claim University Diploma',
      desc: 'Take timed online exams with automated anti-cheating grading. Score 80%+ to unlock official accredited central university diplomas with instant QR verification.',
      icon: Award,
      color: 'bg-emerald-600 text-white',
      badge: 'STEP 4: ACCREDITED CERTIFICATE',
      actionText: '📜 View Sample Certificate',
      actionHref: '/dashboard/student?tab=certificates'
    }
  ];

  const personaGuides = {
    student: [
      { step: '1', title: 'Sign In via Student Portal', desc: 'Click LMS Portal Sign In, choose Student Role, and use demo credentials or register.' },
      { step: '2', title: 'Enroll in 22 Language Modules', desc: 'Browse Devanagari stroke order, SOV grammar, and apply BHASHA2026 coupon.' },
      { step: '3', title: 'Practice 1v1 AI Video Calls', desc: 'Open AI Tutor Hub, turn on webcam, and speak Hindi out loud with Acharya Devendra.' },
      { step: '4', title: 'Attempt Online Anti-Cheating Exam', desc: 'Complete timed 15-min assessment and receive instant QR verified central diploma.' }
    ],
    teacher: [
      { step: '1', title: 'Access Faculty Console', desc: 'Switch to Faculty Teacher Console from top menu or login page.' },
      { step: '2', title: 'Monitor Student Speaking Progress', desc: 'Review AI speech recognition scores, webcam audio logs, and Devanagari handwriting.' },
      { step: '3', title: 'Schedule Live HD Video Classrooms', desc: 'Host multi-student live video lectures with interactive whiteboard and quiz battles.' },
      { step: '4', title: 'Approve & Grade Certifications', desc: 'Validate student diploma eligibility and issue government recognized credentials.' }
    ],
    institute: [
      { step: '1', title: 'Campus Admin Workspace', desc: 'Log into Institute Campus Admin portal for institutional oversight.' },
      { step: '2', title: 'Bulk Register Students & Faculty', desc: 'Import CSV rosters for university departments or school batches.' },
      { step: '3', title: 'Track NEP 2020 Credit Framework', desc: 'Monitor national education credit distribution and scholarship analytics.' },
      { step: '4', title: 'Physical Campus Pass Management', desc: 'Issue physical regional campus entry passes and digital identity cards.' }
    ]
  };

  const faqs = [
    {
      q: 'How do I use the 100% Free Govt Subsidy scholarship coupon BHASHA2026?',
      a: 'During student enrollment or registration, enter coupon code BHASHA2026 under the payment step to waive 100% of course tuition fees.'
    },
    {
      q: 'How does the 1v1 AI Video Teacher Call webcam integration work?',
      a: 'Navigate to the AI Teacher Hub, click "Launch AI Video Call Studio", allow browser webcam and microphone access, and speak directly to Acharya Devendra AI. The AI professor responds with spoken Hindi audio and 3D lip-sync video.'
    },
    {
      q: 'Are the language certificates accredited by Indian Central Universities?',
      a: 'Yes. All certificates are cryptographically QR-verified and recognized by Kendriya Hindi Sansthan Agra, CIIL Mysuru, BHU Varanasi, and Delhi University.'
    },
    {
      q: 'Can I learn Hindi if my native language is Tamil, Telugu, or Malayalam?',
      a: 'Yes! Our platform features dedicated Dravidian-Hindi phonetic bridge tracks specially designed for Southern Indian language speakers.'
    }
  ];

  const handleSupportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (supportMessage.trim()) {
      setSupportSubmitted(true);
      setSupportMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20 space-y-16">
      {/* Page Hero Header */}
      <section className="bg-slate-950 text-white py-16 px-4 sm:px-6 lg:px-8 border-b-4 border-amber-500 relative overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-4 text-center relative z-10">
          <span className="px-4 py-1.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-black uppercase tracking-widest border border-amber-400/40 inline-flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5 text-amber-400" /> STEP-BY-STEP USER GUIDE & FAQS
          </span>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight max-w-4xl mx-auto">
            LMS पोर्टल का उपयोग कैसे करें (User Guide & FAQs)
          </h1>

          <p className="text-slate-300 text-sm sm:text-base font-medium max-w-2xl mx-auto leading-relaxed">
            Follow our 4 simple steps from free course enrollment to accredited central university diploma issuance.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {guideSteps.map((st) => (
            <div
              key={st.stepNum}
              className="p-6 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-xs hover:shadow-xl transition-all duration-300 text-left flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-2xl ${st.color} flex items-center justify-center font-black shadow-md`}>
                    <st.icon className="w-6 h-6" />
                  </div>
                  <span className="text-xl font-black text-slate-300">STEP {st.stepNum}</span>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-black text-orange-600 uppercase tracking-widest block">{st.badge}</span>
                  <h3 className="text-base font-black text-slate-900">{st.titleEng}</h3>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">{st.desc}</p>
                </div>
              </div>

              <Link
                href={st.actionHref}
                className="w-full py-3 rounded-2xl bg-slate-100 hover:bg-orange-600 hover:text-white text-slate-800 font-extrabold text-xs uppercase tracking-wider text-center block transition shadow-2xs mt-4"
              >
                {st.actionText}
              </Link>
            </div>
          ))}
        </div>

        {/* EXTRA SECTION 1: Interactive Persona-Based Walkthrough Selector */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-6 text-left">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div className="space-y-1">
              <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-black uppercase tracking-wider border border-amber-200">
                ROLE WORKFLOWS
              </span>
              <h2 className="text-2xl font-black text-slate-900">Interactive Walkthrough by Role Persona</h2>
            </div>

            {/* Persona Tabs */}
            <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200 font-extrabold text-xs">
              <button
                onClick={() => setActivePersonaTab('student')}
                className={`px-4 py-2 rounded-xl transition ${
                  activePersonaTab === 'student'
                    ? 'bg-orange-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                🎓 Student
              </button>
              <button
                onClick={() => setActivePersonaTab('teacher')}
                className={`px-4 py-2 rounded-xl transition ${
                  activePersonaTab === 'teacher'
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                👨‍🏫 Faculty
              </button>
              <button
                onClick={() => setActivePersonaTab('institute')}
                className={`px-4 py-2 rounded-xl transition ${
                  activePersonaTab === 'institute'
                    ? 'bg-cyan-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                🏛️ Institute Admin
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {personaGuides[activePersonaTab].map((pStep, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-slate-900 text-amber-400 font-black text-xs flex items-center justify-center">
                  {pStep.step}
                </div>
                <h4 className="font-extrabold text-sm text-slate-900">{pStep.title}</h4>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">{pStep.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* EXTRA SECTION 2: Technical Readiness & System Compatibility */}
        <div className="p-8 rounded-3xl bg-slate-900 text-white space-y-6 shadow-xl border border-slate-800">
          <div className="space-y-1 text-left">
            <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-black uppercase tracking-widest border border-cyan-500/30">
              SYSTEM CHECKLIST
            </span>
            <h2 className="text-2xl font-black text-white">Browser & WebCam Technical Readiness Checklist</h2>
            <p className="text-xs text-slate-400 font-medium">Verify your device meets requirements for 1v1 AI Video tutoring and online exams.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
            <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
              <div className="flex items-center gap-2 text-orange-400 font-extrabold text-xs">
                <Laptop className="w-4 h-4" /> Supported Browsers
              </div>
              <p className="text-xs text-slate-300 font-medium">Google Chrome v100+, Microsoft Edge, Mozilla Firefox, Apple Safari (iOS/macOS).</p>
              <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1"><Check className="w-3 h-3" /> WebRTC Compliant</span>
            </div>

            <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
              <div className="flex items-center gap-2 text-cyan-400 font-extrabold text-xs">
                <Video className="w-4 h-4" /> WebCam & Microphone
              </div>
              <p className="text-xs text-slate-300 font-medium">Built-in or USB Webcam (720p minimum) + Standard Microphone for speech QA.</p>
              <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1"><Check className="w-3 h-3" /> Hardware Acceleration</span>
            </div>

            <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-extrabold text-xs">
                <ShieldCheck className="w-4 h-4" /> Internet Speed
              </div>
              <p className="text-xs text-slate-300 font-medium">256 kbps for audio podcasts & quizzes; 1.5 Mbps for 1v1 HD AI Video Call Studio.</p>
              <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1"><Check className="w-3 h-3" /> Low-Bandwidth Mode Supported</span>
            </div>
          </div>
        </div>

        {/* Student FAQs Section */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-6 text-left max-w-4xl mx-auto">
          <div className="space-y-1">
            <span className="px-3 py-1 rounded-full bg-orange-50 text-orange-700 text-xs font-black uppercase tracking-wider">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="text-2xl font-black text-slate-900">
              Student Support FAQs (सामान्य प्रश्नोत्तर)
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;

              return (
                <div key={idx} className="border border-slate-200 rounded-2xl overflow-hidden transition">
                  <button
                    onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                    className="w-full p-4 text-left font-extrabold text-sm text-slate-900 bg-slate-50 hover:bg-orange-50/50 flex items-center justify-between transition"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp className="w-5 h-5 text-orange-600 shrink-0" /> : <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />}
                  </button>
                  {isOpen && (
                    <div className="p-4 bg-white text-xs text-slate-600 font-medium leading-relaxed border-t border-slate-200">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* EXTRA SECTION 3: 24/7 Learner Support & Help Desk Box */}
        <div className="bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-3xl p-8 shadow-xl space-y-4 max-w-4xl mx-auto text-left">
          <div className="space-y-1">
            <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-black uppercase tracking-wider inline-flex items-center gap-1">
              <Headphones className="w-3.5 h-3.5" /> 24/7 LEARNER HELPDESK
            </span>
            <h3 className="text-2xl font-black text-white">Have a Question or Technical Issue?</h3>
            <p className="text-xs text-orange-100 font-medium">Submit your question below or launch our AI Help Desk Assistant for instant answer.</p>
          </div>

          {supportSubmitted ? (
            <div className="p-4 rounded-2xl bg-white/15 border border-white/30 text-white text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-300" /> Ticket submitted! Our student support team will respond within 24 hours.
            </div>
          ) : (
            <form onSubmit={handleSupportSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={supportMessage}
                onChange={(e) => setSupportMessage(e.target.value)}
                placeholder="Type your question or issue here..."
                className="flex-1 px-4 py-3 rounded-2xl bg-white text-slate-900 text-xs placeholder-slate-400 font-medium focus:outline-none"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-2xl bg-slate-950 hover:bg-slate-900 text-white font-extrabold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 shrink-0 shadow-md"
              >
                <Send className="w-4 h-4" /> Send Ticket
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
