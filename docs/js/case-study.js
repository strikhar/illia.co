/* case-study.js — sticky "On this page" TOC, "more case studies" row, and the locked-page passcode check.
   Used by every page under /work/. Depends on data.js. */

(function () {
  const D = window.ILLIA;

  /* ---------- TOC (structure.md §4) ---------- */
  const sections = [...document.querySelectorAll(".cs-section[id]")];
  if (sections.length) {
    const toc = document.createElement("nav");
    toc.className = "toc";
    toc.setAttribute("aria-label", "On this page");
    toc.innerHTML = `<h4>On this page</h4>` + sections.map((s) => `<a href="#${s.id}">${s.dataset.toc || s.querySelector("h2")?.textContent || s.id}</a>`).join("");
    document.body.append(toc);
    const links = [...toc.querySelectorAll("a")];
    const hero = document.querySelector(".cs-hero");
    const io = new IntersectionObserver(([e]) => toc.classList.toggle("is-visible", !e.isIntersecting), { rootMargin: "-120px 0px 0px 0px" });
    if (hero) io.observe(hero);
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) links.forEach((l) => l.classList.toggle("is-active", l.getAttribute("href") === "#" + en.target.id)); });
    }, { rootMargin: "-30% 0px -60% 0px" });
    sections.forEach((s) => spy.observe(s));
  }

  /* ---------- More case studies ---------- */
  const more = document.querySelector("[data-more-work]");
  if (more) {
    const current = document.documentElement.dataset.slug;
    const others = D.projects.filter((p) => p.slug !== current);
    more.innerHTML = `<div class="section-head"><span class="eyebrow">Keep reading</span><h2>More case studies</h2></div>
      <div class="grid grid--3">${others.map((p) => `
        <a class="card work-card reveal" href="${p.href}">
          <div class="media"><img src="${p.cover}" alt="" loading="lazy"></div>
          <div class="row">${p.tags.slice(0, 2).map((t) => `<span class="pill pill--ghost">${t}</span>`).join("")}<span>${p.years}</span></div>
          <h3>${p.name}</h3>
          <p>${p.summary.split(".")[0]}.</p>
          <span class="btn btn--sm btn--ghost"><span class="btn__in">Read case study <svg class="arrow" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span></span>
        </a>`).join("")}</div>`;
    more.querySelectorAll(".reveal").forEach((el, i) => { el.style.setProperty("--reveal-delay", i * 80 + "ms"); requestAnimationFrame(() => el.classList.add("is-in")); });
  }

  /* ---------- Locked case study (structure.md §5) ---------- */
  const lock = document.querySelector("[data-lock]");
  if (lock) {
    const form = lock.querySelector("form");
    const inp = lock.querySelector("input");
    const content = document.querySelector("[data-locked-content]");
    const key = "unlocked:" + document.documentElement.dataset.slug;
    async function sha256(s) {
      const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
      return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
    }
    function unlock() {
      lock.closest(".lock-wrap").classList.add("hidden");
      if (content) { content.classList.remove("hidden"); content.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-in")); }
      document.title = document.title.replace("Protected case study", lock.dataset.title || "Case study");
    }
    try { if (sessionStorage.getItem(key) === "1") unlock(); } catch (e) {}
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const hash = await sha256(inp.value.trim().toLowerCase());
      if (hash === lock.dataset.hash) {
        try { sessionStorage.setItem(key, "1"); } catch (err) {}
        D.toast && D.toast("✦ Unlocked. Thanks for asking.");
        unlock();
      } else {
        lock.classList.remove("is-wrong");
        void lock.offsetWidth;
        lock.classList.add("is-wrong");
        const hint = lock.querySelector(".lock__hint");
        if (hint) hint.innerHTML = `Not quite. No passcode? <a href="mailto:${D.contact.email}?subject=Passcode%20for%20${encodeURIComponent(lock.dataset.title || "case study")}">Reach out 👋</a>`;
        inp.select();
      }
    });
  }
})();
