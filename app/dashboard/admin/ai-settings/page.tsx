'use client';

import React, { useState } from 'react';
import { Bot, Save, CheckCircle2, Cpu } from 'lucide-react';

export default function AdminAISettingsPage() {
  const [model, setModel] = useState('Google Gemini 1.5 Pro / Flash');
  const [saved, setSaved] = useState(false);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs flex justify-between items-center">
        <div>
          <span className="px-2.5 py-0.5 rounded-full bg-orange-50 text-orange-600 text-xs font-bold uppercase">
            AI Gateway Architecture (Sec 32)
          </span>
          <h1 className="text-2xl font-black text-slate-900 mt-1">AI Provider Model Settings</h1>
          <p className="text-xs text-slate-500 font-medium">Provider-independent gateway abstraction for Chat, Speech, Writing & Listening evaluation.</p>
        </div>

        <button
          onClick={() => setSaved(true)}
          className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm"
        >
          <Save className="w-4 h-4" /> Save Gateway Settings
        </button>
      </div>

      <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-xs">
        <h3 className="text-base font-bold text-slate-900">Active AI Model Switcher</h3>
        <select
          value={model}
          onChange={(e) => setModel(e.target.value)}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 font-bold"
        >
          <option value="Google Gemini 1.5 Pro / Flash">Google Gemini 1.5 Pro / Flash (Primary)</option>
          <option value="OpenAI GPT-4o">OpenAI GPT-4o</option>
          <option value="Anthropic Claude 3.5 Sonnet">Anthropic Claude 3.5 Sonnet</option>
        </select>

        {saved && (
          <div className="p-3 rounded-xl bg-emerald-50 text-emerald-700 font-bold text-xs flex items-center gap-2 border border-emerald-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" /> AI Provider Gateway updated to {model}!
          </div>
        )}
      </div>
    </div>
  );
}
