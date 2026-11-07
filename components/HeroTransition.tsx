"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import StatsBento from "@/components/StatsBento";

const IMG = "/images/sangjani-plant.jpg";
const VID = "/media/sangjani-plant.mp4";

export interface HeroTransitionProps {
  className?: string;
}

/**
 * HeroTransition Component
 * 
 * Features:
 * - Pinned sticky viewport stage (sticky top-0 h-svh)
 * - Stage 1 (0 to 30% scroll): Hero full-bleed image morphs into the video card on the right; "A Name of Faith" fades.
 * - Stage 2 (25% to 55% scroll): Intro text slides in on the left; video starts playing.
 * - Stage 3 (45% to 68% scroll): Stats Bento slides up at the bottom; counter animations trigger.
 * - Stage 4 (68% to 85% scroll): Screen freezes/pins completely ("stops scrolling") so user absorbs the full view.
 * - Stage 5 (85% to 100% scroll): The following section (FounderLegacy) slides over the pinned stage as a physical curtain.
 */
export default function HeroTransition({ className = "" }: HeroTransitionProps) {
  const ref = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [bentoActive, setBentoActive] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // q: 0 = full-bleed hero, 1 = rounded video card on right
  const q = useTransform(scrollYProgress, [0, 0.22], [0, 1]);

  // Video card frame dimensions & positions
  const width = useTransform(q, [0, 1], ["100%", isMobile ? "92%" : "48%"]);
  const height = useTransform(q, [0, 1], ["100%", isMobile ? "27%" : "48%"]);
  const right = useTransform(q, [0, 1], ["0%", isMobile ? "4%" : "5%"]);
  const top = useTransform(q, [0, 1], ["0%", isMobile ? "11%" : "14.5%"]);
  const radius = useTransform(q, [0, 1], [0, isMobile ? 20 : 28]);

  const videoOpacity = useTransform(q, [0.7, 1], [0, 1]);
  const heroTextOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  // Intro text on the left
  const introOpacity = useTransform(scrollYProgress, [0.16, 0.30], [0, 1]);
  const introX = useTransform(scrollYProgress, [0.16, 0.30], [-36, 0]);

  // Stats Bento at the bottom
  const bentoOpacity = useTransform(scrollYProgress, [0.28, 0.42], [0, 1]);
  const bentoY = useTransform(scrollYProgress, [0.28, 0.42], [36, 0]);

  // Play video when card shrinks and pause if user scrolls back
  useMotionValueEvent(q, "change", (v) => {
    const el = video.current;
    if (!el) return;
    if (v > 0.6 && el.paused) el.play().catch(() => {});
    if (v < 0.3 && !el.paused) el.pause();
  });

  // Trigger counters once bento starts entering
  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (progress >= 0.28 && !bentoActive) {
      setBentoActive(true);
    }
  });

  return (
    <section ref={ref} className={`relative h-[340vh] ${className}`}>
      <div className="sticky top-0 h-svh w-full overflow-hidden">
        
        {/* The Media Frame: Photo crossfades to Video Card */}
        <motion.div
          style={{ width, height, right, top, borderRadius: radius }}
          className="absolute z-10 overflow-hidden shadow-2xl shadow-slate-900/30"
        >
          <Image
            src={IMG}
            alt="Fecto Cement plant at Sangjani"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <motion.video
            ref={video}
            style={{ opacity: videoOpacity }}
            className="absolute inset-0 h-full w-full object-cover"
            src={VID}
            poster={IMG}
            muted
            loop
            playsInline
            preload="metadata"
          />
          <motion.div
            style={{ opacity: heroTextOpacity }}
            className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent"
          />
        </motion.div>

        {/* Full-bleed Opening Headline (fades as frame shrinks) */}
        <motion.div
          style={{ opacity: heroTextOpacity }}
          className="absolute bottom-[14vh] left-[6vw] z-20 text-white pointer-events-none"
        >
          <h1 className="font-display text-5xl font-bold leading-[0.92] tracking-tight sm:text-6xl md:text-8xl">
            A Name<br />of Faith.
          </h1>
        </motion.div>

        {/* Intro Text Revealed on Left */}
        <div className="absolute left-[6vw] top-[40vh] lg:top-[16.5vh] z-20 w-[88%] lg:w-[40%] pointer-events-auto">
          <motion.div style={{ opacity: introOpacity, x: introX }}>
            <span className="inline-block px-3 py-1 rounded-full bg-slate-900/5 backdrop-blur-md border border-slate-900/10 text-xs font-semibold uppercase tracking-wider text-[#000080] mb-2 sm:mb-3">
              Sangjani Manufacturing Complex
            </span>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight tracking-tight text-slate-900">
              Made at Sangjani since 1981.
            </h2>
            <p className="mt-2.5 sm:mt-3.5 max-w-md text-xs sm:text-sm lg:text-base text-slate-700 leading-relaxed">
              High-performance cement for the dams, motorways, and towers Pakistan is built on.
            </p>
            <a
              href="#products"
              className="mt-3.5 sm:mt-5 inline-block rounded-full bg-[#F4D5AB] px-5 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-[#000080] hover:bg-[#edd0a2] transition-colors shadow-sm"
            >
              Explore products &rarr;
            </a>
          </motion.div>
        </div>

        {/* Docked Stats Bento at the Bottom of Sticky Viewport */}
        <motion.div
          style={{ opacity: bentoOpacity, y: bentoY }}
          className="absolute left-[4vw] lg:left-[6vw] right-[4vw] lg:right-[5vw] top-[64vh] lg:top-[66vh] z-20"
        >
          <StatsBento trigger={bentoActive} standalone={false} />
        </motion.div>

      </div>
    </section>
  );
}
