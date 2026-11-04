'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import { 
  Target, 
  Compass, 
  ChevronRight, 
  Award, 
  Leaf, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  Zap,
  Globe2
} from 'lucide-react';
import FectoNavbar from '@/components/FectoNavbar';
import CorporateFooter from '@/components/CorporateFooter';
import QuoteModal from '@/components/QuoteModal';
import InnerPageHero from '@/components/InnerPageHero';

// Framer motion animation variants for staggered typography
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function VisionMissionPage() {
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
          { label: 'Vision & Mission' },
        ]}
        title="Driven by purpose. Built for the future."
        subtitle="The foundational aspirations, strategic imperatives, and bedrock ethical standards that direct every cubic meter of cement we manufacture."
        textureImageUrl="/herobg.jpg"
      />

      {/* 3. SECTION 2: THE WATERMARKED OVERLAP CARDS */}
      <section className="py-24 md:py-32 bg-[#F1F5F9] relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          
          <div className="relative">
            
            {/* VISION CARD (Top/Base Layer: bg-white, massive padding p-16) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative z-10 bg-white rounded-3xl p-8 sm:p-12 md:p-16 shadow-xl border border-slate-200/80 max-w-4xl overflow-hidden"
            >
              {/* Giant Translucent Letter "V" in Background */}
              <div 
                className="absolute right-4 sm:right-10 -bottom-10 text-slate-100 text-[180px] sm:text-[240px] md:text-[280px] font-black -z-10 select-none pointer-events-none leading-none tracking-tighter"
                aria-hidden="true"
              >
                V
              </div>

              {/* Eyebrow */}
              <div className="flex items-center gap-2 mb-4">
                <span className="w-8 h-8 rounded-full bg-[#000080]/10 text-[#000080] flex items-center justify-center">
                  <Compass className="w-4 h-4 text-[#8B5E1A]" />
                </span>
                <span className="text-xs font-bold uppercase tracking-widest text-[#8B5E1A]">
                  OUR CORPORATE VISION
                </span>
              </div>

              {/* Main Headline */}
              <h2 className="text-[#000080] text-2xl sm:text-3xl md:text-4xl font-bold leading-tight mb-6">
                To be the undisputed leader in sustainable building materials across South Asia.
              </h2>

              <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl mb-8">
                We envision a modern South Asia where heavy civil infrastructure and ecological harmony coalesce. By pioneering low-clinker formulations, harnessing circular industrial heat recovery, and adhering to the world’s most stringent decarbonization standards, Fecto Cement is redefining industrial leadership for the next century.
              </p>

              {/* 3 Strategic Pillars of the Vision */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-100">
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#000080] mb-1">01. Decarbonization</div>
                  <div className="text-xs text-slate-500">Pioneering Net-Zero cement chemistries & RDF kiln fuel.</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#000080] mb-1">02. Engineering Apex</div>
                  <div className="text-xs text-slate-500">Grade 53 early compressive strength calibrated for mega-builds.</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#000080] mb-1">03. Regional Reach</div>
                  <div className="text-xs text-slate-500">Export-grade supply across northern corridors and beyond.</div>
                </div>
              </div>
            </motion.div>

            {/* MISSION CARD (Overlaps the bottom-right of Vision card: bg-[#000080] text-white, p-16) */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="relative z-20 -mt-16 sm:-mt-20 md:-mt-24 ml-auto max-w-4xl bg-[#000080] text-white rounded-3xl p-8 sm:p-12 md:p-16 shadow-2xl overflow-hidden border border-white/10"
            >
              {/* Giant Translucent Letter "M" in Background */}
              <div 
                className="absolute right-4 sm:right-10 -bottom-10 text-white/5 text-[180px] sm:text-[240px] md:text-[280px] font-black -z-10 select-none pointer-events-none leading-none tracking-tighter"
                aria-hidden="true"
              >
                M
              </div>

              {/* Eyebrow */}
              <div className="flex items-center gap-2 mb-4">
                <span className="w-8 h-8 rounded-full bg-white/10 text-[#F4D5AB] flex items-center justify-center">
                  <Target className="w-4 h-4 text-[#F4D5AB]" />
                </span>
                <span className="text-xs font-bold uppercase tracking-widest text-[#F4D5AB]">
                  OUR OPERATIONAL MISSION
                </span>
              </div>

              {/* Main Headline */}
              <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold leading-tight mb-6">
                To engineer high-performance cement while empowering communities and driving national growth.
              </h2>

              <p className="text-blue-100/80 text-base sm:text-lg leading-relaxed max-w-2xl mb-8">
                Our mission is executed daily at the Sangjani kiln and across our nationwide distribution network. We deliver uncompromised structural material to contractors and homebuilders, foster equitable safety and welfare for thousands of industrial workers, and create sustained shareholder value through transparent corporate governance.
              </p>

              {/* 3 Mission Commitments */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-white/10">
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#F4D5AB] mb-1">Infrastructure Focus</div>
                  <div className="text-xs text-blue-200/70">Reliable bulk supply for dams, motorways & high-rises.</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#F4D5AB] mb-1">Zero-Harm Safety</div>
                  <div className="text-xs text-blue-200/70">World-class occupational protocols for all plant personnel.</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#F4D5AB] mb-1">Ethical Trust</div>
                  <div className="text-xs text-blue-200/70">PSX-listed integrity with full regulatory compliance.</div>
                </div>
              </div>
            </motion.div>

          </div>

        </div>
      </section>

      {/* 4. SECTION 3: THE ASYMMETRICAL BENTO CORE VALUES */}
      <section className="pb-32 pt-8 bg-[#F1F5F9]">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#8B5E1A]">
              THE FOUNDATIONAL VALUES
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#000080] mt-3">
              The principles that anchor every batch.
            </h2>
            <p className="text-slate-600 mt-4 text-base sm:text-lg">
              Beyond engineering formulas and financial metrics, these three inviolable values govern our enterprise conduct.
            </p>
          </div>

          {/* Asymmetrical Bento Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            
            {/* VALUE 1 (Large, Spans 2 Columns on Desktop): Unyielding Quality */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-2 relative overflow-hidden rounded-3xl p-8 sm:p-12 bg-slate-900 text-white min-h-[360px] flex flex-col justify-between group cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl border border-slate-800"
            >
              {/* Background Visual of Lab Test with Gradient Overlay */}
              <div className="absolute inset-0 w-full h-full pointer-events-none">
                <Image
                  src="/images/contractors-infra.jpg"
                  alt="Quality Laboratory Cement Strength Testing"
                  fill
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="object-cover object-center opacity-30 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />
              </div>

              {/* Top Row: Icon + Value Tag */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/10 text-[#F4D5AB] border border-white/15">
                  Core Pillar 01
                </span>
                {/* Icon scales 120% on hover */}
                <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-[#F4D5AB] border border-white/20 transition-transform duration-300 group-hover:scale-125">
                  <Award className="w-7 h-7 text-[#F4D5AB]" />
                </div>
              </div>

              {/* Bottom Content */}
              <div className="relative z-10 mt-12">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 text-white">
                  Unyielding Quality
                </h3>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
                  Every metric ton produced at Sangjani is continuously sampled and verified through automated online X-Ray Fluorescence (XRF) spectrometry and 28-day hydraulic compression crushing tests. We do not tolerate tolerance drift; our Grade 53 Portland cement consistently outperforms national and international specifications.
                </p>
                
                <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-white/10">
                  <span className="px-3 py-1 rounded-lg bg-white/5 text-xs text-blue-200">PSQCA PS-232</span>
                  <span className="px-3 py-1 rounded-lg bg-white/5 text-xs text-blue-200">EN 197-1 CEM I 42.5R</span>
                  <span className="px-3 py-1 rounded-lg bg-white/5 text-xs text-blue-200">ASTM C-150 Type I & V</span>
                </div>
              </div>
            </motion.div>

            {/* VALUE 2 (Standard, Spans 1 Column): Environmental Stewardship */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-1 rounded-3xl p-8 sm:p-10 bg-white border border-slate-200/80 shadow-xl flex flex-col justify-between group cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#000080]/5 text-[#000080]">
                  Core Pillar 02
                </span>
                {/* Icon scales 120% on hover */}
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-[#8B5E1A] transition-transform duration-300 group-hover:scale-125 border border-emerald-100">
                  <Leaf className="w-6 h-6 text-emerald-700" />
                </div>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#000080] mb-3">
                  Environmental Stewardship
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  Industrial manufacturing requires moral accountability to our earth. We are actively converting our rotary kilns to run on Refuse-Derived Fuel (RDF) and agricultural biomass, while state-of-the-art baghouse filter arrays keep particulate matter well below EPA thresholds.
                </p>

                <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 text-xs text-emerald-900 font-medium flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Target: -30% carbon emissions by 2030</span>
                </div>
              </div>
            </motion.div>

            {/* VALUE 3 (Standard, Spans 1 Column on Row 2): Absolute Integrity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-1 rounded-3xl p-8 sm:p-10 bg-white border border-slate-200/80 shadow-xl flex flex-col justify-between group cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#000080]/5 text-[#000080]">
                  Core Pillar 03
                </span>
                {/* Icon scales 120% on hover */}
                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-[#000080] transition-transform duration-300 group-hover:scale-125 border border-blue-100">
                  <ShieldCheck className="w-6 h-6 text-[#000080]" />
                </div>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#000080] mb-3">
                  Absolute Integrity
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  Since our 1995 listing on the PSX, we have maintained impeccable standards of corporate disclosure, timely shareholder dividend distributions, and ethical procurement. We treat suppliers, dealership networks, and civic authorities with steadfast transparency.
                </p>

                <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100 text-xs text-[#000080] font-medium flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#000080] flex-shrink-0" />
                  <span>PSX Compliant • SECP Governance Gold</span>
                </div>
              </div>
            </motion.div>

            {/* BENTO STAT CARD (Spans 2 Columns on Row 2): National Infrastructure Benchmark */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="lg:col-span-2 rounded-3xl p-8 sm:p-10 bg-gradient-to-r from-[#000080] to-[#0a1172] text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-8 border border-white/10 group cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-widest text-[#F4D5AB]">
                  TRUSTED ACROSS GENERATIONS
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold leading-tight">
                  Over 45,000,000 metric tons supplied to Pakistan's landmark builds.
                </h3>
                <p className="text-sm text-blue-200/80 max-w-lg">
                  From the Tarbela Dam Extension to the M-2 Motorway and Islamabad International Airport, our core values make our concrete the nation's choice.
                </p>
              </div>

              <div className="flex-shrink-0 flex flex-col items-center sm:items-end">
                <div className="text-4xl sm:text-5xl font-black text-[#F4D5AB]">
                  100%
                </div>
                <div className="text-xs uppercase tracking-wider text-white/70 mt-1">
                  Tested Compliance
                </div>
                <button
                  type="button"
                  onClick={() => setQuoteModalOpen(true)}
                  className="mt-4 px-6 py-2.5 rounded-full text-xs font-bold bg-[#F4D5AB] text-[#000080] hover:bg-white transition-colors duration-200 shadow-md flex items-center gap-1.5"
                >
                  <span>Request Tech Specs</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>

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
