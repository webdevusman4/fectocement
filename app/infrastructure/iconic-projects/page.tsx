'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, 
  MapPin, 
  Layers, 
  CheckCircle2, 
  ArrowRight,
  Compass,
  Award
} from 'lucide-react';
import FectoNavbar from '@/components/FectoNavbar';
import CorporateFooter from '@/components/CorporateFooter';
import QuoteModal from '@/components/QuoteModal';
import InnerPageHero from '@/components/InnerPageHero';

interface Project {
  id: string;
  title: string;
  location: string;
  cementType: string;
  tonsSupplied: string;
  description: string;
  image: string;
  aspectClass: string;
}

const northProjects: Project[] = [
  {
    id: 'tarbela',
    title: 'Tarbela Dam 4th Extension',
    location: 'Indus River Basin, KPK',
    cementType: 'Low-Heat Sulphate Resistant (SRC)',
    tonsSupplied: '1,200,000+ Tons',
    description: 'Massive hydraulic concrete pours for spillways, intake tunnels, and high-pressure turbine powerhouse caverns.',
    image: '/tarbala.jpg',
    aspectClass: 'aspect-[4/5]',
  },
  {
    id: 'motorway',
    title: 'National Motorway Network (M-2)',
    location: 'Salt Range & Pothohar Corridor',
    cementType: 'Ordinary Portland Cement (OPC Grade 53)',
    tonsSupplied: '850,000+ Tons',
    description: 'Arterial multi-lane rigid pavement, reinforced mountain viaducts, and prestressed bridge overpasses.',
    image: '/Gemini_Generated_Image_1jfr2q1jfr2q1jfr.jpg',
    aspectClass: 'aspect-square',
  },
  {
    id: 'metro',
    title: 'Islamabad Metro Mass Transit',
    location: 'Islamabad Capital Territory',
    cementType: 'High Early Strength OPC 53',
    tonsSupplied: '420,000+ Tons',
    description: 'Dedicated grade-separated elevated flyovers, transit station concourses, and structural pillar foundations.',
    image: '/images/contractors-infra.jpg',
    aspectClass: 'aspect-[4/3]',
  },
];

const southProjects: Project[] = [
  {
    id: 'financial',
    title: 'Karachi Financial District Towers',
    location: 'Chundrigar Corridor, Karachi',
    cementType: 'High-Strength OPC Grade 53',
    tonsSupplied: '650,000+ Tons',
    description: 'Skyscraper commercial complexes requiring high-fluidity pumped concrete with zero micro-fracturing.',
    image: '/images/investors-towers.jpg',
    aspectClass: 'aspect-[4/5]',
  },
  {
    id: 'port-qasim',
    title: 'Port Qasim Deep-Water Marine Terminals',
    location: 'Arabian Sea Shoreline, Sindh',
    cementType: 'ASTM C-150 Type V Sulphate Resistant (SRC)',
    tonsSupplied: '980,000+ Tons',
    description: 'Heavy container wharves, seawater immersion caissons, and breakwater dolphin piles exposed to aggressive tidal salts.',
    image: '/herobg.jpg',
    aspectClass: 'aspect-square',
  },
  {
    id: 'coastal',
    title: 'Makran Coastal Highway Infrastructure',
    location: 'Coastal Corridor, Balochistan',
    cementType: 'Sulphate Resistant Coastal Blend',
    tonsSupplied: '540,000+ Tons',
    description: 'Marine culverts, coastal causeways, and heavy logistics arterial roads resisting extreme subsoil salinity.',
    image: '/images/dealers-warehouse.jpg',
    aspectClass: 'aspect-[4/3]',
  },
];

export default function IconicProjectsPage() {
  const [region, setRegion] = useState<'north' | 'south'>('north');
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);

  const currentProjects = region === 'north' ? northProjects : southProjects;

  return (
    <div className="min-h-screen bg-[#F1F5F9] text-slate-900 selection:bg-[#F4D5AB] selection:text-[#000080]">
      {/* 1. FLOATING NAVBAR */}
      <FectoNavbar onCtaClick={() => setQuoteModalOpen(true)} />

      {/* 2. SECTION 1: THE PREMIUM EDITORIAL HERO */}
      <InnerPageHero
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Infrastructure' },
          { label: 'Iconic Projects' },
        ]}
        title="Engineering the National Skyline."
        subtitle="From the peaks of the North to the ports of the South, our cement builds Pakistan."
        textureImageUrl="/tarbala.jpg"
      />

      {/* 3. SECTION 2: THE GEOGRAPHIC TOGGLE / TABS */}
      <section className="py-12 bg-[#F1F5F9] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#8B5E1A] mb-3">
            REGIONAL FOOTPRINT SELECTION
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#000080] mb-8 text-center">
            Explore Infrastructure by Territory
          </h2>

          {/* Sleek Pill-Shaped Toggle Switch in the Center */}
          <div className="relative inline-flex p-1.5 rounded-full bg-slate-200/80 border border-slate-300 shadow-inner">
            <button
              type="button"
              onClick={() => setRegion('north')}
              className={`relative z-10 px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 ${
                region === 'north'
                  ? 'text-[#000080] shadow-md'
                  : 'text-slate-600 hover:text-[#000080]'
              }`}
            >
              {region === 'north' && (
                <motion.div
                  layoutId="activePill"
                  className="absolute inset-0 bg-white rounded-full -z-10 shadow-sm"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              North Projects
            </button>

            <button
              type="button"
              onClick={() => setRegion('south')}
              className={`relative z-10 px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 ${
                region === 'south'
                  ? 'text-[#000080] shadow-md'
                  : 'text-slate-600 hover:text-[#000080]'
              }`}
            >
              {region === 'south' && (
                <motion.div
                  layoutId="activePill"
                  className="absolute inset-0 bg-white rounded-full -z-10 shadow-sm"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              South Projects
            </button>
          </div>
        </div>
      </section>

      {/* 4. SECTION 3: THE PROJECT MASONRY GALLERY */}
      <section className="py-24 bg-[#F1F5F9]">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={region}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start"
            >
              {currentProjects.map((project) => (
                <div
                  key={project.id}
                  className={`group relative overflow-hidden rounded-3xl shadow-xl bg-slate-900 border border-slate-200/80 cursor-pointer ${project.aspectClass}`}
                >
                  {/* Project Image */}
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-95"
                  />

                  {/* Top Location Badge (Always Visible) */}
                  <div className="absolute top-4 left-4 z-10 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-semibold text-white border border-white/20 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#F4D5AB]" />
                    <span>{project.location}</span>
                  </div>

                  {/* Fecto Navy Overlay: Sweeps up from the bottom on hover */}
                  <div className="absolute inset-x-0 bottom-0 z-20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out bg-[#000080]/95 backdrop-blur-xl p-6 sm:p-7 border-t border-white/20 text-white flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-mono font-semibold uppercase tracking-widest text-[#F4D5AB] mb-1 block">
                        {project.cementType}
                      </span>
                      <h3 className="text-xl font-bold text-white mb-2 leading-snug">
                        {project.title}
                      </h3>
                      <p className="text-xs text-blue-100/80 leading-relaxed mb-4">
                        {project.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                      <div>
                        <div className="text-[10px] text-blue-200 uppercase tracking-wider">Supplied Volume</div>
                        <div className="text-lg font-black text-[#F4D5AB] font-mono">
                          {project.tonsSupplied}
                        </div>
                      </div>
                      <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white">
                        <ArrowRight className="w-4 h-4 text-[#F4D5AB]" />
                      </span>
                    </div>
                  </div>

                  {/* Default subtle gradient at bottom so title is readable before hover */}
                  <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 via-black/30 to-transparent group-hover:opacity-0 transition-opacity duration-300">
                    <h3 className="text-lg font-bold text-white drop-shadow-md">
                      {project.title}
                    </h3>
                    <div className="text-xs text-[#F4D5AB] font-mono mt-0.5">
                      {project.tonsSupplied}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
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

