'use client';

import { useState, useEffect } from 'react';
import { useReducedMotion } from 'framer-motion';

export interface MotionPrefs {
  reduced: boolean;
  mobile: boolean;
  simple: boolean;
}

/**
 * Global Motion Preferences Hook
 * 
 * Returns motion capability flags:
 * - reduced: user explicitly requested reduced motion via OS preference
 * - mobile: screen width is 767px or below (SSR-safe, defaults to false)
 * - simple: true when either reduced motion or mobile viewport is active
 */
export function useMotionPrefs(): MotionPrefs {
  const shouldReduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mql = window.matchMedia('(max-width: 767px)');
    setIsMobile(mql.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };

    mql.addEventListener('change', handleChange);
    return () => {
      mql.removeEventListener('change', handleChange);
    };
  }, []);

  const reduced = Boolean(shouldReduceMotion);
  const mobile = isMobile;
  const simple = reduced || mobile;

  return { reduced, mobile, simple };
}

export default useMotionPrefs;

