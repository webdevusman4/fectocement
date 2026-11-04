import React from 'react';
import Image from 'next/image';

export interface HeroSectionProps {
  onRequestQuote?: () => void;
  onExploreProducts?: () => void;
  backgroundImageUrl?: string;
  bagImageUrl?: string;
  videoWebmUrl?: string;
  videoMp4Url?: string;
  className?: string;
}

/**
 * Fecto Cement Limited - Next.js Corporate Hero Section
 * 
 * Features:
 * - Crystal Clear background photography (/herobg.jpg)
 * - Transparent 3D looping video transition (50kg cement bag -> particle vortex -> modern concrete architecture)
 * - Audio stripped and background removed for seamless alpha transparency
 * - Directional soft gradient scrim behind text ensures AAA readability
 */
export const HeroSection: React.FC<HeroSectionProps> = ({
  onRequestQuote,
  onExploreProducts,
  backgroundImageUrl = '/herobg.jpg',
  bagImageUrl = '/fecto-50kg-bag.png',
  videoWebmUrl = '/fecto-bag-transparent.webm',
  videoMp4Url = '/fecto-bag.mp4',
  className = '',
}) => {
  return (
    <section
      className={`relative min-h-screen w-full flex items-center justify-center bg-black overflow-hidden ${className}`}
    >
      {/* 1. CRYSTAL CLEAR BACKGROUND IMAGE (NO BLUR, FULL NATURAL RESOLUTION) */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={backgroundImageUrl}
          alt="Fecto Cement Heavy Infrastructure Construction"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* 2. EXACT 1/10th (10%) FADE OVERLAY */}
      {/* Soft 10% fade maintains 90% of the original photo's natural clarity and presence */}
      <div 
        className="absolute inset-0 bg-black/10 pointer-events-none" 
        aria-hidden="true"
      />
      {/* Soft feather gradient on the far left for crisp text contrast */}
      <div 
        className="absolute inset-0 bg-gradient-to-r from-black/25 via-black/10 to-transparent pointer-events-none" 
        aria-hidden="true"
      />

      {/* 3. SPLIT CONTENT STRUCTURE (Max-width 7xl, 2-column grid on desktop) */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-36 pb-20 sm:pt-40 sm:pb-24 lg:pt-48 lg:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* ============================================================== */}
          {/* LEFT COLUMN: Eyebrow, Main Headline, Sub-headline, and CTAs   */}
          {/* ============================================================== */}
          <div className="flex flex-col items-start text-left">
            
            {/* Eyebrow Text: Color #F4D5AB, uppercase, tracking-widest */}
            <span className="text-xs md:text-sm font-semibold tracking-widest uppercase text-[#F4D5AB] mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              SINCE 1981
            </span>

            {/* Main Headline (H1): Pure White, bold, tight leading with crisp legibility */}
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-[1.08] mb-2 drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
              Building Pakistan's Future.
            </h1>

            {/* Sub-headline: White/95 opacity with subtle text shadow */}
            <p className="text-lg md:text-xl font-normal text-white/95 max-w-lg my-6 md:my-8 leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              Delivering high-performance cement and sustainable industrial excellence.
            </p>

            {/* Action Buttons: Flex row */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              
              {/* Primary Button: "Request a bulk quote" */}
              <button
                type="button"
                onClick={onRequestQuote}
                className="inline-flex items-center justify-center px-8 py-4 rounded-full text-base font-bold text-[#000080] bg-white hover:bg-white/90 transition-all duration-200 shadow-2xl hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] active:scale-95 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
              >
                Request a bulk quote
              </button>

              {/* Secondary Button: "Explore products" */}
              <button
                type="button"
                onClick={onExploreProducts}
                className="inline-flex items-center justify-center px-8 py-[14px] rounded-full text-base font-semibold text-white bg-black/20 backdrop-blur-sm border-2 border-white hover:bg-white/15 transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black shadow-lg"
              >
                Explore products
              </button>

            </div>
          </div>

          {/* ============================================================== */}
          {/* RIGHT COLUMN: Transparent 3D Video Visual Anchor               */}
          {/* ============================================================== */}
          <div className="flex justify-center lg:justify-end items-center mt-8 lg:mt-0">
            <div className="relative group">
              
              {/* Soft Ambient Radial Glow Behind the Subject */}
              <div 
                className="absolute inset-0 bg-white/10 rounded-full blur-3xl transform scale-90 pointer-events-none" 
                aria-hidden="true"
              />

              {/* Transparent Loop Video with Deep Drop Shadow */}
              <div className="relative z-10 drop-shadow-[0_25px_50px_rgba(0,0,0,0.85)] transition-transform duration-500 group-hover:scale-105">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  className="w-auto max-w-[280px] sm:max-w-[340px] md:max-w-[400px] lg:max-w-[460px] max-h-[580px] object-contain"
                >
                  <source src={videoWebmUrl} type="video/webm; codecs=vp9" />
                  <source src={videoMp4Url} type="video/mp4" />
                  {/* Fallback Image */}
                  <Image
                    src={bagImageUrl}
                    alt="Fecto 50kg Portland Cement Bag"
                    width={420}
                    height={580}
                    priority
                    className="w-auto max-w-[280px] sm:max-w-[340px] md:max-w-[380px] lg:max-w-[420px] max-h-[580px] object-contain"
                  />
                </video>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
