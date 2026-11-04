'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import FectoNavbar from '@/components/FectoNavbar';
import CorporateFooter from '@/components/CorporateFooter';
import QuoteModal from '@/components/QuoteModal';
import { InnerPageHero } from '@/components/InnerPageHero';
import { 
  Gift, 
  Calendar, 
  CheckCircle2, 
  FileCheck, 
  Download, 
  Clock, 
  Landmark, 
  CreditCard,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';

export default function DividendDeclarationsPage() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const dividendTimeline = [
    {
      year: 'FY 2025',
      rate: 'Rs. 5.00 per share (50%)',
      type: 'Final Cash Dividend',
      approvedDate: 'September 26, 2025',
      bookClosure: 'October 18 – October 25, 2025',
      totalDisbursed: 'PKR 250.8 Million',
      status: 'Disbursed (Direct Credit via CDC)',
      highlights: 'Credited directly to verified IBAN bank accounts as per SECP Electronic Mandate.',
    },
    {
      year: 'FY 2024',
      rate: 'Rs. 4.00 per share (40%)',
      type: 'Final Cash Dividend',
      approvedDate: 'September 27, 2024',
      bookClosure: 'October 19 – October 26, 2024',
      totalDisbursed: 'PKR 200.6 Million',
      status: 'Fully Paid & Reconciled',
      highlights: 'Supported by robust operating cash flows and disciplined working capital control.',
    },
    {
      year: 'FY 2023',
      rate: 'Rs. 3.50 per share (35%)',
      type: 'Final Cash Dividend',
      approvedDate: 'September 28, 2023',
      bookClosure: 'October 20 – October 27, 2023',
      totalDisbursed: 'PKR 175.5 Million',
      status: 'Fully Paid & Reconciled',
      highlights: 'Declared alongside thermal modernization completion at Sangjani plant.',
    },
    {
      year: 'FY 2022',
      rate: 'Rs. 3.00 per share (30%)',
      type: 'Final Cash Dividend',
      approvedDate: 'September 29, 2022',
      bookClosure: 'October 21 – October 28, 2022',
      totalDisbursed: 'PKR 150.4 Million',
      status: 'Fully Paid & Reconciled',
      highlights: 'Post-pandemic operating surge reflected in heightened shareholder payout.',
    },
    {
      year: 'FY 2021',
      rate: 'Rs. 2.50 per share (25%)',
      type: 'Final Cash Dividend',
      approvedDate: 'September 28, 2021',
      bookClosure: 'October 15 – October 22, 2021',
      totalDisbursed: 'PKR 125.4 Million',
      status: 'Fully Paid & Reconciled',
      highlights: 'Consistent yield track record adhering to conservative corporate policy.',
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
          { label: 'Dividend Declarations' },
        ]}
        title="Rewarding Shareholders."
        subtitle="Historical cash and bonus dividend entitlements."
      />

      {/* SECTION 2: LATEST PAYOUT BANNER (Massive Full-Width Card) */}
      <section className="bg-[#F1F5F9] py-20 border-b border-slate-200/60">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative bg-gradient-to-br from-[#000080] via-[#000060] to-[#040814] text-white rounded-3xl p-8 md:p-14 shadow-2xl overflow-hidden border border-white/10"
          >
            {/* Ambient Gold Glow Corner */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#F4D5AB] rounded-full blur-[110px] opacity-25 pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 mb-6">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Latest Corporate Entitlement Disbursed</span>
                </div>

                <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white mb-2">
                  Final Cash Dividend FY25
                </h2>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  Approved by the shareholders at the 43rd Annual General Meeting. Credited directly through Central Depository Company (CDC) electronic banking channel.
                </p>

                {/* Date & Closure Badges */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/10">
                    <Calendar className="w-5 h-5 text-[#F4D5AB]" />
                    <div>
                      <div className="text-[11px] uppercase tracking-wider text-slate-300">Book Closure Date</div>
                      <div className="text-xs font-bold text-white">Oct 18, 2025 – Oct 25, 2025</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/10">
                    <CreditCard className="w-5 h-5 text-emerald-400" />
                    <div>
                      <div className="text-[11px] uppercase tracking-wider text-slate-300">Payment Channel</div>
                      <div className="text-xs font-bold text-white">Direct IBAN e-Dividend</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Big Stat Box */}
              <div className="flex-shrink-0 w-full lg:w-auto bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/15 text-center flex flex-col items-center">
                <span className="text-xs font-bold uppercase tracking-widest text-[#F4D5AB] mb-1">
                  Dividend Payout
                </span>
                <div className="text-4xl sm:text-5xl font-black text-white tracking-tight my-2">
                  Rs. 5.00
                </div>
                <div className="text-sm font-semibold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-400/20">
                  50% Par Value (PKR 10)
                </div>
                <div className="text-[11px] text-slate-400 font-mono mt-4">
                  Total Disbursed: PKR 250.8M
                </div>
              </div>
            </div>

            {/* Bottom Actions Bar */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300">
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#F4D5AB]" />
                Tax rates applied: 15% for Active Taxpayers (ATL), 30% for Non-ATL.
              </span>
              <button 
                onClick={() => alert('Downloading Zakat & Tax Exemption Form (Form CZ-50)...')}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#F4D5AB] text-[#000080] font-bold hover:bg-white transition-all shadow-md"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Tax Exemption Form</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 3: DIVIDEND HISTORY TIMELINE (Vertical Alternating Nodes) */}
      <section className="bg-white py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#8B5E1A]">Historical Track Record</span>
            <h2 className="text-3xl font-extrabold text-[#000080] mt-1">
              5-Year Dividend Entitlement History
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              Unbroken dividend disbursement philosophy returning surplus cash flows to our institutional and retail shareholders.
            </p>
          </div>

          {/* Timeline Spine Container */}
          <div className="relative">
            {/* Vertical Center Spine Line — Strictly bounded inside container */}
            <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-6 bottom-6 w-0.5 bg-gradient-to-b from-[#000080] via-[#8B5E1A] to-[#000080]/20" />

            <div className="space-y-12">
              {dividendTimeline.map((item, index) => {
                const isEven = index % 2 === 0;

                return (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`relative flex flex-col md:flex-row items-center ${
                      isEven ? 'md:flex-row-reverse' : ''
                    }`}
                  >
                    {/* Content Card */}
                    <div className="w-full md:w-1/2 md:px-8">
                      <div className="bg-[#F8FAFC] rounded-3xl p-7 border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_30px_rgba(0,0,128,0.08)] transition-all group hover:-translate-y-1">
                        <div className="flex items-center justify-between mb-3">
                          <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#000080] text-[#F4D5AB]">
                            {item.year}
                          </span>
                          <span className="text-xs font-mono font-medium text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                            {item.status}
                          </span>
                        </div>

                        <div className="text-2xl font-black text-[#000080] mb-1">
                          {item.rate}
                        </div>
                        <div className="text-xs font-bold text-[#8B5E1A] mb-3">
                          {item.type}
                        </div>

                        <p className="text-xs text-slate-600 leading-relaxed mb-4">
                          {item.highlights}
                        </p>

                        <div className="pt-3 border-t border-slate-200 grid grid-cols-2 gap-2 text-[11px] text-slate-500 font-mono">
                          <div>
                            <span className="block text-slate-400">Total Disbursed:</span>
                            <span className="font-bold text-slate-700">{item.totalDisbursed}</span>
                          </div>
                          <div>
                            <span className="block text-slate-400">Approved:</span>
                            <span className="font-bold text-slate-700">{item.approvedDate}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Timeline Node Center Indicator */}
                    <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white border-4 border-[#000080] items-center justify-center shadow-md z-10">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#8B5E1A]" />
                    </div>

                    {/* Spacer for other side */}
                    <div className="hidden md:block w-1/2" />
                  </motion.div>
                );
              })}
            </div>
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

