'use client';

import React from 'react';
import { CreditCard, Shield, CheckCircle2 } from 'lucide-react';

export default function AccountingGatewaysPage() {
  const gateways = [
    { name: 'Razorpay (UPI / NetBanking)', volume: '₹8,50,000', status: 'Active 100%' },
    { name: 'Stripe Global Credit Cards', volume: '₹3,40,000', status: 'Active 100%' },
    { name: 'Apple In-App Purchase (IAP)', volume: '₹1,50,000', status: 'Active (App Store Compliant)' },
    { name: 'Google Play Billing (Android)', volume: '₹1,04,900', status: 'Active (Play Store Compliant)' },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs">
        <span className="px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-600 text-xs font-bold uppercase">
          Payment Gateways
        </span>
        <h1 className="text-2xl font-black text-slate-900 mt-1">Multi-Gateway Integration Breakdown (Sec 8)</h1>
        <p className="text-xs text-slate-500 font-medium">Razorpay, Stripe, Apple IAP, and Google Play Billing transaction volumes.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {gateways.map((g, idx) => (
          <div key={idx} className="p-6 rounded-3xl bg-white border border-slate-200 space-y-2 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-slate-900">{g.name}</span>
              <span className="px-2.5 py-0.5 rounded bg-emerald-50 text-emerald-600 font-bold text-[10px]">
                {g.status}
              </span>
            </div>
            <span className="text-2xl font-black text-slate-900 block">{g.volume}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
