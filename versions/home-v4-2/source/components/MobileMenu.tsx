'use client';

import React, { useState } from 'react';
import { 
  ChevronDown, 
  ArrowRight, 
  TrendingUp, 
  Package, 
  PhoneCall, 
  FileText, 
  ShieldCheck, 
  Truck,
  Building2,
  Briefcase,
  X,
  Globe
} from 'lucide-react';
import FectoLogo from './FectoLogo';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const [companyExpanded, setCompanyExpanded] = useState(false);
  const [investorsExpanded, setInvestorsExpanded] = useState(false);
  const [productsExpanded, setProductsExpanded] = useState(false);
  const [careersExpanded, setCareersExpanded] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop overlay with soft blur */}
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Dense 95% Opaque Floating Drawer */}
      <div 
        className="fixed top-3 left-3 right-3 max-h-[92vh] overflow-y-auto rounded-3xl p-6 bg-white/95 backdrop-blur-2xl shadow-[0_30px_60px_-15px_rgba(0,0,128,0.15)] border border-white flex flex-col justify-between"
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-5 border-b border-[#000080]/10">
            <a href="#home" onClick={onClose} className="block">
              <FectoLogo
                color="#000080"
                className="h-8 w-auto text-[#000080]"
              />
            </a>
            <button
              onClick={onClose}
              aria-label="Close navigation menu"
              className="p-2 rounded-full bg-[#000080]/5 text-[#000080] hover:bg-[#000080]/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links — Default 1.1rem */}
          <nav className="mt-6 space-y-2">
            
            {/* 1. Company Accordion */}
            <div className="rounded-2xl overflow-hidden bg-white/50 border border-[#000080]/10">
              <button
                onClick={() => setCompanyExpanded(!companyExpanded)}
                className="w-full flex items-center justify-between p-3.5 text-[1.1rem] font-medium text-[#000080] hover:bg-[#000080]/5 transition-all text-left"
                aria-expanded={companyExpanded}
              >
                <div className="flex items-center gap-2.5">
                  <Building2 className="w-4 h-4 text-[#8B5E1A]" />
                  <span>Company</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-[#000080]/60 transition-transform duration-200 ${
                    companyExpanded ? 'rotate-180 text-[#000080]' : ''
                  }`}
                />
              </button>

              {companyExpanded && (
                <div className="px-4 pb-4 pt-1 space-y-2 text-sm border-t border-[#000080]/10">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#8B5E1A] pt-2">About Us & Heritage</div>
                  <a href="/company/our-story" onClick={onClose} className="block p-2 rounded-xl text-slate-700 hover:text-[#000080] hover:bg-[#000080]/5">Our Story (Since 1981)</a>
                  <a href="/company/vision-mission" onClick={onClose} className="block p-2 rounded-xl text-slate-700 hover:text-[#000080] hover:bg-[#000080]/5">Vision & Mission</a>
                  <a href="/company/leadership" onClick={onClose} className="block p-2 rounded-xl text-slate-700 hover:text-[#000080] hover:bg-[#000080]/5">Meet Our Leaders</a>
                  <a href="/company/corporate-profile" onClick={onClose} className="block p-2 rounded-xl text-slate-700 hover:text-[#000080] hover:bg-[#000080]/5">Corporate Profile</a>
                  <a href="/company/history" onClick={onClose} className="block p-2 rounded-xl text-slate-700 hover:text-[#000080] hover:bg-[#000080]/5">Historic Milestones (Archive)</a>

                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#8B5E1A] pt-2 border-t border-slate-100">Infrastructure & Footprint</div>
                  <a href="/infrastructure/sangjani-plant" onClick={onClose} className="block p-2 rounded-xl text-slate-700 hover:text-[#000080] hover:bg-[#000080]/5">Sangjani Manufacturing Plant</a>
                  <a href="/infrastructure/iconic-projects" onClick={onClose} className="block p-2 rounded-xl text-slate-700 hover:text-[#000080] hover:bg-[#000080]/5">Iconic Projects (North & South)</a>
                  <a href="/infrastructure/production-capabilities" onClick={onClose} className="block p-2 rounded-xl text-slate-700 hover:text-[#000080] hover:bg-[#000080]/5">Production Capabilities</a>

                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#8B5E1A] pt-2 border-t border-slate-100">CSR & Sustainability</div>
                  <a href="/csr/sustainability-initiatives" onClick={onClose} className="block p-2 rounded-xl text-slate-700 hover:text-[#000080] hover:bg-[#000080]/5">Sustainability Initiatives</a>
                  <a href="/csr/carbon-reduction" onClick={onClose} className="block p-2 rounded-xl text-slate-700 hover:text-[#000080] hover:bg-[#000080]/5">Carbon Reduction Goals</a>
                  <a href="/csr/community-development" onClick={onClose} className="block p-2 rounded-xl text-slate-700 hover:text-[#000080] hover:bg-[#000080]/5">Community Development</a>
                  <a href="/company/corporate-governance" onClick={onClose} className="block p-2 rounded-xl text-slate-700 hover:text-[#000080] hover:bg-[#000080]/5">Corporate Governance</a>
                </div>
              )}
            </div>

            {/* 2. Investors Accordion */}
            <div className="rounded-2xl overflow-hidden bg-white/50 border border-[#000080]/10">
              <button
                onClick={() => setInvestorsExpanded(!investorsExpanded)}
                className="w-full flex items-center justify-between p-3.5 text-[1.1rem] font-medium text-[#000080] hover:bg-[#000080]/5 transition-all text-left"
                aria-expanded={investorsExpanded}
              >
                <div className="flex items-center gap-2.5">
                  <TrendingUp className="w-4 h-4 text-[#8B5E1A]" />
                  <span>Investors</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-[#000080]/60 transition-transform duration-200 ${
                    investorsExpanded ? 'rotate-180 text-[#000080]' : ''
                  }`}
                />
              </button>

              {investorsExpanded && (
                <div className="px-4 pb-4 pt-1 space-y-2 text-sm border-t border-[#000080]/10">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#8B5E1A] pt-2">Financial Performance</div>
                  <a href="/investors/reports" onClick={onClose} className="block p-2 rounded-xl text-slate-700 hover:text-[#000080] hover:bg-[#000080]/5">Annual & Quarterly Reports</a>
                  <a href="/investors/financial-ratios" onClick={onClose} className="block p-2 rounded-xl text-slate-700 hover:text-[#000080] hover:bg-[#000080]/5">Key Financial Ratios</a>

                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#8B5E1A] pt-2 border-t border-slate-100">Shareholder Services</div>
                  <a href="/investors/pattern-of-shareholding" onClick={onClose} className="block p-2 rounded-xl text-slate-700 hover:text-[#000080] hover:bg-[#000080]/5">Pattern of Shareholding</a>
                  <a href="/investors/dividend-declarations" onClick={onClose} className="block p-2 rounded-xl text-slate-700 hover:text-[#000080] hover:bg-[#000080]/5">Dividend Declarations</a>
                  <a href="/investors/agm-eogm-notices" onClick={onClose} className="block p-2 rounded-xl text-slate-700 hover:text-[#000080] hover:bg-[#000080]/5">AGM & EOGM Notices</a>

                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#8B5E1A] pt-2 border-t border-slate-100">Regulatory & Compliance</div>
                  <a href="/investors/psx-disclosures" onClick={onClose} className="block p-2 rounded-xl text-slate-700 hover:text-[#000080] hover:bg-[#000080]/5">PSX Disclosures</a>
                  <a href="/investors/grievances" onClick={onClose} className="block p-2 rounded-xl text-slate-700 hover:text-[#000080] hover:bg-[#000080]/5">Investor Grievances</a>
                  <a href="/investors/corporate-governance" onClick={onClose} className="block p-2 rounded-xl text-slate-700 hover:text-[#000080] hover:bg-[#000080]/5">Corporate Governance</a>

                  <div className="pt-2 border-t border-slate-100">
                    <a href="/investors/psx-market-data" onClick={onClose} className="block p-2 rounded-xl font-bold text-[#000080] bg-[#000080]/5 hover:bg-[#000080] hover:text-white transition-colors">
                      Live PSX Market Data →
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* 3. Products Accordion */}
            <div className="rounded-2xl overflow-hidden bg-white/50 border border-[#000080]/10">
              <button
                onClick={() => setProductsExpanded(!productsExpanded)}
                className="w-full flex items-center justify-between p-3.5 text-[1.1rem] font-medium text-[#000080] hover:bg-[#000080]/5 transition-all text-left"
                aria-expanded={productsExpanded}
              >
                <div className="flex items-center gap-2.5">
                  <Package className="w-4 h-4 text-[#8B5E1A]" />
                  <span>Products</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-[#000080]/60 transition-transform duration-200 ${
                    productsExpanded ? 'rotate-180 text-[#000080]' : ''
                  }`}
                />
              </button>

              {productsExpanded && (
                <div className="px-4 pb-4 pt-1 space-y-2 text-sm border-t border-[#000080]/10">
                  <a
                    href="#opc-cement"
                    onClick={onClose}
                    className="flex items-center justify-between p-2 rounded-xl text-slate-700 hover:text-[#000080] hover:bg-[#000080]/5 transition-colors"
                  >
                    <span>Ordinary Portland (OPC 42.5/53)</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#000080]/10 text-[#000080]">OPC</span>
                  </a>
                  <a
                    href="#src-cement"
                    onClick={onClose}
                    className="flex items-center justify-between p-2 rounded-xl text-slate-700 hover:text-[#000080] hover:bg-[#000080]/5 transition-colors"
                  >
                    <span>Sulphate Resistant Cement</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#000080]/10 text-[#000080]">SRC</span>
                  </a>
                  <a
                    href="#low-heat-cement"
                    onClick={onClose}
                    className="flex items-center justify-between p-2 rounded-xl text-slate-700 hover:text-[#000080] hover:bg-[#000080]/5 transition-colors"
                  >
                    <span>Low Heat Portland (Dams)</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#000080]/10 text-[#000080]">LH</span>
                  </a>
                  <a
                    href="#bulk-fleet"
                    onClick={onClose}
                    className="flex items-center gap-2 p-2 rounded-xl text-slate-700 hover:text-[#000080] hover:bg-[#000080]/5 transition-colors"
                  >
                    <Truck className="w-3.5 h-3.5 text-[#8B5E1A]" />
                    <span>Sangjani Bulk Tanker Fleet</span>
                  </a>
                </div>
              )}
            </div>

            {/* 4. Careers & news Accordion */}
            <div className="rounded-2xl overflow-hidden bg-white/50 border border-[#000080]/10">
              <button
                onClick={() => setCareersExpanded(!careersExpanded)}
                className="w-full flex items-center justify-between p-3.5 text-[1.1rem] font-medium text-[#000080] hover:bg-[#000080]/5 transition-all text-left"
                aria-expanded={careersExpanded}
              >
                <div className="flex items-center gap-2.5">
                  <Briefcase className="w-4 h-4 text-[#8B5E1A]" />
                  <span>Careers & news</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-[#000080]/60 transition-transform duration-200 ${
                    careersExpanded ? 'rotate-180 text-[#000080]' : ''
                  }`}
                />
              </button>

              {careersExpanded && (
                <div className="px-4 pb-4 pt-1 space-y-2 text-sm border-t border-[#000080]/10">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#8B5E1A] pt-2">Join Our Team</div>
                  <a href="/careers/overview" onClick={onClose} className="block p-2 rounded-xl text-slate-700 hover:text-[#000080] hover:bg-[#000080]/5">Careers Overview & Open Roles</a>
                  <a href="/careers/life-at-fecto" onClick={onClose} className="block p-2 rounded-xl text-slate-700 hover:text-[#000080] hover:bg-[#000080]/5">Life at Fecto</a>
                  <a href="/careers/trainee-programs" onClick={onClose} className="block p-2 rounded-xl text-slate-700 hover:text-[#000080] hover:bg-[#000080]/5">Engineering Trainee Programs</a>
                  <a href="/careers/workplace-safety" onClick={onClose} className="block p-2 rounded-xl text-slate-700 hover:text-[#000080] hover:bg-[#000080]/5">Workplace Safety</a>

                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#8B5E1A] pt-2 border-t border-slate-100">Media Center</div>
                  <a href="/media/news" onClick={onClose} className="block p-2 rounded-xl text-slate-700 hover:text-[#000080] hover:bg-[#000080]/5">News & Announcements</a>
                  <a href="/media/press-releases" onClick={onClose} className="block p-2 rounded-xl text-slate-700 hover:text-[#000080] hover:bg-[#000080]/5">Press Releases</a>
                  <a href="/media/case-studies" onClick={onClose} className="block p-2 rounded-xl text-slate-700 hover:text-[#000080] hover:bg-[#000080]/5">Mega-Project Case Studies</a>
                  <a href="/media/brand-kit" onClick={onClose} className="block p-2 rounded-xl text-slate-700 hover:text-[#000080] hover:bg-[#000080]/5">Media Assets & Brand Kit</a>
                </div>
              )}
            </div>

            {/* Language Switcher in Mobile */}
            <div className="flex items-center gap-2 p-3.5 rounded-2xl text-[1.1rem] font-medium text-[#000080]">
              <Globe className="w-4 h-4 text-[#8B5E1A]" />
              <span>Language: <strong>English (EN)</strong></span>
            </div>
          </nav>
        </div>

        {/* Bottom CTA Area */}
        <div className="mt-8 pt-5 border-t border-[#000080]/10 space-y-4">
          {/* Primary Action Button: Champagne Sand background, Fecto Navy text */}
          <a
            href="/request-quote"
            onClick={onClose}
            className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-base font-semibold transition-all duration-200 shadow-md active:scale-98 bg-[#F4D5AB] text-[#000080]"
          >
            <span>Request a quote</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          {/* Quick Plant Phone Contact */}
          <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
            <PhoneCall className="w-3.5 h-3.5 text-[#8B5E1A]" />
            <span>Sangjani Plant Desk: +92 (51) 228-5671</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
