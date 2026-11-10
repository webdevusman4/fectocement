'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export interface OurStoryProps {
  className?: string;
  onReadStory?: () => void;
  onLeadership?: () => void;
}

/**
 * OurStory Component
 * 
 * Clean, premium 50/50 split-screen architecture for the Fecto Cement heritage section:
 * - Left column: Gold eyebrow, bold headline, story copy, dual rounded CTAs
 * - Right column: 1947 Grant Road vintage base image + floating founder portrait card (.glass-smoked)
 * - Bottom banner: Legacy stats frosted bar (.navy-glass-card / .glass-smoked)
 */
export const OurStory: React.FC<OurStoryProps> = ({
  className = '',
  onReadStory,
  onLeadership,
}) => {
  return (
    <section
      id="our-story"
      data-tone="dark"
      className={`relative w-full bg-[#0a0f1c] py-24 sm:py-32 overflow-hidden text-white selection:bg-[#F4D5AB] selection:text-[#000080] ${className}`}
    >
      {/* Ambient background glows for cinematic depth */}
      <div
        className="absolute top-1/4 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-[#000080]/20 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* ============================================================== */}
        {/* 1. TOP SECTION: 50/50 SPLIT GRID                                */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* LEFT COLUMN: Narrative Content & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-start text-left"
          >
            {/* Eyebrow */}
            <span className="text-amber-500 font-bold text-sm tracking-[0.2em] uppercase mb-4 block drop-shadow-sm">
              OUR STORY
            </span>

            {/* Headline */}
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 font-display leading-[1.05]">
              A name of faith.
            </h2>

            {/* Description */}
            <p className="text-slate-300 text-lg sm:text-xl leading-relaxed mb-8 max-w-xl font-normal">
              From a shoe store on Grant Road in 1947 to a PSX-listed cement maker: nearly eight decades built on keeping our word.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2 w-full sm:w-auto">
              {onReadStory ? (
                <button
                  type="button"
                  onClick={onReadStory}
                  className="inline-flex items-center justify-center px-8 py-4 rounded-full text-base font-bold bg-white text-[#0a0f1c] hover:bg-white/90 transition-all duration-200 shadow-xl hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0f1c]"
                >
                  Read our story
                </button>
              ) : (
                <Link
                  href="/company/history"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-full text-base font-bold bg-white text-[#0a0f1c] hover:bg-white/90 transition-all duration-200 shadow-xl hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0f1c]"
                >
                  Read our story
                </Link>
              )}

              {onLeadership ? (
                <button
                  type="button"
                  onClick={onLeadership}
                  className="inline-flex items-center justify-center px-8 py-[14px] rounded-full text-base font-semibold text-white bg-transparent border-2 border-white hover:bg-white/10 transition-all duration-200 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0f1c]"
                >
                  Leadership & governance
                </button>
              ) : (
                <Link
                  href="/company/corporate-governance"
                  className="inline-flex items-center justify-center px-8 py-[14px] rounded-full text-base font-semibold text-white bg-transparent border-2 border-white hover:bg-white/10 transition-all duration-200 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0f1c]"
                >
                  Leadership & governance
                </Link>
              )}
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Visual Collage */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-lg lg:max-w-none mx-auto pt-4 pb-12 pl-6 sm:pl-10"
          >
            {/* Base Image: 1947 Grant Road Street Scene */}
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl shadow-2xl border border-white/15 bg-slate-900">
              <Image
                src="/images/hero-heritage.jpg"
                alt="1947 Grant Road vintage archival street scene"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover brightness-75 transition-transform duration-700 hover:scale-105"
                priority
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-[#0a0f1c]/70 via-transparent to-transparent pointer-events-none"
                aria-hidden="true"
              />
            </div>

            {/* Floating Portrait Card: Founder Ghulam Muhammad A. Fecto */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="absolute -bottom-6 -left-2 sm:-bottom-8 sm:-left-4 md:-left-6 z-10 glass-smoked border border-amber-500/30 p-2 sm:p-2.5 rounded-2xl shadow-2xl backdrop-blur-xl"
            >
              <div className="relative w-32 h-40 sm:w-44 sm:h-56 rounded-xl overflow-hidden bg-slate-900/80">
                <Image
                  src="/images/founder-portrait.jpg"
                  alt="Ghulam Muhammad A. Fecto, Founder"
                  fill
                  sizes="(max-width: 640px) 128px, 176px"
                  className="object-cover object-top"
                />
              </div>
              <div className="pt-2 px-1 text-center">
                <p className="text-xs sm:text-sm font-semibold text-white tracking-wide">
                  Ghulam Muhammad A. Fecto
                </p>
                <p className="text-[10px] sm:text-xs text-amber-500/90 uppercase tracking-widest font-medium">
                  Founder
                </p>
              </div>
            </motion.div>
          </motion.div>

        </div>

        {/* ============================================================== */}
        {/* 2. BOTTOM SECTION: THE LEGACY STATS BANNER                      */}
        {/* ============================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-5%' }}
          transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="mt-20 lg:mt-24"
        >
          <div className="glass-smoked navy-glass-card rounded-2xl sm:rounded-3xl border border-amber-500/30 p-6 sm:p-8 lg:p-10 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-white/10 text-center">
              
              {/* Stat 1: Installed Capacity */}
              <div className="flex flex-col items-center justify-center px-4 pt-2 md:pt-0">
                <span className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-2">
                  0.8
                </span>
                <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-300">
                  million tons / year
                </span>
                <span className="text-[11px] sm:text-xs text-slate-400 mt-1">
                  Installed Cement Capacity
                </span>
              </div>

              {/* Stat 2: Daily Clinker Line */}
              <div className="flex flex-col items-center justify-center px-4 pt-6 md:pt-0">
                <span className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-2">
                  3,000
                </span>
                <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-300">
                  tons / day
                </span>
                <span className="text-[11px] sm:text-xs text-slate-400 mt-1">
                  Dry-Process Clinker Line
                </span>
              </div>

              {/* Stat 3: Year Established */}
              <div className="flex flex-col items-center justify-center px-4 pt-6 md:pt-0">
                <span className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-2">
                  1981
                </span>
                <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-300">
                  Year Established
                </span>
                <span className="text-[11px] sm:text-xs text-slate-400 mt-1">
                  Decades of Continuous Trust
                </span>
              </div>

            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default OurStory;