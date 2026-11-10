'use client';

import { RefObject } from 'react';
import { useScroll, MotionValue } from 'framer-motion';

export type SectionProgressKind = 'enter' | 'exit' | 'pin' | 'center';

type ScrollOffset = NonNullable<NonNullable<Parameters<typeof useScroll>[0]>['offset']>;

const OFFSET_MAP: Record<SectionProgressKind, ScrollOffset> = {
  enter: ['start end', 'start start'],
  exit: ['end end', 'end start'],
  pin: ['start start', 'end end'],
  center: ['start 50%', 'end 50%'],
};

/**
 * Standardized Scroll Progress Hook for Fecto Sections
 *
 * Maps section scroll progress using uniform viewport offsets:
 * - 'enter': ['start end', 'start start'] - top enters bottom to top reaching top
 * - 'exit': ['end end', 'end start'] - bottom enters bottom to bottom leaving top
 * - 'pin': ['start start', 'end end'] - through the entire pinned/sticky scroll duration
 * - 'center': ['start 50%', 'end 50%'] - through the central focal window
 */
export function useSectionProgress(
  ref: RefObject<HTMLElement | null>,
  kind: SectionProgressKind = 'enter'
): MotionValue<number> {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: OFFSET_MAP[kind],
  });

  return scrollYProgress;
}

export default useSectionProgress;
