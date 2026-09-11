'use client';

import React, { useState, useEffect } from 'react';
import {
  Award,
  Download,
  ShieldCheck,
  QrCode,
  Share2,
  CheckCircle2,
  Building2,
  Sparkles,
  ExternalLink,
  Printer,
  X,
  Globe,
  Search,
  Filter,
  Check,
  Copy,
  Medal,
  FileCheck2
} from 'lucide-react';
import { getStoredUser } from '@/lib/lmsStore';
import { User } from '@/lib/mockData';

interface CertificateItem {
  id: string;
  title: string;
  subtitle: string;
  track: 'Track A (Indian Bhashas)' | 'Track B (Foreign Languages)' | 'Global Multilingual';
  languages: string[];
  issuedDate: string;
  code: string;
  level: string;
  issuingBody: string;
  score: string;
  badgeColor: string;
}

const MOCK_CERTIFICATES: CertificateItem[] = [
  {
    id: 'cert_1',
    title: 'Accredited International Diploma in Devanagari & SOV Grammar',
    subtitle: 'Advanced Syntactic Alignment & Classical Sentence Construction',
    track: 'Track A (Indian Bhashas)',
    languages: ['Hindi', 'Sanskrit'],
    issuedDate: '28 August 2026',
    code: 'MEA-BHASHA-2026-981240',
    level: 'CEFR B2 / Upper Intermediate',
    issuingBody: 'Kendriya Hindi Sansthan & Ministry of External Affairs',
    score: '96.5% Distinction',
    badgeColor: 'bg-amber-500'
  },
  {
    id: 'cert_2',
    title: 'Tamil-Hindi Cognates & Phonetic Harmony Certificate',
    subtitle: 'Cross-Linguistic Dravidian & Devanagari Vocabulary Bridge',
    track: 'Track A (Indian Bhashas)',
    languages: ['Tamil', 'Hindi'],
    issuedDate: '15 August 2026',
    code: 'CIIL-BRIDGE-2026-761294',
    level: 'CEFR B1 / Intermediate',
    issuingBody: 'Central Institute of Indian Languages (CIIL), Mysuru',
    score: '94.0% Honors',
    badgeColor: 'bg-[#0B3D91]'
  },
  {
    id: 'cert_3',
    title: 'Diplomatic French & Communiqué Drafting Certification',
    subtitle: 'Multilateral Protocol, Note Verbale & Formal Diplomatic Phrasing',
    track: 'Track B (Foreign Languages)',
    languages: ['French'],
    issuedDate: '02 September 2026',
    code: 'MEA-FR-DIP-2026-442109',
    level: 'CEFR B2 / Diplomatic Level',
    issuingBody: 'EFLU Hyderabad & Alliance Française Accredited',
    score: '98.0% High Distinction',
    badgeColor: 'bg-indigo-600'
  },
  {
    id: 'cert_4',
    title: 'German CEFR B2 Business & Geopolitical Proficiency Diploma',
    subtitle: 'Complex Sentence Embedding & Diplomatic Policy Translation',
    track: 'Track B (Foreign Languages)',
    languages: ['German'],
    issuedDate: '20 July 2026',
    code: 'GOETHE-JNU-2026-339102',
    level: 'CEFR B2 / Professional',
    issuingBody: 'Goethe-Institut & JNU School of Languages',
    score: '95.2% Honors',
    badgeColor: 'bg-[#0B3D91]'
  },
  {
    id: 'cert_5',
    title: 'Pan-Indian 22 Bhasha Multilingual Fellow Certification',
    subtitle: 'Comprehensive Multilingual Competency Across Eighth Schedule Languages',
    track: 'Track A (Indian Bhashas)',
    languages: ['All 22 Scheduled Languages'],
    issuedDate: '10 June 2026',
    code: 'MEA-GLOBAL-2026-001928',
    level: 'National Bhasha Fellow (C1)',
    issuingBody: 'Ministry of External Affairs, Govt of India',
    score: '99.1% Outstanding',
    badgeColor: 'bg-amber-600'
  }
];

export default function StudentCertificatesPage() {
  const [user, setUser] = useState<User | null>(null);
  const [selectedTrack, setSelectedTrack] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Instant Certificate Verification Input state
  const [verifyInputCode, setVerifyInputCode] = useState('');
  const [verificationResult, setVerificationResult] = useState<{
    status: 'IDLE' | 'VERIFIED' | 'NOT_FOUND';
    details?: CertificateItem;
  }>({ status: 'IDLE' });

  useEffect(() => {
    setUser(getStoredUser());
  }, []);

  const filteredCertificates = MOCK_CERTIFICATES.filter((cert) => {
    const matchesTrack =
      selectedTrack === 'ALL' ||
      (selectedTrack === 'INDIAN' && cert.track.includes('Indian')) ||
      (selectedTrack === 'FOREIGN' && cert.track.includes('Foreign'));

    const matchesSearch =
      cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.issuingBody.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.languages.some((l) => l.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesTrack && matchesSearch;
  });

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleVerifyCode = () => {
    if (!verifyInputCode.trim()) return;
    const found = MOCK_CERTIFICATES.find(
      (c) => c.code.toLowerCase() === verifyInputCode.trim().toLowerCase()
    );
    if (found) {
      setVerificationResult({ status: 'VERIFIED', details: found });
    } else {
      setVerificationResult({ status: 'NOT_FOUND' });
    }
  };

  return (
    <div className="space-y-8 max-w-8xl mx-auto pb-16">
      {/* Official MEA Government Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0B3D91] via-[#082C6C] to-[#051C45] text-white border border-[#0B3D91] shadow-xl relative overflow-hidden space-y-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10 border-b border-white/10 pb-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#FF9933] text-[#051C45] text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
                <Award className="w-3.5 h-3.5" /> VERIFIED DIPLOMAS & CERTIFICATION HUB
              </span>
              <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-200 text-[10px] font-bold uppercase border border-blue-400/30 flex items-center gap-1">
                <Globe className="w-3 h-3 text-cyan-300" /> Track A & Track B Credentials
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Diplomas & Accredited Certificates
            </h1>
            <p className="text-xs sm:text-sm text-blue-100 font-medium leading-relaxed">
              Official Ministry of External Affairs, Kendriya Hindi Sansthan, and CIIL verified language diplomas with cryptographic QR validation codes and digital transcripts.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15 min-w-[240px]">
            <ShieldCheck className="w-8 h-8 text-amber-300 shrink-0" />
            <div>
              <span className="text-[10px] font-bold text-blue-200 block uppercase tracking-wider">CRYPTOGRAPHIC QR VALIDATED</span>
              <span className="text-base font-black text-white">5 Active Credentials</span>
              <span className="text-[10px] text-emerald-300 font-extrabold block">● Government Recognized</span>
            </div>
          </div>
        </div>

        {/* Live Track Filter & Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-2 bg-black/20 p-1.5 rounded-2xl border border-white/10 w-full sm:w-auto">
            <button
              onClick={() => setSelectedTrack('ALL')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                selectedTrack === 'ALL'
                  ? 'bg-[#FF9933] text-[#051C45] shadow-md'
                  : 'text-blue-100 hover:text-white hover:bg-white/10'
              }`}
            >
              🌐 All Diplomas ({MOCK_CERTIFICATES.length})
            </button>
            <button
              onClick={() => setSelectedTrack('INDIAN')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                selectedTrack === 'INDIAN'
                  ? 'bg-[#FF9933] text-[#051C45] shadow-md'
                  : 'text-blue-100 hover:text-white hover:bg-white/10'
              }`}
            >
              🇮🇳 Track A: Indian Bhashas
            </button>
            <button
              onClick={() => setSelectedTrack('FOREIGN')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                selectedTrack === 'FOREIGN'
                  ? 'bg-[#FF9933] text-[#051C45] shadow-md'
                  : 'text-blue-100 hover:text-white hover:bg-white/10'
              }`}
            >
              🌍 Track B: Foreign Languages
            </button>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-300 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search diploma, code, or issuing body..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white placeholder-blue-200 text-xs font-medium focus:outline-none focus:bg-white/20"
            />
          </div>
        </div>
      </div>

      {/* CERTIFICATE VERIFICATION TOOL BOX */}
      <div className="p-6 rounded-3xl bg-white border border-[#DCE2E6] shadow-2xs space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <FileCheck2 className="w-5 h-5 text-[#0B3D91]" />
          <h3 className="text-base font-black text-[#1B2A4A]">Public Certificate Authenticity Verification Tool</h3>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={verifyInputCode}
            onChange={(e) => setVerifyInputCode(e.target.value)}
            placeholder="Enter verification code (e.g. MEA-BHASHA-2026-981240)..."
            className="flex-1 p-3 rounded-xl bg-[#F8FAFC] border border-[#DCE2E6] text-xs font-mono font-bold text-[#1B2A4A] focus:outline-none focus:border-[#0B3D91]"
          />
          <button
            onClick={handleVerifyCode}
            className="px-6 py-3 rounded-xl bg-[#0B3D91] hover:bg-[#082C6C] text-white font-extrabold text-xs shadow-md transition shrink-0"
          >
            Verify Credential Authenticity
          </button>
        </div>

        {verificationResult.status === 'VERIFIED' && verificationResult.details && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs space-y-2 text-emerald-950 animate-in fade-in duration-200">
            <div className="flex items-center gap-2 text-emerald-700 font-extrabold text-sm">
              <CheckCircle2 className="w-5 h-5" /> CREDENTIAL VERIFIED GENUINE
            </div>
            <p className="font-semibold">
              Diploma Code <strong>{verificationResult.details.code}</strong> issued to <strong>{user?.name || 'Aarav Sharma'}</strong> on {verificationResult.details.issuedDate} by {verificationResult.details.issuingBody}.
            </p>
          </div>
        )}

        {verificationResult.status === 'NOT_FOUND' && (
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-950 font-bold animate-in fade-in duration-200">
            ❌ Invalid or Unregistered Verification Code. Please check the diploma registration code and try again.
          </div>
        )}
      </div>

      {/* CERTIFICATES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCertificates.map((cert) => (
          <div
            key={cert.id}
            className="bg-white rounded-3xl border border-[#DCE2E6] p-6 space-y-5 shadow-2xs hover:shadow-xl transition duration-300 flex flex-col justify-between group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                  cert.track.includes('Indian')
                    ? 'bg-amber-50 text-amber-900 border-amber-200'
                    : 'bg-indigo-50 text-indigo-900 border-indigo-200'
                }`}>
                  {cert.track}
                </span>

                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-xs font-bold text-[#0B3D91] bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                    {cert.code}
                  </span>
                  <button
                    onClick={() => handleCopyCode(cert.code)}
                    className="p-1 text-slate-400 hover:text-[#0B3D91] transition"
                    title="Copy Code"
                  >
                    {copiedCode === cert.code ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <h3 className="text-lg font-black text-[#1B2A4A] group-hover:text-[#0B3D91] transition">
                  {cert.title}
                </h3>
                <p className="text-xs font-bold text-[#0B3D91]">{cert.subtitle}</p>
              </div>

              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[10px] font-extrabold text-slate-400 uppercase">Languages:</span>
                {cert.languages.map((lang, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded bg-blue-50 text-[#0B3D91] text-[10px] font-bold border border-blue-100">
                    {lang}
                  </span>
                ))}
              </div>

              <div className="p-4 rounded-2xl bg-[#EEF3F8] border border-[#D0DCE7] space-y-1.5 text-xs font-semibold">
                <div className="flex justify-between">
                  <span className="text-slate-500">Awarded To:</span>
                  <span className="text-[#1B2A4A] font-extrabold">{user?.name || 'Aarav Sharma'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Issuing Authority:</span>
                  <span className="text-[#0B3D91] font-bold">{cert.issuingBody}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Proficiency Level:</span>
                  <span className="text-indigo-700 font-extrabold">{cert.level}</span>
                </div>
                <div className="flex justify-between border-t border-slate-200/80 pt-1.5">
                  <span className="text-slate-500">Assessment Score:</span>
                  <span className="text-emerald-700 font-black">{cert.score}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3 mt-auto">
              <button
                onClick={() => setSelectedCert(cert)}
                className="px-4 py-2 rounded-xl bg-[#EEF3F8] hover:bg-[#0B3D91] text-[#0B3D91] hover:text-white font-bold text-xs transition"
              >
                View Full Diploma
              </button>
              <button
                onClick={() =>
                  alert(
                    `📥 DOWNLOAD STARTED:\n\nOfficial PDF Diploma Certificate\nCode: ${cert.code}\nScholar: ${
                      user?.name || 'Aarav Sharma'
                    }`
                  )
                }
                className="px-5 py-2 rounded-xl bg-[#0B3D91] hover:bg-[#082C6C] text-white font-extrabold text-xs shadow-md transition flex items-center gap-1.5"
              >
                <Download className="w-4 h-4 text-[#FF9933]" /> Download PDF
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* FULL HIGH-RES DIPLOMA VIEW MODAL */}
      {selectedCert && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-3xl bg-white border border-[#DCE2E6] rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200 text-left my-4">
            <div className="flex items-center justify-between border-b border-[#DCE2E6] pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#0B3D91] flex items-center justify-center text-white shrink-0">
                  <Award className="w-5 h-5 text-[#FF9933]" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase text-[#0B3D91] bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                    {selectedCert.track}
                  </span>
                  <h3 className="font-extrabold text-base text-[#1B2A4A] mt-0.5">
                    Official Government Diploma Certificate
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setSelectedCert(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 font-bold"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Certificate Frame Sheet */}
            <div className="p-8 sm:p-10 rounded-3xl bg-[#F8FAFC] border-8 border-[#0B3D91] space-y-6 text-center shadow-inner relative overflow-hidden">
              <div className="flex items-center justify-center gap-2">
                <Building2 className="w-6 h-6 text-[#0B3D91]" />
                <span className="text-xs font-black uppercase text-[#0B3D91] tracking-widest">
                  MINISTRY OF EXTERNAL AFFAIRS • GOVERNMENT OF INDIA
                </span>
              </div>

              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-serif font-black text-[#1B2A4A]">
                  {selectedCert.title}
                </h2>
                <p className="text-xs font-bold text-[#0B3D91]">{selectedCert.subtitle}</p>
              </div>

              <div className="py-3 border-y border-slate-200/80 my-2">
                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
                  THIS CERTIFICATE IS OFFICIALLY CONFERRED UPON
                </p>
                <h3 className="text-2xl sm:text-3xl font-black text-[#0B3D91] mt-1 underline decoration-[#FF9933] underline-offset-8">
                  {user?.name || 'Aarav Sharma'}
                </h3>
                <p className="text-xs text-slate-500 font-bold mt-1">
                  Mother Tongue / Native State: {user?.state || 'Delhi NCR, India'}
                </p>
              </div>

              <p className="text-xs text-slate-600 max-w-lg mx-auto font-medium leading-relaxed">
                Having successfully completed the accredited language evaluation criteria at grade{' '}
                <strong>{selectedCert.level}</strong> with an overall score of{' '}
                <strong className="text-emerald-700">{selectedCert.score}</strong> under authority of{' '}
                <strong>{selectedCert.issuingBody}</strong>.
              </p>

              <div className="flex items-center justify-between pt-6 border-t border-slate-200 text-xs font-bold text-slate-700">
                <div className="text-left">
                  <span className="text-[9px] text-slate-400 block uppercase">ISSUE DATE</span>
                  <span className="text-slate-900">{selectedCert.issuedDate}</span>
                </div>

                <div className="p-2.5 bg-white rounded-2xl border border-slate-300 shadow-sm flex flex-col items-center">
                  <QrCode className="w-12 h-12 text-[#0B3D91]" />
                  <span className="text-[8px] font-mono text-slate-400 mt-1">SCAN TO VERIFY</span>
                </div>

                <div className="text-right">
                  <span className="text-[9px] text-slate-400 block uppercase">DIPLOMA REGISTRATION</span>
                  <span className="font-mono text-[#0B3D91] font-black text-sm">{selectedCert.code}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <button
                onClick={() => handleCopyCode(selectedCert.code)}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5"
              >
                <Copy className="w-4 h-4" />
                {copiedCode === selectedCert.code ? 'Copied Code!' : 'Copy Verification Code'}
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => alert(`🖨️ Printing diploma certificate...`)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5"
                >
                  <Printer className="w-4 h-4" /> Print Diploma
                </button>
                <button
                  onClick={() => {
                    alert(`📥 Download started for ${selectedCert.code}`);
                    setSelectedCert(null);
                  }}
                  className="px-6 py-2.5 rounded-xl bg-[#0B3D91] hover:bg-[#082C6C] text-white font-extrabold text-xs shadow-md flex items-center gap-1.5"
                >
                  <Download className="w-4 h-4 text-[#FF9933]" /> Download PDF Certificate
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
