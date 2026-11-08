"use client";

import React, { useEffect, useRef } from "react";
import { animate, motion, useInView, useMotionValue, useTransform } from "framer-motion";

function Counter({
  to,
  decimals = 0,
  group = true,
  trigger = false,
}: {
  to: number;
  decimals?: number;
  group?: boolean;
  trigger?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const mv = useMotionValue(0);
  const text = useTransform(mv, (v) =>
    v.toLocaleString("en", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
      useGrouping: group,
    })
  );

  useEffect(() => {
    if (!trigger && !inView) return;
    const c = animate(mv, to, { duration: 1.4, ease: "easeOut" });
    return () => c.stop();
  }, [trigger, inView, to, mv]);

  return <motion.span ref={ref}>{text}</motion.span>;
}

const STATS = [
  {
    to: 0.8,
    decimals: 1,
    unit: "million tons / year",
    label: "Installed capacity at Sangjani",
    cls: "col-span-2",
  },
  {
    to: 3000,
    unit: "tons / day",
    label: "Dry-process clinker line",
    cls: "",
  },
  {
    to: 1981,
    group: false,
    unit: "",
    label: "Fecto Cement Limited established",
    cls: "",
  },
];

export interface StatsBentoProps {
  className?: string;
  trigger?: boolean;
  standalone?: boolean;
}

export default function StatsBento({
  className = "",
  trigger = false,
  standalone = false,
}: StatsBentoProps) {
  const wrapperClass = standalone
    ? `relative z-10 mx-auto -mt-20 max-w-7xl p-8 ${className}`
    : `relative z-10 mx-auto max-w-7xl w-full ${className}`;

  return (
    <section data-tone="light" className={wrapperClass}>
      <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5 lg:grid-cols-4">
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-5%" }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className={`glass-arctic rounded-2xl sm:rounded-3xl p-3 sm:p-4 lg:p-5 ${s.cls}`}
          >
            <p className="flex items-baseline gap-1.5 sm:gap-2.5">
              <span className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#000080]">
                <Counter to={s.to} decimals={s.decimals} group={s.group} trigger={trigger} />
              </span>
              {s.unit && (
                <span className="text-xs sm:text-sm lg:text-base font-semibold text-slate-700">
                  {s.unit}
                </span>
              )}
            </p>
            <p className="mt-1 text-[11px] sm:text-xs lg:text-sm text-slate-600 line-clamp-1 sm:line-clamp-2">
              {s.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
