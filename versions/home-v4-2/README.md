# Home V4.2 — Founder & History iteration

This is the **second isolated version** of the homepage baseline. It copies `/home-v4` and improves only **Founder Legacy** and **Company History**. The production route `/`, the first baseline `/home-v4`, and all other homepage sections remain unchanged.

- **Live preview route:** `/home-v4-2`
- **Wrapper:** `app/home-v4-2/page.tsx`
- **Edit from here:** `versions/home-v4-2/source/`
- **Section audit / change log:** `docs/home-v4-2-improvements.md`

## Changed files

| File | Change |
| --- | --- |
| `source/components/FounderLegacy.tsx` | New sample-dossier copy, archive metadata, improved inactive-statement legibility, labelled illustrative quote/portrait, optional `staticReveal` prop. |
| `source/components/CompanyHistory.tsx` | Seven rewritten realistic mock milestones, compact spacing, timeline summary, sample-figure labels and disclaimer, real 1993 imagery, optional `staticReveal` prop. |
| `source/components/SampleHomeV3Content.tsx` | Passes the new sample copy and enables `staticReveal` for the two edited sections only. This is orchestration, not a redesign of another section. |

No global CSS, design-token, hook, or public-asset changes were required.

## Assets

To avoid adding another 68 MB copy of the same files, `versions/home-v4-2/public` is a relative symlink to the repository's complete root `public/` directory. The first baseline's byte-for-byte copy remains available at `versions/home-v4/public/`. The live route serves assets from root `public/` in the usual Next.js way.

If this version is exported by itself, dereference the symlink (`cp -Lr versions/home-v4-2/public <standalone-app>/public`) or copy `versions/home-v4/public/`.

## Scope note

`staticReveal` freezes the scroll-scrubbed entrance behavior inside Founder Legacy and Company History so their copy is stable in stitched/full-page captures. Plant Anatomy and the fixed Footer Curtain still use the baseline behavior; those sections were intentionally left out of this iteration.
