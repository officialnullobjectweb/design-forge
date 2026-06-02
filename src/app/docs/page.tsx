'use client';

import { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  Terminal, Package, BookOpen, Sparkles, Palette, ArrowRight,
  Copy, Check, ChevronRight, Code, Blocks, Puzzle,
  Zap, Globe, Layers, Share2, Hash, GitBranch,
  ExternalLink,
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const sections = [
  { id: 'overview', label: 'Overview', icon: BookOpen },
  { id: 'quickstart', label: 'Quick Start', icon: Zap },
  { id: 'cli', label: 'CLI Commands', icon: Terminal },
  { id: 'package', label: 'npm Package', icon: Package },
  { id: 'agents', label: 'Agent Skills', icon: Puzzle },
  { id: 'tokens', label: 'Design Tokens', icon: Palette },
  { id: 'resources', label: 'Resource Catalog', icon: Globe },
];

function CodeBlock({ code, lang = 'bash' }: { code: string; lang?: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="group relative my-4 overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50">
      <div className="flex items-center justify-between border-b border-zinc-200/60 px-4 py-2">
        <span className="text-[11px] font-medium uppercase tracking-wider text-zinc-400">{lang}</span>
        <button onClick={copy} className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-zinc-400 transition-colors hover:bg-zinc-200/50 hover:text-zinc-700">
          {copied ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-sm leading-relaxed"><code>{code}</code></pre>
    </div>
  );
}

function SectionCard({ title, desc, icon: Icon, href }: { title: string; desc: string; icon: any; href: string }) {
  return (
    <a href={href} className="group block rounded-2xl border border-zinc-100 bg-white p-5 shadow-sm transition-all hover:shadow-md hover:border-zinc-200 hover:-translate-y-0.5">
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="text-sm font-semibold text-zinc-900 group-hover:text-brand-600 transition-colors">{title}</h3>
      <p className="mt-1 text-xs leading-5 text-zinc-500">{desc}</p>
    </a>
  );
}

function FadeIn({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState('overview');
  const [mobileSidebar, setMobileSidebar] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: '-120px 0px -60% 0px', threshold: 0.1 },
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Header />
      <main className="flex-1 pt-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <div className="lg:grid lg:grid-cols-[240px_1fr] lg:gap-12">
            {/* Mobile sidebar toggle */}
            <button
              onClick={() => setMobileSidebar(!mobileSidebar)}
              className="lg:hidden mb-6 flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm font-medium text-zinc-700 shadow-sm"
            >
              <Hash className="h-4 w-4" />
              On this page
              <ChevronRight className={`h-4 w-4 ml-auto transition-transform ${mobileSidebar ? 'rotate-90' : ''}`} />
            </button>

            {/* Sidebar */}
            <aside className={`${mobileSidebar ? 'block' : 'hidden'} lg:block`}>
              <nav className="lg:sticky lg:top-28 space-y-1">
                {sections.map((s) => {
                  const Icon = s.icon;
                  const isActive = activeSection === s.id;
                  return (
                    <a
                      key={s.id}
                      href={`#${s.id}`}
                      onClick={() => { setMobileSidebar(false); setActiveSection(s.id); }}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                        isActive
                          ? 'bg-brand-50 text-brand-700'
                          : 'text-zinc-500 hover:bg-zinc-50 hover:text-zinc-800'
                      }`}
                    >
                      <Icon className={`h-4 w-4 ${isActive ? 'text-brand-500' : 'text-zinc-400'}`} />
                      {s.label}
                    </a>
                  );
                })}
              </nav>
            </aside>

            {/* Content */}
            <div className="min-w-0">
              {/* Hero */}
              <FadeIn>
                <div className="mb-12">
                  <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3.5 py-1 text-xs font-medium text-brand-700 ring-1 ring-brand-200/50 mb-4">
                    <BookOpen className="h-3 w-3" />
                    Documentation
                  </div>
                  <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
                    Everything{" "}
                    <span className="bg-gradient-to-r from-brand-500 to-brand-700 bg-clip-text text-transparent">
                      Numb.Design
                    </span>
                  </h1>
                  <p className="mt-3 text-base leading-7 text-zinc-500 max-w-2xl">
                    The AI-powered frontend builder. Bootstrap any project with zero bloat — 
                    install only the packages you actually need.
                  </p>
                </div>

                {/* Quick nav cards */}
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 mb-16">
                  <SectionCard title="CLI Commands" desc="Scaffold, install, search — all in one terminal tool." icon={Terminal} href="#cli" />
                  <SectionCard title="npm Package" desc="Use Numb.Design programmatically as a Node module." icon={Package} href="#package" />
                  <SectionCard title="Agent Skills" desc="Pre-built AI agent instructions for design work." icon={Puzzle} href="#agents" />
                  <SectionCard title="Quick Start" desc="Get a project running in 60 seconds." icon={Zap} href="#quickstart" />
                  <SectionCard title="Design Tokens" desc="CSS variables for consistent branding." icon={Palette} href="#tokens" />
                  <SectionCard title="Resource Catalog" desc="500+ free resources, all categorized." icon={Globe} href="#resources" />
                </div>
              </FadeIn>

              {/* Overview */}
              <section id="overview" className="mb-20 scroll-mt-28">
                <FadeIn>
                  <h2 className="text-2xl font-bold text-zinc-900 flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                      <BookOpen className="h-4 w-4" />
                    </span>
                    Overview
                  </h2>
                  <div className="mt-4 space-y-4 text-sm leading-6 text-zinc-600">
                    <p>
                      <strong className="text-zinc-900">Numb.Design</strong> is a complete frontend toolkit 
                      that helps you bootstrap projects faster — with zero bloat. It combines a curated 
                      catalog of free design resources with a CLI that installs only what your project needs.
                    </p>
                    <p>
                      Built for <strong className="text-zinc-900">developers, designers, and AI agents</strong>, 
                      Numb.Design eliminates the friction of discovering, evaluating, and installing the right 
                      frontend packages every time you start something new.
                    </p>
                  </div>

                  <div className="mt-8 grid gap-4 sm:grid-cols-3">
                    {[
                      { icon: Zap, title: 'Zero Bloat', desc: 'Install only the packages your project actually needs. No junk.' },
                      { icon: Blocks, title: '100% Free', desc: 'Every resource in our catalog is free and open-source.' },
                      { icon: Share2, title: 'AI-Ready', desc: 'Designed for AI agents. One command to scaffold and install.' },
                    ].map((item) => (
                      <div key={item.title} className="rounded-xl border border-zinc-100 bg-white p-4 shadow-sm">
                        <item.icon className="h-5 w-5 text-brand-500 mb-2" />
                        <h3 className="text-sm font-semibold text-zinc-900">{item.title}</h3>
                        <p className="mt-1 text-xs text-zinc-500">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </FadeIn>
              </section>

              {/* Quick Start */}
              <section id="quickstart" className="mb-20 scroll-mt-28">
                <FadeIn>
                  <h2 className="text-2xl font-bold text-zinc-900 flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                      <Zap className="h-4 w-4" />
                    </span>
                    Quick Start
                  </h2>
                  <p className="mt-2 text-sm text-zinc-500">Get started in under a minute.</p>

                  <div className="mt-6 space-y-6">
                    <div>
                      <h3 className="text-sm font-semibold text-zinc-900">1. Run the CLI wizard</h3>
                      <CodeBlock code="npx numb-design init" />
                      <p className="text-xs text-zinc-500">Follow the prompts to configure your project type, style, and features.</p>
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-zinc-900">Or use the web wizard</h3>
                      <p className="mt-1 text-xs text-zinc-500">Visit the <a href="/wizard" className="text-brand-600 underline underline-offset-2">Interactive Wizard</a> to generate your install plan in the browser.</p>
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-zinc-900">2. Install the packages</h3>
                      <CodeBlock code="# The CLI generates a ready-to-run install plan
npx numb-design init

# Or install specific resources
npx numb-design add shadcn-ui framer-motion recharts" />
                    </div>

                    <div className="rounded-2xl border border-brand-100 bg-brand-50/50 p-5">
                      <div className="flex items-start gap-3">
                        <Sparkles className="h-5 w-5 text-brand-600 shrink-0 mt-0.5" />
                        <div>
                          <h4 className="text-sm font-semibold text-brand-900">Pro tip</h4>
                          <p className="mt-1 text-xs leading-5 text-brand-700">
                            Use <code className="rounded bg-brand-100 px-1.5 py-0.5 text-[11px] font-mono">npx numb-design search buttons</code>{' '}
                            to find resources by keyword before installing.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              </section>

              {/* CLI Commands */}
              <section id="cli" className="mb-20 scroll-mt-28">
                <FadeIn>
                  <h2 className="text-2xl font-bold text-zinc-900 flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                      <Terminal className="h-4 w-4" />
                    </span>
                    CLI Commands
                  </h2>
                  <p className="mt-2 text-sm text-zinc-500">Every command is designed to be simple, memorable, and fast.</p>

                  <div className="mt-6 space-y-4">
                    {[
                      {
                        cmd: 'npx numb-design init',
                        desc: 'Interactive project bootstrap wizard. Prompts for type, style, and features, then generates a complete install plan.',
                        icon: Zap,
                      },
                      {
                        cmd: 'npx numb-design add <resource...>',
                        desc: 'Quick-install one or more resources. Automatically determines the correct npm command for each.',
                        icon: Code,
                      },
                      {
                        cmd: 'npx numb-design template <name>',
                        desc: 'Scaffold a pre-built project template with all dependencies pre-configured.',
                        icon: Layers,
                      },
                      {
                        cmd: 'npx numb-design search <query>',
                        desc: 'Search the entire resource catalog by keyword. Returns matching resources with categories.',
                        icon: Hash,
                      },
                      {
                        cmd: 'npx numb-design skills',
                        desc: 'Install pre-built AI agent skill files for Claude Code, Cursor, and other AI coding agents.',
                        icon: Puzzle,
                      },
                    ].map((item) => (
                      <div key={item.cmd} className="rounded-xl border border-zinc-100 bg-white p-5 shadow-sm">
                        <div className="flex items-start gap-4">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                            <item.icon className="h-4.5 w-4.5" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <CodeBlock code={item.cmd} />
                            <p className="text-xs text-zinc-500">{item.desc}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </FadeIn>
              </section>

              {/* npm Package */}
              <section id="package" className="mb-20 scroll-mt-28">
                <FadeIn>
                  <h2 className="text-2xl font-bold text-zinc-900 flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                      <Package className="h-4 w-4" />
                    </span>
                    npm Package
                  </h2>
                  <p className="mt-2 text-sm text-zinc-500">Use Numb.Design programmatically in your Node.js projects.</p>

                  <div className="mt-6 space-y-6">
                    <div>
                      <h3 className="text-sm font-semibold text-zinc-900">Install</h3>
                      <CodeBlock code="npm install numb-design" />
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-zinc-900">Generate an install plan</h3>
                      <CodeBlock code={`import { generatePlan } from 'numb-design';

const plan = generatePlan(
  'landing-page',
  ['modern', 'minimal'],
  ['animations', 'forms', 'icons']
);

console.log(plan);
/* [
  { name: 'Tailwind CSS', install: '', ... },
  { name: 'shadcn/ui', install: 'npx shadcn@latest init ...', ... },
  { name: 'Framer Motion', install: 'npm install motion', ... },
  ...
] */`} lang="js" />
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-zinc-900">Analyze an existing project</h3>
                      <CodeBlock code={`import { analyzeProject } from 'numb-design';

const recs = analyzeProject('./my-project');
// Returns recommendations based on
// what's already installed vs. missing`} lang="js" />
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-zinc-900">Browse the resource catalog</h3>
                      <CodeBlock code={`import { resources } from 'numb-design';

// Full JSON catalog with 500+ resources
console.log(resources.length);
// Filter by category
const uiResources = resources.filter(r => r.category === 'ui');`} lang="js" />
                    </div>

                    <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
                      <div className="flex items-start gap-3">
                        <Terminal className="h-5 w-5 text-zinc-500 shrink-0 mt-0.5" />
                        <div>
                          <h4 className="text-sm font-semibold text-zinc-900">Binaries</h4>
                          <p className="mt-1 text-xs leading-5 text-zinc-500">
                            The package ships two CLI binaries: <code className="rounded bg-zinc-200/60 px-1.5 py-0.5 text-[11px] font-mono">numb</code> and{' '}
                            <code className="rounded bg-zinc-200/60 px-1.5 py-0.5 text-[11px] font-mono">create-numb-app</code>.
                            Run <code className="rounded bg-zinc-200/60 px-1.5 py-0.5 text-[11px] font-mono">npx numb</code> to invoke the CLI.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              </section>

              {/* Agent Skills */}
              <section id="agents" className="mb-20 scroll-mt-28">
                <FadeIn>
                  <h2 className="text-2xl font-bold text-zinc-900 flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                      <Puzzle className="h-4 w-4" />
                    </span>
                    Agent Skills
                  </h2>
                  <p className="mt-2 text-sm text-zinc-500">
                    Pre-built skill files for AI coding agents. Give your agent deep design expertise in one command.
                  </p>

                  <div className="mt-6 space-y-4">
                    <div>
                      <h3 className="text-sm font-semibold text-zinc-900">Install agent skills</h3>
                      <CodeBlock code="npx numb-design skills" />
                      <p className="text-xs text-zinc-500">Installs skill files for animation, typography, design systems, and transitions.</p>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      {[
                        { name: 'Animation', file: 'animation/SKILL.md', desc: 'Framer Motion, CSS transitions, scroll-based animation patterns' },
                        { name: 'Design', file: 'design/SKILL.md', desc: 'Color theory, layout, spacing, visual hierarchy principles' },
                        { name: 'Transitions', file: 'transitions/SKILL.md', desc: 'Page transitions, shared layouts, route animations' },
                        { name: 'Typography', file: 'typography/SKILL.md', desc: 'Font pairing, hierarchy, responsive type scales' },
                      ].map((skill) => (
                        <div key={skill.name} className="rounded-xl border border-zinc-100 bg-white p-4 shadow-sm">
                          <div className="flex items-center gap-2 mb-1">
                            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-brand-50 text-brand-600">
                              <Code className="h-3.5 w-3.5" />
                            </div>
                            <h4 className="text-sm font-semibold text-zinc-900">{skill.name}</h4>
                          </div>
                          <p className="text-xs text-zinc-500">{skill.desc}</p>
                          <p className="mt-2 text-[10px] font-mono text-zinc-400">{skill.file}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </FadeIn>
              </section>

              {/* Design Tokens */}
              <section id="tokens" className="mb-20 scroll-mt-28">
                <FadeIn>
                  <h2 className="text-2xl font-bold text-zinc-900 flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                      <Palette className="h-4 w-4" />
                    </span>
                    Design Tokens
                  </h2>
                  <p className="mt-2 text-sm text-zinc-500">A CSS variable layer that enforces visual consistency across your project.</p>

                  <div className="mt-6 space-y-4">
                    <CodeBlock code={`npx numb-design init
# Select "Apply consistency layer" in the wizard`} />
                    
                    <div className="rounded-xl border border-zinc-100 bg-white p-5 shadow-sm">
                      <h3 className="text-sm font-semibold text-zinc-900 mb-3">Generated tokens include</h3>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {[
                          { token: '--color-brand', desc: 'Primary brand palette (50-900)' },
                          { token: '--font-sans', desc: 'System font stack' },
                          { token: '--font-mono', desc: 'Monospace font stack' },
                          { token: '--radius', desc: 'Border radius scale' },
                          { token: '--shadow', desc: 'Box shadow scale' },
                          { token: '--spacing', desc: 'Spacing scale (4px base)' },
                        ].map((t) => (
                          <div key={t.token} className="flex items-center gap-3">
                            <div className="h-4 w-4 rounded border border-zinc-200 bg-gradient-to-br from-brand-400 to-brand-600" />
                            <div>
                              <div className="text-xs font-mono text-zinc-800">{t.token}</div>
                              <div className="text-[10px] text-zinc-400">{t.desc}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </FadeIn>
              </section>

              {/* Resource Catalog */}
              <section id="resources" className="mb-20 scroll-mt-28">
                <FadeIn>
                  <h2 className="text-2xl font-bold text-zinc-900 flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                      <Globe className="h-4 w-4" />
                    </span>
                    Resource Catalog
                  </h2>
                  <p className="mt-2 text-sm text-zinc-500">
                    A curated collection of 500+ free design and frontend resources.
                  </p>

                  <div className="mt-6 space-y-6">
                    <div className="grid gap-3 sm:grid-cols-3">
                      {[
                        { label: 'UI Components', count: '120+', color: 'bg-violet-50 text-violet-700 border-violet-200' },
                        { label: 'Icons', count: '80+', color: 'bg-blue-50 text-blue-700 border-blue-200' },
                        { label: 'Templates', count: '60+', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
                        { label: 'Animations', count: '50+', color: 'bg-amber-50 text-amber-700 border-amber-200' },
                        { label: 'Fonts', count: '70+', color: 'bg-rose-50 text-rose-700 border-rose-200' },
                        { label: 'Tools', count: '120+', color: 'bg-cyan-50 text-cyan-700 border-cyan-200' },
                      ].map((cat) => (
                        <div key={cat.label} className={`rounded-xl border px-4 py-3 ${cat.color}`}>
                          <div className="text-2xl font-bold">{cat.count}</div>
                          <div className="text-xs font-medium mt-0.5">{cat.label}</div>
                        </div>
                      ))}
                    </div>

                    <CodeBlock code="# Search the catalog
npx numb-design search icons

# Browse categories on the web
open https://numb.design" />

                    <div className="flex flex-wrap gap-2">
                      {['ui', 'icons', 'fonts', 'animation', '3d', 'forms', 'auth', 'charts', 'colors', 'css', 'images', 'utils', 'email', 'particles', 'payment'].map((tag) => (
                        <span key={tag} className="rounded-full bg-zinc-100 px-3 py-1 text-[11px] font-medium text-zinc-600">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </FadeIn>
              </section>

              {/* Footer note */}
              <div className="border-t border-zinc-100 pt-8 pb-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <p className="text-xs text-zinc-400">
                    Numb.Design is 100% free and open-source. MIT licensed.
                  </p>
                  <div className="flex items-center gap-3">
                    <a href="https://github.com/officialnullobjectweb/Numb.design" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-800 transition-colors">
                      <GitBranch className="h-3.5 w-3.5" />
                      GitHub
                    </a>
                    <a href="/" className="inline-flex items-center gap-1.5 text-xs text-brand-600 hover:text-brand-700 transition-colors">
                      Back to home
                      <ArrowRight className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'What is Numb.Design?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Numb.Design is a free, open-source frontend toolkit. It provides a curated catalog of 500+ free design resources (UI components, icons, fonts, animations, templates) and a zero-bloat CLI that installs only the packages your project actually needs. Use it directly via npx numb-design init or through your AI coding agent.',
                },
              },
              {
                '@type': 'Question',
                name: 'How does the CLI avoid dependency bloat?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Instead of installing an opinionated starter with 50+ packages you may never use, Numb.Design asks what you are building and what features you need, then generates an install plan with exactly those packages. Run npx numb-design init to get started.',
                },
              },
              {
                '@type': 'Question',
                name: 'Is Numb.Design really 100% free?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes. Every resource in the catalog is free and open-source. There are no paid tiers, no premium plans, and no hidden charges. The entire project is MIT licensed.',
                },
              },
              {
                '@type': 'Question',
                name: 'Can AI agents use Numb.Design?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes. Numb.Design is built for AI-assisted development. AI agents like Claude Code, Cursor, and Copilot can read the README, understand the project structure, and execute CLI commands to add components, search resources, or scaffold new projects. The project files are designed to be agent-friendly.',
                },
              },
              {
                '@type': 'Question',
                name: 'What kind of projects can I build with Numb.Design?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Landing pages, dashboards, e-commerce stores, portfolios, blogs, SaaS apps, and full web applications. The CLI supports styles like modern, minimal, dark, glassmorphic, playful, and brutalist.',
                },
              },
            ],
          }),
        }}
      />
      <Footer />
    </>
  );
}
