# DesignForge — AI Agent Guide

## What This Is

**DesignForge** is a free design resource hub and project setup wizard. The website aggregates the best free UI/UX resources, and the setup script helps bootstrap projects with the right packages.

## Core Philosophy

1. **Zero bloat** — Install only the packages the project actually needs
2. **100% free** — All resources listed are free/open-source
3. **Setup via bash** — One curl command to bootstrap any project

## How an AI Agent Uses DesignForge

### Quick Setup

```bash
curl -fsSL https://design-forge-beta.vercel.app/cli/setup.sh | bash
```

This interactive wizard:
1. Asks what you're building (landing page, dashboard, e-commerce, portfolio, blog, SaaS, web-app)
2. Asks your style preferences (modern, minimal, dark, glassmorphic, playful, brutalist)
3. Asks what features you need (animations, 3D, charts, forms, auth, icons, etc.)
4. Generates an install plan with exact npm commands
5. Optionally applies the consistency layer (design tokens)

### Using Without the Wizard

The wizard maps your choices to specific npm packages:

| Style | Packages |
|-------|----------|
| glassmorphic | Glassmorphism CSS |
| dark | Radix Colors |
| playful | MagicUI, tsParticles |
| animations | Framer Motion, AutoAnimate |
| 3d | Three.js, React Three Fiber |
| charts | Recharts |
| forms | React Hook Form, Zod |
| auth | NextAuth |
| icons | Tabler Icons |
| illustrations | unDraw |
| fonts | Fontsource |
| particles | tsParticles |
| email | React Email |
| payment | Stripe |

### Consistency Layer

The design tokens file (`consistency/design-tokens.css`) provides a normalized foundation:
- CSS custom properties for spacing, colors, and typography
- A `data-df-normalize` attribute for root-level resets
- Dark mode support via `prefers-color-scheme`
- Apply with `@import "consistency/design-tokens.css"` or `data-df-normalize`

## Resource Icons

Every resource card shows the site's brand logo:
- Uses SimpleIcons CDN for known brands: `https://cdn.simpleicons.org/SLUG/COLOR`
- Falls back to Google Favicons API for other sites: `https://www.google.com/s2/favicons?domain=DOMAIN&sz=64`
- Falls back to first-letter initials if neither works
