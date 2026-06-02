#!/usr/bin/env node
/**
 * create-numb-app.js — The "One Command" Scaffolder
 *
 * Usage: npx create-numb-app <project-name>
 *        npx create-numb-app my-app
 *        npx create-numb-app ./existing-dir
 *
 * Creates a new Next.js + TypeScript + Tailwind project pre-configured
 * with the Numb.Design token constitution. After scaffolding:
 *
 *   cd <project-name>
 *   npm install
 *   npm run dev
 *
 * The scaffolded project includes:
 *   - clt.config.ts      (Design DNA — single source of truth)
 *   - AGENTS.md          (AI agent rules — read by Cursor, Claude Code, etc.)
 *   - tailwind.config.ts (Tailwind preset that reads from clt.config.ts)
 *   - src/lib/clt.ts     (Token helpers)
 *   - package.json       (with all required deps pre-listed)
 *   - .gitignore
 *   - README.md
 *
 * Exit codes:
 *   0 — success
 *   1 — invalid usage (no name, bad name)
 *   2 — directory already exists (without --force)
 *   3 — filesystem error
 */

'use strict'

const fs = require('fs')
const path = require('path')

// ============================================================================
// ARGS
// ============================================================================
const args = process.argv.slice(2)
let projectName = null
let force = false
let noInstall = false
let verbose = false

for (let i = 0; i < args.length; i++) {
  const a = args[i]
  if (a === '--force' || a === '-f') force = true
  else if (a === '--no-install') noInstall = true
  else if (a === '--verbose' || a === '-v') verbose = true
  else if (a === '--help' || a === '-h') {
    printHelp()
    process.exit(0)
  } else if (!a.startsWith('-') && !projectName) {
    projectName = a
  }
}

if (!projectName) {
  console.error('\u2716  Missing project name.')
  console.error('   Usage: npx create-numb-app <project-name>')
  console.error('   Run `npx create-numb-app --help` for full options.')
  process.exit(1)
}

const NAME_RE = /^[a-z0-9][a-z0-9-_]*$/
if (!NAME_RE.test(projectName)) {
  console.error(`\u2716  Invalid project name "${projectName}".`)
  console.error('   Use lowercase letters, numbers, hyphens, underscores.')
  console.error('   Must start with a letter or number.')
  process.exit(1)
}

const projectDir = path.resolve(process.cwd(), projectName)

if (fs.existsSync(projectDir)) {
  if (!force) {
    console.error(`\u2716  Directory "${projectName}" already exists.`)
    console.error('   Use --force to overwrite (existing files will be preserved).')
    process.exit(2)
  }
  console.log(`\u26A0  Directory exists; overwriting template files (preserving any other content).`)
}

// ============================================================================
// TEMPLATES
// ============================================================================
const TEMPLATES_DIR = path.join(__dirname, '..', 'templates')

function readTemplate(filename) {
  const p = path.join(TEMPLATES_DIR, filename)
  if (!fs.existsSync(p)) {
    throw new Error(`Missing template file: ${p}`)
  }
  return fs.readFileSync(p, 'utf8')
}

function renderTemplate(content, vars) {
  return content.replace(/\{\{(\w+)\}\}/g, (_, key) => {
    if (!(key in vars)) throw new Error(`Template variable {{${key}}} not provided`)
    return vars[key]
  })
}

const vars = {
  PROJECT_NAME: projectName,
  PACKAGE_NAME: projectName,
}

// ============================================================================
// FILES TO GENERATE
// ============================================================================
const FILES = {
  'clt.config.ts': {
    src: 'clt.config.ts',
    render: true,
  },
  'AGENTS.md': {
    src: 'AGENTS.md',
    render: true,
  },
  'package.json': {
    generate: () => generatePackageJson(projectName),
  },
  'tailwind.config.ts': {
    generate: () => generateTailwindConfig(),
  },
  'tsconfig.json': {
    generate: () => generateTsConfig(),
  },
  'next.config.mjs': {
    generate: () => generateNextConfig(),
  },
  'postcss.config.mjs': {
    generate: () => generatePostcssConfig(),
  },
  '.gitignore': {
    generate: () => generateGitignore(),
  },
  'README.md': {
    generate: () => generateReadme(projectName),
  },
  'src/lib/clt.ts': {
    generate: () => generateCltHelper(),
  },
  'src/app/globals.css': {
    generate: () => generateGlobalsCss(),
  },
  'src/app/layout.tsx': {
    generate: () => generateLayout(),
  },
  'src/app/page.tsx': {
    generate: () => generateHomePage(projectName),
  },
}

// ============================================================================
// GENERATORS
// ============================================================================
function generatePackageJson(name) {
  return JSON.stringify({
    name,
    version: '0.1.0',
    private: true,
    scripts: {
      dev: 'next dev',
      build: 'next build',
      start: 'next start',
      lint: 'next lint',
      'clt:validate': 'npx numb validate',
      'clt:list': 'npx numb list',
    },
    dependencies: {
      next: '^14.2.0',
      react: '^18.3.0',
      'react-dom': '^18.3.0',
      clsx: '^2.1.0',
      'tailwind-merge': '^2.3.0',
      'lucide-react': '^0.400.0',
      'framer-motion': '^11.3.0',
      'numb-design': '*',
    },
    devDependencies: {
      typescript: '^5.5.0',
      '@types/node': '^20.14.0',
      '@types/react': '^18.3.0',
      '@types/react-dom': '^18.3.0',
      tailwindcss: '^3.4.0',
      autoprefixer: '^10.4.0',
      postcss: '^8.4.0',
    },
  }, null, 2) + '\n'
}

function generateTailwindConfig() {
  return `import type { Config } from 'tailwindcss'
import { cltConfig } from './clt.config'

const config: Config = {
  content: [
    './src/**/*.{ts,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary:   { DEFAULT: cltConfig.colors.primary,   foreground: '#FFFFFF' },
        secondary: { DEFAULT: cltConfig.colors.secondary, foreground: '#FFFFFF' },
        neutral: {
          100: cltConfig.colors.neutral100,
          300: cltConfig.colors.neutral300,
          500: cltConfig.colors.neutral500,
          900: cltConfig.colors.neutral900,
        },
        bg:      { DEFAULT: cltConfig.colors.bg,      foreground: cltConfig.colors.neutral900 },
        surface: { DEFAULT: cltConfig.colors.surface, foreground: cltConfig.colors.neutral900 },
        success: { DEFAULT: cltConfig.colors.success, foreground: '#FFFFFF' },
        error:   { DEFAULT: cltConfig.colors.error,   foreground: '#FFFFFF' },
        accent:  { DEFAULT: cltConfig.colors.accent,  foreground: cltConfig.colors.neutral900 },
        muted:   { DEFAULT: cltConfig.colors.muted,   foreground: cltConfig.colors.neutral500 },
      },
      fontSize: {
        'df-sm':   ['clamp(0.875rem, 0.8rem + 0.4vw, 1rem)', { lineHeight: '1.5' }],
        'df-base': ['clamp(1rem, 0.9rem + 0.5vw, 1.25rem)',  { lineHeight: '1.6' }],
        'df-lg':   ['clamp(1.5rem, 1.2rem + 1.5vw, 3rem)',   { lineHeight: '1.2' }],
      },
      borderRadius: {
        sm: '4px',
        DEFAULT: '8px',
        lg: '16px',
      },
      boxShadow: {
        'df-sm': \`\${cltConfig.shadow.sm}\`,
        'df-md': \`\${cltConfig.shadow.md}\`,
        'df-lg': \`\${cltConfig.shadow.lg}\`,
      },
      fontFamily: {
        sans: [cltConfig.typography.fontFamily],
      },
    },
  },
  plugins: [],
}

export default config
`
}

function generateTsConfig() {
  return JSON.stringify({
    compilerOptions: {
      target: 'ES2020',
      lib: ['dom', 'dom.iterable', 'esnext'],
      allowJs: true,
      skipLibCheck: true,
      strict: true,
      noEmit: true,
      esModuleInterop: true,
      module: 'esnext',
      moduleResolution: 'bundler',
      resolveJsonModule: true,
      isolatedModules: true,
      jsx: 'preserve',
      incremental: true,
      plugins: [{ name: 'next' }],
      paths: { '@/*': ['./src/*'] },
    },
    include: ['next-env.d.ts', '**/*.ts', '**/*.tsx', '.next/types/**/*.ts'],
    exclude: ['node_modules'],
  }, null, 2) + '\n'
}

function generateNextConfig() {
  return `/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

export default nextConfig
`
}

function generatePostcssConfig() {
  return `export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
`
}

function generateGitignore() {
  return `node_modules
.next
out
dist
.env*.local
.DS_Store
*.log
.vscode
.idea
`
}

function generateReadme(name) {
  return `# ${name}

A token-locked Next.js app built with the **Numb.Design** constitution.

## Quick start

\`\`\`bash
npm install
npm run dev
\`\`\`

Visit http://localhost:3000.

## Design system

- **Design DNA:** \`clt.config.ts\` — change any value to rebrand instantly.
- **AI rules:** \`AGENTS.md\` — read by Cursor / Claude Code / Copilot at session start.
- **Token helpers:** \`src/lib/clt.ts\`

## Commands

\`\`\`bash
npx numb list            # see all available UCUs
npx numb add <id>        # add a UCU to your project
npx numb validate        # check your code passes the constitution
npx numb show <id>       # see a UCU's spec
\`\`\`

## Adding a component

\`\`\`bash
npx numb add button      # adds a Button UCU to src/components/ui/
npx numb add card
npx numb add modal
\`\`\`

## Learn more

- [Numb.Design Docs](https://github.com/numbdesign/numb-design)
`
}

function generateCltHelper() {
  return `/**
 * clt.ts — Token helpers for use in components.
 *
 * Use \`cn()\` for conditional className composition (clsx + tailwind-merge).
 * Use \`tokens\` to reference design tokens at runtime (3D, charts, etc.).
 */
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { cltConfig } from '../../clt.config'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const tokens = {
  colors: cltConfig.colors,
  spring: cltConfig.motion,
  shadow: cltConfig.shadow,
}

export default cn
`
}


function generateGlobalsCss() {
  return `@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --df-primary: ${cltConfigPlaceholder('primary')};
  --df-secondary: ${cltConfigPlaceholder('secondary')};
  --df-bg: ${cltConfigPlaceholder('bg')};
  --df-surface: ${cltConfigPlaceholder('surface')};
  --df-success: ${cltConfigPlaceholder('success')};
  --df-error: ${cltConfigPlaceholder('error')};
  --df-accent: ${cltConfigPlaceholder('accent')};
  --df-neutral-100: ${cltConfigPlaceholder('neutral100')};
  --df-neutral-300: ${cltConfigPlaceholder('neutral300')};
  --df-neutral-500: ${cltConfigPlaceholder('neutral500')};
  --df-neutral-900: ${cltConfigPlaceholder('neutral900')};
  --df-muted: ${cltConfigPlaceholder('muted')};
}

html, body {
  background: var(--df-bg);
  color: var(--df-neutral-900);
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
}
`
}

// The globals.css uses raw hex from clt.config so the scaffold works
// before the user runs `npm install` (no TS compilation step for CSS).
function cltConfigPlaceholder(key) {
  // Defer to default constitution values; user overrides clt.config.ts after install
  const defaults = {
    primary: '#3B82F6', secondary: '#8B5CF6', bg: '#FFFFFF', surface: '#FFFFFF',
    success: '#10B981', error: '#EF4444', accent: '#F59E0B',
    neutral100: '#F4F4F5', neutral300: '#D4D4D8', neutral500: '#71717A', neutral900: '#18181B',
    muted: '#F4F4F5',
  }
  return defaults[key]
}

function generateLayout() {
  return `import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '${projectName}',
  description: 'Built with the Numb.Design constitution',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-bg text-neutral-900 text-df-base">
        {children}
      </body>
    </html>
  )
}
`
}

function generateHomePage(name) {
  return `import { cn } from '@/lib/clt'

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-2xl text-center">
        <p className="text-df-sm text-neutral-500 mb-4">Welcome to</p>
        <h1 className="text-df-lg font-bold tracking-tight mb-6">
          ${name}
        </h1>
        <p className="text-df-base text-neutral-500 mb-8">
          This project is built with the <strong>Numb.Design constitution</strong>:
          12 colors, 3 type sizes, 9 spacing values, 5 radii, 3 shadows, 2 springs.
          Every change in <code className={cn('px-2 py-1 rounded-sm bg-muted text-neutral-900 text-df-sm')}>
            clt.config.ts
          </code> rebrands the entire app.
        </p>
        <div className="flex gap-4 justify-center">
          <a
            href="https://github.com/numbdesign/numb-design"
            className="inline-flex items-center justify-center h-10 px-4 rounded bg-primary text-surface font-medium hover:bg-primary/90 transition-colors"
          >
            Read the docs
          </a>
          <a
            href="./AGENTS.md"
            className="inline-flex items-center justify-center h-10 px-4 rounded border border-neutral-300 text-neutral-900 font-medium hover:bg-neutral-100 transition-colors"
          >
            AGENTS.md
          </a>
        </div>
      </div>
    </main>
  )
}
`
}

// ============================================================================
// SCAFFOLD
// ============================================================================
function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true })
}

function writeFile(rel, content) {
  const abs = path.join(projectDir, rel)
  ensureDir(path.dirname(abs))
  fs.writeFileSync(abs, content, 'utf8')
  if (verbose) console.log(`  + ${rel}`)
}

function printHelp() {
  console.log(`create-numb-app — Scaffold a token-locked Next.js + Numb.Design system project.

Usage: npx create-numb-app <project-name> [options]

Options:
  --force, -f       Overwrite existing template files in the target directory
  --no-install      Don't run npm install (default: only prints the command)
  --verbose, -v     Print every file written
  --help, -h        Show this help

Examples:
  npx create-numb-app my-app
  npx create-numb-app my-app --force
  npx create-numb-app ./projects/dashboard
`)
}

function printBanner() {
  console.log('')
  console.log('  \u256D\u2500 Numb.Design Constitution \u2500\u256E')
  console.log('  Scaffolding: ' + projectName)
  console.log('  \u2570\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500')
  console.log('')
}

function printSuccess() {
  console.log('')
  console.log('  \u2713 Project scaffolded successfully!')
  console.log('')
  console.log('  Next steps:')
  console.log('')
  console.log('    cd ' + projectName)
  if (!noInstall) {
    console.log('    npm install')
    console.log('    npm run dev')
  } else {
    console.log('    npm install     # install dependencies')
    console.log('    npm run dev     # start dev server')
  }
  console.log('')
  console.log('  Then visit http://localhost:3000')
  console.log('')
  console.log('  Add a component:')
  console.log('    npx numb add button')
  console.log('    npx numb add card')
  console.log('    npx numb add modal')
  console.log('')
  console.log('  See all UCUs:')
  console.log('    npx numb list')
  console.log('')
}

function main() {
  printBanner()
  try {
    ensureDir(projectDir)
    for (const [rel, def] of Object.entries(FILES)) {
      let content
      if (def.src) {
        content = readTemplate(def.src)
        if (def.render) content = renderTemplate(content, vars)
      } else if (def.generate) {
        content = def.generate()
      }
      writeFile(rel, content)
    }
    printSuccess()
    process.exit(0)
  } catch (err) {
    console.error('\u2716  Scaffold failed: ' + err.message)
    if (verbose) console.error(err.stack)
    process.exit(3)
  }
}

main()
