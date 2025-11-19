// === State ===
    let sections = [];
    let selectedId = null;
    let history = [];
    let historyStep = 0;

    // === Templates ===
    const templates = {
      hero: { 
        html: `<div class="hero-section" style="background:linear-gradient(135deg,#667eea,#764ba2);color:white;padding:6rem 2rem;text-align:center;">
          <h1 contenteditable="true">Build Something Amazing</h1>
          <p contenteditable="true">Create stunning landing pages in minutes</p>
          <a href="#" class="hero-cta" contenteditable="true">Get Started</a>
        </div>`, 
        props: {bgStart:"#667eea", bgEnd:"#764ba2", textColor:"#ffffff", headingColor:"#ffffff"} 
      },

      features: { 
        html: `<div class="features-section fade-up" style="padding:4rem 2rem;background:#f8fafc;">
          <div class="features-grid">
            <div class="feature-card"><div class="feature-icon">⚡</div><h3>Fast</h3><p contenteditable="true">Lightning fast performance</p></div>
            <div class="feature-card"><div class="feature-icon">🎨</div><h3>Design</h3><p contenteditable="true">Beautiful design</p></div>
            <div class="feature-card"><div class="feature-icon">📱</div><h3>Mobile</h3><p contenteditable="true">Fully responsive</p></div>
          </div>
        </div>`, 
        props: {bgColor:"#f8fafc"} 
      },

      testimonials: { 
        html: `<div class="fade-up" style="padding:4rem 2rem;background:#f8fafc;text-align:center;">
          <h2 contenteditable="true" style="margin-bottom:2rem;color:#1e293b;">What People Say</h2>
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:2rem;max-width:1200px;margin:2rem auto;">
            <div style="background:white;padding:2rem;border-radius:12px;box-shadow:0 2px 10px rgba(0,0,0,0.1);"><p contenteditable="true" style="color:#64748b;margin-bottom:1rem;">"Best tool ever!"</p><strong style="color:#1e293b;">- Alex</strong></div>
            <div style="background:white;padding:2rem;border-radius:12px;box-shadow:0 2px 10px rgba(0,0,0,0.1);"><p contenteditable="true" style="color:#64748b;margin-bottom:1rem;">"Love it so much!"</p><strong style="color:#1e293b;">- Sam</strong></div>
            <div style="background:white;padding:2rem;border-radius:12px;box-shadow:0 2px 10px rgba(0,0,0,0.1);"><p contenteditable="true" style="color:#64748b;margin-bottom:1rem;">"Game changer!"</p><strong style="color:#1e293b;">- Jordan</strong></div>
          </div>
        </div>`, 
        props: {bgColor:"#f8fafc"} 
      },

      team: { 
        html: `<div class="fade-up" style="padding:6rem 2rem;background:white;text-align:center;">
          <h2 contenteditable="true" style="margin-bottom:3rem;color:#1e293b;">Our Team</h2>
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:3rem;max-width:1000px;margin:0 auto;">
            <div><div style="width:150px;height:150px;background:linear-gradient(135deg,#667eea,#764ba2);border-radius:50%;margin:0 auto 1rem;"></div><h3 contenteditable="true" style="color:#1e293b;">Alex</h3><p contenteditable="true" style="color:#64748b;">CEO</p></div>
            <div><div style="width:150px;height:150px;background:linear-gradient(135deg,#f093fb,#f5576c);border-radius:50%;margin:0 auto 1rem;"></div><h3 contenteditable="true" style="color:#1e293b;">Sam</h3><p contenteditable="true" style="color:#64748b;">Designer</p></div>
            <div><div style="width:150px;height:150px;background:linear-gradient(135deg,#4facfe,#00f2fe);border-radius:50%;margin:0 auto 1rem;"></div><h3 contenteditable="true" style="color:#1e293b;">Jordan</h3><p contenteditable="true" style="color:#64748b;">Developer</p></div>
          </div>
        </div>`, 
        props: {bgColor:"#ffffff"} 
      },

      blog: { 
        html: `<div class="fade-up" style="padding:4rem 2rem;background:#f1f5f9;">
          <h2 contenteditable="true" style="text-align:center;margin-bottom:3rem;color:#1e293b;">Latest Blog Posts</h2>
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:2rem;max-width:1200px;margin:0 auto;">
            <div style="background:white;border-radius:12px;overflow:hidden;box-shadow:0 2px 10px rgba(0,0,0,0.1);"><div style="height:200px;background:linear-gradient(135deg,#667eea,#764ba2);"></div><div style="padding:1.5rem;"><h3 contenteditable="true" style="color:#1e293b;margin-bottom:0.5rem;">Blog Post 1</h3><p contenteditable="true" style="color:#64748b;">Amazing content here...</p></div></div>
            <div style="background:white;border-radius:12px;overflow:hidden;box-shadow:0 2px 10px rgba(0,0,0,0.1);"><div style="height:200px;background:linear-gradient(135deg,#f093fb,#f5576c);"></div><div style="padding:1.5rem;"><h3 contenteditable="true" style="color:#1e293b;margin-bottom:0.5rem;">Blog Post 2</h3><p contenteditable="true" style="color:#64748b;">More great content...</p></div></div>
            <div style="background:white;border-radius:12px;overflow:hidden;box-shadow:0 2px 10px rgba(0,0,0,0.1);"><div style="height:200px;background:linear-gradient(135deg,#4facfe,#00f2fe);"></div><div style="padding:1.5rem;"><h3 contenteditable="true" style="color:#1e293b;margin-bottom:0.5rem;">Blog Post 3</h3><p contenteditable="true" style="color:#64748b;">Even more content...</p></div></div>
          </div>
        </div>`, 
        props: {bgColor:"#f1f5f9"} 
      },

      stats: { 
        html: `<div class="stats-section fade-up"><div class="stats-grid">
          <div class="stat-item"><h2>10K+</h2><p>Active Users</p></div>
          <div class="stat-item"><h2>50K+</h2><p>Pages Created</p></div>
          <div class="stat-item"><h2>99%</h2><p>Satisfaction</p></div>
        </div></div>`, 
        props: {bgColor:"#1e293b"} 
      },

      pricing: { 
        html: `<div class="pricing-section fade-up"><div class="pricing-grid">
          <div class="pricing-card"><h3>Starter</h3><div class="price">$9</div><p contenteditable="true">Perfect for getting started</p></div>
          <div class="pricing-card"><h3>Pro</h3><div class="price">$29</div><p contenteditable="true">Most popular choice</p></div>
          <div class="pricing-card"><h3>Enterprise</h3><div class="price">$99</div><p contenteditable="true">Full power unleashed</p></div>
        </div></div>`, 
        props: {bgColor:"#ffffff"} 
      },

      cta: { 
        html: `<div class="cta-section fade-up">
          <h2 contenteditable="true">Ready to Get Started?</h2>
          <p contenteditable="true">Join thousands building amazing pages</p>
          <a href="#" class="hero-cta" contenteditable="true">Start Building Now</a>
        </div>`, 
        props: {bgStart:"#f093fb", bgEnd:"#f5576c"} 
      },

      footer: { 
        html: `<div class="footer-section"><p>&copy; 2025 Your Company. Built with Landing Page Builder</p></div>`, 
        props: {bgColor:"#0f172a"} 
      }
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
            <button onclick="event.stopPropagation(); up(${i})">↑</button>
            <button onclick="event.stopPropagation(); down(${i})">↓</button>
            <button onclick="event.stopPropagation(); remove(${i})">×</button>
          </div>
          <div class="section-content">${sec.html}</div>
        </div>
      `).join("");

      // Animations
      const observer = new IntersectionObserver(e => e.forEach(en => en.isIntersecting && en.target.classList.add("animate")), {threshold: 0.1});
      document.querySelectorAll(".fade-up").forEach(el => observer.observe(el));
    }

    // === Actions ===
    function add(type) { 
      sections.push({id: Date.now(), html: templates[type].html, props: {...templates[type].props}}); 
      save(); 
      render(); 
    }
    
    function duplicate(i) { 
      sections.splice(i + 1, 0, {...sections[i], id: Date.now()}); 
      save(); 
      render(); 
    }
    
    function up(i) { 
      if(i>0) [sections[i-1], sections[i]] = [sections[i], sections[i-1]]; 
      save(); 
      render(); 
    }
    
    function down(i) { 
      if(i<sections.length-1) [sections[i], sections[i+1]] = [sections[i+1], sections[i]]; 
      save(); 
      render(); 
    }
    
    function remove(i) { 
      sections.splice(i,1); 
      selectedId = null;
      save(); 
      render(); 
      showProps();
    }
    
    function select(id) { 
      selectedId = id; 
      render(); 
      showProps(); 
    }

    // === Properties Panel ===
    function showProps() {
      const sec = sections.find(s => s.id === selectedId);
      if (!sec) { 
        document.getElementById("propertiesContent").innerHTML = "<p style='color:#94a3b8;'>Select a section to edit</p>"; 
        return; 
      }

      let html = `<h3 style="margin-bottom:1.5rem;color:#3b82f6;">Section Styles</h3>`;
      
      if (sec.props.bgStart) {
        html += `<div class="prop-group"><label>Gradient Start</label><input type="color" value="${sec.props.bgStart}" data-prop="bgStart"></div>`;
        html += `<div class="prop-group"><label>Gradient End</label><input type="color" value="${sec.props.bgEnd}" data-prop="bgEnd"></div>`;
      } else {
        html += `<div class="prop-group"><label>Background Color</label><input type="color" value="${sec.props.bgColor || '#ffffff'}" data-prop="bgColor"></div>`;
      }
      
      html += `<div class="prop-group"><label>Text Color</label><input type="color" value="${sec.props.textColor || '#000000'}" data-prop="textColor"></div>`;
      html += `<div class="prop-group"><label>Heading Color</label><input type="color" value="${sec.props.headingColor || '#111111'}" data-prop="headingColor"></div>`;
      html += `<p style="color:#64748b;font-size:0.85rem;margin-top:1rem;">💡 Tip: Double-click text to edit directly</p>`;

      document.getElementById("propertiesContent").innerHTML = html;

      document.querySelectorAll("#propertiesContent input").forEach(inp => {
        inp.addEventListener("input", e => {
          const prop = e.target.dataset.prop;
          sec.props[prop] = e.target.value;

          const el = document.querySelector(`[data-id="${sec.id}"] .section-content > div`) || 
                     document.querySelector(`[data-id="${sec.id}"] .section-content`);

          if (prop === "bgColor") {
            el.style.background = e.target.value;
          }
          if (prop === "textColor") {
            el.style.color = e.target.value;
          }
          if (prop === "headingColor") {
            el.querySelectorAll("h1,h2,h3").forEach(h => h.style.color = e.target.value);
          }
          if (prop === "bgStart" || prop === "bgEnd") {
            const heroEl = el.querySelector(".hero-section") || el.querySelector(".cta-section") || el;
            heroEl.style.background = `linear-gradient(135deg, ${sec.props.bgStart}, ${sec.props.bgEnd})`;
          }
          
          save();
        });
      });
    }

    // === History ===
    function save() {
      history = history.slice(0, historyStep + 1);
      history.push(JSON.parse(JSON.stringify(sections)));
      historyStep = history.length - 1;
    }

    // === Init ===
    document.addEventListener("DOMContentLoaded", () => {
      // Undo/Redo
      document.getElementById("undoBtn").onclick = () => { 
        if(historyStep>0) { 
          historyStep--; 
          sections = JSON.parse(JSON.stringify(history[historyStep])); 
          render(); 
          showProps();
        }
      };
      
      document.getElementById("redoBtn").onclick = () => { 
        if(historyStep<history.length-1) { 
          historyStep++; 
          sections = JSON.parse(JSON.stringify(history[historyStep])); 
          render(); 
          showProps();
        }
      };

      // Drag from sidebar
      document.querySelectorAll(".section-item").forEach(item => {
        item.addEventListener("dragstart", e => e.dataTransfer.setData("type", item.dataset.type));
      });
      
      ["dropZone","sectionsContainer"].forEach(id => {
        const el = document.getElementById(id);
        el.addEventListener("dragover", e => { 
          e.preventDefault(); 
          if(id === "dropZone") el.classList.add("drag-over");
        });
        el.addEventListener("dragleave", () => {
          if(id === "dropZone") el.classList.remove("drag-over");
        });
        el.addEventListener("drop", e => {
          e.preventDefault();
          if(id === "dropZone") el.classList.remove("drag-over");
          const type = e.dataTransfer.getData("type");
          if(type) add(type);
        });
      });

      // Templates
      document.querySelectorAll("[data-template]").forEach(btn => {
        btn.onclick = () => {
          if(confirm("Load template? This will replace your current page.")) {
            sections = presets[btn.dataset.template].map((t, i) => ({
              id: Date.now() + i, 
              html: templates[t].html, 
              props: {...templates[t].props}
            }));
            selectedId = null;
            save(); 
            render();
            showProps();
          }
        };
      });

      // Save / Export
      document.getElementById("saveBtn").onclick = () => {
        const name = prompt("Project name:", document.getElementById("projectName").value || "My Project");
        if(name) {
          localStorage.setItem("lpb_" + name, JSON.stringify(sections));
          document.getElementById("projectName").value = name;
          alert("✅ Project saved!");
          loadSavedProjects();
        }
      };

      document.getElementById("exportBtn").onclick = () => {
        const styles = document.querySelector("style").textContent;
        const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Landing Page</title>
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body { font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif; }
    ${styles}
  </style>
</head>
<body>
${sections.map(s => s.html).join('\n')}
<script>
// Scroll animations
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting) entry.target.classList.add("animate");
  });
}, {threshold: 0.1});
document.querySelectorAll(".fade-up").forEach(el => observer.observe(el));
</script>
</body>
</html>`;

        const blob = new Blob([html], {type: "text/html"});
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "landing-page.html";
        a.click();
        URL.revokeObjectURL(url);
        alert("✅ HTML exported! Check your downloads.");
      };

      document.getElementById("clearBtn").onclick = () => { 
        if(confirm("Clear all sections?")) { 
          sections = []; 
          selectedId = null;
          save(); 
          render();
          showProps();
        }
      };

      document.getElementById("mobileToggle").onclick = () => {
        document.getElementById("canvas").classList.toggle("mobile-preview");
      };

      // Load saved projects
      function loadSavedProjects() {
        const projectsDiv = document.getElementById("savedProjects");
        const saved = Object.keys(localStorage).filter(k => k.startsWith("lpb_"));
        
        if(saved.length === 0) {
          projectsDiv.innerHTML = "<p style='color:#64748b;font-size:0.85rem;margin-top:1rem;'>No saved projects</p>";
          return;
        }

        projectsDiv.innerHTML = "<h3 style='font-size:0.9rem;margin-top:1rem;margin-bottom:0.5rem;color:#94a3b8;'>Saved Projects</h3>" + 
          saved.map(key => {
            const name = key.replace("lpb_", "");
            return `<div class="project-item" onclick="loadProject('${key}')">${name}</div>`;
          }).join("");
      }

      window.loadProject = (key) => {
        if(confirm("Load this project? Current work will be lost if not saved.")) {
          const data = localStorage.getItem(key);
          if(data) {
            sections = JSON.parse(data);
            selectedId = null;
            document.getElementById("projectName").value = key.replace("lpb_", "");
            save();
            render();
            showProps();
          }
        }
      };

      loadSavedProjects();

      // Inline editing
      document.addEventListener("click", e => {
        if (e.target.isContentEditable) return;
        const section = e.target.closest(".placed-section");
        if (section && !e.target.closest(".section-controls")) {
          select(parseInt(section.dataset.id));
        }
      });

      document.addEventListener("dblclick", e => {
        const section = e.target.closest(".placed-section");
        if (section && !e.target.closest(".section-controls")) {
          const target = e.target.closest("h1,h2,h3,p,a") || e.target;
          if(target && !target.classList.contains("section-controls")) {
            target.contentEditable = true;
            target.focus();
            
            // Select all text
            const range = document.createRange();
            range.selectNodeContents(target);
            const sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
          }
        }
      });

      document.addEventListener("blur", e => {
        if (e.target.isContentEditable && e.target.contentEditable === "true") {
          e.target.contentEditable = false;
          const section = e.target.closest(".placed-section");
          if (section) {
            const sec = sections.find(s => s.id == section.dataset.id);
            if (sec) {
              sec.html = section.querySelector(".section-content").innerHTML;
              save();
            }
          }
        }
      }, true);

      // Prevent accidental navigation away
      window.addEventListener("beforeunload", (e) => {
        if(sections.length > 0) {
          e.preventDefault();
          e.returnValue = "";
        }
      });

      // Initial save
      save();
      render();
    });
