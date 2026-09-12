'use client';

import React, { useState } from 'react';
import {
  Compass,
  Sparkles,
  Clock,
  CheckCircle2,
  Play,
  ArrowRight,
  Bot,
  MessageSquare
} from 'lucide-react';

export default function AILearningNavigatorPage() {
  const [goalInput, setGoalInput] = useState('I have a meeting with an Indian government official tomorrow.');
  const [generating, setGenerating] = useState(false);
  const [planGenerated, setPlanGenerated] = useState(true);

  const sampleGoals = [
    'I have a meeting with an Indian government official tomorrow.',
    'I am travelling to Delhi for cultural exchange.',
    'I want to speak Hindi with my Indian family.',
    'I need Hindi for international trade & business meetings.'
  ];

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setPlanGenerated(true);
    }, 600);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16 text-left">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-sm bg-gradient-to-r from-[#0B3D91] via-[#082C6C] to-[#051C45] text-white border-l-4 border-[#FF9933] shadow-sm space-y-3">
        <span className="px-2.5 py-0.5 rounded-sm bg-[#FF9933] text-[#051C45] text-[10px] font-black uppercase tracking-wider inline-block">
          ADAPTIVE AI FEATURE
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-white">
          AI Learning Navigator
        </h1>
        <p className="text-xs text-blue-100 font-medium max-w-2xl">
          Enter a real-world situation or goal. AI will craft a personalized 30-minute adaptive preparation plan.
        </p>
      </div>

      {/* Goal Input Form */}
      <div className="bg-white border border-[#DCE2E6] rounded-sm p-6 space-y-4 shadow-2xs">
        <form onSubmit={handleGenerate} className="space-y-3">
          <label className="text-xs font-bold text-[#1B2A4A] block">
            What is your real-world goal or situation today?
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={goalInput}
              onChange={(e) => setGoalInput(e.target.value)}
              placeholder="e.g. I am meeting an Indian diplomat tomorrow..."
              className="flex-1 bg-[#F5F5F5] border border-[#DCE2E6] focus:border-[#0B3D91] rounded-sm px-3.5 py-2.5 text-xs text-[#1B2A4A] font-semibold outline-none"
              required
            />
            <button
              type="submit"
              disabled={generating}
              className="px-6 py-2.5 bg-[#0B3D91] hover:bg-[#082C6C] text-white font-extrabold text-xs uppercase tracking-wider rounded-sm shadow-2xs transition flex items-center justify-center gap-2 shrink-0"
            >
              <Sparkles className="w-4 h-4 text-[#FF9933]" />
              {generating ? 'Generating Plan...' : 'Generate 30-Min Plan'}
            </button>
          </div>
        </form>

        <div className="space-y-1.5 pt-1">
          <span className="text-[10px] font-extrabold text-[#555555] uppercase tracking-wider block">
            Or select a sample scenario:
          </span>
          <div className="flex flex-wrap gap-2">
            {sampleGoals.map((g, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setGoalInput(g)}
                className="px-2.5 py-1 rounded-sm bg-[#EEF3F8] hover:bg-[#D0DCE7] text-[#0B3D91] text-[11px] font-semibold transition"
              >
                &quot;{g}&quot;
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Generated 30-Minute Plan Display */}
      {planGenerated && (
        <div className="bg-white border border-[#DCE2E6] rounded-sm p-6 sm:p-8 space-y-6 shadow-2xs animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div>
              <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-900 text-[10px] font-black uppercase rounded-sm border border-emerald-200">
                30-MINUTE PREPARATION PLAN READY
              </span>
              <h3 className="text-base font-black text-[#1B2A4A] mt-1">
                Scenario: &quot;{goalInput}&quot;
              </h3>
            </div>
            <Clock className="w-6 h-6 text-[#FF9933]" />
          </div>

          <div className="space-y-3">
            {[
              { time: '5 Mins', title: '1. Formal Greetings & Honorifics', desc: 'Master polite salutations (Namaste, Swagat, Ji honorifics).' },
              { time: '5 Mins', title: '2. Government & Protocol Terminology', desc: 'Review key terms (Mantra, Sachiv, Pradhan, Adhyaksha).' },
              { time: '5 Mins', title: '3. Introduction & Courtesy Practice', desc: 'Practice self-introductions and expressing respect.' },
              { time: '5 Mins', title: '4. Listening Comprehension Drill', desc: 'Listen to formal conversation audio at normal speed.' },
              { time: '10 Mins', title: '5. AI Voice Conversation Simulation', desc: 'Simulate a live phone or video meeting with your AI tutor.' },
            ].map((step, idx) => (
              <div key={idx} className="p-4 rounded-sm bg-[#F8FAFC] border border-[#DCE2E6] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-[#0B3D91] text-white text-[10px] font-bold rounded-sm">
                      {step.time}
                    </span>
                    <h4 className="text-xs font-black text-[#1B2A4A]">{step.title}</h4>
                  </div>
                  <p className="text-[11px] text-[#555555] font-medium">{step.desc}</p>
                </div>

                <a
                  href="/dashboard/student/ai-tutor"
                  className="px-3 py-1.5 bg-white hover:bg-[#EEF3F8] text-[#0B3D91] border border-[#DCE2E6] font-bold text-xs rounded-sm transition whitespace-nowrap"
                >
                  Start Activity →
                </a>
              </div>
            ))}
          </div>

          <div className="pt-2 flex justify-end">
            <a
              href="/dashboard/student/ai-tutor"
              className="px-6 py-2.5 bg-[#FF9933] hover:bg-[#E68A00] text-[#051C45] font-black text-xs uppercase tracking-wider rounded-sm shadow-sm inline-flex items-center gap-2 transition"
            >
              Start 30-Minute Practice Session →
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
