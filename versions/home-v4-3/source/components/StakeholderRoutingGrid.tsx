'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  HardHat,
  Store,
  TrendingUp,
  Users,
  ArrowRight,
} from 'lucide-react';
import { useMotionPrefs } from '../hooks/useMotionPrefs';
import { EASE, DUR, Z } from '../lib/motion';

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
  staticReveal?: boolean;
}

export const STAKEHOLDER_CARDS: StakeholderCardItem[] = [
  {
    id: 'contractors',
    title: 'Contractors & Projects',
    description:
      'Partner with us for mega-projects. We deliver high-strength, consistent cement for critical infrastructure.',
    actionText: 'Request a bulk quote',
    href: '/request-quote',
    imageUrl: '/images/contractors-infra.jpg',
    imageAlt: 'Heavy infrastructure civil engineering construction site',
    icon: HardHat,
  },
  {
    id: 'dealers',
    title: 'Dealers & Distributors',
    description:
      'Join Pakistan’s most reliable distribution network. Grow your business with our premium product line.',
    actionText: 'Request dealer information',
    href: '/request-quote',
    imageUrl: '/images/dealers-warehouse.jpg',
    imageAlt: 'Modern logistics dispatch and commercial transport fleet',
    icon: Store,
  },
  {
    id: 'investors',
    title: 'Investors & Shareholders',
    description:
      'Explore our financial stability, growth metrics, and commitment to long-term shareholder value.',
    actionText: 'View latest results',
    href: '/investors',
    imageUrl: '/images/investors-towers.jpg',
    imageAlt: 'Modern corporate high-rise and financial architecture',
    icon: TrendingUp,
  },
  {
    id: 'careers',
    title: 'Careers',
    description:
      'Build a solid future. Join a dedicated team of professionals shaping the nation’s infrastructure.',
    actionText: 'See open roles',
    href: '/careers/overview',
    imageUrl: '/images/careers-team.jpg',
    imageAlt: 'Industrial engineers and project leadership team reviewing plans on site',
    icon: Users,
  },
];

/**
 * Stakeholder Routing Grid — executive-restraint B2B paths.
 *
 * Static capture/mobile/reduced-motion output, functional destinations,
 * one-time 0.5s reveals, and restrained 0.25s hover states.
 */
export const StakeholderRoutingGrid: React.FC<StakeholderRoutingGridProps> = ({
  onCardClick,
  onRequestQuote,
  className = '',
  staticReveal = false,
}) => {
  const { simple: prefersSimple } = useMotionPrefs();
  const simple = prefersSimple || staticReveal;

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
      className={`relative -mt-[8svh] w-full bg-[linear-gradient(to_bottom,rgba(238,243,249,0),#EEF3F9_8svh)] pb-24 pt-[16svh] sm:pb-32 md:-mt-[24svh] md:bg-[linear-gradient(to_bottom,rgba(238,243,249,0),#EEF3F9_22svh)] md:pt-[34svh] ${Z.path} ${sanitizedClassName}`}
      aria-labelledby="stakeholder-heading"
    >
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          data-v43-reveal
          initial={simple ? false : { opacity: 0, y: 10 }}
          whileInView={simple ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: DUR.base, ease: EASE }}
          className="mb-12 text-left"
        >
          <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/90 bg-white/80 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-[#8B5E1A] shadow-[0_4px_14px_rgba(0,0,128,0.06)] backdrop-blur-md md:text-sm">
            Where to next
          </span>
          <h2
            id="stakeholder-heading"
            className="text-4xl font-bold leading-tight tracking-tight text-[#000080] md:text-5xl"
          >
            Find your path.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {STAKEHOLDER_CARDS.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.id}
                data-v43-reveal
                initial={simple ? false : { opacity: 0, y: 10 }}
                whileInView={simple ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3, margin: '-10%' }}
                transition={{ duration: DUR.base, ease: EASE, delay: index * 0.08 }}
                className="h-full"
              >
                <Link
                  href={card.href}
                  onClick={(e) => handleItemClick(e, card)}
                  className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/90 bg-white/95 shadow-[0_16px_36px_-8px_rgba(0,0,128,0.10)] transition-[box-shadow,border-color] duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-[#F4D5AB]/70 hover:shadow-[0_24px_50px_-16px_rgba(0,0,128,0.20)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#000080] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EEF3F9]"
                >
                  <div className="relative h-48 w-full overflow-hidden bg-slate-200">
                    <Image
                      src={card.imageUrl}
                      alt={card.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="h-full w-full object-cover object-center transition-transform duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02] group-focus-visible:scale-[1.02]"
                    />
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent"
                    />
                    <div className="absolute right-3.5 top-3.5 z-10 rounded-full border border-white/90 bg-white/80 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-[#000080] shadow-sm backdrop-blur-md">
                      B2B Channel
                    </div>
                  </div>

                  <div className="relative flex flex-1 flex-col p-6">
                    <div className="relative z-10 flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#000080]/10">
                        <Icon className="h-5 w-5 text-[#000080]" />
                      </div>
                      <h3 className="text-lg font-bold leading-snug text-[#000080]">
                        {card.title}
                      </h3>
                    </div>

                    <p className="relative z-10 mb-6 mt-3 flex-1 text-sm leading-relaxed text-slate-600">
                      {card.description}
                    </p>

                    <div className="relative z-10 mt-auto flex items-center justify-between border-t border-slate-100 pt-2 transition-colors duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:border-[#F4D5AB]/60">
                      <span className="text-sm font-semibold text-[#000080]">
                        {card.actionText}
                      </span>
                      <ArrowRight className="h-4 w-4 shrink-0 text-[#000080] transition-transform duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <p className="mx-auto mt-10 max-w-3xl rounded-2xl border border-slate-200/80 bg-white/60 px-5 py-3 text-center font-mono text-[10px] uppercase tracking-[0.14em] text-slate-500">
          Mock design note · stakeholder destinations are sample routes for layout review
        </p>
      </div>
    </section>
  );
};

export default StakeholderRoutingGrid;
