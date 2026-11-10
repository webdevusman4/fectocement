import type { Metadata } from 'next';
import HomeV4Iteration3Page from '../../versions/home-v4-3/source/page';

export const metadata: Metadata = {
  title: 'Home V4.3 — mock design preview',
  description:
    'Isolated executive-restraint homepage mock for layout, motion, and interaction review.',
};

/**
 * Third isolated homepage iteration.
 *
 * Applies the approved "Executive restraint" system across the refined
 * sections and adds deterministic capture behavior for the full composition.
 * Production "/" and earlier versions remain untouched.
 */
export default function HomeV4Iteration3Route() {
  return <HomeV4Iteration3Page />;
}
