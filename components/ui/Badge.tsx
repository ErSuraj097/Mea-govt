'use client';

import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'navy' | 'saffron' | 'green' | 'amber' | 'neutral';
  size?: 'sm' | 'md';
}

export default function Badge({
  children,
  variant = 'navy',
  size = 'sm',
  className = '',
  ...props
}: BadgeProps) {
  const baseStyles = 'inline-flex items-center font-bold tracking-wider uppercase rounded-md select-none';

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-[9px]',
    md: 'px-2.5 py-1 text-[10px]',
  };

  const variantStyles = {
    navy: 'bg-[#0B3D91]/10 text-[#0B3D91] border border-[#0B3D91]/30',
    saffron: 'bg-[#FF9933]/15 text-[#8A4B00] border border-[#FF9933]/40',
    green: 'bg-[#138808]/10 text-[#0E6606] border border-[#138808]/30',
    amber: 'bg-amber-50 text-amber-900 border border-amber-300',
    neutral: 'bg-slate-100 text-slate-800 border border-slate-300',
  };

  return (
    <span
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
