# Homepage full-page screenshot audit

Reference: user-supplied `fullpage_snapshot_fectocement_netlify_app_2026-11-10-12-16-15.webp`, `1366 × 13117`.

## Executive answer

- **Normal scrolling/live page:** no section needs a global CSS or layout fix. `app/globals.css` is not creating the blank space.
- **Full-page screenshot:** the blank space is real reserved height in two scroll-driven components. A stitched screenshot cannot show `position: sticky`/`position: fixed` content throughout its scroll runway, so it records the runway as white space.
- **Pass without modifications:** Navbar/menus, Founder Legacy, Stakeholder Routing Grid, Product Portfolio, Sustainability, and Iconic Projects are clean in the supplied capture. Hero/Stats and Company History are structurally clean but animation-dependent in a deterministic screenshot. Plant Anatomy and the Footer Curtain need screenshot-safe variants.

## Exact whitespace

| Screenshot range | Size | Cause |
| --- | ---: | --- |
| `y=6880–8882` | **2003px** uniform pale area | `PlantAnatomy` creates an outer pinned runway with `height: calc(100svh + (40 + nodes.length * 35)svh)`. There are 8 nodes, so the outer wrapper is `420svh`, while the visible section is a sticky `100svh`. The extra `320svh` is a scroll runway. See `src/components/PlantAnatomy.tsx` around lines 628–640. |
| `y=12850–13109` | **260px** pale area at the end | `CorporateFooter` adds a spacer whose height equals the measured footer, while the actual footer is `md:fixed md:inset-x-0 md:bottom-0`. A stitched capture sees the spacer but not the fixed footer across the whole reveal. See `src/components/CorporateFooter.tsx` around lines 261–283. |
| `y=8967–9043` | 77px pale gradient | Intentional `StakeholderRoutingGrid` fade-through: `md:-mt-[24svh] md:pt-[34svh]` plus its transparent-to-mist gradient. This is not a layout gap. |

`app/globals.css` contains only Tailwind layers, `scroll-behavior: smooth`, `overflow-x: clip`, and glass utility classes. It has no large vertical padding, spacer, or `100vh` rule. `SmoothScroll`/Lenis changes scrolling feel but does not add document height.

## Section-by-section result

| # | Section | Live page | Full-page screenshot | Verdict |
| --: | --- | --- | --- | --- |
| 1 | Navbar, dropdowns, mobile menu, quote modal | Pass | Pass | **No modification.** The “Powered by Netlify” badge is injected by the host, not by repo code. |
| 2 | Hero + Stats Bento | Pass | Pass with caveat | **No layout modification.** The hero is auto-rotating every 2s, so the capture shows slide 3 (“Power from the plant itself”) rather than a guaranteed first slide. Freeze `autoplay` only if deterministic captures are required. |
| 3 | Founder Legacy | Pass | Pass | **No modification.** Deliberate opacity changes are scroll-state styling, not broken content. |
| 4 | Company History | Pass | Pass with caveat | **No spacing modification.** The 1947 paragraph shows a mid-animation/ghost overlap in the stitched capture because rows use `initial={{ y: 36 }}` and the year uses a scroll-linked `105% → 0%` mask rise. Use the existing `simple`/reduced-motion branch or a capture-time static mode for pixel-perfect screenshots. |
| 5 | Plant Anatomy | Pass while scrolling | **Fails in stitched capture** | Needs a screenshot-safe mode: pass `scrollMode="free"` or remove the pinned inline height, while keeping the original pinned mode for the live site. |
| 6 | Stakeholder Routing Grid | Pass | Pass | **No modification.** Its negative top margin and top padding are the intended overlap transition. |
| 7 | Product Portfolio | Pass | Pass | **No modification for layout.** It references `/images/product-bg.jpg`, which does not exist in `public/`; the component's background-error fallback handles it. Add the asset or change the default before launch. |
| 8 | Sustainability & ESG | Pass | Pass | **No modification.** |
| 9 | Iconic Projects | Pass | Pass | **No modification.** |
| 10 | CTA band + Corporate Footer | CTA passes | Footer curtain fails in stitched capture | CTA needs **no modification**. For full-page capture, force the footer into normal flow (the `simple` branch) or expose a static-capture prop. |

### Strict “unchanged and clean in this screenshot” list

1. Navbar / menus / quote modal  
2. Founder Legacy  
3. Stakeholder Routing Grid  
4. Product Portfolio  
5. Sustainability & ESG  
6. Iconic Projects  
7. CTA band  

Hero/Stats and Company History pass layout QA but need motion freezing for a repeatable screenshot. Plant Anatomy and the Footer Curtain are the only sections that require structural screenshot-safe changes.

## Other inconsistencies observed

- **Hero:** capture is a random carousel frame because of 2s autoplay.
- **Company History:** scroll-scrubbed year reveal and `whileInView` row transforms can be stitched at different motion states, producing duplicate/ghost text around the 1947 block.
- **Product Portfolio:** missing optional `/images/product-bg.jpg`; no visible break due to fallback.
- **Full-page tool:** fixed/sticky elements are inherently difficult for scroll-stitched screenshots. The cleanest capture path is a static mode that disables autoplay, pinned scrolling, the footer curtain, and scroll-scrubbed entrances.

## Baseline extraction

`versions/home-v4/` is an exact, isolated code copy of the current home, including the complete `public/` tree and `globals.css`. The live route is `/home-v4`; production `/` is untouched. See `versions/home-v4/README.md` and `versions/home-v4/manifest.json`.
