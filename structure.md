# structure.md — site structure reference (reverse-engineered from benshih.design)

Studied on 2026-10-17 with the in-app browser (DOM + computed styles) and WebFetch.
This is the **information architecture and page anatomy** we are replicating for illia.co.
Visual styling comes from `design-superr.md` (v1 theme) and `design-david.md` (alt theme), not from here.

---

## 1. Site map

```
/                      Home (single long page; sections are anchor targets)
/case-study/<slug>     Case study (open)             e.g. /case-study/onboarding
/case-study/<slug>     Case study (locked, passcode) e.g. /case-study/miro-recap
/about                 About (bio, education, timeline, values, outside of work, CTA)
/fun                   "Play" — side projects / indie apps grid
/talks                 Talks & podcasts
/#work  /#fun  /#talks /#contact   Anchors used by the nav + footer
```

Ben's nav is **Home · Play · About · Talks**. Our v1 map (see §8) is **Home · Work · About · Illia LLM** with the Play/Talks slots reserved for "Vibe-coded" projects later.

---

## 2. Global chrome

### Header (not sticky)
- Left: name wordmark ("Ben Shih", 16px, plain text link to `/`). On case-study pages the wordmark gains a 32px round avatar in front of it.
- Centre: pill nav in a white/90 rounded-full container (`radius 999px`, `padding 4px 12px`), items are text links `8px 16px`, 16px/500. Active item gets a filled dark-green pill.
- Right: primary CTA "Say Hello" (black bg, white text, 14px/600, `radius 8px`, `padding 10px 14px`, envelope icon) + a square icon button (LinkedIn).
- Page gutter: `px-5` mobile → `md:px-8` → `lg:px-[120px]`; header has `padding-top 40px` on desktop.

### Floating nav (appears after scrolling past the header)
- `position: fixed; top: 16px; left: 50%` pill with the same 4 links; fades/slides in once the header leaves the viewport. On mobile the same pill is pinned to the **bottom** of the screen (`fixed bottom-0`).

### Floating "assistant" bubble (bottom-right)
- `fixed bottom-8 right-8`, a 66px circle, border `#ddccba`, gradient fill `#fff8ef → #f8ebda`, soft drop shadow `0 18px 45px rgba(82,63,42,.18)`, contains an illustrated avatar. A small notification dot appears later. On our site this slot becomes the **Illia LLM launcher** (in addition to the header entry).

### Footer
- Dark/neutral band with three columns: "On repeat" (a now-playing style widget), "Navigation" (Recent work, Fun Stuff, About me, Contact), "Links" (LinkedIn, Github, Resume, Medium).
- Legal line: "Design, writing, and code © 2026 … All rights reserved." + a cheeky second line ("Using it as a reference? Ask me instead." → mailto with subject prefilled).

---

## 3. Home page anatomy (top → bottom)

Measured at 1024px wide. Total document height ≈ 11,600px.

| # | Section | id | Height | What's in it |
|---|---------|----|--------|--------------|
| 1 | **Hero card** | – | ~850px | A large rounded card (white-ish, subtle dotted-grid background) containing: H1 in three lines ("Hi, I'm Ben. / Product Designer / & Builder." — the last two lines in a second colour), 24px subcopy with inline **company pills** (white pill "Lovable", black pill "Notchflow" — each pill is a link with the company logo), two CTAs: filled pill "Check out recent work" + outlined pill "Learn more about me". Below: a row of 3 teaser cards (Recent work / Indie apps / Public talks), each with a mini headline, 1-line blurb, and a small black button. Also a "Video" tile. |
| 2 | **About teaser** | `#about` | ~584px | Eyebrow "A bit about me"; H2 "Design is how I think. Building is how I prove it."; one paragraph; black button "Learn More About Ben". Hidden on mobile (`hidden md:block`). |
| 3 | **Recent work** | `#work` | ~4,100px | H2 "Some recent work" + small grey note "(from full-time jobs)". A **vertical timeline**: a thin line down the left; each entry has a big greyed-out year (48px, `acorn`, 25 % opacity, with a dot marker) that is **sticky** while its entries scroll; to the right, each project: H3 title (28px), 2-line description, a 16:9 media card (video or image, `radius 12px`), and a CTA — either `Read case study →` (green pill) or a disabled-looking `Password required 🔒` pill. Years: 2026 (1 entry), 2025 (2 entries), 2024, 2023. |
| 4 | **Fun / "Some other things I do"** | `#fun` | ~2,944px | Intro quip. Three sub-blocks, each: H3 + "Explore all …" link. (a) *I build apps* — one large hero card (NotchFlow, "Tap to explore"), (b) *I write* — 4 article cards (read-count badge, title, blurb, tags), (c) *Public talks* — 3 cards (date/venue, blurb, tags). |
| 5 | **Working with me** | – | ~1,414px | H2 "What's it like working with me?"; a short belief statement; a stack of quote/testimonial cards (Polaroid-style, slightly rotated, pinned with a "tape" or pin graphic). |
| 6 | **Contact** | `#contact` | ~689px | H2 "Interested in collaborating?" + "(Or mentoring)"; a **letter card** ("Dear potential collaborator…" signed "Ben", styled as a folded paper note); a "Let's connect" card with three chips (LinkedIn, Resume, Copy My Email) and a mentoring CTA (ADPList). |
| 7 | **Footer** | – | ~450px | see §2 |

### Scroll behaviour on Home
- Every section's content is revealed with a **blur + fade + rise** (`filter: blur(8px) → 0`, `opacity 0 → 1`, `translateY(16px) → 0`), triggered once by an IntersectionObserver. Elements below the fold are literally blurred until they enter the viewport (visible in screenshots).
- Timeline years are `position: sticky` within their group.
- The hero's dotted grid is a static background pattern (no parallax).

---

## 4. Case study page anatomy (open) — `/case-study/onboarding`

Content column `max-width 720px` centred; "final designs" section widens to `960px`. Total height ≈ 17,000px.

```
Header (wordmark + avatar, pill nav, Say Hello, LinkedIn)
H1   84px "Redesigning Lokalise user onboarding" (3 lines)       ← acorn 600
Overview card (white, radius 16, 4 columns):
     Overview | My role | Team | Timeline
     "Redesigned Lokalise's onboarding end to end…" | "Design strategy, UI, UX, User Research." |
     avatar-chips: Me · PM · EM · Data · UR · FE · FE · BE | "2024 Q1–Q2"
Impact Overview (3 stat tiles): Sign up rate (+37 %), Activation rate (3 % → 12.7 %), Trial-to-customer (+200 %)
Hero media (video/image, radius 12)
[aside] "On This Page" sticky TOC — fixed left 48px, top 80px, 252px wide, radius 16, border; items:
        Overview · Problem framing · Solution · Final design · Results (active item highlighted on scroll)

§ Problem   H2 "Why we started redesigning onboarding?" → paragraphs (20px/32px) + figure + caption
§ Process   H3 "How I tackle the problem" → H4 "Step #1 …", "Step #2 …", "Step #3 …" each with figure + caption
            H3 "Through these steps, we identified 3 major frictions…" → interactive reveal ("Can you guess? 👇 …
            No cheating!") → three NOTE cards (sticky-note style) → "Why are these problems, problems?" (numbered)
§ Solution  H3 "Now, you may ask: Ben, how did you solve the problem then?" → "1. Design sprint", "2. Testing",
            "3. More iterations" each with figures
§ Final     H3 "Final designs and what we shipped" (960px wide) → per deliverable: "Old X / New X" before-after
            comparison + 2 stat blocks (bold 20px number headline + 1-line explanation)
§ Results   H3 "Feedback & impact" → bullet list of outcomes → pull-quote from a user
§ Extras    H3 "Further readings" (article card: publication, date, title, blurb, read-time/reads)
            H3 "Templates to download" (card with "Tap to clone")
Footer-ish  H3 "More case studies" (40px) → 3 cards (tag · company · title · blurb · "Read case study") + "Shuffle"
Footer
```

### Repeating content primitives (what we need as components)
- `figure` — image/video in `radius 8px`, full column width; caption below in a `radius 12px`, `bg white/60`, `padding 12px` card, 14px grey text.
- `note` — small "NOTE n" sticky-note card for insights; also used as hover-reveal answers.
- `stat` — big number line (20px/600) + 1-line explanation.
- `before-after` — two labelled media ("Old …" / "New …") side by side (stacked on mobile).
- `pull-quote` — italic quote with attribution.
- `callout/link card` — article, template, or "more case studies" card.
- `toc` — sticky "On this page" list driven by H2/H3 ids.
- `overview-card` — the 4-column meta block under the H1.

### Typography inside case studies (measured)
| Element | Font | Size / line | Weight | Colour |
|---|---|---|---|---|
| H1 | display (acorn) | 84 / ~80 | 600 | brand green `#02594e` |
| H2 | display | 24 / 32 | 700 | ink `#344054` |
| H3 | display | 24 / 32 | 600 | ink |
| H4 | body (roobert) | 20 / 28 | 600 | ink |
| p | body | 20 / 32 | 400 | ink `#344054` |
| caption | body | 14 / 20 | 400 | grey |
| stat headline | body | 20 | 600 | ink |

---

## 5. Case study page anatomy (locked) — `/case-study/miro-recap`

- Same chrome, but `<main>` is replaced by a centred **lock card** (≈420px wide, tall, radius 24, white, soft shadow) on the cream background.
- Content: "← Back" link (top-left of page), an illustrated padlock with a face, H2 "This one's locked.", body "This one isn't public. Miro recap requires a passcode.", a password input (`placeholder "Enter passcode"`, `bg white/80`, `radius 12px`), a full-width green "Unlock" button (`radius 12px`), and a fallback line "No passcode? Reach out 👋".
- The page `<title>` is "Protected Case Study | Ben Shih".
- Behaviour to copy: wrong passcode → shake the input + helper text; correct → reveal the case study in place (store an unlock flag in `sessionStorage`). On a static host the check is client-side (hash compare), which is fine for "polite" gating.

---

## 6. About page anatomy

```
Hero line        "Design is how I think. Building is how I prove it." (display, 2 lines)
Intro bio        2–3 paragraphs; buttons "Download resume" + "LinkedIn"
Education        3 rows (school · degree)
My journey       vertical timeline: date range · company · role · type · description · bullets;
                 compact year-range sidebar (17–19 … 26) on the right; project cards linked from entries
Values           3 numbered principles, one line each + short blurb
Outside of work  2 image tiles (Community, Photography)
CTA              "Let's talk if you're building something that makes life a little better." + booking link
Footer
```

---

## 7. Fun / Talks pages

- **Fun**: hero intro + a grid of ~14 project tiles (name · platform tag · one-liner). Tile = image, name, type badge.
- **Talks**: list of talks/podcasts (date, venue/city, one-liner, tags) with external links.

---

## 8. What we keep, change, and add for illia.co v1

**Keep (structure):** single long Home with hero → about teaser → timeline of work → "other things" → testimonials → contact letter → footer. Case-study template with overview card, impact stats, sticky TOC, figure+caption rhythm, before/after, results, "more case studies". Locked case-study variant. Floating pill nav after scroll. Bottom-right assistant bubble.

**Change:**
- Nav: `Home · Work · About · ✦ Illia LLM` (Illia LLM opens the sidebar, not a page). "Play" → later "Vibe-coded" (placeholder page in v1).
- Timeline groups by **year** too, but entries come from `docs/data/projects.js` (Giftly 2024–now, Agenteur, Nifty 2016–22, Seated 2020). Locked entries: Matter (NDA), Giant Pumpkin (NDA) — shown as "Password required" placeholders later.
- "Some other things I do" → **Side projects** (Overspace, Arkushi iOS, crazzzytravel, …) from the Notion page; "I write" / "Talks" omitted in v1.
- Testimonials → the three from Notion (HousingAnywhere, Showcase, Impulse).
- Contact letter → Illia's own copy, signed "Illia"; chips: Email · LinkedIn · Instagram · Resume.

**Add:**
- **Illia LLM**: header entry + floating bubble + **select-text → "Ask Illia LLM" pill**; canned answers with case-study cards (ported from niia.design, see `docs/js/illia-llm.js`).
- Easter eggs (see `design-superr.md` §9).
- Theme switch (`data-theme="superr" | "david"`) for comparing the two visual directions.

**Content sources:** Notion portfolio page (bio, process, skills, tools, testimonials, contact), `Projects/*.pdf` Toptal exports (Giftly, Agenteur, Nifty, Seated descriptions + screenshots), Notion case-study pages (Nifty, Seated full-res images).
