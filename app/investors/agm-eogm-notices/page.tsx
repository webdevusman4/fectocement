'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FectoNavbar from '@/components/FectoNavbar';
import CorporateFooter from '@/components/CorporateFooter';
import QuoteModal from '@/components/QuoteModal';
import { InnerPageHero } from '@/components/InnerPageHero';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Download, 
  FileText, 
  ChevronDown, 
  CalendarPlus, 
  CheckCircle2, 
  Users, 
  Video,
  ShieldCheck,
  ExternalLink
} from 'lucide-react';

interface ArchiveMeeting {
  year: string;
  meetingName: string;
  date: string;
  documents: {
    title: string;
    type: string;
    size: string;
    fileUrl: string;
  }[];
}

export default function AgmEogmNoticesPage() {
  const [expandedYear, setExpandedYear] = useState<string>('2025');
  const [calendarAdded, setCalendarAdded] = useState(false);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);

  const archiveMeetings: ArchiveMeeting[] = [
    {
      year: '2025',
      meetingName: '43rd Annual General Meeting (AGM)',
      date: 'October 25, 2025 • 11:00 AM PST',
      documents: [
        { title: 'Notice of 43rd AGM & Agenda (English & Urdu)', type: 'Notice & Agenda', size: '2.4 MB', fileUrl: '#' },
        { title: 'Form of Proxy (Form 34) with CDC Instructions', type: 'Proxy Form', size: '1.1 MB', fileUrl: '#' },
        { title: 'Minutes of the 43rd Annual General Meeting', type: 'Meeting Minutes', size: '3.6 MB', fileUrl: '#' },
        { title: 'Scrutinizer Report on Ballot & Voting Results', type: 'Scrutinizer Report', size: '1.8 MB', fileUrl: '#' },
      ],
    },
    {
      year: '2024',
      meetingName: '42nd Annual General Meeting (AGM)',
      date: 'October 26, 2024 • 11:00 AM PST',
      documents: [
        { title: 'Notice of 42nd AGM Published in Newspapers', type: 'Notice & Agenda', size: '2.1 MB', fileUrl: '#' },
        { title: 'Form of Proxy for Individual & Institutional Members', type: 'Proxy Form', size: '1.0 MB', fileUrl: '#' },
        { title: 'Confirmed Minutes of the 42nd AGM', type: 'Meeting Minutes', size: '3.2 MB', fileUrl: '#' },
        { title: 'Chairman Concluding Remarks & Resolution Summary', type: 'Resolution', size: '1.4 MB', fileUrl: '#' },
      ],
    },
    {
      year: '2023',
      meetingName: 'Extraordinary General Meeting (EOGM) & 41st AGM',
      date: 'October 27, 2023 • 10:30 AM PST',
      documents: [
        { title: 'Notice of Extraordinary General Meeting (Election of Directors)', type: 'Special Notice', size: '2.8 MB', fileUrl: '#' },
        { title: 'Profile of Candidates Contesting Directorship Election', type: 'Candidate Profiles', size: '3.1 MB', fileUrl: '#' },
        { title: 'Minutes of EOGM — Director Election Resolution', type: 'Meeting Minutes', size: '2.9 MB', fileUrl: '#' },
        { title: '41st Annual General Meeting Minutes & Dividend Approval', type: 'AGM Minutes', size: '3.4 MB', fileUrl: '#' },
      ],
    },
    {
      year: '2022',
      meetingName: '40th Milestone Annual General Meeting',
      date: 'October 28, 2022 • 11:00 AM PST',
      documents: [
        { title: 'Notice of 40th AGM with 4-Decade Anniversary Agenda', type: 'Notice & Agenda', size: '3.2 MB', fileUrl: '#' },
        { title: 'Form of Proxy & Electronic Attendance Mandate', type: 'Proxy Form', size: '1.2 MB', fileUrl: '#' },
        { title: 'Minutes of 40th Annual General Meeting', type: 'Meeting Minutes', size: '3.7 MB', fileUrl: '#' },
      ],
    },
  ];

  const handleAddToCalendar = () => {
    // Generate .ics calendar file
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Fecto Cement Limited//Investor Relations//EN
BEGIN:VEVENT
SUMMARY:Fecto Cement Limited - 44th Annual General Meeting (AGM)
DESCRIPTION:44th AGM of Fecto Cement Limited. Consideration of Annual Audited Accounts, Dividend Declaration, and Statutory Auditor appointment.
LOCATION:Fecto Cement Corporate HQ, Sector H-16, Islamabad / Virtual Zoom
DTSTART:20261024T060000Z
DTEND:20261024T080000Z
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'Fecto_44th_AGM_2026.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setCalendarAdded(true);
    setTimeout(() => setCalendarAdded(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#F1F5F9] text-slate-900 selection:bg-[#F4D5AB] selection:text-[#000080]">
      {/* 1. FLOATING NAVBAR */}
      <FectoNavbar onCtaClick={() => setQuoteModalOpen(true)} />

      {/* SECTION 1: THE UNIVERSAL HERO */}
      <InnerPageHero
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Investors', href: '#investors' },
          { label: 'General Meetings' },
        ]}
        title="Corporate Assembly."
        subtitle="General meeting notices, agendas, and proxy forms."
      />

      {/* SECTION 2: UPCOMING MEETING CARD ("Next Meeting" Block) */}
      <section className="bg-[#F1F5F9] py-20 border-b border-slate-200/60">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl p-8 lg:p-12 border border-slate-200/80 shadow-[0_15px_40px_rgba(0,0,128,0.06)] relative overflow-hidden"
          >
            {/* Top Accent Strip */}
            <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-[#000080] via-[#8B5E1A] to-[#000080]" />

            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#000080]/10 text-[#000080] mb-2">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Next Assembly Schedule</span>
                </span>
                <h2 className="text-3xl font-extrabold text-[#000080] tracking-tight">
                  44th Annual General Meeting (AGM)
                </h2>
              </div>

              {/* Status Badge */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200/60 text-xs font-bold font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Notice Dispatched to PSX & SECP</span>
              </div>
            </div>

            {/* Event Specifics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-6 rounded-2xl bg-slate-50 border border-slate-200/70 mb-8">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-white text-[#000080] flex items-center justify-center shadow-sm flex-shrink-0">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Date</div>
                  <div className="text-base font-bold text-slate-800">October 24, 2026</div>
                  <div className="text-xs text-slate-500">Saturday</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-white text-[#8B5E1A] flex items-center justify-center shadow-sm flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Time</div>
                  <div className="text-base font-bold text-slate-800">11:00 AM (PST)</div>
                  <div className="text-xs text-slate-500">Quorum Verification 10:30 AM</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-white text-blue-600 flex items-center justify-center shadow-sm flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Venue</div>
                  <div className="text-base font-bold text-slate-800">Fecto Corporate HQ</div>
                  <div className="text-xs text-slate-500">Sector H-16, Islamabad</div>
                </div>
              </div>
            </div>

            {/* Agenda Highlights */}
            <div className="space-y-2 mb-8">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Ordinary Business Agenda Highlights:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Receive and adopt Audited Accounts for FY26</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Consider declaration of Final Cash Dividend</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Appointment and remuneration of Statutory Auditors</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Hybrid Virtual Video-Link Attendance via Zoom</span>
                </div>
              </div>
            </div>

            {/* Actions Bar with Add to Calendar Outline Button */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-slate-200">
              <button
                onClick={handleAddToCalendar}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold border-2 border-[#000080] text-[#000080] hover:bg-[#000080] hover:text-white transition-all shadow-sm active:scale-95"
              >
                <CalendarPlus className="w-4 h-4" />
                <span>{calendarAdded ? 'Saved to Calendar (.ics)!' : 'Add to Calendar'}</span>
              </button>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => alert('Downloading Notice of 44th AGM (PDF)...')}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-[#000080] text-white hover:bg-[#000060] transition-all shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Notice (PDF)</span>
                </button>
                <button
                  onClick={() => alert('Downloading Form of Proxy (Form 34)...')}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all border border-slate-300/80"
                >
                  <FileText className="w-3.5 h-3.5 text-[#000080]" />
                  <span>Proxy Form</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 3: ARCHIVE ACCORDION (Past Years with Expandable PDF Lists) */}
      <section className="bg-white py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#8B5E1A]">Proceedings Archive</span>
            <h2 className="text-3xl font-extrabold text-[#000080] mt-1">
              General Meeting Archive & Historical Minutes
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              Verified historical record of shareholder assemblies, director elections, and approved resolutions.
            </p>
          </div>

          {/* Accordion Container */}
          <div className="space-y-4">
            {archiveMeetings.map((meeting) => {
              const isOpen = expandedYear === meeting.year;

              return (
                <div
                  key={meeting.year}
                  className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm transition-all"
                >
                  <button
                    onClick={() => setExpandedYear(isOpen ? '' : meeting.year)}
                    className="w-full flex items-center justify-between p-6 text-left bg-[#F8FAFC] hover:bg-slate-100/80 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <span className="px-3 py-1 rounded-xl text-xs font-bold bg-[#000080] text-[#F4D5AB] font-mono">
                        {meeting.year}
                      </span>
                      <div>
                        <h3 className="text-base font-bold text-[#000080]">
                          {meeting.meetingName}
                        </h3>
                        <p className="text-xs text-slate-500 font-mono mt-0.5">
                          {meeting.date}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs font-medium text-slate-400 hidden sm:inline">
                        {meeting.documents.length} Files
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-[#000080] transition-transform duration-200 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        className="border-t border-slate-200 bg-white p-6"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {meeting.documents.map((doc, idx) => (
                            <div
                              key={idx}
                              className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-[#000080]/30 hover:bg-[#000080]/5 transition-all flex items-center justify-between group"
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-lg bg-white text-[#000080] flex items-center justify-center shadow-xs flex-shrink-0 group-hover:scale-105 transition-transform">
                                  <FileText className="w-4 h-4" />
                                </div>
                                <div>
                                  <div className="text-xs font-bold text-slate-800 group-hover:text-[#000080] transition-colors leading-snug">
                                    {doc.title}
                                  </div>
                                  <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                                    {doc.type} • {doc.size}
                                  </div>
                                </div>
                              </div>

                              <button
                                onClick={() => alert(`Downloading ${doc.title}...`)}
                                className="w-8 h-8 rounded-lg bg-white text-[#000080] flex items-center justify-center shadow-xs hover:bg-[#000080] hover:text-white transition-all ml-2 flex-shrink-0"
                                title="Download PDF"
                              >
                                <Download className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Voting Guidelines Note */}
          <div className="mt-10 p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3 text-xs text-slate-500">
            <ShieldCheck className="w-5 h-5 text-[#8B5E1A] flex-shrink-0 mt-0.5" />
            <p>
              In accordance with Section 134 of the Companies Act 2017, members are entitled to appoint a proxy to attend and vote on their behalf. Proxy forms properly completed and signed must be deposited at the Corporate Secretariat not later than 48 hours before the time of meeting.
            </p>
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

