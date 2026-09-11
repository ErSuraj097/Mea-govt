'use client';

import React from 'react';
import { DollarSign, Download, CheckCircle2 } from 'lucide-react';

export default function InstituteFeesPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs">
        <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold uppercase">
          Fee Management
        </span>
        <h1 className="text-2xl font-black text-slate-900 mt-1">Course Fee Collections & Student Receipts</h1>
        <p className="text-xs text-slate-500 font-medium">Track local physical course enrollment fees and generate official tax receipts.</p>
      </div>

      <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-xs">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="text-2xl font-black text-slate-900 block">₹4,50,000</span>
            <span className="text-xs text-slate-500 font-semibold">Total Fee Revenue</span>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="text-2xl font-black text-emerald-600 block">100%</span>
            <span className="text-xs text-slate-500 font-semibold">Collections Completed</span>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="text-2xl font-black text-blue-600 block">42 Receipts</span>
            <span className="text-xs text-slate-500 font-semibold">Issued This Batch</span>
          </div>
        </div>
      </div>
    </div>
  );
}
