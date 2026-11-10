# Home V4.3 — whole-home functionality audit

**Date:** 2026-11-10<br>
**Branch:** `arena/5cc6d193-fectocement`<br>
**Route audited:** `/home-v4-3`<br>
**Scope:** Full homepage composition, with emphasis on the Hero/Stats opening and the sections that were intentionally left untouched in earlier V4.3 passes.<br>
**Result:** The page works, but **yes, it needs a focused improvement pass**. The five refined sections are stable; the remaining gaps are functional wiring, deterministic capture, modal accessibility, sample-data consistency, and whole-page motion consistency.

**Status (2026-11-10): remediated.** Every P1, P2, and P3 item below was addressed in the follow-up pass. See `docs/home-v4-3-remediation.md` for the applied fixes and final validation.

**Later visual follow-up (2026-11-10):** user-supplied screenshots then identified lower-right clipping of the Hero “Our story” founder portrait. A temporary headless Chromium was installed outside the repository to validate the corrected responsive portrait card at four viewports; see `docs/home-v4-3-remediation.md`. The “no browser executable” note in the original validation section below applies only to the audit moment.

This document records the pre-fix audit; no application code was changed while writing it.

---

## 1. How the current home works

### Route and isolation

- `app/page.tsx` still renders production `/` from root `components/` with `FectoNavbar`, `QuoteModal`, and `SampleHomeV3Content`.
- `app/home-v4-3/page.tsx` imports `versions/home-v4-3/source/page`.
- `versions/home-v4-3/source/page.tsx` is another client page with its own `FectoNavbar`, `QuoteModal`, and `SampleHomeV3Content`.
- `/`, `/home-v4`, `/home-v4-2`, and `/home-v4-3` all returned HTTP 200 in the current live preview.
- `versions/home-v4-3/public` is a symlink to complete root `public/`, so all 42 assets are available without duplication.
- **Important:** the live route uses the root `app/layout.tsx` and root `app/globals.css`. The copied `versions/home-v4-3/source/layout.tsx` and `globals.css` are byte-identical but **not active** in the preview; they are useful for a standalone export, not for live V4.3 edits.

### Section order

`SampleHomeV3Content.tsx` renders:

1. Hero / auto-rotating carousel
2. Stats Bento
3. Founder Legacy — V4.3 refined
4. Company History — V4.3 refined
5. Plant Anatomy — untouched
6. Stakeholder Routing Grid — untouched
7. Product Portfolio — V4.3 refined
8. Sustainability & ESG — V4.3 refined
9. Iconic Projects — V4.3 refined
10. Corporate Footer — contains both CTA band and mega footer; untouched

Sheet overlap and z-order are preserved with `Z.founder → Z.cta`, `-mt-[90px]` for Product, `-mt-10` sheet radii, and the existing footer curtain spacer.

### Interactions

- **Hero carousel:** four slides, `autoplay = true`, `intervalMs = 2000`. It pauses on hover, focus, scroll past 40px, out-of-view, hidden tab, manual pause, and reduced motion. Arrow keys and swipe also change slides.
- **Hero → Stats sync:** `onActiveHighlightChange` passes `capacity`, `daily`, `founded`, or `undefined` to `StatsBento`.
- **Hero CTAs:** labels containing “quote” open the quote modal; “Explore products” smooth-scrolls to `#products`; other actions scroll to in-page anchors or navigate to real routes.
- **Quote modal:** opened from the navbar CTA, hero quote actions, the contractor stakeholder card, Product Portfolio, Iconic Projects, and Footer CTA/contact actions.
- **Product tabs:** OPC/SRC keyboard-accessible `role="tablist"` with arrow-key navigation and a static sample spec panel.
- **Project cards:** each is a keyboard-activatable `role="button"` that opens the quote modal with a project reference.
- **Smooth scroll:** root `app/layout.tsx` mounts `SmoothScroll`/Lenis; reduced-motion disables it. Hash links are intercepted with `-90px` offset when a target exists.
- **Capture mode:** `SCREENSHOT_SAFE_MODE = false` by default. When flipped to `true`, it passes `staticReveal` to the five refined sections.

### Current validation

- `./node_modules/.bin/tsc --noEmit`: passed.
- Font-mocked `npm run build`: passed previously with 44/44 static pages; `/home-v4-3` route JS `95.3 kB`, first load JS `273 kB`.
- `git diff --check`: clean.
- Dev routes: `/` 200, `/home-v4` 200, `/home-v4-2` 200, `/home-v4-3` 200.
- V4.3 SSR HTML contains all three new final-section headlines, sample labels, CTA/Footer copy, and no `/images/product-bg.jpg` reference.
- At the time of this audit, no browser executable or live screenshot regression was available in this sandbox; a later temporary headless Chromium was used for the portrait follow-up documented in `docs/home-v4-3-remediation.md`.

---

## 2. What already works well

| Area | Verdict |
| --- | --- |
| Route isolation | Pass. Production `/` and earlier versions are untouched. |
| Section order and sheet layering | Pass. No overlap or z-index regression detected in SSR/build output. |
| Five refined V4.3 sections | Pass. Calm one-time reveals, static capture mode, clear sample labels, and no showroom loops. |
| Asset availability | Pass. All 34 static asset paths referenced by V4.3 source resolve under `public/`. |
| Keyboard basics | Pass for Hero arrows, Product tabs, Project cards, and visible focus rings. |
| Reduced motion basics | Partial. Hero, Stakeholder, Plant, and Footer respond to `useMotionPrefs`; refined sections are fully static in simple mode. |
| Build/runtime | Pass. Typecheck, build, and all four routes are healthy. |

---

## 3. Needs improvement — prioritized

### P1 — Functional correctness

#### 1. Quote context is collected but discarded

`versions/home-v4-3/source/page.tsx` declares:

```ts
const [, setSelectedProduct] = useState<string>('');
```

`handleOpenQuote(productName)` calls `setSelectedProduct(productName)`, but the value is never read and `QuoteModal` only accepts `isOpen` and `onClose`.

Consequences:

- “Request Bulk Quotation” does not preselect OPC/SRC.
- “Project reference: …” is not shown in the modal.
- “Sales & Enterprise” and “Project enquiry” contexts are lost.
- The navbar CTA and every product/project CTA open the same generic form.

**Suggested fix:** pass `selectedProduct` into `QuoteModal`, show a context line, and preselect the cement grade where the string matches OPC/SRC. Keep the form clearly marked as a mock if no backend exists.

#### 2. Several homepage links are dead in this version

`StakeholderRoutingGrid` cards use `#quote`, `#dealers`, `#investors`, and `#careers`. Only `#quote` is intercepted for the contractor card; the other three have no matching IDs in the V4.3 source and no `onCardClick` handler is passed by `SampleHomeV3Content`.

Additional hash-only links in dropdown/mobile/nav components have no matching static IDs on this page: `#bulk-fleet`, `#home`, `#low-heat-cement`, `#msds`, `#opc-cement`, `#quality`, `#src-cement`, `#supply-network`, and `#dealers`.

`#contact` and `#footer` are partially rescued by the footer’s global anchor interceptor, which scrolls to document bottom. `#products`, `#sustainability`, `#plant-anatomy`, `#heritage`, and `#footer` do resolve.

**Suggested fix:** either map these cards to real routes such as `/investors`, `/careers/overview`, and `/infrastructure/iconic-projects`, or pass an `onCardClick` handler that opens a clearly labelled sample destination. Remove or neutralize hash links that are only placeholders.

#### 3. Full-page capture is not fully deterministic

`SCREENSHOT_SAFE_MODE` currently covers only the five refined sections. The untouched systems still vary by scroll/time:

- Hero auto-rotates every 2 seconds and has a looping video slide.
- `StatsBento` receives `trigger={true}` and starts 1.4-second counters on mount.
- `PlantAnatomy` uses a `420svh` outer pinned runway with a sticky `100svh` stage; the earlier screenshot audit recorded a blank `y=6880–8882` run.
- `CorporateFooter` uses a fixed curtain plus spacer; the earlier audit recorded a blank `y=12850–13109` run.
- Footer CTA headline/buttons are still scroll-scrubbed.

**Suggested fix:** extend the capture flag to:

- `HeroSection autoplay={false}` and a fixed first slide.
- `StatsBento` static final values.
- `PlantAnatomy scrollMode={SCREENSHOT_SAFE_MODE ? 'free' : undefined}`.
- `CorporateFooter staticReveal={SCREENSHOT_SAFE_MODE}` to disable the curtain and scrubbed CTA.
- `StakeholderRoutingGrid staticReveal={SCREENSHOT_SAFE_MODE}` to force its simple branch.

This is the cleanest path to a repeatable full-page screenshot without changing normal live behavior.

#### 4. Quote modal accessibility is incomplete

`QuoteModal` has `role="dialog"` and `aria-modal="true"`, but it lacks:

- `aria-labelledby` / `aria-describedby`
- Escape-key close
- focus trapping and initial focus
- focus restoration
- body scroll lock

The backdrop is a clickable `div`, and the form submission is simulated locally with a success state.

**Suggested fix:** add the missing dialog behavior. For a mock design, keep the simulated submission but label it clearly.

---

### P2 — Consistency and professional polish

#### 5. Hero is still faster and more varied than the rest of V4.3

The refined sections use `0.25 / 0.5 / 0.8s` and one shared `EASE`. The Hero still uses:

- `2000ms` slide interval
- `0.2s`, `0.25s`, `0.3s`, `0.4s`, `0.5s`, `0.7s`, and `3s` durations
- `easeOut` for slide text
- masked headline rises and a 3-second media scale
- `active:scale-95` buttons

This is not broken, but a 2-second corporate carousel feels rushed. **Suggested fix:** use `5000–6000ms` dwell, standardize entrance timing to `DUR.base`, and keep only opacity/transform crossfades.

#### 6. Hero/Stats sample-data treatment is weaker than the rest of the page

The final-three sections now say “Sample figure · not certified” and “Mock design note”. The opening still contains definitive claims:

- “PSX-listed cement maker”
- “nearly half of the plant’s electricity”
- “3,000 tons of clinker a day”
- “Fecto Cement Limited established 1981”
- a real founder portrait with historical wording

Only two of four Hero slides are flagged `illustrative`, and that chip is `aria-hidden="true"`. `StatsBento` has no sample footnote.

**Suggested fix:** add a visible, screen-reader-accessible “Illustrative homepage mock” label near the Hero/Stats area, and a compact “Sample figures · not certified” line under Stats. Point “Read our story” to the mock `#heritage` section rather than the real `/company/history` if the V4.3 page is meant to stay self-contained.

#### 7. Whole-page motion language is still split

The final-three and Founder/History sections now follow Executive restraint. Untouched sections still include:

- `StatsBento`: 1.4-second counters, `easeOut`, 600 ms highlight transition
- `PlantAnatomy`: springs, scroll-linked camera pans, 1.1–1.2-second counters, `animate-ping`
- `StakeholderRoutingGrid`: 5% image zoom, navy sweep, `-8px` card lift
- `CorporateFooter`: scroll-scrubbed CTA and fixed-curtain unmask
- global `.surface-elevated:hover`: `-8px` lift with a `0.45s` ease from root CSS

**Suggested fix:** if the goal is one coherent corporate standard, do a separate whole-page restraint pass: one-time reveals, static values, no full-card sweeps, and no scroll-scrubbed footer entrance. This should be its own scoped pass rather than a silent change.

#### 8. `useMotionPrefs` has a small SSR/mobile flash risk

`useMotionPrefs` initializes `isMobile = false` on the server and sets it in `useEffect`. On a real mobile device, animated initial states can exist for one paint before `simple` becomes true.

**Suggested fix:** use a CSS-first reduced/static treatment or `useSyncExternalStore` for the media query, or make initial states opacity-only so the brief mismatch is imperceptible.

---

### P3 — Technical / pre-launch cleanup

#### 9. Next.js config warnings

`next.config.mjs` has no `images.qualities` or `allowedDevOrigins`. Current dev logs show:

- unconfigured image qualities `70`, `40`, and `60`, required starting in Next 16
- a cross-origin `/_next/*` warning from the Arena preview host, also likely to require `allowedDevOrigins` in a future Next major

The preview works today, but these should be fixed before upgrading Next.

#### 10. Large unoptimized media

`public/` contains 42 files / 70.3 MB. Several are 2.8–3.7 MB, and some V4.3 components use `unoptimized` `<Image>` or raw `<img>` for large visuals. Hero video is `preload="none"`, which is good.

**Suggested fix:** generate responsive WebP/AVIF derivatives, use `sizes` consistently, and reserve `unoptimized` only for assets that truly cannot be processed.

#### 11. Versioned layout is inert in the live route

`versions/home-v4-3/source/layout.tsx` and `globals.css` are copied and identical to root, but `app/home-v4-3/page.tsx` still uses the root layout. Editing the versioned CSS will not affect `/home-v4-3`.

**Suggested fix:** either add `app/home-v4-3/layout.tsx` that imports the versioned CSS, or document clearly that versioned CSS is for standalone export only. Do not create a second Google Fonts/Lenis instance without checking duplication.

#### 12. Stale wrapper comment and metadata

`app/home-v4-3/page.tsx` still says V4.3 applies Executive restraint only to Founder Legacy and Company History. The route also inherits root metadata that calls the site an “Official corporate web portal”, even though this is a mock preview.

**Suggested fix:** update the comment and add route-specific metadata such as “Home V4.3 — mock design preview”.

#### 13. Placeholder actions should stay honest

Current placeholders are acceptable for a mock:

- spec download returns a PNG bag image
- ESG report shows an alert
- quote form submits locally
- project cards open a generic quote modal

**Suggested fix:** keep them, but add “Mock interaction” labels or a single design-note banner before stakeholder review.

---

## 4. Explicit pass / no-change list for this audit

- Production `/`: unchanged.
- `/home-v4` and `/home-v4-2`: unchanged.
- `app/page.tsx`, root `app/layout.tsx`, root `app/globals.css`: unchanged.
- Root `next.config.mjs`, `tailwind.config.js`, and `package.json`: unchanged.
- V4.3 source components and refined-section behavior: unchanged.
- V4.3 `public` symlink and root assets: unchanged.
- No commit or push was made.
- The only new file is this audit document.

---

## 5. Recommended next work

**Recommended single pass:** P1 items 1–4.

That means:

1. wire quote context into `QuoteModal`,
2. make stakeholder/nav placeholder links functional or clearly sample-only,
3. extend `SCREENSHOT_SAFE_MODE` to Hero, Stats, Plant, Stakeholder, and Footer,
4. complete modal accessibility.

This would fix real user-facing behavior and full-page capture without redesigning the page. A separate P2 pass can then bring Hero/Stats/Plant/Stakeholder/Footer into the same Executive restraint language if the user wants whole-page consistency.
