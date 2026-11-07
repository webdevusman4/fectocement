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
      className={`bg-[#F8FAFC] text-slate-900 py-28 md:py-32 relative overflow-hidden border-t border-slate-200/60 ${className}`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-center">
          
          {/* ================================================================ */}
          {/* LEFT COLUMN: TYPOGRAPHY & GREEN PILLARS                          */}
          {/* ================================================================ */}
          <div className="flex flex-col items-start text-left">
            
            {/* Eyebrow: Frosted Light Badge with Emerald Accents */}
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-slate-200 shadow-xs text-xs md:text-sm font-bold tracking-widest uppercase text-emerald-800 mb-4">
              ENVIRONMENT & SUSTAINABILITY
            </span>

            {/* Heading (H2): Fecto Navy, massive size, tight leading */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#000080] leading-[1.08] mb-6">
              Building a greener tomorrow, today.
            </h2>

            {/* Paragraph: Crisp Slate Gray, text-lg, max-w-xl */}
            <p className="text-slate-600 text-base md:text-lg leading-relaxed mb-10 max-w-xl font-normal">
              We recognize that heavy industry impacts the earth. That’s why Fecto is pioneering sustainable manufacturing in Pakistan through alternative fuels, strict emission controls, and community-first governance.
            </p>

            {/* The 3 ESG Pillars (Vertical List) */}
            <div className="space-y-8 w-full max-w-xl">
              
              {/* Pillar 1: Alternative Fuels */}
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

              {/* Pillar 2: Emission Control */}
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

              {/* Pillar 3: Community & Governance */}
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

            </div>

            {/* CTA Button: Read our 2026 ESG Report */}
            <button
              type="button"
              onClick={onDownloadReport}
              className="group inline-flex items-center gap-2.5 px-6 py-3 mt-10 rounded-full bg-[#000080] text-white font-semibold text-sm transition-all duration-300 hover:bg-[#000060] shadow-sm hover:shadow-md active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#000080] focus-visible:ring-offset-2"
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

              {/* The Floating UI Card */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
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

                {/* Middle: Huge number */}
                <div className="text-4xl font-extrabold text-[#000080] tracking-tighter my-2 font-mono">
                  -30%
                </div>

                {/* Bottom: Description */}
                <p className="text-sm text-slate-600 leading-snug font-normal">
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
