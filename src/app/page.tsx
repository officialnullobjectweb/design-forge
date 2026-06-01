import Header from '@/components/Header';
import CategorySection from '@/components/CategorySection';
import CLISection from '@/components/CLISection';
import CreditsSection from '@/components/CreditsSection';
import Footer from '@/components/Footer';
import { categories } from '@/data/categories';
import { resources } from '@/data/resources';
import { templates } from '@/data/templates';
import { skills } from '@/data/skills';

const features = [
  {
    title: 'Resource Hub',
    description: `Browse ${resources.length}+ free design resources across ${categories.length} categories — components, icons, fonts, animations, and more.`,
    gradient: 'from-violet-600 to-indigo-600',
    href: '#resources',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="18" x="3" y="3" rx="2" />
        <path d="M3 9h18" />
        <path d="M9 21V9" />
      </svg>
    ),
  },
  {
    title: 'Template Library',
    description: `${templates.length}+ free templates from HTML5 UP, Start Bootstrap, BootstrapMade, and more — landing pages, dashboards, portfolios.`,
    gradient: 'from-emerald-500 to-teal-600',
    href: '/templates',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
        <line x1="3" x2="21" y1="9" y2="9" />
        <line x1="9" x2="9" y1="21" y2="9" />
      </svg>
    ),
  },
  {
    title: 'Design Skills',
    description: `${skills.length}+ free design guides from Laws of UX, NNGroup, W3C, and industry experts — principles, accessibility, color theory.`,
    gradient: 'from-orange-500 to-rose-600',
    href: '/skills',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" />
      </svg>
    ),
  },
  {
    title: 'Project Wizard',
    description: 'Interactive tool that analyzes your needs and generates a custom plan with the exact resources, templates, and commands you need.',
    gradient: 'from-purple-500 to-fuchsia-600',
    href: '/wizard',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3h.01" />
        <path d="M12 21h.01" />
        <path d="M3 12h.01" />
        <path d="M21 12h.01" />
        <path d="m7 7 2.5 2.5" />
        <path d="m17 7-2.5 2.5" />
        <path d="M7 17l2.5-2.5" />
        <path d="M17 17l-2.5-2.5" />
      </svg>
    ),
  },
];

const problems = [
  {
    title: 'Too Many Tabs',
    description: 'UI components on one site, icons on another, fonts on a third. Resources are scattered across 50+ websites with different search UIs and licensing terms.',
    gradient: 'from-violet-500 to-indigo-500',
  },
  {
    title: 'Dependency Hell',
    description: 'Found the perfect component library? Hope it doesnt conflict with the other three you already installed. Npm audit becomes your daily ritual.',
    gradient: 'from-red-500 to-pink-500',
  },
  {
    title: 'Design Inconsistency',
    description: 'Tailwind styles here, Material Design there, Bootstrap somewhere else. Three different design systems in one project because every team member chose differently.',
    gradient: 'from-amber-500 to-orange-500',
  },
];

const steps = [
  {
    step: '01',
    title: 'Tell Us What You\'re Building',
    description: 'Use the Project Wizard to describe your project — landing page, dashboard, SaaS app, portfolio. We\'ll figure out what you actually need.',
    gradient: 'from-violet-500 to-indigo-600',
    href: '/wizard',
  },
  {
    step: '02',
    title: 'Get a Custom Plan',
    description: 'No bloat, no guesswork. We recommend the exact resources, templates, and skills that match your stack and goals. Everything in one place.',
    gradient: 'from-blue-500 to-cyan-600',
  },
  {
    step: '03',
    title: 'One-Click Setup',
    description: 'Run a single command to install everything. Components, styles, dependencies — all wired up and ready to go. No npm conflicts, no config files to chase.',
    gradient: 'from-emerald-500 to-teal-600',
    href: '#cli',
  },
];

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">

        {/* ─── Section 1: Problem-Solution Hero ─── */}
        <section className="relative overflow-hidden px-4 pt-32 pb-20 sm:px-6 sm:pt-40 lg:px-8">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-[-20%] left-[-10%] h-[50%] w-[60%] rounded-full bg-gradient-to-br from-violet-200/40 via-violet-400/20 to-transparent blur-3xl" />
            <div className="absolute bottom-[-10%] right-[-10%] h-[40%] w-[50%] rounded-full bg-gradient-to-bl from-emerald-200/30 via-teal-300/20 to-transparent blur-3xl" />
          </div>

          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-200/60 bg-violet-50/80 px-4 py-1.5 text-xs font-medium text-violet-700">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-violet-500" />
              </span>
              {resources.length} free resources &middot; {templates.length} templates &middot; {skills.length} skills
            </div>

            <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-zinc-900 sm:text-5xl md:text-6xl lg:text-7xl">
              Stop Hunting for{' '}
              <span className="bg-gradient-to-r from-violet-600 via-violet-500 to-emerald-500 bg-clip-text text-transparent">
                Design Resources
              </span>
              <br />
              <span className="text-2xl sm:text-3xl md:text-4xl">One place. One command.</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-zinc-500 sm:text-lg sm:leading-8">
              Finding the right free UI components, templates, fonts, and design tools means
              visiting 50+ sites, fighting npm conflicts, and wasting hours.{' '}
              <span className="font-medium text-zinc-700">Not anymore.</span>
            </p>

            <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <a
                href="/wizard"
                className="inline-flex h-12 items-center gap-2 rounded-xl bg-zinc-900 px-7 text-sm font-medium text-white shadow-lg shadow-zinc-900/20 transition-all hover:bg-zinc-800 hover:shadow-xl active:scale-[0.98]"
              >
                Try the Wizard
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                </svg>
              </a>
              <a
                href="#cli"
                className="inline-flex h-12 items-center gap-2 rounded-xl border border-zinc-200 bg-white px-7 text-sm font-medium text-zinc-700 shadow-sm transition-all hover:bg-zinc-50 hover:shadow-md active:scale-[0.98]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="4 17 10 11 4 5" /><line x1="12" x2="20" y1="19" y2="19" />
                </svg>
                Install CLI &rarr;
              </a>
            </div>

            <div className="mt-16 grid grid-cols-3 gap-4 sm:gap-6">
              <div className="rounded-xl border border-zinc-100 bg-white/60 px-4 py-5 text-center backdrop-blur-sm">
                <div className="text-2xl font-bold text-zinc-900 sm:text-3xl">{resources.length}+</div>
                <div className="mt-1 text-xs font-medium text-zinc-500">Free Resources</div>
              </div>
              <div className="rounded-xl border border-zinc-100 bg-white/60 px-4 py-5 text-center backdrop-blur-sm">
                <div className="text-2xl font-bold text-zinc-900 sm:text-3xl">{templates.length}+</div>
                <div className="mt-1 text-xs font-medium text-zinc-500">Templates</div>
              </div>
              <div className="rounded-xl border border-zinc-100 bg-white/60 px-4 py-5 text-center backdrop-blur-sm">
                <div className="text-2xl font-bold text-zinc-900 sm:text-3xl">{skills.length}+</div>
                <div className="mt-1 text-xs font-medium text-zinc-500">Skills</div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Section 2: The Problem ─── */}
        <section className="border-t border-zinc-100 bg-zinc-50/50 px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-2xl text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-red-50 px-3.5 py-1 text-xs font-medium text-red-700 ring-1 ring-red-200/50">
                The Real Problem
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
                Finding Design Resources Is a Mess
              </h2>
              <p className="mt-3 text-sm text-zinc-500">
                Every designer and developer has been here. The web is full of amazing free tools,
                but finding them and making them work together is a full-time job.
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-3">
              {problems.map((problem) => (
                <div
                  key={problem.title}
                  className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6 transition-all hover:shadow-lg hover:-translate-y-0.5"
                >
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
              ))}
            </div>
          </div>
        </section>

        {/* ─── Section 3: How DesignForge Solves It ─── */}
        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-2xl text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3.5 py-1 text-xs font-medium text-emerald-700 ring-1 ring-emerald-200/50">
                The Solution
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
                How DesignForge Fixes It
              </h2>
              <p className="mt-3 text-sm text-zinc-500">
                Three simple steps from chaos to a working project with all the resources you
                actually need.
              </p>
            </div>

            <div className="mt-12 grid gap-8 sm:grid-cols-3">
              {steps.map((step) => (
                <div key={step.step} className="relative">
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
                  {step.step !== '03' && (
                    <div className="absolute top-7 left-14 hidden h-0.5 w-[calc(100%-5rem)] bg-gradient-to-r from-zinc-200 to-zinc-100 sm:block" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Section 4: Feature Cards ─── */}
        <section className="border-t border-zinc-100 bg-zinc-50/50 px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
                Everything You Need in One Place
              </h2>
              <p className="mt-3 text-sm text-zinc-500">
                Curated collections across every design discipline. No more bookmarking 50 different sites.
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              {features.map((feature) => (
                <a
                  key={feature.title}
                  href={feature.href}
                  className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6 transition-all hover:shadow-lg hover:-translate-y-0.5"
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
              ))}
            </div>
          </div>
        </section>

        {/* ─── Section 5: Resource Categories ─── */}
        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
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
              {categories.map((cat) => {
                const catResources = resources.filter((r) => r.category === cat.id);
                return (
                  <a
                    key={cat.id}
                    href={`#${cat.id}`}
                    className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-5 transition-all hover:shadow-md hover:-translate-y-0.5"
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
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── Section 6: Resources ─── */}
        <section className="border-t border-zinc-100 px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-violet-50 px-3.5 py-1 text-xs font-medium text-violet-700 ring-1 ring-violet-200/50">
                All Resources
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
                The Full Library
              </h2>
              <p className="mt-3 text-sm text-zinc-500">
                Every resource hand-curated. Nothing paid, nothing outdated, nothing unnecessary.
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
        </section>

        <CLISection />
        <CreditsSection />
      </main>
      <Footer />
    </>
  );
}
