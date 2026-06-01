'use client';

import { ArrowDown, GitFork, Terminal, ExternalLink } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden px-4 pt-32 pb-20 sm:px-6 sm:pt-40 lg:px-8">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-20%] left-[-10%] h-[50%] w-[60%] rounded-full bg-gradient-to-br from-brand-200/40 via-brand-400/20 to-transparent blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[40%] w-[50%] rounded-full bg-gradient-to-bl from-emerald-200/30 via-teal-300/20 to-transparent blur-3xl" />
      </div>

      <div className="mx-auto max-w-4xl text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-200/60 bg-brand-50/80 px-4 py-1.5 text-xs font-medium text-brand-700">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-500" />
          </span>
          All resources are 100% FREE
        </div>

        <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-zinc-900 sm:text-5xl md:text-6xl lg:text-7xl">
          Your{' '}
          <span className="gradient-text bg-gradient-to-r from-brand-600 via-brand-500 to-emerald-500">
            Design Command Center
          </span>
          <br />
          for Premium Projects
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-zinc-500 sm:text-lg sm:leading-8">
          Stop hunting for design resources. We&apos;ve aggregated the best free UI/UX tools — 
          from shadcn/ui to Framer Motion, Three.js to Lucide Icons — into one place. 
          One command, zero cost, premium results.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href="#resources"
            className="inline-flex h-11 items-center gap-2 rounded-xl bg-zinc-900 px-6 text-sm font-medium text-white shadow-lg shadow-zinc-900/20 transition-all hover:bg-zinc-800 hover:shadow-xl hover:shadow-zinc-900/25 active:scale-[0.98]"
          >
            <Terminal className="h-4 w-4" />
            Explore Resources
            <ArrowDown className="h-3.5 w-3.5" />
          </a>
          <a
            href="#cli"
            className="inline-flex h-11 items-center gap-2 rounded-xl border border-zinc-200 bg-white px-6 text-sm font-medium text-zinc-700 shadow-sm transition-all hover:bg-zinc-50 hover:shadow-md active:scale-[0.98]"
          >
            <Terminal className="h-4 w-4" />
            One-Command Setup
          </a>
          <a
            href="https://github.com/officialnullobjectweb/design-forge"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center gap-2 rounded-xl border border-zinc-200 bg-white px-6 text-sm font-medium text-zinc-700 shadow-sm transition-all hover:bg-zinc-50 hover:shadow-md active:scale-[0.98]"
          >
            <GitFork className="h-4 w-4" />
            Star on GitHub
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { number: '18+', label: 'Free Resources' },
            { number: '4', label: 'Categories' },
            { number: 'Zero', label: 'Paid Tools' },
            { number: '1', label: 'Command to Start' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-zinc-100 bg-white/60 px-4 py-5 text-center backdrop-blur-sm"
            >
              <div className="text-2xl font-bold text-zinc-900 sm:text-3xl">{stat.number}</div>
              <div className="mt-1 text-xs font-medium text-zinc-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
