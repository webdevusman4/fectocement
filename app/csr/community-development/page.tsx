'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HeartHandshake, 
  MapPin, 
  GraduationCap, 
  Droplets, 
  Stethoscope, 
  Quote, 
  CheckCircle2, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import FectoNavbar from '@/components/FectoNavbar';
import CorporateFooter from '@/components/CorporateFooter';
import QuoteModal from '@/components/QuoteModal';
import InnerPageHero from '@/components/InnerPageHero';

interface CommunityPin {
  id: string;
  title: string;
  subtitle: string;
  impact: string;
  beneficiaries: string;
  x: string;
  y: string;
  icon: React.ComponentType<{ className?: string }>;
}

const communityPins: CommunityPin[] = [
  {
    id: 'school',
    title: 'Fecto Public Model School',
    subtitle: 'Sangjani Village, Islamabad Suburbs',
    impact: 'Free primary and secondary education for local children, with modern science labs, computer rooms, and free uniforms.',
    beneficiaries: '850+ Enrolled Students (55% Girls)',
    x: '48%',
    y: '38%',
    icon: GraduationCap,
  },
  {
    id: 'water',
    title: 'Clean Drinking Water Plant',
    subtitle: 'Margalla Foothills Community Hub',
    impact: 'Multi-stage Reverse Osmosis (RO) filtration facility providing mineral-balanced, bacteria-free water for surrounding villages.',
    beneficiaries: '25,000 Liters Daily Capacity',
    x: '38%',
    y: '56%',
    icon: Droplets,
  },
  {
    id: 'health',
    title: 'Free Community Health Dispensary',
    subtitle: 'Sangjani Industrial Road Clinic',
    impact: '24/7 outpatient care, diagnostic pathology testing, emergency triage, and free medicine distribution.',
    beneficiaries: '16,000+ Patients Treated Annually',
    x: '62%',
    y: '46%',
    icon: Stethoscope,
  },
];

const communityQuotes = [
  {
    name: 'Ayesha Bibi',
    role: 'Principal, Fecto Model School',
    location: 'Sangjani District',
    quote: 'Before Fecto built this campus, over four hundred girls in our rural union council had no pathway to secondary school. Today, our students are topping district board examinations and pursuing civil engineering degrees.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop',
  },
  {
    name: 'Dr. Muhammad Nadeem',
    role: 'Chief Medical Officer',
    location: 'Fecto Community Dispensary',
    quote: 'Having a certified medical facility with constant clean electricity and dedicated pediatric care has slashed local infant waterborne illnesses by over seventy percent in under three years.',
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=600&auto=format&fit=crop',
  },
  {
    name: 'Chaudhry Tariq',
    role: 'President, Local Farmers Cooperative',
    location: 'Pothohar Agriculture Union',
    quote: 'Instead of burning crop stubble, Fecto purchases our mustard and wheat stalks as biomass fuel for their kilns. It has injected steady supplementary cash into hundreds of farming households.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop',
  },
];

export default function CommunityDevelopmentPage() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [activePin, setActivePin] = useState<CommunityPin | null>(null);

  return (
    <div className="min-h-screen bg-[#F1F5F9] text-slate-900 selection:bg-[#F4D5AB] selection:text-[#000080]">
      {/* 1. FLOATING NAVBAR */}
      <FectoNavbar onCtaClick={() => setQuoteModalOpen(true)} />

      {/* 2. SECTION 1: THE PREMIUM EDITORIAL HERO */}
      <InnerPageHero
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'CSR' },
          { label: 'Community Development' },
        ]}
        title="Empowering Our People."
        subtitle="Investing in the health, education, and prosperity of the communities we operate in."
        textureImageUrl="/images/careers-team.jpg"
      />

      {/* 3. SECTION 2: THE IMPACT MAP */}
      <section className="py-24 bg-[#F1F5F9] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#8B5E1A]">
              REGIONAL WELFARE ECOSYSTEM
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#000080] mt-3">
              The Community Impact Map
            </h2>
            <p className="text-slate-600 mt-4 text-base sm:text-lg">
              Hover over the active social development pins across the Sangjani and northern operational corridors.
            </p>
          </div>

          {/* Large Stylized Abstract SVG Map Container */}
          <div className="relative w-full aspect-[16/10] md:aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl bg-slate-900 border-4 border-white flex items-center justify-center">
            {/* Abstract Topographic Map Background Graphic */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <svg className="w-full h-full" viewBox="0 0 1000 500" preserveAspectRatio="none">
                <path d="M 50 100 Q 200 40 400 120 T 700 80 T 950 150" fill="none" stroke="#F4D5AB" strokeWidth="2" strokeDasharray="6 6" />
                <path d="M 80 250 Q 300 200 550 280 T 800 220 T 920 300" fill="none" stroke="#60A5FA" strokeWidth="2" strokeDasharray="4 4" />
                <path d="M 120 400 Q 350 350 600 420 T 850 380" fill="none" stroke="#F4D5AB" strokeWidth="2" strokeDasharray="8 8" />
              </svg>
            </div>

            {/* Subtle Grid Lines */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

            {/* Map Header Overlay */}
            <div className="absolute top-6 left-6 z-10 bg-slate-900/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-white flex items-center gap-2 text-xs font-mono">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F4D5AB] animate-pulse" />
              <span>Federal Capital & Sangjani District Welfare Zone</span>
            </div>

            {/* 3 Animated Pulsing MapPin Icons */}
            {communityPins.map((pin) => {
              const IconComp = pin.icon;
              return (
                <div
                  key={pin.id}
                  style={{ left: pin.x, top: pin.y }}
                  className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
                  onMouseEnter={() => setActivePin(pin)}
                  onMouseLeave={() => setActivePin(null)}
                >
                  <div className="relative cursor-pointer">
                    <span className="absolute -inset-3 rounded-full bg-[#F4D5AB]/40 animate-ping" />
                    <button
                      type="button"
                      aria-label={`Inspect ${pin.title}`}
                      className="relative w-8 h-8 rounded-full bg-[#000080] border-2 border-[#F4D5AB] text-[#F4D5AB] shadow-xl flex items-center justify-center hover:scale-125 transition-transform"
                    >
                      <MapPin className="w-4 h-4 text-[#F4D5AB]" />
                    </button>

                    {/* Interactive Tooltip on Hover */}
                    <AnimatePresence>
                      {activePin?.id === pin.id && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-72 sm:w-80 glass-smoked p-5 rounded-2xl shadow-2xl border border-white/20 text-white z-50 pointer-events-none"
                        >
                          <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#F4D5AB] mb-1">
                            <IconComp className="w-3.5 h-3.5" />
                            <span>{pin.subtitle}</span>
                          </div>
                          <h4 className="text-base font-bold text-white mb-2">
                            {pin.title}
                          </h4>
                          <p className="text-xs text-blue-100/80 leading-relaxed mb-3">
                            {pin.impact}
                          </p>
                          <div className="pt-2 border-t border-white/10 text-[11px] font-mono text-emerald-400 font-bold">
                            {pin.beneficiaries}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. SECTION 3: COMMUNITY VOICES */}
      <section className="py-24 bg-[#F1F5F9]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#8B5E1A]">
              FIRST-HAND TESTIMONIALS
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#000080] mt-3">
              Community Voices
            </h2>
            <p className="text-slate-600 mt-4 text-base sm:text-lg">
              Hear directly from the educators, healthcare workers, and agricultural partners whose lives are touched by Fecto CSR.
            </p>
          </div>

          {/* Masonry Grid of 3 Quote Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {communityQuotes.map((q) => (
              <div
                key={q.name}
                className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/80 shadow-xl flex flex-col justify-between hover:-translate-y-2 transition-transform duration-300 group"
              >
                <div>
                  <Quote className="w-8 h-8 text-[#F4D5AB] mb-6" />
                  <p className="text-slate-700 text-sm sm:text-base leading-relaxed italic mb-8">
                    "{q.quote}"
                  </p>
                </div>

                <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#000080]/20 flex-shrink-0">
                    <Image
                      src={q.image}
                      alt={q.name}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-[#000080]">
                      {q.name}
                    </h4>
                    <div className="text-xs font-medium text-[#8B5E1A]">
                      {q.role}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono">
                      {q.location}
                    </div>
                  </div>
                </div>
              </div>
            ))}
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

