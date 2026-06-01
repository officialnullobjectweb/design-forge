const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

class PreviewGenerator {
  static generate(blueprint, targetDir) {
    const previewDir = path.join(targetDir, '.design-forge')
    if (!fs.existsSync(previewDir)) {
      fs.mkdirSync(previewDir, { recursive: true })
    }

    const html = PreviewGenerator.buildHTML(blueprint)
    const previewPath = path.join(previewDir, 'preview.html')
    fs.writeFileSync(previewPath, html)

    const css = PreviewGenerator.buildCSS(blueprint)
    fs.writeFileSync(path.join(previewDir, 'preview.css'), css)

    return previewPath
  }

  static buildHTML(bp) {
    const dt = bp.designTokens
    const sections = bp.sections || []
    const features = bp.features || []
    const routes = bp.routes || []
    const brandName = bp.projectName || 'MyApp'
    const pageCount = routes.filter(r => r.path !== '/404' && r.path !== '/_not-found').length

    const sectionCards = sections.map(s => `
      <div class="section-card">
        <div class="section-icon">${s.icon || '📄'}</div>
        <div class="section-info">
          <div class="section-name">${s.label || s.id}</div>
          <div class="section-desc">${(s.description || '').slice(0, 60)}</div>
        </div>
        <div class="section-badge">${s.variants ? s.variants.length : 1}v</div>
      </div>
    `).join('\n')

    const featureTags = features.map(f => `
      <span class="feature-tag">${f.icon || '✨'} ${f.label || f.id}</span>
    `).join('\n')

    const routeList = routes.filter(r => r.path !== '/404' && r.path !== '/_not-found').map(r => `
      <div class="route-item">
        <span class="route-path">${r.path}</span>
        <span class="route-type">${r.type}</span>
        <span class="route-label">${r.label}</span>
      </div>
    `).join('\n')

    const darkModeClass = dt.mode === 'dark' ? 'dark' : ''

    return `<!DOCTYPE html>
<html class="${darkModeClass}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${brandName} — Preview</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="preview.css">
</head>
<body>
  <div class="preview-container">
    <!-- Desktop Preview -->
    <div class="desktop-preview">
      <div class="browser-frame">
        <div class="browser-bar">
          <div class="browser-dots">
            <span class="dot dot-red"></span>
            <span class="dot dot-yellow"></span>
            <span class="dot dot-green"></span>
          </div>
          <div class="browser-url">
            <span class="url-icon">🔒</span>
            <span>${brandName.toLowerCase().replace(/\\s+/g, '')}.vercel.app</span>
          </div>
          <div class="browser-actions">
            <span class="action-icon">⋮</span>
          </div>
        </div>
        <div class="browser-content">
          <header class="bp-header">
            <div class="bp-logo">${brandName}</div>
            <nav class="bp-nav">
              ${routes.filter(r => r.path !== '/404' && r.path !== '/_not-found' && r.path !== '/').slice(0, 4).map(r => `<a class="bp-nav-link">${r.label}</a>`).join('\n')}
            </nav>
            <button class="bp-btn">Get Started</button>
          </header>

          <section class="bp-hero">
            <div class="bp-hero-tag">${dt.typography.fontFamily.split(',')[0] || 'Modern'} Design</div>
            <h1 class="bp-hero-title">Build Beautiful<br>Websites Faster</h1>
            <p class="bp-hero-sub">${(bp.project ? bp.project.description : '') || 'Generate production-ready frontends with AI-powered design.'}</p>
            <div class="bp-hero-actions">
              <button class="bp-btn bp-btn-primary">Get Started →</button>
              <button class="bp-btn bp-btn-outline">Learn More</button>
            </div>
          </section>

          <section class="bp-features">
            ${sectionCards.slice(0, 6)}
          </section>
        </div>
      </div>
    </div>

    <!-- iPhone Preview -->
    <div class="iphone-preview">
      <div class="iphone-frame">
        <div class="iphone-notch"></div>
        <div class="iphone-screen">
          <header class="iphone-header">
            <div class="iphone-status">
              <span class="iphone-time">9:41</span>
              <div class="iphone-status-icons">
                <span>📶</span>
                <span>📶</span>
                <span>🔋</span>
              </div>
            </div>
            <div class="iphone-app-bar">
              <span class="iphone-back">←</span>
              <span class="iphone-title">${brandName}</span>
              <span class="iphone-menu">☰</span>
            </div>
          </header>
          <div class="iphone-content">
            <div class="iphone-hero">
              <h2 class="iphone-hero-title">${brandName}</h2>
              <p class="iphone-hero-sub">${(bp.project ? bp.project.description.slice(0, 80) : '') || 'Build beautiful websites faster'}</p>
              <button class="iphone-cta">Get Started</button>
            </div>
            <div class="iphone-cards">
              ${sections.slice(0, 4).map(s => `
                <div class="iphone-card">
                  <div class="iphone-card-icon">${s.icon || '📄'}</div>
                  <div class="iphone-card-text">${s.label || s.id}</div>
                </div>
              `).join('\n')}
            </div>
          </div>
          <div class="iphone-tab-bar">
            <span class="tab active">🏠</span>
            <span class="tab">🔍</span>
            <span class="tab">❤️</span>
            <span class="tab">👤</span>
          </div>
        </div>
        <div class="iphone-home-indicator"></div>
      </div>
    </div>
  </div>

  <!-- Info Panel -->
  <div class="info-panel">
    <div class="info-header">
      <h2 class="info-title">${brandName}</h2>
      <span class="info-badge">Blueprint v2</span>
    </div>

    <div class="info-stats">
      <div class="stat">
        <div class="stat-value">${pageCount}</div>
        <div class="stat-label">Pages</div>
      </div>
      <div class="stat">
        <div class="stat-value">${sections.length}</div>
        <div class="stat-label">Sections</div>
      </div>
      <div class="stat">
        <div class="stat-value">${features.length}</div>
        <div class="stat-label">Features</div>
      </div>
      <div class="stat">
        <div class="stat-value">${bp.packages ? bp.packages.length : 0}</div>
        <div class="stat-label">Packages</div>
      </div>
    </div>

    <div class="info-group">
      <h3 class="group-title">Color Palette</h3>
      <div class="color-swatches">
        <div class="swatch" style="background: ${dt.colors.primary}" title="Primary">
          <span class="swatch-label">Primary</span>
        </div>
        <div class="swatch" style="background: ${dt.colors.secondary}" title="Secondary">
          <span class="swatch-label">Secondary</span>
        </div>
        <div class="swatch" style="background: ${dt.colors.accent}" title="Accent">
          <span class="swatch-label">Accent</span>
        </div>
        <div class="swatch" style="background: ${dt.colors.background}; border: 1px solid rgba(0,0,0,0.1)" title="Background">
          <span class="swatch-label">BG</span>
        </div>
      </div>
    </div>

    <div class="info-group">
      <h3 class="group-title">Typography</h3>
      <div class="typo-info">
        <div class="typo-row">
          <span class="typo-label">Font</span>
          <span class="typo-value" style="font-family: ${dt.typography.fontFamily}">${dt.typography.fontFamily}</span>
        </div>
        <div class="typo-row">
          <span class="typo-label">Headings</span>
          <span class="typo-value">${dt.typography.headingFont}</span>
        </div>
      </div>
    </div>

    <div class="info-group">
      <h3 class="group-title">Sections</h3>
      <div class="sections-list">
        ${sectionCards}
      </div>
    </div>

    <div class="info-group">
      <h3 class="group-title">Features</h3>
      <div class="features-list">
        ${featureTags}
      </div>
    </div>

    <div class="info-group">
      <h3 class="group-title">Routes</h3>
      <div class="routes-list">
        ${routeList}
      </div>
    </div>
  </div>
</body>
</html>`
  }

  static buildCSS(bp) {
    const dt = bp.designTokens
    const isDark = dt.mode === 'dark'

    return `:root {
  --primary: ${dt.colors.primary};
  --secondary: ${dt.colors.secondary};
  --accent: ${dt.colors.accent};
  --bg: ${dt.colors.background};
  --text: ${dt.colors.foreground};
  --radius: ${dt.borderRadius || '0.5rem'};
  --font-sans: ${dt.typography.fontFamily};
  --font-heading: ${dt.typography.headingFont};
}

* { margin: 0; padding: 0; box-sizing: border-box; }

${isDark ? `.dark { --bg: #0a0a0f; --text: #f1f5f9; }` : ''}

body {
  font-family: var(--font-sans);
  background: var(--bg);
  color: var(--text);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
}

.preview-container {
  display: flex;
  gap: 2rem;
  align-items: flex-start;
  max-width: 1400px;
  width: 100%;
}

/* ── Desktop Browser ── */
.desktop-preview {
  flex: 1;
  min-width: 0;
}

.browser-frame {
  background: var(--bg);
  border: 1px solid rgba(128,128,128,0.2);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25);
}

.browser-bar {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 1rem;
  background: ${isDark ? '#1a1a2e' : '#f8fafc'};
  border-bottom: 1px solid rgba(128,128,128,0.1);
}

.browser-dots { display: flex; gap: 6px; }
.dot { width: 12px; height: 12px; border-radius: 50%; }
.dot-red { background: #ff5f57; }
.dot-yellow { background: #ffbd2e; }
.dot-green { background: #28c840; }

.browser-url {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 0.75rem;
  background: ${isDark ? '#0a0a1a' : '#fff'};
  border-radius: 6px;
  font-size: 0.8rem;
  color: ${isDark ? '#94a3b8' : '#64748b'};
  border: 1px solid rgba(128,128,128,0.1);
}

.browser-actions { color: #94a3b8; }

.browser-content {
  padding: 0;
}

/* ── Blueprint Preview Header ── */
.bp-header {
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 1rem 2rem;
  border-bottom: 1px solid rgba(128,128,128,0.1);
}

.bp-logo {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--primary);
}

.bp-nav { display: flex; gap: 1.5rem; flex: 1; }
.bp-nav-link {
  font-size: 0.875rem;
  color: ${isDark ? '#94a3b8' : '#64748b'};
  cursor: default;
  transition: color 0.2s;
}
.bp-nav-link:hover { color: var(--text); }

.bp-btn {
  padding: 0.5rem 1.25rem;
  border-radius: var(--radius);
  border: 1px solid rgba(128,128,128,0.2);
  background: transparent;
  color: var(--text);
  font-size: 0.875rem;
  cursor: default;
  transition: all 0.2s;
}

.bp-hero {
  padding: 4rem 2rem;
  text-align: center;
}

.bp-hero-tag {
  display: inline-block;
  padding: 0.35rem 1rem;
  background: color-mix(in srgb, var(--primary) 15%, transparent);
  color: var(--primary);
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 500;
  margin-bottom: 1.5rem;
}

.bp-hero-title {
  font-family: var(--font-heading);
  font-size: 3rem;
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.03em;
  margin-bottom: 1rem;
}

.bp-hero-sub {
  max-width: 500px;
  margin: 0 auto 2rem;
  color: ${isDark ? '#94a3b8' : '#64748b'};
  font-size: 1.1rem;
  line-height: 1.6;
}

.bp-hero-actions { display: flex; gap: 1rem; justify-content: center; }
.bp-btn-primary {
  background: var(--primary);
  color: #fff;
  border-color: var(--primary);
}
.bp-btn-outline {
  border-color: var(--primary);
  color: var(--primary);
}

.bp-features {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  padding: 0 2rem 4rem;
}

/* ── iPhone Frame ── */
.iphone-preview {
  flex-shrink: 0;
  position: sticky;
  top: 2rem;
}

.iphone-frame {
  width: 375px;
  height: 760px;
  background: var(--bg);
  border-radius: 48px;
  border: 3px solid ${isDark ? '#333' : '#e2e8f0'};
  box-shadow:
    0 25px 60px rgba(0,0,0,0.3),
    0 0 0 1px rgba(128,128,128,0.1);
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
}

.iphone-notch {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 150px;
  height: 30px;
  background: ${isDark ? '#1a1a2e' : '#1a1a2e'};
  border-radius: 0 0 18px 18px;
  z-index: 10;
}

.iphone-screen {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: var(--bg);
  padding-top: 30px;
}

.iphone-header {
  padding: 0.5rem 1.25rem;
}

.iphone-status {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.75rem;
  color: var(--text);
  margin-bottom: 0.5rem;
}

.iphone-status-icons { display: flex; gap: 4px; font-size: 0.6rem; }

.iphone-app-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0;
}

.iphone-back, .iphone-menu {
  font-size: 1.25rem;
  color: var(--primary);
}

.iphone-title {
  font-weight: 600;
  font-size: 1rem;
}

.iphone-content {
  flex: 1;
  overflow-y: auto;
  padding: 0 1.25rem;
}

.iphone-hero {
  text-align: center;
  padding: 2rem 0 1.5rem;
}

.iphone-hero-title {
  font-family: var(--font-heading);
  font-size: 1.5rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  color: var(--primary);
  margin-bottom: 0.5rem;
}

.iphone-hero-sub {
  font-size: 0.8rem;
  color: ${isDark ? '#94a3b8' : '#64748b'};
  margin-bottom: 1.25rem;
  line-height: 1.5;
}

.iphone-cta {
  background: var(--primary);
  color: #fff;
  border: none;
  padding: 0.6rem 2rem;
  border-radius: var(--radius);
  font-weight: 600;
  cursor: default;
}

.iphone-cards {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding-bottom: 1rem;
}

.iphone-card {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: 12px;
  background: color-mix(in srgb, var(--primary) 8%, transparent);
  border: 1px solid rgba(128,128,128,0.08);
}

.iphone-card-icon {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: color-mix(in srgb, var(--primary) 15%, transparent);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
}

.iphone-card-text {
  font-size: 0.85rem;
  font-weight: 500;
}

.iphone-tab-bar {
  display: flex;
  justify-content: space-around;
  padding: 0.75rem 1.25rem;
  border-top: 1px solid rgba(128,128,128,0.1);
  background: color-mix(in srgb, var(--bg) 95%, var(--primary) 5%);
}

.iphone-tab-bar .tab {
  font-size: 1.25rem;
  opacity: 0.4;
  cursor: default;
}
.iphone-tab-bar .tab.active { opacity: 1; }

.iphone-home-indicator {
  width: 134px;
  height: 5px;
  background: ${isDark ? '#475569' : '#cbd5e1'};
  border-radius: 3px;
  margin: 0.5rem auto;
}

/* ── Info Panel ── */
.info-panel {
  width: 320px;
  flex-shrink: 0;
}

.info-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.info-title { font-size: 1.5rem; font-weight: 700; }

.info-badge {
  padding: 0.25rem 0.75rem;
  background: color-mix(in srgb, var(--primary) 15%, transparent);
  color: var(--primary);
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 500;
}

.info-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.stat {
  text-align: center;
  padding: 0.75rem 0.5rem;
  border-radius: 10px;
  background: color-mix(in srgb, var(--primary) 5%, transparent);
  border: 1px solid rgba(128,128,128,0.06);
}

.stat-value { font-size: 1.5rem; font-weight: 700; color: var(--primary); }
.stat-label { font-size: 0.7rem; color: ${isDark ? '#94a3b8' : '#64748b'}; margin-top: 0.15rem; }

.info-group {
  margin-bottom: 1.5rem;
}

.group-title {
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: ${isDark ? '#64748b' : '#94a3b8'};
  margin-bottom: 0.75rem;
}

.color-swatches {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
}

.swatch {
  aspect-ratio: 1;
  border-radius: 10px;
  display: flex;
  align-items: flex-end;
  padding: 0.35rem;
  position: relative;
}

.swatch-label {
  font-size: 0.6rem;
  font-weight: 600;
  color: #fff;
  text-shadow: 0 1px 2px rgba(0,0,0,0.3);
  background: rgba(0,0,0,0.2);
  padding: 0.1rem 0.3rem;
  border-radius: 3px;
}

.typo-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.typo-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid rgba(128,128,128,0.06);
}

.typo-label { font-size: 0.8rem; color: ${isDark ? '#94a3b8' : '#64748b'}; }
.typo-value { font-size: 0.8rem; font-weight: 500; max-width: 180px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

.section-card {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.5rem;
  border-radius: 8px;
  transition: background 0.2s;
}

.section-card:hover { background: color-mix(in srgb, var(--primary) 5%, transparent); }

.section-icon { font-size: 1rem; width: 28px; text-align: center; }
.section-info { flex: 1; min-width: 0; }
.section-name { font-size: 0.8rem; font-weight: 500; }
.section-desc { font-size: 0.7rem; color: ${isDark ? '#64748b' : '#94a3b8'}; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.section-badge {
  font-size: 0.65rem;
  padding: 0.15rem 0.4rem;
  background: color-mix(in srgb, var(--accent) 15%, transparent);
  color: var(--accent);
  border-radius: 4px;
}

.features-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.feature-tag {
  font-size: 0.75rem;
  padding: 0.25rem 0.6rem;
  background: color-mix(in srgb, var(--secondary) 12%, transparent);
  color: var(--secondary);
  border-radius: 6px;
}

.routes-list {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.route-item {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.45rem 0.6rem;
  border-radius: 8px;
  font-size: 0.8rem;
  background: color-mix(in srgb, var(--primary) 4%, transparent);
}

.route-path {
  font-family: monospace;
  font-weight: 600;
  color: var(--primary);
}

.route-type {
  font-size: 0.65rem;
  padding: 0.1rem 0.35rem;
  background: color-mix(in srgb, var(--accent) 12%, transparent);
  color: var(--accent);
  border-radius: 4px;
  text-transform: capitalize;
}

.route-label {
  margin-left: auto;
  color: ${isDark ? '#94a3b8' : '#64748b'};
  font-size: 0.75rem;
}

/* ── Responsive ── */
@media (max-width: 1200px) {
  .preview-container { flex-direction: column; align-items: center; }
  .iphone-preview { position: static; }
  .info-panel { width: 100%; max-width: 375px; }
}

@media (max-width: 800px) {
  .desktop-preview { display: none; }
  body { padding: 1rem; }
  .iphone-frame { width: 100%; max-width: 375px; }
}`
  }

  static openPreview(previewPath) {
    const openCommand = process.platform === 'darwin' ? 'open' :
      process.platform === 'win32' ? 'start' : 'xdg-open'
    try {
      execSync(`${openCommand} ${previewPath}`, { stdio: 'ignore' })
      return true
    } catch {
      return false
    }
  }
}

module.exports = { PreviewGenerator }

