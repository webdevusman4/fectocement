# Home V4.3 — Executive restraint motion audit

Approved direction: **Option A — Executive restraint**. Goal: motion that feels precise, calm, architectural, and appropriate for a large industrial cement company. **Initial scope:** Founder Legacy and Company History. The same restraint was later extended to Product Portfolio, Sustainability & ESG, and Iconic Projects; see `docs/home-v4-3-final-three-sections.md`. A final whole-home remediation then standardized Hero/Stats/Plant/Stakeholder/Footer and made every section capture-safe; see `docs/home-v4-3-remediation.md`.

## Before editing: current V4.2 state

- `app/page.tsx` still renders the original V3 homepage; V4.3 is isolated at `/home-v4-3`.
- V4.2 forced `staticReveal` on both sections, producing stable but visually flat full-page captures.
- Founder still contained parallax, exit scale/opacity/y, portrait scrub zoom, reactive glow crossfades, keyword slides, and mixed `0.3s / 0.4s / 1.2s` timings.
- History still contained scroll-scrubbed year rises, image parallax, animated grayscale, node pulses, and `1.1s / 1.2s easeOut` data animations.
- Both sections already used shared `EASE` and `DUR` tokens in places, so refinement required no new dependency, global CSS, or token change.

## Founder Legacy — applied changes

| Removed | Replaced with |
| --- | --- |
| Background parallax | Static layered background. |
| Exit scale / opacity / y on the whole content column | Stable column with independent one-time reveals. |
| Scroll-linked portrait zoom `1 → 1.04` | One-time composed fade with `0.985 → 1` scale over `DUR.slow`; no hover zoom. |
| Reactive sand/blue glow crossfades at `1.2s easeInOut` | One restrained static ambient-warmth layer. |
| Horizontal `-4px` inactive-statement shift | Opacity-only active state at `DUR.fast`, plus sand numeral color. |
| Keyword slide `y: 12 → 0 → -8` with mixed easing | Pure opacity crossfade at `DUR.fast`. |
| Mask-rise closing headline | Simple one-time opacity fade. |
| `0.4s / 0.3s / 1.2s` mixed timings | `DUR.fast`, `DUR.base`, `DUR.slow` with shared `EASE`. |

New reveal sequence:

- Eyebrow: `opacity + 10px`, `DUR.base`.
- Headline: `opacity + 10px`, `DUR.base`, `0.08s` delay.
- Intro: `opacity + 10px`, `DUR.base`, `0.16s` delay.
- Hairlines: one-time `scaleX`, `DUR.base`, `0.08s` per index.
- Quote: one-time opacity fade, `DUR.base`.
- Closing beat: one-time opacity fade, `DUR.base`.
- Portrait: one-time opacity/scale, `DUR.slow`.

## Company History — applied changes

| Removed | Replaced with |
| --- | --- |
| `105% → 0%` scroll-scrubbed year rise | One-time `clip-path: inset(100% …) → inset(0% …)` over `DUR.slow`, or static in capture mode. |
| `y: 36` row entrance at `DUR.slow` | `opacity + 12px` over `DUR.base`, once. |
| Main/small image parallax drift | Static image cards. |
| Animated grayscale MotionValue | Static era grayscale applied once through CSS `filter`. |
| `group-hover:scale-105 / 110` | Restrained `group-hover:scale-[1.02]` with a `500ms` shared-ease transition. |
| Node pulse ring | Static node color/shadow change at `250ms`. |
| `1.1s / 1.2s easeOut` meter, route, and progress animation | `DUR.slow` with shared `EASE`; `0.08s` meter stagger. |
| Pulsing roadmap status dot | Static emerald indicator. |
| Single `y: 18` header entrance at `DUR.slow` | Staggered eyebrow / headline / intro / summary-card reveals at `0.08s`, `0.16s`, `0.24s`. |

Retained:

- Central gold rail `scaleY` scroll progress — the only scroll-linked transform.
- `useMotionValueEvent` for discrete active-node state.
- Alternating editorial layout, 1981 breakout panel, all seven sample milestones, and all five viz types.
- V4.2 copy, spacing, sample-data labels, and disclaimer.

## Motion rules compliance

- Animated properties: `opacity`, `transform`, `clip-path`, `pathLength`, and width for small data bars.
- No animated `blur`, `filter`, or large-area `backdrop-filter`.
- One easing curve: `EASE = [0.22, 1, 0.36, 1]`.
- Durations: `0.25s`, `0.5s`, `0.8s`; `0.08s` stagger.
- No per-frame React state; only discrete active-state updates.
- No pinned/sticky behavior in these two edited sections beyond the existing Founder portrait wrapper.
- Mobile, reduced-motion, and `SCREENSHOT_SAFE_MODE` are static.
- Semantic order, focus rings, and ARIA labels are unchanged.

## Later Hero portrait placement adjustment

After the supplied desktop screenshots showed the fourth slide's founder portrait in the lower-right corner and clipped by the Stats overlap, only the V4.3 Hero foreground was re-composed:

- Bottom alignment, `object-bottom`, the left-edge mask, and the former `x: 48` horizontal entrance were removed.
- The complete portrait is now shown with `object-contain` inside a bounded, vertically centered 3:4 archival card (`width: min(320px, 40.5svh)`, `height: min(430px, 54svh)`), with reserved bottom clearance and a static name plate.
- The entrance is opacity-only at `DUR.base`, the exit is opacity-only at `DUR.fast`, and reduced-motion/capture mode starts visible with `initial={false}`.
- No parallax, zoom, glow, scrubbing, or new dependency was added. The source image and all other routes remain unchanged.

## Capture mode

`versions/home-v4-3/source/components/SampleHomeV3Content.tsx` defines:

```ts
const SCREENSHOT_SAFE_MODE = false;
```

Set it to `true` for full-page screenshot capture or static review. It passes `staticReveal` to all ten V4.3 sections, disables Hero autoplay and Plant pinning, and keeps the Footer in normal flow — all while preserving layout and content.

## Scope

- Production `/`: untouched.
- `/home-v4` and `/home-v4-2`: untouched.
- CTA band, Footer, Plant Anatomy, Stakeholder Routing Grid, Hero, and Stats were unchanged in the initial motion pass, then made capture-safe and restrained in the remediation pass.
- The later final-three extension edits three more section components plus the V4.3 wiring and adds one local reveal helper. The remediation pass also updates Hero, Stats, Plant, Stakeholder, Footer, QuoteModal, motion preferences, and Next config. A later visual follow-up adjusts only the Hero “Our story” portrait card. No global CSS or root public assets changed.
- `versions/home-v4-3/public`: symlink to root `public/`; no duplicated binary assets.
