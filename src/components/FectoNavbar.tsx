'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ChevronDown, Menu, ArrowRight, Globe } from 'lucide-react';
import FectoLogo from './FectoLogo';
import CompanyDropdown from './CompanyDropdown';
import InvestorsDropdown from './InvestorsDropdown';
import ProductsDropdown from './ProductsDropdown';
import CareersNewsDropdown from './CareersNewsDropdown';
import MobileMenu from './MobileMenu';

export interface FectoNavbarProps {
  onCtaClick?: () => void;
  className?: string;
}

export const FectoNavbar: React.FC<FectoNavbarProps> = ({
  onCtaClick,
  className = '',
}) => {
  const [activeDropdown, setActiveDropdown] = useState<'company' | 'investors' | 'products' | 'careers' | null>(null);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const langTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Handle scroll detection for dynamic elevation styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (langTimeoutRef.current) clearTimeout(langTimeoutRef.current);
    };
  }, []);

  // Dropdown hover management with safety debounce
  const handleMouseEnter = (menu: 'company' | 'investors' | 'products' | 'careers') => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (langTimeoutRef.current) {
      clearTimeout(langTimeoutRef.current);
      langTimeoutRef.current = null;
    }
    setIsLangOpen(false);
    setActiveDropdown(menu);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 120);
  };

  const handleLangMouseEnter = () => {
    if (langTimeoutRef.current) {
      clearTimeout(langTimeoutRef.current);
      langTimeoutRef.current = null;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setActiveDropdown(null);
    setIsLangOpen(true);
  };

  const handleLangMouseLeave = () => {
    langTimeoutRef.current = setTimeout(() => {
      setIsLangOpen(false);
    }, 150);
  };

  // Keyboard navigation support
  const handleKeyDown = (e: React.KeyboardEvent, menu: 'company' | 'investors' | 'products' | 'careers') => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setActiveDropdown(activeDropdown === menu ? null : menu);
    } else if (e.key === 'Escape') {
      setActiveDropdown(null);
    }
  };

  return (
    <>
      {/* Outer Floating Wrapper: Floats exactly 12px from top margin */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 flex justify-center px-3 sm:px-4 pointer-events-none transition-all duration-300 ${
          isScrolled ? 'pt-2' : 'pt-3'
        } ${className}`}
      >
        {/* Floating Pill Container: Glass-Arctic light frosted material */}
        <div
          role="navigation"
          aria-label="Main Navigation"
          className={`pointer-events-auto relative w-full max-w-[1280px] rounded-full transition-all duration-300 ${
            isScrolled ? 'glass-arctic-scrolled' : 'glass-arctic'
          }`}
        >
          {/* Subtle Top Specular Glass Reflection Rim */}
          <div className="absolute inset-x-8 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none rounded-full" />
          
          {/* Main Navbar Inner Bar — 80px height */}
          <div className="flex items-center justify-between h-[80px] px-4 sm:px-6 md:px-8">
            
            {/* 1. LEFT SIDE: OFFICIAL FECTO LOGO — BLUE COLORED (#000080) */}
            <div className="flex-shrink-0 flex items-center">
              <a
                href="/"
                aria-label="Fecto Cement Limited - Home"
                className="group flex items-center py-1 transition-transform duration-200 hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F4D5AB] rounded-lg"
              >
                <FectoLogo
                  color="#000080"
                  className="h-8 sm:h-9 md:h-10 w-auto text-[#000080] transition-opacity duration-200 group-hover:opacity-90"
                />
              </a>
            </div>

            {/* 2. CENTER: SITE NAVIGATION LINKS (DESKTOP) — Font size 1.1rem, Fecto Navy */}
            <nav className="hidden lg:flex items-center justify-center space-x-1 xl:space-x-2">
              
              {/* Link 1: Company (Includes Detached Mega-Menu Dropdown) */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter('company')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  type="button"
                  aria-expanded={activeDropdown === 'company'}
                  aria-haspopup="true"
                  onClick={() => setActiveDropdown(activeDropdown === 'company' ? null : 'company')}
                  onKeyDown={(e) => handleKeyDown(e, 'company')}
                  className={`flex items-center gap-1.5 px-4 py-2.5 text-[1.1rem] font-medium transition-all duration-200 ease-in-out rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F4D5AB] ${
                    activeDropdown === 'company'
                      ? 'text-[#000080] bg-[#000080]/10'
                      : 'text-[#000080] hover:bg-[#000080]/5'
                  }`}
                >
                  <span>Company</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ease-in-out text-[#000080]/70 ${
                      activeDropdown === 'company' ? 'rotate-180 text-[#000080]' : ''
                    }`}
                  />
                </button>

                {/* Detached Mega-Menu: Opens below floating navbar with pt-4 hover bridge */}
                <CompanyDropdown
                  isOpen={activeDropdown === 'company'}
                  onMouseEnter={() => handleMouseEnter('company')}
                  onMouseLeave={handleMouseLeave}
                />
              </div>

              {/* Link 2: Investors (Includes Detached Mega-Menu Dropdown) */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter('investors')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  type="button"
                  aria-expanded={activeDropdown === 'investors'}
                  aria-haspopup="true"
                  onClick={() => setActiveDropdown(activeDropdown === 'investors' ? null : 'investors')}
                  onKeyDown={(e) => handleKeyDown(e, 'investors')}
                  className={`flex items-center gap-1.5 px-4 py-2.5 text-[1.1rem] font-medium transition-all duration-200 ease-in-out rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F4D5AB] ${
                    activeDropdown === 'investors'
                      ? 'text-[#000080] bg-[#000080]/10'
                      : 'text-[#000080] hover:bg-[#000080]/5'
                  }`}
                >
                  <span>Investors</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ease-in-out text-[#000080]/70 ${
                      activeDropdown === 'investors' ? 'rotate-180 text-[#000080]' : ''
                    }`}
                  />
                </button>

                {/* Detached Mega-Menu: Opens below floating navbar with pt-4 hover bridge */}
                <InvestorsDropdown
                  isOpen={activeDropdown === 'investors'}
                  onMouseEnter={() => handleMouseEnter('investors')}
                  onMouseLeave={handleMouseLeave}
                />
              </div>

              {/* Link 3: Products (Includes Detached Mega-Menu Dropdown) */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter('products')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  type="button"
                  aria-expanded={activeDropdown === 'products'}
                  aria-haspopup="true"
                  onClick={() => setActiveDropdown(activeDropdown === 'products' ? null : 'products')}
                  onKeyDown={(e) => handleKeyDown(e, 'products')}
                  className={`flex items-center gap-1.5 px-4 py-2.5 text-[1.1rem] font-medium transition-all duration-200 ease-in-out rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F4D5AB] ${
                    activeDropdown === 'products'
                      ? 'text-[#000080] bg-[#000080]/10'
                      : 'text-[#000080] hover:bg-[#000080]/5'
                  }`}
                >
                  <span>Products</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ease-in-out text-[#000080]/70 ${
                      activeDropdown === 'products' ? 'rotate-180 text-[#000080]' : ''
                    }`}
                  />
                </button>

                {/* Detached Mega-Menu: Opens below floating navbar with pt-4 hover bridge */}
                <ProductsDropdown
                  isOpen={activeDropdown === 'products'}
                  onMouseEnter={() => handleMouseEnter('products')}
                  onMouseLeave={handleMouseLeave}
                />
              </div>

              {/* Link 4: Careers & news (Includes Detached Mega-Menu Dropdown) */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter('careers')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  type="button"
                  aria-expanded={activeDropdown === 'careers'}
                  aria-haspopup="true"
                  onClick={() => setActiveDropdown(activeDropdown === 'careers' ? null : 'careers')}
                  onKeyDown={(e) => handleKeyDown(e, 'careers')}
                  className={`flex items-center gap-1.5 px-4 py-2.5 text-[1.1rem] font-medium transition-all duration-200 ease-in-out rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F4D5AB] ${
                    activeDropdown === 'careers'
                      ? 'text-[#000080] bg-[#000080]/10'
                      : 'text-[#000080] hover:bg-[#000080]/5'
                  }`}
                >
                  <span>Careers & news</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ease-in-out text-[#000080]/70 ${
                      activeDropdown === 'careers' ? 'rotate-180 text-[#000080]' : ''
                    }`}
                  />
                </button>

                {/* Detached Mega-Menu: Opens below floating navbar with pt-4 hover bridge */}
                <CareersNewsDropdown
                  isOpen={activeDropdown === 'careers'}
                  onMouseEnter={() => handleMouseEnter('careers')}
                  onMouseLeave={handleMouseLeave}
                />
              </div>
            </nav>

            {/* 3. RIGHT SIDE: LANGUAGE SWITCHER + CTA */}
            <div className="flex items-center gap-3">
              {/* Language Switcher Dropdown */}
              <div
                className="relative hidden md:inline-block"
                onMouseEnter={handleLangMouseEnter}
                onMouseLeave={handleLangMouseLeave}
              >
                <button
                  type="button"
                  aria-expanded={isLangOpen}
                  aria-haspopup="true"
                  onClick={() => setIsLangOpen((prev) => !prev)}
                  className="inline-flex items-center gap-1.5 text-[1.1rem] font-medium text-[#000080] px-3 py-1.5 rounded-full hover:bg-[#000080]/5 transition-colors cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F4D5AB]"
                >
                  <Globe className="w-4 h-4 text-[#000080]" />
                  <span>EN</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 text-[#000080]/70 ${
                      isLangOpen ? 'rotate-180 text-[#000080]' : ''
                    }`}
                  />
                </button>

                {/* Dropdown Card */}
                {isLangOpen && (
                  <div className="absolute top-full right-0 mt-2 w-32 bg-white rounded-xl shadow-xl border border-slate-100 p-2 flex flex-col gap-1 z-50 before:absolute before:-top-2 before:left-0 before:w-full before:h-2">
                    {/* English (EN) - Active */}
                    <button
                      type="button"
                      className="text-left px-3 py-2 rounded-lg bg-slate-50 text-[#000080] font-bold text-sm"
                    >
                      English (EN)
                    </button>

                    {/* Urdu (UR) - Disabled with Tooltip */}
                    <div className="relative group">
                      <button
                        type="button"
                        disabled
                        className="w-full text-left px-3 py-2 rounded-lg text-slate-400 opacity-60 cursor-not-allowed text-sm font-medium"
                      >
                        Urdu (UR)
                      </button>
                      <div className="absolute right-full mr-2 top-1/2 -translate-y-1/2 w-max px-2 py-1 bg-black/80 text-white text-[10px] rounded opacity-0 pointer-events-none transition-opacity group-hover:opacity-100 shadow-sm z-50">
                        Coming soon
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Desktop CTA Pill Button — Champagne Sand bg, Fecto Navy text */}
              <Link
                href="/request-quote"
                className="hidden sm:inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-all duration-200 ease-in-out shadow-sm hover:scale-[1.03] active:scale-[0.98] hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#000080] bg-[#F4D5AB] text-[#000080]"
              >
                <span>Request a quote</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>

              {/* Mobile Menu Hamburger Button — Fecto Navy */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open navigation menu"
                className="lg:hidden p-2 rounded-full text-[#000080] hover:bg-[#000080]/5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F4D5AB]"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
};

export default FectoNavbar;
