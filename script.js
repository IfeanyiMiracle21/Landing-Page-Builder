let sections = [];
        let selectedSection = null;
        let draggedElement = null;

        const sectionTemplates = {
            hero: {
                html: `
                    <div class="hero-section">
                        <h1>Build Something Amazing</h1>
                        <p>Create stunning landing pages in minutes with drag and drop</p>
                        <a href="#" class="hero-cta">Get Started</a>
                    </div>
                `,
                props: {
                    title: 'Build Something Amazing',
                    subtitle: 'Create stunning landing pages in minutes with drag and drop',
                    ctaText: 'Get Started',
                    bgColor: '#667eea'
                }
            },
            features: {
                html: `
                    <div class="features-section">
                        <div class="features-grid">
                            <div class="feature-card">
                                <div class="feature-icon">⚡</div>
                                <h3>Lightning Fast</h3>
                                <p>Build pages in minutes, not hours</p>
                            </div>
                            <div class="feature-card">
                                <div class="feature-icon">🎨</div>
                                <h3>Beautiful Design</h3>
                                <p>Pre-designed components that look great</p>
                            </div>
                            <div class="feature-card">
                                <div class="feature-icon">📱</div>
                                <h3>Fully Responsive</h3>
                                <p>Works perfectly on all devices</p>
                            </div>
                        </div>
                    </div>
                `,
                props: {}
            },
            stats: {
                html: `
                    <div class="stats-section">
                        <div class="stats-grid">
                            <div class="stat-item">
                                <h2>10K+</h2>
                                <p>Active Users</p>
                            </div>
                            <div class="stat-item">
                                <h2>50K+</h2>
                                <p>Pages Created</p>
                            </div>
                            <div class="stat-item">
                                <h2>99%</h2>
                                <p>Satisfaction</p>
                            </div>
                        </div>
                    </div>
                `,
                props: {}
            },
            pricing: {
                html: `
                    <div class="pricing-section">
                        <div class="pricing-grid">
                            <div class="pricing-card">
                                <h3>Starter</h3>
                                <div class="price">$9</div>
                                <p>Perfect for individuals</p>
                            </div>
                            <div class="pricing-card">
                                <h3>Pro</h3>
                                <div class="price">$29</div>
                                <p>For growing businesses</p>
                            </div>
                            <div class="pricing-card">
                                <h3>Enterprise</h3>
                                <div class="price">$99</div>
                                <p>For large organizations</p>
                            </div>
                        </div>
                    </div>
                `,
                props: {}
            },
            cta: {
                html: `
                    <div class="cta-section">
                        <h2>Ready to Get Started?</h2>
                        <p>Join thousands of users building amazing landing pages</p>
                        <a href="#" class="hero-cta">Start Building Now</a>
                    </div>
                `,
                props: {}
            },
            footer: {
                html: `
                    <div class="footer-section">
                        <p>&copy; 2024 Your Company. All rights reserved.</p>
                        <p>Built with Landing Page Builder</p>
                    </div>
                `,
                props: {}
            }
        };

        // Drag and drop from sidebar
        document.querySelectorAll('.section-item').forEach(item => {
            item.addEventListener('dragstart', (e) => {
                const type = e.target.dataset.type;
                e.dataTransfer.setData('type', type);
                e.dataTransfer.effectAllowed = 'copy';
            });
        });

        const dropZone = document.getElementById('dropZone');
        const sectionsContainer = document.getElementById('sectionsContainer');

        [dropZone, sectionsContainer].forEach(zone => {
            zone.addEventListener('dragover', (e) => {
                e.preventDefault();
                e.dataTransfer.dropEffect = 'copy';
                if (zone === dropZone) {
                    dropZone.classList.add('drag-over');
                }
            });

            zone.addEventListener('dragleave', () => {
                if (zone === dropZone) {
                    dropZone.classList.remove('drag-over');
                }
            });

            zone.addEventListener('drop', (e) => {
                e.preventDefault();
                dropZone.classList.remove('drag-over');
                
                const type = e.dataTransfer.getData('type');
                if (type) {
                    addSection(type);
                }
            });
        });

        function addSection(type) {
            const template = sectionTemplates[type];
            const id = Date.now();
            
            const section = {
                id,
                type,
                html: template.html,
                props: {...template.props}
            };
            
            sections.push(section);
            renderSections();
        }

        function renderSections() {
            if (sections.length === 0) {
                sectionsContainer.innerHTML = '';
                dropZone.style.display = 'flex';
                return;
            }

            dropZone.style.display = 'none';
            
            sectionsContainer.innerHTML = sections.map(section => `
                <div class="placed-section" data-id="${section.id}" draggable="true">
                    <div class="section-controls">
                        <button class="control-btn" onclick="moveUp(${section.id})" title="Move Up">↑</button>
                        <button class="control-btn" onclick="moveDown(${section.id})" title="Move Down">↓</button>
                        <button class="control-btn" onclick="deleteSection(${section.id})" title="Delete">×</button>
                    </div>
                    ${section.html}
                </div>
            `).join('');

            // Add drag handlers for reordering
            document.querySelectorAll('.placed-section').forEach(el => {
                el.addEventListener('dragstart', handleDragStart);
                el.addEventListener('dragover', handleDragOver);
                el.addEventListener('drop', handleDrop);
                el.addEventListener('dragend', handleDragEnd);
            });
        }

        function handleDragStart(e) {
            draggedElement = this;
            this.classList.add('dragging');
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/html', this.innerHTML);
        }

        function handleDragOver(e) {
            if (e.preventDefault) {
                e.preventDefault();
            }
            e.dataTransfer.dropEffect = 'move';
            return false;
        }

        function handleDrop(e) {
            if (e.stopPropagation) {
                e.stopPropagation();
            }
            
            if (draggedElement !== this) {
                const draggedId = parseInt(draggedElement.dataset.id);
                const targetId = parseInt(this.dataset.id);
                
                const draggedIndex = sections.findIndex(s => s.id === draggedId);
                const targetIndex = sections.findIndex(s => s.id === targetId);
                
                const [removed] = sections.splice(draggedIndex, 1);
                sections.splice(targetIndex, 0, removed);
                
                renderSections();
            }
            
            return false;
        }

        function handleDragEnd(e) {
            this.classList.remove('dragging');
        }

        function moveUp(id) {
            const index = sections.findIndex(s => s.id === id);
            if (index > 0) {
                [sections[index - 1], sections[index]] = [sections[index], sections[index - 1]];
                renderSections();
            }
        }

        function moveDown(id) {
            const index = sections.findIndex(s => s.id === id);
            if (index < sections.length - 1) {
                [sections[index], sections[index + 1]] = [sections[index + 1], sections[index]];
                renderSections();
            }
        }

        function deleteSection(id) {
            sections = sections.filter(s => s.id !== id);
            renderSections();
        }

        function clearAll() {
            if (confirm('Are you sure you want to clear all sections?')) {
                sections = [];
                renderSections();
            }
        }

        function exportHTML() {
            const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Landing Page</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
        ${document.querySelector('style').textContent}
    </style>
</head>
<body>
    ${sections.map(s => s.html).join('\n')}
</body>
</html>`;

            const blob = new Blob([html], { type: 'text/html' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'landing-page.html';
            a.click();
            URL.revokeObjectURL(url);
            
            alert('HTML exported! Check your downloads folder.');
        }
