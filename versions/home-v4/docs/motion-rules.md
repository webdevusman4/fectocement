# MOTION RULES

- Stack: Next.js App Router, Tailwind, Framer Motion, next/image, lucide-react. No new dependencies unless a task says so.
- Edit existing files. Never rewrite from scratch. Keep exports, props, copy, data and design tokens (Navy #000080, Sand #F4D5AB, Deep #0A0F1F, Mist #EEF3F9; font-display, font-sans, font-mono). Do not undo earlier fixes.
- Before editing a section, read its file and app/page.tsx, and give a 5-bullet summary of how it works today.
- Animate only transform, opacity and clip-path. No animated blur, filter or backdrop-blur on large areas (backdrop-blur only on small cards).
- One easing curve (EASE from lib/motion.ts). Durations: fast 0.25 s, base 0.5 s, slow 0.8 s. Stagger 0.08 to 0.1 s.
- Scroll-linked values use Framer Motion MotionValues (useScroll, useTransform). No per-frame React state; call setState only when a discrete value changes.
- Pinned or sticky sections: no ancestor may have overflow-hidden, overflow-auto or overflow-scroll (use overflow-x-clip). Sticky stacking is only for sections up to 100svh tall; taller sections use negative-margin overlap plus progress-driven dimming.
- Mobile (below 768px) and prefers-reduced-motion: use the section's SIMPLE version (no pin, no scrubbing, simple fades or static). Use useMotionPrefs().
- Accessibility: keep focus rings, ARIA and semantic order. Motion must never hide content from keyboard or screen-reader users.
- Finish every task with npx tsc --noEmit and npm run build, fix all errors, and return only the changed files plus a short change log.

