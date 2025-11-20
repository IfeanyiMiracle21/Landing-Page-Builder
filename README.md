# 🎨 Advanced Landing Page Builder

> A powerful, drag-and-drop landing page builder with visual editor and code editor for developers. Build stunning landing pages in minutes with pre-built templates or create custom sections from scratch.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Build](https://img.shields.io/badge/build-passing-brightgreen.svg)

---

## ✨ Features

### 🎯 **Dual Editing Modes**
- **Visual Editor** - Drag, drop, and customize with color pickers and image uploads
- **Code Editor** - Full HTML & CSS control for developers
- Switch between modes seamlessly

### 🎨 **6 Unique Templates**
1. **💼 Startup SaaS** - Modern gradient hero, clean features, pricing tables
2. **👨‍💻 Developer Portfolio** - Dark theme with cyan accents, gradient text effects
3. **🎯 Creative Agency** - Bold pink/yellow gradients, uppercase typography
4. **🛍️ E-commerce Store** - Vibrant red/orange, product-focused design
5. **📱 App Landing** - Mobile-first, centered design, download buttons
6. **✍️ Blog/Magazine** - Editorial serif fonts, article grid layout

### 🛠️ **Built-in Components**
- 🎯 Hero Sections (multiple styles)
- ✨ Feature Grids
- 📊 Stats Counters
- 💰 Pricing Tables
- 🚀 Call-to-Action Banners
- 📄 Footers

### 💻 **Developer Features**
- **Custom HTML/CSS** - Write your own code for each section
- **Live Preview** - See changes instantly
- **Custom Sections** - Create sections from scratch
- **CSS Export** - All custom styles included in export

### 🎨 **Design Tools**
- Color pickers for backgrounds and gradients
- Image upload for background images
- Double-click inline text editing
- Drag-and-drop reordering
- Responsive preview

---

## 🚀 Quick Start

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/landing-page-builder.git

# Navigate to the project
cd landing-page-builder

# Open in browser
# Simply open index.html in your browser - no build process needed!
```

### Usage

1. **Load a Template** - Click any template in the sidebar to start
2. **Drag Components** - Drag sections from the component library
3. **Edit Content** - Double-click any text to edit inline
4. **Customize Styles** - Use the properties panel to change colors/images
5. **Export** - Click "Export HTML" to download your landing page

---

## 📖 Documentation

### Visual Editor Mode

**Editing Text:**
- Double-click any text element to edit inline
- Changes save automatically when you click away

**Changing Backgrounds:**
1. Select a section by clicking it
2. In the right panel, choose background type:
   - Solid Color
   - Gradient (two colors)
   - Image (upload from computer)
3. Use color pickers to change colors in real-time

**Reordering Sections:**
- Hover over a section to reveal controls
- Use ↑ ↓ buttons to move sections up/down
- Or drag sections to reorder

### Code Editor Mode

**Accessing Code Editor:**
1. Click a section to select it
2. Click the 💻 button in section controls
3. OR click "💻 Code" tab in properties panel

**Editing Code:**
```html
<!-- Edit HTML -->
<div class="my-section">
  <h1>My Heading</h1>
  <p>My content</p>
</div>

<!-- Add Custom CSS -->
<style>
.my-section {
  background: linear-gradient(45deg, #ff0000, #00ff00);
  padding: 4rem 2rem;
  animation: fadeIn 1s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>
```

**Applying Changes:**
- Click "✅ Apply Changes" button
- Your code will render immediately
- All CSS is exported with your HTML

### Creating Custom Sections

1. Click **"+ Create Custom Section"** in sidebar
2. A blank section appears in the canvas
3. Switch to Code Mode (💻 button)
4. Write your own HTML and CSS
5. Apply changes and see it live!

---

## 🎯 Use Cases

### For Designers
- Quickly prototype landing pages
- Test color combinations and layouts
- Create client presentations
- No coding required

### For Developers
- Rapid prototyping with code control
- Export clean HTML/CSS
- Customize every aspect
- Add custom animations and interactions

### For Marketers
- Launch campaigns fast
- A/B test different designs
- No developer needed
- Export and host anywhere

### For Agencies
- Client presentations
- Quick mockups
- Template library
- Consistent branding

---

## 📦 Project Structure

```
landing-page-builder/
│
├── index.html          # Main application (single file)
├── README.md           # This file
└── exports/            # Your exported landing pages (gitignored)
```

---

## 🎨 Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Double Click` | Edit text inline |
| `Click` | Select section |
| `Delete` | Delete selected section (via button) |
| `Ctrl/Cmd + S` | Save project |

---

## 💾 Saving & Exporting

### Save Project
1. Enter project name in the sidebar
2. Click "Save Project"
3. Saved to browser's localStorage
4. Access saved projects from sidebar

### Export HTML
1. Click "💾 Export HTML" in header
2. Complete HTML file downloads
3. Includes all styles and custom CSS
4. Ready to host anywhere

**Export includes:**
- All HTML structure
- All CSS styles (inline and custom)
- Responsive design
- Production-ready code

---

## 🌟 Templates Overview

### 💼 Startup SaaS
**Best for:** SaaS companies, tech startups, B2B services
- Modern purple gradient hero
- Clean feature showcase
- Professional pricing table
- Trust-building stats section

### 👨‍💻 Developer Portfolio
**Best for:** Freelancers, developers, designers
- Dark professional theme
- Gradient text effects
- Project showcase
- Skills section

### 🎯 Creative Agency
**Best for:** Agencies, studios, creative services
- Bold, eye-catching colors
- High-impact typography
- Team showcase
- Case study sections

### 🛍️ E-commerce Store
**Best for:** Online stores, product launches
- Vibrant, energetic colors
- Product grid layout
- Strong CTAs
- Customer testimonials

### 📱 App Landing
**Best for:** Mobile apps, software products
- Mobile-first design
- App store download buttons
- Feature showcase
- Clean, minimal aesthetic

### ✍️ Blog/Magazine
**Best for:** Content creators, publishers, blogs
- Editorial design
- Article grid
- Newsletter signup
- Clean typography

---

## 🔧 Customization

### Adding Custom Fonts
```css
/* In Code Editor CSS section */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

.my-section {
  font-family: 'Poppins', sans-serif;
}
```

### Adding Animations
```css
/* In Code Editor CSS section */
@keyframes slideIn {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.my-section {
  animation: slideIn 0.5s ease-out;
}
```

### Adding Custom JavaScript
```html
<!-- In Code Editor HTML section -->
<div onclick="alert('Hello!')">Click me!</div>

<script>
  // Your custom JavaScript
  document.querySelector('.my-button').addEventListener('click', function() {
    console.log('Button clicked!');
  });
</script>
```

---

## 🐛 Troubleshooting

### Issue: Colors not changing
**Solution:** Make sure section is selected (blue border) before changing colors

### Issue: Code editor not applying changes
**Solution:** Click "✅ Apply Changes" button after editing code

### Issue: Export not working
**Solution:** Check browser's download settings, allow pop-ups if needed

### Issue: Images not uploading
**Solution:** 
- Check file size (recommended under 2MB)
- Ensure file format is JPG, PNG, or GIF
- Try a different browser

### Issue: Text editing not working
**Solution:** Double-click the text element (single click selects section)

---

## 🤝 Contributing

Contributions are welcome! Here's how:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 Roadmap

### Version 1.1 (Coming Soon)
- [ ] Multi-page support
- [ ] Undo/Redo functionality
- [ ] Component library expansion
- [ ] Animation presets
- [ ] Mobile preview mode
- [ ] Collaboration features

### Version 1.2
- [ ] Custom domain integration
- [ ] SEO optimization tools
- [ ] Analytics integration
- [ ] A/B testing tools
- [ ] Cloud storage integration

### Version 2.0
- [ ] React component export
- [ ] Figma integration
- [ ] AI-powered suggestions
- [ ] Template marketplace
- [ ] Team collaboration

---

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2025 Landing Page Builder

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
```

---

## 🙏 Acknowledgments

- Inspired by modern no-code builders
- Built with vanilla JavaScript (no frameworks!)
- Design inspired by Framer, Webflow, and Carrd
- Icons from emoji unicode
- Color palettes from UI Gradients

---

### Bug Reports
Found a bug? [Open an issue](https://github.com/ifeanyiMiracle21/landing-page-builder/issues)

### Feature Requests
Have an idea? [Start a discussion](https://github.com/ifeanyiMiracle21/landing-page-builder/discussions)

---

## 🌟 Show Your Support

If you find this project helpful, please:
- ⭐ Star this repository
- 🐦 Share on Twitter
- 📝 Write a blog post
- 💬 Tell your friends

**Happy Building! 🚀**
