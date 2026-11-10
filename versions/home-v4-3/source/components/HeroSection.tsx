'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useMotionValue, animate, useReducedMotion, useInView } from 'framer-motion';
import { Play, Pause, ChevronLeft, ChevronRight } from 'lucide-react';
import { EASE, DUR } from '../lib/motion';

export type StatKey = 'capacity' | 'daily' | 'founded';

export interface HeroSlide {
  id: string;
  eyebrow: string;
  lines: string[];
  sub: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
  media: {
    type: 'image' | 'video';
    src: string;
    poster?: string;
    alt: string;
    position?: string;
    mobilePosition?: string;
  };
  foreground?: {
    src: string;
    alt: string;
    name?: string;
    meta?: string;
  };
  highlight?: StatKey;
  illustrative?: boolean;
}

const PORTRAIT_CARD_WIDTH = 'min(320px, 40.5svh)';
const PORTRAIT_CARD_SIZE: React.CSSProperties = {
  width: PORTRAIT_CARD_WIDTH,
  height: 'min(430px, 54svh)',
  maxWidth: '100%',
};

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'future',
    eyebrow: 'Since 1981',
    lines: ['Building', "Pakistan's", 'Future.'],
    sub: 'High-performance cement for the towers, motorways and dams this country is built on.',
    primary: { label: 'Request a bulk quote', href: '/request-quote' },
    secondary: { label: 'Explore products', href: '#products' },
    media: {
      type: 'image',
      src: '/herobg.jpg',
      alt: 'Fecto Cement Heavy Infrastructure Construction',
      position: 'center center',
      mobilePosition: 'center center',
    },
    highlight: 'capacity',
  },
  {
    id: 'plant',
    eyebrow: 'Inside Sangjani',
    lines: ['Where limestone', 'becomes the', 'skyline.'],
    sub: 'A dry-process line shown here with a sample 3,000 tons/day clinker figure, from limestone to bag.',
    primary: { label: 'Explore the plant', href: '#plant-anatomy' },
    secondary: { label: 'Request a bulk quote', href: '/request-quote' },
    media: {
      type: 'image',
      src: '/images/sangjani-aerial.jpg',
      alt: 'Sangjani Industrial Cement Plant Aerial Tour',
      position: 'center center',
      mobilePosition: 'center center',
    },
    highlight: 'daily',
  },
  {
    id: 'power',
    eyebrow: 'Energy',
    lines: ['Power from', 'the plant', 'itself.'],
    sub: 'Kiln waste heat and on-site solar are shown here as an illustrative lower-carbon power mix.',
    primary: { label: 'See our sustainability', href: '#sustainability' },
    // Removed non-existent secondary button (/esg target does not exist)
    media: {
      type: 'image',
      src: '/images/hero-solar.jpg',
      alt: 'Clean Energy and Waste Heat Recovery at Fecto Plant',
      position: 'center center',
      mobilePosition: 'center center',
    },
    illustrative: true,
    highlight: undefined, // Slide 3: highlight none
  },
  {
    id: 'story',
    eyebrow: 'Our story',
    lines: ['A name', 'of faith.'],
    sub: 'From a trading beginning in 1947 to a diversified industrial group: an illustrative account of continuity and reinvestment.',
    primary: { label: 'Read our story', href: '#heritage' },
    secondary: { label: 'Leadership & governance', href: '/company/corporate-governance' },
    media: {
      type: 'image',
      src: '/images/hero-heritage.jpg',
      alt: 'Fecto Historical Archive',
      position: 'center center',
      mobilePosition: 'center center',
    },
    foreground: {
      src: '/images/founder-portrait.jpg',
      alt: 'Ghulam Muhammad A. Fecto, Founder',
      name: 'Ghulam Muhammad A. Fecto',
      meta: 'Founder profile · illustrative mock',
    },
    highlight: 'founded',
    illustrative: true,
  },
];

export interface HeroSectionProps {
  onRequestQuote?: () => void;
  onExploreProducts?: () => void;
  backgroundImageUrl?: string;
  bagImageUrl?: string;
  videoWebmUrl?: string;
  videoMp4Url?: string;
  className?: string;
  slides?: HeroSlide[];
  intervalMs?: number;
  autoplay?: boolean;
  staticReveal?: boolean;
  onActiveHighlightChange?: (key?: StatKey) => void;
}

/**
 * Fecto Cement Limited - Precision Aligned Auto-Rotating Hero Section
 *
 * Features:
 * - Perfectly synchronized to FectoNavbar inner left guide line (<1px delta across viewports)
 * - Fixed 3-line headline box (no vertical jumps of subline/buttons/controls between slides)
 * - Responsive type-scale: clamp(40px, min(7.2vw, 10.5vh), 112px) with leading-[0.92]
 * - Vertical budget handling: hides secondary buttons <720px, sub-line <640px
 * - Split: md:grid-cols-[1.1fr_0.9fr] with a fully visible, centered archival portrait card
 */
export const HeroSection: React.FC<HeroSectionProps> = ({
  onRequestQuote,
  onExploreProducts,
  backgroundImageUrl = '/herobg.jpg',
  bagImageUrl = '/fecto-50kg-bag.png',
  videoWebmUrl = '/Untitled design.webm',
  videoMp4Url = '/Untitled design.mp4',
  className = '',
  slides = HERO_SLIDES,
  intervalMs = 6000,
  autoplay = true,
  staticReveal = false,
  onActiveHighlightChange,
}) => {
  const reduceMotion = Boolean(useReducedMotion()) || staticReveal;
  const motionDuration = (value: number) => (staticReveal ? 0 : value);
  const [activeIndex, setActiveIndex] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDocHidden, setIsDocHidden] = useState(false);
  const [mountedOthers, setMountedOthers] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isSaveData, setIsSaveData] = useState(false);
  const [videoError, setVideoError] = useState(false);

  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const controlsRef = useRef<ReturnType<typeof animate> | null>(null);
  const progress = useMotionValue(0);

  const isInView = useInView(heroRef, { amount: 0.4 });

  // Initialize reduced motion pause preference
  useEffect(() => {
    if (reduceMotion) {
      setUserPaused(true);
    }
  }, [reduceMotion]);

  // Check hardware and connection specs
  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 768);
    checkDesktop();
    window.addEventListener('resize', checkDesktop);

    if (typeof navigator !== 'undefined' && (navigator as any).connection?.saveData) {
      setIsSaveData(true);
    }

    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  // Listen to scroll and page visibility
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    const handleVisibility = () => {
      setIsDocHidden(document.hidden);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('visibilitychange', handleVisibility);
    handleScroll();
    handleVisibility();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  // Lazy-mount non-primary slides after first paint to protect LCP
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const cb = () => setMountedOthers(true);
    if ('requestIdleCallback' in window) {
      const handle = (window as any).requestIdleCallback(cb, { timeout: 1200 });
      return () => (window as any).cancelIdleCallback(handle);
    } else {
      const handle = setTimeout(cb, 1200);
      return () => clearTimeout(handle);
    }
  }, []);

  // Compute pause status
  const isPaused =
    !autoplay ||
    userPaused ||
    isHovered ||
    isFocused ||
    !isInView ||
    isScrolled ||
    isDocHidden ||
    Boolean(reduceMotion) ||
    staticReveal;

  const isPausedRef = useRef(isPaused);
  isPausedRef.current = isPaused;

  const activeIndexRef = useRef(activeIndex);
  activeIndexRef.current = activeIndex;

  // Slide navigation
  const goTo = useCallback(
    (targetIndex: number) => {
      const nextIdx = (targetIndex + slides.length) % slides.length;
      setActiveIndex(nextIdx);
      onActiveHighlightChange?.(slides[nextIdx].highlight);

      progress.set(0);
      controlsRef.current?.stop();
      controlsRef.current = animate(progress, 1, {
        duration: intervalMs / 1000,
        ease: EASE,
        onComplete: () => {
          goTo(nextIdx + 1);
        },
      });

      if (isPausedRef.current) {
        controlsRef.current.pause();
      }
    },
    [slides, intervalMs, progress, onActiveHighlightChange]
  );

  // Initialize carousel timer
  useEffect(() => {
    progress.set(0);
    controlsRef.current = animate(progress, 1, {
      duration: intervalMs / 1000,
      ease: EASE,
      onComplete: () => {
        goTo(activeIndexRef.current + 1);
      },
    });

    if (isPausedRef.current) {
      controlsRef.current.pause();
    }

    return () => {
      controlsRef.current?.stop();
    };
  }, [intervalMs, progress, goTo]);

  // Synchronize pause state with Framer Motion timer controls
  useEffect(() => {
    if (!controlsRef.current) return;
    if (isPaused) {
      controlsRef.current.pause();
    } else {
      controlsRef.current.play();
    }
  }, [isPaused]);

  // Sync initial stat highlight
  useEffect(() => {
    onActiveHighlightChange?.(slides[0]?.highlight);
  }, [slides, onActiveHighlightChange]);

  const togglePlayPause = () => {
    setUserPaused((prev) => !prev);
  };

  const handleAction = (href: string, label: string) => {
    const isQuote = label.toLowerCase().includes('quote') || href.includes('quote');
    const isProducts = label.toLowerCase().includes('products') || href === '#products';

    if (isQuote && onRequestQuote) {
      onRequestQuote();
      return;
    }
    if (isProducts && onExploreProducts) {
      onExploreProducts();
      return;
    }

    if (href.startsWith('#')) {
      const el = document.getElementById(href.slice(1));
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }

    if (typeof window !== 'undefined') {
      window.location.href = href;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goTo(activeIndex - 1);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      goTo(activeIndex + 1);
    }
  };

  const handlePanEnd = (
    _: any,
    info: { offset: { x: number; y: number }; velocity: { x: number; y: number } }
  ) => {
    const { offset, velocity } = info;
    const isHorizontal =
      Math.abs(offset.x) > 60 && Math.abs(offset.x) > 1.5 * Math.abs(offset.y);
    const isFastSwipe = Math.abs(velocity.x) > 500;

    if (isHorizontal || isFastSwipe) {
      if (offset.x < 0 || velocity.x < -500) {
        goTo(activeIndex + 1);
      } else {
        goTo(activeIndex - 1);
      }
    }
  };

  const currentSlide = slides[activeIndex] || slides[0];
  const canPlayVideo =
    currentSlide.media.type === 'video' &&
    isDesktop &&
    !isSaveData &&
    !reduceMotion &&
    !staticReveal &&
    !videoError;

  useEffect(() => {
    if (!videoRef.current) return;
    if (canPlayVideo) {
      videoRef.current.play().catch(() => {
        setVideoError(true);
      });
    } else {
      videoRef.current.pause();
    }
  }, [canPlayVideo, activeIndex]);

  // Scrim strength rule: Raise Slide 1 and Slide 3 to from-[#0A0F1F]/85
  const leftScrimGradient =
    currentSlide.id === 'future' || currentSlide.id === 'power'
      ? 'bg-gradient-to-r from-[#0A0F1F]/85 via-[#0A0F1F]/40 to-transparent'
      : 'bg-gradient-to-r from-[#0A0F1F]/75 via-[#0A0F1F]/35 to-transparent';

  // Persistent mock-design disclosure, visible and screen-reader accessible.
  const badgeText = 'Illustrative homepage mock · figures and imagery are placeholders';

  return (
    <section
      ref={heroRef}
      data-tone="dark"
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured stories"
      aria-live={isPaused ? 'polite' : 'off'}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onFocus={() => setIsFocused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setIsFocused(false);
        }
      }}
      className={`relative min-h-screen w-full flex items-center justify-center bg-black overflow-hidden touch-pan-y focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F4D5AB] ${className}`}
    >
      {/* 1. STACKED MEDIA LAYERS WITH KEN BURNS & CROSSFADE */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        onPanEnd={handlePanEnd}
      >
        {slides.map((slide, i) => {
          if (i > 0 && !mountedOthers) return null;

          const isActive = i === activeIndex;
          const isNext = i === (activeIndex + 1) % slides.length;
          const mediaSrc =
            i === 0 && backgroundImageUrl ? backgroundImageUrl : slide.media.src;

          return (
            <motion.div
              key={slide.id}
              className="absolute inset-0 w-full h-full pointer-events-none"
              aria-hidden={!isActive}
              initial={false}
              animate={{ opacity: isActive ? 1 : 0 }}
              transition={{ duration: motionDuration(DUR.base), ease: EASE }}
            >
              {slide.media.type === 'video' ? (
                isDesktop && !reduceMotion && !isSaveData && !videoError ? (
                  <video
                    ref={isActive ? videoRef : undefined}
                    key={slide.media.src}
                    muted
                    loop
                    playsInline
                    preload="none"
                    poster={slide.media.poster}
                    onError={() => setVideoError(true)}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{
                      objectPosition: isDesktop
                        ? slide.media.position || 'center'
                        : slide.media.mobilePosition || 'center',
                    }}
                  >
                    {(isActive || isNext) && (
                      <source src={slide.media.src} type="video/mp4" />
                    )}
                  </video>
                ) : (
                  <Image
                    src={slide.media.poster || mediaSrc}
                    alt={slide.media.alt}
                    fill
                    sizes="100vw"
                    quality={75}
                    className="object-cover"
                    style={{
                      objectPosition: isDesktop
                        ? slide.media.position || 'center'
                        : slide.media.mobilePosition || 'center',
                    }}
                  />
                )
              ) : (
                <Image
                  src={mediaSrc}
                  alt={slide.media.alt}
                  fill
                  priority={i === 0}
                  sizes="100vw"
                  quality={75}
                  className="object-cover"
                  style={{
                    objectPosition: isDesktop
                      ? slide.media.position || 'center'
                      : slide.media.mobilePosition || 'center',
                  }}
                />
              )}
            </motion.div>
          );
        })}
      </motion.div>

      {/* 2. DIRECTIONAL SCRIMS (Dynamic left scrim strength) */}
      <div
        className={`absolute inset-0 ${leftScrimGradient} pointer-events-none transition-all duration-[500ms] ease-[cubic-bezier(0.22,1,0.36,1)]`}
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#0A0F1F]/80 via-[#0A0F1F]/30 to-transparent pointer-events-none"
        aria-hidden="true"
      />

      {/* 3. ILLUSTRATIVE BADGE CHIP (top = navbar bottom + 8px -> 100px) */}
      <div className="absolute right-4 top-[100px] z-30 pointer-events-none rounded-full border border-white/10 bg-black/40 px-3 py-1 text-[11px] font-medium text-white/80 shadow-sm backdrop-blur-sm">
        {badgeText}
      </div>

      {/* 4. UNIFIED CONTAINER: Matches FectoNavbar pill container and inner left line */}
      <div className="w-full flex justify-center px-3 sm:px-4 pointer-events-none">
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="pointer-events-auto relative z-10 w-full max-w-[1280px] px-4 sm:px-6 md:px-8 pt-[108px] pb-6 sm:pb-8 lg:pb-10"
        >
          {/* Split: md and up grid-cols-[1.1fr_0.9fr] */}
          <div className="grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-12 items-center">

            {/* ============================================================== */}
            {/* LEFT COLUMN: Fixed 3-line Headline Box, Eyebrow, CTAs, Controls */}
            {/* ============================================================== */}
            <div className="flex flex-col items-start text-left justify-center w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide.id}
                  initial={reduceMotion ? { opacity: 0 } : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
                  transition={{ duration: reduceMotion ? 0.2 : 0.25, ease: EASE }}
                  className="flex flex-col items-start text-left w-full"
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${activeIndex + 1} of ${slides.length}`}
                >
                  {/* Headline Box: Fixed min-height of 3 lines + eyebrow, flex flex-col justify-end */}
                  <div
                    className="flex flex-col justify-end w-full"
                    style={{
                      minHeight: 'calc(3 * 0.92em + 2.75rem)',
                      fontSize: 'clamp(40px, min(7.2vw, 10.5vh), 112px)',
                    }}
                  >
                    {/* Eyebrow inside the box above headline */}
                    <motion.span
                      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: reduceMotion ? 0.2 : 0.3,
                        delay: reduceMotion ? 0 : 0.05,
                        ease: EASE,
                      }}
                      className="text-xs md:text-sm font-semibold tracking-widest uppercase text-[#F4D5AB] mb-3 sm:mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] font-sans"
                      style={{ fontSize: '0.875rem', lineHeight: '1.25rem' }}
                    >
                      {currentSlide.eyebrow}
                    </motion.span>

                    {/* Main Headline (H1): clamp(40px, min(7.2vw, 10.5vh), 112px) with leading-[0.92] */}
                    <h1
                      className="font-bold tracking-tight text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]"
                      style={{
                        fontSize: 'inherit',
                        lineHeight: '0.92',
                      }}
                    >
                      {currentSlide.lines.map((line, idx) => (
                        <span key={idx} className="block overflow-hidden pb-[0.1em]">
                          <motion.span
                            className="inline-block"
                            initial={reduceMotion ? { opacity: 0 } : { y: '105%' }}
                            animate={reduceMotion ? { opacity: 1 } : { y: 0 }}
                            transition={{
                              duration: reduceMotion ? 0.2 : 0.4,
                              ease: EASE,
                              delay: reduceMotion ? 0 : 0.08 + idx * 0.04,
                            }}
                          >
                            {line}
                          </motion.span>
                        </span>
                      ))}
                    </h1>
                  </div>

                  {/* Sub-headline: clamp(15px, 1.6vw, 20px), hidden below 640px height */}
                  <motion.p
                    initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: reduceMotion ? 0.2 : 0.3,
                      delay: reduceMotion ? 0 : 0.16,
                      ease: EASE,
                    }}
                    className="hidden [@media(min-height:640px)]:block font-normal text-white/95 max-w-lg my-4 md:my-6 leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
                    style={{
                      fontSize: 'clamp(15px, 1.6vw, 20px)',
                    }}
                  >
                    {currentSlide.sub}
                  </motion.p>

                  {/* Action Buttons: Secondary hidden below 720px height */}
                  <motion.div
                    initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: reduceMotion ? 0.2 : 0.3,
                      delay: reduceMotion ? 0 : 0.2,
                      ease: EASE,
                    }}
                    className="flex flex-wrap items-center gap-4 pt-2"
                  >
                    <button
                      type="button"
                      onClick={() => handleAction(currentSlide.primary.href, currentSlide.primary.label)}
                      className="inline-flex items-center justify-center px-8 py-3.5 sm:py-4 rounded-full text-base font-bold text-[#000080] bg-white hover:bg-white/90 transition-all duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)] shadow-2xl hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F4D5AB] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                    >
                      {currentSlide.primary.label}
                    </button>

                    {currentSlide.secondary && (
                      <button
                        type="button"
                        onClick={() => handleAction(currentSlide.secondary!.href, currentSlide.secondary!.label)}
                        className="hidden [@media(min-height:720px)]:inline-flex items-center justify-center px-8 py-[13px] sm:py-[14px] rounded-full text-base font-semibold text-white bg-black/20 backdrop-blur-sm border-2 border-white hover:bg-white/15 transition-all duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F4D5AB] focus-visible:ring-offset-2 focus-visible:ring-offset-black shadow-lg"
                      >
                        {currentSlide.secondary.label}
                      </button>
                    )}
                  </motion.div>
                </motion.div>
              </AnimatePresence>

              {/* Carousel Controls: Arrows hidden below 720px height */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-6 sm:mt-8 w-full max-w-lg">
                {/* Segments Row */}
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  {slides.map((s, i) => {
                    const isCompleted = i < activeIndex;
                    const isActive = i === activeIndex;

                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => goTo(i)}
                        aria-label={`Go to slide ${i + 1}: ${s.lines[0]}`}
                        className="group relative flex-1 sm:flex-none flex items-center py-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F4D5AB] rounded"
                      >
                        <div className="w-full sm:w-12 md:w-16 h-1 rounded-full bg-white/30 overflow-hidden relative">
                          {isCompleted && (
                            <div className="w-full h-full bg-[#F4D5AB] rounded-full" />
                          )}
                          {isActive && (
                            <motion.div
                              className="w-full h-full bg-[#F4D5AB] rounded-full origin-left"
                              style={{ scaleX: progress }}
                            />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Navigation Controls: Arrows hidden below 720px height */}
                <div className="flex items-center gap-1 text-white/80">
                  <button
                    type="button"
                    onClick={togglePlayPause}
                    aria-label={userPaused ? 'Play slide rotation' : 'Pause slide rotation'}
                    aria-pressed={!userPaused}
                    className="p-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F4D5AB]"
                  >
                    {userPaused ? (
                      <Play className="w-4 h-4 fill-current" />
                    ) : (
                      <Pause className="w-4 h-4 fill-current" />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => goTo(activeIndex - 1)}
                    aria-label="Previous slide"
                    className="hidden md:[@media(min-height:720px)]:inline-flex p-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F4D5AB]"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => goTo(activeIndex + 1)}
                    aria-label="Next slide"
                    className="hidden md:[@media(min-height:720px)]:inline-flex p-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F4D5AB]"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* ============================================================== */}
            {/* RIGHT COLUMN: Centered, fully visible archival portrait card    */}
            {/* ============================================================== */}
            <div className="hidden md:flex h-full min-h-0 items-center justify-center pb-6 lg:justify-end lg:pb-10 lg:pr-8">
              <AnimatePresence mode="wait">
                {/* Slides 1, 2 & 3: background photography only, no foreground visuals. */}
                {currentSlide.id === 'story' && currentSlide.foreground && (
                  <motion.div
                    key="fg-story"
                    initial={reduceMotion ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{
                      opacity: 0,
                      transition: {
                        duration: motionDuration(DUR.fast),
                        ease: EASE,
                      },
                    }}
                    transition={{
                      duration: motionDuration(DUR.base),
                      ease: EASE,
                    }}
                    className="flex w-full max-w-[320px] flex-col items-center"
                  >
                    <div
                      className="relative mx-auto overflow-hidden rounded-[28px] border border-white/15 bg-[#0A0F1F] shadow-[0_24px_70px_rgba(0,0,0,0.55)]"
                      style={{
                        ...PORTRAIT_CARD_SIZE,
                        background:
                          'radial-gradient(circle at 50% 18%, rgba(244,213,171,0.08), transparent 62%), #0A0F1F',
                      }}
                    >
                      <div className="absolute inset-2 sm:inset-3">
                        <Image
                          src={currentSlide.foreground.src}
                          alt={currentSlide.foreground.alt}
                          fill
                          sizes="(min-width: 768px) 320px, 100vw"
                          quality={75}
                          className="select-none object-contain object-center"
                        />
                      </div>
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-inset ring-white/5"
                      />
                    </div>

                    <div
                      className="mx-auto mt-3 rounded-xl border border-white/10 bg-black/55 px-4 py-2 text-center"
                      style={{ width: PORTRAIT_CARD_WIDTH, maxWidth: '100%' }}
                    >
                      {currentSlide.foreground.name && (
                        <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-white">
                          {currentSlide.foreground.name}
                        </p>
                      )}
                      {currentSlide.foreground.meta && (
                        <p className="mt-0.5 text-[10px] font-medium tracking-wide text-[#F4D5AB]">
                          {currentSlide.foreground.meta}
                        </p>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
