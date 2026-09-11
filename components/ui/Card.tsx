'use client';

import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  accent?: 'navy' | 'saffron' | 'green' | 'none';
  variant?: 'default' | 'bordered' | 'elevated' | 'flat';
}

export default function Card({
  children,
  accent = 'none',
  variant = 'default',
  className = '',
  ...props
}: CardProps) {
  const baseStyles = 'bg-white rounded-md transition text-left overflow-hidden';

  const accentStyles = {
    none: '',
    navy: 'border-t-2 border-t-[#0B3D91]',
    saffron: 'border-t-2 border-t-[#FF9933]',
    green: 'border-t-2 border-t-[#138808]',
  };

  const variantStyles = {
    default: 'border border-[#DCE2E6] shadow-xs',
    bordered: 'border border-[#DCE2E6]',
    elevated: 'border border-[#DCE2E6] shadow-sm hover:shadow-md hover:border-[#0B3D91]',
    flat: 'border-0 bg-[#F5F5F5]',
  };

  return (
    <div
      className={`${baseStyles} ${variantStyles[variant]} ${accentStyles[accent]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
