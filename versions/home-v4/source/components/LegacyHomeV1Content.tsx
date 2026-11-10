'use client';

import React from 'react';
import HeroSection from './HeroSection';
import StakeholderRoutingGrid from './StakeholderRoutingGrid';
import ProductPortfolio from './ProductPortfolio';
import SustainabilitySection from './SustainabilitySection';
import IconicProjects from './IconicProjects';
import CorporateFooter from './CorporateFooter';
import { Z } from '../lib/motion';

interface LegacyHomeV1ContentProps {
  onRequestQuote: (productName?: string) => void;
}

export default function LegacyHomeV1Content({
  onRequestQuote,
}: LegacyHomeV1ContentProps) {
  return (
    <>
      {/* Hero Section */}
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

      {/* Stakeholder Routing Grid */}
      <StakeholderRoutingGrid
        onRequestQuote={() => onRequestQuote()}
        className={`${Z.path} relative`}
      />

      {/* Product Portfolio */}
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

      {/* Sustainability & ESG */}
      <SustainabilitySection
        onDownloadReport={() => {
          alert('Downloading Fecto Cement 2026 ESG & Sustainability Report...');
        }}
        className={`${Z.sustain} relative`}
      />

      {/* Iconic Projects */}
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

      {/* Mega Corporate Footer */}
      <CorporateFooter
        onRequestQuote={() => onRequestQuote()}
        onContactSales={() => onRequestQuote('Sales & Enterprise')}
      />
    </>
  );
}
