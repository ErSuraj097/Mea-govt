'use client';

import React, { useState, useEffect } from 'react';
import {
  Globe,
  ArrowRightLeft,
  CheckCircle2,
  Sparkles,
  Search,
  Filter
} from 'lucide-react';
import {
  CONFIGURED_LANGUAGE_PAIRS,
  SCHEDULE_VIII_LANGUAGES,
  FOREIGN_LANGUAGES,
  LanguagePair,
  LearningTrackType
} from '@/lib/bidirectionalData';
import {
  getActiveTrack,
  setActiveTrack,
  getActivePair,
  setActivePair
} from '@/lib/lmsStore';

export default function LanguagePairSelector({ onSelect }: { onSelect?: (pair: LanguagePair) => void }) {
  const [activeTrack, setActiveTrackState] = useState<LearningTrackType>('trackA');
  const [selectedPair, setSelectedPair] = useState<LanguagePair>(CONFIGURED_LANGUAGE_PAIRS[0]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setActiveTrackState(getActiveTrack());
    setSelectedPair(getActivePair());
  }, []);

  const handleTrackChange = (track: LearningTrackType) => {
    setActiveTrack(track);
    setActiveTrackState(track);
    const firstPairForTrack = CONFIGURED_LANGUAGE_PAIRS.find((p) => p.track === track) || CONFIGURED_LANGUAGE_PAIRS[0];
    setSelectedPair(firstPairForTrack);
    setActivePair(firstPairForTrack.id);
    if (onSelect) onSelect(firstPairForTrack);
  };

  const handlePairSelect = (pair: LanguagePair) => {
    setSelectedPair(pair);
    setActivePair(pair.id);
    if (onSelect) onSelect(pair);
  };

  const filteredPairs = CONFIGURED_LANGUAGE_PAIRS.filter((p) => {
    const matchesTrack = p.track === activeTrack;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTrack && matchesSearch;
  });

  return (
    <div className="space-y-4 text-left">
      {/* Track Selector Header */}
      <div className="p-5 sm:p-6 rounded-sm bg-gradient-to-r from-[#0B3D91] via-[#082C6C] to-[#051C45] text-white border border-[#082C6C] space-y-4 shadow-sm border-l-4 border-[#FF9933]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-extrabold uppercase text-[#FF9933] tracking-wider block">
              BIDIRECTIONAL PROPAGATION ENGINE
            </span>
            <h2 className="text-lg sm:text-xl font-black text-white">
              Configure Source → Target Language Pair
            </h2>
          </div>

          {/* Track A / Track B Switcher */}
          <div className="flex items-center bg-[#051C45] p-1 rounded-sm border border-[#082C6C]">
            <button
              type="button"
              onClick={() => handleTrackChange('trackA')}
              className={`px-3.5 py-2 rounded-sm text-xs font-extrabold transition ${
                activeTrack === 'trackA'
                  ? 'bg-[#FF9933] text-[#051C45] shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              🇮🇳 Track A: Learn Indian Languages
            </button>
            <button
              type="button"
              onClick={() => handleTrackChange('trackB')}
              className={`px-3.5 py-2 rounded-sm text-xs font-extrabold transition ${
                activeTrack === 'trackB'
                  ? 'bg-amber-400 text-[#051C45] font-extrabold shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              🌐 Track B: Indians Learn Foreign Languages
            </button>
          </div>
        </div>

        <p className="text-xs text-slate-200 font-medium leading-relaxed max-w-3xl">
          {activeTrack === 'trackA'
            ? 'Track A is designed for foreign diplomats, NRI diaspora youth, and global researchers learning Hindi and 22 Eighth Schedule Indian languages from English, French, Spanish, or Arabic.'
            : 'Track B equips Indian students, diplomatic attachés, and corporate executives with global language mastery (French, German, Japanese, Arabic, Russian, Spanish) taught directly through Indian linguistic contexts.'}
        </p>
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search ${activeTrack === 'trackA' ? 'Indian' : 'Foreign'} language pairs...`}
            className="w-full bg-white border border-[#DCE2E6] rounded-sm pl-10 pr-4 py-2.5 text-xs text-[#1B2A4A] placeholder-slate-400 focus:outline-none focus:border-[#0B3D91] font-semibold shadow-2xs"
          />
        </div>
      </div>

      {/* Grid of Language Pairs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPairs.map((pair) => {
          const isSelected = selectedPair.id === pair.id;

          return (
            <div
              key={pair.id}
              onClick={() => handlePairSelect(pair)}
              className={`p-4 sm:p-5 rounded-sm border transition-all cursor-pointer flex flex-col justify-between space-y-3 bg-white shadow-2xs hover:shadow-xs ${
                isSelected
                  ? 'border-[#0B3D91] ring-2 ring-[#0B3D91]/15 bg-[#EEF3F8]/35'
                  : 'border-[#DCE2E6] hover:border-[#0B3D91]/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="p-2 rounded-sm bg-[#EEF3F8] text-[#0B3D91] font-bold border border-[#D0DCE7]">
                    <ArrowRightLeft className="w-4 h-4" />
                  </span>
                  <span className="text-xs font-extrabold text-[#1B2A4A]">{pair.title}</span>
                </div>
                {isSelected && <CheckCircle2 className="w-4 h-4 text-[#0B3D91] shrink-0" />}
              </div>

              <p className="text-xs text-[#555555] font-medium line-clamp-2 leading-relaxed">
                {pair.description}
              </p>

              <div className="flex items-center justify-between pt-2.5 border-t border-[#DCE2E6] text-[11px] font-bold text-[#555555]">
                <span>{pair.totalLearners.toLocaleString()} Global Scholars</span>
                <span className={`font-extrabold ${isSelected ? 'text-[#0B3D91]' : 'text-[#0B3D91] hover:text-[#082C6C]'}`}>
                  {isSelected ? 'Active Pair ✓' : 'Select Pair →'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
