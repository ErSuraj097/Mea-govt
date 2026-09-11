'use client';

import React from 'react';
import { BarChart3, ArrowUpRight, Download } from 'lucide-react';

export default function AccountingRevenuePage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs flex justify-between items-center">
        <div>
          <span className="px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-600 text-xs font-bold uppercase">
            Financial Analytics
          </span>
          <h1 className="text-2xl font-black text-slate-900 mt-1">Platform Revenue Ledgers (₹14.4 Lakhs)</h1>
          <p className="text-xs text-slate-500 font-medium">Monthly revenue breakdown, course sales, subscriptions, and university revenue sharing.</p>
        </div>
        <button className="px-5 py-2.5 rounded-xl bg-rose-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm">
          <Download className="w-4 h-4" /> Export CSV Report
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-2 shadow-xs">
          <span className="text-xs text-slate-500 font-bold block">Course Sales Revenue</span>
          <span className="text-2xl font-black text-slate-900">₹6,94,900</span>
          <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-0.5">
            <ArrowUpRight className="w-3.5 h-3.5" /> +22% vs last month
          </span>
        </div>
        <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-2 shadow-xs">
          <span className="text-xs text-slate-500 font-bold block">Annual Pro Subscriptions</span>
          <span className="text-2xl font-black text-blue-600">₹4,95,876</span>
          <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-0.5">
            <ArrowUpRight className="w-3.5 h-3.5" /> +15% vs last month
          </span>
        </div>
        <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-2 shadow-xs">
          <span className="text-xs text-slate-500 font-bold block">Institute Payouts Shared</span>
          <span className="text-2xl font-black text-indigo-600">₹2,54,124</span>
          <span className="text-[11px] font-bold text-slate-500">Distributed to 4 Institutes</span>
        </div>
      </div>
    </div>
  );
}
