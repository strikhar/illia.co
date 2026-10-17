/* data.js — all site content that is reused across pages (nav, projects, testimonials, Illia LLM answers).
   Page-specific prose lives in the HTML files. Keep this file free of DOM code. */

window.ILLIA = (function () {
  const root = document.documentElement.dataset.root || "./";
  const R = (p) => root + p.replace(/^\.?\//, "");

  const contact = {
    email: "hi@illia.co",
    linkedin: "https://www.linkedin.com/in/strikhar/",
    instagram: "https://www.instagram.com/hi.illia/",
    resume: R("assets/Illia-Strikhar-CV.pdf"),
    github: "https://github.com/strikhar",
  };

  const nav = [
    { label: "Home", href: R("index.html"), match: /(^|\/)(index\.html)?$/ },
    { label: "Work", href: R("index.html#work"), match: /\/work\// },
    { label: "About", href: R("about.html"), match: /about\.html$/ },
    { label: "Vibe-coded", href: R("vibe-coded.html"), match: /vibe-coded\.html$/ },
  ];

  /* Case studies — order = display order on Home (newest first). Years drive the timeline groups. */
  const projects = [
    {
      slug: "giftly",
      name: "Giftly",
      client: "Giftly",
      year: 2024,
      years: "2024 – now",
      role: "Senior Product Designer",
      timeframe: "May 2024 – present",
      type: "Responsive web",
      tags: ["Consumer", "E-commerce", "Design system"],
      summary:
        "Redesigned Giftly's gift marketplace end to end — visual identity, a cohesive design system, and the core consumer flows (Home, Calendar, Events, social gifting). Conversion rate doubled.",
      cover: R("assets/work/giftly/hero-laptop.png"),
      href: R("work/giftly.html"),
    },
    {
      slug: "agenteur",
      name: "Agenteur",
      client: "Agenteur",
      year: 2023,
      years: "2023",
      role: "Product Designer (0→1 MVP)",
      timeframe: "8 weeks",
      type: "Web app + landing",
      tags: ["HR tech", "AI", "0→1"],
      summary:
        "An engineering-talent platform that matches companies with engineers using big data, psychological analysis, and neuroscience. Landing pages, the web app, and emails — from interviews to shipped MVP.",
      cover: R("assets/work/agenteur/hero-laptop.png"),
      href: R("work/agenteur.html"),
    },
    {
      slug: "seated",
      name: "Seated",
      client: "Seated",
      year: 2020,
      years: "2020",
      role: "Sole UX/UI Designer",
      timeframe: "6 weeks",
      type: "Responsive web + emails",
      tags: ["Ticketing", "Light & dark", "Design system"],
      summary:
        "Took the brand identity UENO created for Seated and brought it across presale pages, ticket booking flows (light + dark), the artist dashboard, and emails. Used by thousands of artists and tens of millions of fans.",
      cover: R("assets/work/seated/interstitial-dark.png"),
      href: R("work/seated.html"),
    },
    {
      slug: "nifty",
      name: "Nifty",
      client: "NiftyPM",
      year: 2016,
      years: "2016 – 2022",
      role: "Founding / Head of Product Design",
      timeframe: "6 years",
      type: "Web, iOS, Android, Mac",
      tags: ["SaaS", "Project management", "Design system"],
      summary:
        "Founding designer of an all-in-one project management platform. Led UX from MVP to full launch across four platforms — roadmaps, tasks, discussions, docs, forms, time tracking — and the design system that held it together.",
      cover: R("assets/work/nifty/workloads.png"),
      href: R("work/nifty.html"),
    },
  ];

  /* NDA work shown as locked entries (structure.md §5). Passcodes are checked client-side in case-study.js. */
  const locked = [
    {
      slug: "matter",
      name: "Matter",
      year: 2025,
      years: "2025 – now",
      summary:
        "An emotional-fitness iOS app, picked as Apple's App of the Day multiple times. Under NDA — ask me for the passcode.",
      cover: R("assets/work/matter/cover.svg"),
      href: R("work/matter.html"),
      tags: ["iOS", "Consumer", "NDA"],
    },
  ];

  const sideProjects = [
    { emoji: "🪐", name: "Overspace", blurb: "A small product design studio I co-run with friends — the unglamorous parts of design that make the flashy parts possible.", href: "https://overspace.co/", tag: "Studio" },
    { emoji: "📖", name: "Аркуші", blurb: "A non-profit iOS app with Ukrainian poetry — one poem at a time, no ads, no accounts.", href: "https://apps.apple.com/us/app/id1500310604", tag: "iOS app" },
    { emoji: "🧭", name: "crazzzytravel", blurb: "A travel blog that helped thousands of people travel better (and taught me email marketing and copywriting).", href: "http://crazzzytravel.com/", tag: "Blog" },
    { emoji: "📺", name: "Charity media portal", blurb: "A Ukrainian charity media portal — now defunct, but it taught me how much a clear story matters.", href: "https://www.youtube.com/watch?v=GVTFI5Wh--I", tag: "Media" },
    { emoji: "💬", name: "Artyom", blurb: "An anonymous iOS chat where you could talk to a real human when things got heavy. In Russian, now defunct.", href: "https://spark.ru/startup/artyom/blog/23491/o-proekte-artyom", tag: "iOS app" },
    { emoji: "✦", name: "This website", blurb: "Designed in the open and built with Claude alongside me — the same AI-facilitated workflow I use for client work.", href: R("vibe-coded.html"), tag: "Vibe-coded" },
  ];

  const testimonials = [
    {
      name: "Djordy Seelmann",
      role: "CEO @ HousingAnywhere",
      href: "https://www.linkedin.com/in/dseelmann",
      avatar: "https://avatars1.githubusercontent.com/u/9333324?s=200",
      quote: "Illia is one of the best interface designers I've worked with. His work has the power to change your business.",
      tilt: "-2deg",
    },
    {
      name: "Amay Sheth",
      role: "Co-Founder & CEO @ Showcase",
      href: "https://www.linkedin.com/in/amaydsheth/",
      avatar: "https://f6s-public.s3.amazonaws.com/profiles/2379756_original.jpg",
      quote: "Extremely fortunate to have worked with Illia — the first thing any user comments on is our clean, playful UI and straightforward UX. He designed all of our assets from scratch — all I sent him was a Dropbox Paper file. We're in a crowded market and without Illia, we couldn't have possibly stood out.",
      tilt: "1.5deg",
    },
    {
      name: "Vincent Chevalier",
      role: "Founder @ Impulse Analytics",
      href: "https://www.linkedin.com/in/vchevalierimpulse/",
      avatar: "",
      quote: "I had the chance to collaborate with Illia to build an innovative landing page builder. Landing page building is a complex topic, and he killed it. What a smart guy, committed to success, and a pleasure to work with. I cannot recommend Illia higher.",
      tilt: "-1deg",
    },
  ];

  /* ---------- Illia LLM content (same mechanics as niia.design's canned bot) ---------- */
  const PROJECT_CARDS = projects.map((p) => ({ title: p.name, caption: `${p.client} · ${p.years}`, image: p.cover, href: p.href }));
  const card = (slug) => PROJECT_CARDS.filter((c) => c.href.endsWith(`/${slug}.html`));

  const SUGGESTED_QUESTIONS = [
    "Which case study should I start with?",
    "How do you work with AI?",
    "I'd like to hire you",
  ];

  const ANSWERS = [
    {
      keywords: ["hobbies", "hobby", "outside of work", "spare time", "free time", "for fun", "travel", "poetry"],
      answer:
        "Outside of work I travel — a lot. I ran a travel blog for years and still plan trips like a product: research, outline, iterate. I also keep a Ukrainian poetry app alive (Аркуші) because some things should exist even if they don't scale. And I take photos of doors. Don't ask.",
    },
    {
      keywords: ["what do you do", "elevator pitch", "what do you help", "who is illia", "who are you", "introduce"],
      answer:
        "I'm Illia, a senior product designer with 10+ years of 0→1 work for startups, plus design systems and feature design for established teams. Currently at Giftly, previously founding designer at Nifty and head of product design at Variant3D. I design for humans, not users.",
    },
    {
      keywords: ["process", "approach", "methodology", "how do you work", "workflow"],
      answer:
        "Four steps, every time: research (product, competitors, users, analytics), concept (personas, a text outline of the app, user flows — including the emotional ones), wireframes (hi-fi, so I can usability-test them and reuse them), then UI with a design system and a CSS audit before launch. Ship fast, validate product-market fit, repeat.",
    },
    {
      keywords: ["ai", "claude", "llm", "artificial intelligence", "vibe", "cursor", "lovable", "machine learning"],
      answer:
        "I work with an AI-facilitated workflow: I orchestrate AI at different stages of design to increase speed, guided by senior product judgment. Prototypes in Claude, interaction specs as live code, design-to-code audits with visual regression. This site is built that way too — and yes, Illia LLM is a set of pre-written answers, not a live model.",
      cards: card("giftly"),
    },
    {
      keywords: ["giftly", "gift", "marketplace", "e-commerce", "ecommerce", "calendar"],
      answer:
        "Giftly is where I've been since May 2024. I lead end-to-end product design for the core consumer experience — Home, Calendar, Events, social gifting — and contribute to the design system. The visual-identity redesign and the new system doubled conversion.",
      cards: card("giftly"),
    },
    {
      keywords: ["agenteur", "talent", "hiring platform", "recruit", "engineers", "hr tech"],
      answer:
        "Agenteur is an engineering-talent platform that matches companies with engineers using big data and psychological analysis. I designed the 0→1 MVP — landing pages, web app, emails — after interviewing teams across the US and Europe. The hard part was showing candidate skills and matches without overwhelming anyone.",
      cards: card("agenteur"),
    },
    {
      keywords: ["seated", "ticket", "concert", "ueno", "dark theme", "dark mode", "artists"],
      answer:
        "Seated is a ticketing platform used by thousands of artists (Billie Eilish, Harry Styles, John Mayer…). UENO designed the brand; I was the sole designer who brought it across presale pages, booking flows in light and dark, the artist dashboard, and emails. After Sofar acquired it, the platform drove $650M+ in ticket and merch sales.",
      cards: card("seated"),
    },
    {
      keywords: ["nifty", "project management", "niftypm", "founding designer", "kanban", "roadmap"],
      answer:
        "Nifty was my longest run — founding designer from 2016 to 2022. MVP to full launch across Web, iOS, Android, and Mac: roadmaps, tasks in five views, discussions, docs, forms, time tracking, portfolios — and the design system under all of it. Hundreds of teams adopted it.",
      cards: card("nifty"),
    },
    {
      keywords: ["matter", "nda", "app of the day", "wellness", "emotional"],
      answer:
        "Matter is an emotional-fitness iOS app I'm designing under NDA — it was picked as Apple's App of the Day multiple times. The case study is passcode-protected; email me and I'll send you the code.",
    },
    {
      keywords: ["variant3d", "loop", "knit", "cad", "3d", "fast company"],
      answer:
        "At Variant3D (2023–2025) I was head of product design for LOOP, the first web-based CAD/CAM platform for 3D-knitted products, used by Nike, New Balance, Ralph Lauren, and others. Built it 0→1 as the first designer, then grew the team. Fast Company named it a World Changing Ideas finalist in 2024.",
    },
    {
      keywords: ["which case study", "where should i start", "recommend", "favorite", "favourite", "proudest", "best project", "start with"],
      answer:
        "Start with Giftly — it's the most recent and the most complete (identity, system, core flows, measurable result). Seated if you want to see brand-to-product craft with light and dark themes, Nifty if you want to see six years of system thinking, Agenteur for a fast 0→1 MVP.",
      cards: PROJECT_CARDS,
    },
    {
      keywords: ["how did you build this", "build this portfolio", "this site", "this website", "how was this site", "made this"],
      answer:
        "I studied three sites I love (one for structure, two for look and feel), wrote them up as design docs, then built this with Claude alongside me — vanilla HTML/CSS/JS, no framework, hosted on GitHub Pages. The custom cursors, the sticky years, the thing hiding in the background — all deliberate. Try selecting some text.",
    },
    {
      keywords: ["design and build", "do you code", "do you build", "hands-on", "html", "css", "framer", "webflow"],
      answer:
        "Yes. HTML & CSS since forever, Webflow and Framer for marketing sites, and lately I ship prototypes and audits as real code with AI. I stay in control until the thing is live — pixel-level CSS audits are my favourite boring task.",
    },
    {
      keywords: ["tool", "tools", "figma", "stack", "software", "design system"],
      answer:
        "Figma & FigJam for design, Claude and Lovable for prototyping and build, Webflow for sites, Mixpanel/Hotjar/FullStory for analytics, UserTesting for research, Zeplin for handoff when needed. And a lot of Notion.",
    },
    {
      keywords: ["value", "values", "believe", "philosophy", "principle", "humans"],
      answer:
        "Three things. I design for humans, not users. The best products speak to people on an emotional level — kind, simple, fun. And design is an attitude, not a department: I apply it wherever I can make a difference.",
    },
    {
      keywords: ["hire", "available", "availability", "rate", "cost", "price", "budget", "contract", "freelance", "work with you", "collaborate"],
      answer: `Glad you asked.
- Email me at ${contact.email} — I read everything myself — or find me on LinkedIn.
- I'm full-time at Giftly and take on select freelance work through Toptal: 0→1 MVPs, design systems, dashboards, mobile apps.
- If I'm not the right fit, I'll happily point you to someone who is.`,
    },
    {
      keywords: ["experience", "background", "career", "years", "history", "senior"],
      answer:
        "10+ years. Founding designer at Nifty (2016–2022), head of product design at Variant3D (2023–2025), senior product designer at Giftly (2024–now), and a long list of Toptal engagements — Atrium, Seated, SOAX, HousingAnywhere, Ring4, two official US COVID exposure apps. Based in Berlin, originally from Ukraine, formerly NYC.",
    },
    {
      keywords: ["berlin", "where are you", "location", "timezone", "remote", "nyc", "new york", "ukraine"],
      answer:
        "Berlin, working remotely with teams in New York and across Europe. I'm originally from Ukraine and spent years in NYC — which is why my case studies say 'from NYC' and my calendar says CET.",
    },
    {
      keywords: ["resume", "résumé", "cv", "pdf"],
      answer: `Sure — grab my résumé, connect on LinkedIn, or email me at ${contact.email}.`,
    },
    {
      keywords: ["contact", "email", "reach", "linkedin", "get in touch", "say hello", "instagram"],
      answer: `Email is ${contact.email}. LinkedIn and Instagram are in the footer. I reply to humans faster than to bots.`,
    },
    {
      keywords: ["easter egg", "secret", "hidden", "egg", "surprise"],
      answer:
        "There are a few. Move your mouse slowly over an empty part of the page. Try the years on the timeline. Type my name anywhere. And the footer is friendlier than it looks.",
    },
  ];

  const FALLBACKS = [
    `That one isn't in Illia LLM's script. Email me at ${contact.email} and I'll answer properly.`,
    `Illia LLM is a small set of pre-written answers, not a live model — this one's outside it. Try a suggested question, or email ${contact.email}.`,
    `Good question, no canned answer. ${contact.email} reaches the real me.`,
    `I don't have that on file. Ask about a case study, my process, or hiring — or write to ${contact.email}.`,
    `Outside my script for now. Email ${contact.email} and I'll reply myself.`,
  ];

  const FOLLOW_UPS = [
    { text: "How did you build this site?", category: "professional" },
    { text: "Do you design and build, or just design?", category: "professional" },
    { text: "What tools are in your stack?", category: "professional" },
    { text: "Tell me about Seated", category: "professional" },
    { text: "Tell me about Nifty", category: "professional" },
    { text: "What happened at Variant3D?", category: "professional" },
    { text: "What values guide your work?", category: "professional" },
    { text: "Can I see your résumé?", category: "professional" },
    { text: "What's your process?", category: "professional" },
    { text: "Where are you based?", category: "personal" },
    { text: "What do you do outside of work?", category: "personal" },
    { text: "Are there easter eggs on this site?", category: "personal" },
  ];

  return { root, R, contact, nav, projects, locked, sideProjects, testimonials, llm: { SUGGESTED_QUESTIONS, ANSWERS, FALLBACKS, FOLLOW_UPS, PROJECT_CARDS } };
})();
