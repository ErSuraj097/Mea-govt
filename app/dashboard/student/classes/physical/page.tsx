'use client';

import React, { useState } from 'react';
import {
  Building2,
  MapPin,
  Calendar,
  Users,
  Clock,
  Phone,
  Mail,
  CheckCircle2,
  Navigation,
  Sparkles,
  Search,
  Filter,
  Ticket,
  Globe,
  Award,
  X,
  FileCheck
} from 'lucide-react';

interface PhysicalCenter {
  id: string;
  name: string;
  hindiSubName: string;
  track: 'Track A (Indian Bhashas)' | 'Track B (Foreign Languages)' | 'Global Multilingual';
  institute: string;
  city: string;
  state: string;
  address: string;
  phone: string;
  availableSeats: number;
  totalSeats: number;
  upcomingBatch: string;
  timings: string;
  languagesOffered: string[];
}

const PHYSICAL_CENTERS: PhysicalCenter[] = [
  {
    id: 'pc_1',
    name: 'Kendriya Hindi Sansthan — Agra Main Campus',
    hindiSubName: 'केंद्रीय हिंदी संस्थान — आगरा मुख्यालय',
    track: 'Track A (Indian Bhashas)',
    institute: 'Autonomous Body under Ministry of Education, Govt of India',
    city: 'Agra',
    state: 'Uttar Pradesh',
    address: 'Khandari Campus, Agra, UP - 282005',
    phone: '+91 562 2520330',
    availableSeats: 14,
    totalSeats: 40,
    upcomingBatch: '15 September 2026',
    timings: 'Mon-Fri (09:30 AM - 01:30 PM)',
    languagesOffered: ['Advanced Hindi', 'Devanagari Script', 'Indian Phonetics']
  },
  {
    id: 'pc_2',
    name: 'Central Institute of Indian Languages (CIIL) Mysore',
    hindiSubName: 'भारतीय भाषा संस्थान — मयसूरु केंद्र',
    track: 'Track A (Indian Bhashas)',
    institute: 'Department of Higher Education, Govt of India',
    city: 'Mysuru',
    state: 'Karnataka',
    address: 'Manasagangothri, Mysuru, Karnataka - 570006',
    phone: '+91 821 2515820',
    availableSeats: 8,
    totalSeats: 35,
    upcomingBatch: '20 September 2026',
    timings: 'Mon-Sat (10:00 AM - 04:00 PM)',
    languagesOffered: ['Tamil-Hindi Bridge', 'Telugu', 'Kannada', 'Hindi']
  },
  {
    id: 'pc_3',
    name: 'University of Delhi — Arts Faculty Language Center',
    hindiSubName: 'दिल्ली विश्वविद्यालय — कला संकाय परिसर',
    track: 'Track A (Indian Bhashas)',
    institute: 'DU Central Campus, North Delhi',
    city: 'New Delhi',
    state: 'Delhi NCR',
    address: 'University Enclave, North Campus, Delhi - 110007',
    phone: '+91 11 27666675',
    availableSeats: 22,
    totalSeats: 50,
    upcomingBatch: '01 October 2026',
    timings: 'Tue-Sun (08:00 AM - 12:00 PM)',
    languagesOffered: ['Sanskrit', 'Hindi Literature', '22 Bhasha Foundations']
  },
  {
    id: 'pc_4',
    name: 'The English and Foreign Languages University (EFLU) Hyderabad',
    hindiSubName: 'अंग्रेजी एवं विदेशी भाषा विश्वविद्यालय — हैदराबाद',
    track: 'Track B (Foreign Languages)',
    institute: 'EFLU Central University Campus',
    city: 'Hyderabad',
    state: 'Telangana',
    address: 'Tarnaka, Hyderabad, Telangana - 500007',
    phone: '+91 40 27689000',
    availableSeats: 19,
    totalSeats: 45,
    upcomingBatch: '18 September 2026',
    timings: 'Mon-Fri (02:00 PM - 06:00 PM)',
    languagesOffered: ['French', 'Spanish', 'German', 'Diplomatic Interpretation']
  },
  {
    id: 'pc_5',
    name: 'JNU School of Language Physical Training Center',
    hindiSubName: 'जवाहरलाल नेहरू विश्वविद्यालय — भाषा परिसर',
    track: 'Track B (Foreign Languages)',
    institute: 'JNU Campus, New Delhi',
    city: 'New Delhi',
    state: 'Delhi NCR',
    address: 'New Mehrauli Road, New Delhi - 110067',
    phone: '+91 11 26742676',
    availableSeats: 12,
    totalSeats: 30,
    upcomingBatch: '25 September 2026',
    timings: 'Mon-Fri (10:00 AM - 02:00 PM)',
    languagesOffered: ['Mandarin Chinese', 'Russian', 'Japanese', 'Persian']
  }
];

export default function DashboardPhysicalClassesPage() {
  const [selectedTrack, setSelectedTrack] = useState<string>('ALL');
  const [selectedState, setSelectedState] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [registeredCenter, setRegisteredCenter] = useState<PhysicalCenter | null>(null);

  const [isBooked, setIsBooked] = useState(false);
  const [gatePassCode, setGatePassCode] = useState('');

  const states = ['All', 'Uttar Pradesh', 'Karnataka', 'Delhi NCR', 'Telangana'];

  const filteredCenters = PHYSICAL_CENTERS.filter((c) => {
    const matchesTrack =
      selectedTrack === 'ALL' ||
      (selectedTrack === 'INDIAN' && c.track.includes('Indian')) ||
      (selectedTrack === 'FOREIGN' && c.track.includes('Foreign'));

    const matchesState = selectedState === 'All' || c.state === selectedState;

    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.hindiSubName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.languagesOffered.some((l) => l.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesTrack && matchesState && matchesSearch;
  });

  const handleOpenModal = (center: PhysicalCenter) => {
    setRegisteredCenter(center);
    setIsBooked(false);
    setGatePassCode('');
  };

  const handleConfirmBooking = () => {
    const pass = `GATE-OFFLINE-2026-${Math.floor(100000 + Math.random() * 900000)}`;
    setGatePassCode(pass);
    setIsBooked(true);
  };

  return (
    <div className="space-y-8 max-w-8xl mx-auto pb-16">
      {/* MEA Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0B3D91] via-[#082C6C] to-[#051C45] text-white border border-[#0B3D91] shadow-xl relative overflow-hidden space-y-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10 border-b border-white/10 pb-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#FF9933] text-[#051C45] text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
                <Building2 className="w-3.5 h-3.5" /> PHYSICAL CLASSROOM TRAINING CENTERS & OFFLINE BATCHES
              </span>
              <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-200 text-[10px] font-bold uppercase border border-blue-400/30 flex items-center gap-1">
                <Globe className="w-3 h-3 text-cyan-300" /> Government Accredited On-Campus Labs
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Physical Learning & Training Centers
            </h1>
            <p className="text-xs sm:text-sm text-blue-100 font-medium leading-relaxed">
              Register for in-person classroom instruction at government accredited campuses across Agra, Mysore, Delhi NCR, and Hyderabad with hostel accommodation, language labs, and official certification.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15 min-w-[240px]">
            <Award className="w-8 h-8 text-amber-300 shrink-0" />
            <div>
              <span className="text-[10px] font-bold text-blue-200 block uppercase tracking-wider">OFFLINE BATCH SEATS</span>
              <span className="text-base font-black text-white">Subsidized Quotas</span>
              <span className="text-[10px] text-emerald-300 font-extrabold block">Official Hall Pass Issued</span>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-2 bg-black/20 p-1.5 rounded-2xl border border-white/10 w-full sm:w-auto">
            <button
              onClick={() => setSelectedTrack('ALL')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                selectedTrack === 'ALL'
                  ? 'bg-[#FF9933] text-[#051C45] shadow-md'
                  : 'text-blue-100 hover:text-white hover:bg-white/10'
              }`}
            >
              🌐 All Centers ({PHYSICAL_CENTERS.length})
            </button>
            <button
              onClick={() => setSelectedTrack('INDIAN')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                selectedTrack === 'INDIAN'
                  ? 'bg-[#FF9933] text-[#051C45] shadow-md'
                  : 'text-blue-100 hover:text-white hover:bg-white/10'
              }`}
            >
              🇮🇳 Track A: Indian Bhashas
            </button>
            <button
              onClick={() => setSelectedTrack('FOREIGN')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                selectedTrack === 'FOREIGN'
                  ? 'bg-[#FF9933] text-[#051C45] shadow-md'
                  : 'text-blue-100 hover:text-white hover:bg-white/10'
              }`}
            >
              🌍 Track B: Foreign Languages
            </button>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-300 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search city, center, or institute..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white placeholder-blue-200 text-xs font-medium focus:outline-none focus:bg-white/20"
            />
          </div>
        </div>
      </div>

      {/* State Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1 shrink-0 mr-2">
          <Filter className="w-3.5 h-3.5 text-[#0B3D91]" /> State / Region:
        </span>
        {states.map((st) => (
          <button
            key={st}
            onClick={() => setSelectedState(st)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold whitespace-nowrap transition border ${
              selectedState === st
                ? 'bg-[#0B3D91] text-white border-[#0B3D91] shadow-xs'
                : 'bg-white text-slate-700 border-[#DCE2E6] hover:border-[#0B3D91]/50 hover:bg-slate-50'
            }`}
          >
            {st === 'All' ? '📍 All States' : st}
          </button>
        ))}
      </div>

      {/* CENTERS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCenters.map((center) => (
          <div
            key={center.id}
            className="bg-white rounded-3xl border border-[#DCE2E6] p-6 space-y-5 shadow-2xs hover:shadow-xl transition duration-300 flex flex-col justify-between group"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3">
                <div className="space-y-1">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                    center.track.includes('Indian')
                      ? 'bg-amber-50 text-amber-900 border-amber-200'
                      : 'bg-indigo-50 text-indigo-900 border-indigo-200'
                  }`}>
                    {center.track} • {center.state}
                  </span>
                  <h3 className="text-lg font-black text-[#1B2A4A] group-hover:text-[#0B3D91] transition mt-1">
                    {center.name}
                  </h3>
                  <p className="text-xs text-slate-500 font-bold">{center.hindiSubName}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-black border border-emerald-200 block">
                    {center.availableSeats} Seats Left
                  </span>
                </div>
              </div>

              <div className="space-y-2 text-xs font-semibold text-slate-700">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#0B3D91] shrink-0 mt-0.5" />
                  <span>{center.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#FF9933] shrink-0" />
                  <span>Timings: {center.timings}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>Next Batch Start: <strong className="text-[#0B3D91]">{center.upcomingBatch}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Center Helpline: {center.phone}</span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#F8FAFC] border border-[#DCE2E6] space-y-1.5 text-xs">
                <span className="text-[10px] font-black uppercase text-[#0B3D91]">OFFERED LANGUAGES & LABS:</span>
                <div className="flex flex-wrap gap-1.5">
                  {center.languagesOffered.map((lang, idx) => (
                    <span key={idx} className="px-2.5 py-0.5 rounded-full bg-white text-[#1B2A4A] border border-[#DCE2E6] font-bold text-[10px]">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3 mt-auto">
              <span className="text-[11px] font-bold text-slate-500">Subsidized Government Quota</span>
              <button
                onClick={() => handleOpenModal(center)}
                className="px-5 py-2.5 rounded-xl bg-[#0B3D91] hover:bg-[#082C6C] text-white font-extrabold text-xs shadow-md transition flex items-center gap-1.5"
              >
                <Ticket className="w-4 h-4 text-[#FF9933]" /> Book Classroom Seat →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* SEAT CONFIRMATION MODAL */}
      {registeredCenter && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white border border-[#DCE2E6] rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200 text-left">
            <div className="flex items-center justify-between border-b border-[#DCE2E6] pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#0B3D91] flex items-center justify-center text-white shrink-0">
                  <Building2 className="w-5 h-5 text-[#FF9933]" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase text-[#0B3D91] bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                    {registeredCenter.track}
                  </span>
                  <h3 className="font-black text-base text-[#1B2A4A] mt-0.5">Physical Seat Reservation</h3>
                </div>
              </div>
              <button
                onClick={() => setRegisteredCenter(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 font-bold"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {!isBooked ? (
              <div className="space-y-5 text-xs">
                <div className="p-4 rounded-2xl bg-[#EEF3F8] border border-[#D0DCE7] space-y-1.5">
                  <span className="text-[10px] font-black uppercase text-[#0B3D91]">CENTER LOCATION</span>
                  <h4 className="font-black text-[#1B2A4A] text-sm">{registeredCenter.name}</h4>
                  <p className="text-slate-600 font-bold">{registeredCenter.address}</p>
                </div>

                <div className="space-y-2 font-semibold">
                  <div className="flex justify-between border-b border-slate-100 pb-2">
                    <span className="text-slate-500">Upcoming Batch Start:</span>
                    <span className="text-[#0B3D91] font-extrabold">{registeredCenter.upcomingBatch}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 pb-2">
                    <span className="text-slate-500">Class Timings:</span>
                    <span className="text-slate-900 font-bold">{registeredCenter.timings}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 pb-2">
                    <span className="text-slate-500">Seats Available:</span>
                    <span className="text-emerald-700 font-black">{registeredCenter.availableSeats} / {registeredCenter.totalSeats} Seats</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Hostel Accommodation:</span>
                    <span className="text-indigo-600 font-extrabold">Available on Request</span>
                  </div>
                </div>

                <div className="pt-3 flex items-center justify-end gap-3 border-t border-[#DCE2E6]">
                  <button
                    type="button"
                    onClick={() => setRegisteredCenter(null)}
                    className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleConfirmBooking}
                    className="px-6 py-2.5 rounded-xl bg-[#0B3D91] hover:bg-[#082C6C] text-white font-extrabold text-xs shadow-md flex items-center gap-2"
                  >
                    <FileCheck className="w-4 h-4 text-[#FF9933]" /> Confirm Booking & Generate Gate Pass
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-6 space-y-4 animate-in fade-in zoom-in-95 duration-200">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl font-black text-[#1B2A4A]">Classroom Seat Reserved!</h3>
                  <p className="text-xs text-slate-600 font-medium">
                    Your physical batch seat has been allocated at the campus.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 max-w-md mx-auto space-y-2 text-left text-xs">
                  <div className="flex justify-between border-b border-slate-200 pb-2">
                    <span className="text-slate-500 font-bold">Gate Pass Reference ID:</span>
                    <span className="font-mono font-black text-[#0B3D91]">{gatePassCode}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-2">
                    <span className="text-slate-500 font-bold">Campus Center:</span>
                    <span className="font-bold text-slate-900">{registeredCenter.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-bold">Batch Start Date:</span>
                    <span className="font-extrabold text-indigo-700">{registeredCenter.upcomingBatch}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setRegisteredCenter(null)}
                  className="px-8 py-3 rounded-xl bg-[#0B3D91] hover:bg-[#082C6C] text-white font-extrabold text-xs shadow-md mx-auto block"
                >
                  Close & Download Campus Hall Pass
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
