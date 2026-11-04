'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import FectoNavbar from '@/components/FectoNavbar';
import CorporateFooter from '@/components/CorporateFooter';
import QuoteModal from '@/components/QuoteModal';
import { InnerPageHero } from '@/components/InnerPageHero';
import { 
  Building2, 
  MapPin, 
  Layers, 
  CheckCircle2, 
  Download, 
  ArrowRight, 
  Calendar, 
  HardHat, 
  Scale, 
  ShieldCheck,
  Sparkles
} from 'lucide-react';

interface ProjectBento {
  id: string;
  title: string;
  location: string;
  category: string;
  image: string;
  span: string; // Tailwind col span
  gradeUsed: string;
  application: string;
  volume: string;
}

export default function CaseStudiesPage() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const handleDownloadReport = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      const element = document.createElement('a');
      const file = new Blob(['Fecto Cement Technical Engineering Case Study: Tarbela Dam Extension Project\nGrade: Low Heat Portland Cement (Type IV ASTM C150)\nThermal Heat Dissipation Analysis & Mass Concrete Pouring Specifications.'], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = 'Fecto_Tarbela_Dam_Technical_Case_Study.pdf';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }, 600);
  };

  const bentoProjects: ProjectBento[] = [
    {
      id: 'p-1',
      title: 'M-2 Motorway (Islamabad – Lahore)',
      location: 'National Highway Authority (NHA)',
      category: 'National Highway Infrastructure',
      image: '/images/company-plant.jpg',
      span: 'lg:col-span-8',
      gradeUsed: 'Ordinary Portland Cement (OPC Grade 53 / PS-232)',
      application: 'Rigid pavement base course, prestressed flyover bridge spans, and culvert retaining walls.',
      volume: '750,000+ Metric Tons',
    },
    {
      id: 'p-2',
      title: 'Karachi Financial Towers & High-Rises',
      location: 'I.I. Chundrigar Road, Karachi',
      category: 'Commercial Skylines',
      image: '/images/company-hq.jpg',
      span: 'lg:col-span-4',
      gradeUsed: 'High-Early Strength OPC 53 with Microsilica Blend',
      application: '50+ story core sheer walls, deep diaphragm pile foundations, and post-tensioned slabs.',
      volume: '220,000+ Metric Tons',
    },
    {
      id: 'p-3',
      title: 'Metro Rapid Transit Bus (BRT) Elevated Corridors',
      location: 'Twin Cities Mass Transit Authority',
      category: 'Urban Mass Transit',
      image: '/herobg.jpg',
      span: 'lg:col-span-4',
      gradeUsed: 'Rapid Hardening Portland (Type III)',
      application: 'Pre-cast elevated viaduct segments and pier caps engineered for rapid 14-day curing cycles.',
      volume: '180,000+ Metric Tons',
    },
    {
      id: 'p-4',
      title: 'Gwadar Port Deep-Sea Marine Jetty & Coastal Quays',
      location: 'Gwadar Port Authority, Balochistan',
      category: 'Maritime & Marine Engineering',
      image: '/images/company-plant.jpg',
      span: 'lg:col-span-8',
      gradeUsed: 'Sulphate Resistant Cement (SRC Type V / BS 4027)',
      application: 'Seawater submerged pilings and coastal wave-breaker armor blocks resisting severe chloride attacks.',
      volume: '340,000+ Metric Tons',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F1F5F9] text-slate-900 selection:bg-[#F4D5AB] selection:text-[#000080]">
      {/* 1. FLOATING NAVBAR */}
      <FectoNavbar onCtaClick={() => setQuoteModalOpen(true)} />

      {/* SECTION 1: THE UNIVERSAL HERO */}
      <InnerPageHero
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Media Center', href: '#media' },
          { label: 'Case Studies' },
        ]}
        title="Built with Fecto."
        subtitle="In-depth engineering case studies of Pakistan's most monumental infrastructure projects."
      />

      {/* SECTION 2: THE FLAGSHIP CASE STUDY (50/50 Split Screen Layout) */}
      <section className="bg-white py-24 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8B5E1A] mb-8">
            <Sparkles className="w-4 h-4 text-[#8B5E1A]" />
            <span>Flagship Infrastructure Deep-Dive</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch bg-[#F8FAFC] rounded-3xl overflow-hidden border border-slate-200/80 shadow-lg">
            
            {/* Left 50%: Towering Vertical Image */}
            <div className="lg:col-span-6 relative min-h-[420px] lg:min-h-[600px] overflow-hidden">
              <Image
                src="/herobg.jpg"
                alt="Tarbela Dam Extension Hydroelectric Complex"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#000080]/80 via-transparent to-transparent lg:hidden" />
              
              <div className="absolute top-6 left-6 z-10">
                <span className="px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#000080] text-[#F4D5AB] shadow-md">
                  Hydropower Mega-Project
                </span>
              </div>

              <div className="absolute bottom-6 left-6 right-6 z-10 text-white">
                <div className="text-xs font-mono opacity-80 mb-1">WAPDA Strategic Energy Asset</div>
                <div className="text-2xl font-black">Tarbela Dam Extension Complex</div>
              </div>
            </div>

            {/* Right 50%: Technical Overview & 2x2 Stats Grid */}
            <div className="lg:col-span-6 p-8 sm:p-12 lg:p-14 flex flex-col justify-between">
              <div>
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#8B5E1A] mb-2">
                  Technical Case Report #089
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#000080] leading-tight mb-4">
                  Tarbela 4th & 5th Extension Hydroelectric Power Project
                </h2>

                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  Supplying critical mass concrete for the colossal powerhouse substructure and penstock anchor blocks. The application necessitated stringent control over the hydration heat curve to prevent micro-fissuring across structural pours exceeding 15,000 cubic meters.
                </p>

                {/* 2x2 Stats Grid */}
                <div className="grid grid-cols-2 gap-4 p-5 rounded-2xl bg-white border border-slate-200/80 mb-6 shadow-xs">
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Supplied</div>
                    <div className="text-xl sm:text-2xl font-extrabold text-[#000080] font-mono mt-0.5">500,000+</div>
                    <div className="text-[11px] text-slate-500">Metric Tons</div>
                  </div>

                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Product Grade</div>
                    <div className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">Low Heat Portland</div>
                    <div className="text-[11px] text-slate-500 font-mono">ASTM C150 Type IV</div>
                  </div>

                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Supply Duration</div>
                    <div className="text-xl sm:text-2xl font-extrabold text-[#000080] font-mono mt-0.5">3 Years</div>
                    <div className="text-[11px] text-slate-500">Continuous 24/7 Logistics</div>
                  </div>

                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Compressive Strength</div>
                    <div className="text-xl sm:text-2xl font-extrabold text-emerald-700 font-mono mt-0.5">&gt; 55 MPa</div>
                    <div className="text-[11px] text-slate-500">28-Day Curing Peak</div>
                  </div>
                </div>

                {/* Bullet Highlights */}
                <div className="space-y-2 mb-8 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Thermal dissipation regulated below 60 cal/gram at 7 days</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Dedicated fleet of 40 pneumatic pressurized bulk tankers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Zero alkali-silica reactivity (ASR) confirmed by WAPDA labs</span>
                  </div>
                </div>
              </div>

              {/* Download Action */}
              <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  onClick={handleDownloadReport}
                  disabled={downloading}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#000080] text-white text-xs font-bold hover:bg-[#000060] transition-all shadow-md active:scale-95"
                >
                  {downloading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Generating PDF...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4 text-[#F4D5AB]" />
                      <span>Download Technical Report (PDF)</span>
                    </>
                  )}
                </button>

                <span className="text-xs text-slate-400 font-mono">
                  Verified by WAPDA Engineers
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 3: CASE STUDIES BENTO GRID (Hover Sweeps Up Grade Reveal) */}
      <section className="bg-[#F1F5F9] py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#8B5E1A]">Structural Portfolio</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#000080] mt-1">
              Monumental Infrastructure Nationwide
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2">
              Hover over each project card to inspect the structural engineering grade specified for each heavy pour.
            </p>
          </div>

          {/* Asymmetrical Bento Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {bentoProjects.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className={`relative rounded-3xl overflow-hidden min-h-[360px] sm:min-h-[400px] shadow-md group ${project.span}`}
              >
                {/* Background Image */}
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Base Shadow Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                {/* Always Visible Category Pill */}
                <div className="absolute top-5 left-5 z-10 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-white/95 text-[#000080] backdrop-blur-md shadow-xs">
                    {project.category}
                  </span>
                  <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-[#000080]/80 text-[#F4D5AB] backdrop-blur-md">
                    {project.volume}
                  </span>
                </div>

                {/* Default Bottom State */}
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 z-10 text-white transition-all duration-300 group-hover:opacity-0 group-hover:translate-y-4 pointer-events-none">
                  <div className="text-xs text-slate-300 font-mono mb-1">{project.location}</div>
                  <h3 className="text-2xl font-extrabold leading-tight text-white">
                    {project.title}
                  </h3>
                </div>

                {/* Sweeping Dark Overlay Reveal on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#000080] via-[#000080]/90 to-[#000080]/70 p-6 sm:p-8 flex flex-col justify-end text-white opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out z-20">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#F4D5AB] mb-1 font-mono">
                    Specified Structural Grade
                  </span>

                  <h3 className="text-2xl font-black text-white mb-2 leading-snug">
                    {project.title}
                  </h3>

                  <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 mb-4">
                    <div className="text-xs font-bold text-[#F4D5AB] font-mono mb-1">
                      {project.gradeUsed}
                    </div>
                    <p className="text-xs text-slate-200 leading-relaxed">
                      {project.application}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-300 font-mono pt-2 border-t border-white/10">
                    <span>Volume: {project.volume}</span>
                    <span className="flex items-center gap-1 text-[#F4D5AB] font-bold">
                      View Case Brief <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CORPORATE MEGA FOOTER */}
      <CorporateFooter onRequestQuote={() => setQuoteModalOpen(true)} />

      {/* INTERACTIVE QUOTE MODAL */}
      <QuoteModal isOpen={quoteModalOpen} onClose={() => setQuoteModalOpen(false)} />
    </div>
  );
}

