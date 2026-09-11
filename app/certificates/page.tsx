'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ShieldCheck,
  Search,
  Award,
  CheckCircle2,
  FileCheck2,
  Lock,
  Building2,
  ArrowRight,
  QrCode,
  Globe
} from 'lucide-react';
import Button from '@/components/ui/Button';

export default function CertificatesDirectoryPage() {
  const router = useRouter();
  const [certId, setCertId] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!certId.trim()) return;
    setIsSearching(true);
    router.push(`/certificates/verify/${encodeURIComponent(certId.trim())}`);
  };

  const sampleCertificates = [
    { id: 'MEA-HINDI-2026-9941', name: 'Aarav Sharma', course: 'CEFR B2 Advanced Diplomatic Hindi', date: '28 Aug 2026' },
    { id: 'HLMS-2026-IND-981240', name: 'Jean-Luc Dupont', course: 'CEFR A1 Devanagari Script & Speech', date: '24 Aug 2026' },
    { id: 'INT-HLMS-2026-981240', name: 'Elena Rostova', course: 'ICCR Bilateral Hindi Fellowship Diploma', date: '20 Aug 2026' },
  ];

  return (
    <div className="min-h-screen bg-[#F4F6F9] text-left text-[#1E293B] space-y-8 pb-16 font-sans">
      {/* Top Banner */}
      <div className="bg-[#0C2340] text-white border-b-2 border-[#F26522] py-8 px-4 sm:px-6 lg:px-8 shadow-sm">
        <div className="max-w-7xl mx-auto space-y-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 bg-[#F26522] text-white font-black text-[10px] uppercase tracking-wider">
              OFFICIAL VERIFICATION REPOSITORY
            </span>
            <span className="text-slate-300 text-xs font-semibold">GIGW 3.0 & CERT-In Compliant</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white">
            Public Certificate & Diploma Verification Portal
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
            Verify cryptographically signed Indian and Foreign Language Diplomas, ICCR Bilateral Fellowships, and CEFR A1-C2 certificates issued by the Ministry of External Affairs and accredited cultural institutions.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left 7 Cols: Verification Search Form */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 sm:p-8 bg-white border border-slate-200 border-t-4 border-t-[#0C2340] shadow-sm space-y-5 rounded-none">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#0C2340] text-amber-400 flex items-center justify-center font-bold">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-base font-black text-slate-900 uppercase">Search by Certificate ID or Registry Key</h2>
                <p className="text-xs text-slate-500">Enter the unique code printed on the physical or digital diploma</p>
              </div>
            </div>

            <form onSubmit={handleSearch} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Certificate Registry Code
                </label>
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={certId}
                    onChange={(e) => setCertId(e.target.value)}
                    placeholder="e.g. MEA-HINDI-2026-9941 or HLMS-2026-IND-981240"
                    className="w-full bg-slate-50 border border-slate-300 text-slate-900 font-mono text-sm px-4 py-3 rounded-none focus:outline-none focus:border-[#0C2340] focus:bg-white transition"
                    required
                  />
                  <QrCode className="absolute right-3.5 w-5 h-5 text-slate-400 pointer-events-none" />
                </div>
                <p className="text-[11px] text-slate-500 mt-1">Case-insensitive. QR code scanners automatically forward to this node.</p>
              </div>

              <Button
                type="submit"
                variant="saffron"
                size="lg"
                isLoading={isSearching}
                className="w-full"
                leftIcon={<Search className="w-4 h-4" />}
              >
                Authenticate Certificate →
              </Button>
            </form>

            <div className="pt-4 border-t border-slate-100 space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Sample Accredited Registry IDs:</span>
              <div className="flex flex-wrap gap-2">
                {sampleCertificates.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      setCertId(c.id);
                      router.push(`/certificates/verify/${c.id}`);
                    }}
                    className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 text-[11px] font-mono font-bold transition border border-slate-300"
                  >
                    {c.id}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Accreditation Partners */}
          <div className="p-6 bg-white border border-slate-200 shadow-xs space-y-3 rounded-none">
            <h3 className="text-xs font-black uppercase text-[#0C2340] tracking-wider">
              Accredited Diplomatic & Academic Authorities
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-3 bg-slate-50 border border-slate-200 text-[11px] font-bold text-slate-800">
                ICCR Govt. of India
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 text-[11px] font-bold text-slate-800">
                Kendriya Hindi Sansthan
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 text-[11px] font-bold text-slate-800">
                MeitY Sambhasini AI
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 text-[11px] font-bold text-slate-800">
                Central Hindi Directorate
              </div>
            </div>
          </div>
        </div>

        {/* Right 5 Cols: Verification Standards */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 bg-[#0C2340] text-white border-t-4 border-[#F26522] shadow-sm space-y-4 rounded-none">
            <h3 className="text-sm font-black uppercase tracking-wider text-amber-300">
              Sovereign Cryptographic Verification
            </h3>
            <p className="text-xs text-slate-200 leading-relaxed">
              Every certificate issued through the MEA Language Portal is cryptographically signed using SHA-256 digests and registered directly into the National Academic Depository (NAD).
            </p>

            <div className="space-y-2.5 text-xs text-slate-200 pt-2 border-t border-slate-700">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Zero Forgery: Immutable hash verified against central MEA registry.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>CEFR Accredited: Recognised across 190+ diplomatic missions.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Instant PDF validation for visa, academic, or embassy applications.</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/login"
                className="block w-full py-2.5 bg-[#F26522] hover:bg-[#d85517] text-white font-black text-xs uppercase tracking-wider text-center transition"
              >
                Access Student Certificate Vault →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
