'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  ChevronLeft,
  ChevronRight,
  Lock,
  ArrowRight,
  Building2
} from 'lucide-react';
import { useReducedMotion } from '@/lib/useReducedMotion';

interface HeroSlide {
  id: string;
  imageDesktop: string;
  imageMobile: string;
  alt: string;
  quote?: string;
  hindiQuote?: string;
  subtitle?: string;
  alignment?: 'left' | 'right';
  badge?: string;
  ctaText?: string;
  ctaHref?: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'slide-1',
    quote: 'A Nationalist to\nthe Core',
    hindiQuote: '“राष्ट्रवादी अंतःकरण से”',
    subtitle: 'Ministry of External Affairs • Sovereign Indian Language Learning & Global Propagation Portal',
    imageDesktop: '/hero/slide-1.jpg',
    imageMobile: '/hero/slide-1.jpg',
    alt: 'Ministry of External Affairs Indian Language Learning Portal',
    alignment: 'right',
    badge: 'GOVERNMENT OF INDIA • विदेश मंत्रालय',
    ctaText: 'Sign In to LMS Console',
    ctaHref: '/login'
  },

  {
    id: 'slide-2',
    quote: 'Connecting  \n the Global\nIndian Diaspora',
    hindiQuote: '“वैश्विक भारतीय समुदाय से जीवंत जुड़ाव”',
    subtitle: 'Empowering 32 Million Overseas Indians & Global Scholars with Accredited Language Diplomas',
    imageDesktop: '/hero/slide-3.jpg',
    imageMobile: '/hero/slide-3.jpg',
    alt: 'Global Indian Diaspora and Foreign Envoys Cohort',
    alignment: 'left',
    badge: 'DIASPORA & ICCR FELLOWSHIPS',
    ctaText: 'View Global Missions',
    ctaHref: '/compliance'
  },
    {
    id: 'slide-3',
    quote: 'Lover of\nIndian Art & Culture',
    hindiQuote: '“भारतीय कला एवं संस्कृति प्रेमी”',
    subtitle: 'Preserving and Propagating 22 Eighth Schedule Indian Languages & Classical Devanagari Heritage',
    imageDesktop: '/hero/slide-2.jpg',
    imageMobile: '/hero/slide-2.jpg',
    alt: 'Indian Language & Cultural Heritage',
    alignment: 'right',
    badge: 'CULTURAL DIPLOMACY & LINGUISTICS',
    ctaText: 'Explore Curriculum Tracks',
    ctaHref: '/about'
  },
  {
    id: 'slide-4',
    // Slide 4: Clean pure image slide with NO text and NO buttons
    imageDesktop: '/hero/slide-4.jpg',
    imageMobile: '/hero/slide-4.jpg',
    alt: 'Diplomatic Multilateral Language Training'
  }
];

export interface GreetingItem {
  lang: string;
  script: string;
  roman: string;
  meaning: string;
}

const GREETINGS: GreetingItem[] = [
  { lang: 'Hindi', script: 'नमस्ते', roman: 'Namaste', meaning: 'I bow to the divine in you' },
  { lang: 'Tamil', script: 'வணக்கம்', roman: 'Vanakkam', meaning: 'Greetings of respect' },
  { lang: 'Bengali', script: 'নমস্কার', roman: 'Nomoshkar', meaning: 'Salutations' },
  { lang: 'Telugu', script: 'నమస్కారం', roman: 'Namaskaram', meaning: 'Cordial greetings' },
  { lang: 'Kannada', script: 'ನಮಸ್ಕಾರ', roman: 'Namaskara', meaning: 'Respectful greetings' },
  { lang: 'Malayalam', script: 'നമസ്കാരം', roman: 'Namaskaram', meaning: 'Greetings' },
  { lang: 'Punjabi', script: 'ਸਤਿ ਸ਼੍ਰੀ ਅਕाल', roman: 'Sat Sri Akal', meaning: 'Truth is the Timeless Lord' },
  { lang: 'Gujarati', script: 'નમસ્તે', roman: 'Namaste', meaning: 'Warm greetings' },
  { lang: 'Marathi', script: 'नमस्कार', roman: 'Namaskar', meaning: 'Humble greetings' },
  { lang: 'Odia', script: 'ନମସ୍କାର', roman: 'Namaskar', meaning: 'Cordial salutation' },
  { lang: 'Sanskrit', script: 'नमो नमः', roman: 'Namo Namah', meaning: 'Reverent salutations' },
  { lang: 'Assamese', script: 'নমস্কাৰ', roman: 'Nomoskar', meaning: 'Warm greetings' },
];

export default function HeroOverview() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [bgCosmicEnabled, setBgCosmicEnabled] = useState(false);
  const [currentGreetingIndex, setCurrentGreetingIndex] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const sliderRef = useRef<HTMLDivElement>(null);

  // Auto slide rotation
  useEffect(() => {
    if (isPaused || prefersReducedMotion) return;
    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused, prefersReducedMotion]);

  // Greeting rotation
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentGreetingIndex((prev) => (prev + 1) % GREETINGS.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const handleNext = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
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

  const handlePlayAudio = (text: string) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    setIsPlayingAudio(true);
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'hi-IN';
    utterance.rate = 0.85;
    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);
    window.speechSynthesis.speak(utterance);
  };

  // Click on slide advances to next (excluding buttons & links)
  const handleSlideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (
      target.closest('button') ||
      target.closest('a') ||
      target.closest('input') ||
      target.closest('select') ||
      target.closest('textarea')
    ) {
      return;
    }
    handleNext();
  };

  const slide = HERO_SLIDES[currentSlideIndex];
  const curGreeting = GREETINGS[currentGreetingIndex];

  return (
    <section
      className="w-full relative overflow-hidden text-white m-0 p-0"
      aria-label="Official MEA Hero Banner & Sovereign Leader Showcase"
    >
      {/* 100% Full-Width Slick-Style Hero Slider Container with Click-to-Advance */}
      <div
        ref={sliderRef}
        onClick={handleSlideClick}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocus={() => setIsPaused(true)}
        onBlur={() => setIsPaused(false)}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="region"
        aria-roledescription="carousel"
        aria-label="Official MEA Sovereign Showcase Slider (Click to advance)"
        className="relative w-full  min-h-[500px] sm:min-h-[580px] md:min-h-[640px] lg:min-h-[660px] flex flex-col justify-between focus:outline-none focus:ring-2 focus:ring-[#FF9933] border-b border-[#082C6C] cursor-pointer select-none"
      >
        {/* Optional Ambient Cosmic Black Hole Mode */}
        {/* {bgCosmicEnabled && (
          <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
            <BlackHole />
          </div>
        )} */}

        {/* Background Image Layer (Desktop & Mobile) - Full 100% Bleed */}
        <div className="absolute inset-0 z-0">
          <picture>
            <source media="(max-width: 768px)" srcSet={slide.imageMobile} />
            <img
              src={slide.imageDesktop}
              alt={slide.alt}
              className="w-full h-full object-cover object-center transition-all duration-700 ease-in-out"
            />
          </picture>

          {/* Cinematic Contrast Gradient Overlays */}
          {/* <div
            className={`absolute inset-0 ${
              slide.alignment === 'right'
                ? 'bg-gradient-to-l from-[#082C6C]/30 via-[#082C6C]/10 to-transparent'
                : 'bg-gradient-to-r from-[#082C6C]/30 via-[#082C6C]/10 to-transparent'
            }`}
          /> */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#051C45] via-transparent to-black/10" />
        </div>

        {/* Top Floating Controls Bar */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 flex items-center justify-between">
          {/* <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-[#0B3D91]/90 backdrop-blur-md border border-white/20 text-amber-300 text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-md shadow-sm">
              {slide.badge}
            </span>
          </div> */}

          <div className="flex items-center gap-2">
            {/* Cosmic Background Switcher */}
            {/* <button
              type="button"
              onClick={() => setBgCosmicEnabled(!bgCosmicEnabled)}
              className="px-2.5 py-1 bg-black/40 hover:bg-black/60 border border-white/20 text-[10px] sm:text-xs font-bold rounded-md transition backdrop-blur-xs flex items-center gap-1 text-amber-200"
              title="Toggle Cosmic AI Particle Background"
              aria-label="Toggle Cosmic AI Background"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span className="hidden sm:inline">Cosmic AI: {bgCosmicEnabled ? 'On' : 'Off'}</span>
            </button> */}

            {/* Play/Pause Slider */}
            {/* <button
              type="button"
              onClick={() => setIsPaused(!isPaused)}
              className="p-1.5 bg-black/40 hover:bg-black/60 border border-white/20 rounded-md transition backdrop-blur-xs text-white"
              title={isPaused ? 'Play slide rotation' : 'Pause slide rotation'}
              aria-label={isPaused ? 'Play slide rotation' : 'Pause slide rotation'}
              aria-pressed={isPaused}
            >
              {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
            </button> */}
          </div>
        </div>

        {/* Center Content / Typography Area with Dynamic Alignment (Rendered only if slide has quote/content) */}
        {slide.quote && (
          <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 my-auto" aria-live="polite">
            <div
              className={`flex flex-col ${
                slide.alignment === 'right'
                  ? 'items-end text-right ml-auto'
                  : 'items-start text-left mr-auto'
              } max-w-6xl space-y-4 sm:space-y-5`}
            >
              {/* Bold Editorial Quote Typography */}
              <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-[1.05] text-black drop-shadow-2xl whitespace-pre-line">
                {slide.quote}
              </h2>

              {/* Subtitle Description */}
              {slide.subtitle && (
                <p className="text-xs sm:text-sm md:text-base text-black font-normal leading-relaxed max-w-xl drop-shadow-md">
                  {slide.subtitle}
                </p>
              )}

              {/* CTAs */}
              {slide.ctaText && (
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <Link
                    href={slide.ctaHref || '/login'}
                    className="px-6 sm:px-7 py-2.5 sm:py-3 bg-[#FF9933] hover:bg-[#E68A2E] text-[#212121] font-extrabold text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 shadow-xl transition rounded-md border-b-2 border-amber-800 hover:scale-102"
                  >
                    <Lock className="w-4 h-4 text-[#082C6C]" />
                    <span>{slide.ctaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    href="/about"
                    className="px-5 sm:px-6 py-2.5 sm:py-3 bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 border border-white/30 backdrop-blur-md transition rounded-md shadow-sm hover:scale-102"
                  >
                    <Building2 className="w-4 h-4 text-amber-300" />
                    <span>About MEA Mandate</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Bottom Floating Bar: Slick Arrow Controls */}
        <div className="relative z-10 w-full bg-gradient-to-t from-black/85 via-black/40 to-transparent border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5 flex items-center justify-end">
            {/* Previous / Next Arrow Controls */}
            <div className="flex items-center gap-2" aria-label="Slider navigation">
              <button
                type="button"
                onClick={handlePrev}
                className="px-3.5 py-1.5 text-white text-xs font-bold rounded-md transition flex items-center gap-1 shadow-md hover:bg-white/10 focus-visible:outline-white"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Previous</span>
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="px-3.5 py-1.5 text-white text-xs font-bold rounded-md transition flex items-center gap-1 shadow-md hover:bg-white/10 focus-visible:outline-white"
                aria-label="Next Slide"
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Multilingual 22 Scheduled Language Live Greeting Ribbon */}
      {/* <div className="w-full bg-[#082C6C] text-white border-y border-[#FF9933]/50 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#FF9933] text-[#212121] flex items-center justify-center font-bold shrink-0 rounded-md">
              <Volume2 className={`w-4 h-4 ${isPlayingAudio ? 'animate-bounce text-[#082C6C]' : ''}`} aria-hidden="true" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-amber-300 transition-all duration-300">
                  {curGreeting.script}
                </span>
                <span className="text-xs text-slate-300 font-mono">({curGreeting.roman})</span>
                <span className="px-1.5 py-0.2 bg-white/10 text-[9px] font-bold uppercase tracking-wider text-slate-200 rounded-md">
                  {curGreeting.lang}
                </span>
              </div>
              <p className="text-[11px] text-slate-300 italic">{curGreeting.meaning}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handlePlayAudio(curGreeting.script)}
              className="px-3 py-1 bg-white/10 hover:bg-[#FF9933] hover:text-[#212121] text-white text-xs font-bold uppercase tracking-wider transition shrink-0 rounded-md border border-white/20"
              aria-label={`Listen to ${curGreeting.lang} greeting`}
            >
              Listen Audio
            </button>

            <Link
              href="/dashboard/student"
              className="hidden sm:flex items-center gap-1 text-xs font-bold text-amber-300 hover:text-white hover:underline px-2 py-1"
            >
              <Activity className="w-3.5 h-3.5 text-emerald-400" />
              <span>Sambhasini Speech Engine Live</span>
            </Link>
          </div>
        </div>
      </div> */}
    </section>
  );
}
