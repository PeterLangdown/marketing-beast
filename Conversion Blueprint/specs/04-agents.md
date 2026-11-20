# Spec 04: the agents

Three roles, each written as a plain markdown file in `agent/` (T6). They have to work in both Claude Code and Antigravity, so they're instructions a session reads, not tool-specific config. They can be wrapped as Claude Code skills later if that turns out useful.

## Rules for all three

- Follow the ground rules in `START-HERE.md`:
  - only write inside Marketing Beast;
  - never invent sources or numbers;
  - never delete anything;
  - propose changes, never decide them.
- Cite rules by ID. Never paraphrase a rule into a new one. If the wording seems wrong, propose a change.
- When a judgement needs data you don't have, say "not enough data" and say what data would settle it.
- End every run with a short summary for Pete:
  - what changed;
  - what's blocked;
  - what needs his decision.

## GENERATOR: brief → requirements list

**Input:** `projects/<slug>/brief.md` and `project.json`.

1. **Check the brief.** List every section marked unknown, or missing, as a question for Pete. Carry on with what's there, but mark the dependent items in the list as waiting on those answers.
2. **Select the rules:** status `active` or `proposed`, with scope `core` or one of the project's modules.
3. **Make each rule concrete.** For every selected rule, write the *Here:* line from the brief and from `platforms/*.md`. If a rule doesn't fit, move it to "Not applied here", with the reason.
4. **Write the Targets section** using the method in spec 02. Fill in only the numbers the brief provides.
5. **Write the files.** Write `requirements.md`, then write `scorecard.json`, keeping any existing statuses by ID.
6. **Propose new rules where the ledger falls short.** If the brief shows something no rule covers, add a `proposed` rule to the ledger, with a CHANGELOG line.

**Done when:** every item has an ID, a check and a *Here:* line, and every target either has a value or names the number it's waiting for.

## AUDITOR: built site → statuses

**Input:** a project slug. Read `project.json` for the repo path and the dev or live URL.

1. **Check each standard** in `scorecard.json` by actually running its `check`. That might mean reading the code, running the browser scripts in `tools/`, or loading the live URL.
2. **Record the result** as `status`, a `here` note with the evidence, and a `checked` date.
   - Never mark a pass without doing the check.
   - If you can't run a check, leave it as `not-checked` and say why.
3. **Report launch readiness:**
   - list the blockers (each `fail`, and each `gap` Pete hasn't accepted);
   - list what Pete needs to decide.

Never edit the project's repo, even to fix something small. Report it instead.

**Tools carried over from Hooga** (see `tools/README.md`):
- `tools/shoot.mjs`: full-page and first-screen screenshots, plus console errors.
- `tools/hooga-attribution-flow.mjs`: clicks from a landing page through to the booking hand-off and checks that `gclid` and the UTM tags survive. It's Hooga-specific (it uses Hooga's button text). Generalise it into an attribution test that takes a URL and a list of steps, once a second project needs it.

## REVIEWER: results → readings and proposals

**Input:**
- the period being reviewed;
- the exports Pete provides: GA4, Google Ads, Meta, the booking or payment platform (Hospitable, later Stripe), and cancellation and review data.

1. **Record readings.** Add a dated entry to `results.md`, newest first. In `scorecard.json`, add readings for each target and each bet in play, always with the sample size (`n`).
2. **Apply the power rule.** For each bet, say roughly what size of effect this sample could detect. The RGC review's worked example: a 30% relative lift on a 5% baseline needs about 3,800 visitors per version. If the sample is too small, the read is "too early", whatever the numbers seem to show.
3. **Watch for seasonality.** Before/after comparisons across seasons are weak for seasonal businesses such as Hooga. Say so whenever you make one.
4. **Propose ledger changes.** These can be `betState` moves, promotions, demotions or new rules, each with evidence. Pete decides.
5. **Check the targets.** Report which are hit and which are missed. If the economics behind a target look wrong, flag it to Pete. Don't change targets yourself.

## How a project session uses this

A project's own session (Hooga, for example) uses none of these agents directly. It reads its `requirements.md`, cites rule IDs in its plan, and tells Pete when it thinks something is ready for audit. The agents run from Marketing Beast.
