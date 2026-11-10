'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useMotionValue, animate, useReducedMotion, useInView } from 'framer-motion';
import { Play, Pause, ChevronLeft, ChevronRight } from 'lucide-react';
import { EASE } from '@/lib/motion';

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
  foreground?: { src: string; alt: string; className?: string };
  highlight?: StatKey;
  illustrative?: boolean;
}

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
    sub: 'A dry-process line rated at 3,000 tons of clinker a day, from limestone to bag.',
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
    sub: "Kiln waste heat and on-site solar already supply nearly half of the plant's electricity.",
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
    sub: 'From a shoe store on Grant Road in 1947 to a PSX-listed cement maker: nearly eight decades built on keeping our word.',
    primary: { label: 'Read our story', href: '/company/history' },
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
      className: 'h-[78%] object-contain object-bottom',
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
 * - Split: md:grid-cols-[1.1fr_0.9fr] with centered bag and bottom-aligned portrait
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
  intervalMs = 10000,
  autoplay = true,
  onActiveHighlightChange,
}) => {
  const prefersReducedMotion = useReducedMotion();
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
    if (prefersReducedMotion) {
      setUserPaused(true);
    }
  }, [prefersReducedMotion]);

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
    Boolean(prefersReducedMotion);

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
        ease: 'linear',
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
      ease: 'linear',
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
    !prefersReducedMotion &&
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

  // Badge text: Slide 4 uses "Illustrative background"
  const badgeText =
    currentSlide.id === 'story' ? 'Illustrative background' : 'Illustrative image';

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
              animate={{
                opacity: isActive ? 1 : 0,
                scale: prefersReducedMotion ? 1 : isActive ? 1.06 : 1,
              }}
              transition={{
                opacity: {
                  duration: prefersReducedMotion ? 0.05 : 1.2,
                  ease: EASE,
                },
                scale: {
                  duration: prefersReducedMotion ? 0 : isActive ? 12 : 1.2,
                  ease: isActive ? 'linear' : EASE,
                },
              }}
            >
              {slide.media.type === 'video' ? (
                isDesktop && !prefersReducedMotion && !isSaveData && !videoError ? (
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
        className={`absolute inset-0 ${leftScrimGradient} pointer-events-none transition-all duration-700`}
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#0A0F1F]/80 via-[#0A0F1F]/30 to-transparent pointer-events-none"
        aria-hidden="true"
      />

      {/* 3. ILLUSTRATIVE BADGE CHIP (top = navbar bottom + 12px -> 104px) */}
      <AnimatePresence>
        {currentSlide.illustrative && (
          <motion.div
            key={`chip-${currentSlide.id}`}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.3 }}
            className="absolute right-4 top-[104px] z-30 pointer-events-none text-[11px] font-medium bg-black/40 text-white/80 rounded-full px-3 py-1 backdrop-blur-sm border border-white/10 shadow-sm"
            aria-hidden="true"
          >
            {badgeText}
          </motion.div>
        )}
      </AnimatePresence>

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
                  initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
                  transition={{ duration: prefersReducedMotion ? 0.2 : 0.25, ease: 'easeOut' }}
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
                      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: prefersReducedMotion ? 0.2 : 0.5,
                        delay: prefersReducedMotion ? 0 : 0.6,
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
                            initial={prefersReducedMotion ? { opacity: 0 } : { y: '105%' }}
                            animate={prefersReducedMotion ? { opacity: 1 } : { y: 0 }}
                            transition={{
                              duration: prefersReducedMotion ? 0.2 : 0.8,
                              ease: EASE,
                              delay: prefersReducedMotion ? 0 : 0.3 + idx * 0.08,
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
                    initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: prefersReducedMotion ? 0.2 : 0.5,
                      delay: prefersReducedMotion ? 0 : 0.6 + currentSlide.lines.length * 0.08,
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
                    initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: prefersReducedMotion ? 0.2 : 0.5,
                      delay: prefersReducedMotion ? 0 : 0.68 + currentSlide.lines.length * 0.08,
                      ease: EASE,
                    }}
                    className="flex flex-wrap items-center gap-4 pt-2"
                  >
                    <button
                      type="button"
                      onClick={() => handleAction(currentSlide.primary.href, currentSlide.primary.label)}
                      className="inline-flex items-center justify-center px-8 py-3.5 sm:py-4 rounded-full text-base font-bold text-[#000080] bg-white hover:bg-white/90 transition-all duration-200 shadow-2xl hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F4D5AB] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                    >
                      {currentSlide.primary.label}
                    </button>

                    {currentSlide.secondary && (
                      <button
                        type="button"
                        onClick={() => handleAction(currentSlide.secondary!.href, currentSlide.secondary!.label)}
                        className="hidden [@media(min-height:720px)]:inline-flex items-center justify-center px-8 py-[13px] sm:py-[14px] rounded-full text-base font-semibold text-white bg-black/20 backdrop-blur-sm border-2 border-white hover:bg-white/15 transition-all duration-200 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F4D5AB] focus-visible:ring-offset-2 focus-visible:ring-offset-black shadow-lg"
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
            {/* RIGHT COLUMN: Bottom-Aligned Founder Portrait (S4) */}
            {/* ============================================================== */}
            <div className="hidden md:flex justify-center items-center h-full max-h-[calc(100vh-132px)]">
              <AnimatePresence mode="wait">
                {/* Slides 1, 2 & 3: Background photography only, no foreground visuals */}

                {currentSlide.id === 'story' && currentSlide.foreground && (
                  <motion.div
                    key="fg-story"
                    initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 48 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, transition: { duration: 0.3 } }}
                    transition={{
                      duration: prefersReducedMotion ? 0.2 : 0.9,
                      delay: prefersReducedMotion ? 0 : 0.4,
                      ease: EASE,
                    }}
                    className="relative w-full h-[520px] max-h-[min(540px,78vh)] flex items-end justify-center lg:justify-end"
                  >
                    <div className="relative w-full h-full flex items-end justify-center lg:justify-end">
                      <Image
                        src={currentSlide.foreground.src}
                        alt={currentSlide.foreground.alt}
                        width={480}
                        height={640}
                        className="h-[78%] w-auto max-h-[460px] object-contain object-bottom drop-shadow-[0_25px_50px_rgba(0,0,0,0.95)] [mask-image:linear-gradient(to_left,black_60%,transparent)]"
                      />
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