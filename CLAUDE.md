# Sales Funnels — Guru Research Project Notes

Project notes for AI sessions picking this up later. Read this before touching anything in
this folder. For the Guru Vault app itself, also read `Guru Vault/README.md`.

## What this project is

Pete is collating different "gurus'" business models into one evolving reference system,
so he can draw on a cohesive, honest picture of what actually works before launching his
own ventures — rather than taking any one guru's word for it.

The eventual shape is a four-layer pipeline, discussed but only partly built:

1. **Intelligence layer** (built — this is `Guru Vault/`) — one guru per entry, read against
   a shared set of questions, with an honest synthesis and an explicit skeptical critique
   of each guru's own claims.
2. **Independent validation** (not built) — cross-checking each guru's claims against
   outside evidence, not just restating what the guru says about themselves. See
   `STAGE-2-VALIDATION-METHODOLOGY-NOTES.md` if present (filed as a background task —
   check whether it landed before assuming it exists).
3. **Product build-out template** (not built) — turning validated synthesis into a
   buildable offer/funnel spec. Pete already has considerable ideas of his own here; not
   yet discussed in depth with Claude.
4. **Execution agent system** (not built) — an agent (or agents) that actually implements
   the chosen playbook.

`Guru Vault` is deliberately scoped to layer 1 only. Per this repo's own `apps/README.md`
convention, it's a standalone app (own git repo, no reach-back into sibling folders), so
layers 2–4 should become separate apps that *consume* Guru Vault's `data.js` as input,
not features bolted onto Guru Vault itself.

## Folder structure

- `Sam Stoffel/` — source material: the 5 original purchased FRCS course PDFs.
- `Daniel Priestley/` — source material: `README.md` + `extraction-notes.md` (condensed
  chapter notes, not a verbatim copy). The book's full text arrived via a pasted chat
  attachment rather than a stored PDF, so there's no original file to keep here —
  the extraction notes are the provenance record instead.
- `Guru Vault/` — the actual site. Own git repo (`git init`'d), **nothing committed yet** —
  only commit on explicit request. See its own `README.md` for structure and how to add
  a guru.
- `RGC Literature Review/RGC-Online-Sales-Practices-Literature-Review.md` — Pete's own
  commissioned research doc on online sales practices for his separate Relationship Growth
  Centre venture. **Not a guru** — filed here for reference, kept out of `Guru Vault/`
  entirely so it doesn't leak proprietary venture research into what's meant to be a
  standalone, shareable site. **This is a condensed summary, not the full original
  document** — see the note below before assuming it's complete.
- `STAGE-2-VALIDATION-METHODOLOGY-NOTES.md` — the reusable rating/verdict schema
  (Strong/Moderate/Weak/Excluded; Adopt/Adapt/Test/Avoid) pulled out of that lit review as
  a template for layer 2, whenever it gets built.

**Note on the RGC filing:** the agent that did this work found it was about to reproduce
roughly 20 pages of the original review almost verbatim, stopped, and wrote a genuine
condensed summary instead (structure, headline findings, a pointer back to this
conversation for the full source table). It applied the same judgement to the Priestley
extraction notes. If a future session needs the complete RGC document preserved word-for-
word as a file, that's a call for Pete to make explicitly — don't do a full verbatim
reproduction without asking first.

## Guru roster

| Guru | Status | Source |
|---|---|---|
| Sam Stoffel (Filthy Rich Playbooks / FRCS) | Populated | 5 purchased course PDFs |
| Daniel Priestley (Key Person of Influence) | Populated | Full book text, pasted in chat |
| "Jay Topp" — *Real Growth* | **Dead end** | Could not find a legitimate source. Web search for the title and the author name turned up nothing — no Amazon listing, no publisher page, no verifiable author bio. The only trace was an unauthorized-looking Scribd upload (uploader handle "kharitelesford", 166pp, gated behind login) — deliberately *not* scraped for content, since that's someone else's unverified re-upload, not a source to extract from. If Pete actually owns this book, the fix is the same as the other two: supply the PDF or paste the text directly. Otherwise double-check the title/author spelling, or drop it. |

## Conventions established (follow these for guru #4+)

- Every `data.js` guru entry needs: `scorecard` (3 metrics, 0–100, with a note each),
  `chips` (2 short highlights), `credibility` (verifiable biographical facts only — no
  puffery), a `source` line naming exactly what was summarised, all 8 fixed `dimensions`
  keys, and 5 `modules` mapped onto *that guru's own* natural stage structure (FRCS's
  Niche/Brand/Attention/Offer/Sales for Stoffel; Pitch/Publish/Product/Profile/Partnership
  for Priestley — don't force a different guru's structure onto a new one).
- Every `synthesis.js` entry needs a genuinely critical `skeptical` section, not a hedge.
  Both entries so far call out that **the guru's own source material is itself a funnel
  into a paid coaching program or course** — that pattern is now an explicit thing to
  check for in every future guru, not just these two.
- Source folders hold either the original purchased material (Stoffel's PDFs) or condensed
  research notes with a provenance README (Priestley, since the text arrived as pasted
  text, not a file) — never a full verbatim redistribution of someone else's book.
- No outcome-guarantee language from a source book gets carried into the Guru Vault copy
  as fact, even when the book states it as one (e.g. Priestley's "you'll become a KPI in
  your industry within 12 months" claim is flagged as unevidenced in the skeptical
  section, not repeated as a promise).

## Open items

- [ ] Decide whether the RGC Literature Review needs to exist as a full verbatim file
      anywhere (it currently doesn't — only a condensed summary exists; the complete
      version lives in this conversation's history).
- [ ] Decide guru #3: resolve the Jay Topp question one way or the other, or pick a
      different guru to profile next.
- [ ] `Guru Vault`'s git repo has never been committed to. Ask before committing.
- [ ] No live/visual check of the Priestley addition has been done in a browser — this
      environment has no browser tooling (chromium-cli, browser MCP, jsdom all
      unavailable as of the last check). `node --check` passed on `data.js`, `synthesis.js`
      and `app.js`, but Pete should open `index.html` himself to confirm the Compare tab
      and Framework accordion render correctly with two gurus in them.
