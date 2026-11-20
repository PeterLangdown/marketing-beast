# Module: booked experience

Stays and experiences sold for a date: Hooga Retreats first. This page says what's different about selling them. The rules themselves are in `ledger.json`: those with scope `booked-experience`, plus all `core` rules.

Written 20 Nov 2026 from the Hooga sources (`sources/hooga/`). It will change as launches report back.

## Dates and live availability

- The buyer has to pick a date that's actually free, so the date picker and live availability belong to the booking platform. The site's job is to get the buyer there with their choices intact (FUN-07) and their tracking intact (TRK-02).
- Scarcity messages are only allowed when they come from live availability (LAW-04).
- Never run a separate availability store without a sync to the platform: it double-books against the marketplaces (Hooga plan, Phase 6).

## Seasonality and empty nights

- Demand is uneven. For Hooga, weekends sell themselves and Sunday to Thursday doesn't (Hooga brief §5).
- The value of a sale depends on whether it fills a night that would otherwise stay empty. So ads point at quiet nights (ADS-04), and quiet nights are filled with added value rather than discounts (SAL-09).
- Before-and-after comparisons across seasons are weak evidence. Say so whenever one is made (spec 04).

## Direct bookings that replace marketplace bookings

- A direct booking that would have come through Airbnb anyway is worth only the fee saved, not the whole margin. The project's targets must allow for this (PLAN.md §9, spec 02).
- Measuring how many direct bookings are extra is hard. At minimum, compare direct-booking share and total occupancy, not direct bookings alone.

## Gifts and open-date vouchers

- Many occasion buyers can't fix a date (it's a surprise, or childcare isn't sorted), so the gift route gets equal weight to the date route (FUN-04).
- Sell named experiences priced in nights (SAL-06).
- The booking platform may limit how a voucher is redeemed. Hospitable codes cover the nightly rate only (`platforms/hospitable.md`).
- Voucher terms must be clear before purchase. Whether the 14-day cancellation right applies to open-dated vouchers is unsettled (LAW-15).

## Occasions

- Buyers come for anniversaries, birthdays, surprises and a night away from the kids.
- Pages and ads are matched to the occasion (FUN-01), and the occasion can tailor the page (FUN-12).
- Occasions repeat, which gives a natural re-invitation date (CUS-05).
- The buyer is often one partner arranging something for the other, which is the reason for the surprise reveal (CUS-06).

## Cancellations and setting expectations

- Dated stays are exempt from the statutory 14-day cancellation right, but the buyer must be told so before paying (LAW-14).
- The business's own free-cancellation window is a bet on removing the fear of saying yes (CUS-01). The site must match the platform's policy exactly (LAW-13).
- Pete's model is "book first, explain after". The full honest picture comes straight after booking (CUS-02), but anything that could change a buyer's mind must be one tap away before they pay (LAW-02).

## Extras

- Extras raise the order value. Bundles can show their saving (SAL-04), and upgrades can be offered after booking as well as during it (SAL-10).
- Only offer what can actually be delivered on those dates (SAL-11). For example, a wood-fired tub can't be "pre-lit".
- No paid extra is ever pre-selected (LAW-05).

## Handing off to a booking platform

- The checkout usually belongs to a platform, which limits what the site controls:
  - tracking (click IDs may be dropped);
  - payment options;
  - the number of upsells;
  - what happens after payment, since there may be no redirect back.
- Each platform's limits are in `platforms/*.md`, and they become the *Here:* lines and the gaps in a project's requirements list.
- Where the site can't control the checkout, it still owns:
  - the promise;
  - the facts;
  - the hand-off;
  - the honesty of what is said before it.
