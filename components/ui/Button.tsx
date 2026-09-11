'use client';

import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'saffron' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'link';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-bold tracking-normal transition rounded-md select-none disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-[#0B3D91]';

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-5 py-2 text-xs gap-2',
    lg: 'px-6 py-2.5 text-sm gap-2.5',
  };

  const variantStyles = {
    primary: 'bg-[#0B3D91] text-white hover:bg-[#082C6C] active:bg-[#051C45] shadow-xs',
    saffron: 'bg-[#FF9933] text-[#212121] hover:bg-[#E68A2E] active:bg-[#CC7A29] shadow-xs font-extrabold',
    secondary: 'bg-[#138808] text-white hover:bg-[#0E6606] active:bg-[#094704] shadow-xs',
    outline: 'bg-transparent text-[#0B3D91] border border-[#0B3D91] hover:bg-[#0B3D91]/5',
    ghost: 'bg-transparent text-[#212121] hover:bg-slate-100',
    danger: 'bg-red-700 text-white hover:bg-red-800 active:bg-red-900',
    link: 'bg-transparent text-[#0645AD] hover:underline p-0 h-auto font-medium',
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent animate-spin rounded-full" />
      )}
      {!isLoading && leftIcon}
      <span>{children}</span>
      {!isLoading && rightIcon}
    </button>
  );
}
