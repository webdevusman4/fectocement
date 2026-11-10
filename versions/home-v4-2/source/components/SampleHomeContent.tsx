'use client';

import React from 'react';
import HeroSection, { StatKey } from './HeroSection';
import StatsBento from './StatsBento';
import FounderLegacy from './FounderLegacy';
import CompanyHistory from './CompanyHistory';
import PlantAnatomy from './PlantAnatomy';
import StakeholderRoutingGrid from './StakeholderRoutingGrid';
import ProductPortfolio from './ProductPortfolio';
import SustainabilitySection from './SustainabilitySection';
import IconicProjects from './IconicProjects';
import CorporateFooter from './CorporateFooter';
import { Z } from '../lib/motion';

interface SampleHomeContentProps {
  onRequestQuote: (productName?: string) => void;
}

/**
 * Sample Home Page Experience (V2 - Now Default)
 * 
 * Features:
 * - High-impact Corporate HeroSection with crystal-clear 4K background and transparent looping 3D cement bag video.
 * - Stats Bento Section (preserved & prominent) with animated counters.
 * - Founder Legacy "Curtain Reveal" Section.
 * - Company History Timeline (nearly eight decades).
 * - Plant Anatomy Interactive Drone Tour (with coordinate picker debug mode).
 * - Stakeholder Routing Grid, Precision Product Portfolio, Sustainability & ESG, Iconic Projects, and Corporate Footer.
 */
export default function SampleHomeContent({
  onRequestQuote,
}: SampleHomeContentProps) {
  const [statHighlight, setStatHighlight] = React.useState<StatKey | undefined>('capacity');

  return (
    <div className="relative isolate">
      {/* 1. First Home Page Hero Section (Crystal Clear Background + 3D Looping Video Bag) */}
      <HeroSection
        onRequestQuote={() => onRequestQuote()}
        onExploreProducts={() => {
          const el = document.getElementById('products');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onActiveHighlightChange={setStatHighlight}
        backgroundImageUrl="/herobg.jpg"
        bagImageUrl="/fecto-50kg-bag.png"
        videoWebmUrl="/Untitled design.webm"
        videoMp4Url="/Untitled design.mp4"
      />

      {/* 2. Stats Bento Section (Crucial: Preserved & Prominently Positioned) */}
      <div className="relative z-20 -mt-10 sm:-mt-16 mb-12 sm:mb-16 w-full flex justify-center px-3 sm:px-4">
        <div className="w-full max-w-[1280px] px-4 sm:px-6 md:px-8">
          <StatsBento trigger={true} standalone={false} activeHighlight={statHighlight} />
        </div>
      </div>

      {/* 3. Founder Legacy - The Physical "Curtain Reveal" Section */}
      <FounderLegacy className={`${Z.founder} relative`} />

      {/* 4. Company History - The Zig-Zag Alternating Heritage Timeline */}
      <CompanyHistory className={`${Z.history} relative`} />

      {/* 5. Plant Anatomy - Pseudo-3D Continuous Pan & Zoom Drone Tour */}
      <PlantAnatomy className={`${Z.plant} relative`} />

      {/* 6. Stakeholder Routing Grid (B2B navigation funnel) with fade-through mist */}
      <StakeholderRoutingGrid
        onRequestQuote={() => onRequestQuote()}
        className={`${Z.path} relative`}
      />

      {/* 7. Product Portfolio (Target of the Hero 'Explore products' CTA) */}
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

      {/* 8. Sustainability & ESG (Eco & sustainability chapter) */}
      <SustainabilitySection
        onDownloadReport={() => {
          alert('Downloading Fecto Cement 2026 ESG & Sustainability Report...');
        }}
        className={`${Z.sustain} relative`}
      />

      {/* 9. Iconic Projects (Gallery showcase) */}
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
