# Hooga Retreats: Conversion Masterplan

*Written 19 Nov 2026 from a review of `couples-site-v1`, `couples-site-v2`, `Sourced/docs/Hooga_Business_and_Marketing_Brief.md` and `Sourced/docs/google optimisation ideas.txt`.*
*For Pete and any AI session picking up the build. Work top to bottom: each phase depends on the one before it.*

---

## 0. Decisions so far (19 Nov 2026)

- **V3 lives in `couples-site-v3/`.** It started as an exact copy of V2 (commit `6c80a75`), and V2 stays frozen. It runs on port 5175, so it can sit alongside V2 (5174).
- **The proof is real and verified:** 7 years hosting, Superhosts on all three listings, and 902 Airbnb reviews averaging 4.9★ (carriage 4.87 from 182, yurt 4.93 from 543, bus 4.82 from 177). V2 said "10+ years", which was wrong; V3 is fixed.
- **Every fact comes from one file.** V2's stay descriptions were invented: a "1920s railway carriage" with teak and bathrobes, a bus with an outdoor bath and a king bed in "ancient Kent woodland", a yurt with a "copper bath" and a "dome skylight". V3 takes every fact from `couples-site-v3/src/content/retreats.js`, built from Pete's listing write-ups. Its `toConfirm` lists hold anything still unconfirmed.
- **Magic, not luxury.** The voice is about the childlike magic grown-ups lost (§5b).
- **Book first, explain after, make cancelling easy** (§5a).
- **Speed comes later.** The compression pass waits until the product looks right. Until then, components are built the fast way (poster images, lazy loading, fixed aspect ratios), so the speed pass is a file swap, not a rebuild.
- **One site, two front doors:** Google intent pages and the Instagram story deck.

**Round 2 (19 Nov):**
- **48-hour cancellation:** "No-hassle cancellation within 48 hours of booking" appears on the site as reassurance. Pete handles the after-booking explanation himself: follow-up emails, videos of Pete talking, links.
- **Reviews:** sample reviews for now, each visibly labelled **"Sample review"**. Pete will replace them with real reviews and video testimonials before launch.
- **Prices:** V1's prices are correct. They all live in `couples-site-v3/src/content/pricing.js` (£240/night; Slow Stay £68 vs £90; early £40; late £50; bus hot tub £45; yurt pool & sauna £45; vouchers £240 / £480).
- **Celebration package:** balloons, a chilled bottle of prosecco and a banner, offered at **all three** retreats for £55 (V1's "Romance/Birthday" price).
- **Tools:** Hospitable on the **Mogul** plan; guest email through Hospitable messaging and Gmail (no email-marketing tool yet).
- **Footage:** wide-angle clips that can be centre-cropped for mobile. The people in the photos are real guests (only edited with AI).
- **Hosting:** deploy V3 to the `hooga-retreats` Firebase project.
- **Families:** no paid ads (they come in the holidays anyway), but there's a family route for organic visitors from Instagram, Facebook and Google: `/families`, linked from the homepage.

**Built (19 Nov):** the Phase 1 intent pages (§6) are live in V3. See §10.

**Hospitable research (19 Nov), which changes Phases 0, 3, 4 and 6.** Details in §11. Hospitable already does several things we'd planned to build: extras sold during checkout, the 48-hour cancellation with guest self-cancel, and an automatic message straight after booking.

---

## 1. The take, in one screen

- **V2 has the right soul.** It opens with "what are you celebrating?", leads with video, defaults to 2 nights and has a warm, slightly magical voice. The 4-scene story deck works like an Instagram Story, which suits Instagram traffic.
- **V2 isn't a sales funnel yet.** It's a short film with a booking widget bolted onto the end:
  - no prices on the stays, no reviews, and no tracking;
  - the gift path ends in a contact form;
  - the visitor's answers (occasion, nights) are discarded before the widget;
  - the first screen downloads about 25 MB.
- **Google and Instagram visitors behave differently.**
  - Instagram visitors were interrupted mid-scroll, so they need to be won over first. The story deck suits them.
  - Google visitors are already searching "hot tub stay Kent". They want proof, a price and dates within 5 seconds. A long-scroll intent page suits them.
  - So: **two front doors, one checkout.**
- **Many buyers can't pick dates.** They're planning a surprise or haven't sorted childcare. So the **gift voucher must be a full purchase path**, available from every screen. It's also the easiest checkout to build ourselves, because it needs no availability calendar.
- **Upsells:** V1's patterns are good (the Slow Stay bundle priced at £68 next to its £90 parts, the celebration package, add-ons that depend on the retreat). Hospitable owns the date checkout, so **sell upgrades after the booking** (on the confirmation page and in pre-arrival emails, paid with Stripe). Inside the voucher checkout, sell them as **one** order bump.
- **The thing people will talk about: the Surprise Reveal.** The booker gets a personalised reveal page and card to give their partner ("Pack a bag. Thursday, 5pm. Bring a swimsuit."). It serves the buyer the brief identifies (one partner arranging a surprise), and it's the kind of moment people screenshot and post.
- **Order matters:** measure → speed → Google pages → vouchers → upsells → reveal → experiments. Spending on ads before Phase 0 buys data you can't read.

---

## 2. What V2 gets right (keep it)

| Keep | Where |
|---|---|
| Occasion routing (`/romantic`, `/birthday`, `/family`) | `couples-site-v2/src/App.jsx` |
| All funnel copy in one markdown file, so it's easy to edit and A/B | `couples-site-v2/src/content/funnel-copy.md` |
| 2 nights as the default, marked "Recommended" | `couples-site-v2/src/components/HoogaDurationSelector.jsx` |
| Midweek nudge on the booking screen | `funnel-copy.md` → Booking |
| Distinctive brand: forest green, champagne, serif, ink-bloom reveals | `couples-site-v2/src/index.css` |
| Video → photo fallback | `couples-site-v2/src/components/MediaFrame.jsx` |
| Analytics helper already sends named events | `couples-site-v2/src/utils/analytics.js` |

---

## 3. What's costing conversions right now (ranked)

| # | Problem | Evidence | Fix (phase) |
|---|---|---|---|
| 1 | **Page weight.** The first screen loads ~25 MB: a 15.5 MB video shown at 40% opacity behind an 80% dark overlay, plus a 9.7 MB JPEG. Funnel videos are 11–25 MB each and photos are 5–26 MB PNGs. `public/assets` is 655 MB, and many files are duplicated across 2–3 folders. On 4G, many people will leave before the first frame. | `FunnelEntryView.jsx:28-40`, `public/assets/videos/*` | Media pipeline (P0) |
| 2 | **No measurement.** `index.html` loads no GA4, GTM or Meta pixel. `trackFunnelEvent` calls `window.gtag`, which doesn't exist, so every event is lost. No `gclid`/UTM capture. | `index.html`, `utils/analytics.js` | Tracking (P0) |
| 3 | **Choices are discarded.** `intent` and `nights` reach `/booking` in the URL, but are never passed to the Hospitable widget. `results-url="#stays"` doesn't point to a results page. Test by hand what happens after Search. | `BookingView.jsx`, `HoogaBookingSlide.jsx:53-57` | Booking hand-off (P0) |
| 4 | **Forced waiting.** Each scene hides its button for 3.3–4.2 s. Four scenes, the duration picker and the booking screen add up to 20+ seconds of animation before anyone sees a date picker. That's acceptable on Instagram only if it can be skipped, and fatal for Google traffic. | `FunnelSlide.jsx:56` | Story deck rebuild (P2), intent pages (P1) |
| 5 | **No stay prices anywhere.** Voucher prices exist; stay prices don't. | `src/data/*` | P1 |
| 6 | **No reviews.** No social proof anywhere in V2 apart from an unverified footer line ("10+ years of 5-star hosting · 1,000+ stays"). | grep `review` → 0 hits | P1 |
| 7 | **Gifts can't be bought.** The "Purchase gift voucher" button goes to `/contact?subject=gift-voucher`. | `GiftView.jsx:50` | Voucher engine (P3) |
| 8 | **Navigation leaks.** The header drawer reaches 6 content pages from every funnel screen. | `HoogaHeader.jsx`, `HoogaNavDrawer.jsx` | Ad routes are nav-free (P1) |
| 9 | **Pinch-zoom is disabled.** It's an accessibility failure, and people zoom in to inspect photos. | `index.html:6` (`user-scalable=no`) | P0 |
| 10 | **No meta description, social share previews or prerendered HTML.** This hurts the Google Ads Quality Score (landing-page experience) and link previews in WhatsApp and Instagram DMs. | `index.html` | P0 |
| 11 | **Live chat is switched off.** Chatwoot has no token. | `utils/chatwoot.js` | Decide: on or off |
| 12 | **Repo bloat.** `.git` is 436 MB because the raw media is committed. | `git count-objects` | P0 |

---

## 4. The core strategy: two front doors, one checkout

```
 INSTAGRAM / META ADS                          GOOGLE SEARCH ADS
 (interrupted, browsing)                       (searching, ready to act)
          │                                             │
          ▼                                             ▼
 STORY DECK   /s/<occasion>                 INTENT PAGE  /anniversary  /birthday  /escape
 3 swipe/tap scenes, skippable,                          /carriage  /yurt  /bus  /hot-tub
 button visible within ~0.8s                Hero: price-from, ★ rating, two buttons above the fold
          │                                 Scroll: your evening · retreats · reviews · FAQ
          └──────────────────┬──────────────────────────┘
                             ▼
                THE FORK   (always side by side)
      [ I know our dates ]               [ It's a surprise / a gift ]
               │                                    │
     Retreat · nights · dates            Named-experience voucher
     live availability + price           Our own Stripe checkout
               │                          Apple Pay · Google Pay · Klarna
     Hospitable checkout                  ONE order bump: Celebration upgrade
     (pre-filled + tracked)               Instant PDF + Surprise Reveal link
               │                                    │
               ▼                                    ▼
     /booking-confirmed                   /voucher-confirmed
      → "Make it a celebration"            → "Send the reveal"
        (Stripe upsell page)
      → Surprise Reveal builder
                             │
                             ▼
   Email: T-7 / T-3 upgrade offer · post-stay review ask · 10.5-month occasion re-invite

 Visitors not ready to book → "Midweek drop alerts + Kent couples guide" (email) → retargeting ads
```

---

## 5. Where the two docs conflict (Pete's call)

The Google spec pushes hard, and in places it overpromises compared with the business brief and how the retreats actually run. Overpromising gets the click but costs a review, so being honest here also protects conversion.

| Topic | Google spec says | Brief / reality says | Recommendation |
|---|---|---|---|
| "Couples Only" badge | Couples only | Families are the secondary audience; the bus sleeps 6; V2 has `/family` | "Made for couples" on couple routes; never "only" |
| "Private Canterbury countryside" | For every retreat | The yurt is a courtyard near central Canterbury; the brief says to mention occasional local noise | One location line per retreat |
| Order bump: "hot tub & firepit pre-lit for arrival" | Yes | V1 copy: the wood-fired tub takes ~3 hrs and can't be pre-heated | Bundle only what's true: fizz, setup, hamper, late checkout, "fire laid ready to light" |
| "Luxury" everywhere | Luxury | The brief says avoid exaggerated luxury claims; the value is imagination and privacy | **Decided:** magic, not luxury (§5b) |
| "Move dates free up to 14 days" | Guarantee box | Not in any policy I found | Show it only if real, and it must match the Hospitable policy |
| Zero navigation | Zero | V2 has 6 content pages | Ad routes have no navigation; brochure pages stay for organic and direct visitors |
| Trust claims | n/a | "10+ years 5-star", "1,000+ stays", "Superhost" | **Decided:** "4.9★ from 900+ reviews · Superhosts · 7 years" (verified 19 Nov) |
| 3-night option | n/a | The brief focuses on 1–2 midweek nights | Keep 3 as a quiet option; lead with 2 |

### 5a. Book first, explain after, make cancelling easy *(Pete's model)*

Sell the dream → get the booking → straight afterwards, explain the dream's reality in detail → make cancelling easy if it doesn't sound right.

```
BEFORE BOOKING              BOOKED                       WITHIN THE FREE-CANCEL WINDOW
Sell the dream.        →    "You're going!"         →    "Your stay, honestly" page + email:
Magic first.                Confirmation +               what it's really like, hour by hour:
One quiet "Good to          Surprise Reveal              lighting the tub, the ladder, head height,
know" line per retreat      builder                      the distant train / wedding-venue music.
next to the button.                                      Then: "Not for you? Cancel in one tap,
                                                         full refund, no hard feelings."
```

**Why it converts:**
- The dream earns the booking.
- The honesty earns the review (the "accuracy" rating is 4.9 on all three listings).
- Easy cancelling takes the fear out of saying yes.

**The legal guardrail:** UK consumer law treats leaving out important information before purchase as misleading, even when there's a refund window. So any fact that could change someone's mind must stay one tap away **before** booking:
- guests heat the hot tub themselves;
- low ceilings on the bus;
- city sounds at the yurt;
- the unheated wagon.

Keep these as a short collapsed "Good to know" line beside the book button, so it doesn't break the spell; the full picture comes after booking. Check this with whoever writes your terms.

### 5b. Voice: magic, not luxury

Pete: *"It's an experience, magic, realising the childlike magic we lost."* The listings already talk this way.

- **The idea:** Remember when a den was the best place in the world? Grown-ups are allowed that too.
- **Use:** secret, hidden, discover, climb the ladder, step aboard, den, firelight, under the stars, ritual, slow evenings, adventure, storybook.
- **Avoid:** luxury, premium, exclusive, indulgent, pampering, spa-speak, "effortless" (the hot tub takes effort, and that's part of the magic).
- **One feeling per retreat:**
  - **Carriage** = *romance*: slow, firelit, for two.
  - **Yurt** = *enchantment*: hidden in the city, a secret cinema up a ladder.
  - **Bus** = *adventure*: playful, step aboard, families welcome too.
- **Lines from Pete's own listings that are ready to use:**
  - "It is not instant, but that is very much part of the charm." (carriage hot tub)
  - "Most guests find that one night goes far too quickly." (yurt; this is the 2-night upsell in Pete's own voice)
  - "For guests who want more than just a place to sleep." (bus)
- **Leave "Harry Potter" off the website and ads** (it's in the bus listing). It's a trademark, and Google Ads can restrict trademarked terms. "Storybook" and "the romance of train travel" carry the same feeling.

---

## 6. Phased roadmap

### Phase 0: Instrument *(before any ad spend)*

> **Pete, 19 Nov:** speed waits until the product looks right. The media pipeline below is the **pre-launch speed pass**: do it after Phases 1–3 look right, and before any paid traffic. The tracking items stay first.

- [ ] **Pre-launch speed pass (media pipeline).** Write a script (ffmpeg + sharp; V1 already has `scripts/optimize-images.mjs`):
  - [ ] Hero loops: 6–8 s, 720p, ≤2.5 MB each as MP4 (H.264) and WebM.
  - [ ] Still images shown before a video plays (posters): AVIF/WebP, ≤150 KB.
  - [ ] Photos: responsive sizes at 640, 1080 and 1600 px wide.
  - [ ] Deduplicate `public/assets`, and move the raw masters to the git-ignored `Visuals/` folder.
  - [ ] Remove the background video on `/` (or use a ≤1 MB loop). It's barely visible behind the overlay.
- [ ] **Tracking:**
  - [ ] Add Google Tag Manager, Google Consent Mode v2 (tracking off until the visitor consents), GA4 and the Meta Pixel.
  - [ ] Point `trackFunnelEvent` at the GTM data layer (`dataLayer`).
- [ ] **Keep ad attribution:**
  - [ ] On arrival, capture `gclid`, `gbraid`, `wbraid`, `fbclid`, `utm_*` and the occasion.
  - [ ] Store them for the visit and in a 90-day first-party cookie.
  - [ ] Add them to every outbound booking or checkout URL.
- [ ] **Booking hand-off:**
  - [ ] Pass the retreat, nights and guests (plus dates once picked) into Hospitable.
  - [ ] Test by hand what `results-url` does.
  - [ ] Find out whether Hospitable Direct can fire GA4/Meta purchase events or send the guest back to our own confirmation page. **This decides how much of Phase 6 is needed.**
- [ ] Re-enable pinch zoom. Add a meta description and a social share image (Open Graph tags) for every route. Prerender the routes to static HTML (e.g. `vite-react-ssg`).
- [ ] Record a Lighthouse mobile baseline in this file.
- **Done when:** a test booking from `/anniversary?gclid=TEST123` shows up in GA4 with its source, occasion and value.

### Phase 1: Google intent pages *(the money pages)*

Build one page template that fills its content per route from a content file (like `funnel-copy.md`). There are two kinds of route: by occasion and by retreat or feature (which is how people actually search).

- Occasion: `/anniversary`, `/birthday`, `/surprise`, `/escape` (midweek)
- Retreat / feature: `/carriage` (hot tub + cinema), `/yurt` (outdoor bath), `/bus` (playful / family), `/hot-tub`

Mobile section order:
1. **Hero.** A 6 s loop with a poster image, an H1 matching the ad, a per-retreat travel-time pill (times to be verified), the real ★ rating and review count, the midweek "from £" price, and two buttons: **[Check dates & prices]** and **[Give it as a gift]**.
2. **Your evening** timeline: arrive → firelight → film → bath under the stars → slow morning. It must be specific to the retreat and honest about anything guests operate themselves.
3. **Retreat cards** (swipeable): what's special about each one, how many it sleeps, the "from £" price, and who it's best for ("anniversaries", "playful couples", "families").
4. **Reviews tagged by occasion:** real Airbnb reviews with first name and month, filterable by `[Anniversary]`, `[Birthday surprise]` and `[First night away from the kids]`.
5. **Price clarity:** what's included, and what's seasonal or operated by guests (wood-fired tub, seasonal pool and sauna).
6. **The Fork** (dates vs gift).
7. **FAQ:** privacy, winter warmth, travel time (drive, and the high-speed train from St Pancras to Canterbury), food and pubs, noise, how vouchers work.

- A sticky bottom bar on mobile, **[Check dates] [Gift it]**, appears once the hero buttons scroll away.
- These routes have no nav drawer and no footer sitemap; Privacy and Terms open in slide-over panels.

### Phase 2: Rebuild the story deck *(for Meta/Instagram)*

- Keep the V2 deck, but:
  - make the button visible within ~0.8 s;
  - tap right/left to move between scenes, like Stories;
  - add a persistent "Check dates · Gift it" pill.
- Cut it to 3 scenes using vertical 9:16 videos of ≤1.5 MB each, and preload one scene ahead.
- The last scene is **the Fork**, not the duration picker. Nights get chosen with the dates.
- Audio stays muted by default (as it is now).
- Meta ads go to `/s/<occasion>`; Google ads go to the intent pages.

### Phase 3: Our own voucher checkout *(fastest new revenue)*

- **Sell named experiences rather than cash amounts:**
  - "The Anniversary Night" (1 midweek night, any retreat);
  - "The Two-Night Birthday Escape";
  - "The Carriage Cinema Night";
  - a flexible cash amount as a third, quieter option.
- **Checkout:** Stripe Checkout, or Stripe's Payment Element with Express Checkout (Apple Pay and Google Pay), plus Klarna if eligible. **One** order bump: the Celebration upgrade.
- **Backend:** a Firebase function ported from V1, with these fixes:
  - **verify the Stripe webhook signature**, which is commented out at `couples-site-v1/functions/index.js:173`;
  - calculate prices on the server;
  - make sure the purchase event fires only once per transaction.
- **Delivery:** an instant PDF and email, with an optional printed gift-box upgrade.
- **Redemption (confirmed 19 Nov):** issue each voucher as a **single-use, fixed-amount Hospitable promo code**. The guest types it at checkout ("I have a discount code"). Limits:
  - it comes off the **nightly rate only**, not fees;
  - it can't keep a leftover balance;
  - it can't be filled in from a link.
  So price vouchers in nights, not £ amounts. Klarna isn't available on Hospitable checkout; offer it only on our own voucher checkout.
- **Capture "What are you celebrating?"** plus the occasion date, and send both to the CRM.
- Clear voucher terms, with 12 months' validity suggested.

### Phase 4: Upsells *(ported from V1)*

> **Updated 19 Nov:** Hospitable has **custom upsells** that guests can buy *during* checkout (a toggle per upsell) or later in the Guest Portal. So these extras are set up in Hospitable, not built as our own Stripe page. Once they're live, set `EXTRAS_IN_CHECKOUT = true` in `pricing.js` and the site copy switches to "add it as you book". The bullets below still apply to wording and anchoring, not to payment.

- ~~`/booking-confirmed` → "Make it a celebration": Stripe upsell page.~~ Use Hospitable upsells, plus the Guest Portal link in the "New reservation" message.
- Use V1's anchoring, but the prices now come from the **live listings**. V1's prices were different; they're kept here only for comparison. Confirmed prices go in `retreats.js`.

| Upgrade | Live listing (Nov 2026) | V1 had | Notes |
|---|---|---|---|
| The Slow Stay (early + late) | Carriage: £60 both, or £40 for one | £68 vs £90 | Keep the "both for less" anchor; depends on the next day's turnover |
| Early *or* late (yurt) | £40, message 3 days ahead | £40 / £50 | |
| Wood-fired hot tub (bus) | £40 per stay, 4–6 hrs to heat | £45 | Pete's listing recommends it for 2-night stays, so it doubles as the 2-night upsell |
| Pool & twin sauna (yurt) | £30 per hour, May–Sept | £45 per session | Seasonal: only show it when available |
| Celebration upgrade | not listed | £55 "Romance/Birthday" | Define contents that can actually be delivered |

- Show only upgrades the retreat offers (V1 already filters by `stayId`, so keep that) and that can actually be delivered on those dates.
- Send the same upgrade page in pre-arrival emails at **T-7** and **T-3** days.

### Phase 5: The talked-about layer

- **Surprise Reveal.** After a booking or voucher purchase, the booker personalises a reveal page (names, date, retreat, their own message, what to pack). They get a unique link, a printable card, and an optional timed reveal (a countdown that opens on a chosen date). Hooga branding sits quietly on every share.
- **"Your evening" guide.** A page for each booking: film ideas, what to bring, local food delivery, how to light the tub. It cuts support messages and lifts reviews.
- **Occasion memory.** About 10.5 months later: "Your anniversary's coming up. The carriage is free on…"
- **Midweek alerts list.** "Tell me when a Tuesday or Wednesday opens up," plus last-minute drops.

### Phase 6: Decision point: build our own date checkout?

Decide only after Phase 0 data shows how many people drop off at the Hospitable hand-off.

- **(a) Keep Hospitable.** Calendars stay synced; lowest risk.
- **(b) Build our own checkout** on Stripe, with availability and prices pulled from Hospitable's API and reservations written back. First confirm the API supports this.
- **Never** run a separate availability database without a sync (V1's Firestore holds do exactly that). You'd double-book against Airbnb.

### Phase 7: Experiments *(ongoing)*

Run one test at a time per route. Traffic is small, so test big changes rather than button colours.

1. Story deck vs intent page for Meta traffic.
2. "From £" price in the hero vs none.
3. Gift button wording: "Give it as a gift" vs "Planning a surprise?"
4. Midweek 2-night incentive: late checkout included vs £ off (the brief says test before making any discount permanent).
5. Hero video: hot tub vs cinema vs arrival.
6. Where reviews sit on the page.

---

## 7. Measurement

**Events** (in the data layer): the Google spec's set (`occasion_landing_view`, `select_conversion_path`, `begin_checkout`, `add_celebration_bump`, `generate_lead`, `purchase`), plus:
`story_scene_view` · `fork_view` · `select_retreat` · `booking_handoff` · `upsell_view` · `upsell_purchase` · `reveal_created` · `reveal_opened`

**Business KPIs (from the brief):** midweek occupancy, revenue per available night, average length of stay, share of bookings made direct, cost to acquire a booking.

**Funnel KPIs:** landing → fork, fork → hand-off, hand-off → booking, voucher conversion, upsell take-up, average order value.

**Illustrative maths:** at £3 a click, a 2% conversion rate costs £150 in ads per booking; at 4% it costs £75. Each point of conversion rate matters more than any bid change.

---

## 8. Build notes

- **Base:** `couples-site-v3`, an exact copy of V2 (React 19 + Vite + Tailwind), with V2 kept frozen. Dev server: `npm run dev` on port 5175.
- **Facts:** `couples-site-v3/src/content/retreats.js`. Nothing factual is written straight into a component.
- **Port from V1:**
  - the Stripe and Firebase functions (with fixes);
  - `CheckoutMoreTime`, `CheckoutExperiences`, `CheckoutSummary`;
  - `scripts/optimize-images.mjs`;
  - `react-helmet-async`.
- **Don't port from V1:**
  - the name gate ("Who are we welcoming?") in `PrePage.jsx`, which asks for information before giving anything;
  - the headline "Congrats Pete - A magical stay is free!", which reads as "no charge";
  - Firestore availability holds;
  - the hardcoded £240/night.
- **Content as configuration:** each route, occasion and test variant lives in markdown/JSON, so a new ad group needs no code.

---

## 9. Open questions for Pete *(updated 19 Nov, round 2)*

**Answered:** see §0. The small items still open:

1. **48 hours for last-minute bookings?** If someone books the day before arrival, does the 48-hour window still apply?
2. **Voucher validity:** 12 months? (The site says 12 months for now.)
3. **Yurt romance package:** is it the same as the new Celebration package, or something extra?
4. **Airbnb listings vs the site:** the listings show different extras prices (bus hot tub £40, yurt pool £30/hr, early/late £40). Align them so guests who compare see the same numbers.
5. **Contact email:** the V2 contact page says `hello@hoogaretreats.co.uk`, but you use Gmail. Does that mailbox exist, or forward to Gmail?
6. **Train time:** confirm the high-speed time from St Pancras to Canterbury West (FAQ says "under an hour").

Every unconfirmed fact is also listed in the `toConfirm` arrays in `retreats.js` and `pricing.js`.

---

## 10. What's built in V3 *(19 Nov)*

**Intent pages** (one template, `src/views/IntentLandingPage.jsx`, configured in `src/content/landings.js`):

| Route | Audience | Notes |
|---|---|---|
| `/anniversary`, `/birthday`, `/surprise`, `/escape` | Google Ads by occasion | `/escape` = midweek, "remember when a den was the best place in the world?" |
| `/carriage`, `/yurt`, `/bus` | Google Ads by retreat or feature | Other retreats offered at the bottom |
| `/families` | Organic only (no paid ads) | Bus and yurt |
| `/` | Organic front door | Choices: Anniversary, Birthday, Just because, Family, Gift |
| `/s/romantic`, `/s/birthday`, `/s/family` | Instagram story deck | V2 deck, unchanged until Phase 2. `/romantic` and `/family` still work |

**Page order:**
1. Hero: dual buttons above the fold, ★ 4.9, from £240, 48-hour cancellation.
2. Proof bar.
3. "How the evening unfolds", hour by hour, with a switch between retreats.
4. Retreat cards.
5. Reviews filtered by occasion (labelled samples).
6. What's included, the extras with prices, and a collapsed "Good to know" list.
7. The "book now, decide properly after" promise.
8. The Fork (dates vs gift).
9. FAQ.
10. Footer.

There is no site navigation. A sticky "Check dates / Gift it" bar appears on mobile.

**Plumbing:**
- `src/utils/attribution.js` keeps the ad-click IDs and UTM tags (in memory until consent) and adds them to every hand-off URL.
- `src/utils/analytics.js` pushes events to the GTM `dataLayer`.
- **Tested:** `/anniversary?gclid=TEST123` → choose the yurt, 1 night → `/booking?gclid=TEST123&…&retreat=yurt&nights=1&occasion=anniversary`.

**Booking hand-off:** `/booking?retreat=…` uses Hospitable's **per-property booking widget** (`src/components/HospitableBookingWidget.jsx`) once the IDs are in `src/content/hospitable.js`. Until then it falls back to V2's search widget. Tested with dummy IDs and all Hospitable traffic blocked: the widget mounts in our container, and the iframe receives `utm_source/medium/campaign`.

**Launch checklist (nothing paid goes live until all are done):**
- [ ] Paste the Hospitable `data-site-uuid` and the three `data-property-id`s into `src/content/hospitable.js`.
- [ ] Replace every `placeholder: true` review in `src/content/reviews.js` with a real one.
- [ ] Pre-launch speed pass (Phase 0 media pipeline). Hero videos are still 11–25 MB.
- [ ] Install the GTM container + Consent Mode v2; wire the consent tool to `setAdConsent()`.
- [ ] Pre-fill the Hospitable widget with the retreat and nights (waiting on the Hospitable research).
- [ ] Privacy / Terms slide-over panels on landing pages.
- [ ] Confirm every `toConfirm` item.

---

## 11. Hospitable Direct: what it can do *(researched 19 Nov 2026, Mogul plan)*

Sources: Hospitable help centre articles plus Hospitable's live widget scripts. The widget behaviour below was confirmed by reading `widget-loader.prod.js` and testing it locally.

| Need | Hospitable | What we do |
|---|---|---|
| Open the booking widget on the right retreat, with dates filled in | One widget per property. It reads `checkin`, `checkout` (YYYY-MM-DD), `adults`, `children`, `infants`, `pets` and `utm_*` from our page URL | `/booking?retreat=yurt` loads the yurt's widget. Dates can be passed as `checkin`/`checkout` |
| Extras (Celebration, Slow Stay, hot tub, pool & sauna) | Custom upsells: flat or per night, can be bought during checkout or in the Guest Portal | Set them up in Hospitable at V1 prices, then flip `EXTRAS_IN_CHECKOUT` |
| 48-hour free cancellation | Custom policies with a free window ("within 48 hours of booking"), refund tiers by days before arrival, and guest self-cancel in the Guest Portal | Set the policy in Hospitable to match the site |
| "Your stay, honestly" follow-up | The "New reservation" messaging rule can send straight away, with links | Pete's video-guide links go in this message |
| Gift vouchers | Promo codes: % or fixed, single-use, expiry, nightly rate only. No gift cards | Sell vouchers ourselves (Phase 3) and issue a single-use code |
| Analytics | GA4, GTM and Meta Pixel can be added to Direct; Hospitable sends a GA4 `purchase` event itself. Checkout ends on booking.hospitable.com with no redirect back | Use the same GA4/GTM IDs on our site and in Hospitable |
| Payments | UK Direct Premium: Hospitable takes payment (Adyen). Apple Pay and Google Pay yes, **Klarna no** | Klarna only on our own voucher checkout |
| API | Read calendar and prices; a `quote` endpoint returns a `booking_url`. **No endpoint to create reservations** | Phase 6 option; keep the token on a server |

**The one real tracking gap: `gclid` doesn't reach Hospitable.**
- The widget forwards UTM tags but drops `gclid`, `fbclid` and the cross-domain `_gl` parameter (all three confirmed in testing).
- So Hospitable's `purchase` event can't be credited to a specific ad click. GA4 will still credit it to the right campaign through UTM tags.
- Hospitable's Meta Pixel sends Page View only.

What to do about it:
1. **Tag every Google and Meta ad with UTMs** (keep auto-tagging on as well).
2. **To start, optimise Google Ads on our own events:**
   - `booking_handoff` (secondary conversion);
   - voucher purchases, once Phase 3 ships (primary, with full `gclid`).
3. **Test whether Hospitable stores the forwarded `source` parameter on the reservation.**
   - If it does, put a hand-off ID in `source` and match bookings back to the ad click.
   - Then upload stay bookings to Google Ads as offline conversions.
4. **Optimise Meta campaigns on our landing-page events** (`select_conversion_path`, `booking_handoff`), not on Hospitable's pixel.

**Pete's Hospitable to-do list:**
1. Copy the booking-widget embed code (one site UUID, three property IDs) into `src/content/hospitable.js`, or send them over.
2. Create the custom upsells at V1 prices, with "during booking" on:
   - Celebration £55 (all retreats);
   - Slow Stay £68, early arrival £40, late departure £50;
   - hot tub £45 (bus only);
   - pool & sauna £45 (yurt only).
3. Set a custom cancellation policy: free within 48 hours of booking. Decide the rule for last-minute bookings.
4. Add the "New reservation" message with the video-guide links.
5. Do Direct bookings carry a cleaning or service fee? Promo codes only cover the nightly rate, which affects how vouchers are worded.
