'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import FectoNavbar from '@/components/FectoNavbar';
import CorporateFooter from '@/components/CorporateFooter';
import QuoteModal from '@/components/QuoteModal';
import { InnerPageHero } from '@/components/InnerPageHero';
import { 
  GraduationCap, 
  Compass, 
  RotateCw, 
  UserCheck, 
  Award, 
  CheckCircle2, 
  Send, 
  Wrench, 
  Zap, 
  FlaskConical, 
  ArrowRight,
  Bell,
  Sparkles
} from 'lucide-react';

export default function TraineeProgramsPage() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [notifyEmail, setNotifyEmail] = useState('');
  const [notified, setNotified] = useState(false);

  const roadmapPhases = [
    {
      phase: 'Phase 01',
      months: 'Months 1–2',
      title: 'Onboarding & Plant Orientation',
      description: 'Intensive immersion into industrial zero-harm safety protocols, plant topology, raw quarry geology, and corporate governance.',
      icon: Compass,
      highlights: ['ISO 45001 safety certification', 'Raw quarry & mining overview', 'Leadership fireside sessions'],
    },
    {
      phase: 'Phase 02',
      months: 'Months 3–6',
      title: 'Technical Rotations',
      description: 'Hands-on operational rotations through European dry-process kilns, grinding ball mills, quality labs, and electrical substations.',
      icon: RotateCw,
      highlights: ['DCS automation training', 'XRF spectroscopy sampling', 'Preventative maintenance drills'],
    },
    {
      phase: 'Phase 03',
      months: 'Months 7–9',
      title: 'Shadowing Leadership',
      description: 'Direct apprenticeship paired alongside Senior Shift In-Charges and Chief Engineers during live plant debottlenecking operations.',
      icon: UserCheck,
      highlights: ['Thermodynamic energy audits', 'Alternative fuel (RDF) trials', 'Production dispatch planning'],
    },
    {
      phase: 'Phase 04',
      months: 'Months 10–12',
      title: 'Independent Capstone Project',
      description: 'Execute an independent plant optimization initiative under executive board review, followed by permanent junior managerial placement.',
      icon: Award,
      highlights: ['Executive board presentation', 'Patent / efficiency proposal', 'Permanent managerial contract'],
    },
  ];

  const specializationTracks = [
    {
      id: 'mechanical',
      title: 'Mechanical Engineering Track',
      discipline: 'B.Sc / B.E. Mechanical Engineering',
      tag: 'Heavy Machinery & Thermo-Fluids',
      icon: Wrench,
      accent: 'from-blue-600/10 to-indigo-600/5',
      learnings: [
        'Vibration analysis & precision alignment of high-speed rotary kiln tires and drive gearboxes.',
        'Pneumatic transport, clinker cooler hydraulic grate hydraulics, and automated baghouse filtration.',
        'Root-cause failure analysis (RCFA) and preventive maintenance engineering for vertical roller mills.',
      ],
      careerProspects: 'Kiln Maintenance Engineer • Mechanical Workshop In-Charge • Reliability Specialist',
    },
    {
      id: 'electrical',
      title: 'Electrical & Instrumentation Track',
      discipline: 'B.Sc / B.E. Electrical / Electronics',
      tag: 'Automation, SCADA & Power Systems',
      icon: Zap,
      accent: 'from-amber-600/10 to-orange-600/5',
      learnings: [
        'Configuration and programming of ABB / Siemens distributed control systems (DCS) and industrial PLCs.',
        'High-voltage captive substation operation (132kV/11kV/6.6kV) and synchronized power distribution.',
        'Field instrumentation: pyrometers, acoustic flow meters, online gas analyzers, and robotic sample shuttles.',
      ],
      careerProspects: 'DCS Automation Specialist • Substation Electrical Engineer • Instrumentation Lead',
    },
    {
      id: 'chemical',
      title: 'Chemical & Materials Track',
      discipline: 'B.Sc / B.E. Chemical / Materials Science',
      tag: 'Thermodynamics & Material Chemistry',
      icon: FlaskConical,
      accent: 'from-emerald-600/10 to-teal-600/5',
      learnings: [
        'Thermodynamic simulation of clinker phase chemistry (Alite, Belite, Ferrite, Aluminate).',
        'Refuse-Derived Fuel (RDF) and agricultural biomass combustion kinetics cutting fossil fuel emissions.',
        'Robotic XRF / XRD spectrometry analysis calibrating PSQCA & ASTM quality standards.',
      ],
      careerProspects: 'Process Chemical Engineer • Quality Control Manager • Environmental Compliance Officer',
    },
  ];

  const handleNotifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (notifyEmail.trim()) {
      setNotified(true);
      setTimeout(() => {
        setNotifyEmail('');
      }, 3000);
    }
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
          { label: 'Trainee Programs' },
        ]}
        title="The Future Leaders Program."
        subtitle="Accelerate your career with our rigorous, hands-on graduate engineering tracks."
      />

      {/* SECTION 2: THE PROGRAM ROADMAP (Horizontal Stepping-Stone Timeline) */}
      <section className="bg-[#F1F5F9] py-24 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#8B5E1A]">12-Month Structured Curriculum</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#000080] mt-1 tracking-tight">
              From Fresh Graduate to Certified Industrial Leader
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
              Our Graduate Trainee Engineer (GTE) program immerses emerging engineers in high-stakes plant environments under the tutelage of senior industrial veterans.
            </p>
          </div>

          {/* Stepping-Stone 4-Phase Grid with Connecting Line */}
          <div className="relative">
            {/* Desktop Connecting Vector Bar */}
            <div className="hidden lg:block absolute top-1/2 -translate-y-12 inset-x-12 h-1 bg-gradient-to-r from-[#000080] via-[#8B5E1A] to-[#000080] z-0 opacity-20" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
              {roadmapPhases.map((phase, index) => {
                const Icon = phase.icon;
                return (
                  <motion.div
                    key={phase.phase}
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: index * 0.12 }}
                    className="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-[0_10px_35px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_45px_rgba(0,0,128,0.08)] transition-all flex flex-col justify-between group hover:-translate-y-1.5"
                  >
                    <div>
                      {/* Step Header Badge */}
                      <div className="flex items-center justify-between mb-6">
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#000080] text-[#F4D5AB] font-mono">
                          {phase.phase}
                        </span>
                        <span className="text-xs font-mono font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                          {phase.months}
                        </span>
                      </div>

                      {/* Icon */}
                      <div className="w-12 h-12 rounded-2xl bg-[#000080]/5 text-[#000080] flex items-center justify-center mb-4 group-hover:bg-[#000080] group-hover:text-white transition-all duration-300">
                        <Icon className="w-6 h-6" />
                      </div>

                      <h3 className="text-lg font-extrabold text-[#000080] mb-2 leading-snug">
                        {phase.title}
                      </h3>

                      <p className="text-xs text-slate-600 leading-relaxed mb-6">
                        {phase.description}
                      </p>
                    </div>

                    {/* Bullet Highlights */}
                    <div className="pt-4 border-t border-slate-100 space-y-1.5">
                      {phase.highlights.map((h, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-xs text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: SPECIALIZATION BENTO GRID & MASSIVE CTA */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#8B5E1A]">Disciplines & Tracks</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#000080] mt-1">
              Select Your Engineering Pathway
            </h2>
            <p className="text-sm sm:text-base text-slate-500 mt-2">
              Each specialization is designed around hands-on heavy plant infrastructure, PEC accreditation standards, and practical leadership competencies.
            </p>
          </div>

          {/* 3 Large Bento Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
            {specializationTracks.map((track, idx) => {
              const TrackIcon = track.icon;
              return (
                <div
                  key={track.id}
                  className="bg-[#F8FAFC] rounded-3xl p-8 border border-slate-200/80 shadow-[0_4px_25px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_40px_rgba(0,0,128,0.08)] transition-all flex flex-col justify-between group hover:-translate-y-1 relative overflow-hidden"
                >
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${track.accent} rounded-bl-full pointer-events-none group-hover:scale-125 transition-transform duration-500`} />

                  <div>
                    {/* Header Pill */}
                    <div className="w-12 h-12 rounded-2xl bg-white text-[#000080] flex items-center justify-center shadow-xs mb-6 group-hover:bg-[#000080] group-hover:text-white transition-colors">
                      <TrackIcon className="w-6 h-6" />
                    </div>

                    <span className="text-xs font-bold uppercase tracking-wider text-[#8B5E1A] mb-1 block">
                      {track.tag}
                    </span>

                    <h3 className="text-2xl font-bold text-[#000080] mb-2 leading-snug">
                      {track.title}
                    </h3>

                    <div className="text-xs font-mono font-medium text-slate-500 mb-6 bg-white px-3 py-1.5 rounded-xl border border-slate-200 inline-block">
                      {track.discipline}
                    </div>

                    {/* What You Will Learn */}
                    <div className="space-y-3 mb-6">
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        What You Will Master:
                      </div>
                      {track.learnings.map((bullet, bIdx) => (
                        <div key={bIdx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#000080] mt-2 flex-shrink-0" />
                          <span>{bullet}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Career Prospects */}
                  <div className="pt-6 border-t border-slate-200/80">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                      Placement Roles:
                    </div>
                    <div className="text-xs font-mono text-[#000080] font-semibold">
                      {track.careerProspects}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Massive CTA Block */}
          <div className="bg-gradient-to-br from-[#000080] via-[#000050] to-[#040814] text-white rounded-3xl p-10 md:p-14 shadow-2xl relative overflow-hidden border border-white/10">
            {/* Ambient Gold Glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#F4D5AB] rounded-full blur-[120px] opacity-25 pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="max-w-2xl text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-[#F4D5AB] border border-white/10 mb-4">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>2027 Cohort Recruitment Schedule</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2 tracking-tight">
                  Applications for the 2027 Cohort Open in August.
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Graduating engineers from PEC-accredited universities across Pakistan can register early to receive direct reminders, sample aptitude papers, and interview schedules.
                </p>
              </div>

              {/* Notify Me Input Field */}
              <div className="w-full lg:w-auto">
                {notified ? (
                  <div className="bg-emerald-500/20 border border-emerald-400/40 rounded-2xl p-4 flex items-center justify-center gap-2 text-emerald-200 text-sm font-bold">
                    <CheckCircle2 className="w-5 h-5 text-emerald-300" />
                    <span>You&apos;re registered! We will notify you when applications open.</span>
                  </div>
                ) : (
                  <form onSubmit={handleNotifySubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
                    <input
                      type="email"
                      required
                      placeholder="Enter graduate email address..."
                      value={notifyEmail}
                      onChange={(e) => setNotifyEmail(e.target.value)}
                      className="px-5 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#F4D5AB] backdrop-blur-md"
                    />
                    <button
                      type="submit"
                      className="px-6 py-3.5 rounded-xl bg-[#F4D5AB] text-[#000080] font-extrabold text-sm hover:bg-white transition-all shadow-lg flex items-center justify-center gap-2 active:scale-95 whitespace-nowrap"
                    >
                      <Bell className="w-4 h-4" />
                      <span>Notify Me</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
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

