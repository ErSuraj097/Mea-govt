import React from 'react';

export default function GlobalLoading() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col items-center justify-center p-6 space-y-4 text-center">
      <div className="relative w-16 h-16">
        <div className="w-16 h-16 border-4 border-slate-200 border-t-[#0C2340] border-r-[#F26522] border-b-[#138808] animate-spin rounded-full" />
      </div>
      <div className="space-y-1">
        <h3 className="text-sm font-black text-[#0C2340] uppercase tracking-wider">
          Government of India • Ministry of External Affairs
        </h3>
        <p className="text-xs text-slate-500 font-medium">
          Loading Sovereign Language Portal...
        </p>
      </div>
    </div>
  );
}
