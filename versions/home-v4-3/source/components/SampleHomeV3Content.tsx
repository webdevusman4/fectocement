'use client';

import React from 'react';
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

interface SampleHomeV3ContentProps {
  onRequestQuote: (productName?: string) => void;
}

/**
 * Flip this to true for full-page screenshot capture or static review.
 * It makes every V4.3 section deterministic; normal desktop visitors
 * receive restrained one-time motion.
 */
const SCREENSHOT_SAFE_MODE = false;

/**
 * Sample Home Page Experience (V4.3)
 *
 * Features:
 * - Hero: Plant Anatomy drone tour (variant="hero"), open from the first frame, single viewport,
 *   page <h1>, primary quote action, and the "Fly through" tour. Replaces the former HeroSection carousel.
 * - Stats Bento Section in normal flow below the hero.
 * - Founder Legacy (V4.3): executive-restraint reveals, static editorial background, and composed portrait.
 * - Company History (V4.3): compact sample timeline with one-time clip reveals and one scroll-linked rail.
 * - Stakeholder Routing Grid: normal flow after Company History, capture-safe.
 * - Product Portfolio, Sustainability & ESG, and Iconic Projects (V4.3): clear sample data,
 *   one-time executive reveals, static capture mode, and no parallax or looping effects.
 * - Combined CTA band and Corporate Footer: static, normal-flow treatment.
 */
export default function SampleHomeV3Content({
  onRequestQuote,
}: SampleHomeV3ContentProps) {
  return (
    <div className="relative isolate">
      {/* 1. Hero - Plant Anatomy drone tour (single viewport, free mode, no iris entrance) */}
      <PlantAnatomy
        variant="hero"
        onRequestQuote={() => onRequestQuote()}
        staticReveal={SCREENSHOT_SAFE_MODE}
        className="relative"
      />

      {/* 2. Stats Bento Section - normal flow below the hero */}
      <div className="relative z-20 mt-12 sm:mt-16 mb-12 sm:mb-16 w-full flex justify-center px-3 sm:px-4">
        <div className="w-full max-w-[1280px] px-4 sm:px-6 md:px-8">
          <StatsBento
            trigger={!SCREENSHOT_SAFE_MODE}
            standalone={false}
            staticReveal={SCREENSHOT_SAFE_MODE}
          />
        </div>
      </div>

      {/* 3. Founder Legacy - V4.3 executive restraint motion */}
      <FounderLegacy
        quote={{
          text: 'Trust was the first currency; industry became the way to keep it.',
          attribution: 'Editorial theme · illustrative copy',
        }}
        historyHref="#heritage"
        bgSrc="/images/founder-bg.jpg"
        staticReveal={SCREENSHOT_SAFE_MODE}
        className={`${Z.founder} relative`}
      />

      {/* 4. Company History - V4.3 executive restraint motion */}
      <CompanyHistory
        staticReveal={SCREENSHOT_SAFE_MODE}
        className={`${Z.history} relative`}
      />

      {/* 5. Stakeholder Routing Grid - continues the light Company History sheet */}
      <StakeholderRoutingGrid
        onRequestQuote={() => onRequestQuote()}
        staticReveal={SCREENSHOT_SAFE_MODE}
        overlapPrevious={false}
        className={`${Z.path} relative`}
      />

      {/* 6. Product Portfolio - V4.3 static sample profile */}
      <ProductPortfolio
        onRequestQuote={(productName) => onRequestQuote(productName)}
        onDownloadSpec={(productName) => {
          alert(`Mock design note: connect a verified technical data sheet for ${productName} before launch.`);
        }}
        staticReveal={SCREENSHOT_SAFE_MODE}
        className={`${Z.product} relative`}
      />

      {/* 7. Sustainability & ESG - V4.3 measured sample framework */}
      <SustainabilitySection
        onDownloadReport={() => {
          alert('Mock design note: connect a verified ESG report before launch.');
        }}
        staticReveal={SCREENSHOT_SAFE_MODE}
        className={`${Z.sustain} relative`}
      />

      {/* 8. Iconic Projects - V4.3 portfolio cards */}
      <IconicProjects
        onViewAllProjects={() => onRequestQuote('Project enquiry')}
        onSelectProject={(title) => {
          onRequestQuote(`Project reference: ${title}`);
        }}
        staticReveal={SCREENSHOT_SAFE_MODE}
        className={`${Z.skyline} relative`}
      />

      {/* 9. Corporate Footer */}
      <CorporateFooter
        onRequestQuote={() => onRequestQuote()}
        onContactSales={() => onRequestQuote('Sales & Enterprise')}
        staticReveal={SCREENSHOT_SAFE_MODE}
      />
    </div>
  );
}
