# Numb.Design

**AI-powered frontend toolkit. Tell your AI agent what to build. We install only what you need — nothing extra.**

Numb.Design is a command-line tool and Node.js library that helps you discover, evaluate, and install frontend resources instantly. Instead of researching packages one by one, you describe what you need — and Numb.Design tells you exactly what to install.

It came from a simple frustration: every new project meant hours of browsing, comparing, and manually installing packages — only to end up with dependencies we never used. We built Numb.Design to make that process instant.

---

## Quick Start

```bash
npx numb-design init
```

Follow the interactive prompts to configure your project type, design style, and features. The CLI generates a complete install plan with exact npm commands.

---

## CLI Commands

| Command | What It Does |
|---|---|
| `npx numb-design init` | Interactive project wizard — choose type, style, features, get an install plan |
| `npx numb-design add <resource...>` | Quick-install one or more resources by name (for example: `npx numb-design add shadcn-ui lucide-react framer-motion`) |
| `npx numb-design search <query>` | Search the entire resource catalog by keyword (for example: `npx numb-design search icons`) |
| `npx numb-design list` | Show every resource in the catalog, grouped by category |
| `npx numb-design skills` | Install AI agent skill files into your `.claude/skills/` directory |
| `npx numb-design --version` | Show version |
| `npx numb-design --help` | Show help |

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

## Using the Node.js API

```javascript
import { generatePlan, analyzeProject, resources } from 'numb-design';

// Generate an install plan based on project type, style, and features
const plan = generatePlan(
  'landing-page',           // project type: landing-page, dashboard, ecommerce, portfolio, blog, saas, web-app
  ['modern', 'minimal'],    // design style: modern, minimal, dark, glassmorphic, playful
  ['animations', 'forms']   // required features: animations, forms, auth, icons, charts, 3d, email, payment
);

// Each item in the plan includes the name, description, and exact install command
plan.forEach(item => {
  console.log(`${item.name}: ${item.install}`);
});

// Analyze an existing project for missing tools
const recommendations = analyzeProject('./my-project');

// Browse the full resource catalog
console.log(`Total resources: ${resources.length}`);
```

---

## How to Publish to npm

```bash
# From the packages/numb-design directory
npm login
npm publish --access public
```

---

## Links

- **Website:** [https://numb.design](https://numb.design)
- **Documentation:** [https://numb.design/docs](https://numb.design/docs)
- **GitHub:** [https://github.com/officialnullobjectweb/Numb.design](https://github.com/officialnullobjectweb/Numb.design)
- **npm:** [https://www.npmjs.com/package/numb-design](https://www.npmjs.com/package/numb-design)
- **Interactive Wizard:** [https://numb.design/wizard](https://numb.design/wizard)

---

## License

MIT
