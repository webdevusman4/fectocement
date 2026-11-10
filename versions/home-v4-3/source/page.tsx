'use client';

import React, { useState } from 'react';
import FectoNavbar from './components/FectoNavbar';
import QuoteModal from './components/QuoteModal';
import SampleHomeV3Content from './components/SampleHomeV3Content';

export default function HomePage() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string>('');

  const handleOpenQuote = (productName?: string) => {
    setSelectedProduct(productName ?? '');
    setQuoteModalOpen(true);
  };

  return (
    <main
      id="home"
      data-route="home-v4-3"
      className="relative isolate min-h-screen bg-[#F1F5F9] text-[#000080] selection:bg-[#F4D5AB] selection:text-[#000080] overflow-x-clip"
    >
      {/* 1. FLOATING BRAND NAVBAR */}
      <FectoNavbar onCtaClick={() => handleOpenQuote()} />

      {/* 2. V4.3 HOME PAGE EXPERIENCE */}
      <SampleHomeV3Content onRequestQuote={handleOpenQuote} />

      {/* 3. INTERACTIVE QUOTE MODAL */}
      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        selectedProduct={selectedProduct}
      />
    </main>
  );
}
