'use client';

import React from 'react';
import Image from 'next/image';
import { MapPin, ArrowRight, ArrowUpRight, Building2, ShieldCheck } from 'lucide-react';

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

/**
 * Iconic Projects (Our Footprint) Bento Gallery Section
 * Showcases real-world national infrastructure impact using a high-performance bento grid.
 */
export const IconicProjects: React.FC<IconicProjectsProps> = ({
  onViewAllProjects,
  onSelectProject,
  className = '',
}) => {
  return (
    <section
      id="projects"
      className={`bg-white text-slate-900 py-24 scroll-mt-20 ${className}`}
    >
      <div className="max-w-7xl mx-auto px-6">
        
        {/* ================================================================ */}
        {/* SECTION HEADER: Left Title & Right Action                        */}
        {/* ================================================================ */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          
          <div className="max-w-2xl">
            {/* Eyebrow: Frosted Glass Badge with Bronze text */}
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#000080]/5 border border-[#000080]/10 text-xs md:text-sm font-bold tracking-widest uppercase text-[#8B5E1A]">
              OUR FOOTPRINT
            </span>

            {/* Heading (H2): Fecto Navy #000080, 4xl/5xl, font-bold, tight leading */}
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#000080] mt-3 leading-[1.12]">
              Shaping the nation's skyline.
            </h2>
          </div>

          {/* Action Button: Simple outline button */}
          <button
            type="button"
            onClick={onViewAllProjects}
            className="group/btn inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full border-2 border-[#000080] text-[#000080] font-semibold text-sm transition-all duration-300 hover:bg-[#000080] hover:text-white shadow-sm hover:shadow-md active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#000080] w-fit"
          >
            <span>View all projects</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
          </button>

        </div>

        {/* ================================================================ */}
        {/* THE BENTO-BOX GRID (3 Columns on Desktop, Elevated Float Physics) */}
        {/* ================================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {PROJECTS.map((project) => (
            <div
              key={project.id}
              onClick={() => onSelectProject?.(project.title)}
              className={`relative rounded-3xl overflow-hidden group cursor-pointer ${project.gridClass} ${project.minHeightClass} shadow-[0_18px_45px_-8px_rgba(0,0,128,0.15)] hover:shadow-[0_32px_70px_-12px_rgba(0,0,128,0.28)] hover:-translate-y-2 border border-slate-100 transition-all duration-500`}
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
              
              {/* 1. Background Image: Zoom on Hover */}
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                unoptimized
                priority={false}
              />

              {/* 2. Default Bottom Gradient: Ensures Text Readability */}
              <div 
                className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/85 via-black/35 to-transparent pointer-events-none transition-opacity duration-500 group-hover:opacity-0"
                aria-hidden="true"
              />

              {/* 3. The Navy Sweep (Hover): Sweeps Upwards over 500ms */}
              <div 
                className="absolute inset-0 bg-[#000080]/90 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out pointer-events-none"
                aria-hidden="true"
              />

              {/* Top-Right Corner Arrow Badge */}
              <div className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-[#F4D5AB] group-hover:text-[#000080] group-hover:border-[#F4D5AB] transition-all duration-300 shadow-md">
                <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
              </div>

              {/* 4. Project Data Content */}
              <div className="relative z-10 flex flex-col justify-end h-full p-8 text-left pointer-events-none">
                
                {/* Title: Pure White */}
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight leading-snug">
                  {project.title}
                </h3>

                {/* Location: Light Gray with MapPin icon */}
                <div className="text-gray-300 text-sm font-medium mb-3 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#F4D5AB] flex-shrink-0" />
                  <span>{project.location}</span>
                </div>

                {/* The Hidden Metric: Fades in and slides up on hover */}
                <div className="opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100 pt-2 border-t border-white/20">
                  <div className="inline-flex items-center gap-2 text-[#F4D5AB] font-bold text-sm md:text-base tracking-wide">
                    <span className="w-2 h-2 rounded-full bg-[#F4D5AB]" />
                    <span>{project.metric}</span>
                  </div>
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default IconicProjects;

