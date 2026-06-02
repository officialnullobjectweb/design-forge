# Numb.Design CLI

> **Build complete, production-ready frontends from idea to website. One command, token-locked design, 50+ component library.**

Numb.Design is a **token-locked design constitution** for AI agents and humans.
The constitution enforces 12 colors, 3 type sizes, 9 spacing values, 5 radii, 3 shadows, 2 springs — so every page, every component, every prompt lands on-brand, on-spec, on-budget.

No manual setup. No copy-pasting. Just one command and get a buildable, production-ready website.

---

## Quick Start

```bash
npx create-numb-app my-app
cd my-app
npm install
npm run dev
```

Then add components on demand:

```bash
npx numb add button
npx numb add card
npx numb add modal
npx numb add chart
```

---

## What You Get

After running `npx create-numb-app my-app`, you get a complete project:

```
my-app/
├── clt.config.ts          # Design DNA — change one value to rebrand
├── AGENTS.md              # AI rules (read by Cursor, Claude Code, Copilot)
├── tailwind.config.ts     # Reads tokens from clt.config.ts
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   └── lib/
│       └── clt.ts         # cn() helper + token exports
└── package.json
```

All styling is driven by the design tokens in `clt.config.ts` — edit one file to update everything.

---

## Token Constitution

The constitution is the moat. It enforces:

| Token | Count | Examples |
|-------|-------|----------|
| Colors | 12 | `primary`, `secondary`, `neutral-{100,300,500,900}`, `bg`, `surface`, `success`, `error`, `accent`, `muted` |
| Type sizes | 3 | `text-df-sm`, `text-df-base`, `text-df-lg` |
| Spacing | 9 | 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 px |
| Radii | 5 | `rounded-none`, `sm`, `DEFAULT`, `lg`, `full` |
| Shadows | 3 | `shadow-df-sm`, `md`, `lg` |
| Springs | 2 | `relaxed`, `snappy` |

Every Tailwind class is validated against this list. Off-brand values are rejected at the source.

---

## 50+ Component Library (UCUs)

UCU = Universal Component Unit. Every UCU ships with:

- A JSON spec (props, deps, motion, quality score)
- A `.tsx` template
- Constitution-validated classes
- Production-readiness tests

```bash
npx numb list                    # browse all UCUs
npx numb show <id>               # show spec
npx numb add <id>                # copy template to your project
npx numb validate                # check your code passes the constitution
```

---

## Commands

| Command | Description |
|---------|-------------|
| `npx create-numb-app <name>` | Scaffold a new token-locked project |
| `npx numb create` | Interactive wizard (project type, design style, features) |
| `npx numb init` | Quick setup with defaults |
| `npx numb list` | Browse the resource catalog |
| `npx numb list` | Browse all UCU components |
| `npx numb show <id>` | Show one UCU's spec |
| `npx numb add <id>` | Copy a UCU template into your project |
| `npx numb validate` | Check your project passes the constitution |
| `npx numb constitution` | Print the full token constitution |
| `npx numb --version` | Show version |
| `npx numb --help` | Show help |

---

## Programmatic API

```js
const numb = require('numb-design');

// Validate a className against the constitution
const result = numb.validator.validateClassString('flex p-6 bg-primary text-neutral-900 rounded-lg');
// → { valid: true, violations: [] }

// List all UCUs
const ucus = numb.ucu.listByCategory();
// → { PRIMITIVES: [...], LAYOUT: [...], ... }

// Load a UCU spec
const button = numb.ucu.loadUcu('button');
// → { id: 'button', name: 'Button', category: 'PRIMITIVES', props: {...} }
```

---

## Development

```bash
git clone https://github.com/numbdesign/numb-design.git
cd numb-design/packages/numb-design

# Test locally
node bin/cli.js --help

# Run all tests (46 constitution + 103 UCU + 376 production-readiness)
npm test

# Run a single suite
npm run test:constitution
npm run test:ucu
npm run test:ucu:prod
```

---

## Links

- **GitHub**: [https://github.com/numbdesign/numb-design](https://github.com/numbdesign/numb-design)
- **npm**: [https://www.npmjs.com/package/numb-design](https://www.npmjs.com/package/numb-design)

---

## License

MIT
