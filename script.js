// DATA
let sections = [];
    let selectedId = null;
    let editMode = 'visual'; // 'visual' or 'code'

    const templates = {
      hero: {
        html: '<div class="startup-hero"><h1 contenteditable="true">Build Something Amazing</h1><p contenteditable="true">Create stunning landing pages in minutes</p><a href="#" class="startup-cta" contenteditable="true">Get Started Free</a></div>',
        css: '',
        props: {bgType:"gradient", bgStart:"#667eea", bgEnd:"#764ba2", bgImage:""}
      },
      features: {
        html: '<div style="padding:4rem 2rem;background:#f8fafc;"><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:2rem;max-width:1200px;margin:0 auto;"><div style="text-align:center;padding:2rem;"><div style="font-size:3rem;margin-bottom:1rem;">⚡</div><h3 contenteditable="true">Lightning Fast</h3><p contenteditable="true">Blazing fast performance</p></div><div style="text-align:center;padding:2rem;"><div style="font-size:3rem;margin-bottom:1rem;">🎨</div><h3 contenteditable="true">Beautiful Design</h3><p contenteditable="true">Pixel-perfect interfaces</p></div><div style="text-align:center;padding:2rem;"><div style="font-size:3rem;margin-bottom:1rem;">📱</div><h3 contenteditable="true">Responsive</h3><p contenteditable="true">Works on all devices</p></div></div></div>',
        css: '',
        props: {bgType:"solid", bgColor:"#f8fafc", bgImage:""}
      },
      stats: {
        html: '<div style="background:#1e293b;padding:4rem 2rem;text-align:center;color:white;"><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:3rem;max-width:1000px;margin:0 auto;"><div><h2 contenteditable="true" style="font-size:3rem;color:#3b82f6;margin-bottom:0.5rem;">10K+</h2><p contenteditable="true" style="color:#94a3b8;">Active Users</p></div><div><h2 contenteditable="true" style="font-size:3rem;color:#3b82f6;margin-bottom:0.5rem;">50K+</h2><p contenteditable="true" style="color:#94a3b8;">Pages Created</p></div><div><h2 contenteditable="true" style="font-size:3rem;color:#3b82f6;margin-bottom:0.5rem;">99%</h2><p contenteditable="true" style="color:#94a3b8;">Satisfaction</p></div></div></div>',
        css: '',
        props: {bgType:"solid", bgColor:"#1e293b", bgImage:""}
      },
      pricing: {
        html: '<div style="padding:4rem 2rem;background:white;"><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:2rem;max-width:1200px;margin:2rem auto 0;"><div style="border:2px solid #e2e8f0;border-radius:12px;padding:2rem;text-align:center;"><h3 contenteditable="true" style="color:#1e293b;margin-bottom:1rem;">Starter</h3><div contenteditable="true" style="font-size:3rem;font-weight:700;color:#3b82f6;margin-bottom:1rem;">$9</div><p contenteditable="true" style="color:#64748b;">Perfect for getting started</p></div><div style="border:2px solid #3b82f6;border-radius:12px;padding:2rem;text-align:center;box-shadow:0 10px 30px rgba(59,130,246,0.2);"><h3 contenteditable="true" style="color:#1e293b;margin-bottom:1rem;">Pro</h3><div contenteditable="true" style="font-size:3rem;font-weight:700;color:#3b82f6;margin-bottom:1rem;">$29</div><p contenteditable="true" style="color:#64748b;">Most popular choice</p></div><div style="border:2px solid #e2e8f0;border-radius:12px;padding:2rem;text-align:center;"><h3 contenteditable="true" style="color:#1e293b;margin-bottom:1rem;">Enterprise</h3><div contenteditable="true" style="font-size:3rem;font-weight:700;color:#3b82f6;margin-bottom:1rem;">$99</div><p contenteditable="true" style="color:#64748b;">Full power unleashed</p></div></div></div>',
        css: '',
        props: {bgType:"solid", bgColor:"#ffffff", bgImage:""}
      },
      cta: {
        html: '<div style="background:linear-gradient(135deg,#f093fb,#f5576c);padding:5rem 2rem;text-align:center;color:white;"><h2 contenteditable="true" style="font-size:2.5rem;margin-bottom:1rem;">Ready to Get Started?</h2><p contenteditable="true" style="font-size:1.2rem;margin-bottom:2rem;opacity:0.9;">Join thousands building amazing pages</p><a href="#" style="display:inline-block;padding:1rem 2.5rem;background:white;color:#f093fb;border-radius:50px;text-decoration:none;font-weight:700;" contenteditable="true">Start Building Now</a></div>',
        css: '',
        props: {bgType:"gradient", bgStart:"#f093fb", bgEnd:"#f5576c", bgImage:""}
      },
      footer: {
        html: '<div style="background:#0f172a;padding:3rem 2rem;text-align:center;color:#94a3b8;"><p contenteditable="true">&copy; 2025 Your Company. Built with Landing Page Builder</p></div>',
        css: '',
        props: {bgType:"solid", bgColor:"#0f172a", bgImage:""}
      }
    };

    const presets = {
      startup: [
        {type:"hero", html:'<div class="startup-hero"><h1 contenteditable="true">Launch Your Startup Faster</h1><p contenteditable="true">The all-in-one platform for modern SaaS companies</p><a href="#" class="startup-cta" contenteditable="true">Start Free Trial</a></div>'},
        {type:"features"},
        {type:"pricing"},
        {type:"cta", customProps:{bgStart:"#4facfe", bgEnd:"#00f2fe"}},
        {type:"footer"}
      ],
      portfolio: [
        {type:"hero", html:'<div class="portfolio-hero"><div class="portfolio-hero-content"><h1 contenteditable="true">John Doe</h1><p contenteditable="true">Full-Stack Developer & Designer crafting beautiful digital experiences</p><a href="#" style="display:inline-block;padding:1rem 2rem;background:#00d4ff;color:#000428;border-radius:6px;text-decoration:none;font-weight:700;margin-top:1rem;" contenteditable="true">View My Work</a></div></div>'},
        {type:"features", customProps:{bgColor:"#020617"}},
        {type:"stats", customProps:{bgColor:"#0f172a"}},
        {type:"footer", customProps:{bgColor:"#000000"}}
      ],
      agency: [
        {type:"hero", html:'<div class="agency-hero"><h1 contenteditable="true">WE CREATE BRANDS</h1><p contenteditable="true" style="font-size:1.5rem;max-width:800px;margin:0 auto 2rem;">Award-winning creative agency specializing in brand identity and digital experiences</p><a href="#" style="display:inline-block;padding:1.2rem 3rem;background:#1e293b;color:white;border-radius:50px;text-decoration:none;font-weight:700;" contenteditable="true">See Our Work</a></div>'},
        {type:"features", customProps:{bgColor:"#1e293b"}},
        {type:"stats", customProps:{bgColor:"#fee140"}},
        {type:"cta", customProps:{bgStart:"#a8edea", bgEnd:"#fed6e3"}},
        {type:"footer"}
      ],
      ecommerce: [
        {type:"hero", html:'<div class="ecommerce-hero"><div><h1 contenteditable="true">Shop The Latest Collection</h1><p contenteditable="true" style="font-size:1.3rem;margin-bottom:2rem;">Discover trendsetting fashion at unbeatable prices</p><a href="#" style="display:inline-block;padding:1.2rem 3rem;background:white;color:#ee0979;border-radius:50px;text-decoration:none;font-weight:700;" contenteditable="true">Shop Now</a></div><div style="background:rgba(255,255,255,0.2);border-radius:12px;height:300px;"></div></div>'},
        {type:"features", customProps:{bgColor:"#ffffff"}},
        {type:"pricing"},
        {type:"cta"},
        {type:"footer"}
      ],
      app: [
        {type:"hero", html:'<div class="app-hero"><div><h1 contenteditable="true">Your App, Anywhere</h1><p contenteditable="true" style="font-size:1.3rem;margin-bottom:2rem;max-width:600px;margin:0 auto 2rem;">Download our mobile app and experience the future</p><div style="display:flex;gap:1rem;justify-content:center;"><a href="#" style="padding:1rem 2rem;background:#000;color:white;border-radius:12px;text-decoration:none;font-weight:600;" contenteditable="true">📱 App Store</a><a href="#" style="padding:1rem 2rem;background:#000;color:white;border-radius:12px;text-decoration:none;font-weight:600;" contenteditable="true">🤖 Google Play</a></div></div></div>'},
        {type:"features"},
        {type:"stats"},
        {type:"footer"}
      ],
      blog: [
        {type:"hero", html:'<div class="blog-hero"><h1 contenteditable="true">The Creative Journal</h1><p contenteditable="true" style="font-size:1.2rem;color:#64748b;max-width:600px;margin:0 auto;">Stories, insights, and inspiration from our team</p></div>'},
        {type:"features", html:'<div style="padding:4rem 2rem;background:white;"><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:2rem;max-width:1200px;margin:0 auto;"><div style="border-radius:12px;overflow:hidden;box-shadow:0 2px 10px rgba(0,0,0,0.1);"><div style="height:200px;background:linear-gradient(135deg,#667eea,#764ba2);"></div><div style="padding:1.5rem;"><h3 contenteditable="true" style="color:#1e293b;margin-bottom:0.5rem;">Featured Article</h3><p contenteditable="true" style="color:#64748b;">Discover the latest trends...</p></div></div><div style="border-radius:12px;overflow:hidden;box-shadow:0 2px 10px rgba(0,0,0,0.1);"><div style="height:200px;background:linear-gradient(135deg,#f093fb,#f5576c);"></div><div style="padding:1.5rem;"><h3 contenteditable="true" style="color:#1e293b;margin-bottom:0.5rem;">Popular Post</h3><p contenteditable="true" style="color:#64748b;">Explore creative solutions...</p></div></div></div></div>'},
        {type:"cta", customProps:{bgStart:"#141e30", bgEnd:"#243b55"}},
        {type:"footer", customProps:{bgColor:"#1e293b"}}
      ]
    };

    function render() {
      const container = document.getElementById("sectionsContainer");
      const dropZone = document.getElementById("dropZone");
      
      if (sections.length === 0) {
        container.innerHTML = "";
        dropZone.style.display = "flex";
        return;
      }
      
      dropZone.style.display = "none";
      
      container.innerHTML = sections.map((sec, i) => 
        '<div class="placed-section ' + (selectedId === sec.id ? 'selected' : '') + '" data-id="' + sec.id + '"><div class="section-controls"><button data-action="code" data-index="' + i + '">💻</button><button data-action="up" data-index="' + i + '">↑</button><button data-action="down" data-index="' + i + '">↓</button><button data-action="delete" data-index="' + i + '">×</button></div><div class="section-content">' + sec.html + '</div></div>'
      ).join("");
      
      sections.forEach(function(sec) {
        updateSectionStyle(sec);
        if (sec.css) {
          applySectionCSS(sec);
        }
      });

      document.querySelectorAll('.placed-section').forEach(function(el) {
        el.addEventListener('click', function(e) {
          if (!e.target.closest('.section-controls') && !e.target.contentEditable) {
            selectSection(parseInt(this.dataset.id));
          }
        });
      });
      
      document.querySelectorAll('.section-controls button').forEach(function(btn) {
        btn.addEventListener('click', function(e) {
          e.stopPropagation();
          const action = this.dataset.action;
          const index = parseInt(this.dataset.index);
          
          if (action === 'code') {
            selectSection(sections[index].id);
            editMode = 'code';
            document.getElementById('codeMode').click();
          } else if (action === 'up' && index > 0) {
            const temp = sections[index-1];
            sections[index-1] = sections[index];
            sections[index] = temp;
            render();
          } else if (action === 'down' && index < sections.length - 1) {
            const temp = sections[index];
            sections[index] = sections[index+1];
            sections[index+1] = temp;
            render();
          } else if (action === 'delete') {
            sections.splice(index, 1);
            selectedId = null;
            render();
            showProps();
          }
        });
      });

      document.querySelectorAll('[contenteditable="true"]').forEach(function(el) {
        el.addEventListener('blur', function() {
          const section = this.closest('.placed-section');
          if (section) {
            const sec = sections.find(function(s) { return s.id == section.dataset.id; });
            if (sec) {
              sec.html = section.querySelector('.section-content').innerHTML;
            }
          }
        });
      });

      document.querySelectorAll('.placed-section').forEach(function(section) {
        section.addEventListener('dblclick', function(e) {
          if (e.target.closest('.section-controls')) return;
          
          const target = e.target;
          if (!target.contentEditable || target.contentEditable === 'inherit') {
            target.contentEditable = 'true';
            target.focus();
            
            const range = document.createRange();
            range.selectNodeContents(target);
            const sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
            
            target.addEventListener('blur', function() {
              this.contentEditable = 'inherit';
              const section = this.closest('.placed-section');
              if (section) {
                const sec = sections.find(function(s) { return s.id == section.dataset.id; });
                if (sec) {
                  sec.html = section.querySelector('.section-content').innerHTML;
                }
              }
            }, { once: true });
          }
        });
      });
    }

    function selectSection(id) {
      selectedId = id;
      render();
      showProps();
    }

    function showProps() {
      const sec = sections.find(function(s) { return s.id === selectedId; });
      const propsDiv = document.getElementById("propertiesContent");
      
      if (!sec) {
        propsDiv.innerHTML = "<p style='color:#94a3b8;'>Select a section to edit</p>";
        return;
      }
      
      if (editMode === 'code') {
        showCodeEditor(sec);
      } else {
        showVisualEditor(sec);
      }
    }

    function showVisualEditor(sec) {
      const propsDiv = document.getElementById("propertiesContent");
      let html = '<h3 style="margin-bottom:1.5rem;color:#3b82f6;">Visual Editor</h3>';
      
      html += '<div class="prop-group"><label>Background Type</label><select id="bgType"><option value="solid"' + (sec.props.bgType === 'solid' ? ' selected' : '') + '>Solid Color</option><option value="gradient"' + (sec.props.bgType === 'gradient' ? ' selected' : '') + '>Gradient</option><option value="image"' + (sec.props.bgType === 'image' ? ' selected' : '') + '>Image</option></select></div>';
      
      html += '<div id="colorControls"></div>';
      
      html += '<div class="prop-group"><label>Background Image</label><input type="file" id="bgImage" accept="image/*"><small style="color:#64748b;display:block;margin-top:0.5rem;">Upload background image</small>';
      if (sec.props.bgImage) {
        html += '<img src="' + sec.props.bgImage + '" class="image-preview" />';
      }
      html += '</div>';
      
      html += '<div class="edit-hint">💡 <strong>Double-click</strong> any element to edit<br>💻 Click the <strong>Code button</strong> (💻) for advanced editing</div>';
      
      propsDiv.innerHTML = html;
      
      updateColorControls(sec);
      
      document.getElementById('bgType').addEventListener('change', function(e) {
        sec.props.bgType = e.target.value;
        updateColorControls(sec);
        updateSectionStyle(sec);
      });
      
      document.getElementById('bgImage').addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = function(event) {
            sec.props.bgImage = event.target.result;
            updateSectionStyle(sec);
            showProps();
          };
          reader.readAsDataURL(file);
        }
      });
    }

    function showCodeEditor(sec) {
      const propsDiv = document.getElementById("propertiesContent");
      let html = '<h3 style="margin-bottom:1.5rem;color:#3b82f6;">Code Editor</h3>';
      
      html += '<div class="prop-group"><label>HTML</label><textarea id="htmlCode">' + sec.html.replace(/</g, '&lt;').replace(/>/g, '&gt;') + '</textarea></div>';
      
      html += '<div class="prop-group"><label>Custom CSS (optional)</label><textarea id="cssCode" placeholder=".my-class { color: red; }">' + (sec.css || '') + '</textarea></div>';
      
      html += '<button class="btn btn-primary" style="width:100%;margin-bottom:1rem;" id="applyCode">✅ Apply Changes</button>';
      
      html += '<div class="edit-hint">⚠️ <strong>Warning:</strong> Editing code directly. Make sure your HTML is valid!</div>';
      
      propsDiv.innerHTML = html;
      
      document.getElementById('applyCode').addEventListener('click', function() {
        const htmlCode = document.getElementById('htmlCode').value;
        const cssCode = document.getElementById('cssCode').value;
        
        sec.html = htmlCode.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
        sec.css = cssCode;
        
        render();
        showProps();
        alert('✅ Code applied successfully!');
      });
    }

    function updateColorControls(sec) {
      const container = document.getElementById('colorControls');
      let html = '';
      
      if (sec.props.bgType === 'solid') {
        html = '<div class="prop-group"><label>Background Color</label><input type="color" value="' + (sec.props.bgColor || '#ffffff') + '" id="bgColor"></div>';
      } else if (sec.props.bgType === 'gradient') {
        html = '<div class="prop-group"><label>Gradient Start</label><input type="color" value="' + (sec.props.bgStart || '#667eea') + '" id="bgStart"></div>';
        html += '<div class="prop-group"><label>Gradient End</label><input type="color" value="' + (sec.props.bgEnd || '#764ba2') + '" id="bgEnd"></div>';
      }
      
      container.innerHTML = html;
      
      if (sec.props.bgType === 'solid') {
        document.getElementById('bgColor').addEventListener('input', function(e) {
          sec.props.bgColor = e.target.value;
          updateSectionStyle(sec);
        });
      } else if (sec.props.bgType === 'gradient') {
        document.getElementById('bgStart').addEventListener('input', function(e) {
          sec.props.bgStart = e.target.value;
          updateSectionStyle(sec);
        });
        document.getElementById('bgEnd').addEventListener('input', function(e) {
          sec.props.bgEnd = e.target.value;
          updateSectionStyle(sec);
        });
      }
    }

    function updateSectionStyle(sec) {
      const el = document.querySelector('[data-id="' + sec.id + '"] .section-content > div');
      if (!el) return;
      
      if (sec.props.bgType === 'image' && sec.props.bgImage) {
        el.style.backgroundImage = 'url(' + sec.props.bgImage + ')';
        el.style.backgroundSize = 'cover';
        el.style.backgroundPosition = 'center';
      } else if (sec.props.bgType === 'gradient') {
        el.style.backgroundImage = 'linear-gradient(135deg, ' + (sec.props.bgStart || '#667eea') + ', ' + (sec.props.bgEnd || '#764ba2') + ')';
      } else {
        el.style.background = sec.props.bgColor || '#ffffff';
        el.style.backgroundImage = 'none';
      }
    }

    function applySectionCSS(sec) {
      let styleEl = document.getElementById('section-css-' + sec.id);
      if (!styleEl) {
        styleEl = document.createElement('style');
        styleEl.id = 'section-css-' + sec.id;
        document.head.appendChild(styleEl);
      }
      styleEl.textContent = '[data-id="' + sec.id + '"] { ' + sec.css + ' }';
    }

    function addSection(type, customHTML, customProps) {
      const template = templates[type];
      const html = customHTML || template.html;
      const props = customProps ? Object.assign({}, template.props, customProps) : JSON.parse(JSON.stringify(template.props));
      sections.push({
        id: Date.now() + Math.random(),
        html: html,
        css: template.css || '',
        props: props
      });
      render();
    }

    document.addEventListener('DOMContentLoaded', function() {
      document.getElementById('visualMode').addEventListener('click', function() {
        editMode = 'visual';
        this.classList.add('active');
        document.getElementById('codeMode').classList.remove('active');
        showProps();
      });

      document.getElementById('codeMode').addEventListener('click', function() {
        editMode = 'code';
        this.classList.add('active');
        document.getElementById('visualMode').classList.remove('active');
        showProps();
      });

      document.querySelectorAll('.section-item').forEach(function(item) {
        item.addEventListener('dragstart', function(e) {
          e.dataTransfer.setData('type', this.dataset.type);
        });
      });
      
      const dropZone = document.getElementById('dropZone');
      const container = document.getElementById('sectionsContainer');
      
      [dropZone, container].forEach(function(zone) {
        zone.addEventListener('dragover', function(e) {
          e.preventDefault();
        });
        
        zone.addEventListener('drop', function(e) {
          e.preventDefault();
          const type = e.dataTransfer.getData('type');
          if (type) {
            addSection(type);
          }
        });
      });
      
      document.querySelectorAll('.template-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
          if (confirm('Load template? This will replace your current page.')) {
            const templateName = this.dataset.template;
            sections = presets[templateName].map(function(item, i) {
              const template = templates[item.type];
              const html = item.html || template.html;
              const props = item.customProps ? Object.assign({}, template.props, item.customProps) : JSON.parse(JSON.stringify(template.props));
              return {
                id: Date.now() + i + Math.random(),
                html: html,
                css: template.css || '',
                props: props
              };
            });
            selectedId = null;
            render();
            showProps();
          }
        });
      });
      
      document.getElementById('clearBtn').addEventListener('click', function() {
        if (confirm('Clear all sections?')) {
          sections = [];
          selectedId = null;
          render();
          showProps();
        }
      });
      
      document.getElementById('exportBtn').addEventListener('click', function() {
        const styles = document.querySelector('style').textContent;
        const htmlContent = sections.map(function(s) { return s.html; }).join('\n');
        const customCSS = sections.map(function(s) { return s.css || ''; }).filter(function(c) { return c; }).join('\n');
        
        const html = '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>My Landing Page</title>\n  <style>\n    * { margin:0; padding:0; box-sizing:border-box; }\n    body { font-family: -apple-system,BlinkMacSystemFont,\'Segoe UI\',Roboto,sans-serif; }\n    ' + styles + '\n    ' + customCSS + '\n  </style>\n</head>\n<body>\n' + htmlContent + '\n</body>\n</html>';
        
        const blob = new Blob([html], {type: 'text/html'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'landing-page.html';
        a.click();
        URL.revokeObjectURL(url);
        alert('✅ HTML exported with custom code! Check your downloads.');
      });
      
      document.getElementById('saveBtn').addEventListener('click', function() {
        const name = document.getElementById('projectName').value || 'My Project';
        localStorage.setItem('lpb_' + name, JSON.stringify(sections));
        alert('✅ Project saved as: ' + name);
      });
      
      render();
    });
