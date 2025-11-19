// ==== DATA ====
let sections = [];
let selectedId = null;
let history = [];
let historyStep = -1;

const templates = {
  hero: {html:`<div class="hero-section" style="background:linear-gradient(135deg,#667eea,#764ba2);color:white;padding:8rem 2rem;text-align:center;">
    <h1 contenteditable="true">Your Amazing Product</h1>
    <p contenteditable="true">Build beautiful landing pages in minutes — no code needed.</p>
    <a href="#" class="hero-cta" contenteditable="true" style="display:inline-block;padding:1rem 2.5rem;background:white;color:#667eea;border-radius:50px;margin-top:2rem;font-weight:bold;">Get Started</a>
  </div>`, props:{bgStart:"#667eea",bgEnd:"#764ba2"}},
  
  features: {html:`<div style="padding:5rem 2rem;background:#f8fafc;text-align:center;">
    <h2 contenteditable="true" style="margin-bottom:3rem;">Key Features</h2>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:2rem;max-width:1200px;margin:auto;">
      <div style="padding:2rem;background:white;border-radius:12px;"><h3 contenteditable="true">Fast</h3><p contenteditable="true">Lightning performance</p></div>
      <div style="padding:2rem;background:white;border-radius:12px;"><h3 contenteditable="true">Beautiful</h3><p contenteditable="true">Stunning design</p></div>
      <div style="padding:2rem;background:white;border-radius:12px;"><h3 contenteditable="true">Responsive</h3><p contenteditable="true">Works everywhere</p></div>
    </div>
  </div>`, props:{bgColor:"#f8fafc"}},

  testimonials: {html:`<div style="padding:5rem 2rem;background:#1e293b;color:white;text-align:center;">
    <h2 contenteditable="true">What People Say</h2>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:2rem;max-width:1200px;margin:3rem auto;">
      <div style="background:rgba(255,255,255,0.1);padding:2rem;border-radius:12px;"><p contenteditable="true">"Game changer!"</p><strong>- Alex</strong></div>
      <div style="background:rgba(255,255,255,0.1);padding:2rem;border-radius:12px;"><p contenteditable="true">"Love it!"</p><strong>- Sam</strong></div>
    </div>
  </div>`, props:{bgColor:"#1e293b"}},

  stats: {html:`<div style="background:#1e293b;color:white;padding:5rem 2rem;text-align:center;">
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:3rem;max-width:1000px;margin:auto;">
      <div><h2 contenteditable="true" style="font-size:3.5rem;color:#3b82f6;">10K+</h2><p>Users</p></div>
      <div><h2 contenteditable="true" style="font-size:3.5rem;color:#3b82f6;">99%</h2><p>Satisfaction</p></div>
    </div>
  </div>`, props:{bgColor:"#1e293b"}},

  pricing: {html:`<div style="padding:5rem 2rem;background:white;text-align:center;">
    <h2 contenteditable="true">Simple Pricing</h2>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:2rem;max-width:1000px;margin:3rem auto;">
      <div style="border:2px solid #e2e8f0;padding:2rem;border-radius:12px;"><h3>Starter</h3><div style="font-size:2.5rem;font-weight:bold;color:#3b82f6;margin:1rem 0;">$9/mo</div><p contenteditable="true">Basic features</p></div>
      <div style="border:2px solid #3b82f6;padding:2rem;border-radius:12px;background:#3b82f6;color:white;"><h3>Pro</h3><div style="font-size:2.5rem;font-weight:bold;margin:1rem 0;">$29/mo</div><p contenteditable="true">Most popular</p></div>
    </div>
  </div>`, props:{bgColor:"#ffffff"}},

  cta: {html:`<div style="background:linear-gradient(135deg,#f093fb,#f5576c);color:white;padding:6rem 2rem;text-align:center;">
    <h2 contenteditable="true">Ready to Start?</h2>
    <p contenteditable="true">Join thousands of happy users</p>
    <a href="#" contenteditable="true" style="display:inline-block;padding:1rem 2.5rem;background:white;color:#f5576c;border-radius:50px;margin-top:2rem;font-weight:bold;">Get Started Now</a>
  </div>`, props:{bgStart:"#f093fb",bgEnd:"#f5576c"}},

  footer: {html:`<div style="background:#0f172a;color:#94a3b8;padding:3rem;text-align:center;">
    <p>&copy; 2025 Your Company. Made with ❤️ using Landing Builder</p>
  </div>`, props:{bgColor:"#0f172a"}}
};

const presets = {
  saas: ["hero","features","testimonials","stats","pricing","cta","footer"],
  agency: ["hero","features","testimonials","pricing","cta","footer"]
};

// ==== RENDER ====
function render() {
  const container = document.getElementById("sectionsContainer");
  if (sections.length === 0) {
    container.innerHTML = "";
    document.getElementById("dropZone").style.display = "flex";
    return;
  }
  document.getElementById("dropZone").style.display = "none";

  container.innerHTML = sections.map(sec => `
    <div class="placed-section ${selectedId === sec.id ? 'selected' : ''}" data-id="${sec.id}">
      <div class="section-controls">
        <button onclick="duplicate(${sec.id})">Copy</button>
        <button onclick="moveUp(${sec.id})">↑</button>
        <button onclick="moveDown(${sec.id})">↓</button>
        <button onclick="remove(${sec.id})">×</button>
      </div>
      <button class="image-upload-btn" onclick="uploadImage(${sec.id})">Upload Image</button>
      <div class="section-content">${sec.html}</div>
    </div>
  `).join("");
}

function saveHistory() {
  history = history.slice(0, historyStep + 1);
  history.push(JSON.parse(JSON.stringify(sections)));
  historyStep++;
}

function addSection(type) {
  const tid = Date.now();
  sections.push({ id: tid, html: templates[type].html, props: { ...templates[type].props } });
  saveHistory();
  render();
  selectSection(tid);
}

// ==== ACTIONS ====
function duplicate(id) { const i = sections.findIndex(s=>s.id===id); if(i>-1){ sections.splice(i+1,0,{...sections[i],id:Date.now()}); saveHistory(); render(); }}
function moveUp(id) { const i = sections.findIndex(s=>s.id===id); if(i>0){ [sections[i-1],sections[i]] = [sections[i],sections[i-1]]; saveHistory(); render(); }}
function moveDown(id) { const i = sections.findIndex(s=>s.id===id); if(i<sections.length-1){ [sections[i],sections[i+1]] = [sections[i+1],sections[i]]; saveHistory(); render(); }}
function remove(id) { sections = sections.filter(s=>s.id!==id); selectedId=null; saveHistory(); render(); showProps(); }
function selectSection(id) { selectedId = id; render(); showProps(); }

// ==== IMAGE UPLOAD ====
function uploadImage(sectionId) {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";
  input.onchange = e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = evt => {
      const imgHtml = `<img src="${evt.target.result}" style="max-width:100%;height:auto;border-radius:8px;margin:1rem 0;display:block;" alt="Uploaded image">`;
      const sec = sections.find(s=>s.id===sectionId);
      sec.html += imgHtml;
      saveHistory();
      render();
      selectSection(sectionId);
    };
    reader.readAsDataURL(file);
  };
  input.click();
}

// ==== PROPERTIES PANEL ====
function showProps() {
  const sec = sections.find(s=>s.id===selectedId);
  const panel = document.getElementById("propertiesContent");
  if (!sec) { panel.innerHTML = "<p style='color:var(--text-secondary);'>Select a section</p>"; return; }

  let html = `<h3 style="color:var(--accent);margin-bottom:1rem;">Section Styles</h3>`;

  if (sec.props.bgStart !== undefined) {
    html += `<div class="prop-group"><label>Gradient Start</label><input type="color" value="${sec.props.bgStart}" data-prop="bgStart"></div>`;
    html += `<div class="prop-group"><label>Gradient End</label><input type="color" value="${sec.props.bgEnd}" data-prop="bgEnd"></div>`;
  }
  if (sec.props.bgColor !== undefined) {
    html += `<div class="prop-group"><label>Background Color</label><input type="color" value="${sec.props.bgColor}" data-prop="bgColor"></div>`;
  }

  panel.innerHTML = html;

  panel.querySelectorAll("input").forEach(inp => {
    inp.oninput = () => {
      const prop = inp.dataset.prop;
      sec.props[prop] = inp.value;
      const root = document.querySelector(`[data-id="${sec.id}"] .section-content > *`) || document.querySelector(`[data-id="${sec.id}"] .section-content`);
      if (prop === "bgColor") root.style.background = inp.value;
      if (prop.includes("bgStart") || prop.includes("bgEnd")) {
        root.style.background = `linear-gradient(135deg, ${sec.props.bgStart}, ${sec.props.bgEnd})`;
      }
      saveHistory();
    };
  });
}

// ==== INIT ====
document.addEventListener("DOMContentLoaded", () => {
  saveHistory(); // initial empty state

  // Drag & Drop
  document.querySelectorAll(".section-item").forEach(el => {
    el.addEventListener("dragstart", e => {
      e.dataTransfer.setData("type", el.dataset.type);
    });
  });

  ["dropZone", "sectionsContainer"].forEach(id => {
    const zone = document.getElementById(id);
    zone.addEventListener("dragover", e => e.preventDefault());
    zone.addEventListener("dragenter", () => zone.classList.add("drag-over"));
    zone.addEventListener("dragleave", () => zone.classList.remove("drag-over"));
    zone.addEventListener("drop", e => {
      e.preventDefault();
      zone.classList.remove("drag-over");
      const type = e.dataTransfer.getData("type");
      if (type) addSection(type);
    });
  });

  // Click to select
  document.getElementById("sectionsContainer").addEventListener("click", e => {
    if (e.target.closest(".section-controls") || e.target.classList.contains("image-upload-btn")) return;
    const sec = e.target.closest(".placed-section");
    if (sec) selectSection(Number(sec.dataset.id));
  });

  // Double-click to edit text
  document.getElementById("sectionsContainer").addEventListener("dblclick", e => {
    let el = e.target;
    if (el.isContentEditable) return;
    if (["H1","H2","H3","P","A","DIV","SPAN"].includes(el.tagName)) {
      el.contentEditable = true;
      el.focus();
      document.getSelection().selectAllChildren(el);
    }
  });

  document.getElementById("sectionsContainer").addEventListener("blur", e => {
    if (e.target.isContentEditable) {
      e.target.contentEditable = false;
      const secDiv = e.target.closest(".placed-section");
      const sec = sections.find(s => s.id == secDiv.dataset.id);
      if (sec) {
        sec.html = secDiv.querySelector(".section-content").innerHTML;
        saveHistory();
      }
    }
  }, true);

  // Buttons
  document.querySelectorAll("[data-template]").forEach(btn => {
    btn.onclick = () => {
      if (confirm("Load template? This will replace current page.")) {
        sections = presets[btn.dataset.template].map(t => ({
          id: Date.now() + Math.random()*10000,
          html: templates[t].html,
          props: {...templates[t].props}
        }));
        selectedId = null;
        saveHistory();
        render();
        showProps();
      }
    };
  });

  document.getElementById("undoBtn").onclick = () => { if(historyStep>0){ historyStep--; sections = JSON.parse(JSON.stringify(history[historyStep])); render(); showProps(); }};
  document.getElementById("redoBtn").onclick = () => { if(historyStep<history.length-1){ historyStep++; sections = JSON.parse(JSON.stringify(history[historyStep])); render(); showProps(); }};
  document.getElementById("clearBtn").onclick = () => { if(confirm("Clear all?")){ sections=[]; selectedId=null; saveHistory(); render(); }};

  document.getElementById("saveBtn").onclick = () => {
    const name = prompt("Project name:", document.getElementById("projectName").value || "My Project");
    if(name) localStorage.setItem("lpb_"+name, JSON.stringify(sections));
    alert("Saved!");
  };

  document.getElementById("exportBtn").onclick = () => {
    const fullHtml = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Landing Page</title><style>${document.querySelector("style").textContent}</style></head><body>${sections.map(s=>s.html).join("")}</body></html>`;
    const blob = new Blob([fullHtml], {type:"text/html"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "my-landing-page.html";
    a.click();
  };

  document.getElementById("mobileToggle").onclick = () => document.getElementById("canvas").classList.toggle("mobile-preview");

  render();
});
