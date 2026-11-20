# Conversion requirements: Hooga Retreats

*Generated from `Conversion Blueprint/ledger.json` (ledger updated 2026-11-20) on 2026-11-20. Project: `hooga-retreats` · modules: booked-experience · stage: building.*

**Don't hand-edit this file.** Statuses live in `scorecard.json`; rules live in the ledger. Ask a Marketing Beast session to regenerate. Rules marked **(proposed)** haven't been confirmed by Pete yet.

## Where things stand

- **Launch gate** (standards and don'ts, 46 rules): 8 pass · 16 fail · 1 gap · 20 not checked · 1 n/a.
- **Bets** (38): 13 in place, 25 not yet built or not checked.
- **Blocking launch** (launch needs every standard and don't to be pass, n/a, or a gap Pete has accepted):
  - failing or an open gap: LAW-01, LAW-06, LAW-07, LAW-09, LAW-15, TRK-01, TRK-02, TRK-03, TRK-05, FUN-10, UI-02, UI-05, UI-08, SEO-01, SEO-02, SEO-03, SEO-05;
  - not checked yet: LAW-02, LAW-03, LAW-05, LAW-08, LAW-10, LAW-11, LAW-13, LAW-14, TRK-04, TRK-06, TRK-09, TRK-11, FUN-01, UI-04, SAL-11, CUS-03, ADS-01, ADS-02, ADS-03, ADS-05.
- **Open questions for Pete:** see `brief.md` §10.

Boxes: `[x]` pass · `[ ]` not checked yet · `[!]` fail · `[~]` gap · `[-]` n/a. For a bet, `[x]` means it is in place on the site, ready to be measured.

## 1. Standards: must pass before launch

### LAW: Trust and law

- [!] **LAW-01** · standard · Strong (proposed)
  No invented reviews or testimonials are shown as real. Placeholder reviews are clearly labelled, and all are replaced with genuine ones before launch.
  *Check:* List every review and testimonial on the site. Each traces to a real source (platform, date, first name) held on file, and nothing labelled as a sample remains at launch.
  *Here:* All 10 reviews in couples-site-v3/src/content/reviews.js are placeholder: true. ReviewWall.jsx labels each "Sample review", so none is shown as real, but every one must be replaced with a genuine review before launch. (checked 2026-11-20, ai)

- [ ] **LAW-02** · standard · Strong (proposed)
  Everything a buyer needs to decide (the all-in price, what's included, cancellation terms and key limits) is on the page or one tap away before they pay.
  *Check:* For each product, list the facts that could change a buyer's mind (from the brief's house rules and the facts file's limits). Each is visible, or one tap away, before the payment step.
  *Here:* In place in the code: a "Good to know before you book" panel per retreat, one tap away (StayDetails.jsx, from retreats.js goodToKnow), covering self-heated tubs, bus ceiling heights, city and wedding-venue sounds and the unheated wagon. The 48-hour line sits beside every button. Can't pass until the all-in price is settled (LAW-03).

- [ ] **LAW-03** · standard · Strong (proposed)
  Every price shown includes all mandatory fees and charges; nothing compulsory is added later in the purchase.
  *Check:* Take a test purchase to the final payment screen. The total equals the price first shown for those choices, and no compulsory fee appears along the way.
  *Here:* The site shows "From £240 a night" (pricing.js NIGHTLY_FROM, V1's base rate). Unknown whether Hospitable Direct adds a cleaning or service fee (brief §10 Q7); if it does, every "from" price must include it. Also confirm £240 is the lowest bookable rate (brief §10 Q6).

- [!] **LAW-07** · standard · Strong (proposed)
  Every factual claim on the site (ratings, review counts, years trading, travel times, features) comes from one facts file that records its source, and nothing unconfirmed is shown as fact at launch.
  *Check:* Pick ten facts at random from the live pages; each appears in the facts file with a source. The file's 'to confirm' list is empty, or those items aren't on the site.
  *Here:* retreats.js and pricing.js record sources and keep toConfirm lists, but the FAQ shows the unconfirmed train time ("under an hour on the high-speed train from London St Pancras", TRAVEL.toConfirm) in LandingFaq.jsx. The /gift page's "Any Amount: From £100" voucher lives in data/siteStructureData.js, not pricing.js. (checked 2026-11-20, ai)

- [ ] **LAW-08** · standard · Strong (proposed)
  Advertising tags and cookies run only after the visitor consents. Analytics may run without consent only where the PECR statistical-purposes exception fully applies: clear information and a simple, free way to object.
  *Check:* In a fresh private window, open a landing page and ignore the banner: the browser's developer tools show no advertising cookies and no ad pixels firing. Reject and check again. If analytics runs before consent, the privacy notice explains it and offers a one-click objection.
  *Here:* Nothing to check yet: no tags and no consent tool are installed (index.html). attribution.js already holds click IDs in memory until setAdConsent(true) is called.

- [!] **LAW-09** · standard · Strong (proposed)
  Wherever the site collects personal details (forms, sign-ups, checkouts you run), the privacy information is shown or linked right there, without leaving the page.
  *Check:* At every form and checkout you run, a privacy link opens in place, and the notice covers who you are, why you collect the data, the lawful basis, and how to complain (to you and to the regulator).
  *Here:* ContactView.jsx has a form with no privacy information, and the gift button currently ends there (FUN-10). The paid landing pages have no forms. The privacy and terms panels are still to build (LandingChrome.jsx comment; CONVERSION-PLAN §10 launch checklist). (checked 2026-11-20, ai)

- [ ] **LAW-10** · standard · Strong (proposed)
  Marketing emails and texts go only to people who opted in, or to customers under the soft opt-in, and every message has a simple way to opt out.
  *Check:* Look at each sign-up and checkout: marketing consent is a separate, unticked choice (or the soft opt-in conditions are met and an opt-out is offered there). Every marketing message sent has a working unsubscribe link.
  *Here:* No marketing sign-up exists yet. Latent issue: HoogaInquiryModal.jsx pre-ticks its "stay availability updates" consent box (useState(true)). V3 never opens that modal, but untick it if it is ever reused.

- [ ] **LAW-11** · standard · Moderate (proposed)
  Photos and video show the product as it really is; any editing (including AI editing) changes nothing a buyer would rely on.
  *Check:* Compare each image and clip on the site with the real product and the facts file: features, size, setting and condition match.
  *Here:* The hero posters and videos are footage of the real retreats; per CONVERSION-PLAN §0 the guests are AI-edited. Not compared image by image with the retreats.

- [ ] **LAW-13** · standard · Moderate (proposed)
  The cancellation terms on the site match the policy actually set in the booking platform: same window, same refunds, same exceptions.
  *Check:* Read the cancellation wording on the site and the policy in the booking platform side by side; they agree on window, refunds and exceptions.
  *Here:* The site says "No-hassle cancellation within 48 hours of booking" (pricing.js POLICIES.cancelLine, plus "No questions asked" in ConversionFork.jsx). The policy isn't set in Hospitable yet (Pete's Hospitable to-do 3).

- [ ] **LAW-14** · standard · Strong (proposed)
  Before a dated booking is paid for, tell the buyer that the statutory 14-day cancellation right doesn't apply, and show the business's own cancellation policy instead.
  *Check:* On the booking path, before payment, the site or the platform's checkout says there is no statutory right to cancel and shows the business's own policy.
  *Here:* V3 doesn't say that the statutory 14-day right doesn't apply to dated stays. Whether Hospitable's checkout says it hasn't been checked. If it doesn't, add a line before the hand-off.

- [!] **LAW-15** · standard · Moderate (proposed)
  Before a gift voucher is bought, show what it buys, how long it lasts, how it's redeemed, what it doesn't cover, and the cancellation and refund terms.
  *Check:* Read the voucher page as a buyer: validity, contents, redemption steps, exclusions (for example, fees not covered) and refund terms are all there before payment.
  *Here:* Before purchase the site states only validity (12 months) and "they choose the retreat and the date" (ConversionFork.jsx, LandingFaq.jsx). Missing: how a voucher is redeemed, what it doesn't cover (Hospitable codes don't cover fees), and refund terms. Vouchers can't be bought yet either (FUN-10). (checked 2026-11-20, ai)

### TRK: Tracking

- [!] **TRK-01** · standard · Moderate (proposed)
  Before any ad spend, analytics and a tag manager are installed and the named funnel events fire: landing view, path chosen, hand-off or checkout started, and purchase.
  *Check:* Open GA4 DebugView (or the tag manager's preview), walk the funnel once, and confirm each named event arrives with its parameters.
  *Here:* No GTM, GA4 or Meta Pixel in index.html. analytics.js already pushes named events to window.dataLayer (occasion_landing_view, fork_view, select_retreat, select_conversion_path, booking_handoff), so installing the container is the missing step. (checked 2026-11-20, ai)

- [~] **TRK-02** · standard · Moderate (proposed)
  Ad click IDs and UTM tags survive from the landing page to the payment step, or the gap is written down with a workaround.
  *Check:* Open /<landing>?gclid=TEST123&gbraid=TEST&utm_source=test, click through to payment, and confirm each is present at every step. tools/hooga-attribution-flow.mjs does this for Hooga.
  *Here:* attribution.js carries gclid, gbraid, wbraid, fbclid, msclkid and utm_* onto /booking and /gift; the Hooga session tested /anniversary?gclid=TEST123 → /booking?gclid=TEST123&… (CONVERSION-PLAN §10). Hospitable's widget keeps utm_* but drops gclid, fbclid and _gl, and checkout ends on booking.hospitable.com. Workaround: CONVERSION-PLAN §11 (UTMs on every ad, optimise on booking_handoff, test the source parameter: TRK-08). Re-run on 20 Nov with tools/hooga-attribution-flow.mjs on a production build of b24f110: gclid and the UTMs reached /booking and /gift, and all four dataLayer events (occasion_landing_view, fork_view, select_conversion_path, booking_handoff) carried the gclid. The site's side works; the gap is Hospitable's alone. Gap accepted by Pete: no. (checked 2026-11-20, ai)

- [!] **TRK-03** · standard · Weak (proposed)
  Click IDs and UTM tags are kept for return visits in a first-party cookie, set only after consent.
  *Check:* With consent given, land with ?gclid=TEST123, close the tab, return the next day with no parameters, and confirm the hand-off URL still carries the click ID.
  *Here:* attribution.js writes a 90-day first-party cookie once setAdConsent(true) is called, but nothing calls it (no consent tool), so return visits aren't credited yet. (checked 2026-11-20, ai)

- [ ] **TRK-04** · standard · Moderate (proposed)
  Each sale sends exactly one purchase event with a unique transaction ID, its value and its currency; reloading the confirmation page sends nothing more.
  *Check:* Make a test purchase, reload the confirmation page twice, and confirm a single purchase in GA4 DebugView with a unique, non-empty transaction ID and the right value and currency.
  *Here:* No purchase events exist yet. Stays: Hospitable's own GA4 purchase event (transaction_id not documented). Vouchers: the checkout isn't built (Phase 3: "make sure the purchase event fires only once per transaction").

- [!] **TRK-05** · standard · Moderate (proposed)
  Google tags run in consent mode, with ad_storage, ad_user_data and ad_personalization denied until the visitor consents and updated when they choose.
  *Check:* In Tag Assistant, load a page and reject: the ad signals show as denied. Repeat and accept: they update to granted.
  *Here:* No consent mode: neither GTM nor a consent tool is installed (index.html). (checked 2026-11-20, ai)

- [ ] **TRK-06** · standard · Moderate (proposed)
  Where the booking or checkout platform allows its own analytics, use the same GA4 and tag manager IDs there as on the site, with cross-domain measurement set up.
  *Check:* In the booking platform's analytics settings, the IDs match the site's; a test booking appears in the same GA4 property with its campaign.
  *Here:* Hospitable's analytics settings aren't configured, and the widget IDs aren't in hospitable.js yet.

- [-] **TRK-07** · standard · Weak (proposed)
  Before an A/B test starts, write down the baseline rate, the smallest lift worth detecting and the visitors needed per version; run only tests the project's traffic can finish, one at a time per page.
  *Check:* Each test in the project's plan has those three numbers and an expected end date based on current traffic.
  *Here:* No A/B tests are planned for launch. This applies to the Phase 7 experiments (CONVERSION-PLAN §6), whose test list doesn't yet give sample sizes. (checked 2026-11-20, ai)

- [ ] **TRK-09** · standard · Moderate (proposed)
  Send hashed customer details to ad platforms (enhanced conversions, Meta Conversions API) only from checkouts you run, and only for buyers who consented.
  *Check:* List every place customer data is sent to an ad platform. Each is a checkout the project owns, and the code checks consent first.
  *Here:* Applies only to Hooga's own voucher checkout (Hooga never sees stay-checkout personal data), which isn't built yet.

- [ ] **TRK-11** · standard · Weak (proposed)
  Before launch, make one real low-value purchase on each checkout (for example, £1) and confirm the whole chain: confirmation page, emails, a single purchase event with the right value, and attribution.
  *Check:* Record the test: date, checkout, amount, and screenshots of the event in GA4 and in each ad platform.
  *Here:* No checkout is live yet. Run once the Hospitable widget IDs and the voucher checkout are in.

- [x] **TRK-12** · standard · Weak (proposed)
  Use one documented set of event names and parameters across every project, extended but never renamed.
  *Check:* The project's events match the Hooga plan's set (Google doc §7 events plus CONVERSION-PLAN §7 additions) or a documented extension of it.
  *Here:* V3's events follow CONVERSION-PLAN §7 (analytics.js header comment), which is the schema later projects extend. (checked 2026-11-20, ai)

### FUN: Funnel

- [ ] **FUN-01** · standard · Moderate (proposed)
  Every paid ad lands on a page whose headline matches the ad's promise.
  *Check:* List every live ad group with its final URL. Open each on a phone and confirm the main headline names the same occasion, product or feature the ad promised.
  *Here:* One landing page per occasion and per retreat, each with its own H1 (landings.js). No ads are written yet, so ad-to-headline match can't be checked.

- [!] **FUN-10** · standard · Moderate (proposed)
  Every button on a sales page leads to a step that can complete the purchase; none ends in a contact form or a broken results page.
  *Check:* Click every button and link on each sales page and follow it to the end. Each must reach a working checkout or a deliberate, clearly labelled alternative.
  *Here:* The gift path is a dead end: the fork's "Give this gift" goes to /gift (GiftView.jsx), whose "Purchase gift voucher" button goes to /contact?subject=gift-voucher. The /gift page also brings back the site header and footer. Fixed by the Phase 3 voucher checkout. (checked 2026-11-20, ai)

### UI: Page and speed

- [x] **UI-01** · standard · Moderate (proposed)
  Pinch-zoom is never disabled: no user-scalable=no, and no maximum-scale below 2, in the viewport tag.
  *Check:* Read the page's meta viewport tag, then pinch-zoom on a phone.
  *Here:* index.html's viewport tag is "width=device-width, initial-scale=1.0, viewport-fit=cover": no user-scalable=no and no maximum-scale. V2's zoom block is gone. Not tried on a phone. (checked 2026-11-20, ai)

- [!] **UI-02** · standard · Moderate (proposed)
  Mobile pages meet Google's 'good' Core Web Vitals at the 75th percentile: LCP ≤ 2.5 s, INP ≤ 200 ms and CLS ≤ 0.1.
  *Check:* Use field data (Search Console, or PageSpeed Insights' Chrome UX Report) once the site has enough traffic. Before launch, record Lighthouse mobile runs as a stand-in.
  *Here:* Lab stand-in, not field data: Lighthouse 12.2.1 mobile (simulated slow 4G), median of 3 runs, on a production build of b24f110 served locally with gzip. LCP: /anniversary 9.9 s, /yurt 9.2 s, / 54.9 s, /s/anniversary 155 s (good is 2.5 s or less). CLS 0 and blocking time 0 ms on all four, so the layout and the JavaScript are fine; the weight is the problem. First paint takes 6.3–7.1 s: the fonts are about 1 MB of TTF files (Montserrat-Variable.ttf alone is 673 KB), and none of the @font-face rules in index.css sets font-display. The story deck /s/<occasion> (where the Meta ads will point) downloaded about 117–120 MB: funnelConfig.js uses the original 5.9–9.7 MB PNG and JPEG photos rather than the optimised WebP copies, and its four videos download in full. / uses the 9.7 MB carriage-hot-tub.jpeg (FunnelEntryView.jsx) as well as its 15.5 MB background video. Expected: Pete deferred the speed pass until the product looks right, and it must be done before any paid traffic (CONVERSION-PLAN §0). Re-check with field data once there's traffic. (checked 2026-11-20, ai)

- [ ] **UI-04** · standard · Weak (proposed)
  Before launch, test every paid landing page on a real phone over mobile data, not only on a desktop or over Wi-Fi.
  *Check:* Load each paid route on a real phone with Wi-Fi off. Note the load time, and check the video plays, the buttons and sticky bar work, and nothing jumps.
  *Here:* Not done yet.

- [!] **UI-05** · standard · Moderate (proposed)
  Video that starts automatically, lasts more than five seconds and plays alongside other content has a visible way to pause or stop it.
  *Check:* On each page with autoplay video, find a pause control, and check it works by keyboard and touch.
  *Here:* The hero video autoplays and loops with no pause control (LandingHero.jsx), and so does the background video on / (FunnelEntryView.jsx). The landing hero does skip video when reduced motion or Save-Data is requested. (checked 2026-11-20, ai)

- [x] **UI-06** · standard · Moderate (proposed)
  Buttons and links are at least 24 by 24 CSS pixels, or spaced so that a 24-pixel circle around each doesn't overlap another.
  *Check:* Measure the tap targets on each sales page in the browser's developer tools at phone width, and note any under 24 px that the WCAG exceptions don't cover.
  *Here:* Measured with tools/tap-targets.mjs at 390×844, on a production build of b24f110: /, the eight landing pages, /s/anniversary, /booking, /gift, /stays, /faq and /contact. Nothing on the landing pages or the story deck is under 24 px, chips and tabs included. The only small targets are the footer links on /gift, /stays, /faq and /contact: 16 px tall, in rows 24 px apart. They pass on WCAG's spacing exception, with no margin to spare. (checked 2026-11-20, ai)

- [!] **UI-08** · standard · Weak (proposed)
  If a third-party booking or payment widget fails to load, the page shows a working alternative (another way to book, or contact details), not an empty box.
  *Check:* Block the widget's domain in the browser's developer tools and reload: the fallback appears.
  *Here:* HospitableBookingWidget.jsx has no error or timeout handling: if Hospitable's loader is blocked, the visitor sees an empty white box. The existing fallback (BookingView.jsx) only covers missing widget IDs, not a failed load. (checked 2026-11-20, ai)

### SAL: Sales

- [ ] **SAL-11** · standard · Moderate (proposed)
  Only offer extras the product actually has and can deliver on the chosen dates; seasonal extras are hidden out of season.
  *Check:* For each product, compare the extras on sale with the facts file and the season. Try a booking for an out-of-season date: seasonal extras don't appear.
  *Here:* Extras are filtered by retreat (pricing.js extrasFor), and the yurt's pool and sauna is labelled May–September but still listed all year. Extras are sold through Hospitable after booking, which isn't set up yet.

### CUS: Customer

- [ ] **CUS-03** · standard · Strong (proposed)
  Ask every customer for a review in the same way, never only the happy ones; don't hide or bury negative reviews; and don't offer anything in return for a review.
  *Check:* Read the review-request process: who is asked, when and with what words. Everyone is asked and nothing is offered. Compare the reviews on the site with the full set on the source platforms: none is hidden for being negative. A short review policy is published.
  *Here:* No review-request process yet. The site shows only labelled sample reviews (LAW-01).

### ADS: Paid traffic

- [ ] **ADS-01** · standard · Moderate (proposed)
  Every ad's final URL carries UTM tags (source, medium and campaign), with Google Ads auto-tagging also on.
  *Check:* Export every ad's final URL: each has utm_source, utm_medium and utm_campaign. Auto-tagging is on in the Google Ads account settings.
  *Here:* No ads yet.

- [ ] **ADS-02** · standard · Moderate (proposed)
  Each ad platform optimises on a conversion it can actually see. Where the real purchase is invisible to it, use the nearest reliable event (such as the booking hand-off) and record the gap.
  *Check:* In each ad account, list the primary conversion actions; each fires from a page the platform can see, with test data showing it arriving.
  *Here:* No ad accounts set up yet. Plan: optimise Google on booking_handoff and voucher purchases, and Meta on landing-page events (CONVERSION-PLAN §11).

- [ ] **ADS-03** · standard · Moderate (proposed)
  Paid traffic starts only after TRK-01, TRK-02, TRK-04, TRK-05 and LAW-08 pass, or Pete has accepted their gaps in writing.
  *Check:* The project's scorecard shows each of those rules as pass, n/a or an accepted gap before the first ad's start date.
  *Here:* No ads running. TRK-01, TRK-05 and LAW-08 aren't met yet, and TRK-02 is an unaccepted gap, so ads must not start.

- [ ] **ADS-05** · standard · Weak (proposed)
  Before any ad spend, the project's scorecard states the most it will pay for one sale, worked out from its own margin and from whether those sales are extra.
  *Check:* The scorecard's targets include the most a sale can cost, with the working shown, dated before the first ad went live.
  *Here:* Waiting on the economics (brief §7 and §10 Q1–Q5). See Targets.

### SEO: Google search (organic)

- [!] **SEO-01** · standard · Moderate (proposed)
  Every page has its own descriptive title and its own meta description.
  *Check:* Crawl the site (or list the routes) and confirm no two pages share a title or a description.
  *Here:* The landing routes get distinct titles and descriptions, but only after JavaScript runs (IntentLandingPage.jsx). Every other route (/, /stays, /gift, /faq, /contact and the rest) shares index.html's single title and description. (checked 2026-11-20, ai)

- [!] **SEO-02** · standard · Moderate (proposed)
  Every page has Open Graph tags (title, type, image, URL and a description) so links shared in WhatsApp, Instagram DMs and Facebook show a proper preview.
  *Check:* Paste each route into Meta's Sharing Debugger and into a WhatsApp chat: the right title, image and description appear.
  *Here:* No Open Graph tags anywhere (index.html, src). (checked 2026-11-20, ai)

- [!] **SEO-03** · standard · Moderate (proposed)
  Key pages serve their content and meta tags in the initial HTML (prerendered or server-rendered), not only after JavaScript runs.
  *Check:* View the page source of each key route (not the live DOM): the headline, main copy, title, description and Open Graph tags are all there.
  *Here:* A plain Vite single-page app (package.json: vite build), with no prerendering. Content and meta tags exist only after JavaScript runs. CONVERSION-PLAN §6 Phase 0 plans vite-react-ssg. (checked 2026-11-20, ai)

- [!] **SEO-05** · standard · Weak (proposed)
  Search Google for the business name and each product name: what shows up (listings, reviews, profiles) is accurate and consistent with the site.
  *Check:* Run the searches in a private window. Note anything wrong, out of date or inconsistent (names, prices, ratings, photos) and list the fixes.
  *Here:* Not searched yet, but one inconsistency is already known: the bus's Airbnb listing shows its location as "Preston, England" (retreats.js bus.toConfirm). (checked 2026-11-20, ai)

## 2. Bets in play

### TRK: Tracking

- [ ] **TRK-08** · bet · Weak (proposed)
  Where the booking platform drops click IDs, match its bookings back to ad clicks (for example, through a hand-off ID in a parameter the platform stores) and upload them to the ad platform as offline conversions.
  *Check:* Make a test booking with a known hand-off ID and confirm the booking platform stores it; then confirm a matched upload appears in the ad platform's conversions.
  *Metric:* Cost per stay booking from Google Ads (down); guardrail: Booking volume.
  *Reading:* baseline not set; no readings yet; read: too early.
  *Here:* Untested: whether Hospitable stores a forwarded source parameter on the reservation (CONVERSION-PLAN §11 step 3).

### FUN: Funnel

- [x] **FUN-02** · bet · Weak (proposed)
  Paid landing pages carry no site navigation or outbound links; privacy and terms open in a panel on the same page.
  *Check:* Open each paid landing route and list every link on it. Only purchase actions, in-page anchors and in-place legal panels should be there.
  *Metric:* Landing → fork rate (select_conversion_path per landing view) on paid routes (up); guardrail: Bounce rate, and questions or complaints about missing information.
  *Reading:* baseline not set; no readings yet; read: too early.
  *Here:* In place: App.jsx hides the header and drawer on every landing path, and LandingChrome.jsx has no links. Privacy and terms panels are still to build (LAW-09). (checked 2026-11-20, ai)

- [x] **FUN-03** · bet · Weak (proposed)
  Send search traffic to a long-scroll intent page and social traffic to a short, skippable story-style page, with both ending in the same checkout.
  *Check:* List the final URL of every live ad: search ads point at intent pages, social ads at story pages, and both kinds reach the same hand-off.
  *Metric:* Hand-offs per 100 paid visits, by channel and page type (up); guardrail: Cost per sale.
  *Reading:* baseline not set; no readings yet; read: too early.
  *Here:* In place: intent pages (/anniversary, /birthday, /surprise, /escape, /carriage, /yurt, /bus) and the story deck (/s/:intent) both reach /booking. The deck is still V2's until Phase 2. (checked 2026-11-20, ai)

- [x] **FUN-04** · bet · Weak (proposed)
  For occasion purchases, give 'book dates' and 'give it as a gift' equal weight everywhere the visitor can act.
  *Check:* On each occasion landing page, both actions appear side by side in the hero, the fork and the sticky bar, at equal size and contrast.
  *Metric:* Gift share of select_conversion_path; total revenue (stays plus vouchers) per 100 visits (up); guardrail: Stay bookings per 100 visits.
  *Reading:* baseline not set; no readings yet; read: too early.
  *Here:* In place: hero buttons, the fork and the sticky bar all offer dates and gift side by side (LandingHero.jsx, ConversionFork.jsx, StickyThumbBar.jsx). Equal size, but the dates button is solid and the gift button outlined, so not quite equal weight. The gift path can't complete yet (FUN-10). (checked 2026-11-20, ai)

- [x] **FUN-05** · bet · Weak (proposed)
  On mobile, the primary action is visible on the first screen without scrolling (both actions, where FUN-04 applies).
  *Check:* Load each landing page at 390 × 844 and confirm the button or buttons are fully visible before any scroll. Capture it with tools/shoot.mjs.
  *Metric:* Hero-button clicks per landing view (up); guardrail: Landing → hand-off rate.
  *Reading:* baseline not set; no readings yet; read: too early.
  *Here:* In place by the code: both hero buttons sit in the first screen (min-h-[100svh] hero with content at the bottom). Not screenshotted. (checked 2026-11-20, ai)

- [x] **FUN-06** · bet · Weak (proposed)
  On mobile, a sticky bottom bar with the primary action appears once the hero buttons scroll out of view.
  *Check:* Scroll a landing page on a phone: the bar appears when the hero buttons leave the screen, doesn't cover content or the consent banner, and causes no layout shift.
  *Metric:* Share of hand-offs started from the sticky bar; landing → hand-off rate (up); guardrail: Layout shift (UI-02) and complaints about covered content.
  *Reading:* baseline not set; no readings yet; read: too early.
  *Here:* In place: StickyThumbBar.jsx appears once the hero buttons leave the screen and hides while the fork is visible. (checked 2026-11-20, ai)

- [ ] **FUN-07** · bet · Weak (proposed)
  Choices the visitor has already made (product, occasion, nights, guests, dates) are carried into the checkout hand-off, so nothing is asked twice.
  *Check:* Pick a product, nights and guests on the landing page, click through, and confirm the checkout opens with them filled in. Note any the platform cannot accept.
  *Metric:* Hand-off → purchase rate (up); guardrail: Wrong-date or wrong-product bookings.
  *Reading:* baseline not set; no readings yet; read: too early.
  *Here:* Partly: the retreat picks the right per-property widget, but nights are only echoed in the heading ("Pick your 2 nights"), and guests and dates aren't asked before the hand-off. The widget IDs aren't set yet.

- [ ] **FUN-08** · bet · Weak (proposed)
  Every screen shows its next action within about a second: intro animations never hold the button back, and story scenes can be skipped.
  *Check:* Screen-record each funnel screen loading on a phone and time it from first paint to the button being tappable. It should be no more than one second.
  *Metric:* Next-step clicks per screen view (up); guardrail: Time on page for visitors who do buy.
  *Reading:* baseline not set; no readings yet; read: too early.
  *Here:* Landing pages: the buttons fade in within 0.3 s (LandingHero.jsx). The story deck (/s/*) is still V2's, which holds buttons back 3.3–4.2 s until Phase 2.

- [ ] **FUN-11** · bet · Weak (proposed)
  Offer visitors who aren't ready to buy one useful, lower-commitment next step that collects an email address (for example, alerts when a midweek night opens up).
  *Check:* Each sales page offers the step and says what will be sent. A test sign-up lands in a list with its marketing consent recorded (LAW-10).
  *Metric:* generate_lead per 100 visits; purchases from the list within 90 days (up); guardrail: Landing → hand-off rate must not fall.
  *Reading:* baseline not set; no readings yet; read: too early.
  *Here:* Not built (no midweek alerts list or guide sign-up; no email tool yet).

- [x] **FUN-12** · bet · Weak (proposed)
  Ask one tap question early (for example, 'What are you celebrating?') and tailor the rest of the page to the answer.
  *Check:* Answer the question each way and confirm the headline, proof and offer change to match, and that the answer reaches the hand-off.
  *Metric:* Landing → hand-off rate for visitors who answer, against untailored pages (up); guardrail: Drop-off at the question itself.
  *Reading:* baseline not set; no readings yet; read: too early.
  *Here:* In place on the organic front door: / offers occasion choices (FunnelEntryView.jsx, ENTRY_CHOICES). Paid routes get the occasion from the ad instead. (checked 2026-11-20, ai)

- [x] **FUN-13** · bet · Weak (proposed)
  List the main reasons buyers hesitate, and answer each on the page before the final buy step (usually as an FAQ).
  *Check:* Compare the page's FAQ with the objections listed in the project brief: every objection has an answer on the page.
  *Metric:* Landing → hand-off rate; FAQ opens per visit (up); guardrail: Messages asking questions before booking.
  *Reading:* baseline not set; no readings yet; read: too early.
  *Here:* In place: LandingFaq.jsx answers privacy, winter warmth, getting there, food, how the hot tub and bath work, cancelling and vouchers. Noise is covered in "Good to know" (StayDetails.jsx). (checked 2026-11-20, ai)

- [x] **FUN-14** · bet · Weak (proposed)
  Lead with how the experience unfolds (arriving, settling in, the evening, the morning), specific to each product, before listing facilities.
  *Check:* On each landing page, the section after the hero pictures the stay hour by hour or scene by scene, specific to that retreat and honest about anything guests do themselves.
  *Metric:* Scroll depth to the fork; landing → hand-off rate (up); guardrail: Cancellations inside the free window (a sign of mismatched expectations).
  *Reading:* baseline not set; no readings yet; read: too early.
  *Here:* In place: EveningTimeline.jsx shows each retreat's evening hour by hour from retreats.js, and is honest that guests light the tub themselves. (checked 2026-11-20, ai)

### UI: Page and speed

- [ ] **UI-03** · bet · Weak (proposed)
  Pages faster than Google's 'good' line (the Google doc's LCP under 2.0 s, INP under 150 ms, CLS of 0, Lighthouse 95+) sell more than pages that just meet it.
  *Check:* Split field data by load speed and compare conversion rates for visits above and below the stricter thresholds.
  *Metric:* Landing → hand-off rate for faster against slower page loads (up); guardrail: Build time spent on speed.
  *Reading:* baseline not set; no readings yet; read: too early.
  *Here:* Not built: the speed pass is deferred.

- [ ] **UI-07** · bet · Weak (proposed)
  On forms you control, use a single column, the right mobile keyboard for each field, autofill, and inline error messages.
  *Check:* Fill each form on a phone: one column, numeric and email keyboards where they fit, autofill works, and errors show beside the field as you go.
  *Metric:* Form completion rate (up); guardrail: Data quality (bad emails, wrong postcodes).
  *Reading:* baseline not set; no readings yet; read: too early.
  *Here:* Applies to Hooga's own forms: the voucher checkout (not built) and ContactView.jsx (not checked).

### SAL: Sales

- [x] **SAL-01** · bet · Weak (proposed)
  Show a 'from £' price on the first screen of a sales page.
  *Check:* The first screen of each landing page shows a 'from £' price that matches the lowest bookable price in the facts file.
  *Metric:* Landing → hand-off rate (up); guardrail: Hand-off → purchase rate (price shock at checkout should fall, not rise).
  *Reading:* baseline not set; no readings yet; read: too early.
  *Here:* In place: "From £240 a night" in the hero (LandingHero.jsx). See LAW-03 on whether £240 is all-in. (checked 2026-11-20, ai)

- [x] **SAL-02** · bet · Weak (proposed)
  Pre-select the stay length the business prefers (Hooga: 2 nights), marked as recommended, with shorter stays one tap away.
  *Check:* Open the duration choice: the preferred length is pre-selected, labelled and priced, and the other lengths are visible and selectable.
  *Metric:* Average length of stay for direct bookings (up); guardrail: Bookings per 100 visits.
  *Reading:* baseline not set; no readings yet; read: too early.
  *Here:* In place: 2 nights pre-selected in the fork, with 1 night one tap away (ConversionFork.jsx). Its "Most loved" label needs evidence (LAW-06). (checked 2026-11-20, ai)

- [ ] **SAL-03** · bet · Weak (proposed)
  On a checkout you control, offer one well-chosen upgrade rather than a list of small add-ons.
  *Check:* On the checkout step, count the upgrade offers: exactly one, unticked, with its price shown.
  *Metric:* Upgrade take-up and average order value (up); guardrail: Checkout completion rate.
  *Reading:* baseline not set; no readings yet; read: too early.
  *Here:* Not built: the voucher checkout is Phase 3.

- [x] **SAL-04** · bet · Weak (proposed)
  Show a bundle's price next to the total of its parts bought separately (for example, Slow Stay £68 against £90).
  *Check:* Each bundle shows both prices, and the 'separately' total matches the real separate prices in the facts file.
  *Metric:* Bundle take-up against single-extra take-up (up); guardrail: Average order value.
  *Reading:* baseline not set; no readings yet; read: too early.
  *Here:* In place: the Slow Stay shows £68 against £90 struck through (StayDetails.jsx, pricing.js anchorPrice). The live listing prices differ (see the rule's conflicts). (checked 2026-11-20, ai)

- [ ] **SAL-06** · bet · Weak (proposed)
  Sell gift vouchers as named experiences priced in nights (for example, 'The Anniversary Night'), with a cash amount as a quieter third option.
  *Check:* The voucher page leads with named experiences, each stating exactly what it buys; the cash option is there but secondary.
  *Metric:* Voucher revenue per 100 visits; share of named against cash vouchers (up); guardrail: Redemption problems and complaints.
  *Reading:* baseline not set; no readings yet; read: too early.
  *Here:* Named and priced in nights ("The One-Night Escape" £240, "The Two-Night Adventure" £480, pricing.js), plus "Any Amount" on /gift. They can't be bought yet (FUN-10).

- [ ] **SAL-07** · bet · Weak (proposed)
  On a checkout you control, show Apple Pay and Google Pay at the top of the payment step.
  *Check:* Open the checkout on an iPhone (Safari) and an Android phone (Chrome): the express buttons sit above the card form.
  *Metric:* Checkout completion rate on mobile (up); guardrail: Payment failures and refunds.
  *Reading:* baseline not set; no readings yet; read: too early.
  *Here:* Stays: Hospitable Direct Premium already offers Apple Pay and Google Pay. Vouchers: the checkout isn't built.

- [ ] **SAL-08** · bet · Weak (proposed)
  Offer payment in instalments on higher-priced purchases.
  *Check:* On purchases above the threshold set in the project's brief, an instalment option is shown at checkout with its full terms.
  *Metric:* Checkout completion and average order value above the threshold (up); guardrail: Refunds, chargebacks and missed payments.
  *Reading:* baseline not set; no readings yet; read: too early.
  *Here:* Not built. Only possible on the voucher checkout; Hospitable has instalment terms but no BNPL.

- [ ] **SAL-09** · bet · Weak (proposed)
  To fill quiet nights, add value (for example, a free late checkout on midweek two-night stays) rather than cutting the price.
  *Check:* Midweek offers on the site are value-adds with clear terms, not price cuts, unless Pete has chosen to run a discount as the other side of a test.
  *Metric:* Midweek occupancy and revenue per available night (up); guardrail: Weekend rate and occupancy.
  *Reading:* baseline not set; no readings yet; read: too early.
  *Here:* Not built: /escape pitches Sunday to Thursday, but there's no midweek value-add offer.

- [ ] **SAL-10** · bet · Weak (proposed)
  Offer upgrades after booking too (on the confirmation page and in pre-arrival messages about 7 and 3 days out), not only during checkout.
  *Check:* Make a test booking: the confirmation and each pre-arrival message link to the upgrades available for that stay.
  *Metric:* Upgrade revenue per booking (up); guardrail: Cancellations inside the free window; complaints about upselling.
  *Reading:* baseline not set; no readings yet; read: too early.
  *Here:* Not set up: Hospitable upsells, the Guest Portal link and the pre-arrival messages aren't configured. The site says the Celebration package is "added after you book" (EXTRAS_IN_CHECKOUT = false).

- [x] **SAL-12** · bet · Weak (proposed)
  State the guarantee or risk-reversal plainly, with as few conditions as the business can afford.
  *Check:* Read the guarantee as a buyer would: it fits in one sentence, and any conditions sit next to it rather than in the terms.
  *Metric:* Purchases per 100 visits (up); guardrail: Refunds or cancellations under the guarantee.
  *Reading:* baseline not set; no readings yet; read: too early.
  *Here:* In place: "No-hassle cancellation within 48 hours of booking. No questions asked." (ConversionFork.jsx) is one plain sentence beside the actions. (checked 2026-11-20, ai)

### CUS: Customer

- [x] **CUS-01** · bet · Weak (proposed)
  Offer a clear, easy free-cancellation window, stated next to the buy button.
  *Check:* The window's terms appear next to the main button and match the policy set in the booking platform. A test booking can be cancelled by the guest inside the window without contacting anyone.
  *Metric:* Bookings per 100 visits, against the share cancelled inside the window (up); guardrail: Net bookings after cancellations.
  *Reading:* baseline not set; no readings yet; read: too early.
  *Here:* In place on the site: the 48-hour line is in the hero, the fork, the booking page and the FAQ. Not yet set in Hospitable (LAW-13). (checked 2026-11-20, ai)

- [ ] **CUS-02** · bet · Weak (proposed)
  Straight after booking, send an honest, detailed picture of what the stay is really like while the free-cancellation window is still open.
  *Check:* Make a test booking: within an hour the guest receives a 'your stay, honestly' message covering everything guests operate themselves and any known quirks, with the cancellation link.
  *Metric:* Review accuracy rating (up); guardrail: Cancellations inside the window.
  *Reading:* baseline not set; no readings yet; read: too early.
  *Here:* Not set up: Pete's video-guide "New reservation" message in Hospitable (Pete's Hospitable to-do 4). The site already promises it (POLICIES.afterBookingLine).

- [ ] **CUS-04** · bet · Weak (proposed)
  Ask for the review at the high point (the end of the stay, or just after the result lands), not days later.
  *Check:* Find when the review request goes out (messaging rules or emails) and confirm it matches the agreed high point.
  *Metric:* Reviews per completed stay or sale (up); guardrail: Average rating.
  *Reading:* baseline not set; no readings yet; read: too early.
  *Here:* No review requests yet.

- [ ] **CUS-05** · bet · Weak (proposed)
  Invite occasion guests back shortly before the occasion comes round again (about 10.5 months later), naming the occasion.
  *Check:* The booking flow records the occasion and its date with marketing consent, and a reminder is scheduled for each one.
  *Metric:* Repeat bookings from past occasion guests within 13 months (up); guardrail: Unsubscribes and complaints.
  *Reading:* baseline not set; no readings yet; read: too early.
  *Here:* Not built (no CRM; the occasion isn't captured at booking).

- [ ] **CUS-06** · bet · Weak (proposed)
  After a booking or voucher purchase, let the buyer create a shareable surprise reveal (a page or card) for the person they're treating.
  *Check:* Complete a test purchase: a reveal can be made in under two minutes, opens properly on a phone, and carries quiet branding with a link back.
  *Metric:* Share of buyers who create a reveal; visits and sales arriving from reveal links (up); guardrail: Support requests about reveals.
  *Reading:* baseline not set; no readings yet; read: too early.
  *Here:* Not built (Phase 5).

- [ ] **CUS-07** · bet · Weak (proposed)
  Give every booking a practical guide to the stay: what to bring, how things work, food nearby and ideas for the evening.
  *Check:* Each booking confirmation links to the guide for that retreat, and the guide covers every guest-operated feature in the facts file.
  *Metric:* Guest messages per booking (down); guardrail: Review rating.
  *Reading:* baseline not set; no readings yet; read: too early.
  *Here:* Not built (Phase 5).

- [ ] **CUS-08** · bet · Weak (proposed)
  When a customer is unhappy, fix it or refund quickly, without argument.
  *Check:* The written complaints process says who decides and how fast, and that refunds aren't argued over. Check the last five complaints against it.
  *Metric:* Average review rating (up); guardrail: Refunds as a share of revenue.
  *Reading:* baseline not set; no readings yet; read: too early.
  *Here:* No written complaints process known (brief §10 Q11).

### ADS: Paid traffic

- [ ] **ADS-04** · bet · Weak (proposed)
  Point paid ads at demand the business would not otherwise get (for Hooga, Sunday to Thursday and the quieter seasons), not at peak nights that already sell.
  *Check:* Campaign schedules, ad copy and landing offers focus on the quiet nights the brief names; peak-night campaigns are off or capped.
  *Metric:* Midweek and off-season occupancy from paid traffic (up); guardrail: Cost per booking.
  *Reading:* baseline not set; no readings yet; read: too early.
  *Here:* /escape targets Sunday to Thursday. No campaigns yet.

- [ ] **ADS-06** · bet · Weak (proposed)
  Use organic posts that beat the account's own average as the first paid social ads.
  *Check:* Each live social ad's creative traces to an organic post, with that post's performance against the account average noted.
  *Metric:* Cost per landing-page view and click-through rate against other creatives (up); guardrail: Cost per sale.
  *Reading:* baseline not set; no readings yet; read: too early.
  *Here:* No ads yet.

- [ ] **ADS-07** · bet · Weak (proposed)
  Video ads hook in the first three seconds, with a visual surprise, a spoken line and an on-screen promise, and no slow intro.
  *Check:* Watch each video ad's first three seconds with the sound off and then on: the promise is clear both ways.
  *Metric:* Three-second view rate (hook rate) (up); guardrail: Cost per landing-page view.
  *Reading:* baseline not set; no readings yet; read: too early.
  *Here:* No ads yet.

- [ ] **ADS-08** · bet · Weak (proposed)
  Run a small retargeting budget at visitors who didn't buy (the Google doc suggests about £5 a day over 14 days).
  *Check:* A retargeting audience of non-buyers exists with a set budget and window, and excludes people who have already bought.
  *Metric:* Purchases per £ spent on retargeting (up); guardrail: Ad frequency and negative feedback.
  *Reading:* baseline not set; no readings yet; read: too early.
  *Here:* No ads yet. It needs the consent tool (LAW-08) before audiences can build.

- [ ] **ADS-09** · bet · Weak (proposed)
  Run search ads on feature searches ('hot tub stay Kent', 'private cinema stay') as well as occasion searches, each landing on its matching page.
  *Check:* The account has feature ad groups alongside occasion ones, each pointing at its matching page (FUN-01).
  *Metric:* Sales per £ by ad group type (feature against occasion) (up); guardrail: Total cost per sale.
  *Reading:* baseline not set; no readings yet; read: too early.
  *Here:* Retreat pages exist (/carriage, /yurt, /bus). The planned /hot-tub feature page (CONVERSION-PLAN §6 Phase 1) isn't built. No campaigns yet.

### SEO: Google search (organic)

- [ ] **SEO-06** · bet · Moderate (proposed)
  Ask customers for Google reviews as well as reviews on booking platforms, to build local search prominence.
  *Check:* The review request (CUS-03) includes a Google review link, and the Business Profile's review count is recorded monthly.
  *Metric:* Google review count, and Business Profile search impressions (up); guardrail: Reviews on the booking platforms.
  *Reading:* baseline not set; no readings yet; read: too early.
  *Here:* Unknown whether a Google Business Profile exists (brief §10 Q20).

- [ ] **SEO-07** · bet · Weak (proposed)
  The intent pages built for ads (by occasion and by feature) also win organic search traffic when they are indexable and specific.
  *Check:* In Search Console, each intent page is indexed and shows impressions for its target searches.
  *Metric:* Organic clicks per intent page (Search Console) (up); guardrail: Paid landing page conversion rate (no-navigation design kept on paid routes).
  *Reading:* baseline not set; no readings yet; read: too early.
  *Here:* Not live yet. The intent pages are client-rendered (SEO-03), which may limit this.

## 3. Don'ts

- [x] **LAW-04** · standard · Excluded (proposed)
  Don't say that dates, stock or a price are limited, or show a countdown, unless it is true and driven by live data or a real, fixed deadline.
  *Check:* Find every urgency or scarcity message on the site. Each comes from live data (for example, real availability) or a real, fixed deadline, and none resets or repeats.
  *Here:* Searched V3's src for urgency and scarcity wording (only N left, hurry, limited time, countdown, selling fast, last chance): none found. (checked 2026-11-20, ai)

- [ ] **LAW-05** · standard · Excluded (proposed)
  Don't pre-select any paid extra; every add-on starts unticked.
  *Check:* Go through every checkout you control, and the booking platform's checkout, with a test purchase: no paid extra is selected by default.
  *Here:* Nothing is pre-selected on V3's own pages (the nights choice is a product choice, not an extra). Can't be checked yet: the voucher checkout isn't built and Hospitable's upsells aren't set up.

- [!] **LAW-06** · standard · Excluded (proposed)
  Don't make objective claims the business can't prove, or promise outcomes (for example, 'Kent's best-rated stay' or 'a flawless night, guaranteed').
  *Check:* List every claim on the site and in ads. Each objective claim has its evidence on file (see LAW-07); there are no promised outcomes.
  *Here:* Two objective claims about guests have no evidence in the facts files: the Slow Stay badge "Most guests choose this" (pricing.js EXTRAS.slowStay.badge, shown in StayDetails.jsx) and "Most loved" on the 2-night option and voucher (ConversionFork.jsx, pricing.js VOUCHERS tag). Back them with booking data or remove them (brief §10 Q13). (checked 2026-11-20, ai)

- [x] **LAW-12** · standard · Moderate (proposed)
  Don't use another company's trademark (for example 'Harry Potter') in ads or sales copy without permission.
  *Check:* Search all ad text, keywords and site copy for brand and franchise names. Each is the project's own, used purely descriptively, or licensed.
  *Here:* Searched V3's src for "Harry Potter" and "Hogwarts": none found. No ads exist yet to check. (checked 2026-11-20, ai)

- [x] **FUN-09** · standard · Weak (proposed)
  Don't ask for a name, email or any other personal detail before showing the offer on a landing page.
  *Check:* Open each landing route in a private window: the offer, the price and the actions are all visible without filling anything in.
  *Here:* Landing pages show the offer, prices and both actions with no form before them (IntentLandingPage.jsx). V1's name gate wasn't ported. (checked 2026-11-20, ai)

- [x] **SAL-05** · standard · Weak (proposed)
  Don't add a top tier just to make the middle one look cheaper; every tier must be a product someone would genuinely buy and the business can deliver.
  *Check:* For each tier, write down who it's for and confirm it can be delivered. The project's forecasts don't count on a top tier lifting the others.
  *Here:* No premium or decoy tier on the site: one stay price ("from £240"), two named vouchers and the extras. (checked 2026-11-20, ai)

- [x] **SEO-04** · standard · Moderate (proposed)
  Don't add review-star structured data for reviews of the business on its own site, or expect stars from an embedded review widget.
  *Check:* Search the site's structured data (Rich Results Test) for Review or AggregateRating on the business itself; there is none.
  *Here:* No structured data in V3 (searched for ld+json, schema.org and aggregateRating). Nothing to remove. (checked 2026-11-20, ai)

## 4. Targets

From the project's own economics, never from industry benchmarks (PLAN.md §9). A blank value names the number it's waiting for.

| Target | Value | Basis | Actual |
|---|---|---|---|
| What one extra booked night is worth | — | The margin on a night that would otherwise stay empty (midweek and off-season). Waiting on margin per night (brief §10 Q1). | — |
| What one direct booking that replaces an Airbnb booking is worth | — | Only the fee saved by booking direct, net of Hospitable Direct costs. Waiting on the Airbnb share and fee (brief §10 Q2). | — |
| Most a booking can cost (ads) | — | What the booking is worth (weighted by how many bookings are extra) minus the profit Pete wants from it. Waiting on brief §10 Q1–Q4. | — |
| Lowest landing → booking conversion rate at which ads pay | — | Cost per click ÷ most a booking can cost. Waiting on the above and on real CPCs from the first campaigns. (CONVERSION-PLAN §7 illustrates: at £3 a click, 2% means £150 per booking; that is an illustration, not a target.) | — |
| Baseline period | — | For the first 4–8 weeks after launch, record landing → fork, fork → hand-off and hand-off → booking rates rather than setting goals (PLAN.md §9). | — |

## 5. Not applied here

- **TRK-10** · When an event is sent both from the browser (Meta Pixel) and from a server (Conversions API), both copies carry the same event name and event ID so Meta counts it once. *Why not:* Hooga's plan has no Conversions API, and Hospitable's Meta Pixel sends Page View only, so there's no browser-and-server pair to deduplicate. Revisit if a server-side Meta setup is added.

## 6. Gaps Pete has accepted

None yet.

---
Generated from ledger.json on 2026-11-20. Don't hand-edit. Ask a Marketing Beast session to regenerate.
