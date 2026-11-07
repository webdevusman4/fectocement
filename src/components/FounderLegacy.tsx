'use client';

import React from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';

export interface FounderLegacyProps {
  className?: string;
  imageSrc?: string;
}

// copy: confirm with Fecto
const STATEMENTS = [
  {
    number: '01',
    title: 'Faith before fortune.',
    body: 'He arrived with nothing but unwavering faith and a vision to build.',
  },
  {
    number: '02',
    title: 'A word was a contract.',
    body: 'Long before heavy manufacturing, he built a business on integrity: honoring commitments and building lifelong relationships.',
  },
  {
    number: '03',
    title: 'Principles that outlived him.',
    body: 'Hard work and resilience became the DNA of the Fecto Group. Every milestone since reflects his dedication to nation-building.',
  },
];

/**
 * FounderLegacy Component
 * 
 * Functions as a physical "Curtain Reveal" sliding over the preceding sticky hero on scroll.
 * Features an editorial split layout with numbered value statements and a sticky archival portrait.
 */
export default function FounderLegacy({
  className = '',
  imageSrc = '/images/founder-portrait.jpg',
}: FounderLegacyProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      className={`relative z-30 w-full bg-[#000080] shadow-[0_-30px_60px_rgba(0,0,0,0.6)] rounded-t-3xl overflow-x-clip py-20 md:py-32 ${className}`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex flex-col md:grid md:grid-cols-12 gap-12 md:gap-16 relative z-20 text-white items-start">
        
        {/* LEFT COLUMN: Section Header & Numbered Statements (md: 7 cols) */}
        <div className="order-2 md:order-1 md:col-span-7 flex flex-col justify-start">
          
          {/* Eyebrow & Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.6 }}
            className="mb-14 md:mb-16"
          >
            <span className="border border-white/20 rounded-full px-4 py-1 text-xs mb-6 inline-block uppercase tracking-widest text-[#F4D5AB] bg-white/5 backdrop-blur-sm font-semibold">
              THE FOUNDING GENESIS
            </span>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight text-white">
              An Architectural Legacy Built on Faith &amp; Industry.
            </h2>
          </motion.div>

          {/* Numbered Statements separated by drawing hairlines */}
          <div className="space-y-14 md:space-y-20">
            {STATEMENTS.map((s, idx) => (
              <div key={s.number} className="space-y-6">
                {/* Horizontal Hairline with Left-to-Right Draw Animation */}
                <motion.div
                  className="h-px w-full bg-white/20 origin-left"
                  initial={{ scaleX: shouldReduceMotion ? 1 : 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, margin: '-10%' }}
                  transition={{
                    duration: shouldReduceMotion ? 0 : 0.8,
                    delay: shouldReduceMotion ? 0 : idx * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />

                <div className="space-y-3">
                  <span className="font-mono text-xs md:text-sm font-bold tracking-widest text-[#F4D5AB] block">
                    {s.number}
                  </span>
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-white tracking-tight leading-snug">
                    {s.title}
                  </h3>
                  <p className="text-lg leading-relaxed text-white/85 max-w-xl">
                    {s.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: Archival Founder Portrait (md: 5 cols, Sticky) */}
        <div className="order-1 md:order-2 md:col-span-5 relative w-full h-full">
          <div className="sticky top-28 self-start w-full">
            <div className="w-full aspect-[4/5] max-h-[60svh] md:max-h-none md:aspect-auto md:h-[520px] rounded-2xl overflow-hidden relative shadow-2xl border border-white/10 group">
              
              {/* Subtle Parallax Zoom */}
              <motion.div
                initial={{ scale: shouldReduceMotion ? 1 : 1.06 }}
                whileInView={{ scale: 1.0 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ duration: shouldReduceMotion ? 0 : 1.4, ease: 'easeOut' }}
                className="w-full h-full relative"
              >
                <Image
                  src={imageSrc}
                  alt="Late Mr. Ghulam Muhammad A. Fecto — Founder of Fecto Group"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 500px"
                  className="object-cover object-[center_18%] select-none transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  priority
                />
              </motion.div>

              {/* Natural Dark-Edge Gradient Vignette */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#000080]/85 via-transparent to-black/20 pointer-events-none"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,128,0.5)] pointer-events-none rounded-2xl"
              />

              {/* Frosted Glassmorphism Caption Chip */}
              <div className="absolute bottom-4 left-4 z-20 px-4 py-2.5 rounded-xl bg-slate-950/70 backdrop-blur-md border border-white/15 shadow-xl pointer-events-none">
                <div className="text-xs font-bold uppercase tracking-wider text-white">
                  GHULAM MUHAMMAD A. FECTO
                </div>
                <div className="text-xs font-medium tracking-wide text-[#F4D5AB] mt-0.5">
                  Founder, Industrialist &amp; Visionary
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
