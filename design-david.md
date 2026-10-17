# design-david.md — alternate theme ("david")

Reverse-engineered from https://www.withdavid.ai on 2026-10-17 (Webflow site; computed styles + its CSS custom properties, which Webflow exposes verbatim). Values marked **(ours)** are our adaptations.

Theme switch: `<html data-theme="david">`. Tokens live in `site/css/tokens.css`.

---

## 1. Mood

Editorial, calm, research-lab. One serif display face used at light weight with tight tracking, an unobtrusive sans for everything else, near-white warm-grey page, black pill buttons, lots of air. The only colour comes from data-like graphics (striped audio bars in violet/orange gradient) and four pastel "dataset" cards. Sections are numbered like a paper ("1 Mission", "2 Process"). A left-rail nav tracks the current section. Dark inverted section for the product block.

---

## 2. Colour

Webflow variables (exact, from `:root`):

| Token (ours) | Webflow var | Value |
|---|---|---|
| `--bg` | `--base-color-neutral--gray--50` | `#F9F9F6` (section bg) / page `#FFFFFF` |
| `--bg-2` | `--base-color-neutral--gray--100` | `#F1F2EA` (hero band, secondary buttons) |
| `--line` | `--base-color-neutral--gray--200` / `300` | `#E4E5DC` / `#CFD0C8` (borders) |
| `--muted-2` | `--base-color-neutral--gray--400` | `#9C9E94` |
| `--muted` | `--base-color-neutral--gray--500` | `#82837C` (secondary headings, H2 in grey) |
| `--ink-2` | `--base-color-neutral--gray--600` | `#686963` (body paragraphs) |
| `--ink` | `--base-color-neutral--gray--900` | `#1A1A19` (headings, primary button, dark section) |
| `--accent` | `--base-color-brand--blue` | `#2D62FF` (links, focus ring) |
| `--accent-light` | `--base-color-brand--blue-light` | `#D9E5FF` |
| `--accent-dark` | `--base-color-brand--blue-dark` | `#080331` |
| `--pink` | `--base-color-brand--pink` | `#DD23BB` (`light #FFAEFE`, `dark #3C043B`) |
| system | success / warning / error | `#CEF5CA` / `#114E0B`, `#FCF8D8` / `#5E5515`, `#F8E4E4` / `#3B0B0B` |

Dataset card tints (measured): sage `#444639` on `#E4E5DC`-ish, violet `#3C3663` on `#DBDAE2`, rose `#633636` on `#E3DDDD`, indigo `#363E63` on `#DFE2EC`. Dark section bg ≈ `#26211A` (warm near-black) with text `#F9F9F6`.

Hero graphic: vertical bars with a gradient `#4F46E5 → #C026D3 → #F97316 → #FBBF24` (approximate) fading to black, animated with GSAP/ScrollTrigger.

---

## 3. Typography

Fonts: **Besley** (Google, serif, 300–700) for all headings, **Inter** (300–700) for UI/body. Both via Google Fonts.

Measured:

| Element | Size / line | Weight | Tracking | Font | Colour |
|---|---|---|---|---|---|
| H1 (hero) | 68 / 88.4 | 400 | −2.04px (−3 %) | Besley | `#1A1A19`; one word *italic* |
| H2 | 40 / 50 | 400 | −0.8px (−2 %) | Besley | `#1A1A19` or `#82837C` for "quiet" statements |
| H3 (process step) | 24 / 31.9 | 400 | −0.24px | Besley | ink |
| H3 (dataset name) | 32 / 40 | 400 | −0.64px | Besley | card tint ink |
| H3 (news) | 20 / 24 | 400 | 0 | Besley | ink |
| body p | 16 / 20 | 400 | 0 | Inter | `#686963` |
| nav link | 16 / 20 | 400 | 0 | Inter | ink, 60 % opacity when inactive |
| button | 16 | 500 | 0 | Inter | |
| eyebrow number ("1", "i.") | 14 | 400 | 0 | Besley / Inter | muted |

**(ours)** scale:
```
--fs-hero: clamp(40px, 6.5vw, 68px) / 1.3   letter-spacing -0.03em
--fs-h2:   clamp(28px, 3.8vw, 40px) / 1.25  letter-spacing -0.02em
--fs-h3:   24px / 1.33                       letter-spacing -0.01em
--fs-lead: 20px / 1.5
--fs-body: 16px / 1.6 (Inter)   case-study prose 18px / 1.65
--fs-small: 14px / 1.4
```

---

## 4. Layout

- Container max-width **960px** (10 uses) for text; hero text column **824px**; full-bleed sections with inner 960.
- Process steps are 2-column: `296px` text cards left (6 of them, each numbered i.–vi. with a 24px H3 and a 16px p), and a **sticky 1:1 illustration** on the right that morphs per step.
- A **left rail nav** (fixed, `top ~96px`, 104px wide): six links (Mission, Datasets, Careers, News, Contact, Research) with a 1px vertical line to the left; the active item's segment of the line becomes solid `#1A1A19`. Shows only ≥ 992px.
- Section numbering "1 — Mission" eyebrow: small numeral in a circle outline + hairline + label.
- Featured datasets: 2×2 grid of large cards (`radius 10px`, each a different tint) inside a dark section, each with icon + H3 + 16px blurb + an illustration.
- "How to access" is a numbered 3-step list on dark background.
- News: 3-column cards, 4:3 image, H3 20px, date, tag.
- Footer: single row, © left, legal + social right.

Spacing: section padding ≈ `120px` top/bottom desktop, `64px` mobile **(ours: `--section-y: clamp(64px, 9vw, 120px)`)**. Grid gap 24px.

---

## 5. Components

### Buttons (measured)
- Primary: `bg #1A1A19; color #fff; radius 48px; padding 10.4px 16px; Inter 16/500; border 0`. Hover **(ours)**: bg `#000`, no movement.
- Secondary: `bg #F1F2EA; color #1A1A19; border 1px solid #CFD0C8; radius 48px; same padding`.
- Ghost: transparent, same border.
- On dark sections: primary inverts to `bg #F1F2EA; color #1A1A19`.

### Cards
`radius 10px`, `border 1px solid #E4E5DC`, `bg #FFFFFF` on grey sections / `bg #F9F9F6` on white sections, `padding 24–32px`, no shadow.

### Rail nav item
`14–16px Inter`, `padding 6px 12px`, left border `1px solid #E4E5DC` (segment turns `#1A1A19` when active), `opacity .6 → 1` on hover/active, `transition .3s`.

### Numbered eyebrow
`<span class="num">1</span> <span class="rule"></span> <span>Mission</span>` → numeral in a 20px circle outline, 24px hairline, 14px label uppercase-free.

### Dark section
`bg #26211A` (warm black), text `#F9F9F6`, H2 at `#F9F9F6`, body at `rgba(255,255,255,.7)`; cards inside keep their pastel tints.

---

## 6. Motion

- Library: GSAP 3.12 + ScrollTrigger (loaded from cdnjs) + Swiper 11 for a carousel; Webflow interactions.
- Global `transition: all .3s` on interactive elements.
- Hero bars animate in (height/opacity stagger) and respond to scroll (parallax of the two "speaker" circles later on the page).
- Process section: the right-hand illustration is **sticky** and crossfades between six states as the left steps scroll; inactive steps are dimmed (`opacity .35`) — a classic sticky scrollytelling.
- Rail nav highlights with ScrollTrigger as sections pass `top 40%`.
- No custom cursor. No hover lifts; hover = colour/opacity only.

**(ours)** tokens: `--ease-out: cubic-bezier(.2,.7,.2,1)`, `--dur: 300ms`, reveal-on-scroll = opacity + 12px rise, **no blur** (keep it editorial). Reduced motion → opacity only.

---

## 7. Imagery

Monochrome line-art and data-looking graphics (bars, waveforms, pills of topic tags), product screenshots in soft tinted frames, small circular avatar line-drawings ("Speaker 1 / 2 / 3"). Photography is absent. For a portfolio **(ours)**: screenshots sit in `radius 10px` frames with a `1px #E4E5DC` border on `#F1F2EA` mats; no device mockups.

---

## 8. How "david" maps onto the same markup as "superr"

Both themes share the DOM; only `tokens.css` and a few `[data-theme="david"]` overrides differ:

| Thing | superr | david |
|---|---|---|
| display font | Fraunces soft 600 | Besley 400, −0.03em |
| body font | Fraunces 400 / Geist UI | Inter |
| page bg | `#FDFBF9` cream | `#FFFFFF` + `#F9F9F6` bands |
| accent | `#FF6F1E` orange | `#2D62FF` blue (links only), black buttons |
| button | double-layer bordered pill, lifts | solid black pill, no lift |
| radius | 12 / 16 / 20 | 10 / 48 (pills) |
| cursor | drawn SVG set | system |
| reveal | blur + rise | rise only |
| doodles/stickers | yes | none; numbered eyebrows + hairlines instead |
| nav | floating pill | left rail (≥ 992px) + top wordmark |
| case-study TOC | floating card | the left rail itself |
| dark section | footer band (orange) | product/featured block (`#26211A`) |

Easter eggs in "david" are quieter: the rail numerals count up on hover, the hero bars react to the pointer, selecting text still shows the Ask pill (black).
