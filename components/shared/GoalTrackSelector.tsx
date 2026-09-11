'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Building2,
  Briefcase,
  Compass,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  BookOpen
} from 'lucide-react';
import {
  GOAL_TRACKS_META,
  GoalTrackId,
} from '@/lib/bidirectionalData';
import {
  getActiveGoalTrack,
  setActiveGoalTrack
} from '@/lib/lmsStore';

const iconMap = {
  Building2: Building2,
  Briefcase: Briefcase,
  Compass: Compass,
};

export default function GoalTrackSelector({ onSelect }: { onSelect?: (trackId: GoalTrackId) => void }) {
  const router = useRouter();
  const [selectedGoal, setSelectedGoal] = useState<GoalTrackId>('diplomatic');

  useEffect(() => {
    setSelectedGoal(getActiveGoalTrack());
  }, []);

  const handleSelect = (trackId: GoalTrackId) => {
    setSelectedGoal(trackId);
    setActiveGoalTrack(trackId);
    if (onSelect) onSelect(trackId);
  };

  return (
    <div className="space-y-4 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#DCE2E6] pb-3">
        <div>
          <span className="text-[10px] font-extrabold uppercase text-[#FF9933] tracking-wider block">
            CUSTOMIZED ONBOARDING PATHWAYS
          </span>
          <h2 className="text-lg sm:text-xl font-extrabold text-[#1B2A4A]">
            Select Your Goal-Based Learning Track
          </h2>
        </div>
        <span className="text-xs text-[#555555] font-semibold">
          Curated vocabulary & situational dialogues for MEA mandates
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
        {GOAL_TRACKS_META.map((track) => {
          const isSelected = selectedGoal === track.id;
          const IconComp = iconMap[track.iconName as keyof typeof iconMap] || BookOpen;

          return (
            <div
              key={track.id}
              onClick={() => handleSelect(track.id)}
              className={`p-5 rounded-sm border transition-all cursor-pointer flex flex-col justify-between space-y-4 bg-white shadow-2xs hover:shadow-xs ${
                isSelected
                  ? 'border-[#0B3D91] ring-2 ring-[#0B3D91]/15 bg-[#EEF3F8]/40'
                  : 'border-[#DCE2E6] hover:border-[#0B3D91]/50'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded-sm bg-[#0B3D91] text-amber-300 text-[10px] font-extrabold tracking-wider border border-[#082C6C]">
                    {track.badge}
                  </span>
                  {isSelected && (
                    <span className="flex items-center gap-1 text-xs font-extrabold text-[#0B3D91]">
                      <CheckCircle2 className="w-4 h-4 text-[#0B3D91]" /> Active
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-sm bg-[#EEF3F8] text-[#0B3D91] border border-[#D0DCE7]">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-[#1B2A4A]">{track.titleEng}</h3>
                    <p className="text-xs font-bold text-[#FF9933] font-hindi">{track.titleHindi}</p>
                  </div>
                </div>

                <p className="text-xs text-[#555555] font-medium leading-relaxed">
                  {track.descriptionEng}
                </p>

                {/* Topics Preview */}
                <div className="space-y-1.5 pt-2 border-t border-[#DCE2E6]">
                  <span className="text-[10px] font-extrabold uppercase text-[#555555] tracking-wider block">
                    Core Curriculum Topics:
                  </span>
                  <div className="space-y-1">
                    {track.topics.slice(0, 3).map((topic, i) => (
                      <div key={i} className="flex items-center gap-2 text-[11px] text-[#1B2A4A] font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF9933] shrink-0" />
                        <span className="truncate">{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelect(track.id);
                  router.push(`/dashboard/student?tab=levels&goal=${track.id}`);
                }}
                className={`w-full py-2.5 rounded-sm font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition ${
                  isSelected
                    ? 'bg-[#0B3D91] hover:bg-[#082C6C] text-white shadow-xs'
                    : 'bg-[#F5F5F5] hover:bg-[#EEF3F8] text-[#1B2A4A] border border-[#DCE2E6]'
                }`}
              >
                Launch Track Curriculum <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
