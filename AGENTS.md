# Numb.Design — AI Agent Guide

## What This Is

**Numb.Design** is an AI-powered frontend builder. The website aggregates the best free UI/UX resources, and the CLI bootstraps projects with only the packages needed.

## Core Philosophy

1. **Zero bloat** — Install only the packages the project actually needs
2. **100% free** — All resources listed are free/open-source
3. **Setup via CLI** — One command to bootstrap any project

## How an AI Agent Uses Numb.Design

### Quick Setup

```bash
npx numb-design init
```

Or the interactive wizard:

```bash
curl -fsSL https://numb.design/cli/setup.sh | bash
```

This interactive wizard:
1. Asks what you're building (landing page, dashboard, e-commerce, portfolio, blog, SaaS, web-app)
2. Asks your style preferences (modern, minimal, dark, glassmorphic, playful, brutalist)
3. Asks what features you need (animations, 3D, charts, forms, auth, icons, etc.)
4. Generates an install plan with exact npm commands

### Resource Icons

Every resource card shows the site's brand logo:
- Uses SimpleIcons CDN for known brands: `https://cdn.simpleicons.org/SLUG/COLOR`
- Falls back to Google Favicons API: `https://www.google.com/s2/favicons?domain=DOMAIN&sz=64`
- Falls back to first-letter initials if neither works
