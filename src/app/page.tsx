import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import CategorySection from '@/components/CategorySection';
import CLISection from '@/components/CLISection';
import CreditsSection from '@/components/CreditsSection';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import AnimatedSection from '@/components/AnimatedSection';
import AnimatedCard from '@/components/AnimatedCard';
import { categories } from '@/data/categories';
import { resources } from '@/data/resources';
import { templates } from '@/data/templates';
import { skills } from '@/data/skills';

const features = [
  {
    title: 'AI-Powered Selection',
    description: 'Your AI agent analyzes your requirements and selects exactly the right packages. No more guessing, no more bloat — only what you need.',
    gradient: 'from-violet-600 to-indigo-600',
    href: '#how-it-works',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a4 4 0 0 1 4 4v2a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4Z" />
        <path d="M16 14H8a4 4 0 0 0-4 4v2h16v-2a4 4 0 0 0-4-4Z" />
      </svg>
    ),
  },
  {
    title: 'Zero Bloat Guarantee',
    description: `Only ${resources.length}+ free packages available. If you change your mind, unused packages are automatically removed. Your workspace stays clean.`,
    gradient: 'from-emerald-500 to-teal-600',
    href: '#cli',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
  {
    title: '5-Minute Frontends',
    description: 'Describe your vision once. The AI handles package selection, installation, and setup. A stunning, working frontend in minutes, not hours.',
    gradient: 'from-orange-500 to-rose-600',
    href: '/wizard',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    title: `${resources.length}+ Free Packages`,
    description: `Every package is free, open-source, and pre-vetted. Your AI agent explores the catalog, picks the best, and builds your output — no subscriptions, no limits.`,
    gradient: 'from-purple-500 to-fuchsia-600',
    href: '#resources',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" />
      </svg>
    ),
  },
];

const problems = [
  {
    title: 'Too Much Bloat',
    description: 'Installed a massive UI library for one button? A full animation suite for one fade-in? Most projects carry 80% unused dependencies. Wasted space, slower builds.',
    gradient: 'from-violet-500 to-indigo-500',
  },
  {
    title: 'Dependency Hell',
    description: 'Found the perfect component library? Hope it doesn\'t conflict with the other three you already installed. npm audit becomes your daily ritual.',
    gradient: 'from-red-500 to-pink-500',
  },
  {
    title: 'Wasted Time Curating',
    description: 'Hunting for the right packages, checking compatibility, reading docs, managing versions. Every project starts with hours of setup before a single line of UI code.',
    gradient: 'from-amber-500 to-orange-500',
  },
];

const steps = [
  {
    step: '01',
    title: 'Tell Your AI Agent What You Need',
    description: '\"Build me a premium landing page.\" That\'s it. Your AI agent analyzes your requirement and determines the exact packages needed — nothing more, nothing less.',
    gradient: 'from-violet-500 to-indigo-600',
    href: '/wizard',
  },
  {
    step: '02',
    title: 'Numb.Design Picks the Packages',
    description: 'Our CLI scans the requirement and installs only what\'s needed. shadcn/ui for components? Framer Motion for animations? Geist for fonts? Done. The rest stays out.',
    gradient: 'from-blue-500 to-cyan-600',
  },
  {
    step: '03',
    title: 'Instant, Clean Frontend',
    description: 'A fully working frontend built from free, open-source packages. Change your mind? Run cleanup — old packages and code are removed. Your space stays pristine.',
    gradient: 'from-emerald-500 to-teal-600',
    href: '#cli',
  },
];

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <HeroSection />

        <AnimatedSection className="border-t border-zinc-100 bg-zinc-50/50 px-4 py-20 sm:px-6 lg:px-6">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto max-w-2xl text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-red-50 px-3.5 py-1 text-xs font-medium text-red-700 ring-1 ring-red-200/50">
                The Problem
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
                Frontend Setup Is Still Too Hard
              </h2>
              <p className="mt-3 text-sm text-zinc-500">
                You shouldn\'t need to hand-pick packages, read compatibility docs, and clean up
                abandoned dependencies just to build a UI. Your AI agent should handle all of that.
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-3">
              {problems.map((problem) => (
                <AnimatedCard key={problem.title}>
                  <div className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6 transition-all hover:shadow-lg hover:-translate-y-0.5">
                    <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${problem.gradient}`} />
                    <div className="pt-2">
                      <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${problem.gradient} text-white shadow-sm`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10" />
                          <line x1="12" x2="12" y1="8" y2="12" />
                          <line x1="12" x2="12.01" y1="16" y2="16" />
                        </svg>
                      </div>
                      <h3 className="mt-4 text-lg font-semibold text-zinc-900">{problem.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-zinc-500">{problem.description}</p>
                    </div>
                  </div>
                </AnimatedCard>
              ))}
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection className="px-4 py-20 sm:px-6 lg:px-6">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto max-w-2xl text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3.5 py-1 text-xs font-medium text-emerald-700 ring-1 ring-emerald-200/50">
                How It Works
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
                Three Steps from Idea to UI
              </h2>
              <p className="mt-3 text-sm text-zinc-500">
                Your AI agent handles the discovery. DesignForge handles the installation.
                You just tell it what to build.
              </p>
            </div>

            <div className="mt-12 grid gap-8 sm:grid-cols-3">
              {steps.map((step) => (
                <AnimatedCard key={step.step}>
                  <div className="relative">
                    <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${step.gradient} text-2xl font-bold text-white shadow-lg`}>
                      {step.step}
                    </div>
                    <h3 className="mt-6 text-xl font-semibold text-zinc-900">{step.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-zinc-500">{step.description}</p>
                    {step.href && (
                      <a
                        href={step.href}
                        className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-violet-600 hover:text-violet-700 transition-colors"
                      >
                        Learn more
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                        </svg>
                      </a>
                    )}

                  </div>
                </AnimatedCard>
              ))}
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection className="border-t border-zinc-100 bg-zinc-50/50 px-4 py-20 sm:px-6 lg:px-6">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
                Choose What Your AI Agent Uses
              </h2>
              <p className="mt-3 text-sm text-zinc-500">
                Curated packages across every discipline. Your AI agent picks the right ones and builds
                your frontend. No subscriptions, no bloat, no limits.
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              {features.map((feature) => (
                <AnimatedCard key={feature.title}>
                  <a
                    href={feature.href}
                    className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6 transition-all hover:shadow-lg hover:-translate-y-0.5 block"
                  >
                    <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.gradient} text-white shadow-sm`}>
                      {feature.icon}
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-zinc-900 group-hover:text-violet-600 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-zinc-500">
                      {feature.description}
                    </p>
                    <div className="mt-4 flex items-center gap-1 text-xs font-medium text-violet-600 opacity-0 group-hover:opacity-100 transition-opacity">
                      Explore {feature.title}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                      </svg>
                    </div>
                  </a>
                </AnimatedCard>
              ))}
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection className="px-4 py-20 sm:px-6 lg:px-6">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto max-w-2xl text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-violet-50 px-3.5 py-1 text-xs font-medium text-violet-700 ring-1 ring-violet-200/50">
                Browse by Category
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
                {categories.length} Categories, Endless Possibilities
              </h2>
              <p className="mt-3 text-sm text-zinc-500">
                From UI components to prototyping tools — every category is packed with hand-picked free resources.
              </p>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {categories.map((cat, idx) => {
                const catResources = resources.filter((r) => r.category === cat.id);
                return (
                  <AnimatedCard key={cat.id} delay={0.05 * idx}>
                    <a
                      href={`#${cat.id}`}
                      className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-5 transition-all hover:shadow-md hover:-translate-y-0.5 block"
                    >
                      <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${cat.gradient} text-white shadow-sm`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect width="18" height="18" x="3" y="3" rx="2" />
                          <path d="M3 9h18" />
                          <path d="M9 21V9" />
                        </svg>
                      </div>
                      <h3 className="mt-3 text-sm font-semibold text-zinc-900 group-hover:text-violet-600 transition-colors">
                        {cat.label}
                      </h3>
                      <p className="mt-1 text-xs text-zinc-400 line-clamp-2">{cat.description}</p>
                      <div className="mt-3 inline-flex items-center rounded-full bg-zinc-50 px-2.5 py-0.5 text-[10px] font-medium text-zinc-500 ring-1 ring-zinc-200/50">
                        {catResources.length} resources
                      </div>
                    </a>
                  </AnimatedCard>
                );
              })}
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection className="border-t border-zinc-100 px-4 py-20 sm:px-6 lg:px-6">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-violet-50 px-3.5 py-1 text-xs font-medium text-violet-700 ring-1 ring-violet-200/50">
                All Resources
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
                The Package Catalog
              </h2>
              <p className="mt-3 text-sm text-zinc-500">
                Every package hand-curated. Your AI agent browses and picks only what\'s needed for your build.
              </p>
            </div>

            <div id="resources" className="space-y-16 scroll-mt-24">
              {categories.map((category) => {
                const catResources = resources.filter((r) => r.category === category.id);
                if (catResources.length === 0) return null;
                return (
                  <CategorySection
                    key={category.id}
                    category={category}
                    resources={catResources}
                  />
                );
              })}
            </div>
          </div>
        </AnimatedSection>

        <CLISection />
        <CreditsSection />
      </main>
      <BackToTop />
      <Footer />
    </>
  );
}
