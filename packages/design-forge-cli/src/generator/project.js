const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

class ProjectGenerator {
  constructor(blueprint, targetDir) {
    this.blueprint = blueprint
    this.targetDir = targetDir
    this.srcDir = path.join(targetDir, 'src')
    this.appDir = path.join(this.srcDir, 'app')
    this.componentsDir = path.join(this.srcDir, 'components')
    this.libDir = path.join(this.srcDir, 'lib')
  }

  async generate() {
    this.log('Creating project structure...')
    this.createDirectories()

    this.log('Writing base configuration...')
    this.writePackageJson()
    this.writeTsConfig()
    this.writeNextConfig()
    this.writePostcssConfig()
    this.writeGlobalCss()
    this.writeUtilsLib()
    this.writeSiteConfig()

    this.log('Writing design tokens...')
    this.writeDesignTokens()

    this.log('Writing layout...')
    this.writeRootLayout()
    this.writeRobots()
    this.writeSitemap()
    this.writeManifest()

    this.log('Writing page components...')
    this.writePages()

    this.log('Writing section components...')
    this.writeSections()

    this.log('Writing utility components...')
    this.writeUtilityComponents()

    this.log('Installing dependencies...')
    await this.installDependencies()

    this.log('Done!', 'success')
  }

  createDirectories() {
    const dirs = [
      this.targetDir,
      this.srcDir,
      this.appDir,
      this.componentsDir,
      this.componentsDir + '/ui',
      this.componentsDir + '/sections',
      this.componentsDir + '/layout',
      this.libDir,
      path.join(this.targetDir, 'public'),
    ]
    dirs.forEach(d => {
      if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true })
    })
  }

  writePackageJson() {
    const deps = {
      'next': '^16.2.6',
      'react': '^19.2.4',
      'react-dom': '^19.2.4',
      'lucide-react': '^0.400.0',
      'clsx': '^2.1.0',
      'tailwind-merge': '^2.5.0',
      'class-variance-authority': '^0.7.0',
    }
    const devDeps = {
      'typescript': '^5.5.0',
      '@types/node': '^20.0.0',
      '@types/react': '^19.0.0',
      '@types/react-dom': '^19.0.0',
      'tailwindcss': '^4.0.0',
      '@tailwindcss/postcss': '^4.0.0',
      'postcss': '^8.4.0',
      'eslint': '^9.0.0',
      '@eslint/eslintrc': '^3.0.0',
    }

    // Add blueprint packages
    this.blueprint.packages.forEach(pkg => {
      const pkgMap = {
        'framer-motion': { p: 'motion', v: '^12.0.0' },
        'motion': { p: 'motion', v: '^12.0.0' },
        'lucide-react': { p: 'lucide-react', v: '^0.400.0' },
        'recharts': { p: 'recharts', v: '^2.12.0' },
        'react-hook-form': { p: 'react-hook-form', v: '^7.53.0' },
        'zod': { p: 'zod', v: '^3.23.0' },
        '@hookform/resolvers': { p: '@hookform/resolvers', v: '^3.9.0' },
        'next-auth': { p: 'next-auth', v: '^4.24.0' },
        'stripe': { p: 'stripe', v: '^17.0.0' },
        '@stripe/stripe-js': { p: '@stripe/stripe-js', v: '^5.0.0' },
        'zustand': { p: 'zustand', v: '^5.0.0' },
        'next-themes': { p: 'next-themes', v: '^0.4.0' },
        'three': { p: 'three', v: '^0.170.0' },
        '@react-three/fiber': { p: '@react-three/fiber', v: '^8.17.0' },
        '@react-three/drei': { p: '@react-three/drei', v: '^9.114.0' },
        'next-mdx-remote': { p: 'next-mdx-remote', v: '^5.0.0' },
        '@react-email/components': { p: '@react-email/components', v: '^0.0.19' },
        'resend': { p: 'resend', v: '^4.0.0' },
        'react-dropzone': { p: 'react-dropzone', v: '^14.2.0' },
        '@orama/orama': { p: '@orama/orama', v: '^3.0.0' },
        'next-intl': { p: 'next-intl', v: '^3.15.0' },
      }

      // Handle compound deps
      if (pkg === 'clsx-tailwind-merge') return // already included
      if (pkg === 'stripe') {
        deps['stripe'] = '^17.0.0'
        deps['@stripe/stripe-js'] = '^5.0.0'
        return
      }
      if (pkgMap[pkg]) {
        deps[pkgMap[pkg].p] = pkgMap[pkg].v
      }
    })

    // Add next-themes if dark/light theme is configured
    if (this.blueprint.designTokens.mode === 'dark' || this.blueprint.designTokens.colors.background !== '#FFFFFF') {
      deps['next-themes'] = '^0.4.0'
    }

    const packageJson = {
      name: this.blueprint.projectName.replace(/\s+/g, '-').toLowerCase(),
      version: '1.0.0',
      private: true,
      scripts: {
        dev: 'next dev',
        build: 'next build',
        start: 'next start',
        lint: 'next lint',
        'type-check': 'tsc --noEmit',
      },
      dependencies: deps,
      devDependencies: devDeps,
    }

    fs.writeFileSync(path.join(this.targetDir, 'package.json'), JSON.stringify(packageJson, null, 2))
  }

  writeTsConfig() {
    const tsconfig = {
      compilerOptions: {
        target: 'ES2017',
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
    }
    fs.writeFileSync(path.join(this.targetDir, 'tsconfig.json'), JSON.stringify(tsconfig, null, 2))
  }

  writeNextConfig() {
    const config = `/** @type {import('next').NextConfig} */
const nextConfig = {}

export default nextConfig
`
    fs.writeFileSync(path.join(this.targetDir, 'next.config.ts'), config)
  }

  writePostcssConfig() {
    const config = `const config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}

export default config
`
    fs.writeFileSync(path.join(this.targetDir, 'postcss.config.mjs'), config)
  }

  writeGlobalCss() {
    const dt = this.blueprint.designTokens
    const isDark = dt.mode === 'dark'

    const css = `@import "tailwindcss";

@theme {
  --color-primary: ${dt.colors.primary};
  --color-primary-foreground: ${isDark ? '#FAFAFA' : '#FFFFFF'};
  --color-secondary: ${dt.colors.secondary};
  --color-secondary-foreground: ${isDark ? '#FAFAFA' : '#FFFFFF'};
  --color-accent: ${dt.colors.accent};
  --color-accent-foreground: ${isDark ? '#FAFAFA' : '#1F2937'};
  --color-background: ${dt.colors.background};
  --color-foreground: ${dt.colors.foreground};
  --color-muted: ${dt.colors.muted};
  --color-muted-foreground: ${dt.colors['muted-foreground']};
  --color-border: ${dt.colors.border};
  --color-ring: ${dt.colors.ring};
  --color-card: ${isDark ? '#18181B' : '#FFFFFF'};
  --color-card-foreground: ${dt.colors.foreground};

  --radius-sm: 0.375rem;
  --radius-md: ${dt.borderRadius};
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;

  --font-sans: ${dt.typography.fontFamily};
  --font-heading: ${dt.typography.headingFont};

  --animate-fade-in: fade-in 0.5s ease-out;
  --animate-slide-up: slide-up 0.5s ease-out;

  @keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes slide-up {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
}

@layer base {
  *, *::before, *::after {
    border-color: var(--color-border);
  }

  body {
    background-color: var(--color-background);
    color: var(--color-foreground);
    font-family: var(--font-sans);
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-heading);
    font-weight: 700;
    line-height: 1.2;
  }

  h1 { font-size: ${dt.typography.scale.h1}; }
  h2 { font-size: ${dt.typography.scale.h2}; }
  h3 { font-size: ${dt.typography.scale.h3}; }
  h4 { font-size: ${dt.typography.scale.h4}; }

  ::selection {
    background-color: var(--color-primary);
    color: var(--color-primary-foreground);
  }
}

@layer components {
  .container-main {
    max-width: ${dt.spacing.container};
    margin-left: auto;
    margin-right: auto;
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .section-padding {
    padding-top: ${dt.spacing.section};
    padding-bottom: ${dt.spacing.section};
  }

  .glass-panel {
    background: ${isDark ? 'rgba(24, 24, 27, 0.8)' : 'rgba(255, 255, 255, 0.8)'};
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid var(--color-border);
  }

  .gradient-text {
    background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
}

@layer utilities {
  .animate-in {
    animation: fade-in 0.5s ease-out, slide-up 0.5s ease-out;
  }
}
`
    fs.writeFileSync(path.join(this.appDir, 'globals.css'), css)
  }

  writeUtilsLib() {
    const utils = `import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
`
    fs.writeFileSync(path.join(this.libDir, 'utils.ts'), utils)
  }

  writeSiteConfig() {
    const bp = this.blueprint
    const dt = bp.designTokens
    const colors = dt.colors

    const config = `// ─── DesignForge Site Configuration ──────────────────────────────
// Edit this file to customize your entire site.
// Changes are automatically reflected everywhere.

export const siteConfig = {
  // ── Brand ──
  name: '${bp.projectName}',
  description: '${(bp.project.description || '').replace(/'/g, "\\'")}',
  url: 'https://your-domain.com',

  // ── Navigation ──
  mainNav: [
    ${bp.routes.filter(r => r.type !== 'auth' && r.type !== 'protected' && r.path !== '/404').map(r =>
      `{ title: '${r.label}', href: '${r.path}' }`
    ).join(',\n    ')}
  ],

  // ── Theme (60-30-10 rule) ──
  theme: {
    colors: {
      primary: '${colors.primary}',
      secondary: '${colors.secondary}',
      accent: '${colors.accent}',
      background: '${colors.background}',
      foreground: '${colors.foreground}',
      muted: '${colors.muted}',
      mutedForeground: '${colors['muted-foreground']}',
      border: '${colors.border}',
    },
    mode: '${dt.mode}' as const,
    borderRadius: '${dt.borderRadius}',
    fontFamily: '${dt.typography.fontFamily}',
    headingFont: '${dt.typography.headingFont}',
  },

  // ── Sections Content ──
  // Edit the content for each section below
  sections: {
    hero: {
      title: 'Build Something Amazing',
      subtitle: 'A modern, production-ready site built with DesignForge.',
      cta: { text: 'Get Started', href: '#' },
      secondaryCta: { text: 'Learn More', href: '#' },
    },
    features: {
      title: 'Everything You Need',
      subtitle: 'Powered by 100+ curated free resources.',
      items: [
        { title: 'Zero Bloat', description: 'Only install what you actually need.', icon: 'Zap' },
        { title: '100% Free', description: 'All resources are open-source and free.', icon: 'Gem' },
        { title: 'TypeScript Strict', description: 'Full type safety with zero errors.', icon: 'Shield' },
        { title: 'Production Ready', description: 'Optimized for Core Web Vitals.', icon: 'Rocket' },
      ],
    },
    pricing: {
      title: 'Simple Pricing',
      subtitle: 'Choose the plan that fits your needs.',
      tiers: [
        { name: 'Free', price: '$0', description: 'Get started with basic features.', features: ['Feature 1', 'Feature 2', 'Feature 3'], cta: 'Get Started' },
        { name: 'Pro', price: '$29', description: 'Best for growing teams.', features: ['All Free features', 'Feature 4', 'Feature 5', 'Feature 6'], cta: 'Get Pro', popular: true },
        { name: 'Enterprise', price: '$99', description: 'For large organizations.', features: ['All Pro features', 'Feature 7', 'Feature 8'], cta: 'Contact Us' },
      ],
    },
    testimonials: {
      title: 'Loved by Users',
      items: [
        { name: 'Jane Doe', role: 'Founder, Acme Inc.', content: 'This is incredible. Built our entire landing page in minutes.', avatar: '' },
        { name: 'John Smith', role: 'Developer', content: 'The zero-bloat approach is genius. Only what we need, nothing more.', avatar: '' },
      ],
    },
    footer: {
      description: 'Built with DesignForge. All rights reserved.',
      links: [
        { title: 'Product', items: [{ label: 'Features', href: '#' }, { label: 'Pricing', href: '#' }, { label: 'FAQ', href: '#' }] },
        { title: 'Company', items: [{ label: 'About', href: '#' }, { label: 'Blog', href: '#' }, { label: 'Contact', href: '#' }] },
        { title: 'Legal', items: [{ label: 'Privacy', href: '#' }, { label: 'Terms', href: '#' }] },
      ],
    },
  } satisfies Record<string, any>,

  // ── Social Links ──
  social: {
    github: 'https://github.com',
    twitter: 'https://twitter.com',
  },

  // ── SEO ──
  seo: {
    ogImage: '/og.png',
    twitterHandle: '@yourhandle',
  },
}

export type SiteConfig = typeof siteConfig
`
    fs.writeFileSync(path.join(this.srcDir, 'site.config.ts'), config)
  }

  writeDesignTokens() {
    const dt = this.blueprint.designTokens
    const content = `/* DesignForge Design Tokens */
/* Auto-generated. Edit site.config.ts to customize. */

:root {
  --df-primary: ${dt.colors.primary};
  --df-primary-foreground: ${dt.mode === 'dark' ? '#FAFAFA' : '#FFFFFF'};
  --df-secondary: ${dt.colors.secondary};
  --df-accent: ${dt.colors.accent};
  --df-background: ${dt.colors.background};
  --df-foreground: ${dt.colors.foreground};
  --df-muted: ${dt.colors.muted};
  --df-muted-foreground: ${dt.colors['muted-foreground']};
  --df-border: ${dt.colors.border};
  --df-ring: ${dt.colors.ring};
  --df-radius: ${dt.borderRadius};
  --df-font-sans: ${dt.typography.fontFamily};
  --df-font-heading: ${dt.typography.headingFont};
  --df-container: ${dt.spacing.container};
  --df-section-padding: ${dt.spacing.section};
}
`
    fs.writeFileSync(path.join(this.targetDir, 'design-tokens.css'), content)
  }

  writeRootLayout() {
    const hasDarkMode = this.blueprint.packages.includes('next-themes')
    const isDark = this.blueprint.designTokens.mode === 'dark'
    const siteName = this.blueprint.projectName

    const layout = `import type { Metadata } from 'next'
import './globals.css'
${hasDarkMode ? "import { ThemeProvider } from '@/components/theme-provider'" : ''}

export const metadata: Metadata = {
  title: {
    default: '${siteName}',
    template: '%s | ${siteName}',
  },
  description: '${(this.blueprint.project.description || '').replace(/'/g, "\\'")}',
  openGraph: {
    title: '${siteName}',
    description: '${(this.blueprint.project.description || '').replace(/'/g, "\\'")}',
    siteName: '${siteName}',
    type: 'website',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en"${hasDarkMode ? " suppressHydrationWarning" : isDark ? ' class="dark"' : ''}>
      ${hasDarkMode ? `
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="${isDark ? 'dark' : 'system'}"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>` : `
      <body>${isDark ? '\n        <div className="dark">{children}</div>' : '\n        {children}'}
      </body>`}
    </html>
  )
}
`
    fs.writeFileSync(path.join(this.appDir, 'layout.tsx'), layout)

    // Write theme provider
    if (hasDarkMode) {
      const tp = `'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import type { ThemeProviderProps } from 'next-themes'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
`
      fs.writeFileSync(path.join(this.componentsDir, 'theme-provider.tsx'), tp)
    }
  }

  writeRobots() {
    const content = `import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://your-domain.com/sitemap.xml',
  }
}
`
    fs.writeFileSync(path.join(this.appDir, 'robots.ts'), content)
  }

  writeSitemap() {
    const routes = this.blueprint.routes.filter(r => r.path !== '/404')
    const content = `import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ${routes.map(r => `{
      url: 'https://your-domain.com${r.path}',
      lastModified: new Date(),
      changeFrequency: '${r.path === '/' || r.path === '/blog' ? 'weekly' : 'monthly'}',
      priority: ${r.path === '/' ? 1.0 : 0.8},
    }`).join(',\n    ')}
  ]
}
`
    fs.writeFileSync(path.join(this.appDir, 'sitemap.ts'), content)
  }

  writeManifest() {
    const content = `import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: '${this.blueprint.projectName}',
    short_name: '${this.blueprint.projectName}',
    description: '${(this.blueprint.project.description || '').replace(/'/g, "\\'")}',
    start_url: '/',
    display: 'standalone',
    background_color: '${this.blueprint.designTokens.colors.background}',
    theme_color: '${this.blueprint.designTokens.colors.primary}',
  }
}
`
    fs.writeFileSync(path.join(this.appDir, 'manifest.ts'), content)
  }

  writePages() {
    const routes = this.blueprint.routes
    const sectionIds = new Set(this.blueprint.sections.map(s => s.id))

    routes.forEach(route => {
      const parts = route.path.replace(/^\//, '').split('/')
      const pageDir = path.join(this.appDir, ...parts)

      if (!fs.existsSync(pageDir)) {
        fs.mkdirSync(pageDir, { recursive: true })
      }

      const pageContent = this.generatePageComponent(route, sectionIds)
      fs.writeFileSync(path.join(pageDir, 'page.tsx'), pageContent)
    })
  }

  generatePageComponent(route, sectionIds) {
    const pageSlug = route.label.replace(/\s+/g, '')
    const dt = this.blueprint.designTokens

    if (route.path === '/404') {
      return this.generateNotFoundPage()
    }

    if (route.path === '/login' || route.path === '/signup') {
      return this.generateAuthPage(route)
    }

    // Determine which sections to show on this page
    const relevantSections = this.getSectionsForRoute(route.path, sectionIds)

    if (relevantSections.length === 0) {
      return this.generateSimplePage(pageSlug, route)
    }

    const importStatements = []
    const useStatements = []

    relevantSections.forEach(([importName, componentName]) => {
      importStatements.push(`import { ${componentName} } from '@/components/sections/${componentName}'`)
      useStatements.push(`      <${componentName} />`)
    })

    return `import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
${importStatements.join('\n')}

export default function ${pageSlug}Page() {
  return (
    <>
      <Header />
      <main>
${useStatements.join('\n')}
        <Footer />
      </main>
    </>
  )
}
`
  }

  getSectionsForRoute(path, sectionIds) {
    const selected = this.blueprint.sections
    const sectionMap = {
      'hero': 'HeroSection',
      'features': 'FeaturesGrid',
      'pricing': 'PricingSection',
      'testimonials': 'TestimonialsSection',
      'faq': 'FAQSection',
      'cta': 'CTASection',
      'stats': 'StatsSection',
      'logo-cloud': 'LogoCloud',
      'waitlist': 'WaitlistSection',
      'team': 'TeamSection',
      'contact': 'ContactSection',
      'newsletter': 'NewsletterForm',
      'footer': 'FooterSection',
      'theme-toggle': 'ThemeToggle',
    }

    const routeSections = {
      '/': ['hero', 'features', 'stats', 'pricing', 'testimonials', 'faq', 'cta'],
      '/about': ['hero', 'stats', 'team', 'cta'],
      '/contact': ['contact'],
      '/blog': ['blog-list'],
      '/cart': ['cart'],
      '/checkout': ['checkout'],
      '/dashboard': ['sidebar', 'stats-cards', 'charts', 'data-table'],
      '/admin': ['sidebar', 'stats-cards', 'data-table', 'charts'],
      '/products': ['product-grid', 'product-card'],
    }

    const desiredIds = routeSections[path] || []

    return desiredIds
      .filter(id => sectionIds.has(id) && sectionMap[id])
      .map(id => [id, sectionMap[id]])
  }

  generateNotFoundPage() {
    return `import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center px-4">
      <h1 className="text-8xl font-bold text-primary">404</h1>
      <h2 className="mt-4 text-2xl font-semibold">Page Not Found</h2>
      <p className="mt-2 text-muted-foreground max-w-md">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
      >
        Go Home
      </Link>
    </div>
  )
}
`
  }

  generateSimplePage(pageSlug, route) {
    return `import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export default function ${pageSlug}Page() {
  return (
    <>
      <Header />
      <main className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold">${route.label}</h1>
          <p className="mt-4 text-muted-foreground">This page is ready for your content.</p>
        </div>
      </main>
      <Footer />
    </>
  )
}
`
  }

  generateAuthPage(route) {
    const isLogin = route.path === '/login'
    const title = isLogin ? 'Sign In' : 'Create Account'
    const subtitle = isLogin ? 'Welcome back' : 'Get started today'
    const actionLabel = isLogin ? 'Sign In' : 'Create Account'
    const altLabel = isLogin ? 'Don\'t have an account?' : 'Already have an account?'
    const altHref = isLogin ? '/signup' : '/login'
    const altLink = isLogin ? 'Sign up' : 'Sign in'
    const dt = this.blueprint.designTokens
    const isDark = dt.mode === 'dark'

    return `'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export default function ${isLogin ? 'Login' : 'SignUp'}Page() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // TODO: Implement ${isLogin ? 'login' : 'registration'}
    setTimeout(() => setIsLoading(false), 1000)
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">${title}</h1>
          <p className="mt-2 text-sm text-muted-foreground">${subtitle}</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                className="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                className="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="••••••••"
              />
            </div>
          </div>

          ${isLogin ? `
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" defaultChecked className="rounded border-border" />
              Remember me
            </label>
            <Link href="/forgot-password" className="text-sm text-primary hover:underline">
              Forgot password?
            </Link>
          </div>
          ` : ''}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-50 transition-all"
          >
            {isLoading ? 'Loading...' : '${actionLabel}'}
          </button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          ${altLabel}{' '}
          <Link href="${altHref}" className="text-primary hover:underline">
            ${altLink}
          </Link>
        </p>
      </div>
    </div>
  )
}
`
  }

  writeSections() {
    const sections = this.blueprint.sections
    sections.forEach(section => {
      const compName = this.sectionToComponent
        ? this.sectionToComponent(section.id)
        : section.label.replace(/\s+/g, '')
      const content = this.generateSectionComponent(section)
      fs.writeFileSync(path.join(this.componentsDir, 'sections', `${compName}.tsx`), content)
    })

    // Always write the Header and Footer layout components
    this.writeHeaderComponent()
    this.writeFooterComponent()
  }

  generateSectionComponent(section) {
    const dt = this.blueprint.designTokens
    const compName = this.sectionToComponent
      ? this.sectionToComponent(section.id)
      : section.label.replace(/\s+/g, '')

    const sectionTemplates = {
      hero: this.genHero(section, dt),
      features: this.genFeatures(section, dt),
      pricing: this.genPricing(section, dt),
      testimonials: this.genTestimonials(section, dt),
      faq: this.genFAQ(section, dt),
      cta: this.genCTA(section, dt),
      stats: this.genStats(section, dt),
      footer: null,
      header: null,
    }

    return sectionTemplates[section.id] || this.genGenericSection(section, dt, compName)
  }

  genHero(section, dt) {
    const isDark = dt.mode === 'dark'
    return `import Link from 'next/link'
import { siteConfig } from '@/site.config'

export function HeroSection() {
  const hero = siteConfig.sections.hero

  return (
    <section className="relative overflow-hidden section-padding">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      <div className="container-main relative">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            <span className="gradient-text">${dt.typography.scale.h1.startsWith('4') ? '{hero.title}' : '{hero.title}'}</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground sm:text-xl">
            {hero.subtitle}
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Link
              href={hero.cta.href}
              className="rounded-md bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-all"
            >
              {hero.cta.text}
            </Link>
            <Link
              href={hero.secondaryCta.href}
              className="rounded-md border border-border px-8 py-3 text-sm font-semibold hover:bg-muted transition-all"
            >
              {hero.secondaryCta.text}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
`
  }

  genFeatures(section, dt) {
    return `import { siteConfig } from '@/site.config'
import * as Icons from 'lucide-react'
import { cn } from '@/lib/utils'

const iconMap: Record<string, React.ElementType> = {
  Zap: Icons.Zap,
  Gem: Icons.Gem,
  Shield: Icons.Shield,
  Rocket: Icons.Rocket,
  Star: Icons.Star,
  Heart: Icons.Heart,
}

export function FeaturesGrid() {
  const features = siteConfig.sections.features

  return (
    <section className="section-padding">
      <div className="container-main">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{features.title}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{features.subtitle}</p>
        </div>
        <div className="mx-auto mt-16 grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.items.map((feature, index) => {
            const Icon = iconMap[feature.icon] || Icons.Box
            return (
              <div
                key={index}
                className="group rounded-xl border border-border bg-card p-6 transition-all hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
`
  }

  genPricing(section, dt) {
    return `import { siteConfig } from '@/site.config'
import { cn } from '@/lib/utils'

export function PricingSection() {
  const pricing = siteConfig.sections.pricing

  return (
    <section className="section-padding">
      <div className="container-main">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{pricing.title}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{pricing.subtitle}</p>
        </div>
        <div className="mx-auto mt-16 grid max-w-5xl gap-8 lg:grid-cols-3">
          {pricing.tiers.map((tier, index) => (
            <div
              key={index}
              className={cn(
                'relative rounded-xl border p-8 transition-all',
                tier.popular
                  ? 'border-primary shadow-lg scale-105'
                  : 'border-border hover:shadow-md'
              )}
            >
              {tier.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-medium text-primary-foreground">
                  Most Popular
                </span>
              )}
              <h3 className="text-xl font-semibold">{tier.name}</h3>
              <p className="mt-4">
                <span className="text-4xl font-bold">{tier.price}</span>
                <span className="text-sm text-muted-foreground">/month</span>
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{tier.description}</p>
              <ul className="mt-6 space-y-3">
                {tier.features.map((feature, fi) => (
                  <li key={fi} className="flex items-center gap-2 text-sm">
                    <svg className="h-4 w-4 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                className={cn(
                  'mt-8 w-full rounded-md px-4 py-2.5 text-sm font-medium transition-all',
                  tier.popular
                    ? 'bg-primary text-primary-foreground hover:opacity-90'
                    : 'border border-border hover:bg-muted'
                )}
              >
                {tier.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
`
  }

  genTestimonials(section, dt) {
    return `import { siteConfig } from '@/site.config'

export function TestimonialsSection() {
  const testimonials = siteConfig.sections.testimonials

  return (
    <section className="section-padding bg-muted/50">
      <div className="container-main">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{testimonials.title}</h2>
        </div>
        <div className="mx-auto mt-16 grid max-w-4xl gap-8 md:grid-cols-2">
          {testimonials.items.map((item, index) => (
            <div key={index} className="rounded-xl border border-border bg-card p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-lg font-semibold text-primary">
                  {item.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-muted-foreground">{item.role}</p>
                </div>
              </div>
              <p className="mt-4 text-muted-foreground">&ldquo;{item.content}&rdquo;</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
`
  }

  genFAQ(section, dt) {
    return `'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

const faqs = [
  { question: 'How does DesignForge work?', answer: 'DesignForge analyzes your requirements and selects only the packages you actually need — zero bloat guaranteed.' },
  { question: 'Is it really free?', answer: 'Yes. All 130+ resources in our catalog are 100% free and open-source.' },
  { question: 'Can I customize the generated site?', answer: 'Absolutely. Edit site.config.ts for content changes, or dive into any component file for deeper customization.' },
  { question: 'What framework does it use?', answer: 'Next.js 16 with TypeScript strict mode, Tailwind CSS v4, and your choice of component libraries.' },
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="section-padding">
      <div className="container-main">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Frequently Asked Questions</h2>
        </div>
        <div className="mx-auto mt-12 max-w-2xl space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="rounded-lg border border-border">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex w-full items-center justify-between px-6 py-4 text-left"
              >
                <span className="font-medium">{faq.question}</span>
                <ChevronDown className={cn('h-5 w-5 transition-transform', openIndex === index && 'rotate-180')} />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4 text-sm text-muted-foreground">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
`
  }

  genCTA(section, dt) {
    return `import Link from 'next/link'

export function CTASection() {
  return (
    <section className="section-padding">
      <div className="container-main">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-primary/80 px-8 py-16 text-center text-primary-foreground sm:px-16">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-20" />
          <div className="relative">
            <h2 className="text-3xl font-bold sm:text-4xl">Ready to Get Started?</h2>
            <p className="mx-auto mt-4 max-w-xl text-lg opacity-90">
              Build your production-ready frontend in minutes. No bloat, no hassle.
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <Link
                href="#"
                className="rounded-md bg-background px-8 py-3 text-sm font-semibold text-foreground hover:opacity-90 transition-all"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
`
  }

  genStats(section, dt) {
    return `import { siteConfig } from '@/site.config'

const stats = [
  { label: 'Resources', value: '130+' },
  { label: 'Templates', value: '123+' },
  { label: 'Install Size', value: 'Zero' },
  { label: 'Build Time', value: '<5min' },
]

export function StatsSection() {
  return (
    <section className="section-padding bg-muted/50">
      <div className="container-main">
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-4xl font-bold text-primary">{stat.value}</p>
              <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
`
  }

  genGenericSection(section, dt, compName) {
    return `import { siteConfig } from '@/site.config'

export function ${compName}() {
  return (
    <section className="section-padding">
      <div className="container-main">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">${section.label}</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            ${section.description}
          </p>
        </div>
      </div>
    </section>
  )
}
`
  }

  writeHeaderComponent() {
    const content = `'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { siteConfig } from '@/site.config'
import { cn } from '@/lib/utils'
import { ThemeToggle } from '@/components/sections/ThemeToggle'

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-lg">
      <div className="container-main flex h-16 items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          {siteConfig.name}
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {siteConfig.mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.title}
            </Link>
          ))}
          <ThemeToggle />
        </nav>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-border md:hidden">
          <div className="container-main py-4 space-y-3">
            {siteConfig.mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.title}
              </Link>
            ))}
            <div className="pt-2">
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
`
    fs.writeFileSync(path.join(this.componentsDir, 'layout', 'Header.tsx'), content)
  }

  writeFooterComponent() {
    const content = `import { siteConfig } from '@/site.config'

export function Footer() {
  const footer = siteConfig.sections.footer

  return (
    <footer className="border-t border-border">
      <div className="container-main py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <p className="text-lg font-bold">{siteConfig.name}</p>
            <p className="mt-2 text-sm text-muted-foreground">{footer.description}</p>
          </div>
          {footer.links.map((group) => (
            <div key={group.title}>
              <p className="font-semibold">{group.title}</p>
              <ul className="mt-4 space-y-2">
                {group.items.map((item) => (
                  <li key={item.label}>
                    <a href={item.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
`
    fs.writeFileSync(path.join(this.componentsDir, 'layout', 'Footer.tsx'), content)
  }

  writeUtilityComponents() {
    // Theme Toggle
    const hasDarkMode = this.blueprint.packages.includes('next-themes')

    if (hasDarkMode) {
      const content = `'use client'

import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return <div className="h-9 w-9" />

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="flex h-9 w-9 items-center justify-center rounded-md border border-border hover:bg-muted transition-all"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  )
}
`
      fs.writeFileSync(path.join(this.componentsDir, 'sections', 'ThemeToggle.tsx'), content)
    }
  }

  writeHomePage(sections) {
    const sectionComponents = sections.map(s => {
      const compName = this.sectionToComponent
        ? this.sectionToComponent(s.id)
        : s.label.replace(/\s+/g, '')
      return `import { ${compName} } from '@/components/sections/${compName}'`
    }).join('\n')

    const sectionUses = sections.map(s => {
      const compName = this.sectionToComponent
        ? this.sectionToComponent(s.id)
        : s.label.replace(/\s+/g, '')
      return `      <${compName} />`
    }).join('\n')

    const content = `import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
${sectionComponents}

export default function Home() {
  return (
    <>
      <Header />
      <main>
${sectionUses}
        <Footer />
      </main>
    </>
  )
}
`
    // Overwrite the default page.tsx
    fs.writeFileSync(path.join(this.appDir, 'page.tsx'), content)
  }

  async installDependencies() {
    const spinner = require('@clack/prompts').spinner
    const spin = spinner()
    spin.start('Installing dependencies...')

    try {
      execSync('npm install', { cwd: this.targetDir, stdio: 'pipe', timeout: 300000 })
      spin.stop('Dependencies installed')
    } catch (err) {
      spin.stop('Dependency installation had issues — you can run `npm install` manually')
    }
  }

  log(msg, type = 'info') {
    const pc = require('picocolors')
    const prefix = type === 'success' ? pc.green('✓') : type === 'warn' ? pc.yellow('⚠') : pc.cyan('→')
    console.log(`  ${prefix} ${msg}`)
  }
}

// Helper method (prototype-based for reference in other methods)
ProjectGenerator.prototype.sectionToComponent = function(sectionId) {
  const map = {
    'hero': 'HeroSection',
    'features': 'FeaturesGrid',
    'pricing': 'PricingSection',
    'testimonials': 'TestimonialsSection',
    'faq': 'FAQSection',
    'cta': 'CTASection',
    'stats': 'StatsSection',
    'logo-cloud': 'LogoCloud',
    'waitlist': 'WaitlistSection',
    'team': 'TeamSection',
    'contact': 'ContactSection',
    'newsletter': 'NewsletterForm',
    'sidebar': 'SidebarNav',
    'stats-cards': 'StatsCards',
    'charts': 'ChartsSection',
    'data-table': 'DataTable',
    'user-menu': 'UserMenu',
    'notifications': 'NotificationsPanel',
    'product-grid': 'ProductGrid',
    'product-card': 'ProductCard',
    'cart': 'CartSection',
    'checkout': 'CheckoutForm',
    'login-page': 'LoginPage',
    'signup-page': 'SignUpPage',
    'blog-list': 'BlogList',
    'blog-post': 'BlogPost',
    'projects-gallery': 'ProjectsGallery',
    'footer': 'FooterSection',
    'header': 'HeaderSection',
    'forms': 'FormBuilder',
    'search-modal': 'SearchModal',
    'image-gallery': 'ImageGallery',
    'theme-toggle': 'ThemeToggle',
  }
  return map[sectionId] || (sectionId.charAt(0).toUpperCase() + sectionId.slice(1).replace(/-./g, c => c.toUpperCase()))
}

module.exports = { ProjectGenerator }
