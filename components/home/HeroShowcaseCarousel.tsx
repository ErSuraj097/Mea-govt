'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play, Sparkles, ShieldCheck, Globe, Volume2 } from 'lucide-react';
import { useReducedMotion } from '@/lib/useReducedMotion';

interface ShowcaseSlide {
  id: string;
  tagline: string;
  hindiTagline: string;
  subtext: string;
  primaryImage: string;
  secondaryImage: string;
  primaryAlt: string;
  secondaryAlt: string;
  badge: string;
  badgeColor: string;
}

const SHOWCASE_SLIDES: ShowcaseSlide[] = [
  {
    id: 'slide-1',
    tagline: 'Learn Hindi from Anywhere in the World',
    hindiTagline: 'विश्व में कहीं से भी हिन्दी सीखें',
    subtext: 'Official Government of India portal for foreign envoys, international scholars, and diaspora learners.',
    primaryImage: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80',
    primaryAlt: 'International diplomat studying Hindi literature in a modern learning classroom',
    secondaryAlt: 'Global scholar taking notes in Devanagari script',
    badge: 'Global Access',
    badgeColor: 'bg-[#0B3D91] text-amber-300'
  },
  {
    id: 'slide-2',
    tagline: 'AI Voice Tutors with Sambhasini Engine, 24/7',
    hindiTagline: 'संभाषिणी एआई वाक गुरु • चौबीसों घंटे',
    subtext: 'Real-time phoneme evaluation for retroflex consonants (ट, ठ, ड, ढ) and native aspirated speech.',
    primaryImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1589386417686-0d34b5903d23?auto=format&fit=crop&w=600&q=80',
    primaryAlt: 'Interactive speech acoustic waveform visualizer and speech coaching interface',
    secondaryAlt: 'AI acoustic tutor session with headset and live feedback',
    badge: 'Sambhasini AI Speech',
    badgeColor: 'bg-emerald-700 text-emerald-100'
  },
  {
    id: 'slide-3',
    tagline: 'Certified to International CEFR Standards (A1-B2)',
    hindiTagline: 'अंतरराष्ट्रीय सीईएफआर मानकों द्वारा प्रमाणित',
    subtext: 'Tamper-evident verifiable digital credentials co-signed by MEA, ICCR, and Kendriya Hindi Sansthan.',
    primaryImage: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1532012164546-f432f2e3777a?auto=format&fit=crop&w=600&q=80',
    primaryAlt: 'University graduates celebrating certified language diplomas',
    secondaryAlt: 'Official verified digital credential diploma with gold stamp',
    badge: 'Accredited Credential',
    badgeColor: 'bg-amber-700 text-amber-100'
  },
  {
    id: 'slide-4',
    tagline: 'Diplomatic & Scholarly Cohorts in 190+ Missions',
    hindiTagline: '१९०+ दूतावासों में राजनयिक व शोध छात्र दल',
    subtext: 'Connecting Swami Vivekananda Cultural Centres (SVCC), Indian Embassies, and global universities.',
    primaryImage: 'https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?auto=format&fit=crop&w=800&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=600&q=80',
    primaryAlt: 'International delegates in diplomatic round table discussion',
    secondaryAlt: 'Diverse global students collaborating at cultural centre',
    badge: 'Diplomatic Network',
    badgeColor: 'bg-indigo-800 text-indigo-100'
  }
];

export default function HeroShowcaseCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isPaused || prefersReducedMotion) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SHOWCASE_SLIDES.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [isPaused, prefersReducedMotion]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + SHOWCASE_SLIDES.length) % SHOWCASE_SLIDES.length);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % SHOWCASE_SLIDES.length);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handlePrev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleNext();
    }
  };

  const slide = SHOWCASE_SLIDES[currentSlide];

  return (
    <div
      ref={carouselRef}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-label="Portal Highlights and Visual Showcase"
      className="relative bg-white border border-[#DCE2E6] shadow-xs rounded-md overflow-hidden p-4 sm:p-6 focus:outline-none focus:ring-2 focus:ring-[#0B3D91]"
    >
      {/* Top Controls Bar */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#138808] animate-pulse" />
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#0B3D91]">
            SHOWCASE • {slide.badge} ({currentSlide + 1}/{SHOWCASE_SLIDES.length})
          </span>
        </div>

        {/* Manual Controls & Pause Toggle */}
        <div className="flex items-center gap-1.5" aria-label="Carousel navigation">
          <button
            type="button"
            onClick={() => setIsPaused(!isPaused)}
            className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs border border-slate-300 rounded-md transition focus-visible:outline-[#0B3D91]"
            title={isPaused ? 'Play auto-rotation' : 'Pause auto-rotation'}
            aria-label={isPaused ? 'Play auto-rotation' : 'Pause auto-rotation'}
            aria-pressed={isPaused}
          >
            {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
          </button>
          <button
            type="button"
            onClick={handlePrev}
            className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 rounded-md transition focus-visible:outline-[#0B3D91]"
            aria-label="Previous showcase slide"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 rounded-md transition focus-visible:outline-[#0B3D91]"
            aria-label="Next showcase slide"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Layered Showcase Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left: Stacked/Layered Overlapping Image Carousel */}
        <div className="lg:col-span-6 relative h-56 sm:h-64 flex items-center justify-center">
          {/* Background Secondary Image (Layer 1 - Offset Depth) */}
          <div
            className={`absolute right-2 sm:right-6 top-2 sm:top-3 w-4/5 h-44 sm:h-52 rounded-md overflow-hidden shadow-md border-2 border-white transform rotate-2 transition-all duration-500 ease-out ${prefersReducedMotion ? '' : 'hover:rotate-0'
              }`}
          >
            <img
              src={slide.secondaryImage}
              alt={slide.secondaryAlt}
              className="w-full h-full object-cover brightness-95"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-[#082C6C]/20" />
          </div>

          {/* Foreground Primary Image (Layer 2 - Prominent Card) */}
          <div
            className={`absolute left-2 sm:left-4 bottom-2 sm:bottom-3 w-4/5 h-44 sm:h-52 rounded-md overflow-hidden shadow-xl border-2 border-white bg-slate-900 transform -rotate-1 transition-all duration-500 ease-out ${prefersReducedMotion ? '' : 'hover:scale-102 hover:-rotate-0'
              }`}
          >
            <img
              src={slide.primaryImage}
              alt={slide.primaryAlt}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 left-2">
              <span className={`text-[9px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider shadow-sm ${slide.badgeColor}`}>
                {slide.badge}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Rotating Tagline & Subtext Synced to Current Slide */}
        <div className="lg:col-span-6 space-y-3 text-left" aria-live="polite">
          <div className="space-y-1.5">
            <span className="text-xs font-bold text-[#FF9933] uppercase tracking-wider block">
              {slide.hindiTagline}
            </span>
            <h3 className="text-lg sm:text-xl font-extrabold text-[#0B3D91] leading-snug">
              {slide.tagline}
            </h3>
            <p className="text-xs text-[#555555] font-normal leading-relaxed">
              {slide.subtext}
            </p>
          </div>

          {/* Slide Indicator Dots */}
          <div className="flex items-center gap-1.5 pt-2" role="tablist" aria-label="Showcase slide indicators">
            {SHOWCASE_SLIDES.map((s, idx) => (
              <button
                key={s.id}
                type="button"
                role="tab"
                onClick={() => setCurrentSlide(idx)}
                aria-selected={currentSlide === idx}
                aria-label={`Jump to slide ${idx + 1}: ${s.tagline}`}
                className={`h-2 transition-all rounded-full ${currentSlide === idx
                    ? 'w-6 bg-[#0B3D91]'
                    : 'w-2 bg-slate-300 hover:bg-slate-400'
                  }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
