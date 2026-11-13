# Guru Vault

A standalone, static business-model literature review: concise reports on individual "gurus," read against a shared set of questions so they stay comparable as more are added.

No build step, no dependencies — open `index.html` directly, or serve the folder with any static file server.

## Structure
- `data.js` — the content model. Each guru is one object in the `GURUS` array (profile, scorecard, dimensions, and 5 modules of frameworks/tactics/quotes/examples).
- `synthesis.js` — the hand-written "cuts through the noise" overview text per guru, keyed by guru id in `SYNTHESIS`.
- `app.js` — renders everything from the two data files; no guru-specific logic lives here.
- `styles.css` / `index.html` — the pastel dashboard UI (light/dark aware).

## Adding a second guru
1. Add a new PDF/source folder alongside this one (e.g. `../<Guru Name>/`).
2. Push a new object into `GURUS` in `data.js` with `status: "populated"` and the same shape as the Sam Stoffel entry (same `dimensions` keys especially — that's what keeps the Compare tab apples-to-apples).
3. Add a matching entry to `SYNTHESIS` in `synthesis.js`.
4. Nothing in `app.js`, `index.html` or `styles.css` needs to change.

## Status
- **Sam Stoffel** (The Filthy Rich Playbooks / FRCS) — populated. Summarised from purchased course PDFs for personal research — not affiliated with or redistributing the original material.
- **Daniel Priestley** (Key Person of Influence) — populated. Summarised from the full book text (provided via chat, not a stored PDF) for personal research — not affiliated with or redistributing the original material.

See `../CLAUDE.md` for the wider project notes: the multi-guru pipeline vision, folder conventions, and open items.
