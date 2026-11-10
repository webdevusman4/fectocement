'use client';

import React from 'react';
import Image from 'next/image';
import { Leaf, Wind, Users, Download } from 'lucide-react';
import { useMotionPrefs } from '../hooks/useMotionPrefs';
import { DUR, Z } from '../lib/motion';
import { SectionReveal } from './SectionReveal';

export interface SustainabilitySectionProps {
  onDownloadReport?: () => void;
  className?: string;
  imageUrl?: string;
  doorLeft?: string;
  doorRight?: string;
  staticReveal?: boolean;
}

const PILLARS = [
  {
    icon: Leaf,
    title: 'Kiln fuel transition',
    body: 'Sample programme: phased biomass and refuse-derived fuel trials, with measured heat-rate and emissions checks before scale-up.',
  },
  {
    icon: Wind,
    title: 'Particulate control',
    body: 'Sample operating standard: bag-house monitoring, documented stack checks, and clear escalation thresholds for each shift.',
  },
  {
    icon: Users,
    title: 'Community & governance',
    body: 'Sample framework: local skills training, transparent grievance records, and board-level review of environmental performance.',
  },
];

export const SustainabilitySection: React.FC<SustainabilitySectionProps> = ({
  onDownloadReport,
  className = '',
  imageUrl = '/images/sustainability-energy.jpg',
  staticReveal = false,
}) => {
  const { simple: prefersSimple } = useMotionPrefs();
  const simple = prefersSimple || staticReveal;

  return (
    <section
      id="sustainability"
      data-tone="light"
      aria-label="Environment and Sustainability"
      className={`relative -mt-10 overflow-hidden rounded-t-[40px] border-t border-slate-200/60 bg-[#F8FAFC] py-24 text-slate-900 shadow-[0_-20px_60px_rgba(0,0,60,0.25)] sm:py-28 md:py-32 ${Z.sustain} ${className}`}
    >
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-12">
          {/* Left column: measured ESG framing */}
          <div className="flex flex-col items-start text-left">
            <SectionReveal simple={simple}>
              <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-emerald-800 shadow-xs md:text-sm">
                Environment & sustainability · sample framework
              </span>
            </SectionReveal>

            <SectionReveal simple={simple} delay={0.08}>
              <h2 className="mb-6 text-4xl font-bold leading-[1.08] tracking-tight text-[#000080] md:text-5xl lg:text-6xl">
                Lower-impact operations, measured over time.
              </h2>
            </SectionReveal>

            <SectionReveal simple={simple} delay={0.16}>
              <p className="mb-10 max-w-xl text-base font-normal leading-relaxed text-slate-600 md:text-lg">
                This illustrative ESG panel shows how an industrial operator can structure fuel, air-quality, and governance programmes around evidence and review. Figures and programme descriptions are placeholders for layout review.
              </p>
            </SectionReveal>

            <div className="w-full max-w-xl space-y-8">
              {PILLARS.map((pillar, index) => (
                <SectionReveal key={pillar.title} simple={simple} delay={0.24 + index * 0.08}>
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl border border-slate-200/80 bg-white text-emerald-600 shadow-xs">
                      <pillar.icon className="h-6 w-6 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="mb-1.5 text-lg font-bold text-[#000080] md:text-xl">
                        {pillar.title}
                      </h3>
                      <p className="text-sm font-normal leading-relaxed text-slate-600 md:text-base">
                        {pillar.body}
                      </p>
                    </div>
                  </div>
                </SectionReveal>
              ))}
            </div>

            <SectionReveal simple={simple} delay={0.48}>
              <button
                type="button"
                onClick={onDownloadReport}
                className="group mt-10 inline-flex items-center gap-2.5 rounded-full bg-[#000080] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-[#000060] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#000080] focus-visible:ring-offset-2"
              >
                <Download className="h-4 w-4" />
                <span>View sample 2026 ESG report</span>
              </button>
            </SectionReveal>
          </div>

          {/* Right column: composed static visual */}
          <SectionReveal
            simple={simple}
            delay={0.20}
            y={0}
            duration={DUR.slow}
            className="relative flex w-full items-center justify-center lg:justify-end"
          >
            <div className="relative h-[500px] w-full max-w-[560px] lg:h-[600px]">
              <div className="relative h-full w-full rounded-[1.75rem] border border-slate-200/80 bg-white p-[3px] shadow-[0_20px_50px_rgba(0,0,128,0.12)]">
                <div className="relative h-full w-full overflow-hidden rounded-[1.6rem] bg-slate-900">
                  <Image
                    src={imageUrl}
                    alt="Illustrative sustainable manufacturing environment"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-center"
                    priority={false}
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-70"
                  />
                </div>
              </div>

              <div className="absolute -left-6 bottom-10 z-20 max-w-[250px] rounded-2xl border border-slate-200/80 bg-white/95 p-6 text-left shadow-[0_20px_50px_rgba(0,0,80,0.16)] backdrop-blur-xl md:-left-10">
                <div className="mb-2 flex items-center gap-2">
                  <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Illustrative 2030 target
                  </span>
                </div>
                <div className="my-2 font-mono text-4xl font-extrabold tracking-tighter text-[#000080]">
                  -30%
                </div>
                <p className="text-sm font-normal leading-snug text-slate-600">
                  Targeted reduction in process carbon intensity.
                </p>
                <p className="mt-3 border-t border-slate-200 pt-2 font-mono text-[10px] uppercase tracking-wider text-slate-400">
                  Sample figure · not certified
                </p>
              </div>
            </div>
          </SectionReveal>
        </div>

        <SectionReveal simple={simple} delay={0.56}>
          <p className="mx-auto mt-14 max-w-4xl rounded-2xl border border-slate-200/80 bg-white/60 px-5 py-4 text-center font-mono text-[11px] uppercase tracking-[0.14em] text-slate-500">
            Mock design note · targets, programme descriptions, report link, and imagery are realistic placeholders, not verified corporate disclosures.
          </p>
        </SectionReveal>
      </div>
    </section>
  );
};

export default SustainabilitySection;
