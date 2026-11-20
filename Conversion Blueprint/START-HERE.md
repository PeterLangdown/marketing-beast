# Conversion Blueprint: start here

*For the AI session (Claude Code or Antigravity) that builds this. Written on 20 Nov 2026 from the Hooga Website session, after Pete approved the direction.*

## What you're building

In one line: a ledger of conversion rules, each rated for evidence. It generates a requirements list for each of Pete's projects, and it gets smarter as those projects report results. Read `PLAN.md` for the reasons behind it.

Pete's three decisions (20 Nov 2026):
1. **Proposals are kept.** AI sessions may propose rules and changes and record results. Only Pete accepts, rejects, promotes, demotes or retires a rule. Nothing is ever deleted: rejected proposals and retired rules stay, with the reason.
2. **One project folder per project** (`projects/<slug>/`). Each folder holds the generated list that project leans on. The first three are Hooga Retreats (launch #1, being built now), Danger Club (launch #2; Pete is working on it) and RGC.
3. **This build stays in Marketing Beast.** It must not spill into the project repos. The Hooga site build carries on separately in its own repo.

## Ground rules

- **Work only inside `Marketing Beast/`.**
  - You may *read* other project repos (for example `apps/Hooga Website/`), but never edit them.
  - Projects lean in by reading their own `projects/<slug>/requirements.md`.
  - If a project's repo needs a change, such as a pointer to its requirements list, tell Pete. That project's own session makes the change.
- **Paths are relative to the `apps/` folder** unless they say otherwise. That folder is `O:\Claude\16bit home server\apps` on the PC and `~/skybound-mac-mini/apps` on the Mac Mini.
- **Nothing invented.**
  - Every rule names where it came from.
  - If you couldn't check a source, say so and rate it accordingly.
  - Never fill a target with a made-up number. Leave it blank and ask Pete.
- **Never delete.** Rule IDs are never reused or renumbered.
- **You propose, Pete decides.** See `specs/01-ledger.md` for exactly what you may change on your own.
- **Sources are frozen.** The files in `sources/` are dated snapshots. Don't edit them; if a newer version is needed, add a new dated snapshot next to the old one.
- **Finish each task properly.**
  - Update the status table at the bottom of this file.
  - Commit and push to `origin/main` (`https://github.com/PeterLangdown/marketing-beast.git`).
  - Never commit secrets or `.env` files.

## Read in this order

1. `PLAN.md`: the why, the three kinds of item (standard, bet, target), the eight streams and the loop.
2. `specs/01-ledger.md`: the rule format, the lifecycle, and who may change what.
3. `specs/02-projects.md`: the project folders, the brief, the generated requirements list and the scorecard.
4. `specs/03-seeding.md`: what goes in first, from which sources, how to rate it, and the conflicts already known.
5. `specs/04-agents.md`: the three agent roles (generator, auditor, reviewer).

## Tasks

| # | Task | Done when |
|---|---|---|
| T1 | Set up the files. Create `ledger.json` (empty `rules` array, shape from spec 01), `CHANGELOG.md` and a short `README.md`. Write `tools/validate-ledger.mjs` (spec 01, "Validation"). | The validator passes on the empty ledger. |
| T2 | Seed the ledger from `sources/` and `../RGC Literature Review/` (spec 03). Every seeded rule has status `proposed`. | 60–120 rules covering all eight streams. Each one is checkable, rated and traced to its origin, and the validator passes. |
| T3 | Write `templates/project-brief.md` and `templates/scorecard.json` (spec 02). Write `platforms/hospitable.md` and `modules/booked-experience.md`, plus stubs for `modules/membership.md` and `modules/course.md` (spec 03). | The files exist and match their specs. |
| T4 | Hooga, launch #1. Write `projects/hooga-retreats/brief.md` from `sources/hooga/`. Generate `requirements.md` and `scorecard.json`. Fill in statuses by reading `apps/Hooga Website/couples-site-v3` (read only). Then tell Pete it's ready, so the Hooga session can add a single pointer line to its own plan. | Hooga has a requirements list where every item has an ID, a check and a current status. |
| T5 | Pete's review. Take Pete through the proposed rules one stream at a time, starting with `LAW` and `TRK`. Record each accept, reject or edit, with Pete's reason. | Every seeded rule is `active` or `rejected`, and each decision has a CHANGELOG line. |
| T6 | Write the agent files `agent/GENERATOR.md`, `agent/AUDITOR.md` and `agent/REVIEWER.md` (spec 04). | A fresh session given only `GENERATOR.md` and a brief produces a valid requirements list. |
| T7 | Danger Club, launch #2. Fill in the brief with Pete, flesh out `modules/membership.md`, then generate the requirements list. | Danger Club has `brief.md`, `requirements.md` and `scorecard.json`. |
| T8 | Build the viewer in `viewer/`, as a small static page in the Guru Vault style. It reads `ledger.json` and `projects/*/scorecard.json`. Pages opened from `file://` can't fetch JSON, so either serve the folder (bound to `0.0.0.0` on a free port between 4335 and 4399), or generate a `data.js` the way Guru Vault does. | Pete can filter by stream, kind, rating, status and project, and can see each project's ticks. |

**Later, not yet:**
- REVIEWER's first results pass, once Hooga has been live for 4–8 weeks.
- The RGC project folder.
- Extracting `_SITE_TEMPLATE` from Hooga V3. That happens in `apps/`, not here, and only when Pete says Hooga has proven itself.

## Status

| Task | Status | Date | Note |
|---|---|---|---|
| T1 | done | 2026-11-20 | `ledger.json` (empty), `CHANGELOG.md`, `README.md`, `tools/validate-ledger.mjs`. The checker passes on the empty ledger and caught all 12 errors planted in a test ledger, including a removed rule. |
| T2 | not started | | |
| T3 | not started | | |
| T4 | not started | | |
| T5 | not started | | |
| T6 | not started | | |
| T7 | not started | | |
| T8 | not started | | |
