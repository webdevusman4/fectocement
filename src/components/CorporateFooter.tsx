'use client';

import React from 'react';
import Link from 'next/link';
import FectoLogo from './FectoLogo';
import { MapPin, Phone, Mail, ArrowRight } from 'lucide-react';

export interface CorporateFooterProps {
  onRequestQuote?: () => void;
  onContactSales?: () => void;
  className?: string;
}

// Pixel-perfect SVG Brand Icons for Footer Socials
const LinkedinIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const TwitterIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const FacebookIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

/**
 * Global CTA & Mega Corporate Footer Component
 * Part A: Pre-Footer CTA Bar
 * Part B: 4-Column Mega Footer Grid
 * Part C: Bottom Legal & PSX Ticker Bar
 */
export const CorporateFooter: React.FC<CorporateFooterProps> = ({
  onRequestQuote,
  onContactSales,
  className = '',
}) => {
  return (
    <footer
      className={`bg-[#000080] text-white selection:bg-[#F4D5AB] selection:text-[#000080] relative overflow-hidden ${className}`}
    >
      
      {/* ================================================================ */}
      {/* PART A: THE PRE-FOOTER CTA (Top Half)                             */}
      {/* ================================================================ */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            
            {/* Left Text */}
            <div className="max-w-2xl">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">
                Ready to build the future?
              </h3>
              <p className="text-blue-200 text-base md:text-lg font-normal leading-relaxed">
                Partner with Fecto Cement for bulk supplies and mega-project contracts.
              </p>
            </div>

            {/* Right Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 flex-shrink-0">
              
              {/* Primary: Request a bulk quote */}
              {onRequestQuote ? (
                <button
                  type="button"
                  onClick={onRequestQuote}
                  className="px-8 py-4 rounded-full font-bold text-base bg-[#F4D5AB] text-[#000080] hover:opacity-90 transition-all duration-200 shadow-xl hover:shadow-2xl active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  Request a bulk quote
                </button>
              ) : (
                <Link
                  href="/request-quote"
                  className="px-8 py-4 rounded-full font-bold text-base bg-[#F4D5AB] text-[#000080] hover:opacity-90 transition-all duration-200 shadow-xl hover:shadow-2xl active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white inline-block text-center"
                >
                  Request a bulk quote
                </Link>
              )}

              {/* Secondary: Contact Sales */}
              <button
                type="button"
                onClick={onContactSales}
                className="px-8 py-4 rounded-full font-bold text-base bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#000080] transition-all duration-200 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Contact Sales
              </button>

            </div>

          </div>
        </div>
      </div>

      {/* ================================================================ */}
      {/* PART B: THE MEGA FOOTER GRID (Middle Part)                       */}
      {/* ================================================================ */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Column 1: Brand & Legacy */}
          <div className="flex flex-col items-start">
            <a href="#home" aria-label="Fecto Cement Home" className="block">
              <FectoLogo color="#FFFFFF" className="h-8 w-auto text-white" />
            </a>
            
            <p className="text-blue-200 text-sm mt-6 mb-6 leading-relaxed font-normal">
              Forging the foundation of a modern nation since 1981. High-performance cement for critical infrastructure.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Fecto Cement on LinkedIn"
                className="w-9 h-9 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center text-[#F4D5AB] hover:bg-[#F4D5AB] hover:text-[#000080] transition-all duration-200"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Fecto Cement on Twitter"
                className="w-9 h-9 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center text-[#F4D5AB] hover:bg-[#F4D5AB] hover:text-[#000080] transition-all duration-200"
              >
                <TwitterIcon className="w-4 h-4" />
              </a>

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Fecto Cement on Facebook"
                className="w-9 h-9 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center text-[#F4D5AB] hover:bg-[#F4D5AB] hover:text-[#000080] transition-all duration-200"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-6 text-base tracking-wide">
              Company
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#company"
                  className="text-blue-200 text-sm hover:text-[#F4D5AB] transition-colors block py-0.5"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#products"
                  className="text-blue-200 text-sm hover:text-[#F4D5AB] transition-colors block py-0.5"
                >
                  Our Products
                </a>
              </li>
              <li>
                <a
                  href="#sustainability"
                  className="text-blue-200 text-sm hover:text-[#F4D5AB] transition-colors block py-0.5"
                >
                  Sustainability & ESG
                </a>
              </li>
              <li>
                <a
                  href="#careers-news"
                  className="text-blue-200 text-sm hover:text-[#F4D5AB] transition-colors block py-0.5"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#careers-news"
                  className="text-blue-200 text-sm hover:text-[#F4D5AB] transition-colors block py-0.5"
                >
                  Media & News
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Investor Relations */}
          <div>
            <h4 className="text-white font-semibold mb-6 text-base tracking-wide">
              Investors
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#annual-reports"
                  className="text-blue-200 text-sm hover:text-[#F4D5AB] transition-colors block py-0.5"
                >
                  Financial Reports
                </a>
              </li>
              <li>
                <a
                  href="#psx-filings"
                  className="text-blue-200 text-sm hover:text-[#F4D5AB] transition-colors block py-0.5"
                >
                  PSX Filings
                </a>
              </li>
              <li>
                <a
                  href="#governance"
                  className="text-blue-200 text-sm hover:text-[#F4D5AB] transition-colors block py-0.5"
                >
                  Corporate Governance
                </a>
              </li>
              <li>
                <a
                  href="#dividends"
                  className="text-blue-200 text-sm hover:text-[#F4D5AB] transition-colors block py-0.5"
                >
                  Dividend History
                </a>
              </li>
              <li>
                <a
                  href="#shareholders"
                  className="text-blue-200 text-sm hover:text-[#F4D5AB] transition-colors block py-0.5"
                >
                  Shareholder Services
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Corporate Contact */}
          <div>
            <h4 className="text-white font-semibold mb-6 text-base tracking-wide">
              Headquarters
            </h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#F4D5AB] flex-shrink-0 mt-0.5" />
                <span className="text-sm text-blue-200 leading-relaxed font-normal">
                  Fecto Building, 2nd Floor, 245-A, Block-6, P.E.C.H.S., Karachi, Pakistan
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#F4D5AB] flex-shrink-0" />
                <a
                  href="tel:+922134305555"
                  className="text-sm text-blue-200 hover:text-[#F4D5AB] transition-colors font-normal"
                >
                  +92 (21) 3430 5555
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#F4D5AB] flex-shrink-0" />
                <a
                  href="mailto:info@fectocement.com"
                  className="text-sm text-blue-200 hover:text-[#F4D5AB] transition-colors font-normal"
                >
                  info@fectocement.com
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ================================================================ */}
      {/* PART C: THE BOTTOM LEGAL BAR (Footer Bottom)                     */}
      {/* ================================================================ */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          
          {/* Left: Copyright */}
          <div className="text-xs text-blue-200/60 text-center md:text-left">
            © 2026 Fecto Cement Limited. All rights reserved.
          </div>

          {/* Center: PSX Listed Ticker Pill */}
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs font-mono font-bold tracking-widest text-[#F4D5AB]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>PSX: FECTO</span>
          </div>

          {/* Right: Legal Links */}
          <div className="text-xs text-blue-200/60 flex items-center gap-4">
            <a href="#privacy" className="hover:text-[#F4D5AB] transition-colors">
              Privacy Policy
            </a>
            <span className="text-white/20">|</span>
            <a href="#terms" className="hover:text-[#F4D5AB] transition-colors">
              Terms of Use
            </a>
            <span className="text-white/20">|</span>
            <a href="#sitemap" className="hover:text-[#F4D5AB] transition-colors">
              Site Map
            </a>
          </div>

        </div>
      </div>

    </footer>
  );
};

export default CorporateFooter;
