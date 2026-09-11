'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  Quote,
  Star,
  Globe2,
  Award,
  CheckCircle2
} from 'lucide-react';
import { useReducedMotion } from '@/lib/useReducedMotion';

interface Testimonial {
  id: string;
  name: string;
  designation: string;
  country: string;
  countryFlag: string;
  quote: string;
  hindiQuote: string;
  track: string;
  avatar: string;
  rating: number;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Ambassador Jean-Luc Moreau',
    designation: 'Senior Diplomatic Attaché',
    country: 'France (Embassy of France, New Delhi)',
    countryFlag: '🇫🇷',
    quote:
      'The Sambhasini AI voice tutor transformed my Hindi pronunciation within 8 weeks. I can now deliver formal diplomatic greetings and address Indian bilateral delegations in fluent Hindi with complete confidence.',
    hindiQuote: 'भाषिणी एआई वाक गुरु ने ८ सप्ताह में मेरे हिन्दी उच्चारण को पूरी तरह निखार दिया।',
    track: 'Track A: Diplomatic Hindi (CEFR B1)',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    rating: 5
  },
  {
    id: 't2',
    name: 'Dr. Elena Rostova',
    designation: 'Chair of Indology & South Asian Studies',
    country: 'Russia (Moscow State University)',
    countryFlag: '🇷🇺',
    quote:
      'The authentic Devanagari literature curriculum and structured CEFR accreditation provide the highest caliber of Indian language training. The tamper-evident digital certificate was instantly verified by our university board.',
    hindiQuote: 'देवनागरी साहित्य पाठ्यक्रम और सीईएफआर प्रमाणन उच्चतम स्तर का प्रशिक्षण प्रदान करते हैं।',
    track: 'Track A: Classical Hindi & Sanskrit',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    rating: 5
  },
  {
    id: 't3',
    name: 'Kenji Takahashi',
    designation: 'ICCR Language Fellow',
    country: 'Japan (Tokyo University of Foreign Studies)',
    countryFlag: '🇯🇵',
    quote:
      'Zero barriers for overseas registration made getting started effortless. The live 1-on-1 speech breakout sessions with Kendriya Hindi Sansthan professors gave me real cultural immersion from Tokyo.',
    hindiQuote: 'टोक्यो से सीधे केंद्रीय हिंदी संस्थान के आचार्यों के साथ लाइव संवाद एक अद्भुत अनुभव रहा।',
    track: 'Track A: Conversational & Business Hindi',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    rating: 5
  },
  {
    id: 't4',
    name: 'Priya Sharma-Patel',
    designation: 'Diaspora Cultural Coordinator',
    country: 'United Kingdom (London Community Forum)',
    countryFlag: '🇬🇧',
    quote:
      'As a third-generation Indian abroad, this MEA portal reconnected me with my heritage language. The lessons are intuitive, beautifully designed, and the audio drills make mastering conjuncts joyful.',
    hindiQuote: 'इस पोर्टल ने मुझे मेरी मातृभाषा और सांस्कृतिक जड़ों से पुनः जोड़ दिया।',
    track: 'Track A: Heritage Hindi Immersion',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    rating: 5
  }
];

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isPaused || prefersReducedMotion) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, prefersReducedMotion]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
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

  const item = TESTIMONIALS[currentIndex];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2" aria-label="Learner and Diplomatic Testimonials">
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
        aria-label="Learner and Diplomat Testimonials Carousel"
        className="bg-white border border-[#DCE2E6] shadow-xs rounded-md overflow-hidden focus:outline-none focus:ring-2 focus:ring-[#0B3D91]"
      >
        {/* Section Header Strip */}
        <div className="bg-[#0B3D91] text-white px-5 py-3 flex flex-wrap items-center justify-between gap-2 border-b-2 border-[#FF9933]">
          <div className="flex items-center gap-2">
            <Quote className="w-4 h-4 text-amber-300" aria-hidden="true" />
            <h2 className="text-xs font-bold uppercase tracking-wider">
              GLOBAL LEARNER &amp; DIPLOMATIC TESTIMONIALS (अनुभव एवं समीक्षाएं)
            </h2>
          </div>

          {/* Carousel Controls */}
          <div className="flex items-center gap-1.5" aria-label="Testimonial controls">
            <button
              type="button"
              onClick={() => setIsPaused(!isPaused)}
              className="p-1 bg-white/10 hover:bg-white/20 text-white text-xs rounded-md transition focus-visible:outline-white"
              title={isPaused ? 'Play rotation' : 'Pause rotation'}
              aria-label={isPaused ? 'Play rotation' : 'Pause rotation'}
              aria-pressed={isPaused}
            >
              {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
            </button>
            <button
              type="button"
              onClick={handlePrev}
              className="p-1 bg-white/10 hover:bg-white/20 text-white rounded-md transition focus-visible:outline-white"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-[11px] font-mono font-bold px-1 text-amber-200">
              {currentIndex + 1}/{TESTIMONIALS.length}
            </span>
            <button
              type="button"
              onClick={handleNext}
              className="p-1 bg-white/10 hover:bg-white/20 text-white rounded-md transition focus-visible:outline-white"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Carousel Slide Body */}
        <div className="p-6 sm:p-8" aria-live="polite">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* User Profile Column */}
            <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left space-y-3 border-b lg:border-b-0 lg:border-r border-slate-200 pb-5 lg:pb-0 lg:pr-6">
              <div className="relative">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-20 h-20 rounded-full object-cover border-3 border-[#0B3D91] shadow-md"
                />
                <span className="absolute bottom-0 right-0 text-xl" title={item.country}>
                  {item.countryFlag}
                </span>
              </div>

              <div>
                <h3 className="text-sm font-extrabold text-[#212121]">{item.name}</h3>
                <p className="text-xs text-[#0B3D91] font-bold">{item.designation}</p>
                <p className="text-[11px] text-slate-500 font-medium">{item.country}</p>
              </div>

              <div className="flex items-center gap-1 text-amber-500" aria-label="5 star rating">
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current text-[#FF9933]" />
                ))}
              </div>

              <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-50 text-[#0B3D91] border border-blue-200 rounded-md">
                {item.track}
              </span>
            </div>

            {/* Quote Column */}
            <div className="lg:col-span-8 space-y-4 text-left">
              <div className="p-3 bg-amber-50/70 border-l-3 border-[#FF9933] rounded-r-md">
                <p className="text-xs font-bold text-[#0B3D91] italic leading-relaxed">
                  "{item.hindiQuote}"
                </p>
              </div>

              <blockquote className="text-sm text-[#333333] font-normal leading-relaxed italic">
                "{item.quote}"
              </blockquote>

              <div className="pt-2 flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-200">
                <div className="flex items-center gap-1.5 text-[#138808] font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Verified Sovereign Learner
                </div>

                {/* Dot Indicators */}
                <div className="flex items-center gap-1" role="tablist" aria-label="Testimonial slides">
                  {TESTIMONIALS.map((t, idx) => (
                    <button
                      key={t.id}
                      type="button"
                      role="tab"
                      aria-selected={currentIndex === idx}
                      onClick={() => setCurrentIndex(idx)}
                      aria-label={`Show testimonial ${idx + 1}`}
                      className={`h-1.5 transition-all rounded-full ${currentIndex === idx ? 'w-5 bg-[#0B3D91]' : 'w-1.5 bg-slate-300'
                        }`}
                    />
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
