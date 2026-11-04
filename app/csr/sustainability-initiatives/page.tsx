'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Leaf, 
  Droplets, 
  Zap, 
  Recycle, 
  Package, 
  Truck, 
  Sun, 
  Activity, 
  CheckCircle2, 
  ArrowRight,
  TrendingDown,
  ShieldCheck
} from 'lucide-react';
import FectoNavbar from '@/components/FectoNavbar';
import CorporateFooter from '@/components/CorporateFooter';
import QuoteModal from '@/components/QuoteModal';
import InnerPageHero from '@/components/InnerPageHero';

export default function SustainabilityInitiativesPage() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F1F5F9] text-slate-900 selection:bg-[#F4D5AB] selection:text-[#000080]">
      {/* 1. FLOATING NAVBAR */}
      <FectoNavbar onCtaClick={() => setQuoteModalOpen(true)} />

      {/* 2. SECTION 1: THE PREMIUM EDITORIAL HERO */}
      <InnerPageHero
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'CSR' },
          { label: 'Sustainability Initiatives' },
        ]}
        title="Building a Greener Tomorrow."
        subtitle="Integrating sustainable practices into every stage of cement manufacturing."
        textureImageUrl="/images/sustainability-energy.jpg"
      />

      {/* 3. SECTION 2: THE ESG DASHBOARD */}
      <section className="py-24 bg-[#F1F5F9] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#8B5E1A]">
              VERIFIED ENVIRONMENTAL METRICS
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#000080] mt-3">
              The Live ESG Dashboard
            </h2>
            <p className="text-slate-600 mt-4 text-base sm:text-lg">
              Continuous monitoring of our water conservation, waste-heat capture, and industrial circularity.
            </p>
          </div>

          {/* Dashboard Container */}
          <div className="p-8 sm:p-12 rounded-3xl bg-slate-900 text-white shadow-2xl border border-slate-800 relative overflow-hidden">
            {/* Ambient subtle grid */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10B981_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

            {/* Dashboard Header Bar */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-slate-800 text-xs font-mono">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-emerald-400 uppercase tracking-wider font-bold">
                  Telemetry Stream: Sangjani Plant Complex
                </span>
              </div>
              <div className="text-slate-400">
                Audited to Global Reporting Initiative (GRI) Standards
              </div>
            </div>

            {/* 3 Massive Animated Metric Counters */}
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Counter 1: Water Recycled */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs uppercase tracking-wider text-blue-200 font-mono font-semibold">
                      Closed-Loop Hydration
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                      <Droplets className="w-5 h-5 text-blue-400" />
                    </div>
                  </div>
                  <div className="text-4xl sm:text-5xl font-black text-white font-mono tracking-tight">
                    48.5<span className="text-xl sm:text-2xl text-blue-400 font-sans ml-1">M</span>
                  </div>
                  <div className="text-sm font-bold text-slate-200 mt-2">
                    Liters of Water Recycled
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-white/10 text-xs text-slate-400 font-mono flex items-center justify-between">
                  <span>Zero Wastewater Runoff</span>
                  <span className="text-emerald-400">+18% YoY</span>
                </div>
              </motion.div>

              {/* Counter 2: Energy Saved */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs uppercase tracking-wider text-emerald-300 font-mono font-semibold">
                      Waste Heat Recovery (WHR)
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                      <Zap className="w-5 h-5 text-emerald-400" />
                    </div>
                  </div>
                  <div className="text-4xl sm:text-5xl font-black text-white font-mono tracking-tight">
                    142,000<span className="text-xl sm:text-2xl text-emerald-400 font-sans ml-1">MWh</span>
                  </div>
                  <div className="text-sm font-bold text-slate-200 mt-2">
                    Thermal Energy Conserved
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-white/10 text-xs text-slate-400 font-mono flex items-center justify-between">
                  <span>Preheater Flue Capture</span>
                  <span className="text-emerald-400">+24% YoY</span>
                </div>
              </motion.div>

              {/* Counter 3: Waste Repurposed */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs uppercase tracking-wider text-[#F4D5AB] font-mono font-semibold">
                      Circular Biomass & RDF
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-[#F4D5AB] flex items-center justify-center">
                      <Recycle className="w-5 h-5 text-[#F4D5AB]" />
                    </div>
                  </div>
                  <div className="text-4xl sm:text-5xl font-black text-white font-mono tracking-tight">
                    96,400<span className="text-xl sm:text-2xl text-[#F4D5AB] font-sans ml-1">Tons</span>
                  </div>
                  <div className="text-sm font-bold text-slate-200 mt-2">
                    Agricultural Waste Repurposed
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-white/10 text-xs text-slate-400 font-mono flex items-center justify-between">
                  <span>Fossil Fuel Offset</span>
                  <span className="text-emerald-400">+31% YoY</span>
                </div>
              </motion.div>

            </div>
          </div>
        </div>
      </section>

      {/* 4. SECTION 3: THE 3 PILLARS OF SUSTAINABILITY */}
      <section className="py-24 bg-[#F1F5F9]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#8B5E1A]">
              OPERATIONAL EXECUTION
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#000080] mt-3">
              The 3 Pillars of Sustainability
            </h2>
            <p className="text-slate-600 mt-4 text-base sm:text-lg">
              Strategic transformations embedded across raw material logistics, customer packaging, and power generation.
            </p>
          </div>

          {/* 3-Column Grid of Tall Cards with Floating Icon Turning Champagne Sand */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Pillar 1: Green Supply Chain */}
            <div className="group rounded-3xl p-8 sm:p-10 bg-white border border-slate-200/80 shadow-xl flex flex-col justify-between hover:-translate-y-2 transition-all duration-300">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#000080]/5 text-[#000080] flex items-center justify-center mb-6 transition-all duration-300 group-hover:-translate-y-2 group-hover:bg-[#000080] group-hover:text-[#F4D5AB] shadow-sm">
                  <Truck className="w-7 h-7" />
                </div>
                <span className="text-xs font-mono font-semibold uppercase text-[#8B5E1A] tracking-wider">
                  Pillar 01
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#000080] mt-1 mb-3">
                  Green Supply Chain
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  Extracting limestone strictly from adjacent Margalla reserves drastically cuts raw material transit emissions. Conveyor belt electrification has eliminated over 120 diesel haulage truck trips daily.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 text-xs text-emerald-800 font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Zero Long-Haul Quarry Haulage</span>
              </div>
            </div>

            {/* Pillar 2: Eco-Friendly Packaging */}
            <div className="group rounded-3xl p-8 sm:p-10 bg-white border border-slate-200/80 shadow-xl flex flex-col justify-between hover:-translate-y-2 transition-all duration-300">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#000080]/5 text-[#000080] flex items-center justify-center mb-6 transition-all duration-300 group-hover:-translate-y-2 group-hover:bg-[#000080] group-hover:text-[#F4D5AB] shadow-sm">
                  <Package className="w-7 h-7" />
                </div>
                <span className="text-xs font-mono font-semibold uppercase text-[#8B5E1A] tracking-wider">
                  Pillar 02
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#000080] mt-1 mb-3">
                  Eco-Friendly Packaging
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  Transitioned to 100% biodegradable, unbleached multi-ply virgin kraft paper sacks. We use non-toxic water-based inks and recyclable stretch hood films, keeping plastic polymers out of the environment.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 text-xs text-emerald-800 font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>100% Recyclable Paper Sacks</span>
              </div>
            </div>

            {/* Pillar 3: Renewable Energy Integration */}
            <div className="group rounded-3xl p-8 sm:p-10 bg-white border border-slate-200/80 shadow-xl flex flex-col justify-between hover:-translate-y-2 transition-all duration-300">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#000080]/5 text-[#000080] flex items-center justify-center mb-6 transition-all duration-300 group-hover:-translate-y-2 group-hover:bg-[#000080] group-hover:text-[#F4D5AB] shadow-sm">
                  <Sun className="w-7 h-7" />
                </div>
                <span className="text-xs font-mono font-semibold uppercase text-[#8B5E1A] tracking-wider">
                  Pillar 03
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#000080] mt-1 mb-3">
                  Renewable Energy Integration
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  Capturing 350°C preheater exhaust through Rankine cycle waste-heat boilers supplies captive clean electrical power, paired with a newly commissioned on-site 15 MW solar park installation.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 text-xs text-emerald-800 font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>15 MW Solar + WHR Power</span>
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

