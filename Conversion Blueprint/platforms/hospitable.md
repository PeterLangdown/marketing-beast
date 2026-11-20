# Platform: Hospitable Direct

What Hospitable's direct-booking product can and can't do, as it affects selling stays from a site. The generator uses this page to write each project's *Here:* lines. Used by: Hooga Retreats (Mogul plan; Direct Premium is the UK default).

**Sources and dates.** Each line is marked with where it comes from:
- **(tested)** Hooga V3 build, recorded in `sources/hooga/CONVERSION-PLAN-2026-11-20.md` §10–11 (19 Nov 2026). The widget behaviour was confirmed by reading `widget-loader.prod.js` and testing locally.
- **(help centre)** help.hospitable.com, checked 20 Nov 2026 (see `sources/quick-checks-2026-11-20.md`).
- **(plan)** stated in the Hooga plan's §11 research but not re-checked here.

When something here changes, add the date and the source. Don't overwrite the old line: strike it through.

## The booking widget

- One widget per property, embedded as an iframe. (tested)
- It reads `checkin`, `checkout` (YYYY-MM-DD), `adults`, `children`, `infants`, `pets`, `utm_*`, plus locale, source and theme, from the parent page's URL. (tested; plan)
- It **drops `gclid`, `fbclid` and `_gl`.** (tested)
- Checkout finishes on `booking.hospitable.com`, with **no redirect back** to the site. (tested; plan)

## Payments

- Cards, **Apple Pay and Google Pay** on Direct Basic and Premium, but not Lite. Direct Premium is on by default in the UK. (help centre)
- Hospitable takes the payment (Adyen on Direct Premium). (plan)
- **No buy-now-pay-later provider is documented** (no Klarna, Clearpay or Afterpay). Treat it as unsupported until Hospitable confirms. (help centre)
- Hosts can set payment terms so guests pay in full or in instalments. (help centre)

## Extras (custom upsells)

- Flat or per-night upsells. An upsell can be bought during the booking only if its "during booking" setting is on. (help centre)
- Upsells that need host approval are sold only through the Guest Portal, not during checkout. (help centre)
- Each upsell is its own toggle, so you can't present "one order bump". (plan)

## Cancellation

- Custom policies, including a free window (for example, "within 48 hours of booking"). The policy is **fixed when the booking is made**. (help centre)
- Guests can cancel a direct booking themselves in the Guest Portal, after **two-factor authentication**. (help centre)
- Whether Hospitable's checkout tells buyers that the statutory 14-day right doesn't apply to dated stays (LAW-14): **not checked**.

## Messages

- An automated "New reservation" message can send straight away, with links (for example, Pete's video guides and the Guest Portal). (plan)

## Discounts and gift vouchers

- Promo codes can be a percentage or a fixed amount. They apply to the **nightly rate only, not fees**, and have a total-redemptions cap that can be set to 1. Codes must match the property's currency and can be entered only at checkout. Not available on Direct Lite. (help centre)
- No gift cards, and a code can't keep a leftover balance. (plan)
- So vouchers are sold off-platform (Hooga's own Stripe checkout) and redeemed as a code, priced in nights.

## Tracking

- GA4 and GTM can be added to Direct. Hospitable fires View Item, Add to Cart, Begin Checkout, Add Payment Info and **Purchase**, with value, currency, property, dates and guests. **`transaction_id` isn't mentioned**, so deduplication is unconfirmed (TRK-04). (help centre)
- The Meta Pixel sends **Page View only**: there's no Meta purchase event from Hospitable. (help centre)
- Cross-domain measurement has to be set up by adding `booking.hospitable.com`, or bookings may show as "Direct" traffic. (help centre) But the widget drops `_gl` (tested), so cross-domain linking may not survive the iframe. **Test it.**
- Whether Hospitable stores a forwarded `source` parameter on the reservation, which would allow matching bookings back to ad clicks: **untested** (TRK-08).

## API

- The API reads calendars and prices. Its `quote` endpoint returns a `booking_url`, but there's **no endpoint to create reservations**. (plan)
- Keep the API token on a server.

## What this means for the rules

| Rule | Effect |
|---|---|
| TRK-02 | Gap. UTM tags survive but `gclid` doesn't. Workaround: CONVERSION-PLAN §11 (UTMs on every ad, optimise on site events, test `source` for offline matching). |
| TRK-04, TRK-06 | Use the same GA4/GTM IDs in Hospitable. Check whether its purchase event carries a unique transaction ID. |
| TRK-09, TRK-10 | Hooga never sees stay-checkout personal data, and Hospitable's Meta Pixel sends only Page View. Enhanced conversions and CAPI apply only to Hooga's own voucher checkout. |
| ADS-02 | Google can't see stay purchases against a click. Optimise on `booking_handoff` and voucher purchases. |
| SAL-03 | "One upgrade" applies only to the voucher checkout. |
| SAL-07 | Apple Pay and Google Pay are already handled for stays. |
| SAL-08 | No BNPL for stays. Instalment terms are possible. |
| SAL-06, LAW-15 | Price vouchers in nights. Codes don't cover fees. |
| CUS-01, LAW-13 | Set the 48-hour policy in Hospitable to match the site. Guest self-cancel needs two-factor authentication. |
| LAW-14 | Check whether Hospitable's checkout states there's no statutory right to cancel. |
| LAW-03 | Check whether Direct bookings add cleaning or service fees; if they do, the site's prices must include them. |
