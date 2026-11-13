_Planning material only — not something to build yet. Written so a future session has a concrete starting template instead of reinventing a rating scheme from scratch. This note extracts a reusable evidence-review methodology from `RGC Literature Review/RGC-Online-Sales-Practices-Literature-Review.md` (the user's own commissioned research into RGC's online sales practices), for reuse as the "layer 2: independent validation" step in the eventual guru-pipeline: intel (Guru Vault, as built) → validation (this pattern) → product template → execution agents._

## Why this matters

Guru Vault currently records what a guru *claims* (Stoffel's FRCS, Priestley's KPI Method). It doesn't yet assess whether those claims hold up against evidence outside the guru's own book. The RGC review is a fully worked example of exactly that kind of independent assessment, just applied to a different subject (RGC's own sales tactics, not a guru's business claims). The rating and verdict taxonomies, the finding-entry structure, and the source table it uses all transfer directly.

## 1. The rating taxonomy (how much weight a piece of evidence deserves)

Four ratings, applied per-finding, not just per-source:

- **Strong** — meta-analysis, large randomised or pre-registered field experiment, or primary legislation, on a *reasonably comparable question*.
- **Moderate** — single experiment, quasi-experiment, large observational data, regulator guidance, or a strong design that transfers poorly to the subject at hand.
- **Weak** — vendor or practitioner data, small or hypothetical lab studies, abstract-only reading, secondary summaries, theses, or directional claims.
- **Excluded** — not a strength rating. Flags a claim or tactic that conflicts with the stated ethical stance (for RGC: "informed choice"; for a guru-claims review it would be something like "doesn't mislead about typical outcomes") or with the applicable law, regardless of whether it would "work."

The critical discipline, repeated throughout the RGC review: **rate the finding for *this* application, not the study in isolation.** A rigorous, well-powered study on an unrelated domain (chocolate pricing, software free-trial conversion) gets downgraded when applied to RGC's specific claim, even though the underlying research is itself Strong. The review states this explicitly: "a strong result on chocolate or software trials is not strong evidence for a £500 relationship course." The same discipline applies directly to guru claims — a case study from Stoffel's own paying clients, even if true, doesn't transfer to "this will work for you" with Strong confidence; it's closer to Weak-to-Moderate, same as the RGC review treats self-reported vendor benchmarks.

Two further habits worth keeping:
- Always distinguish "I read the abstract only" from "I read the full study" — abstract-only sources get capped at Weak-to-Moderate regardless of how good the underlying journal is.
- Explicitly name the gaps: "no verified source covered X" is itself a useful, honest output, not a failure of the review.

## 2. The verdict taxonomy (what to actually do about a specific recommendation)

Once a finding is rated, it gets translated into a verdict for the specific thing being assessed:

- **Adopt** — well supported; use as-is.
- **Adapt** — the underlying idea is sound, but how it's executed needs to change (e.g. "use a premium tier, but don't claim it lifts mid-tier sales — no evidence for that specific mechanism").
- **Test** — plausible, but genuinely untested for this specific application. Needs a real experiment or at minimum a tracked hypothesis.
- **Avoid** — conflicts with the evidence found, or with law/ethics, regardless of how appealing it sounds.

This is the layer that turns "the evidence is thin" into an actual decision, instead of leaving everything hedged. It's the natural output format for a guru-claims validation pass: each specific claim or tactic in a guru's playbook gets one of these four verdicts once checked against outside evidence.

## 3. The structure of a single finding entry

Every finding in the RGC review follows roughly the same shape, which is worth keeping as a template:

1. **The claim or question, stated plainly.** ("Does giving something away for free convert better than charging for it?")
2. **The best evidence found, named and dated.** (Author/year, study type, sample size where known.)
3. **The rating**, using the taxonomy above, with a one-line reason *why* that rating (not just the label).
4. **What transfers and what doesn't.** Explicitly separate "this is what the study showed" from "here's the inferential leap required to apply it to our case" — the review calls inferential leaps out as "inference, not a tested result" wherever one is made.
5. **The resulting recommendation**, phrased as something concrete and actionable, not just "more research needed."

For the RGC review this produced entries like: claim → "a zero price changes behaviour" → Shampanier/Mazar/Ariely (2007), real-purchase field experiment, N=398 → rated Strong *for low-stakes goods*, but explicitly flagged as **not** transferring to a £500 considered purchase → recommendation: treat "free" as necessary but not sufficient, build trust through content substance instead.

For a guru-claims version, the same shape would look like: claim → "Stoffel says 110-hour weeks and two years of unpaid content before any paid offer is the standard runway" → evidence found (none independent of his own account) → rated Weak (self-sourced, single case) → doesn't transfer as a general rule, since it depends entirely on having existing distribution/audience access → recommendation: present as "his stated experience," not as a validated benchmark.

## 4. The annotated source table pattern

The review closes every major section with a table in this exact shape:

| Source | Title and venue | Study type | Rating |
|---|---|---|---|

Where:
- **Source** — short citation key (author/year or publisher name), used as the in-text reference.
- **Title and venue** — full title and where it was published (journal, vendor blog, regulator page, law firm commentary). Square brackets are used where the exact title couldn't be confirmed from what was actually read.
- **Study type** — meta-analysis / RCT / observational / vendor benchmark / regulator guidance / law-firm secondary summary / etc., including sample size where known, and flagging explicitly if only an abstract or press release was read.
- **Rating** — from the Strong/Moderate/Weak taxonomy, often split (e.g. "Strong for X; Weak for Y") when a single source supports one part of a claim strongly but another part only weakly.

This table is what makes the review auditable and reusable later — anyone can go back and check exactly what a specific rating rested on, rather than trusting a bare citation. The same table format should back any future guru-claims validation: one row per outside source consulted to check a specific guru claim.

## 5. How this would apply to a guru's claims

When Guru Vault's eventual validation layer assesses a claim from a guru's own material — e.g. Stoffel's "give away the information, sell the implementation" trust-spiral claim, or Priestley's "you will become a Key Person of Influence in your industry within the next twelve months" — it should produce an entry with exactly this shape:

1. **The claim as stated** by the guru, quoted or closely paraphrased, with its source location (which module/chapter).
2. **What in the guru's own book is anecdote vs. data.** Named case studies from the guru's own paying clients/businesses are a real but weak evidence class on their own (self-sourced, survivorship-biased, no independent verification) — this should be stated plainly as its own line, not folded silently into "evidence for the claim." The RGC review's skeptical treatment of vendor/practitioner benchmarks is the direct model for this.
3. **The best outside evidence found**, rated using the Strong/Moderate/Weak/Excluded taxonomy above, explicitly noting domain distance (a general marketing or psychology study is not strong evidence for a specific guru's specific numbered claim, even if the study itself is rigorous).
4. **An honest verdict on how much weight to put on the claim**, using the Adopt/Adapt/Test/Avoid taxonomy — e.g. "Adapt: publishing a book plausibly builds credibility (Moderate evidence this works as a trust signal generally), but the specific 12-month timeline to becoming a recognised authority is Weak-to-unfounded and should not be treated as a predictable outcome."
5. Where the claim is a pure promise with no evidence offered anywhere (e.g. "you will become a KPI within 12 months"), the entry should say so directly — this is itself a finding worth surfacing, not something to soften.

This gives Guru Vault's skeptical/synthesis sections (already present per-guru in `Guru Vault/synthesis.js`) a disciplined, auditable backing instead of editorial judgement alone — and gives a future stage-2 app a concrete table format and taxonomy to build around rather than starting from a blank page.
