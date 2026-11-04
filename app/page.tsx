'use client';

import React, { useState } from 'react';
import FectoNavbar from '@/components/FectoNavbar';
import HeroSection from '@/components/HeroSection';
import StakeholderRoutingGrid from '@/components/StakeholderRoutingGrid';
import CompanyGlimpse from '@/components/CompanyGlimpse';
import ProductPortfolio from '@/components/ProductPortfolio';
import SustainabilitySection from '@/components/SustainabilitySection';
import IconicProjects from '@/components/IconicProjects';
import CorporateFooter from '@/components/CorporateFooter';
import QuoteModal from '@/components/QuoteModal';
import FectoLogo from '@/components/FectoLogo';

export default function HomePage() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string>('');

  const handleOpenQuote = (productName?: string) => {
    if (productName) {
      setSelectedProduct(productName);
    }
    setQuoteModalOpen(true);
  };

  return (
    <main className="relative min-h-screen bg-[#F1F5F9] text-[#000080] selection:bg-[#F4D5AB] selection:text-[#000080] overflow-x-hidden">
      
      {/* 1. FLOATING BRAND NAVBAR (Glass-Arctic Light Frosted Pill) */}
      <FectoNavbar onCtaClick={() => handleOpenQuote()} />

      {/* 2. SPECIFICATION-COMPLIANT HERO SECTION */}
      <HeroSection
        onRequestQuote={() => handleOpenQuote()}
        onExploreProducts={() => {
          const el = document.getElementById('products');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        backgroundImageUrl="/herobg.jpg"
        bagImageUrl="/fecto-50kg-bag.png"
        videoWebmUrl="/fecto-bag-transparent.webm"
        videoMp4Url="/fecto-bag.mp4"
      />

      {/* 3. STAKEHOLDER ROUTING GRID (PRIMARY B2B FUNNEL) */}
      <StakeholderRoutingGrid
        onRequestQuote={() => handleOpenQuote()}
      />

      {/* 4. COMPANY GLIMPSE (CORPORATE SCALE & LEGACY) */}
      <CompanyGlimpse
        onDiscoverHistory={() => {
          const el = document.getElementById('company');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* 5. PRODUCT PORTFOLIO (TECHNICAL B2B SPECIFICATIONS) */}
      <ProductPortfolio
        onRequestQuote={(productName) => handleOpenQuote(productName)}
        onDownloadSpec={(productName) => {
          // Provide instant feedback for tech sheet download
          const link = document.createElement('a');
          link.href = '/fecto-50kg-bag.png';
          link.download = `Fecto_${productName.replace(/[^a-zA-Z0-9]/g, '_')}_Specs.png`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }}
      />

      {/* 6. SUSTAINABILITY & ESG (HEAVY NAVY VISUAL BREAK) */}
      <SustainabilitySection
        onDownloadReport={() => {
          alert('Downloading Fecto Cement 2026 ESG & Sustainability Report...');
        }}
      />

      {/* 7. ICONIC PROJECTS (OUR FOOTPRINT BENTO GALLERY) */}
      <IconicProjects
        onViewAllProjects={() => {
          const el = document.getElementById('projects');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onSelectProject={(title) => {
          handleOpenQuote(title);
        }}
      />

      {/* 8. GLOBAL PRE-FOOTER CTA & MEGA CORPORATE FOOTER */}
      <CorporateFooter
        onRequestQuote={() => handleOpenQuote()}
        onContactSales={() => handleOpenQuote('Sales & Enterprise')}
      />

      {/* 7. INTERACTIVE QUOTE MODAL */}
      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
      />

    </main>
  );
}
