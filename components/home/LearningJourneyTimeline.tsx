'use client';

import React, { useState, useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  BookOpen,
  Award,
  Video,
  Mic,
  FileText,
  ShieldCheck,
  Sparkles
} from 'lucide-react';

interface Milestone {
  id: string;
  step: string;
  title: string;
  hindiTitle: string;
  cefrLevel: string;
  shortDesc: string;
  fullDesc: string;
  skillsAcquired: string[];
  status: 'completed' | 'in-progress' | 'upcoming';
  icon: React.ElementType;
}

const MILESTONES: Milestone[] = [
  {
    id: 'm1',
    step: 'Stage 01',
    title: 'Diagnostic Placement Test',
    hindiTitle: 'आरंभिक स्तर निर्धारण परीक्षा',
    cefrLevel: 'Entry Baseline',
    shortDesc: 'AI diagnostic evaluating script literacy in Devanagari and baseline vocabulary.',
    fullDesc:
      'A comprehensive 15-minute adaptive diagnostic powered by Sambhasini AI. Evaluates Varnamala (वर्णमाला) letter recognition, conjuncts (संयुक्ताक्षर), basic auditory discrimination, and foundational conversational vocabulary to automatically customize the curriculum path.',
    skillsAcquired: ['Vowels & Consonants (स्वर/व्यंजन)', 'Matras (मात्राएं)', 'Phonetic Baseline'],
    status: 'completed',
    icon: FileText
  },
  {
    id: 'm2',
    step: 'Stage 02',
    title: 'A1 Foundational Hindi',
    hindiTitle: 'ए1 आधारभूत भाषा क्षमता',
    cefrLevel: 'CEFR Level A1',
    shortDesc: 'Master greetings, formal protocol, basic nouns, and sentence structures.',
    fullDesc:
      'Learn standard diplomatic introductions (मेरा नाम... है), formal pronouns (आप vs तुम), numbers 1-100, directions, culinary vocabulary, and essential daily conversational exchanges with real-time phoneme feedback.',
    skillsAcquired: ['Formal Greetings', 'Present Tense Verbs', 'Noun-Gender Agreements'],
    status: 'completed',
    icon: BookOpen
  },
  {
    id: 'm3',
    step: 'Stage 03',
    title: 'First Live Diplomatic Session',
    hindiTitle: 'प्रथम प्रत्यक्ष संवाद सत्र',
    cefrLevel: 'Interactive Oral Lab',
    shortDesc: '1-on-1 speech coaching session with certified Kendriya Hindi Sansthan faculty.',
    fullDesc:
      'Engage in a live video/audio breakout room with native speech coaches. Practice retroflex consonant pronunciation (ट, ठ, ड, ढ), nasalizations (अनुस्वार/अनुनासिक), and authentic situational dialogues.',
    skillsAcquired: ['Aspirated Breath Cadence', 'Retroflex Articulation', 'Real-time Dialogues'],
    status: 'completed',
    icon: Video
  },
  {
    id: 'm4',
    step: 'Stage 04',
    title: 'A2 Intermediate Proficiency',
    hindiTitle: 'ए2 मध्यम भाषा प्रवीणता',
    cefrLevel: 'CEFR Level A2',
    shortDesc: 'Past & future tenses, compound verbs, official correspondence, and cultural idioms.',
    fullDesc:
      'Expand into compound verbs (कर लेना, दे देना), passive voice constructs, reading official circulars, comprehending Hindi news broadcasts, and writing structured formal letters and memoranda.',
    skillsAcquired: ['Ergative Case (ने)', 'Compound Verbs', 'Official Letters'],
    status: 'in-progress',
    icon: Mic
  },
  {
    id: 'm5',
    step: 'Stage 05',
    title: 'Diplomatic Colloquium & Debate',
    hindiTitle: 'राजनयिक संवाद एवं संगोष्ठी',
    cefrLevel: 'CEFR Level B1 Prep',
    shortDesc: 'Participate in multilateral mock debates and cultural exchange colloquia.',
    fullDesc:
      'Join cohort simulations representing international missions. Discuss bilateral cooperation, trade, cultural diplomacy, and global affairs using sophisticated Devanagari geopolitical vocabulary.',
    skillsAcquired: ['Geopolitical Terminology', 'Impromptu Speaking', 'Diplomatic Etiquette'],
    status: 'upcoming',
    icon: Sparkles
  },
  {
    id: 'm6',
    step: 'Stage 06',
    title: 'Official MEA & ICCR Diploma',
    hindiTitle: 'आधिकारिक विदेश मंत्रालय प्रमाणपत्र',
    cefrLevel: 'CEFR Certified B2',
    shortDesc: 'Tamper-evident cryptographically signed credential with national QR verification.',
    fullDesc:
      'Achieve verifiable CEFR B2 proficiency. Receive a digital credential co-signed by the Ministry of External Affairs, ICCR, and national academic institutions, permanently verifiable on the sovereign ledger.',
    skillsAcquired: ['Full Fluency', 'Professional Hindi Writing', 'Cryptographic Credential'],
    status: 'upcoming',
    icon: Award
  }
];

export default function LearningJourneyTimeline() {
  const [selectedMilestoneId, setSelectedMilestoneId] = useState<string>(MILESTONES[1].id);
  const [isExpandedReadMore, setIsExpandedReadMore] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 260;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const selectedMilestone = MILESTONES.find((m) => m.id === selectedMilestoneId) || MILESTONES[0];
  const MilestoneIcon = selectedMilestone.icon;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2" aria-label="Learner Journey Progress Timeline">
      <div className="bg-white border border-[#DCE2E6] shadow-xs rounded-md overflow-hidden">
        {/* Section Header Strip */}
        <div className="bg-[#0B3D91] text-white px-5 py-3 flex flex-wrap items-center justify-between gap-2 border-b-2 border-[#FF9933]">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-300" aria-hidden="true" />
            <h2 className="text-xs font-bold uppercase tracking-wider">
              LEARNER PROGRESS TIMELINE (अध्ययन यात्रा समयरेखा)
            </h2>
          </div>
          <span className="text-[11px] text-amber-200 font-semibold hidden sm:inline">
            Horizontal Scroll &amp; Milestone Expansion
          </span>
        </div>

        <div className="p-5 sm:p-7 space-y-6">
          {/* Horizontal Scroll Controls Header */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-extrabold text-[#212121]">
                Competency Progression Milestones
              </h3>
              <p className="text-xs text-[#555555]">
                Click any milestone along the sovereign roadmap to inspect requirements, syllabus, and certifications.
              </p>
            </div>
            <div className="flex items-center gap-1.5 shrink-0 ml-4">
              <button
                type="button"
                onClick={() => handleScroll('left')}
                className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 rounded-md transition focus-visible:outline-[#0B3D91]"
                aria-label="Scroll timeline left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => handleScroll('right')}
                className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 rounded-md transition focus-visible:outline-[#0B3D91]"
                aria-label="Scroll timeline right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Horizontal Scrollable Timeline Strip */}
          <div
            ref={scrollContainerRef}
            tabIndex={0}
            role="region"
            aria-label="Horizontal Milestones Strip"
            className="flex items-stretch gap-3 overflow-x-auto pb-3 pt-1 scroll-smooth focus:outline-none focus:ring-2 focus:ring-[#0B3D91]"
          >
            {MILESTONES.map((m) => {
              const isSelected = m.id === selectedMilestoneId;
              const Icon = m.icon;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => {
                    setSelectedMilestoneId(m.id);
                    setIsExpandedReadMore(false);
                  }}
                  className={`min-w-[220px] max-w-[240px] p-4 text-left border rounded-md transition-all duration-150 flex flex-col justify-between shrink-0 focus:outline-none focus:ring-2 focus:ring-[#0B3D91] ${isSelected
                      ? 'bg-[#0B3D91] text-white border-[#0B3D91] shadow-md ring-2 ring-[#FF9933]'
                      : 'bg-[#F5F5F5] hover:bg-slate-100 text-[#212121] border-[#DCE2E6]'
                    }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-[9px] font-bold px-2 py-0.5 rounded-md uppercase ${isSelected
                            ? 'bg-amber-300 text-[#082C6C]'
                            : m.status === 'completed'
                              ? 'bg-emerald-100 text-emerald-800'
                              : m.status === 'in-progress'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-slate-200 text-slate-700'
                          }`}
                      >
                        {m.cefrLevel}
                      </span>
                      <Icon
                        className={`w-4 h-4 ${isSelected ? 'text-amber-300' : 'text-[#0B3D91]'
                          }`}
                      />
                    </div>

                    <div>
                      <span className="text-[10px] font-bold block opacity-80">{m.step}</span>
                      <h4 className="text-xs font-extrabold leading-tight">{m.title}</h4>
                      <span className="text-[10px] font-semibold opacity-90 block mt-0.5">
                        {m.hindiTitle}
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 pt-2 border-t border-current/20 flex items-center justify-between text-[10px] font-bold">
                    <span>{isSelected ? 'Active Milestone' : 'View Details →'}</span>
                    {m.status === 'completed' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Expanded Milestone Detail Card */}
          <div className="bg-[#F5F5F5] border border-[#DCE2E6] p-5 sm:p-6 rounded-md animate-in fade-in duration-200">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Milestone Icon & Title Header */}
              <div className="lg:col-span-4 space-y-2 border-b lg:border-b-0 lg:border-r border-slate-300 pb-4 lg:pb-0 lg:pr-6">
                <div className="w-10 h-10 bg-[#0B3D91] text-amber-300 flex items-center justify-center rounded-md font-bold">
                  <MilestoneIcon className="w-5 h-5 text-[#FF9933]" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#0B3D91] block">
                    {selectedMilestone.step} • {selectedMilestone.cefrLevel}
                  </span>
                  <h3 className="text-base font-extrabold text-[#212121]">
                    {selectedMilestone.title}
                  </h3>
                  <span className="text-xs font-bold text-[#0B3D91]">
                    {selectedMilestone.hindiTitle}
                  </span>
                </div>

                <div className="pt-2">
                  <span
                    className={`inline-block text-[10px] font-bold px-2.5 py-1 rounded-md uppercase ${selectedMilestone.status === 'completed'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : selectedMilestone.status === 'in-progress'
                          ? 'bg-amber-100 text-amber-800 border border-amber-300'
                          : 'bg-slate-200 text-slate-700 border border-slate-300'
                      }`}
                  >
                    ● Status: {selectedMilestone.status.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Milestone Description + Read More Toggle */}
              <div className="lg:col-span-8 space-y-4 text-left">
                <p className="text-xs text-[#555555] font-normal leading-relaxed">
                  {isExpandedReadMore
                    ? selectedMilestone.fullDesc
                    : selectedMilestone.shortDesc}
                </p>

                <button
                  type="button"
                  onClick={() => setIsExpandedReadMore(!isExpandedReadMore)}
                  className="text-xs font-bold text-[#0645AD] hover:underline focus:outline-none focus:ring-1 focus:ring-[#0645AD] rounded-md px-1 py-0.5 inline-block"
                  aria-expanded={isExpandedReadMore}
                >
                  {isExpandedReadMore ? 'Show Less ↑' : 'Read Full Syllabus & Details →'}
                </button>

                {/* Skills Acquired */}
                <div className="space-y-1.5 pt-2">
                  <span className="text-[10px] font-bold uppercase text-slate-500 tracking-wider block">
                    Core Competencies Tested:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedMilestone.skillsAcquired.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 bg-white border border-[#DCE2E6] text-[11px] font-semibold text-[#0B3D91] rounded-md"
                      >
                        ✓ {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
