'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import FectoNavbar from '@/components/FectoNavbar';
import CorporateFooter from '@/components/CorporateFooter';
import QuoteModal from '@/components/QuoteModal';
import { InnerPageHero } from '@/components/InnerPageHero';
import { 
  PieChart, 
  Users, 
  Building, 
  Landmark, 
  Download, 
  FileSpreadsheet, 
  ShieldCheck, 
  ArrowUpRight,
  Info,
  CheckCircle2
} from 'lucide-react';

interface ShareholderRow {
  category: string;
  shareholders: number;
  shares: number;
  percentage: number;
}

export default function PatternOfShareholdingPage() {
  const [activeSegment, setActiveSegment] = useState<string | null>(null);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);

  const distribution = [
    {
      id: 'directors',
      label: 'Directors, CEO & Associated Family',
      percent: 45.0,
      shares: '22,572,000',
      color: '#000080', // Fecto Navy
      strokeDash: '282.74', // circumference = 2 * pi * r = 2 * 3.14159 * 45 = 282.74 -> 45% = 127.23
      strokeDasharray: '127.23 282.74',
      strokeDashoffset: '0',
      icon: Users,
      description: 'Founding family, Board Directors, and executive sponsors ensuring steady stewardship.',
    },
    {
      id: 'public',
      label: 'General Public (Retail Float)',
      percent: 30.0,
      shares: '15,048,000',
      color: '#8B5E1A', // Bronze / Champagne Sand Accent
      strokeDasharray: '84.82 282.74',
      strokeDashoffset: '-127.23',
      icon: Users,
      description: 'Individual domestic retail investors traded actively on the Pakistan Stock Exchange.',
    },
    {
      id: 'institutions',
      label: 'Institutional & Foreign Investors',
      percent: 25.0,
      shares: '12,540,000',
      color: '#2563EB', // Blue Accent
      strokeDasharray: '70.69 282.74',
      strokeDashoffset: '-212.05',
      icon: Landmark,
      description: 'Mutual funds, insurance conglomerates, commercial banks, and pension trusts.',
    },
  ];

  const tableData: ShareholderRow[] = [
    {
      category: 'Directors, Chief Executive Officer, Spouses & Minor Children',
      shareholders: 7,
      shares: 22572000,
      percentage: 45.00,
    },
    {
      category: 'Associated Companies, Undertakings and Related Parties',
      shareholders: 4,
      shares: 4514400,
      percentage: 9.00,
    },
    {
      category: 'Banks, Development Finance Institutions (DFIs) & NBFIs',
      shareholders: 12,
      shares: 3260400,
      percentage: 6.50,
    },
    {
      category: 'Insurance Companies, Takaful Operators & Pension Funds',
      shareholders: 8,
      shares: 2508000,
      percentage: 5.00,
    },
    {
      category: 'Modarabas and Mutual Funds (NIT & Asset Management Companies)',
      shareholders: 19,
      shares: 2257200,
      percentage: 4.50,
    },
    {
      category: 'General Public (Local Individual Investors - CDC & Physical)',
      shareholders: 3842,
      shares: 12540000,
      percentage: 25.00,
    },
    {
      category: 'Foreign Investors, Offshore Funds and Other Corporate Bodies',
      shareholders: 35,
      shares: 2508000,
      percentage: 5.00,
    },
  ];

  const totalShares = 50160000;
  const totalShareholders = tableData.reduce((acc, curr) => acc + curr.shareholders, 0);

  return (
    <div className="min-h-screen bg-[#F1F5F9] text-slate-900 selection:bg-[#F4D5AB] selection:text-[#000080]">
      {/* 1. FLOATING NAVBAR */}
      <FectoNavbar onCtaClick={() => setQuoteModalOpen(true)} />

      {/* SECTION 1: THE UNIVERSAL HERO */}
      <InnerPageHero
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Investors', href: '#investors' },
          { label: 'Pattern of Shareholding' },
        ]}
        title="Ownership Structure."
        subtitle="Detailed breakdown of CDC and physical float."
      />

      {/* SECTION 2: VISUAL DISTRIBUTION (Left: SVG Donut Chart, Right: Legend) */}
      <section className="bg-[#F1F5F9] py-20 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-[#8B5E1A]">Equity Distribution Profile</span>
            <h2 className="text-3xl font-extrabold text-[#000080] mt-1">
              Share Capitalization & Float Architecture
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              Statutory pattern as of June 30, 2025, prepared under Section 227 of the Companies Act 2017 and PSX regulations.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 lg:p-12 border border-slate-200/80 shadow-[0_10px_35px_rgba(0,0,0,0.04)] grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left: CSS/SVG Donut Chart Mockup */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
                  {/* Background Track */}
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="transparent"
                    stroke="#E2E8F0"
                    strokeWidth="10"
                  />

                  {/* Segment 1: Directors (45%) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="transparent"
                    stroke="#000080"
                    strokeWidth="10"
                    strokeDasharray="127.23 282.74"
                    strokeDashoffset="0"
                    className="transition-all duration-300 cursor-pointer hover:stroke-width-[12]"
                    onMouseEnter={() => setActiveSegment('directors')}
                    onMouseLeave={() => setActiveSegment(null)}
                  />

                  {/* Segment 2: General Public (30%) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="transparent"
                    stroke="#8B5E1A"
                    strokeWidth="10"
                    strokeDasharray="84.82 282.74"
                    strokeDashoffset="-127.23"
                    className="transition-all duration-300 cursor-pointer hover:stroke-width-[12]"
                    onMouseEnter={() => setActiveSegment('public')}
                    onMouseLeave={() => setActiveSegment(null)}
                  />

                  {/* Segment 3: Institutional (25%) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="transparent"
                    stroke="#2563EB"
                    strokeWidth="10"
                    strokeDasharray="70.69 282.74"
                    strokeDashoffset="-212.05"
                    className="transition-all duration-300 cursor-pointer hover:stroke-width-[12]"
                    onMouseEnter={() => setActiveSegment('institutions')}
                    onMouseLeave={() => setActiveSegment(null)}
                  />
                </svg>

                {/* Center Core Info */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 pointer-events-none">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Paid-Up Capital</span>
                  <span className="text-2xl sm:text-3xl font-extrabold text-[#000080] tracking-tight">50.16M</span>
                  <span className="text-xs text-slate-500 font-medium">Ordinary Shares</span>
                </div>
              </div>

              <div className="mt-4 text-xs text-slate-400 font-mono">
                Face Value: PKR 10.00 / Share
              </div>
            </div>

            {/* Right: Detailed Legend */}
            <div className="lg:col-span-7 space-y-4">
              {distribution.map((item) => {
                const isSelected = activeSegment === item.id;
                const Icon = item.icon;
                return (
                  <div
                    key={item.id}
                    onMouseEnter={() => setActiveSegment(item.id)}
                    onMouseLeave={() => setActiveSegment(null)}
                    className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer ${
                      isSelected
                        ? 'bg-slate-50 border-[#000080]/30 shadow-md translate-x-1'
                        : 'bg-white border-slate-100 hover:border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span
                          className="w-4 h-4 rounded-md flex-shrink-0"
                          style={{ backgroundColor: item.color }}
                        />
                        <h3 className="text-base font-bold text-[#000080]">
                          {item.label}
                        </h3>
                      </div>
                      <div className="text-right">
                        <span className="text-xl font-extrabold text-[#000080]">
                          {item.percent}%
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-500 pl-7">
                      <p className="max-w-md">{item.description}</p>
                      <span className="font-mono font-medium text-slate-700 whitespace-nowrap ml-4">
                        {item.shares} shares
                      </span>
                    </div>
                  </div>
                );
              })}

              <div className="pt-2 flex items-center justify-between text-xs text-slate-500 font-mono">
                <span>Free Float (Non-Sponsors): 30.0%</span>
                <span>CDC Facilitated Float: 98.4%</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 3: TABULAR DATA (Formal Tailwind Table with SECP Formatting) */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-slate-200 gap-4">
            <div>
              <h2 className="text-2xl font-bold text-[#000080]">
                Form 34 — Statutory Shareholding Breakdown
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Extracted from the latest Central Depository Company (CDC) physical and electronic registrar records.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => alert('Downloading official SECP Form 34 (PDF)...')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-[#000080] text-white hover:bg-[#000060] transition-all shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Form 34 (PDF)</span>
              </button>
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="bg-slate-100 text-[#000080] font-bold border-b border-slate-200">
                  <th className="py-4 px-6 uppercase text-xs tracking-wider">Category of Shareholders</th>
                  <th className="py-4 px-6 uppercase text-xs tracking-wider text-right">No. of Shareholders</th>
                  <th className="py-4 px-6 uppercase text-xs tracking-wider text-right">Shares Held</th>
                  <th className="py-4 px-6 uppercase text-xs tracking-wider text-right">Percentage (%)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {tableData.map((row, index) => (
                  <tr
                    key={index}
                    className="hover:bg-slate-50/80 transition-colors duration-150"
                  >
                    <td className="py-4 px-6 font-medium text-slate-800">
                      {row.category}
                    </td>
                    <td className="py-4 px-6 text-right font-mono text-slate-600">
                      {row.shareholders.toLocaleString()}
                    </td>
                    <td className="py-4 px-6 text-right font-mono font-medium text-[#000080]">
                      {row.shares.toLocaleString()}
                    </td>
                    <td className="py-4 px-6 text-right font-mono font-bold text-slate-800">
                      {row.percentage.toFixed(2)}%
                    </td>
                  </tr>
                ))}
                
                {/* Total Row */}
                <tr className="bg-slate-50/90 font-bold border-t-2 border-[#000080] text-[#000080]">
                  <td className="py-5 px-6 uppercase text-xs tracking-wider">
                    Total Share Capitalization
                  </td>
                  <td className="py-5 px-6 text-right font-mono text-base">
                    {totalShareholders.toLocaleString()}
                  </td>
                  <td className="py-5 px-6 text-right font-mono text-base">
                    {totalShares.toLocaleString()}
                  </td>
                  <td className="py-5 px-6 text-right font-mono text-base">
                    100.00%
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Registrar Notice */}
          <div className="mt-8 p-5 bg-[#F8FAFC] rounded-2xl border border-slate-200 text-xs text-slate-500 flex items-start gap-3">
            <Info className="w-5 h-5 text-[#000080] flex-shrink-0 mt-0.5" />
            <p>
              Share Registrar Services are managed by <strong>CDC Share Registrar Services Limited (CDCSRSL)</strong>, CDC House, 99-B, Block-B, S.M.C.H.S., Main Shahrah-e-Faisal, Karachi. Physical share certificates can be converted to electronic book-entry securities through authorized CDC participants.
            </p>
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

