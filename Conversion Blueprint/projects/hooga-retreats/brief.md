# Project brief: Hooga Retreats

| | |
|---|---|
| Slug | `hooga-retreats` |
| Last updated | 2026-11-20, by a Marketing Beast session (T4), from `sources/hooga/` and the V3 facts files. Not yet reviewed by Pete. |
| Modules | `booked-experience` |

Facts live in the Hooga repo, not here: `apps/Hooga Website/couples-site-v3/src/content/`. They're in `retreats.js` (retreats, proof, travel), `pricing.js` (prices, extras, vouchers, policies), `reviews.js`, `landings.js` and `hospitable.js`. This brief points to them rather than copying them.

## 1. The business

Hooga Retreats is an independent experiential accommodation brand in and around Canterbury, Kent, run by Peter and Natalie. It has three individually designed retreats (a showman's carriage, a yurt and a converted double-decker bus), where the stay itself is the experience: "a night away that feels like an adventure, and becomes a memory" (Hooga brief §1).

## 2. What's sold

| Product | Price | Notes |
|---|---|---|
| Stays at The Showman's Carriage (sleeps 2), The Little Yurt Retreat (sleeps 4) and The Midnight Express (sleeps 6) | The site says "from £240 a night" (`pricing.js` `NIGHTLY_FROM`, V1's base rate) | Live nightly rates are set in Hospitable. **Unknown: ask Pete** whether £240 is the lowest bookable rate at every retreat. |
| Extras: Celebration package, Slow Stay, early arrival, late departure, bus hot tub, yurt pool and sauna | `pricing.js` `EXTRAS` (V1 prices, confirmed by Pete 19 Nov) | The live Airbnb listings show different extras prices; to be aligned (CONVERSION-PLAN §9 Q4). |
| Gift vouchers: The One-Night Escape and The Two-Night Adventure | `pricing.js` `VOUCHERS`: one or two nights at £240 | 12 months' validity (to confirm). Not purchasable yet: the voucher checkout is Phase 3. |

## 3. Who buys, why and when

- **Main buyer:** couples aged about 25–45, living within about 90 minutes' travel of Canterbury (Kent, reachable parts of London and the South East).
- **Triggers and occasions:**
  - birthdays, anniversaries and other occasions;
  - surprises for a partner;
  - a night away from children and work;
  - reconnecting;
  - an unusual experience;
  - an experience as a gift.
- **Who makes the decision:** often one partner arranging a surprise or a gift for the other, rather than a joint holiday decision (Hooga brief §3).
- **Secondary audience:** families, especially at the Midnight Express and the yurt. They come in the holidays anyway, so they get an organic route (`/families`) and **no paid ads** (CONVERSION-PLAN §0 round 2).

## 4. Voice and look

- **Magic, not luxury.** Pete: "It's an experience, magic, realising the childlike magic we lost." (CONVERSION-PLAN §5b)
- **Words to use:** secret, hidden, discover, climb the ladder, step aboard, den, firelight, under the stars, ritual, slow evenings, adventure, storybook.
- **Words to avoid:** luxury, premium, exclusive, indulgent, pampering, spa-speak, and "effortless" (the hot tub takes effort, and that's part of the magic). Also avoid "Harry Potter": it's a trademark (LAW-12).
- **One feeling per retreat:** carriage = romance; yurt = enchantment; bus = adventure.
- **Look:** V2's brand (forest green, champagne, serif type, ink-bloom reveals) in `couples-site-v2/src/index.css`. Footage is wide-angle, centre-cropped for mobile; the people in the photos are real guests, edited with AI (LAW-11).
- **Reference:** Pete's own listing write-ups (`couples-site-v1/docs/stays/*.md`) and the three Airbnb listings.

## 5. Channels

- **Paid:**
  - Google Search ads to the intent pages: occasion routes (`/anniversary`, `/birthday`, `/surprise`, `/escape`) and retreat routes (`/carriage`, `/yurt`, `/bus`);
  - Meta and Instagram ads to the story deck (`/s/<occasion>`).
- **Organic:** Google search, Instagram and Facebook; the front door `/` and `/families`.
- **Email:** Hospitable messaging and Gmail only; no email-marketing tool yet.
- **Out of scope:** paid ads aimed at families.

## 6. Platforms

| Job | Platform (and plan) | Known limits | Platform note |
|---|---|---|---|
| Stay booking and checkout | Hospitable Direct (Mogul plan; Direct Premium in the UK) | Drops gclid, no redirect back, no BNPL, promo codes cover nightly rate only, Meta Pixel sends Page View only | `platforms/hospitable.md` |
| Gift voucher checkout | Stripe (planned, Phase 3), ported from V1's Firebase function | Not built yet | None yet: write one when Phase 3 starts |
| Email and messages | Hospitable messaging + Gmail | No marketing list, no CRM | None |
| Analytics and tags | GA4, GTM, Consent Mode v2, Meta Pixel (planned) | Not installed yet | None |
| Hosting | Firebase Hosting, project `hooga-retreats` | Static SPA (no prerendering yet) | None |
| Live chat | Chatwoot | Switched off (no token) | None |

## 7. Economics

The targets in `scorecard.json` are worked out from these numbers. None is filled in yet.

- **Price per sale:** from £240 a night. Two nights is the preferred booking. **Margin per night: Unknown: ask Pete.**
- **Demand already met elsewhere:** Airbnb (and possibly Vrbo and Booking.com) already brings bookings. Weekends sell well already; the priority is Sunday to Thursday (Hooga brief §5). Unknowns, all to ask Pete:
  - **The share of bookings that come through Airbnb, and the fee a direct booking saves.**
  - **Current midweek occupancy.**
- **The most Pete would pay to win one booking: Unknown: ask Pete.**
- **Monthly ad budget: Unknown: ask Pete.**
- **Typical cost per click:** the Google doc says £2–£5+ and the Hooga plan uses £3 as an illustration; neither is sourced. **Unknown until the first campaigns run.**

## 8. House rules

1. **Sell the dream, get the booking, explain the reality straight after** (the video guide in the "New reservation" message), **and make cancelling easy:** no-hassle cancellation within 48 hours of booking.
2. **Magic, not luxury** (§4).
3. **Every fact comes from one file**, with anything unconfirmed kept in its `toConfirm` list (`retreats.js`, `pricing.js`).
4. **No invented reviews.** The samples stay labelled until Pete supplies real reviews and video testimonials.
5. **Families: organic only**, with no paid ads.
6. **V2 stays frozen.** V3 is the rebuild.
7. **Speed comes after the product looks right.** The media speed pass is done before any paid traffic.

## 9. Proof available

From `retreats.js` `BRAND_PROOF`, read from the live Airbnb listings on 19 Nov 2026:
- **Airbnb reviews:** 902, with a weighted rating of 4.9. By listing: carriage 4.87 from 182, yurt 4.93 from 543, bus 4.82 from 177.
- **Accuracy sub-rating:** 4.9 on all three listings.
- **Superhosts** on all three listings.
- **7 years hosting** (Pete).
- **To come:** real reviews and video testimonials for the site, from Pete.
- **Unknown, ask Pete:**
  - **Google reviews:** whether a Business Profile exists, and its review count.
  - **Press.**

## 10. Still unknown

**Economics**
1. Margin per night at each retreat.
2. The share of bookings that come through Airbnb and other marketplaces, and the fee a direct booking saves.
3. Current midweek (Sunday to Thursday) occupancy.
4. The most you'd pay in ads to win one booking, and the profit you want from each.
5. Monthly ad budget.
6. Is £240 the lowest bookable nightly rate at every retreat?
7. Do Hospitable Direct bookings carry a cleaning or service fee? If so, the site's prices must include it (LAW-03).

**Policies**

8. Does the 48-hour cancellation window apply to bookings made the day before arrival?
9. Voucher validity: 12 months?
10. Voucher refunds: will you offer a 14-day cancellation on vouchers? The law is unclear for open-dated vouchers (LAW-15), so take advice or offer it.
11. Is there a written complaints process (CUS-08)?
12. Who sends review requests, and when (CUS-03, CUS-04)?

**Facts on the site**

13. The badges "Most guests choose this" (Slow Stay) and "Most loved" (2 nights) need evidence, such as booking data, or they come off (LAW-06).
14. The exact high-speed train time from St Pancras to Canterbury West: the FAQ says "under an hour" (LAW-07).
15. Is the yurt's "romance package" the same as the Celebration package?
16. Align the extras prices on the Airbnb listings with the site.
17. Does `hello@hoogaretreats.co.uk` exist, or forward to Gmail?

**Set-up**

18. Hospitable widget IDs (one site UUID, three property IDs).
19. The live domain and URL.
20. Does a Google Business Profile exist, and how many reviews does it have?
