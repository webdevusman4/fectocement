'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { useReducedMotion } from 'framer-motion';

let globalLenis: Lenis | null = null;

/**
 * Programmatic scroll utility using Lenis when active, falling back to window.scrollTo
 */
export function scrollToY(y: number, instant?: boolean): void {
  if (globalLenis) {
    globalLenis.scrollTo(y, { immediate: instant });
  } else if (typeof window !== 'undefined') {
    window.scrollTo({
      top: y,
      behavior: instant ? 'auto' : 'smooth',
    });
  }
}

/**
 * Shared SmoothScroll Foundation using Lenis
 *
 * - Disabled automatically when prefers-reduced-motion is true.
 * - Captures anchor links with smooth deceleration.
 * - Exposes scrollToY for programmatic navigation.
 */
export default function SmoothScroll() {
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    // If reduced motion is requested or in SSR, do not mount Lenis
    if (shouldReduceMotion || typeof window === 'undefined') {
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    globalLenis = lenis;

    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    // Ensure hash anchor links scroll smoothly via Lenis
    const handleAnchorClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (href && href.startsWith('#') && href.length > 1) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          lenis.scrollTo(target as HTMLElement, { offset: -90 });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener('click', handleAnchorClick);
      lenis.destroy();
      globalLenis = null;
    };
  }, [shouldReduceMotion]);

  return null;
}
