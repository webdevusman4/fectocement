'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import FectoNavbar from '@/components/FectoNavbar';
import CorporateFooter from '@/components/CorporateFooter';
import QuoteModal from '@/components/QuoteModal';
import { InnerPageHero } from '@/components/InnerPageHero';
import { 
  FileText, 
  TrendingUp, 
  Users, 
  Gift, 
  Calendar, 
  Radio, 
  ShieldAlert, 
  Scale, 
  BarChart2, 
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export default function InvestorsHubPage() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const sections = [
    {
      group: 'Part 1: Financial Performance',
      links: [
        {
          title: 'Annual & Quarterly Reports',
          href: '/investors/reports',
          desc: 'Audited statements, quarterly results & annual review compendiums.',
          icon: FileText,
        },
        {
          title: 'Key Financial Ratios',
          href: '/investors/financial-ratios',
          desc: 'EBITDA margins, EPS, ROE, debt-to-equity & historical trajectory.',
          icon: TrendingUp,
        },
      ],
    },
    {
      group: 'Part 2: Shareholder Services',
      links: [
        {
          title: 'Pattern of Shareholding',
          href: '/investors/pattern-of-shareholding',
          desc: 'SECP Form 34, equity distribution donut & CDC float breakdown.',
          icon: Users,
        },
        {
          title: 'Dividend Declarations',
          href: '/investors/dividend-declarations',
          desc: 'Latest cash payouts, 5-year timeline & tax exemption mandates.',
          icon: Gift,
        },
        {
          title: 'AGM & EOGM Notices',
          href: '/investors/agm-eogm-notices',
          desc: 'General assembly agendas, proxy forms & historical minutes archive.',
          icon: Calendar,
        },
      ],
    },
    {
      group: 'Part 3: Regulatory & Compliance',
      links: [
        {
          title: 'PSX Disclosures',
          href: '/investors/psx-disclosures',
          desc: 'Real-time regulatory filings, material information & email alerts.',
          icon: Radio,
        },
        {
          title: 'Investor Grievances',
          href: '/investors/grievances',
          desc: 'Share registrar contacts, SECP JamaPunji & grievance ticketing.',
          icon: ShieldAlert,
        },
        {
          title: 'Corporate Governance',
          href: '/investors/corporate-governance',
          desc: 'Board committee charters, ethics policy & governance guidelines.',
          icon: Scale,
        },
      ],
    },
    {
      group: 'Part 4: Live Market Dashboard',
      links: [
        {
          title: 'View PSX Market Data',
          href: '/investors/psx-market-data',
          desc: 'Real-time FECTO share quote, trading volume & TradingView chart.',
          icon: BarChart2,
        },
      ],
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
          { label: 'Investors' },
        ]}
        title="Investor Relations Portal."
        subtitle="Pakistan Stock Exchange (PSX: FECTO) financial transparency and shareholder services."
      />

      {/* SECTION 2: INVESTOR OVERVIEW */}
      <section className="bg-[#F1F5F9] py-16 border-b border-slate-200/60">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-white rounded-3xl p-8 lg:p-10 border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Pakistan Stock Exchange Listed • PSX: FECTO
              </span>
              <h2 className="text-2xl font-bold text-[#000080] mt-3">
                Committed to Institutional Governance & Value Creation
              </h2>
              <p className="text-sm text-slate-500 mt-1 max-w-2xl">
                Access audited statements, compliance disclosures, shareholding statistics, and live PSX market telemetry across our comprehensive 9 investor sections.
              </p>
            </div>

            <Link
              href="/investors/psx-market-data"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#000080] text-white font-bold text-xs hover:bg-[#000060] transition-all shadow-md whitespace-nowrap"
            >
              <span>View PSX Live Ticker</span>
              <ArrowUpRight className="w-4 h-4 text-[#F4D5AB]" />
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 3: 9-SECTION DIRECTORY */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="space-y-12">
            {sections.map((grp, i) => (
              <div key={i}>
                <h3 className="text-xs font-bold uppercase tracking-widest text-[#8B5E1A] mb-4">
                  {grp.group}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {grp.links.map((link, j) => {
                    const Icon = link.icon;
                    return (
                      <Link
                        key={j}
                        href={link.href}
                        className="p-6 rounded-2xl bg-[#F8FAFC] border border-slate-200/80 hover:border-[#000080]/30 hover:shadow-lg transition-all flex flex-col justify-between group hover:-translate-y-1"
                      >
                        <div>
                          <div className="w-12 h-12 rounded-xl bg-white text-[#000080] flex items-center justify-center shadow-xs mb-4 group-hover:bg-[#000080] group-hover:text-white transition-colors">
                            <Icon className="w-6 h-6" />
                          </div>
                          <h4 className="text-base font-bold text-slate-900 group-hover:text-[#000080] transition-colors leading-snug mb-1">
                            {link.title}
                          </h4>
                          <p className="text-xs text-slate-500 leading-relaxed mb-4">
                            {link.desc}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-bold text-[#000080]">
                          <span>Explore Page</span>
                          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-[#8B5E1A]" />
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
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

