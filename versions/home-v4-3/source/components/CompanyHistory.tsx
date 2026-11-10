'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useInView, useMotionValueEvent, useScroll } from 'framer-motion';
import { Factory, Landmark, MapPin, Radio, Sprout, Sun, TrendingUp, UserRound, type LucideIcon } from 'lucide-react';
import { useMotionPrefs } from '../hooks/useMotionPrefs';
import { EASE, DUR, Z } from '../lib/motion';

type IconKey = 'pin' | 'radio' | 'factory' | 'landmark' | 'growth' | 'sun' | 'sprout';
const ICONS: Record<IconKey, LucideIcon> = {
  pin: MapPin,
  radio: Radio,
  factory: Factory,
  landmark: Landmark,
  growth: TrendingUp,
  sun: Sun,
  sprout: Sprout,
};

/** Small data visual shown under each story. Optional per milestone. */
export type HistoryViz =
  | { kind: 'route'; from: string; to: string }
  | { kind: 'stat'; value: string; label: string }
  | { kind: 'chips'; items: string[] }
  | { kind: 'meter'; unit: string; from: number; to: number }
  | { kind: 'progress'; label: string; status: string; percentage?: number };

export interface HistoryItem {
  year: string;
  title: string;
  desc: string;
  tag: string;
  imgMain: string;
  imgSmall: string;
  icon?: IconKey;
  viz?: HistoryViz;
  milestone?: boolean;
  illustrative?: boolean;
  placeholder?: 'portrait';
}

// Historical Timeline Data
export const historyData: HistoryItem[] = [
  {
    year: '1947',
    title: 'A ledger opens on Grant Road',
    desc: 'The sample story begins with a small footwear and general-trading counter in Bombay. After Partition, the founder rebuilds a supplier network in East Pakistan, extending credit on reputation and a written ledger rather than collateral.',
    tag: 'Trading & trust',
    icon: 'pin',
    viz: { kind: 'route', from: 'Mumbai', to: 'Dhaka' },
    imgMain: '/placeholders/1940s-street.jpg',
    imgSmall: '/placeholders/vintage-ledger.jpg',
    illustrative: true,
  },
  {
    year: '1957',
    title: 'Manufacturing replaces pure trade',
    desc: 'An illustrative technical collaboration with a Japanese electronics partner introduces assembly, quality inspection, and technician training. The milestone stands for the group’s sample shift from distribution into production.',
    tag: 'Technical partnership',
    icon: 'radio',
    viz: { kind: 'stat', value: '01', label: 'mock manufacturing chapter' },
    imgMain: '/images/history/history-toshiba.jpg',
    imgSmall: '/placeholders/old-assembly-line.jpg',
    illustrative: true,
  },
  {
    year: '1970s',
    title: 'A portfolio of essential industries',
    desc: 'Sugar milling, agricultural equipment, paper packaging, and board materials give the mock group experience with bulk logistics, preventive maintenance, and multi-site workforces—capabilities that later translate into cement operations.',
    tag: 'Industrial base',
    icon: 'factory',
    viz: { kind: 'chips', items: ['Bulk logistics', 'Maintenance', 'Packaging', 'Multi-site teams'] },
    imgMain: '/images/history/history-industrialization.jpg',
    imgSmall: '/images/history/vintage-tractor-assembly.jpg',
    illustrative: true,
  },
  {
    year: '1981',
    title: 'Cement becomes the long game',
    desc: 'In this sample timeline, Fecto Cement Limited is incorporated around a plant site near Sangjani, chosen for limestone access and proximity to northern infrastructure work. The breakout panel uses a 3,000 TPD figure only as a design-capacity marker.',
    tag: 'Fecto Cement Limited',
    icon: 'landmark',
    milestone: true,
    imgMain: '/images/history/history-legacy.jpg',
    imgSmall: '/images/history/vintage-blueprints.jpg',
    illustrative: true,
  },
  {
    year: '1993',
    title: 'Standardising the operating line',
    desc: 'A modernisation chapter is represented through laboratory sampling, planned maintenance, and dispatch documentation. The 1,000 → 3,000 TPD meter is an illustrative capacity curve, not a certified production record.',
    tag: 'Operations & scale',
    icon: 'growth',
    viz: { kind: 'meter', unit: 'indicative tons of clinker per day', from: 1000, to: 3000 },
    imgMain: '/images/history/Gemini_Generated_Image_s6vce0s6vce0s6vc.jpg',
    imgSmall: '/images/history/history-scale-plant.jpg',
    illustrative: true,
  },
  {
    year: '2021',
    title: 'Power inside the fence',
    desc: 'The mock energy chapter adds a 5 MW grid-connected solar array and plant-level energy monitoring at Sangjani. It is written as a realistic design example for evaluating self-generation, grid dependence, and emissions reporting.',
    tag: 'Energy transition',
    icon: 'sun',
    viz: { kind: 'stat', value: '5 MW', label: 'sample on-grid solar capacity' },
    imgMain: '/images/history/Gemini_Generated_Image_sntfe6sntfe6sntf.jpg',
    imgSmall: '/images/history/Gemini_Generated_Image_o7oskto7oskto7os.jpg',
    illustrative: true,
  },
  {
    year: 'Future',
    title: 'A measured lower-carbon roadmap',
    desc: 'Waste-heat recovery, alternative fuels, and emissions reporting are shown as a staged improvement programme. The target and progress bar are placeholders for the mock design—not commitments or verified plant data.',
    tag: 'Roadmap placeholders',
    icon: 'sprout',
    viz: {
      kind: 'progress',
      label: 'Illustrative WHR & AF roadmap',
      status: 'Placeholder target',
      percentage: 72,
    },
    imgMain: '/images/history/future-primary-eco.jpg',
    imgSmall: '/images/history/future-secondary-whr.jpg',
    illustrative: true,
  },
];

/* ───────────── small pieces ───────────── */

/** Image with graceful fallback and static era treatment. */
function Img({
  src,
  alt,
  label,
  sizes,
  gray,
  className = '',
}: {
  src: string;
  alt: string;
  label: string;
  sizes: string;
  gray: number;
  className?: string;
}) {
  const [bad, setBad] = useState(false);
  if (bad) {
    return (
      <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-slate-200 to-slate-400 p-3 text-center text-xs text-slate-600">
        {label}
      </div>
    );
  }

  const staticFilter = gray > 0 ? `grayscale(${gray}) contrast(${1 + gray * 0.1})` : undefined;

  return (
    <div className="relative w-full h-full overflow-hidden">
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        onError={() => setBad(true)}
        style={staticFilter ? { filter: staticFilter } : undefined}
        className={`object-cover object-center transition-transform duration-[500ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${className}`}
      />
    </div>
  );
}

function Meter({ unit, from, to }: { unit: string; from: number; to: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const on = useInView(ref, { once: true, margin: '-20% 0px' });
  const { simple } = useMotionPrefs();
  const bar = (v: number, barClass: string, delay: number) => {
    const pct = Math.min(100, Math.round((v / to) * 100));
    return (
      <div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
          <motion.div
            className={`h-full rounded-full ${barClass}`}
            initial={{ width: 0 }}
            animate={{ width: on ? `${pct}%` : 0 }}
            transition={{ duration: simple ? 0 : DUR.slow, ease: EASE, delay: simple ? 0 : delay }}
          />
        </div>
        <span className="font-mono text-xs font-semibold text-slate-700">{v.toLocaleString()}</span>
      </div>
    );
  };
  return (
    <div ref={ref} className="space-y-2.5">
      {bar(from, 'bg-slate-400', 0)}
      {bar(to, 'bg-gradient-to-r from-[#F4D5AB] to-[#E3B878]', 0.08)}
      <p className="font-mono text-xs text-slate-500">{unit}</p>
    </div>
  );
}

function Route({ from, to }: { from: string; to: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const on = useInView(ref, { once: true, margin: '-20% 0px' });
  const { simple } = useMotionPrefs();
  return (
    <div className="flex items-center gap-3 font-mono text-sm text-[#000080]">
      <span>{from}</span>
      <svg ref={ref} viewBox="0 0 120 12" className="h-3 w-28" aria-hidden="true">
        <circle cx="6" cy="6" r="4" fill="#000080" />
        <motion.line
          x1="6"
          y1="6"
          x2="114"
          y2="6"
          stroke="#F4D5AB"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: on ? 1 : 0 }}
          transition={{ duration: simple ? 0 : DUR.slow, ease: EASE }}
        />
        <circle cx="114" cy="6" r="4" fill="#000080" />
      </svg>
      <span>{to}</span>
    </div>
  );
}

function VizCard({ viz }: { viz: HistoryViz }) {
  const { simple } = useMotionPrefs();
  return (
    <div className="mb-2 max-w-md rounded-2xl border border-white/70 bg-white/60 p-4 shadow-sm backdrop-blur-md">
      <div className="mb-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-slate-400">
        <span>Sample figure</span>
        <span>Not certified</span>
      </div>
      {viz.kind === 'meter' && <Meter unit={viz.unit} from={viz.from} to={viz.to} />}
      {viz.kind === 'route' && <Route from={viz.from} to={viz.to} />}
      {viz.kind === 'chips' && (
        <div className="flex flex-wrap gap-2">
          {viz.items.map((t) => (
            <span key={t} className="rounded-full bg-[#000080]/10 px-3 py-1 text-xs font-medium text-[#000080]">
              {t}
            </span>
          ))}
        </div>
      )}
      {viz.kind === 'stat' && (
        <p className="flex items-baseline gap-3">
          <span className="font-mono text-3xl font-bold text-[#000080]">{viz.value}</span>
          <span className="text-sm text-slate-500">{viz.label}</span>
        </p>
      )}
      {viz.kind === 'progress' && (
        <div className="space-y-2.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-[#000080]">{viz.label}</span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700 border border-emerald-200/80 shadow-xs">
              <span className="size-1.5 rounded-full bg-emerald-500" />
              {viz.status}
            </span>
          </div>
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-200/80 p-0.5 shadow-inner">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[#000080] via-[#E3B878] to-emerald-500 shadow-sm"
              initial={{ width: 0 }}
              whileInView={{ width: `${viz.percentage ?? 85}%` }}
              viewport={{ once: true }}
              transition={{ duration: simple ? 0 : DUR.slow, ease: EASE }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function Copy({
  item,
  i,
  simple,
}: {
  item: HistoryItem;
  i: number;
  simple: boolean;
}) {
  const yearClass = 'block bg-gradient-to-b from-[#000080] to-[#000080]/15 bg-clip-text text-7xl font-bold leading-[0.95] tracking-tighter text-transparent sm:text-8xl lg:text-[6.5rem]';

  return (
    <div className="max-w-xl">
      <div className="mb-1 flex items-center gap-3">
        <span className="font-mono text-xs text-slate-400">Phase {String(i + 1).padStart(2, '0')}</span>
        {item.milestone && (
          <span className="rounded-full bg-[#F4D5AB]/50 px-3 py-1 text-xs font-semibold text-[#000080]">
            Fecto Cement Limited
          </span>
        )}
      </div>

      {/* Year: one-time clip-path reveal; static in capture/reduced mode. */}
      <span className="block overflow-hidden pb-[0.1em]">
        {simple ? (
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0, ease: EASE }}
            className={yearClass}
          >
            {item.year}
          </motion.span>
        ) : (
          <motion.span
            initial={{ opacity: 0, clipPath: 'inset(100% 0 0 0)' }}
            whileInView={{ opacity: 1, clipPath: 'inset(0% 0 0 0)' }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: DUR.slow, ease: EASE }}
            className={yearClass}
          >
            {item.year}
          </motion.span>
        )}
      </span>

      <h3 className="mt-2 mb-4 text-2xl font-bold leading-snug tracking-tight text-[#000080] sm:text-3xl lg:text-4xl">
        {item.title}
      </h3>
      <p className="mb-6 text-base leading-relaxed text-slate-600 sm:text-lg">
        {item.desc}
      </p>
      {item.viz && <VizCard viz={item.viz} />}
    </div>
  );
}

function Cluster({
  item,
  i,
  side,
}: {
  item: HistoryItem;
  i: number;
  side: 'left' | 'right';
}) {
  const L = side === 'left';
  const Icon = ICONS[item.icon ?? 'pin'];
  const gray = Math.max(0, 1 - i / 4);
  const showIllustrative = item.illustrative !== false;

  return (
    <div className="group relative aspect-[4/3] w-full md:aspect-square lg:aspect-[4/3]">
      {/* Main Card */}
      <div
        className={`absolute top-0 h-[85%] w-[85%] overflow-hidden rounded-2xl bg-slate-200 shadow-lg ${
          L ? 'left-0' : 'right-0'
        }`}
      >
        {item.placeholder === 'portrait' ? (
          <div className="absolute inset-0 bg-gradient-to-br from-[#000080] via-[#0A1A4A] to-slate-800 flex flex-col items-center justify-center p-6 text-center select-none">
            <UserRound className="size-20 text-white/40 mb-3 stroke-[1.2]" />
            <span className="text-sm font-medium tracking-wide text-white/70">Portrait to be supplied</span>
          </div>
        ) : (
          <>
            <Img
              src={item.imgMain}
              alt={item.title}
              label={`Image: ${item.title}`}
              sizes="(max-width: 1024px) 90vw, 45vw"
              gray={gray}
              className="group-hover:scale-[1.02]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-transparent" />
          </>
        )}

        {showIllustrative && item.placeholder !== 'portrait' && (
          <span className="absolute bottom-3 left-3 z-20 rounded-md bg-black/45 px-2 py-0.5 text-[11px] font-medium text-white backdrop-blur-xs select-none">
            Illustrative image
          </span>
        )}
      </div>

      {/* Small Floating Card */}
      <div
        className={`absolute bottom-0 z-10 h-[45%] w-[45%] overflow-hidden rounded-xl border-8 border-white/90 bg-slate-300 shadow-2xl ${
          L ? 'right-0' : 'left-0'
        }`}
      >
        <Img
          src={item.imgSmall}
          alt=""
          label="Detail image"
          sizes="(max-width: 1024px) 45vw, 22vw"
          gray={gray}
          className="group-hover:scale-[1.02]"
        />
      </div>

      <div
        className={`absolute top-6 z-20 flex select-none items-center gap-2 rounded-full border border-white/40 bg-white/60 px-4 py-2 text-xs font-bold text-[#000080] shadow-sm backdrop-blur-md ${
          L ? 'left-6' : 'right-6'
        }`}
      >
        <Icon className="size-3.5" aria-hidden="true" />
        <span>{item.tag}</span>
      </div>
    </div>
  );
}

/** Breakout Full-Width Presentation for 1981 Milestone */
function BreakoutMilestone({
  item,
  i,
  simple,
}: {
  item: HistoryItem;
  i: number;
  simple: boolean;
}) {
  const gray = Math.max(0, 1 - i / 4);
  const Icon = ICONS[item.icon ?? 'landmark'];
  const showIllustrative = item.illustrative !== false;
  const yearClass = 'block font-display text-8xl sm:text-[11rem] md:text-[14rem] lg:text-[18rem] font-black tracking-tighter text-transparent leading-none';

  return (
    <div className="w-full">
      {/* 21:9 Wide Panel with Giant Sand-Outlined 1981 */}
      <div className="group relative aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden rounded-3xl bg-slate-900 shadow-2xl">
        <Img
          src={item.imgMain}
          alt={item.title}
          label={`Image: ${item.title}`}
          sizes="100vw"
          gray={gray}
          className="opacity-85"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/25 to-slate-950/40" />

        {/* Giant Outlined Year: one-time clip-path reveal */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center select-none overflow-hidden">
          <span className="block overflow-hidden pb-[0.1em]">
            {simple ? (
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.7 }}
                viewport={{ once: true }}
                transition={{ duration: 0, ease: EASE }}
                style={{ WebkitTextStroke: '2.5px #F4D5AB' }}
                className={yearClass}
              >
                {item.year}
              </motion.span>
            ) : (
              <motion.span
                initial={{ opacity: 0, clipPath: 'inset(100% 0 0 0)' }}
                whileInView={{ opacity: 0.7, clipPath: 'inset(0% 0 0 0)' }}
                viewport={{ once: true }}
                transition={{ duration: DUR.slow, ease: EASE }}
                style={{ WebkitTextStroke: '2.5px #F4D5AB' }}
                className={yearClass}
              >
                {item.year}
              </motion.span>
            )}
          </span>
        </div>

        {/* Top Floating Badge */}
        <div className="absolute top-6 left-6 z-20 flex items-center gap-2 rounded-full border border-white/30 bg-black/40 px-4 py-2 text-xs font-bold text-[#F4D5AB] shadow-md backdrop-blur-md">
          <Icon className="size-3.5" aria-hidden="true" />
          <span>{item.tag}</span>
        </div>

        {/* Floating Detail Inset Card */}
        <div className="absolute bottom-6 right-6 z-20 hidden md:block h-36 w-48 overflow-hidden rounded-xl border-4 border-white/90 bg-slate-300 shadow-2xl">
          <Img src={item.imgSmall} alt="Blueprints detail" label="Detail" sizes="200px" gray={gray} />
        </div>

        {showIllustrative && (
          <span className="absolute bottom-4 left-4 z-20 rounded-md bg-black/55 px-2 py-0.5 text-[11px] font-medium text-white backdrop-blur-xs select-none">
            Illustrative image
          </span>
        )}
      </div>

      {/* Copy in Two Columns Below on Desktop */}
      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <div className="mb-2 flex items-center gap-3">
            <span className="font-mono text-xs text-slate-400">Phase {String(i + 1).padStart(2, '0')}</span>
            <span className="rounded-full bg-[#F4D5AB] px-3.5 py-1 text-xs font-bold text-[#000080] shadow-xs">
              Fecto Cement Limited
            </span>
          </div>
          <h3 className="text-3xl font-bold leading-tight tracking-tight text-[#000080] sm:text-4xl">
            {item.title}
          </h3>
        </div>
        <div className="lg:col-span-7 flex flex-col justify-center">
          <p className="text-base sm:text-lg leading-relaxed text-slate-600 mb-6">
            {item.desc}
          </p>
          {item.viz && <VizCard viz={item.viz} />}
        </div>
      </div>
    </div>
  );
}

function Node({ lit, big }: { lit: boolean; big?: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={`absolute left-1/2 top-1/2 z-20 hidden -translate-x-1/2 -translate-y-1/2 rounded-full border-2 transition-all duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)] lg:block ${
        big ? 'h-6 w-6' : 'h-4 w-4'
      } ${
        lit
          ? 'border-[#F4D5AB] bg-[#000080] shadow-[0_0_0_6px_rgba(244,213,171,0.4)]'
          : 'border-slate-300 bg-white'
      }`}
    />
  );
}

/** Individual History Row Item with one-time executive reveal. */
function HistoryRowItem({
  item,
  i,
  active,
  simple,
  onRef,
}: {
  item: HistoryItem;
  i: number;
  active: number;
  simple: boolean;
  onRef: (el: HTMLDivElement | null) => void;
}) {
  const rowRef = useRef<HTMLDivElement | null>(null);
  const isMilestone = item.milestone === true;

  const setRowRef = (el: HTMLDivElement | null) => {
    rowRef.current = el;
    onRef(el);
  };

  return (
    <motion.div
      ref={setRowRef}
      initial={simple ? { opacity: 0 } : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: simple ? 0 : DUR.base, ease: EASE }}
      className={`relative z-10 ${
        isMilestone
          ? 'w-full'
          : `flex flex-col items-center justify-between gap-12 lg:gap-0 ${
              i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
            }`
      }`}
    >
      {!isMilestone && <Node lit={i < active} big={item.milestone} />}

      {isMilestone ? (
        <BreakoutMilestone item={item} i={i} simple={simple} />
      ) : (
        <>
          <div className="w-full lg:w-[45%]">
            <Cluster item={item} i={i} side={i % 2 === 0 ? 'left' : 'right'} />
          </div>
          <div className="w-full lg:w-[45%]">
            <Copy item={item} i={i} simple={simple} />
          </div>
        </>
      )}
    </motion.div>
  );
}

export interface CompanyHistoryProps {
  className?: string;
  staticReveal?: boolean;
}

/**
 * CompanyHistory Component
 *
 * Features:
 * - Light editorial sheet with a compact seven-chapter sample timeline.
 * - One-time executive reveals using opacity, transform, and clip-path only.
 * - Static era grayscale; no animated filters or image parallax.
 * - Central gold rail remains the only scroll-linked transform.
 * - Mobile, reduced-motion, and capture mode render static content.
 */
export default function CompanyHistory({
  className = '',
  staticReveal = false,
}: CompanyHistoryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rows = useRef<(HTMLDivElement | null)[]>([]);
  const [marks, setMarks] = useState<number[]>([]);
  const [active, setActive] = useState(0);
  const { simple: prefersSimple } = useMotionPrefs();
  const simple = prefersSimple || staticReveal;

  // Rail fill progress: confirms fill tip matches viewport center
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 50%', 'end 50%'],
  });

  useEffect(() => {
    const measure = () => {
      const c = containerRef.current;
      if (!c) return;
      const cTop = c.offsetTop;
      const cH = c.offsetHeight;
      if (!cH) return;
      setMarks(
        rows.current.map((r) => {
          if (!r) return 0;
          return (r.offsetTop + r.offsetHeight / 2 - cTop) / cH;
        })
      );
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (!marks.length) return;
    let idx = 0;
    for (let i = 0; i < marks.length; i++) {
      if (v >= marks[i] - 0.05) idx = i + 1;
    }
    setActive(idx);
  });

  return (
    <section
      id="heritage"
      data-tone="light"
      className={`relative isolate overflow-hidden bg-slate-50 -mt-10 ${Z.history} rounded-t-[40px] shadow-[0_-20px_60px_rgba(0,0,60,0.25)] pt-20 sm:pt-28 pb-28 sm:pb-36 ${className}`}
    >
      {/* Top Header */}
      <div className="mx-auto max-w-7xl px-6 text-center lg:px-8 mb-12 sm:mb-16">
        <motion.div
          initial={{ opacity: 0, y: simple ? 0 : 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: simple ? 0 : DUR.base, ease: EASE }}
          className="mb-5 flex flex-wrap items-center justify-center gap-2"
        >
          <span className="inline-block rounded-full border border-slate-200/90 bg-white/80 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#000080] shadow-sm backdrop-blur-md">
            Our heritage
          </span>
          <span className="rounded-full border border-[#000080]/15 bg-[#000080]/5 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[#000080]/70">
            Sample timeline
          </span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: simple ? 0 : 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: simple ? 0 : DUR.base, ease: EASE, delay: simple ? 0 : 0.08 }}
          className="text-3xl font-bold leading-[1.12] tracking-tight text-[#000080] sm:text-4xl md:text-5xl lg:text-6xl"
        >
          Seven chapters in an industrial portfolio.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: simple ? 0 : 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: simple ? 0 : DUR.base, ease: EASE, delay: simple ? 0 : 0.16 }}
          className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-slate-600 sm:text-lg"
        >
          A realistic mock timeline: trading credit, technical partnership, multi-site operations, cement, energy, and a lower-carbon roadmap. Every date, figure, and image is illustrative.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: simple ? 0 : 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: simple ? 0 : DUR.base, ease: EASE, delay: simple ? 0 : 0.24 }}
          className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3"
        >
          <div className="rounded-2xl border border-white/80 bg-white/70 px-4 py-3 shadow-sm">
            <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-400">Span</div>
            <div className="mt-1 font-semibold text-[#000080]">1947 — Roadmap</div>
          </div>
          <div className="rounded-2xl border border-white/80 bg-white/70 px-4 py-3 shadow-sm">
            <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-400">Chapters</div>
            <div className="mt-1 font-semibold text-[#000080]">7 sample milestones</div>
          </div>
          <div className="rounded-2xl border border-white/80 bg-white/70 px-4 py-3 shadow-sm">
            <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-400">Data status</div>
            <div className="mt-1 font-semibold text-[#000080]">Dummy / illustrative</div>
          </div>
        </motion.div>
      </div>

      <div ref={containerRef} className="relative z-10 mx-auto max-w-7xl space-y-16 px-6 sm:space-y-24 lg:px-8">
        {/* Background Vertical Line */}
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-0 bottom-0 z-0 hidden w-[2px] -translate-x-1/2 bg-slate-200 lg:block"
        />
        {/* Gold rail progress: the only scroll-linked transform in this section */}
        <motion.div
          aria-hidden="true"
          style={{ scaleY: scrollYProgress }}
          className="absolute left-1/2 top-0 bottom-0 z-10 hidden w-[2px] origin-top -translate-x-1/2 bg-[#F4D5AB] lg:block"
        />

        {historyData.map((item, i) => (
          <HistoryRowItem
            key={item.year}
            item={item}
            i={i}
            active={active}
            simple={simple}
            onRef={(el) => {
              rows.current[i] = el;
            }}
          />
        ))}
      </div>

      <motion.div
        className="mx-auto mt-16 max-w-7xl px-6 lg:px-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: simple ? 0 : DUR.base, ease: EASE }}
      >
        <p className="rounded-2xl border border-slate-200/80 bg-white/60 px-5 py-4 text-center font-mono text-[11px] uppercase tracking-[0.14em] text-slate-500">
          Mock design note · names, dates, capacities, targets, and imagery are realistic placeholders for layout review, not verified corporate records.
        </p>
      </motion.div>
    </section>
  );
}
