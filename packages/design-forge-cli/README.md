# DesignForge CLI

> **One-command setup for your design project. Install only what you need from 100+ free design resources.**

DesignForge is an interactive CLI wizard that helps you discover, select, and install the best free design resources for your project — Tailwind components, icon sets, fonts, animations, 3D libraries, charts, form builders, and more.

No more digging through GitHub repos or blog posts to find the right library. Answer 3 questions and get a curated plan.

---

## Installation

```bash
npm install -g @design-forge/cli
```

## Usage

### Interactive wizard (recommended)

```bash
design-forge
# or
df
```

The CLI will ask you 3 questions:

1. **What are you building?** — `landing-page`, `dashboard`, `ecommerce`, `portfolio`, `blog`, `saas`, `mobile-app`, `web-app`
2. **What style?** — `modern`, `minimal`, `playful`, `dark`, `glassmorphic`, `brutalist` (multi-select)
3. **What features?** — `animations`, `3d`, `charts`, `forms`, `auth`, `icons`, `illustrations`, `fonts`, `dark-mode`, `particles`, `email`, `payment` (multi-select)

After answering, DesignForge will:

- Generate a custom resource plan with install commands
- Apply the design token consistency layer
- Optionally run the install commands for you

### Programmatic API

```js
const forge = require('@design-forge/cli');

// Generate a resource plan
const plan = forge.generatePlan(
  'dashboard',
  ['modern', 'dark'],
  ['charts', 'icons', 'fonts']
);
// plan → [{ name: 'shadcn/ui', install: 'npx shadcn@latest init -d', ... }, ...]

// Analyze an existing project for missing resources
const recommendations = forge.analyzeProject('./my-project');
// → [{ name: 'Lucide Icons', reason: 'No icon library detected', install: 'npm install lucide-react' }]

// Apply the design token consistency layer
forge.applyConsistency('./my-project');
// → { success: true, path: './my-project/design-tokens.css' }

// Browse the resource catalog
console.log(forge.resources['ui-components']);
// → [{ name: 'shadcn/ui', ... }, { name: 'daisyUI', ... }, ...]

// Style and feature maps
console.log(forge.STYLE_MAP);
console.log(forge.FEATURE_MAP);
```

---

## Consistency Layer

DesignForge includes a `design-tokens.css` file that normalizes components from different libraries (shadcn/ui, daisyUI, MagicUI, Radix, etc.) into a shared token system. It provides:

- **CSS custom properties** (`--df-*`) for spacing, radius, shadows, animation, typography, and containers
- **Cross-library normalization** — make buttons, focus rings, and transitions consistent
- **Utility classes** (`.df-container`, `.df-flex-center`, `.df-grid`, `.df-stack`) for common layouts

To use it:

```css
@import "design-tokens.css";
```

Then set `data-df-normalize` on your root element:

```html
<html data-df-normalize>
```

---

## Resource Catalog

| Category | Resources |
|---|---|
| **UI Components** | shadcn/ui, daisyUI, Magic UI, Aceternity UI, Radix UI, Ark UI, Park UI, Mantine, Primer React |
| **Icons** | Lucide, Phosphor Icons, Heroicons, Radix Icons, Tabler Icons, React Icons |
| **Fonts** | Inter, Geist, Nunito, JetBrains Mono, Poppins, DM Sans, Plus Jakarta Sans, Cal Sans |
| **Colors** | Tailwind Colors, Radix Colors, Open Color, Catppuccin, Flat UI Colors |
| **Animations** | Framer Motion (Motion), GSAP, AOS, AutoAnimate, tailwindcss-animate, UseAnimations |
| **3D** | Three.js, React Three Fiber, GSAP ScrollTrigger, Lenis, Particles.js, tsParticles |
| **Charts** | Recharts, Chart.js, D3.js, Nivo, Visx, ApexCharts, ECharts |
| **Forms** | React Hook Form, Zod, Formik, TanStack Form, React Final Form, Conform |
| **Images** | unDraw, LottieFiles, Humaaans, Blush, Pexels, Unsplash, SVG Repo |

---

## Credits & Licensing

DesignForge curates links to existing open-source and free projects. All rights remain with their respective authors:

| Resource | License |
|---|---|
| shadcn/ui | MIT |
| daisyUI | MIT |
| Magic UI | MIT |
| Radix UI | MIT |
| Lucide | ISC |
| Phosphor Icons | MIT |
| Heroicons | MIT |
| Inter, Geist, Nunito, etc. | OFL (SIL Open Font License) |
| Tailwind CSS | MIT |
| Three.js | MIT |
| Framer Motion | MIT |
| GSAP | Standard License (free tier) |
| D3.js | ISC |
| Recharts | MIT |
| Chart.js | MIT |
| unDraw | MIT (illustrations are free to use) |
| LottieFiles | MIT |
| Pexels | Pexels License (free for commercial use) |
| Unsplash | Unsplash License (free for commercial use) |

**Note**: GSAP has a standard license with a generous free tier. Always verify the latest licensing terms on the respective project websites.

---

## Links

- **Web App**: [https://design-forge.vercel.app](https://design-forge.vercel.app)
- **GitHub**: [https://github.com/officialnullobjectweb/design-forge](https://github.com/officialnullobjectweb/design-forge)
- **Report Issues**: [https://github.com/officialnullobjectweb/design-forge/issues](https://github.com/officialnullobjectweb/design-forge/issues)

---

## Development

```bash
# Clone the monorepo
git clone https://github.com/officialnullobjectweb/design-forge.git
cd design-forge/packages/design-forge-cli

# Test the CLI locally
node bin/cli.js

# Link globally for development
npm link
design-forge
```
