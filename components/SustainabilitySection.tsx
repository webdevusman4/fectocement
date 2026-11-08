'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  motion,
  useMotionValue,
  useTransform,
  useMotionValueEvent,
  animate,
} from 'framer-motion';
import { Leaf, Wind, Users, Download } from 'lucide-react';
import { useMotionPrefs } from '@/hooks/useMotionPrefs';
import { useSectionProgress } from '@/hooks/useSectionProgress';
import { EASE, DUR, Z } from '@/lib/motion';

export interface SustainabilitySectionProps {
  onDownloadReport?: () => void;
  className?: string;
  imageUrl?: string;
  doorLeft?: string;
  doorRight?: string;
}

/** Animated -30% Metric Counter */
function MetricCounter({ active, reduced }: { active: boolean; reduced: boolean }) {
  const mv = useMotionValue(0);
  const text = useTransform(mv, (v) => `-${Math.round(v)}%`);

  useEffect(() => {
    if (!active) return;
    if (reduced) {
      mv.set(30);
      return;
    }
    mv.set(0);
    const c = animate(mv, 30, { duration: 1.2, ease: EASE });
    return () => c.stop();
  }, [active, reduced, mv]);

  if (!active && !reduced) {
    return <span>-0%</span>;
  }

  return (
    <>
      <span aria-hidden="true">
        {reduced ? '-30%' : <motion.span>{text}</motion.span>}
      </span>
      <span className="sr-only">-30%</span>
    </>
  );
}

/** Stagger Item Helper */
function StaggerItem({
  children,
  delay,
  isPinned,
  revealed,
  className = '',
}: {
  children: React.ReactNode;
  delay: number;
  isPinned: boolean;
  revealed: boolean;
  className?: string;
}) {
  if (isPinned) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: DUR.slow, ease: EASE, delay }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: DUR.slow, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export const SustainabilitySection: React.FC<SustainabilitySectionProps> = ({
  onDownloadReport,
  className = '',
  imageUrl = '/images/sustainability-energy.jpg',
  doorLeft = 'Building a',
  doorRight = 'greener tomorrow.',
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { simple, reduced: isReduced } = useMotionPrefs();
  const isPinned = !simple;

  // Pin progress: 0 at 'start start' to 1 at 'end end'
  const p = useSectionProgress(wrapperRef, 'pin');

  // Vault doors transforms
  const leftDoorX = useTransform(p, (v) => {
    const open = Math.min(1, Math.max(0, v / 0.38));
    return `${-open * 100}%`;
  });

  const rightDoorX = useTransform(p, (v) => {
    const open = Math.min(1, Math.max(0, v / 0.38));
    return `${open * 100}%`;
  });

  const seamOpacity = useTransform(p, (v) => {
    const open = Math.min(1, Math.max(0, v / 0.38));
    return 1 - open;
  });

  // Real headline stays at opacity 0 until doors are 60% open (open >= 0.6)
  const realHeadlineOpacity = useTransform(p, (v) => {
    if (!isPinned) return 1;
    const open = Math.min(1, Math.max(0, v / 0.38));
    if (open < 0.6) return 0;
    return Math.min(1, (open - 0.6) / 0.3); // fades 0 -> 1 as open goes 0.6 -> 0.9
  });

  // Stagger entrance state: triggers once doors clear (p > 0.4)
  const [contentRevealed, setContentRevealed] = useState(simple);
  const revealedRef = useRef(simple);

  useMotionValueEvent(p, 'change', (v) => {
    if (!isPinned || revealedRef.current) return;
    if (v > 0.4) {
      revealedRef.current = true;
      setContentRevealed(true);
    }
  });

  return (
    <div
      ref={wrapperRef}
      id="sustainability"
      className={`${Z.sustain} relative ${className}`}
      style={isPinned ? { height: '260svh' } : undefined}
    >
      <div
        className={
          isPinned
            ? 'sticky top-0 h-[100svh] w-full overflow-hidden bg-[#000080] flex items-center justify-center'
            : 'relative w-full'
        }
      >
        {/* ================================================================ */}
        {/* VAULT DOORS (PINNED MODE ONLY)                                    */}
        {/* ================================================================ */}
        {isPinned && (
          <>
            {/* Left Door */}
            <motion.div
              style={{ x: leftDoorX }}
              className="absolute top-0 bottom-0 left-0 w-[50.2%] bg-[#000080] z-20 flex items-center justify-end pr-3 sm:pr-6 md:pr-10 lg:pr-14 select-none pointer-events-none"
            >
              <span className="font-display text-[clamp(44px,9vw,140px)] leading-none tracking-tight text-[#F4D5AB] whitespace-nowrap text-right">
                {doorLeft}
              </span>
            </motion.div>

            {/* Right Door */}
            <motion.div
              style={{ x: rightDoorX }}
              className="absolute top-0 bottom-0 right-0 w-[50.2%] bg-[#000080] z-20 flex items-center justify-start pl-3 sm:pl-6 md:pl-10 lg:pl-14 select-none pointer-events-none"
            >
              <span className="font-display text-[clamp(44px,9vw,140px)] leading-none tracking-tight text-[#F4D5AB] whitespace-nowrap text-left">
                {doorRight}
              </span>
            </motion.div>

            {/* 1px Sand Seam Line */}
            <motion.div
              style={{ opacity: seamOpacity }}
              className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-[#F4D5AB] z-25 pointer-events-none"
            />
          </>
        )}

        {/* ================================================================ */}
        {/* EXISTING SECTION CONTENT (SITS BEHIND THE DOORS)                 */}
        {/* ================================================================ */}
        <section
          data-tone="light"
          aria-label="Environment and Sustainability"
          className={`w-full ${
            isPinned
              ? 'h-full overflow-y-auto lg:overflow-hidden bg-[#F8FAFC] text-slate-900 flex items-center justify-center py-8 lg:py-0'
              : 'bg-[#F8FAFC] text-slate-900 py-28 md:py-32 relative overflow-hidden border-t border-slate-200/60'
          }`}
        >
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-center">
              
              {/* ============================================================ */}
              {/* LEFT COLUMN: TYPOGRAPHY & GREEN PILLARS                      */}
              {/* ============================================================ */}
              <div className="flex flex-col items-start text-left">
                
                {/* Eyebrow Badge */}
                <StaggerItem delay={0} isPinned={isPinned} revealed={contentRevealed}>
                  <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-slate-200 shadow-xs text-xs md:text-sm font-bold tracking-widest uppercase text-emerald-800 mb-4">
                    ENVIRONMENT & SUSTAINABILITY
                  </span>
                </StaggerItem>

                {/* Heading (H2): Masked until doors are 60% open */}
                <StaggerItem delay={0.08} isPinned={isPinned} revealed={contentRevealed}>
                  <motion.h2
                    style={isPinned ? { opacity: realHeadlineOpacity } : undefined}
                    className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#000080] leading-[1.08] mb-6"
                  >
                    Building a greener tomorrow, today.
                  </motion.h2>
                </StaggerItem>

                {/* Paragraph */}
                <StaggerItem delay={0.16} isPinned={isPinned} revealed={contentRevealed}>
                  <p className="text-slate-600 text-base md:text-lg leading-relaxed mb-10 max-w-xl font-normal">
                    We recognize that heavy industry impacts the earth. That’s why Fecto is pioneering sustainable manufacturing in Pakistan through alternative fuels, strict emission controls, and community-first governance.
                  </p>
                </StaggerItem>

                {/* The 3 ESG Pillars (Vertical List) */}
                <div className="space-y-8 w-full max-w-xl">
                  
                  {/* Pillar 1: Alternative Fuels */}
                  <StaggerItem delay={0.24} isPinned={isPinned} revealed={contentRevealed}>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-center flex-shrink-0 text-emerald-600">
                        <Leaf className="w-6 h-6 text-emerald-600" />
                      </div>
                      <div>
                        <h3 className="text-lg md:text-xl font-bold text-[#000080] mb-1.5">
                          Alternative Fuels
                        </h3>
                        <p className="text-slate-600 text-sm md:text-base leading-relaxed font-normal">
                          Transitioning kilns to run on biomass and refuse-derived fuels (RDF) to cut fossil fuel reliance.
                        </p>
                      </div>
                    </div>
                  </StaggerItem>

                  {/* Pillar 2: Emission Control */}
                  <StaggerItem delay={0.32} isPinned={isPinned} revealed={contentRevealed}>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-center flex-shrink-0 text-emerald-600">
                        <Wind className="w-6 h-6 text-emerald-600" />
                      </div>
                      <div>
                        <h3 className="text-lg md:text-xl font-bold text-[#000080] mb-1.5">
                          Emission Control
                        </h3>
                        <p className="text-slate-600 text-sm md:text-base leading-relaxed font-normal">
                          State-of-the-art bag house filters ensuring particulate emissions remain well below global EPA standards.
                        </p>
                      </div>
                    </div>
                  </StaggerItem>

                  {/* Pillar 3: Community & Governance */}
                  <StaggerItem delay={0.40} isPinned={isPinned} revealed={contentRevealed}>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-center flex-shrink-0 text-emerald-600">
                        <Users className="w-6 h-6 text-emerald-600" />
                      </div>
                      <div>
                        <h3 className="text-lg md:text-xl font-bold text-[#000080] mb-1.5">
                          Community & Governance
                        </h3>
                        <p className="text-slate-600 text-sm md:text-base leading-relaxed font-normal">
                          Empowering local districts through education, healthcare, and transparent corporate governance.
                        </p>
                      </div>
                    </div>
                  </StaggerItem>

                </div>

                {/* CTA Button */}
                <StaggerItem delay={0.48} isPinned={isPinned} revealed={contentRevealed}>
                  <button
                    type="button"
                    onClick={onDownloadReport}
                    className="group inline-flex items-center gap-2.5 px-6 py-3 mt-10 rounded-full bg-[#000080] text-white font-semibold text-sm transition-all duration-300 hover:bg-[#000060] shadow-sm hover:shadow-md active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#000080] focus-visible:ring-offset-2"
                  >
                    <Download className="w-4 h-4 transition-transform duration-200 group-hover:-translate-y-0.5" />
                    <span>Read our 2026 ESG Report</span>
                  </button>
                </StaggerItem>

              </div>

              {/* ============================================================ */}
              {/* RIGHT COLUMN: PREMIUM VISUAL WITH BORDER GLOW & GLASS CARD   */}
              {/* ============================================================ */}
              <StaggerItem delay={0.20} isPinned={isPinned} revealed={contentRevealed} className="relative w-full flex items-center justify-center lg:justify-end">
                {/* Outer Container with Glowing Aura */}
                <div className="relative w-full max-w-[560px] h-[500px] lg:h-[600px] group">
                  
                  {/* 1. Ambient Outer Border Glow Aura */}
                  <div 
                    className="absolute -inset-2 rounded-[2.2rem] bg-gradient-to-tr from-emerald-400/20 via-sky-300/20 to-amber-200/20 blur-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" 
                    aria-hidden="true" 
                  />

                  {/* 2. Radiant Gradient Border Frame */}
                  <div className="relative w-full h-full p-[2.5px] rounded-[1.75rem] bg-gradient-to-tr from-[#F4D5AB] via-emerald-400/60 to-blue-300 shadow-[0_20px_50px_rgba(0,0,128,0.12)]">
                    
                    {/* 3. Inner Image Wrapper */}
                    <div className="relative w-full h-full rounded-[1.6rem] overflow-hidden bg-slate-900">
                      <Image
                        src={imageUrl}
                        alt="Fecto Cement Sustainable Manufacturing Environment"
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                        unoptimized
                        priority={false}
                      />
                      
                      {/* Subtle Gradient Vignette */}
                      <div 
                        className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-70 pointer-events-none" 
                        aria-hidden="true" 
                      />
                    </div>

                  </div>

                  {/* The Floating UI Card with Animated Counter */}
                  <motion.div
                    animate={isReduced ? undefined : { y: [0, -10, 0] }}
                    transition={isReduced ? undefined : { repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                    className="absolute bottom-10 -left-6 md:-left-10 z-20 rounded-2xl p-6 max-w-[240px] bg-white/95 backdrop-blur-xl border border-slate-200/80 shadow-[0_20px_50px_rgba(0,0,80,0.16)] text-left pointer-events-auto"
                  >
                    {/* Top Row: Live metric with ping dot */}
                    <div className="flex items-center gap-2 mb-2">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                      </span>
                      <span className="text-[11px] font-bold tracking-wider text-slate-500 uppercase">
                        LIVE METRIC
                      </span>
                    </div>

                    {/* Middle: Animated -30% Metric */}
                    <div className="text-4xl font-extrabold text-[#000080] tracking-tighter my-2 font-mono">
                      <MetricCounter active={contentRevealed} reduced={Boolean(isReduced)} />
                    </div>

                    {/* Bottom: Description */}
                    <p className="text-sm text-slate-600 leading-snug font-normal">
                      Targeted reduction in carbon emissions by 2030.
                    </p>
                  </motion.div>

                </div>
              </StaggerItem>

            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SustainabilitySection;
