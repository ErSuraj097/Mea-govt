'use client';

import React, { useState } from 'react';
import { Mail, CheckCircle2, Send, ShieldCheck } from 'lucide-react';

export default function NewsletterStrip() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setEmail('');
    }
  };

  return (
    <section
      aria-label="Course Updates & Newsletter Subscription"
      className="bg-[#0B3D91] text-white border-y-2 border-[#FF9933] py-4 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left Messaging */}
        <div className="flex items-center gap-3 text-left">
          <div className="w-10 h-10 rounded-md bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
            <Mail className="w-5 h-5 text-amber-300" aria-hidden="true" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider block">
              OFFICIAL MEA NOTIFICATIONS (आधिकारिक सूचनाएं)
            </span>
            <h3 className="text-xs sm:text-sm font-extrabold text-white">
              Get Course Updates &amp; New Language Launches
            </h3>
            <p className="text-[11px] text-slate-200 font-normal">
              Stay updated on bilateral ICCR fellowships, new Eighth Schedule language tracks, and CEFR exam dates.
            </p>
          </div>
        </div>

        {/* Right Form */}
        <div className="w-full md:w-auto">
          {isSubscribed ? (
            <div className="px-4 py-2 bg-emerald-800/80 border border-emerald-400 text-emerald-200 text-xs font-bold flex items-center gap-2 rounded-md animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
              <span>Subscribed! You will receive official MEA course announcements.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-72">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter official/institutional email..."
                  required
                  aria-label="Enter email for course updates"
                  className="w-full bg-[#082C6C] border border-white/30 text-white placeholder-slate-300 text-xs px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent font-normal"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-[#FF9933] hover:bg-[#E68A2E] text-[#212121] font-bold text-xs flex items-center gap-1.5 transition rounded-md shrink-0 shadow-xs focus-visible:outline-white"
              >
                <span>Subscribe</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
