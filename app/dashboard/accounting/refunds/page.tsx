'use client';

import React from 'react';
import { FileEdit, CheckCircle2 } from 'lucide-react';

export default function AccountingRefundsPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs">
        <span className="px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-600 text-xs font-bold uppercase">
          Refund Resolution
        </span>
        <h1 className="text-2xl font-black text-slate-900 mt-1">Refund Processing Queue (0 Pending)</h1>
        <p className="text-xs text-slate-500 font-medium">Review purchase dispute requests, verify payment transaction IDs, and process refunds.</p>
      </div>

      <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-3 shadow-xs">
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" /> All refund requests resolved! Zero pending disputes in queue.
        </div>
      </div>
    </div>
  );
}
