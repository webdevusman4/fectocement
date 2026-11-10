# Home V4.3 — Executive restraint + full remediation

This is the third isolated homepage iteration. It starts from `/home-v4-2`, applies the approved **Option A / Executive restraint** motion system, and includes a whole-home remediation pass based on `docs/home-v4-3-homepage-audit.md`.

- **New live preview route:** `/home-v4-3`; `/` and `/home-v4-2` remain unchanged
- **Wrapper:** `app/home-v4-3/page.tsx` — includes route-specific mock-preview metadata
- **Edit from here:** `versions/home-v4-3/source/`
- **Motion audit:** `docs/home-v4-3-motion.md`
- **Final-three section audit:** `docs/home-v4-3-final-three-sections.md`
- **Whole-home audit:** `docs/home-v4-3-homepage-audit.md`
- **Applied fixes:** `docs/home-v4-3-remediation.md`
- **Production `/`:** untouched

## What changed from V4.2

### 1. Founder Legacy and Company History

- Removed parallax, portrait scrub zoom, reactive glows, keyword slides, scroll-scrubbed year rises, image parallax, animated grayscale, and node pulses.
- Added one-time `0.25/0.5/0.8s` reveals, pure crossfades, clip-path year reveals, and static sample-data labels.
- Company History’s gold rail `scaleY` remains the only retained scroll-linked transform.

### 2. Product Portfolio, Sustainability & ESG, Iconic Projects

- Removed pointer tilt, float, parallax, pulsing connectors, animated counters, floating metric cards, navy hover sweeps, hidden hover metrics, and large image zooms.
- Added static composed stages, one-time staggered reveals, always-visible sample metrics, restrained `1.02` hover scale, and clear mock-design notes.
- Product background now uses an existing asset; no missing `/images/product-bg.jpg` reference remains.

### 3. Whole-home remediation

- **Quote flow:** `selectedProduct` is now passed into `QuoteModal`. Product, project, sales, and generic CTAs show their context and preselect OPC/SRC where applicable.
- **Modal accessibility:** added `aria-labelledby`, `aria-describedby`, Escape close, focus trap, initial focus, focus restoration, and body scroll lock. The form and success state are explicitly marked as mock interactions.
- **Links:** all homepage hash links now resolve, and stakeholder/dropdown/mobile placeholders point to real routes. `#home`, `#contact`, `#footer`, `#products`, `#sustainability`, `#plant-anatomy`, and `#heritage` all have matching IDs.
- **Capture mode:** `SCREENSHOT_SAFE_MODE` now applies to all ten sections. It stops Hero autoplay, shows final Stats values, switches Plant Anatomy to `free` mode, and keeps the Footer in normal flow.
- **Hero/Stats:** dwell increased from 2s to 6s; mixed durations and `easeOut` replaced with shared `EASE`/`DUR`; Ken Burns scale, button press scaling, and unverified claims removed. Added a persistent screen-reader-accessible mock badge and a “Sample figures · not certified” line.
- **Founder portrait:** on the “Our story” slide, the formerly lower-right, clipped portrait is now a fully visible, vertically centered responsive 3:4 archival card with a static name plate. The entrance is opacity-only; the source image is unchanged.
- **Plant/Stakeholder/Footer:** removed `animate-ping`, pulse rings, navy sweeps, `-8px` lifts, `surface-elevated`, and `animate-ping`. Footer curtain, spacer, and scrubbed CTA are disabled; the footer is static and in normal document flow.
- **Motion preferences:** `useMotionPrefs` now uses `useSyncExternalStore` for the mobile media query.
- **Images/config:** removed `unoptimized` from large V4.3 images, replaced the raw Stakeholder `<img>` with `next/image`, and added `images.qualities` plus `allowedDevOrigins: ['localhost', '127.0.0.1', '*.e2b.app']` to root and versioned Next configs.
- **Metadata/docs:** updated the V4.3 wrapper comment, added mock-preview metadata, synchronized the versioned Next config, and added the remediation audit.

## Motion profile

- Shared `EASE = [0.22, 1, 0.36, 1]`.
- `DUR.fast = 0.25s`, `DUR.base = 0.5s`, `DUR.slow = 0.8s`.
- `0.08s` stagger.
- `opacity`, `transform`, and `clip-path` only.
- All entrance animations fire once.
- Mobile and reduced-motion output is static.
- Capture mode disables autoplay, pinning, scroll scrubbing, and the footer curtain.
- Normal desktop still retains the Hero carousel and Plant tour; capture mode makes both deterministic.

## Capture mode

`versions/home-v4-3/source/components/SampleHomeV3Content.tsx` defines:

```ts
const SCREENSHOT_SAFE_MODE = false;
```

Set it to `true` for full-page screenshot capture or static review. It makes all ten V4.3 sections deterministic while preserving layout and content.

## Assets and standalone export

`versions/home-v4-3/public` is a relative symlink to the complete root `public/` directory. This avoids adding another 68 MB copy. The byte-for-byte complete asset copy remains in `versions/home-v4/public/`.

For a standalone export, dereference the symlink with:

```bash
cp -Lr versions/home-v4-3/public <standalone-app>/public
```

**Live-route note:** `/home-v4-3` uses the root `app/layout.tsx` and root `app/globals.css`. The copied `source/layout.tsx` and `source/globals.css` are byte-identical and intended for a standalone export; editing them will not change the live preview unless a nested V4.3 layout is added.
