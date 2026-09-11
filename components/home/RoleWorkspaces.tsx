'use client';

import React from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  Users2,
  PenTool,
  ShieldCheck,
  Building2,
  Landmark,
  ShieldAlert,
  ArrowRight,
  Lock,
  Layers,
  Sparkles
} from 'lucide-react';
import { ROUTES } from '@/config/routes';

interface RoleWorkspaceItem {
  id: string;
  title: string;
  hindiTitle: string;
  tag: string;
  href: string;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
}

const WORKSPACE_ROLES: RoleWorkspaceItem[] = [
  {
    id: 'student',
    title: 'Student Console',
    hindiTitle: 'विद्यार्थी कंसोल',
    tag: 'Learners & Envoys',
    href: ROUTES.DASHBOARD.STUDENT,
    icon: GraduationCap,
    iconBg: 'bg-blue-50 group-hover:bg-[#0B3D91]',
    iconColor: 'text-[#0B3D91] group-hover:text-white'
  },
  {
    id: 'teacher',
    title: 'Teacher Console',
    hindiTitle: 'अध्यापक कंसोल',
    tag: 'Faculty & Tutors',
    href: ROUTES.DASHBOARD.TEACHER,
    icon: Users2,
    iconBg: 'bg-emerald-50 group-hover:bg-[#138808]',
    iconColor: 'text-[#138808] group-hover:text-white'
  },
  {
    id: 'creator',
    title: 'Course Studio',
    hindiTitle: 'पाठ्यक्रम निर्माता',
    tag: 'Curriculum Authors',
    href: ROUTES.DASHBOARD.CREATOR,
    icon: PenTool,
    iconBg: 'bg-purple-50 group-hover:bg-purple-700',
    iconColor: 'text-purple-700 group-hover:text-white'
  },
  {
    id: 'tester',
    title: 'Quality Testing Hub',
    hindiTitle: 'गुणवत्ता परीक्षण',
    tag: 'Speech & QA Auditors',
    href: ROUTES.DASHBOARD.TESTER,
    icon: ShieldCheck,
    iconBg: 'bg-amber-50 group-hover:bg-amber-600',
    iconColor: 'text-amber-700 group-hover:text-white'
  },
  {
    id: 'institute',
    title: 'Institute Admin',
    hindiTitle: 'संस्थान प्रशासन',
    tag: 'Missions & SVCC',
    href: ROUTES.DASHBOARD.INSTITUTE,
    icon: Building2,
    iconBg: 'bg-sky-50 group-hover:bg-sky-700',
    iconColor: 'text-sky-700 group-hover:text-white'
  },
  {
    id: 'accounting',
    title: 'Finance & Grants',
    hindiTitle: 'लेखा एवं अनुदान',
    tag: 'ICCR Fellowships',
    href: ROUTES.DASHBOARD.ACCOUNTING,
    icon: Landmark,
    iconBg: 'bg-teal-50 group-hover:bg-teal-700',
    iconColor: 'text-teal-700 group-hover:text-white'
  },
  {
    id: 'admin',
    title: 'Super Admin',
    hindiTitle: 'मुख्य प्रशासक',
    tag: 'System Governance',
    href: ROUTES.DASHBOARD.ADMIN,
    icon: ShieldAlert,
    iconBg: 'bg-rose-50 group-hover:bg-rose-700',
    iconColor: 'text-rose-700 group-hover:text-white'
  }
];

export default function RoleWorkspaces() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Role-Based Console Workspaces">
      <div className="bg-white border border-[#DCE2E6] shadow-2xs rounded-md overflow-hidden">
        
        {/* Section Header Strip */}
        <div className="bg-[#0B3D91] text-white px-4 sm:px-6 py-2.5 flex items-center justify-between border-b-2 border-[#FF9933]">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-amber-300" aria-hidden="true" />
            <span className="text-xs font-bold uppercase tracking-wider">
              ROLE-BASED WORKSPACES • भूमिका आधारित कंसोल
            </span>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-amber-200 font-semibold">
            <Lock className="w-3.5 h-3.5 text-amber-300" />
            <span className="hidden sm:inline">Direct SSO Access</span>
          </div>
        </div>

        {/* Section Body */}
        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
            
            {/* Left Side: Short & Focused Overview */}
            <div className="lg:col-span-4 space-y-3 text-left">
              <span className="inline-block px-2.5 py-0.5 bg-[#0B3D91]/10 text-[#0B3D91] border border-[#0B3D91]/20 text-[10px] font-bold uppercase tracking-wider rounded-md">
                UNIFIED LMS SUITE
              </span>
              
              <h2 className="text-base sm:text-lg font-bold text-[#1B2A4A] leading-snug">
                Select Your Designated Workspace Console
              </h2>
              
              <p className="text-xs text-[#555555] font-normal leading-relaxed">
                Dedicated consoles for diplomats, faculty, curriculum authors, auditors, and administrators with role-based cryptographic access.
              </p>

              {/* Compact Security Pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#EEF3F8] border border-[#D0DCE7] text-[11px] text-[#0B3D91] font-semibold rounded-md">
                <ShieldCheck className="w-4 h-4 text-[#138808]" />
                <span>CERT-In Audited • 256-Bit RBAC</span>
              </div>
            </div>

            {/* Right Side: Clean, Text-Less, High-Impact Console Tiles */}
            <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
              {WORKSPACE_ROLES.map((role) => {
                const IconComponent = role.icon;
                return (
                  <Link
                    key={role.id}
                    href={role.href}
                    className="group bg-[#F8FAFC] hover:bg-white border border-[#DCE2E6] hover:border-[#0B3D91] hover:shadow-xs p-3 transition-all duration-200 flex flex-col justify-between rounded-md text-left cursor-pointer"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className={`w-8 h-8 rounded-md ${role.iconBg} flex items-center justify-center transition shrink-0`}>
                          <IconComponent className={`w-4 h-4 ${role.iconColor} transition`} />
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-[#0B3D91] group-hover:translate-x-0.5 transition" />
                      </div>

                      <div>
                        <h3 className="text-xs font-bold text-[#1B2A4A] group-hover:text-[#0B3D91] transition line-clamp-1">
                          {role.title}
                        </h3>
                        <span className="text-[10px] text-[#0B3D91] font-medium block truncate">
                          {role.hindiTitle}
                        </span>
                      </div>
                    </div>

                    <div className="mt-2.5 pt-1.5 border-t border-slate-200/60">
                      <span className="text-[9px] font-semibold text-[#555555] group-hover:text-[#0B3D91] block truncate">
                        {role.tag}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
