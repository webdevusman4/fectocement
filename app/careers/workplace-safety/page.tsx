'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FectoNavbar from '@/components/FectoNavbar';
import CorporateFooter from '@/components/CorporateFooter';
import QuoteModal from '@/components/QuoteModal';
import { InnerPageHero } from '@/components/InnerPageHero';
import { 
  ShieldCheck, 
  Activity, 
  HardHat, 
  AlertTriangle, 
  ChevronDown, 
  CheckCircle2, 
  HeartHandshake, 
  Flame, 
  Eye, 
  FileCheck,
  Award,
  Zap,
  Clock
} from 'lucide-react';

interface SafetyProtocol {
  id: string;
  tabTitle: string;
  category: string;
  summary: string;
  procedures: string[];
  ppeChecklist: string[];
  regulatoryStandard: string;
}

export default function WorkplaceSafetyPage() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [expandedTab, setExpandedTab] = useState<string>('ppe');

  const protocols: SafetyProtocol[] = [
    {
      id: 'ppe',
      tabTitle: 'Mandatory PPE & Site Access',
      category: 'Physical Barrier Protection',
      summary: 'Strict zero-compromise personal protective equipment protocols governing plant access across all zones.',
      regulatoryStandard: 'OSHA 1910.132 / ISO 45001 Clause 8.1.2',
      procedures: [
        'Mandatory entry gate verification: biometric verification synchronized with PPE compliance scanners.',
        'High-visibility reflective apparel (EN ISO 20471 Class 3) required across all heavy traffic yards.',
        'Zero unauthorized pedestrian crossover inside bulk logistics and clinker loading terminals.',
      ],
      ppeChecklist: ['Steel-Toe Safety Boots (EN ISO 20345)', 'Industrial Hard Hat (Type 1 Class E)', 'Anti-Fog Safety Goggles & Ear Defenders (SNR 32dB)', 'Dust Respirators (FFP3 / N95) in pyro-processing zones'],
    },
    {
      id: 'hira',
      tabTitle: 'Hazard Identification & Risk Assessment (HIRA)',
      category: 'Preventative Risk Engineering',
      summary: 'Proactive hazard mitigation matrices executed prior to hot-work, confined space, or heavy rigging operations.',
      regulatoryStandard: 'NEBOSH International Technical Certificate Framework',
      procedures: [
        'Daily "Toolbox Talks" (TBT) mandatory for each shift before engaging with kilns or grinding mills.',
        'Formal Lock-Out / Tag-Out (LOTO) procedures on all 11kV electrical circuits and mechanical drives.',
        'Digital permit-to-work (PTW) authorization required for any elevated work above 2 meters.',
      ],
      ppeChecklist: ['Full-Body Fall Arrest Harnesses', 'Gas Leak Detection Monitors', 'Non-Sparking Brass Hand Tools'],
    },
    {
      id: 'emergency',
      tabTitle: 'Emergency Response Protocols',
      category: 'Disaster Preparedness & Evacuation',
      summary: 'Comprehensive alarm hierarchy, automated suppression systems, and 24/7 on-site emergency clinic integration.',
      regulatoryStandard: 'National Disaster Management Authority (NDMA) & Civil Defense Approved',
      procedures: [
        'Continuous automated optical flame sensors and nitrogen inerting systems inside coal mill pulverized bins.',
        'Dedicated emergency medical rescue team and ambulance stationed at Sangjani 24 hours a day, 365 days a year.',
        'Bi-monthly full plant evacuation simulation reaching 100% muster count in under 3 minutes.',
      ],
      ppeChecklist: ['Positive Pressure SCBA Breathing Apparatus', 'Fire Proximity Heat Suits', 'First-Aid Trauma Response Kits'],
    },
    {
      id: 'training',
      tabTitle: 'Continuous Safety Training & Near-Miss Reporting',
      category: 'Behavior-Based Safety (BBS)',
      summary: 'Fostering an open psychological environment where every technician is empowered to stop work upon noticing unsafe conditions.',
      regulatoryStandard: 'DuPont Bradley Safety Curve Benchmark',
      procedures: [
        'Stop-Work Authority (SWA): Every frontline worker possesses the absolute mandate to halt plant machinery if hazard is perceived.',
        'Anonymous digital QR Near-Miss reporting kiosks distributed across all plant dispatch gates.',
        'Annual mandatory 40-hour refresher certifications in defensive driving, electrical safety, and first aid.',
      ],
      ppeChecklist: ['Mobile Near-Miss Reporting Terminal', 'Hazard Tagging Tape', 'Interactive Safety Badges'],
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
          { label: 'Careers', href: '#careers' },
          { label: 'Workplace Safety' },
        ]}
        title="Zero Harm Tolerance."
        subtitle="Our uncompromising commitment to occupational health and industrial safety standards."
      />

      {/* SECTION 2: THE SAFETY METRICS DASHBOARD (Pulls up slightly into the hero) */}
      <section className="relative px-6 z-20">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-[#040814] py-14 sm:py-20 px-8 sm:px-14 text-white rounded-3xl max-w-5xl mx-auto -mt-10 relative z-20 shadow-2xl border border-white/10 overflow-hidden"
        >
          {/* Ambient Glowing Green Corner Accent */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/15 rounded-full blur-[100px] pointer-events-none" />

          {/* Header Row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 mb-10 border-b border-white/10 gap-4">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping inline-block" />
              <span className="text-white font-mono font-bold text-xs uppercase tracking-wider">
                Live Industrial Safety Telemetry
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3.5 py-1.5 rounded-full border border-emerald-400/20">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Zero Lost Time Incidents (YTD 2026)</span>
            </div>
          </div>

          {/* 3 Massive Counters Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 text-center md:text-left">
            
            {/* Stat 1: LTI-Free Days */}
            <div className="border-b md:border-b-0 md:border-r border-white/10 pb-6 md:pb-0 md:pr-8">
              <div className="text-[11px] font-bold uppercase tracking-widest text-[#F4D5AB] mb-1 font-mono">
                Continuous Milestone
              </div>
              <div className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight my-2 text-emerald-400">
                1,450+
              </div>
              <div className="text-sm font-bold text-slate-200">
                LTI-Free Days
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Zero Lost Time Injuries recorded across 4 million consecutive man-hours.
              </p>
            </div>

            {/* Stat 2: Training Hours */}
            <div className="border-b md:border-b-0 md:border-r border-white/10 pb-6 md:pb-0 md:pr-8">
              <div className="text-[11px] font-bold uppercase tracking-widest text-[#F4D5AB] mb-1 font-mono">
                Annual Drills & Education
              </div>
              <div className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight my-2">
                50,000+
              </div>
              <div className="text-sm font-bold text-slate-200">
                Annual Training Hours
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Practical drills in chemical handling, fire mitigation, and high-altitude rigging.
              </p>
            </div>

            {/* Stat 3: ISO 45001 Certification */}
            <div>
              <div className="text-[11px] font-bold uppercase tracking-widest text-[#F4D5AB] mb-1 font-mono">
                Global Accreditation
              </div>
              <div className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight my-2 text-[#F4D5AB]">
                ISO 45001
              </div>
              <div className="text-sm font-bold text-slate-200">
                Certified Management System
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Audited & verified by Bureau Veritas for occupational health standards.
              </p>
            </div>

          </div>
        </motion.div>
      </section>

      {/* SECTION 3: CORE PROTOCOLS ACCORDION */}
      <section className="bg-[#F1F5F9] py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-[#8B5E1A]">Life-Saving Rules</span>
            <h2 className="text-3xl font-extrabold text-[#000080] mt-1">
              Industrial Safety Governance Charters
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              Every employee, contractor, and site visitor is bound by our strict statutory protocols.
            </p>
          </div>

          {/* Interactive Accordion Stack */}
          <div className="space-y-4">
            {protocols.map((proto) => {
              const isOpen = expandedTab === proto.id;

              return (
                <div
                  key={proto.id}
                  className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => setExpandedTab(isOpen ? '' : proto.id)}
                    className="w-full p-6 sm:p-7 flex items-center justify-between text-left hover:bg-slate-50/80 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${
                        isOpen ? 'bg-[#000080] text-[#F4D5AB]' : 'bg-slate-100 text-[#000080]'
                      }`}>
                        <HardHat className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="text-[11px] font-bold uppercase tracking-wider text-[#8B5E1A]">
                          {proto.category}
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-[#000080]">
                          {proto.tabTitle}
                        </h3>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono font-medium text-slate-400 hidden sm:inline">
                        {proto.regulatoryStandard}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-[#000080] transition-transform duration-200 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        className="px-6 sm:px-8 pb-8 pt-2 border-t border-slate-100"
                      >
                        <p className="text-sm text-slate-600 leading-relaxed mb-6 font-medium">
                          {proto.summary}
                        </p>

                        {/* Standard Procedures */}
                        <div className="space-y-3 mb-6">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                            Mandatory Operating Procedures:
                          </h4>
                          {proto.procedures.map((proc, pIdx) => (
                            <div key={pIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                              <span>{proc}</span>
                            </div>
                          ))}
                        </div>

                        {/* PPE Checklist Pill Array */}
                        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                            Mandatory Safety Gear Checklist:
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {proto.ppeChecklist.map((item, cIdx) => (
                              <span
                                key={cIdx}
                                className="px-3 py-1 rounded-lg text-xs font-mono bg-white border border-slate-200 text-[#000080] font-semibold shadow-2xs"
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
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

