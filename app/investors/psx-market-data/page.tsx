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
  Clock, 
  Activity, 
  BarChart2, 
  Layers, 
  RefreshCw, 
  ExternalLink,
  ShieldCheck,
  Maximize2
} from 'lucide-react';

export default function PsxMarketDataPage() {
  const [timeframe, setTimeframe] = useState<'1D' | '1W' | '1M' | '1Y' | '5Y'>('1D');
  const [hoveredPoint, setHoveredPoint] = useState<{ time: string; price: string; volume: string } | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 800);
  };

  // SVG Coordinates for the smooth glowing line chart:
  // Points: (x, y) coordinates representing intraday trading prices between Rs. 41.00 and Rs. 43.10
  // viewBox: 0 0 800 320
  const chartPoints = [
    { x: 30, y: 220, time: '09:30 AM', price: 'Rs. 41.25', volume: '84,000' },
    { x: 120, y: 190, time: '10:00 AM', price: 'Rs. 41.60', volume: '142,000' },
    { x: 210, y: 240, time: '10:30 AM', price: 'Rs. 41.00', volume: '95,000' }, // Day Low
    { x: 300, y: 160, time: '11:00 AM', price: 'Rs. 41.95', volume: '210,000' },
    { x: 390, y: 110, time: '11:30 AM', price: 'Rs. 42.40', volume: '180,000' },
    { x: 480, y: 70, time: '12:00 PM', price: 'Rs. 42.90', volume: '165,000' },
    { x: 570, y: 40, time: '12:30 PM', price: 'Rs. 43.10', volume: '230,000' }, // Day High
    { x: 660, y: 120, time: '01:00 PM', price: 'Rs. 42.25', volume: '110,000' },
    { x: 720, y: 95, time: '01:30 PM', price: 'Rs. 42.50', volume: '88,000' },
    { x: 770, y: 95, time: '02:00 PM', price: 'Rs. 42.50', volume: '124,000' }, // Current Close
  ];

  const svgPathD = "M 30,220 C 80,200 90,190 120,190 C 160,190 180,240 210,240 C 250,240 270,170 300,160 C 340,150 360,120 390,110 C 430,100 450,80 480,70 C 520,60 540,40 570,40 C 610,40 630,130 660,120 C 690,110 700,95 720,95 L 770,95";
  const svgAreaD = `${svgPathD} L 770,300 L 30,300 Z`;

  return (
    <div className="min-h-screen bg-[#F1F5F9] text-slate-900 selection:bg-[#F4D5AB] selection:text-[#000080]">
      {/* 1. FLOATING NAVBAR */}
      <FectoNavbar onCtaClick={() => setQuoteModalOpen(true)} />

      {/* SECTION 1: THE UNIVERSAL HERO */}
      <InnerPageHero
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Investors', href: '#investors' },
          { label: 'Market Data' },
        ]}
        title="Real-Time Market Performance."
        subtitle="Live tracking of FECTO on the Pakistan Stock Exchange."
      />

      {/* SECTION 2: THE TICKER DASHBOARD (CRITICAL UI - Pulls up into the hero slightly) */}
      <section className="relative px-6 z-20">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-[#040814] text-white p-8 md:p-12 rounded-3xl shadow-2xl relative overflow-hidden max-w-5xl mx-auto -mt-10 z-20 border border-white/10"
        >
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

          {/* Top Bar with Live Refresh */}
          <div className="flex items-center justify-between pb-6 mb-8 border-b border-white/10 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping inline-block" />
              <span className="text-white font-mono font-bold">KSE-100 INDEX PARTICIPANT</span>
              <span className="hidden sm:inline text-slate-500">• Sector: Cement Manufacturing</span>
            </div>

            <div className="flex items-center gap-4">
              <span className="font-mono text-slate-400 text-[11px] hidden sm:inline">
                Delayed 15 mins • Automated Trading System (KATS)
              </span>
              <button
                onClick={handleRefresh}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white font-mono text-xs transition-colors"
                title="Refresh Quotes"
              >
                <RefreshCw className={`w-3 h-3 ${refreshing ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </button>
            </div>
          </div>

          {/* Core Ticker Metrics Layout */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            
            {/* Left: Ticker Symbol & Massive Price */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="px-3.5 py-1 rounded-xl bg-white/10 text-[#F4D5AB] font-mono font-extrabold text-sm border border-white/10">
                  PSX: FECTO
                </span>
                <span className="text-xs text-slate-400">Fecto Cement Limited</span>
              </div>

              <div className="flex items-baseline gap-4">
                <div className="text-5xl sm:text-6xl font-black text-white tracking-tight">
                  Rs. 42.50
                </div>
                <div className="flex items-center gap-1 text-emerald-400 text-lg sm:text-xl font-extrabold font-mono">
                  <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />
                  <span>+1.25 (+3.03%)</span>
                </div>
              </div>

              <div className="mt-3 text-xs text-slate-400 flex items-center gap-2 font-mono">
                <Clock className="w-3.5 h-3.5 text-[#F4D5AB]" />
                <span>Session Status: Continuous Trading Closed (Regular Market)</span>
              </div>
            </div>

            {/* Right: Key Trading Statistics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full lg:w-auto">
              <div className="bg-white/5 backdrop-blur-md p-3.5 rounded-2xl border border-white/10">
                <div className="text-[10px] uppercase tracking-wider text-slate-400">Today&apos;s Volume</div>
                <div className="text-lg font-bold font-mono text-white mt-0.5">1,248,500</div>
                <div className="text-[10px] text-slate-500 font-mono">Shares Traded</div>
              </div>

              <div className="bg-white/5 backdrop-blur-md p-3.5 rounded-2xl border border-white/10">
                <div className="text-[10px] uppercase tracking-wider text-slate-400">Day High / Low</div>
                <div className="text-lg font-bold font-mono text-emerald-400 mt-0.5">43.10 / 41.00</div>
                <div className="text-[10px] text-slate-500 font-mono">Spread: Rs. 2.10</div>
              </div>

              <div className="bg-white/5 backdrop-blur-md p-3.5 rounded-2xl border border-white/10">
                <div className="text-[10px] uppercase tracking-wider text-slate-400">52-Week Range</div>
                <div className="text-lg font-bold font-mono text-white mt-0.5">49.50 / 28.20</div>
                <div className="text-[10px] text-slate-500 font-mono">High / Low</div>
              </div>

              <div className="bg-white/5 backdrop-blur-md p-3.5 rounded-2xl border border-white/10">
                <div className="text-[10px] uppercase tracking-wider text-slate-400">Market Cap</div>
                <div className="text-lg font-bold font-mono text-[#F4D5AB] mt-0.5">PKR 2.13 B</div>
                <div className="text-[10px] text-slate-500 font-mono">50.16M Float</div>
              </div>

              <div className="bg-white/5 backdrop-blur-md p-3.5 rounded-2xl border border-white/10">
                <div className="text-[10px] uppercase tracking-wider text-slate-400">Previous Close</div>
                <div className="text-lg font-bold font-mono text-slate-300 mt-0.5">Rs. 41.25</div>
                <div className="text-[10px] text-slate-500 font-mono">Settlement T+2</div>
              </div>

              <div className="bg-white/5 backdrop-blur-md p-3.5 rounded-2xl border border-white/10">
                <div className="text-[10px] uppercase tracking-wider text-slate-400">P/E Ratio</div>
                <div className="text-lg font-bold font-mono text-white mt-0.5">2.93x</div>
                <div className="text-[10px] text-slate-500 font-mono">Trailing 12-Month</div>
              </div>
            </div>

          </div>
        </motion.div>
      </section>

      {/* SECTION 3: INTERACTIVE TRADING CHART MOCKUP (TradingView Style Dark-Mode Card) */}
      <section className="bg-[#F1F5F9] py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#8B5E1A]">Pro Terminal Interface</span>
              <h2 className="text-3xl font-extrabold text-[#000080] mt-1">
                Intraday & Historical Candlestick Chart
              </h2>
            </div>
            <div className="text-xs text-slate-500 font-mono">
              Live Feed API: Pakistan Stock Exchange Limited
            </div>
          </div>

          {/* Dark Mode TradingView Card Container */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-800 relative overflow-hidden">
            {/* Terminal Header & Controls */}
            <div className="flex flex-wrap items-center justify-between pb-6 mb-6 border-b border-slate-800 gap-4">
              <div className="flex items-center gap-3">
                <span className="text-base font-extrabold text-white font-mono">
                  FECTO.PSX
                </span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  REAL-TIME
                </span>
                <span className="text-xs text-slate-400 font-mono hidden md:inline">
                  O: 41.25 • H: 43.10 • L: 41.00 • C: 42.50
                </span>
              </div>

              {/* Timeframe Buttons */}
              <div className="flex items-center gap-1 bg-slate-800/80 p-1 rounded-xl border border-slate-700">
                {(['1D', '1W', '1M', '1Y', '5Y'] as const).map((tf) => (
                  <button
                    key={tf}
                    onClick={() => setTimeframe(tf)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                      timeframe === tf
                        ? 'bg-[#000080] text-[#F4D5AB] shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {tf}
                  </button>
                ))}
              </div>
            </div>

            {/* Hover Tooltip Readout */}
            <div className="h-8 flex items-center justify-between text-xs font-mono mb-2 px-2 text-slate-400">
              {hoveredPoint ? (
                <div className="flex items-center gap-4 text-emerald-400">
                  <span>Time: <strong>{hoveredPoint.time}</strong></span>
                  <span>Price: <strong>{hoveredPoint.price}</strong></span>
                  <span>Volume: <strong>{hoveredPoint.volume}</strong></span>
                </div>
              ) : (
                <span className="text-slate-500 text-[11px]">Hover over graph data nodes to inspect point-in-time price and execution volume.</span>
              )}

              <span className="text-slate-500 text-[11px] hidden sm:inline">SMA(20): 41.80 • RSI(14): 61.4</span>
            </div>

            {/* Interactive SVG Chart Canvas */}
            <div className="relative w-full h-80 sm:h-96 bg-slate-950/60 rounded-2xl p-4 border border-slate-800/80 overflow-hidden">
              
              {/* Y-Axis Price Labels */}
              <div className="absolute right-4 top-4 bottom-10 flex flex-col justify-between text-[11px] font-mono text-slate-500 pointer-events-none select-none">
                <span>Rs. 43.50</span>
                <span>Rs. 43.00</span>
                <span>Rs. 42.50</span>
                <span>Rs. 42.00</span>
                <span>Rs. 41.50</span>
                <span>Rs. 41.00</span>
              </div>

              {/* Grid Lines */}
              <div className="absolute inset-x-4 top-4 bottom-10 flex flex-col justify-between pointer-events-none opacity-10">
                <div className="border-b border-slate-300 w-full" />
                <div className="border-b border-slate-300 w-full" />
                <div className="border-b border-slate-300 w-full" />
                <div className="border-b border-slate-300 w-full" />
                <div className="border-b border-slate-300 w-full" />
                <div className="border-b border-slate-300 w-full" />
              </div>

              {/* SVG Curve */}
              <svg
                viewBox="0 0 800 320"
                className="w-full h-full overflow-visible"
                preserveAspectRatio="none"
              >
                <defs>
                  {/* Glowing Green Gradient Area */}
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10B981" stopOpacity="0.35" />
                    <stop offset="70%" stopColor="#10B981" stopOpacity="0.05" />
                    <stop offset="100%" stopColor="#10B981" stopOpacity="0.00" />
                  </linearGradient>

                  {/* Line Glow Filter */}
                  <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#10B981" floodOpacity="0.8" />
                  </filter>
                </defs>

                {/* Filled Gradient Area under curve */}
                <path
                  d={svgAreaD}
                  fill="url(#chartGradient)"
                />

                {/* Main Glowing Green Line */}
                <path
                  d={svgPathD}
                  fill="none"
                  stroke="#10B981"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  filter="url(#glow)"
                />

                {/* Interactive Data Points */}
                {chartPoints.map((pt, idx) => (
                  <g key={idx} className="cursor-pointer">
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r="5"
                      fill="#040814"
                      stroke="#10B981"
                      strokeWidth="2.5"
                      className="hover:r-7 transition-all"
                      onMouseEnter={() => setHoveredPoint({ time: pt.time, price: pt.price, volume: pt.volume })}
                      onMouseLeave={() => setHoveredPoint(null)}
                    />
                  </g>
                ))}
              </svg>

              {/* X-Axis Timestamps */}
              <div className="absolute inset-x-6 bottom-2 flex justify-between text-[11px] font-mono text-slate-500 pointer-events-none select-none">
                <span>09:30</span>
                <span>10:30</span>
                <span>11:30</span>
                <span>12:30</span>
                <span>01:30</span>
                <span>02:30</span>
                <span>03:30 (Close)</span>
              </div>
            </div>

            {/* TradingView Terminal Sub-bar */}
            <div className="mt-6 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-mono">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  Market Status: Open (09:15 - 15:30 PST)
                </span>
                <span>Lot Size: 500 Shares</span>
              </div>

              <a
                href="https://dps.psx.com.pk/company/FECTO"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-[#F4D5AB] hover:underline"
              >
                <span>View Live Order Book on PSX DPS</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
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

