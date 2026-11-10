'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MapPin, ArrowRight, ArrowUpRight } from 'lucide-react';
import { useMotionPrefs } from '../hooks/useMotionPrefs';
import { EASE, DUR, Z } from '../lib/motion';

export interface ProjectItem {
  id: string;
  title: string;
  location: string;
  metric: string;
  image: string;
  gridClass: string;
  minHeightClass: string;
}

export interface IconicProjectsProps {
  onViewAllProjects?: () => void;
  onSelectProject?: (title: string) => void;
  className?: string;
}

const PROJECTS: ProjectItem[] = [
  {
    id: 'motorway',
    title: 'National Motorway Network (M-2)',
    location: 'Salt Range, Pakistan',
    metric: '1.2M Tons Supplied',
    image: '/Gemini_Generated_Image_1jfr2q1jfr2q1jfr.jpg',
    gridClass: 'lg:col-span-2 lg:row-span-2',
    minHeightClass: 'min-h-[460px] lg:min-h-[620px]',
  },
  {
    id: 'tarbela',
    title: 'Tarbela Dam Extension',
    location: 'KPK, Pakistan',
    metric: 'Sulphate Resistant Cement',
    image: '/tarbala.jpg',
    gridClass: 'lg:col-span-1',
    minHeightClass: 'min-h-[290px] lg:min-h-[295px]',
  },
  {
    id: 'towers',
    title: 'Financial District Towers',
    location: 'Karachi, Pakistan',
    metric: 'OPC Grade 53 High-Rise Pour',
    image: '/images/project-towers.jpg',
    gridClass: 'lg:col-span-1',
    minHeightClass: 'min-h-[290px] lg:min-h-[295px]',
  },
];

// Parallax drift factors k for cards 1 to 3
const K = [60, 130, 30] as const;

/**
 * Iconic Projects (Our Footprint) Bento Gallery Section
 * 
 * Specifications:
 * - Enter (sunrise sheet): rounded-t-[40px], -mt-10, relative, Z.skyline (z-[70]),
 *   shadow-[0_-20px_60px_rgba(0,0,60,0.2)], bg-[linear-gradient(#F4D5AB,#EEF3F9_45svh)], headline in navy.
 * - Parallax drift (md and up): enter = useScroll({ offset: ['start end', 'start 20%'] });
 *   card y = (1 - enter) * k with k = [60, 130, 30] px.
 * - Hover & focus-visible: card image scale 1.04 (inside overflow-hidden), caption slides up 6 px; DUR.fast.
 * - Legibility: bottom scrim (bg-gradient-to-t from-black/60 via-black/20 to-transparent) behind every caption.
 * - SIMPLE: no parallax; cards fade in once.
 */
export const IconicProjects: React.FC<IconicProjectsProps> = ({
  onViewAllProjects,
  onSelectProject,
  className = '',
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const { simple } = useMotionPrefs();

  // Scroll progress for parallax drift: start end -> start 20%
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'start 20%'],
  });

  // Pre-compute parallax drift MotionValues for the 3 bento cards
  const y1 = useTransform(scrollYProgress, [0, 1], [K[0], 0]);
  const y2 = useTransform(scrollYProgress, [0, 1], [K[1], 0]);
  const y3 = useTransform(scrollYProgress, [0, 1], [K[2], 0]);
  const yDrifts = [y1, y2, y3];

  // Defensive sanitization: remove conflicting bg-white or opaque background utilities from className
  const sanitizedClassName = className
    .replace(/\bbg-white\b/g, '')
    .replace(/\bbg-\[#\w+\]\b/g, '')
    .replace(/\bbg-\S+\b/g, '')
    .replace(/\bz-\[\d+\]\b/g, '')
    .replace(/\brelative\b/g, '')
    .trim();

  return (
    <section
      ref={sectionRef}
      id="projects"
      data-tone="light"
      className={`relative w-full ${Z.skyline} rounded-t-[40px] -mt-10 shadow-[0_-20px_60px_rgba(0,0,60,0.2)] bg-[linear-gradient(#F4D5AB,#EEF3F9_45svh)] text-slate-900 pt-20 md:pt-24 pb-32 sm:pb-40 md:pb-48 scroll-mt-20 ${sanitizedClassName}`}
    >
      <div className="max-w-7xl mx-auto px-6">
        
        {/* ================================================================ */}
        {/* SECTION HEADER: Left Title & Right Action                        */}
        {/* ================================================================ */}
        <motion.div 
          initial={simple ? { opacity: 0 } : { opacity: 0, y: 24 }}
          whileInView={simple ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: DUR.base, ease: EASE }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
        >
          <div className="max-w-2xl">
            {/* Eyebrow: Frosted Glass Badge with Bronze text */}
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/70 backdrop-blur-md border border-white/80 text-xs md:text-sm font-bold tracking-widest uppercase text-[#8B5E1A] shadow-xs">
              OUR FOOTPRINT
            </span>

            {/* Heading (H2): Fecto Navy #000080, 4xl/5xl, font-bold, tight leading */}
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#000080] mt-3 leading-[1.12]">
              Shaping the nation&apos;s skyline.
            </h2>
          </div>

          {/* Action Button: Navy outline button with focus ring */}
          <button
            type="button"
            onClick={onViewAllProjects}
            className="group/btn inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full border-2 border-[#000080] text-[#000080] font-semibold text-sm transition-all duration-300 hover:bg-[#000080] hover:text-white shadow-sm hover:shadow-md active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#000080] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F4D5AB] w-fit"
          >
            <span>View all projects</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
          </button>
        </motion.div>

        {/* ================================================================ */}
        {/* THE BENTO-BOX GRID (3 Columns on Desktop, Parallax Drift)        */}
        {/* ================================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {PROJECTS.map((project, index) => {
            const yDrift = yDrifts[index] ?? yDrifts[0];

            return (
              <motion.div
                key={project.id}
                style={simple ? undefined : { y: yDrift }}
                initial={simple ? { opacity: 0, y: 20 } : undefined}
                whileInView={simple ? { opacity: 1, y: 0 } : undefined}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ duration: DUR.base, ease: EASE, delay: index * 0.1 }}
                className={`h-full ${project.gridClass}`}
              >
                <div
                  onClick={() => onSelectProject?.(project.title)}
                  className={`relative rounded-3xl overflow-hidden group cursor-pointer w-full h-full ${project.minHeightClass} shadow-[0_18px_45px_-8px_rgba(0,0,128,0.15)] hover:shadow-[0_32px_70px_-12px_rgba(0,0,128,0.28)] border border-slate-100/80 transition-all duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#000080] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EEF3F9]`}
                  role="button"
                  tabIndex={0}
                  aria-label={`View details for ${project.title}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onSelectProject?.(project.title);
                    }
                  }}
                >
                  {/* 1. Background Image: Zoom on Hover (1.04 inside overflow-hidden) */}
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04] group-focus-visible:scale-[1.04]"
                    unoptimized
                    priority={false}
                  />

                  {/* 2. Legibility Bottom Scrim: Guarantees contrast on bright images (e.g. dam card) */}
                  <div 
                    className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none z-[5]"
                    aria-hidden="true" 
                  />

                  {/* 3. The Navy Sweep (Hover): Sweeps Upwards over 250ms */}
                  <div 
                    className="absolute inset-0 bg-[#000080]/90 translate-y-full group-hover:translate-y-0 group-focus-visible:translate-y-0 transition-transform duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)] pointer-events-none z-[6]"
                    aria-hidden="true" 
                  />

                  {/* Top-Right Corner Arrow Badge */}
                  <div className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-[#F4D5AB] group-hover:text-[#000080] group-hover:border-[#F4D5AB] group-focus-visible:bg-[#F4D5AB] group-focus-visible:text-[#000080] group-focus-visible:border-[#F4D5AB] transition-all duration-[250ms] shadow-md">
                    <ArrowUpRight className="w-5 h-5 transition-transform duration-[250ms] group-hover:scale-110 group-focus-visible:scale-110" />
                  </div>

                  {/* 4. Project Caption Content: Slides up 6 px on hover & focus-visible */}
                  <div className="relative z-10 flex flex-col justify-end h-full p-8 text-left pointer-events-none transition-transform duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-[6px] group-focus-visible:-translate-y-[6px]">
                    
                    {/* Title: Pure White with Drop Shadow */}
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight leading-snug drop-shadow-sm">
                      {project.title}
                    </h3>

                    {/* Location: Light Gray with MapPin icon */}
                    <div className="text-gray-200 text-sm font-medium mb-3 flex items-center gap-2 drop-shadow-sm">
                      <MapPin className="w-4 h-4 text-[#F4D5AB] flex-shrink-0" />
                      <span>{project.location}</span>
                    </div>

                    {/* The Metric: Fades in and slides up on hover & focus */}
                    <div className="opacity-0 translate-y-4 group-hover:opacity-100 group-focus-visible:opacity-100 group-hover:translate-y-0 group-focus-visible:translate-y-0 transition-all duration-[250ms] delay-75 pt-2 border-t border-white/20">
                      <div className="inline-flex items-center gap-2 text-[#F4D5AB] font-bold text-sm md:text-base tracking-wide">
                        <span className="w-2 h-2 rounded-full bg-[#F4D5AB]" />
                        <span>{project.metric}</span>
                      </div>
                    </div>

                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default IconicProjects;
