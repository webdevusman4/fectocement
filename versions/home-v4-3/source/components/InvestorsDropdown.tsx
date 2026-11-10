'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TrendingUp,
  FileText,
  Users,
  ShieldCheck,
  ArrowUpRight,
  Download,
  PieChart,
  Bell,
  AlertCircle
} from 'lucide-react';

interface DropdownProps {
  isOpen: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onSelectLink?: (link: string) => void;
}

const springTransition = { type: "spring" as const, stiffness: 350, damping: 25 };

export const InvestorsDropdown: React.FC<DropdownProps> = ({
  isOpen,
  onMouseEnter,
  onMouseLeave,
  onSelectLink,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="region"
          aria-label="Investors submenu"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          className="absolute left-1/2 -translate-x-1/2 top-full w-[840px]"
          style={{ zIndex: 50 }}
        >
          {/* Invisible hover bridge — pt-4 ensures dropdown never closes when cursor moves down */}
          <div className="pt-4">
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              transition={springTransition}
              className="bg-white/95 backdrop-blur-2xl shadow-[0_30px_60px_-15px_rgba(0,0,128,0.15)] border border-white rounded-2xl p-7 relative overflow-hidden"
            >
              {/* Header Bar */}
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#000080]/10">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#000080]/10 text-[#000080]">
                    <TrendingUp className="w-4 h-4" />
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-[#000080] tracking-wide">
                      Investor Relations & Shareholder Services
                    </h3>
                    <p className="text-xs text-slate-500 font-normal">
                      Pakistan Stock Exchange Listed • PSX Symbol: <strong className="text-[#000080] font-mono">FECTO</strong>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-emerald-50 text-emerald-600 border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    PSX: FECTO
                  </span>
                </div>
              </div>

              {/* 3-Column Custom B2B Industrial Layout */}
              <div className="grid grid-cols-3 gap-6">

                {/* ============================================================ */}
                {/* COLUMN 1: FINANCIAL PERFORMANCE                              */}
                {/* ============================================================ */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8B5E1A]">
                    <FileText className="w-3.5 h-3.5 text-[#8B5E1A]" />
                    <span>Financial Performance</span>
                  </div>
                  <ul className="space-y-1 text-sm">
                    <li>
                      <a
                        href="/investors/reports"
                        onClick={() => onSelectLink?.('Annual & Quarterly Reports')}
                        className="group flex flex-col p-2.5 rounded-xl transition-all duration-200 hover:bg-[#000080]/5"
                      >
                        <div className="font-semibold text-[#000080] flex items-center justify-between">
                          <span>Annual & Quarterly Reports</span>
                          <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#8B5E1A]" />
                        </div>
                        <span className="text-xs text-slate-500 mt-0.5 font-normal">
                          Audited statements FY24, FY23 & Q3
                        </span>
                      </a>
                    </li>
                    <li>
                      <a
                        href="/investors/financial-ratios"
                        onClick={() => onSelectLink?.('Key Financial Ratios')}
                        className="group flex flex-col p-2.5 rounded-xl transition-all duration-200 hover:bg-[#000080]/5"
                      >
                        <div className="font-semibold text-[#000080] flex items-center justify-between">
                          <span>Key Financial Ratios</span>
                          <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#8B5E1A]" />
                        </div>
                        <span className="text-xs text-slate-500 mt-0.5 font-normal">
                          EBITDA margins, EPS, debt & asset turnover
                        </span>
                      </a>
                    </li>
                  </ul>
                </div>

                {/* ============================================================ */}
                {/* COLUMN 2: SHAREHOLDER SERVICES                               */}
                {/* ============================================================ */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8B5E1A]">
                    <Users className="w-3.5 h-3.5 text-[#8B5E1A]" />
                    <span>Shareholder Services</span>
                  </div>
                  <ul className="space-y-1 text-sm">
                    <li>
                      <a
                        href="/investors/pattern-of-shareholding"
                        onClick={() => onSelectLink?.('Pattern of Shareholding')}
                        className="group flex flex-col p-2.5 rounded-xl transition-all duration-200 hover:bg-[#000080]/5"
                      >
                        <div className="font-semibold text-[#000080] flex items-center justify-between">
                          <span>Pattern of Shareholding</span>
                          <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#8B5E1A]" />
                        </div>
                        <span className="text-xs text-slate-500 mt-0.5 font-normal">
                          Ownership profile, CDC & public float
                        </span>
                      </a>
                    </li>
                    <li>
                      <a
                        href="/investors/dividend-declarations"
                        onClick={() => onSelectLink?.('Dividend Declarations')}
                        className="group flex flex-col p-2.5 rounded-xl transition-all duration-200 hover:bg-[#000080]/5"
                      >
                        <div className="font-semibold text-[#000080] flex items-center justify-between">
                          <span>Dividend Declarations</span>
                          <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#8B5E1A]" />
                        </div>
                        <span className="text-xs text-slate-500 mt-0.5 font-normal">
                          Historical payouts, cash/bonus entitlements
                        </span>
                      </a>
                    </li>
                    <li>
                      <a
                        href="/investors/agm-eogm-notices"
                        onClick={() => onSelectLink?.('AGM & EOGM Notices')}
                        className="group flex flex-col p-2.5 rounded-xl transition-all duration-200 hover:bg-[#000080]/5"
                      >
                        <div className="font-semibold text-[#000080] flex items-center justify-between">
                          <span>AGM & EOGM Notices</span>
                          <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#8B5E1A]" />
                        </div>
                        <span className="text-xs text-slate-500 mt-0.5 font-normal">
                          General meeting notices, proxy forms & minutes
                        </span>
                      </a>
                    </li>
                  </ul>
                </div>

                {/* ============================================================ */}
                {/* COLUMN 3: REGULATORY & COMPLIANCE                            */}
                {/* ============================================================ */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8B5E1A]">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#8B5E1A]" />
                    <span>Regulatory & Compliance</span>
                  </div>
                  <ul className="space-y-1 text-sm">
                    <li>
                      <a
                        href="/investors/psx-disclosures"
                        onClick={() => onSelectLink?.('PSX Disclosures')}
                        className="group flex flex-col p-2.5 rounded-xl transition-all duration-200 hover:bg-[#000080]/5"
                      >
                        <div className="font-semibold text-[#000080] flex items-center justify-between">
                          <span>PSX Disclosures</span>
                          <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#8B5E1A]" />
                        </div>
                        <span className="text-xs text-slate-500 mt-0.5 font-normal">
                          Material information & regulatory filings
                        </span>
                      </a>
                    </li>
                    <li>
                      <a
                        href="/investors/grievances"
                        onClick={() => onSelectLink?.('Investor Grievances')}
                        className="group flex flex-col p-2.5 rounded-xl transition-all duration-200 hover:bg-[#000080]/5"
                      >
                        <div className="font-semibold text-[#000080] flex items-center justify-between">
                          <span>Investor Grievances</span>
                          <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#8B5E1A]" />
                        </div>
                        <span className="text-xs text-slate-500 mt-0.5 font-normal">
                          Share registrar liaison & SECP compliance
                        </span>
                      </a>
                    </li>
                    <li>
                      <a
                        href="/investors/corporate-governance"
                        onClick={() => onSelectLink?.('Corporate Governance')}
                        className="group flex flex-col p-2.5 rounded-xl transition-all duration-200 hover:bg-[#000080]/5"
                      >
                        <div className="font-semibold text-[#000080] flex items-center justify-between">
                          <span>Corporate Governance</span>
                          <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#8B5E1A]" />
                        </div>
                        <span className="text-xs text-slate-500 mt-0.5 font-normal">
                          Code of corporate governance & ethics charter
                        </span>
                      </a>
                    </li>
                  </ul>
                </div>

              </div>

              {/* Bottom Callout Bar */}
              <div className="mt-6 pt-4 border-t border-[#000080]/10 flex items-center justify-between text-xs text-slate-500 font-normal">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Central Depository Company (CDC) Share Registrar Facilitation Active
                </span>
                <a
                  href="/investors/psx-market-data"
                  className="font-bold text-[#000080] hover:text-[#8B5E1A] transition-colors flex items-center gap-1"
                >
                  View PSX Market Data →
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default InvestorsDropdown;
