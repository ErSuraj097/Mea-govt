'use client';

import React, { useState } from 'react';
import {
  Globe,
  Building2,
  Users2,
  Award,
  BookOpen,
  MapPin,
  TrendingUp
} from 'lucide-react';
import { MOCK_MISSION_METRICS, MissionCountryMetrics } from '@/lib/mockData';

export default function GlobalImpactPage() {
  const [selectedCountry, setSelectedCountry] = useState<MissionCountryMetrics>(MOCK_MISSION_METRICS[0]);

  const totalLearners = MOCK_MISSION_METRICS.reduce((acc, m) => acc + m.activeLearners, 0);
  const totalCertificates = MOCK_MISSION_METRICS.reduce((acc, m) => acc + m.certificatesIssued, 0);

  return (
    <div className="min-h-screen bg-[#F5F5F5] pb-16 text-left">
      {/* Top Header */}
      <div className="bg-[#0B3D91] text-white border-b border-[#082C6C] py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-3">
          <span className="px-2.5 py-0.5 rounded-sm bg-[#FF9933] text-[#051C45] text-[10px] font-black uppercase tracking-wider inline-block">
            GLOBAL DIPLOMACY & IMPACT METRICS
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Global Indian Language Network
          </h1>
          <p className="text-xs sm:text-sm text-slate-200 max-w-3xl leading-relaxed">
            Measuring global language learning outreach across Indian Missions, embassies, and overseas educational institutions worldwide.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        {/* Global Impact Summary Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-[#DCE2E6] rounded-sm p-4 space-y-1 shadow-2xs">
            <span className="text-[10px] font-extrabold text-[#555555] uppercase tracking-wider">TOTAL ACTIVE LEARNERS</span>
            <div className="text-xl font-black text-[#0B3D91]">{totalLearners.toLocaleString()} Scholars</div>
            <span className="text-[10px] text-emerald-700 font-bold"> Across 38 Indian Missions</span>
          </div>

          <div className="bg-white border border-[#DCE2E6] rounded-sm p-4 space-y-1 shadow-2xs">
            <span className="text-[10px] font-extrabold text-[#555555] uppercase tracking-wider">HINDI PHASE 1 ADOPTION</span>
            <div className="text-xl font-black text-amber-700">88.4% Primary Track</div>
            <span className="text-[10px] text-[#555555] font-bold">21 Packs in Architecture</span>
          </div>

          <div className="bg-white border border-[#DCE2E6] rounded-sm p-4 space-y-1 shadow-2xs">
            <span className="text-[10px] font-extrabold text-[#555555] uppercase tracking-wider">DIPLOMAS & CERTIFICATES</span>
            <div className="text-xl font-black text-emerald-700">{totalCertificates.toLocaleString()} Issued</div>
            <span className="text-[10px] text-[#555555] font-bold">CEFR A1-B2 Standard</span>
          </div>

          <div className="bg-white border border-[#DCE2E6] rounded-sm p-4 space-y-1 shadow-2xs">
            <span className="text-[10px] font-extrabold text-[#555555] uppercase tracking-wider">GLOBAL LANGUAGE CIRCLES</span>
            <div className="text-xl font-black text-[#0B3D91]">138 Monthly</div>
            <span className="text-[10px] text-emerald-700 font-bold">Live Diplomat Roundtables</span>
          </div>
        </div>

        {/* Interactive Country Metrics & Map Visual */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Country Selection List */}
          <div className="lg:col-span-5 bg-white border border-[#DCE2E6] rounded-sm p-4 space-y-3 shadow-2xs">
            <span className="text-xs font-black text-[#0B3D91] uppercase tracking-wider block border-b border-slate-200 pb-2">
              Select Mission Country / Jurisdiction
            </span>

            <div className="space-y-1.5 max-h-96 overflow-y-auto pr-1">
              {MOCK_MISSION_METRICS.map((c) => (
                <button
                  key={c.countryCode}
                  onClick={() => setSelectedCountry(c)}
                  className={`w-full p-3 rounded-sm border text-left transition flex items-center justify-between ${
                    selectedCountry.countryCode === c.countryCode
                      ? 'bg-[#0B3D91] text-white border-[#082C6C] shadow-xs'
                      : 'bg-[#F8FAFC] text-[#1B2A4A] border-[#DCE2E6] hover:bg-[#EEF3F8]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-base">{c.flag}</span>
                    <span className="text-xs font-bold">{c.countryName}</span>
                  </div>
                  <span className={`text-xs font-mono font-extrabold ${selectedCountry.countryCode === c.countryCode ? 'text-amber-300' : 'text-[#0B3D91]'}`}>
                    {c.activeLearners} Scholars
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Right Selected Country Metrics Card */}
          <div className="lg:col-span-7 bg-white border border-[#DCE2E6] rounded-sm p-6 space-y-5 shadow-2xs">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{selectedCountry.flag}</span>
                <div>
                  <span className="text-[10px] font-extrabold uppercase text-[#0B3D91] tracking-wider block">MISSION OUTREACH PROFILE</span>
                  <h3 className="text-lg font-black text-[#1B2A4A]">{selectedCountry.countryName}</h3>
                </div>
              </div>
              <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-900 font-extrabold text-xs rounded-sm border border-emerald-200">
                Active Embassy Cell
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3 bg-[#F8FAFC] border border-[#DCE2E6] rounded-sm space-y-0.5">
                <span className="text-[10px] font-extrabold text-[#555555] uppercase block">Active Learners</span>
                <span className="text-sm font-black text-[#0B3D91]">{selectedCountry.activeLearners}</span>
              </div>

              <div className="p-3 bg-[#F8FAFC] border border-[#DCE2E6] rounded-sm space-y-0.5">
                <span className="text-[10px] font-extrabold text-[#555555] uppercase block">Hindi Phase 1</span>
                <span className="text-sm font-black text-amber-700">{selectedCountry.hindiLearners}</span>
              </div>

              <div className="p-3 bg-[#F8FAFC] border border-[#DCE2E6] rounded-sm space-y-0.5">
                <span className="text-[10px] font-extrabold text-[#555555] uppercase block">Faculty Members</span>
                <span className="text-sm font-black text-[#1B2A4A]">{selectedCountry.teachersCount}</span>
              </div>

              <div className="p-3 bg-[#F8FAFC] border border-[#DCE2E6] rounded-sm space-y-0.5">
                <span className="text-[10px] font-extrabold text-[#555555] uppercase block">Institutions</span>
                <span className="text-sm font-black text-[#1B2A4A]">{selectedCountry.institutionsCount}</span>
              </div>

              <div className="p-3 bg-[#F8FAFC] border border-[#DCE2E6] rounded-sm space-y-0.5">
                <span className="text-[10px] font-extrabold text-[#555555] uppercase block">Language Circles</span>
                <span className="text-sm font-black text-[#0B3D91]">{selectedCountry.circlesCount}</span>
              </div>

              <div className="p-3 bg-[#F8FAFC] border border-[#DCE2E6] rounded-sm space-y-0.5">
                <span className="text-[10px] font-extrabold text-[#555555] uppercase block">Certificates</span>
                <span className="text-sm font-black text-emerald-700">{selectedCountry.certificatesIssued}</span>
              </div>
            </div>

            <div className="p-4 bg-[#EEF3F8] border border-[#D0DCE7] rounded-sm space-y-1 text-xs">
              <span className="font-extrabold text-[#0B3D91] block">📌 Embassy Outreach Note:</span>
              <p className="text-[#555555] font-medium leading-relaxed">
                Indian Mission in {selectedCountry.countryName} conducts monthly CEFR examinations and language roundtables in coordination with ICCR and local cultural centers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
