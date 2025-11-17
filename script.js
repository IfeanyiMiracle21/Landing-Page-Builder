// === State ===
    let sections = [];
    let selectedSection = null;
    let history = [];
    let historyIndex = -1;
    let isMobilePreview = false;

    // === Templates ===
    const sectionTemplates = {
      hero: { html: `<div class="hero-section"><h1>Build Something Amazing</h1><p>Create stunning landing pages</p><a href="#" class="hero-cta">Get Started</a></div>`, props: { title:"Build Something Amazing", subtitle:"Create stunning...", ctaText:"Get Started", bgStart:"#667eea", bgEnd:"#764ba2" }},
      features: { html: `<div class="features-section fade-up"><div class="features-grid">...3 cards...</div></div>`, props: {} },
      testimonials: { html: `<div style="padding:4rem 2rem;background:#f8fafc;text-align:center;" class="fade-up"><h2 style="margin-bottom:2rem;">What People Say</h2><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:2rem;max-width:1200px;margin:auto;">${["John Doe","Jane Smith","Mike Johnson"].map(n=>`<div style="background:white;padding:2rem;border-radius:12px;box-shadow:0 5px 20px rgba(0,0,0,0.1);"><p>"Best tool ever!"</p><strong>- ${n}</strong></div>`).join('')}</div></div>`, props: {} },
      team: { html: `<div style="padding:6rem 2rem;background:white;text-align:center;" class="fade-up"><h2>Our Team</h2><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:3rem;margin-top:3rem;">${["Alice","Bob","Charlie"].map(n=>`<div><div style="width:150px;height:150px;background:#e2e8f0;border-radius:50%;margin:auto;"></div><h3 style="margin:1rem 0 0.5rem;">${n}</h3><p>CEO</p></div>`).join('')}</div></div>`, props: {} },
      blog: { html: `<div style="padding:4rem 2rem;background:#f1f5f9;" class="fade-up"><h2 style="text-align:center;margin-bottom:3rem;">Latest Posts</h2><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:2rem;max-width:1200px;margin:auto;">${[1,2,3].map(i=>`<div style="background:white;border-radius:12px;overflow:hidden;"><div style="height:200px;background:#cbd5e1;"></div><div style="padding:1.5rem;"><h3>Blog Post ${i}</h3><p>Lorem ipsum dolor sit amet...</p></div></div>`).join('')}</div></div>`, props: {} },
      stats: { html: `<div class="stats-section fade-up">...</div>`, props: {} },
      pricing: { html: `<div class="pricing-section fade-up">...</div>`, props: {} },
      cta: { html: `<div class="cta-section fade-up"><h2>Ready to Start?</h2><a href="#" class="hero-cta">Start Now</a></div>`, props: {} },
      footer: { html: `<div class="footer-section"><p>&copy; 2025 Your Company</p></div>`, props: {} }
    };

    // === Templates Presets ===
    const templates = {
      saas: ["hero","features","testimonials","pricing","cta","footer"],
      agency: ["hero","team","features","blog","cta","footer"],
      portfolio: ["hero","features","team","testimonials","cta","footer"]
    };

    function loadTemplate(name) {
      if (!confirm(`Load ${name.toUpperCase()} template? This will clear current work.`)) return;
      sections = templates[name].map(type => ({
        id: Date.now() + Math.random(),
        type,
        html: sectionTemplates[type].html,
        props: { ...sectionTemplates[type].props }
      }));
      saveToHistory();
      renderSections();
    }

    // === Save/Load Projects ===
    function saveProject() {
      const name = document.getElementById('projectName').value || `Project ${new Date().toLocaleDateString()}`
      const data = { name, sections: sections.map(s=>({...s, props:{...s.props}})) };
      let projects = JSON.parse(localStorage.getItem('lpb_projects') || '[]');
      projects = projects.filter(p => p.name !== name);
      projects.push(data);
      localStorage.setItem('lpb_projects', JSON.stringify(projects));
      alert('Project saved!');
      loadSavedProjectsList();
    }

    function loadSavedProjectsList() {
      const list = document.getElementById('savedProjects');
      const projects = JSON.parse(localStorage.getItem('lpb_projects') || '[]');
      list.innerHTML = '<h3 style="margin:1rem 0 0.5rem;font-size:0.9rem;color:var(--text-secondary);">Saved Projects</h3>' +
        projects.map(p => `<div class="project-item" onclick="loadProject('${p.name}')">${p.name}</div>`).join('');
    }

    function loadProject(name) {
      const projects = JSON.parse(localStorage.getItem('lpb_projects') || '[]');
      const proj = projects.find(p => p.name === name);
      if (proj) {
        sections = proj.sections;
        saveToHistory();
        renderSections();
      }
    }

    // === History (Undo/Redo) ===
    function saveToHistory() {
      history = history.slice(0, historyIndex + 1);
      history.push(sections.map(s=>({...s, props:{...s.props}, html:s.html})));
      historyIndex++;
    }
    function undo() { if(historyIndex>0) { historyIndex--; sections = history[historyIndex].map(s=>({...s})); renderSections(); } }
    function redo() { if(historyIndex<history.length-1) { historyIndex++; sections = history[historyIndex].map(s=>({...s})); renderSections(); } }

    // === Rendering ===
    function renderSections() {
      const container = document.getElementById('sectionsContainer');
      if (sections.length === 0) {
        container.innerHTML = ''; document.getElementById('dropZone').style.display = 'flex';
        return;
      }
      document.getElementById('dropZone').style.display = 'none';

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

      // Make text editable
      container.querySelectorAll('[contenteditable]').forEach(el => el.addEventListener('blur', updateSectionContent));
      // Framer Motion scroll animations
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
          }
        });
      }, { threshold: 0.1 });
      container.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

      makeDraggable();
    }

    function selectSection(id) {
      selectedSection = sections.find(s => s.id === id);
      renderPropertiesPanel();
    }

    function renderPropertiesPanel() {
      if (!selectedSection) {
        document.getElementById('propertiesContent').innerHTML = '<p>Select a section</p>';
        return;
      }
      const props = selectedSection.props;
      let html = `<h3>${selectedSection.type.charAt(0).toUpperCase() + selectedSection.type.slice(1)}</h3>`;

      if (selectedSection.type === 'hero') {
        html += `
          <div class="prop-group"><label>Title</label><input value="${props.title||''}" data-prop="title"></div>
          <div class="prop-group"><label>Subtitle</label><input value="${props.subtitle||''}" data-prop="subtitle"></div>
          <div class="prop-group"><label>CTA Text</label><input value="${props.ctaText||''}" data-prop="ctaText"></div>
          <div class="prop-group"><label>Gradient Start</label><input type="color" value="${props.bgStart||'#667eea'}" data-prop="bgStart"></div>
          <div class="prop-group"><label>Gradient End</label><input type="color" value="${props.bgEnd||'#764ba2'}" data-prop="bgEnd"></div>
        `;
      }

      html += `<div class="prop-group"><label>Custom Background</label><input type="color" value="${props.bgColor||'#ffffff'}" data-prop="bgColor"></div>`;

      document.getElementById('propertiesContent').innerHTML = html;

      // Bind inputs
      document.querySelectorAll('#propertiesContent input').forEach(inp => {
        inp.addEventListener('input', (e) => {
          const prop = e.target.dataset.prop;
          selectedSection.props[prop] = e.target.value;
          if (selectedSection.type === 'hero') {
            updateHeroGradient(selectedSection);
          } else {
            const el = document.querySelector(`[data-id="${selectedSection.id}"] .section-content > div`);
            if (el) el.style.background = e.target.value;
          }
        });
      });
    }

    function updateHeroGradient(sec) {
      const el = document.querySelector(`[data-id="${sec.id}"] .hero-section`);
      if (el) {
        el.style.background = `linear-gradient(135deg, ${sec.props.bgStart} 0%, ${sec.props.bgEnd} 100%)`;
      }
    }

    // === Inline Text Editing ===
    document.addEventListener('dblclick', (e) => {
      if (e.target.closest('.placed-section') && !e.target.closest('.section-controls')) {
        if (e.target.isContentEditable !== true) {
          e.target.contentEditable = true;
          e.target.focus();
        }
      }
    });

    function updateSectionContent(e) {
      e.target.contentEditable = false;
      const sectionEl = e.target.closest('.placed-section');
      const id = parseInt(sectionEl.dataset.id);
      const section = sections.find(s => s.id === id);
      if (section) {
        section.html = sectionEl.querySelector('.section-content').innerHTML;
      }
    }

    // === Duplicate ===
    function duplicateSection(id) {
      event.stopPropagation();
      const sec = sections.find(s => s.id === id);
      const copy = { ...sec, id: Date.now() + Math.random(), props: { ...sec.props } };
      sections.push(copy);
      saveToHistory();
      renderSections();
    }

    // === Mobile Toggle ===
    function toggleMobile() {
      isMobilePreview = !isMobilePreview;
      document.getElementById('canvas').classList.toggle('mobile-preview', isMobilePreview);
    }

    // === Existing functions (addSection, drag/drop, export, etc.) ===
    // ... (your original drag/drop code works perfectly, just keep it)

    // Init
    loadSavedProjectsList();
    saveToHistory();
    renderSections();
