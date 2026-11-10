'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { ShieldCheck, Download, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useMotionPrefs } from '../hooks/useMotionPrefs';
import { EASE, DUR, Z } from '../lib/motion';
import { SectionReveal } from './SectionReveal';

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
  staticReveal?: boolean;
}

// SAMPLE VALUES: replace with Fecto's verified technical data sheet before launch.
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

const GRAIN_DATA_URI =
  "data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E";

const DESKTOP_CARD_POSITIONS = [
  { left: '28%', top: '23.33%', transform: '-translate-x-full -translate-y-1/2' },
  { left: '72%', top: '46.67%', transform: '-translate-y-1/2' },
  { left: '28%', top: '73.33%', transform: '-translate-x-full -translate-y-1/2' },
] as const;

/* ========================================================================== */
/* PRESENTATIONAL HELPERS                                                     */
/* ========================================================================== */

function SpecValue({ value }: { value: number | string }) {
  return (
    <span>
      {typeof value === 'number' ? new Intl.NumberFormat('en').format(value) : value}
    </span>
  );
}

function BagVisual({
  data,
  imageError,
  onError,
  simple,
  className,
}: {
  data: GradeData;
  imageError: boolean;
  onError: () => void;
  simple: boolean;
  className: string;
}) {
  const visual = imageError ? (
    <div className="flex h-full w-full flex-col items-center justify-center rounded-2xl border border-white/20 bg-white/10 p-6 text-center shadow-2xl">
      <svg
        viewBox="0 0 100 130"
        className="mb-3 h-32 w-24 fill-none stroke-current stroke-[2] text-[#F4D5AB]"
        aria-hidden="true"
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
          {data.tabLabel} 50 KG
        </text>
      </svg>
      <span className="font-mono text-xs font-semibold text-[#F4D5AB]">{data.name}</span>
      <span className="mt-1 text-[10px] text-white/60">{data.bagCaption}</span>
    </div>
  ) : (
    <Image
      src={data.bagSrc}
      alt={`${data.name} 50kg bag`}
      fill
      priority
      sizes="320px"
      onError={onError}
      className="object-contain drop-shadow-[0_25px_45px_rgba(0,0,0,0.85)] filter contrast-[1.05]"
    />
  );

  if (simple) {
    return <div className={`relative flex items-center justify-center ${className}`}>{visual}</div>;
  }

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={data.tabLabel}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: DUR.fast, ease: EASE }}
          className="relative h-full w-full"
        >
          {visual}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function SpecCard({
  spec,
  index,
  simple,
  compact = false,
}: {
  spec: ProductSpecItem;
  index: number;
  simple: boolean;
  compact?: boolean;
}) {
  return (
    <SectionReveal simple={simple} delay={index * 0.08} y={0}>
      <article
        className={`${
          compact ? 'p-4' : 'w-64 p-5'
        } rounded-2xl border border-white/20 bg-[#0A0F1F]/55 shadow-[0_18px_45px_-20px_rgba(0,0,0,0.8)] backdrop-blur-md transition-colors duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-white/35`}
      >
        <div className="mb-2 flex items-center justify-between">
          <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[#F4D5AB]">
            Spec 0{index + 1}
          </span>
          <span className="size-2 rounded-full bg-[#F4D5AB]" />
        </div>
        <div className="mb-1.5 text-xs text-white/70">{spec.label}</div>
        <div className="flex flex-wrap items-baseline gap-1.5">
          <span className="font-display text-3xl font-bold tracking-tight text-white lg:text-4xl">
            <SpecValue value={spec.value} />
          </span>
          {spec.unit && (
            <span className="text-base font-semibold text-[#F4D5AB]">{spec.unit}</span>
          )}
        </div>
        <div className="mt-3 border-t border-white/10 pt-2 font-mono text-[10px] uppercase tracking-wider text-white/45">
          Sample figure · not certified
        </div>
      </article>
    </SectionReveal>
  );
}

/* ========================================================================== */
/* MAIN COMPONENT                                                             */
/* ========================================================================== */

export const ProductPortfolio: React.FC<ProductPortfolioProps> = ({
  onRequestQuote,
  onDownloadSpec,
  className = '',
  showSampleNote = true,
  bgSrc = '/images/sangjani-aerial.jpg',
  showBackdrop = true,
  staticReveal = false,
}) => {
  const [activeGrade, setActiveGrade] = useState<ProductGrade>('opc');
  const [imageError, setImageError] = useState(false);
  const [bgImageError, setBgImageError] = useState(false);
  const { simple: prefersSimple } = useMotionPrefs();
  const simple = prefersSimple || staticReveal;
  const currentData = SPECS[activeGrade];

  useEffect(() => {
    setImageError(false);
  }, [activeGrade]);

  const handleTabKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    grade: ProductGrade
  ) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault();
      const nextGrade = grade === 'opc' ? 'src' : 'opc';
      setActiveGrade(nextGrade);
      document.getElementById(`tab-${nextGrade}`)?.focus();
    }
  };

  return (
    <section
      id="products"
      data-tone="dark"
      aria-label="Precision Portfolio"
      className={`relative isolate flex w-full min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-[#0B1245] pb-20 pt-[170px] text-white [border-radius:50%_50%_0_0/90px_90px_0_0] -mt-[90px] md:pb-28 md:pt-[202px] ${Z.product} ${className}`}
    >
      {/* Static layered backdrop */}
      {showBackdrop ? (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            {bgImageError ? (
              <div className="absolute inset-0 bg-[#0B1245] bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:48px_48px]" />
            ) : (
              <Image
                src={bgSrc}
                alt=""
                fill
                sizes="100vw"
                onError={() => setBgImageError(true)}
                className="object-cover grayscale contrast-[1.05]"
              />
            )}
          </div>
          <div className="absolute inset-0 bg-[#0B1245]/[0.80]" />
          <div className="absolute inset-0 [background:radial-gradient(ellipse_at_50%_55%,rgba(0,0,128,0.55),transparent_65%)]" />
          <div className="absolute inset-0 [background:radial-gradient(ellipse_40%_45%_at_50%_52%,rgba(244,213,171,0.14),transparent_70%)]" />
          <div className="absolute inset-0 [background:radial-gradient(ellipse_at_center,transparent_45%,rgba(10,15,31,0.85)_100%)]" />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.035] mix-blend-overlay"
            style={{ backgroundImage: `url("${GRAIN_DATA_URI}")` }}
          />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[14svh] bg-gradient-to-b from-[#0B1245] to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[18svh] bg-gradient-to-t from-[#0B1245] to-transparent" />
        </div>
      ) : (
        <div
          aria-hidden="true"
          style={{
            background:
              'radial-gradient(circle at 50% 55%, #1A1AA0 0%, #0B1245 55%, #0A0F1F 100%)',
          }}
          className="pointer-events-none absolute inset-0 z-0"
        />
      )}

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center px-6">
        {/* Header and grade switcher */}
        <SectionReveal simple={simple} className="mb-10 flex max-w-2xl flex-col items-center text-center md:mb-14">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 shadow-sm backdrop-blur-md">
            <ShieldCheck className="h-4 w-4 text-[#F4D5AB]" />
            <span className="font-mono text-xs uppercase tracking-widest text-[#F4D5AB]">
              Sample technical profile
            </span>
          </div>

          <h2 className="font-display mb-3 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            Two grades, one standard of consistency.
          </h2>
          <p className="mb-8 max-w-lg font-sans text-sm leading-relaxed text-white/70 md:text-base">
            Sample profiles compare OPC and SRC across strength, fineness, setting time, and durability. Values are realistic placeholders for layout review, not a procurement datasheet.
          </p>

          <div
            role="tablist"
            aria-label="Select Cement Variety"
            className="relative flex items-center rounded-full border border-white/20 bg-white/10 p-1.5 shadow-2xl backdrop-blur-md"
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
                  className={`relative z-10 flex min-h-[44px] items-center gap-2 rounded-full px-6 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4D5AB] focus-visible:ring-offset-2 focus-visible:ring-offset-[#000080] md:text-sm ${
                    isActive
                      ? 'bg-[#F4D5AB] text-[#000080] shadow-lg'
                      : 'bg-transparent text-white/80 hover:text-white'
                  }`}
                >
                  <span>{data.tabLabel}</span>
                  <span
                    className={`rounded-full px-2 py-0.5 font-mono text-[10px] transition-colors duration-[250ms] ${
                      isActive
                        ? 'bg-[#000080]/20 font-bold text-[#000080]'
                        : 'bg-white/15 text-white/70'
                    }`}
                  >
                    {data.tabBadge}
                  </span>
                </button>
              );
            })}
          </div>
        </SectionReveal>

        <div
          id="specs-panel"
          role="tabpanel"
          aria-labelledby={`tab-${activeGrade}`}
          aria-live="polite"
          className="relative flex w-full max-w-5xl flex-col items-center justify-center"
        >
          {/* Desktop stage */}
          <div className="relative hidden h-[600px] w-full max-w-[1000px] md:block">
            <svg
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-10 h-full w-full"
              viewBox="0 0 1000 600"
              preserveAspectRatio="none"
            >
              <path
                d="M 280 140 L 380 140 L 440 220"
                fill="none"
                stroke="#F4D5AB"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                strokeOpacity="0.45"
              />
              <path
                d="M 720 280 L 620 280 L 560 300"
                fill="none"
                stroke="#F4D5AB"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                strokeOpacity="0.45"
              />
              <path
                d="M 280 440 L 380 440 L 440 380"
                fill="none"
                stroke="#F4D5AB"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                strokeOpacity="0.45"
              />
              <circle cx="280" cy="140" r="3" fill="#F4D5AB" fillOpacity="0.7" />
              <circle cx="440" cy="220" r="3.5" fill="#F4D5AB" />
              <circle cx="720" cy="280" r="3" fill="#F4D5AB" fillOpacity="0.7" />
              <circle cx="560" cy="300" r="3.5" fill="#F4D5AB" />
              <circle cx="280" cy="440" r="3" fill="#F4D5AB" fillOpacity="0.7" />
              <circle cx="440" cy="380" r="3.5" fill="#F4D5AB" />
            </svg>

            {/* Composed centre bag: no tilt, float, parallax, or scrub zoom */}
            <div className="absolute left-1/2 top-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
              <SectionReveal simple={simple} delay={0.08} y={0} duration={DUR.slow}>
                <div className="relative flex flex-col items-center">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute bottom-5 left-1/2 h-[70px] w-[420px] max-w-[80%] -translate-x-1/2 [background:radial-gradient(ellipse_at_center,rgba(244,213,171,0.20),transparent_70%)]"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute bottom-6 left-1/2 h-8 w-56 -translate-x-1/2 rounded-full bg-black/90 blur-xl shadow-[0_35px_70px_-15px_rgba(0,0,0,0.9)]"
                  />
                  <BagVisual
                    data={currentData}
                    imageError={imageError}
                    onError={() => setImageError(true)}
                    simple={simple}
                    className="h-[420px] w-[280px]"
                  />
                  <div className="pointer-events-none mt-2 text-center">
                    <div className="font-sans text-sm font-semibold tracking-wide text-white">
                      {currentData.name}
                    </div>
                    <div className="font-mono text-xs text-white/60">
                      {currentData.bagCaption}
                    </div>
                  </div>
                </div>
              </SectionReveal>
            </div>

            {DESKTOP_CARD_POSITIONS.map((position, index) => (
              <div
                key={position.left + position.top}
                style={{ left: position.left, top: position.top }}
                className={`absolute z-20 ${position.transform}`}
              >
                <SpecCard spec={currentData.specs[index]} index={index} simple={simple} />
              </div>
            ))}
          </div>

          {/* Mobile stacked layout */}
          <div className="flex w-full flex-col items-center md:hidden">
            <SectionReveal simple={simple} y={0} duration={DUR.slow} className="my-4">
              <BagVisual
                data={currentData}
                imageError={imageError}
                onError={() => setImageError(true)}
                simple={simple}
                className="h-[330px] w-[220px]"
              />
              <div className="mt-2 text-center">
                <div className="text-sm font-semibold tracking-wide text-white">
                  {currentData.name}
                </div>
                <div className="font-mono text-xs text-white/60">
                  {currentData.bagCaption}
                </div>
              </div>
            </SectionReveal>

            <div className="mb-6 flex w-full max-w-sm flex-col gap-3">
              {currentData.specs.map((spec, index) => (
                <SpecCard
                  key={`${activeGrade}-mobile-spec-${index}`}
                  spec={spec}
                  index={index}
                  simple={simple}
                  compact
                />
              ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        <SectionReveal
          simple={simple}
          delay={0.16}
          className="z-20 mt-12 flex w-full flex-col items-center justify-center gap-4 sm:flex-row md:mt-16"
        >
          <button
            type="button"
            onClick={() => onRequestQuote?.(currentData.name)}
            className="flex w-full items-center justify-center gap-2.5 rounded-full bg-[#F4D5AB] px-7 py-3.5 text-xs font-semibold tracking-wide text-[#000080] shadow-xl transition-colors duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-[#ffe3be] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4D5AB] focus-visible:ring-offset-2 focus-visible:ring-offset-[#000080] sm:w-auto md:text-sm"
          >
            <span>Request Bulk Quotation</span>
            <ArrowRight className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={() => onDownloadSpec?.(currentData.name)}
            className="flex w-full items-center justify-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-6 py-3.5 text-xs font-semibold tracking-wide text-white transition-colors duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#000080] sm:w-auto md:text-sm"
          >
            <Download className="h-4 w-4 text-white/80" />
            <span>Request sample spec sheet</span>
          </button>
        </SectionReveal>

        {/* Compliance references */}
        <SectionReveal
          simple={simple}
          delay={0.24}
          className="mt-8 flex flex-col items-center gap-3 text-center"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">
            Illustrative compliance references
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 font-mono text-xs text-white/70">
            {currentData.certifications.map((cert) => (
              <div key={cert} className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#F4D5AB]" />
                <span>{cert}</span>
              </div>
            ))}
          </div>
        </SectionReveal>

        {showSampleNote && (
          <p className="mt-6 max-w-md text-center font-sans text-[11px] text-white/50">
            Mock design note · technical values, compliance references, and the downloadable file are illustrative placeholders, not verified specifications.
          </p>
        )}
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[18svh] bg-gradient-to-t from-[#0B1245] to-transparent"
      />
    </section>
  );
};

export default ProductPortfolio;
