'use client';

import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
}

export default function Input({
  label,
  error,
  hint,
  leftIcon,
  className = '',
  id,
  ...props
}: InputProps) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full space-y-1.5 text-left">
      {label && (
        <label htmlFor={inputId} className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {leftIcon && (
          <div className="absolute left-3 text-slate-400 pointer-events-none">
            {leftIcon}
          </div>
        )}
        <input
          id={inputId}
          className={`w-full bg-white border border-slate-300 text-slate-900 text-xs font-medium px-3.5 py-2.5 rounded-md focus:outline-none focus:border-[#0B3D91] focus:ring-1 focus:ring-[#0B3D91] transition disabled:bg-slate-100 ${
            leftIcon ? 'pl-9' : ''
          } ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''} ${className}`}
          {...props}
        />
      </div>
      {hint && !error && <p className="text-[11px] text-slate-500 font-normal">{hint}</p>}
      {error && <p className="text-[11px] text-red-600 font-bold">{error}</p>}
    </div>
  );
}
