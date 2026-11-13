/**
 * Homebuilder tools for the assistant: run in the browser, no AI request, no quota.
 * Figures follow common Pakistani site practice and IS 456 guidance. They are estimates for
 * planning, not a design; the UI says so next to every result.
 */

export const BAG_KG = 50;
export const CEMENT_DENSITY = 1440; // kg/m³ (loose bulk density used for bag counts)
export const BAG_M3 = BAG_KG / CEMENT_DENSITY; // ≈ 0.0347 m³ per bag
export const CFT_PER_M3 = 35.3147;
export const M_PER_FT = 0.3048;

export type Unit = 'ft' | 'm';
export type WorkType = 'concrete' | 'brickwork' | 'plaster';

export interface MixOption {
  key: string;
  label: string;
  use: string;
  parts: number[]; // cement : sand (: crush)
}

export const CONCRETE_MIXES: MixOption[] = [
  { key: '1:1.5:3', label: '1 : 1.5 : 3', use: 'Slabs, beams, columns (≈ M20)', parts: [1, 1.5, 3] },
  { key: '1:2:4', label: '1 : 2 : 4', use: 'Footings, lintels, light RCC (≈ M15)', parts: [1, 2, 4] },
  { key: '1:3:6', label: '1 : 3 : 6', use: 'Plain concrete, floor base, blinding (≈ M10)', parts: [1, 3, 6] },
];

export const MORTAR_MIXES: MixOption[] = [
  { key: '1:4', label: '1 : 4', use: 'Strong masonry, external work', parts: [1, 4] },
  { key: '1:5', label: '1 : 5', use: 'General load-bearing walls', parts: [1, 5] },
  { key: '1:6', label: '1 : 6', use: 'Partition walls, internal plaster', parts: [1, 6] },
];

const DRY_FACTOR: Record<WorkType, number> = { concrete: 1.54, brickwork: 1.33, plaster: 1.33 };
const MORTAR_SHARE_OF_WALL = 0.3; // mortar ≈ 30% of a brick wall's volume
const BRICKS_PER_CFT = 13.5; // standard 9" × 4.5" × 3" bricks with 3/8" joints

export interface EstimateInput {
  work: WorkType;
  unit: Unit;
  length: number;
  /** concrete: width; brickwork/plaster: wall height */
  width: number;
  /** concrete: depth (unit); brickwork: wall thickness (inches); plaster: thickness (mm) */
  thickness: number;
  mixKey: string;
  wastagePct: number;
}

export interface EstimateResult {
  wetVolumeM3: number;
  areaM2?: number;
  bags: number;
  cementKg: number;
  sandM3: number;
  crushM3?: number;
  bricks?: number;
  waterLitres?: number;
  mix: MixOption;
  assumptions: string[];
}

const toMetres = (value: number, unit: Unit) => (unit === 'ft' ? value * M_PER_FT : value);

export function estimateMaterials(input: EstimateInput): EstimateResult | null {
  const { work, unit, length, width, thickness, wastagePct } = input;
  if (![length, width, thickness].every((v) => Number.isFinite(v) && v > 0)) return null;

  const mixes = work === 'concrete' ? CONCRETE_MIXES : MORTAR_MIXES;
  const mix = mixes.find((m) => m.key === input.mixKey) ?? mixes[0];
  const L = toMetres(length, unit);
  const W = toMetres(width, unit);
  const waste = 1 + Math.max(0, wastagePct) / 100;

  let wetVolumeM3 = 0;
  let mortarOrConcreteM3 = 0;
  let areaM2: number | undefined;
  let bricks: number | undefined;
  const assumptions: string[] = [];

  if (work === 'concrete') {
    const D = toMetres(thickness, unit);
    wetVolumeM3 = L * W * D;
    mortarOrConcreteM3 = wetVolumeM3;
    assumptions.push('Dry volume = wet volume × 1.54 (voids and bulking).');
  } else if (work === 'brickwork') {
    const T = thickness * 0.0254; // inches → m
    wetVolumeM3 = L * W * T;
    areaM2 = L * W;
    mortarOrConcreteM3 = wetVolumeM3 * MORTAR_SHARE_OF_WALL;
    bricks = Math.ceil(wetVolumeM3 * CFT_PER_M3 * BRICKS_PER_CFT * waste);
    assumptions.push('Mortar is about 30% of the wall volume; dry volume = mortar × 1.33.');
    assumptions.push(`About ${BRICKS_PER_CFT} standard bricks (9" × 4.5" × 3") per cft of wall.`);
  } else {
    const T = thickness / 1000; // mm → m
    areaM2 = L * W;
    wetVolumeM3 = areaM2 * T;
    mortarOrConcreteM3 = wetVolumeM3;
    assumptions.push('Dry volume = plaster volume × 1.33 (bulking and joint filling).');
  }

  const dry = mortarOrConcreteM3 * DRY_FACTOR[work] * waste;
  const sum = mix.parts.reduce((a, b) => a + b, 0);
  const cementM3 = (dry * mix.parts[0]) / sum;
  const cementKg = cementM3 * CEMENT_DENSITY;
  const bags = Math.ceil(cementKg / BAG_KG);
  const sandM3 = (dry * mix.parts[1]) / sum;
  const crushM3 = work === 'concrete' ? (dry * mix.parts[2]) / sum : undefined;
  const waterLitres = work === 'concrete' ? Math.round(cementKg * 0.5) : undefined;

  assumptions.push(`1 bag = ${BAG_KG} kg ≈ ${BAG_M3.toFixed(4)} m³ (${(BAG_M3 * CFT_PER_M3).toFixed(2)} cft); ${wastagePct}% wastage added.`);
  if (work === 'concrete') assumptions.push('Water at a water–cement ratio of about 0.5; use clean, sweet water.');

  return { wetVolumeM3, areaM2, bags, cementKg, sandM3, crushM3, bricks, waterLitres, mix, assumptions };
}

/* ───────────── Curing planner ───────────── */

export type CuringElement = 'slab' | 'beam' | 'column' | 'footing' | 'plaster' | 'masonry';
export type CementKind = 'opc' | 'src' | 'blended';
export type Weather = 'hot' | 'moderate' | 'cold';

export const CURING_ELEMENTS: { key: CuringElement; label: string }[] = [
  { key: 'slab', label: 'Roof / floor slab' },
  { key: 'beam', label: 'Beams' },
  { key: 'column', label: 'Columns & RCC walls' },
  { key: 'footing', label: 'Foundation / footing' },
  { key: 'plaster', label: 'Plaster' },
  { key: 'masonry', label: 'Brick masonry' },
];

export const CEMENT_KINDS: { key: CementKind; label: string }[] = [
  { key: 'opc', label: 'OPC (Ordinary Portland)' },
  { key: 'src', label: 'SRC (Sulphate Resisting)' },
  { key: 'blended', label: 'Blended / slag / fly-ash' },
];

export const WEATHERS: { key: Weather; label: string }[] = [
  { key: 'hot', label: 'Hot & dry (above 35 °C)' },
  { key: 'moderate', label: 'Moderate (15–35 °C)' },
  { key: 'cold', label: 'Cold (below 15 °C)' },
];

export interface CuringStep {
  day: number; // days after casting (0 = casting day)
  date: Date;
  title: string;
  detail: string;
  kind: 'cast' | 'cure' | 'formwork' | 'strength' | 'done';
}

export interface CuringPlan {
  curingDays: number;
  wateringPerDay: string;
  steps: CuringStep[];
  notes: string[];
}

const addDays = (d: Date, n: number) => {
  const out = new Date(d);
  out.setDate(out.getDate() + n);
  return out;
};

export function planCuring(opts: {
  element: CuringElement;
  cement: CementKind;
  weather: Weather;
  castDate: Date;
  longSpan: boolean; // slab > 4.5 m or beam > 6 m
}): CuringPlan {
  const { element, cement, weather, castDate, longSpan } = opts;
  const isConcrete = element === 'slab' || element === 'beam' || element === 'column' || element === 'footing';
  const slowCement = cement !== 'opc'; // SRC and blended cements gain strength more slowly early on

  let curingDays: number;
  if (isConcrete) {
    // IS 456: at least 7 days for OPC, 10 days for blended cements; extend in hot, dry weather
    curingDays = slowCement ? 10 : 7;
    if (weather === 'hot') curingDays = slowCement ? 14 : 10;
    if (weather === 'cold') curingDays += 3;
    if (element === 'slab' || element === 'footing') curingDays = Math.max(curingDays, 10);
  } else {
    curingDays = weather === 'hot' ? 10 : 7;
  }

  const wateringPerDay =
    weather === 'hot'
      ? '3–4 times a day; keep hessian or ponding wet at all times'
      : weather === 'moderate'
        ? '2–3 times a day; never let the surface dry out'
        : '1–2 times a day in the warm hours; cover at night and protect from frost';

  // Formwork times are IS 456 minimums for OPC at normal temperatures; slower cements and cold weather need longer
  const slow = slowCement || weather === 'cold' ? 1.5 : 1;
  const steps: CuringStep[] = [
    { day: 0, date: castDate, kind: 'cast', title: 'Casting day', detail: 'Compact well. Protect fresh concrete from sun, wind and rain.' },
  ];

  if (isConcrete) {
    steps.push({ day: 1, date: addDays(castDate, 1), kind: 'cure', title: 'Start curing', detail: 'Begin wet curing once the surface has hardened (about 12–24 hours after casting).' });
    if (element === 'column' || element === 'beam') {
      steps.push({ day: 1, date: addDays(castDate, 1), kind: 'formwork', title: 'Remove side shuttering', detail: 'Vertical forms of columns and beam sides: 16–24 hours after casting. Then wrap in wet hessian.' });
    }
    if (element === 'slab') {
      const soffit = Math.ceil(3 * slow);
      const props = Math.ceil((longSpan ? 14 : 7) * slow);
      steps.push({ day: soffit, date: addDays(castDate, soffit), kind: 'formwork', title: 'Remove slab shuttering (keep props)', detail: 'Soffit formwork can come off, but props must stay in place underneath.' });
      steps.push({ day: props, date: addDays(castDate, props), kind: 'formwork', title: 'Remove slab props', detail: `Props for spans ${longSpan ? 'over' : 'up to'} 4.5 m. Ask your engineer before loading the slab.` });
    }
    if (element === 'beam') {
      const props = Math.ceil((longSpan ? 21 : 14) * slow);
      steps.push({ day: props, date: addDays(castDate, props), kind: 'formwork', title: 'Remove beam props', detail: `Props for spans ${longSpan ? 'over' : 'up to'} 6 m.` });
    }
    steps.push({ day: 7, date: addDays(castDate, 7), kind: 'strength', title: 'About 65–70% strength', detail: slowCement ? 'Slower cements are a little lower at 7 days and catch up later.' : 'Typical for OPC at 7 days with good curing.' });
  } else {
    steps.push({ day: 1, date: addDays(castDate, 1), kind: 'cure', title: 'Start curing', detail: element === 'plaster' ? 'Spray water gently the next day; do not wash the surface.' : 'Wet the masonry the next day; keep joints damp.' });
  }

  steps.push({ day: curingDays, date: addDays(castDate, curingDays), kind: 'done', title: 'Curing can stop', detail: `Minimum ${curingDays} days of continuous moist curing for this element, cement and weather.` });
  if (isConcrete) {
    steps.push({ day: 28, date: addDays(castDate, 28), kind: 'strength', title: 'Design strength', detail: 'Concrete reaches its specified 28-day strength.' });
  }
  steps.sort((a, b) => a.day - b.day);

  const notes = [
    'Use clean, sweet water for curing; salty water damages concrete.',
    'Longer curing always helps; 14 days gives better strength and fewer cracks.',
  ];
  if (slowCement) notes.push('SRC and blended cements gain early strength more slowly; formwork dates above are already extended by half.');
  if (weather === 'cold') notes.push('In cold weather keep concrete covered and above 5 °C; formwork dates are extended.');

  return { curingDays, wateringPerDay, steps, notes };
}
