(function () {
  "use strict";

  const COLOR_VARS = { teal: "--teal", orange: "--orange", violet: "--violet", magenta: "--magenta", green: "--green" };
  const DIMENSION_LABELS = {
    niche_method: "How they pick a niche / product",
    trust_mechanism: "How they build trust",
    content_engine: "Content / distribution engine",
    offer_construction: "How the offer is built",
    sales_mechanics: "Sales mechanics",
    monetization_ladder: "Monetization ladder",
    primary_risk: "Primary risk / bottleneck",
    capital_required: "Capital required"
  };

  let activeGuruId = GURUS.find((g) => g.status === "populated").id;
  let activeTab = "overview";

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }

  function getGuru(id) { return GURUS.find((g) => g.id === id); }

  // ---------- Theme ----------
  function initTheme() {
    const saved = localStorage.getItem("gv-theme");
    if (saved) document.documentElement.setAttribute("data-theme", saved);
    updateThemeLabel();
    document.getElementById("themeToggle").addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme") ||
        (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
      const next = current === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      try { localStorage.setItem("gv-theme", next); } catch (e) {}
      updateThemeLabel();
    });
  }
  function updateThemeLabel() {
    const current = document.documentElement.getAttribute("data-theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    document.getElementById("themeToggle").textContent = current === "dark" ? "☀️ Light mode" : "🌙 Dark mode";
  }

  // ---------- Tabs ----------
  function initTabs() {
    document.getElementById("tabs").addEventListener("click", (e) => {
      const btn = e.target.closest(".tab-btn");
      if (!btn) return;
      activeTab = btn.dataset.tab;
      document.querySelectorAll(".tab-btn").forEach((b) => b.classList.toggle("active", b === btn));
      document.querySelectorAll(".panel").forEach((p) => p.classList.toggle("active", p.id === "panel-" + activeTab));
    });
  }

  function goToTab(tab) {
    activeTab = tab;
    document.querySelectorAll(".tab-btn").forEach((b) => b.classList.toggle("active", b.dataset.tab === tab));
    document.querySelectorAll(".panel").forEach((p) => p.classList.toggle("active", p.id === "panel-" + tab));
  }

  // ---------- Guru pills ----------
  function renderGuruPills() {
    const el = document.getElementById("guruPills");
    el.innerHTML = GURUS.map((g) => {
      if (g.status !== "populated") {
        return `<button class="guru-pill placeholder" type="button" disabled>${escapeHtml(g.name)} — coming soon</button>`;
      }
      return `<button class="guru-pill${g.id === activeGuruId ? " active" : ""}" type="button" data-guru="${g.id}">${escapeHtml(g.name)}</button>`;
    }).join("") + `<button class="guru-pill placeholder" type="button" disabled>+ Add next guru</button>`;

    el.querySelectorAll(".guru-pill[data-guru]").forEach((btn) => {
      btn.addEventListener("click", () => {
        activeGuruId = btn.dataset.guru;
        renderAll();
      });
    });
  }

  // ---------- Meter ----------
  function meterHtml(stat) {
    return `
      <div class="meter-card">
        <div class="meter" style="--pct:${stat.value}; --meter-color: var(--teal);">
          <span>${stat.value}</span>
        </div>
        <div class="meter-text">
          <div class="meter-label">${escapeHtml(stat.label)}</div>
          <div class="meter-note">${escapeHtml(stat.note)}</div>
        </div>
      </div>`;
  }

  // ---------- Overview ----------
  function renderOverview(guru) {
    const syn = SYNTHESIS[guru.id];
    const panel = document.getElementById("panel-overview");
    if (!syn) {
      panel.innerHTML = `<div class="card"><p class="compare-empty">No synthesis written yet for ${escapeHtml(guru.name)}.</p></div>`;
      return;
    }
    panel.innerHTML = `
      <div class="card hero">
        <div class="hero-inner">
          <div class="hero-eyebrow">Guru profile</div>
          <h2>${escapeHtml(guru.name)}</h2>
          <p class="tagline">${escapeHtml(guru.tagline)}</p>
          <p class="credibility">${escapeHtml(guru.credibility)}</p>
          <div class="one-liner">${escapeHtml(syn.oneLiner)}</div>
        </div>
      </div>

      <div class="card">
        <div class="section-label">At a glance — our editorial read, not his own claim</div>
        <div class="stat-row">
          ${guru.scorecard.map(meterHtml).join("")}
        </div>
        <div class="chip-row">
          ${guru.chips.map((c) => `<div class="chip"><b>${escapeHtml(c.label)}:</b> <span>${escapeHtml(c.value)}</span></div>`).join("")}
        </div>
      </div>

      <div class="card">
        <div class="section-label">The pipeline (click a stage to jump into it)</div>
        <div class="pipeline" id="overviewPipeline">
          ${guru.modules.map((m) => `
            <div class="pipe-step" data-module="${m.id}" style="border-color: var(${COLOR_VARS[m.color]});">
              <div class="num" style="color: var(${COLOR_VARS[m.color]});">${m.stage}</div>
              <div class="label">${escapeHtml(m.stageLabel)}</div>
              <div class="sub">${escapeHtml(m.pdfTitle.replace(/^FRCS Module \d+ . /, ""))}</div>
            </div>`).join("")}
        </div>
      </div>

      <div class="card prose">
        <div class="section-label">The read, in plain language</div>
        ${syn.paragraphs.map((p) => `<p>${escapeHtml(p)}</p>`).join("")}

        <h3>Where to be skeptical</h3>
        <ul class="skeptical-list">
          ${syn.skeptical.map((s) => `<li>${escapeHtml(s)}</li>`).join("")}
        </ul>

        <h3>How this fits the bigger picture</h3>
        <p>${escapeHtml(syn.howItFits)}</p>
      </div>
    `;

    panel.querySelectorAll(".pipe-step").forEach((el) => {
      el.addEventListener("click", () => {
        goToTab("framework");
        renderFramework(getGuru(activeGuruId), "");
        requestAnimationFrame(() => {
          const target = document.querySelector(`.module-card[data-module="${el.dataset.module}"]`);
          if (target) {
            target.classList.add("open");
            target.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        });
      });
    });
  }

  // ---------- Framework (module accordion) ----------
  function matchesQuery(module, q) {
    if (!q) return true;
    q = q.toLowerCase();
    const hay = [
      module.thesis,
      ...module.frameworks.map((f) => f.label + " " + f.desc),
      ...module.tactics,
      ...module.quotes,
      ...module.examples.map((e) => e.who + " " + e.what)
    ].join(" ").toLowerCase();
    return hay.includes(q);
  }

  function renderFramework(guru, query) {
    const container = document.getElementById("frameworkContent");
    const modules = guru.modules.filter((m) => matchesQuery(m, query));
    if (!modules.length) {
      container.innerHTML = `<div class="card"><p class="compare-empty">No matches for that search.</p></div>`;
      return;
    }
    container.innerHTML = modules.map((m, i) => `
      <div class="card module-card${i === 0 && !query ? " open" : ""}" data-module="${m.id}">
        <div class="module-head" style="--meter-color: var(${COLOR_VARS[m.color]});">
          <div class="stage-badge" style="background: var(${COLOR_VARS[m.color]});">${m.stage}</div>
          <div>
            <h3>${escapeHtml(m.stageLabel)}</h3>
            <div class="pdf-ref">${escapeHtml(m.pdfTitle)}</div>
          </div>
          <div class="chevron">▼</div>
        </div>
        <div class="module-body">
          <p class="module-thesis">${escapeHtml(m.thesis)}</p>

          <div class="section-label">Frameworks &amp; models</div>
          <div class="framework-grid">
            ${m.frameworks.map((f) => `<div class="framework-item"><b>${escapeHtml(f.label)}</b><span>${escapeHtml(f.desc)}</span></div>`).join("")}
          </div>

          <div class="section-label">Tactics, in order</div>
          <ol class="tactic-list" style="--meter-color: var(${COLOR_VARS[m.color]});">
            ${m.tactics.map((t) => `<li>${escapeHtml(t)}</li>`).join("")}
          </ol>

          <div class="section-label">Notable quotes</div>
          <div class="quote-list">
            ${m.quotes.map((q) => `<blockquote class="quote" style="--meter-color: var(${COLOR_VARS[m.color]});">“${escapeHtml(q)}”</blockquote>`).join("")}
          </div>

          <div class="section-label">Examples &amp; case studies</div>
          <div class="example-grid">
            ${m.examples.map((e) => `<div class="example-item"><b>${escapeHtml(e.who)}</b><p>${escapeHtml(e.what)}</p></div>`).join("")}
          </div>
        </div>
      </div>
    `).join("");

    container.querySelectorAll(".module-head").forEach((head) => {
      head.addEventListener("click", () => head.closest(".module-card").classList.toggle("open"));
    });
  }

  function initFrameworkSearch() {
    const input = document.getElementById("frameworkSearch");
    input.addEventListener("input", () => renderFramework(getGuru(activeGuruId), input.value.trim()));
  }

  // ---------- Compare ----------
  function renderCompare() {
    const panel = document.getElementById("panel-compare");
    const populated = GURUS.filter((g) => g.status === "populated");

    const headerCells = populated.map((g) => `<th>${escapeHtml(g.name)}</th>`).join("")
      + `<th><div class="add-guru-cell">+ next guru slots in here, same rows</div></th>`;

    const rows = Object.keys(DIMENSION_LABELS).map((key) => {
      const cells = populated.map((g) => `<td>${escapeHtml(g.dimensions[key] || "")}</td>`).join("")
        + `<td class="compare-empty">—</td>`;
      return `<tr><th>${DIMENSION_LABELS[key]}</th>${cells}</tr>`;
    }).join("");

    panel.innerHTML = `
      <div class="card">
        <div class="section-label">Same eight questions, every guru</div>
        <p style="color:var(--ink-soft); font-size:0.88rem; margin-top:-4px;">
          Built so a second and third guru drop straight into new columns without re-deriving the rows. Add a guru in <code>data.js</code> with the same <code>dimensions</code> keys and it appears here automatically.
        </p>
        <div class="compare-scroll">
          <table class="compare">
            <thead><tr><th></th>${headerCells}</tr></thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
      </div>
    `;
  }

  // ---------- Vault ----------
  const STAGE_ICONS = { teal: "🎯", orange: "🪪", violet: "👁️", magenta: "🏷️", green: "💸" };

  function renderVault(guru) {
    const panel = document.getElementById("panel-vault");
    panel.innerHTML = `
      <div class="card">
        <div class="section-label">Source material</div>
        <p style="color:var(--ink-soft); font-size:0.88rem; margin-top:-4px;">${escapeHtml(guru.source)}</p>
        ${guru.modules.map((m) => `
          <div class="vault-item">
            <div class="vault-icon" style="background: var(${COLOR_VARS[m.color]});">${STAGE_ICONS[m.color] || "📄"}</div>
            <div>
              <h4>${escapeHtml(m.pdfTitle)}</h4>
              <p>${escapeHtml(m.thesis)}</p>
            </div>
          </div>
        `).join("")}
      </div>
      <div class="card">
        <div class="section-label">Credibility / track record cited</div>
        <p style="font-size:0.88rem; line-height:1.6;">${escapeHtml(guru.credibility)}</p>
      </div>
    `;
  }

  // ---------- Render all ----------
  function renderAll() {
    const guru = getGuru(activeGuruId);
    renderGuruPills();
    renderOverview(guru);
    renderFramework(guru, document.getElementById("frameworkSearch").value.trim());
    renderCompare();
    renderVault(guru);
  }

  initTheme();
  initTabs();
  initFrameworkSearch();
  renderAll();
})();
