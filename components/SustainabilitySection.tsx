'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import {
  motion,
  useMotionValue,
  useTransform,
  useInView,
  animate,
} from 'framer-motion';
import { Leaf, Wind, Users, Download } from 'lucide-react';
import { useMotionPrefs } from '@/hooks/useMotionPrefs';
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

  React.useEffect(() => {
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
  className = '',
}: {
  children: React.ReactNode;
  delay: number;
  className?: string;
}) {
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
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const { reduced: isReduced } = useMotionPrefs();
  const isInView = useInView(sectionRef, { once: true, margin: '-10%' });

  return (
    <section
      ref={sectionRef}
      id="sustainability"
      data-tone="light"
      aria-label="Environment and Sustainability"
      className={`relative ${Z.sustain} bg-[#F8FAFC] text-slate-900 rounded-t-[40px] -mt-10 shadow-[0_-20px_60px_rgba(0,0,60,0.25)] py-24 sm:py-28 md:py-32 overflow-hidden border-t border-slate-200/60 ${className}`}
    >
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-center">
          
          {/* ============================================================ */}
          {/* LEFT COLUMN: TYPOGRAPHY & GREEN PILLARS                      */}
          {/* ============================================================ */}
          <div className="flex flex-col items-start text-left">
            
            {/* Eyebrow Badge */}
            <StaggerItem delay={0}>
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-slate-200 shadow-xs text-xs md:text-sm font-bold tracking-widest uppercase text-emerald-800 mb-4">
                ENVIRONMENT & SUSTAINABILITY
              </span>
            </StaggerItem>

            {/* Heading (H2) */}
            <StaggerItem delay={0.08}>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#000080] leading-[1.08] mb-6">
                Building a greener tomorrow, today.
              </h2>
            </StaggerItem>

            {/* Paragraph */}
            <StaggerItem delay={0.16}>
              <p className="text-slate-600 text-base md:text-lg leading-relaxed mb-10 max-w-xl font-normal">
                We recognize that heavy industry impacts the earth. That’s why Fecto is pioneering sustainable manufacturing in Pakistan through alternative fuels, strict emission controls, and community-first governance.
              </p>
            </StaggerItem>

            {/* The 3 ESG Pillars (Vertical List) */}
            <div className="space-y-8 w-full max-w-xl">
              
              {/* Pillar 1: Alternative Fuels */}
              <StaggerItem delay={0.24}>
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
              <StaggerItem delay={0.32}>
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
              <StaggerItem delay={0.40}>
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
            <StaggerItem delay={0.48}>
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
          <StaggerItem delay={0.20} className="relative w-full flex items-center justify-center lg:justify-end">
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
                  <MetricCounter active={isInView} reduced={Boolean(isReduced)} />
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
  );
};

export default SustainabilitySection;
