// Guru Vault — content data
// Add a new guru by pushing another object into GURUS, shaped the same way.
// Nothing in index.html / app.js needs to change to add a guru or a module.

const GURUS = [
  {
    id: "sam-stoffel",
    name: "Sam Stoffel",
    status: "populated",
    tagline: "“Build backwards” — product first, buyer second, content last.",
    credibility:
      "Built and sold Outplayed (formerly Profit Accumulator), a matched-betting subscription platform, for £10M+. Now runs a ~1M-follower personal brand teaching “content creators how to turn their attention into a profitable business,” sells The Filthy Rich Accelerator / Filthy Rich Playbooks course series, and is launching a creator-tools SaaS, Subspot.",
    source: "The Filthy Rich Playbooks — FRCS (Niche / Brand / Attention / Offer / Sales), 5 PDF modules",

    scorecard: [
      { label: "Personal-brand dependency", value: 95, note: "The founder's own face, voice and trust ARE the distribution engine — the whole funnel assumes someone is willing to be on camera constantly." },
      { label: "Proof-before-build rigor", value: 90, note: "“Validation” is one of only four non-negotiables before he'll touch a niche or product." },
      { label: "Price posture: premium", value: 85, note: "Explicitly anti-discount. Prices rise as trust compounds; guarantees replace discounts as the risk-reversal lever." }
    ],
    chips: [
      { label: "Content cadence", value: "High-volume, near-daily short-form video" },
      { label: "Time to paid offer", value: "Can be instant (Route 1) or 1–2 years of free content first (Route 2)" }
    ],

    dimensions: {
      niche_method: "Four-filter check — Pain, Ability to Pay, Validation, Personal Experience — before committing to any product or niche. No premium on “original” ideas; premium on proof.",
      trust_mechanism: "Public track record + genuinely valuable free content (“give away the information, sell the implementation”), compounding through a Trust Spiral: promise → deliver → trust → sale → repeat.",
      content_engine: "Short-form video run on Hook → Hold → Reward → Action, built from proven “outlier” formats (videos that beat the creator's own average) rather than invented from scratch.",
      offer_construction: "Promise ladder (Feature → Result → Emotion → Identity) plus pre-emptive objection-killing (3 Levels of Disbelief) and strong guarantees, positioned as the premium option rather than the cheap one.",
      sales_mechanics: "The Social Magnet Funnel: content → single CTA → DM conversation → free lead magnet (email capture) → paid offer pitched at the moment the free value lands → automated nurture sequence → advocacy.",
      monetization_ladder: "Free content → lead magnet → paid course/community (The Filthy Rich Accelerator) → SaaS (Subspot) — each rung sized to solve the next problem the previous one surfaced.",
      primary_risk: "Every stage is bottlenecked on one person's on-camera output and personal trust. Virtually all proof in the course is self-sourced (his own businesses, his friends' businesses) — no independent verification.",
      capital_required: "Low cash, very high personal time — built via 110-hr weeks and (for the personal-brand business) 1–2 years of unpaid content production before the first paid offer existed."
    },

    modules: [
      {
        id: "niche",
        stage: "01",
        stageLabel: "Niche",
        color: "teal",
        pdfTitle: "FRCS Module 01 — Own Your Niche",
        thesis:
          "Don't chase virality or a random audience. Decide the product and the exact buyer first — “build backwards” — then create content purely to attract that buyer. Pick the niche itself using four non-negotiable filters instead of searching for a revolutionary idea.",
        frameworks: [
          { label: "Build Backwards", desc: "Product (1) → Buyer (2) → Content (3). The wrong way round: Content → random viral audience → “what can I even sell these people?”" },
          { label: "Two Routes, One Principle", desc: "Route 1: build the product, then attract buyers (Outplayed). Route 2: plan the product, then build the audience while it's still in development (his personal brand / Subspot). Either order is fine as long as product + buyer are decided before content." },
          { label: "The Four Non-Negotiables", desc: "Pain (a real, urgent problem) → Ability to Pay (the audience has money and willingness) → Validation (someone else is already making money doing something similar — proof beats guesswork) → Personal Experience (you've lived the problem, so you can teach it credibly)." },
          { label: "The Brand Deal Trap", desc: "Brand deals, UGC, dropshipping and affiliate sales pay once and leave the brand owning the customer and the compounding value. Only a small slice of creators (deeply trusted, narrow audiences) make brand deals a reliable business." },
          { label: "Copy and Pivot Method", desc: "Find What Works → Understand Why → Improve It → Test Your Version. “Copy the f*** out of everything” — but at the level of principle, never verbatim." },
          { label: "Competitor-Weakness Sourcing", desc: "A profitable competitor drowning in bad reviews is the strongest green flag going: proven demand plus a visible, fixable gap." },
          { label: "Narrow Targeting", desc: "“When you speak to everybody, you speak to nobody.” The sharper the persona, the more powerful the message. Best default target: your own past self, before you solved the problem." }
        ],
        tactics: [
          "Decide the product first.",
          "Decide exactly who the buyer is.",
          "Only then create content aimed at that buyer — never at going viral for its own sake.",
          "Screen any niche or product idea against Pain / Ability-to-Pay / Validation / Personal-Experience before committing.",
          "Avoid building a business entirely on brand deals, UGC, dropshipping or affiliate sales — own a product.",
          "Research existing proven products in (and outside) the category: structure, pricing, acquisition.",
          "Use the competing product yourself; mine its reviews and complaints for the gap you can fill.",
          "Narrow the target persona until it's “me, ten years ago,” not “anyone who wants to get rich.”",
          "Refine the niche and positioning over time through live testing, not upfront perfection."
        ],
        quotes: [
          "A view only matters when it leads somewhere.",
          "If it isn't driving sales, it is pointless.",
          "You don't need a revolutionary idea. You need a problem worth solving.",
          "Your experience is what makes your knowledge useful to somebody who's still struggling.",
          "When you speak to everybody at once, you're speaking to nobody."
        ],
        examples: [
          { who: "Outplayed / Profit Accumulator", what: "Matched-betting subscription platform, grew past 150k users, sold for £10M+. Built the product first (110-hr weeks), then narrowed the buyer from “anyone who wants a subscription business” to “founders who want to build a business on their personal brand.”" },
          { who: "“Toys and Me” kids' mobile game", what: "Hit #1 on the App Store, generated almost no revenue — the audience (8-year-olds) had no way to pay. The cautionary case for the Ability-to-Pay filter." },
          { who: "Kajabi ($2B valuation) & Chargebee ($100M→$200M revenue)", what: "Both profitable, both buried in 1-star reviews — the basis for his own SaaS launch, Subspot: proven demand plus a visible, fixable gap." },
          { who: "Miss Excel", what: "A deliberately “boring” niche (Excel tutorials) turned into a high-revenue course business via personal experience plus validated demand." },
          { who: "Shelby Sapp", what: "Repositioned a crowded niche (high-ticket sales) around a specific identity — “pink Porsches, Pilates, matcha” — instead of generic “I teach sales.”" }
        ]
      },
      {
        id: "brand",
        stage: "02",
        stageLabel: "Brand",
        color: "orange",
        pdfTitle: "FRCS Module 02 — Own Your Brand",
        thesis:
          "A personal brand isn't follower count — it's reputation: the deliberate association people make with your name. Build trust by delivering on promises, give away your best knowledge to create discovery and authority, show genuine personality instead of performing, and convert an audience into a movement that believes in your mission.",
        frameworks: [
          { label: "The Trust Spiral", desc: "Make a promise → deliver a result → generate trust → more sales → repeat." },
          { label: "Four Elements of a Magnetic Brand", desc: "Category Ownership (the go-to for a specific problem/result), Generosity (give away genuine value), Personality (a reason to connect beyond expertise), Movement (a community that believes in what you stand for)." },
          { label: "Four Requirements of Category Ownership", desc: "Packaging (carve a specific space), Stories & Experience (your journey as credibility and connection), Repetition (same core message, many formats, until the association is automatic), Proof (personal proof = you achieved it; shared proof = you helped others achieve it)." },
          { label: "Give Away the Information, Sell the Implementation", desc: "Three tiers: Do It Yourself (free information) → Done With You (course/coaching) → Done For You (full service)." },
          { label: "“Keep Giving Until They Ask”", desc: "His update on GaryVee's “Jab, Jab, Jab, Right Hook” — build goodwill on a long runway before any ask." },
          { label: "Movement-Building Toolkit", desc: "A manifesto (identity declaration), a badge of honour (merch/symbols), milestone clubs (progress made visible and social), and a genuine “common enemy” (a broken system or belief to unite against — never a person, never manufactured)." }
        ],
        tactics: [
          "Decide what you want to be “known for” — one specific category, not everything.",
          "Build a “story bank”: work backwards from your current result to the past struggle, beliefs shed, mistakes and the turning point — each story should teach something, not just flatter you.",
          "Reinforce the same central message repeatedly, in different formats and angles, until the association is automatic — don't pivot out of boredom.",
          "Start without formal proof if necessary (experience + honesty is enough early); layer in personal and shared proof as results arrive.",
          "Publish genuinely valuable free content — not watered-down teaser content — to build a discovery engine and authority before asking for money.",
          "Sell speed, ease, support and tooling (implementation), not gatekept information.",
          "Overdeliver after the sale; handle refunds generously — an unhappy customer's bad review costs more than the refund.",
          "Speak on camera like you're talking to one mate on FaceTime, not a scripted newsreader; don't chase a “correct” internet personality.",
          "State genuine opinions publicly, even polarising ones.",
          "Define the ideal customer precisely, build shared language/manifesto, recognise milestones publicly, and name what the movement stands against."
        ],
        quotes: [
          "You get bored of your message long before your audience remembers it.",
          "Give away the information. Sell the implementation.",
          "Nobody cares how much you know until they know how much you care.",
          "The price of being strongly loved by some people is being disliked by others. The price of love is hate."
        ],
        examples: [
          { who: "Outplayed", what: "Launched with no following; trust from delivered results drove early sales. Later products sold on trust alone despite “a couple thousand followers.” 4.9/5 trust rating; ~£70k–£100k/month from word-of-mouth. Ran an internal “1K/5K/10K Club” milestone system and “Post Your Big Wins” threads." },
          { who: "Dara (Facebook ads expert)", what: "Gave away genuinely useful free TikTok advice; Stoffel implemented it, trusted her, then paid her agency £100k–£150k/month for Facebook ad management — free information converting into a paid “done for you” relationship." },
          { who: "Apple, Nike × Michael Jordan, Louis Vuitton/Hermès/Chanel, Gymshark", what: "Brand-as-identity examples: people buy status and belonging, not just product features." },
          { who: "His own unscripted rant video", what: "2.7M views and 60k new followers from one unedited, un-polished post — raw passion outperforming polish." }
        ]
      },
      {
        id: "attention",
        stage: "03",
        stageLabel: "Attention",
        color: "violet",
        pdfTitle: "FRCS Module 03 — Win Their Attention",
        thesis:
          "Content isn't the business — it's the vehicle that moves the right strangers toward trusting and buying from the business. Hook the right person, hold them with curiosity, reward them with the promised payoff, then give one clear next action — repeated at volume, in a few repeatable formats, starting from proven “outlier” ideas rather than guessing from scratch.",
        frameworks: [
          { label: "Hook → Hold → Reward → Action", desc: "The 4-stage structure for every piece of content. Hook stops the scroll AND filters for the right audience; Hold uses a curiosity loop to sustain watch-time; Reward delivers exactly what the hook promised; Action asks for exactly one next step." },
          { label: "Content Creator vs. “Creator CEO”", desc: "A content creator optimises for views and virality; a Creator CEO asks “whose attention do I need to drive sales, and how do I get it” — 100 engaged buyers beat 10 million random viewers." },
          { label: "Curiosity Loop", desc: "Open a promise or question early; deliberately delay the answer until the reward stage to sustain watch-time." },
          { label: "The 3 Metrics That Matter", desc: "Skip Rate, Watch Time, Shares — the real signals platforms reward, replacing likes/comments/follower count." },
          { label: "Outlier Theory", desc: "A video is an “outlier” when it dramatically outperforms a creator's OWN average — not about absolute view count. Outliers reveal proven hooks/topics/formats worth adapting, from your niche or completely different ones." },
          { label: "Copy the Principle, Not the Person", desc: "Use a proven outlier as a structural starting point, understand why it worked, then rebuild it in your own voice — word-for-word copying destroys trust." },
          { label: "Repeatable Formats", desc: "A reusable structural premise (topic/guest changes, structure doesn't). Lets you batch-produce many videos in one session instead of inventing from scratch each time." },
          { label: "Audience Fit Decision Tree", desc: "Keep it (existing followers show buying intent) → Reposition it (close but unclear) → Start again (wrong audience, no buying intent) — judged by evidence (DMs, clicks, sign-ups) not vanity engagement." }
        ],
        tactics: [
          "Before posting, answer “what am I selling, who needs it, does this move them closer to my business” — not “what should I post.”",
          "Be selective with trend content (he estimates <2% of his own posts) — only if it's relevant to the niche, not just because it's trending.",
          "Audit whether the existing audience can actually buy the product (DMs, clicks, sign-ups, questions) — decide keep / reposition / restart accordingly.",
          "Build hooks that are simultaneously attention-grabbing AND self-filtering for the right viewer.",
          "Use a three-part hook in the first 3 seconds: visual pattern interrupt, verbal hook, on-screen text promise — cut dead intros entirely.",
          "Open a curiosity loop early; don't resolve it until the reward.",
          "Deliver exactly the payoff the hook promised — no more, no less.",
          "End with exactly one explicit call to action — never a stack of asks.",
          "Repost/reshoot whatever organically outperforms, as a paid ad.",
          "Scroll deliberately to find outliers in your niche and adjacent ones; identify why each worked; rebuild it in your own voice.",
          "Prioritise volume — “create, publish, analyse, repeat” — diagnose underperformance via skip rate/watch time/conversion, not “the algorithm.”",
          "Pick 1–2 recurring formats and batch-film many variants per session rather than inventing unrelated ideas each time."
        ],
        quotes: [
          "Social media is not your business. It's a tool that brings people to your business.",
          "You can't judge content on views alone. You need to ask who watched it, what they now associate you with, and whether it brought the right people closer to your product.",
          "Stop trying to beat the algorithm. Make better content.",
          "Volume negates luck."
        ],
        examples: [
          { who: "His own “viral but irrelevant” videos (bakery visit, private jet joke)", what: "Millions of views, deliberately framed as proof that not all attention is worth the same." },
          { who: "A friend with 15M YouTube subscribers (family-entertainment channel)", what: "Only “a couple hundred thousand a year” — wrong-audience problem; recommended a second, separate channel rather than repositioning the main one." },
          { who: "Isabel Lorna", what: "An audience so trusting it can sell almost anything, earned via years of specific-niche content; also used a pre-launch curiosity-loop video (dropping objects) ahead of a product launch." },
          { who: "Bryan Johnson's “60 seconds” format", what: "Copied into Stoffel's own “everything I've learned about getting rich with social media in 60 seconds,” which performed well." },
          { who: "A superyacht Twitter post (“and you think 10k a month is impossible”)", what: "Adapted into his most viral selfie video, then re-shot multiple times (helicopter, holiday) with repeated success." },
          { who: "Dan Koe's “How to Get Ahead of 99% of People”", what: "Spawned Alex Hormozi's and Dan Martell's own variants of the same format." }
        ]
      },
      {
        id: "offer",
        stage: "04",
        stageLabel: "Offer",
        color: "magenta",
        pdfTitle: "FRCS Module 04 — Nail Your Offer",
        thesis:
          "An offer isn't a list of features — it's a promise of transformation. The strongest offers combine a deep promise (result → emotion → identity) with systematic removal of every reason to say no, then charge a premium for it rather than competing on price.",
        frameworks: [
          { label: "The Four Levels of a Promise", desc: "Feature (what it has) → Result (what the customer gets) → Emotion (how they feel) → Identity (who they become). Features explain the product; identity makes people want it." },
          { label: "The 3 Levels of Disbelief", desc: "“I don't believe you” → “It won't work for other people” → “It won't work for me.” Each needs trust/social proof, testimonials, and personalised proof respectively." },
          { label: "Objection → Solution Mapping", desc: "List every customer objection, then build a specific asset (video, PDF, testimonial, tutorial) that kills it pre-emptively — ideally repackaging the objection itself as a bonus." },
          { label: "Conditional vs. Unconditional Guarantees", desc: "An unconditional guarantee (“not happy? money back, no conditions”) builds more trust and more sales than a conditional one with restrictive clauses." },
          { label: "The Time and Effort Equation", desc: "Less time + less effort required of the customer = higher perceived value = ability to charge more." },
          { label: "The 3 Levels of Service", desc: "Do-It-Yourself (course) → Done-With-You (coaching/accelerator) → Done-For-You (agency). Less customer effort = more valuable offer, but more delivery cost." },
          { label: "Scarcity vs. Urgency", desc: "Scarcity = limited quantity; urgency = limited time. Both must be genuine — fake scarcity destroys trust permanently." },
          { label: "Price Anchoring / Premium Positioning", desc: "Positioning as the premium option (not the cheapest) increases perceived value, margin, and reinvestment capacity." }
        ],
        tactics: [
          "Build the promise ladder (feature → result → emotion → identity) before writing any sales copy.",
          "List every customer objection and build a specific proof asset or bonus for each.",
          "Collect testimonials/reviews aggressively, timed to when customers are happiest; feature “big win” stories the audience identifies with.",
          "Offer a guarantee — ideally unconditional, or a bold results-based one.",
          "Offer payment plans on expensive products to cut upfront friction without discounting.",
          "Audit the delivery model and remove time/effort wherever possible — tools, automation, done-for-you tiers.",
          "Use genuine scarcity/urgency sparingly (he says 2–3× a year max) — real capacity limits or real deadlines only, never faked.",
          "Price as the premium option, not the cheap one; raise prices over time; reinvest margin into product, support and experience."
        ],
        quotes: [
          "Stop selling the thing. Start selling the transformation.",
          "The goal is to make the customer feel that trying your product is less risky than walking away.",
          "Charge what you're worth. Then make sure you're worth every penny.",
          "Your goal isn't to sell the most products. It's to build the most profitable, valuable business you can."
        ],
        examples: [
          { who: "Outplayed vs. OddsMonkey", what: "Feature-matching a competitor's calculators did nothing for conversion; switching to a transformation-led message (“make £2,000 a month tax-free, easily”) worked." },
          { who: "Outplayed guarantee", what: "£100-profit-in-30-days-or-we-pay-you-£100." },
          { who: "Outplayed Pro (launched late 2023)", what: "A £1,000–£2,000/yr premium tier versus the original ~£20/mo (25k subscribers in 2021) — fewer than half the subscribers, but more total revenue." },
          { who: "2017 price-cut mistake", what: "Cutting from ~£35/mo to compete lost margin without fixing retention; reversed from 2019 onward, raising the membership from £97 to ~£600/yr." },
          { who: "Steam Chaser (£2,000 product)", what: "A pay-in-3 plan drove strong uptake with no discounting at all." }
        ]
      },
      {
        id: "sales",
        stage: "05",
        stageLabel: "Sales",
        color: "green",
        pdfTitle: "FRCS Module 05 — Engineer Your Sales",
        thesis:
          "Attention alone doesn't generate revenue — a deliberate funnel system is needed to move strangers through five psychological stages into becoming customers, and then into “raving fans” who buy again and bring in new customers themselves.",
        frameworks: [
          { label: "The 5 Stages of the Buying Journey", desc: "Attention (“I see it”) → Interest (“I like it”) → Desire (“I need it”) → Action (“I'm getting it”) → Advocacy (“I love it”). Not uniform speed — some buy in minutes, others need months of content." },
          { label: "The Social Magnet Funnel", desc: "Seven steps: Content → Call to Action → DM Conversation → Free Value/Lead Magnet (+ email capture) → Paid Offer → Nurture → Raving Fan. Adaptable — steps can be skipped or reordered." },
          { label: "“Two Jobs” Rule", desc: "Every funnel element either Builds Trust or Inspires Action — nothing else." },
          { label: "Rented vs. Owned Media", desc: "Social followers are “rented” from the platform (algorithm-dependent, deletable overnight); the email list is the owned, direct asset — hence the funnel's central goal is email capture." },
          { label: "Free-to-Paid Progression", desc: "The lead magnet fully solves one specific problem, which naturally surfaces the next problem the paid offer solves." },
          { label: "Segmentation via Two Questions", desc: "“Where are you now?” and “What are you trying to achieve?” — tailors messaging instead of blanket marketing." },
          { label: "Funnel-as-Diagnostic", desc: "Drop-off at each stage is a diagnosable bottleneck: no followers → content/CTA problem; views but no DMs → weak CTA/lead magnet; leads but no sales → weak offer/sales page." },
          { label: "Automated Email Sequence", desc: "Welcome + free value → stories/lessons → social proof → objection handling → paid offer — written once, nurtures every subscriber automatically." }
        ],
        tactics: [
          "Split content roughly 60–70% new-audience attraction, 30–40% nurture of existing followers.",
          "Give every piece of content one clear CTA promising something specific in return.",
          "Ask for exactly one action — never stack multiple CTAs.",
          "Move interested commenters/DMers into a private 1:1 DM conversation — only people who already signalled interest, never cold DM.",
          "Automate the initial DM response (e.g. keyword-triggered), but layer in genuine human touches (voice notes) to preserve trust — “automate the process, not the relationship.”",
          "Qualify/segment via one or two low-friction tap questions, not forms.",
          "Deliver a lead magnet that fully solves one narrow, real problem in exchange for an email address.",
          "Pitch the paid offer immediately after the free resource is consumed, framed as the obvious next step.",
          "If no sale: diagnose whether it's a clarity/sales-page problem or a trust problem, then keep nurturing rather than forcing the close.",
          "Post-sale: overdeliver and give customers something to believe in, converting them into advocates who refer others.",
          "Prioritise email quality over frequency — “one brilliant email a week” beats daily filler."
        ],
        quotes: [
          "Don't just build an audience. Build a system that turns that audience into customers.",
          "If you don't ask, you don't get.",
          "The free stuff wasn't costing us customers. It was creating them.",
          "Emails are f***ing awesome."
        ],
        examples: [
          { who: "Outplayed", what: "Gave away full training plus two best bookmaker offers and software for free (no card required) after seeing a friend's fitness business outperform his by using free value as a “shop window.” Ran email social-proof campaigns (“things members have bought with their profits”) and objection-handling subject lines (“Is this a scam?”). Segmentation revealed existing gamblers, not the largest segment, were the most valuable customers." },
          { who: "Dan Martell", what: "DM-keyword funnel (“DM me COACH”), replying with personal voice notes rather than obvious automation." },
          { who: "Shelby Sapp", what: "Caption keyword-comment CTAs (CLASS/COACH) triggering auto-DMs; a “Hot Girl Sales Mindset” lead magnet sets up ongoing free tips." },
          { who: "Alex Hormozi", what: "$100M Offers → $100M Leads — the textbook free-to-paid problem progression." },
          { who: "Sam's own “Filthy Rich Audit”", what: "A personalised diagnostic-quiz lead magnet (thousands of branching outcomes) funnelling into his own Accelerator program; ran a 2-year pure-free-value strategy before making any offer, until inbound demand (“Can I hire you?”) built up." }
        ]
      }
    ]
  },

  {
    id: "daniel-priestley",
    name: "Daniel Priestley",
    status: "populated",
    tagline: "Become impossible to overlook: Pitch, Publish, Product, Profile, Partnership — always in that order.",
    credibility:
      "Founded his first company in Australia at 21; by 25 he and his partners had grown it to a national business turning over several million dollars. Moved to London in 2006 with a suitcase and a credit card, and grew a new venture to seven-figure revenue within two years. Now runs Dent Global, a worldwide entrepreneurship and leadership program (including the 40-week Key Person of Influence Program), and is the author of Entrepreneur Revolution, Oversubscribed and Key Person of Influence.",
    source: "Key Person of Influence (Revised Edition, 2014) — the Five-Step KPI Method (Pitch / Publish / Product / Profile / Partnership), full book text",

    scorecard: [
      { label: "Personal-brand dependency", value: 85, note: "The method assumes you become a publicly visible figure with a pitch, a book and a profile — the five steps ARE the distribution engine." },
      { label: "Proof-before-build rigor", value: 45, note: "No structured feasibility filter. The micro-niche is chosen mainly on passion and personal story; there's no equivalent of a Pain/Ability-to-Pay/Validation screen before committing." },
      { label: "Price posture: funnel-to-coaching", value: 80, note: "Nearly every chapter points to a paid resource — the KPI Scorecard, the Brand Accelerator event, or the 40-week KPI Program. The book is the top of its own sales funnel." }
    ],
    chips: [
      { label: "Core sequence", value: "5 fixed steps: Pitch → Publish → Product → Profile → Partnership" },
      { label: "Claimed timeline", value: "States readers will become a KPI in their industry “within the next twelve months” — no evidence cited for that figure" }
    ],

    dimensions: {
      niche_method: "Pick a 'micro-niche' narrow enough to own outright — a specific audience or problem, not a broad industry. No structured feasibility filter; selection is driven mostly by personal passion, story and existing experience, not validated demand.",
      trust_mechanism: "Credibility stacked across five visible, checkable proofs: a rehearsed, specific pitch; a published book or set of articles; a productised offer; a 'web-famous' online profile; and named partnerships. Authority comes from being seen to have already done the work, not from independent, third-party verification.",
      content_engine: "A short, memorised 'social pitch' used in every conversation, expanded into a longer presentation pitch for stages and media, then repurposed into a 30,000–50,000-word book and a set of articles. Content exists to open doors (speaking slots, media, referrals), not to run a high-volume social-video funnel.",
      offer_construction: "A 'product ecosystem': free or cheap high-volume products (podcasts, info kits, webinars) that spread ideas and build relationships, paired with high-value productised services that monetise implementation. Even one-to-one services are told to be 'productised' — named, documented, packaged — rather than sold as raw hours.",
      sales_mechanics: "Deal flow runs mainly through partnerships, not a content funnel: affiliate deals, co-promotion (database swaps), joint product creation, 'packaging up' with complementary businesses, and free-bundle giveaways. Networking is explicitly reframed from 'find clients' to 'find leverage' — people with a list, a product or a brand to combine with.",
      monetization_ladder: "Free pitch/content → published book (credibility, near-zero direct revenue) → productised services and products (the real revenue) → partnership deals (joint-venture revenue, referral commissions) → his own paid 40-week KPI Program and live events, which the book itself promotes throughout.",
      primary_risk: "The book is simultaneously the free content and the sales funnel for its own paid coaching program and live events — almost every chapter ends with a pointer to an upsell. Every named case study is Priestley's own paying client, not an independent or random sample, and the headline claim ('you will become a KPI within 12 months') is stated as a near-certainty with no study or data cited.",
      capital_required: "Low cash outlay (a self-published book, pitches and partnership outreach cost time rather than money) but a very large time investment: writing a full book, building a profile across five or six platforms and running sustained partnership outreach are all described as near-full-time undertakings, especially in the first 12 months."
    },

    modules: [
      {
        id: "pitch",
        stage: "01",
        stageLabel: "Pitch",
        color: "teal",
        pdfTitle: "Key Person of Influence — Step 1: Pitch",
        thesis:
          "Before anything else, be able to answer “What do you do?” in a way that produces an emotionally charged reaction, not a polite one. A clear, specific, benefit-led pitch built around a personal “Big Game” (your mission) is the foundation every other step depends on — a weak pitch produces a boring book, unsellable products and a confusing profile.",
        frameworks: [
          { label: "The Big Game", desc: "Your personal mission — must be fun, have rules, have players, a prize, a way to win and a way to lose. Framed as the emotional engine behind a pitch that actually moves people." },
          { label: "Social Pitch vs Presentation Pitch", desc: "A short one-line answer used daily in conversation, rebuilt around the listener's payoff rather than your job title; a longer presentation pitch (problem → impact → solution → proof → ask → uplift) for groups and media." },
          { label: "Beware the Polite Response", desc: "A “sounds interesting” reaction means the pitch failed. The target is an emotionally charged response — they want to act, refer you on, or push back hard — not polite disengagement." },
          { label: "Micro-niche, Sniper Not Shotgun", desc: "Pitch for a narrow, specific type of client or project and explicitly turn away anything outside it, rather than a broad pitch aimed at everyone." }
        ],
        tactics: [
          "Rewrite the one-line answer to “What do you do?” around the listener's payoff, not your job title or industry.",
          "Pick one specific micro-niche to pitch for and say no to opportunities outside it.",
          "Write a structured presentation pitch: position credibility → state the problem noticed → show its wider impact → offer the solution → prove it → ask for something specific → end on an uplifting note.",
          "Treat strong pushback (“that won't work”) as useful data, not rejection — ask why, then use the answer to strengthen the pitch.",
          "Rehearse the pitch on hundreds of people one-to-one before taking it to a stage or the media."
        ],
        quotes: [
          "A perfect pitch powers performance.",
          "Beware of the polite response.",
          "When you try to catch everyone in your net, you catch no one.",
          "If your pitch sounds too rehearsed, you haven't rehearsed it enough."
        ],
        examples: [
          { who: "Mike Symes", what: "Rewrote his pitch from “I have a financial marketing agency” to a specific, benefit-led line; within six months was appointed Chairman of an industry body and fielding inbound interest from the CEO of a major UK bank." },
          { who: "Paul Fowler", what: "Built his pitch around a personal “Spitfire Project” dream for his flight school; pitching it to anyone who'd listen led to a double-page magazine feature and BBC/Channel 4 interest before any product existed." },
          { who: "Darren Finkelstein", what: "Told “you're not in the boat sales business, you're in the boat ownership business” — the reframed pitch anchored everything that followed, including a book written in 200 days and a dozen new ownership services." }
        ]
      },
      {
        id: "publish",
        stage: "02",
        stageLabel: "Publish",
        color: "orange",
        pdfTitle: "Key Person of Influence — Step 2: Publish",
        thesis:
          "Publishing — ideally a full book, otherwise ten-plus articles — turns a pitch into checkable credibility. Writing forces clarity and generates intellectual property; the book's job is to open doors (speaking, media, referrals), not to sell copies directly.",
        frameworks: [
          { label: "Five Book Types", desc: "Niche/thought-leadership (your own take), book of interviews (featuring other KPIs), book of tips (quick and scannable), picture book (visual proof), or a creative/narrative piece — each with a different production cost and credibility payoff." },
          { label: "Publishing Creates Credibility, Products Create Cash", desc: "A book, articles and reports build trust and connections; they aren't expected to be a meaningful revenue line on their own — monetisation happens at the Product step." },
          { label: "Plan Before You Write", desc: "Map the reader's core question and every sub-question on paper first, then arrange it into chapters — writing becomes fast once the plan exists." },
          { label: "Gift, Don't Sell, the Book", desc: "Hand out copies strategically instead of chasing sales volume — framed as “the best business card there is.”" }
        ],
        tactics: [
          "Decide which of the five book types fits before starting to write.",
          "Spend several hours mapping the reader's core question and sub-questions before drafting a word.",
          "Choose a title that states the niche plainly rather than something clever or cryptic.",
          "If a full book isn't realistic yet, commit to 10+ articles (1,000–1,500 words) on the niche and pitch them to a relevant trade publication.",
          "Use the finished book as a gift to prospects and referral partners rather than relying on retail sales."
        ],
        quotes: [
          "It's no coincidence that the word 'authority' has the word 'author' in it.",
          "A book has no power until it's finished.",
          "The purpose of your book is to promote you, not the other way around."
        ],
        examples: [
          { who: "Paul Fowler", what: "Pitched a magazine article on his Spitfire Project before any book existed; the resulting coverage generated speaking invitations and investor interest ahead of a formal launch." },
          { who: "Jacqui Sharples", what: "Wrote “If Your Body Could Talk,” a creative book of letters from the body to its owner, instead of a conventional how-to guide — repositioned her from corporate engineer to fitness entrepreneur." },
          { who: "Darren Finkelstein", what: "Published “Honey, Let's Buy a Boat” in 200 days, covering the full ownership journey rather than a sales pitch for his dealership." }
        ]
      },
      {
        id: "product",
        stage: "03",
        stageLabel: "Product",
        color: "violet",
        pdfTitle: "Key Person of Influence — Step 3: Product",
        thesis:
          "Turn the pitch and the published ideas into a product ecosystem: high-volume free or cheap products that spread ideas and build relationships, alongside high-value productised services that monetise implementation — money follows ideas that have been packaged, not raw time sold by the hour.",
        frameworks: [
          { label: "Two Types of Products", desc: "High-volume (podcasts, info kits, webinars — built for relationships and reach) alongside high-value (packages built for profit, usually implementation of the free ideas)." },
          { label: "Implementation, Not Ideas", desc: "Information has fallen in value because it's freely available; the money is in productised help getting it done — give away the recipe, sell the cooked meal." },
          { label: "Productised Services", desc: "Even a one-to-one service can be named, given a documented method and supporting materials, rather than sold as undifferentiated hours." },
          { label: "Built to Scale", desc: "Design products so they could, in principle, be delivered anywhere (online delivery, licensing, local partners) rather than being geographically capped from day one." }
        ],
        tactics: [
          "Create at least one free, high-volume product (podcast, downloadable kit, or webinar series) that shares real value before any sale is asked for.",
          "Package a core service around the ideas already published, giving it a name, a documented method and supporting materials.",
          "Consider productising insight for competitors or complementary businesses as a second revenue stream.",
          "Check every product against 'is this high-volume relationship-building or high-value profit-making', and make sure both types exist in the mix."
        ],
        quotes: [
          "Products don't sleep.",
          "The real money comes from offering an implementation solution.",
          "A chef who sells a lot of recipe books makes more money for their time even though everyone has access to the recipes."
        ],
        examples: [
          { who: "Jacqui Sharples", what: "Turned a personal passion for fitness into a 12-week “Love Your Body, Love Your Life” corporate-women programme, replacing her engineering salary within a few months of launch." },
          { who: "Darren Finkelstein", what: "Added roughly a dozen new productised services around boat ownership (servicing, valet parking, ownership coaching) rather than only selling boats." },
          { who: "Mike Symes", what: "Built a branding assessment tool so prospects could engage with his thinking online before any paid engagement, alongside his marketing consultancy." }
        ]
      },
      {
        id: "profile",
        stage: "04",
        stageLabel: "Profile",
        color: "magenta",
        pdfTitle: "Key Person of Influence — Step 4: Profile",
        thesis:
          "Deliberately build a web-visible online presence so that anyone who searches a name finds a coherent, credible picture — proof, coverage and content that turns curiosity into contact. Framed as unavoidable rather than optional: “you are who Google says you are.”",
        frameworks: [
          { label: "Six Objectives for Building a Profile", desc: "Generate leads, convert leads into sales, increase average spend, increase purchase frequency, reduce marketing/service costs, and improve overall brand — explicit business reasons for a profile beyond vanity." },
          { label: "The 7-Hour Research Window", desc: "A buyer typically spends around seven hours researching a significant purchase; profile content exists to be found and to educate during that window, not to shout at a cold audience." },
          { label: "Platform Checklist", desc: "A named, period-specific list of platforms to maintain a presence on, kept current and consistent rather than set up once and abandoned." }
        ],
        tactics: [
          "Publish a video version of the core pitch, an interview, and shared ideas to a platform like YouTube.",
          "Keep profiles on the main relevant platforms active and consistent, revisited monthly rather than set-and-forgotten.",
          "Audit what currently appears when searching your own name, and work to remove or crowd out anything that undermines the pitch.",
          "Treat every piece of free content as occupying part of a buyer's research window — it should be findable when they're deciding, not only when they're already a lead."
        ],
        quotes: [
          "You are who Google says you are.",
          "Nothing is more disappointing than meeting someone who seems interesting, but who doesn't come up in a Google search.",
          "Social media allows you to have a conversation with people who care about what you have to say for almost no cost whatsoever."
        ],
        examples: [
          { who: "“The Posture Doctor” (a chiropractic client)", what: "Launched a YouTube channel of posture-correction advice and reached over a million views in its first year by focusing the profile entirely on one niche." },
          { who: "Jane Malyon", what: "Set and achieved a Guinness World Record for the largest gathering sharing English cream tea, generating BBC and press coverage for her new product line." },
          { who: "Justine Priestley", what: "Built a film/media production company's profile (Really Bright Media) and spoke at international conferences, using a public video presence as a route into acting rather than the traditional casting-call path." }
        ]
      },
      {
        id: "partnership",
        stage: "05",
        stageLabel: "Partnership",
        color: "green",
        pdfTitle: "Key Person of Influence — Step 5: Partnership",
        thesis:
          "The “money step”: real scale comes from combining resources with other Key People of Influence — their client lists, products, brands or distribution — rather than growing alone. Deals are pitched as mutual wins, confirmed in writing, and pursued by deliberately networking for leverage rather than for clients.",
        frameworks: [
          { label: "Five Deal Types", desc: "Affiliate partnerships (commission-based promotion), co-promotion (list/database swaps), product-creation partnerships (co-built offers), packaging up (bundling complementary existing products/services), and free-bundle groups (combined free offers to generate shared leads)." },
          { label: "Network for Partnerships, Not Clients", desc: "Go to events looking for people with a list, a brand, a product or a channel to combine with — not for a sale on the spot." },
          { label: "The Meeting Ritual", desc: "Meet on neutral ground, bring a small thoughtful gift, build rapport before any business talk, keep the business discussion itself to 15–20 minutes, and follow through within minutes on anything promised." },
          { label: "Written Agreements", desc: "Even informal deals should be confirmed in writing — email, Heads of Terms, or a full contract — for everyone's protection, not just the dominant party's." }
        ],
        tactics: [
          "Before networking, define what you're looking for — a list, a product, a brand, a team member, or an introduction — not just 'a sale.'",
          "Pitch potential partners on what you bring to the deal unprompted, rather than waiting to be asked.",
          "Make three specific outreach calls whenever a new idea needs testing, rather than theorising alone.",
          "Confirm every partnership in writing, even if only by email, immediately after agreement.",
          "Follow through within 10–15 minutes on anything mentioned in a meeting — cited as what most differentiates people who get repeat deals."
        ],
        quotes: [
          "Go networking for partnerships, not clients.",
          "A radical idea becomes plausible when you have the right partners.",
          "In three calls a lot can happen if the pitch is right."
        ],
        examples: [
          { who: "Priestley's own London launch", what: "Arrived with no network; a single warm introduction to an online entrepreneurs' network led to a sponsored dinner for 40 Key People of Influence, generating over £100,000 in sales in the launch week." },
          { who: "Jacqui Sharples", what: "Partnered with corporates holding databases of the target audience (corporate women) to distribute her book and programme via strategic alliances rather than paid advertising." },
          { who: "Justine Priestley", what: "Formed joint ventures with her brother's own company and several other referral partners to grow Really Bright Media's client pipeline." }
        ]
      }
    ]
  }

  // Add guru #3 here, same shape: { id, name, status: "populated", tagline, credibility,
  // source, scorecard, chips, dimensions, modules: [...] }
];
