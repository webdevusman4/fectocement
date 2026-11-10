'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, 
  History, 
  Target, 
  Users, 
  FileText, 
  Factory, 
  MapPin, 
  Cpu, 
  Leaf, 
  TrendingDown, 
  HeartHandshake, 
  ShieldCheck, 
  ArrowUpRight 
} from 'lucide-react';

interface DropdownProps {
  isOpen: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onSelectLink?: (link: string) => void;
}

const springTransition = { type: "spring" as const, stiffness: 350, damping: 25 };

export const CompanyDropdown: React.FC<DropdownProps> = ({
  isOpen,
  onMouseEnter,
  onMouseLeave,
  onSelectLink,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="region"
          aria-label="Company submenu"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          className="absolute left-1/2 -translate-x-1/2 top-full w-[860px]"
          style={{ zIndex: 50 }}
        >
          {/* Invisible bridge — pt-4 ensures dropdown never closes when cursor moves down */}
          <div className="pt-4">
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              transition={springTransition}
              className="bg-white/95 backdrop-blur-2xl shadow-[0_30px_60px_-15px_rgba(0,0,128,0.15)] border border-white rounded-2xl p-7 relative overflow-hidden"
            >
              {/* Header Bar */}
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#000080]/10">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#000080]/10 text-[#000080]">
                    <Building2 className="w-4 h-4" />
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-[#000080] tracking-wide">
                      Corporate Heritage, Infrastructure & ESG
                    </h3>
                    <p className="text-xs text-slate-500">
                      Fecto Cement Limited • Over 4 Decades of Nation-Building Across Pakistan
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-[#000080]/5 text-[#000080] border border-[#000080]/10">
                    Est. 1981 • PSX: FECTO
                  </span>
                </div>
              </div>

              {/* 3 Column Grid */}
              <div className="grid grid-cols-3 gap-6">
                
                {/* ============================================================ */}
                {/* COLUMN 1: ABOUT US & HERITAGE                                */}
                {/* ============================================================ */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    <History className="w-3.5 h-3.5 text-[#8B5E1A]" />
                    <span>About Us & Heritage</span>
                  </div>
                  <ul className="space-y-1 text-sm">
                    <li>
                      <a
                        href="/company/our-story"
                        onClick={() => onSelectLink?.('Our Story (Since 1981)')}
                        className="group block p-2.5 rounded-xl transition-all duration-200 hover:bg-[#000080]/5"
                      >
                        <div className="font-medium text-[#000080] flex items-center justify-between">
                          <span className="flex items-center gap-1.5">
                            Our Story (Since 1981)
                            <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#8B5E1A]" />
                          </span>
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5">Four decades of industrial resilience & trust</div>
                      </a>
                    </li>
                    <li>
                      <a
                        href="/company/vision-mission"
                        onClick={() => onSelectLink?.('Vision & Mission')}
                        className="group block p-2.5 rounded-xl transition-all duration-200 hover:bg-[#000080]/5"
                      >
                        <div className="font-medium text-[#000080] flex items-center justify-between">
                          <span className="flex items-center gap-1.5">
                            Vision & Mission
                            <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#8B5E1A]" />
                          </span>
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5">Sustainable leadership in heavy infrastructure</div>
                      </a>
                    </li>
                    <li>
                      <a
                        href="/company/leadership"
                        onClick={() => onSelectLink?.('Meet Our Leaders')}
                        className="group block p-2.5 rounded-xl transition-all duration-200 hover:bg-[#000080]/5"
                      >
                        <div className="font-medium text-[#000080] flex items-center justify-between">
                          <span className="flex items-center gap-1.5">
                            Meet Our Leaders
                            <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#8B5E1A]" />
                          </span>
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5">Board of Directors & executive stewardship</div>
                      </a>
                    </li>
                    <li>
                      <a
                        href="/company/corporate-profile"
                        onClick={() => onSelectLink?.('Corporate Profile')}
                        className="group block p-2.5 rounded-xl transition-all duration-200 hover:bg-[#000080]/5"
                      >
                        <div className="font-medium text-[#000080] flex items-center justify-between">
                          <span className="flex items-center gap-1.5">
                            Corporate Profile
                            <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#8B5E1A]" />
                          </span>
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5">Financial strength, credentials & group legacy</div>
                      </a>
                    </li>
                  </ul>
                </div>

                {/* ============================================================ */}
                {/* COLUMN 2: INFRASTRUCTURE & FOOTPRINT                         */}
                {/* ============================================================ */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    <Factory className="w-3.5 h-3.5 text-[#8B5E1A]" />
                    <span>Infrastructure & Footprint</span>
                  </div>
                  <ul className="space-y-1 text-sm">
                    <li>
                      <a
                        href="/infrastructure/sangjani-plant"
                        onClick={() => onSelectLink?.('Sangjani Manufacturing Plant')}
                        className="group block p-2.5 rounded-xl transition-all duration-200 hover:bg-[#000080]/5"
                      >
                        <div className="font-medium text-[#000080] flex items-center justify-between">
                          <span className="flex items-center gap-1.5">
                            Sangjani Manufacturing Plant
                            <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#8B5E1A]" />
                          </span>
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5">Advanced production plant near Islamabad</div>
                      </a>
                    </li>
                    <li>
                      <a
                        href="/infrastructure/iconic-projects"
                        onClick={() => onSelectLink?.('Iconic Projects (North & South)')}
                        className="group block p-2.5 rounded-xl transition-all duration-200 hover:bg-[#000080]/5"
                      >
                        <div className="font-medium text-[#000080] flex items-center justify-between">
                          <span className="flex items-center gap-1.5">
                            Iconic Projects (North & South)
                            <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#8B5E1A]" />
                          </span>
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5">National motorways, dams & commercial skylines</div>
                      </a>
                    </li>
                    <li>
                      <a
                        href="/infrastructure/production-capabilities"
                        onClick={() => onSelectLink?.('Production Capabilities')}
                        className="group block p-2.5 rounded-xl transition-all duration-200 hover:bg-[#000080]/5"
                      >
                        <div className="font-medium text-[#000080] flex items-center justify-between">
                          <span className="flex items-center gap-1.5">
                            Production Capabilities
                            <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#8B5E1A]" />
                          </span>
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5">2.8M+ tons annual clinker & cement capacity</div>
                      </a>
                    </li>
                  </ul>
                </div>

                {/* ============================================================ */}
                {/* COLUMN 3: CSR & SUSTAINABILITY                               */}
                {/* ============================================================ */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    <Leaf className="w-3.5 h-3.5 text-[#8B5E1A]" />
                    <span>CSR & Sustainability</span>
                  </div>
                  <ul className="space-y-1 text-sm">
                    <li>
                      <a
                        href="/csr/sustainability-initiatives"
                        onClick={() => onSelectLink?.('Sustainability Initiatives')}
                        className="group block p-2.5 rounded-xl transition-all duration-200 hover:bg-[#000080]/5"
                      >
                        <div className="font-medium text-[#000080] flex items-center justify-between">
                          <span className="flex items-center gap-1.5">
                            Sustainability Initiatives
                            <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#8B5E1A]" />
                          </span>
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5">Alternative fuels, waste heat & emission filters</div>
                      </a>
                    </li>
                    <li>
                      <a
                        href="/csr/carbon-reduction"
                        onClick={() => onSelectLink?.('Carbon Reduction Goals')}
                        className="group block p-2.5 rounded-xl transition-all duration-200 hover:bg-[#000080]/5"
                      >
                        <div className="font-medium text-[#000080] flex items-center justify-between">
                          <span className="flex items-center gap-1.5">
                            Carbon Reduction Goals
                            <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#8B5E1A]" />
                          </span>
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5">Targeting -30% reduction in emissions by 2030</div>
                      </a>
                    </li>
                    <li>
                      <a
                        href="/csr/community-development"
                        onClick={() => onSelectLink?.('Community Development')}
                        className="group block p-2.5 rounded-xl transition-all duration-200 hover:bg-[#000080]/5"
                      >
                        <div className="font-medium text-[#000080] flex items-center justify-between">
                          <span className="flex items-center gap-1.5">
                            Community Development
                            <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#8B5E1A]" />
                          </span>
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5">Healthcare, technical schooling & civic welfare</div>
                      </a>
                    </li>
                    <li>
                      <a
                        href="/company/corporate-governance"
                        onClick={() => onSelectLink?.('Corporate Governance')}
                        className="group block p-2.5 rounded-xl transition-all duration-200 hover:bg-[#000080]/5"
                      >
                        <div className="font-medium text-[#000080] flex items-center justify-between">
                          <span className="flex items-center gap-1.5">
                            Corporate Governance
                            <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#8B5E1A]" />
                          </span>
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5">SECP compliance, transparency & ethical audits</div>
                      </a>
                    </li>
                  </ul>
                </div>

              </div>

              {/* Bottom Callout Bar */}
              <div className="mt-6 pt-4 border-t border-[#000080]/10 flex items-center justify-between text-xs text-slate-500 font-normal">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#000080]" />
                  Sangjani Plant, Sector H-16, Islamabad Capital Territory
                </span>
                <a
                  href="/company/history"
                  className="font-bold text-[#000080] hover:text-[#8B5E1A] transition-colors flex items-center gap-1"
                >
                  Explore Company History →
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CompanyDropdown;
