# Conversion Blueprint

A ledger of conversion rules, each rated for evidence. From it, each of Pete's projects gets a generated requirements list, and the ledger gets smarter as those projects report results.

- **Why it exists:** `PLAN.md`.
- **Building it:** `START-HERE.md` has the ground rules, the task list (T1–T8) and the status.
- **The detail:** `specs/01-ledger.md` to `specs/04-agents.md`.

## Files

| File | What it is |
|---|---|
| `ledger.json` | Every rule. The single source of truth. Nothing is ever deleted from it. |
| `CHANGELOG.md` | One line for every change to a rule, with the reason and who made it. |
| `projects/<slug>/` | One folder per project: its brief, its generated `requirements.md` and its `scorecard.json`. |
| `modules/` | One short page per business model (booked experience, membership, course). |
| `platforms/` | What each platform can and can't do, with the date it was checked. |
| `templates/` | The project brief and scorecard templates. |
| `agent/` | The generator, auditor and reviewer instructions (T6). |
| `sources/` | Frozen, dated copies of the documents the ledger was seeded from. |
| `tools/` | The ledger checker and the browser audit scripts. |

## For a project session (Hooga, Danger Club…)

Read your own list, `projects/<slug>/requirements.md`, and cite rule IDs in your plan. Don't write anything here. If you learn something that should become a rule, note it in your own handover doc, and a Marketing Beast session will turn it into a proposal.

## For a Marketing Beast session

- Rules are proposed by AI and decided by Pete. `specs/01-ledger.md` says exactly what you may change on your own.
- Run the checker before every commit that touches the ledger:

  ```
  node tools/validate-ledger.mjs
  ```

  It needs only Node 18+, with no `npm install`. It checks every field against spec 01, enforces the rating caps, checks that every rule has a CHANGELOG line, and compares with the last commit to make sure no rule or proposal has been removed.
- **Rating caps, as the checker applies them.** A rule can't be rated higher than the best source it holds:
  - a source read only as an abstract caps it at Moderate;
  - a source read secondhand (`read: "secondary"`) caps it at Weak;
  - guru, AI-spec, vendor and practitioner sources cap it at Weak.

  When you've read the relevant section of legislation or regulator guidance in the original, set `read: "full"` and put the section in `where`.

## Known gaps

Recorded during seeding (T2, 20 Nov 2026).

**Streams.** None is thin. `LAW` came out at 17 against a target of 8–12, because the quick legal checks turned up specific duties worth a rule each (for example, LAW-14: tell buyers of dated stays that there's no statutory right to cancel). Nothing was added to pad a stream.

**Ratings.** 52 of the 91 rules are Weak. That's honest, not a defect: their only sources are:
- the AI-written Google doc;
- the Hooga plan's reasoning;
- the gurus;
- the RGC review summary, which is held only secondhand.

Two things would lift some of them:
- **The full RGC review** (in Pete's chat history) would lift SAL-05, FUN-15, CUS-10, CUS-11 and TRK-07. They're capped at Weak only because the summary is all that's held.
- **A `method` source type.** The source types have no slot for a statistical method (TRK-07) or a W3C standard (UI-01, UI-05 and UI-06 use `platform-docs` as the nearest fit). Adding one would be a structural change, so it's a proposal for Pete.

**Ideas left out of the ledger, and why.**

Not site rules:
- Priestley's partnership deals (co-promotion, affiliates): a channel strategy, not something a site can pass or fail.
- Priestley's "7-hour research window": a number with no source held, and no site check follows from it.
- Stoffel's content split (60–70% new audience, 30–40% nurture): content production, not site conversion.

Belong in a module note or a brief:
- The RGC waitlist planning figures (about 2% of a list, a median lag of about 67 days): planning assumptions for `modules/course.md`.
- The Google doc's "Couples Only" and "90 mins from London" badges: Hooga facts and decisions. They're recorded as clashes and handled in Hooga's brief.
- Hooga's "families come organically, with no paid ads": a project decision for its brief.

Not checked against WCAG levels: a reduced-motion fallback for hero video. It's noted under UI-05.

**What the quick checks found.** `sources/quick-checks-2026-11-20.md` lists each check, its source and what it confirmed.
