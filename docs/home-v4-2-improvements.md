# Home V4.2 — Founder & Company History improvements

Scope: **only Founder Legacy and Company History**. All content is realistic dummy copy for a mock design; no dates, capacities, quotations, targets, or images should be treated as verified corporate records.

A 5-bullet “how it works today” audit was completed before editing. Its findings are reflected in the **Before → Improvement** tables below.

## Founder Legacy

| Area | Before | Improvement in V4.2 |
| --- | --- | --- |
| Headline / framing | Abstract “Architectural Legacy Built on Faith & Industry.” | Grounded headline: “From a ledger of trust to an industrial group.” Added a plain-language intro explaining the sample business progression. |
| Sample-data clarity | No explicit mock label; the supplied quote looked like an authentic founder quotation. | Added “Founder's dossier / Illustrative mock” badges, “Editorial theme · not a historical quotation” above the pull quote, and an illustrative portrait caption. |
| Statement copy | Repeated faith/promise language; no dates or operating detail. | Three concrete principles: **Credit**, **Partnership**, **Reinvestment**, each with a dated archive-style `meta` line and realistic ledger, training, tooling, and reinvestment context. |
| Quote | “Faith before fortune…” attributed to the founder. | Distinct editorial theme: “Trust was the first currency; industry became the way to keep it.” Attribution is clearly “Editorial theme · illustrative copy”, avoiding a fabricated historical quotation. |
| Legibility | Inactive statements at 55% opacity and shifted `-8px`, making the middle principle look washed out. | Inactive opacity raised to 72% and offset reduced to `-4px`; active emphasis remains through the sand numeral and keyword. |
| Context / right column | Portrait, caption, and progress row only. | Added a compact “Sample archive file” card with period, route, and theme. It supplies concrete visual context without new imagery. |
| Link | “See the full history” pointed at the real `/company/history` route. | “Explore the sample timeline” now points to `#heritage` inside the mock page. |
| Capture consistency | Parallax, exit scale/opacity/y, portrait zoom, and statement motion could appear in different states in a stitched capture. | New optional `staticReveal` prop forces the reduced/simple branch; V4.2 enables it. Existing exports and props remain intact. |

### Founder section verdict

- Content is now specific, plausible, and consistently labelled as mock data.
- The real person is no longer presented as the source of invented wording.
- Visual hierarchy is clearer and less faded.
- The section is more screenshot-stable.
- No new assets, dependencies, or global CSS were introduced.

## Company History

| Area | Before | Improvement in V4.2 |
| --- | --- | --- |
| Section header | “Forging the foundation of a modern nation.” with broad nation-building language. | “Seven chapters in an industrial portfolio.” plus a clear statement that dates, figures, and images are illustrative. |
| Orientation | Only an eyebrow and heading. | Added a three-card key: **Span**, **Chapters**, **Data status**. Added a “Sample timeline” pill. |
| Milestone copy | Made definitive claims such as “first-ever Pakistan-Japanese joint venture”, named a CEO, and presented capacities as historical fact. | Rewrote all seven milestones as realistic sample chapters: trading credit, technical partnership, multi-site operations, cement incorporation, operating standardisation, on-site power, and a staged lower-carbon roadmap. |
| Figures / visuals | Viz cards looked like certified metrics. | Each viz card now carries “Sample figure / Not certified”. Capacity meter, solar value, and roadmap progress are explicitly labelled as placeholders. |
| 1993 imagery | Main image was replaced by a “Portrait to be supplied” placeholder. | Removed the placeholder flag and used existing `Gemini_Generated_Image_s6vce0s6vce0s6vc.jpg` plus `history-scale-plant.jpg`. |
| Vertical rhythm | `pt-24/32`, `pb-44/52`, `space-y-24/36`, `mb-20`. | Tightened to `pt-20/28`, `pb-28/36`, `space-y-16/24`, `mb-12/16`, reducing long pale stretches without compressing individual cards. |
| Full-page capture | Scroll-scrubbed year rise (`105% → 0%`), `y: 36` row entrance, and image parallax could produce ghost/overlapping text around 1947. | New optional `staticReveal` prop forces the simple branch for rows, year numerals, image parallax, grayscale transition, and the 1981 breakout. Row entrance uses opacity only in this mode; durations now use `DUR.base` / `DUR.slow` and the shared `EASE`. |
| Closing disclosure | No end-of-section disclaimer. | Added a mono footnote: names, dates, capacities, targets, and imagery are realistic placeholders for layout review, not verified records. |
| Design continuity | Central rail, alternating rows, 1981 breakout, and five viz types. | All preserved with the Navy `#000080` and Sand `#F4D5AB` tokens; no new dependencies. |

### History section verdict

- Seven chapters now read like a coherent design mock rather than a mixture of unverified corporate claims.
- The incomplete 1993 card is gone.
- The section is shorter and more consistent in a full-page capture.
- The sample/illustrative status is visible at header, figure, image, and footer levels.
- The rail and alternating editorial structure remain unchanged.

## Section-by-section pass result after V4.2

| Section | Status in this iteration |
| --- | --- |
| Navbar / Hero / Stats / Plant Anatomy / Stakeholder / Product / Sustainability / Projects / Footer | **Untouched baseline**, as requested. |
| Founder Legacy | Improved and screenshot-safe. |
| Company History | Improved, compacted, and screenshot-safe. |
| Global CSS / hooks / design tokens | No changes. |
| Public assets | Reused through symlink; no duplicated bytes. |

## Deferred, not changed

- The 2003px Plant Anatomy pinned runway and fixed-footer curtain spacer from the original screenshot audit remain in the untouched sections.
- Real historical verification, official portraits, and certified technical figures are intentionally out of scope for this mock.
- Mobile-specific screenshot QA and formal visual regression tests can be added in a later iteration.
