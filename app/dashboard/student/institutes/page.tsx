'use client';

import React, { useState } from 'react';
import {
  Building2,
  MapPin,
  GraduationCap,
  Users,
  Search,
  CheckCircle2,
  ExternalLink,
  Award,
  Globe,
  BookOpen,
  Filter,
  X,
  FileCheck,
  Check
} from 'lucide-react';

interface InstituteItem {
  id: string;
  name: string;
  hindiNameSubtitle: string;
  location: string;
  track: 'Track A (Indian Bhashas)' | 'Track B (Foreign Languages)' | 'Global Multilingual';
  languagesOffered: string[];
  specialization: string;
  established: string;
  studentsEnrolled: number;
  coursesCount: number;
  accreditation: string;
  description: string;
  scholarshipQuota: string;
}

const INSTITUTES_LIST: InstituteItem[] = [
  {
    id: 'inst_1',
    name: 'Central Hindi Institute (Kendriya Hindi Sansthan), Agra',
    hindiNameSubtitle: 'केंद्रीय हिंदी संस्थान, आगरा (मुख्यालय)',
    location: 'Agra, Uttar Pradesh',
    track: 'Track A (Indian Bhashas)',
    languagesOffered: ['Hindi', 'Sanskrit', 'Devanagari Script'],
    specialization: 'Hindi Linguistics, Devanagari Pedagogy, Foreign Scholar Training',
    established: '1960',
    studentsEnrolled: 14200,
    coursesCount: 28,
    accreditation: 'Autonomous Body under Ministry of Education, Govt of India',
    description: 'Premier autonomous educational institute offering recognized diploma & degree courses in Hindi, Devanagari script, and Indian cultural linguistics for national and international scholars.',
    scholarshipQuota: '100% MEA Subsidized Quota Available'
  },
  {
    id: 'inst_2',
    name: 'Central Institute of Indian Languages (CIIL), Mysuru',
    hindiNameSubtitle: 'भारतीय भाषा संस्थान (CIIL), मयसूरु',
    location: 'Mysuru, Karnataka',
    track: 'Track A (Indian Bhashas)',
    languagesOffered: ['Tamil', 'Telugu', 'Kannada', 'Malayalam', 'Odia', 'Bengali', 'All 22 Languages'],
    specialization: '22 Scheduled Languages, Dravidian Phonetics, NLP Corpus & Speech AI',
    established: '1969',
    studentsEnrolled: 18500,
    coursesCount: 35,
    accreditation: 'Dept of Higher Education, Govt of India',
    description: 'National center for research and training in all major Indian languages, dialect mapping, Dravidian phonetics, and speech translation technology.',
    scholarshipQuota: 'National Bhasha Fellowship Granted'
  },
  {
    id: 'inst_3',
    name: 'The English and Foreign Languages University (EFLU), Hyderabad',
    hindiNameSubtitle: 'अंग्रेजी एवं विदेशी भाषा विश्वविद्यालय (EFLU), हैदराबाद',
    location: 'Hyderabad, Telangana',
    track: 'Track B (Foreign Languages)',
    languagesOffered: ['French', 'German', 'Spanish', 'Japanese', 'Arabic', 'Russian', 'Italian'],
    specialization: 'Global Foreign Languages, Diplomatic Translation & Interpretation',
    established: '1958',
    studentsEnrolled: 11300,
    coursesCount: 42,
    accreditation: 'Central University • NAAC Grade A++',
    description: 'Premier central university specializing in foreign language education, diplomatic interpretation, translation studies, and international cultural exchange.',
    scholarshipQuota: 'Government Diplomatic Exchange Quota'
  },
  {
    id: 'inst_4',
    name: 'Banaras Hindu University (BHU) — Sanskrit & Oriental Studies',
    hindiNameSubtitle: 'बनारस हिंदू विश्वविद्यालय (BHU) — संस्कृत विद्या धर्म विज्ञान संकाय',
    location: 'Varanasi, Uttar Pradesh',
    track: 'Track A (Indian Bhashas)',
    languagesOffered: ['Sanskrit', 'Pali', 'Prakrit', 'Vedic Literature'],
    specialization: 'Sanskrit Grammar, Paninian Phonetics, Classical Philosophy & Manuscripts',
    established: '1916',
    studentsEnrolled: 22000,
    coursesCount: 50,
    accreditation: 'Central University • Institution of Eminence',
    description: 'Historic center of excellence for classical Sanskrit studies, manuscript preservation, Paninian grammar, and authentic Indian knowledge systems.',
    scholarshipQuota: 'Vedic Scholar Merit Scholarship'
  },
  {
    id: 'inst_5',
    name: 'Jawaharlal Nehru University (JNU) — School of Languages',
    hindiNameSubtitle: 'जवाहरलाल नेहरू विश्वविद्यालय (JNU) — भाषा अध्ययन संस्थान',
    location: 'New Delhi',
    track: 'Track B (Foreign Languages)',
    languagesOffered: ['Mandarin Chinese', 'Korean', 'Japanese', 'Russian', 'Persian', 'Turkish', 'Spanish'],
    specialization: 'East Asian, Middle Eastern & Eurasian Diplomatic Language Training',
    established: '1969',
    studentsEnrolled: 15400,
    coursesCount: 48,
    accreditation: 'Central University • NAAC Grade A++',
    description: 'Leading national institute for advanced research in Asian, European, and Middle Eastern languages with direct linkage to diplomatic & foreign service careers.',
    scholarshipQuota: 'MEA Direct Fellowship Program'
  },
  {
    id: 'inst_6',
    name: 'Central Sanskrit University (CSU), New Delhi',
    hindiNameSubtitle: 'केंद्रीय संस्कृत विश्वविद्यालय, नई दिल्ली',
    location: 'New Delhi',
    track: 'Track A (Indian Bhashas)',
    languagesOffered: ['Sanskrit', 'Devanagari', 'Manuscriptology'],
    specialization: 'Sanskrit Lexicography, Classical Epigraphy & Digital Sanskrit NLP',
    established: '1970',
    studentsEnrolled: 19800,
    coursesCount: 38,
    accreditation: 'Central University established by Act of Parliament',
    description: 'Premier university for the promotion, digital preservation, and advanced research of classical Sanskrit literature and computational linguistics.',
    scholarshipQuota: '100% Free Tuition for National Rankers'
  }
];

export default function DashboardInstitutesPage() {
  const [selectedTrack, setSelectedTrack] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInst, setSelectedInst] = useState<InstituteItem | null>(null);

  const [isApplied, setIsApplied] = useState(false);
  const [applicationRef, setApplicationRef] = useState('');

  const filteredInst = INSTITUTES_LIST.filter((ins) => {
    const matchesTrack =
      selectedTrack === 'ALL' ||
      (selectedTrack === 'INDIAN' && ins.track.includes('Indian')) ||
      (selectedTrack === 'FOREIGN' && ins.track.includes('Foreign'));

    const matchesSearch =
      ins.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ins.hindiNameSubtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ins.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ins.languagesOffered.some((l) => l.toLowerCase().includes(searchQuery.toLowerCase())) ||
      ins.specialization.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTrack && matchesSearch;
  });

  const handleOpenModal = (inst: InstituteItem) => {
    setSelectedInst(inst);
    setIsApplied(false);
    setApplicationRef('');
  };

  const handleApplySeat = () => {
    const refCode = `REG-MEA-INST-${Math.floor(100000 + Math.random() * 900000)}`;
    setApplicationRef(refCode);
    setIsApplied(true);
  };

  return (
    <div className="space-y-8 max-w-8xl mx-auto pb-16">
      {/* MEA Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0B3D91] via-[#082C6C] to-[#051C45] text-white border border-[#0B3D91] shadow-xl relative overflow-hidden space-y-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10 border-b border-white/10 pb-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#FF9933] text-[#051C45] text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
                <Building2 className="w-3.5 h-3.5" /> ACCREDITED UNIVERSITIES & RESEARCH INSTITUTES
              </span>
              <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-200 text-[10px] font-bold uppercase border border-blue-400/30 flex items-center gap-1">
                <Globe className="w-3 h-3 text-cyan-300" /> Government of India Accredited Centers
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Accredited Language Institutes Directory
            </h1>
            <p className="text-xs sm:text-sm text-blue-100 font-medium leading-relaxed">
              Explore Government of India accredited language institutes, Central Universities, and research academies issuing recognized diplomas, degree credits, and diplomatic certifications across 22 Indian Bhashas and 15 Foreign World Languages.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15 min-w-[240px]">
            <Award className="w-8 h-8 text-amber-300 shrink-0" />
            <div>
              <span className="text-[10px] font-bold text-blue-200 block uppercase tracking-wider">ACCREDITED UNIVERSITIES</span>
              <span className="text-base font-black text-white">6 Premier Institutes</span>
              <span className="text-[10px] text-emerald-300 font-extrabold block">100% Recognized Diplomas</span>
            </div>
          </div>
        </div>

        {/* Live Track Filter & Search */}
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
              🌐 All Centers ({INSTITUTES_LIST.length})
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
              placeholder="Search university, city, or language..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white placeholder-blue-200 text-xs font-medium focus:outline-none focus:bg-white/20"
            />
          </div>
        </div>
      </div>

      {/* INSTITUTES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredInst.map((inst) => (
          <div
            key={inst.id}
            className="bg-white rounded-3xl border border-[#DCE2E6] p-6 space-y-5 shadow-2xs hover:shadow-xl transition duration-300 flex flex-col justify-between group"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3">
                <div className="space-y-1">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                    inst.track.includes('Indian')
                      ? 'bg-amber-50 text-amber-900 border-amber-200'
                      : 'bg-indigo-50 text-indigo-900 border-indigo-200'
                  }`}>
                    {inst.track} • Estd. {inst.established}
                  </span>
                  <h3 className="text-lg font-black text-[#1B2A4A] group-hover:text-[#0B3D91] transition mt-1">
                    {inst.name}
                  </h3>
                  <p className="text-xs text-slate-500 font-bold">{inst.hindiNameSubtitle}</p>
                </div>
              </div>

              {/* Languages Offered Pills */}
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[10px] font-extrabold text-slate-400 uppercase">Languages:</span>
                {inst.languagesOffered.map((lang, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded-md bg-blue-50 border border-blue-100 text-[#0B3D91] text-[10px] font-bold">
                    {lang}
                  </span>
                ))}
              </div>

              <div className="space-y-2 text-xs font-semibold text-slate-700">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#0B3D91] shrink-0" />
                  <span>{inst.location}</span>
                </div>
                <div className="flex items-start gap-2">
                  <GraduationCap className="w-4 h-4 text-[#FF9933] shrink-0 mt-0.5" />
                  <span>Specialization: {inst.specialization}</span>
                </div>
              </div>

              <p className="text-xs text-slate-600 font-medium leading-relaxed">{inst.description}</p>

              <div className="p-3.5 rounded-2xl bg-[#F8FAFC] border border-[#DCE2E6] flex justify-around text-xs font-black">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">ENROLLED SCHOLARS</span>
                  <span className="text-[#0B3D91]">{inst.studentsEnrolled.toLocaleString()}</span>
                </div>
                <div className="border-r border-slate-200" />
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">PROGRAMS OFFERED</span>
                  <span className="text-[#FF9933]">{inst.coursesCount} Courses</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3 mt-auto">
              <span className="text-[11px] font-bold text-emerald-700 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Govt Accredited Center
              </span>
              <button
                onClick={() => handleOpenModal(inst)}
                className="px-5 py-2.5 rounded-xl bg-[#0B3D91] hover:bg-[#082C6C] text-white font-extrabold text-xs shadow-md transition flex items-center gap-1.5"
              >
                <BookOpen className="w-4 h-4 text-[#FF9933]" /> View Programs & Apply →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* DETAILS MODAL */}
      {selectedInst && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-white border border-[#DCE2E6] rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200 text-left">
            <div className="flex items-center justify-between border-b border-[#DCE2E6] pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#0B3D91] flex items-center justify-center text-white shrink-0">
                  <Building2 className="w-5 h-5 text-[#FF9933]" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase text-[#0B3D91] bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                    {selectedInst.track}
                  </span>
                  <h3 className="font-black text-base text-[#1B2A4A] mt-0.5">{selectedInst.name}</h3>
                </div>
              </div>
              <button
                onClick={() => setSelectedInst(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 font-bold"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {!isApplied ? (
              <div className="space-y-5 text-xs">
                <p className="text-slate-600 font-medium leading-relaxed">{selectedInst.description}</p>

                <div className="p-4 rounded-2xl bg-[#EEF3F8] border border-[#D0DCE7] space-y-2.5 font-semibold">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Location:</span>
                    <span className="text-[#0B3D91] font-extrabold">{selectedInst.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Accreditation Authority:</span>
                    <span className="text-emerald-700 font-bold">{selectedInst.accreditation}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Specialization:</span>
                    <span className="text-slate-900 font-bold">{selectedInst.specialization}</span>
                  </div>
                  <div className="flex justify-between border-t border-slate-200/80 pt-2">
                    <span className="text-slate-500">Scholarship Quota:</span>
                    <span className="text-[#0B3D91] font-black">{selectedInst.scholarshipQuota}</span>
                  </div>
                </div>

                {/* Programs List */}
                <div className="space-y-2">
                  <h4 className="font-bold text-[#1B2A4A] flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4 text-[#FF9933]" /> Available University Programs & Diplomas:
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-[11px] font-bold text-slate-700">
                    <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Advanced Diploma in Translation</span>
                    </div>
                    <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Phonetics & Audio Certification</span>
                    </div>
                    <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Diplomatic Protocol & Communiqué</span>
                    </div>
                    <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Script & Calligraphy Masterclass</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 flex items-center justify-end gap-3 border-t border-[#DCE2E6]">
                  <button
                    onClick={() => setSelectedInst(null)}
                    className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
                  >
                    Close
                  </button>
                  <button
                    onClick={handleApplySeat}
                    className="px-6 py-2.5 rounded-xl bg-[#0B3D91] hover:bg-[#082C6C] text-white font-extrabold text-xs shadow-md flex items-center gap-2"
                  >
                    <FileCheck className="w-4 h-4 text-[#FF9933]" /> Submit Direct University Admission Request
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-6 space-y-4 animate-in fade-in zoom-in-95 duration-200">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl font-black text-[#1B2A4A]">Admission Application Submitted!</h3>
                  <p className="text-xs text-slate-600 font-medium">
                    Your enrollment request has been routed to the university registrar office.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 max-w-md mx-auto space-y-2 text-left text-xs">
                  <div className="flex justify-between border-b border-slate-200 pb-2">
                    <span className="text-slate-500 font-bold">Application Ref Code:</span>
                    <span className="font-mono font-black text-[#0B3D91]">{applicationRef}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-2">
                    <span className="text-slate-500 font-bold">University Name:</span>
                    <span className="font-bold text-slate-900">{selectedInst.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-bold">Scholarship Status:</span>
                    <span className="font-extrabold text-emerald-700">{selectedInst.scholarshipQuota}</span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedInst(null)}
                  className="px-8 py-3 rounded-xl bg-[#0B3D91] hover:bg-[#082C6C] text-white font-extrabold text-xs shadow-md mx-auto block"
                >
                  Close & Return to Institutes
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
