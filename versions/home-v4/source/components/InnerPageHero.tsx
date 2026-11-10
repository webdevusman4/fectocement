'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface InnerPageHeroProps {
  breadcrumbs: BreadcrumbItem[];
  title: string;
  subtitle: string;
  textureImageUrl?: string;
  className?: string;
}

export const InnerPageHero: React.FC<InnerPageHeroProps> = ({
  breadcrumbs,
  title,
  subtitle,
  textureImageUrl = '/herobg.jpg',
  className = '',
}) => {
  return (
    <section className={`relative w-full pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden flex flex-col items-center justify-center text-center bg-[#000080] ${className}`}>
      {/* 1. Base Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#000080] via-[#000050] to-[#040814]" />

      {/* 2. Abstract Texture/Image Layer */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <Image
          src={textureImageUrl}
          alt="Architectural Texture Background"
          fill
          priority
          sizes="100vw"
          className="w-full h-full object-cover mix-blend-overlay opacity-25"
        />
      </div>

      {/* 3. Ambient Glow (The Premium Touch) */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#F4D5AB] rounded-full filter blur-[128px] opacity-35 pointer-events-none animate-pulse" />

      {/* Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 flex flex-col items-center">
        {/* Breadcrumbs with subtle glow */}
        <nav aria-label="Breadcrumb" className="text-[#F4D5AB] tracking-widest text-sm font-bold uppercase mb-6 drop-shadow-md flex items-center justify-center gap-2">
          {breadcrumbs.map((item, idx) => (
            <React.Fragment key={idx}>
              {idx > 0 && <ChevronRight className="w-3.5 h-3.5 opacity-60 flex-shrink-0" />}
              {item.href ? (
                <Link href={item.href} className="hover:underline opacity-80 hover:opacity-100 transition-opacity">
                  {item.label}
                </Link>
              ) : (
                <span className="text-[#F4D5AB] font-bold">{item.label}</span>
              )}
            </React.Fragment>
          ))}
        </nav>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight mb-6 drop-shadow-2xl max-w-4xl leading-[1.1]"
        >
          {title}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed"
        >
          {subtitle}
        </motion.p>
      </div>
    </section>
  );
};

export default InnerPageHero;
