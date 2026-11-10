'use client';

import React, { useEffect, useRef, useState } from 'react';
import { CheckCircle2, Send, X, ArrowRight } from 'lucide-react';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProduct?: string;
}

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

function gradeFromContext(context: string): string {
  const value = context.toLowerCase();
  if (value.includes('src') || value.includes('sulphate')) return 'src';
  return 'opc';
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  selectedProduct = '',
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [grade, setGrade] = useState('opc');
  const dialogRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  const contextText = selectedProduct
    ? `Enquiry context: ${selectedProduct}`
    : 'General bulk cement enquiry';

  useEffect(() => {
    if (!isOpen) return;

    setSubmitted(false);
    setGrade(gradeFromContext(selectedProduct));

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const focusFirst = () => {
      const first = dialogRef.current?.querySelector<HTMLElement>(FOCUSABLE);
      first?.focus();
    };
    focusFirst();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onCloseRef.current();
        return;
      }

      if (event.key !== 'Tab' || !dialogRef.current) return;

      const items = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)
      ).filter((item) => item.offsetParent !== null);

      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [isOpen, selectedProduct]);

  useEffect(() => {
    if (!isOpen || !submitted) return;
    dialogRef.current?.querySelector<HTMLElement>('button')?.focus();
  }, [isOpen, submitted]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close quote modal"
        tabIndex={-1}
        onClick={onClose}
        className="fixed inset-0 cursor-default bg-[#000080]/80 backdrop-blur-md transition-opacity"
      />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="quote-modal-title"
        aria-describedby="quote-modal-context"
        className="relative w-full max-w-lg rounded-3xl border border-white/20 bg-[#000066] p-8 text-white shadow-2xl overflow-hidden"
      >
        <div className="flex items-center justify-between pb-4 border-b border-white/15">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-full bg-white/10 text-[#F4D5AB]">
              <Send className="w-5 h-5" />
            </span>
            <div>
              <h3 id="quote-modal-title" className="text-lg font-bold text-white">
                Request a Bulk Quote
              </h3>
              <p className="text-xs text-white/70">
                Fecto Cement Sangjani Plant Dispatch Desk
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close quote modal"
            className="p-1.5 rounded-full bg-white/10 text-white/80 hover:text-white hover:bg-white/20 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p
          id="quote-modal-context"
          className="mt-4 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs leading-relaxed text-[#F4D5AB]"
        >
          {contextText}
        </p>

        {submitted ? (
          <div className="py-12 text-center space-y-4">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
            <h4 className="text-xl font-bold text-white">Mock enquiry recorded</h4>
            <p className="text-xs text-white/80 max-w-sm mx-auto leading-relaxed">
              This is a design preview. No data was submitted and no commercial team has been notified.
            </p>
            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="mt-4 px-6 py-2.5 rounded-full text-xs font-bold bg-white text-[#000080] transition-colors hover:bg-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F4D5AB]"
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
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/50">
              Mock interaction · no data is submitted
            </p>

            <div>
              <label htmlFor="quote-company" className="block text-xs font-semibold text-white mb-1">
                Company / Project Name
              </label>
              <input
                id="quote-company"
                name="company"
                type="text"
                required
                placeholder="e.g. National Highway Infrastructure Authority"
                className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="quote-contact" className="block text-xs font-semibold text-white mb-1">
                  Contact Person
                </label>
                <input
                  id="quote-contact"
                  name="contact"
                  type="text"
                  required
                  placeholder="Full Name"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-white"
                />
              </div>
              <div>
                <label htmlFor="quote-phone" className="block text-xs font-semibold text-white mb-1">
                  Phone Number
                </label>
                <input
                  id="quote-phone"
                  name="phone"
                  type="tel"
                  required
                  placeholder="+92 300 1234567"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="quote-grade" className="block text-xs font-semibold text-white mb-1">
                  Cement Grade
                </label>
                <select
                  id="quote-grade"
                  name="grade"
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#000066] border border-white/20 text-white text-sm focus:outline-none focus:border-white"
                >
                  <option value="opc">Ordinary Portland (OPC 42.5/53)</option>
                  <option value="src">Sulphate Resistant (SRC)</option>
                  <option value="lowheat">Low Heat Cement</option>
                  <option value="bulk">Bulk Clinker Fleet</option>
                </select>
              </div>
              <div>
                <label htmlFor="quote-tonnage" className="block text-xs font-semibold text-white mb-1">
                  Estimated Tonnage
                </label>
                <input
                  id="quote-tonnage"
                  name="tonnage"
                  type="text"
                  placeholder="e.g. 1,000 Metric Tons"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-white"
                />
              </div>
            </div>

            <div>
              <label htmlFor="quote-destination" className="block text-xs font-semibold text-white mb-1">
                Delivery Destination
              </label>
              <input
                id="quote-destination"
                name="destination"
                type="text"
                required
                placeholder="e.g. Islamabad Sector B-17 / Motorway M-1 Interchange"
                className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-white"
              />
            </div>

            <button
              type="submit"
              className="w-full mt-4 flex items-center justify-center gap-2 px-6 py-4 rounded-full text-base font-bold tracking-wide transition-colors shadow-xl bg-white text-[#000080] hover:bg-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F4D5AB]"
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
