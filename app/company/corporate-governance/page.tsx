'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  Scale, 
  FileCheck2, 
  Lock, 
  Users, 
  ChevronDown, 
  CheckCircle2, 
  ArrowRight,
  AlertCircle
} from 'lucide-react';
import FectoNavbar from '@/components/FectoNavbar';
import CorporateFooter from '@/components/CorporateFooter';
import QuoteModal from '@/components/QuoteModal';
import InnerPageHero from '@/components/InnerPageHero';

interface Committee {
  id: string;
  name: string;
  mandate: string;
  meetingCadence: string;
  members: string[];
  responsibilities: string[];
}

const boardCommittees: Committee[] = [
  {
    id: 'audit',
    name: 'Board Audit Committee',
    mandate: 'Oversight of financial reporting integrity, internal controls, and independent auditor engagement.',
    meetingCadence: 'Quarterly (At least 4 times per fiscal year)',
    members: ['Syed Tariq Mehmood (Chair - Independent Director)', 'Raza Fecto (Executive Director)', 'Altaf A. Hussain (Non-Executive Director)'],
    responsibilities: [
      'Periodic review of quarterly and annual un-audited/audited financial statements.',
      'Supervision of statutory internal audit mechanisms and enterprise risk controls.',
      'Direct confidential communication conduit for independent external auditors.',
      'Monitoring SECP Listed Companies Code of Corporate Governance compliance.',
    ],
  },
  {
    id: 'hr',
    name: 'Human Resource & Remuneration Committee',
    mandate: 'Designing competitive, performance-aligned compensation frameworks and executive talent succession.',
    meetingCadence: 'Bi-annually (At least twice per fiscal year)',
    members: ['Zainab Fecto (Chair - Non-Executive Director)', 'Dr. Farhan Qureshi (Director QA)', 'Kamran S. Mirza (Director Logistics)'],
    responsibilities: [
      'Establishing executive leadership compensation and KPI-indexed incentives.',
      'Overseeing engineering trainee programs and technical workforce development at Sangjani.',
      'Enforcing zero-harassment, workplace gender equity, and fair labor policies.',
      'Reviewing succession planning for key executive and operational management roles.',
    ],
  },
  {
    id: 'risk',
    name: 'Risk Management & ESG Committee',
    mandate: 'Strategic evaluation of macroeconomic commodity exposure, decarbonization mandates, and asset security.',
    meetingCadence: 'Tri-annually',
    members: ['Altaf A. Hussain (Chair)', 'Mohammed Yasin Fecto (Executive Chairman)', 'Zainab Fecto (Head of ESG)'],
    responsibilities: [
      'Continuous scenario analysis of energy price volatility (coal vs. alternative biomass fuels).',
      'Overseeing transition milestones to meet -30% carbon emissions targets by 2030.',
      'Assessing geological and regulatory quarrying compliance in the Margalla corridor.',
      'Digital infrastructure resilience and cybersecurity for the plant’s automated DCS network.',
    ],
  },
];

export default function CorporateGovernancePage() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [expandedCommittee, setExpandedCommittee] = useState<string>('audit');

  return (
    <div className="min-h-screen bg-[#F1F5F9] text-slate-900 selection:bg-[#F4D5AB] selection:text-[#000080]">
      {/* 1. FLOATING NAVBAR */}
      <FectoNavbar onCtaClick={() => setQuoteModalOpen(true)} />

      {/* 2. SECTION 1: THE PREMIUM EDITORIAL HERO */}
      <InnerPageHero
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Company' },
          { label: 'Corporate Governance' },
        ]}
        title="Uncompromising Integrity."
        subtitle="The ethical framework and strict compliance standards guiding our board and operations."
        textureImageUrl="/images/investors-towers.jpg"
      />

      {/* 3. SECTION 2: THE COMPLIANCE BENTO GRID */}
      <section className="py-24 bg-[#F1F5F9] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#8B5E1A]">
              ETHICAL FOUNDATION
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#000080] mt-3">
              The Compliance Bento Grid
            </h2>
            <p className="text-slate-600 mt-4 text-base sm:text-lg">
              Institutional transparency, regulatory adherence, and protected stakeholder whistleblowing.
            </p>
          </div>

          {/* 4-Card Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
            
            {/* Card 1 (Large - Spans 7 cols): SECP & PSX Compliance */}
            <div className="lg:col-span-7 rounded-3xl p-8 sm:p-10 bg-[#000080] text-white shadow-xl border border-white/10 flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider bg-white/10 text-[#F4D5AB]">
                    Regulatory Benchmark
                  </span>
                  <div className="w-12 h-12 rounded-2xl bg-white/10 text-[#F4D5AB] flex items-center justify-center">
                    <Scale className="w-6 h-6 text-[#F4D5AB]" />
                  </div>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold mb-3">
                  SECP & PSX Listed Compliance
                </h3>
                <p className="text-blue-100/80 text-sm sm:text-base leading-relaxed mb-6">
                  Fecto Cement Limited strictly complies with the Listed Companies (Code of Corporate Governance) Regulations 2019, Pakistan Stock Exchange Rulebook, and Securities and Exchange Commission of Pakistan (SECP) disclosure mandates.
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 grid grid-cols-2 gap-4 text-xs font-mono text-blue-200">
                <div>
                  <div className="text-white font-bold">Independent Directors</div>
                  <div>Exceeds 33% Statutory Quota</div>
                </div>
                <div>
                  <div className="text-white font-bold">Annual Audits</div>
                  <div>Independent Big-Four Partner</div>
                </div>
              </div>
            </div>

            {/* Card 2 (Spans 5 cols): Code of Conduct & Ethics */}
            <div className="lg:col-span-5 rounded-3xl p-8 sm:p-10 bg-white border border-slate-200/80 shadow-xl flex flex-col justify-between group hover:-translate-y-1 transition-transform">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#000080]/5 text-[#000080]">
                    Corporate Code
                  </span>
                  <div className="w-12 h-12 rounded-2xl bg-[#000080]/5 text-[#000080] flex items-center justify-center">
                    <FileCheck2 className="w-6 h-6 text-[#8B5E1A]" />
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-[#000080] mb-3">
                  Code of Conduct & Ethics
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  All directors, executive officers, engineers, and plant managers execute an annual affirmation of our Code of Ethics, preventing insider trading, conflicts of interest, and illicit benefits.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 text-xs font-semibold text-emerald-800 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>100% Annual Employee Affirmation</span>
              </div>
            </div>

            {/* Card 3 (Spans 6 cols): Anti-Bribery & Corruption Policy */}
            <div className="lg:col-span-6 rounded-3xl p-8 sm:p-10 bg-white border border-slate-200/80 shadow-xl flex flex-col justify-between group hover:-translate-y-1 transition-transform">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#000080]/5 text-[#000080]">
                    Zero-Tolerance
                  </span>
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-800 flex items-center justify-center">
                    <ShieldCheck className="w-6 h-6 text-amber-700" />
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-[#000080] mb-3">
                  Anti-Bribery & Anti-Corruption
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  Comprehensive vendor due-diligence protocols for raw limestone suppliers, freight contractors, and dealership dealerships. Transparent competitive e-procurement prevents commercial kickbacks.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 text-xs font-mono text-slate-500">
                Regular Internal Audit Scrutiny
              </div>
            </div>

            {/* Card 4 (Spans 6 cols): Whistleblower Protection */}
            <div className="lg:col-span-6 rounded-3xl p-8 sm:p-10 bg-white border border-slate-200/80 shadow-xl flex flex-col justify-between group hover:-translate-y-1 transition-transform">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-rose-50 text-rose-800">
                    Confidential
                  </span>
                  <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-800 flex items-center justify-center">
                    <Lock className="w-6 h-6 text-rose-700" />
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-[#000080] mb-3">
                  Whistleblower Protection Policy
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  Encrypted, anonymous reporting hotline transmitting directly to the Board Audit Committee Chair. Full statutory retaliation safeguards for all reporting employees and contractors.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 text-xs font-mono text-slate-500">
                Direct Board Committee Access
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. SECTION 3: BOARD COMMITTEES ACCORDION */}
      <section className="py-24 bg-[#F1F5F9]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#8B5E1A]">
              GOVERNANCE ARCHITECTURE
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#000080] mt-3">
              Board Committees
            </h2>
            <p className="text-slate-600 mt-4 text-base sm:text-lg">
              Specialized statutory committees providing independent oversight of audit, compensation, and risk.
            </p>
          </div>

          {/* Interactive Accordion UI */}
          <div className="space-y-4">
            {boardCommittees.map((committee) => {
              const isExpanded = expandedCommittee === committee.id;
              return (
                <div
                  key={committee.id}
                  className="rounded-3xl bg-white border border-slate-200/80 shadow-md overflow-hidden transition-all duration-300"
                >
                  <button
                    type="button"
                    onClick={() => setExpandedCommittee(isExpanded ? '' : committee.id)}
                    className="w-full p-6 sm:p-8 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
                  >
                    <div>
                      <div className="text-xs font-mono uppercase tracking-wider text-[#8B5E1A] font-semibold mb-1">
                        {committee.meetingCadence}
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-[#000080]">
                        {committee.name}
                      </h3>
                      <p className="text-slate-500 text-xs sm:text-sm mt-1 max-w-xl">
                        {committee.mandate}
                      </p>
                    </div>

                    <div className={`w-10 h-10 rounded-full bg-[#000080]/5 text-[#000080] flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                      isExpanded ? 'rotate-180 bg-[#000080] text-white' : ''
                    }`}>
                      <ChevronDown className="w-5 h-5" />
                    </div>
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="px-6 sm:px-8 pb-8 pt-2 border-t border-slate-100"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                          <div>
                            <div className="text-xs font-bold uppercase tracking-wider text-[#000080] mb-3">
                              Committee Responsibilities
                            </div>
                            <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                              {committee.responsibilities.map((resp, rIdx) => (
                                <li key={rIdx} className="flex items-start gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#000080] mt-1.5 flex-shrink-0" />
                                  <span>{resp}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <div className="text-xs font-bold uppercase tracking-wider text-[#000080] mb-3">
                              Current Committee Members
                            </div>
                            <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                              {committee.members.map((mem, mIdx) => (
                                <li key={mIdx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2">
                                  <Users className="w-4 h-4 text-[#8B5E1A] flex-shrink-0" />
                                  <span className="font-medium">{mem}</span>
                                </li>
                              ))}
                            </ul>
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

