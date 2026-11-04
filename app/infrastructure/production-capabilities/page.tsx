'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Factory, 
  Layers, 
  Flame, 
  Cpu, 
  Truck, 
  Package, 
  Clock, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  TrendingUp
} from 'lucide-react';
import FectoNavbar from '@/components/FectoNavbar';
import CorporateFooter from '@/components/CorporateFooter';
import QuoteModal from '@/components/QuoteModal';
import InnerPageHero from '@/components/InnerPageHero';

const manufacturingSteps = [
  {
    step: '01',
    title: 'Limestone Quarrying',
    subtitle: 'Margalla Geological Corridor',
    description: 'High-purity calcium carbonate extracted from proven Margalla Hills formations using heavy hydraulic drilling and primary impact crushing down to <75mm sizing.',
    temp: 'Ambient',
    icon: Layers,
  },
  {
    step: '02',
    title: 'Raw Milling & Blending',
    subtitle: 'Automated XRF Homogenization',
    description: 'High-efficiency vertical roller mills pulverize raw materials into kiln meal. Online automated XRF spectrometers sample meal chemistry every 15 minutes.',
    temp: 'Blaine 3800',
    icon: Cpu,
  },
  {
    step: '03',
    title: 'Clinkerization (1450°C)',
    subtitle: 'European Rotary Kiln Firing',
    description: 'Suspension preheaters and calciner towers flash-heat raw meal before entering the rotary kiln. Minerals fuse at 1450°C into high-reactivity alite (C3S) clinker nodules.',
    temp: '1450°C',
    icon: Flame,
  },
  {
    step: '04',
    title: 'Finish Grinding & Packaging',
    subtitle: 'Grade 53 Structural Output',
    description: 'Clinker is interground with precise gypsum ratios in closed-circuit roller press systems, producing EN 197-1 CEM I 42.5R and OPC Grade 53 cement stored in fluid-aerated silos.',
    temp: 'Grade 53',
    icon: Factory,
  },
];

export default function ProductionCapabilitiesPage() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F1F5F9] text-slate-900 selection:bg-[#F4D5AB] selection:text-[#000080]">
      {/* 1. FLOATING NAVBAR */}
      <FectoNavbar onCtaClick={() => setQuoteModalOpen(true)} />

      {/* 2. SECTION 1: THE PREMIUM EDITORIAL HERO */}
      <InnerPageHero
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Infrastructure' },
          { label: 'Production Capabilities' },
        ]}
        title="Unmatched Scale. Uncompromising Quality."
        subtitle="A 24/7 continuous manufacturing loop designed to meet the demands of mega-infrastructure."
        textureImageUrl="/images/dealers-warehouse.jpg"
      />

      {/* 3. SECTION 2: THE MANUFACTURING FLOWCHART */}
      <section className="py-24 bg-[#F1F5F9] border-b border-slate-200 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#8B5E1A]">
              PRECISION CLINKER CHEMISTRY
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#000080] mt-3">
              The Manufacturing Flowchart
            </h2>
            <p className="text-slate-600 mt-4 text-base sm:text-lg">
              Trace the continuous thermodynamic journey from Margalla raw stone to certified structural cement.
            </p>
          </div>

          {/* Flowchart Grid with Connecting Dashed SVG Line */}
          <div className="relative">
            {/* Desktop Connecting Dashed SVG Line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 -translate-y-8 h-1 z-0 pointer-events-none">
              <svg className="w-full h-4" preserveAspectRatio="none">
                <line
                  x1="10%"
                  y1="50%"
                  x2="90%"
                  y2="50%"
                  stroke="#CBD5E1"
                  strokeWidth="3"
                  strokeDasharray="8 8"
                />
              </svg>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
              {manufacturingSteps.map((step, idx) => {
                const IconComponent = step.icon;
                return (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.15 }}
                    className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-xl flex flex-col justify-between group hover:-translate-y-2 transition-transform duration-300 relative overflow-hidden"
                  >
                    {/* Step Indicator Header */}
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <span className="w-10 h-10 rounded-2xl bg-[#000080]/10 text-[#000080] font-mono font-bold text-sm flex items-center justify-center">
                          {step.step}
                        </span>
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold uppercase bg-slate-100 text-[#8B5E1A]">
                          {step.temp}
                        </span>
                      </div>

                      <div className="w-12 h-12 rounded-2xl bg-[#000080]/5 text-[#000080] flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
                        <IconComponent className="w-6 h-6 text-[#000080]" />
                      </div>

                      <h3 className="text-xl font-bold text-[#000080] mb-1">
                        {step.title}
                      </h3>
                      <div className="text-xs font-semibold text-[#8B5E1A] mb-3">
                        {step.subtitle}
                      </div>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs text-emerald-700 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Closed Loop Controlled</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 4. SECTION 3: DISPATCH & LOGISTICS FLEET */}
      <section className="py-24 bg-[#F1F5F9]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* LEFT COLUMN: Bold Statistic & Overview */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#8B5E1A] mb-2">
                NATIONWIDE DISTRIBUTION REACH
              </span>
              <div className="text-5xl sm:text-6xl md:text-7xl font-black text-[#000080] tracking-tight font-mono mb-4">
                3,000+
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
                Metric Tons Dispatched Daily.
              </h3>
              <p className="text-slate-600 text-base leading-relaxed mb-6">
                Our strategic Sangjani location provides immediate access to Grand Trunk Road (N-5) and the Motorway (M-1/M-2) network, supported by dedicated on-site railway sidings. We ensure non-stop logistics fulfillment from mega-pour dams to local distributors.
              </p>

              <div className="p-4 rounded-2xl bg-[#000080]/5 border border-[#000080]/10 flex items-center gap-3">
                <Clock className="w-5 h-5 text-[#8B5E1A] flex-shrink-0" />
                <span className="text-xs sm:text-sm font-medium text-[#000080]">
                  Automated computerized weighbridges guarantee rapid truck turnaround in under 22 minutes.
                </span>
              </div>
            </div>

            {/* RIGHT COLUMN: Two Clean Delivery Method UI Cards */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Card 1: Bulk Pneumatic Tankers */}
              <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 group hover:-translate-y-1 transition-transform">
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-[#000080]/5 text-[#000080] flex items-center justify-center flex-shrink-0">
                    <Truck className="w-7 h-7 text-[#000080]" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#8B5E1A]">
                      Infrastructure Scale
                    </span>
                    <h4 className="text-xl font-bold text-[#000080] mt-0.5 mb-1.5">
                      Bulk Pneumatic Tankers
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-lg">
                      Dedicated 40-metric-ton pressurized air-discharge road tankers for hydro-electric projects, highway batching plants, and commercial precast yards.
                    </p>
                  </div>
                </div>

                <div className="flex-shrink-0 sm:text-right">
                  <div className="text-sm font-mono font-bold text-[#000080]">40-Ton Payload</div>
                  <div className="text-xs text-slate-400">Zero Contamination</div>
                </div>
              </div>

              {/* Card 2: 50kg Standard Bag Fleet */}
              <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 group hover:-translate-y-1 transition-transform">
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-[#000080]/5 text-[#000080] flex items-center justify-center flex-shrink-0">
                    <Package className="w-7 h-7 text-[#8B5E1A]" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#8B5E1A]">
                      Retail & Dealership Network
                    </span>
                    <h4 className="text-xl font-bold text-[#000080] mt-0.5 mb-1.5">
                      50kg Standard Bag Fleet
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-lg">
                      Multi-ply micro-perforated moisture-resistant kraft paper bags packed at 3,200 bags/hr, distributed to 400+ dealerships across Pakistan.
                    </p>
                  </div>
                </div>

                <div className="flex-shrink-0 sm:text-right">
                  <div className="text-sm font-mono font-bold text-[#000080]">±0.1kg Precision</div>
                  <div className="text-xs text-slate-400">400+ Authorized Outlets</div>
                </div>
              </div>

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

