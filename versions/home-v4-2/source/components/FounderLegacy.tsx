'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { useMotionPrefs } from '../hooks/useMotionPrefs';
import { useSectionProgress } from '../hooks/useSectionProgress';
import { EASE, DUR, Z } from '../lib/motion';

export interface FounderLegacyProps {
  className?: string;
  imageSrc?: string;
  bgSrc?: string;
  quote?: {
    text: string;
    attribution?: string;
  };
  historyHref?: string;
  staticReveal?: boolean;
}

interface Statement {
  number: string;
  title: string;
  body: string;
  keyword: string;
  meta: string;
}

const STATEMENTS: Statement[] = [
  {
    number: '01',
    title: 'Credit carried a signature.',
    body: 'The sample dossier opens with a small footwear and general-trading counter on Grant Road, where a handwritten ledger and a personal guarantee often mattered more than formal collateral.',
    keyword: 'Credit',
    meta: 'Illustrative archive note · Mumbai, 1947',
  },
  {
    number: '02',
    title: 'Partnerships outlasted shipments.',
    body: 'As the business moved toward manufacturing, the mock narrative centres on technical training, tooling, and inspection discipline learned through early assembly partnerships rather than one-off imports.',
    keyword: 'Partnership',
    meta: 'Illustrative archive note · 1957–1970s',
  },
  {
    number: '03',
    title: 'Profits returned to the works.',
    body: 'Capital is shown being reinvested into mills, assembly lines, packaging, and finally a cement works near Sangjani—operating businesses tied to the country’s physical infrastructure.',
    keyword: 'Reinvestment',
    meta: 'Illustrative archive note · 1970s–1981',
  },
];

// Static inline SVG feTurbulence noise data-URI for grain texture
const GRAIN_SVG_DATA_URI =
  "data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitchTiles'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E";

interface StatementBlockProps {
  statement: Statement;
  index: number;
  isActive: boolean;
  onInView: (index: number) => void;
  shouldReduceMotion: boolean;
}

/**
 * Memoized individual statement block with scroll tracking
 */
const StatementBlock = React.memo(function StatementBlock({
  statement,
  index,
  isActive,
  onInView,
  shouldReduceMotion,
}: StatementBlockProps) {
  const blockRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(blockRef, { margin: '-40% 0px -40% 0px' });

  useEffect(() => {
    if (isInView) {
      onInView(index);
    }
  }, [isInView, index, onInView]);

  return (
    <div className="space-y-0">
      {/* Hairline between statements (scaleX 0 -> 1, origin left, 0.8s once) */}
      {index > 0 && (
        <motion.div
          className="h-px w-full bg-white/20 origin-left"
          initial={{ scaleX: shouldReduceMotion ? 1 : 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{
            duration: shouldReduceMotion ? 0 : DUR.slow,
            delay: shouldReduceMotion ? 0 : index * 0.1,
            ease: EASE,
          }}
        />
      )}

      {/* Focus effect block */}
      <motion.div
        ref={blockRef}
        animate={{
          opacity: isActive ? 1 : 0.72,
          x: shouldReduceMotion || isActive ? 0 : -4,
        }}
        transition={{
          duration: shouldReduceMotion ? 0 : 0.4,
          ease: EASE,
        }}
        className="py-8 md:py-10"
      >
        <div className="flex flex-col md:grid md:grid-cols-[minmax(5rem,max-content)_1fr] gap-4 md:gap-6 items-start">
          {/* Big Numerals: 6xl/7xl font-display */}
          <div className="shrink-0 md:min-w-[5rem]">
            <span
              aria-hidden="true"
              className={`font-display text-6xl md:text-7xl leading-none select-none transition-colors duration-[400ms] block ${
                isActive
                  ? 'text-[#F4D5AB]'
                  : 'text-transparent [-webkit-text-stroke:1.5px_#F4D5AB]'
              }`}
            >
              {statement.number}
            </span>
          </div>

          {/* Statement Content */}
          <div className="space-y-3">
            <h3 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight leading-snug">
              {statement.title}
            </h3>
            <p className="text-lg md:text-xl leading-relaxed text-white/85 max-w-xl">
              {statement.body}
            </p>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#F4D5AB]/75">
              {statement.meta}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
});

/**
 * FounderLegacy Component
 *
 * Editorial split layout honoring Fecto Group's founder, Mr. Ghulam Muhammad A. Fecto.
 * Features an active statement scroll-tracking effect, large sand numerals, reactive portrait card,
 * and high-performance layered background without expensive CSS blurs.
 */
export default function FounderLegacy({
  className = '',
  imageSrc = '/images/founder-portrait.jpg',
  bgSrc = '/images/founder-bg.jpg',
  quote,
  historyHref = '#company-history',
  staticReveal = false,
}: FounderLegacyProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { reduced: prefersReduced, simple: prefersSimple } = useMotionPrefs();
  const reduced = prefersReduced || staticReveal;
  const simple = prefersSimple || staticReveal;
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [bgLoadError, setBgLoadError] = useState<boolean>(false);

  // Parallax transform for background image
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const rawParallaxY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%']);
  const parallaxY = reduced ? '0%' : rawParallaxY;

  // Exit motion ("History slides over me") on content wrapper only
  const exitProgress = useSectionProgress(sectionRef, 'exit');
  const rawContentScale = useTransform(exitProgress, [0, 1], [1, 0.94]);
  const rawContentOpacity = useTransform(exitProgress, [0, 1], [1, 0.45]);
  const rawContentY = useTransform(exitProgress, [0, 1], [0, 80]);

  const contentScale = simple ? 1 : rawContentScale;
  const contentOpacity = simple ? 1 : rawContentOpacity;
  const contentY = simple ? 0 : rawContentY;

  // Portrait scale (1 -> 1.04) across section center
  const centerProgress = useSectionProgress(sectionRef, 'center');
  const rawPortraitScale = useTransform(centerProgress, [0, 1], [1, 1.04]);
  const portraitScale = simple ? 1 : rawPortraitScale;

  // Stable callback for active statement updates
  const handleInView = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  // Reactive glow state: statements 01 and 03 -> sand 1, blue 0; statement 02 -> sand 0, blue 1
  const isSandActive = activeIndex === 0 || activeIndex === 2;
  const isBlueActive = activeIndex === 1;

  return (
    <section
      ref={sectionRef}
      id="founder-section"
      data-tone="dark"
      aria-labelledby="founder-headline"
      className={`relative isolate w-full bg-[#000080] -mt-10 ${Z.founder} rounded-t-[40px] shadow-[0_-20px_60px_rgba(0,0,60,0.25)] py-20 md:py-32 ${className}`}
    >
      {/* ========================================================================= */}
      {/* BACKGROUND LAYERS CONTAINER (Clips parallax & background without breaking sticky) */}
      {/* ========================================================================= */}
      <div
        aria-hidden="true"
        className="absolute inset-0 overflow-hidden rounded-t-[40px] pointer-events-none"
      >
        {/* 8a & 8b. Background Image with Parallax & Blueprint Fallback */}
        <motion.div
          style={{ y: parallaxY }}
          className="absolute inset-x-0 -inset-y-[8%]"
        >
          {/* Faint blueprint grid fallback (rgba(255,255,255,0.04) lines every 48px) */}
          <div className="absolute inset-0 bg-[#000080] [background-image:linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:48px_48px]" />

          {!bgLoadError && (
            <Image
              src={bgSrc}
              alt=""
              fill
              sizes="100vw"
              quality={70}
              priority={false}
              onError={() => setBgLoadError(true)}
              className="object-cover grayscale"
            />
          )}
        </motion.div>

        {/* 8c. Navy Overlay */}
        {/* Below md: single bg-[#000080]/[0.88] overlay */}
        <div className="block md:hidden absolute inset-0 bg-[#000080]/[0.88]" />
        {/* md and up: base 78% navy + left 65% gradient layer */}
        <div className="hidden md:block absolute inset-0 bg-[#000080]/[0.78]" />
        <div className="hidden md:block absolute inset-y-0 left-0 w-[65%] bg-gradient-to-r from-[#000080]/[0.6] via-[#000080]/[0.3] to-transparent" />

        {/* 8d. Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(0,0,60,0.55)_100%)]" />

        {/* 8e. Reactive Glow behind portrait (Crossfade opacity only over 1.2s; instant under reduced motion) */}
        <motion.div
          initial={false}
          animate={{ opacity: isSandActive ? 1 : 0 }}
          transition={{ duration: reduced ? 0 : 1.2, ease: 'easeInOut' }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_75%_45%,rgba(244,213,171,0.10),transparent_55%)]"
        />
        <motion.div
          initial={false}
          animate={{ opacity: isBlueActive ? 1 : 0 }}
          transition={{ duration: reduced ? 0 : 1.2, ease: 'easeInOut' }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_70%_55%,rgba(120,150,255,0.12),transparent_55%)]"
        />

        {/* 8f. Grain Texture (Static SVG feTurbulence data-URI at opacity-[0.035] with mix-blend-overlay) */}
        <div
          className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
          style={{ backgroundImage: `url("${GRAIN_SVG_DATA_URI}")` }}
        />

        {/* 8g. Bottom Fade */}
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#000080] to-transparent" />
      </div>

      {/* ========================================================================= */}
      {/* SECTION CONTENT CONTAINER (With Exit transforms: scale, opacity, y)        */}
      {/* ========================================================================= */}
      <motion.div
        style={{
          scale: contentScale,
          opacity: contentOpacity,
          y: contentY,
        }}
        className="max-w-7xl mx-auto px-6 sm:px-8 flex flex-col md:grid md:grid-cols-12 gap-12 md:gap-16 relative z-20 text-white md:items-stretch items-start origin-top"
      >
        {/* ======================================================================= */}
        {/* LEFT COLUMN: Header, Statements, Quote Slot & Closing Beat (7 Cols)     */}
        {/* ======================================================================= */}
        <div className="order-2 md:order-1 md:col-span-7 flex flex-col justify-start w-full">
          {/* Eyebrow & Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: DUR.base, ease: EASE }}
            className="mb-8 md:mb-10"
          >
            <div className="mb-6 flex flex-wrap items-center gap-2">
              <span className="border border-white/20 rounded-full px-4 py-1 text-xs text-[#F4D5AB] bg-white/5 font-semibold">
                Founder's dossier
              </span>
              <span className="rounded-full border border-[#F4D5AB]/35 bg-[#F4D5AB]/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[#F4D5AB]">
                Illustrative mock
              </span>
            </div>

            <h2
              id="founder-headline"
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight text-white"
            >
              From a ledger of trust to an industrial group.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">
              A realistic sample profile of how documented credit, supplier relationships, and disciplined reinvestment could become the operating culture behind a cement business.
            </p>
          </motion.div>

          {/* Three Numbered Statements separated by hairlines */}
          <div className="space-y-0">
            {STATEMENTS.map((s, idx) => (
              <StatementBlock
                key={s.number}
                statement={s}
                index={idx}
                isActive={activeIndex === idx}
                onInView={handleInView}
                shouldReduceMotion={reduced}
              />
            ))}
          </div>

          {/* 5. Quote Slot (after statement 03) */}
          <div className="mt-8 md:mt-10">
            {quote ? (
              <div className="py-4">
                <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[#F4D5AB]/75">
                  Editorial theme · not a historical quotation
                </p>
                <blockquote className="font-display text-3xl md:text-4xl text-white tracking-tight leading-snug">
                  <span className="text-[#F4D5AB] font-serif mr-2 select-none">“</span>
                  {quote.text}
                </blockquote>
                {quote.attribution && (
                  <cite className="block not-italic font-mono text-sm text-white/70 mt-4">
                    — {quote.attribution}
                  </cite>
                )}
              </div>
            ) : (
              <div className="border border-dashed border-white/25 rounded-2xl p-6">
                <p className="font-display text-2xl md:text-3xl text-white/80">
                  <span className="text-[#F4D5AB] font-serif mr-2 select-none">“</span>
                  Founder quote to be supplied
                </p>
                <p className="mt-4 text-xs text-white/60 font-mono">
                  Signature to be supplied
                </p>
              </div>
            )}
          </div>

          {/* 6. Closing Beat (after quote slot) with Mask Reveal */}
          <div className="mt-12 md:mt-16 space-y-4 pt-6 border-t border-white/10">
            <div className="overflow-hidden pb-[0.1em]">
              <motion.h3
                initial={simple ? { opacity: 0 } : { y: '100%' }}
                whileInView={simple ? { opacity: 1 } : { y: '0%' }}
                viewport={{ once: true }}
                transition={{
                  duration: DUR.slow,
                  ease: EASE,
                }}
                className="font-display text-4xl md:text-5xl text-[#F4D5AB] font-bold tracking-tight leading-tight"
              >
                The standard remained.
              </motion.h3>
            </div>
            <div>
              <a
                href={historyHref}
                className="inline-flex items-center gap-2 text-base text-white hover:text-[#F4D5AB] transition-colors rounded-lg py-1 px-1 -ml-1 focus:outline-none focus:ring-2 focus:ring-[#F4D5AB] group"
              >
                <span>Explore the sample timeline</span>
                <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5 text-[#F4D5AB]" />
              </a>
            </div>
          </div>
        </div>

        {/* ======================================================================= */}
        {/* RIGHT COLUMN: Reactive Archival Portrait & Status Row (5 Cols)          */}
        {/* ======================================================================= */}
        <div className="order-1 md:order-2 md:col-span-5 relative w-full md:self-stretch">
          {/* Sticky wrapper: stays pinned at top-28 while left side scrolls */}
          <div className="relative md:sticky md:top-28 md:self-start w-full">
            {/* Portrait Card */}
            <div className="w-full aspect-[4/5] max-h-[60svh] md:max-h-[calc(100svh-14rem)] rounded-2xl overflow-hidden relative shadow-2xl border border-white/10 group bg-[#0A0F1F]">
              {/* Portrait Image with centerProgress subtle zoom (1 -> 1.04) */}
              <motion.div
                style={{ scale: portraitScale }}
                className="w-full h-full relative"
              >
                <Image
                  src={imageSrc}
                  alt="Late Mr. Ghulam Muhammad A. Fecto — Founder of Fecto Group"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 500px"
                  className="object-cover object-[center_18%] select-none transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  priority
                />
              </motion.div>

              {/* Natural Dark-Edge Gradient Vignette */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#000080]/85 via-transparent to-black/20 pointer-events-none"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,128,0.5)] pointer-events-none rounded-2xl"
              />

              {/* Frosted Glassmorphism Caption Chip (Static) */}
              <div className="absolute bottom-4 left-4 z-20 px-4 py-2.5 rounded-xl bg-slate-950/70 backdrop-blur-md border border-white/15 shadow-xl pointer-events-none">
                <div className="text-xs font-bold uppercase tracking-wider text-white">
                  GHULAM MUHAMMAD A. FECTO
                </div>
                <div className="text-xs font-medium tracking-wide text-[#F4D5AB] mt-0.5">
                  Founder profile · illustrative mock
                </div>
              </div>
            </div>

            {/* Status Row (Hidden below md; displays active statement keyword & dash tracker) */}
            <div className="hidden md:flex items-center justify-between mt-5 px-1">
              {/* Left: Active keyword swapped with AnimatePresence */}
              <div className="h-10 flex items-center overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={STATEMENTS[activeIndex].keyword}
                    initial={reduced ? { opacity: 0 } : { y: 12, opacity: 0 }}
                    animate={reduced ? { opacity: 1 } : { y: 0, opacity: 1 }}
                    exit={
                      reduced
                        ? { opacity: 0 }
                        : { y: -8, opacity: 0, transition: { duration: 0.2, ease: 'easeIn' } }
                    }
                    transition={{
                      duration: reduced ? 0 : 0.3,
                      ease: EASE,
                    }}
                    className="font-display text-3xl text-[#F4D5AB] font-bold leading-none block"
                  >
                    {STATEMENTS[activeIndex].keyword}
                  </motion.span>
                </AnimatePresence>
              </div>

              {/* Right: "1 / 3" in mono text-sm plus three dashes */}
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm text-white/80 tabular-nums">
                  {activeIndex + 1} / {STATEMENTS.length}
                </span>
                <div className="flex items-center gap-1.5" aria-hidden="true">
                  {STATEMENTS.map((_, i) => (
                    <span
                      key={i}
                      className={`h-1 rounded-full transition-all duration-300 ${
                        i === activeIndex ? 'w-8 bg-[#F4D5AB]' : 'w-3 bg-white/30'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Sample archive file: concrete context without claiming certified history */}
            <div className="mt-4 rounded-2xl border border-white/15 bg-white/[0.06] p-4 shadow-[0_12px_30px_rgba(0,0,30,0.18)]">
              <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.18em] text-white/55">
                <span>Sample archive file</span>
                <span>01 / 03</span>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-3">
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-white/45">Period</div>
                  <div className="mt-1 font-mono text-xs font-semibold text-white">1947–1981</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-white/45">Route</div>
                  <div className="mt-1 font-mono text-xs font-semibold text-white">Mumbai → Dhaka</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-white/45">Theme</div>
                  <div className="mt-1 font-mono text-xs font-semibold text-white">Credit</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
