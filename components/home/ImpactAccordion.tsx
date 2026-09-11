'use client';

import React, { useState } from 'react';
import {
  Users2,
  Globe2,
  Award,
  Building2,
  ChevronDown,
  TrendingUp,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

interface MetricAccordionItem {
  id: string;
  tabLabel: string;
  hindiLabel: string;
  statValue: string;
  statSuffix: string;
  shortDescription: string;
  detailedMetrics: { label: string; value: string }[];
  highlight: string;
  icon: React.ElementType;
  badge: string;
}

const ACCORDION_METRICS: MetricAccordionItem[] = [
  {
    id: 'learners',
    tabLabel: 'Learners Enrolled',
    hindiLabel: 'पंजीकृत शिक्षार्थी',
    statValue: '284,500',
    statSuffix: '+ Global Learners',
    shortDescription:
      'Active foreign diplomats, ICCR fellowship awardees, university scholars, and diaspora community members across all 7 continents.',
    detailedMetrics: [
      { label: 'Diplomatic Envoys', value: '4,120' },
      { label: 'ICCR Scholars', value: '18,400' },
      { label: 'Diaspora Youth', value: '262,000' }
    ],
    highlight: 'Zero-OTP overseas registration with multi-factor diplomatic authentication.',
    icon: Users2,
    badge: 'Active Cohort'
  },
  {
    id: 'languages',
    tabLabel: 'Languages Live',
    hindiLabel: 'सक्रिय भाषाएं',
    statValue: '22',
    statSuffix: 'Eighth Schedule Official Languages',
    shortDescription:
      'Phase 1 flagship Hindi curriculum along with 21 other constitutionally recognized Indian languages and major international diplomatic tongues.',
    detailedMetrics: [
      { label: 'Phase 1 Active Track', value: 'Hindi (हिंदी)' },
      { label: 'Indian Regional Tongues', value: '21 Scheduled' },
      { label: 'Bidirectional Foreign Pairs', value: '14 Global' }
    ],
    highlight: 'Powered by MeitY Sambhasini AI Speech Acoustic Calibration.',
    icon: Globe2,
    badge: 'Sovereign Diversity'
  },
  {
    id: 'certifications',
    tabLabel: 'Certifications Issued',
    hindiLabel: 'जारी किए गए प्रमाण पत्र',
    statValue: '62,890',
    statSuffix: 'Tamper-Evident Diplomas',
    shortDescription:
      'Official CEFR-aligned Level A1 to B2 proficiency certificates with cryptographic tamper-evident QR verification co-accredited by MEA and Kendriya Hindi Sansthan.',
    detailedMetrics: [
      { label: 'CEFR A1 / A2 Diplomas', value: '41,200' },
      { label: 'CEFR B1 / B2 Diplomas', value: '21,690' },
      { label: 'Verification Rate', value: '99.98%' }
    ],
    highlight: 'Cryptographic public verification portal with instant accreditation check.',
    icon: Award,
    badge: 'Verifiable Credentials'
  },
  {
    id: 'countries',
    tabLabel: 'Countries Reached',
    hindiLabel: 'पहुंच वाले देश',
    statValue: '190',
    statSuffix: '+ Sovereign Nations',
    shortDescription:
      'Direct deployment across Indian Embassies, High Commissions, Consulates, and Swami Vivekananda Cultural Centres (SVCC) globally.',
    detailedMetrics: [
      { label: 'Indian Diplomatic Missions', value: '190+' },
      { label: 'ICCR Cultural Centres', value: '38 Active' },
      { label: 'Partner Global Universities', value: '142' }
    ],
    highlight: 'Unified global access with 24/7 sovereign server infrastructure in New Delhi.',
    icon: Building2,
    badge: 'Global Footprint'
  }
];

export default function ImpactAccordion() {
  const [activeTabId, setActiveTabId] = useState<string>(ACCORDION_METRICS[0].id);

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let newIndex = index;
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      newIndex = (index + 1) % ACCORDION_METRICS.length;
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      newIndex = (index - 1 + ACCORDION_METRICS.length) % ACCORDION_METRICS.length;
    }
    if (newIndex !== index) {
      setActiveTabId(ACCORDION_METRICS[newIndex].id);
      const tabEl = document.getElementById(`impact-tab-${ACCORDION_METRICS[newIndex].id}`);
      if (tabEl) tabEl.focus();
    }
  };

  const activeItem = ACCORDION_METRICS.find((m) => m.id === activeTabId) || ACCORDION_METRICS[0];
  const IconComponent = activeItem.icon;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2" aria-label="Portal Impact and Key Metrics Accordion">
      <div className="bg-white border border-[#DCE2E6] shadow-xs rounded-md overflow-hidden">
        {/* Header Ribbon */}
        <div className="bg-[#0B3D91] text-white px-5 py-3 flex flex-wrap items-center justify-between gap-2 border-b-2 border-[#FF9933]">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-amber-300" aria-hidden="true" />
            <h2 className="text-xs font-bold uppercase tracking-wider">
              PORTAL IMPACT &amp; VERIFIED ACCORDION METRICS (प्रभाव एवं आंकड़े)
            </h2>
          </div>
          <span className="text-[11px] text-amber-200 font-semibold hidden sm:inline">
            Single-Open Interactive Tabbed Architecture
          </span>
        </div>

        <div className="p-5 sm:p-7 space-y-5">
          {/* Tab Navigation Strip */}
          <div
            role="tablist"
            aria-label="Portal Impact Metrics"
            className="grid grid-cols-2 md:grid-cols-4 gap-2 border-b border-slate-200 pb-3"
          >
            {ACCORDION_METRICS.map((item, idx) => {
              const isSelected = item.id === activeTabId;
              const ItemIcon = item.icon;
              return (
                <button
                  key={item.id}
                  id={`impact-tab-${item.id}`}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  aria-controls={`impact-panel-${item.id}`}
                  tabIndex={isSelected ? 0 : -1}
                  onClick={() => setActiveTabId(item.id)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                  className={`p-3 text-left border rounded-md transition-all duration-150 flex flex-col justify-between focus:outline-none focus:ring-2 focus:ring-[#0B3D91] ${isSelected
                      ? 'bg-[#0B3D91] text-white border-[#0B3D91] shadow-sm'
                      : 'bg-[#F5F5F5] hover:bg-slate-100 text-[#212121] border-[#DCE2E6]'
                    }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <div
                      className={`w-6 h-6 rounded-md flex items-center justify-center text-xs ${isSelected ? 'bg-white/20 text-amber-300' : 'bg-[#0B3D91]/10 text-[#0B3D91]'
                        }`}
                    >
                      <ItemIcon className="w-3.5 h-3.5" />
                    </div>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${isSelected ? 'rotate-180 text-amber-300' : 'text-slate-400'
                        }`}
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold block opacity-80">{item.hindiLabel}</span>
                    <span className="text-xs font-extrabold block leading-tight">{item.tabLabel}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Expanded Single Detail Panel */}
          <div
            id={`impact-panel-${activeItem.id}`}
            role="tabpanel"
            aria-labelledby={`impact-tab-${activeItem.id}`}
            className="bg-[#F5F5F5] border border-[#DCE2E6] p-5 sm:p-6 rounded-md animate-in fade-in duration-200"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Stat Highlight Column */}
              <div className="lg:col-span-4 space-y-2 border-b lg:border-b-0 lg:border-r border-slate-300 pb-4 lg:pb-0 lg:pr-6">
                <span className="inline-block px-2 py-0.5 bg-[#0B3D91]/10 text-[#0B3D91] text-[10px] font-bold uppercase rounded-md">
                  {activeItem.badge}
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-extrabold text-[#0B3D91] font-mono">
                    {activeItem.statValue}
                  </span>
                </div>
                <p className="text-xs font-bold text-[#212121]">{activeItem.statSuffix}</p>
                <div className="pt-2 flex items-center gap-1.5 text-[11px] text-[#138808] font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{activeItem.highlight}</span>
                </div>
              </div>

              {/* Description & Detailed Sub-metrics */}
              <div className="lg:col-span-8 space-y-4">
                <p className="text-xs text-[#555555] font-normal leading-relaxed">
                  {activeItem.shortDescription}
                </p>

                {/* Sub-metrics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  {activeItem.detailedMetrics.map((dm, idx) => (
                    <div
                      key={idx}
                      className="bg-white border border-[#DCE2E6] p-3 rounded-md shadow-2xs"
                    >
                      <span className="text-[10px] font-bold uppercase text-slate-500 block truncate">
                        {dm.label}
                      </span>
                      <span className="text-sm font-extrabold text-[#0B3D91] font-mono block mt-0.5">
                        {dm.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
