'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  LayoutDashboard,
  BookOpen,
  Sparkles,
  Shield,
  Building2,
  DollarSign,
  BarChart3,
  Bot,
  Mic,
  FileEdit,
  Headphones,
  Trophy,
  Award,
  Video,
  MapPin,
  HelpCircle,
  LogOut,
  User as UserIcon,
  Zap,
  Flame,
  ChevronDown,
  ChevronRight,
  LogIn,
  CheckCircle2,
  History,
  Globe,
  Compass,
  Bookmark,
  FileText,
  X,
  Save,
  GraduationCap,
  PanelLeftClose,
  PanelLeftOpen,
  FileCheck2,
  Users2,
  PhoneCall
} from 'lucide-react';
import { getActiveRole, getStoredUser, saveStoredUser, User } from '@/lib/lmsStore';


interface SidebarItem {
  tabId: string;
  label: string;
  icon: any;
  badge?: string;
  subItems?: {
    tabId: string;
    label: string;
    badge?: string;
  }[];
}

interface SidebarGroup {
  groupTitle: string;
  items: SidebarItem[];
}

export default function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = getActiveRole();
  const activeTab = searchParams.get('tab') || 'overview';

  const [user, setUser] = useState<User | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [footerMenuOpen, setFooterMenuOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  // Dropdown open/close map state
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>({
    'courses-dropdown': true,
    'classes-dropdown': true,
    'free-dropdown': true,
    'ai-dropdown': true,
  });

  // Editable Student Profile Form State
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editBio, setEditBio] = useState('');

  useEffect(() => {
    const cur = getStoredUser();
    setUser(cur);
    setEditName(cur.name || 'Aarav Sharma');
    setEditEmail(cur.email || 'aarav.sharma@lms.edu.in');
    setEditBio('Class 10 CBSE Student • Devanagari Learner');

    const handleUpdate = () => {
      const updated = getStoredUser();
      setUser(updated);
    };

    window.addEventListener('userStateUpdated', handleUpdate);
    return () => window.removeEventListener('userStateUpdated', handleUpdate);
  }, []);

  const toggleDropdown = (id: string) => {
    setOpenDropdowns((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSaveProfile = () => {
    if (!user) return;
    const updatedUser: User = {
      ...user,
      name: editName,
      email: editEmail
    };

    saveStoredUser(updatedUser);
    setUser(updatedUser);
    setEditModalOpen(false);
    setFooterMenuOpen(false);

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('userStateUpdated'));
    }

    alert('✅ Student Profile Details updated successfully!');
  };

  const handleLogout = () => {
    setFooterMenuOpen(false);
    router.push('/login');
  };

  const roleSidebarData: Record<User['role'], { title: string; subtitle: string; groups: SidebarGroup[] }> = {
    student: {
      title: 'Student Console',
      subtitle: 'Learner • Class 10/12 Stream',
      groups: [
        {
          groupTitle: 'MAIN WORKSPACE',
          items: [
            { tabId: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard },
            {
              tabId: 'courses-dropdown',
              label: 'Courses & Masterclasses',
              icon: BookOpen,
              subItems: [
                { tabId: 'foreign-languages', label: ' Indian ➔ Foreign Languages', badge: '15' },
                { tabId: 'foreign-to-indian', label: ' Foreign ➔ Indian Languages', badge: '22' },
                { tabId: 'indian-languages', label: ' 22 Indian Languages (Bhasha)', badge: '22' },
              ],
            },
            {
              tabId: 'free-dropdown',
              label: 'Free Resources',
              icon: Video,
              badge: 'FREE',
              subItems: [
                { tabId: 'free-videos', label: 'Free Videos', badge: 'HD' },
                { tabId: 'free-audio', label: 'Free Audio', badge: 'Audio' },
                { tabId: 'guided-learning', label: 'Guided Study', badge: 'PDF' },
              ],
            },
            { tabId: 'levels', label: 'Levels Pathway', icon: BookOpen, badge: 'L1-L7' },
            { tabId: 'exam', label: 'Assessments & Exams', icon: HelpCircle, badge: '3' },
            {
              tabId: 'classes-dropdown',
              label: 'Classes & Training',
              icon: Video,
              badge: '2',
              subItems: [
                { tabId: 'classes', label: 'Live Classes (Online)' },
                { tabId: 'physical', label: 'Physical Classes (Offline)' },
              ],
            },
            { tabId: 'competitions', label: 'Competitions', icon: Trophy },
            { tabId: 'leaderboard', label: 'Leaderboard', icon: BarChart3 },
            { tabId: 'institutes', label: 'Institutes', icon: Building2 },
            { tabId: 'library', label: 'Library', icon: BookOpen },
          ],
        },
        {
          groupTitle: 'MEA GLOBAL & COMMUNITY',
          items: [
            { tabId: 'diagnostic', label: 'AI Placement Diagnostic', icon: FileCheck2, badge: 'AI/ML' },
            // { tabId: 'showcase', label: 'Creative Showcase Gallery', icon: Sparkles, badge: 'Gallery' },
            { tabId: 'language-circles', label: 'Live Language Circles', icon: Users2, badge: 'Live' },
          ],
        },



        {
          groupTitle: 'AI LEARNING TOOLS',
          items: [
            { tabId: 'ai-calls', label: 'JETHAT AI Practice Call', icon: PhoneCall, badge: 'Live' },
            { tabId: 'chatbot', label: 'AI Teacher Hub', icon: Bot, badge: 'Online' },
            { tabId: 'speaking-test', label: 'AI Speaking Test', icon: Mic, badge: 'Voice' },
            { tabId: 'writing-test', label: 'AI Writing Test', icon: FileEdit, badge: 'Grammar' },
            { tabId: 'listening-test', label: 'AI Listening Test', icon: Headphones, badge: 'Audio' },
            // { tabId: 'avatar', label: 'Digital Avatars', icon: Sparkles, badge: '3D' },
            // { tabId: 'certificates', label: 'My Certificates', icon: Shield },
            // { tabId: 'account-details', label: 'Account & Payments', icon: DollarSign, badge: 'Paid' },
          ],
        },

        {
          groupTitle: 'PROFILE & SUPPORT',
          items: [
            { tabId: 'avatar', label: 'Digital Avatars', icon: Sparkles, badge: '3D' },
            { tabId: 'certificates', label: 'My Certificates', icon: Shield },
            { tabId: 'account-details', label: 'Account & Payments', icon: DollarSign, badge: 'Paid' },
            { tabId: 'tickets', label: 'Support & Help Desk', icon: HelpCircle, badge: '24/7' },
          ],
        },

      ],
    },

    teacher: {
      title: 'Teacher Console',
      subtitle: 'Faculty & Student Evaluator',
      groups: [
        {
          groupTitle: 'MAIN WORKSPACE',
          items: [
            { tabId: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard },
            { tabId: 'classes', label: 'Schedule Live Class', icon: Video, badge: '2 Upcoming' },
            { tabId: 'assignments', label: 'Student Assignments', icon: FileEdit, badge: '5 Pending' },
            { tabId: 'ai-review', label: 'AI Speech & Writing Review', icon: Mic },
            { tabId: 'roster', label: 'Enrolled Student Roster', icon: UserIcon },
          ],
        },
        {
          groupTitle: 'ACADEMIC RESOURCES',
          items: [
            { tabId: 'levels', label: 'Levels Pathway', icon: BookOpen },
            { tabId: 'institutes', label: 'Institutes', icon: Building2 },
            { tabId: 'library', label: 'Library', icon: BookOpen },
            { tabId: 'competitions', label: 'Competitions', icon: Trophy },
          ],
        },
      ],
    },
    creator: {
      title: 'Course Creator Studio',
      subtitle: 'Curriculum & Publishing',
      groups: [
        {
          groupTitle: 'MAIN WORKSPACE',
          items: [
            { tabId: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard },
            { tabId: 'builder', label: 'Course Module Builder', icon: Sparkles },
            { tabId: 'lessons', label: 'Lesson Content Editor', icon: BookOpen },
            { tabId: 'quizzes', label: 'Quiz Authoring Tool', icon: HelpCircle },
            { tabId: 'workflow', label: 'Publishing Queue', icon: Shield, badge: '6 Stages' },
          ],
        },
        {
          groupTitle: 'RESOURCES',
          items: [
            { tabId: 'levels', label: 'Levels Pathway', icon: BookOpen },
            { tabId: 'library', label: 'Library', icon: BookOpen },
          ],
        },
      ],
    },
    tester: {
      title: 'Quality Testing Hub',
      subtitle: 'Content & Audio QA Auditor',
      groups: [
        {
          groupTitle: 'MAIN WORKSPACE',
          items: [
            { tabId: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard },
            { tabId: 'queue', label: 'QA Audit Queue', icon: Shield, badge: '1 Pending' },
            { tabId: 'spelling', label: 'Devanagari Font Inspector', icon: FileEdit },
            { tabId: 'audio', label: 'Audio Synthesis Test', icon: Headphones },
            { tabId: 'approvals', label: 'Approval Portal', icon: Award },
          ],
        },
        {
          groupTitle: 'PLATFORM AUDIT',
          items: [
            { tabId: 'levels', label: 'Levels Pathway', icon: BookOpen },
            { tabId: 'chatbot', label: 'AI Teacher Hub', icon: Bot },
          ],
        },
      ],
    },
    institute: {
      title: 'Institute Admin',
      subtitle: 'Center & Batches Manager',
      groups: [
        {
          groupTitle: 'MAIN WORKSPACE',
          items: [
            { tabId: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard },
            { tabId: 'physical', label: 'Physical Center Locations', icon: MapPin },
            { tabId: 'batches', label: 'Student Batches & Seats', icon: UserIcon },
            { tabId: 'fees', label: 'Fee Collections', icon: DollarSign },
          ],
        },
        {
          groupTitle: 'MANAGEMENT',
          items: [
            { tabId: 'institutes', label: 'Institutes', icon: Building2 },
            { tabId: 'certificates', label: 'Local Certificates', icon: Award },
            { tabId: 'classes', label: 'Live Classes', icon: Video },
          ],
        },
      ],
    },
    accounting: {
      title: 'Accounting & Finance',
      subtitle: 'Financial Controller',
      groups: [
        {
          groupTitle: 'MAIN WORKSPACE',
          items: [
            { tabId: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard },
            { tabId: 'revenue', label: 'Revenue Ledgers', icon: BarChart3 },
            { tabId: 'gateways', label: 'Gateway Breakdown', icon: Shield },
            { tabId: 'subscriptions', label: 'Pro Subscriptions', icon: Zap },
            { tabId: 'refunds', label: 'Refund Requests', icon: FileEdit },
          ],
        },
        {
          groupTitle: 'INSTITUTE AUDIT',
          items: [
            { tabId: 'institutes', label: 'Institutes', icon: Building2 },
          ],
        },
      ],
    },
    admin: {
      title: 'Super Admin',
      subtitle: 'System Commander & RBAC',
      groups: [
        {
          groupTitle: 'MAIN WORKSPACE',
          items: [
            { tabId: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard },
            { tabId: 'rbac', label: 'User RBAC Matrix', icon: Shield, badge: '7 Roles' },
            { tabId: 'publishing', label: 'Publishing Approvals', icon: BookOpen },
            { tabId: 'ai-settings', label: 'AI Gateway Config', icon: Bot },
            { tabId: 'audit', label: 'Immutable Audit Logs', icon: History },
          ],
        },
        {
          groupTitle: 'GLOBAL PLATFORM',
          items: [
            { tabId: 'levels', label: 'Levels Pathway', icon: BookOpen },
            { tabId: 'competitions', label: 'Competitions', icon: Trophy },
            { tabId: 'leaderboard', label: 'Leaderboard', icon: BarChart3 },
            { tabId: 'institutes', label: 'Institutes', icon: Building2 },
            { tabId: 'library', label: 'Library', icon: BookOpen },
          ],
        },
      ],
    },
  };

  const currentRoleData = roleSidebarData[role] || roleSidebarData.student;

  return (
    <>
      <aside className={`bg-white border-r border-[#DCE2E6] flex flex-col justify-between shrink-0 h-screen sticky top-0 shadow-sm z-30 transition-all duration-300 select-none ${isCollapsed ? 'w-20' : 'w-72'}`}>




        {/* Sidebar Header with Official Emblem / Logo & Toggle Icon */}
        <div className="p-3.5 space-y-3.5">
          <div className="flex items-center justify-between py-1 px-1">
            <Link href="/" className="flex items-center gap-2.5 group overflow-hidden">
              {!isCollapsed ? (
                <div className="flex items-center gap-2.5">
                  <img
                    src="/logo.png"
                    alt="Ministry of External Affairs Language Portal"
                    className="h-16 w-auto object-contain transition-transform duration-200 group-hover:scale-102"
                  />

                </div>
              ) : (
                <div className="w-10 h-10 rounded-sm bg-gradient-to-tr from-[#0B3D91] to-[#082C6C] text-amber-300 font-black flex items-center justify-center text-xs shadow-md border border-[#051C45] group-hover:scale-105 transition-transform">
                  MEA
                </div>
              )}
            </Link>

            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              title={isCollapsed ? "Expand Sidebar Menu" : "Collapse Sidebar to Icons"}
              className="p-2 rounded-sm bg-[#EEF3F8] hover:bg-[#0B3D91] hover:text-white text-[#0B3D91] transition-colors duration-200 border border-[#D0DCE7] shrink-0 shadow-2xs"
            >
              {isCollapsed ? <PanelLeftOpen className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
            </button>
          </div>

          {/* Console Identity Badge */}
          {/* {!isCollapsed && (
            <div className="bg-[#EEF3F8] border border-[#D0DCE7] px-3 py-1.5 rounded-sm flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#138808] animate-pulse"></span>
                <span className="font-extrabold text-[#0B3D91] text-[11px] uppercase tracking-wider">
                  {currentRoleData.title}
                </span>
              </div>
              <span className="text-[10px] font-bold text-[#555555]">
                {role === 'student' ? 'विद्यार्थी' : 'प्रशासन'}
              </span>
            </div>
          )} */}

          {/* Grouped Sidebar Menus */}
          <div className="space-y-4 overflow-y-auto max-h-[calc(100vh-210px)] pr-1 scrollbar-thin">
            {currentRoleData.groups.map((grp, gIdx) => (
              <div key={gIdx} className="space-y-1.5">
                {!isCollapsed ? (
                  <div className="flex items-center gap-1.5 px-3 pt-1">
                    <span className="w-1 h-3 rounded-full bg-[#FF9933]"></span>
                    <span className="text-[10px] font-extrabold text-[#0B3D91] uppercase tracking-wider block">
                      {grp.groupTitle}
                    </span>
                  </div>
                ) : (
                  <div className="my-2 border-t border-[#DCE2E6]" title={grp.groupTitle} />
                )}

                <div className="space-y-0.5">
                  {grp.items.map((item, iIdx) => {
                    if (item.subItems) {
                      const isOpen = !!openDropdowns[item.tabId];
                      const isAnySubActive = item.subItems.some((s) => s.tabId === activeTab);

                      if (isCollapsed) {
                        return (
                          <div key={iIdx} className="space-y-1 my-1">
                            <button
                              onClick={() => toggleDropdown(item.tabId)}
                              title={`${item.label} (${item.subItems.length})`}
                              className={`w-12 h-12 rounded-sm flex items-center justify-center mx-auto transition-all duration-200 relative group ${isAnySubActive || isOpen
                                ? 'bg-[#0B3D91] text-white shadow-md font-bold'
                                : 'text-[#1B2A4A] bg-[#F8FAFC] hover:bg-[#EEF3F8] hover:text-[#0B3D91] border border-[#DCE2E6]'
                                }`}
                            >
                              <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#FF9933] text-[#212121] text-[9px] font-black flex items-center justify-center ring-2 ring-white">
                                {item.subItems.length}
                              </span>
                            </button>

                            {isOpen && (
                              <div className="space-y-1 py-1 animate-in fade-in duration-150">
                                {item.subItems.map((sub, sIdx) => {
                                  const targetHref = `/dashboard/${role}?tab=${sub.tabId}`;
                                  const isSubActive = activeTab === sub.tabId;

                                  return (
                                    <Link
                                      key={sIdx}
                                      href={targetHref}
                                      title={sub.label}
                                      className={`w-9 h-9 rounded-sm flex items-center justify-center mx-auto text-[10px] font-bold transition-all duration-150 ${isSubActive
                                        ? 'bg-[#FF9933] text-[#212121] shadow-xs font-black'
                                        : 'bg-[#EEF3F8] text-[#0B3D91] hover:bg-[#0B3D91] hover:text-white'
                                        }`}
                                    >
                                      {sub.label.charAt(0)}
                                    </Link>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        );
                      }

                      return (
                        <div key={iIdx} className="space-y-0.5">
                          <button
                            onClick={() => toggleDropdown(item.tabId)}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-sm text-xs font-bold transition-all duration-200 select-none group ${isAnySubActive || isOpen
                              ? ' text-[#0B3D91] font-extrabold border-l-3 border-[#0B3D91]'
                              : 'text-[#1B2A4A] hover:bg-[#F8FAFC] hover:text-[#0B3D91]'
                              }`}
                          >
                            <span className="flex items-center gap-2.5 transition-transform duration-200 group-hover:translate-x-1">
                              <span className={`w-7 h-7 rounded-sm flex items-center justify-center shrink-0 transition-colors ${isAnySubActive || isOpen
                                ? ' text-amber-300'
                                : ' text-[#0B3D91] group-hover:bg-[#0B3D91] group-hover:text-white'
                                }`}>
                                <item.icon className="w-3.5 h-3.5" />
                              </span>
                              <span className="truncate font-bold">{item.label}</span>
                            </span>
                            <div className="flex items-center gap-1.5">
                              {item.badge && (
                                <span className="px-1.5 py-0.5 rounded-sm text-[9px] font-bold bg-[#FF9933]/15 text-[#0B3D91] border border-[#FF9933]/40">
                                  {item.badge}
                                </span>
                              )}
                              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#0B3D91]' : 'text-slate-400'}`} />
                            </div>
                          </button>

                          {/* Sub-items list */}
                          {isOpen && (
                            <div className="ml-4 pl-3 border-l-2 border-[#D0DCE7] space-y-0.5 py-1 animate-in fade-in slide-in-from-left-2 duration-200">
                              {item.subItems.map((sub, sIdx) => {
                                const targetHref = `/dashboard/${role}?tab=${sub.tabId}`;
                                const isSubActive = activeTab === sub.tabId;

                                return (
                                  <Link
                                    key={sIdx}
                                    href={targetHref}
                                    className={`flex items-center justify-between px-2.5 py-1.5 rounded-sm text-xs font-semibold transition-all duration-200 group ${isSubActive
                                      ? 'bg-[#0B3D91] text-white font-bold shadow-xs'
                                      : 'text-[#555555] hover:bg-[#EEF3F8] hover:text-[#0B3D91]'
                                      }`}
                                  >
                                    <span className="transition-transform duration-200 group-hover:translate-x-1 truncate font-medium">
                                      {sub.label}
                                    </span>
                                    {sub.badge && (
                                      <span
                                        className={`px-1.5 py-0.2 rounded-sm text-[9px] font-bold ${isSubActive
                                          ? 'bg-[#FF9933] text-[#212121]'
                                          : 'bg-slate-100 text-[#555555] group-hover:bg-[#0B3D91] group-hover:text-white'
                                          }`}
                                      >
                                        {sub.badge}
                                      </span>
                                    )}
                                  </Link>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    }

                    // Standard Links
                    const targetHref = `/dashboard/${role}?tab=${item.tabId}`;
                    const isActive = activeTab === item.tabId;

                    if (isCollapsed) {
                      return (
                        <Link
                          key={iIdx}
                          href={targetHref}
                          title={item.label}
                          className={`w-12 h-12 rounded-sm flex items-center justify-center mx-auto transition-all duration-200 relative group ${isActive
                            ? 'bg-[#0B3D91] text-amber-300 shadow-md ring-2 ring-[#FF9933]'
                            : 'text-slate-600 hover:bg-[#EEF3F8] hover:text-[#0B3D91]'
                            }`}
                        >
                          <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        </Link>
                      );
                    }

                    return (
                      <Link
                        key={iIdx}
                        href={targetHref}
                        className={`flex items-center justify-between px-3 py-2 rounded-sm text-xs font-semibold transition-all duration-200 group ${isActive
                          ? 'bg-gradient-to-r from-[#0B3D91] to-[#082C6C] text-white border-l-3 border-[#FF9933] font-bold shadow-xs ring-1 ring-[#0B3D91]/20'
                          : 'text-[#1B2A4A] hover:bg-[#EEF3F8] hover:text-[#0B3D91]'
                          }`}
                      >
                        <span className="flex items-center gap-2.5 transition-transform duration-200 group-hover:translate-x-1">
                          <span className={`w-7 h-7 rounded-sm flex items-center justify-center shrink-0 transition-colors ${isActive
                            ? 'bg-white/20 text-amber-300'
                            : 'bg-[#EEF3F8] text-[#0B3D91] group-hover:bg-[#0B3D91] group-hover:text-white'
                            }`}>
                            <item.icon className="w-3.5 h-3.5" />
                          </span>
                          <span className="truncate font-bold">{item.label}</span>
                        </span>

                        <div className="flex items-center gap-1.5">
                          {isActive && (
                            <span className="w-1.5 h-1.5 rounded-full bg-[#FF9933] animate-pulse"></span>
                          )}
                          {item.badge && (
                            <span
                              className={`px-1.5 py-0.5 rounded-sm text-[9px] font-bold ${isActive
                                ? 'bg-[#FF9933] text-[#212121]'
                                : 'bg-slate-100 text-[#555555] border border-[#DCE2E6] group-hover:bg-[#0B3D91] group-hover:text-white'
                                }`}
                            >
                              {item.badge}
                            </span>
                          )}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CLICKABLE INTERACTIVE SIDEBAR FOOTER CARD */}
        <div className="p-2.5 border-t border-[#DCE2E6] bg-[#F8FAFC] relative">
          <button
            onClick={() => setFooterMenuOpen(!footerMenuOpen)}
            className={`w-full rounded-sm bg-white border border-[#DCE2E6] hover:border-[#0B3D91] shadow-2xs flex items-center justify-between text-left transition-all duration-200 group cursor-pointer ${isCollapsed ? 'p-2 justify-center' : 'p-2.5'
              }`}
            title={isCollapsed ? `${user?.name || 'International Scholar'} (${role})` : undefined}
          >
            <div className={`flex items-center gap-2.5 overflow-hidden ${isCollapsed ? 'justify-center' : ''}`}>
              <div className="w-8 h-8 rounded-sm bg-[#0B3D91] text-amber-300 font-extrabold flex items-center justify-center text-xs shadow-xs shrink-0 group-hover:scale-105 transition-transform border border-[#082C6C]">
                {user?.name?.charAt(0) || 'S'}
              </div>
              {!isCollapsed && (
                <div className="space-y-0.5 overflow-hidden transition-transform duration-200 group-hover:translate-x-0.5">
                  <h4 className="text-xs font-extrabold text-[#1B2A4A] truncate">
                    {user?.name || 'International Scholar'}
                  </h4>
                  <span className="text-[10px] text-[#0B3D91] font-bold capitalize block">
                    {role} Console ▾
                  </span>
                </div>
              )}
            </div>
            {!isCollapsed && <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#0B3D91] transition-colors shrink-0" />}
          </button>

          {/* Footer Popover Dropdown Menu */}
          {footerMenuOpen && (
            <div className={`absolute bottom-full mb-2 bg-white border border-[#DCE2E6] rounded-sm shadow-xl z-50 p-2 space-y-1 text-xs animate-in fade-in zoom-in-95 duration-150 ${isCollapsed ? 'left-1 w-48' : 'left-2.5 right-2.5'
              }`}>
              <span className="text-[10px] font-extrabold text-[#0B3D91] uppercase tracking-wider px-2.5 py-1 block">
                CONSOLE OPTIONS
              </span>

              <button
                onClick={() => {
                  setEditModalOpen(true);
                  setFooterMenuOpen(false);
                }}
                className="w-full text-left px-2.5 py-2 rounded-sm font-bold text-[#1B2A4A] hover:bg-[#EEF3F8] hover:text-[#0B3D91] flex items-center gap-2 transition-colors duration-150"
              >
                <FileEdit className="w-4 h-4 text-[#0B3D91]" /> Edit Profile Details
              </button>

              <Link
                href={`/dashboard/${role}?tab=certificates`}
                onClick={() => setFooterMenuOpen(false)}
                className="w-full text-left px-2.5 py-2 rounded-sm font-bold text-[#1B2A4A] hover:bg-[#EEF3F8] hover:text-[#0B3D91] flex items-center gap-2 transition-colors duration-150"
              >
                <Award className="w-4 h-4 text-[#FF9933]" /> My Certificates
              </Link>

              <button
                onClick={handleLogout}
                className="w-full text-left px-2.5 py-2 rounded-sm font-bold text-rose-600 hover:bg-rose-50 flex items-center gap-2 transition-colors duration-150 border-t border-slate-100 pt-2"
              >
                <LogOut className="w-4 h-4" /> Logout / Sign Out
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* EDITABLE STUDENT PROFILE MODAL */}
      {editModalOpen && (
        <div className="fixed inset-0 bg-slate-900/75 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-md bg-white border border-[#DCE2E6] rounded-sm p-6 space-y-5 shadow-2xl animate-in fade-in zoom-in-95 duration-200 text-left my-8">
            <div className="flex items-center justify-between border-b border-[#DCE2E6] pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-sm bg-[#EEF3F8] text-[#0B3D91] flex items-center justify-center font-bold">
                  <UserIcon className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase text-[#0B3D91] tracking-wider block">PROFILE SETTINGS</span>
                  <h3 className="text-lg font-extrabold text-[#1B2A4A]">Edit Scholar Details</h3>
                </div>
              </div>
              <button
                onClick={() => setEditModalOpen(false)}
                className="p-1.5 rounded-sm hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs font-semibold">
              <div className="space-y-1">
                <label className="text-[#1B2A4A] font-bold block">Scholar / User Full Name:</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full p-2.5 rounded-sm bg-[#F5F5F5] border border-[#DCE2E6] font-bold focus:outline-none focus:border-[#0B3D91] text-[#1B2A4A]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[#1B2A4A] font-bold block">Official Email Address:</label>
                <input
                  type="email"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  className="w-full p-2.5 rounded-sm bg-[#F5F5F5] border border-[#DCE2E6] font-bold focus:outline-none focus:border-[#0B3D91] text-[#1B2A4A]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[#1B2A4A] font-bold block">Designation / Bio:</label>
                <input
                  type="text"
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  className="w-full p-2.5 rounded-sm bg-[#F5F5F5] border border-[#DCE2E6] font-bold focus:outline-none focus:border-[#0B3D91] text-[#1B2A4A]"
                />
              </div>

              <div className="p-3.5 rounded-sm bg-[#EEF3F8] border border-[#D0DCE7] text-[11px] text-[#0B3D91] font-medium">
                💡 Profile updates sync across certificates, topbar header, and the learning dashboard.
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                onClick={() => setEditModalOpen(false)}
                className="px-4 py-2 rounded-sm bg-slate-100 hover:bg-slate-200 text-[#1B2A4A] font-bold text-xs transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveProfile}
                className="px-5 py-2 rounded-sm bg-[#0B3D91] hover:bg-[#082C6C] text-white font-extrabold text-xs shadow-sm flex items-center gap-1.5 transition"
              >
                <Save className="w-4 h-4 text-[#FF9933]" /> Save Profile Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
