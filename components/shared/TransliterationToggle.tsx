'use client';

import React, { useState, useEffect } from 'react';
import { Languages, Type } from 'lucide-react';
import { ScriptDisplayMode } from '@/lib/bidirectionalData';
import { getScriptMode, setScriptMode } from '@/lib/lmsStore';

export default function TransliterationToggle({
  onChange,
}: {
  onChange?: (mode: ScriptDisplayMode) => void;
}) {
  const [currentMode, setCurrentMode] = useState<ScriptDisplayMode>('both');

  useEffect(() => {
    setCurrentMode(getScriptMode());
  }, []);

  const handleToggle = (mode: ScriptDisplayMode) => {
    setCurrentMode(mode);
    setScriptMode(mode);
    if (onChange) onChange(mode);
  };

  return (
    <div className="inline-flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200">
      <button
        type="button"
        onClick={() => handleToggle('roman')}
        className={`px-2.5 py-1 rounded-xl text-xs font-bold transition flex items-center gap-1 ${
          currentMode === 'roman'
            ? 'bg-orange-600 text-white shadow-xs'
            : 'text-slate-600 hover:text-slate-900'
        }`}
        title="Roman Alphabet Transliteration only"
      >
        <Type className="w-3.5 h-3.5" />
        <span>Roman Script (Beginner)</span>
      </button>

      <button
        type="button"
        onClick={() => handleToggle('native')}
        className={`px-2.5 py-1 rounded-xl text-xs font-bold transition flex items-center gap-1 ${
          currentMode === 'native'
            ? 'bg-orange-600 text-white shadow-xs'
            : 'text-slate-600 hover:text-slate-900'
        }`}
        title="Native Devanagari script only"
      >
        <Languages className="w-3.5 h-3.5" />
        <span>Devanagari Only</span>
      </button>

      <button
        type="button"
        onClick={() => handleToggle('both')}
        className={`px-2.5 py-1 rounded-xl text-xs font-bold transition flex items-center gap-1 ${
          currentMode === 'both'
            ? 'bg-slate-900 text-white shadow-xs'
            : 'text-slate-600 hover:text-slate-900'
        }`}
        title="Show both Native Devanagari and Roman Transliteration"
      >
        <span>Dual Script (Recommended)</span>
      </button>
    </div>
  );
}
