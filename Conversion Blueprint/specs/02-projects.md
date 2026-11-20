# Spec 02: projects

Each of Pete's projects gets its own folder here. That folder holds the generated list the project leans on, and the record of how the project is doing against it.

```
projects/<slug>/
  project.json      the project card
  brief.md          the filled-in brief (template: templates/project-brief.md)
  requirements.md   GENERATED: the list the project leans on. Don't hand-edit it.
  scorecard.json    the status of each rule for this project, plus targets and bet readings
  results.md        dated results reviews, newest first
```

## Who writes what

- **Marketing Beast sessions write** these files.
- **Project sessions only read** them. Hooga's own session reads `projects/hooga-retreats/requirements.md` and cites rule IDs in its plan. It never edits anything here.
- If a project session learns something that should become a rule, it notes it in its own handover doc. A Marketing Beast session then turns that into a proposal.

That keeps each project's repo free of blueprint machinery (Pete, 20 Nov 2026).

**How a project finds its list:** once `requirements.md` exists, Pete asks that project's session to add one line to its own `CLAUDE.md`/`AGENTS.md` or plan:

> Conversion requirements: `../Marketing Beast/Conversion Blueprint/projects/<slug>/requirements.md`. Read it before planning; cite rule IDs.

The live site never depends on Marketing Beast, so every app still passes the `apps/` copy-paste test.

## project.json

```json
{
  "slug": "hooga-retreats",
  "name": "Hooga Retreats",
  "launchNumber": 1,
  "modules": ["booked-experience"],
  "stage": "building",
  "repo": "apps/Hooga Website",
  "site": "apps/Hooga Website/couples-site-v3",
  "plan": "apps/Hooga Website/CONVERSION-PLAN.md",
  "facts": ["apps/Hooga Website/couples-site-v3/src/content/"],
  "github": "https://github.com/PeterLangdown/hooga-website",
  "liveUrl": null,
  "channels": [],
  "platforms": [],
  "sources": "Conversion Blueprint/sources/hooga/",
  "notes": []
}
```

`stage` is one of `brief`, `building`, `audit`, `live`, `reviewing` or `paused`. Paths are relative to `apps/`. The project's own facts (prices, policies, reviews) stay in its own repo and are only pointed to from here, so each fact has one home.

## brief.md (template: `templates/project-brief.md`)

The brief has ten sections. Leave any unknown as **"Unknown: ask Pete"**. Never guess.

1. **The business** in two sentences.
2. **What's sold:** products and prices. Point to the project's facts file if it has one.
3. **Who buys, why and when:** triggers and occasions, and who makes the decision (it may be one person buying for another).
4. **Voice and look:** words to use and words to avoid, reference sites, brand assets.
5. **Channels:** where traffic will come from (paid or organic, and which platforms), and what's out of scope.
6. **Platforms:** booking, payment and email tools, and their known limits. Link to `platforms/*.md`.
7. **Economics:**
   - price and margin per sale;
   - how much demand is already met elsewhere (Hooga: Airbnb), and the spare capacity or empty slots;
   - the most Pete would pay to win one sale;
   - the monthly ad budget.
8. **House rules:** Pete's non-negotiables. For Hooga: book first, explain after, make cancelling easy, a no-hassle 48-hour cancellation window, and "magic, not luxury".
9. **Proof available:** real reviews with counts and ratings, years trading, press, video.
10. **Still unknown:** items to confirm.

## requirements.md (generated)

**What goes in.** Rules with status `active` or `proposed` whose scope is `core` or one of the project's modules. Mark proposed rules **(proposed)** so the project knows Pete hasn't confirmed them yet. Rejected and retired rules never appear.

**Layout.**
1. **Header:** project, date generated, the ledger's `updated` date, and counts (pass, fail, gap, not checked).
2. **Standards: must pass before launch.** Grouped by stream, in the ledger's stream order.
3. **Bets in play:** each with its metric, baseline and current reading.
4. **Don'ts:** rules with an `Avoid` verdict.
5. **Targets:** see below.
6. **Not applied here:** each skipped rule, with the reason.
7. **Gaps Pete has accepted:** each with its workaround.
8. **Footer:** "Generated from ledger.json on <date>. Don't hand-edit. Ask a Marketing Beast session to regenerate."

**One item:**

```markdown
- [~] **TRK-02** · standard · Moderate
  Ad click IDs and UTM tags survive from the landing page to the payment step, or the gap is written down with a workaround.
  *Check:* open /anniversary?gclid=TEST123&utm_source=test, then go through to Hospitable's checkout.
  *Here:* Hospitable's widget keeps UTM tags but drops gclid. Workaround in CONVERSION-PLAN §11. Gap accepted by Pete: no.
```

Boxes: `[x]` pass, `[ ]` not checked yet, `[!]` fail, `[~]` gap, `[-]` n/a.

The *Here:* line is the reason a per-project list beats a generic checklist. It turns the general rule into this project's specifics: its platform, URLs and decisions.

**Regenerating.** Do it whenever the ledger or the brief changes. Statuses live in `scorecard.json` by rule ID, so the ticks survive regeneration.

## Targets

These come from the project's own economics, never from industry benchmarks (`PLAN.md` §9). The generator writes the formula and fills in only the numbers the brief gives it:

- **What one sale is worth:** the margin, adjusted for whether the sale is extra. For Hooga, a booking that would have come through Airbnb anyway is worth only the fee saved; one that fills an empty night is worth the whole margin.
- **The most a sale can cost:** worth minus the profit Pete wants from it.
- **The lowest conversion rate at which ads pay:** cost per click ÷ the most a sale can cost.
- **Baseline first:** for the first few weeks after launch, record what happens rather than setting a goal.

## scorecard.json

```json
{
  "project": "hooga-retreats",
  "ledgerUpdated": "2026-11-20",
  "items": {
    "TRK-02": { "status": "gap", "here": "Hospitable drops gclid; workaround in CONVERSION-PLAN §11", "checked": "2026-11-19", "by": "ai", "gapAcceptedByPete": false },
    "LAW-01": { "status": "fail", "here": "Sample reviews are labelled but still on the page", "checked": "2026-11-19", "by": "ai" }
  },
  "notApplied": { "SEO-07": "Reason" },
  "bets": {
    "FUN-04": {
      "measure": "Gift share of select_conversion_path; voucher revenue per 100 visits",
      "baseline": null,
      "measuringSince": null,
      "readings": [ { "date": "", "value": "", "n": 0, "note": "" } ],
      "read": "too early"
    }
  },
  "targets": [
    { "name": "Most a booking can cost (ads)", "value": null, "basis": "How it was worked out, or 'needs margin from Pete'", "actual": null }
  ]
}
```

`status` is one of `not-checked`, `pass`, `fail`, `gap` or `n/a`. A `gap` only counts as launch-ready once `gapAcceptedByPete` is true.

**Launch gate:** every standard is `pass`, `n/a` or an accepted `gap`.

## The first three projects

| Slug | Launch | Module | Stage | Notes |
|---|---|---|---|---|
| `hooga-retreats` | #1 | booked-experience | building | V3 is being built now in `apps/Hooga Website/couples-site-v3`. Sources in `sources/hooga/`. |
| `danger-club` | #2 | membership | brief | Pete is working on it. The brief needs to come from Pete. Known facts are in its `project.json`. |
| `rgc` | later | course | brief | The source is `../RGC Literature Review/` (a condensed summary; the full review is in Pete's chat history). Sites: `apps/RGC core website` and `apps/RGC Theory Site`. |
