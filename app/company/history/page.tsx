'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  History, 
  Calendar, 
  Award, 
  Factory, 
  TrendingUp, 
  Cpu, 
  Leaf, 
  ArrowRight,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import FectoNavbar from '@/components/FectoNavbar';
import CorporateFooter from '@/components/CorporateFooter';
import QuoteModal from '@/components/QuoteModal';
import InnerPageHero from '@/components/InnerPageHero';

interface Era {
  decade: string;
  eraTitle: string;
  yearRange: string;
  headline: string;
  narrative: string[];
  image: string;
  caption: string;
  icon: React.ComponentType<{ className?: string }>;
}

const historyEras: Era[] = [
  {
    decade: 'The 1980s',
    eraTitle: 'The Foundation',
    yearRange: '1981 – 1989',
    headline: 'Overcoming Logistical Odds to Fire the First Sangjani Kiln',
    narrative: [
      'In 1981, when Pakistan’s northern provinces faced severe structural cement shortages for hydropower and capital city development, the founders of Fecto Cement took a monumental gamble. They committed substantial capital to import heavy European dry-process rotary kiln machinery through Karachi Port, transporting multi-ton steel cylindrical sections over 1,500 kilometers of rugged terrain to Sangjani.',
      'Against immense mechanical and logistical headwinds, local and international engineers erected the kiln beside the Margalla limestone reserves. By late 1982, the first 50kg bag of Fecto Ordinary Portland Cement rolled off the packing line, setting a gold standard for early compressive strength.',
    ],
    image: '/images/company-plant.jpg',
    caption: '1982 • Assembly of the primary European rotary kiln at Sangjani.',
    icon: Factory,
  },
  {
    decade: 'The 1990s',
    eraTitle: 'Going Public',
    yearRange: '1990 – 1999',
    headline: 'Listing on the Stock Exchange & Motorway Partnerships',
    narrative: [
      'The 1990s marked a decade of aggressive industrial scaling and institutional maturation. In 1995, Fecto Cement was formally listed on the Karachi Stock Exchange (now PSX: FECTO), distributing equity among thousands of institutional pension funds and retail Pakistani investors.',
      'This public capital injection funded the complete modernization of raw meal homogenizing silos and secondary crushing arrays. During this decade, Fecto cemented landmark supply contracts for the pioneering National Motorway (M-2) network, demonstrating that its cement could withstand severe vehicular weight loads and temperature extremes in the Salt Range.',
    ],
    image: '/Gemini_Generated_Image_1jfr2q1jfr2q1jfr.jpg',
    caption: '1995 • Fecto Cement supplied for the landmark M-2 Motorway construction.',
    icon: TrendingUp,
  },
  {
    decade: 'The 2000s',
    eraTitle: 'The Engineering Leap',
    yearRange: '2000 – 2015',
    headline: 'Robotic XRF Spectrometry & Mega-Dam Contracts',
    narrative: [
      'Entering the new millennium, Fecto Cement spearheaded a comprehensive automation revolution. In 2010, the company completed a multi-million-dollar capacity expansion, lifting annual output past 2.8 million metric tons with high-pressure vertical roller press grinding lines.',
      'Quality assurance transitioned to robotic online XRF and XRD spectrometry, providing real-time chemical verification every fifteen minutes. This unparalleled consistency made Fecto the premier choice for the Tarbela Dam 4th Extension, supplying over a million tons of specialized Low-Heat Sulphate Resistant Cement.',
    ],
    image: '/tarbala.jpg',
    caption: '2014 • Giant concrete pours for the Tarbela Dam hydro-electric powerhouse.',
    icon: Cpu,
  },
  {
    decade: 'The Modern Era',
    eraTitle: 'Sustainable Dominance',
    yearRange: '2016 – Present',
    headline: 'Alternative Fuels, Circular Energy & Decarbonization',
    narrative: [
      'Today, Fecto stands as a vanguard of ecological heavy industry in South Asia. Our Sangjani kilns have been converted to co-process Refuse-Derived Fuel (RDF) and agricultural biomass, systematically reducing dependence on imported coal and cutting national foreign exchange drain.',
      'Supported by automated waste heat recovery boilers, captive solar parks, and computerized fleet dispatch terminals, Fecto Cement is advancing boldly toward its audited target of 30% carbon emissions reduction by 2030 and Net Zero by 2050.',
    ],
    image: '/herobg.jpg',
    caption: '2026 • The modern Sangjani complex operating with AI-integrated DCS control.',
    icon: Leaf,
  },
];

const archiveGallery = [
  {
    title: 'First cement bag dispatched (1982)',
    date: 'October 1982',
    image: '/images/dealers-warehouse.jpg',
    tag: 'Industrial Milestone',
  },
  {
    title: 'Signing the M-2 Motorway Contract (1995)',
    date: 'March 1995',
    image: '/Gemini_Generated_Image_1jfr2q1jfr2q1jfr.jpg',
    tag: 'National Infrastructure',
  },
  {
    title: 'Inauguration of Line-2 by state officials (2010)',
    date: 'August 2010',
    image: '/images/company-plant.jpg',
    tag: 'Capacity Expansion',
  },
  {
    title: 'Foundation pour for Tarbela Extension (2014)',
    date: 'November 2014',
    image: '/tarbala.jpg',
    tag: 'Hydraulic Engineering',
  },
  {
    title: 'Commissioning of Alternative Fuel RDF Facility (2022)',
    date: 'June 2022',
    image: '/images/contractors-infra.jpg',
    tag: 'Green Transition',
  },
  {
    title: 'Installation of Automated DCS Kiln Control (2025)',
    date: 'January 2025',
    image: '/images/investors-towers.jpg',
    tag: 'Digital Intelligence',
  },
];

export default function EpicHistoryPage() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F1F5F9] text-slate-900 selection:bg-[#F4D5AB] selection:text-[#000080]">
      {/* 1. FLOATING NAVBAR */}
      <FectoNavbar onCtaClick={() => setQuoteModalOpen(true)} />

      {/* 2. SECTION 1: MASSIVE HERO (min-h-[60vh]) */}
      <InnerPageHero
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Company' },
          { label: 'Epic History' },
        ]}
        title="Decades of Monumental Growth."
        subtitle="From a single visionary idea to the bedrock of Pakistan's infrastructure."
        textureImageUrl="/images/company-plant.jpg"
        className="min-h-[60vh] pt-36 pb-28"
      />

      {/* 3. SECTION 2: THE "STICKY ERA" SCROLLER */}
      <section className="py-24 bg-[#F1F5F9] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#8B5E1A]">
              DECADE-BY-DECADE CHRONICLE
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#000080] mt-3">
              The Evolution of an Industrial Titan
            </h2>
            <p className="text-slate-600 mt-4 text-base sm:text-lg">
              Scroll through the historical epochs that forged four decades of manufacturing resilience.
            </p>
          </div>

          {/* Sticky Era Scroller Container */}
          <div className="space-y-32">
            {historyEras.map((era, idx) => {
              const IconComp = era.icon;
              return (
                <div key={era.decade} className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                  
                  {/* LEFT COLUMN: Sticky Era Header */}
                  <div className="lg:col-span-4 lg:sticky lg:top-36 self-start">
                    <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-xl">
                      <div className="flex items-center gap-2 mb-4">
                        <span className="w-10 h-10 rounded-2xl bg-[#000080]/10 text-[#000080] flex items-center justify-center font-bold text-sm">
                          0{idx + 1}
                        </span>
                        <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#8B5E1A]">
                          {era.yearRange}
                        </span>
                      </div>

                      <div className="text-4xl sm:text-5xl font-black text-[#000080] tracking-tight mb-2">
                        {era.decade}
                      </div>

                      <div className="text-lg font-bold text-slate-800 mb-4">
                        {era.eraTitle}
                      </div>

                      <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-mono text-slate-500">
                        <IconComp className="w-4 h-4 text-[#8B5E1A]" />
                        <span>Sangjani Archives • Chapter {idx + 1}</span>
                      </div>
                    </div>
                  </div>

                  {/* RIGHT COLUMN: Deep Narrative Content & Visual */}
                  <div className="lg:col-span-8 space-y-8">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-80px' }}
                      transition={{ duration: 0.6 }}
                      className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200/80 shadow-xl"
                    >
                      <h3 className="text-2xl sm:text-3xl font-bold text-[#000080] mb-6 leading-tight">
                        {era.headline}
                      </h3>

                      <div className="text-slate-700 text-base sm:text-lg leading-relaxed space-y-4 mb-8">
                        {era.narrative.map((para, pIdx) => (
                          <p key={pIdx}>{para}</p>
                        ))}
                      </div>

                      {/* Era Visual Card */}
                      <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-slate-900 group">
                        <Image
                          src={era.image}
                          alt={era.caption}
                          fill
                          sizes="(max-width: 1024px) 100vw, 60vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                        <div className="absolute bottom-4 left-4 right-4 text-xs font-mono text-white/90 bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
                          {era.caption}
                        </div>
                      </div>
                    </motion.div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. SECTION 3: THE HISTORICAL ARCHIVE GALLERY */}
      <section className="py-24 bg-[#F1F5F9]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#8B5E1A]">
              THE CORPORATE MUSEUM
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#000080] mt-3">
              Historical Archive Gallery
            </h2>
            <p className="text-slate-600 mt-4 text-base sm:text-lg">
              Hover over any archived photograph to restore its original colors and inspect our foundational artifacts.
            </p>
          </div>

          {/* 3-Column Masonry Grid with Sepia / Grayscale to Color Reveal UX */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {archiveGallery.map((item, idx) => (
              <div
                key={item.title}
                className="group relative overflow-hidden rounded-3xl bg-slate-900 shadow-xl border border-slate-200/80 cursor-pointer aspect-[4/3]"
              >
                {/* Archived Image: Sepia + Grayscale by default, color on hover */}
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover grayscale contrast-125 sepia-[0.35] group-hover:grayscale-0 group-hover:sepia-0 group-hover:scale-105 transition-all duration-700 ease-in-out"
                />

                {/* Top Archive Badge */}
                <div className="absolute top-4 left-4 z-10 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-mono font-medium text-[#F4D5AB] border border-white/20">
                  {item.tag}
                </div>

                {/* Dark Gradient Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />

                {/* Bottom Caption Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-6 z-10">
                  <div className="text-xs font-mono text-slate-300 mb-1">
                    {item.date}
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-white leading-snug drop-shadow-md">
                    {item.title}
                  </h4>
                </div>
              </div>
            ))}
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

