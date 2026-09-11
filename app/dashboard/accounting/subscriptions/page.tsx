'use client';

import React from 'react';
import { Zap, CheckCircle2 } from 'lucide-react';

export default function AccountingSubscriptionsPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs">
        <span className="px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-600 text-xs font-bold uppercase">
          Pro Subscriptions
        </span>
        <h1 className="text-2xl font-black text-slate-900 mt-1">Active Recurring Pro Subscriptions</h1>
        <p className="text-xs text-slate-500 font-medium">1,240 active annual learners on ₹3,999 / year Pro plan.</p>
      </div>

      <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-xs">
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex justify-between items-center text-xs font-semibold">
          <span>Subscription Plan: Annual Hindi Pro Learning Tier</span>
          <span className="text-blue-600 font-bold">1,240 Active Subscriptions</span>
        </div>
      </div>
    </div>
  );
}
