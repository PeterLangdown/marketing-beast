# Quick checks, 20 Nov 2026

What the T2 seeding checked against primary sources, and what came back. Spec 03 allows "quick checks of the law and platform documentation" only, so this isn't a research review.

**How the checks were done.** Each page was fetched on 20 Nov 2026 by AI sub-sessions working from Marketing Beast, and the relevant passage was quoted. Where a page could be read only through the fetch tool's extract rather than the raw page, the table says so. The URLs are in each rule's `evidence.sources` in `ledger.json`.

**Frozen.** Like everything in `sources/`, this record is a dated snapshot: don't edit it. Re-check anything that matters before relying on it after this date.

## UK law and regulators

| Claim checked | Result | Source | Used in |
|---|---|---|---|
| DMCC Act 2024 Part 4 Ch 1 in force 6 Apr 2025 | Confirmed. Private-redress sections 232, 234 and 235 are still prospective. | SI 2025/272 reg 2 | LAW-01, LAW-04 |
| Fake, concealed-incentive and misleadingly published reviews are banned | Confirmed: Sch 20 para 13. Suppressing negative reviews counts. | DMCC Sch 20 | LAW-01, CUS-03 |
| Fake time-limited claims are banned | Confirmed: Sch 20 para 7. The wording is "limited time", not "very limited time". | DMCC Sch 20 | LAW-04 |
| The total price must include mandatory fees | Confirmed: s.230(2)(b) and (4). Misleading omissions are s.227, not s.226 (s.226 is misleading actions). Unclear or untimely information counts as omitted (s.230(9)). | DMCC s.230 | LAW-02, LAW-03, LAW-15 |
| CMA guidance on drip pricing and fake reviews | Confirmed: CMA207 (updated 18 Nov 2025) says drip pricing is prohibited. CMA208 says don't suppress negative reviews, and publishers should have published policies prohibiting fake ones. | gov.uk | LAW-02, LAW-03, CUS-03 |
| CMA fines in the RGC summary ("£4.2m", "£4.8m") | Confirmed and identified:<br>• the AA and BSM, £4.2m, 15 Apr 2026, for a £3 fee added during booking;<br>• Wayfair, £4.8m, 14 Oct 2026, for false flash deals.<br>The same release fined Appliances Direct £1.2m (false countdowns, pre-selected paid extras) and Gold's Gym £45k (a joining fee left out of the membership price). | CMA press releases | LAW-03, LAW-04, LAW-05 |
| Subscription contract rules in force? | **No.** Part 4 Ch 2 is prospective. The government says January 2027, and draft regulations name 1 Jan 2027. | gov.uk, legislation.gov.uk | LAW-17 |
| PECR cookies and the Data (Use and Access) Act 2025 | Confirmed. Schedule A1 has been in force since 5 Feb 2026. Its statistical-purposes exception (para 5) needs a sole purpose, clear information and a simple, free way to object. It doesn't cover advertising (ICO). | legislation.gov.uk, ICO | LAW-08 |
| PECR reg 22 email and SMS marketing | Confirmed: consent, or the soft opt-in for a business's own customers. The DUAA extended the soft opt-in to charities only. | legislation.gov.uk | LAW-10 |
| Consumer Contracts Regs: dated stays exempt from the 14-day right | Confirmed, but it's reg 28(1)(h), not (1)(b). The information duties still apply, including telling the buyer there's no right to cancel (Sch 2 para (o)). | legislation.gov.uk | LAW-14 |
| Do open-dated gift vouchers carry the 14-day right? | **Not clear.** The regulations and the BIS guidance don't mention vouchers. The exemption rests on reserved capacity, which an open voucher lacks; that's an inference, not a ruling. | BIS guidance Q9 | LAW-15 |
| Reg 40: no pre-ticked paid extras | Confirmed. | legislation.gov.uk | LAW-05 |
| UK GDPR Art 13 and Art 9 | Confirmed:<br>• Art 13 was amended in 2026: a right to complain to the controller from 19 Jun 2026.<br>• ICO: inferences count as special category data only where you intend them or act on them. | legislation.gov.uk, ICO | LAW-09, LAW-16 |
| CAP Code | Confirmed:<br>• 3.1 (mislead), 3.3 (omission), 3.7 (substantiation), 3.18 (non-optional fees in prices), 3.30 (false limited-time claims);<br>• 3.44–3.50 (reviews and testimonials; 3.47 = hold evidence that a testimonial is genuine).<br>There's no Code rule on images. CAP News (2025) says edited images mustn't exaggerate, and disclaimers rarely cure it (read through the fetch extract). | asa.org.uk | LAW-01, LAW-03, LAW-04, LAW-06, LAW-07, LAW-11, SAL-11, CUS-03 |

## Platforms and web standards

| Claim checked | Result | Source | Used in |
|---|---|---|---|
| Core Web Vitals "good" thresholds | Confirmed: LCP 2.5 s, INP 200 ms, CLS 0.1, at the 75th percentile. | web.dev | UI-02 |
| Quality Score components | Confirmed: expected CTR, ad relevance, landing page experience (Search only). | Google Ads Help | FUN-01 |
| Consent requirement covers the UK | Confirmed: the policy names the EEA, the UK and Switzerland. Google doesn't literally say "must use consent mode v2"; consent mode is the documented mechanism. | Google | TRK-05, TRK-09 |
| GA4 deduplicates purchases by transaction ID | Partly. It works per user with no stated window, and an empty ID collapses every purchase. | Google Analytics Help | TRK-04 |
| gclid needed for conversion tracking; gbraid/wbraid | Confirmed. | Google Ads Help | TRK-02, ADS-01, ADS-03 |
| No review stars for a business's own reviews | Confirmed. This includes embedded third-party widgets. | Google Search Central | SEO-04 |
| No incentives and no selective asking for Google reviews | Confirmed. | Google Maps policy | CUS-03 |
| Trademarks in ads | Partly. Google restricts on complaint, for the advertiser named; keywords aren't restricted. | Google Ads policy | LAW-12 |
| Meta Pixel and CAPI deduplication | Confirmed: event name plus event ID, within 48 hours. Read through the fetch extract. | Meta for Developers | TRK-10 |
| Smart Bidding needs conversions | Confirmed. Target ROAS on Search needs 15 conversions in 30 days. | Google Ads Help | ADS-02 |
| Offline conversion imports by GCLID | Confirmed, with 2026 changes: new adopters are pointed to enhanced conversions for leads, and uploads have gone through the Data Manager API since 15 Jun 2026. | Google Ads Help | TRK-08 |
| Unique titles and meta descriptions; prerendering | Confirmed: Google says "server-side or pre-rendering is still a great idea… not all bots can run JavaScript". | Google Search Central | SEO-01, SEO-03 |
| Reviews help local ranking | Confirmed: "More reviews and positive ratings can help your business's local ranking". | Business Profile Help | SEO-06 |
| Open Graph required tags | Confirmed by ogp.me. Whether Meta's crawler runs JavaScript **couldn't be verified**. | ogp.me, Meta | SEO-02 |
| WCAG 2.2: 1.4.4, 2.2.2, 2.5.8; zoom-blocking viewports | Confirmed. Zoom-blocking fails W3C's ACT rule b4f0c3, which notes that most modern mobile browsers ignore those settings anyway. | w3.org | UI-01, UI-05, UI-06 |
| Hospitable Direct | All from the help centre:<br>• **Apple Pay and Google Pay: yes** on Basic and Premium (Premium is the UK default).<br>• **Klarna and other BNPL: not documented**, but hosts can set instalment terms.<br>• **Promo codes:** a percentage or a fixed amount, nightly rate only, with a total-redemptions cap rather than strictly single-use.<br>• **Cancellation:** custom policies with a free window, fixed at booking. Guests can self-cancel in the Guest Portal, behind two-factor authentication.<br>• **Upsells:** can be sold during checkout; ones needing host approval only through the Guest Portal.<br>• **Analytics:** GA/GTM purchase events with no transaction_id mentioned; the Meta Pixel sends Page View only; cross-domain tracking is a manual setup. | help.hospitable.com | SAL-06, SAL-07, SAL-08, CUS-01, LAW-13, LAW-15, TRK-04, TRK-06, TRK-10 |
