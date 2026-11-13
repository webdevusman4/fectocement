'use client';

import React, { useMemo, useState } from 'react';
import { MessageSquareText, Package } from 'lucide-react';
import {
  CFT_PER_M3,
  CONCRETE_MIXES,
  MORTAR_MIXES,
  estimateMaterials,
  type Unit,
  type WorkType,
} from '@/lib/assistant/calculators';

const WORKS: { key: WorkType; label: string; hint: string }[] = [
  { key: 'concrete', label: 'Concrete', hint: 'Slab, beam, footing, floor' },
  { key: 'brickwork', label: 'Brick masonry', hint: 'Walls with cement mortar' },
  { key: 'plaster', label: 'Plaster', hint: 'Wall or ceiling plaster' },
];

const fmt = (n: number, digits = 1) => n.toLocaleString('en-US', { maximumFractionDigits: digits, minimumFractionDigits: 0 });

export const fieldClass =
  'w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-[#000080]/40 focus:ring-2 focus:ring-[#000080]/15';

export function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold text-slate-600">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-[11px] text-slate-400">{hint}</span>}
    </label>
  );
}

export default function BagCalculator({ onAsk }: { onAsk: (prompt: string) => void }) {
  const [work, setWork] = useState<WorkType>('concrete');
  const [unit, setUnit] = useState<Unit>('ft');
  const [length, setLength] = useState('30');
  const [width, setWidth] = useState('20');
  const [thickness, setThickness] = useState('0.42');
  const [mixKey, setMixKey] = useState(CONCRETE_MIXES[0].key);
  const [wastage, setWastage] = useState('5');

  const mixes = work === 'concrete' ? CONCRETE_MIXES : MORTAR_MIXES;

  const switchWork = (next: WorkType) => {
    setWork(next);
    setMixKey((next === 'concrete' ? CONCRETE_MIXES : MORTAR_MIXES)[next === 'concrete' ? 0 : 1].key);
    if (next === 'concrete') {
      setLength('30');
      setWidth('20');
      setThickness(unit === 'ft' ? '0.42' : '0.125');
    } else if (next === 'brickwork') {
      setLength('40');
      setWidth('10');
      setThickness('9');
    } else {
      setLength('40');
      setWidth('10');
      setThickness('12');
    }
  };

  const result = useMemo(
    () =>
      estimateMaterials({
        work,
        unit,
        length: Number(length),
        width: Number(width),
        thickness: Number(thickness),
        mixKey,
        wastagePct: Number(wastage) || 0,
      }),
    [work, unit, length, width, thickness, mixKey, wastage]
  );

  const u = unit === 'ft' ? 'ft' : 'm';
  const thicknessLabel = work === 'concrete' ? `Depth (${u})` : work === 'brickwork' ? 'Wall thickness (inches)' : 'Plaster thickness (mm)';
  const thicknessHint = work === 'concrete' ? (unit === 'ft' ? '5 inch slab = 0.42 ft' : '125 mm slab = 0.125 m') : work === 'brickwork' ? '4.5 or 9 inch' : '12 mm inside, 20 mm outside';

  const askPrompt = result
    ? `I used the bag calculator for ${WORKS.find((w) => w.key === work)?.label.toLowerCase()}: ${length} × ${width} ${u}, ${thicknessLabel.toLowerCase()} ${thickness}, mix ${result.mix.label}. It estimated ${result.bags} bags of cement, ${fmt(result.sandM3 * CFT_PER_M3, 0)} cft sand${result.crushM3 ? ` and ${fmt(result.crushM3 * CFT_PER_M3, 0)} cft crush` : ''}. Is this mix right for my work, and what should I check on site?`
    : '';

  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="mb-6">
        <h2 className="text-xl font-bold tracking-tight text-[#000080] sm:text-2xl">Bag calculator</h2>
        <p className="mt-1 text-sm text-slate-500">Cement bags, sand and crush for concrete, brickwork and plaster. Works offline and doesn’t use your daily questions.</p>
      </div>

      <div className="mb-5 grid grid-cols-3 gap-2 rounded-2xl bg-slate-100 p-1.5">
        {WORKS.map((w) => (
          <button
            key={w.key}
            type="button"
            onClick={() => switchWork(w.key)}
            aria-pressed={work === w.key}
            className={`rounded-xl px-3 py-2.5 text-left transition ${work === w.key ? 'bg-white text-[#000080] shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
          >
            <span className="block text-sm font-semibold">{w.label}</span>
            <span className="hidden text-[11px] text-slate-400 sm:block">{w.hint}</span>
          </button>
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.1fr_1fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-800">Measurements</span>
            <div className="flex rounded-full bg-slate-100 p-0.5 text-xs font-semibold">
              {(['ft', 'm'] as const).map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => {
                    setUnit(opt);
                    if (work === 'concrete') setThickness(opt === 'ft' ? '0.42' : '0.125');
                  }}
                  aria-pressed={unit === opt}
                  className={`rounded-full px-3 py-1 transition ${unit === opt ? 'bg-[#000080] text-white' : 'text-slate-500'}`}
                >
                  {opt === 'ft' ? 'Feet' : 'Metres'}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Field label={`Length (${u})`}>
              <input inputMode="decimal" className={fieldClass} value={length} onChange={(e) => setLength(e.target.value)} />
            </Field>
            <Field label={work === 'concrete' ? `Width (${u})` : `Height (${u})`}>
              <input inputMode="decimal" className={fieldClass} value={width} onChange={(e) => setWidth(e.target.value)} />
            </Field>
            <Field label={thicknessLabel} hint={thicknessHint}>
              <input inputMode="decimal" className={fieldClass} value={thickness} onChange={(e) => setThickness(e.target.value)} />
            </Field>
            <Field label="Wastage (%)" hint="5% is typical">
              <input inputMode="decimal" className={fieldClass} value={wastage} onChange={(e) => setWastage(e.target.value)} />
            </Field>
            <div className="col-span-2">
              <Field label={work === 'concrete' ? 'Mix (cement : sand : crush)' : 'Mortar mix (cement : sand)'}>
                <select className={fieldClass} value={mixKey} onChange={(e) => setMixKey(e.target.value)}>
                  {mixes.map((m) => (
                    <option key={m.key} value={m.key}>
                      {m.label} · {m.use}
                    </option>
                  ))}
                </select>
              </Field>
            </div>
          </div>
        </div>

        <div className="flex flex-col rounded-2xl bg-[linear-gradient(150deg,#000080_0%,#0B1245_100%)] p-5 text-white shadow-[0_20px_45px_-20px_rgba(0,0,128,0.6)]">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#F4D5AB]">
            <Package className="h-4 w-4" />
            Estimate
          </div>
          {result ? (
            <>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-5xl font-bold tracking-tight">{result.bags}</span>
                <span className="text-sm font-semibold text-white/80">bags of cement (50 kg)</span>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                <Stat label="Sand" value={`${fmt(result.sandM3 * CFT_PER_M3, 0)} cft`} sub={`${fmt(result.sandM3, 2)} m³`} />
                {result.crushM3 !== undefined && <Stat label="Crush (aggregate)" value={`${fmt(result.crushM3 * CFT_PER_M3, 0)} cft`} sub={`${fmt(result.crushM3, 2)} m³`} />}
                {result.bricks !== undefined && <Stat label="Bricks" value={fmt(result.bricks, 0)} sub="9″ × 4.5″ × 3″" />}
                {result.waterLitres !== undefined && <Stat label="Water (approx.)" value={`${fmt(result.waterLitres, 0)} L`} sub="w/c ≈ 0.5" />}
                {result.areaM2 !== undefined && <Stat label="Area" value={`${fmt(result.areaM2 * 10.7639, 0)} sq ft`} sub={`${fmt(result.areaM2, 1)} m²`} />}
                <Stat label="Volume" value={`${fmt(result.wetVolumeM3 * CFT_PER_M3, 1)} cft`} sub={`${fmt(result.wetVolumeM3, 2)} m³`} />
              </div>
              <ul className="mt-5 space-y-1 border-t border-white/10 pt-4 text-[11px] leading-relaxed text-white/60">
                {result.assumptions.map((a) => (
                  <li key={a}>• {a}</li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => onAsk(askPrompt)}
                className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-[#F4D5AB] px-4 py-2.5 text-sm font-semibold text-[#000080] transition hover:bg-white"
              >
                <MessageSquareText className="h-4 w-4" />
                Ask the assistant about this
              </button>
            </>
          ) : (
            <p className="mt-4 text-sm text-white/70">Enter measurements above zero to see the estimate.</p>
          )}
        </div>
      </div>
      <p className="mt-4 text-center text-[11px] text-slate-400">Estimates are approximate. Please confirm quantities with a qualified engineer or contractor.</p>
    </div>
  );
}

function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-xl bg-white/[0.07] p-3 ring-1 ring-inset ring-white/10">
      <div className="text-[11px] text-white/60">{label}</div>
      <div className="mt-0.5 text-lg font-semibold">{value}</div>
      {sub && <div className="text-[11px] text-white/50">{sub}</div>}
    </div>
  );
}
