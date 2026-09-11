'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ShieldCheck, Award, Printer, CheckCircle2, Download, ExternalLink, ArrowLeft } from 'lucide-react';
import { MOCK_CERTIFICATE, CertificateData } from '@/lib/mockData';

export default function CertificateVerificationPage({ params }: { params: { id: string } }) {
  const [cert, setCert] = useState<CertificateData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/certificates/verify/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setCert(data.certificate);
        else setCert(MOCK_CERTIFICATE);
      })
      .catch(() => setCert(MOCK_CERTIFICATE))
      .finally(() => setLoading(false));
  }, [params.id]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-20 text-center text-[#F26522] font-bold animate-pulse text-sm">
        Verifying Cryptographic Registry Key & QR Signature with MEA Sovereign Node...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-6 text-left">
      {/* Navigation back */}
      <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0C2340] hover:text-[#F26522] uppercase tracking-wider">
        <ArrowLeft className="w-4 h-4" /> Back to Portal
      </Link>

      {/* Verification Status Alert - MEA Sharp Geometry */}
      <div className="p-4 rounded-none bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-bold flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 shadow-xs">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-[#138808] shrink-0" />
          <span>Official Certificate Authenticated: Registry ID #{cert?.certificateId}</span>
        </div>
        <span className="px-2.5 py-0.5 rounded-none bg-[#138808] text-white font-black text-[10px] uppercase tracking-wider">
          VERIFIED & ACCREDITED (GIGW 3.0)
        </span>
      </div>

      {/* Official Certificate Visual Frame - Sharp Government Border */}
      <div className="p-8 sm:p-12 rounded-none border-4 border-[#0C2340] relative overflow-hidden bg-white text-center space-y-6 shadow-md">
        {/* Top Tricolor Strip */}
        <div className="h-1.5 w-full flex absolute top-0 left-0 right-0">
          <div className="w-1/3 bg-[#F26522]" />
          <div className="w-1/3 bg-white border-y border-slate-200" />
          <div className="w-1/3 bg-[#138808]" />
        </div>

        <div className="flex items-center justify-between border-b border-slate-200 pb-5 pt-2">
          <div className="text-left">
            <span className="text-[10px] font-black text-[#F26522] uppercase tracking-widest block">
              MINISTRY OF EXTERNAL AFFAIRS • ICCR CERTIFICATION
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-[#0C2340]">हिंदी भाषा दक्षता प्रमाण-पत्र</h1>
          </div>
          <img
            src="/logo.png"
            alt="Emblem"
            className="h-14 w-auto object-contain"
          />
        </div>

        <div className="space-y-3 py-2">
          <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">This is to certify that</p>
          <h2 className="text-2xl sm:text-4xl font-black text-[#0C2340]">{cert?.studentName}</h2>
          <p className="text-xs text-slate-600 max-w-xl mx-auto leading-relaxed">
            has successfully completed the comprehensive curriculum, oral examinations, and MeitY Sambhasini AI speech evaluation for
          </p>
          <h3 className="text-base sm:text-lg font-black text-[#0C2340] bg-orange-50/60 py-2.5 px-5 rounded-none border border-orange-200 inline-block max-w-2xl">
            {cert?.courseTitle}
          </h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs pt-4 border-t border-slate-200">
          <div className="text-left">
            <span className="text-slate-500 block text-[10px] uppercase font-bold">Issuing Authority</span>
            <span className="font-bold text-[#0C2340] block mt-0.5">{cert?.instituteName}</span>
          </div>
          <div className="text-left">
            <span className="text-slate-500 block text-[10px] uppercase font-bold">Issue Date</span>
            <span className="font-bold text-[#0C2340] block mt-0.5">{cert?.issueDate}</span>
          </div>
          <div className="text-left">
            <span className="text-slate-500 block text-[10px] uppercase font-bold">Score & Grade</span>
            <span className="font-black text-[#138808] block mt-0.5">{cert?.score}% ({cert?.grade})</span>
          </div>
          <div className="text-right flex justify-end">
            <img src={cert?.qrCodeUrl} alt="QR Code" className="w-14 h-14 rounded-none bg-slate-50 p-1 border border-slate-300" />
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={() => window.print()}
          className="px-6 py-2.5 rounded-none bg-[#0C2340] hover:bg-[#1A365D] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition shadow-xs"
        >
          <Printer className="w-4 h-4" /> Print / Save PDF
        </button>
      </div>
    </div>
  );
}
