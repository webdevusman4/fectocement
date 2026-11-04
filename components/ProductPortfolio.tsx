'use client';

import React from 'react';
import Image from 'next/image';
import { Download, ArrowRight } from 'lucide-react';

export interface ProductItem {
  id: string;
  title: string;
  badges: string[];
  description: string;
  image: string;
  specsUrl?: string;
}

export interface ProductPortfolioProps {
  onRequestQuote?: (productName: string) => void;
  onDownloadSpec?: (productName: string) => void;
  className?: string;
}

const PRODUCTS: ProductItem[] = [
  {
    id: 'opc',
    title: 'Ordinary Portland Cement (OPC)',
    badges: ['Grade 53', 'EN 197-1 CEM I 42.5R'],
    description: 'High early strength for structural concrete, bridges, and high-rise buildings.',
    image: '/fecto-50kg-bag.png',
  },
  {
    id: 'src',
    title: 'Sulphate Resistant Cement (SRC)',
    badges: ['ASTM C-150 Type V', 'Coastal Grade'],
    description: 'Maximum protection against sulphate attacks. Ideal for foundations, coastal areas, and dams.',
    image: '/fecto-50kg-bag.png',
  },
  {
    id: 'slag',
    title: 'Portland Blast Furnace Slag Cement',
    badges: ['Eco-Friendly', 'Low Heat'],
    description: 'Enhanced durability and reduced thermal cracking for massive concrete pours.',
    image: '/fecto-50kg-bag.png',
  },
];

/**
 * High-Performance Product Portfolio Section
 * Showcases core cement varieties with technical B2B specifications and interactive cards.
 */
export const ProductPortfolio: React.FC<ProductPortfolioProps> = ({
  onRequestQuote,
  onDownloadSpec,
  className = '',
}) => {
  return (
    <section
      id="products"
      className={`bg-[#F1F5F9] py-24 scroll-mt-20 ${className}`}
    >
      <div className="max-w-7xl mx-auto px-6">
        
        {/* ================================================================ */}
        {/* SECTION HEADER (CENTERED)                                        */}
        {/* ================================================================ */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          {/* Eyebrow: Frosted Glass Badge with Bronze text */}
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/80 backdrop-blur-md border border-white/90 shadow-[0_4px_12px_rgba(0,0,128,0.06)] text-xs md:text-sm font-bold tracking-widest uppercase text-[#8B5E1A]">
            OUR PORTFOLIO
          </span>

          {/* Heading (H2): Fecto Navy #000080, 4xl/5xl, font-bold */}
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#000080] mt-4 mb-4 leading-tight">
            Engineered for every environment.
          </h2>

          {/* Subtext: text-slate-600, max-w-2xl, centered */}
          <p className="text-slate-600 text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-normal">
            Premium grade cement adhering to the highest global and Pakistani standards for mega-infrastructure and commercial builds.
          </p>
        </div>

        {/* ================================================================ */}
        {/* THE PRODUCT CARDS GRID (3 Columns - Elevated Surface Glass)      */}
        {/* ================================================================ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {PRODUCTS.map((product) => (
            <article
              key={product.id}
              className="group rounded-3xl p-8 relative overflow-hidden surface-elevated border-b-4 border-transparent hover:border-[#000080] flex flex-col justify-between"
            >
              
              {/* TOP & MIDDLE CONTENT WRAPPER */}
              <div>
                {/* 1. Top Area (Image Showcase) */}
                <div className="bg-gradient-to-b from-slate-50/80 to-slate-100/40 h-56 rounded-2xl flex items-center justify-center mb-6 relative overflow-hidden p-4 border border-slate-100/80">
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Image
                      src={product.image}
                      alt={`${product.title} 50kg Bag`}
                      width={180}
                      height={240}
                      className="max-h-44 w-auto object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-500 ease-out"
                      priority={false}
                    />
                  </div>
                </div>

                {/* 2. Middle Area (Specs Badges & Text) */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.badges.map((badge, idx) => (
                    <span
                      key={idx}
                      className="bg-white/85 backdrop-blur-sm text-[#000080] text-xs font-semibold px-3 py-1 rounded-full border border-slate-200/80 shadow-[0_2px_6px_rgba(0,0,128,0.04)]"
                    >
                      {badge}
                    </span>
                  ))}
                </div>

                {/* Product Title */}
                <h3 className="text-xl font-bold text-[#000080] mb-3 leading-snug">
                  {product.title}
                </h3>

                {/* Description */}
                <p className="text-slate-600 text-sm line-clamp-3 mb-8 leading-relaxed font-normal">
                  {product.description}
                </p>
              </div>

              {/* 3. Bottom Area (B2B CTAs) */}
              <div className="flex items-center justify-between pt-5 border-t border-slate-100 mt-auto">
                
                {/* Primary Action: Download Tech Sheet */}
                <button
                  type="button"
                  onClick={() => onDownloadSpec?.(product.title)}
                  className="text-[#000080] font-semibold hover:text-[#F4D5AB] flex items-center gap-2 transition-colors text-sm group/btn focus:outline-none focus-visible:ring-2 focus-visible:ring-[#000080] rounded py-1"
                  aria-label={`Download Tech Sheet for ${product.title}`}
                >
                  <Download className="w-4 h-4 text-[#000080] transition-transform duration-200 group-hover/btn:-translate-y-0.5" />
                  <span className="border-b border-transparent group-hover/btn:border-[#000080]/40">
                    Download Tech Sheet
                  </span>
                </button>

                {/* Secondary Action: Small circular arrow button filling with Fecto Navy */}
                <button
                  type="button"
                  onClick={() => onRequestQuote?.(product.title)}
                  className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-[#000080] group-hover:bg-[#000080] group-hover:text-white group-hover:border-[#000080] transition-all duration-300 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#000080]"
                  aria-label={`Inquire about ${product.title}`}
                >
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </button>

              </div>

            </article>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ProductPortfolio;
