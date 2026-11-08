'use client';

import React, { useState } from 'react';
import FectoNavbar from '@/components/FectoNavbar';
import QuoteModal from '@/components/QuoteModal';
import SampleHomeV3Content from '@/components/SampleHomeV3Content';
import HomeVariantSwitcher from '@/components/HomeVariantSwitcher';

export default function SampleV3Page() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string>('');

  const handleOpenQuote = (productName?: string) => {
    if (productName) {
      setSelectedProduct(productName);
    }
    setQuoteModalOpen(true);
  };

  return (
    <main className="relative isolate min-h-screen text-[#000080] selection:bg-[#F4D5AB] selection:text-[#000080] overflow-x-clip">
      {/* 1. Brand Navbar */}
      <FectoNavbar onCtaClick={() => handleOpenQuote()} />

      {/* 2. New Sample Home Page (V3 Experience) */}
      <SampleHomeV3Content onRequestQuote={handleOpenQuote} />

      {/* 3. Quote Modal */}
      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
      />

      {/* 4. Home Experience Switcher Pill */}
      <HomeVariantSwitcher activeVariant="v3" />
    </main>
  );
}

