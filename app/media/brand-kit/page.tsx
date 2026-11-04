'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import FectoNavbar from '@/components/FectoNavbar';
import CorporateFooter from '@/components/CorporateFooter';
import QuoteModal from '@/components/QuoteModal';
import { InnerPageHero } from '@/components/InnerPageHero';
import FectoLogo from '@/components/FectoLogo';
import { 
  Download, 
  Copy, 
  Check, 
  FileText, 
  Image as ImageIcon, 
  ShieldCheck, 
  Palette, 
  Layers, 
  Sparkles,
  ExternalLink
} from 'lucide-react';

interface PhotographyAsset {
  id: string;
  title: string;
  category: string;
  resolution: string;
  aspect: string;
  image: string;
}

export default function BrandKitPage() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [downloadingAsset, setDownloadingAsset] = useState<string | null>(null);

  const copyToClipboard = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2500);
  };

  const handleDownloadLogo = (variant: 'navy' | 'white') => {
    const filename = variant === 'navy' ? 'Fecto_Cement_Logo_Primary_Navy.svg' : 'Fecto_Cement_Logo_White_Reversed.svg';
    const svgData = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 100"><text x="10" y="60" font-family="Arial" font-size="40" font-weight="bold" fill="${variant === 'navy' ? '#000080' : '#FFFFFF'}">FECTO CEMENT</text></svg>`;
    const blob = new Blob([svgData], { type: 'image/svg+xml' });
    const element = document.createElement('a');
    element.href = URL.createObjectURL(blob);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleDownloadPhoto = (asset: PhotographyAsset) => {
    setDownloadingAsset(asset.id);
    setTimeout(() => {
      setDownloadingAsset(null);
      const element = document.createElement('a');
      element.href = asset.image;
      element.download = `Fecto_${asset.title.replace(/\s+/g, '_')}_HighRes.jpg`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }, 500);
  };

  const colorSwatches = [
    {
      name: 'Fecto Navy',
      role: 'Primary Brand Color',
      hex: '#000080',
      rgb: '0, 0, 128',
      cmyk: '100, 100, 0, 50',
      textColor: 'text-white',
      badgeBg: 'bg-white/20',
    },
    {
      name: 'Champagne Sand',
      role: 'Warm Premium Accent',
      hex: '#F4D5AB',
      rgb: '244, 213, 171',
      cmyk: '0, 13, 30, 4',
      textColor: 'text-[#000080]',
      badgeBg: 'bg-[#000080]/15',
    },
    {
      name: 'Mist Gray',
      role: 'Content Canvas Background',
      hex: '#F1F5F9',
      rgb: '241, 245, 249',
      cmyk: '3, 2, 0, 2',
      textColor: 'text-slate-800',
      badgeBg: 'bg-slate-300/40',
    },
  ];

  const photoArchive: PhotographyAsset[] = [
    {
      id: 'photo-1',
      title: 'Sangjani Manufacturing Complex Wide-Angle Aerial',
      category: 'Industrial Plant Facilities',
      resolution: '4096 × 2730 px • 300 DPI',
      aspect: 'h-80',
      image: '/images/company-plant.jpg',
    },
    {
      id: 'photo-2',
      title: 'Fecto 50kg Heavy-Duty Poly-Woven Bag Pack',
      category: 'Packaging & Product Photography',
      resolution: '3840 × 2160 px • 300 DPI',
      aspect: 'h-96',
      image: '/fecto-50kg-bag.png',
    },
    {
      id: 'photo-3',
      title: 'Corporate Headquarters & Executive Boardroom',
      category: 'Architecture & Leadership',
      resolution: '4500 × 3000 px • 300 DPI',
      aspect: 'h-80',
      image: '/images/company-hq.jpg',
    },
    {
      id: 'photo-4',
      title: 'High-Temperature European Rotary Kiln Line 2',
      category: 'Pyro-Processing Equipment',
      resolution: '4200 × 2800 px • 300 DPI',
      aspect: 'h-96',
      image: '/images/company-plant.jpg',
    },
    {
      id: 'photo-5',
      title: 'Hydropower Dam Mass Concrete Structural Pour',
      category: 'Project Execution',
      resolution: '4000 × 2660 px • 300 DPI',
      aspect: 'h-80',
      image: '/herobg.jpg',
    },
    {
      id: 'photo-6',
      title: 'Automated High-Speed Dispatch Terminal & Tanker Loading',
      category: 'Logistics Fleet',
      resolution: '3840 × 2400 px • 300 DPI',
      aspect: 'h-80',
      image: '/images/company-plant.jpg',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F1F5F9] text-slate-900 selection:bg-[#F4D5AB] selection:text-[#000080]">
      {/* 1. FLOATING NAVBAR */}
      <FectoNavbar onCtaClick={() => setQuoteModalOpen(true)} />

      {/* SECTION 1: THE UNIVERSAL HERO */}
      <InnerPageHero
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Media Center', href: '#media' },
          { label: 'Brand Kit' },
        ]}
        title="Brand Identity Assets."
        subtitle="Official logos, color palettes, brand guidelines, and high-resolution corporate photography."
      />

      {/* SECTION 2: LOGO & COLOR PALETTE HUB (2 Columns) */}
      <section className="bg-white py-24 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8B5E1A] mb-8">
            <Sparkles className="w-4 h-4 text-[#8B5E1A]" />
            <span>Official Identity Standards</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* LEFT COLUMN: LOGOS (Two Large Cards) */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#8B5E1A]">Primary Marks</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#000080] mt-1">
                  Corporate Emblem & Wordmark
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Authorized vector marks for broadcast media, print publications, and digital partnerships.
                </p>
              </div>

              {/* Card 1: Primary Navy Logo on White BG */}
              <div className="bg-[#F8FAFC] rounded-3xl p-8 border border-slate-200 shadow-xs flex flex-col justify-between group hover:border-[#000080]/30 transition-all">
                <div className="flex items-center justify-between mb-6">
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white text-[#000080] border border-slate-200">
                    Light Background Master
                  </span>
                  <span className="text-xs font-mono text-slate-400">Vector SVG / Hi-Res PNG</span>
                </div>

                <div className="py-10 flex items-center justify-center bg-white rounded-2xl border border-slate-200/60 shadow-inner my-2">
                  <FectoLogo color="#000080" className="h-12 w-auto" />
                </div>

                <div className="pt-6 border-t border-slate-200 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-mono">Primary Fecto Navy (#000080)</span>
                  <button
                    onClick={() => handleDownloadLogo('navy')}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-[#000080] text-white hover:bg-[#000060] transition-all shadow-xs active:scale-95"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download SVG / PNG</span>
                  </button>
                </div>
              </div>

              {/* Card 2: White Transparent Logo on Navy BG */}
              <div className="bg-[#000080] rounded-3xl p-8 border border-white/10 shadow-xl flex flex-col justify-between group">
                <div className="flex items-center justify-between mb-6">
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-[#F4D5AB] border border-white/15">
                    Dark Background Reversed
                  </span>
                  <span className="text-xs font-mono text-blue-200">Vector SVG / Hi-Res PNG</span>
                </div>

                <div className="py-10 flex items-center justify-center bg-black/20 rounded-2xl border border-white/10 shadow-inner my-2">
                  <FectoLogo color="#FFFFFF" className="h-12 w-auto" />
                </div>

                <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs text-slate-300 font-mono">Monochrome Reversed (White)</span>
                  <button
                    onClick={() => handleDownloadLogo('white')}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-[#F4D5AB] text-[#000080] hover:bg-white transition-all shadow-xs active:scale-95"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download SVG / PNG</span>
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: COLOR SWATCHES (Interactive Hex Copy) */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#8B5E1A]">Brand Spectrum</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#000080] mt-1">
                  Color System & Swatches
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Click on any color tile to copy the exact HEX code to your clipboard.
                </p>
              </div>

              {/* Toast Feedback */}
              <div className="h-6">
                <AnimatePresence>
                  {copiedHex && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200"
                    >
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Copied {copiedHex} to clipboard!</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* 3 Swatch Cards */}
              <div className="space-y-4">
                {colorSwatches.map((swatch) => (
                  <div
                    key={swatch.name}
                    onClick={() => copyToClipboard(swatch.hex)}
                    style={{ backgroundColor: swatch.hex }}
                    className={`rounded-3xl p-6 sm:p-7 shadow-md cursor-pointer transition-all duration-200 hover:scale-[1.01] hover:shadow-xl relative overflow-hidden group ${swatch.textColor}`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className={`text-[11px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-md ${swatch.badgeBg}`}>
                          {swatch.role}
                        </span>
                        <h3 className="text-2xl font-black mt-2">
                          {swatch.name}
                        </h3>
                      </div>

                      {/* Copy Action Pill */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          copyToClipboard(swatch.hex);
                        }}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-bold shadow-xs transition-all ${
                          swatch.hex === '#F1F5F9'
                            ? 'bg-white text-[#000080] border border-slate-300'
                            : 'bg-white/20 text-white backdrop-blur-md hover:bg-white hover:text-[#000080]'
                        }`}
                      >
                        {copiedHex === swatch.hex ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-500" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>{swatch.hex}</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Print & Digital Color Values */}
                    <div className="pt-3 border-t border-current/15 grid grid-cols-2 gap-2 text-xs font-mono opacity-80">
                      <div>RGB: {swatch.rgb}</div>
                      <div>CMYK: {swatch.cmyk}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Brand Guidelines Manual Download */}
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white text-[#000080] flex items-center justify-center shadow-xs flex-shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-800">Brand Identity Manual (PDF)</div>
                    <div className="text-[11px] text-slate-500">Typography, clear space & misuse guidelines (4.8 MB)</div>
                  </div>
                </div>

                <button
                  onClick={() => alert('Downloading Fecto Cement Brand Identity Manual (PDF)...')}
                  className="px-4 py-2 rounded-xl bg-white text-[#000080] hover:bg-[#000080] hover:text-white transition-all text-xs font-bold border border-slate-200 shadow-2xs whitespace-nowrap"
                >
                  Download PDF
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 3: CORPORATE PHOTOGRAPHY ARCHIVE (Masonry Grid with Center Hover Download Icon) */}
      <section className="bg-[#F1F5F9] py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#8B5E1A]">Media Gallery</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#000080] mt-1">
              High-Resolution Corporate Photography
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2">
              Approved photography for editorial and journalistic reuse. Hover over any image to download the print-ready asset.
            </p>
          </div>

          {/* Masonry-Style Responsive Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {photoArchive.map((asset, index) => (
              <motion.div
                key={asset.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.1 }}
                className={`relative rounded-3xl overflow-hidden group shadow-md hover:shadow-2xl transition-all duration-300 ${asset.aspect}`}
              >
                {/* Image */}
                <Image
                  src={asset.image}
                  alt={asset.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Gradient Shadow */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Category Pill */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/90 text-[#000080] backdrop-blur-md shadow-xs">
                    {asset.category}
                  </span>
                </div>

                {/* Absolute Centered Download Action (Appears on Hover) */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 pointer-events-none">
                  <button
                    onClick={() => handleDownloadPhoto(asset)}
                    className="pointer-events-auto w-14 h-14 rounded-full bg-[#F4D5AB] text-[#000080] flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-transform"
                    title="Download High-Resolution Image"
                  >
                    <Download className="w-6 h-6" />
                  </button>
                </div>

                {/* Bottom Caption */}
                <div className="absolute inset-x-0 bottom-0 p-6 z-10 text-white">
                  <h3 className="text-base font-bold text-white leading-snug mb-1">
                    {asset.title}
                  </h3>
                  <div className="text-[11px] font-mono text-slate-300 opacity-90">
                    {asset.resolution}
                  </div>
                </div>
              </motion.div>
            ))}
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

