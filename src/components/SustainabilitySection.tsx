'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Leaf, Wind, Users, Download } from 'lucide-react';

export interface SustainabilitySectionProps {
  onDownloadReport?: () => void;
  className?: string;
  imageUrl?: string;
}

export const SustainabilitySection: React.FC<SustainabilitySectionProps> = ({
  onDownloadReport,
  className = '',
  imageUrl = '/images/sustainability-energy.jpg',
}) => {
  return (
    <section
      id="sustainability"
      className={`bg-[#000080] text-white py-28 md:py-32 relative overflow-hidden ${className}`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-center">
          
          {/* ================================================================ */}
          {/* LEFT COLUMN: TYPOGRAPHY & GREEN PILLARS                          */}
          {/* ================================================================ */}
          <div className="flex flex-col items-start text-left">
            
            {/* Eyebrow: Champagne Sand #F4D5AB, uppercase, tracking-widest */}
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs md:text-sm font-bold tracking-widest uppercase text-[#F4D5AB] mb-4 shadow-sm">
              ENVIRONMENT & SUSTAINABILITY
            </span>

            {/* Heading (H2): Pure White, massive size, tight leading */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.08] mb-6">
              Building a greener tomorrow, today.
            </h2>

            {/* Paragraph: Light blue-slate, text-lg, max-w-xl */}
            <p className="text-blue-100/80 text-base md:text-lg leading-relaxed mb-10 max-w-xl font-normal">
              We recognize that heavy industry impacts the earth. That’s why Fecto is pioneering sustainable manufacturing in Pakistan through alternative fuels, strict emission controls, and community-first governance.
            </p>

            {/* The 3 ESG Pillars (Vertical List) */}
            <div className="space-y-8 w-full max-w-xl">
              
              {/* Pillar 1: Alternative Fuels */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/[0.08] border border-white/15 flex items-center justify-center flex-shrink-0 text-[#F4D5AB] shadow-inner">
                  <Leaf className="w-6 h-6 text-[#F4D5AB]" />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-white mb-1.5">
                    Alternative Fuels
                  </h3>
                  <p className="text-blue-100/70 text-sm md:text-base leading-relaxed font-light">
                    Transitioning kilns to run on biomass and refuse-derived fuels (RDF) to cut fossil fuel reliance.
                  </p>
                </div>
              </div>

              {/* Pillar 2: Emission Control */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/[0.08] border border-white/15 flex items-center justify-center flex-shrink-0 text-[#F4D5AB] shadow-inner">
                  <Wind className="w-6 h-6 text-[#F4D5AB]" />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-white mb-1.5">
                    Emission Control
                  </h3>
                  <p className="text-blue-100/70 text-sm md:text-base leading-relaxed font-light">
                    State-of-the-art bag house filters ensuring particulate emissions remain well below global EPA standards.
                  </p>
                </div>
              </div>

              {/* Pillar 3: Community & Governance */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/[0.08] border border-white/15 flex items-center justify-center flex-shrink-0 text-[#F4D5AB] shadow-inner">
                  <Users className="w-6 h-6 text-[#F4D5AB]" />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-white mb-1.5">
                    Community & Governance
                  </h3>
                  <p className="text-blue-100/70 text-sm md:text-base leading-relaxed font-light">
                    Empowering local districts through education, healthcare, and transparent corporate governance.
                  </p>
                </div>
              </div>

            </div>

            {/* CTA Button: Read our 2026 ESG Report */}
            <button
              type="button"
              onClick={onDownloadReport}
              className="group inline-flex items-center gap-2.5 px-6 py-3 mt-10 rounded-full border border-[#F4D5AB] text-[#F4D5AB] font-semibold text-sm transition-all duration-300 hover:bg-[#F4D5AB] hover:text-[#000080] shadow-sm active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F4D5AB]"
            >
              <Download className="w-4 h-4 transition-transform duration-200 group-hover:-translate-y-0.5" />
              <span>Read our 2026 ESG Report</span>
            </button>

          </div>

          {/* ================================================================ */}
          {/* RIGHT COLUMN: PREMIUM VISUAL WITH BORDER GLOW & GLASS CARD        */}
          {/* ================================================================ */}
          <div className="relative w-full flex items-center justify-center lg:justify-end">
            
            {/* Outer Container with Glowing Aura */}
            <div className="relative w-full max-w-[560px] h-[500px] lg:h-[600px] group">
              
              {/* 1. Ambient Outer Border Glow Aura */}
              <div 
                className="absolute -inset-2 rounded-[2.2rem] bg-gradient-to-tr from-[#F4D5AB]/50 via-emerald-400/40 to-blue-400/50 blur-2xl opacity-75 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" 
                aria-hidden="true"
              />

              {/* 2. Radiant Gradient Border Frame */}
              <div className="relative w-full h-full p-[2.5px] rounded-[1.75rem] bg-gradient-to-tr from-[#F4D5AB] via-emerald-400/60 to-blue-300 shadow-[0_0_50px_rgba(244,213,171,0.25),0_0_90px_rgba(52,211,153,0.18)]">
                
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
                  
                  {/* Subtle Dark Navy Gradient Vignette */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-t from-[#000080]/80 via-transparent to-transparent opacity-70 pointer-events-none" 
                    aria-hidden="true" 
                  />
                </div>

              </div>

              {/* The Floating Glassmorphism UI Card */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                className="absolute bottom-10 -left-6 md:-left-10 z-20 rounded-2xl p-6 max-w-[240px] bg-white/15 backdrop-blur-2xl border border-white/30 shadow-[0_20px_50px_rgba(0,0,0,0.4),0_0_25px_rgba(244,213,171,0.15)] text-left pointer-events-auto"
              >
                {/* Top Row: Live metric with ping dot */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                  </span>
                  <span className="text-[11px] font-bold tracking-wider text-white/80 uppercase">
                    LIVE METRIC
                  </span>
                </div>

                {/* Middle: Huge number */}
                <div className="text-4xl font-extrabold text-white tracking-tighter my-2 font-mono">
                  -30%
                </div>

                {/* Bottom: Description */}
                <p className="text-sm text-white/80 leading-snug font-normal">
                  Targeted reduction in carbon emissions by 2030.
                </p>
              </motion.div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default SustainabilitySection;

