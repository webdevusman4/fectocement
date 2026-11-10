# Home V4.3 — final three sections before CTA & Footer

**Scope:** Product Portfolio, Sustainability & ESG, and Iconic Projects. These are the three sections immediately before `CorporateFooter`, which contains both the global CTA band and the mega footer. Work was performed on `/home-v4-3` only.

The approved **Option A / Executive restraint** system from Founder Legacy and Company History is extended to these sections. The result is quieter, clearer, and more appropriate for a large industrial cement company, while preserving the mock-design freedom to use realistic placeholder data.

**Status note:** a later whole-home remediation also made Hero, Stats, Plant, Stakeholder, CTA, and Footer capture-safe/static. See `docs/home-v4-3-remediation.md`; the pass lists below describe the state at the time of this final-three edit.

## Section-by-section audit before editing

| Section | Current-state finding | Decision |
| --- | --- | --- |
| Product Portfolio | Pointer tilt, floating bag, scrubbed bag/card entrance, pulsing connector dots, spring tab highlight, counting spec values, `0.35s easeInOut` grade swaps, background parallax, and a default `/images/product-bg.jpg` that does not exist. Certification and ASTM/British Standards phrasing read as verified claims. | Replace with a static composed product stage, one-time reveals, opacity-only grade crossfade at `0.25s`, static values, static leader lines, and explicit sample labels. Use the existing `sangjani-aerial.jpg` as the default backdrop. |
| Sustainability & ESG | Animated `-30%` counter, pinging “LIVE METRIC”, floating card, blurred aura, 700 ms image zoom, `1.2s` counter, and broad “pioneering” / “global EPA standards” language. | Replace with a static illustrative 2030 target, measured programme copy, static image frame, one-time staggered reveals, and a clear mock-data footnote. |
| Iconic Projects | Three different scroll-linked parallax drifts, full navy hover sweep, metrics hidden until hover, caption shifts, and unverified tonnage/project claims. | Replace with static cards, always-visible sample metrics, restrained `1.02` image hover, one-time `0.08s` card stagger, and clear sample labels. Change the self-scrolling “View all projects” action to a real quote enquiry. |
| Shared | `SCREENSHOT_SAFE_MODE` was wired only to Founder/History. | Pass it to all five refined V4.3 sections through `staticReveal`. Mobile and reduced-motion output remains static. |
| Shared | Mixed `200ms`, `300ms`, `700ms`, `1.2s`, and infinite durations. | Standardize on `0.25s / 0.5s / 0.8s`, shared `EASE`, and `0.08s` stagger. No loops or scroll scrubbing in these three sections. |

## Applied changes

### Product Portfolio — `source/components/ProductPortfolio.tsx`

| Before | After |
| --- | --- |
| Pointer tilt and 4-second float | Static composed bag. |
| Scroll-scrubbed `y: 140 → 0`, `scale: 0.9 → 1`, opacity, and ±90px card entrances | Stable desktop geometry with one-time `0.5s` reveals at `0.08s` stagger. |
| Pulsing connector-ring circles and redrawing path lengths | Static dashed leader lines and static connection dots. |
| Spring `layoutId` tab highlight | `0.25s` CSS color/background transition on active tab. |
| `0.35s easeInOut` bag/spec slides and `0.6s` number counters | `0.25s` opacity-only grade crossfade and static formatted spec values. |
| Background parallax and missing default asset | Static layered backdrop using existing `/images/sangjani-aerial.jpg`; error fallback retained. |
| “Engineered Specification” and “exceed international ASTM and British Standards” | “Sample technical profile” and a plain-language explanation that values are layout placeholders. |
| Certification row with check icons | “Illustrative compliance references” plus “Sample figure · not certified” on every spec card and a mock-design footnote. |
| “Download Technical Data Sheet (PDF)” while actually downloading a PNG | “Download sample spec sheet (PNG)”. |

Retained: OPC/SRC tabs, keyboard tab navigation, three desktop spec positions, mobile stack, bag fallback, quote/spec callbacks, sheet radius, `-mt-[90px]`, z-order, and all existing assets.

### Sustainability & ESG — `source/components/SustainabilitySection.tsx`

| Before | After |
| --- | --- |
| `0 → -30%` counting animation over `1.2s` | Static `-30%` illustrative 2030 target. |
| Pinging “LIVE METRIC” dot | Static emerald indicator with “Illustrative 2030 target”. |
| Infinite floating card | Static metric card with “Sample figure · not certified”. |
| Blurred gradient aura and 700 ms `scale-105` image hover | Restrained white frame, static image, and subtle vignette only. |
| `y: 24` stagger items over `0.8s` with delays up to `0.48s` | One-time `0.5s` reveals with `0.08s` stagger and shared `EASE`. |
| “Building a greener tomorrow, today.” and “pioneering” / “global EPA standards” claims | “Lower-impact operations, measured over time.” with three measured sample programmes: kiln fuel transition, particulate control, and community governance. |
| “Read our 2026 ESG Report” as a real report | “View sample 2026 ESG report”; wrapper now shows a mock-design note. |

Retained: two-column layout, all three pillar icons, existing sustainability image, `-mt-10` rounded sheet, z-order, report callback, and keyboard/focus treatment.

### Iconic Projects — `source/components/IconicProjects.tsx`

| Before | After |
| --- | --- |
| Three scroll-linked parallax drifts of 60/130/30px | Static bento cards. |
| Full navy hover sweep | No full-card sweep; only border/shadow and a restrained `1.02` image scale on hover/focus. |
| Metrics hidden until hover/focus | Sample volume/application metrics always visible. |
| Caption `-6px` hover shift and arrow scale | Static caption and arrow badge; `0.25s` color transition only. |
| “Shaping the nation’s skyline.” and definitive project/tonnage claims | “Specified for infrastructure that endures.” with sample-labelled projects, locations, volumes, and applications. |
| “View all projects” scrolled back to the same `#projects` section | “Discuss a project” opens the existing quote flow through `onRequestQuote('Project enquiry')`. |

Retained: three-card bento geometry, existing imagery, `-mt-10` sheet, gradient background, z-order, keyboard activation, focus rings, project selection callback, and bottom padding that leaves room for the CTA/Footer transition.

### Shared wiring — `SampleHomeV3Content.tsx` and `SectionReveal.tsx`

- Added a local `SectionReveal` helper: one-time `opacity + 10px` reveal, `DUR.base`, shared `EASE`, optional `0.08s` stagger, and a plain static `<div>` when `simple` is true.
- `staticReveal` is now passed to Founder Legacy, Company History, Product Portfolio, Sustainability, and Iconic Projects.
- `SCREENSHOT_SAFE_MODE = false` remains the default. Set it to `true` for deterministic full-page capture or static review.
- Mobile and OS reduced-motion preferences continue to resolve to static output through `useMotionPrefs`.

## Motion profile

- Only `opacity` and small `transform` values are animated in these three sections.
- Shared `EASE = [0.22, 1, 0.36, 1]`.
- Durations: `0.25s`, `0.5s`, `0.8s`; `0.08s` stagger.
- All reveals fire once.
- No parallax, pointer tilt, floating loops, pulsing dots, counting numbers, spring tab movement, animated blur, animated grayscale, or large zoom.
- The only remaining scroll-linked transform anywhere in V4.3 refined sections is the Company History gold rail `scaleY`.

## Spacing, layering, and capture checks

| Check | Result |
| --- | --- |
| Product dome overlap | `[border-radius:50%_50%_0_0/90px_90px_0_0]`, `-mt-[90px]`, top padding, and `Z.product` preserved. |
| Sustainability sheet | `-mt-10`, `rounded-t-[40px]`, `Z.sustain`, and `py-24/28/32` preserved. |
| Projects sheet | `-mt-10`, `rounded-t-[40px]`, `Z.skyline`, gradient, and `pb-32/40/48` preserved. |
| CTA/Footer transition | `CorporateFooter.tsx` and its fixed-curtain spacer are untouched. |
| Section order | Hero → Stats → Founder → History → Plant → Stakeholder → Product → Sustainability → Projects → CTA/Footer unchanged. |
| Pinned behavior | No new pinning or sticky behavior added. |
| Screenshot-safe output | `SCREENSHOT_SAFE_MODE = true` yields static plain divs for all five refined sections. |
| Assets | No new binary assets. V4.3 `public` remains a symlink to complete root `public/`; missing `product-bg.jpg` is no longer the V4.3 default. |
| Global CSS / hooks / tokens | No changes. The only new shared code is local `SectionReveal.tsx`. |

## Explicit unchanged-pass list

- Production `/`: **pass, untouched**.
- `/home-v4` and `/home-v4-2`: **pass, untouched**.
- Navbar, dropdowns, mobile menu, and quote modal: **pass, untouched**.
- Hero and Stats Bento: **pass, untouched**.
- Founder Legacy and Company History: **unchanged in this extension**; their earlier V4.3 Option A work remains intact.
- Plant Anatomy: **pass, untouched**.
- Stakeholder Routing Grid: **pass, untouched**.
- CTA band and Corporate Footer: **pass, untouched in this extension; later made static in the remediation pass**.
- Global CSS, hooks, design tokens, and root public assets: **pass, untouched**.

## Validation

- `./node_modules/.bin/tsc --noEmit`: **passed**.
- Font-mocked `npm run build`: **passed**, 44/44 static pages. `/home-v4-3` reports `95.3 kB` route JS and `273 kB` first load JS.
- `git diff --check`: **clean**.
- Dev-server HTTP checks after restart: `/`, `/home-v4`, `/home-v4-2`, `/home-v4-3` all **200**.
- `/home-v4-3` SSR HTML contains all three new headlines, sample labels, and no `/images/product-bg.jpg` reference.
- Source comparison against V4.2: only the seven intended V4.3 files differ: `FounderLegacy.tsx`, `CompanyHistory.tsx`, `SampleHomeV3Content.tsx`, `ProductPortfolio.tsx`, `SustainabilitySection.tsx`, `IconicProjects.tsx`, plus new `SectionReveal.tsx`.

No browser executable or live screenshot regression was available in the sandbox at the time of this extension; visual conclusions were based on compiled SSR output, preserved geometry, and the static capture mode. A temporary headless Chromium was later used outside the repository for the Hero founder-portrait follow-up, documented in `docs/home-v4-3-remediation.md`.
