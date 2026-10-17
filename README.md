# illia.co

Portfolio site for Illia Strikhar. Static HTML/CSS/JS, no build step, hosted on GitHub Pages under `strikhar/illia.co` with the custom domain `illia.co`.

## Layout

```
site/                  ← everything that gets published
  index.html           Home (hero, about teaser, work timeline, side projects, testimonials, contact)
  about.html           About (process, journey, values, skills)
  vibe-coded.html      Placeholder page for vibe-coded projects
  404.html             Not-found page (easter egg: the lock is asleep)
  work/*.html          Case studies: giftly, agenteur, seated, nifty; matter is passcode-locked
  css/tokens.css       Design tokens for both themes (superr = default, david = alternate)
  css/site.css         All component styles
  js/data.js           Shared content: nav, projects, testimonials, Illia LLM answers
  js/site.js           Header/footer/floating nav/bubble, reveal, theme switch, easter eggs
  js/illia-llm.js      Illia LLM sidebar + select-text "Ask" pill (ported from niia.design)
  js/case-study.js     Sticky TOC, "more case studies", passcode unlock
  assets/              Images, cursors, résumé, favicon
structure.md           Site structure reference (reverse-engineered from benshih.design)
design-superr.md       v1 theme spec (reverse-engineered from superr.ai)
design-david.md        Alternate theme spec (reverse-engineered from withdavid.ai)
Projects/, Voice & tone/   Source material — git-ignored, never published
```

## Run locally

```bash
python3 -m http.server 4173 --directory site
```

Then open http://localhost:4173. Add `?theme=david` to any URL (or use the switch bottom-left) to compare themes; the choice is remembered in `localStorage`.

## Deploy

Push to `main`. `.github/workflows/deploy.yml` publishes the `site/` folder to GitHub Pages. First-time setup in the repo settings: **Pages → Source: GitHub Actions**, and add the custom domain `illia.co` (the `site/CNAME` file is already there). DNS: `A` records to GitHub Pages IPs (185.199.108.153, .109.153, .110.153, .111.153) and a `CNAME` for `www` → `strikhar.github.io`.

## Locked case studies

`work/matter.html` compares a SHA-256 of the lowercase passcode with `data-hash`. The placeholder passcode is `matter`. To change it:

```bash
printf 'newpasscode' | shasum -a 256
```

and paste the hash into `data-hash`. This is polite gating for a static host, not security.

## Content

- Case-study prose lives in each `work/*.html`. Shared summaries, covers, and tags live in `js/data.js` (Home timeline and Illia LLM cards read from there).
- Illia LLM answers: `js/data.js` → `ANSWERS` (keywords → answer, optional cards). Suggested and follow-up questions are in the same file.
- Replace low-res screenshots in `site/assets/work/<project>/` — same filenames, nothing else to change.

## Easter eggs (see design-superr.md §9)

Custom drawn cursors · waving hand in the wordmark (3rd wave talks back) · hidden grid + notes revealed by the pointer on empty background · draggable timeline years with spring-back · copy-email chip · type `illia` anywhere for theme roulette · ghosted footer wordmark fills in on hover · select any text → Ask Illia LLM · sleeping lock on 404.
