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

Filled in during seeding (T2).

- **Thin streams:** none recorded yet.
- **Ideas without a check:** none recorded yet. A candidate rule that couldn't be given a check is listed here instead of going into the ledger.
