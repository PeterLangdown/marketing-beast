# Spec 03: seeding the ledger, modules and platforms

The first fill of `ledger.json`, written from material already in hand. This is not a research project. Don't go looking for new evidence beyond quick checks of the law and platform documentation. Mark anything unverified as unverified, and rate it accordingly.

## Sources

| Source | What it is | How it goes in |
|---|---|---|
| `sources/hooga/google-optimisation-ideas.txt` | An AI-written spec for a "luxury couples glamping funnel". Confident, detailed, and without sources. | Mostly bets rated Weak (type `ai-spec`), plus a handful of standards where outside backing is easy to confirm: message match, consent, tracking survival, Core Web Vitals. Record every clash listed below. |
| `sources/hooga/Hooga_Business_and_Marketing_Brief.md` | Pete's own business brief. | Not rules: it feeds `projects/hooga-retreats/brief.md` and shapes the brief template. Some audience points may suggest module rules for `booked-experience`. |
| `sources/hooga/CONVERSION-PLAN-2026-11-20.md` | The Hooga V3 plan and decisions, including what's built (§10) and the Hospitable findings (§11). | Bets and standards for its strategy: two front doors, book first and explain after, voice, the fork, the sticky bar, intent pages, content as config. Hospitable's limits go into `platforms/hospitable.md`. The live plan stays in the Hooga repo; this is a snapshot. |
| `../RGC Literature Review/RGC-Online-Sales-Practices-Literature-Review.md` | A condensed summary of Pete's commissioned evidence review. | Its eight findings become `LAW` standards and `core` bets, keeping the review's own ratings. Set `read: "secondary"` because only the summary is here. Its harm-marker audit (unaccountable authority, a costly exit, control of information, guilt as a lever, money or recruiting as the real goal) seeds `CUS` and `LAW` rules for the `membership` module. |
| `../Guru Vault/data.js` and `synthesis.js` | Guru summaries. | Only claims specific enough to check, for example Stoffel's claim that unconditional guarantees beat conditional ones. Type `guru`, rated Weak unless outside evidence exists. Most guru content stays in the library. |
| `../STAGE-2-VALIDATION-METHODOLOGY-NOTES.md` | The rating and verdict method. | Not rules. It's how you rate them. |

Aim for roughly these numbers per stream: `LAW` 8–12, `TRK` 8–12, `FUN` 10–15, `UI` 8–12, `SAL` 8–12, `CUS` 8–12, `ADS` 8–12, `SEO` 6–10. If a stream ends up thin, record that as a gap in `README.md`. Don't pad it.

## Process

1. Read every source in full before writing a single rule.
2. List candidate rules and merge duplicates across sources, keeping every origin.
3. Classify each one as a standard or a bet. If in doubt, make it a bet: a bet can be promoted later.
4. Rate it for this application (see `../STAGE-2-VALIDATION-METHODOLOGY-NOTES.md`). With no outside check, the rating can't be higher than the best source you actually hold.
5. Write the `check`. If you can't, drop the candidate and note it in `README.md` under "ideas without a check".
6. Fill in `conflicts`.
7. Give everything `status: "proposed"` and `added.by: "ai"`, and write the CHANGELOG lines.
8. Run the validator.

## Clashes already known (record them in `conflicts`)

Found during the Hooga V3 work (19–20 Nov 2026). The Google doc says one thing; reality or Pete's decisions say another:

| The Google doc says | The reality |
|---|---|
| "Luxury" positioning throughout | Pete: "not luxury: it's an experience, magic, realising the childlike magic we lost." |
| A "Couples Only" badge | The yurt and the bus welcome families. Families get an organic route, with no paid ads. |
| A "90 mins from London" badge | Not confirmed. The site's own line ("under an hour on the high-speed train from St Pancras") is also flagged to confirm. |
| "Move your dates free up to 14 days before arrival" | Pete's policy: no-hassle cancellation within 48 hours of booking. |
| Booking engine embedded natively, never bouncing to a third-party portal | Hospitable Direct's widget is an iframe, and checkout finishes on `booking.hospitable.com` with no redirect back. |
| Klarna/Clearpay; Apple Pay at the top | Hospitable checkout has no Klarna. Direct Premium uses Adyen. Apple Pay and Google Pay availability not checked. |
| `gclid` must survive to payment | Hospitable keeps UTM tags but drops gclid, fbclid and `_gl`. Workaround in CONVERSION-PLAN §11. |
| A single "Celebration Arrival Bundle" at £95–£135 (sparkling wine, hot tub pre-lit, breakfast hamper, 12pm checkout) | Pete's real package: a £55 Celebration package (balloons, chilled prosecco, banner) at all three retreats, plus V1's extras prices. |
| "Real-time scarcity badges (Only 1 Friday left)" | Allowed only if true and live. Otherwise it's fake urgency, which the DMCC Act 2024 bans: rate `Excluded`, verdict `Avoid`. |
| Abandoned-checkout email capture and recovery | Checkout belongs to Hospitable, not us. It's only possible on our own voucher checkout. |
| Enhanced conversions: hashed email, phone and so on pushed into the dataLayer | We never see stay-checkout personal data (Hospitable does). Possible only on our own voucher checkout, and only with consent. |
| A CRM webhook for a repeat-booking invite at 10.5 months | There's no CRM. Pete uses Hospitable plus Gmail. |
| Lighthouse 95+, LCP under 2.0s, INP under 150ms, CLS of 0.00 | Stricter than Google's own "good" thresholds (LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1, at the 75th percentile), with no backing for the extra strictness. The standard uses Google's numbers. |
| "Roughly half of occasion buyers are planning a surprise"; "75%+ of visitors on iPhone" | No source given. Treat these as assumptions inside bets, not facts. |

## Six worked examples

See `PLAN.md` §8: `LAW-01`, `LAW-02`, `FUN-01`, `FUN-04`, `CUS-01`, `UI-02`. Use them as the pattern, but rate them properly. Their ratings in `PLAN.md` are provisional.

## Modules

`modules/<id>.md`: one short page per business model, saying what's different about selling it. It isn't a list of rules: the rules live in the ledger with that module in their `scope`.

- **`booked-experience`** (written in full in T3, from the Hooga sources):
  - dates and live availability;
  - seasonality and empty nights;
  - the risk that direct bookings simply replace OTA bookings that would have happened anyway (Airbnb);
  - gifts and open-date vouchers;
  - occasions;
  - cancellations and setting expectations;
  - extras;
  - the hand-off to a booking platform.
- **`membership`** (stub in T3, fleshed out with Pete in T7). The starting facts come from the Danger Club charter, in the overworld repo at `strongholdvault/05-Danger-Club/00-Danger-Club-Master-Charter.md`:
  - 100 members at £50 a month;
  - monthly events, paid on top;
  - the "Don't Be a Dick" rule;
  - soft pathways into Grownuphood, RGC and Post-Success.

  Themes:
  - recurring payment and churn;
  - how easy it is to cancel (check whether the DMCC Act's subscription contract rules are in force yet; don't assume either way);
  - joining as a decision about identity and belonging;
  - event tickets on top of the subscription;
  - the RGC review's harm markers for high-identity groups.
- **`course`** (stub; RGC, later):
  - a considered, higher-priced purchase;
  - real cohort deadlines only;
  - judging success on completion and refunds, not clicks;
  - quiz answers that may count as special category data.

## Platforms

`platforms/<name>.md`: what a platform can and can't do, with the date checked and the source. Constraints are where bets meet reality, and the generator uses these pages to write each project's *Here:* lines.

`platforms/hospitable.md` comes from CONVERSION-PLAN §11 (researched 19 Nov 2026, Mogul plan):
- **The booking widget:**
  - one property per widget, as an iframe;
  - it reads checkin, checkout, guests, locale, source, theme and utm_* from the parent page's URL;
  - it drops gclid, fbclid and `_gl`;
  - checkout ends on `booking.hospitable.com`, with no redirect back.
- **Extras, cancellation and messages:**
  - custom upsells, sold during booking or later in the Guest Portal;
  - custom cancellation policies, with guests able to cancel themselves;
  - automated "New reservation" messages.
- **Discounts and payments:**
  - promo codes are single-use and fixed-amount, and apply to the nightly rate only;
  - there's no Klarna;
  - Direct Premium uses Adyen.
- **Tracking and API:**
  - its Meta Pixel sends Page View only;
  - its own GA4/GTM fires a `purchase` event;
  - the API's quote endpoint returns a `booking_url`, but there's no endpoint for creating reservations.
