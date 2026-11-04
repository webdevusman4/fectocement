'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import FectoNavbar from '@/components/FectoNavbar';
import CorporateFooter from '@/components/CorporateFooter';
import QuoteModal from '@/components/QuoteModal';
import { InnerPageHero } from '@/components/InnerPageHero';
import { 
  Calendar, 
  ArrowRight, 
  ArrowUpRight, 
  Tag, 
  Search, 
  CheckCircle2, 
  Clock, 
  Share2, 
  Building2,
  Sparkles,
  ExternalLink
} from 'lucide-react';

interface NewsItem {
  id: string;
  title: string;
  category: 'Corporate' | 'Operations' | 'Events';
  date: string;
  readTime: string;
  image: string;
  excerpt: string;
}

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [activeStory, setActiveStory] = useState<string | null>(null);

  const categories = ['All', 'Corporate', 'Operations', 'Events'];

  const newsList: NewsItem[] = [
    {
      id: 'news-1',
      title: 'Commissioning of 6 MW Captive Solar & Waste Heat Recovery Hybrid Array',
      category: 'Operations',
      date: 'September 22, 2026',
      readTime: '4 min read',
      image: '/images/company-plant.jpg',
      excerpt: 'Fecto Cement successfully synchronizes its state-of-the-art captive solar array with the Sangjani electrical grid, replacing 18% of conventional grid power with clean decentralized energy.',
    },
    {
      id: 'news-2',
      title: 'Fecto Cement Recognized at PSX Top 25 Companies Excellence Awards',
      category: 'Corporate',
      date: 'August 14, 2026',
      readTime: '3 min read',
      image: '/images/company-hq.jpg',
      excerpt: 'Honored by the Pakistan Stock Exchange for sustained shareholder returns, transparent financial disclosures, and rigorous corporate governance standards.',
    },
    {
      id: 'news-3',
      title: 'Fecto Cement Hosts National Infrastructure Engineering Colloquium 2026',
      category: 'Events',
      date: 'July 28, 2026',
      readTime: '5 min read',
      image: '/herobg.jpg',
      excerpt: 'Over 200 structural consultants, PEC engineers, and public works planners convene at the corporate headquarters to discuss low-carbon clinker binders and high-strength mass concrete.',
    },
    {
      id: 'news-4',
      title: 'Expansion of Sangjani High-Speed Automated Bulk Dispatch Terminals',
      category: 'Operations',
      date: 'June 18, 2026',
      readTime: '3 min read',
      image: '/images/company-plant.jpg',
      excerpt: 'Adding four automated pneumatic loading bays capable of dispatching 300 bulk tankers per day directly to motorway and dam infrastructure contractors.',
    },
    {
      id: 'news-5',
      title: 'Annual General Meeting Approves Record Final Cash Dividend for FY26',
      category: 'Corporate',
      date: 'May 30, 2026',
      readTime: '2 min read',
      image: '/images/company-hq.jpg',
      excerpt: 'Shareholders overwhelmingly ratify executive recommendations, endorsing strong balance sheet deleveraging and a 50% dividend payout.',
    },
    {
      id: 'news-6',
      title: 'Fecto CSR Incepts Free Community Vocational Center in Sangjani',
      category: 'Events',
      date: 'April 12, 2026',
      readTime: '4 min read',
      image: '/herobg.jpg',
      excerpt: 'Providing certified mechanical, electrical, and welding apprenticeships to youth from surrounding communities in collaboration with TEVTA.',
    },
  ];

  const filteredNews = newsList.filter(item => {
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#F1F5F9] text-slate-900 selection:bg-[#F4D5AB] selection:text-[#000080]">
      {/* 1. FLOATING NAVBAR */}
      <FectoNavbar onCtaClick={() => setQuoteModalOpen(true)} />

      {/* SECTION 1: THE UNIVERSAL HERO */}
      <InnerPageHero
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Media Center', href: '#media' },
          { label: 'News' },
        ]}
        title="The Latest at Fecto."
        subtitle="Corporate milestones, operational updates, and industry developments."
      />

      {/* SECTION 2: FEATURED NEWS HIGHLIGHT (Full-Width Card) */}
      <section className="bg-[#F1F5F9] py-24 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8B5E1A] mb-6">
            <Sparkles className="w-4 h-4 text-[#8B5E1A]" />
            <span>Featured Headline Story</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-200/80 flex flex-col lg:flex-row group"
          >
            {/* Left Half: High-Res Image of Factory Expansion */}
            <div className="lg:w-1/2 relative min-h-[380px] lg:min-h-[480px] overflow-hidden">
              <Image
                src="/images/company-plant.jpg"
                alt="Fecto Cement Line-3 Operations Plant"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden" />
              <div className="absolute top-6 left-6">
                <span className="px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#000080] text-[#F4D5AB] shadow-md">
                  Major Expansion Milestone
                </span>
              </div>
            </div>

            {/* Right Half: Details & Excerpt */}
            <div className="lg:w-1/2 p-8 sm:p-12 lg:p-14 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-4 text-xs text-slate-500 font-mono mb-4">
                  <span className="flex items-center gap-1.5 text-[#000080] font-bold">
                    <Calendar className="w-4 h-4 text-[#8B5E1A]" />
                    October 15, 2026
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    6 min read
                  </span>
                  <span>•</span>
                  <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60">
                    Operations
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#000080] leading-tight mb-4 group-hover:text-[#8B5E1A] transition-colors">
                  Fecto Cement Successfully Commences Line-3 Operations
                </h2>

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
                  Marking a defining milestone in northern industrial capacity, Fecto Cement Limited has officially ignited its European-engineered Line-3 pyro-processing kiln at the Sangjani manufacturing complex. The expansion scales annual clinker throughput past 2.8 million metric tons while introducing computerized biomass alternative fuel co-processing that cuts fossil fuel emissions by 24%.
                </p>

                <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 mb-8 text-xs font-mono text-slate-700">
                  <div>
                    <span className="block text-slate-400">Capacity Added:</span>
                    <strong className="text-[#000080] font-bold text-sm">+8,500 TPD Clinker</strong>
                  </div>
                  <div>
                    <span className="block text-slate-400">Emission Reductions:</span>
                    <strong className="text-emerald-700 font-bold text-sm">-24% CO2 Intensity</strong>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                <button
                  onClick={() => alert('Opening full article: Fecto Cement Line-3 Operations Commenced...')}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#F4D5AB] text-[#000080] font-extrabold text-xs shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <span>Read Full Story</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button 
                  onClick={() => alert('Link copied to clipboard!')}
                  className="p-2.5 rounded-xl text-slate-400 hover:text-[#000080] hover:bg-slate-100 transition-colors"
                  title="Share Story"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 3: FILTERED NEWS GRID (3-Column Grid with Filter Pills) */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6 pb-6 border-b border-slate-200">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#8B5E1A]">Corporate Archive</span>
              <h2 className="text-3xl font-extrabold text-[#000080] mt-1">
                News & Event Bulletins
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Displaying official announcements across our corporate, technical, and social spheres.
              </p>
            </div>

            {/* Keyword Search */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search news & announcements..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#F8FAFC] rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#000080]/30 text-slate-800"
              />
            </div>
          </div>

          {/* Sticky Filter Pills Row */}
          <div className="flex flex-wrap gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#000080] text-[#F4D5AB] shadow-sm'
                    : 'bg-[#F1F5F9] text-slate-600 hover:text-[#000080]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* 3-Column News Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredNews.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="bg-[#F8FAFC] rounded-3xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5"
                >
                  <div>
                    {/* Thumbnail Image */}
                    <div className="relative h-52 w-full overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/95 text-[#000080] backdrop-blur-md shadow-xs">
                          {item.category}
                        </span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-3">
                        <Calendar className="w-3.5 h-3.5 text-[#8B5E1A]" />
                        <span>{item.date}</span>
                        <span>•</span>
                        <span>{item.readTime}</span>
                      </div>

                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#000080] transition-colors leading-snug mb-3">
                        {item.title}
                      </h3>

                      <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                        {item.excerpt}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="p-6 pt-0">
                    <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between">
                      <button
                        onClick={() => alert(`Opening story: ${item.title}`)}
                        className="text-xs font-bold text-[#000080] group-hover:text-[#8B5E1A] transition-colors inline-flex items-center gap-1.5"
                      >
                        <span>Read More</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </button>
                      <span className="text-[11px] font-mono text-slate-400">Official Bulletin</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
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

