/* site.js — shared chrome (top bar, notebook edge-tabs, footer, assistant bubble), scroll reveal,
   toast, and the easter eggs described in design-superr.md §9. Depends on data.js. */

(function () {
  const D = window.ILLIA;
  const R = D.R;
  const html = document.documentElement;
  const body = document.body;
  const isHome = !!document.querySelector("[data-page='home']");
  const path = location.pathname;

  /* ---------- theme (superr is the theme; ?theme=david still works for comparison) ---------- */
  const params = new URLSearchParams(location.search);
  const t = params.get("theme");
  if (t === "david" || t === "superr") html.dataset.theme = t;

  /* ---------- helpers ---------- */
  const h = (tag, attrs = {}, ...kids) => {
    const el = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (k === "class") el.className = v;
      else if (k === "html") el.innerHTML = v;
      else if (k.startsWith("on")) el.addEventListener(k.slice(2), v);
      else if (v !== null && v !== undefined) el.setAttribute(k, v);
    }
    for (const k of kids.flat()) if (k != null) el.append(k.nodeType ? k : document.createTextNode(k));
    return el;
  };
  const ICON = {
    scribble: '<svg class="scribble" viewBox="0 0 100 14" preserveAspectRatio="none" aria-hidden="true"><path d="M2 9c18-6 38-7 60-5 12 1 24 2 36 1-20 3-45 4-66 2 8-3 20-4 32-3"/></svg>',
    spark: '<span class="spark" aria-hidden="true">✦</span>',
    arrow: '<svg class="arrow" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  };
  const isActive = (n) => (n.label === "Home" ? isHome : n.match.test(path));

  /* ---------- top bar ---------- */
  function renderHeader() {
    const mount = document.querySelector("[data-header]");
    if (!mount) return;
    const wordmark = h("a", { class: "wordmark", href: R("index.html"), "aria-label": "Illia Strikhar — home" });
    if (!isHome) wordmark.append(h("img", { class: "wordmark__avatar", src: R("assets/about/portfolio-photo-sm.jpg"), alt: "" }));
    wordmark.append(h("span", { class: "wordmark__wave", "aria-hidden": "true" }, "👋🏻"), " Illia");

    const nav = h("nav", { class: "nav-links", "aria-label": "Primary" });
    D.nav.forEach((n) => {
      const a = h("a", { href: n.href, html: n.label + ICON.scribble });
      if (isActive(n)) a.classList.add("is-active");
      nav.append(a);
    });
    nav.append(h("button", { type: "button", "data-llm-open": "", html: ICON.spark + " Illia LLM" }));

    const actions = h("div", { class: "header-actions" },
      h("a", { class: "btn btn--primary btn--sm say-hi", href: `mailto:${D.contact.email}` }, h("span", { class: "btn__in" }, "Say hi 👋🏻"))
    );
    mount.className = "site-header";
    mount.append(h("div", { class: "container" }, wordmark, nav, actions));
  }

  /* ---------- notebook edge-tabs (site nav once the top bar is gone; case-study.js replaces them with section tabs) ---------- */
  function renderEdgeTabs() {
    if (document.querySelector("[data-edge-tabs]")) return; // a page may render its own
    const tabs = h("nav", { class: "edge-tabs", "data-edge-tabs": "", "aria-label": "Site" });
    D.nav.forEach((n) => tabs.append(h("a", { class: "edge-tab" + (isActive(n) ? " is-active" : ""), href: n.href }, h("span", {}, n.label), h("i", { "aria-hidden": "true" }))));
    tabs.append(h("button", { class: "edge-tab edge-tab--llm", type: "button", "data-llm-open": "" }, h("span", { html: ICON.spark + " Illia LLM" }), h("i", { "aria-hidden": "true" })));
    body.append(tabs);
    const header = document.querySelector(".site-header");
    const update = () => tabs.classList.toggle("is-visible", !header || window.scrollY > header.offsetTop + header.offsetHeight + 80);
    window.addEventListener("scroll", update, { passive: true });
    update();
  }
  window.ILLIA.edgeTabsUpdate = null;

  /* ---------- footer ---------- */
  function renderFooter() {
    const mount = document.querySelector("[data-footer]");
    if (!mount) return;
    mount.className = "site-footer";
    const year = new Date().getFullYear();
    const ghost = h("div", { class: "ghost", "aria-hidden": "true" }, ..."illia.co".split("").map((c) => h("span", {}, c)));
    mount.append(
      ghost,
      h("div", { class: "container" },
        h("div", {},
          h("h3", {}, "Design for humans, not users."),
          h("p", { class: "mt-2", style: "opacity:.9; max-width: 36ch" }, "Senior product designer in Berlin. 0→1 MVPs, design systems, and the details people remember.")
        ),
        h("div", {},
          h("h4", {}, "Navigation"),
          h("ul", {},
            h("li", {}, h("a", { href: R("index.html#work") }, "Work")),
            h("li", {}, h("a", { href: R("about.html") }, "About")),
            h("li", {}, h("a", { href: R("vibe-coded.html") }, "Vibe-coded")),
            h("li", {}, h("a", { href: R("index.html#contact") }, "Contact")),
            h("li", {}, h("button", { type: "button", "data-llm-open": "", html: "✦ Illia LLM" }))
          )
        ),
        h("div", {},
          h("h4", {}, "Links"),
          h("ul", {},
            h("li", {}, h("a", { href: `mailto:${D.contact.email}` }, D.contact.email)),
            h("li", {}, h("a", { href: D.contact.linkedin, target: "_blank", rel: "noopener" }, "LinkedIn")),
            h("li", {}, h("a", { href: D.contact.instagram, target: "_blank", rel: "noopener" }, "Instagram")),
            h("li", {}, h("a", { href: D.contact.resume, target: "_blank", rel: "noopener" }, "Résumé"))
          )
        ),
        h("div", { class: "legal" },
          h("span", {}, `Design, words, and code © ${year} Illia Strikhar.`),
          h("a", { href: `mailto:${D.contact.email}?subject=Using%20illia.co%20as%20a%20reference` }, "Using this site as a reference? Ask me — I'll probably say yes.")
        )
      )
    );
  }

  /* ---------- assistant bubble ---------- */
  function renderBubble() {
    body.append(h("button", { class: "llm-bubble", type: "button", "data-llm-open": "", "aria-label": "Open Illia LLM" },
      h("img", { src: R("assets/about/portfolio-photo-sm.jpg"), alt: "" }),
      h("span", { class: "llm-bubble__dot", "aria-hidden": "true" }),
      h("span", { class: "llm-bubble__hint", "aria-hidden": "true" }, "ask me anything ✦")
    ));
  }

  /* ---------- toast ---------- */
  let toastTimer;
  function toast(msg, ms = 2200) {
    let el = document.querySelector(".toast");
    if (!el) { el = h("div", { class: "toast", role: "status" }); body.append(el); }
    el.innerHTML = msg;
    requestAnimationFrame(() => el.classList.add("is-visible"));
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("is-visible"), ms);
  }
  window.ILLIA.toast = toast;

  /* ---------- reveal on scroll ---------- */
  function reveal() {
    const els = [...document.querySelectorAll(".reveal")];
    const vh = window.innerHeight;
    els.forEach((e) => { const r = e.getBoundingClientRect(); if (r.top < vh && r.bottom > 0) e.classList.add("is-in"); });
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } });
      }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
      els.forEach((e) => { if (!e.classList.contains("is-in")) io.observe(e); });
    }
    const check = () => { const hh = window.innerHeight; els.forEach((e) => { if (e.classList.contains("is-in")) return; const r = e.getBoundingClientRect(); if (r.top < hh * 0.96 && r.bottom > 0) e.classList.add("is-in"); }); };
    let ticking = false;
    window.addEventListener("scroll", () => { if (ticking) return; ticking = true; requestAnimationFrame(() => { check(); ticking = false; }); }, { passive: true });
    window.addEventListener("load", check);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(check);
    setTimeout(check, 1000);
    setTimeout(check, 2500);
  }

  /* ---------- copy chips ---------- */
  function copyChips() {
    document.querySelectorAll("[data-copy]").forEach((el) => {
      el.addEventListener("click", async (ev) => {
        ev.preventDefault();
        try {
          await navigator.clipboard.writeText(el.dataset.copy);
          const old = el.innerHTML;
          el.classList.add("is-copied");
          el.innerHTML = "copied ✓";
          toast("✦ Email copied. Say hi.");
          setTimeout(() => { el.classList.remove("is-copied"); el.innerHTML = old; }, 1800);
        } catch (e) { location.href = `mailto:${el.dataset.copy}`; }
      });
    });
  }

  /* ---------- easter egg: spotlight reveals the hidden grid + notes (design-superr.md §9.4) ---------- */
  function spotlight() {
    if (matchMedia("(pointer: coarse)").matches || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const layer = h("div", { class: "spotlight-layer", "aria-hidden": "true" });
    const secrets = [
      { text: "you found the grid ✦", x: 0.12, y: 0.78 },
      { text: "pixels are people too", x: 0.72, y: 0.22 },
      { text: "hi@illia.co, if you're reading this", x: 0.55, y: 0.9 },
    ];
    const nodes = secrets.map((s) => { const n = h("span", { class: "secret" }, s.text); n.style.left = s.x * 100 + "%"; n.style.top = s.y * 100 + "%"; layer.append(n); return n; });
    body.prepend(layer);
    let idle, moved = 0;
    window.addEventListener("pointermove", (e) => {
      layer.style.setProperty("--mx", e.clientX + "px");
      layer.style.setProperty("--my", e.clientY + "px");
      const over = e.target.closest(".card, .btn, .media, .polaroid, .letter, .hero__card, .llm-sidebar, .nav-links, .edge-tabs, .llm-bubble, img, a, button, input, .sheet, .stat, .note, .figure, .overview");
      moved++;
      layer.classList.toggle("is-on", !over && moved > 12);
      nodes.forEach((n) => { const r = n.getBoundingClientRect(); const d = Math.hypot(r.left + r.width / 2 - e.clientX, r.top + r.height / 2 - e.clientY); n.classList.toggle("is-lit", d < 170); });
      clearTimeout(idle);
      idle = setTimeout(() => layer.classList.remove("is-on"), 1600);
    }, { passive: true });
  }

  /* ---------- easter egg: type "illia" anywhere → theme roulette (design-superr.md §9.7) ---------- */
  function roulette() {
    let buf = "", busy = false;
    window.addEventListener("keydown", (e) => {
      if (e.target.matches("input, textarea") || busy) return;
      buf = (buf + e.key.toLowerCase()).slice(-5);
      if (buf === "illia") {
        busy = true;
        const colours = ["#ff66cf", "#22c55e", "#3b82f6", "#ff6f1e"];
        let i = 0;
        toast("🎰 theme roulette");
        const iv = setInterval(() => { html.style.setProperty("--accent", colours[i++ % colours.length]); html.style.setProperty("--accent-text", colours[i % colours.length]); }, 420);
        setTimeout(() => { clearInterval(iv); html.style.removeProperty("--accent"); html.style.removeProperty("--accent-text"); busy = false; buf = ""; }, 3400);
      }
    });
  }

  /* ---------- easter egg: year stamps are draggable with a spring-back (design-superr.md §9.5) ---------- */
  function draggableStamps() {
    document.querySelectorAll(".stamp").forEach((el) => {
      el.classList.add("cursor-grab");
      let sx = 0, sy = 0, dragging = false;
      el.addEventListener("pointerdown", (e) => { dragging = true; sx = e.clientX; sy = e.clientY; el.setPointerCapture(e.pointerId); el.classList.add("is-grabbing"); el.style.transition = "none"; });
      el.addEventListener("pointermove", (e) => { if (!dragging) return; const dx = (e.clientX - sx) * 0.4, dy = (e.clientY - sy) * 0.4; el.style.transform = `translate(${dx}px, ${dy}px) rotate(${-6 + dx * 0.1}deg)`; });
      const end = () => { if (!dragging) return; dragging = false; el.classList.remove("is-grabbing"); el.style.transition = ""; el.style.transform = ""; };
      el.addEventListener("pointerup", end); el.addEventListener("pointercancel", end);
    });
  }

  /* ---------- wave counter: third wave says "ok, ok" (design-superr.md §9.2) ---------- */
  function wave() {
    const w = document.querySelector(".wordmark");
    if (!w) return;
    let n = 0;
    w.addEventListener("mouseenter", () => { n++; if (n === 3) toast("ok, ok 👋🏻"); if (n === 7) toast("you really like waving"); });
  }

  /* ---------- boot ---------- */
  renderHeader();
  renderFooter();
  renderBubble();
  renderEdgeTabs();
  reveal();
  copyChips();
  spotlight();
  roulette();
  draggableStamps();
  wave();
})();
