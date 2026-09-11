'use client';

import React, { useEffect, useState, Suspense } from 'react';
import DashboardSidebar from '@/components/layout/DashboardSidebar';
import NotificationCenter from '@/components/layout/NotificationCenter';
import SearchModal from '@/components/layout/SearchModal';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Search,
  Calendar,
  Globe,
  Flame,
  Zap,
  ChevronDown,
  User as UserIcon,
  LogOut,
  Shield,
  Award,
  BookOpen,
  CheckCircle2,
  Clock,
  Sparkles,
  Settings,
  HelpCircle,
  X
} from 'lucide-react';
import { getActiveRole, getStoredUser, setActiveRoleInStore, User } from '@/lib/lmsStore';

const ROLES_LIST: { id: User['role']; label: string; desc: string }[] = [
  { id: 'student', label: 'Student Console', desc: 'Learner & Exam Candidate' },
  { id: 'teacher', label: 'Teacher Console', desc: 'Faculty & Roster Evaluator' },
  { id: 'creator', label: 'Course Creator', desc: 'Curriculum & Quiz Author' },
  { id: 'tester', label: 'Quality Auditor', desc: 'QA Content Auditor' },
  { id: 'institute', label: 'Institute Admin', desc: 'Batches & Center Manager' },
  { id: 'accounting', label: 'Finance Controller', desc: 'Revenue & Fee Ledgers' },
  { id: 'admin', label: 'Super Admin', desc: 'System RBAC & Config' },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [role, setRole] = useState<User['role']>('student');
  const [user, setUser] = useState<User | null>(null);
  
  // Interactive Modal & Dropdown States
  const [searchOpen, setSearchOpen] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [streakOpen, setStreakOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    setRole(getActiveRole());
    setUser(getStoredUser());

    const handleUpdate = () => {
      setUser(getStoredUser());
    };

    window.addEventListener('userStateUpdated', handleUpdate);
    return () => window.removeEventListener('userStateUpdated', handleUpdate);
  }, [pathname]);

  const handleSwitchRole = (newRole: User['role']) => {
    setRole(newRole);
    setActiveRoleInStore(newRole);
    setProfileOpen(false);
    router.push(`/dashboard/${newRole}`);
  };

  const getFormattedDate = () => {
    const today = new Date();
    return today.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' });
  };

  return (
    <div className="min-h-screen flex bg-[#F8FAFC] text-slate-800 antialiased font-sans">
      {/* 1. Left Sidebar */}
      <Suspense fallback={<div className="w-64 bg-white border-r border-slate-200 h-screen shrink-0" />}>
        <DashboardSidebar />
      </Suspense>

      {/* 2. Main Workspace Right Pane */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* ENHANCED TOP DASHBOARD NAVIGATION BAR */}
        <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-[#DCE2E6] px-5 sm:px-6 py-2.5 flex items-center justify-between shadow-2xs">
          {/* Left Console Title & Welcome Message */}
          <div className="flex items-center gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-black text-[#1B2A4A] leading-tight">
                  Academic Console
                </h1>
                <span className="px-2 py-0.5 rounded-sm bg-[#EEF3F8] text-[#0B3D91] border border-[#D0DCE7] text-[10px] font-extrabold uppercase">
                  {role} Stream
                </span>
              </div>
              <p className="text-xs font-medium text-[#555555] hidden sm:block">
                Welcome back, <strong className="text-[#1B2A4A]">{user?.name || 'Aarav Sharma'}</strong> • National LMS Learning Portal
              </p>
            </div>
          </div>

          {/* Right Header Controls (Search, Calendar, Notifications, Streak, Profile) */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Search Input Trigger */}
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center justify-between px-3.5 py-2 rounded-sm bg-[#F5F5F5] hover:bg-[#EEF3F8] border border-[#DCE2E6] text-[#555555] hover:text-[#1B2A4A] text-xs w-36 sm:w-60 transition"
            >
              <div className="flex items-center gap-2 truncate">
                <Search className="w-4 h-4 text-[#555555] shrink-0" />
                <span className="truncate">Search courses, modules...</span>
              </div>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono font-bold bg-white text-slate-500 rounded border border-[#DCE2E6] shadow-2xs">
                ⌘K
              </kbd>
            </button>

            {/* 📅 Interactive Calendar Widget & Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setCalendarOpen(!calendarOpen);
                  setStreakOpen(false);
                  setProfileOpen(false);
                }}
                className={`px-3 py-2 rounded-sm border text-xs font-extrabold flex items-center gap-1.5 transition ${
                  calendarOpen
                    ? 'bg-[#0B3D91] text-white border-[#082C6C] shadow-xs'
                    : 'bg-white hover:bg-[#EEF3F8] border-[#DCE2E6] text-[#1B2A4A]'
                }`}
              >
                <Calendar className={`w-4 h-4 ${calendarOpen ? 'text-white' : 'text-[#0B3D91]'}`} />
                <span className="hidden md:inline">{getFormattedDate()}</span>
              </button>

              {calendarOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white border border-[#DCE2E6] rounded-sm shadow-xl z-50 p-4 space-y-3.5 text-left animate-in fade-in zoom-in-95 duration-150">
                  <div className="flex items-center justify-between border-b border-[#DCE2E6] pb-2.5">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#0B3D91]" />
                      <h4 className="font-extrabold text-sm text-[#1B2A4A]">Academic Schedule</h4>
                    </div>
                    <span className="text-[10px] font-extrabold uppercase text-[#0B3D91] bg-[#EEF3F8] border border-[#D0DCE7] px-2 py-0.5 rounded-sm">
                      TODAY: {getFormattedDate()}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <span className="text-[10px] font-extrabold uppercase text-[#555555] tracking-wider block">
                      UPCOMING TODAY & TOMORROW
                    </span>

                    <div className="p-2.5 rounded-sm bg-amber-50 border border-amber-200 text-xs space-y-1">
                      <div className="flex justify-between items-center font-bold text-amber-950">
                        <span>📹 Live Practice Class</span>
                        <span className="text-[10px] font-black text-amber-800">18:00 PM</span>
                      </div>
                      <p className="text-[11px] text-amber-900 font-medium">SOV Grammar & Sentence Construction with Dr. Devendra</p>
                    </div>

                    <div className="p-2.5 rounded-sm bg-emerald-50 border border-emerald-200 text-xs space-y-1">
                      <div className="flex justify-between items-center font-bold text-emerald-950">
                        <span>📝 Assignment Due</span>
                        <span className="text-[10px] font-black text-emerald-800">23:59 PM</span>
                      </div>
                      <p className="text-[11px] text-emerald-900 font-medium">Devanagari Written Practice Exercise Submission</p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setCalendarOpen(false);
                      router.push(`/dashboard/${role}?tab=classes`);
                    }}
                    className="w-full py-2 rounded-sm bg-[#0B3D91] hover:bg-[#082C6C] text-white font-extrabold text-xs transition text-center block"
                  >
                    View Complete Class Calendar →
                  </button>
                </div>
              )}
            </div>

            {/* 🔔 Notification Center */}
            <NotificationCenter />

            {/* 🔥 Interactive Streak Counter Pill & Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setStreakOpen(!streakOpen);
                  setCalendarOpen(false);
                  setProfileOpen(false);
                }}
                className={`px-3 py-2 rounded-sm border text-xs font-extrabold flex items-center gap-1.5 transition ${
                  streakOpen
                    ? 'bg-[#FF9933] text-[#051C45] border-[#E68A00] shadow-xs'
                    : 'bg-amber-50 hover:bg-amber-100/70 border-amber-200 text-amber-900'
                }`}
              >
                <Flame className="w-4 h-4 text-[#FF9933] fill-[#FF9933]" />
                <span>{user?.streak || 14} Days</span>
              </button>

              {streakOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white border border-[#DCE2E6] rounded-sm shadow-xl z-50 p-4 space-y-3.5 text-left animate-in fade-in zoom-in-95 duration-150">
                  <div className="flex items-center justify-between border-b border-[#DCE2E6] pb-2.5">
                    <div className="flex items-center gap-2">
                      <Flame className="w-5 h-5 text-[#FF9933] fill-[#FF9933]" />
                      <h4 className="font-extrabold text-sm text-[#1B2A4A]">Daily Learning Streak</h4>
                    </div>
                    <span className="px-2 py-0.5 rounded-sm bg-amber-100 text-amber-900 font-extrabold text-xs border border-amber-200">
                      🔥 {user?.streak || 14} DAYS
                    </span>
                  </div>

                  <div className="p-3.5 rounded-sm bg-gradient-to-r from-[#0B3D91] to-[#082C6C] text-white space-y-2 shadow-xs border-l-3 border-[#FF9933]">
                    <div className="flex justify-between items-center text-xs font-extrabold">
                      <span className="text-[#FF9933]">STREAK GOAL STATUS</span>
                      <span>14 / 30 DAYS</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-[#FF9933] h-1.5 rounded-full w-1/2" />
                    </div>
                    <span className="text-[11px] font-semibold block text-slate-200 pt-0.5">
                      🎉 +150 XP Earned Today! Complete 1 more lesson tomorrow.
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-[10px] font-extrabold uppercase text-[#555555] tracking-wider block">
                      WEEKLY STREAK ACTIVITY
                    </span>
                    <div className="grid grid-cols-7 gap-1 text-center">
                      {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, idx) => (
                        <div
                          key={idx}
                          className={`p-1.5 rounded-sm border font-extrabold text-xs ${
                            idx < 5
                              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                              : 'bg-amber-50 border-amber-200 text-amber-900'
                          }`}
                        >
                          <span className="block text-[9px] text-[#555555]">{day}</span>
                          ✓
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs p-2.5 rounded-sm bg-[#F5F5F5] border border-[#DCE2E6]">
                    <span className="font-bold text-[#1B2A4A] flex items-center gap-1.5">
                      <Shield className="w-4 h-4 text-[#0B3D91]" /> Streak Freeze Shield:
                    </span>
                    <span className="font-extrabold text-[#138808]">Active (1 Left)</span>
                  </div>
                </div>
              )}
            </div>

            {/* 👤 Enhanced User Profile Avatar & Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setProfileOpen(!profileOpen);
                  setCalendarOpen(false);
                  setStreakOpen(false);
                }}
                className="flex items-center gap-2 p-1 pl-2.5 rounded-sm bg-[#F5F5F5] hover:bg-[#EEF3F8] border border-[#DCE2E6] transition"
              >
                <div className="relative">
                  <div className="w-7 h-7 rounded-sm bg-[#0B3D91] text-amber-300 font-black text-xs flex items-center justify-center shadow-xs">
                    {user?.name?.[0] || 'A'}
                  </div>
                  <span className="absolute bottom-0 right-0 w-2 h-2 bg-[#138808] border-2 border-white rounded-full" />
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-[#555555] mr-1" />
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white border border-[#DCE2E6] rounded-sm shadow-xl z-50 p-3 divide-y divide-slate-100 text-xs text-left animate-in fade-in zoom-in-95 duration-150">
                  {/* User Login Info Header */}
                  <div className="p-2.5 space-y-2.5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-sm bg-[#0B3D91] text-amber-300 font-black text-base flex items-center justify-center shadow-xs shrink-0 border border-[#082C6C]">
                        {user?.name?.[0] || 'A'}
                      </div>
                      <div className="space-y-0.5 overflow-hidden">
                        <h4 className="font-extrabold text-sm text-[#1B2A4A] truncate">{user?.name || 'Aarav Sharma'}</h4>
                        <p className="text-[11px] text-[#555555] font-medium truncate">{user?.email || 'aarav.sharma@lms.edu.in'}</p>
                        <span className="text-[10px] font-extrabold uppercase text-[#0B3D91] bg-[#EEF3F8] border border-[#D0DCE7] px-2 py-0.5 rounded-sm inline-block mt-0.5">
                          Student • Level 4 Scholar
                        </span>
                      </div>
                    </div>

                    <div className="p-2 rounded-sm bg-[#F5F5F5] border border-[#DCE2E6] flex items-center justify-between text-xs font-bold text-[#1B2A4A]">
                      <span>Total Academic XP:</span>
                      <span className="text-amber-600 font-extrabold">2,450 XP ⚡</span>
                    </div>
                  </div>

                  {/* Profile Actions & Logout */}
                  <div className="pt-2 space-y-1">
                    <Link
                      href={`/dashboard/${role}?tab=overview`}
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2.5 px-2.5 py-2 rounded-sm font-bold text-[#1B2A4A] hover:bg-[#EEF3F8] hover:text-[#0B3D91] transition"
                    >
                      <UserIcon className="w-4 h-4 text-[#0B3D91]" /> Account Profile Details
                    </Link>

                    <Link
                      href={`/dashboard/${role}?tab=certificates`}
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2.5 px-2.5 py-2 rounded-sm font-bold text-[#1B2A4A] hover:bg-[#EEF3F8] hover:text-[#0B3D91] transition"
                    >
                      <Award className="w-4 h-4 text-[#FF9933]" /> My Accredited Certificates
                    </Link>

                    <Link
                      href="/login"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2.5 px-2.5 py-2 rounded-sm font-bold text-rose-600 hover:bg-rose-50 transition border-t border-slate-100 pt-2"
                    >
                      <LogOut className="w-4 h-4" /> Sign Out / Logout
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main Dashboard Content Window */}
        <main className="flex-1 p-6 sm:p-8 overflow-y-auto">
          <Suspense fallback={<div className="p-8 font-bold text-slate-400">Loading Console...</div>}>
            {children}
          </Suspense>
        </main>
      </div>

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}
