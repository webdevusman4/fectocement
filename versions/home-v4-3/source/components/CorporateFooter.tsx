'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MapPin, Phone, Mail, ArrowRight } from 'lucide-react';
import FectoLogo from './FectoLogo';
import { useMotionPrefs } from '../hooks/useMotionPrefs';
import { scrollToY } from './SmoothScroll';
import { EASE, DUR, Z } from '../lib/motion';

export interface CorporateFooterProps {
  onRequestQuote?: () => void;
  onContactSales?: () => void;
  className?: string;
  staticReveal?: boolean;
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
 *
 * Part 1: CTA Band ("Ready to build the future?")
 * - rounded-t-[40px] and rounded-b-[40px], -mt-10, relative, Z.cta (z-[80]).
 * - Masked headline reveal scrubbed by useScroll offset ['start 90%', 'start 50%'].
 * - Buttons fade in after headline.
 *
 * Part 2: Footer Curtain (md and up only)
 * - Footer: md:fixed md:inset-x-0 md:bottom-0 md:z-0.
 * - Measures height via ResizeObserver and sets --footer-h on <html>.
 * - CTA band has md:mb-[var(--footer-h)] to unmask the footer as it scrolls up.
 * - Visibility: visibility:hidden until sentinel enters viewport (rootMargin '0px 0px 80px 0px').
 * - Fallback to normal flow if footer is taller than 100svh or in SIMPLE mode.
 * - Giant "FECTO" wordmark in text-[27vw] leading-[0.8] tracking-tighter cropped at bottom.
 */
export const CorporateFooter: React.FC<CorporateFooterProps> = ({
  onRequestQuote,
  onContactSales,
  className = '',
  staticReveal = false,
}) => {
  const ctaRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);

  const { reduced: prefersReduced } = useMotionPrefs();
  const isReduced = prefersReduced || staticReveal;
  const simple = true;

  // CTA scrubbed scroll progress: start 90% -> start 50%
  const { scrollYProgress: ctaProgress } = useScroll({
    target: ctaRef,
    offset: ['start 90%', 'start 50%'],
  });

  const headlineY = useTransform(ctaProgress, [0, 1], ['100%', '0%']);
  const headlineOpacity = useTransform(ctaProgress, [0, 0.7], [0, 1]);
  const descY = useTransform(ctaProgress, [0.15, 0.75], [20, 0]);
  const descOpacity = useTransform(ctaProgress, [0.15, 0.75], [0, 1]);
  const buttonsY = useTransform(ctaProgress, [0.3, 0.85], [20, 0]);
  const buttonsOpacity = useTransform(ctaProgress, [0.3, 0.85], [0, 1]);

  // Footer measurement and curtain configuration
  const [footerHeight, setFooterHeight] = useState<number>(0);
  const [isTallerThan100svh, setIsTallerThan100svh] = useState<boolean>(false);
  const [isFooterVisible, setIsFooterVisible] = useState<boolean>(false);

  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;

    const measureHeight = () => {
      const h = el.offsetHeight;
      setFooterHeight(h);
      const windowH = window.innerHeight;
      const taller = h > windowH;
      setIsTallerThan100svh(taller);
      if (!taller) {
        document.documentElement.style.setProperty('--footer-h', `${h}px`);
      } else {
        document.documentElement.style.removeProperty('--footer-h');
      }
    };

    measureHeight();

    const ro = new ResizeObserver(() => {
      measureHeight();
    });
    ro.observe(el);
    window.addEventListener('resize', measureHeight);

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measureHeight);
      document.documentElement.style.removeProperty('--footer-h');
    };
  }, []);

  const isCurtain = !simple && !isTallerThan100svh && footerHeight > 0;

  // Unmask scroll progress: tracks the scroll distance as CTA slides up over the fixed footer
  const { scrollYProgress: unmaskProgress } = useScroll({
    target: spacerRef,
    offset: ['start end', 'end end'],
  });

  // Footer reveal transforms: smooth opacity, subtle parallax drift, and atmospheric scrim lift
  const footerContentOpacity = useTransform(unmaskProgress, [0, 0.65], [0.35, 1]);
  const footerContentY = useTransform(unmaskProgress, [0, 1], [-40, 0]);
  const footerContentScale = useTransform(unmaskProgress, [0, 1], [0.98, 1]);
  const footerScrimOpacity = useTransform(unmaskProgress, [0, 0.75], [0.35, 0]);
  const wordmarkY = useTransform(unmaskProgress, [0, 1], ['22%', '16%']);
  const wordmarkOpacity = useTransform(unmaskProgress, [0, 0.8], [0.03, 0.08]);

  // IntersectionObserver: activates footer visibility when spacer enters viewport range
  useEffect(() => {
    if (!isCurtain) {
      setIsFooterVisible(true);
      return;
    }

    const spacer = spacerRef.current;
    if (!spacer) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsFooterVisible(entry?.isIntersecting ?? false);
      },
      {
        rootMargin: '200px 0px 0px 0px',
      }
    );

    observer.observe(spacer);
    return () => observer.disconnect();
  }, [isCurtain]);

  // Global anchor interceptor for #footer and #contact links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('a');
      if (!target) return;
      const href = target.getAttribute('href');
      if (href === '#footer' || href === '#contact' || href?.endsWith('#footer') || href?.endsWith('#contact')) {
        e.preventDefault();
        const bottomY = document.documentElement.scrollHeight;
        scrollToY(bottomY, isReduced);
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, [isReduced]);

  return (
    <>
      {/* ================================================================ */}
      {/* PART 1: THE CTA BAND ("Ready to build the future?")              */}
      {/* ================================================================ */}
      <section
        ref={ctaRef}
        id="contact" data-anchor="cta"
        className={`relative ${Z.cta} -mt-10 rounded-t-[40px] rounded-b-[40px] bg-[#000080] text-white shadow-[0_-20px_60px_rgba(0,0,60,0.25),0_30px_70px_rgba(0,0,30,0.45),0_10px_20px_rgba(0,0,30,0.3)] overflow-hidden py-16 sm:py-20 lg:py-24 border-b border-white/10`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">

            {/* Left Headline & Description */}
            <div className="max-w-2xl">
              {/* Masked Headline Reveal: pb-[0.1em] prevents descender clipping */}
              <span className="block overflow-hidden pb-[0.1em]">
                {simple ? (
                  <motion.span
                    initial={false}
                    whileInView={undefined}
                    viewport={{ once: true }}
                    transition={{ duration: 0 }}
                    className="block text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.1]"
                  >
                    Ready to build the future?
                  </motion.span>
                ) : (
                  <motion.span
                    style={{ y: headlineY, opacity: headlineOpacity }}
                    className="block text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.1]"
                  >
                    Ready to build the future?
                  </motion.span>
                )}
              </span>

              {simple ? (
                <p className="text-blue-200 text-base md:text-lg font-normal leading-relaxed mt-3">
                  Partner with Fecto Cement for bulk supplies and mega-project contracts.
                </p>
              ) : (
                <motion.p
                  style={{ y: descY, opacity: descOpacity }}
                  className="text-blue-200 text-base md:text-lg font-normal leading-relaxed mt-3"
                >
                  Partner with Fecto Cement for bulk supplies and mega-project contracts.
                </motion.p>
              )}
            </div>

            {/* Right Action Buttons */}
            <motion.div
              style={simple ? undefined : { opacity: buttonsOpacity, y: buttonsY }}
              initial={false}
              whileInView={undefined}
              viewport={{ once: true }}
              transition={{ duration: 0 }}
              className="flex flex-wrap items-center gap-4 flex-shrink-0"
            >
              {/* Primary: Request a bulk quote */}
              {onRequestQuote ? (
                <button
                  type="button"
                  onClick={onRequestQuote}
                  className="px-8 py-4 rounded-full font-bold text-base bg-[#F4D5AB] text-[#000080] hover:bg-[#ffe3be] transition-all duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)] shadow-xl hover:shadow-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  Request a bulk quote
                </button>
              ) : (
                <Link
                  href="/request-quote"
                  className="px-8 py-4 rounded-full font-bold text-base bg-[#F4D5AB] text-[#000080] hover:bg-[#ffe3be] transition-all duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)] shadow-xl hover:shadow-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-white inline-block text-center"
                >
                  Request a bulk quote
                </Link>
              )}

              {/* Secondary: Contact Sales */}
              <button
                type="button"
                onClick={onContactSales}
                className="px-8 py-4 rounded-full font-bold text-base bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#000080] transition-all duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Contact Sales
              </button>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Spacer that holds the scroll height open for the fixed footer curtain on desktop */}
      <div
        ref={spacerRef}
        className="hidden md:block w-full pointer-events-none"
        style={{ height: isCurtain ? `${footerHeight}px` : 0 }}
        aria-hidden="true"
      />

      {/* ================================================================ */}
      {/* PART 2: THE CURTAIN FOOTER                                        */}
      {/* ================================================================ */}
      <footer
        ref={footerRef}
        id="footer"
        data-tone="dark"
        className={`bg-[#000080] text-white selection:bg-[#F4D5AB] selection:text-[#000080] overflow-hidden ${
          isCurtain
            ? 'md:fixed md:inset-x-0 md:bottom-0 md:z-0'
            : 'relative z-10'
        } ${className}`}
        style={isCurtain ? { visibility: isFooterVisible ? 'visible' : 'hidden' } : undefined}
      >
        {/* Atmospheric Scrim: melts away as the curtain opens */}
        {isCurtain && !simple && (
          <motion.div
            aria-hidden="true"
            style={{ opacity: footerScrimOpacity }}
            className="pointer-events-none absolute inset-0 bg-[#000030] z-[5]"
          />
        )}

        {/* Giant Architectural Wordmark: cropped 16% at bottom edge with subtle rise */}
        <motion.div
          aria-hidden="true"
          style={isCurtain && !simple ? { y: wordmarkY, opacity: wordmarkOpacity } : undefined}
          className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[16%] select-none z-0 overflow-hidden w-full text-center"
        >
          <span className="block font-display text-[27vw] font-black leading-[0.8] tracking-tighter text-[#F4D5AB]/[0.07]">
            FECTO
          </span>
        </motion.div>

        {/* The Mega Footer Grid with scrubbed fade-in & parallax rise */}
        <motion.div
          style={isCurtain && !simple ? { opacity: footerContentOpacity, y: footerContentY, scale: footerContentScale } : undefined}
          className="relative z-10 max-w-7xl mx-auto px-6 py-16"
        >
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
                  className="w-9 h-9 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center text-[#F4D5AB] hover:bg-[#F4D5AB] hover:text-[#000080] transition-all duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>

                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Fecto Cement on Twitter"
                  className="w-9 h-9 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center text-[#F4D5AB] hover:bg-[#F4D5AB] hover:text-[#000080] transition-all duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                >
                  <TwitterIcon className="w-4 h-4" />
                </a>

                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Fecto Cement on Facebook"
                  className="w-9 h-9 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center text-[#F4D5AB] hover:bg-[#F4D5AB] hover:text-[#000080] transition-all duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
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
                  <Link
                    href="/company/corporate-profile"
                    className="text-blue-200 text-sm hover:text-[#F4D5AB] transition-colors block py-0.5"
                  >
                    About Us
                  </Link>
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
                  <Link
                    href="/careers/overview"
                    className="text-blue-200 text-sm hover:text-[#F4D5AB] transition-colors block py-0.5"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="/media/news"
                    className="text-blue-200 text-sm hover:text-[#F4D5AB] transition-colors block py-0.5"
                  >
                    Media & News
                  </Link>
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
                  <Link
                    href="/investors/reports"
                    className="text-blue-200 text-sm hover:text-[#F4D5AB] transition-colors block py-0.5"
                  >
                    Financial Reports
                  </Link>
                </li>
                <li>
                  <Link
                    href="/investors/psx-disclosures"
                    className="text-blue-200 text-sm hover:text-[#F4D5AB] transition-colors block py-0.5"
                  >
                    PSX Filings
                  </Link>
                </li>
                <li>
                  <Link
                    href="/investors/corporate-governance"
                    className="text-blue-200 text-sm hover:text-[#F4D5AB] transition-colors block py-0.5"
                  >
                    Corporate Governance
                  </Link>
                </li>
                <li>
                  <Link
                    href="/investors/dividend-declarations"
                    className="text-blue-200 text-sm hover:text-[#F4D5AB] transition-colors block py-0.5"
                  >
                    Dividend History
                  </Link>
                </li>
                <li>
                  <Link
                    href="/investors/pattern-of-shareholding"
                    className="text-blue-200 text-sm hover:text-[#F4D5AB] transition-colors block py-0.5"
                  >
                    Shareholder Services
                  </Link>
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
        </motion.div>

        {/* The Bottom Legal Bar */}
        <motion.div
          style={isCurtain && !simple ? { opacity: footerContentOpacity } : undefined}
          className="relative z-10 border-t border-white/10"
        >
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
              <Link href="/privacy" className="hover:text-[#F4D5AB] transition-colors">
                Privacy Policy
              </Link>
              <span className="text-white/20">|</span>
              <Link href="/terms" className="hover:text-[#F4D5AB] transition-colors">
                Terms of Use
              </Link>
              <span className="text-white/20">|</span>
              <Link href="/sitemap" className="hover:text-[#F4D5AB] transition-colors">
                Site Map
              </Link>
            </div>

          </div>
        </motion.div>

      </footer>
    </>
  );
};

export default CorporateFooter;
