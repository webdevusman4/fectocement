'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FectoNavbar from '@/components/FectoNavbar';
import CorporateFooter from '@/components/CorporateFooter';
import QuoteModal from '@/components/QuoteModal';
import { InnerPageHero } from '@/components/InnerPageHero';
import { 
  TrendingUp, 
  ShieldCheck, 
  HardHat, 
  MapPin, 
  Clock, 
  Briefcase, 
  ChevronRight, 
  CheckCircle2, 
  Search, 
  Filter, 
  ArrowRight,
  Send,
  Building2,
  Sparkles
} from 'lucide-react';

interface JobPosition {
  id: string;
  title: string;
  department: 'Engineering' | 'Plant Operations' | 'Management';
  location: string;
  type: string;
  experience: string;
  deadline: string;
  description: string;
}

export default function CareersOverviewPage() {
  const [selectedDept, setSelectedDept] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [appliedJob, setAppliedJob] = useState<string | null>(null);

  const valueProps = [
    {
      title: 'Accelerated Growth',
      tag: 'Merit-Based Progression',
      description: 'Structured fast-track career ladders, cross-functional rotations, and sponsored certifications in advanced industrial engineering.',
      icon: TrendingUp,
      accent: 'from-blue-600/10 to-indigo-600/5',
      highlights: ['Annual executive appraisals', 'Technical leadership tracks', 'Cross-plant mentorship'],
    },
    {
      title: 'Industry-Leading Benefits',
      tag: 'Comprehensive Security',
      description: 'Competitive compensation packages, executive provident fund, gratuity, comprehensive family medical coverage, and subsidized company housing.',
      icon: ShieldCheck,
      accent: 'from-emerald-600/10 to-teal-600/5',
      highlights: ['Family health & hospitalization', 'Subsidized housing & transport', 'Performance bonus tiers'],
    },
    {
      title: 'Monumental Impact',
      tag: 'National Infrastructure',
      description: 'Directly contribute to Pakistan’s most critical mega-infrastructure projects, from multi-gigawatt hydropower dams to trans-provincial motorways.',
      icon: HardHat,
      accent: 'from-amber-600/10 to-orange-600/5',
      highlights: ['Nation-building public works', 'Clean energy decarbonization', 'Engineering scale unmatched'],
    },
  ];

  const jobs: JobPosition[] = [
    {
      id: 'job-1',
      title: 'Senior Process Engineer (Pyro-Processing)',
      department: 'Engineering',
      location: 'Sangjani Manufacturing Plant, Islamabad',
      type: 'Full-Time',
      experience: '5–8 Years',
      deadline: 'Nov 30, 2026',
      description: 'Lead thermodynamic clinker optimization, alternative fuel (RDF) burner calibration, and kiln heat-consumption reduction.',
    },
    {
      id: 'job-2',
      title: 'Lead Electrical & Instrumentation Engineer',
      department: 'Engineering',
      location: 'Sangjani Manufacturing Plant, Islamabad',
      type: 'Full-Time',
      experience: '6–10 Years',
      deadline: 'Dec 15, 2026',
      description: 'Supervise automated DCS/PLC systems, 132kV captive power substation operations, and robotic laboratory instrumentation.',
    },
    {
      id: 'job-3',
      title: 'Kiln Production Shift Supervisor',
      department: 'Plant Operations',
      location: 'Sangjani Manufacturing Plant, Islamabad',
      type: 'Full-Time (Rotational)',
      experience: '3–5 Years',
      deadline: 'Dec 05, 2026',
      description: 'Manage 24/7 dry-process rotary kiln shifts, raw meal grinding mills, and coordinate with laboratory quality technicians.',
    },
    {
      id: 'job-4',
      title: 'Quality Assurance & Spectrometry Chemist',
      department: 'Plant Operations',
      location: 'Sangjani Quality Control Center, Islamabad',
      type: 'Full-Time',
      experience: '2–4 Years',
      deadline: 'Nov 25, 2026',
      description: 'Conduct online XRF/XRD chemical inspections, PSQCA compliance sampling, and compressive strength load testing.',
    },
    {
      id: 'job-5',
      title: 'Deputy Manager Corporate Supply Chain & Procurement',
      department: 'Management',
      location: 'Fecto Corporate HQ, Sector H-16, Islamabad',
      type: 'Full-Time',
      experience: '5–7 Years',
      deadline: 'Dec 20, 2026',
      description: 'Oversee domestic coal and raw material sourcing, bulk fleet logistics contracts, and industrial vendor negotiations.',
    },
    {
      id: 'job-6',
      title: 'Senior Financial Analyst (Capital Budgeting & PSX Compliance)',
      department: 'Management',
      location: 'Fecto Corporate HQ, Sector H-16, Islamabad',
      type: 'Full-Time',
      experience: '4–6 Years',
      deadline: 'Dec 10, 2026',
      description: 'Develop financial feasibility models for captive solar expansion and manage periodic SECP statutory reporting.',
    },
  ];

  const filteredJobs = jobs.filter(job => {
    const matchesDept = selectedDept === 'All' || job.department === selectedDept;
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          job.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#F1F5F9] text-slate-900 selection:bg-[#F4D5AB] selection:text-[#000080]">
      {/* 1. FLOATING BRAND NAVBAR */}
      <FectoNavbar onCtaClick={() => setQuoteModalOpen(true)} />

      {/* SECTION 1: THE UNIVERSAL HERO */}
      <InnerPageHero
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Careers', href: '#careers' },
          { label: 'Open Roles' },
        ]}
        title="Build Your Legacy."
        subtitle="Join the engineering powerhouse shaping Pakistan's infrastructure."
      />

      {/* SECTION 2: THE VALUE PROPOSITION GRID (3-Column Card Grid with Hover Lift) */}
      <section className="bg-[#F1F5F9] py-24 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#8B5E1A]">The Fecto Advantage</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#000080] mt-1 tracking-tight">
              Why Shape Your Career at Fecto Cement?
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
              We empower ambitious engineers, technicians, and corporate leaders with world-class industrial infrastructure, rigorous continuous learning, and competitive compensation.
            </p>
          </div>

          {/* 3-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {valueProps.map((prop, index) => {
              const Icon = prop.icon;
              return (
                <motion.div
                  key={prop.title}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.12 }}
                  className="bg-white rounded-3xl p-8 lg:p-10 border border-slate-200/80 shadow-[0_10px_35px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_45px_rgba(0,0,128,0.09)] transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between group relative overflow-hidden"
                >
                  {/* Ambient Top Corner Accent */}
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${prop.accent} rounded-bl-full pointer-events-none group-hover:scale-125 transition-transform duration-500`} />

                  <div>
                    <div className="w-14 h-14 rounded-2xl bg-[#000080]/5 text-[#000080] flex items-center justify-center mb-6 group-hover:bg-[#000080] group-hover:text-white transition-all duration-300 shadow-xs">
                      <Icon className="w-7 h-7" />
                    </div>

                    <span className="text-xs font-bold uppercase tracking-wider text-[#8B5E1A] mb-2 block">
                      {prop.tag}
                    </span>

                    <h3 className="text-2xl font-extrabold text-[#000080] mb-3">
                      {prop.title}
                    </h3>

                    <p className="text-sm text-slate-600 leading-relaxed mb-6">
                      {prop.description}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-slate-100 space-y-2">
                    {prop.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 3: INTERACTIVE JOB BOARD (Filterable List with Champagne Sand Apply Buttons) */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 pb-6 border-b border-slate-200">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#8B5E1A]">Immediate Openings</span>
              <h2 className="text-3xl font-extrabold text-[#000080] mt-1">
                Explore Current Opportunities
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Showing {filteredJobs.length} active roles across engineering, operations, and corporate headquarters.
              </p>
            </div>

            {/* Keyword Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search job title or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#F8FAFC] rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#000080]/30 text-slate-800"
              />
            </div>
          </div>

          {/* Department Filter Pills */}
          <div className="flex flex-wrap gap-2 mb-10">
            {['All', 'Engineering', 'Plant Operations', 'Management'].map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  selectedDept === dept
                    ? 'bg-[#000080] text-[#F4D5AB] shadow-sm'
                    : 'bg-[#F1F5F9] text-slate-600 hover:text-[#000080]'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>

          {/* Job List Items */}
          <div className="divide-y divide-slate-200 border-t border-slate-200">
            <AnimatePresence mode="popLayout">
              {filteredJobs.map((job) => (
                <motion.div
                  key={job.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                  className="py-6 sm:py-8 px-4 rounded-2xl hover:bg-slate-50 transition-colors flex flex-col lg:flex-row lg:items-center justify-between gap-6 group"
                >
                  {/* Left: Job Title, Location, and Department */}
                  <div className="max-w-2xl">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <span className="px-3 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-slate-100 text-[#000080] border border-slate-200">
                        {job.department}
                      </span>
                      <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        Apply by {job.deadline}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#000080] transition-colors leading-snug mb-2">
                      {job.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
                      {job.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-500">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#8B5E1A]" />
                        {job.location}
                      </span>
                      <span>• Experience: {job.experience}</span>
                    </div>
                  </div>

                  {/* Right: Type Badge & Champagne Sand Apply Now Button */}
                  <div className="flex items-center gap-4 flex-shrink-0 self-start lg:self-center">
                    <span className="px-3.5 py-1.5 rounded-xl text-xs font-bold font-mono bg-emerald-50 text-emerald-700 border border-emerald-200/60 hidden sm:inline-block">
                      {job.type}
                    </span>

                    <button
                      onClick={() => {
                        setAppliedJob(job.title);
                        alert(`Opening application portal for: ${job.title}\nPlease submit your updated CV and PEC credentials to careers@fectogroup.com.`);
                      }}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#F4D5AB] text-[#000080] font-extrabold text-xs shadow-md hover:shadow-lg hover:scale-[1.03] active:scale-[0.98] transition-all"
                    >
                      <span>Apply Now</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Spontaneous Application Callout */}
          <div className="mt-16 bg-[#F8FAFC] rounded-3xl p-8 sm:p-10 border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#000080] text-[#F4D5AB] flex items-center justify-center flex-shrink-0 shadow-md">
                <Briefcase className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-[#000080]">Don’t see your exact engineering specialization?</h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Send your resume directly to our Executive Talent Acquisition pool for future leadership vacancies.
                </p>
              </div>
            </div>

            <a
              href="mailto:careers@fectogroup.com?subject=Spontaneous%20Executive%20Application%20-%20Fecto%20Cement"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#000080] text-white text-xs font-bold hover:bg-[#000060] transition-all shadow-sm whitespace-nowrap"
            >
              <span>Email HR Registry</span>
              <Send className="w-3.5 h-3.5 text-[#F4D5AB]" />
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

