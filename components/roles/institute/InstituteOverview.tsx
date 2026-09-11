'use client';

import React from 'react';
import Link from 'next/link';
import { Building2, Users, Calendar, DollarSign, Award, Globe, Shield, ArrowRight } from 'lucide-react';

export default function InstituteOverview() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto text-left animate-in fade-in duration-200">
      {/* MEA Header */}
      <div className="p-6 rounded-none bg-[#0C2340] border-l-4 border-[#F26522] text-white shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="px-2.5 py-0.5 rounded-none bg-indigo-400/20 text-indigo-300 text-[10px] font-black uppercase tracking-wider border border-indigo-400/30">
            Diplomatic Mission & Institute Administration
          </span>
          <h1 className="text-2xl font-black text-white mt-1">Embassy & University Mission Management</h1>
          <p className="text-xs text-slate-300 font-medium">Manage ICCR cohorts, embassy diplomat batches, campus classroom seat licenses, and fee subsidies.</p>
        </div>
        <div className="flex gap-2">
          <Link
            href="/dashboard/institute?tab=batches"
            className="px-4 py-2 bg-[#F26522] hover:bg-[#d85517] text-white text-xs font-bold uppercase tracking-wider rounded-none transition"
          >
            Manage Batches
          </Link>
        </div>
      </div>

      {/* KPI Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-none bg-white border border-slate-200 space-y-2 shadow-sm border-t-2 border-t-[#0C2340]">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Cohort Batches</span>
          <span className="text-3xl font-black text-[#0C2340] block">6 Cohorts</span>
          <span className="text-xs text-[#138808] font-bold">Embassy of India (Washington, London, Paris, Tokyo)</span>
        </div>
        <div className="p-6 rounded-none bg-white border border-slate-200 space-y-2 shadow-sm border-t-2 border-t-[#F26522]">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Sponsored Scholars</span>
          <span className="text-3xl font-black text-[#F26522] block">184 Scholars</span>
          <span className="text-xs text-slate-600 font-bold">100% MEA ICCR Fellowship Subsidized</span>
        </div>
        <div className="p-6 rounded-none bg-white border border-slate-200 space-y-2 shadow-sm border-t-2 border-t-[#138808]">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">CEFR Graduation Rate</span>
          <span className="text-3xl font-black text-[#138808] block">94.8%</span>
          <span className="text-xs text-[#138808] font-bold">A1/A2 Certified Foreign Envoys</span>
        </div>
      </div>

      {/* Institute Navigation Hub */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          href="/dashboard/institute?tab=batches"
          className="p-5 rounded-none bg-white border border-slate-200 hover:border-[#0C2340] transition space-y-2 shadow-sm group"
        >
          <div className="w-10 h-10 rounded-none bg-blue-50 text-[#0C2340] flex items-center justify-center font-bold">
            <Users className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black text-slate-900 group-hover:text-[#F26522] transition">Batch & Cohort Manager</h3>
          <p className="text-xs text-slate-500">Allocate foreign diplomats and university researchers to instructor-led speaking circles.</p>
        </Link>

        <Link
          href="/dashboard/institute?tab=fees"
          className="p-5 rounded-none bg-white border border-slate-200 hover:border-[#0C2340] transition space-y-2 shadow-sm group"
        >
          <div className="w-10 h-10 rounded-none bg-orange-50 text-[#F26522] flex items-center justify-center font-bold">
            <DollarSign className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black text-slate-900 group-hover:text-[#F26522] transition">Fellowship Grant Subsidies</h3>
          <p className="text-xs text-slate-500">Track ICCR bilateral grants, university scholarship waivers, and invoice settlements.</p>
        </Link>

        <Link
          href="/dashboard/institutes"
          className="p-5 rounded-none bg-white border border-slate-200 hover:border-[#0C2340] transition space-y-2 shadow-sm group"
        >
          <div className="w-10 h-10 rounded-none bg-emerald-50 text-[#138808] flex items-center justify-center font-bold">
            <Globe className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black text-slate-900 group-hover:text-[#F26522] transition">Global Mission Directory</h3>
          <p className="text-xs text-slate-500">Browse Indian Cultural Centres (Swami Vivekananda Cultural Centres) worldwide.</p>
        </Link>
      </div>
    </div>
  );
}
