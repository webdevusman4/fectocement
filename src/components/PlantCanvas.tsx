"use client";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Global canvas. Sticky + negative bottom margin means it pins to the viewport
 * without pushing content down. Needs: parent is `relative isolate`, and NO
 * ancestor with overflow-hidden (use overflow-x-clip if you must).
 */
export default function PlantCanvas() {
  const { scrollY } = useScroll();
  // Frost arrives between ~5% and ~60% of one viewport of scroll,
  // i.e. while the hero image is lifting off the background.
  const frost = useTransform(scrollY, (y) => {
    const vh = typeof window === "undefined" ? 800 : window.innerHeight;
    return Math.min(1, Math.max(0, (y - vh * 0.05) / (vh * 0.55)));
  });

  return (
    <div aria-hidden className="sticky top-0 -z-20 -mb-[100svh] h-svh w-full overflow-hidden">
      {/* TODO: replace with the real Sangjani plant photo */}
      <Image src="/images/sangjani-plant.jpg" alt="" fill priority sizes="100vw" className="object-cover" />
      <motion.div style={{ opacity: frost }} className="absolute inset-0 bg-white/90 backdrop-blur-xl" />
    </div>
  );
}
