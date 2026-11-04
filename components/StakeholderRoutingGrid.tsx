'use client';

import React from 'react';
import Link from 'next/link';
import { 
  HardHat, 
  Store, 
  TrendingUp, 
  Users, 
  ArrowRight 
} from 'lucide-react';

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
 * - Background: Mist Gray (#F1F5F9), py-24
 * - Eyebrow: "WHERE TO NEXT" in #8B5E1A Bronze
 * - H2: "Find your path." in #000080 Fecto Navy
 * - 4-Column Responsive Grid (grid-cols-1 md:grid-cols-2 lg:grid-cols-4, gap-6)
 * - Card Hover Physics:
 *    * Top image smoothly scales up (group-hover:scale-110, duration-700)
 *    * Bottom wrapper triggers Navy Sweep from bottom (translate-y-full -> group-hover:translate-y-0, duration-500)
 *    * Icon, Title & Description invert to Pure White
 *    * Action CTA changes to Champagne Sand (#F4D5AB) with animated right arrow
 */
export const StakeholderRoutingGrid: React.FC<StakeholderRoutingGridProps> = ({
  onCardClick,
  onRequestQuote,
  className = '',
}) => {
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

  return (
    <section 
      id="stakeholders" 
      className={`relative w-full bg-[#F1F5F9] py-24 ${className}`}
      aria-labelledby="stakeholder-heading"
    >
      <div className="max-w-7xl mx-auto px-6">
        
        {/* ============================================================== */}
        {/* SECTION HEADER                                                */}
        {/* ============================================================== */}
        <div className="text-left mb-12">
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
        </div>

        {/* ============================================================== */}
        {/* 4-COLUMN CARDS GRID (Elevated Surface Glassmorphism)          */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STAKEHOLDER_CARDS.map((card) => {
            const Icon = card.icon;

            return (
              <Link
                key={card.id}
                href={card.href}
                onClick={(e) => handleItemClick(e, card)}
                className="group relative flex flex-col rounded-3xl overflow-hidden surface-elevated transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-[#000080] focus:ring-offset-2 focus:ring-offset-[#F1F5F9]"
              >
                {/* -------------------------------------------------------- */}
                {/* PART A: Top Image Wrapper with Smooth Zoom Physics       */}
                {/* -------------------------------------------------------- */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-200">
                  <img
                    src={card.imageUrl}
                    alt={card.imageAlt}
                    loading="lazy"
                    className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
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
                  
                  {/* The Navy Sweep Background: translates up from bottom on hover */}
                  <div
                    className="absolute inset-0 bg-[#000080] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out pointer-events-none"
                    aria-hidden="true"
                  />

                  {/* Icon & Title Header (Relative z-10 for layering above sweep) */}
                  <div className="relative z-10 flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#000080]/10 group-hover:bg-white/10 transition-colors duration-300 shrink-0">
                      <Icon className="w-5 h-5 text-[#000080] group-hover:text-white transition-colors duration-300" />
                    </div>
                    <h3 className="text-lg font-bold text-[#000080] group-hover:text-white transition-colors duration-300 leading-snug">
                      {card.title}
                    </h3>
                  </div>

                  {/* Description Paragraph: slate-600 inverting to white/90 */}
                  <p className="relative z-10 text-sm text-slate-600 group-hover:text-white/90 transition-colors duration-300 mt-3 mb-6 leading-relaxed flex-1">
                    {card.description}
                  </p>

                  {/* Action Link: Fecto Navy transitioning to Champagne Sand (#F4D5AB) */}
                  <div className="relative z-10 mt-auto pt-2 flex items-center justify-between border-t border-slate-100 group-hover:border-white/15 transition-colors duration-300">
                    <span className="text-sm font-semibold text-[#000080] group-hover:text-[#F4D5AB] transition-colors duration-300">
                      {card.actionText}
                    </span>
                    <ArrowRight className="w-4 h-4 text-[#000080] group-hover:text-[#F4D5AB] transform group-hover:translate-x-1.5 transition-all duration-300 shrink-0" />
                  </div>

                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default StakeholderRoutingGrid;

