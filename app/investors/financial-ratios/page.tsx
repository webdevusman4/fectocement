'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import FectoNavbar from '@/components/FectoNavbar';
import CorporateFooter from '@/components/CorporateFooter';
import QuoteModal from '@/components/QuoteModal';
import { InnerPageHero } from '@/components/InnerPageHero';
import { 
  TrendingUp, 
  ArrowUpRight, 
  Percent, 
  Coins, 
  Activity, 
  BarChart3, 
  ShieldAlert, 
  Layers, 
  Info,
  Calendar,
  Sparkles
} from 'lucide-react';

export default function FinancialRatiosPage() {
  const [activeMetric, setActiveMetric] = useState<'revenue' | 'ebitda'>('revenue');
  const [hoveredYear, setHoveredYear] = useState<string | null>(null);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);

  const stats = [
    {
      label: 'Earnings Per Share (EPS)',
      value: 'Rs. 14.50',
      change: '+18.4% YoY',
      trend: 'up',
      description: 'Driven by enhanced thermal efficiency & stable domestic bag sales',
      submetric: 'Diluted EPS: Rs. 14.48',
      icon: Coins,
      accent: 'from-blue-600/10 to-indigo-600/5',
    },
    {
      label: 'EBITDA Margin',
      value: '22.4%',
      change: '+2.1% YoY',
      trend: 'up',
      description: 'Reflects captive waste heat recovery and alternative fuel substitution',
      submetric: 'Total EBITDA: PKR 2.89 Billion',
      icon: Percent,
      accent: 'from-emerald-600/10 to-teal-600/5',
    },
    {
      label: 'Return on Equity (ROE)',
      value: '18.2%',
      change: '+3.5% YoY',
      trend: 'up',
      description: 'Prudent capital redeployment maximizing shareholder capital returns',
      submetric: 'Return on Assets (ROA): 11.4%',
      icon: Activity,
      accent: 'from-amber-600/10 to-orange-600/5',
    },
    {
      label: 'Debt-to-Equity Ratio',
      value: '0.42x',
      change: '-0.08x Deleveraged',
      trend: 'up',
      description: 'Accelerated long-term loan repayments preserving fortress balance sheet',
      submetric: 'Interest Coverage Ratio: 6.4x',
      icon: ShieldAlert,
      accent: 'from-[#000080]/10 to-slate-600/5',
    },
  ];

  const historicalData = [
    { year: 'FY21', revenue: 8.92, ebitda: 1.72, heightRev: '55%', heightEbit: '42%' },
    { year: 'FY22', revenue: 10.45, ebitda: 2.14, heightRev: '68%', heightEbit: '56%' },
    { year: 'FY23', revenue: 11.80, ebitda: 2.38, heightRev: '78%', heightEbit: '64%' },
    { year: 'FY24', revenue: 13.25, ebitda: 2.71, heightRev: '88%', heightEbit: '75%' },
    { year: 'FY25', revenue: 14.90, ebitda: 3.34, heightRev: '100%', heightEbit: '90%' },
  ];

  const operationalRatios = [
    { title: 'Gross Profit Margin', value: '29.1%', note: '+190 bps vs FY24', icon: Layers },
    { title: 'Current Ratio', value: '1.85x', note: 'Strong liquidity buffer', icon: Activity },
    { title: 'Asset Turnover', value: '0.88x', note: 'Higher kiln utilization', icon: BarChart3 },
    { title: 'Book Value Per Share', value: 'Rs. 92.40', note: '+14.2% compound growth', icon: Coins },
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
          { label: 'Key Financial Ratios' },
        ]}
        title="Metrics of Growth."
        subtitle="EBITDA margins, EPS, and asset turnover at a glance."
      />

      {/* SECTION 2: HIGHLIGHT DASHBOARD (4-Card Bento Grid) */}
      <section className="bg-[#F1F5F9] py-20 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8B5E1A] mb-2">
                <Sparkles className="w-4 h-4 text-[#8B5E1A]" />
                <span>Audited Key Performance Indicators</span>
              </div>
              <h2 className="text-3xl font-extrabold text-[#000080] tracking-tight">
                Consolidated Financial Highlights
              </h2>
            </div>
            <div className="text-xs font-mono font-medium text-slate-500 bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-sm flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-[#000080]" />
              <span>Figures for Year Ended June 30, 2025</span>
            </div>
          </div>

          {/* 4-Card Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="relative bg-white rounded-3xl p-7 border border-slate-200/80 shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_45px_rgba(0,0,128,0.09)] transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1"
                >
                  {/* Subtle Corner Ambient Gradient */}
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.accent} rounded-bl-full pointer-events-none group-hover:scale-125 transition-transform duration-500`} />

                  <div>
                    {/* Icon & Trending Arrow */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-[#000080]/5 text-[#000080] flex items-center justify-center group-hover:bg-[#000080] group-hover:text-white transition-all duration-300">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/60 shadow-sm">
                        <TrendingUp className="w-3.5 h-3.5" />
                        <span>{stat.change}</span>
                      </div>
                    </div>

                    {/* Massive Typography Stat */}
                    <div className="text-4xl lg:text-5xl font-black text-[#000080] tracking-tight mb-2">
                      {stat.value}
                    </div>

                    <h3 className="text-sm font-bold text-slate-800 mb-2">
                      {stat.label}
                    </h3>

                    <p className="text-xs text-slate-500 leading-relaxed mb-4">
                      {stat.description}
                    </p>
                  </div>

                  {/* Submetric Bottom Tag */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-slate-600 font-mono">
                    <span>{stat.submetric}</span>
                    <ArrowUpRight className="w-4 h-4 text-[#8B5E1A] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Secondary Micro-Metrics Bar */}
          <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
            {operationalRatios.map((item, idx) => {
              const ItemIcon = item.icon;
              return (
                <div key={idx} className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-slate-200/60 shadow-sm flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-[#000080] flex items-center justify-center flex-shrink-0">
                    <ItemIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 font-medium">{item.title}</div>
                    <div className="text-lg font-extrabold text-[#000080]">{item.value}</div>
                    <div className="text-[11px] text-emerald-600 font-semibold">{item.note}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 3: HISTORICAL CHART UI (Tailwind Flex Mockup in Fecto Navy & Champagne Sand) */}
      <section className="bg-white py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#8B5E1A]">5-Year Trajectory</span>
              <h2 className="text-3xl font-bold text-[#000080] mt-1">
                Historical Revenue & EBITDA Expansion
              </h2>
              <p className="text-sm text-slate-500 mt-2 max-w-xl">
                Steady compound annual growth rate (CAGR) backed by capacity additions and progressive fossil-fuel substitution.
              </p>
            </div>

            {/* Metric Switcher Controls */}
            <div className="flex items-center gap-2 bg-[#F1F5F9] p-1.5 rounded-xl border border-slate-200">
              <button
                onClick={() => setActiveMetric('revenue')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  activeMetric === 'revenue'
                    ? 'bg-[#000080] text-[#F4D5AB] shadow-sm'
                    : 'text-slate-600 hover:text-[#000080]'
                }`}
              >
                Gross Revenue (PKR B)
              </button>
              <button
                onClick={() => setActiveMetric('ebitda')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  activeMetric === 'ebitda'
                    ? 'bg-[#000080] text-[#F4D5AB] shadow-sm'
                    : 'text-slate-600 hover:text-[#000080]'
                }`}
              >
                EBITDA (PKR B)
              </button>
            </div>
          </div>

          {/* Bar Chart Container */}
          <div className="bg-[#F8FAFC] rounded-3xl p-8 lg:p-12 border border-slate-200/80 shadow-sm relative">
            {/* Y-Axis Reference Guide Lines */}
            <div className="absolute inset-x-8 lg:inset-x-12 top-12 bottom-20 flex flex-col justify-between pointer-events-none opacity-20 border-b border-slate-400">
              <div className="border-b border-slate-400 w-full flex justify-between text-[11px] text-slate-500 -mt-2">
                <span>PKR 16.0B</span>
              </div>
              <div className="border-b border-slate-400 w-full flex justify-between text-[11px] text-slate-500 -mt-2">
                <span>PKR 12.0B</span>
              </div>
              <div className="border-b border-slate-400 w-full flex justify-between text-[11px] text-slate-500 -mt-2">
                <span>PKR 8.0B</span>
              </div>
              <div className="border-b border-slate-400 w-full flex justify-between text-[11px] text-slate-500 -mt-2">
                <span>PKR 4.0B</span>
              </div>
              <div className="w-full flex justify-between text-[11px] text-slate-500 -mt-2">
                <span>PKR 0.0B</span>
              </div>
            </div>

            {/* Flex Columns Chart Area */}
            <div className="relative z-10 h-72 flex items-end justify-between gap-4 sm:gap-8 px-4 sm:px-10">
              {historicalData.map((item) => {
                const isHovered = hoveredYear === item.year;
                const heightVal = activeMetric === 'revenue' ? item.heightRev : item.heightEbit;
                const displayVal = activeMetric === 'revenue' ? `PKR ${item.revenue}B` : `PKR ${item.ebitda}B`;

                return (
                  <div
                    key={item.year}
                    onMouseEnter={() => setHoveredYear(item.year)}
                    onMouseLeave={() => setHoveredYear(null)}
                    className="flex-1 flex flex-col items-center justify-end h-full group cursor-pointer"
                  >
                    {/* Floating Tooltip On Hover */}
                    <div className={`mb-3 transition-all duration-200 flex flex-col items-center ${
                      isHovered ? 'opacity-100 -translate-y-1' : 'opacity-80'
                    }`}>
                      <span className="text-xs font-mono font-bold text-[#000080] bg-white px-2.5 py-1 rounded-md shadow-sm border border-slate-200">
                        {displayVal}
                      </span>
                    </div>

                    {/* Bar Pillar */}
                    <div className="w-full max-w-[64px] bg-slate-200/60 rounded-t-2xl relative overflow-hidden flex items-end justify-center h-full">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: heightVal }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className={`w-full rounded-t-2xl transition-all duration-300 relative ${
                          activeMetric === 'revenue'
                            ? 'bg-gradient-to-t from-[#000080] to-[#1E3A8A] group-hover:from-[#000060] group-hover:to-[#2563EB]'
                            : 'bg-gradient-to-t from-[#8B5E1A] to-[#F4D5AB] group-hover:from-[#724C15] group-hover:to-[#e4be8c]'
                        }`}
                      >
                        {/* Glow highlight on top lip */}
                        <div className="absolute top-0 inset-x-0 h-1 bg-white/40" />
                      </motion.div>
                    </div>

                    {/* Year Label */}
                    <div className="mt-4 text-center">
                      <span className={`text-xs font-bold transition-colors ${
                        isHovered ? 'text-[#000080]' : 'text-slate-500'
                      }`}>
                        {item.year}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Chart Legend & Takeaway */}
            <div className="mt-10 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded bg-[#000080]" />
                  <span className="text-slate-600 font-medium">Fecto Navy (Revenue Growth)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded bg-[#F4D5AB] border border-[#8B5E1A]/40" />
                  <span className="text-slate-600 font-medium">Champagne Sand (Operating Cashflow)</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-slate-500 font-mono">
                <Info className="w-3.5 h-3.5 text-[#000080]" />
                <span>Audited 5-Year CAGR: +13.8%</span>
              </div>
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

