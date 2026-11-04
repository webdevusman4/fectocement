'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { Award, ArrowRight } from 'lucide-react';

export interface CompanyGlimpseProps {
  onDiscoverHistory?: () => void;
  className?: string;
  hqImageUrl?: string;
  plantImageUrl?: string;
}

/**
 * Animated number counter component
 * Counts up or down smoothly with cubic ease-out when scrolled into view
 */
function AnimatedStat({
  from,
  to,
  duration = 2000,
  decimals = 0,
  prefix = '',
  suffix = '',
}: {
  from: number;
  to: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });
  const [currentVal, setCurrentVal] = useState<number>(from);
  const hasAnimated = useRef(false);

  const startAnimation = () => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    const startTime = performance.now();

    const frame = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Smooth cubic ease-out curve (fast acceleration, decelerating to rest)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const val = from + (to - from) * easeOut;
      
      setCurrentVal(val);

      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        setCurrentVal(to);
      }
    };

    requestAnimationFrame(frame);
  };

  useEffect(() => {
    if (isInView) {
      startAnimation();
    }
  }, [isInView]);

  // Robust fallback: auto-trigger after 1.2s so headless/static environments show final values
  useEffect(() => {
    const timer = setTimeout(() => {
      startAnimation();
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div ref={containerRef}>
      {prefix}
      {currentVal.toFixed(decimals)}
      {suffix}
    </div>
  );
}

/**
 * Company Glimpse (Corporate Scale & Legacy) Section
 * Establishes institutional authority immediately after the Stakeholder Grid.
 */
export const CompanyGlimpse: React.FC<CompanyGlimpseProps> = ({
  onDiscoverHistory,
  className = '',
  hqImageUrl = '/images/company-hq.jpg',
  plantImageUrl = '/images/company-plant.jpg',
}) => {
  return (
    <section
      id="company"
      className={`bg-white text-slate-900 py-24 ${className}`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* ================================================================ */}
          {/* LEFT COLUMN: OVERLAPPING ARCHITECTURAL COLLAGE                   */}
          {/* ================================================================ */}
          <div className="relative w-full aspect-square md:aspect-[4/3] flex items-center justify-center">
            
            {/* 1. Main Background Image: Corporate Headquarters (80% x 80%) */}
            <div className="absolute top-0 left-0 w-[80%] h-[80%] rounded-3xl overflow-hidden shadow-[0_20px_50px_-12px_rgba(0,0,128,0.18)] border border-slate-100 transition-transform duration-700 hover:scale-[1.01]">
              <Image
                src={hqImageUrl}
                alt="Fecto Cement Corporate Headquarters"
                fill
                sizes="(max-width: 768px) 80vw, 40vw"
                className="object-cover object-center"
                unoptimized
                priority={false}
              />
              <div 
                className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" 
                aria-hidden="true" 
              />
            </div>

            {/* 2. Floating Glass-Arctic Badge: "4+ Decades of Excellence" */}
            <div className="absolute top-6 left-6 z-20 flex items-center gap-2.5 px-4 py-2.5 rounded-full glass-arctic shadow-[0_12px_30px_rgba(0,0,128,0.16)] cursor-default select-none pointer-events-auto">
              <div className="p-1 rounded-full bg-[#000080]/10 flex items-center justify-center">
                <Award className="w-4 h-4 text-[#000080]" />
              </div>
              <span className="text-xs md:text-sm font-bold tracking-tight text-[#000080]">
                4+ Decades of Excellence
              </span>
            </div>

            {/* 3. Secondary Front Image: Cement Plant/Factory (55% x 55%, Overlapping Bottom-Right) */}
            <div className="absolute bottom-0 right-0 w-[55%] h-[55%] rounded-3xl overflow-hidden shadow-[0_30px_70px_-15px_rgba(0,0,128,0.28)] border-8 border-white group z-10">
              <Image
                src={plantImageUrl}
                alt="Fecto Cement Sangjani Modern Production Plant"
                fill
                sizes="(max-width: 768px) 60vw, 30vw"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                unoptimized
                priority={false}
              />
              <div 
                className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" 
                aria-hidden="true" 
              />
              {/* Plant Tag: Frosted Glass Pill */}
              <div className="absolute bottom-3 left-3 right-3 z-10 px-3.5 py-1.5 rounded-xl bg-white/85 backdrop-blur-md border border-white/90 text-[11px] font-bold text-[#000080] shadow-sm truncate">
                Sangjani Manufacturing Plant, Islamabad
              </div>
            </div>

          </div>

          {/* ================================================================ */}
          {/* RIGHT COLUMN: COMPANY DETAILS & ANIMATED FACTS                   */}
          {/* ================================================================ */}
          <div className="flex flex-col justify-center">
            
            {/* Eyebrow: Color #8B5E1A Bronze, small, uppercase, tracking-widest */}
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#000080]/5 border border-[#000080]/10 text-xs md:text-sm font-bold tracking-widest uppercase text-[#8B5E1A] mb-4 w-fit">
              COMPANY GLIMPSE
            </span>

            {/* Heading (H2): Massive size, Fecto Navy, font-bold, tight leading */}
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#000080] leading-[1.12] mb-6">
              Forging the foundation of a modern nation.
            </h2>

            {/* Paragraph: Text-slate-600, text-lg, mb-10 */}
            <p className="text-slate-600 text-base md:text-lg leading-relaxed mb-10 font-normal">
              Since 1981, Fecto Cement has been the silent strength behind Pakistan’s most critical infrastructure. We combine decades of manufacturing legacy with modern engineering to deliver high-performance cement for mega-projects, commercial developments, and homes.
            </p>

            {/* Animated Counters Grid (Elevated Glass Surface Cards) */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-6 border-t border-slate-200">
              
              {/* Stat 1: Year Established */}
              <div className="surface-elevated rounded-2xl p-4 flex flex-col justify-between">
                <div className="text-3xl md:text-4xl font-extrabold text-[#000080] tracking-tight font-mono">
                  <AnimatedStat
                    from={2024}
                    to={1981}
                    duration={1800}
                    decimals={0}
                  />
                </div>
                <span className="text-xs md:text-sm text-slate-500 font-semibold mt-1">
                  Year Established
                </span>
              </div>

              {/* Stat 2: Tons Annual Capacity */}
              <div className="surface-elevated rounded-2xl p-4 flex flex-col justify-between">
                <div className="text-3xl md:text-4xl font-extrabold text-[#000080] tracking-tight font-mono">
                  <AnimatedStat
                    from={0.0}
                    to={2.8}
                    duration={1600}
                    decimals={1}
                    suffix="M+"
                  />
                </div>
                <span className="text-xs md:text-sm text-slate-500 font-semibold mt-1">
                  Tons Annual Capacity
                </span>
              </div>

              {/* Stat 3: Publicly Listed */}
              <div className="surface-elevated rounded-2xl p-4 flex flex-col justify-between col-span-2 md:col-span-1">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
                  className="text-3xl md:text-4xl font-extrabold text-[#000080] tracking-tight font-mono"
                >
                  PSX
                </motion.div>
                <span className="text-xs md:text-sm text-slate-500 font-semibold mt-1">
                  Publicly Listed
                </span>
              </div>

            </div>

            {/* Action Button: "Discover our history" */}
            <div className="mt-10">
              <button
                type="button"
                onClick={onDiscoverHistory}
                className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full border-2 border-[#000080] text-[#000080] font-semibold text-base transition-all duration-300 ease-in-out hover:bg-[#000080] hover:text-white shadow-sm hover:shadow-md active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#000080] focus:ring-offset-2"
              >
                <span>Discover our history</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default CompanyGlimpse;
