'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import FectoNavbar from '@/components/FectoNavbar';
import CorporateFooter from '@/components/CorporateFooter';
import QuoteModal from '@/components/QuoteModal';
import { InnerPageHero } from '@/components/InnerPageHero';
import { 
  Users, 
  Sparkles, 
  Quote, 
  ChevronLeft, 
  ChevronRight, 
  Heart, 
  Award, 
  Target, 
  ShieldCheck,
  Star,
  Camera
} from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  caption: string;
  image: string;
  aspect: string; // for masonry height variation
}

interface Testimonial {
  id: string;
  name: string;
  role: string;
  department: string;
  tenure: string;
  quote: string;
  avatarBg: string;
  initials: string;
}

export default function LifeAtFectoPage() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  const galleryItems: GalleryItem[] = [
    {
      id: 'g-1',
      title: 'Annual Engineering Summit 2025',
      category: 'Innovation & Strategy',
      caption: 'Plant engineers and corporate executives presenting thermodynamic optimization models for kiln line 2.',
      image: '/images/company-hq.jpg',
      aspect: 'h-80',
    },
    {
      id: 'g-2',
      title: 'Central Control Room (CCR) Operations',
      category: 'Advanced Automation',
      caption: 'Real-time SCADA telemetry monitoring continuous pyro-processing and raw meal blending.',
      image: '/images/company-plant.jpg',
      aspect: 'h-96',
    },
    {
      id: 'g-3',
      title: 'Women in Heavy Industry Mentorship',
      category: 'Diversity & Inclusion',
      caption: 'Empowering chemical, mechanical, and safety engineers across industrial plant operations.',
      image: '/herobg.jpg',
      aspect: 'h-80',
    },
    {
      id: 'g-4',
      title: 'Comprehensive ISO Safety Drills',
      category: 'Zero Harm Culture',
      caption: 'Weekly rapid-response training and confined space evacuation drills at the Sangjani packing plant.',
      image: '/images/company-plant.jpg',
      aspect: 'h-96',
    },
    {
      id: 'g-5',
      title: 'Graduate Trainee Cohort Graduation',
      category: 'Youth Development',
      caption: 'Welcoming 30 newly certified graduate engineers into permanent rotational leadership roles.',
      image: '/images/company-hq.jpg',
      aspect: 'h-80',
    },
    {
      id: 'g-6',
      title: 'Environmental Tree Plantation Drive',
      category: 'Community Welfare',
      caption: 'Planting over 5,000 indigenous trees around the Margalla green buffer zone at Sangjani.',
      image: '/herobg.jpg',
      aspect: 'h-80',
    },
  ];

  const testimonials: Testimonial[] = [
    {
      id: 't-1',
      name: 'Engr. Sarah Abbasi',
      role: 'Lead Chemical & Process Engineer',
      department: 'Thermodynamics & Pyro-Processing',
      tenure: '6 Years at Fecto',
      quote: 'Starting as a trainee and growing into a Plant Section Head has been a defining journey. Fecto invests deeply in its people, providing the advanced European machinery, data systems, and autonomy to solve massive engineering challenges every single day.',
      avatarBg: 'bg-gradient-to-tr from-[#000080] to-blue-600',
      initials: 'SA',
    },
    {
      id: 't-2',
      name: 'Hamza Tariq',
      role: 'Senior Instrumentation & Automation Specialist',
      department: 'Electrical Engineering & SCADA',
      tenure: '4 Years at Fecto',
      quote: 'The focus on zero-harm safety and robotic instrumentation gives us the psychological safety and technical freedom to innovate. You are encouraged to optimize fuel blends and improve power efficiency with full executive backing.',
      avatarBg: 'bg-gradient-to-tr from-[#8B5E1A] to-[#F4D5AB]',
      initials: 'HT',
    },
    {
      id: 't-3',
      name: 'Zainab Raza',
      role: 'Head of Quality Assurance & Spectrometry',
      department: 'Laboratory & Material Sciences',
      tenure: '8 Years at Fecto',
      quote: 'Here, you do not just manufacture bags of cement; you see your work manifested in the foundations of national motorways, major dams, and urban skylines. The collective pride across our Sangjani team is unmatched anywhere in the industry.',
      avatarBg: 'bg-gradient-to-tr from-emerald-600 to-teal-800',
      initials: 'ZR',
    },
  ];

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="min-h-screen bg-[#F1F5F9] text-slate-900 selection:bg-[#F4D5AB] selection:text-[#000080]">
      {/* 1. FLOATING NAVBAR */}
      <FectoNavbar onCtaClick={() => setQuoteModalOpen(true)} />

      {/* SECTION 1: THE UNIVERSAL HERO */}
      <InnerPageHero
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Careers', href: '#careers' },
          { label: 'Life at Fecto' },
        ]}
        title="More Than a Workplace."
        subtitle="A culture of excellence, inclusive collaboration, and relentless innovation."
      />

      {/* SECTION 2: THE CULTURAL MASONRY GALLERY */}
      <section className="bg-[#F1F5F9] py-24 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#8B5E1A]">Life Inside the Gates</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#000080] mt-1 tracking-tight">
              A Vibrant Community of Nation-Builders
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
              Step inside our Sangjani operations and corporate headquarters. Experience the teamwork, technological camaraderie, and shared purpose driving our daily accomplishments.
            </p>
          </div>

          {/* Masonry-Style Responsive Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.1 }}
                className={`relative rounded-3xl overflow-hidden group shadow-md hover:shadow-2xl transition-all duration-300 ${item.aspect}`}
              >
                {/* Background Image */}
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Base Gradient Shadow for Legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                {/* Always Visible Category Pill */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-white/90 text-[#000080] backdrop-blur-md shadow-xs">
                    {item.category}
                  </span>
                </div>

                {/* Content Box with Hover Reveal */}
                <div className="absolute inset-x-0 bottom-0 p-6 z-10 text-white flex flex-col justify-end">
                  <h3 className="text-xl font-bold text-white group-hover:text-[#F4D5AB] transition-colors leading-snug mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed opacity-90 group-hover:opacity-100 transition-opacity">
                    {item.caption}
                  </p>
                </div>

                {/* Dark Hover Overlay */}
                <div className="absolute inset-0 bg-[#000080]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: EMPLOYEE TESTIMONIAL SLIDER (Dark Navy Container with Manual Carousel) */}
      <section className="bg-[#000080] py-24 text-white relative overflow-hidden">
        {/* Decorative Ambient Background Glows */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#F4D5AB] rounded-full blur-[130px] opacity-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600 rounded-full blur-[130px] opacity-20 pointer-events-none" />

        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6 pb-6 border-b border-white/10">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#F4D5AB]">Voice of Our People</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
                Real Stories. Proven Journeys.
              </h2>
            </div>

            {/* Slider Navigation Arrows */}
            <div className="flex items-center gap-3">
              <button
                onClick={prevSlide}
                aria-label="Previous testimonial"
                className="w-12 h-12 rounded-full bg-white/10 hover:bg-white text-white hover:text-[#000080] flex items-center justify-center transition-all border border-white/20 active:scale-95"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextSlide}
                aria-label="Next testimonial"
                className="w-12 h-12 rounded-full bg-white/10 hover:bg-white text-white hover:text-[#000080] flex items-center justify-center transition-all border border-white/20 active:scale-95"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Testimonial Active Card with AnimatePresence */}
          <div className="relative min-h-[340px]">
            <AnimatePresence mode="wait">
              {testimonials.map((item, idx) => {
                if (idx !== activeSlide) return null;

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.45, ease: 'easeOut' }}
                    className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 sm:p-12 border border-white/15 shadow-2xl relative"
                  >
                    {/* Stylized Giant Quote Watermark */}
                    <div className="absolute top-6 right-8 text-[#F4D5AB]/20 pointer-events-none">
                      <Quote className="w-24 h-24" />
                    </div>

                    <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-8">
                      {/* Avatar Circle */}
                      <div className="flex-shrink-0">
                        <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full ${item.avatarBg} text-white flex items-center justify-center text-2xl sm:text-3xl font-black shadow-lg border-4 border-white/20`}>
                          {item.initials}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        {/* Rating Stars */}
                        <div className="flex items-center gap-1 text-[#F4D5AB] mb-4">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-current" />
                          ))}
                          <span className="text-xs text-blue-200 ml-2 font-mono font-medium">
                            {item.tenure}
                          </span>
                        </div>

                        {/* Quote Text */}
                        <p className="text-lg sm:text-xl md:text-2xl font-medium text-white leading-relaxed mb-6 italic">
                          &ldquo;{item.quote}&rdquo;
                        </p>

                        {/* Author Info */}
                        <div>
                          <div className="text-base sm:text-lg font-bold text-white">
                            {item.name}
                          </div>
                          <div className="text-xs sm:text-sm text-[#F4D5AB] font-medium">
                            {item.role} • <span className="text-slate-300">{item.department}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveSlide(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  activeSlide === i ? 'w-8 bg-[#F4D5AB]' : 'w-2.5 bg-white/30 hover:bg-white/60'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CORPORATE MEGA FOOTER */}
      <CorporateFooter onRequestQuote={() => setQuoteModalOpen(true)} />

      {/* INTERACTIVE QUOTE MODAL */}
      <QuoteModal isOpen={quoteModalOpen} onClose={() => setQuoteModalOpen(false)} />
    </div>
  );
}

