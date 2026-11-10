'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { DUR, EASE } from '../lib/motion';

export interface SectionRevealProps {
  children: React.ReactNode;
  delay?: number;
  simple?: boolean;
  className?: string;
  y?: number;
  duration?: number;
}

/**
 * One-time executive-restraint reveal.
 * Mobile, reduced-motion, and screenshot-safe modes return a plain static div.
 */
export function SectionReveal({
  children,
  delay = 0,
  simple = false,
  className = '',
  y = 10,
  duration = DUR.base,
}: SectionRevealProps) {
  if (simple) {
    return (
      <div data-v43-reveal className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      data-v43-reveal
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default SectionReveal;
