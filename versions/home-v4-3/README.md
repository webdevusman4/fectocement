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

## Hero: Plant Anatomy (replaces the HeroSection carousel)

The V4.3 page now opens on the Plant Anatomy drone tour. The former `HeroSection` carousel is no longer part of the composition. Section order: Plant Anatomy (hero) → Stats → Founder Legacy → Company History → Stakeholder paths → Products → Sustainability → Iconic Projects → Footer.

- **`PlantAnatomy variant="hero"`:** no iris entrance. It clears the floating navbar, has no negative-margin sheet overlap, and adds a top scrim so the navbar stays legible. The default `variant="section"` keeps the original pinned iris behaviour.
- **Intro, then anatomy (scroll crossfade):** the page opens on the plant aerial (overview, 3D hover running) with the intro copy: "Fecto Cement · Since 1981", the page `<h1>` "Building Pakistan's Future.", one line of copy, **Request a bulk quote**, **Explore the plant ↓** and a "Scroll to explore" cue. The stage list, card and markers are hidden. Scrolling crossfades in two steps, using opacity and transform only:
  - First 50% of the intro runway: the copy fades out and lifts 36 px, and its dark scrim lifts.
  - 45–95% of the runway: the stage list, card and markers fade in and rise 20 px.
  - Then the stage tour continues. The "Scroll or pick a stage" hint shows once the anatomy is visible. `PLANT_HERO_INTRO` / the `heroIntro` prop holds the copy.
- **Scroll-driven stages (desktop):** the intro uses the first 80svh of the pinned runway (`HERO_INTRO_SVH`). After that, scrolling moves the camera through all eight stages as before. Clicking a stage or **Explore the plant** scrolls to it.
- **Phones:** a short 70svh pin (`HERO_INTRO_SVH_MOBILE`) covers only the crossfade. Then stages are tap-to-select with **Fly through**, and the mock disclosure sits under the intro buttons.
- **Reduced motion and capture mode:** there is no scroll scrubbing. **Explore the plant** switches instantly to the anatomy and moves focus to the stage list.
- **3D depth layer (`PlantDepth.tsx`):** the aerial is drawn with WebGL2. Each pixel moves by its depth from `depth.png`, so the hillside, plant and mountains separate. You see this in the slow drone hover, the breathing zoom, pointer or tilt drift, and the parallax while flying between stages. It reads the existing camera (`x`, `y`, `cameraScale`), so stages, springs, scroll pinning, cards and pills work as before.
  - **Images:** `public/images/plant/plant-6000.webp` (desktop), `plant-4096.jpg` (phones and fallback) and `depth.png` (white = near). Each stage has a measured `depth` in `PLANT_NODES`.
  - **Fallback:** the flat `next/image` shows first and is removed once WebGL is ready. It stays if WebGL2 is unavailable. Pass `depth3d={false}` to turn the layer off.
  - **Markers:** markers stay on their buildings through `useDepthShift`. Centring now comes from the motion transform, because the old Tailwind translate classes were being overwritten by it.
  - **Reduced motion and capture mode:** these settle to a still picture.
  - **Tuning:** adjust the values in `DEPTH_3D` at the top of `PlantDepth.tsx`.
- **Edge stages centred:** Crusher, Packing and Waste heat and solar sit close to the photo's edges. The edge limit used to stop them up to about 350 px short of the focal point, often behind the stage list or the card. The camera now zooms in just enough for each stage to reach the focal point (a 3.2–3.4× zoom on a 1366 px screen). The extra zoom is capped so the 6000 px photo is never stretched past 1.25×. On screens about 1920 px wide that cap leaves Crusher and Packing short of centre, but in the clear space. Phones were not affected.
- **Mobile:** the "Illustrative image, sample figures" chip now sits above the spec card instead of overlapping the stage pills.
- **Stats:** normal flow below the hero; the hero-driven highlight is gone.
- **Stakeholder paths:** `overlapPrevious={false}` removes the negative margin it used to pull up over the plant's dark bottom band. It now continues the light Company History sheet.
- **`HeroSection.tsx` kept:** it is still imported by the unrouted `SampleHomeContent` and `LegacyHomeV1Content` compositions.

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
- The Plant Anatomy hero has no autoplay. On desktop, scrolling drives the stages. On mobile, the "Fly through" tour starts only when the visitor presses it. Capture mode keeps the hero static and unpinned.

## Capture mode

`versions/home-v4-3/source/components/SampleHomeV3Content.tsx` defines:

```ts
const SCREENSHOT_SAFE_MODE = false;
```

Set it to `true` for full-page screenshot capture or static review. It makes all nine V4.3 sections deterministic while preserving layout and content.

## Assets and standalone export

`versions/home-v4-3/public` is a relative symlink to the complete root `public/` directory. This avoids adding another 68 MB copy. The byte-for-byte complete asset copy remains in `versions/home-v4/public/`.

For a standalone export, dereference the symlink with:

```bash
cp -Lr versions/home-v4-3/public <standalone-app>/public
```

**Live-route note:** `/home-v4-3` uses the root `app/layout.tsx` and root `app/globals.css`. The copied `source/layout.tsx` and `source/globals.css` are byte-identical and intended for a standalone export; editing them will not change the live preview unless a nested V4.3 layout is added.
