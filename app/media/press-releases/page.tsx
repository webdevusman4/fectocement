'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import FectoNavbar from '@/components/FectoNavbar';
import CorporateFooter from '@/components/CorporateFooter';
import QuoteModal from '@/components/QuoteModal';
import { InnerPageHero } from '@/components/InnerPageHero';
import { 
  FileText, 
  Download, 
  Phone, 
  Mail, 
  User, 
  Building2, 
  Calendar, 
  ShieldCheck, 
  ExternalLink,
  Search,
  CheckCircle2
} from 'lucide-react';

interface PressReleaseItem {
  id: string;
  year: string;
  date: string;
  title: string;
  refNumber: string;
  fileSize: string;
  category: string;
}

export default function PressReleasesPage() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const pressReleases: PressReleaseItem[] = [
    // 2026
    {
      id: 'pr-2026-1',
      year: '2026',
      date: 'October 16, 2026',
      title: 'Fecto Cement Limited Ignites Line-3 Pyro-Processing Kiln at Sangjani Complex',
      refNumber: 'PR/FCL/2026/042',
      fileSize: '1.4 MB',
      category: 'Industrial Expansion',
    },
    {
      id: 'pr-2026-2',
      year: '2026',
      date: 'September 28, 2026',
      title: 'Board of Directors Recommends 50% Final Cash Dividend for the Financial Year 2026',
      refNumber: 'PR/FCL/2026/038',
      fileSize: '950 KB',
      category: 'Financial Announcement',
    },
    {
      id: 'pr-2026-3',
      year: '2026',
      date: 'August 12, 2026',
      title: 'Fecto Cement Signs Decarbonization Accord for Alternative Fuel Co-Processing with Punjab EPA',
      refNumber: 'PR/FCL/2026/031',
      fileSize: '1.2 MB',
      category: 'ESG & Environment',
    },
    {
      id: 'pr-2026-4',
      year: '2026',
      date: 'June 05, 2026',
      title: 'Fecto Cement Awarded Prime Supply Contract for Trans-Northern Expressway Interchanges',
      refNumber: 'PR/FCL/2026/024',
      fileSize: '1.1 MB',
      category: 'Major Infrastructure',
    },

    // 2025
    {
      id: 'pr-2025-1',
      year: '2025',
      date: 'November 20, 2025',
      title: 'Fecto Cement Successfully Completes 6 MW Waste Heat Recovery Solar Hybrid Facility',
      refNumber: 'PR/FCL/2025/049',
      fileSize: '1.5 MB',
      category: 'Clean Energy',
    },
    {
      id: 'pr-2025-2',
      year: '2025',
      date: 'September 27, 2025',
      title: 'Audited Annual Results for FY25: Profit After Tax Grows 22% Supported by Operating Efficiencies',
      refNumber: 'PR/FCL/2025/039',
      fileSize: '1.8 MB',
      category: 'Financial Announcement',
    },
    {
      id: 'pr-2025-3',
      year: '2025',
      date: 'July 14, 2025',
      title: 'Fecto Cement Renews Corporate Free Health Clinic & Technical Schooling Charter in Sangjani',
      refNumber: 'PR/FCL/2025/028',
      fileSize: '880 KB',
      category: 'CSR & Welfare',
    },

    // 2024
    {
      id: 'pr-2024-1',
      year: '2024',
      date: 'December 12, 2024',
      title: 'Fecto Cement Receives Dual Certification for ISO 9001:2015 and ISO 45001 Occupational Safety',
      refNumber: 'PR/FCL/2024/052',
      fileSize: '1.3 MB',
      category: 'Certifications',
    },
    {
      id: 'pr-2024-2',
      year: '2024',
      date: 'September 29, 2024',
      title: '42nd Annual General Meeting Concludes: Shareholders Endorse All Board Resolutions',
      refNumber: 'PR/FCL/2024/041',
      fileSize: '1.0 MB',
      category: 'Corporate Assembly',
    },
  ];

  const handleDownload = (id: string, title: string) => {
    setDownloadingId(id);
    setTimeout(() => {
      setDownloadingId(null);
      const element = document.createElement('a');
      const file = new Blob([`Fecto Cement Limited - Official Press Release\nRef: ${title}\nApproved for immediate release to media outlets.`], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = `${title.replace(/\s+/g, '_').substring(0, 40)}.pdf`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }, 600);
  };

  const years = ['2026', '2025', '2024'];

  const filteredReleases = pressReleases.filter(pr => 
    pr.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pr.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pr.refNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F1F5F9] text-slate-900 selection:bg-[#F4D5AB] selection:text-[#000080]">
      {/* 1. FLOATING NAVBAR */}
      <FectoNavbar onCtaClick={() => setQuoteModalOpen(true)} />

      {/* SECTION 1: THE UNIVERSAL HERO */}
      <InnerPageHero
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Media Center', href: '#media' },
          { label: 'Press Releases' },
        ]}
        title="Official Statements."
        subtitle="Formal press releases, leadership announcements, and official corporate communications."
      />

      {/* SECTION 2: MEDIA CONTACT DESK (Pulls up slightly into the hero) */}
      <section className="relative px-6 z-20">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-[#040814] py-12 sm:py-16 text-white rounded-3xl max-w-5xl mx-auto -mt-10 relative z-20 shadow-2xl border border-white/10 px-8 sm:px-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 overflow-hidden"
        >
          {/* Ambient Warm Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#F4D5AB] rounded-full blur-[110px] opacity-20 pointer-events-none" />

          {/* Left Text */}
          <div className="max-w-md">
            <span className="text-xs font-bold uppercase tracking-widest text-[#F4D5AB] font-mono">
              Press Relations Office
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              For Media & Press Inquiries
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
              Official interview requests, background briefings, and high-resolution broadcast assets are facilitated through our Corporate Communications Desk.
            </p>
          </div>

          {/* Right Contact Card */}
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/15 w-full md:w-auto flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#F4D5AB] text-[#000080] flex items-center justify-center flex-shrink-0 font-bold">
                <User className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">Director Corporate Communications</div>
                <div className="text-[11px] text-slate-300">Fecto Cement Limited HQ, Islamabad</div>
              </div>
            </div>

            <div className="pt-2 border-t border-white/10 space-y-2 text-xs font-mono">
              <a href="tel:+9221111786555" className="flex items-center gap-2 text-slate-200 hover:text-[#F4D5AB] transition-colors">
                <Phone className="w-4 h-4 text-[#F4D5AB]" />
                <span>+92 21 111 786 555</span>
              </a>
              <a href="mailto:pr@fectocement.com" className="flex items-center gap-2 text-slate-200 hover:text-[#F4D5AB] transition-colors">
                <Mail className="w-4 h-4 text-[#F4D5AB]" />
                <span>pr@fectocement.com</span>
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* SECTION 3: CHRONOLOGICAL PR LEDGER (Minimalist, Formal List Grouped by Year) */}
      <section className="bg-[#F1F5F9] py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4 pb-6 border-b border-slate-300/80">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#8B5E1A]">Archival Ledger</span>
              <h2 className="text-3xl font-extrabold text-[#000080] mt-1">
                Corporate Statements & Media Releases
              </h2>
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search releases by topic..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#000080]/30 text-slate-800"
              />
            </div>
          </div>

          {/* Grouped Ledger by Year */}
          <div className="space-y-12">
            {years.map((year) => {
              const yearReleases = filteredReleases.filter(r => r.year === year);
              if (yearReleases.length === 0) return null;

              return (
                <div key={year} className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs">
                  {/* Sticky-Style Year Header */}
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200">
                    <span className="text-2xl font-black text-[#000080] tracking-tight font-mono">
                      {year}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      {yearReleases.length} Official Bulletins
                    </span>
                  </div>

                  {/* Releases Rows */}
                  <div className="divide-y divide-slate-100">
                    {yearReleases.map((release) => (
                      <motion.div
                        key={release.id}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="py-5 px-3 rounded-xl hover:bg-slate-50/80 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4 group"
                      >
                        {/* Left: Date */}
                        <div className="md:w-36 flex-shrink-0 text-xs font-mono text-slate-500">
                          {release.date}
                        </div>

                        {/* Middle: Title & Ref */}
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-[#000080] px-2 py-0.5 rounded">
                              {release.category}
                            </span>
                            <span className="text-[11px] font-mono text-slate-400">
                              Ref: {release.refNumber}
                            </span>
                          </div>

                          <h3 className="text-base sm:text-lg font-bold text-[#000080] group-hover:text-[#8B5E1A] transition-colors leading-snug">
                            {release.title}
                          </h3>
                        </div>

                        {/* Right: PDF Download Button */}
                        <div className="flex-shrink-0 flex items-center gap-3">
                          <span className="text-xs font-mono text-slate-400 hidden sm:inline">
                            {release.fileSize}
                          </span>

                          <button
                            onClick={() => handleDownload(release.id, release.title)}
                            disabled={downloadingId === release.id}
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-[#000080]/5 text-[#000080] group-hover:bg-[#000080] group-hover:text-white transition-all active:scale-95 shadow-2xs"
                            title="Download Official Statement (PDF)"
                          >
                            {downloadingId === release.id ? (
                              <>
                                <div className="w-3 h-3 border-2 border-[#000080] border-t-transparent rounded-full animate-spin" />
                                <span>PDF...</span>
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

