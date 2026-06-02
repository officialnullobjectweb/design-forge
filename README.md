# Numb.Design — AI-Powered Frontend Builder

Tell your AI agent what to build. Numb.Design installs only the packages you need — nothing extra. Premium frontends in 5 minutes from 100% free resources.

## Core Philosophy

- **Zero bloat** — Install only what the project actually needs
- **100% free** — Every resource listed is free and open-source
- **AI-native** — Your AI agent browses, picks, and installs. You just describe the output

## Quick Start

```bash
npx numb-design init
```

Or use the interactive setup wizard:

```bash
bash <(curl -fsSL https://numb.design/cli/setup.sh)
```

The wizard asks what you're building, your style preferences, and what features you need — then generates a plan with exact install commands.

## Features

### AI-Powered Selection
Your AI agent analyzes your requirements and selects exactly the right packages. No more guessing, no more bloat — only what you need.

### Zero Bloat Guarantee
Only the packages you need are installed. Change your mind? Unused packages are automatically removed. Your workspace stays clean.

### 5-Minute Frontends
Describe your vision once. The AI handles package selection, installation, and setup. A stunning frontend in minutes, not hours.

## How It Works

1. **Tell your AI agent what you need** — "Build me a premium landing page."
2. **Numb.Design picks the packages** — The CLI scans the requirement and installs only what's needed. shadcn/ui for components? Framer Motion for animations? Geist for fonts? Done.
3. **Instant, clean frontend** — A fully working frontend from free, open-source packages. Run cleanup to remove old packages — your space stays pristine.

## CLI Commands

```bash
# Initialize a new project
npx numb-design init

# Add packages
npx numb-design add shadcn-ui lucide framer-motion

# Generate from template
npx numb-design template landing-page

# Search available packages
npx numb-design search buttons
```

## Project Structure

```
numb-design/
├── src/
│   ├── app/              # Next.js app router pages
│   ├── components/       # React components
│   ├── data/             # Resource definitions & metadata
│   └── lib/              # Utility functions
├── cli/
│   └── setup.sh          # Interactive bootstrap wizard
├── packages/
│   └── numb-design/      # npm CLI package source
└── public/               # Static assets
```

## Resources

Every package is hand-curated across categories: UI components, icons, animations, 3D, charts, forms, auth, email, payments, fonts, and more.

## License

MIT
