'use client';

import React from 'react';
import { UserCheck, MapPin, Plus } from 'lucide-react';
import { MOCK_INSTITUTES } from '@/lib/mockData';

export default function InstituteBatchesPage() {
  const inst = MOCK_INSTITUTES[0];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs flex justify-between items-center">
        <div>
          <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold uppercase">
            Center Batches
          </span>
          <h1 className="text-2xl font-black text-slate-900 mt-1">Physical Batches & Seat Allocations</h1>
          <p className="text-xs text-slate-500 font-medium">Manage classroom centers, timings, teacher assignments, and seat capacities.</p>
        </div>
        <button className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm">
          <Plus className="w-4 h-4" /> Create New Batch
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {inst.availableCenters.map((c, idx) => (
          <div key={idx} className="p-6 rounded-3xl bg-white border border-slate-200 space-y-3 shadow-xs">
            <span className="text-xs font-bold text-indigo-600 uppercase flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" /> {c.city} Center
            </span>
            <h3 className="text-base font-bold text-slate-900">{c.area} Campus</h3>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs flex justify-between">
              <span className="text-slate-500">Seats Remaining:</span>
              <span className="font-bold text-emerald-600">{c.seatsLeft} Seats</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
