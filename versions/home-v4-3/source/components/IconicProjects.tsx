'use client';

import React from 'react';
import Image from 'next/image';
import { MapPin, ArrowRight, ArrowUpRight } from 'lucide-react';
import { useMotionPrefs } from '../hooks/useMotionPrefs';
import { Z } from '../lib/motion';
import { SectionReveal } from './SectionReveal';

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
  staticReveal?: boolean;
}

const PROJECTS: ProjectItem[] = [
  {
    id: 'motorway',
    title: 'National motorway corridor',
    location: 'Salt Range, Pakistan',
    metric: 'Sample volume · 1.2M tonnes',
    image: '/Gemini_Generated_Image_1jfr2q1jfr2q1jfr.jpg',
    gridClass: 'lg:col-span-2 lg:row-span-2',
    minHeightClass: 'min-h-[460px] lg:min-h-[620px]',
  },
  {
    id: 'tarbela',
    title: 'Hydraulic dam extension',
    location: 'KPK, Pakistan',
    metric: 'Sample application · sulphate resistance',
    image: '/tarbala.jpg',
    gridClass: 'lg:col-span-1',
    minHeightClass: 'min-h-[290px] lg:min-h-[295px]',
  },
  {
    id: 'towers',
    title: 'Financial district towers',
    location: 'Karachi, Pakistan',
    metric: 'Sample application · high-rise OPC',
    image: '/images/project-towers.jpg',
    gridClass: 'lg:col-span-1',
    minHeightClass: 'min-h-[290px] lg:min-h-[295px]',
  },
];

/**
 * Iconic Projects — executive-restraint portfolio grid.
 *
 * Static sheet geometry, one-time card reveals, always-visible sample metrics,
 * restrained hover states, and static mobile/reduced-motion/capture output.
 */
export const IconicProjects: React.FC<IconicProjectsProps> = ({
  onViewAllProjects,
  onSelectProject,
  className = '',
  staticReveal = false,
}) => {
  const { simple: prefersSimple } = useMotionPrefs();
  const simple = prefersSimple || staticReveal;

  // Preserve the defensive class sanitization used by earlier versions.
  const sanitizedClassName = className
    .replace(/\bbg-white\b/g, '')
    .replace(/\bbg-\[#\w+\]\b/g, '')
    .replace(/\bbg-\S+\b/g, '')
    .replace(/\bz-\[\d+\]\b/g, '')
    .replace(/\brelative\b/g, '')
    .trim();

  return (
    <section
      id="projects"
      data-tone="light"
      className={`relative -mt-10 w-full scroll-mt-20 rounded-t-[40px] bg-[linear-gradient(#F4D5AB,#EEF3F9_45svh)] pb-32 pt-20 text-slate-900 shadow-[0_-20px_60px_rgba(0,0,60,0.2)] sm:pb-40 md:pb-48 md:pt-24 ${Z.skyline} ${sanitizedClassName}`}
    >
      <div className="mx-auto max-w-7xl px-6">
        <SectionReveal
          simple={simple}
          className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end"
        >
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/70 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-[#8B5E1A] shadow-xs backdrop-blur-md md:text-sm">
              Illustrative project references
            </span>
            <h2 className="mt-3 text-4xl font-bold leading-[1.12] tracking-tight text-[#000080] md:text-5xl">
              Specified for infrastructure that endures.
            </h2>
          </div>

          <button
            type="button"
            onClick={onViewAllProjects}
            className="group/btn inline-flex w-fit items-center gap-2.5 rounded-full border-2 border-[#000080] px-7 py-3.5 text-sm font-semibold text-[#000080] shadow-sm transition-colors duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-[#000080] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#000080] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F4D5AB]"
          >
            <span>Discuss a project</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/btn:translate-x-0.5" />
          </button>
        </SectionReveal>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {PROJECTS.map((project, index) => (
            <SectionReveal
              key={project.id}
              simple={simple}
              delay={index * 0.08}
              y={0}
              className={`h-full ${project.gridClass}`}
            >
              <div
                onClick={() => onSelectProject?.(project.title)}
                className={`group relative h-full w-full cursor-pointer overflow-hidden rounded-3xl border border-slate-100/80 shadow-[0_18px_45px_-8px_rgba(0,0,128,0.15)] transition-[box-shadow,border-color] duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-white/70 hover:shadow-[0_26px_60px_-16px_rgba(0,0,128,0.25)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#000080] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EEF3F9] ${project.minHeightClass}`}
                role="button"
                tabIndex={0}
                aria-label={`Discuss sample project: ${project.title}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectProject?.(project.title);
                  }
                }}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02] group-focus-visible:scale-[1.02]"
                  priority={false}
                />

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-3/5 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
                />

                <div className="absolute left-6 top-6 z-10 rounded-full border border-white/30 bg-white/15 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-white backdrop-blur-md">
                  Sample 0{index + 1}
                </div>

                <div className="absolute right-6 top-6 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white shadow-md backdrop-blur-md transition-colors duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:border-[#F4D5AB] group-hover:bg-[#F4D5AB] group-hover:text-[#000080] group-focus-visible:border-[#F4D5AB] group-focus-visible:bg-[#F4D5AB] group-focus-visible:text-[#000080]">
                  <ArrowUpRight className="h-5 w-5" />
                </div>

                <div className="pointer-events-none relative z-10 flex h-full flex-col justify-end p-8 text-left">
                  <h3 className="mb-2 text-2xl font-bold leading-snug tracking-tight text-white drop-shadow-sm md:text-3xl">
                    {project.title}
                  </h3>
                  <div className="mb-3 flex items-center gap-2 text-sm font-medium text-gray-200 drop-shadow-sm">
                    <MapPin className="h-4 w-4 flex-shrink-0 text-[#F4D5AB]" />
                    <span>{project.location}</span>
                  </div>
                  <div className="border-t border-white/20 pt-3">
                    <div className="inline-flex items-center gap-2 text-sm font-bold tracking-wide text-[#F4D5AB] md:text-base">
                      <span className="h-2 w-2 rounded-full bg-[#F4D5AB]" />
                      <span>{project.metric}</span>
                    </div>
                  </div>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>

        <SectionReveal simple={simple} delay={0.24}>
          <p className="mx-auto mt-10 max-w-4xl rounded-2xl border border-white/70 bg-white/55 px-5 py-4 text-center font-mono text-[11px] uppercase tracking-[0.14em] text-slate-600">
            Mock design note · project names, volumes, applications, and imagery are illustrative placeholders for layout review.
          </p>
        </SectionReveal>
      </div>
    </section>
  );
};

export default IconicProjects;
