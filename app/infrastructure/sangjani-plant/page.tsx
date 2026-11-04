'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Factory, 
  Cpu, 
  Flame, 
  Wind, 
  Zap, 
  Activity, 
  CheckCircle2, 
  Layers, 
  ArrowRight,
  Info
} from 'lucide-react';
import FectoNavbar from '@/components/FectoNavbar';
import CorporateFooter from '@/components/CorporateFooter';
import QuoteModal from '@/components/QuoteModal';
import InnerPageHero from '@/components/InnerPageHero';

interface Hotspot {
  id: string;
  title: string;
  category: string;
  description: string;
  spec: string;
  x: string; // percentage left
  y: string; // percentage top
}

const plantHotspots: Hotspot[] = [
  {
    id: 'kiln',
    title: 'Rotary Kiln Line 2',
    category: 'Thermodynamic Pyro-Processing',
    description: 'European dry-process rotary kiln firing at 1450°C. Fully integrated with automated DCS combustion controls and alternative RDF fuel injection.',
    spec: 'Operating Temp: 1450°C • Clinker Output: 7,500 TPD',
    x: '28%',
    y: '48%',
  },
  {
    id: 'silos',
    title: 'Clinker Storage Silos',
    category: 'Material Buffer & Homogenization',
    description: 'Sealed cylindrical silos with aerated cone extraction, ensuring zero moisture penetration and homogenous clinker cooling before final grinding.',
    spec: 'Combined Capacity: 65,000 Metric Tons • Aerated Bottom',
    x: '56%',
    y: '34%',
  },
  {
    id: 'packing',
    title: 'Automated Packing Plant',
    category: 'Dispatch & Logistics Terminal',
    description: 'High-speed 12-spout rotary packing arrays equipped with digital load-cell weight calibration and automated telescopic bag loaders.',
    spec: 'Speed: 3,200 Bags/Hour • Tolerance: ±0.1 kg per 50kg bag',
    x: '78%',
    y: '62%',
  },
];

const technicalSpecs = [
  {
    title: 'Robotic XRF Testing Labs',
    category: 'Online Chemical Quality Assurance',
    standard: 'PS-232 / EN 197-1 CEM I 42.5R',
    details: 'Automated sample transport shuttles extract clinker and raw meal every 60 minutes for automated X-Ray Fluorescence (XRF) and X-Ray Diffraction (XRD) spectrometry.',
    status: 'Automated 24/7',
    icon: Cpu,
  },
  {
    title: 'European Heavy-Duty Rotary Kilns',
    category: 'Pyro-Processing Infrastructure',
    standard: 'FLSmidth Design Standard',
    details: 'Multi-stage preheater towers equipped with low-NOx calciner burners, accommodating up to 30% alternative fuels (RDF & biomass) with closed-loop computerized feedback.',
    status: 'Continuous Duty',
    icon: Flame,
  },
  {
    title: 'Bag-House Dust Filter Arrays',
    category: 'Environmental & Particulate Abatement',
    standard: 'World Bank / Global EPA Standard',
    details: 'Advanced pulse-jet fabric bag filters with PTFE membrane cartridges, capturing 99.9% of kiln flue dust and maintaining particulate emissions well below 30 mg/Nm³.',
    status: '< 30 mg/Nm³',
    icon: Wind,
  },
  {
    title: 'Captive Thermal & Solar Power',
    category: 'Energy Reliability & Microgrid',
    standard: 'Islanded Dual-Fuel Architecture',
    details: 'On-site heavy fuel oil and gas generators coupled with rooftop solar arrays guarantee continuous, uninterrupted power supply, eliminating kiln thermal shocks.',
    status: '100% Redundant',
    icon: Zap,
  },
];

export default function SangjaniPlantPage() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);

  return (
    <div className="min-h-screen bg-[#F1F5F9] text-slate-900 selection:bg-[#F4D5AB] selection:text-[#000080]">
      {/* 1. FLOATING NAVBAR */}
      <FectoNavbar onCtaClick={() => setQuoteModalOpen(true)} />

      {/* 2. SECTION 1: THE PREMIUM EDITORIAL HERO */}
      <InnerPageHero
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Infrastructure' },
          { label: 'Sangjani Plant' },
        ]}
        title="The Heart of Our Operations."
        subtitle="A sprawling, state-of-the-art facility engineered for continuous, high-volume clinker and cement production."
        textureImageUrl="/images/company-plant.jpg"
      />

      {/* 3. SECTION 2: INTERACTIVE PLANT PANORAMA */}
      <section className="py-24 bg-[#F1F5F9] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#8B5E1A]">
              VIRTUAL FACILITY EXPLORATION
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#000080] mt-3">
              Interactive Plant Panorama
            </h2>
            <p className="text-slate-600 mt-4 text-base sm:text-lg">
              Hover over the pulsing facility hotspots below to inspect key operational machinery and heavy industrial infrastructure.
            </p>
          </div>

          {/* Panoramic Container with Absolute Hotspots */}
          <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 group">
            {/* High-Res Background Image */}
            <Image
              src="/images/company-plant.jpg"
              alt="Panoramic View of Sangjani Cement Manufacturing Facility"
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover object-center brightness-95 contrast-105"
            />

            {/* Dark vignette overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

            {/* Facility Header Badge */}
            <div className="absolute top-6 left-6 z-10 bg-slate-900/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono font-medium tracking-wide">
                Sangjani Complex • Active 24/7 Operations
              </span>
            </div>

            {/* The 3 Pulsing Hotspots */}
            {plantHotspots.map((hotspot) => (
              <div
                key={hotspot.id}
                style={{ left: hotspot.x, top: hotspot.y }}
                className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
                onMouseEnter={() => setActiveHotspot(hotspot)}
                onMouseLeave={() => setActiveHotspot(null)}
              >
                {/* Pulsing ring animation */}
                <div className="relative cursor-pointer">
                  <span className="absolute -inset-3 rounded-full bg-white/40 animate-ping" />
                  <span className="absolute -inset-1.5 rounded-full bg-[#F4D5AB]/60 animate-pulse" />
                  <button
                    type="button"
                    aria-label={`Inspect ${hotspot.title}`}
                    className="relative w-6 h-6 rounded-full bg-white shadow-xl flex items-center justify-center text-[#000080] border-2 border-[#000080] transition-transform duration-200 hover:scale-125"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#000080]" />
                  </button>

                  {/* Dark Floating Tooltip on Hover */}
                  <AnimatePresence>
                    {activeHotspot?.id === hotspot.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-72 sm:w-80 glass-smoked p-5 rounded-2xl shadow-2xl border border-white/20 text-white z-50 pointer-events-none"
                      >
                        <div className="flex items-center justify-between text-[10px] font-mono uppercase text-[#F4D5AB] tracking-wider mb-1">
                          <span>{hotspot.category}</span>
                          <span className="text-emerald-400 font-bold">Online</span>
                        </div>
                        <h4 className="text-base font-bold text-white mb-2">
                          {hotspot.title}
                        </h4>
                        <p className="text-xs text-blue-100/80 leading-relaxed mb-3">
                          {hotspot.description}
                        </p>
                        <div className="pt-2 border-t border-white/10 text-[11px] font-mono text-slate-300">
                          {hotspot.spec}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Plant Stats Banner */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm text-center">
              <div className="text-2xl sm:text-3xl font-black text-[#000080]">7,500 TPD</div>
              <div className="text-xs text-slate-500 font-medium uppercase tracking-wider mt-1">Clinker Output</div>
            </div>
            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm text-center">
              <div className="text-2xl sm:text-3xl font-black text-[#000080]">1450°C</div>
              <div className="text-xs text-slate-500 font-medium uppercase tracking-wider mt-1">Kiln Firing Core</div>
            </div>
            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm text-center">
              <div className="text-2xl sm:text-3xl font-black text-[#000080]">99.9%</div>
              <div className="text-xs text-slate-500 font-medium uppercase tracking-wider mt-1">Dust Filtration Efficiency</div>
            </div>
            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm text-center">
              <div className="text-2xl sm:text-3xl font-black text-[#000080]">24/7/365</div>
              <div className="text-xs text-slate-500 font-medium uppercase tracking-wider mt-1">Continuous Operation</div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SECTION 3: TECHNICAL SPECS ARRAY */}
      <section className="py-24 bg-[#F1F5F9]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#8B5E1A]">
              ENGINEERING ARCHITECTURE
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#000080] mt-3">
              Technical Specifications Array
            </h2>
            <p className="text-slate-600 mt-4 text-base sm:text-lg">
              Calibrated industrial instrumentation conforming to international process engineering benchmarks.
            </p>
          </div>

          {/* Clean Technical Spec Sheet Table/Grid */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
            <div className="divide-y divide-slate-100">
              {technicalSpecs.map((spec, idx) => {
                const IconComponent = spec.icon;
                return (
                  <div
                    key={spec.title}
                    className="p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 hover:bg-slate-50/80 transition-colors"
                  >
                    <div className="flex items-start gap-5 max-w-3xl">
                      <div className="w-12 h-12 rounded-2xl bg-[#000080]/5 text-[#000080] flex items-center justify-center flex-shrink-0 mt-1">
                        <IconComponent className="w-6 h-6 text-[#8B5E1A]" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-mono font-semibold uppercase text-slate-400">
                            Spec #0{idx + 1} • {spec.category}
                          </span>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold text-[#000080]">
                          {spec.title}
                        </h3>
                        <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-2">
                          {spec.details}
                        </p>
                      </div>
                    </div>

                    <div className="flex-shrink-0 flex lg:flex-col items-center lg:items-end justify-between gap-2 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                      <span className="text-xs font-mono font-medium text-slate-500">
                        {spec.standard}
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        {spec.status}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
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

