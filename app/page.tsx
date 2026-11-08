'use client';

import React, { useState, useEffect } from 'react';
import FectoNavbar from '@/components/FectoNavbar';
import HeroSection from '@/components/HeroSection';
import StakeholderRoutingGrid from '@/components/StakeholderRoutingGrid';
import ProductPortfolio from '@/components/ProductPortfolio';
import SustainabilitySection from '@/components/SustainabilitySection';
import IconicProjects from '@/components/IconicProjects';
import CorporateFooter from '@/components/CorporateFooter';
import QuoteModal from '@/components/QuoteModal';
import SampleHomeContent from '@/components/SampleHomeContent';
import SampleHomeV3Content from '@/components/SampleHomeV3Content';
import HomeVariantSwitcher, { HomeVariant } from '@/components/HomeVariantSwitcher';
import { Z } from '@/lib/motion';

export default function HomePage() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  // V3 is now the default new sample home page experience
  const [homeVariant, setHomeVariant] = useState<HomeVariant>('v3');

  // Detect URL query parameter (?v=1 legacy, ?v=2 sample v2, default is v3)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const v = params.get('v');
      if (v === '1' || params.get('legacy') === 'true') {
        setHomeVariant('v1');
      } else if (v === '2') {
        setHomeVariant('v2');
      } else {
        setHomeVariant('v3');
      }
    }
  }, []);

  const handleVariantChange = (v: HomeVariant) => {
    setHomeVariant(v);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      if (v === 'v1') {
        url.searchParams.set('v', '1');
      } else if (v === 'v2') {
        url.searchParams.set('v', '2');
      } else {
        url.searchParams.delete('v');
        url.searchParams.delete('sample');
        url.searchParams.delete('page');
        url.searchParams.delete('legacy');
      }
      window.history.replaceState({}, '', url.pathname + (url.search ? url.search : ''));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleOpenQuote = (productName?: string) => {
    if (productName) {
      setSelectedProduct(productName);
    }
    setQuoteModalOpen(true);
  };

  return (
    <main className="relative isolate min-h-screen bg-[#F1F5F9] text-[#000080] selection:bg-[#F4D5AB] selection:text-[#000080] overflow-x-clip">
      
      {/* 1. FLOATING BRAND NAVBAR (Glass-Arctic Light Frosted Pill) */}
      <FectoNavbar onCtaClick={() => handleOpenQuote()} />

      {/* 2. CONDITIONAL HOME PAGE EXPERIENCE */}
      {homeVariant === 'v3' ? (
        /* V3 (NEW SAMPLE V3): EDITORIAL MODERN HOME WITH ENHANCED FOUNDER LEGACY */
        <SampleHomeV3Content onRequestQuote={handleOpenQuote} />
      ) : homeVariant === 'v2' ? (
        /* V2: SAMPLE HOME EXPERIENCE */
        <SampleHomeContent onRequestQuote={handleOpenQuote} />
      ) : (
        /* V1 (LEGACY): STANDARD HOME */
        <>
          {/* Hero Section */}
          <HeroSection
            onRequestQuote={() => handleOpenQuote()}
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
            onRequestQuote={() => handleOpenQuote()}
            className={`${Z.path} relative`}
          />

          {/* Product Portfolio */}
          <ProductPortfolio
            onRequestQuote={(productName) => handleOpenQuote(productName)}
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
              handleOpenQuote(title);
            }}
            className={`${Z.skyline} relative`}
          />

          {/* Mega Corporate Footer */}
          <CorporateFooter
            onRequestQuote={() => handleOpenQuote()}
            onContactSales={() => handleOpenQuote('Sales & Enterprise')}
          />
        </>
      )}

      {/* 3. INTERACTIVE QUOTE MODAL */}
      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
      />

      {/* 4. HOME EXPERIENCE SWITCHER PILL (Integrated in Home Only) */}
      <HomeVariantSwitcher
        activeVariant={homeVariant}
        onVariantChange={handleVariantChange}
      />

    </main>
  );
}
