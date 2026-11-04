'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, 
  Waves, 
  Layers, 
  Check, 
  ArrowLeft, 
  ArrowRight, 
  ShieldCheck, 
  Award, 
  Factory, 
  Truck, 
  Package, 
  User, 
  Building, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  RotateCcw
} from 'lucide-react';
import FectoLogo from '@/components/FectoLogo';

// Product Catalog
interface ProductOption {
  id: string;
  title: string;
  badge: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  specs: string[];
}

const productOptions: ProductOption[] = [
  {
    id: 'opc-53',
    title: 'OPC Grade 53',
    badge: 'High-Rise & Structural',
    description: 'High early compressive strength (>53 MPa) engineered for structural columns, bridges, pre-stressed girders, and heavy high-rise slabs.',
    icon: Building2,
    specs: ['53 MPa 28-day strength', 'Fast formwork cycling', 'PSQCA & ASTM C150 Spec'],
  },
  {
    id: 'src',
    title: 'Sulphate Resistant (SRC)',
    badge: 'Marine & Foundations',
    description: 'Formulated with low Tricalcium Aluminate (C3A < 3.5%) to defend foundation pilings, deep basements, and ports against groundwater sulphate attack.',
    icon: Waves,
    specs: ['C3A strictly < 3.5%', 'Groundwater salt defense', 'BS 4027 & ASTM C150 Type V'],
  },
  {
    id: 'low-heat',
    title: 'Low Heat Portland',
    badge: 'Mass Pours & Dams',
    description: 'Controlled hydration reaction rate designed for giant concrete monoliths, gravity dams, and powerhouses to eliminate thermal contraction cracks.',
    icon: Layers,
    specs: ['Controlled heat of hydration', 'Zero thermal cracking', 'Hydraulic & Dam grade'],
  },
];

const pakistaniCities = [
  'Islamabad / Rawalpindi (Capital Hub)',
  'Lahore / Central Punjab',
  'Peshawar / KP Northern Gateway',
  'Karachi / Port & Coastal Corridor',
  'Gwadar / Free Zone & Maritime',
  'Abbottabad / Hazara Infrastructure',
  'Faisalabad / Industrial Estate',
  'Multan / Southern Punjab Basin',
  'Quetta / Balochistan Corridor',
  'Other / Remote Project Site',
];

const volumePresets = [500, 1500, 5000, 10000, 25000];

export default function RequestQuotePage() {
  // Step state: 1 to 4
  const [step, setStep] = useState<number>(1);

  // Form State
  const [selectedProduct, setSelectedProduct] = useState<string>('opc-53');
  const [volume, setVolume] = useState<number>(5000);
  const [packaging, setPackaging] = useState<'bulk' | 'bags'>('bulk');
  const [fullName, setFullName] = useState<string>('');
  const [companyName, setCompanyName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [city, setCity] = useState<string>('Islamabad / Rawalpindi (Capital Hub)');
  const [timeline, setTimeline] = useState<string>('Within 2 Weeks');
  const [notes, setNotes] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Procurement Reference ID
  const [procurementId] = useState<string>('FEC-8492');

  // Next Step Handler with Validation
  const handleNext = () => {
    setErrorMessage('');

    if (step === 1) {
      if (!selectedProduct) {
        setErrorMessage('Please select a cement specification to continue.');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (volume <= 0) {
        setErrorMessage('Please specify an estimated tonnage volume.');
        return;
      }
      setStep(3);
    } else if (step === 3) {
      if (!fullName.trim() || !companyName.trim() || !phone.trim() || !email.trim()) {
        setErrorMessage('Please complete all required contact fields so we can generate your quotation.');
        return;
      }
      if (!email.includes('@') || !email.includes('.')) {
        setErrorMessage('Please enter a valid corporate email address.');
        return;
      }
      setStep(4);
    }
  };

  const handleBack = () => {
    setErrorMessage('');
    if (step > 1 && step < 4) {
      setStep(step - 1);
    }
  };

  // Find active product meta
  const activeProductMeta = productOptions.find((p) => p.id === selectedProduct) || productOptions[0];

  return (
    <div className="h-screen w-full flex flex-col md:flex-row overflow-hidden bg-[#000080] selection:bg-[#F4D5AB] selection:text-[#000080]">
      
      {/* ========================================================================= */}
      {/* LEFT COLUMN: The Dynamic Brand Anchor (40% Width on Desktop)              */}
      {/* ========================================================================= */}
      <div className="w-full md:w-[40%] h-[30vh] md:h-full relative bg-[#000080] p-6 sm:p-8 md:p-12 lg:p-14 flex flex-col justify-between text-white overflow-hidden flex-shrink-0 border-b md:border-b-0 md:border-r border-white/10 z-10">
        
        {/* Layer 1: Base Dark Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#000080] via-[#000050] to-[#040814] -z-20 pointer-events-none" />

        {/* Layer 2: Abstract Concrete Texture */}
        <div className="absolute inset-0 w-full h-full pointer-events-none -z-10">
          <Image
            src="/herobg.jpg"
            alt="Dark Concrete Texture"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 40vw"
            className="w-full h-full object-cover mix-blend-overlay opacity-30"
          />
        </div>

        {/* Layer 3: Champagne Sand Ambient Glowing Orb */}
        <div className="absolute -top-24 -right-24 w-80 md:w-96 h-80 md:h-96 bg-[#F4D5AB] rounded-full mix-blend-multiply filter blur-[128px] opacity-40 -z-10 animate-pulse pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-[#000080] rounded-full filter blur-[100px] opacity-60 -z-10 pointer-events-none" />

        {/* CONTENT (TOP): Logo & Return to Home Navigation */}
        <div className="relative z-10 flex items-center justify-between gap-4">
          <Link 
            href="/" 
            aria-label="Fecto Cement Home"
            className="inline-block transition-transform duration-200 hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F4D5AB] rounded-lg"
          >
            <FectoLogo color="#FFFFFF" className="h-8 sm:h-9 md:h-10 w-auto" />
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#F4D5AB] bg-white/10 hover:bg-white/20 transition-all border border-white/15 backdrop-blur-md group focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
            <span className="hidden sm:inline">Return to Home</span>
            <span className="sm:hidden">Home</span>
          </Link>
        </div>

        {/* CONTENT (MIDDLE): Massive Typography & Value Proposition (Desktop) */}
        <div className="relative z-10 hidden md:block my-auto py-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-mono uppercase tracking-widest bg-white/10 text-[#F4D5AB] border border-white/15 backdrop-blur-md mb-6 shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-[#F4D5AB]" />
            <span>Enterprise B2B Procurement</span>
          </div>

          <h1 className="text-3xl lg:text-4xl xl:text-5xl font-black text-white tracking-tight leading-[1.12] mb-5 drop-shadow-xl">
            Build Your <br />
            <span className="text-[#F4D5AB]">Monument.</span>
          </h1>

          <p className="text-blue-100/85 text-base lg:text-lg font-light leading-relaxed max-w-md">
            Direct access to Pakistan’s premier heavy-civil cement manufacturing fleet. Get a customized, stamped commercial quote within 2 hours.
          </p>

          {/* Live Dispatch SLA Indicator */}
          <div className="flex items-center gap-2.5 mt-8 p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md max-w-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
            <span className="text-xs font-mono text-emerald-200">
              Commercial Desk Active • Avg SLA: 24 mins
            </span>
          </div>
        </div>

        {/* CONTENT (BOTTOM): Trust Indicators (Row of glass-arctic badges) */}
        <div className="relative z-10 pt-2 md:pt-6 border-t border-white/10">
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            
            {/* Badge 1 */}
            <div className="p-2 sm:p-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-center flex flex-col items-center justify-center">
              <Award className="w-4 h-4 text-[#F4D5AB] mb-1" />
              <div className="text-[11px] font-bold text-white leading-tight">ISO 9001:2015</div>
              <div className="text-[9px] text-blue-200/70 font-mono hidden sm:block">Certified Quality</div>
            </div>

            {/* Badge 2 */}
            <div className="p-2 sm:p-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-center flex flex-col items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-[#F4D5AB] mb-1" />
              <div className="text-[11px] font-bold text-white leading-tight">PSQCA Approved</div>
              <div className="text-[9px] text-blue-200/70 font-mono hidden sm:block">Grade 53 Conforming</div>
            </div>

            {/* Badge 3 */}
            <div className="p-2 sm:p-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-center flex flex-col items-center justify-center">
              <Factory className="w-4 h-4 text-[#F4D5AB] mb-1" />
              <div className="text-[11px] font-bold text-white leading-tight">2.8M+ Tons</div>
              <div className="text-[9px] text-blue-200/70 font-mono hidden sm:block">Annual Fleet Output</div>
            </div>

          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* RIGHT COLUMN: The Interactive Multi-Step Engine (60% Width)              */}
      {/* ========================================================================= */}
      <div className="w-full md:w-[60%] h-[70vh] md:h-full bg-[#F1F5F9] relative flex flex-col justify-between overflow-hidden">
        
        {/* Scrollable Center Body Area */}
        <div className="overflow-y-auto custom-scrollbar flex-1 px-6 sm:px-8 lg:px-12 py-8 sm:py-10">
          <div className="max-w-2xl mx-auto w-full">
            
            {/* ----------------------------------------------------------------- */}
            {/* A. HEADER (Always visible for Steps 1-3): Step Indicator & Bar    */}
            {/* ----------------------------------------------------------------- */}
            {step < 4 && (
              <div className="mb-8">
                <div className="flex items-center justify-between text-xs sm:text-sm font-semibold text-slate-500 mb-2">
                  <span className="font-mono uppercase tracking-wider text-[#000080]">
                    Step {step} of 3
                  </span>
                  <span className="text-[#8B5E1A]">
                    {step === 1 && 'Product Selection'}
                    {step === 2 && 'Volume & Logistics'}
                    {step === 3 && 'Project & Dispatch Details'}
                  </span>
                </div>

                {/* Progress Bar with #000080 fill */}
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-[#000080] rounded-full"
                    initial={false}
                    animate={{ 
                      width: step === 1 ? '33.33%' : step === 2 ? '66.66%' : '100%' 
                    }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                  />
                </div>

                {/* Error Alert Box if any */}
                {errorMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm font-medium flex items-center gap-2"
                  >
                    <span className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0" />
                    <span>{errorMessage}</span>
                  </motion.div>
                )}
              </div>
            )}

            {/* ----------------------------------------------------------------- */}
            {/* B. STEP CONTENTS (Animated via AnimatePresence)                  */}
            {/* ----------------------------------------------------------------- */}
            <AnimatePresence mode="wait">
              
              {/* =============================================================== */}
              {/* STEP 1: Product Selection (Visual Cards)                         */}
              {/* =============================================================== */}
              {step === 1 && (
                <motion.div
                  key="step-1"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="space-y-6"
                >
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-[#8B5E1A]">
                      SPECIFICATION SELECTION
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#000080] mt-1">
                      What type of cement does your project require?
                    </h2>
                    <p className="text-slate-600 text-sm mt-1.5 leading-relaxed">
                      Select the industrial formulation tailored for your project’s compressive requirements and ground chemistry.
                    </p>
                  </div>

                  {/* 3 Selectable Visual Radio Cards */}
                  <div className="grid grid-cols-1 gap-4 pt-2">
                    {productOptions.map((product) => {
                      const IconComp = product.icon;
                      const isSelected = selectedProduct === product.id;

                      return (
                        <div
                          key={product.id}
                          onClick={() => {
                            setSelectedProduct(product.id);
                            setErrorMessage('');
                          }}
                          role="radio"
                          aria-checked={isSelected}
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === ' ' || e.key === 'Enter') {
                              setSelectedProduct(product.id);
                              setErrorMessage('');
                            }
                          }}
                          className={`group relative p-5 sm:p-6 rounded-2xl cursor-pointer transition-all duration-200 border-2 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#000080] ${
                            isSelected
                              ? 'border-[#000080] bg-[#000080]/5 shadow-lg shadow-[#000080]/5 ring-1 ring-[#000080]'
                              : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-md'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex items-start gap-3.5">
                              <div
                                className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                                  isSelected
                                    ? 'bg-[#000080] text-[#F4D5AB]'
                                    : 'bg-slate-100 text-slate-700 group-hover:bg-[#000080]/10 group-hover:text-[#000080]'
                                }`}
                              >
                                <IconComp className="w-5 h-5" />
                              </div>

                              <div>
                                <span className="inline-block text-[11px] font-mono font-semibold uppercase tracking-wider text-[#8B5E1A] mb-0.5">
                                  {product.badge}
                                </span>
                                <h3 className="text-lg font-bold text-[#000080]">
                                  {product.title}
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                                  {product.description}
                                </p>

                                {/* Specs Pill Badges */}
                                <div className="flex flex-wrap items-center gap-2 mt-3">
                                  {product.specs.map((spec, sIdx) => (
                                    <span
                                      key={sIdx}
                                      className="text-[10px] sm:text-[11px] font-mono font-medium px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600"
                                    >
                                      {spec}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>

                            {/* Custom Active Radio Check Indicator */}
                            <div
                              className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                                isSelected
                                  ? 'bg-[#000080] text-white scale-100'
                                  : 'border-2 border-slate-300 bg-white scale-95 opacity-60 group-hover:opacity-100'
                              }`}
                            >
                              {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* =============================================================== */}
              {/* STEP 2: Volume & Logistics (The Slider & Toggles)                */}
              {/* =============================================================== */}
              {step === 2 && (
                <motion.div
                  key="step-2"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="space-y-8"
                >
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-[#8B5E1A]">
                      QUANTITY & FULFILLMENT
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#000080] mt-1">
                      Specify your volume and delivery preference.
                    </h2>
                    <p className="text-slate-600 text-sm mt-1.5 leading-relaxed">
                      Custom tiered pricing applies for infrastructure consignments exceeding 2,500 Metric Tons.
                    </p>
                  </div>

                  {/* UI 1: The Premium Tonnage Range Slider */}
                  <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-4 border-b border-slate-100">
                      <div>
                        <label htmlFor="tonnage-slider" className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-500">
                          Estimated Volume (Metric Tons)
                        </label>
                        <div className="text-3xl sm:text-4xl font-black text-[#000080] tracking-tight mt-1 flex items-baseline gap-2">
                          <span>{volume.toLocaleString()}</span>
                          <span className="text-base font-bold text-[#8B5E1A]">MT</span>
                        </div>
                      </div>

                      {/* Conversion Equivalency */}
                      <div className="text-xs font-mono text-slate-500 sm:text-right bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200/80">
                        <span>≈ {(volume * 20).toLocaleString()} bags (50kg)</span>
                        <span className="block text-[10px] text-slate-400">
                          or {Math.ceil(volume / 30)} bulk tankers (30 MT)
                        </span>
                      </div>
                    </div>

                    {/* Slider Input */}
                    <div className="space-y-2">
                      <input
                        id="tonnage-slider"
                        type="range"
                        min={100}
                        max={25000}
                        step={100}
                        value={volume}
                        onChange={(e) => setVolume(Number(e.target.value))}
                        className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#000080] focus:outline-none focus:ring-2 focus:ring-[#000080]/30"
                      />

                      <div className="flex justify-between text-[11px] font-mono text-slate-400 pt-1">
                        <span>100 MT (Min Batch)</span>
                        <span>12,500 MT</span>
                        <span>25,000+ MT (Mega Infra)</span>
                      </div>
                    </div>

                    {/* Quick Preset Buttons */}
                    <div className="pt-2">
                      <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-2">
                        Common Consignment Presets:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {volumePresets.map((preset) => (
                          <button
                            key={preset}
                            type="button"
                            onClick={() => setVolume(preset)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all ${
                              volume === preset
                                ? 'bg-[#000080] text-[#F4D5AB] shadow-sm'
                                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                            }`}
                          >
                            {preset.toLocaleString()} MT
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* UI 2: Packaging Toggle (Two massive pill buttons) */}
                  <div className="space-y-3">
                    <label className="text-xs font-bold uppercase tracking-widest text-[#8B5E1A]">
                      Select Packaging & Transport Logistics
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      
                      {/* Option 1: Bulk Pneumatic Fleet */}
                      <div
                        onClick={() => setPackaging('bulk')}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => (e.key === ' ' || e.key === 'Enter') && setPackaging('bulk')}
                        className={`p-5 rounded-2xl cursor-pointer border-2 transition-all text-left flex flex-col justify-between ${
                          packaging === 'bulk'
                            ? 'border-[#000080] bg-[#000080]/5 shadow-md ring-1 ring-[#000080]'
                            : 'border-slate-200 bg-white hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                            packaging === 'bulk' ? 'bg-[#000080] text-[#F4D5AB]' : 'bg-slate-100 text-slate-700'
                          }`}>
                            <Truck className="w-5 h-5" />
                          </div>
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                            packaging === 'bulk' ? 'bg-[#000080] text-white' : 'border border-slate-300 bg-white'
                          }`}>
                            {packaging === 'bulk' && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-bold text-base text-[#000080]">
                            Bulk Pneumatic Fleet
                          </h4>
                          <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                            Pressurized bowser tankers discharging directly into on-site silos & batching terminals.
                          </p>
                        </div>
                      </div>

                      {/* Option 2: Standard 50kg Bags */}
                      <div
                        onClick={() => setPackaging('bags')}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => (e.key === ' ' || e.key === 'Enter') && setPackaging('bags')}
                        className={`p-5 rounded-2xl cursor-pointer border-2 transition-all text-left flex flex-col justify-between ${
                          packaging === 'bags'
                            ? 'border-[#000080] bg-[#000080]/5 shadow-md ring-1 ring-[#000080]'
                            : 'border-slate-200 bg-white hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                            packaging === 'bags' ? 'bg-[#000080] text-[#F4D5AB]' : 'bg-slate-100 text-slate-700'
                          }`}>
                            <Package className="w-5 h-5" />
                          </div>
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                            packaging === 'bags' ? 'bg-[#000080] text-white' : 'border border-slate-300 bg-white'
                          }`}>
                            {packaging === 'bags' && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-bold text-base text-[#000080]">
                            Standard 50kg Bags
                          </h4>
                          <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                            Multi-wall moisture-resistant kraft paper bags on stretch-wrapped, tamper-evident pallets.
                          </p>
                        </div>
                      </div>

                    </div>
                  </div>
                </motion.div>
              )}

              {/* =============================================================== */}
              {/* STEP 3: Project & Contact Details (Premium Form)                 */}
              {/* =============================================================== */}
              {step === 3 && (
                <motion.div
                  key="step-3"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="space-y-6"
                >
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-[#8B5E1A]">
                      DISPATCH DESTINATION & CONTACT
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#000080] mt-1">
                      Where are we delivering?
                    </h2>
                    <p className="text-slate-600 text-sm mt-1.5 leading-relaxed">
                      Our corporate sales director will formulate an official, tax-compliant quotation with freight calculations.
                    </p>
                  </div>

                  {/* Form Inputs Grid */}
                  <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4">
                    
                    {/* Row 1: Full Name & Company Name */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            required
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="e.g. Engr. Tariq Mehmood"
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:border-[#000080] focus:ring-2 focus:ring-[#000080]/20 transition-all bg-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          Company / Contractor Name <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Building className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            required
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            placeholder="e.g. Frontier Engineering Ltd"
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:border-[#000080] focus:ring-2 focus:ring-[#000080]/20 transition-all bg-white"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Row 2: Phone & Corporate Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          Phone / WhatsApp Number <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            type="tel"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+92 300 1234567"
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:border-[#000080] focus:ring-2 focus:ring-[#000080]/20 transition-all bg-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          Corporate Email Address <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="procurement@company.com"
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:border-[#000080] focus:ring-2 focus:ring-[#000080]/20 transition-all bg-white"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Row 3: City Dropdown & Delivery Schedule */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          Project Location / Hub City <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <select
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="w-full pl-10 pr-8 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-[#000080] focus:ring-2 focus:ring-[#000080]/20 transition-all bg-white appearance-none cursor-pointer"
                          >
                            {pakistaniCities.map((c) => (
                              <option key={c} value={c}>
                                {c}
                              </option>
                            ))}
                          </select>
                          <div className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs">
                            ▼
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          Target Dispatch Timeline
                        </label>
                        <div className="relative">
                          <Clock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <select
                            value={timeline}
                            onChange={(e) => setTimeline(e.target.value)}
                            className="w-full pl-10 pr-8 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-[#000080] focus:ring-2 focus:ring-[#000080]/20 transition-all bg-white appearance-none cursor-pointer"
                          >
                            <option value="Urgent (Within 72 Hours)">Urgent (Within 72 Hours)</option>
                            <option value="Within 2 Weeks">Within 2 Weeks</option>
                            <option value="Monthly Long-Term Contract">Monthly Long-Term Contract</option>
                            <option value="Future Project Tendering Stage">Future Project Tendering Stage</option>
                          </select>
                          <div className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs">
                            ▼
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Row 4: Additional Project Specifications (Optional) */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Site Access / Unloading Constraints (Optional)
                      </label>
                      <textarea
                        rows={3}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Specify concrete batching coordinates, on-site silo capacity, or custom testing requirements..."
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:border-[#000080] focus:ring-2 focus:ring-[#000080]/20 transition-all bg-white resize-none"
                      />
                    </div>

                  </div>
                </motion.div>
              )}

              {/* =============================================================== */}
              {/* STEP 4: The Success State                                        */}
              {/* =============================================================== */}
              {step === 4 && (
                <motion.div
                  key="step-4"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                  className="text-center py-4 sm:py-6"
                >
                  {/* Animated Path-Length Checkmark Circle */}
                  <div className="relative mx-auto w-24 h-24 mb-6">
                    <motion.div
                      initial={{ scale: 0, rotate: -45 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', damping: 14, stiffness: 180, delay: 0.1 }}
                      className="w-24 h-24 rounded-full bg-[#000080] text-[#F4D5AB] flex items-center justify-center shadow-2xl border-4 border-[#F4D5AB]"
                    >
                      <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <motion.path
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.5, delay: 0.3 }}
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </motion.div>
                  </div>

                  <span className="inline-block text-xs font-mono font-bold tracking-widest uppercase text-[#8B5E1A] bg-[#8B5E1A]/10 px-3.5 py-1 rounded-full mb-3">
                    B2B INQUIRY LOGGED • REF #{procurementId}
                  </span>

                  <h2 className="text-3xl sm:text-4xl font-extrabold text-[#000080] tracking-tight">
                    Quote Request Initiated.
                  </h2>

                  <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-lg mx-auto leading-relaxed">
                    Your procurement ID is <strong className="font-mono text-[#000080]">#{procurementId}</strong>. Our corporate sales team at Sangjani Plant is reviewing your requirements and will email your official quotation within 2 hours.
                  </p>

                  {/* Summary Recap Box */}
                  <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-md max-w-lg mx-auto my-6 text-left space-y-3">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">Order Summary</span>
                      <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        Pending Commercial Review
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <span className="text-slate-400 block font-mono">Product Grade:</span>
                        <span className="font-bold text-[#000080]">{activeProductMeta.title}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block font-mono">Volume Requested:</span>
                        <span className="font-bold text-[#000080]">{volume.toLocaleString()} Metric Tons</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block font-mono">Packaging Fleet:</span>
                        <span className="font-bold text-slate-700">
                          {packaging === 'bulk' ? 'Bulk Pneumatic Fleet' : 'Standard 50kg Bags'}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 block font-mono">Project Location:</span>
                        <span className="font-bold text-slate-700">{city.split(' (')[0]}</span>
                      </div>
                      <div className="col-span-2 pt-2 border-t border-slate-100">
                        <span className="text-slate-400 block font-mono">Contact Details:</span>
                        <span className="font-bold text-slate-800">
                          {fullName} ({companyName}) • {email}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Return Actions */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                    <Link
                      href="/"
                      className="w-full sm:w-auto px-8 py-3.5 rounded-full text-sm font-bold bg-[#000080] text-white hover:bg-[#F4D5AB] hover:text-[#000080] transition-all duration-300 shadow-xl flex items-center justify-center gap-2 group"
                    >
                      <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                      <span>Return to Homepage</span>
                    </Link>

                    <button
                      type="button"
                      onClick={() => {
                        setStep(1);
                        setErrorMessage('');
                      }}
                      className="w-full sm:w-auto px-6 py-3.5 rounded-full text-sm font-semibold text-slate-600 hover:text-[#000080] hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Configure Another Quote</span>
                    </button>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>

        {/* --------------------------------------------------------------------- */}
        {/* C. STICKY NAVIGATION FOOTER (Steps 1 to 3)                            */}
        {/* --------------------------------------------------------------------- */}
        {step < 4 && (
          <div className="sticky bottom-0 z-20 bg-[#F1F5F9]/95 backdrop-blur-md border-t border-slate-200/90 px-6 sm:px-8 lg:px-12 py-4">
            <div className="max-w-2xl mx-auto flex items-center justify-between gap-4">
              
              {/* Back Button (Ghost Button) */}
              <button
                type="button"
                onClick={handleBack}
                disabled={step === 1}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all flex items-center gap-1.5 ${
                  step === 1
                    ? 'opacity-0 pointer-events-none'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/80'
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              {/* Next Step / Request Quote Button (Solid #000080 turning #F4D5AB on hover) */}
              <button
                type="button"
                onClick={handleNext}
                className="px-8 py-3.5 rounded-full text-sm font-bold bg-[#000080] text-white hover:bg-[#F4D5AB] hover:text-[#000080] transition-all duration-300 shadow-xl flex items-center gap-2 group active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#000080]"
              >
                <span>
                  {step === 1 && 'Next: Volume & Logistics'}
                  {step === 2 && 'Next: Project Details'}
                  {step === 3 && 'Submit Quote Request'}
                </span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>

            </div>
          </div>
        )}

      </div>

    </div>
  );
}
