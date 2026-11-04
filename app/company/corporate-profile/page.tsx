'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Building2, 
  FileText, 
  Leaf, 
  DownloadCloud, 
  TrendingUp, 
  ShieldCheck, 
  Award, 
  Layers, 
  CheckCircle2, 
  ArrowRight,
  Download
} from 'lucide-react';
import FectoNavbar from '@/components/FectoNavbar';
import CorporateFooter from '@/components/CorporateFooter';
import QuoteModal from '@/components/QuoteModal';
import InnerPageHero from '@/components/InnerPageHero';

export default function CorporateProfilePage() {
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
          { label: 'Corporate Profile' },
        ]}
        title="The Complete Fecto Compendium."
        subtitle="Financial stability, institutional scale, and downloadable corporate assets."
        textureImageUrl="/images/company-hq.jpg"
      />

      {/* 3. SECTION 2: THE FACT-SHEET BENTO */}
      <section className="py-24 bg-[#F1F5F9]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#8B5E1A]">
              AT A GLANCE
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#000080] mt-3">
              Institutional Strength & Scale
            </h2>
            <p className="text-slate-600 mt-4 text-base sm:text-lg">
              Key operational metrics, equity listing data, and certified accreditations.
            </p>
          </div>

          {/* Asymmetrical Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
            
            {/* CARD 1 (Large - Spans 6 Columns): PSX Listed */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-6 relative overflow-hidden rounded-3xl p-8 sm:p-10 bg-slate-900 text-white shadow-xl border border-slate-800 flex flex-col justify-between group"
            >
              {/* Background Chart SVG Line Graphic */}
              <div className="absolute inset-0 pointer-events-none opacity-20">
                <svg className="w-full h-full" viewBox="0 0 500 250" preserveAspectRatio="none">
                  <path
                    d="M 0 200 Q 120 180 200 120 T 350 90 T 500 30 L 500 250 L 0 250 Z"
                    fill="url(#greenGrad)"
                  />
                  <path
                    d="M 0 200 Q 120 180 200 120 T 350 90 T 500 30"
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="4"
                  />
                  <defs>
                    <linearGradient id="greenGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10B981" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Ticker UI Top Bar */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-xs font-mono font-semibold tracking-wider uppercase text-emerald-400">
                    Live PSX Ticker
                  </span>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-mono bg-white/10 text-slate-300">
                  Sector: Cement
                </span>
              </div>

              {/* Center Ticker Numbers */}
              <div className="relative z-10 my-8">
                <div className="text-sm uppercase tracking-widest text-[#F4D5AB] font-semibold">
                  PSX: FECTO
                </div>
                <div className="flex items-baseline gap-4 mt-2">
                  <span className="text-4xl sm:text-5xl font-black text-white font-mono">
                    PKR 48.75
                  </span>
                  <span className="inline-flex items-center gap-1 text-emerald-400 font-mono font-bold text-sm bg-emerald-950/60 px-2.5 py-1 rounded-md border border-emerald-800/60">
                    <TrendingUp className="w-4 h-4" />
                    +3.40%
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-2 font-mono">
                  Volume: 1,428,500 Shares • 52-Wk Range: PKR 38.20 – 54.90
                </p>
              </div>

              {/* Card Footer */}
              <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
                <span>Publicly Listed Since 1995</span>
                <span className="text-[#F4D5AB] font-semibold flex items-center gap-1">
                  SECP Compliant <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                </span>
              </div>
            </motion.div>

            {/* CARD 2 (Spans 6 Columns): 2.8M+ Metric Tons Annual Capacity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-6 rounded-3xl p-8 sm:p-10 bg-white border border-slate-200/80 shadow-xl flex flex-col justify-between group hover:-translate-y-1 transition-transform"
            >
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#000080]/5 text-[#000080]">
                  Industrial Scale
                </span>
                <div className="w-12 h-12 rounded-2xl bg-[#000080]/5 flex items-center justify-center text-[#000080]">
                  <Layers className="w-6 h-6 text-[#8B5E1A]" />
                </div>
              </div>

              <div className="my-6">
                <div className="text-5xl sm:text-6xl font-black text-[#000080] tracking-tight">
                  2.8M+
                </div>
                <div className="text-base sm:text-lg font-bold text-slate-800 mt-2">
                  Metric Tons Annual Capacity
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mt-2">
                  High-efficiency vertical roller press grinding lines and automated distributed control systems (DCS) at Sangjani deliver dependable bulk volume 24/7.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-slate-500">
                <span>Sangjani Plant complex</span>
                <span className="text-[#000080] font-bold">100% Operational Readiness</span>
              </div>
            </motion.div>

            {/* CARD 3 (Spans 6 Columns): ISO & PSQCA Certified */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-6 rounded-3xl p-8 sm:p-10 bg-white border border-slate-200/80 shadow-xl flex flex-col justify-between group hover:-translate-y-1 transition-transform"
            >
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#000080]/5 text-[#000080]">
                  Accreditation
                </span>
                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-[#000080]">
                  <ShieldCheck className="w-6 h-6 text-[#000080]" />
                </div>
              </div>

              <div className="my-6">
                <div className="text-2xl sm:text-3xl font-black text-[#000080] tracking-tight">
                  ISO 9001:2015 & PSQCA
                </div>
                <div className="text-sm font-semibold text-[#8B5E1A] mt-1">
                  Global Chemical & Physical Standards
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mt-2">
                  Certified to Pakistan Standards PS-232, European EN 197-1 CEM I 42.5R, and American ASTM C-150 Type I and Type V for structural safety.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-slate-500">
                <span>Third-Party Audited</span>
                <span className="text-emerald-700 font-bold">Active Accreditation</span>
              </div>
            </motion.div>

            {/* CARD 4 (Spans 6 Columns): 40+ Years of Manufacturing Excellence */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="lg:col-span-6 rounded-3xl p-8 sm:p-10 bg-gradient-to-br from-[#000080] to-[#040814] text-white shadow-xl flex flex-col justify-between group hover:-translate-y-1 transition-transform border border-white/10"
            >
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/10 text-[#F4D5AB]">
                  Heritage
                </span>
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-[#F4D5AB]">
                  <Award className="w-6 h-6 text-[#F4D5AB]" />
                </div>
              </div>

              <div className="my-6">
                <div className="text-5xl sm:text-6xl font-black text-[#F4D5AB] tracking-tight font-mono">
                  40+ Years
                </div>
                <div className="text-base sm:text-lg font-bold text-white mt-2">
                  Manufacturing Excellence
                </div>
                <p className="text-blue-100/80 text-sm leading-relaxed mt-2">
                  Since 1981, four continuous decades of partnering with government bodies, civil engineers, and international consortiums to construct Pakistan's landmarks.
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-blue-200">
                <span>Founded at Sangjani</span>
                <span className="text-[#F4D5AB] font-bold">Over 45M Tons Delivered</span>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 4. SECTION 3: THE DOWNLOAD CENTER */}
      <section className="py-24 bg-[#F1F5F9] border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#8B5E1A]">
              OFFICIAL ASSETS
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#000080] mt-3">
              Download Center
            </h2>
            <p className="text-slate-600 mt-4 text-base sm:text-lg">
              Access verified corporate reports, environmental documentation, and official media branding kits.
            </p>
          </div>

          {/* 3-Column Grid of Massive Glass-Arctic Buttons with Growing Bottom Border UX */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Download Card 1 */}
            <div className="group relative overflow-hidden rounded-3xl p-8 sm:p-10 glass-arctic flex flex-col justify-between shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl after:absolute after:bottom-0 after:left-0 after:h-1.5 after:w-0 after:bg-[#000080] after:transition-all after:duration-500 group-hover:after:w-full">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#000080]/10 flex items-center justify-center text-[#000080] mb-6 transition-transform duration-300 group-hover:scale-110">
                  <FileText className="w-7 h-7 text-[#000080]" />
                </div>
                <span className="text-xs font-mono font-semibold uppercase text-[#8B5E1A] tracking-wider">
                  Official Dossier • 14.8 MB
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#000080] mt-2 mb-3">
                  Corporate Profile 2026 (PDF)
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  Comprehensive company overview covering plant infrastructure, clinker specifications, financial ratios, and executive governance.
                </p>
              </div>

              <a
                href="#download"
                onClick={(e) => { e.preventDefault(); alert("Downloading Corporate Profile 2026 (PDF)..."); }}
                className="inline-flex items-center justify-between w-full px-5 py-3.5 rounded-2xl bg-[#000080] text-white text-sm font-semibold hover:bg-[#000080]/90 transition-colors shadow-md"
              >
                <span>Download PDF</span>
                <Download className="w-4 h-4 text-[#F4D5AB]" />
              </a>
            </div>

            {/* Download Card 2 */}
            <div className="group relative overflow-hidden rounded-3xl p-8 sm:p-10 glass-arctic flex flex-col justify-between shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl after:absolute after:bottom-0 after:left-0 after:h-1.5 after:w-0 after:bg-[#000080] after:transition-all after:duration-500 group-hover:after:w-full">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-800 mb-6 transition-transform duration-300 group-hover:scale-110">
                  <Leaf className="w-7 h-7 text-emerald-700" />
                </div>
                <span className="text-xs font-mono font-semibold uppercase text-emerald-700 tracking-wider">
                  ESG Audit • 8.2 MB
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#000080] mt-2 mb-3">
                  ESG & Sustainability Report (PDF)
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  Detailed environmental metrics, alternative fuel conversion timelines, carbon reduction audits, and community development investments.
                </p>
              </div>

              <a
                href="#download"
                onClick={(e) => { e.preventDefault(); alert("Downloading ESG & Sustainability Report (PDF)..."); }}
                className="inline-flex items-center justify-between w-full px-5 py-3.5 rounded-2xl bg-[#000080] text-white text-sm font-semibold hover:bg-[#000080]/90 transition-colors shadow-md"
              >
                <span>Download Report</span>
                <Download className="w-4 h-4 text-[#F4D5AB]" />
              </a>
            </div>

            {/* Download Card 3 */}
            <div className="group relative overflow-hidden rounded-3xl p-8 sm:p-10 glass-arctic flex flex-col justify-between shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl after:absolute after:bottom-0 after:left-0 after:h-1.5 after:w-0 after:bg-[#000080] after:transition-all after:duration-500 group-hover:after:w-full">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#000080]/10 flex items-center justify-center text-[#000080] mb-6 transition-transform duration-300 group-hover:scale-110">
                  <DownloadCloud className="w-7 h-7 text-[#000080]" />
                </div>
                <span className="text-xs font-mono font-semibold uppercase text-[#8B5E1A] tracking-wider">
                  Brand Guidelines • 45.0 MB
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#000080] mt-2 mb-3">
                  Media & Brand Kit (ZIP)
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  High-resolution vector logos (SVG/AI), official packaging lockups, plant photography, color palette tokens, and media press guidelines.
                </p>
              </div>

              <a
                href="#download"
                onClick={(e) => { e.preventDefault(); alert("Downloading Media & Brand Kit (ZIP)..."); }}
                className="inline-flex items-center justify-between w-full px-5 py-3.5 rounded-2xl bg-[#000080] text-white text-sm font-semibold hover:bg-[#000080]/90 transition-colors shadow-md"
              >
                <span>Download ZIP</span>
                <Download className="w-4 h-4 text-[#F4D5AB]" />
              </a>
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

