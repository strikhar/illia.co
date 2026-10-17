/* case-study.js — section edge-tabs ("on this page"), "more case studies" row, and the locked-page passcode check.
   Used by every page under /work/. Depends on data.js; must load after site.js. */

(function () {
  const D = window.ILLIA;

  /* ---------- "On this page" card (structure.md §4) — appears once the hero scrolls away ---------- */
  const sections = [...document.querySelectorAll(".cs-section[id]")];
  if (sections.length) {
    const toc = document.createElement("nav");
    toc.className = "toc";
    toc.setAttribute("aria-label", "On this page");
    toc.innerHTML = `<h4>On this page</h4>` + sections.map((s) => `<a href="#${s.id}">${s.dataset.toc || s.querySelector("h2")?.textContent || s.id}</a>`).join("") + `<a class="toc__back" href="${D.R("index.html#work")}">← All work</a>`;
    document.body.append(toc);
    const links = [...toc.querySelectorAll("a:not(.toc__back)")];
    const hero = document.querySelector(".cs-hero");
    const spy = () => {
      toc.classList.toggle("is-visible", hero ? window.scrollY > hero.offsetTop + hero.offsetHeight - 160 : true);
      const y = window.scrollY + window.innerHeight * 0.35;
      let current = null;
      sections.forEach((s) => { if (s.offsetTop <= y) current = s; });
      links.forEach((l, i) => l.classList.toggle("is-active", sections[i] === current));
    };
    window.addEventListener("scroll", spy, { passive: true });
    spy();
  }

  /* ---------- Live link in the overview card ---------- */
  const me = [...D.projects, ...D.locked].find((p) => p.slug === document.documentElement.dataset.slug);
  const overview = document.querySelector(".cs-hero .overview");
  if (me && me.url && overview) {
    const cell = document.createElement("div");
    cell.innerHTML = `<h4>Live</h4><a class="overview__live" href="${me.url}" target="_blank" rel="noopener">${me.url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")} ↗</a>`;
    overview.append(cell);
  }

  /* ---------- More case studies ---------- */
  const more = document.querySelector("[data-more-work]");
  if (more) {
    const current = document.documentElement.dataset.slug;
    const others = D.projects.filter((p) => p.slug !== current).slice(0, 3);
    more.innerHTML = `<div class="section-head"><span class="eyebrow">Keep reading</span><h2>More case studies</h2></div>
      <div class="grid grid--3">${others.map((p, i) => `
        <a class="card work-card reveal" href="${p.href}" style="--reveal-delay:${i * 80}ms">
          <div class="polaroid" style="--tilt:${i % 2 ? 2 : -2}deg; padding:8px 8px 10px"><div class="media"><img src="${p.cover}" alt="" loading="lazy"></div></div>
          <div class="row">${p.tags.slice(0, 2).map((t) => `<span class="pill pill--ghost">${t}</span>`).join("")}<span>${p.years}</span></div>
          <h3>${p.name}</h3>
          <p>${p.summary.split(".")[0]}.</p>
          <span class="btn btn--sm btn--ghost"><span class="btn__in">Read case study <svg class="arrow" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span></span>
        </a>`).join("")}</div>`;
    more.querySelectorAll(".reveal").forEach((el) => requestAnimationFrame(() => el.classList.add("is-in")));
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
