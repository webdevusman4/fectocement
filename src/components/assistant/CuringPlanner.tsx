'use client';

import React, { useMemo, useState } from 'react';
import { CalendarCheck2, Droplets, Hammer, MessageSquareText, Sparkles, TrendingUp } from 'lucide-react';
import {
  CEMENT_KINDS,
  CURING_ELEMENTS,
  WEATHERS,
  planCuring,
  type CementKind,
  type CuringElement,
  type CuringStep,
  type Weather,
} from '@/lib/assistant/calculators';
import { Field, fieldClass } from './BagCalculator';

const todayISO = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

const DATE_FMT = new Intl.DateTimeFormat('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });

const STEP_ICON: Record<CuringStep['kind'], React.ElementType> = {
  cast: Hammer,
  cure: Droplets,
  formwork: Hammer,
  strength: TrendingUp,
  done: CalendarCheck2,
};

export default function CuringPlanner({ onAsk }: { onAsk: (prompt: string) => void }) {
  const [element, setElement] = useState<CuringElement>('slab');
  const [cement, setCement] = useState<CementKind>('opc');
  const [weather, setWeather] = useState<Weather>('hot');
  const [date, setDate] = useState(todayISO);
  const [longSpan, setLongSpan] = useState(false);

  const plan = useMemo(() => {
    const [y, m, d] = date.split('-').map(Number);
    const castDate = y && m && d ? new Date(y, m - 1, d) : new Date();
    return planCuring({ element, cement, weather, castDate, longSpan });
  }, [element, cement, weather, date, longSpan]);

  const showSpan = element === 'slab' || element === 'beam';
  const elementLabel = CURING_ELEMENTS.find((e) => e.key === element)?.label ?? element;
  const cementLabel = CEMENT_KINDS.find((c) => c.key === cement)?.label ?? cement;
  const weatherLabel = WEATHERS.find((w) => w.key === weather)?.label ?? weather;

  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="mb-6">
        <h2 className="text-xl font-bold tracking-tight text-[#000080] sm:text-2xl">Curing planner</h2>
        <p className="mt-1 text-sm text-slate-500">A day-by-day curing and de-shuttering schedule from your casting date. Doesn’t use your daily questions.</p>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_1.15fr]">
        <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <Field label="What did you cast?">
            <select className={fieldClass} value={element} onChange={(e) => setElement(e.target.value as CuringElement)}>
              {CURING_ELEMENTS.map((o) => <option key={o.key} value={o.key}>{o.label}</option>)}
            </select>
          </Field>
          <Field label="Cement">
            <select className={fieldClass} value={cement} onChange={(e) => setCement(e.target.value as CementKind)}>
              {CEMENT_KINDS.map((o) => <option key={o.key} value={o.key}>{o.label}</option>)}
            </select>
          </Field>
          <Field label="Weather">
            <select className={fieldClass} value={weather} onChange={(e) => setWeather(e.target.value as Weather)}>
              {WEATHERS.map((o) => <option key={o.key} value={o.key}>{o.label}</option>)}
            </select>
          </Field>
          <Field label="Casting date">
            <input type="date" className={fieldClass} value={date} onChange={(e) => setDate(e.target.value)} />
          </Field>
          {showSpan && (
            <label className="flex items-center gap-2.5 rounded-xl bg-slate-50 px-3 py-2.5 text-sm text-slate-700">
              <input type="checkbox" className="h-4 w-4 accent-[#000080]" checked={longSpan} onChange={(e) => setLongSpan(e.target.checked)} />
              {element === 'slab' ? 'Span longer than 4.5 m (15 ft)' : 'Span longer than 6 m (20 ft)'}
            </label>
          )}
          <div className="rounded-xl bg-[#F4D5AB]/30 p-3 text-sm text-slate-700">
            <div className="flex items-center gap-2 font-semibold text-[#000080]">
              <Droplets className="h-4 w-4" />
              Keep it wet for {plan.curingDays} days
            </div>
            <p className="mt-1 text-xs text-slate-600">Watering: {plan.wateringPerDay}.</p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 text-sm font-semibold text-slate-800">Schedule</div>
          <ol className="relative space-y-4 before:absolute before:bottom-2 before:left-[15px] before:top-2 before:w-px before:bg-slate-200">
            {plan.steps.map((s, i) => {
              const Icon = STEP_ICON[s.kind];
              const highlight = s.kind === 'done' || s.kind === 'cast';
              return (
                <li key={`${s.day}-${i}`} className="relative flex gap-3">
                  <span className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${highlight ? 'bg-[#000080] text-white' : 'bg-white text-[#000080] ring-1 ring-slate-200'}`}>
                    <Icon className="h-4 w-4" />
                  </span>
                  <div className="min-w-0 pb-1">
                    <div className="flex flex-wrap items-baseline gap-x-2">
                      <span className="text-sm font-semibold text-slate-900">{s.title}</span>
                      <span className="text-xs text-slate-400">Day {s.day} · {DATE_FMT.format(s.date)}</span>
                    </div>
                    <p className="mt-0.5 text-xs leading-relaxed text-slate-500">{s.detail}</p>
                  </div>
                </li>
              );
            })}
          </ol>
          <ul className="mt-5 space-y-1 border-t border-slate-100 pt-4 text-[11px] leading-relaxed text-slate-500">
            {plan.notes.map((n) => <li key={n} className="flex gap-1.5"><Sparkles className="mt-0.5 h-3 w-3 shrink-0 text-[#000080]/50" />{n}</li>)}
          </ul>
          <button
            type="button"
            onClick={() =>
              onAsk(`I cast a ${elementLabel.toLowerCase()} with ${cementLabel} in ${weatherLabel.toLowerCase()} weather. The planner says ${plan.curingDays} days of curing. What is the best curing method on my site, and what mistakes should I avoid?`)
            }
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#000080]/15 bg-[#000080]/[0.04] px-4 py-2.5 text-sm font-semibold text-[#000080] transition hover:bg-[#000080]/[0.08]"
          >
            <MessageSquareText className="h-4 w-4" />
            Ask the assistant about curing
          </button>
        </div>
      </div>
      <p className="mt-4 text-center text-[11px] text-slate-400">General guidance based on IS 456 practice for normal conditions. Follow your engineer’s instructions on site.</p>
    </div>
  );
}
