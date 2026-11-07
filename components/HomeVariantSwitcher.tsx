'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Layers, Sparkles, Check, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';

interface HomeVariantSwitcherProps {
  activeVariant: 'v1' | 'v2';
  onVariantChange?: (variant: 'v1' | 'v2') => void;
  className?: string;
}

export default function HomeVariantSwitcher({
  activeVariant,
  onVariantChange,
  className = '',
}: HomeVariantSwitcherProps) {
  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <aside 
      aria-label="Home Page Version Switcher" 
      className={`fixed bottom-6 right-6 z-50 select-none ${className}`}
    >
      {isMinimized ? (
        <button
          onClick={() => setIsMinimized(false)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#000080] text-white shadow-2xl hover:bg-[#000066] transition-all duration-200 border border-white/20 text-xs font-semibold"
          title="Expand Home Switcher"
        >
          <Layers className="w-3.5 h-3.5 text-[#F4D5AB]" />
          <span>Home: {activeVariant === 'v2' ? 'Default (V2)' : 'Legacy (V1)'}</span>
          <ChevronUp className="w-3.5 h-3.5 opacity-80" />
        </button>
      ) : (
        <div className="glass-arctic rounded-2xl p-2.5 shadow-[0_20px_50px_rgba(0,0,128,0.25)] border border-white/90 backdrop-blur-2xl text-slate-900 w-80 max-w-[90vw] animate-in fade-in slide-in-from-bottom-3 duration-300">
          <div className="flex items-center justify-between px-2.5 py-1 mb-2 border-b border-slate-200/60 pb-2">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded-md bg-[#000080]/10 text-[#000080]">
                <Layers className="w-3.5 h-3.5" />
              </span>
              <span className="text-xs font-bold tracking-wide uppercase text-[#000080]">
                Home Experience Switcher
              </span>
            </div>
            <button
              onClick={() => setIsMinimized(true)}
              className="p-1 text-slate-400 hover:text-slate-700 rounded-md transition-colors"
              title="Minimize panel"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100/80 rounded-xl">
            {/* Page 2 (New Default Home Experience) */}
            {onVariantChange ? (
              <button
                type="button"
                onClick={() => onVariantChange('v2')}
                className={`flex flex-col items-start p-2.5 rounded-lg text-left transition-all ${
                  activeVariant === 'v2'
                    ? 'bg-white shadow-sm text-[#000080] font-semibold border border-slate-200/80 ring-2 ring-[#000080]/20'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-xs font-bold flex items-center gap-1">
                    Default
                    <Sparkles className="w-3 h-3 text-[#B8860B]" />
                  </span>
                  {activeVariant === 'v2' && <Check className="w-3.5 h-3.5 text-[#000080]" />}
                </div>
                <span className="text-[11px] text-slate-500 font-normal mt-0.5 line-clamp-1">Modern Home</span>
              </button>
            ) : (
              <Link
                href="/"
                className={`flex flex-col items-start p-2.5 rounded-lg text-left transition-all ${
                  activeVariant === 'v2'
                    ? 'bg-white shadow-sm text-[#000080] font-semibold border border-slate-200/80 ring-2 ring-[#000080]/20'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-xs font-bold flex items-center gap-1">
                    Default
                    <Sparkles className="w-3 h-3 text-[#B8860B]" />
                  </span>
                  {activeVariant === 'v2' && <Check className="w-3.5 h-3.5 text-[#000080]" />}
                </div>
                <span className="text-[11px] text-slate-500 font-normal mt-0.5 line-clamp-1">Modern Home</span>
              </Link>
            )}

            {/* Page 1 (Legacy Home Experience) */}
            {onVariantChange ? (
              <button
                type="button"
                onClick={() => onVariantChange('v1')}
                className={`flex flex-col items-start p-2.5 rounded-lg text-left transition-all ${
                  activeVariant === 'v1'
                    ? 'bg-white shadow-sm text-[#000080] font-semibold border border-slate-200/80 ring-2 ring-[#000080]/20'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-xs font-bold">Legacy</span>
                  {activeVariant === 'v1' && <Check className="w-3.5 h-3.5 text-[#000080]" />}
                </div>
                <span className="text-[11px] text-slate-500 font-normal mt-0.5 line-clamp-1">Page 1 (Legacy)</span>
              </button>
            ) : (
              <Link
                href="/?v=1"
                className={`flex flex-col items-start p-2.5 rounded-lg text-left transition-all ${
                  activeVariant === 'v1'
                    ? 'bg-white shadow-sm text-[#000080] font-semibold border border-slate-200/80 ring-2 ring-[#000080]/20'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-xs font-bold">Legacy</span>
                  {activeVariant === 'v1' && <Check className="w-3.5 h-3.5 text-[#000080]" />}
                </div>
                <span className="text-[11px] text-slate-500 font-normal mt-0.5 line-clamp-1">Page 1 (Legacy)</span>
              </Link>
            )}
          </div>

          <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-200/60 px-1 text-[11px] text-slate-500">
            <span>Direct route:</span>
            <Link 
              href={activeVariant === 'v2' ? '/?v=1' : '/'} 
              className="font-medium text-[#000080] hover:underline flex items-center gap-1"
            >
              <span>{activeVariant === 'v2' ? '/?v=1' : '/'}</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </Link>
          </div>
        </div>
      )}
    </aside>
  );
}
