'use client';

/**
 * CementBag3D — a 50 kg valve bag built as a CSS 3D box from the flat bag artwork.
 *
 * Front and back faces use the printed artwork (cement bags carry the same print on both faces);
 * the side gussets and caps are kraft paper with the brand printed along the gusset. The box turns
 * slowly on its own, pauses on hover and while off-screen, and stands still facing front when
 * `rotate` is false (reduced motion, capture mode). Shading follows the angle so the turn reads as 3D.
 */
import React, { useEffect, useRef, useState } from 'react';
import { animate, motion, useInView, useMotionValue, useTransform, type MotionValue } from 'framer-motion';

/** Opaque bag body inside the 1024 x 1536 artwork (px), measured from /images/bag-opc.png */
const ART = { w: 1024, h: 1536, x0: 60, y0: 135, x1: 965, y1: 1462 };
const BODY_W = ART.x1 - ART.x0;
const BODY_H = ART.y1 - ART.y0;
const BODY_ASPECT = BODY_W / BODY_H;
const DEPTH_RATIO = 0.24; // gusset depth / bag width (50 kg valve bag is roughly 50 x 70 x 12 cm)
const TURN_SECONDS = 18; // one full turn
const TILT_DEG = -7; // look slightly down onto the bag so the top cap reads
const LIGHT_DEG = -25; // key light from the front-left
const KRAFT = '#E8C691';
const KRAFT_SHADE = '#C19558';
const PRINT_NAVY = '#1D3B8F';

const ART_BACKGROUND = {
  size: `${(ART.w / BODY_W) * 100}% ${(ART.h / BODY_H) * 100}%`,
  position: `${(ART.x0 / (ART.w - BODY_W)) * 100}% ${(ART.y0 / (ART.h - BODY_H)) * 100}%`,
};

/** Dark overlay opacity for a vertical face whose own rotateY is `normal` degrees. */
function useFaceShade(angle: MotionValue<number>, normal: number, strength = 0.55) {
  return useTransform(angle, (a) => {
    const lit = Math.max(0, Math.cos(((a + normal + LIGHT_DEG) * Math.PI) / 180));
    return strength * (1 - lit);
  });
}

export interface CementBag3DProps {
  /** Flat bag artwork (1024 x 1536 PNG, body within ART) */
  src: string;
  /** Accessible name for the visual */
  label: string;
  /** Box the bag and its floor shadow fit inside (px) */
  width: number;
  height: number;
  rotate?: boolean;
  onError?: () => void;
  className?: string;
}

export default function CementBag3D({ src, label, width, height, rotate = true, onError, className = '' }: CementBag3DProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: '160px' });
  const [hovered, setHovered] = useState(false);
  const angle = useMotionValue(0);

  // Bag size: fit the body aspect into the box, leaving room below for the floor shadow
  let faceH = Math.round(height * 0.86);
  let faceW = Math.round(faceH * BODY_ASPECT);
  if (faceW > width * 0.92) {
    faceW = Math.round(width * 0.92);
    faceH = Math.round(faceW / BODY_ASPECT);
  }
  const depth = Math.round(faceW * DEPTH_RATIO);

  // Continuous turn from wherever the bag is, so pausing and resuming never jumps
  useEffect(() => {
    if (!rotate) {
      angle.set(0);
      return;
    }
    if (!inView || hovered) return;
    const from = angle.get() % 360;
    const controls = animate(angle, [from, from + 360], { duration: TURN_SECONDS, ease: 'linear', repeat: Infinity });
    return () => controls.stop();
  }, [rotate, inView, hovered, angle]);

  // Report a missing artwork so the caller can show its fallback
  const onErrorRef = useRef(onError);
  onErrorRef.current = onError;
  useEffect(() => {
    const img = new window.Image();
    img.onerror = () => onErrorRef.current?.();
    img.src = src;
  }, [src]);

  const frontShade = useFaceShade(angle, 0);
  const rightShade = useFaceShade(angle, 90, 0.65);
  const backShade = useFaceShade(angle, 180);
  const leftShade = useFaceShade(angle, -90, 0.65);
  // Contact shadow follows the bag's projected width
  const shadowScale = useTransform(angle, (a) => {
    const r = (a * Math.PI) / 180;
    return (Math.abs(faceW * Math.cos(r)) + Math.abs(depth * Math.sin(r))) / faceW;
  });

  const face = (w: number, h: number, transform: string): React.CSSProperties => ({
    position: 'absolute',
    left: '50%',
    top: '50%',
    width: w,
    height: h,
    marginLeft: -w / 2,
    marginTop: -h / 2,
    transform,
    backfaceVisibility: 'hidden',
    WebkitBackfaceVisibility: 'hidden',
  });

  const printFace = (transform: string, shade: MotionValue<number>) => (
    <div
      style={{
        ...face(faceW, faceH, transform),
        borderRadius: Math.round(faceW * 0.035),
        background: `${KRAFT} url("${src}") ${ART_BACKGROUND.position} / ${ART_BACKGROUND.size} no-repeat`,
        overflow: 'hidden',
      }}
    >
      <motion.div className="absolute inset-0 bg-black" style={{ opacity: shade }} />
    </div>
  );

  const gussetFace = (transform: string, shade: MotionValue<number>) => (
    <div
      style={{
        ...face(depth, faceH, transform),
        background: `linear-gradient(to right, ${KRAFT_SHADE}, ${KRAFT} 28%, ${KRAFT} 72%, ${KRAFT_SHADE})`,
        overflow: 'hidden',
      }}
      className="flex items-center justify-center"
    >
      <span
        style={{ writingMode: 'vertical-rl', color: PRINT_NAVY, fontSize: Math.max(9, Math.round(depth * 0.42)) }}
        className="select-none font-display font-black uppercase tracking-[0.18em]"
      >
        Fecto Cement
      </span>
      <motion.div className="absolute inset-0 bg-black" style={{ opacity: shade }} />
    </div>
  );

  const capFace = (transform: string, tone: string) => (
    <div
      style={{
        ...face(faceW, depth, transform),
        background: `linear-gradient(to bottom, ${tone}, ${KRAFT_SHADE})`,
        borderRadius: 4,
      }}
    />
  );

  return (
    <div
      ref={ref}
      role="img"
      aria-label={label}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative ${className}`}
      style={{ width, height, perspective: 1100 }}
    >
      {/* Floor: turntable ring and a contact shadow that tracks the projected width */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 rounded-[50%] border border-dashed border-[#F4D5AB]/30"
        style={{ width: faceW * 1.25, height: depth * 0.9, top: faceH - depth * 0.45, marginLeft: (-faceW * 1.25) / 2 }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 rounded-[50%] bg-black/80 blur-xl"
        style={{ width: faceW * 0.95, height: depth * 0.55, top: faceH - depth * 0.3, marginLeft: (-faceW * 0.95) / 2, scaleX: shadowScale }}
      />

      {/* The box: a slight downward tilt outside, the turn inside */}
      <div
        className="absolute left-1/2 top-0"
        style={{ width: faceW, height: faceH, marginLeft: -faceW / 2, transformStyle: 'preserve-3d', transform: `rotateX(${TILT_DEG}deg)` }}
      >
        <motion.div
          className="absolute inset-0 will-change-transform"
          style={{ transformStyle: 'preserve-3d', rotateY: angle }}
        >
          {printFace(`translateZ(${depth / 2}px)`, frontShade)}
          {gussetFace(`rotateY(90deg) translateZ(${faceW / 2}px)`, rightShade)}
          {printFace(`rotateY(180deg) translateZ(${depth / 2}px)`, backShade)}
          {gussetFace(`rotateY(-90deg) translateZ(${faceW / 2}px)`, leftShade)}
          {capFace(`rotateX(90deg) translateZ(${faceH / 2}px)`, '#D9B57E')}
          {capFace(`rotateX(-90deg) translateZ(${faceH / 2}px)`, KRAFT_SHADE)}
        </motion.div>
      </div>
    </div>
  );
}
