'use client';

import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  CheckCircle2,
  Lock,
  Globe,
  Award,
  FileText,
  Building2,
  Eye,
  Volume2,
  Zap,
  ArrowRight,
  FileBadge,
  Layers
} from 'lucide-react';

export default function CompliancePage() {
  return (
    <div className="min-h-screen bg-[#F5F5F5] pb-16 space-y-8 text-left text-[#212121] font-sans">
      {/* Page Hero Header */}
      <section className="bg-[#082C6C] text-white py-10 px-4 sm:px-6 lg:px-8 border-b border-[#051C45] relative overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 text-amber-300 text-[10px] font-bold uppercase tracking-wider border border-white/20">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-300" /> MINISTRY OF EXTERNAL AFFAIRS (MEA) GOVERNANCE MATRIX
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
            GIGW 3.0, WCAG 2.1 Level AA &amp; CERT-In Cyber Security Hub
          </h1>

          <p className="text-slate-200 text-xs sm:text-sm font-normal max-w-3xl leading-relaxed">
            Official Compliance &amp; Verification Matrix for Guidelines for Indian Government Websites (GIGW 3.0), W3C Web Content Accessibility Guidelines (WCAG 2.1 Level AA), CERT-In 256-Bit SSL/TLS Security Audit, and Digital Personal Data Protection Act (DPDP 2023).
          </p>
        </div>
      </section>

      {/* Main Compliance Matrix Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* 1. GIGW 3.0 & W3C WCAG 2.1 LEVEL AA ACCESSIBILITY SECTION */}
        <div className="p-6 bg-white border border-[#DCE2E6] border-t-2 border-t-[#0B3D91] shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#0B3D91] text-amber-300 flex items-center justify-center font-bold shrink-0">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-[#0B3D91] uppercase tracking-wider block">GOVERNMENT ACCESSIBILITY</span>
                <h2 className="text-base sm:text-lg font-bold text-[#212121]">
                  1. GIGW 3.0 &amp; W3C WCAG 2.1 Level AA Accessibility Standards
                </h2>
              </div>
            </div>
            <span className="px-3 py-1 bg-emerald-100 text-emerald-900 font-bold text-xs border border-emerald-300 shrink-0">
              COMPLIANT ✓
            </span>
          </div>

          <p className="text-xs text-[#555555] font-normal leading-relaxed">
            Our portal strictly implements the Guidelines for Indian Government Websites (GIGW 3.0) framed by the National Informatics Centre (NIC) and Ministry of Electronics &amp; Information Technology (MeitY).
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-3.5 bg-[#F5F5F5] border border-slate-200 space-y-1.5">
              <div className="flex items-center gap-2 text-[#212121] font-bold text-xs">
                <Volume2 className="w-4 h-4 text-[#0B3D91]" /> Screen Reader Speech Access
              </div>
              <p className="text-xs text-[#555555] leading-relaxed">
                Full integration with NVDA, JAWS, and Apple VoiceOver screen readers with bilingual speech synthesis.
              </p>
            </div>

            <div className="p-3.5 bg-[#F5F5F5] border border-slate-200 space-y-1.5">
              <div className="flex items-center gap-2 text-[#212121] font-bold text-xs">
                <Eye className="w-4 h-4 text-[#0B3D91]" /> High Contrast &amp; Resizable Text
              </div>
              <p className="text-xs text-[#555555] leading-relaxed">
                Font size controls (A- / A / A+) and high-contrast yellow-on-black accessibility mode.
              </p>
            </div>

            <div className="p-3.5 bg-[#F5F5F5] border border-slate-200 space-y-1.5">
              <div className="flex items-center gap-2 text-[#212121] font-bold text-xs">
                <FileText className="w-4 h-4 text-[#138808]" /> Skip to Main Content Navigation
              </div>
              <p className="text-xs text-[#555555] leading-relaxed">
                Mandatory GIGW skip navigation anchor links enabled for all keyboard-only users.
              </p>
            </div>
          </div>
        </div>

        {/* 2. DIPLOMATIC & CEFR CREDENTIAL ACCREDITATION */}
        <div className="p-6 bg-white border border-[#DCE2E6] border-t-2 border-t-[#FF9933] shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#FF9933] text-[#212121] flex items-center justify-center font-bold shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-[#0B3D91] uppercase tracking-wider block">ACCREDITED CERTIFICATION</span>
                <h2 className="text-base sm:text-lg font-bold text-[#212121]">
                  2. CEFR A1–B2 Framework &amp; Verifiable Digital Credentials
                </h2>
              </div>
            </div>
            <span className="px-3 py-1 bg-amber-100 text-amber-900 font-bold text-xs border border-amber-300 shrink-0">
              ICCR &amp; KHS ACCREDITED ✓
            </span>
          </div>

          <p className="text-xs text-[#555555] font-normal leading-relaxed">
            All language credentials and course completions are aligned with Common European Framework of Reference for Languages (CEFR) standards, verified cryptographically by Indian Council for Cultural Relations (ICCR) and Kendriya Hindi Sansthan (KHS).
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-3.5 bg-[#F5F5F5] border border-slate-200 space-y-1.5">
              <div className="flex items-center gap-2 text-[#212121] font-bold text-xs">
                <FileBadge className="w-4 h-4 text-[#FF9933]" /> Tamper-Evident QR Verification
              </div>
              <p className="text-xs text-[#555555] leading-relaxed">
                Instant public verification of certificates issued to foreign envoys and university scholars.
              </p>
            </div>

            <div className="p-3.5 bg-[#F5F5F5] border border-slate-200 space-y-1.5">
              <div className="flex items-center gap-2 text-[#212121] font-bold text-xs">
                <Zap className="w-4 h-4 text-[#138808]" /> 100% MEA Subsidized Access
              </div>
              <p className="text-xs text-[#555555] leading-relaxed">
                Full fee waiver for international diplomats and accredited scholars under bilateral fellowship programs.
              </p>
            </div>

            <div className="p-3.5 bg-[#F5F5F5] border border-slate-200 space-y-1.5">
              <div className="flex items-center gap-2 text-[#212121] font-bold text-xs">
                <Building2 className="w-4 h-4 text-[#0B3D91]" /> University Partnerships
              </div>
              <p className="text-xs text-[#555555] leading-relaxed">
                Recognized by Banaras Hindu University (BHU), Delhi University (DU), and CIIL Mysuru.
              </p>
            </div>
          </div>
        </div>

        {/* 3. CERT-IN CYBER SECURITY & DATA PRIVACY COMPLIANCE */}
        <div className="p-6 bg-[#082C6C] text-white border border-[#051C45] shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/20 pb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/10 text-amber-300 flex items-center justify-center font-bold border border-white/20 shrink-0">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider block">CYBER SECURITY AUDIT</span>
                <h2 className="text-base sm:text-lg font-bold text-white">
                  3. CERT-In 256-Bit SSL/TLS &amp; DPDP Act 2023 Compliance
                </h2>
              </div>
            </div>
            <span className="px-3 py-1 bg-emerald-400 text-[#051C45] font-bold text-xs shrink-0">
              RATING A+ SECURE
            </span>
          </div>

          <p className="text-slate-300 text-xs font-normal leading-relaxed">
            Audited in compliance with Indian Computer Emergency Response Team (CERT-In) guidelines and Digital Personal Data Protection Act (DPDP 2023). Guarantees zero unencrypted PII exposure and continuous immutable logging.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-slate-200">
            <div className="p-3.5 bg-[#051C45] border border-white/10 space-y-1">
              <h4 className="font-bold text-xs text-white">🔒 256-Bit End-to-End Encryption</h4>
              <p className="text-xs text-slate-300">All learner transcripts, passport documents, and speech evaluations are encrypted at rest and in transit.</p>
            </div>

            <div className="p-3.5 bg-[#051C45] border border-white/10 space-y-1">
              <h4 className="font-bold text-xs text-white">🛡️ Passport &amp; OAuth Identity Protection</h4>
              <p className="text-xs text-slate-300">No mandatory domestic mobile OTP constraints; safe cryptographic authorization for global users.</p>
            </div>

            <div className="p-3.5 bg-[#051C45] border border-white/10 space-y-1">
              <h4 className="font-bold text-xs text-white">📜 Immutable CERT-In Audit Trails</h4>
              <p className="text-xs text-slate-300">All administrative operations and certificate issuances logged in tamper-proof audit trails.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
