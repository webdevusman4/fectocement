'use client';

import React, { useState } from 'react';
import { CheckCircle2, Send, X, ArrowRight } from 'lucide-react';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-[#000080]/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Dialog */}
      <div 
        role="dialog"
        aria-modal="true"
        className="relative w-full max-w-lg rounded-3xl p-8 text-white shadow-2xl overflow-hidden bg-[#000066] border border-white/20"
      >
        <div className="flex items-center justify-between pb-4 border-b border-white/15">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-full bg-white/10 text-[#F4D5AB]">
              <Send className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-lg font-bold text-white">
                Request a Bulk Quote
              </h3>
              <p className="text-xs text-white/70">
                Fecto Cement Sangjani Plant Dispatch Desk
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close quote modal"
            className="p-1.5 rounded-full bg-white/10 text-white/80 hover:text-white hover:bg-white/20 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {submitted ? (
          <div className="py-12 text-center space-y-4">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
            <h4 className="text-xl font-bold text-white">Bulk Inquiry Submitted</h4>
            <p className="text-xs text-white/80 max-w-sm mx-auto leading-relaxed">
              Our commercial project dispatch team will review your requirements and provide an official quotation within 4 business hours.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="mt-4 px-6 py-2.5 rounded-full text-xs font-bold bg-white text-[#000080] transition-colors hover:bg-white/90"
            >
              Close Window
            </button>
          </div>
        ) : (
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }} 
            className="mt-6 space-y-4"
          >
            <div>
              <label className="block text-xs font-semibold text-white mb-1">Company / Project Name</label>
              <input
                type="text"
                required
                placeholder="e.g. National Highway Infrastructure Authority"
                className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-white mb-1">Contact Person</label>
                <input
                  type="text"
                  required
                  placeholder="Full Name"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-white mb-1">Phone Number</label>
                <input
                  type="tel"
                  required
                  placeholder="+92 300 1234567"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-white mb-1">Cement Grade</label>
                <select
                  className="w-full px-4 py-2.5 rounded-xl bg-[#000066] border border-white/20 text-white text-sm focus:outline-none focus:border-white"
                >
                  <option value="opc">Ordinary Portland (OPC 42.5/53)</option>
                  <option value="src">Sulphate Resistant (SRC)</option>
                  <option value="lowheat">Low Heat Cement</option>
                  <option value="bulk">Bulk Clinker Fleet</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-white mb-1">Estimated Tonnage</label>
                <input
                  type="text"
                  placeholder="e.g. 1,000 Metric Tons"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-white mb-1">Delivery Destination</label>
              <input
                type="text"
                required
                placeholder="e.g. Islamabad Sector B-17 / Motorway M-1 Interchange"
                className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-white"
              />
            </div>

            <button
              type="submit"
              className="w-full mt-4 flex items-center justify-center gap-2 px-6 py-4 rounded-full text-base font-bold tracking-wide transition-all shadow-xl bg-white text-[#000080] hover:bg-white/90 active:scale-95"
            >
              <span>Request a bulk quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default QuoteModal;

