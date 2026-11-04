'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  TrendingDown, 
  Flame, 
  Leaf, 
  Recycle, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight,
  Zap,
  Globe2
} from 'lucide-react';
import FectoNavbar from '@/components/FectoNavbar';
import CorporateFooter from '@/components/CorporateFooter';
import QuoteModal from '@/components/QuoteModal';
import InnerPageHero from '@/components/InnerPageHero';

const roadmapMilestones = [
  {
    year: '2026',
    target: '15% Reduction',
    phase: 'Baseline Optimization',
    description: 'Replacing clinker with calcined pozzolans and commissioning pilot multi-fuel RDF burners to reduce fossil fuel dependency.',
    active: true,
  },
  {
    year: '2030',
    target: '30% Reduction',
    phase: 'Alternative Fuels Shift',
    description: 'Achieving 40% thermal substitution in kilns using agricultural biomass and processed municipal refuse-derived fuel (RDF).',
    active: false,
  },
  {
    year: '2040',
    target: '60% Reduction',
    phase: 'Carbon Capture & Storage',
    description: 'Deployment of industrial carbon capture, utilization, and storage (CCUS) alongside oxy-combustion calcination loops.',
    active: false,
  },
  {
    year: '2050',
    target: 'Net Zero Emissions',
    phase: 'Complete Industrial Circularity',
    description: 'Fully decarbonized cement chemistry, zero-carbon electric kiln heating, and 100% green supply chain logistics nationwide.',
    active: false,
  },
];

export default function CarbonReductionPage() {
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
          { label: 'Carbon Reduction' },
        ]}
        title="The Path to Net Zero."
        subtitle="Our aggressive roadmap to decarbonize heavy industry by 2050."
        textureImageUrl="/images/sustainability-energy.jpg"
      />

      {/* 3. SECTION 2: THE DECARBONIZATION ROADMAP */}
      <section className="py-24 bg-[#F1F5F9] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#8B5E1A]">
              CLIMATE ACTION TARGETS
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#000080] mt-3">
              The Decarbonization Roadmap
            </h2>
            <p className="text-slate-600 mt-4 text-base sm:text-lg">
              A science-based progression toward carbon-neutral cement manufacturing in South Asia.
            </p>
          </div>

          {/* Stepping Stone Layout Connected by Horizontal Line */}
          <div className="relative">
            {/* Desktop Horizontal Line */}
            <div className="hidden lg:block absolute top-12 left-16 right-16 h-1 bg-slate-300 z-0 pointer-events-none" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
              {roadmapMilestones.map((milestone, idx) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  className={`p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 ${
                    milestone.active
                      ? 'bg-[#000080] text-white border-2 border-[#F4D5AB]'
                      : 'bg-white text-slate-900 border border-slate-200/80'
                  }`}
                >
                  <div>
                    {/* Stepping Stone Node Header */}
                    <div className="flex items-center justify-between mb-6">
                      <span className={`w-10 h-10 rounded-full font-mono font-bold text-sm flex items-center justify-center ${
                        milestone.active
                          ? 'bg-[#F4D5AB] text-[#000080] shadow-md'
                          : 'bg-slate-100 text-slate-700'
                      }`}>
                        {idx + 1}
                      </span>
                      <span className={`text-xs font-mono font-bold uppercase tracking-wider ${
                        milestone.active ? 'text-[#F4D5AB]' : 'text-slate-400'
                      }`}>
                        Stage {idx + 1}
                      </span>
                    </div>

                    <div className={`text-4xl sm:text-5xl font-black font-mono tracking-tight mb-1 ${
                      milestone.active ? 'text-[#F4D5AB]' : 'text-[#000080]'
                    }`}>
                      {milestone.year}
                    </div>

                    <div className={`text-lg font-bold mb-1 ${
                      milestone.active ? 'text-white' : 'text-slate-900'
                    }`}>
                      {milestone.target}
                    </div>

                    <div className={`text-xs font-semibold uppercase tracking-wider mb-4 ${
                      milestone.active ? 'text-blue-200' : 'text-[#8B5E1A]'
                    }`}>
                      {milestone.phase}
                    </div>

                    <p className={`text-xs sm:text-sm leading-relaxed ${
                      milestone.active ? 'text-blue-100/80' : 'text-slate-600'
                    }`}>
                      {milestone.description}
                    </p>
                  </div>

                  <div className={`mt-6 pt-4 border-t text-xs font-mono flex items-center justify-between ${
                    milestone.active ? 'border-white/10 text-[#F4D5AB]' : 'border-slate-100 text-slate-500'
                  }`}>
                    <span>Target Verification</span>
                    <span>{milestone.active ? 'In Progress' : 'Planned'}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. SECTION 3: THE RDF FOCUS - SPLIT LAYOUT */}
      <section className="py-24 bg-[#F1F5F9]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* LEFT COLUMN: High-Res Placeholder of RDF Processing */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 group">
                <Image
                  src="/images/contractors-infra.jpg"
                  alt="Refuse-Derived Fuel Processing and Alternative Fuel Kiln Injection"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

                {/* Overlaid Pill Badge */}
                <div className="absolute bottom-6 left-6 z-10 bg-slate-900/90 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20 text-white">
                  <div className="text-[10px] font-mono text-[#F4D5AB] uppercase">Alternative Fuel System</div>
                  <div className="text-sm font-bold">Refuse-Derived Fuel (RDF)</div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Deep Technical Narrative */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#8B5E1A] mb-2">
                FOSSIL FUEL SUBSTITUTION & FX SAVINGS
              </span>
              <h3 className="text-3xl sm:text-4xl font-bold text-[#000080] mb-6 leading-tight">
                Shifting from imported coal to circular biomass and municipal fuel.
              </h3>

              <div className="text-slate-600 text-base leading-relaxed space-y-4">
                <p>
                  Cement kilns are unique thermodynamic environments; firing at 1450°C with high oxidizing residence times, they can safely consume combustible industrial refuse, processed municipal waste, and agricultural biomass without generating harmful toxic dioxins or furans.
                </p>
                <p>
                  By partnering with regional municipalities and agricultural cooperatives across Punjab, Fecto Cement is systematically displacing imported petcoke and coal. This transition achieves two vital national goals simultaneously: drastically slashing greenhouse gas emissions per ton of clinker, while conserving hundreds of millions in national foreign exchange reserves.
                </p>
              </div>

              {/* Impact Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8 pt-6 border-t border-slate-200">
                <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>30% Kiln Thermal Substitution by 2030</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Zero Heavy Metal Fly Ash Residue</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Multi-Fuel Calciner Burner Technology</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Local Agricultural Residue Sourcing</span>
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

