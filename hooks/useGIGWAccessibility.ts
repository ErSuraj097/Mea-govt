'use client';

import { useState, useEffect } from 'react';

export function useGIGWAccessibility() {
  const [fontSizeOffset, setFontSizeOffset] = useState<number>(0);
  const [isHighContrast, setIsHighContrast] = useState<boolean>(false);
  const [screenReaderActive, setScreenReaderActive] = useState<boolean>(false);

  useEffect(() => {
    const savedContrast = localStorage.getItem('gigw_contrast') === 'high';
    const savedFont = parseInt(localStorage.getItem('gigw_font_offset') || '0', 10);
    setIsHighContrast(savedContrast);
    setFontSizeOffset(savedFont);

    if (savedContrast) {
      document.documentElement.classList.add('high-contrast-mode');
    }
  }, []);

  const changeFontSize = (delta: number) => {
    const newOffset = Math.max(-2, Math.min(4, fontSizeOffset + delta));
    setFontSizeOffset(newOffset);
    localStorage.setItem('gigw_font_offset', newOffset.toString());
    document.documentElement.style.fontSize = `${16 + newOffset}px`;
  };

  const toggleContrast = () => {
    const next = !isHighContrast;
    setIsHighContrast(next);
    localStorage.setItem('gigw_contrast', next ? 'high' : 'normal');
    if (next) {
      document.documentElement.classList.add('high-contrast-mode');
    } else {
      document.documentElement.classList.remove('high-contrast-mode');
    }
  };

  const toggleScreenReader = () => {
    setScreenReaderActive(!screenReaderActive);
  };

  return {
    fontSizeOffset,
    isHighContrast,
    screenReaderActive,
    changeFontSize,
    toggleContrast,
    toggleScreenReader,
  };
}
