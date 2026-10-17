/* site.js — shared chrome (header, floating nav, footer, assistant bubble), scroll reveal,
   theme switch, toast, and the easter eggs described in design-superr.md §9. Depends on data.js. */

(function () {
  const D = window.ILLIA;
  const R = D.R;
  const html = document.documentElement;
  const body = document.body;
  const isHome = !!document.querySelector("[data-page='home']");
  const path = location.pathname;

  /* ---------- theme ---------- */
  const params = new URLSearchParams(location.search);
  const savedTheme = params.get("theme") || localStorage.getItem("illia-theme");
  if (savedTheme === "david" || savedTheme === "superr") html.dataset.theme = savedTheme;
  function setTheme(t) {
    html.dataset.theme = t;
    try { localStorage.setItem("illia-theme", t); } catch (e) {}
    document.querySelectorAll(".theme-switch button").forEach((b) => b.classList.toggle("is-active", b.dataset.theme === t));
  }

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
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.56V9h3.56v11.45z"/></svg>',
    arrow: '<svg class="arrow" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    spark: '<span class="spark" aria-hidden="true">✦</span>',
  };

  /* ---------- header ---------- */
  function navPill(extraClass = "") {
    const pill = h("nav", { class: "nav-pill " + extraClass, "aria-label": "Primary" });
    D.nav.forEach((n) => {
      const a = h("a", { href: n.href }, n.label);
      if (n.match.test(path) && !(n.label === "Home" && !isHome)) a.classList.add("is-active");
      if (n.label === "Home" && isHome) a.classList.add("is-active");
      pill.append(a);
    });
    pill.append(h("button", { type: "button", "data-llm-open": "", html: ICON.spark + " Illia LLM" }));
    return pill;
  }

  function renderHeader() {
    const mount = document.querySelector("[data-header]");
    if (!mount) return;
    const wordmark = h("a", { class: "wordmark", href: R("index.html"), "aria-label": "Illia Strikhar — home" });
    if (!isHome) wordmark.append(h("img", { class: "wordmark__avatar", src: R("assets/about/portfolio-photo-sm.jpg"), alt: "" }));
    wordmark.append(h("span", { class: "wordmark__wave", "aria-hidden": "true" }, "👋🏻"), " Illia");
    const actions = h("div", { class: "header-actions" },
      h("a", { class: "btn btn--dark btn--sm", href: `mailto:${D.contact.email}` }, h("span", { class: "btn__in", html: ICON.mail.replace("<svg", '<svg width="16" height="16"') + " Say hello" })),
      h("a", { class: "icon-btn", href: D.contact.linkedin, target: "_blank", rel: "noopener", "aria-label": "LinkedIn", html: ICON.linkedin })
    );
    mount.className = "site-header";
    mount.append(h("div", { class: "container" }, wordmark, navPill(), actions));

    // floating nav (structure.md §2)
    const floating = h("div", { class: "floating-nav" }, navPill());
    body.append(floating);
    const io = new IntersectionObserver(([e]) => floating.classList.toggle("is-visible", !e.isIntersecting), { rootMargin: "-40px 0px 0px 0px" });
    io.observe(mount);
  }

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
    const b = h("button", { class: "llm-bubble", type: "button", "data-llm-open": "", "aria-label": "Open Illia LLM" },
      h("img", { src: R("assets/about/portfolio-photo-sm.jpg"), alt: "" }),
      h("span", { class: "llm-bubble__dot", "aria-hidden": "true" }),
      h("span", { class: "llm-bubble__hint", "aria-hidden": "true" }, "ask me anything ✦")
    );
    body.append(b);
  }

  /* ---------- theme switch (dev helper, keep for comparing directions) ---------- */
  function renderThemeSwitch() {
    const sw = h("div", { class: "theme-switch", role: "group", "aria-label": "Theme" },
      h("button", { type: "button", "data-theme": "superr", onclick: () => setTheme("superr") }, "superr"),
      h("button", { type: "button", "data-theme": "david", onclick: () => setTheme("david") }, "david")
    );
    body.append(sw);
    setTheme(html.dataset.theme || "superr");
  }

  /* ---------- toast ---------- */
  let toastTimer;
  function toast(msg, ms = 2200) {
    let t = document.querySelector(".toast");
    if (!t) { t = h("div", { class: "toast", role: "status" }); body.append(t); }
    t.innerHTML = msg;
    requestAnimationFrame(() => t.classList.add("is-visible"));
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("is-visible"), ms);
  }
  window.ILLIA.toast = toast;

  /* ---------- reveal on scroll ---------- */
  function reveal() {
    const els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) { els.forEach((e) => e.classList.add("is-in")); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    els.forEach((e) => io.observe(e));
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
    let idle;
    let moved = 0;
    window.addEventListener("pointermove", (e) => {
      layer.style.setProperty("--mx", e.clientX + "px");
      layer.style.setProperty("--my", e.clientY + "px");
      const over = e.target.closest("main, header, footer, .llm-sidebar") && e.target.closest(".card, .btn, .media, .polaroid, .letter, .hero__card, .llm-sidebar, .nav-pill, .llm-bubble, img, a, button, input, .tl-entry, .stat, .note, .figure");
      moved++;
      layer.classList.toggle("is-on", !over && moved > 12);
      nodes.forEach((n) => {
        const r = n.getBoundingClientRect();
        const d = Math.hypot(r.left + r.width / 2 - e.clientX, r.top + r.height / 2 - e.clientY);
        n.classList.toggle("is-lit", d < 170);
      });
      clearTimeout(idle);
      idle = setTimeout(() => layer.classList.remove("is-on"), 1600);
    }, { passive: true });
  }

  /* ---------- easter egg: type "illia" anywhere → theme roulette (design-superr.md §9.7) ---------- */
  function roulette() {
    let buf = "";
    let busy = false;
    window.addEventListener("keydown", (e) => {
      if (e.target.matches("input, textarea") || busy) return;
      buf = (buf + e.key.toLowerCase()).slice(-5);
      if (buf === "illia") {
        busy = true;
        const colours = ["#ff66cf", "#22c55e", "#3b82f6", "#ff6f1e"];
        const prev = html.style.getPropertyValue("--accent");
        let i = 0;
        toast("🎰 theme roulette");
        const iv = setInterval(() => { html.style.setProperty("--accent", colours[i++ % colours.length]); html.style.setProperty("--accent-text", colours[(i) % colours.length]); }, 420);
        setTimeout(() => { clearInterval(iv); html.style.setProperty("--accent", prev); html.style.removeProperty("--accent-text"); if (!prev) html.style.removeProperty("--accent"); busy = false; buf = ""; }, 3400);
      }
    });
  }

  /* ---------- easter egg: timeline years are draggable with a spring-back (design-superr.md §9.5) ---------- */
  function draggableYears() {
    document.querySelectorAll(".tl-year__label").forEach((el) => {
      el.classList.add("cursor-grab");
      let sx = 0, sy = 0, dragging = false;
      el.addEventListener("pointerdown", (e) => { dragging = true; sx = e.clientX; sy = e.clientY; el.setPointerCapture(e.pointerId); el.classList.add("is-grabbing"); el.style.transition = "none"; });
      el.addEventListener("pointermove", (e) => { if (!dragging) return; const dx = (e.clientX - sx) * 0.35, dy = (e.clientY - sy) * 0.35; el.style.transform = `translate(${dx}px, ${dy}px) rotate(${dx * 0.08}deg)`; });
      const end = () => { if (!dragging) return; dragging = false; el.classList.remove("is-grabbing"); el.style.transition = "transform 900ms var(--ease-spring), color var(--dur)"; el.style.transform = ""; };
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
  renderThemeSwitch();
  reveal();
  copyChips();
  spotlight();
  roulette();
  draggableYears();
  wave();
})();
