'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import FectoNavbar from '@/components/FectoNavbar';
import CorporateFooter from '@/components/CorporateFooter';
import QuoteModal from '@/components/QuoteModal';
import { InnerPageHero } from '@/components/InnerPageHero';
import { 
  Bell, 
  FileText, 
  ArrowUpRight, 
  Search, 
  ExternalLink, 
  CheckCircle2, 
  Radio, 
  Download, 
  Clock, 
  ShieldCheck,
  Send
} from 'lucide-react';

interface DisclosureItem {
  id: string;
  datetime: string;
  category: string;
  title: string;
  description: string;
  pdfSize: string;
  psxRef: string;
}

export default function PsxDisclosuresPage() {
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);

  const categories = ['All', 'Financial Results', 'Board Meeting', 'Material Information', 'Statutory / AGM'];

  const disclosures: DisclosureItem[] = [
    {
      id: 'd-1',
      datetime: '28 OCT 2026 • 10:15 AM',
      category: 'Financial Results',
      title: 'Financial Results for the Quarter Ended September 30, 2026',
      description: 'Transmission of Quarterly Report for the period ended September 30, 2026 under PSX Rule Book Clause 5.6.1.',
      pdfSize: '1.4 MB',
      psxRef: 'FECTO/PSX/26-104',
    },
    {
      id: 'd-2',
      datetime: '15 OCT 2026 • 03:45 PM',
      category: 'Board Meeting',
      title: 'Notice of Board of Directors Meeting & Closed Period',
      description: 'Meeting of the Board to consider and approve Q1 Financial Statements and declare closed period under PSX regulations.',
      pdfSize: '480 KB',
      psxRef: 'FECTO/PSX/26-098',
    },
    {
      id: 'd-3',
      datetime: '26 SEP 2026 • 11:30 AM',
      category: 'Financial Results',
      title: 'Annual Audited Accounts FY26 & Declaration of Final Cash Dividend',
      description: 'Announcement of audited annual financial results for year ended June 30, 2026 with recommended final dividend of Rs. 5.00/share.',
      pdfSize: '2.8 MB',
      psxRef: 'FECTO/PSX/26-089',
    },
    {
      id: 'd-4',
      datetime: '12 AUG 2026 • 09:20 AM',
      category: 'Material Information',
      title: 'Commissioning of 6 MW Waste Heat Recovery Solar Hybrid System',
      description: 'Disclosure of Price Sensitive Material Information regarding operational launch of captive clean energy expansion at Sangjani plant.',
      pdfSize: '890 KB',
      psxRef: 'FECTO/PSX/26-074',
    },
    {
      id: 'd-5',
      datetime: '04 JUL 2026 • 02:10 PM',
      category: 'Statutory / AGM',
      title: 'Notice of Book Closure & Dispatch of Dividend Warrants',
      description: 'Intimation of book closure dates and electronic credit of dividend to registered CDC shareholders through designated clearing banks.',
      pdfSize: '620 KB',
      psxRef: 'FECTO/PSX/26-061',
    },
    {
      id: 'd-6',
      datetime: '18 MAY 2026 • 04:00 PM',
      category: 'Material Information',
      title: 'Early Retirement of Long-Term Syndicate Debt Facility',
      description: 'Voluntary prepayment of PKR 450 Million long-term bank syndicate financing reducing corporate debt service burden.',
      pdfSize: '710 KB',
      psxRef: 'FECTO/PSX/26-048',
    },
  ];

  const filteredDisclosures = disclosures.filter((item) => {
    const matchesCat = filterCategory === 'All' || item.category === filterCategory;
    const matchesQuery = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.psxRef.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setEmailInput('');
      }, 2500);
    }
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
          { label: 'PSX Disclosures' },
        ]}
        title="Material Information."
        subtitle="Real-time regulatory filings and corporate briefings."
      />

      {/* SECTION 2: LIVE FEED UI (Terminal Style List) */}
      <section className="bg-[#F1F5F9] py-20 border-b border-slate-200/60">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700 mb-2">
                <Radio className="w-3.5 h-3.5 animate-pulse text-emerald-600" />
                <span>Pakistan Stock Exchange Live Dispatch</span>
              </div>
              <h2 className="text-3xl font-extrabold text-[#000080]">
                Corporate & Material Announcements
              </h2>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search PSX announcements..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#000080]/30 shadow-xs text-slate-800 placeholder-slate-400"
              />
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  filterCategory === cat
                    ? 'bg-[#000080] text-[#F4D5AB] shadow-sm'
                    : 'bg-white text-slate-600 hover:text-[#000080] border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Feed Container */}
          <div className="space-y-4">
            {filteredDisclosures.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_30px_rgba(0,0,128,0.06)] hover:border-[#000080]/20 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 group"
              >
                {/* Left Column: Date/Time Badge */}
                <div className="md:w-56 flex-shrink-0">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-[#000080] font-mono text-xs font-bold border border-slate-200">
                    <Clock className="w-3.5 h-3.5 text-[#8B5E1A]" />
                    <span>{item.datetime}</span>
                  </div>
                  <div className="mt-2 text-[11px] font-mono text-slate-400">
                    Ref: {item.psxRef}
                  </div>
                </div>

                {/* Right Column: Content & Category */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200/60">
                      {item.category}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">
                      Size: {item.pdfSize}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-[#000080] transition-colors leading-snug mb-1">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-500 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Read PDF Action */}
                <div className="flex-shrink-0 self-start md:self-center">
                  <button
                    onClick={() => alert(`Opening PDF document: ${item.title}`)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-[#000080]/5 text-[#000080] group-hover:bg-[#000080] group-hover:text-white transition-all shadow-xs"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Read PDF</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))}

            {filteredDisclosures.length === 0 && (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
                <p className="text-sm text-slate-500 font-medium">
                  No announcements found matching your search filter.
                </p>
              </div>
            )}
          </div>

          {/* PSX Official Verification Footer */}
          <div className="mt-8 flex items-center justify-between text-xs text-slate-500 font-mono">
            <span>Official PSX Terminal: FECTO</span>
            <a 
              href="https://dps.psx.com.pk/company/FECTO" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-[#000080] hover:text-[#8B5E1A] font-bold hover:underline"
            >
              <span>View PSX Official Data Portal</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 3: ALERT SUBSCRIPTION (Clean Dark-Navy Box) */}
      <section className="bg-[#F1F5F9] py-20">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-[#000080] via-[#000050] to-[#040814] text-white p-10 md:p-14 rounded-3xl shadow-2xl relative overflow-hidden border border-white/10"
          >
            {/* Ambient Warm Orb in Top-Right */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#F4D5AB] rounded-full blur-[100px] opacity-25 pointer-events-none" />

            <div className="relative z-10 text-center max-w-2xl mx-auto">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/10 text-[#F4D5AB] mb-6 backdrop-blur-md border border-white/10">
                <Bell className="w-7 h-7" />
              </div>

              <h2 className="text-3xl font-extrabold text-white tracking-tight mb-3">
                Subscribe to Investor Alerts
              </h2>

              <p className="text-slate-300 text-sm leading-relaxed mb-8">
                Receive instant statutory disclosures, board resolutions, quarterly statements, and dividend notices delivered straight to your inbox in real time.
              </p>

              {subscribed ? (
                <div className="bg-emerald-500/20 border border-emerald-400/40 rounded-2xl p-4 flex items-center justify-center gap-2 text-emerald-200 text-sm font-bold">
                  <CheckCircle2 className="w-5 h-5 text-emerald-300" />
                  <span>Subscription confirmed! You will receive all future PSX material filings.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                  <input
                    type="email"
                    required
                    placeholder="Enter corporate or personal email..."
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className="flex-1 px-5 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#F4D5AB] backdrop-blur-md"
                  />
                  <button
                    type="submit"
                    className="px-7 py-3.5 rounded-xl bg-[#F4D5AB] text-[#000080] font-extrabold text-sm hover:bg-white transition-all shadow-lg flex items-center justify-center gap-2 active:scale-95"
                  >
                    <span>Subscribe</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}

              <p className="text-[11px] text-slate-400 mt-4">
                We respect your privacy. No spam. One-click unsubscription at any time.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CORPORATE MEGA FOOTER */}
      <CorporateFooter onRequestQuote={() => setQuoteModalOpen(true)} />

      {/* INTERACTIVE QUOTE MODAL */}
      <QuoteModal isOpen={quoteModalOpen} onClose={() => setQuoteModalOpen(false)} />
    </div>
  );
}

