'use client';

import React, { useState } from 'react';
import { FileEdit, CheckCircle2, Award, Clock, Star, MessageSquare } from 'lucide-react';

export default function TeacherAssignmentsPage() {
  const [graded, setGraded] = useState<{ [key: string]: boolean }>({});

  const assignments = [
    { id: 'as_1', student: 'David Smith', topic: 'मेरे प्रिय शहर पर निबंध (150 शब्द)', score: 'AI Grammar Score: 85%', date: 'Today 10:30 AM', status: 'Pending Review' },
    { id: 'as_2', student: 'Sophia Mueller', topic: 'हिंदी व्याकरण काल एवं भेद', score: 'AI Grammar Score: 92%', date: 'Yesterday', status: 'Pending Review' },
    { id: 'as_3', student: 'Kenji Takahashi', topic: 'देवनागरी स्वर एवं व्यंजन पठन', score: 'AI Grammar Score: 78%', date: '26 Aug 2026', status: 'Graded' },
  ];

  const handleGrade = (id: string) => {
    setGraded((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
        <div>
          <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-600 text-xs font-bold uppercase">
            Teacher Evaluation Portal
          </span>
          <h1 className="text-2xl font-black text-slate-900 mt-1">Student Assignments Queue</h1>
          <p className="text-xs text-slate-500 font-medium">Review submitted essays, override AI scores, and provide teacher feedback notes.</p>
        </div>
      </div>

      <div className="space-y-4">
        {assignments.map((as) => (
          <div key={as.id} className="p-6 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase">{as.date}</span>
                <h3 className="text-base font-bold text-slate-900">{as.student} — {as.topic}</h3>
                <span className="text-xs text-blue-600 font-semibold">{as.score}</span>
              </div>

              <div className="flex items-center gap-2">
                {graded[as.id] || as.status === 'Graded' ? (
                  <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Graded (A+)
                  </span>
                ) : (
                  <button
                    onClick={() => handleGrade(as.id)}
                    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition"
                  >
                    Grade & Add Feedback
                  </button>
                )}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 font-medium leading-relaxed">
              &quot;मेरा प्रिय शहर दिल्ली है। यहाँ अनेक ऐतिहासिक इमारतें जैसे लाल किला और कुतुब मीनार हैं...&quot;
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
