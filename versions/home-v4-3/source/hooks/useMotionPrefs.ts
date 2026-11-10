'use client';

import { useSyncExternalStore } from 'react';
import { useReducedMotion } from 'framer-motion';

export interface MotionPrefs {
  reduced: boolean;
  mobile: boolean;
  simple: boolean;
}

const MOBILE_QUERY = '(max-width: 767px)';

function subscribeToMobileQuery(onChange: () => void) {
  const query = window.matchMedia(MOBILE_QUERY);
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
}

function getMobileSnapshot() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia(MOBILE_QUERY).matches;
}

function getMobileServerSnapshot() {
  return false;
}

/**
 * Motion preferences with a client-synced media-query snapshot.
 *
 * - reduced: OS-level reduced-motion request.
 * - mobile: width <= 767px.
 * - simple: reduced || mobile; components should render statically.
 */
export function useMotionPrefs(): MotionPrefs {
  const shouldReduceMotion = useReducedMotion();
  const isMobile = useSyncExternalStore(
    subscribeToMobileQuery,
    getMobileSnapshot,
    getMobileServerSnapshot
  );

  const reduced = Boolean(shouldReduceMotion);
  const mobile = isMobile;
  const simple = reduced || mobile;

  return { reduced, mobile, simple };
}

export default useMotionPrefs;
