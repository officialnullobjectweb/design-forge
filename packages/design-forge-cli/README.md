# DesignForge CLI

> **Build complete, production-ready frontends from idea to website. One command, interactive wizard, iPhone preview.**

DesignForge is a **6-step interactive CLI wizard** that builds a complete Next.js project:
AI-generated blueprint → design tokens → page routing → section components → installs dependencies → iPhone preview.

No manual setup. No copy-pasting. Just answer 6 questions and get a buildable, production-ready website.

---

## Quick Start

```bash
npx design-forge create
# or
npx df create
```

The 6-step wizard walks you through:

| Step | What You Choose |
|------|----------------|
| 1. **Project Type** | Landing page, SaaS, Dashboard, E-commerce, Blog, Portfolio, Admin Panel |
| 2. **Design Style** | Minimal, Modern, Playful, Dark, Bold, Glassmorphic |
| 3. **Features** | Dark mode, Animations, Contact form, Auth, Blog, Analytics, SEO, i18n |
| 4. **Sections** | Hero, Features, Pricing, Testimonials, FAQ, CTA, Stats, Team, Contact |
| 5. **Colors** | 12 curated palettes or custom hex codes |
| 6. **Free Text** | Describe your project, brand name, design preferences |

After the wizard, DesignForge:
- Generates a **complete Next.js project** with Tailwind, Shadcn UI, design tokens
- Installs all dependencies 
- Opens an **iPhone preview** in your browser showing your site with its colors, sections, and typography

---

## Commands

| Command | Description |
|---------|-------------|
| `design-forge create` | Interactive 6-step wizard (recommended) |
| `design-forge init` | Quick setup with defaults |
| `design-forge preview` | Re-open the iPhone preview anytime |
| `design-forge list` | Browse the resource catalog |
| `design-forge skills` | Copy AI agent skill files |
| `design-forge --version` | Show version |
| `design-forge --help` | Show help |

## Examples

```bash
# Create a new project in the current directory
npx design-forge create

# Start the dev server after generation
cd ./my-project
npm run dev        # → http://localhost:3000
npm run build      # Production build
df preview         # Re-open iPhone preview
```

---

## What You Get

After running `design-forge create`, you get a complete project:

```
my-project/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── page.tsx         # Homepage with sections
│   │   ├── contact/page.tsx # Contact page
│   │   ├── 404.tsx          # Not found page
│   │   ├── sitemap.ts       # SEO sitemap
│   │   ├── robots.ts        # Robots.txt
│   │   └── manifest.ts      # PWA manifest
│   ├── components/
│   │   ├── sections/        # HeroSection, FeaturesGrid, PricingSection...
│   │   ├── layout/          # Header, Footer
│   │   └── ui/              # Button, Card, Badge (shadcn-style)
│   ├── lib/                 # Utilities (utils.ts)
│   └── site.config.ts       # Central config for colors, fonts, content
├── .design-forge/           # iPhone preview (open anytime)
├── tailwind.config.ts
├── next.config.ts
└── package.json
```

All sections, pages, and styling are driven by the design tokens in `site.config.ts` — edit one file to update everything.

---

## iPhone Preview

The preview shows your generated site in both a desktop browser frame and an iPhone 15 Pro frame, alongside a spec panel with:
- **Color palette** — primary, secondary, accent, background
- **Typography** — font family and heading font
- **Sections** — all selected components
- **Features** — enabled capabilities
- **Routes** — all generated pages

Run `df preview` anytime to re-open it.

---

## Programmatic API

```js
const forge = require('design-forge-cli');

// Generate a resource plan
const plan = forge.generatePlan('dashboard', ['modern', 'dark'], ['charts', 'icons']);
// → [{ name: 'shadcn/ui', install: '...' }, ...]

// Analyze project for missing resources
const recommendations = forge.analyzeProject('./my-project');
// → [{ name: 'Lucide Icons', reason: 'No icon library detected', install: '...' }]

// Generate an iPhone preview
const { PreviewGenerator } = forge;
PreviewGenerator.generate(blueprint, './output-dir');
PreviewGenerator.openPreview('./output-dir/.design-forge/preview.html');
```

---

## Publishing to npm

```bash
# 1. Build and test
node bin/cli.js --help

# 2. Login to npm
npm login

# 3. Publish
npm publish

# 4. Verify
npx design-forge --version
```

## Links

- **Web App**: [https://design-forge.vercel.app](https://design-forge.vercel.app)
- **GitHub**: [https://github.com/officialnullobjectweb/design-forge](https://github.com/officialnullobjectweb/design-forge)
- **npm**: [https://www.npmjs.com/package/design-forge-cli](https://www.npmjs.com/package/design-forge-cli)

---

## Development

```bash
git clone https://github.com/officialnullobjectweb/design-forge.git
cd design-forge/packages/design-forge-cli

# Test locally
node bin/cli.js --help

# Link globally
npm link
design-forge create
```
