'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FectoNavbar from '@/components/FectoNavbar';
import CorporateFooter from '@/components/CorporateFooter';
import QuoteModal from '@/components/QuoteModal';
import { InnerPageHero } from '@/components/InnerPageHero';
import { 
  FileText, 
  Download, 
  Calendar, 
  CheckCircle2, 
  Search,
  ExternalLink,
  ShieldCheck,
  TrendingUp,
  FileCheck
} from 'lucide-react';

interface ReportItem {
  id: string;
  title: string;
  period: string;
  date: string;
  fileSize: string;
  type: 'Annual' | 'Quarterly' | 'Half-Yearly';
  highlights: string[];
}

const reportsData: Record<string, ReportItem[]> = {
  '2026': [
    {
      id: '2026-q1',
      title: 'Q1 Condensed Interim Financial Statements',
      period: 'For the Three Months Ended Sep 30, 2025',
      date: 'October 28, 2025',
      fileSize: '3.8 MB',
      type: 'Quarterly',
      highlights: ['Revenue: PKR 4.12B', 'Gross Margin: 28.4%', 'Capacity Util: 84%'],
    },
    {
      id: '2026-q2',
      title: 'Q2 Half-Yearly Financial Statements (Auditor Reviewed)',
      period: 'For the Six Months Ended Dec 31, 2025',
      date: 'February 24, 2026',
      fileSize: '5.2 MB',
      type: 'Half-Yearly',
      highlights: ['Revenue: PKR 8.45B', 'EBITDA: PKR 1.89B', 'Deleveraging: -14% Debt'],
    },
    {
      id: '2026-q3',
      title: 'Q3 Nine Months Financial Results',
      period: 'For the Nine Months Ended Mar 31, 2026',
      date: 'April 27, 2026',
      fileSize: '4.1 MB',
      type: 'Quarterly',
      highlights: ['Revenue: PKR 12.9B', 'Export Growth: +22%', 'PAT: PKR 1.48B'],
    },
    {
      id: '2026-annual',
      title: 'Annual Audited Financial Report 2026',
      period: 'Full Year Ended June 30, 2026',
      date: 'September 28, 2026',
      fileSize: '14.6 MB',
      type: 'Annual',
      highlights: ['Full Audited Statements', 'Directors & Auditor Report', 'Notice of 44th AGM'],
    },
  ],
  '2025': [
    {
      id: '2025-q1',
      title: 'Q1 Condensed Interim Accounts',
      period: 'Three Months Ended Sep 30, 2024',
      date: 'October 29, 2024',
      fileSize: '3.4 MB',
      type: 'Quarterly',
      highlights: ['Revenue: PKR 3.85B', 'Energy Cost Optimization', 'Local Market Share 7.8%'],
    },
    {
      id: '2025-q2',
      title: 'Q2 Half-Year Financial Report',
      period: 'Six Months Ended Dec 31, 2024',
      date: 'February 26, 2025',
      fileSize: '4.9 MB',
      type: 'Half-Yearly',
      highlights: ['KPMG Taseer Hadi Review', 'Gross Profit: PKR 2.1B', 'EPS: Rs. 6.80'],
    },
    {
      id: '2025-q3',
      title: 'Q3 Financial Statements',
      period: 'Nine Months Ended Mar 31, 2025',
      date: 'April 28, 2025',
      fileSize: '3.9 MB',
      type: 'Quarterly',
      highlights: ['Revenue: PKR 11.6B', 'Solar Plant Integration', 'Finance Cost Down 18%'],
    },
    {
      id: '2025-annual',
      title: 'Annual Report & Financial Statements 2025',
      period: 'Year Ended June 30, 2025',
      date: 'September 26, 2025',
      fileSize: '13.8 MB',
      type: 'Annual',
      highlights: ['Chairman Review', 'Complete Notes & Cashflow', 'Dividend Recommendation'],
    },
  ],
  '2024': [
    {
      id: '2024-q1',
      title: 'Q1 Financial Report',
      period: 'Three Months Ended Sep 30, 2023',
      date: 'October 27, 2023',
      fileSize: '3.1 MB',
      type: 'Quarterly',
      highlights: ['Turnover: PKR 3.42B', 'Coal Mix Diversification', 'Stable Cement Margins'],
    },
    {
      id: '2024-q2',
      title: 'Q2 Half-Year Report',
      period: 'Six Months Ended Dec 31, 2023',
      date: 'February 27, 2024',
      fileSize: '4.5 MB',
      type: 'Half-Yearly',
      highlights: ['Auditor Review Statement', 'Operating Profit: PKR 1.62B', 'Working Capital Sound'],
    },
    {
      id: '2024-q3',
      title: 'Q3 Financial Report',
      period: 'Nine Months Ended Mar 31, 2024',
      date: 'April 29, 2024',
      fileSize: '3.7 MB',
      type: 'Quarterly',
      highlights: ['Revenue: PKR 10.4B', 'Capacity Expansion Update', 'PAT: PKR 1.15B'],
    },
    {
      id: '2024-annual',
      title: 'Annual Audited Report 2024',
      period: 'Year Ended June 30, 2024',
      date: 'September 27, 2024',
      fileSize: '12.4 MB',
      type: 'Annual',
      highlights: ['Best Corporate Report Award Nominee', 'ESRS Standards Compliance', 'Final Dividend Disbursed'],
    },
  ],
  'Archive': [
    {
      id: '2023-annual',
      title: 'Annual Report 2023',
      period: 'Full Year Ended June 30, 2023',
      date: 'September 28, 2023',
      fileSize: '11.8 MB',
      type: 'Annual',
      highlights: ['Audited Accounts', 'PSX Disclosure Archive', 'Pattern of Shareholding'],
    },
    {
      id: '2022-annual',
      title: 'Annual Report 2022',
      period: 'Full Year Ended June 30, 2022',
      date: 'September 29, 2022',
      fileSize: '10.5 MB',
      type: 'Annual',
      highlights: ['Post-COVID Recovery Surge', '40th Anniversary Retrospective', '40% Dividend Paid'],
    },
    {
      id: '2021-annual',
      title: 'Annual Report 2021',
      period: 'Full Year Ended June 30, 2021',
      date: 'September 28, 2021',
      fileSize: '9.8 MB',
      type: 'Annual',
      highlights: ['Record Production Milestone', 'Refractory Kiln Upgrade', 'Modernization Report'],
    },
    {
      id: '2020-annual',
      title: 'Annual Report 2020',
      period: 'Full Year Ended June 30, 2020',
      date: 'October 12, 2020',
      fileSize: '9.2 MB',
      type: 'Annual',
      highlights: ['Business Continuity Protocol', 'Supply Chain Resilience', 'Auditor Certified'],
    },
  ],
};

const years = ['2026', '2025', '2024', 'Archive'];

export default function ReportsPage() {
  const [selectedYear, setSelectedYear] = useState('2026');
  const [searchQuery, setSearchQuery] = useState('');
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);

  const activeReports = reportsData[selectedYear].filter(r => 
    r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.period.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDownload = (id: string, title: string) => {
    setDownloadingId(id);
    setTimeout(() => {
      setDownloadingId(null);
      // Create a mock download trigger
      const element = document.createElement('a');
      const file = new Blob([`Fecto Cement Limited - Official Financial Document: ${title}\nAudited and filed with PSX / SECP.`], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = `${title.replace(/\s+/g, '_')}.pdf`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#F1F5F9] text-slate-900 selection:bg-[#F4D5AB] selection:text-[#000080]">
      {/* 1. FLOATING NAVBAR */}
      <FectoNavbar onCtaClick={() => setQuoteModalOpen(true)} />

      {/* SECTION 1: THE UNIVERSAL HERO */}
      <InnerPageHero
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Investors', href: '#investors' },
          { label: 'Financial Reports' },
        ]}
        title="Financial Transparency."
        subtitle="Audited statements and comprehensive financial health reports."
      />

      {/* SECTION 2: YEAR FILTER TOGGLE (Sticky Tab Bar) */}
      <section className="bg-[#F1F5F9] pt-8 pb-4 sticky top-20 z-30 backdrop-blur-md bg-[#F1F5F9]/90 border-b border-slate-200/80 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Framer Motion LayoutId Tab Bar */}
          <div className="flex items-center gap-2 bg-slate-200/80 p-1.5 rounded-2xl border border-slate-300/60 shadow-inner">
            {years.map((year) => {
              const isActive = selectedYear === year;
              return (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={`relative px-6 py-2.5 rounded-xl text-sm font-bold transition-colors duration-200 ${
                    isActive ? 'text-[#000080]' : 'text-slate-600 hover:text-[#000080]'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeReportYear"
                      className="absolute inset-0 bg-white rounded-xl shadow-md border border-slate-200/60"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    {year === 'Archive' ? 'Historical Archive' : `Fiscal Year ${year}`}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Quick Search */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search reports or quarters..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#000080]/30 text-slate-800 placeholder-slate-400"
            />
          </div>
        </div>
      </section>

      {/* SECTION 3: DOWNLOAD GRID (4-Column Grid of glass-arctic Cards with Expanding Navy Bottom-Border) */}
      <section className="bg-[#F1F5F9] py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
            <div>
              <h2 className="text-2xl font-bold text-[#000080]">
                {selectedYear === 'Archive' ? 'Historical Archive Statements' : `Financial Statements — Fiscal Year ${selectedYear}`}
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Download verified, statutory PDFs submitted to the Pakistan Stock Exchange (PSX) and SECP.
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-xs font-mono font-medium px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-600">
              <FileCheck className="w-4 h-4 text-emerald-600" />
              <span>4 Documents Available</span>
            </div>
          </div>

          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {activeReports.map((report) => (
                <motion.div
                  key={report.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="group relative bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,128,0.08)] transition-all duration-300 flex flex-col justify-between overflow-hidden"
                >
                  {/* Expanding Navy Bottom-Border Hover Effect */}
                  <span className="absolute bottom-0 left-0 w-0 h-1.5 bg-[#000080] group-hover:w-full transition-all duration-300 ease-in-out" />

                  {/* Top Badge & Type */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className={`px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${
                        report.type === 'Annual'
                          ? 'bg-[#000080] text-[#F4D5AB]'
                          : 'bg-slate-100 text-[#000080] border border-slate-200'
                      }`}>
                        {report.type}
                      </span>
                      <span className="text-xs font-mono font-medium text-slate-500">
                        {report.fileSize}
                      </span>
                    </div>

                    {/* PDF Icon Graphic */}
                    <div className="w-12 h-12 rounded-xl bg-[#000080]/5 text-[#000080] flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-[#000080] group-hover:text-white transition-all duration-300">
                      <FileText className="w-6 h-6" />
                    </div>

                    {/* Titles */}
                    <h3 className="text-base font-bold text-[#000080] group-hover:text-[#8B5E1A] transition-colors leading-snug mb-2">
                      {report.title}
                    </h3>
                    <p className="text-xs text-slate-500 mb-4 line-clamp-2">
                      {report.period}
                    </p>

                    {/* Bullet Highlights */}
                    <div className="space-y-1.5 mb-6 pt-3 border-t border-slate-100">
                      {report.highlights.map((h, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-xs text-slate-600">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Action Footer */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400 flex items-center gap-1 font-mono">
                      <Calendar className="w-3 h-3" />
                      {report.date}
                    </span>

                    <button
                      onClick={() => handleDownload(report.id, report.title)}
                      disabled={downloadingId === report.id}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#000080]/5 text-[#000080] hover:bg-[#000080] hover:text-white transition-all active:scale-95"
                    >
                      {downloadingId === report.id ? (
                        <>
                          <div className="w-3 h-3 border-2 border-[#000080] border-t-transparent rounded-full animate-spin" />
                          <span>Saving...</span>
                        </>
                      ) : (
                        <>
                          <Download className="w-3.5 h-3.5" />
                          <span>PDF</span>
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Compliance Assurance Footer Callout */}
          <div className="mt-12 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#000080]">Statutory Auditor Verification</h4>
                <p className="text-xs text-slate-500">
                  Annual accounts are audited by KPMG Taseer Hadi & Co. in strict compliance with the Companies Act 2017 & IFRS standards.
                </p>
              </div>
            </div>
            <a
              href="/investors/psx-disclosures"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#000080] hover:text-[#8B5E1A] hover:underline whitespace-nowrap"
            >
              <span>View PSX Disclosures</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
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

