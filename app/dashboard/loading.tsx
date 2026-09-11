import React from 'react';
import Skeleton from '@/components/ui/Skeleton';

export default function DashboardLoading() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4 animate-in fade-in duration-200">
      <div className="h-32 bg-slate-200 animate-pulse border-l-4 border-slate-400" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="h-28 bg-slate-200 animate-pulse border border-slate-300" />
        <div className="h-28 bg-slate-200 animate-pulse border border-slate-300" />
        <div className="h-28 bg-slate-200 animate-pulse border border-slate-300" />
      </div>
      <div className="h-64 bg-slate-200 animate-pulse border border-slate-300" />
    </div>
  );
}
