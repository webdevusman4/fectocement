'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import FectoNavbar from '@/components/FectoNavbar';
import CorporateFooter from '@/components/CorporateFooter';
import QuoteModal from '@/components/QuoteModal';
import { InnerPageHero } from '@/components/InnerPageHero';
import { 
  ShieldAlert, 
  Send, 
  CheckCircle2, 
  ExternalLink, 
  Building2, 
  Phone, 
  Mail, 
  FileCheck, 
  Info,
  User,
  CreditCard,
  MessageSquare
} from 'lucide-react';

export default function GrievancesPage() {
  const [formData, setFormData] = useState({
    name: '',
    cnic: '',
    folio: '',
    email: '',
    phone: '',
    subject: 'Dividend Inquiry',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 800);
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
          { label: 'Investor Grievances' },
        ]}
        title="We Value Your Voice."
        subtitle="Dedicated liaison for share registrar and SECP compliance."
      />

      {/* SECTION 2: SECP JAMAPUNJI BANNER (Mandatory Pakistan Listed Compliance) */}
      <section className="bg-[#F1F5F9] py-16 border-b border-slate-200/60">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-3xl p-8 lg:p-10 border border-slate-200/80 shadow-[0_10px_35px_rgba(0,0,0,0.04)] flex flex-col lg:flex-row items-center justify-between gap-8"
          >
            {/* Left: JamaPunji & SECP Emblem Mockup */}
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-800 text-white flex flex-col items-center justify-center p-3 text-center shadow-lg flex-shrink-0">
                <span className="text-[10px] uppercase font-bold tracking-widest opacity-80">SECP</span>
                <span className="text-sm font-black tracking-tight leading-tight">Jama<br/>Punji</span>
                <span className="text-[8px] opacity-75 mt-0.5">سرمایہ کاری سمجهداری کے ساتھ</span>
              </div>

              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200/60 mb-2">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Educating & Protecting Investors</span>
                </div>
                <h3 className="text-xl font-extrabold text-[#000080]">
                  Securities and Exchange Commission of Pakistan (SECP)
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed max-w-xl mt-1">
                  In case your grievance or complaint is not properly redressed by our corporate liaison, you may lodge your complaint directly with SECP through the Service Desk Management System (SDMS) or visit the official JamaPunji portal.
                </p>
              </div>
            </div>

            {/* Right: Direct Portal Action Links */}
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <a
                href="https://sdms.secp.gov.pk"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#000080] text-white text-xs font-bold hover:bg-[#000060] transition-all shadow-sm"
              >
                <span>SECP SDMS Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://jamapunji.pk"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200 transition-all border border-slate-200"
              >
                <span>JamaPunji Portal</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#000080]" />
              </a>
            </div>
          </motion.div>

          {/* Share Registrar Contact Bar */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/80 rounded-2xl p-4 border border-slate-200/60 shadow-xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#000080] flex items-center justify-center flex-shrink-0">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Share Registrar</div>
                <div className="text-xs font-bold text-slate-800">CDC Share Registrar Services</div>
                <div className="text-[11px] text-slate-500">CDC House, Shahrah-e-Faisal, Karachi</div>
              </div>
            </div>

            <div className="bg-white/80 rounded-2xl p-4 border border-slate-200/60 shadow-xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Registrar Helpline</div>
                <div className="text-xs font-bold text-slate-800">0800-23275 (CDCPL)</div>
                <div className="text-[11px] text-slate-500">Toll-Free UAN: +92 21 111-111-500</div>
              </div>
            </div>

            <div className="bg-white/80 rounded-2xl p-4 border border-slate-200/60 shadow-xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#8B5E1A] flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Company Secretary</div>
                <div className="text-xs font-bold text-slate-800">investor.relations@fectogroup.com</div>
                <div className="text-[11px] text-slate-500">Corporate Secretariat, Islamabad</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: DIRECT CONTACT FORM (Sleek Glass-Smoked / Arctic Form) */}
      <section className="bg-white py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#8B5E1A]">Investor Redressal Protocol</span>
            <h2 className="text-3xl font-extrabold text-[#000080] mt-1">
              Direct Grievance Submission
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              Shareholders are requested to provide their Folio or CDC account details for expedited verification and resolution within 7 working days.
            </p>
          </div>

          <div className="bg-[#F8FAFC] rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-[0_15px_40px_rgba(0,0,0,0.03)]">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-[#000080] mb-2">
                  Grievance Ticket Generated
                </h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto mb-6">
                  Thank you, <strong>{formData.name || 'Valued Shareholder'}</strong>. Your inquiry has been forwarded to the Corporate Secretariat and Share Registrar with Reference ID: <strong>GRV-2026-8891</strong>.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-xl text-xs font-bold bg-[#000080] text-white hover:bg-[#000060] transition-all"
                >
                  Submit Another Inquiry
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Tariq Mehmood"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 bg-white rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#000080]/30 text-slate-800"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      CNIC / Passport Number *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 61101-1234567-1"
                      value={formData.cnic}
                      onChange={(e) => setFormData({ ...formData, cnic: e.target.value })}
                      className="w-full px-4 py-3 bg-white rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#000080]/30 text-slate-800"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Folio / CDC Account # *
                    </label>
                    <div className="relative">
                      <CreditCard className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. CDC-03214-8821"
                        value={formData.folio}
                        onChange={(e) => setFormData({ ...formData, folio: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 bg-white rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#000080]/30 text-slate-800"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. name@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-white rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#000080]/30 text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Contact Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +92 300 1234567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-white rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#000080]/30 text-slate-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Subject / Category *
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 bg-white rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#000080]/30 text-slate-800"
                  >
                    <option value="Dividend Inquiry">Dividend Inquiry / Uncredited Warrants</option>
                    <option value="Unclaimed Shares">Unclaimed Shares / Physical Certificate Verification</option>
                    <option value="Transfer of Shares">Transfer / Transmission of Shares</option>
                    <option value="IBAN Mandate Update">Electronic Dividend Mandate / IBAN Update</option>
                    <option value="Annual Report Delivery">Annual Report Dispatch / Digital Delivery</option>
                    <option value="Other Regulatory Matter">Other Corporate / SECP Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Detailed Message / Grievance Particulars *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Please specify details including dates, share certificate numbers, or previous correspondence..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full p-4 bg-white rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#000080]/30 text-slate-800"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <span className="text-xs text-slate-500 flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-[#000080]" />
                    A unique ticket ID will be emailed to you immediately.
                  </span>

                  {/* Submit Button with Hover Scale Effect */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#000080] text-white font-extrabold text-sm shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Transmitting...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Grievance</span>
                        <Send className="w-4 h-4 text-[#F4D5AB]" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
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

