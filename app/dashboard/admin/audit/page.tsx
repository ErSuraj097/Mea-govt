'use client';

import React from 'react';
import { History, ShieldCheck } from 'lucide-react';

export default function AdminAuditPage() {
  const auditLogs = [
    { action: 'Course Approved & Published', target: 'Level 4 Intermediate Hindi', user: 'Super Admin', time: '27 Aug 2026 10:25' },
    { action: 'Certificate Issued', target: 'HLMS-2026-884920 (Aarav Sharma)', user: 'System Automated', time: '28 Aug 2026 08:00' },
    { action: 'RBAC Permission Edit', target: 'Granted Sub-Admin Access to Teacher Role', user: 'Super Admin', time: '28 Aug 2026 08:15' },
    { action: 'AI Gateway Model Switch', target: 'Updated Active Model to Gemini 1.5 Pro', user: 'Super Admin', time: '28 Aug 2026 09:30' },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs">
        <span className="px-2.5 py-0.5 rounded-full bg-orange-50 text-orange-600 text-xs font-bold uppercase">
          Audit Trail System (Sec 38)
        </span>
        <h1 className="text-2xl font-black text-slate-900 mt-1">Immutable System Audit Logs</h1>
        <p className="text-xs text-slate-500 font-medium">Every administrative action is immutably logged with role, user ID, module, and timestamp.</p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between text-xs font-bold text-slate-500">
          <span>Action Performed</span>
          <span>Target Module & User</span>
          <span>Timestamp</span>
        </div>

        <div className="divide-y divide-slate-100">
          {auditLogs.map((log, idx) => (
            <div key={idx} className="p-4 flex items-center justify-between hover:bg-slate-50 transition text-xs">
              <span className="font-bold text-slate-900 w-64">{log.action}</span>
              <span className="text-slate-600 font-medium flex-1">{log.target} ({log.user})</span>
              <span className="text-slate-400 font-semibold">{log.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
