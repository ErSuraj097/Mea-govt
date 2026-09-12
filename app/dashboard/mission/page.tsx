'use client';

import React, { useState } from 'react';
import {
  Building2,
  Globe,
  Users2,
  Award,
  Calendar,
  BarChart3,
  CheckCircle2,
  ShieldCheck,
  TrendingUp
} from 'lucide-react';
import { MOCK_MISSION_METRICS } from '@/lib/mockData';

export default function MissionDashboardPage() {
  const [selectedRegion, setSelectedRegion] = useState('All');

  const totalLearners = MOCK_MISSION_METRICS.reduce((acc, m) => acc + m.activeLearners, 0);
  const totalCertificates = MOCK_MISSION_METRICS.reduce((acc, m) => acc + m.certificatesIssued, 0);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 text-left">
      {/* Top Governance Header */}
      <div className="p-6 sm:p-8 rounded-sm bg-gradient-to-r from-[#0B3D91] via-[#082C6C] to-[#051C45] text-white border-l-4 border-[#FF9933] shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <span className="px-2.5 py-0.5 rounded-sm bg-[#FF9933] text-[#051C45] text-[10px] font-black uppercase tracking-wider inline-block">
              MEA EMBASSY GOVERNANCE & DIPLOMATIC OUTREACH
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
              Mission Language Outreach Dashboard
            </h1>
            <p className="text-xs text-blue-100 font-medium max-w-2xl mt-0.5">
              Unified governance console for Indian Missions, embassies, and SVCC cultural centers tracking global Indian language propagation.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white/10 px-3.5 py-2 rounded-sm border border-white/15 shrink-0">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span className="text-xs font-extrabold text-white">CERT-In & MEA Verified</span>
          </div>
        </div>
      </div>

      {/* Global Mission Overview KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-[#DCE2E6] rounded-sm p-4 space-y-1 shadow-2xs">
          <span className="text-[10px] font-extrabold text-[#555555] uppercase tracking-wider">TOTAL GLOBAL LEARNERS</span>
          <div className="text-xl font-black text-[#0B3D91]">{totalLearners.toLocaleString()}</div>
          <span className="text-[10px] text-emerald-700 font-bold">38 Active Missions</span>
        </div>

        <div className="bg-white border border-[#DCE2E6] rounded-sm p-4 space-y-1 shadow-2xs">
          <span className="text-[10px] font-extrabold text-[#555555] uppercase tracking-wider">HINDI PHASE 1 SHARE</span>
          <div className="text-xl font-black text-amber-700">88.4% Primary</div>
          <span className="text-[10px] text-[#555555] font-bold">21 Packs Upcoming</span>
        </div>

        <div className="bg-white border border-[#DCE2E6] rounded-sm p-4 space-y-1 shadow-2xs">
          <span className="text-[10px] font-extrabold text-[#555555] uppercase tracking-wider">CEFR DIPLOMAS ISSUED</span>
          <div className="text-xl font-black text-emerald-700">{totalCertificates.toLocaleString()}</div>
          <span className="text-[10px] text-[#555555] font-bold">A1 - B2 Level Pass</span>
        </div>

        <div className="bg-white border border-[#DCE2E6] rounded-sm p-4 space-y-1 shadow-2xs">
          <span className="text-[10px] font-extrabold text-[#555555] uppercase tracking-wider">CULTURAL EVENTS & CIRCLES</span>
          <div className="text-xl font-black text-[#0B3D91]">138 Sessions</div>
          <span className="text-[10px] text-emerald-700 font-bold">Monthly Outreach</span>
        </div>
      </div>

      {/* Country Performance Table */}
      <div className="bg-white border border-[#DCE2E6] rounded-sm p-6 space-y-4 shadow-2xs">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <h3 className="text-sm font-extrabold text-[#0B3D91] uppercase tracking-wider">
            Country Mission Performance Table
          </h3>
          <span className="text-xs text-[#555555] font-semibold">Updated Real-Time</span>
        </div>

        <div className="border border-[#DCE2E6] rounded-sm overflow-hidden text-xs">
          <table className="w-full text-left">
            <thead className="bg-[#EEF3F8] text-[#0B3D91] font-bold border-b border-[#DCE2E6]">
              <tr>
                <th className="p-3">Country / Mission</th>
                <th className="p-3">Total Learners</th>
                <th className="p-3">Hindi Phase 1</th>
                <th className="p-3">Institutions</th>
                <th className="p-3">Circles</th>
                <th className="p-3">Certificates</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-semibold text-[#1B2A4A]">
              {MOCK_MISSION_METRICS.map((c) => (
                <tr key={c.countryCode} className="hover:bg-slate-50 transition">
                  <td className="p-3 font-bold flex items-center gap-2">
                    <span>{c.flag}</span>
                    <span>{c.countryName}</span>
                  </td>
                  <td className="p-3 font-bold text-[#0B3D91]">{c.activeLearners}</td>
                  <td className="p-3 text-amber-700">{c.hindiLearners}</td>
                  <td className="p-3 text-[#1B2A4A]">{c.institutionsCount}</td>
                  <td className="p-3 text-[#0B3D91]">{c.circlesCount}</td>
                  <td className="p-3 text-emerald-700 font-bold">{c.certificatesIssued}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
