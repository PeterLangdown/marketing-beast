# Conversion Blueprint: the plan

*Status: direction approved by Pete, 20 Nov 2026 (his decisions are in §15). Written during the Hooga Website session. **To build it, start at `START-HERE.md`**, which has the task list; the detailed specs are in `specs/`.*

## 1. What this is

A reusable way to build sales sites that convert, so each launch starts from what the last one learned instead of from a blank page.

The end state: *"Let's build a site for this project"*, plus a brief (what it sells, who buys, the look, the numbers), goes in. Out comes a site built from a proven template. It is checked against a numbered list of requirements and has targets set before any money goes on ads. After launch, real results come back and update the list. Launch 20 should be better than launch 1 because launches 1 to 19 taught it something.

In Marketing Beast's own terms (see `../CLAUDE.md`), this is **layer 3 (product build-out template) and layer 4 (execution agent)** for the first stream: sales funnels and website conversion. Guru Vault (layer 1) and the RGC evidence method (layer 2, `../STAGE-2-VALIDATION-METHODOLOGY-NOTES.md`) feed it.

Hooga Retreats (`../../Hooga Website/`, V3) is **launch #1**.

## 2. Is it realistic?

Yes, in a specific and fairly modest shape. It is not "an AI that knows everything about marketing".

**You can't fit the internet into it, and you shouldn't try.** The library (Guru Vault, the literature reviews, source docs) stays where it is. The blueprint is a distilled ledger of roughly 60 to 120 rules. Each rule is one sentence, a way to check it, an evidence rating and a record of what happened when it was used. That fits easily in an AI's working context. The library is only opened when a rule is questioned.

**What's realistic**
- The ledger above.
- A site template taken from Hooga V3 once it has launched, so the plumbing is never rebuilt: tracking, consent, landing-page sections and the booking or checkout hand-off.
- An agent, written as plain markdown so it works in Claude Code and Antigravity, that turns a brief into a build plan, audits a built site and reviews results.
- Getting better across launches. This is the strongest argument for the idea. One small site can't prove much, but the same bet tried on ten sites starts to.

**What isn't**
- **Proving small effects on one small site.** The RGC review worked out that spotting a 30% lift on a 5% conversion rate needs about 3,800 visitors per version. Most of these sites won't get that in a reasonable time. Each launch will teach the big things (do ads pay back, does the gift route sell, does the 48-hour promise cause cancellations), not button colours. The agent must say "not enough data" when that's the truth.
- **One blueprint for every business.** Hooga sells bookings, RGC sells a course, Danger Club sells membership and The Sanctum sells books. Perhaps half the rules apply everywhere: speed, message match, tracking, the law, honest pricing. The rest belong to a business-model module. Hooga seeds the first one: booked experiences.
- **Guaranteed conversion.** The research already in Marketing Beast found that most specific tactics have thin or no direct evidence. The firm ground is mostly legal, and mostly about what's banned. The blueprint makes guesses visible and testable. It doesn't make them go away.

**The main risk** is building the machine instead of launching sites. The guard: the ledger only grows from sources already in hand and from what launches teach, and no rule goes in without a way to check it.

## 3. Three kinds of item

Goals, requirements and ideas get mixed up, and that is how drift happens. A guess written confidently in one doc becomes a "requirement" three sessions later. So every item is one of three kinds:

| Kind | What it is | Example | How it's judged |
|---|---|---|---|
| **Standard** | Must be true before launch: table stakes or the law. | Ad tracking survives to payment, or the gap is written down with a workaround. | Pass or fail at audit. |
| **Bet** | Something we think lifts sales but haven't proven for this kind of business. | Giving "book dates" and "give it as a gift" equal weight sells more in total. | Tracked with a metric across launches: untested, testing, then supported, not supported or inconclusive. |
| **Target** | A number for one project, set from its own economics. | Hooga: the most an ad can cost per booking. | Hit or missed, per project. |

Targets live in each project's scorecard, not in the shared ledger, because every business is different. The ledger holds the *method* for setting them (§9).

A bet becomes a standard only when launches support it. A standard is demoted if launches contradict it.

## 4. Eight streams

Pete's categories, plus two that everything else depends on:

| Code | Stream | Covers |
|---|---|---|
| `FUN` | Funnel | Routes in, the offer, message match, the dates-or-gift fork, where every click goes |
| `SEO` | Google search (organic) | Intent pages, titles, structured data, local search, Google reviews |
| `ADS` | Paid traffic | Google Ads and Meta ads, campaign structure, UTM tags, what each campaign optimises for |
| `UI` | Page and speed | Layout, mobile thumb zone, media, Core Web Vitals |
| `SAL` | Sales | Price display, extras, vouchers, average order value, unit economics |
| `CUS` | Customer | After purchase: setting expectations, cancellations, reviews, repeat and referral |
| `TRK` | Tracking | Events, attribution, consent. Without this no other stream can be scored |
| `LAW` | Trust and law | DMCC Act 2024, PECR and UK GDPR, the ASA/CAP code. The firmest evidence we have |

Each rule also has a **scope**: `core` (every launch) or a module (`booked-experience` first, later `course`, `membership`, `product` and so on).

## 5. The loop

```
brief → build plan → build → audit → launch → results → ledger update
  ▲                                                         │
  └──────────── the next launch starts from the updated ledger
```

1. **Brief.** Fill in the brief template: business, offer, buyer, occasions, look and voice, channels, platform and economics.
2. **Build plan.** The agent picks the core rules plus the right module, drops any that don't fit (saying why) and sets targets from the economics. The output is the project's plan and scorecard, with every item citing a rule ID.
3. **Build** from the site template.
4. **Audit.** The agent checks the site against every standard and records pass, fail, or gap with a workaround. Launch only when the standards pass or Pete accepts a gap in writing.
5. **Results.** After 4 to 8 weeks the agent reads the numbers (GA4, the ad platforms, the booking or payment platform), scores the targets and records how each bet did on this launch.
6. **Ledger update.** Every status change gets a changelog line. Promoting, demoting or deleting a rule needs Pete's OK.

## 6. How it stops drift

- **Fixed IDs.** Rules are cited by ID (`TRK-02`), never paraphrased into something new. If a session wants a rule to say something different, it proposes an edit. It doesn't quietly reword it.
- **One home per fact.** The ledger holds rules. Each project's content files hold its facts: prices, ratings, policies. Its scorecard holds status. Nothing is copied between them. Hooga V3 already works this way, with `src/content/*.js`.
- **A changelog on every rule**: date, what changed, why, and on what evidence.
- **Evidence ratings travel with the rule.** A confident spec doesn't become law by being written down. It goes in as a Weak-rated bet until something better turns up.
- **Proposals are kept.** Agents may add rules as `proposed`, propose changes to existing rules and record results. Only Pete accepts, rejects, promotes, demotes or retires. Nothing is deleted: rejected proposals and retired rules stay, with the reason, so the same idea isn't proposed again without anyone knowing it was turned down.
- **Pruning.** A rule nobody could check on two launches is rewritten or retired.

## 7. Folder layout

```
Marketing Beast/
  Conversion Blueprint/
    PLAN.md                 ← this file: the why
    START-HERE.md           ← the build: ground rules, tasks, status
    specs/                  ← the detailed specs (ledger, projects, seeding, agents)
    README.md               ← how to use it (written in T1)
    ledger.json             ← every rule; the single source of truth
    CHANGELOG.md            ← every change to a rule, with the reason
    modules/                ← one short note per business model: what's different about it
      booked-experience.md
      membership.md
      course.md
    platforms/              ← what each platform can and can't do; this is where bets meet reality
      hospitable.md
    templates/
      project-brief.md
      scorecard.json
    agent/
      GENERATOR.md          ← brief → the project's requirements list and scorecard
      AUDITOR.md            ← built site → statuses
      REVIEWER.md           ← results → readings and proposed ledger changes
    projects/               ← one folder per project; the list each project leans on
      hooga-retreats/       ← launch #1
      danger-club/          ← launch #2
      rgc/
    sources/                ← frozen snapshots of the docs the ledger was seeded from
    tools/                  ← browser audit scripts carried over from Hooga
    viewer/                 ← later: a small static viewer in the Guru Vault style
```

`ledger.json` is the source of truth because the agent, the viewer and the scorecards all read it, and fixed fields stop entries drifting in shape. Pete reads it through the viewer (T8), not as raw JSON.

## 8. What a rule looks like, with examples from Hooga

One entry:

```json
{
  "id": "TRK-02",
  "stream": "TRK",
  "kind": "standard",
  "scope": "core",
  "rule": "Ad click IDs and UTM tags survive from the landing page to the payment step, or the gap is written down with a workaround.",
  "why": "Ad platforms bid on what they can see converting. If the click ID is lost, they learn from the wrong signal.",
  "check": "Open /<landing>?gclid=TEST123&utm_source=test, click through to payment, and confirm both are present at every step.",
  "evidence": { "rating": "Moderate", "reason": "Platform documentation on conversion tracking, not a controlled study.", "sources": [] },
  "verdict": "Adopt",
  "metric": null,
  "origin": "Hooga 'google optimisation ideas' §1; Hooga V3 Hospitable finding",
  "conflicts": ["Hospitable's widget keeps UTMs but drops gclid."],
  "proposals": []
}
```

Ratings use the RGC scale (Strong, Moderate, Weak, Excluded) and verdicts use Adopt, Adapt, Test or Avoid. For a bet, `metric` names the event or number that should move, and in which direction. How each project is doing against a rule lives in that project's own `scorecard.json`, not in the ledger, so every fact has one home. The full field list is in `specs/01-ledger.md`.

Six examples to seed from Hooga. The ratings are provisional until seeding (T2) checks the sources.

| ID | Kind | Rule | Rating | Verdict | Hooga status |
|---|---|---|---|---|---|
| `LAW-01` | Standard | No invented reviews shown as real. Placeholder reviews are clearly labelled and replaced before launch. | Strong: the DMCC Act 2024 bans fake reviews | Adopt | Partial: samples labelled; real ones still to come |
| `LAW-02` | Standard | What a buyer needs to decide (all-in price, what's included, cancellation terms, key limits) is one tap away before they pay. | Strong: leaving it out is a misleading omission under the DMCC Act | Adopt | Likely pass: the "Good to know before you book" panel. Confirm at audit |
| `FUN-01` | Standard | Every paid ad lands on a page whose headline matches the ad's promise. | Moderate: Google Ads Quality Score counts ad relevance and landing page experience | Adopt | Ready: one page per occasion. The ads aren't written yet |
| `FUN-04` | Bet | For occasion purchases, giving "book dates" and "give it as a gift" equal weight sells more in total than dates alone. | Weak: the Hooga spec says "roughly half of occasion buyers are planning a surprise" but gives no source | Test | Built. Metric: gift share of `select_conversion_path`, voucher revenue per 100 visits |
| `CUS-01` | Bet | A clear, easy free-cancellation window raises bookings by more than it raises cancellations ("book first, explain after"). | Not yet rated: retail returns research may help but transfers weakly | Test | Built. Metric: bookings per visit against the 48-hour cancellation rate |
| `UI-02` | Standard | Mobile pages meet Google's "good" Core Web Vitals: LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1. | Moderate: Google's published thresholds. The link to sales is weaker | Adopt | Not yet: the speed pass is deferred |

`UI-02` shows the discipline at work. The Hooga spec asks for LCP under 2.0s, INP under 150ms, zero layout shift and a Lighthouse score of 95+. Those are stricter than Google's own "good" line, and nothing backs the extra strictness. So the standard uses Google's numbers, and "go faster than that" becomes a bet if anyone wants to test it.

## 9. Targets come from economics, not benchmarks

Industry conversion benchmarks are mostly vendor marketing, and Pete's research already found the data opaque. So targets come from each project's own numbers:

- **What is one sale worth?** Not the price: the margin, and whether the sale is *extra*. For Hooga this matters most. A direct booking that would have come through Airbnb anyway is worth only the fee saved. A booking that fills a night that would otherwise stay empty is worth the whole margin. Hooga's ads should probably chase the empty nights (midweek and winter), and the target cost per booking follows from that.
- **The most a sale can cost** = what it's worth minus the profit you want from it.
- **Funnel targets are worked backwards.** From the cost per click and the most a sale can cost, you get the lowest conversion rate at which ads still pay.
- **For the first few weeks of any launch, record a baseline** rather than inventing a goal.

The brief template asks for these numbers up front, so targets exist before money is spent.

## 10. The agent

Three markdown files in `agent/`, written to work in Claude Code and Antigravity alike:

- **GENERATOR** reads the brief, the ledger and the right module, then:
  - writes the project plan and scorecard, citing rule IDs;
  - sets targets from the economics;
  - lists any rule it skips, and why;
  - asks Pete about anything the brief doesn't cover, rather than inventing it.
- **AUDITOR** checks the built site against every standard in the scorecard, using browser test scripts carried over from Hooga V3 (for example the click-ID survival test). It records pass, fail or gap, and holds launch until the standards pass or Pete accepts a gap.
- **REVIEWER** reads the results Pete exports, scores the targets and records each bet's result with honest confidence ("not enough data" when that's the truth). It then proposes ledger changes.

**How a project "talks to" Marketing Beast.** Only through files, and only in one direction:
- Each project has a folder here, `projects/<slug>/`, which holds its generated `requirements.md`.
- The project's own session reads that list and cites rule IDs. It never writes here.
- The agents run from Marketing Beast and never edit project repos.
- Every app sits side by side in `apps/` on both the PC and the Mac Mini, so one line in a project's `CLAUDE.md`/`AGENTS.md` pointing to `../Marketing Beast/Conversion Blueprint/projects/<slug>/requirements.md` is all the project needs.
- The live site never depends on Marketing Beast, so it still passes the `apps/` copy-paste test.

Full detail is in `specs/02-projects.md` and `specs/04-agents.md`.

## 11. The site template

Extract it from Hooga V3 *after* Hooga has launched and shown it works, not before. A template of something unproven just copies its mistakes twenty times.

Parts that already look reusable:
- **Content as config.** `src/content/*.js` holds every fact in one place, with unconfirmed facts flagged.
- **Landing pages:**
  - intent landing pages generated from config, with no navigation on paid pages;
  - the landing sections: hero, proof bar, retreat cards, review wall, stay details, the fork, FAQ and sticky thumb bar.
- **Tracking:**
  - the attribution keeper, which carries click IDs and UTM tags, respects consent and adds them to every hand-off;
  - the analytics event layer.
- **Images.** The responsive image pipeline.
- **Testing.** The browser test scripts: click-ID survival and full-page screenshots.

Likely home: `apps/_SITE_TEMPLATE`, next to the existing `_NEW_APP_TEMPLATE`.

## 12. What to bring over from Hooga

These are now snapshotted in `sources/hooga/` (20 Nov 2026), because `Sourced/docs` isn't committed to the Hooga repo and so isn't on the Mac Mini. Spec 03 has the full treatment.

| Source | How it goes in |
|---|---|
| `Hooga Website/Sourced/docs/google optimisation ideas.txt` | Mostly bets, rated Weak because it's a confident spec with no sources, plus a few standards (tracking, consent, message match). It also clashes with reality in three places, and each clash gets recorded: Hospitable has no Klarna, Hospitable can't carry gclid, and Pete's policy is 48-hour cancellation, not "move your dates free up to 14 days". |
| `Hooga Website/Sourced/docs/Hooga_Business_and_Marketing_Brief.md` | Becomes `projects/hooga-retreats/brief.md` and shapes the brief template. |
| `Hooga Website/CONVERSION-PLAN.md` | The decisions and strategy: two front doors; book first, explain after, easy cancel; the voice. Bets and standards are extracted. The plan itself stays in Hooga and cross-references rule IDs. |
| Hooga V3 findings | Hospitable's limits go into `platforms/hospitable.md`. The UK law points are merged with the RGC review's. |
| `RGC Literature Review/` (already here) | Its eight findings become `LAW` standards and bets, already rated. |
| `Guru Vault/` | Only claims specific enough to check go in. For example, Stoffel's "unconditional guarantees beat conditional ones" becomes a bet. Most guru content stays in the library. |

## 13. Build order

The blueprint is built in Marketing Beast sessions. The task list (T1–T8) and its status live in `START-HERE.md`. In outline:

1. **Ledger and templates.** Seed the ledger from the sources and write the templates, modules and platform notes (T1–T3).
2. **Hooga list (launch #1).** Generate Hooga's requirements list and score V3 against it, reading the Hooga repo without editing it (T4).
3. **Pete's review.** Pete accepts or rejects the seeded rules (T5).
4. **Agents and Danger Club.** Write the agent files (T6), then do Danger Club as launch #2: brief, membership module, list (T7).
5. **Viewer** (T8).
6. **Later:**
   - Hooga launches and runs for 4–8 weeks, then REVIEWER does the first results pass.
   - `_SITE_TEMPLATE` is extracted from Hooga V3 once it has proven itself.
   - After three launches comes the first review across launches.

The Hooga site build carries on in its own repo throughout. It doesn't wait for the blueprint.

## 14. How we'll know the blueprint works

Measure the machine, not just the sites:

- Launch #2 passes its audit in fewer working sessions than Hooga took.
- No rule gets argued from scratch on launch #2: the agent cites the ledger instead of reinventing it.
- Every launch has targets from its own economics before any ad money is spent.
- After three launches, some bets have moved from Test to Adopt or Avoid on real results.
- Pete can open the viewer and see where any project stands in under a minute.

If none of that is true after three launches, the blueprint is overhead and should be cut back.

## 15. Pete's decisions (20 Nov 2026)

1. **Who can change the ledger.** Agents may propose rules and changes and record results. Only Pete decides, and **proposals are kept**: nothing is deleted.
2. **One project per project.** Marketing Beast holds a folder for each of Pete's projects, and each folder generates the list that project leans on. The first three are Hooga Retreats, Danger Club and RGC.
3. **Launch #2 is Danger Club**, which Pete is working on now. Its module, `membership`, is written second.
4. **Keep the build separate.** The blueprint is built in Marketing Beast sessions from the spec files here. Hooga's own build carries on in its own repo, untouched.
