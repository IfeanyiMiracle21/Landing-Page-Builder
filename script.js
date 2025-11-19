// === State ===
let sections = [];
let selectedId = null;
let history = [];
let historyStep = 0;

// === Templates ===
const templates = {
  hero: { html: `<div class="hero-section" style="background:linear-gradient(135deg,#667eea,#764ba2);color:white;padding:6rem 2rem;text-align:center;">
    <h1 contenteditable="true">Build Something Amazing</h1>
    <p contenteditable="true">Create stunning landing pages in minutes</p>
    <a href="#" class="hero-cta" contenteditable="true">Get Started</a>
  </div>`, props: {bgStart:"#667eea", bgEnd:"#764ba2", textColor:"#ffffff", headingColor:"#ffffff"} },

  features: { html: `<div class="features-section fade-up" style="padding:4rem 2rem;background:#f8fafc;">
    <div class="features-grid">
      <div class="feature-card"><div class="feature-icon">Fast</div><h3>Fast</h3><p contenteditable="true">Lightning fast</p></div>
      <div class="feature-card"><div class="feature-icon">Design</div><h3>Design</h3><p contenteditable="true">Beautiful</p></div>
      <div class="feature-card"><div class="feature-icon">Mobile</div><h3>Mobile</h3><p contenteditable="true">Responsive</p></div>
    </div>
  </div>`, props: {} },

  testimonials: { html: `<div class="fade-up" style="padding:4rem 2rem;background:#f8fafc;text-align:center;">
    <h2 contenteditable="true">What People Say</h2>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:2rem;max-width:1200px;margin:2rem auto;">
      <div style="background:white;padding:2rem;border-radius:12px;"><p contenteditable="true">"Best tool!"</p><strong>- Alex</strong></div>
      <div style="background:white;padding:2rem;border-radius:12px;"><p contenteditable="true">"Love it!"</p><strong>- Sam</strong></div>
      <div style="background:white;padding:2rem;border-radius:12px;"><p contenteditable="true">"Game changer"</p><strong>- Jordan</strong></div>
    </div>
  </div>`, props: {} },

  team: { html: `<div class="fade-up" style="padding:6rem 2rem;background:white;text-align:center;">
    <h2 contenteditable="true">Our Team</h2>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:3rem;margin-top:3rem;">
      <div><div style="width:150px;height:150px;background:#ddd;border-radius:50%;margin:auto;"></div><h3 contenteditable="true">Alex</h3><p contenteditable="true">CEO</p></div>
      <div><div style="width:150px;height:150px;background:#ddd;border-radius:50%;margin:auto;"></div><h3 contenteditable="true">Sam</h3><p contenteditable="true">Designer</p409></div>
      <div><div style="width:150px;height:150px;background:#ddd;border-radius:50%;margin:auto;"></div><h3 contenteditable="true">Jordan</h3><p contenteditable="true">Developer</p></div>
    </div>
  </div>`, props: {} },

  blog: { html: `<div class="fade-up" style="padding:4rem 2rem;background:#f1f5f9;">
    <h2 contenteditable="true" style="text-align:center;">Blog</h2>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:2rem;max-width:1200px;margin:auto;">
      <div style="background:white;border-radius:12px;overflow:hidden;"><div style="height:200px;background:#ccc;"></div><div style="padding:1.5rem;"><h3 contenteditable="true">Post 1</h3><p contenteditable="true">Content...</p></div></div>
      <div style="background:white;border-radius:12px;overflow:hidden;"><div style="height:200px;background:#ccc;"></div><div style="padding:1.5rem;"><h3 contenteditable="true">Post 2</h3><p contenteditable="true">Content...</p></div></div>
      <div style="background:white;border-radius:12px;overflow:hidden;"><div style="height:200px;background:#ccc;"></div><div style="padding:1.5rem;"><h3 contenteditable="true">Post 3</h3><p contenteditable="true">Content...</p></div></div>
    </div>
  </div>`, props: {} },

  stats: { html: `<div class="stats-section fade-up"><div class="stats-grid">
    <div class="stat-item"><h2>10K+</h2><p>Users</p></div>
    <div class="stat-item"><h2>50K+</h2><p>Pages</p></div>
    <div class="stat-item"><h2>99%</h2><p>Happy</p></div>
  </div></div>`, props: {} },

  pricing: { html: `<div class="pricing-section fade-up"><div class="pricing-grid">
    <div class="pricing-card"><h3>Starter</h3><div class="price">$9</div><p contenteditable="true">Great start</p></div>
    <div class="pricing-card"><h3>Pro</h3><div class="price">$29</div><p contenteditable="true">Most popular</p></div>
    <div class="pricing-card"><h3>Enterprise</h3><div class="price">$99</div><p contenteditable="true">Full power</p></div>
  </div></div>`, props: {} },

  cta: { html: `<div class="cta-section fade-up">
    <h2 contenteditable="true">Ready to Start?</h2>
    <a href="#" class="hero-cta" contenteditable="true">Yes!</a>
  </div>`, props: {} },

  footer: { html: `<div class="footer-section"><p>&copy; 2025 My Company</p></div>`, props: {} }
};

const presets = {
  saas: ["hero","features","testimonials","pricing","cta","footer"],
  agency: ["hero","team","features","blog","cta","footer"],
  portfolio: ["hero","features","team","testimonials","cta","footer"]
};

// === Render ===
function render() {
  const container = document.getElementById("sectionsContainer");
  if (sections.length === 0) {
    container.innerHTML = "";
    document.getElementById("dropZone").style.display = "flex";
    return;
  }
  document.getElementById("dropZone").style.display = "none";

  container.innerHTML = sections.map((sec, i) => `
    <div class="placed-section ${selectedId === sec.id ? 'selected' : ''}" data-id="${sec.id}" onclick="select(${sec.id})">
      <div class="section-controls">
        <button onclick="event.stopPropagation(); duplicate(${i})">Copy</button>
        <button onclick="event.stopPropagation(); up(${i})">Up</button>
        <button onclick="event.stopPropagation(); down(${i})">Down</button>
        <button onclick="event.stopPropagation(); remove(${i})">Delete</button>
      </div>
      <div class="section-content">${sec.html}</div>
    </div>
  `).join("");

  // Animations
  const observer = new IntersectionObserver(e => e.forEach(en => en.isIntersecting && en.target.classList.add("animate")), {threshold: 0.1});
  document.querySelectorAll(".fade-up").forEach(el => observer.observe(el));
}

// === Actions ===
function add(type) { sections.push({id: Date.now(), html: templates[type].html, props: {...templates[type].props}}); save(); render(); }
function duplicate(i) { sections.push({...sections[i], id: Date.now()}); save(); render(); }
function up(i) { if(i>0) [sections[i-1], sections[i]] = [sections[i], sections[i-1]]; save(); render(); }
function down(i) { if(i<sections.length-1) [sections[i], sections[i+1]] = [sections[i+1], sections[i]]; save(); render(); }
function remove(i) { sections.splice(i,1); save(); render(); }
function select(id) { selectedId = id; render(); showProps(); }

// === Properties Panel ===
function showProps() {
  const sec = sections.find(s => s.id === selectedId);
  if (!sec) { document.getElementById("propertiesContent").innerHTML = "<p>Select a section</p>"; return; }

  let html = `<h3>${sec.html.includes("hero") ? "Hero" : "Section"} Styles</h3>`;
  if (sec.props.bgStart) {
    html += `<div class="prop-group"><label>Gradient Start</label><input type="color" value="${sec.props.bgStart}" data-prop="bgStart"></div>`;
    html += `<div class="prop-group"><label>Gradient End</label><input type="color" value="${sec.props.bgEnd}" data-prop="bgEnd"></div>`;
  }
  html += `
    <div class="prop-group"><label>Background</label><input type="color" value="${sec.props.bgColor || '#ffffff'}" data-prop="bgColor"></div>
    <div class="prop-group"><label>Text Color</label><input type="color" value="${sec.props.textColor || '#000000'}" data-prop="textColor"></div>
    <div class="prop-group"><label>Heading Color</label><input type="color" value="${sec.props.headingColor || '#111111'}" data-prop="headingColor"></div>
  `;

  document.getElementById("propertiesContent").innerHTML = html;

  document.querySelectorAll("#propertiesContent input").forEach(inp => {
    inp.addEventListener("input", e => {
      const prop = e.target.dataset.prop;
      sec.props[prop] = e.target.value;

      const el = document.querySelector(`[data-id="${sec.id}"] .section-content > div`) || 
                 document.querySelector(`[data-id="${sec.id}"] .section-content`);

      if (prop === "bgColor") el.style.background = e.target.value;
      if (prop === "textColor") el.style.color = e.target.value;
      if (prop === "headingColor") el.querySelectorAll("h1,h2,h3").forEach(h => h.style.color = e.target.value);
      if (prop === "bgStart" || prop === "bgEnd") {
        if (el.querySelector(".hero-section")) {
          el.querySelector(".hero-section").style.background = `linear-gradient(135deg, ${sec.props.bgStart}, ${sec.props.bgEnd})`;
        }
      }
    });
  });
}

// === History ===
function save() {
  history = history.slice(0, historyStep + 1);
  history.push(JSON.parse(JSON.stringify(sections)));
  historyStep = history.length - 1;
}
document.getElementById("undoBtn").onclick = () => { if(historyStep>0) { historyStep--; sections = JSON.parse(JSON.stringify(history[historyStep])); render(); }}
document.getElementById("redoBtn").onclick = () => { if(historyStep<history.length-1) { historyStep++; sections = JSON.parse(JSON.stringify(history[historyStep])); render(); }}

// === Init ===
document.addEventListener("DOMContentLoaded", () => {
  // Drag from sidebar
  document.querySelectorAll(".section-item").forEach(item => {
    item.addEventListener("dragstart", e => e.dataTransfer.setData("type", item.dataset.type));
  });
  ["dropZone","sectionsContainer"].forEach(id => {
    const el = document.getElementById(id);
    el.addEventListener("dragover", e => e.preventDefault());
    el.addEventListener("drop", e => {
      e.preventDefault();
      const type = e.dataTransfer.getData("type");
      if(type) add(type);
    });
  });

  // Templates
  document.querySelectorAll("[data-template]").forEach(btn => {
    btn.onclick = () => {
      if(confirm("Load template?")) {
        sections = presets[btn.dataset.template].map(t => ({id: Date.now()+Math.random(), html: templates[t].html, props: {...templates[t].props}}));
        save(); render();
      }
    };
  });

  // Save / Export
  document.getElementById("saveBtn").onclick = () => {
    const name = prompt("Name?", document.getElementById("projectName").value || "My Project");
    if(name) localStorage.setItem("lpb_"+name, JSON.stringify(sections));
    alert("Saved!");
  };
  document.getElementById("exportBtn").onclick = () => {
    const css = Array.from(document.styleSheets[0].cssRules).map(r => r.cssText).join("");
    const html = `<!DOCTYPE html><html><head><style>${css}</style></head><body>${sections.map(s=>s.html).join("")}</body></html>`;
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([html], {type:"text/html"}));
    a.download = "landing-page.html";
    a.click();
  };

  document.getElementById("clearBtn").onclick = () => { if(confirm("Clear all?")) { sections=[]; save(); render(); }};
  document.getElementById("mobileToggle").onclick = () => document.getElementById("canvas").classList.toggle("mobile-preview");

  // Inline editing + smart select
  document.addEventListener("click", e => {
    if (e.target.isContentEditable) return;
    const text = e.target.closest("h1,h2,h3,p,a,[contenteditable]");
    if (text) {
      const section = text.closest(".placed-section");
      if (section) select(parseInt(section.dataset.id));
    }
  });
  document.addEventListener("dblclick", e => {
    if (e.target.closest(".placed-section") && !e.target.closest(".section-controls")) {
      e.target.contentEditable = true;
      e.target.focus();
    }
  });
  document.addEventListener("blur", e => {
    if (e.target.isContentEditable) {
      e.target.contentEditable = false;
      const section = e.target.closest(".placed-section");
      if (section) {
        const sec = sections.find(s => s.id == section.dataset.id);
        if (sec) sec.html = section.querySelector(".section-content").innerHTML;
      }
    }
  }

  save();
  render();
});
