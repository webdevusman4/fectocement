'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Users, 
  ChevronRight, 
  Award, 
  ShieldCheck, 
  Briefcase, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  Quote
} from 'lucide-react';

const LinkedInIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);
import FectoNavbar from '@/components/FectoNavbar';
import CorporateFooter from '@/components/CorporateFooter';
import QuoteModal from '@/components/QuoteModal';
import InnerPageHero from '@/components/InnerPageHero';

interface Executive {
  name: string;
  title: string;
  department: string;
  bio: string;
  image: string;
  linkedin: string;
}

const executivesData: Executive[] = [
  {
    name: 'Raza Fecto',
    title: 'Chief Executive Officer',
    department: 'Executive Management',
    bio: 'Guiding Fecto’s nationwide operations, strategic capacity scaling, and commercial partnerships for over two decades. Spearheading our aggressive transition into alternative biomass fuels and Net-Zero manufacturing.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop',
    linkedin: 'https://linkedin.com',
  },
  {
    name: 'Altaf A. Hussain',
    title: 'Director of Plant Operations',
    department: 'Sangjani Manufacturing Complex',
    bio: 'Over 28 years of mechanical engineering mastery managing continuous rotary kiln operations and high-pressure roller presses. Overseeing Fecto’s automated DCS distributed control systems.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop',
    linkedin: 'https://linkedin.com',
  },
  {
    name: 'Syed Tariq Mehmood',
    title: 'Chief Financial Officer',
    department: 'Finance & Investor Relations',
    bio: 'Fellow Chartered Accountant steering corporate capital allocation, fiscal compliance, and PSX regulatory disclosures. Safeguarding sustained balance sheet strength and investor equity growth.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800&auto=format&fit=crop',
    linkedin: 'https://linkedin.com',
  },
  {
    name: 'Dr. Farhan Qureshi',
    title: 'Director of Technical & QA',
    department: 'Quality Assurance & R&D',
    bio: 'Doctorate in Mineral Chemistry specializing in hydraulic clinker hydration kinetics and sulphate-resistant cements. Directs online XRF spectrometry and national PSQCA verification laboratories.',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop',
    linkedin: 'https://linkedin.com',
  },
  {
    name: 'Kamran S. Mirza',
    title: 'Director of Supply Chain',
    department: 'Logistics & Distribution',
    bio: 'Orchestrating raw limestone transport corridors from the Margalla Hills to over 400 authorized dealership networks nationwide with GPS-tracked bulk dispatch fleets.',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop',
    linkedin: 'https://linkedin.com',
  },
  {
    name: 'Zainab Fecto',
    title: 'Head of ESG & Corporate Affairs',
    department: 'Sustainability & Governance',
    bio: 'Architecting Fecto’s circular economy agenda, waste-heat power generation, and community healthcare initiatives across the Rawalpindi and Sangjani industrial districts.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop',
    linkedin: 'https://linkedin.com',
  },
];

export default function LeadershipPage() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F1F5F9] text-slate-900 selection:bg-[#F4D5AB] selection:text-[#000080]">
      {/* 1. FLOATING NAVBAR */}
      <FectoNavbar onCtaClick={() => setQuoteModalOpen(true)} />

      {/* 2. SECTION 1: THE PREMIUM EDITORIAL HERO */}
      <InnerPageHero
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Company' },
          { label: 'Leadership' },
        ]}
        title="The minds behind the monumental."
        subtitle="Decades of combined heavy industrial discipline, engineering precision, and visionary capital allocation steering Pakistan's premier cement manufacturer."
        textureImageUrl="/images/investors-towers.jpg"
      />

      {/* 3. SECTION 2: THE CHAIRMAN'S MANDATE */}
      <section className="py-20 md:py-28 bg-[#F1F5F9] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* LEFT (PORTRAIT): Aspect [3/4] + Floating Glass-Arctic Badge */}
            <div className="lg:col-span-5 relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="relative mx-auto max-w-md lg:max-w-none"
              >
                {/* Chairman Portrait */}
                <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900">
                  <Image
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200&auto=format&fit=crop"
                    alt="Mohammed Yasin Fecto — Executive Chairman"
                    fill
                    priority
                    sizes="(max-width: 1024px) 80vw, 40vw"
                    className="object-cover object-top contrast-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Overlapping Dense Glass-Arctic Floating Badge */}
                <div className="absolute -bottom-6 -left-4 sm:-bottom-8 sm:-left-6 z-20 max-w-xs sm:max-w-sm glass-arctic rounded-2xl p-4 sm:p-5 shadow-2xl border border-white">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#000080]/10 flex items-center justify-center text-[#000080] flex-shrink-0">
                      <Briefcase className="w-5 h-5 text-[#8B5E1A]" />
                    </div>
                    <div>
                      <div className="text-sm sm:text-base font-bold text-[#000080]">
                        Mohammed Yasin Fecto
                      </div>
                      <div className="text-xs font-semibold text-slate-600">
                        Executive Chairman • Fecto Group
                      </div>
                    </div>
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-[#000080]/10 flex items-center justify-between text-[11px] font-mono text-slate-700">
                    <span className="font-semibold text-[#8B5E1A]">Tenure: 1981 – Present</span>
                    <span className="px-2 py-0.5 rounded-full bg-[#000080]/5 text-[#000080] font-medium">Founder</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* RIGHT (THE MANDATE): Stylized Quotation + Leadership Philosophy + Signature */}
            <div className="lg:col-span-7 flex flex-col justify-center pt-8 lg:pt-0">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#8B5E1A] mb-2">
                EXECUTIVE MANDATE & PHILOSOPHY
              </span>

              {/* Massive Stylized Quotation Mark in #F4D5AB text-8xl */}
              <div 
                className="text-[#F4D5AB] text-8xl sm:text-9xl font-serif font-black leading-none select-none -mb-8 sm:-mb-10"
                aria-hidden="true"
              >
                “
              </div>

              {/* Quote text in italicized dark navy */}
              <blockquote className="text-xl sm:text-2xl md:text-3xl text-[#000080] font-medium italic font-serif leading-relaxed mb-6">
                Heavy industry is not simply about clinker and kilns; it is a profound national responsibility. Every bridge that carries our families, every dam that powers our cities, is built upon the unspoken promise that our concrete will endure across centuries.
              </blockquote>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8">
                Since breaking ground at Sangjani in 1981, our ethos has remained inviolable: never compromise chemical formulation for transient margins, and never forget that modern civil engineering is the prerequisite for economic sovereignty. We continue to reinvest into fuel modernization, digital kiln intelligence, and community welfare with pride.
              </p>

              {/* Signature Area */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-6 border-t border-slate-200">
                <div>
                  {/* Stylized Transparent Signature */}
                  <div className="font-serif italic text-3xl sm:text-4xl text-[#000080] font-light tracking-wide drop-shadow-sm select-none">
                    M. Y. Fecto
                  </div>
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest mt-1">
                    Founder & Executive Chairman
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="px-3.5 py-1.5 rounded-full bg-[#000080]/5 border border-[#000080]/10 text-xs font-semibold text-[#000080] flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#8B5E1A]" />
                    <span>Four Decades of Stewardship</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 4. SECTION 3: THE "COLOR-REVEAL" EXECUTIVE GRID */}
      <section className="py-24 md:py-32 bg-[#F1F5F9]">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#8B5E1A]">
              GOVERNANCE ARCHITECTURE
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#000080] mt-3">
              Executive Committee & Directors
            </h2>
            <p className="text-slate-600 mt-4 text-base sm:text-lg">
              Meet the executive leadership driving operations, material science, and financial governance across Fecto Cement Limited.
            </p>
          </div>

          {/* 3-Column Executive Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {executivesData.map((exec, idx) => (
              <motion.div
                key={exec.name}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative overflow-hidden rounded-2xl h-[420px] group shadow-xl bg-slate-900 border border-slate-800"
              >
                {/* 1. The Image (Grayscale by default, color on group-hover) */}
                <Image
                  src={exec.image}
                  alt={exec.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-top grayscale transition-all duration-700 ease-in-out group-hover:grayscale-0 group-hover:scale-105"
                />

                {/* Ambient dark gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                {/* 2. Default Visible Bottom Info (Name & Title) */}
                <div className="absolute bottom-0 inset-x-0 p-6 z-10 transition-transform duration-500 group-hover:opacity-0 group-hover:translate-y-4">
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/20 text-[#F4D5AB] backdrop-blur-md mb-2">
                    {exec.department}
                  </span>
                  <h3 className="text-xl font-bold text-white drop-shadow-md">
                    {exec.name}
                  </h3>
                  <p className="text-sm text-blue-200/90 font-medium">
                    {exec.title}
                  </p>
                </div>

                {/* 3. The Reveal Panel: Hidden below (translated down 100%), slides up on hover */}
                <div className="absolute inset-x-0 bottom-0 z-20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out glass-smoked p-6 rounded-b-2xl border-t border-white/10 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
                      <div>
                        <h4 className="text-base font-bold text-white">
                          {exec.name}
                        </h4>
                        <div className="text-xs text-[#F4D5AB] font-semibold">
                          {exec.title}
                        </div>
                      </div>
                      
                      {/* LinkedIn Button */}
                      <a
                        href={exec.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${exec.name} LinkedIn Profile`}
                        className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-[#F4D5AB] hover:text-white flex items-center justify-center transition-colors"
                      >
                        <LinkedInIcon className="w-4 h-4" />
                      </a>
                    </div>

                    <p className="text-xs text-blue-100/90 leading-relaxed mt-2">
                      {exec.bio}
                    </p>
                  </div>

                  <div className="mt-4 pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-300">
                    <span>Fecto Cement Leadership</span>
                    <span className="text-emerald-400 font-mono font-medium">Active Director</span>
                  </div>
                </div>

              </motion.div>
            ))}
          </div>

          {/* Bottom Governance Banner */}
          <div className="mt-20 p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/80 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#000080]/10 flex items-center justify-center text-[#000080] flex-shrink-0">
                <ShieldCheck className="w-6 h-6 text-[#8B5E1A]" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-[#000080]">
                  Corporate Governance & Board Audit Compliance
                </h4>
                <p className="text-xs sm:text-sm text-slate-500">
                  Adhering strictly to SECP Listed Companies Regulations, PSX Disclosures, and annual independent external audits.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setQuoteModalOpen(true)}
              className="px-6 py-3 rounded-full text-xs font-bold bg-[#000080] text-white hover:bg-[#000080]/90 transition-colors shadow-md flex-shrink-0 flex items-center gap-2"
            >
              <span>Contact Board Secretariat</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </section>

      {/* 5. CORPORATE MEGA FOOTER */}
      <CorporateFooter />

      {/* 6. QUOTE MODAL */}
      <QuoteModal 
        isOpen={quoteModalOpen} 
        onClose={() => setQuoteModalOpen(false)} 
      />
    </div>
  );
}
