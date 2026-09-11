'use client';

import React from 'react';
import Link from 'next/link';
import { DollarSign, CreditCard, RefreshCw, Layers, TrendingUp, ShieldCheck, ArrowRight, FileSpreadsheet } from 'lucide-react';

export default function AccountingOverview() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto text-left animate-in fade-in duration-200">
      {/* MEA Header */}
      <div className="p-6 rounded-none bg-[#0C2340] border-l-4 border-[#F26522] text-white shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="px-2.5 py-0.5 rounded-none bg-emerald-400/20 text-emerald-300 text-[10px] font-black uppercase tracking-wider border border-emerald-400/30">
            Treasury & Financial Operations
          </span>
          <h1 className="text-2xl font-black text-white mt-1">Sovereign Financial Ledger & Gateway Console</h1>
          <p className="text-xs text-slate-300 font-medium">Bilateral fellowship settlements, multi-currency payment gateways, refund escrow, and PFMS reconciliation.</p>
        </div>
        <div className="flex gap-2">
          <Link
            href="/dashboard/accounting?tab=revenue"
            className="px-4 py-2 bg-[#F26522] hover:bg-[#d85517] text-white text-xs font-bold uppercase tracking-wider rounded-none transition"
          >
            Revenue Report
          </Link>
        </div>
      </div>

      {/* KPI Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-none bg-white border border-slate-200 space-y-2 shadow-sm border-t-2 border-t-[#0C2340]">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Gross Fee Settlement (FY 26-27)</span>
          <span className="text-3xl font-black text-[#0C2340] block">₹4.82 Crore</span>
          <span className="text-xs text-[#138808] font-bold">ICCR Fellowships + International Subscriptions</span>
        </div>
        <div className="p-6 rounded-none bg-white border border-slate-200 space-y-2 shadow-sm border-t-2 border-t-[#F26522]">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Payment Gateways</span>
          <span className="text-3xl font-black text-[#F26522] block">3 Connected</span>
          <span className="text-xs text-slate-600 font-bold">Bharat BillPay (BBPS), Stripe Global & SBI ePay</span>
        </div>
        <div className="p-6 rounded-none bg-white border border-slate-200 space-y-2 shadow-sm border-t-2 border-t-[#138808]">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Refund Escrow SLA</span>
          <span className="text-3xl font-black text-[#138808] block">0 Pending</span>
          <span className="text-xs text-[#138808] font-bold">100% On-Time Processing</span>
        </div>
      </div>

      {/* Financial Operations Hub */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Link
          href="/dashboard/accounting?tab=revenue"
          className="p-5 rounded-none bg-white border border-slate-200 hover:border-[#0C2340] transition space-y-2 shadow-sm group"
        >
          <div className="w-10 h-10 rounded-none bg-blue-50 text-[#0C2340] flex items-center justify-center font-bold">
            <TrendingUp className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black text-slate-900 group-hover:text-[#F26522] transition">Revenue Analytics</h3>
          <p className="text-xs text-slate-500">Breakdown of international student fee collections by currency and ICCR grants.</p>
        </Link>

        <Link
          href="/dashboard/accounting?tab=gateways"
          className="p-5 rounded-none bg-white border border-slate-200 hover:border-[#0C2340] transition space-y-2 shadow-sm group"
        >
          <div className="w-10 h-10 rounded-none bg-orange-50 text-[#F26522] flex items-center justify-center font-bold">
            <CreditCard className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black text-slate-900 group-hover:text-[#F26522] transition">Payment Gateways</h3>
          <p className="text-xs text-slate-500">Manage API credentials for SBI ePay, Stripe, Razorpay International, and RBI compliance.</p>
        </Link>

        <Link
          href="/dashboard/accounting?tab=subscriptions"
          className="p-5 rounded-none bg-white border border-slate-200 hover:border-[#0C2340] transition space-y-2 shadow-sm group"
        >
          <div className="w-10 h-10 rounded-none bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
            <Layers className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black text-slate-900 group-hover:text-[#F26522] transition">Subscription Tiers</h3>
          <p className="text-xs text-slate-500">Configure Free Community, Diplomatic Mission, and University Academic tiers.</p>
        </Link>

        <Link
          href="/dashboard/accounting?tab=refunds"
          className="p-5 rounded-none bg-white border border-slate-200 hover:border-[#0C2340] transition space-y-2 shadow-sm group"
        >
          <div className="w-10 h-10 rounded-none bg-emerald-50 text-[#138808] flex items-center justify-center font-bold">
            <RefreshCw className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black text-slate-900 group-hover:text-[#F26522] transition">Refunds & Escrow</h3>
          <p className="text-xs text-slate-500">Review student refund disputes, exam cancellation reimbursements, and receipts.</p>
        </Link>
      </div>
    </div>
  );
}
