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
        videoWebmUrl="/fecto-bag-transparent.webm"
        videoMp4Url="/fecto-bag.mp4"
      />

      {/* 2. Stats Bento Section (Crucial: Preserved & Prominently Positioned) */}
      <div className="relative z-20 -mt-10 sm:-mt-16 mb-12 sm:mb-16 px-4 sm:px-6">
        <StatsBento trigger={true} standalone={false} />
      </div>

      {/* 3. Founder Legacy - The Physical "Curtain Reveal" Section */}
      <FounderLegacy />

      {/* 4. Company History - The Zig-Zag Alternating Heritage Timeline */}
      <CompanyHistory />

      {/* 5. Plant Anatomy - Pseudo-3D Continuous Pan & Zoom Drone Tour */}
      <PlantAnatomy />

      {/* 6. Stakeholder Routing Grid (B2B navigation funnel) with transparent background */}
      <StakeholderRoutingGrid
        onRequestQuote={() => onRequestQuote()}
        className="!bg-transparent"
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
      />

      {/* 8. Sustainability & ESG (Heavy navy visual chapter) */}
      <SustainabilitySection
        onDownloadReport={() => {
          alert('Downloading Fecto Cement 2026 ESG & Sustainability Report...');
        }}
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
        className="!bg-white/80 backdrop-blur-md"
      />

      {/* 10. Corporate Footer */}
      <CorporateFooter
        onRequestQuote={() => onRequestQuote()}
        onContactSales={() => onRequestQuote('Sales & Enterprise')}
      />
    </div>
  );
}
