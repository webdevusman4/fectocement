# Home V4.3 — whole-home remediation

**Date:** 2026-11-10<br>
**Branch:** `arena/5cc6d193-fectocement`<br>
**Route:** `/home-v4-3`<br>
**Trigger:** `docs/home-v4-3-homepage-audit.md` — “fix everything that needed.”

All P1, P2, and P3 findings from the audit were addressed. Production `/`, `/home-v4`, `/home-v4-2`, root global CSS, root public assets, and the original production component tree were not changed. The only repository-wide config change is a safe `next.config.mjs` update for image qualities and preview origins.

---

## P1 — Functional correctness

| Audit finding | Applied fix |
| --- | --- |
| Quote context was collected but discarded. | `source/page.tsx` now reads `selectedProduct` and passes it to `QuoteModal`. Product, project, sales, and generic CTAs show an “Enquiry context” line. OPC/SRC strings preselect the cement grade. Generic CTAs clear the previous context. |
| Dead homepage hash links. | Added `id="home"` to the V4.3 main, changed the CTA band to `id="contact"`, and remapped dropdown/mobile/stakeholder placeholders to real routes: `/request-quote`, `/investors`, `/careers/overview`, `/infrastructure/production-capabilities`, `/company/corporate-governance`, and `#products`. All functional hash strings now resolve. |
| Full-page capture was only partly deterministic. | `SCREENSHOT_SAFE_MODE` now passes `staticReveal` to all ten sections. Hero autoplay is disabled, Stats show final values, Plant Anatomy receives `scrollMode="free"`, and Footer curtain/spacer/scrubbed CTA are disabled in capture mode. |
| Quote modal accessibility was incomplete. | Added `aria-labelledby`, `aria-describedby`, Escape close, focus trap, initial focus, focus restoration, body scroll lock, labelled form fields, and a semantic backdrop button. The form and success state are labelled as mock interactions. |

### Capture-mode verification

`SCREENSHOT_SAFE_MODE` was temporarily set to `true` and `/home-v4-3` SSR HTML was checked:

- final Stats values `0.8`, `3,000`, `1981`: present
- persistent “Illustrative homepage mock” badge: present
- “Sample figures · not certified”: present
- CTA/Footer copy: present
- `calc(100svh + ...)` pinned Plant runway: absent
- `md:fixed md:inset-x-0 md:bottom-0` footer curtain: absent

The flag was restored to `false` after verification.

---

## P2 — Consistency and professional polish

| Audit finding | Applied fix |
| --- | --- |
| Hero rotated every 2 seconds with mixed `0.2–3s` timings. | Default dwell is now `6000ms`. Object durations use shared `DUR.fast/base/slow` and `EASE`; `easeOut` and the 3-second Ken Burns scale were removed. Button `active:scale-95` removed. |
| Hero/Stats contained definitive unverified claims. | Softened “PSX-listed”, “nearly half of electricity”, and “rated at 3,000 tons” wording. Added a persistent, screen-reader-accessible “Illustrative homepage mock · figures and imagery are placeholders” badge and a “Sample figures · not certified” Stats line. “Read our story” now points to the mock `#heritage` section. |
| Whole-page motion language was split. | Hero, Stats, Plant, Stakeholder, and Footer now use static capture branches and shared timing. Removed `animate-ping`, expanding pulse rings, 1.1–1.2s counters, navy sweeps, `-8px` lifts, and `surface-elevated` from the V4.3 path. Stakeholder hover is now a restrained `1.02` image scale and border/shadow transition. |
| Footer/CTA were scroll-scrubbed and used a fixed curtain. | Footer now always uses its static/simple treatment: no fixed curtain, no spacer height, no scrubbed CTA transforms, and no wordmark/footer parallax. This removes the prior stitched-screenshot blank run at the page end. |
| `useMotionPrefs` had an SSR/mobile flash risk. | Rewritten with `useSyncExternalStore` and a client media-query snapshot. `SectionReveal`, Stats, Stakeholder, and other motion wrappers carry `data-v43-reveal` for future CSS scoping. |
| User-supplied preview screenshots showed the “Our story” founder portrait pinned to the lower-right corner and clipped by the stat-card overlap. | Replaced the bottom-aligned, masked 78%-height foreground with a bounded, vertically centered archival card. The complete portrait is now shown with `object-contain`; a name plate and bottom clearance keep the whole card visible. The former `x: 48` entrance is now an opacity-only shared-timing fade. |

### Founder portrait placement follow-up

The two supplied desktop screenshots were used as the visual reference. The source image is a complete `1792 × 2400` seated portrait; the old hero geometry bottom-aligned it at 78% height behind the `-mt-16` Stats cards, so the lower body was covered and the composition sat in the corner.

Applied only to `versions/home-v4-3/source/components/HeroSection.tsx`:

- **Old:** `h-[78%]`, `object-bottom`, a left-edge mask, right-edge alignment, and a 48px horizontal entrance.
- **New:** a proportional 3:4 rounded card (`width: min(320px, 40.5svh)`, `height: min(430px, 54svh)`) with a fully visible `object-contain` image, an inset frame, and a quiet name plate. The card is vertically centered in the right column with reserved bottom padding.
- **Motion:** opacity-only entrance at `DUR.base`, exit at `DUR.fast`; reduced-motion and capture mode render immediately visible via `initial={false}`.
- **Clearance:** the mock badge was moved from `top-[104px]` to `top-[100px]`. Headless Chromium confirmed 16–75px name-plate clearance above the Stats cards and 2–40px badge clearance above the portrait card across four viewports.
- **Preserved:** the portrait file, all four hero slides, copy, CTA links, Stats overlap, section order, root CSS, and every earlier homepage version.

---

## P3 — Technical / pre-launch cleanup

| Audit finding | Applied fix |
| --- | --- |
| `next.config.mjs` lacked `images.qualities` and `allowedDevOrigins`. | Added `qualities: [40, 55, 60, 70, 75]` and `allowedDevOrigins: ['localhost', '127.0.0.1', '*.e2b.app']` to root and V4.3 config copies. The local entries were added after headless checks showed that a preview-only explicit list blocked local HMR. Dev-server logs after route checks and browser captures are clean of image-quality, font, and cross-origin warnings. |
| Large unoptimized media. | Removed `unoptimized` from Sustainability and Iconic Projects images, and replaced the raw Stakeholder `<img>` with `next/image` using explicit `sizes`. Hero video remains `preload="none"`. No new binary assets were added. |
| Versioned layout is inert in live route. | Documented in `versions/home-v4-3/README.md`: the live route uses root `app/layout.tsx` and root `app/globals.css`; the copied layout/CSS are for standalone export. |
| Stale wrapper comment and official metadata. | `app/home-v4-3/page.tsx` now exports `metadata` titled “Home V4.3 — mock design preview” and describes the full remediation. |
| Placeholder actions needed honesty. | Quote modal says “Mock interaction · no data is submitted”; success state says no data was sent. Spec download now shows a mock note instead of downloading a bag PNG, and its button says “Request sample spec sheet”. ESG report and project enquiries remain clearly labelled mock interactions. |

---

## Explicit unchanged / pass list

- Production `/`: unchanged.
- `/home-v4` and `/home-v4-2`: unchanged.
- `app/page.tsx`, root `app/layout.tsx`, root `app/globals.css`: unchanged.
- Root `tailwind.config.js`, `package.json`, and `public/` assets: unchanged.
- V4.3 section order, sheet overlaps, z-order tokens, and all 42 public assets: preserved.
- No new dependency, no new binary asset, no commit, and no push.

---

## Validation

- `./node_modules/.bin/tsc --noEmit`: **passed**.
- Font-mocked `npm run build`: **passed**, 44/44 static pages; re-run after the portrait placement change.
- `/home-v4-3` route JS: **95.5 kB**; first load JS: **273 kB**.
- User-supplied screenshots: used to identify the lower-right portrait clipping. The compiled V4.3 chunk contains the new name plate/card treatment and no `h-[78%]`, `object-bottom`, or left-edge mask from the old foreground.
- `git diff --check`: **clean**.
- Unresolved functional hash links: **0**.
- Dev routes after restart: `/` 200, `/home-v4` 200, `/home-v4-2` 200, `/home-v4-3` 200.
- `/home-v4-3` SSR HTML contains the Hero mock badge, Stats sample note, all three refined-section headlines, CTA/Footer copy, and no `/images/product-bg.jpg` reference.
- Dev logs show no image-quality, Google Fonts, or cross-origin warnings after the config update and browser checks.
- Headless-browser visual regression: **passed** at `1280×800`, `1024×640`, `960×720`, and `960×600`; name-plate clearance above Stats is `16–75px`, and badge clearance above the portrait card is `2–40px`.
- Live preview is running on `0.0.0.0:3000`.

A temporary headless Chromium was installed outside the repository for visual verification; no project dependency or new binary asset was added. The two user-supplied screenshots were used as the visual reference, and four after-change captures confirm that the complete portrait is visible inside the card with no stat-card clipping. Other validation is based on typecheck, a font-mocked production build, compiled V4.3 client output, SSR HTML, route checks, bounded layout geometry, and clean runtime logs. The dev server was restarted with the same build-only font mock to avoid the sandbox's Google Fonts network error.
