'use client';

import React from 'react';
import HeroSection from '@/components/HeroSection';
import StatsBento from '@/components/StatsBento';
import FounderLegacy from '@/components/FounderLegacy';
import CompanyHistory from '@/components/CompanyHistory';
import PlantAnatomy from '@/components/PlantAnatomy';
import StakeholderRoutingGrid from '@/components/StakeholderRoutingGrid';
import ProductPortfolio from '@/components/ProductPortfolio';
import SustainabilitySection from '@/components/SustainabilitySection';
import IconicProjects from '@/components/IconicProjects';
import CorporateFooter from '@/components/CorporateFooter';
import { Z } from '@/lib/motion';

interface SampleHomeV3ContentProps {
  onRequestQuote: (productName?: string) => void;
}

/**
 * Sample Home Page Experience (V3 - New Sample V3)
 * 
 * Features:
 * - High-impact Corporate HeroSection with crystal-clear 4K background and transparent looping 3D cement bag video.
 * - Stats Bento Section with animated counters.
 * - Founder Legacy (New V3 Edition): Active scroll-tracking, Sand numerals, reactive archival portrait,
 *   pull-quote attribution, editorial closing beat, and 7-layer high-performance architectural background.
 * - Company History Timeline (nearly eight decades).
 * - Plant Anatomy Interactive Drone Tour.
 * - Stakeholder Routing Grid, Precision Product Portfolio, Sustainability & ESG, Iconic Projects, and Corporate Footer.
 */
export default function SampleHomeV3Content({
  onRequestQuote,
}: SampleHomeV3ContentProps) {
  return (
    <div className="relative isolate">
      {/* 1. First Home Page Hero Section (Crystal Clear Background + 3D Looping Video Bag) */}
      <HeroSection
        onRequestQuote={() => onRequestQuote()}
        onExploreProducts={() => {
          const el = document.getElementById('products');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        backgroundImageUrl="/herobg.jpg"
        bagImageUrl="/fecto-50kg-bag.png"
        videoWebmUrl="/Untitled design.webm"
        videoMp4Url="/Untitled design.mp4"
      />

      {/* 2. Stats Bento Section */}
      <div className="relative z-20 -mt-10 sm:-mt-16 mb-12 sm:mb-16 px-4 sm:px-6">
        <StatsBento trigger={true} standalone={false} />
      </div>

      {/* 3. Founder Legacy - Enhanced V3 with Founder Quote & Full History Link */}
      <FounderLegacy
        quote={{
          text: 'Faith before fortune, and a promise once made is never broken.',
          attribution: 'Ghulam Muhammad A. Fecto',
        }}
        historyHref="/company/history"
        bgSrc="/images/founder-bg.jpg"
        className={`${Z.founder} relative`}
      />

      {/* 4. Company History - The Heritage Timeline */}
      <CompanyHistory className={`${Z.history} relative`} />

      {/* 5. Plant Anatomy - Interactive Drone Tour */}
      <PlantAnatomy className={`${Z.plant} relative`} />

      {/* 6. Stakeholder Routing Grid */}
      <StakeholderRoutingGrid
        onRequestQuote={() => onRequestQuote()}
        className={`${Z.path} relative`}
      />

      {/* 7. Product Portfolio */}
      <ProductPortfolio
        onRequestQuote={(productName) => onRequestQuote(productName)}
        onDownloadSpec={(productName) => {
          const link = document.createElement('a');
          link.href = '/fecto-50kg-bag.png';
          link.download = `Fecto_${productName.replace(/[^a-zA-Z0-9]/g, '_')}_Specs.png`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }}
        className={`${Z.product} relative`}
      />

      {/* 8. Sustainability & ESG */}
      <SustainabilitySection
        onDownloadReport={() => {
          alert('Downloading Fecto Cement 2026 ESG & Sustainability Report...');
        }}
        className={`${Z.sustain} relative`}
      />

      {/* 9. Iconic Projects */}
      <IconicProjects
        onViewAllProjects={() => {
          const el = document.getElementById('projects');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onSelectProject={(title) => {
          onRequestQuote(title);
        }}
        className={`${Z.skyline} relative`}
      />

      {/* 10. Corporate Footer */}
      <CorporateFooter
        onRequestQuote={() => onRequestQuote()}
        onContactSales={() => onRequestQuote('Sales & Enterprise')}
      />
    </div>
  );
}

