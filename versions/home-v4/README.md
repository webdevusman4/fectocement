# Home V4 baseline

This is an isolated, editable copy of the current production homepage from source commit `086fd68909eccb44cbc9094ada726eea555b4e01`. The repo already contains V1, V2 and V3 home experiences, so the next work version is called **V4**. The production route `/` was not changed.

- **Live preview route:** `/home-v4`
- **Wrapper:** `app/home-v4/page.tsx`
- **Edit from here:** `versions/home-v4/source/`
- **Current-home entry:** `versions/home-v4/source/page.tsx` → `source/components/SampleHomeV3Content.tsx`
- **Baseline audit:** `docs/home-v4-baseline-audit.md`

## What was extracted

| Path | Contents |
| --- | --- |
| `source/page.tsx` | Exact copy of `app/page.tsx`, with local imports. |
| `source/layout.tsx` | Root layout, local `SmoothScroll` import, and metadata/viewport setup. |
| `source/globals.css` | Complete global CSS. |
| `source/components/` | All components resolved by `@/components/*` for the current build. `tsconfig.json` resolves `./src/*` first, so `src/components/` is the source of truth. Import aliases were rewritten to relative local paths. |
| `source/hooks/`, `source/lib/` | `useMotionPrefs`, `useSectionProgress`, and motion tokens/easing/z-index constants. |
| `source/routes/` | Existing V1/V2/V3 route wrappers for reference. |
| `public/` | **Complete** copy of the root `public/` tree: 42 files, 70,265,267 bytes, including all images and videos. |
| `config/` | `package.json`, lockfile, Next/PostCSS/Tailwind/TypeScript configs, and the original README. |
| `docs/motion-rules.md` | Motion rules used by the scroll-linked sections. |
| `manifest.json` | File list, public asset sizes, and local asset existence checks. |

The live route uses the root `app/globals.css` through the root layout and serves assets from the root `public/` directory. The copied `public/` and `config/` folders make this snapshot portable: to use it as a standalone app, copy `versions/home-v4/public/` to that app's root `public/` and place `source/` at its app root. Tailwind has been configured to scan `versions/**/*`, so classes added to the isolated components are generated in this repository too.

## Editing rules

- Edit `versions/home-v4/source/**`; changes will not affect `/`, `/home1`, `/home2`, `/sample-home`, or `/sample-v3`.
- Keep the local relative imports created by the extractor. The copied components intentionally do not resolve back through `@/components/*`.
- Do **not** rerun `scripts/extract_home_v4.py` after making changes: it regenerates the baseline and deletes the current `versions/home-v4` folder.
- Global CSS changes can be made in `source/globals.css`; for the live route, mirror them into `app/globals.css` or switch the root layout to import the versioned CSS.

## Known capture findings

The supplied full-page screenshot is `1366 × 13117`. Its large white area at `y=6880–8882` is the `PlantAnatomy` pinned scroll runway, and the bottom white area is the `CorporateFooter` fixed-curtain spacer. Both are component-level scroll behaviors, not global CSS and not unexplained screenshot padding. See `docs/home-v4-baseline-audit.md` for the section-by-section pass list and exact code references.
