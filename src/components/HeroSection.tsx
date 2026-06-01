'use client';

import { ArrowDown, GitFork, Terminal, ExternalLink, Wand2, Palette, BookOpen, LayoutDashboard, Sparkles, Search } from 'lucide-react';
import { useState } from 'react';

const stats = [
  { number: '80+', label: 'Free Resources' },
  { number: '14', label: 'Categories' },
  { number: '20+', label: 'Free Templates' },
  { number: '30+', label: 'Design Skills' },
  { number: 'Zero', label: 'Paid Tools' },
  { number: '1', label: 'Command to Start' },
];

const featuredCats = [
  { label: 'UI Components', desc: 'shadcn, MagicUI, Radix, DaisyUI...', icon: LayoutDashboard, color: 'from-violet-600 to-indigo-600' },
  { label: 'Fonts & Colors', desc: 'Google Fonts, Radix Colors, Coolors...', icon: Palette, color: 'from-pink-500 to-rose-600' },
  { label: 'Animations & 3D', desc: 'Framer Motion, Three.js, GSAP...', icon: Sparkles, color: 'from-orange-500 to-rose-600' },
  { label: 'Skills & Patterns', desc: 'Refactoring UI, Laws of UX...', icon: BookOpen, color: 'from-emerald-500 to-teal-600' },
  { label: 'Pre-built Templates', desc: 'HTML5 UP, Cruip, SB Admin...', icon: LayoutDashboard, color: 'from-blue-600 to-cyan-500' },
  { label: 'Project Wizard', desc: 'Smart setup for your project', icon: Wand2, color: 'from-purple-500 to-fuchsia-600' },
];

export default function HeroSection() {
  const [query, setQuery] = useState('');

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
          80+ Resources · 14 Categories · 100% FREE
        </div>

        <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-zinc-900 sm:text-5xl md:text-6xl lg:text-7xl">
          Everything You Need to{' '}
          <span className="gradient-text bg-gradient-to-r from-brand-600 via-brand-500 to-emerald-500">
            Build Beautiful UI
          </span>
          <br />
          <span className="text-2xl sm:text-3xl md:text-4xl">100% Free. Zero Paid Tools.</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-zinc-500 sm:text-lg sm:leading-8">
          Components · Fonts · Colors · Icons · Animations · Charts · Templates · Design Skills · 3D · Gradients
          <br />
          <span className="text-sm">No more hunting the web. Everything is here.</span>
        </p>

        <div className="mt-8 mx-auto max-w-lg">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Search resources... (e.g., buttons, fonts, charts, animations)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-xl border border-zinc-200 bg-white py-3 pl-10 pr-4 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-300 shadow-sm"
            />
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <a
            href="#resources"
            className="inline-flex h-11 items-center gap-2 rounded-xl bg-zinc-900 px-6 text-sm font-medium text-white shadow-lg shadow-zinc-900/20 transition-all hover:bg-zinc-800 hover:shadow-xl active:scale-[0.98]"
          >
            Browse All Resources
            <ArrowDown className="h-3.5 w-3.5" />
          </a>
          <a
            href="/wizard"
            className="inline-flex h-11 items-center gap-2 rounded-xl border border-zinc-200 bg-white px-6 text-sm font-medium text-zinc-700 shadow-sm transition-all hover:bg-zinc-50 hover:shadow-md active:scale-[0.98]"
          >
            <Wand2 className="h-4 w-4" />
            Project Wizard
          </a>
          <a
            href="/templates"
            className="inline-flex h-11 items-center gap-2 rounded-xl border border-zinc-200 bg-white px-6 text-sm font-medium text-zinc-700 shadow-sm transition-all hover:bg-zinc-50 hover:shadow-md active:scale-[0.98]"
          >
            <LayoutDashboard className="h-4 w-4" />
            Templates
          </a>
          <a
            href="/skills"
            className="inline-flex h-11 items-center gap-2 rounded-xl border border-zinc-200 bg-white px-6 text-sm font-medium text-zinc-700 shadow-sm transition-all hover:bg-zinc-50 hover:shadow-md active:scale-[0.98]"
          >
            <BookOpen className="h-4 w-4" />
            Skills
          </a>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-zinc-100 bg-white/60 px-3 py-4 text-center backdrop-blur-sm"
            >
              <div className="text-xl font-bold text-zinc-900 sm:text-2xl">{stat.number}</div>
              <div className="mt-0.5 text-[10px] font-medium text-zinc-500">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 gap-3">
          {featuredCats.map((cat) => (
            <a
              key={cat.label}
              href={cat.label === 'Pre-built Templates' ? '/templates' : cat.label === 'Skills & Patterns' ? '/skills' : cat.label === 'Project Wizard' ? '/wizard' : '/#' + cat.label.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}
              className="group rounded-xl border border-zinc-100 bg-white p-4 text-left transition-all hover:shadow-md hover:border-zinc-200"
            >
              <div className={`inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${cat.color} text-white shadow-sm`}>
                <cat.icon className="h-4 w-4" />
              </div>
              <p className="mt-2 text-xs font-semibold text-zinc-900 group-hover:text-brand-600 transition-colors">{cat.label}</p>
              <p className="text-[10px] text-zinc-400 mt-0.5">{cat.desc}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
