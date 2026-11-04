'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Building2, 
  Calendar, 
  ChevronRight, 
  Award, 
  ShieldCheck, 
  Factory, 
  TrendingUp, 
  Leaf, 
  Flame, 
  Layers,
  ArrowRight
} from 'lucide-react';
import FectoNavbar from '@/components/FectoNavbar';
import CorporateFooter from '@/components/CorporateFooter';
import QuoteModal from '@/components/QuoteModal';
import InnerPageHero from '@/components/InnerPageHero';

interface TimelineEvent {
  year: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  icon: React.ComponentType<{ className?: string }>;
}

const timelineData: TimelineEvent[] = [
  {
    year: '1981',
    badge: 'The Genesis',
    title: 'The Foundation (Sangjani Plant)',
    subtitle: 'Strategic Industrial Inception',
    description: 'Fecto Cement Limited was incorporated, commissioning a premier European-engineered dry-process rotary kiln at Sangjani, Islamabad. Nestled strategically adjacent to the mineral-dense Margalla limestone corridor, the facility was designed to anchor northern infrastructure corridors.',
    highlights: ['First European dry-process kiln in the region', 'Strategic Sangjani quarry rights secured', 'Direct rail-siding connectivity established'],
    icon: Factory,
  },
  {
    year: '1995',
    badge: 'Capital Growth',
    title: 'Public Listing (PSX Debut)',
    subtitle: 'Institutional Equity & Transparency',
    description: 'In a landmark corporate transition, Fecto Cement was formally listed on the Pakistan Stock Exchange (PSX: FECTO). This democratized ownership among thousands of public and institutional shareholders, funding massive technological upgrades and establishing a gold standard in corporate governance.',
    highlights: ['Public debut on Pakistan Stock Exchange', 'Over 12,000 retail and institutional shareholders', 'Introduction of computerized quality-control laboratories'],
    icon: TrendingUp,
  },
  {
    year: '2010',
    badge: 'Industrial Scale',
    title: 'The 2M+ Milestone (Capacity Expansion)',
    subtitle: 'High-Efficiency Modernization',
    description: 'Completed a multi-million-dollar plant debottlenecking and expansion program. Integrating advanced vertical roller press grinding and automated DCS clinker control, Fecto scaled combined annual capacity past 2.8 million metric tons, supplying the nation’s largest energy dams and expressways.',
    highlights: ['Annual production scaled past 2.8M tons', 'State-of-the-art DCS automation installed', 'Awarded ISO 9001 and PSQCA top certifications'],
    icon: Layers,
  },
  {
    year: '2026',
    badge: 'Sustainability Benchmark',
    title: 'The Green Era (Alternative Fuels Integration)',
    subtitle: 'Circular Economy & Decarbonization',
    description: 'Leading Pakistan’s heavy industry into the low-carbon future. Fecto successfully operationalized Refuse-Derived Fuel (RDF) and agricultural biomass co-processing kilns, supported by advanced baghouse filtration that cuts particulate emissions well beneath global EPA ceilings.',
    highlights: ['30% targeted carbon intensity reduction by 2030', 'Multi-fuel burner co-processing agricultural biomass', 'Zero industrial wastewater discharge system'],
    icon: Leaf,
  },
];

export default function OurStoryPage() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F1F5F9] text-slate-900 selection:bg-[#F4D5AB] selection:text-[#000080]">
      {/* 1. FLOATING NAVBAR */}
      <FectoNavbar onCtaClick={() => setQuoteModalOpen(true)} />

      {/* 2. SECTION 1: THE PREMIUM EDITORIAL HERO */}
      <InnerPageHero
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Company' },
          { label: 'Our Story' },
        ]}
        title="A Legacy Cast in Concrete."
        subtitle="Since 1981, forging the physical foundations of Pakistan through manufacturing excellence, engineering resilience, and unwavering national commitment."
        textureImageUrl="/images/company-plant.jpg"
      />

      {/* 3. SECTION 2: THE DUAL-ERA ORIGIN (SPLIT COMPOSITION) */}
      <section className="py-24 bg-[#F1F5F9] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* LEFT (TEXT): Giant Drop-Cap Letter + Historical Narrative */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#8B5E1A] mb-3">
                DUAL-ERA ORIGIN & GENESIS
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#000080] leading-[1.15] mb-6">
                From a single Margalla kiln to a nationwide industrial force.
              </h2>

              {/* Text with Giant Drop-Cap Letter 'S' */}
              <div className="text-slate-700 text-base sm:text-lg leading-relaxed space-y-4">
                <p>
                  <span className="float-left text-7xl sm:text-8xl font-serif font-black text-[#000080] pr-4 pt-1 leading-none select-none">
                    S
                  </span>
                  ince its formal establishment in 1981, Fecto Cement Limited has operated with a singular, uncompromised mandate: to engineer the most chemically resilient, high-early-strength Portland cement in South Asia. At a time when Pakistan was embarking on ambitious infrastructure expansion across northern hydro-electric basins, Fecto chose Sangjani—at the gateway of the capital—as its industrial cornerstone.
                </p>
                <p>
                  Blessed with geologically superior limestone reserves in the Margalla Hills formation, our founders invested in cutting-edge European rotary kiln systems. Over four decades, that pioneering spirit withstood economic cycles, technical transformations, and the accelerating demands of high-rise urban skylines.
                </p>
                <p>
                  Today, Fecto stands not merely as a cement producer, but as an institutional partner to Pakistan’s foremost civil contractors, engineers, and government authorities. Our material runs through the spines of motorways, deep-water ports, and hydro-power spillways designed to endure across centuries.
                </p>
              </div>

              {/* Heritage Metric Highlights */}
              <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-slate-200">
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-[#000080]">1981</div>
                  <div className="text-xs text-slate-500 font-medium uppercase tracking-wider mt-1">Year Established</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-[#000080]">2.8M+</div>
                  <div className="text-xs text-slate-500 font-medium uppercase tracking-wider mt-1">Tons Annual Clinker</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-[#000080]">4+ Decades</div>
                  <div className="text-xs text-slate-500 font-medium uppercase tracking-wider mt-1">National Service</div>
                </div>
              </div>
            </div>

            {/* RIGHT (VISUAL): Overlapping Dual-Image Composition */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                
                {/* Image 1 (Back, Grayscale): Vintage 1981 Factory */}
                <div className="w-4/5 ml-auto relative rounded-2xl overflow-hidden shadow-xl border border-slate-300">
                  <div className="relative aspect-[4/3] w-full">
                    <Image
                      src="/images/company-plant.jpg"
                      alt="1981 Vintage Sangjani Cement Plant"
                      fill
                      sizes="(max-width: 1024px) 70vw, 35vw"
                      className="object-cover grayscale contrast-125 brightness-95"
                    />
                  </div>
                  {/* Badge */}
                  <div className="absolute top-3 right-3 bg-black/75 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-mono font-medium text-white tracking-wide border border-white/20">
                    1981 • Inception Plant
                  </div>
                </div>

                {/* Image 2 (Front, Full Color): Modern 2026 Facility */}
                <div className="w-4/5 relative -mt-20 sm:-mt-28 z-10 rounded-2xl overflow-hidden shadow-2xl border-4 border-white transition-transform duration-500 hover:scale-[1.02]">
                  <div className="relative aspect-[4/3] w-full">
                    <Image
                      src="/herobg.jpg"
                      alt="Modern High-Tech Fecto Cement Manufacturing Facility"
                      fill
                      sizes="(max-width: 1024px) 70vw, 35vw"
                      className="object-cover brightness-105"
                    />
                  </div>
                  {/* Badge */}
                  <div className="absolute bottom-3 left-3 bg-[#000080]/90 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[11px] font-mono font-semibold text-[#F4D5AB] tracking-wide border border-[#F4D5AB]/30 shadow-lg flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    2026 • AI-Integrated DCS
                  </div>
                </div>

                {/* Caption Tag */}
                <div className="mt-6 text-center text-xs text-slate-500 italic">
                  Sangjani Complex: Four decades of continuous evolutionary engineering.
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. SECTION 3: THE ALTERNATING INTERACTIVE TIMELINE (CRUCIAL UX) */}
      <section className="py-24 md:py-32 bg-[#F1F5F9] relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 relative">
          
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#8B5E1A]">
              CHRONOLOGY OF PROGRESS
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#000080] mt-3">
              Four decades of decisive milestones.
            </h2>
            <p className="text-slate-600 mt-4 text-base sm:text-lg">
              Explore the strategic transformations that shaped Fecto Cement from a single rotary kiln into Pakistan’s benchmark of industrial durability.
            </p>
          </div>

          {/* Timeline Nodes Container */}
          <div className="space-y-16 md:space-y-24 relative">
            {/* Central Vertical Spine Line - Contained cleanly strictly across timeline nodes */}
            <div 
              className="absolute left-1/2 -translate-x-1/2 top-16 bottom-16 w-1 bg-gradient-to-b from-[#000080]/30 via-slate-300 to-[#000080]/30 rounded-full hidden md:block pointer-events-none" 
              aria-hidden="true"
            />
            {timelineData.map((event, idx) => {
              const isEven = idx % 2 === 1; // 0: 1981 (Odd/Left), 1: 1995 (Even/Right), 2: 2010 (Odd/Left), 3: 2026 (Even/Right)
              const IconComponent = event.icon;

              return (
                <div 
                  key={event.year} 
                  className={`relative flex flex-col md:flex-row items-center ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Left / Right Card (Slide Animation) */}
                  <div className="w-full md:w-1/2 px-0 md:px-8">
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className={`p-6 sm:p-8 rounded-3xl bg-white shadow-xl border border-slate-200/80 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${
                        isEven ? 'text-left' : 'text-left'
                      }`}
                    >
                      {/* Top Header of Card */}
                      <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#000080]/5 text-[#000080] border border-[#000080]/10">
                          <IconComponent className="w-3.5 h-3.5 text-[#8B5E1A]" />
                          {event.badge}
                        </span>
                        <span className="text-xs text-slate-400 font-mono font-medium">Milestone #{idx + 1}</span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-bold text-[#000080] mb-1">
                        {event.title}
                      </h3>
                      <p className="text-sm font-semibold text-[#8B5E1A] mb-3">
                        {event.subtitle}
                      </p>
                      <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-5">
                        {event.description}
                      </p>

                      {/* Bullet Highlights */}
                      <div className="space-y-1.5 pt-3 border-t border-slate-100">
                        {event.highlights.map((item, hIdx) => (
                          <div key={hIdx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#000080] mt-1.5 flex-shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </div>

                  {/* Center Animated Spine Dot */}
                  <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center z-20">
                    <motion.div
                      initial={{ scale: 0.8, backgroundColor: '#CBD5E1' }}
                      whileInView={{ 
                        scale: [1, 1.35, 1.15],
                        backgroundColor: '#F4D5AB',
                        borderColor: '#000080',
                      }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ duration: 0.5 }}
                      className="w-8 h-8 rounded-full border-4 border-[#000080] shadow-[0_0_20px_rgba(244,213,171,0.9)] flex items-center justify-center bg-[#F4D5AB]"
                    >
                      <span className="w-2 h-2 rounded-full bg-[#000080]" />
                    </motion.div>
                  </div>

                  {/* Opposite Side: Massive Year Display */}
                  <div className="w-full md:w-1/2 px-0 md:px-8 mt-4 md:mt-0">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ duration: 0.5 }}
                      className={`flex flex-col ${
                        isEven ? 'md:items-start md:text-left' : 'md:items-end md:text-right'
                      }`}
                    >
                      <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-[#000080] tracking-tighter drop-shadow-sm select-none">
                        {event.year}
                      </div>
                      <div className="text-xs sm:text-sm uppercase tracking-widest text-[#8B5E1A] font-semibold mt-1">
                        Epoch of Impact
                      </div>
                    </motion.div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 5. CORPORATE MEGA FOOTER */}
      <CorporateFooter />

      {/* 6. QUOTE MODAL */}
      <QuoteModal 
        isOpen={quoteModalOpen} 
        onClose={() => setQuoteModalOpen(false)} 
      />
    </div>
  );
}

