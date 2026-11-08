'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useInView, useMotionValueEvent, useScroll, useTransform, MotionValue } from 'framer-motion';
import { Factory, Landmark, MapPin, Radio, Sprout, Sun, TrendingUp, UserRound, type LucideIcon } from 'lucide-react';
import { useMotionPrefs } from '@/hooks/useMotionPrefs';
import { EASE, DUR, Z } from '@/lib/motion';

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
    title: 'A Vision Beyond Borders',
    desc: 'The Fecto story began with a humble shoe store on Grant Road, Mumbai. Post-1947, the founder migrated to Dhaka, establishing a vast trading network and laying a foundation built purely on trust and resilience.',
    tag: 'The First Step',
    icon: 'pin',
    viz: { kind: 'route', from: 'Mumbai', to: 'Dhaka' },
    imgMain: '/placeholders/1940s-street.jpg',
    imgSmall: '/placeholders/vintage-ledger.jpg',
    illustrative: true,
  },
  {
    year: '1957',
    title: 'The Historic Toshiba Alliance',
    desc: 'Moving from trading to high-tech manufacturing, the group signed a historic joint venture with TOSHIBA to manufacture radio sets—marking the first-ever Pakistan-Japanese joint venture.',
    tag: 'First Pak-Japan JV',
    icon: 'radio',
    viz: { kind: 'stat', value: '1st', label: 'Pakistan–Japan joint venture' },
    imgMain: '/images/history/history-toshiba.jpg',
    imgSmall: '/placeholders/old-assembly-line.jpg',
    illustrative: true,
  },
  {
    year: '1970s',
    title: 'Nationwide Industrialization',
    desc: "The group's pace of development accelerated exponentially, flowering into a massive national conglomerate. Fecto expanded well beyond commercial trading, successfully establishing multiple Sugar Mills, a Tractor Assembly Plant, Paper Sack units, and Particle Board facilities.",
    tag: 'The Conglomerate Era',
    icon: 'factory',
    viz: { kind: 'chips', items: ['Sugar mills', 'Tractor assembly', 'Paper sacks', 'Particle board'] },
    imgMain: '/images/history/history-industrialization.jpg',
    imgSmall: '/images/history/vintage-tractor-assembly.jpg',
    illustrative: true,
  },
  {
    year: '1981',
    title: 'A Legacy Cast in Stone',
    desc: 'Expanding aggressively into heavy industry, Fecto Cement Limited was incorporated. The group’s focus shifted definitively towards building the physical foundations of a rapidly growing nation.',
    tag: 'Foundation Laid',
    icon: 'landmark',
    milestone: true,
    imgMain: '/images/history/history-legacy.jpg',
    imgSmall: '/images/history/vintage-blueprints.jpg',
    illustrative: true,
  },
  {
    year: '1993',
    title: 'The Era of Scale & Leadership',
    desc: "In 1993, the company entered a new era of strategic expansion as Mohammed Yasin Fecto took the helm as CEO. Driving aggressive modernization over his tenure, his leadership successfully scaled the plant's initial capacity of 1,000 tons to a massive 3,000 metric tons of clinker per day.",
    tag: '3,000 MTPD Capacity',
    icon: 'growth',
    viz: { kind: 'meter', unit: 'tons of clinker per day', from: 1000, to: 3000 },
    imgMain: '/images/history/Gemini_Generated_Image_s6vce0s6vce0s6vc.jpg',
    imgSmall: '/images/history/history-scale-plant.jpg',
    placeholder: 'portrait',
    illustrative: true,
  },
  {
    year: '2021',
    title: 'Engineering a Cleaner Future',
    desc: 'Adapting to global energy standards, Fecto Cement successfully commissioned a dedicated 5MW On-Grid Solar Power Plant at Sangjani, significantly reducing carbon footprint and grid dependency.',
    tag: '5MW On-Grid Solar',
    icon: 'sun',
    viz: { kind: 'stat', value: '5 MW', label: 'On-grid solar at Sangjani' },
    imgMain: '/images/history/Gemini_Generated_Image_sntfe6sntfe6sntf.jpg',
    imgSmall: '/images/history/Gemini_Generated_Image_o7oskto7oskto7os.jpg',
    illustrative: true,
  },
  {
    year: 'Future',
    title: 'Sustainable Horizons',
    desc: 'The journey doesn’t stop here. Fecto Cement is pioneering the next era of green manufacturing through advanced Waste Heat Recovery (WHR) systems and Alternative Fuels (AF). By integrating massive natural ecological buffers at Sangjani and optimizing thermal efficiency, we are engineering a lower-carbon manufacturing future for the next generation of builders.',
    tag: 'Architecting Tomorrow',
    icon: 'sprout',
    viz: {
      kind: 'progress',
      label: 'Waste Heat Recovery & AF Integration',
      status: 'Working toward lower emissions',
      percentage: 85,
    },
    imgMain: '/images/history/future-primary-eco.jpg',
    imgSmall: '/images/history/future-secondary-whr.jpg',
    illustrative: true,
  },
];

/* ───────────── small pieces ───────────── */

/** Image with graceful fallback and smooth CSS filter via Framer Motion */
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
  gray: number | MotionValue<number>;
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

  const isMotion = typeof gray === 'object' && gray !== null && 'get' in gray;
  const filterMotion = isMotion
    ? useTransform(gray as MotionValue<number>, (g) =>
        g > 0.01 ? `grayscale(${g}) contrast(${1 + g * 0.1})` : 'none'
      )
    : undefined;
  const staticFilter =
    !isMotion && typeof gray === 'number' && gray > 0
      ? `grayscale(${gray}) contrast(${1 + gray * 0.1})`
      : undefined;

  return (
    <motion.div
      style={isMotion ? { filter: filterMotion } : staticFilter ? { filter: staticFilter } : undefined}
      className="relative w-full h-full overflow-hidden"
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        onError={() => setBad(true)}
        className={`object-cover object-center transition-all duration-700 ${className}`}
      />
    </motion.div>
  );
}

function Meter({ unit, from, to }: { unit: string; from: number; to: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const on = useInView(ref, { once: true, margin: '-20% 0px' });
  const bar = (v: number, barClass: string, delay: number) => {
    const pct = Math.min(100, Math.round((v / to) * 100));
    return (
      <div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
          <motion.div
            className={`h-full rounded-full ${barClass}`}
            initial={{ width: 0 }}
            animate={{ width: on ? `${pct}%` : 0 }}
            transition={{ duration: 1.1, ease: 'easeOut', delay }}
          />
        </div>
        <span className="font-mono text-xs font-semibold text-slate-700">{v.toLocaleString()}</span>
      </div>
    );
  };
  return (
    <div ref={ref} className="space-y-2.5">
      {bar(from, 'bg-slate-400', 0)}
      {bar(to, 'bg-gradient-to-r from-[#F4D5AB] to-[#E3B878]', 0.3)}
      <p className="font-mono text-xs text-slate-500">{unit}</p>
    </div>
  );
}

function Route({ from, to }: { from: string; to: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const on = useInView(ref, { once: true, margin: '-20% 0px' });
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
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
        <circle cx="114" cy="6" r="4" fill="#000080" />
      </svg>
      <span>{to}</span>
    </div>
  );
}

function VizCard({ viz }: { viz: HistoryViz }) {
  return (
    <div className="mb-2 max-w-md rounded-2xl border border-white/70 bg-white/60 p-4 shadow-sm backdrop-blur-md">
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
              <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
              {viz.status}
            </span>
          </div>
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-200/80 p-0.5 shadow-inner">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[#000080] via-[#E3B878] to-emerald-500 shadow-sm"
              initial={{ width: 0 }}
              whileInView={{ width: `${viz.percentage ?? 85}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
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
  rowProgress,
  simple,
}: {
  item: HistoryItem;
  i: number;
  rowProgress: MotionValue<number>;
  simple: boolean;
}) {
  const y = useTransform(rowProgress, [0, 1], ['105%', '0%']);

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

      {/* Year mask-rise numeral: block overflow-hidden pb-[0.1em] prevents clipping */}
      <span className="block overflow-hidden pb-[0.1em]">
        {simple ? (
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: DUR.base, ease: EASE }}
            className="block bg-gradient-to-b from-[#000080] to-[#000080]/15 bg-clip-text text-7xl font-bold leading-[0.95] tracking-tighter text-transparent sm:text-8xl lg:text-[6.5rem]"
          >
            {item.year}
          </motion.span>
        ) : (
          <motion.span
            style={{ y }}
            className="block bg-gradient-to-b from-[#000080] to-[#000080]/15 bg-clip-text text-7xl font-bold leading-[0.95] tracking-tighter text-transparent sm:text-8xl lg:text-[6.5rem]"
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
  rowProgress,
  simple,
}: {
  item: HistoryItem;
  i: number;
  side: 'left' | 'right';
  rowProgress: MotionValue<number>;
  simple: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  // Two layers drift at different speeds: cheap depth.
  const yMain = useTransform(p, [0, 1], simple ? [0, 0] : [26, -26]);
  const ySmall = useTransform(p, [0, 1], simple ? [0, 0] : [-40, 40]);
  const L = side === 'left';
  const Icon = ICONS[item.icon ?? 'pin'];

  // Era grayscale arc: eases 35% toward colour as row passes viewport centre
  const baseGray = Math.max(0, 1 - i / 4);
  const dynamicGray = useTransform(rowProgress, (prog) => baseGray * (1 - 0.35 * prog));
  const gray = simple ? baseGray : dynamicGray;
  const showIllustrative = item.illustrative !== false;

  return (
    <div ref={ref} className="group relative aspect-[4/3] w-full md:aspect-square lg:aspect-[4/3]">
      {/* Main Card */}
      <motion.div
        style={{ y: yMain }}
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
              className="group-hover:scale-105"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-transparent" />
          </>
        )}

        {/* Illustrative image chip */}
        {showIllustrative && item.placeholder !== 'portrait' && (
          <span className="absolute bottom-3 left-3 z-20 rounded-md bg-black/45 px-2 py-0.5 text-[11px] font-medium text-white backdrop-blur-xs select-none">
            Illustrative image
          </span>
        )}
      </motion.div>

      {/* Small Floating Card with border-8 */}
      <motion.div
        style={{ y: ySmall }}
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
          className="group-hover:scale-110"
        />
      </motion.div>

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
  rowProgress,
  simple,
}: {
  item: HistoryItem;
  i: number;
  rowProgress: MotionValue<number>;
  simple: boolean;
}) {
  const baseGray = Math.max(0, 1 - i / 4);
  const dynamicGray = useTransform(rowProgress, (prog) => baseGray * (1 - 0.35 * prog));
  const gray = simple ? baseGray : dynamicGray;
  const Icon = ICONS[item.icon ?? 'landmark'];
  const showIllustrative = item.illustrative !== false;
  const y = useTransform(rowProgress, [0, 1], ['105%', '0%']);

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
          className="group-hover:scale-105 opacity-85"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/25 to-slate-950/40" />

        {/* Giant Outlined 1981 Numeral with Mask Rise */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center select-none overflow-hidden">
          <span className="block overflow-hidden pb-[0.1em]">
            {simple ? (
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: DUR.base, ease: EASE }}
                className="block font-display text-8xl sm:text-[11rem] md:text-[14rem] lg:text-[18rem] font-black tracking-tighter text-transparent leading-none"
                style={{
                  WebkitTextStroke: '2.5px #F4D5AB',
                  opacity: 0.7,
                }}
              >
                {item.year}
              </motion.span>
            ) : (
              <motion.span
                style={{
                  y,
                  WebkitTextStroke: '2.5px #F4D5AB',
                  opacity: 0.7,
                }}
                className="block font-display text-8xl sm:text-[11rem] md:text-[14rem] lg:text-[18rem] font-black tracking-tighter text-transparent leading-none"
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

        {/* Illustrative Chip */}
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
      className={`absolute left-1/2 top-1/2 z-20 hidden -translate-x-1/2 -translate-y-1/2 rounded-full border-2 transition-all duration-500 lg:block ${
        big ? 'h-6 w-6' : 'h-4 w-4'
      } ${
        lit
          ? 'border-[#F4D5AB] bg-[#000080] shadow-[0_0_0_6px_rgba(244,213,171,0.4)]'
          : 'border-slate-300 bg-white'
      }`}
    >
      {/* Soft pulse ring when lit */}
      {lit && (
        <motion.span
          initial={{ scale: 1, opacity: 0.5 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="pointer-events-none absolute inset-0 rounded-full border-2 border-[#F4D5AB]"
        />
      )}
    </div>
  );
}

/** Individual History Row Item with Scrolled per-row progress tracking */
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
  const { scrollYProgress: rowProgress } = useScroll({
    target: rowRef,
    offset: ['start 90%', 'start 50%'],
  });

  const isMilestone = item.milestone === true;

  const setRowRef = (el: HTMLDivElement | null) => {
    rowRef.current = el;
    onRef(el);
  };

  return (
    <motion.div
      ref={setRowRef}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.7, ease: EASE }}
      className={`relative z-10 ${
        isMilestone
          ? 'w-full'
          : `flex flex-col items-center justify-between gap-12 lg:gap-0 ${
              i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
            }`
      }`}
    >
      {/* Rail Node aligned with row center */}
      {!isMilestone && <Node lit={i < active} big={item.milestone} />}

      {isMilestone ? (
        /* Breakout 1981 Presentation */
        <BreakoutMilestone
          item={item}
          i={i}
          rowProgress={rowProgress}
          simple={simple}
        />
      ) : (
        /* Standard Alternating Row */
        <>
          <div className="w-full lg:w-[45%]">
            <Cluster
              item={item}
              i={i}
              side={i % 2 === 0 ? 'left' : 'right'}
              rowProgress={rowProgress}
              simple={simple}
            />
          </div>
          <div className="w-full lg:w-[45%]">
            <Copy
              item={item}
              i={i}
              rowProgress={rowProgress}
              simple={simple}
            />
          </div>
        </>
      )}
    </motion.div>
  );
}

export interface CompanyHistoryProps {
  className?: string;
}

/**
 * CompanyHistory Component
 *
 * Heritage timeline detailing nearly eight decades of Fecto Group's industrial scale.
 * Features:
 * - Enter as a light sheet overlapping the Founder section (-mt-10, rounded-t-[40px], shadow).
 * - Central gold timeline rail with fill progress aligned to viewport center.
 * - One-time soft pulse ring when rail nodes light up.
 * - Scrubbed year mask-rise numbers with no descender clipping.
 * - Era grayscale arc that eases toward color as rows cross the center.
 */
export default function CompanyHistory({ className = '' }: CompanyHistoryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rows = useRef<(HTMLDivElement | null)[]>([]);
  const [marks, setMarks] = useState<number[]>([]);
  const [active, setActive] = useState(0);
  const { simple } = useMotionPrefs();

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
      className={`relative isolate overflow-hidden bg-slate-50 -mt-10 ${Z.history} rounded-t-[40px] shadow-[0_-20px_60px_rgba(0,0,60,0.25)] pt-24 sm:pt-32 pb-44 sm:pb-52 ${className}`}
    >
      {/* Top Header */}
      <div className="mx-auto max-w-7xl px-6 text-center lg:px-8 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: DUR.slow, ease: EASE }}
        >
          <span className="mb-5 inline-block rounded-full border border-slate-200/90 bg-white/80 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#000080] shadow-sm backdrop-blur-md">
            Our heritage
          </span>
          <h2 className="text-3xl font-bold leading-[1.12] tracking-tight text-[#000080] sm:text-4xl md:text-5xl lg:text-6xl">
            Forging the foundation of a modern nation.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            From pre-partition commercial trade to pioneering technology ventures, heavy industrial scaling, and renewable microgrids—nearly eight decades of building Pakistan’s economic spine.
          </p>
        </motion.div>
      </div>

      <div ref={containerRef} className="relative z-10 mx-auto max-w-7xl space-y-24 px-6 sm:space-y-36 lg:px-8">
        {/* Background Vertical Line */}
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-0 bottom-0 z-0 hidden w-[2px] -translate-x-1/2 bg-slate-200 lg:block"
        />
        {/* Animated Gold Scale Fill Line: aligned to viewport center */}
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
    </section>
  );
}
