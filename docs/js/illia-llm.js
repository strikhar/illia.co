/* illia-llm.js — the "Illia LLM" sidebar + select-text "Ask" pill.
   Ported from niia.design (NiiaChatSidebar / SelectionAskTooltip / niiaLLM.ts) to vanilla JS.
   It is a keyword-matched set of pre-written answers, not a live model. Depends on data.js. */

(function () {
  const D = window.ILLIA;
  const L = D.llm;
  const { ANSWERS, FALLBACKS, FOLLOW_UPS, SUGGESTED_QUESTIONS, PROJECT_CARDS } = L;

  /* ---------- matching (same rules as niiaLLM.ts) ---------- */
  const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  function matches(q, kw) {
    if (/^[a-z0-9 ]+$/i.test(kw)) return new RegExp(`\\b${esc(kw)}\\b`, "i").test(q);
    return q.toLowerCase().includes(kw.toLowerCase());
  }
  function answerFor(q) {
    for (const a of ANSWERS) if (a.keywords.some((k) => matches(q, k))) return { text: a.answer, cards: a.cards };
    return { text: FALLBACKS[Math.floor(Math.random() * FALLBACKS.length)] };
  }
  const shuffle = (arr) => { const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  function pickFollowUps(shown) {
    const avail = FOLLOW_UPS.filter((f) => !shown.has(f.text));
    const pro = shuffle(avail.filter((f) => f.category === "professional"));
    const per = shuffle(avail.filter((f) => f.category === "personal"));
    const wantPer = per.length && Math.random() >= 0.35 ? 1 : 0;
    const picked = [...pro.slice(0, 3 - wantPer), ...per.slice(0, wantPer)];
    if (picked.length < 3) picked.push(...shuffle([...pro.slice(3 - wantPer), ...per.slice(wantPer)]).slice(0, 3 - picked.length));
    return shuffle(picked).slice(0, 3).map((f) => f.text);
  }

  /* ---------- linkify known terms ---------- */
  const names = D.projects.map((p) => p.name);
  const TERM = new RegExp(`(${esc(D.contact.email)}|LinkedIn|Instagram|r[ée]sum[ée]|${names.map(esc).join("|")})`, "gi");
  function linkFor(t) {
    const l = t.toLowerCase();
    if (l === D.contact.email) return `mailto:${D.contact.email}`;
    if (l === "linkedin") return D.contact.linkedin;
    if (l === "instagram") return D.contact.instagram;
    if (/^r[ée]sum[ée]$/.test(l)) return D.contact.resume;
    const p = D.projects.find((x) => x.name.toLowerCase() === l);
    return p ? p.href : null;
  }
  const escHtml = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  function linkify(text) {
    return escHtml(text).split(TERM).map((part, i) => {
      if (i % 2 === 0) return part;
      const href = linkFor(part);
      if (!href) return part;
      const ext = /^https?:/.test(href) || href.startsWith("mailto:");
      return `<a href="${href}"${ext ? ' target="_blank" rel="noopener"' : ""}>${part}</a>`;
    }).join("");
  }
  function renderAnswer(text) {
    const lines = text.split("\n").map((l) => l.trim()).filter(Boolean);
    let out = "", bullets = [];
    const flush = () => { if (bullets.length) { out += `<ul>${bullets.map((b) => `<li>${linkify(b)}</li>`).join("")}</ul>`; bullets = []; } };
    lines.forEach((l) => { if (l.startsWith("- ")) bullets.push(l.slice(2)); else { flush(); out += `<p>${linkify(l)}</p>`; } });
    flush();
    return out;
  }
  function renderCards(cards) {
    if (!cards || !cards.length) return "";
    return `<div class="llm-cards">${cards.map((c) => `<a class="llm-card" href="${c.href}"><div class="media"><img src="${c.image}" alt="" loading="lazy"></div><div class="llm-card__body"><div class="llm-card__title">${escHtml(c.title)}</div><div class="llm-card__cap">${escHtml(c.caption)}</div></div></a>`).join("")}</div>`;
  }

  /* ---------- sidebar ---------- */
  const state = { open: false, messages: [], typing: false, pendingQuote: null, suggestions: [...SUGGESTED_QUESTIONS], shown: new Set(SUGGESTED_QUESTIONS) };
  let typingTimer = null;

  const aside = document.createElement("aside");
  aside.className = "llm-sidebar";
  aside.setAttribute("aria-hidden", "true");
  aside.setAttribute("aria-label", "Illia LLM");
  aside.dataset.llmSidebar = "";
  aside.innerHTML = `
    <div class="llm-head">
      <div class="llm-title"><span class="spark" aria-hidden="true">✦</span> Illia LLM
        <span class="llm-info" tabindex="0">ⓘ<span class="llm-info__tip">A little chatbot I vibe-coded for fun — not a live model, just pre-written answers. Ask about a case study, my process, hiring, or what I do outside of work.</span></span>
      </div>
      <div class="llm-head__actions">
        <button type="button" data-llm-reset aria-label="Reset conversation" title="Reset">↺</button>
        <button type="button" data-llm-close aria-label="Close" title="Close">✕</button>
      </div>
    </div>
    <div class="llm-scroll"><div class="llm-thread" data-llm-thread></div></div>
    <div class="llm-foot">
      <div data-llm-pending></div>
      <form class="llm-form" data-llm-form>
        <input type="text" data-llm-input placeholder="Ask me anything…" autocomplete="off" aria-label="Your question">
        <button type="submit" aria-label="Send"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M6 11l6-6 6 6"/></svg></button>
      </form>
    </div>`;
  document.body.append(aside);
  const thread = aside.querySelector("[data-llm-thread]");
  const scroller = aside.querySelector(".llm-scroll");
  const input = aside.querySelector("[data-llm-input]");
  const pendingEl = aside.querySelector("[data-llm-pending]");

  function render() {
    let html = "";
    if (!state.messages.length) html += `<p class="llm-welcome">Hey, I'm Illia LLM — the pre-written version of him, anyway.</p>`;
    state.messages.forEach((m) => {
      html += `<div class="llm-msg"><div class="llm-msg__who">${m.role === "user" ? "You" : "Illia LLM"}</div>`;
      if (m.quote) html += `<div class="llm-msg__quote">“${escHtml(m.quote)}”</div>`;
      html += `<div class="llm-msg__body">${m.role === "bot" ? renderAnswer(m.text) + renderCards(m.cards) : `<p>${escHtml(m.text)}</p>`}</div></div>`;
    });
    if (state.typing) html += `<div class="llm-msg"><div class="llm-msg__who">Illia LLM</div><div class="llm-typing" aria-label="Illia LLM is typing"><span></span><span></span><span></span></div></div>`;
    if (!state.typing && state.suggestions.length) html += `<div class="llm-suggest">${state.suggestions.map((q, i) => `<button type="button" data-q="${escHtml(q)}" style="--d:${100 + i * 80}ms"><span aria-hidden="true">↳</span>${escHtml(q)}</button>`).join("")}</div>`;
    thread.innerHTML = html;
    pendingEl.innerHTML = state.pendingQuote ? `<div class="llm-pending"><span>“${escHtml(state.pendingQuote)}”</span><button type="button" data-llm-clearquote aria-label="Remove quote">✕</button></div>` : "";
    input.placeholder = state.pendingQuote ? "Ask about this quote…" : "Ask me anything…";
    requestAnimationFrame(() => scroller.scrollTo({ top: scroller.scrollHeight, behavior: "smooth" }));
  }

  function open(quote) {
    state.open = true;
    if (quote) state.pendingQuote = quote;
    aside.classList.add("is-open");
    aside.setAttribute("aria-hidden", "false");
    render();
    setTimeout(() => input.focus(), 250);
  }
  function close() { state.open = false; if (aside.contains(document.activeElement)) document.activeElement.blur(); aside.classList.remove("is-open"); aside.setAttribute("aria-hidden", "true"); }
  function reset() { clearTimeout(typingTimer); state.messages = []; state.typing = false; state.pendingQuote = null; state.suggestions = [...SUGGESTED_QUESTIONS]; state.shown = new Set(SUGGESTED_QUESTIONS); render(); }
  function send(text) {
    const t = text.trim();
    if (!t) return;
    state.messages.push({ role: "user", text: t, quote: state.pendingQuote || undefined });
    state.pendingQuote = null;
    state.suggestions = [];
    state.typing = true;
    render();
    clearTimeout(typingTimer);
    typingTimer = setTimeout(() => {
      const { text: answer, cards } = answerFor(t);
      state.messages.push({ role: "bot", text: answer, cards });
      state.typing = false;
      const next = pickFollowUps(state.shown);
      next.forEach((q) => state.shown.add(q));
      state.suggestions = next;
      render();
    }, 500 + Math.random() * 400);
  }

  aside.addEventListener("click", (e) => {
    const q = e.target.closest("[data-q]");
    if (q) { send(q.dataset.q); return; }
    if (e.target.closest("[data-llm-close]")) close();
    if (e.target.closest("[data-llm-reset]")) reset();
    if (e.target.closest("[data-llm-clearquote]")) { state.pendingQuote = null; render(); }
    const a = e.target.closest("a.llm-card, .llm-msg__body a");
    if (a && matchMedia("(max-width: 639px)").matches) close();
  });
  aside.querySelector("[data-llm-form]").addEventListener("submit", (e) => { e.preventDefault(); send(input.value); input.value = ""; });
  document.addEventListener("click", (e) => { const b = e.target.closest("[data-llm-open]"); if (b) { e.preventDefault(); open(); } });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && state.open) close(); });
  if (new URLSearchParams(location.search).get("ask") !== null) open();

  /* ---------- selection pill (SelectionAskTooltip) ---------- */
  let pill = null;
  function removePill() { if (pill) { pill.remove(); pill = null; } }
  function onSelection() {
    const sel = window.getSelection();
    const text = sel && sel.toString().trim();
    if (!sel || !text || sel.isCollapsed || !sel.rangeCount) { removePill(); return; }
    const node = sel.anchorNode;
    const el = node instanceof Element ? node : node && node.parentElement;
    if (!el || el.closest("[data-llm-sidebar], input, textarea")) { removePill(); return; }
    const rect = sel.getRangeAt(0).getBoundingClientRect();
    if (!rect.width && !rect.height) { removePill(); return; }
    if (!pill) {
      pill = document.createElement("button");
      pill.type = "button";
      pill.className = "ask-pill";
      pill.innerHTML = '<span class="spark" aria-hidden="true">✦</span> Ask Illia LLM';
      pill.addEventListener("mousedown", (e) => e.preventDefault());
      pill.addEventListener("click", () => { const q = window.getSelection().toString().trim().slice(0, 240); open(q); removePill(); });
      document.body.append(pill);
    }
    pill.style.left = rect.left + rect.width / 2 + "px";
    pill.style.top = rect.top + "px";
  }
  document.addEventListener("selectionchange", () => requestAnimationFrame(onSelection));
  window.addEventListener("scroll", removePill, true);
  document.addEventListener("pointerdown", (e) => { if (!e.target.closest(".ask-pill")) removePill(); });

  window.ILLIA.llmOpen = open;
})();
