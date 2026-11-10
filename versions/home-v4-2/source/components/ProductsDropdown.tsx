'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Layers, 
  ShieldCheck, 
  Truck, 
  ArrowUpRight, 
  FileText, 
  Package, 
  Award, 
  CheckCircle2, 
  ArrowRight 
} from 'lucide-react';

interface DropdownProps {
  isOpen: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onRequestQuote?: () => void;
  onSelectProduct?: (productName: string) => void;
}

const springTransition = { type: "spring" as const, stiffness: 350, damping: 25 };

export const ProductsDropdown: React.FC<DropdownProps> = ({
  isOpen,
  onMouseEnter,
  onMouseLeave,
  onRequestQuote,
  onSelectProduct,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="region"
          aria-label="Products submenu"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          className="absolute left-1/2 -translate-x-1/2 top-full w-[840px]"
          style={{ zIndex: 50 }}
        >
          {/* Invisible hover bridge — pt-4 ensures dropdown never closes when cursor moves down */}
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
                    <Layers className="w-4 h-4" />
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-[#000080] tracking-wide">
                      Technical Cement Portfolio & Specifications
                    </h3>
                    <p className="text-xs text-slate-500 font-normal">
                      High-Early Strength • ASTM C-150 & European Standards (EN 197-1)
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-[#000080]/5 text-[#000080] border border-[#000080]/10">
                    Grade 53 & SRC
                  </span>
                </div>
              </div>

              {/* 3-Column Custom B2B Industrial Layout */}
              <div className="grid grid-cols-3 gap-6">
                
                {/* ============================================================ */}
                {/* COLUMN 1: TECHNICAL GRADES                                   */}
                {/* ============================================================ */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8B5E1A]">
                    <Package className="w-3.5 h-3.5 text-[#8B5E1A]" />
                    <span>Technical Grades</span>
                  </div>
                  <ul className="space-y-1 text-sm">
                    <li>
                      <a
                        href="#products"
                        onClick={() => onSelectProduct?.('Ordinary Portland Cement (OPC)')}
                        className="group flex flex-col p-2.5 rounded-xl transition-all duration-200 hover:bg-[#000080]/5"
                      >
                        <div className="font-semibold text-[#000080] flex items-center justify-between">
                          <span>Ordinary Portland (OPC 53)</span>
                          <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#8B5E1A]" />
                        </div>
                        <span className="text-xs text-slate-500 mt-0.5 font-normal">
                          High early strength for bridges & high-rises
                        </span>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#products"
                        onClick={() => onSelectProduct?.('Sulphate Resistant Cement (SRC)')}
                        className="group flex flex-col p-2.5 rounded-xl transition-all duration-200 hover:bg-[#000080]/5"
                      >
                        <div className="font-semibold text-[#000080] flex items-center justify-between">
                          <span>Sulphate Resistant (SRC)</span>
                          <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#8B5E1A]" />
                        </div>
                        <span className="text-xs text-slate-500 mt-0.5 font-normal">
                          Type V protection against coastal & chemical attack
                        </span>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#products"
                        onClick={() => onSelectProduct?.('Portland Blast Furnace Slag Cement')}
                        className="group flex flex-col p-2.5 rounded-xl transition-all duration-200 hover:bg-[#000080]/5"
                      >
                        <div className="font-semibold text-[#000080] flex items-center justify-between">
                          <span>Low Heat Blends</span>
                          <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#8B5E1A]" />
                        </div>
                        <span className="text-xs text-slate-500 mt-0.5 font-normal">
                          Slag blended cement for mass dam concrete pours
                        </span>
                      </a>
                    </li>
                  </ul>
                </div>

                {/* ============================================================ */}
                {/* COLUMN 2: QUALITY & TESTING                                  */}
                {/* ============================================================ */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8B5E1A]">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#8B5E1A]" />
                    <span>Quality & Testing</span>
                  </div>
                  <ul className="space-y-1 text-sm">
                    <li>
                      <a
                        href="#quality"
                        className="group flex flex-col p-2.5 rounded-xl transition-all duration-200 hover:bg-[#000080]/5"
                      >
                        <div className="font-semibold text-[#000080] flex items-center justify-between">
                          <span>PSQCA & ISO Certifications</span>
                          <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#8B5E1A]" />
                        </div>
                        <span className="text-xs text-slate-500 mt-0.5 font-normal">
                          ISO 9001:2015, ISO 14001:2015 certified
                        </span>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#msds"
                        className="group flex flex-col p-2.5 rounded-xl transition-all duration-200 hover:bg-[#000080]/5"
                      >
                        <div className="font-semibold text-[#000080] flex items-center justify-between">
                          <span>Material Safety Data Sheets (MSDS)</span>
                          <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#8B5E1A]" />
                        </div>
                        <span className="text-xs text-slate-500 mt-0.5 font-normal">
                          Chemical composition & physical test data
                        </span>
                      </a>
                    </li>
                  </ul>
                </div>

                {/* ============================================================ */}
                {/* COLUMN 3: PROCUREMENT                                        */}
                {/* ============================================================ */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8B5E1A]">
                    <Truck className="w-3.5 h-3.5 text-[#8B5E1A]" />
                    <span>Procurement</span>
                  </div>
                  <ul className="space-y-1 text-sm">
                    <li>
                      <a
                        href="#supply-network"
                        className="group flex flex-col p-2.5 rounded-xl transition-all duration-200 hover:bg-[#000080]/5"
                      >
                        <div className="font-semibold text-[#000080] flex items-center justify-between">
                          <span>Bulk Supply Network</span>
                          <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#8B5E1A]" />
                        </div>
                        <span className="text-xs text-slate-500 mt-0.5 font-normal">
                          Dedicated bulk carrier fleet & nationwide logistics
                        </span>
                      </a>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={onRequestQuote}
                        className="w-full text-left group flex flex-col p-2.5 rounded-xl transition-all duration-200 bg-[#000080]/5 hover:bg-[#000080]/10 border border-[#000080]/10"
                      >
                        <div className="font-bold text-[#000080] flex items-center justify-between">
                          <span>Request Corporate Quote</span>
                          <ArrowRight className="w-3.5 h-3.5 text-[#8B5E1A] group-hover:translate-x-0.5 transition-transform" />
                        </div>
                        <span className="text-xs text-slate-500 mt-0.5 font-normal">
                          Fast-track quotes for mega-project tenders
                        </span>
                      </button>
                    </li>
                    <li>
                      <a
                        href="#dealers"
                        className="group flex flex-col p-2.5 rounded-xl transition-all duration-200 hover:bg-[#000080]/5"
                      >
                        <div className="font-semibold text-[#000080] flex items-center justify-between">
                          <span>Dealership Application</span>
                          <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#8B5E1A]" />
                        </div>
                        <span className="text-xs text-slate-500 mt-0.5 font-normal">
                          Join our verified retail distribution network
                        </span>
                      </a>
                    </li>
                  </ul>
                </div>

              </div>

              {/* Bottom Callout Bar */}
              <div className="mt-6 pt-4 border-t border-[#000080]/10 flex items-center justify-between text-xs text-slate-500 font-normal">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#000080]" />
                  Standard Packaging: 50kg Heavy-Duty Kraft & Poly Bags or Bulk Bulkers
                </span>
                <a
                  href="#products"
                  className="font-bold text-[#000080] hover:text-[#8B5E1A] transition-colors flex items-center gap-1"
                >
                  View All Cement Specs →
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProductsDropdown;
