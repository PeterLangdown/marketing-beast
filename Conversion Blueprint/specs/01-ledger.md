# Spec 01: the ledger

`ledger.json` is the single source of truth for rules. The agents, the viewer and every project's requirements list read it. Nothing else holds rules.

## File shape

```json
{
  "schemaVersion": 1,
  "updated": "2026-11-20",
  "streams": {
    "LAW": "Trust and law",
    "TRK": "Tracking",
    "FUN": "Funnel",
    "UI":  "Page and speed",
    "SAL": "Sales",
    "CUS": "Customer",
    "ADS": "Paid traffic",
    "SEO": "Google search (organic)"
  },
  "modules": {
    "core": "Applies to every project",
    "booked-experience": "Stays and experiences sold by date (Hooga)",
    "membership": "Recurring membership plus paid events (Danger Club)",
    "course": "Considered, higher-priced education purchases (RGC)"
  },
  "rules": []
}
```

The streams are listed in the order requirements lists use. Law and tracking come first because they gate launch.

## One rule

```json
{
  "id": "TRK-02",
  "stream": "TRK",
  "kind": "standard",
  "scope": ["core"],
  "status": "proposed",
  "rule": "Ad click IDs and UTM tags survive from the landing page to the payment step, or the gap is written down with a workaround.",
  "why": "Ad platforms bid on what they can see converting. If the click ID is lost, they learn from the wrong signal.",
  "check": "Open /<landing>?gclid=TEST123&utm_source=test, click through to payment, and confirm both are present at every step.",
  "metric": null,
  "evidence": {
    "rating": "Moderate",
    "reason": "Platform documentation on conversion tracking, not a controlled study.",
    "sources": [
      { "ref": "Google Ads Help: conversion tracking", "type": "platform-docs", "read": "secondary", "where": "" }
    ]
  },
  "verdict": "Adopt",
  "betState": null,
  "origin": "sources/hooga/google-optimisation-ideas.txt §1 (Attribution Integrity); Hooga V3 Hospitable finding (CONVERSION-PLAN §11)",
  "conflicts": [
    "Hospitable's booking widget keeps UTM tags but drops gclid, and checkout finishes on booking.hospitable.com."
  ],
  "proposals": [],
  "added": { "date": "2026-11-20", "by": "ai" }
}
```

| Field | Values and rules |
|---|---|
| `id` | `<STREAM>-<NN>`, numbered in the order added within a stream (`TRK-01`, `TRK-02`…). Never reused, never renumbered. Use three digits if a stream passes 99. |
| `kind` | `standard` (must be true before launch) or `bet` (thought to lift sales, not proven for this kind of business). Targets never go in the ledger: they belong to projects. |
| `scope` | `["core"]` or one or more module IDs. |
| `status` | `proposed`, `active`, `rejected` or `retired`. See the lifecycle below. |
| `rule` | One sentence in plain English, saying something a project can do or not do. If the verdict is `Avoid`, phrase it as a "Don't…". |
| `why` | One or two sentences. |
| `check` | How to verify it. An agent or Pete should be able to do it in about 10 minutes. If you can't write a check, it isn't a rule yet. |
| `metric` | Bets only: `{ "measure": "event or number", "direction": "up" or "down", "guardrail": "what mustn't get worse" }`. |
| `evidence.rating` | `Strong`, `Moderate`, `Weak`, `Excluded` or `Unrated` (the RGC taxonomy, see `../STAGE-2-VALIDATION-METHODOLOGY-NOTES.md`). Rate it **for this application**, not the study on its own. |
| `evidence.sources[].type` | `legislation`, `regulator`, `meta-analysis`, `experiment`, `observational`, `platform-docs`, `practitioner`, `vendor`, `guru`, `ai-spec` or `own-data`. |
| `evidence.sources[].read` | `full`, `abstract` or `secondary` (a summary, or what someone else said it says). An `abstract` read caps the rating at Moderate; `secondary` caps it at Weak, unless it's legislation or regulator guidance you've quoted from the original. |
| `verdict` | `Adopt`, `Adapt`, `Test` or `Avoid`. |
| `betState` | Bets only: `untested`, `testing`, `supported`, `not-supported` or `inconclusive`. |
| `origin` | The document and section the idea came from. If more than one source suggested the same rule, list them all. |
| `conflicts` | Known clashes: a source that says otherwise, a platform that can't do it, a project decision that differs. Name them; don't resolve them silently. |
| `proposals` | Proposed changes, kept forever (see below). |

## Lifecycle: who may change what

Pete's rule (20 Nov 2026): **proposals are kept.** Nothing is deleted.

| Change | AI session | Pete |
|---|---|---|
| Add a new rule (status `proposed`) | yes | yes |
| Edit any field of a rule that is still `proposed` | yes, with a CHANGELOG line | yes |
| `proposed` → `active` or `rejected` | no | yes, with a reason |
| Change an `active` rule (wording, check, rating, scope, verdict) | propose only | decides |
| `standard` ↔ `bet` (promote or demote) | propose only | decides |
| `betState` `untested` → `testing` (a project has started measuring it) | yes | yes |
| `betState` → `supported`, `not-supported` or `inconclusive` | propose only | decides |
| `active` → `retired` | propose only | decides, with a reason |
| Record a project's results | yes (in the project's `scorecard.json`, not here) | yes |

To propose a change to a rule that isn't `proposed`, append an item to its `proposals` array:

```json
{
  "id": "TRK-02/p1",
  "date": "2026-12-15",
  "by": "ai",
  "change": "What would change, exactly",
  "reason": "Why",
  "evidence": "What it rests on: a project result, a source",
  "decision": "pending",
  "decided": null,
  "note": null
}
```

When Pete decides, set `decision` to `accepted` or `rejected`, fill in `decided` and `note`, and add a CHANGELOG line. If the proposal is accepted, apply it to the rule's fields. A rejected proposal stays in the array, so nobody proposes the same thing again without knowing it was turned down.

A whole new rule that Pete rejects keeps its ID, with `status: "rejected"` and the reason recorded.

**When to propose promoting a bet to a standard:** it's `supported` on at least two projects, or there is Strong outside evidence for this application. **When to propose demoting a standard:** a project result contradicts it.

## CHANGELOG.md

One line per change, newest at the top:

```
2026-11-20 · TRK-02 · added (proposed) · seeded from Hooga google doc §1 and the Hospitable finding · ai
2026-11-22 · TRK-02 · proposed → active · Pete: "yes" · pete
```

Format: date · rule ID (or `ledger` for structural changes) · what changed · why · who.

## Writing a good rule

- One sentence that a project can actually do, or not do.
- A `check` that says exactly how to verify it.
- No numbers without a source. If a number is a guess, say so and make the rule a bet.
- No outcome promises ("this will double bookings").
- Rate it for *this* application. A rigorous study from a distant field gets downgraded. Claims from gurus or AI-written specs start at Weak.
- One idea per rule. If a source bundles three ideas, write three rules.
- Merge duplicates and keep every origin, rather than writing the same rule twice.

## Validation

`tools/validate-ledger.mjs` (written in T1) checks:
- every required field is present, and every enum value is one of the allowed ones;
- IDs are unique, match `<STREAM>-<NN>`, and the stream matches the prefix;
- bets have a `metric` and a `betState`; standards have neither;
- every `active`, `rejected` or `retired` rule has at least one matching line in `CHANGELOG.md`;
- no rule has been removed since the last commit. Compare with `git show HEAD:"Conversion Blueprint/ledger.json"`.

Run it before every commit that touches the ledger.
