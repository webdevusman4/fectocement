# Fecto Smart Assistant — handoff

Status on 2026-11-13. Branch `main` is level with `origin/main` (e6623e1). The assistant files below are **untracked, not committed**.

## Done (review only)

| File | What it does |
|---|---|
| `app/api/assistant/route.ts` | `POST /api/assistant`. Body `{ messages: {role:'user'\|'assistant', text}[] }` (last = question). Streams plain text back. Header `X-Assistant-Remaining` = questions left today for this visitor. Errors are JSON `{ error, message }` with a user-facing message (503 not configured, 429 limits, 502 provider). Key never leaves the server. Falls back to the second model on 404 / 429 / 5xx. |
| `src/lib/assistant/gemini.ts` | Gemini REST via `fetch` (no SDK): `v1beta/models/{model}:streamGenerateContent?alt=sse`, header `x-goog-api-key`. `sseToText()` turns SSE into a text stream (skips thought parts). Models from env, defaults `gemini-3.8-flash`, then `gemini-3.5-flash-lite` (`gemini-2.5-flash` is retired from 1 Dec 2026). |
| `src/lib/assistant/quota.ts` | In-memory caps: 450/day total, 25/visitor/day, 6/visitor/min. Resets at midnight Pacific (same as Gemini). Soft guard on serverless. |
| `src/lib/assistant/prompt.ts` | System prompt: Pakistani site units, reply in the user's language, no invented Fecto prices or stock (point to `/request-quote`), structural work → engineer. |
| `src/lib/assistant/calculators.ts` | `estimateMaterials()` (concrete / brickwork / plaster; dry factors 1.54 / 1.33; 50 kg bag = 0.0347 m³) and `planCuring()` (IS 456 curing days and formwork times). No AI, no quota. |
| `src/components/assistant/Markdown.tsx` | Safe Markdown renderer for answers (no innerHTML). |
| `src/components/assistant/BagCalculator.tsx` | Calculator UI; prop `onAsk(prompt)`. Also exports `Field` and `fieldClass`. |
| `src/components/assistant/CuringPlanner.tsx` | Curing schedule UI; prop `onAsk(prompt)`. |
| `.env.example` | `GEMINI_API_KEY`, optional `GEMINI_MODEL`, `GEMINI_FALLBACK_MODEL`, cap overrides. |

## To do

### 1. `src/components/assistant/AssistantApp.tsx` (client component, main piece)

- **Layout:** full screen `h-[100dvh]` with a left sidebar and the main area. Brand colours: navy `#000080`, deep navy `#0B1245`, sand `#F4D5AB`, background `#F6F7FB`.
  - Sidebar (264px, collapsible to icons on desktop; drawer on mobile):
    - Navy `FectoLogo` and a **New chat** button.
    - Nav items: My chat, then a "Homebuilder tools" label with Bag calculator, Curing planner and Request a quote (`/request-quote`).
    - Bottom: a navy promo card linking to `/request-quote`, and a "Back to website" link to `/`.
  - Header: title "Fecto Smart Assistant", a "N questions left today" chip, and a Reset button.
- **Views:** `'chat' | 'bags' | 'curing'`. The tool views render `<BagCalculator onAsk={send}/>` and `<CuringPlanner onAsk={send}/>`.
- **Empty chat:**
  - Crest badge: `<FectoLogo viewBox="5 5 185 230" color="#fff" />` crops the logo to the crest only (the wordmark starts at x=190).
  - Title, subtitle, and 5 image cards (`next/image` with `fill`, `sizes="200px"`, navy gradient overlay plus icon and label).
  - Cards:
    - Material estimate (`/images/contractors-infra.jpg`) sends a prompt.
    - Bag calculator (`dealers-warehouse.jpg`) opens that view.
    - Curing planner (`project-towers.jpg`) opens that view.
    - Seepage & leakage (`hero-skyline.jpg`) sends a prompt.
    - OPC or SRC? (`company-plant.jpg`) sends a prompt.
- **Chat:**
  - User messages are right-aligned navy bubbles. Assistant messages are left-aligned white cards with the crest avatar, rendered with `<Markdown>`.
  - While streaming, show a caret, a Stop button (AbortController) and copy. Show retry on error messages.
- **send(text):**
  - Trim to 2000 characters.
  - POST the history without error messages.
  - Read the `X-Assistant-Remaining` header.
  - If the response isn't ok, show `json.message` as an error bubble.
  - Otherwise read `res.body.getReader()` and append the text as it arrives.
- **Composer:** auto-growing textarea. Enter sends, Shift+Enter adds a new line. Optional mic via `window.SpeechRecognition || webkitSpeechRecognition`. Send button is a navy circle. Footnote: "Estimates are approximate. Please consult a qualified engineer…".
- **Persistence:** keep messages in `localStorage['fecto-assistant-chat-v1']`, wrapped in try/catch.
- **Important:** put `data-lenis-prevent` on every inner scroll container. The root layout mounts Lenis smooth scroll, which otherwise blocks inner scrolling.

### 2. `app/assistant/page.tsx`

A server component with `export const metadata` (title "Fecto Smart Assistant") that renders `<AssistantApp />`.

### 3. Navbar entry

In `versions/home-v4-3/source/components/FectoNavbar.tsx`, before the "Request a quote" link (around line 370), add a round icon link to `/assistant` (lucide `Sparkles`, `aria-label="AI assistant"`). This navbar is the homepage's, because `/` renders `versions/home-v4-3/source/page.tsx`.

### 4. Check, then commit when asked

- Run `npx tsc --noEmit`.
- Run `next build` **in a copy of the repo**, or stop `npm run dev` first. Both use `.next`.
- Without a key, `/assistant` should show the "not switched on yet" message. With `GEMINI_API_KEY` in `.env.local`, ask a question and watch it stream.

## Gotchas

- `@/*` resolves `./src/*` first. The root `components/`, `hooks/` and `lib/` folders are old unused copies, so don't edit them.
- `lucide-react` is v1.x. Check icon names with `tsc`.
- `.env*.local` is git-ignored. Never commit the key. On Netlify, add the env vars in Site configuration → Environment variables.
