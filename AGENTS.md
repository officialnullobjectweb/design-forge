# DesignForge — AI Agent Guide

## What This Is

**DesignForge** is an AI-agent-controlled frontend builder. It is an NPM package (`design-forge-cli`) and a companion website that together let AI agents assemble premium frontends in ~5 minutes.

## Core Philosophy

1. **Zero bloat** — Install only the packages the user's requirements actually need
2. **100% free** — All resources listed are free/open-source
3. **Agent-native** — The website is a resource catalog; the real work happens via the CLI + AI agent skills

## How an AI Agent Uses DesignForge

### Step 1: Understand the Requirements

Ask the user:
- What kind of project? (landing page, dashboard, e-commerce, blog, portfolio, SaaS, admin panel)
- Preferred stack? (React/Next.js/Tailwind/Vue/vanilla HTML)
- Design preferences? (minimal, bold, playful, corporate, dark, glassmorphism)
- Special features? (animations, 3D, charts, forms, auth)

### Step 2: Select Only Needed Packages

Browse packages by category:

| Category | What's Inside | Agent Action |
|---|---|---|
| `ui-components` | shadcn/ui, DaisyUI, Radix UI, Mantine, Chakra UI, Flowbite | Pick 1 component library + 1 headless lib |
| `icons-illustrations` | Lucide, Tabler, Heroicons, Phosphor, unDraw, Storyset | Pick 1 icon set + optionally 1 illustration lib |
| `fonts-typography` | Google Fonts, Fontsource, Fontshare, Type Scale | Pick 1-2 font sources |
| `colors-palettes` | Coolors, Adobe Color, Color Hunt, Realtime Colors | Pick for reference, not install |
| `animation-motion` | Framer Motion, GSAP, Anime.js, AOS, LottieFiles | Pick 1 animation lib |
| `transitions-effects` | Transition.css, Easing Functions, Rough Notation | Pick if needed |
| `3d-canvas-fx` | Three.js, Spline, p5.js, Zdog, PixiJS | Pick only if 3D is required |
| `charts-data-viz` | Chart.js, Recharts, D3, ApexCharts, Tremor | Pick 1 chart lib if data viz needed |
| `images-media` | Unsplash, Pexels, Pixabay, SVG Repo | Pick for reference |
| `gradients-patterns` | UI Gradients, Gradient Hunt, WebGradients, BGJar | Pick for reference |
| `forms-validation` | React Hook Form, Zod, Yup, Formik | Pick 1 form lib + 1 validation lib |
| `layout-grid` | CSS Grid, Flexbox (reference), CSS-Tricks | No install needed |
| `design-inspiration` | Awwwards, Dribbble, Behance, Mobbin | No install needed |
| `prototyping` | Figma, Framer, Excalidraw | No install needed |

### Step 3: Install via CLI

```bash
# Install just what's needed
npx design-forge-cli install shadcn-ui framer-motion lucide-react

# Or install all and let the agent manage (auto-cleanup removes unused)
npx design-forge-cli
```

### Step 4: Install AI Agent Skills

```bash
# Copy agent skill files to your project's .claude/skills/ directory
npx design-forge-cli skills ./my-project
```

This copies SKILL.md files with structured rules for each resource category.

### Step 5: Build

Use the installed packages to build the frontend. The skills files teach the agent how to use each package properly.

## Resource Icons

Every resource card shows the site's brand logo:
- Uses SimpleIcons CDN for known brands: `https://cdn.simpleicons.org/SLUG/COLOR`
- Falls back to Google Favicons API for other sites: `https://www.google.com/s2/favicons?domain=DOMAIN&sz=64`
- Falls back to first-letter initials if neither works

## CLI Reference

```
design-forge-cli [command] [target-dir]

Commands:
  (no command)  Interactive prompt to select and install packages
  install       Install specific packages (space-separated IDs)
  list          Show all available packages by category
  skills        Copy AI agent skill files to target directory
  help          Show help

Examples:
  npx design-forge-cli
  npx design-forge-cli install shadcn-ui framer-motion lucide-react
  npx design-forge-cli skills ./my-project
  npx design-forge-cli list
```

## Template Sources

When the user needs a pre-built page, recommend templates from these verified sources:

| Source | Specialty | URL |
|---|---|---|
| **AstroWind** | Most-starred Astro theme — full marketing site + blog | https://github.com/onwidget/astrowind |
| **Astroship** | Minimal Astro landing page (99 Lighthouse) | https://github.com/surjithctly/astroship |
| **HyperUI** | 500+ Tailwind copy-paste components (12k stars) | https://github.com/markmead/hyperui |
| **Flowbite** | 400+ interactive Tailwind components (9.2k stars) | https://github.com/themesberg/flowbite |
| **Preline UI** | 300+ Tailwind sections as a plugin (6.3k stars) | https://github.com/htmlstreamofficial/preline |
| **Sailboat UI** | 150+ Tailwind components, zero JS (1.3k stars) | https://github.com/sailboatui/sailboatui |
| **Meraki UI** | 200+ Tailwind components with full RTL (3.5k stars) | https://github.com/merakiui/merakiui |
| **Landwind** | SaaS landing page by Flowbite team | https://github.com/themesberg/landwind |
| **shadcn Landing Page** | React/Next.js landing on shadcn/ui | https://github.com/ibelick/landing-page |
| **Page UI** | Copy-paste React landing page components | https://github.com/pagemark/page-ui |
| **Orbitly** | Premium SaaS landing page (Framer Motion) | https://github.com/mattantimatter/orbitly-template |
| **Notus Next.js** | Full Next.js UI kit + dashboard | https://github.com/creativetimofficial/notus-nextjs |
| **ModernSaaS** | Astro+React with glassmorphism, bento grids | https://github.com/MasuRii/ModernSaaS-LandingPage-Template |
| HTML5 UP | Landing pages, portfolios | https://html5up.net |
| Start Bootstrap | Dashboards, admin panels | https://startbootstrap.com |
| Cruip | Landing pages, SaaS (with Figma) | https://cruip.com |
| Tailwind Toolbox | Tailwind CSS starters | https://tailwindtoolbox.com |

## Skills Categories

When the user requests specific design knowledge, reference the skills:

- **Design Principles** — Color, contrast, hierarchy, balance, unity
- **UX Patterns** — Navigation, onboarding, empty states, error handling
- **Color Theory** — Schemes, accessibility (WCAG), psychology
- **Typography** — Pairing, hierarchy, readability, web fonts
- **Layout & Composition** — Grid, flexbox, spacing, responsive design
- **Accessibility** — ARIA, keyboard nav, screen readers, contrast
- **Design Tools** — Figma, Framer, Penpot, Excalidraw
- **Design Systems** — Tokens, components, documentation, versioning
- **Animation & Motion** — Transitions, micro-interactions, timing

## Build

```bash
npm run build    # SSG — all routes are static
npm run dev      # Development server
```
