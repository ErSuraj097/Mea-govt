'use client';

import React, { useState } from 'react';
import { MapPin } from 'lucide-react';

export interface MissionItem {
  country: string;
  city: string;
  center: string;
  scholars: number;
}

const DEFAULT_MISSIONS: MissionItem[] = [
  { country: 'United States', city: 'Washington D.C.', center: 'Embassy of India & SVCC Center', scholars: 420 },
  { country: 'United Kingdom', city: 'London', center: 'The Nehru Centre (High Commission of India)', scholars: 580 },
  { country: 'France', city: 'Paris', center: 'Embassy of India Cultural Wing', scholars: 310 },
  { country: 'Japan', city: 'Tokyo', center: 'Vivekananda Cultural Centre, Tokyo', scholars: 260 },
  { country: 'United Arab Emirates', city: 'Dubai & Abu Dhabi', center: 'India Cultural Mission Gulf', scholars: 890 },
  { country: 'Germany', city: 'Berlin', center: 'Tagore Centre, Embassy of India', scholars: 240 },
  { country: 'Australia', city: 'Sydney & Canberra', center: 'Swami Vivekananda Cultural Centre', scholars: 340 },
  { country: 'Russia', city: 'Moscow', center: 'Jawaharlal Nehru Cultural Centre (JNCC)', scholars: 290 },
];

export default function GlobalMissionsDirectory({ missions = DEFAULT_MISSIONS }: { missions?: MissionItem[] }) {
  const [selectedMissionCountry, setSelectedMissionCountry] = useState('all');

  const filteredMissions = selectedMissionCountry === 'all'
    ? missions
    : missions.filter((m) => m.country.toLowerCase().includes(selectedMissionCountry.toLowerCase()));

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3" aria-label="Worldwide Indian Cultural Centres and Missions Directory">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b-2 border-[#0B3D91] pb-2">
        <div>
          <span className="text-[10px] font-bold uppercase text-[#0B3D91] tracking-wider block">
            GLOBAL DIPLOMATIC NETWORK
          </span>
          <h2 className="text-base sm:text-lg font-bold text-[#212121]">
            Indian Cultural Centres &amp; Diplomatic Mission Directory
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-[#555555] font-medium">Filter Country:</span>
          <select
            value={selectedMissionCountry}
            onChange={(e) => setSelectedMissionCountry(e.target.value)}
            className="bg-white border border-slate-300 text-xs font-semibold px-2.5 py-1 focus:outline-none focus:border-[#0B3D91] rounded-md"
            aria-label="Filter diplomatic missions by country"
          >
            <option value="all">All Global Missions (190+)</option>
            <option value="United States">United States</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="France">France</option>
            <option value="Japan">Japan</option>
            <option value="United Arab Emirates">United Arab Emirates</option>
            <option value="Germany">Germany</option>
            <option value="Australia">Australia</option>
            <option value="Russia">Russia</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {filteredMissions.map((m, i) => (
          <div key={i} className="p-3.5 bg-white border border-[#DCE2E6] border-t-2 border-t-[#0B3D91] hover:border-t-[#FF9933] space-y-1.5 text-left shadow-xs transition rounded-md overflow-hidden">
            <div className="flex items-center gap-1.5 text-[#0B3D91]">
              <MapPin className="w-3.5 h-3.5 shrink-0 text-[#FF9933]" aria-hidden="true" />
              <span className="text-xs font-bold uppercase tracking-wider">{m.country}</span>
            </div>
            <h4 className="text-xs font-semibold text-[#212121]">{m.center}</h4>
            <p className="text-[11px] text-[#555555]">{m.city}</p>
            <div className="pt-1.5 border-t border-slate-100 flex justify-between items-center text-[11px]">
              <span className="text-[#555555]">Active Scholars:</span>
              <span className="font-bold text-[#0B3D91]">{m.scholars} Envoys</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
