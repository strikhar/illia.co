# design-superr.md — v1 theme ("superr")

Reverse-engineered from https://www.superr.ai on 2026-10-17 (computed styles, CSS rules, keyframes, cursor rules, assets list), then adapted for a portfolio. Where a value is *ours* rather than *measured*, it is marked **(ours)**.

Theme switch: `<html data-theme="superr">` (default). Tokens live in `docs/css/tokens.css`.

---

## 1. Mood

Warm paper, friendly, hand-made. Big soft serif headlines, a single hot orange, chocolate-brown ink, hand-drawn doodles and stickers that peel on hover, custom drawn cursors, playful microcopy ("I call dibs!", "We use cookies. Nom nom."). Everything feels like a nice notebook rather than a SaaS site. Motion is springy but short.

---

## 2. Colour

Measured on superr.ai:

| Token | Value | Where it was used |
|---|---|---|
| `--bg` | `#FDFBF9` (rgb 253 251 249) | page background, cards |
| `--bg-2` | `#F7EFE9` | alternate section band ("Safe & Secure") |
| `--bg-3` | `#FFFBF7` | sticker canvas |
| `--ink` | `#171717` | body text (Geist/gelica) |
| `--ink-brown` | `#2B1A07` | headings, cookie bar bg, button borders (`2.3px solid`) |
| `--accent` | `#FF6F1E` | `<html>` background (shows during overscroll), primary button, footer band |
| `--accent-deep` | `#CE500A` | accent text on light bg (handwritten "actually!") |
| `--pink` | `#FF66CF` | highlight word in a heading ("our back") |
| `--green` | `#22C55E` | highlight word ("magic paper") |
| `--blue` | `#3B82F6` | highlight word / sticker |
| `--muted` | `#8A7B6A` | secondary text |
| `--line` | `rgba(141,113,90,.10)` | hairlines, FAQ dividers (dashed) |
| `--white` | `#FFFFFF` | sticker labels, paper cards |

**(ours)** portfolio additions: `--accent-soft: #FFE8D9` (pill bg), `--ink-2: #5C4A36` (paragraph on cream), `--success: #22C55E`.

Contrast: `#171717` on `#FDFBF9` ≈ 16:1; `#CE500A` on `#FDFBF9` ≈ 4.6:1 (ok for ≥ 18px); `#FF6F1E` is **not** AA for small text on cream — use it only for fills, large type, and underlines.

---

## 3. Typography

Measured fonts: **gelica** (Adobe Fonts serif, weights 400/500/600/700/900), **Geist** (variable 100–900) for UI, **Geist Mono**, **Shantell Sans 700** + "Sue Ellen Francisco" + a custom "atpRawNote" for handwritten notes, "Crimson Text" and "Tiro Devanagari Hindi" for a couple of multilingual bits.

Free substitutions we ship **(ours)**:

| Role | superr.ai | illia.co (Google Fonts / open) | Fallback |
|---|---|---|---|
| Display | gelica 600 | **Fraunces** `"SOFT" 100, "WONK" 1`, 600 | Georgia, serif |
| Text serif | gelica 400 | **Fraunces** 400 (opsz 9–14) | Georgia |
| UI sans | Geist 500 | **Geist** (jsDelivr `geist-font`) or Inter | system-ui |
| Mono | Geist Mono | **Geist Mono** | ui-monospace |
| Handwritten | Shantell Sans 700 | **Shantell Sans** 700 (Google) | cursive |

Measured scale (desktop, 1024px):

| Element | Size / line | Weight | Font | Notes |
|---|---|---|---|---|
| Hero H1 "Welcome to your SuperrBook" | 104 / 112 | 600 | gelica | letter-spacing normal; 3 lines |
| Section H2 ("It's kinda like magic paper") | 36 / 43 | 400 | gelica | 2 lines, one coloured word |
| H2 large ("Questions you might have") | 40 / 48 | 400 | gelica | |
| H2 medium ("Our SuperrBook. Our Way.") | 32.8 / 39 | 400 | gelica | fluid `clamp()` |
| Hero p | 24 / 33.6 | 400 | gelica | |
| Body p | 16 / 24 | 400 | gelica | |
| Nav / footer links | 18 / 27 | 500 | Geist | |
| Button | 16 | 500 | Geist | |
| Feature list rows | 16–18 | 400 | gelica | roman numerals I–V right-aligned |
| Handwritten labels | ~16–20 | 700 | Shantell Sans | rotated −6°…+8° |

**(ours)** fluid scale for illia.co:
```
--fs-hero:   clamp(44px, 9vw, 104px) / 1.05
--fs-h2:     clamp(28px, 4vw, 40px)  / 1.2
--fs-h3:     clamp(22px, 2.6vw, 28px)/ 1.25
--fs-lead:   clamp(18px, 2vw, 24px)  / 1.4
--fs-body:   18px / 1.6   (case-study prose 20px / 1.6)
--fs-small:  14px / 1.45
--fs-ui:     15px / 1.3
```

---

## 4. Spacing, radius, borders, shadow

- Page gutter: `px-10` (40px) on mobile hero, `md:px-6` → container max ≈ 1100px **(ours: `--container: 1120px`, gutter `clamp(16px, 4vw, 48px)`)**.
- Section rhythm: each feature section is `min-h-screen` and vertically centred; FAQ section `py-16 md:py-24 pb-40`. **(ours: `--section-y: clamp(72px, 10vw, 140px)`)**.
- Radius tokens measured: `8px` (images), `12px` (feature cards), `16px` (button inner), `20px` (button outer wrapper), `2px/3px` (polaroid frames), `9999px` (pills, cookie bar), `56px 56px 0 0` (big footer band top corners).
- Borders: `2.3px solid #2B1A07` on the primary ghost button; `5px solid #FDFBF9` photo frames (polaroid) with `shadow 0 1px 4px rgba(0,0,0,.25)`.
- Shadows: buttons `0 1px 2px rgba(0,0,0,.25)` → hover `0 4px 4px rgba(0,0,0,.15)`; stickers `drop-shadow(1px 1px 1px rgba(0,0,0,.25))`; logo `drop-shadow(0 1px 1px rgba(0,0,0,.25))`.

---

## 5. Components

### Button (measured: "I call dibs!" / "Read Letter")
```
<button class="btn">            outer: bg #FDFBF9, padding 4px, radius 20px,
                                       shadow 0 1px 2px rgba(0,0,0,.25)
  <span class="btn__inner">     inner: bg #FDFBF9, border 2.3px solid #2B1A07,
                                       radius 16px, padding 10.7px 20px, Geist 16/500
```
Hover: `translateY(-4px)` + bigger shadow, `transition all .2s cubic-bezier(.4,0,.2,1)`. Active: back to 0.
Filled variant (cookie "Accept"): bg `#FF6F1E`, text `#FDFBF9`, radius 9999, padding `6px 16px`.
Text variant ("Reject"): plain text, underline on hover.

### Cookie bar (reuse as a **toast** pattern)
Dark brown pill `#2B1A07`, `radius 9999`, `padding 8px 8px 8px 40px`, a cookie illustration hanging off the left edge, white 14px Geist text + two buttons. Enters with `slideDown` keyframe.

### Feature card ("It's kinda like magic paper")
White card, `radius 12`, `padding 28–32`, H2 with one coloured word, then a list of 5 rows separated by hairlines; each row = label (left) + roman numeral (right, muted). Card sits on a full-bleed illustrated background and the list rows highlight (coloured text) as you scroll — scroll-linked `IntersectionObserver` sets the active row.

### Sticker (hover peel)
Image in a square `absolute` slot, slightly rotated (`rotate(12deg)` etc.), `drop-shadow`. On hover the sticker "peels": `clip-path` animates over `1s` with a custom spring `linear(…)` easing (`--sticker-peel-hover-easing`), and a shine gradient slides over. Values measured:
```
--sticker-p: 10px
--sticker-peel-easing: 2s linear(0,.002 .4%,.008 .9%,… 1.197 24.4%, … .961 48.3%, … 1)
--sticker-peel-hover-easing: 1s linear(0,.008 1.1%,.031 2.2%,.129 4.8%,.257 7.2%,.671 14.2%,.789 16.5%,.881 18.6%,.957 20.7%,1.019 22.9%,1.063 25.1%,1.094 27.4%,1.114 30.7%,1.112 34.5%,1.018 49.9%,.99 59.1%,1)
```
We reuse the easing curve as `--ease-spring` for all "pop" interactions **(ours)**.

### Polaroid / photo frame
`border 5px solid #FDFBF9; border-radius 2px; box-shadow 0 1px 4px rgba(0,0,0,.25); rotate(-4.25deg)`; caption in handwritten font underneath. Good for testimonials and "outside of work" tiles.

### FAQ row
Question text 16/18px, `padding 16px 0`, dashed bottom border `1px dashed rgba(141,113,90,.25)`, chevron on the right; opens with height transition.

### Footer band
Full-width `#FF6F1E` block with `radius 56px 56px 0 0`, white 32/48 serif tagline left, two columns of 18px links right, giant ghosted wordmark cut off at the bottom (`opacity .15`, overflow hidden).

---

## 6. Cursor (the signature detail)

superr.ai replaces the system cursor with drawn SVG cursors via CSS only (no JS follower):

```css
body { cursor: url(/icons/interactive/arrow-cursor.svg) 4 2, url(/icons/interactive/arrow-cursor.png) 4 2, default; }
a, button, [role=button], summary, label[for], select, input[type=button|reset|submit], .cursor-pointer
     { cursor: url(/icons/interactive/hand-cursor.svg) 12 4, url(...png) 12 4, pointer; }
.cursor-grab, [draggable=true] { cursor: url(drag-cursor.svg) 14 12, grab; }
.cursor-grab:active, .cursor-grabbing { cursor: url(grab-cursor.svg) 12 8, grabbing; }
p, span, h1–h6, blockquote, li, td, th, .cursor-text { cursor: url(text-cursor.svg) 11 16, text; }
:is(a, button, …) :is(p, span, h1–h6, …) { cursor: inherit; }   /* text inside buttons keeps the hand */
```
Hotspots: arrow `4 2`, hand `12 4`, text `11 16`, drag `14 12`, grab `12 8`. Cursor images are ~32px, brown outline `#2B1A07`, cream fill, 1px drop shadow.

**(ours)** We draw our own set in `docs/assets/cursors/` (arrow, hand, text, grab) — same hotspots, same CSS cascade, plus `@media (pointer: coarse)` → no custom cursor, and `prefers-reduced-motion` has no effect on cursors.

---

## 7. Motion

Measured transitions / keyframes:
- Global: `transition: color .3s, background-color .3s, border-color .3s, … cubic-bezier(.4,0,.2,1)` (Tailwind defaults).
- Buttons: `transform .15s`, lift on hover.
- Stickers: `clip-path 1s linear(spring)` on hover.
- `@keyframes slideUp { from {opacity:0; transform:translateY(20px)} to {opacity:1; transform:none} }` and `slideDown` (−20px) — used for toasts and entering elements, `0.4s`.
- `@keyframes spin` for a loading mark.
- Scroll: hero is a **sticky scrollytelling** block (`section.sticky.min-h-screen`) — the notebook stays while text swaps; feature list rows activate on scroll; "We're in good hands" has hands illustration sliding in.

**(ours)** motion tokens:
```
--ease-out:   cubic-bezier(.22,1,.36,1)
--ease-spring: linear(0,.008 1.1%,.031 2.2%,.129 4.8%,.257 7.2%,.671 14.2%,.789 16.5%,.881 18.6%,.957 20.7%,1.019 22.9%,1.063 25.1%,1.094 27.4%,1.114 30.7%,1.112 34.5%,1.018 49.9%,.99 59.1%,1)
--dur-fast: 150ms  --dur: 240ms  --dur-slow: 600ms
reveal-on-scroll: opacity 0→1, translateY 16px→0, filter blur(6px)→0  (benshih-style), once
@media (prefers-reduced-motion: reduce) → all of the above become opacity-only, 1ms
```

---

## 8. Illustration & texture

- Hand-drawn black-line doodles with flat fills (backpack, pencil box, undo arrows, library) at ~180px, each with a handwritten caption and a curly arrow pointing at the thing it labels.
- A sticker sheet (12 stickers: hearts, lightning, ghost, stars, flowers) with the hover-peel.
- Full-bleed painted scenes (grass with flowers, a desk) behind feature cards.
- Paper texture on the cream background is **not** a bitmap — it's just the warm colour + occasional hairlines.

**(ours)**: we will use a few inline SVG doodles (arrow, underline squiggle, star, sparkle ✦ for Illia LLM) drawn with `stroke: var(--ink-brown); stroke-width: 2; stroke-linecap: round`, no raster illustration in v1.

---

## 9. Easter eggs & delight (planned for illia.co, superr-flavoured)

Rule: every egg is **discoverable by normal use, never blocks it, and costs nothing if missed**.

1. **Drawn cursor set** that changes shape over text/links/draggables (§6).
2. **Hero wave** — the "👋🏻" in the hero waves (`rotate` keyframe) when hovered; on the 3rd wave it says "ok, ok" in a handwritten tooltip.
3. **Sticker peel** on the testimonial polaroids and on project tags (§5).
4. **Background reveal** — the cream background has an invisible dotted grid; moving the mouse "lifts" a soft spotlight (`radial-gradient` following the pointer via CSS vars) that reveals faint pencil doodles and the words "you found the grid" near the footer. Touch: appears on long-press.
5. **Timeline years** are draggable (`cursor: grab`) a few pixels with a spring-back — pure delight, no function.
6. **Copy email chip** — clicking copies, the chip briefly becomes "copied ✓" and the ✦ sparkle pops.
7. **Konami / "illia" typed anywhere** → the orange accent cycles through the pink/green/blue highlight colours for 3 s and a toast says "theme roulette". (Cheap, harmless.)
8. **Select any text → "Ask Illia LLM" pill** (functional, not just an egg).
9. **Footer wordmark** is ghosted; hovering it makes the letters fill in one by one.
10. **404 page**: the padlock face from the locked case study, but asleep; clicking wakes it.

---

## 10. Where each token lives

`docs/css/tokens.css` → `:root[data-theme="superr"] { … }` and `:root[data-theme="david"] { … }`. Components only ever reference tokens. Cursor files in `docs/assets/cursors/`. Fonts loaded from Google Fonts (Fraunces, Shantell Sans) + jsDelivr (Geist) with `font-display: swap`.
