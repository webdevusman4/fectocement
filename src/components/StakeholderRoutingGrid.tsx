'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  HardHat, 
  Store, 
  TrendingUp, 
  Users, 
  ArrowRight 
} from 'lucide-react';
import { useMotionPrefs } from '@/hooks/useMotionPrefs';
import { EASE, DUR, Z } from '@/lib/motion';

export interface StakeholderCardItem {
  id: string;
  title: string;
  description: string;
  actionText: string;
  href: string;
  imageUrl: string;
  imageAlt: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface StakeholderRoutingGridProps {
  onCardClick?: (item: StakeholderCardItem) => void;
  onRequestQuote?: () => void;
  className?: string;
}

export const STAKEHOLDER_CARDS: StakeholderCardItem[] = [
  {
    id: 'contractors',
    title: 'Contractors & Projects',
    description: 'Partner with us for mega-projects. We deliver high-strength, consistent cement for critical infrastructure.',
    actionText: 'Request a bulk quote',
    href: '#quote',
    imageUrl: '/images/contractors-infra.jpg',
    imageAlt: 'Heavy infrastructure civil engineering construction site',
    icon: HardHat,
  },
  {
    id: 'dealers',
    title: 'Dealers & Distributors',
    description: 'Join Pakistan’s most reliable distribution network. Grow your business with our premium product line.',
    actionText: 'Find a dealer',
    href: '#dealers',
    imageUrl: '/images/dealers-warehouse.jpg',
    imageAlt: 'Modern logistics dispatch and commercial transport fleet',
    icon: Store,
  },
  {
    id: 'investors',
    title: 'Investors & Shareholders',
    description: 'Explore our financial stability, growth metrics, and commitment to long-term shareholder value.',
    actionText: 'View latest results',
    href: '#investors',
    imageUrl: '/images/investors-towers.jpg',
    imageAlt: 'Modern corporate high-rise and financial architecture',
    icon: TrendingUp,
  },
  {
    id: 'careers',
    title: 'Careers',
    description: "Build a solid future. Join a dedicated team of professionals shaping the nation's infrastructure.",
    actionText: 'See open roles',
    href: '#careers',
    imageUrl: '/images/careers-team.jpg',
    imageAlt: 'Industrial engineers and project leadership team reviewing plans on site',
    icon: Users,
  },
];

/**
 * Fecto Cement Limited - Stakeholder Routing Grid (B2B Funnel)
 * 
 * Specifications:
 * - Enter (fade-through):
 *   md and up: -mt-[24svh] pt-[34svh], relative, Z.path (z-[40]),
 *   gradient bg-[linear-gradient(to_bottom,rgba(238,243,249,0),#EEF3F9_22svh)]
 *   below md: -mt-[8svh] pt-[16svh] with gradient scaled to 8svh.
 * - Cards: whileInView once (amount 0.3, margin '-10%'): { opacity: 0, y: 40 } -> { opacity: 1, y: 0 }, DUR.slow, EASE, delay index * 0.09.
 * - Hover & focus-visible: y -8, shadow-[0_24px_50px_rgba(0,0,128,0.2)], image scale 1.05, arrow translate-x-1 (4px); DUR.fast (0.25s).
 * - SIMPLE: fade only (no y), no image zoom on touch.
 */
export const StakeholderRoutingGrid: React.FC<StakeholderRoutingGridProps> = ({
  onCardClick,
  onRequestQuote,
  className = '',
}) => {
  const { simple } = useMotionPrefs();

  const handleItemClick = (e: React.MouseEvent, item: StakeholderCardItem) => {
    if (item.id === 'contractors' && onRequestQuote) {
      e.preventDefault();
      onRequestQuote();
      return;
    }
    if (onCardClick) {
      e.preventDefault();
      onCardClick(item);
    }
  };

  // Strip conflicting background colors and z-indices from parent className to preserve fade-through gradient
  const sanitizedClassName = className
    .replace(/\bbg-\[#F1F5F9\]\b/g, '')
    .replace(/\bbg-\S+\b/g, '')
    .replace(/\bz-\[\d+\]\b/g, '')
    .replace(/\brelative\b/g, '')
    .trim();

  return (
    <section 
      id="stakeholders" 
      data-tone="light"
      className={`relative w-full ${Z.path} -mt-[8svh] md:-mt-[24svh] pt-[16svh] md:pt-[34svh] pb-24 sm:pb-32 bg-[linear-gradient(to_bottom,rgba(238,243,249,0),#EEF3F9_8svh)] md:bg-[linear-gradient(to_bottom,rgba(238,243,249,0),#EEF3F9_22svh)] ${sanitizedClassName}`}
      aria-labelledby="stakeholder-heading"
    >
      <div className="max-w-7xl mx-auto px-6">
        
        {/* ============================================================== */}
        {/* SECTION HEADER                                                */}
        {/* ============================================================== */}
        <motion.div 
          initial={{ opacity: 0, y: simple ? 0 : 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: DUR.base, ease: EASE }}
          className="text-left mb-12"
        >
          {/* Eyebrow: Frosted Glass Badge with Bronze text */}
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/80 backdrop-blur-md border border-white/90 shadow-[0_4px_14px_rgba(0,0,128,0.06)] text-xs md:text-sm font-bold tracking-widest uppercase text-[#8B5E1A] mb-3">
            WHERE TO NEXT
          </span>

          {/* H2: #000080 Fecto Navy, 4xl to 5xl, bold, tight leading */}
          <h2 
            id="stakeholder-heading"
            className="text-4xl md:text-5xl font-bold tracking-tight text-[#000080] leading-tight"
          >
            Find your path.
          </h2>
        </motion.div>

        {/* ============================================================== */}
        {/* 4-COLUMN CARDS GRID (Elevated Surface Glassmorphism)          */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STAKEHOLDER_CARDS.map((card, index) => {
            const Icon = card.icon;

            return (
              <motion.div
                key={card.id}
                initial={simple ? { opacity: 0 } : { opacity: 0, y: 40 }}
                whileInView={simple ? { opacity: 1 } : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3, margin: '-10%' }}
                transition={{
                  duration: DUR.slow,
                  ease: EASE,
                  delay: index * 0.09,
                }}
                className="h-full"
              >
                <Link
                  href={card.href}
                  onClick={(e) => handleItemClick(e, card)}
                  className={`group relative flex flex-col h-full rounded-3xl overflow-hidden surface-elevated transition-all duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#000080] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EEF3F9] ${
                    simple
                      ? ''
                      : 'hover:-translate-y-2 focus-visible:-translate-y-2 hover:shadow-[0_24px_50px_rgba(0,0,128,0.2)] focus-visible:shadow-[0_24px_50px_rgba(0,0,128,0.2)]'
                  }`}
                >
                  {/* -------------------------------------------------------- */}
                  {/* PART A: Top Image Wrapper with Smooth Zoom Physics       */}
                  {/* -------------------------------------------------------- */}
                  <div className="relative h-48 w-full overflow-hidden bg-slate-200">
                    <img
                      src={card.imageUrl}
                      alt={card.imageAlt}
                      loading="lazy"
                      className={`h-full w-full object-cover object-center transition-transform duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        simple ? '' : 'group-hover:scale-105 group-focus-visible:scale-105'
                      }`}
                    />
                    {/* Subtle top image dark scrim for contrast continuity */}
                    <div 
                      className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" 
                      aria-hidden="true" 
                    />
                    {/* Frosted Glass Floating Badge on Image */}
                    <div className="absolute top-3.5 right-3.5 z-10 px-2.5 py-1 rounded-full bg-white/80 backdrop-blur-md border border-white/90 shadow-sm text-[11px] font-bold tracking-wider text-[#000080] uppercase">
                      B2B Channel
                    </div>
                  </div>

                  {/* -------------------------------------------------------- */}
                  {/* PART B: Bottom Content Wrapper (The Navy Sweep Area)     */}
                  {/* -------------------------------------------------------- */}
                  <div className="relative flex flex-col flex-1 p-6 bg-white/95 backdrop-blur-md overflow-hidden">
                    
                    {/* The Navy Sweep Background: translates up from bottom on hover / focus */}
                    <div
                      className="absolute inset-0 bg-[#000080] translate-y-full group-hover:translate-y-0 group-focus-visible:translate-y-0 transition-transform duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)] pointer-events-none"
                      aria-hidden="true"
                    />

                    {/* Icon & Title Header (Relative z-10 for layering above sweep) */}
                    <div className="relative z-10 flex items-center gap-3">
                      <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#000080]/10 group-hover:bg-white/10 group-focus-visible:bg-white/10 transition-colors duration-[250ms] shrink-0">
                        <Icon className="w-5 h-5 text-[#000080] group-hover:text-white group-focus-visible:text-white transition-colors duration-[250ms]" />
                      </div>
                      <h3 className="text-lg font-bold text-[#000080] group-hover:text-white group-focus-visible:text-white transition-colors duration-[250ms] leading-snug">
                        {card.title}
                      </h3>
                    </div>

                    {/* Description Paragraph: slate-600 inverting to white/90 */}
                    <p className="relative z-10 text-sm text-slate-600 group-hover:text-white/90 group-focus-visible:text-white/90 transition-colors duration-[250ms] mt-3 mb-6 leading-relaxed flex-1">
                      {card.description}
                    </p>

                    {/* Action Link: Fecto Navy transitioning to Champagne Sand (#F4D5AB) */}
                    <div className="relative z-10 mt-auto pt-2 flex items-center justify-between border-t border-slate-100 group-hover:border-white/15 group-focus-visible:border-white/15 transition-colors duration-[250ms]">
                      <span className="text-sm font-semibold text-[#000080] group-hover:text-[#F4D5AB] group-focus-visible:text-[#F4D5AB] transition-colors duration-[250ms]">
                        {card.actionText}
                      </span>
                      <ArrowRight className="w-4 h-4 text-[#000080] group-hover:text-[#F4D5AB] group-focus-visible:text-[#F4D5AB] transform group-hover:translate-x-1 group-focus-visible:translate-x-1 transition-all duration-[250ms] shrink-0" />
                    </div>

                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default StakeholderRoutingGrid;
