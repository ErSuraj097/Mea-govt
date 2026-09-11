'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  GraduationCap,
  Users2,
  PenTool,
  ShieldCheck,
  Building2,
  Landmark,
  ShieldAlert,
  Lock,
  Mail,
  Globe,
  LogIn,
  CheckCircle2,
  FileBadge,
  ArrowRight,
  Shield,
  KeyRound,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Eye,
  EyeOff,
  RotateCcw,
  UserCheck,
  HelpCircle
} from 'lucide-react';
import { loginUserByRole, loginWithGlobalAuth, User } from '@/lib/lmsStore';

interface RoleOption {
  role: User['role'];
  label: string;
  hindiLabel: string;
  name: string;
  email: string;
  icon: React.ElementType;
  tag: string;
  tagColor: string;
  desc: string;
  dashboardPath: string;
}

const LOGIN_ROLES: RoleOption[] = [
  {
    role: 'student',
    label: 'Student Console',
    hindiLabel: 'विद्यार्थी कंसोल',
    name: 'International Scholar / Diplomat',
    email: 'scholar.global@mea.gov.in',
    icon: GraduationCap,
    tag: 'Learners & Envoys',
    tagColor: 'bg-[#0B3D91] text-white',
    desc: 'Access Level 1-7 Hindi Pathway, Sambhasini AI Voice Tutor, Interactive Lessons & CEFR Diplomas',
    dashboardPath: '/dashboard/student'
  },
  {
    role: 'teacher',
    label: 'Teacher Console',
    hindiLabel: 'अध्यापक कंसोल',
    name: 'Senior Hindi Faculty / Linguist',
    email: 'faculty@mea.gov.in',
    icon: Users2,
    tag: 'Faculty & Tutors',
    tagColor: 'bg-[#138808] text-white',
    desc: 'Live Cohort Monitoring, Speech Phoneme Grading, Attendance Rosters & Homework Reviews',
    dashboardPath: '/dashboard/teacher'
  },
  {
    role: 'creator',
    label: 'Course Studio',
    hindiLabel: 'पाठ्यक्रम निर्माता',
    name: 'Curriculum Author / Studio Designer',
    email: 'curriculum@mea.gov.in',
    icon: PenTool,
    tag: 'Curriculum Authors',
    tagColor: 'bg-purple-700 text-white',
    desc: 'Multilingual Curriculum Builder, Lesson Authoring, Audio Waveform Alignment & Exam Banks',
    dashboardPath: '/dashboard/creator'
  },
  {
    role: 'tester',
    label: 'Quality Testing Hub',
    hindiLabel: 'गुणवत्ता परीक्षण केंद्र',
    name: 'Speech Acoustic & QA Auditor',
    email: 'qa-audit@mea.gov.in',
    icon: ShieldCheck,
    tag: 'QA & Speech Auditors',
    tagColor: 'bg-amber-700 text-white',
    desc: 'Audit Sambhasini AI Acoustic Models, Phoneme Accuracy, CEFR Calibration & GIGW 3.0 Approvals',
    dashboardPath: '/dashboard/tester'
  },
  {
    role: 'institute',
    label: 'Institute Admin',
    hindiLabel: 'संस्थान प्रशासन',
    name: 'Mission / SVCC Cultural Centre Officer',
    email: 'institute@khs.edu.in',
    icon: Building2,
    tag: 'Missions & SVCC',
    tagColor: 'bg-sky-700 text-white',
    desc: 'Manage Foreign Mission Batches, 38 SVCC Cultural Centres, Faculty Allocation & Diplomas',
    dashboardPath: '/dashboard/institute'
  },
  {
    role: 'accounting',
    label: 'Finance & Grants',
    hindiLabel: 'लेखा एवं वित्त',
    name: 'ICCR Grants & Finance Controller',
    email: 'finance@iccr.gov.in',
    icon: Landmark,
    tag: 'Finance & Grants',
    tagColor: 'bg-teal-700 text-white',
    desc: 'ICCR Fellowship Disbursements, Exam Fee Reconciliation & Government Fiscal Auditing',
    dashboardPath: '/dashboard/accounting'
  },
  {
    role: 'admin',
    label: 'Super Admin',
    hindiLabel: 'मुख्य प्रशासक',
    name: 'National Portal Chief Administrator',
    email: 'superadmin@mea.gov.in',
    icon: ShieldAlert,
    tag: 'System Governance',
    tagColor: 'bg-rose-800 text-white',
    desc: 'System Governance, CERT-In Audit Logs, User Management, Gateway Config & Security Tokens',
    dashboardPath: '/dashboard/admin'
  }
];

const PASSPORT_COUNTRIES = [
  'France',
  'United States of America',
  'United Kingdom',
  'Germany',
  'Japan',
  'Canada',
  'United Arab Emirates',
  'Australia',
  'Singapore',
  'South Africa',
  'Mauritius',
  'Fiji',
  'Guyana',
  'Suriname',
  'Trinidad & Tobago',
  'Other Global Jurisdiction'
];

const SAMPLE_CAPTCHAS = ['7K9X2', 'MEA49', 'IN88Q', 'G72PL', '9B5VA'];

export default function LoginPage() {
  const router = useRouter();
  
  // Category state: 'student' (default) vs 'admin' (administrative consoles)
  const [roleCategory, setRoleCategory] = useState<'student' | 'admin'>('student');
  // Role selection: defaults to 'student'
  const [selectedRole, setSelectedRole] = useState<User['role']>('student');
  const [authMethod, setAuthMethod] = useState<'email' | 'passport'>('email');

  // Form Fields
  const [email, setEmail] = useState('scholar.global@mea.gov.in');
  const [password, setPassword] = useState('DiplomatPass@2026');
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState('International Scholar');
  const [passportNumber, setPassportNumber] = useState('P9842104');
  const [passportCountry, setPassportCountry] = useState('France');
  const [rememberMe, setRememberMe] = useState(true);

  // Captcha State
  const [captchaIndex, setCaptchaIndex] = useState(0);
  const [captchaInput, setCaptchaInput] = useState('7K9X2');

  const currentRoleObj = LOGIN_ROLES.find((r) => r.role === selectedRole) || LOGIN_ROLES[0];

  const handleRefreshCaptcha = () => {
    const nextIdx = (captchaIndex + 1) % SAMPLE_CAPTCHAS.length;
    setCaptchaIndex(nextIdx);
    setCaptchaInput(SAMPLE_CAPTCHAS[nextIdx]);
  };

  const handleSelectCategory = (cat: 'student' | 'admin') => {
    setRoleCategory(cat);
    if (cat === 'student') {
      const studentRole = LOGIN_ROLES.find((r) => r.role === 'student')!;
      setSelectedRole('student');
      setEmail(studentRole.email);
      setFullName(studentRole.name);
    } else {
      // If switching to admin category and currently on student, pick Super Admin by default
      if (selectedRole === 'student') {
        const adminRole = LOGIN_ROLES.find((r) => r.role === 'admin')!;
        setSelectedRole('admin');
        setEmail(adminRole.email);
        setFullName(adminRole.name);
      }
    }
  };

  const handleSelectRole = (roleItem: RoleOption) => {
    setSelectedRole(roleItem.role);
    setEmail(roleItem.email);
    setFullName(roleItem.name);
  };

  const handlePerformLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (authMethod === 'passport') {
      loginWithGlobalAuth({
        method: 'passport',
        identifier: passportNumber,
        name: fullName || 'Global Diplomat',
        country: passportCountry
      });
      router.push('/dashboard/student');
    } else if (authMethod === 'email') {
      loginUserByRole(selectedRole);
      router.push(currentRoleObj.dashboardPath);
    } else {
      // 1-Click Quick Direct SSO
      loginUserByRole(selectedRole);
      router.push(currentRoleObj.dashboardPath);
    }
  };

  const adminRoles = LOGIN_ROLES.filter((r) => r.role !== 'student');
  const studentRoleObj = LOGIN_ROLES.find((r) => r.role === 'student')!;

  return (
    <div className="min-h-screen bg-[#F5F5F5] text-left text-[#212121] pb-16">
      
      {/* Top Breadcrumb & Portal Identifier */}
      <div className="bg-[#082C6C] text-white border-b border-[#051C45] py-2 px-4 sm:px-6 lg:px-8 text-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-[#FF9933] text-[#212121] font-bold text-[10px] uppercase rounded">
              AUTH PORTAL
            </span>
            <span className="text-slate-200">
              Ministry of External Affairs • Single Sign-On (SSO) Gateway
            </span>
          </div>
          <Link href="/" className="text-amber-300 hover:text-white font-semibold underline flex items-center gap-1">
            &larr; Return to Home
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 space-y-6">
        
        {/* Main Title Banner matching Landing Page */}
        <div className="bg-white border border-[#DCE2E6] border-l-4 border-l-[#0B3D91] p-5 sm:p-6 shadow-xs rounded-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#0B3D91] block">
              GOVERNMENT OF INDIA • DIPLOMATIC LMS
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#1B2A4A]">
              Sovereign Language Learning Console Sign In
            </h1>
            <p className="text-xs sm:text-sm text-[#555555]">
              Unified access for international scholars, faculty linguists, curriculum authors, and administrators.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-[#EEF3F8] border border-[#D0DCE7] px-3.5 py-2 rounded-md shrink-0">
            <ShieldCheck className="w-5 h-5 text-[#138808]" />
            <div className="text-left">
              <span className="text-[10px] uppercase tracking-wider font-bold text-[#0B3D91] block">SECURITY CLEARANCE</span>
              <span className="text-xs font-extrabold text-[#1B2A4A]">CERT-In 256-Bit SSL</span>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* MAIN SPLIT LAYOUT: LEFT ROLE SELECTOR / RIGHT LOGIN CONSOLE  */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* ========================================================== */}
          {/* LEFT 5 COLS: STUDENT & ADMINISTRATIVE CATEGORY SELECTOR    */}
          {/* ========================================================== */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Category Toggle Tabs */}
            <div className="bg-white border border-[#DCE2E6] p-3 rounded-md shadow-xs space-y-3">
              <span className="text-[11px] font-bold uppercase text-[#0B3D91] tracking-wider block">
                Select Workspace Category
              </span>

              <div className="grid grid-cols-2 gap-2 bg-[#EEF3F8] p-1.5 rounded-md border border-[#D0DCE7]">
                {/* 1. Student Tab (Default) */}
                <button
                  type="button"
                  onClick={() => handleSelectCategory('student')}
                  className={`py-2.5 px-3 rounded text-xs font-bold transition flex items-center justify-center gap-2 ${
                    roleCategory === 'student'
                      ? 'bg-[#0B3D91] text-white shadow-sm ring-2 ring-[#FF9933]'
                      : 'text-[#1B2A4A] hover:bg-white/80'
                  }`}
                >
                  <GraduationCap className="w-4 h-4 text-amber-300" />
                  <span>Student Console</span>
                </button>

                {/* 2. Administrative Tab */}
                <button
                  type="button"
                  onClick={() => handleSelectCategory('admin')}
                  className={`py-2.5 px-3 rounded text-xs font-bold transition flex items-center justify-center gap-2 ${
                    roleCategory === 'admin'
                      ? 'bg-[#0B3D91] text-white shadow-sm ring-2 ring-[#FF9933]'
                      : 'text-[#1B2A4A] hover:bg-white/80'
                  }`}
                >
                  <ShieldAlert className="w-4 h-4 text-[#FF9933]" />
                  <span>Administrative</span>
                </button>
              </div>
            </div>

            {/* If Category is 'student': Show Student Active Card */}
            {roleCategory === 'student' && (
              <div className="bg-white border-2 border-[#0B3D91] rounded-md shadow-xs p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 bg-[#0B3D91] text-amber-300 rounded-md flex items-center justify-center">
                      <GraduationCap className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase text-[#0B3D91] tracking-wider block">
                        DEFAULT ROLE
                      </span>
                      <h3 className="text-sm font-extrabold text-[#1B2A4A]">Student Console</h3>
                      <span className="text-[11px] text-[#555555]">विद्यार्थी कंसोल</span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 bg-[#138808] text-white text-[10px] font-bold uppercase rounded">
                    Active
                  </span>
                </div>

                <p className="text-xs text-[#555555] leading-relaxed">
                  Direct access to Hindi CEFR A1-B2 Pathways, Sambhasini AI Voice Tutor, Pronunciation Waveforms &amp; ICCR Certification.
                </p>

                <div className="bg-[#EEF3F8] border border-[#D0DCE7] p-3 rounded text-xs space-y-1">
                  <div className="flex justify-between">
                    <span className="text-[#555555]">Destination:</span>
                    <strong className="text-[#0B3D91] font-mono">/dashboard/student</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#555555]">Learning Pathway:</span>
                    <strong className="text-[#1B2A4A]">Level 1 - 7 (CEFR Standard)</strong>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleSelectCategory('admin')}
                  className="w-full py-2 bg-[#F8FAFC] hover:bg-[#EEF3F8] text-[#0B3D91] text-xs font-bold rounded border border-[#DCE2E6] flex items-center justify-center gap-1.5 transition"
                >
                  <ShieldAlert className="w-3.5 h-3.5 text-[#FF9933]" />
                  <span>Switch to Administrative Roles &rarr;</span>
                </button>
              </div>
            )}

            {/* If Category is 'admin': Show All Administrative Roles */}
            {roleCategory === 'admin' && (
              <div className="bg-white border border-[#DCE2E6] rounded-md shadow-xs p-4 space-y-3">
                <div className="flex items-center justify-between border-b border-[#DCE2E6] pb-2">
                  <span className="text-xs font-extrabold uppercase text-[#0B3D91] tracking-wider flex items-center gap-1.5">
                    <KeyRound className="w-3.5 h-3.5 text-[#FF9933]" />
                    Administrative &amp; Faculty Roles
                  </span>
                  <span className="text-[10px] text-[#555555]">Click role to load</span>
                </div>

                <div className="space-y-2">
                  {adminRoles.map((r) => {
                    const isSelected = selectedRole === r.role;
                    const IconComponent = r.icon;

                    return (
                      <button
                        key={r.role}
                        type="button"
                        onClick={() => handleSelectRole(r)}
                        className={`w-full p-3 rounded-md border text-left transition-all duration-150 flex items-center justify-between ${
                          isSelected
                            ? 'bg-[#0B3D91] text-white border-[#082C6C] shadow-sm ring-2 ring-[#FF9933]'
                            : 'bg-[#F8FAFC] hover:bg-[#EEF3F8] text-[#1B2A4A] border-[#DCE2E6] hover:border-[#0B3D91]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded flex items-center justify-center shrink-0 ${
                              isSelected ? 'bg-white/20 text-amber-300' : 'bg-white text-[#0B3D91] border border-[#D0DCE7]'
                            }`}
                          >
                            <IconComponent className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold block">{r.label}</span>
                              <span
                                className={`text-[9px] px-1.5 py-0.2 rounded font-bold uppercase ${
                                  isSelected ? 'bg-white/20 text-white' : r.tagColor
                                }`}
                              >
                                {r.tag}
                              </span>
                            </div>
                            <span
                              className={`text-[10px] font-medium block ${
                                isSelected ? 'text-slate-200' : 'text-[#555555]'
                              }`}
                            >
                              {r.hindiLabel}
                            </span>
                          </div>
                        </div>

                        <div className="text-right">
                          <ChevronRight
                            className={`w-4 h-4 transition-transform ${
                              isSelected ? 'text-[#FF9933] translate-x-0.5' : 'text-slate-400'
                            }`}
                          />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* GIGW Sovereign Badge */}
            <div className="bg-[#EEF3F8] border border-[#D0DCE7] p-3 rounded-md flex items-center gap-2.5 text-xs text-[#555555]">
              <ShieldCheck className="w-4 h-4 text-[#138808] shrink-0" />
              <span>
                Protected under <strong>Ministry of External Affairs</strong> authentication standards and CERT-In guidelines.
              </span>
            </div>

          </div>

          {/* ========================================================== */}
          {/* RIGHT 7 COLS: ACTIVE ROLE SIGN-IN CONSOLE (STUDENT DEFAULT)*/}
          {/* ========================================================== */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Proper Government Login Box */}
            <div className="bg-white border border-[#DCE2E6] rounded-md shadow-xs p-5 sm:p-7 space-y-5">
              
              {/* Active Role Header Banner */}
              <div className="flex items-center justify-between border-b border-[#DCE2E6] pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#0B3D91] text-amber-300 rounded-md flex items-center justify-center shadow-xs shrink-0">
                    <currentRoleObj.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded ${currentRoleObj.tagColor}`}>
                        {currentRoleObj.tag}
                      </span>
                      <span className="text-xs font-bold text-[#138808] flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Gov SSO Active
                      </span>
                    </div>
                    <h2 className="text-lg font-bold text-[#1B2A4A] mt-0.5">
                      {currentRoleObj.label} ({currentRoleObj.hindiLabel})
                    </h2>
                  </div>
                </div>

                <div className="text-right hidden sm:block">
                  <span className="text-[10px] uppercase font-bold text-[#555555] block">DESTINATION PATH</span>
                  <span className="text-xs font-mono font-bold text-[#0B3D91]">{currentRoleObj.dashboardPath}</span>
                </div>
              </div>

              {/* Login Method Tabs */}
              <div className="flex items-center justify-between bg-[#EEF3F8] p-1.5 rounded-md border border-[#D0DCE7]">
                <button
                  type="button"
                  onClick={() => setAuthMethod('email')}
                  className={`flex-1 py-2 px-3 rounded text-xs font-bold transition flex items-center justify-center gap-2 ${
                    authMethod === 'email'
                      ? 'bg-[#0B3D91] text-white shadow-xs'
                      : 'text-[#1B2A4A] hover:bg-white/60'
                  }`}
                >
                  <Mail className="w-4 h-4 text-amber-300" />
                  <span>Official Email / Scholar ID</span>
                </button>

                <button
                  type="button"
                  onClick={() => setAuthMethod('passport')}
                  className={`flex-1 py-2 px-3 rounded text-xs font-bold transition flex items-center justify-center gap-2 ${
                    authMethod === 'passport'
                      ? 'bg-[#0B3D91] text-white shadow-xs'
                      : 'text-[#1B2A4A] hover:bg-white/60'
                  }`}
                >
                  <FileBadge className="w-4 h-4 text-[#FF9933]" />
                  <span>Passport Verification</span>
                </button>
              </div>

              {/* Dynamic Login Form */}
              <form onSubmit={handlePerformLogin} className="space-y-4 pt-1">
                
                {authMethod === 'email' && (
                  <>
                    {/* User ID / Email */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-xs font-bold text-[#1B2A4A] flex items-center gap-1">
                          <span>Official Email ID / Diplomatic Roll Number</span>
                          <span className="text-rose-600">*</span>
                        </label>
                        <span className="text-[10px] text-[#555555]">Pre-filled for test</span>
                      </div>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-[#0B3D91] absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="name@mea.gov.in"
                          className="w-full bg-[#F5F5F5] hover:bg-white focus:bg-white border border-[#DCE2E6] focus:border-[#0B3D91] focus:ring-2 focus:ring-[#0B3D91]/20 rounded-md pl-9 pr-3 py-2.5 text-xs text-[#1B2A4A] font-semibold transition outline-none"
                          required
                        />
                      </div>
                    </div>

                    {/* Password */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-xs font-bold text-[#1B2A4A] flex items-center gap-1">
                          <span>Password / Secret PIN</span>
                          <span className="text-rose-600">*</span>
                        </label>
                        <button
                          type="button"
                          onClick={() => alert('For simulation, default credentials are prefilled. Click Sign In to enter.')}
                          className="text-[11px] text-[#0B3D91] hover:underline font-semibold"
                        >
                          Forgot Password?
                        </button>
                      </div>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-[#0B3D91] absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••••••"
                          className="w-full bg-[#F5F5F5] hover:bg-white focus:bg-white border border-[#DCE2E6] focus:border-[#0B3D91] focus:ring-2 focus:ring-[#0B3D91]/20 rounded-md pl-9 pr-10 py-2.5 text-xs text-[#1B2A4A] font-semibold transition outline-none"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          aria-label={showPassword ? 'Hide password' : 'Show password'}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#0B3D91] transition"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  </>
                )}

                {authMethod === 'passport' && (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-bold text-[#1B2A4A] block mb-1">
                          Full Legal Name (as on Passport) <span className="text-rose-600">*</span>
                        </label>
                        <div className="relative">
                          <UserCheck className="w-4 h-4 text-[#0B3D91] absolute left-3 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="e.g. International Scholar"
                            className="w-full bg-[#F5F5F5] hover:bg-white focus:bg-white border border-[#DCE2E6] focus:border-[#0B3D91] focus:ring-2 focus:ring-[#0B3D91]/20 rounded-md pl-9 pr-3 py-2.5 text-xs text-[#1B2A4A] font-semibold transition outline-none"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-bold text-[#1B2A4A] block mb-1">
                          Passport Identifier <span className="text-rose-600">*</span>
                        </label>
                        <div className="relative">
                          <FileBadge className="w-4 h-4 text-[#0B3D91] absolute left-3 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            value={passportNumber}
                            onChange={(e) => setPassportNumber(e.target.value)}
                            placeholder="e.g. P9842104"
                            className="w-full bg-[#F5F5F5] hover:bg-white focus:bg-white border border-[#DCE2E6] focus:border-[#0B3D91] focus:ring-2 focus:ring-[#0B3D91]/20 rounded-md pl-9 pr-3 py-2.5 text-xs text-[#1B2A4A] font-mono font-bold transition outline-none"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-[#1B2A4A] block mb-1">
                        Issuing Country / Jurisdiction <span className="text-rose-600">*</span>
                      </label>
                      <select
                        value={passportCountry}
                        onChange={(e) => setPassportCountry(e.target.value)}
                        className="w-full bg-[#F5F5F5] hover:bg-white focus:bg-white border border-[#DCE2E6] focus:border-[#0B3D91] focus:ring-2 focus:ring-[#0B3D91]/20 rounded-md px-3 py-2.5 text-xs text-[#1B2A4A] font-semibold transition outline-none"
                      >
                        {PASSPORT_COUNTRIES.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>
                  </>
                )}

                {/* Security Captcha Input Field */}
                <div className="bg-[#EEF3F8] border border-[#D0DCE7] p-3.5 rounded-md space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-[#1B2A4A] flex items-center gap-1">
                      <Shield className="w-3.5 h-3.5 text-[#138808]" />
                      <span>Security Verification (Captcha)</span>
                      <span className="text-rose-600">*</span>
                    </label>
                    <button
                      type="button"
                      onClick={handleRefreshCaptcha}
                      className="text-[11px] text-[#0B3D91] hover:underline flex items-center gap-1 font-semibold"
                    >
                      <RotateCcw className="w-3 h-3" /> Refresh
                    </button>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Visual Captcha Box */}
                    <div className="px-4 py-2 bg-gradient-to-r from-[#0B3D91] to-[#051C45] text-amber-300 font-mono text-base font-black tracking-widest rounded border border-[#082C6C] select-none shadow-2xs">
                      {SAMPLE_CAPTCHAS[captchaIndex]}
                    </div>

                    {/* Captcha Input */}
                    <input
                      type="text"
                      value={captchaInput}
                      onChange={(e) => setCaptchaInput(e.target.value)}
                      placeholder="Enter code above"
                      className="flex-1 bg-white border border-[#DCE2E6] focus:border-[#0B3D91] focus:ring-2 focus:ring-[#0B3D91]/20 rounded-md px-3 py-2 text-xs text-[#1B2A4A] font-mono font-bold tracking-wider outline-none uppercase"
                      required
                    />
                  </div>
                </div>

                {/* Remember Me & Session Duration */}
                <div className="flex items-center justify-between text-xs text-[#555555] pt-1">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded text-[#0B3D91] focus:ring-[#0B3D91] border-slate-300"
                    />
                    <span className="font-medium text-[#1B2A4A]">Keep session active (8 Hours)</span>
                  </label>
                  <span className="text-[10px] text-[#138808] font-bold flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> 256-Bit SSL
                  </span>
                </div>

                {/* Submit Sign In Button */}
                <button
                  type="submit"
                  className="w-full py-3 bg-[#0B3D91] hover:bg-[#082C6C] text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 rounded-md shadow-sm transition border-b-2 border-[#FF9933] hover:scale-101"
                >
                  <LogIn className="w-4 h-4 text-[#FF9933]" />
                  <span>Sign In to {currentRoleObj.label} &rarr;</span>
                </button>
              </form>

              {/* 1-Click Fast Sandbox SSO Helper Option */}
              <div className="p-3 bg-[#F8FAFC] border border-[#DCE2E6] rounded-md flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs">
                <div className="flex items-center gap-2 text-[#555555]">
                  <Sparkles className="w-4 h-4 text-[#FF9933] shrink-0" />
                  <span>Instant preview without manual credential entry?</span>
                </div>
                <button
                  type="button"
                  onClick={handlePerformLogin}
                  className="px-3 py-1.5 bg-[#FF9933] hover:bg-[#E68A2E] text-[#212121] font-bold text-[11px] rounded shadow-2xs whitespace-nowrap transition"
                >
                  1-Click Direct Launch &rarr;
                </button>
              </div>

              {/* Bottom Security Assurance */}
              <div className="pt-2 border-t border-[#DCE2E6] text-[10px] text-[#555555] text-center flex items-center justify-center gap-2 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-[#138808]" />
                <span>Ministry of External Affairs • GIGW 3.0 &amp; DPDP Act 2023 Compliant</span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
