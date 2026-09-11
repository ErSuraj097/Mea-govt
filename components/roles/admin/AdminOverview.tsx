'use client';

import React from 'react';
import Link from 'next/link';
import { Shield, BookOpen, Bot, History, Trophy, BarChart3, Building2, Key, Users, Settings } from 'lucide-react';

export default function AdminOverview() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto text-left animate-in fade-in duration-200">
      {/* Super Admin MEA Header */}
      <div className="p-6 rounded-none bg-[#0C2340] border-l-4 border-[#F26522] text-white shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="px-2.5 py-0.5 rounded-none bg-orange-500/20 text-[#F26522] text-[10px] font-black uppercase tracking-wider border border-orange-500/30">
            Super Admin Commander
          </span>
          <h1 className="text-2xl font-black text-white mt-1">Super Admin Operations & Security</h1>
          <p className="text-xs text-slate-300 font-medium">RBAC matrix governance, final syllabus publishing lock, Sambhasini AI gateway, and audit log trails.</p>
        </div>
        <div className="flex gap-2">
          <Link
            href="/dashboard/admin?tab=rbac"
            className="px-4 py-2 bg-[#F26522] hover:bg-[#d85517] text-white text-xs font-bold uppercase tracking-wider rounded-none transition"
          >
            RBAC Governance
          </Link>
        </div>
      </div>

      {/* KPI Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-none bg-white border border-slate-200 space-y-2 shadow-sm border-t-2 border-t-[#0C2340]">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Configured User Roles</span>
          <span className="text-3xl font-black text-[#0C2340] block">7 Roles Active</span>
          <span className="text-xs text-[#138808] font-bold">Role-Based Access Control (RBAC) Verified</span>
        </div>
        <div className="p-6 rounded-none bg-white border border-slate-200 space-y-2 shadow-sm border-t-2 border-t-[#F26522]">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active AI Provider Gateway</span>
          <span className="text-xl font-black text-[#F26522] block">Gemini 1.5 & ULCA v2</span>
          <span className="text-xs text-slate-600 font-bold">22 Scheduled Languages Enabled</span>
        </div>
        <div className="p-6 rounded-none bg-white border border-slate-200 space-y-2 shadow-sm border-t-2 border-t-[#138808]">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Immutable Audit Trail</span>
          <span className="text-3xl font-black text-[#138808] block">100% Logged</span>
          <span className="text-xs text-[#138808] font-bold">GIGW & CERT-In Compliant</span>
        </div>
      </div>

      {/* Administrative Operations Hub */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Link
          href="/dashboard/admin?tab=rbac"
          className="p-5 rounded-none bg-white border border-slate-200 hover:border-[#0C2340] transition space-y-2 shadow-sm group"
        >
          <div className="w-10 h-10 rounded-none bg-blue-50 text-[#0C2340] flex items-center justify-center font-bold">
            <Key className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black text-slate-900 group-hover:text-[#F26522] transition">RBAC Permissions</h3>
          <p className="text-xs text-slate-500">Fine-grained access controls for Teachers, Creators, Testers, and Mission Admins.</p>
        </Link>

        <Link
          href="/dashboard/admin?tab=publishing"
          className="p-5 rounded-none bg-white border border-slate-200 hover:border-[#0C2340] transition space-y-2 shadow-sm group"
        >
          <div className="w-10 h-10 rounded-none bg-orange-50 text-[#F26522] flex items-center justify-center font-bold">
            <BookOpen className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black text-slate-900 group-hover:text-[#F26522] transition">Content Publishing</h3>
          <p className="text-xs text-slate-500">Final approval and publishing lock for course modules after QA tester sign-off.</p>
        </Link>

        <Link
          href="/dashboard/admin?tab=ai-settings"
          className="p-5 rounded-none bg-white border border-slate-200 hover:border-[#0C2340] transition space-y-2 shadow-sm group"
        >
          <div className="w-10 h-10 rounded-none bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
            <Settings className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black text-slate-900 group-hover:text-[#F26522] transition">AI Model Gateway</h3>
          <p className="text-xs text-slate-500">Configure Sambhasini ULCA API keys, latency fallbacks, and prompt guardrails.</p>
        </Link>

        <Link
          href="/dashboard/admin?tab=audit"
          className="p-5 rounded-none bg-white border border-slate-200 hover:border-[#0C2340] transition space-y-2 shadow-sm group"
        >
          <div className="w-10 h-10 rounded-none bg-emerald-50 text-[#138808] flex items-center justify-center font-bold">
            <History className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black text-slate-900 group-hover:text-[#F26522] transition">Security Audit Logs</h3>
          <p className="text-xs text-slate-500">Tamper-evident logs of logins, diploma issuances, grade updates, and administrative edits.</p>
        </Link>
      </div>
    </div>
  );
}
