'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import FectoNavbar from '@/components/FectoNavbar';
import CorporateFooter from '@/components/CorporateFooter';
import QuoteModal from '@/components/QuoteModal';
import { InnerPageHero } from '@/components/InnerPageHero';
import { 
  ShieldCheck, 
  Users, 
  FileText, 
  Download, 
  Scale, 
  AlertTriangle, 
  Lock, 
  CheckCircle2, 
  ArrowUpRight,
  UserCheck,
  Building,
  Award
} from 'lucide-react';

export default function CorporateGovernanceInvestorsPage() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const committees = [
    {
      title: 'Board Audit Committee',
      tag: 'Statutory Financial Integrity',
      mandate: 'Oversight of financial reporting systems, internal controls, compliance with statutory regulations, and independent review of external audit findings.',
      meetingsCount: '4 Statutory Meetings per Year',
      chairman: {
        name: 'Mr. Tariq Rehman',
        role: 'Chairman (Independent Director)',
        qualification: 'FCA, 28+ years corporate auditing experience',
      },
      members: [
        { name: 'Mr. Altaf Hussain', role: 'Member (Non-Executive Director)' },
        { name: 'Ms. Zuleikha Fecto', role: 'Member (Non-Executive Director)' },
        { name: 'Mr. Salman Qureshi', role: 'Head of Internal Audit (Secretary)' },
      ],
      icon: Scale,
      accent: 'from-blue-600/10 to-indigo-600/5',
    },
    {
      title: 'Human Resource & Remuneration Committee',
      tag: 'Executive Governance & Succession',
      mandate: 'Formulating human capital policies, selection and compensation frameworks for senior management, board evaluation, and strategic leadership development.',
      meetingsCount: '2 Meetings per Year',
      chairman: {
        name: 'Ms. Aamina Qasim',
        role: 'Chairperson (Independent Director)',
        qualification: 'MBA, Former Senior Director of Human Capital',
      },
      members: [
        { name: 'Mr. Mohammed Yasin Fecto', role: 'Member (Executive Director)' },
        { name: 'Mr. Shahid Mehmood', role: 'Member (Non-Executive Director)' },
        { name: 'Mr. Khalid Mansoor', role: 'Head of Human Resources (Secretary)' },
      ],
      icon: Users,
      accent: 'from-amber-600/10 to-orange-600/5',
    },
    {
      title: 'Risk Management & ESG Committee',
      tag: 'Enterprise Resilience & Decarbonization',
      mandate: 'Identifying industrial enterprise risks, cybersecurity protocols, supply chain continuity, emissions monitoring, and net-zero capital allocations.',
      meetingsCount: '3 Meetings per Year',
      chairman: {
        name: 'Mr. Asadullah Khan',
        role: 'Chairman (Independent Director)',
        qualification: 'M.Sc. Industrial Engineering, Risk Strategist',
      },
      members: [
        { name: 'Mr. Zubair Fecto', role: 'Member (Executive Director)' },
        { name: 'Engr. Farhan Rizvi', role: 'Member (Chief Operating Officer)' },
        { name: 'Syed Hamza Ali', role: 'Chief Risk & Compliance Officer (Secretary)' },
      ],
      icon: ShieldCheck,
      accent: 'from-emerald-600/10 to-teal-600/5',
    },
  ];

  const policies = [
    {
      title: 'Code of Business Conduct & Ethics',
      description: 'Defines mandatory standards of integrity, professional conduct, conflict of interest avoidance, and transparent business dealings.',
      size: '1.4 MB',
      updated: 'Revised July 2025',
      icon: Award,
    },
    {
      title: 'Whistleblower & Speak-Up Policy',
      description: 'Confidential reporting mechanism guaranteeing protection against retaliation for reporting financial, safety, or ethical infractions.',
      size: '890 KB',
      updated: 'Revised March 2025',
      icon: AlertTriangle,
    },
    {
      title: 'Insider Trading & Closed Period Policy',
      description: 'Strict guidelines regulating share dealing by directors, executives, and substantial shareholders during material information closed periods.',
      size: '1.1 MB',
      updated: 'Revised January 2026',
      icon: Lock,
    },
    {
      title: 'Related Party Transactions Policy',
      description: 'Framework for approving and disclosing arm’s length contracts and transactions with associated entities as per Companies Act 2017.',
      size: '1.2 MB',
      updated: 'Revised September 2024',
      icon: Building,
    },
    {
      title: 'Corporate Social Responsibility & ESG Charter',
      description: 'Statutory mandate governing health, safety, carbon abatement investments, and community welfare funds deployment.',
      size: '1.8 MB',
      updated: 'Revised June 2025',
      icon: ShieldCheck,
    },
    {
      title: 'Directors’ Remuneration Framework',
      description: 'Transparent policy establishing fee schedules, meeting attendance allowances, and executive director compensation benchmarks.',
      size: '760 KB',
      updated: 'Revised October 2025',
      icon: FileText,
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
          { label: 'Investors', href: '#investors' },
          { label: 'Corporate Governance' },
        ]}
        title="Ethical Oversight."
        subtitle="Code of governance, ethics charter, and board committees."
      />

      {/* SECTION 2: COMMITTEE BENTO GRID (3 Large Cards with Full Committee Details) */}
      <section className="bg-[#F1F5F9] py-20 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-[#8B5E1A]">Board Standing Committees</span>
            <h2 className="text-3xl font-extrabold text-[#000080] mt-1">
              Independent Oversight & Specialized Sub-Committees
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              Structured in accordance with the Listed Companies (Code of Corporate Governance) Regulations, 2019 to preserve enterprise value.
            </p>
          </div>

          {/* 3 Large Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {committees.map((comm, index) => {
              const Icon = comm.icon;
              return (
                <motion.div
                  key={comm.title}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-[0_10px_35px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_45px_rgba(0,0,128,0.08)] transition-all flex flex-col justify-between group hover:-translate-y-1"
                >
                  <div>
                    {/* Header Pill & Icon */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-[#000080]/5 text-[#000080] flex items-center justify-center group-hover:bg-[#000080] group-hover:text-white transition-all duration-300">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-mono font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                        {comm.meetingsCount}
                      </span>
                    </div>

                    <h3 className="text-xl font-extrabold text-[#000080] mb-2 leading-snug">
                      {comm.title}
                    </h3>

                    <div className="text-xs font-bold uppercase tracking-wider text-[#8B5E1A] mb-3">
                      {comm.tag}
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed mb-6">
                      {comm.mandate}
                    </p>

                    {/* Chairman Profile */}
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 mb-4">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                        Committee Chair
                      </div>
                      <div className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                        <UserCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        <span>{comm.chairman.name}</span>
                      </div>
                      <div className="text-xs text-[#000080] font-medium mt-0.5">
                        {comm.chairman.role}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-1">
                        {comm.chairman.qualification}
                      </div>
                    </div>

                    {/* Members List */}
                    <div className="space-y-2 mb-6">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Committee Members:
                      </div>
                      {comm.members.map((m, i) => (
                        <div key={i} className="flex items-center justify-between text-xs py-1.5 border-b border-slate-100 last:border-0">
                          <span className="font-semibold text-slate-800">{m.name}</span>
                          <span className="text-[11px] text-slate-500 font-mono">{m.role}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Charter Link */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-mono">SECP Rule 5.1.2</span>
                    <button 
                      onClick={() => alert(`Downloading terms of reference for ${comm.title}...`)}
                      className="font-bold text-[#000080] group-hover:text-[#8B5E1A] flex items-center gap-1 transition-colors"
                    >
                      <span>Terms of Reference</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 3: POLICY DOWNLOAD HUB (Formal Governance Documents Grid) */}
      <section className="bg-white py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4 pb-6 border-b border-slate-200">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#8B5E1A]">Compliance Charters</span>
              <h2 className="text-3xl font-extrabold text-[#000080] mt-1">
                Corporate Governance Policy Hub
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Download verified institutional policy frameworks adopted by the Board of Directors of Fecto Cement Limited.
              </p>
            </div>
            <div className="text-xs font-mono font-medium text-slate-500 bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-200">
              CCG Regulations 2019 Compliant
            </div>
          </div>

          {/* Grid of Policy Download Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {policies.map((policy, idx) => {
              const PIcon = policy.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#F8FAFC] rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-[#000080]/30 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-white text-[#000080] shadow-xs flex items-center justify-center group-hover:bg-[#000080] group-hover:text-white transition-colors">
                        <PIcon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-mono text-slate-400">
                        {policy.size}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 group-hover:text-[#000080] transition-colors leading-snug mb-2">
                      {policy.title}
                    </h3>

                    <p className="text-xs text-slate-500 leading-relaxed mb-4">
                      {policy.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400 font-mono">
                      {policy.updated}
                    </span>

                    <button
                      onClick={() => alert(`Downloading document: ${policy.title}`)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-white text-[#000080] hover:bg-[#000080] hover:text-white transition-all shadow-2xs border border-slate-200"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </button>
                  </div>
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

