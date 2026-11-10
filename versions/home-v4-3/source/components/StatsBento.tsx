'use client';

import React, { useEffect, useRef } from 'react';
import { animate, motion, useInView, useMotionValue, useTransform } from 'framer-motion';
import { useMotionPrefs } from '../hooks/useMotionPrefs';
import { EASE, DUR } from '../lib/motion';

export type StatKey = 'capacity' | 'daily' | 'founded';

function Counter({
  to,
  decimals = 0,
  group = true,
  trigger = false,
  reduced = false,
  staticReveal = false,
}: {
  to: number;
  decimals?: number;
  group?: boolean;
  trigger?: boolean;
  reduced?: boolean;
  staticReveal?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  const staticMode = reduced || staticReveal;
  const mv = useMotionValue(staticMode ? to : 0);
  const text = useTransform(mv, (v) =>
    v.toLocaleString('en', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
      useGrouping: group,
    })
  );

  useEffect(() => {
    if (staticMode) {
      mv.set(to);
      return;
    }
    if (!trigger && !inView) return;
    const controls = animate(mv, to, { duration: DUR.slow, ease: EASE });
    return () => controls.stop();
  }, [trigger, inView, to, mv, staticMode]);

  return <motion.span ref={ref}>{text}</motion.span>;
}

const STATS: Array<{
  key: StatKey;
  to: number;
  decimals?: number;
  group?: boolean;
  unit: string;
  label: string;
  cls: string;
}> = [
  {
    key: 'capacity',
    to: 0.8,
    decimals: 1,
    unit: 'million tons / year',
    label: 'Installed capacity at Sangjani',
    cls: 'col-span-2',
  },
  {
    key: 'daily',
    to: 3000,
    unit: 'tons / day',
    label: 'Dry-process clinker line',
    cls: '',
  },
  {
    key: 'founded',
    to: 1981,
    group: false,
    unit: '',
    label: 'Fecto Cement Limited established',
    cls: '',
  },
];

export interface StatsBentoProps {
  className?: string;
  trigger?: boolean;
  standalone?: boolean;
  activeHighlight?: StatKey;
  staticReveal?: boolean;
}

export default function StatsBento({
  className = '',
  trigger = false,
  standalone = false,
  activeHighlight,
  staticReveal = false,
}: StatsBentoProps) {
  const { simple: prefersSimple } = useMotionPrefs();
  const simple = prefersSimple || staticReveal;

  const wrapperClass = standalone
    ? `relative z-10 mx-auto -mt-20 max-w-[1280px] p-8 ${className}`
    : `relative z-10 w-full ${className}`;

  return (
    <section data-tone="light" className={wrapperClass} aria-label="Illustrative operating figures">
      <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5 lg:grid-cols-4">
        {STATS.map((s, i) => {
          const isHighlighted = activeHighlight === s.key;
          const isFirst = i === 0;

          return (
            <motion.div
              key={s.label}
              data-v43-reveal
              initial={simple ? false : { opacity: 0, y: 16 }}
              whileInView={simple ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-5%' }}
              transition={{ duration: DUR.base, ease: EASE, delay: i * 0.08 }}
              className={`glass-arctic rounded-2xl p-3 transition-colors duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)] sm:rounded-3xl sm:p-4 lg:p-5 ${
                isFirst ? '-ml-3 sm:-ml-4 lg:-ml-5' : ''
              } ${
                isHighlighted
                  ? 'ring-1 ring-[#F4D5AB]/70 shadow-[0_0_40px_rgba(244,213,171,0.25)]'
                  : ''
              } ${s.cls}`}
            >
              <p className="flex items-baseline gap-1.5 sm:gap-2.5">
                <span className="font-display text-2xl font-bold tracking-tight text-[#000080] sm:text-3xl lg:text-4xl">
                  <Counter
                    to={s.to}
                    decimals={s.decimals}
                    group={s.group}
                    trigger={trigger}
                    reduced={simple}
                    staticReveal={staticReveal}
                  />
                </span>
                {s.unit && (
                  <span className="text-xs font-semibold text-slate-700 sm:text-sm lg:text-base">
                    {s.unit}
                  </span>
                )}
              </p>
              <p className="mt-1 text-[11px] text-slate-600 line-clamp-1 sm:text-xs sm:line-clamp-2 lg:text-sm">
                {s.label}
              </p>
            </motion.div>
          );
        })}
      </div>
      <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.14em] text-slate-500">
        Sample figures · not certified
      </p>
    </section>
  );
}
