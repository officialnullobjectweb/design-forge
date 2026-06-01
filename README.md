# ⚡ DesignForge — Your Free Design Command Center

**Aggregate. Combine. Build Premium.** DesignForge collects the best **100% free** UI/UX design resources from across the internet and presents them in one curated hub. No paid tools. No subscriptions. Just the best open-source design ecosystem.

## 🎯 The Problem

Free design resources are scattered across the web. You hunt through bookmarks, Google searches, and GitHub repos just to find what you need. DesignForge solves this by acting as a **central command center** for all free UI/UX resources.

## ✨ What's Inside

### 🧩 UI Components
| Resource | What It Does |
|---|---|
| [shadcn/ui](https://ui.shadcn.com) | Copy-paste React components. Radix + Tailwind. Best in class |
| [Aceternity UI](https://ui.aceternity.com) | Stunning animated components with Framer Motion |
| [MagicUI](https://magicui.design) | Magical animations — sparkles, meteors, glows, beams |
| [DaisyUI](https://daisyui.com) | Tailwind component classes. 50+ components, 35+ themes |
| [Flowbite](https://flowbite.com) | 1000+ Tailwind components. React, Vue, HTML versions |

### 🎨 Icons & Illustrations
| Resource | What It Does |
|---|---|
| [Lucide Icons](https://lucide.dev) | 5000+ beautiful, tree-shakeable icons |
| [Tabler Icons](https://tabler.io/icons) | 5800+ MIT icons. Outline + filled |
| [Heroicons](https://heroicons.com) | Tailwind's official icon set. 292 icons |
| [Storyset](https://storyset.com) | Free animated SVG illustrations |
| [unDraw](https://undraw.co) | Open-source SVG illustrations. Any color |

### 🎬 Animation & Motion
| Resource | What It Does |
|---|---|
| [Framer Motion](https://motion.dev) | Production-grade React animation library |
| [GSAP](https://gsap.com) | Professional-grade animation (free on localhost) |
| [AutoAnimate](https://auto-animate.formkit.com) | One line — automatic smooth animations |
| [LottieFiles](https://lottiefiles.com) | JSON animations from After Effects |

### 🧊 3D, Canvas & Special FX
| Resource | What It Does |
|---|---|
| [Three.js](https://threejs.org) | 3D scenes in the browser |
| [React Three Fiber](https://r3f.docs.pmnd.rs) | Three.js as React components |
| [tsParticles](https://particles.js.org) | Particle effects — confetti, snow, stars |
| [Recharts](https://recharts.org) | Composable React charts. Fully free |

## 🚀 Quick Start

### One-Command Setup
```bash
bash <(curl -sL https://design-forge.vercel.app/cli/setup.sh)
```

This will:
- Create a Next.js project (if none exists)
- Install framer-motion, lucide-react, clsx, tailwind-merge
- Initialize shadcn/ui with essential components
- Install MagicUI, Recharts, Tabler Icons

### Manual Installation
```bash
# Core
npm install framer-motion lucide-react clsx tailwind-merge

# shadcn/ui
npx shadcn@latest init
npx shadcn@latest add button card input badge dialog dropdown-menu

# Extras
npm install magicui recharts @tabler/icons-react
```

## 🏗️ Project Structure
```
design-forge/
├── src/
│   ├── app/              # Next.js app router pages
│   ├── components/       # React components (Header, Hero, Cards, etc.)
│   ├── data/             # Resource definitions & metadata
│   └── lib/              # Utility functions (cn helper)
├── cli/
│   └── setup.sh          # One-command bootstrap script
└── public/               # Static assets
```

## 🤝 Credits & Attribution

DesignForge is a **curation directory** — it does not host, redistribute, or modify any of the listed tools. Every resource belongs to its respective creator and is used under its open-source license (MIT, Apache 2.0, CC0, or similar).

**Please support these amazing projects:**
- ⭐ Star their repos
- 🐛 Report bugs to them
- 💖 Consider sponsoring if you can

## 📜 License

This curation project is MIT licensed. The individual tools listed retain their own licenses.
