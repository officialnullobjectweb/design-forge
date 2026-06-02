# Numb.Design

**Tell your AI agent what to build. We install only what you need — nothing extra.**

Numb.Design is a frontend toolkit that bridges the gap between describing what you want and running the right commands. It came from a simple frustration: every time we started a new project, we wasted hours browsing, comparing, and manually installing packages — only to end up with dependencies we never used.

We built Numb.Design to solve that. Instead of asking "which package do I need for this?", you tell your AI agent what you want to build, and Numb.Design handles the rest.

---

## The Problem We Set Out To Solve

Starting a new frontend project usually goes like this:

1. You have an idea — a landing page, a dashboard, an admin panel.
2. You know you need some UI components, maybe icons, animations, a form library.
3. But which ones? shadcn/ui or Radix? Lucide or Tabler? Framer Motion or GSAP?
4. You spend an hour researching, comparing, reading docs.
5. You install a bunch of packages — some you never even use.
6. You repeat the whole process for the next project.

We wanted a system where:

- **Your AI agent** understands your requirements.
- **Numb.Design** knows which packages exist and how to install them.
- You get a clean install plan — nothing extra, nothing missing.

---

## How We Approached It

We didn't build yet another component library. The web already has amazing free ones — shadcn/ui, Magic UI, Aceternity UI, Radix UI, and hundreds more. What was missing was a **discovery and orchestration layer** on top of them all.

Think of it this way: If every free design resource on the web were a book in a library, Numb.Design is the librarian. You tell the librarian what you're building, and they hand you exactly the books you need — not the whole library.

The architecture is intentionally shallow:

- **A resource catalog** — A curated list of 500+ free frontend resources (UI libraries, icons, fonts, animation tools, form builders, chart libraries, and more). Each entry includes its name, category, description, and exact install command.
- **A command-line interface** — The CLI reads your requirements and matches them against the catalog. It generates an install plan with the exact `npm` commands you need. No guesswork, no bloat.
- **A website** — A visual frontend to browse the catalog, search resources, and learn about the tool. Built with Next.js, Tailwind CSS, Framer Motion, and shadcn/ui — the same stack it helps you set up.
- **Agent skill files** — Pre-written instruction files for AI coding agents (Claude Code, Cursor, GitHub Copilot). Drop them into your project, and your agent instantly knows the design patterns, animation techniques, typography rules, and transition strategies we recommend.

---

## Quick Start

```bash
npx numb-design init
```

Follow the interactive prompts to configure your project. The CLI will generate a complete install plan.

You can also use the web-based wizard at [numb.design/wizard](https://numb.design/wizard).

---

## CLI Commands

Every command is designed to be simple, memorable, and fast:

| Command | What It Does |
|---|---|
| `npx numb-design init` | Interactive project wizard — choose type, style, features, get an install plan |
| `npx numb-design add <resource...>` | Quick-install one or more resources by name |
| `npx numb-design search <query>` | Search the resource catalog by keyword |
| `npx numb-design list` | Show every resource in the catalog, grouped by category |
| `npx numb-design skills` | Install AI agent skill files into your project |
| `npx numb-design template <name>` | Scaffold a pre-built template (coming soon) |

### Examples

```bash
# Start a new project
npx numb-design init

# Install specific resources
npx numb-design add shadcn-ui lucide-react framer-motion

# Find icon libraries
npx numb-design search icons

# List everything available
npx numb-design list

# Install AI agent design skills
npx numb-design skills
```

---

## Using the npm Package Programmatically

```bash
npm install numb-design
```

```javascript
import { generatePlan, analyzeProject, resources } from 'numb-design';

// Generate an install plan based on project type, style, and features
const plan = generatePlan(
  'landing-page',           // project type
  ['modern', 'minimal'],    // design style
  ['animations', 'forms']   // required features
);

// Analyze an existing project for missing tools
const recommendations = analyzeProject('./my-project');

// Browse the full catalog
console.log(resources.length); // 500+ resources
```

---

## How It Works (For the Curious)

At a high level, Numb.Design has three layers:

1. **The Catalog Layer** (`packages/numb-design/resources/catalog.json` and `src/data/`): A hand-curated collection of 500+ free frontend resources. Every entry has been reviewed and categorized. This is the "source of truth" for what's available.

2. **The Command Layer** (`packages/numb-design/bin/cli.js` and `packages/numb-design/index.js`): The CLI and Node.js API that reads the catalog, matches it against your requirements, and outputs install commands. There's no magic here — it's a lookup table with smart defaults based on project type.

3. **The Interface Layer** (the Next.js website): A visual frontend to browse, search, and learn about the catalog. Sections like Templates, Skills, and the CLI section on the homepage all draw from the same data files.

Everything connects through the catalog. Add a resource to `resources/catalog.json`, and it shows up everywhere — the website, the CLI search, and the npm package.

---

## Project Structure

```
numb-design/
├── src/                       # Next.js website source
│   ├── app/                   # Pages (home, docs, skills, templates, wizard, credits)
│   │   └── docs/              # Full documentation page
│   ├── components/            # React components
│   │   ├── Header.tsx         # Navigation with animated scroll effects
│   │   ├── HeroSection.tsx    # Landing hero with CTA
│   │   ├── CLISection.tsx     # Interactive terminal simulation
│   │   ├── CategorySection.tsx # Resource browsing grid
│   │   ├── AnimatedSection.tsx # Scroll-triggered animation wrapper
│   │   └── ...                # Footer, BackToTop, Cards, etc.
│   ├── data/                  # Catalogs, categories, skill definitions
│   └── lib/                   # Utility functions, icon mappings
├── packages/
│   └── numb-design/           # npm package and CLI source
│       ├── bin/cli.js         # CLI entry point (npx numb-design)
│       ├── index.js           # Node.js API (generatePlan, analyzeProject)
│       ├── resources/         # Resource catalog JSON files
│       └── agent-skills/      # AI agent instruction files
├── cli/
│   └── setup.sh               # Interactive bash bootstrap wizard
├── public/                    # Static assets
└── README.md                  # This file
```

---

## Credits

Numb.Design aggregates free, open-source resources and tools from across the web. Every item in our catalog belongs to its original creator. We do not host, distribute, or modify any of these tools. We simply link to them and help you discover them.

If you are a creator and would like your resource removed from our catalog, please open an issue on GitHub.

### Core Technologies (Powering Numb.Design Itself)

| Technology | Used For | Website |
|---|---|---|
| Next.js | Website framework | https://nextjs.org |
| React | UI library | https://react.dev |
| TypeScript | Type safety | https://www.typescriptlang.org |
| Tailwind CSS | Utility-first styling | https://tailwindcss.com |
| Framer Motion (Motion) | Animations and transitions | https://motion.dev |
| shadcn/ui | UI components | https://ui.shadcn.com |
| Lucide React | Icons | https://lucide.dev |
| clsx | Class name utilities | https://github.com/lukeed/clsx |
| tailwind-merge | Class name merging | https://github.com/dcastil/tailwind-merge |
| class-variance-authority | Component variants | https://github.com/joe-bell/cva |
| @clack/prompts | CLI interactive prompts | https://github.com/natemoo-re/clack |
| picocolors | Terminal colors | https://github.com/alexeyraspopov/picocolors |
| ESLint | Code quality | https://eslint.org |
| Vercel | Deployment | https://vercel.com |

### UI Component Libraries (In Our Catalog)

| Library | Website |
|---|---|
| shadcn/ui | https://ui.shadcn.com |
| Radix UI | https://radix-ui.com |
| Aceternity UI | https://ui.aceternity.com |
| Magic UI | https://magicui.design |
| daisyUI | https://daisyui.com |
| Mantine | https://mantine.dev |
| Chakra UI | https://chakra-ui.com |
| Ark UI | https://ark-ui.com |
| Park UI | https://park-ui.com |
| Flowbite | https://flowbite.com |
| Ariakit | https://ariakit.org |
| React Aria (Adobe) | https://react-spectrum.adobe.com/react-aria |
| Dub UI | https://ui.dub.co |
| Origin UI | https://originui.com |
| Primer React (GitHub) | https://primer.style/react |
| Pico CSS | https://picocss.com |
| Open Props | https://open-props.style |
| Materialize CSS | https://materializecss.com |
| HyperUI | https://github.com/markmead/hyperui |
| Preline UI | https://github.com/htmlstreamofficial/preline |
| Sailboat UI | https://github.com/sailboatui/sailboatui |
| Meraki UI | https://github.com/merakiui/merakiui |
| Landwind | https://github.com/themesberg/landwind |
| Page UI | https://github.com/pagemark/page-ui |
| Orbitly (Antimatter AI) | https://github.com/mattantimatter/orbitly-template |
| Notus Next.js (Creative Tim) | https://github.com/creativetimofficial/notus-nextjs |
| ModernSaaS | https://github.com/MasuRii/ModernSaaS-LandingPage-Template |
| Boosted UI (Orange) | https://boosted.orange.com |
| Bootswatch | https://bootswatch.com |
| Sky UI | https://library.sky-ui.com |

### Icon Libraries

| Library | Website |
|---|---|
| Lucide | https://lucide.dev |
| Heroicons | https://heroicons.com |
| Phosphor Icons | https://phosphoricons.com |
| Tabler Icons | https://tabler-icons.io |
| Radix Icons | https://radix-ui.com/icons |
| React Icons | https://react-icons.github.io/react-icons |
| Remix Icon | https://remixicon.com |
| Feather Icons | https://feathericons.com |
| Huge Icons | https://hugeicons.com |

### Animation & Motion Libraries

| Library | Website |
|---|---|
| Framer Motion (Motion) | https://motion.dev |
| GSAP (GreenSock) | https://gsap.com |
| AutoAnimate (FormKit) | https://auto-animate.formkit.com |
| LottieFiles | https://lottiefiles.com |
| Anime.js | https://animejs.com |
| React Spring | https://react-spring.io |
| AOS (Animate on Scroll) | https://michalsnik.github.io/aos |
| Animista | https://animista.net |
| Animate.css | https://animate.style |
| Hover.css | https://ianlunn.github.io/Hover |
| Transition.css | https://transition.style |
| Easings.net | https://easings.net |

### 3D, Canvas & Visual Effects

| Library | Website |
|---|---|
| Three.js | https://threejs.org |
| React Three Fiber | https://r3f.docs.pmnd.rs |
| tsParticles | https://particles.js.org |
| Paper.js | http://paperjs.org |
| Babylon.js | https://www.babylonjs.com |
| Lenis (Studio Freight) | https://lenis.studiofreight.com |
| p5.js | https://p5js.org |

### Charts & Data Visualization

| Library | Website |
|---|---|
| Recharts | https://recharts.org |
| Chart.js | https://www.chartjs.org |
| D3.js | https://d3js.org |
| Nivo | https://nivo.rocks |
| Visx (Airbnb) | https://airbnb.io/visx |
| ApexCharts | https://apexcharts.com |
| Apache ECharts | https://echarts.apache.org |
| Frappe Charts | https://frappe.io/charts |

### Forms & Validation

| Library | Website |
|---|---|
| React Hook Form | https://react-hook-form.com |
| Zod | https://zod.dev |
| Formik | https://formik.org |
| TanStack Form | https://tanstack.com/form |
| React Final Form | https://final-form.org/react |
| Conform | https://conform.guide |
| Formspree | https://formspree.io |

### Authentication & Payments

| Library | Website |
|---|---|
| NextAuth.js | https://next-auth.js.org |
| Stripe | https://stripe.com |

### Email

| Library | Website |
|---|---|
| React Email | https://react.email |

### Fonts & Typography

| Resource | Website |
|---|---|
| Google Fonts | https://fonts.google.com |
| Fontsource | https://fontsource.org |
| Fontshare | https://fontshare.com |
| Inter (Rasmus Andersson) | https://rsms.me/inter |
| Geist (Vercel) | https://vercel.com/font |
| JetBrains Mono | https://www.jetbrains.com/lp/mono |
| Poppins | https://fonts.google.com/specimen/Poppins |
| DM Sans | https://fonts.google.com/specimen/DM+Sans |
| Plus Jakarta Sans | https://fonts.google.com/specimen/Plus+Jakarta+Sans |
| Cal Sans (Cal.com) | https://github.com/calcom/font |
| FontJoy | https://fontjoy.com |
| Butterick's Practical Typography | https://practicaltypography.com |
| Fonts Knowledge (Google) | https://fonts.google.com/knowledge |

### Colors & Palettes

| Resource | Website |
|---|---|
| Tailwind CSS Colors | https://tailwindcss.com/docs/customizing-colors |
| Radix Colors | https://radix-ui.com/colors |
| Open Color | https://yeun.github.io/open-color |
| Catppuccin | https://catppuccin.com |
| Coolors | https://coolors.co |
| Adobe Color | https://color.adobe.com |
| Color Hunt | https://colorhunt.co |
| Huemint | https://huemint.com |
| Eva Design Colors | https://colors.eva.design |
| Realtime Colors | https://realtimecolors.com |
| MyColor.space | https://mycolor.space |
| Contrast Ratio | https://contrast-ratio.com |
| Flat UI Colors | https://flatuicolors.com |

### Illustrations & Images

| Resource | Website |
|---|---|
| unDraw | https://undraw.co |
| Humaaans | https://humaaans.com |
| Blush | https://blush.design |
| Storyset | https://storyset.com |
| SVG Repo | https://svgrepo.com |
| Unsplash | https://unsplash.com |
| Pexels | https://pexels.com |
| Pixelarticons | https://pixelarticons.com |

### Gradients & Patterns

| Resource | Website |
|---|---|
| CSS Gradient | https://cssgradient.io |
| UI Gradients | https://uigradients.com |
| Gradient Hunt | https://gradienthunt.com |
| Mesh Gradients | https://meshgradients.com |
| Pattern Pad | https://patternpad.com |
| Hero Patterns | https://heropatterns.com |
| Glassmorphism Generator | https://glassmorphism.com |
| Claymorphism Generator | https://claymorphism.com |
| SVG Backgrounds | https://www.svgbackgrounds.com |
| Neumorphism.io | https://neumorphism.io |
| CSS Filter Generator | https://www.cssfiltergenerator.com |

### Design Inspiration & Learning

| Resource | Website |
|---|---|
| Dribbble | https://dribbble.com |
| Awwwards | https://www.awwwards.com |
| Site Inspire | https://www.siteinspire.com |
| One Page Love | https://onepagelove.com |
| Collect UI | https://collectui.com |
| Refero | https://refero.design |
| Mobbin | https://mobbin.com |
| Lapa Ninja | https://www.lapa.ninja |
| Landing Folio | https://www.landingfolio.com |
| Laws of UX (Jon Yablonski) | https://lawsofux.com |
| Refactoring UI (Adam Wathan & Steve Schoger) | https://www.refactoringui.com |
| Nielsen Norman Group | https://www.nngroup.com |
| Smashing Magazine | https://www.smashingmagazine.com |
| CSS-Tricks | https://css-tricks.com |
| Inclusive Components (Heydon Pickering) | https://inclusive-components.design |
| Material Design (Google) | https://material.io/design |
| Apple Human Interface Guidelines | https://developer.apple.com/design/human-interface-guidelines |
| Design Systems (Figma) | https://www.designsystems.com |
| web.dev (Google) | https://web.dev |
| Grid by Example (Rachel Andrew) | https://gridbyexample.com |
| Every Layout (Heydon Pickering & Andy Bell) | https://every-layout.dev |
| The A11Y Project | https://www.a11yproject.com |
| W3C Web Accessibility Initiative | https://www.w3.org/WAI |

### Template Sources

| Resource | Website |
|---|---|
| HTML5 UP | https://html5up.net |
| Start Bootstrap | https://startbootstrap.com |
| Cruip | https://cruip.com |
| Tailwind Toolbox | https://github.com/tailwindtoolbox |
| TemplateMo | https://templatemo.com |
| BootstrapMade | https://bootstrapmade.com |
| MDBootstrap | https://mdbootstrap.com |
| BootstrapDash | https://bootstrapdash.com |
| GrayGrids | https://graygrids.com |
| ThemeFisher | https://themefisher.com |
| AstroWind (onWidget) | https://github.com/onwidget/astrowind |
| Astroship (surjithctly) | https://github.com/surjithctly/astroship |

### Prototyping & Testing Tools

| Tool | Website |
|---|---|
| Figma | https://figma.com |
| Penpot | https://penpot.app |
| Responsive Design Checker | https://responsivedesignchecker.com |
| Hoverify | https://tryhoverify.com |

### AI & Agent Platforms

| Platform | Website |
|---|---|
| Claude Code (Anthropic) | https://www.anthropic.com |
| Cursor | https://cursor.sh |
| GitHub Copilot | https://github.com/features/copilot |

### Infrastructure & Services

| Service | Used For | Website |
|---|---|---|
| SimpleIcons CDN | Brand icons on resource cards | https://simpleicons.org |
| Google Favicons API | Fallback resource icons | https://www.google.com/s2/favicons |
| GitHub | Source control and hosting | https://github.com |
| npm | Package registry | https://www.npmjs.com |

---

## License

MIT

---

## Links

- **Website:** [https://numb.design](https://numbdesign.vercel.app)
- **Documentation:** [https://numb.design/docs](https://numbdesign.vercel.app/docs)
- **GitHub:** [https://github.com/officialnullobjectweb/Numb.design](https://github.com/officialnullobjectweb/Numb.design)
- **npm:** [https://www.npmjs.com/package/numb-design](https://www.npmjs.com/package/numb-design)
- **Interactive Wizard:** [https://numb.design/wizard](https://numbdesign.vercel.app/wizard)
