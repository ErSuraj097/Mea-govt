'use client';

import React from 'react';
import {
  LiveNewsMarquee,
  HeroOverview,
  HeroShowcaseCarousel,
  ImpactAccordion,
  LiveCounters,
  LeadershipVision,
  KeyServicesGrid,
  CurriculumTracks,
  LearningJourneyTimeline,
  CreativeShowcaseGallery,
  TestimonialCarousel,
  RoleWorkspaces,
  OfficialCirculars,
  GlobalMissionsDirectory
} from '@/components/home';
import NewsletterStrip from '@/components/layout/NewsletterStrip';

export default function HomePage() {
  return (
    <div id="main-content" className="min-h-screen bg-[#F5F5F5] text-left text-[#212121] font-sans m-0 p-0">
      {/* 1. Official MEA Live Tracker & News Marquee (Directly flush against Navbar) */}
      <LiveNewsMarquee />

      {/* 2. Official Full-Width Hero Slider (Directly flush against LiveNewsMarquee) */}
      <HeroOverview />

      {/* 3. Main Body Sections */}
      <div className="space-y-6 pt-6 pb-6">
        {/* Hero Layered Auto-Rotating Showcase Carousel */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <HeroShowcaseCarousel />
        </div>

        {/* Tabbed Impact Metrics Accordion */}
        <ImpactAccordion />

        {/* Official MEA Live Statistical Counters */}
        {/* <LiveCounters /> */}

        {/* Leadership & Diplomatic Vision Section */}
        <LeadershipVision />

        {/* Key Sovereign Services Grid */}
        {/* <KeyServicesGrid /> */}

        {/* Bidirectional Curriculum Tracks */}
        <CurriculumTracks />

        {/* Learner Progress Timeline (Horizontal Scroll & Milestone Expansion) */}
        <LearningJourneyTimeline />

        {/* Creative Showcase Gallery (Filterable Grid with Hover Reveal) */}
        <CreativeShowcaseGallery />

        {/* Global Learner & Diplomatic Testimonial Carousel */}
        {/* <TestimonialCarousel /> */}

        {/* Role-Based Console Workspaces */}
        <RoleWorkspaces />

        {/* Official MEA Press Releases & Circulars */}
        <OfficialCirculars />

        {/* Worldwide Indian Cultural Missions Directory */}
        <GlobalMissionsDirectory />

        {/* Slim Newsletter & Updates Email Capture Strip */}
        <NewsletterStrip />
      </div>
    </div>
  );
}
