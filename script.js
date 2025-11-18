let sections = [];
let selectedSection = null;
let history = [];
let historyIndex = -1;
let isMobilePreview = false;
let draggedElement = null;

const sectionTemplates = {
  hero: {
    html: `<div class="hero-section">
      <h1 contenteditable="true">Build Something Amazing</h1>
      <p contenteditable="true">Create stunning landing pages in minutes with drag & drop</p>
      <a href="#" class="hero-cta" contenteditable="true">Get Started</a>
    </div>`,
    props: { bgStart: "#667eea", bgEnd: "#764ba2" }
  },
  features: {
    html: `<div class="features-section fade-up">
      <div class="features-grid">
        <div class="feature-card"><div class="feature-icon">Fast</div><h3>Lightning Fast</h3><p contenteditable="true">Build pages in minutes</p></div>
        <div class="feature-card"><div class="feature-icon">Design</div><h3>Beautiful Design</h3><p contenteditable="true">Professional templates</p></div>
        <div class="feature-card"><div class="feature-icon">Mobile</div><h3>Fully Responsive</h3><p contenteditable="true">Looks great everywhere</p></div>
      </div>
    </div>`,
    props: {}
  },
  testimonials: {
    html: `<div style="padding:4rem 2rem;background:#f8fafc;text-align:center;" class="fade-up">
      <h2 contenteditable="true">What People Say</h2>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:2rem;max-width:1200px;margin:2rem auto;">
        <div style="background:white;padding:2rem;border-radius:12px;box-shadow:0 5px 20px rgba(0,0,0,0.1);">
          <p contenteditable="true">"This changed everything!"</p><strong>- Sarah K.</strong>
        </div>
        <div style="background:white;padding:2rem;border-radius:12px;box-shadow:0 5px 20px rgba(0,0,0,0.1);">
          <p contenteditable="true">"Best builder I've used"</p><strong>- Mike Chen</strong>
        </div>
        <div style="background:white;padding:2rem;border-radius:12px;box-shadow:0 5px 20px rgba(0,0,0,0.1);">
          <p contenteditable="true">"So easy and powerful"</p><strong>- Lisa Wong</strong>
        </div>
      </div>
    </div>`,
    props: {}
  },
  team: {
    html: `<div style="padding:6rem 2rem;background:white;text-align:center;" class="fade-up">
      <h2 contenteditable="true">Our Amazing Team</h2>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:3rem;margin-top:3rem;">
        <div><div style="width:150px;height:150px;background:#e2e8f0;border-radius:50%;margin:auto;"></div><h3 contenteditable="true">Alex</h3><p contenteditable="true">CEO</p></div>
        <div><div style="width:150px;height:150px;background:#e2e8f0;border-radius:50%;margin:auto;"></div><h3 contenteditable="true">Sam</h3><p contenteditable="true">Designer</p></div>
        <div><div style="width:150px;height:150px;background:#e2e8f0;border-radius:50%;margin:auto;"></div><h3 contenteditable="true">Jordan</h3><p contenteditable="true">Developer</p></div>
      </div>
    </div>`,
    props: {}
  },
  blog: {
    html: `<div style="padding:4rem 2rem;background:#f1f5f9;" class="fade-up">
      <h2 contenteditable="true" style="text-align:center;margin-bottom:3rem;">Latest Posts</h2>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:2rem;max-width:1200px;margin:auto;">
        <div style="background:white;border-radius:12px;overflow:hidden;">
          <div style="height:200px;background:#cbd5e1;"></div>
          <div style="padding:1.5rem;"><h3 contenteditable="true">How We Built This</h3><p contenteditable="true">The story behind our new product...</p></div>
        </div>
        <div style="background:white;border-radius:12px;overflow:hidden;">
          <div style="height:200px;background:#cbd5e1;"></div>
          <div style="padding:1.5rem;"><h3 contenteditable="true">Design Tips 2025</h3><p contenteditable="true">Latest trends you need to know...</p></div>
        </div>
        <div style="background:white;border-radius:12px;overflow:hidden;">
          <div style="height:200px;background:#cbd5e1;"></div>
          <div style="padding:1.5rem;"><h3 contenteditable="true">Launch Checklist</h3><p contenteditable="true">Don't forget these before going live...</p></div>
        </div>
      </div>
    </div>`,
    props: {}
  },
  stats: {
    html: `<div class="stats-section fade-up">
      <div class="stats-grid">
        <div class="stat-item"><h2>10K+</h2><p>Active Users</p></div>
        <div class="stat-item"><h2>50K+</h2><p>Pages Created</p></div>
        <div class="stat-item"><h2>99%</h2><p>Satisfaction Rate</p></div>
      </div>
    </div>`,
    props: {}
  },
  pricing: {
    html: `<div class="pricing-section fade-up">
      <div class="pricing-grid">
        <div class="pricing-card"><h3>Starter</h3><div class="price">$9</div><p contenteditable="true">Perfect for individuals</p></div>
        <div class="pricing-card"><h3>Pro</h3><div class="price">$29</div><p contenteditable="true">For growing teams</p></div>
        <div class="pricing-card"><h3>Enterprise</h3><div class="price">$99</div><p contenteditable="true">Full power & support</p></div>
      </div>
    </div>`,
    props: {}
  },
  cta: {
    html: `<div class="cta-section fade-up">
      <h2 contenteditable="true">Ready to Get Started?</h2>
      <p contenteditable="true">Join thousands of happy users</p>
      <a href="#" class="hero-cta" contenteditable="true">Start Building Now</a>
    </div>`,
    props: {}
  },
  footer: {
    html: `<div class="footer-section">
      <p>&copy; 2025 Your Company. Made with Landing Page Builder</p>
    </div>`,
    props: {}
  }
};

const templates = {
  saas: ["hero","features","testimonials","pricing","cta","footer"],
  agency: ["hero","team","features","blog","cta","footer"],
  portfolio: ["hero","features","team","testimonials","cta","footer"]
};

// === Drag & Drop Setup ===
function setupDragAndDrop() {
  document.querySelectorAll('.section-item').forEach(item => {
    item.addEventListener('dragstart', e => {
      e.dataTransfer.setData('type', e.target.dataset.type);
      e.dataTransfer.effectAllowed = 'copy';
    });
  });

  const dropZone = document.getElementById('dropZone');
  const container = document.getElementById('sectionsContainer');

  [dropZone, container].forEach(zone => {
    zone.addEventListener('dragover', e => { e.preventDefault(); e.dataTransfer.dropEffect = 'copy'; dropZone.classList.add('drag-over'); });
    zone.addEventListener('dragleave', () => dropZone.classList.remove('drag-over'));
    zone.addEventListener('drop', e => {
      e.preventDefault();
      dropZone.classList.remove('drag-over');
      const type = e.dataTransfer.getData('type');
      if (type) addSection(type);
    });
  });
}

// === Core Functions ===
function addSection(type) {
  const template = sectionTemplates[type];
  const section = {
    id: Date.now() + Math.random(),
    type,
    html: template.html,
    props: { ...template.props }
  };
  sections.push(section);
  saveToHistory();
  renderSections();
}

function renderSections() {
  const container = document.getElementById('sectionsContainer');
  const dropZone = document.getElementById('dropZone');

  if (sections.length === 0) {
    container.innerHTML = '';
    dropZone.style.display = 'flex';
    return;
  }
  dropZone.style.display = 'none';

  container.innerHTML = sections.map(sec => `
    <div class="placed-section" data-id="${sec.id}" draggable="true" onclick="selectSection(${sec.id})">
      <div class="section-controls">
        <button class="control-btn" onclick="event.stopPropagation(); duplicateSection(${sec.id})">Copy</button>
        <button class="control-btn" onclick="event.stopPropagation(); moveUp(${sec.id})">Up</button>
        <button class="control-btn" onclick="event.stopPropagation(); moveDown(${sec.id})">Down</button>
        <button class="control-btn" onclick="event.stopPropagation(); deleteSection(${sec.id})">Delete</button>
      </div>
      <div class="section-content">${sec.html}</div>
    </div>
  `).join('');

  // Reordering drag
  container.querySelectorAll('.placed-section').forEach(el => {
    el.addEventListener('dragstart', e => { draggedElement = el; el.classList.add('dragging'); });
    el.addEventListener('dragover', e => e.preventDefault());
    el.addEventListener('drop', e => {
      if (draggedElement && draggedElement !== el) {
        const from = sections.findIndex(s => s.id == draggedElement.dataset.id);
        const to = sections.findIndex(s => s.id == el.dataset.id);
        sections.splice(to, 0, sections.splice(from, 1)[0]);
        saveToHistory();
        renderSections();
      }
    });
    el.addEventListener('dragend', () => el.classList.remove('dragging'));
  });

  // Scroll animations
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('animate'); });
  }, { threshold: 0.1 });
  container.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
}

function selectSection(id) {
  selectedSection = sections.find(s => s.id === id);
  renderPropertiesPanel();
}

function renderPropertiesPanel() {
  if (!selectedSection) {
    document.getElementById('propertiesContent').innerHTML = '<p>Select a section to edit</p>';
    return;
  }

  let html = `<h3>${selectedSection.type.charAt(0).toUpperCase() + selectedSection.type.slice(1)}</h3>`;

  if (selectedSection.type === 'hero') {
    html += `
      <div class="prop-group"><label>Gradient Start</label><input type="color" value="${selectedSection.props.bgStart}" data-prop="bgStart"></div>
      <div class="prop-group"><label>Gradient End</label><input type="color" value="${selectedSection.props.bgEnd}" data-prop="bgEnd"></div>
    `;
  }

  html += `<div class="prop-group"><label>Background Color</label><input type="color" value="${selectedSection.props.bgColor || '#ffffff'}" data-prop="bgColor"></div>`;

  document.getElementById('propertiesContent').innerHTML = html;

  document.querySelectorAll('#propertiesContent input').forEach(inp => {
    inp.addEventListener('input', e => {
      const prop = e.target.dataset.prop;
      selectedSection.props[prop] = e.target.value;

      const sectionEl = document.querySelector(`[data-id="${selectedSection.id}"] .section-content > div`);
      if (selectedSection.type === 'hero') {
        const hero = document.querySelector(`[data-id="${selectedSection.id}"] .hero-section`);
        if (hero) hero.style.background = `linear-gradient(135deg, ${selectedSection.props.bgStart}, ${selectedSection.props.bgEnd})`;
      } else if (sectionEl) {
        sectionEl.style.background = e.target.value;
      }
    });
  });
}

// === Controls ===
function duplicateSection(id) { event.stopPropagation(); const s = sections.find(x=>x.id===id); sections.push({...s, id: Date.now()+Math.random()}); saveToHistory(); renderSections(); }
function moveUp(id) { const i = sections.findIndex(s=>s.id===id); if(i>0){ [sections[i-1],sections[i]]=[sections[i],sections[i-1]]; saveToHistory(); renderSections(); }}
function moveDown(id) { const i = sections.findIndex(s=>s.id===id); if(i<sections.length-1){ [sections[i],sections[i+1]]=[sections[i+1],sections[i]]; saveToHistory(); renderSections(); }}
function deleteSection(id) { sections = sections.filter(s=>s.id!==id); saveToHistory(); renderSections(); }
function clearAll() { if(confirm('Clear everything?')) { sections=[]; saveToHistory(); renderSections(); }}
function toggleMobile() { isMobilePreview = !isMobilePreview; document.getElementById('canvas').classList.toggle('mobile-preview', isMobilePreview); }

// === History ===
function saveToHistory() {
  history = history.slice(0, historyIndex + 1);
  history.push(sections.map(s => ({...s, props:{...s.props}, html:s.html})));
  historyIndex++;
}
function undo() { if(historyIndex > 0){ historyIndex--; sections = history[historyIndex].map(s=>({...s})); renderSections(); }}
function redo() { if(historyIndex < history.length-1){ historyIndex++; sections = history[historyIndex].map(s=>({...s})); renderSections(); }}

// === Projects ===
function saveProject() {
  const name = document.getElementById('projectName').value.trim() || `Project ${new Date().toLocaleString()}`;
  const data = { name, sections: sections.map(s=>({...s, props:{...s.props}})) };
  let projects = JSON.parse(localStorage.getItem('lpb_projects') || '[]');
  projects = projects.filter(p => p.name !== name);
  projects.push(data);
  localStorage.setItem('lpb_projects', JSON.stringify(projects));
  alert('Project saved!');
  loadSavedProjectsList();
}
function loadSavedProjectsList() {
  const projects = JSON.parse(localStorage.getItem('lpb_projects') || '[]');
  document.getElementById('savedProjects').innerHTML = '<h3 style="margin:1rem 0 0.5rem;font-size:0.9rem;color:var(--text-secondary);">Saved Projects</h3>' +
    projects.map(p => `<div class="project-item" onclick="loadProject('${p.name}')">${p.name}</div>`).join('');
}
function loadProject(name) {
  const projects = JSON.parse(localStorage.getItem('lpb_projects') || '[]');
  const proj = projects.find(p => p.name === name);
  if(proj){ sections = proj.sections; saveToHistory(); renderSections(); }
}
function loadTemplate(name) {
  if(!confirm(`Load ${name.toUpperCase()} template? Current work will be lost.`)) return;
  sections = templates[name].map(type => ({
    id: Date.now() + Math.random(),
    type,
    html: sectionTemplates[type].html,
    props: {...sectionTemplates[type].props}
  }));
  saveToHistory();
  renderSections();
}

// === Export ===
function exportHTML() {
  const fullCSS = document.querySelector('link[rel="stylesheet"]').href.includes('http') 
    ? document.getElementById('dynamicCSS')?.textContent || document.querySelector('style')?.textContent || ''
    : document.documentElement.outerHTML.match(/<style>([\s\S]*?)<\/style>/i)?.[1] || '';

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Landing Page</title>
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
    ${document.querySelector('style').textContent}
  </style>
</head>
<body>
  ${sections.map(s => s.html).join('')}
</body>
</html>`;

  const blob = new Blob([html], {type: 'text/html'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'my-landing-page.html'; a.click();
  URL.revokeObjectURL(url);
}

// === Init ===
document.addEventListener('DOMContentLoaded', () => {
  setupDragAndDrop();
  loadSavedProjectsList();
  saveToHistory();
  renderSections();

  // Inline editing
  document.addEventListener('dblclick', e => {
    const target = e.target;
    if (target.isContentEditable || !target.closest('.placed-section')) return;
    target.contentEditable = true;
    target.focus();
  });
  document.addEventListener('blur', e => {
    if (e.target.isContentEditable) {
      e.target.contentEditable = false;
      const sectionEl = e.target.closest('.placed-section');
      if (sectionEl) {
        const id = parseInt(sectionEl.dataset.id);
        const sec = sections.find(s => s.id === id);
        if (sec) sec.html = sectionEl.querySelector('.section-content').innerHTML;
      }
    }
  }, true);
});
