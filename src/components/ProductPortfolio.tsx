'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useSpring,
  useReducedMotion,
} from 'framer-motion';
import { ShieldCheck, Download, ArrowRight, CheckCircle2 } from 'lucide-react';

/* ========================================================================== */
/* DATA MODEL & DESIGN TOKENS                                                 */
/* ========================================================================== */

export type ProductGrade = 'opc' | 'src';

export interface ProductSpecItem {
  label: string;
  value: number | string;
  unit?: string;
}

export interface Spec {
  label: string;
  value: string | number;
  unit?: string;
}

export interface GradeData {
  tabLabel: string;
  tabBadge: string;
  name: string;
  bagSrc: string;
  bagCaption: string;
  specs: [ProductSpecItem, ProductSpecItem, ProductSpecItem];
  certifications: string[];
}

export interface Product {
  id: string;
  name: string;
  badge: string;
  accentColor: string;
  imageSrc: string;
  specs: Spec[];
}

export interface ProductPortfolioProps {
  onRequestQuote?: (productName: string) => void;
  onDownloadSpec?: (productName: string) => void;
  className?: string;
  showSampleNote?: boolean;
}

// SAMPLE VALUES: replace with Fecto's technical data sheet before launch
export const SPECS: Record<ProductGrade, GradeData> = {
  opc: {
    tabLabel: 'OPC',
    tabBadge: 'Grade 53',
    name: 'Ordinary Portland Cement',
    bagSrc: '/images/bag-opc.png',
    bagCaption: '50 kg Net Weight • Standard Packing',
    specs: [
      { label: 'Compressive strength, 28-day', value: 53, unit: 'MPa min' },
      { label: 'Fineness (Blaine)', value: 3200, unit: 'cm²/g' },
      { label: 'Initial setting time, minimum', value: 45, unit: 'min' },
    ],
    certifications: ['ISO 9001:2015', 'EN 197-1 CEM I', 'PSQCA certified'],
  },
  src: {
    tabLabel: 'SRC',
    tabBadge: 'Type V',
    name: 'Sulphate Resisting Cement',
    bagSrc: '/images/bag-src.png',
    bagCaption: '50 kg Net Weight • High-Durability Packing',
    specs: [
      { label: 'C3A content', value: '5%', unit: 'max' },
      { label: 'Standard', value: 'ASTM C150', unit: 'Type V' },
      { label: 'Best for', value: 'Coastal and sulphate soils' },
    ],
    certifications: ['ISO 9001:2015', 'PSQCA certified'],
  },
};

/* ========================================================================== */
/* SPEC VALUE COUNTER ANIMATOR                                                */
/* ========================================================================== */

function SpecCounter({
  value,
  reduced,
}: {
  value: number | string;
  reduced: boolean;
}) {
  const [displayValue, setDisplayValue] = useState<number | string>(() =>
    reduced || typeof value !== 'number' ? value : 0
  );

  useEffect(() => {
    if (reduced || typeof value !== 'number') {
      setDisplayValue(value);
      return;
    }

    let startTimestamp: number | null = null;
    let animFrame: number | null = null;
    const duration = 600; // 0.6s

    const step = (now: number) => {
      if (!startTimestamp) startTimestamp = now;
      const elapsed = now - startTimestamp;
      const progress = Math.min(1, elapsed / duration);
      // Cubic ease-out
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(eased * value));

      if (progress < 1) {
        animFrame = requestAnimationFrame(step);
      } else {
        setDisplayValue(value);
      }
    };

    animFrame = requestAnimationFrame(step);

    return () => {
      if (animFrame) cancelAnimationFrame(animFrame);
    };
  }, [value, reduced]);

  if (typeof value === 'number') {
    const num = typeof displayValue === 'number' ? displayValue : value;
    return <span>{new Intl.NumberFormat('en').format(num)}</span>;
  }

  return <span>{value}</span>;
}

/* ========================================================================== */
/* MAIN COMPONENT: ProductPortfolio                                           */
/* ========================================================================== */

export const ProductPortfolio: React.FC<ProductPortfolioProps> = ({
  onRequestQuote,
  onDownloadSpec,
  className = '',
  showSampleNote = true,
}) => {
  const [activeGrade, setActiveGrade] = useState<ProductGrade>('opc');
  const [imageError, setImageError] = useState(false);

  const reducedMotion = useReducedMotion();
  const isReduced = Boolean(reducedMotion);

  const currentData = SPECS[activeGrade];

  // Reset image error on grade switch
  useEffect(() => {
    setImageError(false);
  }, [activeGrade]);

  // Pointer tilt physics on bag
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { stiffness: 120, damping: 20 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isReduced) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(px);
    mouseY.set(py);
  };

  const handlePointerLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Keyboard navigation between tabs
  const handleTabKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    grade: ProductGrade
  ) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault();
      const nextGrade = grade === 'opc' ? 'src' : 'opc';
      setActiveGrade(nextGrade);
      const nextBtn = document.getElementById(`tab-${nextGrade}`);
      nextBtn?.focus();
    }
  };

  return (
    <section
      id="products"
      aria-label="Precision Portfolio"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`relative w-full min-h-[100svh] bg-[#000080] text-white overflow-hidden flex flex-col items-center justify-center py-20 md:py-28 select-none ${className}`}
    >
      {/* ==================================================================== */}
      {/* 1. CINEMATIC BACKGROUND GLOW & ATMOSPHERE                            */}
      {/* ==================================================================== */}
      
      {/* Radial glow centered behind the bag */}
      <div
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(circle at 50% 55%, #1A1AA0 0%, #000080 55%, #00005A 100%)',
        }}
        className="absolute inset-0 pointer-events-none z-0"
      />

      {/* Atmospheric Overhead Light Cone */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] md:w-[900px] h-[380px] bg-gradient-to-b from-white/[0.08] via-white/[0.02] to-transparent blur-3xl pointer-events-none rounded-full z-0"
      />

      {/* Subtle Atmospheric Grid Mesh */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none z-0"
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col items-center">
        
        {/* ================================================================== */}
        {/* 2. THE MAGNETIC SWITCHER (TOP)                                     */}
        {/* ================================================================== */}
        <div className="flex flex-col items-center text-center mb-10 md:mb-14 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-4 shadow-sm">
            <ShieldCheck className="w-4 h-4 text-[#F4D5AB]" />
            <span className="font-mono text-xs uppercase tracking-widest text-[#F4D5AB]">
              Engineered Specification
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-3">
            The Precision Portfolio
          </h2>
          <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-lg mb-8 font-sans">
            Industrial-grade binders formulated to exceed international ASTM and British Standards for heavy civil engineering.
          </p>

          {/* Magnetic Switcher Pill */}
          <div
            role="tablist"
            aria-label="Select Cement Variety"
            className="relative flex items-center bg-white/10 backdrop-blur-md p-1.5 rounded-full border border-white/20 shadow-2xl"
          >
            {(['opc', 'src'] as const).map((grade) => {
              const isActive = grade === activeGrade;
              const data = SPECS[grade];
              return (
                <button
                  key={grade}
                  role="tab"
                  id={`tab-${grade}`}
                  aria-selected={isActive}
                  aria-controls="specs-panel"
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActiveGrade(grade)}
                  onKeyDown={(e) => handleTabKeyDown(e, grade)}
                  className={`relative min-h-[44px] px-6 py-2.5 rounded-full text-xs md:text-sm font-semibold tracking-wider uppercase transition-colors duration-200 z-10 flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4D5AB] focus-visible:ring-offset-2 focus-visible:ring-offset-[#000080] ${
                    isActive ? 'text-[#000080]' : 'text-white/80 hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="product-highlight"
                      className="absolute inset-0 rounded-full z-[-1] shadow-lg bg-[#F4D5AB]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span>{data.tabLabel}</span>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full transition-colors ${
                      isActive
                        ? 'bg-[#000080]/20 text-[#000080] font-bold'
                        : 'bg-white/15 text-white/70'
                    }`}
                  >
                    {data.tabBadge}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ================================================================== */}
        {/* 3. CENTERPIECE STAGE (DESKTOP WITH LEADER LINES & MOTION)          */}
        {/* ================================================================== */}
        <div
          id="specs-panel"
          role="tabpanel"
          aria-labelledby={`tab-${activeGrade}`}
          aria-live="polite"
          className="relative w-full max-w-5xl flex flex-col items-center justify-center"
        >
          {/* DESKTOP STAGE: 1000 x 600 COORDINATE SYSTEM */}
          <div className="hidden md:block relative w-full h-[600px] max-w-[1000px]">
            
            {/* SVG LEADER LINES (viewBox 0 0 1000 600) */}
            <svg
              aria-hidden="true"
              className="absolute inset-0 w-full h-full pointer-events-none z-10"
              viewBox="0 0 1000 600"
              preserveAspectRatio="none"
            >
              {/* Line 1: Top-Left Card (280, 140) -> Dogleg (380, 140) -> Bag Shoulder (440, 220) */}
              <motion.path
                key={`line-1-${activeGrade}`}
                d="M 280 140 L 380 140 L 440 220"
                fill="none"
                stroke="#F4D5AB"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                strokeOpacity="0.45"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
              <circle cx="280" cy="140" r="3" fill="#F4D5AB" fillOpacity="0.7" />
              <motion.circle cx="440" cy="220" r="3.5" fill="#F4D5AB" />
              <motion.circle
                cx="440"
                cy="220"
                r="7"
                fill="none"
                stroke="#F4D5AB"
                strokeWidth="1.2"
                initial={{ scale: 0.8, opacity: 0.8 }}
                animate={isReduced ? {} : { scale: [1, 1.8, 1], opacity: [0.8, 0, 0.8] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />

              {/* Line 2: Mid-Right Card (720, 280) -> Dogleg (620, 280) -> Bag Right Edge (560, 300) */}
              <motion.path
                key={`line-2-${activeGrade}`}
                d="M 720 280 L 620 280 L 560 300"
                fill="none"
                stroke="#F4D5AB"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                strokeOpacity="0.45"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
              <circle cx="720" cy="280" r="3" fill="#F4D5AB" fillOpacity="0.7" />
              <motion.circle cx="560" cy="300" r="3.5" fill="#F4D5AB" />
              <motion.circle
                cx="560"
                cy="300"
                r="7"
                fill="none"
                stroke="#F4D5AB"
                strokeWidth="1.2"
                initial={{ scale: 0.8, opacity: 0.8 }}
                animate={isReduced ? {} : { scale: [1, 1.8, 1], opacity: [0.8, 0, 0.8] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />

              {/* Line 3: Bottom-Left Card (280, 440) -> Dogleg (380, 440) -> Bag Lower Left (440, 380) */}
              <motion.path
                key={`line-3-${activeGrade}`}
                d="M 280 440 L 380 440 L 440 380"
                fill="none"
                stroke="#F4D5AB"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                strokeOpacity="0.45"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
              <circle cx="280" cy="440" r="3" fill="#F4D5AB" fillOpacity="0.7" />
              <motion.circle cx="440" cy="380" r="3.5" fill="#F4D5AB" />
              <motion.circle
                cx="440"
                cy="380"
                r="7"
                fill="none"
                stroke="#F4D5AB"
                strokeWidth="1.2"
                initial={{ scale: 0.8, opacity: 0.8 }}
                animate={isReduced ? {} : { scale: [1, 1.8, 1], opacity: [0.8, 0, 0.8] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
            </svg>

            {/* THE BAG CENTERPIECE (Tilt, Float, Fallback) */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
              
              {/* Bag Pedestal Floor Glow & Shadow */}
              <motion.div
                aria-hidden="true"
                animate={{
                  boxShadow: '0 35px 70px -15px rgba(0, 0, 0, 0.9)',
                }}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 w-56 h-8 bg-black/90 blur-xl rounded-full pointer-events-none"
              />

              <motion.div
                style={isReduced ? {} : { rotateX, rotateY, transformPerspective: 800 }}
                animate={isReduced ? {} : { y: [0, -8, 0] }}
                transition={
                  isReduced
                    ? undefined
                    : {
                        y: {
                          duration: 4,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        },
                      }
                }
                className="relative flex flex-col items-center justify-center transform-gpu cursor-grab active:cursor-grabbing"
              >
                <div className="relative w-[280px] h-[420px] flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeGrade}
                      initial={isReduced ? false : { scale: 0.94, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={isReduced ? undefined : { scale: 1.04, opacity: 0 }}
                      transition={{ duration: 0.35, ease: 'easeInOut' }}
                      className="relative w-full h-full flex items-center justify-center"
                    >
                      {imageError ? (
                        /* Stylized Cement Sack Fallback Card */
                        <div className="w-[240px] h-[360px] rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex flex-col items-center justify-center p-6 text-center shadow-2xl">
                          <svg
                            viewBox="0 0 100 130"
                            className="w-24 h-32 text-[#F4D5AB] mb-3 fill-none stroke-current stroke-[2]"
                          >
                            <path d="M 20 15 L 80 15 L 88 120 L 12 120 Z" />
                            <path d="M 16 15 C 25 22, 75 22, 84 15" />
                            <path d="M 25 35 L 75 35" strokeDasharray="2 2" />
                            <text
                              x="50"
                              y="65"
                              fontSize="9"
                              fontFamily="monospace"
                              textAnchor="middle"
                              fill="#F4D5AB"
                              stroke="none"
                              fontWeight="bold"
                            >
                              FECTO
                            </text>
                            <text
                              x="50"
                              y="78"
                              fontSize="7"
                              fontFamily="sans-serif"
                              textAnchor="middle"
                              fill="white"
                              stroke="none"
                            >
                              {currentData.tabLabel} 50 KG
                            </text>
                          </svg>
                          <span className="font-mono text-xs text-[#F4D5AB] font-semibold">
                            {currentData.name}
                          </span>
                          <span className="text-[10px] text-white/60 mt-1">
                            {currentData.bagCaption}
                          </span>
                        </div>
                      ) : (
                        <Image
                          src={currentData.bagSrc}
                          alt={`${currentData.name} 50kg bag`}
                          fill
                          priority
                          sizes="320px"
                          onError={() => setImageError(true)}
                          className="object-contain drop-shadow-[0_25px_45px_rgba(0,0,0,0.85)] filter contrast-[1.05]"
                        />
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Bag Sub-label */}
                <div className="mt-2 text-center pointer-events-none">
                  <div className="text-sm font-semibold tracking-wide text-white font-sans">
                    {currentData.name}
                  </div>
                  <div className="text-xs font-mono text-white/60">
                    {currentData.bagCaption}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* CARD 1: TOP-LEFT (Spec 01) - Touches (280, 140) */}
            <div
              style={{ left: '28%', top: '23.33%' }}
              className="absolute -translate-x-full -translate-y-1/2 z-20"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={`card-0-${activeGrade}`}
                  initial={isReduced ? false : { opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={isReduced ? undefined : { opacity: 0, x: -10 }}
                  transition={{ duration: 0.35 }}
                  className="bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl rounded-2xl p-5 w-64 hover:border-white/35 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs uppercase tracking-widest text-[#F4D5AB] font-semibold">
                      Spec 01
                    </span>
                    <span className="w-2 h-2 rounded-full bg-[#F4D5AB]" />
                  </div>
                  <div className="text-xs text-white/70 mb-1.5 font-sans">
                    {currentData.specs[0].label}
                  </div>
                  <div className="flex items-baseline gap-1.5 flex-wrap">
                    <span className="font-display text-3xl lg:text-4xl font-bold text-white tracking-tight">
                      <SpecCounter value={currentData.specs[0].value} reduced={isReduced} />
                    </span>
                    {currentData.specs[0].unit && (
                      <span className="font-sans text-base text-[#F4D5AB] font-semibold">
                        {currentData.specs[0].unit}
                      </span>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* CARD 2: MID-RIGHT (Spec 02) - Touches (720, 280) */}
            <div
              style={{ left: '72%', top: '46.67%' }}
              className="absolute translate-x-0 -translate-y-1/2 z-20"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={`card-1-${activeGrade}`}
                  initial={isReduced ? false : { opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={isReduced ? undefined : { opacity: 0, x: 10 }}
                  transition={{ duration: 0.35 }}
                  className="bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl rounded-2xl p-5 w-64 hover:border-white/35 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs uppercase tracking-widest text-[#F4D5AB] font-semibold">
                      Spec 02
                    </span>
                    <span className="w-2 h-2 rounded-full bg-[#F4D5AB]" />
                  </div>
                  <div className="text-xs text-white/70 mb-1.5 font-sans">
                    {currentData.specs[1].label}
                  </div>
                  <div className="flex items-baseline gap-1.5 flex-wrap">
                    <span className="font-display text-3xl lg:text-4xl font-bold text-white tracking-tight">
                      <SpecCounter value={currentData.specs[1].value} reduced={isReduced} />
                    </span>
                    {currentData.specs[1].unit && (
                      <span className="font-sans text-base text-[#F4D5AB] font-semibold">
                        {currentData.specs[1].unit}
                      </span>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* CARD 3: BOTTOM-LEFT (Spec 03) - Touches (280, 440) */}
            <div
              style={{ left: '28%', top: '73.33%' }}
              className="absolute -translate-x-full -translate-y-1/2 z-20"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={`card-2-${activeGrade}`}
                  initial={isReduced ? false : { opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={isReduced ? undefined : { opacity: 0, x: -10 }}
                  transition={{ duration: 0.35 }}
                  className="bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl rounded-2xl p-5 w-64 hover:border-white/35 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs uppercase tracking-widest text-[#F4D5AB] font-semibold">
                      Spec 03
                    </span>
                    <span className="w-2 h-2 rounded-full bg-[#F4D5AB]" />
                  </div>
                  <div className="text-xs text-white/70 mb-1.5 font-sans">
                    {currentData.specs[2].label}
                  </div>
                  <div className="flex items-baseline gap-1.5 flex-wrap">
                    <span className="font-display text-3xl lg:text-4xl font-bold text-white tracking-tight">
                      <SpecCounter value={currentData.specs[2].value} reduced={isReduced} />
                    </span>
                    {currentData.specs[2].unit && (
                      <span className="font-sans text-base text-[#F4D5AB] font-semibold">
                        {currentData.specs[2].unit}
                      </span>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>

          {/* MOBILE STACKED LAYOUT (below md) */}
          <div className="md:hidden flex flex-col items-center w-full">
            
            {/* Mobile Bag Display */}
            <div className="relative w-[220px] h-[330px] my-4 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeGrade}
                  initial={isReduced ? false : { scale: 0.94, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={isReduced ? undefined : { scale: 1.04, opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="relative w-full h-full flex items-center justify-center"
                >
                  {imageError ? (
                    <div className="w-[200px] h-[300px] rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex flex-col items-center justify-center p-4 text-center shadow-xl">
                      <span className="font-mono text-xs text-[#F4D5AB] font-semibold">
                        {currentData.name}
                      </span>
                      <span className="text-[10px] text-white/60 mt-1">
                        {currentData.bagCaption}
                      </span>
                    </div>
                  ) : (
                    <Image
                      src={currentData.bagSrc}
                      alt={`${currentData.name} 50kg bag`}
                      fill
                      priority
                      sizes="260px"
                      onError={() => setImageError(true)}
                      className="object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.85)] filter contrast-[1.05]"
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Mobile Bag Label */}
            <div className="text-center mb-6">
              <div className="text-sm font-semibold tracking-wide text-white font-sans">
                {currentData.name}
              </div>
              <div className="text-xs font-mono text-white/60">
                {currentData.bagCaption}
              </div>
            </div>

            {/* Mobile Stacked Spec Cards */}
            <div className="flex flex-col gap-3 w-full max-w-sm">
              {currentData.specs.map((spec, i) => (
                <motion.div
                  key={`${activeGrade}-mobile-spec-${i}`}
                  initial={isReduced ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.08 }}
                  className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 shadow-lg"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-mono text-xs uppercase tracking-widest text-[#F4D5AB]">
                      Spec 0{i + 1}
                    </span>
                    <span className="size-2 rounded-full bg-[#F4D5AB]" />
                  </div>
                  <div className="text-xs text-white/70 mb-1 font-sans">
                    {spec.label}
                  </div>
                  <div className="flex items-baseline gap-1.5 flex-wrap">
                    <span className="font-display text-3xl font-bold text-white tracking-tight">
                      <SpecCounter value={spec.value} reduced={isReduced} />
                    </span>
                    {spec.unit && (
                      <span className="font-sans text-base text-[#F4D5AB] font-semibold">
                        {spec.unit}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

          </div>

        </div>

        {/* ================================================================== */}
        {/* 4. ACTION ROW: B2B PROCUREMENT & SPEC DOWNLOAD                     */}
        {/* ================================================================== */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-12 md:mt-16 z-20 w-full justify-center">
          <button
            type="button"
            onClick={() => onRequestQuote?.(currentData.name)}
            className="w-full sm:w-auto px-7 py-3.5 rounded-full text-xs md:text-sm font-semibold tracking-wide transition-all duration-200 shadow-xl flex items-center justify-center gap-2.5 bg-[#F4D5AB] text-[#000080] hover:bg-[#ffe3be] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4D5AB] focus-visible:ring-offset-2 focus-visible:ring-offset-[#000080]"
          >
            <span>Request Bulk Quotation</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => onDownloadSpec?.(currentData.name)}
            className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/20 text-white text-xs md:text-sm font-semibold tracking-wide transition-all duration-200 flex items-center justify-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#000080]"
          >
            <Download className="w-4 h-4 text-white/80" />
            <span>Download Technical Data Sheet (PDF)</span>
          </button>
        </div>

        {/* ================================================================== */}
        {/* 5. CERTIFICATIONS ROW (DATA-DRIVEN)                                */}
        {/* ================================================================== */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-xs font-mono text-white/70">
          {currentData.certifications.map((cert) => (
            <div key={cert} className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#F4D5AB]" />
              <span>{cert}</span>
            </div>
          ))}
        </div>

        {/* Sample Note Footnote */}
        {showSampleNote && (
          <p className="text-[11px] text-white/50 text-center mt-6 max-w-md font-sans">
            Sample technical values — verify against official datasheet before specification
          </p>
        )}

      </div>
    </section>
  );
};

export default ProductPortfolio;
