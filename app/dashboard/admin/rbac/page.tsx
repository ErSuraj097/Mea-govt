'use client';

import React, { useState } from 'react';
import { Shield, CheckCircle2, Save } from 'lucide-react';

export default function AdminRBACPage() {
  const [saved, setSaved] = useState(false);

  const rolesList = [
    { role: 'Student', perm: 'Access Levels, AI Tools, Live Classes, Exams, Certificates' },
    { role: 'Teacher', perm: 'Manage Classes, Student Rosters & Grade Assignments' },
    { role: 'Course Creator', perm: 'Build Modules, Quizzes & Submit to 6-Step Publishing Queue' },
    { role: 'Quality Tester', perm: 'Audit Devanagari Fonts, Audio Synthesis & QA Approvals' },
    { role: 'Institute Admin', perm: 'Manage Centers, Batches & Certificate Issues' },
    { role: 'Accounting Staff', perm: 'View Revenue Ledgers, IAP Gateways & Export Invoices' },
    { role: 'Super Admin', perm: 'Full System Control, RBAC Matrix & AI Gateway Config' },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs flex justify-between items-center">
        <div>
          <span className="px-2.5 py-0.5 rounded-full bg-orange-50 text-orange-600 text-xs font-bold uppercase">
            RBAC Permissions Matrix
          </span>
          <h1 className="text-2xl font-black text-slate-900 mt-1">Role-Based Access Control Manager</h1>
          <p className="text-xs text-slate-500 font-medium">Configure granular module permissions and access levels across all 7 user roles.</p>
        </div>

        <button
          onClick={() => setSaved(true)}
          className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm"
        >
          <Save className="w-4 h-4" /> Save RBAC Permissions
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between text-xs font-bold text-slate-500">
          <span>Target User Role</span>
          <span>Configured Granular Permissions</span>
        </div>

        <div className="divide-y divide-slate-100">
          {rolesList.map((r, idx) => (
            <div key={idx} className="p-4 flex items-center justify-between hover:bg-slate-50 transition text-xs">
              <span className="font-bold text-slate-900 w-48">{r.role}</span>
              <span className="text-slate-600 font-medium flex-1">{r.perm}</span>
              <span className="px-2.5 py-1 rounded bg-emerald-50 text-emerald-700 font-bold text-[10px]">
                Active Access
              </span>
            </div>
          ))}
        </div>
      </div>

      {saved && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" /> RBAC Matrix saved successfully! Permissions applied instantly.
        </div>
      )}
    </div>
  );
}
