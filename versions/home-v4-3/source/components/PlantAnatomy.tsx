'use client';

import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { useMotionPrefs } from '../hooks/useMotionPrefs';
import { useSectionProgress } from '../hooks/useSectionProgress';
import { scrollToY } from './SmoothScroll';
import { DUR, Z } from '../lib/motion';

/* ───────────── constants ───────────── */

// Heavy, near-critically-damped drone feel (no overshoot)
const SPRING_PAN = { stiffness: 22, damping: 14, mass: 2.0, restDelta: 0.5, restSpeed: 0.5 }; // zeta ~1.05, ~1.7 s
const SPRING_SCALE = { stiffness: 16, damping: 12, mass: 2.2, restDelta: 0.001, restSpeed: 0.001 }; // zeta ~1.01, ~2.1 s; dollies in after the pan
const PULL_SPRING = { stiffness: 80, damping: 20 };
const BREAKPOINT_MOBILE = 768;
const ANCHORS = { DESKTOP: { ax: -0.04, ay: 0 }, MOBILE: { ax: 0, ay: -0.19 } }; // fractions of stage size
const MOBILE_ZOOM_FACTOR = 0.6;
const TOUR_INTERVAL_MS = 7000;
const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];
const NF = new Intl.NumberFormat('en');
const pad = (n: number) => String(n).padStart(2, '0');

const GLASS =
  'bg-[#0A0F1F]/55 backdrop-blur-xl border border-white/15 ring-1 ring-inset ring-white/5 shadow-[0_24px_80px_rgba(0,0,40,0.45)]';
const FOCUS =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4D5AB] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0F1F]';

type Variant = 'desktop' | 'mobile';

/* ───────────── data model ───────────── */

export interface PlantMetric {
  label: string;
  value: number | string;
  unit?: string;
}

export interface PlantNode {
  id: string; // kebab-case: DOM ids and optional URL hash
  label: string;
  kicker: string;
  title: string;
  blurb: string;
  metrics: PlantMetric[];
  panX: number; // focal point, % of image width (0 to 100, from top-left)
  panY: number; // focal point, % of image height
  scale: number; // desktop zoom (1 = whole canvas)
}

export interface PlantAnatomyProps {
  className?: string;
  imageSrc?: string;
  imageAspect?: number; // source width / height
  imageAlt?: string;
  blurDataURL?: string;
  nodes?: PlantNode[];
  initialNodeId?: string;
  syncHash?: boolean;
  showMockNotice?: boolean;
  debug?: boolean; // also on when the URL has ?plantDebug=1
  scrollMode?: 'pinned' | 'free';
  staticReveal?: boolean;
}

// re-author panX/panY/scale after the final aerial is chosen (use debug mode)
// SAMPLE DATA: confirm every figure with Fecto before launch
export const PLANT_NODES: PlantNode[] = [
  { id: 'overview', label: 'Whole plant', kicker: 'Overview', title: 'Sangjani, Islamabad', blurb: 'A dry-process cement plant that turns limestone into 50 kg bags, with part of its power generated on site.', metrics: [{ label: 'Clinker capacity', value: 3000, unit: 'MT/day' }, { label: 'Quality system', value: 'ISO 9001:2015' }], panX: 50, panY: 50, scale: 1 },
  { id: 'crusher', label: 'Crusher', kicker: 'Stage 01', title: 'Crushing limestone', blurb: 'Quarried limestone is crushed to a size the rest of the plant can handle.', metrics: [{ label: 'Material', value: 'Limestone' }, { label: 'Role', value: 'Primary crushing' }], panX: 12, panY: 38, scale: 1.9 },
  { id: 'stacker-reclaimer', label: 'Stacker and reclaimer', kicker: 'Stage 02', title: 'Blending the feed', blurb: 'Crushed stone is stacked in layers and reclaimed together, so the kiln feed stays consistent.', metrics: [{ label: 'Purpose', value: 'Consistent kiln feed' }, { label: 'Method', value: 'Layered blending' }], panX: 22, panY: 54, scale: 1.7 },
  { id: 'raw-grinding', label: 'Raw grinding', kicker: 'Stage 03', title: 'Raw meal', blurb: 'Limestone and additives are ground into fine raw meal.', metrics: [{ label: 'Output', value: 'Fine raw meal' }, { label: 'Next step', value: 'Preheater tower' }], panX: 38, panY: 43, scale: 1.8 },
  { id: 'kiln', label: 'Preheater, kiln, cooler', kicker: 'Stage 04', title: 'The kiln', blurb: 'Raw meal is heated in the rotary kiln to form clinker, then cooled quickly.', metrics: [{ label: 'Kiln temperature', value: 1450, unit: '°C' }, { label: 'Capacity', value: 3000, unit: 'MT/day' }, { label: 'Process', value: 'Dry process' }], panX: 53, panY: 44, scale: 2.1 },
  { id: 'cement-mill', label: 'Cement mill', kicker: 'Stage 05', title: 'Grinding cement', blurb: 'Clinker and gypsum are ground into finished cement.', metrics: [{ label: 'Inputs', value: 'Clinker and gypsum' }, { label: 'Grades', value: 'OPC, SRC, blended' }], panX: 66, panY: 57, scale: 1.8 },
  { id: 'packing', label: 'Packing', kicker: 'Stage 06', title: 'Bagged for the site', blurb: 'Cement is bagged and dispatched to dealers and project sites.', metrics: [{ label: 'Bag size', value: 50, unit: 'kg' }, { label: 'Bags per tonne', value: 20 }], panX: 87, panY: 62, scale: 1.8 },
  { id: 'power', label: 'Waste heat and solar', kicker: 'Stage 07', title: 'Power from the plant itself', blurb: "Kiln exhaust heat and a solar array generate part of the plant's electricity.", metrics: [{ label: 'Waste heat recovery', value: 6, unit: 'MW' }, { label: 'Solar', value: 5, unit: 'MW' }], panX: 83, panY: 33, scale: 1.6 },
];

/* ───────────── small components ───────────── */

/** Animated number for sighted users; the final value is exposed to screen readers once. */
function MetricValue({ value, unit, reduced }: { value: number | string; unit?: string; reduced: boolean }) {
  const num = typeof value === 'number' ? value : null;
  const mv = useMotionValue(0);
  const text = useTransform(mv, (v) => NF.format(Math.round(v)));

  useEffect(() => {
    if (num === null) return;
    if (reduced) {
      mv.set(num);
      return;
    }
    mv.set(0);
    const c = animate(mv, num, { duration: DUR.slow, delay: 0.08, ease: EASE });
    return () => c.stop();
  }, [num, reduced, mv]);

  const finalText = num === null ? value : NF.format(num);
  return (
    <>
      <span aria-hidden="true">{num === null ? value : <motion.span>{text}</motion.span>}</span>
      <span className="sr-only">
        {finalText}
        {unit ? ` ${unit}` : ''}
      </span>
    </>
  );
}

interface PillListProps {
  nodes: PlantNode[];
  activeIndex: number;
  variant: Variant;
  refs: React.MutableRefObject<(HTMLButtonElement | null)[]>;
  onSelect: (i: number) => void;
}

const PillList = memo(function PillList({ nodes, activeIndex, variant, refs, onSelect }: PillListProps) {
  const desktop = variant === 'desktop';

  const onKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, i: number) => {
    const prev = desktop ? 'ArrowUp' : 'ArrowLeft';
    const next = desktop ? 'ArrowDown' : 'ArrowRight';
    let t = -1;
    if (e.key === next) t = (i + 1) % nodes.length;
    else if (e.key === prev) t = (i - 1 + nodes.length) % nodes.length;
    else if (e.key === 'Home') t = 0;
    else if (e.key === 'End') t = nodes.length - 1;
    if (t < 0) return;
    e.preventDefault();
    onSelect(t);
    refs.current[t]?.focus();
  };

  return (
    <div
      role="tablist"
      aria-orientation={desktop ? 'vertical' : 'horizontal'}
      className={
        desktop
          ? 'relative space-y-1 pl-4'
          : 'pointer-events-auto flex snap-x snap-mandatory gap-2 overflow-x-auto py-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
      }
    >
      {desktop && (
        <>
          <div aria-hidden="true" className="absolute bottom-2 left-0 top-2 w-px bg-white/10" />
          <div
            aria-hidden="true"
            style={{ height: `${(activeIndex / Math.max(1, nodes.length - 1)) * 100}%` }}
            className="absolute left-0 top-2 w-px bg-[#F4D5AB] transition-[height] duration-300"
          />
        </>
      )}
      {nodes.map((n, i) => {
        const on = i === activeIndex;
        return (
          <button
            key={n.id}
            ref={(el) => {
              refs.current[i] = el;
            }}
            role="tab"
            id={`tab-${variant}-${n.id}`}
            aria-selected={on}
            aria-controls={`plant-card-${variant}`}
            tabIndex={on ? 0 : -1}
            onClick={() => onSelect(i)}
            onKeyDown={(e) => onKeyDown(e, i)}
            className={`relative flex items-center gap-2.5 rounded-full px-3.5 py-2 text-sm transition-colors ${FOCUS} ${
              desktop ? 'w-full text-left' : 'flex-none snap-center whitespace-nowrap'
            } ${on ? 'font-semibold text-[#000080]' : 'bg-[#0A0F1F]/40 text-white/80 backdrop-blur-md hover:bg-white/10'}`}
          >
            {on && (
              <motion.span
                layoutId={`plant-pill-${variant}`}
                className="absolute inset-0 z-0 rounded-full bg-[#F4D5AB] shadow-sm"
                transition={{ type: 'spring', stiffness: 420, damping: 34 }}
              />
            )}
            <span className={`relative z-10 font-mono text-xs ${on ? 'text-[#000080]/80' : 'text-[#F4D5AB]'}`}>{pad(i + 1)}</span>
            <span className="relative z-10 truncate">{n.label}</span>
          </button>
        );
      })}
    </div>
  );
});

interface SpecCardProps {
  node: PlantNode;
  index: number;
  total: number;
  variant: Variant;
  reduced: boolean;
  onStep: (d: 1 | -1) => void;
}

const SpecCard = memo(function SpecCard({ node, index, total, variant, reduced, onStep }: SpecCardProps) {
  const d = variant === 'desktop';
  // Enter delay lives only in the enter target, so the exit stays quick
  const enter = {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: reduced ? { duration: 0 } : { delay: d ? 0.5 : 0.35, duration: 0.6, ease: EASE },
  };
  const exit = reduced ? undefined : { opacity: 0, y: -14, scale: 0.98, transition: { duration: 0.25, ease: 'easeIn' as const } };
  const stepBtn = `rounded-full border border-white/15 bg-white/5 p-2 text-white/80 transition-colors hover:bg-white/15 hover:text-white ${FOCUS}`;

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 28, scale: 0.97 }}
      animate={enter}
      exit={exit}
      className={`${GLASS} ${d ? 'rounded-3xl p-6' : 'rounded-2xl p-4'}`}
    >
      <div className="flex items-center justify-between font-mono text-xs">
        <span className="text-[#F4D5AB]">{node.kicker}</span>
        <span className="text-white/50">
          {pad(index + 1)} / {pad(total)}
        </span>
      </div>
      <div className="my-3 h-px w-12 bg-[#F4D5AB]" />
      <h3 className={`font-display font-bold tracking-tight text-white ${d ? 'text-3xl' : 'text-xl'}`}>{node.title}</h3>
      <p className={`mt-2 leading-relaxed text-white/80 ${d ? 'text-base' : 'text-sm'}`}>{node.blurb}</p>

      <div className="mt-4 grid grid-cols-2 gap-4 border-t border-white/10 pt-4">
        {node.metrics.map((m) => {
          const isNum = typeof m.value === 'number';
          return (
            <div key={m.label} className="min-w-0">
              <span className="block truncate font-mono text-xs text-white/60">{m.label}</span>
              <div className="mt-1 flex min-w-0 flex-wrap items-baseline gap-1.5">
                <span
                  className={`break-normal font-display font-bold tracking-tight text-white ${
                    isNum ? (d ? 'text-3xl' : 'text-2xl') : `${d ? 'text-xl' : 'text-base'} text-balance leading-tight`
                  }`}
                >
                  <MetricValue value={m.value} unit={m.unit} reduced={reduced} />
                </span>
                {m.unit && (
                  <span aria-hidden="true" className="shrink-0 font-mono text-sm font-semibold text-[#F4D5AB]">
                    {m.unit}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
        <button type="button" onClick={() => onStep(-1)} aria-label="Previous stage" className={stepBtn}>
          <ChevronLeft className="size-4" />
        </button>
        <div className="flex flex-col items-center gap-1.5 px-2">
          <span className="max-w-[170px] truncate text-center font-mono text-xs text-white/70">{node.label}</span>
          <div aria-hidden="true" className="flex items-center gap-1.5">
            {Array.from({ length: total }, (_, i) => (
              <span key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === index ? 'w-5 bg-[#F4D5AB]' : 'w-1.5 bg-white/30'}`} />
            ))}
          </div>
        </div>
        <button type="button" onClick={() => onStep(1)} aria-label="Next stage" className={stepBtn}>
          <ChevronRight className="size-4" />
        </button>
      </div>
    </motion.div>
  );
});

function TourButton({ on, onToggle, compact }: { on: boolean; onToggle: () => void; compact?: boolean }) {
  return (
    <button
      type="button"
      aria-pressed={on}
      aria-label={on ? 'Pause flight' : 'Fly through'}
      onClick={onToggle}
      className={`flex items-center gap-2.5 rounded-full border text-sm font-semibold transition-all ${FOCUS} ${compact ? 'p-2' : 'px-4 py-2'} ${
        on ? 'border-[#F4D5AB] bg-[#F4D5AB] text-[#000080]' : 'border-white/20 bg-[#0A0F1F]/60 text-white backdrop-blur-md hover:bg-white/15'
      }`}
    >
      {on ? <Pause className="size-3.5 fill-current" /> : <Play className="size-3.5 fill-current" />}
      {!compact && <span>{on ? 'Pause flight' : 'Fly through'}</span>}
    </button>
  );
}

/* ───────────── main component ───────────── */

export default function PlantAnatomy({
  className = '',
  imageSrc = '/images/sangjani-aerial.jpg',
  imageAspect = 1672 / 941,
  imageAlt = 'Aerial view of a cement plant',
  blurDataURL,
  nodes = PLANT_NODES,
  initialNodeId,
  syncHash = false,
  showMockNotice = true,
  debug = false,
  scrollMode,
  staticReveal = false,
}: PlantAnatomyProps) {
  const outerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const desktopPills = useRef<(HTMLButtonElement | null)[]>([]);
  const mobilePills = useRef<(HTMLButtonElement | null)[]>([]);
  const camRun = useRef(0);
  const hintShown = useRef(false);
  const hintTimers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const { simple: prefersSimple } = useMotionPrefs();
  const simple = prefersSimple || staticReveal;
  const isPinned = (scrollMode ?? (!simple ? 'pinned' : 'free')) === 'pinned';

  // Section progress during pinning: start start -> end end
  const p = useSectionProgress(outerRef, 'pin');

  // Normalized iris opening progress q (0 -> 1 over p from 0 to 0.1)
  const q = useTransform(p, (v) => Math.min(1, Math.max(0, v / 0.1)));

  // Iris opening style for pinned mode: window expands from inset(12svh 8vw round 32px) to 0
  const irisClipPath = useTransform(q, (val) => {
    const svh = (1 - val) * 12;
    const vw = (1 - val) * 8;
    const rad = (1 - val) * 32;
    return `inset(${svh}svh ${vw}vw round ${rad}px)`;
  });

  // HUD opacity: fades in from 0 to 1 as q moves from 0.75 to 1.0 (p between 0.075 and 0.1)
  const hudOpacity = useTransform(q, (val) => {
    return Math.min(1, Math.max(0, (val - 0.75) * 4));
  });

  // Ambient layer & frame ring opacity: fades out 1 -> 0 as iris window expands (q goes 0 -> 1)
  const ambientOpacity = useTransform(q, (v) => 1 - v);

  // Frame ring transforms driven with transform only (scaleX, scaleY matching the clipped window):
  // scaleX = 1 - (1 - q) * 2 * insetVw / 100 with insetVw = 8
  // scaleY = 1 - (1 - q) * 2 * insetSvh / 100 with insetSvh = 12
  const ringScaleX = useTransform(q, (v) => 1 - (1 - v) * ((2 * 8) / 100));
  const ringScaleY = useTransform(q, (v) => 1 - (1 - v) * ((2 * 12) / 100));

  const isReduced = Boolean(useReducedMotion()) || staticReveal;
  const isInView = useInView(stageRef, { amount: 0.5 });

  const [stageSize, setStageSize] = useState({ vw: 1280, vh: 720 });
  const [isMobile, setIsMobile] = useState(false);
  const [ambientOn, setAmbientOn] = useState<boolean>(true);
  const ambientOnRef = useRef<boolean>(true);

  // Toggle ambient and frame ring mount with ONE boolean state only when q crosses 0.999
  useMotionValueEvent(q, 'change', (v) => {
    const shouldBeOn = v < 0.999;
    if (shouldBeOn !== ambientOnRef.current) {
      ambientOnRef.current = shouldBeOn;
      setAmbientOn(shouldBeOn);
    }
  });

  useEffect(() => {
    if (q.get() >= 0.999) {
      ambientOnRef.current = false;
      setAmbientOn(false);
    }
  }, [q]);

  const showAmbient = isPinned && !isMobile && !isReduced && ambientOn;
  const [activeNodeId, setActiveNodeId] = useState<string>(() => initialNodeId || nodes[0]?.id || 'overview');
  const activeNodeIdRef = useRef<string>(activeNodeId);
  const [isTouring, setIsTouring] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isDebug, setIsDebug] = useState(debug);
  const [debugCoords, setDebugCoords] = useState<{ panX: number; panY: number } | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [isPulsing, setIsPulsing] = useState(false);

  const activeIndex = useMemo(() => Math.max(0, nodes.findIndex((n) => n.id === activeNodeId)), [nodes, activeNodeId]);
  const activeNode = nodes[activeIndex] ?? nodes[0];
  const lastIndexRef = useRef<number>(activeIndex);

  useEffect(() => {
    activeNodeIdRef.current = activeNodeId;
    lastIndexRef.current = activeIndex;
  }, [activeNodeId, activeIndex]);

  // Camera motion values
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scaleMV = useMotionValue(1);
  const vx = useVelocity(x);
  const vy = useVelocity(y);
  const speed = useTransform([vx, vy], (v: number[]) => Math.hypot(v[0] ?? 0, v[1] ?? 0));
  const pull = useTransform(speed, [0, 700], [1, 0.95]); // pull back slightly mid-flight
  const pullSpring = useSpring(pull, PULL_SPRING);
  const cameraScale = useTransform([scaleMV, pullSpring], (v: number[]) => (isReduced ? v[0] ?? 1 : (v[0] ?? 1) * (v[1] ?? 1)));
  const fogX = useTransform(x, (v) => (isReduced ? 0 : v * 0.85));
  const fogY = useTransform(y, (v) => (isReduced ? 0 : v * 0.85));
  const markerScale = useTransform(cameraScale, (s) => (s > 0 ? 1 / s : 1));

  /* debug flag from the URL */
  useEffect(() => {
    if (debug) setIsDebug(true);
    else if (new URLSearchParams(window.location.search).get('plantDebug') === '1') setIsDebug(true);
  }, [debug]);

  /* hint timers cleanup */
  useEffect(() => () => hintTimers.current.forEach(clearTimeout), []);

  /* first-view hint for free mode */
  useEffect(() => {
    if (isPinned || !isInView || isReduced || hintShown.current) return;
    hintShown.current = true;
    setShowHint(true);
    setIsPulsing(true);
    hintTimers.current = [setTimeout(() => setIsPulsing(false), 2400), setTimeout(() => setShowHint(false), 4000)];
  }, [isInView, isReduced, isPinned]);

  /* stage size and breakpoint */
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    let raf = 0;
    const ro = new ResizeObserver((entries) => {
      const r = entries[0]?.contentRect;
      if (!r) return;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setStageSize({ vw: r.width, vh: r.height }));
    });
    ro.observe(el);
    const mql = window.matchMedia(`(max-width: ${BREAKPOINT_MOBILE - 1}px)`);
    const sync = () => setIsMobile(mql.matches);
    sync();
    mql.addEventListener('change', sync);
    return () => {
      ro.disconnect();
      mql.removeEventListener('change', sync);
      cancelAnimationFrame(raf);
    };
  }, []);

  /* Programmatic scroll helper to target a specific stage center in pinned mode */
  const scrollToStage = useCallback(
    (targetIndex: number, instant: boolean = isReduced) => {
      const outerEl = outerRef.current;
      if (!outerEl || typeof window === 'undefined') return;
      const n = nodes.length;
      const clampedIndex = Math.max(0, Math.min(n - 1, targetIndex));
      const pTarget = clampedIndex === 0 ? 0.06 : 0.12 + ((clampedIndex - 0.5) / (n - 1)) * 0.88;
      const rect = outerEl.getBoundingClientRect();
      const outerTop = rect.top + window.scrollY;
      const outerHeight = outerEl.offsetHeight;
      const innerHeight = window.innerHeight;
      const targetY = outerTop + pTarget * Math.max(0, outerHeight - innerHeight);
      scrollToY(targetY, instant);
    },
    [nodes.length, isReduced]
  );

  /* stage from scroll in pinned mode */
  const n = nodes.length;
  useMotionValueEvent(p, 'change', (v) => {
    if (!isPinned) return;
    const index = v < 0.12 ? 0 : Math.min(n - 1, 1 + Math.floor(((v - 0.12) / 0.88) * (n - 1)));
    if (index !== lastIndexRef.current) {
      lastIndexRef.current = index;
      const targetNode = nodes[index];
      if (targetNode) {
        activeNodeIdRef.current = targetNode.id;
        setActiveNodeId(targetNode.id);
      }
    }

    // Hint fires the first time p > 0.1 in pinned mode
    if (!hintShown.current && v > 0.1 && !isReduced) {
      hintShown.current = true;
      setShowHint(true);
      setIsPulsing(true);
      hintTimers.current = [
        setTimeout(() => setIsPulsing(false), 2400),
        setTimeout(() => setShowHint(false), 4000),
      ];
    }
  });

  /* optional URL hash sync */
  useEffect(() => {
    if (!syncHash) return;
    const raw = window.location.hash.replace(/^#/, '').replace(/^stage-/, '');
    const hitIndex = nodes.findIndex((n) => n.id === raw);
    if (hitIndex !== -1) {
      if (isPinned) {
        const timer = setTimeout(() => {
          scrollToStage(hitIndex, true);
        }, 120);
        return () => clearTimeout(timer);
      } else {
        setActiveNodeId(nodes[hitIndex].id);
      }
    }
  }, [syncHash, nodes, isPinned, scrollToStage]);

  useEffect(() => {
    if (!syncHash) return;
    const h = `#stage-${activeNodeId}`;
    if (window.location.hash !== h) window.history.replaceState(null, '', h);
  }, [syncHash, activeNodeId]);

  /* selection helpers */
  const selectIndex = useCallback(
    (i: number) => {
      setIsTouring(false);
      if (isPinned) {
        scrollToStage(i);
      } else {
        const t = nodes[i];
        if (t) setActiveNodeId(t.id);
      }
    },
    [isPinned, scrollToStage, nodes]
  );

  const step = useCallback(
    (d: 1 | -1) => {
      setIsTouring(false);
      if (isPinned) {
        const curIdx = nodes.findIndex((n) => n.id === activeNodeIdRef.current);
        const targetIdx = (curIdx + d + nodes.length) % nodes.length;
        scrollToStage(targetIdx);
      } else {
        setActiveNodeId((cur) => {
          const i = nodes.findIndex((n) => n.id === cur);
          return nodes[(i + d + nodes.length) % nodes.length]?.id ?? cur;
        });
      }
    },
    [isPinned, nodes, scrollToStage]
  );

  const toggleTour = useCallback(() => setIsTouring((t) => !t), []);

  /* auto tour (only active in free mode) */
  useEffect(() => {
    if (isPinned || !isTouring || !isInView || isReduced) return;
    const id = setInterval(() => {
      if (document.hidden) return;
      setActiveNodeId((cur) => {
        const i = nodes.findIndex((n) => n.id === cur);
        return nodes[(i + 1) % nodes.length]?.id ?? cur;
      });
    }, TOUR_INTERVAL_MS);
    return () => clearInterval(id);
  }, [isPinned, isTouring, isInView, isReduced, nodes]);

  /* keep the active mobile pill centred */
  useEffect(() => {
    if (!isMobile) return;
    mobilePills.current[activeIndex]?.scrollIntoView({ inline: 'center', block: 'nearest', behavior: isReduced ? 'auto' : 'smooth' });
  }, [activeIndex, isMobile, isReduced]);

  /* camera: focal point -> translation, clamped so no canvas edge ever shows */
  const { vw, vh } = stageSize;
  const canvasW = Math.max(1.5 * vw, 1.5 * vh * imageAspect);
  const canvasH = canvasW / imageAspect;

  useEffect(() => {
    if (!activeNode) return;
    const s = isMobile ? Math.max(1, 1 + (activeNode.scale - 1) * MOBILE_ZOOM_FACTOR) : Math.max(1, activeNode.scale);
    const u = (activeNode.panX / 100 - 0.5) * canvasW;
    const v = (activeNode.panY / 100 - 0.5) * canvasH;
    const a = isMobile ? ANCHORS.MOBILE : ANCHORS.DESKTOP;
    const s2 = s * 0.95; // safety for the mid-flight pull-back
    const maxX = Math.max(0, (s2 * canvasW - vw) / 2);
    const maxY = Math.max(0, (s2 * canvasH - vh) / 2);
    const tx = Math.min(maxX, Math.max(-maxX, a.ax * vw - s * u));
    const ty = Math.min(maxY, Math.max(-maxY, a.ay * vh - s * v));

    if (isReduced) {
      animate(x, tx, { duration: 0 });
      animate(y, ty, { duration: 0 });
      animate(scaleMV, s, { duration: 0 });
      return;
    }
    const run = ++camRun.current;
    setIsMoving(true);
    const ax = animate(x, tx, { type: 'spring', ...SPRING_PAN });
    const ay = animate(y, ty, { type: 'spring', ...SPRING_PAN });
    const as = animate(scaleMV, s, { type: 'spring', ...SPRING_SCALE });
    Promise.all([ax, ay, as]).then(() => {
      if (camRun.current === run) setIsMoving(false);
    });
    return () => {
      ax.stop();
      ay.stop();
      as.stop();
    };
  }, [activeNode, canvasW, canvasH, vw, vh, isMobile, isReduced, x, y, scaleMV]);

  /* debug coordinate picker */
  const handleStageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDebug || !canvasRef.current) return;
    const r = canvasRef.current.getBoundingClientRect();
    const clamp = (val: number) => Math.max(0, Math.min(100, Number(val.toFixed(1))));
    const panX = clamp(((e.clientX - r.left) / r.width) * 100);
    const panY = clamp(((e.clientY - r.top) / r.height) * 100);
    setDebugCoords({ panX, panY });
    console.log(`[PlantAnatomy debug] panX: ${panX}, panY: ${panY}`);
  };

  if (!activeNode) return null;

  const hintText = isPinned ? 'Scroll or pick a stage' : 'Pick a stage or press Fly through';

  return (
    <div
      ref={outerRef}
      id="plant-anatomy"
      className={`${Z.plant} relative bg-slate-50 rounded-t-[40px] -mt-10 shadow-[0_-20px_60px_rgba(0,0,60,0.25)] ${className}`}
      style={isPinned ? { height: `calc(100svh + ${40 + nodes.length * 35}svh)` } : undefined}
    >
      <section
        data-tone="dark"
        aria-label="Plant anatomy"
        className={`h-[100svh] min-h-[640px] w-full select-none overflow-hidden bg-[#0B1245] rounded-t-[40px] relative isolate text-white ${
          isPinned ? 'sticky top-0' : ''
        }`}
      >
        {/* Ambient Layer: calm, layered aerial echo around the unexpanded iris window */}
        {showAmbient && (
          <motion.div
            aria-hidden="true"
            style={{ opacity: ambientOpacity }}
            className="pointer-events-none absolute inset-0 z-0 overflow-hidden will-change-[opacity]"
          >
            {!imageError && (
              <Image
                src={imageSrc}
                alt=""
                fill
                quality={40}
                sizes="40vw"
                draggable={false}
                className="scale-110 object-cover blur-2xl saturate-[0.35] brightness-[0.6]"
              />
            )}
            <div className="absolute inset-0 bg-[#0B1245]/[0.82]" />
            <div className="absolute inset-0 [background:radial-gradient(ellipse_at_50%_55%,rgba(0,0,128,0.55),transparent_65%)]" />
            <div className="absolute inset-0 [background:radial-gradient(ellipse_at_center,transparent_45%,rgba(10,15,31,0.85)_100%)]" />
          </motion.div>
        )}

        {/* Frame Ring: elevated border and glow matching the expanding iris window */}
        {showAmbient && (
          <motion.div
            aria-hidden="true"
            style={{
              scaleX: ringScaleX,
              scaleY: ringScaleY,
              opacity: ambientOpacity,
            }}
            className="pointer-events-none absolute inset-0 z-[1] origin-center rounded-[32px] border border-[#F4D5AB]/35 shadow-[0_30px_80px_rgba(0,0,40,0.55),0_0_120px_rgba(0,0,128,0.45)] will-change-transform"
          />
        )}

        {/* Stage & HUD Iris container: clips like a window in pinned mode */}
        <motion.div
          style={isPinned ? { clipPath: irisClipPath } : undefined}
          className="absolute inset-0 z-[2] overflow-hidden"
        >
          {/* Stage: the drone canvas */}
          <motion.div
            ref={stageRef}
            onClick={handleStageClick}
            onPanEnd={(_, info) => {
              if (isDebug) return;
              const { offset, velocity } = info;
              const swipe = (Math.abs(offset.x) > 60 && Math.abs(offset.x) > 1.5 * Math.abs(offset.y)) || Math.abs(velocity.x) > 500;
              if (swipe) step(offset.x < 0 || velocity.x < -500 ? 1 : -1);
            }}
            className={`absolute inset-0 touch-pan-y overflow-hidden ${isDebug ? 'cursor-crosshair' : ''}`}
          >
            <motion.div
              ref={canvasRef}
              style={{ width: canvasW, height: canvasH, marginLeft: -canvasW / 2, marginTop: -canvasH / 2, x, y, scale: cameraScale }}
              className={`absolute left-1/2 top-1/2 origin-center transform-gpu ${isMoving ? 'will-change-transform' : ''}`}
            >
              {imageError ? (
                <div className="absolute inset-0 grid place-items-center bg-[linear-gradient(160deg,#1c2a6b,#0A0F1F)] bg-[linear-gradient(rgba(255,255,255,.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.06)_1px,transparent_1px)] bg-[size:48px_48px] p-8 text-center">
                  <span className="font-mono text-sm text-[#F4D5AB]">Aerial placeholder: {imageSrc}</span>
                </div>
              ) : (
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  priority
                  sizes="(min-width: 768px) 150vw, 280vw"
                  draggable={false}
                  placeholder={blurDataURL ? 'blur' : 'empty'}
                  blurDataURL={blurDataURL}
                  onError={() => setImageError(true)}
                  className="select-none object-cover"
                />
              )}

              {nodes.map((n) => {
                if (n.id === 'overview') return null;
                const on = n.id === activeNode.id;
                return (
                  <motion.button
                    key={n.id}
                    type="button"
                    tabIndex={-1}
                    aria-hidden="true"
                    onClick={(e) => {
                      if (isDebug) return e.stopPropagation();
                      selectIndex(nodes.indexOf(n));
                    }}
                    style={{ left: `${n.panX}%`, top: `${n.panY}%`, scale: markerScale }}
                    className={`group absolute flex size-5 -translate-x-1/2 -translate-y-1/2 items-center justify-center md:size-7 ${isDebug ? 'pointer-events-none' : 'cursor-pointer'}`}
                  >
                    {on ? (
                      <>
                        <span className="absolute inset-0 rounded-full bg-[#F4D5AB]/20" />
                        <span className="absolute inset-0 rounded-full border-2 border-[#F4D5AB]" />
                        <span className="size-2.5 rounded-full bg-[#F4D5AB] shadow-md md:size-3.5" />
                      </>
                    ) : (
                      <span className="flex size-4 items-center justify-center rounded-full border border-white/70 bg-black/40 transition-colors group-hover:border-[#F4D5AB] md:size-5">
                        <span className="size-1.5 rounded-full bg-white/70 transition-colors group-hover:bg-[#F4D5AB] md:size-2" />
                      </span>
                    )}
                  </motion.button>
                );
              })}

              {isDebug && debugCoords && (
                <motion.div
                  style={{ left: `${debugCoords.panX}%`, top: `${debugCoords.panY}%`, scale: markerScale }}
                  className="pointer-events-none absolute z-50 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center"
                >
                  <div className="size-4 rounded-full border-2 border-red-500 bg-red-500/30" />
                  <div className="absolute h-px w-8 bg-red-400" />
                  <div className="absolute h-8 w-px bg-red-400" />
                </motion.div>
              )}
            </motion.div>

            {/* Parallax fog, scrims, vignette */}
            <motion.div aria-hidden="true" style={{ x: fogX, y: fogY }} className="pointer-events-none absolute -inset-[10%] z-10 bg-gradient-to-tr from-[#F4D5AB]/[0.06] to-[#0B1245]/20" />
            <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-[45%] bg-gradient-to-r from-[#0A0F1F]/70 via-[#0A0F1F]/15 to-transparent md:block" />
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[60%] bg-gradient-to-t from-[#0A0F1F]/90 via-[#0A0F1F]/30 to-transparent md:hidden" />
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(10,15,31,0.6)_100%)]" />
            {/* Bottom handoff band: ends on flat Midnight #0B1245 for the last 12svh */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[12svh] bg-gradient-to-t from-[#0B1245] to-transparent" />
          </motion.div>

          {isDebug && (
            <div className="pointer-events-none absolute left-4 top-4 z-40 rounded-lg border border-[#F4D5AB] bg-black/80 px-3.5 py-2 font-mono text-xs text-[#F4D5AB]">
              <div className="font-bold">Plant debug mode</div>
              <div className="mt-0.5 text-white/80">{debugCoords ? `panX: ${debugCoords.panX}, panY: ${debugCoords.panY}` : 'Click the stage to read panX / panY'}</div>
            </div>
          )}

          {/* HUD */}
          <motion.div
            style={isPinned ? { opacity: hudOpacity } : undefined}
            className="pointer-events-none absolute inset-0 z-20"
          >
            {/* Desktop HUD */}
            <div className="hidden h-full grid-cols-[minmax(240px,300px)_1fr_minmax(340px,400px)] items-center gap-8 p-10 md:grid lg:p-14">
              <div className="pointer-events-auto flex h-full flex-col justify-between py-2">
                <div>
                  <span className="font-mono text-sm text-[#F4D5AB]">Plant anatomy</span>
                  <h2 className="mb-6 mt-1 font-display text-2xl font-bold tracking-tight text-white lg:text-3xl">From limestone to bag</h2>
                  <PillList nodes={nodes} activeIndex={activeIndex} variant="desktop" refs={desktopPills} onSelect={selectIndex} />
                  <AnimatePresence>
                    {showHint && !isReduced && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: DUR.fast }}
                        className="pointer-events-none mt-4 rounded-full border border-[#F4D5AB]/30 bg-[#0A0F1F]/70 px-3 py-1.5 text-center font-mono text-xs text-[#F4D5AB] shadow-lg backdrop-blur-md"
                      >
                        {hintText}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                {!isPinned && !isReduced && (
                  <div className="border-t border-white/10 pt-6">
                    <TourButton on={isTouring} onToggle={toggleTour} />
                  </div>
                )}
              </div>

              <div aria-hidden="true" />

              <div className="flex h-full items-center justify-end">
                <div id="plant-card-desktop" role="tabpanel" aria-labelledby={`tab-desktop-${activeNode.id}`} aria-live="polite" className="pointer-events-auto w-full">
                  <AnimatePresence mode="wait" initial={false}>
                    <SpecCard key={activeNode.id} node={activeNode} index={activeIndex} total={nodes.length} variant="desktop" reduced={isReduced} onStep={step} />
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Mobile HUD */}
            <div className="flex h-full flex-col justify-end p-4 pb-[max(1rem,env(safe-area-inset-bottom))] md:hidden">
              <div className="pointer-events-auto absolute left-4 right-4 top-4 z-20 flex items-center justify-between">
                <div>
                  <span className="font-mono text-xs text-[#F4D5AB]">Plant anatomy</span>
                  <h2 className="font-display text-lg font-bold tracking-tight text-white">From limestone to bag</h2>
                </div>
                {!isPinned && !isReduced && <TourButton on={isTouring} onToggle={toggleTour} compact />}
              </div>

              <div id="plant-card-mobile" role="tabpanel" aria-labelledby={`tab-mobile-${activeNode.id}`} aria-live="polite" className="pointer-events-auto mb-3 max-h-[42svh] w-full overflow-y-auto">
                <AnimatePresence mode="wait" initial={false}>
                  <SpecCard key={activeNode.id} node={activeNode} index={activeIndex} total={nodes.length} variant="mobile" reduced={isReduced} onStep={step} />
                </AnimatePresence>
              </div>

              <AnimatePresence>
                {showHint && !isReduced && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: DUR.fast }}
                    className="pointer-events-none mb-2 self-center rounded-full border border-[#F4D5AB]/30 bg-[#0A0F1F]/75 px-3 py-1 font-mono text-xs text-[#F4D5AB] shadow-md backdrop-blur-md"
                  >
                    {hintText}
                  </motion.div>
                )}
              </AnimatePresence>

              <PillList nodes={nodes} activeIndex={activeIndex} variant="mobile" refs={mobilePills} onSelect={selectIndex} />
            </div>
          </motion.div>

          {showMockNotice && (
            <motion.div
              style={isPinned ? { opacity: hudOpacity } : undefined}
              className="pointer-events-none absolute bottom-4 right-4 z-30 md:bottom-6 md:right-8"
            >
              <span className="inline-block rounded-full border border-white/10 bg-black/40 px-3 py-1 font-mono text-[11px] text-white/80 backdrop-blur-sm">
                Illustrative image, sample figures
              </span>
            </motion.div>
          )}
        </motion.div>
      </section>
    </div>
  );
}
