'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useSpring,
  useReducedMotion,
  useScroll,
  animate,
} from 'framer-motion';
import { ShieldCheck, Download, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useMotionPrefs } from '../hooks/useMotionPrefs';
import { useSectionProgress } from '../hooks/useSectionProgress';
import { EASE, DUR, Z } from '../lib/motion';

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
  bgSrc?: string;
  showBackdrop?: boolean;
}

const GRAIN_DATA_URI =
  "data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E";

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
  bgSrc = '/images/product-bg.jpg',
  showBackdrop = true,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeGrade, setActiveGrade] = useState<ProductGrade>('opc');
  const [imageError, setImageError] = useState(false);
  const [bgImageError, setBgImageError] = useState(false);

  const reducedMotion = useReducedMotion();
  const isReduced = Boolean(reducedMotion);
  const { simple } = useMotionPrefs();

  // Entrance scroll progress: start end -> start start
  const enter = useSectionProgress(sectionRef, 'enter');

  // Background Parallax scroll progress: start end -> end start
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const bgParallaxY = useTransform(scrollYProgress, [0, 1], ['-4%', '4%']);

  // Scrubbed entrance transforms (md and up)
  const bagY = useTransform(enter, (v) => (1 - v) * 140);
  const bagScale = useTransform(enter, [0, 1], [0.9, 1]);
  const bagOpacity = enter;

  const cardLeftX = useTransform(enter, [0, 1], [-90, 0]);
  const cardRightX = useTransform(enter, [0, 1], [90, 0]);
  const cardOpacity = enter;

  // Redraw MotionValues for leader lines (starts at 1; animates 0 -> 1 on grade switch)
  const redraw1 = useMotionValue(1);
  const redraw2 = useMotionValue(1);
  const redraw3 = useMotionValue(1);

  const isFirstMount = useRef(true);

  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    if (isReduced || simple) {
      redraw1.set(1);
      redraw2.set(1);
      redraw3.set(1);
      return;
    }
    redraw1.set(0);
    redraw2.set(0);
    redraw3.set(0);

    const c1 = animate(redraw1, 1, { duration: DUR.slow, ease: EASE, delay: 0 });
    const c2 = animate(redraw2, 1, { duration: DUR.slow, ease: EASE, delay: 0.1 });
    const c3 = animate(redraw3, 1, { duration: DUR.slow, ease: EASE, delay: 0.2 });

    return () => {
      c1.stop();
      c2.stop();
      c3.stop();
    };
  }, [activeGrade, isReduced, simple, redraw1, redraw2, redraw3]);

  const pathLength1 = useTransform([enter, redraw1], ([e, r]: number[]) => (e ?? 1) * (r ?? 1));
  const pathLength2 = useTransform([enter, redraw2], ([e, r]: number[]) => (e ?? 1) * (r ?? 1));
  const pathLength3 = useTransform([enter, redraw3], ([e, r]: number[]) => (e ?? 1) * (r ?? 1));

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
      ref={sectionRef}
      id="products"
      data-tone="dark"
      aria-label="Precision Portfolio"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`relative isolate w-full min-h-[100svh] bg-[#0B1245] text-white overflow-hidden flex flex-col items-center justify-center [border-radius:50%_50%_0_0/90px_90px_0_0] -mt-[90px] ${Z.product} pt-[170px] md:pt-[202px] pb-20 md:pb-28 select-none ${className}`}
    >
      {/* ==================================================================== */}
      {/* 1. LAYERED STUDIO BACKDROP (OR FLAT MIDNIGHT FALLBACK)               */}
      {/* ==================================================================== */}
      {showBackdrop ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        >
          {/* a) Image Layer with subtle vertical parallax drift on desktop */}
          {!isReduced && !simple ? (
            <motion.div
              style={{ y: bgParallaxY }}
              className="absolute -inset-y-[6%] inset-x-0 overflow-hidden"
            >
              {bgImageError ? (
                <div className="absolute inset-0 bg-[#0B1245] bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:48px_48px]" />
              ) : (
                <Image
                  src={bgSrc}
                  alt=""
                  fill
                  sizes="100vw"
                  quality={60}
                  onError={() => setBgImageError(true)}
                  className="object-cover grayscale contrast-[1.05]"
                />
              )}
            </motion.div>
          ) : (
            <div className="absolute inset-0 overflow-hidden">
              {bgImageError ? (
                <div className="absolute inset-0 bg-[#0B1245] bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:48px_48px]" />
              ) : (
                <Image
                  src={bgSrc}
                  alt=""
                  fill
                  sizes="100vw"
                  quality={55}
                  onError={() => setBgImageError(true)}
                  className="object-cover grayscale contrast-[1.05]"
                />
              )}
            </div>
          )}

          {/* b) Tint overlay */}
          <div className="absolute inset-0 bg-[#0B1245]/[0.80]" />

          {/* c) Royal glow */}
          <div className="absolute inset-0 [background:radial-gradient(ellipse_at_50%_55%,rgba(0,0,128,0.55),transparent_65%)]" />

          {/* d) Sand spotlight behind the bag */}
          <div className="absolute inset-0 [background:radial-gradient(ellipse_40%_45%_at_50%_52%,rgba(244,213,171,0.14),transparent_70%)]" />

          {/* e) Edge vignette to Deep */}
          <div className="absolute inset-0 [background:radial-gradient(ellipse_at_center,transparent_45%,rgba(10,15,31,0.85)_100%)]" />

          {/* f) Static inline SVG feTurbulence grain */}
          <div
            className="absolute inset-0 opacity-[0.035] mix-blend-overlay pointer-events-none"
            style={{ backgroundImage: `url("${GRAIN_DATA_URI}")` }}
          />

          {/* g) Seam bands: top band to Midnight & bottom band to Midnight */}
          <div className="absolute top-0 inset-x-0 h-[14svh] bg-gradient-to-b from-[#0B1245] to-transparent pointer-events-none" />
          <div className="absolute bottom-0 inset-x-0 h-[18svh] bg-gradient-to-t from-[#0B1245] to-transparent pointer-events-none" />
        </div>
      ) : (
        /* Flat Midnight legacy look */
        <div
          aria-hidden="true"
          style={{
            background:
              'radial-gradient(circle at 50% 55%, #1A1AA0 0%, #0B1245 55%, #0A0F1F 100%)',
          }}
          className="absolute inset-0 pointer-events-none z-0"
        />
      )}

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col items-center">
        
        {/* ================================================================== */}
        {/* 2. THE MAGNETIC SWITCHER (TOP)                                     */}
        {/* ================================================================== */}
        <motion.div 
          initial={simple ? { opacity: 0 } : false}
          whileInView={simple ? { opacity: 1 } : undefined}
          viewport={{ once: true }}
          transition={{ duration: DUR.base, ease: EASE }}
          className="flex flex-col items-center text-center mb-10 md:mb-14 max-w-2xl"
        >
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
        </motion.div>

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
            <motion.svg
              aria-hidden="true"
              style={simple ? undefined : { opacity: enter }}
              className="absolute inset-0 w-full h-full pointer-events-none z-10"
              viewBox="0 0 1000 600"
              preserveAspectRatio="none"
            >
              {/* Line 1: Top-Left Card (280, 140) -> Dogleg (380, 140) -> Bag Shoulder (440, 220) */}
              <motion.path
                d="M 280 140 L 380 140 L 440 220"
                fill="none"
                stroke="#F4D5AB"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                strokeOpacity="0.45"
                style={{ pathLength: simple ? 1 : pathLength1 }}
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
                d="M 720 280 L 620 280 L 560 300"
                fill="none"
                stroke="#F4D5AB"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                strokeOpacity="0.45"
                style={{ pathLength: simple ? 1 : pathLength2 }}
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
                d="M 280 440 L 380 440 L 440 380"
                fill="none"
                stroke="#F4D5AB"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                strokeOpacity="0.45"
                style={{ pathLength: simple ? 1 : pathLength3 }}
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
            </motion.svg>

            {/* THE BAG CENTERPIECE (Tilt, Float, Fallback) */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
              
              {/* Outer Scrubbed Motion Wrapper */}
              <motion.div
                style={
                  simple
                    ? undefined
                    : {
                        y: bagY,
                        scale: bagScale,
                        opacity: bagOpacity,
                      }
                }
                className="relative flex flex-col items-center"
              >
                {/* Floor glow: soft sand pool directly under the bag and above the pedestal shadow */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 w-[420px] h-[70px] max-w-[80%] [background:radial-gradient(ellipse_at_center,rgba(244,213,171,0.20),transparent_70%)]"
                />

                {/* Bag Pedestal Floor Glow & Shadow */}
                <motion.div
                  aria-hidden="true"
                  animate={{
                    boxShadow: '0 35px 70px -15px rgba(0, 0, 0, 0.9)',
                  }}
                  className="absolute bottom-6 left-1/2 -translate-x-1/2 w-56 h-8 bg-black/90 blur-xl rounded-full pointer-events-none"
                />

                {/* Inner Pointer Tilt & Float Wrapper */}
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
              </motion.div>
            </div>

            {/* CARD 1: TOP-LEFT (Spec 01) - Touches (280, 140) */}
            <div
              style={{ left: '28%', top: '23.33%' }}
              className="absolute -translate-x-full -translate-y-1/2 z-20"
            >
              <motion.div
                style={
                  simple
                    ? undefined
                    : {
                        x: cardLeftX,
                        opacity: cardOpacity,
                      }
                }
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`card-0-${activeGrade}`}
                    initial={isReduced ? false : { opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={isReduced ? undefined : { opacity: 0, x: -10 }}
                    transition={{ duration: 0.35 }}
                    className="bg-[#0A0F1F]/40 backdrop-blur-md border border-white/20 shadow-2xl rounded-2xl p-5 w-64 hover:border-white/35 transition-colors"
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
              </motion.div>
            </div>

            {/* CARD 2: MID-RIGHT (Spec 02) - Touches (720, 280) */}
            <div
              style={{ left: '72%', top: '46.67%' }}
              className="absolute translate-x-0 -translate-y-1/2 z-20"
            >
              <motion.div
                style={
                  simple
                    ? undefined
                    : {
                        x: cardRightX,
                        opacity: cardOpacity,
                      }
                }
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`card-1-${activeGrade}`}
                    initial={isReduced ? false : { opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={isReduced ? undefined : { opacity: 0, x: 10 }}
                    transition={{ duration: 0.35 }}
                    className="bg-[#0A0F1F]/40 backdrop-blur-md border border-white/20 shadow-2xl rounded-2xl p-5 w-64 hover:border-white/35 transition-colors"
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
              </motion.div>
            </div>

            {/* CARD 3: BOTTOM-LEFT (Spec 03) - Touches (280, 440) */}
            <div
              style={{ left: '28%', top: '73.33%' }}
              className="absolute -translate-x-full -translate-y-1/2 z-20"
            >
              <motion.div
                style={
                  simple
                    ? undefined
                    : {
                        x: cardLeftX,
                        opacity: cardOpacity,
                      }
                }
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`card-2-${activeGrade}`}
                    initial={isReduced ? false : { opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={isReduced ? undefined : { opacity: 0, x: -10 }}
                    transition={{ duration: 0.35 }}
                    className="bg-[#0A0F1F]/40 backdrop-blur-md border border-white/20 shadow-2xl rounded-2xl p-5 w-64 hover:border-white/35 transition-colors"
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
              </motion.div>
            </div>

          </div>

          {/* MOBILE STACKED LAYOUT (below md) */}
          <div className="md:hidden flex flex-col items-center w-full">
            
            {/* Mobile Bag Display */}
            <motion.div 
              initial={simple ? { opacity: 0 } : false}
              whileInView={simple ? { opacity: 1 } : undefined}
              viewport={{ once: true }}
              transition={{ duration: DUR.base, ease: EASE }}
              className="relative w-[220px] h-[330px] my-4 flex items-center justify-center"
            >
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
            </motion.div>

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
                  className="bg-[#0A0F1F]/40 backdrop-blur-md border border-white/20 rounded-2xl p-4 shadow-lg"
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
        <motion.div 
          initial={simple ? { opacity: 0 } : false}
          whileInView={simple ? { opacity: 1 } : undefined}
          viewport={{ once: true }}
          transition={{ duration: DUR.base, ease: EASE }}
          className="flex flex-col sm:flex-row items-center gap-4 mt-12 md:mt-16 z-20 w-full justify-center"
        >
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
        </motion.div>

        {/* ================================================================== */}
        {/* 5. CERTIFICATIONS ROW (DATA-DRIVEN)                                */}
        {/* ================================================================== */}
        <motion.div 
          initial={simple ? { opacity: 0 } : false}
          whileInView={simple ? { opacity: 1 } : undefined}
          viewport={{ once: true }}
          transition={{ duration: DUR.base, ease: EASE }}
          className="flex flex-wrap items-center justify-center gap-6 mt-8 text-xs font-mono text-white/70"
        >
          {currentData.certifications.map((cert) => (
            <div key={cert} className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#F4D5AB]" />
              <span>{cert}</span>
            </div>
          ))}
        </motion.div>

        {/* Sample Note Footnote */}
        {showSampleNote && (
          <p className="text-[11px] text-white/50 text-center mt-6 max-w-md font-sans">
            Sample technical values — verify against official datasheet before specification
          </p>
        )}

      </div>

      {/* ==================================================================== */}
      {/* 6. BOTTOM BAND: FLAT MIDNIGHT FINISH (FOR SUSTAINABILITY DOORS)      */}
      {/* ==================================================================== */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 inset-x-0 h-[18svh] bg-gradient-to-t from-[#0B1245] to-transparent pointer-events-none z-10"
      />
    </section>
  );
};

export default ProductPortfolio;
