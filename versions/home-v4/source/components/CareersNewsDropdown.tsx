'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Briefcase, 
  Sparkles, 
  GraduationCap, 
  ShieldCheck, 
  Newspaper, 
  Bell, 
  FileText, 
  Layers, 
  Image as ImageIcon, 
  ArrowUpRight 
} from 'lucide-react';

interface DropdownProps {
  isOpen: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onSelectLink?: (link: string) => void;
}

const springTransition = { type: "spring" as const, stiffness: 350, damping: 25 };

export const CareersNewsDropdown: React.FC<DropdownProps> = ({
  isOpen,
  onMouseEnter,
  onMouseLeave,
  onSelectLink,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="region"
          aria-label="Careers and news submenu"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          className="absolute left-1/2 -translate-x-1/2 top-full w-[640px]"
          style={{ zIndex: 50 }}
        >
          {/* Invisible bridge — pt-4 ensures dropdown never closes when cursor moves down */}
          <div className="pt-4">
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              transition={springTransition}
              className="bg-white/95 backdrop-blur-2xl shadow-[0_30px_60px_-15px_rgba(0,0,128,0.15)] border border-white rounded-2xl p-7 relative overflow-hidden"
            >
              {/* Header Bar */}
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#000080]/10">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#000080]/10 text-[#000080]">
                    <Briefcase className="w-4 h-4" />
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-[#000080] tracking-wide">
                      Talent, Culture & Corporate Media Center
                    </h3>
                    <p className="text-xs text-slate-500">
                      Industrial Careers at Sangjani & Official Corporate Communications
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-blue-50 text-[#000080] border border-blue-200">
                    We're Hiring
                  </span>
                </div>
              </div>

              {/* 2 Column Grid */}
              <div className="grid grid-cols-2 gap-6">
                
                {/* ============================================================ */}
                {/* COLUMN 1: JOIN OUR TEAM                                      */}
                {/* ============================================================ */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    <Users className="w-3.5 h-3.5 text-[#8B5E1A]" />
                    <span>Join Our Team</span>
                  </div>
                  <ul className="space-y-1 text-sm">
                    <li>
                      <a
                        href="/careers/overview"
                        onClick={() => onSelectLink?.('Careers Overview & Open Roles')}
                        className="group block p-2.5 rounded-xl transition-all duration-200 hover:bg-[#000080]/5"
                      >
                        <div className="font-medium text-[#000080] flex items-center justify-between">
                          <span className="flex items-center gap-1.5">
                            Careers Overview & Open Roles
                            <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#8B5E1A]" />
                          </span>
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5">Engineering, plant operations & management vacancies</div>
                      </a>
                    </li>
                    <li>
                      <a
                        href="/careers/life-at-fecto"
                        onClick={() => onSelectLink?.('Life at Fecto')}
                        className="group block p-2.5 rounded-xl transition-all duration-200 hover:bg-[#000080]/5"
                      >
                        <div className="font-medium text-[#000080] flex items-center justify-between">
                          <span className="flex items-center gap-1.5">
                            Life at Fecto
                            <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#8B5E1A]" />
                          </span>
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5">Values, inclusive workplace & professional growth</div>
                      </a>
                    </li>
                    <li>
                      <a
                        href="/careers/trainee-programs"
                        onClick={() => onSelectLink?.('Engineering Trainee Programs')}
                        className="group block p-2.5 rounded-xl transition-all duration-200 hover:bg-[#000080]/5"
                      >
                        <div className="font-medium text-[#000080] flex items-center justify-between">
                          <span className="flex items-center gap-1.5">
                            Engineering Trainee Programs
                            <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#8B5E1A]" />
                          </span>
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5">Graduate mechanical, electrical & chemical tracks</div>
                      </a>
                    </li>
                    <li>
                      <a
                        href="/careers/workplace-safety"
                        onClick={() => onSelectLink?.('Workplace Safety')}
                        className="group block p-2.5 rounded-xl transition-all duration-200 hover:bg-[#000080]/5"
                      >
                        <div className="font-medium text-[#000080] flex items-center justify-between">
                          <span className="flex items-center gap-1.5">
                            Workplace Safety
                            <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#8B5E1A]" />
                          </span>
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5">Zero-harm occupational health & industrial standards</div>
                      </a>
                    </li>
                  </ul>
                </div>

                {/* ============================================================ */}
                {/* COLUMN 2: MEDIA CENTER                                       */}
                {/* ============================================================ */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    <Newspaper className="w-3.5 h-3.5 text-[#8B5E1A]" />
                    <span>Media Center</span>
                  </div>
                  <ul className="space-y-1 text-sm">
                    <li>
                      <a
                        href="/media/news"
                        onClick={() => onSelectLink?.('News & Announcements')}
                        className="group block p-2.5 rounded-xl transition-all duration-200 hover:bg-[#000080]/5"
                      >
                        <div className="font-medium text-[#000080] flex items-center justify-between">
                          <span className="flex items-center gap-1.5">
                            News & Announcements
                            <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#8B5E1A]" />
                          </span>
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5">Latest corporate developments & production milestones</div>
                      </a>
                    </li>
                    <li>
                      <a
                        href="/media/press-releases"
                        onClick={() => onSelectLink?.('Press Releases')}
                        className="group block p-2.5 rounded-xl transition-all duration-200 hover:bg-[#000080]/5"
                      >
                        <div className="font-medium text-[#000080] flex items-center justify-between">
                          <span className="flex items-center gap-1.5">
                            Press Releases
                            <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#8B5E1A]" />
                          </span>
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5">Official statements & leadership announcements</div>
                      </a>
                    </li>
                    <li>
                      <a
                        href="/media/case-studies"
                        onClick={() => onSelectLink?.('Mega-Project Case Studies')}
                        className="group block p-2.5 rounded-xl transition-all duration-200 hover:bg-[#000080]/5"
                      >
                        <div className="font-medium text-[#000080] flex items-center justify-between">
                          <span className="flex items-center gap-1.5">
                            Mega-Project Case Studies
                            <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#8B5E1A]" />
                          </span>
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5">M-2 Motorway, Tarbela Dam & high-rise structural pours</div>
                      </a>
                    </li>
                    <li>
                      <a
                        href="/media/brand-kit"
                        onClick={() => onSelectLink?.('Media Assets & Brand Kit')}
                        className="group block p-2.5 rounded-xl transition-all duration-200 hover:bg-[#000080]/5"
                      >
                        <div className="font-medium text-[#000080] flex items-center justify-between">
                          <span className="flex items-center gap-1.5">
                            Media Assets & Brand Kit
                            <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#8B5E1A]" />
                          </span>
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5">High-res logos, brand guidelines & plant photography</div>
                      </a>
                    </li>
                  </ul>
                </div>

              </div>

              {/* Bottom Callout Bar */}
              <div className="mt-6 pt-4 border-t border-[#000080]/10 flex items-center justify-between text-xs text-slate-500 font-normal">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#000080]" />
                  HR Department: Head Office, Karachi & Sangjani Complex
                </span>
                <a
                  href="/careers/overview"
                  className="font-bold text-[#000080] hover:text-[#8B5E1A] transition-colors flex items-center gap-1"
                >
                  View All Open Roles →
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CareersNewsDropdown;
